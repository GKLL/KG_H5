import myAxios from '~/assets/js/myAxios'
var querystring = require('querystring');

export default {
  beforeRush ( jsonData, token, option ) {
    let post_data = querystring.stringify(jsonData)
    return myAxios.axios({
      method: "post",
      url: "kgApp/miner/validRushMiner",
      data: post_data,
      crossDomain: true,
      headers: {
        token: token,
        os_version: 5,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      baseURL: option.ip,
      timeout: 10000,
      responseType: "json"
    })
  },
  BuyMinner(jsonData, token, option) {
    let post_data = querystring.stringify(jsonData)
    return myAxios.axios({
      method: "post",
      url: "kgApp/miner/rushToMiner",
      data: post_data,
      crossDomain: true,
      headers: {
        token: token,
        os_version: 5,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      baseURL: option.ip,
      timeout: 10000,
      responseType: "json"
    })
  },
  inputHelpCode(jsonData, token, option) {
    let post_data = querystring.stringify(jsonData)
    return myAxios.axios({
      method: "post",
      url: "kgApp/miner/friendHelp",
      data: post_data,
      crossDomain: true,
      headers: {
        token: token,
        os_version: 5,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      baseURL: option.ip,
      timeout: 10000,
      responseType: "json"
    })
  },
  getUserInfo(jsonData, token, option) { // 判断用户是否登陆
    let post_data = querystring.stringify(jsonData)
    return myAxios.axios({
      method: "post",
      url: "kgApp/personal/inviteInfo",
      data: post_data,
      headers: {
        token: token,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length,
        'os_version': 5
      },
      baseURL: option.ip,
      timeout: 10000,
      responseType: "json"
    })
  },
}
