<template>
	<view class="musics">
		<!-- 圆形动画的显示 -->
		<view class="pageBGI" :style="{'background-image':'url('+pageBGI+')'}"></view>
		<view class="music-content" 
		:class="btnList[2].isClick === false ? 'open-animation':'stop-animation'">
			<view class="center-img" 
			:style="{'background-image':'url('+pageBGI+')'}"
			:class="btnList[2].isClick === false ? 'open-animation':'stop-animation'">
			</view>
		</view>
		
		<!-- 中间歌名信息展示 -->
		<view class="song-info">
			<view class="song_name">缘分一道桥</view>
			<view class="song_does">演唱：王力宏/范德萨范德萨范德萨</view>
			<view class="song_movie">《长城》主题曲</view>
		</view>
		
		<!-- 固定下方的按钮组件 -->
		<view class="bottom-btn-group">
			
			<view class="slider-group">
				<view class="used-time">
					{{ startTime }}
				</view>
				<progress 
					class="slider-len" 
					:percent="sliderValue" 
					:show-info="false" 
					stroke-width="3" 
					activeColor="rgba(30,30,30,0.8)"/>
				<view class="all-time">
					{{ allTime }}
				</view>
			</view>
			<view class="btn-group">
				<view
				:class="item.index === 2 ? 'img-btn-2' : item.index === 4 ? 'img-btn-4' : 'img-btn'"
				v-for="(item,index) in btnList"
				:key="item.index" 
				@click="userClick(item)">
					<image :src="item.src" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 拆分播放的时间
				times:{
					starts:0,
					time1:0,
					time2:0
				},
				//进度条时间
				sliderValue:0,
				songTime:0,//定时器已经走的时间
				intervalTime:null,
				isPlay:false,
				startTime:'0:00',
				allTime:0,
				bgAudioMannager : uni.getBackgroundAudioManager(),
				musciLen:0,
				bgmSrc:'https://win-web-nf01-sycdn.kuwo.cn/c38bb7afa2e1a93c1cf1bd55b8a8645d/5e967489/resource/n2/37/78/1135658013.mp3',
				pageBGI:require('../../static/imgs/index6.jpg'),//
				
				btnList:[
					{isClick:false,src:require('../../static/icons/musics/usual/danquxunhuan.png'),index:0},
					{isClick:false,src:require('../../static/icons/musics/usual/kuaitui.png'),index:1},
					{isClick:false,src:require('../../static/icons/musics/usual/bofang.png'),index:2},
					{isClick:false,src:require('../../static/icons/musics/usual/kuaijin.png'),index:3},
					{isClick:false,src:require('../../static/icons/musics/usual/liebiao.png'),index:4}
				]
			};
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title:options.title
			});
			
			
			//播放音乐
			this.bgAudioMannager.title = '致爱丽丝';
			this.bgAudioMannager.singer = '暂无';
			this.bgAudioMannager.coverImgUrl = '';
			this.bgAudioMannager.src = this.bgmSrc;
			this.musciLen = this.bgAudioMannager.duration;
			
			
			
		},
		onReady(){
			this.changeTime();
		},
		methods:{
			//修改歌曲总时间样式
			changeTime(){
				let time = (this.bgAudioMannager.duration/60).toFixed(2);
				this.allTime = time.replace('.',':');
				this.times.starts = 0;
				this.times.time1 = 0;
				this.times.time2 = 0;
				this.intervalTime = setInterval(()=>{
					this.times.starts++;
					this.songTime++;
					if(this.times.starts<= 59){
						if(this.times.starts < 10){
							this.times.time2 = '0'+this.times.starts;
						}else{
							this.times.time2 = this.times.starts;
						}
					}else{
						this.times.time1++;
						this.times.time2 = '00';
						this.times.starts = '00';
					}
					this.startTime = this.times.time1+':'+this.times.time2;
					this.sliderValue = (this.songTime/this.bgAudioMannager.duration)*100;
				},1000);
			},
			userClick(item){
				if(item.index === 2){
					if(item.isClick === false){
						this.btnList[2].src = require('../../static/icons/musics/usual/zanting.png');
						this.btnList[2].isClick = true;
						//暂停音乐
						this.bgAudioMannager.pause();
						this.isPlay = true;
						clearInterval(this.intervalTime);
						
					}else{
						this.btnList[2].src = require('../../static/icons/musics/usual/bofang.png');
						this.btnList[2].isClick = false;
						//播放音乐
						this.bgAudioMannager.play();
						this.isPlay = true;
						
						this.times.time1 = this.startTime.split(':')[0];
						this.times.time2 = this.startTime.split(':')[1];
						this.intervalTime = setInterval(()=>{
							this.times.starts++;
							this.songTime++;
							if(this.times.starts<= 59){
								if(this.times.starts < 10){
									this.times.time2 = '0'+this.times.starts;
								}else{
									this.times.time2 = this.times.starts;
								}
							}else{
								this.times.time1++;
								this.times.time2 = '00';
								this.times.starts = '00';
							}
							this.startTime = this.times.time1+':'+this.times.time2;
							this.sliderValue = (this.songTime/this.bgAudioMannager.duration)*100;
						},1000);
					}
				}
				this.$forceUpdate();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.musics{
		position:relative;
		.pageBGI{
			position:absolute;
			z-index:1;
			width:100vw;
			height:100vh;
			height:100vh;
			background-size: 160%;
			background-position: 50%;
			background-repeat: no-repeat;
			filter:blur(100px);
		}
		.music-content{
			position:absolute;
			left:23vw;
			top:20vw;
			z-index:10;
			// box-sizing: border-box; 
			padding:10rpx;
			width:54vw;
			height:54vw;
			border:1px solid red;
			border-radius:50%;
			animation: shadows 10s linear infinite;
			.center-img{
				width:100%;
				height:100%;
				border-radius:50%;
				background-size: cover;
				animation: imgScale 10s linear infinite;
			}
		}
		.stop-animation{
			animation-play-state:paused;
		}
		.open-animation{
			animation-play-state:running;
		}
	}
	
	.song-info{
		position:absolute;
		width:100%;
		top:60vh;
		display: flex;
		z-index:10;
		flex-direction:column;
		view{
			text-align: center;
			color:#C0C0C0;
			margin-bottom:10px;
		}
		.song_name{
			font-size: 40rpx;
		}
		.song_does{
			font-size: 26rpx;
		}
		.song_movie{
			font-size: 26rpx;
		}
	}
	
	.slider-group{
		display: flex;
		justify-content:space-around;
		align-items:center;
		.slider-len{
			width:66vw;
			margin-left:0;
			margin-right:0;
		}
		.all-time,.used-time{
			width:16vw;
			text-align: center;
		}
	}
	.bottom-btn-group{
		display: flex;
		justify-content: center;
		flex-direction: column;
		position:fixed;
		bottom:0;
		width:100%;
		height:26vw;
		z-index:10;
	}
	.btn-group{
		box-sizing: border-box;
		padding:0 40rpx;
		display:flex;
		justify-content: space-between;
		align-items:center;
		margin-top:5px;
		.img-btn{
			width:60rpx;
			height:60rpx;
			image{
				width:100%;
				height:100%;
			}
		}
		.img-btn-4{
			width:50rpx;
			height:50rpx;
			image{
				width:100%;
				height:100%;
			}
		}
		.img-btn-2{
			width:80rpx;
			height:80rpx;
			image{
				width:100%;
				height:100%;
			}
		}
	}
	@keyframes imgScale{
		0% {transform: rotate(0deg)}
		100% {transform: rotate(360deg)}
	}
	@keyframes shadows{
		0% { transform: scale(1);box-shadow: 0 0 1px red;}
		50%{ transform: scale(1.2);box-shadow:0 0 20px red;}
		100% { transform: scale(1);box-shadow: 0 0 1px red;}
	}
</style>
