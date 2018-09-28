module framework.util {
	export class tools {

		//获取访问地址参数
		public static getQueryString(name): string {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = Browser.window.location.search.substr(1).match(reg);
			if (r != null) {
				return decodeURIComponent(r[2]);
			}
			return "";
		}

		public static getGameUrl(name: string) {
			var gameUrl = "";
			// if (name != "hall") {
			// 	var url = Browser.window.location.href as string;
			// 	url = url.replace(Browser.window.location.search, "");
			// 	gameUrl = url.replace("hall", name);
			// } else {
			// 	gameUrl = framework.common.globalStorage.instance().getItem("hall");
			// 	if (gameUrl.length == 0) {
			// 		var host = Browser.window.location.host;
			// 		var globalCfg = common.configs.get<config.global>("res/framework/config/global.json");
			// 		gameUrl = "http://" + host + globalCfg.hallUrl;
			// 	}
			// }
			// gameUrl = gameUrl + "?time=" + Browser.now() + framework.common.globalStorage.instance().encodeToURIParams();
			// common.log.info("[tools] getGameUrl: {0}={1}", name, gameUrl);
			return gameUrl;
		}

		public static formatCodeMessage(code: number, codeDesc: string) {
			if (codeDesc.length > 0) {
				return codeDesc;
			}
			return "未知错误 [" + code + "]";
		}

		public static isPhoneNumber(input: string): boolean {
			var partten = /^1[3,5,7,8,9]\d{9}$/;
			return partten.test(input);
		}

		public static isQQNumber(input: string): boolean {
			var partten = /^[1-9][0-9]{4,}$/;
			return partten.test(input)
		}

		public static stringToByte(str): Array<number> {
			var bytes = new Array<number>();
			var len, c;
			len = str.length;
			for (var i = 0; i < len; i++) {
				c = str.charCodeAt(i);
				if (c >= 0x010000 && c <= 0x10FFFF) {
					bytes.push(((c >> 18) & 0x07) | 0xF0);
					bytes.push(((c >> 12) & 0x3F) | 0x80);
					bytes.push(((c >> 6) & 0x3F) | 0x80);
					bytes.push((c & 0x3F) | 0x80);
				} else if (c >= 0x000800 && c <= 0x00FFFF) {
					bytes.push(((c >> 12) & 0x0F) | 0xE0);
					bytes.push(((c >> 6) & 0x3F) | 0x80);
					bytes.push((c & 0x3F) | 0x80);
				} else if (c >= 0x000080 && c <= 0x0007FF) {
					bytes.push(((c >> 6) & 0x1F) | 0xC0);
					bytes.push((c & 0x3F) | 0x80);
				} else {
					bytes.push(c & 0xFF);
				}
			}
			return bytes;
		}

		public static byteToString(arr: Array<number>): string {
			if (typeof arr === 'string') {
				return arr;
			}
			var str = '';
			var _arr = arr;
			for (var i = 0; i < _arr.length; i++) {
				var one = _arr[i].toString(2),
					v = one.match(/^1+?(?=0)/);
				if (v && one.length == 8) {
					var bytesLength = v[0].length;
					var store = _arr[i].toString(2).slice(7 - bytesLength);
					for (var st = 1; st < bytesLength; st++) {
						store += _arr[st + i].toString(2).slice(2);
					}
					str += String.fromCharCode(parseInt(store, 2));
					i += bytesLength - 1;
				} else {
					str += String.fromCharCode(_arr[i]);
				}
			}
			return str;
		}
	}
}