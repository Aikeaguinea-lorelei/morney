<template>
        <div>
            <ul class="types">
                <li @click="type='+'" :class="{selected: type === '+', [classPrefix+'-item']: classPrefix}">
                    收入
                </li>
                <li @click="type='-'" :class="{selected: type === '-', [classPrefix+'-item']: classPrefix}">
                    支出
                </li>
            </ul>
        </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop, Watch} from 'vue-property-decorator';
    // 引入装饰器
    @Component
    export default class Types extends Vue{
        // 引入data
        type='-'

        @Prop(String) readonly value!:string 
        @Prop(String) classPrefix?:string

        @Watch('type')
        onTypeChanged(value:string){
            this.$emit('update:value',value)
        }
        mounted(){
            this.type = this.value
        }
    }
</script>

<style lang="scss" scoped>
    .types{
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