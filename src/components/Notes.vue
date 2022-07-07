<template>
        <div>
            <label class="notes">
                <span class="name">{{this.fieldName}}</span>
                <input type="text" v-model="value" 
                @input="onValueChanged($event.target.value)"
                :placeholder="this.placeholder">
            </label>
        </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Watch, Prop} from 'vue-property-decorator';
    @Component
    export default class Notes extends Vue{
        value=''
        @Prop({default:''}) value1!:string 
        //       必填   :一个从money传入的fieldName
        @Prop({required:true}) fieldName!:string  // ! :值一定存在
        @Prop() placeholder?:string   // ? :值有可能不存在

        @Watch('value')  // 侦听value的值,当value改变时将他的值update
        onValueChanged(value:string){
            this.$emit('update:value',value)
        }
        onInput(event:KeyboardEvent){
            const input=event.target as HTMLInputElement
            this.value=input.value
        }
    }
</script>

<style lang="scss" scoped>
    .notes{
        // background: #f5f5f5;
        display: flex;
        font-style: 14px;
        padding-left: 0 16px;
        align-items: center;
        .name{
            padding-right: 16px;
        }
        input{
            height: 40px;
            flex-grow: 1;
            background: transparent;
            border: none;
            padding-right: 16px;
        }
    }
</style>