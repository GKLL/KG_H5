<template>
  <div class="invite_bar" :class="{isIphoneX:isIphoneXModel}">
      <div class="main">
          <div class="num"></div>
          <div class="num_info">{{inviteData.inviteCount}}</div>
          <span>数据统计有延迟，请谅解</span>
          <div class="flex_box">
            <div class="block" v-for="(item, index) in rewardTv" :key="index">
                <span>{{item._count}}人</span>
                <i></i>
                <span>{{item._bonus}}TV</span>
            </div>
          </div>
          <div class="text">
              可提取奖励：<span>{{withdrowTv}}TV</span> 
              <span class="btn" :class="{grayBtn: !withdrowTv}" v-show="inviteData.inviteStatus == 1 && !withdrowTv">立即提取</span>
              <!-- <span class="btn"  @click="withdrowModel=!withdrowModel" v-show="inviteData.inviteStatus == 1 && withdrowTv">立即提取</span> -->
              <span class="btn"  @click="withdrowModel=!withdrowModel" v-show="true">立即提取</span>
              <span class="btn" v-show="inviteData.inviteStatus == 0 || inviteData.inviteStatus == 2" style="background:#d2d2d2">已冻结</span>
          </div>
      </div>
      <div class="invitecode"> 
        <span class="logo"><i></i></span>
        <div class="left">
            <span>我的邀请码</span>
            <span id="code_txt">{{inviteData.inviteCode}}</span>
            <span data-clipboard-action="copy" id="button" @click="copy_inviteCode" data-clipboard-target="#code_txt" title="复制">复制</span>
        </div>
        <div class="icon"></div>
        <div class="icon"></div>
      </div>
      <div class="how_invite">
          <div class="how"></div>
          <span class="line"><i>1</i><i>2</i><i>3</i></span>
          <div class="flex_box">
              <div></div>
              <div></div>
              <div></div>
          </div>
          <div class="text_box">
              <div><span>点击按钮</span>"立即邀新赚钱"</div>
              <div>好友打开链接</div>
              <div>好友注册登录 完成新手任务</div>
          </div>
      </div>
      <div class="rule" @click="showRuleModel">了解活动详细规则 >></div>
      <div class="now" :class="{isIphoneXBox: isIphoneXModel}"  @click="inviteNewUser">
        <span>立即邀新赚钱</span>
        </div>
      <!-- <div class="now"  @click="inviteBtn = !inviteBtn">立即邀新赚钱</div> -->
      <div v-show="showRule" class="rulersModel">
          <div class="rulers">
              <div class="rulers_header">活动规则</div>
              <div class="rulers_info">
                  <div>1.奖励兑换</div>
                  <div v-for="(item, index) in rewardTv" :key="index">
                    有效邀请数>={{item._count}}即可领取{{item._bonus}}TV
                  </div>

              </div>
              <div class="rulers_info2">2.领取奖励后，将扣除相应的邀请数值，如：成功邀请12人，选择领取奖励将获得10人对应的2TV奖励并扣除10人成功邀请数，剩余2人。</div>
              <div class="rulers_info2">3.发起提取后即时到账，获得的奖励5日内无法提现</div>
              <div class="rulers_info2">4.什么是有效邀请：好友通过您的邀请链接或者邀请码注册并登录，算为一次有效邀请。</div>
              <div class="rulers_info2">5.成功邀请的新用户将自动成为您的徒弟。</div>
              <div class="rulers_info2">6.邀请好友仅对于邀请新用户，老用户无效。</div>
              <div class="rulers_info2">7.邀请真实用户才会增加有效次数。</div>
              <div class="rulers_info2">8.若通过但不限于技术手段等方式，恶意邀请徒弟，赚取平台奖励者，一经平台发现，将冻结所有奖励。冻结后五日内未处理，相应奖励将退回处理。</div>
              <div class="rulers_info2">9.活动最终解释权归千氪财经所有。</div>
          </div>
          <div  @click="closeShowRule" class="close"></div>
      </div>
      <div v-show="withdrowModel" class="withdrowModel">
        <div class="van-dialog">
          <div class="van-dialog__header">提示</div>
          <div class="van-dialog__message van-dialog__message--withtitle">确认提取?</div>
          <div class="action"><span @click="withdrowModel=!withdrowModel">取消</span><span @click="withdraw">确认</span></div>
        </div>
      </div>
  </div>
</template>
<script>
import Vue from "vue";
import md5 from "js-md5";
// import $ from "jquery";
import csr from '~/assets/js/csr/invite'
import C from '~/assets/js/common'
import { Dialog } from "vant";
import Clipboard from 'clipboard';
Vue.use(Dialog);

export default {
	props: {
		param: {}
	},
  data() {
    return Object.assign({
			withdrowModel: false,
		  showRule: false,
		  // inviteBtn: false,
		  isIphoneXModel: false
		}, this.param);
  },
  mounted() {
    this.isIphoneX()
  },
  methods: {
    isIphoneX(){
      this.isIphoneXModel = /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375);
    },
    showRuleModel () {
      this.showRule =!this.showRule;
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
        $(".rulersModel").on("tap",function(){
            $(".teacher_stu,.invite_bar").on("touchmove",function(event){
              event.preventDefault();
            });
        });
    },
    closeShowRule() {
      this.showRule =!this.showRule;
      document.body.style.overflow = 'visible';
      document.body.style.height = 'auto';
      $("document").unbind("touchmove");
    },
    //提现
    withdraw() {
    	let jsonData = C.postDataRequest({}, this.token)
      Promise.resolve(csr.withdraw(jsonData, this.token, {ip: this.ip, url: this.url}))
      .then(data => {
      	this.withdrowModel = !this.withdrowModel;
        Dialog.alert({
          title: '提示',
          message: data.message
        }).then(() => {
        	// return Promise.resolve(csr.getData2())
        })
	    }).catch((data)=>{
	      console.log(data)
	      Dialog.alert({
	        title: '提示',
	        message: data.message
	      }).then(() => {});
	    });
    },
    inviteNewUser() {
      this.callForword(this.inviteData.inviteCode);
    },
    callForword(code) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isiOS) {
        window.webkit.messageHandlers.onShare.postMessage({ code: code });
      } else {
        messageHandlers.onShare(code);
      }
    },
    copy_inviteCode() {
      // console.log('params', this.param)
      var vm = this;
      var clipboard = new Clipboard("#button");

      clipboard.on("success", function(e) {
            Dialog.alert({
              title: '提示',
              message: '复制成功'
            }).then(() => {});
      });
      clipboard.on("error", function(e) {
        Dialog.alert({
              title: '提示',
              message: '复制失败，请手动复制'
        }).then(() => {});
      });
    },
    postDataRequest(data) {
			let jsonData;
      if (data == "") {
      	jsonData = {
      		data: "",
      		sign: md5("" + this.token)
      	}
      } else {
      	jsonData = {
      		data: Base64.encode(JSON.stringify(data)),
      		sign: md5(Base64.encode(JSON.stringify(data)) + this.token)
      	}
      }
      return jsonData
    },
    // postDataRequest(data) {
    //   var list = new FormData();
    //   if (data == "") {
    //     list.append("data", "");
    //     list.append("sign", md5("" + this.token));
    //   } else {
    //     list.append("data", Base64.encode(JSON.stringify(data)));
    //     list.append(
    //       "sign",
    //       md5(Base64.encode(JSON.stringify(data)) + this.token)
    //     );
    //   }
    //   return list;
    // },
    ajaxHelper(opt) {
      const that = this;
      var opts = opt || {};
      if (!opts.url) {
        alert("请填写接口地址");
        return false;
      }
      axios({
        method: opts.type || "post",
        url: opts.url,
        data: opts.data || {},
        headers: opts.headers || {
          token: that.token
        },
        baseURL: that.ip,
        timeout: opts.time || 10 * 1000,
        responseType: opts.dataType || "json"
      })
        .then(function(res) {
          if (res.status == 200) {
            if (opts.success) {
              opts.success(res.data, res);
            }
          } else {
            if (data.error) {
              opts.error(error);
            } else {
            }
          }
        })
        .catch(function(error) {
          if (opts.error) {
            opts.error(error);
          } else {
          }
        });
    },
    getData2 (list) {
      var vm = this;
      this.ajaxHelper({
        type: "post",
        url: "/kgApp/personal/inviteInfo",
        data: list,
        success: function(data) {
          if (data.code == 10000) {
            vm.inviteData = data.data;
            vm.withdrowTv = 0;
            vm.rewardTv.forEach((element, index) => {
              if (vm.rewardTv[index]._count <= vm.inviteData.inviteCount) {
                vm.withdrowTv = vm.rewardTv[index]._bonus;
              }
            });
          } 
        }
      });
    },
    getUrlQuery: function(name, Url) {
      var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i"),
        url = Url || location.href;
      if (reg.test(url)) return unescape(RegExp.$2.replace(/\+/g, " "));
      return "";
    }
  }
};
</script>

<style lang="less" >
.grayBtn{
  background: #999 !important;
}
.van-dialog{
  width: 70%;
}
.van-dialog__message{
  padding: 21px;
}
.van-button--large{
  height: 44px;
  line-height: 44px;
}
.withdrowModel{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  .van-dialog{
    width: 83%;
  }
  z-index: 10;
  .action{
    span{
      width: 50%;
      display: inline-block;
      height: 44px;
      text-align: center;
      line-height: 44px;
       color: #007AFF;
     }
   }
 }
.van-dialog__message--withtitle {
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
  text-align: center;
}
.van-button__text {
  color: rgba(0, 122, 255, 1) !important;
  font-size: 16px !important;
}
.invite_bar {
  i {
    background-size: 100% 100%;
  }
  padding-bottom: 50px;
  .main {
    width: 345px;
    height: 291px;
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    margin: 0 auto;
    margin-top: 15px;
    padding-top: 15px;
    text-align: center;
    .num {
      width: 215px;
      height: 32px;
      margin: 0 auto;
      background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/title13x.png");
      background-size: 100% 100%;
    }
    .num_info {
      color: #f44345;
      font-size: 50px;
    }
    span {
      color: rgba(153, 153, 153, 1);
      font-family: "PingFangSC-Regular";
      font-size: 12px;
    }
    .flex_box {
      display: inline-flex;
      width: 100%;
      justify-content: space-around;
      margin-top: 16px;
      .block {
        width: 60px;
        height: 85px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 4px 0px rgba(244, 67, 69, 0.3);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        i {
          width: 32px;
          height: 32px;
          margin: 0 auto;
          background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/coin13x.png");
          background-size: 100% 100%;
        }
        span:last-child {
          color: #333333;
        }
      }
      .block:nth-child(2) {
        i {
          background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/coin23x.png");
        }
      }
      .block:nth-child(3) {
        i {
          background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/coin33x.png");
        }
      }
      .block:nth-child(4) {
        i {
          background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/coin43x.png");
        }
      }
    }
    .text {
      padding: 16px 15px 15px 15px;
      margin-top: 15px;
      border-top: 1px solid rgba(229, 229, 229, 1);
      text-align: left;
      position: relative;
      span {
        color: #f44345;
        font-size: 14px;
      }
      .btn {
        color: #fff;
        background: #f44345;
        display: inline-block;
        width: 85px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        background: rgba(244, 67, 69, 1);
        border-radius: 16px;
        position: absolute;
        right: 15px;
      }
    }
  }
  .invitecode {
    position: relative;
    margin: 0 auto;
    width: 345px;
    margin-top: 16px;
    background: #fff;
    border-radius: 5px;
    .logo {
      border-right: 1px dashed #999;
      display: inline-block;
      padding: 12px 16px 13px 11px;
    }
    i {
      width: 67px;
      display: inline-block;
      height: 55px;
      background-image: url("~/assets/img/face/pinklogo.png");
    }
    .icon {
      position: absolute;
      top: 0px;
      left: 85px;
      display: inline-block;
      background-color: #f44345;
      width: 20px; /*宽度为高度的2倍*/
      height: 10px;
      border-radius: 0 0 10px 10px; /*圆角半径为高度的值*/
    }
    .icon:last-child {
      border-radius: 10px 10px 0 0px; /*圆角半径为高度的值*/
      top: 75px;
    }
    .left {
      display: inline-block;
      span {
        position: absolute;
        font-family: "PingFangSC-Regular";
        &:nth-child(1) {
          font-size: 14px;
          top: 11px;
          left: 120px;
          color: #333;
        }
        &:nth-child(2) {
          font-size: 24px;
          font-family: "PingFangSC-Semibold";
          top: 35px;
          left: 120px;
          color: #666;
        }
        &:nth-child(3) {
          width: 65px;
          height: 25px;
          background: #f44345;
          color: #fff;
          border-radius: 15px;
          line-height: 25px;
          font-size: 14px;
          text-align: center;
          display: inline-block;
          right: 15px;
          top: 28px;
        }
      }
    }
  }
  .how_invite {
    margin: 0 auto;
    margin-top: 17px;
    width: 345px;
    padding: 15px 21px 15px 21px;
    padding-top: 15px;
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    .how {
      width: 215px;
      height: 32px;
      margin: 0 auto;
      background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/title23x.png");
      background-size: 100% 100%;
    }
    .line {
      height: 1px;
      background: #f44345;
      width: 100%;
      display: inline-block;
      margin-top: 30px;
      position: relative;
      i {
        position: absolute;
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        color: #f44345;
        font-style: normal;
        left: 30px;
        top: -10px;
        border: 1px solid #f44345;
        text-align: center;
        background: #fff;
        z-index: 1;
      }
      i:nth-child(2) {
        left: 140px;
      }
      i:nth-child(3) {
        left: 245px;
      }
    }
    .flex_box {
      width: 100%;
      div {
        width: 60px;
        display: inline-block;
        height: 60px;
        border-radius: 50%;
        background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/How13x.png");
        background-size: 100% 100%;
        margin-left: 10px;
        margin-top: 17px;
      }
      div:nth-child(2) {
        margin-left: 45px;
        background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/How23x.png");
      }
      div:nth-child(3) {
        margin-left: 40px;
        background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/How33x.png");
      }
    }
    .text_box {
      font-size: 12px;
      font-family: "PingFangSC-Regular";
      color: rgba(102, 102, 102, 1);
      div {
        display: inline-block;
      }
      div:first-child {
        width: 85px;
        height: 33px;
        span {
          display: inline-block;
          width: 100%;
          text-align: center;
        }
      }
      div:nth-child(2) {
        margin-left: 20px;
        position: relative;
        top: -15px;
      }
      div:last-child {
        width: 72px;
        margin-left: 35px;
        height: 33px;
      }
    }
  }
  .rule {
    width: 100%;
    text-align: center;
    font-size: 12px;
    font-family: "PingFangSC-Regular";
    color: rgba(248, 248, 248, 1);
    padding: 21px 0 25px 0;
    margin-bottom: 15px;
  }
  .now {
    width: 80%;
    font-size: 16px;
    font-family: "PingFangSC-Regular";
    color: rgba(255, 255, 255, 1);
    padding: 12px 0 14px 0;
    text-align: center;
    background: rgba(255, 168, 47, 1);
    box-shadow: 0px -6px 10px 0px rgba(103, 26, 26, 0.1);
    z-index: 9;
    margin: 0 auto;
    position: fixed;
    bottom: 25px;
    border-radius: 40px;
    left: 50%;
    margin-left: -40%;
  }
  .isIphoneXBox{
    bottom: 65px;
  }
}
.isIphoneX{
  padding-bottom: 90px;
}
.rulersModel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  .rulers {
    border-radius: 5px;
    width: 305px;
    // margin: 0 auto;
    height: 380px;
    // margin-top: 133px;
    overflow: scroll;
    background-color: #fff;
    padding: 15px;
    top: 50%;
    left: 50%;
    position: absolute;
    margin-top: -205px;
    margin-left: -167px;
    .rulers_header {
      width: 100%;
      font-size: 18px;
      color: rgba(34, 34, 34, 1);
      text-align: center;
    }
    .rulers_info {
      font-size: 14px;
      font-family: "PingFangSC-Regular";
      color: rgba(102, 102, 102, 1);
      margin-bottom: 15px;
      line-height: 22px;
    }
    .rulers_info2 {
      margin-bottom: 15px;
      line-height: 22px;
      font-size: 14px;
    }
  }
  .close {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: #fff;
    font-size: 30px;
    border: 1px solid #fff;
    text-align: center;
    line-height: 25px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -16px;
    margin-top: 221px;
    background-image: url('~/assets/img/face/CloseCircle3x.png');
    background-size: 100% 100%;
  }
}
@media only screen and (max-width: 320px) {
  .invite_bar {
    .main {
      width: 310px;
    }
    .invitecode {
      width: 310px;
    }
    .how_invite {
      width: 290px;
      padding: 15px 10px 15px 10px;
      .line {
        i {
          left: 25px;
        }
        i:nth-child(2) {
          left: 130px;
        }
        i:nth-child(3) {
          left: 240px;
        }
      }
      .flex_box {
        width: 100%;
        div {
          margin-left: 5px;
        }
        div:nth-child(2) {
          margin-left: 40px;
        }
        div:nth-child(3) {
          margin-left: 45px;
        }
      }
      .text_box {
        div:first-child {
          margin-left: -10px;
        }
        div:nth-child(2) {
          margin-left: 20px;
        }
        div:last-child {
          margin-left: 38px;
        }
      }
    }
      .rule {
    width: 100%;
    text-align: center;
    font-size: 12px;
    font-family: "PingFangSC-Regular";
    color: rgba(248, 248, 248, 1);
    padding: 21px 0 25px 0;
    margin-bottom: 15px;
  }
  .now {
    padding: 12px 0 12px 0;
    position: fixed;
    bottom: 25px;
    border-radius: 40px;
    .isIphoneXBox{
      height: 39px;
      width: 100%;
    }
  }
  }
  .rulersModel {
    .rulers {
      width: 290px;
      padding: 10px;
      margin-top: -200px;
      margin-left: -155px;
    }
    .close {
      width: 25px;
      height: 25px;
      font-size: 25px;
      line-height: 20px;
    }
  }
}
@media only screen and (min-width: 767px) {
  .invite_bar {
    .main {
      width: 690px;
      height: 582px;
      border-radius: 10px;
      margin-top: 30px;
      padding-top: 30px;
      .num {
        width: 430px;
        height: 64px;
      }
      .num_info {
        font-size: 100px;
      }
      span {
        font-size: 24px;
      }
      .flex_box {
        margin-top: 32px;
        .block {
          width: 120px;
          height: 170px;
          box-shadow: 0px 4px 8px 0px rgba(244, 67, 69, 0.3);
          border-radius: 10px;
          i {
            width: 64px;
            height: 64px;
          }
        }
      }
      .text {
        padding: 32px 30px 30px 30px;
        margin-top: 30px;
        font-size: 24px;
        span {
          font-size: 28px;
        }
        .btn {
          width: 170px;
          height: 56px;
          line-height: 56px;
          border-radius: 32px;
          right: 30px;
        }
      }
    }
    .invitecode {
      width: 690px;
      margin-top: 32px;
      border-radius: 10px;
      .logo {
        padding: 24px 32px 26px 22px;
      }
      i {
        width: 134px;
        height: 110px;
      }
      .icon {
        left: 179px;
        width: 40px; /*宽度为高度的2倍*/
        height: 20px;
        border-radius: 0 0 20px 20px; /*圆角半径为高度的值*/
      }
      .icon:last-child {
        border-radius: 20px 20px 0 0px; /*圆角半径为高度的值*/
        top: 150px;
      }
      .left {
        span {
          &:nth-child(1) {
            font-size: 28px;
            top: 22px;
            left: 240px;
          }
          &:nth-child(2) {
            font-size: 48px;
            top: 70px;
            left: 240px;
          }
          &:nth-child(3) {
            width: 130px;
            height: 50px;
            border-radius: 30px;
            line-height: 50px;
            font-size: 28px;
            right: 30px;
            top: 56px;
          }
        }
      }
    }
    .how_invite {
      margin-top: 34px;
      width: 606px;
      padding: 30px 42px 30px 42px;
      height: 376px;
      padding-top: 30px;
      border-radius: 10px;
      .how {
        width: 430px;
        height: 64px;
      }
      .line {
        height: 1px;
        margin-top: 60px;
        i {
          width: 40px;
          height: 40px;
          left: 60px;
          top: -20px;
          z-index: 1;
          font-size: 24px;
        }
        i:nth-child(2) {
          left: 280px;
        }
        i:nth-child(3) {
          left: 490px;
        }
      }
      .flex_box {
        div {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          margin-left: 20px;
          margin-top: 34px;
        }
        div:nth-child(2) {
          margin-left: 90px;
        }
        div:nth-child(3) {
          margin-left: 80px;
        }
      }
      .text_box {
        font-size: 24px;
        div:first-child {
          width: 170px;
          height: 33px;
        }
        div:nth-child(2) {
          margin-left: 40px;
          top: -30px;
        }
        div:last-child {
          width: 144px;
          margin-left: 70px;
          height: 66px;
        }
      }
    }
    .rule {
      font-size: 24px;
      padding: 42px 0 50px 0;
    }
    .now {
      font-size: 32px;
      padding: 24px 0 28px 0;
      box-shadow: 0px -12px 20px 0px rgba(103, 26, 26, 0.1);
    }
  }
  .rulersModel {
    .rulers {
      border-radius: 10px;
      width: 610px;
      height: 760px;
      margin-left: -320px;
      margin-top: -420px;
      .rulers_header {
        font-size: 36px;
      }
      .rulers_info {
        font-size: 28px;
        margin-bottom: 30px;
        line-height: 44px;
      }
      .rulers_info2 {
        margin-bottom: 30px;
        line-height: 44px;
        font-size: 28px;
      }
    }
    .close {
      width: 60px;
      height: 60px;
      font-size: 60px;
      line-height: 50px;
      margin-top: 385px;
      margin-left: -31px;
    }
  }
}
@media only screen and (min-width: 413px) {
  .invite_bar {



  .now {
    padding: 12px 0 12px 0;
    position: fixed;
    bottom: 25px;
    border-radius: 40px;
    width: 70%;
    margin-left: -35%;
    .isIphoneXBox{
      height: 39px;
      width: 100%;
    }
  }
  }
}
</style>
