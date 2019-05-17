window.Global = {};

Global.Code = {
	OK: 200, 
};

Global.ServerConfigUrl = {
	dev: 'http://127.0.0.1:3001/serverconfig',
	test: 'http://127.0.0.1:3001/serverconfig',
	formal: 'http://127.0.0.1:3001/serverconfig',
};

Global.LoginType = {
	GUEST: "guest",
	WEIXIN: "wechat",
};

Global.GameID = {
	GT_MJ: 1,
	GT_DDZ: 2,
};

//msg分组(和后台配置保持一致)
Global.MsgGroupName = {
	HALL: "HallGroup",
	[Global.GameID.GT_MJ]: "MjGroup",
	[Global.GameID.GT_DDZ]: "DdzGroup",
};

//房间场景名字配置
Global.RoomSceneName = {
	[Global.GameID.GT_MJ]: "MJRoomScene",
	[Global.GameID.GT_DDZ]: "DDZRoomScene",
};

Global.GroupItemResConfig = [
	"hall/e1",
	"hall/e2",
	"hall/e3",
	"hall/e4",
];

Global.FriendRoomNumLength = 6;

//房间状态(和后台配置保持一致)
Global.RoomState = {
	UN_INITED: 0, 						//房间未初始化
	INITED: 1, 							//初始化完成
	WAIT_TO_START: 2,					//人全部到齐，等待开局
	PLAYING: 3, 						//开局中
	ROUND_END: 4, 						//第一局结束，第二局还没开始
};