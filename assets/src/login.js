cc.Class({
    extends: cc.Component,

    properties: {
        // btnGuest: cc.Button,
        btnGuestList: [cc.Button],
    },

    onLoad () {
        this.initData();
    },

    start () {
        this.loginCheck();
    },

    initData () {
        this.m_loginUserIndex = null;
    },

    //socket连接成功
    socketConnected () {
        var self = this;

        // for (var i = 0; i < self.btnGuestList.length; i++) {
        //     var btn = self.btnGuestList[i];
        //     btn.node.active = false;
        // }

        // self.btnGuest.node.active = false;

        Global.Game.m_socketMgr.login(self.m_loginUserIndex);
    },

    //登录检测
    loginCheck () {
        var self = this;

        var autoLogin = false;
        if (autoLogin) {
            //自动登录

        } else {
            //手动登录
            // self.btnGuest.node.active = true;

            for (var i = 0; i < self.btnGuestList.length; i++) {
                var btn = self.btnGuestList[i];
                btn.node.active = true;
            }
        }
    },

    //游客登录按钮点击事件
    guestLogin (sender, userIndex) {
        Global.GlobalLoading.setLoadingVisible(true);

        this.m_loginUserIndex = userIndex;
        Global.Game.m_socketMgr.connectSocket();
    },

    //登录成功
    loginSucceed () {
        cc.director.loadScene(Global.SceneNameMap.SNM_HALL, function () {
            Global.Game.checkInGame();
        });
    },
});
