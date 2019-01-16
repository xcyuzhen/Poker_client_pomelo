module.exports = {
    ZOrderConfig: {
    	RoomInfoNode: 0,
    	PlayerNode: 1,
    	CardNode: 2,
    },

    PlayerNode: {
    	UserItem: {
    		Head: {
    			Ap: {
    				"1": cc.v2(0.5, 0.5),
    				"2": cc.v2(0.5, 0.5),
    				"3": cc.v2(0.5, 0.5),
    				"4": cc.v2(0.5, 0.5),
    			},
    			Pos: {
    				"1": cc.v2(640, 100),
    				"2": cc.v2(540, 360),
    				"3": cc.v2(640, 620),
    				"4": cc.v2(740, 360),
    			},
    		},
    		Name: {
    			FontSize: 20,
    			Size: cc.size(100, 20),
    			Ap: {
    				"1": cc.v2(0.5, 0.5),
    				"2": cc.v2(0.5, 0.5),
    				"3": cc.v2(0.5, 0.5),
    				"4": cc.v2(0.5, 0.5),
    			},
    			Pos: {
    				"1": cc.v2(640, 100 - 45),
    				"2": cc.v2(540, 360 - 45),
    				"3": cc.v2(640, 620 - 45),
    				"4": cc.v2(740, 360 - 45),
    			},
    		},
    	},
    },

    CardNode: {
    	CardItem: {

    	},
    },
};