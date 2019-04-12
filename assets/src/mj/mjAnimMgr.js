var BaseMgr = require("./mjBaseMgr");
var Config = require("./config/mjConfig");
var UiConfig = require("./config/mjUiConfig");

cc.Class({
    extends: BaseMgr,

    properties: {
        m_spGameStart: cc.Sprite,
        m_spPeng: cc.Sprite,
        m_spGang: cc.Sprite,
        m_spHu: cc.Sprite,
        m_spLiuJu: cc.Sprite,
        m_moMaNode: cc.Node,
        m_maCardList: [cc.Sprite],
        m_maNumNode: cc.Node,
        m_lbMaNum: cc.Label,
    },

    initData () {
        this.m_uiData = UiConfig.AnimNode;
    },

    initUIView () {
        var self = this;

        self.m_moMaNode.on(cc.Node.EventType.TOUCH_START, function () {});
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
        var self = this;

        if (res.code == Global.Code.OK) {
            var startCb = function () {
                Global.Room.m_gameNet.pauseMsgHandle();
            }

            var endCb = function () {
                Global.Room.m_gameNet.resumeMsgHandle();
            }

            var opeLocalSeatID = Global.Room.m_playerMgr.getLocalSeatByMid(res.opeMid);

            switch (res.opeType) {
                case Config.OPE_TYPE.PENG:
                    startCb();
                    self.playPengAnim(opeLocalSeatID, endCb);
                    break;
                case Config.OPE_TYPE.GANG:
                case Config.OPE_TYPE.AN_GANG:
                case Config.OPE_TYPE.BU_GANG:
                    startCb();
                    self.playGangAnim(opeLocalSeatID, endCb);
                    break;
            }
        }
    },
    ////////////////////////////////////消息处理函数end////////////////////////////////////

    ////////////////////////////////////功能函数begin////////////////////////////////////
    //碰牌动画
    playPengAnim (localSeatID, cb) {
        var self = this;

        if (Global.Tools.seatCheck(localSeatID)) {
            var uiData = self.m_uiData.PengGangAnim;
            self.m_spPeng.node.setAnchorPoint(uiData.Sp.Ap);
            self.m_spPeng.node.setPosition(uiData.Sp.Pos[localSeatID]);
            self.m_spPeng.node.setScale(uiData.Anim.StartScale);
            self.m_spPeng.node.opacity = 255,
            self.m_spPeng.node.active = true;

            self.m_spPeng.node.runAction(cc.sequence(
                cc.scaleTo(uiData.Anim.ScaleTime, uiData.Anim.endScale),
                cc.callFunc(function () {
                    if (!!cb) {
                        cb();
                    }
                }),
                cc.delayTime(uiData.Anim.StayTime),
                cc.spawn(
                    cc.fadeOut(uiData.Anim.FadeOutTime),
                    cc.scaleTo(uiData.Anim.FadeOutTime, uiData.Anim.FadeScale)
                )
            ));
        } else {
            if (!!cb) {
                cb();
            }
        }
    },

    //杠牌动画
    playGangAnim (localSeatID, cb) {
        var self = this;

        if (Global.Tools.seatCheck(localSeatID)) {
            var uiData = self.m_uiData.PengGangAnim;
            self.m_spGang.node.setAnchorPoint(uiData.Sp.Ap);
            self.m_spGang.node.setPosition(uiData.Sp.Pos[localSeatID]);
            self.m_spGang.node.setScale(uiData.Anim.StartScale);
            self.m_spGang.node.opacity = 255,
            self.m_spGang.node.active = true;

            self.m_spGang.node.runAction(cc.sequence(
                cc.scaleTo(uiData.Anim.ScaleTime, uiData.Anim.endScale),
                cc.callFunc(function () {
                    if (!!cb) {
                        cb();
                    }
                }),
                cc.delayTime(uiData.Anim.StayTime),
                cc.spawn(
                    cc.fadeOut(uiData.Anim.FadeOutTime),
                    cc.scaleTo(uiData.Anim.FadeOutTime, uiData.Anim.FadeScale)
                )
            ));
        } else {
            if (!!cb) {
                cb();
            }
        }
    },

    //胡牌动画
    playHuAnim (localSeatID, cb) {
        var self = this;

        if (Global.Tools.seatCheck(localSeatID)) {
            var uiData = self.m_uiData.HuAnim;
            self.m_spHu.node.setAnchorPoint(uiData.Sp.Ap);
            self.m_spHu.node.setPosition(uiData.Sp.Pos[localSeatID]);
            self.m_spHu.node.setScale(uiData.Anim.StartScale);
            self.m_spHu.node.opacity = 255,
            self.m_spHu.node.active = true;

            self.m_spHu.node.runAction(cc.sequence(
                cc.scaleTo(uiData.Anim.ScaleTime, uiData.Anim.endScale),
                cc.delayTime(uiData.Anim.StayTime),
                cc.callFunc(function () {
                    if (!!cb) {
                        cb();
                    }
                }),
                cc.spawn(
                    cc.fadeOut(uiData.Anim.FadeOutTime),
                    cc.scaleTo(uiData.Anim.FadeOutTime, uiData.Anim.FadeScale)
                )
            ));
        } else {
            if (!!cb) {
                cb();
            }
        }
    },

    //流局动画
    playLiuJuAnim (cb) {
        var self = this;

        var uiData = self.m_uiData.LiuJuAnim;
        self.m_spLiuJu.node.setAnchorPoint(uiData.Sp.Ap);
        self.m_spLiuJu.node.setPosition(uiData.Sp.Pos);
        self.m_spLiuJu.node.setScale(uiData.Anim.StartScale);
        self.m_spLiuJu.node.opacity = 255,
        self.m_spLiuJu.node.active = true;

        self.m_spLiuJu.node.runAction(cc.sequence(
            cc.scaleTo(uiData.Anim.ScaleTime, uiData.Anim.endScale),
            cc.delayTime(uiData.Anim.StayTime),
            cc.callFunc(function () {
                if (!!cb) {
                    cb();
                }
            }),
            cc.spawn(
                cc.fadeOut(uiData.Anim.FadeOutTime),
                cc.scaleTo(uiData.Anim.FadeOutTime, uiData.Anim.FadeScale)
            )
        ));
    },

    //摸马动画
    playMoMaAnim (maList, cb) {
        var self = this;

        //还原界面显示
        self.m_maNumNode.active = false;
        for (var i = 0; i < self.m_maCardList.length; i++) {
            var cardImgName = UiConfig.CardResConfig.MaCardRes.format("back");
            self.m_maCardList[i].spriteFrame = Global.ResMgr.CardAtlas.getSpriteFrame(cardImgName);
            self.m_maCardList[i].node.color = cc.Color.WHITE;
        }

        self.m_moMaNode.active = true;

        var uiData = self.m_uiData.MoMaAnim;

        maList = maList || [];
        var zhongNum = 0;

        var showMaNumCB = function () {
            for (var i = 0; i < maList.length; i++) {
                var maItem = maList[i];
                if (maItem.result == 1) {
                    zhongNum ++;
                    var maCard = self.m_maCardList[i];
                    maCard.node.color = new cc.Color(230, 130, 130);
                }
            }

            self.m_lbMaNum.string = ("x" + zhongNum);
            self.m_maNumNode.active = true;
        }

        var maCardAnim = function (index) {
            var maCard = self.m_maCardList[index];
            var maItem = maList[index];

            var delayTime = (index + 1) * uiData.MaCardShowDelayTime;
            var cardImgName = UiConfig.CardResConfig.MaCardRes.format(maItem.cardValue);
            maCard.node.runAction(cc.sequence(
                cc.delayTime(delayTime),
                cc.callFunc(function () {
                    maCard.spriteFrame = Global.ResMgr.CardAtlas.getSpriteFrame(cardImgName);
                    if (index == maList.length - 1) {
                        maCard.node.runAction(cc.sequence(
                            cc.delayTime(uiData.MaNumNodeDelayTime),
                            cc.callFunc(function () {
                                showMaNumCB();
                            }),
                            cc.delayTime(uiData.NodeDelayTime),
                            cc.callFunc(function () {
                                self.m_moMaNode.active = false;
                                if (!!cb) {
                                    cb();
                                }
                            })
                        ));
                    }
                })
            ));
        }

        for (var i = 0; i < maList.length; i++) {
            maCardAnim(i);
        }
    },
    ////////////////////////////////////功能函数end////////////////////////////////////
});