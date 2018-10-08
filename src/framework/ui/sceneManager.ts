import Map from "../util/Map";
import scene from "./scene";

export default class sceneManager {

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
    }

    public registerScene<S extends scene<T>, T extends Laya.Scene>(sceneId: number, s: { new(): S }, t: { new(): T }) {
        this.sceneRegisterInfo.set(sceneId, { s: s, t: t });
    }

    public loadScene(sceneId: number) {
        var info = this.sceneRegisterInfo.get(sceneId);
        if (this.currentScene != null) {
            this.currentScene.onExit();
            this.currentScene.onDestroy();
            this.currentScene.destroy();
            this.currentScene = null;
        }

        this.currentScene = new info.s();
        this.currentScene.load(new info.t(), function () {
            this.currentScene.onLoad();
            this.currentScene.open();
            this.currentScene.onEnter();
        }.bind(this));
    }

    public runningScene(): any {
        return this.currentScene;
    }
}