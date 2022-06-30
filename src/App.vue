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
  background: #f5f5f5;
}
a {
	text-decoration: none; /* 去除默认的下划线 */
	outline: none;	/* 去除旧版浏览器的点击后的外虚线框 */
	color: #000;	/* 去除默认的颜色和点击后变化的颜色 */ 
}
</style>
