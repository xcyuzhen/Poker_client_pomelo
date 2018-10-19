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

        Global.Game.m_httpMgr.httpGet(Global.serverConfigUrl[Global.Game.m_gameSettingMgr.gameSettingConfig.serverType], function (res) {
    		var serverConfig = JSON.parse(res);
    		self.serverConfig = serverConfig[Global.Game.m_gameSettingMgr.gameSettingConfig.serverType];
    		Global.Tools._debug(self.serverConfig)
        })
    },
});
