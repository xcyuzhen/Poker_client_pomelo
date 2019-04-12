var BaseMgr = require("./mjBaseMgr");
var Config = require("./config/mjConfig");
var UiConfig = require("./config/mjUiConfig");

cc.Class({
    extends: BaseMgr,

    properties: {
    },

    initData () {
        this.m_uiData = UiConfig.ResultNode;
    },

    ////////////////////////////////////消息处理函数begin////////////////////////////////////
    //游戏结束
    resultInfo (res) {
        var self = this;

        var huMid = res.huMid;
        var maList = res.maList;
        var userList = res.userList;

        //亮牌
        Global.Room.m_playerMgr.redrawAllShowCards(userList);

        if (huMid) {
            console.log("RRRRRRRRRRRRRRRRRRRRRRRR 1.开始播放胡牌动画");
            //播放胡牌动画
            var huLocalSeatID = Global.Room.m_playerMgr.getLocalSeatByMid(huMid);
            Global.Room.m_animMgr.playHuAnim(huLocalSeatID, function () {
                console.log("RRRRRRRRRRRRRRRRRRRRRRRR 1.播放胡牌动画完毕");
                console.log("RRRRRRRRRRRRRRRRRRRRRRRR 2.开始播放摸马动画");
                //播放摸马动画
                Global.Room.m_animMgr.playMoMaAnim(maList, function () {
                    console.log("RRRRRRRRRRRRRRRRRRRRRRRR 2.播放摸马动画完毕");
                    console.log("RRRRRRRRRRRRRRRRRRRRRRRR 3.开始显示结算界面");
                    self.showResultPanel();
                });
            });
        } else {
            console.log("RRRRRRRRRRRRRRRRRRRRRRRR 1.开始播放流局动画");
            //播放流局动画
            Global.Room.m_animMgr.playLiuJuAnim(maList, function () {
                console.log("RRRRRRRRRRRRRRRRRRRRRRRR 1.播放流局动画完毕");
            });
        }
    },
    ////////////////////////////////////消息处理函数end////////////////////////////////////

    ////////////////////////////////////功能函数begin////////////////////////////////////
    showResultPanel () {

    },
    ////////////////////////////////////功能函数end////////////////////////////////////
});