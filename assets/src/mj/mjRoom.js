const PlayerMgr = require("./playerMgr");
const CardMgr = require("./cardMgr");

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
        this.m_gameNet.updateTime(dt);
    },

    init () {
        this.initData();
    },

    initData () {
        Global.Room = this;
        this.m_playerMgr = new PlayerMgr();
        this.m_playerMgr.init();

        this.m_cardMgr = new CardMgr();
        this.m_cardMgr.init();

        this.m_gameNet = this.getComponent("gameNet");
        this.m_gameNet.init();
    },

    socketMsgGet (data) {
        this.m_gameNet.socketMsgGet(data);
    },

    commonMsgHandler (funcName, res) {
        this.m_playerMgr[funcName](res);
        this.m_cardMgr[funcName](res);
    },

    btnExitClickEvent () {
        Global.Game.m_socketMgr.sendMsg(Global.SocketCmd.USER_LEAVE, {}, function (data) {
            if (data.code !== 200) {
                console.log(data.msg);
            } else {
                cc.director.loadScene("HallScene");
            }
        })
    },
});