<!--  -->
<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
        class="title-item"
        :class="{active:index===currentIndex}"
        @click="itemClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name:'DetailNavBar',
  data() {
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  components:{
        NavBar

  },
  methods:{
    itemClick(index){
      this.currentIndex=index;
      this.$emit('titleClick',index);
    },
    backClick(){
      this.$router.back();
    }
  },
//生命周期 - 创建完成（访问当前this实例）
  created() {

  },
//生命周期 - 挂载完成（访问DOM元素）
  mounted() {

  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.title{
  display: flex;
}
.title-item{
  flex:1;
}
.active{
  color:red;
}
.back img{
  margin-top: 11px;
}
</style>
