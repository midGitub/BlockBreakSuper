import { ui } from "../../ui/layaMaxUI";

export module script.scene {
	export class LaunchScene extends framework.ui.scene<ui.scene.LaunchSceneUI> {

		public onEnter(): void {
			Laya.Stat.show(0,0);
			this.login();
			this.root.timerOnce(10 * 1000, this, () => {
				Browser.window.location.href = "action://launchEnd";
			});
		}

		public onLoad(): void {
			framework.common.log.info("launchScene onLoad");
		}

		public onExit(): void {
			framework.common.log.info("launchScene onExit");
		}

		public onDestroy(): void {
			framework.common.log.info("launchScene onDestroy");
		}

		public onConnectEvent(connected: boolean, msg: string){
			framework.common.log.info("launchScene onConnectEvent: connected: {0}, msg: {1}", connected, msg);
		}
		
		private login() {
			var gameId = framework.session.dataManager.instance().getData(datas.global.enableCSProto) ? 1301 : 1201;		
			framework.session.loginManager.instance().login(gameId, "http://10.8.50.157:14000/svraddr?ver=1", function (result: boolean, msg: string) {						
				if (!result) {
					Browser.window.location.href = "action://launchEnd";
					framework.common.log.error("login result: {0}, {1}", result, msg);
					framework.ui.commonDialog.instance().dialog(msg, "返回大厅", function(){
						framework.ui.sceneManager.instance().gotoHall();
					});
				}
			}.bind(this), true);
		}
	}
}