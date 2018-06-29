/**
 *  @description: 抢单详情服务端接口
 *  @author: zhangchenle
 *  @date: 2018.5.18
 */
import myAxios from '~/assets/js/myAxios'
var querystring = require('querystring'); 

export default {
  //获取我的抢单信息
  getDetailRob(jsonData, token, option) {
  	let post_data = querystring.stringify(jsonData)
    return myAxios.axios({
      method: "post",
      url: "kgApp/miner/detailRob",
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
  //抢单的助力榜列表
  getAssistList(jsonData, token, option) {
    let post_data = querystring.stringify(jsonData)
    return myAxios.axios({
      method: "post",
      url: "kgApp/miner/assistList",
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