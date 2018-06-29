//app关闭loading
if(typeof window != 'undefined'){
  var u = navigator.userAgent;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
   var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  if(isiOS){
    window.webkit.messageHandlers.onSuccess.postMessage("");
  }else if(isAndroid){
    messageHandlers.onSuccess();
  }
}