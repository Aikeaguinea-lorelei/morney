<template>
    <div class="layout-wrapper"  :class="classPrefix && `${prefix}-wrapper`">
        <div class="content" :class="classPrefix && `${classPrefix}-content`">
            <slot/>
        </div>
        <Nav />
    </div>
</template>

<script>
export default {
    props:['classPrefix'],
    name:'Layout'
}
</script>

<style lang="scss" scoped>
    .layout-wrapper{
        display: flex;  
        border:1px solid green ;
        flex-direction:column;  // column :上下布局
        height:100vh;  // 占满100%页面
    }
    .content{
        border:1px solid blue;
        overflow: auto;  // 多出来的部分滚动
        flex-grow: 1; // 意思是尽量把所有高度给content
    }
</style>