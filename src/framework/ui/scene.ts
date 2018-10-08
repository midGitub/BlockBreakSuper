import nodeHelper from "../util/nodeHelper";

export default abstract class scene<T extends Laya.Scene> {

    public root: T = null;
    public load(t: any, callback: (succ: boolean) => any) {
        this.root = t;
        if (callback != null) {
            if (this.root["_viewCreated"]) {
                callback(true);
            } else {
                this.root.on("onViewCreated", this, function(){
                    callback(true);
                });
            }
        }
    }

    public open() {
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