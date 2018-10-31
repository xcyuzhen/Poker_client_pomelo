cc.Class({
    init () {
    	this.initData();
    	this.requestServerConfig();
    },

    initData () {
    	this.serverConfig = {};
        this.testFlag = "HHHHHHHHHHHHH ";
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
        })
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
        })
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
});
