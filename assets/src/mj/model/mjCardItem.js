var GameData = require("./mjGameData");
var UiConfig = require("./../config/mjUiConfig");

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

    redrawHandCards () {
    	
    },

    //获取手牌图片名字
    getHandCardImgName (cardValue) {
    	var cardPathStr = UiConfig.CardResConfig.HandCardRes[this.m_seatID]
    	if (cardValue == -1) {
    		return String.format.call(cardPathStr, "back")
    	} else {
    		return String.format.call(cardPathStr, cardValue)
    	}
    },

    //获取吃碰杠牌的名字
    getExtraCardImgName (cardValue) {
    	var cardPathStr = UiConfig.CardResConfig.ExtraCardRes[this.m_seatID]
    	if (cardValue == -1) {
    		return String.format.call(cardPathStr, "back")
    	} else {
    		return String.format.call(cardPathStr, cardValue)
    	}
    },

    //获取出牌的名字
    getOutCardImgName (cardValue) {
    	var cardPathStr = UiConfig.CardResConfig.OutCardRes[this.m_seatID]
    	if (cardValue == -1) {
    		return String.format.call(cardPathStr, "back")
    	} else {
    		return String.format.call(cardPathStr, cardValue)
    	}
    },
});