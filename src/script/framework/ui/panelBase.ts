module framework.ui {

	export abstract class panelBase<T extends laya.ui.Dialog>{
		public root: T = null;
		private isDialog: boolean = false;
		public closeCallback: ()=>any = null;
		public open(t: any, isDialog: boolean, param: any = null, showEffect: boolean = false) {
			if (!this.enableOpen(param)) {
				return;
			}

			common.resources.preloadResource(t, function () {
				this.root = new t();
				this.isDialog = isDialog;
				if (isDialog) {
					this.root.closeHandler = laya.utils.Handler.create(this, this.closeHandler);
					this.root.popup(false, showEffect);
					this.root.closeEffect = null;
				} else {
					Laya.stage.addChild(this.root);
					var closeBtn = framework.util.nodeHelper.getNodeByName(this.root, "close");
					if (closeBtn != null) {
						closeBtn.on(Laya.Event.CLICK, this, this.close);
					}
				}

				this.onOpen(param);
			}.bind(this));
		}

		private closeHandler(type) {
			this.onClose(type);
			framework.util.nodeHelper.removeAllChildrenHandlers(this.root);
			framework.util.nodeHelper.removeAllHandlers(this);
			if (this.root != null) {
				this.root = null;
			}
		}

		public close() {
			if (this.isDialog) {
				this.root.close();
			} else {
				this.root.removeSelf();
				this.closeHandler("close");
			}
			if(this.closeCallback != null){
				this.closeCallback();
			}
		}

		public abstract enableOpen(param: any): boolean;
		public abstract onOpen(param: any): void;
		public abstract onClose(type: any): void;
	}
}