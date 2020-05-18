<template>
  <div class="navBar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "NavBar"
};
</script>
<style scoped>
.navBar{
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  box-shadow: 0 1px 4px rgba(100, 100, 100, 0.2);
  /* 阿泽：添加阴影 */
}
.left{
  width:60px;
}
.center{
  flex:1;
}
.right{
  width:60px;
}
</style>
