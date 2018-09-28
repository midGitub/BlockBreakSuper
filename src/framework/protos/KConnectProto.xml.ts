module csproto.KConnectProto {

	import EncodeBuffer = csprotos.EncodeBuffer
	import DecodeBuffer = csprotos.DecodeBuffer
	import message = csprotos.message

	//command export
	export enum command {
		WX_CMD_ERROR = 0x0001, // 出错 
		WX_CMD_AUTH = 0x0010, // 后续将逐步废弃:游戏本身的鉴权请求 
		WX_CMD_REPLAY = 0x0012, // 断线重连请求 
		WX_CMD_AUTH_EXTERNAL = 0x0015, // 后续将逐步废弃:通过外部帐户鉴权 
		WX_CMD_NEW_UNIAUTH = 0x0016, // 通过外部帐户鉴权 
		WX_CMD_PROC = 0x0060, // 业务逻辑数据请求 
	}
	export var command_name = {
		1 : "WX_CMD_ERROR", // 出错 
		16 : "WX_CMD_AUTH", // 后续将逐步废弃:游戏本身的鉴权请求 
		18 : "WX_CMD_REPLAY", // 断线重连请求 
		21 : "WX_CMD_AUTH_EXTERNAL", // 后续将逐步废弃:通过外部帐户鉴权 
		22 : "WX_CMD_NEW_UNIAUTH", // 通过外部帐户鉴权 
		96 : "WX_CMD_PROC", // 业务逻辑数据请求 
	}
	export var WX_CMD_ERROR = 0x0001; // 出错 
	export var WX_CMD_AUTH = 0x0010; // 后续将逐步废弃:游戏本身的鉴权请求 
	export var WX_CMD_REPLAY = 0x0012; // 断线重连请求 
	export var WX_CMD_AUTH_EXTERNAL = 0x0015; // 后续将逐步废弃:通过外部帐户鉴权 
	export var WX_CMD_NEW_UNIAUTH = 0x0016; // 通过外部帐户鉴权 
	export var WX_CMD_PROC = 0x0060; // 业务逻辑数据请求 

	//enum export
	export var Version = 1; // 当前协议版本号 
	export var RET_OK = 0; // 正常 
	export var RET_NEED_LOGIN = 1; // 需要登陆 
	export var RET_SYSTEM_ERR = 2; // 系统错误 
	export var RET_RELAY_ERR = 3; // 透传包错误 
	export var RET_SVR_MATAINING = 4; // 游戏正在努力维护中请您稍后再试 
	export var RET_LOGIN_NEEDCODE = 1001; // 需要验证码 
	export var RET_LOGIN_CODEERR = 1002; // 验证码错误 
	export var RET_LOGIN_PWDERR = 1003; // 密码错误 
	export var RET_LOGIN_FORBID = 1004; // 禁止登陆 
	export var RET_LOGIN_FAIL = 1005; // 登陆失败 
	export var RET_LOGIN_FREQLIMIT = 1006; // 频率限制 
	export var RET_LOGIN_UINERR = 1007; // 号码错误 
	export var RET_LOGIN_TOKENERR = 1009; // 鉴权token错误 
	export var RET_LOGIN_TOKEN_EXPIRED = 1010; // 鉴权token己过期 
	export var MAX_LEN_PWD_MD5 = 17; // 密码md5值最大长度 
	export var MAX_LEN_RS_SID = 129; // RS返回的SID最大长度 
	export var MAX_LEN_LOGINAUTH_DESC = 512; // 鉴权验证及验证码验证刷新协议中的保留字段即错误描述字段最大长度 
	export var MAX_LEN_PROC_BODY = 32768; // WX_CMD_PROC协议中的body对应的buff最大长度 
	export var MAX_ACCOUNT_LEN = 136; // 帐号最大长度 
	export var MAX_EXTERNAL_ACCOUNT_LEN = 512; // 外部帐号最大长度 
	export var MAX_EXTERNAL_TOKEN_LEN = 512; // 外部帐号相关token或者密码的最大长度 
	export var MAX_EXTERNAL_NAME_LEN = 512; // 外部帐号相关名字的最大长度 
	export var MAX_EXTERNAL_PARA_LEN = 256; // 外部帐号相关的其他参数最大长度 
	export var AUTHTYPE_AUTO_ACC = 0; // 自动生成帐号 
	export var AUTHTYPE_REG_ACC = 1; // 游戏内注册帐号 
	export var AUTH_CHANNEL_COMMON = 0; // 未知通用 
	export var AUTH_CHANNEL_VIVO = 2; // VIVO 
	export var AUTH_CHANNEL_LEGAME = 11; // 乐视 
	export var MASK_CMD_PROC_NONE = 0; // 无任何标记 
	export var MASK_CMD_PROC_ENCRYPT = 1; // GameProtoPkg己加密 

	//body export
	export class WX_CMD_ERROR_SC implements message {
		public Code: number = 0;  //错误码 

		public messageName(): string { return "WX_CMD_ERROR";}
		public messageValue(): number { return WX_CMD_ERROR;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Int16Array, this.Code);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.Code = decodeBuffer.read(Int16Array, 1);
			return decodeBuffer.length();
		}
	}

	export class WX_CMD_AUTH_CS implements message {
		public GameId: number = 0;  //游戏id,由RS统一分配,老虎机先暂定为1 
		public AuthType: number = 0;  //鉴权类型参见相关枚举 
		public Account: string = "";  //帐号 
		public PwdMD5: string = "";  //密码md5值,将原始密码进行一次MD5运算得到的16字节的密码 

		public messageName(): string { return "WX_CMD_AUTH";}
		public messageValue(): number { return WX_CMD_AUTH;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.GameId);
			encodeBuffer.write(Int8Array, this.AuthType);
			encodeBuffer.writeString(this.Account, MAX_ACCOUNT_LEN);
			encodeBuffer.writeString(this.PwdMD5, MAX_LEN_PWD_MD5);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.GameId = decodeBuffer.read(Uint16Array, 1);
			this.AuthType = decodeBuffer.read(Int8Array, 1);
			this.Account = decodeBuffer.readString(MAX_ACCOUNT_LEN);
			this.PwdMD5 = decodeBuffer.readString(MAX_LEN_PWD_MD5);
			return decodeBuffer.length();
		}
	}

	export class WX_CMD_AUTH_SC implements message {
		public GameId: number = 0;  //游戏id 
		public Account: string = "";  //帐号 
		public RetCode: number = 0;  //具体命令字相关的错误码参见RET_LOGIN_NEEDCODE等定义 
		public RetCodeDesc: string = "";  //登录错误时具体的提示语 
		public SessionId: string = "";  //服务端生成的session id，用于用户断线重连等，客户端侧需要记录下来，以备后用 

		public messageName(): string { return "WX_CMD_AUTH";}
		public messageValue(): number { return WX_CMD_AUTH;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.GameId);
			encodeBuffer.writeString(this.Account, MAX_ACCOUNT_LEN);
			encodeBuffer.write(Int16Array, this.RetCode);
			encodeBuffer.writeString(this.RetCodeDesc, MAX_LEN_LOGINAUTH_DESC);
			if (this.RetCode==0) {
				encodeBuffer.writeString(this.SessionId, MAX_LEN_RS_SID);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.GameId = decodeBuffer.read(Uint16Array, 1);
			this.Account = decodeBuffer.readString(MAX_ACCOUNT_LEN);
			this.RetCode = decodeBuffer.read(Int16Array, 1);
			this.RetCodeDesc = decodeBuffer.readString(MAX_LEN_LOGINAUTH_DESC);
			if (this.RetCode==0) {
				this.SessionId = decodeBuffer.readString(MAX_LEN_RS_SID);
			}
			return decodeBuffer.length();
		}
	}

	export class WX_CMD_AUTH_EXTERNAL_CS implements message {
		public AuthChannel: number = 0;  //鉴权渠道参见具体游戏协议中的相关枚举SPEC_CHANNEL_VER_CLASSICFRUIT等 
		public OuterAcc: string = "";  //外部渠道帐号 
		public OuterToken: string = "";  //外部帐号相关token或者密码 
		public OuterName: string = "";  //外部帐号相关名字 
		public OtherPara1: string = "";  //上传额外内部帐号即deviceid备用参数1 
		public OtherPara2: string = "";  //备用参数2 
		public OtherPara3: string = "";  //备用参数3 

		public messageName(): string { return "WX_CMD_AUTH_EXTERNAL";}
		public messageValue(): number { return WX_CMD_AUTH_EXTERNAL;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Int32Array, this.AuthChannel);
			encodeBuffer.writeString(this.OuterAcc, MAX_EXTERNAL_ACCOUNT_LEN);
			encodeBuffer.writeString(this.OuterToken, MAX_EXTERNAL_TOKEN_LEN);
			encodeBuffer.writeString(this.OuterName, MAX_EXTERNAL_NAME_LEN);
			encodeBuffer.writeString(this.OtherPara1, MAX_EXTERNAL_PARA_LEN);
			encodeBuffer.writeString(this.OtherPara2, MAX_EXTERNAL_PARA_LEN);
			encodeBuffer.writeString(this.OtherPara3, MAX_EXTERNAL_PARA_LEN);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.AuthChannel = decodeBuffer.read(Int32Array, 1);
			this.OuterAcc = decodeBuffer.readString(MAX_EXTERNAL_ACCOUNT_LEN);
			this.OuterToken = decodeBuffer.readString(MAX_EXTERNAL_TOKEN_LEN);
			this.OuterName = decodeBuffer.readString(MAX_EXTERNAL_NAME_LEN);
			this.OtherPara1 = decodeBuffer.readString(MAX_EXTERNAL_PARA_LEN);
			this.OtherPara2 = decodeBuffer.readString(MAX_EXTERNAL_PARA_LEN);
			this.OtherPara3 = decodeBuffer.readString(MAX_EXTERNAL_PARA_LEN);
			return decodeBuffer.length();
		}
	}

	export class WX_CMD_AUTH_EXTERNAL_SC implements message {
		public OuterAcc: string = "";  //原样返回上行的外部渠道帐号 
		public GameId: number = 0;  //游戏路由id,客户端需要记录下来在充值等操作中可能会用到 
		public ExtRetPara1: string = "";  //上传额外内部帐号即deviceid 
		public ExtRetPara2: string = "";  //备用参数2 
		public ExtRetPara3: string = "";  //备用参数3 
		public RetCode: number = 0;  //具体命令字相关的错误码参见RET_LOGIN_NEEDCODE等定义 
		public RetCodeDesc: string = "";  //登录错误时具体的提示语 
		public SessionId: string = "";  //服务端生成的session id，用于用户断线重连等，客户端侧需要记录下来，以备后用 

		public messageName(): string { return "WX_CMD_AUTH_EXTERNAL";}
		public messageValue(): number { return WX_CMD_AUTH_EXTERNAL;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.OuterAcc, MAX_EXTERNAL_ACCOUNT_LEN);
			encodeBuffer.write(Uint16Array, this.GameId);
			encodeBuffer.writeString(this.ExtRetPara1, MAX_EXTERNAL_PARA_LEN);
			encodeBuffer.writeString(this.ExtRetPara2, MAX_EXTERNAL_PARA_LEN);
			encodeBuffer.writeString(this.ExtRetPara3, MAX_EXTERNAL_PARA_LEN);
			encodeBuffer.write(Int16Array, this.RetCode);
			encodeBuffer.writeString(this.RetCodeDesc, MAX_LEN_LOGINAUTH_DESC);
			if (this.RetCode==0) {
				encodeBuffer.writeString(this.SessionId, MAX_LEN_RS_SID);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.OuterAcc = decodeBuffer.readString(MAX_EXTERNAL_ACCOUNT_LEN);
			this.GameId = decodeBuffer.read(Uint16Array, 1);
			this.ExtRetPara1 = decodeBuffer.readString(MAX_EXTERNAL_PARA_LEN);
			this.ExtRetPara2 = decodeBuffer.readString(MAX_EXTERNAL_PARA_LEN);
			this.ExtRetPara3 = decodeBuffer.readString(MAX_EXTERNAL_PARA_LEN);
			this.RetCode = decodeBuffer.read(Int16Array, 1);
			this.RetCodeDesc = decodeBuffer.readString(MAX_LEN_LOGINAUTH_DESC);
			if (this.RetCode==0) {
				this.SessionId = decodeBuffer.readString(MAX_LEN_RS_SID);
			}
			return decodeBuffer.length();
		}
	}

	export class WX_CMD_NEW_UNIAUTH_CS implements message {
		public AuthChannel: number = 0;  //鉴权渠道参见游戏协议文件中NEWACCSYSTEM_CHANNEL_VISITOR等枚举 
		public ChannelAcc: string = "";  //对应帐号游客渠道时与设备ID一致 
		public DeviceID: string = "";  //设备ID 
		public IdentityToken: string = "";  //鉴权token 

		public messageName(): string { return "WX_CMD_NEW_UNIAUTH";}
		public messageValue(): number { return WX_CMD_NEW_UNIAUTH;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Int32Array, this.AuthChannel);
			encodeBuffer.writeString(this.ChannelAcc, MAX_EXTERNAL_ACCOUNT_LEN);
			encodeBuffer.writeString(this.DeviceID, MAX_EXTERNAL_ACCOUNT_LEN);
			encodeBuffer.writeString(this.IdentityToken, MAX_EXTERNAL_ACCOUNT_LEN);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.AuthChannel = decodeBuffer.read(Int32Array, 1);
			this.ChannelAcc = decodeBuffer.readString(MAX_EXTERNAL_ACCOUNT_LEN);
			this.DeviceID = decodeBuffer.readString(MAX_EXTERNAL_ACCOUNT_LEN);
			this.IdentityToken = decodeBuffer.readString(MAX_EXTERNAL_ACCOUNT_LEN);
			return decodeBuffer.length();
		}
	}

	export class WX_CMD_NEW_UNIAUTH_SC implements message {
		public RetCode: number = 0;  //具体命令字相关的错误码 
		public RetCodeDesc: string = "";  //登录错误时具体的提示语 
		public SessionId: string = "";  //服务端生成的session id，用于用户断线重连等，客户端侧需要记录下来，以备后用 

		public messageName(): string { return "WX_CMD_NEW_UNIAUTH";}
		public messageValue(): number { return WX_CMD_NEW_UNIAUTH;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Int16Array, this.RetCode);
			encodeBuffer.writeString(this.RetCodeDesc, MAX_LEN_LOGINAUTH_DESC);
			if (this.RetCode==0) {
				encodeBuffer.writeString(this.SessionId, MAX_LEN_RS_SID);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.RetCode = decodeBuffer.read(Int16Array, 1);
			this.RetCodeDesc = decodeBuffer.readString(MAX_LEN_LOGINAUTH_DESC);
			if (this.RetCode==0) {
				this.SessionId = decodeBuffer.readString(MAX_LEN_RS_SID);
			}
			return decodeBuffer.length();
		}
	}

	export class WX_CMD_REPLAY_CS implements message {
		public AuthChannel: number = 0;  //鉴权渠道参见游戏协议文件中NEWACCSYSTEM_CHANNEL_VISITOR等枚举 
		public Account: string = "";  //对应帐号游客渠道时与设备ID一致 
		public SessionId: string = "";  //客户端保存的session id 
		public InnerAccount: string = "";  //内部帐号 

		public messageName(): string { return "WX_CMD_REPLAY";}
		public messageValue(): number { return WX_CMD_REPLAY;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Int32Array, this.AuthChannel);
			encodeBuffer.writeString(this.Account, MAX_EXTERNAL_ACCOUNT_LEN);
			encodeBuffer.writeString(this.SessionId, MAX_LEN_RS_SID);
			encodeBuffer.writeString(this.InnerAccount, MAX_EXTERNAL_ACCOUNT_LEN);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.AuthChannel = decodeBuffer.read(Int32Array, 1);
			this.Account = decodeBuffer.readString(MAX_EXTERNAL_ACCOUNT_LEN);
			this.SessionId = decodeBuffer.readString(MAX_LEN_RS_SID);
			this.InnerAccount = decodeBuffer.readString(MAX_EXTERNAL_ACCOUNT_LEN);
			return decodeBuffer.length();
		}
	}

	export class WX_CMD_REPLAY_SC implements message {
		public SubResultCode: number = 0;  //具体命令字相关的错误码 

		public messageName(): string { return "WX_CMD_REPLAY";}
		public messageValue(): number { return WX_CMD_REPLAY;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Int16Array, this.SubResultCode);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.SubResultCode = decodeBuffer.read(Int16Array, 1);
			return decodeBuffer.length();
		}
	}

	export class WX_CMD_PROC_CS implements message {
		public Mask: number = 0;  //状态控制掩码(按bit位标记) 
		public GameProtoPkg: Array<number> = new Array<number>();  //需要透传到GameServer的编码包，按照业务侧的协议类型和格式定义编码而成 

		public messageName(): string { return "WX_CMD_PROC";}
		public messageValue(): number { return WX_CMD_PROC;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Int8Array, this.Mask);
			var GameProtoPkgSize = this.GameProtoPkg.length > MAX_LEN_PROC_BODY ? MAX_LEN_PROC_BODY : this.GameProtoPkg.length;
			encodeBuffer.write(Uint16Array, GameProtoPkgSize);
			this.GameProtoPkg.length = GameProtoPkgSize;
			encodeBuffer.write(Int8Array, this.GameProtoPkg);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.Mask = decodeBuffer.read(Int8Array, 1);
			var GameProtoPkgSize = decodeBuffer.read(Uint16Array, 1);
			this.GameProtoPkg = new Array<number>(GameProtoPkgSize);
			this.GameProtoPkg = decodeBuffer.read(Int8Array, GameProtoPkgSize);
			return decodeBuffer.length();
		}
	}

	export class WX_CMD_PROC_SC implements message {
		public Mask: number = 0;  //状态控制掩码(按bit位标记) 
		public GameProtoPkg: Array<number> = new Array<number>();  //需要透传到客户端的编码包，按照业务侧的协议类型和格式定义编码而成 

		public messageName(): string { return "WX_CMD_PROC";}
		public messageValue(): number { return WX_CMD_PROC;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Int8Array, this.Mask);
			var GameProtoPkgSize = this.GameProtoPkg.length > MAX_LEN_PROC_BODY ? MAX_LEN_PROC_BODY : this.GameProtoPkg.length;
			encodeBuffer.write(Uint16Array, GameProtoPkgSize);
			this.GameProtoPkg.length = GameProtoPkgSize;
			encodeBuffer.write(Int8Array, this.GameProtoPkg);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.Mask = decodeBuffer.read(Int8Array, 1);
			var GameProtoPkgSize = decodeBuffer.read(Uint16Array, 1);
			this.GameProtoPkg = new Array<number>(GameProtoPkgSize);
			this.GameProtoPkg = decodeBuffer.read(Int8Array, GameProtoPkgSize);
			return decodeBuffer.length();
		}
	}

	export class CS implements message {
		public Len: number = 0;  //包长字段 
		public ProtoVer: number = Version;  //协议版本号 
		public Cmd: number = 0;  //命令字 
		public Body: message = null;  //包体,根据Cmd不同对应到不同的包体 

		public messageName(): string { return "";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.Len);
			encodeBuffer.write(Uint16Array, this.ProtoVer);
			encodeBuffer.write(Uint16Array, this.Cmd);
			encodeBuffer.skip(this.Body.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.Len = decodeBuffer.read(Uint16Array, 1);
			this.ProtoVer = decodeBuffer.read(Uint16Array, 1);
			this.Cmd = decodeBuffer.read(Uint16Array, 1);
			decodeBuffer.skip(this.Body.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class SC implements message {
		public Len: number = 0;  //包长字段 
		public ProtoVer: number = Version;  //协议版本号 
		public Cmd: number = 0;  //命令字 
		public Body: message = null;  //包体,根据Cmd不同对应到不同的包体 

		public messageName(): string { return "";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.Len);
			encodeBuffer.write(Uint16Array, this.ProtoVer);
			encodeBuffer.write(Uint16Array, this.Cmd);
			encodeBuffer.skip(this.Body.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.Len = decodeBuffer.read(Uint16Array, 1);
			this.ProtoVer = decodeBuffer.read(Uint16Array, 1);
			this.Cmd = decodeBuffer.read(Uint16Array, 1);
			decodeBuffer.skip(this.Body.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class WX_CMD_ERROR_CS implements message {

		public messageName(): string { return "WX_CMD_ERROR";}
		public messageValue(): number { return WX_CMD_ERROR;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

}
