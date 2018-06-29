<template>
  <div>
    <div class = 'type'>
      <div class = 'tvType'>
          <!-- 钛值盒子 -->
          <div class = 'tv' >
                      <div class = 't'>
                        <div class = 'l' >
                          <span class = 'font18'>钛值</span>
                          <span class = 'balance font12 colorfff'>可用余额</span>
                          <span class = 'sum colorfff'  v-if = "tvPersonalData.balance != undefined">{{tvPersonalData.balance}}<span class = 'colorfff font14'>TV</span></span>
                        </div>
                      </div>
                      <div class = 'b'>
                        <div class = 'b-type'>
                           <span class = 'font12'>冻结</span>
                          <span class = 'font18'>{{tvPersonalData.frozenBalance}}</span>
                        </div>
                        <div class = 'b-type'>
                          <span class = 'font12'>今日收入</span>
                          <span class = 'font18'>{{tvPersonalData.TodayIncome}}</span>
                        </div>
                        <div class = 'b-type'>
                          <span class = 'font12 last'>累计收入</span>
                          <span class = 'font18'>{{tvPersonalData.Income}}</span>
                        </div>
                        <div>
                          <span class = 'font12'>冻结</span>
                          <span class = 'colorfff'>|</span>
                          <span class = 'font12'>今日收入</span>
                          <span class = 'colorfff'>|</span>
                          <span class = 'font12'>累计收入</span>
                        </div>
                        <div class = 'amount'>
                          <span class = 'font18'>{{tvPersonalData.frozenBalance}}</span>
                          <span class = 'font18'>{{tvPersonalData.TodayIncome}}</span>
                          <span class = 'font18'>{{tvPersonalData.Income}}</span>
                        </div>
                      </div>
          </div>
          <!-- 钛值盒子 -->
          <!-- 氪金盒子 -->
          <div class = 'txb' v-if = "kgBlock">
                    <div class = 't'>
                      <div class = 'l'>
                        <span class = 'font18'>氪金</span>
                        <span class = 'balance font12 colorfff'>可用余额</span>
                        <span class = 'sum colorfff' >{{tvPersonalData.balance}}<span class = 'font14'>KG</span></span>
                      </div>
                    </div>
                    <div class = 'b'>
                        <div class = 'b-type'>
                           <span class = 'font12'>冻结</span>
                          <span class = 'font18'>{{tvPersonalData.frozenBalance}}</span>
                        </div>
                        <div class = 'b-type'>
                          <span class = 'font12'>今日收入</span>
                          <span class = 'font18'>{{tvPersonalData.TodayIncome}}</span>
                        </div>
                        <div class = 'b-type'>
                          <span class = 'font12 last '>累计收入</span>
                          <span class = 'font18'>{{tvPersonalData.Income}}</span>
                        </div>
                        <div>
                          <span class = 'font12'>冻结</span>
                          <span class = 'color9B7F54'>|</span>
                          <span class = 'font12'>今日收入</span>
                          <span class = 'color9B7F54'>|</span>
                          <span class = 'font12'>累计收入</span>
                        </div>
                        <div class = 'amount'>
                          <span class = 'font18'>{{tvPersonalData.frozenBalance}}</span>
                          <span class = 'font18'>{{tvPersonalData.TodayIncome}}</span>
                          <span class = 'font18'>{{tvPersonalData.Income}}</span>
                        </div>
                   </div>
          </div>
          <!-- 氪金盒子 -->
           <div class = 'select'>
                    <van-collapse v-model="activeNames">
                             <van-collapse-item :title="awardType" name="1">
                                 <div class = 'options'>
                                       <span @click = "closeCollapse($event,'normalType')" class = 'acitveType normalType'>全部</span>
                                       <span @click = "closeCollapse($event,'normalType')" class = 'normalType' v-for="(item, index) in typeList" :key="index">{{item.label}}</span>
                                 </div>
                             </van-collapse-item>
                    </van-collapse> 
                    <img @click ="showHandle" src = "~/assets/img/calender.png"/>
           </div>
                <!-- 币种奖励类别 -->
                <!-- 流水列表开始 -->
                <div v-if = '!noDataShow'>
                      <!-- 加载更多列表 开始 -->
                                <van-list
                                        v-model="loading"
                                        :finished="finished"
                                        @load="onLoad"
                                        :offset = '100'
                                        :immediate-check = 'false'
                                        id ="vanList"
                                >
                                        <van-cell class = 'list' v-for = '(item,key) in tvData' :key = 'key'>
                                            <span class = 'today' v-if = 'item.isToday'>今天</span>
                                            <span class = 'listDate' ><span class = 'font18' v-if ="item.day != undefined">{{item.day[0] == 0 ? item.day[1] : item.day}}</span><span style = "margin-left:5px" class = 'font12' v-if ="item.mouth != undefined">{{item.mouth[0] == 0 ? item.mouth[1] : item.mouth}}月</span></span>
                                              <div class = 'dt'>
                                                 <span class = 'dot'></span>
                                                 <span class = 'line'></span>
                                              </div>
                                              <div class = 'details'>
                                                 <div v-for = "(sub,key) in item.data" :key = "key"> 
                                                  <div  @click = 'toDetails(sub)'>
                                                        <div class = 'detail' >
                                                         
                                                            <div class = 't'>
                                                              <span class = 'font14'>{{sub.typeName}}</span>
                                                              <span class = 'font12'>{{sub.flowDate.slice(11,16)}}</span>
                                                            </div>
                                                            <div class = 'font18' v-if = "sub.freezeAmount==0">{{sub.amount >= 0 ? '+' + sub.amount :  sub.amount}}</div>   
                                                             <div class = 'font18' v-if = "sub.freezeAmount != 0">{{sub.freezeAmount}}</div>
                                                            <div class = 'frozen' v-if = "sub.freezeAmount > 0">冻结中</div>
                                                            <div class = 'frozen' v-if = "sub.freezeAmount < 0">扣除冻结余额</div>
                                                            
                                                        </div>
                                                  </div>
                                                </div>
                                              </div>    
                                        </van-cell>
                                </van-list> 
                      <!-- 加载更多列表 结束 -->
                </div>
                <!-- 流水列表 结束 -->
                <!-- 没有数据展位图 -->
                <!-- v-if = "noDataShow" -->
                <div class = 'layoutImg' v-if = "noDataShow">
                                    <img style = "margin:auto" src = "~/assets/img/Group2.png"/>
                                    <span>当前还没有记录</span>
                </div>                   
                  <!-- 时间选择操作框开始 -->
                  <div class = 'chooseDate' v-if = "dateShow">
                          <div class ='toolbar'>
                            <span @click ="cancel">取消</span>
                            <span @click = "confirmDate">确定</span>
                          </div>
                          <div class = 'choosed'>
                            <div id = 'start' @click = "startShowHandle" class = 'active normal'>{{pickerStartTime}}</div>
                            <span class = 'dateLine'>—</span>
                            <div id = 'end' @click = "endShowHandle" class = 'normal'>{{pickerEndTime}}</div>
                            <img @click = 'clearTime' src = "~/assets/img/Page1.png"/>
                          </div>
                          <!-- 时间选择操作框结束 -->
                            <!-- 时间选择组件 -->
                          <van-datetime-picker
                            v-if ="startShow"
                            v-model="currentDate"
                            type="date"
                            :min-date="minDate"
                            :max-date = "maxDate"
                            @change = "startPickerHandle"
                            class = 'startPicker'
                          /> 
                          <van-datetime-picker
                            v-if = "endShow"
                            v-model="currentDate"
                            type="date"
                            :min-date="endminDate"
                            :max-date = "maxDate"
                            class = 'startPicker'
                            @change = "endPickerHandle"
                          /> 
                          <!-- 时间选择组件 -->
                  </div>
                  <!-- v-if = "maskShow" -->
                  <div class = 'mask' v-if = "maskShow" @click ='cancelDetaiModal'></div>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ssr from '~/assets/js/ssr/wealth'
import csr from '~/assets/js/csr/wealth'
import C from '~/assets/js/common'
import {Collapse, CollapseItem, DatetimePicker,List,Cell} from 'vant';
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(DatetimePicker);
Vue.use(List);
Vue.use(Cell);
let Base64 = require("js-base64").Base64;
export default {
  //head标签信息
  head: {
    title: '我的财富',
    meta: [
      { hid: 'keywords', name: 'keywords', content: '我的财富' },
      { hid: 'description', name: 'description', content: '我的财富' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=0' },
    ],
    script: [
       {src: '/views/common/callNativeSuccess.js'}
    ]
  },
  data(){
    return {
      maskShow:false,
      activeNames: ['0'],
      activeNames2: ['0'],
      dateShow:false,
      minDate: new Date(2018,0,11),
      maxDate: new Date(),
      currentDate: new Date(),
      startShow:false,
      endShow:false,
      startTime:'',
      startTime2:'',
      endTime:'',
      endTime2:'',
      pickerStartTime:'开始时间',
      pickerStartTime2:'开始时间',
      pickerEndTime:'结束时间',
      pickerEndTime2:'结束时间',
      endminDate:new Date(2018,0,11),
      endMaxDate:new Date(2018, 8, 1),
      ip:'',
      token:'123123123_c3988f5de47a4b2895aa8104fa2e0823',
      url:'',
      tvData:[{}],
      moreData:[{}],
      awardType:'全部',
      awardType2:'全部',
      scrollLeft:'0',
      listShow:false,
      coinType:'1',
      awardId:'0',
      awardId2:'0',
      tvPersonalData:{},
      txbPersonalData:{},
      loading: false,
      finished: false,
      currentPage:1,
      totalPage:1,
      noDataShow:false,
      active:1,
      startPos:{},
      endPos:{},
      tvShow:true,
      picker:{},
      pickerEnd:{},

      mescroll: null,
      pdlist: [],
      expand:true,
      data: {},

      curNavIndex:0,//钛值0; 氪金1; 

      tvBlock:false,
      kgBlock:false,
      detailsData:[{}],
      modalVisible:false,
      api_url:'',
      typeList: [{
        value: 1,
        label: '奖励'
      },{
        value: 2,
        label: '打赏'
      },{
        value: 3,
        label: '转入'
      },{
        value: 4,
        label: '转出'
      },{
        value: 5,
        label: '进贡'
      }],
    }
  },
  //ssr获取的data信息，meger到data中
  async asyncData({req}){
    const coinList = {
          "type":1
    };
    const personalList = {
      "coinType":1
    };
    let url = C.getUrlQuery("api_url", req.url)
    let token = C.getUrlQuery("token", req.url);
    let coinType = C.getUrlQuery("tab", req.url);
    let ip = Base64.decode(url.replace("?", ""));
    let coinPost = C.postDataRequest(coinList, token)
    let personalPost = C.postDataRequest(personalList, token)
    let myPromises = [
      ssr.getInitCoinInfo(coinPost, token, {ip, url}),
      ssr.getInitPersonalInfo(personalPost, token, {ip, url})
    ];
    if(!myPromises.length) return {};
    //ssr采用promise.all一次性获取所有的数据
    let [data1, data2] = await Promise.all(myPromises)
    .then((results) => {
      return results;
    }).catch((e)=>{
      console.log(e);
    });
    let coinData = C.getDest(data1.data.data);
    let personalData = data2.data;
    let currentPage = data1.data.currentPage;
    let totalPage = data1.data.totalPage;
    return{
      tvData:coinData,
      tvPersonalData:personalData,
      token:token,
      ip:ip,
      url:url,
      currentPage:currentPage,
      totalPage:totalPage,
      coinType:coinType
    }
  },
  beforeCreate(){
  },
  components: {
  },
  methods:{
    getCoinInfo(list){
      const that = this;
        Promise.resolve(csr.getCoinInfo(list, this.token, {ip: this.ip, url: this.url}))
        .then(data => {
          if(data.code == 10000){
             data=data.data;
             that.currentPage = data.currentPage;
             that.totalPage = data.totalPage;
             const res = data.data;
             if(res.length == 0){
              that.noDataShow = true;
              return
             }
             that.noDataShow = false;
             that.tvData = C.getDest(res)
          }
          console.log('data',data)
        }).catch((data)=>{
          
        });
    },
    clearTime(){
        this.pickerStartTime = '开始时间';
        this.pickerStartTime2 = '开始时间';
        this.pickerEndTime = '结束时间';
        this.pickerEndTime2 = '结束时间';
        this.startTime = '';
        this.startTime2 = '';
        this.endTime = '';
        this.endTime2 = '';
        this.picker = {};
        this.pickerEnd = {};
    },
    endShowHandle(e){
        this.endShow = true;
        this.startShow = false;

        const normal = document.getElementsByClassName('normal');
        const target = e.target;
        for(var i =0;i < normal.length;i++){
          normal[i].className = 'normal'
        } 
        target.className = 'active normal'
    },
    startShowHandle(e){
        this.endShow = false;
        this.startShow = true;
        const normal = document.getElementsByClassName('normal');
        const target = e.target;
        for(var i =0;i < normal.length;i++){
          normal[i].className = 'normal'
        }

        target.className = 'active normal'
    },
    cancelDetaiModal(){
      this.modalVisible = false;
      this.maskShow = false;
      this.cancel()
    },
    startPickerHandle(picker){
            this.picker.year = parseInt(this.currentDate.getFullYear());
            this.picker.mouth = parseInt(parseInt(this.currentDate.getMonth()) + 1);
            this.picker.day = parseInt(this.currentDate.getDate());
            this.endminDate =  new Date(this.picker.year,parseInt(this.picker.mouth) - 1,this.picker.day)
            this.pickerStartTime = this.picker.year + '-' + this.picker.mouth + '-' + this.picker.day;
    },
    endPickerHandle(picker){
            this.pickerEnd.year = parseInt(this.currentDate.getFullYear());
            this.pickerEnd.mouth = parseInt(parseInt(this.currentDate.getMonth()) + 1);
            this.pickerEnd.day = parseInt(this.currentDate.getDate());
            this.pickerEndTime = this.pickerEnd.year + '-' + this.pickerEnd.mouth + '-' + this.pickerEnd.day;
    },
    confirmDate(){
       this.cancel();
        if(this.picker.year != undefined){
           this.startTime = this.picker.year + '-' + this.picker.mouth + '-' + this.picker.day;
        }else{
           this.startTime ='';
        }
        if(this.pickerEnd.year != undefined){
              this.endTime = this.pickerEnd.year + '-' + this.pickerEnd.mouth + '-' + this.pickerEnd.day;
        }else{
              this.endTime = ''
        }
    },
    cancel(){
        this.dateShow = false;
        this.maskShow = false;
        this.endShow = false;
        this.startShow = false;      
    },
    showHandle(){
        this.dateShow = true;
        this.startShow = true;
        this.maskShow = true;
    },
    onLoad(){
      const that = this;
      if(this.totalPage <= this.currentPage){
         that.loading = false; 
         that.finished = false;
        return
      }
      this.currentPage += 1;
      const list = C.postDataRequest({
          'type':this.coinType,
          'currentPage':this.currentPage,
          'classify':this.awardId,
          'startDate':this.startTime,
          'endDate':this.endTime
      },this.token)
      Promise.resolve(csr.getCoinInfo(list, this.token, {ip: this.ip, url: this.url}))
        .then(data => {
          if(data.code == 10000){
             data=data.data;
             that.currentPage = data.currentPage;
             that.totalPage = data.totalPage;
             const res = data.data;
             const dest = C.getDest(res)
            if(dest[0].flowDate.slice(0,10) == that.tvData[that.tvData.length-1].flowDate.slice(0,10)){
                that.tvData[that.tvData.length-1].data = that.tvData[that.tvData.length-1].data.concat(dest[0].data)
                that.tvData =that.tvData.concat(dest.slice(1))
            }else{
                that.tvData =that.tvData.concat(dest)
            }
            that.loading = false; 
            that.finished = false;
            that.listShow = true;
            that.cancel();
          }
          console.log('tvData',tvData)
        }).catch((data)=>{
          
      });
    },
    closeCollapse(e,normalClass){
        const normalType = document.getElementsByClassName(normalClass);
        const val = e.target.innerHTML;
        const target = e.target;
        
        for(var i = 0,l=normalType.length;i<l;i++){
          normalType[i].className = normalClass
        } 
        target.className = 'acitveType ' + normalClass;
          this.awardType = val;
          this.activeNames = ['0'];
            switch(val){
              case '全部':
              this.awardId = 0;
              break;          
              case '奖励':
              this.awardId = 1;
              break;         
               case '打赏':
              this.awardId = 2;
              break;          
              case '转入':
              this.awardId = 3;
              break;         
              case '转出':
              this.awardId = 4;
              break;          
              case '进贡':
              this.awardId = 5;
              break;
            }
        const list = C.postDataRequest({
          'type':this.coinType,
          'currentPage':'1',
          'classify':this.awardId,
          'startDate':this.startTime,
          'endDate':this.endTime
        },this.token)
        this.InitStatus()
        this.getCoinInfo(list)
      },
      getDest(data){
         var mydate = new Date();
          var map = {},
              dest = [];
          for(var i = 0; i < data.length; i++){
              var ai = data[i];
              if(!map[ai.flowDate.slice(0,10)]){
                  dest.push({
                      id: ai.accountFlowId,
                      flowDate: ai.flowDate,
                      data: [ai]
                  });
                  map[ai.flowDate.slice(0,10)] = ai;
              }else{
                  for(var j = 0; j < dest.length; j++){
                      var dj = dest[j];
                      if(dj.flowDate.slice(0,10) == ai.flowDate.slice(0,10)){
                        dj.data.push(ai);
                        break;
                      }
                  }
              }
          }
          for(var i in dest){
              dest[i].mouth = dest[i].flowDate.slice(5,7);
              dest[i].day = dest[i].flowDate.slice(8,10);
              if(parseInt(mydate.getMonth()+ 1) == dest[i].mouth && parseInt(mydate.getDate()) == dest[i].day){
                dest[i].isToday = true;
              }else{
                dest[i].isToday = false;
              }
          }
        return dest
        },
        InitStatus(){
            this.currentPage = 1;
            this.finished = false;
            this.moreData = [{}]   
        },
  },
}
</script>

<style scoped>
  .detailModal{
    position: fixed;
    z-index:999;
    background:#fff;
    border-radius: 4px;
    width:300px;
    height:240px;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    margin: auto;

  }
  .cancelBtn{
    display: inline-block;
    width:100px;
    height:35px;
    line-height: 35px;
    background:rgba(24,134,250,1);
    color:#fff;
    border-radius: 4px;
    text-align: center;
    margin-left:100px;
  }
  .pdlf15{
    padding:0px 15px;
    margin:15px 0px;
    display: flex;
    flex-direction: row;
  }
  .pdlf15 span:nth-child(1){
      display: inline-block;
      width:50px;
  }
  .num{
    border-bottom:1px solid #ccc;
    padding-bottom:15px;
  }
  .detailAmount{
    font-size:18px;
    line-height: 18px;
    color:#333;
    font-weight: bold;
  }
  .marginl15{
    max-width: 300px;
  }
  .frozen{
    position: absolute;
    font-size: 12px;
    color: #f00;
    right: 5px;
    bottom: 3px;
    font-family: "PingFangSC","Source Han Sans","Arial","Microsoft JhengHei","Microsoft YaHei";
  }
  .normalType{
    border:1px solid;
    border-color: transparent;
  }
  .acitveType{
    border:1px solid #1886FA;
    color:#1886FA;
  }
  .listDate,.today{
    display: inline-block;
    width:70px;
    text-align: left;
    font-family: "PingFangSC","Source Han Sans","Arial","Microsoft JhengHei","Microsoft YaHei";
  }
  .listDate .font18{
    font-weight: bold;
    color:#333;
  }
  .listDate .font12{
    color:#666;
    font-family: "PingFangSC","Source Han Sans","Arial","Microsoft JhengHei","Microsoft YaHei";
  }
  .details{
    display: flex;
    flex-direction: column;
  }
  .details a{
    color:#333;
  }
  .dateLine{
    margin: 10px;
    font-weight: bold;
    color: #333;
  }
  .mask{
    position: fixed;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.5);
    top:0px;
  }
  .chooseDate{
    background: transparent;
    position: fixed;
    width: 100%;
    z-index: 300;
    bottom: 0px;
  }
  .toolbar{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
        height: 44px;
    line-height: 44px;
    /*padding: 0px 20px;*/
    width:100%;
    background: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .toolbar span{
    margin:0px 20px;
  } 
  .toolbar span:nth-child(2){
    color:#1886FA;
  }
  .choosed{
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding:10px 0px;
    background:#f4f4f4;
  }
  .choosed img{
    display: inline-block;
    width:19px;
    height:22px;
    margin-top: 12px;
    margin-left: 20px;
  }
  .choosed div{
    width:130px;
    height:42px;
    line-height: 42px;
    background: #fff;
    border-radius: 5px;
    text-align: center;
    border:1px solid #fff;
  }
  .choosed .active{
    border:1px solid #1886FA; 
    color:#1886FA;
  }
  .list{
    display: flex;
    flex-direction: row;
    padding:5px 12px;
        font-family: "PingFangSC-Light","黑体";
  }
  .dt{
    position: relative;
    width: 14px;
    margin-left: 0px;
    margin-right: 10px;
    margin-top: 3px;
  }
  .dot{
    display: inline-block;
    width:14px;
    height:14px; 
    background:rgba(24,134,250,1);
    border-radius: 50%;
    position: absolute;
    z-index:100;
  }
  .line{
    width:1px;
    height:100%; 
    background:rgba(229,229,229,1);
    position: absolute;
    left:6px;
    top:13px;
  }
  .list:last-child .line{
    display: none;
  }
  .detail{
    position: relative;
    width:266px;
    height:30px;
    padding:10px;
    background:#f5f5f5;
    border-radius: 10px;
    margin-bottom:5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .detail .t{
    display: flex;
    flex-direction: column;
  }
  .detail .t .font12{
    margin-top:9px;
  }
  .detail .font18{
    font-weight: bold;
  }
  .top{
    display: block;
    width:100%;
    overflow:scroll;
    background:#F5F5F5;
    font-family: "微乳雅黑";
  }
  .scroll{
    width:100%;
    margin:15px 0px;
    display: block;
  }
  .tv,.txb{
    width:100%;
    height:198px;
    display:block;
    font-family: "PingFangSC","Source Han Sans","Arial","Microsoft JhengHei","Microsoft YaHei";
    /*padding:0px 45px;*/
  }
  .tv{
    /*background:url('../../../assets/img/tv.png') no-repeat;*/
    background:url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/tv.png') no-repeat;
    /*margin-right:15px;*/
    background-position:right;
        background-size:cover;
    /*margin-right:-18px;*/
  }
  .txb{
    background:url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/18042001/kg.png') no-repeat;
        background-size:cover;
    background-position: left;
  }
   .t{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top:0px;
  }
   .l{
    display: flex;
    flex-direction: column;
    margin-left: 50px;
    margin-top: 6px;
    margin-bottom: 0px;
  }
   .r img{
    margin-right: 45px;
    margin-top: 30px;
  }
  .l .font18{
    color:#fff;
  }
  .balance{
    margin:15px 0px 5px 0px;
  }
   .b{
    display: flex;
    flex-direction: row;
    margin-top:4px;
    justify-content: center;
  }
  .b-type{
    display: flex;
    flex-direction: column;
    /*justify-content: center;*/
    width:88px;
    color:#fff;
    margin-right:14px;
  }
  .b-type:last-child{
    margin-right:0px;
  }
  .b-type span{
    display: inline-block;
    width:100%;
  }
  .b-type .font12{
    border-right: 2px solid #fff;
    width: 100%;
    /*text-align: center;*/
    /*padding: 0px 10px;*/
    margin: 7px 0px;
  }
  .b-type .border9B{
    border-color:#9B7F54;
  }
  .b-type .font18{
    word-wrap: break-word;
    line-height: 18px;
    font-size:16px;
    height:53px;
    overflow:hidden;
  }
  .b-type .last{
    border:0px;
  }
/*   .b div{
  display: flex;
  flex-direction: row;
  justify-content: center;
} */
  .b .amount{
    justify-content:center;
  }
  .amount{
    margin-top:6px;
  }
  .amount span{
    line-height: 25px;
    color:#fff;
    display: inline-block;
    margin:0px 28px;
  }
  .sum{
    font-size:36px;
    font-family: bold;
    line-height: 36px;
  }
  .font12{
    font-size:12px;
    line-height: 14px;
  }
  .font14{
    font-size:14px;
    line-height: 14px;
    font-family: "PingFangSC","Source Han Sans","Arial","Microsoft JhengHei","Microsoft YaHei";
  }
  .font18{
    font-size:18px;
    line-height: 14px;
    font-family: "PingFangSC","Source Han Sans","Arial","Microsoft JhengHei","Microsoft YaHei";
  }
/*   .b .font12{
  display: inline-block;
  width:100px;
  text-align: center;
  color:#fff;
  line-height: 21px;
} */
  .color9B7F54{
    color:#9B7F54;
  }
  .colorfff{
    color:#fff;
  }
  .options span{
      display: inline-block;
      padding:6px 24px;
      background:#f5f5f5;
      border-radius: 16px;
      margin-right:8px;
      margin-bottom:15px;
      font-size:14px;
      font-family: "PingFangSC","Source Han Sans","Arial","Microsoft JhengHei","Microsoft YaHei";
  }
  .options span:nth-child(4){
    margin-right:0px;
  }
  .select{
    position: relative;
    border-bottom:1px solid;
    border-color: #e5e5e5;
    margin-bottom:20px;
        font-family: "PingFangSC-Light","黑体";
  }
  .select img{
    position: absolute;
    right:22px;
    top:12px;
    width:16px;

  }
  .layoutImg{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom:50px;
  }
  .layoutImg img{
    display: inline-block;
    width:141px;
    margin-bottom: 18px!important;
  }
  .layoutImg span{
    color:#999;
    font-size:14px;
    text-align: center;
  }

 




  @media only screen and (min-width:411px){
      .tv,.txb{
        height:228px;
      }
            .l{
            margin-left: 55px!important;
            margin-top: 14px;
      }
      .b{
        margin-top:17px;
      }
      .b-type .font18{
        height:38px;
      }
  }  
  @media only screen and (max-width:411px){
      .l{
            margin-left: 40px;
            margin-top: 14px;
      }
  }
    @media only screen and (max-width:375px){
      .options span{
        margin-right:1px;
      }
      .l{
            margin-left: 40px;
            margin-top: 14px;
      }
      .b{
        margin-top:7px;
      }
      .b-type .font18{
        height:35px;
      }
      .detail{
        width:227px;
      }
      .tv,.txb{
        height:205px;
      }
  } 
    @media only screen and (max-width:360px){
      .tv,.txb{
        height:197px;
      }
      .options span{
        margin-right:1px;
      }
      .b-type{
        width:81px;
      }
      .detail{
        width:213px;
      }
  }
  @media only screen and (max-width:320px){
      .tv,.txb{
        height:174px;
      }
      .detail{
        width:214px;
      }
      .scroll{
        margin:0px;
      }
      .l{
            margin-left: 40px;
            margin-top: 6px;
      }
      .r img{
        margin-right: 40px;
        margin-top: 40px;
      }
      .t{
        margin-top:0px;
      }
      .b-type{
        width:65px;
      }
      .b{
        margin-top:0px!important;
      }
      .b-type .font12{
        margin-bottom:3px;
      }
      .l{
          margin-left: 45px!important;
          margin-top: 5px!important;
      }
      .sum{
        font-size:32px;
      }
      .b-type .font18{
        height:37px;
      }
     .detail{
        width:173px;
      }
  }


</style>
<style type="text/css">
  .mescroll{
    background:#fff;
  }
  .van-cell{
    width:20%;
          font-family: "PingFangSC","Source Han Sans","Arial","Microsoft JhengHei","Microsoft YaHei";
  }
  #vanList .van-cell{
    width:100%;
          font-family: "PingFangSC","Source Han Sans","Arial","Microsoft JhengHei","Microsoft YaHei";
  }
  #vanList .van-cell__value{
    display: flex;
  }
   [class*=van-hairline]::after{
        border: 0px;
  }
  .startPicker [class*=van-hairline]::after{
        border-top: 1px solid #999;
        border-bottom: 1px solid #999;
  }

  .van-picker__toolbar{
    display: none;
  }
  .van-picker{
    background: #f2f2f2;
  }


        .header{
        z-index: 9990;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        line-height: 16px;
        padding-top: 0px;
        text-align: left;
        background-color: white;
      }
      .header .btn-left{
        position: absolute;
        top: 0;
        left: 0;
        padding:12px;
      }
      .header .btn-right{
        position: absolute;
        top: 0;
        right: 0;
        padding:12px 8px;
      }
      .header .tip{
        margin-top: 4px;
        font-size: 12px;
        color: gray;
      }
      /*菜单*/
      .header .nav{
        margin-top: 8px;
        border-bottom: 1px solid #ddd;
      }
      .header .nav p{
        display: inline-block;
        width: 10%;
        padding: 5px 0;
        margin:0px 5px;
        text-align: center;
      }
      .header .nav .active{
        border-bottom: 2px solid #1D87FF;
        color: #1D87FF;
      }
      /*列表*/
      .swiper-container{
        position: fixed;
        top: 36px;
        left: 0;
        right: 0;
        bottom: 0;
      }
      /*展示上拉加载的数据列表*/
      .data-list li{
        position: relative;
        padding: 10px 8px 10px 120px;
        border-bottom: 1px solid #eee;
      }
      .data-list .pd-img{
        position: absolute;
        left: 18px;
        top: 18px;
        width: 80px;
        height: 80px;
      }
      .data-list .pd-name{
        font-size: 16px;
        line-height: 20px;
        height: 40px;
        overflow: hidden;
      }
      .data-list .pd-price{
        margin-top: 8px;
        color: red;
      }
      .data-list .pd-sold{
        font-size: 12px;
        margin-top: 8px;
        color: gray;
      }
      /*隐藏*/
      .hide{display: none;}
  @media only screen and (max-width:360px){
      .van-cell{
        width:25%;
      }

  }
</style>

<!-- 动画 -->
<style>
   .chooseDate
        {
            width:100px;
            height:328px;
            background:red;
            position:absolute;
            animation:myfirst 1s;
            -webkit-animation:myfirst 1s;
            animation-fill-mode: forwards;
        }
        @-webkit-keyframes myfirst /* Safari and Chrome */
        {
            0%   {height:0px;}
            100% {height:328px;}
        }
</style>

