import myAxios from '~/assets/js/myAxios'
var querystring = require('querystring'); 

export default {
  withdraw(jsonData, token, option) {
  	let post_data = querystring.stringify(jsonData)
    return myAxios.axios({
      method: "post",
      url: "/kgApp/personal/applyWithdraw",
      data: post_data,
      headers: {
        token: token,
        'Content-Type':'application/x-www-form-urlencoded',  
        'Content-Length': post_data.length  
      },
      baseURL: option.ip,
      timeout: 10000,
      responseType: "json"
    })
   }
}