/**
 *  @description: Dialog组件，提供弹层支持
 *  @author: liuzhen
 *  @date: 2018.5.18
 */
<template>
  <div class="dialog" @touchmove.prevent="doSomeThing">
    <div class="dialog-container">
      <a :class="{isRule: isRule}" href="javascript:;"><i class="iosClose" @click="close"></i></a>
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Dialog',
  data () {
    return {
    }
  },
  props: {
    isRule: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },

    // 空函数，什么都不做
    doSomeThing () {}
  }
}
</script>

<style lang="less">
.dialog {
  display: relative;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  .isRule{
    display: none;
  }
}
.dialog .dialog-container {
  display: inline-block;
  width: 85%;
  height: auto;
  min-height: 100px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.dialog .dialog-container a {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 14px;
  height: 14px;
  border-radius: 2px;
  background-image: url('../../assets/img/close/close.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .iosClose{
    position: absolute;
    display: inline-block;
    width: 40px;
    height: 40px;
    background-color: aqua;
    top: -15px;
    left: -10px;
    opacity: 0;
    filter:Alpha(opacity=0);
  }
}
.dialog {
  .van-field__control{
    padding: 10px 0;
    text-align: center;
    color: #5A5A5A
    }
}
</style>