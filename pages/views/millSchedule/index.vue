/** 
* @description： 疯狂抢矿机进度列表页
* @author： cb
* @data: 2018.5.18
*/
<template>
    <section  class="sch-container">
        <!-- <schedule-header v-if = "!is_weixin" class = 'schedule-header' title = "进度列表" @back="backPre"/> -->
        <section class = 'sch-content'>
            <header>
                <div class = 'mill-pic'>
                        <img class = 'mar-auto' :src = 'scheduleData.minerInfo && scheduleData.minerInfo.minerPhoto'/>
                </div>
                <div class = 'mill-detail'>
                    <p class = 'color0A0 font16 omit2'>{{scheduleData.minerInfo && scheduleData.minerInfo.minerName}}</p>
                    <p>
                        <span class = 'colorE56 font15'>原价¥{{scheduleData.minerInfo && scheduleData.minerInfo.minerPrice}}</span>
                        <span class = 'color545 font15'>剩余{{scheduleData.minerInfo && scheduleData.minerInfo.minerNumber}}台</span>
                    </p>
                </div>
            </header>
            <section class = 'content'>
                    <header v-if = "top3list != null">
                    <img class = 'top10' src = 'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/img/schedule/top10.png'/>
                    <div  class = 'top-rank'>
                        <div v-if = "top3list" class = 'ranks'  v-for = '(item,index) in top3list' :key = "index" >
                                <div class = 'avatar' :style="{background: 'url(' + item.robAvatar + ') no-repeat center/cover'}"></div>
                                <img  v-if = 'index === 1' class = 'first' src = 'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/img/schedule/crown.png'/>
                                <span class = 'avatar_index'>{{item.index}}</span>
                                <div class = 'user-name'>
                                    <span class = 'font13 omit1' v-if = "item.robName">{{item.robName.length > 6 ? item.robName.slice(0,6) + '...' : item.robName}}</span>
                                    <span class = 'font12 color5AA'>已蓄能{{item.assistAmount}}</span>
                                </div>
                        </div>
                    </div>
                    </header>
                    <ol class = 'rank-list no-border' >
                        <li v-if = "top10list != null" v-for = "(item,index) in top10list" :key = "index" >
                            <p>
                                <span class = 'font19' v-if = "top3list == null">{{index + 1}}</span>
                                <span class = 'font19' v-else>{{index + 4}}</span>
                                <span class = 'list-avatar' :style="{background: 'url(' + item.robAvatar + ') no-repeat center/cover'}">
                                    <!-- <img :src = 'item.robAvatar'/> -->
                                </span>
                                <span class = 'font14' v-if = "item.robName" >{{item.robName.length > 8 ? item.robName.slice(0,8) + '...' : item.robName}}</span>
                            </p>
                            <p class = 'font14 color5AA'>已蓄能{{item.assistAmount}}</p>
                        </li>
                    </ol>
            </section>
        </section>
    </section>

</template>
<script>
import C from '~/assets/js/common'
import ssr from '~/assets/js/ssr/schedule'
import scheduleHeader from '~/components/base/Header'
let Base64 = require('js-base64').Base64
export default {
    head: {
        title: '进度列表',
        meta: [
            { hid: 'keywords', name: 'keywords', content: '进度列表' },
            { hid: 'description', name: 'description', content: '进度列表' }
        ],
        script: [
          {src: '/views/common/callNativeSuccess.js'}
        ]
    },
    components:{
      scheduleHeader
    },
    data(){
        return {
            scheduleData:null, //进度列表接口数据
            top3list:null, //top3数据
            top10list:null, //top10数据
            is_weixin:false, //默认不是微信端
        }
    },
    //ssr获取的data信息，meger到data中
    async asyncData({req}){
        //获取url上的请求地址
        let url = C.host
        //获取矿机Id
        let miner_id = C.getUrlQuery("miner_id", req.url)
        //判断是否在微信端
        let is_weixin =  C.getUrlQuery("is_weixin",req.url) ? true : false;
        //获取token
        let token = C.getUrlQuery("token", req.url);
        //转换ip
        let ip = url
        //组装post数据
        let schdulePost = C.postDataRequest({'minerId':miner_id}, token)
        //发起请求
        let myPromises = [
            ssr.getSchduleList(schdulePost, token, {ip, url})
        ];
        if(!myPromises.length) return {};
        // ssr采用promise.all一次性获取所有的数据
        let [data] = await Promise.all(myPromises)
        .then((results) => {
        return results;
        }).catch((e)=>{
        });
        let scheduleList = []
        let top3list = null;
        let top10list = [];
        if(data.code == 10000){
          scheduleList = data.data;
          //处理后台头像数据
          scheduleList.topTenList.forEach(element => {
            //当不存在robAvatar 则用默认头像
            if (!element.robAvatar) {
              element = Object.assign(element, {
                robAvatar:
                  "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/photocopy23x.png"
              });
            }
            //判断是否为阿里云图片
            if (element.robAvatar.indexOf("http") == -1) {
              element = Object.assign(element, {
                robAvatar: C.imgUrl + element.robAvatar
              });
            }
            // scheduleList.topTenList.push(element);
          })
          let obj = [{}];
          
          //判断当toplength大于3的情况
          if(scheduleList.topTenList.length >= 3){
            //显示top3盒子
             obj[0] = scheduleList.topTenList[1];
             obj[1] = scheduleList.topTenList[0];
             obj[2] = scheduleList.topTenList[2];
             obj[0].index = 2;
             obj[1].index = 1;
             obj[2].index = 3;
             top3list = obj;
             //截取第4个到第10个数据
             top10list = scheduleList.topTenList.splice(3,10);
          }else{
            //隐藏top3盒子
            top3list = null;
            top10list = scheduleList.topTenList;
          }
        }
        return{
            //负值初始化数据
            scheduleData:scheduleList,
            top3list:top3list,
            top10list:top10list,
            is_weixin:is_weixin
        }
    },
    created(){
        
    },
    mounted(){
        window.loading.parentNode.removeChild(window.loading)//关闭loading
        const rankList = document.getElementsByClassName('rank-list')[0];
        //去掉当没有top3情况头条li的border
        rankList.className = this.top3list != null ? 'rank-list' : 'rank-list no-border';
        // //当微信端时 缩小 sch-content padding-top
        // const schContent = document.getElementsByClassName('sch-content')[0];
        // schContent.style.paddingTop = this.is_weixin ? '15px' : '55px';
    },
    methods:{
        backPre() {
            // 回到上一部
            C.callBack();
        }
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
        font-size:4.2vw;
    }
    .font15{
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
    .sch-container{
        img{
            display: inline-block;
        }
        background:#262762;
        min-height:100%;
        .sch-content{
           padding:15px 10px;    
        //    padding-top:55px;     
        }
        .m_header{
            height:40px;
            line-height: 40px;
            margin: 0px;
            position: absolute;
            z-index:200;
        }
        header{
            width:100%;
            height:39vw;
            background:#fff;
            border-radius: 5px;
            margin-bottom:15px;
            display: flex;
            flex-direction: row;
            .mill-pic{
                width:24vw;
                height:24vw;
                margin-top:7.5vw;
                overflow: hidden;
                position: relative;
                margin-left: 6vw;
                margin-right: 6vw;
                border-radius: 4px;
                img{
                    width:100%;
                }
            }
            .mill-detail{
                display: flex;
                width:58vw;
                height:24vw;
                margin-top:7.5vw;
                flex-direction: column;
                justify-content: space-between;
                p:nth-child(1){
                    font-weight: bold;
                }
                p:nth-child(2){
                    span:nth-child(2){
                        margin-left:13.5vw;
                    }
                }
            }

        }
        .content{
            width:100%;
            padding-bottom:5vw;
            background:#ECF4FD;
            border-radius: 5px;
            header{
                display: flex;
                flex-direction: column;
                background:#ECF4FD;
                height:56vw;
                margin-bottom:0px;
            }
            .top10{
                display: inline-block;
                width:50vw;
                height:12.5vw;
                margin:0 auto;
                margin-top: 13px;
                margin-bottom: 8vw;
            }
            .top-rank{
                display: flex;
                flex-direction: row;
                justify-content: center;
                .ranks{
                    text-align: center;
                    height:15vw;
                    position: relative;
                    .first{
                        position: absolute;
                        width:9vw;
                        height:8.8vw;
                        top:-5.5vw;
                        left:2vw;
                    }
                }
                .avatar{
                    border-radius: 50%;
                    border:3px solid #f09872;
                    width:15vw;
                    height:15vw;
                    position: relative;
                    margin: 0 auto;
                    text-align: left;
                    background:#fff;
                    overflow: hidden;
                    img{
                        width:100%;
                        // border-radius: 50%;
                        position:absolute;
                        top:0;
                        bottom:0;
                        margin:auto;
                    }
                }
                .avatar_index{
                        position: absolute;
                        display: inline-block;
                        width:4.2vw;
                        height:4.2vw;
                        background:#fff;
                        border-radius: 50%;
                        border:2px solid #f09872;
                        z-index: 100;
                        bottom: -1.6vw;
                        left: 0px;
                        right: 0px;
                        margin: auto;
                        text-align: center;
                        box-sizing: content-box;
                        font-size: 3.4vw;
                        line-height:4.5vw;
                        padding-left: 1px!important;
                }
                .ranks:nth-child(2){
                    margin:0 5vw;
                    .avatar{
                        width:17vw;
                        height:17vw;
                        border-color: #f5cc1a;
                        margin-top: -2vw;
                        span{
                            border-color: #f5cc1a;
                        }
                    }
                } 
                .user-name{
                    display: flex;
                    flex-direction: column;
                    span:nth-child(1){
                        margin:2.9vw 0px 2.4vw 0px;
                    }
                    .omit1{
                        display: inline-block;
                        width:25.5vw;
                    }
                }
            }
            .rank-list{
                width:100%;
                padding:0px 10px;
                li{
                    width:100%;
                    height:20vw;
                    line-height: 20vw;
                    border-top:1px dashed #c1ccda;
                    list-style: none;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    p:nth-child(1){
                        display: flex;
                        flex-direction: row;
                        .list-avatar{
                            width:11vw;
                            height:11vw;
                            margin:5vw 11px 0px 13px;
                            overflow: hidden;
                            border-radius: 50%;
                            position: relative;
                            background:#fff;
                            img{
                                width:100%;
                                position: absolute;
                                top:0;
                                bottom:0;
                                margin:auto;
                            }
                        }
                        span:nth-child(1){
                            margin-left:26px;
                        }
                    }
                    p:last-child{
                            margin-right:18px;
                    }
                }
            }
            .no-border{
                li:nth-child(1){
                    border:0px;
                }
            }
        }
    }
</style>
