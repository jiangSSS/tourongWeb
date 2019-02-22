<template>
  <div class="fll">
    <div class="person_content">
      <p class="project_title">
        <span class="project_">我的权益</span>
      </p>
      <p v-if="!isVip">
        您暂未开通会员
        <img src="/static/img/bg-2.jpg" alt="" class="toMember" @click="toMember">
      </p>
      <p v-else>
        您已开通会员服务，有效期至2019-12-3
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        isVip:false,
      }
    },
    methods:{
      getData(){
        if(this.$store.state.userinfo.isVip == '0'){
          this.isVip = false
        } else {
          thsi.isVip = true
        }
      },
      toMember(){
        let {href} = this.$router.resolve({
              name: "member",
          });
        window.open(href, '_blank');
      }
    },
    created(){
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
.project_title {
  font-size: 18px;
  font-family: "Microsoft YaHei";
  color: rgb(0, 83, 133);
  font-weight: bold;
  padding-bottom: 20px;
  border-bottom: 1px dashed #cdcdcd;
  .project_ {
    padding-left: 20px;
    border-left: 5px solid #005982;
  }
}
.toMember {
  width: 100%;
  margin-top: 20px;
  min-width: 920px;
  cursor: pointer;
}
</style>