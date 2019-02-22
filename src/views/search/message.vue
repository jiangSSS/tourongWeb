<template>
  <div>
  <div v-loading="loading">
        <div v-for="(item , index) in messageData" :key="index" style="cursor:pointer;" class="mg-20" @click="toMessageDetailPage(item.id)">
          <div v-if="item.imgPath" class="clearfix">
            <img :src="$url + item.imgPath" alt class="fll" width="152px" height="101px">
            <div class="fll mes_box">
              <p class="title">{{item.title}}</p>
              <div class="clearfix">
                <span class="fll time">发布时间；{{item.publishTimeStr}}</span>
                <span class="flr num">阅读：{{item.readNum}}次</span>
              </div>
              <p class="content">{{item.brief}}</p>
            </div>
          </div>
          <div v-else class="clearfix">
            <div class="fll mes_box2">
              <p class="title">{{item.title}}</p>
              <div class="clearfix">
                <span class="fll time">发布时间；{{item.publishTimeStr}}</span>
                <span class="flr num">阅读：{{item.readNum}}次</span>
              </div>
              <p class="content" >{{item.brief}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="mes_page" v-if="this.count > this.messageData.length">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
      </div>
      <p v-else style="color:#999;">-------------------------------------------------没有更多资讯了----------------------------------------------------</p>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        count:1,
        messageData:[],
        loading:false,
        newsloading:false,
        title:'',
      }
    },
    methods:{
      getData(pageNumber){
        this.loading = true
        this.title = this.$route.query.title
        console.log(this.title);
        this.$axios.get('/jsp/wap/trNews/ctrl/jsonNewsPage.jsp',{params:{title:this.title,pageNumber}}).then(res => {
          this.messageData = res.data.pageList
          this.count = Number(res.data.pagination.totalCount)
          this.loading = false
        })
      },
      handleCurrentChange(val) {
        this.getData(val)
      },
      toMessageDetailPage(id){
        let {href} = this.$router.resolve({
            name: "messageDetail",
            query: {id}
        });
        window.open(href, '_blank');
      },
    },
    created(){
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
//资讯
.mes_all {
  padding-right: 30px;
  box-sizing: border-box;
}
.mes_type {
  font-size: 18px;
  font-family: "Microsoft YaHei";
  color: rgb(102, 102, 102);
  line-height: 1.333;
  text-align: left;
  padding-left: 20px;
  border-left: 3px solid #005982;
  margin-bottom: 0;
  .type {
    padding-left: 30px;
    cursor: pointer;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
  .active {
    color: #005982;
  }
}
.mes_top {
  padding-bottom: 18px;
  border-bottom: 1px solid #d9d9d9;
}
.mes_box {
  width: 638px;
  margin-left: 20px;
  .title {
    color: #000;
    margin-top: 0;
    margin-bottom: 10px;
  }
  .time {
    font-size: 12px;
    font-family: "SimSun";
    color: rgb(153, 153, 153);
    line-height: 2;
  }
  .num {
    font-size: 12px;
    font-family: "SimSun";
    color: rgb(153, 153, 153);
    line-height: 2;
  }
  .content {
    font-size: 14px;
    font-family: "Microsoft YaHei";
    color: #999;
    line-height: 1.286;
  }
  .content {
    position: relative;
    max-height: 35px;
    overflow: hidden;
  }
  .content::after {
    // ;
    position: absolute;
    bottom: 0;
    right: 0;
    padding-left: 5px;
    background: -webkit-linear-gradient(left, transparent, #fff 55%);
    background: -o-linear-gradient(right, transparent, #fff 55%);
    background: -moz-linear-gradient(right, transparent, #fff 55%);
    background: linear-gradient(to right, transparent, #fff 55%);
  }
}
.mes_box2 {
  .title {
    margin-top: 5px;
    margin-bottom: 10px;
    color: #000;
  }
  .time {
    font-size: 12px;
    font-family: "SimSun";
    color: rgb(153, 153, 153);
    line-height: 2;
  }
  .num {
    font-size: 12px;
    font-family: "SimSun";
    color: rgb(153, 153, 153);
    line-height: 2;
  }
  .content {
    font-size: 14px;
    font-family: "Microsoft YaHei";
    color: #999;
    line-height: 1.286;
  }
  .content {
    position: relative;
    max-height: 35px;
    overflow: hidden;
  }
  .content::after {
    position: absolute;
    bottom: 0;
    right: 0;
    padding-left: 5px;
    background: -webkit-linear-gradient(left, transparent, #fff 55%);
    background: -o-linear-gradient(right, transparent, #fff 55%);
    background: -moz-linear-gradient(right, transparent, #fff 55%);
    background: linear-gradient(to right, transparent, #fff 55%);
  }
}
//分页
.mes_page {
  margin: 70px 0 60px;
  padding: 0 60px;
  /deep/ {
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background: #005983 !important;
      color: #fff !important;
    }
    .el-pagination.is-background .el-pager li {
      background: #fff !important;
      color: #000 !important;
      border: 1px solid #d9d9d9 !important;
      font-weight: 400;
    }
  }
}
</style>