<template>
  <div id="app">
     <!-- 头部 -->
      <app-header :headerdata="headerdata"></app-header>





     <!-- 导航 -->
     <div class="nav">
       <router-link class="nav-item" to="/goods">
       <i class="line"></i>点餐
       </router-link>
       <router-link class="nav-item" to="/coment">
       <i class="line"></i>评论({{comment.comment_num}})</router-link>
       <router-link class="nav-item" to="/famliy">
       <i class="line"></i>商家</router-link>
     </div>
     
     <!-- 内容 --> 
     
     <router-view></router-view>
 

  </div>
</template>
   
<script>
import Header from './components/header/Header'
export default {
  data(){
    return{
     headerdata:{},
     comment:{}
    }
  },
   methods:{
    
   },
   created(){
    this.goods()
    this.coment()
   
   },
   methods:{
     coment(){
       fetch('/api/coment')
       .then(res=>{return res.json()})
       .then(datas=>{
         if(datas.code==0){
                 this.comment=datas.data
         }
       })
     },


     goods(){
       fetch("/api/goods")
    .then(res=>{
      return res.json()
    })
    .then(datas=>{
      if(datas.code==0){
        this.headerdata=datas.data.poi_info
      }
    })
    .catch(err=>console.log(err))
     }
   },
   
  components:{
    "app-header":Header
  }
}
</script>

<style scoped>
/* nav样式的设置 */
.nav{
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d5d5d8;
}
.nav .nav-item{
   text-decoration: none;
   position: relative;
   font-size: 13px;
   color: #666666;
}
/* 选中的样式 */
.nav .active{
  color: #f1f50b;
}
.nav .active .line{
  background: #f1f50b;
  display:inline-block;
  height: 2px;
  width: 20px;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -10px;
}




</style>

