module framework.session {

	export class globalMessageHandler {

		private static instanceObj: globalMessageHandler = null;
		public static instance(): globalMessageHandler {
			if (globalMessageHandler.instanceObj == null) {
				globalMessageHandler.instanceObj = new globalMessageHandler();
			}
			return globalMessageHandler.instanceObj;
		}

		public initialize() {
			net.messageDispatch.instance().registerMessageEvent("CMD_ROLE_MISC", this, this.onRoleMisc);
			net.messageDispatch.instance().registerMessageEvent("CMD_ATT_CHANGE", this, this.onAttChange);
			net.messageDispatch.instance().registerMessageEvent("CMD_ERROR", this, this.onError);
			net.messageDispatch.instance().registerMessageEvent("CMD_WARP", this, this.onWarp);
			net.messageDispatch.instance().registerMessageEvent("CMD_CONLOGIN_GIFT", this, this.onNotifyConLoginGift);
		}

		private onWarp(jsonObj) {
			common.log.info("[globalMessageHandler] warp scene: {0}", jsonObj.map_id);
			dataManager.instance().setData(datas.global.serverTime, jsonObj.server_unixtime_ms, true);
			dataManager.instance().setData(datas.global.clientTime, Browser.now(), true);

			if (jsonObj.map_id == CSProto.SceneTempId.SCENE_TEMP_ID_HALL 
				&& dataManager.instance().getData(datas.login.gameId) != CSProto.SceneTempId.SCENE_TEMP_ID_HALL) {
				sceneManager.instance().gotoHall();
			} else {
				framework.net.messageDispatch.instance().pauseDispatch();
				sceneManager.instance().loadScene(jsonObj.map_id);
			}
		}

		private onError(jsonObj) {
			dataManager.instance().setData(datas.global.errorCode, jsonObj.error_code, true);
			dataManager.instance().setData(datas.global.commandId, jsonObj.cmd_id, true);

			var msg = util.tools.formatCodeMessage(jsonObj.error_code, jsonObj.content);
			if (jsonObj.msg_box_type == 0) {
				ui.commonDialog.instance().toast(msg);
			} else {
				ui.commonDialog.instance().dialog(msg, "确定");
			}
		}

		private onRoleMisc(jsonObj) {
			if (jsonObj != null) {
				var roleMisc = jsonObj.data;
				this.setAttrValue(roleMisc.base.player_attrs);
				dataManager.instance().setData(datas.player.name, roleMisc.base.name, true);
			}
		}

		private onAttChange(jsonObj) {
			this.setAttrValue(jsonObj.attrs);
		}

		private setAttrValue(attrs) {
			for (var i = 0; i < attrs.length; i++) {
				var attr = attrs[i];
				var type = attr["prop_type"];
				var value = attr["prop_value"];
				switch (type) {
					case CSProto.LifeAttrType.LIFEATT_GOLD:
						dataManager.instance().setData(datas.player.money, value, true);
						break;
					case CSProto.LifeAttrType.LIFEATT_ROLE_BORNID:
						dataManager.instance().setData(datas.player.roleId, value, true);
						break;
					case CSProto.LifeAttrType.LIFEATT_HEADPHOTO:
						dataManager.instance().setData(datas.player.icon, value, true);
						break;
				}
			}
		}

		private onNotifyConLoginGift(json){
			if(json != null){
				dataManager.instance().setData(datas.player.loginGiftLog, json["got_gift_log"], true);
				dataManager.instance().setData(datas.player.conLoginDays, json["conn_login_days"], true);
			}
		}
	}
}