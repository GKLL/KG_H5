/**
 *  @description: 接口返回错误状态码组件
 *  @author: zhangchenle
 *  @date: 2018.5.25
 */
<template>
  <copy-dialog :isRule="true">
    <div class="popup">
      <div class="btn" @click="handler">{{msg}}</div>
    </div>
  </copy-dialog>
</template>

<script type="text/ecmascript-6">
import CopyDialog from '~/components/base/Dialog.vue'
import Common from '~/assets/js/common'

export default {
  name: 'Copy',
  props: {
    param: {}
  },
  data () {
    return {
    }
  },
  computed:{
    msg(){
      let statusCode = this.param.statusCode
      if(statusCode == '10004') return "登录状态失效，请登录"
    }
  },
  components:{
    CopyDialog    
  },
  methods: {
    //处理异常
    handler () {
      let statusCode = this.param.statusCode
      //token失效，返回登录界面
      if(statusCode == '10004'){
        Common.callLogin(this.param.url, this.param.query)
      }
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