module framework.ui.binder{

	export class uiBinder{

		public dataName: string = "";
		public animationType: string = "none";

		public formatType: number = 0;
		public formatStr: string = null;
		public maxLength: number = 0;

		private instance: any = null;
		private initValue: boolean = true;

		constructor(){
		}

		public set owner(value: any) {
			this.instance = value;

			this.instance.on(Laya.Event.DISPLAY, this, function(){
				this.onStart();
			}.bind(this));

			this.instance.on(Laya.Event.UNDISPLAY, this, function(){
				session.dataManager.instance().ramoveDataHandler(this.dataName, this);
			}.bind(this));
			//this.instance.frameOnce(1, this, this.onStart);
        }

        private onStart(): void {
			if(this.dataName.length > 0){
				session.dataManager.instance().addDataHandler(this.dataName, this, this.onDataChange, true);
			}
        }

		private onDataChange(data: session.dataInfo){
			if(this.instance instanceof laya.ui.Label){
				this.setLabelData(<laya.ui.Label>(this.instance), data.string(this.formatType, this.formatStr));
			} else if(this.instance instanceof laya.ui.Image){
				this.setImageData(<laya.ui.Image>(this.instance), data.string())
			}

			this.initValue = false;
		}

		private setLabelData(label: laya.ui.Label, value: string){
			label.text = value;
		}

		private setImageData(img: laya.ui.Image, value: string){
			img.skin = value;
		}
	}
}