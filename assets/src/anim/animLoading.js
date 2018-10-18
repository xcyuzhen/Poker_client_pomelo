cc.Class({
    extends: cc.Component,

    properties: {
        anim: cc.Animation,
    },

    playAnim () {
        this.anim.play();
    },
});
