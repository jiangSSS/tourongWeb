<template>
  <div class="w1200 clearfix">
    <div class="w840 fll">
      <div class="bread">
        <span>
          <router-link to="/home">首页 ></router-link>
        </span>
        <span>{{$route.meta.title}}</span>
      </div>
      <div class="pd-15">
        <span class="act_type">分类：</span>
        <span
          class="type_item"
          v-for="(item , index) in categoryList"
          :key="index"
          @click="getType(item.dataValue,index)"
          :class="{active:item.checked}"
        >{{item.dataName}}</span>
      </div>
      <div class="pd-15">
        <span class="act_type">状态：</span>
        <span
          class="type_item"
          v-for="(item , index) in statusList"
          :key="index"
          @click="getStatus(item.statusValue,index)"
          :class="{active:item.checked}"
        >{{item.statusName}}</span>
      </div>
      <div v-loading="loading">
        <div class="act_list clearfix" v-for="(item, index) in pageList" :key="index">
          <div>
          <img :src="$url + item.imgPath" alt width="270px" height="180px" class="fll" @click="toActivityDetailPage(item.id)">
          <div class="fll list">
            <p class="list-title" @click="toActivityDetailPage(item.id)">{{item.title}}</p>
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
              活动时间：{{item.startTimeStr}} 至 {{item.endTimeStr}}
            </p> -->
            <p class="list-content2">
              <i class="time"></i>
              报名时间：{{item.regStartTimeStr}} 至 {{item.regEndTimeStr}}
            </p>
          </div>
          </div>
          <div class="flr">
            <span :class="item.status == 1 ? 'apply' : 'over'">{{item.statusStr}}</span>
             <!-- @click="apply(item.status,item.id)" -->
            <button  v-if="item.status == 1" class="applyBtn" @click="act_show(item.id)">我要报名</button>
            <button v-else-if="item.status == 0" class="overBtn">活动预告</button>
            <button v-else-if="item.status == -1" class="overBtn">往期回顾</button>
          </div>
        </div>
      </div>
      <div class="load_more" @click="morePage" v-show="more">加载更多...</div>
      <p style="color:#999;"  v-show="noMore">-------------------------------------------------没有更多活动了----------------------------------------------------</p>
    </div>
    <div class="w360 flr mes_list clearfix">
      <img src="/static/img/list-2.jpg" alt class="act_timelist">
      <p class="mes">热门资讯
        <span class="mes_more flr" @click="toMessagePage">更多></span>
      </p>
      <ul class="mes_title" v-loading="newsloading">
          <li v-for="(item,index) in mesData" :key="index" class="mes_content" @click="toMessageDetailPage(item.id)">
              <span class="cl-0">{{item.title}}</span>
          </li>
      </ul>
      <img src="/static/img/bg-3.jpg" alt="" width="360px" height="350px" style="margin-bottom:75px">
    </div>
    <el-dialog title="报名信息" :visible.sync="showApply" width="30%" @before_close='before_close'>
      <div v-if="sub_act">
      <el-form :model="appleform" ref="appleform" :rules="rule">
        <el-form-item label="姓名：" prop="memberName">
          <el-input v-model="appleform.memberName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="memberMobile">
          <el-input v-model="appleform.memberMobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="appleform.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="applyBtn" @click="sub_apply('appleform')">确认报名</el-button>
        <el-button class="cancle" @click="showApply = false">取 消</el-button>
      </span>
    </div>
    <div v-else>
      <div class="toast_success" v-if="success"></div>
      <div class="toast_error" v-else></div>
      <div v-if="success" class="toast_title">成功</div>
      <div v-else class="toast_title">失败</div>
      <p class="toast_content">{{hint}}</p>
    </div>
    </el-dialog>

    <el-dialog :visible.sync="toast_show" width="30%" center>
      <div class="toast_success" v-if="success"></div>
      <div class="toast_error" v-else></div>
      <div v-if="success" class="toast_title">成功</div>
      <div v-else class="toast_title">失败</div>
      <p class="toast_content">{{hint}}</p>
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
      appleform: {
        memberName: "",
        memberMobile: "",
        remark: ""
      },
      should_login: false,
      categoryList: [],
      // statusList: ["报名中", "未开始", "已结束", "往期活动", "筛选"],
      statusList: [],
      pageList: [
        // {
        //   img: "/static/img/list-1.jpg",
        //   title: "投融资讯活动",
        //   local: "北京市海淀区天秀路10号中国农大国际科技园",
        //   speaker: "北京开拓明天科技股份有限公司",
        //   num: 255,
        //   beginTime: "2017-06-10",
        //   endTime: "2018-10-12",
        //   status: 1
        // },
        // {
        //   img: "/static/img/list-1.jpg",
        //   title: "投融资讯活动",
        //   local: "北京市海淀区天秀路10号中国农大国际科技园",
        //   speaker: "北京开拓明天科技股份有限公司",
        //   num: 255,
        //   beginTime: "2017-06-10",
        //   endTime: "2018-10-12",
        //   status: 0
        // },
        // {
        //   img: "/static/img/list-1.jpg",
        //   title: "投融资讯活动",
        //   local: "北京市海淀区天秀路10号中国农大国际科技园",
        //   speaker: "北京开拓明天科技股份有限公司",
        //   num: 255,
        //   beginTime: "2017-06-10",
        //   endTime: "2018-10-12",
        //   status: 0
        // },
        // {
        //   img: "/static/img/list-1.jpg",
        //   title: "投融资讯活动",
        //   local: "北京市海淀区天秀路10号中国农大国际科技园",
        //   speaker: "北京开拓明天科技股份有限公司",
        //   num: 255,
        //   beginTime: "2017-06-10",
        //   endTime: "2018-10-12",
        //   status: 0
        // },
        // {
        //   img: "/static/img/list-1.jpg",
        //   title: "投融资讯活动",
        //   local: "北京市海淀区天秀路10号中国农大国际科技园",
        //   speaker: "北京开拓明天科技股份有限公司",
        //   num: 255,
        //   beginTime: "2017-06-10",
        //   endTime: "2018-10-12",
        //   status: 1
        // },
        // {
        //   img: "/static/img/list-1.jpg",
        //   title: "投融资讯活动",
        //   local: "北京市海淀区天秀路10号中国农大国际科技园",
        //   speaker: "北京开拓明天科技股份有限公司",
        //   num: 255,
        //   beginTime: "2017-06-10",
        //   endTime: "2018-10-12",
        //   status: 0
        // },
        // {
        //   img: "/static/img/list-1.jpg",
        //   title: "投融资讯活动",
        //   local: "北京市海淀区天秀路10号中国农大国际科技园",
        //   speaker: "北京开拓明天科技股份有限公司",
        //   num: 255,
        //   beginTime: "2017-06-10",
        //   endTime: "2018-10-12",
        //   status: 1
        // },
      ],
      mesData: [
        {
          content:'“ofo小黄车退了么”成为了关注焦点；中移动受让中国民航信息5.01%股权'
        },
        {
          content:'“ofo小黄车退了么”成为了关注焦点；中移动受让中国民航信息5.01%股权'
        },
        {
          content:'“ofo小黄车退了么”成为了关注焦点；中移动受让中国民航信息5.01%股权'
        },
        {
          content:'“ofo小黄车退了么”成为了关注焦点；中移动受让中国民航信息5.01%股权'
        },
        {
          content:'“ofo小黄车退了么”成为了关注焦点；中移动受让中国民航信息5.01%股权'
        },
        {
          content:'“ofo小黄车退了么”成为了关注焦点；中移动受让中国民航信息5.01%股权'
        },
      ],
      loading:false,
      newsloading:false,
      category:'',
      status:'',
      pn:1,
      totalCount:0,
      more:false,
      noMore:false,
      hint:'',
      success:false,
      toast_show:false,
      sub_act:true,
      showApply:false,
      activityId:'',
      rule:{
        memberName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, message: "长度不少于1个字", trigger: "blur" }
        ],
        memberMobile: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          },
          {
            validator: function(rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
      }
    };
  },
  methods: {
    getTypeData(){
      this.$axios.get('/jsp/wap/trActivity/ctrl/jsonCategoryList.jsp').then(res => {
        if(res.success == "true"){
          let categoryList = res.data.categoryList
          categoryList.forEach(item => {
            this.$set(item, 'checked', false)
          });
          this.categoryList = categoryList
          let statusList = res.data.statusList
          statusList.forEach(item => {
            this.$set(item, 'checked', false)
          });
          this.statusList = statusList
        }
      })
    },
    getActData(category,status){
      this.loading = true
      this.$axios.get('/jsp/wap/trActivity/ctrl/jsonActivityPage.jsp',{params:{categorys:category,statuss:status}}).then(res => {
        if(res.success == "true"){
          this.pageList = res.data.pageList
          this.totalCount = res.data.pagination.totalCount;
          if(this.totalCount > this.pageList.length) {
              this.more = true
              this.noMore = false
            } else {
              this.more = false
              this.noMore = true
            }
          this.pn = 1
          this.loading = false
        }
      })
    },
    getType(e,index) {
      this.category = e
      if(this.categoryList[index].checked){
        this.categoryList[index].checked = !this.categoryList[index].checked
        this.category = ''
      } else {
          this.categoryList.forEach(item => {
              item.checked = false
        });
        this.categoryList[index].checked = true
      }
      this.getActData(this.category,this.status)
    },
    getStatus(e,index) {
      this.status = e
      if(this.statusList[index].checked){
        this.statusList[index].checked = !this.statusList[index].checked
        this.status = ''
      } else {
          this.statusList.forEach(item => {
              item.checked = false
        });
        this.statusList[index].checked = true
      }
      this.getActData(this.category,this.status)
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
    apply(e,id) {
      if(e == 0){
        this.$notify.error({
          title: "错误",
          message: "活动尚未开始"
        });
      } else if (e == 1) {
      this.$router.push({name:'activityDetail',query:{id}})
      } else if (e == 3){
        this.$notify.error({
          title: "错误",
          message: "活动已结束"
        });
      }
    },
    morePage(){
      this.pn += 1
      this.loading = true
      this.$axios.get('/jsp/wap/trActivity/ctrl/jsonActivityPage.jsp',{params:{categorys:this.category,statuss:this.status,pageNumber:this.pn}}).then(res => {
        if(res.success == "true"){
          this.pageList = [...this.pageList,...res.data.pageList] 
          this.totalCount = res.data.pagination.totalCount;
          if(this.totalCount > this.pageList.length) {
              this.more = true
              this.noMore = false
            } else {
              this.more = false
              this.noMore = true
            }
          this.loading = false
        }
      })
    },
    toActivityDetailPage(id){
      let {href} = this.$router.resolve({
          name: "activityDetail",
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
    sub_apply(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        this.$axios
        .get("/jsp/wap/trActivity/do/doSignUp.jsp", {
          params: {
            activityId: this.activityId,
            memberName: this.appleform.memberName,
            memberMobile: this.appleform.memberName,
            remark: this.appleform.remark
          }
        })
        .then(res => {
          if(res.success == 'true'){
            this.success = true
            this.hint = '报名成功！当前已有' + res.data + '人报名参加'
            this.sub_act = false;
          } else {
            this.success = false
            this.hint = res.message
            this.sub_act = false;
          }
        });
          } else {
            return false;
          }
        });
      
      // this.showApply = false
    },
    act_show(id){
      if(Cookies.get('userKey')) {
        this.showApply = true
        this.activityId = id
      } else {
        // this.success = false;
        // this.hint = '登录后才能报名哦';
        // this.toast_show = true;
        this.should_login = true
      }
    },
    before_close(){
        this.showApply = false;
        setTimeout(()=> {
         this.sub_act = true;
        },1000)
    },
  },
  created(){
    this.getTypeData()
    this.getActData(this.category,this.status)
    this.getNewsList()
  }
};
</script>

<style scoped lang="scss">
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
}
//活动列表
.act_list {
  cursor: pointer;
  width: 810px;
  height: 180px;
  margin-bottom: 20px;
}
.list {
  margin-left: 20px;
}
.list-title {
  font-size: 20px;
  font-family: "Microsoft YaHei";
  color: rgb(51, 51, 51);
  margin: 10px 0 25px;
}
.list-title:hover {
  color:#005385;
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
//加载更多
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
}
//活动排表
.act_timelist {
  margin: 20px 0;
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
  cursor: pointer;
  padding: 20px 0;
  border-bottom:1px dashed #d9d9d9;
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
.active {
  color: #005982;
  font-weight: 700;  
}
</style>