<template>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>

    </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        props:{
          probeType:{
            type:Number,
            default:0
          },
          pullUpLoad:{
            type:Boolean,
            default:false
          }
        },
        data(){
          return{
            scroll:null
          }
        },
      mounted() {
          //创建bs对象
          this.scroll = new BScroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad

          })

          //监听滚动位置
          this.scroll.on('scroll',(position)=>{
            // console.log(position);
            //发送position，等待组件监听
            this.$emit('scroll',position)
          })

          //监听上拉事件
            this.scroll.on('pullingUp',()=>{
              //发送事件
              this.$emit('pullingUp')
            })
      },
      methods:{

          scrollTo(x,y,time){
            this.scroll.scrollTo(x,y,time)
          },
          finishPullUp(){
            this.scroll.finishPullUp()
          }
      }
    }
</script>

<style scoped>

</style>
