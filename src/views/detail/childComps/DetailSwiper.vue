<!--  -->
<template>
  <div >
    <swiper class="detail-swiper">
      <swiper-item v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name:'DetailSwiper',
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {

    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{

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
.detail-swiper{
  height: 250px;
  overflow: hidden;
}
</style>
