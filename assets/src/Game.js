var pomelo = require('./pomelo/pomelo-client')
var GameSettingMgr = require('./GameSettingMgr')
var NetMgr = require('./net/NetMgr')

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        cc.game.addPersistRootNode(this.node);
        this.init();
    },

    start () {
        cc.director.loadScene("LoginScene");
    },

    update (dt) {
    },

    init () {
        this.initData();

        this.m_gameSettingMgr = new GameSettingMgr();
        this.m_gameSettingMgr.init();

        this.m_netMgr = new NetMgr();
        this.m_netMgr.init();
    },

    initData () {
        Global.game = this;
        Global.pomelo = pomelo;
    },
});