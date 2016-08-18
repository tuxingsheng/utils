# util - 常用工具函数集合
```

isInteger(value)                验证是否为整数
isArray(obj)                    验证是否是数组
isString(obj)                   验证是否是字符串
hasOwn(obj, key)                验证该属性是否属于某个对象
isObject(obj)                   验证是否是对象
isEmpty(obj)                    是否为空，支持检测数组、对象和字符串
extend(to, from)                对象拷贝
each(obj, fn)                   each循环
trim(str)                       去掉左右空格
resolveRootSearch(str)          解析客户端location search参数
queryRootSearch(str)            解析客户端location search参数,转换成key-value的对象，如：queryRootSearch(http://www.baidu.com?aaa=666&bbb=999) ---> {aaa : 666,bbb : 999}
device()                        获取浏览器信息
formatDate(value, format)       时间戳转换为字符串时间格式
uuid()                          随机的十六进制数生成一个伪GUID
getRandomNum(min, max)          获取随机数
sha1(s)                         sha1加密
base64(aInput)                  base64加密
unbase64(str)                   base64解密
md5(string)                     md5加密


