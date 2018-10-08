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

    private currentScene: scene = null;
    private sceneRegisterInfo = new Map<number, any>();

    public initialize() {
        this.sceneRegisterInfo.clear();
    }

    public registerScene<S extends scene>(sceneId: number, sceneClass: { new(): S }, fileName: string) {
        this.sceneRegisterInfo.set(sceneId, { class: sceneClass, file: fileName });
    }

    public preloadScene(sceneId: number, callback: () => any) {
        var info = this.sceneRegisterInfo.get(sceneId);
        if (info != null) {
            if (callback != null) {
                callback();
            }
        }
    }

    public loadScene(sceneId: number) {
        var info = this.sceneRegisterInfo.get(sceneId);
        if (this.currentScene != null) {
            this.currentScene.onExit();
            this.currentScene.onDestroy();
            this.currentScene.destroy();
            this.currentScene = null;
        }

        this.currentScene = new info.class();
        this.currentScene.load(info.file, function () {
            this.currentScene.onLoad();
            this.currentScene.onEnter();
        }.bind(this));
    }

    public runningScene(): any {
        return this.currentScene;
    }
}