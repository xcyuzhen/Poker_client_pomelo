var UserData = require("src/mj/model/mjUserData");
var UiConfig = require("src/mj/config/mjUiConfig");

cc.Class({
    extends: cc.Node,

    init (data) {
    	this.userData = new UserData();
    	this.userData.init(data);
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

    	var uiConfig = UiConfig.PlayerNode.UserItem

    	//头像
    	cc.loader.loadRes("prefab/GameHead", function (err, prefab) {
    		var head = cc.instantiate(prefab);
    		head.setAnchorPoint(self.m_uiConfig.Head.Ap[self.m_seatID]);
    		head.setPosition(self.m_uiConfig.Head.Pos[self.m_seatID]);
    		self.addChild(head);
    		self.m_head = head;
        });

        //昵称
        var lbNameNode = new cc.Node("Label");
        lbNameNode.setAnchorPoint(self.m_uiConfig.Name.Ap[self.m_seatID]);
		lbNameNode.setPosition(self.m_uiConfig.Name.Pos[self.m_seatID]);
		lbNameNode.setContentSize(self.m_uiConfig.Name.Size);
		self.addChild(lbNameNode);

        var lbName = lbNameNode.addComponent(cc.Label);
		lbName.fontSize = self.m_uiConfig.Name.FontSize;
		lbName.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
		lbName.verticalAlign = cc.Label.VerticalAlign.CENTER;
		lbName.overflow = cc.Label.Overflow.CLAMP;
		lbName.enableWrapText = false;
		lbName.string = self.userData.nick;
        self.m_lbName = lbName;
    },
});