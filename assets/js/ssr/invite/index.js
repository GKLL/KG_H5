import myAxios from '~/assets/js/myAxios'
var querystring = require('querystring'); 

export default {
  getData1(jsonData, token, option) {
  	let post_data = querystring.stringify(jsonData)
    return myAxios.axios({
      method: "post",
      url: "/kgApp/personal/inviteInfo",
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
  },
  getTVs(jsonData, token, option) {
   		let post_data = querystring.stringify(jsonData)
      return myAxios.axios({
      method: "post",
      url: "/kgApp/appConfig/getInviteRule",
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
	},
  getInviteCode(jsonData, token, option){
 		let post_data = querystring.stringify(jsonData)
    return myAxios.axios({
      method: "post",
      url: "/kgApp/personal/inviteInfo",
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
	},
	getData2(jsonData, token, option) {
		let post_data = querystring.stringify(jsonData)
    return myAxios.axios({
      method: "post",
      url: "/kgApp/personal/amountOfTribute",
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
  },
  getStulist(jsonData, token, option) {
  	let post_data = querystring.stringify(jsonData)
    return myAxios.axios({
      method: "post",
      url: "/kgApp/personal/getContributionList",
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
  },
}