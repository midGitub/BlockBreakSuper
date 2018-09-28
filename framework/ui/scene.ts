
module framework.ui {

	export abstract class scene<T extends View>{
		private GotoHallBtn: string = "GotoHallBtn";
		public root: T = null;
		public load(t: any) {
			this.root = t;
			if (this.root != null) {
				Laya.stage.addChild(this.root);
			}
			var gotoHallBtn = util.nodeHelper.getNodeByName(this.root, this.GotoHallBtn) as laya.ui.Button;
			if(gotoHallBtn != null){
				gotoHallBtn.on(Laya.Event.CLICK, this, function(){
					framework.ui.sceneManager.instance().gotoHall();
				});
			}
		}

		public destroy() {
			framework.util.nodeHelper.removeAllChildrenHandlers(this.root);
			framework.util.nodeHelper.removeAllHandlers(this);
			if (this.root != null) {
				this.root.destroy();
				this.root = null;
			}
		}

		public onLoad(): void {}
		public abstract onEnter(): void;
		public abstract onExit(): void;
		public abstract onDestroy(): void;
		public abstract onConnectEvent(connected: boolean, msg: string);
	}
}