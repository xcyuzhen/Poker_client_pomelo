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
        this.m_originZIndex = 0;

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

    getCardValue () {
        return this.m_cardValue;
    },

    //切换图片
    changeSpriteFrame (frameName) {
        if (this.m_imgName == frameName) {
            return;
        }

        var frame = Global.ResMgr.CardAtlas.getSpriteFrame(frameName);
        this.m_spCard.spriteFrame = frame;
        var rect = frame.getRect();
        this.setContentSize(rect.width, rect.height);

        this.m_imgName = frameName;
    },

    //牌变暗
    setDark () {
        this.color = cc.Color.GRAY;
    },

    //牌变亮
    setLight () {
        this.color = cc.Color.WHITE;
    },

    //设置原始位置
    setOriginPos (x, y) {
        this.m_originX = x;
        this.m_originY = y;
        this.setPosition(x, y);
        return this;
    },

    //获取原始位置
    getOriginPos() {
        return cc.v2(this.m_originX, this.m_originY);
    },

    //设置原始zIndex
    setOriginZIndex (zIndex) {
        this.m_originZIndex = zIndex;
    },

    //获取原始zIndex
    getOriginZIndex () {
        return this.m_originZIndex;
    },

    //是否包含世界坐标
    containsWorldPoint(point) {
        var rect = this.getBoundingBoxToWorld();
        return rect.contains(point);
    },

    //是否包含世界坐标(缩小自己的rect)
    containsWorldPointSmall(point) {
        var rect = this.getBoundingBoxToWorld();
        var newRect = cc.rect(rect.x + rect.width/5, rect.y + rect.height/5, rect.width*3/5, rect.height*3/5);
        return newRect.contains(point);
    },

    //牌是否是起立状态
    isUp () {
        return this.m_isUp();
    },

    //牌起立
    setUp () {
        this.setPosition(this.m_originX, this.m_originY + this.m_uiData.CardUpDiff);
        this.m_isUp = true;
    },

    //牌放倒
    setDown () {
        this.setPosition(this.m_originX, this.m_originY);
        this.m_isUp = false;
    },

    //获取牌起立时的posy
    getUpPosY () {
        return this.m_originY + this.m_uiData.CardUpDiff;
    },
});