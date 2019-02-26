var GameData = require("./mjGameData");

cc.Class({
    extends: cc.Node,

    init (data) {
    	this.m_gameData = new GameData();
    	this.m_gameData.init(data);
    	this.m_seatID = data.localSeatID;

    	this.initData();
    	this.initUIView();
    },

    initData () {
    	this.m_cardsList = [];
    	this.m_extraCardsList = [];
    	this.m_outCardsList = [];
    },

    initUIView () {

    },

    updateGameData (gameData) {
    	
    },
});