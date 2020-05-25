<!--  -->
<template>
  <div v-if="Object.keys(commentInfo).length !==0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多
        <i class="arrow-right">→</i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">
          {{commentInfo.created | showDate}}
        </span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from "common/utils"
export default {
  name:'DetailCommentInfo',
  props:{
    commentInfo:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {

    }
  },
  filters:{
    showDate(value){
      // 1.将时间戳转成Date对象
      const date = new Date(value * 1000)
      // 2.将date进行格式化
      return formatDate(date,'yyyy-MM-dd')
    }
  },
  components:{

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
.comment-info{
  border-bottom: 5px solid #f2f5f8;
}
.info-header{
  width:100vw;
  height:42px;
  border-bottom: 1px solid rgba(100, 100, 100, .1);
  line-height: 42px;
  padding:0 10px;
}
.header-title{
  float: left;
}
.header-more{
 float:right;
}
.info-user{
  display: flex;
  align-items: center;
  padding:10px;
}
.info-user img{

  width:45px;
  height: 45px;
  border-radius: 50%;
}
.info-user span{
  padding-left: 12px;

}
.info-detail p{
  font-size: 14px;
  padding:0 15px;
  text-align:justify;
}
.info-other{
  padding:10px;
  font-size: 14px;
  color:rgb(155, 155, 155);
}
.info-imgs{
  padding:5px 10px;
  padding-top: 0px;
}
.info-imgs img{
  width:70px;
  height: 70px;
  margin-right: 5px;
}
</style>
