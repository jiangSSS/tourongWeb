<template>
  <div class="fll">
    <div class="person_content" style="min-height:150px">
      <p class="week_now">
        <span class="week_title">本期周报</span>
      </p>
      <router-link
        :to="{name:'weeklyReportDetail',query:{id:reportData[0].id,issue:count,time:reportData[0].addTimeStr}}"
        v-if="reportData.length > 0"
      >
        <p class="report_now">
          <i></i>
          <span v-if="reportData">{{reportData[0].addTimeStr.substr(0,4)}}年第{{count}}期</span>
          <span class="time" v-if="reportData">{{reportData[0].addTimeStr}}</span>
        </p>
      </router-link>
      <p v-else>暂无周报</p>
    </div>
    <div class="person_content mg-20">
      <p class="week_now">
        <span class="week_title">往期周报</span>
      </p>
      <div class="clearfix" v-if="reportData.length > 0">
        <ul class="report_ul fll">
            <li class="report_list" v-for="(item , index) in reportData" :key="index">
          <router-link :to="{name:'weeklyReportDetail',query:{id:item.id,issue:count - index,time:item.addTimeStr}}">
              <span class="time" v-if="item&&item.addTimeStr">{{item.addTimeStr.substr(0,10)}}</span>
              <span class="line"></span>
              <i></i>
              <span class="year" v-if="item&&item.addTimeStr">{{item.addTimeStr.substr(0,4)}}年第{{count - index}}期</span>
          </router-link>
            </li>
        </ul>
        <ul class="report_ul flr" style="margin-right:30px;" v-if="reportData.length == 10">
          <li class="report_list" v-for="(item , index) in reportData2" :key="index">
          <router-link :to="{name:'weeklyReportDetail',query:{id:item.id,issue:count - index,time:item.addTimeStr}}">
            <span class="time" v-if="item&&item.addTimeStr">{{item.addTimeStr.substr(0,10)}}</span>
            <span class="line"></span>
            <i></i>
            <span class="year" v-if="item&&item.addTimeStr">{{item.addTimeStr.substr(0,4)}}年第{{count - index}}期</span>
          </router-link>
          </li>
        </ul>
      </div>
      <p v-else>暂无周报</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reportData: [],
      reportData2: [],
      count:1,
    };
  },
  methods:{
    getData(pn){
      this.$axios.get('/jsp/wap/center/ctrl/jsonWeeklyList.jsp',{params:{pageNumber:pn}}).then(res => {
        console.log(res)
        this.reportData = res.data.pageList
        this.count = Number(res.data.pagination.totalCount)
      })
    },
    getData2(pn){
      this.$axios.get('/jsp/wap/center/ctrl/jsonWeeklyList.jsp',{params:{pageNumber:pn}}).then(res => {
        this.reportData2 = res.data.pageList
      })
    },
  },
  created(){
    this.getData(1)
  },
  watch: {
    count(e){
      if(e>10) {
        this.getData2(2)
      }
    }
  },
};
</script>

<style scoped lang="scss">
.week_now {
  padding-bottom: 20px;
  border-bottom: 1px dashed #cdcdcd;
}
.week_title {
  padding-left: 20px;
  border-left: 5px solid #005982;
  font-size: 18px;
  font-family: "Microsoft YaHei";
  color: rgb(0, 83, 133);
  font-weight: bold;
}
.report_now {
  position: relative;
  font-size: 18px;
  font-family: "Microsoft YaHei";
  color: rgb(51, 51, 51);
  font-weight: bold;
  margin-left: 35px;
  margin-bottom: 0;
  i {
    display: inline-block;
    width: 22px;
    height: 22px;
    position: absolute;
    top: -1px;
    left: -35px;
    background: url(/static/img/zhoubao-2.png) no-repeat center;
    background-size: contain;
  }
  .time {
    margin-left: 30px;
    font-size: 14.431px;
    font-family: "Microsoft YaHei";
    color: rgb(153, 153, 153);
    -moz-transform: matrix(1.00001401727815, 0, 0, 0.97011118031353, 0, 0);
    -webkit-transform: matrix(1.00001401727815, 0, 0, 0.97011118031353, 0, 0);
    -ms-transform: matrix(1.00001401727815, 0, 0, 0.97011118031353, 0, 0);
  }
}

li {
  list-style-type: none;
}

.report_list {
  font-size: 16px;
  color: #000;
  height: 80px;
  position: relative;
  .line {
    padding: 0px 40px 55px 0;
    margin-right: 60px;
    border-right: 2px solid #ededed;
    position: relative;
    top: 15px;
  }
  i {
    display: inline-block;
    width: 8px;
    height: 8px;
    position: absolute;
    top: 7px;
    left: 130.5px;
    background: url(/static/img/huidian.png) no-repeat center;
    background-size: contain;
  }
}

.report_ul .report_list:last-child {
  .line {
    border: none;
  }
}
.time {
    color: #999;
}
.year{
    color: #999;
}

.report_ul .report_list:hover {
  font-size: 16px;
  font-family: "Microsoft YaHei";
  .year{color: rgb(0, 83, 133);}
  .time{color: rgb(0, 83, 133);}
    i {
      display: inline-block;
      width: 13px;
      height: 13px;
      position: absolute;
      top: 7px;
      left: 128px;
      background: url(/static/img/landian.png) no-repeat center;
      background-size: contain;
  }
}
</style>