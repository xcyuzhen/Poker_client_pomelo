cc.Class({
    init (data) {
    	this.mid = data.mid;
    	this.gold = parseInt(data.gold);
    	this.diamond = parseInt(data.diamond);
    	this.localSeatID = data.localSeatID || 0;
    	this.handCards = data.handCards || [];
    	this.outCards = data.outCards || [];
    	this.extraCards = data.extraCards || [];
    	this.handCardsNum = data.handCardsNum || 0;
    	this.tingList = data.tingList || [];
    },
});