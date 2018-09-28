module framework.ui {
	export class vboxFill extends laya.ui.Box {

		constructor() {
			super();

			this.timer.frameOnce(1, this, function () {
				this.updateHeight();

				this.parent.on(Laya.Event.RESIZE, this, function () {
					this.updateHeight();
				});
			}.bind(this));
		}

		private updateHeight() {
			var index = this.parent.getChildIndex(this);
			if (index > 0 && index < this.parent.numChildren - 1) {
				var top = this.parent.getChildAt(index - 1) as laya.ui.Box;
				var bottom = this.parent.getChildAt(index + 1) as laya.ui.Box;
				var leftHeight = bottom.y - top.y - bottom.height - top.height;
				this.height = leftHeight;
			}
		}
	}
}