var UiConfig = require("src/mj/config/mjUiConfig");

cc.Class({
    extends: cc.Component,

    properties: {
        m_roomInfoMgr: cc.Component,
        m_playerMgr: cc.Component,
        m_cardMgr: cc.Component,
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
        this.m_gameNet.updateTime(dt);
    },

    init () {
        this.initData();
    },

    initData () {
        Global.Room = this;

        this.m_gameNet = this.getComponent("mjGameNet");
        this.m_gameNet.init();
        this.m_roomInfoMgr.init();
        this.m_playerMgr.init();
        this.m_cardMgr.init();

        this.roomInited = false;
    },

    socketMsgGet (data) {
        this.m_gameNet.socketMsgGet(data);
    },

    commonMsgHandler (funcName, res) {
        this.m_roomInfoMgr[funcName](res);
        this.m_playerMgr[funcName](res);
        this.m_cardMgr[funcName](res);

        //设置房间初始化标记位
        if (funcName === "enterRoom") {
            this.roomInited = true;
        }
    },
});