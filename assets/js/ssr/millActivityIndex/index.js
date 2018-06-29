import myAxios from '~/assets/js/myAxios'
var querystring = require('querystring');

export default {
  getUserInfo(jsonData, token, option) { // 判断用户是否登陆
    let post_data = querystring.stringify(jsonData)
    return myAxios.axios({
      method: "post",
      url: "kgApp/personal/getUserInfo",
      data: post_data,
      headers: {
        token: token,
        'Content-Type': 'application/x-www-form-urlencoded',
        'os_version': 5
      },
      baseURL: option.ip,
      timeout: 10000,
      responseType: "json"
    })
  },
  getMillList(option) {
    return myAxios.axios({
      method: "post",
      url: "kgApp/miner/minerList",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'os_version': 5
      },
      baseURL: option.ip,
      timeout: 10000,
      responseType: "json"
    })
  },
  getActiveTime (option) {
    return myAxios.axios({
      method: "post",
      url: "/kgApp/miner/minerTime",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'os_version': 5
      },
      baseURL: option.ip,
      timeout: 10000,
      responseType: "json"
    })
  },
  //矿机活动开始和结束时间
  getMinerTime(jsonData, token, option) {
    let post_data = querystring.stringify(jsonData)
    return myAxios.axios({
      method: "post",
      url: "kgApp/miner/minerTime",
      data: post_data,
      headers: {
        token: token,
        'Content-Type':'application/x-www-form-urlencoded', 
        'os_version':5
      },
      baseURL: option.baseURL,
      timeout: 10000,
      responseType: "json"
    })
  },
}
