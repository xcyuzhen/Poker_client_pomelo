cc.Class({
    extends: cc.Component,

    properties: {
        m_headNode: cc.Node,
        m_lbName: cc.Label,
        m_lbID: cc.Label,
        m_groupSV: cc.ScrollView,
        m_gameListLayer: cc.Node,
        m_groupListLayer: cc.Node,
        m_createRoomLayer: cc.Component,
        m_enterRoomLayer: cc.Component,
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

    //创建房间
    createRoomBtnClickEvent (sender) {
        this.m_createRoomLayer.openView();
    },

    //加入房间
    enterRoomBtnClickEvent (sender) {
        this.m_enterRoomLayer.openView();
    },

    //选择游戏
    chooseGameBtnClickEvent (sender, eventData) {
        var self = this;

        //拿到场次列表数据
        var groupListConfig;
        for (var index in Global.GameList) {
            var gameConfig = Global.GameList[index];
            if (gameConfig.id == parseInt(eventData)) {
                groupListConfig = gameConfig.groupList;
                break
            }
        }

        //加载场次列表
        var svContent = cc.find("view/content", self.m_groupSV.node);
        if (!! svContent) {
            //清除所有子节点
            svContent.removeAllChildren(true);
            self.m_groupSV.scrollToLeft();

            //重新加载新节点
            var cellWidth = self.m_groupSV.node.width / 4;
            var cellHeight = self.m_groupSV.node.height;
            cc.loader.loadRes("prefab/GroupItem", function (err, prefab) {
                for (var i = 0; i < groupListConfig.length; i++) {
                    var groupItemConfig = groupListConfig[i]
                    var itemRes = Global.GroupItemResConfig[i]

                    var groupItem = cc.instantiate(prefab);
                    groupItem.name = "GroupItem" + (i+1);
                    groupItem.x = (i + 0.5) * cellWidth;
                    groupItem.y = cellHeight / 2 + 20;
                    svContent.addChild(groupItem)

                    var lbBase = cc.find("lbBase", groupItem).getComponent(cc.Label);
                    lbBase.string = groupItemConfig.base;
                    var lbLimit = cc.find("lbLimit", groupItem).getComponent(cc.Label);
                    lbLimit.string = Global.Tools.getFormatMoney(groupItemConfig.limitMin) + " - " + Global.Tools.getFormatMoney(groupItemConfig.limitMax);

                    var clickHandler = Global.Tools.createClickEventHandler(self.node, "hall", "enterGroupLevel", {id: eventData, level: groupItemConfig.level})
                    groupItem.getComponent(cc.Button).clickEvents.push(clickHandler);

                    cc.loader.loadRes(Global.GroupItemResConfig[i], cc.SpriteFrame, function (err, spriteFrame) {
                        var groupItem = this;
                        groupItem.getComponent(cc.Sprite).spriteFrame = spriteFrame;

                        if (groupItem.name === "GroupItem" + groupListConfig.length) {
                            self.m_gameListLayer.active = false;
                            self.m_groupListLayer.active = true;
                        }
                    }.bind(groupItem))
                }
            });
        }
    },

    //场次列表返回键点击事件
    btnBackEvent (sender) {
        this.m_gameListLayer.active = true;
        this.m_groupListLayer.active = false;
    },

    //请求加入某场次
    enterGroupLevel (sender, groupData) {
        var gameID = groupData.id;
        //删除冗余的数据
        Global.Game.m_socketMgr.delMsgDataByGroup(Global.MsgGroupName[gameID]);

        var params = {
            level: groupData.level,
        }

        Global.Game.m_socketMgr.sendMsg(Global.SocketCmd.ENTER_GROUP_LEVEL, params, function (data) {
            if (data.code != Global.Code.OK) {
                console.log(data.msg);
            } else {
                var roomSceneName = Global.RoomSceneName[gameID];
                cc.director.loadScene(roomSceneName);
            }
        });
    },

    //收到socketMsg
    socketMsgGet (res) {

    },

    //登录成功
    loginSucceed () {
        this.updateSelfInfo();
        Global.Game.checkInGame();
    },
});
