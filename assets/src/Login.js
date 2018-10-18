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

        this.loginCheck();
    },

    onDestroy () {
        this.m_animLoading.removeFromParent(true);
    },

    //登录检测
    loginCheck () {
        var autoLogin = false;
        if (autoLogin) {
            //自动登录

        } else {
            //手动登录
            this.m_animLoading.active = false;
            this.btnGuest.node.active = true;
        }
    },

    //游客登录按钮点击事件
    guestLogin () {
    	
    },
});
