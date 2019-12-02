<template>
    <h2 id="home" class="wrapper">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <scroll class="content"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScroll"
              :pull-up-load="true"
              @pullingUp="loadMore">
       <home-swiper :banners="banners"></home-swiper>
       <recommend-view :recommends="recommends"></recommend-view>
       <feature-view></feature-view>
       <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"></tab-control>
       <goods-list :goods="showGoods"></goods-list>
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </h2>
</template>

  <script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import GoodsListItem from 'components/content/goods/GoodsListItem'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'


  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  //没用default导出的方法都要加{}
  import {getHomeMultidata,getHomeGoods} from "network/home";
  // import Swiper from 'components/common/swiper/Swiper'
  // import SwiperItem from 'components/common/swiper/SwiperItem'
  import {Swiper,SwiperItem} from 'components/common/swiper'

  export default {
        name: "Home",
        components:{
          NavBar,
          HomeSwiper,
          RecommendView,
          FeatureView,
          TabControl,
          GoodsList,
          GoodsListItem,
          Scroll,
          BackTop
        },
        data(){
          return{
            banners:[],
            recommends:[],
            goods:{
              'pop':{page:0,list:[]},
              'new':{page:0,list:[]},
              'sell':{page:0,list:[]}
            },
            currentType:'pop',
            isShowBackTop:false
          }
        },
        computed:{
          showGoods(){
            return this.goods[this.currentType].list
          }
        },
        created(){
          //请求多个数据0
          //函数调用：压入函数栈，当调用结束，会被释放，所以要添加data()，来保存请求到的数据
          //这里只调用，在下面methods里面写逻辑
          this.getHomeMultidata()
          //请求商品数据
          this.getHomeGoods('pop')
          this.getHomeGoods('new')
          this.getHomeGoods('sell')
          //this.getHomeGoods('new')
         // this.getHomeGoods('sell')
         },
        methods:{
          // 事件监听相关方法
          tabClick(index){
            switch (index) {
              case 0 :
                this.currentType='pop'
                    break
              case 1 :
                this.currentType='new'
                break
              case 2 :
                this.currentType='sell'
                break
            }
          },
          backClick(){
            this.$refs.scroll.scrollTo(0,0,300)
            // console.log("aaa");
          },
          contentScroll(position){
            this.isShowBackTop = (-position.y)>1000
          },
          loadMore(){
            //之前getHomeGoods方法已经封装好了，直接调用
            this.getHomeGoods(this.currentType)
          },

          //网络请求相关方法
          getHomeMultidata(){
            getHomeMultidata().then(res=>{
              //console.log(res);
              this.banners = res.data.banner.list;
              this.recommends = res.data.recommend.list;
            })
          },
          getHomeGoods(type){
            const page = this.goods[type].page +1
            getHomeGoods(type,page).then(res=>{
              this.goods[type].list.push(...res.data.list)
              this.goods[type].page +=1

              this.$refs.scroll.finishPullUp()
            })
  }
  }
  }
  </script>

    <style scoped>
    #home{
      /*padding-top: 44px;*/
      height:100vh;
      position: relative;

    }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position:fixed;
    left:0;
    right:0;
    top:0;
    z-index:9;
  }

  .tab-control{
    position:sticky;
    top:44px;
    z-index: 9;
  }

      .content {
        /*height: calc(100% - 93px);*/
        overflow: hidden;
        /*margin-top: 44px;*/
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
      }
</style>
