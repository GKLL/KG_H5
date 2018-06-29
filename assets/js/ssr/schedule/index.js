/** 
* @description： 疯狂抢矿机进度列表请求
* @author： cb
* @data: 2018.5.19
*/
import myAxios from '~/assets/js/myAxios'
var querystring = require('querystring'); 
export default {
	//获取进度列表
	getSchduleList(jsonData, token, option){
		let post_data = querystring.stringify(jsonData)
		return myAxios.axios({
		      method: "post",
		      url: "kgApp/miner/minerProgressList",
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