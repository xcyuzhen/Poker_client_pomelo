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

    onLoad () {
        var self = this;

        self.m_container.on(cc.Node.EventType.TOUCH_START, function (event) {
            return true;
        }, self);
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
            return;
        }

        var curOpeList = res.curOpeList;
        var opeNum = curOpeList.length;

        if (opeNum <= 0) {
            self.m_container.active = false;
            return;
        }

        var hasPengOpe = false;
        var pengData;
        var hasGangOpe = false;
        var gangOpeList = [];
        var hasHuOpe = false;
        var huData;

        for (var i = 0; i < opeNum; i++) {
        	var opeType = curOpeList[i].opeType;
        	var opeData = curOpeList[i].opeData;

            switch (opeType) {
                case Config.OPE_TYPE.PENG:
                    hasPengOpe = true;
                    pengData = opeData;
                    break;
                case Config.OPE_TYPE.GANG:
                case Config.OPE_TYPE.BU_GANG:
                    hasGangOpe = true;
                    gangOpeList.push({opeType: opeType, opeData: [opeData, opeData, opeData, opeData]});
                    break;
                case Config.OPE_TYPE.AN_GANG:
                    hasGangOpe = true;
                    gangOpeList.push({opeType: opeType, opeData: [-1, -1, -1, opeData]});
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

        //添加过按钮点击事件
        if (opeNum > 0) {
            var handler = Global.Tools.createClickEventHandler(self.node, "mjOpeMgr", "opeBtnClickEvent", {opeType: Config.OPE_TYPE.GUO, opeData: -1});
            self.m_btnGuo.clickEvents = [];
            self.m_btnGuo.clickEvents.push(handler);
        }

        //添加胡牌按钮点击事件
        if (hasHuOpe) {
            var handler = Global.Tools.createClickEventHandler(self.node, "mjOpeMgr", "opeBtnClickEvent", {opeType: Config.OPE_TYPE.HU, opeData: huData});
            self.m_btnHu.clickEvents = [];
            self.m_btnHu.clickEvents.push(handler);
        }

        //添加碰牌按钮点击事件
        if (hasPengOpe) {
            var handler = Global.Tools.createClickEventHandler(self.node, "mjOpeMgr", "opeBtnClickEvent", {opeType: Config.OPE_TYPE.PENG, opeData: huData});
            self.m_btnPeng.clickEvents = [];
            self.m_btnPeng.clickEvents.push(handler);
        }

        //杠牌列表和杠牌按钮点击事件
        if (gangOpeList.length > 1) {
            self.m_btnGang.interactable = false;

            for (var i = 0; i < self.m_gangList.length; i++) {
                var gangNode = self.m_gangList[i];
                var gangData = gangOpeList[i];
                if (gangData) {
                    var opeType = gangData.opeType;
                    var opeData = gangData.opeData;

                    for (var j = 1; j <= 4; j++) {
                        var cardName = "card" + j;
                        var cardNode = gangNode.getChildByName(cardName);
                        var cardResName = self.getOpeCardRes(opeData[j - 1]);
                        var frame = Global.ResMgr.CardAtlas.getSpriteFrame(cardResName);
                        cardNode.getComponent(cc.Sprite).spriteFrame = frame;
                    }

                    //重置点击事件
                    var handler = Global.Tools.createClickEventHandler(self.node, "mjOpeMgr", "opeBtnClickEvent", {opeType: opeType, opeData: opeData[3]});
                    var button = gangNode.getComponent(cc.Button);
                    button.clickEvents = [];
                    button.clickEvents.push(handler);

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
            if (gangOpeList.length == 1) {
                self.m_btnGang.interactable = true;

                var gangData = gangOpeList[0];
                var handler = Global.Tools.createClickEventHandler(self.node, "mjOpeMgr", "opeBtnClickEvent", {opeType: gangData.opeType, opeData: gangData.opeData[3]});
                self.m_btnGang.clickEvents = [];
                self.m_btnGang.clickEvents.push(handler);
            }
        }

        self.m_container.active = (opeNum > 0);
    },
    ////////////////////////////////////消息处理函数end////////////////////////////////////

    ////////////////////////////////////对外接口begin////////////////////////////////////
    //是否轮到自己出牌
    isSelfOutCard () {
        return Global.Tools.isSelf(this.m_curOutCardMid);
    },
    ////////////////////////////////////对外接口end////////////////////////////////////

    ////////////////////////////////////功能函数begin////////////////////////////////////
    //操作按钮点击事件
    opeBtnClickEvent (sender, opeObj) {
        var opeType = opeObj.opeType;
        var opeData = opeObj.opeData;

        console.log("OOOOOOOOOOOOOOOOOOO 请求操作 ", opeType, opeData);
    },

    //请求出牌
    requestOutCard (cardValue) {
        console.log("OOOOOOOOOOOOOOOOOOO 请求出牌 ", cardValue);
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
    ////////////////////////////////////功能函数end////////////////////////////////////
});