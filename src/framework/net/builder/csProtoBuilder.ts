/**
* name 
*/
module framework.net.builder {
	export class csProtoBuilder {

		private encodeBuffer: Uint8Array = new Uint8Array(1024 * 4);
		private decodeBuffer: Uint8Array = new Uint8Array(1024 * 4);
		private root = {};
		private messageSeqId: number = 0;

		public setupBuilder(protos: Array<string>, callback: (result: boolean, msg: string) => any) {
			this.root = csproto;
			if (callback != null) {
				callback(true, "");
			}
		}

		public getMessageType(messageObj): string {
			var msg = messageObj as csprotos.message
			return msg.messageName();
		}

		public build(messageName: string) {
			var names = messageName.split(".");
			var current = this.root;
			for(var i = 0; i < names.length; i++){
				if(current[names[i]] != null){
					current = current[names[i]];
				} else {
					return null;
				}
			}
			return new (<any>current)();
		}

		public autoBuild(messageName) {
			return this.build(messageName);
		}

		private getCmdId(buffer: ArrayBuffer, shortIndex: number, offset: number = 0){
			var view = new DataView(buffer, offset);
			return view.getUint16(shortIndex * 2);
		}

		private setPkgLength(buffer: ArrayBuffer, shortIndex: number, value: number, offset: number = 0){
			var view = new DataView(buffer, offset);
			view.setUint16(shortIndex * 2, value);
		}

		public encode(messageObj) {
			var message = messageObj as csprotos.message;
			var cs = new csproto.KConnectProto.CS();
			if(csproto.CSProto.command.hasOwnProperty(message.messageName())){
				var head = new csproto.CSProto.CS();
				head.wCmd = message.messageValue();
				head.dwUpSeqID = this.messageSeqId ++;
				head.stBody = messageObj;

				var headLength = head.encode(this.encodeBuffer.buffer, 0);
				this.setPkgLength(this.encodeBuffer.buffer, 0, headLength);

				var proc = new csproto.KConnectProto.WX_CMD_PROC_CS();
				proc.Mask = 0;
				proc.GameProtoPkg.length = 0;
				for(var i = 0; i < headLength; i++){
					proc.GameProtoPkg.push(this.encodeBuffer[i]);
				}
				cs.Body = proc;
				cs.Cmd = proc.messageValue();
			} else {
				cs.Body = messageObj;
				cs.Cmd = message.messageValue();
			}

			var length = cs.encode(this.encodeBuffer.buffer, 0);
			this.setPkgLength(this.encodeBuffer.buffer, 0, length);
			return this.encodeBuffer.slice(0, length);
		}

		public decode(buffer, uploadMessage = false) {
			buffer = buffer.buffer;
			var sc = new csproto.KConnectProto.SC();
			var cmd = this.getCmdId(buffer, 2);
			var messageName = csproto.KConnectProto.command_name[cmd];
			var body = new csproto.KConnectProto[messageName + "_SC"];
			sc.Body = body;
			var length = sc.decode(buffer, 0);
			if(messageName == "WX_CMD_PROC"){
				var proc = sc.Body as csproto.KConnectProto.WX_CMD_PROC_SC;
				var head = new csproto.CSProto.SC();
				var pkgArray = new Uint8Array(proc.GameProtoPkg);
				var cmd = this.getCmdId(pkgArray.buffer, 2);
				var messageName = csproto.CSProto.command_name[cmd];
				head.stBody = new csproto.CSProto[messageName + "_SC"]();
				head.decode(pkgArray.buffer, 0);
				return head.stBody;
			} else {
				return sc.Body;
			}
		}
	}
}