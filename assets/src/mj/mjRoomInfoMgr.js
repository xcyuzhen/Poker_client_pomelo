var BaseMgr = require("./mjBaseMgr");
var UiConfig = require("./config/mjUiConfig");

cc.Class({
    extends: BaseMgr,

    properties: {
        m_lbGroupName: cc.Label,
        m_lbLeftTime: cc.Label,
        m_lbLeftCardsNum: cc.Label,
        m_turnplate: cc.Node,
        m_turnplate1: cc.Node,
    },

    onDestroy () {
        this.stopTimer();
    },

    initData () {
        this.m_uiData = UiConfig.RoomInfoNode;

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
            if (data.code !== Global.Code.OK) {
                console.log(data.msg);
            } else {
                cc.director.loadScene("HallScene");
            }
        })
    },

    ////////////////////////////////////消息处理函数begin////////////////////////////////////
    enterRoom (res) {
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

    updateUserList (res) {
        var roomState = Global.Room.roomState;
        if (roomState != Global.RoomState.WAIT_TO_START) {
            this.stopTimer(true);
        }
    },

    //等待玩家准备
    waitUserReady (res) {
        var leftTime = res.leftTime;
        this.startTimer(leftTime);
    },

    gameStart (res) {
        this.stopTimer(true);
    },

    roundInfo (res) {
        this.updateRoundLeftCardsNum(res);
        this.udpateRoundTurnplate(res);

        var leftTime = res.leftTime;
        this.startTimer(leftTime);
    },

    resultInfo (res) {
        this.m_turnplate.active = false;
        this.m_turnplate1.active = true;

        this.stopTimer(true);
    },
    ////////////////////////////////////消息处理函数end////////////////////////////////////

    ////////////////////////////////////功能函数begin////////////////////////////////////
    //开始计时器
    startTimer (leftTime) {
        var self = this;
        self.stopTimer();

        leftTime = parseInt(leftTime) || 0;
        var actionNode = new cc.Node();
        actionNode.name = "TimerActionNode";
        actionNode.parent = self.node;
        var seqAction = cc.sequence([
            cc.delayTime(1),
            cc.callFunc(function () {
                leftTime -= 1000;
                if (leftTime <= 0) {
                    leftTime = 0;
                    self.stopTimer();
                }
                self.m_lbLeftTime.string = Global.Tools.getFormatNumber((leftTime / 1000), 2);
            })
        ]);
        actionNode.runAction(cc.repeatForever(seqAction));

        self.m_lbLeftTime.string = Global.Tools.getFormatNumber((leftTime / 1000), 2);
    },

    //停止计时器
    stopTimer (reset) {
        var self = this;

        var actionNode = this.node.getChildByName("TimerActionNode");
        if (!!actionNode) {
            actionNode.removeFromParent(true);
        }

        if (reset) {
            self.m_lbLeftTime.string = Global.Tools.getFormatNumber(0, 2);
        }
    },

    //刷新剩余牌张数
    updateRoundLeftCardsNum (res) {
        var leftCardsNum = parseInt(res.leftCardsNum);
        if (leftCardsNum < 0) {
            this.m_lbLeftCardsNum.string = "";
        } else {
            var str = "剩余{0}张";
            this.m_lbLeftCardsNum.string = str.format(leftCardsNum);
        }
    },

    //刷新转盘
    udpateRoundTurnplate (res) {
        var curOutCardLocalSeatID = Global.Room.m_playerMgr.getLocalSeatByMid(res.curOpeMid);
        var rotateAngle = this.m_uiData.Turnplate.RotateAngle[curOutCardLocalSeatID];
        if (rotateAngle != undefined && rotateAngle != null) {
            this.m_turnplate.rotation = rotateAngle;

            this.m_turnplate.active = true;
            this.m_turnplate1.active = false;
        } else {
            this.m_turnplate.active = false;
            this.m_turnplate1.active = true;
        }
    },
    ////////////////////////////////////功能函数end////////////////////////////////////
});