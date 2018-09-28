module framework.ui {

	class panelRegisterInfo {
		public name: string;
		public panel: any;
		public dialog: any;
		public loaded: boolean;

		constructor(name: string, panel: any, ui: any) {
			this.name = name;
			this.panel = panel;
			this.dialog = ui;
			this.loaded = false;
		}
	}

	export class panelManager {

		private static instanceObj: panelManager = null;
		public static instance(): panelManager {
			if (panelManager.instanceObj == null) {
				panelManager.instanceObj = new panelManager();
			}
			return panelManager.instanceObj;
		}

		private panelRegisterMap = new Map<string, panelRegisterInfo>();

		public registerPanel(name: string, panel: any, ui: any) {
			var info = new panelRegisterInfo(name, panel, ui);
			this.panelRegisterMap.set(name, info);
			framework.common.resources.preloadResource(ui, function () {
				info.loaded = true;
			});
		}

		public open<T>(name: string, isDialog: boolean, param: any = null, showEffect: boolean = false): T {
			var info = this.panelRegisterMap.get(name);
			if (info != null) {
				var panel = new info.panel();
				panel.open(info.dialog, isDialog, param, showEffect);
				return panel as T;
			}
			return null;
		}

	}
}