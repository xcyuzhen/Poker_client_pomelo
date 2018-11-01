cc.Class({
    extends: cc.Component,

    properties: {
        animLoadingPrefab: cc.Prefab,
        btnGuest: cc.Button,
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
        var autoLogin = false;
        if (autoLogin) {
            //自动登录

        } else {
            //手动登录
            this.m_animLoading.active = false;
            this.m_animLoading.getComponent('animLoading').stopAnim();
            this.btnGuest.node.active = true;
        }
    },

    //游客登录按钮点击事件
    guestLogin () {
        var self = this;

        self.btnGuest.node.active = false;
        self.m_animLoading.active = true;
        self.m_animLoading.getComponent('animLoading').playAnim();

        var udid = Global.Tools.getUdid()
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
            if (data.code !== 200) {
                console.log("登录失败，code = " + data.code);
            } else {
                Global.SelfUserData.setUserData(data.userData);
            }
        })
    },
});
