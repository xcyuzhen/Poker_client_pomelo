cc.Class({
    init (data) {
    	this.handCards = data.handCards || [];
    	this.outCards = data.outCards || [];
    	this.extraCards = data.extraCards || [];
    	this.handCardsNum = data.handCardsNum || 0;
    	this.tingList = data.tingList || [];
    },
});