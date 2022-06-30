<template>
    <Layout class-prefix="xxx"> 
        {{recordList}}
        <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
        <Types @update:value="onUpdateType" />
        <Notes field-name="备注" @update:value="onUpdateNotes" />
        <Tags :data-source="tag" @update:value="onUpdateTags" />
    </Layout>
</template>

<script lang="ts">
declare var require: any  // 防止require报错

import Nav from '../components/Nav.vue';
import Layout from '../components/Layout.vue';
import NumberPad from '../components/NumberPad.vue';
import Types from '../components/Types.vue';
import Tags from '../components/Tags.vue';
import Notes from '../components/Notes.vue';
import recordListModel from '../models/recordListModel';
import tagListModel from '../models/tagListModel';

//     export default {
//     name: "Money",
//     components: { Nav, Layout, NumberPad, Types, Tags, Notes},
//     data(){
//         return{
//             tag:['衣','食','住','行']
//         }
//     }
// }

    import Vue from 'vue'
    import { Component, Watch } from 'vue-property-decorator'
    const recordList=recordListModel.fetch()  // model.fetch: model.ts里设置的 引入数据
    // const tagList=tagListModel.fetch()
    // const recordList:RecordItem[]=JSON.parse(window.localStorage.getItem('recordList') || '[]')

    @Component({
        components: { Nav, Layout, NumberPad, Types, Tags, Notes }
    })
    export default class Money extends Vue{
        tag=['衣','食','住','行']
        recordList:RecordItem[]=recordList  // 建立一个空数组,用于存record值
        record:RecordItem={tags:[],notes:'',type:'+',amount:0,createdAt:new Date}  // 赋初始值
        onUpdateTags(value:string[]){
            this.record.tags=value
        }
        onUpdateNotes(value:string){
            this.record.notes=value
        }
        onUpdateType(value:string){
            this.record.type=value
        }
        onUpdateAmount(value:string){
            this.record.amount=parseFloat(value)
        }
        saveRecord(){   // numberpad submit时,把record值push进数组里
            const record2:RecordItem=recordListModel.clone(this.record)  // 深拷贝得到record2
            record2.createdAt=new Date()  // 单独定义一下记录日期的数据
            this.recordList.push(record2)
        }
        @Watch ('recordList')
        onRecordListChange(){  // 每次数组改变时存值,方便下次调用
            recordListModel.save(this.recordList)  // model.save: 导入model.ts的save()来保存数据
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