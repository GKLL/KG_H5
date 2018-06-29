/**
 *  @description: 客服热线弹窗组件
 *  @author: zhangchenle
 *  @date: 2018.5.19
 */
<template>
  <hotline-dialog :isRule="false" @close="close">
    <div class="popup">
      <div class="phone">
        <p>客服电话</p>
        <p>{{tel}}</p>
      </div>
      <div class="btn" @click="call">拨打客服电话</div>
    </div>
  </hotline-dialog>
</template>

<script type="text/ecmascript-6">
import HotlineDialog from '~/components/base/Dialog.vue'
import Common from "~/assets/js/common";

export default {
  name: 'Hotline',
  data () {
    return {
      tel: '028-65292064'
    }
  },
  components:{
    HotlineDialog    
  },
  methods: {
    //关闭弹窗
    close () {
      this.$emit('close')
    },
    //拨打客服电话
    call(){
      let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if(isiOS){
        //ios直接使用tel唤起拨号
        let a = document.createElement('a');
        a.href="tel:" + this.tel;
        a.click();
      }else{
        //安卓使用APP方法
        Common.callPhone(this.tel)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.popup {
  margin: 7.067vw 5.6vw 6.267vw;
  color: #808080;
  font-size: 3.467vw;
  line-height: 4.8vw;
  .phone {
    color: #808080;
    font-size: 4.8vw;
    line-height: 6.4vw;
    text-align: center;
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