module framework.device {

	export class deviceInfo {

		private static deviceUniqueIdKey: string = "DeviceUniqueIdKey0";
		private static deviceUniqueId: string = "deviceUniqueId_xxx";

		public static getBrowerType() {
			if (Browser.onIOS) {
				return 1;
			}
			else if (Browser.onMac) {
				return 2;
			}
			else if (Browser.onMobile) {
				return 3;
			}
			else if (Browser.onIPhone) {
				return 4;
			}
			else if (Browser.onIPad) {
				return 5;
			}
			else if (Browser.onAndriod) {
				return 6;
			}
			else if (Browser.onWP) {
				return 7;
			}
			else if (Browser.onQQBrowser) {
				return 8;
			}
			else if (Browser.onMQQBrowser) {
				return 9;
			}
			else if (Browser.onSafari) {
				return 10;
			}
			else if (Browser.onFirefox) {
				return 11;
			}
			else if (Browser.onEdge) {
				return 12;
			}
			return -1;

		}
		public static preGetDeviceUniqueId() {
			new Fingerprint2().get(function (result, components) {
				var isMobile = Browser.onIPad
				deviceInfo.deviceUniqueId = result + deviceInfo.getBrowerType();
				common.log.info("[deviceInfo] getDeviceUniqueId:{0}", deviceInfo.deviceUniqueId);
			});
		}

		public static getDeviceUniqueId(): string {
			if(framework.session.dataManager.instance().getData(datas.global.enableCSProto)) {
				return framework.session.dataManager.instance().getData(datas.global.deviceId);
			}
			return deviceInfo.deviceUniqueId;
		}

		public static getDeviceType(): string {
			return "windows";
		}

		public static getDeviceName() {
			return deviceInfo.getDeviceUniqueId();
		}

		public static getMobileOperatorsType() {
			return 2;
		}

		public static getChannelCode() {
			if(framework.session.dataManager.instance().getData(datas.global.enableCSProto)) {
				return framework.session.dataManager.instance().getData(datas.global.channelCode);
			}
			return "000";
		}

		public static getPackageVersion() {
			if(framework.session.dataManager.instance().getData(datas.global.enableCSProto)) {
				return framework.session.dataManager.instance().getData(datas.global.version);
			}
			return 10001;
		}
	}
}