
export module datas {
	export class global {
		public static enableCSProto = "global.enableCSProto";  //是否使用协议
		public static deviceId = "global.deviceId";  //设备ID
		public static channelCode = "global.channelCode";  //设备ID
		public static version = "global.version";  //游戏版本
		public static pingValue = "global.pingValue";  //网络延时
		public static errorCode = "global.errorCode";  //CMD_ERROR中的error_code字段
		public static commandId = "global.commandId";  //CMD_ERROR中的cmd_id字段
		public static serverTime = "global.serverTime"; //对时时服务器的时间
		public static clientTime = "global.clientTime"; //对时时客户端的时间
	}
}