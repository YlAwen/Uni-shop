<template>
  <view class="login">
    <van-icon name="user-circle-o" size="100" color="#afafaf" />
    <button type="primary" class="btn-login" @click="getUserInfo">
      一键登录
    </button>
    <text class="tips-text">登陆后尽享更多权益</text>
  </view>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: {},
  data: () => ({}),
  computed: {
    ...mapState("m_user", ["redirectInfo"]),
  },
  methods: {
    ...mapMutations("m_user", [
      "updateUserInfo",
      "updateToken",
      "updateRedirectInfo",
    ]),
    async getUserInfo() {
      const [err, succ] = await uni.getUserProfile({
        desc: "登录授权",
      });
      if (err !== null) {
        return uni.$showMsg("您取消了登录授权！");
      }
      this.updateUserInfo(succ);
      this.getToken(succ);
    },
    async getToken(info) {
      const [err, succ] = await uni.login().catch((err) => err);
      if (err || succ.errMsg !== "login:ok") {
        return uni.$showMsg("登陆失败！");
      }
      const query = {
        code: succ.code,
        encryptedData: info.encryptedData,
        iv: info.iv,
        rawData: info.rawData,
        signature: info.signature,
      };
      const res = await uni.$http.post("/api/public/v1/users/wxlogin", query);
      const user = {
        message: {
          user_id: 12,
          user_email_code: null,
          is_active: null,
          user_sex: "男",
          user_qq: "",
          user_tel: "",
          user_xueli: "本科",
          user_hobby: "",
          user_introduce: null,
          create_time: 1525402223,
          update_time: 1525402223,
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1MjU0MDIyMjMsImV4cCI6MTUyNTQ4ODYyM30.g-4GtEQNPwT_Xs0Pq7Lrco_9DfHQQsBiOKZerkO-O-o",
        },
        meta: { msg: "登录成功", status: 200 },
      };

      // 接口失效
      // console.log(user);
      // if (res.data.meta.status !== 200) {
      //   return uni.$showMsg("登陆失败，请稍后重试！");
      // }
      uni.$showMsg("登陆成功！");
      this.updateToken(user.message.token);
      this.navigateBcak();
    },
    navigateBcak() {
      if (this.redirectInfo && this.redirectInfo.openType === "switchTab") {
        uni.switchTab({
          url: this.redirectInfo.from,
          complete: () => {
            this.updateRedirectInfo(null);
          },
        });
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
.login {
  height: 750rpx;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 40px;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 100%;
    transform: translateY(50%);
  }
  .tips-text {
    font-size: 12px;
    color: gray;
  }
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }
}
</style>
