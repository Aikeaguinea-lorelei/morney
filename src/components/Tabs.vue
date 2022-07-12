<template>
    <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
        <li v-for="item in dataSource" :key="item.value" 
        :class="{[classPrefix+'-tabs-item']:classPrefix,selected:item.value===value}"
        @click="select(item)">{{item.text}}</li>
        <!-- 当外部传入的DataSource的某一项 的value值等于当前选中的value值时,这项为selected -->
        <!-- 点击事件: `上传`选中的dataSource的 value值 -->
    </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'; 

    type dataSourceItem={text:string,value:string}
    @Component
    export default class Tabs extends Vue{
        // {required:true}:必须传值  传值的名字叫dataSource. dataSource的内容是包括text和value的数组
        @Prop({required:true,type:Array}) dataSource:dataSourceItem[]
        @Prop(String) readonly value!:string   // value:选中哪一项
        @Prop(String) classPrefix?:string
        select(item:dataSourceItem){
            this.$emit('update:value',item.value)  // 点击事件: 上传 选中的dataSource 的value值
        }
    }
</script>

<style lang="scss" scoped>
    .tabs{
        background: #c4c4c4;
        display: flex;
        font-style: 24px;
        line-height: 64px;
        height: 64px;
        text-align: center;
        position: relative;
        >li{
            width: 50%;
            position: relative;
        }
        li.selected{
            border-bottom: 5px solid #000;
        }
    }
</style>