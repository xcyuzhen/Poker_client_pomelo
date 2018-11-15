cc.Class({
    extends: cc.Component,

    properties: {
        m_headNode: cc.Node,
        m_lbName: cc.Label,
        m_lbID: cc.Label
    },

    onLoad () {
        this.initData();
        this.initUIView();
    },

    initData () {

    },

    initUIView () {
        this.updateSelfInfo();
    },

    updateSelfInfo () {
        this.m_lbName.string = Global.SelfUserData.nick;
        this.m_lbID.string = Global.SelfUserData.mid;
    },
});
