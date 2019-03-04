var GameData = require("./mjGameData");
var Config = require("./../config/mjConfig");
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
        this.m_showCardsList = [];

        this.m_extraHandCardsPosX = 0;
        this.m_extraHandCardsPosY = 0;
    },

    initUIView () {

    },

    updateGameData (gameData) {
    	
    },

    //重新绘制吃碰杠牌
    redrawExtraCards (extraCardsList) {
        var self = this;

    	extraCardsList = extraCardsList || [];
    	var newStr = JSON.stringify(extraCardsList);
    	if (newStr == self.m_gameData.extraCardsStr) {
    		return;
    	}

        self.clearExtraCards();
        self.resetExtraHandCardsPos()
        for (var i = 0; i < extraCardsList.length; i++) {
            var extraItemInfo = extraCardsList[i];
            var opeType = extraItemInfo.opeType;
            var extraItemNode;

            switch (opeType) {
                case Config.OPE_TYPE.PENG:
                    extraItemNode = self.drawOneGroupPengCards(extraItemInfo);
                    break;
                case Config.OPE_TYPE.GANG:
                case Config.OPE_TYPE.BU_GANG:
                    extraItemNode = self.drawOneGroupGangCards(extraItemInfo);
                    break;
                case Config.OPE_TYPE.AN_GANG:
                    extraItemNode = self.drawOneGroupAnGangCards(extraItemInfo);
                    break;
            }

            if (!!extraItemNode) {
                var posX = 500, posY = 200;
                extraItemNode.setPosition(posX, posY);
                self.addChild(extraItemNode);

                self.m_extraCardsList.push(extraItemNode);
            }
        }

    	self.m_gameData.extraCards = extraCardsList;
    	self.m_gameData.extraCardsStr = newStr;
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
    	var cardsPos = pengGroupUiData.CardsPos[this.m_seatID];

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
    		card.setPosition(cardsPos[i]);
            node.addChild(card);

    		width = Math.max(width, card.position.x + card.width);
    		height = Math.max(height, card.position.y + card.height);
            var size = card.getContentSize();
    	}

    	node.setContentSize(width, height);

        return node;
    },

    //绘制一组明杠牌或补杠牌
    drawOneGroupGangCards (gangCardsInfo) {

    },

    //绘制一组暗杠牌
    drawOneGroupAnGangCards (gangCardsInfo) {

    },

    //获取吃碰杠牌的名字
    getExtraCardImgName (cardValue) {
    	var cardPathStr = UiConfig.CardResConfig.ExtraCardRes[this.m_seatID]
    	if (cardValue == -1) {
    		return cardPathStr.format("back")
    	} else {
    		return cardPathStr.format(cardValue)
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

    //还原吃碰杠和手牌的位置数据
    resetExtraHandCardsPos () {
        var extraHandCardStartPos = this.m_uiData.ExtraHandCardStartPos[this.m_seatID];
        this.m_extraHandCardsPosX = extraHandCardStartPos.x;
        this.m_extraHandCardsPosY = extraHandCardStartPos.y;
    },

    //清除吃碰杠牌
    clearExtraCards () {
        for (var i = this.m_extraCardsList.length - 1; i >= 0; i--) {
            var extraCardsNode = this.m_extraCardsList[i];
            extraCardsNode.removeFromParent(true);
        }

        this.m_extraCardsList = [];
    },
});