cc.Class({
    extends: cc.Component,

    properties: {
        m_container: cc.Node,
        m_loading: cc.Node,
        m_bg: cc.Node,
    },

    onLoad () {
        var self = this;

        //注册点击事件
        self.node.on(cc.Node.EventType.TOUCH_START, function (event) {}, self);
    },

    openView () {
        if (this.node.active == true) {
            return;
        }

        this.m_container.active = false;
        this.m_loading.active = true;
        this.m_loading.getComponent('animLoading').playAnim();

        this.node.active = true;
    },

    closeView () {
        this.node.active = false;
        this.m_loading.getComponent('animLoading').stopAnim();
    },
});
