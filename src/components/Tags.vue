<template>
        <div class="tags">
            <div class="new">
                <button>新增标签</button>
            </div>
            <ul class="current">
                <li v-for="tag in dataSource" :key="tag">{{tag}}</li>
            </ul>
        </div>
</template>

<script lang="ts">//@click="select(tag)"
    import Vue from 'vue'
    import {Component, Prop} from 'vue-property-decorator';

    @Component  // 定义一个供外部调用的dataSource,并由外部传参(tag)
    export default class Tags extends Vue{
        @Prop() dataSource:string[]=[] 
        selectedTags:string[]=[]
        // select(tag:string){
        //     this.selectedTags.push(tag)
        // }
    }
</script>

<style lang="scss" scoped>
    .tags{
        font-size: 14px;
        padding:16px;
        flex-grow: 1;  // tags的部分顶格
        display: flex;
        flex-direction: column-reverse;
        > .current{
            display:flex;  // 为了li横向排列
            flex-wrap: wrap;
            overflow: auto;
            >li{
                $bg:#d9d9d9;
                height: 24px;
                border-radius: (24px/2);
                background: #d9d9d9;
                padding:0 16px;
                margin-right: 12px;
                margin-top: 4px;
                // &.selected{
                //     background: darken($bg,50%);
                // }
            }
        }
        > .new{
            padding-top: 16px;
            button{
                background: transparent;
                border: none;
                color:#999;
                border-bottom: 1px solid ;
            }
        }
    }
</style>