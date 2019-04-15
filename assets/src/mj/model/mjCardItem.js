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

        //亮牌的起始位置(有吃碰杠时该位置是根据吃碰杠牌的位置计算得到)
        this.m_showCardsStartPosX = this.m_uiData.HandCardsStartPos[this.m_seatID].x;
        this.m_showCardsStartPosY = this.m_uiData.HandCardsStartPos[this.m_seatID].y;

        //出牌的起始位置
        this.m_outCardsStartPosX = this.m_uiData.OutCardsStartPos[this.m_seatID].x;
        this.m_outCardsStartPosY = this.m_uiData.OutCardsStartPos[this.m_seatID].y;

        //触摸事件相关
        this.m_touchEventData = {};
    },

    initUIView () {

    },

    //点击事件处理
    touchEvent (event) {
        var self = this;

        var eventType = event.getType();
        var target = event.target;
        var location = event.getLocation();
        var worldLocation = target.convertToWorldSpace(location);

        //是否轮到自己出牌
        var isSelfOutCard = Global.Room.m_opeMgr.isSelfOutCard();

        if (eventType == cc.Node.EventType.TOUCH_START) {
            self.m_touchEventData.touchBegin = true;

            if (!isSelfOutCard) {
                for (var i = self.m_handCardsList.length - 1; i >= 0; i--) {
                    var card = self.m_handCardsList[i];
                    if (card.containsWorldPoint(worldLocation)) {
                        card.setUp();
                        self.m_touchEventData.upCard = card;
                    } else {
                        card.setDown();
                    }
                }
            } else {
                for (var i = self.m_handCardsList.length - 1; i >= 0; i--) {
                    var card = self.m_handCardsList[i];
                    if (card.containsWorldPoint(worldLocation)) {
                        if (card.isUp()) {
                            //点击的牌是已经起立的牌，出牌
                            self.m_touchEventData.touchBegin = false;
                            var cardValue = card.getCardValue();
                            self.playOutCardAnim(card, cardValue, function () {
                                Global.Room.m_opeMgr.opeRequest(Config.OPE_TYPE.OUT_CARD, cardValue);
                            })
                            break;
                        } else {
                            self.m_touchEventData.dragCard = card;
                            self.m_touchEventData.touchStartPosX = worldLocation.x;
                            self.m_touchEventData.touchStartPosY = worldLocation.y;
                            self.m_touchEventData.cardStartPosX = card.x;
                            self.m_touchEventData.cardStartPosY = card.y;
                            card.zIndex = self.m_uiData.DargCardZIndex;
                        }
                    } else {
                        card.setDown();
                    }
                }
            }
        } else if (eventType == cc.Node.EventType.TOUCH_MOVE) {
            if (!self.m_touchEventData.touchBegin) {
                return;
            }

            if (!isSelfOutCard) {
                var newUpCard;
                for (var i = self.m_handCardsList.length - 1; i >= 0; i--) {
                    var card = self.m_handCardsList[i];
                    if (card.containsWorldPoint(worldLocation) && (card != self.m_touchEventData.upCard)) {
                        newUpCard = card;
                        break;
                    }
                }

                if (newUpCard) {
                    for (var i = self.m_handCardsList.length - 1; i >= 0; i--) {
                        var card = self.m_handCardsList[i];
                        if (card == newUpCard) {
                            card.setUp();
                        } else {
                            card.setDown();
                        }
                    }
                    self.m_touchEventData.upCard = newUpCard;
                }
            } else {
                //当前拖拽的有牌，设置牌的位置
                if (self.m_touchEventData.dragCard) {
                    self.m_touchEventData.dragCard.x = self.m_touchEventData.cardStartPosX + (worldLocation.x - self.m_touchEventData.touchStartPosX);
                    self.m_touchEventData.dragCard.y = self.m_touchEventData.cardStartPosY + (worldLocation.y - self.m_touchEventData.touchStartPosY);
                }

                //检测是否换了新的拖拽的牌
                var newDragCard;
                for (var i = self.m_handCardsList.length - 1; i >= 0; i--) {
                    var card = self.m_handCardsList[i];
                    if (card.containsWorldPointSmall(worldLocation) && (card != self.m_touchEventData.dragCard)) {
                        newDragCard = card;
                        break;
                    }
                }

                //有新的拖拽的牌
                if (newDragCard) {
                    //还原旧的拖拽的牌
                    if (self.m_touchEventData.dragCard) {
                        self.m_touchEventData.dragCard.setDown();
                        self.m_touchEventData.dragCard.zIndex = self.m_touchEventData.dragCard.getOriginZIndex();
                    }

                    self.m_touchEventData.dragCard = newDragCard;
                    self.m_touchEventData.touchStartPosX = worldLocation.x;
                    self.m_touchEventData.touchStartPosY = worldLocation.y;
                    self.m_touchEventData.cardStartPosX = self.m_touchEventData.dragCard.x;
                    self.m_touchEventData.cardStartPosY = self.m_touchEventData.dragCard.y;
                    self.m_touchEventData.dragCard.zIndex = self.m_uiData.DargCardZIndex;
                }
            }
        } else if (eventType == cc.Node.EventType.TOUCH_END) {
            if (!self.m_touchEventData.touchBegin) {
                self.m_touchEventData = {};
                return;
            }

            if (isSelfOutCard && self.m_touchEventData.dragCard) {
                //判断拖拽牌的y坐标是否达到出牌的标准
                var originPos = self.m_touchEventData.dragCard.getOriginPos();
                if (self.m_touchEventData.dragCard.y > originPos.y + UiConfig.CardNode.Card.CardOutDiff) {
                    var cardValue = self.m_touchEventData.dragCard.getCardValue();
                    self.playOutCardAnim(self.m_touchEventData.dragCard, cardValue, function () {
                        Global.Room.m_opeMgr.opeRequest(Config.OPE_TYPE.OUT_CARD, cardValue);;
                    })
                } else {
                    self.m_touchEventData.dragCard.setUp();
                    self.m_touchEventData.dragCard.zIndex = self.m_touchEventData.dragCard.getOriginZIndex();
                }
            }

            self.m_touchEventData = {};
        }
    },

    //更新玩家数据
    updateGameData (gameData, lastOpeMid, lastOpeItem) {
        var self = this;

        var handCardAllSort = false;
        if (lastOpeMid == self.m_gameData.mid) {
            if (!!lastOpeItem && lastOpeItem.opeType == Config.OPE_TYPE.PENG) {
                handCardAllSort = true;
            }
        }

        self.m_gameData.updateGameData(gameData);
        self.redrawExtraCards(gameData.extraCards);
        self.redrawHandCards(gameData.handCards, handCardAllSort);
        self.redrawOutCards(gameData.outCards);
    },

    //服务端通知出牌(其他玩家打牌或者自己ai打牌)
    serverOutCard (cardValue, cb) {
        var self = this;

        var outCard;
        if (self.m_seatID == 1) {
            //自己 根据牌值找到要出的牌
            for (var i = self.m_handCardsList.length-1; i >= 0; i--) {
                var card = self.m_handCardsList[i];
                if (card.getCardValue() == cardValue) {
                    outCard = card;
                } else {
                    card.setDown();
                }
            }
        } else {
            //其他 随机一个要出的牌
            var outIndex = Global.Tools.random(0, (self.m_handCardsList.length - 1));
            outCard = self.m_handCardsList[outIndex];
        }

        self.playOutCardAnim(outCard, cardValue, cb);
    },

    //播放出牌动画
    playOutCardAnim (card, cardValue, cb) {
        var self = this;

        if (!cc.isValid(card)) {
            console.error("CCCCCCCCCCCCCCCCCCCCCCC CardItem.playOutCardAnim card is invalid.");
            if (!!cb) {
                cb();
            }
            return;
        }

        //删除手牌
        var outIndex;
        for (var i = self.m_handCardsList.length - 1; i >= 0; i--) {
            if (card == self.m_handCardsList[i]) {
                outIndex = i;
                self.m_handCardsList.splice(i, 1);
                card.removeFromParent(true);
                self.m_gameData.delOneHandCard(i);
                break;
            }
        }

        self.revHandCardsAfterOutCard(outIndex, cb);

        //绘制出牌
        var cardImgName = this.getOutCardImgName(cardValue);
        var param = {
            imgName: cardImgName,
            cardValue: cardValue,
        };
        var outCard = new Card();
        outCard.init(param);
        outCard.setAnchorPoint(0, 0);
        outCard.x = card.x;
        outCard.y = card.y;
        outCard.zIndex = self.m_uiData.OutCardFlyZIndex;
        self.addChild(outCard);
        self.m_outCardsList.push(outCard);
        self.m_gameData.addOneOutCard(cardValue);

        //计算最终位置和zIndex
        var outCardIndex = self.m_outCardsList.length - 1;
        var outCardsSameRowDiff = self.m_uiData.OutCardsSameRowDiff[self.m_seatID];
        var outCardsSameColumnDiff = self.m_uiData.OutCardsSameColumnDiff[self.m_seatID];
        var rowIndex = Math.floor(outCardIndex / self.m_uiData.OutCardsNumPerRow);
        var columnIndex = outCardIndex % self.m_uiData.OutCardsNumPerRow;
        var posX = self.m_outCardsStartPosX + rowIndex * outCardsSameColumnDiff.x + columnIndex * outCardsSameRowDiff.x;
        var posY = self.m_outCardsStartPosY + rowIndex * outCardsSameColumnDiff.y + columnIndex * outCardsSameRowDiff.y;
        var endZIndex = self.getOutCardZIndex(rowIndex, columnIndex);

        //开始动画
        outCard.runAction(
            cc.sequence(
                cc.moveTo(self.m_uiData.OutCardAnim.MoveTime, cc.v2(posX, posY)),
                cc.callFunc(function () {
                    outCard.zIndex = endZIndex;

                    if (!!cb) {
                        cb();
                    }
                })
            ),
        );
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
        self.resetShowCardsPos();

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

                //计算亮牌的起始位置
                self.m_showCardsStartPosX = posX + self.m_uiData.ExtraShowCardsDiff[self.m_seatID].x;
                self.m_showCardsStartPosY = posY + self.m_uiData.ExtraShowCardsDiff[self.m_seatID].y;
            }
        }

    	self.m_gameData.extraCards = extraCardsList;
    	self.m_gameData.extraCardsStr = newStr;
    },

    //重新绘制手牌
    redrawHandCards (handCardsList, allSort) {
        var self = this;

        if (self.m_seatID != 1) {
            handCardsList = [];
        }

        handCardsList = handCardsList || [];
        if ((handCardsList.length == 0) && (self.m_gameData.handCardsNum > 0)) {
            handCardsList = new Array(self.m_gameData.handCardsNum).fill((-1));
        }

        if (!self.m_gameData.checkHandCardsModify(handCardsList)) {
            return;
        }

        //将抓的牌提取出来
        var addCard;
        if (self.m_gameData.hasAddCard(handCardsList) && !allSort) {
            addCard = handCardsList.splice(-1, 1)[0];
        }

        //排序
        handCardsList.sort(function (a, b) {
            return a - b;
        });

        //将抓牌添加进列表
        if (addCard) {
            handCardsList.push(addCard);
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
            card.setOriginPos(posX, posY);
            card.zIndex = self.getHandCardZIndex(i);
            card.setOriginZIndex(card.zIndex);
            self.addChild(card);

            self.m_handCardsList.push(card);
        }

        self.m_gameData.handCards = handCardsList;
        self.m_gameData.handCardsStr = JSON.stringify(handCardsList);
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

            card.setPosition(posX, posY);
            card.zIndex = self.getOutCardZIndex(rowIndex, columnIndex);
            self.addChild(card);

            self.m_outCardsList.push(card);
        }

        self.m_gameData.outCards = outCardsList;
        self.m_gameData.outCardsStr = newStr;
    },

    //重新绘制名牌
    redrawShowCards (showCardsList) {
        var self = this;

        showCardsList = showCardsList || [];

        //将抓的牌提取出来
        var addCard;
        if (self.m_gameData.hasAddCard(showCardsList)) {
            addCard = showCardsList.splice(-1, 1)[0];
        }

        //排序
        showCardsList.sort(function (a, b) {
            return a - b;
        });

        //将抓牌添加进列表
        if (addCard != undefined && addCard != null) {
            showCardsList.push(addCard);
        }

        self.clearHandCards();

        var showCardsDiff = self.m_uiData.ShowCardsDiff[self.m_seatID];
        var addCardDiff = self.m_uiData.ShowAddCardDiff[self.m_seatID];
        var cardsNum = showCardsList.length;

        for (var i = 0; i < cardsNum; i++) {
            var cardValue = showCardsList[i];
            var cardImgName = this.getShowCardImgName(cardValue);

            var param = {
                imgName: cardImgName,
                cardValue: cardValue,
            };
            var card = new Card();
            card.init(param);
            card.setAnchorPoint(0, 0);

            var posX = self.m_showCardsStartPosX + i * showCardsDiff.x;
            var posY = self.m_showCardsStartPosY + i * showCardsDiff.y;

            var isAddCard = (i == (cardsNum - 1) && (cardsNum % 3 == 2))
            if (isAddCard) {
                posX += addCardDiff.x;
                posY += addCardDiff.y;
            }

            card.setPosition(posX, posY);
            card.setOriginPos(posX, posY);
            card.zIndex = self.getHandCardZIndex(i);
            card.setOriginZIndex(card.zIndex);
            self.addChild(card);

            self.m_handCardsList.push(card);
        }

        self.m_gameData.handCards = showCardsList;
        self.m_gameData.handCardsStr = JSON.stringify(showCardsList);
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
                return this.m_uiData.HandExtraMinZIndex + index;
                break;
            case 2:
                return this.m_uiData.HandExtraMaxZIndex - index;
                break;
            case 3:
                return this.m_uiData.HandExtraMinZIndex + index;
                break;
            case 4:
                return this.m_uiData.HandExtraMinZIndex + index;
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
                return this.m_uiData.HandExtraMaxZIndex - this.m_uiData.HandExtraMidZIndex - index + this.m_uiData.HandExtraMinZIndex;
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

    //出牌后校正手牌位置
    revHandCardsAfterOutCard (outIndex, cb) {
        var self = this;

        if (outIndex >= self.m_handCardsList.length) {
            return;
        }

        var lastCard = self.m_handCardsList.splice(-1, 1)[0];
        var lastCardValue = lastCard.getCardValue();

        //计算最后一张牌应该插入到哪个位置
        var insertIndex = 0;
        for (var i = 0; i < self.m_handCardsList.length; i++) {
            var tmpCard = self.m_handCardsList[i];

            if (lastCardValue > tmpCard.getCardValue()) {
                insertIndex = i + 1;
            } else {
                break;
            }
        }

        //如果不是自己出牌，固定放在最后
        if (self.m_seatID != 1) {
            insertIndex = self.m_handCardsList.length;
        }

        self.m_handCardsList.splice(insertIndex, 0, lastCard);

        // //修改gameData中手牌数据
        var handcardsData = self.m_gameData.handCards;
        var lastCardData = handcardsData.splice(handcardsData.length - 1, 1)[0];
        handcardsData.splice(insertIndex, 0, lastCardData);
        self.m_gameData.handCardsStr = JSON.stringify(handcardsData);

        //开始播放动画
        var handCardsDiff = self.m_uiData.HandCardsDiff[self.m_seatID];
        var revHandCardsAnimUiData = self.m_uiData.RevHandCardsAnim;

        for (var i = 0; i < self.m_handCardsList.length; i++) {
            var card = self.m_handCardsList[i];
            var posX = self.m_handCardsStartPosX + i * handCardsDiff.x;
            var posY = self.m_handCardsStartPosY + i * handCardsDiff.y;
            card.setOriginPos(posX, posY);
            card.setOriginZIndex(self.getHandCardZIndex(i));

            if (card != lastCard || insertIndex == self.m_handCardsList.length - 1) {
                card.zIndex = card.getOriginZIndex();
                card.runAction(cc.moveTo(revHandCardsAnimUiData.MoveTime, cc.v2(posX, posY)));
            } else {
                card.zIndex = self.m_uiData.DargCardZIndex;
                var upDiff = revHandCardsAnimUiData.UpDiff[self.m_seatID]
                card.runAction(cc.sequence(
                    cc.moveBy(revHandCardsAnimUiData.UpTime, upDiff),
                    cc.delayTime(revHandCardsAnimUiData.DelayTime),
                    cc.moveTo(revHandCardsAnimUiData.MoveTime1, cc.v2(posX + upDiff.x, posY + upDiff.y)),
                    cc.delayTime(revHandCardsAnimUiData.DelayTime1),
                    cc.callFunc(function () {
                        var card = this;
                        card.zIndex = card.getOriginZIndex();
                    }.bind(card)),
                    cc.moveTo(revHandCardsAnimUiData.UpTime, cc.v2(posX, posY))
                ));
            }
        }
    },

    //还原手牌的位置数据(手牌位置跟吃碰杠有关，所以重新绘制吃碰杠要先还原手牌起始位置)
    resetHandCardsPos () {
        var handCardsStartPos = this.m_uiData.HandCardsStartPos[this.m_seatID];
        this.m_handCardsStartPosX = handCardsStartPos.x;
        this.m_handCardsStartPosY = handCardsStartPos.y;
    },

    //还原亮牌的位置数据(亮牌位置跟吃碰杠有关，所以重新绘制吃碰杠要先还原亮牌起始位置)
    resetShowCardsPos () {
        var handCardsStartPos = this.m_uiData.HandCardsStartPos[this.m_seatID];
        this.m_showCardsStartPosX = handCardsStartPos.x;
        this.m_showCardsStartPosY = handCardsStartPos.y;
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