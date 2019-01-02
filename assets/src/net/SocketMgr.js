cc.Class({
    init () {
    	this.initData();
        this.initPomeloEvent();
    	this.requestServerConfig();
    },

    initData () {
        this.msgList = {};                              //消息列表
    	this.serverConfig = {};
    },

    //注册各种消息的回调
    initPomeloEvent () {
        var self = this;

        Global.Pomelo.on('onSocketMsg', function(data) {
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
                        this.msgList[groupName] = this.msgList[groupName] || [];
                        self.msgList[groupName].push(data);
                    }
            }
        });
    },

    //拉取服务端配置
    requestServerConfig () {
    	var self = this;

        Global.Game.m_httpMgr.httpGet(Global.ServerConfigUrl[Global.Game.m_gameSettingMgr.gameSettingConfig.serverType], function (res) {
    		var serverConfig = JSON.parse(res);
    		self.serverConfig = serverConfig[Global.Game.m_gameSettingMgr.gameSettingConfig.serverType];

            console.log("拉取服务端配置成功");
            Global.Tools._debug(self.serverConfig);

            //连接socket
            self.connectSocket();
        });
    },

    connectSocket () {
        var self = this;
        console.log("开始连接socket");

        Global.Pomelo.init({
            host: self.serverConfig.Server.host,
            port: self.serverConfig.Server.port,
            log: true
        }, function () {
            Global.Pomelo.request('gate.gateHandler.queryEntry', {udid: Global.Tools.getUdid()}, function (data) {
                console.log("获取分配的服务端ip和port");
                Global.Tools._debug(data);
                console.log("开始连接目标服务器");

                Global.Pomelo.disconnect();

                if (data.code !== 200) {
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
        var msgList = this.msgList[groupName] || [];
        
        return msgList;
    },

    //删除groupName的所有消息
    delMsgDataByGroup (groupName) {
        delete(this.msgList[groupName]);
    },
});
