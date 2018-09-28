module framework.ui.binder {
	export class uiLoader {

		public viewName: string = "";
		public params: string = "";

		private instance: any = null;

		constructor() {
		}

		public set owner(value: any) {
			this.instance = value;
			if (util.type.isString(this.viewName)) {
				var names = this.viewName.split(".");

				var getObj = function (obj, prop) {
					if (obj != null && obj.hasOwnProperty(prop)) {
						return obj[prop];
					}
					return null;
				}

				var viewClass =  (<any>Browser.window).ui;
				for (var i = 0; i < names.length; i++){
					viewClass = getObj(viewClass, names[i]);
				}

				if(viewClass != null){
					var view = new viewClass();
					this.instance.addChild(view);
				}
			}

		}

	}
}