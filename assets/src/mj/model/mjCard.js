var UiConfig = require("./../config/mjUiConfig");

cc.Class({
    extends: cc.Node,

	init: function (param) {
        this.initData(param);
        this.initUIView();
    },

    initData (param) {
        this.m_uiData = UiConfig.CardNode.Card;

        this.m_imgName = param.imgName;
        this.m_cardValue = param.cardValue;

        this.m_originX = 0;
        this.m_originY = 0;
        this.m_isUp = false;
    },

    initUIView () {
        var self = this;

        self.m_spCard = self.addComponent(cc.Sprite);
        var frame = Global.ResMgr.CardAtlas.getSpriteFrame(self.m_imgName);
        self.m_spCard.spriteFrame = frame;
        var rect = frame.getRect();
        self.setContentSize(rect.width, rect.height);
    },

    //牌变暗
    setDark () {
        this.color = cc.Color.GRAY;
    },

    //牌变亮
    setLight () {
        this.color = cc.Color.WHITE;
    },

    //获取原始位置
    getOriginPos() {
        return cc.v2(this.m_originX, this.m_originY);
    },

    //设置原始位置
    setOriginPos (x, y) {
        this.m_originX = x;
        this.m_originY = y;
        this.setPosition(x, y);
        return this;
    },

    //牌起立
    setUp () {
        if (this.m_isUp) {
            return;
        }
        this.m_isUp = true;
        this.setPosition(this.m_originX, this.m_originY + this.m_uiData.CardUpDiff);
    },

    //牌放倒
    setDown () {
        this.setPosition(this.m_originX, this.m_originY);
    },
});