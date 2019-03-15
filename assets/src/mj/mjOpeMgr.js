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
    	this.m_curOpeMid = 0; 										//当前操作人
    	this.m_curOutCardMid = 0; 									//当前轮到的出牌人
    },

    initUIView () {
        //隐藏操作面板
        this.m_container.active = false;
    },

    ////////////////////////////////////消息处理函数begin////////////////////////////////////
    roundInfo (res) {
        this.m_curOpeMid = res.curOpeMid;
        this.m_curOutCardMid = res.curOutCardMid;

        //当前操作人不是自己，隐藏操作面板
        if (!Global.Tools.isSelf(curOpeMid)) {
            this.m_container.active = false;
            return
        }

        var curOpeList = res.curOpeList;
        var hasPengOpe = false;
        var hasGangOpe = false;
        var hasHuOpe = false;

        var opeNum = curOpeList.length;
        for (var i = 0; i < opeNum - 1; i++) {
        	var opeObj = curOpeList[i];
        	var opeType = opeObj.opeType;
        	var opeData = opeObj.opeData;
        }
    },
    ////////////////////////////////////消息处理函数end////////////////////////////////////
});