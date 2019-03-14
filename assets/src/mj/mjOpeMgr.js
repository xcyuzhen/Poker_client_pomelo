var BaseMgr = require("./mjBaseMgr");

cc.Class({
    extends: BaseMgr,

    properties: {
    	m_container: cc.Node,
    	m_btnHu: cc.Button,
    	m_btnPeng: cc.Button,
    	m_btnGang: cc.Button,
    	m_btnGuo: cc.Button,
    	m_gangList: [cc.Node],
    },

    initData () {
    },

    initUIView () {
        //隐藏操作面板
        this.m_container.active = false;
    },

    ////////////////////////////////////消息处理函数begin////////////////////////////////////
    roundInfo (res) {
        var curOpeMid = res.curOpeMid;
        var curOpeList = res.curOpeList;

        //当前操作人不是自己，隐藏操作面板
        if (!Global.Tools.isSelf(curOpeMid)) {
            this.m_container.active = false;
            return
        }

        var hasPengOpe = false;
        var hasGangOpe = false;
        var hasHuOpe = false;
    },
    ////////////////////////////////////消息处理函数end////////////////////////////////////
});