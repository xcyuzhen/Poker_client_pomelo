cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.init();
    },

    start () {
    },

    onDestroy () {
        //清空相关数据
        Global.Game.m_socketMgr.delMsgDataByGroup(Global.MsgGroupName[Global.GameID.GT_MJ]);
    },

    init () {
        this.initData();
        this.initMsgCmdMap();
    },

    initData () {
        this.msgHandleFrame = 5;                            //消息处理帧率(多少帧处理一回)
        this.curFrame = 0;                                  //帧计数
        this.msgPause = false;                              //是否暂停消息处理
        this.msgList = [];                                  //消息列表
    },

    updateTime (dt) {
        var self = this;

        if (self.msgPause) {
            return;
        }

        self.curFrame ++;
        if (self.curFrame >= self.msgHandleFrame) {
            self.curFrame = 0;

            //将大厅缓存的未处理的房间消息插入到列表最前面
            var hallMsgList = Global.Game.m_socketMgr.getMsgDataByGroup(Global.MsgGroupName[Global.GameID.GT_MJ]);
            if (hallMsgList.length > 0) {
                self.msgList = hallMsgList.concat(self.msgList);
            }

            //取出一条消息进行处理
            var oneMsg = self.msgList.shift();
            var code = oneMsg.res.code;
            var handler = self.msgCmdMap[code];
            if (! handler) {
                console.log("没有相应的处理函数 code = ", code);
            } else {
                Global.Room.commonMsgHandler(handler, oneMsg.res);
            }
        }
    },

    parseMsgHandle () {
        this.msgPause = true;
    },

    resumeMsgHandle () {
        this.curFrame = 0;
        this.msgPause = false;
    },

    socketMsgGet (data) {
        var groupName = data.groupName;
        if (groupName === Global.MsgGroupName[Global.GameID.GT_MJ]) {
            this.msgList.push(data);
        }
    },

    initMsgCmdMap () {
        this.msgCmdMap = {
        };
    },
});