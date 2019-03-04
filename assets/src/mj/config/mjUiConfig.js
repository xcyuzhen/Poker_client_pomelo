module.exports = {
    ZIndexConfig: {
    	RoomInfoNode: 0,
    	PlayerNode: 1,
    	CardNode: 2,
    },

    PlayerNode: {
    	UserItem: {
            Container: {
                Size: cc.size(80, 80),
                Ap: {
                    "1": cc.v2(0.5, 0.5),
                    "2": cc.v2(0.5, 0.5),
                    "3": cc.v2(0.5, 0.5),
                    "4": cc.v2(0.5, 0.5),
                },
                Pos: {
                    "1": cc.v2(640, 100),
                    "2": cc.v2(940, 400),
                    "3": cc.v2(640, 660),
                    "4": cc.v2(340, 400),
                },
                Pos1: {
                    "1": cc.v2(60, 150),
                    "2": cc.v2(1220, 400),
                    "3": cc.v2(1170, 660),
                    "4": cc.v2(60, 400),
                },
            },
    		Head: {
    			Ap: {
    				"1": cc.v2(0.5, 0.5),
    				"2": cc.v2(0.5, 0.5),
    				"3": cc.v2(0.5, 0.5),
    				"4": cc.v2(0.5, 0.5),
    			},
    			Pos: {
    				"1": cc.v2(0, 0),
    				"2": cc.v2(0, 0),
    				"3": cc.v2(0, 0),
    				"4": cc.v2(0, 0),
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
    				"1": cc.v2(0, -45),
    				"2": cc.v2(0, -45),
    				"3": cc.v2(0, -45),
    				"4": cc.v2(0, -45),
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
                    "1": cc.v2(0, -65),
                    "2": cc.v2(0, -65),
                    "3": cc.v2(0, -65),
                    "4": cc.v2(0, -65),
                },
            },
            ZhuangIcon: {
                Ap: {
                    "1": cc.v2(0.5, 0.5),
                    "2": cc.v2(0.5, 0.5),
                    "3": cc.v2(0.5, 0.5),
                    "4": cc.v2(0.5, 0.5),
                },
                Diff: {
                    "1": cc.v2(40, 40),
                    "2": cc.v2(-40, 40),
                    "3": cc.v2(-40, 40),
                    "4": cc.v2(40, 40),
                },
            },
            Ready: {
                Ap: {
                    "1": cc.v2(0.5, 0.5),
                    "2": cc.v2(0.5, 0.5),
                    "3": cc.v2(0.5, 0.5),
                    "4": cc.v2(0.5, 0.5),
                },
                Diff: {
                    "1": cc.v2(0, 100),
                    "2": cc.v2(-100, 0),
                    "3": cc.v2(0, -100),
                    "4": cc.v2(100, 0),
                },
            },
    	},
    },

    CardNode: {
        Card: {
            CardUpDiff: 20,
        },
    	CardItem: {
            //吃碰杠和手牌的起始位置
            ExtraHandCardStartPos: {
                "1": cc.v2(0, 0),
                "2": cc.v2(0, 0),
                "3": cc.v2(0, 0),
                "4": cc.v2(0, 0),
            },

            //两组吃碰杠牌之间的间距(注: 第一组末尾和第二组开始之间的间距)
            ExtraCardsGroupDiff: {
                "1": cc.v2(10, 0),
                "2": cc.v2(0, 0),
                "3": cc.v2(0, 0),
                "4": cc.v2(0, 0),
            },

            PengGroup: {
                //锚点必须全部为(0,0)，否则显示会有问题
                CardsPos: {
                    "1": [cc.v2(0, 0), cc.v2(68, 0), cc.v2(136, 0)],
                    "2": [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0)],
                    "3": [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0)],
                    "4": [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0)],
                },
            },
    	},
    },

    CardResConfig: {
        HandCardRes: {
            "1": "my_hand_{0}",
            "2": "right_hand_{0}",
            "3": "opposite_hand_{0}",
            "4": "left_hand_{0}",
        },

        ExtraCardRes: {
            "1": "my_extra_{0}",
            "2": "right_extra_{0}",
            "3": "opposite_extra_{0}",
            "4": "left_extra_{0}",
        },

        OutCardRes: {
            "1": "my_opposite_out_{0}",
            "2": "right_extra_{0}",
            "3": "my_opposite_out_{0}",
            "4": "left_extra_{0}",
        },

        ShowCardRes: {
            "1": "my_extra_{0}",
            "2": "right_extra_{0}",
            "3": "opposite_extra_{0}",
            "4": "left_extra_{0}",
        },
    },
};