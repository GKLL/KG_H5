<template>
   <div class="myTeacher">
        <div class="teacherBox" v-if="isMaster">
      	    <div class="title">
      	    	你还没有师傅哦
      	    </div>
      	    <div class="inputBox">
	      	    <van-cell-group>
				  <van-field v-model="inviteCode" placeholder="输入邀请码" />
				</van-cell-group>
			  	<span>输入好友分享的邀请码，绑定成功后您与好友成为师徒关系</span>
      	    </div>
      	    <div class="submit">
      	    	<span @click="showConRules =! showConRules">进贡规则</span>
      	    	<div @click="bindTeacher"> 提交</div>
      	    </div>
        </div>
        <div class="masterBox" v-else>
      	    <div class="userInfo">
      	    	<div class="avadImg">
      	    		<img :src= "teacherData.avatar"/>
					  <i class="icon nameAuthed" v-show="teacherData.realAuthedTag"></i>
					  <i class="icon vip" v-show="teacherData.vipTag"></i>
      	    		<span class="userName">
      	    		<!-- {{teacherData.userName.length<=6? teacherData.userName : teacherData.userName.substring(0, 6)+'...'}} -->
      	    	    </span>
      	    	    <span class="realName">
      	    	    <!-- {{teacherData.identityTag.length<=6 ? teacherData.identityTag: teacherData.identityTag.substring(0, 6)+'...'}} -->
      	    	    </span>
                  <span v-if="teacherData.realAuthedTag" class="realName">已实名</span>
      	    	</div>
      	    	<div class="rule" @click="showConRules =! showConRules">
      	    		进贡规则
      	    	</div>
      	    </div>
      	    <div class="ruleBox">
      	    	<div>
      	    		<p>今日进贡(KG)</p>
      	    		<p>{{teacherData.TodayIncome}}</p>
      	    	</div>
      	    	<div>
      	    		<p>累计进贡(KG)</p>
      	    		<p>{{teacherData.Income}}</p>
      	    	</div>
      	    	<div>
      	    		<p>我收到的打赏(TV)</p>
      	    		<p>{{teacherData.awrad}}</p>
      	    	</div>
      	    </div>
      	    <div class="timeBox">
      	    	<span>我最近进贡时间</span>	
      	    	<span>{{teacherData.recenflowDate ? teacherData.recenflowDate: '--'}}</span>
      	    </div>
        </div>
		<div v-show="showConRules" class="conRulesModel">
			<div class="rulers">
              <div class="rulers_header" >进贡规则</div>
              <div class="rulers_info2">1.徒弟发布文章，通过审核后，师傅将获得奖励进贡50KG</div>
              <div class="rulers_info2">2.徒弟每获得一次平台阅读奖励，师傅将得到2.5KG奖励进贡</div>
              <div class="rulers_info2">3.徒弟每成功分享一篇文章或视频，获得平台分享奖励后，师傅将得到5KG奖励进贡</div>
          </div>
          <div  @click="showConRules = !showConRules" class="close"></div>
		</div>
    </div>
</template>
<script>
import Vue from "vue";
// import conf from "~/assets/js/conf"; // 引入邀请链接
import md5 from "js-md5";
// import $ from "jquery";
let Base64 = require("js-base64").Base64;
import axios from "axios";
import { Dialog, Field } from "vant";

Vue.use(Dialog);
Vue.use(Field);

export default {
  data() {
    return {
      inviteCode: "",
      showConRules: false,
      isMaster: true,
      url: "http://172.16.1.159:8083",
      token: "420209705923780608_a1dcbd8933b7422db70f4519b06a629f",
      ip: "",
      teacherData: {
			  userName: ''
		  }
    };
  },
  methods: {
    getData() {
      var vm = this;
      const list = this.postDataRequest({});
      this.ajaxHelper({
        type: "post",
        url: "/kgApp/personal/getTeacherInfo",
        data: list,
        success: function(data) {
          if (data.code == 10000) {
            if (!data.data.userName) {
              vm.isMaster = true;
            } else {
              vm.isMaster = false;
              vm.teacherData = data.data;
              if (vm.teacherData.avatar) {
                if (vm.teacherData.avatar.indexOf("http") == -1) {
                  vm.teacherData.avatar = conf.imgUrl + vm.teacherData.avatar;
                }
              } else {
                vm.teacherData.avatar =
                  "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/photocopy23x.png";
              }
            }
            vm.callSuccess();
          } else if (data.code == 10004) {
            Dialog.alert({
              message: data.message
            }).then(() => {
				    vm.callSuccess()
            });
          } else vm.callError(data.code, data.message);
        }
      });
    },
    getTeacherData() {
      var vm = this;
      const list = this.postDataRequest({});
      this.ajaxHelper({
        type: "post",
        url: "/kgApp/personal/getTeacherInfo",
        data: list,
        success: function(data) {
          if (data.code == 10000) {
            if (!data.data.userName) {
              vm.isMaster = true;
            } else {
              vm.isMaster = false;
              vm.teacherData = data.data;
              if (vm.teacherData.avatar) {
                if (vm.teacherData.avatar.indexOf("http") == -1) {
                  vm.teacherData.avatar = conf.imgUrl + vm.teacherData.avatar;
                }
              } else {
                vm.teacherData.avatar =
                  "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/photocopy23x.png";
              }
            }
          } else if (data.code == 10004) {
            Dialog.alert({
              message: data.message
            }).then(() => {
              
            });
          }
        }
      });
    },
    bindTeacher() {
      const list = this.postDataRequest({
        inviteCode: this.inviteCode
      });
      var vm = this;
      this.ajaxHelper({
        type: "post",
        url: "/kgApp/personal/bindingTeacher",
        data: list,
        success: function(data) {
          if (data.code == 10000) {
            Dialog.alert({
              message: data.message
            }).then(() => {
              console.log('123','绑定师傅成功')
              vm.getTeacherData();
            });
          } else{
            Dialog.alert({
              message: data.message
            }).then(() => {});
          }
        }
      });
    },
    postDataRequest(data) {
      var list = new FormData();
      if (data == "") {
        list.append("data", "");
        list.append("sign", md5("" + this.token));
      } else {
        list.append("data", Base64.encode(JSON.stringify(data)));
        list.append(
          "sign",
          md5(Base64.encode(JSON.stringify(data)) + this.token)
        );
      }
      return list;
    },
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
    callBack() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isiOS) {
        window.webkit.messageHandlers.onBack.postMessage("");
      } else if (isAndroid) {
        messageHandlers.onBack();
      }
    },
    callError(code, msg) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isiOS) {
        window.webkit.messageHandlers.onError.postMessage({
          code: code,
          msg: msg
        });
      } else if (isAndroid) {
        messageHandlers.onError(code, msg);
      }
    },
    callSuccess() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isiOS) {
        window.webkit.messageHandlers.onSuccess.postMessage("");
      } else if (isAndroid) {
        messageHandlers.onSuccess();
      }
    },
    callStart() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isiOS) {
        window.webkit.messageHandlers.onStart.postMessage("");
      } else if (isAndroid) {
        messageHandlers.onStart();
      }
    },
    getUrlQuery: function(name, Url) {
      var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i"),
        url = Url || location.href;
      if (reg.test(url)) return unescape(RegExp.$2.replace(/\+/g, " "));
      return "";
    }
  },
  mounted() {
    // this.url = this.getUrlQuery("api_url").replace("?", "");
    // this.ip = Base64.decode(this.getUrlQuery("api_url")).replace("?", "");
    // this.token = this.getUrlQuery("token");
    // const list = this.postDataRequest({});
  }
};
</script>


<style  lang="less" scoped>
.myTeacher {
  background: #fff;
  height: 100%;
  .icon {
    width: 12px;
    height: 12px;
    display: inline-block;
    position: absolute;
    background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/TureName3x.png");
    background-size: 100% 100%;
    top: 30px;
    left: 30px;
  }
  .vip {
    background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/certified3x.png");
  }
  .teacherBox {
    width: 92%;
    margin: 0px auto;
    padding-top: 25px;
  }
  .title {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
  }
  .inputBox {
    span {
      display: inline-block;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      color: rgba(153, 153, 153, 1);
      margin-top: 5px;
    }
  }
  .submit {
    width: 100%;
    text-align: center;
    margin-top: 25%;
    margin-bottom: 20px;
    span {
      display: block;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      color: rgba(24, 134, 250, 1);
    }
    div {
      width: 90%;
      margin: 15px auto 0;
      text-align: center;
      height: 49px;
      line-height: 49px;
      background: #ffa82f;
      border-radius: 22px;
      color: rgba(255, 255, 255, 1);
      font-family: PingFangSC-Regular;
      font-size: 16px;
    }
  }
  .masterBox {
    width: 92%;
    margin: 0px auto;
    .userInfo {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-top: 8px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e5e5e5;
      .userName {
        display: inline-block;
        height: 40px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        color: rgba(51, 51, 51, 1);
        line-height: 40px;
        padding-left: 10px;
      }
      .avadImg {
        position: relative;
      }
      .avadImg img {
        display: inline-block;
        vertical-align: middle;
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
      }
      .rule {
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        color: #1886fa;
      }
      .realName {
        display: inline-block;
        /*height:40px;*/
        font-size: 12px;
        font-family: PingFangSC-Regular;
        color: #1886fa;
        line-height: 24px;
        padding: 0 5px;
        margin-left: 10px;
        background: rgba(236, 245, 255, 1);
        border-radius: 3px;
      }
    }
    .ruleBox {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 30px;
      div {
        background: rgba(245, 245, 245, 1);
        font-family: PingFangSC-Regular;
        color: rgba(102, 102, 102, 1);
        font-size: 12px;
        height: 86px;
        border-radius: 5px;
        text-align: left;

        p:first-child {
          border-bottom: 1px solid #fff;
          /*padding-left: 5px;
                		padding-bottom: 10px;*/
          padding: 0px 10px 10px 10px;
        }
        p:last-child {
          font-size: 18px;
          font-family: PingFangSC-Medium;
          color: rgba(51, 51, 51, 1);
          padding: 0px 10px 10px 10px;
          margin: 0 0;
        }
      }
    }
    .timeBox {
      margin-top: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      span:first-child {
        color: #999999;
        display: inline-block;
      }
      span:last-child {
        color: #333333;
        display: inline-block;
        margin-left: 10px;
      }
    }
  }
}
.conRulesModel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  .rulers {
    border-radius: 5px;
    width: 305px;
    height: 225px;
    overflow: scroll;
    background-color: #fff;
	padding: 15px;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -127px;
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
    background-image: url('~/assets/img/face/CloseCircle3x.png');
    background-size: 100% 100%;
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
    margin-top: 160px;
  }
}
@media only screen and (min-width: 767px) {
  .conRulesModel {
    .rulers {
      border-radius: 10px;
      width: 610px;
      height: 760px;
      margin-top: 80px;
      padding: 30px;
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
      margin-top: 30px;
    }
  }
}
@media only screen and (max-width: 320px) {
  .myTeacher .masterBox {
    width: 95%;
    .ruleBox {
      div:last-child {
        p {
          padding: 0 5px;
          padding-bottom: 10px;
        }
      }
    }
  }
  .conRulesModel {
    .rulers {
      width: 290px;
	  padding: 10px;
      margin-top: -122px;
      margin-left: -155px;
    }
    .close {
      width: 25px;
      height: 25px;
      font-size: 25px;
	  line-height: 20px;
	  margin-top: 140px;
    }
  }
}
@media only screen and (min-width: 375px) {
  .myTeacher {
    .submit {
      margin-top: 50%;
    }
  }
}
@media only screen and (min-width: 413px) {
  .myTeacher {
    .submit {
      // margin-top: 65%;
    }
  }
}
</style>
<style>
.inputBox {
  margin-top: 10px;
}
.inputBox .el-input__inner {
  width: 100%;
  height: 50px;
  background: rgba(245, 245, 245, 1);
  border-radius: 5px;
  border: 0;
  font-size: 24px;
  font-family: "PingFangSC-Regular";
  color: rgba(51, 51, 51, 1);
}
input::-webkit-input-placeholder {
  color: #d2d2d2 !important;
  font-size: 24px !important;
  font-family: "PingFang-SC-Regular" !important;
}
</style>
