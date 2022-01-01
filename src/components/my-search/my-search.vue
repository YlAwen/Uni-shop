<template>
  <view
    @click="searchBoxHandler"
    class="my-search-container"
    :style="{ 'background-color': bgcolor }"
  >
    <view class="my-search-box" :style="{ 'border-radius': radius + 'px' }">
      <van-icon name="search" size="18" />
      <text class="placholder">搜索</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    bgcolor: {
      type: String,
      default: "#c50000",
    },
    radius: {
      type: Number,
      default: 18,
    },
  },
  data: () => ({}),
  components: {},
  computed: {},
  methods: {
    searchBoxHandler() {
      this.$emit("click");
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
.my-search-container {
  height: 50px;
  // background-color: #c50000;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .my-search-box {
    height: 36px;
    background-color: #fff;
    // border-radius: 18px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .placholder {
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>
