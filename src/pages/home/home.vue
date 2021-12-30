<template>
  <view>
    <!-- 轮播图 -->
    <swiper
      class="swiper"
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
      :duration="1000"
      :circular="true"
    >
      <swiper-item v-for="(item, index) in swiperList" :key="item.goods_id">
        <view class="swiper-item">
          <navigator
            :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id"
            class="swiper-item"
          >
            <image :src="item.image_src" />
          </navigator>
        </view>
      </swiper-item>
    </swiper>
    <!-- 轮播图 -->

    <!-- 分类导航 -->
    <view class="nav-list">
      <view
        class="nav-item"
        v-for="(item, index) in navList"
        :key="index"
        @click="navClickHandler(item)"
      >
        <image class="nav-image" :src="item.image_src" mode="" />
      </view>
    </view>
    <!-- 分类导航 -->

    <!-- 楼层 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item, index) in floorList" :key="index">
        <image class="floor-title" :src="item.floor_title.image_src" />
        <view class="floor-img-box">
          <navigator :url="item.product_list[0].url" class="left-img-box">
            <image
              :src="item.product_list[0].image_src"
              :style="{ width: item.product_list[0].image_width + 'rpx' }"
              mode="widthFix"
            />
          </navigator>
          <view class="right-img-box">
            <navigator
              class="right-img-item"
              v-for="(item2, index2) in item.product_list"
              :key="index2"
              v-if="index2 !== 0"
              :url="item2.url"
            >
              <image
                :src="item2.image_src"
                mode="widthFix"
                :style="{ width: item2.image_width + 'rpx' }"
              />
            </navigator>
          </view>
        </view>
      </view>
    </view>
    <!-- 楼层 -->
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    // 轮播图数据列表
    swiperList: [],
    // 分类导航数据列表
    navList: [],
    // 楼层数据列表
    floorList: [],
  }),
  computed: {},
  methods: {
    // 获取轮播图数据
    async getSwiperList() {
      const res = await uni.$http.get("/api/public/v1/home/swiperdata");
      // console.log(res);
      // 请求失败
      if (res.data.meta.status !== 200) return uni.$showMsg();
      this.swiperList = res.data.message;
    },
    // 获取导航数据
    async getNavList() {
      const res = await uni.$http.get("/api/public/v1/home/catitems");
      // console.log(res);
      // 请求失败
      if (res.data.meta.status !== 200) return uni.$showMsg();
      this.navList = res.data.message;
    },
    // 获取楼层数据
    async getFloorList() {
      const res = await uni.$http.get("/api/public/v1/home/floordata");
      // console.log(res);
      if (res.data.meta.status !== 200) return uni.$showMsg();
      // 对数据进行处理
      res.data.message.forEach((floor) => {
        floor.product_list.forEach((prod) => {
          prod.url =
            "/subpkg/goods_list/goods_list?" + prod.navigator_url.split("?")[1];
        });
      });
      this.floorList = res.data.message;
    },
    navClickHandler(item) {
      console.log(item);
      if (item.name === "分类") {
        uni.switchTab({
          url: "/pages/cate/cate",
        });
      }
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getSwiperList();
    this.getNavList();
    this.getFloorList();
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
};
</script>

<style lang="less">
swiper {
  height: 330rpx;
  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
  .nav-image {
    width: 128rpx;
    height: 140rpx;
  }
}
.floor-title {
  width: 100%;
  height: 60rpx;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
