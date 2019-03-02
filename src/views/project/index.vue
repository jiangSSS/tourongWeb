<template>
  <div class="w1200 clearfix">
    <div class="clearfix bread_search">
      <div class="bread fll">
        <span>
          <router-link to="/home">首页 ></router-link>
        </span>
        <span>{{$route.meta.title}}</span>
      </div>
      <div class="flr search">
        <input type="text" placeholder="请输入关键字" v-model="title" @keyup.enter="search">
        <i @click="search"></i>
      </div>
    </div>
    <div class="clearfix" style="position:relative;">
      <div class="pd-15 fll" v-if="!isCheck2">
        <span class="act_type fll" style="margin-right:5px;">所属行业：</span>
        <div class="titleRight fll" v-if="!isShow">
          <span
            class="type_item"
            v-for="(item , index) in industryList.slice(0,9)"
            :key="index"
            @click="getIndustryStatus(item.dataValue,index)"
            :class="{active:item.checked}"
          >{{item.dataName}}</span>
        </div>
        <div class="titleRight fll" v-else>
          <span
            class="type_item"
            v-for="(item , index) in regionList"
            :key="index"
            @click="getIndustryStatus(item.dataValue,index)"
            :class="{active:item.checked}"
          >{{item.dataName}}</span>
        </div>
      </div>
      <div class="pd-15 fll industy" v-else>
        <span class="act_type fll">所属行业：</span>
        <div class="titleRight fll">
          <template>
            <el-checkbox-group
              v-if="!isShow"
              style="word-wrap: break-word;word-break: break-all;overflow: hidden;"
              v-model="checkIndustry"
              @change="industryChange"
            >
              <el-checkbox
                v-for="(item,index) in industryList.slice(0,9)"
                :key="index"
                :label="item"
              >{{item.dataName}}</el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-else v-model="checkIndustry" @change="industryChange">
              <el-checkbox v-for="(item,index) in industryList" :key="index" :label="item">{{item.dataName}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </div>
      </div>
      <div v-show="industryList.length > 15">
        <div class="moreTitle flr" @click="handleclick" v-if="!isShow">
          更多
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <div class="moreTitle flr" @click="handleclick2" v-else>
          收起
          <i class="el-icon-arrow-up el-icon--right"></i>
        </div>
      </div>

      <div class="flr checkBoxBtn" @click="handleCheck2" v-if="!isShow">
        多选
        <i class="el-icon-plus"></i>
      </div>
      <div class="flr checkBoxBtn2" @click="handleCheck2" v-else>
        多选
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <div class="clearfix" style="position:relative;">
      <div class="pd-15 fll" v-if="!isCheck">
        <span class="act_type fll" style="margin-right:5px;">所属地区：</span>
        <div class="titleRight fll" v-if="!isShowArea">
          <span
            class="type_item"
            v-for="(item , index) in regionList.slice(0,9)"
            :key="index"
            @click="getRegionStatus(item.dataValue,index)"
            :class="{active:item.checked}"
          >{{item.dataName}}</span>
        </div>
        <div class="titleRight fll" v-else>
          <span
            class="type_item"
            v-for="(item , index) in regionList"
            :key="index"
            @click="getRegionStatus(item.dataValue,index)"
            :class="{active:item.checked}"
          >{{item.dataName}}</span>
        </div>
      </div>
      <div class="pd-15 fll" v-else>
        <span class="act_type fll">所属地区：</span>
        <div class="titleRight fll">
          <template>
            <el-checkbox-group
              v-if="!isShowArea"
              style="word-wrap: break-word;word-break: break-all;overflow: hidden;"
              v-model="checkArea"
              @change="regionChange"
            >
              <el-checkbox
                v-for="(item,index) in regionList.slice(0,9)"
                :key="index"
                :label="item"
              >{{item.dataName}}</el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-else  v-model="checkArea" @change="regionChange">
              <el-checkbox v-for="(item,index) in regionList" :key="index" :label="item">{{item.dataName}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </div>
      </div>
      <div>
        <div class="moreTitle flr" @click="handleAreaDown" v-if="!isShowArea">
          更多
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <div class="moreTitle flr" @click="handleAreaUp" v-else>
          收起
          <i class="el-icon-arrow-up el-icon--right"></i>
        </div>
      </div>

      <div class="flr checkBoxBtn" @click="handleCheck" v-if="!isShowArea">
        多选
        <i class="el-icon-plus"></i>
      </div>
      <div class="flr checkBoxBtn2" @click="handleCheck" v-else>
        多选
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <div class="pd-15">
      <span class="act_type">融资金额：</span>
      <span
        class="type_item"
        v-for="(item , index) in financingMoneyList"
        :key="index"
        @click="getFinancingMoneyStatus(item.dataValue,index)"
        :class="{active:item.checked}"
      >{{item.dataName}}</span>
    </div>
    <div class="pd-15">
      <span class="act_type">融资方式：</span>
      <span
        class="type_item"
        v-for="(item , index) in financingWayList"
        :key="index"
        @click="getFinancingWayList(item.dataValue,index)"
        :class="{active:item.checked}"
      >{{item.dataName}}</span>
    </div>
    <div class="w840 fll">
      <div class="mes_list listbottom">
        <p class="mes">项目列表</p>
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
        <button class="subBtn" @click="applyPoject(item.id)">投递资金</button>
      </div>
      </div>
      <div class="load_more" @click="morePage" v-show="more">加载更多...</div>
      <p style="color:#999;" v-show="noMore">-------------------------------------------------没有更多项目了----------------------------------------------------</p>
    </div>
    <div class="w360 flr mes_list clearfix">
      <img src="/static/img/money_list.jpg" alt class="act_timelist" @click="toMymoney">
      <p class="mes">
        热门资讯
        <span class="mes_more flr" @click="$router.push('/message')">更多></span>
      </p>
      <ul class="mes_title" v-loading="newsloading">
          <li v-for="(item,index) in mesData" :key="index" class="mes_content">
            <router-link :to="{name:'messageDetail',query:{id:item.id}}">
              <span class="cl-0">{{item.title}}</span>
            </router-link>
          </li>
      </ul>
      <img :src="$url + imgData.webImgPath" alt width="360px" height="350px" style="margin-bottom:75px">
    </div>
    <el-dialog title="选择投递资金" :visible.sync="dialogFormVisible" width="30%" :before-close ="before_close">
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

    <el-dialog
      :visible.sync="toast_show"
      width="30%"
      center>
      <div class="toast_success" v-if="success"></div>
      <div class="toast_error" v-else></div>
      <div v-if="success" class="toast_title">成功</div>
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
      should_login:false,
      isShow: false,
      isShowArea: false,
      isCheck: false,
      isCheck2: false,
      newsloading:false,
      dialogFormVisible: false,
      more:false,
      noMore:false,
      no_money:false,
      actType: ["不限", "债券融资", "股权融资", "整体转让", "其他融资"],
      moneyType: [
        "个人资金",
        "企业资金",
        "天使投资",
        "VC投资",
        "PE投资",
        "小额贷款",
        "典当公司"
      ],
      area: ["北京", "上海", "广州", "深圳", "农大"],
      investArea: [
        "不限",
        "北京",
        "上海",
        "广州",
        "深圳",
      ],

      actlist: [
        {
          title: "北京某企资金1000万-9亿元寻求全国优质实体项目合作",
          content:
            "本人在天津研发净化空气的设备，有实用新型专利和发明专利，两个合伙人，目前已经入驻天津的工业园区",
          beginTime: "2019/01/01",
          focus: "155人关注"
        },
      ],
      mesData: [
        {
          content:
            "“ofo小黄车退了么”成为了关注焦点；中移动受让中国民航信息5.01%股权"
        },
        {
          content:
            "“ofo小黄车退了么”成为了关注焦点；中移动受让中国民航信息5.01%股权"
        },
        {
          content:
            "“ofo小黄车退了么”成为了关注焦点；中移动受让中国民航信息5.01%股权"
        },
      ],
      checkIndustry:[],
      checkArea:[],
      financingMoneyList:[],
      financingWayList: [],
      industryList: [],
      regionList: [],
      pageList:[],
      totalCount:'',
      pn:1,
      industrys:"",
      regions:"",
      financingWays:"",
      financingMoneys:"",
      title:"",
      hint:"",
      success:false,
      toast_show:false,
      myMoney:[],
      id: "",
      capitalId: "",
      myMoney_Count: 0,
      myMoney_pagination: false,
      sub_project:true,
      imgData:[]
    };
  },
  methods: {
    //广告图
    getImg(){
      this.$axios.get(`/jsp/wap/index/ctrl/jsonAdvertisement.jsp?key=webProjectList`).then(res=>{
        console.log("img",res)
        this.imgData = res.data
      })
    },
  //获取数据
  getTypeData() {
      this.$axios.get("/jsp/wap/trProject/ctrl/jsonCategoryList.jsp").then(res => {
        if (res.success == "true") {
          let financingWayList = res.data.financingWayList
          financingWayList.forEach(item => {
            this.$set(item, 'checked', false)
          });
          financingWayList.unshift({dataName:'不限'})
          this.financingWayList = financingWayList;
          let industryList = res.data.industryList
          industryList.forEach(item => {
            this.$set(item, 'checked', false)
          });
          industryList.unshift({dataName:'不限'})
          this.industryList = industryList;
          let financingMoneyList = res.data.financingMoneyList
          financingMoneyList.forEach(item => {
            this.$set(item, 'checked', false)
          });
          financingMoneyList.unshift({dataName:'不限'})
          this.financingMoneyList = financingMoneyList;
          let regionList = res.data.regionList
          regionList.forEach(item => {
            this.$set(item, 'checked', false)
          });
          regionList.unshift({dataName:'不限'})
          this.regionList = regionList;
        }
      });
    },
  getActData(financingWays,regions,industrys,financingMoneys) {
      this.loading = true;
      this.$axios
        .get("/jsp/wap/trProject/ctrl/jsonProjectPage.jsp", {       
          params: { financingWays,regions,industrys,financingMoneys,title: this.title}
        })
        .then(res => {
          if (res.success == "true") {
            this.pageList = res.data.pageList;
            this.totalCount = res.data.pagination.totalCount;
            this.pn = 1;
            if(this.totalCount > this.pageList.length) {
              this.more = true
              this.noMore = false
            } else {
              this.more = false
              this.noMore = true
            }
            this.pn = 1
            this.loading = false;
          }
        });
    },
  getNewsList(){
      this.newsloading = true;
      this.$axios
        .get("/jsp/wap/trNews/ctrl/jsonHotNewsList.jsp",)
        .then(res => {
          if (res.success == "true") {
            this.mesData = res.data
            this.newsloading = false;
          }
        });
  },
  getMyMoney(pn) {
      this.$axios                  
        .get("/jsp/wap/center/ctrl/jsonIssueCapitalList.jsp", {
          params: { pageNumber: pn }
        })
        .then(res => {
          console.log("我的资金",res)
          this.myMoney = res.data.pageList;
          var myMoney = res.data.pageList
          if(myMoney.length > 0){
          this.capitalId = myMoney[0].id
          }
          this.myMoney = myMoney
        });
  },
  morePage() {
      this.pn += 1;
      this.loading = true;
      this.$axios
        .get("/jsp/wap/trProject/ctrl/jsonProjectPage.jsp", {
          params: {
            regions:this.regions,
            financingWays:this.financingWays,
            industrys:this.industrys,
            financingMoneys:this.financingMoneys,
            pageNumber: this.pn
          }
        })
        .then(res => {
          if (res.success == "true") {
            this.pageList = [...this.pageList, ...res.data.pageList];
            this.totalCount = res.data.pagination.totalCount;
            if(this.totalCount > this.pageList.length) {
              this.more = true
              this.noMore = false
            } else {
              this.more = false
              this.noMore = true
            }
            this.loading = false;
          }
        });
    },
  getFinancingWayList(e,index){
    this.financingWays = e
      if(this.financingWayList[index].checked){
        this.financingWayList[index].checked = !this.financingWayList[index].checked
        this.financingWays = ''
      } else {
          this.financingWayList.forEach(item => {
              item.checked = false
        });
        this.financingWayList[index].checked = true
      }
      this.getActData(this.financingWays,this.regions,this.industrys,this.financingMoneys)
  },
  getIndustryStatus(e,index){
    this.industrys = e
      if(this.industryList[index].checked){
        this.industryList[index].checked = !this.industryList[index].checked
        this.industrys = ''
      } else {
          this.industryList.forEach(item => {
              item.checked = false
        });
        this.industryList[index].checked = true
      }
      this.getActData(this.financingWays,this.regions,this.industrys,this.financingMoneys)
  },
  getRegionStatus(e,index){
    this.regions = e
      if(this.regionList[index].checked){
        this.regionList[index].checked = !this.regionList[index].checked
        this.regions = ''
      } else {
          this.regionList.forEach(item => {
              item.checked = false
        });
        this.regionList[index].checked = true
      }
      this.getActData(this.financingWays,this.regions,this.industrys,this.financingMoneys)
  },
  getFinancingMoneyStatus(e,index){
    this.financingMoneys = e
    if(this.financingMoneyList[index].checked){
        this.financingMoneyList[index].checked = !this.financingMoneyList[index].checked
        this.financingMoneys = ''
      } else {
          this.financingMoneyList.forEach(item => {
              item.checked = false
        });
        this.financingMoneyList[index].checked = true
      }
      this.getActData(this.financingWays,this.regions,this.industrys,this.financingMoneys)
  },
  industryChange(val){
    let industryList = []
    val.forEach(item => {
      industryList.push(item.dataValue)
    })
    this.industrys = industryList.join(',')
    this.getActData(this.financingWays,this.regions,this.industrys,this.financingMoneys)
  },
  regionChange(val){
    let regionList = []
    val.forEach(item => {
      regionList.push(item.dataValue)
    })
    this.regions = regionList.join(',')
    this.getActData(this.financingWays,this.regions,this.industrys,this.financingMoneys)
  },
  investRegionChange(val){
    let investRegionList = []
    val.forEach(item => {
      investRegionList.push(item.dataValue)
    })
    this.investRegions = investRegionList.join(',')
    this.getActData(this.financingWays,this.regions,this.industrys,this.financingMoneys)
  },
    //单多选
    handleclick() {
      if (this.industry.length >= 9) {
        this.isShow = true;
      }
    },
    handleclick2() {
      this.isShow = false;
    },
    handleAreaDown() {
      if (this.investArea.length >= 9) {
        this.isShowArea = true;
      }
    },
    handleAreaUp() {
      this.isShowArea = false;
      this.isCheck = false;
    },
    handleCheck() {
      this.isCheck = !this.isCheck;
    },
    handleCheck2() {
      this.isCheck2 = !this.isCheck2;
    },
    toProjectDetailPage(id){
      let {href} = this.$router.resolve({
          name: "projectDetail",
          query: {id}
      });
      window.open(href, '_blank');
    },
    toMessagePage(){
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
    search(){
      this.loading = true;
      this.$axios
        .get("/jsp/wap/trProject/ctrl/jsonProjectPage.jsp", {
          params: { financingWays:this.financingWays,regions:this.regions,industrys:this.industrys,financingMoneys:this.financingMoneys,title:this.title}
        })
        .then(res => {
          if (res.success == "true") {
            this.pageList = res.data.pageList;
            this.totalCount = res.data.pagination.totalCount;
            this.pn = 1;
            this.loading = false;
          }
        });
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
    handleCurrentChange(val) {
      this.getMyMoney(val);
    },
    applyPoject(id) {
      if (Cookies.get("userKey")) {
        if (this.myMoney.length == 0) {
          this.success = false;
          this.no_money = true
          this.hint = "您还没有发布资金，请先发布资金";
          this.toast_show = true;
        } else {
          this.no_money = false
          this.dialogFormVisible = true;
          this.id = id;
        }
      } else {
        // this.success = false;
        // this.hint = "您未登录，请先登录";
        this.no_money = false
        // this.toast_show = true;
        this.should_login = true
      }
    },
    apply() {
      this.$axios
        .get("/jsp/wap/trProject/do/doBespoke.jsp", {
          params: { capitalId: this.capitalId, id: this.id }
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
    before_close(){
        this.dialogFormVisible = false;
        setTimeout(()=> {
         this.sub_project = true;
        },1000)
    },
  },
  created(){
    this.getTypeData()
    this.getActData()
    this.getNewsList()
    this.getImg()
    if (Cookies.get("userKey")) {
      this.getMyMoney()
    }
  },
  watch:{
    title(title){
      this.loading = true;
      this.$axios
        .get("/jsp/wap/trProject/ctrl/jsonProjectPage.jsp", {
          params: { financingWays:this.financingWays,regions:this.regions,industrys:this.industrys,financingMoneys:this.financingMoneys,title}
        })
        .then(res => {
          if (res.success == "true") {
            this.pageList = res.data.pageList;
            this.totalCount = res.data.pagination.totalCount;
            this.pn = 1;
            this.loading = false;
          }
        });
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
    font-size: 22px;
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
    .mes_more:hover{
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
  .el-checkbox{
    width:110px!important;
    padding-bottom: 3.1px!important;
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
</style>