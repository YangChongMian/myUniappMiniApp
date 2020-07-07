<template>
	<view class="container">
		<view class="indexText">
			<view class="_font top_font">风月同天</view>
			<view class="_font bottom_font">你我携手共勉</view>
		</view>
		<button open-type="getUserInfo" @getuserinfo="getUser" withCredentials="true" class="indexBtn" size="mini" plain="true">开启美好生活</button>
	</view>
</template>

<script>
	//点击按钮：
	//1、如果已经授权了就直接进入
	//2、如果没有授权就跳出授权弹框
	//2.1、弹框授权成功进入页面
	//2.2、弹框授权取消不进入页面
	export default {
		components:{
			
		},
		onReady(){
			//uni.hideTabBar();
		},
		data() {
			return {
				userInfo:{
					//头像
					avatarUrl: "",
					city: "",//市
					country: "",//国
					gender: null,//男1女0
					language: "",//语言
					nickName: "",//昵称
					province: "",//省
				}
			}
		},
		created() {
			
		},
		methods: {
			getUser(){
				//1、询问授权
				//2、已经授权进入下一级页面
				//3、没有没有授权进入授权组件
				//4、同意授权进入页面，并保存授权信息
				//5、不同意授权，停留在当前页面
				let _this = this;
				
				if(_this.userInfo.nickName === ''){//判断是否授权(为空就是没有授权)，如果没有授权就弹出授权弹框
					wx.getUserInfo({
						success(res) {
							_this.userInfo.avatarUrl = res.userInfo.avatarUrl;
							_this.userInfo.city = res.userInfo.city;
							_this.userInfo.country = res.userInfo.country;
							_this.userInfo.gender = res.userInfo.gender;
							_this.userInfo.language = res.userInfo.language;
							_this.userInfo.nickName = res.userInfo.nickName;
							_this.userInfo.province = res.userInfo.province;
							
							uni.showToast({  
								title: "授权成功"
							})
							
							//授权成功后跳转进下一级页面
							 uni.switchTab({
							 	url: "../videos/videos"
							 });
							console.log('手动授权成功');
						},
						fail(err){
							console.log('手动授权失败');
							
							uni.showToast({
								mask:true,
								icon:"none",
							    title: "授权失败,将无法进入应用"
							})
						}
					});
				}else{//如果授权了，就直接进入下一级页面
					uni.switchTab({
						url: "../videos/videos"
					});
					console.log('授权了');
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		justify-content: center;
		position:fixed;
		top:0;
		right:0;
		bottom:0;
		left:0;
		background-image: url(../../static/imgs/index3.jpeg);
		background-size: cover;
		.indexText{
			font-size: 60rpx;
			margin: 120rpx auto;  
			height: 140px;  
			writing-mode: vertical-rl;
			writing-mode: tb-lr;
			color: rgba(0, 245, 243,.5);
			text-shadow: -5rpx 5rpx 0 rgba(254,24,81,.5);
			._font{
				width:80rpx;
				height:300rpx;
				margin:0 40rpx;
			}
			.top_font{
				margin-top:30rpx;
			}
			.bottom_font{
				margin-top: 60rpx;
				height:400rpx;
			}
		}
		.indexBtn{
			position:absolute;
			bottom:500rpx;
			width:400rpx;
			height:80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
