<template>
  <div id="app">
  	<div class="container">
  		<div class="bannerBg"></div>
	  	<van-tabs v-model="active">
			  <van-tab v-for="(option, index) in tabOptions" :title="option.name" :key="'tab' + index">
			  	<component :is="option.component" :param="componentData[option.component]"></component>
			  </van-tab>
			</van-tabs>
  	</div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tab, Tabs } from 'vant'
import ssr from '~/assets/js/ssr/invite'
import Invite from '~/components/invite/Invite.vue'
import Apprentice from '~/components/invite/Apprentice.vue'
import Master from '~/components/invite/Master.vue'
import C from '~/assets/js/common'
import conf from "~/assets/js/util/conf";

let Base64 = require("js-base64").Base64;

Vue.use(Tab).use(Tabs);

export default {
  head: {
    title: '邀新收徒',
    meta: [
      { hid: 'keywords', name: 'keywords', content: '邀新收徒' },
      { hid: 'description', name: 'description', content: '邀新收徒' }
    ],
    script: [
      {src: '/views/common/callNativeSuccess.js'}
    ]
  },
  data() {
    return {
    	componentData: {
    		Invite: {},
    		Apprentice: {},
    		Master: {}
    	},
    	tabOptions: [
    		{
    			name: '邀请有奖',
    			component: 'Invite'
    		},
    		{
    			name: '我的徒弟',
    			component: 'Apprentice'
    		},
    		{
    			name: '我的师傅',
    			component: 'Master'
    		}
    	],
      active: 0
    };
  },
  async asyncData({req}){
  	let url = C.getUrlQuery("api_url", req.url);//获取host地址
    let token = C.getUrlQuery("token", req.url);//获取token
    let ip = Base64.decode(url.replace("?", ""));//获取ip
  	let jsonData = C.postDataRequest({}, token)

  	let myPromises = [
  		ssr.getData1(jsonData, token, {ip, url}),//邀请有奖组件获取数据
  		ssr.getTVs(jsonData, token, {ip, url}),//邀请有奖组件获取数据
  		// ssr.getInviteCode(jsonData, token, {ip, url}),//我的徒弟组件获取数据
  		// ssr.getData2(jsonData, token, {ip, url}),//我的徒弟组件获取数据
  		// ssr.getStulist(jsonData, token, {ip, url}),//我的徒弟组件获取数据
  	];
    if(!myPromises.length) return {};
    //ssr采用promise.all一次性获取所有的数据
    let [data1, data2, data3, data4, data5] = await Promise.all(myPromises)
    .then((results) => {
			// console.log('results', results)
      return results;
    }).catch((e)=>{
      console.log(e);
    });
    //邀请有奖数据处理
    let inviteData = data1.data
		let rewardTv = data2.data
		let withdrowTv = 0;
    rewardTv.forEach((element, index) => {
      if (inviteData.inviteCount  >= rewardTv[index]._count) {
        withdrowTv = rewardTv[index]._bonus;
      }
    });
    //我的徒弟数据处理
    // let isEmpty,stuInfo,notEmpty, elements;
    // if(data5.data.data.length == 0){
    // 	isEmpty = true;
    // 	stuInfo = '您暂时还没有徒弟，快去邀请好友吧~';
    //   notEmpty = false;
    //   elements= [];
    // }else{
    // 	isEmpty = false;
    // 	stuInfo = '';
    // 	notEmpty = true;
    // 	data5.data.data.forEach(element => {
    //     if (!element.avatar) {
    //       element = Object.assign(element, {
    //         avatar:
    //           "https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/photocopy23x.png"
    //       });
    //     }
    //     if (element.avatar.indexOf("http") == -1) {
    //       element = Object.assign(element, {
    //         avatar: conf.imgUrl + element.avatar
    //       });
    //     }
    //     elements.push(element);
    //   });
    // }

    return {
    	componentData: {
    		Invite: {url, token, ip, inviteData, rewardTv, withdrowTv},
    		Apprentice: {
    			// inviteData: data3.data,
    			// tvnum: data4.data.tributeAmount,
    			// stuData: data5.data,
    			// isEmpty,
    			// stuInfo,
    			// notEmpty,
    			// list: elements
    		}
    	}
  	}
  },
  components: {
  	Invite,
  	Apprentice,
  	Master
  }
}
</script>

<style lang="less">
#app {
	height: 100%;
	.container {
		.bannerBg {
	    width: 100%;
	    height: 210px;
	    background-image: url('https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/banner3x.png');
	    background-size: 100% 100%;
	  }
	  .van-tabs__wrap {
			left: 16.67%;
			right: 16.67%;
	  }
	  .van-tabs__content {
	  	background-color: rgba(244,67,69,1);
	  	overflow: hidden;
	  }
	}
}
</style>