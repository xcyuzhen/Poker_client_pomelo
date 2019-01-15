cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.init();
    },

    onDestroy () {
        Global.Room = null;
    },

    start () {
    },

    update (dt) {
        var data = Global.Game.m_socketMgr.popOneMsgData();
        if (!!data) {
            
        }
    },

    init () {
        this.initData();
    },

    initData () {
        Global.Room = this;
    },

    btnExitClickEvent () {
        console.log("发起退出房间请求");
    },
});