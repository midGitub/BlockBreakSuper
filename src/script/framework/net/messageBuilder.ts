
module framework.net {
	

	export class messageBuilder implements builder.IMessageBuilder{

		private static instanceObj: messageBuilder = null;
		public static instance(): messageBuilder {
			if (messageBuilder.instanceObj == null) {
				messageBuilder.instanceObj = new messageBuilder();
				messageBuilder.instanceObj.registerMessageBuilder(new builder.protoBuffBuilder());
			}
			return messageBuilder.instanceObj;
		}

		private messageBuilder: builder.IMessageBuilder = null;

		public registerMessageBuilder(builder : builder.IMessageBuilder){
			this.messageBuilder = builder;
		}

		public setupBuilder(protos: Array<string>, callback: (result: boolean, msg: string) => any) {
			this.messageBuilder.setupBuilder(protos, callback);
		}

		public getMessageType(messageObj): string {
			return this.messageBuilder.getMessageType(messageObj);
		}

		public build(messageName) {
			return this.messageBuilder.build(messageName);
		}

		public autoBuild(messageName) {
			return this.messageBuilder.autoBuild(messageName);
		}

		public encode(messageObj) {
			return this.messageBuilder.encode(messageObj);
		}

		public decode(buffer, uploadMessage = false) {
			return this.messageBuilder.decode(buffer, uploadMessage);
		}
		
	}
}