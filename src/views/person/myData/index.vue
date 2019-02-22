<template>
  <div class="fll">
    <div class="person_content">
      <p class="project_title">
        <span class="project_">基本信息</span>
      </p>
      <el-form ref="ruleForm" :model="formData" label-width="80px" :rules="rules">
        <!-- <el-form-item label="认证状态" class="w180">
          <el-input v-model="formData.authenticationName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="账号" class="w180">
          <el-input v-model="formData.userName" :disabled="true"></el-input>
        </el-form-item> -->
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action
            :http-request="uploadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="formData.headImgPath" :src="formData.headImgPath" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="真实姓名" class="w180" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="真实照片">
          <el-upload
            class="avatar-uploader"
            action
            :http-request="uploadphotoImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="formData.photoImgPath" :src="formData.photoImgPath" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="身份证号" style="width:320px;" prop="IDcard">
          <el-input v-model="formData.IDcard"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="formData.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <select name="year" id="year" v-model="year"></select>年
          <select name="month" id="month" v-model="month"></select>月
          <select name="day" id="day" v-model="day"></select>日
        </el-form-item>
        <el-form-item label="公司名称" class="w320" prop="company">
          <el-input v-model="formData.company"></el-input>
        </el-form-item>
        <el-form-item label="职位" class="w320" prop="job">
          <el-input v-model="formData.job"></el-input>
        </el-form-item>
        <el-form-item label="所属行业" class="w320" prop="industrys">
          <el-select v-model="formData.industrys" placeholder="请选择">
            <el-option
              v-for="item in industryList"
              :key="item.dataValue"
              :label="item.dataName"
              :value="item.dataValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在地区" required>
          <v-distpicker
            :province="provinceStr"
            :city="cityStr"
            :area="countyStr"
            @selected="selected"
          ></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" style="width:600px">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="formData.address"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" class="w320" prop="mobile">
          <el-input v-model="formData.mobile"></el-input>
        </el-form-item>
        <el-form-item label="常用QQ" class="w320">
          <el-input v-model="formData.qq"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" class="w320" prop="email">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="subBtn" @click="submitForm('ruleForm')">提交</div>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog :visible.sync="toast_show" width="30%" center>
      <div class="toast_success" v-if="success"></div>
      <div class="toast_error" v-else></div>
      <!-- <div v-if="success" class="toast_title">成功</div> -->
      <!-- <div v-else class="toast_content">失败</div> -->
      <p class="toast_title">{{hint}}</p>
    </el-dialog>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";

export default {
  components: { VDistpicker },
  data() {
    return {
      year: "2019",
      month: "1",
      day: "11",
      countyStr: "昌平区",
      provinceStr: "北京市",
      cityStr: "北京城区",
      formData: {
        authenticationName: "",
        mobile: "",
        name: "李先生",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        sex: "2",
        desc: "",
        headImgPath: "",
        photoImgPath: "",
        IDcard: "",
        company: "",
        address: "",
        userName: "",
        qq: "",
        email: "",
        provinceId: "110000",
        cityId: "110100",
        countyId: "110114",
        isVip:"0",
        birthdayTimeStr: "",
        job:'',
        industrys:''
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, message: "长度不少于1个字", trigger: "blur" }
        ],
        IDcard: [
          {
            required: true,
            message: "请输入身份证ID",
            trigger: "blur"
          },
          {
            pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
            message: "你的身份证格式不正确"
          }
        ],
        company:[
          {
            required: true,
            message: "请输入公司名称",
            trigger: "blur"
          },
        ],
        job:[
          {
            required: true,
            message: "请输入职位",
            trigger: "blur"
          },
        ],
        industrys:[
          {
            required: true,
            message: "请选择行业",
            trigger: "blur"
          },
        ],
        mobile: [
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
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      },
      industryList:[],
      toast_show: false,
      success: true,
      hint: "",
    };
  },
  methods: {
    getDate() {
      this.$axios.get("/jsp/wap/center/ctrl/jsonUserInfo.jsp").then(res => {
        this.$store.commit("CHANGE_USERINFO", res.data.userInfo);
        this.industryList = res.data.industryList
        this.formData.userName = this.$store.state.userinfo.userName;
        this.formData.name = this.$store.state.userinfo.name;
        this.formData.headImgPath = this.$store.state.userinfo.headImgPath;
        this.formData.photoImgPath = this.$store.state.userinfo.photoImgPath;
        this.formData.authenticationName = this.$store.state.userinfo.authenticationName;
        this.formData.email = this.$store.state.userinfo.email;
        if (this.$store.state.userinfo.provinceStr != "") {
          this.provinceStr = this.$store.state.userinfo.provinceStr;
          if (
            this.provinceStr == "北京市" &&
            this.$store.state.userinfo.cityStr == "市辖区"
          ) {
            this.cityStr = "北京城区";
          } else if (
            this.provinceStr == "天津市" &&
            this.$store.state.userinfo.cityStr == "市辖区"
          ) {
            this.cityStr = "天津城区";
          } else if (
            this.provinceStr == "上海市" &&
            this.$store.state.userinfo.cityStr == "市辖区"
          ) {
            this.cityStr = "上海城区";
          } else if (
            this.provinceStr == "重庆市" &&
            this.$store.state.userinfo.cityStr == "市辖区"
          ) {
            this.cityStr = "重庆城区";
          } else {
            this.cityStr = this.$store.state.userinfo.cityStr;
          }
          this.countyStr = this.$store.state.userinfo.countyStr;
        }
        this.formData.sex = this.$store.state.userinfo.sex;
        if (this.$store.state.userinfo.birthdayTimeStr != "") {
          this.formData.birthdayTimeStr = this.$store.state.userinfo.birthdayTimeStr;
          this.year = this.formData.birthdayTimeStr.split("-")[0];
          this.month = ~~this.formData.birthdayTimeStr.split("-")[1];
          this.day = ~~this.formData.birthdayTimeStr.split("-")[2];
        }
        this.formData.mobile = this.$store.state.userinfo.mobile;
        this.formData.IDcard = this.$store.state.userinfo.identity;
        this.formData.qq = this.$store.state.userinfo.qq;
        this.formData.address = this.$store.state.userinfo.address;
        this.formData.company = this.$store.state.userinfo.company;
        this.formData.job = this.$store.state.userinfo.job
        if (this.$store.state.userinfo.industry != "") {
            this.formData.industrys = this.$store.state.userinfo.industry.replace(/[\[\]]/g, "");
          }
      });
    },
    uploadImg(f) {
      let param = new FormData(); //创建form对象
      param.append("file", f.file); //通过append向form对象添加数据
      let config = {
        headers: { "content-type": "multipart/form-data" }
      }; //添加请求头
      this.$axios
        .post("/component/trUpload2/uploadify", param, config)
        .then(res => {
          this.formData.headImgPath = res.data.relativePath;
        });
    },
    uploadphotoImg(f) {
      let param = new FormData(); //创建form对象
      param.append("file", f.file); //通过append向form对象添加数据
      let config = {
        headers: { "content-type": "multipart/form-data" }
      }; //添加请求头
      this.$axios
        .post("/component/trUpload2/uploadify", param, config)
        .then(res => {
          this.formData.photoImgPath = res.data.relativePath;
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var month = this.month < 10 ? "0" + this.month : "" + this.month;
          var day = this.day < 10 ? "0" + this.day : "" + this.day;
          var birthdayTime = [this.year, month, day];
          var birthdayTimeStr = birthdayTime.join("-");
          this.$axios
            .get("/jsp/wap/center/do/doEditUser.jsp", {
              params: {
                headImgPath: this.formData.headImgPath,
                name: this.formData.name,
                photoImgPath: this.formData.photoImgPath,
                sex: this.formData.sex,
                birthdayTimeStr: birthdayTimeStr,
                company: this.formData.company,
                address: this.formData.address,
                mobile: this.formData.mobile,
                qq: this.formData.qq,
                email: this.formData.email,
                provinceId: this.formData.provinceId,
                cityId: this.formData.cityId,
                countyId: this.formData.countyId,
                identity: this.formData.IDcard,
                job: this.formData.job,
                industrys: this.formData.industrys
              }
            })
            .then(res => {
              if (res.success == "true") {
                this.success = true;
                this.hint = "信息上传成功";
                this.toast_show = true;
                setTimeout(()=> {
                  this.$router.push({name:'personCenter'})
                },1000)
              } else {
                this.success = false;
                this.hint = res.message;
                this.toast_show = true;
              }
            });
        } else {
          this.$message.error("信息填入错误或不全");
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    selected(e) {
      this.formData.provinceId = e.province.code;
      this.formData.cityId = e.city.code;
      this.formData.countyId = e.area.code;
    },
    //出生日期选择器
    doyear() {
      var select = document.getElementById("year");
      var thisYear = new Date().getFullYear();
      for (var i = 1950; i <= thisYear; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.innerText = i;
        select.appendChild(option);
      }
    },
    domoth() {
      var select = document.getElementById("month");
      for (var i = 1; i <= 12; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.innerText = i;
        select.appendChild(option);
      }
    },
    doday() {
      var select = document.getElementById("day");
      var selectYear = parseInt(year.options[year.selectedIndex].value,10);
      var selectMonth = parseInt(month.options[month.selectedIndex].value,10);
      var date = new Date(selectYear, selectMonth, 0);

      for (var i = 1; i <= date.getDate(); i++) {
        var option = document.createElement("option");
        option.value = i;
        option.innerText = i;
        select.appendChild(option);
      }
    },
    deleteOldChildNodes() {
      var day = document.getElementById("day");
      var node = day.firstChild;
      var tmpNode;
      while (node != day.lastChild) {
        tmpNode = node.nextSibling;
        day.removeChild(node);
        node = tmpNode;
      }
      day.removeChild(day.lastChild);
    },
    pageInit() {
      this.doyear();
      this.domoth();
      this.doday();
      var that = this;
      year.onchange = function() {
        that.deleteOldChildNodes();
        that.doday();
      };
      month.onchange = function() {
        that.deleteOldChildNodes();
        that.doday();
      };
    }
  },
  mounted() {
    this.pageInit();
  },
  created() {
    this.getDate();
  }
};
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

/deep/ {
  .is-disabled .el-input__inner {
    background: #fff !important;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px !important;
    cursor: pointer !important;
    position: relative !important;
    overflow: hidden !important;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff !important;
  }
  .avatar-uploader-icon {
    font-size: 28px !important;
    color: #8c939d !important;
    width: 120px !important;
    height: 120px !important;
    line-height: 120px !important;
    text-align: center !important;
  }
  .avatar {
    width: 120px !important;
    height: 120px !important;
    display: block !important;
  }
}

.w180 {
  width: 250px;
}
.w320 {
  width: 320px;
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
  border-radius: 6px;
}
</style>