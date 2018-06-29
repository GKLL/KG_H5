/**
 *  @description: 第三方公共接口
 *  @author: zhangchenle
 *  @date: 2018.5.29
 */
import myAxios from '~/assets/js/myAxios'
import sha1 from 'sha1'
var querystring = require('querystring');

let util = {
  //第三方平台注册
  getMyProfile(jsonData, token, baseUrl) {
    let post_data = querystring.stringify(jsonData)
    return myAxios.axios({
      method: "post",
      url: "kgApp/personal/myProfile",
      data: post_data,
      headers: {
        token: token,
        'Content-Type':'application/x-www-form-urlencoded',
        'os_version':5
      },
      baseURL: baseUrl,
      timeout: 10000,
      responseType: "json"
    })
  },
  //第三方平台注册
  registerByOtherPlatform(phone) {
    let env = 'test';
    let config = {
      baseURL: {
        test: 'http://deepfin.co',
        prod: 'https://deepfin.one'
      },
      invitationCode: {
        test: 'HhX9Ac',
        prod: '1zxWvF'
      },
      apiSecret: {
        test: '402888d863a5cd360163a5cd369e0000',
        prod: '402888d863a5cd360163a5cd369e0000'
      }
    }
    let invitationCode = config.invitationCode[env]
    let apiSecret = config.apiSecret[env]
    let joinStr = 'invitationCode' +  invitationCode  + 'phone' + phone + apiSecret
    let sign = sha1(joinStr).toUpperCase();
    let baseURL = config.baseURL[env]

    return myAxios.axios({
      method: "post",
      url: "/dfc/dfc/loginMgr/registerByOtherPlatform",
      data: querystring.stringify({
        phone,
        invitationCode,
        sign
      }),
      headers: {
        'Content-Type':'application/x-www-form-urlencoded',
      },
      baseURL: baseURL,
      timeout: 10000,
      responseType: "json"
    })
  }
};

export default {
  async register(jsonData, newUser, token, baseUrl){
    if(newUser == 1){
      //获取手机号
      let myProfile = util.getMyProfile(jsonData, token, baseUrl)
      let [data] = await Promise.all([myProfile])
      .then(results => {
        return results;
      })
      .catch(e => {
        console.log("errr", e);
      })
      if (data.code == 10000) {
        let userMobile = data.data.userMobile;
        if(userMobile){
          let register = util.registerByOtherPlatform(userMobile);//第三方平台注册
          let [regData] = await Promise.all([register])
          .then(results => {
            return results;
          })
          .catch(e => {
            console.log("errr", e);
          })
          console.log('userMobile', userMobile)
          console.log('regData', regData)
        }
      }
    }
  },

}
