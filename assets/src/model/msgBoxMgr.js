cc.Class({
    extends: cc.Component,

    properties: {
        m_spTitle: cc.Sprite,
        m_lbContent: cc.Label,
        m_btnSure: cc.Button,
    },

    onLoad () {
        var self = this;

        self.node.on(cc.Node.EventType.TOUCH_START, function (event) {}, self);

        var clickHandler = Global.Tools.createClickEventHandler(self.node, "msgBoxMgr", "btnSureClickEvent")
        self.m_btnSure.clickEvents.push(clickHandler);
    },

    //显示提示框
    /*
        @content: {String}显示的内容
        @clickEventCallBack: {Function} 确定按钮点击回调，默认为关闭弹窗
    */
    showMsgBox (param) {
        var self = this;

        var content = param.content || "";
        self.m_lbContent.string = content;

        self.clickEventCallBack = param.clickEventCallBack || function () {
            self.node.active = false;
        };

        self.node.active = true;
    },

    //关闭提示框
    closeMsgBox () {
        this.node.active = false;
    },

    btnSureClickEvent () {
        var self = this;

        if (!!self.clickEventCallBack) {
            self.clickEventCallBack();
            self.clickEventCallBack = null;
        } else {
            self.closeMsgBox();
        }
    },
});
