<template>
  <div class="w1200 clearfix">
    <div class="bread">
      <span>
        <router-link to="/home">首页 ></router-link>
      </span>
      <span>{{$route.meta.title}}</span>
    </div>
    <div class="w840 fll">
      <div class="mes_list listbottom">
        <p class="mes">投资能力&风险承担能力介绍</p>
      </div>
      <div class="abilityBrief">
        暂无介绍
      </div>
      <div class="mes_list listbottom">
        <p class="mes">TA的更多项目</p>
      </div>
      <div v-loading="loading">
        <div class="act_list clearfix" v-for="(item, index) in pageList" :key="index">
          <div @click="toProjectDetailPage(item.id)" class="clearfix">
            <div class="clearfix">
              <span class="list-title fll">{{item.title}}</span>
            </div>
            <div class="clearfix">
              <div class="focusNum flr">{{item.followNum}}人关注</div>
            </div>
            <div class="listContent">{{item.brief}}</div>
            <div class="title_time flr">{{item.addTimeStr.slice(0,10)}}</div>
          </div>
        </div>
      </div>
      <div class="load_more" @click="morePage" v-show="more">加载更多...</div>
      <p
        style="color:#999;"
        v-show="noMore"
      >-------------------------------------------------没有更多项目了----------------------------------------------------</p>
    </div>
    <div class="w360 flr mes_list clearfix">
      <el-card class="box-card">
        <div class="userImgBox">
          <img
            class="userImg"
            :src="$url + memberInfo.photoImgPath"
            v-if="memberInfo&&memberInfo.photoImgPath"
            alt
          >
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
          <span>{{memberInfo.registeredCapitalStr}}</span>
          <span v-else>****</span>
        </p>
        <p>
          <span>成立日期：</span>
          <span>{{memberInfo.job}}</span>
          <span v-else>****</span>
        </p>-->
        <p>
          <span>住所：</span>
          <span v-if="memberInfo.address">{{memberInfo.address}}</span>
          <span v-else>****</span>
        </p>
        <!-- <p>
          <span>经营范围：</span>
          <span>{{memberInfo.job}}</span>
          <span v-else>****</span>
        </p>-->
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
      </ul>-->
    </div>
  </div>
</template>

<script>
import * as Cookies from "js-cookie";

export default {
  data() {
    return {
      more: false,
      noMore: false,
      loading: false,
      pageList: [],
      totalCount: 0,
      memberInfo: {},
      pn: 1
    };
  },
  methods: {
    //获取数据
    getActData() {
      let memberId = this.$route.query.memberId;
      this.loading = true;
      this.$axios
        .get("/jsp/wap/trProject/ctrl/jsonProjectPage.jsp", {
          params: { memberId }
        })
        .then(res => {
          if (res.success == "true") {
            this.memberInfo = res.data.memberInfo;
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
        .get("/jsp/wap/trProject/ctrl/jsonProjectPage.jsp", {
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

    toProjectDetailPage(id) {
      let { href } = this.$router.resolve({
        name: "projectDetail",
        query: { id }
      });
      window.open(href, "_blank");
    }
  },
  created() {
    this.getActData();
  }
};
</script>

<style scoped lang="scss">
.dialog-footer {
  width: 200px;
  margin: 0 auto;
}
.bread_search {
  border-bottom: 1px solid #d9d9d9;
  margin-bottom: 10px;
}

.search {
  margin-top: 8px;
  width: 265px;
  height: 30px;
  border: 1px solid #d9d9d9;
  position: relative;
  input {
    font-size: 14px;
    margin: 6px 0 0 10px;
    width: 200px;
    outline: none;
    border: 0;
  }
  i {
    display: inline-block;
    width: 55px;
    height: 32px;
    background: url(/static/img/search-1.png) no-repeat center;
    background-size: cover;
    position: absolute;
    top: -1px;
    right: -1px;
    cursor: pointer;
  }
}
// 更多 + 多选
.moreTitle {
  color: #606266;
  font-size: 14px;
  cursor: pointer;
  margin-top: 2px;
}
.titleRight {
  max-width: 1020px;
  line-height: 1.5;
}
.checkBoxBtn {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 4px 5px;
  color: #606266;
  font-size: 12px;
  cursor: pointer;
  position: absolute;
  right: 70px;
  bottom: 18px;
}
.checkBoxBtn2 {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 4px 5px;
  color: #606266;
  font-size: 12px;
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 40px;
}

.input-with-select {
  height: 30px;
} //选择类型
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
  // padding-right: 45px;
  display: inline-block;
  width: 103px;
} //活动列表
.act_list {
  cursor: pointer;
  width: 810px; // height: 180px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px dashed #d9d9d9;
  position: relative;
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
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: rgb(153, 153, 153);
  line-height: 1.714;
}

.focusNum {
  display: block;
  font-family: "Microsoft YaHei";
  color: rgb(204, 204, 204);
  line-height: 2.5;
}

.current {
  color: #005982 !important;
  font-size: 24px !important;
}

.list {
  margin-left: 20px;
}

.listContent {
  padding: 10px 0;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: rgb(153, 153, 153);
  line-height: 2;
  width: 780px;
  // height: 33px;
  z-index: 205;
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
  z-index: 204;
  padding: 10px 0;
}

.list-contentName {
  // margin-left: 30px;
  font-size: 18px;
  font-family: "Microsoft YaHei";
  color: #333;
}

.box_content {
  width: 395px;
  line-height: 2;
}

.list-content {
  // margin-left: 30px;
  font-size: 18px;
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
  cursor: pointer;
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
    .mes_more:hover {
      color: #005385;
    }
  }
}

.mes_title {
  border-top: 1px solid #d9d9d9;
  padding-left: 20px;
}

.mes_content {
  padding: 20px 0;
  border-bottom: 1px dashed #d9d9d9;
  color: #d9d9d9;
}

.mes_content:hover {
  color: #005982;
}

.cl-0 {
  color: #000;
}

.cl-0:hover {
  color: #005982;
}

/deep/ {
  .el-checkbox__label {
    font-size: 12px !important;
  }
}

.subBtn {
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
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  border-radius: 4px;
  position: absolute;
  top: 0;
  right: 0;
}

/deep/ {
  .el-checkbox {
    width: 110px !important;
    padding-bottom: 3.1px !important;
  }
  .el-checkbox + .el-checkbox {
    margin-left: 0;
  }
}

.active {
  color: #005982;
  font-weight: 700;
}

// .titleRight .type_item:nth-child(25){
//   padding-right: 20px;
// }
// .titleRight .type_item:nth-child(15){
//   padding-right: 20px;
// }
// .titleRight .type_item:nth-child(5){
//   padding-right: 20px;
// }

// .titleRight .type_item:nth-child(17){
//   margin-right: 80px;
// }
// .titleRight .type_item:nth-child(20){
//   margin-right: 10px;
// }
// .titleRight .type_item:nth-child(26){
//   margin-right: 21px;
// }
// .titleRight .type_item:nth-child(29){
//   margin-right: 80px;
// }
// .titleRight .type_item:nth-child(30){
//   margin-right: 77px;
// }

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
  // height: 180px;
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