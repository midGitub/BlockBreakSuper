module framework.ui {
	export class sceneManager {

		private static instanceObj: sceneManager = null;
		public static instance(): sceneManager {
			if (sceneManager.instanceObj == null) {
				sceneManager.instanceObj = new sceneManager();

			}
			return sceneManager.instanceObj;
		}

		private currentScene: any = null;
		private sceneRegisterInfo = new Map<number, any>();

		public initialize() {
			this.sceneRegisterInfo.clear();
			net.messageDispatch.instance().registerConnectEvent(net.socketConnectEvent.Reconnected, this, function (param) {
				if (this.currentScene != null && util.type.isObject(param)) {
					this.currentScene.onConnectEvent(param.result, param.msg);
				}
			})
		}

		public registerScene<S extends scene<T>, T extends laya.display.Scene>(sceneId: number, s: { new (): S }, t: { new (): T }) {
			this.sceneRegisterInfo.set(sceneId, { s: s, t: t });
		}

		public preloadScene(sceneId: number, callback: () => any) {
			var info = this.sceneRegisterInfo.get(sceneId);
			if (info != null) {
				common.resources.preloadResource(info.t, function () {
					if (callback != null) {
						callback();
					}
				});
			}
		}

		public loadScene(sceneId: number) {
			var info = this.sceneRegisterInfo.get(sceneId);
			common.resources.preloadResource(info.t, function () {

				if (this.currentScene != null) {
					this.currentScene.onExit();
					this.currentScene.onDestroy();
					this.currentScene.destroy();
					this.currentScene = null;
				}

				this.currentScene = new info.s();
				this.currentScene.load(new info.t());
				this.currentScene.onLoad();
				// Laya.timer.frameOnce(1, this, function(){
				// 	this.currentScene.onEnter();
				// 	framework.net.messageDispatch.instance().resumeDispatch();
				// }.bind(this));
				framework.ui.loadingUi.unlockAll();
				this.currentScene.onEnter();
				framework.net.messageDispatch.instance().resumeDispatch();

			}.bind(this));
		}

		public runningScene(): any {
			return this.currentScene;
		}

		public gotoHall() {
			var hallUrl = util.tools.getGameUrl("hall")
			if (hallUrl.length > 0) {
				Browser.window.location.href = hallUrl;
			}
		}

	}
}