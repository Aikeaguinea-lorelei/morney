<template>
        <div class="numberPad">
            <div class="output">{{output || 0}}</div>
            <div class="buttons clearfix">
                <button @click="inputContent">1</button>
                <button @click="inputContent">2</button>
                <button @click="inputContent">3</button>
                <button @click="remove">删除</button>
                <button @click="inputContent">4</button>
                <button @click="inputContent">5</button>
                <button @click="inputContent">6</button>
                <button @click="clear">清空</button>
                <button @click="inputContent">7</button>
                <button @click="inputContent">8</button>
                <button @click="inputContent">9</button>
                <button @click="ok" class="ok">OK</button>
                <button @click="inputContent" class="zero">0</button>
                <button @click="inputContent">.</button>
            </div>
        </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component
    export default class numberPad extends Vue{
        output=''  // output是字符串,字符串1+字符串2=字符串12
        inputContent(event:MouseEvent){
            const button=(event.target as HTMLButtonElement)  // 强制指定事件类型
            const input=button.textContent!
            if(this.output.length===16){
                return 
            }
            if(this.output==='0'){  // 在面板上只有0的情况下再打0,就不再显示
                if('0123456789'.indexOf(input)>=0){  // 除了0之外的任意数
                    this.output=input
                }else{
                    this.output+=input
                }
                return
            }
            if(this.output.indexOf('.')>=0){  // 如果面板上有.则不再加.
                if(input==='.'){
                    return
                }
            }
            this.output+=input 
        }
        remove(){
            this.output=this.output.slice(0,-1)
        }
        clear(){
            this.output=''
        }
        ok(){}
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";  // 引入了@extend %x 之后需要import
    .numberPad{
        .output{
            @extend %x;
            font-size:36px;
            font-family: Consolas ,monospace;  // 字母是原始字体
            padding:9px 16px;
            text-align: right;  // 放最右边
            box-shadow: inset 0 -5px 5px -5px fade_out(black,0.7)
        }
        .buttons{
            @extend %x;  //  把所有引入这个的选择器复制到helper去.(继承style/helper.scss里设置的样式. )
            > button{
                width: 25%;   // 每行4个
                height: 64px;
                float: left;
                // 去掉按键初始样式
                background: transparent;
                border: none;
                &.ok{
                    height: 128px;
                    float: right;  // 其他按键左浮,OK键右浮: 解决它占两列的问题
                }
                &.zero{
                    width: 50%;
                }
                $bg:#f2f2f2;
                &:nth-child(1){
                    background: $bg;
                }
                &:nth-child(2),&:nth-child(5){
                    background: darken($bg,4%);
                }
                &:nth-child(3),&:nth-child(6),&:nth-child(9){
                    background: darken($bg,8%);
                }
                &:nth-child(4),&:nth-child(7),&:nth-child(10){
                    background: darken($bg,12%);
                }
                &:nth-child(8),&:nth-child(11),&:nth-child(13){
                    background: darken($bg,16%);
                }
                &:nth-child(14){
                    background: darken($bg,20%);
                }
                &:nth-child(12){
                    background: darken($bg,24%);
                }
            }
        }
    }
</style>