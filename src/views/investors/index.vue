<template>
  <div class="w1200 clearfix">
    <div class="bread">
      <span>
        <router-link to="/home">首页 ></router-link>
      </span>
      <span>
        <router-link to="/money">找资金 ></router-link>
      </span>
      <span>{{$route.meta.title}}</span>
    </div>
    <div class="w840 fll" v-loading="loading">
      <div class="mes_list listbottom">
        <p class="mes">投资能力&风险承担能力介绍</p>
      </div>
      <div class="abilityBrief">
        暂无介绍
      </div>
      <div class="mes_list listbottom">
        <p class="mes">TA的更多资金</p>
      </div>
      <div class="act_list clearfix" v-for="(item, index) in pageList" :key="index" @click="toMoneyDetailPage(item.id)">
        <div class="clearfix">
          <span class="list-title fll" v-if="item&&item.title">{{item.title}}</span>
          <span class="title_time flr" v-if="item&&item.addTimeStr">{{item.addTimeStr.slice(0,10)}}</span>
        </div>
        <div class="clearfix">
          <div class="fll box_content">
            <span class="list-contentName">投资资金：</span>
            <span class="current" v-if="item&&item.investAmountName">{{item.investAmountName}}</span>
          </div>
          <div class="focusNum flr" v-if="item&&item.followNum">{{item.followNum}}人关注</div>
        </div>
        <div class="clearfix">
          <div class="fll">
            <div class="box_content">
              <span class="list-contentName">投资方式：</span>
              <span class="list-content" v-if="item&&item.investWayName">{{item.investWayName}}</span>
              <span class="list-content" v-else>***</span>
            </div>
            <div class="box_content">
              <span class="list-contentName">投资地区：</span>
              <span
                class="list-content"
                v-if="item&&item.investRegionNameStr"
              >{{item.investRegionNameStr}}</span>
              <span class="list-content" v-else>***</span>
            </div>
            <div class="box_content fll">
              <span class="list-contentName">投资类型：</span>
              <span class="list-content" v-if="item&&item.investTypeName">{{item.investTypeName}}</span>
              <span class="list-content" v-else>***</span>
            </div>
          </div>
          <div class="fll">
            <div class="box_content">
              <span class="list-contentName">资金类型：</span>
              <span class="list-content" v-if="item&&item.pawnTypeName">{{item.pawnTypeName}}</span>
              <span class="list-content" v-else>***</span>
            </div>
            <div class="box_content">
              <span class="list-contentName">投资行业：</span>
              <span
                class="list-content"
                v-if="item&&item.investIndustryName"
              >{{item.investIndustryName}}</span>
              <span class="list-content" v-else>***</span>
            </div>
            <div class="box_content">
              <span class="list-contentName">投资阶段：</span>
              <span class="list-content" v-if="item&&item.investStageName">{{item.investStageName}}</span>
              <span class="list-content" v-else>***</span>
            </div>
          </div>
        </div>
      </div>
      <div class="load_more" @click="morePage" v-show="more">加载更多...</div>
      <p
        style="color:#999;"
        v-show="noMore"
      >-------------------------------------------------没有更多资金了----------------------------------------------------</p>
    </div>
    <div class="w360 flr mes_list clearfix">
      <el-card class="box-card">
        <div class="userImgBox">
          <img class="userImg" :src="$url + memberInfo.photoImgPath" v-if="memberInfo&&memberInfo.photoImgPath" alt>
          <img class="userImg" src="/static/img/avatar-1.png" v-else alt>
        </div>
        <p class="username">{{memberInfo.name}}</p>
        <p>
          <span>职位：</span>
          <span v-if="memberInfo.job">{{memberInfo.job}}</span>
          <span v-else>****</span>
        </p>
        <p>
          <span>企业名称：</span>
          <span v-if="memberInfo.company">{{memberInfo.company}}</span>
          <span v-else>****</span>
        </p>
        <p>
          <span>所属行业：</span>
          <span v-if="memberInfo.industryName">{{memberInfo.industryName}}</span>
          <span v-else>****</span>
        </p>
        <p>
          <span>所在地区：</span>
          <span v-if="memberInfo.provinceStr">{{memberInfo.provinceStr}}</span>
          <span v-else>****</span>
        </p>
        <!-- <p>
          <span>关注行业：</span>
          <span v-if="memberInfo.job">{{memberInfo.job}}</span>
          <span v-else>****</span>
        </p>
        <p>
          <span>类型：</span>
          <span>{{memberInfo.job}}</span>
          <span v-else>****</span>
        </p>
        <p>
          <span>法人代表：</span>
          <span>{{memberInfo.job}}</span>
          <span v-else>****</span>
        </p>
        <p>
          <span>注册资本：</span>
          <span>{{memberInfo.job}}</span>
          <span v-else>****</span>
        </p>
        <p>
          <span>成立日期：</span>
          <span>{{memberInfo.job}}</span>
          <span v-else>****</span>
        </p> -->
        <p>
          <span>住所：</span>
          <span v-if="memberInfo.address">{{memberInfo.address}}</span>
          <span v-else>****</span>
        </p>
        <!-- <p>
          <span>经营范围：</span>
          <span>{{memberInfo.job}}</span>
          <span v-else>****</span>
        </p> -->
      </el-card>
      <!-- <p class="mes">企业介绍及财务数据</p>
      <ul class="mes_title">
        <router-link to="/">
          <li v-for="(item,index) in userData" :key="index" class="mes_content">
            <span class="userDesc">{{item.content}}</span>
          </li>
        </router-link>
      </ul>
      <p class="mes">投资能力&风险承担能力介绍</p>
      <ul class="mes_title">
        <router-link to="/">
          <li v-for="(item,index) in userData" :key="index" class="mes_content">
            <span class="userDesc">{{item.content}}</span>
          </li>
        </router-link>
      </ul> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      more: false,
      noMore: false,
      loading:false,
      pageList: [],
      totalCount: 0,
      memberInfo: {},
      pn: 1
    };
  },
  methods: {
    getActData() {
      let memberId = this.$route.query.memberId;
      this.loading = true;
      this.$axios
        .get("/jsp/wap/trCapital/ctrl/jsonCapitalPage.jsp", {
          params: { memberId }
        })
        .then(res => {
          if (res.success == "true") {
            this.memberInfo = res.data.memberInfo
            this.pageList = res.data.pageList;
            this.totalCount = res.data.pagination.totalCount;
            this.pn = 1;
            if (this.totalCount > this.pageList.length) {
              this.more = true;
              this.noMore = false;
            } else {
              this.more = false;
              this.noMore = true;
            }
            this.pn = 1;
            this.loading = false;
          }
        });
    },
    morePage() {
      let memberId = this.$route.query.memberId;
      this.pn += 1;
      this.loading = true;
      this.$axios
        .get("/jsp/wap/trCapital/ctrl/jsonCapitalPage.jsp", {
          params: { memberId }
        })
        .then(res => {
          if (res.success == "true") {
            this.pageList = [...this.pageList, ...res.data.pageList];
            this.totalCount = res.data.pagination.totalCount;
            if (this.totalCount > this.pageList.length) {
              this.more = true;
              this.noMore = false;
            } else {
              this.more = false;
              this.noMore = true;
            }
            this.loading = false;
          }
        });
    },
    toMoneyDetailPage(id) {
      let { href } = this.$router.resolve({
        name: "moneyDetail",
        query: { id }
      });
      window.open(href, "_blank");
    },
  },
  created() {
    this.getActData();
  }
};
</script>

<style scoped lang="scss">
.bread_search {
  border-bottom: 1px solid #d9d9d9;
  margin-bottom: 10px;
}
.search {
  line-height: 50px;
}
//选择类型
.act_type {
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: rgb(51, 51, 51);
  font-weight: bold;
  line-height: 1.857;
}

.type_item {
  font-size: 12px;
  font-family: "Microsoft YaHei";
  color: #444;
  cursor: pointer;
  padding-right: 45px;
} //活动列表
.act_list {
  width: 810px;
  height: 180px;
  padding-bottom: 30px;
  border-bottom: 1px dashed #d9d9d9;
  cursor: pointer;
}

.more_desc {
  border: none !important;
  min-width: 70px;
  max-width: 120px;
} // /deep/.el-select .el-input__inner {
//     border: 0;
//     min-width: 70px;
//     max-width: 120px;
// }
.title_time {
  display: block;
  margin-top: 10px;
  color: #666;
}

.focusNum {
  display: block;
  color: #ccc;
  line-height: 2;
}

.current {
  color: #005982 !important;
  font-size: 24px !important;
}

.list {
  margin-left: 20px;
}

.listbottom {
  border-bottom: 1px solid #d9d9d9;
  width: 810px;
  margin-bottom: 30px;
}

.list-title {
  font-size: 18px;
  font-family: "Microsoft YaHei";
  color: rgb(26, 26, 26);
  line-height: 1.333;
  margin: 10px 0;
  display: inline-block;
  width: 700px;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis;
}
.list-contentName {
  // margin-left: 30px;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: #333;
}


.box_content {
  width: 395px;
  line-height: 2;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis;
}

.list-content {
  // margin-left: 30px;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: #333;
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
} //加载更多
.load_more {
  width: 810px;
  text-align: center;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: rgb(153, 153, 153);
  line-height: 1.333;
  padding: 10px 0;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  margin: 40px 0 75px;
  cursor: pointer;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.load_more:active {
  background: #fff;
  border-color: #409eff;
  color: #409eff;
} //活动排表
.act_timelist {
  margin: 20px 0;
}

.mes_list {
  .mes {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    color: rgb(51, 51, 51);
    line-height: 1.333;
    text-align: left;
    padding-left: 20px;
    border-left: 3px solid #005982;
    .mes_more {
      font-size: 12px;
      font-family: "SimSun";
      color: #999;
      line-height: 2;
      cursor: pointer;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }
  }
}
.userImg {
  border-radius: 100%;
  text-align: center;
  width: 100px;
  height: 100px;
}
.username {
  text-align: center;
}
.userImgBox {
  text-align: center;
}
.mes_title {
  border-top: 1px solid #d9d9d9;
  padding-left: 20px;
}

.mes_content {
  padding: 20px 0;
  border-bottom: 1px dashed #d9d9d9;
  color: #d9d9d9;
  list-style: none;
}

.mes_content:hover {
  color: #005982;
}
.box-card p span:nth-child(1) {
  color: #999;
}
.cl-0 {
  color: #000;
}

.cl-0:hover {
  color: #005982;
}
.userDesc {
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: rgb(102, 102, 102);
  line-height: 1.714;
}
.abilityBrief{
  width: 810px;
  color: #999
}
</style>