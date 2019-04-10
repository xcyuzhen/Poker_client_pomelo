var BaseMgr = require("./mjBaseMgr");

cc.Class({
    extends: BaseMgr,

    properties: {
        m_spGameStart: cc.Sprite,
    },

    ////////////////////////////////////消息处理函数begin////////////////////////////////////
    //游戏开始
    gameStart () {
    	var self = this;

        Global.Room.m_gameNet.pauseMsgHandle();

    	self.m_spGameStart.node.active = true;
    	self.m_spGameStart.node.scale = 3.0;
    	self.m_spGameStart.node.opacity = 0;

    	self.m_spGameStart.node.runAction(cc.sequence(
    		cc.spawn(
    			cc.fadeIn(0.25),
    			cc.scaleTo(0.25, 1.0)
    		),
    		cc.delayTime(1.0),
    		cc.spawn(
    			cc.fadeOut(0.25),
    			cc.scaleTo(0.25, 1.5)
    		),
    		cc.callFunc(function () {
    			self.m_spGameStart.node.stopAllActions();
    			self.m_spGameStart.node.active = false;
                Global.Room.m_gameNet.resumeMsgHandle();
    		})
    	));
    },

    //玩家操作返回
    opeResponse (res) {
        if (res.code == Global.Code.OK) {

        }
    },
    ////////////////////////////////////消息处理函数end////////////////////////////////////

    ////////////////////////////////////功能函数begin////////////////////////////////////
    //碰牌动画
    playPengAnim () {

    },

    //杠牌动画
    playGangAnim () {

    },

    //胡牌动画
    playHuAnim () {

    },
    ////////////////////////////////////功能函数end////////////////////////////////////
});