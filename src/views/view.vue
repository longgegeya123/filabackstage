<template>
  <div class="block">
    <el-card class="box-card">
      <swiper :options="swiperOption">
        <swiper-slide class="swiper-slide" v-for="(item,index) in urls" :key="index">
          <img :src="item"/>
        </swiper-slide>
      </swiper>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      urls: [
        "https://fila-image01.obs.myhwclouds.com/index/sy-sy-19pandaGYY-pc.jpg",
        "https://fila-image01.obs.myhwclouds.com/index/sy-20q1staple-pc.jpg",
        "https://fila-image01.obs.myhwclouds.com/wx/sy-191213ADE-pc.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584104128590&di=6be3364a42db29dd4fb4ece41555182e&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F12%2F20180612023244_cu22r.jpeg",
      ],
      swiperOption: {
        //显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true //允许分页点击跳转
        },
        //设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        //自动轮播
        autoplay: {
          delay: 6000
        },
        //开启循环模式
        loop: true,
        //开启鼠标滚轮控制Swiper切换
        mousewheel: true
      }
    };
  }
};
</script>
<style lang="scss" scoped>
   .block{
     height: 100%;
     .el-card{
       .el-card__body{
         .swiper-container{
             height:898px !important;
             width: auto;
             text-align: center;
         }
       }
     }
   }
</style>