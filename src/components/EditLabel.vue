<template>
    <layout>
        <div class="navBar">
            <Icon class="leftIcon" name="left" @click="goBack"/>
            <span class="title">编辑标签</span>
            <span class="rightIcon"></span>
        </div>
        <div class="form-wrapper">
            <Notes :value.sync="tag.name" @update:value="update" field-name="标签名" placeholder="请输入标签名" />
        </div>
        <div class="button-wrapper">
            <Button @click="remove">删除标签</Button>
        </div>
    </layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import Notes from './Notes.vue'
import Button from './Button.vue'
import store from '../store/index2';

@Component({
    components: { Notes, Button }
})
export default class EditLabel extends Vue{
    tag?:Tag= undefined  // 声明一下tag.初始值undefined. (? :tag可能为空)
    created(){   // $route.params: 能拿到route的所有的参数
        const id=this.$route.params.id  // (拿到当前id)如果路由里路径为/edit/:id,而url是/edit/1,则拿到{id:'1'}
        const tag=store.findTag(id)  // 获取数据,得到所有的tags
        if(tag){
            this.tag=tag  // 如果存在和当前id一致的tag,就把它赋值为当前tag
        }else{
            this.$router.replace('/404')
        }
    }
    // 输入框引入的 上传id和name的函数
    update(name:string){
        // store.updateTag(this.tag.id,name)
    }
    remove(){
        if(this.tag){
            if(store.removeTag(this.tag.id)){
                store.refreshTags()  // 获取新数据以后再返回上一级
                this.$router.back()
            }else{
                window.alert('删除失败')
            }
        }
    }
    goBack(){
        this.$router.back()  // back()函数: 直接返回上一级的函数.back是默认函数不用额外声明
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