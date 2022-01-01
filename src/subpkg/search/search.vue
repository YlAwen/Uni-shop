<template>
  <view>
    <!-- 搜索框 -->
    <view class="search-box">
      <van-search
        @change="change"
        background="#c00000"
        placeholder="请输入搜索关键词"
        shape="round"
        focus
      />
    </view>
    <!-- 搜索框 -->

    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResults.length !== 0">
      <view
        class="sugg-item"
        v-for="(item, index) in searchResults"
        :key="item.goods_id"
        @click="gotoDetail(item.goods_id)"
      >
        <view class="goods-name">{{ item.goods_name }}</view>
        <van-icon name="arrow" size="16" />
      </view>
    </view>
    <!-- 搜索建议列表 -->

    <!-- 搜索历史 -->
    <view class="histroy-box" v-if="searchResults.length === 0">
      <!-- 标题 -->
      <view class="histroy-title">
        <text>搜索历史</text>
        <van-icon name="delete-o" size="17" @click="clean" />
      </view>
      <!-- 列表 -->
      <view class="histroy-list">
        <view
          v-for="(item, index) in historyList"
          :key="index"
          @click="gotoGoodsList(item)"
        >
          <van-tag size="large" color="#efefef" text-color="#000">{{
            item
          }}</van-tag>
        </view>
      </view>
    </view>
    <!-- 搜索历史 -->
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    timer: null,
    kw: "",
    searchResults: [],
    historyList: [],
    value: "",
  }),
  computed: {},
  methods: {
    change(e) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        // console.log(e.detail);
        this.kw = e.detail;
        this.getSearchList();
      }, 500);
    },
    // 获取搜索列表
    async getSearchList() {
      if (this.kw.trim().length === 0) {
        this.searchResults = [];
        return;
      }
      const res = await uni.$http.get("/api/public/v1/goods/qsearch", {
        query: this.kw,
      });
      // console.log(res);
      if (res.data.meta.status !== 200) return uni.$showMsg();
      this.searchResults = res.data.message;
      this.saveSearchHistory();
      if (res.data.message.length === 0) {
        uni.showToast({
          title: "没有搜索结果！",
          duration: 1000,
          icon: "error",
        });
      }
    },
    // 导航跳转
    gotoDetail(id) {
      uni.navigateTo({
        url: `/subpkg/goods_detail/goods_detail?goods_id=${id}`,
      });
    },
    // 保存搜索历史
    saveSearchHistory() {
      if (this.historyList.indexOf(this.kw) !== -1) return;
      this.historyList.unshift(this.kw);
      uni.setStorageSync("kw", JSON.stringify(this.historyList));
    },
    // 清空搜索记录
    clean() {
      this.historyList = [];
      uni.setStorageSync("kw", "[]");
      uni.showToast({
        title: "删除成功！",
        duration: 1000,
      });
    },
    // 导航跳转
    gotoGoodsList(item) {
      uni.navigateTo({
        url: "/subpkg/goods_list/goods_list?query=" + item,
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.historyList = JSON.parse(uni.getStorageSync("kw") || "[]");
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
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
.sugg-list {
  padding: 0 5px;

  .sugg-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    .goods-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.histroy-box {
  padding: 0 5px;
  .histroy-title {
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }
  .histroy-list {
    display: flex;
    flex-wrap: wrap;
    .van-tag {
      margin: 5px 5px 0 0;
    }
  }
}
</style>
