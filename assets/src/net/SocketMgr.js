cc.Class({
    init () {
    	this.initData();
    	this.requestServerConfig();
    },

    initData () {
    	this.serverConfig = {};
    },

    //拉取服务端配置
    requestServerConfig () {
    	var self = this;

        Global.Game.m_httpMgr.httpGet(Global.ServerConfigUrl[Global.Game.m_gameSettingMgr.gameSettingConfig.serverType], function (res) {
    		var serverConfig = JSON.parse(res);

    		console.log("AAAAAAAAAAAAAAAA ");
    		Global.Tools._debug(serverConfig);

    		self.serverConfig = serverConfig[Global.Game.m_gameSettingMgr.gameSettingConfig.serverType];
        })
    },

    login (loginType, callBack) {
    	var self = this;

    	if (loginType === Global.LoginType.GUEST) {
    		var params = {
    			system:"win32",
    			platform:"1",
    			loginType:loginType,
    			token:"",
    			udid:"yuzhenudidguest1",
    			appid:"yuzhenudidguest1",
    			appkey:"",
    			appsecret:"",
    			username:"",
    			password:"",
    		}

    		console.log("初始化 Pomelo " + self.serverConfig.Server.host + ", " + self.serverConfig.Server.port);

    		Global.Pomelo.init({
    			host: self.serverConfig.Server.host,
    			port: self.serverConfig.Server.port,
    			log: true
    		}, function () {
    			Global.Pomelo.request('gate.gateHandler.queryEntry', {udid: params.udid}, function (data) {
    				console.log("queryEntry 成功 ");
    				Global.Tools._debug(data);

    				Global.Pomelo.disconnect();
    				if (data.code !== 0) {
    					cc.log(data.error);
    					return
    				}

    				console.log("初始化 Pomelo " + data.host + ", " + data.port);

    				Global.Pomelo.init({
		    			host: data.host,
		    			port: data.port,
		    			log: true
		    		}, function () {
		    			Global.Pomelo.request('connector.entryHandler.login', params, function (data) {
		    				if (data.code !== 0) {
		    					cc.log(data.error);
		    					return
		    				}

		    				
		    			})
		    		})
    			})
    		})
    	} else if (loginType === Global.LoginType.WEIXIN) {

    	}
    },
});
