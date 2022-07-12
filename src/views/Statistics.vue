<template>
    <Layout>
        <!-- <Types class="x" :value.sync="type" /> -->
        <Tabs :classPrefix="type" :data-source="typeList" :value.sync="type" />
        <!-- value:当前选中的value -->
        <ol>
            <!-- 展示数据里面的item -->
            <li v-for="(group,index) in result" :key="index">
                <!-- 第一层遍历: 遍历经过处理的recordList数据: hashTable  得到根据日期分的几个组. -->
                <!-- 得到分组名:日期 -->
                <h3 class="title">
                    {{beautify(group.title)}}
                    <span>¥{{group.total}}</span>
                </h3>
                <ol>
                    <!-- 第二层遍历: 每组(每天)的各笔金额 -->
                    <li v-for="item in group.items" :key="item.createdAt" class="record">
                        <span>{{tagString(item.tags)}}</span>
                        <span class="notes">{{item.notes}}</span>
                        <!-- 展示每笔数据的 金额 和 日期 -->
                        <span>¥{{item.amount}}</span>
                    </li>
                </ol>
            </li>
        </ol>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Nav from '../components/Nav.vue';
import Types from '../components/Types.vue';
import Tabs from '../components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import typeList from '@/constants/typeList';
import dayjs from 'dayjs'

    @Component({
        components: { Nav, Types, Tabs }
    })
    export default class Statistics extends Vue{
        type='-'
        interval='day'
        intervalList=intervalList  // 把常量抽离成一个组件
        typeList=typeList
        tagString(tags:string[]){
            return tags.length===0 ? '无' : tags.join(',')  // 用","分割各个tag
        }
        beautify(string:string){
            const day=dayjs(string)  // 数据中的时间
            const now=new Date()  // 当前时间
            if(day.isSame(now,'day')){
                return '今天'
            // 86400: 一天有多少秒
            }else if(day.isSame(now.valueOf()-86400*1000,'day')){
                return '昨天'
            }else if(day.isSame(now.valueOf()-86400*2*1000,'day')){
                return '前天'
            }else if(day.isSame(now,'year')){
                return day.format('M月D日')
            }else{
                return day.format('YYYY年M月D日')
            }
        }
        get recordList(){  // 计算属性: 获取数据
            return (this.$store.state as RootState).recordList
        }
        // 按照日期展示recordList的数据 的函数
        get result(){
            const {recordList}=this
            const reverseList=recordList.filter(r=>r.type===this.type).reverse()
            type HashTableValue={title:string,total?:number,items:RecordItem[]}  // 数据里面包含标题和recordItem数据
            const hashTable:{[key:string]:HashTableValue}={}
            
            for(let i=0;i<reverseList.length;i++){
                const[date]=reverseList[i].createdAt!.split('T')  // 析构语法,提取出recordList中的日期和时间
                hashTable[date]=hashTable[date] || {title:date,items:[],total:0}  // 初始化
                hashTable[date].items.push(reverseList[i])  // 把recordList中的每一项 push到这几个日期中[实现按日期分组]
            }
            // hashTable.map(group=>{
            //     group.total=group.items.reduce((sum,item)=>sum+item.amount,0)
            // })
            return hashTable  // 最后得到的hashTable,就是按日期分组的recordList的数据
        }
        mounted(){
            this.$store.commit('fetchRecords')
        }
    }
</script>

<style lang="scss" scoped>
    // %item: 公共部分
    %item{
        padding: 0 16px;
        height: 40px;
        line-height: 40px;
        display:flex;
        justify-content: space-between;
        align-content: center;
    }
    .title{
        font-weight: normal;
        @extend %item
    }
    .record{
        background: white;
        padding: 0 16px;
        @extend %item        
    }
    .notes{
        margin-right: auto;
        margin-left: 16px;
        color: #999;
    }
    ::v-deep .type-tabs-item{
        // v-deep: 找当前组件的原组件
        background: white;
        &.selected{
            background: #c4c4c4;
            border-bottom: 5px solid #c4c4c4;
        }
    }
    ::v-deep .interval-tabs-item{
        height: 48px;
    }
</style>
