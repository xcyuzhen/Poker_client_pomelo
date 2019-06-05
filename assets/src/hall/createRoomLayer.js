var Words = require('../config/words');

cc.Class({
    extends: cc.Component,

    properties: {
        m_container: cc.Node,
        m_loading: cc.Node,
        m_bg: cc.Node,
        m_btnCreate: cc.Button,
        m_lbDiaNum: cc.Label,
        m_nodeRoundList: [cc.Node],
        m_nodeMaList: [cc.Node],
        m_lbCost: cc.Label,
    },

    onLoad () {
        var self = this;
        self.initData();

        //注册点击事件
        self.node.on(cc.Node.EventType.TOUCH_START, function (event) {}, self);
    },

    initData () {
        this.m_createRoomConfig = null;
        this.m_roundNum = null;
        this.m_costNum = null;
        this.m_maNum = null;
    },

    openView () {
        var self = this;

        if (this.node.active == true) {
            return;
        }

        this.m_container.active = false;
        this.m_loading.active = true;
        this.m_loading.getComponent('animLoading').playAnim();
        this.node.active = true;

        Global.Game.m_socketMgr.sendMsg(Global.SocketCmd.GET_CREATE_FRIEND_ROOM_CONFIG, {gameType: Global.GameID.GT_MJ}, function (data) {
            if (data.code !== Global.Code.OK) {
                console.log(data.code, data.msg);
            } else {
                self.updateView(data.data);
            }
        });
    },

    closeView () {
        this.node.active = false;
        this.m_loading.getComponent('animLoading').stopAnim();
    },

    //更新界面
    updateView (data) {
        var self = this;

        //初始化数据
        self.m_createRoomConfig = data;
        this.m_roundNum = null;
        this.m_costNum = null;
        this.m_maNum = null;

        //局数选择
        var roundConfig = data.costNumConfig;
        for (var i = 0; i < self.m_nodeRoundList.length; i++) {
            (function (index) {
                var node = self.m_nodeRoundList[index];
                var config = roundConfig[index];
                if (!!config) {
                    //添加按钮的点击事件
                    var btnRadio = node.getChildByName("btnRadio").getComponent(cc.Button);
                    var handler = Global.Tools.createClickEventHandler(self.node, "createRoomLayer", "roundRadioClickEvent", {index: index, roundNum: config.roundNum, cost: config.cost})
                    btnRadio.clickEvents = [];
                    btnRadio.clickEvents.push(handler);

                    var desc = config.roundNum + Words.Round;
                    var lbRoundNum = node.getChildByName("lbRoundNum").getComponent(cc.Label);
                    lbRoundNum.string = desc;

                    node.active = true;

                    //设置初始值
                    if (config.roundNum == data.RoundDefault) {
                        self.m_lbCost.string = config.cost;
                        btnRadio.interactable = false;
                        lbRoundNum.node.color = cc.Color.RED;
                        self.m_roundNum = config.roundNum;
                        self.m_costNum = config.cost;
                    } else {
                        btnRadio.interactable = true;
                        lbRoundNum.node.color = cc.Color.WHITE;
                    }
                } else {
                    node.active = false;                                        
                }
            })(i);
        }

        //马数选择
        var maConfig = data.MaNumConfig;
        for (var i = 0; i < self.m_nodeMaList.length; i++) {
            (function (index) {
                var node = self.m_nodeMaList[index];
                var maNum = maConfig[index];
                if (!!maNum) {
                    //添加按钮的点击事件
                    var btnRadio = node.getChildByName("btnRadio").getComponent(cc.Button);
                    var handler = Global.Tools.createClickEventHandler(self.node, "createRoomLayer", "maRadioClickEvent", {index: index, maNum: maNum})
                    btnRadio.clickEvents = [];
                    btnRadio.clickEvents.push(handler);

                    var desc = maNum + Words.Ma;
                    var lbMaNum = node.getChildByName("lbMaNum").getComponent(cc.Label);
                    lbMaNum.string = desc;

                    node.active = true;

                    //设置初始值
                    if (maNum == data.MaDefault) {
                        btnRadio.interactable = false;
                        lbMaNum.node.color = cc.Color.RED;
                        self.m_maNum = maNum;
                    } else {
                        btnRadio.interactable = true;
                        lbMaNum.node.color = cc.Color.WHITE;
                    }
                } else {
                    node.active = false;                                        
                }
            })(i);
        }

        self.m_container.active = true;
        self.m_loading.active = false;
        this.m_loading.getComponent('animLoading').stopAnim();
    },

    roundRadioClickEvent (sender, param) {
        var self = this;

        var index = param.index;
        var cost = param.cost;

        for (var i = 0; i < self.m_nodeRoundList.length; i++) {
            var node = self.m_nodeRoundList[i];
            var btnRadio = node.getChildByName("btnRadio").getComponent(cc.Button);
            btnRadio.interactable = (index != i);

            var lbRoundNumNode = node.getChildByName("lbRoundNum");
            var color = (index == i) ? cc.Color.RED : cc.Color.WHITE;
            lbRoundNumNode.color = color;
        }

        self.m_lbCost.string = cost;
        self.m_roundNum = param.roundNum;
    },

    maRadioClickEvent (sender, param) {
        var self = this;

        var index = param.index;
        var maNum = param.maNum

        for (var i = 0; i < self.m_nodeMaList.length; i++) {
            var node = self.m_nodeMaList[i];
            var btnRadio = node.getChildByName("btnRadio").getComponent(cc.Button);
            btnRadio.interactable = (index != i);

            var lbMaNumNode = node.getChildByName("lbMaNum");
            var color = (index == i) ? cc.Color.RED : cc.Color.WHITE;
            lbMaNumNode.color = color;
        }

        this.m_maNum = maNum;
    },

    //创建房间按钮点击事件
    createRoomClickEvent (sender) {
        var self = this;

        //判断自己的金币或者钻石是否足够
        var costType = self.m_createRoomConfig.costType;
        if (costType == 1) {
            if (Global.SelfUserData.gold < self.m_costNum) {
                Global.MsgBoxMgr.showMsgBox({content: Words.CreateRoomErrMsg1});
                return;
            }
        } else if (costType == 2) {
            if (Global.SelfUserData.diamond < self.m_costNum) {
                Global.MsgBoxMgr.showMsgBox({content: Words.CreateRoomErrMsg2});
                return;
            }
        }
    },
});
