/**
*  @description： 疯狂抢矿机主页面
*  @author： 杨玉梅
*  @data:  2018.5.4
*/
<template>
    <div class="millActivity" id="millActivity" :class="{isIphoneXBoxWRap: isIphoneXModel}" >
      <!-- <div style="position:fixed;top:100px;color: red;text-align:center; width: 100%;">{{aaa}}</div> -->
       <div class="millActivityIndexBanner">
         <span>活动时间：{{startTime}}—{{endTime}}</span>
       </div>
       <div class="howGetMill">
           <div class="title"></div>
           <div class="steps">
                 <div><i class="icon"></i><span class="stepsTxt stepsTxt1">挑选心仪的矿机</span></div>
                 <i class="right"></i>
                 <div ><i class="icon freeGetIcon"></i><span class="stepsTxt stepsTxt2">邀请好友助力</span></div>
                 <!-- <i class="icon"><span>邀请好友助力</span></i> -->
                 <i class="right"></i>
                 <div><i class="icon savePowerIcon"></i><span class="stepsTxt stepsTxt3">蓄能完成拿走矿机</span></div>
                 <!-- <i class="icon"><span>蓄能完成拿走矿机</span></i> -->
           </div>
           <div class="rulerBtn" ><span @click="ruleModel =!ruleModel">查看规则</span></div>
       </div>
       <div class="millList">
           <list-shop @freeGetChild="beforeFreeGet" :list="millList" />
       </div>
        <div class="btns" id="btns" ref='btns' :class="{isIphone6BoxBtns: isIphone6Model}"  @touchmove.prevent="doSomeThing">
            <span class="btn" @click="helpHe">为好友助力</span>
            <span @click="myOrders" class="btn gradientBtn">查看我的抢单</span>
            <div :class="{isIphoneXBox: isIphoneXModel}"></div>
        </div>
        <Dialog v-if="dialogShow" @close="closeModel">
            <div class="dialog_content">
                <p>请登录后参与</p>
                <div class="dialogBtn" @click="loginRightNow">前往登录</div>
            </div>
        </Dialog>
        <Dialog v-if="savePowerModel" @close="closeModel">
            <div class="dialog_content">
                <p>请输入好友助力码</p>
                <van-cell-group>
                    <van-field @focus="inPutCodeFocus" v-model="params.millerCode" placeholder="请输入好友助力码" />
                </van-cell-group>
                <div class="savePowerErrorTxt" :class="{savePowerErrorTxt2: !errorCode}">{{savePowerErrorTxt }}</div>
                <div class="dialogBtn" @click="submitSavePower">确认助力</div>
            </div>
        </Dialog>
        <Dialog v-if="freeGetModel" @close="closeModel">
            <div class="dialog_content">
                <p>开抢将消耗1000KG</p>
                <p>先抢先得哦~</p>
                <div class="dialogBtn" @click="freeGetNow">立即开抢</div>
            </div>
        </Dialog>
        <Dialog v-if="kgLessModel" @close="closeModel">
            <div class="dialog_content">
                <p>KG余额不足</p>
                <p>看几篇文章就赚到了</p>
                <div class="dialogBtn" @click="toAppIndex">前去赚KG</div>
            </div>
        </Dialog>
        <Dialog v-if="powerSavingModel" @close="closeModel">
            <div class="dialog_content">
                <p>当前正在蓄能中...</p>
                <!-- 调到抢到详情页 -->
                <div class="dialogBtn" @click="goOnSavePower" >继续蓄能</div>
            </div>
        </Dialog>
        <Dialog v-if="savePowerSuccessModel" @close="closeModel">
            <div class="dialog_content">
                <p><i></i>  成功蓄能{{savePowers}}</p>
                <p>前往APP，你也可以开抢矿机哦</p>
                <!-- 调到抢到详情页 -->
                <div class="dialogBtn" @click="savePowerSuccessModel=false" >我也要抢</div>
            </div>
        </Dialog>
        <!-- 0元抢其他错误 -->
        <Dialog v-if="freeGetOtherErrorModel" @close="closeModel">
            <div class="dialog_content">
                <p>{{freeGetOtherErrorText}}</p>
                <div class="dialogBtn" @click="freeGetOtherErrorModel=false" >我知道了</div>
            </div>
        </Dialog>
        <Rule v-if="ruleModel" @close="closeModel"></Rule>
    </div>
</template>
<script>
import Vue from "vue";
import ssr from "~/assets/js/ssr/millActivityIndex";
import csr from "~/assets/js/csr/millActivityIndex";
import otherPlatform from "~/assets/js/ssr/otherPlatform";
import C from "~/assets/js/common";
import conf from "~/assets/js/util/conf";
import listShop from "~/components/base/ListShop.vue";
import Dialog from "~/components/base/Dialog.vue";
// import Header from "~/components/base/Header.vue";
import Rule from "~/components/base/Rule.vue";
import { Field } from "vant";
import md5 from "js-md5";
let Base64 = require("js-base64").Base64;
import axios from "axios";
Vue.use(Field);
export default {
  head: {
    title: "矿机活动",
    meta: [
      { hid: "keywords", name: "keywords", content: "矿机活动" },
      { hid: "description", name: "description", content: "矿机活动" }
    ],
    script: [{ src: "/views/common/callNativeSuccess.js" }]
  },
  components: { listShop, Dialog, Rule },
  async asyncData({ req, res, redirect }) {
    let device = C.getUrlQuery("device", req.url); //获取token
    if (device === "") {
      //PC端打开跳转到APP下载引导页面(测试环境地址)
      redirect("https://www.kg.com/mine/list.html");
    }
    let isiOs10 = C.getUrlQuery("version", req.url);
    let vm = this;
    let url = C.host; //获取host地址
    let newUser = C.getUrlQuery("newUser", req.url); //获取newUser标识
    // let url = C.getUrlQuery("api_url", req.url); //获取host地址
    let token = C.getUrlQuery("token", req.url); //获取token
    let userId = token.split("_")[0];
    //调用第三方注册接口，同步数据给第三方
    try{
      otherPlatform.register(C.postDataRequest({}, token), newUser, token, url);//第三方平台注册
    }catch(e){
      console.log('第三方接口注册用户出错！')
      console.log(e)
    }
    let ip = url; //获取ip
    let jsonData = C.postDataRequest({ userId: userId }, token);
    let jsonData1 = C.postDataRequest({}, '');//获取加密参数
    let myPromise = [
      ssr.getUserInfo(jsonData, token, { ip, url }),
      ssr.getMillList({ ip, url }),
      ssr.getMinerTime(jsonData1, '', {baseURL: C.host})//获取活动时间
    ];
    if (!myPromise.length) return {};
    let [data1, data2, data3] = await Promise.all(myPromise)
      .then(results => {
        return results;
      })
      .catch(e => {
        console.log("errr", e);
      });
    let loginData = data1;
    let millList = data2.data.minerList;
    let startTime = '';
    let endTime = '';
    if(data3.code === '10000'){
      let {minerActivityTime} = data3.data;
      let start = new Date(Number(minerActivityTime.startTime))
      let end = new Date(Number(minerActivityTime.endTime))
      startTime =  C.DateFormat(start,"MM月DD日 hh:mm");
      endTime = C.DateFormat(end, "MM月DD日 hh:mm")
    }
    return { loginData, millList, newUser,token, ip, url, userId, device, startTime, endTime };
  },
  data() {
    return {
      freeGetOtherErrorModel: false,
      freeGetOtherErrorText: "",
      ip: "",
      ruleModel: false,
      errorCode: false,
      savePowerErrorTxt: "你今天已为TA助力了",
      showRulers: false,
      isLogin: true, // 默认已登陆
      dialogShow: false,
      savePowerModel: false,
      isIphoneXModel: false,
      freeGetModel: false,
      kgLessModel: false,
      powerSavingModel: false, // 正在储能弹窗
      savePowerSuccessModel: false, // 成功储能
      savePowers: 198, // 好友储能数
      loginData: {},
      userId: "",
      millList: [
        {
          minerPrice: "16800.00",
          robedNumber: 0,
          minerName:
            "熊猫矿机 PandaMiner B3 Pro ETH/ETC/XMR/ZEC等多种GPU可支持算法币种",
          minerNumber: 1,
          minerId: "446732081771454464",
          minerPhoto:
            "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/%E7%86%8A%E7%8C%AB%E7%9F%BF%E6%9C%BA.jpg"
        },
        {
          minerPrice: "16800.00",
          robedNumber: 0,
          minerName: "熊猫矿机 PandaMiner B3 Pr法币种",
          minerNumber: 0,
          minerId: "446732081771454464",
          minerPhoto:
            "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/%E7%86%8A%E7%8C%AB%E7%9F%BF%E6%9C%BA.jpg"
        }
      ],
      currentUrl: "",
      params: {
        millerCode: ""
      },
      newUser: '',//是否为新注册用户
      token: "",
      url: "",
      millerId: "",
      rob_id: "",
      activeTime: {},
      startTime: "",
      endTime: "",
      isIphone6Model: false,
      scrollTop: null,
      aaa: null,
      startX: "",
      startY: "",
      isiOs10: false
    };
  },
  methods: {
    closeModel() {
      this.dialogShow = false;
      this.savePowerModel = false;
      this.freeGetModel = false;
      this.kgLessModel = false;
      this.powerSavingModel = false;
      this.savePowerSuccessModel = false;
      this.errorCode = false;
      this.params.millerCode = "";
      this.ruleModel = false;
      this.freeGetOtherErrorModel = false;
    },
    helpHe() {
      let currentTimeSteamp = Date.parse(new Date());
      if (currentTimeSteamp < parseInt(this.activeTime.startTime)) {
        // 活动还没开始
        this.freeGetOtherErrorText = "活动还未开始";
        this.freeGetOtherErrorModel = true;
      } else if (currentTimeSteamp > parseInt(this.activeTime.endTime)) {
        this.freeGetOtherErrorText = "活动已结束";
        this.freeGetOtherErrorModel = true;
      } else {
        let jsonData = C.postDataRequest({ userId: this.userId }, this.token);
        // 再次请求，是否登陆，如果登陆了，再显示输入助力码弹窗
        Promise.resolve(
          ssr.getUserInfo(jsonData, this.token, { ip: this.ip, url: this.url })
        ).then(data => {
          if (data.code == 10000) this.savePowerModel = true;
          else this.dialogShow = !this.dialogShow;
        });
      }
    },
    myOrders() {
      // 查看我的抢单
      // C.callStart()
      let currentTimeSteamp = Date.parse(new Date());
      if (currentTimeSteamp < parseInt(this.activeTime.startTime)) {
        // 活动还没开始
        this.freeGetOtherErrorText = "活动还未开始";
        this.freeGetOtherErrorModel = true;
      } else {
        let jsonData = C.postDataRequest({ userId: this.userId }, this.token);
        // 再次请求，是否登陆，如果登陆了，再显示输入助力码弹窗
        Promise.resolve(
          ssr.getUserInfo(jsonData, this.token, { ip: this.ip, url: this.url })
        ).then(data => {
          // C.callSuccess()
          if (data.code == 10000) {
            window.location.href =
              "./mybill?token=" + this.token + "&device=" + this.device;
          } else this.dialogShow = !this.dialogShow;
        });
      }
    },
    beforeFreeGet(id) {
      // 判断活动时间是否已开始
      // let currentTimeSteamp = Date.parse(new Date());
      // if (currentTimeSteamp < parseInt(this.activeTime.startTime)) {
      //   // 活动还没开始
      //   this.freeGetOtherErrorText = "活动还未开始";
      //   this.freeGetOtherErrorModel = true;
      // } else if (currentTimeSteamp > parseInt(this.activeTime.endTime)) {
      //   this.freeGetOtherErrorText = "活动已结束";
      //   this.freeGetOtherErrorModel = true;
      // } else {
      this.millerId = id;
      let jsonData = C.postDataRequest({ userId: this.userId }, this.token);
      // 再次请求，是否登陆，如果登陆了，再显示输入助力码弹窗
      Promise.resolve(
        ssr.getUserInfo(jsonData, this.token, { ip: this.ip, url: this.url })
      ).then(data => {
        if (data.code == 10000) {
          let buyjsonData = C.postDataRequest(
            { userId: this.userId, minerId: this.millerId },
            this.token
          );
          Promise.resolve(
            csr.beforeRush(buyjsonData, this.token, {
              ip: this.ip,
              url: this.url
            })
          ).then(data => {
            if (data.code == 10000) {
              // 通过验证可以抢
              this.freeGetModel = true;
            } else if (data.code == 20129) {
              this.rob_id = data.message;
              this.powerSavingModel = true;
            } else {
              this.freeGetOtherErrorText = data.message;
              this.freeGetOtherErrorModel = true;
            }
          });
        } else this.dialogShow = !this.dialogShow;
      });
      // }
    },
    freeGetNow() {
      var vm = this;
      // 立即开抢
      //    window.location.href = '/detail?token='+this.token+'&api_url='+this.url+'&rob_id='+this.millerId;
      // 如果不够，显示弹窗，去往首页
      // 请求/kgApp/miner/rushToMiner
      let buyjsonData = C.postDataRequest(
        { userId: this.userId, minerId: this.millerId },
        this.token
      );
      Promise.resolve(
        csr.BuyMinner(buyjsonData, this.token, { ip: this.ip, url: this.url })
      )
        .then(data => {
          if (data.code == 10000) {
            vm.rob_id = data.data.robId;
            window.location.href =
              "./millDetail?token=" +
              this.token +
              "&rob_id=" +
              this.rob_id +
              "&device=" +
              this.device;
          } else if (data.code == 20126) this.kgLessModel = true;
          else if (data.code == 20129) {
            this.powerSavingModel = true;
            vm.rob_id = data.message;
          } else {
            this.freeGetOtherErrorText = data.message;
            this.freeGetOtherErrorModel = true;
          }
        })
        .catch(e => {
          console.log("e", e);
        });
      this.freeGetModel = false;
    },
    loginRightNow() {
      // 立即登陆-APP登陆页
      let url = this.currentUrl.split("?")[0];
      // alert('点击了去登陆')
      C.callLogin(url, "");
      this.dialogShow = !this.dialogShow;
    },
    toAppIndex() {
      // 去往APP首页
      C.callExit();
    },
    submitSavePower() {
      // 确认助力
      if (this.params.millerCode) {
        let helpData = C.postDataRequest(
          {
            assistCode: this.params.millerCode
          },
          this.token
        );
        Promise.resolve(
          csr.inputHelpCode(helpData, this.token, {
            ip: this.ip,
            url: this.url
          })
        ).then(data => {
          // 助力成功
          if (data.code == 10000) {
            this.savePowers = data.data.assistAmount;
            // 数据请求完成之后，清空params.millerCode
            this.params.millerCode = "";
            this.savePowerModel = false;
            this.savePowerSuccessModel = true;
            Promise.resolve(ssr.getMillList({ ip:this.ip, url:this.url })).then(data => {
              console.log(1111,data)
              if(data.code ==10000) this.millList=data.data.minerList
            })
          } else {
            this.savePowerErrorTxt = data.message;
            this.errorCode = true;
          }
        });
      } else {
        this.savePowerErrorTxt = "请输入助力码";
        this.errorCode = true;
      }
    },
    goOnSavePower() {
      // 继续储能，去往抢到详情页
      this.closeModel();
      window.location.href =
        "./millDetail?token=" + this.token + "&rob_id=" + this.rob_id;
    },
    inPutCodeFocus() {
      // 助力码输入框获得焦点
      this.errorCode = false;
    },
    // 空函数，什么都不做
    doSomeThing() {},
  },
  mounted() {
    window.loading.parentNode.removeChild(window.loading); //关闭loading
    this.isIphoneXModel = C.isIphoneX();
    this.currentUrl = window.location.href;
    if (this.loginData.code != 10000) {
      this.isLogin = false;
    }
  }
};
</script>

<style lang="less" scoped>
.millActivity {
  font-family: "PingFangSC-Regular" !important;
  font-size: 16px; // 大部分为16px;
  background-color: #262762;
  padding-bottom: 14.667vw;
  .millList,
  .btns {
    background-color: #fff;
  }
  //  banner图
  .millActivityIndexBanner {
    height: 85.333vw;
    width: 100%;
    background-size: 100% 100%;
    background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/millActivityIndexBanner3x.png");
    text-align: center;
    span {
      font-family: "HYYaKuHeiW PingFangSC-Regular";
      font-size: 2.667vw;
      display: inline-block;
      margin-top: 57.6vw;
      color: rgba(255, 255, 255, 1);
      padding: 1.733vw 3.2vw;
      background: -webkit-linear-gradient(
        left,
        #732eff,
        #a002e2
      ); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(
        right,
        #732eff,
        #a002e2
      ); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(
        right,
        #732eff,
        #a002e2
      ); /* Firefox 3.6 - 15 */
      background: linear-gradient(right, #732eff, #a002e2); /* 标准的语法 */
      border-radius: 3.2vw;
    }
  }
  // 如何抢矿机
  .howGetMill {
    width: 93.33%;
    margin: 0 auto;
    height: 60.8vw;
    padding-top: 4vw;
    background-size: 100% 100%;
    background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/img/millActivityIndex/threeWithteBlock.png");
    font-size: 2.667vw;
    color: #757575;
    margin-top: -2.133vw;
    .title {
      width: 45.2vw;
      height: 11.867vw;
      margin: 0 auto;
      background-size: 100% 100%;
      background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/img/millActivityIndex/howToGetMill.png");
    }
    .steps {
      display: inline-flex;
      width: 100%;
      justify-content: center;
      margin-top: 3.6vw; // position: relative;
      div {
        position: relative;
      }
      .stepsTxt {
        position: absolute;
        text-align: center;
        white-space: nowrap;
        transform: translateX(-1vw);
      }
      .stepsTxt1 {
        white-space: nowrap;
        transform: translateX(1.2vw);
      }
      .stepsTxt2 {
        white-space: nowrap;
        transform: translateX(2.5vw);
      }
      .stepsTxt3 {
        white-space: nowrap;
        transform: translateX(-2.5vw);
        width: 26.667vw;
      }
      i {
        display: block;
        background-size: 100% 100%;
      }
      .right {
        width: 3.467vw;
        height: 2.933vw;
        background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/img/millActivityIndex/preRight.png");
        margin-top: 8.933vw;
        margin-left: 3.2vw;
        margin-right: 3.2vw;
      }
      .icon {
        width: 20vw;
        height: 21.6vw;
        background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/img/millActivityIndex/freeGet.png");
        span {
          font-style: normal;
          position: relative;
          top: 22.6vw;
        }
      }
      .freeGetIcon {
        background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/img/millActivityIndex/helpHe.png");
      }
      .savePowerIcon {
        background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/img/millActivityIndex/savePower.png");
        margin-right: 0;
      }
    }
    .stpesTxt {
      width: 100%;
      display: inline-flex;
      justify-content: space-around;
    }
    .rulerBtn {
      color: rgba(254, 118, 118, 1);
      font-size: 2.667vw;
      text-align: center;
      padding-top: 12.4vw;
      text-decoration: underline;
    }
  }
  // 矿机列表
  .millList {
    width: 93.33%;
    margin: 0 auto;
    margin-top: 6.667vw;
    border-radius: 1.333vw;
  }
  // 底部按钮布局 悬浮底部
  .btns {
    color: #fff;
    width: 100%;
    text-align: center;
    padding: 1.333vw 0;
    position: fixed;
    bottom: 0px;
    // background-color: red;
    z-index: 1;
    .btn {
      display: inline-block;
      width: 42.6%;
      height: 9.867vw;
      background-color: rgba(90, 170, 255, 1);
      text-align: center;
      line-height: 9.867vw;
      border-radius: 1.333vw;
    }
    .gradientBtn {
      margin-left: 2.667vw;
      background: linear-gradient(to right, #ff8338, #ff6738); /* 标准的语法 */
      background: -webkit-linear-gradient(
        left,
        #ff8338,
        #ff6738
      ); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, #ff8338, #ff6738);
      /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right, #ff8338, #ff6738);
      /* Firefox 3.6 - 15 */
    }
  }
  .isIphone6BoxBtns {
    bottom: 63px;
  }
}
.isIphoneXBoxWRap {
  padding-bottom: 94px;
  .isIphoneXBox {
    height: 20px;
  }
}
.dialog_content {
  .van-field__control {
    text-align: center;
    padding: 5px 0;
  }
  .van-cell {
    padding: 0;
    // line-height: 10.667vw;
  }
  i {
    display: inline-block;
    height: 5.6vw;
    width: 5.6vw;
    background-image: url("https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/img/millActivityIndex/complete.png");
    background-size: 100% 100%;
    position: relative;
    top: 1.066vw;
  }
  font-size: 4.8vw;
  color: #807f7f;
  text-align: center;
  padding-top: 8vw;
  padding-bottom: 5.333vw;
  .dialogBtn {
    height: 10.667vw;
    width: 68.8vw;
    background-color: #5aaaff;
    margin: 0 auto;
    line-height: 10.667vw;
    border-radius: 5.333vw;
    color: #fff;
    margin-top: 5.866vw;
  }
  .van-hairline {
    border: 1px solid #c7c7c7;
    // height: 10.667vw;
    width: 68.8vw;
    margin: 0 auto;
    margin-top: 8.8vw;
    border-radius: 1.333vw;
    text-align: center;
  }
  .savePowerErrorTxt {
    color: #e63838;
    margin-top: 1.333vw;
    font-size: 3.466vw;
    opacity: 1;
  }
  .savePowerErrorTxt2 {
    opacity: 0;
  }
}
</style>
