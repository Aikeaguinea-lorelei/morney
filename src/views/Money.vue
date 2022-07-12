<template>
    <Layout class-prefix="xxx"> 
        <!-- {{recordList}} -->
        <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
        <Types @update:value="onUpdateType" />
        <Tabs :data-source="typeList" :value.sync="type" />
        <div class="notes">
            <Notes field-name="备注" placeholder="在这里输入备注" @update:value="onUpdateNotes" />
        </div>
        <Tags :data-source="tagNames" @update:value="onUpdateTags" />
        <!-- {{store.state.count}} <button @click="$store.commit('increment',1)">+1</button> -->
    </Layout>
</template>

<script lang="ts">
declare var require: any  // 防止require报错

import Nav from '../components/Nav.vue';
import Layout from '../components/Layout.vue';
import NumberPad from '../components/NumberPad.vue';
import Tags from '../components/Tags.vue';
import Notes from '../components/Notes.vue';
import store from '../store/index';
import oldStore from '../store/index2'
import typeList from '@/constants/typeList';


    import Vue from 'vue'
    import { Component } from 'vue-property-decorator'
    import recordListModel from '@/models/recordListModel';
    import Tabs from '../components/Tabs.vue';
    // const recordList=recordListModel.fetch()  // model.fetch: model.ts里设置的 引入数据
    // const tagList=tagListModel.fetch()
    // const recordList:RecordItem[]=JSON.parse(window.localStorage.getItem('recordList') || '[]')

    @Component({
        components: { Nav, Layout, recordListModel, NumberPad,  Tags, Notes, Tabs },
        computed:{  // computed写进装饰器里面
            // count(){
            //     return store.state.count
            // },
            recordList(){
                return this.$store.state.recordList  // 建立一个空数组,用于存record值
            }
        }
    })
    export default class Money extends Vue{
        store=store
        tags=oldStore.tagList
        typeList=typeList
        type='-'
        // recordList=oldStore.recordList  // 建立一个空数组,用于存record值
        record:RecordItem={tags:[],notes:'',type:'+',amount:0,createdAt:new Date}  // 赋初始值
        created(){
            this.$store.commit('fetchRecords')  // fetchRecords: index.ts里面创建的读取数据函数
        }
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
            this.$store.commit('createRecord',this.record)  // createRecord: index.ts里面创建的添加数据的函数
        }
        get tagNames() {
            return this.tags.map(t => t.name)
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
    .notes{
        padding: 12px 0;
    }
</style>