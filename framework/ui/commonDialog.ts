module framework.uiex {

	export class CommonDialogUIEx extends laya.ui.Dialog {
		public dialog:Laya.Image;
		public closeBtn:Laya.Button;
		public confirmBtn:Laya.Button;
		public cancelBtn:Laya.Button;
		public contentText:laya.display.Text;
		public toast:Laya.Image;
		public toastText:laya.display.Text;

        public static  uiView:any ={"type":"Dialog","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"var":"dialog","skin":"res/framework/textures/dialog/common_bg.png","centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Button","props":{"y":10,"x":462,"var":"closeBtn","stateNum":2,"skin":"res/framework/textures/dialog/common_btn_close.png","name":"close"}},{"type":"Box","props":{"y":258,"x":266,"width":1,"layoutEnabled":false,"height":1,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Button","props":{"y":0,"x":-100,"var":"confirmBtn","stateNum":2,"skin":"res/framework/textures/dialog/common_btn_yellow.png","name":"yes","layoutEnabled":true,"labelSize":24,"labelColors":"#6b3a13","label":"确定","anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":0,"x":100,"var":"cancelBtn","stateNum":2,"skin":"res/framework/textures/dialog/common_btn_blue.png","name":"no","labelSize":24,"labelColors":"#0e285f","label":"取消","anchorY":0.5,"anchorX":0.5}}]},{"type":"Text","props":{"y":98,"x":81,"wordWrap":true,"width":368,"var":"contentText","valign":"middle","text":"111","pivotY":0.5,"pivotX":0,"overflow":"scroll","height":104,"fontSize":24,"color":"#fbf6f6","align":"left"}}]},{"type":"Image","props":{"var":"toast","skin":"res/framework/textures/dialog/common_bg2.png","centerY":0,"centerX":0},"child":[{"type":"Text","props":{"y":20,"x":105,"wordWrap":true,"width":445,"var":"toastText","valign":"middle","text":"1112","pivotY":0.5,"overflow":"scroll","height":78,"fontSize":24,"color":"#f8f4f4","align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(CommonDialogUIEx.uiView);

        }
	}
}

module framework.ui {
	export class commonDialog {
		private static instanceObj: commonDialog = null;
		public static instance(): commonDialog {
			if (commonDialog.instanceObj == null) {
				commonDialog.instanceObj = new commonDialog();

			}
			return commonDialog.instanceObj;
		}

		public static loadRes(){
			framework.common.resources.preloadResource(framework.uiex.CommonDialogUIEx, null);
		}

		public dialog(msg: string, btns: any, callback: (btn: string) => any = null) {
			framework.common.resources.preloadResource(framework.uiex.CommonDialogUIEx, function () {
				var dlg = new framework.uiex.CommonDialogUIEx();
				if (dlg != null) {
					dlg.dialog.visible = true;
					dlg.toast.visible = false;
					if (dlg.contentText != null) {
						dlg.contentText.text = msg;
					}
					if (framework.util.type.isArray(btns) && btns.length == 2) {
						if (dlg.confirmBtn != null) {
							dlg.confirmBtn.visible = true;
							dlg.confirmBtn.x = -100;
							dlg.confirmBtn.text.text = btns[0];
						}
						if (dlg.cancelBtn != null) {
							dlg.cancelBtn.visible = true;
							dlg.cancelBtn.x = 100;
							dlg.cancelBtn.text.text = btns[1];
						}
					} else {
						var name = framework.util.type.isArray(btns) ? btns[0] : btns;
						if (dlg.confirmBtn != null) {
							dlg.confirmBtn.visible = true;
							dlg.confirmBtn.x = 0;
							dlg.confirmBtn.text.text = name;
						}
						if (dlg.cancelBtn != null) {
							dlg.cancelBtn.visible = false;
						}
					}
					dlg.closeHandler = laya.utils.Handler.create(this, function (type) {
						dlg.closeHandler = null;
						if (util.type.isFunction(callback)) {
							callback(type);
						}
					}.bind(this));
					dlg.popup(false, true);
				}
			}.bind(this));
		}

		public toast(msg: string, time: number = 2000) {
			framework.common.resources.preloadResource(framework.uiex.CommonDialogUIEx, function () {
				var toast = new framework.uiex.CommonDialogUIEx();
				if (toast != null) {
					toast.dialog.visible = false;
					toast.toast.visible = true;
					if (toast.toastText != null) {
						toast.toastText.text = msg;
					}
					toast.show(false, true);
					toast.timer.once(time, this, function () {
						toast.close();
					}.bind(this));
				}
			}.bind(this));
		}
	}
}