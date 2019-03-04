var UiFactory = module.exports = {};

//创建sprite
UiFactory.createSprite = function (imgPath) {
    var node = new cc.Node();
    node.setAnchorPoint(cc.v2(0.5, 0.5));

    var sprite = node.addComponent(cc.Sprite);
    cc.loader.loadRes(imgPath, cc.SpriteFrame, function (err, spriteFrame) {
        sprite.spriteFrame = spriteFrame;
        var rect = spriteFrame.getRect();
        node.setContentSize(rect.width, rect.height);
    });

    return sprite;
};

//创建合图sprite
UiFactory.createAtlasSprite = function (atlasPath, spriteName) {
    var node = new cc.Node();
    node.setAnchorPoint(cc.v2(0.5, 0.5));

    var sprite = node.addComponent(cc.Sprite);
    cc.loader.loadRes(atlasPath, cc.SpriteAtlas, function (err, atlas) {
        var frame = atlas.getSpriteFrame(spriteName);
        sprite.spriteFrame = frame;
        var rect = frame.getRect();
        node.setContentSize(rect.width, rect.height);
    });

    return sprite;
};

//创建label
UiFactory.createLabel = function (str, fontSize) {
    str = str || "";
    fontSize = fontSize || 20;

    var node = new cc.Node();
    var lb = node.addComponent(cc.Label);
    lb.fontSize = fontSize;
    lb.string = str;

    return lb;
}