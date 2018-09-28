module framework.net.builder{
	
	var Loader = Laya.Loader;
	var Browser = Laya.Browser;
	var Handler = Laya.Handler;
	var ProtoBuf = Browser.window.protobuf;

	export class protoBuffBuilder implements IMessageBuilder{
		
		private messageRoot = null;
		private commandHeader = null;
		private commandBody = null;
		private messageHeader = null;
		private messageSeqId: number = 0;
		private messageMap = new Map<string, any>();

		public setupBuilder(protos: Array<string>, callback: (result: boolean, msg: string) => any) {
			this.messageMap.clear();

			this.messageRoot = new ProtoBuf.Root();
			this.messageRoot.load(protos, { keepCase: true }, function (err, root) {
				if (err) {
					callback(false, err);
				} else {
					this.commandHeader = this.build("KConnect.kcpackc");
					this.commandBody = this.build("KConnect.WX_CMD_PROC_CS");
					this.messageHeader = this.build("CSProto.packc");
					//this.moduleTest();
					if (callback != null) {
						callback(true, "");
					}
				}
			}.bind(this));
		}

		private lookupMessage(messageName: string): any {
			if (!this.messageMap.has(messageName)) {
				this.messageMap.set(messageName, this.messageRoot.lookup(messageName));
			}
			return this.messageMap.get(messageName);
		}

		public getMessageType(messageObj): string {
			var message = messageObj.$type.name;
			if (message.endWith("_CS"))
				message = message.substring(0, message.lastIndexOf('_CS'));
			else if (message.endWith("_SC"))
				message = message.substring(0, message.lastIndexOf('_SC'));
			return message;
		}

		public build(messageName) {
			var message: any = this.lookupMessage(messageName);
			return message.create();
		}

		public autoBuild(messageName) {
			var rootObj = this.build(messageName);
			var self = this;
			function buildChildren(rootObj) {
				for (var field in rootObj.$type.fields) {
					if (rootObj.$type.fields.hasOwnProperty(field)) {
						var child = rootObj.$type.fields[field];
						if (child.repeated) {
							rootObj[child.name] = [];
						} else {
							rootObj[child.name] = child.typeDefault;
							if (child.resolvedType != null && child.resolvedType.className !== "Enum") {
								rootObj[child.name] = self.build(child.resolvedType.fullName);
								buildChildren(rootObj[child.name]);
							}
						}
					}
				}
			};

			buildChildren(rootObj);
			return rootObj;
		}

		public encode(messageObj) {
			var message = messageObj.$type.fullName;
			var messageType = this.getMessageType(messageObj);
			if (this.isCommand(message)) {
				return this.encodeCommand(messageObj, messageType);
			}

			return this.encodeMessage(messageObj, messageType);
		}

		private encodeCommand(messageObj, messageType) {
			var message = this.lookupMessage(messageObj.$type.fullName);
			var messageName = messageObj.$type.name;
			this.commandHeader.cmd = this.messageRoot["KConnect"].CommandType[messageType];
			this.commandHeader.body = message.encode(messageObj).finish();
			var kcpackc = this.lookupMessage(".KConnect.kcpackc");
			return kcpackc.encode(this.commandHeader).finish();
		}

		private encodeMessage(messageObj, messageType) {
			var message = this.lookupMessage(messageObj.$type.fullName);
			this.messageHeader.cmd = this.messageRoot["CSProto"].CommandType[messageType];
			this.messageHeader.seq_id = this.messageSeqId++;
			this.messageHeader.body = message.encode(messageObj).finish();

			this.commandBody.mask = 0;
			this.commandBody.game_proto_pkg = this.lookupMessage(".CSProto.packc").encode(this.messageHeader).finish();

			this.commandHeader.cmd = this.messageRoot["KConnect"].CommandType.WX_CMD_PROC;
			this.commandHeader.body = this.lookupMessage(".KConnect.WX_CMD_PROC_SC").encode(this.commandBody).finish();

			return this.lookupMessage(".KConnect.kcpackc").encode(this.commandHeader).finish();
		}

		public decode(buffer, uploadMessage = false) {
			var kcpackc = this.lookupMessage(".KConnect.kcpackc");
			var packageObj = kcpackc.decode(buffer);

			var command = this.getMessageByValue(packageObj.cmd, uploadMessage);
			if(command == null){
				return null;
			}
			var commandObj = command.decode(packageObj.body);
			if (packageObj.cmd != this.messageRoot.KConnect.CommandType.WX_CMD_PROC) {
				return commandObj;
			}

			var packs = this.lookupMessage(".CSProto.packs");
			var messagePkgObj = packs.decode(commandObj.game_proto_pkg);

			var message = this.getMessageByValue(messagePkgObj.cmd, uploadMessage);
			if(message == null){
				return null;
			}
			var messageObj = message.decode(messagePkgObj.body);

			return messageObj;
		}

		private isCommand(message) {
			if (message.startWith(".KConnect.") || message.startWith("KConnect.")) {
				return true;
			}
			return false;
		}

		private getMessageByValue(value, uploadMessage) {
			var messageName = ".";
			if (this.messageRoot.KConnect.CommandType[value] != null) {
				messageName += "KConnect." + this.messageRoot.KConnect.CommandType[value];
			} else if (this.messageRoot.CSProto.CommandType[value] != null) {
				messageName += "CSProto." + this.messageRoot.CSProto.CommandType[value];
			} else {
				common.log.error("[messageBuilder] getMessageByValue: unknow message id {0}", value);
				return null;
			}
			messageName = uploadMessage ? messageName + "_CS" : messageName + "_SC";
			return this.lookupMessage(messageName);
		}

		private moduleTest() {
			var obj = this.build("KConnect.WX_CMD_AUTH_CS");
			obj.game_id = 10000;
			obj.identity_token = "1";

			var buffer = this.encode(obj);
			var obj2 = this.decode(buffer, true);

			var obj3 = this.build("CSProto.CMD_ERROR_SC");
			obj3.msg_box_type = 1;
			obj3.error_code = 1;
			obj3.cmd_id = 2;
			obj3.title = "12485242";
			obj3.content = "asdfasdfasdf";

			var buffer2 = this.encode(obj3);
			var obj4 = this.decode(buffer2, false);

			var obj5 = this.build("CSProto.CMD_ROLE_MISC_SC");
			var data = this.build("CSProto.RoleMisc");
			obj5.data = data;


			var obj7 = this.autoBuild("CSProto.CMD_ROLE_MISC_SC");
			obj7.data.object_id = 1111111111111111;

			obj7.data.base.sex = 1;
			obj7.data.base.map_id = 2;
			obj7.data.base.name = "test";
			obj7.data.base.self_def_photo = "http://test";
			obj7.data.base.mobile = "13688026101";

			obj7.data.privilege.privilege_flag = 32;
			obj7.data.privilege.vip_level = 32;

			obj7.data.online_gift.have_next_gift = false;
			obj7.data.online_gift.next_seconds = 2;
			obj7.data.online_gift.gift_gold = 3;
			obj7.data.online_gift.vip_gold_ratio = 4;

			obj7.data.next_online_gift.have_next_gift = false;
			obj7.data.next_online_gift.next_seconds = 2;
			obj7.data.next_online_gift.gift_gold = 3;
			obj7.data.next_online_gift.vip_gold_ratio = 4;

			var buffer5 = this.encode(obj7);
			var obj8 = this.decode(buffer5, false);
		}

	}
}