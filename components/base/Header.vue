/**
 *  @description: 页头组件实现
 *  @author: liuzhen
 *  @date: 2018.5.19
 */
<template>
  <header class="m_header">
    <section>{{title}}</section>
    <div class="back" @click.stop='back'></div>
  </header>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Header',
  data () {
    return {
    }
  },

  props: {
    title: {
      type: String,
      default: '',
      require: true
    }
  },

  methods: {
    back () {
      this.$emit('back')
    }
  }
}
</script>

<style lang="less">
.m_header section {
  position: relative;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  text-align: center;
  font-size: 16px;
  color: #383838;
}
.m_header div.back {
  position: absolute;
  top: 13px;
  left: 16px;
  width: 16px;
  height: 16px;
}
.m_header div.back::before {
  content: '‹';
  position: absolute;
  right: 5px;
  top: -11px;
  font-size: 25px;
  color: #383838;
}
@media only screen and (max-width: 320px){
  .m_header{
    section {
      font-size: 13px;
      height: 34px;
      line-height: 34px;
    }
    .back {
      top: 10px;
    }
  }
}
</style>