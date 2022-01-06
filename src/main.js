import Vue from "vue";
import App from "./App";
import { $http } from "@escook/request-miniprogram";
import store from "./store";
uni.$http = $http;
// 请求拦截器
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: "数据加载中...",
  });
  // console.log(options);
  if (options.url.indexOf("/my/") !== -1) {
    options.header = {
      Authorization: JSON.parse(store.state.m_user.token),
    };
  }
};
// 响应拦截器
$http.afterRequest = function (options) {
  uni.hideLoading();
};
$http.baseUrl = "https://www.uinav.com";

uni.$showMsg = function (
  title = "数据请求失败！",
  duration = 1500,
  icon = "none"
) {
  uni.showToast({
    title,
    duration,
    icon,
  });
};
Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App,
  store,
});
app.$mount();
