<template>
    <div>
        <div>404 您要访问的页面不存在,请检查网址是否正确</div>
        <div><router-link to="/">返回首页</router-link></div>
    </div>
</template>

<script>
import Nav from '../components/Nav.vue';
    export default {
    name: "Money",
    components: { Nav }
}
</script>

<style lang="scss" scoped>

</style>