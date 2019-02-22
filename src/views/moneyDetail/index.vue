<template>
  <div class="w1200 clearfix">
    <div class="bread">
      <span>
        <router-link to="/home">首页 ></router-link>
        <router-link to="/money">找资金 ></router-link>
      </span>
      <span>{{$route.meta.title}}</span>
    </div>
    <div class="w840 fll">
      <div class="mes_list listbottom">
        <p class="mes">资金详情</p>
      </div>
      <div class="act_list clearfix">
        <div class="clearfix">
          <span class="list-title fll">{{money.title}}</span>
          <span class="title_time flr">{{money.userName}}</span>
        </div>
        <div class="clearfix">
          <div class="fll company">
            <span>{{money.linkmanName}}</span>
          </div>
          <div class="flr">
            <el-button class="sendBtn" @click="applyPoject">投递项目</el-button>
            <el-button v-if="follow" class="sendBtn" @click="nofollow">已关注</el-button>
            <el-button plain v-else class="focus" @click="gofollow">关注</el-button>
          </div>
        </div>
        <div class="box_content" v-if="money&&money.investAmountName">
          <span class="list-contentName">投资资金：</span>
          <span class="list-content current">{{money.investAmountName}}</span>
        </div>
        <div class="clearfix">
          <!-- <div class="fll"> -->
            <!-- <div class="box_content fll" v-if="money&&money.investWayName">
              <span class="list-contentName">投资方式：</span>
              <span class="list-content">{{money.investWayName}}</span>
            </div> -->
            <div class="box_content fll" v-if="money&&money.investRegionNameStr">
              <span class="list-contentName">投资地区：</span>
              <span class="list-content">{{money.investRegionNameStr}}</span>
            </div>
            <div class="box_content fll" v-if="money&&money.investTypeName">
              <span class="list-contentName">投资类型：</span>
              <span class="list-content">{{money.investTypeName}}</span>
            </div>
            <div class="box_content fll" v-if="money&&money.paymentTypeName">
              <span class="list-contentName">支付方式：</span>
              <span class="list-content">{{money.paymentTypeName}}</span>
            </div>
            <div class="box_content fll" v-if="money&&money.safeguardName">
              <span class="list-contentName">保障措施：</span>
              <span class="list-content">{{money.safeguardName}}</span>
            </div>
          <!-- </div>
          <div class="fll"> -->
            <div class="box_content fll" v-if="money&&money.pawnTypeName">
              <span class="list-contentName">资金类型：</span>
              <span class="list-content">{{money.pawnTypeName}}</span>
            </div>
            <div class="box_content fll" v-if="money&&money.investIndustryName">
              <span class="list-contentName">投资行业：</span>
              <span class="list-content">{{money.investIndustryName}}</span>
            </div>
            <div class="box_content fll" v-if="money&&money.investStageName">
              <span class="list-contentName">投资阶段：</span>
              <span class="list-content">{{money.investStageName}}</span>
            </div>
            <div class="box_content fll" v-if="money&&money.validStartTimeStr">
              <span class="list-contentName">有效期限：</span>
              <span
                class="list-content"
              >{{money.validStartTimeStr}}~{{money.validEndTimeStr}}</span>
            </div>
          <!-- </div>
          <div class="fll"> -->
            <div class="box_content fll" v-if="money&&money.capitalSourceName">
              <span class="list-contentName">资金来源：</span>
              <span class="list-content">{{money.capitalSourceName}}</span>
            </div>
            <div class="box_content fll" v-if="money&&money.marketHotName">
              <span class="list-contentName">市场热点：</span>
              <span class="list-content">{{money.marketHotName}}</span>
            </div>
            <div class="box_content fll" v-if="money&&money.areaHotName">
              <span class="list-contentName">区域热点：</span>
              <span class="list-content">{{money.areaHotName}}</span>
            </div>
          <!-- </div> -->
        </div>
        <div style="margin-top:20px;">
          <el-button type="primary" plain size="mini" v-for="(lab,idx) in money.labelList" :key="idx" @click="searchLabel(lab.labelId)">{{lab.labelName}}</el-button>
        </div>
      </div>
      <div class="w810">
        <div class="require">
          <span>投资要求概述</span>
        </div>
        <div class="requireContent">{{money.investRequire}}</div>
        <div class="require">
          <span>投资案例</span>
        </div>
        <div class="requireContent">{{money.investCase}}</div>
        <div class="require">
          <span>其他说明</span>
        </div>
        <div class="requireContent">{{money.otherExplain}}</div>
      </div>
    </div>
    <div class="w360 flr mes_list clearfix">
      <el-card class="box-card">
        <div class="userImgBox">
          <img class="userImg" :src="$url + memberInfo.photoImgPath" v-if="memberInfo&&memberInfo.photoImgPath" alt>
          <img class="userImg" src="/static/img/avatar-1.png" v-else alt>
        </div>
        <p class="username" v-if="memberInfo&&memberInfo.name">{{memberInfo.name}}</p>
        <p class="username" v-else>投融用户</p>
        <p>
          <span class="_666">职位：</span>
          <span v-if="memberInfo&&memberInfo.job">{{memberInfo.job}}</span>
          <span v-else>****</span>
        </p>
        <p>
          <span class="_666">企业名称：</span>
          <span v-if="memberInfo.company">{{memberInfo.company}}</span>
          <span v-else>****</span>
        </p>
        <p>
          <span class="_666">所属行业：</span>
          <span v-if="memberInfo&&memberInfo.industryName">{{memberInfo.industryName}}</span>
          <span v-else>****</span>
        </p>
        <!-- <p>
          <span class="_666">关注行业：</span>
          <span>互联网、金融、节能环保</span>
        </p> -->
        <div class="lookBtnBox">
          <el-button class="lookBtn" @click="to_more_money">更多资金</el-button>          
        </div>
      </el-card>
      <p class="mes">可能感兴趣的资金</p>
      <ul class="mes_title">
        <div @click="toMoneyDetailPage(id)" style="cursor:pointer">
          <li v-for="(item,index) in capitalList" :key="index" class="mes_content">
            <p class="mes_listTitle">{{item.title}}</p>
            <P>
              <span>投资金额：</span>
              <span>{{item.investAmountName}}</span>
            </P>
            <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.capitalSourceName.substr(0,4)}}| {{item.investStageName.substr(0,3)}} | {{item.investRegionNameStr}}</p>
          </li>
        </div>
      </ul>
    </div>
    <el-dialog title="选择投递项目" :visible.sync="dialogFormVisible" width="30%" :before-close ="before_close">
        <div v-if="sub_project"> 
            <el-form>
                <el-form-item label="项目" label-width="100">
                    <el-select v-model="projectId" placeholder="请选择项目">
                    <el-option
                        v-for="item in myProject"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id"
                    ></el-option>
                    <el-pagination
                        v-show="myProject_pagination"
                        small
                        @current-change="handleCurrentChange"
                        layout="total, prev, pager, next"
                        :total="myProject_Count"
                    ></el-pagination>
                    </el-select>
                </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="info" @click="apply">确认投递</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </div>
        <div v-else>
            <div class="toast_success" v-if="success"></div>
            <div class="toast_error" v-else></div>
            <div v-if="success" class="toast_title">成功</div>
            <!-- <div v-else class="toast_title">失败</div> -->
            <p class="toast_title">{{hint}}</p>
        </div>
    </el-dialog>

    <el-dialog :visible.sync="toast_show" width="30%" center>
      <div class="toast_success" v-if="success"></div>
      <div class="toast_error" v-else></div>
      <!-- <div v-if="success" class="toast_title">成功</div> -->
      <!-- <div v-else class="toast_title">失败</div> -->
      <p class="toast_title">{{hint}}</p>
      <div v-if="no_project" @click="toMyproject" style="color:#f00;font-size:18px;cursor:pointer;text-align:center;">前去发布--></div>
    </el-dialog>

    <div class="lg_box" v-show="should_login" @click="should_login = false"></div>
    <Login :should_login="should_login"></Login>
  </div>
</template>
<script>
import * as Cookies from "js-cookie";

export default {
  data() {
    return {
      should_login:false,
      actlist: [],
      capitalList:[],
      memberInfo:{},
      money: {},
      follow: 0,
      id: "",
      memberId:"",
      success: true,
      hint: "",
      toast_show: false,
      myProject: [],
      projectId: "",
      moneyId: "",
      myProject_Count: 0,
      myProject_pagination: false,
      dialogFormVisible:false,
      sub_project:true,
      no_project:false,
    };
  },
  methods: {
    getData() {
      this.id = this.$route.query.id;
      this.loading = true;
      this.$axios
        .get(`/jsp/wap/trCapital/ctrl/jsonCapitalDetail.jsp?id=${this.id}`)
        .then(res => {
          console.log(res)
          this.money = res.data.capital;
          this.memberInfo = res.data.memberInfo
          this.memberId = res.data.memberInfo.id
          this.capitalList = res.data.capitalList
          this.loading = false;
        });
    },
    //获取关注状态
    getFollow() {
      this.$axios
        .get(`/jsp/wap/trCapital/ctrl/jsonIsFollow.jsp?id=${this.id}`)
        .then(res => {
          this.follow = Number(res.data);
        });
    },
    //关注
    gofollow() {
      this.$axios
        .get(`/jsp/wap/trCapital/do/doFollow.jsp?id=${this.id}`)
        .then(res => {
          if (res.success == "true") {
            this.follow = 1;
            this.success = true;
            this.hint = "关注成功";
            this.toast_show = true;
          } else {
            this.success = false;
            this.hint = res.message;
            this.toast_show = true;
          }
        });
    },
    //取消关注
    nofollow() {
      this.$axios
        .get(`/jsp/wap/trCapital/do/doUnfollow.jsp?id=${this.id}`)
        .then(res => {
          if (res.success == "true") {
            this.follow = 0;
            this.success = true;
            this.hint = "取消成功";
            this.toast_show = true;
          } else {
            this.success = false;
            this.hint = "取消失败";
            this.toast_show = true;
          }
        });
    },
    getMyProject(pn) {
      this.$axios
        .get("/jsp/wap/center/ctrl/jsonIssueProjectList.jsp", {
          params: { pageNumber: pn }
        })
        .then(res => {
          this.myProject = res.data.pageList;
          var myProject = res.data.pageList
          if(myProject.length > 0){
          this.projectId = myProject[0].id
          }
          this.myProject_Count = Number(res.data.pagination.totalCount);
          if (this.myProject_Count > 10) {
            this.myProject_pagination = true;
          }
    });
    },
    applyPoject() {
      if (Cookies.get("userKey")) {
        if (this.myProject.length == 0) {
          this.success = false;
          this.no_project = true
          this.hint = "您还没有发布项目，请先发布项目";
          this.toast_show = true;
        } else {
          this.no_project = false
          this.dialogFormVisible = true;
          this.moneyId = this.$route.query.id;
        }
      } else {
        // this.success = false;
        // this.hint = "您未登录，请先登录";
        // this.toast_show = true;
        this.no_project = false
        this.should_login = true
      }
    },
    apply() {
      this.$axios
        .get("/jsp/wap/trCapital/do/doDeliver.jsp", {
          params: { id: this.moneyId, projectId: this.projectId }
        })
        .then(res => {
          if (res.success == "true") {
            this.success = true;
            this.hint = "项目投递成功，平台将尽快为您安排";
            this.sub_project = false;
            // this.dialogFormVisible = false;
          } else {
            this.success = false;
            this.hint = res.message;
            this.sub_project = false;
          }
        });
    },
    before_close(){
        this.dialogFormVisible = false;
        setTimeout(()=> {
         this.sub_project = true;
        },1000)
    },
    toMoneyDetailPage(id) {
      let { href } = this.$router.resolve({
        name: "moneyDetail",
        query: { id }
      });
      window.open(href, "_blank");
    },
    handleCurrentChange(val) {
      this.getMyProject(val);
    },
    searchLabel(labelId){
      let { href } = this.$router.resolve({
        name: "searchLabelMoney",
        query: {labelId}
      });
      window.open(href, "_blank");
    },
    toMyproject(){
        if(Cookies.get('userKey')){
          let {href} = this.$router.resolve({
            name: "applyProject",
          });
          window.open(href, '_blank');
        } else {
          this.$router.push('/login')
        }
      },
    to_more_money(){
      let { href } = this.$router.resolve({
        name: "investors",
        query: {memberId:this.memberId}
      });
      window.open(href, "_blank");
    }
  },
  created() {
    this.getData();
    this.getFollow();
    if (Cookies.get("userKey")) {
    this.getMyProject()
    }
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
  line-height: 50px;
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
  padding-right: 45px;
}

.act_list {
  width: 810px;
  padding-bottom: 30px;
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

.company {
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: rgb(153, 153, 153);
  line-height: 20px;
  margin-top: 10px;
}

.focus {
  color: #005982;
  border-color: #005982;
  width: 100px;
}

.sendBtn {
  background: #005982;
  color: #fff;
  width: 100px;
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
.lookBtnBox {
  text-align: center;
}
.userImgBox {
  text-align: center;
}
.lookBtn {
  background: #005982;
  color: #fff;
  width: 70%;
}

.current {
  color: #005982 !important;
  font-size: 24px !important;
}

.list {
  width: 810px;
}

.listbottom {
  border-bottom: 1px solid #d9d9d9;
  width: 810px;
  margin-bottom: 30px;
}

.list-title {
  font-size: 20px;
  font-family: "Microsoft YaHei";
  color: rgb(26, 26, 26);
  line-height: 1.333;
  margin: 10px 0;
}

.list-contentName {
  // margin-left: 30px;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: rgb(153, 153, 153);
  display: inline-block;
}

.box_content {
  line-height: 2;
  min-width: 300px;
  // max-height: 50px;
  // overflow: hidden; /*超出部分隐藏*/
  // white-space: nowrap; /*不换行*/
  // text-overflow: ellipsis;
}

.require {
  border-bottom: 1px solid #cdcdcd;
}

.require span {
  font-size: 16px;
  font-family: "Microsoft YaHei";
  color: rgb(51, 51, 51);
  line-height: 1.5;
  display: inline-block;
  padding-bottom: 15px;
  border-bottom: 2px solid #005982;
  position: relative;
  bottom: -2px;
}

.requireContent {
  padding: 15px 0;
  line-height: 2;
}

.list-content {
  margin-right: 20px;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: #333;
  display: inline-block;
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
  font-size: 18px;
  font-family: "Microsoft YaHei";
  color: rgb(153, 153, 153);
  line-height: 1.333;
  padding: 20px 0;
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
    .mes_more:hover {
      color: #005385;
    }
  }
}

.mes_listTitle {
  color: #444;
}

.mes_title {
  border-top: 1px solid #d9d9d9;
  padding-left: 20px;
  list-style: none;
}

.mes_content {
  padding: 20px 0;
  border-bottom: 1px dashed #d9d9d9;
  color: #999;
}

.mes_listTitle:hover {
  color: #005982;
}

.cl-0 {
  color: #000;
}

.cl-0:hover {
  color: #005982;
}
</style>