var Debug = module.exports = {};
Debug.step = 1;

Debug.doTest = function () {
    if (Debug.step == 1) {
        // Global.Game.m_socketMgr.sendMsg(Global.SocketCmd.CREATE_FRIEND_ROOM, {gameType: Global.GameID.GT_MJ}, function (data) {
        //     if (data.code == Global.Code.OK) {
        //         var roomSceneName = Global.RoomSceneName[Global.GameID.GT_MJ];
        //         cc.director.loadScene(roomSceneName);
        //     } else {
        //         console.log(data.msg);
        //     }
        // });

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

        // var maList = [
        //     {cardValue: 0, result: 0},
        //     {cardValue: 1, result: 1},
        //     {cardValue: 2, result: 0},
        //     {cardValue: 3, result: 1},
        //     {cardValue: 4, result: 0},
        //     {cardValue: 5, result: 1},
        // ];
        // Global.Room.m_animMgr.playMoMaAnim(maList, function () {
        //     console.log("摸马结束");
        // });

        // var res = {
        //     "socketCmd":20203,
        //     "huMid":10008,
        //     "maList":maList,
        //     "roomState":4,
        //     "gameState":3,
        //     "roundEndTime":"2019-4-16 10:33:33",
        //     "userList":{
        //         "1018":{
        //             "mid":1018,
        //             "nick":"裙下三千臣",
        //             "head_url":"http://127.0.0.1:3001/head/21.png",
        //             "gold":6985,
        //             "diamond":0,
        //             "extraCards":[
        //                 {
        //                     "opeType":1,
        //                     "cardValue":23,
        //                     "targetMid":1020
        //                 }
        //             ],
        //             "handCards":[
        //                 25,
        //                 0,
        //                 4,
        //                 16,
        //                 26,
        //                 10,
        //                 25,
        //                 11,
        //                 6,
        //                 21
        //             ],
        //             "rateList":[
        //                 {
        //                     "rateType":2,
        //                     "rateValue":-3
        //                 },
        //                 {
        //                     "rateType":8,
        //                     "rateValue":-1
        //                 }
        //             ],
        //             "roundScore":-400,
        //             "totalScore":0,
        //             "seatID":1
        //         },
        //         "1019":{
        //             "mid":1019,
        //             "nick":"寄予清风",
        //             "head_url":"http://127.0.0.1:3001/head/37.png",
        //             "gold":9628,
        //             "diamond":0,
        //             "extraCards":[
        //                 {
        //                     "opeType":1,
        //                     "cardValue":13,
        //                     "targetMid":1020
        //                 },
        //                 {
        //                     "opeType":1,
        //                     "cardValue":26,
        //                     "targetMid":"10008"
        //                 }
        //             ],
        //             "handCards":[
        //                 16,
        //                 11,
        //                 20,
        //                 17,
        //                 2,
        //                 18,
        //                 3
        //             ],
        //             "rateList":[
        //                 {
        //                     "rateType":8,
        //                     "rateValue":-1
        //                 }
        //             ],
        //             "roundScore":-100,
        //             "totalScore":0,
        //             "seatID":2
        //         },
        //         "1020":{
        //             "mid":1020,
        //             "nick":"西子病如娇",
        //             "head_url":"http://127.0.0.1:3001/head/33.png",
        //             "gold":6388,
        //             "diamond":0,
        //             "extraCards":[
        //                 {
        //                     "opeType":2,
        //                     "cardValue":19,
        //                     "targetMid":1018
        //                 },
        //                 {
        //                     "opeType":1,
        //                     "cardValue":1,
        //                     "targetMid":"10008"
        //                 },
        //                 {
        //                     "opeType":1,
        //                     "cardValue":7,
        //                     "targetMid":1019
        //                 }
        //             ],
        //             "handCards":[
        //                 0,
        //                 17,
        //                 6,
        //                 25
        //             ],
        //             "rateList":[
        //                 {
        //                     "rateType":1,
        //                     "rateValue":3
        //                 },
        //                 {
        //                     "rateType":8,
        //                     "rateValue":-1
        //                 }
        //             ],
        //             "roundScore":200,
        //             "totalScore":0,
        //             "seatID":3
        //         },
        //         "10008":{
        //             "mid":10008,
        //             "nick":"游客10008",
        //             "head_url":"",
        //             "gold":5000,
        //             "diamond":0,
        //             "extraCards":[

        //             ],
        //             "handCards":[
        //                 12,
        //                 13,
        //                 6,
        //                 6,
        //                 12,
        //                 3,
        //                 15,
        //                 14,
        //                 4,
        //                 21,
        //                 20,
        //                 5,
        //                 22,
        //                 6,
        //             ],
        //             "rateList":[
        //                 {
        //                     "rateType":7,
        //                     "rateValue":3
        //                 }
        //             ],
        //             "roundScore":300,
        //             "totalScore":0,
        //             "seatID":4
        //         }
        //     }
        // };

        // Global.Room.m_resultMgr.resultInfo(res);

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