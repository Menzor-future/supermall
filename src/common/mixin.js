import {debounce} from 'common/utils'
import BackTop from '../components/content/backTop/BackTop'
export const itemListenerMixin = {
  data(){
    return{
      itemImglistener:null
    }
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,200)
    this.itemImglistener= () =>{
      refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImglistener)
    console.log('混入成功，对betterscroll的refresh函数进行防抖处理');
  }
}
export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return{
      isShowBackTop:false,
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,800)
    },
    listenShowBackTop(position){
      this.isShowBackTop = -position.y>600
    }
  }
}
