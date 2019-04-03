var BaseMgr = require("./mjBaseMgr");
var UserItem = require("./model/mjUserItem");
var CardItem = require("./model/mjCardItem");
var Config = require("./config/mjConfig");
var UiConfig = require("./config/mjUiConfig");

cc.Class({
    extends: BaseMgr,

    properties: {
        m_cardNode: cc.Node,
        m_btnReady: cc.Button,
    },

    initData () {
    	this.m_playerList = {};
        this.m_seatPlayerList = {};
        this.m_selfUserData = null;
        this.m_waitToStartLeftTime = 0;
    },

    initUIView () {
    },

    touchEvent (event) {
        var selfPlayerItem = this.m_seatPlayerList[1];
        if (selfPlayerItem) {
            return selfPlayerItem.cardItem.touchEvent(event);
        }
    },

    //更新玩家
    updatePlayerList (userList) {
        var self = this;

        var selfMid = Global.SelfUserData.mid;
        var selfSeatID;

        //找到自己的seatID
        for (var mid in userList) {
            var userData = userList[mid];
            if (selfMid === mid) {
                selfSeatID = userData.seatID;
                self.m_selfUserData = userData;
                break;
            }
        }

        //没有找到自己的座位号
        if (selfSeatID === undefined) {
            console.log("PPPPPPPPPPPPPPPPPPPPPPPP updatePlayerList 没有找到自己的座位号");
            Global.Tools._debug(userList);
            return;
        }

        //记录当前要刷新的玩家的mid和userData的映射
        var midMap = {};

        //计算每个玩家的本地座位号，同时刷新玩家信息
        for (var mid in userList) {
            var userData = userList[mid];
            var seatID = userData.seatID;
            var localSeatID = seatID - selfSeatID + 1;
            if (localSeatID < 0) {
                localSeatID = localSeatID + Config.PLAYER_NUM;
            }
            userData.localSeatID = localSeatID;
            midMap[userData.mid] = userData;

            var playerItem = self.m_seatPlayerList[localSeatID];
            if (playerItem) {
                playerItem.userItem.updateUserData(userData);
            } else {
                var playerItem = {userData: userData};

                var userItem = new UserItem();
                userItem.init(userData);
                self.node.addChild(userItem);
                playerItem.userItem = userItem;

                var cardItem = new CardItem();
                cardItem.init(userData);
                cardItem.zIndex = UiConfig.CardNode.ItemZIndex[localSeatID]
                self.m_cardNode.addChild(cardItem);
                playerItem.cardItem = cardItem;

                self.m_playerList[userData.mid] = playerItem;
                self.m_seatPlayerList[localSeatID] = playerItem;
            }
        }

        //清除掉已经走了的玩家
        for (var mid in self.m_playerList) {
            if (!midMap[mid]) {
                var playerItem = self.m_playerList[mid];

                var userData = playerItem.userData;
                self.m_seatPlayerList[userData.localSeatID] = null;

                playerItem.userItem.removeFromParent(true);
                playerItem.cardItem.removeFromParent(true);

                playerItem.destroy();
                delete(self.m_playerList[mid]);
            }
        }
    },

    btnReadyClickEvent () {
        Global.Game.m_socketMgr.sendMsg(Global.SocketCmd.USER_READY);
    },

    ////////////////////////////////////消息处理函数begin////////////////////////////////////
    enterRoom (res) {
    	this.updatePlayerList(res.userList);
        this.m_btnReady.node.active = (this.m_selfUserData.ready == 0);
    },

    updateUserList (res) {
        this.updatePlayerList(res.userList);
        this.m_btnReady.node.active = (this.m_selfUserData.ready == 0);
    },

    //游戏开始
    gameStart (res) {
        for (var mid in this.m_playerList) {
            var playerItem = this.m_playerList[mid];
            playerItem.userItem.gameStart(res);
        }
    },

    //回合消息
    roundInfo (res) {
        this.udpateUserGameData(res.userList);
    },

    //玩家操作返回
    opeResponse (res) {

    },
    ////////////////////////////////////消息处理函数end////////////////////////////////////

    ////////////////////////////////////对外接口begin////////////////////////////////////
    //根据mid返回本地座位
    getLocalSeatByMid (mid) {
        var playerItem = this.m_playerList[mid];
        if (!!playerItem) {
            return playerItem.userData.localSeatID;
        }

        return 0;
    },
    ////////////////////////////////////对外接口end////////////////////////////////////

    ////////////////////////////////////功能函数begin////////////////////////////////////
    //刷新玩家游戏数据
    udpateUserGameData (gameUserList) {
        var self = this;

        gameUserList = gameUserList || [];
        for (var tMid in gameUserList) {
            var gameData = gameUserList[tMid];
            var playerItem = self.m_playerList[tMid];

            playerItem.userItem.updateGameData(gameData);
            playerItem.cardItem.updateGameData(gameData);
        }
    },
    ////////////////////////////////////功能函数end////////////////////////////////////
});