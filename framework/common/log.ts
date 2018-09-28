module framework.common {

	export class log {

		private static format(format: string, ...params: any[]): string {
			var str = format;
			if (params.length > 0) {
				for (var i = 0; i < params.length; i++) {
					var tmp = params[i];
					if (tmp != null && tmp.toString != null && typeof tmp.toString === "function") {
						str = str.replace('{' + i + '}', tmp.toString());
					}
				}
			}
			// @ts-ignore
			return (new Date()).format("yyyy-MM-dd hh:mm:ss") + " " + str;
		}

		public static info(format: string, ...params: any[]) {
			Browser.window.console.log(log.format(format, ...params));
		}

		public static error(format: string, ...params: any[]) {
			Browser.window.console.error(log.format(format, ...params));
		}

		public static setErrorHandler() {
			Browser.window.onerror = function (msg, url, lineNo, columnNo, error) {
				var string = msg.toLowerCase();
				var substring = "script error";
				if (string.indexOf(substring) > -1) {
					Browser.window.alert('Script Error: See Browser Console for Detail');
				} else {
					var message = [
						'Message: ' + msg + "\n",
						'URL: ' + url + "\n",
						'Line: ' + lineNo + "\n",
						'Column: ' + columnNo + "\n",
						'Stack: ' + error.stack
					].join(' - ');

					Browser.window.alert(message);
				}

				return false;
			};
		}
	}
}