<template>
  <div id="app">
    <keep-alive>
    <router-view v-if = "$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if = "!$route.meta.keepAlive"></router-view>   
  </div>
</template>

<script>
export default {
  name: "App",
  // mounted(){
  //   this.$router.afterEach((to, from, next) => {
  //       window.scrollTo(0, 0)
  //   })

  // }
};
</script>

<style>
</style>
