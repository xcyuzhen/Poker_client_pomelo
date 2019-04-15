var Config = {};

Config.PLAYER_NUM = 4;

//游戏状态，跟后台保持一致
Config.GAME_STATE = {
	INIT: 0, 																//初始化
	FA_PAI: 1, 																//发牌
	DA_PAI: 2, 																//打牌
	RESULT: 3, 																//结算
	OVER: 4, 																//结束
};

//操作类型，跟后台保持一致
Config.OPE_TYPE = {
	NO_OPT: -1, 															//无操作
	GUO: 0, 																//过
	PENG: 1, 																//碰
	GANG: 2,																//杠
	AN_GANG: 3,																//暗杠
	BU_GANG: 4,																//补杠
	HU: 5,																	//胡
	OUT_CARD: 6, 															//打牌
};

//倍数类型(和后台保持一致)
Config.RATE_TYPE = {
	GANG: 1, 																//被人放杠
	FANG_GANG: 2, 															//给别人放杠
	AN_GANG: 3, 															//暗杠
	BEI_AN_GANG: 4, 														//被暗杠
	BU_GANG: 5, 															//补杠
	BEI_BU_GANG: 6, 														//被补杠
	HU: 7, 																	//胡牌
	BEI_HU: 8, 																//被胡牌
	MO_MA: 9, 																//摸马
	BEI_MA: 10, 															//被摸马
};

//倍数配置
Config.RATE_NAME = {
	[Config.RATE_TYPE.GANG]: "明杠",
	[Config.RATE_TYPE.FANG_GANG]: "放杠",
	[Config.RATE_TYPE.AN_GANG]: "暗杠",
	[Config.RATE_TYPE.BEI_AN_GANG]: "被暗杠",
	[Config.RATE_TYPE.BU_GANG]: "补杠",
	[Config.RATE_TYPE.BEI_BU_GANG]: "被补杠",
	[Config.RATE_TYPE.HU]: "胡牌",
	[Config.RATE_TYPE.BEI_HU]: "被胡牌",
	[Config.RATE_TYPE.MO_MA]: "摸马",
	[Config.RATE_TYPE.BEI_MA]: "被摸马",
};

module.exports = Config;