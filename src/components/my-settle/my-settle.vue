<template>
  <view class="my-settle">
    <!-- 全选 -->
    <label class="radio">
      <radio color="#c00000" :checked="isFullCheck" @click="changeAllChecked" />
      <text>全选</text>
    </label>
    <!-- 合计 -->
    <view class="amount-box">
      合计：<text class="amout">￥{{ getPriceSum }}</text>
    </view>
    <!-- 结算 -->
    <view class="btn-settle">结算 ({{ checkedCount }})</view>
  </view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  props: {},
  data: () => ({}),
  computed: {
    ...mapGetters("m_cart", ["total", "getPriceSum", "checkedCount"]),
    ...mapState("m_cart", ["cart"]),
    isFullCheck() {
      return this.total === this.checkedCount;
    },
  },
  methods: {
    ...mapMutations("m_cart", ["updateAllState"]),
    changeAllChecked() {
      this.updateAllState(!this.isFullCheck);
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
.my-settle {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  font-size: 14px;
  padding-left: 5px;
  .radio {
    display: flex;
    align-items: center;
  }
  .amount-box {
    .amout {
      color: #c00000;
      font-weight: 700;
    }
  }
  .btn-settle {
    background-color: #c00000;
    color: #fff;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    text-align: center;
    min-width: 100px;
  }
}
</style>
