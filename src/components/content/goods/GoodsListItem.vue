<!--  -->
<template>
  <div class="goodsItem" @click="itemClick">
    <!-- 使用vue-lazyload对图片进行懒加载 -->
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goodsInfo">
      <p>{{goodsItem.title}}</p>
      价格：<span class='price'>{{goodsItem.price}}</span>
      收藏：<span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"GoodsListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    //当所有图片加载完成，传递完成消息到home和detail组件
    imageLoad(){
      this.$bus.$emit('itemImageLoad')
    },
    itemClick(){
      console.log('跳转到详情页面')
      this.$router.push('/detail/'+this.goodsItem.iid)
    }
  },
  computed:{
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {

  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.goodsItem{
  width:48%;
  position: relative;
  font-size: 12px;
      margin-bottom: 5px;

}
.goodsItem img{
  width:100%;

}
.goodsItem p,span{
  font-size: 12px;
}
.goodsInfo p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap;
  margin-bottom: 5px;
}
</style>
