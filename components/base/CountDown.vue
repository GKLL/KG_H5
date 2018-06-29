/**
 *  @description: CountDown倒计时文本组件
 *  @author: liuzhen
 *  @date: 2018.5.19
 */
<template>
  <span>{{formattedTimeStr}}</span>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'CountDown',
  data () {
    return {
      formattedTimeStr: '',
      timer: null   // 计时器
    }
  },

  props: {
    currentTime: {
      type: String,
      default: '0',
      require: true
    },
    showType: {
      type: String,
      default: '0'
    }
  },

  created () {
    if (!this.currentTime) {
      return
    }

    // 获取天数
    let tmp = null;
    let days = (this.currentTime / 1000 / 60 / 60 / 24) < 1 ? 0 : parseInt(this.currentTime / 1000 / 60 / 60 / 24)
    days = Number(days) < 10 ? '0' + days : days
    // 获取小时
    tmp = this.currentTime - (days * 24 * 60 * 60 * 1000)
    let hours = (tmp / 1000 / 60 / 60) < 1 ? 0 : parseInt(tmp / 1000 / 60 / 60)
    hours = Number(hours) < 10 ? '0' + hours : hours
    // 获取分钟
    tmp = this.currentTime - (days * 24 * 60 * 60 * 1000) - (hours * 60 * 60 * 1000)
    let minute = (tmp / 1000 / 60) < 1 ? 0 : parseInt(tmp / 1000 / 60)
    minute = Number(minute) < 10 ? '0' + minute : minute
    // 获取秒
    tmp = this.currentTime - (days * 24 * 60 * 60 * 1000) - (hours * 60 * 60 * 1000) - (minute * 60 * 1000)
    let second = (tmp / 1000) < 1 ? 0 : parseInt(tmp / 1000)
    second = Number(second) < 10 ? '0' + second : second

    if (this.showType === 0) {
      this.formattedTimeStr = `${days}天${hours}小时${minute}分钟${second}秒`
    } else {
      this.formattedTimeStr = `${days}天${hours}:${minute}:${second}`
    }
  },

  mounted () {
    if (this.formattedTimeStr) {
      let timeArr = this.handleCountDown(this.formattedTimeStr)

      // 如果已没有活动时间，则不启动计时器
      if (timeArr.every(item => item === 0)) {
        return
      }

      // 启动计时器
      this.timer = setInterval(() => {
        if (Number(timeArr[3]) > 0) {
          timeArr[3] -= 1
        } else {
          if (Number(timeArr[2]) > 0) {
            timeArr[2] -= 1
            timeArr[3] = 59
          } else {
            if (Number(timeArr[1]) > 0) {
              timeArr[1] -= 1
              timeArr[2] = 59
              timeArr[3] = 59
            } else {
              if (Number(timeArr[0]) > 0) {
                timeArr[0] -= 1
                timeArr[1] = 23
                timeArr[2] = 59
                timeArr[3] = 59
              }
            }
          }
        }

        // 如果时间结束，则关闭计时器
        if (timeArr.every(item => item === 0)) {
          clearInterval(this.timer)
        }

        // 小于10补0
        for(let i = 0; i < timeArr.length; i++) {
          if (Number(timeArr[i]) < 10 && Number(timeArr[i] >= 0)) {
            timeArr[i] = '0' + Number(timeArr[i])
          }
        }
       
        if (this.showType === 0) {
           this.formattedTimeStr = `${timeArr[0]}天${timeArr[1]}小时${timeArr[2]}分钟${timeArr[3]}秒`
        } else {
           this.formattedTimeStr = `${timeArr[0]}天${timeArr[1]}:${timeArr[2]}:${timeArr[3]}`
        }
      }, 1000)
      
    }
  },

  destroyed () {
    // 销毁定时器
    clearInterval(this.timer)
  },

  methods: {
    // 处理倒计时功能所需的参数
    handleCountDown (str) {
      if (!str) { return }

      // 正则获取结果字符串中的各阶段时间值
      let arr = null
      if (this.showType === 0) {
        arr = str.match(/(\d+)天(\d+)小时(\d+)分钟(\d+)秒/)
      } else {
        arr = str.match(/(\d+)天(\d+):(\d+):(\d+)/)
      }

      let res = [parseInt(arr[1]), parseInt(arr[2]), parseInt(arr[3]), parseInt(arr[4])]
      return res
    }
  }
}
</script>

<style lang="less">
</style>