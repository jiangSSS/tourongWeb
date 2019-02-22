<template>
  <div class="fll">
    <div class="person_content">
      <p class="project_title">
        <span class="project_">消息中心</span>
      </p>
      <div v-for="(item , index) in informData" :key="index" class="inform_list" @click="hadShow(index)">
        <p class="type">
          <span  v-if="item.noticeType == 0" style="margin-right:15px;">系统</span>
          <span  v-if="item&&item.addTimeStr">{{item.addTimeStr.slice(0,10)}}</span>
        </p>
        <p class="clearfix">
          <!-- <router-link to="/person/informDetail"> -->
            <span class="fll" v-if="item&&item.content">{{item.content}}</span>
            <!-- <span class="red" v-if="item.isRead == '0'"></span> -->
          <!-- </router-link> -->
            <!-- <span class="flr delete">删除</span> -->
        </p>
      </div>
      <div v-show="noShow" class="noChange">暂无消息通知</div>
      <div class="mes_page">
        <el-pagination
          v-show="!noShow"
          background
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        informData:[],
        count:1,
        noShow:false,
      }
    },
    methods:{
      hadShow(index){
        informData[index].push(
                Object.assign({},item,{indexNum:str})
            )
      },
      getData(pn){
        this.$axios.get('/jsp/wap/center/ctrl/jsonNoticeList.jsp',{params:{pageNumber:pn}}).then(res => {
          this.informData = res.data.pageList
          this.count = Number(res.data.pagination.totalCount)
          if(this.informData.length == 0){
            this.noShow = true
          }
        })
      },
      handleCurrentChange(val) {
        this.getData(val)
      },
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

//通知列表
.inform_list {
  // cursor: pointer;
  margin-left: 23px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cdcdcd;
  .type {
    color: rgb( 153, 153, 153 );
    font-size: 14px;
    font-family: "Microsoft YaHei";
  }
  .red {
    display: inline-block;
    margin-left: 5px;
    width: 6px;
    height: 6px;
    background: url(/static/img/red.png) no-repeat center;
    background-size: contain;
  }
  .delete:hover {
    color: rgb(0, 83, 133);    
  }
  a {
    color: #000;
  }
}

.mes_page {
  margin: 20px 0;
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
 .noChange {
    width: 200px;
    margin: 250px auto;
  }
</style>