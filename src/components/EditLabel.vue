<template>
    <layout>
        <div>
            <Icon name="left"/>
            <span>编辑标签</span>
        </div>
        <Notes/>
    </layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import tagListModel from '../models/tagListModel';
import Icon from './icon.vue';
import Notes from './Notes.vue'

@Component({
    components: { Notes }
})
export default class EditLabel extends Vue{
    created(){   // $route.params: 能拿到route的所有的参数
        const id=this.$route.params.id  // (拿到当前id)如果路由里路径为/edit/:id,而url是/edit/1,则拿到{id:'1'}
        tagListModel.fetch()
        const tags=tagListModel.data  // 获取数据,得到所有的tags
        const tag=tags.filter(t=>t.id===id)[0]  // 在所有tags中筛选id是当前id的tag
        if(tag){
            console.log(tag)
        }else{
            this.$router.push('/404')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>