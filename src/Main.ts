import GameConfig from "./GameConfig";
import sceneManager from "./framework/ui/sceneManager";
import launchScene from "./game/scene/launchScene";
import mainMenuScene from "./game/scene/mainMenuScene";
import gameScene from "./game/scene/gameScene";
import { ui } from "./ui/layaMaxUI";

class Main {
	constructor() {
		if (Laya.Browser.window["Laya3D"]) {
			Laya3D.init(GameConfig.width, GameConfig.height);
		} else {
			Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		}

		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded(): void {
		this.initModules();
		this.registerScene();
		this.run();
	}

	initModules(): void {

	}

	registerScene(): void {
		var ma = new ui.MainMenuUI();
		ma.open();
		sceneManager.instance().registerScene<launchScene, ui.LaunchSceneUI>(0, launchScene, ui.LaunchSceneUI);
		sceneManager.instance().registerScene<mainMenuScene, ui.MainMenuUI>(1, mainMenuScene, ui.MainMenuUI);
		sceneManager.instance().registerScene<gameScene, ui.GameSceneUI>(2, gameScene, ui.GameSceneUI);
	}

	run(): void {
		sceneManager.instance().loadScene(0);
	}
}

new Main();
