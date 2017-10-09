<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avator">
				<!-- 这里面就可以直接使用seller -->
				<img :src="seller.avator" alt="沙县国际" width="64" height="64">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="support" v-if="seller.supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="support-count" v-if="seller.supports" @click="showDetail">
				<span class="count">{{seller.supports.length}}</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<!-- 风景 变化交互 加过渡效果 -->
		<transition name="fade">
			<div v-show="detailShow" class="detail">
				<div class="detail-main">
					<h1 class="name">{{seller.name}}</h1>
					<div class="star-wrapper">
						<star :score="seller.score" :size="48"></star>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
//
	import star from '@/components/star/star'
	export default {
		// 获取数据 向外声明参数 同时 要求类型
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				//子组件的数据项 一般用于组件内的状态的切换 不涉及数据的交换
				detailShow: false
			}
		},
		created () {
			//自行添加classMap数据
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
		},
		methods: {
			showDetail () {
				this.detailShow = true
			}
		},
		components: {
			star
		}
	}
</script>
<style lang="stylus" ref="stylesheet/stylus">
	//mixin 代码的复用！！
	// stylus的导入其他包.styl
	@import '../../common/stylus/mixin'

	.header
		position relative
		overflow hidden
		color #ffffff
		background rgba(7, 17, 27, .3)
		.content-wrapper
			position relative
			padding 24px 12px 18px 24px
			font-size 0
			.avator
				display inline-block
				vertical-align top
				img
					border-radius 2px
			.content
				display inline-block
				margin-left 16px
				.title
					margin 2px 0 8px 0
					.brand
						display inline-block
						vertical-align top
						width 30px
						height 18px
						bg-img('brand')
						background-size 30px 18px
						background-repeat no-repeat
					.name
						margin-left 6px
						font-size 16px
						line-height 18px
						font-weight bold
				.description
					margin-bottom 10px
					line-height 12px
					font-size 12px
				.support
					.icon
						display inline-block
						vertical-align top
						width 12px
						height 12px
						margin-right 4px
						background-size 12px 12px
						background-repeat  no-repeat
						&.decrease
							bg-img('decrease_1')
						&.discount
							bg-img('discount_1')
						&.guarantee
							bg-img('guarantee_1')
						&.invoice
							bg-img('invoice_1')
						&.special
							bg-img('special_1')
			.support-count
				position absolute
				right 12px
				bottom 14px
				padding 0 8px
				height 24px
				line-height 24px
				border-radius 14px
				background rgba(0, 0, 0, .2)
				text-align center
				.count
					vertical-align center
					font-size 10px
				.icon-keyboard_arrow_right
					margin-left 2px
					line-height 24px
					font-size 10px
		.detail
			position fixed
			z-index 100
			top 0
			left 0
			right 0
			width 100%
			height 100%
			overflow auto
			opacity 1
			background rgba(7,17,27,.8)
			// enter leave opacity从0变到1
			&.fade-enter, &.fade-leave-active
				opacity 0
				background rgba(7, 17, 27, 0)
			// 这里面的可见是上面detail来写的
			&.fade-enter-active, &.fade-leave-active
				transition all .5s



</style>
