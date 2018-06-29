/**
 * @description 订单详情主体组件
 * @author zhangchenle
 * @date 2018.5.18
 */
<template>
  <div class="order-detail">
  	<section class="base-info">
			<div class="rule" @click.stop="open">活动规则</div>
  		<div class="photo" :style="{background: 'url(' + robAvatar + ') no-repeat center/cover'}"></div>
			<div class="name">{{robName}}</div>
			<div class="mill">
				<div class="mill-bg"></div>
				<div class="mill-top">
					<img :src="minerPhoto" class="mill-img">
					<div class="mill-description">{{minerName}}</div>
					<div class="mill-number">剩余{{minerNumber}}台</div>
					<div class="price-buying">
						<div class="mill-price">原价¥{{minerPrice}}</div>
						<div class="buying-number" @click="openTop10">{{minerJoinFrequency}}人正在抢 ></div>
					</div>
				</div>
				<div class="mill-bottom">
					<p>{{minerDesc}}</p>
				</div>
			</div>
  	</section>
		<section class="detail-progress">
			<slot name="progress"></slot>
			<slot name="buttons"></slot>
			<slot name="countdown"></slot>
		</section>
		<section class="assistance">
			<slot name="assistance"></slot>
		</section>
  </div>
</template>

<script>
export default {
	props: {
  	isShow: {
  		type: Boolean,
      default: false
  	},
  	param: {}
  },
  data() {
    return Object.assign({
		minerJoinFrequency: 0,//矿机的参与人数
    	robAvatar: 'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/1805/photocopy23x.png',//抢单人的头像（需要设置一个默认头像，为全路径）
    	minerLink: '',//矿机购买链接（可能为空）
    	robId: '',//抢单Id
    	robName: '',//抢单人昵称
    	minerName: '',//矿机名称
    	minerNumber: '',//矿机剩余数量
    	remainTime: '',//离活动结束还剩余的毫秒数
    	minerPhoto: '',//矿机图片
    	minerPrice: ''//矿机价格
		}, this.param);
  },

  components: {

  },
  methods: {
  	open(){
  		this.$emit('open');
  	},
  	openTop10(){
  		this.$emit('openTop10');
  	}
  },
  mounted(){
  	console.log('param',this.param);
  }
}

</script>

<style lang="less" scoped>
	.order-detail {
		padding-bottom: 12.4vw;
		position: relative;
		min-height: 100%;
		background: #262762;
		&:before {
			content: '';
			position: absolute;
			left: 0;
			top: -5.333vw;
			width: 100%;
			height: 68vw;
			background: url(https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/img/detail/detail-bg.png) no-repeat left top/cover;
		}
		section {
			padding: 0 2.13vw;
			overflow: hidden;
		}
		.base-info {
			position: relative;
			height: 110vw;
			.photo {
				position: absolute;
				top: 9.066vw;
				left: 38.333vw;
				height: 24vw;
				width: 24vw;
				border: .8vw solid #fff;
				border-radius: 50%;
				z-index: 1;
			}
			.name {
        position: absolute;
        left: 0;
				top: 36.933vw;
				width: 100%;
				font-size: 4.2667vw;
				text-align: center;
				color: rgb(255, 255, 255);
				z-index: 1;
			}
			.rule {
				padding-left: 4.533vw;
				position: absolute;
				right: 0;
				top: 5.733vw;
				height: 8vw;
				width: 21.333vw;
				line-height: 7.5vw;
				font-size: 3.2vw;
				color: rgb(255, 255, 255);
				background: rgb(81,83,161);
				border-radius: 4vw 0 0 4vw;
				border: 1px solid rgba(255, 255, 255, 0.5);
				border-right: none;
				z-index: 1;
			}
			.mill {
				position: absolute;
				bottom: 0;
				width: 94.933vw;
				height: 64.267vw;
				.mill-bg {
					margin: 0 auto;
					width: 84.267vw;
					height: 100%;
					background: rgba(255, 255, 255, .3);
					border-radius: 1.333vw;
					overflow: hidden;
					&:before {
						content: "";
						position: absolute;
						left: 2.667vw;
						top: 1.333vw;
						bottom: 0;
						width: 89.6vw;
						background: rgba(255, 255, 255, .5);
						border-radius: 1.333vw;
						z-index: 1;
					}
					&:after {
						content: "";
						position: absolute;
						left: 0;
						top: 2.667vw;
						width: 94.933vw;
						bottom: 0;
						background: rgb(255, 255, 255);
						border-radius: 1.333vw;
						z-index: 2;
					}
				}
				.mill-top {
					padding-left: 32.667vw;
					position: absolute;
					left: 0;
					top: 0;
					height: 50%;
					width: 100%;
					z-index: 3;
					.mill-img {
						position: absolute;
						top: 6.933vw;
						left: 4.133vw;
						width: 24vw;
						height: 24vw;
					}
					.mill-description {
						margin-top: 6.8vw;
						width: 56.2vw;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
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
						font-size: 4.267vw;
						text-overflow: ellipsis;
						overflow: hidden;
						word-break: break-all;
					}
					.mill-number {
						margin-top: 2.267vw;
						font-size: 3.467vw;
						color: #3F3F3F;
					}
					.price-buying {
						margin-top: 2.667vw;
						padding-right: 6vw;
						display: flex;
						justify-content: space-between;
						line-height: 4vw;
						.mill-price {
							font-size: 4vw;
							color: #E56C6C;
						}
						.buying-number {
							font-size: 3.2vw;
							color: #AAABCE;
						}
					}
				}
				.mill-bottom {
					padding: 3.733vw;
					padding-bottom: 3.733vw;
					position: absolute;
					top: 34.933vw;
					right: 2.133vw;
					left: 2.133vw;
					// bottom: 2.8vw;
					background: #E5E5F7;
					color: #7F80AA;
					font-size: 3.467vw;
					border-radius: 1.333vw;
					z-index: 3;
					p {
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 4;
						display: -o-box;
						-o-box-orient: vertical;
						-o-line-clamp: 4;
						display: -ms-box;
						-ms-box-orient: vertical;
						-ms-line-clamp: 4;
						display: -moz-box;
						-moz-box-orient: vertical;
						-moz-line-clamp: 4;
						display: box;
						box-orient: vertical;
						line-clamp: 2;
						text-overflow: ellipsis;
						overflow: hidden;
						word-break: break-all;
					}
					&:after {
						content: "";
						position: absolute;
						left: 12vw;
						bottom: 100%;
						border-bottom: 2vw solid #E5E5F7;
						border-left: 2vw solid transparent;
						border-right: 2vw solid transparent;
					}
				}
			}
		}
		.assistance {
			margin-top: 6.533vw;
		}
	}
</style>
<style lang='less'>
.progress {
	.text {
		font-size: 2.933vw!important;
	}
}
</style>
