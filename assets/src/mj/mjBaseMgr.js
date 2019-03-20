cc.Class({
    extends: cc.Component,

    init () {
        this.initData();
        this.initUIView();
    },

    initData () {
    },

    initUIView () {
    },

    touchEvent (event) {
    },

    ////////////////////////////////////消息处理函数begin////////////////////////////////////
    commonMsgHandler (funcName, res) {
        if (this[funcName]) {
            this[funcName](res);
        }
    },
    ////////////////////////////////////消息处理函数end////////////////////////////////////
});