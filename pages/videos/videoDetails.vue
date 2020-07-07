<template>
	<view class="videoContent">
		<view class="videoTitle">
			<text>{{ pages.title }}</text>
		</view>
		<view class="videoImg">
			<image class="imgs" :src="pages.imgs" mode=""></image>
		</view>
		<view class="videoTest">
			　{{ pages.test }}
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			console.log(option);
			//接收参数，并查询对应详情页
		},
		data() {
			return {
				pages:{
					title:'战斗天使：阿丽塔',
					imgs:'../../static/imgs/videos/alita.jpg',
					test:`故事发生在遥远的26世纪，外科医生依德（克里斯托弗·瓦尔兹 Christoph Waltz 饰）
			在垃圾场里捡到了只剩下头部的机械少女将她带回家中，给她装上了本来为自己已故的女儿所准备的义体，
			并取名阿丽塔（罗莎·萨拉扎尔 Rosa Salazar 饰）。
			苏醒后的阿丽塔对这个五彩斑斓但却暴力而又残酷的世界产生了浓厚的兴趣，
			在结识了青年雨果（基恩·约翰逊 Keean Johnson 饰）后，
			阿丽塔开始接触名为机动球的运动，并在比赛中展现出了惊人的格斗天赋。
			　　在废铁城居民们的头顶，漂浮着巨大的浮空城市撒冷，废铁城居民们的一切劳作和付出，
			都是为了给撒冷提供继续运作的燃料。在大财阀维克特（马赫沙拉·阿里 Mahershala Ali 饰）
			所设立的机动球比赛中，最终获得冠军的人能够获得前往撒冷生活的资格，
			阿丽塔决定利用自己的格斗天赋参加比赛，却被卷入了一个巨大的阴...`
				}
			};
		}
	}
</script>

<style lang="scss" scoped>
	.videoTitle{
		font-size: $uni-font-size-lg;
		font-weight: bold;
		width:100%;
		height:80rpx;
		text-align: center;
		line-height: 80rpx;
	}
	.videoImg{
		width:100%;
		height:400rpx;
		.imgs{
			width:100%;
			height:400rpx;
		}
	}
	.videoTest{
		box-sizing: border-box;
		padding:40rpx;
	}
</style>
