var UiConfig = require("./config/mjUiConfig");

cc.Class({
    extends: cc.Component,

    properties: {
        m_roomInfoMgr: cc.Component,
        m_playerMgr: cc.Component,
        m_opeMgr: cc.Component,
        m_animMgr: cc.Component,
        m_msgMgr: cc.Component,
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
        this.m_opeMgr.init();
        this.m_animMgr.init();
        this.m_msgMgr.init();

        this.roomState = Global.RoomState.UN_INITED;
    },

    socketMsgGet (data) {
        this.m_gameNet.socketMsgGet(data);
    },

    commonMsgHandler (funcName, res) {
        if (res.roomState) {
            this.roomState = res.roomState;
        }

        this.m_roomInfoMgr.commonMsgHandler(funcName, res);
        this.m_playerMgr.commonMsgHandler(funcName, res);
        this.m_opeMgr.commonMsgHandler(funcName, res);
        this.m_animMgr.commonMsgHandler(funcName, res);
        this.m_msgMgr.commonMsgHandler(funcName, res);
    },
});