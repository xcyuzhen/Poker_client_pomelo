var UserData = require("./mjUserData");
var UiConfig = require("../config/mjUiConfig");

cc.Class({
    extends: cc.Node,

    init (data) {
    	this.m_userData = new UserData();
    	this.m_userData.init(data);
    	this.m_seatID = data.localSeatID;

    	//uiConfig
    	this.m_uiConfig = UiConfig.PlayerNode.UserItem;

    	this.initData();
    	this.initUIView();
    },

    initData () {

    },

    //初始化界面
    initUIView () {
    	var self = this;

        var containerNode = new cc.Node();
        containerNode.setContentSize(self.m_uiConfig.Container.Size);
        containerNode.setAnchorPoint(self.m_uiConfig.Container.Ap[self.m_seatID]);
        containerNode.setPosition(self.m_uiConfig.Container.Pos[self.m_seatID]);
        self.addChild(containerNode);
        self.m_containerNode = containerNode;

        var headPos = self.m_uiConfig.Head.Pos[self.m_seatID];

    	//头像
    	cc.loader.loadRes("prefab/GameHead", function (err, prefab) {
    		var head = cc.instantiate(prefab);
    		head.setAnchorPoint(self.m_uiConfig.Head.Ap[self.m_seatID]);
    		head.setPosition(headPos);
    		self.m_containerNode.addChild(head);
    		self.m_head = head;
        });

        //昵称
        var lbNameNode = new cc.Node("Label");
        lbNameNode.setAnchorPoint(self.m_uiConfig.Name.Ap[self.m_seatID]);
        var nameDiff = self.m_uiConfig.Name.Diff[self.m_seatID];
		lbNameNode.setPosition(headPos.x + nameDiff.x, headPos.y + nameDiff.y);
		lbNameNode.setContentSize(self.m_uiConfig.Name.Size);
		self.m_containerNode.addChild(lbNameNode, 1);

        var lbName = lbNameNode.addComponent(cc.Label);
		lbName.fontSize = self.m_uiConfig.Name.FontSize;
		lbName.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
		lbName.verticalAlign = cc.Label.VerticalAlign.CENTER;
		lbName.overflow = cc.Label.Overflow.CLAMP;
		lbName.enableWrapText = false;
		lbName.string = self.m_userData.nick;
        self.m_lbName = lbName;

        //金币数量
        var lbGold = Global.UiFactory.createLabel(self.m_userData.gold, self.m_uiConfig.Gold.FontSize);
        lbGold.node.setAnchorPoint(self.m_uiConfig.Gold.Ap[self.m_seatID]);
        var goldDiff = self.m_uiConfig.Gold.Diff[self.m_seatID];
        lbGold.node.setPosition(headPos.x + goldDiff.x, headPos.y + goldDiff.y);
        lbGold.node.setContentSize(self.m_uiConfig.Gold.Size);
        self.m_containerNode.addChild(lbGold.node, 1);

        lbGold.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        lbGold.verticalAlign = cc.Label.VerticalAlign.CENTER;
        lbGold.overflow = cc.Label.Overflow.CLAMP;
        lbGold.enableWrapText = false;
        self.m_lbGold = lbGold;

        //庄家Icon
        var spZhuangIcon = Global.UiFactory.createSprite("mj/b4");
        spZhuangIcon.node.setAnchorPoint(self.m_uiConfig.ZhuangIcon.Ap[self.m_seatID]);
        var zhuangDiff = self.m_uiConfig.ZhuangIcon.Diff[self.m_seatID];
        spZhuangIcon.node.setPosition(headPos.x + zhuangDiff.x, headPos.y + zhuangDiff.y);
        spZhuangIcon.node.active = false;
        self.m_containerNode.addChild(spZhuangIcon.node, 1);
        self.m_spZhuangIconNode = spZhuangIcon.node;

        //准备标记
        var spReady = Global.UiFactory.createSprite("mj/b3");
        spReady.node.setAnchorPoint(self.m_uiConfig.Ready.Ap[self.m_seatID]);
        var readyDiff = self.m_uiConfig.Ready.Diff[self.m_seatID];
        spReady.node.setPosition(headPos.x + readyDiff.x, headPos.y + readyDiff.y);
        var isPlaying = Global.Room.roomState === Global.RoomState.PLAYING;
        var showReady = (!isPlaying) && (self.m_userData.ready === 1);
        spReady.node.active = showReady;
        self.m_containerNode.addChild(spReady.node, 1);
        self.m_spReadyNode = spReady.node;
    },

    getUserData () {
        return this.m_userData;
    },

    updateUserData (userData) {
        var self = this;

        if (self.m_userData.mid !== userData.mid) {
            console.log("座位 " + self.m_seatID + " 玩家更换");

            //更新头像

            //更新昵称
            self.m_lbName.string = userData.nick;
        }

        //更新金币数量
        self.m_lbGold.string = userData.gold;

        //准备标记
        var isPlaying = Global.Room.roomState === Global.RoomState.PLAYING;
        var showReady = (!isPlaying) && (userData.ready === 1);
        self.m_spReadyNode.active = showReady;

        self.m_userData = userData;
    },

    //游戏开始
    gameStart (res) {
        var self = this;
        var zhuangMid = res.zhuangMid;

        var action = cc.sequence(
            cc.delayTime(1.25),
            cc.callFunc(function () {
                self.m_spReadyNode.active = false;
                self.m_spZhuangIconNode.active = (self.m_userData.mid == zhuangMid);

                //开始飞
                self.m_containerNode.runAction(cc.moveTo(0.25, self.m_uiConfig.Container.Pos1[self.m_seatID]));
            })
        );
        self.m_containerNode.runAction(action);
    },
});