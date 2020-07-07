<template>
	<view>
		<!-- 轮播图 -->
		<view class="uni-padding-wrap">
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
		
		<!-- 电影分类 -->
		<scroll-view class="videoType"
		 :scroll-x="true"
		 :show-scrollbar="false">
			<view
			 class="tags"
			 v-for="(item,index) in tagList"
			 :key="index"
			 @click="clickTag(item,index)"
			 :class="index === tagIndex ? 'tag_avtive' : ''">
				{{ item }}
			</view>
		</scroll-view>
		
		<!-- 电影列表 -->
		<view class="lists">
			<view class="listContent" @click="goVideoDetail(1)" :style="{'background-image':'url(../../static/imgs/videos/1.jpg)'}">
				<view class="names">
					火星救援
				</view>
			</view>
			<view class="listContent" :style="{'background-image':'url(../../static/imgs/videos/2.jpg)'}">
				<view class="names">
					新警察故事
				</view>
			</view>
			<view class="listContent" :style="{'background-image':'url(../../static/imgs/videos/3.jpg)'}">
				<view class="names">
					头脑风暴
				</view>
			</view>
			<view class="listContent" :style="{'background-image':'url(../../static/imgs/videos/3.jpg)'}">
				<view class="names">
					头脑风暴
				</view>
			</view>
			<view class="listContent" :style="{'background-image':'url(../../static/imgs/videos/1.jpg)'}">
				<view class="names">
					火星救援
				</view>
			</view>
			<view class="listContent" :style="{'background-image':'url(../../static/imgs/videos/2.jpg)'}">
				<view class="names">
					新警察故事
				</view>
			</view>
			<view class="listContent" :style="{'background-image':'url(../../static/imgs/videos/1.jpg)'}">
				<view class="names">
					火星救援
				</view>
			</view>
			<view class="listContent" :style="{'background-image':'url(../../static/imgs/videos/2.jpg)'}">
				<view class="names">
					新警察故事
				</view>
			</view>
			<view class="listContent" :style="{'background-image':'url(../../static/imgs/videos/3.jpg)'}">
				<view class="names">
					头脑风暴
				</view>
			</view>
			<view class="listContent" :style="{'background-image':'url(../../static/imgs/videos/1.jpg)'}">
				<view class="names">
					火星救援
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
				tagList:['动作','科幻魔幻','爱情','战争枪战','灾难','恐怖惊悚','喜剧','悬疑犯罪','动画'],
	            tagIndex:0,
				
				
				background: ['color1', 'color2', 'color3'],
	            indicatorDots: true,
	            autoplay: true,
	            interval: 2000,
	            duration: 500
	        }
	    },
	    methods: {
			goVideoDetail(name){
				console.log(name);
				uni.navigateTo({
				    url: '../../pages/videos/videoDetails?name='+name
				});
			},
			clickTag(item,index){
				console.log(item,index);
				this.tagIndex = index;
			}
	        /* changeIndicatorDots(e) {
	            this.indicatorDots = !this.indicatorDots
	        },
	        changeAutoplay(e) {
	            this.autoplay = !this.autoplay
	        },
	        intervalChange(e) {
	            this.interval = e.target.value
	        },
	        durationChange(e) {
	            this.duration = e.target.value
	        } */
	    }
	}
</script>

<style lang="scss" scoped>
	.swiper-item{
		.swiperImg{
			width:100%;
		}
	}
	.videoType{
		height:40px;
		background-color: #f8f8f8;
		display: flex;
		align-items:center;
		justify-content: center;
		white-space: nowrap;
		.tags{
			display: inline-block;
			border-bottom:2px solid transparent;
			margin:0 $uni-spacing-row-base;
			padding:4px 2px;
			transition: all linear 0.1s;
		}
		.tag_avtive{
			border-bottom:2px solid #1BA035;
			color:#1BA035;
		}
	}
	.lists{
		display: flex;
		flex-wrap:wrap;
		.listContent{
			width:30%;
			margin:1.6%;
			height:340rpx;
			background-size: 100% 100%;
			.names{
				box-sizing: border-box;
				width:100%;
				height:340rpx;
				line-height: 340rpx;
				text-align: center;
				background-color: rgba(40,44,53,0.6);
				color:#F8F8F8;
				font-weight: bold;
			}
			.imgs{
				width:100%;
				height:340rpx;
			}
		}
	}
</style>
