cc.Class({
    init () {
    	this.initData();
    	this.loadSetting();
    },

    initData () {
    	this.gameSettingConfig = {};
    },

    //加载本地设置
    loadSetting () {
    	var gameSettingStr = cc.sys.localStorage.getItem('gameSetting');
    	if (!!gameSettingStr) {
    		//存在本地配置，直接读取
    		this.gameSettingConfig = JSON.parse(gameSettingStr);
    	} else {
    		//不存在本地配置，初始化
    		this.gameSettingConfig.serverType = "dev";

    		//存储设置
    		cc.sys.localStorage.setItem('gameSetting', JSON.stringify(this.gameSettingConfig));
    	}
    },
});
