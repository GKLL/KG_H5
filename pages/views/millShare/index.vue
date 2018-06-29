/**
 *  @description: 微信打开抢单详情页面
 *  @author: zhangchenle
 *  @date: 2018.5.18
 */
<template>
  <div id="app">
    <!-- 查看规则弹窗组件 -->
    <rule v-if="showActivityRule" @close='changeActivityRule'></rule>
    <assistance v-if="showAssistance" @close='changeAssistance' :assistCode='robDetail.assistCode'></assistance>
    <!-- 抢单详情主布局组件 -->
		<order-detail @open='changeActivityRule' @openTop10='openTop10' :param='robDetail'>
      <!-- 进度条插槽 -->
      <div v-if="!isActivityEnd && !isPurchaseEnd" class="progress-box" slot="progress">
      	<!-- 进度条组件 -->
      	<detail-progress :current="''+robDetail.assistAmount" :total="''+robDetail.minerPrice"></detail-progress>
      	<div class="progress-text">{{getProgressText}}</div>	
      </div>
      <!-- 按钮插槽 -->
    	<div slot="buttons" class="buttons">
        <div class="tip" :class="{'font-blue': isActivityEnd || isPurchaseEnd}">{{getTipText}}</div>
    		<div class="button-groups">
    			<div v-if="!!robDetail.minerLink" class="btn btn-left" :class="{'bg-yellow': isActivityEnd}" @click="buyMill">{{getLeftButtonText}}</div>
					<div v-if="!isActivityEnd" class="btn btn-right"  @click="assistance">{{getRightButtonText}}</div>
    		</div>
    	</div>
    	<!-- 倒计时组件插槽 -->
    	<div v-if="!isActivityEnd && !isPurchaseEnd" class="count-down" slot="countdown">
    		还剩<count-down :currentTime="robDetail.remainTime"></count-down>结束，还剩{{robDetail.minerNumber}}台，抓紧时间
    	</div>
      <!-- 助力榜单插槽 -->
    	<div slot="assistance" class="list">
        <ul>
          <li v-for="(item, index) in assistList" :key="'assist' + index">
            <img :src="assistAvatarFilter(item.assistAvatar)">
            <span>{{item.assistName}}</span>
            <span class="current">{{'蓄能' + item.assistAmount}}</span>
          </li>
          <div v-if="loadedAll" class="loadmore">
	          <span @click="loadmore">查看更多>></span>
	        </div>
        </ul>
      </div>
		</order-detail>
  </div>
</template>

<script>
import Vue from 'vue'
import OrderDetail from '~/components/detail/OrderDetail.vue'
import Assistance from '~/components/detail/Assistance.vue'
import Rule from '~/components/base/Rule.vue'
import DetailProgress from '~/components/base/Progress.vue'
import CountDown from '~/components/base/CountDown.vue'
import Common from '~/assets/js/common'
import ssr from '~/assets/js/ssr/detail'

export default {
  head: {
    title: '抢单详情',
    meta: [
      { hid: 'keywords', name: 'keywords', content: '抢单详情' },
      { hid: 'description', name: 'description', content: '抢单详情' }
    ],
    script: [
      {src: '/views/common/callNativeSuccess.js'}
    ]
  },
  components: {
  	OrderDetail,
  	Rule,
  	DetailProgress,
  	CountDown,
  	Assistance
  },
  data() {
    return {
    	title: '抢单详情',
    	defaultUrl: 'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/photocopy23x.png',
    	imgUrl: Common.imgUrl,//图片存放地址前缀
    	//抢单详情信息
    	robDetail: {
	    	minerJoinFrequency: 0,//矿机的参与人数
	    	assistAmount: 0,//已经蓄能的总量
	    	minerLink: '',//矿机购买链接（可能为空）
	    	robId: '',//抢单Id
	    	robName: '',//抢单人昵称
	    	minerName: '',//矿机名称
	    	minerId: '',//矿机ID
	    	minerNumber: '',//矿机剩余数量
	    	remainTime: '',//离活动结束还剩余的毫秒数
	    	assistCode: '',//助力码
	    	minerPhoto: '',//矿机图片
	    	minerPrice: 0,//矿机价格
	    	minerDesc: ''//矿机描述
    	},
      assistList: [],//助力名单
    	showActivityRule: false,//是否显示活动规则
    	showAssistance: false, //是否显示助力弹窗
      isIphoneX: false
    }
  },
  async asyncData({req}){
  	let asyncData = {currentPage: 1, pageSize: 10, loadedAll: true}//初始化currentPage和pageSize（当前页、每页展示条数）
    asyncData.device = Common.getUrlQuery("device", req.url);//获取device
  	let url = Common.host//获取api_url
    let token = asyncData.token = Common.getUrlQuery("token", req.url)//获取token
    let baseURL = asyncData.baseURL = url//获取baseURL
    let robId = Common.getUrlQuery("rob_id", req.url);//获取抢单id
  	let jsonData1 = Common.postDataRequest({robId}, token);//获取加密参数
  	let jsonData2 = Common.postDataRequest({robId, currentPage: asyncData.currentPage, pageSize: asyncData.pageSize}, token)//获取加密参数
  	let myPromises = [
  		ssr.getDetailRob(jsonData1, token, {baseURL}),//获取我的抢单信息
  		ssr.getAssistList(jsonData2, token, {baseURL}),//获取助力榜列表
  	];
    if(!myPromises.length) return {}
    // ssr采用promise.all一次性获取所有的数据
    let [data1, data2] = await Promise.all(myPromises)
    .then((results) => {
      return results
    }).catch((e)=>{
      console.log(e)
    });
    //设置抢单信息数据
    if(data1.code === '10000') {
    	let {robDetail} = data1.data
    	if(robDetail.robAvatar && robDetail.robAvatar.indexOf('http') !== 0){
    		robDetail.robAvatar = Common.imgUrl + robDetail.robAvatar
    	}
    	asyncData = Object.assign(asyncData,{robDetail})
    }
    //设置助力榜列表数据
    if(data2.code === '10000'){
    	let {totalPage,assistList} = data2.data;
      if(totalPage <= asyncData.currentPage) {
        asyncData.loadedAll = false
      }
    	asyncData = Object.assign(asyncData,{assistList})
    }
    return asyncData;
  },
  computed: {
  	//活动是否结束，优先级1
  	isActivityEnd(){
  		//活动剩余时间小于等于0，认为活动结束
  		if(this.robDetail.remainTime <= 0){
  			return true
  		}
  		return false
  	},
  	//抢单是否结束,优先级2
  	isPurchaseEnd(){
  		//已经蓄能的总量大于等于矿机价格，认为拿到矿机，则抢单结束
  		if(this.robDetail.assistAmount >= this.robDetail.minerPrice){
  			return true
  		}
  		//矿机剩余数量小于等于0，认为抢单结束
  		if(this.robDetail.minerNumber <= 0){
  			return true
  		}
  		return false
  	},
    //获取助力进度结果文本
    getProgressText(){
      if(!this.isActivityEnd && !this.isPurchaseEnd) {
        return '已蓄能' + this.robDetail.assistAmount + '，还差' + (this.robDetail.minerPrice - this.robDetail.assistAmount)
      }
      return ''
    },
    //获取活动结果提示
    getTipText(){
      if(this.isActivityEnd) return "活动已结束"
      if(this.isPurchaseEnd) return "抢单已结束"
      return ""
    },
    //获取购买矿机按钮（左按钮）文本
    getLeftButtonText(){
      if(!this.isActivityEnd && !this.isPurchaseEnd) return "买一台送给TA"
      return "我要购买"
    },
    //获取矿机助力按钮（右按钮）文本
    getRightButtonText(){
    	if(this.isActivityEnd) return ""
      if(this.isPurchaseEnd) return "我也要抢"
      return "为TA助力"
    }
  },
  methods: {
  	assistAvatarFilter(assistAvatar){
  		if(!assistAvatar) return this.defaultUrl;
  		if(assistAvatar.indexOf('http') !== 0){
    		assistAvatar = Common.imgUrl + assistAvatar
    	}
  		return assistAvatar;
  	},
  	//查看规则弹窗显示与隐藏切换
  	changeActivityRule() {
  		this.showActivityRule = !this.showActivityRule
  	},
  	//助力弹窗显示与隐藏切换
  	changeAssistance() {
  		this.showAssistance = !this.showAssistance
  	},
  	//点击买矿机按钮
  	buyMill() {
  		location.href = this.robDetail.minerLink;//打开购买链接
  	},
  	//点击助力或拿走矿机按钮
		assistance() {
      //我也要抢
      if(!this.isActivityEnd && this.isPurchaseEnd){
        let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        //到下载页面
        if(isiOS) {
          location.href = 'https://itunes.apple.com/cn/app/id1381042034'
        }else{
          location.href = 'https://www.pgyer.com/KG-Android'
        }
      }else{
  			//助力，显示助力码弹窗
  			this.changeAssistance()  
      }
		},
		//打开进度列表top10
		openTop10(){
			location.href="millSchedule?api_url=" + this.url + "&miner_id=" + this.robDetail.minerId + "&device=" + this.device + "&is_weixin=1"
		},
  	//加载更多
  	loadmore(){
  		let jsonData = Common.postDataRequest({
  			robId : this.robDetail.robId,
  			currentPage: (++this.currentPage),
  			pageSize: this.pageSize
  		}, this.token);//获取加密参数
  		let myPromises = [
	  		ssr.getAssistList(jsonData, this.token, {baseURL: this.baseURL}),//获取助力榜列表
	  	];
	    if(!myPromises.length) return {}
	    // ssr采用promise.all一次性获取所有的数据
	    Promise.all(myPromises)
	    .then((results) => {
	    	let data = results[0];
	      if(data.code === '10000'){
		    	let {totalPage,assistList} = data.data;
          if(totalPage <= this.currentPage) {
            this.loadedAll = false
          }
		    	this.assistList = this.assistList.concat(assistList);
		    }
	    }).catch((e)=>{
	      console.log(e)
	    });
  	}
  },
  mounted() {
    window.loading.parentNode.removeChild(window.loading)//关闭loading
    this.isIphoneX = Common.isIphoneX();
  }
}


</script>

<style lang="less" scoped>
#app {
	height: 100%;
	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 10.667vw;
		z-index: 10;
	}
	.progress-box {
		margin-top: 8vw;
		position: relative;
		.progress-text {
	    position: absolute;
	    width: 100%;
	    top: 100%;
	    transform: translateY(3.333vw);
	    text-align: center;
	    color: #fff;
	    font-size: 3.2vw;
	  }
	}
  .buttons {
    margin-top: 14.933vw;
    position: relative;
    .tip {
      position: absolute;
      top: -8.8vw;
      left: 0;
      width: 100%;
      font-size: 3.867vw;
      text-align: center;
      color: #fff;
    }
    .font-blue {
    	color: #C0C1E6;
    }
  	.button-groups {
  		display: flex;
  		justify-content: space-between;
  		.btn {
  			margin: 0 2.13vw;
  			height: 10.667vw;
  			line-height: 10.667vw;
  			color: #fff;
  			font-size: 4vw;
        text-align: center;
  			border-radius: 1.333vw;
  		}
  		.btn-left {
  			flex: 1 1 270px;
  			background: #5B5DC7;
  		}
  		.bg-yellow {
  			background: #FB9D39!important;
  		}
  		.btn-right {
  			flex: 1 1 396px;
  			background: linear-gradient(to right, #5DCDFD, #5AAAFF);;
  		}
  	}
  }
  .count-down {
  	margin-top:3.467vw;
  	height: auto;
  	font-size: 2.933vw;
  	color: #A0A1CE;
  	text-align: center;
  }
  .list {
    ul {
      background: rgb(63,64,128);
      border-radius: 1.333vw;
      li {
        display: flex;
        justify-content: space-between;
        font-size: 3.733vw;
        margin: 0 2vw 0 3.2vw;
        padding: 0 4.8vw 0 19.333vw;
        position: relative;
        height: 20vw;
        line-height: 20vw;
        color: #fff;
        border-top: 1px dashed rgba(112,113,167, .6);
        img {
          position: absolute;
          left: 3.467vw;
          top: 4.667vw;
          height: 10.667vw;
          width: 10.667vw;
          border-radius: 50%;
        }
        .value {
          color: #BEBEDE;
        }
      }
      li:first-child {
        border-top: none;
      }
      .loadmore {
	      transform: translateY(-1.867vw);;
	      font-size: 3.2vw;
	      color: #7E7FC7;
	      text-align: center;
	    }
    }
  }
}
</style>