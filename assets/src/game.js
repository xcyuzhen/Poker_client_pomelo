require('./tools/stringExtra');
var pomelo = require('./pomelo/pomelo-client');
var GameSettingMgr = require('./gameSettingMgr');
var HttpMgr = require('./net/httpMgr');
var SocketMgr = require('./net/socketMgr');
var UserData = require('./model/userData');
var HallUiConfig = require('./config/hallUiConfig');

cc.Class({
    extends: cc.Component,

    properties: {
        m_msgBoxMgr: cc.Component,
    },

    onLoad () {
        cc.game.addPersistRootNode(this.node);
        cc.game.addPersistRootNode(this.m_msgBoxMgr.node);
        this.init();

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
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

        this.m_msgBoxMgr.node.zIndex = HallUiConfig.ZIndexConfig.MsgBox;
    },

    initData () {
        Global.Tools = require('./tools/tools');
        Global.Debug = require('./tools/debug');
        Global.UiFactory = require('./tools/uiFactory');
        Global.Pomelo = pomelo;
        Global.Game = this;
        Global.MsgBoxMgr = this.m_msgBoxMgr;
        Global.SelfUserData = new UserData();
        Global.GameList = {};
    },

    //从游戏返回大厅
    backHallFromGame () {
        cc.director.loadScene("HallScene");
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

    onKeyUp (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.l:
                Global.Debug.doTest();
                break;
        }
    },
});