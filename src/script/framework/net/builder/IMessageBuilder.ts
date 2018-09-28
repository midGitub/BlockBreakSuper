module framework.net.builder{

	export interface IMessageBuilder{
		setupBuilder(protos: Array<string>, callback: (result: boolean, msg: string) => any):void;
		getMessageType(messageObj): string;
		build(messageName):any;
		autoBuild(messageName):any;
		encode(messageObj):any;
		decode(buffer, uploadMessage):any;
	}
}