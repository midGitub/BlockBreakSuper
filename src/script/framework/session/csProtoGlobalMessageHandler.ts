module framework.session {

	export class csProtoGlobalMessageHandler {

		private static instanceObj: csProtoGlobalMessageHandler = null;
		public static instance(): csProtoGlobalMessageHandler {
			if (csProtoGlobalMessageHandler.instanceObj == null) {
				csProtoGlobalMessageHandler.instanceObj = new csProtoGlobalMessageHandler();
			}
			return csProtoGlobalMessageHandler.instanceObj;
		}

		public initialize() {
			net.messageDispatch.instance().registerMessageEvent("CMD_ROLE_MISC", this, this.onRoleMisc);
			net.messageDispatch.instance().registerMessageEvent("CMD_ATT_CHANGE", this, this.onAttChange);
			net.messageDispatch.instance().registerMessageEvent("CMD_ERROR", this, this.onError);
			net.messageDispatch.instance().registerMessageEvent("CMD_WARP", this, this.onWarp);
			net.messageDispatch.instance().registerMessageEvent("CMD_CONLOGIN_GIFT", this, this.onNotifyConLoginGift);
		}

		private onWarp(jsonObj) {
			var gameId = dataManager.instance().getData(datas.login.gameId);
			if(gameId == jsonObj.wMapID){
				common.log.info("[globalMessageHandler] warp scene: {0}", jsonObj.map_id);
				dataManager.instance().setData(datas.global.serverTime, jsonObj.server_unixtime_ms, true);
				dataManager.instance().setData(datas.global.clientTime, Browser.now(), true);
				framework.net.messageDispatch.instance().pauseDispatch();
				sceneManager.instance().loadScene(jsonObj.wMapID);
			} else {
				var warpObj = net.messageBuilder.instance().autoBuild("CSProto.CMD_WARP_CS") as csproto.CSProto.CMD_WARP_CS;
				warpObj.wMapID = gameId;
				net.network.instance().sendMessage(warpObj);
			}
		}

		private onError(jsonObj) {
			dataManager.instance().setData(datas.global.errorCode, jsonObj.wErrCode, true);
			dataManager.instance().setData(datas.global.commandId, jsonObj.bErrType, true);

			var msg = util.tools.formatCodeMessage(jsonObj.wErrCode, jsonObj.szErrMsg);
			ui.commonDialog.instance().toast(msg);
		}

		private onRoleMisc(jsonObj) {
			if (jsonObj != null) {
				var roleMisc = jsonObj.stData;
				this.setAttrValue(roleMisc.stBase.astPlayerAttr);
				dataManager.instance().setData(datas.player.name, roleMisc.stBase.szName, true);
			}
		}

		private onAttChange(jsonObj) {
			this.setAttrValue(jsonObj.astAttr);
		}

		private setAttrValue(attrs) {
			for (var i = 0; i < attrs.length; i++) {
				var attr = attrs[i];
				var type = attr["bPropType"];
				var value = attr["llPropValue"];
				switch (type) {
					case csproto.CSProto.LIFEATT_GOLD:
						dataManager.instance().setData(datas.player.money, value, true);
						break;
					case csproto.CSProto.LIFEATT_ROLE_BORNID:
						dataManager.instance().setData(datas.player.roleId, value, true);
						break;
					case csproto.CSProto.LIFEATT_HEADPHOTO:
						dataManager.instance().setData(datas.player.icon, value, true);
						break;
					case csproto.CSProto.LIFEATT_VIPLEVEL:
						dataManager.instance().setData(datas.player.vipLevel, value, true);
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