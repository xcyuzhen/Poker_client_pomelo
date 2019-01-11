const PlayerMgr = require("./playerMgr");

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
        this.m_playerMgr = new PlayerMgr();
        this.m_playerMgr.init();
    },

    btnExitClickEvent () {
        console.log("发起退出房间请求");
    },
});