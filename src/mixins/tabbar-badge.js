import { mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapState("m_cart", ["cart"]),
    ...mapGetters("m_cart", ["checkedCount"]),
  },
  methods: {
    setBadge() {
      uni.setTabBarBadge({
        index: 2,
        text: this.checkedCount + "",
      });
    },
  },
  onShow() {
    this.setBadge();
  },
  watch: {
    checkedCount() {
      this.setBadge();
    },
  },
};
