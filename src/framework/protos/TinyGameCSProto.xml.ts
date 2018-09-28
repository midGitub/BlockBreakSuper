module csproto.CSProto {

	import EncodeBuffer = csprotos.EncodeBuffer
	import DecodeBuffer = csprotos.DecodeBuffer
	import message = csprotos.message

	//command export
	export enum command {
		CMD_ERROR = 101, // 通用提示协议 
		CMD_TEST_ECHO = 102, // 测试命令字echo 
		CMD_GET_BIN_MD5LIST = 103, // 客户端资源md5列表 
		CMD_REQUEST_RES = 104, // 客户端资源请求 
		CMD_GM = 105, // 特殊gm请求 
		CMD_NOTICE_CMDFAIL = 106, // 额外通知某个命令字执行失败 
		CMD_GOLD_NOTENOUGH_ERROR = 107, // 金币不足提示协议 
		CMD_COMM_HYPER_MSGBOX = 108, // 尚未实现:带按钮的通用提示框 
		CMD_CLICK_HYPER_NOTICE = 109, // 尚未实现:点击了超链接后的上行 
		CMD_NOTIFY_BULLETIN = 110, // 通知客户端尝试进行公告弹出暂无对应body 
		CMD_CLT_FIN_WRAP = 111, // 客户端已经完全切换到某个场景后上行通知服务器 
		CMD_ALOGIN = 200, // 账户登录 
		CMD_ALOGOUT = 201, // 账户登出请求 
		CMD_PING = 202, // 心跳包 
		CMD_KICKOFF_ACCOUNT = 203, // 服务器主动踢账户下线 
		CMD_WARP = 204, // 通知帐户登录后所在的场景 
		CMD_NTF_ENTERVIEW = 205, // 广播消息,通知周围的人角色进入桌台 
		CMD_NTF_LEAVEVIEW = 206, // 广播消息,通知周围的人角色离开桌台 
		CMD_SCENE_HISTORY_CHATMSG = 207, // 场景中的历史聊天记录 
		CMD_SMART_BEGIN = 208, // 场景中的快速开始按钮 
		CMD_NOTIFY_TOPWINNER = 209, // 通知在某个场景中的最大赢家信息 
		CMD_ROLE_MISC = 300, // 角色混杂数据 
		CMD_ROLE_FIN = 301, // 登录下发的所有角色信息结束 
		CMD_ATT_CHANGE = 302, // 角色属性变化通知 
		CMD_CAN_BEGIN_SLOT = 403, // 通知成功进入某个机台,可以开始游戏 
		CMD_DO_SLOTROUND_BEGIN = 404, // 开始执行一转 
		CMD_DO_SLOTROUND_END = 405, // 结束执行一转 
		CMD_ADD_SLOTMONEY = 406, // 主动给桌台增加币,增加数量为当前转需要的币,最多增加到3个 
		CMD_NOTIFY_SLOTTABDATA = 407, // 通知刷新桌台某些数据,目前主要用于通知桌台币的改变 
		CMD_TASK_LIST = 500, // 当前任务列表 
		CMD_GET_TASK_AWARD = 501, // 领取任务奖励 
		CMD_LOTTERY_BET_ON = 600, // 玩家下注 
		CMD_LOTTERY_ENTER = 601, // 进入摩天轮 
		CMD_LOTTERY_REFRESHDATA = 602, // 投注过程中刷新数据 
		CMD_LOTTERY_ROUND_END = 603, // 通知摩天轮转轮结果 
		CMD_LOTTERY_HERORANK = 604, // 摩天轮英豪榜 
		CMD_SCENE_ONLINELIST_PAGE = 605, // 场景中的在线帐号列表 
		CMD_LOTTERY_REFRESH_SELF_BET = 606, // 当上行的下注请求不能被正确处理时会下行该条协议刷新为真实的下注数据 
		CMD_LOTTERY_HISTORY_CHATMSG = 607, // 摩天轮聊天历史数据 
		CMD_CLASSICFRUIT_BET_ON = 700, // 经典水果机玩家下注 
		CMD_CLASSICFRUIT_ENTERDATA = 701, // 经典水果机进入时的相关数据 
		CMD_CLASSICFRUIT_REFRESHDATA = 702, // 经典水果机投注过程中刷新数据 
		CMD_CLASSICFRUIT_ROUND_END = 703, // 通知经典水果机转轮结果 
		CMD_CLASSICFRUIT_REFRESH_SELF_BET = 704, // 经典水果机投注中当上行的下注请求不能被正确处理时会下行该条协议刷新为真实的下注数据 
		CMD_CLASSICFRUIT_HEARTBEAT = 705, // 经典水果机私有心跳当在该场景中且为等待上庄或者己上庄状态时建议5秒发一次 
		CMD_CLASSICFRUIT_SIGNUP_BANKER = 706, // 申请上庄 
		CMD_CLASSICFRUIT_QUIT_BANKER = 707, // 申请提前下庄当还在队列中的时候也会被踢出队列 
		CMD_CLASSICFRUIT_UPDATE_BANKER_STAT = 708, // 通知更新自身的Banker状态 
		CMD_CLASSICFRUIT_CURBANKERLIST = 709, // 当前庄家列表进入场景及变化时会下发 
		CMD_CLASSICFRUIT_UPDATE_CURBANKER = 710, // 更新当前场子中的庄家信息 
		CMD_SHARK_BET_ON = 800, // 鲨鱼玩家下注 
		CMD_SHARK_ENTERDATA = 801, // 鲨鱼进入时的相关数据 
		CMD_SHARK_REFRESHDATA = 802, // 鲨鱼投注过程中刷新数据 
		CMD_SHARK_ROUND_END = 803, // 通知鲨鱼转轮结果 
		CMD_SHARK_REFRESH_SELF_BET = 804, // 鲨鱼投注中当上行的下注请求不能被正确处理时会下行该条协议刷新为真实的下注数据 
		CMD_SHARK_HEARTBEAT = 805, // 鲨鱼私有心跳当在该场景中且为等待上庄或者己上庄状态时建议5秒发一次 
		CMD_SHARK_SIGNUP_BANKER = 806, // 鲨鱼申请上庄 
		CMD_SHARK_QUIT_BANKER = 807, // 鲨鱼申请提前下庄当还在队列中的时候也会被踢出队列 
		CMD_SHARK_UPDATE_BANKER_STAT = 808, // 鲨鱼通知更新自身的Banker状态 
		CMD_SHARK_CURBANKERLIST = 809, // 鲨鱼当前庄家列表进入场景及变化时会下发 
		CMD_SHARK_UPDATE_CURBANKER = 810, // 鲨鱼更新当前场子中的庄家信息 
		CMD_SHARK_BANKER_SETPRIZE = 811, // 鲨鱼庄家设置下转结果 
		CMD_GET_CONLOGIN_GIFT = 901, // 领取连续登录礼包 
		CMD_GET_ONLINETIME_GIFT = 902, // 领取在线时间礼包 
		CMD_RANK_QUERYPAGE = 903, // 查询排行榜分页 
		CMD_CHAT = 904, // 消息频道聊天,包括系统频道 
		CMD_CONLOGIN_GIFT = 905, // 可领取的连续登录礼包 
		CMD_SKIP_NEWERGUIDE = 906, // 跳过新手引导 
		CMD_NOTIFY_CHARGE_SUCC = 907, // 客户端通知服务器充值成功,目前仅用于LOG对帐 
		CMD_CHANGE_HEADPHOTO = 908, // 改变当前头像 
		CMD_NOTIFY_THROWUP_GOLD = 909, // 该协议暂时己废弃,调整为客户端自行处理,通知表演桌台吐币 
		CMD_NOTIFY_CHARGESUCC = 910, // 服务器通知客户端充值成功尼玛居然和之前的CMD名字取得这么像 
		CMD_NOTIFY_EXTCHARGE_TIMER = 911, // 通知开始充值额外奖励优惠的倒计时 
		CMD_NEWMSG_TAG = 912, // 上行清除打点系统标记,下行则是通知当前打点列表 
		CMD_GET_RANKAWARD = 913, // 领取排行奖励 
		CMD_PRIZEDRAW_CURINFO = 915, // 登录后服务器主动下发的当前抽奖相关状况 
		CMD_PLAY_PRIZEDRAW = 916, // 进行抽奖 
		CMD_QUERY_MONEYTREE = 917, // 进入相应界面时查询摇钱树信息 
		CMD_GATHER_MONEYTREE = 918, // 收获摇钱树上的金币 
		CMD_MODIFY_NICK = 919, // 修改昵称but目前后台还没有判断唯一性 
		CMD_MODIFY_SELFPROP = 920, // 修改性别等属性 
		CMD_UPLOAD_HEADPHOTO = 921, // 上传头像 
		CMD_ADV_ALIPAY_GIFTPKG = 922, // 通知客户端展示支付宝礼包 
		CMD_NOTIFY_BEGIN_CHARGE = 923, // 通知服务器在某个场景发起的支付请求 
		CMD_NOTIFY_UPT_EXTAPP_TIPS = 924, // 通知退出APP时提示内容 
		CMD_REFRESH_CUR_ONLINETIME_GIFT = 925, // 刷新当前在线时间礼包相关状态数据 
		CMD_RECOMMEND_QUERYPAGE = 926, // 摘取推荐列表 
		CMD_GET_ME_RECOMM_OTHER_GIFT = 927, // 领取因为我推荐了别人进入游戏获得的金币礼包 
		CMD_GET_OTHER_RECOMM_ME_GIFT = 928, // 领取因为别人推荐了我进入游戏获得的金币礼包 
		CMD_APPSTORE_REPUTATION_STATE = 929, // 通知客户端在AppStore写评价的状态 
		CMD_WRITE_APPSTORE_REPUTATION = 930, // 在AppStore上给了评价 
		CMD_NOTIFY_APPSTORE_REPUTATION = 931, // 提示用户在AppStore上写好评 
		CMD_GET_APPSTORE_REPUTATION_GIFT = 932, // 领取AppStore好评奖励 
		CMD_HIDDEN_CHARGE_PLATFORM = 933, // 隐藏充值平台 
		CMD_IS_NEWROLE_REGISTER = 934, // 通知该次登录是新用户注册 
		CMD_CAR_BET_ON = 1000, // 车行玩家下注 
		CMD_CAR_ENTERDATA = 1001, // 车行进入时的相关数据 
		CMD_CAR_REFRESHDATA = 1002, // 车行投注过程中刷新数据 
		CMD_CAR_ROUND_END = 1003, // 车行鲨鱼转轮结果 
		CMD_CAR_REFRESH_SELF_BET = 1004, // 车行投注中当上行的下注请求不能被正确处理时会下行该条协议刷新为真实的下注数据 
		CMD_CAR_HEARTBEAT = 1005, // 车行私有心跳当在该场景中且为等待上庄或者己上庄状态时建议5秒发一次 
		CMD_CAR_SIGNUP_BANKER = 1006, // 车行申请上庄 
		CMD_CAR_QUIT_BANKER = 1007, // 车行申请提前下庄当还在队列中的时候也会被踢出队列 
		CMD_CAR_UPDATE_BANKER_STAT = 1008, // 车行通知更新自身的Banker状态 
		CMD_CAR_CURBANKERLIST = 1009, // 车行当前庄家列表进入场景及变化时会下发 
		CMD_CAR_UPDATE_CURBANKER = 1010, // 车行更新当前场子中的庄家信息 
		CMD_CAR_BANKER_SETPRIZE = 1011, // 车行庄家设置下转结果 
		CMD_CAR_BIGWINNERRANK = 1012, // 车行大赢家榜 
		CMD_GET_MAILLIST = 1101, // 获取邮件列表信息 
		CMD_GET_MAILATTACH = 1102, // 获取邮件的附件 
		CMD_MAILSTAT_CHANGE = 1103, // 通知服务器邮件变为己读等等状态的变更 
		CMD_REQ_BIND_SMSCODE = 1201, // 申请获取绑定手机的验证码 
		CMD_CONFIRM_BIND_SMSCODE = 1202, // 输入验证绑定手机的验证码 
		CMD_DO_UNBIND_CURMOBILE = 1203, // 解绑当前手机绑定的手机号码 
		CMD_DO_BIND_MOBILE = 1204, // 执行操作绑定输入的手机号码 
		CMD_DO_REPLACE_ACCOUNT = 1205, // 执行帐号迁移操作 
		CMD_VIVO_GEN_ORDER = 1301, // VIVO生成订单 
		CMD_NOTIFY_ROUNDINDEXERR = 1302, // 上报因roundid不一致被踢出场次的数据 
		CMD_CHECK_MALLBUY = 1303, // 支付前检查是否能进行该支付 
		CMD_UNICOM_GEN_ORDER = 1304, // 联通生成内部支付订单 
		CMD_LENOVO_GEN_ORDER = 1305, // 联想生成内部支付订单 
		CMD_COMM_MALL_GEN_ORDER = 1306, // 通用生成内部支付订单协议目前从海马开始接入 
		CMD_ZJH_ENTERDATA = 1500, // 扎金花进入时的相关数据 
		CMD_ZJH_BEGIN_ONEGAME = 1501, // 扎金花房间通知一局开始发牌 
		CMD_ZJH_CHANGE_ROOM = 1502, // 扎金花更换房间 
		CMD_ZJH_UPT_PLAYER_DATA = 1503, // 扎金花服务器通知客户端桌台上某个玩家状态等数据变更 
		CMD_ZJH_UPT_TABLE_DATA = 1504, // 扎金花服务器通知客户端桌台数据刷新 
		CMD_ZJH_END_ONEGAME = 1505, // 扎金花服务器通知客户端一局比赛结束 
		CMD_ZJH_PLAYER_ALLDATA = 1506, // 扎金花进入时的客户端玩家全量数据 
		CMD_ZJH_PLAYER_FIRSTROUNDINFO = 1507, // 该协议暂时废弃:扎金花某玩家在桌上玩的第一局相关信息通知 
		CMD_ZJH_DO_READY = 1510, // 扎金花玩家准备 
		CMD_ZJH_DO_BET = 1511, // 扎金花玩家跟注或加注 
		CMD_ZJH_DO_DISCARD = 1513, // 扎金花玩家弃牌 
		CMD_ZJH_DO_COMPARE = 1514, // 扎金花玩家比牌 
		CMD_ZJH_DO_FORBIDCOMPARE = 1515, // 扎金花玩家禁比 
		CMD_ZJH_DO_DOUBLE = 1516, // 扎金花玩家加倍 
		CMD_ZJH_DO_VIEWCARD = 1517, // 扎金花玩家看牌 
		CMD_ZJH_DO_KICKPLAYER = 1518, // 扎金花踢人 
		CMD_PAYCENTER_GEN_ORDER = 1601, // 游戏内自有支付中心生成内部CP支付订单协议目前仅支持部分支付平台方式 
		CMD_PAYCENTER_NOTIFY_SERVER_SUCC = 1602, // 客户端收到第三方支付中心支付成功的回调后立刻通知到服务器以便对帐 
		CMD_PAYCENTER_NOTIFY_CLIENT_SUCC = 1603, // 服务器收到第三方支付中心支付成功并发货后通知到客户端 
		CMD_PAYCENTER_PREPAID_CARD_DOPAY = 1604, // 预付卡填入卡号密码后确认支付 
		CMD_GET_CONLOGIN_GIFT_NEWVERSION = 1610, // 新版本的领取连续登录礼包 
		CMD_SHANXI_POINTS_EXCHANGE = 1611, // 陕西积分活动兑换 
		CMD_BULL_ENTERDATA = 1701, // 进入牛牛场的数据 
		CMD_BULL_ROUND_END = 1702, // 通知牛牛转轮结果 
		CMD_BULL_BET_ON = 1703, // 牛牛玩家下注 
		CMD_BULL_SIGNUP_BANKER = 1704, // 牛牛玩家申请上庄 
		CMD_BULL_QUIT_BANKER = 1705, // 牛牛玩家申请提前下庄 
		CMD_BULL_CURBANKERLIST = 1706, // 牛牛场当前庄家列表 
		CMD_BULL_HEARTBEAT = 1707, // 牛牛场庄家心跳 
		CMD_BULL_REFRESHDATA = 1708, // 牛牛场数据刷新 
		CMD_BULL_UPDATE_CURBANKER = 1709, // 牛牛更新当前场子中的庄家信息 
		CMD_BULL_BIGWINNERRANK = 1710, // 牛牛行大赢家榜 
		CMD_BULL_UPDATE_BANKER_STAT = 1711, // 牛牛通知更新自身的Banker状态 
		CMD_BULL_ROUND_START = 1712, // 牛牛场一轮开始 
		CMD_BULL_REFRESH_SELF_BET = 1713, // 牛牛投注中当上行的下注请求不能被正确处理时会下行该条协议刷新为真实的下注数据 
		CMD_APPSTORE_PAYRECEPIT_VERIFY = 1801, // 未完成苹果支付成功后返回的支付订单数据较验 
		CMD_GOLDMINER_ENTERDATA = 1901, // 黄金矿工进入时的相关数据 
		CMD_GOLDMINER_GAME_AGAIN = 1902, // 黄金矿工再来新的一局 
		CMD_GOLDMINER_ONEGRAB_RET = 1903, // 黄金矿工上报一次抓取的结果 
		CMD_CHINESEPHRASE_DO_GAME = 1910, // 成语任务开始 
		CMD_CHINESEPHRASE_REFRESH = 1911, // 成语任务刷新成语 
		CMD_CHINESEPHRASE_FINALCOMMIT = 1912, // 成语任务上报选择结果 
		CMD_CHINESEPHRASE_PICNOTFOUND = 1913, // 成语任务客户端发现某个图片不存在时上行通知服务器 
		CMD_SINASHOW_MONEY_EXCHANGE_IN_OUT = 1920, // 新浪秀场货币兑入为游戏币或者将游戏币兑出为新浪秀场货币 
		CMD_LABA_ENTERDATA = 2000, // 拉霸进入时的相关数据 
		CMD_LABA_PLAY_ONE_ROUND = 2001, // 拉霸开始一局转动 
		CMD_LABA_REFRESHDATA = 2002, // 拉霸投注过程中刷新数据 
		CMD_LABA_PLAYER_AWARDINFO = 2003, // 拉霸房间内中奖信息广播数据 
		CMD_ITEMSTORE_GETSALEHIS = 2100, // 获取当前的销售数据 
		CMD_ITEMSTORE_DOBUY = 2101, // 物品商城购买 
		CMD_ITEMSTORE_QUERY_BUYLOG = 2102, // 查询购买历史 
		CMD_DO_REFRESH_HALL_VIEW = 2200, // 根据游戏大厅功能显示掩码刷新大厅显示 
		CMD_GET_BUYUHALL_VERSION_GIFT = 2300, // 领取捕鱼大厅版本的礼包 
		CMD_ENTER_BUYUHALL_MOREFUNC = 2301, // 捕鱼大厅点击了进入了更多游戏按钮 
		CMD_ZODIAC_ENTERDATA = 2401, // 星座进入场的数据 
		CMD_ZODIAC_ROUND_END = 2402, // 星座通知转轮结果 
		CMD_ZODIAC_BET_ON = 2403, // 星座玩家下注 
		CMD_ZODIAC_SET_BUNCH = 2404, // 星座玩家设置串2、串3数据 
		CMD_ZODIAC_REFRESHDATA = 2405, // 星座场数据刷新 
		CMD_ZODIAC_REWARD_NPC_MM = 2406, // 星座打赏幸运连连游戏中的NPC妹子 
	}
	export var command_name = {
		101 : "CMD_ERROR", // 通用提示协议 
		102 : "CMD_TEST_ECHO", // 测试命令字echo 
		103 : "CMD_GET_BIN_MD5LIST", // 客户端资源md5列表 
		104 : "CMD_REQUEST_RES", // 客户端资源请求 
		105 : "CMD_GM", // 特殊gm请求 
		106 : "CMD_NOTICE_CMDFAIL", // 额外通知某个命令字执行失败 
		107 : "CMD_GOLD_NOTENOUGH_ERROR", // 金币不足提示协议 
		108 : "CMD_COMM_HYPER_MSGBOX", // 尚未实现:带按钮的通用提示框 
		109 : "CMD_CLICK_HYPER_NOTICE", // 尚未实现:点击了超链接后的上行 
		110 : "CMD_NOTIFY_BULLETIN", // 通知客户端尝试进行公告弹出暂无对应body 
		111 : "CMD_CLT_FIN_WRAP", // 客户端已经完全切换到某个场景后上行通知服务器 
		200 : "CMD_ALOGIN", // 账户登录 
		201 : "CMD_ALOGOUT", // 账户登出请求 
		202 : "CMD_PING", // 心跳包 
		203 : "CMD_KICKOFF_ACCOUNT", // 服务器主动踢账户下线 
		204 : "CMD_WARP", // 通知帐户登录后所在的场景 
		205 : "CMD_NTF_ENTERVIEW", // 广播消息,通知周围的人角色进入桌台 
		206 : "CMD_NTF_LEAVEVIEW", // 广播消息,通知周围的人角色离开桌台 
		207 : "CMD_SCENE_HISTORY_CHATMSG", // 场景中的历史聊天记录 
		208 : "CMD_SMART_BEGIN", // 场景中的快速开始按钮 
		209 : "CMD_NOTIFY_TOPWINNER", // 通知在某个场景中的最大赢家信息 
		300 : "CMD_ROLE_MISC", // 角色混杂数据 
		301 : "CMD_ROLE_FIN", // 登录下发的所有角色信息结束 
		302 : "CMD_ATT_CHANGE", // 角色属性变化通知 
		403 : "CMD_CAN_BEGIN_SLOT", // 通知成功进入某个机台,可以开始游戏 
		404 : "CMD_DO_SLOTROUND_BEGIN", // 开始执行一转 
		405 : "CMD_DO_SLOTROUND_END", // 结束执行一转 
		406 : "CMD_ADD_SLOTMONEY", // 主动给桌台增加币,增加数量为当前转需要的币,最多增加到3个 
		407 : "CMD_NOTIFY_SLOTTABDATA", // 通知刷新桌台某些数据,目前主要用于通知桌台币的改变 
		500 : "CMD_TASK_LIST", // 当前任务列表 
		501 : "CMD_GET_TASK_AWARD", // 领取任务奖励 
		600 : "CMD_LOTTERY_BET_ON", // 玩家下注 
		601 : "CMD_LOTTERY_ENTER", // 进入摩天轮 
		602 : "CMD_LOTTERY_REFRESHDATA", // 投注过程中刷新数据 
		603 : "CMD_LOTTERY_ROUND_END", // 通知摩天轮转轮结果 
		604 : "CMD_LOTTERY_HERORANK", // 摩天轮英豪榜 
		605 : "CMD_SCENE_ONLINELIST_PAGE", // 场景中的在线帐号列表 
		606 : "CMD_LOTTERY_REFRESH_SELF_BET", // 当上行的下注请求不能被正确处理时会下行该条协议刷新为真实的下注数据 
		607 : "CMD_LOTTERY_HISTORY_CHATMSG", // 摩天轮聊天历史数据 
		700 : "CMD_CLASSICFRUIT_BET_ON", // 经典水果机玩家下注 
		701 : "CMD_CLASSICFRUIT_ENTERDATA", // 经典水果机进入时的相关数据 
		702 : "CMD_CLASSICFRUIT_REFRESHDATA", // 经典水果机投注过程中刷新数据 
		703 : "CMD_CLASSICFRUIT_ROUND_END", // 通知经典水果机转轮结果 
		704 : "CMD_CLASSICFRUIT_REFRESH_SELF_BET", // 经典水果机投注中当上行的下注请求不能被正确处理时会下行该条协议刷新为真实的下注数据 
		705 : "CMD_CLASSICFRUIT_HEARTBEAT", // 经典水果机私有心跳当在该场景中且为等待上庄或者己上庄状态时建议5秒发一次 
		706 : "CMD_CLASSICFRUIT_SIGNUP_BANKER", // 申请上庄 
		707 : "CMD_CLASSICFRUIT_QUIT_BANKER", // 申请提前下庄当还在队列中的时候也会被踢出队列 
		708 : "CMD_CLASSICFRUIT_UPDATE_BANKER_STAT", // 通知更新自身的Banker状态 
		709 : "CMD_CLASSICFRUIT_CURBANKERLIST", // 当前庄家列表进入场景及变化时会下发 
		710 : "CMD_CLASSICFRUIT_UPDATE_CURBANKER", // 更新当前场子中的庄家信息 
		800 : "CMD_SHARK_BET_ON", // 鲨鱼玩家下注 
		801 : "CMD_SHARK_ENTERDATA", // 鲨鱼进入时的相关数据 
		802 : "CMD_SHARK_REFRESHDATA", // 鲨鱼投注过程中刷新数据 
		803 : "CMD_SHARK_ROUND_END", // 通知鲨鱼转轮结果 
		804 : "CMD_SHARK_REFRESH_SELF_BET", // 鲨鱼投注中当上行的下注请求不能被正确处理时会下行该条协议刷新为真实的下注数据 
		805 : "CMD_SHARK_HEARTBEAT", // 鲨鱼私有心跳当在该场景中且为等待上庄或者己上庄状态时建议5秒发一次 
		806 : "CMD_SHARK_SIGNUP_BANKER", // 鲨鱼申请上庄 
		807 : "CMD_SHARK_QUIT_BANKER", // 鲨鱼申请提前下庄当还在队列中的时候也会被踢出队列 
		808 : "CMD_SHARK_UPDATE_BANKER_STAT", // 鲨鱼通知更新自身的Banker状态 
		809 : "CMD_SHARK_CURBANKERLIST", // 鲨鱼当前庄家列表进入场景及变化时会下发 
		810 : "CMD_SHARK_UPDATE_CURBANKER", // 鲨鱼更新当前场子中的庄家信息 
		811 : "CMD_SHARK_BANKER_SETPRIZE", // 鲨鱼庄家设置下转结果 
		901 : "CMD_GET_CONLOGIN_GIFT", // 领取连续登录礼包 
		902 : "CMD_GET_ONLINETIME_GIFT", // 领取在线时间礼包 
		903 : "CMD_RANK_QUERYPAGE", // 查询排行榜分页 
		904 : "CMD_CHAT", // 消息频道聊天,包括系统频道 
		905 : "CMD_CONLOGIN_GIFT", // 可领取的连续登录礼包 
		906 : "CMD_SKIP_NEWERGUIDE", // 跳过新手引导 
		907 : "CMD_NOTIFY_CHARGE_SUCC", // 客户端通知服务器充值成功,目前仅用于LOG对帐 
		908 : "CMD_CHANGE_HEADPHOTO", // 改变当前头像 
		909 : "CMD_NOTIFY_THROWUP_GOLD", // 该协议暂时己废弃,调整为客户端自行处理,通知表演桌台吐币 
		910 : "CMD_NOTIFY_CHARGESUCC", // 服务器通知客户端充值成功尼玛居然和之前的CMD名字取得这么像 
		911 : "CMD_NOTIFY_EXTCHARGE_TIMER", // 通知开始充值额外奖励优惠的倒计时 
		912 : "CMD_NEWMSG_TAG", // 上行清除打点系统标记,下行则是通知当前打点列表 
		913 : "CMD_GET_RANKAWARD", // 领取排行奖励 
		915 : "CMD_PRIZEDRAW_CURINFO", // 登录后服务器主动下发的当前抽奖相关状况 
		916 : "CMD_PLAY_PRIZEDRAW", // 进行抽奖 
		917 : "CMD_QUERY_MONEYTREE", // 进入相应界面时查询摇钱树信息 
		918 : "CMD_GATHER_MONEYTREE", // 收获摇钱树上的金币 
		919 : "CMD_MODIFY_NICK", // 修改昵称but目前后台还没有判断唯一性 
		920 : "CMD_MODIFY_SELFPROP", // 修改性别等属性 
		921 : "CMD_UPLOAD_HEADPHOTO", // 上传头像 
		922 : "CMD_ADV_ALIPAY_GIFTPKG", // 通知客户端展示支付宝礼包 
		923 : "CMD_NOTIFY_BEGIN_CHARGE", // 通知服务器在某个场景发起的支付请求 
		924 : "CMD_NOTIFY_UPT_EXTAPP_TIPS", // 通知退出APP时提示内容 
		925 : "CMD_REFRESH_CUR_ONLINETIME_GIFT", // 刷新当前在线时间礼包相关状态数据 
		926 : "CMD_RECOMMEND_QUERYPAGE", // 摘取推荐列表 
		927 : "CMD_GET_ME_RECOMM_OTHER_GIFT", // 领取因为我推荐了别人进入游戏获得的金币礼包 
		928 : "CMD_GET_OTHER_RECOMM_ME_GIFT", // 领取因为别人推荐了我进入游戏获得的金币礼包 
		929 : "CMD_APPSTORE_REPUTATION_STATE", // 通知客户端在AppStore写评价的状态 
		930 : "CMD_WRITE_APPSTORE_REPUTATION", // 在AppStore上给了评价 
		931 : "CMD_NOTIFY_APPSTORE_REPUTATION", // 提示用户在AppStore上写好评 
		932 : "CMD_GET_APPSTORE_REPUTATION_GIFT", // 领取AppStore好评奖励 
		933 : "CMD_HIDDEN_CHARGE_PLATFORM", // 隐藏充值平台 
		934 : "CMD_IS_NEWROLE_REGISTER", // 通知该次登录是新用户注册 
		1000 : "CMD_CAR_BET_ON", // 车行玩家下注 
		1001 : "CMD_CAR_ENTERDATA", // 车行进入时的相关数据 
		1002 : "CMD_CAR_REFRESHDATA", // 车行投注过程中刷新数据 
		1003 : "CMD_CAR_ROUND_END", // 车行鲨鱼转轮结果 
		1004 : "CMD_CAR_REFRESH_SELF_BET", // 车行投注中当上行的下注请求不能被正确处理时会下行该条协议刷新为真实的下注数据 
		1005 : "CMD_CAR_HEARTBEAT", // 车行私有心跳当在该场景中且为等待上庄或者己上庄状态时建议5秒发一次 
		1006 : "CMD_CAR_SIGNUP_BANKER", // 车行申请上庄 
		1007 : "CMD_CAR_QUIT_BANKER", // 车行申请提前下庄当还在队列中的时候也会被踢出队列 
		1008 : "CMD_CAR_UPDATE_BANKER_STAT", // 车行通知更新自身的Banker状态 
		1009 : "CMD_CAR_CURBANKERLIST", // 车行当前庄家列表进入场景及变化时会下发 
		1010 : "CMD_CAR_UPDATE_CURBANKER", // 车行更新当前场子中的庄家信息 
		1011 : "CMD_CAR_BANKER_SETPRIZE", // 车行庄家设置下转结果 
		1012 : "CMD_CAR_BIGWINNERRANK", // 车行大赢家榜 
		1101 : "CMD_GET_MAILLIST", // 获取邮件列表信息 
		1102 : "CMD_GET_MAILATTACH", // 获取邮件的附件 
		1103 : "CMD_MAILSTAT_CHANGE", // 通知服务器邮件变为己读等等状态的变更 
		1201 : "CMD_REQ_BIND_SMSCODE", // 申请获取绑定手机的验证码 
		1202 : "CMD_CONFIRM_BIND_SMSCODE", // 输入验证绑定手机的验证码 
		1203 : "CMD_DO_UNBIND_CURMOBILE", // 解绑当前手机绑定的手机号码 
		1204 : "CMD_DO_BIND_MOBILE", // 执行操作绑定输入的手机号码 
		1205 : "CMD_DO_REPLACE_ACCOUNT", // 执行帐号迁移操作 
		1301 : "CMD_VIVO_GEN_ORDER", // VIVO生成订单 
		1302 : "CMD_NOTIFY_ROUNDINDEXERR", // 上报因roundid不一致被踢出场次的数据 
		1303 : "CMD_CHECK_MALLBUY", // 支付前检查是否能进行该支付 
		1304 : "CMD_UNICOM_GEN_ORDER", // 联通生成内部支付订单 
		1305 : "CMD_LENOVO_GEN_ORDER", // 联想生成内部支付订单 
		1306 : "CMD_COMM_MALL_GEN_ORDER", // 通用生成内部支付订单协议目前从海马开始接入 
		1500 : "CMD_ZJH_ENTERDATA", // 扎金花进入时的相关数据 
		1501 : "CMD_ZJH_BEGIN_ONEGAME", // 扎金花房间通知一局开始发牌 
		1502 : "CMD_ZJH_CHANGE_ROOM", // 扎金花更换房间 
		1503 : "CMD_ZJH_UPT_PLAYER_DATA", // 扎金花服务器通知客户端桌台上某个玩家状态等数据变更 
		1504 : "CMD_ZJH_UPT_TABLE_DATA", // 扎金花服务器通知客户端桌台数据刷新 
		1505 : "CMD_ZJH_END_ONEGAME", // 扎金花服务器通知客户端一局比赛结束 
		1506 : "CMD_ZJH_PLAYER_ALLDATA", // 扎金花进入时的客户端玩家全量数据 
		1507 : "CMD_ZJH_PLAYER_FIRSTROUNDINFO", // 该协议暂时废弃:扎金花某玩家在桌上玩的第一局相关信息通知 
		1510 : "CMD_ZJH_DO_READY", // 扎金花玩家准备 
		1511 : "CMD_ZJH_DO_BET", // 扎金花玩家跟注或加注 
		1513 : "CMD_ZJH_DO_DISCARD", // 扎金花玩家弃牌 
		1514 : "CMD_ZJH_DO_COMPARE", // 扎金花玩家比牌 
		1515 : "CMD_ZJH_DO_FORBIDCOMPARE", // 扎金花玩家禁比 
		1516 : "CMD_ZJH_DO_DOUBLE", // 扎金花玩家加倍 
		1517 : "CMD_ZJH_DO_VIEWCARD", // 扎金花玩家看牌 
		1518 : "CMD_ZJH_DO_KICKPLAYER", // 扎金花踢人 
		1601 : "CMD_PAYCENTER_GEN_ORDER", // 游戏内自有支付中心生成内部CP支付订单协议目前仅支持部分支付平台方式 
		1602 : "CMD_PAYCENTER_NOTIFY_SERVER_SUCC", // 客户端收到第三方支付中心支付成功的回调后立刻通知到服务器以便对帐 
		1603 : "CMD_PAYCENTER_NOTIFY_CLIENT_SUCC", // 服务器收到第三方支付中心支付成功并发货后通知到客户端 
		1604 : "CMD_PAYCENTER_PREPAID_CARD_DOPAY", // 预付卡填入卡号密码后确认支付 
		1610 : "CMD_GET_CONLOGIN_GIFT_NEWVERSION", // 新版本的领取连续登录礼包 
		1611 : "CMD_SHANXI_POINTS_EXCHANGE", // 陕西积分活动兑换 
		1701 : "CMD_BULL_ENTERDATA", // 进入牛牛场的数据 
		1702 : "CMD_BULL_ROUND_END", // 通知牛牛转轮结果 
		1703 : "CMD_BULL_BET_ON", // 牛牛玩家下注 
		1704 : "CMD_BULL_SIGNUP_BANKER", // 牛牛玩家申请上庄 
		1705 : "CMD_BULL_QUIT_BANKER", // 牛牛玩家申请提前下庄 
		1706 : "CMD_BULL_CURBANKERLIST", // 牛牛场当前庄家列表 
		1707 : "CMD_BULL_HEARTBEAT", // 牛牛场庄家心跳 
		1708 : "CMD_BULL_REFRESHDATA", // 牛牛场数据刷新 
		1709 : "CMD_BULL_UPDATE_CURBANKER", // 牛牛更新当前场子中的庄家信息 
		1710 : "CMD_BULL_BIGWINNERRANK", // 牛牛行大赢家榜 
		1711 : "CMD_BULL_UPDATE_BANKER_STAT", // 牛牛通知更新自身的Banker状态 
		1712 : "CMD_BULL_ROUND_START", // 牛牛场一轮开始 
		1713 : "CMD_BULL_REFRESH_SELF_BET", // 牛牛投注中当上行的下注请求不能被正确处理时会下行该条协议刷新为真实的下注数据 
		1801 : "CMD_APPSTORE_PAYRECEPIT_VERIFY", // 未完成苹果支付成功后返回的支付订单数据较验 
		1901 : "CMD_GOLDMINER_ENTERDATA", // 黄金矿工进入时的相关数据 
		1902 : "CMD_GOLDMINER_GAME_AGAIN", // 黄金矿工再来新的一局 
		1903 : "CMD_GOLDMINER_ONEGRAB_RET", // 黄金矿工上报一次抓取的结果 
		1910 : "CMD_CHINESEPHRASE_DO_GAME", // 成语任务开始 
		1911 : "CMD_CHINESEPHRASE_REFRESH", // 成语任务刷新成语 
		1912 : "CMD_CHINESEPHRASE_FINALCOMMIT", // 成语任务上报选择结果 
		1913 : "CMD_CHINESEPHRASE_PICNOTFOUND", // 成语任务客户端发现某个图片不存在时上行通知服务器 
		1920 : "CMD_SINASHOW_MONEY_EXCHANGE_IN_OUT", // 新浪秀场货币兑入为游戏币或者将游戏币兑出为新浪秀场货币 
		2000 : "CMD_LABA_ENTERDATA", // 拉霸进入时的相关数据 
		2001 : "CMD_LABA_PLAY_ONE_ROUND", // 拉霸开始一局转动 
		2002 : "CMD_LABA_REFRESHDATA", // 拉霸投注过程中刷新数据 
		2003 : "CMD_LABA_PLAYER_AWARDINFO", // 拉霸房间内中奖信息广播数据 
		2100 : "CMD_ITEMSTORE_GETSALEHIS", // 获取当前的销售数据 
		2101 : "CMD_ITEMSTORE_DOBUY", // 物品商城购买 
		2102 : "CMD_ITEMSTORE_QUERY_BUYLOG", // 查询购买历史 
		2200 : "CMD_DO_REFRESH_HALL_VIEW", // 根据游戏大厅功能显示掩码刷新大厅显示 
		2300 : "CMD_GET_BUYUHALL_VERSION_GIFT", // 领取捕鱼大厅版本的礼包 
		2301 : "CMD_ENTER_BUYUHALL_MOREFUNC", // 捕鱼大厅点击了进入了更多游戏按钮 
		2401 : "CMD_ZODIAC_ENTERDATA", // 星座进入场的数据 
		2402 : "CMD_ZODIAC_ROUND_END", // 星座通知转轮结果 
		2403 : "CMD_ZODIAC_BET_ON", // 星座玩家下注 
		2404 : "CMD_ZODIAC_SET_BUNCH", // 星座玩家设置串2、串3数据 
		2405 : "CMD_ZODIAC_REFRESHDATA", // 星座场数据刷新 
		2406 : "CMD_ZODIAC_REWARD_NPC_MM", // 星座打赏幸运连连游戏中的NPC妹子 
	}
	export var CMD_ERROR = 101; // 通用提示协议 
	export var CMD_TEST_ECHO = 102; // 测试命令字echo 
	export var CMD_GET_BIN_MD5LIST = 103; // 客户端资源md5列表 
	export var CMD_REQUEST_RES = 104; // 客户端资源请求 
	export var CMD_GM = 105; // 特殊gm请求 
	export var CMD_NOTICE_CMDFAIL = 106; // 额外通知某个命令字执行失败 
	export var CMD_GOLD_NOTENOUGH_ERROR = 107; // 金币不足提示协议 
	export var CMD_COMM_HYPER_MSGBOX = 108; // 尚未实现:带按钮的通用提示框 
	export var CMD_CLICK_HYPER_NOTICE = 109; // 尚未实现:点击了超链接后的上行 
	export var CMD_NOTIFY_BULLETIN = 110; // 通知客户端尝试进行公告弹出暂无对应body 
	export var CMD_CLT_FIN_WRAP = 111; // 客户端已经完全切换到某个场景后上行通知服务器 
	export var CMD_ALOGIN = 200; // 账户登录 
	export var CMD_ALOGOUT = 201; // 账户登出请求 
	export var CMD_PING = 202; // 心跳包 
	export var CMD_KICKOFF_ACCOUNT = 203; // 服务器主动踢账户下线 
	export var CMD_WARP = 204; // 通知帐户登录后所在的场景 
	export var CMD_NTF_ENTERVIEW = 205; // 广播消息,通知周围的人角色进入桌台 
	export var CMD_NTF_LEAVEVIEW = 206; // 广播消息,通知周围的人角色离开桌台 
	export var CMD_SCENE_HISTORY_CHATMSG = 207; // 场景中的历史聊天记录 
	export var CMD_SMART_BEGIN = 208; // 场景中的快速开始按钮 
	export var CMD_NOTIFY_TOPWINNER = 209; // 通知在某个场景中的最大赢家信息 
	export var CMD_ROLE_MISC = 300; // 角色混杂数据 
	export var CMD_ROLE_FIN = 301; // 登录下发的所有角色信息结束 
	export var CMD_ATT_CHANGE = 302; // 角色属性变化通知 
	export var CMD_CAN_BEGIN_SLOT = 403; // 通知成功进入某个机台,可以开始游戏 
	export var CMD_DO_SLOTROUND_BEGIN = 404; // 开始执行一转 
	export var CMD_DO_SLOTROUND_END = 405; // 结束执行一转 
	export var CMD_ADD_SLOTMONEY = 406; // 主动给桌台增加币,增加数量为当前转需要的币,最多增加到3个 
	export var CMD_NOTIFY_SLOTTABDATA = 407; // 通知刷新桌台某些数据,目前主要用于通知桌台币的改变 
	export var CMD_TASK_LIST = 500; // 当前任务列表 
	export var CMD_GET_TASK_AWARD = 501; // 领取任务奖励 
	export var CMD_LOTTERY_BET_ON = 600; // 玩家下注 
	export var CMD_LOTTERY_ENTER = 601; // 进入摩天轮 
	export var CMD_LOTTERY_REFRESHDATA = 602; // 投注过程中刷新数据 
	export var CMD_LOTTERY_ROUND_END = 603; // 通知摩天轮转轮结果 
	export var CMD_LOTTERY_HERORANK = 604; // 摩天轮英豪榜 
	export var CMD_SCENE_ONLINELIST_PAGE = 605; // 场景中的在线帐号列表 
	export var CMD_LOTTERY_REFRESH_SELF_BET = 606; // 当上行的下注请求不能被正确处理时会下行该条协议刷新为真实的下注数据 
	export var CMD_LOTTERY_HISTORY_CHATMSG = 607; // 摩天轮聊天历史数据 
	export var CMD_CLASSICFRUIT_BET_ON = 700; // 经典水果机玩家下注 
	export var CMD_CLASSICFRUIT_ENTERDATA = 701; // 经典水果机进入时的相关数据 
	export var CMD_CLASSICFRUIT_REFRESHDATA = 702; // 经典水果机投注过程中刷新数据 
	export var CMD_CLASSICFRUIT_ROUND_END = 703; // 通知经典水果机转轮结果 
	export var CMD_CLASSICFRUIT_REFRESH_SELF_BET = 704; // 经典水果机投注中当上行的下注请求不能被正确处理时会下行该条协议刷新为真实的下注数据 
	export var CMD_CLASSICFRUIT_HEARTBEAT = 705; // 经典水果机私有心跳当在该场景中且为等待上庄或者己上庄状态时建议5秒发一次 
	export var CMD_CLASSICFRUIT_SIGNUP_BANKER = 706; // 申请上庄 
	export var CMD_CLASSICFRUIT_QUIT_BANKER = 707; // 申请提前下庄当还在队列中的时候也会被踢出队列 
	export var CMD_CLASSICFRUIT_UPDATE_BANKER_STAT = 708; // 通知更新自身的Banker状态 
	export var CMD_CLASSICFRUIT_CURBANKERLIST = 709; // 当前庄家列表进入场景及变化时会下发 
	export var CMD_CLASSICFRUIT_UPDATE_CURBANKER = 710; // 更新当前场子中的庄家信息 
	export var CMD_SHARK_BET_ON = 800; // 鲨鱼玩家下注 
	export var CMD_SHARK_ENTERDATA = 801; // 鲨鱼进入时的相关数据 
	export var CMD_SHARK_REFRESHDATA = 802; // 鲨鱼投注过程中刷新数据 
	export var CMD_SHARK_ROUND_END = 803; // 通知鲨鱼转轮结果 
	export var CMD_SHARK_REFRESH_SELF_BET = 804; // 鲨鱼投注中当上行的下注请求不能被正确处理时会下行该条协议刷新为真实的下注数据 
	export var CMD_SHARK_HEARTBEAT = 805; // 鲨鱼私有心跳当在该场景中且为等待上庄或者己上庄状态时建议5秒发一次 
	export var CMD_SHARK_SIGNUP_BANKER = 806; // 鲨鱼申请上庄 
	export var CMD_SHARK_QUIT_BANKER = 807; // 鲨鱼申请提前下庄当还在队列中的时候也会被踢出队列 
	export var CMD_SHARK_UPDATE_BANKER_STAT = 808; // 鲨鱼通知更新自身的Banker状态 
	export var CMD_SHARK_CURBANKERLIST = 809; // 鲨鱼当前庄家列表进入场景及变化时会下发 
	export var CMD_SHARK_UPDATE_CURBANKER = 810; // 鲨鱼更新当前场子中的庄家信息 
	export var CMD_SHARK_BANKER_SETPRIZE = 811; // 鲨鱼庄家设置下转结果 
	export var CMD_GET_CONLOGIN_GIFT = 901; // 领取连续登录礼包 
	export var CMD_GET_ONLINETIME_GIFT = 902; // 领取在线时间礼包 
	export var CMD_RANK_QUERYPAGE = 903; // 查询排行榜分页 
	export var CMD_CHAT = 904; // 消息频道聊天,包括系统频道 
	export var CMD_CONLOGIN_GIFT = 905; // 可领取的连续登录礼包 
	export var CMD_SKIP_NEWERGUIDE = 906; // 跳过新手引导 
	export var CMD_NOTIFY_CHARGE_SUCC = 907; // 客户端通知服务器充值成功,目前仅用于LOG对帐 
	export var CMD_CHANGE_HEADPHOTO = 908; // 改变当前头像 
	export var CMD_NOTIFY_THROWUP_GOLD = 909; // 该协议暂时己废弃,调整为客户端自行处理,通知表演桌台吐币 
	export var CMD_NOTIFY_CHARGESUCC = 910; // 服务器通知客户端充值成功尼玛居然和之前的CMD名字取得这么像 
	export var CMD_NOTIFY_EXTCHARGE_TIMER = 911; // 通知开始充值额外奖励优惠的倒计时 
	export var CMD_NEWMSG_TAG = 912; // 上行清除打点系统标记,下行则是通知当前打点列表 
	export var CMD_GET_RANKAWARD = 913; // 领取排行奖励 
	export var CMD_PRIZEDRAW_CURINFO = 915; // 登录后服务器主动下发的当前抽奖相关状况 
	export var CMD_PLAY_PRIZEDRAW = 916; // 进行抽奖 
	export var CMD_QUERY_MONEYTREE = 917; // 进入相应界面时查询摇钱树信息 
	export var CMD_GATHER_MONEYTREE = 918; // 收获摇钱树上的金币 
	export var CMD_MODIFY_NICK = 919; // 修改昵称but目前后台还没有判断唯一性 
	export var CMD_MODIFY_SELFPROP = 920; // 修改性别等属性 
	export var CMD_UPLOAD_HEADPHOTO = 921; // 上传头像 
	export var CMD_ADV_ALIPAY_GIFTPKG = 922; // 通知客户端展示支付宝礼包 
	export var CMD_NOTIFY_BEGIN_CHARGE = 923; // 通知服务器在某个场景发起的支付请求 
	export var CMD_NOTIFY_UPT_EXTAPP_TIPS = 924; // 通知退出APP时提示内容 
	export var CMD_REFRESH_CUR_ONLINETIME_GIFT = 925; // 刷新当前在线时间礼包相关状态数据 
	export var CMD_RECOMMEND_QUERYPAGE = 926; // 摘取推荐列表 
	export var CMD_GET_ME_RECOMM_OTHER_GIFT = 927; // 领取因为我推荐了别人进入游戏获得的金币礼包 
	export var CMD_GET_OTHER_RECOMM_ME_GIFT = 928; // 领取因为别人推荐了我进入游戏获得的金币礼包 
	export var CMD_APPSTORE_REPUTATION_STATE = 929; // 通知客户端在AppStore写评价的状态 
	export var CMD_WRITE_APPSTORE_REPUTATION = 930; // 在AppStore上给了评价 
	export var CMD_NOTIFY_APPSTORE_REPUTATION = 931; // 提示用户在AppStore上写好评 
	export var CMD_GET_APPSTORE_REPUTATION_GIFT = 932; // 领取AppStore好评奖励 
	export var CMD_HIDDEN_CHARGE_PLATFORM = 933; // 隐藏充值平台 
	export var CMD_IS_NEWROLE_REGISTER = 934; // 通知该次登录是新用户注册 
	export var CMD_CAR_BET_ON = 1000; // 车行玩家下注 
	export var CMD_CAR_ENTERDATA = 1001; // 车行进入时的相关数据 
	export var CMD_CAR_REFRESHDATA = 1002; // 车行投注过程中刷新数据 
	export var CMD_CAR_ROUND_END = 1003; // 车行鲨鱼转轮结果 
	export var CMD_CAR_REFRESH_SELF_BET = 1004; // 车行投注中当上行的下注请求不能被正确处理时会下行该条协议刷新为真实的下注数据 
	export var CMD_CAR_HEARTBEAT = 1005; // 车行私有心跳当在该场景中且为等待上庄或者己上庄状态时建议5秒发一次 
	export var CMD_CAR_SIGNUP_BANKER = 1006; // 车行申请上庄 
	export var CMD_CAR_QUIT_BANKER = 1007; // 车行申请提前下庄当还在队列中的时候也会被踢出队列 
	export var CMD_CAR_UPDATE_BANKER_STAT = 1008; // 车行通知更新自身的Banker状态 
	export var CMD_CAR_CURBANKERLIST = 1009; // 车行当前庄家列表进入场景及变化时会下发 
	export var CMD_CAR_UPDATE_CURBANKER = 1010; // 车行更新当前场子中的庄家信息 
	export var CMD_CAR_BANKER_SETPRIZE = 1011; // 车行庄家设置下转结果 
	export var CMD_CAR_BIGWINNERRANK = 1012; // 车行大赢家榜 
	export var CMD_GET_MAILLIST = 1101; // 获取邮件列表信息 
	export var CMD_GET_MAILATTACH = 1102; // 获取邮件的附件 
	export var CMD_MAILSTAT_CHANGE = 1103; // 通知服务器邮件变为己读等等状态的变更 
	export var CMD_REQ_BIND_SMSCODE = 1201; // 申请获取绑定手机的验证码 
	export var CMD_CONFIRM_BIND_SMSCODE = 1202; // 输入验证绑定手机的验证码 
	export var CMD_DO_UNBIND_CURMOBILE = 1203; // 解绑当前手机绑定的手机号码 
	export var CMD_DO_BIND_MOBILE = 1204; // 执行操作绑定输入的手机号码 
	export var CMD_DO_REPLACE_ACCOUNT = 1205; // 执行帐号迁移操作 
	export var CMD_VIVO_GEN_ORDER = 1301; // VIVO生成订单 
	export var CMD_NOTIFY_ROUNDINDEXERR = 1302; // 上报因roundid不一致被踢出场次的数据 
	export var CMD_CHECK_MALLBUY = 1303; // 支付前检查是否能进行该支付 
	export var CMD_UNICOM_GEN_ORDER = 1304; // 联通生成内部支付订单 
	export var CMD_LENOVO_GEN_ORDER = 1305; // 联想生成内部支付订单 
	export var CMD_COMM_MALL_GEN_ORDER = 1306; // 通用生成内部支付订单协议目前从海马开始接入 
	export var CMD_ZJH_ENTERDATA = 1500; // 扎金花进入时的相关数据 
	export var CMD_ZJH_BEGIN_ONEGAME = 1501; // 扎金花房间通知一局开始发牌 
	export var CMD_ZJH_CHANGE_ROOM = 1502; // 扎金花更换房间 
	export var CMD_ZJH_UPT_PLAYER_DATA = 1503; // 扎金花服务器通知客户端桌台上某个玩家状态等数据变更 
	export var CMD_ZJH_UPT_TABLE_DATA = 1504; // 扎金花服务器通知客户端桌台数据刷新 
	export var CMD_ZJH_END_ONEGAME = 1505; // 扎金花服务器通知客户端一局比赛结束 
	export var CMD_ZJH_PLAYER_ALLDATA = 1506; // 扎金花进入时的客户端玩家全量数据 
	export var CMD_ZJH_PLAYER_FIRSTROUNDINFO = 1507; // 该协议暂时废弃:扎金花某玩家在桌上玩的第一局相关信息通知 
	export var CMD_ZJH_DO_READY = 1510; // 扎金花玩家准备 
	export var CMD_ZJH_DO_BET = 1511; // 扎金花玩家跟注或加注 
	export var CMD_ZJH_DO_DISCARD = 1513; // 扎金花玩家弃牌 
	export var CMD_ZJH_DO_COMPARE = 1514; // 扎金花玩家比牌 
	export var CMD_ZJH_DO_FORBIDCOMPARE = 1515; // 扎金花玩家禁比 
	export var CMD_ZJH_DO_DOUBLE = 1516; // 扎金花玩家加倍 
	export var CMD_ZJH_DO_VIEWCARD = 1517; // 扎金花玩家看牌 
	export var CMD_ZJH_DO_KICKPLAYER = 1518; // 扎金花踢人 
	export var CMD_PAYCENTER_GEN_ORDER = 1601; // 游戏内自有支付中心生成内部CP支付订单协议目前仅支持部分支付平台方式 
	export var CMD_PAYCENTER_NOTIFY_SERVER_SUCC = 1602; // 客户端收到第三方支付中心支付成功的回调后立刻通知到服务器以便对帐 
	export var CMD_PAYCENTER_NOTIFY_CLIENT_SUCC = 1603; // 服务器收到第三方支付中心支付成功并发货后通知到客户端 
	export var CMD_PAYCENTER_PREPAID_CARD_DOPAY = 1604; // 预付卡填入卡号密码后确认支付 
	export var CMD_GET_CONLOGIN_GIFT_NEWVERSION = 1610; // 新版本的领取连续登录礼包 
	export var CMD_SHANXI_POINTS_EXCHANGE = 1611; // 陕西积分活动兑换 
	export var CMD_BULL_ENTERDATA = 1701; // 进入牛牛场的数据 
	export var CMD_BULL_ROUND_END = 1702; // 通知牛牛转轮结果 
	export var CMD_BULL_BET_ON = 1703; // 牛牛玩家下注 
	export var CMD_BULL_SIGNUP_BANKER = 1704; // 牛牛玩家申请上庄 
	export var CMD_BULL_QUIT_BANKER = 1705; // 牛牛玩家申请提前下庄 
	export var CMD_BULL_CURBANKERLIST = 1706; // 牛牛场当前庄家列表 
	export var CMD_BULL_HEARTBEAT = 1707; // 牛牛场庄家心跳 
	export var CMD_BULL_REFRESHDATA = 1708; // 牛牛场数据刷新 
	export var CMD_BULL_UPDATE_CURBANKER = 1709; // 牛牛更新当前场子中的庄家信息 
	export var CMD_BULL_BIGWINNERRANK = 1710; // 牛牛行大赢家榜 
	export var CMD_BULL_UPDATE_BANKER_STAT = 1711; // 牛牛通知更新自身的Banker状态 
	export var CMD_BULL_ROUND_START = 1712; // 牛牛场一轮开始 
	export var CMD_BULL_REFRESH_SELF_BET = 1713; // 牛牛投注中当上行的下注请求不能被正确处理时会下行该条协议刷新为真实的下注数据 
	export var CMD_APPSTORE_PAYRECEPIT_VERIFY = 1801; // 未完成苹果支付成功后返回的支付订单数据较验 
	export var CMD_GOLDMINER_ENTERDATA = 1901; // 黄金矿工进入时的相关数据 
	export var CMD_GOLDMINER_GAME_AGAIN = 1902; // 黄金矿工再来新的一局 
	export var CMD_GOLDMINER_ONEGRAB_RET = 1903; // 黄金矿工上报一次抓取的结果 
	export var CMD_CHINESEPHRASE_DO_GAME = 1910; // 成语任务开始 
	export var CMD_CHINESEPHRASE_REFRESH = 1911; // 成语任务刷新成语 
	export var CMD_CHINESEPHRASE_FINALCOMMIT = 1912; // 成语任务上报选择结果 
	export var CMD_CHINESEPHRASE_PICNOTFOUND = 1913; // 成语任务客户端发现某个图片不存在时上行通知服务器 
	export var CMD_SINASHOW_MONEY_EXCHANGE_IN_OUT = 1920; // 新浪秀场货币兑入为游戏币或者将游戏币兑出为新浪秀场货币 
	export var CMD_LABA_ENTERDATA = 2000; // 拉霸进入时的相关数据 
	export var CMD_LABA_PLAY_ONE_ROUND = 2001; // 拉霸开始一局转动 
	export var CMD_LABA_REFRESHDATA = 2002; // 拉霸投注过程中刷新数据 
	export var CMD_LABA_PLAYER_AWARDINFO = 2003; // 拉霸房间内中奖信息广播数据 
	export var CMD_ITEMSTORE_GETSALEHIS = 2100; // 获取当前的销售数据 
	export var CMD_ITEMSTORE_DOBUY = 2101; // 物品商城购买 
	export var CMD_ITEMSTORE_QUERY_BUYLOG = 2102; // 查询购买历史 
	export var CMD_DO_REFRESH_HALL_VIEW = 2200; // 根据游戏大厅功能显示掩码刷新大厅显示 
	export var CMD_GET_BUYUHALL_VERSION_GIFT = 2300; // 领取捕鱼大厅版本的礼包 
	export var CMD_ENTER_BUYUHALL_MOREFUNC = 2301; // 捕鱼大厅点击了进入了更多游戏按钮 
	export var CMD_ZODIAC_ENTERDATA = 2401; // 星座进入场的数据 
	export var CMD_ZODIAC_ROUND_END = 2402; // 星座通知转轮结果 
	export var CMD_ZODIAC_BET_ON = 2403; // 星座玩家下注 
	export var CMD_ZODIAC_SET_BUNCH = 2404; // 星座玩家设置串2、串3数据 
	export var CMD_ZODIAC_REFRESHDATA = 2405; // 星座场数据刷新 
	export var CMD_ZODIAC_REWARD_NPC_MM = 2406; // 星座打赏幸运连连游戏中的NPC妹子 

	//enum export
	export var Version = 35; // 当前协议版本号 
	export var LOGINRESULT_SUCCESS = 0; // 登录成功 
	export var LOGINRESULT_MUSTUPDATE = 1; // 强制升级 
	export var LOGINRESULT_SUGGESTUPDATE = 2; // 建议升级 
	export var LOGINRESULT_ROLEONLINE = 3; // 角色在线 
	export var LOGINRESULT_FASTLOGINFAIL = 4; // 快速登录失败 
	export var LOGINRESULT_SERVERSTOP = 5; // 服务器正在停服 
	export var LOGINRESULT_CANNOT_TASTE = 6; // 不允许进入体验服 
	export var LOGINRESULT_CANNOT_ORDIN = 7; // 不允许进入非体验服 
	export var LOGINRESULT_TOUCHMAXACCOUNT = 8; // 服务器己满 
	export var LOGINRESULT_NOTINWHITELIST = 9; // 不在白名单,无资格进入服务器 
	export var LOGINRESULT_COMMFAIL = 10; // 通用登录失败错误码，建议描述写得模糊点 
	export var TOO_LONG_WAIT = 1; // 超时 
	export var DUPLICATE_ACCOUNT = 2; // 角色顶号 
	export var BAN_ACCOUNT = 3; // 角色封号 
	export var NET_PROBLEM = 4; // 网络不稳定 
	export var ROLE_LEAVE = 5; // 角色非正常离开 
	export var SERVER_NOT_OPEN = 6; // 服务器未开放 
	export var SERVER_REACH_LIMIT = 7; // 服务器达到人数限制 
	export var MOVE_TOO_FAST = 9; // 角色移动过快 
	export var REACH_FREQUENCY_LIMIT = 10; // 上行包超过频率 
	export var VERSION_NOT_MATCH = 11; // 版本不匹配 
	export var PLAYER_SERVER_STOP = 12; // 服务器关服 
	export var PLAYER_AUTH_FAILED = 13; // 输入验证失败 
	export var MAIN_TASK_NOTMATCH = 14; // 客户端主线任务状态与服务器不一致 
	export var BIND_REPLACE_SUCC = 15; // 绑定手机成功,请重新登录 
	export var OBJNONE = 0; // 空类型 
	export var OBJACCOUNT = 1; // 账户类型结构 
	export var OBJPLAYER = 2; // 用户类型 
	export var OBJMONSTER = 3; // 怪物类型 
	export var OBJITEM = 4; // 道具类型结构 
	export var OBJROLEPROP = 5; // 角色属性的抽象 
	export var FUNC_MODULE_SLOT = 0x1; // 鬼武三国老虎机 
	export var FUNC_MODULE_BIG_LOTTERY = 0x2; // 幸运大风车所有场次 
	export var FUNC_MODULE_CLASSICFRUIT_NORMAL = 0x4; // 经典水果机所有场次 
	export var FUNC_MODULE_SHARK_SET = 0x8; // 金鲨银鲨摆庄场 
	export var FUNC_MODULE_CAR_SET = 0x10; // 奔驰宝马所有场次 
	export var FUNC_MODULE_NOSET_SHARK = 0x20; // 金鲨银鲨非摆庄场 
	export var FUNC_MODULE_ZJH = 0x40; // 扎金花所有场次 
	export var FUNC_MODULE_BULL = 0x80; // 百人牛牛所有场次 
	export var FUNC_MODULE_CUSTOM_SERVICE = 0x100; // 迷你模块:客服 
	export var FUNC_MODULE_AWARD = 0x200; // 迷你模块:奖励 
	export var FUNC_MODULE_RANDOM_PRIZE = 0x400; // 迷你模块:抽奖 
	export var FUNC_MODULE_GOLD_TREE = 0x800; // 迷你模块:摇钱树 
	export var FUNC_MODULE_VIP_ENTRY = 0x1000; // 迷你模块:VIP 
	export var FUNC_MODULE_HALL = 0x2000; // 底部导航:大厅 
	export var FUNC_MODULE_SHOP = 0x4000; // 底部导航:商店 
	export var FUNC_MODULE_ACTIVITY = 0x8000; // 底部导航:活动 
	export var FUNC_MODULE_RANK = 0x10000; // 底部导航:排行 
	export var FUNC_MODULE_MOREFUNC = 0x20000; // 底部导航:更多 
	export var FUNC_MODULE_MAIL = 0x40000; // 迷你模块:邮件 
	export var FUNC_MODULE_MOREF_BINDMOBILE = 0x80000; // 迷你模块的子模块:绑定手机 
	export var FUNC_MODULE_RECOMMEND = 0x100000; // 迷你模块:推荐 
	export var FUNC_MODULE_GOLDMINER = 0x1000000; // 黄金矿工所有场次 
	export var FUNC_MODULE_GMONLY = 0x2000000; // GM所有场次 
	export var FUNC_MODULE_CHAT = 0x4000000; // 聊天 
	export var FUNC_MODULE_QUICKSTART = 0x8000000; // 快速开始 
	export var FUNC_MODULE_DOWNLOAD = 0x10000000; // 下载 
	export var FUNC_MODULE_REPUTATION = 0x20000000; // 评论 
	export var FUNC_MODULE_DISABLE_QUICKPAY = 0x40000000; // 禁用快速支付 
	export var FUNC_MODULE_CATCHFISH = 0x100000000; // 捕鱼所有场次 
	export var FUNC_MODULE_LABA = 0x200000000; // 拉霸所有场次 
	export var FUNC_MODULE_SHOP_DIAMOND = 0x400000000; // 底部导航:商店中的钻石购买 
	export var FUNC_MODULE_HAPPY_MEINV_SHOW = 0x800000000; // 欢乐美女秀场次 
	export var FUNC_MODULE_SPECIAL_MOREGAME = 0x1000000000; // 特殊捕鱼版本中的更多 
	export var FUNC_MODULE_BUYUHALL = 0x2000000000; // 特殊捕鱼版本中的捕鱼大厅若标记关闭状态则显示原始完整游戏大厅 
	export var FUNC_MODULE_BUYUHALL_GIFTPKG = 0x4000000000; // 特殊捕鱼版本中的捕鱼大厅的弹出礼包 
	export var FUNC_MODULE_ZJH_PRIVATE = 0x8000000000; // 扎金花中的贵宾厅 
	export var FUNC_MODULE_ZODIAC = 0x10000000000; // 星座场普通场 
	export var BITPOS_FUNC_MODULE_SLOT = 0; // 鬼武三国老虎机 
	export var BITPOS_FUNC_MODULE_BIG_LOTTERY = 1; // 幸运大风车所有场次 
	export var BITPOS_FUNC_MODULE_CLASSICFRUIT_NORMAL = 2; // 经典水果机所有场次 
	export var BITPOS_FUNC_MODULE_SHARK_SET = 3; // 金鲨银鲨摆庄场 
	export var BITPOS_FUNC_MODULE_CAR_SET = 4; // 奔驰宝马所有场次 
	export var BITPOS_FUNC_MODULE_NOSET_SHARK = 5; // 金鲨银鲨非摆庄场 
	export var BITPOS_FUNC_MODULE_ZJH = 6; // 扎金花所有场次 
	export var BITPOS_FUNC_MODULE_BULL = 7; // 百人牛牛所有场次 
	export var BITPOS_FUNC_MODULE_CUSTOM_SERVICE = 8; // 迷你模块:客服 
	export var BITPOS_FUNC_MODULE_AWARD = 9; // 迷你模块:奖励 
	export var BITPOS_FUNC_MODULE_RANDOM_PRIZE = 10; // 迷你模块:抽奖 
	export var BITPOS_FUNC_MODULE_GOLD_TREE = 11; // 迷你模块:摇钱树 
	export var BITPOS_FUNC_MODULE_VIP_ENTRY = 12; // 迷你模块:VIP 
	export var BITPOS_FUNC_MODULE_HALL = 13; // 底部导航:大厅 
	export var BITPOS_FUNC_MODULE_SHOP = 14; // 底部导航:商店 
	export var BITPOS_FUNC_MODULE_ACTIVITY = 15; // 底部导航:活动 
	export var BITPOS_FUNC_MODULE_RANK = 16; // 底部导航:排行 
	export var BITPOS_FUNC_MODULE_MOREFUNC = 17; // 底部导航:更多 
	export var BITPOS_FUNC_MODULE_MAIL = 18; // 迷你模块:邮件 
	export var BITPOS_FUNC_MODULE_MOREF_BINDMOBILE = 19; // 迷你模块的子模块:绑定手机 
	export var BITPOS_FUNC_MODULE_RECOMMEND = 20; // 迷你模块:推荐 
	export var BITPOS_FUNC_MODULE_GOLDMINER = 24; // 黄金矿工所有场次 
	export var BITPOS_FUNC_MODULE_GMONLY = 25; // GM所有场次 
	export var BITPOS_FUNC_MODULE_CHAT = 26; // 聊天 
	export var BITPOS_FUNC_MODULE_QUICKSTART = 27; // 快速开始 
	export var BITPOS_FUNC_MODULE_DOWNLOAD = 28; // 下载 
	export var BITPOS_FUNC_MODULE_REPUTATION = 29; // 评论 
	export var BITPOS_FUNC_MODULE_DISABLE_QUICKPAY = 30; // 禁用快速支付 
	export var BITPOS_FUNC_MODULE_CATCHFISH = 32; // 捕鱼所有场次 
	export var BITPOS_FUNC_MODULE_LABA = 33; // 拉霸所有场次 
	export var BITPOS_FUNC_MODULE_SHOP_DIAMOND = 34; // 底部导航:商店中的钻石购买 
	export var BITPOS_FUNC_MODULE_HAPPY_MEINV_SHOW = 35; // 欢乐美女秀场次 
	export var BITPOS_FUNC_MODULE_SPECIAL_MOREGAME = 36; // 特殊捕鱼版本中的更多 
	export var BITPOS_FUNC_MODULE_BUYUHALL = 37; // 特殊捕鱼版本中的捕鱼大厅若标记关闭状态则显示原始完整游戏大厅 
	export var BITPOS_FUNC_MODULE_BUYUHALL_GIFTPKG = 38; // 特殊捕鱼版本中的捕鱼大厅的弹出礼包 
	export var BITPOS_FUNC_MODULE_ZJH_PRIVATE = 39; // 扎金花中的贵宾厅 
	export var BITPOS_FUNC_MODULE_ZODIAC = 40; // 星座场普通场 
	export var PAYWAY_UNKNOWN = 0; // 未知的 
	export var PAYWAY_ALIPAY = 1; // 支付宝 
	export var PAYWAY_WIIPAY_SMS = 2; // 微派短信 
	export var PAYWAY_OTHER = 3; // 银联或者充值卡等 
	export var PAYWAY_MM_SMS = 4; // 移动MM短信 
	export var PAYWAY_VIVO = 5; // VIVO 
	export var PAYWAY_LENOVO = 6; // LENOVO 
	export var PAYWAY_HAIMA = 7; // HAIMA 
	export var LIFEATT_BEGIN = 0; // 开始,仅占位,没有实际使用 
	export var LIFEATT_LEVEL = 1; // 人物等级 
	export var LIFEATT_GOLD = 2; // 金币 
	export var LIFEATT_SEX = 3; // 性别 
	export var LIFEATT_DIAMOND = 4; // 钻石 
	export var LIFEATT_EXP = 5; // 经验 
	export var LIFEATT_HEADPHOTO = 6; // 头像 
	export var LIFEATT_VIPLEVEL = 7; // VIP等级 
	export var LIFEATT_SLOT_RELATEGOLD = 8; // 桌台上左侧液晶屏显示的金币数 
	export var LIFEATT_MAXEXP = 9; // 升级所需经验 
	export var LIFEATT_HASFINISH_NEWGUIDE = 10; // 是否已完成新手引导1己完成0未完成 
	export var LIFEATT_VIPEXP = 11; // VIP当前经验 
	export var LIFEATT_MAXVIPEXP = 12; // VIP升级所需经验 
	export var LIFEATT_LASHTCHARGETIME = 13; // 上次充值时间,为0则从来没有充过 
	export var LIFEATT_CHARGE_ACT_BEGINTIME = 14; // 限时充值活动上次倒计时开始时间,当为0时需要通知倒计时开始,否则不用 
	export var LIFEATT_CHARGE_ACT_LEFTTIME = 15; // 限时充值活动上次倒计时剩余秒数,当不为0时显示倒计时,该值仅当收到金币不足的错误码下行后才是正确值 
	export var LIFEATT_FUNC_SWITCH = 16; // 各可开关功能的列表mask或值,相应位置为1表明关闭,具体参见枚举定义FUNC_MODULE_SLOT等 
	export var LIFEATT_ROLE_BORNID = 17; // 角色数字类型的出生ID 
	export var LIFEATT_BEBANKER_RCOUNT = 18; // 坐庄总局数 
	export var LIFEATT_BANKER_CRUPTCOUNT = 19; // 爆庄总次数 
	export var LIFEATT_GOT_BAR_COUNT = 20; // 获得BAR个数 
	export var LIFEATT_GOT_7_COUNT = 21; // 获得大奖7个数 
	export var LIFEATT_TODAY_CHARGE_TOTAL = 22; // 本日己充值钱数 
	export var LIFEATT_ALIPAY_GIFTPKG_BUY = 23; // 支付宝或者vivo等超值礼包是否己购买, 0未购买, 其他己购买 
	export var LIFEATT_LAST_PAYWAYTYPE = 24; // 上次支付方式类型参见PAYWAY_ALIPAY等的定义 
	export var LIFEATT_APPSTORE_REPUTATION_STATE = 25; // 在AppStore上评论的状态 
	export var LIFEATT_SINASHOW_MONEY = 26; // 在sinashow客户端中的秀币余额 
	export var LIFEATT_LEAFGOLD = 27; // 金叶子 
	export var LIFEATT_BUYULVL = 28; // 捕鱼等级 
	export var LIFEATT_TALKINGDATA_ACCTYPE = 29; // 客户端TD激活上报方式:0上报原来的tdid,1上报角色BORNID 
	export var LIFEATT_BUYUHALL_GIFTPKG_STAT = 30; // 捕鱼大厅客户端相应礼包状态:0未领取1己领取 
	export var LIFEATT_MAXVAL = 255; // 最大值 
	export var BAG = 1; // 背包 
	export var STORE = 2; // 仓库 
	export var WEAR = 3; // 装备 
	export var BIND_TYPE_NONE = 0; // 不绑定 
	export var BIND_TYPE_EQUIP = 1; // 装备绑定 
	export var BIND_TYPE_GET = 2; // 获得绑定 
	export var VAR_TYPE_STRING = 1; // 字符串 
	export var VAR_TYPE_INT = 2; // 整形 
	export var VAR_TYPE_BYTE = 3; // 无符号字符 
	export var VAR_TYPE_UINT = 4; // 无符号整形变量 
	export var MONEY_TYPE_GOLD = 1; // 金币 
	export var MONEY_TYPE_DIAMOND = 2; // 钻石 
	export var MONEY_TYPE_LEAFGOLD = 3; // 金叶子 
	export var MAX_ERROR_MSG_LEN = 2048; // 错误消息最大长度 
	export var MAX_ALOGIN_HINTMSG_LEN = 2048; // Alogin提示消息最大长度 
	export var MAX_ACCOUNT_LEN = 136; // 帐号最大长度 
	export var MAX_ROLE_NAME_LEN = 21; // 名字最大长度 
	export var MAX_ROLE_COUNT = 3; // 角色最大个数 
	export var MAX_TASK_PAGE_SIZE = 6; // 任务页最大个数 
	export var MAX_SEND_PACK_SIZE = 30; // 一次最多发送的物品数量 
	export var MAX_BAG_SIZE = 64; // 背包最大格子数 
	export var MAX_AWARD_SIZE = 10; // 最大奖励数目 
	export var MAX_STORE_SIZE = 100; // 仓库最大格子数 
	export var MAX_MINIMALL_SIZE = 8; // 随身仓库最大格子数 
	export var MAX_WEAR_SIZE = 10; // 最大装备个数 
	export var MAX_TASK_NAME = 48; // 任务名最大长度 
	export var MAX_TASK_DESC = 128; // 任务描述最大长度 
	export var MAX_HYPEROBJ_NUM = 3; // 最大超链接物件个数 
	export var MAX_HYPERLINK_LEN = 300; // 一段完整的超链接文本长度，包含超链接地址在内 
	export var MAX_HYPERLINK_COMMAND_LEN = 100; // 一条超链接地址最大长度 
	export var MAX_DOWNLOAD_PKG_DATA = 1000; // 单包所含最大资源长度 
	export var MAX_BIN_LIST_LEN = 30; // 最多同时获取的Bin的数量 
	export var MAX_REQUEST_RES_COUNT = 15; // 最大下载的资源包数 
	export var MAX_MD5CODE_LEN = 33; // MD5码长度 
	export var MAX_SLOTTABLE_STORE_MONEY = 3; // 桌台上最大存储的币 
	export var MAX_RANK_LIST_SIZE = 8; // 排行列表最大长度 
	export var MAX_CHAT_MSG_LEN = 4096; // 聊天信息的最大长度 
	export var MAX_LOTTERY_HERORANK_LIST_SIZE = 10; // 摩天轮英豪榜排行列表最大长度 
	export var MAX_LOTTERY_SCENE_HISPRIZE_LEN = 6; // 摩天轮历史开奖最大长度 
	export var MAX_ONLINERANK_LIST_SIZE = 8; // 在线列表最大长度 
	export var MAX_HISCHAT_LIST_SIZE = 10; // 历史聊天记录最大长度 
	export var MAX_CLASSICFRUIT_SCENE_HISPRIZE_LEN = 6; // 经典水果机历史开奖最大长度 
	export var MAX_NEWMSGTAG_LIST_LEN = 20; // 打点系统打点列表最大长度 
	export var MAX_ROLE_SELFDEF_PHOTO_LEN = 256; // 自定义头像地址最大长度 
	export var MAX_DRAWPIZEEHIS_LIST_LEN = 20; // 抽奖历史最大长度 
	export var MAX_MOBILE_LEN = 21; // 手机号最大长度 
	export var MAX_ROLE_SELFDEF_PIC_SIZE = 20480; // 上传头像最大大小 
	export var MAX_SHARK_SCENE_HISPRIZE_LEN = 8; // 鲨鱼场历史开奖最大长度 
	export var MAX_SHARK_BETON_LEN = 12; // 鲨鱼场下注列表最大长度 
	export var MAX_ALOGIN_CAHNNLE_LEN = 64; // 渠道号最大长度 
	export var MAX_DOWNLOAD_LINK_LEN = 1024; // 最大下载地址长度 
	export var MAX_CAR_SCENE_HISPRIZE_LEN = 8; // 车行历史开奖最大长度 
	export var MAX_CAR_BETON_LEN = 8; // 车行下注列表最大长度 
	export var MAX_RECOMMED_LIST_SIZE = 8; // 推荐列表最大长度 
	export var MAX_BULL_SCENE_HISRESULT_LEN = 10; // 牛牛场历史结果最大长度 
	export var MAX_BULL_BETON_LEN = 4; // 牛牛场下注列表最大长度 
	export var MAX_BULL_BAKER_QUEUE_LEN = 15; // 庄家队列最大长度 
	export var MAX_MAIL_LIST_COUNT = 6; // 邮件列表最大长度 
	export var MAX_MAIL_RECV_COUNT = 100; // 收件箱最大邮件数 
	export var MAX_MAIL_SEND_COUNT = 50; // 暂不支持:发件箱最大邮件数 
	export var MAX_MAIL_CONTENT_LEN = 1024; // 邮件内容数组最大长度 
	export var MAX_MAIL_TITLE_LEN = 64; // 邮件标题数组最大长度 
	export var MAX_MAIL_ATTACH_COUNT = 5; // 邮件附件列表数组最大个数 
	export var MAX_PAY_PAYCODELEN = 136; // 支付商品编码最大长度 
	export var MAX_PAY_VIEWCHANNEL_LEN = 10; // 支付显示渠道最大长度 
	export var MAX_PAY_VIVO_ORDERID_LEN = 256; // vivo返回的订单ID最大长度 
	export var MAX_PAY_VIVO_ACCESSKEY_LEN = 256; // vivo返回的accesskey最大长度 
	export var MAX_PAY_VIVO_APPID_LEN = 256; // vivo的appid最大长度 
	export var MAX_PAY_VIVO_ORDERTITLE_LEN = 128; // vivo的订单标题最大长度 
	export var MAX_PAY_VIVO_ORDERDESC_LEN = 256; // vivo的订单描述最大长度 
	export var MAX_CAR_BIGWINNERRANK_LIST_SIZE = 10; // 车行大富豪排行列表最大长度 
	export var MAX_BULL_BIGWINNER_RANK_LIST_SIZE = 10; // 牛牛场排行最大长度 
	export var MAX_VIEW_OBJ_COUNT = 25; // 最大可见角色个数 
	export var MAX_PAY_LENOVO_EXORDERID_LEN = 50; // lenovo的CP订单ID最大长度 
	export var MAX_PAY_LENOVO_PRIVATEINFO_LEN = 128; // lenovo的CP订单私有数据最大长度 
	export var MAX_PAY_COMM_PRIVATEINFO_LEN = 256; // 游戏内部订单私有数据最大长度 
	export var MAX_PAY_COMM_SELFORDER_LEN = 256; // 游戏内部订单号最大长度 
	export var MAX_ITEMSTORE_LIST_MAX_LEN = 50; // 物品商城列表最大长度 
	export var CLT_RES_TYPE_COMMON_CONF = 1; // 通用配置文件 
	export var CLT_RES_TYPE_COMMON_CONF_END = 2; // 标记每次请求的通用配置文件的最后一个文件中的包 
	export var CLT_RES_TYPE_MD5FILE_MD5 = 3; // md5列表文件的md5值 
	export var SEX_NONE = 0; // 无性别 
	export var SEX_MALE = 1; // 男 
	export var SEX_FEMALE = 2; // 女 
	export var SEX_SECRET = 3; // 保密 
	export var CHAT_CHANNEL_WORLD = 1; // 若后续有聊天系统为其中的全世界频道 
	export var CHAT_CHANNEL_ROOM = 2; // 本地频道比如摩天轮中的聊天窗口 
	export var CHAT_CHANNEL_SYSTEM = 3; // 若后续有聊天系统为其中的系统频道 
	export var CHAT_CHANNEL_LED = 4; // 全服跑马灯滚动消息 
	export var CHAT_CHANNEL_DELAY_SYSTEM = 5; // 特殊系统消息当转轮在转时需要延迟显示 
	export var CHAT_CHANNEL_SYSTEM_ROOM = 6; // 显示到聊天窗口的系统消息 
	export var NEWER_GIDESTAT_NOTFIN = 0; // 未完成 
	export var NEWER_GIDESTAT_HASFIN = 1; // 己完成 
	export var NEWER_GIDESTAT_SKIPPED = 2; // 己跳过 
	export var ERROR_TYPE_NORMAL = 0; // 普通的错误内容提示 
	export var ERROR_GOLD_NOTENOUGH = 4; // 金币不足 
	export var ERROR_ZJH_GOLDNOTOK_TOENTER = 67; // 扎金花金币不足不能进入相应场次 
	export var ERROR_GOTAWARD_FAIL_NEEDBIND = 76; // 没有绑定手机不能领取连续登录奖励在线奖励某些任务奖励 
	export var ERROR_DRAW_FAIL_NEEDBIND = 77; // 没有绑定手机不能抽奖 
	export var ERROR_CHAT_FAIL_NEEDBIND = 78; // 没有绑定手机不能聊天 
	export var ERROR_ZJH_ENTER_FAIL_NEEDBIND = 79; // 扎金花没有绑定手机不能进入相应场次 
	export var ERROR_FUNCMOD_NOTOPEN = 27; // 该功能己关闭 
	export var ERROR_ENTER_SCENE_VIPNOTENOUGH = 91; // VIP场为VIP玩家专享充值10元即可成为VIP 
	export var ERROR_ITEMSTORE_ITEM_NOTENOUGH = 151; // 金叶子兑换物品时库存不足 
	export var ERROR_ITEMSTORE_ITEMBUY_DAYLIMIT = 152; // 金叶子兑换物品时达到日限 
	export var OPERATERS_TYPE_UNKNOWN = 0; // 未知 
	export var OPERATERS_TYPE_MOBILE = 1; // 移动 
	export var OPERATERS_TYPE_UNICOM = 2; // 联通 
	export var OPERATERS_TYPE_TELECOM = 3; // 电信 
	export var SPEC_CHANNEL_VER_CLASSICFRUIT = 0; // 通用类型即万人游乐场 
	export var SPEC_CHANNEL_VER_CLASSICSEVEN = 1; // 经典七七七 
	export var SPEC_CHANNEL_VER_VIVO_CLASSICSEVEN = 2; // VIVO版本 
	export var SPEC_CHANNEL_VER_REALFRUIT = 3; // 真人水果街机 
	export var SPEC_CHANNEL_VER_BAIDUVERSION = 4; // 百度定制版本 
	export var SPEC_CHANNEL_VER_KUGOU = 5; // 酷狗定制版本 
	export var SPEC_CHANNEL_VER_SINA = 6; // 新浪定制版本 
	export var SPEC_CHANNEL_VER_FRUITMACHINE = 7; // 水果电玩机 
	export var SPEC_CHANNEL_VER_AQIYI = 8; // 爱奇艺版本 
	export var SPEC_CHANNEL_VER_LENOVO_REALFRUIT = 9; // 联想版本 
	export var SPEC_CHANNEL_VER_HAIMA_REALFRUIT = 10; // 海马版本 
	export var SPEC_CHANNEL_VER_LEGAME = 11; // 乐视 
	export var SPEC_CHANNEL_VER_SINASHOW = 5000; // 新浪show版本 
	export var SPEC_CHANNEL_VER_BUYUHALL = 5001; // 捕鱼大厅版本 
	export var CLT_PLATFORM_TYPE_UNKNOWN = 0; // 未知 
	export var CLT_PLATFORM_TYPE_ANDROID = 1; // ANDROID 
	export var CLT_PLATFORM_TYPE_IPHONE = 2; // IPHONE 
	export var WHEEL_VIEW_NONE = 0; // 除中奖展示之外的随机结果 
	export var WHEEL_VIEW_TONGZHONG = 1; // 铜钟 
	export var WHEEL_VIEW_QINGZAI = 2; // 青再 
	export var WHEEL_VIEW_LIZHI = 3; // 荔枝 
	export var WHEEL_VIEW_XIGUA = 4; // 西瓜 
	export var WHEEL_VIEW_RED_7 = 5; // 红七 
	export var WHEEL_VIEW_BLUE_7 = 6; // 蓝七 
	export var WHEEL_VIEW_GUIWUZHE = 7; // 鬼武者 
	export var WHEEL_VIEW_FENGCHE = 8; // 风车 
	export var WHEEL_VIEW_SUPERFENGCHE_RED7 = 9; // 超级风车及红7,目前不在转盘中,仅用于显示摩天轮历史数据中使用 
	export var WHEEL_VIEW_SUPERFENGCHE_BLUE7 = 10; // 超级风车及蓝7,目前不在转盘中,仅用于显示摩天轮历史数据中使用 
	export var WHEEL_VIEW_SMALL_BAR = 21; // 小BAR 
	export var WHEEL_VIEW_SMALL_SHUANG_7 = 22; // 小双7 
	export var WHEEL_VIEW_SMALL_SHUANG_XING = 23; // 小双星 
	export var WHEEL_VIEW_SMALL_XIGUA = 24; // 小西瓜 
	export var WHEEL_VIEW_SMALL_LINGDANG = 25; // 小铃铛 
	export var WHEEL_VIEW_SMALL_MUGUA = 26; // 小木瓜 
	export var WHEEL_VIEW_SMALL_JUZI = 27; // 小橘子 
	export var WHEEL_VIEW_SMALL_PINGGUO = 28; // 小苹果 
	export var WHEEL_VIEW_LARGE_BAR = 31; // 大BAR 
	export var WHEEL_VIEW_LARGE_SHUANG_7 = 32; // 大双7 
	export var WHEEL_VIEW_LARGE_SHUANG_XING = 33; // 大双星 
	export var WHEEL_VIEW_LARGE_XIGUA = 34; // 大西瓜 
	export var WHEEL_VIEW_LARGE_LINGDANG = 35; // 大铃铛 
	export var WHEEL_VIEW_LARGE_MUGUA = 36; // 大木瓜 
	export var WHEEL_VIEW_LARGE_JUZI = 37; // 大橘子 
	export var WHEEL_VIEW_LARGE_PINGGUO = 38; // 大苹果 
	export var WHEEL_VIEW_CAISHEN = 40; // 财神好像暂时用不上了 
	export var WHEEL_VIEW_XIAO_MANGUAN = 41; // 小满贯 
	export var WHEEL_VIEW_DA_MANGUAN = 42; // 大满贯 
	export var WHEEL_VIEW_DA_SIXI = 43; // 大四喜 
	export var WHEEL_VIEW_XIAO_SANYUAN = 44; // 小三元 
	export var WHEEL_VIEW_DA_SANYUAN = 45; // 大三元 
	export var WHEEL_VIEW_JINSHAYU = 51; // 金鲨鱼 
	export var WHEEL_VIEW_YINSHAYU = 52; // 银鲨鱼 
	export var WHEEL_VIEW_SHIZI = 53; // 狮子 
	export var WHEEL_VIEW_LAOYING = 54; // 老鹰 
	export var WHEEL_VIEW_XIONGMAO = 55; // 熊猫 
	export var WHEEL_VIEW_KONGQUE = 56; // 孔雀 
	export var WHEEL_VIEW_HOUZI = 57; // 猴子 
	export var WHEEL_VIEW_GEZI = 58; // 鸽子 
	export var WHEEL_VIEW_YANZI = 59; // 燕子 
	export var WHEEL_VIEW_TUZI = 60; // 兔子 
	export var WHEEL_VIEW_FEIQING = 61; // 飞禽 
	export var WHEEL_VIEW_ZOUSHOU = 62; // 走兽 
	export var WHEEL_VIEW_FALALI = 71; // 法拉利 
	export var WHEEL_VIEW_LBJN = 72; // 兰博基尼 
	export var WHEEL_VIEW_MSLD = 73; // 玛莎拉蒂 
	export var WHEEL_VIEW_BSJ = 74; // 保时捷 
	export var WHEEL_VIEW_BENCHI = 75; // 奔驰 
	export var WHEEL_VIEW_BMW = 76; // 宝马 
	export var WHEEL_VIEW_LKSS = 77; // 雷克萨斯 
	export var WHEEL_VIEW_DAZHONG = 78; // 大众 
	export var WHEEL_VIEW_LABA_WILD = 80; // 拉霸WILD 
	export var WHEEL_VIEW_LABA_BAR_1 = 81; // 拉霸BAR1 
	export var WHEEL_VIEW_LABA_BAR_2 = 82; // 拉霸BAR2 
	export var WHEEL_VIEW_LABA_BAR_3 = 83; // 拉霸BAR3 
	export var WHEEL_VIEW_LABA_CHERRY = 84; // 拉霸CHERRY 
	export var WHEEL_VIEW_LABA_BELL = 85; // 拉霸BELL 
	export var WHEEL_VIEW_LABA_DIAMOND = 86; // 拉霸DIAMOND 
	export var WHEEL_VIEW_LABA_7 = 87; // 拉霸SEVEN1 
	export var WHEEL_VIEW_LABA_77 = 88; // 拉霸SEVEN2 
	export var WHEEL_VIEW_LABA_777 = 89; // 拉霸SEVEN3 
	export var WHEEL_VIEW_LABA_ANYBAR = 90; // 拉霸ANYBAR 
	export var WHEEL_VIEW_LABA_ANY7 = 91; // 拉霸ANYSEVEN 
	export var ROUND_OPER_NONE = 0; // 没有操作顺序要求 
	export var ROUND_OPER_SEQUENCE = 1; // 顺押 
	export var ROUND_OPER_REVERSE = 2; // 逆押 
	export var OUTESIDE_MODE_NONE = 0; // 空模式 
	export var OUTESIDE_MODE_DAY = 1; // 白天 
	export var OUTESIDE_MODE_SUNSET = 2; // 傍晚 
	export var OUTESIDE_MODE_NIGHT = 3; // 黑夜 
	export var OUTESIDE_MODE_BONUSCONFIRM = 4; // Bonus确定 
	export var OUTESIDE_MODE_BONUSSENDING = 5; // Bonus开奖 
	export var SHOW_TYPE_NONE = 0; // 无表演 
	export var SHOW_TYPE_BOX = 1; // 宝箱 
	export var SHOW_TYPE_WHEELSIDE = 2; // 转轮边框 
	export var SHOW_TYPE_WHEELLIGHT = 3; // 转轮灭灯 
	export var SHOW_TYPE_TOPWHEEL = 4; // 顶部转盘 
	export var SHOW_TYPE_CLOUD = 5; // 云彩 
	export var SHOW_TYPE_DRAGON = 6; // 龙 
	export var SHOW_TYPE_TIGER = 7; // 虎 
	export var SHOW_TYPE_DRAGONTIGER = 8; // 龙虎 
	export var BONUS_TYPE_NONE = 0; // 无奖 
	export var BONUS_TYPE_REG = 1; // RB 
	export var BONUS_TYPE_BIG = 2; // BB 
	export var SPEC_BONUS_TYPE_NONE = 0; // 无奖 
	export var SPEC_BONUS_TYPE_1ST_OR_CHANCE = 1; // 1st bonus或者对应小奖的bonus chance 
	export var SPEC_BONUS_TYPE_2ND = 2; // 2nd bonus 
	export var SPEC_BONUS_TYPE_3RD = 3; // 3rd bonus 
	export var IS_FINAL_BONUS_ROUND_NO = 0; // 不是 
	export var IS_FINAL_BONUS_ROUND_YES = 1; // 是 
	export var IS_FINAL_BONUS_ROUND_YES_WHEN_OPWRONG = 2; // 当操作不正确时就是 
	export var CAN_BEGIN_SLOT_REASON_LOGIN = 0; // 登录时请求进入Slot桌台 
	export var CAN_BEGIN_SLOT_REASON_CHG_TABLE = 1; // 更换桌台 
	export var NEXT_ROUNDDATA_TYPE_NONEOP = 0; // 对应数据没有操作要求,直接取操作正确的对应字段 
	export var NEXT_ROUNDDATA_TYPE_OPLIMIT = 1; // 对应转数据有操作要求,根据操作结果取相应字段 
	export var TASK_STATUS_WORKING = 1; // 未完成 
	export var TASK_STATUS_FINISHED = 2; // 己完成 
	export var TASK_STATUS_HASGOTPRIZE = 3; // 已领取 
	export var TASK_TYPE_ALLLIFE = 0; // 终身一次任务 
	export var TASK_TYPE_CYCLE = 1; // 循环任务 
	export var TASK_TYPE_DAY = 2; // 按天任务 
	export var RANK_CLASS_VIPLVL = 1; // VIP榜 
	export var RANK_CLASS_HONOUR = 2; // 荣誉榜 
	export var RANK_CLASS_WEALTH = 3; // 财富榜 
	export var RANK_CLASS_LOTTERY_HERO = 4; // 摩天轮豪胜榜 
	export var RANK_CLASS_CHARGE = 5; // 充值榜 
	export var RANK_CLASS_CLASSFRUIT_BEBANKER = 6; // 坐庄榜 
	export var RANK_CLASS_CLASSFRUIT_DOCRUPT = 7; // 爆庄榜 
	export var RANK_CLASS_CLASSFRUIT_MAXWIN_ROUND = 8; // 豪胜榜 
	export var RANK_CLASS_CAR_BIGWINNER = 9; // 车行大赢家 
	export var RANK_CLASS_BULL_BIGWINNER = 10; // 牛牛场排行 
	export var RANK_CLASS_TORPEDO_HJ = 11; // 黄金鱼雷排行 
	export var RANK_CLASS_TORPEDO_BJ = 12; // 铂金鱼雷排行 
	export var RANK_CLASS_TORPEDO_HZ = 13; // 核子鱼雷排行 
	export var RANK_REFRESHTYPE_NONE = 0; // 不会定期刷新 
	export var RANK_REFRESHTYPE_WEEK = 1; // 按周刷新,目前暂时不支持 
	export var RANK_REFRESHTYPE_DAY = 2; // 按天刷新 
	export var CHAT_TYPE_USER_EDIT = 0; // 自定义内容 
	export var CHAT_TYPE_ZJH_PREDEF = 1; // 扎金花预定义聊天内容此时聊天内容里存放的是对应消息ID 
	export var LOTTERY_ONEBET_BASE_TAG_1 = 1; // 1,对应10枚的节奏 
	export var LOTTERY_ONEBET_BASE_TAG_2 = 2; // 2 
	export var LOTTERY_ONEBET_BASE_TAG_3 = 3; // 3 
	export var LOTTERY_ONEBET_BASE_TAG_4 = 4; // 4 
	export var LOTTERY_ONEBET_BASE_TAG_5 = 5; // 5 
	export var LOTTERY_CURSTATUS_CANBET = 1; // 下注中 
	export var LOTTERY_CURSTATUS_WILLRUNNING = 2; // 即奖开奖 
	export var LOTTERY_CURSTATUS_RUNNINGPRIZE = 3; // 开奖中,此时结果己知但还在发送奖励过程中 
	export var LOTTERY_CURSTATUS_BANKER_SETPRIZE = 4; // 庄家正在设置下一轮开奖中 
	export var en_SceneType_Begin = 0; // 枚举起始值无具体意义 
	export var en_SceneType_SlotTable = 1; // slot表 
	export var en_SceneType_Lottery = 2; // 大风车 
	export var en_SceneType_ClassicFruit = 3; // 水果机 
	export var en_SceneType_Hall = 4; // 大厅 
	export var en_SceneType_Shark = 5; // 鲨鱼场 
	export var en_SceneType_Car = 6; // 宝马场 
	export var en_SceneType_Zjh = 7; // 扎金花 
	export var en_SceneType_Bull = 8; // 斗牛 
	export var en_SceneType_GoldMiner = 9; // 黄金矿工 
	export var en_SceneType_GmOnly = 10; // GM场 
	export var en_SceneType_CatchFish = 11; // 捕鱼场 
	export var en_SceneType_LaBa = 12; // 拉霸场 
	export var en_SceneType_Zodiac = 13; // 星座场 
	export var MAP_TEMPLATE_ID_HALL = 1; // 展示大厅列表 
	export var MAP_TEMPLATE_ID_NORMAL_SLOT = 101; // 鬼武水果机台普通 
	export var MAP_TEMPLATE_ID_NORMAL_LOTTERY = 201; // 幸福摩天轮普通 
	export var MAP_TEMPLATE_ID_CLASSIC_FRUIT = 301; // 经典水果机普通 
	export var MAP_TEMPLATE_ID_CLASSIC_FRUIT_VIP = 302; // 经典水果机VIP 
	export var MAP_TEMPLATE_ID_SHARK = 501; // 鲨鱼场普通 
	export var MAP_TEMPLATE_ID_SHARK_VIP = 502; // 鲨鱼场VIP 
	export var MAP_TEMPLATE_ID_CAR = 601; // 车行普通 
	export var MAP_TEMPLATE_ID_ZJH_JUNIOR = 701; // 扎金花初级场 
	export var MAP_TEMPLATE_ID_ZJH_MEDIUM = 702; // 扎金花中级场 
	export var MAP_TEMPLATE_ID_ZJH_SENIOR = 703; // 扎金花高级场 
	export var MAP_TEMPLATE_ID_ZJH_PRIVATE = 704; // 扎金花贵宾厅 
	export var MAP_TEMPLATE_ID_NORMAL_BULL = 801; // 斗牛普通场 
	export var MAP_TEMPLATE_ID_GOLDMINER_JUNIOR = 901; // 黄金矿工初级场 
	export var MAP_TEMPLATE_ID_GOLDMINER_MEDIUM = 902; // 黄金矿工中级场 
	export var MAP_TEMPLATE_ID_GOLDMINER_SENIOR = 903; // 黄金矿工高级场 
	export var MAP_TEMPLATE_ID_GMONLY = 1001; // 内部GM场 
	export var MAP_TEMPLATE_ID_CATCHFISH = 1101; // 捕鱼场 
	export var MAP_TEMPLATE_ID_LABA_GOLD = 1201; // 拉霸普通场 
	export var MAP_TEMPLATE_ID_LABA_DIAMOND = 1202; // 拉霸钻石场 
	export var MAP_TEMPLATE_ID_HAPPY_MEINV_XIU = 9000; // 欢乐美女秀 
	export var MAP_TEMPLATE_ID_ZODIAC = 1301; // 星座场普通 
	export var CLASSFRUIT_BANKER_SWITCHTYPE_NONE = 0; // 无庄家相关信息需要展示 
	export var CLASSFRUIT_BANKER_SWITCHTYPE_ONE_STILL = 1; // 当前庄家继续上庄 
	export var CLASSFRUIT_BANKER_SWITCHTYPE_NEWONE = 2; // 新的庄家上庄 
	export var CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE = 3; // 当前庄家下庄 
	export var CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE = 4; // 当前庄家下庄且新玩家上庄 
	export var CLASSFRUIT_BANKER_STAT_NONE = 0; // 不是庄家 
	export var CLASSFRUIT_BANKER_STAT_INLIST = 1; // 在庄家排列列表中 
	export var CLASSFRUIT_BANKER_STAT_DO_BANKER = 2; // 当前是庄家 
	export var DRAW_PRIZE_GOLD = 1; // 一堆金币 
	export var DRAW_PRIZE_CHARGECARD = 2; // 充值卡 
	export var DRAW_PRIZE_XIAOMI_MOBILE_4 = 3; // 小米手机4 
	export var APPSTORE_REPUTATION_STATE_NONE = 0; // 未评论 
	export var APPSTORE_REPUTATION_STATE_WRITED = 1; // 已写好评 
	export var APPSTORE_REPUTATION_STATE_GOT_GIFT = 2; // 已领奖 
	export var MAIL_BOX_RECV = 1; // 收件箱 
	export var MAIL_BOX_SEND = 2; // 暂未支持:发件箱 
	export var SYSTEM_MAIL_TYPE = 1; // 系统邮件 
	export var NORMAL_MAIL_TYPE = 2; // 暂未支持:普通邮件 
	export var MAIL_STAT_HASREAD = 0x1; // 是否已读 
	export var MAIL_STAT_HASATTACH = 0x2; // 是否有附件 
	export var MAIL_STAT_HASGETATTACH = 0x4; // 是否已经取出了附件 
	export var DEL_MAIL_TYPE_ONE = 1; // 删除一封邮件 
	export var DEL_MAIL_TYPE_TRYBEST = 2; // 暂未支持:一键删除所有可以删除的邮件 
	export var GET_MAILATTACH_TYPE_ONE = 1; // 获取一封邮件的邮件 
	export var GET_MAILATTACH_TYPE_TRYBEST = 2; // 暂未支持:一键获取所有可以获取附件的邮件 
	export var MOBILE_BIND_CNA_DIRECT_DO = 1; // 可以直接进行绑定 
	export var MOBILE_BIND_MOBILE_ALREADY_BIND = 2; // 当前手机号已经绑定了帐号,接下来需要确认帐号迁移 
	export var CARDROOM_STATUS_NOTBEGIN = 0; // 未开始 
	export var CARDROOM_STATUS_READYING = 1; // 准备倒计时状态,本局时间是从切换到该状态开始计时 
	export var CARDROOM_STATUS_PLAYING = 2; // 一局游戏进行中 
	export var CARDPLAYER_STATUS_VIEWER = 0; // 旁观者 
	export var CARDPLAYER_STATUS_JUSTSEAT = 1; // 未开始 
	export var CARDPLAYER_STATUS_READY = 2; // 己准备 
	export var CARDPLAYER_STATUS_PLAYING = 3; // 游戏中 
	export var ZJH_PLAYER_MASK_NONE = 0x0; // 空 
	export var ZJH_PLAYER_MASK_HASSEEN_CARD = 0x1; // 己看牌 
	export var ZJH_PLAYER_MASK_DISCARD_CARD = 0x2; // 弃牌 
	export var ZJH_PLAYER_MASK_FORBID_COMPARE = 0x4; // 禁比 
	export var ZJH_PLAYER_MASK_DOUBLE = 0x8; // 双倍 
	export var ZJH_PLAYER_MASK_COMPARE_FAIL = 0x10; // 比牌输掉 
	export var ZJH_PLAYER_MASK_LOSTCONNECT = 0x20; // 掉线中 
	export var ZJH_PLAYER_MASK_DID_COMPARE = 0x40; // 参与过比牌 
	export var ZJH_PLAYER_MASK_KICKED_GAMEEND = 0x80; // 一局游戏结束后将被踢人卡踢出 
	export var ZJH_BETWAY_FOLLOW = 0; // 跟注 
	export var ZJH_BETWAY_ADDBET = 1; // 加注 
	export var ZJH_DOUBLETYPE_2 = 2; // 2倍 
	export var ZJH_DOUBLETYPE_4 = 4; // 4倍 
	export var ZJH_PLAYER_MATCHRET_WIN = 1; // 胜 
	export var ZJH_PLAYER_MATCHRET_LOSE = 2; // 输 
	export var ZJH_PLAYER_MATCHRET_DISCARD = 3; // 弃 
	export var BULL_SEAT_NORTH = 0; // 北 
	export var BULL_SEAT_WEST = 1; // 西 
	export var BULL_SEAT_SOUTH = 2; // 南 
	export var BULL_SEAT_EAST = 3; // 东 
	export var BULL_SEAT_BANKER = 4; // 庄 
	export var BULL_SEAT_COUNT = 5; //  
	export var BULL_PER_SEAT_CARDS_NUMBER = 5; //  
	export var BULL_SCENE_STATUS_IDLE = 0; // 闲置 
	export var BULL_SCENE_STATUS_WAIT_BET = 1; // 等待下注 
	export var BULL_SCENE_STATUS_WILL_SHOW_CARDS = 2; // 即将开牌 
	export var BULL_SCENE_STATUS_SHOW_CARDS = 3; // 开牌 
	export var BULL_SCENE_STATUS_REST = 4; // 休息 
	export var BULL_SCENE_STATUS_COUNT = 5; // 斗牛场状态数量 
	export var BULL_CHIP_TYPE1 = 0; // 100 
	export var BULL_CHIP_TYPE2 = 1; // 1000 
	export var BULL_CHIP_TYPE3 = 2; // 1万 
	export var BULL_CHIP_TYPE4 = 3; // 10万 
	export var BULL_CHIP_TYPE5 = 4; // 20万 
	export var BULL_CHIP_TYPE6 = 5; // 50万 
	export var BULL_CHIP_TYPE_COUNT = 6; //  
	export var BULL_CARDS_TYPE_NONE = 0; // 没牛 
	export var BULL_CARDS_TYPE_BULL1 = 1; // 牛丁 
	export var BULL_CARDS_TYPE_BULL2 = 2; // 牛2 
	export var BULL_CARDS_TYPE_BULL3 = 3; // 牛3 
	export var BULL_CARDS_TYPE_BULL4 = 4; // 牛4 
	export var BULL_CARDS_TYPE_BULL5 = 5; // 牛5 
	export var BULL_CARDS_TYPE_BULL6 = 6; // 牛6 
	export var BULL_CARDS_TYPE_BULL7 = 7; // 牛7 
	export var BULL_CARDS_TYPE_BULL8 = 8; // 牛8 
	export var BULL_CARDS_TYPE_BULL9 = 9; // 牛9 
	export var BULL_CARDS_TYPE_BULL = 10; // 牛牛 
	export var BULL_CARDS_TYPE_GUADY = 11; // 五花牛 
	export var BULL_CARDS_TYPE_BOMB = 12; // 四炸 
	export var BULL_CARDS_TYPE_LITTLE = 13; // 五小牛 
	export var CHARGE_PLATFORM_WEIPAI = 1; // 旧版支付中心:微派 
	export var CHARGE_PLATFORM_MM = 2; // 旧版支付中心:MM移动 
	export var CHARGE_PLATFORM_VIVO = 3; // 旧版支付中心:VIVO 
	export var CHARGE_PLATFORM_UNICOM = 4; // 己停止接入该支付平台旧版支付中心:联通unicom沃音乐 
	export var CHARGE_PLATFORM_LENOVO = 5; // 旧版支付中心:联想lenovo 
	export var CHARGE_PLATFORM_HAIMA = 6; // 旧版支付中心:海马 
	export var CHARGE_PLATFORM_INNER_ALIPAY = 7; // 内部占用:修正渠道 
	export var CHARGE_PLATFORM_INNER_UNION = 8; // 内部占用:修正渠道 
	export var CHARGE_PLATFORM_INNER_WEIXIN = 9; // 内部占用:修正渠道 
	export var CHARGE_PLATFORM_PAYCENTER_MM = 100; // 新版支付中心:MM移动 
	export var CHARGE_PLATFORM_PAYCENTER_ALIPAY = 101; // 新版支付中心:支付宝 
	export var CHARGE_PLATFORM_PAYCENTER_WEIXIN = 102; // 新版支付中心:微信 
	export var CHARGE_PLATFORM_PAYCENTER_UNIONPAY = 103; // 新版支付中心:银联 
	export var CHARGE_PLATFORM_PAYCENTER_PREPAID = 104; // 新版支付中心:预付卡 
	export var CHARGE_PLATFORM_PAYCENTER_ALIPAY_WAP = 105; // 新版支付中心:支付宝WAP版本 
	export var CHARGE_PLATFORM_PAYCENTER_UNIONPAY_WAP = 106; // 新版支付中心:银联WAP版本 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_IYOUXI = 107; // 新版支付中心:电信爱游戏 
	export var CHARGE_PLATFORM_PAYCENTER_PAYAPK_ALIPAY = 108; // 新版支付中心:单独支付apk中的支付宝 
	export var CHARGE_PLATFORM_PAYCENTER_PAYAPK_WEIXIN = 109; // 新版支付中心:单独支付apk中的微信 
	export var CHARGE_PLATFORM_PAYCENTER_PAYAPK_UNIONPAY = 110; // 新版支付中心:单独支付apk中的银联 
	export var CHARGE_PLATFORM_PAYCENTER_ZWXPROXY_WEIXIN_WAP = 111; // 新版支付中心:通过梓微兴代理接入的微信WAP支付 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_HUIYUAN = 112; // 新版支付中心:汇元 
	export var CHARGE_PLATFORM_PAYCENTER_COMMWAPPAY = 120; // 新版支付中心:WAP通用支付可后台自由切换 
	export var CHARGE_PLATFORM_PAYCENTER_COMMWAPPAY_WEIFUTONG = 121; // 新版支付中心(内部使用):WAP通用支付之威富通微信支付 
	export var CHARGE_PLATFORM_PAYCENTER_COMMWAPPAY_OFFCIALALIPAY = 122; // 新版支付中心(内部使用):WAP通用支付之官方支付宝 
	export var CHARGE_PLATFORM_PAYCENTER_COMMWAPPAY_OFFCIALUNION = 123; // 新版支付中心(内部使用):WAP通用支付之官方银联 
	export var CHARGE_PLATFORM_PAYCENTER_COMMWAPPAY_HUIYUAN = 124; // 新版支付中心(内部使用):WAP通用支付之汇元宝微信支付 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_VIVO = 150; // 新版支付中心第三方:VIVO 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_UNICOM = 151; // 己停止接入该支付平台新版支付中心第三方:联通unicom沃音乐 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_LENOVO = 152; // 新版支付中心第三方:联想lenovo 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_HAIMA = 153; // 新版支付中心第三方:海马 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_SHANXIPOINTS = 154; // 己废弃该新版支付中心第三方:陕西积分兑换 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_PINGXX = 155; // 新版支付中心第三方:pingxx 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_APPLE = 156; // 新版支付中心第三方:appstore 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_AIBEI = 157; // 新版支付中心第三方:爱贝 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_BAIDU = 158; // 新版支付中心第三方:百度移动游戏单机版 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_360 = 159; // 新版支付中心第三方:360 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_GOOGLE = 160; // 新版支付中心第三方:google 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_UC = 161; // 新版支付中心第三方:UC 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_WANDOU = 162; // 新版支付中心第三方:豌豆荚 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_ANZHI = 163; // 新版支付中心第三方:安智 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_YY = 164; // 新版支付中心第三方:YY 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_JOLO = 165; // 新版支付中心第三方:聚乐 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_YOUKU = 166; // 新版支付中心第三方:优酷 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_OPPO = 167; // 新版支付中心第三方:OPPO 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_SINASHOW = 168; // 新版支付中心第三方:新浪秀场秀币兑换 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_MIDAS = 169; // 新版支付中心第三方:米大师 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_MUMAYI = 170; // 新版支付中心第三方:木蚂蚁 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_NIUX = 171; // 新版支付中心第三方:迅雷NIUX 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_PAPA = 172; // 新版支付中心第三方:啪啪 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_LEGAME = 173; // 新版支付中心第三方:乐视 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_PP = 174; // 新版支付中心第三方:PP助手 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_XY = 175; // 新版支付中心第三方:XY 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_HUAWEI = 176; // 新版支付中心第三方:华为 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_QUANMINHUDONG = 177; // 新版支付中心第三方:全民互动 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_YSDK = 178; // 新版支付中心第三方:YSDK 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_CAOXIE = 179; // 新版支付中心第三方:草鞋 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_XIAOMI = 180; // 新版支付中心第三方:小米 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_LESHI = 181; // 新版支付中心第三方:乐视 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_PTPAY_YSDK = 182; // 新版支付中心第三方:PTPAY中的YSDK支付方式 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_PTPAY = 183; // 新版支付中心第三方:PTPAY的第三方支付方式目前为爱贝方式 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_SAMSUNG = 184; // 新版支付中心第三方:三星支付其实是爱贝支付方式的实现 
	export var CHARGE_PLATFORM_PAYCENTER_THIRD_JINLI = 185; // 新版支付中心第三方:金立 
	export var OPTION_PARA_KEY_PREPAID_CARDID = 1; // 己废弃不用的上行参数-预付卡卡号 
	export var OPTION_PARA_KEY_PREPAID_CARDPWD = 2; // 己废弃不用的上行参数-预付卡密码 
	export var OPTION_PARA_KEY_PINGXX_PAYCHANNEL = 3; // 上行参数-ping支付生成订单时选择的支付方式 
	export var OPTION_PARA_KEY_IOS_IDFA = 4; // 上行参数-IOS系统对应idfa 
	export var OPTION_PARA_KEY_ANDROID_ID = 5; // 上行参数-andoridid 
	export var OPTION_PARA_KEY_TDADVTRACK_APPID = 6; // 上行参数-若接了tdadvtrack对应了相应的APPKEY 
	export var OPTION_PARA_KEY_APP_NAME = 7; // 上行参数-应用名:传分别对应在AppStore和安桌分发市场中的应用名 
	export var OPTION_PARA_KEY_APP_ID = 8; // 上行参数-应用标识:苹果传IOS应用唯一标识和安卓传包名 
	export var OPTION_PARA_KEY_VIVO_ACCESS_KEY = 100; // 下行参数-VIVO生成商户订单后对应返回的accesskey 
	export var OPTION_PARA_KEY_VIVO_OUTER_ORDERID = 101; // 下行参数-VIVO生成商户订单后对应返回的VIVO订单号在客户端协议中使用 
	export var OPTION_PARA_KEY_WEIXIN_PREPAYID = 102; // 下行参数-微信生成的预支付回话标识用于后续接口调用中使用该值有效期为2小时 
	export var OPTION_PARA_KEY_ALIPAY_NOTIFYSVRURL = 103; // 下行参数-支付宝SDK支付成功后的后台通知地址 
	export var OPTION_PARA_KEY_UNIONPAY_PREPAYID = 104; // 下行参数-银联生成的预支付回话标识用于后续接口调用中使用 
	export var OPTION_PARA_KEY_WEIXIN_TIMESTAMP = 105; // 下行参数-微信生成的时间戳timestamp后续发起支付接口调用中使用该值 
	export var OPTION_PARA_KEY_WEIXIN_NONCESTR = 106; // 下行参数-微信生成的随机串noncestr后续发起支付接口调用中使用该值 
	export var OPTION_PARA_KEY_WEIXIN_SIGN = 107; // 下行参数-微信生成的签名值sign后续发起支付接口调用中使用该值 
	export var OPTION_PARA_KEY_WEIXIN_CPID = 108; // 下行参数-微信支付对应的商户IDCPID 
	export var OPTION_PARA_KEY_PINGXX_CHARGEOBJ = 109; // 下行参数-pingxx支付生成订单时返回的支付凭据 
	export var OPTION_PARA_KEY_REAL_THIRD_APPID = 110; // 下行参数-各种支付平台配置的真实的应用ID与上行appid不一定一致真实的应用APPID没有下发或者下发的是空的情况都以本地为准 
	export var OPTION_PARA_KEY_AIBEI_TRANSID = 111; // 下行参数-爱贝生成的预支付交易ID用于后续接口调用中使用 
	export var OPTION_PARA_KEY_UNIONPAY_WAP_POSTDATA = 112; // 下行参数-银联WAP支付生成的post数据用于请求网页支付 
	export var OPTION_PARA_KEY_UNIONPAY_WAP_POSTDATA_URL = 113; // 下行参数-银联WAP支付生成的post数据访问的网页地址 
	export var OPTION_PARA_KEY_ALIPAY_WAP_POSTDATA = 114; // 下行参数-支付宝WAP支付生成的post数据用于请求网页支付 
	export var OPTION_PARA_KEY_ALIPAY_WAP_POSTDATA_URL = 115; // 下行参数-支付宝WAP支付生成的post数据访问的网页地址 
	export var OPTION_PARA_KEY_ALIPAY_CPID = 116; // 下行参数-支付宝SDK支付对应的商户ID也即partner id 
	export var OPTION_PARA_KEY_ALIPAY_CPPRIVATEKEY = 117; // 下行参数-支付宝SDK支付对应的商户私钥 
	export var OPTION_PARA_KEY_UNIONPAY_WAP_RETURNGAME_URL = 118; // 下行参数-银联WAP支付对应的银联页面返回游戏的地址 
	export var OPTION_PARA_KEY_360_NOTIFYSVRURL = 119; // 下行参数-360SDK支付成功后的后台通知地址 
	export var OPTION_PARA_KEY_ALIPAY_SELLER_ID = 120; // 下行参数-支付宝SDK支付对应的卖家支付宝账号对应的唯一用户号是一串数字 
	export var OPTION_PARA_KEY_ALIPAY_SELLER_ACCOUNT = 121; // 下行参数-支付宝SDK支付对应的卖家支付宝账号是一个email或者是手机号码格式 
	export var OPTION_PARA_KEY_MM_APPTOKEN = 122; // 下行参数-MM支付对应的appkey 
	export var OPTION_PARA_KEY_360_GET_USER_INFO_URL = 123; // 下行参数-360登录后拉取用户信息的URL 
	export var OPTION_PARA_KEY_GAME_USER_NAME = 124; // 下行参数-游戏内部用户名称 
	export var OPTION_PARA_KEY_GAME_USER_ID = 125; // 下行参数-游戏内部用户ID 
	export var OPTION_PARA_KEY_GOODS_NAME = 126; // 下行参数-支付项对应的商品名称若为空以客户端本地内容为准 
	export var OPTION_PARA_KEY_COMM_NOTIFYSVRURL = 127; // 下行参数-当需要时填充对应的游戏服务器充值成功通知地址 
	export var OPTION_PARA_KEY_COMM_CP_SECURITY_KEY = 128; // 下行参数-根据具体需求填入游戏的秘钥，私钥或者其他秘钥 
	export var OPTION_PARA_KEY_COMM_APP_KEY = 129; // 下行参数-根据具体需求填入AppKey 
	export var OPTION_PARA_KEY_COMM_APP_SECURIT = 130; // 下行参数-根据具体需求填入AppScret 
	export var OPTION_PARA_KEY_PAY_APK_NAME = 131; // 下行参数-独立支付APK的包名 
	export var OPTION_PARA_KEY_PAY_APK_DOWNLOAD_URL = 132; // 下行参数-独立支付APK对应的下载地址 
	export var OPTION_PARA_KEY_PAY_APK_VERSION = 133; // 下行参数-独立支付APK对应的版本号 
	export var OPTION_PARA_KEY_PAY_ZWX_PREPAY_URL = 134; // 下行参数-通过梓微兴代理接入的微信H5支付对应的URL 
	export var OPTION_PARA_KEY_GEN_ORDER_TIME = 135; // 下行参数-订单生成时间 
	export var OPTION_PARA_COMMWAPPAY_DATA = 136; // 下行参数-通用WAP请求中的数据(仅为POST请求时有效) 
	export var OPTION_PARA_COMMWAPPAY_URL = 137; // 下行参数-通用WAP请求中的网页访问地址(若为get请求己包含所有参数 
	export var OPTION_PARA_COMMWAPPAY_HTTPTYPE = 138; // 下行参数-通用WAP请求中的网页http方式:目前支持get或者post 
	export var OPTION_PARA_COMMWAPPAY_VISITTYPE = 139; // 下行参数-通用WAP请求中的请求方式:目前支持browser或者innerpage 
	export var OPTION_PARA_KEY_CLIENT_IP = 200; // 内部参数-发起请求的客户端IP 
	export var OPTION_PARA_KEY_CLIENT_OSTYPE = 201; // 内部参数-发起请求的客户端平台类型adnroid or ios 
	export var OPTION_PARA_COMM_POSTDATA = 202; // 下行参数-生成的post数据用于请求网页支付 
	export var OPTION_PARA_COMM_POSTDATA_URL = 203; // 下行参数-生成的post数据访问的网页地址 
	export var PREPAID_CARD_TYPE_CHINAMOBILE_COMMON = 1; // 全国移动充值卡 
	export var PREPAID_CARD_TYPE_CHINAUNICOM_COMMON = 2; // 全国联通一卡充 
	export var PREPAID_CARD_TYPE_CHINATELECOM_COMMON = 3; // 中国电信充值付费卡 
	export var GOLDMINE_HEAPTYPE_GOLD = 1; // 金矿 
	export var GOLDMINE_HEAPTYPE_GEM = 2; // 宝石 
	export var PHRASE_DOGAME_TIPSCODE_CANDOTASK = 0; // 需要进行成语游戏 
	export var PHRASE_DOGAME_TIPSCODE_DAYGAMELIMIT = 1; // 今天已经选错太多次啦请明天再来吧 
	export var PHRASE_DOGAME_TIPSCODE_ACCFORBID = 2; // 达到连续多日限制的提示直接己封号 
	export var PHRASE_DOGAME_TIPSCODE_REFRESHLIMIT = 3; // 更换成语次数达到限制 
	export var PHRASE_DOGAME_TIPSCODE_PHRASELIMIT = 4; // 这个成语选错3次啦 
	export var PHRASE_DOGAME_TIPSCODE_VERIFYFAIL = 5; // 成语较验失败 
	export var PHRASE_DOGAME_TIPSCODE_VERIFYSUCC = 6; // 成语较验成功 
	export var PHRASE_DOGAME_TIPSCODE_HASFIN_TASK = 7; // 今天已经完成过该游戏了可以接着进入游戏下一步操作 
	export var HYPER_MSGBOX_TYPE = 0; // 基础提示框 
	export var HYPER_CMD_FORCE_UPDATE = 1; // 按强更处理参数1为更新链接各参数用两个#分隔 
	export var HYPER_CMD_SUGGEST_UPDATE = 2; // 建议更新提示参数1为更新链接各参数用两个#分隔 
	export var HYPER_CMD_AUTO_WRAPSCENE = 3; // 直接帮玩家点击切换场次参数1跳转到的场景模板ID 
	export var HYPER_CMD_AUTO_OPENUI = 4; // 直接帮玩家点击切换打开某个UI参数1为打开的UI界面枚举参见开关功能枚举值 
	export var SINASHOW_MONEY_EXCHANGE_TYPE_IN_TOGOLD = 1; // 兑入游戏币 
	export var SINASHOW_MONEY_EXCHANGE_TYPE_OUT_TOSHOWBI = 2; // 兑出到秀币 
	export var LABA_PLAY_TYPE_NORMAL = 0; // 正常玩 
	export var LABA_PLAY_TYPE_FREE = 1; // 免费玩 
	export var LABA_AWARD_TYPE_NOTAWARD = 0; // 未中奖 
	export var LABA_AWARD_TYPE_NORMAL = 1; // 普通奖 
	export var LABA_AWARD_TYPE_SPECIAL_ANY7 = 2; // ANY7大奖 
	export var LABA_AWARD_TYPE_SPECIAL_7 = 3; // 7大奖 
	export var LABA_AWARD_TYPE_SPECIAL_77 = 4; // 77大奖 
	export var LABA_AWARD_TYPE_SPECIAL_777 = 5; // 777大奖 
	export var LABA_AWARD_TYPE_LUCKY = 6; // 幸运大奖 
	export var NEWACCSYSTEM_CHANNEL_VISITOR = 0; // 访客 
	export var NEWACCSYSTEM_CHANNEL_MOBILE = 1; // 手机号 
	export var NEWACCSYSTEM_CHANNEL_VIVO = 2; // VIVO 
	export var NEWACCSYSTEM_CHANNEL_LEGAME = 3; // 乐视 
	export var ITEMSTORE_ITEMSTAT_NORMAL = 0; // 正常售卖 
	export var ITEMSTORE_ITEMSTAT_OFF = 1; // 己下架 
	export var ITEMSTORE_SPECIALMASK_NOSUPPLY = 0; // 第0个bit位为1表明缺货 
	export var ITEMSTORE_SPECIALMASK_HOT = 1; // 第1个bit位为1表明热卖中 
	export var ZODIAC_SCENE_STATUS_IDLE = 0; // 闲置 
	export var ZODIAC_SCENE_STATUS_WAIT_BET = 1; // 等待下注 
	export var ZODIAC_SCENE_STATUS_WILL_SHOW_RESULT = 2; // 即将出结果 
	export var ZODIAC_SCENE_STATUS_SHOW_RESULT = 3; // 出结果 
	export var ZODIAC_SCENE_STATUS_COUNT = 4; // 状态数量 
	export var ZODIAC_SCENE_ITEM_GROUP_0 = 0; // 对应转盘最外圈:即包含白羊、金牛等的圈 
	export var ZODIAC_SCENE_ITEM_GROUP_1 = 1; // 对应转盘中间圈:即包含风、水等的圈 
	export var ZODIAC_SCENE_ITEM_GROUP_2 = 2; // 对应转盘最里圈:即包含太阳、月亮等的圈 
	export var ZODIAC_SCENE_ITEM_GROUP_BUNCH = 3; // 对应转盘虚拟圈:即串2，串3等 
	export var ZODIAC_SCENE_ITEM_GROUP_COUNT = 4; // 分组数量 
	export var ZODIAC_SCENE_ITEM_0_0_SHUIPING = 0; // 对应最外圈的水瓶(对应1月),依次往下是按星座的配置标准顺序 
	export var ZODIAC_SCENE_ITEM_0_1 = 1; // 双鱼 
	export var ZODIAC_SCENE_ITEM_0_2 = 2; //  
	export var ZODIAC_SCENE_ITEM_0_3 = 3; //  
	export var ZODIAC_SCENE_ITEM_0_4 = 4; //  
	export var ZODIAC_SCENE_ITEM_0_5 = 5; //  
	export var ZODIAC_SCENE_ITEM_0_6 = 6; //  
	export var ZODIAC_SCENE_ITEM_0_7 = 7; //  
	export var ZODIAC_SCENE_ITEM_0_8 = 8; //  
	export var ZODIAC_SCENE_ITEM_0_9 = 9; //  
	export var ZODIAC_SCENE_ITEM_0_10 = 10; //  
	export var ZODIAC_SCENE_ITEM_0_11 = 11; // 摩羯 
	export var ZODIAC_SCENE_ITEM_1_0_FENG = 12; // 风 
	export var ZODIAC_SCENE_ITEM_1_1 = 13; // 火 
	export var ZODIAC_SCENE_ITEM_1_2 = 14; // 水 
	export var ZODIAC_SCENE_ITEM_1_3 = 15; // 土 
	export var ZODIAC_SCENE_ITEM_1_4 = 16; // 雷 
	export var ZODIAC_SCENE_ITEM_2_0_TAIYANG = 17; // 太阳 
	export var ZODIAC_SCENE_ITEM_2_1_YUELIANG = 18; // 月亮 
	export var ZODIAC_SCENE_ITEM_3_0_BUNCH2 = 19; // 串2 
	export var ZODIAC_SCENE_ITEM_3_1_BUNCH3 = 20; // 串3 
	export var ZODIAC_SCENE_ITEM_COUNT = 21; //  
	export var ZODIAC_SCENE_ITEMBUNCH_0AND1 = 0; // 0串1 
	export var ZODIAC_SCENE_ITEMBUNCH_2AND1 = 1; // 2串1 
	export var ZODIAC_SCENE_ITEMBUNCH_0AND2 = 2; // 0串2 
	export var ZODIAC_SCENE_ITEMBUNCH_0AND1AND2 = 3; // 1串2串3 
	export var ZODIAC_SCENE_ITEMBUNCH_COUNT = 4; //  

	//body export
	export class PROPERTY implements message {
		public bPropType: number = 0;  //属性key 
		public llPropValue: number = 0;  //属性值 

		public messageName(): string { return "PROPERTY";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bPropType);
			encodeBuffer.write(Float64Array, this.llPropValue);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bPropType = decodeBuffer.read(Uint8Array, 1);
			this.llPropValue = decodeBuffer.read(Float64Array, 1);
			return decodeBuffer.length();
		}
	}

	export class Privilege implements message {
		public dwPrivilegeFlag: number = 0;  //玩家特殊特权的标志，按位元计算的 
		public wVipLevel: number = 0;  //玩家特殊特权的等级 

		public messageName(): string { return "Privilege";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwPrivilegeFlag);
			encodeBuffer.write(Uint16Array, this.wVipLevel);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwPrivilegeFlag = decodeBuffer.read(Uint32Array, 1);
			this.wVipLevel = decodeBuffer.read(Uint16Array, 1);
			return decodeBuffer.length();
		}
	}

	export class OnlineGiftPara implements message {
		public bHasNextGift: number = 0;  //1表明还可以倒计时领取下一个在线时长礼包 
		public wLeftSeconds: number = 0;  //下一个倒计时时长单位秒 
		public wGiftGold: number = 0;  //对应礼包的金币数 
		public wVipGoldRatio: number = 0;  //对应礼包的VIP可领取金币的倍数百分比 

		public messageName(): string { return "OnlineGiftPara";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bHasNextGift);
			encodeBuffer.write(Uint16Array, this.wLeftSeconds);
			encodeBuffer.write(Uint16Array, this.wGiftGold);
			if (9<csproto.CSProto.Version) {
				encodeBuffer.write(Uint16Array, this.wVipGoldRatio);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bHasNextGift = decodeBuffer.read(Uint8Array, 1);
			this.wLeftSeconds = decodeBuffer.read(Uint16Array, 1);
			this.wGiftGold = decodeBuffer.read(Uint16Array, 1);
			if (9<csproto.CSProto.Version) {
				this.wVipGoldRatio = decodeBuffer.read(Uint16Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class RoleBase implements message {
		public bSex: number = 0;  //性别 
		public wMapID: number = 0;  //1 
		public szName: string = "";  //1 
		public szSelfDefPhoto: string = "";  //玩家自定义头像,长度不为0时以此为准 
		public szMobile: string = "";  //玩家手机号 
		public astPlayerAttr: Array<PROPERTY> = new Array<PROPERTY>();  //玩家属性集 

		public messageName(): string { return "RoleBase";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bSex);
			encodeBuffer.write(Uint16Array, this.wMapID);
			encodeBuffer.writeString(this.szName, MAX_ROLE_NAME_LEN);
			encodeBuffer.writeString(this.szSelfDefPhoto, MAX_ROLE_SELFDEF_PHOTO_LEN);
			encodeBuffer.writeString(this.szMobile, MAX_MOBILE_LEN);
			var astPlayerAttrSize = this.astPlayerAttr.length > LIFEATT_MAXVAL ? LIFEATT_MAXVAL : this.astPlayerAttr.length;
			encodeBuffer.write(Uint16Array, astPlayerAttrSize);
			this.astPlayerAttr.length = astPlayerAttrSize;
			for (var i = 0; i <  astPlayerAttrSize; i++) {
				encodeBuffer.skip(this.astPlayerAttr[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bSex = decodeBuffer.read(Uint8Array, 1);
			this.wMapID = decodeBuffer.read(Uint16Array, 1);
			this.szName = decodeBuffer.readString(MAX_ROLE_NAME_LEN);
			this.szSelfDefPhoto = decodeBuffer.readString(MAX_ROLE_SELFDEF_PHOTO_LEN);
			this.szMobile = decodeBuffer.readString(MAX_MOBILE_LEN);
			var astPlayerAttrSize = decodeBuffer.read(Uint16Array, 1);
			this.astPlayerAttr = new Array<PROPERTY>(astPlayerAttrSize);
			for (var i = 0; i <  astPlayerAttrSize; i++) {
				this.astPlayerAttr[i] = new PROPERTY();
				decodeBuffer.skip(this.astPlayerAttr[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class RoleMisc implements message {
		public dwObjectID: number = 0;  //唯一标识handle 
		public stBase: RoleBase = new RoleBase();  //角色详细基本信息 
		public stPrivilege: Privilege = new Privilege();  //玩家特权信息 
		public stOnlineGift: OnlineGiftPara = new OnlineGiftPara();  //本阶段玩家在线礼包相关信息 
		public stNextOnlineGift: OnlineGiftPara = new OnlineGiftPara();  //下一阶段玩家在线礼包相关信息 
		public szAuthToken: string = "";  //对应的用于其他游戏登录该游戏平台的token 

		public messageName(): string { return "RoleMisc";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwObjectID);
			encodeBuffer.skip(this.stBase.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.skip(this.stPrivilege.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			if (3<csproto.CSProto.Version) {
				encodeBuffer.skip(this.stOnlineGift.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			if (9<csproto.CSProto.Version) {
				encodeBuffer.skip(this.stNextOnlineGift.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			if (29<csproto.CSProto.Version) {
				encodeBuffer.writeString(this.szAuthToken, MAX_ACCOUNT_LEN);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwObjectID = decodeBuffer.read(Uint32Array, 1);
			decodeBuffer.skip(this.stBase.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			decodeBuffer.skip(this.stPrivilege.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			if (3<csproto.CSProto.Version) {
				decodeBuffer.skip(this.stOnlineGift.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			if (9<csproto.CSProto.Version) {
				decodeBuffer.skip(this.stNextOnlineGift.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			if (29<csproto.CSProto.Version) {
				this.szAuthToken = decodeBuffer.readString(MAX_ACCOUNT_LEN);
			}
			return decodeBuffer.length();
		}
	}

	export class ENTERVIEW_PLAYER implements message {
		public wVipLevel: number = 0;  //VIP等级 
		public szName: string = "";  //字符串类型的名字 
		public bSex: number = 0;  //性别,目前不会用到 
		public bHeadPhoto: number = 0;  //系统头像,目前不会用到 
		public llOwnGold: number = 0;  //拥有的金币 
		public szSelfDefPhoto: string = "";  //玩家自定义头像,长度不为0时以此为准 
		public wPosX: number = 0;  //位置X,对于房间内的第一个玩家是1，其他依次类推 
		public wPosY: number = 0;  //位置Y,目前没有用到 
		public dwReserve1: number = 0;  //保留字段1 
		public dwReserve2: number = 0;  //保留字段1 
		public llRoleBornID: number = 0;  //角色ID 
		public llReserve4: number = 0;  //保留字段4 

		public messageName(): string { return "ENTERVIEW_PLAYER";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wVipLevel);
			encodeBuffer.writeString(this.szName, MAX_ROLE_NAME_LEN);
			encodeBuffer.write(Uint8Array, this.bSex);
			encodeBuffer.write(Uint8Array, this.bHeadPhoto);
			encodeBuffer.write(Float64Array, this.llOwnGold);
			encodeBuffer.writeString(this.szSelfDefPhoto, MAX_ROLE_SELFDEF_PHOTO_LEN);
			encodeBuffer.write(Uint16Array, this.wPosX);
			encodeBuffer.write(Uint16Array, this.wPosY);
			encodeBuffer.write(Uint32Array, this.dwReserve1);
			encodeBuffer.write(Uint32Array, this.dwReserve2);
			encodeBuffer.write(Float64Array, this.llRoleBornID);
			encodeBuffer.write(Float64Array, this.llReserve4);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wVipLevel = decodeBuffer.read(Uint16Array, 1);
			this.szName = decodeBuffer.readString(MAX_ROLE_NAME_LEN);
			this.bSex = decodeBuffer.read(Uint8Array, 1);
			this.bHeadPhoto = decodeBuffer.read(Uint8Array, 1);
			this.llOwnGold = decodeBuffer.read(Float64Array, 1);
			this.szSelfDefPhoto = decodeBuffer.readString(MAX_ROLE_SELFDEF_PHOTO_LEN);
			this.wPosX = decodeBuffer.read(Uint16Array, 1);
			this.wPosY = decodeBuffer.read(Uint16Array, 1);
			this.dwReserve1 = decodeBuffer.read(Uint32Array, 1);
			this.dwReserve2 = decodeBuffer.read(Uint32Array, 1);
			this.llRoleBornID = decodeBuffer.read(Float64Array, 1);
			this.llReserve4 = decodeBuffer.read(Float64Array, 1);
			return decodeBuffer.length();
		}
	}

	export class OBJ_ENTERVIEW implements message {
		public dwObjectID: number = 0;  //实体handle 
		public bObjectType: number = 0;  //对象类型 
		public stPlayer: ENTERVIEW_PLAYER = new ENTERVIEW_PLAYER();  //如果是用户类型 

		public messageName(): string { return "OBJ_ENTERVIEW";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwObjectID);
			encodeBuffer.write(Uint8Array, this.bObjectType);
			if (this.bObjectType==OBJPLAYER) {
				encodeBuffer.skip(this.stPlayer.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwObjectID = decodeBuffer.read(Uint32Array, 1);
			this.bObjectType = decodeBuffer.read(Uint8Array, 1);
			if (this.bObjectType==OBJPLAYER) {
				decodeBuffer.skip(this.stPlayer.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class OBJ_LEAVEVIEW implements message {
		public dwObjectID: number = 0;  //实体handle 
		public bObjectType: number = 0;  //对象类型目前应该仅会有OBJPLAYER 

		public messageName(): string { return "OBJ_LEAVEVIEW";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwObjectID);
			encodeBuffer.write(Uint8Array, this.bObjectType);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwObjectID = decodeBuffer.read(Uint32Array, 1);
			this.bObjectType = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class PackObj implements message {
		public bObjectType: number = 0;  //包裹对象类型 
		public stRolePropPack: PROPERTY = new PROPERTY();  //属性类,目前主要用于邮件 

		public messageName(): string { return "PackObj";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bObjectType);
			if (this.bObjectType==OBJROLEPROP) {
				encodeBuffer.skip(this.stRolePropPack.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bObjectType = decodeBuffer.read(Uint8Array, 1);
			if (this.bObjectType==OBJROLEPROP) {
				decodeBuffer.skip(this.stRolePropPack.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class PageBreakPara implements message {
		public wPageIndex: number = 0;  //对应的页序号，注意统一从1开始 
		public wPageSize: number = 0;  //一页的大小 
		public wTotalPages: number = 0;  //总页数 
		public dwTotalCount: number = 0;  //对应查询结果的总个数 

		public messageName(): string { return "PageBreakPara";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wPageIndex);
			encodeBuffer.write(Uint16Array, this.wPageSize);
			encodeBuffer.write(Uint16Array, this.wTotalPages);
			encodeBuffer.write(Uint32Array, this.dwTotalCount);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wPageIndex = decodeBuffer.read(Uint16Array, 1);
			this.wPageSize = decodeBuffer.read(Uint16Array, 1);
			this.wTotalPages = decodeBuffer.read(Uint16Array, 1);
			this.dwTotalCount = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_ERROR_SC implements message {
		public bErrType: number = 0;  //错误码类型,参见ERROR_TYPE_NORMAL等定义 
		public wErrCode: number = 0;  //错误码值,对于客户端关心的错误码值可以根据这个处理 
		public szErrMsg: string = "";  //错误信息 

		public messageName(): string { return "CMD_ERROR";}
		public messageValue(): number { return CMD_ERROR;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bErrType);
			encodeBuffer.write(Uint16Array, this.wErrCode);
			encodeBuffer.writeString(this.szErrMsg, MAX_ERROR_MSG_LEN);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bErrType = decodeBuffer.read(Uint8Array, 1);
			this.wErrCode = decodeBuffer.read(Uint16Array, 1);
			this.szErrMsg = decodeBuffer.readString(MAX_ERROR_MSG_LEN);
			return decodeBuffer.length();
		}
	}

	export class CMD_GOLD_NOTENOUGH_ERROR_SC implements message {
		public szErrMsg: string = "";  //错误信息 
		public bOperatersType: number = 0;  //运营商类型,参见OPERATERS_TYPE_MOBILE等枚举定义 
		public szPayCode: string = "";  //推荐的支付代码若客户端不支持的需要做容错 
		public llNeedMoreGold: number = 0;  //需要额外的金币数 

		public messageName(): string { return "CMD_GOLD_NOTENOUGH_ERROR";}
		public messageValue(): number { return CMD_GOLD_NOTENOUGH_ERROR;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szErrMsg, MAX_ERROR_MSG_LEN);
			encodeBuffer.write(Uint8Array, this.bOperatersType);
			encodeBuffer.writeString(this.szPayCode, 32);
			if (12<csproto.CSProto.Version) {
				encodeBuffer.write(Float64Array, this.llNeedMoreGold);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szErrMsg = decodeBuffer.readString(MAX_ERROR_MSG_LEN);
			this.bOperatersType = decodeBuffer.read(Uint8Array, 1);
			this.szPayCode = decodeBuffer.readString(32);
			if (12<csproto.CSProto.Version) {
				this.llNeedMoreGold = decodeBuffer.read(Float64Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_TEST_ECHO_CS implements message {
		public szEchoMsg: string = "";  //echo内容 

		public messageName(): string { return "CMD_TEST_ECHO";}
		public messageValue(): number { return CMD_TEST_ECHO;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szEchoMsg, 100);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szEchoMsg = decodeBuffer.readString(100);
			return decodeBuffer.length();
		}
	}

	export class CMD_TEST_ECHO_SC implements message {
		public szEchoMsg: string = "";  //echo内容 

		public messageName(): string { return "CMD_TEST_ECHO";}
		public messageValue(): number { return CMD_TEST_ECHO;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szEchoMsg, 100);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szEchoMsg = decodeBuffer.readString(100);
			return decodeBuffer.length();
		}
	}

	export class ResID implements message {
		public szResID: string = "";  //ResID 

		public messageName(): string { return "ResID";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szResID, 128);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szResID = decodeBuffer.readString(128);
			return decodeBuffer.length();
		}
	}

	export class MD5Code implements message {
		public szResID: string = "";  //ResID 
		public szMD5: string = "";  //MD5码 

		public messageName(): string { return "MD5Code";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szResID, 128);
			encodeBuffer.writeString(this.szMD5, MAX_MD5CODE_LEN);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szResID = decodeBuffer.readString(128);
			this.szMD5 = decodeBuffer.readString(MAX_MD5CODE_LEN);
			return decodeBuffer.length();
		}
	}

	export class CMD_REQUEST_RES_CS implements message {
		public bType: number = 0;  //客户端下载资源类型参见CLT_RES_TYPE_COMMON_CONF等定义 
		public astResList: Array<ResID> = new Array<ResID>();  //资源列表ID 

		public messageName(): string { return "CMD_REQUEST_RES";}
		public messageValue(): number { return CMD_REQUEST_RES;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bType);
			var astResListSize = this.astResList.length > MAX_BIN_LIST_LEN ? MAX_BIN_LIST_LEN : this.astResList.length;
			encodeBuffer.write(Uint16Array, astResListSize);
			this.astResList.length = astResListSize;
			for (var i = 0; i <  astResListSize; i++) {
				encodeBuffer.skip(this.astResList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bType = decodeBuffer.read(Uint8Array, 1);
			var astResListSize = decodeBuffer.read(Uint16Array, 1);
			this.astResList = new Array<ResID>(astResListSize);
			for (var i = 0; i <  astResListSize; i++) {
				this.astResList[i] = new ResID();
				decodeBuffer.skip(this.astResList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_REQUEST_RES_SC implements message {
		public bType: number = 0;  //客户端下载资源类型参见CLT_RES_TYPE_COMMON_CONF等定义 
		public szResID: string = "";  //ResID 
		public bSegCount: number = 0;  //调整为特殊含义,分段总数,大于3永远是3 
		public bSegID: number = 0;  //调整为特殊含义,分段ID,第1个是0,中间是1,最后是2 
		public szSegData: Array<number> = new Array<number>();  //分段数据 

		public messageName(): string { return "CMD_REQUEST_RES";}
		public messageValue(): number { return CMD_REQUEST_RES;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bType);
			encodeBuffer.writeString(this.szResID, 128);
			encodeBuffer.write(Uint8Array, this.bSegCount);
			encodeBuffer.write(Uint8Array, this.bSegID);
			var szSegDataSize = this.szSegData.length > MAX_DOWNLOAD_PKG_DATA ? MAX_DOWNLOAD_PKG_DATA : this.szSegData.length;
			encodeBuffer.write(Uint16Array, szSegDataSize);
			this.szSegData.length = szSegDataSize;
			encodeBuffer.write(Uint8Array, this.szSegData);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bType = decodeBuffer.read(Uint8Array, 1);
			this.szResID = decodeBuffer.readString(128);
			this.bSegCount = decodeBuffer.read(Uint8Array, 1);
			this.bSegID = decodeBuffer.read(Uint8Array, 1);
			var szSegDataSize = decodeBuffer.read(Uint16Array, 1);
			this.szSegData = new Array<number>(szSegDataSize);
			this.szSegData = decodeBuffer.read(Uint8Array, szSegDataSize);
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_BIN_MD5LIST_CS implements message {
		public bResType: number = 0;  //资源类型 
		public astResList: Array<ResID> = new Array<ResID>();  //资源列表ID 

		public messageName(): string { return "CMD_GET_BIN_MD5LIST";}
		public messageValue(): number { return CMD_GET_BIN_MD5LIST;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bResType);
			var astResListSize = this.astResList.length > MAX_BIN_LIST_LEN ? MAX_BIN_LIST_LEN : this.astResList.length;
			encodeBuffer.write(Uint16Array, astResListSize);
			this.astResList.length = astResListSize;
			for (var i = 0; i <  astResListSize; i++) {
				encodeBuffer.skip(this.astResList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bResType = decodeBuffer.read(Uint8Array, 1);
			var astResListSize = decodeBuffer.read(Uint16Array, 1);
			this.astResList = new Array<ResID>(astResListSize);
			for (var i = 0; i <  astResListSize; i++) {
				this.astResList[i] = new ResID();
				decodeBuffer.skip(this.astResList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_BIN_MD5LIST_SC implements message {
		public bResType: number = 0;  //资源类型 
		public stMD5List: Array<MD5Code> = new Array<MD5Code>();  //MD5列表 

		public messageName(): string { return "CMD_GET_BIN_MD5LIST";}
		public messageValue(): number { return CMD_GET_BIN_MD5LIST;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bResType);
			var stMD5ListSize = this.stMD5List.length > MAX_BIN_LIST_LEN ? MAX_BIN_LIST_LEN : this.stMD5List.length;
			encodeBuffer.write(Uint16Array, stMD5ListSize);
			this.stMD5List.length = stMD5ListSize;
			for (var i = 0; i <  stMD5ListSize; i++) {
				encodeBuffer.skip(this.stMD5List[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bResType = decodeBuffer.read(Uint8Array, 1);
			var stMD5ListSize = decodeBuffer.read(Uint16Array, 1);
			this.stMD5List = new Array<MD5Code>(stMD5ListSize);
			for (var i = 0; i <  stMD5ListSize; i++) {
				this.stMD5List[i] = new MD5Code();
				decodeBuffer.skip(this.stMD5List[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_ROLE_MISC_SC implements message {
		public stData: RoleMisc = new RoleMisc();  //角色混杂信息 

		public messageName(): string { return "CMD_ROLE_MISC";}
		public messageValue(): number { return CMD_ROLE_MISC;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.skip(this.stData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			decodeBuffer.skip(this.stData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class CMD_ATT_CHANGE_SC implements message {
		public dwObjectID: number = 0;  //目标ID 
		public bObjectType: number = 0;  //目标类型 
		public astAttr: Array<PROPERTY> = new Array<PROPERTY>();  //玩家属性集 

		public messageName(): string { return "CMD_ATT_CHANGE";}
		public messageValue(): number { return CMD_ATT_CHANGE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwObjectID);
			encodeBuffer.write(Uint8Array, this.bObjectType);
			var astAttrSize = this.astAttr.length > LIFEATT_MAXVAL ? LIFEATT_MAXVAL : this.astAttr.length;
			encodeBuffer.write(Uint16Array, astAttrSize);
			this.astAttr.length = astAttrSize;
			for (var i = 0; i <  astAttrSize; i++) {
				encodeBuffer.skip(this.astAttr[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwObjectID = decodeBuffer.read(Uint32Array, 1);
			this.bObjectType = decodeBuffer.read(Uint8Array, 1);
			var astAttrSize = decodeBuffer.read(Uint16Array, 1);
			this.astAttr = new Array<PROPERTY>(astAttrSize);
			for (var i = 0; i <  astAttrSize; i++) {
				this.astAttr[i] = new PROPERTY();
				decodeBuffer.skip(this.astAttr[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_ALOGIN_CS implements message {
		public bVerionType: number = 0;  //版本平台类型,参见CLT_PLATFORM_TYPE_ANDROID等枚举定义 
		public bVerionMain: number = 0;  //主版本号 
		public bVerionFeature: number = 0;  //特征版本号 
		public bVerionBuild: number = 0;  //编译次数 
		public szAccount: string = "";  //帐号 
		public szName: string = "";  //1 
		public dwCltVer: number = 0;  //新客户端版本编码 
		public szChannel: string = "";  //渠道 
		public bIfCheckUpdate: number = 0;  //是否做版本升级校验 
		public bOperatersType: number = 0;  //运营商类型,参见OPERATERS_TYPE_MOBILE等枚举定义 
		public dwSpecChannlVer: number = 0;  //特殊渠道版本类型,参见SPEC_CHANNEL_VER_CLASSICFRUIT等枚举定义 
		public szXGToken: string = "";  //接入了信鸽时对应生成的设备token 
		public iMapTemplateID: number = 0;  //初始想要进入的场景模板ID不填充值默认是进入大厅 

		public messageName(): string { return "CMD_ALOGIN";}
		public messageValue(): number { return CMD_ALOGIN;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bVerionType);
			encodeBuffer.write(Uint8Array, this.bVerionMain);
			encodeBuffer.write(Uint8Array, this.bVerionFeature);
			encodeBuffer.write(Uint8Array, this.bVerionBuild);
			encodeBuffer.writeString(this.szAccount, MAX_ACCOUNT_LEN);
			encodeBuffer.writeString(this.szName, MAX_ROLE_NAME_LEN);
			if (5<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwCltVer);
			}
			if (5<csproto.CSProto.Version) {
				encodeBuffer.writeString(this.szChannel, MAX_ALOGIN_CAHNNLE_LEN);
			}
			if (9<csproto.CSProto.Version) {
				encodeBuffer.write(Uint8Array, this.bIfCheckUpdate);
			}
			if (10<csproto.CSProto.Version) {
				encodeBuffer.write(Uint8Array, this.bOperatersType);
			}
			if (11<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwSpecChannlVer);
			}
			if (24<csproto.CSProto.Version) {
				encodeBuffer.writeString(this.szXGToken, 128);
			}
			if (34<csproto.CSProto.Version) {
				encodeBuffer.write(Int32Array, this.iMapTemplateID);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bVerionType = decodeBuffer.read(Uint8Array, 1);
			this.bVerionMain = decodeBuffer.read(Uint8Array, 1);
			this.bVerionFeature = decodeBuffer.read(Uint8Array, 1);
			this.bVerionBuild = decodeBuffer.read(Uint8Array, 1);
			this.szAccount = decodeBuffer.readString(MAX_ACCOUNT_LEN);
			this.szName = decodeBuffer.readString(MAX_ROLE_NAME_LEN);
			if (5<csproto.CSProto.Version) {
				this.dwCltVer = decodeBuffer.read(Uint32Array, 1);
			}
			if (5<csproto.CSProto.Version) {
				this.szChannel = decodeBuffer.readString(MAX_ALOGIN_CAHNNLE_LEN);
			}
			if (9<csproto.CSProto.Version) {
				this.bIfCheckUpdate = decodeBuffer.read(Uint8Array, 1);
			}
			if (10<csproto.CSProto.Version) {
				this.bOperatersType = decodeBuffer.read(Uint8Array, 1);
			}
			if (11<csproto.CSProto.Version) {
				this.dwSpecChannlVer = decodeBuffer.read(Uint32Array, 1);
			}
			if (24<csproto.CSProto.Version) {
				this.szXGToken = decodeBuffer.readString(128);
			}
			if (34<csproto.CSProto.Version) {
				this.iMapTemplateID = decodeBuffer.read(Int32Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_ALOGIN_SC implements message {
		public bResult: number = 0;  //账户登录结果码 
		public szHintMsg: string = "";  //当alogin失败时的对应错误描述 
		public szDownLink: string = "";  //当结果码为更新提示时对应了下载地址 

		public messageName(): string { return "CMD_ALOGIN";}
		public messageValue(): number { return CMD_ALOGIN;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bResult);
			encodeBuffer.writeString(this.szHintMsg, MAX_ALOGIN_HINTMSG_LEN);
			if (9<csproto.CSProto.Version) {
				encodeBuffer.writeString(this.szDownLink, MAX_DOWNLOAD_LINK_LEN);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bResult = decodeBuffer.read(Uint8Array, 1);
			this.szHintMsg = decodeBuffer.readString(MAX_ALOGIN_HINTMSG_LEN);
			if (9<csproto.CSProto.Version) {
				this.szDownLink = decodeBuffer.readString(MAX_DOWNLOAD_LINK_LEN);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_KICKOFF_ACCOUNT_SC implements message {
		public bReason: number = 0;  //下线的理由 

		public messageName(): string { return "CMD_KICKOFF_ACCOUNT";}
		public messageValue(): number { return CMD_KICKOFF_ACCOUNT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bReason);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bReason = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_PING_CS implements message {
		public dwClientTick: number = 0;  //Client Tick number 
		public dwLastDelay: number = 0;  //上次延时时间 

		public messageName(): string { return "CMD_PING";}
		public messageValue(): number { return CMD_PING;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwClientTick);
			if (6<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwLastDelay);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwClientTick = decodeBuffer.read(Uint32Array, 1);
			if (6<csproto.CSProto.Version) {
				this.dwLastDelay = decodeBuffer.read(Uint32Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_PING_SC implements message {
		public dwClientTick: number = 0;  //Client Tick number 

		public messageName(): string { return "CMD_PING";}
		public messageValue(): number { return CMD_PING;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwClientTick);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwClientTick = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class SlotBaseData implements message {
		public bTabHasMoney: number = 0;  //当前桌存在的币 
		public wGotBBCount: number = 0;  //当前桌已经获得的BB数 
		public wGotRBCount: number = 0;  //当前桌已经获得的RB数 
		public wRoundCountSinceBouns: number = 0;  //从上次获取BB和RB后当前已经进行的转数 
		public dwRoundCountTotal: number = 0;  //当前已经进行的转数 

		public messageName(): string { return "SlotBaseData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bTabHasMoney);
			encodeBuffer.write(Uint16Array, this.wGotBBCount);
			encodeBuffer.write(Uint16Array, this.wGotRBCount);
			encodeBuffer.write(Uint16Array, this.wRoundCountSinceBouns);
			encodeBuffer.write(Uint16Array, this.dwRoundCountTotal);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bTabHasMoney = decodeBuffer.read(Uint8Array, 1);
			this.wGotBBCount = decodeBuffer.read(Uint16Array, 1);
			this.wGotRBCount = decodeBuffer.read(Uint16Array, 1);
			this.wRoundCountSinceBouns = decodeBuffer.read(Uint16Array, 1);
			this.dwRoundCountTotal = decodeBuffer.read(Uint16Array, 1);
			return decodeBuffer.length();
		}
	}

	export class SlotRoundData implements message {
		public bWheelViewID: number = 0;  //本转的转轮结果ID,参见EnWheelView的枚举 
		public bOperRuleID: number = 0;  //本转的操作按钮顺序要求,参见EnOperRule的枚举 
		public bOuteSideMode: number = 0;  //本转对应展示的外部模式,参见EnOuteSideMode的枚举 
		public wPrizeGold: number = 0;  //本转将获得币数 
		public bShowID: number = 0;  //演出类型,参见EnShowType 
		public bShowRoudLeft: number = 0;  //演出类型对应的剩余转数,当为0时下一转的演出是重新抽选的 
		public shBonusRealGotTotalGold: number = 0;  //本轮中开出Bonus获得的实际币,己扣除需要投入的币 
		public bBonusStepLeft: number = 0;  //剩余的bonus阶段数,在Bonus模式时有效 
		public bBonusStepLeftGame: number = 0;  //bonus发奖阶段总剩余Game,不包含额外的bonus阶段 
		public bBonusSpecStep: number = 0;  //是否是1st到3st或者bonuschance的额外bonus,参见枚举EnSpecBonusType 
		public bBonusStepLeftHit: number = 0;  //对1st到3st或者bonuschance的额外bouns的剩余hit 
		public bIsFirtBonusRound: number = 0;  //是否是Bonus确定的第一转,在Bonus模式时有效 
		public bBonusType: number = 0;  //发奖过程对应的是BB还是RB,参见EnBonusType的枚举 
		public bWindowShowID: number = 0;  //确定发奖时右上角演出类型,参见EnShowType 
		public bIsSpecStepFirstRound: number = 0;  //是否是Bonus发奖中的某额外bonus阶段的第一转,在Bonus模式时有效 
		public bIsFinalBonusRound: number = 0;  //是否是Bonus发奖的最后一转,在Bonus模式时有效,参见EnIsFinalBounsRoundType:0不是,1是,2是当操作不正确时就是 
		public wNextRoundCostGold: number = 0;  //下一转将消耗币数 

		public messageName(): string { return "SlotRoundData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bWheelViewID);
			encodeBuffer.write(Uint8Array, this.bOperRuleID);
			encodeBuffer.write(Uint8Array, this.bOuteSideMode);
			encodeBuffer.write(Uint16Array, this.wPrizeGold);
			encodeBuffer.write(Uint8Array, this.bShowID);
			encodeBuffer.write(Uint8Array, this.bShowRoudLeft);
			if (this.bOuteSideMode==OUTESIDE_MODE_BONUSSENDING) {
				encodeBuffer.write(Int16Array, this.shBonusRealGotTotalGold);
			}
			if (this.bOuteSideMode==OUTESIDE_MODE_BONUSSENDING) {
				encodeBuffer.write(Uint8Array, this.bBonusStepLeft);
			}
			encodeBuffer.write(Uint8Array, this.bBonusStepLeftGame);
			if (this.bOuteSideMode==OUTESIDE_MODE_BONUSSENDING) {
				encodeBuffer.write(Uint8Array, this.bBonusSpecStep);
			}
			if (this.bOuteSideMode==OUTESIDE_MODE_BONUSSENDING) {
				encodeBuffer.write(Uint8Array, this.bBonusStepLeftHit);
			}
			if (this.bOuteSideMode==OUTESIDE_MODE_BONUSSENDING) {
				encodeBuffer.write(Uint8Array, this.bIsFirtBonusRound);
			}
			if (this.bOuteSideMode==OUTESIDE_MODE_BONUSSENDING) {
				encodeBuffer.write(Uint8Array, this.bBonusType);
			}
			if (this.bOuteSideMode==OUTESIDE_MODE_BONUSCONFIRM) {
				encodeBuffer.write(Uint8Array, this.bWindowShowID);
			}
			if (this.bOuteSideMode==OUTESIDE_MODE_BONUSSENDING) {
				encodeBuffer.write(Uint8Array, this.bIsSpecStepFirstRound);
			}
			if (this.bOuteSideMode==OUTESIDE_MODE_BONUSSENDING) {
				encodeBuffer.write(Uint8Array, this.bIsFinalBonusRound);
			}
			encodeBuffer.write(Uint16Array, this.wNextRoundCostGold);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bWheelViewID = decodeBuffer.read(Uint8Array, 1);
			this.bOperRuleID = decodeBuffer.read(Uint8Array, 1);
			this.bOuteSideMode = decodeBuffer.read(Uint8Array, 1);
			this.wPrizeGold = decodeBuffer.read(Uint16Array, 1);
			this.bShowID = decodeBuffer.read(Uint8Array, 1);
			this.bShowRoudLeft = decodeBuffer.read(Uint8Array, 1);
			if (this.bOuteSideMode==OUTESIDE_MODE_BONUSSENDING) {
				this.shBonusRealGotTotalGold = decodeBuffer.read(Int16Array, 1);
			}
			if (this.bOuteSideMode==OUTESIDE_MODE_BONUSSENDING) {
				this.bBonusStepLeft = decodeBuffer.read(Uint8Array, 1);
			}
			this.bBonusStepLeftGame = decodeBuffer.read(Uint8Array, 1);
			if (this.bOuteSideMode==OUTESIDE_MODE_BONUSSENDING) {
				this.bBonusSpecStep = decodeBuffer.read(Uint8Array, 1);
			}
			if (this.bOuteSideMode==OUTESIDE_MODE_BONUSSENDING) {
				this.bBonusStepLeftHit = decodeBuffer.read(Uint8Array, 1);
			}
			if (this.bOuteSideMode==OUTESIDE_MODE_BONUSSENDING) {
				this.bIsFirtBonusRound = decodeBuffer.read(Uint8Array, 1);
			}
			if (this.bOuteSideMode==OUTESIDE_MODE_BONUSSENDING) {
				this.bBonusType = decodeBuffer.read(Uint8Array, 1);
			}
			if (this.bOuteSideMode==OUTESIDE_MODE_BONUSCONFIRM) {
				this.bWindowShowID = decodeBuffer.read(Uint8Array, 1);
			}
			if (this.bOuteSideMode==OUTESIDE_MODE_BONUSSENDING) {
				this.bIsSpecStepFirstRound = decodeBuffer.read(Uint8Array, 1);
			}
			if (this.bOuteSideMode==OUTESIDE_MODE_BONUSSENDING) {
				this.bIsFinalBonusRound = decodeBuffer.read(Uint8Array, 1);
			}
			this.wNextRoundCostGold = decodeBuffer.read(Uint16Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_CAN_BEGIN_SLOT_CS implements message {
		public bReason: number = 0;  //参见CAN_BEGIN_SLOT_REASON_LOGIN等枚举 

		public messageName(): string { return "CMD_CAN_BEGIN_SLOT";}
		public messageValue(): number { return CMD_CAN_BEGIN_SLOT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bReason);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bReason = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_CAN_BEGIN_SLOT_SC implements message {
		public wMapID: number = 0;  //对应地图ID,目前无用 
		public dwSceneID: number = 0;  //对应的场景ID 
		public dwTableID: number = 0;  //对应的桌台ID,目前无用 
		public stTablesBase: SlotBaseData = new SlotBaseData();  //桌台基础数据 
		public stCurRound: SlotRoundData = new SlotRoundData();  //当前的桌台数据 

		public messageName(): string { return "CMD_CAN_BEGIN_SLOT";}
		public messageValue(): number { return CMD_CAN_BEGIN_SLOT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wMapID);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			encodeBuffer.write(Uint32Array, this.dwTableID);
			encodeBuffer.skip(this.stTablesBase.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.skip(this.stCurRound.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wMapID = decodeBuffer.read(Uint16Array, 1);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			this.dwTableID = decodeBuffer.read(Uint32Array, 1);
			decodeBuffer.skip(this.stTablesBase.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			decodeBuffer.skip(this.stCurRound.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class CMD_DO_SLOTROUND_BEGIN_SC implements message {
		public stTablesBase: SlotBaseData = new SlotBaseData();  //桌台基础数据 
		public bRoundDataType: number = 0;  //将开出的转轮数据对应选取哪个,参见NEXT_ROUNDDATA_TYPE_NONEOP等定义 
		public stOpRightRet: SlotRoundData = new SlotRoundData();  //转轮结果数据,没有操作要求或者有操作要求但操作正确时的结果 
		public stOpWrongRet: SlotRoundData = new SlotRoundData();  //转轮结果数据,有操作要求且操作错误时的结果 

		public messageName(): string { return "CMD_DO_SLOTROUND_BEGIN";}
		public messageValue(): number { return CMD_DO_SLOTROUND_BEGIN;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.skip(this.stTablesBase.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.write(Uint8Array, this.bRoundDataType);
			encodeBuffer.skip(this.stOpRightRet.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			if (this.bRoundDataType==NEXT_ROUNDDATA_TYPE_OPLIMIT) {
				encodeBuffer.skip(this.stOpWrongRet.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			decodeBuffer.skip(this.stTablesBase.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			this.bRoundDataType = decodeBuffer.read(Uint8Array, 1);
			decodeBuffer.skip(this.stOpRightRet.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			if (this.bRoundDataType==NEXT_ROUNDDATA_TYPE_OPLIMIT) {
				decodeBuffer.skip(this.stOpWrongRet.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_DO_SLOTROUND_END_CS implements message {
		public bIsOperRight: number = 0;  //玩家操作是否正确:1正确,0不正确 

		public messageName(): string { return "CMD_DO_SLOTROUND_END";}
		public messageValue(): number { return CMD_DO_SLOTROUND_END;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bIsOperRight);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bIsOperRight = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_ONLINETIME_GIFT_SC implements message {
		public wGiftGold: number = 0;  //领取成功的金币数 
		public stNextGift: OnlineGiftPara = new OnlineGiftPara();  //本阶段可领的在线礼包情况 
		public stNextNextGift: OnlineGiftPara = new OnlineGiftPara();  //下一阶段玩家在线礼包相关信息 

		public messageName(): string { return "CMD_GET_ONLINETIME_GIFT";}
		public messageValue(): number { return CMD_GET_ONLINETIME_GIFT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wGiftGold);
			encodeBuffer.skip(this.stNextGift.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			if (9<csproto.CSProto.Version) {
				encodeBuffer.skip(this.stNextNextGift.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wGiftGold = decodeBuffer.read(Uint16Array, 1);
			decodeBuffer.skip(this.stNextGift.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			if (9<csproto.CSProto.Version) {
				decodeBuffer.skip(this.stNextNextGift.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_SLOTTABDATA_SC implements message {
		public bTabHasMoney: number = 0;  //当前桌存在的币 

		public messageName(): string { return "CMD_NOTIFY_SLOTTABDATA";}
		public messageValue(): number { return CMD_NOTIFY_SLOTTABDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bTabHasMoney);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bTabHasMoney = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class OneTask implements message {
		public wTaskID: number = 0;  //任务ID 
		public bTaskStatus: number = 0;  //任务状态,参见EnTaskStatus 
		public szTaskName: string = "";  //名字 
		public szTaskDesc: string = "";  //描述 
		public iCond1Count: number = 0;  //条件1当前计数 
		public iCond1Need: number = 0;  //条件1目标计数 
		public dwAwardGold: number = 0;  //奖励金币 
		public dwAwardDiamond: number = 0;  //奖励宝石 
		public bTaskType: number = 0;  //任务类型,参见TASK_TYPE_ALLLIFE等枚举 

		public messageName(): string { return "OneTask";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wTaskID);
			encodeBuffer.write(Uint8Array, this.bTaskStatus);
			encodeBuffer.writeString(this.szTaskName, MAX_TASK_NAME);
			encodeBuffer.writeString(this.szTaskDesc, MAX_TASK_DESC);
			encodeBuffer.write(Int32Array, this.iCond1Count);
			encodeBuffer.write(Int32Array, this.iCond1Need);
			encodeBuffer.write(Uint32Array, this.dwAwardGold);
			encodeBuffer.write(Uint32Array, this.dwAwardDiamond);
			encodeBuffer.write(Uint8Array, this.bTaskType);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wTaskID = decodeBuffer.read(Uint16Array, 1);
			this.bTaskStatus = decodeBuffer.read(Uint8Array, 1);
			this.szTaskName = decodeBuffer.readString(MAX_TASK_NAME);
			this.szTaskDesc = decodeBuffer.readString(MAX_TASK_DESC);
			this.iCond1Count = decodeBuffer.read(Int32Array, 1);
			this.iCond1Need = decodeBuffer.read(Int32Array, 1);
			this.dwAwardGold = decodeBuffer.read(Uint32Array, 1);
			this.dwAwardDiamond = decodeBuffer.read(Uint32Array, 1);
			this.bTaskType = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_TASK_LIST_CS implements message {
		public wPageIndex: number = 0;  //查询的页序号，注意统一从1开始 

		public messageName(): string { return "CMD_TASK_LIST";}
		public messageValue(): number { return CMD_TASK_LIST;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wPageIndex);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wPageIndex = decodeBuffer.read(Uint16Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_TASK_LIST_SC implements message {
		public stPagePara: PageBreakPara = new PageBreakPara();  //分页相关数据 
		public astTaskList: Array<OneTask> = new Array<OneTask>();  //查询分页结果列表 

		public messageName(): string { return "CMD_TASK_LIST";}
		public messageValue(): number { return CMD_TASK_LIST;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.skip(this.stPagePara.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			var astTaskListSize = this.astTaskList.length > MAX_TASK_PAGE_SIZE ? MAX_TASK_PAGE_SIZE : this.astTaskList.length;
			encodeBuffer.write(Uint16Array, astTaskListSize);
			this.astTaskList.length = astTaskListSize;
			for (var i = 0; i <  astTaskListSize; i++) {
				encodeBuffer.skip(this.astTaskList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			decodeBuffer.skip(this.stPagePara.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			var astTaskListSize = decodeBuffer.read(Uint16Array, 1);
			this.astTaskList = new Array<OneTask>(astTaskListSize);
			for (var i = 0; i <  astTaskListSize; i++) {
				this.astTaskList[i] = new OneTask();
				decodeBuffer.skip(this.astTaskList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_TASK_AWARD_CS implements message {
		public wTaskID: number = 0;  //欲领取奖励的任务ID 

		public messageName(): string { return "CMD_GET_TASK_AWARD";}
		public messageValue(): number { return CMD_GET_TASK_AWARD;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wTaskID);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wTaskID = decodeBuffer.read(Uint16Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_TASK_AWARD_SC implements message {
		public wTaskID: number = 0;  //欲领取奖励的任务ID 

		public messageName(): string { return "CMD_GET_TASK_AWARD";}
		public messageValue(): number { return CMD_GET_TASK_AWARD;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wTaskID);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wTaskID = decodeBuffer.read(Uint16Array, 1);
			return decodeBuffer.length();
		}
	}

	export class OneRankData implements message {
		public szRankAcc: string = "";  //帐号,目前没有用,下行空串 
		public szRankName: string = "";  //角色或者其他排序项名字 
		public szRankExtName: string = "";  //目前暂时无用,其他情况为空 
		public wRank: number = 0;  //对应的排名 
		public llRankVal1: number = 0;  //排序值1 
		public llRankVal2: number = 0;  //排序值2 
		public llBornID: number = 0;  //玩家ID 
		public bHeadPhoto: number = 0;  //系统头像 
		public szSelfDefPhoto: string = "";  //玩家自定义头像,长度不为0时以此为准 
		public llRelateAward: number = 0;  //排序相关奖励 
		public iVipLv: number = 0;  //VIP等级 

		public messageName(): string { return "OneRankData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szRankAcc, MAX_ACCOUNT_LEN);
			encodeBuffer.writeString(this.szRankName, MAX_ROLE_NAME_LEN);
			encodeBuffer.writeString(this.szRankExtName, MAX_ROLE_NAME_LEN);
			encodeBuffer.write(Uint16Array, this.wRank);
			encodeBuffer.write(Float64Array, this.llRankVal1);
			encodeBuffer.write(Float64Array, this.llRankVal2);
			encodeBuffer.write(Float64Array, this.llBornID);
			encodeBuffer.write(Uint8Array, this.bHeadPhoto);
			encodeBuffer.writeString(this.szSelfDefPhoto, MAX_ROLE_SELFDEF_PHOTO_LEN);
			encodeBuffer.write(Float64Array, this.llRelateAward);
			if (22<csproto.CSProto.Version) {
				encodeBuffer.write(Int32Array, this.iVipLv);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szRankAcc = decodeBuffer.readString(MAX_ACCOUNT_LEN);
			this.szRankName = decodeBuffer.readString(MAX_ROLE_NAME_LEN);
			this.szRankExtName = decodeBuffer.readString(MAX_ROLE_NAME_LEN);
			this.wRank = decodeBuffer.read(Uint16Array, 1);
			this.llRankVal1 = decodeBuffer.read(Float64Array, 1);
			this.llRankVal2 = decodeBuffer.read(Float64Array, 1);
			this.llBornID = decodeBuffer.read(Float64Array, 1);
			this.bHeadPhoto = decodeBuffer.read(Uint8Array, 1);
			this.szSelfDefPhoto = decodeBuffer.readString(MAX_ROLE_SELFDEF_PHOTO_LEN);
			this.llRelateAward = decodeBuffer.read(Float64Array, 1);
			if (22<csproto.CSProto.Version) {
				this.iVipLv = decodeBuffer.read(Int32Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class MyRankData implements message {
		public bIsInRank: number = 0;  //0不在排行中,1在排行中 
		public wMyRank: number = 0;  //我的排名,当在排行中时有效 
		public llRankVal1: number = 0;  //排序值1,当在排行中时有效 
		public llRankVal2: number = 0;  //排序值2,当在排行中时有效 
		public bIsHasAward: number = 0;  //若在排行榜中且是有奖励的排行榜时有效:0没有领取相应奖励,其他己领取相应奖励 

		public messageName(): string { return "MyRankData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bIsInRank);
			encodeBuffer.write(Uint16Array, this.wMyRank);
			encodeBuffer.write(Float64Array, this.llRankVal1);
			encodeBuffer.write(Float64Array, this.llRankVal2);
			encodeBuffer.write(Uint8Array, this.bIsHasAward);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bIsInRank = decodeBuffer.read(Uint8Array, 1);
			this.wMyRank = decodeBuffer.read(Uint16Array, 1);
			this.llRankVal1 = decodeBuffer.read(Float64Array, 1);
			this.llRankVal2 = decodeBuffer.read(Float64Array, 1);
			this.bIsHasAward = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_RANK_QUERYPAGE_CS implements message {
		public bRankClass: number = 0;  //排行榜分类,参见RANK_CLASS_VIPLVL等枚举定义 
		public dwRankSubClass: number = 0;  //排行榜子分类:当用于标记按天充值排行榜中的历史榜单则上一天为1,为0是当天 
		public wPageIndex: number = 0;  //注是从1开始,查询的页码,当不是查询角色分页时有效 
		public bIsQueryRolePage: number = 0;  //1是指查询角色所在的分页,0不是 

		public messageName(): string { return "CMD_RANK_QUERYPAGE";}
		public messageValue(): number { return CMD_RANK_QUERYPAGE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bRankClass);
			encodeBuffer.write(Uint32Array, this.dwRankSubClass);
			encodeBuffer.write(Uint16Array, this.wPageIndex);
			encodeBuffer.write(Uint8Array, this.bIsQueryRolePage);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bRankClass = decodeBuffer.read(Uint8Array, 1);
			this.dwRankSubClass = decodeBuffer.read(Uint32Array, 1);
			this.wPageIndex = decodeBuffer.read(Uint16Array, 1);
			this.bIsQueryRolePage = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_RANK_QUERYPAGE_SC implements message {
		public bRankClass: number = 0;  //排行榜分类,参见RANK_CLASS_VIPLVL等枚举定义 
		public dwRankSubClass: number = 0;  //排行榜子分类:当为充值榜时传1表明是获取昨天列表 
		public bRankRefreshType: number = 0;  //排行榜刷新类型,参见RANK_REFRESHTYPE_NONE等枚举定义 
		public bIsQueryRolePage: number = 0;  //1是指查询角色所在的分页下行,0不是 
		public stPagePara: PageBreakPara = new PageBreakPara();  //分页相关数据 
		public stMyRankData: MyRankData = new MyRankData();  //我的排行相关值 
		public astRankList: Array<OneRankData> = new Array<OneRankData>();  //查询分页结果列表 
		public dwRelatePeriodTime: number = 0;  //当为定期刷新的排行榜时,对应了查询结果对应的生成时间 
		public dwPeriodRefreshTime: number = 0;  //新排行榜下次刷新时间,如果为0,表明不会刷新 
		public bPeriodListNum: number = 0;  //当前对应的可查询的定期刷新历史榜单个数 

		public messageName(): string { return "CMD_RANK_QUERYPAGE";}
		public messageValue(): number { return CMD_RANK_QUERYPAGE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bRankClass);
			encodeBuffer.write(Uint32Array, this.dwRankSubClass);
			encodeBuffer.write(Uint8Array, this.bRankRefreshType);
			encodeBuffer.write(Uint8Array, this.bIsQueryRolePage);
			encodeBuffer.skip(this.stPagePara.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.skip(this.stMyRankData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			var astRankListSize = this.astRankList.length > MAX_RANK_LIST_SIZE ? MAX_RANK_LIST_SIZE : this.astRankList.length;
			encodeBuffer.write(Uint16Array, astRankListSize);
			this.astRankList.length = astRankListSize;
			for (var i = 0; i <  astRankListSize; i++) {
				encodeBuffer.skip(this.astRankList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			if (this.bRankRefreshType!=RANK_REFRESHTYPE_NONE) {
				encodeBuffer.write(Uint32Array, this.dwRelatePeriodTime);
			}
			if (this.bRankRefreshType!=RANK_REFRESHTYPE_NONE) {
				encodeBuffer.write(Uint32Array, this.dwPeriodRefreshTime);
			}
			if (this.bRankRefreshType!=RANK_REFRESHTYPE_NONE) {
				encodeBuffer.write(Uint8Array, this.bPeriodListNum);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bRankClass = decodeBuffer.read(Uint8Array, 1);
			this.dwRankSubClass = decodeBuffer.read(Uint32Array, 1);
			this.bRankRefreshType = decodeBuffer.read(Uint8Array, 1);
			this.bIsQueryRolePage = decodeBuffer.read(Uint8Array, 1);
			decodeBuffer.skip(this.stPagePara.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			decodeBuffer.skip(this.stMyRankData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			var astRankListSize = decodeBuffer.read(Uint16Array, 1);
			this.astRankList = new Array<OneRankData>(astRankListSize);
			for (var i = 0; i <  astRankListSize; i++) {
				this.astRankList[i] = new OneRankData();
				decodeBuffer.skip(this.astRankList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			if (this.bRankRefreshType!=RANK_REFRESHTYPE_NONE) {
				this.dwRelatePeriodTime = decodeBuffer.read(Uint32Array, 1);
			}
			if (this.bRankRefreshType!=RANK_REFRESHTYPE_NONE) {
				this.dwPeriodRefreshTime = decodeBuffer.read(Uint32Array, 1);
			}
			if (this.bRankRefreshType!=RANK_REFRESHTYPE_NONE) {
				this.bPeriodListNum = decodeBuffer.read(Uint8Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_CHAT_CS implements message {
		public bChannel: number = 0;  //消息频道 
		public szChatDetail: string = "";  //聊天内容 
		public bChatType: number = 0;  //消息类型,参见CHAT_TYPE_ZJH_PREDEF等定义 

		public messageName(): string { return "CMD_CHAT";}
		public messageValue(): number { return CMD_CHAT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bChannel);
			encodeBuffer.writeString(this.szChatDetail, MAX_CHAT_MSG_LEN);
			if (16<csproto.CSProto.Version) {
				encodeBuffer.write(Uint8Array, this.bChatType);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bChannel = decodeBuffer.read(Uint8Array, 1);
			this.szChatDetail = decodeBuffer.readString(MAX_CHAT_MSG_LEN);
			if (16<csproto.CSProto.Version) {
				this.bChatType = decodeBuffer.read(Uint8Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_CHAT_SC implements message {
		public bChannel: number = 0;  //聊天频道,参见EnChatChannel定义 
		public szSender: string = "";  //发送方 
		public szChatDetail: string = "";  //聊天内容 
		public bSenderVipLvl: number = 0;  //发送方VIP等级 
		public bIsSelfSend: number = 0;  //是否收到方就是发送方自己 
		public bSenderSex: number = 0;  //发送方性别,目前不会用到 
		public bHeadPhoto: number = 0;  //系统头像,目前不会用到 
		public bChatType: number = 0;  //消息类型,参见CHAT_TYPE_ZJH_PREDEF等定义 
		public dwSenderObjectID: number = 0;  //当为玩家触发消息时对应的发送方实体handle 
		public llSenderRoleID: number = 0;  //当为玩家触发消息时对应的发送方角色ID 

		public messageName(): string { return "CMD_CHAT";}
		public messageValue(): number { return CMD_CHAT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bChannel);
			encodeBuffer.writeString(this.szSender, MAX_ROLE_NAME_LEN);
			encodeBuffer.writeString(this.szChatDetail, MAX_CHAT_MSG_LEN);
			if (1<csproto.CSProto.Version) {
				encodeBuffer.write(Uint8Array, this.bSenderVipLvl);
			}
			if (1<csproto.CSProto.Version) {
				encodeBuffer.write(Uint8Array, this.bIsSelfSend);
			}
			if (1<csproto.CSProto.Version) {
				encodeBuffer.write(Uint8Array, this.bSenderSex);
			}
			if (1<csproto.CSProto.Version) {
				encodeBuffer.write(Uint8Array, this.bHeadPhoto);
			}
			if (16<csproto.CSProto.Version) {
				encodeBuffer.write(Uint8Array, this.bChatType);
			}
			if (18<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwSenderObjectID);
			}
			if (27<csproto.CSProto.Version) {
				encodeBuffer.write(Float64Array, this.llSenderRoleID);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bChannel = decodeBuffer.read(Uint8Array, 1);
			this.szSender = decodeBuffer.readString(MAX_ROLE_NAME_LEN);
			this.szChatDetail = decodeBuffer.readString(MAX_CHAT_MSG_LEN);
			if (1<csproto.CSProto.Version) {
				this.bSenderVipLvl = decodeBuffer.read(Uint8Array, 1);
			}
			if (1<csproto.CSProto.Version) {
				this.bIsSelfSend = decodeBuffer.read(Uint8Array, 1);
			}
			if (1<csproto.CSProto.Version) {
				this.bSenderSex = decodeBuffer.read(Uint8Array, 1);
			}
			if (1<csproto.CSProto.Version) {
				this.bHeadPhoto = decodeBuffer.read(Uint8Array, 1);
			}
			if (16<csproto.CSProto.Version) {
				this.bChatType = decodeBuffer.read(Uint8Array, 1);
			}
			if (18<csproto.CSProto.Version) {
				this.dwSenderObjectID = decodeBuffer.read(Uint32Array, 1);
			}
			if (27<csproto.CSProto.Version) {
				this.llSenderRoleID = decodeBuffer.read(Float64Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_CONLOGIN_GIFT_SC implements message {
		public bContLoginDays: number = 0;  //连续登录天数 
		public bHasGotTodayGift: number = 0;  //是否已经领取了今天的连续登录礼包 

		public messageName(): string { return "CMD_CONLOGIN_GIFT";}
		public messageValue(): number { return CMD_CONLOGIN_GIFT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bContLoginDays);
			encodeBuffer.write(Uint8Array, this.bHasGotTodayGift);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bContLoginDays = decodeBuffer.read(Uint8Array, 1);
			this.bHasGotTodayGift = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_CHARGE_SUCC_CS implements message {
		public szChannel: string = "";  //充值渠道,客户端自行填充字符串,如weipai等 
		public szDetail: string = "";  //充值详情,格式可统一为:a=bc=d 

		public messageName(): string { return "CMD_NOTIFY_CHARGE_SUCC";}
		public messageValue(): number { return CMD_NOTIFY_CHARGE_SUCC;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szChannel, 20);
			encodeBuffer.writeString(this.szDetail, 300);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szChannel = decodeBuffer.readString(20);
			this.szDetail = decodeBuffer.readString(300);
			return decodeBuffer.length();
		}
	}

	export class CMD_CHANGE_HEADPHOTO_CS implements message {
		public wSysHeadPhoto: number = 0;  //系统头像ID 

		public messageName(): string { return "CMD_CHANGE_HEADPHOTO";}
		public messageValue(): number { return CMD_CHANGE_HEADPHOTO;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wSysHeadPhoto);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wSysHeadPhoto = decodeBuffer.read(Uint16Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_THROWUP_GOLD_SC implements message {
		public wGotGold: number = 0;  //对应吐出的币数 

		public messageName(): string { return "CMD_NOTIFY_THROWUP_GOLD";}
		public messageValue(): number { return CMD_NOTIFY_THROWUP_GOLD;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wGotGold);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wGotGold = decodeBuffer.read(Uint16Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_CHARGESUCC_SC implements message {
		public szOrderID: string = "";  //充值订单号 
		public dwBaseBuyGold: number = 0;  //购买金币 
		public dwExtraPresentGold: number = 0;  //赠送金币 
		public dwDayFirstGotGold: number = 0;  //今日首充 
		public dwAlipayGotGold: number = 0;  //支付宝 
		public dwBeyondGotGold: number = 0;  //超值包 
		public dwLimitTimeGotGold: number = 0;  //限时特惠 
		public dwVipExtraGotGold: number = 0;  //VIP赠送 
		public dwCurChargeRank: number = 0;  //当前充值榜排名,为0时不在排行榜上 
		public llTomorrowRankAward: number = 0;  //预计明日充值榜排名奖励 
		public llAllTotalGotGold: number = 0;  //总充值获得金额 

		public messageName(): string { return "CMD_NOTIFY_CHARGESUCC";}
		public messageValue(): number { return CMD_NOTIFY_CHARGESUCC;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szOrderID, 100);
			if (7<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwBaseBuyGold);
			}
			if (7<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwExtraPresentGold);
			}
			if (7<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwDayFirstGotGold);
			}
			if (7<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwAlipayGotGold);
			}
			if (7<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwBeyondGotGold);
			}
			if (7<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwLimitTimeGotGold);
			}
			if (7<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwVipExtraGotGold);
			}
			if (7<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwCurChargeRank);
			}
			if (7<csproto.CSProto.Version) {
				encodeBuffer.write(Float64Array, this.llTomorrowRankAward);
			}
			if (8<csproto.CSProto.Version) {
				encodeBuffer.write(Float64Array, this.llAllTotalGotGold);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szOrderID = decodeBuffer.readString(100);
			if (7<csproto.CSProto.Version) {
				this.dwBaseBuyGold = decodeBuffer.read(Uint32Array, 1);
			}
			if (7<csproto.CSProto.Version) {
				this.dwExtraPresentGold = decodeBuffer.read(Uint32Array, 1);
			}
			if (7<csproto.CSProto.Version) {
				this.dwDayFirstGotGold = decodeBuffer.read(Uint32Array, 1);
			}
			if (7<csproto.CSProto.Version) {
				this.dwAlipayGotGold = decodeBuffer.read(Uint32Array, 1);
			}
			if (7<csproto.CSProto.Version) {
				this.dwBeyondGotGold = decodeBuffer.read(Uint32Array, 1);
			}
			if (7<csproto.CSProto.Version) {
				this.dwLimitTimeGotGold = decodeBuffer.read(Uint32Array, 1);
			}
			if (7<csproto.CSProto.Version) {
				this.dwVipExtraGotGold = decodeBuffer.read(Uint32Array, 1);
			}
			if (7<csproto.CSProto.Version) {
				this.dwCurChargeRank = decodeBuffer.read(Uint32Array, 1);
			}
			if (7<csproto.CSProto.Version) {
				this.llTomorrowRankAward = decodeBuffer.read(Float64Array, 1);
			}
			if (8<csproto.CSProto.Version) {
				this.llAllTotalGotGold = decodeBuffer.read(Float64Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_LOTTERY_BET_ON_CS implements message {
		public bOneBetBaseTag: number = 0;  //单注数量序号,参见LOTTERY_ONEBET_BASE_TAG_1等系列枚举 
		public astBetDetail: Array<PROPERTY> = new Array<PROPERTY>();  //下注列表 
		public dwRoundID: number = 0;  //对应的相关转数序号 

		public messageName(): string { return "CMD_LOTTERY_BET_ON";}
		public messageValue(): number { return CMD_LOTTERY_BET_ON;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bOneBetBaseTag);
			var astBetDetailSize = this.astBetDetail.length > 10 ? 10 : this.astBetDetail.length;
			encodeBuffer.write(Uint16Array, astBetDetailSize);
			this.astBetDetail.length = astBetDetailSize;
			for (var i = 0; i <  astBetDetailSize; i++) {
				encodeBuffer.skip(this.astBetDetail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			if (10<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwRoundID);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bOneBetBaseTag = decodeBuffer.read(Uint8Array, 1);
			var astBetDetailSize = decodeBuffer.read(Uint16Array, 1);
			this.astBetDetail = new Array<PROPERTY>(astBetDetailSize);
			for (var i = 0; i <  astBetDetailSize; i++) {
				this.astBetDetail[i] = new PROPERTY();
				decodeBuffer.skip(this.astBetDetail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			if (10<csproto.CSProto.Version) {
				this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_LOTTERY_BET_ON_SC implements message {
		public dwRoundID: number = 0;  //对应的相关转数序号,目前仅用于调试方便 
		public dwBetTotalGold: number = 0;  //总下注币数 

		public messageName(): string { return "CMD_LOTTERY_BET_ON";}
		public messageValue(): number { return CMD_LOTTERY_BET_ON;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwRoundID);
			encodeBuffer.write(Uint32Array, this.dwBetTotalGold);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			this.dwBetTotalGold = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class LotteryAllData implements message {
		public dwRoundID: number = 0;  //对应的相关转数序号,目前仅用于调试方便 
		public bLotteryStatus: number = 0;  //当前状态,参见LOTTERY_CURSTATUS_CANBET等系列枚举 
		public llPrizePool: number = 0;  //奖池总额 
		public wLucky: number = 0;  //当前幸运指数,万分比分子部分 
		public wLeftBetTime: number = 0;  //当前对应剩余可下注秒数 
		public abHisPrize: Array<number> = new Array<number>();  //历史开出结果小于等于6个以实际长度为准靠左边的为最新 
		public dwHisRed7Time: number = 0;  //上一次开出红7距今的秒数 
		public bHisFCCount: number = 0;  //当前的历史风车个数 

		public messageName(): string { return "LotteryAllData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwRoundID);
			encodeBuffer.write(Uint8Array, this.bLotteryStatus);
			encodeBuffer.write(Float64Array, this.llPrizePool);
			encodeBuffer.write(Uint16Array, this.wLucky);
			if (this.bLotteryStatus==LOTTERY_CURSTATUS_CANBET) {
				encodeBuffer.write(Uint8Array, this.wLeftBetTime);
			}
			var abHisPrizeSize = this.abHisPrize.length > MAX_LOTTERY_SCENE_HISPRIZE_LEN ? MAX_LOTTERY_SCENE_HISPRIZE_LEN : this.abHisPrize.length;
			encodeBuffer.write(Uint16Array, abHisPrizeSize);
			this.abHisPrize.length = abHisPrizeSize;
			encodeBuffer.write(Uint8Array, this.abHisPrize);
			encodeBuffer.write(Uint32Array, this.dwHisRed7Time);
			encodeBuffer.write(Uint8Array, this.bHisFCCount);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			this.bLotteryStatus = decodeBuffer.read(Uint8Array, 1);
			this.llPrizePool = decodeBuffer.read(Float64Array, 1);
			this.wLucky = decodeBuffer.read(Uint16Array, 1);
			if (this.bLotteryStatus==LOTTERY_CURSTATUS_CANBET) {
				this.wLeftBetTime = decodeBuffer.read(Uint8Array, 1);
			}
			var abHisPrizeSize = decodeBuffer.read(Uint16Array, 1);
			this.abHisPrize = new Array<number>(abHisPrizeSize);
			this.abHisPrize = decodeBuffer.read(Uint8Array, abHisPrizeSize);
			this.dwHisRed7Time = decodeBuffer.read(Uint32Array, 1);
			this.bHisFCCount = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class LotteryTimerData implements message {
		public bLotteryStatus: number = 0;  //当前状态,参见LOTTERY_CURSTATUS_CANBET等系列枚举 
		public llPrizePool: number = 0;  //奖池总额 
		public dwRoundID: number = 0;  //对应的相关转数序号 

		public messageName(): string { return "LotteryTimerData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bLotteryStatus);
			encodeBuffer.write(Float64Array, this.llPrizePool);
			if (10<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwRoundID);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bLotteryStatus = decodeBuffer.read(Uint8Array, 1);
			this.llPrizePool = decodeBuffer.read(Float64Array, 1);
			if (10<csproto.CSProto.Version) {
				this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_LOTTERY_ENTER_SC implements message {
		public wMapID: number = 0;  //对应地图ID,目前无用 
		public dwSceneID: number = 0;  //对应的场景ID 
		public dwTableID: number = 0;  //对应的桌台ID,目前无用 
		public stAllData: LotteryAllData = new LotteryAllData();  //对应当前数据 
		public dwBetTotalGold: number = 0;  //总下注币数 
		public astBetDetail: Array<PROPERTY> = new Array<PROPERTY>();  //当前对应当转的己下注列表,若已经下注则有数据 
		public bOneBetBaseTag: number = 0;  //玩家自己下注的单注数量序号,参见LOTTERY_ONEBET_BASE_TAG_1等系列枚举 

		public messageName(): string { return "CMD_LOTTERY_ENTER";}
		public messageValue(): number { return CMD_LOTTERY_ENTER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wMapID);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			encodeBuffer.write(Uint32Array, this.dwTableID);
			encodeBuffer.skip(this.stAllData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.write(Uint32Array, this.dwBetTotalGold);
			var astBetDetailSize = this.astBetDetail.length > 10 ? 10 : this.astBetDetail.length;
			encodeBuffer.write(Uint16Array, astBetDetailSize);
			this.astBetDetail.length = astBetDetailSize;
			for (var i = 0; i <  astBetDetailSize; i++) {
				encodeBuffer.skip(this.astBetDetail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			if (4<csproto.CSProto.Version) {
				encodeBuffer.write(Uint8Array, this.bOneBetBaseTag);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wMapID = decodeBuffer.read(Uint16Array, 1);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			this.dwTableID = decodeBuffer.read(Uint32Array, 1);
			decodeBuffer.skip(this.stAllData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			this.dwBetTotalGold = decodeBuffer.read(Uint32Array, 1);
			var astBetDetailSize = decodeBuffer.read(Uint16Array, 1);
			this.astBetDetail = new Array<PROPERTY>(astBetDetailSize);
			for (var i = 0; i <  astBetDetailSize; i++) {
				this.astBetDetail[i] = new PROPERTY();
				decodeBuffer.skip(this.astBetDetail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			if (4<csproto.CSProto.Version) {
				this.bOneBetBaseTag = decodeBuffer.read(Uint8Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_LOTTERY_REFRESHDATA_SC implements message {
		public stTimerData: LotteryTimerData = new LotteryTimerData();  //对应当前数据 

		public messageName(): string { return "CMD_LOTTERY_REFRESHDATA";}
		public messageValue(): number { return CMD_LOTTERY_REFRESHDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.skip(this.stTimerData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			decodeBuffer.skip(this.stTimerData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class CMD_LOTTERY_ROUND_END_SC implements message {
		public stNewstData: LotteryAllData = new LotteryAllData();  //对应开奖后的转轮数据,序号及奖池数据等所有数据己刷新为发奖后的最新数据 
		public bLotteryRet: number = 0;  //当前对应的开奖结果 
		public bFengChePayTimes: number = 0;  //当开奖结果是风车时对应了普通风车的开奖倍数 
		public dwGotGoldAll: number = 0;  //获得金币总数 

		public messageName(): string { return "CMD_LOTTERY_ROUND_END";}
		public messageValue(): number { return CMD_LOTTERY_ROUND_END;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.skip(this.stNewstData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.write(Uint8Array, this.bLotteryRet);
			encodeBuffer.write(Uint8Array, this.bFengChePayTimes);
			encodeBuffer.write(Uint32Array, this.dwGotGoldAll);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			decodeBuffer.skip(this.stNewstData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			this.bLotteryRet = decodeBuffer.read(Uint8Array, 1);
			this.bFengChePayTimes = decodeBuffer.read(Uint8Array, 1);
			this.dwGotGoldAll = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_LOTTERY_HERORANK_SC implements message {
		public astRankList: Array<OneRankData> = new Array<OneRankData>();  //分页结果列表,仅当前三名变化时会通知刷新 

		public messageName(): string { return "CMD_LOTTERY_HERORANK";}
		public messageValue(): number { return CMD_LOTTERY_HERORANK;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var astRankListSize = this.astRankList.length > MAX_LOTTERY_HERORANK_LIST_SIZE ? MAX_LOTTERY_HERORANK_LIST_SIZE : this.astRankList.length;
			encodeBuffer.write(Uint16Array, astRankListSize);
			this.astRankList.length = astRankListSize;
			for (var i = 0; i <  astRankListSize; i++) {
				encodeBuffer.skip(this.astRankList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var astRankListSize = decodeBuffer.read(Uint16Array, 1);
			this.astRankList = new Array<OneRankData>(astRankListSize);
			for (var i = 0; i <  astRankListSize; i++) {
				this.astRankList[i] = new OneRankData();
				decodeBuffer.skip(this.astRankList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_SCENE_ONLINELIST_PAGE_CS implements message {
		public dwSceneID: number = 0;  //对应要查询的场景ID,目前逻辑限制了只能查询摩天轮中的在线 
		public wPageIndex: number = 0;  //注是从1开始,查询的页码 

		public messageName(): string { return "CMD_SCENE_ONLINELIST_PAGE";}
		public messageValue(): number { return CMD_SCENE_ONLINELIST_PAGE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			encodeBuffer.write(Uint16Array, this.wPageIndex);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			this.wPageIndex = decodeBuffer.read(Uint16Array, 1);
			return decodeBuffer.length();
		}
	}

	export class OneOnlineAcc implements message {
		public szRankName: string = "";  //角色名字 
		public wRank: number = 0;  //对应的排名 
		public wVipLvl: number = 0;  //vip等级 
		public bHeadPhoto: number = 0;  //系统头像 
		public bSex: number = 0;  //性别,目前暂时无用 

		public messageName(): string { return "OneOnlineAcc";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szRankName, MAX_ROLE_NAME_LEN);
			encodeBuffer.write(Uint16Array, this.wRank);
			encodeBuffer.write(Uint16Array, this.wVipLvl);
			encodeBuffer.write(Uint8Array, this.bHeadPhoto);
			encodeBuffer.write(Uint8Array, this.bSex);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szRankName = decodeBuffer.readString(MAX_ROLE_NAME_LEN);
			this.wRank = decodeBuffer.read(Uint16Array, 1);
			this.wVipLvl = decodeBuffer.read(Uint16Array, 1);
			this.bHeadPhoto = decodeBuffer.read(Uint8Array, 1);
			this.bSex = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_SCENE_ONLINELIST_PAGE_SC implements message {
		public stPagePara: PageBreakPara = new PageBreakPara();  //分页相关数据 
		public astRankList: Array<OneOnlineAcc> = new Array<OneOnlineAcc>();  //查询分页结果列表 
		public dwSceneID: number = 0;  //对应要查询的场景ID,目前逻辑限制了只能查询摩天轮中的在线 

		public messageName(): string { return "CMD_SCENE_ONLINELIST_PAGE";}
		public messageValue(): number { return CMD_SCENE_ONLINELIST_PAGE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.skip(this.stPagePara.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			var astRankListSize = this.astRankList.length > MAX_ONLINERANK_LIST_SIZE ? MAX_ONLINERANK_LIST_SIZE : this.astRankList.length;
			encodeBuffer.write(Uint16Array, astRankListSize);
			this.astRankList.length = astRankListSize;
			for (var i = 0; i <  astRankListSize; i++) {
				encodeBuffer.skip(this.astRankList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			if (2<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwSceneID);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			decodeBuffer.skip(this.stPagePara.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			var astRankListSize = decodeBuffer.read(Uint16Array, 1);
			this.astRankList = new Array<OneOnlineAcc>(astRankListSize);
			for (var i = 0; i <  astRankListSize; i++) {
				this.astRankList[i] = new OneOnlineAcc();
				decodeBuffer.skip(this.astRankList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			if (2<csproto.CSProto.Version) {
				this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_LOTTERY_REFRESH_SELF_BET_SC implements message {
		public llAccCurOwnGold: number = 0;  //玩家当前实际拥有的币数,若有预扣这里需要回滚 
		public dwBetTotalGold: number = 0;  //总下注币数 
		public astBetDetail: Array<PROPERTY> = new Array<PROPERTY>();  //当前对应当转的己下注列表,若已经下注则有数据 
		public dwRoundID: number = 0;  //对应的相关转数序号 

		public messageName(): string { return "CMD_LOTTERY_REFRESH_SELF_BET";}
		public messageValue(): number { return CMD_LOTTERY_REFRESH_SELF_BET;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Float64Array, this.llAccCurOwnGold);
			encodeBuffer.write(Uint32Array, this.dwBetTotalGold);
			var astBetDetailSize = this.astBetDetail.length > 10 ? 10 : this.astBetDetail.length;
			encodeBuffer.write(Uint16Array, astBetDetailSize);
			this.astBetDetail.length = astBetDetailSize;
			for (var i = 0; i <  astBetDetailSize; i++) {
				encodeBuffer.skip(this.astBetDetail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			if (10<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwRoundID);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.llAccCurOwnGold = decodeBuffer.read(Float64Array, 1);
			this.dwBetTotalGold = decodeBuffer.read(Uint32Array, 1);
			var astBetDetailSize = decodeBuffer.read(Uint16Array, 1);
			this.astBetDetail = new Array<PROPERTY>(astBetDetailSize);
			for (var i = 0; i <  astBetDetailSize; i++) {
				this.astBetDetail[i] = new PROPERTY();
				decodeBuffer.skip(this.astBetDetail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			if (10<csproto.CSProto.Version) {
				this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class OneChatHisMsg implements message {
		public szSender: string = "";  //发送方 
		public szChatDetail: string = "";  //聊天内容 
		public bSenderVipLvl: number = 0;  //发送方VIP等级 
		public bIsSelfSend: number = 0;  //是否收到方就是发送方自己 
		public bSenderSex: number = 0;  //发送方性别,目前不会用到 
		public bHeadPhoto: number = 0;  //系统头像,目前不会用到 
		public bChannel: number = 0;  //聊天频道,参见EnChatChannel定义 
		public bChatType: number = 0;  //消息类型,参见CHAT_TYPE_ZJH_PREDEF等定义 
		public llSenderRoleID: number = 0;  //当为玩家触发消息时对应的发送方角色ID 

		public messageName(): string { return "OneChatHisMsg";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szSender, MAX_ROLE_NAME_LEN);
			encodeBuffer.writeString(this.szChatDetail, MAX_CHAT_MSG_LEN);
			encodeBuffer.write(Uint8Array, this.bSenderVipLvl);
			encodeBuffer.write(Uint8Array, this.bIsSelfSend);
			encodeBuffer.write(Uint8Array, this.bSenderSex);
			encodeBuffer.write(Uint8Array, this.bHeadPhoto);
			if (2<csproto.CSProto.Version) {
				encodeBuffer.write(Uint8Array, this.bChannel);
			}
			if (16<csproto.CSProto.Version) {
				encodeBuffer.write(Uint8Array, this.bChatType);
			}
			if (27<csproto.CSProto.Version) {
				encodeBuffer.write(Float64Array, this.llSenderRoleID);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szSender = decodeBuffer.readString(MAX_ROLE_NAME_LEN);
			this.szChatDetail = decodeBuffer.readString(MAX_CHAT_MSG_LEN);
			this.bSenderVipLvl = decodeBuffer.read(Uint8Array, 1);
			this.bIsSelfSend = decodeBuffer.read(Uint8Array, 1);
			this.bSenderSex = decodeBuffer.read(Uint8Array, 1);
			this.bHeadPhoto = decodeBuffer.read(Uint8Array, 1);
			if (2<csproto.CSProto.Version) {
				this.bChannel = decodeBuffer.read(Uint8Array, 1);
			}
			if (16<csproto.CSProto.Version) {
				this.bChatType = decodeBuffer.read(Uint8Array, 1);
			}
			if (27<csproto.CSProto.Version) {
				this.llSenderRoleID = decodeBuffer.read(Float64Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_LOTTERY_HISTORY_CHATMSG_SC implements message {
		public astHisList: Array<OneChatHisMsg> = new Array<OneChatHisMsg>();  //历史记录 

		public messageName(): string { return "CMD_LOTTERY_HISTORY_CHATMSG";}
		public messageValue(): number { return CMD_LOTTERY_HISTORY_CHATMSG;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var astHisListSize = this.astHisList.length > MAX_HISCHAT_LIST_SIZE ? MAX_HISCHAT_LIST_SIZE : this.astHisList.length;
			encodeBuffer.write(Uint16Array, astHisListSize);
			this.astHisList.length = astHisListSize;
			for (var i = 0; i <  astHisListSize; i++) {
				encodeBuffer.skip(this.astHisList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var astHisListSize = decodeBuffer.read(Uint16Array, 1);
			this.astHisList = new Array<OneChatHisMsg>(astHisListSize);
			for (var i = 0; i <  astHisListSize; i++) {
				this.astHisList[i] = new OneChatHisMsg();
				decodeBuffer.skip(this.astHisList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_WARP_CS implements message {
		public wMapID: number = 0;  //想要进入的房间对应地图ID参见MAP_TEMPLATE_ID_NORMAL_SLOT等枚举 
		public wTableID: number = 0;  //对应房间ID目前仅在加入扎金花贵宾场时用到 
		public szPWD: string = "";  //对应设置的房间密码目前仅在创建或者加入扎金花贵宾场时用到 

		public messageName(): string { return "CMD_WARP";}
		public messageValue(): number { return CMD_WARP;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wMapID);
			if (33<csproto.CSProto.Version) {
				encodeBuffer.write(Uint16Array, this.wTableID);
			}
			if (33<csproto.CSProto.Version) {
				encodeBuffer.writeString(this.szPWD, 10);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wMapID = decodeBuffer.read(Uint16Array, 1);
			if (33<csproto.CSProto.Version) {
				this.wTableID = decodeBuffer.read(Uint16Array, 1);
			}
			if (33<csproto.CSProto.Version) {
				this.szPWD = decodeBuffer.readString(10);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_WARP_SC implements message {
		public wMapID: number = 0;  //将要被传送至的房间对应地图ID参见MAP_TEMPLATE_ID_NORMAL_SLOT等枚举 
		public wTableID: number = 0;  //对应房间ID目前仅扎金花创建贵宾场时用到 
		public szPWD: string = "";  //对应设置的房间密码目前仅扎金花创建贵宾场时用到 

		public messageName(): string { return "CMD_WARP";}
		public messageValue(): number { return CMD_WARP;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wMapID);
			if (33<csproto.CSProto.Version) {
				encodeBuffer.write(Uint16Array, this.wTableID);
			}
			if (33<csproto.CSProto.Version) {
				encodeBuffer.writeString(this.szPWD, 10);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wMapID = decodeBuffer.read(Uint16Array, 1);
			if (33<csproto.CSProto.Version) {
				this.wTableID = decodeBuffer.read(Uint16Array, 1);
			}
			if (33<csproto.CSProto.Version) {
				this.szPWD = decodeBuffer.readString(10);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_GM_CS implements message {
		public aszDetail: string = "";  //xxx 
		public aszDetailExt: string = "";  //xxx 

		public messageName(): string { return "CMD_GM";}
		public messageValue(): number { return CMD_GM;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.aszDetail, 256);
			encodeBuffer.writeString(this.aszDetailExt, 256);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.aszDetail = decodeBuffer.readString(256);
			this.aszDetailExt = decodeBuffer.readString(256);
			return decodeBuffer.length();
		}
	}

	export class CMD_GM_SC implements message {
		public aszRetDetail: string = "";  //xxx 

		public messageName(): string { return "CMD_GM";}
		public messageValue(): number { return CMD_GM;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.aszRetDetail, 256);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.aszRetDetail = decodeBuffer.readString(256);
			return decodeBuffer.length();
		}
	}

	export class CMD_SCENE_HISTORY_CHATMSG_SC implements message {
		public astHisList: Array<OneChatHisMsg> = new Array<OneChatHisMsg>();  //历史记录 

		public messageName(): string { return "CMD_SCENE_HISTORY_CHATMSG";}
		public messageValue(): number { return CMD_SCENE_HISTORY_CHATMSG;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var astHisListSize = this.astHisList.length > MAX_HISCHAT_LIST_SIZE ? MAX_HISCHAT_LIST_SIZE : this.astHisList.length;
			encodeBuffer.write(Uint16Array, astHisListSize);
			this.astHisList.length = astHisListSize;
			for (var i = 0; i <  astHisListSize; i++) {
				encodeBuffer.skip(this.astHisList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var astHisListSize = decodeBuffer.read(Uint16Array, 1);
			this.astHisList = new Array<OneChatHisMsg>(astHisListSize);
			for (var i = 0; i <  astHisListSize; i++) {
				this.astHisList[i] = new OneChatHisMsg();
				decodeBuffer.skip(this.astHisList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_BET_ON_CS implements message {
		public bOneBetBaseTag: number = 0;  //单注数量序号,参见LOTTERY_ONEBET_BASE_TAG_1等系列枚举 
		public astBetDetail: Array<PROPERTY> = new Array<PROPERTY>();  //下注列表 
		public dwRoundID: number = 0;  //对应的相关转数序号 

		public messageName(): string { return "CMD_CLASSICFRUIT_BET_ON";}
		public messageValue(): number { return CMD_CLASSICFRUIT_BET_ON;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bOneBetBaseTag);
			var astBetDetailSize = this.astBetDetail.length > 10 ? 10 : this.astBetDetail.length;
			encodeBuffer.write(Uint16Array, astBetDetailSize);
			this.astBetDetail.length = astBetDetailSize;
			for (var i = 0; i <  astBetDetailSize; i++) {
				encodeBuffer.skip(this.astBetDetail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			if (10<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwRoundID);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bOneBetBaseTag = decodeBuffer.read(Uint8Array, 1);
			var astBetDetailSize = decodeBuffer.read(Uint16Array, 1);
			this.astBetDetail = new Array<PROPERTY>(astBetDetailSize);
			for (var i = 0; i <  astBetDetailSize; i++) {
				this.astBetDetail[i] = new PROPERTY();
				decodeBuffer.skip(this.astBetDetail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			if (10<csproto.CSProto.Version) {
				this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_BET_ON_SC implements message {
		public dwRoundID: number = 0;  //对应的相关转数序号,目前仅用于调试方便 
		public dwBetTotalGold: number = 0;  //总下注币数 

		public messageName(): string { return "CMD_CLASSICFRUIT_BET_ON";}
		public messageValue(): number { return CMD_CLASSICFRUIT_BET_ON;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwRoundID);
			encodeBuffer.write(Uint32Array, this.dwBetTotalGold);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			this.dwBetTotalGold = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class ClassicFruitPoolBetDetail implements message {
		public astPrizeBetList: Array<PROPERTY> = new Array<PROPERTY>();  //当前对应当转的各奖项具体下注列表 

		public messageName(): string { return "ClassicFruitPoolBetDetail";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var astPrizeBetListSize = this.astPrizeBetList.length > 10 ? 10 : this.astPrizeBetList.length;
			encodeBuffer.write(Uint16Array, astPrizeBetListSize);
			this.astPrizeBetList.length = astPrizeBetListSize;
			for (var i = 0; i <  astPrizeBetListSize; i++) {
				encodeBuffer.skip(this.astPrizeBetList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var astPrizeBetListSize = decodeBuffer.read(Uint16Array, 1);
			this.astPrizeBetList = new Array<PROPERTY>(astPrizeBetListSize);
			for (var i = 0; i <  astPrizeBetListSize; i++) {
				this.astPrizeBetList[i] = new PROPERTY();
				decodeBuffer.skip(this.astPrizeBetList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class ClassicFruitBanker implements message {
		public dwObjectID: number = 0;  //实体handle 
		public wLevel: number = 0;  //等级 
		public wVipLevel: number = 0;  //VIP等级 
		public szName: string = "";  //字符串类型的名字 
		public bSex: number = 0;  //性别,目前不会用到 
		public bHeadPhoto: number = 0;  //系统头像,目前不会用到 
		public bBankerLeftRound: number = 0;  //当前庄家剩余局数 
		public llOwnGold: number = 0;  //拥有的金币 
		public szSelfDefPhoto: string = "";  //玩家自定义头像,长度不为0时以此为准 

		public messageName(): string { return "ClassicFruitBanker";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwObjectID);
			encodeBuffer.write(Uint16Array, this.wLevel);
			encodeBuffer.write(Uint16Array, this.wVipLevel);
			encodeBuffer.writeString(this.szName, MAX_ROLE_NAME_LEN);
			encodeBuffer.write(Uint8Array, this.bSex);
			encodeBuffer.write(Uint8Array, this.bHeadPhoto);
			encodeBuffer.write(Uint8Array, this.bBankerLeftRound);
			encodeBuffer.write(Float64Array, this.llOwnGold);
			if (5<csproto.CSProto.Version) {
				encodeBuffer.writeString(this.szSelfDefPhoto, MAX_ROLE_SELFDEF_PHOTO_LEN);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwObjectID = decodeBuffer.read(Uint32Array, 1);
			this.wLevel = decodeBuffer.read(Uint16Array, 1);
			this.wVipLevel = decodeBuffer.read(Uint16Array, 1);
			this.szName = decodeBuffer.readString(MAX_ROLE_NAME_LEN);
			this.bSex = decodeBuffer.read(Uint8Array, 1);
			this.bHeadPhoto = decodeBuffer.read(Uint8Array, 1);
			this.bBankerLeftRound = decodeBuffer.read(Uint8Array, 1);
			this.llOwnGold = decodeBuffer.read(Float64Array, 1);
			if (5<csproto.CSProto.Version) {
				this.szSelfDefPhoto = decodeBuffer.readString(MAX_ROLE_SELFDEF_PHOTO_LEN);
			}
			return decodeBuffer.length();
		}
	}

	export class ClassicFruitRoundBankerSwitch implements message {
		public bSwitchType: number = 0;  //庄家变更状态,参见CLASSFRUIT_BANKER_SWITCHTYPE_NONE等系列枚举 
		public llBankerRoundWinGold: number = 0;  //本局存在庄家时的本局获得钱数,可正可负 
		public llBankerTotalWinGold: number = 0;  //庄家最终结算获得钱数,可正可负 
		public llBankerTotalSysCostGold: number = 0;  //庄家最终结算获得钱数为正时被系统所扣钱数 
		public bIsBankerRupt: number = 0;  //庄家下庄时是否爆庄 
		public bIsOffBankerSelf: number = 0;  //该协议收到者是否是下庄庄家自己 

		public messageName(): string { return "ClassicFruitRoundBankerSwitch";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bSwitchType);
			if (CLASSFRUIT_BANKER_SWITCHTYPE_NONE!=this.bSwitchType) {
				encodeBuffer.write(Float64Array, this.llBankerRoundWinGold);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				encodeBuffer.write(Float64Array, this.llBankerTotalWinGold);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				encodeBuffer.write(Float64Array, this.llBankerTotalSysCostGold);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				encodeBuffer.write(Uint8Array, this.bIsBankerRupt);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				encodeBuffer.write(Uint8Array, this.bIsOffBankerSelf);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bSwitchType = decodeBuffer.read(Uint8Array, 1);
			if (CLASSFRUIT_BANKER_SWITCHTYPE_NONE!=this.bSwitchType) {
				this.llBankerRoundWinGold = decodeBuffer.read(Float64Array, 1);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				this.llBankerTotalWinGold = decodeBuffer.read(Float64Array, 1);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				this.llBankerTotalSysCostGold = decodeBuffer.read(Float64Array, 1);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				this.bIsBankerRupt = decodeBuffer.read(Uint8Array, 1);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				this.bIsOffBankerSelf = decodeBuffer.read(Uint8Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class ClassicFruitAllData implements message {
		public dwRoundID: number = 0;  //对应的相关转数序号,目前仅用于调试方便 
		public bTabStatus: number = 0;  //当前状态,参见LOTTERY_CURSTATUS_CANBET等系列枚举 
		public wLeftBetTime: number = 0;  //当前对应剩余可下注秒数 
		public abHisPrize: Array<number> = new Array<number>();  //历史开出结果小于等于6个以实际长度为准靠左边的为最新 
		public stPoolBetDetail: ClassicFruitPoolBetDetail = new ClassicFruitPoolBetDetail();  //当前对应当转的各奖项具体下注列表 
		public bIsHasBanker: number = 0;  //为0无庄家,其他则有庄家 
		public stBankerInfo: ClassicFruitBanker = new ClassicFruitBanker();  //桌台当前的庄家信息 

		public messageName(): string { return "ClassicFruitAllData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwRoundID);
			encodeBuffer.write(Uint8Array, this.bTabStatus);
			if (this.bTabStatus==LOTTERY_CURSTATUS_CANBET) {
				encodeBuffer.write(Uint8Array, this.wLeftBetTime);
			}
			var abHisPrizeSize = this.abHisPrize.length > MAX_CLASSICFRUIT_SCENE_HISPRIZE_LEN ? MAX_CLASSICFRUIT_SCENE_HISPRIZE_LEN : this.abHisPrize.length;
			encodeBuffer.write(Uint16Array, abHisPrizeSize);
			this.abHisPrize.length = abHisPrizeSize;
			encodeBuffer.write(Uint8Array, this.abHisPrize);
			encodeBuffer.skip(this.stPoolBetDetail.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.write(Uint8Array, this.bIsHasBanker);
			if (0!=this.bIsHasBanker) {
				encodeBuffer.skip(this.stBankerInfo.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			this.bTabStatus = decodeBuffer.read(Uint8Array, 1);
			if (this.bTabStatus==LOTTERY_CURSTATUS_CANBET) {
				this.wLeftBetTime = decodeBuffer.read(Uint8Array, 1);
			}
			var abHisPrizeSize = decodeBuffer.read(Uint16Array, 1);
			this.abHisPrize = new Array<number>(abHisPrizeSize);
			this.abHisPrize = decodeBuffer.read(Uint8Array, abHisPrizeSize);
			decodeBuffer.skip(this.stPoolBetDetail.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			this.bIsHasBanker = decodeBuffer.read(Uint8Array, 1);
			if (0!=this.bIsHasBanker) {
				decodeBuffer.skip(this.stBankerInfo.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class ClassicFruitTimerData implements message {
		public bTabStatus: number = 0;  //当前状态,参见LOTTERY_CURSTATUS_CANBET等系列枚举 
		public stPoolBetDetail: ClassicFruitPoolBetDetail = new ClassicFruitPoolBetDetail();  //当前对应当转的各奖项具体下注列表 
		public dwCurOnlineAcc: number = 0;  //当前对应在线人数 
		public dwRoundID: number = 0;  //对应的相关转数序号 

		public messageName(): string { return "ClassicFruitTimerData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bTabStatus);
			encodeBuffer.skip(this.stPoolBetDetail.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.write(Uint32Array, this.dwCurOnlineAcc);
			if (10<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwRoundID);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bTabStatus = decodeBuffer.read(Uint8Array, 1);
			decodeBuffer.skip(this.stPoolBetDetail.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			this.dwCurOnlineAcc = decodeBuffer.read(Uint32Array, 1);
			if (10<csproto.CSProto.Version) {
				this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_ENTERDATA_SC implements message {
		public wMapID: number = 0;  //对应地图模板ID参见MAP_TEMPLATE_ID_CLASSIC_FRUIT等枚举 
		public dwSceneID: number = 0;  //对应的场景ID游戏内唯一是游戏内所有桌台统一编号的索引 
		public dwTableID: number = 0;  //对应的桌台ID,目前无用 
		public stAllData: ClassicFruitAllData = new ClassicFruitAllData();  //对应当前数据 
		public dwBetTotalGold: number = 0;  //总下注币数 
		public astBetDetail: Array<PROPERTY> = new Array<PROPERTY>();  //当前对应当转的玩家己下注列表,若已经下注则有数据 
		public bPlayerBankerStat: number = 0;  //玩家自己的庄家相关状态 
		public dwCurOnlineAcc: number = 0;  //当前对应在线人数 
		public bOneBetBaseTag: number = 0;  //玩家自己下注的单注数量序号,参见LOTTERY_ONEBET_BASE_TAG_1等系列枚举 
		public bIfCanJoinPlay: number = 0;  //是否可参与该玩法:0不行 1可以 
		public dwBankerQueuePos: number = 0;  //当在排庄队列中时代表当前位置 

		public messageName(): string { return "CMD_CLASSICFRUIT_ENTERDATA";}
		public messageValue(): number { return CMD_CLASSICFRUIT_ENTERDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wMapID);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			encodeBuffer.write(Uint32Array, this.dwTableID);
			encodeBuffer.skip(this.stAllData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.write(Uint32Array, this.dwBetTotalGold);
			var astBetDetailSize = this.astBetDetail.length > 10 ? 10 : this.astBetDetail.length;
			encodeBuffer.write(Uint16Array, astBetDetailSize);
			this.astBetDetail.length = astBetDetailSize;
			for (var i = 0; i <  astBetDetailSize; i++) {
				encodeBuffer.skip(this.astBetDetail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			encodeBuffer.write(Uint8Array, this.bPlayerBankerStat);
			encodeBuffer.write(Uint32Array, this.dwCurOnlineAcc);
			if (4<csproto.CSProto.Version) {
				encodeBuffer.write(Uint8Array, this.bOneBetBaseTag);
			}
			if (25<csproto.CSProto.Version) {
				encodeBuffer.write(Uint8Array, this.bIfCanJoinPlay);
			}
			if (25<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwBankerQueuePos);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wMapID = decodeBuffer.read(Uint16Array, 1);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			this.dwTableID = decodeBuffer.read(Uint32Array, 1);
			decodeBuffer.skip(this.stAllData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			this.dwBetTotalGold = decodeBuffer.read(Uint32Array, 1);
			var astBetDetailSize = decodeBuffer.read(Uint16Array, 1);
			this.astBetDetail = new Array<PROPERTY>(astBetDetailSize);
			for (var i = 0; i <  astBetDetailSize; i++) {
				this.astBetDetail[i] = new PROPERTY();
				decodeBuffer.skip(this.astBetDetail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			this.bPlayerBankerStat = decodeBuffer.read(Uint8Array, 1);
			this.dwCurOnlineAcc = decodeBuffer.read(Uint32Array, 1);
			if (4<csproto.CSProto.Version) {
				this.bOneBetBaseTag = decodeBuffer.read(Uint8Array, 1);
			}
			if (25<csproto.CSProto.Version) {
				this.bIfCanJoinPlay = decodeBuffer.read(Uint8Array, 1);
			}
			if (25<csproto.CSProto.Version) {
				this.dwBankerQueuePos = decodeBuffer.read(Uint32Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_REFRESHDATA_SC implements message {
		public stTimerData: ClassicFruitTimerData = new ClassicFruitTimerData();  //对应当前数据 

		public messageName(): string { return "CMD_CLASSICFRUIT_REFRESHDATA";}
		public messageValue(): number { return CMD_CLASSICFRUIT_REFRESHDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.skip(this.stTimerData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			decodeBuffer.skip(this.stTimerData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_ROUND_END_SC implements message {
		public stNewstData: ClassicFruitAllData = new ClassicFruitAllData();  //对应开奖后的转轮数据,序号及奖池数据等所有数据己刷新为发奖后的最新数据 
		public bClassicFruitRet: number = 0;  //当前对应的开奖结果 
		public dwGotGoldAll: number = 0;  //本局自己获得金币总数 
		public stBankerSwitchInfo: ClassicFruitRoundBankerSwitch = new ClassicFruitRoundBankerSwitch();  //庄家变更相关描述数据 
		public dwBankerQueuePos: number = 0;  //当在排庄队列中时代表当前位置 
		public llGotGoldAll: number = 0;  //本局自己获得金币总数新版本客户端统一使用这个字段dwGotGoldAll未来会废弃 

		public messageName(): string { return "CMD_CLASSICFRUIT_ROUND_END";}
		public messageValue(): number { return CMD_CLASSICFRUIT_ROUND_END;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.skip(this.stNewstData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.write(Uint8Array, this.bClassicFruitRet);
			encodeBuffer.write(Uint32Array, this.dwGotGoldAll);
			encodeBuffer.skip(this.stBankerSwitchInfo.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			if (25<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwBankerQueuePos);
			}
			if (28<csproto.CSProto.Version) {
				encodeBuffer.write(Float64Array, this.llGotGoldAll);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			decodeBuffer.skip(this.stNewstData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			this.bClassicFruitRet = decodeBuffer.read(Uint8Array, 1);
			this.dwGotGoldAll = decodeBuffer.read(Uint32Array, 1);
			decodeBuffer.skip(this.stBankerSwitchInfo.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			if (25<csproto.CSProto.Version) {
				this.dwBankerQueuePos = decodeBuffer.read(Uint32Array, 1);
			}
			if (28<csproto.CSProto.Version) {
				this.llGotGoldAll = decodeBuffer.read(Float64Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_REFRESH_SELF_BET_SC implements message {
		public dwAccCurOwnGold: number = 0;  //玩家当前实际拥有的币数,若有预扣这里需要回滚 
		public dwBetTotalGold: number = 0;  //总下注币数 
		public astBetDetail: Array<PROPERTY> = new Array<PROPERTY>();  //当前对应当转的己下注列表,若已经下注则有数据 
		public dwRoundID: number = 0;  //对应的相关转数序号 

		public messageName(): string { return "CMD_CLASSICFRUIT_REFRESH_SELF_BET";}
		public messageValue(): number { return CMD_CLASSICFRUIT_REFRESH_SELF_BET;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwAccCurOwnGold);
			encodeBuffer.write(Uint32Array, this.dwBetTotalGold);
			var astBetDetailSize = this.astBetDetail.length > 10 ? 10 : this.astBetDetail.length;
			encodeBuffer.write(Uint16Array, astBetDetailSize);
			this.astBetDetail.length = astBetDetailSize;
			for (var i = 0; i <  astBetDetailSize; i++) {
				encodeBuffer.skip(this.astBetDetail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			if (10<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwRoundID);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwAccCurOwnGold = decodeBuffer.read(Uint32Array, 1);
			this.dwBetTotalGold = decodeBuffer.read(Uint32Array, 1);
			var astBetDetailSize = decodeBuffer.read(Uint16Array, 1);
			this.astBetDetail = new Array<PROPERTY>(astBetDetailSize);
			for (var i = 0; i <  astBetDetailSize; i++) {
				this.astBetDetail[i] = new PROPERTY();
				decodeBuffer.skip(this.astBetDetail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			if (10<csproto.CSProto.Version) {
				this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_SIGNUP_BANKER_SC implements message {
		public wQueuePos: number = 0;  //在队列中的位置 
		public bPlayerBankerStat: number = 0;  //玩家的庄家状态 
		public szSuccTips: string = "";  //上庄成功相关的提示 

		public messageName(): string { return "CMD_CLASSICFRUIT_SIGNUP_BANKER";}
		public messageValue(): number { return CMD_CLASSICFRUIT_SIGNUP_BANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wQueuePos);
			encodeBuffer.write(Uint8Array, this.bPlayerBankerStat);
			encodeBuffer.writeString(this.szSuccTips, 256);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wQueuePos = decodeBuffer.read(Uint16Array, 1);
			this.bPlayerBankerStat = decodeBuffer.read(Uint8Array, 1);
			this.szSuccTips = decodeBuffer.readString(256);
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_QUIT_BANKER_SC implements message {
		public bPlayerBankerStat: number = 0;  //玩家的庄家状态 

		public messageName(): string { return "CMD_CLASSICFRUIT_QUIT_BANKER";}
		public messageValue(): number { return CMD_CLASSICFRUIT_QUIT_BANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bPlayerBankerStat);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bPlayerBankerStat = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_UPDATE_BANKER_STAT_SC implements message {
		public bPlayerBankerStat: number = 0;  //玩家的庄家状态 
		public wQueuePos: number = 0;  //在队列中的位置 

		public messageName(): string { return "CMD_CLASSICFRUIT_UPDATE_BANKER_STAT";}
		public messageValue(): number { return CMD_CLASSICFRUIT_UPDATE_BANKER_STAT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bPlayerBankerStat);
			encodeBuffer.write(Uint16Array, this.wQueuePos);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bPlayerBankerStat = decodeBuffer.read(Uint8Array, 1);
			this.wQueuePos = decodeBuffer.read(Uint16Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_CURBANKERLIST_SC implements message {
		public astBankerList: Array<ClassicFruitBanker> = new Array<ClassicFruitBanker>();  //当前排队中的庄家列表 

		public messageName(): string { return "CMD_CLASSICFRUIT_CURBANKERLIST";}
		public messageValue(): number { return CMD_CLASSICFRUIT_CURBANKERLIST;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var astBankerListSize = this.astBankerList.length > 3 ? 3 : this.astBankerList.length;
			encodeBuffer.write(Uint16Array, astBankerListSize);
			this.astBankerList.length = astBankerListSize;
			for (var i = 0; i <  astBankerListSize; i++) {
				encodeBuffer.skip(this.astBankerList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var astBankerListSize = decodeBuffer.read(Uint16Array, 1);
			this.astBankerList = new Array<ClassicFruitBanker>(astBankerListSize);
			for (var i = 0; i <  astBankerListSize; i++) {
				this.astBankerList[i] = new ClassicFruitBanker();
				decodeBuffer.skip(this.astBankerList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_UPDATE_CURBANKER_SC implements message {
		public bIsHasBanker: number = 0;  //为0无庄家,其他则有庄家 
		public stBankerInfo: ClassicFruitBanker = new ClassicFruitBanker();  //桌台当前的庄家信息 

		public messageName(): string { return "CMD_CLASSICFRUIT_UPDATE_CURBANKER";}
		public messageValue(): number { return CMD_CLASSICFRUIT_UPDATE_CURBANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bIsHasBanker);
			if (0!=this.bIsHasBanker) {
				encodeBuffer.skip(this.stBankerInfo.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bIsHasBanker = decodeBuffer.read(Uint8Array, 1);
			if (0!=this.bIsHasBanker) {
				decodeBuffer.skip(this.stBankerInfo.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class OneNewMsgTag implements message {
		public llFuncType: number = 0;  //功能类型 
		public bRelateNum: number = 0;  //对应标记数字 

		public messageName(): string { return "OneNewMsgTag";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Float64Array, this.llFuncType);
			encodeBuffer.write(Uint8Array, this.bRelateNum);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.llFuncType = decodeBuffer.read(Float64Array, 1);
			this.bRelateNum = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_NEWMSG_TAG_CS implements message {
		public llFuncType: number = 0;  //通知清除标记的功能不会有对应下行,客户端发出上行后自行清理 

		public messageName(): string { return "CMD_NEWMSG_TAG";}
		public messageValue(): number { return CMD_NEWMSG_TAG;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Float64Array, this.llFuncType);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.llFuncType = decodeBuffer.read(Float64Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_NEWMSG_TAG_SC implements message {
		public astTagList: Array<OneNewMsgTag> = new Array<OneNewMsgTag>();  //服务器主动通知的当前需要打点的列表 

		public messageName(): string { return "CMD_NEWMSG_TAG";}
		public messageValue(): number { return CMD_NEWMSG_TAG;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var astTagListSize = this.astTagList.length > MAX_NEWMSGTAG_LIST_LEN ? MAX_NEWMSGTAG_LIST_LEN : this.astTagList.length;
			encodeBuffer.write(Uint16Array, astTagListSize);
			this.astTagList.length = astTagListSize;
			for (var i = 0; i <  astTagListSize; i++) {
				encodeBuffer.skip(this.astTagList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var astTagListSize = decodeBuffer.read(Uint16Array, 1);
			this.astTagList = new Array<OneNewMsgTag>(astTagListSize);
			for (var i = 0; i <  astTagListSize; i++) {
				this.astTagList[i] = new OneNewMsgTag();
				decodeBuffer.skip(this.astTagList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_RANKAWARD_CS implements message {
		public bRankClass: number = 0;  //排行榜分类,参见RANK_CLASS_VIPLVL等枚举定义 
		public dwRankSubClass: number = 0;  //排行榜子分类:当用于标记按天充值排行榜中的历史榜单则上一天为1,为0是当天 

		public messageName(): string { return "CMD_GET_RANKAWARD";}
		public messageValue(): number { return CMD_GET_RANKAWARD;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bRankClass);
			encodeBuffer.write(Uint32Array, this.dwRankSubClass);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bRankClass = decodeBuffer.read(Uint8Array, 1);
			this.dwRankSubClass = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_RANKAWARD_SC implements message {
		public bRankClass: number = 0;  //排行榜分类,参见RANK_CLASS_VIPLVL等枚举定义 
		public dwRankSubClass: number = 0;  //排行榜子分类:当为充值榜时传1表明是获取昨天列表 
		public llGotGoldAward: number = 0;  //成功领取的金币奖励 

		public messageName(): string { return "CMD_GET_RANKAWARD";}
		public messageValue(): number { return CMD_GET_RANKAWARD;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bRankClass);
			encodeBuffer.write(Uint32Array, this.dwRankSubClass);
			encodeBuffer.write(Float64Array, this.llGotGoldAward);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bRankClass = decodeBuffer.read(Uint8Array, 1);
			this.dwRankSubClass = decodeBuffer.read(Uint32Array, 1);
			this.llGotGoldAward = decodeBuffer.read(Float64Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_PRIZEDRAW_CURINFO_SC implements message {
		public dwDrawCost: number = 0;  //当前抽奖每次消费金币数 
		public dwLeftDrawTimes: number = 0;  //剩余可抽奖次数 
		public astDrawHis: Array<PROPERTY> = new Array<PROPERTY>();  //用户每日抽奖历史记录越新的排前面 
		public dwTotalDrawTimes: number = 0;  //总可抽奖次数 

		public messageName(): string { return "CMD_PRIZEDRAW_CURINFO";}
		public messageValue(): number { return CMD_PRIZEDRAW_CURINFO;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwDrawCost);
			encodeBuffer.write(Uint32Array, this.dwLeftDrawTimes);
			var astDrawHisSize = this.astDrawHis.length > MAX_DRAWPIZEEHIS_LIST_LEN ? MAX_DRAWPIZEEHIS_LIST_LEN : this.astDrawHis.length;
			encodeBuffer.write(Uint16Array, astDrawHisSize);
			this.astDrawHis.length = astDrawHisSize;
			for (var i = 0; i <  astDrawHisSize; i++) {
				encodeBuffer.skip(this.astDrawHis[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			if (9<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwTotalDrawTimes);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwDrawCost = decodeBuffer.read(Uint32Array, 1);
			this.dwLeftDrawTimes = decodeBuffer.read(Uint32Array, 1);
			var astDrawHisSize = decodeBuffer.read(Uint16Array, 1);
			this.astDrawHis = new Array<PROPERTY>(astDrawHisSize);
			for (var i = 0; i <  astDrawHisSize; i++) {
				this.astDrawHis[i] = new PROPERTY();
				decodeBuffer.skip(this.astDrawHis[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			if (9<csproto.CSProto.Version) {
				this.dwTotalDrawTimes = decodeBuffer.read(Uint32Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_PLAY_PRIZEDRAW_SC implements message {
		public bIsDrawSucc: number = 0;  //1成功,0失败 
		public stDrawRet: PROPERTY = new PROPERTY();  //抽得的奖品,其中ID参见DRAW_PRIZE_GOLD等枚举,VAL为对应的数量 

		public messageName(): string { return "CMD_PLAY_PRIZEDRAW";}
		public messageValue(): number { return CMD_PLAY_PRIZEDRAW;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bIsDrawSucc);
			if (this.bIsDrawSucc==1) {
				encodeBuffer.skip(this.stDrawRet.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bIsDrawSucc = decodeBuffer.read(Uint8Array, 1);
			if (this.bIsDrawSucc==1) {
				decodeBuffer.skip(this.stDrawRet.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_QUERY_MONEYTREE_SC implements message {
		public bIsOwnMoneyTree: number = 0;  //是否拥有摇钱树 
		public dwMoneyTreeLvl: number = 0;  //摇钱树等级 
		public dwCanGatherMoney: number = 0;  //当前可以收获的金币 
		public dwFullGatherMoney: number = 0;  //总共将可以收获的金币 
		public dwLeftCanGather: number = 0;  //该字段后续可能会溢出新版本请使用新字段新版摇钱树剩余可收获总金币数 
		public llLeftCanGather: number = 0;  //新版本客户端使用该字段:新版摇钱树剩余可收获总金币数 

		public messageName(): string { return "CMD_QUERY_MONEYTREE";}
		public messageValue(): number { return CMD_QUERY_MONEYTREE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bIsOwnMoneyTree);
			encodeBuffer.write(Uint32Array, this.dwMoneyTreeLvl);
			encodeBuffer.write(Uint32Array, this.dwCanGatherMoney);
			encodeBuffer.write(Uint32Array, this.dwFullGatherMoney);
			if (30<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwLeftCanGather);
			}
			if (32<csproto.CSProto.Version) {
				encodeBuffer.write(Float64Array, this.llLeftCanGather);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bIsOwnMoneyTree = decodeBuffer.read(Uint8Array, 1);
			this.dwMoneyTreeLvl = decodeBuffer.read(Uint32Array, 1);
			this.dwCanGatherMoney = decodeBuffer.read(Uint32Array, 1);
			this.dwFullGatherMoney = decodeBuffer.read(Uint32Array, 1);
			if (30<csproto.CSProto.Version) {
				this.dwLeftCanGather = decodeBuffer.read(Uint32Array, 1);
			}
			if (32<csproto.CSProto.Version) {
				this.llLeftCanGather = decodeBuffer.read(Float64Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_GATHER_MONEYTREE_SC implements message {
		public dwGatherMoney: number = 0;  //最终收获的金币 
		public dwMoneyTreeLvl: number = 0;  //己弃用:摇钱树最新等级 
		public dwLeftCanGather: number = 0;  //己弃用:新版摇钱树最新剩余可收获总金币数 

		public messageName(): string { return "CMD_GATHER_MONEYTREE";}
		public messageValue(): number { return CMD_GATHER_MONEYTREE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwGatherMoney);
			if (30<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwMoneyTreeLvl);
			}
			if (30<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwLeftCanGather);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwGatherMoney = decodeBuffer.read(Uint32Array, 1);
			if (30<csproto.CSProto.Version) {
				this.dwMoneyTreeLvl = decodeBuffer.read(Uint32Array, 1);
			}
			if (30<csproto.CSProto.Version) {
				this.dwLeftCanGather = decodeBuffer.read(Uint32Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_MODIFY_NICK_CS implements message {
		public szNewName: string = "";  //角色新名字最长6汉字客户端本地昵称需要在收到对应下行后自行刷新 

		public messageName(): string { return "CMD_MODIFY_NICK";}
		public messageValue(): number { return CMD_MODIFY_NICK;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szNewName, MAX_ROLE_NAME_LEN);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szNewName = decodeBuffer.readString(MAX_ROLE_NAME_LEN);
			return decodeBuffer.length();
		}
	}

	export class CMD_MODIFY_NICK_SC implements message {
		public szNewName: string = "";  //角色新名字最长6汉字客户端本地昵称需要在收到对应下行后自行刷新 

		public messageName(): string { return "CMD_MODIFY_NICK";}
		public messageValue(): number { return CMD_MODIFY_NICK;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szNewName, MAX_ROLE_NAME_LEN);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szNewName = decodeBuffer.readString(MAX_ROLE_NAME_LEN);
			return decodeBuffer.length();
		}
	}

	export class CMD_MODIFY_SELFPROP_CS implements message {
		public astModifyList: Array<PROPERTY> = new Array<PROPERTY>();  //对应的修改列表 

		public messageName(): string { return "CMD_MODIFY_SELFPROP";}
		public messageValue(): number { return CMD_MODIFY_SELFPROP;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var astModifyListSize = this.astModifyList.length > 10 ? 10 : this.astModifyList.length;
			encodeBuffer.write(Uint16Array, astModifyListSize);
			this.astModifyList.length = astModifyListSize;
			for (var i = 0; i <  astModifyListSize; i++) {
				encodeBuffer.skip(this.astModifyList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var astModifyListSize = decodeBuffer.read(Uint16Array, 1);
			this.astModifyList = new Array<PROPERTY>(astModifyListSize);
			for (var i = 0; i <  astModifyListSize; i++) {
				this.astModifyList[i] = new PROPERTY();
				decodeBuffer.skip(this.astModifyList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_UPLOAD_HEADPHOTO_CS implements message {
		public szPhotoBinary: string = "";  //上传的头像二进制内容 

		public messageName(): string { return "CMD_UPLOAD_HEADPHOTO";}
		public messageValue(): number { return CMD_UPLOAD_HEADPHOTO;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szPhotoBinary, MAX_ROLE_SELFDEF_PIC_SIZE);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szPhotoBinary = decodeBuffer.readString(MAX_ROLE_SELFDEF_PIC_SIZE);
			return decodeBuffer.length();
		}
	}

	export class CMD_UPLOAD_HEADPHOTO_SC implements message {
		public szSelfDefPhoto: string = "";  //上传成功则返回玩家自定义头像对应http地址 

		public messageName(): string { return "CMD_UPLOAD_HEADPHOTO";}
		public messageValue(): number { return CMD_UPLOAD_HEADPHOTO;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szSelfDefPhoto, MAX_ROLE_SELFDEF_PHOTO_LEN);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szSelfDefPhoto = decodeBuffer.readString(MAX_ROLE_SELFDEF_PHOTO_LEN);
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_BET_ON_CS implements message {
		public bOneBetBaseTag: number = 0;  //单注数量序号,参见LOTTERY_ONEBET_BASE_TAG_1等系列枚举 
		public astBetDetail: Array<PROPERTY> = new Array<PROPERTY>();  //下注列表 
		public dwRoundID: number = 0;  //对应的相关转数序号 

		public messageName(): string { return "CMD_SHARK_BET_ON";}
		public messageValue(): number { return CMD_SHARK_BET_ON;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bOneBetBaseTag);
			var astBetDetailSize = this.astBetDetail.length > MAX_SHARK_BETON_LEN ? MAX_SHARK_BETON_LEN : this.astBetDetail.length;
			encodeBuffer.write(Uint16Array, astBetDetailSize);
			this.astBetDetail.length = astBetDetailSize;
			for (var i = 0; i <  astBetDetailSize; i++) {
				encodeBuffer.skip(this.astBetDetail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			if (10<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwRoundID);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bOneBetBaseTag = decodeBuffer.read(Uint8Array, 1);
			var astBetDetailSize = decodeBuffer.read(Uint16Array, 1);
			this.astBetDetail = new Array<PROPERTY>(astBetDetailSize);
			for (var i = 0; i <  astBetDetailSize; i++) {
				this.astBetDetail[i] = new PROPERTY();
				decodeBuffer.skip(this.astBetDetail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			if (10<csproto.CSProto.Version) {
				this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_BET_ON_SC implements message {
		public dwRoundID: number = 0;  //对应的相关转数序号,目前仅用于调试方便 
		public dwBetTotalGold: number = 0;  //总下注币数 

		public messageName(): string { return "CMD_SHARK_BET_ON";}
		public messageValue(): number { return CMD_SHARK_BET_ON;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwRoundID);
			encodeBuffer.write(Uint32Array, this.dwBetTotalGold);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			this.dwBetTotalGold = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class SharkPoolBetDetail implements message {
		public astPrizeBetList: Array<PROPERTY> = new Array<PROPERTY>();  //当前对应当转的各奖项具体下注列表 

		public messageName(): string { return "SharkPoolBetDetail";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var astPrizeBetListSize = this.astPrizeBetList.length > MAX_SHARK_BETON_LEN ? MAX_SHARK_BETON_LEN : this.astPrizeBetList.length;
			encodeBuffer.write(Uint16Array, astPrizeBetListSize);
			this.astPrizeBetList.length = astPrizeBetListSize;
			for (var i = 0; i <  astPrizeBetListSize; i++) {
				encodeBuffer.skip(this.astPrizeBetList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var astPrizeBetListSize = decodeBuffer.read(Uint16Array, 1);
			this.astPrizeBetList = new Array<PROPERTY>(astPrizeBetListSize);
			for (var i = 0; i <  astPrizeBetListSize; i++) {
				this.astPrizeBetList[i] = new PROPERTY();
				decodeBuffer.skip(this.astPrizeBetList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class SharkBanker implements message {
		public dwObjectID: number = 0;  //实体handle 
		public wLevel: number = 0;  //等级 
		public wVipLevel: number = 0;  //VIP等级 
		public szName: string = "";  //字符串类型的名字 
		public bSex: number = 0;  //性别,目前不会用到 
		public bHeadPhoto: number = 0;  //系统头像,目前不会用到 
		public bBankerLeftRound: number = 0;  //当前庄家剩余局数 
		public llOwnGold: number = 0;  //拥有的金币 
		public szSelfDefPhoto: string = "";  //玩家自定义头像,长度不为0时以此为准 

		public messageName(): string { return "SharkBanker";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwObjectID);
			encodeBuffer.write(Uint16Array, this.wLevel);
			encodeBuffer.write(Uint16Array, this.wVipLevel);
			encodeBuffer.writeString(this.szName, MAX_ROLE_NAME_LEN);
			encodeBuffer.write(Uint8Array, this.bSex);
			encodeBuffer.write(Uint8Array, this.bHeadPhoto);
			encodeBuffer.write(Uint8Array, this.bBankerLeftRound);
			encodeBuffer.write(Float64Array, this.llOwnGold);
			encodeBuffer.writeString(this.szSelfDefPhoto, MAX_ROLE_SELFDEF_PHOTO_LEN);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwObjectID = decodeBuffer.read(Uint32Array, 1);
			this.wLevel = decodeBuffer.read(Uint16Array, 1);
			this.wVipLevel = decodeBuffer.read(Uint16Array, 1);
			this.szName = decodeBuffer.readString(MAX_ROLE_NAME_LEN);
			this.bSex = decodeBuffer.read(Uint8Array, 1);
			this.bHeadPhoto = decodeBuffer.read(Uint8Array, 1);
			this.bBankerLeftRound = decodeBuffer.read(Uint8Array, 1);
			this.llOwnGold = decodeBuffer.read(Float64Array, 1);
			this.szSelfDefPhoto = decodeBuffer.readString(MAX_ROLE_SELFDEF_PHOTO_LEN);
			return decodeBuffer.length();
		}
	}

	export class SharkRoundBankerSwitch implements message {
		public bSwitchType: number = 0;  //庄家变更状态,参见CLASSFRUIT_BANKER_SWITCHTYPE_NONE等系列枚举 
		public llBankerRoundWinGold: number = 0;  //本局存在庄家时的本局获得钱数,可正可负 
		public llBankerTotalWinGold: number = 0;  //庄家最终结算获得钱数,可正可负 
		public llBankerTotalSysCostGold: number = 0;  //庄家最终结算获得钱数为正时被系统所扣钱数 
		public bIsBankerRupt: number = 0;  //庄家下庄时是否爆庄 
		public bIsOffBankerSelf: number = 0;  //该协议收到者是否是下庄庄家自己 

		public messageName(): string { return "SharkRoundBankerSwitch";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bSwitchType);
			if (CLASSFRUIT_BANKER_SWITCHTYPE_NONE!=this.bSwitchType) {
				encodeBuffer.write(Float64Array, this.llBankerRoundWinGold);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				encodeBuffer.write(Float64Array, this.llBankerTotalWinGold);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				encodeBuffer.write(Float64Array, this.llBankerTotalSysCostGold);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				encodeBuffer.write(Uint8Array, this.bIsBankerRupt);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				encodeBuffer.write(Uint8Array, this.bIsOffBankerSelf);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bSwitchType = decodeBuffer.read(Uint8Array, 1);
			if (CLASSFRUIT_BANKER_SWITCHTYPE_NONE!=this.bSwitchType) {
				this.llBankerRoundWinGold = decodeBuffer.read(Float64Array, 1);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				this.llBankerTotalWinGold = decodeBuffer.read(Float64Array, 1);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				this.llBankerTotalSysCostGold = decodeBuffer.read(Float64Array, 1);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				this.bIsBankerRupt = decodeBuffer.read(Uint8Array, 1);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				this.bIsOffBankerSelf = decodeBuffer.read(Uint8Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class SharkAllData implements message {
		public dwRoundID: number = 0;  //对应的相关转数序号,目前仅用于调试方便 
		public bTabStatus: number = 0;  //当前状态,参见LOTTERY_CURSTATUS_CANBET等系列枚举 
		public wLeftBetTime: number = 0;  //当前对应剩余可下注秒数 
		public abHisPrize: Array<number> = new Array<number>();  //历史开出结果以实际长度为准靠左边的为最新 
		public stPoolBetDetail: SharkPoolBetDetail = new SharkPoolBetDetail();  //当前对应当转的各奖项具体下注列表 
		public bIsHasBanker: number = 0;  //为0无庄家,其他则有庄家 
		public stBankerInfo: SharkBanker = new SharkBanker();  //桌台当前的庄家信息 
		public bLeftPrizeSetTime: number = 0;  //当前庄家设置下次开奖时间对应剩余可下注秒数 
		public llCaiJinPool: number = 0;  //彩金池金币数 
		public dwCaiJinLuckyIndex: number = 0;  //彩金池指数是万分比的分子 
		public dwCaiJinLastHitTime: number = 0;  //彩金池多少少前开出了彩金奖 

		public messageName(): string { return "SharkAllData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwRoundID);
			encodeBuffer.write(Uint8Array, this.bTabStatus);
			if (this.bTabStatus==LOTTERY_CURSTATUS_CANBET) {
				encodeBuffer.write(Uint8Array, this.wLeftBetTime);
			}
			var abHisPrizeSize = this.abHisPrize.length > MAX_SHARK_SCENE_HISPRIZE_LEN ? MAX_SHARK_SCENE_HISPRIZE_LEN : this.abHisPrize.length;
			encodeBuffer.write(Uint16Array, abHisPrizeSize);
			this.abHisPrize.length = abHisPrizeSize;
			encodeBuffer.write(Uint8Array, this.abHisPrize);
			encodeBuffer.skip(this.stPoolBetDetail.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.write(Uint8Array, this.bIsHasBanker);
			if (0!=this.bIsHasBanker) {
				encodeBuffer.skip(this.stBankerInfo.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			if (this.bTabStatus==LOTTERY_CURSTATUS_CANBET) {
				encodeBuffer.write(Uint8Array, this.bLeftPrizeSetTime);
			}
			if (32<csproto.CSProto.Version) {
				encodeBuffer.write(Float64Array, this.llCaiJinPool);
			}
			if (32<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwCaiJinLuckyIndex);
			}
			if (32<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwCaiJinLastHitTime);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			this.bTabStatus = decodeBuffer.read(Uint8Array, 1);
			if (this.bTabStatus==LOTTERY_CURSTATUS_CANBET) {
				this.wLeftBetTime = decodeBuffer.read(Uint8Array, 1);
			}
			var abHisPrizeSize = decodeBuffer.read(Uint16Array, 1);
			this.abHisPrize = new Array<number>(abHisPrizeSize);
			this.abHisPrize = decodeBuffer.read(Uint8Array, abHisPrizeSize);
			decodeBuffer.skip(this.stPoolBetDetail.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			this.bIsHasBanker = decodeBuffer.read(Uint8Array, 1);
			if (0!=this.bIsHasBanker) {
				decodeBuffer.skip(this.stBankerInfo.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			if (this.bTabStatus==LOTTERY_CURSTATUS_CANBET) {
				this.bLeftPrizeSetTime = decodeBuffer.read(Uint8Array, 1);
			}
			if (32<csproto.CSProto.Version) {
				this.llCaiJinPool = decodeBuffer.read(Float64Array, 1);
			}
			if (32<csproto.CSProto.Version) {
				this.dwCaiJinLuckyIndex = decodeBuffer.read(Uint32Array, 1);
			}
			if (32<csproto.CSProto.Version) {
				this.dwCaiJinLastHitTime = decodeBuffer.read(Uint32Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class SharkTimerData implements message {
		public bTabStatus: number = 0;  //当前状态,参见LOTTERY_CURSTATUS_CANBET等系列枚举 
		public stPoolBetDetail: SharkPoolBetDetail = new SharkPoolBetDetail();  //当前对应当转的各奖项具体下注列表 
		public dwCurOnlineAcc: number = 0;  //当前对应在线人数 
		public dwRoundID: number = 0;  //对应的相关转数序号 
		public llCaiJinPool: number = 0;  //彩金池金币数 
		public dwCaiJinLuckyIndex: number = 0;  //彩金池指数 
		public dwCaiJinLastHitTime: number = 0;  //彩金池多少少前开出了彩金奖 

		public messageName(): string { return "SharkTimerData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bTabStatus);
			encodeBuffer.skip(this.stPoolBetDetail.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.write(Uint32Array, this.dwCurOnlineAcc);
			if (10<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwRoundID);
			}
			if (32<csproto.CSProto.Version) {
				encodeBuffer.write(Float64Array, this.llCaiJinPool);
			}
			if (32<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwCaiJinLuckyIndex);
			}
			if (32<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwCaiJinLastHitTime);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bTabStatus = decodeBuffer.read(Uint8Array, 1);
			decodeBuffer.skip(this.stPoolBetDetail.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			this.dwCurOnlineAcc = decodeBuffer.read(Uint32Array, 1);
			if (10<csproto.CSProto.Version) {
				this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			}
			if (32<csproto.CSProto.Version) {
				this.llCaiJinPool = decodeBuffer.read(Float64Array, 1);
			}
			if (32<csproto.CSProto.Version) {
				this.dwCaiJinLuckyIndex = decodeBuffer.read(Uint32Array, 1);
			}
			if (32<csproto.CSProto.Version) {
				this.dwCaiJinLastHitTime = decodeBuffer.read(Uint32Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_ENTERDATA_SC implements message {
		public wMapID: number = 0;  //对应地图模板ID参见MAP_TEMPLATE_ID_CLASSIC_FRUIT等枚举 
		public dwSceneID: number = 0;  //对应的场景ID游戏内唯一是游戏内所有桌台统一编号的索引 
		public dwTableID: number = 0;  //对应的桌台ID,目前无用 
		public stAllData: SharkAllData = new SharkAllData();  //对应当前数据 
		public dwBetTotalGold: number = 0;  //总下注币数 
		public astBetDetail: Array<PROPERTY> = new Array<PROPERTY>();  //当前对应当转的玩家己下注列表,若已经下注则有数据 
		public bPlayerBankerStat: number = 0;  //玩家自己的庄家相关状态参见CLASSFRUIT_BANKER_STAT_NONE等枚举 
		public dwCurOnlineAcc: number = 0;  //当前对应在线人数 
		public bOneBetBaseTag: number = 0;  //玩家自己下注的单注数量序号,参见LOTTERY_ONEBET_BASE_TAG_1等系列枚举 
		public bIfCanJoinPlay: number = 0;  //是否可参与该玩法:0不行 1可以 
		public dwBankerQueuePos: number = 0;  //当在排庄队列中时代表当前位置 

		public messageName(): string { return "CMD_SHARK_ENTERDATA";}
		public messageValue(): number { return CMD_SHARK_ENTERDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wMapID);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			encodeBuffer.write(Uint32Array, this.dwTableID);
			encodeBuffer.skip(this.stAllData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.write(Uint32Array, this.dwBetTotalGold);
			var astBetDetailSize = this.astBetDetail.length > MAX_SHARK_BETON_LEN ? MAX_SHARK_BETON_LEN : this.astBetDetail.length;
			encodeBuffer.write(Uint16Array, astBetDetailSize);
			this.astBetDetail.length = astBetDetailSize;
			for (var i = 0; i <  astBetDetailSize; i++) {
				encodeBuffer.skip(this.astBetDetail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			encodeBuffer.write(Uint8Array, this.bPlayerBankerStat);
			encodeBuffer.write(Uint32Array, this.dwCurOnlineAcc);
			encodeBuffer.write(Uint8Array, this.bOneBetBaseTag);
			if (14<csproto.CSProto.Version) {
				encodeBuffer.write(Uint8Array, this.bIfCanJoinPlay);
			}
			if (14<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwBankerQueuePos);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wMapID = decodeBuffer.read(Uint16Array, 1);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			this.dwTableID = decodeBuffer.read(Uint32Array, 1);
			decodeBuffer.skip(this.stAllData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			this.dwBetTotalGold = decodeBuffer.read(Uint32Array, 1);
			var astBetDetailSize = decodeBuffer.read(Uint16Array, 1);
			this.astBetDetail = new Array<PROPERTY>(astBetDetailSize);
			for (var i = 0; i <  astBetDetailSize; i++) {
				this.astBetDetail[i] = new PROPERTY();
				decodeBuffer.skip(this.astBetDetail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			this.bPlayerBankerStat = decodeBuffer.read(Uint8Array, 1);
			this.dwCurOnlineAcc = decodeBuffer.read(Uint32Array, 1);
			this.bOneBetBaseTag = decodeBuffer.read(Uint8Array, 1);
			if (14<csproto.CSProto.Version) {
				this.bIfCanJoinPlay = decodeBuffer.read(Uint8Array, 1);
			}
			if (14<csproto.CSProto.Version) {
				this.dwBankerQueuePos = decodeBuffer.read(Uint32Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_REFRESHDATA_SC implements message {
		public stTimerData: SharkTimerData = new SharkTimerData();  //对应当前数据 

		public messageName(): string { return "CMD_SHARK_REFRESHDATA";}
		public messageValue(): number { return CMD_SHARK_REFRESHDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.skip(this.stTimerData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			decodeBuffer.skip(this.stTimerData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_ROUND_END_SC implements message {
		public stNewstData: SharkAllData = new SharkAllData();  //对应开奖后的转轮数据,序号及奖池数据等所有数据己刷新为发奖后的最新数据 
		public bPrizeRet: number = 0;  //当前对应的开奖结果 
		public bExtraPrizeRet: number = 0;  //当前对应的额外送灯 
		public llGotBaseGold: number = 0;  //本局自己获得基本金币数 
		public llGotExtraGold: number = 0;  //本局自己获得额外金币数 
		public stBankerSwitchInfo: SharkRoundBankerSwitch = new SharkRoundBankerSwitch();  //庄家变更相关描述数据 
		public dwBankerQueuePos: number = 0;  //当在排庄队列中时代表当前位置 
		public llCaiJinAwardGold: number = 0;  // 若不为0则代表本局开出了彩金池对应了开出的总额 

		public messageName(): string { return "CMD_SHARK_ROUND_END";}
		public messageValue(): number { return CMD_SHARK_ROUND_END;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.skip(this.stNewstData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.write(Uint8Array, this.bPrizeRet);
			encodeBuffer.write(Uint8Array, this.bExtraPrizeRet);
			encodeBuffer.write(Float64Array, this.llGotBaseGold);
			encodeBuffer.write(Float64Array, this.llGotExtraGold);
			encodeBuffer.skip(this.stBankerSwitchInfo.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			if (14<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwBankerQueuePos);
			}
			if (32<csproto.CSProto.Version) {
				encodeBuffer.write(Float64Array, this.llCaiJinAwardGold);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			decodeBuffer.skip(this.stNewstData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			this.bPrizeRet = decodeBuffer.read(Uint8Array, 1);
			this.bExtraPrizeRet = decodeBuffer.read(Uint8Array, 1);
			this.llGotBaseGold = decodeBuffer.read(Float64Array, 1);
			this.llGotExtraGold = decodeBuffer.read(Float64Array, 1);
			decodeBuffer.skip(this.stBankerSwitchInfo.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			if (14<csproto.CSProto.Version) {
				this.dwBankerQueuePos = decodeBuffer.read(Uint32Array, 1);
			}
			if (32<csproto.CSProto.Version) {
				this.llCaiJinAwardGold = decodeBuffer.read(Float64Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_REFRESH_SELF_BET_SC implements message {
		public dwAccCurOwnGold: number = 0;  //玩家当前实际拥有的币数,若有预扣这里需要回滚 
		public dwBetTotalGold: number = 0;  //总下注币数 
		public astBetDetail: Array<PROPERTY> = new Array<PROPERTY>();  //当前对应当转的己下注列表,若已经下注则有数据 
		public dwRoundID: number = 0;  //对应的相关转数序号 

		public messageName(): string { return "CMD_SHARK_REFRESH_SELF_BET";}
		public messageValue(): number { return CMD_SHARK_REFRESH_SELF_BET;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwAccCurOwnGold);
			encodeBuffer.write(Uint32Array, this.dwBetTotalGold);
			var astBetDetailSize = this.astBetDetail.length > MAX_SHARK_BETON_LEN ? MAX_SHARK_BETON_LEN : this.astBetDetail.length;
			encodeBuffer.write(Uint16Array, astBetDetailSize);
			this.astBetDetail.length = astBetDetailSize;
			for (var i = 0; i <  astBetDetailSize; i++) {
				encodeBuffer.skip(this.astBetDetail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			if (10<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwRoundID);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwAccCurOwnGold = decodeBuffer.read(Uint32Array, 1);
			this.dwBetTotalGold = decodeBuffer.read(Uint32Array, 1);
			var astBetDetailSize = decodeBuffer.read(Uint16Array, 1);
			this.astBetDetail = new Array<PROPERTY>(astBetDetailSize);
			for (var i = 0; i <  astBetDetailSize; i++) {
				this.astBetDetail[i] = new PROPERTY();
				decodeBuffer.skip(this.astBetDetail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			if (10<csproto.CSProto.Version) {
				this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_SIGNUP_BANKER_SC implements message {
		public wQueuePos: number = 0;  //在队列中的位置 
		public bPlayerBankerStat: number = 0;  //玩家的庄家状态 
		public szSuccTips: string = "";  //上庄成功相关的提示 

		public messageName(): string { return "CMD_SHARK_SIGNUP_BANKER";}
		public messageValue(): number { return CMD_SHARK_SIGNUP_BANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wQueuePos);
			encodeBuffer.write(Uint8Array, this.bPlayerBankerStat);
			encodeBuffer.writeString(this.szSuccTips, 256);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wQueuePos = decodeBuffer.read(Uint16Array, 1);
			this.bPlayerBankerStat = decodeBuffer.read(Uint8Array, 1);
			this.szSuccTips = decodeBuffer.readString(256);
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_QUIT_BANKER_SC implements message {
		public bPlayerBankerStat: number = 0;  //玩家的庄家状态 

		public messageName(): string { return "CMD_SHARK_QUIT_BANKER";}
		public messageValue(): number { return CMD_SHARK_QUIT_BANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bPlayerBankerStat);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bPlayerBankerStat = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_UPDATE_BANKER_STAT_SC implements message {
		public bPlayerBankerStat: number = 0;  //玩家的庄家状态 
		public wQueuePos: number = 0;  //在队列中的位置 

		public messageName(): string { return "CMD_SHARK_UPDATE_BANKER_STAT";}
		public messageValue(): number { return CMD_SHARK_UPDATE_BANKER_STAT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bPlayerBankerStat);
			encodeBuffer.write(Uint16Array, this.wQueuePos);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bPlayerBankerStat = decodeBuffer.read(Uint8Array, 1);
			this.wQueuePos = decodeBuffer.read(Uint16Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_CURBANKERLIST_SC implements message {
		public astBankerList: Array<SharkBanker> = new Array<SharkBanker>();  //当前排队中的庄家列表 

		public messageName(): string { return "CMD_SHARK_CURBANKERLIST";}
		public messageValue(): number { return CMD_SHARK_CURBANKERLIST;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var astBankerListSize = this.astBankerList.length > 3 ? 3 : this.astBankerList.length;
			encodeBuffer.write(Uint16Array, astBankerListSize);
			this.astBankerList.length = astBankerListSize;
			for (var i = 0; i <  astBankerListSize; i++) {
				encodeBuffer.skip(this.astBankerList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var astBankerListSize = decodeBuffer.read(Uint16Array, 1);
			this.astBankerList = new Array<SharkBanker>(astBankerListSize);
			for (var i = 0; i <  astBankerListSize; i++) {
				this.astBankerList[i] = new SharkBanker();
				decodeBuffer.skip(this.astBankerList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_UPDATE_CURBANKER_SC implements message {
		public bIsHasBanker: number = 0;  //为0无庄家,其他则有庄家 
		public stBankerInfo: SharkBanker = new SharkBanker();  //桌台当前的庄家信息 

		public messageName(): string { return "CMD_SHARK_UPDATE_CURBANKER";}
		public messageValue(): number { return CMD_SHARK_UPDATE_CURBANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bIsHasBanker);
			if (0!=this.bIsHasBanker) {
				encodeBuffer.skip(this.stBankerInfo.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bIsHasBanker = decodeBuffer.read(Uint8Array, 1);
			if (0!=this.bIsHasBanker) {
				decodeBuffer.skip(this.stBankerInfo.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_BANKER_SETPRIZE_CS implements message {
		public bPrizeRet: number = 0;  //设置对应的开奖结果 

		public messageName(): string { return "CMD_SHARK_BANKER_SETPRIZE";}
		public messageValue(): number { return CMD_SHARK_BANKER_SETPRIZE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bPrizeRet);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bPrizeRet = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_BANKER_SETPRIZE_SC implements message {
		public bPrizeRet: number = 0;  //设置对应的开奖结果 

		public messageName(): string { return "CMD_SHARK_BANKER_SETPRIZE";}
		public messageValue(): number { return CMD_SHARK_BANKER_SETPRIZE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bPrizeRet);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bPrizeRet = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_BET_ON_CS implements message {
		public bOneBetBaseTag: number = 0;  //单注数量序号,参见LOTTERY_ONEBET_BASE_TAG_1等系列枚举 
		public astBetDetail: Array<PROPERTY> = new Array<PROPERTY>();  //下注列表 
		public dwRoundID: number = 0;  //对应的相关转数序号 

		public messageName(): string { return "CMD_CAR_BET_ON";}
		public messageValue(): number { return CMD_CAR_BET_ON;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bOneBetBaseTag);
			var astBetDetailSize = this.astBetDetail.length > MAX_CAR_BETON_LEN ? MAX_CAR_BETON_LEN : this.astBetDetail.length;
			encodeBuffer.write(Uint16Array, astBetDetailSize);
			this.astBetDetail.length = astBetDetailSize;
			for (var i = 0; i <  astBetDetailSize; i++) {
				encodeBuffer.skip(this.astBetDetail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			if (10<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwRoundID);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bOneBetBaseTag = decodeBuffer.read(Uint8Array, 1);
			var astBetDetailSize = decodeBuffer.read(Uint16Array, 1);
			this.astBetDetail = new Array<PROPERTY>(astBetDetailSize);
			for (var i = 0; i <  astBetDetailSize; i++) {
				this.astBetDetail[i] = new PROPERTY();
				decodeBuffer.skip(this.astBetDetail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			if (10<csproto.CSProto.Version) {
				this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_BET_ON_SC implements message {
		public dwRoundID: number = 0;  //对应的相关转数序号,目前仅用于调试方便 
		public dwBetTotalGold: number = 0;  //总下注币数 

		public messageName(): string { return "CMD_CAR_BET_ON";}
		public messageValue(): number { return CMD_CAR_BET_ON;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwRoundID);
			encodeBuffer.write(Uint32Array, this.dwBetTotalGold);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			this.dwBetTotalGold = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CarPoolBetDetail implements message {
		public astPrizeBetList: Array<PROPERTY> = new Array<PROPERTY>();  //当前对应当转的各奖项具体下注列表 

		public messageName(): string { return "CarPoolBetDetail";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var astPrizeBetListSize = this.astPrizeBetList.length > MAX_CAR_BETON_LEN ? MAX_CAR_BETON_LEN : this.astPrizeBetList.length;
			encodeBuffer.write(Uint16Array, astPrizeBetListSize);
			this.astPrizeBetList.length = astPrizeBetListSize;
			for (var i = 0; i <  astPrizeBetListSize; i++) {
				encodeBuffer.skip(this.astPrizeBetList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var astPrizeBetListSize = decodeBuffer.read(Uint16Array, 1);
			this.astPrizeBetList = new Array<PROPERTY>(astPrizeBetListSize);
			for (var i = 0; i <  astPrizeBetListSize; i++) {
				this.astPrizeBetList[i] = new PROPERTY();
				decodeBuffer.skip(this.astPrizeBetList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CarBanker implements message {
		public dwObjectID: number = 0;  //实体handle 
		public wLevel: number = 0;  //等级 
		public wVipLevel: number = 0;  //VIP等级 
		public szName: string = "";  //字符串类型的名字 
		public bSex: number = 0;  //性别,目前不会用到 
		public bHeadPhoto: number = 0;  //系统头像,目前不会用到 
		public bBankerLeftRound: number = 0;  //当前庄家剩余局数 
		public llOwnGold: number = 0;  //拥有的金币 
		public szSelfDefPhoto: string = "";  //玩家自定义头像,长度不为0时以此为准 

		public messageName(): string { return "CarBanker";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwObjectID);
			encodeBuffer.write(Uint16Array, this.wLevel);
			encodeBuffer.write(Uint16Array, this.wVipLevel);
			encodeBuffer.writeString(this.szName, MAX_ROLE_NAME_LEN);
			encodeBuffer.write(Uint8Array, this.bSex);
			encodeBuffer.write(Uint8Array, this.bHeadPhoto);
			encodeBuffer.write(Uint8Array, this.bBankerLeftRound);
			encodeBuffer.write(Float64Array, this.llOwnGold);
			encodeBuffer.writeString(this.szSelfDefPhoto, MAX_ROLE_SELFDEF_PHOTO_LEN);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwObjectID = decodeBuffer.read(Uint32Array, 1);
			this.wLevel = decodeBuffer.read(Uint16Array, 1);
			this.wVipLevel = decodeBuffer.read(Uint16Array, 1);
			this.szName = decodeBuffer.readString(MAX_ROLE_NAME_LEN);
			this.bSex = decodeBuffer.read(Uint8Array, 1);
			this.bHeadPhoto = decodeBuffer.read(Uint8Array, 1);
			this.bBankerLeftRound = decodeBuffer.read(Uint8Array, 1);
			this.llOwnGold = decodeBuffer.read(Float64Array, 1);
			this.szSelfDefPhoto = decodeBuffer.readString(MAX_ROLE_SELFDEF_PHOTO_LEN);
			return decodeBuffer.length();
		}
	}

	export class CarRoundBankerSwitch implements message {
		public bSwitchType: number = 0;  //庄家变更状态,参见CLASSFRUIT_BANKER_SWITCHTYPE_NONE等系列枚举 
		public llBankerRoundWinGold: number = 0;  //本局存在庄家时的本局获得钱数,可正可负 
		public llBankerTotalWinGold: number = 0;  //庄家最终结算获得钱数,可正可负 
		public llBankerTotalSysCostGold: number = 0;  //庄家最终结算获得钱数为正时被系统所扣钱数 
		public bIsBankerRupt: number = 0;  //庄家下庄时是否爆庄 
		public bIsOffBankerSelf: number = 0;  //该协议收到者是否是下庄庄家自己 

		public messageName(): string { return "CarRoundBankerSwitch";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bSwitchType);
			if (CLASSFRUIT_BANKER_SWITCHTYPE_NONE!=this.bSwitchType) {
				encodeBuffer.write(Float64Array, this.llBankerRoundWinGold);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				encodeBuffer.write(Float64Array, this.llBankerTotalWinGold);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				encodeBuffer.write(Float64Array, this.llBankerTotalSysCostGold);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				encodeBuffer.write(Uint8Array, this.bIsBankerRupt);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				encodeBuffer.write(Uint8Array, this.bIsOffBankerSelf);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bSwitchType = decodeBuffer.read(Uint8Array, 1);
			if (CLASSFRUIT_BANKER_SWITCHTYPE_NONE!=this.bSwitchType) {
				this.llBankerRoundWinGold = decodeBuffer.read(Float64Array, 1);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				this.llBankerTotalWinGold = decodeBuffer.read(Float64Array, 1);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				this.llBankerTotalSysCostGold = decodeBuffer.read(Float64Array, 1);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				this.bIsBankerRupt = decodeBuffer.read(Uint8Array, 1);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				this.bIsOffBankerSelf = decodeBuffer.read(Uint8Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CarAllData implements message {
		public dwRoundID: number = 0;  //对应的相关转数序号,目前仅用于调试方便 
		public bTabStatus: number = 0;  //当前状态,参见LOTTERY_CURSTATUS_CANBET等系列枚举 
		public wLeftBetTime: number = 0;  //当前对应剩余可下注秒数 
		public abHisPrize: Array<number> = new Array<number>();  //历史开出结果以实际长度为准靠左边的为最新 
		public stPoolBetDetail: CarPoolBetDetail = new CarPoolBetDetail();  //当前对应当转的各奖项具体下注列表 
		public bIsHasBanker: number = 0;  //为0无庄家,其他则有庄家 
		public stBankerInfo: CarBanker = new CarBanker();  //桌台当前的庄家信息 
		public bLeftPrizeSetTime: number = 0;  //当前庄家设置下次开奖时间对应剩余可下注秒数 
		public llPrizePool: number = 0;  //当前奖池总额 
		public dwHisFLLTime: number = 0;  //上一次开出法拉利距今的秒数 
		public dwHisLBJNTime: number = 0;  //上一次开出兰博基尼距今的秒数 

		public messageName(): string { return "CarAllData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwRoundID);
			encodeBuffer.write(Uint8Array, this.bTabStatus);
			if (this.bTabStatus==LOTTERY_CURSTATUS_CANBET) {
				encodeBuffer.write(Uint8Array, this.wLeftBetTime);
			}
			var abHisPrizeSize = this.abHisPrize.length > MAX_CAR_SCENE_HISPRIZE_LEN ? MAX_CAR_SCENE_HISPRIZE_LEN : this.abHisPrize.length;
			encodeBuffer.write(Uint16Array, abHisPrizeSize);
			this.abHisPrize.length = abHisPrizeSize;
			encodeBuffer.write(Uint8Array, this.abHisPrize);
			encodeBuffer.skip(this.stPoolBetDetail.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.write(Uint8Array, this.bIsHasBanker);
			if (0!=this.bIsHasBanker) {
				encodeBuffer.skip(this.stBankerInfo.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			if (this.bTabStatus==LOTTERY_CURSTATUS_CANBET) {
				encodeBuffer.write(Uint8Array, this.bLeftPrizeSetTime);
			}
			encodeBuffer.write(Float64Array, this.llPrizePool);
			encodeBuffer.write(Uint32Array, this.dwHisFLLTime);
			encodeBuffer.write(Uint32Array, this.dwHisLBJNTime);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			this.bTabStatus = decodeBuffer.read(Uint8Array, 1);
			if (this.bTabStatus==LOTTERY_CURSTATUS_CANBET) {
				this.wLeftBetTime = decodeBuffer.read(Uint8Array, 1);
			}
			var abHisPrizeSize = decodeBuffer.read(Uint16Array, 1);
			this.abHisPrize = new Array<number>(abHisPrizeSize);
			this.abHisPrize = decodeBuffer.read(Uint8Array, abHisPrizeSize);
			decodeBuffer.skip(this.stPoolBetDetail.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			this.bIsHasBanker = decodeBuffer.read(Uint8Array, 1);
			if (0!=this.bIsHasBanker) {
				decodeBuffer.skip(this.stBankerInfo.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			if (this.bTabStatus==LOTTERY_CURSTATUS_CANBET) {
				this.bLeftPrizeSetTime = decodeBuffer.read(Uint8Array, 1);
			}
			this.llPrizePool = decodeBuffer.read(Float64Array, 1);
			this.dwHisFLLTime = decodeBuffer.read(Uint32Array, 1);
			this.dwHisLBJNTime = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CarTimerData implements message {
		public bTabStatus: number = 0;  //当前状态,参见LOTTERY_CURSTATUS_CANBET等系列枚举 
		public stPoolBetDetail: CarPoolBetDetail = new CarPoolBetDetail();  //当前对应当转的各奖项具体下注列表 
		public dwCurOnlineAcc: number = 0;  //当前对应在线人数 
		public dwRoundID: number = 0;  //对应的相关转数序号 
		public llPrizePool: number = 0;  //当前奖池总额 

		public messageName(): string { return "CarTimerData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bTabStatus);
			encodeBuffer.skip(this.stPoolBetDetail.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.write(Uint32Array, this.dwCurOnlineAcc);
			if (10<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwRoundID);
			}
			encodeBuffer.write(Float64Array, this.llPrizePool);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bTabStatus = decodeBuffer.read(Uint8Array, 1);
			decodeBuffer.skip(this.stPoolBetDetail.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			this.dwCurOnlineAcc = decodeBuffer.read(Uint32Array, 1);
			if (10<csproto.CSProto.Version) {
				this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			}
			this.llPrizePool = decodeBuffer.read(Float64Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_ENTERDATA_SC implements message {
		public wMapID: number = 0;  //对应地图ID,目前无用 
		public dwSceneID: number = 0;  //对应的场景ID 
		public dwTableID: number = 0;  //对应的桌台ID,目前无用 
		public stAllData: CarAllData = new CarAllData();  //对应当前数据 
		public dwBetTotalGold: number = 0;  //总下注币数 
		public astBetDetail: Array<PROPERTY> = new Array<PROPERTY>();  //当前对应当转的玩家己下注列表,若已经下注则有数据 
		public bPlayerBankerStat: number = 0;  //玩家自己的庄家相关状态参见CLASSFRUIT_BANKER_STAT_NONE等枚举 
		public dwCurOnlineAcc: number = 0;  //当前对应在线人数 
		public bOneBetBaseTag: number = 0;  //玩家自己下注的单注数量序号,参见LOTTERY_ONEBET_BASE_TAG_1等系列枚举 
		public bIfCanJoinPlay: number = 0;  //是否可参与该玩法:0不行 1可以 

		public messageName(): string { return "CMD_CAR_ENTERDATA";}
		public messageValue(): number { return CMD_CAR_ENTERDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wMapID);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			encodeBuffer.write(Uint32Array, this.dwTableID);
			encodeBuffer.skip(this.stAllData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.write(Uint32Array, this.dwBetTotalGold);
			var astBetDetailSize = this.astBetDetail.length > MAX_CAR_BETON_LEN ? MAX_CAR_BETON_LEN : this.astBetDetail.length;
			encodeBuffer.write(Uint16Array, astBetDetailSize);
			this.astBetDetail.length = astBetDetailSize;
			for (var i = 0; i <  astBetDetailSize; i++) {
				encodeBuffer.skip(this.astBetDetail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			encodeBuffer.write(Uint8Array, this.bPlayerBankerStat);
			encodeBuffer.write(Uint32Array, this.dwCurOnlineAcc);
			encodeBuffer.write(Uint8Array, this.bOneBetBaseTag);
			if (14<csproto.CSProto.Version) {
				encodeBuffer.write(Uint8Array, this.bIfCanJoinPlay);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wMapID = decodeBuffer.read(Uint16Array, 1);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			this.dwTableID = decodeBuffer.read(Uint32Array, 1);
			decodeBuffer.skip(this.stAllData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			this.dwBetTotalGold = decodeBuffer.read(Uint32Array, 1);
			var astBetDetailSize = decodeBuffer.read(Uint16Array, 1);
			this.astBetDetail = new Array<PROPERTY>(astBetDetailSize);
			for (var i = 0; i <  astBetDetailSize; i++) {
				this.astBetDetail[i] = new PROPERTY();
				decodeBuffer.skip(this.astBetDetail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			this.bPlayerBankerStat = decodeBuffer.read(Uint8Array, 1);
			this.dwCurOnlineAcc = decodeBuffer.read(Uint32Array, 1);
			this.bOneBetBaseTag = decodeBuffer.read(Uint8Array, 1);
			if (14<csproto.CSProto.Version) {
				this.bIfCanJoinPlay = decodeBuffer.read(Uint8Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_REFRESHDATA_SC implements message {
		public stTimerData: CarTimerData = new CarTimerData();  //对应当前数据 

		public messageName(): string { return "CMD_CAR_REFRESHDATA";}
		public messageValue(): number { return CMD_CAR_REFRESHDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.skip(this.stTimerData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			decodeBuffer.skip(this.stTimerData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_ROUND_END_SC implements message {
		public stNewstData: CarAllData = new CarAllData();  //对应开奖后的转轮数据,序号及奖池数据等所有数据己刷新为发奖后的最新数据 
		public bPrizeRet: number = 0;  //当前对应的开奖结果 
		public bExtraPrizeRet: number = 0;  //当前对应的额外送灯 
		public llGotBaseGold: number = 0;  //本局自己获得基本金币数 
		public llGotExtraGold: number = 0;  //本局自己获得额外金币数 
		public stBankerSwitchInfo: CarRoundBankerSwitch = new CarRoundBankerSwitch();  //庄家变更相关描述数据 

		public messageName(): string { return "CMD_CAR_ROUND_END";}
		public messageValue(): number { return CMD_CAR_ROUND_END;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.skip(this.stNewstData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.write(Uint8Array, this.bPrizeRet);
			encodeBuffer.write(Uint8Array, this.bExtraPrizeRet);
			encodeBuffer.write(Float64Array, this.llGotBaseGold);
			encodeBuffer.write(Float64Array, this.llGotExtraGold);
			encodeBuffer.skip(this.stBankerSwitchInfo.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			decodeBuffer.skip(this.stNewstData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			this.bPrizeRet = decodeBuffer.read(Uint8Array, 1);
			this.bExtraPrizeRet = decodeBuffer.read(Uint8Array, 1);
			this.llGotBaseGold = decodeBuffer.read(Float64Array, 1);
			this.llGotExtraGold = decodeBuffer.read(Float64Array, 1);
			decodeBuffer.skip(this.stBankerSwitchInfo.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_REFRESH_SELF_BET_SC implements message {
		public dwAccCurOwnGold: number = 0;  //玩家当前实际拥有的币数,若有预扣这里需要回滚 
		public dwBetTotalGold: number = 0;  //总下注币数 
		public astBetDetail: Array<PROPERTY> = new Array<PROPERTY>();  //当前对应当转的己下注列表,若已经下注则有数据 
		public dwRoundID: number = 0;  //对应的相关转数序号 

		public messageName(): string { return "CMD_CAR_REFRESH_SELF_BET";}
		public messageValue(): number { return CMD_CAR_REFRESH_SELF_BET;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwAccCurOwnGold);
			encodeBuffer.write(Uint32Array, this.dwBetTotalGold);
			var astBetDetailSize = this.astBetDetail.length > MAX_CAR_BETON_LEN ? MAX_CAR_BETON_LEN : this.astBetDetail.length;
			encodeBuffer.write(Uint16Array, astBetDetailSize);
			this.astBetDetail.length = astBetDetailSize;
			for (var i = 0; i <  astBetDetailSize; i++) {
				encodeBuffer.skip(this.astBetDetail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			if (10<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwRoundID);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwAccCurOwnGold = decodeBuffer.read(Uint32Array, 1);
			this.dwBetTotalGold = decodeBuffer.read(Uint32Array, 1);
			var astBetDetailSize = decodeBuffer.read(Uint16Array, 1);
			this.astBetDetail = new Array<PROPERTY>(astBetDetailSize);
			for (var i = 0; i <  astBetDetailSize; i++) {
				this.astBetDetail[i] = new PROPERTY();
				decodeBuffer.skip(this.astBetDetail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			if (10<csproto.CSProto.Version) {
				this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_SIGNUP_BANKER_SC implements message {
		public wQueuePos: number = 0;  //在队列中的位置 
		public bPlayerBankerStat: number = 0;  //玩家的庄家状态 

		public messageName(): string { return "CMD_CAR_SIGNUP_BANKER";}
		public messageValue(): number { return CMD_CAR_SIGNUP_BANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wQueuePos);
			encodeBuffer.write(Uint8Array, this.bPlayerBankerStat);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wQueuePos = decodeBuffer.read(Uint16Array, 1);
			this.bPlayerBankerStat = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_QUIT_BANKER_SC implements message {
		public bPlayerBankerStat: number = 0;  //玩家的庄家状态 

		public messageName(): string { return "CMD_CAR_QUIT_BANKER";}
		public messageValue(): number { return CMD_CAR_QUIT_BANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bPlayerBankerStat);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bPlayerBankerStat = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_UPDATE_BANKER_STAT_SC implements message {
		public bPlayerBankerStat: number = 0;  //玩家的庄家状态 
		public wQueuePos: number = 0;  //在队列中的位置 

		public messageName(): string { return "CMD_CAR_UPDATE_BANKER_STAT";}
		public messageValue(): number { return CMD_CAR_UPDATE_BANKER_STAT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bPlayerBankerStat);
			encodeBuffer.write(Uint16Array, this.wQueuePos);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bPlayerBankerStat = decodeBuffer.read(Uint8Array, 1);
			this.wQueuePos = decodeBuffer.read(Uint16Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_CURBANKERLIST_SC implements message {
		public astBankerList: Array<CarBanker> = new Array<CarBanker>();  //当前排队中的庄家列表 

		public messageName(): string { return "CMD_CAR_CURBANKERLIST";}
		public messageValue(): number { return CMD_CAR_CURBANKERLIST;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var astBankerListSize = this.astBankerList.length > 3 ? 3 : this.astBankerList.length;
			encodeBuffer.write(Uint16Array, astBankerListSize);
			this.astBankerList.length = astBankerListSize;
			for (var i = 0; i <  astBankerListSize; i++) {
				encodeBuffer.skip(this.astBankerList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var astBankerListSize = decodeBuffer.read(Uint16Array, 1);
			this.astBankerList = new Array<CarBanker>(astBankerListSize);
			for (var i = 0; i <  astBankerListSize; i++) {
				this.astBankerList[i] = new CarBanker();
				decodeBuffer.skip(this.astBankerList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_UPDATE_CURBANKER_SC implements message {
		public bIsHasBanker: number = 0;  //为0无庄家,其他则有庄家 
		public stBankerInfo: CarBanker = new CarBanker();  //桌台当前的庄家信息 

		public messageName(): string { return "CMD_CAR_UPDATE_CURBANKER";}
		public messageValue(): number { return CMD_CAR_UPDATE_CURBANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bIsHasBanker);
			if (0!=this.bIsHasBanker) {
				encodeBuffer.skip(this.stBankerInfo.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bIsHasBanker = decodeBuffer.read(Uint8Array, 1);
			if (0!=this.bIsHasBanker) {
				decodeBuffer.skip(this.stBankerInfo.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_BANKER_SETPRIZE_CS implements message {
		public bPrizeRet: number = 0;  //设置对应的开奖结果 

		public messageName(): string { return "CMD_CAR_BANKER_SETPRIZE";}
		public messageValue(): number { return CMD_CAR_BANKER_SETPRIZE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bPrizeRet);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bPrizeRet = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_BANKER_SETPRIZE_SC implements message {
		public bPrizeRet: number = 0;  //设置对应的开奖结果 

		public messageName(): string { return "CMD_CAR_BANKER_SETPRIZE";}
		public messageValue(): number { return CMD_CAR_BANKER_SETPRIZE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bPrizeRet);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bPrizeRet = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_BIGWINNERRANK_SC implements message {
		public astRankList: Array<OneRankData> = new Array<OneRankData>();  //分页结果列表,仅当前三名变化时会通知刷新 

		public messageName(): string { return "CMD_CAR_BIGWINNERRANK";}
		public messageValue(): number { return CMD_CAR_BIGWINNERRANK;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var astRankListSize = this.astRankList.length > MAX_CAR_BIGWINNERRANK_LIST_SIZE ? MAX_CAR_BIGWINNERRANK_LIST_SIZE : this.astRankList.length;
			encodeBuffer.write(Uint16Array, astRankListSize);
			this.astRankList.length = astRankListSize;
			for (var i = 0; i <  astRankListSize; i++) {
				encodeBuffer.skip(this.astRankList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var astRankListSize = decodeBuffer.read(Uint16Array, 1);
			this.astRankList = new Array<OneRankData>(astRankListSize);
			for (var i = 0; i <  astRankListSize; i++) {
				this.astRankList[i] = new OneRankData();
				decodeBuffer.skip(this.astRankList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_ADV_ALIPAY_GIFTPKG_SC implements message {
		public dwTimes: number = 0;  //这是第几次弹出了 

		public messageName(): string { return "CMD_ADV_ALIPAY_GIFTPKG";}
		public messageValue(): number { return CMD_ADV_ALIPAY_GIFTPKG;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwTimes);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwTimes = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_BEGIN_CHARGE_CS implements message {
		public dwPayViewFrom: number = 0;  //支付场景ID编号 

		public messageName(): string { return "CMD_NOTIFY_BEGIN_CHARGE";}
		public messageValue(): number { return CMD_NOTIFY_BEGIN_CHARGE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwPayViewFrom);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwPayViewFrom = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_UPT_EXTAPP_TIPS_SC implements message {
		public bVipLvl: number = 0;  //VIP等级 
		public dwContLogin: number = 0;  //连续登录领取金币 
		public dwLoginTask: number = 0;  //登录领取金币 
		public dwVipContLogin: number = 0;  //VIP连续登录领取金币额外金币 
		public dwMoneyTree: number = 0;  //摇钱树金币 

		public messageName(): string { return "CMD_NOTIFY_UPT_EXTAPP_TIPS";}
		public messageValue(): number { return CMD_NOTIFY_UPT_EXTAPP_TIPS;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bVipLvl);
			encodeBuffer.write(Uint32Array, this.dwContLogin);
			encodeBuffer.write(Uint32Array, this.dwLoginTask);
			encodeBuffer.write(Uint32Array, this.dwVipContLogin);
			encodeBuffer.write(Uint32Array, this.dwMoneyTree);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bVipLvl = decodeBuffer.read(Uint8Array, 1);
			this.dwContLogin = decodeBuffer.read(Uint32Array, 1);
			this.dwLoginTask = decodeBuffer.read(Uint32Array, 1);
			this.dwVipContLogin = decodeBuffer.read(Uint32Array, 1);
			this.dwMoneyTree = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_REFRESH_CUR_ONLINETIME_GIFT_SC implements message {
		public stNextGift: OnlineGiftPara = new OnlineGiftPara();  //本阶段可领的在线礼包情况 
		public stNextNextGift: OnlineGiftPara = new OnlineGiftPara();  //下一阶段玩家在线礼包相关信息 

		public messageName(): string { return "CMD_REFRESH_CUR_ONLINETIME_GIFT";}
		public messageValue(): number { return CMD_REFRESH_CUR_ONLINETIME_GIFT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.skip(this.stNextGift.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			if (9<csproto.CSProto.Version) {
				encodeBuffer.skip(this.stNextNextGift.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			decodeBuffer.skip(this.stNextGift.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			if (9<csproto.CSProto.Version) {
				decodeBuffer.skip(this.stNextNextGift.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class OneRecommData implements message {
		public szRankName: string = "";  //角色名字 
		public llBornID: number = 0;  //玩家ID 
		public szSelfDefPhoto: string = "";  //玩家自定义头像,长度不为0时以此为准 
		public dwRelateAward: number = 0;  //相关奖励金币数 
		public bIfHasGotPrize: number = 0;  //小于0则是不能领取奖励,为1则是今天己领取,其他未领取 

		public messageName(): string { return "OneRecommData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szRankName, MAX_ROLE_NAME_LEN);
			encodeBuffer.write(Float64Array, this.llBornID);
			encodeBuffer.writeString(this.szSelfDefPhoto, MAX_ROLE_SELFDEF_PHOTO_LEN);
			encodeBuffer.write(Uint32Array, this.dwRelateAward);
			encodeBuffer.write(Int8Array, this.bIfHasGotPrize);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szRankName = decodeBuffer.readString(MAX_ROLE_NAME_LEN);
			this.llBornID = decodeBuffer.read(Float64Array, 1);
			this.szSelfDefPhoto = decodeBuffer.readString(MAX_ROLE_SELFDEF_PHOTO_LEN);
			this.dwRelateAward = decodeBuffer.read(Uint32Array, 1);
			this.bIfHasGotPrize = decodeBuffer.read(Int8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_RECOMMEND_QUERYPAGE_CS implements message {
		public wPageIndex: number = 0;  //注是从1开始,查询的页码 

		public messageName(): string { return "CMD_RECOMMEND_QUERYPAGE";}
		public messageValue(): number { return CMD_RECOMMEND_QUERYPAGE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wPageIndex);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wPageIndex = decodeBuffer.read(Uint16Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_RECOMMEND_QUERYPAGE_SC implements message {
		public stPagePara: PageBreakPara = new PageBreakPara();  //分页相关数据 
		public astList: Array<OneRecommData> = new Array<OneRecommData>();  //查询分页结果列表 
		public llRecommMeBornID: number = 0;  //推荐了我的角色ID 
		public bIfHasGotRecommMePrize: number = 0;  //为1则是己领取推荐了我的奖励,否则未领取 

		public messageName(): string { return "CMD_RECOMMEND_QUERYPAGE";}
		public messageValue(): number { return CMD_RECOMMEND_QUERYPAGE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.skip(this.stPagePara.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			var astListSize = this.astList.length > MAX_RECOMMED_LIST_SIZE ? MAX_RECOMMED_LIST_SIZE : this.astList.length;
			encodeBuffer.write(Uint16Array, astListSize);
			this.astList.length = astListSize;
			for (var i = 0; i <  astListSize; i++) {
				encodeBuffer.skip(this.astList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			encodeBuffer.write(Float64Array, this.llRecommMeBornID);
			encodeBuffer.write(Uint8Array, this.bIfHasGotRecommMePrize);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			decodeBuffer.skip(this.stPagePara.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			var astListSize = decodeBuffer.read(Uint16Array, 1);
			this.astList = new Array<OneRecommData>(astListSize);
			for (var i = 0; i <  astListSize; i++) {
				this.astList[i] = new OneRecommData();
				decodeBuffer.skip(this.astList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			this.llRecommMeBornID = decodeBuffer.read(Float64Array, 1);
			this.bIfHasGotRecommMePrize = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_ME_RECOMM_OTHER_GIFT_CS implements message {
		public llChoseOtherBornID: number = 0;  //推荐列表中某人的角色ID 

		public messageName(): string { return "CMD_GET_ME_RECOMM_OTHER_GIFT";}
		public messageValue(): number { return CMD_GET_ME_RECOMM_OTHER_GIFT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Float64Array, this.llChoseOtherBornID);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.llChoseOtherBornID = decodeBuffer.read(Float64Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_ME_RECOMM_OTHER_GIFT_SC implements message {
		public dwGotGold: number = 0;  //获得了金币,仅用于表示成功领取 

		public messageName(): string { return "CMD_GET_ME_RECOMM_OTHER_GIFT";}
		public messageValue(): number { return CMD_GET_ME_RECOMM_OTHER_GIFT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwGotGold);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwGotGold = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_OTHER_RECOMM_ME_GIFT_CS implements message {
		public llInputOtherRecommID: number = 0;  //输入的别人的推荐码 

		public messageName(): string { return "CMD_GET_OTHER_RECOMM_ME_GIFT";}
		public messageValue(): number { return CMD_GET_OTHER_RECOMM_ME_GIFT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Float64Array, this.llInputOtherRecommID);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.llInputOtherRecommID = decodeBuffer.read(Float64Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_OTHER_RECOMM_ME_GIFT_SC implements message {
		public dwGotGold: number = 0;  //获得了金币,仅用于表示成功领取 

		public messageName(): string { return "CMD_GET_OTHER_RECOMM_ME_GIFT";}
		public messageValue(): number { return CMD_GET_OTHER_RECOMM_ME_GIFT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwGotGold);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwGotGold = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_APPSTORE_REPUTATION_STATE_SC implements message {
		public bState: number = 0;  //当前的状态，参见APPSTORE_REPUTATION_STATE_NONE等枚举 

		public messageName(): string { return "CMD_APPSTORE_REPUTATION_STATE";}
		public messageValue(): number { return CMD_APPSTORE_REPUTATION_STATE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bState);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bState = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_APPSTORE_REPUTATION_GIFT_SC implements message {
		public dwGold: number = 0;  //获得了多少钱 

		public messageName(): string { return "CMD_GET_APPSTORE_REPUTATION_GIFT";}
		public messageValue(): number { return CMD_GET_APPSTORE_REPUTATION_GIFT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwGold);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwGold = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_WRITE_APPSTORE_REPUTATION_CS implements message {
		public bReputationType: number = 0;  //填非0即可 

		public messageName(): string { return "CMD_WRITE_APPSTORE_REPUTATION";}
		public messageValue(): number { return CMD_WRITE_APPSTORE_REPUTATION;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bReputationType);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bReputationType = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class MailBaseInfo implements message {
		public dwMailID: number = 0;  //邮件ID 
		public bMailType: number = 0;  //邮件类型，参见NORMAL_MAIL_TYPE等的定义 
		public bMailStat: number = 0;  //邮件状态标志,按位标记，参见MAIL_STAT_HASREAD等的定义 
		public szRoleName: string = "";  //若在发件箱中，代表收件人姓名，若在收件箱中，代表发件人姓名 
		public dwMailTime: number = 0;  //邮件发送时间 
		public szMailTitle: string = "";  //邮件标题 
		public szMailContent: string = "";  //邮件内容 
		public astAttachList: Array<PackObj> = new Array<PackObj>();  //附件列表 

		public messageName(): string { return "MailBaseInfo";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwMailID);
			encodeBuffer.write(Uint8Array, this.bMailType);
			encodeBuffer.write(Uint8Array, this.bMailStat);
			encodeBuffer.writeString(this.szRoleName, MAX_ROLE_NAME_LEN);
			encodeBuffer.write(Uint32Array, this.dwMailTime);
			encodeBuffer.writeString(this.szMailTitle, MAX_MAIL_TITLE_LEN);
			encodeBuffer.writeString(this.szMailContent, MAX_MAIL_CONTENT_LEN);
			var astAttachListSize = this.astAttachList.length > MAX_MAIL_ATTACH_COUNT ? MAX_MAIL_ATTACH_COUNT : this.astAttachList.length;
			encodeBuffer.write(Uint16Array, astAttachListSize);
			this.astAttachList.length = astAttachListSize;
			for (var i = 0; i <  astAttachListSize; i++) {
				encodeBuffer.skip(this.astAttachList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwMailID = decodeBuffer.read(Uint32Array, 1);
			this.bMailType = decodeBuffer.read(Uint8Array, 1);
			this.bMailStat = decodeBuffer.read(Uint8Array, 1);
			this.szRoleName = decodeBuffer.readString(MAX_ROLE_NAME_LEN);
			this.dwMailTime = decodeBuffer.read(Uint32Array, 1);
			this.szMailTitle = decodeBuffer.readString(MAX_MAIL_TITLE_LEN);
			this.szMailContent = decodeBuffer.readString(MAX_MAIL_CONTENT_LEN);
			var astAttachListSize = decodeBuffer.read(Uint16Array, 1);
			this.astAttachList = new Array<PackObj>(astAttachListSize);
			for (var i = 0; i <  astAttachListSize; i++) {
				this.astAttachList[i] = new PackObj();
				decodeBuffer.skip(this.astAttachList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_MAILLIST_CS implements message {
		public bMailBoxType: number = 0;  //邮箱类型，参见枚举MAIL_BOX_RECV等的定义,目前仅收件箱 
		public wPageIndex: number = 0;  //注是从1开始,查询的页码 

		public messageName(): string { return "CMD_GET_MAILLIST";}
		public messageValue(): number { return CMD_GET_MAILLIST;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bMailBoxType);
			encodeBuffer.write(Uint16Array, this.wPageIndex);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bMailBoxType = decodeBuffer.read(Uint8Array, 1);
			this.wPageIndex = decodeBuffer.read(Uint16Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_MAILLIST_SC implements message {
		public bMailBoxType: number = 0;  //邮箱类型，参见枚举MAIL_BOX_RECV等的定义 
		public stPagePara: PageBreakPara = new PageBreakPara();  //分页相关数据 
		public astMailList: Array<MailBaseInfo> = new Array<MailBaseInfo>();  //邮件列表 

		public messageName(): string { return "CMD_GET_MAILLIST";}
		public messageValue(): number { return CMD_GET_MAILLIST;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bMailBoxType);
			encodeBuffer.skip(this.stPagePara.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			var astMailListSize = this.astMailList.length > MAX_MAIL_LIST_COUNT ? MAX_MAIL_LIST_COUNT : this.astMailList.length;
			encodeBuffer.write(Uint16Array, astMailListSize);
			this.astMailList.length = astMailListSize;
			for (var i = 0; i <  astMailListSize; i++) {
				encodeBuffer.skip(this.astMailList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bMailBoxType = decodeBuffer.read(Uint8Array, 1);
			decodeBuffer.skip(this.stPagePara.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			var astMailListSize = decodeBuffer.read(Uint16Array, 1);
			this.astMailList = new Array<MailBaseInfo>(astMailListSize);
			for (var i = 0; i <  astMailListSize; i++) {
				this.astMailList[i] = new MailBaseInfo();
				decodeBuffer.skip(this.astMailList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_MAILATTACH_CS implements message {
		public bMailBoxType: number = 0;  //邮箱类型，参见枚举MAIL_BOX_RECV等的定义,目前仅收件箱 
		public bGetType: number = 0;  //获取附件类型，参见枚举GET_MAILATTACH_TYPE_ONE等的定义 
		public dwMailID: number = 0;  //相关邮件ID，在获取单封邮件附件时有效 

		public messageName(): string { return "CMD_GET_MAILATTACH";}
		public messageValue(): number { return CMD_GET_MAILATTACH;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bMailBoxType);
			encodeBuffer.write(Uint8Array, this.bGetType);
			encodeBuffer.write(Uint32Array, this.dwMailID);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bMailBoxType = decodeBuffer.read(Uint8Array, 1);
			this.bGetType = decodeBuffer.read(Uint8Array, 1);
			this.dwMailID = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_MAILATTACH_SC implements message {
		public bMailBoxType: number = 0;  //邮箱类型，参见枚举MAIL_BOX_RECV等的定义,目前仅收件箱 
		public bGetType: number = 0;  //获取附件类型，参见枚举GET_MAILATTACH_TYPE_ONE等的定义 
		public wGetSuccNum: number = 0;  //成功获取附件邮件封数 
		public dwMailID: number = 0;  //相关邮件ID，在获取单封邮件附件时有效 
		public bCurMailStat: number = 0;  //邮件最新的当前状态标志,按位标记，参见MAIL_STAT_HASREAD等的定义 

		public messageName(): string { return "CMD_GET_MAILATTACH";}
		public messageValue(): number { return CMD_GET_MAILATTACH;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bMailBoxType);
			encodeBuffer.write(Uint8Array, this.bGetType);
			encodeBuffer.write(Uint16Array, this.wGetSuccNum);
			encodeBuffer.write(Uint32Array, this.dwMailID);
			encodeBuffer.write(Uint8Array, this.bCurMailStat);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bMailBoxType = decodeBuffer.read(Uint8Array, 1);
			this.bGetType = decodeBuffer.read(Uint8Array, 1);
			this.wGetSuccNum = decodeBuffer.read(Uint16Array, 1);
			this.dwMailID = decodeBuffer.read(Uint32Array, 1);
			this.bCurMailStat = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_MAILSTAT_CHANGE_CS implements message {
		public bMailBoxType: number = 0;  //邮箱类型，参见枚举MAIL_BOX_RECV等的定义,目前仅收件箱 
		public dwMailID: number = 0;  //相关邮件ID 
		public bMailChangeType: number = 0;  //邮件状态变更,直接使用枚举值,为MAIL_STAT_HASREAD表明邮件己读 

		public messageName(): string { return "CMD_MAILSTAT_CHANGE";}
		public messageValue(): number { return CMD_MAILSTAT_CHANGE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bMailBoxType);
			encodeBuffer.write(Uint32Array, this.dwMailID);
			encodeBuffer.write(Uint8Array, this.bMailChangeType);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bMailBoxType = decodeBuffer.read(Uint8Array, 1);
			this.dwMailID = decodeBuffer.read(Uint32Array, 1);
			this.bMailChangeType = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_MAILSTAT_CHANGE_SC implements message {
		public bMailBoxType: number = 0;  //邮箱类型，参见枚举MAIL_BOX_RECV等的定义,目前仅收件箱 
		public dwMailID: number = 0;  //相关邮件ID 
		public bCurMailStat: number = 0;  //邮件最新的当前状态标志,按位标记，参见MAIL_STAT_HASREAD等的定义 

		public messageName(): string { return "CMD_MAILSTAT_CHANGE";}
		public messageValue(): number { return CMD_MAILSTAT_CHANGE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bMailBoxType);
			encodeBuffer.write(Uint32Array, this.dwMailID);
			encodeBuffer.write(Uint8Array, this.bCurMailStat);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bMailBoxType = decodeBuffer.read(Uint8Array, 1);
			this.dwMailID = decodeBuffer.read(Uint32Array, 1);
			this.bCurMailStat = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_REQ_BIND_SMSCODE_CS implements message {
		public szMobile: string = "";  //玩家手机号 

		public messageName(): string { return "CMD_REQ_BIND_SMSCODE";}
		public messageValue(): number { return CMD_REQ_BIND_SMSCODE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szMobile, MAX_MOBILE_LEN);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szMobile = decodeBuffer.readString(MAX_MOBILE_LEN);
			return decodeBuffer.length();
		}
	}

	export class CMD_REQ_BIND_SMSCODE_SC implements message {
		public szMobile: string = "";  //玩家手机号 

		public messageName(): string { return "CMD_REQ_BIND_SMSCODE";}
		public messageValue(): number { return CMD_REQ_BIND_SMSCODE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szMobile, MAX_MOBILE_LEN);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szMobile = decodeBuffer.readString(MAX_MOBILE_LEN);
			return decodeBuffer.length();
		}
	}

	export class CMD_CONFIRM_BIND_SMSCODE_CS implements message {
		public szMobile: string = "";  //玩家手机号 
		public dwSmSCode: number = 0;  //相关验证码 

		public messageName(): string { return "CMD_CONFIRM_BIND_SMSCODE";}
		public messageValue(): number { return CMD_CONFIRM_BIND_SMSCODE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szMobile, MAX_MOBILE_LEN);
			encodeBuffer.write(Uint32Array, this.dwSmSCode);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szMobile = decodeBuffer.readString(MAX_MOBILE_LEN);
			this.dwSmSCode = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_CONFIRM_BIND_SMSCODE_SC implements message {
		public szMobile: string = "";  //玩家手机号 
		public dwSmSCode: number = 0;  //相关验证码 
		public bConfirmRet: number = 0;  //验证通过后的确认类型,参见枚举MOBILE_BIND_CNA_DIRECT_DO等的定义 
		public szExistBindRoleName: string = "";  //己有绑定帐号的角色名,确认结果为MOBILE_BIND_MOBILE_ALREADY_BIND有效 
		public bExistBindRoleVipLvl: number = 0;  //己有绑定帐号的VIP等级,确认结果为MOBILE_BIND_MOBILE_ALREADY_BIND有效 
		public llExistBindBornID: number = 0;  //己有绑定帐号的角色ID,确认结果为MOBILE_BIND_MOBILE_ALREADY_BIND有效 
		public llExistBindGold: number = 0;  //己有绑定帐号的金币,确认结果为MOBILE_BIND_MOBILE_ALREADY_BIND有效 

		public messageName(): string { return "CMD_CONFIRM_BIND_SMSCODE";}
		public messageValue(): number { return CMD_CONFIRM_BIND_SMSCODE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szMobile, MAX_MOBILE_LEN);
			encodeBuffer.write(Uint32Array, this.dwSmSCode);
			encodeBuffer.write(Uint8Array, this.bConfirmRet);
			encodeBuffer.writeString(this.szExistBindRoleName, MAX_ROLE_NAME_LEN);
			encodeBuffer.write(Uint8Array, this.bExistBindRoleVipLvl);
			encodeBuffer.write(Float64Array, this.llExistBindBornID);
			encodeBuffer.write(Float64Array, this.llExistBindGold);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szMobile = decodeBuffer.readString(MAX_MOBILE_LEN);
			this.dwSmSCode = decodeBuffer.read(Uint32Array, 1);
			this.bConfirmRet = decodeBuffer.read(Uint8Array, 1);
			this.szExistBindRoleName = decodeBuffer.readString(MAX_ROLE_NAME_LEN);
			this.bExistBindRoleVipLvl = decodeBuffer.read(Uint8Array, 1);
			this.llExistBindBornID = decodeBuffer.read(Float64Array, 1);
			this.llExistBindGold = decodeBuffer.read(Float64Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_DO_BIND_MOBILE_CS implements message {
		public szMobile: string = "";  //玩家手机号 
		public dwSmSCode: number = 0;  //相关验证码 

		public messageName(): string { return "CMD_DO_BIND_MOBILE";}
		public messageValue(): number { return CMD_DO_BIND_MOBILE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szMobile, MAX_MOBILE_LEN);
			encodeBuffer.write(Uint32Array, this.dwSmSCode);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szMobile = decodeBuffer.readString(MAX_MOBILE_LEN);
			this.dwSmSCode = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_DO_BIND_MOBILE_SC implements message {
		public szMobile: string = "";  //玩家手机号 
		public dwSmSCode: number = 0;  //相关验证码 

		public messageName(): string { return "CMD_DO_BIND_MOBILE";}
		public messageValue(): number { return CMD_DO_BIND_MOBILE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szMobile, MAX_MOBILE_LEN);
			encodeBuffer.write(Uint32Array, this.dwSmSCode);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szMobile = decodeBuffer.readString(MAX_MOBILE_LEN);
			this.dwSmSCode = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_DO_REPLACE_ACCOUNT_CS implements message {
		public szMobile: string = "";  //玩家手机号 
		public dwSmSCode: number = 0;  //相关验证码 

		public messageName(): string { return "CMD_DO_REPLACE_ACCOUNT";}
		public messageValue(): number { return CMD_DO_REPLACE_ACCOUNT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szMobile, MAX_MOBILE_LEN);
			encodeBuffer.write(Uint32Array, this.dwSmSCode);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szMobile = decodeBuffer.readString(MAX_MOBILE_LEN);
			this.dwSmSCode = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_DO_REPLACE_ACCOUNT_SC implements message {
		public szMobile: string = "";  //玩家手机号 
		public dwSmSCode: number = 0;  //相关验证码 

		public messageName(): string { return "CMD_DO_REPLACE_ACCOUNT";}
		public messageValue(): number { return CMD_DO_REPLACE_ACCOUNT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szMobile, MAX_MOBILE_LEN);
			encodeBuffer.write(Uint32Array, this.dwSmSCode);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szMobile = decodeBuffer.readString(MAX_MOBILE_LEN);
			this.dwSmSCode = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTICE_CMDFAIL_SC implements message {
		public dwFailCMD: number = 0;  //执行后失败了的命令字,参见CMD_DO_REPLACE_ACCOUNT等定义 

		public messageName(): string { return "CMD_NOTICE_CMDFAIL";}
		public messageValue(): number { return CMD_NOTICE_CMDFAIL;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwFailCMD);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwFailCMD = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class TopWinnerInfo implements message {
		public dwObjectID: number = 0;  //实体handle 
		public llBornID: number = 0;  //玩家ID 
		public wVipLevel: number = 0;  //VIP等级 
		public szName: string = "";  //字符串类型的名字 
		public bSex: number = 0;  //性别,目前不会用到 
		public llWinGold: number = 0;  //拥有的金币 
		public szSelfDefPhoto: string = "";  //玩家自定义头像,长度不为0时以此为准 

		public messageName(): string { return "TopWinnerInfo";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwObjectID);
			encodeBuffer.write(Float64Array, this.llBornID);
			encodeBuffer.write(Uint16Array, this.wVipLevel);
			encodeBuffer.writeString(this.szName, MAX_ROLE_NAME_LEN);
			encodeBuffer.write(Uint8Array, this.bSex);
			encodeBuffer.write(Float64Array, this.llWinGold);
			encodeBuffer.writeString(this.szSelfDefPhoto, MAX_ROLE_SELFDEF_PHOTO_LEN);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwObjectID = decodeBuffer.read(Uint32Array, 1);
			this.llBornID = decodeBuffer.read(Float64Array, 1);
			this.wVipLevel = decodeBuffer.read(Uint16Array, 1);
			this.szName = decodeBuffer.readString(MAX_ROLE_NAME_LEN);
			this.bSex = decodeBuffer.read(Uint8Array, 1);
			this.llWinGold = decodeBuffer.read(Float64Array, 1);
			this.szSelfDefPhoto = decodeBuffer.readString(MAX_ROLE_SELFDEF_PHOTO_LEN);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_TOPWINNER_SC implements message {
		public wMapTemplateID: number = 0;  //对应的房间对应地图ID参见MAP_TEMPLATE_ID_NORMAL_SLOT等枚举 
		public dwRoundID: number = 0;  //对应的相关转数序号 
		public stWinnerInfo: TopWinnerInfo = new TopWinnerInfo();  //最大赢家相关数据 

		public messageName(): string { return "CMD_NOTIFY_TOPWINNER";}
		public messageValue(): number { return CMD_NOTIFY_TOPWINNER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wMapTemplateID);
			encodeBuffer.write(Uint32Array, this.dwRoundID);
			encodeBuffer.skip(this.stWinnerInfo.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wMapTemplateID = decodeBuffer.read(Uint16Array, 1);
			this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			decodeBuffer.skip(this.stWinnerInfo.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class CMD_VIVO_GEN_ORDER_CS implements message {
		public szVivoAppID: string = "";  //vivo的appid 
		public szPayCode: string = "";  //支付编码 
		public szPayViewChannel: string = "";  //支付显示渠道 
		public szOrderTitle: string = "";  //订单标题 
		public szOrderDesc: string = "";  //订单描述 

		public messageName(): string { return "CMD_VIVO_GEN_ORDER";}
		public messageValue(): number { return CMD_VIVO_GEN_ORDER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szVivoAppID, MAX_PAY_VIVO_APPID_LEN);
			encodeBuffer.writeString(this.szPayCode, MAX_PAY_PAYCODELEN);
			encodeBuffer.writeString(this.szPayViewChannel, MAX_PAY_VIEWCHANNEL_LEN);
			encodeBuffer.writeString(this.szOrderTitle, MAX_PAY_VIVO_ORDERTITLE_LEN);
			encodeBuffer.writeString(this.szOrderDesc, MAX_PAY_VIVO_ORDERDESC_LEN);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szVivoAppID = decodeBuffer.readString(MAX_PAY_VIVO_APPID_LEN);
			this.szPayCode = decodeBuffer.readString(MAX_PAY_PAYCODELEN);
			this.szPayViewChannel = decodeBuffer.readString(MAX_PAY_VIEWCHANNEL_LEN);
			this.szOrderTitle = decodeBuffer.readString(MAX_PAY_VIVO_ORDERTITLE_LEN);
			this.szOrderDesc = decodeBuffer.readString(MAX_PAY_VIVO_ORDERDESC_LEN);
			return decodeBuffer.length();
		}
	}

	export class CMD_VIVO_GEN_ORDER_SC implements message {
		public szPayCode: string = "";  //支付编码 
		public szOrderNumber: string = "";  //vivo返回的订单编号 
		public szAccessKey: string = "";  //vivo返回的accesskey 

		public messageName(): string { return "CMD_VIVO_GEN_ORDER";}
		public messageValue(): number { return CMD_VIVO_GEN_ORDER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szPayCode, MAX_PAY_PAYCODELEN);
			encodeBuffer.writeString(this.szOrderNumber, MAX_PAY_VIVO_ORDERID_LEN);
			encodeBuffer.writeString(this.szAccessKey, MAX_PAY_VIVO_ACCESSKEY_LEN);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szPayCode = decodeBuffer.readString(MAX_PAY_PAYCODELEN);
			this.szOrderNumber = decodeBuffer.readString(MAX_PAY_VIVO_ORDERID_LEN);
			this.szAccessKey = decodeBuffer.readString(MAX_PAY_VIVO_ACCESSKEY_LEN);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_ROUNDINDEXERR_CS implements message {
		public wOrginMapTemplateID: number = 0;  //被踢出前所在的对应的房间对应地图ID参见MAP_TEMPLATE_ID_NORMAL_SLOT等枚举 
		public dwClientRoundIndex: number = 0;  //客户端本地数据:转数序号 
		public wClientLeftBetTime: number = 0;  //客户端本地数据:当前对应剩余可下注秒数 
		public bClientIsHasBanker: number = 0;  //客户端本地数据:为0无庄家,其他则有庄家 
		public bLeftPrizeSetTime: number = 0;  //客户端本地数据:当前庄家设置下次开奖时间对应剩余可下注秒数 
		public dwRelateServerCmdID: number = 0;  //服务器下发了不同转数序号对应的命令字ID 
		public dwRelateServerRoundIndex: number = 0;  //服务器下发的不同转数序号 

		public messageName(): string { return "CMD_NOTIFY_ROUNDINDEXERR";}
		public messageValue(): number { return CMD_NOTIFY_ROUNDINDEXERR;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wOrginMapTemplateID);
			encodeBuffer.write(Uint32Array, this.dwClientRoundIndex);
			encodeBuffer.write(Uint8Array, this.wClientLeftBetTime);
			encodeBuffer.write(Uint8Array, this.bClientIsHasBanker);
			encodeBuffer.write(Uint8Array, this.bLeftPrizeSetTime);
			encodeBuffer.write(Uint32Array, this.dwRelateServerCmdID);
			encodeBuffer.write(Uint32Array, this.dwRelateServerRoundIndex);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wOrginMapTemplateID = decodeBuffer.read(Uint16Array, 1);
			this.dwClientRoundIndex = decodeBuffer.read(Uint32Array, 1);
			this.wClientLeftBetTime = decodeBuffer.read(Uint8Array, 1);
			this.bClientIsHasBanker = decodeBuffer.read(Uint8Array, 1);
			this.bLeftPrizeSetTime = decodeBuffer.read(Uint8Array, 1);
			this.dwRelateServerCmdID = decodeBuffer.read(Uint32Array, 1);
			this.dwRelateServerRoundIndex = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_CHECK_MALLBUY_CS implements message {
		public szPayCode: string = "";  //支付编码 
		public dwPayWayType: number = 0;  //支付方式类型,将支付渠道和类型结合的统一key,参见PAYWAY_ALIPAY等 

		public messageName(): string { return "CMD_CHECK_MALLBUY";}
		public messageValue(): number { return CMD_CHECK_MALLBUY;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szPayCode, MAX_PAY_PAYCODELEN);
			encodeBuffer.write(Uint32Array, this.dwPayWayType);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szPayCode = decodeBuffer.readString(MAX_PAY_PAYCODELEN);
			this.dwPayWayType = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_CHECK_MALLBUY_SC implements message {
		public bCheckRet: number = 0;  //检查成功为0,其他失败,具体描述通过CMD_ERROR下行提示 
		public szPayCode: string = "";  //支付编码 
		public dwPayWayType: number = 0;  //支付方式类型,将支付渠道和类型结合的统一key,参见PAYWAY_ALIPAY等 

		public messageName(): string { return "CMD_CHECK_MALLBUY";}
		public messageValue(): number { return CMD_CHECK_MALLBUY;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bCheckRet);
			encodeBuffer.writeString(this.szPayCode, MAX_PAY_PAYCODELEN);
			encodeBuffer.write(Uint32Array, this.dwPayWayType);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bCheckRet = decodeBuffer.read(Uint8Array, 1);
			this.szPayCode = decodeBuffer.readString(MAX_PAY_PAYCODELEN);
			this.dwPayWayType = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_UNICOM_GEN_ORDER_CS implements message {
		public szAppID: string = "";  //appid 
		public szCpID: string = "";  //cpid 
		public szPayCode: string = "";  //支付编码 
		public szPayViewChannel: string = "";  //支付显示渠道 

		public messageName(): string { return "CMD_UNICOM_GEN_ORDER";}
		public messageValue(): number { return CMD_UNICOM_GEN_ORDER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szAppID, 255);
			encodeBuffer.writeString(this.szCpID, 255);
			encodeBuffer.writeString(this.szPayCode, MAX_PAY_PAYCODELEN);
			encodeBuffer.writeString(this.szPayViewChannel, MAX_PAY_VIEWCHANNEL_LEN);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szAppID = decodeBuffer.readString(255);
			this.szCpID = decodeBuffer.readString(255);
			this.szPayCode = decodeBuffer.readString(MAX_PAY_PAYCODELEN);
			this.szPayViewChannel = decodeBuffer.readString(MAX_PAY_VIEWCHANNEL_LEN);
			return decodeBuffer.length();
		}
	}

	export class CMD_UNICOM_GEN_ORDER_SC implements message {
		public szPayCode: string = "";  //支付编码 
		public szOrderNumber: string = "";  //返回的订单编号 

		public messageName(): string { return "CMD_UNICOM_GEN_ORDER";}
		public messageValue(): number { return CMD_UNICOM_GEN_ORDER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szPayCode, MAX_PAY_PAYCODELEN);
			encodeBuffer.writeString(this.szOrderNumber, 255);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szPayCode = decodeBuffer.readString(MAX_PAY_PAYCODELEN);
			this.szOrderNumber = decodeBuffer.readString(255);
			return decodeBuffer.length();
		}
	}

	export class CMD_LENOVO_GEN_ORDER_CS implements message {
		public szAppID: string = "";  //appid 
		public szPayCode: string = "";  //支付编码 
		public szPayViewChannel: string = "";  //支付显示渠道 

		public messageName(): string { return "CMD_LENOVO_GEN_ORDER";}
		public messageValue(): number { return CMD_LENOVO_GEN_ORDER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szAppID, 255);
			encodeBuffer.writeString(this.szPayCode, MAX_PAY_PAYCODELEN);
			encodeBuffer.writeString(this.szPayViewChannel, MAX_PAY_VIEWCHANNEL_LEN);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szAppID = decodeBuffer.readString(255);
			this.szPayCode = decodeBuffer.readString(MAX_PAY_PAYCODELEN);
			this.szPayViewChannel = decodeBuffer.readString(MAX_PAY_VIEWCHANNEL_LEN);
			return decodeBuffer.length();
		}
	}

	export class CMD_LENOVO_GEN_ORDER_SC implements message {
		public szPayCode: string = "";  //支付编码 
		public szExOrderID: string = "";  //返回的订单编号 
		public szPrivateInfo: string = "";  //订单的业务私有信息 

		public messageName(): string { return "CMD_LENOVO_GEN_ORDER";}
		public messageValue(): number { return CMD_LENOVO_GEN_ORDER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szPayCode, MAX_PAY_PAYCODELEN);
			encodeBuffer.writeString(this.szExOrderID, MAX_PAY_LENOVO_EXORDERID_LEN);
			encodeBuffer.writeString(this.szPrivateInfo, MAX_PAY_LENOVO_PRIVATEINFO_LEN);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szPayCode = decodeBuffer.readString(MAX_PAY_PAYCODELEN);
			this.szExOrderID = decodeBuffer.readString(MAX_PAY_LENOVO_EXORDERID_LEN);
			this.szPrivateInfo = decodeBuffer.readString(MAX_PAY_LENOVO_PRIVATEINFO_LEN);
			return decodeBuffer.length();
		}
	}

	export class CMD_COMM_MALL_GEN_ORDER_CS implements message {
		public dwChargePlatform: number = 0;  //支付平台类型参见CHARGE_PLATFORM_HAIMA等定义 
		public szAppID: string = "";  //appid 
		public szPayCode: string = "";  //支付编码 
		public szPayViewChannel: string = "";  //支付显示渠道 
		public szReserve1: string = "";  //保留字段1 
		public szReserve2: string = "";  //保留字段2 
		public llReserve3: number = 0;  //保留字段3 
		public llReserve4: number = 0;  //保留字段4 

		public messageName(): string { return "CMD_COMM_MALL_GEN_ORDER";}
		public messageValue(): number { return CMD_COMM_MALL_GEN_ORDER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwChargePlatform);
			encodeBuffer.writeString(this.szAppID, 512);
			encodeBuffer.writeString(this.szPayCode, MAX_PAY_PAYCODELEN);
			encodeBuffer.writeString(this.szPayViewChannel, MAX_PAY_VIEWCHANNEL_LEN);
			encodeBuffer.writeString(this.szReserve1, 512);
			encodeBuffer.writeString(this.szReserve2, 512);
			encodeBuffer.write(Float64Array, this.llReserve3);
			encodeBuffer.write(Float64Array, this.llReserve4);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwChargePlatform = decodeBuffer.read(Uint32Array, 1);
			this.szAppID = decodeBuffer.readString(512);
			this.szPayCode = decodeBuffer.readString(MAX_PAY_PAYCODELEN);
			this.szPayViewChannel = decodeBuffer.readString(MAX_PAY_VIEWCHANNEL_LEN);
			this.szReserve1 = decodeBuffer.readString(512);
			this.szReserve2 = decodeBuffer.readString(512);
			this.llReserve3 = decodeBuffer.read(Float64Array, 1);
			this.llReserve4 = decodeBuffer.read(Float64Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_COMM_MALL_GEN_ORDER_SC implements message {
		public dwChargePlatform: number = 0;  //支付平台类型参见CHARGE_PLATFORM_HAIMA等定义 
		public szAppID: string = "";  //appid 
		public szPayCode: string = "";  //支付编码 
		public szOrderNumber: string = "";  //返回的游戏内部订单编号 
		public szPrivateInfo: string = "";  //支付时传递的私有信息 
		public szReserve1: string = "";  //保留字段1 
		public szReserve2: string = "";  //保留字段2 
		public llReserve3: number = 0;  //保留字段3 
		public llReserve4: number = 0;  //保留字段4 

		public messageName(): string { return "CMD_COMM_MALL_GEN_ORDER";}
		public messageValue(): number { return CMD_COMM_MALL_GEN_ORDER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwChargePlatform);
			encodeBuffer.writeString(this.szAppID, 512);
			encodeBuffer.writeString(this.szPayCode, MAX_PAY_PAYCODELEN);
			encodeBuffer.writeString(this.szOrderNumber, MAX_PAY_COMM_SELFORDER_LEN);
			encodeBuffer.writeString(this.szPrivateInfo, MAX_PAY_COMM_PRIVATEINFO_LEN);
			encodeBuffer.writeString(this.szReserve1, 512);
			encodeBuffer.writeString(this.szReserve2, 512);
			encodeBuffer.write(Float64Array, this.llReserve3);
			encodeBuffer.write(Float64Array, this.llReserve4);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwChargePlatform = decodeBuffer.read(Uint32Array, 1);
			this.szAppID = decodeBuffer.readString(512);
			this.szPayCode = decodeBuffer.readString(MAX_PAY_PAYCODELEN);
			this.szOrderNumber = decodeBuffer.readString(MAX_PAY_COMM_SELFORDER_LEN);
			this.szPrivateInfo = decodeBuffer.readString(MAX_PAY_COMM_PRIVATEINFO_LEN);
			this.szReserve1 = decodeBuffer.readString(512);
			this.szReserve2 = decodeBuffer.readString(512);
			this.llReserve3 = decodeBuffer.read(Float64Array, 1);
			this.llReserve4 = decodeBuffer.read(Float64Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_NTF_ENTERVIEW_SC implements message {
		public astObjList: Array<OBJ_ENTERVIEW> = new Array<OBJ_ENTERVIEW>();  //进入视野的动态对象列表 

		public messageName(): string { return "CMD_NTF_ENTERVIEW";}
		public messageValue(): number { return CMD_NTF_ENTERVIEW;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var astObjListSize = this.astObjList.length > MAX_VIEW_OBJ_COUNT ? MAX_VIEW_OBJ_COUNT : this.astObjList.length;
			encodeBuffer.write(Uint16Array, astObjListSize);
			this.astObjList.length = astObjListSize;
			for (var i = 0; i <  astObjListSize; i++) {
				encodeBuffer.skip(this.astObjList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var astObjListSize = decodeBuffer.read(Uint16Array, 1);
			this.astObjList = new Array<OBJ_ENTERVIEW>(astObjListSize);
			for (var i = 0; i <  astObjListSize; i++) {
				this.astObjList[i] = new OBJ_ENTERVIEW();
				decodeBuffer.skip(this.astObjList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_NTF_LEAVEVIEW_SC implements message {
		public astObjList: Array<OBJ_LEAVEVIEW> = new Array<OBJ_LEAVEVIEW>();  //离开视野的动态对象列表 

		public messageName(): string { return "CMD_NTF_LEAVEVIEW";}
		public messageValue(): number { return CMD_NTF_LEAVEVIEW;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var astObjListSize = this.astObjList.length > MAX_VIEW_OBJ_COUNT ? MAX_VIEW_OBJ_COUNT : this.astObjList.length;
			encodeBuffer.write(Uint16Array, astObjListSize);
			this.astObjList.length = astObjListSize;
			for (var i = 0; i <  astObjListSize; i++) {
				encodeBuffer.skip(this.astObjList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var astObjListSize = decodeBuffer.read(Uint16Array, 1);
			this.astObjList = new Array<OBJ_LEAVEVIEW>(astObjListSize);
			for (var i = 0; i <  astObjListSize; i++) {
				this.astObjList[i] = new OBJ_LEAVEVIEW();
				decodeBuffer.skip(this.astObjList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class ZjhPlayerAllData implements message {
		public dwObjectID: number = 0;  //对应玩家的实体handle 
		public bCurPlayerStatus: number = 0;  //对应玩家当前状态参见CARDPLAYER_STATUS_VIEWER等枚举 
		public dwSubMaskStatus: number = 0;  //对应玩家一些逻辑状态,可能为ZJH_PLAYER_MASK_NONE等多个枚举的或值 
		public wRelateLeftTime: number = 0;  //各种状态下的相关剩余秒数 
		public llBetGoldAll: number = 0;  //当前总下注金币数 
		public wRelateCountDownTimeAll: number = 0;  //各种状态下的相关倒计时总秒数 
		public bForbidCompardLeftTurn: number = 0;  //若玩家处于禁比状态对应其禁比剩余轮数 
		public bDoubleType: number = 0;  //若玩家处于翻倍状态对应其翻倍方式参见ZJH_DOUBLETYPE_2等枚举 
		public astCardList: Array<number> = new Array<number>();  //当对应数据为自己的数据时有效手牌列表在游戏状态且己看牌的情况下不为空char表示方式 

		public messageName(): string { return "ZjhPlayerAllData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwObjectID);
			encodeBuffer.write(Uint8Array, this.bCurPlayerStatus);
			encodeBuffer.write(Uint32Array, this.dwSubMaskStatus);
			encodeBuffer.write(Uint16Array, this.wRelateLeftTime);
			if (17<csproto.CSProto.Version) {
				encodeBuffer.write(Float64Array, this.llBetGoldAll);
			}
			if (19<csproto.CSProto.Version) {
				encodeBuffer.write(Uint16Array, this.wRelateCountDownTimeAll);
			}
			encodeBuffer.write(Uint8Array, this.bForbidCompardLeftTurn);
			encodeBuffer.write(Uint8Array, this.bDoubleType);
			var astCardListSize = this.astCardList.length > 3 ? 3 : this.astCardList.length;
			encodeBuffer.write(Uint16Array, astCardListSize);
			this.astCardList.length = astCardListSize;
			encodeBuffer.write(Uint8Array, this.astCardList);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwObjectID = decodeBuffer.read(Uint32Array, 1);
			this.bCurPlayerStatus = decodeBuffer.read(Uint8Array, 1);
			this.dwSubMaskStatus = decodeBuffer.read(Uint32Array, 1);
			this.wRelateLeftTime = decodeBuffer.read(Uint16Array, 1);
			if (17<csproto.CSProto.Version) {
				this.llBetGoldAll = decodeBuffer.read(Float64Array, 1);
			}
			if (19<csproto.CSProto.Version) {
				this.wRelateCountDownTimeAll = decodeBuffer.read(Uint16Array, 1);
			}
			this.bForbidCompardLeftTurn = decodeBuffer.read(Uint8Array, 1);
			this.bDoubleType = decodeBuffer.read(Uint8Array, 1);
			var astCardListSize = decodeBuffer.read(Uint16Array, 1);
			this.astCardList = new Array<number>(astCardListSize);
			this.astCardList = decodeBuffer.read(Uint8Array, astCardListSize);
			return decodeBuffer.length();
		}
	}

	export class ZjhPlayerUptData implements message {
		public dwObjectID: number = 0;  //对应玩家的实体handle 
		public bCurPlayerStatus: number = 0;  //对应玩家当前状态参见CARDPLAYER_STATUS_VIEWER等枚举 
		public dwSubMaskStatus: number = 0;  //对应玩家一些逻辑状态,可能为ZJH_PLAYER_MASK_NONE等多个枚举的或值 
		public wRelateLeftTime: number = 0;  //各种状态下的相关剩余秒数 
		public llBetGoldAll: number = 0;  //当前总下注金币数 
		public wRelateCountDownTimeAll: number = 0;  //各种状态下的相关倒计时总秒数 
		public bForbidCompardLeftTurn: number = 0;  //若玩家处于禁比状态对应其禁比剩余轮数 
		public bDoubleType: number = 0;  //若玩家处于翻倍状态对应其翻倍方式参见ZJH_DOUBLETYPE_2等枚举 

		public messageName(): string { return "ZjhPlayerUptData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwObjectID);
			encodeBuffer.write(Uint8Array, this.bCurPlayerStatus);
			encodeBuffer.write(Uint32Array, this.dwSubMaskStatus);
			encodeBuffer.write(Uint16Array, this.wRelateLeftTime);
			if (17<csproto.CSProto.Version) {
				encodeBuffer.write(Float64Array, this.llBetGoldAll);
			}
			if (19<csproto.CSProto.Version) {
				encodeBuffer.write(Uint16Array, this.wRelateCountDownTimeAll);
			}
			if (20<csproto.CSProto.Version) {
				encodeBuffer.write(Uint8Array, this.bForbidCompardLeftTurn);
			}
			if (20<csproto.CSProto.Version) {
				encodeBuffer.write(Uint8Array, this.bDoubleType);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwObjectID = decodeBuffer.read(Uint32Array, 1);
			this.bCurPlayerStatus = decodeBuffer.read(Uint8Array, 1);
			this.dwSubMaskStatus = decodeBuffer.read(Uint32Array, 1);
			this.wRelateLeftTime = decodeBuffer.read(Uint16Array, 1);
			if (17<csproto.CSProto.Version) {
				this.llBetGoldAll = decodeBuffer.read(Float64Array, 1);
			}
			if (19<csproto.CSProto.Version) {
				this.wRelateCountDownTimeAll = decodeBuffer.read(Uint16Array, 1);
			}
			if (20<csproto.CSProto.Version) {
				this.bForbidCompardLeftTurn = decodeBuffer.read(Uint8Array, 1);
			}
			if (20<csproto.CSProto.Version) {
				this.bDoubleType = decodeBuffer.read(Uint8Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class ZjhAllData implements message {
		public dwRoundID: number = 0;  //对应的相关局数序号,目前仅用于调试方便 
		public bTabStatus: number = 0;  //当前状态,参见CARDROOM_CURSTATUS_NOTBEGIN等系列枚举 
		public wRelateLeftTime: number = 0;  //各种状态下的相关剩余秒数 
		public wBankerPosX: number = 0;  //庄家位置 
		public wCurTurn: number = 0;  //当前回合数 
		public wMaxTurn: number = 0;  //最大总回合数 
		public llTotalBetGold: number = 0;  //总下注金币数 
		public wActPlayerPosX: number = 0;  //当前活动玩家位置 
		public llCurBaseBetGold: number = 0;  //当前单注金币数 
		public wRelateCountDownTimeAll: number = 0;  //各种状态下的相关倒计时总秒数 

		public messageName(): string { return "ZjhAllData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwRoundID);
			encodeBuffer.write(Uint8Array, this.bTabStatus);
			encodeBuffer.write(Uint16Array, this.wRelateLeftTime);
			encodeBuffer.write(Uint16Array, this.wBankerPosX);
			encodeBuffer.write(Uint16Array, this.wCurTurn);
			encodeBuffer.write(Uint16Array, this.wMaxTurn);
			encodeBuffer.write(Float64Array, this.llTotalBetGold);
			encodeBuffer.write(Uint16Array, this.wActPlayerPosX);
			encodeBuffer.write(Float64Array, this.llCurBaseBetGold);
			if (19<csproto.CSProto.Version) {
				encodeBuffer.write(Uint16Array, this.wRelateCountDownTimeAll);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			this.bTabStatus = decodeBuffer.read(Uint8Array, 1);
			this.wRelateLeftTime = decodeBuffer.read(Uint16Array, 1);
			this.wBankerPosX = decodeBuffer.read(Uint16Array, 1);
			this.wCurTurn = decodeBuffer.read(Uint16Array, 1);
			this.wMaxTurn = decodeBuffer.read(Uint16Array, 1);
			this.llTotalBetGold = decodeBuffer.read(Float64Array, 1);
			this.wActPlayerPosX = decodeBuffer.read(Uint16Array, 1);
			this.llCurBaseBetGold = decodeBuffer.read(Float64Array, 1);
			if (19<csproto.CSProto.Version) {
				this.wRelateCountDownTimeAll = decodeBuffer.read(Uint16Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class ZjhTableUptData implements message {
		public dwRoundID: number = 0;  //对应的相关局数序号,目前仅用于调试方便 
		public bTabStatus: number = 0;  //当前状态,参见CARDROOM_CURSTATUS_NOTBEGIN等系列枚举 
		public wRelateLeftTime: number = 0;  //各种状态下的相关剩余秒数 
		public wCurTurn: number = 0;  //当前回合数 
		public llTotalBetGold: number = 0;  //总下注金币数 
		public wActPlayerPosX: number = 0;  //当前活动玩家位置 
		public llCurBaseBetGold: number = 0;  //当前单注金币数 
		public wRelateCountDownTimeAll: number = 0;  //各种状态下的相关倒计时总秒数 

		public messageName(): string { return "ZjhTableUptData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwRoundID);
			encodeBuffer.write(Uint8Array, this.bTabStatus);
			encodeBuffer.write(Uint16Array, this.wRelateLeftTime);
			encodeBuffer.write(Uint16Array, this.wCurTurn);
			encodeBuffer.write(Float64Array, this.llTotalBetGold);
			encodeBuffer.write(Uint16Array, this.wActPlayerPosX);
			encodeBuffer.write(Float64Array, this.llCurBaseBetGold);
			if (19<csproto.CSProto.Version) {
				encodeBuffer.write(Uint16Array, this.wRelateCountDownTimeAll);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			this.bTabStatus = decodeBuffer.read(Uint8Array, 1);
			this.wRelateLeftTime = decodeBuffer.read(Uint16Array, 1);
			this.wCurTurn = decodeBuffer.read(Uint16Array, 1);
			this.llTotalBetGold = decodeBuffer.read(Float64Array, 1);
			this.wActPlayerPosX = decodeBuffer.read(Uint16Array, 1);
			this.llCurBaseBetGold = decodeBuffer.read(Float64Array, 1);
			if (19<csproto.CSProto.Version) {
				this.wRelateCountDownTimeAll = decodeBuffer.read(Uint16Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_ENTERDATA_SC implements message {
		public wMapID: number = 0;  //对应地图ID 
		public dwSceneID: number = 0;  //对应的场景ID 
		public dwTableID: number = 0;  //对应的桌台ID 
		public wSelfPosX: number = 0;  //位置X,对于房间内的第一个玩家是1，其他依次类推 
		public stAllData: ZjhAllData = new ZjhAllData();  //对应当前数据 
		public szPWD: string = "";  //对应设置的房间密码仅私人场有效 

		public messageName(): string { return "CMD_ZJH_ENTERDATA";}
		public messageValue(): number { return CMD_ZJH_ENTERDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wMapID);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			encodeBuffer.write(Uint32Array, this.dwTableID);
			encodeBuffer.write(Uint16Array, this.wSelfPosX);
			encodeBuffer.skip(this.stAllData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			if (33<csproto.CSProto.Version) {
				encodeBuffer.writeString(this.szPWD, 10);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wMapID = decodeBuffer.read(Uint16Array, 1);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			this.dwTableID = decodeBuffer.read(Uint32Array, 1);
			this.wSelfPosX = decodeBuffer.read(Uint16Array, 1);
			decodeBuffer.skip(this.stAllData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			if (33<csproto.CSProto.Version) {
				this.szPWD = decodeBuffer.readString(10);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_BEGIN_ONEGAME_SC implements message {
		public dwSceneID: number = 0;  //对应的场景ID,需要与玩家当前所在的sceneid一致才能处理,该id全游戏唯一 
		public stAllData: ZjhAllData = new ZjhAllData();  //对应当前数据 

		public messageName(): string { return "CMD_ZJH_BEGIN_ONEGAME";}
		public messageValue(): number { return CMD_ZJH_BEGIN_ONEGAME;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			encodeBuffer.skip(this.stAllData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			decodeBuffer.skip(this.stAllData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_UPT_PLAYER_DATA_SC implements message {
		public dwSceneID: number = 0;  //对应的场景ID,需要与玩家当前所在的sceneid一致才能处理,该id全游戏唯一 
		public astUptData: Array<ZjhPlayerUptData> = new Array<ZjhPlayerUptData>();  //对应玩家当前最新的相关需要更新数据列表 

		public messageName(): string { return "CMD_ZJH_UPT_PLAYER_DATA";}
		public messageValue(): number { return CMD_ZJH_UPT_PLAYER_DATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			var astUptDataSize = this.astUptData.length > 5 ? 5 : this.astUptData.length;
			encodeBuffer.write(Uint16Array, astUptDataSize);
			this.astUptData.length = astUptDataSize;
			for (var i = 0; i <  astUptDataSize; i++) {
				encodeBuffer.skip(this.astUptData[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			var astUptDataSize = decodeBuffer.read(Uint16Array, 1);
			this.astUptData = new Array<ZjhPlayerUptData>(astUptDataSize);
			for (var i = 0; i <  astUptDataSize; i++) {
				this.astUptData[i] = new ZjhPlayerUptData();
				decodeBuffer.skip(this.astUptData[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_PLAYER_ALLDATA_SC implements message {
		public dwSceneID: number = 0;  //对应的场景ID,需要与玩家当前所在的sceneid一致才能处理,该id全游戏唯一 
		public astAllData: Array<ZjhPlayerAllData> = new Array<ZjhPlayerAllData>();  //对应玩家进场初始化的全量数据 

		public messageName(): string { return "CMD_ZJH_PLAYER_ALLDATA";}
		public messageValue(): number { return CMD_ZJH_PLAYER_ALLDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			var astAllDataSize = this.astAllData.length > 5 ? 5 : this.astAllData.length;
			encodeBuffer.write(Uint16Array, astAllDataSize);
			this.astAllData.length = astAllDataSize;
			for (var i = 0; i <  astAllDataSize; i++) {
				encodeBuffer.skip(this.astAllData[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			var astAllDataSize = decodeBuffer.read(Uint16Array, 1);
			this.astAllData = new Array<ZjhPlayerAllData>(astAllDataSize);
			for (var i = 0; i <  astAllDataSize; i++) {
				this.astAllData[i] = new ZjhPlayerAllData();
				decodeBuffer.skip(this.astAllData[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_UPT_TABLE_DATA_SC implements message {
		public dwSceneID: number = 0;  //对应的场景ID,需要与玩家当前所在的sceneid一致才能处理,该id全游戏唯一 
		public stUptData: ZjhTableUptData = new ZjhTableUptData();  //对应当前数据 

		public messageName(): string { return "CMD_ZJH_UPT_TABLE_DATA";}
		public messageValue(): number { return CMD_ZJH_UPT_TABLE_DATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			encodeBuffer.skip(this.stUptData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			decodeBuffer.skip(this.stUptData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_DO_VIEWCARD_SC implements message {
		public dwSceneID: number = 0;  //对应的场景ID,需要与玩家当前所在的sceneid一致才能处理,该id全游戏唯一 
		public astCardList: Array<number> = new Array<number>();  //手牌列表,char表示方式 

		public messageName(): string { return "CMD_ZJH_DO_VIEWCARD";}
		public messageValue(): number { return CMD_ZJH_DO_VIEWCARD;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			var astCardListSize = this.astCardList.length > 3 ? 3 : this.astCardList.length;
			encodeBuffer.write(Uint16Array, astCardListSize);
			this.astCardList.length = astCardListSize;
			encodeBuffer.write(Uint8Array, this.astCardList);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			var astCardListSize = decodeBuffer.read(Uint16Array, 1);
			this.astCardList = new Array<number>(astCardListSize);
			this.astCardList = decodeBuffer.read(Uint8Array, astCardListSize);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_DO_BET_CS implements message {
		public bBetWay: number = 0;  //对应压注方式参见ZHJ_BETWAY_FOLLOW等枚举 
		public dwBetGold: number = 0;  //加注时对应的单注下注金币数,后台自行检查是否合法值 
		public newVerBetGold: number = 0;  //新版本客户端都用这个字段了不使用dwBetGold 

		public messageName(): string { return "CMD_ZJH_DO_BET";}
		public messageValue(): number { return CMD_ZJH_DO_BET;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bBetWay);
			encodeBuffer.write(Uint32Array, this.dwBetGold);
			if (33<csproto.CSProto.Version) {
				encodeBuffer.write(Float64Array, this.newVerBetGold);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bBetWay = decodeBuffer.read(Uint8Array, 1);
			this.dwBetGold = decodeBuffer.read(Uint32Array, 1);
			if (33<csproto.CSProto.Version) {
				this.newVerBetGold = decodeBuffer.read(Float64Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_DO_BET_SC implements message {
		public dwSceneID: number = 0;  //对应的场景ID,需要与玩家当前所在的sceneid一致才能处理,该id全游戏唯一 
		public dwObjectID: number = 0;  //对应下注玩家的实体handle,该消息是广播消息,需要该字段 
		public bBetWay: number = 0;  //对应压注方式参见ZJH_BETWAY_FOLLOW等枚举 
		public dwBetGold: number = 0;  //对应的单注下注金币数 
		public bRetCostGoldTimes: number = 0;  //对应的最终下注倍数 
		public newVerBetGold: number = 0;  //对应的单注下注金币数新版本客户端都用这个字段了不使用dwBetGold 

		public messageName(): string { return "CMD_ZJH_DO_BET";}
		public messageValue(): number { return CMD_ZJH_DO_BET;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			encodeBuffer.write(Uint32Array, this.dwObjectID);
			encodeBuffer.write(Uint8Array, this.bBetWay);
			encodeBuffer.write(Uint32Array, this.dwBetGold);
			encodeBuffer.write(Uint8Array, this.bRetCostGoldTimes);
			if (33<csproto.CSProto.Version) {
				encodeBuffer.write(Float64Array, this.newVerBetGold);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			this.dwObjectID = decodeBuffer.read(Uint32Array, 1);
			this.bBetWay = decodeBuffer.read(Uint8Array, 1);
			this.dwBetGold = decodeBuffer.read(Uint32Array, 1);
			this.bRetCostGoldTimes = decodeBuffer.read(Uint8Array, 1);
			if (33<csproto.CSProto.Version) {
				this.newVerBetGold = decodeBuffer.read(Float64Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class ZjhPlayerMatchRet implements message {
		public llBornID: number = 0;  //玩家ID 
		public wVipLevel: number = 0;  //VIP等级 
		public szName: string = "";  //字符串类型的名字 
		public bSex: number = 0;  //性别,目前不会用到 
		public bHeadPhoto: number = 0;  //系统头像,目前不会用到 
		public szSelfDefPhoto: string = "";  //玩家自定义头像,长度不为0时以此为准 
		public llWinGold: number = 0;  //玩家损益可正可负 
		public bFinalRet: number = 0;  //是否是胜利之类的枚举参见ZJH_PLAYER_MATCHRET_WIN等的定义 
		public astCardList: Array<number> = new Array<number>();  //手牌列表,char表示方式,若为空则代表不展示 

		public messageName(): string { return "ZjhPlayerMatchRet";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Float64Array, this.llBornID);
			encodeBuffer.write(Uint16Array, this.wVipLevel);
			encodeBuffer.writeString(this.szName, MAX_ROLE_NAME_LEN);
			encodeBuffer.write(Uint8Array, this.bSex);
			encodeBuffer.write(Uint8Array, this.bHeadPhoto);
			encodeBuffer.writeString(this.szSelfDefPhoto, MAX_ROLE_SELFDEF_PHOTO_LEN);
			encodeBuffer.write(Float64Array, this.llWinGold);
			encodeBuffer.write(Uint8Array, this.bFinalRet);
			var astCardListSize = this.astCardList.length > 3 ? 3 : this.astCardList.length;
			encodeBuffer.write(Uint16Array, astCardListSize);
			this.astCardList.length = astCardListSize;
			encodeBuffer.write(Uint8Array, this.astCardList);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.llBornID = decodeBuffer.read(Float64Array, 1);
			this.wVipLevel = decodeBuffer.read(Uint16Array, 1);
			this.szName = decodeBuffer.readString(MAX_ROLE_NAME_LEN);
			this.bSex = decodeBuffer.read(Uint8Array, 1);
			this.bHeadPhoto = decodeBuffer.read(Uint8Array, 1);
			this.szSelfDefPhoto = decodeBuffer.readString(MAX_ROLE_SELFDEF_PHOTO_LEN);
			this.llWinGold = decodeBuffer.read(Float64Array, 1);
			this.bFinalRet = decodeBuffer.read(Uint8Array, 1);
			var astCardListSize = decodeBuffer.read(Uint16Array, 1);
			this.astCardList = new Array<number>(astCardListSize);
			this.astCardList = decodeBuffer.read(Uint8Array, astCardListSize);
			return decodeBuffer.length();
		}
	}

	export class ZjhFinalMatchStat implements message {
		public astPlayerRetStat: Array<ZjhPlayerMatchRet> = new Array<ZjhPlayerMatchRet>();  //对应结算玩家数据列表 

		public messageName(): string { return "ZjhFinalMatchStat";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var astPlayerRetStatSize = this.astPlayerRetStat.length > 5 ? 5 : this.astPlayerRetStat.length;
			encodeBuffer.write(Uint16Array, astPlayerRetStatSize);
			this.astPlayerRetStat.length = astPlayerRetStatSize;
			for (var i = 0; i <  astPlayerRetStatSize; i++) {
				encodeBuffer.skip(this.astPlayerRetStat[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var astPlayerRetStatSize = decodeBuffer.read(Uint16Array, 1);
			this.astPlayerRetStat = new Array<ZjhPlayerMatchRet>(astPlayerRetStatSize);
			for (var i = 0; i <  astPlayerRetStatSize; i++) {
				this.astPlayerRetStat[i] = new ZjhPlayerMatchRet();
				decodeBuffer.skip(this.astPlayerRetStat[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_END_ONEGAME_SC implements message {
		public dwSceneID: number = 0;  //对应的场景ID,需要与玩家当前所在的sceneid一致才能处理,该id全游戏唯一 
		public stFinalMatchStat: ZjhFinalMatchStat = new ZjhFinalMatchStat();  //对应结算数据 

		public messageName(): string { return "CMD_ZJH_END_ONEGAME";}
		public messageValue(): number { return CMD_ZJH_END_ONEGAME;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			encodeBuffer.skip(this.stFinalMatchStat.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			decodeBuffer.skip(this.stFinalMatchStat.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_DO_COMPARE_CS implements message {
		public dwCmpOtherObjectID: number = 0;  //与哪个玩家比牌,对应实体handle 

		public messageName(): string { return "CMD_ZJH_DO_COMPARE";}
		public messageValue(): number { return CMD_ZJH_DO_COMPARE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwCmpOtherObjectID);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwCmpOtherObjectID = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_DO_COMPARE_SC implements message {
		public dwSceneID: number = 0;  //对应的场景ID,需要与玩家当前所在的sceneid一致才能处理,该id全游戏唯一 
		public bIfActObjectWin: number = 0;  //1代表主动方胜否则为失败方胜 
		public dwActObjectID: number = 0;  //对应发起比牌操作玩家的实体handle 
		public dwPasObjectID: number = 0;  //对应被动响应比牌操作玩家的实体handle 
		public dwRelateBaseBetGold: number = 0;  //对应的单注下注金币数 
		public bRetCostGoldTimes: number = 0;  //对应的最终下注倍数 

		public messageName(): string { return "CMD_ZJH_DO_COMPARE";}
		public messageValue(): number { return CMD_ZJH_DO_COMPARE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			encodeBuffer.write(Uint32Array, this.bIfActObjectWin);
			encodeBuffer.write(Uint32Array, this.dwActObjectID);
			encodeBuffer.write(Uint32Array, this.dwPasObjectID);
			encodeBuffer.write(Uint32Array, this.dwRelateBaseBetGold);
			encodeBuffer.write(Uint8Array, this.bRetCostGoldTimes);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			this.bIfActObjectWin = decodeBuffer.read(Uint32Array, 1);
			this.dwActObjectID = decodeBuffer.read(Uint32Array, 1);
			this.dwPasObjectID = decodeBuffer.read(Uint32Array, 1);
			this.dwRelateBaseBetGold = decodeBuffer.read(Uint32Array, 1);
			this.bRetCostGoldTimes = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_DO_DOUBLE_CS implements message {
		public bDoubleType: number = 0;  //对应翻倍方式参见ZJH_DOUBLETYPE_2等枚举 

		public messageName(): string { return "CMD_ZJH_DO_DOUBLE";}
		public messageValue(): number { return CMD_ZJH_DO_DOUBLE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bDoubleType);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bDoubleType = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_PLAYER_FIRSTROUNDINFO_SC implements message {
		public dwSceneID: number = 0;  //对应的场景ID,需要与玩家当前所在的sceneid一致才能处理,该id全游戏唯一 
		public llRoundTaxGold: number = 0;  //当局被扣了的相应金币税当该值不为零时才显示 

		public messageName(): string { return "CMD_ZJH_PLAYER_FIRSTROUNDINFO";}
		public messageValue(): number { return CMD_ZJH_PLAYER_FIRSTROUNDINFO;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			encodeBuffer.write(Float64Array, this.llRoundTaxGold);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			this.llRoundTaxGold = decodeBuffer.read(Float64Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_DO_KICKPLAYER_CS implements message {
		public llBeKickedRoleID: number = 0;  //被踢角色ID 
		public bNoNeedConfirm: number = 0;  //0需要先弹确认提示否则则在满足条件的情况下会直接踢人操作 

		public messageName(): string { return "CMD_ZJH_DO_KICKPLAYER";}
		public messageValue(): number { return CMD_ZJH_DO_KICKPLAYER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Float64Array, this.llBeKickedRoleID);
			encodeBuffer.write(Uint8Array, this.bNoNeedConfirm);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.llBeKickedRoleID = decodeBuffer.read(Float64Array, 1);
			this.bNoNeedConfirm = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_DO_KICKPLAYER_SC implements message {
		public bTipsType: number = 0;  //0弹出确认提示_1踢人成功_2弹出带商城按钮的框带上提示_其他值仅弹出带提示的确认框 
		public szContent: string = "";  //内容支持富文本并需要根据真实长度自动调整对话框大小 
		public llBeKickedRoleID: number = 0;  //被踢角色ID 

		public messageName(): string { return "CMD_ZJH_DO_KICKPLAYER";}
		public messageValue(): number { return CMD_ZJH_DO_KICKPLAYER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bTipsType);
			encodeBuffer.writeString(this.szContent, 4096);
			encodeBuffer.write(Float64Array, this.llBeKickedRoleID);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bTipsType = decodeBuffer.read(Uint8Array, 1);
			this.szContent = decodeBuffer.readString(4096);
			this.llBeKickedRoleID = decodeBuffer.read(Float64Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_CONLOGIN_GIFT_NEWVERSION_SC implements message {
		public bGetResult: number = 0;  //0成功1因为是受限制用户领取失败 

		public messageName(): string { return "CMD_GET_CONLOGIN_GIFT_NEWVERSION";}
		public messageValue(): number { return CMD_GET_CONLOGIN_GIFT_NEWVERSION;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bGetResult);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bGetResult = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_SHANXI_POINTS_EXCHANGE_CS implements message {
		public szPayCode: string = "";  //兑换商品编码 
		public szShanXiAcc: string = "";  //积分平台对应帐号 
		public szShanXiPwdMd5: string = "";  //积分平台对应密码的md5值 

		public messageName(): string { return "CMD_SHANXI_POINTS_EXCHANGE";}
		public messageValue(): number { return CMD_SHANXI_POINTS_EXCHANGE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szPayCode, MAX_PAY_PAYCODELEN);
			encodeBuffer.writeString(this.szShanXiAcc, 128);
			encodeBuffer.writeString(this.szShanXiPwdMd5, 64);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szPayCode = decodeBuffer.readString(MAX_PAY_PAYCODELEN);
			this.szShanXiAcc = decodeBuffer.readString(128);
			this.szShanXiPwdMd5 = decodeBuffer.readString(64);
			return decodeBuffer.length();
		}
	}

	export class CMD_SHANXI_POINTS_EXCHANGE_SC implements message {
		public bExchangeResult: number = 0;  //0成功其他失败 
		public szPayCode: string = "";  //兑换商品编码 
		public szShanXiAcc: string = "";  //积分平台对应帐号 
		public dwGotMoney: number = 0;  //兑换获得的金币数 

		public messageName(): string { return "CMD_SHANXI_POINTS_EXCHANGE";}
		public messageValue(): number { return CMD_SHANXI_POINTS_EXCHANGE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bExchangeResult);
			encodeBuffer.writeString(this.szPayCode, MAX_PAY_PAYCODELEN);
			encodeBuffer.writeString(this.szShanXiAcc, 128);
			encodeBuffer.write(Uint32Array, this.dwGotMoney);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bExchangeResult = decodeBuffer.read(Uint8Array, 1);
			this.szPayCode = decodeBuffer.readString(MAX_PAY_PAYCODELEN);
			this.szShanXiAcc = decodeBuffer.readString(128);
			this.dwGotMoney = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class BullBanker implements message {
		public dwObjectID: number = 0;  //实体handle（0表示系统坐庄） 
		public wLevel: number = 0;  //等级 
		public wVipLevel: number = 0;  //VIP等级 
		public szName: string = "";  //字符串类型的名字 
		public bSex: number = 0;  //性别,目前不会用到 
		public bHeadPhoto: number = 0;  //系统头像,目前不会用到 
		public bBankerLeftRound: number = 0;  //当前庄家剩余局数 
		public llOwnGold: number = 0;  //拥有的金币 
		public szSelfDefPhoto: string = "";  //玩家自定义头像,长度不为0时以此为准 

		public messageName(): string { return "BullBanker";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwObjectID);
			encodeBuffer.write(Uint16Array, this.wLevel);
			encodeBuffer.write(Uint16Array, this.wVipLevel);
			encodeBuffer.writeString(this.szName, MAX_ROLE_NAME_LEN);
			encodeBuffer.write(Uint8Array, this.bSex);
			encodeBuffer.write(Uint8Array, this.bHeadPhoto);
			encodeBuffer.write(Uint8Array, this.bBankerLeftRound);
			encodeBuffer.write(Float64Array, this.llOwnGold);
			encodeBuffer.writeString(this.szSelfDefPhoto, MAX_ROLE_SELFDEF_PHOTO_LEN);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwObjectID = decodeBuffer.read(Uint32Array, 1);
			this.wLevel = decodeBuffer.read(Uint16Array, 1);
			this.wVipLevel = decodeBuffer.read(Uint16Array, 1);
			this.szName = decodeBuffer.readString(MAX_ROLE_NAME_LEN);
			this.bSex = decodeBuffer.read(Uint8Array, 1);
			this.bHeadPhoto = decodeBuffer.read(Uint8Array, 1);
			this.bBankerLeftRound = decodeBuffer.read(Uint8Array, 1);
			this.llOwnGold = decodeBuffer.read(Float64Array, 1);
			this.szSelfDefPhoto = decodeBuffer.readString(MAX_ROLE_SELFDEF_PHOTO_LEN);
			return decodeBuffer.length();
		}
	}

	export class BullResult implements message {
		public abVal: Array<number> = new Array<number>();  //输赢，0输，非0赢，索引对应BULL_SEAT_EAST等枚举 

		public messageName(): string { return "BullResult";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var abValSize = this.abVal.length > BULL_SEAT_COUNT ? BULL_SEAT_COUNT : this.abVal.length;
			encodeBuffer.write(Uint16Array, abValSize);
			this.abVal.length = abValSize;
			encodeBuffer.write(Uint8Array, this.abVal);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var abValSize = decodeBuffer.read(Uint16Array, 1);
			this.abVal = new Array<number>(abValSize);
			this.abVal = decodeBuffer.read(Uint8Array, abValSize);
			return decodeBuffer.length();
		}
	}

	export class BullAllData implements message {
		public dwRoundID: number = 0;  //对应的相关转数序号,目前仅用于调试方便 
		public bTabStatus: number = 0;  //当前状态,参见BULL_SCENE_STATUS_IDLE等系列枚举 
		public wLeftBetTime: number = 0;  //当前对应剩余可下注秒数 
		public astHisResult: Array<BullResult> = new Array<BullResult>();  //历史结果以实际长度为准靠左边的为最新 
		public astBetDetail: Array<PROPERTY> = new Array<PROPERTY>();  //当前对应当转的各方具体下注列表,key对应BULL_SEAT_EAST等枚举 
		public stBankerInfo: BullBanker = new BullBanker();  //桌台当前的庄家信息 

		public messageName(): string { return "BullAllData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwRoundID);
			encodeBuffer.write(Uint8Array, this.bTabStatus);
			encodeBuffer.write(Uint8Array, this.wLeftBetTime);
			var astHisResultSize = this.astHisResult.length > MAX_BULL_SCENE_HISRESULT_LEN ? MAX_BULL_SCENE_HISRESULT_LEN : this.astHisResult.length;
			encodeBuffer.write(Uint16Array, astHisResultSize);
			this.astHisResult.length = astHisResultSize;
			for (var i = 0; i <  astHisResultSize; i++) {
				encodeBuffer.skip(this.astHisResult[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			var astBetDetailSize = this.astBetDetail.length > BULL_SEAT_BANKER ? BULL_SEAT_BANKER : this.astBetDetail.length;
			encodeBuffer.write(Uint16Array, astBetDetailSize);
			this.astBetDetail.length = astBetDetailSize;
			for (var i = 0; i <  astBetDetailSize; i++) {
				encodeBuffer.skip(this.astBetDetail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			encodeBuffer.skip(this.stBankerInfo.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			this.bTabStatus = decodeBuffer.read(Uint8Array, 1);
			this.wLeftBetTime = decodeBuffer.read(Uint8Array, 1);
			var astHisResultSize = decodeBuffer.read(Uint16Array, 1);
			this.astHisResult = new Array<BullResult>(astHisResultSize);
			for (var i = 0; i <  astHisResultSize; i++) {
				this.astHisResult[i] = new BullResult();
				decodeBuffer.skip(this.astHisResult[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			var astBetDetailSize = decodeBuffer.read(Uint16Array, 1);
			this.astBetDetail = new Array<PROPERTY>(astBetDetailSize);
			for (var i = 0; i <  astBetDetailSize; i++) {
				this.astBetDetail[i] = new PROPERTY();
				decodeBuffer.skip(this.astBetDetail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			decodeBuffer.skip(this.stBankerInfo.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_ENTERDATA_SC implements message {
		public wMapID: number = 0;  //对应地图ID,目前无用 
		public dwSceneID: number = 0;  //对应的场景ID 
		public dwTableID: number = 0;  //对应的桌台ID,目前无用 
		public stAllData: BullAllData = new BullAllData();  //对应当前数据 
		public dwBetTotalGold: number = 0;  //总下注币数 
		public astBetDetail: Array<PROPERTY> = new Array<PROPERTY>();  //自己当前对应当转的各方具体下注列表,key对应BULL_SEAT_EAST等枚举 
		public dwCurOnlineAcc: number = 0;  //当前对应在线人数 
		public bChipType: number = 0;  //玩家当前使用筹码, 参见BULL_CHIP_TYPE1等枚举 
		public bIfCanJoinPlay: number = 0;  //是否可参与该玩法:0不行 1可以 
		public cMyPos: number = 0;  //我的位置(从1开始)，若我没有申请上庄，则为-1 

		public messageName(): string { return "CMD_BULL_ENTERDATA";}
		public messageValue(): number { return CMD_BULL_ENTERDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wMapID);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			encodeBuffer.write(Uint32Array, this.dwTableID);
			encodeBuffer.skip(this.stAllData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.write(Uint32Array, this.dwBetTotalGold);
			var astBetDetailSize = this.astBetDetail.length > BULL_SEAT_BANKER ? BULL_SEAT_BANKER : this.astBetDetail.length;
			encodeBuffer.write(Uint16Array, astBetDetailSize);
			this.astBetDetail.length = astBetDetailSize;
			for (var i = 0; i <  astBetDetailSize; i++) {
				encodeBuffer.skip(this.astBetDetail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			encodeBuffer.write(Uint32Array, this.dwCurOnlineAcc);
			encodeBuffer.write(Uint8Array, this.bChipType);
			encodeBuffer.write(Uint8Array, this.bIfCanJoinPlay);
			encodeBuffer.write(Int8Array, this.cMyPos);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wMapID = decodeBuffer.read(Uint16Array, 1);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			this.dwTableID = decodeBuffer.read(Uint32Array, 1);
			decodeBuffer.skip(this.stAllData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			this.dwBetTotalGold = decodeBuffer.read(Uint32Array, 1);
			var astBetDetailSize = decodeBuffer.read(Uint16Array, 1);
			this.astBetDetail = new Array<PROPERTY>(astBetDetailSize);
			for (var i = 0; i <  astBetDetailSize; i++) {
				this.astBetDetail[i] = new PROPERTY();
				decodeBuffer.skip(this.astBetDetail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			this.dwCurOnlineAcc = decodeBuffer.read(Uint32Array, 1);
			this.bChipType = decodeBuffer.read(Uint8Array, 1);
			this.bIfCanJoinPlay = decodeBuffer.read(Uint8Array, 1);
			this.cMyPos = decodeBuffer.read(Int8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class BullRoundBankerSwitch implements message {
		public bSwitchType: number = 0;  //庄家变更状态,参见CLASSFRUIT_BANKER_SWITCHTYPE_ONE_STILL等系列枚举 
		public bIsBankerRupt: number = 0;  //庄家下庄时是否爆庄 
		public bIsOffBankerSelf: number = 0;  //该协议收到者是否是下庄庄家自己 
		public llBankerTotalGods: number = 0;  //坐庄期间总共输赢金币 

		public messageName(): string { return "BullRoundBankerSwitch";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bSwitchType);
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				encodeBuffer.write(Uint8Array, this.bIsBankerRupt);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				encodeBuffer.write(Uint8Array, this.bIsOffBankerSelf);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				encodeBuffer.write(Float64Array, this.llBankerTotalGods);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bSwitchType = decodeBuffer.read(Uint8Array, 1);
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				this.bIsBankerRupt = decodeBuffer.read(Uint8Array, 1);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				this.bIsOffBankerSelf = decodeBuffer.read(Uint8Array, 1);
			}
			if (CLASSFRUIT_BANKER_SWITCHTYPE_TO_NONE==this.bSwitchType||CLASSFRUIT_BANKER_SWITCHTYPE_CHANGEONE==this.bSwitchType) {
				this.llBankerTotalGods = decodeBuffer.read(Float64Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_ROUND_END_SC implements message {
		public stNewstData: BullAllData = new BullAllData();  //对应开奖后的转轮数据,序号及奖池数据等所有数据己刷新为发奖后的最新数据 
		public adCards: Array<number> = new Array<number>();  //本局的牌（索引 % 5 = BULL_SEAT_EAST等枚举代表位置的牌） 
		public abCardsType: Array<number> = new Array<number>();  //本局各方的牌型，索引对应BULL_SEAT_EAST等枚举，值为BULL_CARDS_TYPE_NONE等枚举 
		public astCurResult: Array<PROPERTY> = new Array<PROPERTY>();  //本局四方输赢结果, key为倍数，value为值 
		public llBankerGotGold: number = 0;  //庄家输赢结果 
		public llGotBaseGold: number = 0;  //本局自己获得基本金币数 
		public llSysCostGold: number = 0;  //若本局自己赢钱的系统抽水 
		public stBankerSwitchInfo: BullRoundBankerSwitch = new BullRoundBankerSwitch();  //庄家变更相关描述数据 
		public iBankerQueuePos: number = 0;  //当在排庄队列中时代表当前位置 
		public dwMaxWinerObjectID: number = 0;  //大赢家，0表示没有 
		public szMaxWinnerPhoto: string = "";  //玩家自定义头像,长度不为0时以此为准 
		public szMaxWinnerName: string = "";  //字符串类型的名字 
		public llMaxWinnerGolds: number = 0;  //本局大赢家赢了多少 
		public wMaxWinnerVipLv: number = 0;  //本局大赢家VIP等级 

		public messageName(): string { return "CMD_BULL_ROUND_END";}
		public messageValue(): number { return CMD_BULL_ROUND_END;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.skip(this.stNewstData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			var adCardsSize = this.adCards.length > BULL_SEAT_COUNT * BULL_PER_SEAT_CARDS_NUMBER ? BULL_SEAT_COUNT * BULL_PER_SEAT_CARDS_NUMBER : this.adCards.length;
			encodeBuffer.write(Uint16Array, adCardsSize);
			this.adCards.length = adCardsSize;
			encodeBuffer.write(Uint8Array, this.adCards);
			var abCardsTypeSize = this.abCardsType.length > BULL_SEAT_COUNT ? BULL_SEAT_COUNT : this.abCardsType.length;
			encodeBuffer.write(Uint16Array, abCardsTypeSize);
			this.abCardsType.length = abCardsTypeSize;
			encodeBuffer.write(Uint8Array, this.abCardsType);
			var astCurResultSize = this.astCurResult.length > BULL_SEAT_BANKER ? BULL_SEAT_BANKER : this.astCurResult.length;
			encodeBuffer.write(Uint16Array, astCurResultSize);
			this.astCurResult.length = astCurResultSize;
			for (var i = 0; i <  astCurResultSize; i++) {
				encodeBuffer.skip(this.astCurResult[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			encodeBuffer.write(Float64Array, this.llBankerGotGold);
			encodeBuffer.write(Float64Array, this.llGotBaseGold);
			encodeBuffer.write(Float64Array, this.llSysCostGold);
			encodeBuffer.skip(this.stBankerSwitchInfo.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.write(Int32Array, this.iBankerQueuePos);
			encodeBuffer.write(Uint32Array, this.dwMaxWinerObjectID);
			encodeBuffer.writeString(this.szMaxWinnerPhoto, MAX_ROLE_SELFDEF_PHOTO_LEN);
			encodeBuffer.writeString(this.szMaxWinnerName, MAX_ROLE_NAME_LEN);
			encodeBuffer.write(Float64Array, this.llMaxWinnerGolds);
			encodeBuffer.write(Uint16Array, this.wMaxWinnerVipLv);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			decodeBuffer.skip(this.stNewstData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			var adCardsSize = decodeBuffer.read(Uint16Array, 1);
			this.adCards = new Array<number>(adCardsSize);
			this.adCards = decodeBuffer.read(Uint8Array, adCardsSize);
			var abCardsTypeSize = decodeBuffer.read(Uint16Array, 1);
			this.abCardsType = new Array<number>(abCardsTypeSize);
			this.abCardsType = decodeBuffer.read(Uint8Array, abCardsTypeSize);
			var astCurResultSize = decodeBuffer.read(Uint16Array, 1);
			this.astCurResult = new Array<PROPERTY>(astCurResultSize);
			for (var i = 0; i <  astCurResultSize; i++) {
				this.astCurResult[i] = new PROPERTY();
				decodeBuffer.skip(this.astCurResult[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			this.llBankerGotGold = decodeBuffer.read(Float64Array, 1);
			this.llGotBaseGold = decodeBuffer.read(Float64Array, 1);
			this.llSysCostGold = decodeBuffer.read(Float64Array, 1);
			decodeBuffer.skip(this.stBankerSwitchInfo.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			this.iBankerQueuePos = decodeBuffer.read(Int32Array, 1);
			this.dwMaxWinerObjectID = decodeBuffer.read(Uint32Array, 1);
			this.szMaxWinnerPhoto = decodeBuffer.readString(MAX_ROLE_SELFDEF_PHOTO_LEN);
			this.szMaxWinnerName = decodeBuffer.readString(MAX_ROLE_NAME_LEN);
			this.llMaxWinnerGolds = decodeBuffer.read(Float64Array, 1);
			this.wMaxWinnerVipLv = decodeBuffer.read(Uint16Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_CURBANKERLIST_SC implements message {
		public astBankerList: Array<BullBanker> = new Array<BullBanker>();  //当前排队中的庄家列表 
		public cMyPos: number = 0;  //我的位置(从1开始)，若我没有申请上庄，则为-1 

		public messageName(): string { return "CMD_BULL_CURBANKERLIST";}
		public messageValue(): number { return CMD_BULL_CURBANKERLIST;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var astBankerListSize = this.astBankerList.length > 10 ? 10 : this.astBankerList.length;
			encodeBuffer.write(Uint16Array, astBankerListSize);
			this.astBankerList.length = astBankerListSize;
			for (var i = 0; i <  astBankerListSize; i++) {
				encodeBuffer.skip(this.astBankerList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			encodeBuffer.write(Int8Array, this.cMyPos);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var astBankerListSize = decodeBuffer.read(Uint16Array, 1);
			this.astBankerList = new Array<BullBanker>(astBankerListSize);
			for (var i = 0; i <  astBankerListSize; i++) {
				this.astBankerList[i] = new BullBanker();
				decodeBuffer.skip(this.astBankerList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			this.cMyPos = decodeBuffer.read(Int8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_UPDATE_CURBANKER_SC implements message {
		public bIsHasBanker: number = 0;  //为0无庄家,其他则有庄家 
		public stBankerInfo: BullBanker = new BullBanker();  //桌台当前的庄家信息 

		public messageName(): string { return "CMD_BULL_UPDATE_CURBANKER";}
		public messageValue(): number { return CMD_BULL_UPDATE_CURBANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bIsHasBanker);
			if (0!=this.bIsHasBanker) {
				encodeBuffer.skip(this.stBankerInfo.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bIsHasBanker = decodeBuffer.read(Uint8Array, 1);
			if (0!=this.bIsHasBanker) {
				decodeBuffer.skip(this.stBankerInfo.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_BET_ON_CS implements message {
		public astBetDetail: Array<PROPERTY> = new Array<PROPERTY>();  //下注列表 
		public bChipType: number = 0;  //玩家当前使用筹码, 参见BULL_CHIP_TYPE1等枚举 
		public dwRoundID: number = 0;  //对应的相关转数序号 

		public messageName(): string { return "CMD_BULL_BET_ON";}
		public messageValue(): number { return CMD_BULL_BET_ON;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var astBetDetailSize = this.astBetDetail.length > BULL_SEAT_BANKER ? BULL_SEAT_BANKER : this.astBetDetail.length;
			encodeBuffer.write(Uint16Array, astBetDetailSize);
			this.astBetDetail.length = astBetDetailSize;
			for (var i = 0; i <  astBetDetailSize; i++) {
				encodeBuffer.skip(this.astBetDetail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			encodeBuffer.write(Uint8Array, this.bChipType);
			encodeBuffer.write(Uint32Array, this.dwRoundID);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var astBetDetailSize = decodeBuffer.read(Uint16Array, 1);
			this.astBetDetail = new Array<PROPERTY>(astBetDetailSize);
			for (var i = 0; i <  astBetDetailSize; i++) {
				this.astBetDetail[i] = new PROPERTY();
				decodeBuffer.skip(this.astBetDetail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			this.bChipType = decodeBuffer.read(Uint8Array, 1);
			this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_BET_ON_SC implements message {
		public dwRoundID: number = 0;  //对应的相关转数序号,目前仅用于调试方便 
		public bChipType: number = 0;  //玩家当前使用筹码, 参见BULL_CHIP_TYPE1等枚举 
		public astBetDetail: Array<PROPERTY> = new Array<PROPERTY>();  //下注列表 
		public dwBetTotalGold: number = 0;  //总下注币数 

		public messageName(): string { return "CMD_BULL_BET_ON";}
		public messageValue(): number { return CMD_BULL_BET_ON;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwRoundID);
			encodeBuffer.write(Uint8Array, this.bChipType);
			var astBetDetailSize = this.astBetDetail.length > BULL_SEAT_BANKER ? BULL_SEAT_BANKER : this.astBetDetail.length;
			encodeBuffer.write(Uint16Array, astBetDetailSize);
			this.astBetDetail.length = astBetDetailSize;
			for (var i = 0; i <  astBetDetailSize; i++) {
				encodeBuffer.skip(this.astBetDetail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			encodeBuffer.write(Uint32Array, this.dwBetTotalGold);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			this.bChipType = decodeBuffer.read(Uint8Array, 1);
			var astBetDetailSize = decodeBuffer.read(Uint16Array, 1);
			this.astBetDetail = new Array<PROPERTY>(astBetDetailSize);
			for (var i = 0; i <  astBetDetailSize; i++) {
				this.astBetDetail[i] = new PROPERTY();
				decodeBuffer.skip(this.astBetDetail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			this.dwBetTotalGold = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_SIGNUP_BANKER_SC implements message {
		public wQueuePos: number = 0;  //在队列中的位置 
		public bPlayerBankerStat: number = 0;  //玩家的庄家状态 
		public szSuccTips: string = "";  //上庄成功相关的提示 

		public messageName(): string { return "CMD_BULL_SIGNUP_BANKER";}
		public messageValue(): number { return CMD_BULL_SIGNUP_BANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wQueuePos);
			encodeBuffer.write(Uint8Array, this.bPlayerBankerStat);
			encodeBuffer.writeString(this.szSuccTips, 256);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wQueuePos = decodeBuffer.read(Uint16Array, 1);
			this.bPlayerBankerStat = decodeBuffer.read(Uint8Array, 1);
			this.szSuccTips = decodeBuffer.readString(256);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_QUIT_BANKER_SC implements message {
		public bPlayerBankerStat: number = 0;  //玩家的庄家状态 

		public messageName(): string { return "CMD_BULL_QUIT_BANKER";}
		public messageValue(): number { return CMD_BULL_QUIT_BANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bPlayerBankerStat);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bPlayerBankerStat = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_REFRESHDATA_SC implements message {
		public bTabStatus: number = 0;  //当前状态,参见BULL_SCENE_STATUS_IDLE等系列枚举 
		public astBetDetail: Array<PROPERTY> = new Array<PROPERTY>();  //当前对应当转的各方具体下注列表,key对应BULL_SEAT_EAST等枚举 
		public dwCurOnlineAcc: number = 0;  //当前对应在线人数 
		public dwRoundID: number = 0;  //对应的相关转数序号 

		public messageName(): string { return "CMD_BULL_REFRESHDATA";}
		public messageValue(): number { return CMD_BULL_REFRESHDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bTabStatus);
			var astBetDetailSize = this.astBetDetail.length > BULL_SEAT_BANKER ? BULL_SEAT_BANKER : this.astBetDetail.length;
			encodeBuffer.write(Uint16Array, astBetDetailSize);
			this.astBetDetail.length = astBetDetailSize;
			for (var i = 0; i <  astBetDetailSize; i++) {
				encodeBuffer.skip(this.astBetDetail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			encodeBuffer.write(Uint32Array, this.dwCurOnlineAcc);
			encodeBuffer.write(Uint32Array, this.dwRoundID);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bTabStatus = decodeBuffer.read(Uint8Array, 1);
			var astBetDetailSize = decodeBuffer.read(Uint16Array, 1);
			this.astBetDetail = new Array<PROPERTY>(astBetDetailSize);
			for (var i = 0; i <  astBetDetailSize; i++) {
				this.astBetDetail[i] = new PROPERTY();
				decodeBuffer.skip(this.astBetDetail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			this.dwCurOnlineAcc = decodeBuffer.read(Uint32Array, 1);
			this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_BIGWINNERRANK_SC implements message {
		public astRankList: Array<OneRankData> = new Array<OneRankData>();  //牛牛场排行列表 

		public messageName(): string { return "CMD_BULL_BIGWINNERRANK";}
		public messageValue(): number { return CMD_BULL_BIGWINNERRANK;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var astRankListSize = this.astRankList.length > MAX_BULL_BIGWINNER_RANK_LIST_SIZE ? MAX_BULL_BIGWINNER_RANK_LIST_SIZE : this.astRankList.length;
			encodeBuffer.write(Uint16Array, astRankListSize);
			this.astRankList.length = astRankListSize;
			for (var i = 0; i <  astRankListSize; i++) {
				encodeBuffer.skip(this.astRankList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var astRankListSize = decodeBuffer.read(Uint16Array, 1);
			this.astRankList = new Array<OneRankData>(astRankListSize);
			for (var i = 0; i <  astRankListSize; i++) {
				this.astRankList[i] = new OneRankData();
				decodeBuffer.skip(this.astRankList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_UPDATE_BANKER_STAT_SC implements message {
		public bPlayerBankerStat: number = 0;  //玩家的庄家状态 
		public wQueuePos: number = 0;  //在队列中的位置 

		public messageName(): string { return "CMD_BULL_UPDATE_BANKER_STAT";}
		public messageValue(): number { return CMD_BULL_UPDATE_BANKER_STAT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bPlayerBankerStat);
			encodeBuffer.write(Uint16Array, this.wQueuePos);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bPlayerBankerStat = decodeBuffer.read(Uint8Array, 1);
			this.wQueuePos = decodeBuffer.read(Uint16Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_ROUND_START_SC implements message {
		public dwRoundID: number = 0;  //对应的相关转数序号,目前仅用于调试方便 
		public bTabStatus: number = 0;  //当前状态,参见BULL_SCENE_STATUS_IDLE等系列枚举 
		public wLeftBetTime: number = 0;  //当前对应剩余可下注秒数 

		public messageName(): string { return "CMD_BULL_ROUND_START";}
		public messageValue(): number { return CMD_BULL_ROUND_START;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwRoundID);
			encodeBuffer.write(Uint8Array, this.bTabStatus);
			encodeBuffer.write(Uint8Array, this.wLeftBetTime);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			this.bTabStatus = decodeBuffer.read(Uint8Array, 1);
			this.wLeftBetTime = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_REFRESH_SELF_BET_SC implements message {
		public dwBetTotalGold: number = 0;  //总下注币数 
		public astBetDetail: Array<PROPERTY> = new Array<PROPERTY>();  //当前对应当转的己下注列表,若已经下注则有数据 
		public dwRoundID: number = 0;  //对应的相关转数序号 

		public messageName(): string { return "CMD_BULL_REFRESH_SELF_BET";}
		public messageValue(): number { return CMD_BULL_REFRESH_SELF_BET;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwBetTotalGold);
			var astBetDetailSize = this.astBetDetail.length > BULL_SEAT_BANKER ? BULL_SEAT_BANKER : this.astBetDetail.length;
			encodeBuffer.write(Uint16Array, astBetDetailSize);
			this.astBetDetail.length = astBetDetailSize;
			for (var i = 0; i <  astBetDetailSize; i++) {
				encodeBuffer.skip(this.astBetDetail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			encodeBuffer.write(Uint32Array, this.dwRoundID);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwBetTotalGold = decodeBuffer.read(Uint32Array, 1);
			var astBetDetailSize = decodeBuffer.read(Uint16Array, 1);
			this.astBetDetail = new Array<PROPERTY>(astBetDetailSize);
			for (var i = 0; i <  astBetDetailSize; i++) {
				this.astBetDetail[i] = new PROPERTY();
				decodeBuffer.skip(this.astBetDetail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			this.dwRoundID = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class OptionPara implements message {
		public dwParaKey: number = 0;  //参数key的定义参见OPTION_PARA_KEY_SVR_NOTIFYURL等的定义 
		public szParaVal: string = "";  //可选参数的value 

		public messageName(): string { return "OptionPara";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwParaKey);
			encodeBuffer.writeString(this.szParaVal, 3072);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwParaKey = decodeBuffer.read(Uint32Array, 1);
			this.szParaVal = decodeBuffer.readString(3072);
			return decodeBuffer.length();
		}
	}

	export class CMD_PAYCENTER_GEN_ORDER_CS implements message {
		public dwChargePlatform: number = 0;  //支付平台类型参见CHARGE_PLATFORM_PAYCENTER_MM等定义 
		public szAppID: string = "";  //相应的应用ID 
		public dwInnerGoodsID: number = 0;  //游戏内部支付商品ID 
		public szPayViewChannel: string = "";  //支付来源于哪个显示UI 
		public astOptionPara: Array<OptionPara> = new Array<OptionPara>();  //可选参数列表 

		public messageName(): string { return "CMD_PAYCENTER_GEN_ORDER";}
		public messageValue(): number { return CMD_PAYCENTER_GEN_ORDER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwChargePlatform);
			encodeBuffer.writeString(this.szAppID, 512);
			encodeBuffer.write(Uint32Array, this.dwInnerGoodsID);
			encodeBuffer.writeString(this.szPayViewChannel, MAX_PAY_VIEWCHANNEL_LEN);
			var astOptionParaSize = this.astOptionPara.length > 10 ? 10 : this.astOptionPara.length;
			encodeBuffer.write(Uint16Array, astOptionParaSize);
			this.astOptionPara.length = astOptionParaSize;
			for (var i = 0; i <  astOptionParaSize; i++) {
				encodeBuffer.skip(this.astOptionPara[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwChargePlatform = decodeBuffer.read(Uint32Array, 1);
			this.szAppID = decodeBuffer.readString(512);
			this.dwInnerGoodsID = decodeBuffer.read(Uint32Array, 1);
			this.szPayViewChannel = decodeBuffer.readString(MAX_PAY_VIEWCHANNEL_LEN);
			var astOptionParaSize = decodeBuffer.read(Uint16Array, 1);
			this.astOptionPara = new Array<OptionPara>(astOptionParaSize);
			for (var i = 0; i <  astOptionParaSize; i++) {
				this.astOptionPara[i] = new OptionPara();
				decodeBuffer.skip(this.astOptionPara[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_PAYCENTER_GEN_ORDER_SC implements message {
		public dwChargePlatform: number = 0;  //支付平台类型参见CHARGE_PLATFORM_HAIMA等定义 
		public szAppID: string = "";  //appid,这个是直接将上行的appid返回,真实的第三方平台里配置的appid通过可选参数下行 
		public szPayCode: string = "";  //支付编码 
		public szInnerOrderID: string = "";  //游戏内部订单编号 
		public szPrivateInfo: string = "";  //客户端发起支付时传递的私有信息 
		public astOptionPara: Array<OptionPara> = new Array<OptionPara>();  //可选参数列表 
		public dwInnerGoodsID: number = 0;  //游戏内部支付商品ID 
		public dwCostCurrencyFen: number = 0;  //单位是分配置的paycode对应的消费金额单位是分 
		public bGenOrderRet: number = 0;  //0成功其他失败具体的错误原因可能通过错误提示下发 

		public messageName(): string { return "CMD_PAYCENTER_GEN_ORDER";}
		public messageValue(): number { return CMD_PAYCENTER_GEN_ORDER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwChargePlatform);
			encodeBuffer.writeString(this.szAppID, 512);
			encodeBuffer.writeString(this.szPayCode, MAX_PAY_PAYCODELEN);
			encodeBuffer.writeString(this.szInnerOrderID, MAX_PAY_COMM_SELFORDER_LEN);
			encodeBuffer.writeString(this.szPrivateInfo, MAX_PAY_COMM_PRIVATEINFO_LEN);
			var astOptionParaSize = this.astOptionPara.length > 10 ? 10 : this.astOptionPara.length;
			encodeBuffer.write(Uint16Array, astOptionParaSize);
			this.astOptionPara.length = astOptionParaSize;
			for (var i = 0; i <  astOptionParaSize; i++) {
				encodeBuffer.skip(this.astOptionPara[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			encodeBuffer.write(Uint32Array, this.dwInnerGoodsID);
			encodeBuffer.write(Uint32Array, this.dwCostCurrencyFen);
			if (23<csproto.CSProto.Version) {
				encodeBuffer.write(Uint8Array, this.bGenOrderRet);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwChargePlatform = decodeBuffer.read(Uint32Array, 1);
			this.szAppID = decodeBuffer.readString(512);
			this.szPayCode = decodeBuffer.readString(MAX_PAY_PAYCODELEN);
			this.szInnerOrderID = decodeBuffer.readString(MAX_PAY_COMM_SELFORDER_LEN);
			this.szPrivateInfo = decodeBuffer.readString(MAX_PAY_COMM_PRIVATEINFO_LEN);
			var astOptionParaSize = decodeBuffer.read(Uint16Array, 1);
			this.astOptionPara = new Array<OptionPara>(astOptionParaSize);
			for (var i = 0; i <  astOptionParaSize; i++) {
				this.astOptionPara[i] = new OptionPara();
				decodeBuffer.skip(this.astOptionPara[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			this.dwInnerGoodsID = decodeBuffer.read(Uint32Array, 1);
			this.dwCostCurrencyFen = decodeBuffer.read(Uint32Array, 1);
			if (23<csproto.CSProto.Version) {
				this.bGenOrderRet = decodeBuffer.read(Uint8Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_HIDDEN_CHARGE_PLATFORM_SC implements message {
		public adwChargePlatforms: Array<number> = new Array<number>();  //支付平台数组，对应CHARGE_PLATFORM_WEIPAI等值 

		public messageName(): string { return "CMD_HIDDEN_CHARGE_PLATFORM";}
		public messageValue(): number { return CMD_HIDDEN_CHARGE_PLATFORM;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var adwChargePlatformsSize = this.adwChargePlatforms.length > 256 ? 256 : this.adwChargePlatforms.length;
			encodeBuffer.write(Uint16Array, adwChargePlatformsSize);
			this.adwChargePlatforms.length = adwChargePlatformsSize;
			encodeBuffer.write(Uint32Array, this.adwChargePlatforms);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var adwChargePlatformsSize = decodeBuffer.read(Uint16Array, 1);
			this.adwChargePlatforms = new Array<number>(adwChargePlatformsSize);
			this.adwChargePlatforms = decodeBuffer.read(Uint32Array, adwChargePlatformsSize);
			return decodeBuffer.length();
		}
	}

	export class CMD_PAYCENTER_NOTIFY_SERVER_SUCC_CS implements message {
		public dwChargePlatform: number = 0;  //支付平台类型参见CHARGE_PLATFORM_HAIMA等定义 
		public szAppID: string = "";  //appid 
		public dwInnerGoodsID: number = 0;  //游戏内部支付商品ID 
		public szOuterOrderID: string = "";  //第三方支付平台生成的外部订单号若没有则统一填充内部订单号 
		public szInnerOrderID: string = "";  //游戏内部订单编号 

		public messageName(): string { return "CMD_PAYCENTER_NOTIFY_SERVER_SUCC";}
		public messageValue(): number { return CMD_PAYCENTER_NOTIFY_SERVER_SUCC;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwChargePlatform);
			encodeBuffer.writeString(this.szAppID, 512);
			encodeBuffer.write(Uint32Array, this.dwInnerGoodsID);
			encodeBuffer.writeString(this.szOuterOrderID, 512);
			encodeBuffer.writeString(this.szInnerOrderID, MAX_PAY_COMM_SELFORDER_LEN);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwChargePlatform = decodeBuffer.read(Uint32Array, 1);
			this.szAppID = decodeBuffer.readString(512);
			this.dwInnerGoodsID = decodeBuffer.read(Uint32Array, 1);
			this.szOuterOrderID = decodeBuffer.readString(512);
			this.szInnerOrderID = decodeBuffer.readString(MAX_PAY_COMM_SELFORDER_LEN);
			return decodeBuffer.length();
		}
	}

	export class CMD_PAYCENTER_NOTIFY_CLIENT_SUCC_SC implements message {
		public szOuterOrderID: string = "";  //第三方支付平台生成的外部订单号若没有则统一填充内部订单号 
		public szInnerOrderID: string = "";  //返回的游戏内部订单编号 
		public bGotMoneyType: number = 0;  //获得的游戏内货币类型参见MONEY_TYPE_GOLD等枚举 
		public dwBaseGotMoney: number = 0;  //购买获得的基础货币 
		public dwDayFirstGotMoney: number = 0;  //今日首充 
		public dwVipExtraGotMoney: number = 0;  //VIP赠送 
		public dwCurChargeRank: number = 0;  //当前充值榜排名,为0时不在排行榜上 
		public llTomorrowRankAward: number = 0;  //预计明日充值榜排名奖励 
		public llAllTotalGotMoney: number = 0;  //总充值获得货币 
		public dwCostCurrencyFen: number = 0;  //单位是分玩家真实花费的人民币目前仅当预付卡充值时会发生与paycode不一致的情况 

		public messageName(): string { return "CMD_PAYCENTER_NOTIFY_CLIENT_SUCC";}
		public messageValue(): number { return CMD_PAYCENTER_NOTIFY_CLIENT_SUCC;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szOuterOrderID, 512);
			encodeBuffer.writeString(this.szInnerOrderID, MAX_PAY_COMM_SELFORDER_LEN);
			encodeBuffer.write(Uint8Array, this.bGotMoneyType);
			encodeBuffer.write(Uint32Array, this.dwBaseGotMoney);
			encodeBuffer.write(Uint32Array, this.dwDayFirstGotMoney);
			encodeBuffer.write(Uint32Array, this.dwVipExtraGotMoney);
			encodeBuffer.write(Uint32Array, this.dwCurChargeRank);
			encodeBuffer.write(Float64Array, this.llTomorrowRankAward);
			encodeBuffer.write(Float64Array, this.llAllTotalGotMoney);
			if (21<csproto.CSProto.Version) {
				encodeBuffer.write(Uint32Array, this.dwCostCurrencyFen);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szOuterOrderID = decodeBuffer.readString(512);
			this.szInnerOrderID = decodeBuffer.readString(MAX_PAY_COMM_SELFORDER_LEN);
			this.bGotMoneyType = decodeBuffer.read(Uint8Array, 1);
			this.dwBaseGotMoney = decodeBuffer.read(Uint32Array, 1);
			this.dwDayFirstGotMoney = decodeBuffer.read(Uint32Array, 1);
			this.dwVipExtraGotMoney = decodeBuffer.read(Uint32Array, 1);
			this.dwCurChargeRank = decodeBuffer.read(Uint32Array, 1);
			this.llTomorrowRankAward = decodeBuffer.read(Float64Array, 1);
			this.llAllTotalGotMoney = decodeBuffer.read(Float64Array, 1);
			if (21<csproto.CSProto.Version) {
				this.dwCostCurrencyFen = decodeBuffer.read(Uint32Array, 1);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_PAYCENTER_PREPAID_CARD_DOPAY_CS implements message {
		public bPrepayCardType: number = 0;  //进行支付的卡类型参见PREPAID_CARD_TYPE_CHINAMOBILE_COMMON等枚举 
		public dwSelectCardValFen: number = 0;  //选择的卡面额单位是分 
		public szCardNum: string = "";  //卡号加密后上传 
		public szCardPwd: string = "";  //卡密码加密后上传 
		public szInnerOrderID: string = "";  //游戏内部订单编号 
		public dwInnerGoodsID: number = 0;  //游戏内部支付商品ID 
		public szPrivateInfo: string = "";  //客户端发起支付时传递的私有信息 

		public messageName(): string { return "CMD_PAYCENTER_PREPAID_CARD_DOPAY";}
		public messageValue(): number { return CMD_PAYCENTER_PREPAID_CARD_DOPAY;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bPrepayCardType);
			encodeBuffer.write(Uint32Array, this.dwSelectCardValFen);
			encodeBuffer.writeString(this.szCardNum, 128);
			encodeBuffer.writeString(this.szCardPwd, 128);
			encodeBuffer.writeString(this.szInnerOrderID, MAX_PAY_COMM_SELFORDER_LEN);
			encodeBuffer.write(Uint32Array, this.dwInnerGoodsID);
			encodeBuffer.writeString(this.szPrivateInfo, MAX_PAY_COMM_PRIVATEINFO_LEN);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bPrepayCardType = decodeBuffer.read(Uint8Array, 1);
			this.dwSelectCardValFen = decodeBuffer.read(Uint32Array, 1);
			this.szCardNum = decodeBuffer.readString(128);
			this.szCardPwd = decodeBuffer.readString(128);
			this.szInnerOrderID = decodeBuffer.readString(MAX_PAY_COMM_SELFORDER_LEN);
			this.dwInnerGoodsID = decodeBuffer.read(Uint32Array, 1);
			this.szPrivateInfo = decodeBuffer.readString(MAX_PAY_COMM_PRIVATEINFO_LEN);
			return decodeBuffer.length();
		}
	}

	export class CMD_PAYCENTER_PREPAID_CARD_DOPAY_SC implements message {
		public bDoPayResult: number = 0;  //0成功其他失败具体的错误原因可能通过错误提示下发 

		public messageName(): string { return "CMD_PAYCENTER_PREPAID_CARD_DOPAY";}
		public messageValue(): number { return CMD_PAYCENTER_PREPAID_CARD_DOPAY;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bDoPayResult);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bDoPayResult = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_APPSTORE_PAYRECEPIT_VERIFY_CS implements message {
		public szInnerOrderID: string = "";  //游戏内部订单编号 
		public dwInnerGoodsID: number = 0;  //游戏内部支付商品ID 
		public szPrivateInfo: string = "";  //客户端发起支付时传递的私有信息 
		public szReceiptData: string = "";  //支付成功返回的receipt数据 
		public szAppID: string = "";  //相应的应用ID 

		public messageName(): string { return "CMD_APPSTORE_PAYRECEPIT_VERIFY";}
		public messageValue(): number { return CMD_APPSTORE_PAYRECEPIT_VERIFY;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szInnerOrderID, MAX_PAY_COMM_SELFORDER_LEN);
			encodeBuffer.write(Uint32Array, this.dwInnerGoodsID);
			encodeBuffer.writeString(this.szPrivateInfo, MAX_PAY_COMM_PRIVATEINFO_LEN);
			encodeBuffer.writeString(this.szReceiptData, 4096);
			if (26<csproto.CSProto.Version) {
				encodeBuffer.writeString(this.szAppID, 512);
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szInnerOrderID = decodeBuffer.readString(MAX_PAY_COMM_SELFORDER_LEN);
			this.dwInnerGoodsID = decodeBuffer.read(Uint32Array, 1);
			this.szPrivateInfo = decodeBuffer.readString(MAX_PAY_COMM_PRIVATEINFO_LEN);
			this.szReceiptData = decodeBuffer.readString(4096);
			if (26<csproto.CSProto.Version) {
				this.szAppID = decodeBuffer.readString(512);
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_APPSTORE_PAYRECEPIT_VERIFY_SC implements message {
		public szInnerOrderID: string = "";  //游戏内部订单编号 
		public bDoVerifyResult: number = 0;  //0成功其他失败具体的错误原因可能通过错误提示下发 

		public messageName(): string { return "CMD_APPSTORE_PAYRECEPIT_VERIFY";}
		public messageValue(): number { return CMD_APPSTORE_PAYRECEPIT_VERIFY;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szInnerOrderID, MAX_PAY_COMM_SELFORDER_LEN);
			encodeBuffer.write(Uint8Array, this.bDoVerifyResult);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szInnerOrderID = decodeBuffer.readString(MAX_PAY_COMM_SELFORDER_LEN);
			this.bDoVerifyResult = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class MineHeap implements message {
		public dwIndexTag: number = 0;  //矿堆索引标记值单局游戏内的唯一随机值 
		public bMineHeapType: number = 0;  //区分金矿还是宝石参见GOLDMINE_HEAPTYPE_GOLD等枚举 
		public bModleViewType: number = 0;  //显示模型即对应了1号到6号金矿的编号或者当为宝石袋时1号到3号宝石袋 
		public bMineHeapStat: number = 0;  //0可以抓取1己经抓到过了 
		public dwRelatePoints: number = 0;  //对应抓取成功后可获得的积分 

		public messageName(): string { return "MineHeap";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwIndexTag);
			encodeBuffer.write(Uint8Array, this.bMineHeapType);
			encodeBuffer.write(Uint8Array, this.bModleViewType);
			encodeBuffer.write(Uint8Array, this.bMineHeapStat);
			encodeBuffer.write(Uint32Array, this.dwRelatePoints);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwIndexTag = decodeBuffer.read(Uint32Array, 1);
			this.bMineHeapType = decodeBuffer.read(Uint8Array, 1);
			this.bModleViewType = decodeBuffer.read(Uint8Array, 1);
			this.bMineHeapStat = decodeBuffer.read(Uint8Array, 1);
			this.dwRelatePoints = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class GoldMinerGameData implements message {
		public dwTotalGotPoints: number = 0;  //当前己获取的积分 
		public bLeftGrabCount: number = 0;  //剩余可抓取次数 
		public astMineHeapList: Array<MineHeap> = new Array<MineHeap>();  //当局游戏可抓矿石列表 

		public messageName(): string { return "GoldMinerGameData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwTotalGotPoints);
			encodeBuffer.write(Uint8Array, this.bLeftGrabCount);
			var astMineHeapListSize = this.astMineHeapList.length > 5 ? 5 : this.astMineHeapList.length;
			encodeBuffer.write(Uint16Array, astMineHeapListSize);
			this.astMineHeapList.length = astMineHeapListSize;
			for (var i = 0; i <  astMineHeapListSize; i++) {
				encodeBuffer.skip(this.astMineHeapList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwTotalGotPoints = decodeBuffer.read(Uint32Array, 1);
			this.bLeftGrabCount = decodeBuffer.read(Uint8Array, 1);
			var astMineHeapListSize = decodeBuffer.read(Uint16Array, 1);
			this.astMineHeapList = new Array<MineHeap>(astMineHeapListSize);
			for (var i = 0; i <  astMineHeapListSize; i++) {
				this.astMineHeapList[i] = new MineHeap();
				decodeBuffer.skip(this.astMineHeapList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_GOLDMINER_ENTERDATA_SC implements message {
		public wMapID: number = 0;  //对应地图ID,目前无用 
		public dwSceneID: number = 0;  //对应的场景ID 
		public dwTableID: number = 0;  //对应的桌台ID 
		public stGameData: GoldMinerGameData = new GoldMinerGameData();  //当局游戏相关当前数据 

		public messageName(): string { return "CMD_GOLDMINER_ENTERDATA";}
		public messageValue(): number { return CMD_GOLDMINER_ENTERDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wMapID);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			encodeBuffer.write(Uint32Array, this.dwTableID);
			encodeBuffer.skip(this.stGameData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wMapID = decodeBuffer.read(Uint16Array, 1);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			this.dwTableID = decodeBuffer.read(Uint32Array, 1);
			decodeBuffer.skip(this.stGameData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class CMD_GOLDMINER_GAME_AGAIN_SC implements message {
		public dwSceneID: number = 0;  //对应的场景ID 
		public stGameData: GoldMinerGameData = new GoldMinerGameData();  //新的一局游戏当前数据 

		public messageName(): string { return "CMD_GOLDMINER_GAME_AGAIN";}
		public messageValue(): number { return CMD_GOLDMINER_GAME_AGAIN;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			encodeBuffer.skip(this.stGameData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			decodeBuffer.skip(this.stGameData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class CMD_GOLDMINER_ONEGRAB_RET_CS implements message {
		public dwIndexTag: number = 0;  //抓取到的矿堆索引标记值单局游戏内的唯一随机值 

		public messageName(): string { return "CMD_GOLDMINER_ONEGRAB_RET";}
		public messageValue(): number { return CMD_GOLDMINER_ONEGRAB_RET;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwIndexTag);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwIndexTag = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_GOLDMINER_ONEGRAB_RET_SC implements message {
		public dwSceneID: number = 0;  //对应的场景ID 
		public stGameData: GoldMinerGameData = new GoldMinerGameData();  //游戏当前数据 
		public bIsGameEnd: number = 0;  //0未结束1已结束 
		public dwAwardGold: number = 0;  //当游戏是己结束对应获得的奖励金币数 

		public messageName(): string { return "CMD_GOLDMINER_ONEGRAB_RET";}
		public messageValue(): number { return CMD_GOLDMINER_ONEGRAB_RET;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			encodeBuffer.skip(this.stGameData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.write(Uint8Array, this.bIsGameEnd);
			encodeBuffer.write(Uint32Array, this.dwAwardGold);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			decodeBuffer.skip(this.stGameData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			this.bIsGameEnd = decodeBuffer.read(Uint8Array, 1);
			this.dwAwardGold = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class PhraseWord implements message {
		public szWordVal: string = "";  //一个汉字图片标识不包括后缀与配置文件中的值一致 

		public messageName(): string { return "PhraseWord";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szWordVal, 64);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szWordVal = decodeBuffer.readString(64);
			return decodeBuffer.length();
		}
	}

	export class PhraseGameData implements message {
		public szPicBasePath: string = "";  //图片基础路径不包括工具生成的图片分目录的部分 
		public dwAwardGold: number = 0;  //完成成语任务可获得的奖励金币数 
		public bDayTotalRefreshTimes: number = 0;  //当天可刷新成语次数 
		public bLeftRefreshTimes: number = 0;  //剩余可刷新成语次数 
		public astRetPhrase: Array<PhraseWord> = new Array<PhraseWord>();  //需要选择的成语列表 
		public astSelWordsList: Array<PhraseWord> = new Array<PhraseWord>();  //待选成语列表 

		public messageName(): string { return "PhraseGameData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szPicBasePath, 128);
			encodeBuffer.write(Uint32Array, this.dwAwardGold);
			encodeBuffer.write(Uint8Array, this.bDayTotalRefreshTimes);
			encodeBuffer.write(Uint8Array, this.bLeftRefreshTimes);
			var astRetPhraseSize = this.astRetPhrase.length > 4 ? 4 : this.astRetPhrase.length;
			encodeBuffer.write(Uint16Array, astRetPhraseSize);
			this.astRetPhrase.length = astRetPhraseSize;
			for (var i = 0; i <  astRetPhraseSize; i++) {
				encodeBuffer.skip(this.astRetPhrase[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			var astSelWordsListSize = this.astSelWordsList.length > 8 ? 8 : this.astSelWordsList.length;
			encodeBuffer.write(Uint16Array, astSelWordsListSize);
			this.astSelWordsList.length = astSelWordsListSize;
			for (var i = 0; i <  astSelWordsListSize; i++) {
				encodeBuffer.skip(this.astSelWordsList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szPicBasePath = decodeBuffer.readString(128);
			this.dwAwardGold = decodeBuffer.read(Uint32Array, 1);
			this.bDayTotalRefreshTimes = decodeBuffer.read(Uint8Array, 1);
			this.bLeftRefreshTimes = decodeBuffer.read(Uint8Array, 1);
			var astRetPhraseSize = decodeBuffer.read(Uint16Array, 1);
			this.astRetPhrase = new Array<PhraseWord>(astRetPhraseSize);
			for (var i = 0; i <  astRetPhraseSize; i++) {
				this.astRetPhrase[i] = new PhraseWord();
				decodeBuffer.skip(this.astRetPhrase[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			var astSelWordsListSize = decodeBuffer.read(Uint16Array, 1);
			this.astSelWordsList = new Array<PhraseWord>(astSelWordsListSize);
			for (var i = 0; i <  astSelWordsListSize; i++) {
				this.astSelWordsList[i] = new PhraseWord();
				decodeBuffer.skip(this.astSelWordsList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_CHINESEPHRASE_DO_GAME_SC implements message {
		public bTipsCode: number = 0;  //对应的逻辑错误码参见PHRASE_DOGAME_TIPSCODE_CANDOTASK等定义 
		public stGameData: PhraseGameData = new PhraseGameData();  //游戏当前数据仅当错误码为需要进行游戏时有效 

		public messageName(): string { return "CMD_CHINESEPHRASE_DO_GAME";}
		public messageValue(): number { return CMD_CHINESEPHRASE_DO_GAME;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bTipsCode);
			if (PHRASE_DOGAME_TIPSCODE_CANDOTASK==this.bTipsCode) {
				encodeBuffer.skip(this.stGameData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bTipsCode = decodeBuffer.read(Uint8Array, 1);
			if (PHRASE_DOGAME_TIPSCODE_CANDOTASK==this.bTipsCode) {
				decodeBuffer.skip(this.stGameData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_CHINESEPHRASE_REFRESH_SC implements message {
		public bTipsCode: number = 0;  //对应的逻辑错误码参见PHRASE_DOGAME_TIPSCODE_CANDOTASK等定义 
		public stGameData: PhraseGameData = new PhraseGameData();  //新的一局游戏数据 

		public messageName(): string { return "CMD_CHINESEPHRASE_REFRESH";}
		public messageValue(): number { return CMD_CHINESEPHRASE_REFRESH;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bTipsCode);
			encodeBuffer.skip(this.stGameData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bTipsCode = decodeBuffer.read(Uint8Array, 1);
			decodeBuffer.skip(this.stGameData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class CMD_CHINESEPHRASE_FINALCOMMIT_CS implements message {
		public szSelWordListKey: string = "";  //选择的图片名顺序排列后的32位md5值并异或之 

		public messageName(): string { return "CMD_CHINESEPHRASE_FINALCOMMIT";}
		public messageValue(): number { return CMD_CHINESEPHRASE_FINALCOMMIT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szSelWordListKey, 64);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szSelWordListKey = decodeBuffer.readString(64);
			return decodeBuffer.length();
		}
	}

	export class CMD_CHINESEPHRASE_FINALCOMMIT_SC implements message {
		public bTipsCode: number = 0;  //对应的逻辑错误码参见PHRASE_DOGAME_TIPSCODE_VERIFYFAIL等定义 

		public messageName(): string { return "CMD_CHINESEPHRASE_FINALCOMMIT";}
		public messageValue(): number { return CMD_CHINESEPHRASE_FINALCOMMIT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bTipsCode);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bTipsCode = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_CHINESEPHRASE_PICNOTFOUND_CS implements message {
		public iRelateClientErrCode: number = 0;  //客户端相关错误码 
		public stNotFoundWordsPic: PhraseWord = new PhraseWord();  //加载失败的图片名 

		public messageName(): string { return "CMD_CHINESEPHRASE_PICNOTFOUND";}
		public messageValue(): number { return CMD_CHINESEPHRASE_PICNOTFOUND;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Int32Array, this.iRelateClientErrCode);
			encodeBuffer.skip(this.stNotFoundWordsPic.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.iRelateClientErrCode = decodeBuffer.read(Int32Array, 1);
			decodeBuffer.skip(this.stNotFoundWordsPic.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class ButtonDef implements message {
		public szButDesc: string = "";  //按钮上的文字 
		public szRelateHyper: string = "";  //为空时点击直接关闭弹出框,按钮对应的超链接参数格式为URL标准格式:命令字##参数##参数2 
		public bIfQuitAfterUpToSvr: number = 0;  //如果对应超链接为服务器处理当上行到服务器后是否需要直接关闭弹出框,0不关1要关 

		public messageName(): string { return "ButtonDef";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szButDesc, 64);
			encodeBuffer.writeString(this.szRelateHyper, 256);
			encodeBuffer.write(Uint8Array, this.bIfQuitAfterUpToSvr);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szButDesc = decodeBuffer.readString(64);
			this.szRelateHyper = decodeBuffer.readString(256);
			this.bIfQuitAfterUpToSvr = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_COMM_HYPER_MSGBOX_SC implements message {
		public bMsgBoxType: number = 0;  //对话框显示类型,参见HYPER_MSGBOX_TYPE等定义 
		public dwTimeoutSeconds: number = 0;  //大于0时为倒计时自动关闭秒数否则不自动关闭 
		public szTitle: string = "";  //标题 
		public szContent: string = "";  //内容支持富文本并需要根据真实长度自动调整对话框大小 
		public astButtonList: Array<ButtonDef> = new Array<ButtonDef>();  //按钮列表需要自行按照按钮个数自动排版 

		public messageName(): string { return "CMD_COMM_HYPER_MSGBOX";}
		public messageValue(): number { return CMD_COMM_HYPER_MSGBOX;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bMsgBoxType);
			encodeBuffer.write(Uint32Array, this.dwTimeoutSeconds);
			encodeBuffer.writeString(this.szTitle, 512);
			encodeBuffer.writeString(this.szContent, 4096);
			var astButtonListSize = this.astButtonList.length > 10 ? 10 : this.astButtonList.length;
			encodeBuffer.write(Uint16Array, astButtonListSize);
			this.astButtonList.length = astButtonListSize;
			for (var i = 0; i <  astButtonListSize; i++) {
				encodeBuffer.skip(this.astButtonList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bMsgBoxType = decodeBuffer.read(Uint8Array, 1);
			this.dwTimeoutSeconds = decodeBuffer.read(Uint32Array, 1);
			this.szTitle = decodeBuffer.readString(512);
			this.szContent = decodeBuffer.readString(4096);
			var astButtonListSize = decodeBuffer.read(Uint16Array, 1);
			this.astButtonList = new Array<ButtonDef>(astButtonListSize);
			for (var i = 0; i <  astButtonListSize; i++) {
				this.astButtonList[i] = new ButtonDef();
				decodeBuffer.skip(this.astButtonList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_CLICK_HYPER_NOTICE_CS implements message {
		public szRelateHyper: string = "";  //对应的超链接参数格式为URL标准格式:命令字##参数##参数2 

		public messageName(): string { return "CMD_CLICK_HYPER_NOTICE";}
		public messageValue(): number { return CMD_CLICK_HYPER_NOTICE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.writeString(this.szRelateHyper, 256);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.szRelateHyper = decodeBuffer.readString(256);
			return decodeBuffer.length();
		}
	}

	export class CMD_CLICK_HYPER_NOTICE_SC implements message {
		public bRetCode: number = 0;  //0成功其他失败 

		public messageName(): string { return "CMD_CLICK_HYPER_NOTICE";}
		public messageValue(): number { return CMD_CLICK_HYPER_NOTICE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bRetCode);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bRetCode = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_SINASHOW_MONEY_EXCHANGE_IN_OUT_CS implements message {
		public bExchangeType: number = 0;  //1为兑入游戏币2为兑出到秀币 
		public dwInnerGoodsID: number = 0;  //游戏内部支付商品ID 
		public astOptionPara: Array<OptionPara> = new Array<OptionPara>();  //可选参数列表 

		public messageName(): string { return "CMD_SINASHOW_MONEY_EXCHANGE_IN_OUT";}
		public messageValue(): number { return CMD_SINASHOW_MONEY_EXCHANGE_IN_OUT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bExchangeType);
			encodeBuffer.write(Uint32Array, this.dwInnerGoodsID);
			var astOptionParaSize = this.astOptionPara.length > 10 ? 10 : this.astOptionPara.length;
			encodeBuffer.write(Uint16Array, astOptionParaSize);
			this.astOptionPara.length = astOptionParaSize;
			for (var i = 0; i <  astOptionParaSize; i++) {
				encodeBuffer.skip(this.astOptionPara[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bExchangeType = decodeBuffer.read(Uint8Array, 1);
			this.dwInnerGoodsID = decodeBuffer.read(Uint32Array, 1);
			var astOptionParaSize = decodeBuffer.read(Uint16Array, 1);
			this.astOptionPara = new Array<OptionPara>(astOptionParaSize);
			for (var i = 0; i <  astOptionParaSize; i++) {
				this.astOptionPara[i] = new OptionPara();
				decodeBuffer.skip(this.astOptionPara[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_SINASHOW_MONEY_EXCHANGE_IN_OUT_SC implements message {
		public bExchangeType: number = 0;  //货币兑换方向参见SINASHOW_MONEY_EXCHANGE_TYPE_IN_TOGOLD等枚举值 
		public bExchangeResult: number = 0;  //0成功其他失败具体的错误原因可能通过错误提示下发 
		public dwInnerGoodsID: number = 0;  //游戏内部支付商品ID 
		public szInnerOrderID: string = "";  //游戏内部订单编号 
		public llRelateShowBi: number = 0;  //对应了相关的秀币数 
		public llRelateGold: number = 0;  //对应了相关的金币数 
		public astOptionPara: Array<OptionPara> = new Array<OptionPara>();  //可选参数列表 

		public messageName(): string { return "CMD_SINASHOW_MONEY_EXCHANGE_IN_OUT";}
		public messageValue(): number { return CMD_SINASHOW_MONEY_EXCHANGE_IN_OUT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bExchangeType);
			encodeBuffer.write(Uint8Array, this.bExchangeResult);
			encodeBuffer.write(Uint32Array, this.dwInnerGoodsID);
			encodeBuffer.writeString(this.szInnerOrderID, MAX_PAY_COMM_SELFORDER_LEN);
			encodeBuffer.write(Float64Array, this.llRelateShowBi);
			encodeBuffer.write(Float64Array, this.llRelateGold);
			var astOptionParaSize = this.astOptionPara.length > 10 ? 10 : this.astOptionPara.length;
			encodeBuffer.write(Uint16Array, astOptionParaSize);
			this.astOptionPara.length = astOptionParaSize;
			for (var i = 0; i <  astOptionParaSize; i++) {
				encodeBuffer.skip(this.astOptionPara[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bExchangeType = decodeBuffer.read(Uint8Array, 1);
			this.bExchangeResult = decodeBuffer.read(Uint8Array, 1);
			this.dwInnerGoodsID = decodeBuffer.read(Uint32Array, 1);
			this.szInnerOrderID = decodeBuffer.readString(MAX_PAY_COMM_SELFORDER_LEN);
			this.llRelateShowBi = decodeBuffer.read(Float64Array, 1);
			this.llRelateGold = decodeBuffer.read(Float64Array, 1);
			var astOptionParaSize = decodeBuffer.read(Uint16Array, 1);
			this.astOptionPara = new Array<OptionPara>(astOptionParaSize);
			for (var i = 0; i <  astOptionParaSize; i++) {
				this.astOptionPara[i] = new OptionPara();
				decodeBuffer.skip(this.astOptionPara[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class LaBaTableData implements message {
		public llPool_777: number = 0;  //777奖池 
		public llPool_77: number = 0;  //77奖池 
		public llPool_7: number = 0;  //7奖池 
		public llPool_any7: number = 0;  //ANY7奖池 

		public messageName(): string { return "LaBaTableData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Float64Array, this.llPool_777);
			encodeBuffer.write(Float64Array, this.llPool_77);
			encodeBuffer.write(Float64Array, this.llPool_7);
			encodeBuffer.write(Float64Array, this.llPool_any7);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.llPool_777 = decodeBuffer.read(Float64Array, 1);
			this.llPool_77 = decodeBuffer.read(Float64Array, 1);
			this.llPool_7 = decodeBuffer.read(Float64Array, 1);
			this.llPool_any7 = decodeBuffer.read(Float64Array, 1);
			return decodeBuffer.length();
		}
	}

	export class LaBaRefreshData implements message {
		public llPool_777: number = 0;  //777奖池 
		public llPool_77: number = 0;  //77奖池 
		public llPool_7: number = 0;  //7奖池 
		public llPool_any7: number = 0;  //ANY7奖池 
		public wRefreshGap: number = 0;  //数据刷新时间单位秒 

		public messageName(): string { return "LaBaRefreshData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Float64Array, this.llPool_777);
			encodeBuffer.write(Float64Array, this.llPool_77);
			encodeBuffer.write(Float64Array, this.llPool_7);
			encodeBuffer.write(Float64Array, this.llPool_any7);
			encodeBuffer.write(Uint16Array, this.wRefreshGap);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.llPool_777 = decodeBuffer.read(Float64Array, 1);
			this.llPool_77 = decodeBuffer.read(Float64Array, 1);
			this.llPool_7 = decodeBuffer.read(Float64Array, 1);
			this.llPool_any7 = decodeBuffer.read(Float64Array, 1);
			this.wRefreshGap = decodeBuffer.read(Uint16Array, 1);
			return decodeBuffer.length();
		}
	}

	export class LaBaPlayerData implements message {
		public dwFreePlayCount: number = 0;  //可免费玩次数 

		public messageName(): string { return "LaBaPlayerData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwFreePlayCount);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwFreePlayCount = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_LABA_ENTERDATA_SC implements message {
		public wMapID: number = 0;  //对应地图ID 
		public dwSceneID: number = 0;  //对应的场景ID 
		public dwTableID: number = 0;  //对应的桌台ID 
		public stTableData: LaBaTableData = new LaBaTableData();  //桌台数据 
		public stPlayerData: LaBaPlayerData = new LaBaPlayerData();  //玩家数据 

		public messageName(): string { return "CMD_LABA_ENTERDATA";}
		public messageValue(): number { return CMD_LABA_ENTERDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wMapID);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			encodeBuffer.write(Uint32Array, this.dwTableID);
			encodeBuffer.skip(this.stTableData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.skip(this.stPlayerData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wMapID = decodeBuffer.read(Uint16Array, 1);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			this.dwTableID = decodeBuffer.read(Uint32Array, 1);
			decodeBuffer.skip(this.stTableData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			decodeBuffer.skip(this.stPlayerData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class CMD_LABA_REFRESHDATA_SC implements message {
		public dwSceneID: number = 0;  //对应的场景ID,需要与玩家当前所在的sceneid一致才能处理,该id全游戏唯一 
		public stRefreshData: LaBaRefreshData = new LaBaRefreshData();  //桌台刷新数据 

		public messageName(): string { return "CMD_LABA_REFRESHDATA";}
		public messageValue(): number { return CMD_LABA_REFRESHDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			encodeBuffer.skip(this.stRefreshData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			decodeBuffer.skip(this.stRefreshData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class CMD_LABA_PLAY_ONE_ROUND_CS implements message {
		public bTryPlayType: number = 0;  //参见LABA_PLAY_TYPE_NORMAL等枚举类型 
		public bSelectLineCount: number = 0;  //选中线数5或10或者等等 
		public dwOneLineBetMoney: number = 0;  //单线对应下注钱数不同场次自动适配不同货币 

		public messageName(): string { return "CMD_LABA_PLAY_ONE_ROUND";}
		public messageValue(): number { return CMD_LABA_PLAY_ONE_ROUND;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bTryPlayType);
			encodeBuffer.write(Uint8Array, this.bSelectLineCount);
			encodeBuffer.write(Uint32Array, this.dwOneLineBetMoney);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bTryPlayType = decodeBuffer.read(Uint8Array, 1);
			this.bSelectLineCount = decodeBuffer.read(Uint8Array, 1);
			this.dwOneLineBetMoney = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class LaBaAwardLineData implements message {
		public bLineTag: number = 0;  //中奖线编号 
		public bConnectItemCount: number = 0;  //连线物品个数 

		public messageName(): string { return "LaBaAwardLineData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bLineTag);
			encodeBuffer.write(Uint8Array, this.bConnectItemCount);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bLineTag = decodeBuffer.read(Uint8Array, 1);
			this.bConnectItemCount = decodeBuffer.read(Uint8Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_LABA_PLAY_ONE_ROUND_SC implements message {
		public dwSceneID: number = 0;  //对应的场景ID,需要与玩家当前所在的sceneid一致才能处理,该id全游戏唯一 
		public bPlayIfSucc: number = 0;  //0成功其他失败这里不为成功时其他字段均无效 
		public bFinalPlayType: number = 0;  //参见LABA_PLAY_TYPE_NORMAL等枚举类型 
		public dwTotalCostMoney: number = 0;  //总消费货币 
		public arrViewPos: Array<number> = new Array<number>();  //每个条带从左到右的起始位置 
		public dwAwardAllTimes: number = 0;  //中奖总倍数 
		public llTotalAwardGold: number = 0;  //中奖获得总金币数 
		public llTotalAwardDiamond: number = 0;  //中奖获得总钻石数 
		public llTotalAwardLeafGold: number = 0;  //中奖获得总金叶子数 
		public bAwardRetType: number = 0;  //奖励结果显示类型参见LABA_AWARD_TYPE_NORMAL等枚举 
		public bIfBigWin: number = 0;  //1是bigwin其他不是 
		public arrAwardLineList: Array<LaBaAwardLineData> = new Array<LaBaAwardLineData>();  //每条中奖线相关数据 
		public stPlayerData: LaBaPlayerData = new LaBaPlayerData();  //玩家最新数据 

		public messageName(): string { return "CMD_LABA_PLAY_ONE_ROUND";}
		public messageValue(): number { return CMD_LABA_PLAY_ONE_ROUND;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			encodeBuffer.write(Uint8Array, this.bPlayIfSucc);
			encodeBuffer.write(Uint8Array, this.bFinalPlayType);
			encodeBuffer.write(Uint32Array, this.dwTotalCostMoney);
			var arrViewPosSize = this.arrViewPos.length > 10 ? 10 : this.arrViewPos.length;
			encodeBuffer.write(Uint16Array, arrViewPosSize);
			this.arrViewPos.length = arrViewPosSize;
			encodeBuffer.write(Uint8Array, this.arrViewPos);
			encodeBuffer.write(Uint32Array, this.dwAwardAllTimes);
			encodeBuffer.write(Float64Array, this.llTotalAwardGold);
			encodeBuffer.write(Float64Array, this.llTotalAwardDiamond);
			encodeBuffer.write(Float64Array, this.llTotalAwardLeafGold);
			encodeBuffer.write(Uint8Array, this.bAwardRetType);
			encodeBuffer.write(Uint8Array, this.bIfBigWin);
			var arrAwardLineListSize = this.arrAwardLineList.length > 30 ? 30 : this.arrAwardLineList.length;
			encodeBuffer.write(Uint16Array, arrAwardLineListSize);
			this.arrAwardLineList.length = arrAwardLineListSize;
			for (var i = 0; i <  arrAwardLineListSize; i++) {
				encodeBuffer.skip(this.arrAwardLineList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			encodeBuffer.skip(this.stPlayerData.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			this.bPlayIfSucc = decodeBuffer.read(Uint8Array, 1);
			this.bFinalPlayType = decodeBuffer.read(Uint8Array, 1);
			this.dwTotalCostMoney = decodeBuffer.read(Uint32Array, 1);
			var arrViewPosSize = decodeBuffer.read(Uint16Array, 1);
			this.arrViewPos = new Array<number>(arrViewPosSize);
			this.arrViewPos = decodeBuffer.read(Uint8Array, arrViewPosSize);
			this.dwAwardAllTimes = decodeBuffer.read(Uint32Array, 1);
			this.llTotalAwardGold = decodeBuffer.read(Float64Array, 1);
			this.llTotalAwardDiamond = decodeBuffer.read(Float64Array, 1);
			this.llTotalAwardLeafGold = decodeBuffer.read(Float64Array, 1);
			this.bAwardRetType = decodeBuffer.read(Uint8Array, 1);
			this.bIfBigWin = decodeBuffer.read(Uint8Array, 1);
			var arrAwardLineListSize = decodeBuffer.read(Uint16Array, 1);
			this.arrAwardLineList = new Array<LaBaAwardLineData>(arrAwardLineListSize);
			for (var i = 0; i <  arrAwardLineListSize; i++) {
				this.arrAwardLineList[i] = new LaBaAwardLineData();
				decodeBuffer.skip(this.arrAwardLineList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			decodeBuffer.skip(this.stPlayerData.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class CMD_LABA_PLAYER_AWARDINFO_SC implements message {
		public dwSceneID: number = 0;  //对应的场景ID,需要与玩家当前所在的sceneid一致才能处理,该id全游戏唯一 
		public dwRoleObjectID: number = 0;  //对应玩家的实体handle 
		public bAwardRetType: number = 0;  //奖励结果显示类型参见LABA_AWARD_TYPE_NORMAL等枚举 
		public bIfBigWin: number = 0;  //1是bigwin其他不是 
		public llTotalAwardGold: number = 0;  //中奖获得总金币数 
		public llTotalAwardDiamond: number = 0;  //中奖获得总钻石数 
		public llTotalAwardLeafGold: number = 0;  //中奖获得总金叶子数 

		public messageName(): string { return "CMD_LABA_PLAYER_AWARDINFO";}
		public messageValue(): number { return CMD_LABA_PLAYER_AWARDINFO;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwSceneID);
			encodeBuffer.write(Uint32Array, this.dwRoleObjectID);
			encodeBuffer.write(Uint8Array, this.bAwardRetType);
			encodeBuffer.write(Uint8Array, this.bIfBigWin);
			encodeBuffer.write(Float64Array, this.llTotalAwardGold);
			encodeBuffer.write(Float64Array, this.llTotalAwardDiamond);
			encodeBuffer.write(Float64Array, this.llTotalAwardLeafGold);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwSceneID = decodeBuffer.read(Uint32Array, 1);
			this.dwRoleObjectID = decodeBuffer.read(Uint32Array, 1);
			this.bAwardRetType = decodeBuffer.read(Uint8Array, 1);
			this.bIfBigWin = decodeBuffer.read(Uint8Array, 1);
			this.llTotalAwardGold = decodeBuffer.read(Float64Array, 1);
			this.llTotalAwardDiamond = decodeBuffer.read(Float64Array, 1);
			this.llTotalAwardLeafGold = decodeBuffer.read(Float64Array, 1);
			return decodeBuffer.length();
		}
	}

	export class ItemStoreOneItem implements message {
		public dwItemID: number = 0;  //商品ID 
		public dwLeftCount: number = 0;  //剩余个数 
		public dwSpecialMaskTag: number = 0;  //特殊展示状态按位标记参见ITEMSTORE_SPECIALMASK_NOSUPPLY等枚举 

		public messageName(): string { return "ItemStoreOneItem";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwItemID);
			encodeBuffer.write(Uint32Array, this.dwLeftCount);
			encodeBuffer.write(Uint32Array, this.dwSpecialMaskTag);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwItemID = decodeBuffer.read(Uint32Array, 1);
			this.dwLeftCount = decodeBuffer.read(Uint32Array, 1);
			this.dwSpecialMaskTag = decodeBuffer.read(Uint32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_ITEMSTORE_GETSALEHIS_SC implements message {
		public astItemList: Array<ItemStoreOneItem> = new Array<ItemStoreOneItem>();  //商品销售历史数据列表 

		public messageName(): string { return "CMD_ITEMSTORE_GETSALEHIS";}
		public messageValue(): number { return CMD_ITEMSTORE_GETSALEHIS;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var astItemListSize = this.astItemList.length > MAX_ITEMSTORE_LIST_MAX_LEN ? MAX_ITEMSTORE_LIST_MAX_LEN : this.astItemList.length;
			encodeBuffer.write(Uint16Array, astItemListSize);
			this.astItemList.length = astItemListSize;
			for (var i = 0; i <  astItemListSize; i++) {
				encodeBuffer.skip(this.astItemList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var astItemListSize = decodeBuffer.read(Uint16Array, 1);
			this.astItemList = new Array<ItemStoreOneItem>(astItemListSize);
			for (var i = 0; i <  astItemListSize; i++) {
				this.astItemList[i] = new ItemStoreOneItem();
				decodeBuffer.skip(this.astItemList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_ITEMSTORE_DOBUY_CS implements message {
		public dwItemID: number = 0;  //商品ID 
		public dwBuyCount: number = 0;  //购买个数 
		public szDeliverInfo: string = "";  //发货信息 

		public messageName(): string { return "CMD_ITEMSTORE_DOBUY";}
		public messageValue(): number { return CMD_ITEMSTORE_DOBUY;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwItemID);
			encodeBuffer.write(Uint32Array, this.dwBuyCount);
			encodeBuffer.writeString(this.szDeliverInfo, 512);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwItemID = decodeBuffer.read(Uint32Array, 1);
			this.dwBuyCount = decodeBuffer.read(Uint32Array, 1);
			this.szDeliverInfo = decodeBuffer.readString(512);
			return decodeBuffer.length();
		}
	}

	export class CMD_ITEMSTORE_DOBUY_SC implements message {
		public dwBuyRet: number = 0;  //0成功,其他失败,当为0或者ERROR_ITEMSTORE_ITEM_NOTENOUGH时才能用stNewItemStat刷新数据 
		public stNewItemStat: ItemStoreOneItem = new ItemStoreOneItem();  //最新的该商品销售历史数据 

		public messageName(): string { return "CMD_ITEMSTORE_DOBUY";}
		public messageValue(): number { return CMD_ITEMSTORE_DOBUY;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.dwBuyRet);
			encodeBuffer.skip(this.stNewItemStat.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.dwBuyRet = decodeBuffer.read(Uint32Array, 1);
			decodeBuffer.skip(this.stNewItemStat.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class ItemStoreSaleLog implements message {
		public llLogID: number = 0;  //购买记录ID 
		public dwItemID: number = 0;  //商品ID 
		public dwBuyCount: number = 0;  //物品个数 
		public dwBuyTime: number = 0;  //购买时间 
		public dwSendStat: number = 0;  //0为等待发放1为已经发放 
		public szDeliverInfo: string = "";  //发货信息 

		public messageName(): string { return "ItemStoreSaleLog";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Float64Array, this.llLogID);
			encodeBuffer.write(Uint32Array, this.dwItemID);
			encodeBuffer.write(Uint32Array, this.dwBuyCount);
			encodeBuffer.write(Uint32Array, this.dwBuyTime);
			encodeBuffer.write(Uint32Array, this.dwSendStat);
			encodeBuffer.writeString(this.szDeliverInfo, 512);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.llLogID = decodeBuffer.read(Float64Array, 1);
			this.dwItemID = decodeBuffer.read(Uint32Array, 1);
			this.dwBuyCount = decodeBuffer.read(Uint32Array, 1);
			this.dwBuyTime = decodeBuffer.read(Uint32Array, 1);
			this.dwSendStat = decodeBuffer.read(Uint32Array, 1);
			this.szDeliverInfo = decodeBuffer.readString(512);
			return decodeBuffer.length();
		}
	}

	export class CMD_ITEMSTORE_QUERY_BUYLOG_SC implements message {
		public astLogList: Array<ItemStoreSaleLog> = new Array<ItemStoreSaleLog>();  //商品销售历史数据列表 

		public messageName(): string { return "CMD_ITEMSTORE_QUERY_BUYLOG";}
		public messageValue(): number { return CMD_ITEMSTORE_QUERY_BUYLOG;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var astLogListSize = this.astLogList.length > MAX_ITEMSTORE_LIST_MAX_LEN ? MAX_ITEMSTORE_LIST_MAX_LEN : this.astLogList.length;
			encodeBuffer.write(Uint16Array, astLogListSize);
			this.astLogList.length = astLogListSize;
			for (var i = 0; i <  astLogListSize; i++) {
				encodeBuffer.skip(this.astLogList[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var astLogListSize = decodeBuffer.read(Uint16Array, 1);
			this.astLogList = new Array<ItemStoreSaleLog>(astLogListSize);
			for (var i = 0; i <  astLogListSize; i++) {
				this.astLogList[i] = new ItemStoreSaleLog();
				decodeBuffer.skip(this.astLogList[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_CLT_FIN_WRAP_CS implements message {
		public wMapID: number = 0;  //已经完成切换进入的房间对应地图ID参见MAP_TEMPLATE_ID_NORMAL_SLOT等枚举 

		public messageName(): string { return "CMD_CLT_FIN_WRAP";}
		public messageValue(): number { return CMD_CLT_FIN_WRAP;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wMapID);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wMapID = decodeBuffer.read(Uint16Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_BUYUHALL_VERSION_GIFT_SC implements message {
		public bIfSucc: number = 0;  //0成功其他失败 
		public llAwardGold: number = 0;  //领取总金币数 
		public llAwardLeafGold: number = 0;  //领取总金叶子数 

		public messageName(): string { return "CMD_GET_BUYUHALL_VERSION_GIFT";}
		public messageValue(): number { return CMD_GET_BUYUHALL_VERSION_GIFT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint8Array, this.bIfSucc);
			encodeBuffer.write(Float64Array, this.llAwardGold);
			encodeBuffer.write(Float64Array, this.llAwardLeafGold);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.bIfSucc = decodeBuffer.read(Uint8Array, 1);
			this.llAwardGold = decodeBuffer.read(Float64Array, 1);
			this.llAwardLeafGold = decodeBuffer.read(Float64Array, 1);
			return decodeBuffer.length();
		}
	}

	export class PROPERTYNEW implements message {
		public prop_type: number = 0;  //属性key 
		public prop_value: number = 0;  //属性值 

		public messageName(): string { return "PROPERTYNEW";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Int32Array, this.prop_type);
			encodeBuffer.write(Float64Array, this.prop_value);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.prop_type = decodeBuffer.read(Int32Array, 1);
			this.prop_value = decodeBuffer.read(Float64Array, 1);
			return decodeBuffer.length();
		}
	}

	export class ZodiacYearResult implements message {
		public ret_out_to_in: Array<number> = new Array<number>();  //本期摇奖结果,从外圈到里圈对应结果 

		public messageName(): string { return "ZodiacYearResult";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			var ret_out_to_inSize = this.ret_out_to_in.length > 5 ? 5 : this.ret_out_to_in.length;
			encodeBuffer.write(Uint16Array, ret_out_to_inSize);
			this.ret_out_to_in.length = ret_out_to_inSize;
			encodeBuffer.write(Int32Array, this.ret_out_to_in);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			var ret_out_to_inSize = decodeBuffer.read(Uint16Array, 1);
			this.ret_out_to_in = new Array<number>(ret_out_to_inSize);
			this.ret_out_to_in = decodeBuffer.read(Int32Array, ret_out_to_inSize);
			return decodeBuffer.length();
		}
	}

	export class ZodiacHisData implements message {
		public round_year: number = 0;  //对应的期数 
		public round_ret: ZodiacYearResult = new ZodiacYearResult();  //对应的结果 

		public messageName(): string { return "ZodiacHisData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.round_year);
			encodeBuffer.skip(this.round_ret.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.round_year = decodeBuffer.read(Uint32Array, 1);
			decodeBuffer.skip(this.round_ret.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class ZodiacTableData implements message {
		public round_index: number = 0;  //对应的相关转数序号 
		public round_year: number = 0;  //对应的年份 
		public tab_status: number = 0;  //当前状态,参见ZODIAC_SCENE_STATUS_IDLE等系列枚举 
		public status_left_sec: number = 0;  //当前对应剩余可下注秒数 
		public tbl_bet_detail: Array<PROPERTYNEW> = new Array<PROPERTYNEW>();  //桌台总下注信息,key对应参见ZodiacSceneItem定义 
		public his_data: Array<ZodiacHisData> = new Array<ZodiacHisData>();  //产出历史,最长15个 
		public status_total_sec: number = 0;  //当前状态对应的总时间秒数 

		public messageName(): string { return "ZodiacTableData";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.round_index);
			encodeBuffer.write(Uint32Array, this.round_year);
			encodeBuffer.write(Int32Array, this.tab_status);
			encodeBuffer.write(Int32Array, this.status_left_sec);
			var tbl_bet_detailSize = this.tbl_bet_detail.length > 25 ? 25 : this.tbl_bet_detail.length;
			encodeBuffer.write(Uint16Array, tbl_bet_detailSize);
			this.tbl_bet_detail.length = tbl_bet_detailSize;
			for (var i = 0; i <  tbl_bet_detailSize; i++) {
				encodeBuffer.skip(this.tbl_bet_detail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			var his_dataSize = this.his_data.length > 20 ? 20 : this.his_data.length;
			encodeBuffer.write(Uint16Array, his_dataSize);
			this.his_data.length = his_dataSize;
			for (var i = 0; i <  his_dataSize; i++) {
				encodeBuffer.skip(this.his_data[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			encodeBuffer.write(Int32Array, this.status_total_sec);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.round_index = decodeBuffer.read(Uint32Array, 1);
			this.round_year = decodeBuffer.read(Uint32Array, 1);
			this.tab_status = decodeBuffer.read(Int32Array, 1);
			this.status_left_sec = decodeBuffer.read(Int32Array, 1);
			var tbl_bet_detailSize = decodeBuffer.read(Uint16Array, 1);
			this.tbl_bet_detail = new Array<PROPERTYNEW>(tbl_bet_detailSize);
			for (var i = 0; i <  tbl_bet_detailSize; i++) {
				this.tbl_bet_detail[i] = new PROPERTYNEW();
				decodeBuffer.skip(this.tbl_bet_detail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			var his_dataSize = decodeBuffer.read(Uint16Array, 1);
			this.his_data = new Array<ZodiacHisData>(his_dataSize);
			for (var i = 0; i <  his_dataSize; i++) {
				this.his_data[i] = new ZodiacHisData();
				decodeBuffer.skip(this.his_data[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			this.status_total_sec = decodeBuffer.read(Int32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZODIAC_ENTERDATA_SC implements message {
		public scene_tmp_id: number = 0;  //对应的场景模板ID 
		public table_id: number = 0;  //对应的桌台ID 
		public table_data: ZodiacTableData = new ZodiacTableData();  //对应当前桌台数据 
		public my_bet_detail: Array<PROPERTYNEW> = new Array<PROPERTYNEW>();  //对应玩家当前当转的具体下注列表 
		public bunch_set_2: Array<number> = new Array<number>();  //对应当前串2设置 
		public bunch_set_3: Array<number> = new Array<number>();  //对应当前串3设置 

		public messageName(): string { return "CMD_ZODIAC_ENTERDATA";}
		public messageValue(): number { return CMD_ZODIAC_ENTERDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Int32Array, this.scene_tmp_id);
			encodeBuffer.write(Int32Array, this.table_id);
			encodeBuffer.skip(this.table_data.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			var my_bet_detailSize = this.my_bet_detail.length > 25 ? 25 : this.my_bet_detail.length;
			encodeBuffer.write(Uint16Array, my_bet_detailSize);
			this.my_bet_detail.length = my_bet_detailSize;
			for (var i = 0; i <  my_bet_detailSize; i++) {
				encodeBuffer.skip(this.my_bet_detail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			var bunch_set_2Size = this.bunch_set_2.length > 3 ? 3 : this.bunch_set_2.length;
			encodeBuffer.write(Uint16Array, bunch_set_2Size);
			this.bunch_set_2.length = bunch_set_2Size;
			encodeBuffer.write(Int32Array, this.bunch_set_2);
			var bunch_set_3Size = this.bunch_set_3.length > 3 ? 3 : this.bunch_set_3.length;
			encodeBuffer.write(Uint16Array, bunch_set_3Size);
			this.bunch_set_3.length = bunch_set_3Size;
			encodeBuffer.write(Int32Array, this.bunch_set_3);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.scene_tmp_id = decodeBuffer.read(Int32Array, 1);
			this.table_id = decodeBuffer.read(Int32Array, 1);
			decodeBuffer.skip(this.table_data.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			var my_bet_detailSize = decodeBuffer.read(Uint16Array, 1);
			this.my_bet_detail = new Array<PROPERTYNEW>(my_bet_detailSize);
			for (var i = 0; i <  my_bet_detailSize; i++) {
				this.my_bet_detail[i] = new PROPERTYNEW();
				decodeBuffer.skip(this.my_bet_detail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			var bunch_set_2Size = decodeBuffer.read(Uint16Array, 1);
			this.bunch_set_2 = new Array<number>(bunch_set_2Size);
			this.bunch_set_2 = decodeBuffer.read(Int32Array, bunch_set_2Size);
			var bunch_set_3Size = decodeBuffer.read(Uint16Array, 1);
			this.bunch_set_3 = new Array<number>(bunch_set_3Size);
			this.bunch_set_3 = decodeBuffer.read(Int32Array, bunch_set_3Size);
			return decodeBuffer.length();
		}
	}

	export class ZodiacPlayerResult implements message {
		public role_id: number = 0;  //角色ID 
		public pos: number = 0;  //座位号(将自己始终显示到中间,其他人按座位号从左到右显示) 
		public win_gold: number = 0;  //本轮赢取金币 

		public messageName(): string { return "ZodiacPlayerResult";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Float64Array, this.role_id);
			encodeBuffer.write(Int32Array, this.pos);
			encodeBuffer.write(Float64Array, this.win_gold);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.role_id = decodeBuffer.read(Float64Array, 1);
			this.pos = decodeBuffer.read(Int32Array, 1);
			this.win_gold = decodeBuffer.read(Float64Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZODIAC_ROUND_END_SC implements message {
		public newst_table_data: ZodiacTableData = new ZodiacTableData();  //对应开奖后的转轮数据,序号及奖池数据等所有数据己刷新为发奖后的最新数据 
		public cur_result: ZodiacYearResult = new ZodiacYearResult();  //本局结果 
		public player_result: Array<ZodiacPlayerResult> = new Array<ZodiacPlayerResult>();  //各在座玩家输赢结果 
		public tips_item_id: number = 0;  //需要在下一轮做提示的物品ID 
		public tips_disappear_year: number = 0;  //已经多少年没出现过了 

		public messageName(): string { return "CMD_ZODIAC_ROUND_END";}
		public messageValue(): number { return CMD_ZODIAC_ROUND_END;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.skip(this.newst_table_data.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			encodeBuffer.skip(this.cur_result.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			var player_resultSize = this.player_result.length > 10 ? 10 : this.player_result.length;
			encodeBuffer.write(Uint16Array, player_resultSize);
			this.player_result.length = player_resultSize;
			for (var i = 0; i <  player_resultSize; i++) {
				encodeBuffer.skip(this.player_result[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			encodeBuffer.write(Int32Array, this.tips_item_id);
			encodeBuffer.write(Int32Array, this.tips_disappear_year);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			decodeBuffer.skip(this.newst_table_data.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			decodeBuffer.skip(this.cur_result.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			var player_resultSize = decodeBuffer.read(Uint16Array, 1);
			this.player_result = new Array<ZodiacPlayerResult>(player_resultSize);
			for (var i = 0; i <  player_resultSize; i++) {
				this.player_result[i] = new ZodiacPlayerResult();
				decodeBuffer.skip(this.player_result[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			this.tips_item_id = decodeBuffer.read(Int32Array, 1);
			this.tips_disappear_year = decodeBuffer.read(Int32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZODIAC_SET_BUNCH_CS implements message {
		public round_index: number = 0;  //对应转数序号 
		public bunch_set: Array<number> = new Array<number>();  //长度为2时为设置串2，为3时是设置串3 

		public messageName(): string { return "CMD_ZODIAC_SET_BUNCH";}
		public messageValue(): number { return CMD_ZODIAC_SET_BUNCH;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.round_index);
			var bunch_setSize = this.bunch_set.length > 3 ? 3 : this.bunch_set.length;
			encodeBuffer.write(Uint16Array, bunch_setSize);
			this.bunch_set.length = bunch_setSize;
			encodeBuffer.write(Int32Array, this.bunch_set);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.round_index = decodeBuffer.read(Uint32Array, 1);
			var bunch_setSize = decodeBuffer.read(Uint16Array, 1);
			this.bunch_set = new Array<number>(bunch_setSize);
			this.bunch_set = decodeBuffer.read(Int32Array, bunch_setSize);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZODIAC_SET_BUNCH_SC implements message {
		public round_index: number = 0;  //对应转数序号 
		public set_ret: number = 0;  //0成功,其他失败 
		public final_bunch_set: Array<number> = new Array<number>();  //仅set_ret为0时有效,长度为2时为设置串2，为3时是设置串3 

		public messageName(): string { return "CMD_ZODIAC_SET_BUNCH";}
		public messageValue(): number { return CMD_ZODIAC_SET_BUNCH;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.round_index);
			encodeBuffer.write(Int32Array, this.set_ret);
			var final_bunch_setSize = this.final_bunch_set.length > 3 ? 3 : this.final_bunch_set.length;
			encodeBuffer.write(Uint16Array, final_bunch_setSize);
			this.final_bunch_set.length = final_bunch_setSize;
			encodeBuffer.write(Int32Array, this.final_bunch_set);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.round_index = decodeBuffer.read(Uint32Array, 1);
			this.set_ret = decodeBuffer.read(Int32Array, 1);
			var final_bunch_setSize = decodeBuffer.read(Uint16Array, 1);
			this.final_bunch_set = new Array<number>(final_bunch_setSize);
			this.final_bunch_set = decodeBuffer.read(Int32Array, final_bunch_setSize);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZODIAC_BET_ON_CS implements message {
		public round_index: number = 0;  //对应转数序号 
		public bet_detail: Array<PROPERTYNEW> = new Array<PROPERTYNEW>();  //对应内容为下注列表（当前全部押注） 

		public messageName(): string { return "CMD_ZODIAC_BET_ON";}
		public messageValue(): number { return CMD_ZODIAC_BET_ON;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.round_index);
			var bet_detailSize = this.bet_detail.length > 25 ? 25 : this.bet_detail.length;
			encodeBuffer.write(Uint16Array, bet_detailSize);
			this.bet_detail.length = bet_detailSize;
			for (var i = 0; i <  bet_detailSize; i++) {
				encodeBuffer.skip(this.bet_detail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.round_index = decodeBuffer.read(Uint32Array, 1);
			var bet_detailSize = decodeBuffer.read(Uint16Array, 1);
			this.bet_detail = new Array<PROPERTYNEW>(bet_detailSize);
			for (var i = 0; i <  bet_detailSize; i++) {
				this.bet_detail[i] = new PROPERTYNEW();
				decodeBuffer.skip(this.bet_detail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_ZODIAC_BET_ON_SC implements message {
		public round_index: number = 0;  //对应转数序号 
		public bet_detail: Array<PROPERTYNEW> = new Array<PROPERTYNEW>();  //下注列表，若收到的是下注玩家自己则是当前的全量下注，否则是同步的其他人下注的增量 
		public total_bet_gold: number = 0;  //总下注 
		public bet_roleid: number = 0;  //对应下注的角色ID,客户端自行判断是否是同步玩家自己的当前全量下注,还是同步的其他玩家的增量下注 

		public messageName(): string { return "CMD_ZODIAC_BET_ON";}
		public messageValue(): number { return CMD_ZODIAC_BET_ON;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.round_index);
			var bet_detailSize = this.bet_detail.length > 25 ? 25 : this.bet_detail.length;
			encodeBuffer.write(Uint16Array, bet_detailSize);
			this.bet_detail.length = bet_detailSize;
			for (var i = 0; i <  bet_detailSize; i++) {
				encodeBuffer.skip(this.bet_detail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			encodeBuffer.write(Float64Array, this.total_bet_gold);
			encodeBuffer.write(Float64Array, this.bet_roleid);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.round_index = decodeBuffer.read(Uint32Array, 1);
			var bet_detailSize = decodeBuffer.read(Uint16Array, 1);
			this.bet_detail = new Array<PROPERTYNEW>(bet_detailSize);
			for (var i = 0; i <  bet_detailSize; i++) {
				this.bet_detail[i] = new PROPERTYNEW();
				decodeBuffer.skip(this.bet_detail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			this.total_bet_gold = decodeBuffer.read(Float64Array, 1);
			this.bet_roleid = decodeBuffer.read(Float64Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZODIAC_REFRESHDATA_SC implements message {
		public round_index: number = 0;  //对应转数序号 
		public tab_status: number = 0;  //当前状态,参见ZODIAC_SCENE_STATUS_IDLE等系列枚举 
		public bet_detail: Array<PROPERTYNEW> = new Array<PROPERTYNEW>();  //当前对应当转的各投资项具体下注列表 

		public messageName(): string { return "CMD_ZODIAC_REFRESHDATA";}
		public messageValue(): number { return CMD_ZODIAC_REFRESHDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint32Array, this.round_index);
			encodeBuffer.write(Int32Array, this.tab_status);
			var bet_detailSize = this.bet_detail.length > 25 ? 25 : this.bet_detail.length;
			encodeBuffer.write(Uint16Array, bet_detailSize);
			this.bet_detail.length = bet_detailSize;
			for (var i = 0; i <  bet_detailSize; i++) {
				encodeBuffer.skip(this.bet_detail[i].encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			}
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.round_index = decodeBuffer.read(Uint32Array, 1);
			this.tab_status = decodeBuffer.read(Int32Array, 1);
			var bet_detailSize = decodeBuffer.read(Uint16Array, 1);
			this.bet_detail = new Array<PROPERTYNEW>(bet_detailSize);
			for (var i = 0; i <  bet_detailSize; i++) {
				this.bet_detail[i] = new PROPERTYNEW();
				decodeBuffer.skip(this.bet_detail[i].decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			}
			return decodeBuffer.length();
		}
	}

	export class CMD_ZODIAC_REWARD_NPC_MM_CS implements message {

		public messageName(): string { return "CMD_ZODIAC_REWARD_NPC_MM";}
		public messageValue(): number { return CMD_ZODIAC_REWARD_NPC_MM;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZODIAC_REWARD_NPC_MM_SC implements message {
		public role_id: number = 0;  //打赏者的角色ID 
		public use_gold: number = 0;  //消耗金币 

		public messageName(): string { return "CMD_ZODIAC_REWARD_NPC_MM";}
		public messageValue(): number { return CMD_ZODIAC_REWARD_NPC_MM;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Float64Array, this.role_id);
			encodeBuffer.write(Int32Array, this.use_gold);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.role_id = decodeBuffer.read(Float64Array, 1);
			this.use_gold = decodeBuffer.read(Int32Array, 1);
			return decodeBuffer.length();
		}
	}

	export class CS implements message {
		public wLen: number = 0;  //包长字段 
		public wProtoVer: number = Version;  //协议版本号 
		public wCmd: number = 0;  //命令字 
		public dwUpSeqID: number = 0;  //上行包seqid 
		public stBody: message = null;  //包体,根据Cmd不同对应到不同的包体 

		public messageName(): string { return "";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wLen);
			encodeBuffer.write(Uint16Array, this.wProtoVer);
			encodeBuffer.write(Uint16Array, this.wCmd);
			encodeBuffer.write(Uint32Array, this.dwUpSeqID);
			encodeBuffer.skip(this.stBody.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wLen = decodeBuffer.read(Uint16Array, 1);
			this.wProtoVer = decodeBuffer.read(Uint16Array, 1);
			this.wCmd = decodeBuffer.read(Uint16Array, 1);
			this.dwUpSeqID = decodeBuffer.read(Uint32Array, 1);
			decodeBuffer.skip(this.stBody.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class SC implements message {
		public wLen: number = 0;  //包长字段 
		public wProtoVer: number = Version;  //协议版本号 
		public wCmd: number = 0;  //命令字 
		public dwDownSeqID: number = 0;  //下行包seqid 
		public stBody: message = null;  //包体,根据Cmd不同对应到不同的包体 

		public messageName(): string { return "";}
		public messageValue(): number { return 0;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			encodeBuffer.write(Uint16Array, this.wLen);
			encodeBuffer.write(Uint16Array, this.wProtoVer);
			encodeBuffer.write(Uint16Array, this.wCmd);
			encodeBuffer.write(Uint32Array, this.dwDownSeqID);
			encodeBuffer.skip(this.stBody.encode(encodeBuffer.buffer(), encodeBuffer.offset()));
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			this.wLen = decodeBuffer.read(Uint16Array, 1);
			this.wProtoVer = decodeBuffer.read(Uint16Array, 1);
			this.wCmd = decodeBuffer.read(Uint16Array, 1);
			this.dwDownSeqID = decodeBuffer.read(Uint32Array, 1);
			decodeBuffer.skip(this.stBody.decode(decodeBuffer.buffer(), decodeBuffer.offset()));
			return decodeBuffer.length();
		}
	}

	export class CMD_ERROR_CS implements message {

		public messageName(): string { return "CMD_ERROR";}
		public messageValue(): number { return CMD_ERROR;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTICE_CMDFAIL_CS implements message {

		public messageName(): string { return "CMD_NOTICE_CMDFAIL";}
		public messageValue(): number { return CMD_NOTICE_CMDFAIL;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_GOLD_NOTENOUGH_ERROR_CS implements message {

		public messageName(): string { return "CMD_GOLD_NOTENOUGH_ERROR";}
		public messageValue(): number { return CMD_GOLD_NOTENOUGH_ERROR;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_COMM_HYPER_MSGBOX_CS implements message {

		public messageName(): string { return "CMD_COMM_HYPER_MSGBOX";}
		public messageValue(): number { return CMD_COMM_HYPER_MSGBOX;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_BULLETIN_CS implements message {

		public messageName(): string { return "CMD_NOTIFY_BULLETIN";}
		public messageValue(): number { return CMD_NOTIFY_BULLETIN;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_BULLETIN_SC implements message {

		public messageName(): string { return "CMD_NOTIFY_BULLETIN";}
		public messageValue(): number { return CMD_NOTIFY_BULLETIN;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CLT_FIN_WRAP_SC implements message {

		public messageName(): string { return "CMD_CLT_FIN_WRAP";}
		public messageValue(): number { return CMD_CLT_FIN_WRAP;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ALOGOUT_CS implements message {

		public messageName(): string { return "CMD_ALOGOUT";}
		public messageValue(): number { return CMD_ALOGOUT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ALOGOUT_SC implements message {

		public messageName(): string { return "CMD_ALOGOUT";}
		public messageValue(): number { return CMD_ALOGOUT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_KICKOFF_ACCOUNT_CS implements message {

		public messageName(): string { return "CMD_KICKOFF_ACCOUNT";}
		public messageValue(): number { return CMD_KICKOFF_ACCOUNT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_NTF_ENTERVIEW_CS implements message {

		public messageName(): string { return "CMD_NTF_ENTERVIEW";}
		public messageValue(): number { return CMD_NTF_ENTERVIEW;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_NTF_LEAVEVIEW_CS implements message {

		public messageName(): string { return "CMD_NTF_LEAVEVIEW";}
		public messageValue(): number { return CMD_NTF_LEAVEVIEW;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_SCENE_HISTORY_CHATMSG_CS implements message {

		public messageName(): string { return "CMD_SCENE_HISTORY_CHATMSG";}
		public messageValue(): number { return CMD_SCENE_HISTORY_CHATMSG;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_SMART_BEGIN_CS implements message {

		public messageName(): string { return "CMD_SMART_BEGIN";}
		public messageValue(): number { return CMD_SMART_BEGIN;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_SMART_BEGIN_SC implements message {

		public messageName(): string { return "CMD_SMART_BEGIN";}
		public messageValue(): number { return CMD_SMART_BEGIN;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_TOPWINNER_CS implements message {

		public messageName(): string { return "CMD_NOTIFY_TOPWINNER";}
		public messageValue(): number { return CMD_NOTIFY_TOPWINNER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ROLE_MISC_CS implements message {

		public messageName(): string { return "CMD_ROLE_MISC";}
		public messageValue(): number { return CMD_ROLE_MISC;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ROLE_FIN_CS implements message {

		public messageName(): string { return "CMD_ROLE_FIN";}
		public messageValue(): number { return CMD_ROLE_FIN;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ROLE_FIN_SC implements message {

		public messageName(): string { return "CMD_ROLE_FIN";}
		public messageValue(): number { return CMD_ROLE_FIN;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ATT_CHANGE_CS implements message {

		public messageName(): string { return "CMD_ATT_CHANGE";}
		public messageValue(): number { return CMD_ATT_CHANGE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_DO_SLOTROUND_BEGIN_CS implements message {

		public messageName(): string { return "CMD_DO_SLOTROUND_BEGIN";}
		public messageValue(): number { return CMD_DO_SLOTROUND_BEGIN;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_DO_SLOTROUND_END_SC implements message {

		public messageName(): string { return "CMD_DO_SLOTROUND_END";}
		public messageValue(): number { return CMD_DO_SLOTROUND_END;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ADD_SLOTMONEY_CS implements message {

		public messageName(): string { return "CMD_ADD_SLOTMONEY";}
		public messageValue(): number { return CMD_ADD_SLOTMONEY;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ADD_SLOTMONEY_SC implements message {

		public messageName(): string { return "CMD_ADD_SLOTMONEY";}
		public messageValue(): number { return CMD_ADD_SLOTMONEY;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_SLOTTABDATA_CS implements message {

		public messageName(): string { return "CMD_NOTIFY_SLOTTABDATA";}
		public messageValue(): number { return CMD_NOTIFY_SLOTTABDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_LOTTERY_ENTER_CS implements message {

		public messageName(): string { return "CMD_LOTTERY_ENTER";}
		public messageValue(): number { return CMD_LOTTERY_ENTER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_LOTTERY_REFRESHDATA_CS implements message {

		public messageName(): string { return "CMD_LOTTERY_REFRESHDATA";}
		public messageValue(): number { return CMD_LOTTERY_REFRESHDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_LOTTERY_ROUND_END_CS implements message {

		public messageName(): string { return "CMD_LOTTERY_ROUND_END";}
		public messageValue(): number { return CMD_LOTTERY_ROUND_END;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_LOTTERY_HERORANK_CS implements message {

		public messageName(): string { return "CMD_LOTTERY_HERORANK";}
		public messageValue(): number { return CMD_LOTTERY_HERORANK;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_LOTTERY_REFRESH_SELF_BET_CS implements message {

		public messageName(): string { return "CMD_LOTTERY_REFRESH_SELF_BET";}
		public messageValue(): number { return CMD_LOTTERY_REFRESH_SELF_BET;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_LOTTERY_HISTORY_CHATMSG_CS implements message {

		public messageName(): string { return "CMD_LOTTERY_HISTORY_CHATMSG";}
		public messageValue(): number { return CMD_LOTTERY_HISTORY_CHATMSG;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_ENTERDATA_CS implements message {

		public messageName(): string { return "CMD_CLASSICFRUIT_ENTERDATA";}
		public messageValue(): number { return CMD_CLASSICFRUIT_ENTERDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_REFRESHDATA_CS implements message {

		public messageName(): string { return "CMD_CLASSICFRUIT_REFRESHDATA";}
		public messageValue(): number { return CMD_CLASSICFRUIT_REFRESHDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_ROUND_END_CS implements message {

		public messageName(): string { return "CMD_CLASSICFRUIT_ROUND_END";}
		public messageValue(): number { return CMD_CLASSICFRUIT_ROUND_END;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_REFRESH_SELF_BET_CS implements message {

		public messageName(): string { return "CMD_CLASSICFRUIT_REFRESH_SELF_BET";}
		public messageValue(): number { return CMD_CLASSICFRUIT_REFRESH_SELF_BET;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_HEARTBEAT_CS implements message {

		public messageName(): string { return "CMD_CLASSICFRUIT_HEARTBEAT";}
		public messageValue(): number { return CMD_CLASSICFRUIT_HEARTBEAT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_HEARTBEAT_SC implements message {

		public messageName(): string { return "CMD_CLASSICFRUIT_HEARTBEAT";}
		public messageValue(): number { return CMD_CLASSICFRUIT_HEARTBEAT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_SIGNUP_BANKER_CS implements message {

		public messageName(): string { return "CMD_CLASSICFRUIT_SIGNUP_BANKER";}
		public messageValue(): number { return CMD_CLASSICFRUIT_SIGNUP_BANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_QUIT_BANKER_CS implements message {

		public messageName(): string { return "CMD_CLASSICFRUIT_QUIT_BANKER";}
		public messageValue(): number { return CMD_CLASSICFRUIT_QUIT_BANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_UPDATE_BANKER_STAT_CS implements message {

		public messageName(): string { return "CMD_CLASSICFRUIT_UPDATE_BANKER_STAT";}
		public messageValue(): number { return CMD_CLASSICFRUIT_UPDATE_BANKER_STAT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_CURBANKERLIST_CS implements message {

		public messageName(): string { return "CMD_CLASSICFRUIT_CURBANKERLIST";}
		public messageValue(): number { return CMD_CLASSICFRUIT_CURBANKERLIST;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CLASSICFRUIT_UPDATE_CURBANKER_CS implements message {

		public messageName(): string { return "CMD_CLASSICFRUIT_UPDATE_CURBANKER";}
		public messageValue(): number { return CMD_CLASSICFRUIT_UPDATE_CURBANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_ENTERDATA_CS implements message {

		public messageName(): string { return "CMD_SHARK_ENTERDATA";}
		public messageValue(): number { return CMD_SHARK_ENTERDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_REFRESHDATA_CS implements message {

		public messageName(): string { return "CMD_SHARK_REFRESHDATA";}
		public messageValue(): number { return CMD_SHARK_REFRESHDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_ROUND_END_CS implements message {

		public messageName(): string { return "CMD_SHARK_ROUND_END";}
		public messageValue(): number { return CMD_SHARK_ROUND_END;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_REFRESH_SELF_BET_CS implements message {

		public messageName(): string { return "CMD_SHARK_REFRESH_SELF_BET";}
		public messageValue(): number { return CMD_SHARK_REFRESH_SELF_BET;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_HEARTBEAT_CS implements message {

		public messageName(): string { return "CMD_SHARK_HEARTBEAT";}
		public messageValue(): number { return CMD_SHARK_HEARTBEAT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_HEARTBEAT_SC implements message {

		public messageName(): string { return "CMD_SHARK_HEARTBEAT";}
		public messageValue(): number { return CMD_SHARK_HEARTBEAT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_SIGNUP_BANKER_CS implements message {

		public messageName(): string { return "CMD_SHARK_SIGNUP_BANKER";}
		public messageValue(): number { return CMD_SHARK_SIGNUP_BANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_QUIT_BANKER_CS implements message {

		public messageName(): string { return "CMD_SHARK_QUIT_BANKER";}
		public messageValue(): number { return CMD_SHARK_QUIT_BANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_UPDATE_BANKER_STAT_CS implements message {

		public messageName(): string { return "CMD_SHARK_UPDATE_BANKER_STAT";}
		public messageValue(): number { return CMD_SHARK_UPDATE_BANKER_STAT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_CURBANKERLIST_CS implements message {

		public messageName(): string { return "CMD_SHARK_CURBANKERLIST";}
		public messageValue(): number { return CMD_SHARK_CURBANKERLIST;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_SHARK_UPDATE_CURBANKER_CS implements message {

		public messageName(): string { return "CMD_SHARK_UPDATE_CURBANKER";}
		public messageValue(): number { return CMD_SHARK_UPDATE_CURBANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_CONLOGIN_GIFT_CS implements message {

		public messageName(): string { return "CMD_GET_CONLOGIN_GIFT";}
		public messageValue(): number { return CMD_GET_CONLOGIN_GIFT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_CONLOGIN_GIFT_SC implements message {

		public messageName(): string { return "CMD_GET_CONLOGIN_GIFT";}
		public messageValue(): number { return CMD_GET_CONLOGIN_GIFT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_ONLINETIME_GIFT_CS implements message {

		public messageName(): string { return "CMD_GET_ONLINETIME_GIFT";}
		public messageValue(): number { return CMD_GET_ONLINETIME_GIFT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CONLOGIN_GIFT_CS implements message {

		public messageName(): string { return "CMD_CONLOGIN_GIFT";}
		public messageValue(): number { return CMD_CONLOGIN_GIFT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_SKIP_NEWERGUIDE_CS implements message {

		public messageName(): string { return "CMD_SKIP_NEWERGUIDE";}
		public messageValue(): number { return CMD_SKIP_NEWERGUIDE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_SKIP_NEWERGUIDE_SC implements message {

		public messageName(): string { return "CMD_SKIP_NEWERGUIDE";}
		public messageValue(): number { return CMD_SKIP_NEWERGUIDE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_CHARGE_SUCC_SC implements message {

		public messageName(): string { return "CMD_NOTIFY_CHARGE_SUCC";}
		public messageValue(): number { return CMD_NOTIFY_CHARGE_SUCC;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CHANGE_HEADPHOTO_SC implements message {

		public messageName(): string { return "CMD_CHANGE_HEADPHOTO";}
		public messageValue(): number { return CMD_CHANGE_HEADPHOTO;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_THROWUP_GOLD_CS implements message {

		public messageName(): string { return "CMD_NOTIFY_THROWUP_GOLD";}
		public messageValue(): number { return CMD_NOTIFY_THROWUP_GOLD;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_CHARGESUCC_CS implements message {

		public messageName(): string { return "CMD_NOTIFY_CHARGESUCC";}
		public messageValue(): number { return CMD_NOTIFY_CHARGESUCC;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_EXTCHARGE_TIMER_CS implements message {

		public messageName(): string { return "CMD_NOTIFY_EXTCHARGE_TIMER";}
		public messageValue(): number { return CMD_NOTIFY_EXTCHARGE_TIMER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_EXTCHARGE_TIMER_SC implements message {

		public messageName(): string { return "CMD_NOTIFY_EXTCHARGE_TIMER";}
		public messageValue(): number { return CMD_NOTIFY_EXTCHARGE_TIMER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_PRIZEDRAW_CURINFO_CS implements message {

		public messageName(): string { return "CMD_PRIZEDRAW_CURINFO";}
		public messageValue(): number { return CMD_PRIZEDRAW_CURINFO;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_PLAY_PRIZEDRAW_CS implements message {

		public messageName(): string { return "CMD_PLAY_PRIZEDRAW";}
		public messageValue(): number { return CMD_PLAY_PRIZEDRAW;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_QUERY_MONEYTREE_CS implements message {

		public messageName(): string { return "CMD_QUERY_MONEYTREE";}
		public messageValue(): number { return CMD_QUERY_MONEYTREE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_GATHER_MONEYTREE_CS implements message {

		public messageName(): string { return "CMD_GATHER_MONEYTREE";}
		public messageValue(): number { return CMD_GATHER_MONEYTREE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_MODIFY_SELFPROP_SC implements message {

		public messageName(): string { return "CMD_MODIFY_SELFPROP";}
		public messageValue(): number { return CMD_MODIFY_SELFPROP;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ADV_ALIPAY_GIFTPKG_CS implements message {

		public messageName(): string { return "CMD_ADV_ALIPAY_GIFTPKG";}
		public messageValue(): number { return CMD_ADV_ALIPAY_GIFTPKG;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_BEGIN_CHARGE_SC implements message {

		public messageName(): string { return "CMD_NOTIFY_BEGIN_CHARGE";}
		public messageValue(): number { return CMD_NOTIFY_BEGIN_CHARGE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_UPT_EXTAPP_TIPS_CS implements message {

		public messageName(): string { return "CMD_NOTIFY_UPT_EXTAPP_TIPS";}
		public messageValue(): number { return CMD_NOTIFY_UPT_EXTAPP_TIPS;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_REFRESH_CUR_ONLINETIME_GIFT_CS implements message {

		public messageName(): string { return "CMD_REFRESH_CUR_ONLINETIME_GIFT";}
		public messageValue(): number { return CMD_REFRESH_CUR_ONLINETIME_GIFT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_APPSTORE_REPUTATION_STATE_CS implements message {

		public messageName(): string { return "CMD_APPSTORE_REPUTATION_STATE";}
		public messageValue(): number { return CMD_APPSTORE_REPUTATION_STATE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_WRITE_APPSTORE_REPUTATION_SC implements message {

		public messageName(): string { return "CMD_WRITE_APPSTORE_REPUTATION";}
		public messageValue(): number { return CMD_WRITE_APPSTORE_REPUTATION;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_APPSTORE_REPUTATION_CS implements message {

		public messageName(): string { return "CMD_NOTIFY_APPSTORE_REPUTATION";}
		public messageValue(): number { return CMD_NOTIFY_APPSTORE_REPUTATION;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_APPSTORE_REPUTATION_SC implements message {

		public messageName(): string { return "CMD_NOTIFY_APPSTORE_REPUTATION";}
		public messageValue(): number { return CMD_NOTIFY_APPSTORE_REPUTATION;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_APPSTORE_REPUTATION_GIFT_CS implements message {

		public messageName(): string { return "CMD_GET_APPSTORE_REPUTATION_GIFT";}
		public messageValue(): number { return CMD_GET_APPSTORE_REPUTATION_GIFT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_HIDDEN_CHARGE_PLATFORM_CS implements message {

		public messageName(): string { return "CMD_HIDDEN_CHARGE_PLATFORM";}
		public messageValue(): number { return CMD_HIDDEN_CHARGE_PLATFORM;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_IS_NEWROLE_REGISTER_CS implements message {

		public messageName(): string { return "CMD_IS_NEWROLE_REGISTER";}
		public messageValue(): number { return CMD_IS_NEWROLE_REGISTER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_IS_NEWROLE_REGISTER_SC implements message {

		public messageName(): string { return "CMD_IS_NEWROLE_REGISTER";}
		public messageValue(): number { return CMD_IS_NEWROLE_REGISTER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_ENTERDATA_CS implements message {

		public messageName(): string { return "CMD_CAR_ENTERDATA";}
		public messageValue(): number { return CMD_CAR_ENTERDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_REFRESHDATA_CS implements message {

		public messageName(): string { return "CMD_CAR_REFRESHDATA";}
		public messageValue(): number { return CMD_CAR_REFRESHDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_ROUND_END_CS implements message {

		public messageName(): string { return "CMD_CAR_ROUND_END";}
		public messageValue(): number { return CMD_CAR_ROUND_END;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_REFRESH_SELF_BET_CS implements message {

		public messageName(): string { return "CMD_CAR_REFRESH_SELF_BET";}
		public messageValue(): number { return CMD_CAR_REFRESH_SELF_BET;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_HEARTBEAT_CS implements message {

		public messageName(): string { return "CMD_CAR_HEARTBEAT";}
		public messageValue(): number { return CMD_CAR_HEARTBEAT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_HEARTBEAT_SC implements message {

		public messageName(): string { return "CMD_CAR_HEARTBEAT";}
		public messageValue(): number { return CMD_CAR_HEARTBEAT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_SIGNUP_BANKER_CS implements message {

		public messageName(): string { return "CMD_CAR_SIGNUP_BANKER";}
		public messageValue(): number { return CMD_CAR_SIGNUP_BANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_QUIT_BANKER_CS implements message {

		public messageName(): string { return "CMD_CAR_QUIT_BANKER";}
		public messageValue(): number { return CMD_CAR_QUIT_BANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_UPDATE_BANKER_STAT_CS implements message {

		public messageName(): string { return "CMD_CAR_UPDATE_BANKER_STAT";}
		public messageValue(): number { return CMD_CAR_UPDATE_BANKER_STAT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_CURBANKERLIST_CS implements message {

		public messageName(): string { return "CMD_CAR_CURBANKERLIST";}
		public messageValue(): number { return CMD_CAR_CURBANKERLIST;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_UPDATE_CURBANKER_CS implements message {

		public messageName(): string { return "CMD_CAR_UPDATE_CURBANKER";}
		public messageValue(): number { return CMD_CAR_UPDATE_CURBANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CAR_BIGWINNERRANK_CS implements message {

		public messageName(): string { return "CMD_CAR_BIGWINNERRANK";}
		public messageValue(): number { return CMD_CAR_BIGWINNERRANK;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_DO_UNBIND_CURMOBILE_CS implements message {

		public messageName(): string { return "CMD_DO_UNBIND_CURMOBILE";}
		public messageValue(): number { return CMD_DO_UNBIND_CURMOBILE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_DO_UNBIND_CURMOBILE_SC implements message {

		public messageName(): string { return "CMD_DO_UNBIND_CURMOBILE";}
		public messageValue(): number { return CMD_DO_UNBIND_CURMOBILE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_NOTIFY_ROUNDINDEXERR_SC implements message {

		public messageName(): string { return "CMD_NOTIFY_ROUNDINDEXERR";}
		public messageValue(): number { return CMD_NOTIFY_ROUNDINDEXERR;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_ENTERDATA_CS implements message {

		public messageName(): string { return "CMD_ZJH_ENTERDATA";}
		public messageValue(): number { return CMD_ZJH_ENTERDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_BEGIN_ONEGAME_CS implements message {

		public messageName(): string { return "CMD_ZJH_BEGIN_ONEGAME";}
		public messageValue(): number { return CMD_ZJH_BEGIN_ONEGAME;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_CHANGE_ROOM_CS implements message {

		public messageName(): string { return "CMD_ZJH_CHANGE_ROOM";}
		public messageValue(): number { return CMD_ZJH_CHANGE_ROOM;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_CHANGE_ROOM_SC implements message {

		public messageName(): string { return "CMD_ZJH_CHANGE_ROOM";}
		public messageValue(): number { return CMD_ZJH_CHANGE_ROOM;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_UPT_PLAYER_DATA_CS implements message {

		public messageName(): string { return "CMD_ZJH_UPT_PLAYER_DATA";}
		public messageValue(): number { return CMD_ZJH_UPT_PLAYER_DATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_UPT_TABLE_DATA_CS implements message {

		public messageName(): string { return "CMD_ZJH_UPT_TABLE_DATA";}
		public messageValue(): number { return CMD_ZJH_UPT_TABLE_DATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_END_ONEGAME_CS implements message {

		public messageName(): string { return "CMD_ZJH_END_ONEGAME";}
		public messageValue(): number { return CMD_ZJH_END_ONEGAME;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_PLAYER_ALLDATA_CS implements message {

		public messageName(): string { return "CMD_ZJH_PLAYER_ALLDATA";}
		public messageValue(): number { return CMD_ZJH_PLAYER_ALLDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_PLAYER_FIRSTROUNDINFO_CS implements message {

		public messageName(): string { return "CMD_ZJH_PLAYER_FIRSTROUNDINFO";}
		public messageValue(): number { return CMD_ZJH_PLAYER_FIRSTROUNDINFO;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_DO_READY_CS implements message {

		public messageName(): string { return "CMD_ZJH_DO_READY";}
		public messageValue(): number { return CMD_ZJH_DO_READY;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_DO_READY_SC implements message {

		public messageName(): string { return "CMD_ZJH_DO_READY";}
		public messageValue(): number { return CMD_ZJH_DO_READY;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_DO_DISCARD_CS implements message {

		public messageName(): string { return "CMD_ZJH_DO_DISCARD";}
		public messageValue(): number { return CMD_ZJH_DO_DISCARD;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_DO_DISCARD_SC implements message {

		public messageName(): string { return "CMD_ZJH_DO_DISCARD";}
		public messageValue(): number { return CMD_ZJH_DO_DISCARD;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_DO_FORBIDCOMPARE_CS implements message {

		public messageName(): string { return "CMD_ZJH_DO_FORBIDCOMPARE";}
		public messageValue(): number { return CMD_ZJH_DO_FORBIDCOMPARE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_DO_FORBIDCOMPARE_SC implements message {

		public messageName(): string { return "CMD_ZJH_DO_FORBIDCOMPARE";}
		public messageValue(): number { return CMD_ZJH_DO_FORBIDCOMPARE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_DO_DOUBLE_SC implements message {

		public messageName(): string { return "CMD_ZJH_DO_DOUBLE";}
		public messageValue(): number { return CMD_ZJH_DO_DOUBLE;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZJH_DO_VIEWCARD_CS implements message {

		public messageName(): string { return "CMD_ZJH_DO_VIEWCARD";}
		public messageValue(): number { return CMD_ZJH_DO_VIEWCARD;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_PAYCENTER_NOTIFY_SERVER_SUCC_SC implements message {

		public messageName(): string { return "CMD_PAYCENTER_NOTIFY_SERVER_SUCC";}
		public messageValue(): number { return CMD_PAYCENTER_NOTIFY_SERVER_SUCC;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_PAYCENTER_NOTIFY_CLIENT_SUCC_CS implements message {

		public messageName(): string { return "CMD_PAYCENTER_NOTIFY_CLIENT_SUCC";}
		public messageValue(): number { return CMD_PAYCENTER_NOTIFY_CLIENT_SUCC;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_CONLOGIN_GIFT_NEWVERSION_CS implements message {

		public messageName(): string { return "CMD_GET_CONLOGIN_GIFT_NEWVERSION";}
		public messageValue(): number { return CMD_GET_CONLOGIN_GIFT_NEWVERSION;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_ENTERDATA_CS implements message {

		public messageName(): string { return "CMD_BULL_ENTERDATA";}
		public messageValue(): number { return CMD_BULL_ENTERDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_ROUND_END_CS implements message {

		public messageName(): string { return "CMD_BULL_ROUND_END";}
		public messageValue(): number { return CMD_BULL_ROUND_END;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_SIGNUP_BANKER_CS implements message {

		public messageName(): string { return "CMD_BULL_SIGNUP_BANKER";}
		public messageValue(): number { return CMD_BULL_SIGNUP_BANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_QUIT_BANKER_CS implements message {

		public messageName(): string { return "CMD_BULL_QUIT_BANKER";}
		public messageValue(): number { return CMD_BULL_QUIT_BANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_CURBANKERLIST_CS implements message {

		public messageName(): string { return "CMD_BULL_CURBANKERLIST";}
		public messageValue(): number { return CMD_BULL_CURBANKERLIST;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_HEARTBEAT_CS implements message {

		public messageName(): string { return "CMD_BULL_HEARTBEAT";}
		public messageValue(): number { return CMD_BULL_HEARTBEAT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_HEARTBEAT_SC implements message {

		public messageName(): string { return "CMD_BULL_HEARTBEAT";}
		public messageValue(): number { return CMD_BULL_HEARTBEAT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_REFRESHDATA_CS implements message {

		public messageName(): string { return "CMD_BULL_REFRESHDATA";}
		public messageValue(): number { return CMD_BULL_REFRESHDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_UPDATE_CURBANKER_CS implements message {

		public messageName(): string { return "CMD_BULL_UPDATE_CURBANKER";}
		public messageValue(): number { return CMD_BULL_UPDATE_CURBANKER;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_BIGWINNERRANK_CS implements message {

		public messageName(): string { return "CMD_BULL_BIGWINNERRANK";}
		public messageValue(): number { return CMD_BULL_BIGWINNERRANK;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_UPDATE_BANKER_STAT_CS implements message {

		public messageName(): string { return "CMD_BULL_UPDATE_BANKER_STAT";}
		public messageValue(): number { return CMD_BULL_UPDATE_BANKER_STAT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_ROUND_START_CS implements message {

		public messageName(): string { return "CMD_BULL_ROUND_START";}
		public messageValue(): number { return CMD_BULL_ROUND_START;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_BULL_REFRESH_SELF_BET_CS implements message {

		public messageName(): string { return "CMD_BULL_REFRESH_SELF_BET";}
		public messageValue(): number { return CMD_BULL_REFRESH_SELF_BET;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_GOLDMINER_ENTERDATA_CS implements message {

		public messageName(): string { return "CMD_GOLDMINER_ENTERDATA";}
		public messageValue(): number { return CMD_GOLDMINER_ENTERDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_GOLDMINER_GAME_AGAIN_CS implements message {

		public messageName(): string { return "CMD_GOLDMINER_GAME_AGAIN";}
		public messageValue(): number { return CMD_GOLDMINER_GAME_AGAIN;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CHINESEPHRASE_DO_GAME_CS implements message {

		public messageName(): string { return "CMD_CHINESEPHRASE_DO_GAME";}
		public messageValue(): number { return CMD_CHINESEPHRASE_DO_GAME;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CHINESEPHRASE_REFRESH_CS implements message {

		public messageName(): string { return "CMD_CHINESEPHRASE_REFRESH";}
		public messageValue(): number { return CMD_CHINESEPHRASE_REFRESH;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_CHINESEPHRASE_PICNOTFOUND_SC implements message {

		public messageName(): string { return "CMD_CHINESEPHRASE_PICNOTFOUND";}
		public messageValue(): number { return CMD_CHINESEPHRASE_PICNOTFOUND;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_LABA_ENTERDATA_CS implements message {

		public messageName(): string { return "CMD_LABA_ENTERDATA";}
		public messageValue(): number { return CMD_LABA_ENTERDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_LABA_REFRESHDATA_CS implements message {

		public messageName(): string { return "CMD_LABA_REFRESHDATA";}
		public messageValue(): number { return CMD_LABA_REFRESHDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_LABA_PLAYER_AWARDINFO_CS implements message {

		public messageName(): string { return "CMD_LABA_PLAYER_AWARDINFO";}
		public messageValue(): number { return CMD_LABA_PLAYER_AWARDINFO;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ITEMSTORE_GETSALEHIS_CS implements message {

		public messageName(): string { return "CMD_ITEMSTORE_GETSALEHIS";}
		public messageValue(): number { return CMD_ITEMSTORE_GETSALEHIS;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ITEMSTORE_QUERY_BUYLOG_CS implements message {

		public messageName(): string { return "CMD_ITEMSTORE_QUERY_BUYLOG";}
		public messageValue(): number { return CMD_ITEMSTORE_QUERY_BUYLOG;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_DO_REFRESH_HALL_VIEW_CS implements message {

		public messageName(): string { return "CMD_DO_REFRESH_HALL_VIEW";}
		public messageValue(): number { return CMD_DO_REFRESH_HALL_VIEW;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_DO_REFRESH_HALL_VIEW_SC implements message {

		public messageName(): string { return "CMD_DO_REFRESH_HALL_VIEW";}
		public messageValue(): number { return CMD_DO_REFRESH_HALL_VIEW;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_GET_BUYUHALL_VERSION_GIFT_CS implements message {

		public messageName(): string { return "CMD_GET_BUYUHALL_VERSION_GIFT";}
		public messageValue(): number { return CMD_GET_BUYUHALL_VERSION_GIFT;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ENTER_BUYUHALL_MOREFUNC_CS implements message {

		public messageName(): string { return "CMD_ENTER_BUYUHALL_MOREFUNC";}
		public messageValue(): number { return CMD_ENTER_BUYUHALL_MOREFUNC;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ENTER_BUYUHALL_MOREFUNC_SC implements message {

		public messageName(): string { return "CMD_ENTER_BUYUHALL_MOREFUNC";}
		public messageValue(): number { return CMD_ENTER_BUYUHALL_MOREFUNC;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZODIAC_ENTERDATA_CS implements message {

		public messageName(): string { return "CMD_ZODIAC_ENTERDATA";}
		public messageValue(): number { return CMD_ZODIAC_ENTERDATA;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZODIAC_ROUND_END_CS implements message {

		public messageName(): string { return "CMD_ZODIAC_ROUND_END";}
		public messageValue(): number { return CMD_ZODIAC_ROUND_END;}

		public encode(buffer: ArrayBuffer, offset: number = 0): number {
			var encodeBuffer = new EncodeBuffer(buffer, offset);
			return encodeBuffer.length();
		}

		public decode(buffer: ArrayBuffer, offset: number = 0): number {
			var decodeBuffer = new DecodeBuffer(buffer, offset);
			return decodeBuffer.length();
		}
	}

	export class CMD_ZODIAC_REFRESHDATA_CS implements message {

		public messageName(): string { return "CMD_ZODIAC_REFRESHDATA";}
		public messageValue(): number { return CMD_ZODIAC_REFRESHDATA;}

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
