/**
 *  @description: 查看规则组件
 *  @author: zhangchenle
 *  @date: 2018.5.18
 */
<template>
  <rule-dialog :isRule="true">
    <div class="popup">
      <div class="rule-title"></div>
      <div class="rule-gradient-top"></div>
      <div class="rule-gradient-bottom"></div>
      <p>1.邀请好友助力，在活动规定时间内完成蓄能，即可拿走矿机</p>
      <p>2.好友助力时随机增加蓄能量，好友通过在APP中输入助力码完成助力，若助力好友为新用户，将会获得连续三次蓄能。</p>
      <p>3.每个好友每天仅可为三个抢单助力，每个抢单每天仅助力一次</p>
      <p>4.若发现用户存在刷单、虚假用户助力等违规行为，平台有权利判定为无效助力</p>
      <p>5.活动时间：{{startTime}}—{{endTime}}</p>
      <p>6.成功拿走矿机后，可联系客服进行后续发货等事宜</p>
      <div  class="close" @click.stop="close">×</div>
    </div>
  </rule-dialog>
</template>

<script type="text/ecmascript-6">
import RuleDialog from '~/components/base/Dialog.vue'
import Common from '~/assets/js/common'
import ssr from '~/assets/js/ssr/detail'

export default {
  name: 'Rule',
  data () {
    return {
      startTime: '',
      endTime: ''
    }
  },
  components:{
    RuleDialog    
  },
  methods: {
    close () {
      this.$emit('close')
    }
  },
  mounted(){
    let jsonData = Common.postDataRequest({}, '');//获取加密参数
    let myPromises = [
      ssr.getMinerTime(jsonData, '', {baseURL: Common.host}),//获取活动时间
    ];
    if(!myPromises.length) return {}
    // ssr采用promise.all一次性获取所有的数据
    Promise.all(myPromises)
    .then((results) => {
      let data = results[0];
      if(data.code === '10000'){
        let {minerActivityTime} = data.data;
        let startTime = new Date(Number(minerActivityTime.startTime))
        let endTime = new Date(Number(minerActivityTime.endTime))
        this.startTime =  Common.DateFormat(startTime,"MM月DD日 hh:mm");
        this.endTime = Common.DateFormat(endTime, "MM月DD日 hh:mm")
      }
    }).catch((e)=>{
      console.log(e)
    });
  }
}
</script>

<style lang="less" scoped>
.popup {
  margin: 15.733vw 5.533vw 14.8vw;
  color: #808080;
  font-size: 3.467vw;
  line-height: 4.8vw;
  .rule-title {
    position: absolute;
    left: 2.533vw;
    right: 2.533vw;
    top: -8.667vw;
    height: 15.733vw;
    background: url(https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/img/detail/rule-title.png) no-repeat center/cover;
  }
  .rule-gradient-top {
    position: absolute;
    top: 8vw;
    left: 3.867vw;
    right: 3.867vw;
    height: 2.133vw;
    background: url(https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/img/detail/rule-gradient.png) no-repeat center/cover;
  }
  .rule-gradient-bottom {
    position: absolute;
    bottom: 4.533vw;
    left: 3.867vw;
    right: 3.867vw;
    height: 2.133vw;
    background: url(https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/img/detail/rule-gradient.png) no-repeat center/cover;
    transform: rotate(180deg);
  }
  .close {
    position: absolute;
    left: 38.667vw;
    bottom: -8vw;
    width: 4.8vw;
    height: 4.8vw;
    color: rgba(255,255,255,1);
    font-size: 8.8vw;
    line-height: 3.8vw;
    text-align: center;
    border-radius: 0.267vw; 
  }
}
</style>