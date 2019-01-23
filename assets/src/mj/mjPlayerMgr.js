var BaseMgr = require("./mjBaseMgr");
var UserItem = require("./model/mjUserItem");
var Config = require("./config/mjConfig");

cc.Class({
    extends: BaseMgr,

    initData () {
    	this.m_playerList = {};
        this.m_seatPlayerList = {};
        this.m_selfUserData = null;
    },

    initUIView () {
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
                console.log("PPPPPPPPPPPPPPPPPPPPPPPP 座位 " + localSeatID + " 有人在，直接刷新信息");
                playerItem.updateUserData(userData);
            } else {
                console.log("PPPPPPPPPPPPPPPPPPPPPPPP 座位 " + localSeatID + " 没有人，创建新玩家");
                var userItem = new UserItem();
                userItem.init(userData);
                self.node.addChild(userItem);
                self.m_playerList[userData.mid] = userItem;
                self.m_seatPlayerList[localSeatID] = userItem;
            }
        }

        //清除掉已经走了的玩家
        for (var mid in self.m_playerList) {
            if (!midMap[mid]) {
                console.log("PPPPPPPPPPPPPPPPPPPPPPPP 玩家 " + mid + " 离开，清除数据");
                var playerItem = self.m_playerList[mid];

                var userData = playerItem.getUserData()
                self.m_seatPlayerList[userData.localSeatID] = null;

                playerItem.destroy();
                delete(self.m_playerList[mid]);
            }
        }
    },

    ////////////////////////////////////消息处理函数begin////////////////////////////////////
    enterRoom (res) {
    	this.updatePlayerList(res.userList);
    },

    userEnter (res) {
        var userData = res.userData;
        var selfSeatID = this.m_selfUserData.seatID;

        var localSeatID = userData.seatID - selfSeatID + 1;
        if (localSeatID < 0) {
            localSeatID = localSeatID + Config.PLAYER_NUM;
        }
        userData.localSeatID = localSeatID;

        var playerItem = this.m_seatPlayerList[localSeatID];
        if (playerItem) {
            console.log("PPPPPPPPPPPPPPPPPPPPPPPP 座位 " + localSeatID + " 有人在，直接刷新信息");
            playerItem.updateUserData(userData);
        } else {
            console.log("PPPPPPPPPPPPPPPPPPPPPPPP 座位 " + localSeatID + " 没有人，创建新玩家");
            var userItem = new UserItem();
            userItem.init(userData);
            this.node.addChild(userItem);
            this.m_playerList[userData.mid] = userItem;
            this.m_seatPlayerList[localSeatID] = userItem;
        }
    },

    userLeave (res) {
        var mid = res.mid;

        console.log("PPPPPPPPPPPPPPPPPPPPPPPP 玩家 " + mid + " 离开，清除数据");
        var playerItem = self.m_playerList[mid];

        var userData = playerItem.getUserData()
        self.m_seatPlayerList[userData.localSeatID] = null;

        playerItem.destroy();
        delete(self.m_playerList[mid]);
    },
    ////////////////////////////////////消息处理函数end////////////////////////////////////
});