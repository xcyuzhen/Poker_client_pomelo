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
    	var uiConfig = UiConfig.PlayerNode.UserItem;
        var headPos = self.m_uiConfig.Head.Pos[self.m_seatID];

    	//头像
    	cc.loader.loadRes("prefab/GameHead", function (err, prefab) {
    		var head = cc.instantiate(prefab);
    		head.setAnchorPoint(self.m_uiConfig.Head.Ap[self.m_seatID]);
    		head.setPosition(headPos);
    		self.addChild(head);
    		self.m_head = head;
        });

        //昵称
        var lbNameNode = new cc.Node("Label");
        lbNameNode.setAnchorPoint(self.m_uiConfig.Name.Ap[self.m_seatID]);
        var nameDiff = self.m_uiConfig.Name.Diff[self.m_seatID];
		lbNameNode.setPosition(headPos.x + nameDiff.x, headPos.y + nameDiff.y);
		lbNameNode.setContentSize(self.m_uiConfig.Name.Size);
		self.addChild(lbNameNode);

        var lbName = lbNameNode.addComponent(cc.Label);
		lbName.fontSize = self.m_uiConfig.Name.FontSize;
		lbName.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
		lbName.verticalAlign = cc.Label.VerticalAlign.CENTER;
		lbName.overflow = cc.Label.Overflow.CLAMP;
		lbName.enableWrapText = false;
		lbName.string = self.m_userData.nick;
        self.m_lbName = lbName;

        //金币数量
        var lbGoldNode = new cc.Node("Label");
        lbGoldNode.setAnchorPoint(self.m_uiConfig.Gold.Ap[self.m_seatID]);
        var goldDiff = self.m_uiConfig.Gold.Diff[self.m_seatID];
        lbGoldNode.setPosition(headPos.x + goldDiff.x, headPos.y + goldDiff.y);
        lbGoldNode.setContentSize(self.m_uiConfig.Gold.Size);
        self.addChild(lbGoldNode);

        var lbGold = lbGoldNode.addComponent(cc.Label);
        lbGold.fontSize = self.m_uiConfig.Gold.FontSize;
        lbGold.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        lbGold.verticalAlign = cc.Label.VerticalAlign.CENTER;
        lbGold.overflow = cc.Label.Overflow.CLAMP;
        lbGold.enableWrapText = false;
        lbGold.string = self.m_userData.gold;
        self.m_lbGold = lbGold;

        //准备标记
        var spReadyNode = new cc.Node("Label");
        spReadyNode.setAnchorPoint(self.m_uiConfig.Ready.Ap[self.m_seatID]);
        var readyDiff = self.m_uiConfig.Ready.Diff[self.m_seatID];
        spReadyNode.setPosition(headPos.x + readyDiff.x, headPos.y + readyDiff.y);
        spReadyNode.active = self.m_userData.ready == 1;
        self.addChild(spReadyNode);
        self.m_spReadyNode = spReadyNode;

        var spReady = spReadyNode.addComponent(cc.Sprite);
        cc.loader.loadRes("mj/b3", cc.SpriteFrame, function (err, spriteFrame) {
            var spReady = this;
            spReady.spriteFrame = spriteFrame;
        }.bind(spReady))
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

        self.m_userData = userData;
    },
});