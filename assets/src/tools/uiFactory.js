var UiFactory = module.exports = {};

UiFactory.createSprite = function (imgPath) {
    var node = new cc.Node();
    node.setAnchorPoint(cc.v2(0.5, 0.5));

    var sprite = node.addComponent(cc.Sprite);
    cc.loader.loadRes(imgPath, cc.SpriteFrame, function (err, spriteFrame) {
        var sprite = this;
        sprite.spriteFrame = spriteFrame;
    }.bind(sprite));

    return sprite;
};

UiFactory.createLabel = function (str, fontSize) {
    str = str || "";
    fontSize = fontSize || 20;

    var node = new cc.Node();
    var lb = node.addComponent(cc.Label);
    lb.fontSize = fontSize;
    lb.string = str;

    return lb;
}