cc.Class({
    extends: cc.Component,

    properties: {
        m_spNumList: [cc.Sprite],
        m_btnNumList: [cc.Button],
    },

    onLoad () {
        var self = this;
        self.initData();

        //注册点击事件
        self.node.on(cc.Node.EventType.TOUCH_START, function (event) {}, self);
    },

    initData () {
        this.m_roomNumList = [];
    },

    openView () {
        if (this.node.active == true) {
            return;
        }

        this.btnResetClickEvent();
        this.node.active = true;
    },

    closeView () {
        this.node.active = false;
    },

    btnNumClickEvent (sender, num) {
        if (this.m_roomNumList.length >= Global.FriendRoomNumLength) {
            return;
        }

        var newIndex = this.m_roomNumList.length;
        this.m_spNumList[newIndex].spriteFrame = Global.ResMgr.Num4[num];
        this.m_spNumList[newIndex].node.active = true;
        this.m_roomNumList.push(num);

        if (this.m_roomNumList.length >= Global.FriendRoomNumLength) {
            var roomNum = parseInt(this.m_roomNumList.join(''));
            console.log("AAAAAAAAAAAAA 请求加入房间 ", roomNum);
        }
    },

    btnResetClickEvent (sender) {
        this.m_roomNumList = [];
        for (var i = 0; i < this.m_spNumList.length; i++) {
            this.m_spNumList[i].node.active = false;
        }
    },

    btnDelClickEvent (sender) {
        if (this.m_roomNumList.length <= 0) {
            return;
        }

        this.m_roomNumList.splice(-1, 1);
        this.m_spNumList[this.m_roomNumList.length].node.active = false;
    },
});
