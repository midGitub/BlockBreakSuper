import scene from "../../framework/ui/scene";
import log from "../../framework/common/log";
import sceneManager from "../../framework/ui/sceneManager";
import { ui } from "../../ui/layaMaxUI";

export default class launchScene extends scene<ui.LaunchSceneUI> {

    public onEnter(): void {
        log.info("launchScene onEnter");
        sceneManager.instance().loadScene(1);
    }

    public onExit(): void {
        log.info("launchScene onExit");
    }

    public onDestroy(): void {
        log.info("launchScene onDestroy");
    }

    public onConnectEvent(connected: boolean, msg: string) {
        log.info("launchScene onConnectEvent: connected: {0}, msg: {1}", connected, msg);
    }
}