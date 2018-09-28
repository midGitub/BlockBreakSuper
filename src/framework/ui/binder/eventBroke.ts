module framework.ui.binder{

	export class eventBroke{

		public eventName: string = "";
		private instance: any = null;

		public set owner(value: any) {
			this.instance = value;
			this.instance.frameOnce(1, this, this.onStart);
        }

        private onStart(): void {
			this.instance.on(this.eventName, this, function(event: Laya.Event){
				event.stopPropagation();
			}.bind(this));
        }
	}
}