<template>
    <div class="nav-bar">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
  .nav-bar {
  /*将对象作为弹性伸缩盒显示*/
    display: flex;
    /*导航一般高度44*/
    height: 44px;
    line-height: 44px;
    /*文字居中*/
    text-align: center;
    /*搞一个阴影*/
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
  }

  .left, .right {
    width: 60px;

  }

  .center {
    /*将剩余部分全部占据*/
    flex:1;

  }
</style>
