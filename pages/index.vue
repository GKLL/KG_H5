<template>
  <div style="background-color:#262762;height:500px">
    <!-- <list-shop :list="list"></list-shop>
    <a href="javascript:;" style="color:#fff;width:300px;height:50px;background:#ccc" @click.stop="isShow=true">dialog</a>
    <Dialog :isShow="isShow"></Dialog> -->
    <!-- <Progress current="8800" total="16880"></Progress> -->
    <p>打电话测试</p>
        <a  href="tel:15008495964">拨打电话</a>
    <count-down :currentTime="86470000"></count-down>
    <!-- <Header title="我是标题"></Header> -->
  </div>
</template>

<script type="text/ecmascript-6">
import ListShop from '@/components/base/ListShop'
import Dialog from '@/components/base/Dialog'
import Progress from '@/components/base/Progress'
import CountDown from '@/components/base/CountDown'
import Header from '@/components/base/Header'

export default {
  name: 'Index',
  data () {
    return {
      isShow: false,
      list: [
        {
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526638147787&di=84fcf88ef86f352d8cb3fc69676ca714&imgtype=0&src=http%3A%2F%2Ffiles.b2b.cn%2Fproduct%2FProductImages%2F2017_11%2F15%2F160%2F15160422728_s.jpg',
          title: '这里是演示标题',
          surplus: 10,
          gettedNum: 2,
          price: 999,
          getState: true
        },
        {
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526638147787&di=84fcf88ef86f352d8cb3fc69676ca714&imgtype=0&src=http%3A%2F%2Ffiles.b2b.cn%2Fproduct%2FProductImages%2F2017_11%2F15%2F160%2F15160422728_s.jpg',
          title: '这里是演示标题',
          surplus: 10,
          gettedNum: 2,
          price: 999,
          getState: true
        },
        {
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526638147787&di=84fcf88ef86f352d8cb3fc69676ca714&imgtype=0&src=http%3A%2F%2Ffiles.b2b.cn%2Fproduct%2FProductImages%2F2017_11%2F15%2F160%2F15160422728_s.jpg',
          title: '这里是演示标题',
          surplus: 10,
          gettedNum: 2,
          price: 999,
          getState: true
        }
      ]
    }
  },

  components: {
    ListShop,
    Dialog,
    Progress,
    CountDown,
    Header
  },
  mounted(){
    window.loading.parentNode.removeChild(window.loading)//关闭loading
  }
}
</script>

<style lang="less">
</style>