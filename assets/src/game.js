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
        m_globalLoading: cc.Component,
    },

    onLoad () {
        cc.game.addPersistRootNode(this.node);
        cc.game.addPersistRootNode(this.m_msgBoxMgr.node);
        cc.game.addPersistRootNode(this.m_globalLoading.node);
        this.init();

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    start () {
        var self = this;

        cc.director.loadScene(Global.SceneNameMap.SNM_LOGIN, function () {
            self.m_socketMgr.requestServerConfig();
        });
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
        this.m_globalLoading.node.zIndex = HallUiConfig.ZIndexConfig.GlobalLoading;
    },

    initData () {
        Global.Tools = require('./tools/tools');
        Global.Debug = require('./tools/debug');
        Global.UiFactory = require('./tools/uiFactory');
        Global.Pomelo = pomelo;
        Global.Game = this;
        Global.MsgBoxMgr = this.m_msgBoxMgr;
        Global.GlobalLoading = this.m_globalLoading;
        Global.ResMgr = this.node.getComponent("resMgr");
        Global.SelfUserData = new UserData();
        Global.GameList = {};
    },

    //从游戏返回大厅
    backHallFromGame () {
        cc.director.loadScene(Global.SceneNameMap.SNM_HALL);
    },

    //检测是否在游戏中
    checkInGame () {
        // this.m_socketMgr.sendMsg(Global.SocketCmd.RELOAD_GAME, {});
        Global.GlobalLoading.setLoadingVisible(false);
    },

    //socket连接成功
    socketConnected () {
        var curScene = cc.director.getScene();
        var sceneName = curScene.getName();
        if (sceneName == Global.SceneNameMap.SNM_LOGIN) {
            //在登录界面
            var login = curScene.getChildByName("Canvas").getComponent("login");
            login.socketConnected();
        } else {
            //在其他场景连接socket成功，登录
            this.m_socketMgr.login();
        }
    },

    //登录成功
    loginSucceed () {
        var curScene = cc.director.getScene();
        var sceneName = curScene.getName();
        if (sceneName == Global.SceneNameMap.SNM_LOGIN) {
            var login = curScene.getChildByName("Canvas").getComponent("login");
            login.loginSucceed();
        } else if (sceneName == Global.SceneNameMap.SNM_HALL) {
            var hall = curScene.getChildByName("Canvas").getComponent("hall");
            hall.loginSucceed();
        } else if (!!Global.Room) {
            //在游戏场景中
            Global.Room.reloadGame();
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