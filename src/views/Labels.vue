<template>
    <Layout>
        <div class="tags">
            <!-- router-link后面要加 :to="url" -->
            <router-link class="tags" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
                <span>{{tag.name}}</span>
                <Icon name="right"/>
            </router-link>
        </div>
        <div class="createTag-wrapper">
            <Button class="createTag" @click="createTag">新建标签</button>
        </div>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import tagListModel from '../models/tagListModel';
    import store from '../store/index2';

    tagListModel.fetch()  // 最开始的时候获取一下数据
    @Component
    export default class Labels extends Vue{
        // TODO
        tags=store.tagList  // 直接引用custom.d.ts里面定义的 调用数据的函数
        createTag(){
            const name=window.prompt('请输入标签名')
            if(name){
                store.createTag(name)  // 引用custom.d.ts里面定义的 创建新标签的函数
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tags{
        background: white;
        padding-left: 16px;
        > .tags{
            height:44px ;
            line-height:44px ;
            font-size: 16px;
            display: flex;
            align-items: center;  // 让箭头上下居中
            justify-content: space-between;
            border-bottom: 1px solid #e6e6e6;
            svg{
                width: 18px;
                height: 18px;
                color:#333;
                margin-right: 16px;
            }
        }
    }
    .createTag{
        background: #767676;
        color: white;
        border-radius: 4px;
        border: none;
        height: 40px;
        padding: 0 16px;
        &-wrapper{
            padding: 16px;
            text-align: center;
            margin-top: 28px;
        }
    }
</style>