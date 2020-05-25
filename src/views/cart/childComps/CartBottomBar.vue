<!--  -->
<template>
  <div class="bottom-bar">
    <div class="check-content" @click="checkClick" >
      <check-button class="check-button" :is-checked="isSelectAll"></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">去结算：{{checkLength}}</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from 'vuex';

export default {
  name: "CartBottomBar",
  data() {
    return {

    };
  },
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      // 计算总价，返回含有2位小数的数
      return (
        "￥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return (preValue + item.price * item.count).toFixed(2);
          }, 0)
      );
    },
    checkLength(){
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      //阿泽：要考虑默认购物车没东西的情况下，全选按钮为false
      if(this.cartList.length==0) return false
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    // 阿泽：全选按钮点击方法
    checkClick(){
      if(this.isSelectAll){
        this.cartList.forEach(item => item.checked = false)
      }else{
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品',1700)
      }
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
.bottom-bar {
  display: flex;
  position: relative;
  height: 40px;
  line-height: 40px;
  z-index: 10;
  background-color: rgba(100, 100, 100, 0.1);
}
.check-content {
  display: flex;
  width: 90px;
  align-items: center;
  padding-left: 5px;
}
.check-content span {
  padding-left: 5px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.price {
  flex:1;

}
.calculate{
  width: 100px;
  color:#fff;
  text-align: center;
  background-color:rgb(255, 123, 8);
}
</style>
