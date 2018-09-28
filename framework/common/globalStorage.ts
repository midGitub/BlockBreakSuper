module framework.common {

	export class globalStorage {

		private static instanceObj: globalStorage = null;
		public static instance(): globalStorage {
			if (globalStorage.instanceObj == null) {
				globalStorage.instanceObj = new globalStorage();
			}
			return globalStorage.instanceObj;
		}

		private isLocalStorageEnable: boolean = false;
		private gobalItems = new Map<string, string>();
		private globalStorageKeyPrefix = "GlobalStorageKey_";

		constructor() {
			this.load();
		}

		private load() {
			this.localStorageEnable();
			this.gobalItems.clear();

			if (this.isLocalStorageEnable) {
				for (var i = 0; i < Browser.window.localStorage.length; i++) {
					var key = Browser.window.localStorage.key(i);
					var value = Browser.window.localStorage.getItem(key);
					if (this.isGlobalStorageKey(key)) {
						this.gobalItems.set(this.getGlobalStorageKey(key), value);
					}
				}
			}

			var urlDatas = this.decodeFromURIParams();
			if (urlDatas.size > 0) {
				urlDatas.forEach(function (value, key, map) {
					this.setItem(key, value);
				}, this);
			}
		}

		public reload() {
			if (this.isLocalStorageEnable) {
				var removeKeys = new Array<string>();
				for (var i = 0; i < Browser.window.localStorage.length; i++) {
					var key = Browser.window.localStorage.key(i);
					if (this.isGlobalStorageKey(key)) {
						removeKeys.push(key);
					}
				}
				for (var i = 0; i < removeKeys.length; i++) {
					Browser.window.localStorage.removeItem(removeKeys[i]);
				}
			}
			this.load();
		}

		private getLocalStorageKey(key: string) {
			return this.globalStorageKeyPrefix + key;
		}

		private getGlobalStorageKey(key: string) {
			if (this.isGlobalStorageKey(key)) {
				return key.substr(this.globalStorageKeyPrefix.length);
			}
			return key;
		}

		private isGlobalStorageKey(key: string) {
			return key.indexOf(this.globalStorageKeyPrefix) == 0;
		}

		public localStorageEnable(): boolean {
			this.isLocalStorageEnable = false;
			//强制使用参数保存数据
			// if (Browser.window.localStorage) {
			// 	try {
			// 		Browser.window.localStorage.setItem('local_storage_test', '1');
			// 		Browser.window.localStorage.removeItem('local_storage_test');
			// 		this.isLocalStorageEnable = true;
			// 		return true;
			// 	} catch (e) {
			// 	}
			// }
			return false;
		}

		public getItem(key: string): string {
			var value = this.gobalItems.get(key);
			value = value == null ? "" : value;
			common.log.info("[globalStorage] getItem: {0} = {1}", key, value);
			return value;
		}

		public setItem(key: string, value: string) {
			this.gobalItems.set(key, value);
			if (this.isLocalStorageEnable) {
				Browser.window.localStorage.setItem(this.getLocalStorageKey(key), value);
			}
			common.log.info("[globalStorage] setItem: {0} = {1}", key, value);
		}

		public encodeToURIParams(): string {
			if (!this.isLocalStorageEnable) {
				var params = "";
				this.gobalItems.forEach(function (value, key, map) {
					params += (key + "=" + encodeURIComponent(value) + "&");
				});

				if (params.length > 0) {
					return "&" + params.substr(0, params.length - 1);
				}
			}

			return "";
		}

		private decodeFromURIParams(): Map<string, string> {
			var items = new Map<string, string>();
			var url = Browser.window.location.search;
			if (url.indexOf("?") == 0) {
				var urlParam = url.substr(1);
				var params = urlParam.split("&");
				for (var i = 0; i < params.length; i++) {
					var param = params[i].split("=");
					var key = param[0];
					if (key != "time") {
						if (key == "token") {
							items.set(key, param[1]);
						} else {
							var value = decodeURIComponent(decodeURIComponent(param[1]));
							items.set(key, value);
						}
					}
				}
			}
			return items;
		}
	}
}