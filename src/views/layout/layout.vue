<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Bottom></Bottom>
  </div>
</template>

<script>
  import Header from "@/components/Header.vue"
  import Bottom from "@/components/Bottom.vue"

  export default {
    components :{
      Header,
      Bottom
    }
  }
</script>

<style scoped>

</style>