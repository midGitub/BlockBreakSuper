import GameConfig from "./GameConfig";
import sceneManager from "./framework/ui/sceneManager";
import launchScene from "./game/scene/launchScene";
import mainMenuScene from "./game/scene/mainMenuScene";
import gameScene from "./game/scene/gameScene";

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
		sceneManager.instance().registerScene<launchScene>(0, launchScene, "LaunchScene.json");
		sceneManager.instance().registerScene<mainMenuScene>(1, mainMenuScene, "MainMenu.json");
		sceneManager.instance().registerScene<gameScene>(2, gameScene, "GameScene.json");
	}

	run(): void {
		sceneManager.instance().loadScene(0);
	}
}

new Main();
