<template>
        <div>
            <ul class="types">
                <li :class="type==='+' && 'selected'" @click="type='+'">
                    收入
                </li>
                <li :class="type==='-' && 'selected'" @click="type='-'">
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

        @Prop(Number) propA: number | undefined; // props属性必须是number,属性名是propa,它必须是number或undefined
        // 引入methods
        selectType(type:string){   // 声明一下类型
            if(type!=='-' && type!=='+'){  // type只能是+或-
                throw new Error('type is unknown')
            }
            this.type=type
            this.$emit('update.value',type)
        }
        @Watch('type')
        onTypeChanged(value:string){
            this.$emit('update:value',value)
        }
        mounted(){
            if(this.propA===undefined){
                console.log('没有prop')
            }else{
                console.log(this.propA.toString())
            }
        }
    }
    // export default{
    //     name:'Types',
    //     data(){
    //         return {
    //             type:'-'  // -表示收入 +表示支出
    //         }
    //     },
    //     methods:{
    //         selectType(type){
    //             if(type!=='-' && type!=='+'){  // type只能是+或-
    //                 throw new Error('type is unknown')
    //             }
    //             this.type=type
    //         }
    //     }
    // }
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