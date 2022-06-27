<template>
  <div>
    <!-- 把引入的几个路径内容显示到这里 -->
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";
body{
  line-height:1.5;
  font-family: $font-hei;  // 从外部文件引入黑体.黑体代码来自网站
  color: #333;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
