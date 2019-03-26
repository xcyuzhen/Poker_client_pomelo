module.exports = {
    ZIndexConfig: {
    	RoomInfoNode: 0,
    	PlayerNode: 1,
    	CardNode: 2,
    },

    RoomInfoNode: {
        Turnplate: {
            RotateAngle: {
                "1": 0,
                "2": 270,
                "3": 180,
                "4": 90,
            },
        },
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
                    "3": cc.v2(1100, 660),
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
            CardOutDiff: 106,
        },
    	CardItem: {
            HandExtraMaxZIndex: 58,
            HandExtraMidZIndex: 44,
            HandExtraMinZIndex: 40,
            DargCardZIndex: 60,
            OutCardsMaxZIndex: 30,
            OutCardFlyZIndex: 60,

            //吃碰杠牌的起始位置
            ExtraCardsStartPos: {
                "1": cc.v2(150, 0),
                "2": cc.v2(1100, 150),
                "3": cc.v2(850, 630),
                "4": cc.v2(136, 520),
            },

            //两组吃碰杠牌之间的间距(注: 第一组末尾和第二组开始之间的间距)
            ExtraCardsGroupDiff: {
                "1": cc.v2(215, 0),
                "2": cc.v2(0, 90),
                "3": cc.v2(-138, 0),
                "4": cc.v2(0, -90),
            },

            //手牌的起始位置
            HandCardsStartPos: {
                "1": cc.v2(165, 0),
                "2": cc.v2(1100, 200),
                "3": cc.v2(850, 630),
                "4": cc.v2(136, 520),
            },

            //吃碰杠和手牌的间距
            ExtraHandCardsDiff: {
                "1": cc.v2(215, 0),
                "2": cc.v2(15, 90),
                "3": cc.v2(-54, 0),
                "4": cc.v2(0, -60),
            },

            //手牌间距
            HandCardsDiff: {
                "1": cc.v2(66, 0),
                "2": cc.v2(0, 21),
                "3": cc.v2(-42, 0),
                "4": cc.v2(0, -21),
            },

            //摸牌的间距
            AddCardDiff: {
                "1": cc.v2(14, 0),
                "2": cc.v2(0, 45),
                "3": cc.v2(-10, 0),
                "4": cc.v2(0, -45),
            },

            //一排出牌的张数
            OutCardsNumPerRow: 10,

            //出牌的起始位置
            OutCardsStartPos: {
                "1": cc.v2(454, 150),
                "2": cc.v2(1030, 227),
                "3": cc.v2(787, 550),
                "4": cc.v2(206, 452),
            },

            //同一排出牌间距
            OutCardsSameRowDiff: {
                "1": cc.v2(36, 0),
                "2": cc.v2(0, 25),
                "3": cc.v2(-36, 0),
                "4": cc.v2(0, -25),
            },

            //同一列出牌间距
            OutCardsSameColumnDiff: {
                "1": cc.v2(0, 38),
                "2": cc.v2(-42, 0),
                "3": cc.v2(0, -38),
                "4": cc.v2(42, 0),
            },

            //一组碰牌
            PengGroup: {
                //锚点必须全部为(0,0)，否则显示会有问题
                CardsPos: {
                    "1": [cc.v2(0, 0), cc.v2(66, 0), cc.v2(132, 0)],
                    "2": [cc.v2(0, 50), cc.v2(0, 25), cc.v2(0, 0)],
                    "3": [cc.v2(84, 0), cc.v2(42, 0), cc.v2(0, 0)],
                    "4": [cc.v2(0, 50), cc.v2(0, 25), cc.v2(0, 0)],
                },
            },

            //一组杠牌
            GangGroup: {
                //锚点必须全部为(0,0)，否则显示会有问题
                CardsPos: {
                    "1": [cc.v2(0, 0), cc.v2(68, 0), cc.v2(136, 0), cc.v2(68, 25)],
                    "2": [cc.v2(0, 50), cc.v2(0, 25), cc.v2(0, 0), cc.v2(0, 38)],
                    "3": [cc.v2(88, 0), cc.v2(44, 0), cc.v2(0, 0), cc.v2(44, 10)],
                    "4": [cc.v2(0, 50), cc.v2(0, 25), cc.v2(0, 0), cc.v2(0, 38)],
                },
            },

            //出牌动画
            OutCardAnim: {
                MoveTime: 0.1,
            },

            //出牌后校正手牌位置动画
            RevHandCardsAnim: {
                MoveTime: 0.2,
                UpDiff: {
                    "1": cc.v2(0, 110),
                    "2": cc.v2(0, 0),
                    "3": cc.v2(0, 0),
                    "4": cc.v2(0, 0),
                },
                UpTime: 0.1,
                DelayTime: 0.1,
                MoveTime1: 0.1,
                DelayTime1: 0.1,
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