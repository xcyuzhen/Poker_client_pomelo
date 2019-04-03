cc.Class({
    init (data) {
    	this.mid = data.mid;
    	this.gold = parseInt(data.gold);
    	this.diamond = parseInt(data.diamond);
    	this.localSeatID = data.localSeatID || 0;
    	this.extraCards = data.extraCards || [];
        this.handCards = data.handCards || [];
        this.outCards = data.outCards || [];
    	this.handCardsNum = data.handCardsNum || 0;
    	this.tingList = data.tingList || [];

        //如果手牌数量和手牌列表不匹配，填充-1
        if ((this.handCards.length == 0) && (this.handCardsNum > 0)) {
            this.handCards = new Array(this.handCardsNum).fill((-1));
        }

    	this.extraCardsStr = JSON.stringify(this.extraCards);
        this.handCardsStr = JSON.stringify(this.handCards);
        this.outCardsStr = JSON.stringify(this.outCards);
    },

    updateGameData (data) {
        this.mid = data.mid;
        this.gold = parseInt(data.gold);
        this.diamond = parseInt(data.diamond);
        this.handCardsNum = data.handCardsNum || 0;
        this.tingList = data.tingList || [];
    },

    //检测手牌是否有变动
    checkHandCardsModify (checkList) {
        var self = this;
        checkList = checkList || [];

        if (self.handCards.length != checkList.length) {
            return true;
        }

        var selfCloneList = Global.Tools.clone(self.handCards);
        selfCloneList.sort(function (a, b) {
            return a - b;
        });
        var selfStr = JSON.stringify(selfCloneList);

        var newCloneList = Global.Tools.clone(checkList);
        newCloneList.sort(function (a, b) {
            return a - b;
        });
        var newStr = JSON.stringify(newCloneList);

        return selfStr != newStr;
    },

    //是否有抓的牌
    hasAddCard (cardList) {
        cardList = cardList || [];

        return (cardList.length % 3 == 2);
    },

    //添加一张出牌
    addOneOutCard (cardValue) {
        this.outCards.push(cardValue);
        this.outCardsStr = JSON.stringify(this.outCards);
    },

    //删除一张手牌
    delOneHandCard (cardIndex) {
        if (cardIndex >= this.handCards.length) {
            return;
        }

        this.handCards.splice(cardIndex, 1);
        this.handCardsNum --;
        this.handCardsStr = JSON.stringify(this.handCards);
    },
});