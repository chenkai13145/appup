<template>
  <div class="coment">
    <div class="top">
      <div class="top_grade">
        <span>{{coment.comment_score}}</span>
        <p>商家评分</p>
      </div>
      <div class="top_left">
        <div class="top_left_top">
        <span>感觉</span>
        <app-smalltu :score="coment.food_score"></app-smalltu>
        </div>
        <div class="top_left_bottom">
        <span>口味</span>
        <app-smalltu :score="coment.quality_score"></app-smalltu>
        </div>
      </div>

      <div class="top_right">
        <span>{{coment.delivery_score}}</span>
        <p>配送评分</p>
      </div>
    </div>
    <Split></Split>
    <div class="nav">
      <div class="nav_top" v-if="coment.tab">
         <div :class="['all',hidden==2?'actives':'']" @click="coments(2)">{{coment.tab[0].comment_score_title}}</div>
         <div :class="['pictrue',hidden==1?'actives':'']" @click="coments(1)">{{coment.tab[1].comment_score_title}}</div>
         <div :class="['comentcount',hidden==0?'actives':'']" @click="coments(0)">{{coment.tab[2].comment_score_title}}</div>
      </div>
      <div class="nav_buttom">
        <ul>
          <li v-for="(item,index) in coment.labels" :key="index" v-if="item.label_star">
            {{item.content}}({{item.label_count}})
          </li>
        </ul>
      </div>
    </div>
     
      <ul class="rating-content" v-if="coment.comments">
            <li 
              v-for="(comment,index) in showcoments" 
              :key="index"
              class="comment-item"
              >
              <div class="comment-header">
                <img :src="comment.user_pic_url" v-if="comment.user_pic_url" />
                <img src="./img/anonymity.png" v-if="!comment.user_pic_url"  />
              </div>
              <div class="comment-main">
                <div class="user">
                  {{comment.user_name}}
                </div>
                <div class="time">
                  {{format(comment.comment_time)}}
                </div>
                <div class="star-warpper">
                  <span>评分</span>
                  <app-smalltu class="star" :score="comment.order_comment_score"></app-smalltu>
                </div>
                <div class="content">
                  {{comment.comment}}
                </div>
              </div>
            </li>
          </ul>

  </div>
</template>

<script>
import Smalltu from '../../components/smalltu/smalltu'
export default {
  data () {
    return {
        coment:{},
        hidden:2,
     
    }
  },
  // props:{
  //   coment:{
  //     type:Object,
  //     default:{}
  //   }
  // },
  created(){
   fetch('/api/coment')
       .then(res=>{return res.json()})
       .then(datas=>{
         if(datas.code==0){
                 this.coment=datas.data
                 console.log(this.coment)
         }
       })
  },
  components:{
    "app-smalltu":Smalltu
  },
  methods:{
    coments(number){
           this.hidden=number
    },
    format(time){//时间戳
       let date = new Date(time * 1000);
				let fmt = 'yyyy.MM.dd';
				if(/(y+)/.test(fmt)) { // 年
					let year = date.getFullYear().toString();
					fmt = fmt.replace(RegExp.$1, year);
				}
				if(/(M+)/.test(fmt)) { // 月
					let mouth = date.getMonth() + 1;
					if(mouth < 10) {
						mouth = '0' + mouth;
					}
					fmt = fmt.replace(RegExp.$1, mouth);
				}
				if(/(d+)/.test(fmt)) { // 日
					let mydate = date.getDate();
					if(mydate < 10) {
						mydate = '0' + mydate;
					}
					fmt = fmt.replace(RegExp.$1, mydate);
				}
				return fmt;
    }
  },
  computed:{
     showcoments(){
         if(this.hidden==2){
           return this.coment.comments
         }else if(this.hidden==1){
           let arr=[]
           this.coment.comments.forEach(element => {
             if(element.comment_pics.length){
               arr.push(element)
             }
           });
           return arr
         }else{
              return this.coment.comments_dp.comments
         }
     }
  }
  
}
</script>


<style scoped>
.coment .top{
  width: 100%;
  display: flex;
  justify-content: space-around;
   align-items: center;
   padding-bottom: 20px;
}
/* .coment .top .top_grade,
.coment .top .top_left,
.coment .top .top_right
{
 
} */

.coment .top .top_grade span{
  font-size: 36px;
  font-weight:bolder;
  color: brown;
  padding-left: 6px;
  box-sizing:content-box;
}
.coment .top .top_grade p{
  font-weight:500;
}

.coment .top .top_right span{
  font-size: 36px;
  font-weight:bolder;
  color:blueviolet;
  padding-left: 6px;
  box-sizing:content-box;
}
.coment .top .top_right p{
  font-weight:400;
  color: rgb(151, 154, 156);
}
.coment .top .top_left .top_left_top,
.coment .top .top_left .top_left_bottom{
  font-size: 10px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}


.coment .nav{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
}
.coment .nav .nav_top{
  display: flex;
  justify-content: space-around;
  border: 1px solid rgb(241, 245, 11);
}
.coment .nav .nav_top .all,
.coment .nav .nav_top .pictrue,
.coment .nav .nav_top .comentcount{
  width: 33%;
  text-align: center;
  padding: 10px 0;
}
.coment .nav .nav_top .actives{
  border: 1px solid rgb(193, 243, 197);
  background: rgba(184, 247, 37,.6);
}
.coment .nav .nav_buttom{
  margin-top: 10px;
}
.coment .nav .nav_buttom ul{
  display: flex;
}
.coment .nav .nav_buttom ul li{
 display: inline-block;
 padding: 6px;
 background: rgb(192, 190, 190);
 border-radius: 6px;
 font-size: 12px;
 margin-right: 4px;
}
.rating-content .comment-item{
	padding: 15px 14px 17px 0;
	border-bottom: 1px solid #F4F4F4;
	width: 100%;
	box-sizing: border-box;
	display: flex;
}
.rating-content .comment-item .comment-header{
	flex: 0 0 41px;
	margin-right: 10px;
}
.rating-content .comment-item .comment-header img{
	width: 41px;
	height: 41px;
	border-radius: 50%;
}

.rating-content .comment-item .comment-main{
	flex: 1;
	margin-top: 6px;
}
.rating-content .comment-item .comment-main .user{
	width: 50%;
	float: left;
	font-size: 12px;
	color: #333333;
}
.rating-content .comment-item .comment-main .time{
	width: 50%;
	float: right;
	text-align: right;
	font-size: 10px;
	color: #666666;
}
.rating-content .comment-item .comment-main .star-warpper span{
 font-size: 13px;
display: inline;
}
.rating-content .comment-item .comment-main .star-warpper .star{
  display: inline;
}
.rating-content .comment-item .comment-main .content{
	margin-top: 17px;
	font-size: 13px;
	line-height: 19px;
}
</style>
