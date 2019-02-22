<template>
  <div class="w1200 clearfix">
    <div class="bread">
      <span>
        <router-link to="/home">首页 ></router-link>
        <router-link to="/project">找项目 ></router-link>
      </span>
      <span>{{$route.meta.title}}</span>
    </div>
    <div class="w840 fll">
      <div class="act_list clearfix">
        <div class="fll list">
          <div class="clearfix">
            <span class="list-title fll" v-if="project&&project.title">{{project.title}}</span>
            <div
              class="flr company"
              v-if="project&&project.addTimeStr"
            >{{project.addTimeStr.slice(0,10)}}</div>
          </div>
          <div class="clearfix">
            <div class="fll clearfix">
              <div class="box_content fll" v-if="project&&project.projectId">
                <span class="list-contentName">编号：</span>
                <span class="list-content" >{{project.projectId}}</span>
              </div>
              <div class="box_content fll" v-if="project&&project.financeBodyName">
                <span class="list-contentName">融资主体：</span>
                <span
                  class="list-content"
                  
                >{{project.financeBodyName}}</span>
              </div>
              <div class="box_content fll" v-if="project&&project.companyAssessed">
                <span class="list-contentName">公司估值：</span>
                <span
                  class="list-content"
                  
                >{{project.companyAssessed}}</span>
              </div>
              <div class="box_content fll" v-if="project&&project.pb">
                <span class="list-contentName">市净率(P/B):</span>
                <span class="list-content">{{project.pb}}</span>
              </div>
              <div class="box_content fll" v-if="project&&project.regionNameStr">
                <span class="list-contentName">所在地区:</span>
                <span
                  class="list-content"
                >{{project.regionNameStr}}</span>
              </div>
              <div class="box_content fll" v-if="project&&project.industryName">
                <span class="list-contentName">所属行业:</span>
                <span
                  class="list-content"
                >{{project.industryName}}</span>
              </div>
              <div class="box_content fll" v-if="project&&project.financingExplain">
                <span class="list-contentName">融资用途:</span>
                <span
                  class="list-content"
                >{{project.financingExplain}}</span>
              </div>
            <!-- </div>
            <div class="fll"> -->
              <div class="box_content fll" v-if="project&&project.financingWayName">
                <span class="list-contentName">融资方式：</span>
                <span
                  class="list-content"
                >{{project.financingWayName}}</span>
              </div>
              <div class="box_content fll" v-if="project&&project.pe">
                <span class="list-contentName">市盈率(P/E):</span>
                <span class="list-content" >{{project.pe}}</span>
              </div>
              <div class="box_content fll" v-if="project&&project.paymentTypeName">
                <span class="list-contentName">支付方式:</span>
                <span
                  class="list-content"
                >{{project.paymentTypeName}}</span>
              </div>
              <div class="box_content fll" v-if="project&&project.industryName">
                <span class="list-contentName">行业性质:</span>
                <span
                  class="list-content"
                >{{project.industryName}}</span>
              </div>
              <div class="box_content fll" v-if="project&&project.financingMoneyName">
                <span class="list-contentName">融资金额:</span>
                <span
                  class="list-content"
                >{{project.financingMoneyName}}</span>
              </div>
              <div class="box_content fll" v-if="project&&project.intentCapitalList">
                <span class="list-contentName">意向资金:</span>
                <span
                  class="list-content"
                >{{project.intentCapitalList}}</span>
              </div>
            </div>
            <div class="flr">
              <el-button class="sendBtn" @click="applyPoject">约见项目</el-button>
              <el-button v-if="follow" class="sendBtn" @click="nofollow">已关注</el-button>
              <el-button plain v-else class="focus" @click="gofollow">关注</el-button>
            </div>
          </div>
          <div style="margin-top:20px;">
            <el-button type="primary" plain size="mini" v-for="(lab,idx) in project.labelList" :key="idx" @click="searchLabel(lab.labelId)">{{lab.labelName}}</el-button>
          </div>
        </div>
      </div>
      <div class="w810">
        <div class="require" v-if="project&&project.brief">
          <span>项目简介</span>
        </div>
        <div class="requireContent" v-if="project&&project.brief">{{project.brief}}</div>
        <div class="require">
          <span>企业信息</span>
        </div>
        <div class="requireContent clearfix">
          <div class="fll">
            <div class="box_content" v-if="project&&project.companyName">
              <span class="list-contentName">企业名称:</span>
              <span class="list-content" >{{project.companyName}}</span>
            </div>
            <div class="box_content" v-if="project&&project.registeredCapitalStr">
              <span class="list-contentName">注册资本:</span>
              <span
                class="list-content"
                
              >{{project.registeredCapitalStr}}万</span>
            </div>
            <div class="box_content" v-if="project&&project.regionNameStr">
              <span class="list-contentName">所在地：</span>
              <span
                class="list-content"
                
              >{{project.regionNameStr}}</span>
            </div>
            <div class="box_content" v-if="project&&project.address">
              <span class="list-contentName">详细地址:</span>
              <span class="list-content" >{{project.address}}</span>
            </div>
          </div>
          <div class="fll">
            <div class="box_content" v-if="project&&project.averageAge">
              <span class="list-contentName">团队平均年龄：</span>
              <span class="list-content" >{{project.averageAge}}</span>
            </div>
            <div class="box_content" v-if="project&&project.companyFoundTimeStr">
              <span class="list-contentName">建企时间：</span>
              <span
                class="list-content"
                
              >{{project.companyFoundTimeStr}}</span>
            </div>
            <div class="box_content" v-if="project&&project.weChat">
              <span class="list-contentName">官方微信：</span>
              <span class="list-content">{{project.weChat}}</span>
            </div>
          </div>
        </div>
        <div v-if="project&&project.business">
          <span class="list-contentName" style="display:inline-block">主营业务：</span>
          <p class="content_desc">
            <span >{{project.business}}</span>
          </p>
        </div>
        <div v-if="project&&project.brightSpot">
          <span class="list-contentName" style="display:inline-block">公司亮点：</span>
          <p class="content_desc">
            <span >{{project.brightSpot}}</span>
          </p>
        </div>
        <div v-if="project&&project.position">
          <span class="list-contentName" style="display:inline-block">行业地位：</span>
          <p class="content_desc">
            <span >{{project.position}}</span>
          </p>
        </div>
        <div v-if="project&&project.trienniumFinancialData">
          <span class="list-contentName" style="display:inline-block">近三年财务数据：</span>
          <p class="content_desc">
            <span >{{project.trienniumFinancialData}}</span>
          </p>
        </div>
        <div v-if="project&&project.profitForecast">
          <span class="list-contentName" style="display:inline-block">3-5年盈利预测：</span>
          <p class="content_desc">
            <span >{{project.profitForecast}}</span>
          </p>
        </div>
        <div class="require" v-if="project&&project.stockStructureImgPath">
          <span>股权结构</span>
        </div>
        <div class="requireContent">
          <img
            :src="$url + project.stockStructureImgPath"
            style="width:810px"
            v-if="project&&project.stockStructureImgPath"
          >
        </div>
        <div class="require">
          <span>项目负责人信息</span>
        </div>
        <div class="requireContent clearfix">
          <div class="fll">
            <div class="box_content" v-if="project&&project.directorName">
              <span class="list-contentName">姓名:</span>
              <span
                class="list-content"
                v-if="project&&project.directorName"
              >{{project.directorName}}</span>
            </div>
            <div class="box_content" v-if="project&&project.directorEmail">
              <span class="list-contentName">邮箱:</span>
              <span
                class="list-content"
                v-if="project&&project.directorEmail"
              >{{project.directorEmail}}</span>
            </div>
          </div>
          <div class="fll">
            <div class="box_content" v-if="project&&project.directorJob">
              <span class="list-contentName">职务：</span>
              <span class="list-content" v-if="project&&project.directorJob">{{project.directorJob}}</span>
            </div>
            <div class="box_content" v-if="project&&project.directorPhone">
              <span class="list-contentName">电话：</span>
              <span
                class="list-content"
                v-if="project&&project.directorPhone"
              >{{project.directorPhone}}</span>
            </div>
          </div>
        </div>
        <div class="require" v-if="project&&project.teamBrief">
          <span>团队核心</span>
        </div>
        <div class="requireContent" v-if="project&&project.teamBrief">{{project.teamBrief}}</div>
        <div class="require" v-if="project&&project.comment">
          <span>项目点评</span>
        </div>
        <div class="requireContent">
          <span v-if="project&&project.comment">{{projectData.comment}}</span>
        </div>
      </div>
    </div>
    <div class="w360 flr mes_list clearfix">
      <el-card class="box-card">
        <div class="userImgBox">
          <img class="userImg" :src="$url + memberInfo.photoImgPath" v-if="memberInfo&&memberInfo.photoImgPath" alt>
          <img class="userImg" src="/static/img/avatar-1.png" v-else alt>
        </div>
        <p class="username" v-if="memberInfo&&memberInfo.name != ''">{{memberInfo.name}}</p>
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
          <el-button class="lookBtn" @click="to_more_project">更多项目</el-button>          
        </div>
      </el-card>
      <p class="mes">可能感兴趣的项目</p>
      <ul class="mes_title">
        <div style="cursor:pointer">
          <li v-for="(item,index) in projectList" :key="index" class="mes_content">
            <p class="mes_listTitle">{{item.title}}</p>
            <p></p>
          </li>
        </div>
      </ul>
    </div>
    <el-dialog
      title="选择投递资金"
      :visible.sync="dialogFormVisible"
      width="30%"
      :before-close="before_close"
    >
      <div v-if="sub_project">
        <el-form>
          <el-form-item label="资金" label-width="100">
            <el-select v-model="capitalId" placeholder="请选择资金">
              <el-option
                v-for="item in myMoney"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
              <el-pagination
                v-show="myMoney_pagination"
                small
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :total="myMoney_Count"
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
        <!-- <div v-if="success" class="toast_title">成功</div> -->
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
      <div v-if="no_money" @click="toMymoney" style="color:#f00;font-size:18px;cursor:pointer;text-align:center;">前去发布--></div>
    </el-dialog>

    <div class="lg_box" v-show="should_login" @click="should_login = false"></div>
    <Login :should_login="should_login"></Login>
  </div>
</template>
<script>
import * as Cookies from 'js-cookie'

export default {
  data() {
    return {
      projectData: {},
      project: {},
      memberInfo:{},
      projectList:[],
      follow: 0,
      id: "",
      memberId:"",
      hint: "",
      success: false,
      toast_show: false,
      myMoney: [],
      capitalId: "",
      myMoney_Count: 0,
      myMoney_pagination: false,
      sub_project: true,
      dialogFormVisible:false,
      should_login:false,
      no_money:false,
    };
  },
  methods: {
    getData() {
      this.id = this.$route.query.id;
      this.loading = true;
      this.$axios
        .get(`/jsp/wap/trProject/ctrl/jsonProjectDetail.jsp?id=${this.id}`)
        .then(res => {
          console.log(res);
          this.project = res.data.project;
          this.memberInfo = res.data.memberInfo
          this.memberId = res.data.memberInfo.id
          this.projectList = res.data.projectList
          this.loading = false;
        });
    },
    //获取关注状态
    getFollow() {
      this.$axios
        .get(`/jsp/wap/trProject/ctrl/jsonIsFollow.jsp?id=${this.id}`)
        .then(res => {
          this.follow = Number(res.data);
        });
    },
    //关注
    gofollow() {
      this.$axios
        .get(`/jsp/wap/trProject/do/doFollow.jsp?id=${this.id}`)
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
        .get(`/jsp/wap/trProject/do/doUnfollow.jsp?id=${this.id}`)
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
    applyPoject() {
      if (Cookies.get("userKey")) {
        if (this.myMoney.length == 0) {
          this.success = false;
          this.no_money = true;
          this.hint = "您还没有发布资金，请先发布资金";
          this.toast_show = true;
        } else {
          this.no_money = false
          this.dialogFormVisible = true;
          this.projectId = this.$route.query.id;
        }
      } else {
        // this.success = false;
        // this.hint = "您未登录，请先登录";
        // this.toast_show = true;
        this.no_money = false
        this.should_login = true
      }
    },
    apply() {
      this.$axios
        .get("/jsp/wap/trProject/do/doBespoke.jsp", {
          params: { id: this.id, capitalId: this.capitalId }
        })
        .then(res => {
          if (res.success == "true") {
            this.success = true;
            this.hint = "项目约谈成功，平台将尽快为您安排";
            this.sub_project = false;
            // this.dialogFormVisible = false;
          } else {
            this.success = false;
            this.hint = res.message;
            this.sub_project = false;
          }
        });
    },
    toMymoney() {
      if (Cookies.get("userKey")) {
        let { href } = this.$router.resolve({
          name: "applyMoney"
        });
        window.open(href, "_blank");
      } else {
        this.$router.push("/login");
      }
    },
    before_close() {
      this.dialogFormVisible = false;
      setTimeout(()=> {
         this.sub_project = true;
        },1000)
    },
    getMyMoney(pn) {
      this.$axios
        .get("/jsp/wap/center/ctrl/jsonIssueCapitalList.jsp", {
          params: { pageNumber: pn }
        })
        .then(res => {
          this.myMoney = res.data.pageList;
          var myMoney = res.data.pageList
          if(myMoney.length > 0){
          this.capitalId = myMoney[0].id
          }
          this.myMoney_Count = Number(res.data.pagination.totalCount);
          if (this.myMoney_Count > 10) {
            this.myMoney_pagination = true;
        }
    });
  },
  
    handleCurrentChange(val) {
      this.getMyProject(val);
    },
    searchLabel(labelId){
      let { href } = this.$router.resolve({
        name: "searchLabelProject",
        query: {labelId}
      });
      window.open(href, "_blank");
    },
    to_more_project(){
      let { href } = this.$router.resolve({
        name: "pm",
        query: {memberId:this.memberId}
      });
      window.open(href, "_blank");
    }
  },
  created() {
    this.getData();
    this.getFollow();
    if (Cookies.get("userKey")) {
      this.getMyMoney()
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
  margin-bottom: 20px;
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
  font-size: 16px;
  font-family: "Microsoft YaHei";
  color: rgb(153, 153, 153);
}
.content_desc {
  font-size: 14px;
  line-height: 2;
  text-indent: 1em;
}
.box_content {
  line-height: 2;
  width: 330px;
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
  font-size: 14px;
  // text-indent: 2em;
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

.mes_content:hover {
  color: #005982;
}

.cl-0 {
  color: #000;
}

.cl-0:hover {
  color: #005982;
}
</style>