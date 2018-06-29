<template>
  <div style="height: 100%;">
    <script type="text/javascript" src="/views/common/loading.js"></script>
    <script type="text/javascript" src="/views/common/retcode_bl.js"></script>
    <nuxt/>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'

export default {
  name: 'component_name',
  data () {
    return {
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: "Microsoft YaHei", "微软雅黑", 'Helvetica', 'Pingfang SC', 'Hiragino Sans GB', 'WenQuanYi', 'Micro Hei', "sans-serif"
}
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

#__nuxt {
	height:100%;
}
#__layout{
  height:100%;
}
</style>