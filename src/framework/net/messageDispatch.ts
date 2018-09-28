module framework.net {
	import Event = Laya.Event;

	export interface messageCallback {
		(data?: any): void;
	}

	export enum socketConnectEvent {
		None = 0,
		Connected,
		Reconnected,
		Error,
		Closed
	}

	class messageHandler {
		enable: boolean;
		objInstance: any;
		message: string;
		callback: messageCallback;
		autoRelease: boolean;
	}

	export class messageSendInfo {
		sendTime: number;
		handler: messageHandler;
		constructor(time: number, handler: messageHandler) {
			this.sendTime = time;
			this.handler = handler;
		}
	}

	class messageDispathInfo {
		messageKey: string;
		messageObj: any;
		constructor(key: string, obj: any) {
			this.messageKey = key;
			this.messageObj = obj;
		}
	}

	export class messageDispatch {

		private static instanceObj: messageDispatch = null;
		public static instance(): messageDispatch {
			if (messageDispatch.instanceObj == null) {
				messageDispatch.instanceObj = new messageDispatch();
			}
			return messageDispatch.instanceObj;
		}

		private messageRegisterMap = new Map<string, Array<messageHandler>>();
		private sentMessageCallbackList = new Array<messageSendInfo>();
		private pauseMessageDispatch = false;
		private messageDispatchList = new Array<messageDispathInfo>();

		constructor() {
			this.messageRegisterMap.clear();
			this.sentMessageCallbackList.length = 0;
			this.messageDispatchList.length = 0;

			Laya.timer.loop(1000, this, this.messageResponseChecker);
		}

		public pauseDispatch() {
			this.pauseMessageDispatch = true;
		}

		public resumeDispatch() {
			this.pauseMessageDispatch = false;
			for (var i = 0; i < this.messageDispatchList.length; i++) {
				var msg = this.messageDispatchList[i];
				this.onMessageCallback(msg.messageKey, msg.messageObj);
			}
			this.messageDispatchList.length = 0;
		}

		public onSocketConnect() {
			this.sentMessageCallbackList.length = 0;
			this.messageDispatchList.length = 0;

			this.onMessageCallback(this.getMessageKey(socketConnectEvent[socketConnectEvent.Connected]), null);
		}

		public onSocketReconnect(result: boolean, msg: string){
			this.onMessageCallback(this.getMessageKey(socketConnectEvent[socketConnectEvent.Reconnected]), {result: result, msg: msg});
		}

		public onSocketError(e: Event) {
			this.onMessageCallback(this.getMessageKey(socketConnectEvent[socketConnectEvent.Error]), e);
		}

		public onSocketClose() {
			this.onMessageCallback(this.getMessageKey(socketConnectEvent[socketConnectEvent.Closed]), null);
		}

		public onSocketMessage(message: any) {
			if (message instanceof ArrayBuffer) {
				var messageObj = messageBuilder.instance().decode(new Uint8Array(message));
				if(messageObj == null){
					return;
				}
				var messageType = messageBuilder.instance().getMessageType(messageObj);
				var messageKey = this.getMessageKey(messageType);

				if (this.pauseMessageDispatch === true) {
					this.messageDispatchList.push(new messageDispathInfo(messageKey, messageObj));
				} else {
					this.onMessageCallback(messageKey, messageObj);
				}
			}
		}

		private onMessageCallback(messageKey: string, messageObj: any) {
			common.log.info("[messageDispatch] onMessage: {0}", messageKey);

			let eventList: Array<messageHandler> = this.messageRegisterMap[messageKey];
			if (eventList != null) {
				var updateEventList = false;
				var updateCallbackList = false;
				for (var i = 0; i < eventList.length; i++) {
					var handler = eventList[i];
					if (handler.enable === true && typeof handler.callback === "function") {

						if (handler.autoRelease === true) {
							handler.enable = false;
							updateEventList = true;
						}
						handler.callback.call(handler.objInstance, messageObj);

						//message timeout process
						for (var j = 0; j < this.sentMessageCallbackList.length; j++) {
							if (!this.sentMessageCallbackList[j]) {
								continue;
							}
							var sentHandler = this.sentMessageCallbackList[j].handler;
							if (sentHandler.message === messageKey && sentHandler.objInstance === handler.objInstance) {
								this.sentMessageCallbackList[j] = null;
								updateCallbackList = true;
							}
						}
					}
				}

				if (updateEventList) {
					this.messageRegisterMap[messageKey] = eventList.filter(function (element) {
						return (element.enable === true);
					});
				}

				if (updateCallbackList) {
					this.updateMessageCallbackList();
				}
			}
		}

		private updateMessageCallbackList() {
			this.sentMessageCallbackList = this.sentMessageCallbackList.filter(function (element) {
				return (element != null);
			});
		}

		public registerConnectEvent(type: socketConnectEvent, obj: any, callback: messageCallback) {
			var messageKey = this.getMessageKey(socketConnectEvent[type]);
			this.registerSocketEvent(obj, messageKey, callback, false);
		}

		public unregisterConnectEvent(type: socketConnectEvent, obj: any) {
			var messageKey = this.getMessageKey(socketConnectEvent[type]);
			this.unregisterSocketEvent(messageKey, obj);
		}

		public registerMessageEvent(msgName: string, obj: any, callback: messageCallback, autoRelease: boolean = false): messageHandler {
			var messageKey = this.getMessageKey(msgName);
			return this.registerSocketEvent(obj, messageKey, callback, autoRelease);
		}

		public unregisterMessageEvent(msgName: string, obj: any) {
			this.unregisterSocketEvent(msgName, obj);
		}

		private unregisterSocketEvent(msgName: string, obj: any) {
			var eventList = this.messageRegisterMap[msgName];
			if (eventList != null) {
				this.messageRegisterMap[msgName] = eventList.filter(function (element) {
					return (element.objInstance != obj || element.message != msgName);
				});
			}
		}

		public unregisterAllSocketEvent(obj: any) {
			var messageMap = this.messageRegisterMap;
			for (var message in messageMap) {
				if (messageMap.hasOwnProperty(message)) {
					var eventList = messageMap[message];
					if (eventList != null) {
						messageMap[message] = eventList.filter(function (element) {
							return (element.objInstance != obj);
						});
					}
				}
			}
		}

		private registerSocketEvent(obj: any, message: string, callback: messageCallback, autoRelease: boolean): messageHandler {
			var eventList: Array<messageHandler> = this.messageRegisterMap[message];
			if (eventList != null) {
				eventList = eventList.filter(function (element) {
					return (element.objInstance !== obj || element.message !== message);
				});
			}

			var handler = new messageHandler();
			handler.enable = true;
			handler.objInstance = obj;
			handler.message = message;
			handler.callback = callback;
			handler.autoRelease = autoRelease;

			this.messageRegisterMap[message] = this.messageRegisterMap[message] || [];
			this.messageRegisterMap[message].push(handler);
			return handler;
		}

		public checkMessageResponse(sentInfo: messageSendInfo) {
			this.sentMessageCallbackList.push(sentInfo);
		}

		private messageResponseChecker() {
			if (this.sentMessageCallbackList.length === 0) {
				return;
			}

			var updateList = false;
			var currTime = new Date().getTime();
			for (var i = 0; i < this.sentMessageCallbackList.length; i++) {
				var sentInfo = this.sentMessageCallbackList[i];
				//time out
				if (sentInfo.sendTime < currTime) {
					this.onMessageCallback(sentInfo.handler.message, null);
					updateList = true;
					this.sentMessageCallbackList[i] = null;
				}
			}

			if (updateList === true) {
				this.updateMessageCallbackList();
			}
		}

		private getMessageKey(message) {
			return "socket_" + message;
		}

	}
}