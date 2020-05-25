<!--  -->
<template>
  <div class="good">
    <goods-list-item v-for="item in goods" :goodsItem="item" />
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  name: "GoodsList",
  components:{
    GoodsListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.good{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
