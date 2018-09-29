import nodeHelper from "../util/nodeHelper";

export default abstract class scene {

    public root: Laya.Scene = null;
    public load(file: string) {
        this.root = new Laya.Scene();
        this.root.loadScene(file);
        this.root.open();
    }

    public destroy() {
        nodeHelper.removeAllChildrenHandlers(this.root);
        nodeHelper.removeAllHandlers(this);
        if (this.root != null) {
            this.root.destroy();
            this.root = null;
        }
    }

    public onLoad(): void { }
    public abstract onEnter(): void;
    public abstract onExit(): void;
    public abstract onDestroy(): void;
    public abstract onConnectEvent(connected: boolean, msg: string);
}