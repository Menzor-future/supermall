<!--  -->
<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button :is-checked="item.checked" @click.native="checkClick" />
    </div>
    <div class="item-img">
      <img :src="item.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{item.title}}</div>
      <div class="item-desc">商品描述: {{item.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{item.price}}</div>

        <div class="item-count right">X{{item.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartListItem",
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      this.item.checked = !this.item.checked;
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.info-bottom .item-price {
  color: orangered;
}
.conter {
  width: 5.66667vw;
  padding: 0.53333vw 1.33333vw;
  background-color: var(--color-tint);
  color: #ffffff;
  border-radius: -16px;
  box-shadow: inset -1px 1px 11px 2px;
}
.border {
  width: 15.2vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: -20px -5px 20vw 0px;
  border-radius: 50%;
}
</style>
