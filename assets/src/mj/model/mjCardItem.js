var GameData = require("./mjGameData");

cc.Class({
    extends: cc.Node,

    init (data) {
    	this.m_gameData = new GameData();
    	this.m_gameData.init(data);
    	this.m_seatID = data.localSeatID;
    },

    updateUserData (userData) {
    	
    },
});