<template>
  <view class="my-userinfo">
    <!-- 头像昵称 -->
    <view class="top-box">
      <image :src="userinfo.userInfo.avatarUrl" mode="" class="avatar" />
      <view class="nickname">{{ userinfo.userInfo.nickName }}</view>
    </view>

    <!-- 面板 -->
    <view class="pannel-list">
      <!-- 第一个 -->
      <view class="pannel">
        <view class="pannel-body">
          <view class="pannel-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view>
          <view class="pannel-item">
            <text>14</text>
            <text>收藏的商品</text>
          </view>
          <view class="pannel-item">
            <text>18</text>
            <text>关注的商品</text>
          </view>
          <view class="pannel-item">
            <text>84</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
      <!-- 第二个 -->
      <view class="pannel">
        <view class="pannel-title">我的订单</view>
        <view class="pannel-body">
          <view class="pannel-item">
            <image src="../../static/my-icons/icon1.png" class="icon" />
            <text>待付款</text>
          </view>
          <view class="pannel-item">
            <image src="../../static/my-icons/icon2.png" class="icon" />
            <text>待收货</text>
          </view>
          <view class="pannel-item">
            <image src="../../static/my-icons/icon3.png" class="icon" />
            <text>退款/退货</text>
          </view>
          <view class="pannel-item">
            <image src="../../static/my-icons/icon4.png" class="icon" />
            <text>全部订单</text>
          </view>
        </view>
      </view>
      <!-- 第三个 -->
      <view class="pannel">
        <view class="pannel-list-item">
          <text>收货地址</text>
          <van-icon name="arrow" size="15" />
        </view>
        <view class="pannel-list-item">
          <text>联系客服</text>
          <van-icon name="arrow" size="15" />
        </view>
        <view class="pannel-list-item" @click="logout">
          <text>退出登录</text>
          <van-icon name="arrow" size="15" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: {},
  data: () => ({}),
  computed: {
    ...mapState("m_user", ["userinfo"]),
  },
  methods: {
    ...mapMutations("m_user", [
      "updateToken",
      "updateAddress",
      "updateUserInfo",
    ]),
    async logout() {
      const [err, succ] = await uni.showModal({
        content: "确认退出登录吗？",
      });
      if (succ && succ.confirm) {
        this.updateToken("");
        this.updateAddress({});
        this.updateUserInfo({});
      }
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
.pannel-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  padding: 0 10px;
  height: 45px;
}

.pannel-list {
  padding: 0 10px;
  position: relative;
  top: -10px;
  .pannel {
    background-color: #fff;
    border-radius: 3px;
    margin-bottom: 8px;
    .pannel-title {
      line-height: 45px;
      padding-left: 10px;
      font-size: 15px;
      border-bottom: 1px solid #f4f4f4;
    }
    .pannel-body {
      display: flex;
      justify-content: space-around;
      .pannel-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        padding: 10px 0;
        .icon {
          width: 35px;
          height: 35px;
        }
      }
    }
  }
}
.my-userinfo {
  height: 100%;
  background-color: #f4f4f4;
  .top-box {
    height: 400rpx;
    background-color: #c00000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .avatar {
      width: 90px;
      height: 90px;
      border-radius: 45px;
      border: 2px solid #fff;
      box-shadow: 0 1px 5px black;
    }
    .nickname {
      font-size: 16px;
      color: #fff;
      font-weight: 700;
      margin-top: 10px;
    }
  }
}
</style>
