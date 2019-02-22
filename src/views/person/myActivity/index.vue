<template>
  <div class="fll">
    <div class="person_content">
      <p class="project_title">
        <span class="project_">我报名的活动</span>
      </p>
      <div
        class="act_list clearfix"
        v-for="(item, index) in pageList"
        :key="index + 'act'"
      >
        <!-- <img :src="item.img" alt width="270px" height="180px" class="fll"> -->
        <div class="fll list">
          <p class="list-title"  @click="toActivityDetailPage(item.id)">活动：{{item.title}}</p>
          <p class="list-content">
            <i class="local"></i>
            {{item.address}}
          </p>
          <p class="list-content">
            <i class="company"></i>
            {{item.speaker}}
          </p>
          <p class="list-content2">
            <i class="num"></i>
            报名人数：{{item.applyNumStr}}
          </p>
          <!-- <p class="list-content2">
            <i class="time"></i>
            报名时间：{{item.regStartTimeStr}} 至 {{item.regEndTimeStr}}
          </p> -->
          <p class="list-content2">
            <i class="time"></i>
            活动时间：{{item.startTimeStr}} 至 {{item.endTimeStr}}
          </p>
        </div>
        <div class="fll apply_mes">
          <p class="list-title">报名信息：
            <span  v-if="item.regStatus == 1" class="suc">审核通过</span>
            <span v-else class="noSuc">待审核</span>
          </p>
          <p class="list-content2">
            <i class="time"></i>
            报名时间：{{item.regTimeStr}}
          </p>
          <p class="list-content2">
            <i class="num"></i>
            姓名：{{item.memberName}}
          </p>
          <p class="list-content">
            <i class="phone"></i>
            联系电话：{{item.memberMobile}}
          </p>
          <p class="list-content" v-if="item.remark">
            <i class="beizhu"></i>
            备注：{{item.remark}}
          </p>
        </div>
      </div>
      <p v-show="pageList.length == 0" class="noAtt">你没有报名任何活动哦~</p>
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
    data(){
      return {
        actlist: [
          {
            name:'沈平',
            img: "/static/img/list-1.jpg",
            title: "投融资讯活动",
            local: "北京市海淀区天秀路10号中国农大国际科技园",
            company: "北京开拓明天科技股份有限公司",
            num: 255,
            beginTime: "2017-06-10",
            endTime: "2018-10-12",
            status: 1,
            phone:'13426213312'
          },
          {
            img: "/static/img/list-1.jpg",
            title: "投融资讯活动",
            local: "北京市海淀区天秀路10号中国农大国际科技园",
            company: "北京开拓明天科技股份有限公司",
            num: 255,
            beginTime: "2017-06-10",
            endTime: "2018-10-12",
            status: 0
          },
          {
            img: "/static/img/list-1.jpg",
            title: "投融资讯活动",
            local: "北京市海淀区天秀路10号中国农大国际科技园",
            company: "北京开拓明天科技股份有限公司",
            num: 255,
            beginTime: "2017-06-10",
            endTime: "2018-10-12",
            status: 0
          },
          {
            img: "/static/img/list-1.jpg",
            title: "投融资讯活动",
            local: "北京市海淀区天秀路10号中国农大国际科技园",
            company: "北京开拓明天科技股份有限公司",
            num: 255,
            beginTime: "2017-06-10",
            endTime: "2018-10-12",
            status: 0
          },
          {
            img: "/static/img/list-1.jpg",
            title: "投融资讯活动",
            local: "北京市海淀区天秀路10号中国农大国际科技园",
            company: "北京开拓明天科技股份有限公司",
            num: 255,
            beginTime: "2017-06-10",
            endTime: "2018-10-12",
            status: 1
          },
          {
            img: "/static/img/list-1.jpg",
            title: "投融资讯活动",
            local: "北京市海淀区天秀路10号中国农大国际科技园",
            company: "北京开拓明天科技股份有限公司",
            num: 255,
            beginTime: "2017-06-10",
            endTime: "2018-10-12",
            status: 0
          },
          {
            img: "/static/img/list-1.jpg",
            title: "投融资讯活动",
            local: "北京市海淀区天秀路10号中国农大国际科技园",
            company: "北京开拓明天科技股份有限公司",
            num: 255,
            beginTime: "2017-06-10",
            endTime: "2018-10-12",
            status: 1
          }
        ],
        pageList:[],
        count:1,
      }
    },
    methods:{
      getData(pageNumber){
        this.$axios.get('/jsp/wap/center/ctrl/jsonMyActivityList.jsp',{params:{pageNumber}}).then(res => {
          if(res.success == 'true'){
            console.log(res);
            this.pageList = res.data.pageList
            this.count = Number(res.data.pagination.totalCount)
          }
        })
      },
      handleCurrentChange(val) {
        this.getData(val)
      },
      toActivityDetailPage(id){
        let {href} = this.$router.resolve({
            name: "activityDetail",
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
//活动列表
.act_list {
  // width: 810px;
  // height: 180px;
  // margin-bottom: 20px;
  border-bottom: 1px solid #ededed;
}
.list {
  margin-left: 20px;
  padding: 10px 0;
}
.list-title {
  cursor: pointer;
  font-size: 20px;
  font-family: "Microsoft YaHei";
  color: rgb(51, 51, 51);
  margin: 10px 0 25px;
  width: 390px;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis;
}
.list-title:hover{
  color: rgb(0, 83, 133);
}
.list-content {
  margin-left: 30px;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: rgb(128, 128, 128);
  position: relative;
  .local {
    position: absolute;
    display: inline-block;
    top: -3px;
    left: -30px;
    width: 20px;
    height: 20px;
    background: url(/static/img/local.png) no-repeat center;
    background-size: contain;
  }
  .company {
    position: absolute;
    display: inline-block;
    top: -3px;
    left: -30px;
    width: 20px;
    height: 20px;
    background: url(/static/img/company.png) no-repeat center;
    background-size: contain;
  }
  .phone{
    position: absolute;
    display: inline-block;
    top: -3px;
    left: -30px;
    width: 20px;
    height: 20px;
    background: url(/static/img/phone.png) no-repeat center;
    background-size: contain;
  }
  .beizhu{
    position: absolute;
    display: inline-block;
    top: -3px;
    left: -30px;
    width: 20px;
    height: 20px;
    background: url(/static/img/beizhu.png) no-repeat center;
    background-size: contain;
  }
}
.list-content2 {
  margin-left: 30px;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: rgb(153, 153, 153);
  position: relative;
  .num {
    position: absolute;
    display: inline-block;
    top: -3px;
    left: -30px;
    width: 20px;
    height: 20px;
    background: url(/static/img/num.png) no-repeat center;
    background-size: contain;
  }
  .time {
    position: absolute;
    display: inline-block;
    top: -3px;
    left: -30px;
    width: 20px;
    height: 20px;
    background: url(/static/img/time.png) no-repeat center;
    background-size: contain;
  }
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

.apply_mes {
  margin-left: 60px;
  padding: 10px 0;
  padding-left: 50px;
  border-left: 1px solid #ededed;
}

.noAtt {
  margin: 250px 0;
  text-align: center;
  height: 100px;
}

/deep/ {
  .el-popper{
   margin-left: 20px !important;
  }
}
.suc{
  color: #ff9440
}
.noSuc{
  color: #999
}
</style>