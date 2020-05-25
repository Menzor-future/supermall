<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    />

    <scroll
      ref="scroll"
      class="content"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 阿泽：组件不能直接监听点击，得加上修饰符 -->
    <backTop @click.native="backClick" v-show="isShowBackTop"></backTop>
  </div>
</template>

<script>
import { itemListenerMixin, backTopMixin } from "common/mixin";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      // 已经混入到mixin文件中的backTopMixin函数
      // isShowBackTop: false,

      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: null
      // itemImgListener:null
    };
  },
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

    HomeSwiper,
    RecommendView,
    FeatureView
  },
  mixins: [itemListenerMixin, backTopMixin],

  created() {
    //1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    // 网络监听相关的方法
    // 请求推荐商品数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page + 1;
        // 告诉浏览器这次上拉完了，才能触发下一次上拉
        this.$refs.scroll.finishPullUp();
      });
    },

    // 事件监听相关的方法

    //选项卡切换事件
    // 阿泽：添加点击后的滚动方法，实现点击后滚回商品列表顶部
    tabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          this.$refs.scroll.scrollTo(0, -this.tabOffsetTop, 800);
          break;
        case 1:
          this.currentType = "new";
          this.$refs.scroll.scrollTo(0, -this.tabOffsetTop, 800);
          break;
        case 2:
          this.currentType = "sell";
          this.$refs.scroll.scrollTo(0, -this.tabOffsetTop, 800);
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    // 阿泽：第三个参数是控制回滚顶部的过渡时间
    // 此处被注释因为已经混入到mixin文件中的backTopMixin函数
    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0, 800);
    // },

    contentScroll(position) {
      // 此处被注释因为已经混入到mixin文件中的backTopMixin函数
      // this.isShowBackTop = -position.y > 500;
      // 调用mixin文件中的backTopMixin函数的监听是否返回顶部函数
      this.listenShowBackTop(position);
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
      console.log("上拉加载更多");
    }
  },
  mounted() {
    // //1.监听item图片加载完成，应该要在mounted里监听图片DOM元素的加载，防止DOM还没渲染好
    // const refresh = debounce(this.$refs.scroll.refresh,200)
    // this.itemImgListener = () => {
    //   refresh()
    // }
    // this.$bus.$on("itemImageLoad", this.itemImgListener);

    // 2.获取tabControl的offsetTop
    // 所有的组件都有一个属性$sel，可以拿到组件中的元素
    this.$bus.$on("swiperImageLoad", () => {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    });
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getCurrentY;
    // 2.取消全局事件的监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  }
};
</script>

<style scoped>
#home {
  /* 视口高度 */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  z-index: 9;
  /* 在使用浏览器原生滚动时，为了让导航不跟随滚动使用以下样式
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  position: relative;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
