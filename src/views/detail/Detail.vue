<!--  -->
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <div style="width:100%;overflow:hidden" v-for="item in $store.state.cartList">{{item}}</div>
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <backTop @click.native="backClick" v-show="isShowBackTop"></backTop>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import GoodsList from "components/content/goods/GoodsList";
// import Toast from "components/common/toast/Toast"

import { itemListenerMixin,backTopMixin } from "common/mixin";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

import Scroll from "components/common/scroll/Scroll";
import { debounce } from "common/utils";
import { mapActions } from 'vuex';

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      topY: [],
      getTopY: null,
      currentIndex:null,
      // message:'',
      // show:false
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // itemImglistener:null
    // Toast
  },
  mixins: [itemListenerMixin,backTopMixin],
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // console.log("跳转商品详情页面", this.$route.params.iid);
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res,'根据iid拿到数据');
      // 1.从res数据中取出轮播图数据
      this.topImages = res.result.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        res.result.itemInfo,
        res.result.columns,
        res.result.shopInfo.services
      );
      // 3.创建店铺信息的对象
      this.shop = new Shop(res.result.shopInfo);
      // 4.保存商品详情数据
      this.detailInfo = res.result.detailInfo;
      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        res.result.itemParams.info,
        res.result.itemParams.rule
      );
      // 6.取出评论的信息
      if (res.result.rate.cRate !== 0) {
        this.commentInfo = res.result.rate.list[0];
      }
    });
    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
    //4.给TopY赋值
    this.getTopY = debounce(() => {
      this.topY = [];
      this.topY.push(0);
      this.topY.push(this.$refs.params.$el.offsetTop - 44);
      this.topY.push(this.$refs.comment.$el.offsetTop - 44);
      this.topY.push(this.$refs.recommend.$el.offsetTop - 44);
      this.topY.push(Number.MAX_VALUE);
      // console.log(this.topY,'获取顶部每一项对应的详情页面高度');
    }, 200);
  },
  methods: {
    ...mapActions(['addCart']),
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.topY[index], 800);
    },
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getTopY();
    },
    contentScroll(position) {
      // 1.获取y轴的值
      const positionY = -position.y;
      // 2.positionY和topY中的值对比
      // [0, 6879, 7514, 7789]
      // positionY 在0和6879之间，index=0
      // positionY 在6879和7514之间，index=1
      // positionY 在7514和7789之间，index=2
      // positionY 大于1189，index=3
      // console.log(positionY)
      for (let i = 0; i < this.topY.length-1; i++) {
        if (this.currentIndex !== i &&(positionY >= this.topY[i] && positionY < this.topY[i+1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 3.是否显示返回顶部按钮
      // 此处被注释因为已经混入到mixin文件中的backTopMixin函数
      // this.isShowBackTop = -position.y > 500;
      // 调用mixin文件中的backTopMixin函数的监听是否返回顶部函数
      this.listenShowBackTop(position)
    },
    addToCart(){
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车里
      // this.$store.commit('addCart',product)
      // this.$store.dispatch('addCart',product).then(res=>{
      //   console.log(res);
      // })
      this.addCart(product).then(res => {
        this.$toast.show(res,2000)
      })
      // 3.添加完后调用回调函数，弹出提示框
    }
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    // 以下注释代码已在mixin中完成
    // const refresh = debounce(this.$refs.scroll.refresh,200)
    // this.itemImgListener = () => {
    //   refresh()
    // }
    // this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  // 阿泽：不去deactived而去destroyed中取消监听是因为，Detail组件并没有keepAlive，所以不会触发actived或deactived
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImglistener);
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
#detail {
  position: relative;
  z-index: 1;
  background-color: #fff;
  width: 100vw;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
/* calc记得加空格 */
.content {
  height: calc(100% - 44px - 49px);
}


</style>
