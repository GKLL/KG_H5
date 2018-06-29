import myAxios from '~/assets/js/myAxios'
var querystring = require('querystring'); 

export default {
  getCoinInfo(jsonData, token, option){
    let post_data = querystring.stringify(jsonData)
    return myAxios.axios({
          method: "post",
          url: "/kgApp/personal/myCoinBill",
          data: post_data,
          headers: {
            token: token,
            'Content-Type':'application/x-www-form-urlencoded',
            // 'os_version': 5,
          },
          baseURL: option.ip,
          timeout: 10 * 1000,
          responseType: "json"
    })
  },
  getPersonalInfo(jsonData, token, option){
    let post_data = querystring.stringify(jsonData)
    return myAxios.axios({
          method: "post",
          url: "/kgApp/personal/myCoinInfo",
          data: post_data,
          headers: {
            token: token,
            'Content-Type':'application/x-www-form-urlencoded',
            // 'os_version': 5,
          },
          baseURL: option.ip,
          timeout: 10 * 1000,
          responseType: "json"
    })
  }
}