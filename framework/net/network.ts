import Browser = laya.utils.Browser;

module framework.net {

	export class messageHandler {
		public instance: any;
		public callback: messageCallback;

		constructor(instance: any, callback: messageCallback) {
			this.instance = instance;
			this.callback = callback;
		}
	}

	export class network {

		private static instanceObj: network = null;
		public static instance(): network {
			if (network.instanceObj == null) {
				network.instanceObj = new network();
			}
			return network.instanceObj;
		}

		private socket: socketHandler = null;
		private http: Laya.HttpRequest = null;

		constructor() {
			this.socket = new socketHandler();
		}

		public connectServer(url) {
			this.socket.connect(url);
		}

		public connectHandler(onOpen: () => void, onError: (Event) => void) {
			this.socket.socketHandler(onOpen, onError);
		}

		public closeConnect() {
			this.socket.close();
		}

		public sendMessage(messageObj: any, callback: messageHandler = null, timeout: number = 15000) {
			var messageType = messageBuilder.instance().getMessageType(messageObj);
			if (callback != null) {
				var handler = messageDispatch.instance().registerMessageEvent(messageType, callback.instance, callback.callback, true);
				if (handler != null && timeout > 0) {
					messageDispatch.instance().checkMessageResponse(new messageSendInfo(new Date().getTime() + timeout, handler));
				}
			}
			this.socket.send(messageBuilder.instance().encode(messageObj));
			common.log.info("[network] sendMessage: {0}", messageType);
		}

		public post(url: string, data: string, callback: (result: boolean, data: any) => any) {
			this.http = new Laya.HttpRequest();
			this.http.once(Laya.Event.COMPLETE, this, (e: any) => {
				try {
					if (callback != null) {
						callback(true, this.http.data);
					}
				}
				catch (e) {
					if (callback != null) {
						callback(false, e);
					}
				}
			});
			this.http.once(Laya.Event.ERROR, this, (e: any) => {
				if (callback != null) {
					callback(false, e);
				}
			});
			this.http.send(url, data, 'post', 'json', ["asdfeerandtree", "1495606910"]);
		}

		public loadJson(url: string): any{
			url = laya.net.ResourceVersion.addVersionPrefix(url);
			var http = new Browser.window.XMLHttpRequest();
			http.open("GET", url, false);
			if (/msie/i.test(Browser.window.navigator.userAgent) && !/opera/i.test(Browser.window.navigator.userAgent)) {
				// IE-specific logic here
				http.setRequestHeader("Accept-Charset", "utf-8");
			} else {
				if (http.overrideMimeType) http.overrideMimeType("text\/plain; charset=utf-8");
			}

			http.send(null);
			if (http.readyState !== 4 || http.status !== 200 && http.status !== 0) {
				return null;
			}
			return JSON.parse(http.responseText);
		}
	}
}