<template>
	<view class="popView">
		<view class="popForm">
			<text>{{ msg }}</text>
			<view class="popBtns">
				<button @click="sendFalse" type="default" size="mini">{{ btn1 }}</button>
				<button @click="sendTrue" type="default" size="mini">{{ btn2 }}</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['msg','btn1','btn2'],
		data(){
			return {
				
			}
		},
		methods:{
			sendFalse(){
				uni.$emit('closePop',false);
			},
			sendTrue(){
				uni.$emit('closePop',true);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popView{
		position:fixed;
		top:0;
		right:0;
		bottom:0;
		left:0;
		background-color: rgba(0,0,0,0.6);
		display: flex;
		justify-content:center;
		align-items:center;
		.popForm{
			width:600rpx;
			height:240rpx;
			border-radius:4px;
			color:#C0C0C0;
			display: flex;
			justify-content:center;
			align-items: center;
			flex-direction: column;
			background-color: rgba($color: #000000, $alpha: 0.6);
			.popBtns{
				margin-top: 50rpx;
				width:400rpx;
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>
