var BaseMgr = require("./mjBaseMgr");
var Config = require("./config/mjConfig");
var UiConfig = require("./config/mjUiConfig");
var Card = require("./model/mjCard");

cc.Class({
    extends: BaseMgr,

    properties: {
        m_container: cc.Node,
        m_lbEndTime: cc.Label,
        m_lbGroupName: cc.Label,
        m_lbBase: cc.Label,
    },

    initData () {
        this.m_uiData = UiConfig.ResultNode;
    },

    ////////////////////////////////////消息处理函数begin////////////////////////////////////
    //游戏结束
    resultInfo (res) {
        var self = this;

        var huMid = res.huMid;
        var maList = res.maList;
        var userList = res.userList;

        //亮牌
        Global.Room.m_playerMgr.redrawAllShowCards(userList);

        if (huMid) {
            console.log("RRRRRRRRRRRRRRRRRRRRRRRR 1.开始播放胡牌动画");
            //播放胡牌动画
            var huLocalSeatID = Global.Room.m_playerMgr.getLocalSeatByMid(huMid);
            Global.Room.m_animMgr.playHuAnim(huLocalSeatID, function () {
                console.log("RRRRRRRRRRRRRRRRRRRRRRRR 1.播放胡牌动画完毕");
                console.log("RRRRRRRRRRRRRRRRRRRRRRRR 2.开始播放摸马动画");
                //播放摸马动画
                Global.Room.m_animMgr.playMoMaAnim(maList, function () {
                    console.log("RRRRRRRRRRRRRRRRRRRRRRRR 2.播放摸马动画完毕");
                    console.log("RRRRRRRRRRRRRRRRRRRRRRRR 3.开始显示结算界面");
                    self.showResultPanel(res);
                });
            });
        } else {
            console.log("RRRRRRRRRRRRRRRRRRRRRRRR 1.开始播放流局动画");
            //播放流局动画
            Global.Room.m_animMgr.playLiuJuAnim(maList, function () {
                console.log("RRRRRRRRRRRRRRRRRRRRRRRR 1.播放流局动画完毕");
            });
        }
    },
    ////////////////////////////////////消息处理函数end////////////////////////////////////

    ////////////////////////////////////功能函数begin////////////////////////////////////
    showResultPanel (resultData) {
        var self = this;

        //顶部信息
        var groupConfig = Global.Room.m_roomInfoMgr.getGroupConfig();

        self.m_lbEndTime.string = self.m_uiData.LbEndTime.Txt.format(resultData.roundEndTime);
        self.m_lbGroupName.string = self.m_uiData.LbGroupName.Txt.format(groupConfig.name);
        self.m_lbBase.string = self.m_uiData.LbBase.Txt.format(groupConfig.base);

        //创建中部
        var resultUserList = resultData.userList;
        for (var tMid in resultUserList) {
            var itemData = resultUserList[tMid];
            var node = self.createResultItem(itemData);
            var localSeatID = Global.Room.m_playerMgr.getLocalSeatByMid(tMid);
            node.x = self.m_uiData.ResultItem.StartPos.x + (localSeatID - 1) * self.m_uiData.ResultItem.Diff.x;
            node.y = self.m_uiData.ResultItem.StartPos.y + (localSeatID - 1) * self.m_uiData.ResultItem.Diff.y;
            self.m_container.addChild(node);
        }

        self.node.active = true;
    },

    closeResultPanel () {
        this.node.active = false;
        this.m_container.removeAllChildren(true);
    },

    createResultItem (itemData) {
        var self = this;
        var uiData = self.m_uiData.ResultItem;

        var node = new cc.Node();
        node.setAnchorPoint(uiData.Ap);
        node.setContentSize(uiData.Size);

        //头像
        var headPos = uiData.Head.Pos;
        cc.loader.loadRes("prefab/GameHead", function (err, prefab) {
            var head = cc.instantiate(prefab);
            head.setAnchorPoint(uiData.Head.Ap);
            head.setPosition(headPos);
            node.addChild(head);
        });

        //昵称
        var lbName = Global.UiFactory.createLabel(itemData.nick, uiData.Name.FontSize);
        lbName.node.setContentSize(uiData.Name.Size);
        lbName.node.setAnchorPoint(uiData.Name.Ap);
        var nameDiff = uiData.Name.Diff;
        lbName.node.setPosition(headPos.x + nameDiff.x, headPos.y + nameDiff.y);
        lbName.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        lbName.verticalAlign = cc.Label.VerticalAlign.CENTER;
        // lbName.overflow = cc.Label.Overflow.CLAMP;
        lbName.enableWrapText = false;
        node.addChild(lbName.node, 1);

        //牌型
        var cardNode = self.createShowCardsNode(itemData);
        cardNode.setPosition(uiData.CardNode.Pos);
        node.addChild(cardNode);

        //倍数
        var rateStrList = [];
        for (var i = 0; i < itemData.rateList.length; i++) {
            var rateItem = itemData.rateList[i];
            rateStrList.push((Config.RATE_NAME[rateItem.rateType] + ": " + rateItem.rateValue));
        }
        var rateStr = rateStrList.join(" ");
        var lbRate = Global.UiFactory.createLabel(rateStr, uiData.Rate.FontSize);
        lbRate.node.setAnchorPoint(uiData.Rate.Ap);
        lbRate.node.setPosition(uiData.Rate.Pos);
        lbRate.node.setContentSize(uiData.Rate.Size);
        lbRate.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        lbRate.verticalAlign = cc.Label.VerticalAlign.CENTER;
        lbRate.overflow = cc.Label.Overflow.CLAMP;
        lbRate.enableWrapText = false;
        node.addChild(lbRate.node, 1);

        //赢钱数量
        var lbScore = Global.UiFactory.createLabel(itemData.roundScore, uiData.Score.FontSize);
        lbScore.node.setAnchorPoint(uiData.Score.Ap);
        lbScore.node.setPosition(uiData.Score.Pos);
        lbScore.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        lbScore.verticalAlign = cc.Label.VerticalAlign.CENTER;
        lbScore.overflow = cc.Label.Overflow.NONE;
        lbScore.enableWrapText = false;
        node.addChild(lbScore.node, 1);

        return node;
    },

    createShowCardsNode (itemData) {
        var self = this;

        var uiData = self.m_uiData.ResultItem.CardNode;
        var node = new cc.Node();
        node.setAnchorPoint(uiData.Ap);

        var posX = 0, posY = 0;
        var width = 0, height = 0;

        if (itemData.extraCards.length > 0) {
            var extraNode = self.createExtraCardsNode(itemData.extraCards);
            extraNode.x = posX;
            extraNode.y = posY;
            node.addChild(extraNode);

            posX += extraNode.width;

            posX += uiData.ExtraHandDiff.x;
            posY += uiData.ExtraHandDiff.y;
        }

        var handNode = self.createHandCardsNode(itemData.handCards);
        handNode.x = posX;
        handNode.y = posY;
        node.addChild(handNode);

        node.width = posX + handNode.width;
        node.height = posY + handNode.height;

        return node;
    },

    //创建吃碰杠牌node
    createExtraCardsNode (extraList) {
        var self = this;
        var uiData = self.m_uiData.ResultItem.CardNode;

        var node = new cc.Node();

        extraList = extraList || [];
        if (extraList.length <= 0) {
            return node;
        }

        var extraStartPos = uiData.ExtraStartPos;
        var extraGroupDiff = uiData.ExtraGroupDiff;

        for (var i = 0; i < extraList.length; i++) {
            var extraItemInfo = extraList[i];
            var opeType = extraItemInfo.opeType;
            var extraItemNode;

            switch (opeType) {
                case Config.OPE_TYPE.PENG:
                    extraItemNode = self.drawOneGroupPengCards(extraItemInfo);
                    break;
                case Config.OPE_TYPE.GANG:
                case Config.OPE_TYPE.BU_GANG:
                    extraItemNode = self.drawOneGroupGangCards(extraItemInfo);
                    break;
                case Config.OPE_TYPE.AN_GANG:
                    extraItemNode = self.drawOneGroupAnGangCards(extraItemInfo);
                    break;
            }

            if (!!extraItemNode) {
                var posX = extraStartPos.x + i * extraGroupDiff.x;
                var posY = extraStartPos.y + i * extraGroupDiff.y;

                extraItemNode.setPosition(posX, posY);
                node.addChild(extraItemNode);

                node.width = posX + extraItemNode.width;
                node.height = posX + extraItemNode.height;
            }
        }

        return node;
    },

    //创建手牌node
    createHandCardsNode (handCards) {
        var self = this;
        var uiData = self.m_uiData.ResultItem.CardNode.HandCard;

        var node = new cc.Node();

        //将抓的牌提取出来
        var addCard;
        if (handCards.length % 3 == 2) {
            addCard = handCards.splice(-1, 1)[0];
        }

        //排序
        handCards.sort(function (a, b) {
            return a - b;
        });

        //将抓牌添加进列表
        if (addCard != undefined && addCard != null) {
            handCards.push(addCard);
        }

        var handCardsDiff = uiData.Diff;
        var addCardDiff = uiData.AddDiff;
        var cardsNum = handCards.length;

        for (var i = 0; i < cardsNum; i++) {
            var cardValue = handCards[i];
            var cardImgName = UiConfig.CardResConfig.resultShowCardRes.format(cardValue);

            var param = {
                imgName: cardImgName,
                cardValue: cardValue,
            };
            var card = new Card();
            card.init(param);
            card.setAnchorPoint(uiData.Ap);

            var posX = i * handCardsDiff.x;
            var posY = i * handCardsDiff.y;

            var isAddCard = (i == (cardsNum - 1) && (cardsNum % 3 == 2))
            if (isAddCard) {
                posX += addCardDiff.x;
                posY += addCardDiff.y;
            }

            card.setPosition(posX, posY);
            node.addChild(card);

            node.width = posX + card.width;
            node.height = posX + card.height;
        }

        return node;
    },

    //下一局按钮点击事件
    btnNextRoundClickEvent (sender, param) {
        this.closeResultPanel();
    },

    //离开按钮点击事件
    btnLeaveClickEvent (sender, param) {
        Global.Room.m_roomInfoMgr.btnExitClickEvent();
    },

    //绘制一组碰牌
    drawOneGroupPengCards (pengCardsInfo) {
        var self = this;
        var uiData = self.m_uiData.ResultItem.CardNode.PengGroup;

        var cardValue = pengCardsInfo.cardValue;
        var targetMid = pengCardsInfo.targetMid;

        var cardsPos = uiData.Pos;

        var node = new cc.Node();
        node.setAnchorPoint(cc.v2(0, 0));

        var width = 0, height = 0;

        for (var i = 0; i < 3; i++) {
            var cardImgName = UiConfig.CardResConfig.resultShowCardRes.format(cardValue);
            var param = {
                imgName: cardImgName,
                cardValue: cardValue,
            };
            var card = new Card();
            card.init(param);
            card.setAnchorPoint(uiData.Ap);
            card.setPosition(cardsPos[i]);
            node.addChild(card);

            width = Math.max(width, card.position.x + card.width);
            height = Math.max(height, card.position.y + card.height);
        }

        node.setContentSize(width, height);

        return node;
    },

    //绘制一组明杠牌或补杠牌
    drawOneGroupGangCards (gangCardsInfo) {
        var self = this;
        var uiData = self.m_uiData.ResultItem.CardNode.GangGroup;

        var cardValue = gangCardsInfo.cardValue;
        var targetMid = gangCardsInfo.targetMid;

        var cardsPos = uiData.Pos;

        var node = new cc.Node();
        node.setAnchorPoint(cc.v2(0, 0));

        var width = 0, height = 0;

        for (var i = 0; i < 4; i++) {
            var cardImgName = UiConfig.CardResConfig.resultShowCardRes.format(cardValue);
            var param = {
                imgName: cardImgName,
                cardValue: cardValue,
            };
            var card = new Card();
            card.init(param);
            card.setAnchorPoint(uiData.Ap);
            card.setPosition(cardsPos[i]);
            node.addChild(card);

            width = Math.max(width, card.position.x + card.width);
            height = Math.max(height, card.position.y + card.height);
        }

        node.setContentSize(width, height);

        return node;
    },

    //绘制一组暗杠牌
    drawOneGroupAnGangCards (gangCardsInfo) {
        var self = this;
        var uiData = self.m_uiData.ResultItem.CardNode.GangGroup;

        var cardValue = gangCardsInfo.cardValue;
        var targetMid = gangCardsInfo.targetMid;

        var cardsPos = uiData.Pos;

        var node = new cc.Node();
        node.setAnchorPoint(cc.v2(0, 0));

        var width = 0, height = 0;

        for (var i = 0; i < 4; i++) {
            var tmpValue = cardValue;
            if (i < 3) {
                tmpValue = "back";
            }
            var cardImgName = UiConfig.CardResConfig.resultShowCardRes.format(tmpValue);
            var param = {
                imgName: cardImgName,
                cardValue: cardValue,
            };
            var card = new Card();
            card.init(param);
            card.setAnchorPoint(uiData.Ap);
            card.setPosition(cardsPos[i]);
            node.addChild(card);

            width = Math.max(width, card.position.x + card.width);
            height = Math.max(height, card.position.y + card.height);
        }

        node.setContentSize(width, height);

        return node;
    },
    ////////////////////////////////////功能函数end////////////////////////////////////
});