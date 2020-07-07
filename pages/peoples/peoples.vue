<template>
	<view>
		<view
			v-for="item in videoList" 
			:key="item.index">
			<video
				:id="'myVideo'+item.index"
				@play="playVideo(item)"
				class="videos" 
				show-center-play-btn="true"
				controls="'plays' === true ? false : true"
				:src="item.src">
					<cover-view class="moda" 
						v-if="plays === true" 
						@click="stopPlay(thisItem)">
					</cover-view>
			</video>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoContext:null,
				plays:false,
				thisItem:null,
				videoList:[
					{
						src: 'https://img-cdn-qiniu.dcloud.net.cn/hello-nvue-swiper-vertical-01.mp4',name:'视频1',isPlay:false,index:0
					},
					{
						src: 'https://img-cdn-qiniu.dcloud.net.cn/hello-nvue-swiper-vertical-02.mp4',name:'视频2',isPlay:false,index:1
					},
					{
						src: 'https://img-cdn-qiniu.dcloud.net.cn/hello-nvue-swiper-vertical-03.mp4',name:'视频3',isPlay:false,index:2
					},
					{
						src: 'https://img-cdn-qiniu.dcloud.net.cn/hello-nvue-swiper-vertical-01.mp4',name:'视频4',isPlay:false,index:3
					},
					{
						src: 'https://img-cdn-qiniu.dcloud.net.cn/hello-nvue-swiper-vertical-02.mp4',name:'视频5',isPlay:false,index:4
					},
					{
						src: 'https://img-cdn-qiniu.dcloud.net.cn/hello-nvue-swiper-vertical-03.mp4',name:'视频6',isPlay:false,index:5
					},
				],
				fills:'fill'
			}
		},
		methods:{
			playVideo(item){
				this.thisItem = item;
				console.log(this.plays,'全屏');
				if(this.plays === false){
					// 获取 video 上下文 videoContext 对象
					this.videoContext = uni.createVideoContext('myVideo'+item.index);
					// // 进入全屏状态
					this.videoContext.requestFullScreen({direction:0});
				}
				this.plays = true;
			},
			stopPlay(item){
				console.log(this.plays,'退出全屏');
				if(this.plays === true){
					this.videoContext = uni.createVideoContext('myVideo'+item.index);
					// 暂停播放
					this.videoContext.pause();
					// 退出全屏状态
					this.videoContext.exitFullScreen();
				}
				this.plays = false;
			}
		}
	}
</script>

<style lang="scss">
	.videos{
		width:100%;
	}
	.moda{
		width:100vw;
		height:100vh;
		opacity: 0;
		position:fixed;
		top:0;
		left:0;
	}
</style>
