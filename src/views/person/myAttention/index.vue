<template>
  <div class="fll">
    <div class="person_content"> 
      <div class="clearfix top">
        <div class="navMenu fll"><router-link :to="{name:'attentionProject'}">关注的项目</router-link></div>
        <div class="navMenu fll"><router-link :to="{name:'attentionMoney'}">关注的资金</router-link></div>
        <div class="navMenu fll"><router-link :to="{name:'attentionActivity'}">关注的活动</router-link></div>
        <div class="navMenu fll"><router-link :to="{name:'label'}">标签设置</router-link></div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped lang="scss">
.navMenu {
  padding: 10px 70px 10px 30px;
  font-size: 18px;
  font-family: "Microsoft YaHei";
  color: rgb(62, 58, 57);
  font-weight: bold;
  cursor: pointer;
  a {
    color: rgb(62, 58, 57);
    padding-bottom: 20px;
  }
}
.navMenu:hover {
  color: rgb(0, 89, 130);
}
//点击样式随路由变化
.router-link-active {
  color:rgb(0, 89, 130) !important;
  border-bottom: 2px solid #005982;
}

.top {
  margin-bottom:20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #cdcdcd;
}
</style>