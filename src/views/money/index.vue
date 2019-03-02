<template>
  <div>
    <el-dialog :visible.sync="toast_show" width="30%" center>
      <div class="toast_success" v-if="success"></div>
      <div class="toast_error" v-else></div>
      <div v-if="success" class="toast_title">成功</div>
      <!-- <div v-else class="toast_content">失败</div> -->
      <p class="toast_title">{{hint}}</p>
      <div v-if="no_project" @click="toMyproject" style="color:#f00;font-size:18px;cursor:pointer;text-align:center;">前去发布--></div>
    </el-dialog>
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
          <span class="act_type fll" style="margin-right:5px;">投资行业：</span>
          <div class="titleRight fll" v-if="!isShowArea2">
            <span
              class="type_item"
              v-for="(item , index) in investIndustryList.slice(0,9)"
              :key="index"
              @click="getInvestIndustryStatus(item.dataValue,index)"
              :class="{active:item.checked}"
            >{{item.dataName}}</span>
          </div>
          <div class="titleRight fll" v-else>
            <span
              class="type_item"
              v-for="(item , index) in investIndustryList"
              :key="index"
              @click="getInvestIndustryStatus(item.dataValue,index)"
              :class="{active:item.checked}"
            >{{item.dataName}}</span>
          </div>
        </div>
        <div class="pd-15 fll industy" v-else>
          <span class="act_type fll">投资行业：</span>
          <div class="titleRight fll">
            <template>
              <el-checkbox-group
                v-if="!isShow2"
                style="word-wrap: break-word;word-break: break-all;overflow: hidden;"
                v-model="checkIndustry"
                @change="investIndustryChange"
              >
                <el-checkbox
                  v-for="(item,index) in investIndustryList.slice(0,9)"
                  :key="index"
                  :label="item"
                >{{item.dataName}}</el-checkbox>
              </el-checkbox-group>
              <el-checkbox-group v-else v-model="investIndustryList" @change="investIndustryChange">
                <el-checkbox
                  v-for="(item,index) in investIndustryList"
                  :key="index"
                  :label="item.dataName"
                >{{item.dataName}}</el-checkbox>
              </el-checkbox-group>
            </template>
          </div>
        </div>
        <div v-show="investIndustryList.length > 15">
          <div class="moreTitle flr" @click="handleclick" v-if="!isShow2">
            更多
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <div class="moreTitle flr" @click="handleclick3" v-else>
            收起
            <i class="el-icon-arrow-up el-icon--right"></i>
          </div>
        </div>

        <div class="flr checkBoxBtn" @click="handleCheck3" v-if="!isShowArea2">
          多选
          <i class="el-icon-plus"></i>
        </div>
        <div class="flr checkBoxBtn2" @click="handleCheck3" v-else>
          多选
          <i class="el-icon-plus"></i>
        </div>
      </div>
      <div class="pd-15">
        <span class="act_type">投资类型：</span>
        <span
          class="type_item"
          v-for="(item , index) in investTypeList"
          :key="index"
          @click="getInvestTypeStatus(item.dataValue,index)"
          :class="{active:item.checked}"
        >{{item.dataName}}</span>
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
              <el-checkbox-group v-else v-model="checkArea" @change="regionChange">
                <el-checkbox
                  v-for="(item,index) in regionList"
                  :key="index"
                  :label="item"
                >{{item.dataName}}</el-checkbox>
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
      <div class="clearfix" style="position:relative;">
        <div class="pd-15 fll" v-if="!isCheck1">
          <span class="act_type fll" style="margin-right:5px;">投资地区：</span>
          <div class="titleRight fll" v-if="!isShowArea1">
            <span
              class="type_item"
              v-for="(item , index) in investRegionList.slice(0,9)"
              :key="index"
              @click="getInvestRegionStatus(item.dataValue,index)"
              :class="{active:item.checked}"
            >{{item.dataName}}</span>
          </div>
          <div class="titleRight fll" v-else>
            <span
              class="type_item"
              v-for="(item , index) in investRegionList"
              :key="index"
              @click="getInvestRegionStatus(item.dataValue,index)"
              :class="{active:item.checked}"
            >{{item.dataName}}</span>
          </div>
        </div>
        <div class="pd-15 fll" v-else>
          <span class="act_type fll">投资地区：</span>
          <div class="titleRight fll">
            <template>
              <el-checkbox-group
                v-if="!isShowArea1"
                style="word-wrap: break-word;word-break: break-all;overflow: hidden;"
                v-model="checkInvestArea"
                @change="investRegionChange"
              >
                <el-checkbox
                  v-for="(item,index) in investRegionList.slice(0,9)"
                  :key="index"
                  :label="item"
                >{{item.dataName}}</el-checkbox>
              </el-checkbox-group>
              <el-checkbox-group v-else v-model="checkInvestArea" @change="investRegionChange">
                <el-checkbox
                  v-for="(item,index) in investRegionList"
                  :key="index"
                  :label="item"
                >{{item.dataName}}</el-checkbox>
              </el-checkbox-group>
            </template>
          </div>
        </div>
        <div>
          <div class="moreTitle flr" @click="handleAreaDown1" v-if="!isShowArea1">
            更多
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <div class="moreTitle flr" @click="handleAreaUp1" v-else>
            收起
            <i class="el-icon-arrow-up el-icon--right"></i>
          </div>
        </div>

        <div class="flr checkBoxBtn" @click="handleCheck1" v-if="!isShowArea1">
          多选
          <i class="el-icon-plus"></i>
        </div>
        <div class="flr checkBoxBtn2" @click="handleCheck1" v-else>
          多选
          <i class="el-icon-plus"></i>
        </div>
      </div>

      <div class="pd-15">
        <span class="act_type">投资金额：</span>
        <span
          class="type_item"
          v-for="(item , index) in investAmountList"
          :key="index"
          @click="getInvestAmountStatus(item.dataValue,index)"
          :class="{active:item.checked}"
        >{{item.dataName}}</span>
      </div>
      <div class="w840 fll">
        <div class="mes_list listbottom">
          <p class="mes">投资信息列表</p>
        </div>
        <div v-loading="loading">
          <div class="act_list clearfix" v-for="(item, index) in pageList" :key="index">
            <div @click="toMoneyDetailPage(item.id)">
              <div class="clearfix">
                <span class="list-title fll" v-if="item&&item.title">{{item.title}}</span>
                <span
                  class="title_time flr"
                  v-if="item&&item.addTimeStr"
                >{{item.addTimeStr.slice(0,10)}}</span>
              </div>
              <div class="clearfix">
                <div class="fll box_content">
                  <span class="list-contentName">投资资金：</span>
                  <span class="current" v-if="item&&item.investAmountName">{{item.investAmountName}}</span>
                </div>
                <div class="focusNum flr" v-if="item&&item.followNum">{{item.followNum}}人关注</div>
              </div>
              <div class="clearfix">
                <!-- <div class="fll"> -->
                  <!-- <div class="box_content fll">
                    <span class="list-contentName">投资方式：</span>
                    <span class="list-content" v-if="item&&item.investWayName">{{item.investWayName}}</span>
                    <span class="list-content" v-else>***</span>
                  </div> -->
                  <div class="box_content fll">
                    <span class="list-contentName">投资地区：</span>
                    <span
                      class="list-content"
                      v-if="item&&item.investRegionNameStr"
                    >{{item.investRegionNameStr}}</span>
                    <span class="list-content" v-else>***</span>
                  </div>
                  <div class="box_content fll">
                    <span class="list-contentName">投资类型：</span>
                    <span
                      class="list-content"
                      v-if="item&&item.investTypeName"
                    >{{item.investTypeName}}</span>
                    <span class="list-content" v-else>***</span>
                  </div>
                <!-- </div>
                <div class="fll"> -->
                  <div class="box_content fll">
                    <span class="list-contentName">资金主体：</span>
                    <span class="list-content" v-if="item&&item.pawnTypeName">{{item.pawnTypeName}}</span>
                    <span class="list-content" v-else>***</span>
                  </div>
                  <div class="box_content fll">
                    <span class="list-contentName">投资行业：</span>
                    <span
                      class="list-content"
                      v-if="item&&item.investIndustryName"
                    >{{item.investIndustryName}}</span>
                    <span class="list-content" v-else>***</span>
                  </div>
                  <div class="box_content fll">
                    <span class="list-contentName">投资阶段：</span>
                    <span
                      class="list-content"
                      v-if="item&&item.investStageName"
                    >{{item.investStageName}}</span>
                    <span class="list-content" v-else>***</span>
                  </div>
                <!-- </div> -->
              </div>
            </div>
            <button class="subBtn" @click="applyPoject(item.id)">投递项目</button>
          </div>
        </div>
        <div class="load_more" @click="morePage" v-show="more">加载更多...</div>
        <p
          style="color:#999;"
          v-show="noMore"
        >-------------------------------------------------没有更多资金了----------------------------------------------------</p>
      </div>
      <div class="w360 flr mes_list clearfix">
        <img src="/static/img/project_list.jpg" alt class="act_timelist" @click="toMyproject">
        <p class="mes">
          热门资讯
          <span class="mes_more flr" @click="toMessagePage">更多></span>
        </p>
        <ul class="mes_title" v-loading="newsloading">
          <li
            v-for="(item,index) in mesData"
            :key="index"
            class="mes_content"
            @click="toMessageDetailPage(item.id)"
          >
            <span class="cl-0">{{item.title}}</span>
          </li>
        </ul>
        <img :src="$url + imgData.webImgPath" alt width="360px" height="350px" style="margin-bottom:75px">
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
            <!-- <div v-if="success" class="toast_title">成功</div> -->
            <!-- <div v-else class="toast_title">失败</div> -->
            <p class="toast_title">{{hint}}</p>
        </div>
      </el-dialog>
    </div>
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
      isShow: false,
      isShow2: false,
      isShowArea: false,
      isShowArea1: false,
      isShowArea2: false,
      isCheck: false,
      isCheck1: false,
      isCheck2: false,
      loading: false,
      newsloading: false,
      dialogFormVisible: false,
      more: false,
      noMore: false,
      actType: [],
      moneyType: [],
      area: [],
      investArea: [],
      investMoney: [],
      actlist: [],
      mesData: [],
      checkIndustry: [],
      checkArea: [],
      checkInvestArea: [],
      investAmountList: [],
      investIndustryList: [],
      investRegionList: [],
      investTypeList: [],
      regionList: [],
      pageList: [],
      totalCount: '',
      pn: 1,
      investIndustrys: "",
      investTypes: "",
      regions: "",
      investRegions: "",
      investAmounts: "",
      title: "",
      toast_show: false,
      success: true,
      hint: "",
      myProject: [],
      projectId: "",
      moneyId: "",
      myProject_Count: 0,
      myProject_pagination: false,
      sub_project:true,
      no_project:false,
      imgData:[]
    };

  },
  methods: {
     getImg(){
      this.$axios.get(`/jsp/wap/index/ctrl/jsonAdvertisement.jsp?key=webCapitalList`).then(res=>{
        console.log("img",res)
        this.imgData = res.data
      })
    },
    getTypeData() {
      this.$axios
        .get("/jsp/wap/trCapital/ctrl/jsonCategoryList.jsp")
        .then(res => {
          if (res.success == "true") {
            let investAmountList = res.data.investAmountList;
            investAmountList.forEach(item => {
              this.$set(item, "checked", false);
            });
            this.investAmountList = investAmountList;
            let investIndustryList = res.data.investIndustryList;
            investIndustryList.forEach(item => {
              this.$set(item, "checked", false);
            });
            investIndustryList.unshift({ dataName: "不限" });
            this.investIndustryList = investIndustryList;
            let investRegionList = res.data.investRegionList;
            investRegionList.forEach(item => {
              this.$set(item, "checked", false);
            });
            investRegionList.unshift({ dataName: "不限" });
            this.investRegionList = investRegionList;
            let investTypeList = res.data.investTypeList;
            investTypeList.forEach(item => {
              this.$set(item, "checked", false);
            });
            investTypeList.unshift({ dataName: "不限" });
            this.investTypeList = investTypeList;
            let regionList = res.data.regionList;
            regionList.forEach(item => {
              this.$set(item, "checked", false);
            });
            regionList.unshift({ dataName: "不限" });
            this.regionList = regionList;
          }
        });
    },
    //按分类获取数据
    getActData(investIndustrys,investTypes,regions,investRegions,investAmounts) {
      this.loading = true;
      this.$axios
        .get("/jsp/wap/trCapital/ctrl/jsonCapitalPage.jsp", {
          params: {
            investIndustrys,
            investTypes,
            regions,
            investRegions,
            investAmounts,
            title: this.title
          }
        })
        .then(res => {
          if (res.success == "true") {
            this.pageList = res.data.pageList;
            this.totalCount = res.data.pagination.totalCount;
            this.pn = 1;
            if (this.totalCount > this.pageList.length) {
              this.more = true;
              this.noMore = false
            } else {
              this.more = false;
              this.noMore = true;
            }
            this.pn = 1
            this.loading = false;
          }
        });
    },
    //获取热评
    getNewsList() {
      this.newsloading = true;
      this.$axios.get("/jsp/wap/trNews/ctrl/jsonHotNewsList.jsp").then(res => {
        if (res.success == "true") {
          this.mesData = res.data;
          this.newsloading = false;
        }
      });
    },
    //获取我发布的项目
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
    //获取更多
    morePage() {
      this.pn += 1;
      this.loading = true;
      this.$axios
        .get("/jsp/wap/trCapital/ctrl/jsonCapitalPage.jsp", {
          params: {
            investIndustrys: this.investIndustrys,
            investTypes: this.investTypes,
            regions: this.regions,
            investRegions: this.investRegions,
            investAmounts: this.investAmounts,
            pageNumber: this.pn
          }
        })
        .then(res => {
          if (res.success == "true") {
            this.pageList = [...this.pageList, ...res.data.pageList];
            this.totalCount = res.data.pagination.totalCount;
            if (this.totalCount > this.pageList.length) {
              this.more = true;
              this.noMore = false
            } else {
              this.more = false;
              this.noMore = true;
            }
            this.loading = false;
          }
        });
    },
    //通过投资类型获取数据
    getInvestTypeStatus(e, index) {
      this.investTypes = e;
      if (this.investTypeList[index].checked) {
        this.investTypeList[index].checked = !this.investTypeList[index]
          .checked;
        this.investTypes = "";
      } else {
        this.investTypeList.forEach(item => {
          item.checked = false;
        });
        this.investTypeList[index].checked = true;
      }
      this.getActData(
        this.investIndustrys,
        this.investTypes,
        this.regions,
        this.investRegions,
        this.investAmounts
      );
    },
    //通过所属地区获取数据
    getRegionStatus(e, index) {
      this.regions = e;
      if (this.regionList[index].checked) {
        this.regionList[index].checked = !this.regionList[index].checked;
        this.regions = "";
      } else {
        this.regionList.forEach(item => {
          item.checked = false;
        });
        this.regionList[index].checked = true;
      }
      this.getActData(
        this.investIndustrys,
        this.investTypes,
        this.regions,
        this.investRegions,
        this.investAmounts
      );
    },
    //通过投资地区获取数据
    getInvestRegionStatus(e, index) {
      this.investRegions = e;
      if (this.investRegionList[index].checked) {
        this.investRegionList[index].checked = !this.investRegionList[index]
          .checked;
        this.investRegions = "";
      } else {
        this.investRegionList.forEach(item => {
          item.checked = false;
        });
        this.investRegionList[index].checked = true;
      }
      this.getActData(
        this.investIndustrys,
        this.investTypes,
        this.regions,
        this.investRegions,
        this.investAmounts
      );
    },
    //通过投资金额获取数据
    getInvestAmountStatus(e, index) {
      this.investAmounts = e;
      if (this.investAmountList[index].checked) {
        this.investAmountList[index].checked = !this.investAmountList[index]
          .checked;
        this.investAmounts = "";
      } else {
        this.investAmountList.forEach(item => {
          item.checked = false;
        });
        this.investAmountList[index].checked = true;
      }
      this.getActData(
        this.investIndustrys,
        this.investTypes,
        this.regions,
        this.investRegions,
        this.investAmounts
      );
    },
    //通过投资行业获取数据
    getInvestIndustryStatus(e,index){
      this.investIndustrys = e;
      if (this.investIndustryList[index].checked) {
        this.investIndustryList[index].checked = !this.investIndustryList[index]
          .checked;
        this.investIndustrys = "";
      } else {
        this.investIndustryList.forEach(item => {
          item.checked = false;
        });
        this.investIndustryList[index].checked = true;
      }
      this.getActData(
        this.investIndustrys,
        this.investTypes,
        this.regions,
        this.investRegions,
        this.investAmounts
      );    
    },
    //单选类型改变
    investIndustryChange(val) {
      let investIndustryList = [];
      val.forEach(item => {
        investIndustryList.push(item.dataValue);
      });
      this.investIndustrys = investIndustryList.join(",");
      this.getActData(
        this.investIndustrys,
        this.investTypes,
        this.regions,
        this.investRegions,
        this.investAmounts
      );
    },
    regionChange(val) {
      let regionList = [];
      val.forEach(item => {
        regionList.push(item.dataValue);
      });
      this.regions = regionList.join(",");
      this.getActData(
        this.investIndustrys,
        this.investTypes,
        this.regions,
        this.investRegions,
        this.investAmounts
      );
    },
    investRegionChange(val) {
      let investRegionList = [];
      val.forEach(item => {
        investRegionList.push(item.dataValue);
      });
      this.investRegions = investRegionList.join(",");
      this.getActData(
        this.investIndustrys,
        this.investTypes,
        this.regions,
        this.investRegions,
        this.investAmounts
      );
    },
    deliver_project() {
      this.$notify.success({
        title: "成功",
        message: "项目投递成功"
      });
    },
    //控制更多或多选
    handleTypeDown() {
      if (this.actType.length >= 9) {
        this.isShow = true;
      }
    },
    handleTypeUp() {
      this.isShow = false;
    },
    handleclick() {
      this.isShow2 = true;
    },
    handleclick2() {
      this.isShow = false;
    },
    handleclick3() {
      this.isShow2 = false;
    },
    handleclick4() {
      this.isShow = true;
    },
    handleAreaDown() {
        this.isShowArea = true;
    },
    handleAreaUp() {
      this.isShowArea = false;
      this.isCheck = false;
    },
    handleAreaDown1() {
        this.isShowArea1 = true;
    },
    handleAreaUp1() {
      this.isShowArea1 = false;
      this.isCheck1 = false;
    },
    handleCheck() {
      this.isCheck = !this.isCheck;
      if (!this.isCheck) {
        this.regions = "";
        this.getActData(
          this.investIndustrys,
          this.investTypes,
          this.regions,
          this.investRegions,
          this.investAmount
        );
      }
    },
    handleCheck1() {
      this.isCheck1 = !this.isCheck1;
      if (!this.isCheck1) {
        this.investRegions = "";
        this.getActData(
          this.investIndustrys,
          this.investTypes,
          this.regions,
          this.investRegions,
          this.investAmount
        );
      }
    },
    handleCheck3(){
      this.isCheck2 = !this.isCheck2;
      if (!this.isCheck2) {
        this.investIndustrys = "";
        this.getActData(
          this.investIndustrys,
          this.investTypes,
          this.regions,
          this.investRegions,
          this.investAmount
        );
      }
    },
    toMoneyDetailPage(id) {
      let { href } = this.$router.resolve({
        name: "moneyDetail",
        query: { id }
      });
      window.open(href, "_blank");
    },
    toMessagePage() {
      let { href } = this.$router.resolve({
        name: "message"
      });
      window.open(href, "_blank");
    },
    toMessageDetailPage(id) {
      let { href } = this.$router.resolve({
        name: "messageDetail",
        query: { id }
      });
      window.open(href, "_blank");
    },
    search() {
      this.loading = true;
      this.$axios
        .get("/jsp/wap/trCapital/ctrl/jsonCapitalPage.jsp", {
          params: {
            investIndustrys: this.investIndustrys,
            investTypes: this.investTypes,
            regions: this.regions,
            investRegions: this.investRegions,
            investAmounts: this.investAmounts,
            title: this.title
          }
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
    //投递项目
    applyPoject(id) {
      if (Cookies.get("userKey")) {
        if (this.myProject.length == 0) {
          this.success = false;
          this.no_project = true
          this.hint = "您还没有发布项目，请先发布项目";
          this.toast_show = true;
        } else {
          this.no_project = false
          this.dialogFormVisible = true;
          this.moneyId = id;
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
    handleCurrentChange(val) {
      this.getMyProject(val);
    },
  },
  created() {
    this.getTypeData();
    this.getActData();
    this.getNewsList();
    this.getImg()
    if (Cookies.get("userKey")) {
      this.getMyProject();
    }
  },
  watch:{
    title(title){
      this.loading = true;
      this.$axios
        .get("/jsp/wap/trCapital/ctrl/jsonCapitalPage.jsp", {
          params: {
            investIndustrys: this.investIndustrys,
            investTypes: this.investTypes,
            regions: this.regions,
            investRegions: this.investRegions,
            investAmounts: this.investAmounts,
            title
          }
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
} //选择类型
.act_type {
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: rgb(51, 51, 51);
  font-weight: bold;
  line-height: 1.857;
} // 更多 + 多选
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
  width: 810px;
  height: 180px;
  padding-bottom: 30px;
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
  color: #888;
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
  color: #999;
}

.box_content {
  width: 365px;
  line-height: 2;
  font-size: 14px !important;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis;
}

.list-content {
  // margin-left: 30px;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: #333;
  // display: inline-block;
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
  cursor: pointer;
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
  bottom: 40px;
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
  .industy .el-checkbox {
    width: auto !important;
    margin-right: 50px;
  }
}

.active {
  color: #005982;
  font-weight: 700;
}

// .titleRight .type_item:nth-child(31){
//   margin-right: 20px;
// }
// .titleRight .type_item:nth-child(21){
//   margin-right: 20px;
// }
// .titleRight .type_item:nth-child(11){
//   margin-right: 20px;
// }
// .titleRight .type_item:nth-child(1){
//   margin-right: 20px;
// }
</style>