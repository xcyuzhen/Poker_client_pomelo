var Debug = module.exports = {};
Debug.step = 1;

Debug.doTest = function () {
    if (Debug.step == 1) {
        // var res = {
        //     curOpeMid: 10008,
        //     curOutCardMid: 10007,
        //     curOpeList: [
        //         {
        //             opeType: 2,
        //             opeData: 0,
        //         },
        //         {
        //             opeType: 3,
        //             opeData: 1,
        //         },
        //         {
        //             opeType: 4,
        //             opeData: 2,
        //         },
        //     ],
        // };
        // Global.Room.m_opeMgr.roundInfo(res);

    	// var extraCardsList = [
    	// 	{
    	// 		opeType: 1,
    	// 		cardValue: 17,
    	// 		targetMid: 10001,
    	// 	},
    	// 	// {
    	// 	// 	opeType: 2,
    	// 	// 	cardValue: 1,
    	// 	// 	targetMid: 10001,
    	// 	// },
    	// 	// {
    	// 	// 	opeType: 3,
    	// 	// 	cardValue: 2,
    	// 	// 	targetMid: 10001,
    	// 	// },
    	// ];
     //    Global.CardItemList[1].redrawExtraCards(extraCardsList);
     //    Global.CardItemList[2].redrawExtraCards(extraCardsList);
     //    Global.CardItemList[3].redrawExtraCards(extraCardsList);
     //    Global.CardItemList[4].redrawExtraCards(extraCardsList);

     //    var handCardsList1 = [1,2,3,4,5,6,6,9,10,11,6];
     //    Global.CardItemList[1].redrawHandCards(handCardsList1);
     //    var handCardsList2 = [];
     //    Global.CardItemList[2].m_gameData.handCardsNum = 11;
     //    Global.CardItemList[2].redrawHandCards(handCardsList2);
     //    Global.CardItemList[3].m_gameData.handCardsNum = 11;
     //    Global.CardItemList[3].redrawHandCards(handCardsList2);
     //    Global.CardItemList[4].m_gameData.handCardsNum = 11;
     //    Global.CardItemList[4].redrawHandCards(handCardsList2);

     //    var outCardsList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
     //    Global.CardItemList[1].redrawOutCards(outCardsList);
     //    Global.CardItemList[2].redrawOutCards(outCardsList);
     //    Global.CardItemList[3].redrawOutCards(outCardsList);
     //    Global.CardItemList[4].redrawOutCards(outCardsList);

        // Global.CardItemList[1].redrawShowCards(handCardsList1);
        // Global.CardItemList[2].redrawShowCards(handCardsList1);
        // Global.CardItemList[3].redrawShowCards(handCardsList1);
        // Global.CardItemList[4].redrawShowCards(handCardsList1);

        // Global.Room.m_animMgr.playPengAnim(1, function () {
        //     console.log("AAAAAAAAAAAAAAAA 结束了");
        // });

        var maList = [
            {cardValue: 0, result: 0},
            {cardValue: 1, result: 1},
            {cardValue: 2, result: 0},
            {cardValue: 3, result: 1},
            {cardValue: 4, result: 0},
            {cardValue: 5, result: 1},
        ];
        Global.Room.m_animMgr.playMoMaAnim(maList, function () {
            console.log("摸马结束");
        });

        Debug.step = 1;
    } else if (Debug.step == 2) {
        // Global.CardItemList[2].serverOutCard({cardValue: 0});

        // Global.Room.m_animMgr.playPengAnim(2, function () {
        //     console.log("AAAAAAAAAAAAAAAA 结束了");
        // });

        var extraCardsList = [
            {
                opeType: 1,
                cardValue: 17,
                targetMid: 10001,
            },
            // {
            //  opeType: 2,
            //  cardValue: 1,
            //  targetMid: 10001,
            // },
            // {
            //  opeType: 3,
            //  cardValue: 2,
            //  targetMid: 10001,
            // },
        ];
        Global.CardItemList[1].redrawExtraCards(extraCardsList);
        Global.CardItemList[2].redrawExtraCards(extraCardsList);
        Global.CardItemList[3].redrawExtraCards(extraCardsList);
        Global.CardItemList[4].redrawExtraCards(extraCardsList);

        var handCardsList1 = [1,2,3,4,5,6,6,9,10,11,6];
     //    Global.CardItemList[1].redrawHandCards(handCardsList1);
     //    var handCardsList2 = [];
     //    Global.CardItemList[2].m_gameData.handCardsNum = 11;
     //    Global.CardItemList[2].redrawHandCards(handCardsList2);
     //    Global.CardItemList[3].m_gameData.handCardsNum = 11;
     //    Global.CardItemList[3].redrawHandCards(handCardsList2);
     //    Global.CardItemList[4].m_gameData.handCardsNum = 11;
     //    Global.CardItemList[4].redrawHandCards(handCardsList2);

     //    var outCardsList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
     //    Global.CardItemList[1].redrawOutCards(outCardsList);
     //    Global.CardItemList[2].redrawOutCards(outCardsList);
     //    Global.CardItemList[3].redrawOutCards(outCardsList);
     //    Global.CardItemList[4].redrawOutCards(outCardsList);

        Global.CardItemList[1].redrawShowCards(handCardsList1);
        Global.CardItemList[2].redrawShowCards(handCardsList1);
        Global.CardItemList[3].redrawShowCards(handCardsList1);
        Global.CardItemList[4].redrawShowCards(handCardsList1);

        Debug.step = 1;
    }
};