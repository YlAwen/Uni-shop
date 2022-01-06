<template>
  <view>
    <!-- 自定义搜索组件 -->
    <my-search @click="gotoSearch"></my-search>
    <!-- 自定义搜索组件 -->

    <!-- 滑动区 -->
    <view class="scroll-view-container">
      <!-- 左 -->
      <scroll-view
        scroll-y="true"
        :style="{ height: wh + 'px' }"
        class="left-scroll-view"
      >
        <block v-for="(item, i) in cateList" :key="i">
          <view
            :class="['left-scroll-view-item', i === active ? 'active' : '']"
            @click="activeChange(i)"
            >{{ item.cat_name }}</view
          >
        </block>
      </scroll-view>
      <!-- 右 -->
      <scroll-view
        scroll-y="true"
        :style="{ height: wh + 'px' }"
        :scroll-top="scrollTop"
      >
        <view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
          <!-- 标题 -->
          <view class="cate-lv2-title">/{{ item2.cat_name }}/</view>
          <view class="cate-lv3-list">
            <view
              class="cate-lv3-item"
              v-for="(item3, i3) in item2.children"
              :key="i3"
              @click="gotoGoodsList(item3)"
            >
              <image :src="item3.cat_icon" mode="" />
              <text>{{ item3.cat_name }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <!-- 滑动区 -->
  </view>
</template>

<script>
import badgeMin from "@/mixins/tabbar-badge.js";
export default {
  components: {},
  mixins: [badgeMin],

  data: () => ({
    // 当前设备可用高度
    wh: 0,
    cateList: [],
    active: 0,
    cateLevel2: [],
    scrollTop: 0,
  }),
  computed: {},
  methods: {
    async getCateList() {
      const res = await uni.$http.get("/api/public/v1/categories");
      // console.log(res);
      if (res.data.meta.status !== 200) return uni.$showMsg();
      this.cateList = res.data.message;
      this.cateLevel2 = this.cateList[this.active].children;
    },
    activeChange(i) {
      this.active = i;
      this.cateLevel2 = this.cateList[i].children;
      this.scrollTop = this.scrollTop === 0 ? 1 : 0;
    },
    gotoGoodsList(item) {
      uni.navigateTo({
        url: "/subpkg/goods_list/goods_list?cid=" + item.cat_id,
      });
    },
    gotoSearch() {
      uni.navigateTo({
        url: "/subpkg/search/search",
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    const res = uni.getSystemInfoSync();
    // console.log(res.windowHeight);
    this.wh = res.windowHeight - 50;
    this.getCateList();
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
.scroll-view-container {
  display: flex;
  .left-scroll-view {
    width: 120px;
    .left-scroll-view-item {
      background-color: #f7f7f7;
      line-height: 60px;
      text-align: center;
      font-size: 12px;
      &.active {
        background-color: #fff;
        position: relative;
        &::before {
          content: "";
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
}
.cate-lv2-title {
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  padding: 15px 0;
}
.cate-lv3-list {
  display: flex;
  flex-wrap: wrap;
  .cate-lv3-item {
    width: 33.33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    image {
      width: 60px;
      height: 60px;
    }
    text {
      font-size: 12px;
    }
  }
}
</style>
