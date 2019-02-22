<template>
  <div class="fll">
    <div class="person_content">
      <p class="clearfix">
        <span class="mine_money fll">资金草稿</span>
        <span class="flr clearfix">
          
        </span>
      </p>
      <p class="project_title">
        <span class="project_">草稿信息</span>
      </p>
      <div class="invest-menu clearfix">
        <div v-for="(item , index) in pageList" :key="index" class="invest-item fll clearfix">
          <div class="invest-text fll">
            <p class="invest-item-title" @click="toMoneyDetailPage(item.id,item.status)">{{item.title}}</p>
            <p class="invest-item-list">
              投资资金：
              <span class="invest-money">{{item.investAmount}}</span>
            </p>
            <p class="invest-item-list w230 inb">
              投资方式：
              <span class="invest-content">{{item.investCase}}</span>
            </p>
            <p class="invest-item-list inb">
              资金类型：
              <span class="invest-content">{{item.investTypeName}}</span>
            </p>
            <p class="invest-item-list w230 inb">
              投资地区：
              <span class="invest-content">{{item.investRegionNameStr}}</span>
            </p>
            <p class="invest-item-list inb">
              投资行业：
              <span class="invest-content">{{item.investIndustryName}}</span>
            </p>
            <p class="invest-item-list w230 inb">
              投资类型：
              <span class="invest-content">{{item.investTypeName}}</span>
            </p>
            <p class="invest-item-list inb">
              投资阶段：
              <span class="invest-content">{{item.investStageName}}</span>
            </p>
          </div>
          <!-- <span class="flr" :class="item.check == 0 ? ' already':'' + item.check == 1 ? ' being':'' + item.check == 2 ? ' not':'' + item.check == 3 ? ' fail':''">{{item.check == 0 ? '已发布':'' + item.check == 1 ? '审核中':'' + item.check == 2 ? '未发布':''}}</span> -->
          <span
            class="flr"
            v-if="item.status != '0'"
            :class="item.status  == '5' ? ' being':'' + item.status == '10' ? ' already':'' + item.status == '15'? ' fail':''"
          >{{item.status == '5' ? '审核中':'' + item.status == '10' ? '已发布':'' + item.status == '15'? '':''}}</span>
          <span class="flr not" v-else>未发布</span>
          <!-- <el-button title="添加动态"  class="flr manage" icon="el-icon-edit-outline" circle size="mini" @click="manage(item.id)"></el-button> -->
          <el-button title="修改" type="primary" icon="el-icon-edit" circle class="flr cancel1" size="mini" @click="amend(item.id)"></el-button>
          <el-button title="删除" type="danger" icon="el-icon-delete" circle class="flr cancel2" size="mini" @click="delete_item(item.id,index)"></el-button>
        </div>
        <p v-show="pageList.length == 0" class="noAtt">你没有任何资金哦~</p>
      </div>
      <div class="mes_page">
        <el-pagination
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
  data() {
    return {
      investData: [],
      pageList:[],
      count:1,
    };
  },
  methods: {
    getData(pageNumber){
        this.$axios.get('/jsp/wap/center/ctrl/jsonMyCapitalList.jsp',{params:{pageNumber,status:0}}).then(res => {
          if(res.success == 'true'){
            this.pageList = res.data.pageList
            this.count = Number(res.data.pagination.totalCount)
          }
        })
      },
      handleCurrentChange(val) {
        this.getData(val)
      },
      toMoneyDetailPage(id,status){
        if(status == '10'){
          let {href} = this.$router.resolve({
              name: "moneyDetail",
              query: {id}
          });
          window.open(href, '_blank');
        } else {
          this.$message.info('资金尚未通过审核')
        }
      },
    amend(id){
      let {href} = this.$router.resolve({
              name: "applyMoney",
              query: {id}
          });
          window.open(href, '_blank');
    },
    applyMoney(){
      let {href} = this.$router.resolve({
              name: "applyMoney",
          });
      window.open(href, '_blank');
    },
    uploadMoney(){
      let {href} = this.$router.resolve({
              name: "uploadApplyMoney",
          });
      window.open(href, '_blank');
    },
    delete_item(id,index){
      this.$confirm("即将删除资金, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=> {
        this.$axios.get(`/jsp/wap/center/do/doDelCapital.jsp?id=${id}`).then(res => {
          this.pageList.splice(index,1)
          this.count -= 1
        })
      })
    },
    manage(id){
      let {href} = this.$router.resolve({
              name: "manageMoney",
              query: {id}
          });
          window.open(href, '_blank');
    },
  },
  created(){
    this.getData()
  }
};
</script>

<style scoped lang="scss">
.mine_money {
  font-family: "Microsoft YaHei";
  color: rgb( 153, 153, 153 );
  line-height: 32px;
}
.invest-item {
  width: 100%;
  height: 180px;
  margin-top: 20px;
  border-bottom: 1px solid #cdcdcd;
  position: relative;
}
.invest-text {
  margin-left: 10px;
  width: 750px;
}
.invest-item-title {
  font-size: 18px;
  font-family: "Microsoft YaHei";
  color: rgb(62, 58, 57);
  font-weight: bold;
  line-height: 1.333;
  text-align: left;
  height: 42px;
  margin: 0;
  cursor: pointer;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis;
}
.invest-item-title:hover {
  color: rgb(0, 89, 130);
}
.invest-item-list {
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: rgb(137, 137, 137);
  text-align: left;
  margin-top: 13px;
  margin-bottom: 0;
  .invest-money {
    font-size: 18px;
    font-weight: bold;
    color: #005982;
  }
}
.w230 {
  width: 350px;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis;
}
.inb {
  display: inline-block;
  width: 350px;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis;
}
.cancel1 {
  position: absolute;
  right: 40px;
  bottom: 10px;
  background-color: rgb(0, 83, 133);
  border: #005982;
}

.cancel2 {
  position: absolute;
  right: 0;
  bottom: 10px;
}

.invest-menu .invest-item:last-of-type {
  border: none;
}

.noAtt {
  margin: 250px 0;
  text-align: center;
  height: 100px;
}

.project_title {
  margin-top: 40px;
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

  .noLikeBtn {
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
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px 12px 35px;
    border-radius: 6px;
    position: relative;
    i {
      display: inline-block;
      width: 15px;
      height: 15px;
      background: url(/static/img/jiahao-1.png) no-repeat center;
      background-size: contain;
      position: absolute;
      top: 9px;
      left: 15px;
    }
  }
  .noLikeBtn:active {
    background: #000;
    border-color: #000;
    color: #fff;
  }
  .likeBtn {
      width: 110px;
      height: 35px;
      color: #005982;
      line-height: 0.425;
      display: inline-block;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1.5px solid #005982;
      border-color: #005982;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      margin: 0;
      margin-left: 15px;
      transition: 0.1s;
      font-weight: 500;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      padding: 12px 20px 12px 35px;
      border-radius: 4px;
      position: relative;
      i {
        display: inline-block;
        width: 15px;
        height: 15px;
        background: url(/static/img/shangchuan-1.png) no-repeat center;
        background-size: contain;
        position: absolute;
        top: 9px;
        left: 15px;
      }
  }

  //提醒样式
  .already {
    margin-top: 60px;
    margin-right: 7px;
    font-size: 18px;
    color: #999;
  }
  .being {
    margin-top: 60px;
    margin-right: 7px;
    font-size: 18px;
    color: #fc7f7f;
  }
  .not {
    margin-top: 60px;
    margin-right: 7px;
    font-size: 18px;
    color: #faa251;
  }
  .fail {
    display: inline-block;
    margin-top: 20px;
    width: 80px;
    height: 80px;
    background: url(/static/img/shenheshibai.png) no-repeat center;
    background-size: contain;
  }

  .manage {
    position: absolute;
    right: 80px;
    bottom: 9px;
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
</style>