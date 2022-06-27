<template>
    <Layout class-prefix="xxx"> 
        <NumberPad />
        <Types propA="333" />
        <Notes />
        <Tags :data-source="tag" />
    </Layout>
</template>

<script>
import Nav from '../components/Nav.vue';
import Layout from '../components/Layout.vue';
import NumberPad from '../components/NumberPad.vue';
import Types from '../components/Types.vue';
import Tags from '../components/Tags.vue';
import Notes from '../components/Notes.vue';

    export default {
    name: "Money",
    components: { Nav, Layout, NumberPad, Types, Tags, Notes},
    data(){
        return{
            tag:['衣','食','住','行']
        }
    }
}
</script>


<style lang="scss">
    .xxx-content{
        // border:1px solid red;
        display: flex;
        flex-direction: column-reverse;
    }
</style>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";
</style>