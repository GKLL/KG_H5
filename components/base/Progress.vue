/**
 *  @description: Progress进度条组件
 *  @author: liuzhen
 *  @date: 2018.5.18
 */
<template>
  <div class="progress">
    <div class="current-progress" ref="current"></div>
    <div class="text">{{current}}/{{total}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Progress',
  data () {
    return {
    }
  },

  props: {
    current: {
      type: String,
      default: '0',
      require: true
    },
    total: {
      type: String,
      default: '0',
      require: true
    }
  },
  created(){
  },
  
  mounted () {
    // 取当前量和总量的百分比
    this.proportion = (Number(this.current) / Number(this.total) * 100).toFixed(2)
    // 设置内部变量的百分比
    this.$refs.current.style.width = this.proportion + '%'
  }
}
</script>

<style lang="less">
.progress {
  display: block;
  width: 85%;
  height: 20px;
  background:rgba(21,22,69,1);
  border-radius: 10px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}
.progress .current-progress {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 10px;
  background: -webkit-linear-gradient(right, #FFEA39, #FF6738);
  background: -o-linear-gradient(left, #FFEA39, #FF6738);
  background: -moz-linear-gradient(left, #FFEA39, #FF6738);
  background: linear-gradient(left, #FFEA39, #FF6738);
  color: #fff;
  font-size: 11px;
  text-align: center;
  line-height: 20px;
}
.text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #fff;
  font-size: 22px;
  z-index: 1;
}
</style>