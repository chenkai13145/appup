<template>
    <div class="cartcontrol">
        <transition>
        <div class="icon-remove_circle_outline cart-decrease" @click.stop="del" v-show="count>0"></div>
        </transition>
        <div class="cart-count" v-show="count>0">{{count}}</div>
        
        <div class="icon-add_circle" @click.stop="add"></div>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    data(){
        return{
           
        }
    },
    props:{
        food:{
            type:Object,
            default:{}
        },
        
    },
    methods:{
        del(){
           this.food.count--
        },
        add(){
         if(!this.food.count){
             Vue.set(this.food,"count",1)
         }else{
            this.food.count++
         }
        }
    },
    computed:{
        count(){
            return this.food.count
        }
    }
}
</script>
<style scoped>
@import url(../../common/css/icon.css);
.cartcontrol .cart-decrease{
   display: inline-block;
   width: 20px;
   height: 20px;
   text-align: center;
}
.cartcontrol .cart-count{display: inline-block;}
.cartcontrol .icon-add_circle{
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;}
.cartcontrol .icon-add_circle .bg{}

.v-enter{
   
    transform: translateX(100%) rotate(180deg);
}
.v-leave-to{
   transform: translateX(100%) rotate(180deg);
}
.v-enter-active,
.v-leave-active{
    transition: all 1s linear;
}
</style>
