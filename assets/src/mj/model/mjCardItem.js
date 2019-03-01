var GameData = require("./mjGameData");
var UiConfig = require("./../config/mjUiConfig");
var Card = require("./mjCard");

cc.Class({
    extends: cc.Node,

    init (data) {
    	this.m_gameData = new GameData();
    	this.m_gameData.init(data);
    	this.m_seatID = data.localSeatID;

    	this.initData();
    	this.initUIView();

    	Global.CardItemList[this.m_seatID] = this;
    },

    initData () {
    	this.m_uiData = UiConfig.CardNode.CardItem;
    	this.m_cardsList = [];
    	this.m_extraCardsList = [];
    	this.m_outCardsList = [];
    },

    initUIView () {

    },

    updateGameData (gameData) {
    	
    },

    //重新绘制吃碰杠牌
    redrawExtraCards (extraCardsList) {
    	extraCardsList = extraCardsList || {};
    	var newStr = JSON.stringify(extraCardsList);
    	if (newStr == this.m_gameData.extraCardsStr) {
    		return;
    	}

    	this.m_gameData.extraCards = extraCardsList;
    	this.m_gameData.extraCardsStr = newStr;
    },

    //重新绘制手牌
    redrawHandCards (handCardsList) {

    },

    //重新绘制出牌
    redrawOutCards (outCardsList) {

    },

    //重新绘制名牌
    redrawShowCards (showCardsList) {

    },

    //绘制一组碰牌
    drawOneGroupPengCards (pengCardsInfo) {
    	var cardValue = pengCardsInfo.cardValue;
    	var targetMid = pengCardsInfo.targetMid;

    	var pengGroupUiData = this.m_uiData.PengGroup;
    	var cardsUiData = pengGroupUiData.Cards[this.m_seatID];

    	var node = new cc.Node();
    	node.setAnchorPoint(cc.v2(0, 0));

    	var width = 0, height = 0;

    	for (var i = 0; i < 3; i++) {
    		var cardImgName = this.getExtraCardImgName(cardValue);
    		var param = {
    			imgName: cardImgName,
    			cardValue: cardValue,
    		};
    		var card = new Card();
    		card.init(param);
    		card.setAnchorPoint(0, 0);
    		card.setPosition(cardsUiData.Pos[i]);

    		var leftBottomPosX = ;
    		var leftBottomPosY = card.position.y + card.height;

    		width = Math.max(width, card.position.x + card.width);
    		height = Math.max(height, card.position.y + card.height);
    	}

    	node.setContentSize(width, height);
    },

    //绘制一组明杠牌或补杠牌
    drawOneGroupGangCards (gangCardsInfo) {

    },

    //绘制一组暗杠牌
    drawOneGroupGangCards (gangCardsInfo) {

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

    //获取手牌图片名字
    getHandCardImgName (cardValue) {
    	var cardPathStr = UiConfig.CardResConfig.HandCardRes[this.m_seatID]
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

    //获取明牌的名字
    getShowCardImgName (cardValue) {
    	var cardPathStr = UiConfig.CardResConfig.ShowCardRes[this.m_seatID]
    	if (cardValue == -1) {
    		return String.format.call(cardPathStr, "back")
    	} else {
    		return String.format.call(cardPathStr, cardValue)
    	}
    },
});