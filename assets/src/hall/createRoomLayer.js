cc.Class({
    extends: cc.Component,

    properties: {
        m_container: cc.Node,
        m_loading: cc.Node,
        m_bg: cc.Node,
        m_roundContainer: cc.Node,
        m_payTypeContainer: cc.Node,
        m_btnCreate: cc.Button,
        m_lbDiaNum: cc.Label,
    },

    onLoad () {
        var self = this;
        self.initData();

        //注册点击事件
        self.node.on(cc.Node.EventType.TOUCH_START, function (event) {}, self);
    },

    initData () {
        this.m_roundNum = null;
        this.m_payType = null;
        this.m_roundRadioItemList = {};
        this.m_payTypeRadioItemList = {};
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

        var startPosX = 0, startPosY = 0;
        var diffX = 200, diffY = -70;
        var numPerRow = 2;
        self.m_roundContainer.removeAllChildren(true);
        self.m_roundRadioItemList = {};
        var roundConfig = data.costNumConfig;
        for (var i = 0; i < roundConfig.length; i++) {
            (function (index) {
                var config = roundConfig[index];
                var desc = config.roundNum + "局";
                var radioItem = self.createRadioItem(desc, function (sender) {
                    for (var tmpRoundNum in self.m_roundRadioItemList) {
                        var tmpRadioItem = self.m_roundRadioItemList[tmpRoundNum];
                        self.changeRadioStatus(tmpRadioItem, (config.roundNum == tmpRoundNum));
                        if (config.roundNum == tmpRoundNum) {
                            self.m_roundNum = config.roundNum;
                        }
                    }
                });

                var rowIndex = Math.floor(index / numPerRow) + 1;
                var columnIndex = (index % numPerRow) + 1;
                var posX = startPosX + (columnIndex - 1) * diffX;
                var posY = startPosY + (rowIndex - 1) * diffY;
                radioItem.setPosition(posX, posY);
                self.m_roundContainer.addChild(radioItem);

                self.m_roundRadioItemList[config.roundNum] = radioItem;
            })(i);
        }

        self.m_payTypeContainer.removeAllChildren(true);
        self.m_payTypeRadioItemList = {};

        self.m_container.active = true;
        self.m_loading.active = false;
        this.m_loading.getComponent('animLoading').stopAnim();
    },

    //创建单选项
    //desc:                 文字描述
    //btnClickEventCB:      按钮点击回调
    createRadioItem (desc, btnClickEventCB) {
        var node = new cc.Node();
        node.setAnchorPoint(cc.v2(0, 0));

        var width = 0, height = 0;
        var posX = 0, posY = 0;

        //创建radioBtn
        var btnScale = 0.5;
        var btnRadio = Global.UiFactory.createButton(Global.ResMgr.RadioBtnNor);
        btnRadio.transition = cc.Button.Transition.SPRITE;
        btnRadio.normalSprite = Global.ResMgr.RadioBtnNor;
        btnRadio.pressedSprite = Global.ResMgr.RadioBtnNor;
        btnRadio.hoverSprite = Global.ResMgr.RadioBtnNor;
        btnRadio.disabledSprite = Global.ResMgr.RadioBtnDis;
        btnRadio.node.scale = btnScale;
        btnRadio.node.setAnchorPoint(cc.v2(0, 0));
        btnRadio.node.setPosition(posX, posY);
        btnRadio.node.name = "BtnRadio";
        node.addChild(btnRadio.node);
        //添加按钮事件


        posX += btnRadio.node.width * btnScale;
        height = Math.max(height, btnRadio.node.height*btnScale);

        //创建描述lb
        var lbDesc = Global.UiFactory.createLabel(desc, 26);
        lbDesc.lineHeight = 26;
        lbDesc.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        lbDesc.verticalAlign = cc.Label.VerticalAlign.BOTTOM;
        lbDesc.overflow = cc.Label.Overflow.NONE;
        lbDesc.enableWrapText = false;
        lbDesc.node.setAnchorPoint(cc.v2(0, 0));
        lbDesc.node.setPosition(posX, posY);
        lbDesc.node.name = "LbDesc";
        node.addChild(lbDesc.node);
        lbDesc._updateRenderData(true);

        posX += lbDesc.node.width;
        width = posX;
        height = Math.max(height, lbDesc.node.height);

        node.width = width;
        node.height = height;

        console.log("AAAAAAA BBBBBBB ", width, height);

        //校正位置
        btnRadio.node.setAnchorPoint(cc.v2(0, 0.5));
        btnRadio.node.y = height / 2;
        lbDesc.node.setAnchorPoint(cc.v2(0, 0.5));
        lbDesc.node.y = height / 2;

        return node;
    },

    //改变单选想的状态
    changeRadioStatus (radioItem, sel) {
        var btnRadioNode = radioItem.getChildByName("BtnRadio");
        var btnRadio = btnRadioNode.getComponent(cc.Button);
        btnRadio.interactable = (!!sel);
    },
});
