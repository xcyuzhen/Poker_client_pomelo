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
        this.m_extraCardsList = [];
    	this.m_handCardsList = [];
    	this.m_outCardsList = [];
        this.m_showCardsList = [];

        //吃碰杠牌的当前位置
        this.m_extraCardsStartPosX = this.m_uiData.ExtraCardsStartPos[this.m_seatID].x;
        this.m_extraCardsStartPosY = this.m_uiData.ExtraCardsStartPos[this.m_seatID].y;

        //手牌的起始位置(有吃碰杠时该位置是根据吃碰杠牌的位置计算得到)
        this.m_handCardsStartPosX = this.m_uiData.HandCardsStartPos[this.m_seatID].x;
        this.m_handCardsStartPosY = this.m_uiData.HandCardsStartPos[this.m_seatID].y;

        //出牌的起始位置
        this.m_outCardsStartPosX = this.m_uiData.OutCardsStartPos[this.m_seatID].x;
        this.m_outCardsStartPosY = this.m_uiData.OutCardsStartPos[this.m_seatID].y;
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
        self.resetHandCardsPos();

        var extraCardsGroupDiff = self.m_uiData.ExtraCardsGroupDiff[self.m_seatID];

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
                var posX = self.m_extraCardsStartPosX + i * extraCardsGroupDiff.x;
                var posY = self.m_extraCardsStartPosY + i * extraCardsGroupDiff.y;

                extraItemNode.setPosition(posX, posY);
                extraItemNode.zIndex = self.getExtraGroupZIndex(i);
                self.addChild(extraItemNode);
                self.m_extraCardsList.push(extraItemNode);

                //计算手牌的起始位置
                self.m_handCardsStartPosX = posX + self.m_uiData.ExtraHandCardsDiff[self.m_seatID].x;
                self.m_handCardsStartPosY = posY + self.m_uiData.ExtraHandCardsDiff[self.m_seatID].y;
            }
        }

    	self.m_gameData.extraCards = extraCardsList;
    	self.m_gameData.extraCardsStr = newStr;
    },

    //重新绘制手牌
    redrawHandCards (handCardsList) {
        var self = this;

        handCardsList = handCardsList || [];
        if ((handCardsList.length == 0) && (self.m_gameData.handCardsNum > 0)) {
            handCardsList = new Array(self.m_gameData.handCardsNum).fill((-1));
        }

        var newStr = JSON.stringify(handCardsList);
        if (newStr == self.m_gameData.handCardsStr) {
            return;
        }

        self.clearHandCards();

        var handCardsDiff = self.m_uiData.HandCardsDiff[self.m_seatID];
        var addCardDiff = self.m_uiData.AddCardDiff[self.m_seatID];
        var cardsNum = handCardsList.length;

        for (var i = 0; i < cardsNum; i++) {
            var cardValue = handCardsList[i];
            var cardImgName = this.getHandCardImgName(cardValue);

            var param = {
                imgName: cardImgName,
                cardValue: cardValue,
            };
            var card = new Card();
            card.init(param);
            card.setAnchorPoint(0, 0);

            var posX = self.m_handCardsStartPosX + i * handCardsDiff.x;
            var posY = self.m_handCardsStartPosY + i * handCardsDiff.y;

            var isAddCard = (i == (cardsNum - 1) && (cardsNum % 3 == 2))
            if (isAddCard) {
                posX += addCardDiff.x;
                posY += addCardDiff.y;
            }

            card.setPosition(posX, posY);
            card.zIndex = self.getHandCardZIndex(i);
            self.addChild(card);
        }

        self.m_gameData.handCards = handCardsList;
        self.m_gameData.handCardsStr = newStr;
    },

    //重新绘制出牌
    redrawOutCards (outCardsList) {
        var self = this;

        outCardsList = outCardsList || [];
        var newStr = JSON.stringify(outCardsList);
        if (newStr == self.m_gameData.outCardsStr) {
            return;
        }

        self.clearOutCards();

        var outCardsSameRowDiff = self.m_uiData.OutCardsSameRowDiff[self.m_seatID];
        var outCardsSameColumnDiff = self.m_uiData.OutCardsSameColumnDiff[self.m_seatID];
        var cardsNum = outCardsList.length;

        for (var i = 0; i < cardsNum; i++) {
            var cardValue = outCardsList[i];
            var cardImgName = this.getOutCardImgName(cardValue);

            var param = {
                imgName: cardImgName,
                cardValue: cardValue,
            };
            var card = new Card();
            card.init(param);
            card.setAnchorPoint(0, 0);

            //第几行第几列(第0行第0列开始)
            var rowIndex = Math.floor(i / self.m_uiData.OutCardsNumPerRow);
            var columnIndex = i % self.m_uiData.OutCardsNumPerRow;

            var posX = self.m_outCardsStartPosX + rowIndex * outCardsSameColumnDiff.x + columnIndex * outCardsSameRowDiff.x;
            var posY = self.m_outCardsStartPosY + rowIndex * outCardsSameColumnDiff.y + columnIndex * outCardsSameRowDiff.y;

            console.log(i, rowIndex, columnIndex, posX, posY);

            card.setPosition(posX, posY);
            card.zIndex = self.getOutCardZIndex(rowIndex, columnIndex);
            self.addChild(card);
        }

        self.m_gameData.outCards = outCardsList;
        self.m_gameData.outCardsStr = newStr;
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
        var cardValue = gangCardsInfo.cardValue;
        var targetMid = gangCardsInfo.targetMid;

        var gangGroupUiData = this.m_uiData.GangGroup;
        var cardsPos = gangGroupUiData.CardsPos[this.m_seatID];

        var node = new cc.Node();
        node.setAnchorPoint(cc.v2(0, 0));

        var width = 0, height = 0;

        for (var i = 0; i < 4; i++) {
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

    //绘制一组暗杠牌
    drawOneGroupAnGangCards (gangCardsInfo) {
        var cardValue = gangCardsInfo.cardValue;
        var targetMid = gangCardsInfo.targetMid;

        var gangGroupUiData = this.m_uiData.GangGroup;
        var cardsPos = gangGroupUiData.CardsPos[this.m_seatID];

        var node = new cc.Node();
        node.setAnchorPoint(cc.v2(0, 0));

        var width = 0, height = 0;

        for (var i = 0; i < 4; i++) {
            var tmpValue = cardValue;
            if (i < 3) {
                tmpValue = -1;
            }
            var cardImgName = this.getExtraCardImgName(tmpValue);
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

    //获取吃碰杠牌的名字
    getExtraCardImgName (cardValue) {
    	var cardPathStr = UiConfig.CardResConfig.ExtraCardRes[this.m_seatID];
    	if (cardValue == -1) {
    		return cardPathStr.format("back")
    	} else {
    		return cardPathStr.format(cardValue)
    	}
    },

    //获取手牌图片名字
    getHandCardImgName (cardValue) {
    	var cardPathStr = UiConfig.CardResConfig.HandCardRes[this.m_seatID];
    	if (cardValue == -1) {
    		return cardPathStr.format("back")
    	} else {
    		return cardPathStr.format(cardValue)
    	}
    },

    //获取出牌的名字
    getOutCardImgName (cardValue) {
    	var cardPathStr = UiConfig.CardResConfig.OutCardRes[this.m_seatID];
    	if (cardValue == -1) {
    		return cardPathStr.format("back")
    	} else {
    		return cardPathStr.format(cardValue)
    	}
    },

    //获取明牌的名字
    getShowCardImgName (cardValue) {
    	var cardPathStr = UiConfig.CardResConfig.ShowCardRes[this.m_seatID];
    	if (cardValue == -1) {
    		return cardPathStr.format("back")
    	} else {
    		return cardPathStr.format(cardValue)
    	}
    },

    //获取一组吃碰杠牌的ZIndex
    getExtraGroupZIndex (index) {
        switch (this.m_seatID) {
            case 1:
                return index;
                break;
            case 2:
                return this.m_uiData.HandExtraMaxZIndex - index;
                break;
            case 3:
                return index;
                break;
            case 4:
                return index;
                break;
            default:
                return 0;
        }
    },

    //获取手牌的ZIndex
    getHandCardZIndex (index) {
        switch (this.m_seatID) {
            case 1:
                return index + this.m_uiData.HandExtraMidZIndex;
                break;
            case 2:
                return this.m_uiData.HandExtraMaxZIndex - this.m_uiData.HandExtraMidZIndex - index;
                break;
            case 3:
                return index + this.m_uiData.HandExtraMidZIndex;
                break;
            case 4:
                return index + this.m_uiData.HandExtraMidZIndex;
                break;
            default: 
                return 0;
        }
    },

    //获取出牌的ZIndex
    getOutCardZIndex (rowIndex, columnIndex) {
        var index = this.m_uiData.OutCardsNumPerRow * rowIndex + columnIndex;

        switch (this.m_seatID) {
            case 1:
                return this.m_uiData.OutCardsMaxZIndex - index;
                break;
            case 2:
                return this.m_uiData.OutCardsMaxZIndex - index;
                break;
            case 3:
                return index;
                break;
            case 4:
                return (2 - rowIndex) * this.m_uiData.OutCardsNumPerRow + columnIndex;
                break;
            default: 
                return 0;
        }
    },

    //还原手牌的位置数据(手牌位置跟吃碰杠有关，所以重新绘制吃碰杠要先还原手牌起始位置)
    resetHandCardsPos () {
        var handCardsStartPos = this.m_uiData.HandCardsStartPos[this.m_seatID];
        this.m_handCardsStartPosX = handCardsStartPos.x;
        this.m_handCardsStartPosY = handCardsStartPos.y;
    },

    //清除吃碰杠牌
    clearExtraCards () {
        for (var i = this.m_extraCardsList.length - 1; i >= 0; i--) {
            var extraCardsNode = this.m_extraCardsList[i];
            extraCardsNode.removeFromParent(true);
        }

        this.m_extraCardsList = [];
    },

    //清除手牌
    clearHandCards () {
        for (var i = this.m_handCardsList.length - 1; i >= 0; i--) {
            var handCard = this.m_handCardsList[i];
            handCard.removeFromParent(true);
        }

        this.m_handCardsList = [];
    },

    //清除出牌
    clearOutCards () {
        for (var i = this.m_outCardsList.length - 1; i >= 0; i--) {
            var outCard = this.m_outCardsList[i];
            outCard.removeFromParent(true);
        }

        this.m_outCardsList = [];
    },
});