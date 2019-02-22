<template>
  <div class="invest-menu clearfix">
    <div class="invest_height">
    <div v-for="(item , index) in investData" :key="index" class="invest-item fll clearfix">
      <div class="invest-text fll" @click="toMoneyDetailPage(item.id)">
        <p class="invest-item-title">{{item.title}}</p>
        <p class="invest-item-list">
          投资资金：
          <span class="invest-money" v-if="item.investAmountName">{{item.investAmountName}}</span>
          <span class="invest-money" v-else>****</span>
        </p>
        <p class="invest-item-list w230 inb">
          投资方式：
          <span class="invest-content" v-if="item.investWayName">{{item.investWayName}}</span>
          <span class="invest-content" v-else>****</span>
        </p>
        <p class="invest-item-list inb">
          资金类型：
          <span class="invest-content">{{item.pawnTypeName}}</span>
        </p>
        <p class="invest-item-list w230 inb">
          投资地区：
          <span class="invest-content">{{item.regionNameStr}}</span>
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
      <button class="flr cancel" @click="cancelBtn(item.id,index)">取消关注</button>
    </div>
    <p v-show="invest_show" class="noAtt">你没有关注任何资金哦~ <span style="color:#005982;cursor:pointer" @click="toMoney">前去关注→</span></p>
    </div>
    <!-- <div class="mes_page" v-show="!invest_show">
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
      investData: [],
      count:1,
      invest_show:false,
    }
  },
  methods:{
    cancelBtn(id,index){
      this.$confirm("即将取消关注, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
        this.$axios.get(`/jsp/wap/trCapital/do/doUnfollow.jsp?id=${id}`).then(res => {
          if(res.success == 'true'){
              this.investData.splice(index,1)    
              if(this.investData.length == 0){
                this.invest_show = true
              }   
            }
        })
      })
    },
    getData(pageNumber){
      this.$axios.get('/jsp/wap/center/ctrl/jsonFollowList.jsp?type=2',{params:{pageNumber}}).then(res => {
        console.log(res);
        if(res.success == 'true'){
            this.investData = res.data.pageList
            this.count = Number(res.data.pagination.totalCount)
            if(this.investData.length == 0){
              this.invest_show = true
            }
          }
      })
    },
    handleCurrentChange(val) {
        this.getData(val)
      },
    toMoneyDetailPage(id){
        let {href} = this.$router.resolve({
            name: "moneyDetail",
            query: {id}
        });
        window.open(href, '_blank');
      },
    toMoney(){
        let {href} = this.$router.resolve({
            name: "money",
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
.invest-item {
  width: 100%;
  height: 180px;
  margin-top: 20px;
  border-bottom: 1px solid #cdcdcd;
  position: relative;
}
.invest-text {
  margin-left: 10px;
  width: 700px;
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
  width: 300px;
  height: 16px;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis;
}
.inb {
  width: 300px;
  height: 16px;
  display: inline-block;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis;
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

// .invest-menu .invest-item:last-of-type {
//   border: none;
// }

.cancel:active {
  background: #000;
  border-color: #000;
  color: #fff;
}

.noAtt {
  margin-top: 150px;
  text-align: center;
}

.invest-content {
  display: inline-block;
}
.invest_height {
  min-height: 700px;
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