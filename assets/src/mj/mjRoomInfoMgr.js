var BaseMgr = require("./mjBaseMgr");

cc.Class({
    extends: BaseMgr,

    properties: {
        m_lbGroupName: cc.Label,
    },

    initData () {
    	for (var index in Global.GameList) {
            var config = Global.GameList[index];
            if (config.id === Global.GameID.GT_MJ) {
                this.gameConfig = config;
                break
            }
        }
    },

    initUIView () {
    },

    btnExitClickEvent () {
        Global.Game.m_socketMgr.sendMsg(Global.SocketCmd.USER_LEAVE, {}, function (data) {
            if (data.code !== 200) {
                console.log(data.msg);
            } else {
                cc.director.loadScene("HallScene");
            }
        })
    },

    ////////////////////////////////////消息处理函数begin////////////////////////////////////
    enterRoom (res) {
        Global.Tools._debug(res)

        var level = res.roomData.level;
        for (var index in this.gameConfig.groupList) {
            var config = this.gameConfig.groupList[index];
            if (config.level === level) {
                this.groupConfig = config;
                break;
            }
        }

        this.m_lbGroupName.string = this.groupConfig.name;
    },
    ////////////////////////////////////消息处理函数end////////////////////////////////////
});