module framework.ui.binder{

	export class bitmapFont{

		public fontPath: string = "";
		public letterSpacing: number = 0;
		private instance: any = null;

		constructor(){
		}

		public set owner(value: any) {
			this.instance = value;
			this.instance.frameOnce(1, this, this.onStart);
        }

        private onStart(): void {
			if(this.fontPath.length > 0){
				var font = new laya.display.BitmapFont();
				font.loadFont(this.fontPath, new laya.utils.Handler(this, function(){
					laya.display.Text.registerBitmapFont(this.fontPath, font);
					font.letterSpacing = this.letterSpacing;
					this.instance.font = this.fontPath;
					this.instance.onCompResize();
				}.bind(this)));
			}
        }
	}
}