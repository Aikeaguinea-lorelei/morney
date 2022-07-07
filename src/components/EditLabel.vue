<template>
    <layout>
        <div class="navBar">
            <Icon class="leftIcon" name="left"/>
            <span class="title">编辑标签</span>
            <span class="rightIcon"></span>
        </div>
        <div class="form-wrapper">
            {{tag.name}}
            <Notes :value="tag.name" field-name="标签名" placeholder="请输入标签名" />
        </div>
        <div class="button-wrapper">
            <Button>删除标签</Button>
        </div>
    </layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import tagListModel from '../models/tagListModel';
import Icon from './icon.vue';
import Notes from './Notes.vue'
import Button from './Button.vue'

@Component({
    components: { Notes, Button }
})
export default class EditLabel extends Vue{
    tag?:{id:string,name:string}=undefined  // 声明一下tag (? :tag可能为空)
    created(){   // $route.params: 能拿到route的所有的参数
        const id=this.$route.params.id  // (拿到当前id)如果路由里路径为/edit/:id,而url是/edit/1,则拿到{id:'1'}
        tagListModel.fetch()
        const tags=tagListModel.data  // 获取数据,得到所有的tags
        const tag=tags.filter(t=>t.id===id)[0]  // 在所有tags中筛选id是当前id的tag
        if(tag){
            console.log(tag)
            this.tag=tag  // 如果存在和当前id一致的tag,就把它赋值为当前tag
        }else{
            this.$router.replace('/404')
        }
    }
}
</script>

<style lang="scss" scoped>
    .navBar{
        text-align: center;
        font-size: 16px;
        height: 48px;
        line-height: 48px;
        background: white;
        align-items: center;  // 上下对齐
        // 左中右布局
        display: flex;
        justify-content: space-between;
        > .leftIcon{
            height: 30px;
            width: 30px;
        }
    }
    .form-wrapper{
        margin-top: 8px;
        background: white;
    }
    .button-wrapper{
        text-align: center;
        padding: 16px;
        margin-top: 44px;
    }
</style>