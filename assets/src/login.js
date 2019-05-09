cc.Class({
    extends: cc.Component,

    properties: {
        animLoadingPrefab: cc.Prefab,
        // btnGuest: cc.Button,
        btnGuestList: [cc.Button],
    },

    onLoad () {
        //创建loading
        this.m_animLoading = cc.instantiate(this.animLoadingPrefab);
        this.node.addChild(this.m_animLoading);
        this.m_animLoading.setPosition(0, 0);
        this.m_animLoading.getComponent('animLoading').playAnim();
    },

    onDestroy () {
        this.m_animLoading.removeFromParent(true);
    },

    //socket连接成功
    socketConnected () {
        this.loginCheck();
    },

    //登录检测
    loginCheck () {
        var self = this;

        var autoLogin = false;
        if (autoLogin) {
            //自动登录

        } else {
            //手动登录
            self.m_animLoading.active = false;
            self.m_animLoading.getComponent('animLoading').stopAnim();
            // self.btnGuest.node.active = true;

            for (var i = 0; i < self.btnGuestList.length; i++) {
                var btn = self.btnGuestList[i];
                btn.node.active = true;
            }
        }
    },

    //游客登录按钮点击事件
    guestLogin (sender, userIndex) {
        var self = this;

        for (var i = 0; i < self.btnGuestList.length; i++) {
            var btn = self.btnGuestList[i];
            btn.node.active = false;
        }

        // self.btnGuest.node.active = false;
        self.m_animLoading.active = true;
        self.m_animLoading.getComponent('animLoading').playAnim();

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

                cc.director.loadScene("HallScene");
            }
        });
    },
});
