<template>
    <!-- 点击跳转展示到这里 -->
    <nav>
      <router-link to="/money" class="item" active-class="selected">
        <Icon name="money"/>
        记账
      </router-link>
      <router-link to="/labels" class="item" active-class="selected">
        <Icon name="label"/>
        标签
      </router-link>
      <router-link to="/statistics" class="item" active-class="selected">
        <Icon name="chart"/>
        统计
      </router-link>
    </nav>
</template>

<script lang="ts">
    // 直接打包引入三个图标: 将一个文件中后缀一样的文件统一引入
    let  importAll=(requireContext:__WebpackModuleApi.RequireContext)=>requireContext.keys().forEach(requireContext); 
    try{
        importAll(require.context('../assets/icons',true, /\.svg$/));
    }catch(error){
        console.log(error)
    }

    import x from '@/assets/icons/label.svg';
    console.log(x)
    declare var require: any  // 防止上面的require划红线

    export default {
        name:'Nav'
    }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  nav {
    display: flex;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0);
    flex-direction: row;
    font-size: 12px;
    > .item {
      padding: 2px 0;
      width: 33.33333%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .icon {
        width: 32px;
        height: 32px;
      }
    }
    > .item.selected{
      color: $color-highlight;
    }
  }</style>