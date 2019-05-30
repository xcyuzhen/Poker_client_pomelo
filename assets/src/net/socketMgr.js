var Words = require('../config/words');

cc.Class({
    init () {
    	this.initData();
        this.initPomeloEvent();
    },

    initData () {
        this.m_msgList = {};                                //消息列表
    	this.m_serverConfig = {};                           //服务器配置

        this.m_recTime = 0;                                 //重连次数
        this.m_maxRecTime = 3;                              //最大重复连接次数

        this.m_loginUserIndex = null;                       //当前登录的玩家index
    },

    //注册各种消息的回调
    initPomeloEvent () {
        var self = this;

        //收到推送消息
        Global.Pomelo.on('onSocketMsg', function(data) {
            console.log("SSSSSSSSSSSSSSSSSSSSSSS socketMgr 收到推送消息");
            console.log(JSON.stringify(data.res));

            var groupName = data.groupName;
            switch (groupName) {
                case Global.MsgGroupName.HALL:
                    var curScene = cc.director.getScene();
                    if (curScene.getName() === "HallScene") {
                        var hall = curScene.getChildByName("Canvas").getComponent("hall");
                        hall.socketMsgGet(data);
                    }
                    break;
                default:
                    if (Global.Room) {
                        Global.Room.socketMsgGet(data);
                    } else {
                        self.m_msgList[groupName] = self.m_msgList[groupName] || [];
                        self.m_msgList[groupName].push(data);
                    }
            }
        });

        //socket连接心跳超时
        Global.Pomelo.on('heartbeat timeout', function () {
            Global.GlobalLoading.setLoadingVisible(true);

            console.log("SSSSSSSSSSSSSSSSSSSSSSS 网络连接超时，开始重连");
            self.connectSocket();
        });

        //socket连接失败
        Global.Pomelo.on('io-error', function () {
            self.m_recTime++;
            console.log("SSSSSSSSSSSSSSSSSSSSSSS 重连第%d次失败", self.m_recTime);
            if (self.m_recTime >= self.m_maxRecTime) {
                console.log("SSSSSSSSSSSSSSSSSSSSSSS 网络断开，稍后再试");
                self.m_recTime = 0;
                Global.GlobalLoading.setLoadingVisible(false);
                Global.MsgBoxMgr.showMsgBox({content: Words.SocketRecFaildMsg, clickEventCallBack: function () {
                    Global.GlobalLoading.setLoadingVisible(true);
                    self.connectSocket();
                    Global.MsgBoxMgr.closeMsgBox();
                }});
            } else {
                self.connectSocket();
            }
        });
    },

    //拉取服务端配置
    requestServerConfig () {
    	var self = this;

        Global.Game.m_httpMgr.httpGet(Global.ServerConfigUrl[Global.Game.m_gameSettingMgr.gameSettingConfig.serverType], function (res) {
    		var serverConfig = JSON.parse(res);
    		self.m_serverConfig = serverConfig[Global.Game.m_gameSettingMgr.gameSettingConfig.serverType];

            console.log("拉取服务端配置成功");
            Global.Tools._debug(self.m_serverConfig);
        });
    },

    connectSocket () {
        var self = this;
        console.log("开始连接socket");

        Global.Pomelo.init({
            host: self.m_serverConfig.Server.host,
            port: self.m_serverConfig.Server.port,
            log: true
        }, function () {
            Global.Pomelo.request('gate.gateHandler.queryEntry', {udid: Global.Tools.getUdid()}, function (data) {
                console.log("获取分配的服务端ip和port");
                Global.Tools._debug(data);
                console.log("开始连接目标服务器");

                Global.Pomelo.disconnect();

                if (data.code !== Global.Code.OK) {
                    cc.log(data.error);
                    return
                }

                Global.Pomelo.init({
                    host: data.host,
                    port: data.port,
                    log: true
                }, function () {
                    console.log("连接目标服务器成功");
                    self.socketConnected();
                })
            })
        });
    },

    //socket连接成功
    socketConnected () {
        this.m_recTime = 0;
        Global.Game.socketConnected();
    },

    sendMsg (cmd, params, cb) {
        params = params || {};
        params.socketCmd = cmd;

        console.log("------ send msg ------");
        console.log(JSON.stringify(params));

        if (!! cb) {
            Global.Pomelo.request('connector.socketMsgHandler.socketMsg', params, cb)
        } else {
            Global.Pomelo.notify('connector.socketMsgHandler.socketMsg', params)
        }
    },

    //暂停消息处理
    paushMsgHandle () {
        this.msgPause = true;
        this.curMsgFrame = 0;
    },

    //恢复消息处理
    resumeMsgHandle () {
        this.msgPause = false;
        this.curMsgFrame = 0;
    },

    //根据groupName获取消息
    getMsgDataByGroup (groupName) {
        var resultMsgList = this.m_msgList[groupName] || [];
        this.m_msgList[groupName] = [];
        
        return resultMsgList;
    },

    //删除groupName的所有消息
    delMsgDataByGroup (groupName) {
        delete(this.m_msgList[groupName]);
    },

    //登录
    login (userIndex) {
        var self = this;

        if (userIndex >= 0) {
            self.m_loginUserIndex = userIndex;
        }

        var udid = Global.Tools.getUdid()
        if (!!self.m_loginUserIndex) {
            udid += self.m_loginUserIndex;
        }

        var params = {
            system: "win32",
            platform: "1",
            loginType: Global.LoginType.GUEST,
            token: "",
            udid: udid,
            appid: udid,
            appkey: "",
            appsecret: "",
            username: "",
            password: "",
        }

        self.sendMsg(Global.SocketCmd.LOGIN, params, function (data) {
            if (data.code !== Global.Code.OK) {
                console.log("登录失败，code = " + data.code);
            } else {
                Global.SelfUserData.setUserData(data.userData);
                Global.GameList = data.gameList;

                Global.Game.loginSucceed();

                cc.director.loadScene("HallScene", function () {
                    Global.GlobalLoading.setLoadingVisible(false);
                });
            }
        });
    },
});
