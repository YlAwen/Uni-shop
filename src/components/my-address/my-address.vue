<template>
  <view>
    <!-- 收货地址 -->
    <view class="address-box" v-if="JSON.stringify(address) === '{}'">
      <button
        type="primary"
        size="mini"
        class="btnAddress"
        @click="chooseAddress"
      >
        请选择收货地址+
      </button>
    </view>
    <!-- 收货地址 -->

    <!-- 收货信息 -->
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：{{ address.userName }}</view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：{{ address.telNumber }}</view>
          <van-icon name="arrow" size="16" />
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{ addstr }}</view>
      </view>
    </view>
    <!-- 收货信息 -->

    <!-- 边框线 -->
    <image
      src="../../static/cart_border@2x.png"
      mode=""
      class="address-border"
    />
    <!-- 边框线 -->
  </view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  props: {},
  data: () => ({}),
  computed: {
    ...mapState("m_user", ["address"]),
    ...mapGetters("m_user", ["addstr"]),
  },
  methods: {
    ...mapMutations("m_user", ["updateAddress"]),
    async chooseAddress() {
      const [err, succ] = await uni.chooseAddress().catch((err) => err);
      // console.log(succ);
      if (err === null && succ.errMsg === "chooseAddress:ok") {
        this.updateAddress(succ);
      }
      if (err && err.errMsg === "chooseAddress:fail auth deny") {
        this.reAuth();
      }
      if (err && err.errMsg === "chooseAddress:fail authorize no response") {
        this.reAuth();
      }
    },
    reAuth() {
      uni.showModal({
        content: "检测到您没打开地址权限，是否去设置打开？",
        success: function (res) {
          if (res.confirm) {
            uni.openSetting({
              success: (r) => {
                if (r.authSetting["scope.address"])
                  return uni.$showMsg("授权成功！请选择地址");
                if (!r.authSetting["scope.address"])
                  return uni.$showMsg("您取消了地址授权！");
              },
            });
          } else if (res.cancel) {
            return uni.$showMsg("您取消了地址授权！");
          }
        },
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
.address-border {
  display: block;
  width: 100%;
  height: 5px;
}
.address-box {
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.address-info-box {
  font-size: 12px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5px;
  .row1 {
    display: flex;
    justify-content: space-between;
    .row1-left {
      .username {
      }
    }
    .row1-right {
      display: flex;
      justify-content: space-between;
      .phone {
      }
    }
  }
  .row2 {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .row2-left {
      white-space: nowrap;
    }
    .row2-right {
    }
  }
}
</style>
