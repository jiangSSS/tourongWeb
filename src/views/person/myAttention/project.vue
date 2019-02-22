<template>
  <div class="project-menu">
    <div class="project_height">
    <div v-for="(item , index) in projectData" :key="index" class="project-item clearfix">
      <div @click="toProjectDetailPage(item.id)" class="fll">
        <p class="project-item-title">{{item.title}}</p>
        <p class="project-item-content" v-if="item.brief">{{item.brief}}</p>
        <p class="project-item-content" v-else>暂无简介</p>
      </div>
      <button class="flr cancel" @click="cancelBtn(item.id,index)">取消关注</button>
    </div>
    <p v-show="projent_show" class="noAtt">
      你没有关注任何项目哦~ <span style="color:#005982;cursor:pointer" @click="toProject">前去关注→</span>
    </p>
    </div>
    <!-- <div class="mes_page">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
      </div> -->
  </div>
</template>

<script>
export default {
  data(){
    return {
      projectData: [],
      count:1,
      projent_show:false,
    }
  },
  methods:{
    cancelBtn(id,index){
      this.$confirm("即将取消关注, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
        this.$axios.get(`/jsp/wap/trProject/do/doUnfollow.jsp?id=${id}`).then(res => {
          if(res.success == 'true'){
              this.projectData.splice(index,1)  
              this.count -= 1  
              if(this.projectData.length == 0){
                this.projent_show = true
              }   
            }
        })
      })
    },
    getData(pn,followNum){
      this.$axios.get('/jsp/wap/center/ctrl/jsonFollowList.jsp?type=1',{params:{pageNumber:pn,followNum:this.followNum}}).then(res => {
        if(res.success == 'true'){
          console.log(res)
            this.projectData = res.data.pageList
            this.count = Number(res.data.pagination.totalCount)
            if(this.projectData.length == 0){
              this.projent_show = true
            }
          }
      })
    },
    handleCurrentChange(val) {
        this.getData(val)
      },
    toProjectDetailPage(id){
        let {href} = this.$router.resolve({
            name: "projectDetail",
            query: {id}
        });
        window.open(href, '_blank');
      },
    toProject(){
        let {href} = this.$router.resolve({
            name: "project",
        });
        window.open(href, '_blank');
    }
  },
  created(){
    this.getData()
  }
};
</script>

<style scoped lang="scss">
.project-item {
  border-bottom: 1px solid #cdcdcd;
  position: relative;
  .project-item-title {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    color: rgb(62, 58, 57);
    font-weight: bold;
    line-height: 1.333;
    text-align: left;
    width: 620px;
    cursor: pointer;
  }
  .project-item-title:hover {
    color: rgb(0, 89, 130);
  }
  // .project-item-content {
  //   // text-indent:20px;
  //   font-size: 14px;
  //   font-family: "Microsoft YaHei";
  //   color: rgb(137, 137, 137);
  //   line-height: 1.429;
  //   text-align: left;
  //   // 省略
  //   display: -webkit-box;
  //   -webkit-box-orient: vertical;
  //   -webkit-line-clamp: 5;
  //   overflow: hidden;
  // }
  // 适配所有的省略
  .project-item-content {
    font-size: 14px;
    font-family: "Microsoft YaHei";
    color: rgb(137, 137, 137);
    line-height: 1.429;
    text-align: left;
    position: relative;
    width: 620px;
    line-height: 2;
    max-height: 118px;
    overflow: hidden;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    height: 79px;
  }
  .project-item-content::after {
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

.cancel {
  position: absolute;
  right: 0;
  bottom: 20px;
  width: 110px;
    height: 35px;
    color: #999;
    line-height: 0.425;
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1.5px solid #999;
    border-color: #dcdfe6;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    transition: 0.1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    border-radius: 6px;
}

// .project-menu .project-item:last-of-type {
//   border: none;
// }

.project_height {
  min-height: 700px;
}

.cancel:active {
  background: #000;
  border-color: #000;
  color: #fff;
}

.noAtt {
  margin-top: 150px;
  text-align: center;
}

.mes_page {
  margin: 20px 0 ;
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