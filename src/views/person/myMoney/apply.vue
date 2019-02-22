<template>
  <div class="fll">
    <div class="person_content">
      <img
        src="/static/img/VIP.png"
        alt
        width="924px"
        height="150px"
        style="cursor:pointer"
        @click="vip"
      >
      <p class="project_title">
        <span class="project_">发布资金信息</span>
      </p>
      <el-form ref="formData" :model="formData" label-width="150px" :rules="rules">
        <el-form-item label="投资主题" style="width:600px" class="is-required" prop="title">
          <el-input v-model="formData.title"></el-input>
          <span style="color:#999">格式参考：广东某企业5000万元起寻互联网项目合作</span>
        </el-form-item>
        <el-form-item label="所在地区" class="is-required">
          <v-distpicker
            :province="provinceStr"
            :city="cityStr"
            :area="countyStr"
            @selected="selected"
          ></v-distpicker>
        </el-form-item>
        <el-form-item label="联系地址" style="width:600px" class="is-required" prop="linkmanAddress">
          <el-input v-model="formData.linkmanAddress"></el-input>
        </el-form-item>
        <el-form-item label="资金主体">
          <el-radio-group v-model="formData.capitalBody">
            <el-radio
              v-for="capital in capitalBodyList"
              :key="capital.dataValue"
              :label="capital.dataValue"
            >{{capital.dataName}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系人姓名" class="w350 is-required" prop="linkmanName">
          <el-input v-model="formData.linkmanName"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" class="w350 is-required" prop="linkmanPhone">
          <el-input v-model="formData.linkmanPhone"></el-input>
        </el-form-item>
        <el-form-item label="投资地区" class="is-required">
          <v-distpicker
            :province="provinceStr1"
            :city="cityStr1"
            :area="countyStr1"
            @selected="selected1"
          ></v-distpicker>
        </el-form-item>
        <el-form-item label="投资金额" class="is-required" prop="investAmount">
          <el-select v-model="formData.investAmount" placeholder="请选择">
            <el-option
              v-for="item in investAmountList"
              :key="item.dataValue"
              :label="item.dataName"
              :value="item.dataValue"
            >{{item.dataName}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投资行业" class="is-required" prop="investIndustrys">
          <el-checkbox-group v-model="investIndustrys">
            <el-checkbox
              v-for="industry in investIndustryList"
              :label="industry.dataValue"
              :key="industry.dataValue"
              name="type"
            >{{industry.dataName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="投资阶段" class="is-required" prop="investStages">
          <el-checkbox-group v-model="investStages">
            <el-checkbox
              v-for="investStage in investStageList"
              :label="investStage.dataValue"
              :key="investStage.dataValue"
              name="type"
            >{{investStage.dataName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="资金来源">
          <el-checkbox-group v-model="capitalSources">
            <el-checkbox
              v-for="capitalSource in capitalSourceList"
              :label="capitalSource.dataValue"
              :key="capitalSource.dataValue"
              name="type"
            >{{capitalSource.dataName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="投资类型" class="is-required" prop="investTypes">
          <el-checkbox-group v-model="investTypes">
            <el-checkbox
              v-for="investType in investTypeList"
              :label="investType.dataValue"
              :key="investType.dataValue"
              name="type"
            >{{investType.dataName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="前期费用">
          <el-radio-group v-model="formData.upfrontCost">
            <el-radio
              v-for="upfrontCost in upfrontCostList"
              :key="upfrontCost.dataValue"
              :label="upfrontCost.dataValue"
            >{{upfrontCost.dataName}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="最低回报要求" style="width:600px">
          <el-input v-model="formData.minRepay"></el-input>
        </el-form-item>
        <el-form-item label="有效期限" class="is-required" prop="validStartTimeStr">
          <div style="width:28.16667%" class="fll">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="formData.validStartTimeStr"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <el-col class="line" :span="1" style="text-align:center;">~</el-col>
          <el-col :span="7">
            <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="formData.validEndTimeStr"></el-date-picker>
          </el-col>
          <el-col :span="1" style="text-align:center;">年</el-col>
        </el-form-item>
        <el-form-item label="风控要求">
          <el-checkbox-group v-model="riskControls">
            <el-checkbox
              v-for="riskControl in riskControlList"
              :label="riskControl.dataValue"
              :key="riskControl.dataValue"
              name="type"
            >{{riskControl.dataName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="材料要求">
          <el-checkbox-group v-model="datums">
            <el-checkbox
              v-for="datum in datumList"
              :label="datum.dataValue"
              :key="datum.dataValue"
              name="type"
            >{{datum.dataName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="抵押物类型">
          <el-checkbox-group v-model="pawnTypes">
            <el-checkbox
              v-for="pawnType in pawnTypeList"
              :label="pawnType.dataValue"
              :key="pawnType.dataValue"
              name="type"
            >{{pawnType.dataName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="抵押物折扣率" prop="pawnDiscountRateMin" class="is-required">
          <div style="width:28.16667%" class="fll">
            <el-input v-model="formData.pawnDiscountRateMin"></el-input>
          </div>
          <el-col class="line" :span="1" style="text-align:center;">~</el-col>
          <el-col :span="7">
            <el-input v-model="formData.pawnDiscountRateMax"></el-input>
          </el-col>
          <el-col :span="1" style="text-align:center;">折</el-col>
        </el-form-item>
        <el-form-item label="投资要求概述" style="width:600px">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="formData.investRequire"></el-input>
        </el-form-item>
        <el-form-item label="投资案例" style="width:600px">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="formData.investCase"></el-input>
        </el-form-item>
        <el-form-item label="其他说明" style="width:600px">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="formData.otherExplain"></el-input>
        </el-form-item>
        <p>
          <span class="item_title">附件上传</span>
        </p>
        <el-form-item label="附件材料" prop="file" style="width:600px">
          <div>商业计划书、融资计划书等文件请在此上传</div>
          <el-upload class="upload-demo" action :http-request="uploadFlie" :file-list="fileList">
            <div class="likeBtn fll">
              <i></i>点击上传文件
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <div class="subBtn" @click="onSave('formData')" style="margin-right:20px;">保存</div>
          <div class="subBtn" @click="onSubmit(5,'formData')">提交</div>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      :visible.sync="toast_show"
      width="30%"
      center>
      <div class="toast_success" v-if="success"></div>
      <div class="toast_error" v-else></div>
      <div v-if="success" class="toast_title">成功</div>
      <div v-else class="toast_title">失败</div>
      <p class="toast_content">{{hint}}</p>
    </el-dialog>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
import qs from "qs";

export default {
  components: { VDistpicker },
  data() {
    var checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      } else {
        callback()
      }
      var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
      if (!re.test(value)) {
        callback(new Error("请输入数字值"));
      } else {
        callback()
      }
    };
    var has_value = (rule, value, callback) => {
      if(!value){
        return callback(new Error("不能为空"))
      } else {
        callback()
      }
    }
    return {
      templateData: "<p>lalala</p>",
      rules: {
        title: [{ validator: has_value, trigger: "blur" }],
        linkmanAddress: [{ validator: has_value, trigger: "blur" }],
        investAmount: [{trigger: 'change'}],
        investIndustrys: [{  trigger: 'change' }],
        investStages: [{  trigger: 'change' }],
        investTypes: [{  trigger: 'change' }],
        validStartTimeStr: [{  trigger: 'change' }],
        linkmanName: [{ validator: has_value, trigger: "blur" }],
        minRepay: [
          { 
            validator: function(rule, value, callback) {
              var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
              if (!re.test(value)) {
                callback(new Error("请输入数字值"));
              } else {
                callback()
              }
          },
            trigger: "blur"  
          }    
        ],
        pawnDiscountRateMin: [{ validator: checkNumber, trigger: "blur" }],
        linkmanPhone: [
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
      },
      formData: {
        title: "",
        linkmanPhone: "",
        linkmanName: "",
        upfrontCost: "",
        linkmanAddress: "",
        regionProvinceId: "110000",
        regionCityId: "110100",
        regionCountyId: "110114",
        investRegionProvinceId: "110000",
        investRegionCityId: "110100",
        investRegionCountyId: "110114",
        investAmount: "",
        minRepay: "",
        validStartTimeStr: "",
        validEndTimeStr: "",
        pawnDiscountRateMin: "",
        pawnDiscountRateMax: "",
        investRequire: "",
        investCase: "",
        otherExplain: "",
        capitalBody: ""
      },
      fileList: [],
      value: "",
      countyStr: "昌平区",
      provinceStr: "北京市",
      cityStr: "北京城区",
      countyStr1: "昌平区",
      provinceStr1: "北京市",
      cityStr1: "北京城区",
      capitalBodyList: [],
      investAmountList: [],
      investIndustryList: [],
      investIndustrys: [],
      investStageList: [],
      investStages: [],
      capitalSourceList: [],
      capitalSources: [],
      investTypeList: [],
      investTypes: [],
      upfrontCostList: [],
      riskControlList: [],
      riskControls: [],
      datumList: [],
      datums: [],
      pawnTypeList: [],
      pawnTypes: [],
      fileNames: [],
      filePaths: [],
      hint:"",
      success:false,
      toast_show:false,
    };
  },
  methods: {
    onSave(formName) {
      this.onSubmit(0,formName);
    },
    onSubmit(status,formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(status == 0){
            this.$confirm("即将保存资金, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            var fileNames = this.fileNames.join(";=;");
            var filePaths = this.filePaths.join(",");
            var investStages = this.investStages.join(",");
            var investIndustrys = this.investIndustrys.join(",");
            var capitalSources = this.capitalSources.join(",");
            var investTypes = this.investTypes.join(",");
            var riskControls = this.riskControls.join(",");
            var pawnTypes = this.pawnTypes.join(",");
            var datums = this.datums.join(",");
            var id = this.$route.query.id;
            if (id != "") {
              var params = {
                id,
                title: this.formData.title,
                linkmanPhone: this.formData.linkmanPhone,
                linkmanName: this.formData.linkmanName,
                upfrontCost: this.formData.upfrontCost,
                linkmanAddress: this.formData.linkmanAddress,
                regionProvinceId: this.formData.regionProvinceId,
                regionCityId: this.formData.regionCityId,
                regionCountyId: this.formData.regionCountyId,
                investRegionProvinceId: this.formData.investRegionProvinceId,
                investRegionCityId: this.formData.investRegionCityId,
                investRegionCountyId: this.formData.investRegionCountyId,
                investAmount: this.formData.investAmount,
                minRepay: this.formData.minRepay,
                validStartTimeStr: this.formData.validStartTimeStr,
                validEndTimeStr: this.formData.validEndTimeStr,
                pawnDiscountRateMin: this.formData.pawnDiscountRateMin,
                pawnDiscountRateMax: this.formData.pawnDiscountRateMax,
                investRequire: this.formData.investRequire,
                investCase: this.formData.investCase,
                otherExplain: this.formData.otherExplain,
                capitalBody: this.formData.capitalBody,
                fileNames,
                filePaths,
                investStages,
                investIndustrys,
                capitalSources,
                investTypes,
                riskControls,
                pawnTypes,
                datums,
                status,
              };
            } else {
              var params = {
                title: this.formData.title,
                linkmanPhone: this.formData.linkmanPhone,
                linkmanName: this.formData.linkmanName,
                upfrontCost: this.formData.upfrontCost,
                linkmanAddress: this.formData.linkmanAddress,
                regionProvinceId: this.formData.regionProvinceId,
                regionCityId: this.formData.regionCityId,
                regionCountyId: this.formData.regionCountyId,
                investRegionProvinceId: this.formData.investRegionProvinceId,
                investRegionCityId: this.formData.investRegionCityId,
                investRegionCountyId: this.formData.investRegionCountyId,
                investAmount: this.formData.investAmount,
                minRepay: this.formData.minRepay,
                validStartTimeStr: this.formData.validStartTimeStr,
                validEndTimeStr: this.formData.validEndTimeStr,
                pawnDiscountRateMin: this.formData.pawnDiscountRateMin,
                pawnDiscountRateMax: this.formData.pawnDiscountRateMax,
                investRequire: this.formData.investRequire,
                investCase: this.formData.investCase,
                otherExplain: this.formData.otherExplain,
                capitalBody: this.formData.capitalBody,
                fileNames,
                filePaths,
                investStages,
                investIndustrys,
                capitalSources,
                investTypes,
                riskControls,
                pawnTypes,
                datums,
                status,
              };
            }
            this.$axios
              .post(
                "/jsp/wap/center/do/doEditCapital.jsp",
                qs.stringify(params)
              )
              .then(res => {
                if (res.success == "true") {
                  if(status == 0){
                    this.success = true;
                    this.hint = "保存资金成功";
                    this.toast_show = true;
                    setTimeout(()=> {
                      this.$router.push("/person/myMoney");
                    },1000)
                  } else {
                    this.success = true;
                    this.hint = "上传资金成功";
                    this.toast_show = true;
                    setTimeout(()=> {
                      this.$router.push("/person/myMoney");
                    },1000)
                  }
                } else {
                  this.success = false;
                  this.hint = "提交失败，请检查网络或重试";
                  this.toast_show = true;
                }
              });
          });
          } else {
            this.$confirm("即将提交资金, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            var fileNames = this.fileNames.join(";=;");
            var filePaths = this.filePaths.join(",");
            var investStages = this.investStages.join(",");
            var investIndustrys = this.investIndustrys.join(",");
            var capitalSources = this.capitalSources.join(",");
            var investTypes = this.investTypes.join(",");
            var riskControls = this.riskControls.join(",");
            var pawnTypes = this.pawnTypes.join(",");
            var datums = this.datums.join(",");
            var id = this.$route.query.id;
            if (id != "") {
              var params = {
                id,
                title: this.formData.title,
                linkmanPhone: this.formData.linkmanPhone,
                linkmanName: this.formData.linkmanName,
                upfrontCost: this.formData.upfrontCost,
                linkmanAddress: this.formData.linkmanAddress,
                regionProvinceId: this.formData.regionProvinceId,
                regionCityId: this.formData.regionCityId,
                regionCountyId: this.formData.regionCountyId,
                investRegionProvinceId: this.formData.investRegionProvinceId,
                investRegionCityId: this.formData.investRegionCityId,
                investRegionCountyId: this.formData.investRegionCountyId,
                investAmount: this.formData.investAmount,
                minRepay: this.formData.minRepay,
                validStartTimeStr: this.formData.validStartTimeStr,
                validEndTimeStr: this.formData.validEndTimeStr,
                pawnDiscountRateMin: this.formData.pawnDiscountRateMin,
                pawnDiscountRateMax: this.formData.pawnDiscountRateMax,
                investRequire: this.formData.investRequire,
                investCase: this.formData.investCase,
                otherExplain: this.formData.otherExplain,
                capitalBody: this.formData.capitalBody,
                fileNames,
                filePaths,
                investStages,
                investIndustrys,
                capitalSources,
                investTypes,
                riskControls,
                pawnTypes,
                datums,
                status,
              };
            } else {
              var params = {
                title: this.formData.title,
                linkmanPhone: this.formData.linkmanPhone,
                linkmanName: this.formData.linkmanName,
                upfrontCost: this.formData.upfrontCost,
                linkmanAddress: this.formData.linkmanAddress,
                regionProvinceId: this.formData.regionProvinceId,
                regionCityId: this.formData.regionCityId,
                regionCountyId: this.formData.regionCountyId,
                investRegionProvinceId: this.formData.investRegionProvinceId,
                investRegionCityId: this.formData.investRegionCityId,
                investRegionCountyId: this.formData.investRegionCountyId,
                investAmount: this.formData.investAmount,
                minRepay: this.formData.minRepay,
                validStartTimeStr: this.formData.validStartTimeStr,
                validEndTimeStr: this.formData.validEndTimeStr,
                pawnDiscountRateMin: this.formData.pawnDiscountRateMin,
                pawnDiscountRateMax: this.formData.pawnDiscountRateMax,
                investRequire: this.formData.investRequire,
                investCase: this.formData.investCase,
                otherExplain: this.formData.otherExplain,
                capitalBody: this.formData.capitalBody,
                fileNames,
                filePaths,
                investStages,
                investIndustrys,
                capitalSources,
                investTypes,
                riskControls,
                pawnTypes,
                datums,
                status,
              };
            }
            this.$axios
              .post(
                "/jsp/wap/center/do/doEditCapital.jsp",
                qs.stringify(params)
              )
              .then(res => {
                if (res.success == "true") {
                  if(status == 0){
                    this.success = true;
                    this.hint = "保存资金成功";
                    this.toast_show = true;
                    setTimeout(()=> {
                      this.$router.push("/person/myMoney");
                    },1000)
                  } else {
                    this.success = true;
                    this.hint = "上传资金成功";
                    this.toast_show = true;
                    setTimeout(()=> {
                      this.$router.push("/person/myMoney");
                    },1000)
                  }
                } else {
                  this.success = false;
                  this.hint = res.message;
                  this.toast_show = true;
                }
              });
          });
          }
        } else {
          console.log("error submit!!");
          this.$message.error('请完善信息')
          return false;
        }
      });
    },
    selected(e) {
      this.formData.regionProvinceId = e.province.code;
      this.formData.regionCityId = e.city.code;
      this.formData.regionCountyId = e.area.code;
    },
    selected1(e) {
      this.formData.investRegionProvinceId = e.province.code;
      this.formData.investRegionCityId = e.city.code;
      this.formData.investRegionCountyId = e.area.code;
    },
    getData(id) {
      this.$axios
        .get(`/jsp/wap/center/ctrl/jsonCapitalDetail.jsp?id=${id}`)
        .then(res => {
          console.log(res);
          this.formData = res.data.capital;
          if (res.data.capital.investIndustryStr != ''){
            this.investIndustrys = res.data.capital.investIndustryStr.split(",");
          }
          if (res.data.capital.investStageStr != ''){
            this.investStages = res.data.capital.investStageStr.split(",");
          }
          if (res.data.capital.capitalSourceStr != ''){
            this.capitalSources = res.data.capital.capitalSourceStr.split(",");            
          }
          if (res.data.capital.investTypeStr != ''){
            this.investTypes = res.data.capital.investTypeStr.split(",");            
          }
          if (res.data.capital.riskControlStr != ''){
            this.riskControls = res.data.capital.riskControlStr.split(",");            
          }
          if (res.data.capital.datumStr != ''){
            this.datums = res.data.capital.datumStr.split(",");            
          }
          if (res.data.capital.pawnTypesStr != ''){
            this.pawnTypes = res.data.capital.pawnTypeStr.split(",");            
          }
          this.capitalBodyList = res.data.capitalBodyList;
          let capital = res.data.capital;
          if (capital.regionNameStr != "") {
            this.provinceStr = capital.regionNameStr.split(",")[0];
            var cityStr = capital.regionNameStr.split(",")[1];
            if (this.provinceStr == "北京市" && cityStr == "市辖区") {
              cityStr = "北京城区";
            } else if (this.provinceStr == "天津市" && cityStr == "市辖区") {
              this.cityStr = "天津城区";
            } else if (this.provinceStr == "上海市" && cityStr == "市辖区") {
              this.cityStr = "上海城区";
            } else if (this.provinceStr == "重庆市" && cityStr == "市辖区") {
              this.cityStr = "重庆城区";
            } else {
              this.cityStr = capital.regionNameStr.split(",")[1];
            }
            this.countyStr = capital.regionNameStr.split(",")[2];
          }
          if (capital.investRegionNameStr != "") {
            this.provinceStr1 = capital.investRegionNameStr.split(",")[0];
            var cityStr1 = capital.investRegionNameStr.split(",")[1];
            if (this.provinceStr1 == "北京市" && cityStr1 == "市辖区") {
              cityStr1 = "北京城区";
            } else if (this.provinceStr1 == "天津市" && cityStr1 == "市辖区") {
              this.cityStr1 = "天津城区";
            } else if (this.provinceStr1 == "上海市" && cityStr1 == "市辖区") {
              this.cityStr1 = "上海城区";
            } else if (this.provinceStr1 == "重庆市" && cityStr1 == "市辖区") {
              this.cityStr1 = "重庆城区";
            } else {
              this.cityStr1 = capital.investRegionNameStr.split(",")[1];
            }
            this.countyStr1 = capital.investRegionNameStr.split(",")[2];
          }
          this.investAmountList = res.data.investAmountList;
          this.investIndustryList = res.data.investIndustryList;
          this.investStageList = res.data.investStageList;
          this.capitalSourceList = res.data.capitalSourceList;
          this.investTypeList = res.data.investTypeList;
          this.upfrontCostList = res.data.upfrontCostList;
          this.riskControlList = res.data.riskControlList;
          this.datumList = res.data.datumList;
          this.pawnTypeList = res.data.pawnTypeList;
          var file = {};
          var fileList = [];
          var fileList = res.data.capital.fileList;
          if (fileList.length != 0) {
            fileList.forEach(item => {
              file.name = item.name;
              file.url = item.filePaths;
            });
            this.fileList.push(file);
          }
        });
    },
    uploadFlie(f) {
      let param = new FormData(); //创建form对象
      param.append("file", f.file); //通过append向form对象添加数据
      let config = {
        headers: { "content-type": "multipart/form-data" }
      }; //添加请求头
      this.$axios
        .post("/component/trUpload2/uploadify", param, config)
        .then(res => {
          if (res.success == true) {
            this.fileNames.push(res.data.originalName);
            this.filePaths.push(res.data.relativePath);
          } else {
            this.success = false;
            this.hint = "文件上传失败";
            this.toast_show = true;
          }
        });
    },
    vip() {
      if(this.$store.state.userinfo.isVip == '0'){
        this.$confirm('只有会员才能享受快速上传, 是否办理会员?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let {href} = this.$router.resolve({
                name: "member",
            });
          window.open(href, '_blank');
        }).catch(() => {

        });
      } else {
        this.$router.push({name:'uploadApplyMoney'})
      }
    }
  },
  created() {
    let id = this.$route.query.id;
    this.getData(id);
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

.item_title {
  font-size: 18px;
  font-family: "Microsoft YaHei";
  color: #3e3a39;
  font-weight: bold;
  line-height: 1.333;
  text-align: left;
  cursor: pointer;
}

.pro_template {
  display: inline-block;
  font-weight: 700;
  margin-left: 10px;
  cursor: pointer;
  background: gold;
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
.type_btn {
  width: 90px;
  height: 40px;
  color: #444;
  line-height: 1;
  display: inline-block;
  white-space: nowrap;
  cursor: pointer;
  background: #f5f5f5;
  border: none;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  margin-right: 10px;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  border-radius: 4px;
}

.active {
  background: url(/static/img/type_btn-1.png) no-repeat center;
  background-size: contain;
  color: #fff;
}
.w350 {
  width: 350px;
}
.likeBtn {
  width: 110px;
  height: 35px;
  color: #005982;
  line-height: 0.425;
  display: inline-block;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1.5px solid #005982;
  border-color: #005982;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  // margin-left: 15px;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  border-radius: 4px;
  position: relative;
  i {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url(/static/img/shangchuan-1.png) no-repeat center;
    background-size: contain;
    position: absolute;
    top: 7px;
    left: 4px;
  }
}

/deep/ {
  .el-radio {
    min-width: 80px!important;
    margin-left: 10px!important;
    margin-bottom: 10px!important;
  }
}
</style>