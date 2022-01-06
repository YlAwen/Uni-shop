export default {
  // 开启命名空间
  namespaced: true,

  // state数据
  state: () => {
    return {
      address: JSON.parse(uni.getStorageSync("address") || "{}"),
      token: uni.getStorageSync("token") || "",
      userinfo: JSON.parse(uni.getStorageSync("userinfo") || "{}"),
      redirectInfo: null,
    };
  },

  // mutations方法
  mutations: {
    updateAddress(state, address) {
      state.address = address;
      this.commit("m_user/saveAddress");
    },
    saveAddress(state) {
      uni.setStorageSync("address", JSON.stringify(state.address));
    },
    updateUserInfo(state, info) {
      state.userinfo = info;
      this.commit("m_user/saveUserInfo");
    },
    saveUserInfo(state) {
      uni.setStorageSync("userinfo", JSON.stringify(state.userinfo));
    },
    updateToken(state, token) {
      state.token = token;
      this.commit("m_user/saveToken");
    },
    saveToken(state) {
      uni.setStorageSync("token", JSON.stringify(state.token));
    },
    updateRedirectInfo(state, info) {
      state.redirectInfo = info;
    },
  },

  // getters属性
  getters: {
    addstr(state) {
      if (!state.address.provinceName) return "";
      return (
        state.address.provinceName +
        state.address.cityName +
        state.address.countyName +
        state.address.detailInfo
      );
    },
  },
};
