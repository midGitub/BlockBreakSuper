import scene from "../../framework/ui/scene";
import log from "../../framework/common/log";
import sceneManager from "../../framework/ui/sceneManager";
import { ui } from "../../ui/layaMaxUI";

export default class mainMenuScene extends scene<ui.MainMenuUI> {

    public onEnter(): void {
        log.info("mainMenuScene onEnter");
        this.root.enterGameButton.on(Laya.Event.CLICK, this, function(event: Laya.Event){
            sceneManager.instance().loadScene(2);
        });
    }

    public onExit(): void {
        log.info("mainMenuScene onExit");
    }

    public onDestroy(): void {
        log.info("mainMenuScene onDestroy");
    }

    public onConnectEvent(connected: boolean, msg: string) {
        log.info("mainMenuScene onConnectEvent: connected: {0}, msg: {1}", connected, msg);
    }
}