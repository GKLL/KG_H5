/**
 *  @description: List组件，描述商品类的展示
 *  @author: liuzhen
 *  @date: 2018.5.18
 */
<template>
  <ul class="list-shop">
    <li v-for="(item,index) in list" :key="index">
      <div class="list-shop-item-img"><img :src="item.minerPhoto" alt="" /></div>
      <div class="list-shop-item-info">
        <h1>{{item.minerName}}</h1>
        <div class="list-shop-item-num">
          <span>剩余{{item.minerNumber}}台</span>
          <span>已有{{item.robedNumber	}}人抢到</span>
        </div>
        <div class="list-shop-item-handle">
          <span>原价￥{{item.minerPrice}}</span>
          <span>
            <!-- @click="submit(item.minerId)" -->
            <a v-if="item.minerNumber" @touchstart="touchFun($event)" @touchend="touchEndFun($event, item.minerId)"   class="list-shop-item-btn">0元抢</a>
            <a v-if="!item.minerNumber"  class="list-shop-item-btn-disabled">已抢完</a>
          </span>
        </div> 
      </div>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'ListShop',
  data () {
    return {
      BtnBGFilter: false
    }
  },
  props: {
    list: {
      type: Array,
      default: () => {}
    },
  },
  methods: {
    submit (id) {
      // 子组件调用父组件的方法-freeGet
      this.$emit('freeGetChild', id)
    },
    touchFun(event) {
      event.target.className = 'list-shop-item-btn activebtn';
    },
    touchEndFun(event, id) {
      event.target.className = 'list-shop-item-btn';
      this.submit(id)
    }
  },
}
</script>

<style lang="less">
.activebtn{
  background:rgba(251,157,57,0.6) !important; 
}
.list-shop{
  h1{
    overflow: hidden;  
    display: -webkit-box;  
    -webkit-line-clamp: 2;  
    -webkit-box-orient: vertical; 
    display: -o-box;
    -o-box-orient: vertical;
    -o-line-clamp: 2;
    display: -ms-box;
    -ms-box-orient: vertical;
    -ms-line-clamp: 2;
    display: -moz-box;
    -moz-box-orient: vertical;
    -moz-line-clamp: 2;
    display: box;
    box-orient: vertical;
    line-clamp: 2;
    text-overflow: ellipsis;
    word-break: break-all; 
  }
  .list-shop-item-btn-disabled{
    background-color: rgba(184,184,184,1) !important;
  }
  li{
    border-bottom: 1px solid #e6e6e6;
  }
}
ul.list-shop {
  width: 100%;
  background-color: rgba(255,255,255,1);
  border-radius: 5px;
  box-shadow:20px 0px 30px rgba(0,0,0,0.2);
  padding: 0;
}
ul.list-shop li {
  display: flex;
  padding: 8vw 0;
  margin: 0 4vw;
}
ul.list-shop li .list-shop-item-img {
  width: 24vw;
  margin-right: 2.666vw;
}
ul.list-shop li .list-shop-item-img img {
  width: 24vw;
  height: 24vw;
  border-radius: 1.333vw;
}
ul.list-shop li .list-shop-item-info {
  flex: 1;
}
ul.list-shop li .list-shop-item-info h1 {
  font-size: 4.266vw;
  margin-bottom: 1.667vw;
  line-height: 5.766vw;
  
}
ul.list-shop li .list-shop-item-info .list-shop-item-num {
  display: flex;
  font-size: 13px;
  margin-bottom: 3px;
}
ul.list-shop li .list-shop-item-info .list-shop-item-num span {
  display: inline-block;
  width: 50%;
}
ul.list-shop li .list-shop-item-info .list-shop-item-num span:last-child {
  text-align: right;
  color: #9D9D9D;
}
ul.list-shop li .list-shop-item-info .list-shop-item-handle {
  display: flex;
  font-size: 15px;
}
ul.list-shop li .list-shop-item-info .list-shop-item-handle span {
  display: inline-block;
  width: 50%;
  color: #E56C6C;
}
ul.list-shop li .list-shop-item-info .list-shop-item-handle span:first-child {
  position: relative;
  top: 14px;
  font-size: 13px;
}
ul.list-shop li .list-shop-item-info .list-shop-item-handle span:last-child {
  text-align: right;
}
ul.list-shop li .list-shop-item-info .list-shop-item-handle span:last-child a {
  display: inline-block;
  width: 19.333vw;
  height: 7vw;
  background-color: rgba(251,157,57,1);
  border-radius: 1.333vw;
  text-align: center;
  line-height: 7vw;
  color: #fff;
  font-size: 4.266vw;
}

</style>