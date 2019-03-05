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
                    "1": cc.v2(60, 100),
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
        ItemZIndex: {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 1,
        },
        Card: {
            CardUpDiff: 20,
        },
    	CardItem: {
            MaxZIndex: 18,
            MidZIndex: 4,

            //吃碰杠牌的起始位置
            ExtraCardStartPos: {
                "1": cc.v2(150, 5),
                "2": cc.v2(1100, 150),
                "3": cc.v2(0, 0),
                "4": cc.v2(0, 0),
            },

            //手牌的起始位置
            HandCardStartPos: {
                "1": cc.v2(165, 5),
                "2": cc.v2(1100, 150),
                "3": cc.v2(0, 0),
                "4": cc.v2(0, 0),
            },

            //两组吃碰杠牌之间的间距(注: 第一组末尾和第二组开始之间的间距)
            ExtraCardsGroupDiff: {
                "1": cc.v2(210, 0),
                "2": cc.v2(0, 80),
                "3": cc.v2(0, 0),
                "4": cc.v2(0, 0),
            },

            //吃碰杠和手牌的间距
            ExtraHandCardsDiff: {
                "1": cc.v2(210, 0),
                "2": cc.v2(15, 100),
                "3": cc.v2(0, 0),
                "4": cc.v2(0, 0),
            },

            //手牌间距
            HandCardsDiff: {
                "1": cc.v2(68, 0),
                "2": cc.v2(0, 21),
                "3": cc.v2(0, 0),
                "4": cc.v2(0, 0),
            },

            AddCardDiff: {
                "1": cc.v2(10, 0),
                "2": cc.v2(0, 45),
                "3": cc.v2(0, 0),
                "4": cc.v2(0, 0),
            },

            PengGroup: {
                //锚点必须全部为(0,0)，否则显示会有问题
                CardsPos: {
                    "1": [cc.v2(0, 0), cc.v2(68, 0), cc.v2(136, 0)],
                    "2": [cc.v2(0, 50), cc.v2(0, 25), cc.v2(0, 0)],
                    "3": [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0)],
                    "4": [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0)],
                },
            },
            GangGroup: {
                //锚点必须全部为(0,0)，否则显示会有问题
                CardsPos: {
                    "1": [cc.v2(0, 0), cc.v2(68, 0), cc.v2(136, 0), cc.v2(68, 20)],
                    "2": [cc.v2(0, 50), cc.v2(0, 25), cc.v2(0, 0), cc.v2(-5, 35)],
                    "3": [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(68, 20)],
                    "4": [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(68, 20)],
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