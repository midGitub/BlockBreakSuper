
module KConnect {

    export enum CommandType {
      WX_CMD_ZERO_PLACEHOLDER = 0,       //0值占位
      WX_CMD_ERROR = 0x0001,             //出错
      WX_CMD_AUTH = 0x0010,              //游戏本身的鉴权请求
      WX_CMD_REPLAY = 0x0012,            //断线重连请求
      WX_CMD_PROC = 0x0060,              //业务逻辑数据请求
    }

    export enum AuthType {
      AUTHTYPE_AUTO_ACC = 0,       //自动生成帐号
      AUTHTYPE_REG_ACC = 1,        //游戏内注册帐号
    }

    export enum ProcCmdBitMaskDef {
      CMDPROCMASKTYPE_NONE = 0,         //无任何标记
      CMDPROCMASKTYPE_ENCRYPT = 1,      //game_proto_pkg己加密
    }

    export enum Common {
      RET_OK = 0,                         //正常
      RET_NEED_LOGIN = 1,                 //需要登陆
      RET_AUTH_TOKEN_ERROR = 1001,          //需要验证码
      RET_AUTH_TOKEN_EXPIRED = 1002,        //令牌过期
      MAX_LEN_RS_SID = 129,               //RS返回的SID最大长度
      MAX_ACCOUNT_LEN = 136,              //帐号最大长度
      MAX_LEN_PWD_MD5 = 17,               //密码md5值最大长度
      RET_SYSTEM_ERR = 2,                 //系统错误
      MAX_EXTERNAL_PARA_LEN = 256,        //外部帐号相关的其他参数最大长度
      RET_RELAY_ERR = 3,                  //透传包错误
      MAX_LEN_PROC_BODY = 32768,          //WX_CMD_PROC协议中的body对应的buff最大长度
      RET_SVR_MATAINING = 4,              //游戏正在努力维护中请您稍后再试
      MAX_EXTERNAL_NAME_LEN = 512,        //外部帐号相关名字的最大长度
      MAX_EXTERNAL_TOKEN_LEN = 512,       //外部帐号相关token或者密码的最大长度
      MAX_LEN_LOGINAUTH_DESC = 512,       //鉴权验证及验证码验证刷新协议中的保留字段即错误描述字段最大长度
      MAX_EXTERNAL_ACCOUNT_LEN = 512,     //外部帐号最大长度
    }

}