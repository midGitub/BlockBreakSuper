
module CSProto {

    export enum ShopType {
      SHOP_TYPE_NONW = 0,
      SHOP_TYOE_COST_GOLD = 1,             // 金币购买
      SHOP_TYPE_COST_DIAMOND = 2,          // 钻石购买
      SHOP_TYPE_COST_RES = 3,              // 道具购买
      SHOP_TYPE_MAX = 4,
    }

    export enum NewerGuideStat {
      NEWER_GIDESTAT_NOTFIN = 0,                    //未完成
      NEWER_GIDESTAT_HASFIN = 1,                    //己完成
      NEWER_GIDESTAT_SKIPPED = 2,                   //己跳过
    }

    export enum BankerStat {
      BANKER_STAT_NONE = 0,                          //不是庄家
      BANKER_STAT_INLIST = 1,                        //在庄家排列列表中
      BANKER_STAT_DO_BANKER = 2,                     //当前是庄家
    }

    export enum EnFootBallQueryType {
      FOOTBALL_QUERYTYPE_NOTBEGIN = 0,       //未开始
      FOOTBALL_QUERYTYPE_MATCHING = 1,       //比赛中
    }

    export enum EnFootBallBetType {
      FOOTBALL_BETTYPE_EMPTY = 0,       //空类型仅占位
      FOOTBALL_BETTYPE_WIN = 1,       //球队胜利
      FOOTBALL_BETTYPE_CONCEDE_WIN = 2,       //让球胜利(需要一个参数)
    }

    export enum BattleTableStatus {
      BATTLE_TABLE_STATUS_IDLE = 0,            // 闲置状态
      BATTLE_TABLE_STATUS_WAIT_START = 1,      // 等待开始
      BATTLE_TABLE_STATUS_BET_ON = 2,          // 押注
      BATTLE_TABLE_STATUS_SHOW_CARD = 3,       // 开牌，客户端不用
    }

    export enum ZodiacSceneItemBunchType {
      ZODIAC_SCENE_ITEMBUNCH_0AND1 = 0,      //0串1
      ZODIAC_SCENE_ITEMBUNCH_2AND1 = 1,      //2串1        
      ZODIAC_SCENE_ITEMBUNCH_0AND2 = 2,      //0串2        
      ZODIAC_SCENE_ITEMBUNCH_0AND1AND2 = 3,      //1串2串3  
      ZODIAC_SCENE_ITEMBUNCH_COUNT = 4,    
    }

    export enum EnFootBallBetTeamType {
      FOOTBALL_BETTEAMTYPE_EMPTY = 0,       //空类型仅占位
      FOOTBALL_BETTEAMTYPE_HOMETEAM = 1,       //压注到主队
      FOOTBALL_BETTEAMTYPE_VISITORTEAM = 2,       //压注到客队
      FOOTBALL_BETTEAMTYPE_MATCH = 3,       //压注到整场比赛
    }

    export enum MapTemplateID {
      MAP_TEMPLATE_ID_PLACEHOLDER = 0,
      MAP_TEMPLATE_ID_HALL = 1,                    //展示大厅列表
    }

    export enum MailType {
      MAIL_TYPE_PLACEHOLDER = 0,
      SYSTEM_MAIL_TYPE = 1,            //系统邮件
      NORMAL_MAIL_TYPE = 2,            //暂未使用：普通邮件
      GIVE_GOLD_MAIL_TYPE = 3,         //送金币邮件
      SYSTEM_RELIEF_MAIL_TYPE = 4,     //系统救济金邮件
      USER_MSG_MAIL_TYPE = 5,          //用户消息
    }

    export enum InvestSceneStatus {
      INVEST_SCENE_STATUS_IDLE = 0,               //闲置
      INVEST_SCENE_STATUS_WAIT_BET = 1,           //等待下注
      INVEST_SCENE_STATUS_WILL_SHOW_RESULT = 2,   //即将出结果
      INVEST_SCENE_STATUS_SHOW_RESULT = 3,        //出结果
      INVEST_SCENE_STATUS_COUNT = 4,              //状态数量
    }

    export enum ResType {
      RES_TYPE_NONW = 0,
      RES_TYPE_GOLD = 1,                    // 金币
      RES_TYPE_STABLE_GIFT_BAG = 101,       // 礼包类（稳定开出相同道具）
      RES_TYPE_RANDOM_GIFT_BAG = 102,       // 礼包类（随机开出一个道具）
      RES_TYPE_MEDICINE = 103,              // 药水类
      RES_TYPE_DIAMOND = 2,                 // 砖石
      RES_TYPE_TILI = 3,                    // 体力
      RES_TYPE_VIP_CARD = 301,              // VIP卡
      RES_TYPE_TRUMPET = 4,                 // 小喇叭
      RES_TYPE_MATERIAL = 401,              // 材料类
      RES_TYPE_CHARM = 5,                   // 魅力值
      RES_TYPE_ROLEEXP = 6,                // 角色经验
    }

    export enum ZodiacSceneStatus {
      ZODIAC_SCENE_STATUS_IDLE = 0,               //闲置
      ZODIAC_SCENE_STATUS_WAIT_BET = 1,           //等待下注
      ZODIAC_SCENE_STATUS_WILL_SHOW_RESULT = 2,   //即将出结果
      ZODIAC_SCENE_STATUS_SHOW_RESULT = 3,        //出结果
      ZODIAC_SCENE_STATUS_COUNT = 4,              //状态数量
    }

    export enum RankClassType {
      RANK_CLASS_PLACEHOLDER = 0,
      RANK_CLASS_DAILY_DZ_WIN_GAME_COUNT = 1,      //德州扑克每日胜利局数量排行
      RANK_CLASS_OWN_GOLD = 2,                     //拥有金币排行
      RANK_CLASS_DZ_TILI_GAME_GRADES_1 = 3,        //德州扑克体力场积分排行1
      RANK_CLASS_DZ_TILI_GAME_GRADES_2 = 4,        //德州扑克体力场积分排行2
      RANK_CLASS_HUNDRED_BIGWINNER = 5,            //百人德州场大赢家排行
    }

    export enum MailBoxType {
      MAIL_BOX_TYPE_PLACEHOLDER = 0,
      MAIL_BOX_RECV = 1,               //收件箱
      MAIL_BOX_SEND = 2,               //暂未支持:发件箱
    }

    export enum EnFootBallBetItemStatus {
      FOOTBALL_BETITEM_STAT_EMPTY = 0,       //空类型仅占位
      FOOTBALL_BETITEM_STAT_CANBET = 1,       //可竞猜
      FOOTBALL_BETITEM_STAT_MATCHING = 2,       //比赛中
      FOOTBALL_BETITEM_STAT_WILLAWARD = 3,       //比赛己结束等待开奖
      FOOTBALL_BETITEM_STAT_HASCLEAR = 4,       //己清盘
      FOOTBALL_BETITEM_STAT_HASCANCEL = 5,       //己取消
    }

    export enum FriendOperationType {
      FRIEND_OP_TYPE_AGREE_FRIEND_REQ = 0,       // 同意好友请求
      FRIEND_OP_TYPE_REFUSE_FRIEND_REQ = 1,      // 拒绝好友请求
      FRIEND_OP_TYPE_DEL_FRIEND = 2,             // 删除好友
    }

    export enum CommandType {
      CMD_ZERO_PLACEHOLDER = 0,            //0值占位符
      CMD_GET_TASK_LIST = 1001,               //获取任务列表
      CMD_GET_TASK_AWARD = 1002,              //任务领奖
      CMD_GET_CAN_AWARD_TASK_NUM = 1003,      //获取可领奖人数数量
      CMD_ERROR = 101,                        //通用错误提示协议
      CMD_TEST_ECHO = 102,                    //测试命令字echo
      CMD_GM = 105,                           //特殊gm请求
      CMD_GET_RES_INFO = 1101,                //获取道具信息
      CMD_GET_SHOP_INFO = 1102,               //获取商店信息
      CMD_BUY_COMMODITY = 1103,               //购买商品
      CMD_OPEN_GIFT_BAG = 1104,               //打开礼包
      CMD_GET_TIME_LIMITED_RES_INFO = 1105,   //获取限时道具信息
      CMD_GET_CASHBOX_INFO = 1106,            //获取小金库信息
      CMD_SET_CASHBOX_PWD = 1107,             //设置小金库密码
      CMD_GET_GOLD_FROM_CASHBOX = 1108,       //小金库取钱
      CMD_SAVE_GOLD_TO_CASHBOX = 1109,        //小金库存钱
      CMD_FREE_GOLD_INFO = 1110,              //免费金币信息
      CMD_GET_FREE_GOLD = 1111,               //领取免费金币
      CMD_BATTLE_ENTER_DATA = 1201,                    //入场数据
      CMD_BATTLE_SIT_DOWN = 1202,                      //玩家坐下
      CMD_BATTLE_STAND_UP = 1203,                      //玩家战起
      CMD_BATTLE_UPDATE_TABLE_BET_INFO = 1204,         //更新桌台下注信息
      CMD_BATTLE_BET_ON = 1205,                        //下注
      CMD_BATTLE_ROUND_START = 1206,                   //一局开始
      CMD_BATTLE_ROUND_END = 1207,                     //一局结束
      CMD_BATTLE_UPDATE_TABLE_DATA = 1208,             //更新桌台数据
      CMD_COWBOY_ENTER_DATA = 1301,                    //入场数据
      CMD_COWBOY_UPT_DATA = 1302,                    //场景更新数据,比如当从白天变到黑夜等状态变更或者是特殊气球进度发生变更等等
      CMD_COWBOY_BALLOON_BORN = 1303,                    //新气球出生
      CMD_COWBOY_SHOOT = 1304,                    //发射子弹	
      CMD_COWBOY_HIT_BALLOON = 1306,                    //通知服务器命中了某个气球
      CMD_COWBOY_BALLOON_DEAD = 1307,                    //广播同步房间内某个气球被击中并爆炸(包括玩家自身命中的)
      CMD_HUNDRED_ENTERDATA = 1401,           //进入场的数据
      CMD_HUNDRED_ROUND_END = 1402,           //通知转轮结果
      CMD_HUNDRED_BET_ON = 1403,           //玩家下注
      CMD_HUNDRED_SIGNUP_BANKER = 1404,           //玩家申请上庄
      CMD_HUNDRED_QUIT_BANKER = 1405,           //玩家申请提前下庄
      CMD_HUNDRED_CURBANKERLIST = 1406,           //场当前庄家列表
      CMD_HUNDRED_HEARTBEAT = 1407,           //场庄家心跳
      CMD_HUNDRED_REFRESHDATA = 1408,           //场数据刷新
      CMD_HUNDRED_UPDATE_CURBANKER = 1409,           //更新当前场子中的庄家信息
      CMD_HUNDRED_UPDATE_BANKER_STAT = 1410,           //通知更新自身的Banker状态
      CMD_HUNDRED_SIT_DOWN = 1411,           //坐下
      CMD_HUNDRED_STAND_UP = 1412,           //战起
      CMD_HUNDRED_LAST_BIG_AWARD_INFO = 1413,           //上次大奖信息
      CMD_INVEST_ENTERDATA = 1501,            //进入场的数据
      CMD_INVEST_ROUND_END = 1502,            //通知转轮结果
      CMD_INVEST_BET_ON = 1503,            //玩家下注
      CMD_INVEST_REFRESHDATA = 1504,            //场数据刷新
      CMD_INVEST_REWARD_NPC_MM = 1505,            //打赏地产大亨游戏中的NPC妹子
      CMD_ZODIAC_ENTERDATA = 1601,            //进入场的数据
      CMD_ZODIAC_ROUND_END = 1602,            //通知转轮结果
      CMD_ZODIAC_BET_ON = 1603,            //玩家下注
      CMD_ZODIAC_SET_BUNCH = 1604,            //玩家设置串2、串3数据
      CMD_ZODIAC_REFRESHDATA = 1605,            //场数据刷新
      CMD_ZODIAC_REWARD_NPC_MM = 1606,            //打赏幸运连连游戏中的NPC妹子
      CMD_FISH_ENTERDATA = 1701,            //进入场的数据
      CMD_FISH_REFRESHDATA = 1702,            //刷新数据
      CMD_FISH_FISHING = 1703,            //钓鱼
      CMD_STOCK_ENTERDATA = 1801,            //进入场的数据
      CMD_STOCK_ROUND_END = 1802,            //通知转轮结果
      CMD_STOCK_BET_ON = 1803,            //玩家下注
      CMD_STOCK_REFRESHDATA = 1805,            //场数据刷新
      CMD_STOCK_REWARD_NPC_MM = 1806,            //打赏股市风云游戏中的NPC妹子
      CMD_FOOTBALL_MATCHLIST = 1901,            //获取比赛列表
      CMD_FOOTBALL_BET_ON = 1902,            //竞猜压注
      CMD_FOOTBALL_MY_BETLIST = 1903,            //获取我参与的下注信息列表
      CMD_ALOGIN = 200,                       //账户登录
      CMD_ALOGOUT = 201,                      //账户登出请求
      CMD_PING = 202,                         //心跳包
      CMD_KICKOFF_ACCOUNT = 203,              //服务器主动踢账户下线
      CMD_WARP = 204,                         //通知帐户登录后所在的场景
      CMD_NTF_ENTERVIEW = 205,                //广播消息,通知周围的人角色进入桌台
      CMD_NTF_LEAVEVIEW = 206,                //广播消息,通知周围的人角色离开桌台
      CMD_SCENE_HISTORY_CHATMSG = 207,        //场景中的历史聊天记录
      CMD_ENTER_SCENE = 208,                  //请求进入具体场景
      CMD_CREATE_ROLE = 209,                  //创建角色
      CMD_QUICK_START = 210,                  //快速开始
      CMD_GET_SCENE_INFO = 211,               //获取场景信息
      CMD_ROLE_MISC = 300,                    //角色混杂数据
      CMD_ROLE_FIN = 301,                     //登录下发的所有角色信息结束
      CMD_ATT_CHANGE = 302,                   //角色属性变化通知
      CMD_GET_MAILLIST = 401,                 //获取邮件列表信息
      CMD_GET_MAILATTACH = 402,               //获取邮件的附件
      CMD_MAILSTAT_CHANGE = 403,              //通知服务器邮件变为己读等等状态的变更
      CMD_GET_UNREAD_USER_MSG = 404,          //获取所有未读的用户消息
      CMD_SEND_USER_MSG = 405,                //发送用户消息
      CMD_READED_USER_MSG = 406,              //当用户读取了某个人的未读消息后，向服务器发送次消息，服务器处理状态变更，此消息没有下行
      CMD_NOTIFY_UNREAD_USER_MSG_NUM = 407,   //服务器主动通知所有未读消息数量
      CMD_NOTIFY_RECV_NEW_USER_MSG = 408,     //服务器主动通知收到了新的用户消息
      CMD_NOTIFY_CHARGESUCC = 501,
      CMD_HAPPYCENTER_GEN_ORDER = 502,
      CMD_HAPPYCENTER_NOTIFY_SERVER_SUCC = 503,
      CMD_HAPPYCENTER_NOTIFY_CLIENT_SUCC = 504,
      CMD_APPSTORE_HAPPYRECEPIT_VERIFY = 506,
      CMD_RANK_QUERYPAGE = 701,               //查询排行榜分页
      CMD_NEWMSG_TAG = 702,                   //上行清除打点系统标记,下行则是通知当前打点列表
      CMD_UPLOAD_HEADPHOTO = 703,             //上传头像
      CMD_CHANGE_HEADPHOTO = 704,             //改变当前头像
      CMD_MODIFY_SELFPROP = 705,              //修改性别等属性
      CMD_MODIFY_NICK = 706,                  //修改昵称but目前后台还没有判断唯一性
      CMD_SKIP_NEWERGUIDE = 707,              //跳过新手引导
      CMD_CHAT = 708,                         //消息频道聊天,包括系统频道
      CMD_ADD_PHOTO = 709,                    //添加照片
      CMD_DEL_PHOTO = 710,                    //删除照片
      CMD_CONLOGIN_GIFT = 711,                //连续登录礼包信息
      CMD_GET_CONLOGIN_GIFT = 712,            //领取连续登陆奖励
      CMD_GET_UPLOAD_FILE_TOKEN = 713,        //获取上传文件令牌
      CMD_UPLOAD_FILE_COMPLETED = 714,        //上传文件完成
      CMD_MODIFY_SIGNATURE = 715,             //修改个性签名
      CMD_USE_MAGIC_EXPRESSION = 716,         //使用魔法表情
      CMD_FINISH_NEWERGUIDE = 717,            //完成新手引导
      CMD_GET_CHARGE_ACTIVITY_INFO = 718,     //获取充值活动信息
      CMD_ROBOT_SET_ROLE_INFO = 719,          //机器人设置角色信息
      CMD_PLAYER_DRAW_INFO = 720,             //玩家的抽奖信息
      CMD_DRAW = 721,                         //抽奖
      CMD_GET_GAMING_AWARD_INFO = 722,        //获取在玩时间奖励信息
      CMD_GET_GAMING_AWARD = 723,             //在玩时间领奖
      CMD_MAGIC_EXPRESSION_PRICE = 724,       //魔法表情价格
      CMD_ITEMSTORE_GETSALEHIS = 725,         //获取当前的销售数据
      CMD_ITEMSTORE_DOBUY = 726,              //物品商城购买
      CMD_ITEMSTORE_QUERY_BUYLOG = 727,       //查询购买历史
      CMD_ITEMSTORE_SET_DELIVERINFO = 728,    //设置商品发货地址
      CMD_ITEMSTORE_NEWEST_BUYMSG = 729,      //查询需要轮播的最新兑换历史
      CMD_GET_PLAYER_BASIC_INFO = 901,        //获取玩家基本信息
      CMD_GET_PLAYER_DETAILED_INFO = 902,     //获取玩家详细信息(包括基本信息，牌技信息)
      CMD_GET_PLAYER_FULL_INFO = 903,         //获取玩家全量信息(包括基本信息，牌技信息，社交信息)
      CMD_GET_FOLLOW_LIST = 904,              //获取关注列表
      CMD_DEL_FOLLOW_INFO = 905,              //删除关注信息
      CMD_FORBID_BEEN_FOLLOW = 906,           //禁止被关注
      CMD_A_FOLLOW_B = 907,                   //通知消息,A关注了B,用于牌座上的表现
      CMD_FOLLOW_TO = 908,                    //关注某人
      CMD_NOTIFY_DEL_FROM_FOLLOW_LIST = 909,  //服务器主动通知，客户端收到此消息，表示别人取消了我的关注，应将对方从我的关注列表中删除
      CMD_SEARCH_PLAYER = 910,                //搜索玩家
      CMD_GIVE_GOLD = 911,                    //赠送金币
      CMD_GET_PLAYER_SCENE = 912,             //获取玩家当前所在场景
      CMD_REQUEST_BE_FRIEND = 913,            //请求加好友
      CMD_FRIEND_OPERATION = 914,             //好友相关操作
      CMD_FRIEND_LIST_CHANGE = 915,           //服务器推送好友列表变化,上线后第一次为全量，之后变化都为增量
      CMD_GET_RECOMMEND_FRIEND_LIST = 916,    //获取推荐好友列表
    }

    export enum AllowBeInvitedType {
      ALLOW_BE_INVITED_TYPE_ALL = 0,               // 所有
      ALLOW_BE_INVITED_TYPE_ONLY_FRINED = 1,       // 仅好友
      ALLOW_BE_INVITED_TYPE_NO_ONE = 2,            // 任何人都不行
    }

    export enum ResId {
      RES_ID_NONE = 0,
      RES_ID_GOLD_MIN = 1,
      RES_ID_DIAMOND_MIN = 101,
      RES_ID_DIAMOND_MAX = 199,
      RES_ID_TRUMPET = 301,
      RES_ID_GOLD_MAX = 99,
    }

    export enum UserChannel {
      USER_CHANNEL_VISITOR = 0,                     //游客
      USER_CHANNEL_MOBILE = 1,                      //用手机号注册的用户
      USER_CHANNEL_SUMSUNG = 101,                   //三星
      USER_CHANNEL_XIAOMI = 102,                   //小米
      USER_CHANNEL_HUAWEI = 103,                   //华为
      USER_CHANNEL_MEIZU = 104,                   //魅族
      USER_CHANNEL_360 = 105,                   //360
      USER_CHANNEL_UC = 105,                   //UC九游:UC九游, 豌豆荚,优酷己合并为一家,统一使用uc的实现
      USER_CHANNEL_OPPO = 106,                   //oppo
    }

    export enum UploadType {
      UPLOAD_TYPE_SELF_DEF_HEAD = 0,         // 上传自定义头像
      UPLOAD_TYPE_PHOTO = 1,                 // 相册照片
      UPLOAD_TYPE_COUNT = 2,
    }

    export enum PlayerTags {
      PLAYER_TAG_PLACEHOLD = 0,
      PLAYER_TAG_VIP_CARD = 0x00000001,          // 皇家贵宾卡用户
    }

    export enum StockSceneGroup {
      STOCK_SCENE_ITEM_GROUP_LOWLINE = 0,        //对应最低线相关压注
      STOCK_SCENE_ITEM_GROUP_MIDLINE = 1,        //对应中线相关压注
      STOCK_SCENE_ITEM_GROUP_HIGHLINE = 2,        //对应最高线相关压注
      STOCK_SCENE_ITEM_GROUP_FINALDIGITTYPE = 3,        //对应最后一个数字类型相关的压注
      STOCK_SCENE_ITEM_GROUP_TWODIGITSUM = 4,        //对应最后两个数字之和相关的压注
      STOCK_SCENE_ITEM_GROUP_FINALDIGITVAL = 5,        //对应最后一个数字值相关的压注
      STOCK_SCENE_ITEM_GROUP_COUNT = 6,  
    }

    export enum CltPlatformType {
      CLT_PLATFORM_TYPE_UNKNOWN = 0,                //未知
      CLT_PLATFORM_TYPE_ANDROID = 1,                //ANDROID
      CLT_PLATFORM_TYPE_IPHONE = 2,                //IPHONE
    }

    export enum MsgBoxType {
      MSGBOX_TYPE_NONE = 0,                   //无
      MSGBOX_TYPE_COMMON = 1,                 //基础通用提示框
    }

    export enum StockSceneStatus {
      STOCK_SCENE_STATUS_IDLE = 0,               //闲置
      STOCK_SCENE_STATUS_WAIT_BET = 1,           //等待下注
      STOCK_SCENE_STATUS_WILL_SHOW_RESULT = 2,   //即将出结果
      STOCK_SCENE_STATUS_SHOW_RESULT = 3,        //出结果
      STOCK_SCENE_STATUS_COUNT = 4,              //状态数量
    }

    export enum SpecialSceneType {
      SPECIAL_SCENE_TYPE_NORMAL = 0,
      SPECIAL_SCENE_TYPE_FINAL_MATCH = 1,      // 比赛场决赛
    }

    export enum HandCardType {
      HAND_CARD_TYPE_None = 0,
      HAND_CARD_TYPE_GaoPai = 1,
      HAND_CARD_TYPE_YiDui = 2,
      HAND_CARD_TYPE_YiDuiA = 3,
      HAND_CARD_TYPE_LianPai = 4,
      HAND_CARD_TYPE_TongHua = 5,
      HAND_CARD_TYPE_TongHua_LianPai = 6,
      HAND_CARD_TYPE_COUNT = 7,
    }

    export enum TaskType {
      TASK_TYPE_ACHIEVEMENT_TASK = 0,          // 成就任务
      TASK_TYPE_DAILY_TASK = 1,                // 每日任务
      TASK_TYPE_WEEKLY_TASK = 2,               // 每周任务
      TASK_TYPE_COUNT = 3,
    }

    export enum ObjType {
      OBJNONE = 0,                            //空类型
      OBJACCOUNT = 1,                         //账户类型结构
      OBJPLAYER = 2,                          //用户类型
      OBJMONSTER = 3,                         //怪物类型
      OBJITEM = 4,                            //道具类型结构
      OBJROLEPROP = 5,                        //角色属性的抽象
    }

    export enum SceneType {
      SCENE_TYPE_BEGIN = 0,
      SCENE_TYPE_HALL = 1,              // 大厅
      SCENE_TYPE_INVEST = 10,           // 地产大亨
      SCENE_TYPE_FISH = 11,           // 钓鱼小喵
      SCENE_TYPE_ZODIAC = 12,           // 幸运星座
      SCENE_TYPE_STOCK = 13,           // 股市
      SCENE_TYPE_FOOTBALL = 14,         // 足球
      SCENE_TYPE_DZ_CLASSICS = 2,       // 德州扑克经典场
      SCENE_TYPE_AMH = 3,               // 奥马哈
      SCENE_TYPE_BATTLE = 4,            // 巅峰对决
      SCENE_TYPE_DZ_TILI = 5,           // 德州体力场
      SCENE_TYPE_DZ_MATCH = 6,          // 德州比赛场
      SCENE_TYPE_COWBOY = 7,            // 欢乐牛仔
      SCENE_TYPE_DZ_PRIVATE = 8,        // 德州私人场
      SCENE_TYPE_HUNDRED = 9,           // 百人德州
    }

    export enum SceneTempId {
      SCENE_TEMP_ID_PLACEHOLD = 0,
      SCENE_TEMP_ID_HALL = 1,                     // 大厅
      SCENE_TEMP_ID_INVEST = 1001,                // 地产大亨
      SCENE_TEMP_ID_FISH = 1101,                  // 钓鱼小喵
      SCENE_TEMP_ID_ZODIAC = 1201,                // 幸运星座
      SCENE_TEMP_ID_STOCK = 1301,                // 股市
      SCENE_TEMP_ID_FOOTBALL = 1401,             // 足球
      SCENE_TEMP_ID_BATTLE = 401,                 // 巅峰对决
      SCENE_TEMP_ID_COWBOY = 701,                 // 欢乐牛仔基础场
      SCENE_TEMP_ID_HUNDRED = 901,                // 百人德州基础场
    }

    export enum AnyMaxValue {
      ANY_MAX_VALUE_ZERO_PLACEHOLDER = 0,
      MAX_WEAR_SIZE = 10,                    //最大装备个数
      MAX_AWARD_SIZE = 10,                   //最大奖励数目
      MAX_HISCHAT_LIST_SIZE = 10,                  //历史聊天记录最大长度
      MAX_LOTTERY_HERORANK_LIST_SIZE = 10,         //摩天轮英豪榜排行列表最大长度
      MAX_HUNDRED_SCENE_HISRESULT_LEN = 10,        //百人德州场历史结果最大长度
      MAX_CAR_BIGWINNERRANK_LIST_SIZE = 10,        //车行大富豪排行列表最大长度
      MAX_HUNDRED_BIGWINNER_RANK_LIST_SIZE = 10,   //百人德州场排行最大长度
      MAX_FRIEND_NUMBER = 100,                     //最大好友数
      MAX_STORE_SIZE = 100,                  //仓库最大格子数
      MAX_PROPERTY_RES_TYPE = 100,                 //最大的存储于属性的道具类型(res_type小于此值的道具，通过属性的方式同步，具体映射关系不定，res_type不等于属性ID)
      MAX_PLAYER_SIGNATURE_LEN = 100,              //个性签名最大长度
      MAX_HYPERLINK_COMMAND_LEN = 100,             //一条超链接地址最大长度
      MAX_FRIEND_REQUEST_NUMBER = 100,             //最大好友请求数量(是玩家被请求的最大数量)
      MAX_DOWNLOAD_PKG_DATA = 1000,                //单包所含最大资源长度
      MAX_DOWNLOAD_LINK_LEN = 1024,                //最大下载地址长度		
      MAX_SHARK_BETON_LEN = 12,                    //鲨鱼场下注列表最大长度
      MAX_MAIL_RECV_COUNT = 120,                   //收件箱最大邮件数
      MAX_ACCOUNT_LEN = 136,                 //帐号最大长度
      MAX_RANK_LIST_SIZE = 15,                     //排行列表最大长度
      MAX_REQUEST_RES_COUNT = 15,                  //最大下载的资源包数
      MAX_HUNDRED_BAKER_QUEUE_LEN = 15,            //百人德州庄家队列最大长度
      MAX_PHOTO_NUMBER = 18,                       //最大照片数量
      MAX_NEWMSGTAG_LIST_LEN = 20,                 //打点系统打点列表最大长度
      MAX_DRAWPIZEEHIS_LIST_LEN = 20,              //抽奖历史最大长度
      MAX_ERROR_MSG_LEN = 2048,              //错误消息最大长度		
      MAX_ALOGIN_HINTMSG_LEN = 2048,         //Alogin提示消息最大长度		
      MAX_ROLE_SELFDEF_PIC_SIZE = 20480,           //上传头像最大大小
      MAX_MOBILE_LEN = 21,                         //手机号最大长度
      MAX_VIEW_OBJ_COUNT = 25,                     //最大可见角色个数
      MAX_MAIL_CONTENT_LEN = 256,                  //邮件内容数组最大长度
      MAX_ROLE_SELFDEF_PHOTO_LEN = 256,            //自定义头像地址最大长度
      MAX_ROLE_COUNT = 3,                    //角色最大个数
      MAX_HYPEROBJ_NUM = 3,                  //最大超链接物件个数
      MAX_SLOTTABLE_STORE_MONEY = 3,               //桌台上最大存储的币
      MAX_HIS_MAGIC_EXPRESSIONS_NUM = 3,           //最多使用历史魔法表情
      MAX_BIN_LIST_LEN = 30,                       //最多同时获取的Bin的数量
      MAX_SEND_PACK_SIZE = 30,               //一次最多发送的物品数量
      MAX_HYPERLINK_LEN = 300,                     //一段完整的超链接文本长度，包含超链接地址在内
      MAX_ROLE_NAME_LEN = 32,                //名字最大长度
      MAX_MD5CODE_LEN = 33,                        //MD5码长度
      MAX_HUNDRED_BETON_LEN = 4,                   //百人德州场下注列表最大长度
      MAX_CHAT_MSG_LEN = 4096,                     //聊天信息的最大长度 
      MAX_MAIL_ATTACH_COUNT = 5,                   //邮件附件列表数组最大个数
      MAX_MAIL_SEND_COUNT = 50,                    //暂不支持:发件箱最大邮件数        
      MAX_MAIL_LIST_COUNT = 6,                     //邮件列表最大长度
      MAX_LOTTERY_SCENE_HISPRIZE_LEN = 6,          //摩天轮历史开奖最大长度
      MAX_CLASSICFRUIT_SCENE_HISPRIZE_LEN = 6,     //经典水果机历史开奖最大长度
      MAX_BAG_SIZE = 64,                     //背包最大格子数
      MAX_MAIL_TITLE_LEN = 64,                     //邮件标题数组最大长度
      MAX_ALOGIN_CAHNNLE_LEN = 64,                 //渠道号最大长度
      MAX_CAR_BETON_LEN = 8,                       //车行下注列表最大长度
      MAX_RECOMMED_LIST_SIZE = 8,                  //推荐列表最大长度
      MAX_MINIMALL_SIZE = 8,                 //随身仓库最大格子数
      MAX_ONLINERANK_LIST_SIZE = 8,                //在线列表最大长度
      MAX_CAR_SCENE_HISPRIZE_LEN = 8,              //车行历史开奖最大长度
      MAX_SHARK_SCENE_HISPRIZE_LEN = 8,            //鲨鱼场历史开奖最大长度
    }

    export enum FuncType {
      FUNC_TYPE_PLACEHOLD = 0,
      FUNC_TYPE_TASK = 0x1,               // 任务
      FUNC_TYPE_MAIL = 0x2,               // 邮件
      FUNC_TYPE_FRIEND_REQUEST = 0x4,     // 好友请求
      FUNC_TYPE_UNREAD_USER_MSG = 0x8,    // 未读用户消息
    }

    export enum EnItemStoreSpecialMask {
      ITEMSTORE_SPECIALMASK_NOSUPPLY = 0,       //第0个bit位为1表明缺货
      ITEMSTORE_SPECIALMASK_HOT = 1,       //第1个bit位为1表明热卖中
    }

    export enum HundredSceneStatus {
      HUNDRED_SCENE_STATUS_IDLE = 0,               //闲置
      HUNDRED_SCENE_STATUS_WAIT_BET = 1,           //等待下注
      HUNDRED_SCENE_STATUS_WILL_SHOW_CARDS = 2,    //即将开牌
      HUNDRED_SCENE_STATUS_SHOW_CARDS = 3,         //开牌
      HUNDRED_SCENE_STATUS_COUNT = 4,              //斗牛场状态数量
    }

    export enum DelMailType {
      DEL_MAIL_TYPE_PLACEHOLDER = 0,
      DEL_MAIL_TYPE_ONE = 1,             //删除一封邮件
      DEL_MAIL_TYPE_TRYBEST = 2,         //暂未支持:一键删除所有可以删除的邮件	    
    }

    export enum FollowType {
      FOLLOW_TYPE_FOLLOW = 0,             // 关注
      FOLLOW_TYPE_BEEN_FOLLOW = 1,        // 被关注
      FOLLOW_TYPE_FORBID_BEEN_FOLLOW = 2, // 禁止被关注
      FOLLOW_TYPE_COUNT = 3,
    }

    export enum BankerSwitchType {
      BANKER_SWITCHTYPE_NONE = 0,                          //无庄家相关信息需要展示
      BANKER_SWITCHTYPE_ONE_STILL = 1,                     //当前庄家继续上庄
      BANKER_SWITCHTYPE_NEWONE = 2,                        //新的庄家上庄
      BANKER_SWITCHTYPE_TO_NONE = 3,                       //当前庄家下庄
      BANKER_SWITCHTYPE_CHANGEONE = 4,                     //当前庄家下庄且新玩家上庄
    }

    export enum TaskStatus {
      TASK_STATUS_WORKING = 0,                 //未完成
      TASK_STATUS_FINISHED = 1,                //己完成
      TASK_STATUS_HASGOTPRIZE = 2,             //已领取
    }

    export enum OperatersTyp {
      OPERATERS_TYPE_UNKNOWN = 0,                   //未知
      OPERATERS_TYPE_MOBILE = 1,                    //移动
      OPERATERS_TYPE_UNICOM = 2,                    //联通
      OPERATERS_TYPE_TELECOM = 3,                   //电信
    }

    export enum ChatType {
      CHAT_TYPE_USER_EDIT = 0,               //自定义内容
      CHAT_TYPE_PREDEF = 1,                  //预定义聊天内容中的表情
      CHAT_TYPE_USER_VOICE = 2,              //自定义语音
      CHAT_TYPE_PREDEF_TXT = 3,              //预定义聊天内容中的文字
    }

    export enum InvestSceneItem {
      INVEST_SCENE_ITEM_X_0_Y_0 = 0,           //左上角下注项:对应私有区
      INVEST_SCENE_ITEM_X_0_Y_1 = 1,           //灾害险
      INVEST_SCENE_ITEM_X_2_Y_3 = 10,          
      INVEST_SCENE_ITEM_X_3_Y_0 = 11,          //公寓
      INVEST_SCENE_ITEM_X_3_Y_1 = 12,           
      INVEST_SCENE_ITEM_X_3_Y_2 = 13,           
      INVEST_SCENE_ITEM_X_3_Y_3 = 14,           
      INVEST_SCENE_ITEM_X_4_Y_0 = 15,          //平房
      INVEST_SCENE_ITEM_X_4_Y_1 = 16,           
      INVEST_SCENE_ITEM_X_4_Y_2 = 17,           
      INVEST_SCENE_ITEM_X_4_Y_3 = 18,  
      INVEST_SCENE_ITEM_COUNT = 19,          
      INVEST_SCENE_ITEM_X_0_Y_2 = 2,           //公共
      INVEST_SCENE_ITEM_X_1_Y_0 = 3,           //住宅
      INVEST_SCENE_ITEM_X_1_Y_1 = 4,           //商业
      INVEST_SCENE_ITEM_X_1_Y_2 = 5,           //娱乐
      INVEST_SCENE_ITEM_X_1_Y_3 = 6,           //便民
      INVEST_SCENE_ITEM_X_2_Y_0 = 7,           //别墅
      INVEST_SCENE_ITEM_X_2_Y_1 = 8,           
      INVEST_SCENE_ITEM_X_2_Y_2 = 9,           
    }

    export enum StockSceneItem {
      STOCK_SCENE_ITEM_LOWLINE_EXCEED = 0,       //对应于押注:超过最低线
      STOCK_SCENE_ITEM_LOWLINE_NOT_EXCEED = 1,       //对应于押注:不超过最低线 
      STOCK_SCENE_ITEM_TWODIGITSUM_5_6 = 10,      //对应于押注:最后两个数字和值为5或者6
      STOCK_SCENE_ITEM_TWODIGITSUM_7_8_9_10 = 11,      //对应于押注:最后两个数字和值为7或者8或者9或者10
      STOCK_SCENE_ITEM_TWODIGITSUM_11_12 = 12,      //对应于押注:最后两个数字和值为11或者12
      STOCK_SCENE_ITEM_TWODIGITSUM_13_14 = 13,      //对应于押注:最后两个数字和值为13或者14
      STOCK_SCENE_ITEM_TWODIGITSUM_15_16 = 14,      //对应于押注:最后两个数字和值为15或者16
      STOCK_SCENE_ITEM_TWODIGITSUM_17 = 15,      //对应于押注:最后两个数字和值为17
      STOCK_SCENE_ITEM_TWODIGITSUM_18 = 16,      //对应于押注:最后两个数字和值为18
      STOCK_SCENE_ITEM_FINALDIGITVAL_0 = 17,      //对应于押注:最后一个数字0
      STOCK_SCENE_ITEM_FINALDIGITVAL_1 = 18,      //对应于押注:最后一个数字1
      STOCK_SCENE_ITEM_FINALDIGITVAL_2 = 19,      //对应于押注:最后一个数字2
      STOCK_SCENE_ITEM_MIDLINE_EXCEED = 2,       //对应于押注:超过中线
      STOCK_SCENE_ITEM_FINALDIGITVAL_3 = 20,      //对应于押注:最后一个数字3
      STOCK_SCENE_ITEM_FINALDIGITVAL_4 = 21,      //对应于押注:最后一个数字4
      STOCK_SCENE_ITEM_FINALDIGITVAL_5 = 22,      //对应于押注:最后一个数字5
      STOCK_SCENE_ITEM_FINALDIGITVAL_6 = 23,      //对应于押注:最后一个数字6
      STOCK_SCENE_ITEM_FINALDIGITVAL_7 = 24,      //对应于押注:最后一个数字7
      STOCK_SCENE_ITEM_FINALDIGITVAL_8 = 25,      //对应于押注:最后一个数字8
      STOCK_SCENE_ITEM_FINALDIGITVAL_9 = 26,      //对应于押注:最后一个数字9
      STOCK_SCENE_ITEM_COUNT = 27,          
      STOCK_SCENE_ITEM_MIDLINE_NOT_EXCEED = 3,       //对应于押注:不超过中线         
      STOCK_SCENE_ITEM_HIGHLINE_EXCEED = 4,       //对应于押注:超过最高线
      STOCK_SCENE_ITEM_HIGHLINE_NOT_EXCEED = 5,       //对应于押注:不超过最高线     
      STOCK_SCENE_ITEM_FINALDIGITTYPE_UNEVEN = 6,       //对应于押注:最后一个数字单数
      STOCK_SCENE_ITEM_FINALDIGITTYPE_EVEN = 7,       //对应于押注:最后一个数字双数      
      STOCK_SCENE_ITEM_TWODIGITSUM_1_2 = 8,       //对应于押注:最后两个数字和值为1或者2
      STOCK_SCENE_ITEM_TWODIGITSUM_3_4 = 9,       //对应于押注:最后两个数字和值为3或者4
    }

    export enum ZodiacSceneItem {
      ZODIAC_SCENE_ITEM_0_0_SHUIPING = 0,       //对应最外圈的水瓶(对应1月),依次往下是按星座的配置标准顺序
      ZODIAC_SCENE_ITEM_0_1 = 1,       //双鱼          
      ZODIAC_SCENE_ITEM_0_10 = 10,                 
      ZODIAC_SCENE_ITEM_0_11 = 11,      //摩羯               
      ZODIAC_SCENE_ITEM_1_0_FENG = 12,      //风
      ZODIAC_SCENE_ITEM_1_1 = 13,      //火
      ZODIAC_SCENE_ITEM_1_2 = 14,      //水           
      ZODIAC_SCENE_ITEM_1_3 = 15,      //土           
      ZODIAC_SCENE_ITEM_1_4 = 16,      //雷           
      ZODIAC_SCENE_ITEM_2_0_TAIYANG = 17,      //太阳
      ZODIAC_SCENE_ITEM_2_1_YUELIANG = 18,      //月亮         
      ZODIAC_SCENE_ITEM_3_0_BUNCH2 = 19,      //串2
      ZODIAC_SCENE_ITEM_0_2 = 2,                 
      ZODIAC_SCENE_ITEM_3_1_BUNCH3 = 20,      //串3       
      ZODIAC_SCENE_ITEM_COUNT = 21,          
      ZODIAC_SCENE_ITEM_0_3 = 3,                 
      ZODIAC_SCENE_ITEM_0_4 = 4,                 
      ZODIAC_SCENE_ITEM_0_5 = 5,                 
      ZODIAC_SCENE_ITEM_0_6 = 6,                 
      ZODIAC_SCENE_ITEM_0_7 = 7,                 
      ZODIAC_SCENE_ITEM_0_8 = 8,                 
      ZODIAC_SCENE_ITEM_0_9 = 9,                 
    }

    export enum LifeAttrType {
      LIFEATT_BEGIN = 0,                      //开始,仅占位,没有实际使用
      LIFEATT_LEVEL = 1,                      //人物等级
      LIFEATT_NEWGUIDE_STAT = 10,             //新手引导状态，对应NewerGuideStat枚举
      LIFEATT_VIPEXP = 11,                    //VIP当前经验
      LIFEATT_MAXVIPEXP = 12,                 //VIP升级所需经验
      LIFEATT_LASHTCHARGETIME = 13,           //上次充值时间,为0则从来没有充过
      LIFEATT_CHARGE_ACT_BEGINTIME = 14,      //限时充值活动上次倒计时开始时间,当为0时需要通知倒计时开始,否则不用
      LIFEATT_CHARGE_ACT_LEFTTIME = 15,       //限时充值活动上次倒计时剩余秒数,当不为0时显示倒计时,该值仅当收到金币不足的错误码下行后才是正确值
      LIFEATT_ROLE_BORNID = 17,               //角色数字类型的出生ID
      LIFEATT_GOLD = 2,                       //金币
      LIFEATT_TODAY_CHARGE_TOTAL = 22,        //本日己充值钱数
      LIFEATT_LAST_HAPPYWAYTYPE = 24,
      LIFEATT_CHARM = 25,                     //魅力值
      LIFEATT_MAXVAL = 255,                   //最大值
      LIFEATT_ALL_GAME_COUNT = 26,            //总牌局数
      LIFEATT_WIN_GAME_COUNT = 27,            //赢牌次数
      LIFEATT_MAX_WIN_CHIPS = 28,             //最多赢取筹码数
      LIFEATT_JOIN_IN_GAME_COUNT = 29,        //入局次数(主动下注的牌局数)
      LIFEATT_SEX = 3,                        //性别
      LIFEATT_SHOW_CARD_COUNT = 30,           //摊牌次数
      LIFEATT_BEST_CARD_TYPE = 31,            //最佳牌型
      LIFEATT_BEST_CARDS = 32,                //最佳牌(按字节记录,每字节记录一张牌,从低到高依次记录)
      LIFEATT_AUTO_BUY_CHIPS = 33,            //筹码不足时自动补充到最大
      LIFEATT_DZ_WIN_CHIPS = 34,              //德州输赢，正为赢，负为输
      LIFEATT_ALLOW_BE_INVITED_TYPE = 35,     //允许被邀请的类型，对应AllowBeInvitedType枚举
      LIFEATT_TRUMPET_NUM = 36,               //小喇叭数量
      LIFEATT_LAST_MAXVIPEXP = 37,            //上一级VIP升级所需经验
      LIFEATT_LAST_BUY_VIP_CARD_TIME = 38,    //上次买VIP卡的时间
      LIFEATT_PLAYER_TAGS = 39,               //玩家标记，对应 PlayerTags 枚举
      LIFEATT_DIAMOND = 4,                    //钻石
      LIFEATT_TODAY_RELIEF_COUNT = 40,        //今日救济金次数
      LIFEATT_CASHBOX_GOLD = 41,              //小金库金币
      LIFEATT_MAGIC_EXPRESSION_TO_ALL = 42,   //发送魔法表情到全体
      LIFEATT_EXP = 5,                        //经验
      LIFEATT_HEADPHOTO = 6,                  //头像
      LIFEATT_VIPLEVEL = 7,                   //VIP等级
      LIFEATT_MAXEXP = 9,                     //升级所需经验
    }

    export enum RankRefreshType {
      RANK_REFRESHTYPE_NONE = 0,                               //不会定期刷新
      RANK_REFRESHTYPE_WEEK = 1,                               //按周刷新,目前暂时不支持
      RANK_REFRESHTYPE_DAY = 2,                                //按天刷新
    }

    export enum FriendType {
      FRIEND_TYPE_REQ_FRIEND = 0,             // 好友申请
      FRIEND_TYPE_REFUSED_REQ_FRIEND = 1,     // 被拒绝的好友申请
      FRIEND_TYPE_FRIEND = 2,                 // 好友	
    }

    export enum CommodityState {
      COMMODITY_STATE_NONE = 0,
      COMMODITY_STATE_SHELVE = 1,     // 上架
      COMMODITY_STATE_POPULAR = 2,    // 火爆
      COMMODITY_STATE_UNSHELVE = 3,   // 下架(下架商品服务器不会发给客户端)
      COMMODITY_STATE_MAX = 4,
    }

    export enum MobileBindType {
      MOBILE_BIND_PLACEHOLDER = 0,
      MOBILE_BIND_CNA_DIRECT_DO = 1,                          //可以直接进行绑定
      MOBILE_BIND_MOBILE_ALREADY_BIND = 2,                    //当前手机号已经绑定了帐号,接下来需要确认帐号迁移	    
    }

    export enum BattleResultType {
      BATTLE_RESULT_TIE = 0,                   // 平局
      BATTLE_RESULT_RED_WIN = 1,               // 红方胜利
      BATTLE_RESULT_BLUE_WIN = 2,              // 蓝方胜利
    }

    export enum ChangeWay {
      CHANGE_WAY_INCREASE = 0,         // 增加
      CHANGE_WAY_DECREASE = 1,         // 减少
      CHANGE_WAY_FULL = 2,             // 全量数据，直接覆盖
    }

    export enum GetMailAttachType {
      GET_MAILATTACH_PLACEHOLDER = 0,
      GET_MAILATTACH_TYPE_ONE = 1,       //获取一封邮件的邮件
      GET_MAILATTACH_TYPE_TRYBEST = 2,   //暂未支持:一键获取所有可以获取附件的邮件
    }

    export enum EnFootBallMatchStatus {
      FOOTBALL_MATCHSTAT_NOTBEGIN = 0,       //未开战
      FOOTBALL_MATCHSTAT_MATCHING = 1,       //比赛中
      FOOTBALL_MATCHSTAT_END = 2,       //己结束
    }

    export enum StockSceneBetZoneClass {
      STOCK_SCENE_BETZONE_CLASS_LINE = 0,        //对应线相关的压注区(共享一个压注时间)
      STOCK_SCENE_BETZONE_CLASS_DIGIT = 1,        //对应数值相关的压注区(共享另一个压注时间)
      STOCK_SCENE_BETZONE_CLASS_COUNT = 2,  
    }

    export enum RoleOfflineReason {
      ROLE_OFFLINE_REASON_PLACEHOLDER = 0,
      TOO_LONG_WAIT = 1,                      //超时
      VERSION_NOT_MATCH = 10,                 //版本不匹配
      PLAYER_SERVER_STOP = 11,                //服务器关服
      PLAYER_AUTH_FAILED = 12,                //输入验证失败
      MAIN_TASK_NOTMATCH = 13,                //客户端主线任务状态与服务器不一致
      BIND_REPLACE_SUCC = 14,                 //绑定手机成功,请重新登录
      DUPLICATE_ACCOUNT = 2,                  //角色顶号
      BAN_ACCOUNT = 3,                        //角色封号
      NET_PROBLEM = 4,                        //网络不稳定
      ROLE_LEAVE = 5,                         //角色非正常离开
      SERVER_NOT_OPEN = 6,                    //服务器未开放
      SERVER_REACH_LIMIT = 7,                 //服务器达到人数限制
      MOVE_TOO_FAST = 8,                      //角色移动过快
      REACH_FREQUENCY_LIMIT = 9,              //上行包超过频率
    }

    export enum MailState {
      MAIL_STAT_PLACEHOLDER = 0,
      MAIL_STAT_HASREAD = 0x1,         //是否已读
      MAIL_STAT_HASATTACH = 0x2,       //是否有附件
      MAIL_STAT_DELETED = 0x4,         //已删除（主要用于客户端领取附件或修改状态的响应数据，表明可以将该邮件删除了）
      MAIL_STAT_HASGETATTACH = 0x8,    //已领取附件
    }

    export enum EnCowboyTableStabus {
      COWBOY_TABLE_STATUS_DAY = 0,
      COWBOY_TABLE_STATUS_NIGHT = 1,
    }

    export enum LoginRet {
      LOGINRESULT_SUCCESS = 0,                    //登录成功
      LOGINRESULT_MUSTUPDATE = 1,                 //强制升级
      LOGINRESULT_COMMFAIL = 10,                  //通用登录失败错误码，建议描述写得模糊点
      LOGINRESULT_MUST_CREATE_ROLE = 11,          //必须先创建角色
      LOGINRESULT_SUGGESTUPDATE = 2,              //建议升级
      LOGINRESULT_ROLEONLINE = 3,                 //角色在线
      LOGINRESULT_FASTLOGINFAIL = 4,              //快速登录失败
      LOGINRESULT_SERVERSTOP = 5,                 //服务器正在停服
      LOGINRESULT_CANNOT_TASTE = 6,               //不允许进入体验服
      LOGINRESULT_CANNOT_ORDIN = 7,               //不允许进入非体验服		
      LOGINRESULT_TOUCHMAXACCOUNT = 8,            //服务器己满
      LOGINRESULT_NOTINWHITELIST = 9,             //不在白名单,无资格进入服务器
    }

    export enum EnItemStoreItemStat {
      ITEMSTORE_ITEMSTAT_NORMAL = 0,       //正常售卖
      ITEMSTORE_ITEMSTAT_OFF = 1,       //己下架
    }

    export enum DzCardType {
      DZ_CARD_TYPE_None = 0,
      DZ_CARD_TYPE_GaoPai = 1,                // 高排
      DZ_CARD_TYPE_HuangJiaTongHuaShun = 10,  // 皇家同花顺
      DZ_CARD_TYPE_Count = 11,
      DZ_CARD_TYPE_DuiZi1 = 2,                // 一对
      DZ_CARD_TYPE_DuiZi2 = 3,                // 两对
      DZ_CARD_TYPE_SanTiao = 4,               // 三条
      DZ_CARD_TYPE_ShunZi = 5,                // 顺子
      DZ_CARD_TYPE_TongHua = 6,               // 同花
      DZ_CARD_TYPE_HuLu = 7,                  // 葫芦
      DZ_CARD_TYPE_SiTiao = 8,                // 四条
      DZ_CARD_TYPE_TongHuaShun = 9,           // 同花顺
    }

    export enum EnItemStoreBuyState {
      ITEMSTORE_BUYSTAT_WAITING = 0,       //等待发奖
      ITEMSTORE_BUYSTAT_COMPLETED = 1,       //发奖完成
      ITEMSTORE_BUYSTAT_DELIVERINFO = 2,       //等待玩家填写发货信息
    }

    export enum MoneyType {
      MONEY_TYPE_PLACEHOLDER = 0,
      MONEY_TYPE_GOLD = 1,                    //金豆
      MONEY_TYPE_DIAMOND = 2,                 //钻石
    }

    export enum Sex {
      SEX_NONE = 0,                           //无性别
      SEX_MALE = 1,                           //男
      SEX_FEMALE = 2,                         //女
      SEX_SECRET = 3,                         //保密
    }

    export enum ChatChannel {
      CHAT_CHANNEL_PLACEHOLDER = 0,
      CHAT_CHANNEL_WORLD = 1,                      //暂时没用:若后续有聊天系统为其中的全世界频道
      CHAT_CHANNEL_ROOM = 2,                       //显示位置:房间内聊天窗口
      CHAT_CHANNEL_SYSTEM = 3,                     //显示位置:跑马灯滚动栏
      CHAT_CHANNEL_LED = 4,                        //显示位置:跑马灯滚动栏
      CHAT_CHANNEL_DELAY_SYSTEM = 5,               //暂时没用:特殊系统消息当转轮在转时需要延迟显示
      CHAT_CHANNEL_SYSTEM_ROOM = 6,                //显示位置:聊天窗口和跑马灯都显示
      CHAT_CHANNEL_TRUMPET = 7,                    //显示位置:按照小喇叭显示(聊天窗口和跑马灯都显示)
      CHAT_CHANNEL_BARRAGE = 8,                    //显示位置:弹幕
    }

    export enum ZodiacSceneGroup {
      ZODIAC_SCENE_ITEM_GROUP_0 = 0,       //对应转盘最外圈:即包含白羊、金牛等的圈
      ZODIAC_SCENE_ITEM_GROUP_1 = 1,       //对应转盘中间圈:即包含风、水等的圈
      ZODIAC_SCENE_ITEM_GROUP_2 = 2,       //对应转盘最里圈:即包含太阳、月亮等的圈
      ZODIAC_SCENE_ITEM_GROUP_BUNCH = 3,       //对应转盘虚拟圈:即串2，串3等
      ZODIAC_SCENE_ITEM_GROUP_COUNT = 4,  
    }

    export enum BattleBetType {
      BATTLE_BET_TYPE_TIE = 0,                                  // 平
      BATTLE_BET_TYPE_RED_WIN = 1,                              // 红方胜
      BATTLE_BET_TYPE_ANY_HAND_TongHua = 10,                    // 任一手牌：同花
      BATTLE_BET_TYPE_ANY_HAND_LianPai = 11,                    // 任一手牌：连牌
      BATTLE_BET_TYPE_ANY_HAND_TongHua_LianPai = 12,            // 任一手牌：同花连牌
      BATTLE_BET_TYPE_ANY_HAND_YiDui = 13,                      // 任一手牌：对子
      BATTLE_BET_TYPE_ANY_HAND_YiDui_A = 14,                    // 任一手牌：对A
      BATTLE_BET_TYPE_BLUE_WIN = 2,                             // 蓝方胜
      BATTLE_BET_TYPE_WIN_FINAL_GaoPai_YiDui = 30,              // 赢家牌型：高排、一对
      BATTLE_BET_TYPE_WIN_FINAL_LiangDui = 31,                  // 赢家牌型：两对
      BATTLE_BET_TYPE_WIN_FINAL_SanTiao_ShunZi_TongHua = 32,    // 赢家牌型：三条、顺子、同花
      BATTLE_BET_TYPE_WIN_FINAL_HuLu = 33,                      // 赢家牌型：葫芦
      BATTLE_BET_TYPE_WIN_FINAL_SiTiao_TongHuaShun = 34,        // 赢家牌型：四条、同花顺
      BATTLE_BET_TYPE_MAX = 40,
    }

    export enum HundredActorType {
      HUNDRED_ACTOR_HEI = 0,               // 黑
      HUNDRED_ACTOR_HONG = 1,              // 红
      HUNDRED_ACTOR_MEI = 2,               // 梅
      HUNDRED_ACTOR_FANG = 3,              // 方
      HUNDRED_ACTOR_BANKER = 4,            // 庄
      HUNDRED_ACTOR_COUNT = 5,             // 角色数量
    }

    export enum EnFootBallPlayerBetStatus {
      FOOTBALL_PLAYERBET_STAT_EMPTY = 0,     //空类型仅占位
      FOOTBALL_PLAYERBET_STAT_WILLAWARD = 1,     //等待开奖
      FOOTBALL_PLAYERBET_STAT_HASCLEAR = 2,     //己清盘
      FOOTBALL_PLAYERBET_STAT_HASCANCEL = 3,     //己取消
    }

}