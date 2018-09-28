module framework.ui.binder {
	export class autoLayout {
		public left : number = 0;
		public right : number = 0;
		public top : number = 0;
		public bottom : number = 0;

		private instance = null;
		constructor() {
		}

		public set owner(value: any) {
			this.instance = value;

			this.instance.timer.frameOnce(1, this, function () {
				this.updateSize();
				this.parent.on(Laya.Event.RESIZE, this, function () {
					this.updateSize();
				});
			}.bind(this));
        }

		private updateSize() {
			var parent = this.instance.parent as laya.display.Sprite;
			this.instance.x = this.left;
			this.instance.y = this.top;
			this.instance.width = parent.width - this.left - this.right;
			this.instance.height = parent.height - this.top - this.bottom;
		}
	}
}