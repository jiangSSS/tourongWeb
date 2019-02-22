<template>
  <div class="fll">
    <div class="person_content">
      <p class="report_now">
        <i></i>
        <span>{{time.substr(0,4)}}年第{{issue}}期</span>
        <span class="time">{{time.substr(0,10)}}</span>
      </p>
      <p class="project_title">
        <span class="project_">项目精选</span>
        <span class="project_more flr" @click="toProject">更多></span>
      </p>
      <div
        v-for="(item , index) in projectData"
        :key="index + 'project'"
        class="project_list clearfix"
      >
        <!-- <img :src="$url + item.imgPaths" alt class="fll"> -->
        <div class="fll project_con">
          <p class="title" @click="toProjectDetailPage(item.resourceId)">{{item.title}}</p>
          <p class="content">{{item.content}}</p>
        </div>
      </div>
      <p class="project_title" style="margin-top:0;">
        <span class="project_">资金对接</span>
        <span class="project_more flr" @click="toMoney">更多></span>
      </p>
      <div
        v-for="(item , index) in moneyData"
        :key="index + 'money'"
        class="project_list clearfix lastborder"
      >
        <!-- <img :src="$url + item.imgPaths" alt class="fll"> -->
        <div class="fll project_con">
          <p class="title" @click="toMoneyDetailPage(item.resourceId)">{{item.title}}</p>
          <p class="content">{{item.content}}</p>
        </div>
      </div>
      <p class="project_title" style="margin-top:0;">
        <span class="project_">资讯了解</span>
        <span class="project_more flr" @click="toMessage">更多></span>
      </p>
      <div
        v-for="(item , index) in messageData"
        :key="index + 'message'"
        class="mg-20"
      >
        <div v-if="item.img" class="clearfix">
            <img :src="$url + item.imgPaths" alt class="fll" width="152px" height="101px">
            <div class="fll mes_box">
              <p class="title" @click="toMessageDetailPage(item.resourceId)">{{item.title}}</p>
              <div class="clearfix">
                <span class="fll time">发布时间；{{item.addTimeStr}}</span>
                <span class="flr num">阅读：{{item.num}}次</span>
              </div>
              <p class="content">{{item.content}}</p>
            </div>
        </div>
        <div v-else class="clearfix">
            <div class="fll mes_box2">
              <p class="title" @click="toMessageDetailPage(item.resourceId)">{{item.title}}</p>
              <div class="clearfix">
                <span class="fll time">发布时间；{{item.addTimeStr}}</span>
                <!-- <span class="flr num">阅读：{{item.num}}次</span> -->
              </div>
              <!-- <p class="content">{{item.content}}</p> -->
              <p class="content" v-html="item.content"></p>
            </div>
        </div>
      </div>
      <p class="project_title" style="margin-top:20px;">
        <span class="project_">活动推荐</span>
        <span class="project_more flr" @click="activity">更多></span>
      </p>
      <div
        class="act_list clearfix"
        v-for="(item, index) in actlist"
        :key="index + 'act'"
      >
        <img :src="$url + item.imgPaths" alt width="270px" height="180px" class="fll">
         <div class="fll list">
          <p class="list-title" style="font-size:18px;" @click="activityDetailPage(item.resourceId)">{{item.title}}</p>
          <!-- <p style="color:#999">{{item.content}}</p> -->
          <p style="color:#999" v-html="item.content"></p>
          <!-- <p class="list-content">
            <i class="local"></i>
            {{item.local}}
          </p>
          <p class="list-content">
            <i class="company"></i>
            {{item.company}}
          </p>
          <p class="list-content2">
            <i class="num"></i>
            报名人数：{{item.num}}
          </p>
          <p class="list-content2">
            <i class="time"></i>
            报名时间：{{item.beginTime}} 至 {{item.endTime}}
          </p> -->
        </div>
        <!-- <div class="flr">
          <span :class="item.status == 1 ? 'apply' : 'over'">{{item.status == 1 ? '报名中' : '已结束'}}</span>
          <button
            :class="item.status == 1 ? 'applyBtn' : 'overBtn'"
            @click="item.status == 1 ? apply() : over() "
          >{{item.status == 1 ? '我要报名' : '活动结束'}}</button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        time: "",
        year: "",
        projectData: [],
        moneyData: [],
        messageData: [],
        actlist: [],
      issue: 1,
      time:''
    };
  },
  methods: {
    getData() {
      let id = this.$route.query.id
      this.issue = this.$route.query.issue
      this.time = this.$route.query.time
      this.$axios.get(`/jsp/wap/center/ctrl/jsonWeeklyDetail.jsp?id=${id}`).then(res => {
        this.actlist = res.data.activityList
        this.projectData = res.data.projectList
        this.messageData = res.data.newsList
        this.moneyData = res.data.capitalList
      })
    },
    getType(e) {
      console.log(e);
    },
    getStatus(e) {
      console.log(e);
    },
    apply() {
      this.$router.push("/activity/activityDetail");
    },
    over() {
      this.$notify.error({
        title: "错误",
        message: "活动已结束"
      });
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
    },
    toMessage(){
      let {href} = this.$router.resolve({
            name: "message",
        });
        window.open(href, '_blank');
    },
    toMessageDetailPage(id){
        let {href} = this.$router.resolve({
            name: "messageDetail",
            query: {id}
        });
        window.open(href, '_blank');
      },
      activity(){
        let {href} = this.$router.resolve({
            name: "activity",
        });
        window.open(href, '_blank');
      },
      activityDetailPage(id){
        let {href} = this.$router.resolve({
            name: "activityDetail",
            query: {id}
        });
        window.open(href, '_blank');
      },
  },
  mounted() {
    this.getData()
  }
};
</script>

<style scoped lang="scss">
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
  .project_more {
    font-size: 14px;
    font-family: "Microsoft YaHei";
    color: rgb(153, 153, 153);
    cursor: pointer;
  }
}

.title:hover{
  color:#005982;
}

//项目列表
.project_list {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ededed;
  img {
    width: 235px;
    height: 150px;
    border-radius: 4px;
  }
  .project_con {
    width: 660px;
    margin-left: 20px;
    .title {
      cursor: pointer;
      margin-top: 0;
      width: 550px;
      font-size: 18px;
      font-family: "Microsoft YaHei";
      color: rgb(51, 51, 51);
      font-weight: bold;
      overflow: hidden; /*超出部分隐藏*/
      white-space: nowrap; /*不换行*/
      text-overflow: ellipsis;
    }
    .title:hover{
      color:#005982;
    }
    .content {
      font-size: 14px;
      font-family: "Microsoft YaHei";
      color: rgb(102, 102, 102);
      line-height: 1.5;
      position: relative;
      max-height: 43px;
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
}
.person_content .lastborder:last-of-type {
  border: none;
  margin-bottom: 0;
}

.mes_box {
  width: 748px;
  margin-left: 20px;
  .title {
    cursor: pointer;
    color: #000;
    margin-top: 0;
    margin-bottom: 10px;
  }
  .title:hover{
    color:#005982;
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
.mes_box2 {
  width: 100%;
  border-bottom: 1px solid #ededed;
  .title {
    cursor: pointer;
    margin-top: 5px;
    margin-bottom: 10px;
    color: #000;
  }
  .title:hover{
    color:#005982;
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

//活动列表
.act_list {
  // width: 810px;
  // height: 180px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ededed;
}
.list {
  margin-left: 20px;
}
.list-title {
  cursor: pointer;
  font-size: 20px;
  font-family: "Microsoft YaHei";
  color: rgb(51, 51, 51);
  margin: 10px 0 25px;
}
.list-title:hover{
    color:#005982;
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
.apply {
  display: block;
  text-align: right;
  font-size: 16px;
  font-family: "Microsoft YaHei";
  color: #ff9440;
  font-weight: bold;
  margin-top: 10px;
}
.over {
  display: block;
  text-align: right;
  font-size: 16px;
  font-family: "Microsoft YaHei";
  color: #999;
  font-weight: bold;
  margin-top: 10px;
}
.applyBtn {
  width: 110px;
  height: 35px;
  color: #fff;
  line-height: 0.425;
  display: inline-block;
  white-space: nowrap;
  cursor: pointer;
  background: #005982;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  margin-top: 100px;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  border-radius: 4px;
}
.overBtn {
  width: 110px;
  height: 35px;
  color: #c4c4c4;
  line-height: 0.425;
  display: inline-block;
  white-space: nowrap;
  cursor: pointer;
  background: #e6e6e6;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  margin-top: 100px;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  border-radius: 4px;
}
</style>