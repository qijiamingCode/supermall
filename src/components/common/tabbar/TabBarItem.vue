<template>
  <div class="tab-bar-item" @click="itemClick">
<!--    <image src="../../assets/image/tabbar/home.svg" alt="">-->
<!--    <div>首页</div>-->
    <div v-if="!isActive" ><slot name="item-icon"></slot></div>
    <div v-else > <slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>

  </div>
</template>

<script>
    export default {
         name: "TabBarItem",
      props:{
        path:String,
        activeColor:{
          type:String,
          default:'red'
        }
      },
      data(){
          return{
            // isActive:false
          }

      },
      computed:{
         isActive(){
           //判断当前活跃的路径和所有路径，做对比，相同的返回true
           return this.$route.path.indexOf(this.path) !==-1
         },
          activeStyle(){
           return this.isActive ? {color:this.activeColor} : {}
          }
      },
      methods:{
          itemClick(){
           this.$router.replace(this.path)
}
}

}
</script>

<style scoped>

.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
/*创建完activeColor，这个类就失去作用了*/
/*.active {*/
/*  color:red;*/
/*}*/
</style>
