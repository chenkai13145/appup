<template>
  <div class="famliy" ref="famliysscroll">
    <Split></Split>
    <div class="top">
      <div class="top_top">
       <div class="top_text">
          {{famliys.address}}
       </div>
       <div class="bg_img">
          <div class="content"></div>
       </div>
      </div>
      
      <div class="top_img" v-if="famliys.poi_env" ref="accorscollcount">
             <ul ref="accorscoll">
               <li v-for="(item,index) in famliys.poi_env.thumbnails_url_list"
                :key="index" class="item_img" ref="minscoll">
                   <img :src="item">
               </li>
             </ul>
           
      </div>
      
      <div class="top_bottom">
        <div class="contents">安全品质</div>
      </div>

    </div>


     <Split></Split>
    <div class="center">
          <div class="center_top">
           配送服务：{{famliys.app_delivery_tip}}
          </div>
          <div class="center_bottom">
            配送时间：{{famliys.shipping_time}}
          </div>
    </div>
    

    <Split></Split>
    <div class="bottom">
         <div class="bottom_top" v-if="famliys.poi_service">
           <div class="mist">商家服务</div>
           <div class="dispath" v-for="(item,index) in famliys.poi_service" :key="index">
             <img :src="item.icon">{{item.content}}</div>
         </div>
         <div class="finall">
             <div class="finally" v-for="(items,indexs) in famliys.discounts2" :key="indexs">
              <img :src="items.icon_url"> {{items.info}}</div>
         </div>
    </div>
  </div>
</template>

<script>
import Bsrcoll from 'better-scroll'
export default {
  data () {
    return {
           famliys:{}   
    }
  },
  created(){
    fetch('/api/famliy')
    .then(res=>{
      return res.json()
    })
    .then(datas=>{
       if(datas.code==0){
         this.famliys=datas.data
         //初始化better-scroll
         this.$nextTick(()=>{
           if(this.famliys.poi_env.thumbnails_url_list){
             let imgweith=this.$refs.minscoll[0].clientWidth
             let left=16
             let witdh=(left+imgweith)*this.famliys.poi_env.thumbnails_url_list.length
             this.$refs.accorscoll.style.width=witdh + 'px'
             this.scroll=new Bsrcoll(this.$refs.accorscollcount,{
               scrollX:true
             })
           
           }
             
         })
       }
    })
  },
}
</script>


<style scoped>
.famliy .top{
  display:flex;
  flex-direction: column;
}
.famliy .top .top_top{
  flex-direction: row;
  display: flex;
  width: 100%;
  padding-top: 10px;
}
.famliy .top .top_top .top_text{
  flex: 1;
  padding-left: 16px;
  background: url(img/address.png) no-repeat left center;
  background-size: 14px 16px;
  margin-left: 24px;
  -webkit-line-clamp: 1;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
.famliy .top .top_top .bg_img{
  flex:0 0 86px;
  background:url(img/line.png) no-repeat left center;
}
.famliy .top .bg_img .content{
     	width: 100%;
		  height: 100%;
      background: url(img/phone.png) no-repeat center center;
      background-size: 18px 18px;
}
.famliy .top .top_img{
  margin-top: 20px;
 	white-space: nowrap;
  overflow: hidden;
}

.famliy .top .top_img ul .item_img{
  height: 70px;
  width: 70px;
  margin-left: 16px; 
  display: inline-block;
}
.famliy .top .top_img img{
  width: 100%;
  height: 100%;

}
.famliy .top .top_bottom{
  padding: 10px 20px;
  background: url(img/delivery.png) no-repeat left center;
  background-size: 16px 12px;
  margin-left: 24px;
}

.famliy .center .center_top{
   padding: 20px;
   background: url(img/safety.png) no-repeat left center;
   background-size: 14px 16px;
   margin:0 24px;
   border-bottom: 1px solid rgb(182, 179, 179);
   box-sizing:content-box;
}
.famliy .center .center_bottom{
   padding: 20px;
   background: url(img/time.png) no-repeat left center;
   background-size: 14px 16px;
   margin-left: 24px;
}
.famliy .bottom .bottom_top .mist,
.famliy .bottom .bottom_top .dispath{
         display: inline-block;
}
.famliy .bottom .bottom_top .mist{
  background: url(img/server.png) no-repeat left center;
  padding: 10px 16px;
  background-size: 14px 16px;
  margin-left: 4px;
}
.famliy .bottom .bottom_top{
  border-bottom: 1px solid rgb(223, 222, 222);
  margin: 0 20px;
}
.famliy .bottom .bottom_top .dispath img{
  width: 14px;
  height: 16px;
  vertical-align: bottom;
  margin: 0 10px;
}
.famliy .bottom .finall .finally img{
 width: 16px;
 height: 16px;
 margin-right: 10px;
 vertical-align: top;
}
.famliy .bottom .finall .finally{
  padding: 10px 24px;
  line-height: 26px;
}
</style>
