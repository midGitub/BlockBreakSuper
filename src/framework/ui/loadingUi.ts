module framework.ui {

	export class loadingUi {

		private static keys = new Map<string, boolean>();
		private static zOrder = 10000;
		private static resName = "res/framework/textures/loading/hall_loading_icon.png";

		public static loadRes(){
			new laya.ui.Image(this.resName);
		}

		public static lock(key: string, tips: string, time: number = 5000) {
			loadingUi.keys.set(key, true);

			var view = loadingUi.createLoadingUi(key, tips);
			Laya.timer.clearAll(view);
			Laya.timer.once(time, view, function () {
				loadingUi.unlock(key);
			});
			common.log.info("[loadingUi] lock: {0}, {1}, {2}", key, tips, time);
		}

		public static unlock(key: string) {
			var view = Laya.stage.getChildByName(key) as laya.ui.View;
			if (view != null) {
				Laya.timer.clearAll(view);
				view.destroy(true);
			}
			common.log.info("[loadingUi] unlock: {0}", key);
		}

		public static unlockAll() {
			loadingUi.keys.forEach(function (value, key, map) {
				loadingUi.unlock(key);
			});
			loadingUi.keys.clear();
			common.log.info("[loadingUi] unlockAll");
		}

		private static createLoadingUi(key: string, tips: string): laya.ui.View {
			var view = Laya.stage.getChildByName(key) as laya.ui.View;
			if (view == null) {
				view = new laya.ui.View;
				view.width = Laya.stage.width;
				view.height = Laya.stage.height;
				view.on(Laya.Event.CLICK, this, function (event: Laya.Event) {
					event.stopPropagation();
				}.bind(view));

				var image = new laya.ui.Image(this.resName);
				image.anchorX = 0.5;
				image.anchorY = 0.5;
				view.addChild(image);
				image.centerX = 0;
				image.centerY = 0;
				Laya.Tween.to(image, { rotation: 360 * 32 }, 5000 * 8);

				if (tips.length > 0) {
					var label = new laya.ui.Label(tips);
					view.addChild(label);
					label.fontSize = 24;
					label.color = "#ffffff";
					label.align = "center";
					label.anchorX = 0.5;
					label.anchorY = 0.5;
					label.centerX = 0;
					label.centerY = 50;
					label.stroke = 3;
					label.strokeColor = "#03142d";
				}
				view.name = key;
				view.zOrder = loadingUi.zOrder++;
				Laya.stage.addChild(view);
			}
			return view;
		}
	}
}