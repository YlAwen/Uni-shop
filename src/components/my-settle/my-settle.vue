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
    <view class="btn-settle" @click="settlement"
      >结算 ({{ checkedCount }})</view
    >
  </view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  props: {},
  data: () => ({
    // 倒计时
    seconds: 3,
    timer: null,
  }),
  computed: {
    ...mapGetters("m_cart", ["total", "getPriceSum", "checkedCount"]),
    ...mapState("m_cart", ["cart"]),
    ...mapGetters("m_user", ["addstr"]),
    ...mapState("m_user", ["token"]),
    isFullCheck() {
      return this.total === this.checkedCount;
    },
  },
  methods: {
    ...mapMutations("m_cart", ["updateAllState"]),
    ...mapMutations("m_user", ["updateRedirectInfo"]),
    changeAllChecked() {
      this.updateAllState(!this.isFullCheck);
    },
    // 点击结算
    settlement() {
      if (!this.checkedCount) return uni.$showMsg("请选择要结算的商品！");
      if (!this.addstr) return uni.$showMsg("请选择收货地址！");
      if (!this.token) return this.delayNavigate();
      this.payOrder();
    },
    async payOrder() {
      // 1.创建订单
      const orderInfo = {
        order_price: this.getPriceSum,
        consignee_addr: this.addstr,
        goods: this.cart
          .filter((x) => x.goods_state)
          .map((x) => ({
            goods_id: x.goods_id,
            goods_number: x.goods_number,
            goods_price: x.goods_price,
          })),
      };
      // 2.发请求
      const res = await uni.$http.post(
        "/api/public/v1/my/orders/create",
        orderInfo
      );
      // console.log(res.data);
      if (res.data.meta.status !== 200) {
        return uni.$showMsg("创建订单失败！");
      }
      // 3.获得编号
      const orderNumber = res.data.message.order_number;
      // 4.获取支付信息
      const res2 = await uni.$http.post(
        "/api/public/v1/my/orders/req_unifiedorder",
        {
          order_number: orderNumber,
        }
      );
      if (res2.data.meta.status !== 200) {
        return uni.$showMsg("预付订单生成失败！");
      }
      const payOnfo = res2.data.message.pay;
      // 5.发起微信支付
      const [err, succ] = await uni.requestPayment(payOnfo);
      if (err) {
        return uni.$showMsg("订单未支付！");
      }
      const res3 = await uni.$http.post("/api/public/v1/my/orders/chkOrder", {
        order_number: orderNumber,
      });
      if (res3.data.meta.status !== 200) {
        return uni.$showMsg("订单未支付！");
      }
      uni.showToast({
        title: "订单支付完成！",
        duration: 2000,
        icon: "success",
      });
    },
    // 倒计时消息
    showTips(n) {
      uni.showToast({
        title: "请登录再结算！" + n + "秒后自动跳转到登录页",
        duration: 1500,
        icon: "none",
        mask: true,
      });
    },
    delayNavigate() {
      this.seconds = 3;
      this.showTips(this.seconds);
      this.timer = setInterval(() => {
        this.seconds--;
        this.showTips(this.seconds);
        if (this.seconds <= 0) {
          clearInterval(this.timer);
          uni.switchTab({
            url: "/pages/my/my",
            success: () => {
              this.updateRedirectInfo({
                openType: "switchTab",
                from: "/pages/cart/cart",
              });
            },
          });
        }
        return;
      }, 1000);
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
