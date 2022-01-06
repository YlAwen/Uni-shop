<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <!-- 收货地址 -->
    <my-address></my-address>
    <!-- 收货地址 -->

    <!-- 标题 -->
    <view class="cart-title">
      <van-icon name="shop-o" size="18" />
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 标题 -->

    <!-- 商品信息 -->
    <block v-for="(item, index) in cart" :key="index">
      <van-swipe-cell right-width="65">
        <my-goods
          :goods="item"
          :showRadio="true"
          :showStepper="true"
          @radio-change="radioChangeHandler"
          @num-change="numChangeHandler"
        ></my-goods>
        <view @click="onCloseGoods(item)" slot="right" class="closeBtn"
          >删除</view
        >
      </van-swipe-cell>
    </block>
    <!-- 商品信息 -->

    <!-- 结算组件 -->
    <my-settle></my-settle>
  </view>
  <view class="cart-empty" v-else>
    <image
      class="cart-empty-img"
      src="../../static/cart_empty@2x.png"
      mode=""
    />
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import badgeMin from "@/mixins/tabbar-badge.js";
export default {
  components: {},
  data: () => ({}),
  computed: {
    ...mapState("m_cart", ["cart"]),
  },
  methods: {
    ...mapMutations("m_cart", [
      "updateGoodsState",
      "updateGoodsCount",
      "updateGoodsList",
    ]),
    radioChangeHandler(val) {
      this.updateGoodsState(val);
    },
    numChangeHandler(val) {
      // console.log(val);
      this.updateGoodsCount(val);
    },
    onCloseGoods(item) {
      // console.log(item);
      this.updateGoodsList(item);
    },
  },
  watch: {},
  mixins: [badgeMin],

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.setBadge();
  },
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
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    font-size: 14px;
    margin-left: 10px;
  }
}
.closeBtn {
  background-color: #c00000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 100%;
}
.cart-container {
  padding-bottom: 50px;
}
.cart-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 150px;
  .cart-empty-img {
    width: 90px;
    height: 90px;
  }
  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
