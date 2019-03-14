module.exports = {
    PLAYER_NUM: 4,

    //游戏状态，跟后台保持一致
	GAME_STATE: {
		INIT: 0, 																//初始化
		FA_PAI: 1, 																//发牌
		DA_PAI: 2, 																//打牌
		RESULT: 3, 																//结算
		OVER: 4, 																//结束
	},

    //操作类型，跟后台保持一致
    OPE_TYPE: {
		NO_OPT: -1, 															//无操作
		GUO: 0, 																//过
		PENG: 1, 																//碰
		GANG: 2,																//杠
		AN_GANG: 3,																//暗杠
		BU_GANG: 4,																//补杠
		HU: 5,																	//胡
		CHU_PAI: 6,																//出牌
	},
};