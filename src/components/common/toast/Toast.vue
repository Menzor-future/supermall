<!--  -->
<template>
  <div v-show="isShow" class="toast">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  // props: {
  //   message: {
  //     type: String,
  //     default: ""
  //   },
  //   isShow: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  data() {
    return {
      message:'',
      isShow:false
    };
  },
  components: {},
  methods: {
    show(message,duration){
      this.isShow = true;
      this.message = message;
      setTimeout(()=>{
        this.isShow = false;
        this.message = '';
      },duration)
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
.toast {
  position: fixed;
  z-index: 9;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  padding: 8px 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
