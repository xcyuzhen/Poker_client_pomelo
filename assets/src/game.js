var pomelo = require('src/pomelo/pomelo-client')
var GameSettingMgr = require('src/gameSettingMgr')
var HttpMgr = require('src/net/httpMgr')
var SocketMgr = require('src/net/socketMgr')
var UserData = require('src/model/userData')

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

        this.m_httpMgr = new HttpMgr();
        this.m_httpMgr.init();

        this.m_socketMgr = new SocketMgr();
        this.m_socketMgr.init();
    },

    initData () {
        Global.Tools = require('src/tools/tools');
        Global.Pomelo = pomelo;
        Global.Game = this;
        Global.SelfUserData = new UserData();
        Global.GameList = {};
    },

    //socket连接成功
    socketConnected () {
        //如果是登录界面
        var curScene = cc.director.getScene();
        if (curScene.getName() === "LoginScene") {
            var login = curScene.getChildByName("Canvas").getComponent("login");
            login.socketConnected();
        }
    },
});