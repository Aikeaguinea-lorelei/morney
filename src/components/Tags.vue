<template>
        <div class="tags">
            <div class="new">
                <button @click="create">新增标签</button>
            </div>
            <ul class="current">
                <li v-for="tag in dataSource" :key="tag"
                :class="{selected: selectedTags.indexOf(tag)>=0}"
                @click="toggle(tag)">{{tag}}</li>
            </ul>
        </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop} from 'vue-property-decorator';

    @Component  // 定义一个供外部调用的dataSource,并由外部传参(tag)
    export default class Tags extends Vue{
        @Prop() readonly dataSource:string[] | undefined
        selectedTags:string[]=[]  // 数组: 提供给使用者放选中的tag

        toggle(tag:string){  // 点击函数: 如果数组里面没有这个选中的tag,点击后就把这个tag放进数组里
            const index=this.selectedTags.indexOf(tag)
            if(index>=0){   // 有这个tag的话,点击后就从数组中移除
                this.selectedTags.splice(index,1)   // 从index开始删掉一个
            }else{
                this.selectedTags.push(tag)
            }
            this.$emit('update:value',this.selectedTags)
        }
        create(){
            const name=window.prompt('请输入标签名')   // 跳出一个提示弹窗.填完值以后赋给name
            if(name===''){
                window.alert('标签名不能为空')
            }else{
                if(this.dataSource){
                    this.dataSource.push(name!)
                }
            }
        }
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
                &.selected{
                    background: darken($bg,30%);
                    color: white;
                }
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