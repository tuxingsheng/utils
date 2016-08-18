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
        }
    };

    if (typeof exports === 'object') module.exports = utils;
    else if (typeof define === 'function' && define.amd) define([], function () {
        return utils;
    });
    else win.utils = utils;
})(window, document);




