module.exports = {
    ZIndexConfig: {
    	RoomInfoNode: 0,
    	PlayerNode: 1,
    	CardNode: 2,
        AnimNode: 3,
        OpeNode: 4,
        ResultNode: 5,
    },

    RoomInfoNode: {
        Turnplate: {
            RotateAngle: {
                "1": 0,
                "2": 90,
                "3": 180,
                "4": 270,
            },
        },
        TimeTimer: {
            Txt: "{0}:{1}",
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
                    "3": cc.v2(640, 630),
                    "4": cc.v2(340, 400),
                },
                Pos1: {
                    "1": cc.v2(60, 100),
                    "2": cc.v2(1220, 400),
                    "3": cc.v2(1100, 630),
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
    			Size: cc.size(150, 20),
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
                    "3": cc.v2(0, -120),
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
            DargCardZIndex: 70,
            OutCardsMaxZIndex: 30,
            OutCardFlyZIndex: 70,
            OutCardArrowZIndex: 60,

            //吃碰杠牌的起始位置
            ExtraCardsStartPos: {
                "1": cc.v2(150, 0),
                "2": cc.v2(1100, 120),
                "3": cc.v2(850, 600),
                "4": cc.v2(136, 490),
            },

            //两组吃碰杠牌之间的间距(注: 第一组开始和第二组开始之间的间距)
            ExtraCardsGroupDiff: {
                "1": cc.v2(215, 0),
                "2": cc.v2(0, 90),
                "3": cc.v2(-138, 0),
                "4": cc.v2(0, -90),
            },

            //手牌的起始位置
            HandCardsStartPos: {
                "1": cc.v2(165, 0),
                "2": cc.v2(1100, 170),
                "3": cc.v2(850, 600),
                "4": cc.v2(136, 490),
            },

            //吃碰杠和手牌的间距(注: 最后一组吃碰杠开始和第一张手牌的间距)
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

            //吃碰杠和亮牌的间距
            ExtraShowCardsDiff: {
                "1": cc.v2(215, 0),
                "2": cc.v2(0, 90),
                "3": cc.v2(-54, 0),
                "4": cc.v2(0, -40),
            },

            //亮牌间距
            ShowCardsDiff: {
                "1": cc.v2(66, 0),
                "2": cc.v2(0, 25),
                "3": cc.v2(-42, 0),
                "4": cc.v2(0, -25),
            },

            //摸牌的间距
            AddCardDiff: {
                "1": cc.v2(14, 0),
                "2": cc.v2(0, 45),
                "3": cc.v2(-10, 0),
                "4": cc.v2(0, -45),
            },

            //亮摸牌的间距
            ShowAddCardDiff: {
                "1": cc.v2(14, 0),
                "2": cc.v2(0, 15),
                "3": cc.v2(-10, 0),
                "4": cc.v2(0, -15),
            },

            //一排出牌的张数
            OutCardsNumPerRow: 10,

            //出牌的起始位置
            OutCardsStartPos: {
                "1": cc.v2(454, 150),
                "2": cc.v2(1030, 197),
                "3": cc.v2(787, 520),
                "4": cc.v2(206, 422),
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
                    "2": cc.v2(0, 66),
                    "3": cc.v2(0, 66),
                    "4": cc.v2(0, 66),
                },
                UpTime: 0.1,
                DelayTime: 0.1,
                MoveTime1: 0.1,
                DelayTime1: 0.1,
            },

            //最后出牌箭头
            OutCardArrow: {
                Ap: cc.v2(0.5, 0),
                Diff: {
                    "1": cc.v2(0, 20),
                    "2": cc.v2(0, 20),
                    "3": cc.v2(0, 20),
                    "4": cc.v2(0, 20),
                },
                Anim: {
                    AnimTime: 1.0,
                    UpDiff: cc.v2(0, 10),
                    DownDiff: cc.v2(0, -10),
                    DelayTime: 0.02,
                },
            },
    	},
    },

    AnimNode: {
        PengGangAnim: {
            Sp: {
                Ap: cc.v2(0.5, 0.5),
                Pos: {
                    "1": cc.v2(640, 60),
                    "2": cc.v2(1110, 360),
                    "3": cc.v2(640, 660),
                    "4": cc.v2(170, 360),
                },
            },
            Anim: {
                StartScale: 2.0,
                endScale: 1.0,
                ScaleTime: 0.2,
                StayTime: 1.0,
                FadeOutTime: 0.5,
                FadeScale: 1.2,
            },
        },

        HuAnim: {
            Sp: {
                Ap: cc.v2(0.5, 0.5),
                Pos: {
                    "1": cc.v2(640, 100),
                    "2": cc.v2(1070, 360),
                    "3": cc.v2(640, 620),
                    "4": cc.v2(210, 360),
                },
            },
            Anim: {
                StartScale: 2.0,
                endScale: 1.0,
                ScaleTime: 0.2,
                StayTime: 1.5,
                FadeOutTime: 0.5,
                FadeScale: 1.2,
            },
        },

        LiuJuAnim: {
            Sp: {
                Ap: cc.v2(0.5, 0.5),
                Pos: cc.v2(640, 360),
            },
            Anim: {
                StartScale: 2.0,
                endScale: 1.0,
                ScaleTime: 0.1,
                StayTime: 3.0,
                FadeOutTime: 0.3,
                FadeScale: 1.2,
            },
        },

        MoMaAnim: {
            MaCardShowDelayTime: 0.5,
            MaNumNodeDelayTime: 0.5,
            NodeDelayTime: 1,
        },
    },

    ResultNode: {
        LbEndTime: {
            Ap: cc.v2(0, 1.0),
            Pos: cc.v2(20, 700),
            Txt: "结束时间:{0}",
        },
        LbGroupName: {
            Ap: cc.v2(0, 1.0),
            Diff: cc.v2(20, 0),
            Txt: "场次:{0}",
        },
        LbBase: {
            Ap: cc.v2(0, 1.0),
            Diff: cc.v2(20, 0),
            Txt: "底分:{0}",
        },
        ResultItem: {
            Ap: cc.v2(0, 0),
            StartPos: cc.v2(0, 500),
            Diff: cc.v2(0, -120),
            Size: cc.size(1280, 120),
            Head: {
                Ap: cc.v2(0.5, 0.5),
                Pos: cc.v2(100, 70),
            },
            Name: {
                FontSize: 20,
                Size: cc.size(150, 20),
                Ap: cc.v2(0.5, 0.5),
                Diff: cc.v2(0, -45),
            },
            Rate: {
                FontSize: 20,
                Size: cc.size(1000, 20),
                Ap: cc.v2(0, 0),
                Pos: cc.v2(200, 95),
            },
            Score: {
                FontSize: 20,
                Ap: cc.v2(0, 0.5),
                Pos: cc.v2(1100, 60),
            },
            CardNode: {
                Ap: cc.v2(0, 0),
                Pos: cc.v2(200, 20),
                PengGroup: {
                    Ap: cc.v2(0, 0),
                    Pos: [cc.v2(0, 0), cc.v2(42, 0), cc.v2(84, 0)],
                },
                GangGroup: {
                    Ap: cc.v2(0, 0),
                    Pos: [cc.v2(0, 0), cc.v2(42, 0), cc.v2(84, 0), cc.v2(42, 10)],
                },
                ExtraStartPos: cc.v2(0, 0),
                ExtraGroupDiff: cc.v2(138, 0),
                ExtraHandDiff: cc.v2(10, 0),
                HandCard: {
                    Ap: cc.v2(0, 0),
                    Diff: cc.v2(42, 0),
                    AddDiff: cc.v2(10, 0),
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

        MaCardRes: "my_extra_{0}",

        resultShowCardRes: "opposite_extra_{0}",
    },
};