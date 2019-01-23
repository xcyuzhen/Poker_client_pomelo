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
    				"2": cc.v2(840, 360),
    				"3": cc.v2(640, 620),
    				"4": cc.v2(440, 360),
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
    			Diff: {
    				"1": cc.v2(0, 45),
    				"2": cc.v2(200, 45),
    				"3": cc.v2(0, 45),
    				"4": cc.v2(-200, 45),
    			},
    		},
            Gold: {
                FontSize: 20,
                Size: cc.size(100, 20),
                Ap: {
                    "1": cc.v2(0.5, 0.5),
                    "2": cc.v2(0.5, 0.5),
                    "3": cc.v2(0.5, 0.5),
                    "4": cc.v2(0.5, 0.5),
                },
                Diff: {
                    "1": cc.v2(0, 65),
                    "2": cc.v2(200, 65),
                    "3": cc.v2(0, 65),
                    "4": cc.v2(-200, 65),
                },
            },
    	},
    },

    CardNode: {
    	CardItem: {

    	},
    },
};