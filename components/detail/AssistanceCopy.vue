/**
 *  @description: copy结果弹窗组件
 *  @author: zhangchenle
 *  @date: 2018.5.19
 */
<template>
  <copy-dialog :isRule="true" @close="close">
    <div class="popup">
      <div class="msg">{{msg}}</div>
      <div class="btn" @click="close">关闭</div>
    </div>
  </copy-dialog>
</template>

<script type="text/ecmascript-6">
import CopyDialog from '~/components/base/Dialog.vue'

export default {
  name: 'Copy',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  components:{
    CopyDialog    
  },
  methods: {
    //关闭弹窗
    close () {
      this.$emit('closeCopyResult')
    }
  },
  mounted(){
  }
}
</script>

<style lang="less" scoped>
.popup {
  margin: 9.467vw 5.6vw 6.267vw;
  color: #807F7F;
  font-size: 3.467vw;
  line-height: 4.8vw;
  .msg {
    color: #808080;
    font-size: 4.8vw;
    line-height: 6.4vw;
    text-align: center;
    p:last-child {
    	font-size: 3.467vw;
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