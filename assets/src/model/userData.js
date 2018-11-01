cc.Class({
    properties: {
    	mid: 0,
    	nick: "",
    	sex: 0,
    	gold: 0,
    	diamond: 0,
    	headUrl: "",
    },

    setUserData (data) {
    	this.mid = data.mid;
    	this.nick = data.nick;
    	this.sex = parseInt(data.sex);
    	this.gold = parseInt(data.gold);
    	this.diamond = parseInt(data.diamond);
    	this.headUrl = data.head_url;
    },
});