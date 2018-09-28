
module framework.session {
	export class loginManager {

		private static instanceObj: loginManager = null;
		public static instance(): loginManager {
			if (loginManager.instanceObj == null) {
				loginManager.instanceObj = new loginManager();
			}
			return loginManager.instanceObj;
		}

		private pingMessageTime = 5000;
		private isAutoConnect: boolean = false;
		private isConnecting: boolean = false;
		private currentLoginCallback = new Array<(result: boolean, msg: string) => void>();
		private loginCompleteTime = 5000;
		private maxAutoConnectTryTimes = 4;
		private currentAutoConnectTryTimes = 0;
		private autoConnectTryTimeDelay = [0, 3000, 9000, 10000, 12000];

		constructor() {
			net.messageDispatch.instance().registerConnectEvent(net.socketConnectEvent.Connected, this, this.onConnectedEvent);
			net.messageDispatch.instance().registerConnectEvent(net.socketConnectEvent.Error, this, this.onConnectErrorEvent);
			net.messageDispatch.instance().registerConnectEvent(net.socketConnectEvent.Closed, this, this.onConnectCloseEvent);
			net.messageDispatch.instance().registerMessageEvent("CMD_KICKOFF_ACCOUNT", this, this.onKickoffMessage);
			this.currentLoginCallback.length = 0;

			Laya.stage.on(Laya.Event.KEY_DOWN, this, function (event: Laya.Event) {
				if (event.keyCode == 46) {
					net.network.instance().closeConnect();
				}
			});
		}

		private onConnectedEvent() {
			common.log.info("[loginManager] onConnectedEvent");
		}

		private onConnectErrorEvent(e: Laya.Event) {
			common.log.error("[loginManager] onConnectErrorEvent : {0}", e);
		}

		private onConnectCloseEvent() {
			this.enablePingLoop(false);
			common.log.info("[loginManager] onConnectCloseEvent");
			if (!this.isConnecting) {
				this.autoConnect();
			}
		}

		private autoConnect() {
			if (!this.isAutoConnect) {
				return;
			}
			var delayTime = this.autoConnectTryTimeDelay[this.currentAutoConnectTryTimes++];
			common.log.info("[loginManager] autoConnect: delayTime = {0}", delayTime);
			if (delayTime >= 0) {
				this.isConnecting = true;
				Laya.timer.once(delayTime, this, function () {
					ui.loadingUi.lock("AutoConnect", "断线重连中...", 50000);
					this.relogin(function (result: boolean, msg: string) {
						if (result == true || this.currentAutoConnectTryTimes >= this.maxAutoConnectTryTimes) {
							this.currentAutoConnectTryTimes = 0;
							ui.loadingUi.unlock("AutoConnect");
							net.messageDispatch.instance().onSocketReconnect(result, msg);
							this.isAutoConnect = result;
							this.isConnecting = false;
						} else {
							this.autoConnect();
						}
					}.bind(this));
				}.bind(this));
			}
		}

		private onKickoffMessage(obj) {
			this.logout();
			ui.commonDialog.instance().dialog(obj.reason, "确  定", function () {
				sceneManager.instance().gotoHall();
			})
		}

		private onLoginEvent(relogin: boolean) {
			this.enablePingLoop(true);
			common.log.info("[loginManager] onLoginEvent");
		}

		private onLogoutEvent() {
			this.enablePingLoop(false);
			common.log.info("[loginManager] onLogoutEvent");
		}

		private onPingTimeout() {
			net.network.instance().closeConnect();
			common.log.error("[loginManager] onPingTimeout");
		}

		private onResult(result: boolean, msg: string) {
			for (var i = 0; i < this.currentLoginCallback.length; i++) {
				var cb = this.currentLoginCallback[i];
				if (util.type.isFunction(cb)) {
					cb(result, msg);
				}
			}
			this.currentLoginCallback.length = 0;
		}

		private getQueryAddressByUrl() {
			var host = Browser.window.location.host;
			return "http://" + host + ":14000/svraddr?ver=1";
		}

		public login(gameId, url, callback: (result: boolean, msg: string) => any, autoConnect: boolean) {
			var addr = framework.common.globalStorage.instance().getItem("addr");
			if (addr.length == 0) {
				addr = this.getQueryAddressByUrl();
			}
			framework.common.globalStorage.instance().setItem("addr", addr);
			dataManager.instance().setData(datas.login.gameId, gameId);

			this.currentLoginCallback.push(callback);
			if (this.currentLoginCallback.length > 1) {
				return;
			}

			this.isAutoConnect = autoConnect;
			if (dataManager.instance().getData(datas.global.enableCSProto)) {
				this.loginCSProto(gameId, callback);
				return;
			}

			this.queryServerInfo(addr)
				.then(this.doLogin.bind(this))
				.then(this.doConnect.bind(this))
				.then(this.doAuth.bind(this))
				.then(this.doAccountLogin.bind(this))
				.then(this.doWaitLoginComplete.bind(this))
				.then(function () {
					this.onLoginEvent(false);
					this.onResult(true, "");
				}.bind(this))
				.catch(function (data) {
					this.onResult(false, data);
				}.bind(this));
		}

		private relogin(callback: (result: boolean, msg: string) => any) {
			common.log.info("[loginManager] relogin...");
			this.doConnect()
				.then(this.doAuth.bind(this))
				.then(this.doAccountLogin.bind(this))
				.then(this.doWaitLoginComplete.bind(this))
				.then(function () {
					this.onLoginEvent(true);
					if (util.type.isFunction(callback)) {
						callback(true, "");
					}
				}.bind(this))
				.catch(function (data) {
					if (util.type.isFunction(callback)) {
						callback(false, data);
					}
				}.bind(this));
		}

		private loginCSProto(gameId: number, callback: (result: boolean, msg: string) => any) {
			dataManager.instance().setData(datas.login.gameId, gameId);
			common.log.info("[loginManager] loginCSProto...");
			this.doConnect()
				.then(this.doAuthCSProto.bind(this))
				.then(this.doAccountLoginCSProto.bind(this))
				.then(function () {
					this.onLoginEvent(true);
					if (util.type.isFunction(callback)) {
						callback(true, "");
					}
				}.bind(this))
				.catch(function (data) {
					if (util.type.isFunction(callback)) {
						callback(false, data);
					}
				}.bind(this));
		}

		public logout() {
			this.isAutoConnect = false;
			net.network.instance().closeConnect();
			this.onLogoutEvent();
		}

		private queryServerInfo(url: string): Promise<any> {
			common.log.info("queryServerInfo : {0}", url);
			var promise = new Promise<any>((resolve, reject) => {
				var request = {
					"os_type": 0,
					"oss_channel": device.deviceInfo.getChannelCode(),
					"client_version": device.deviceInfo.getPackageVersion(),
					"mobile_type": device.deviceInfo.getDeviceType(),
					"operaters_type": device.deviceInfo.getMobileOperatorsType(),
					"device_id": device.deviceInfo.getDeviceUniqueId()
				};

				net.network.instance().post(url, JSON.stringify(request), function (result: boolean, data: any) {
					if (result) {
						if (data.ret_code == 0) {
							dataManager.instance().setData(datas.login.gameServer, "ws://" + data.svr_addr + ":" + data.svr_port);
							dataManager.instance().setData(datas.login.authUrl, data.auth_addr);
							resolve(true);
							return;
						}
					}
					reject(strings.login.queryServerError);
				});
			});
			return promise;
		}

		private doLogin(): Promise<any> {
			dataManager.instance().setData(datas.login.userChannel, 0);
			dataManager.instance().setData(datas.login.account, device.deviceInfo.getDeviceUniqueId());
			dataManager.instance().setData(datas.login.password, "");
			dataManager.instance().setData(datas.login.accessToken, "");

			var promise = new Promise<any>((resolve, reject) => {
				var request = {
					"user_channel": dataManager.instance().getData(datas.login.userChannel),
					"acc": dataManager.instance().getData(datas.login.account),
					"pwd": dataManager.instance().getData(datas.login.password),
					"access_token": dataManager.instance().getData(datas.login.accessToken),
					"device_id": device.deviceInfo.getDeviceUniqueId(),
				};

				net.network.instance().post(dataManager.instance().getData(datas.login.authUrl), JSON.stringify(request), function (result: boolean, data: any) {
					if (result) {
						if (data.ret_code == 0) {
							dataManager.instance().setData(datas.login.identityToken, data.identity_token);
							resolve(true);
							return;
						}
					}
					reject(strings.login.doLoginError);
				});
			});
			return promise;
		}

		private doConnect(): Promise<any> {
			var promise = new Promise<any>((resolve, reject) => {

				net.network.instance().connectHandler(function () {
					net.network.instance().connectHandler(null, null);
					resolve(true);
				},
					function (e: Laya.Event) {
						net.network.instance().connectHandler(null, null);
						reject(strings.login.connectFail);
					})

				net.network.instance().connectServer(dataManager.instance().getData(datas.login.gameServer));
			});
			return promise;
		}

		private doAuth(): Promise<any> {
			var self = this;
			var promise = new Promise<any>((resolve, reject) => {
				var authObj = net.messageBuilder.instance().autoBuild("KConnect.WX_CMD_AUTH_CS");
				authObj.game_id = dataManager.instance().getData(datas.login.gameId);
				authObj.identity_token = dataManager.instance().getData(datas.login.identityToken);
				net.network.instance().sendMessage(authObj, new net.messageHandler(self, function (data) {
					if (data == null) {
						reject(strings.global.commonMessageError);
					} else if (data.ret_code === 0) {
						resolve(true);
					} else {
						reject(util.tools.formatCodeMessage(data.ret_code, data.ret_code_desc));
					}
				}), 5000);
			});
			return promise;
		}

		private doAccountLogin(): Promise<any> {
			var self = this;
			var promise = new Promise<any>((resolve, reject) => {
				var aloginObj = net.messageBuilder.instance().autoBuild("CSProto.CMD_ALOGIN_CS");
				aloginObj.verion_type = 2;
				aloginObj.account = dataManager.instance().getData(datas.login.account);
				aloginObj.name = device.deviceInfo.getDeviceName();
				aloginObj.client_ver = device.deviceInfo.getPackageVersion();
				aloginObj.channel = dataManager.instance().getData(datas.login.userChannel);
				aloginObj.operaters_type = device.deviceInfo.getMobileOperatorsType();
				aloginObj.map_templateid = dataManager.instance().getData(datas.login.gameId);
				net.network.instance().sendMessage(aloginObj, new net.messageHandler(self, function (data) {
					if (data == null) {
						reject(strings.global.commonMessageError);
					} else if (data.result === 0) {
						resolve(data);
					} else {
						reject(util.tools.formatCodeMessage(data.result, data.hint_msg));
					}
				}), 5000);
			});
			return promise;
		}

		private doWaitLoginComplete(): Promise<any> {
			var self = this;
			var promise = new Promise<any>((resolve, reject) => {
				var timeout = function () {
					reject(strings.login.connectFail);
				}
				Laya.timer.once(self.loginCompleteTime, self, timeout.bind(self));

				net.messageDispatch.instance().registerMessageEvent("CMD_ROLE_FIN", self, function (obj) {
					if (obj != null) {
						resolve(true);
					}
				}.bind(self), true);
			});

			return promise;
		}

		private doAuthCSProto(): Promise<any> {
			var self = this;
			var promise = new Promise<any>((resolve, reject) => {
				var authObj = net.messageBuilder.instance().autoBuild("KConnectProto.WX_CMD_NEW_UNIAUTH_CS");
				authObj.AuthChannel = dataManager.instance().getData(datas.login.userChannel);
				authObj.ChannelAcc = dataManager.instance().getData(datas.login.account);
				authObj.DeviceID = device.deviceInfo.getDeviceUniqueId();
				authObj.IdentityToken = dataManager.instance().getData(datas.login.identityToken);
				net.network.instance().sendMessage(authObj, new net.messageHandler(self, function (data) {
					if (data == null) {
						reject(strings.global.commonMessageError);
					} else if (data.RetCode === 0) {
						resolve(true);
					} else {
						reject(util.tools.formatCodeMessage(data.RetCode, data.RetCodeDesc));
					}
				}), 5000);
			});
			return promise;
		}

		private doAccountLoginCSProto(): Promise<any> {
			var self = this;
			var promise = new Promise<any>((resolve, reject) => {
				var aloginObj = net.messageBuilder.instance().autoBuild("CSProto.CMD_ALOGIN_CS");
				aloginObj.bVerionType = 0;
				aloginObj.szAccount = dataManager.instance().getData(datas.login.account);
				aloginObj.szName = device.deviceInfo.getDeviceName();
				aloginObj.dwCltVer = device.deviceInfo.getPackageVersion();
				aloginObj.szChannel = dataManager.instance().getData(datas.login.userChannel);
				aloginObj.bIfCheckUpdate = 0;
				aloginObj.bOperatersType = device.deviceInfo.getMobileOperatorsType();
				aloginObj.dwSpecChannlVer = 0;
				aloginObj.iMapTemplateID = dataManager.instance().getData(datas.login.gameId);
				net.network.instance().sendMessage(aloginObj, new net.messageHandler(self, function (data) {
					if (data == null) {
						reject(strings.global.commonMessageError);
					} else if (data.bResult === csproto.CSProto.LOGINRESULT_SUCCESS || data.bResult === csproto.CSProto.LOGINRESULT_ROLEONLINE) {
						resolve(data);
					} else {
						reject(util.tools.formatCodeMessage(data.bResult, data.szHintMsg));
					}
				}), 5000);
			});
			return promise;
		}

		private enablePingLoop(enable: boolean) {
			if (enable) {
				Laya.timer.loop(this.pingMessageTime, this, this.sendPingMessage);
			} else {
				Laya.timer.clear(this, this.sendPingMessage);
			}
		}

		private sendPingMessage() {
			if (dataManager.instance().getData(datas.global.pingValue) == null) {
				dataManager.instance().setData(datas.global.pingValue, 0x7fffffff);
			}

			var pingObj = net.messageBuilder.instance().autoBuild("CSProto.CMD_PING_CS");
			if (dataManager.instance().getData(datas.global.enableCSProto)) {
				pingObj.dwClientTick = (new Date().getTime()) & 0x7fffffff;
				pingObj.dwLastDelay = dataManager.instance().getData(datas.global.pingValue);

				net.network.instance().sendMessage(pingObj, new net.messageHandler(this, function (data) {
					if (data == null) {
						this.onPingTimeout();
					} else {
						dataManager.instance().setData(datas.global.pingValue, (new Date().getTime()) & 0x7fffffff - data.dwClientTick);
					}
				}.bind(this)), 4000);
			} else {
				pingObj.client_tick = (new Date().getTime()) & 0x7fffffff;
				pingObj.last_delay = dataManager.instance().getData(datas.global.pingValue);

				net.network.instance().sendMessage(pingObj, new net.messageHandler(this, function (data) {
					if (data == null) {
						this.onPingTimeout();
					} else {
						dataManager.instance().setData(datas.global.pingValue, (new Date().getTime()) & 0x7fffffff - data.client_tick);
					}
				}.bind(this)), 4000);
			}
		}
	}
}