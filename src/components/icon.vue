<template>
    <svg class="icon" @click="$emit('click',$event)">
        <use :xlink:href="'#'+name"/>
    </svg>
</template>

<script lang="ts">
    // 直接打包引入三个图标: 将一个文件中后缀统一的文件统一引入
    let  importAll=(requireContext:__WebpackModuleApi.RequireContext)=>requireContext.keys().forEach(requireContext); 
    try{
        importAll(require.context('../assets/icons',true, /\.svg$/));
    }catch(error){
        console.log(error)
    }

    export default {
        props:['name'],
        name:'Icon',
    }
</script>

<style lang="scss" scoped>
// 增加图标样式
    .icon{
        width: 1em;
        height: 1em;
        vertical-align:-0.15em;
        fill:currentColor;
        overflow: hidden;
    }
</style>