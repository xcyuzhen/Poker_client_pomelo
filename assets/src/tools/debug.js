var Debug = module.exports = {};
Debug.step = 1;

Debug.doTest = function () {
    if (Debug.step == 1) {
        // Global.CardItemList[1]
        console.log("AAAAAAAAAAA BBBBBBBBBBBB ");

        Debug.step = 2;
    } else if (Debug.step == 2) {
        Debug.step = 1;
    }
};