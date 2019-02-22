<template>
<div>
  <img src="/static/img/lianxiwomen.jpg" width="100%" alt="" style="min-width:1200px;">
  <div class="w1200 call clearfix">
    <div class="call_box fll">
      <img src="/static/img/zaixiankefu.png" alt="" width="150px">
      <p class="title">在线客服</p>
      <p>010-82033116</p>
    </div>
    <div class="call_box fll">
      <img src="/static/img/kefuyouxiang.png" alt="" width="150px">
      <p class="title">客服邮箱</p>
      <p>kefu@zqcmlink.com</p>
    </div>
    <div class="call_box fll">
      <img src="/static/img/xinliangweibo.png" alt="" width="150px">
      <p class="title" style="cursor:pointer;" @click="xinlang">新浪微博</p>
      <p style="cursor:pointer;" @click="xinlang">证券传媒投融连线</p>
    </div>
    <div class="call_box fll">
      <img src="/static/img/lianxidizhi.png" alt="" width="150px">
      <p class="title">联系地址</p>
      <p>北京市西城区裕民东路3号京版信息港8层</p>
    </div>
    <div class="call_box fll">
      <img src="/static/img/shangwuhezuoyouxiang.png" alt="" width="150px">
      <p class="title">商务合作邮箱</p>
      <p>cooperator@zqcmlink.com</p>
    </div>
    <div class="call_box fll" style="margin-bottom:150px;">
      <img src="/static/img/rencaizhaopinyouxiang.png" alt="" width="150px">
      <p class="title">人才招聘邮箱</p>
      <p>hr@zqcmlink.com</p>
    </div>
    <!-- <div class="clearfix">
      <h2 class="fll">联系地址：</h2> <p class="text">北京市西城区裕民东路3号京版信息港8层</p>
      <h2 class="fll" style="margin-left:100px">客服电话：</h2> <p class="text">010-82033116</p>
    </div>
    <div class="clearfix">
      <h2 class="fll">客服邮箱：</h2> <p class="text">kefu@zqcmlink.com</p>
      <h2 class="fll" style="margin-left:235px">qq：</h2> <p class="text">776671078</p>
    </div>
    <div class="clearfix">
      <h2 class="fll">商务合作邮箱：</h2> <p class="text">cooperator@zqcmlink.com</p>
      <h2 class="fll" style="margin-left:135px">人才招聘邮箱：</h2> <p class="text">hr@zqcmlink.com</p>
    </div>
    <div class="clearfix">
      <h2 class="fll">新浪微博：</h2> <p class="text"> <a href="https://weibo.com/u/6914234011?is_hot=1" style="color:#000">证券传媒投融连线</a></p>
    </div> -->
  </div>
  </div>
</template>

<script>
  export default {
    methods:{
      xinlang(){
        let href = 'https://weibo.com/u/6914234011?is_hot=1'
        window.open(href, "_blank");
      }
    }
  }
</script>

<style scoped lang="scss">
.call_box {
  width: 400px;
  height: 400px;
  img {
    margin-top: 60px;
    margin-left: 125px;
  }
  p {
    text-align: center;
  }
  .title {
    font-size: 22px;
    font-weight: 700;
  }
}
</style>