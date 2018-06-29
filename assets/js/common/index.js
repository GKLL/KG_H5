import md5 from 'js-md5'
import Url from 'url';
import conf from './config'
let Base64 = require('js-base64').Base64

var C = {
  host: conf.host,
  imgUrl:"https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/",
  //获取location的query值
  getUrlQuery: function (name, url) {
    let value = '';
    let query = Url.parse(url).query
    if (query) {
      let params = query.split("&");
      params.forEach((param) => {
        if (param.startsWith(name)) {
          let _p = param.split("=")
          if (_p.length >= 2) {
            value = _p[1];
          }
        }
      })
    }
    return value;
  },
  //post请求数据加密
  postDataRequest(data, token) {
    let jsonData;
    if (data == "") {
      jsonData = {
        data: "",
        sign: md5("" + token)
      }
    } else {
      jsonData = {
        data: Base64.encode(JSON.stringify(data)),
        sign: md5(Base64.encode(JSON.stringify(data)) + token)
      }
    }
    return jsonData
  },
  //处理我的财富列表数据  数据分组
  getDest(data) {
    var mydate = new Date();
    var map = {},
      dest = [];
    for (var i = 0; i < data.length; i++) {
      var ai = data[i];
      if (!map[ai.flowDate.slice(0, 10)]) {
        dest.push({
          id: ai.accountFlowId,
          flowDate: ai.flowDate,
          data: [ai]
        });
        map[ai.flowDate.slice(0, 10)] = ai;
      } else {
        for (var j = 0; j < dest.length; j++) {
          var dj = dest[j];
          if (dj.flowDate.slice(0, 10) == ai.flowDate.slice(0, 10)) {
            dj.data.push(ai);
            break;
          }
        }
      }
    }
    for (var i in dest) {
      dest[i].mouth = dest[i].flowDate.slice(5, 7);
      dest[i].day = dest[i].flowDate.slice(8, 10);
      if (parseInt(mydate.getMonth() + 1) == dest[i].mouth && parseInt(mydate.getDate()) == dest[i].day) {
        dest[i].isToday = true;
      } else {
        dest[i].isToday = false;
      }
    }
    return dest
  },

  //存储子组件数据到storage中
  setComponentData(name, data) {
    if (!global.cache) {
      global.cache = {
        [name]: data
      }
    } else {
      global.cache[name] = data;
    }
  },
  //调APP onBack方法
  callBack () {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    if(isiOS){
      window.webkit.messageHandlers.onBack.postMessage("");
    }else if(isAndroid){
      messageHandlers.onBack();
    }
  },
  // 调APP onExit方法， 回到首页
  callExit () {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    if(isiOS){
      window.webkit.messageHandlers.onExit.postMessage("");
    }else if(isAndroid){
      messageHandlers.onExit();
    }
  },
  //调App onError方法
  callError(code, msg) {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    if (isiOS) {
      window.webkit.messageHandlers.onError.postMessage({
        code: code,
        msg: msg
      });
    } else if (isAndroid) {
      messageHandlers.onError(code, msg);
    }
  },
  //调App onStart方法
  callStart() {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    if (isiOS) {
      window.webkit.messageHandlers.onStart.postMessage("");
    } else if (isAndroid) {
      messageHandlers.onStart();
    }
  },
  //调App onSuccess方法
  callSuccess() {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    if (isiOS) {
      window.webkit.messageHandlers.onSuccess.postMessage("");
    } else if (isAndroid) {
      messageHandlers.onSuccess();
    }
  },
  //调App onForword方法
  callForword(title, url) {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isiOS) {
      window.webkit.messageHandlers.onForword.postMessage({
        'title': title,
        'url': url
      });
    } else {
      messageHandlers.onForword(title, url);
    }
  },
  //调App onLogin方法,url为当前页面的地址
  callLogin(url, param) {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isiOS) {
      console.log(url, param)
      window.webkit.messageHandlers.onLogin.postMessage({'url': url, 'param': param, 'userSource': 'kj0605'});
    } else {
      messageHandlers.onLogin(url, param, 'kj0605');
    }
  },
  //调App onShareLink方法
  callShareLink(url, img, text, title) {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isiOS) {
      window.webkit.messageHandlers.onShareLink.postMessage({
        'url': url,
        'img': img,
        'text': text,
        'title': title
      });
    } else {
      messageHandlers.onShareLink(url, img, text, title);
    }
  },
  //安卓唤醒拨号
  callPhone(number){
    messageHandlers.onCall(number);
  },
  // 判断是否是iPhoneX
  isIphoneX() {
    return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375);
  },
  //日期格式化
  DateFormat(date, format) {
    //注册数组去重函数
    if(Date.prototype.distinct === undefined) {
      Array.prototype.distinct = this.distinct;
    }
    //注册数组去重函数
    if(Date.prototype.format === undefined) {
      Date.prototype.format = function () {
        let chars  = format.replace(/[\W]/gi, '').split('')//获取需要格式化时间的哪些部分
        chars = chars.distinct()//去重
        let connectors  = format.replace(/[ymdhsi]/gi, '').split('')//衔接字符
        let result = '';
        let o = {
          "Y": this.getFullYear() , //年
          "M": this.getMonth() + 1, //月
          "D": this.getDate(), //日
          "h": this.getHours(), //小
          "m": this.getMinutes(), //分
          "s": this.getSeconds(), //秒
          "q": Math.floor((this.getMonth() + 3) / 3), //季度
          "ms": this.getMilliseconds() //毫秒
        };
        let revese = false
        //拼接结果
        for(let i = 0; i < chars.length; i++) {
          let char = chars[i]
          let num = o[char]
          if(num == 0) num = '00'
          if(revese){
            result +=  connectors[i] + num
          } else {
            result +=  o[char] + connectors[i]
          }
          if( char === 'D') revese = true
        }
        return result;
      }
    }
    return date.format(format)
  },
  //数组去重
  distinct() {
   let arr = this, i, j, len = arr.length;
   for(i = 0; i < len; i++){
    for(j = i + 1; j < len; j++){
     if(arr[i] == arr[j]){
      arr.splice(j,1);
      len--;
      j--;
     }
    }
   }
   return arr;
  }
}


export default C
