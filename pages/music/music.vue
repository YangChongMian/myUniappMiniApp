<template>
	<view class="pageContent">
		<!-- 标题选项 -->
		<view class="typeContent">
			<text 
				v-for="(item,index) in musicType" 
				:key="index"
				@click="titleClick(item,index)"
				:class="musicActive === index ?'page_top_active':''">
					{{ item }}
			</text>
		</view>
		<!-- 轮播图 -->
		<view class="uni-padding-wrap swiper-radius">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item>
							<view class="swiper-item uni-bg-red">
								<image class="swiperImg" src="../../static/imgs/videos/alita.jpg" mode=""></image>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item uni-bg-green">
								<image class="swiperImg" src="../../static/imgs/videos/yewen.jpg" mode=""></image>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item uni-bg-blue">
								<image class="swiperImg" src="../../static/imgs/videos/langshaonian.jpg" mode=""></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<!-- 列表概览 -->
		<view class="lists" v-for="(item,index) in musicList" :key="index">
			<view class="list-top">
				<text class="list-title">{{ item.title }}</text>
				<text @click="playMusic(item.title,item.index)" class="list-all-play">
					全部播放
				</text>
			</view>
			<view class="list-content" v-for="(items,indexs) in item.typeList" :key="indexs">
				<view class="list-img-content">
					<image class="list-img" :src="items.url" mode=""></image>
				</view>
				<view class="list-names">
					<text>{{ items.name }}</text>
					<text>目前热度:{{ items.hotNum }}</text>
				</view>
				<view class="list-play-btn" @click="playMusic(items.name,items.indexs)">
					<image class="list-play" src="../../static/imgs/musics/playMusic.png" mode=""></image>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				musicType:['热门','经典','纯音乐','DJ','民歌','BGM'],
				musicActive:0,
				
				musicList:[
					{
						title:'温柔岁月的华语情怀',
						index:'0',
						typeList:[
							{
								url:'../../static/imgs/index6.jpg',
								name:'歌名',
								indexs:'0-1',
								hotNum:'360W'
							},
							{
								url:'../../static/imgs/index6.jpg',
								name:'歌名',
								indexs:'0-2',
								hotNum:'360W'
							},
							{
								url:'../../static/imgs/index6.jpg',
								name:'歌名',
								indexs:'0-3',
								hotNum:'360W'
							}
						]
					}
				],
				
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			};
		},
		methods:{
			titleClick(item,index){
				console.log(item,index);
				this.musicActive = index;
			},
			//携带参数跳转到播放页面
			playMusic(item,index){
				console.log(item,index);
				uni.navigateTo({
				    url: `../../pages/music/playMusic?title=${ item }&index=${ index }`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pageContent{
		box-sizing: border-box;
		padding:16rpx;
		padding-top:0;
		.swiper-radius{
			border-radius:14rpx;
			overflow: hidden;
		}
	}
	.typeContent{
		display: flex;
		height:50px;
		line-height: 50px;
		text{
			display: inline-block;
			text-align: center;
			width:100/6*100%;
		}
	}
	.swiper-item{
		overflow: hidden;
		.swiperImg{
			width:100%;
		}
	}
	.page_top_active{
		font-weight: bold;
		color:#1BA035;
	}
	.lists{
		margin-top: 50px;
		.list-top{
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding-right:20rpx;
			margin-bottom: 10px;
			.list-title{
				font-weight:bold
			}
			.list-all-play{
				display: inline-block;
				font-size: $uni-font-size-sm;
				border:1px solid #3C3E49;
				box-sizing: border-box;
				padding:6rpx 14rpx;
				border-radius: 50rpx;
			}
		}
		.list-content{
			display:flex;
			margin:10rpx 0; 
			.list-img-content{
				width:120rpx;
				height:120rpx;
				border-radius:10rpx;
				overflow:hidden;
				margin-right:18rpx;
				.list-img{
					width:100%;
					height:100%
				}
			}
			.list-names{
				display:flex;
				flex-direction:column;
				justify-content:flex-end;
				width:440rpx;
			}
			.list-play-btn{
				width:100rpx;
				height:100rpx;
				.list-play{
					width:100%;
					height:100%;
				}
			}
		}
	}
	
</style>
