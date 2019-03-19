var BaseMgr = require("./mjBaseMgr");
var UiConfig = require("./config/mjUiConfig");
var Config = require("./config/mjConfig");

cc.Class({
    extends: BaseMgr,

    properties: {
    	m_container: cc.Node,
    	m_btnGuo: cc.Button,
        m_btnHu: cc.Button,
        m_btnPeng: cc.Button,
        m_btnGang: cc.Button,
    	m_gangList: [cc.Node],
    },

    initData () {
    	this.m_curOpeMid = 0; 										//当前操作人
    	this.m_curOutCardMid = 0; 									//当前轮到的出牌人
    },

    initUIView () {
        //隐藏操作面板
        this.m_container.active = false;
    },

    ////////////////////////////////////消息处理函数begin////////////////////////////////////
    roundInfo (res) {
        var self = this;

        self.m_curOpeMid = res.curOpeMid;
        self.m_curOutCardMid = res.curOutCardMid;

        //当前操作人不是自己，隐藏操作面板
        if (!Global.Tools.isSelf(self.m_curOpeMid)) {
            self.m_container.active = false;
            return
        }

        var curOpeList = res.curOpeList;
        var hasPengOpe = false;
        var pengData;
        var hasGangOpe = false;
        var gangList = [];
        var hasHuOpe = false;
        var huData;

        var opeNum = curOpeList.length;
        for (var i = 0; i < opeNum - 1; i++) {
        	var opeType = curOpeList[i].opeType;
        	var opeData = curOpeList[i].opeData;

            switch (opeType) {
                case Config.OPE_TYPE.PENG:
                    hasPengOpe = true;
                    pengData = parseInt(opeData);
                    break;
                case Config.OPE_TYPE.GANG:
                case Config.OPE_TYPE.BU_GANG:
                    hasGangOpe = true;
                    gangList.push([opeData, opeData, opeData, opeData]);
                    break;
                case Config.OPE_TYPE.AN_GANG:
                    hasGangOpe = true;
                    gangList.push([-1, -1, -1, opeData]);
                    break;
                case Config.OPE_TYPE.HU:
                    hasHuOpe = true;
                    huData = opeData;
                    break;
            }
        }

        self.m_btnGuo.node.active = (opeNum > 0);
        self.m_btnHu.node.active = hasHuOpe;
        self.m_btnPeng.node.active = hasPengOpe;
        self.m_btnGang.node.active = hasGangOpe;

        //杠牌列表
        if (gangList.length > 1) {
            self.m_btnGang.enabled = false;

            for (var i = 0; i < self.m_gangList.length; i++) {
                var gangNode = self.m_gangList[i];
                var gangData = gangList[i];
                if (gangData) {
                    for (var j = 1; j <= 4; j++) {
                        var cardName = "card" + j;
                        var cardNode = gangNode.getChildByName(cardName);
                        var cardResName = self.getOpeCardRes(gangData[j - 1]);
                        var frame = Global.ResMgr.CardAtlas.getSpriteFrame(cardResName);
                        cardNode.getComponent(cc.Sprite).spriteFrame = frame;
                    }

                    gangNode.active = true;
                } else {
                    gangNode.active = false;
                }
            }
        } else {
            //隐藏杠牌列表
            for (var i = 0; i < self.m_gangList.length; i++) {
                self.m_gangList[i].active = false;
            }

            //如果有一个杠牌操作，直接绑定杠牌按钮点击事件
            if (gangList.length == 1) {
                self.m_btnGang.enabled = true;
                var handler = Global.Tools.createClickEventHandler(self.node, "mjOpeMgr", "btnGangClickEvent", gangList[0][3]);
                self.m_btnGang.clickEvents = [];
                self.m_btnGang.clickEvents.push(handler);
            }
        }

        self.m_container.active = (opeNum > 0);
    },
    ////////////////////////////////////消息处理函数end////////////////////////////////////

    //杠点击事件
    btnGangClickEvent (opeData) {
        console.log("AAAAAAAAAAAAAA 杠牌 ", opeData);
    },

    //获取杠牌和碰牌的资源
    getOpeCardRes (cardValue) {
        var cardPathStr = UiConfig.CardResConfig.ExtraCardRes["1"];
        if (cardValue == -1) {
            return cardPathStr.format("back")
        } else {
            return cardPathStr.format(cardValue)
        }
    },
});