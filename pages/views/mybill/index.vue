/** 
* @description： 疯狂抢矿机我的抢单列表页
* @author： cb
* @data: 2018.5.18
*/
<template>

        <section class = 'bill-container' >
            <!-- <bill-header title = "我的抢单" @back="backPre"/> -->
            <section class="bill-list-container " v-if = "billList != null">  
                <ul >
                    <li v-for = "(item,index) in billList" :key = "index">
                        <div class = 'bill-pic'>
                            <img class = 'mar-auto' :src = 'item.minerPhoto'/>
                        </div>
                        <div class = 'bill-detail'>
                            <div>
                                <p class = 'color0A0 omit2 font16'>{{item.minerName}}</p>
                                <p v-if = "(!isEnd(item) && !isNoMill(item)) || item.robStatus == 1" class = 'font13'>剩余<span>{{item.minerNumber}}台</span></p>
                            </div>
                            <div class = 'detail-btm'>
                                <div class = 'btm-left'>
                                    <span v-if = "item.robStatus == 1" class = 'colorE63 font13'>抢单成功</span>
                                    <span v-if = "isNoMill(item) && !isEnd(item) && item.robStatus != 1" class = 'colorE63 font13'>已抢完</span>
                                    <span v-if = "isEnd(item) && item.robStatus != 1" class = 'colorE63 font13'>已结束</span>
                                    <span v-if = "!isEnd(item) && !isNoMill(item) && item.robStatus != 1" class = 'bill-count-down colorE63'>剩<count-down  :currentTime = "item.remainTime + ''" :showType="'2'"></count-down></span>
                                    <bill-progress v-if = "(!isEnd(item) && !isNoMill(item)) || item.robStatus == 1" :current = "item.assistAmount + ''" :total = "item.minerPrice" class = 'bill-progress'/>
                                </div>
                                <span v-if = "item.robStatus != 1 && (item.minerNumber != 0 || item.remainTime != 0)"  @click = "toDetail(item)"  class = 'primary-button bill-button font16'>继续蓄能</span>
                                <span v-if = "item.robStatus == 1" @click = "toDetail(item)"  class = 'success-button bill-button font16'>拿走矿机</span>
                                <span v-if = "(item.robStatus != 1 && item.minerNumber == 0) || (item.robStatus != 1 && item.remainTime == 0)" @click = "toIndex"  class = 'end-button bill-button font16'>去抢别的</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
            <section class = 'no-data' v-if = 'billList == null'>
                <div class = 'no-data-content'>
                    <img src = "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/img/schedule/null.png"/>
                    <p class = 'font16 color9FA'>你还没有抢单</p>
                </div>
            </section>
            <status-error :param = "param" v-if = "param.statusCode != undefined" />
        </section>

</template>
<script>
import C from '~/assets/js/common'
import ssr from '~/assets/js/ssr/mybill'
import otherPlatform from "~/assets/js/ssr/otherPlatform";
import BillProgress from '~/components/base/Progress'
import CountDown from '~/components/base/CountDown'
import BillHeader from '~/components/base/Header'
import StatusError from '~/components/base/StatusError'
let Base64 = require('js-base64').Base64
export default {
    head: {
        title: '我的抢单',
        meta: [
            { hid: 'keywords', name: 'keywords', content: '我的抢单' },
            { hid: 'description', name: 'description', content: '我的抢单' }
        ],
        script: [
          {src: '/views/common/callNativeSuccess.js'}
        ]
    },
    components:{
        BillProgress,CountDown,BillHeader,StatusError
    },
    data(){
        return {
            billList:null, //我的清单列表
            newUser: '',//是否为新注册用户
            token:null, //token
            api_url:null, //请求地址
            device:null, //获取端口来源
            param:{}, 
        }
    },
    //ssr获取的data信息，meger到data中
    async asyncData({req}){
        //获取url请求地址
        let url = C.host
        let newUser = C.getUrlQuery("newUser", req.url); //获取newUser标识
        // let url = C.getUrlQuery("api_url", req.url)
        //获取token
        let token = C.getUrlQuery("token", req.url);
        //调用第三方注册接口，同步数据给第三方
        try{
          otherPlatform.register(C.postDataRequest({}, token), newUser, token, url);//第三方平台注册
        }catch(e){
          console.log('第三方接口注册用户出错！')
          console.log(e)
        }
        //获取端口来源
        let device = C.getUrlQuery("device", req.url);
        //获取ip
        let ip = url;
        //组装post数据
        let billPost = C.postDataRequest('', token)
        //发起请求
        let myPromises = [
            ssr.getBillList(billPost, token, {ip, url})
        ];
        if(!myPromises.length) return {};
        // ssr采用promise.all一次性获取所有的数据
        let [data] = await Promise.all(myPromises)
        .then((results) => {
        return results;
        }).catch((e)=>{
      
        });
        //判断数据是否为空
         let billList = null;
         let param = {};
        if(data.code == 10000){
          billList = data.data.myRobList.length == 0 ? null : data.data.myRobList;
        }else if(data.code == 10004){
            param.statusCode = data.code;
            param.url = req.url.split('?')[0];
            param.query = req.url.split('?')[1].replace('token=' + token,'').replace(/&$/, '').replace(/^&/, '');
        }
        //初始化数据
        return{
             billList:billList,
             api_url:url,
             newUser: newUser,
             token:token,
             device:device,
             param:param
        }
    },
    mounted(){
        window.loading.parentNode.removeChild(window.loading)//关闭loading
        const billListContainer = document.getElementsByClassName('bill-list-container')[0];
        //根据billList是否为空 显示布局
        // billListContainer.className = this.billList != null ? 'bill-list-container' : 'bill-list-container flex';
        const billFlex = document.getElementsByClassName('flex')[0];
        if(billFlex){
            //获取当前屏幕高度 设置billFlex高度
            // billFlex.style.height = document.body.clientHeight - 40 + 'px';
        }
    },
    methods:{
        toDetail(item){
            //跳转抢单详情页
            window.location.href = './millDetail?token=' + this.token + '&api_url=' + this.api_url + '&rob_id=' + item.robId + '&device=' + this.device;
        },
        toIndex(){
            //跳转首页
             window.location.href = './millActivityIndex?token=' + this.token + '&api_url=' + this.api_url  + '&device=' + this.device;
        },
        backPre() {
            // 回到上一部
            C.callBack();
        },
        //已抢完、已结束不显示
        // (item.minerNumber != 0 || item.remainTime != 0) || (item.robStatus == 1 && (item.minerNumber != 0 || item.remainTime != 0))
        //矿机已结束
        isEnd(item){
            if(item.remainTime <= 0){
                return true
            }
            return false
        },
        //矿机已抢完
        isNoMill(item){
            if(item.minerNumber <= 0){
                return true
            }
            return false
        },
    },
}
</script>

<style lang="less" scoped>
    .omit2{
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        display: -moz-box;
        display: box; /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -moz-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 2; /** 显示的行数 **/
        -moz-line-clamp: 2; /** 显示的行数 **/
        line-clamp: 2; /** 显示的行数 **/
        overflow: hidden;
    }
    .flex{
        display: flex;
        position:fixed;
        width:100%;
        height:100%;
    }
    .bill-button{
        display: inline-block;
        width:21vw;
        height:8.8vw;
        line-height: 8.8vw;
        border-radius: 5px;
        text-align: center;
        position:absolute;
        right:0px;
        bottom:0px;
    }
    .primary-button{
        background:#5CC5FD;
        color:#fff;
    }
    .success-button{
        background:#FB9D39;
        color:#fff;
    }
    .end-button{
        background:#98D4F3;
        color:#fff; 
    }
    .color9FA{
        color:#9FA5BD;
    }
    .colorE63{
        color:#E63838;
    }
    .color0A0{
        color:#0A0B2E;
    }
    .color545{
        color:#5457FF;
    }
    .colorE56{
        color:#E56D6D;
    }
    .colorFF7{
        color:#FF7A22
    }
    .color5AA{
        color:#5AAAFF;
    }
    .font19{
        font-size:5vw;
    }
    .font16{
        font-size:4vw;
    }
    .font14{
        font-size:3.5vw;
    }
    .font13{
        font-size:3.4vw;
    }
    .font12{
        font-size:3.2vw;
    }
    .mar-auto{
        position: absolute;
        top:0px;
        bottom:0px;
        left:0px;
        right:0px;
        margin:auto;
    }
    .bill-container{
        img{
            display: inline-block;
        }
        .m_header{
            position: absolute;
            width:100%;
            z-index:200;
        }
        background:#262762;
        min-height:100%;
        .bill-list-container{
            padding:15px 10px;
            // padding-top:55px;
        }
        ul{
            background:#fff;
            border-radius: 5px;
            padding:0px 15px;
            li{
                display: flex;
                width:100%;
                height:40vw;
                list-style: none;
                border-bottom:1px solid #D1D1D1;
                .bill-pic{
                    width:24vw;
                    height:24vw;
                    margin-top:7.5vw;
                    overflow: hidden;
                    position: relative;
                    margin-left: 0vw;
                    margin-right: 5vw;
                    border-radius: 4px;
                    img{
                        width:100%;
                    }
                }
                .bill-detail{
                    display: flex;
                    flex-direction: column;
                    width: 57vw;
                    height: 24vw;
                    margin-top: 7.5vw;
                    justify-content: space-between;
                    p:nth-child(1){
                        // margin-bottom:7px;
                        font-weight: bold;
                        max-height:11vw;
                    }
                    p:nth-child(2){
                        span:nth-child(2){
                            
                        }
                    }
                    .detail-btm{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        position: relative;
                        .btm-left{
                            position: relative;
                            .bill-progress{
                                width:27vw;
                                height:3vw;
                                margin:0px;
                                margin-top:4px;
                                background:#DADADA;
                                .current-progress{
                                    background:#FF6738!important;
                                }
                            }
                            .bill-count-down{
                                font-size: 12px;
                                display: block;
                                text-align: left;
                            }
                        }
                    }
                }
            }
            li:last-child{
                border:0px;
            }
        }
        .no-data {
            width:100%;
            display: flex;
            // background:#fff;
            flex-direction: column;
            justify-content: center;
            border-radius: 5px;
            padding: 15px;
            height: 100%;
            position: fixed;
            img{
                width:30.9vw;
                height:32vw;
                margin:0 auto;
                margin-bottom: 4.8vw;
            }
            p{
                text-align: center;
            }
            .no-data-content{
                background: #fff;
                border-radius: 5px;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
        }
    }
    @media only screen and (max-width:320px){
        .font16{
            font-size:3vw;
        }
        .detail-btm{
            margin-top:-2px;
        }
    }
</style>
<style lang="less">
        .bill-progress{
            width:27vw;
            background:#DADADA;
            .current-progress{
                background:#FB9D39!important;
                
            }
            .text{
                height:3vw!important;
                line-height:3vw!important;
                font-size:3.2vw!important;
            }
        }
</style>
