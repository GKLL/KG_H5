/**
 *  @description: 客服热线弹窗组件
 *  @author: zhangchenle
 *  @date: 2018.5.19
 */
<template>
  <div>
    <assistance-copy style="z-index: 1001;" v-if="showCopy" :msg="msg" @closeCopyResult="closeCopyResult"></assistance-copy>
    <assistance-dialog :isRule="false" @close="close">
      <div class="popup">
        <div class="tip">
          <p>手机号登录，为TA助力</p>
          <p>新用户助力蓄能更多</p>
        </div>
        <div class="clipboard">
        	<div class="assistance-code">
        		<p>TA的助力码</p>
        		<p id="copyValue">{{assistCode}}</p>
        	</div>
      		<div v-if="!isIphone" id="copy" class="copy" data-clipboard-action="copy" data-clipboard-target="#copyValue">复制</div>
          <div v-if="isIphone" id="copy" class="copy isIphone" data-clipboard-action="copy" data-clipboard-target="#copyValue">请长按助力码复制!</div>
        </div>
        <div class="btn" @click="assistance">为TA助力</div>
      </div>
    </assistance-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import AssistanceDialog from '~/components/base/Dialog.vue'
import AssistanceCopy from '~/components/detail/AssistanceCopy.vue'
import Clipboard from 'clipboard'
import Common from '~/assets/js/common'

export default {
  name: 'Assistance',
  props: {
    assistCode: {
      type: String,
      default: '',
      require: true
    }
  },
  data () {
    return {
      isIphone: true,
      showCopy: false,//复制助力码结果弹窗
      msg: ''//复制弹窗信息
    }
  },
  components:{
    AssistanceDialog,
    AssistanceCopy
  },
  methods: {
    //关闭弹窗
    close () {
      this.$emit('close')
    },
    //复制助力码监听
    copy(){
      let clipboard = new Clipboard('#copy')
      clipboard.on('success',(e) => {
        e.clearSelection();
        this.msg = '复制成功'
        this.showCopy = true;
      });
      clipboard.on('error',(e) => {
        e.clearSelection();
        this.msg = '复制失败';
        this.showCopy = true;
      });
    },
    //复制助力码弹窗
    closeCopyResult() {
      this.showCopy = false
    },
    //助力
    assistance(){
      let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      //到下载页面
      if(isiOS) {
        location.href = 'https://itunes.apple.com/cn/app/id1381042034'
      }else{
        location.href = 'https://www.pgyer.com/KG-Android'
      }
      
    }
  },
  mounted(){
    this.isIphone = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    this.copy()
  }
}
</script>

<style lang="less" scoped>
.popup {
  margin: 7.067vw 5.6vw 6.267vw;
  color: #808080;
  font-size: 3.467vw;
  line-height: 4.8vw;
  .tip {
    color: #808080;
    font-size: 4.8vw;
    line-height: 6.4vw;
    text-align: center;
    p:last-child {
    	font-size: 3.467vw;
    }
  }
  .clipboard {
  	padding: 3.2vw 0 3.6vw;
		background: #EAF1F8;
    border-radius: 2.667vw;
    margin: 0 auto;
    width: 46vw;
    margin-top: 5.466VW;
		text-align: center;
		.assistance-code {
			font-size: 4vw;
			line-height: 6.4vw;
			p:last-child {
				color: #2A2A2A;
				font-weight: bold;
				font-size: 4.8vw;
			}
		}
		.copy {
			margin: 4.4vw auto 0;
			padding: 0 4vw;
			width: 18.667vw;
			height: 6.667vw;
			line-height: 6.667vw;
			font-size: 3.467vw;
			background: #fff;
			border: 1px solid #A9C9E8;
			border-radius: 3.333vw;
		}
    .isIphone {
      width: 38.667vw;
      border: none;
      background: #EAF1F8;
    }
  }
  .btn {
    margin-top: 6.8vw;
    height: 10.667vw;
    line-height: 10.667vw;
    font-size: 4.267vw;
    color: #fff;
    text-align: center;
    background: #5AAAFF;
    border-radius: 5.333vw;
  }
}
</style>