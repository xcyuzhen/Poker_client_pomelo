cc.Class({
    extends: cc.Component,

    properties: {
        m_headNode: cc.Node,
        m_lbName: cc.Label,
        m_lbID: cc.Label,
        m_groupSV: cc.ScrollView,
        m_gameListLayer: cc.Node,
        m_groupListLayer: cc.Node,
        GroupItem: cc.Prefab,
    },

    onLoad () {
        this.initData();
        this.initUIView();
    },

    //初始化数据
    initData () {

    },

    //刷新界面
    initUIView () {
        this.updateSelfInfo();
        this.m_gameListLayer.active = true;
        this.m_groupListLayer.active = false;
    },

    //刷新个人信息
    updateSelfInfo () {
        this.m_lbName.string = Global.SelfUserData.nick;
        this.m_lbID.string = "ID:" + Global.SelfUserData.mid;
    },

    chooseGame (sender, eventData) {
        this.m_gameListLayer.active = false;
        this.m_groupListLayer.active = true;
    },

    //场次列表返回键点击事件
    btnBackEvent (sender) {
        this.m_gameListLayer.active = true;
        this.m_groupListLayer.active = false;
    },
});
