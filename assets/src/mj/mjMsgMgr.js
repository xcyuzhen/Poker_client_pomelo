var BaseMgr = require("./mjBaseMgr");

cc.Class({
    extends: BaseMgr,

    ////////////////////////////////////消息处理函数begin////////////////////////////////////
    userKick (res) {
    	var msg = res.msg;
    	Global.Game.backHallFromGame();
    	Global.MsgBoxMgr.showMsgBox({content: msg});
    }
    ////////////////////////////////////消息处理函数end////////////////////////////////////
});