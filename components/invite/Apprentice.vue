<template>
  <div class="mystu">
      <div class="main">
          <div>徒弟总进贡</div>
          <div>{{tvnum}}</div>
      </div>
      <div class="stulist" :class="{isIphoneX:isIphoneXModel}">
          <span class="rank_bar" v-if="!isEmpty">徒弟进贡排行榜</span>
          <div class="empty" v-show="isEmpty"><p>{{stuInfo}}</p></div>
          <div id="mescroll" @touchmove="listMove" class="mescroll" v-show="notEmpty"> 
            <div id="dataList">
                <div class="stu_info" v-for="(stu, index) in list" :key="index">
                    <span v-show="index <=2" class="rank" :class="'rank'+index"></span>
                    <span v-show="index >2" class="rank">{{index+1}}</span>
                    <img :src="stu.avatar" alt="">
                    <span class="name">{{stu.userName}}</span>
                    <span class="numTV" :class="{rank3: index <= 2}">{{stu.income? stu.income: '0'}}<span class="unit">KG</span></span>
                </div>
                <!-- <p v-if="noMore" style="text-align:center;font-size:14px;">已无更多徒弟信息~</p> -->
            </div>
          </div>
      </div>
      <div @click="inviteNewUser" class="inviteStu"  :class="{isIphoneXBox: isIphoneXModel}" >
        <span>立即收徒</span>
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
// console.log("typeof MeScroll :", typeof MeScroll === "function");
import { Dialog } from "vant";
import { rejects } from "assert";
Vue.use(Dialog);
export default {
  data() {
    return {
      // noMore: false,
      stuInfo: '徒弟信息加载中，请稍后~',
      isEmpty: true,
      notEmpty: false,
      token: "420209705923780608_d372a72e9f7c42189fbaad9565537d25",
      url: "http://172.16.1.159:8083",
      ip: "",
      tvnum: "0",
      stuList: {
        columnType: 1,
        currentPage: 1
      },
      list: [],
      stuData: {},
      inviteData: {
        inviteCount: "0",
        inviteCode: "----"
      },
      isIphoneXModel: false
    };
  },
  methods: {
    isIphoneX(){
      this.isIphoneXModel = /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375);
    },
    getInviteCode() {
      var vm = this;
      const list = this.postDataRequest({});
      this.ajaxHelper({
        type: "post",
        url: "/kgApp/personal/inviteInfo",
        data: list,
        success: function(data) {
          if (data.code == 10000) {
            vm.inviteData = data.data;
          }
        }
      });
    },
    listMove(e) {
      var Dom = document.getElementById("mescroll").getBoundingClientRect();
      var Body = $(window).height();
      if (Body - Dom.bottom > 10) {
        if (this.stuData.totalPage == this.stuList.currentPage) {
          // Dialog.alert({
          //   title: "提示",
          //   message: '已无更多信息~'
          // })
          return;
        }
        this.stuList.currentPage++;
        this.getStulist2();
      }
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
    getData(resolve, reject) {
      var vm = this;
      const list = this.postDataRequest({});
      this.ajaxHelper({
        type: "post",
        url: "/kgApp/personal/amountOfTribute",
        data: list,
        success: function(data) {
          if (data.code == 10000) {
            vm.tvnum = data.data.tributeAmount;
            resolve(data.data);
          } else if (data.code == 10004) {
            Dialog.alert({
              message: data.message
            }).then(() => {
              resolve(data.data);
            });
          } else reject(data);
        }
      });
    },
    getStulist(resolve, reject) {
      var vm = this;
      var list = this.postDataRequest(this.stuList);
      this.ajaxHelper({
        type: "post",
        url: "/kgApp/personal/getContributionList",
        data: list,
        success: function(data) {
          if (data.code == 10000) {
            vm.stuData = data.data;
            if (data.data.data.length == 0) {
              vm.isEmpty = true;
              vm.stuInfo = '您暂时还没有徒弟，快去邀请好友吧~';
              vm.notEmpty = false;
              return;
            } else {
              vm.isEmpty = false;
              vm.notEmpty = true;
              data.data.data.forEach(element => {
                if (!element.avatar) {
                  element = Object.assign(element, {
                    avatar:
                      "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/photocopy23x.png"
                  });
                }
                if (element.avatar.indexOf("http") == -1) {
                  element = Object.assign(element, {
                    avatar: conf.imgUrl + element.avatar
                  });
                }
                vm.list.push(element);
              });
            }
            resolve(data.data);
            // vm.callSuccess();
          } else reject(data);
        }
      });
    },
    getStulist2() {
      var vm = this;
      var list = this.postDataRequest(this.stuList);
      this.ajaxHelper({
        type: "post",
        url: "/kgApp/personal/getContributionList",
        data: list,
        success: function(data) {
          if (data.code == 10000) {
            vm.stuData = data.data;
            if (data.data.data.length == 0) {
              vm.isEmpty = true;
              vm.notEmpty = false;
              return;
            } else {
              vm.isEmpty = false;
              vm.notEmpty = true;
              data.data.data.forEach(element => {
                if (!element.avatar) {
                  element = Object.assign(element, {
                    avatar:
                      "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/photocopy23x.png"
                  });
                }
                if (element.avatar.indexOf("http") == -1) {
                  element = Object.assign(element, {
                    avatar: conf.imgUrl + element.avatar
                  });
                }
                vm.list.push(element);
              });
              // if (vm.stuData.totalNumber == vm.list.length) {
              //   Dialog.alert({
              //     title: "提示",
              //     message: '已无更多信息~'
              //   })
              // }
            }
            // resolve(data.data)
            vm.callSuccess();
          } else vm.callError(data.code, data.message);
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
    },
    getPromise() {
      var vm = this;
      vm.list = [];
      vm.stuList.currentPage = 1;
      const list = this.postDataRequest({});
      let getIniteData = new Promise(function(resolve, reject) {
        vm.getData(resolve, reject);
      });
      var getStulistInit = new Promise(function(resolve, reject) {
        vm.getStulist(resolve, reject);
      });
      Promise.all([getIniteData, getStulistInit])
        .then(results => {
          vm.callSuccess();
        })
        .catch(e => {
          vm.callError(e.code, e.message);
          //失败
        });
    }
  },
  mounted() {
    this.isIphoneX()
  }
};
</script>
 
<style lang="less" scoped>
.mescroll-upwarp {
  display: none !important;
}
.empty {
  text-align: center;
  font-size: 14px;
}
i {
  background-size: 100% 100%;
}
.mystu {
  background-size: 100% 100%;
  background: rgba(255, 255, 255, 1);
  .main {
    width: 100%;
    background-size: 100% 100%;
    height: 120px;
    background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/RankBG3x.png");
    padding-top: 30px;
    border-bottom: 11px solid rgba(245, 245, 245, 1);
    div:first-child {
      text-align: center;
      font-size: 14px;
      font-family: "PingFangSC-Regular";
      color: rgba(102, 102, 102, 1);
    }
    div:last-child {
      text-align: center;
      font-size: 32px;
      margin-top: 12px;
      font-family: "PingFangSC-Semibold";
      color: rgba(24, 134, 250, 1);
    }
  }
  .stulist {
    padding-left: 11px;
    background: #fff;
    padding-bottom: 80px;
    .rank_bar {
      font-family: "FZPSZHJW--GB1-0";
      font-size: 16px;
      line-height: 44px;
    }
    .stu_info {
      padding: 10px 0;
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        position: relative;
        top: 10px;
        margin-right: 10px;
        display: inline-block;
      }
      .rank {
        width: 20px;
        height: 27px;
        display: inline-block;
        text-align: center;
        line-height: 27px;
        margin-right: 10px;
      }
      .name {
        width: 90px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 20px;
        display: inline-block;
      }
      .numTV {
        float: right;
        margin-right: 12px;
        margin-top: 15px;
        font-size: 21px;
        font-family: "PingFangSC-Medium";
        color: rgba(102, 102, 102, 1);
        .unit {
          font-size: 12px;
          padding-left: 4px;
          font-family: "PingFangSC-Regular";
        }
      }
      .rank3 {
        color: rgba(24, 134, 250, 1);
      }
      .rank0 {
        background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/No13x.png");
        background-size: 100% 100%;
      }
      .rank1 {
        background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/No23x.png");
        background-size: 100% 100%;
      }
      .rank2 {
        background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/No33x.png");
        background-size: 100% 100%;
      }
    }
  }
  .isIphoneX{
    padding-bottom: 140px;
  }
  .inviteStu {
    width: 80%;
    text-align: center;
    line-height: 49px;
    color: #fff;
    font-size: 16px;
    background: rgba(255, 168, 47, 1);
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
@media only screen and (min-width: 375px) {
  .name {
    width: 140px !important;
  }
}
@media only screen and (min-width: 767px) {
  .mystu {
    .main {
      height: 240px;
      padding-top: 60px;
      div:first-child {
        font-size: 28px;
      }
      div:last-child {
        font-size: 64px;
        margin-top: 24px;
      }
    }
    .stulist {
      padding-left: 22px;
      margin-bottom: 100px;
      .rank_bar {
        font-size: 32px;
        line-height: 88px;
      }
      .stu_info {
        padding: 20px 0;
        img {
          width: 80px;
          height: 80px;
          top: 20px;
          margin-right: 20px;
        }
        .rank {
          width: 40px;
          height: 54px;
          line-height: 54px;
          margin-right: 20px;
          font-size: 32px;
        }
        .name {
          width: 140px;
          height: 40px;
          font-size: 32px;
        }
        .numTV {
          margin-right: 24px;
          margin-top: 30px;
          font-size: 42px;
          .unit {
            font-size: 24px;
            padding-left: 8px;
          }
        }
      }
    }
    .inviteStu {
      margin-top: 20px;
      height: 98px;
      line-height: 98px;
      font-size: 32px;
    }
  }
}

@media only screen and (max-width: 320px) {
  .mystu .inviteStu {
    padding: 12px 0 12px 0;
    position: fixed;
    bottom: 25px;
    border-radius: 40px;
    line-height: 1;
  }
}
</style>
