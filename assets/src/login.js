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
        var userIndex = self.m_loginUserIndex;

        // for (var i = 0; i < self.btnGuestList.length; i++) {
        //     var btn = self.btnGuestList[i];
        //     btn.node.active = false;
        // }

        // self.btnGuest.node.active = false;

        var udid = Global.Tools.getUdid()
        if (!!userIndex) {
            udid += userIndex;
        }

        var params = {
            system: "win32",
            platform: "1",
            loginType: Global.LoginType.GUEST,
            token: "",
            udid: udid,
            appid: udid,
            appkey: "",
            appsecret: "",
            username: "",
            password: "",
        }

        Global.Game.m_socketMgr.sendMsg(Global.SocketCmd.LOGIN, params, function (data) {
            if (data.code !== Global.Code.OK) {
                console.log("登录失败，code = " + data.code);
            } else {
                Global.SelfUserData.setUserData(data.userData);
                Global.GameList = data.gameList;

                cc.director.loadScene("HallScene", function () {
                    Global.GlobalLoading.setLoadingVisible(false);
                });
            }
        });
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
});
