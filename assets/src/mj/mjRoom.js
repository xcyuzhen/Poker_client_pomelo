var UiConfig = require("./config/mjUiConfig");

cc.Class({
    extends: cc.Component,

    properties: {
        m_roomInfoMgr: cc.Component,
        m_playerMgr: cc.Component,
        m_opeMgr: cc.Component,
        m_animMgr: cc.Component,
        m_resultMgr: cc.Component,
        m_msgMgr: cc.Component,
    },

    onLoad () {
        this.init();
    },

    onDestroy () {
        this.node.targetOff(this);
        Global.UserItemList = null;
        Global.CardItemList = null;
        Global.ResMgr = null;
        Global.Room = null;
    },

    start () {
        var self = this;

        self.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            self.touchEvent(event);
        }, self);

        self.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            self.touchEvent(event);
        }, self);

        self.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.touchEvent(event);
        }, self);
    },

    update (dt) {
        this.m_gameNet.updateTime(dt);
    },

    init () {
        this.initData();
    },

    initData () {
        Global.Room = this;
        Global.ResMgr = this.getComponent("mjResMgr");
        Global.UserItemList = {};
        Global.CardItemList = {};

        this.m_gameNet = this.getComponent("mjGameNet");
        this.m_gameNet.init();
        this.m_roomInfoMgr.init();
        this.m_playerMgr.init();
        this.m_opeMgr.init();
        this.m_animMgr.init();
        this.m_resultMgr.init();
        this.m_msgMgr.init();

        this.roomState = Global.RoomState.UN_INITED;
    },

    touchEvent (event) {
        this.m_playerMgr.touchEvent(event);
    },

    socketMsgGet (data) {
        this.m_gameNet.socketMsgGet(data);
    },

    commonMsgHandler (funcName, res) {
        if (res.roomState) {
            this.roomState = res.roomState;
        }

        if (this[funcName]) {
            this[funcName](res);
        }

        this.m_roomInfoMgr.commonMsgHandler(funcName, res);
        this.m_playerMgr.commonMsgHandler(funcName, res);
        this.m_opeMgr.commonMsgHandler(funcName, res);
        this.m_animMgr.commonMsgHandler(funcName, res);
        this.m_resultMgr.commonMsgHandler(funcName, res);
        this.m_msgMgr.commonMsgHandler(funcName, res);
    },

    //清理桌子
    clearTable () {
        this.m_roomInfoMgr.clearTable();
        this.m_playerMgr.clearTable();
        this.m_opeMgr.clearTable();
        this.m_animMgr.clearTable();
        this.m_resultMgr.clearTable();
        this.m_msgMgr.clearTable();
    },

    //拉取断线重连消息
    reloadGame () {
        Global.Game.m_socketMgr.sendMsg(Global.SocketCmd.RELOAD_GAME, {});
    },
});