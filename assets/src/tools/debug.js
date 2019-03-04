var Debug = module.exports = {};
Debug.step = 1;

Debug.doTest = function () {
    if (Debug.step == 1) {
    	var extraCardsList = [
    		{
    			opeType: 1,
    			cardValue: 0,
    			targetMid: 10001,
    		},
    		// {
    		// 	opeType: 2,
    		// 	cardValue: 1,
    		// 	targetMid: 10001,
    		// },
    	];
        Global.CardItemList[1].redrawExtraCards(extraCardsList);

        Debug.step = 2;
    } else if (Debug.step == 2) {
        Debug.step = 1;
    }
};