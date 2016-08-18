'use strict';

(function (win, doc) {
    var utils = {
        /*
         * @name isArray
         * @type function
         * @explain 验证是否是数组
         * */
        isArray: function (obj) {
            return obj && typeof obj === 'object' && obj.constructor == Array;
        },
        /*
         * @name isString
         * @type function
         * @explain 验证是否是字符串
         * */
        isString: function (obj) {
            return obj && typeof obj === 'string' && obj.constructor == String;
        },
        /*
         * @name hasOwn
         * @type function
         * @explain 验证该属性是否属于某个对象
         * */
        hasOwn: function (obj, key) {
            return Object.prototype.hasOwnProperty.call(obj, key);
        },
        /*
         * @name isObject
         * @type function
         * @explain 验证是否是对象
         * */
        isObject: function (obj) {
            return obj !== null && typeof obj === 'object';
        },
        /*
         * @name isEmpty
         * @type function
         * @explain 是否为空，支持检测数组、对象和字符串
         * */
        isEmpty: function (obj) {
            if (obj == null) return true;
            if (utils.isArray(obj) || utils.isString(obj)) return obj.length === 0;
            for (var key in obj) if (utils.hasOwn(obj, key)) return false;
            return true;
        }.bind(this),
        /*
         * @name extend
         * @type function
         * @explain 对象拷贝
         * */
        extend: function (to, from) {
            var keys = Object.keys(from);
            var i = keys.length;
            while (i--) {
                to[keys[i]] = from[keys[i]];
            }
            return to;
        },
        /*
         * @name each
         * @type function
         * @explain each循环
         * @param {Number} i 索引
         * @param {Object} e 对象
         * */
        each: function (obj, fn) {
            if (obj) {
                var i = 0;
                if (obj.lenghth) {
                    for (var n = obj.length; i < n; i++) {
                        if (fn(i, obj[i]) === false)
                            break
                    }
                } else {
                    for (i in obj) {
                        if (obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
                            break
                        }
                    }
                }
            }
        },
        /*
         * @name trim
         * @type function
         * @explain 去掉左右空格
         * */
        trim: function (v) {
            if (!v) return v;
            return v.replace(/^\s+/g, '').replace(/\s+$/g, '')
        },
        /*
         * @name resolveRootSearch
         * @type function
         * @explain 解析客户端location search参数
         * @return 如果为空，返回null
         * */
        resolveRootSearch: function (str) {
            var msg = window.location.search.match(new RegExp('[\?\&]' + (str) + '=([^\&]+)', 'i'));
            return utils.isEmpty(msg) ? null : msg[1];
        },
        /*
         * 获取浏览器信息
         * @param {String} pc 是否是pc
         * @param {String} os 浏览器信息
         * @param {String} osVersion 版本信息
         * @param {Boolean} ios 是否是ios
         * @param {Boolean} ipad 是否是ipad
         * @param {Boolean} iphone 是否是iphone
         * @param {Boolean} wechat 是否是wechat
         * @param {Boolean} android 是否是android
         * @param {Boolean} androidChrome 是否是androidChrome
         * */
        device: function () {
            var device = {
                pc: false,
                ios: false,
                ipad: false,
                iphone: false,
                wechat: false,
                android: false,
                androidChrome: false
            };
            let ua = navigator.userAgent;
            let android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            let ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            let iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
            let wechat = ua.match(/(MicroMessenger)\/([\d\.]+)/i);

            // Android
            if (android) {
                device.os = 'android';
                device.osVersion = android[2];
                device.android = true;
                device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
            }
            // iOS
            if (ipad || iphone || ipod) {
                device.os = 'ios';
                device.ios = true;
            }
            if (iphone && !ipod) {
                device.osVersion = iphone[2].replace(/_/g, '.');
                device.iphone = true;
            }
            if (ipad) {
                device.osVersion = ipad[2].replace(/_/g, '.');
                device.ipad = true;
            }
            if (ipod) {
                device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
                device.iphone = true;
            }
            // iOS 8+ changed UA
            if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
                if (device.osVersion.split('.')[0] === '10') {
                    device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
                }
            }
            // wechat
            if (wechat) {
                device.os = 'wechat';
                device.osVersion = wechat[2].replace(/_/g, '.');
                device.wechat = true;
            }
            // pc
            if (!device.os && !device.osVersion) {
                device.pc = true;
            }
            return device;
        },
        /*
         * @name formatDate
         * @type function
         * @explain 时间戳转换为字符串时间格式
         * */
        formatDate: function (value, format) {
            var t = new Date(value);
            var tf = function (i) {
                return (i < 10 ? '0' : '') + i
            };
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                switch (a) {
                    case 'yyyy':
                        return tf(t.getFullYear());
                        break;
                    case 'MM':
                        return tf(t.getMonth() + 1);
                        break;
                    case 'dd':
                        return tf(t.getDate());
                        break;
                    case 'HH':
                        return tf(t.getHours());
                        break;
                    case 'mm':
                        return tf(t.getMinutes());
                        break;
                    case 'ss':
                        return tf(t.getSeconds());
                        break;
                }
            });
        }
    };

    if (typeof exports === 'object') module.exports = utils;
    else if (typeof define === 'function' && define.amd) define([], function () {
        return utils;
    });
    else win.utils = utils;
})(window, document);




