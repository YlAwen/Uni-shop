export default {
  // 开启命名空间
  namespaced: true,

  // state数据
  state: () => {
    return {
      cart: JSON.parse(uni.getStorageSync("cart") || "[]"),
    };
  },

  // mutations方法
  mutations: {
    // 添加商品
    addToCart(state, goods) {
      const findResult = state.cart.find((item) => {
        return item.goods_id === goods.goods_id;
      });
      if (findResult) {
        findResult.goods_count++;
      } else {
        state.cart.push(goods);
      }
      this.commit("m_cart/saveToStorage");
    },
    saveToStorage(state) {
      uni.setStorageSync("cart", JSON.stringify(state.cart));
    },
    // 更新购物车商品状态
    updateGoodsState(state, goods) {
      const result = state.cart.find((x) => {
        return x.goods_id === goods.goods_id;
      });
      if (result) {
        result.goods_state = !goods.goods_state;
        this.commit("m_cart/saveToStorage");
      }
    },
    // 更新物品数量
    updateGoodsCount(state, goods) {
      const result = state.cart.find((x) => {
        return x.goods_id === goods.goods_id;
      });
      if (result) {
        result.goods_count = goods.goods_count;
        this.commit("m_cart/saveToStorage");
      }
    },
    // 更新购物车列表
    updateGoodsList(state, goods) {
      const newCart = [];
      state.cart.forEach((element) => {
        if (element.goods_id !== goods.goods_id) {
          newCart.push(element);
        }
      });
      state.cart = newCart;
      this.commit("m_cart/saveToStorage");
    },
    updateAllState(state, val) {
      state.cart.forEach((item) => {
        item.goods_state = val;
      });
      this.commit("m_cart/saveToStorage");
    },
  },

  // getters属性
  getters: {
    total(state) {
      let sum = 0;
      state.cart.forEach((item) => {
        sum += item.goods_count;
      });
      return sum;
    },
    getPriceSum(state) {
      let sum = 0;
      state.cart.forEach((item) => {
        if (item.goods_state) {
          sum += item.goods_count * item.goods_price;
        }
      });
      return sum.toFixed(2);
    },
    checkedCount(state) {
      let sum = 0;
      state.cart.forEach((item) => {
        if (item.goods_state) {
          sum += item.goods_count;
        }
      });
      return sum;
    },
  },
};
