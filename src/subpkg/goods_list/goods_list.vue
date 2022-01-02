<template>
  <view>
    <view class="goods-list">
      <view
        v-for="(item, index) in goodsList"
        :key="index"
        @click="gotoDetail(item)"
      >
        <my-goods :goods="item"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    // 请求参数对象
    queryObj: {
      query: "",
      cid: "",
      pagenum: 1,
    },
    goodsList: [],
    total: 0,
    isLoading: false,
  }),
  computed: {},
  methods: {
    // 获取商品列表数据
    async getGoodsList(cb) {
      this.isLoading = true;
      const res = await uni.$http.get(
        "/api/public/v1/goods/search",
        this.queryObj
      );
      // console.log(res);
      this.isLoading = false;
      cb && cb();
      if (res.data.meta.status !== 200) {
        return setTimeout(() => {
          uni.$showMsg();
        }, 100);
      }
      this.goodsList = [...this.goodsList, ...res.data.message.goods];
      this.total = res.data.message.total;
      this.queryObj.pagenum++;
    },
    gotoDetail(item) {
      uni.navigateTo({
        url: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id,
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.queryObj.query = options.query || "";
    this.queryObj.cid = options.cid || "";
    this.getGoodsList();
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
    this.queryObj.pagenum = 1;
    this.total = 0;
    this.isLoading = false;
    this.goodsList = [];
    this.getGoodsList(() => {
      uni.stopPullDownRefresh();
    });
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {
    if (this.total === this.goodsList.length) {
      return uni.$showMsg("数据加载完毕！");
    }
    if (this.isLoading) return;

    this.getGoodsList();
  },
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
};
</script>

<style lang="less"></style>
