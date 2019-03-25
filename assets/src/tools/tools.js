var Tools = module.exports = {};

var print_r = function (obj, indent) {
    if (typeof(obj) === "function") {
        return "Function";
    }
    if (typeof(obj) !== "object") {
        return obj;
    }
    var result_str = "";
    indent = indent || 0;
    for (var key in obj) {
        var val = obj[key];
        if (typeof(key) === "string") {
            key = "\"" + key + "\"";
        }
        var szSuffix = "";
        if (typeof(val) == "object") {
            szSuffix = "{";
        }
        var szPrefix = new Array(indent + 1).join("    ");
        var formatting = szPrefix + "[" + key + "]" + " = " + szSuffix;
        if (typeof(val) == "object") {
            result_str = result_str + formatting + "\n" + print_r(val, indent + 1) + szPrefix + "},\n"
        } else {
            var szValue = print_r(val)
            result_str = result_str + formatting + szValue + ",\n"
        }
    }
    return result_str;
};

Tools._debug = function (obj) {
    console.log(print_r(obj));
};

Tools.clone = function(origin) {
    var result = Array.isArray(origin) ? [] : {};
    for (var key in origin) {
        if (origin.hasOwnProperty(key)) {
            if (typeof origin[key] === 'object') {
                result[key] = Tools.clone(origin[key]);
            } else {
                result[key] = origin[key];
            }
        }
    }
    return result;
};

Tools.getUdid = function () {
    return "yuzhenudidguest2";
};

//判断是否是自己
Tools.isSelf = function (mid) {
    if (!mid) {
        return false;
    }

    return Global.SelfUserData.mid == mid;
}

//检测mid是否合法
Tools.midCheck = function (mid) {
    mid = Number(mid);
    return mid || mid > 0;
};

//检测座位号是否合法
Tools.seatCheck = function (seatID) {
    seatID = Number(seatID);
    return seatID || seatID > 0;
};

Tools.createClickEventHandler = function (target, component, handler, customEventData) {
    var clickEventHandler = new cc.Component.EventHandler();
    clickEventHandler.target = target;
    clickEventHandler.component = component;
    clickEventHandler.handler = handler;
    clickEventHandler.customEventData = customEventData;

    return clickEventHandler;
};

//==============================--
//desc: 获取格式化的钱币
//@tnum: 需要转化的数字
//@isImage: 是否显示的是艺术字
//@return 格式化后的字符串
//example:
//    输入                  输出
//    123456, false         12.34万
//    123456789, false      1.23亿
//    123456, true          12.34w
//    123456789, true       1.23y
//==============================--
Tools.getFormatMoney = function (tnum, isImage) {
    var num = parseInt(tnum) || 0

    var y = "亿";
    var w = "万";
    if (isImage) {
        y = "y";
        w = "w";
    }

    if (num >= 100000000) {
        num = (num - num % 10000) / 100000000 + y
    } else if (num >= 10000) {
        num = (num - num % 100) / 10000 + w
    } else if (num <= -100000000) {
        num = (num - num % -10000) / 100000000 + y
    } else if (num <= -10000) {
        num = (num - num % -100) / 10000 + w
    }

    return num.toString();
};

//==============================--
/*
desc: 格式化数字
@minLen: 数字最小位数
example:
    输入        minLen          输出
    12          2               12
    12          4               0012
    12          1               12
    1           2               01
*/
//==============================--
Tools.getFormatNumber = function (num, minLen) {
    var numStr = '' + num;
    var zeroNum = minLen - numStr.length;

    if (zeroNum > 0) {
        var zeroStr = new Array(zeroNum).fill('0');
        numStr = zeroStr + numStr;
    }

    return numStr;
};