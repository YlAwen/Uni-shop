<template>
  <view v-if="goods_info.goods_price" class="goods_detail">
    <!-- 轮播图 -->
    <swiper
      class="swiper"
      :indicator-dots="true"
      autoplay
      :interval="3000"
      :duration="1000"
      :circular="true"
    >
      <swiper-item v-for="(item, index) in goods_info.pics" :key="index">
        <image :src="item.pics_big" mode="" @click="preview(index)" />
      </swiper-item>
    </swiper>
    <!-- 轮播图 -->

    <!-- 商品信息 -->
    <view class="goods-info-box">
      <!-- 价格 -->
      <view class="price">￥{{ goods_info.goods_price }}</view>
      <!-- 主体 -->
      <view class="goods-info-body">
        <view class="goods-name">{{ goods_info.goods_name }}</view>
        <view class="favi">
          <van-icon name="star-o" size="18" color="gray" />
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递：免运费</view>
    </view>
    <!-- 商品信息 -->

    <view>
      <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    </view>

    <!-- 商品导航 -->
    <view class="goods_nav">
      <van-goods-action>
        <van-goods-action-icon icon="shop-o" text="店铺" @click="goto" />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          @click="gotoCart"
          :info="cartNum"
        />
        <van-goods-action-button
          text="加入购物车"
          type="warning"
          @click="btnClick"
        />
        <van-goods-action-button text="立即购买" />
      </van-goods-action>
    </view>
    <!-- 商品导航 -->
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  components: {},
  data: () => ({
    goods_info: {},
    show: false,
    // picIndex: 0,
  }),
  computed: {
    ...mapState("m_cart", ["cart"]),
    cartNum: function () {
      return this.cart.length ? this.cart.length : "";
    },
  },
  methods: {
    ...mapMutations("m_cart", ["addToCart"]),
    // 获取数据
    async getGoodsDetail(goods_id) {
      const res = await uni.$http.get("/api/public/v1/goods/detail", {
        goods_id,
      });
      // console.log(res);
      if (res.data.meta.status !== 200) return uni.$showMsg();
      res.data.message.goods_introduce = res.data.message.goods_introduce
        .replace(/<img /g, '<img style="display:block;" ')
        .replace(/.webp/g, ".jpg");
      this.goods_info = res.data.message;
    },
    // 大图展示
    preview(i) {
      uni.previewImage({
        urls: this.goods_info.pics.map((x) => x.pics_big),
        current: i,
        loop: true,
      });
    },
    // 导航到购物车
    gotoCart() {
      uni.switchTab({
        url: "/pages/cart/cart",
      });
    },
    btnClick() {
      const goods = {
        goods_id: this.goods_info.goods_id,
        goods_name: this.goods_info.goods_name,
        goods_price: this.goods_info.goods_price,
        goods_count: 1,
        goods_small_logo: this.goods_info.goods_small_logo,
        goods_state: true,
      };
      this.addToCart(goods);
    },
    goto() {
      console.log(2);
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    const goods_id = options.goods_id;
    this.getGoodsDetail(goods_id);
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
  height: 750rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #0f0f0f;
  .swiper {
    width: 100%;
  }
}
.goods-info-box {
  padding: 10px;
  padding-right: 0;
  .price {
    color: #c00000;
    font-size: 18px;
    margin: 10px 0;
  }
  .goods-info-body {
    display: flex;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
      margin-right: 10px;
    }
    .favi {
      width: 120px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #efefef;
      color: gray;
    }
  }
  .yf {
    font-size: 12px;
    color: gray;
    margin: 10px 0;
  }
}
.goods_detail {
  padding-bottom: 50px;
}
</style>
