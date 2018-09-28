/**
* name 
*/
module framework.util{
	export class time{
		
		// 获取客户端相对于服务器的时间
		public static getClientRelativeTime(serverNewTime: number):number{
			var serverTime = session.dataManager.instance().getData(datas.global.serverTime);
			var clientTime = session.dataManager.instance().getData(datas.global.clientTime);
			if(!type.isNumber(serverTime)){
				serverTime = 0;
			}
			if(!type.isNumber(clientTime)){
				clientTime = 0;
			}

			if(serverTime == 0 || clientTime == 0){
				return Browser.now();
			}

			return clientTime + (serverNewTime - serverTime);
		}

		// 获取服务器相对于客户端的时间
		public static getServerRelativeTime():number{
			var serverTime = session.dataManager.instance().getData(datas.global.serverTime);
			var clientTime = session.dataManager.instance().getData(datas.global.clientTime);
			if(!type.isNumber(serverTime)){
				serverTime = 0;
			}
			if(!type.isNumber(clientTime)){
				clientTime = 0;
			}

			if(serverTime == 0 || clientTime == 0){
				return Browser.now();
			}
			var now = Browser.now();
			return serverTime + (now - clientTime);
		}
	}
}