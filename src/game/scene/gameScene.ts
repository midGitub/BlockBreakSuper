import scene from "../../framework/ui/scene";
import log from "../../framework/common/log";
import sceneManager from "../../framework/ui/sceneManager";
import { ui } from "../../ui/layaMaxUI";

export default class gameScene extends scene<ui.GameSceneUI> {

    public onEnter(): void {
        log.info("gameScene onEnter");
        this.root.backButton.on(Laya.Event.CLICK, this, function(event: Laya.Event){
            sceneManager.instance().loadScene(1);
        });
    }

    public onExit(): void {
        log.info("gameScene onExit");
    }

    public onDestroy(): void {
        log.info("gameScene onDestroy");
    }

    public onConnectEvent(connected: boolean, msg: string) {
        log.info("gameScene onConnectEvent: connected: {0}, msg: {1}", connected, msg);
    }
}