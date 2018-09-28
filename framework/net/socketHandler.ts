
module framework.net {
	import Event = Laya.Event;
	import Socket = Laya.Socket;
	import Byte = Laya.Byte;

	export class socketHandler {

		private socket: Socket;
		private openHandler: () => void;
		private errorHandler: (Event) => void;

		public connect(url: string) {
			this.socket = new Socket();
			this.socket.on(Event.OPEN, this, this.onSocketOpen);
			this.socket.on(Event.CLOSE, this, this.onSocketClose);
			this.socket.on(Event.MESSAGE, this, this.onMessageReveived);
			this.socket.on(Event.ERROR, this, this.onConnectError);

			this.socket.connectByUrl(url);
		}

		public socketHandler(onOpen: () => void, onError: (Event) => void) {
			this.openHandler = onOpen;
			this.errorHandler = onError;
		}

		public close() {
			if (this.socket != null) {
				this.socket.close();
				this.socket = null;
			}
		}

		public send(data: ArrayBuffer) {
			if (this.socket != null && this.socket.connected) {
				this.socket.send(data);
				this.socket.flush();
			}
		}

		private onSocketOpen(): void {
			if (util.type.isFunction(this.openHandler)) {
				this.openHandler();
			}
			messageDispatch.instance().onSocketConnect();
		}

		private onSocketClose(): void {
			messageDispatch.instance().onSocketClose();
		}

		private onMessageReveived(message: any): void {
			messageDispatch.instance().onSocketMessage(message);
		}

		private onConnectError(e: Event): void {
			if (util.type.isFunction(this.errorHandler)) {
				this.errorHandler(e);
			}

			messageDispatch.instance().onSocketError(e);
			this.close();
		}
	}
}