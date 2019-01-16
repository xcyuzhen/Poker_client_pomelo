cc.Class({
	init (data) {
        this.mid = data.mid;
    	this.nick = data.nick;
    	this.sex = parseInt(data.sex);
    	this.gold = parseInt(data.gold);
    	this.diamond = parseInt(data.diamond);
    	this.headUrl = data.head_url;
    	this.seatID = data.seatID;
    	this.ready = data.ready;
    	this.online = data.online;
        this.localSeatID = data.localSeatID || 0;
    },
});