<!--  -->
<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="item in cartList" :item="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import vhCheck from 'vh-check'

import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem"
export default {
  name: "CartList",
  data() {
    return {};
  },
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  methods: {},
  //生命周期 - 创建完成（访问当前this实例）
  created() {
        vhCheck();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {

  },
  activated(){
    this.$refs.scroll.refresh()
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.cart-list {
  height: calc(100vh - var(--vh-offset, 0px) - 133px);
  /* 使用vh-check插件对vh进行修正，原因是移动端部分浏览器的vh包含地址栏 */
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
