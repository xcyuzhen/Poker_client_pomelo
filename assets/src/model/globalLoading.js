cc.Class({
    extends: cc.Component,

    properties: {
        animLoadingPrefab: cc.Prefab,
    },

    onLoad () {
        this.initTouchEvent();
        this.initAnimLoading();
    },

    initTouchEvent () {
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, function (event) {}, self);
    },

    initAnimLoading () {
        this.m_animLoading = cc.instantiate(this.animLoadingPrefab);
        this.node.addChild(this.m_animLoading);
        this.m_animLoading.setPosition(0, 0);
    },

    setLoadingVisible (visible) {
        visible = !!visible;
        this.node.active = visible;

        if (visible) {
            this.m_animLoading.getComponent('animLoading').playAnim();
        } else {
            this.m_animLoading.getComponent('animLoading').stopAnim();
        }
    },
});
