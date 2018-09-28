module framework.ui {

	import Point = laya.maths.Point;

	export class banner extends laya.ui.Box {
		private selectedIndex: number = 0;
		private itemBox: laya.ui.Box = null;
		private itemTabs: laya.ui.Tab = null;
		private itemCount: number = 0;
		private itemWidth: number = 0;
		private mouseDownPoint: Point = null;
		private mouseDownTime: number = 0;
		private dragStartPosition: number = 0;
		private adjustRatio: number = 1.5;
		private enableAutoPlay: boolean = true;

		constructor() {
			super();

			this.on(Laya.Event.REMOVED, this, function () {
				Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
				Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
				Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
				Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
				this.timer.clearAll();
			}.bind(this));
			
			Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
			Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
			Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
			Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);

			this.timer.loop(3000, this, this.autoPlay);
			this.refresh();
		}

		private onStart() {
			this.itemBox = this.getChildByName("Items") as laya.ui.Box;
			this.itemCount = this.itemBox.numChildren;
			this.itemWidth = this.itemBox.width / this.itemCount;
			this.itemTabs = this.getChildByName("Buttons") as laya.ui.Tab;
			this.itemTabs.selectHandler = new laya.utils.Handler(this, this.onTabSelect);
			this.setSelectedIndex(0);
		}

		public refresh() {
			this.timer.frameOnce(2, this, this.onStart.bind(this));
		}

		private autoPlay() {
			if (this.enableAutoPlay) {
				if (this.itemTabs != null) {
					this.setSelectedIndex(this.itemTabs.selectedIndex + 1, true);
				}
			} else {
				this.enableAutoPlay = true;
			}
		}

		private onTabSelect(index: number) {
			this.setSelectedIndex(index, true);
			this.enableAutoPlay = false;
		}

		private setSelectedIndex(index: number, ease: boolean = false) {
			if (index < 0) {
				index = 5;
				ease = false;
			}

			if (index >= this.itemCount) {
				index = 0;
				ease = false;
			}

			var dst = - index * this.itemWidth;
			if (ease) {
				Laya.Tween.to(this.itemBox, { x: dst }, 500);
			} else {
				this.itemBox.x = dst;
			}
			this.itemTabs.selectedIndex = index;
			this.event(Laya.Event.SELECT, this.itemTabs.selectedIndex);
		}

		private onMouseDown(e: Laya.Event) {
			var pos = this.localToGlobal(new laya.maths.Point(0, 0));
			if (e.stageY < pos.y || e.stageY > pos.y + this.height) {
				return;
			}
			this.mouseDownPoint = new Point(e.stageX, e.stageY);
			this.mouseDownTime = Browser.now();
			this.dragStartPosition = this.itemBox.x;
			this.enableAutoPlay = false;
		}

		private onMouseMove(e: Laya.Event) {
			if (this.mouseDownPoint != null) {
				var distance = (e.stageX - this.mouseDownPoint.x) * this.adjustRatio;
				this.updateBannerPosition(this.dragStartPosition + distance, false, 0);
			}
		}

		private onMouseUp(e: Laya.Event) {
			if (this.mouseDownPoint != null) {
				var distance = (e.stageX - this.mouseDownPoint.x) * this.adjustRatio;
				var speed = distance / ((Browser.now() - this.mouseDownTime) / 1000);
				this.updateBannerPosition(this.dragStartPosition + distance, true, speed);
			}

			this.mouseDownPoint = null;
		}

		private updateBannerPosition(dst: number, completed: boolean, speed: number) {
			this.itemBox.x = dst;
			if (completed) {
				if (this.itemBox.x > 0) {
					this.setSelectedIndex(0, true);
				} else if (this.itemBox.x < -this.itemWidth * this.itemCount) {
					this.setSelectedIndex(this.itemCount - 1, true);
				} else {
					var targetPosition = this.itemBox.x;
					targetPosition += speed;
					var index = Math.round(Math.abs(targetPosition / this.itemWidth));
					if(Math.abs(index - this.itemTabs.selectedIndex) > 1){
						index = this.itemTabs.selectedIndex + (speed > 0 ? -1 : 1);
					}
					this.setSelectedIndex(index, true);
				}
			}
		}
	}
}