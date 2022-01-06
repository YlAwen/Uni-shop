<template>
  <view class="goods-item">
    <!-- 左 -->
    <view class="goods-item-left">
      <radio
        :checked="goods.goods_state"
        color="#c00000"
        v-if="showRadio"
        @click="radioChange"
      ></radio>
      <image
        :src="goods.goods_small_logo || defaultPic"
        mode=""
        class="goods-pic"
      />
    </view>
    <!-- 左 -->

    <!-- 右 -->
    <view class="goods-item-right">
      <view class="goods-name">{{ goods.goods_name }}</view>
      <view class="goods-info-box">
        <view class="goods-price">￥{{ newPrice(goods.goods_price) }}</view>
        <van-stepper
          v-if="showStepper"
          :value="goods.goods_count"
          @change="onChange"
          integer
          max="10"
        />
      </view>
    </view>
    <!-- 右 -->
  </view>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default: {},
    },
    showRadio: {
      type: Boolean,
      default: false,
    },
    showStepper: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    // 默认图片
    defaultPic:
      "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png",
  }),
  computed: {},
  methods: {
    newPrice(val) {
      return Number(val).toFixed(2);
    },
    radioChange() {
      this.$emit("radio-change", {
        goods_id: this.goods.goods_id,
        goods_state: this.goods.goods_state,
      });
    },
    onChange(e) {
      this.$emit("num-change", {
        goods_id: this.goods.goods_id,
        goods_count: e.detail,
      });
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
</script>

<style lang="less">
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;
  .goods-item-left {
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .goods-item-right {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
    }
    .goods-info-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .goods-price {
        color: #c00000;
        font-size: 16px;
      }
    }
  }
}
</style>
