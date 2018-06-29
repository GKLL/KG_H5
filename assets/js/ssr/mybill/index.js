/** 
* @description： 疯狂抢矿机我的抢单请求
* @author： cb
* @data: 2018.5.18
*/
import myAxios from '~/assets/js/myAxios'
var querystring = require('querystring'); 
export default {
	//获取我的抢单列表
	getBillList(jsonData, token, option){
		let post_data = querystring.stringify(jsonData)
		return myAxios.axios({
		      method: "post",
		      url: "kgApp/miner/myRobList",
		      data: post_data,
		      headers: {
		        token: token,
		        'Content-Type':'application/x-www-form-urlencoded',  
		        'os_version':5  
		      },
		      baseURL: option.ip,
		      timeout: 10 * 1000,
		      responseType: "json"
		})
	}
}