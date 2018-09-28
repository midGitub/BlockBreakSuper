module framework.common{
	export class resources{
		
		public static preloadResource(uiClass, callback: () => void) {
			var images = new Map<string, number>();
			var imageList = new Array<string>();
			var getImags = function (obj) {
				for (var prop in obj) {
					if (obj.hasOwnProperty(prop)) {
						if (prop == "skin") {
							var name = obj[prop];
							if (!name.startWith("res/textures") && !name.startWith("res/framework/textures")) {
								name = name.substring(0, name.lastIndexOf('/'));
								name = "res/" + name + ".atlas";
							}
							if (images.has(name)) {
								images.set(name, images.get(name) + 1);
							} else {
								images.set(name, 1);
								imageList.push(name);
							}
						} else if (util.type.isObject(obj[prop])) {
							getImags(obj[prop]);
						}
					}
				}
			}
			getImags(uiClass.uiView);

			if (imageList.length > 0) {
				Laya.loader.load(imageList, Laya.Handler.create(null, function () {
					if (util.type.isFunction(callback)) {
						callback();
					}
				}));
			} else {
				if (util.type.isFunction(callback)) {
					callback();
				}
			}
		}
	}
}