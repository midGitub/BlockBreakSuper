import { ui } from "../../ui/layaMaxUI";

export module script.scene {

	export class GameScene extends framework.ui.scene<ui.scene.GameSceneUI> {

		public onLoad(): void {

		}

		public onEnter(): void {
			framework.common.log.info("mainMenuScene onEnter");
			Browser.window.location.href = "action://launchEnd";
		}

		public onExit(): void {
			framework.common.log.info("mainMenuScene onExit");
		}

		public onDestroy(): void {
			framework.common.log.info("mainMenuScene onDestroy");
		}

		public onConnectEvent(connected: boolean, msg: string): void {
			framework.common.log.info("mainMenuScene onConnectEvent: connected: {0}, msg: {1}", connected, msg);
		}
	}
}
