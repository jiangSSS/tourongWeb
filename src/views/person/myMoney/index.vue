<template>
  <div class="fll">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        investData: [],
        pageList: [],
        count: 1,
        // bespokeNum:""
      };
    },
    methods: {
      getData(pageNumber) {
        this.$axios.get('/jsp/wap/center/ctrl/jsonMyCapitalList.jsp', { params: { pageNumber, status: 1 } }).then(res => {
          console.log("我的资金",res)
          if (res.success == 'true') {
            this.pageList = res.data.pageList
            this.count = Number(res.data.pagination.totalCount)
          }
        })
      },
      handleCurrentChange(val) {
        this.getData(val)
      },
      toMoneyDetailPage(id, status) {
        if (status == '10') {
          let { href } = this.$router.resolve({
            name: "moneyDetail",
            query: { id }
          });
          window.open(href, '_blank');
        } else {
          this.$alert('该资金尚未通过审核', {
            confirmButtonText: '确定',
            
          });
        }
      },
      amend(id) {
        let { href } = this.$router.resolve({
          name: "applyMoney",
          query: { id }
        });
        window.open(href, '_blank');
      },
      applyMoney() {
        let { href } = this.$router.resolve({
          name: "applyMoney",
        });
        window.open(href, '_blank');
      },
      uploadMoney() {
        if (this.$store.state.userinfo.isVip == '0') {
          this.$confirm('只有会员才能享受快速上传, 是否办理会员?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            let { href } = this.$router.resolve({
              name: "member",
            });
            window.open(href, '_blank');
          }).catch(() => {

          });
        } else {
          let { href } = this.$router.resolve({
            name: "uploadApplyMoney",
          });
          window.open(href, '_blank');
        }
      },
      delete_item(id, index) {
        this.$confirm("即将删除资金, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$axios.get(`/jsp/wap/center/do/doDelCapital.jsp?id=${id}`).then(res => {
            this.pageList.splice(index, 1)
            this.count -= 1
          })
        })
      },
      manage(id) {
        let { href } = this.$router.resolve({
          name: "manageMoney",
          query: { id }
        });
        window.open(href, '_blank');
      },
      todraft() {
        let { href } = this.$router.resolve({
          name: "myMoneyDraft",
        });
        window.open(href, '_blank');
      },
      todelivery() {
        let { href } = this.$router.resolve({
          name: "deliverMoney",
        });
        window.open(href, '_blank');
      }
    },
    created() {
      this.getData()
    }
  };
</script>

<style scoped lang="scss">
.nosuccess{
  margin-top: 90px;
  margin-right: 7px;
}
  .deliver {
    position: absolute;
    top: 0;
    right: 0;
  }
  .mine_money {
    font-family: "Microsoft YaHei";
    color: rgb( 153, 153, 153);
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
    overflow: hidden;
    /*超出部分隐藏*/
    white-space: nowrap;
    /*不换行*/
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
    overflow: hidden;
    /*超出部分隐藏*/
    white-space: nowrap;
    /*不换行*/
    text-overflow: ellipsis;
  }

  .inb {
    display: inline-block;
    width: 350px;
    overflow: hidden;
    /*超出部分隐藏*/
    white-space: nowrap;
    /*不换行*/
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
  } //提醒样式
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