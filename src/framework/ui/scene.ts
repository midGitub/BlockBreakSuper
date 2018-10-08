import nodeHelper from "../util/nodeHelper";

export default abstract class scene {

    public root: Laya.Scene = null;
    public load(file: string, callback: ()=>any) {
        this.root = new Laya.Scene();
        Laya.Scene.load(file, Laya.Handler.create(this, function(){
            this.root.loadScene(file);
            this.root.open();
            if(callback != null){
                callback();
            }
        }.bind(this)));
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