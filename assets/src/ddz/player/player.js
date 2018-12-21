const UserPanel = require("./userPanel");
const CardPanel = require("./cardPanel");

cc.Class({
    extends: cc.Node,

    init () {
        this.initData();
    },

    initData () {
        this.m_userPanel = new UserPanel();
        this.m_userPanel.init();
        this.m_cardPanel = new CardPanel();
        this.m_cardPanel.init();
    },
});