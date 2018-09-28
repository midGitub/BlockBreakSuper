import sceneManager = framework.ui.sceneManager;
import { ui } from "./ui/layaMaxUI";

module game {

	export class BlockBreakGame implements framework.core.IGame {
		gameId: number;

		constructor() {
		}

		onLoad() {
			sceneManager.instance().registerScene<script.scene.LaunchScene, ui.scene.LaunchSceneUI>(0, script.LaunchScene, ui.scene.LaunchSceneUI);
			sceneManager.instance().loadScene(0);
		}

		onStart() {
		}

		onExit() {
		}

		onDestroy() {
		}
	}
}

new framework.core.gameLoader(new game.BlockBreakGame());
