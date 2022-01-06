export default {
  // 开启命名空间
  namespaced: true,

  // state数据
  state: () => {
    return {
      address: JSON.parse(uni.getStorageSync("address") || "{}"),
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
