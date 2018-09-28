
module framework.core {
	import ResourceVersion = laya.net.ResourceVersion;

	export class gameLoader {
		public static gameInstance: IGame = null

		constructor(game: IGame) {
			gameLoader.gameInstance = game;
			common.log.setErrorHandler();
			device.deviceInfo.preGetDeviceUniqueId();
			this.initFramework();
		}

		private initFramework() {
			this.setupStage();
		}

		private setupStage() {
			Config.isAntialias=true;
			Laya.init(640, 1136, Laya.WebGL);
			//Laya.DebugPanel.init();//调试模式
			//Laya.Stat.show(0,0);
			Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
			Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
			Laya.stage.scaleMode = "fixedwidth";
			Laya.stage.bgColor = "#232628";

			ResourceVersion.type = ResourceVersion.FILENAME_VERSION;
			ResourceVersion.enable("version.json", laya.utils.Handler.create(this, function () {
				framework.ui.loadingUi.loadRes();
				framework.ui.commonDialog.loadRes();
				Laya.timer.callLater(this, this.onLoad);
			}));
		}

		private initModules(callback: (result: boolean, msg: string) => void) {
			session.dataManager.instance().initialize();
			this.checkRunMode();
			if(framework.session.dataManager.instance().getData(datas.global.enableCSProto)){
				session.csProtoGlobalMessageHandler.instance().initialize();
				net.messageBuilder.instance().registerMessageBuilder(new net.builder.csProtoBuilder());
			} else {
				session.globalMessageHandler.instance().initialize();
			}
			ui.sceneManager.instance().initialize();
			common.configs.clear();
			net.messageBuilder.instance().setupBuilder([ResourceVersion.addVersionPrefix("res/framework/protos/KConnectProto.proto"),
			ResourceVersion.addVersionPrefix("res/framework/protos/CSProto.proto")], callback);
		}

		private checkRunMode(){
			var enableCSProto = common.globalStorage.instance().getItem("csproto") == "1";
			var gameServer = common.globalStorage.instance().getItem("gameserver");
			var identityToken = common.globalStorage.instance().getItem("token");
			var userChannel = common.globalStorage.instance().getItem("userChannel");
			var channelCode = common.globalStorage.instance().getItem("channelCode");
			var deviceId = common.globalStorage.instance().getItem("deviceid");
			var account = common.globalStorage.instance().getItem("account");
			var version = common.globalStorage.instance().getItem("version");

			framework.session.dataManager.instance().setData(datas.global.enableCSProto, enableCSProto);
			framework.session.dataManager.instance().setData(datas.global.deviceId, deviceId);
			framework.session.dataManager.instance().setData(datas.login.account, account);
			framework.session.dataManager.instance().setData(datas.global.version, version);
			framework.session.dataManager.instance().setData(datas.global.channelCode, channelCode);
			framework.session.dataManager.instance().setData(datas.login.gameServer, gameServer);
			framework.session.dataManager.instance().setData(datas.login.identityToken, identityToken);
			framework.session.dataManager.instance().setData(datas.login.userChannel, userChannel);

			// framework.session.dataManager.instance().setData(datas.global.enableCSProto, true);
			// framework.session.dataManager.instance().setData(datas.global.deviceId, "3f7b701136675c82daf083ec9fcfefd61");
			// framework.session.dataManager.instance().setData(datas.login.account, "3f7b701136675c82daf083ec9fcfefd61");
			// framework.session.dataManager.instance().setData(datas.global.version, "31010");
			// framework.session.dataManager.instance().setData(datas.global.channelCode, "001");
			// framework.session.dataManager.instance().setData(datas.login.gameServer, "ws://123.59.94.55:39800");
			// framework.session.dataManager.instance().setData(datas.login.identityToken, "AAAhM2Y3YjcwMTEzNjY3NWM4MmRhZjA4M2VjOWZjZmVmZDYxADNuenkwMDB5MTUzNzE3MzEzM3kzZjdiNzAxMTM2Njc1YzgyZGFmMDgzZWM5ZmNmZWZkNjECAAAAAFufZo0AAAAQOuh1cD4zT0T0eq%2BBm2DdNA%3D%3D");
			// framework.session.dataManager.instance().setData(datas.login.userChannel, "0");
		}

		private onLoad() {
			this.initModules(function (result: boolean, msg: string) {
				if (result) {
					if (gameLoader.gameInstance) {
						gameLoader.gameInstance.onLoad();
					}
				} else {
					common.log.error("[gameLoader] initModules : {0}", msg);
				}
			});
		}
	}

}