<template>
  <div class="fll">
    <div class="person_content">
      <img src="/static/img/VIP.png" alt width="924px" height="150px" style="cursor:pointer" @click="vip">
      <p class="project_title">
        <span class="project_">发布项目信息</span>
      </p>
      <p>
        <span class="item_title">项目基本信息</span>
        <!-- <el-tooltip class="item" effect="dark" placement="bottom">
          <div slot="content" v-html="templateData"></div>
          <span class="pro_template">参考模板</span>
        </el-tooltip>-->
      </p>
      <el-form ref="formData" :model="formData" label-width="150px" :rules="rules">
        <el-form-item label="项目名称" style="width:600px" class="is-required" prop="title">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="所属行业" class="is-required" prop="industrys">
          <el-checkbox-group v-model="industrys">
            <el-checkbox v-for="industry in industryList" :label="industry.dataValue" :key="industry.dataValue" name="type">{{industry.dataName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="项目简介" style="width:600px" class="is-required" prop="brief">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="formData.brief"></el-input>
        </el-form-item>
        <el-form-item label="所处阶段" prop="stage" v-model="formData.stage" class="is-required">
          <div v-for="(item , index) in stageList" :key="index" class="fll type_btn" :class="{'active':item.checked}" @click="get_type(index,item.dataValue)">{{item.dataName}}</div>
        </el-form-item>
        <el-form-item label="意向资金" class="is-required" prop="intentCapitals">
          <el-checkbox-group v-model="intentCapitals">
            <el-checkbox v-for="intentCapital in intentCapitalList" :label="intentCapital.dataValue" :key="intentCapital.dataValue" name="type">{{intentCapital.dataName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <p>
          <span class="item_title">融资主体信息</span>
        </p>
        <el-form-item label="融资主体" prop="financeBody" class="is-required">
          <el-radio-group v-model="formData.financeBody">
            <el-radio v-for="finance in financeBodyList" :key="finance.dataValue" :label="finance.dataValue">{{finance.dataName}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="formData.financeBody == 64" class="bg-f2">
          <el-form-item label="单位全称" style="width:600px" class="is-required" prop="companyName">
            <el-input v-model="formData.companyName"></el-input>
          </el-form-item>
          <el-form-item label="所在地区" required>
            <v-distpicker :province="provinceStr" :city="cityStr" :area="countyStr" @selected="selected"></v-distpicker>
          </el-form-item>
          <el-form-item label="详细地址" style="width:600px" class="is-required" prop="address">
            <el-input v-model="formData.address"></el-input>
          </el-form-item>
          <el-form-item label="注册资本" style="width:400px" prop="registeredCapitalFormat">
            <el-input v-model="formData.registeredCapitalFormat">
              <el-select slot="append" v-model="formData.registeredCapitalType" placeholder="请选择" style="width:80px;">
                <el-option v-for="item in unit" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <p style="margin-left:80px;font-weight:700;">股权结构
            <el-button @click="addSharehold" size="medium">新增股东</el-button>
          </p>
          <el-form-item label="股东" class="is-required" v-for="(shareholding, index) in formData.shareholdingList" :key="index">
            <el-col :span="8">
              <el-input v-model="shareholding.name"></el-input>
            </el-col>
            <el-col class="line" :span="2" style="margin-left:20px;color:#606266;">持股比例:</el-col>
            <el-col :span="8">
              <el-input v-model="shareholding.value"></el-input>
            </el-col>
            <el-col :span="3" style="margin-left:20px;">
              <el-button @click.prevent="removeSharehold(shareholding)">删除</el-button>
            </el-col>
            <!-- <el-upload class="upload-demo" action :http-request="uploadImg" :show-file-list="false">
            <el-button
              size="small"
              type="primary"
              class="fll"
              style="margin-bottom:10px;"
              :loading="loading"
            >上传股权架构图</el-button>
            <img
              v-if="formData.stockStructureImgPath"
              :src="formData.stockStructureImgPath"
              style="max-width:500px;"
            >
            </el-upload>-->
          </el-form-item>
          <el-form-item label="实际控制人" class="w180">
            <el-input v-model="formData.owner"></el-input>
          </el-form-item>
          <el-form-item label="主营业务" style="width:600px" class="is-required" prop="business">
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="formData.business"></el-input>
          </el-form-item>
          <el-form-item label="公司亮点" style="width:600px">
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="formData.brightSpot"></el-input>
          </el-form-item>
          <el-form-item label="行业地位" style="width:600px">
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="formData.position"></el-input>
          </el-form-item>
          <el-form-item label="去年营业收入" class="is-required">
            <el-col :span="8">
              <el-input v-model="formData.yearTurnoverFormat">
                <el-select slot="append" v-model="formData.yearTurnoverType" placeholder="请选择" style="width:80px;">
                  <el-option v-for="item in unit" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-input>
            </el-col>
            <el-col class="line" :span="2" style="margin-left:20px;color:#606266;">同比增长:</el-col>
            <el-col :span="8">
              <el-input v-model="formData.yearTurnoverGrowth "></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="去年净利润" class="is-required">
            <el-col :span="8">
              <el-input v-model="formData.yearNetProfitFormat">
                <el-select slot="append" v-model="formData.yearNetProfitType" placeholder="请选择" style="width:80px;">
                  <el-option v-for="item in unit" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-input>
            </el-col>
            <el-col class="line" :span="2" style="margin-left:20px;color:#606266;">同比增长:</el-col>
            <el-col :span="8">
              <el-input v-model="formData.yearNetProfitGrowth "></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="企业净资产" class="is-required">
            <el-col :span="8">
              <el-input v-model="formData.netAssetsFormat">
                <el-select slot="append" v-model="formData.netAssetsType" placeholder="请选择" style="width:80px;">
                  <el-option v-for="item in unit" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="近三年财务数据" style="width:600px">
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="formData.trienniumFinancialData"></el-input>
          </el-form-item>
          <el-form-item label="3-5年盈利预测" style="width:600px" class="is-required" prop="profitForecast">
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="formData.profitForecast"></el-input>
          </el-form-item>
          <el-form-item label="团队平均年龄" class="w350">
            <el-input v-model="formData.averageAge"></el-input>
          </el-form-item>
          <el-form-item label="企业网址" class="w350">
            <el-input v-model="formData.websiteUrl"></el-input>
          </el-form-item>
          <el-form-item label="官方微信" class="w350">
            <el-input v-model="formData.weChat"></el-input>
          </el-form-item>
          <el-form-item label="建企时间" class="w350 is-required" prop="companyFoundTimeStr">
            <el-date-picker value-format="yyyy-MM-dd" v-model="formData.companyFoundTimeStr" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </div>
        <div v-else-if="formData.financeBody == 65" class="bg-f2">
          <el-form-item label="真实姓名" style="width:600px" class="is-required" prop="companyName">
            <el-input v-model="formData.companyName"></el-input>
          </el-form-item>
          <el-form-item label="所在地区" required>
            <v-distpicker :province="provinceStr" :city="cityStr" :area="countyStr" @selected="selected"></v-distpicker>
          </el-form-item>
          <el-form-item label="详细地址" style="width:600px" class="is-required" prop="address">
            <el-input v-model="formData.address"></el-input>
          </el-form-item>
        </div>
        <div v-else-if="formData.financeBody == 66" class="bg-f2">
          <el-form-item label="单位全称" style="width:600px" class="is-required" prop="companyName">
            <el-input v-model="formData.companyName"></el-input>
          </el-form-item>
          <el-form-item label="所在地区" required>
            <v-distpicker :province="provinceStr" :city="cityStr" :area="countyStr" @selected="selected"></v-distpicker>
          </el-form-item>
          <el-form-item label="详细地址" style="width:600px" class="is-required" prop="address">
            <el-input v-model="formData.address"></el-input>
          </el-form-item>
        </div>
        <p>
          <span class="item_title">项目融资信息</span>
        </p>
        <!-- <el-form-item label="融资方式" class="is-required" prop="financingWay">
          <div v-for="(item , index) in financingWayList" :key="index" class="fll type_btn" :class="{'active':item.checked}" @click="get_type1(index,item.dataValue)">{{item.dataName}}</div>
        </el-form-item> -->
        <el-form-item label="融资方式" prop="financingWay" class="is-required">
          <el-radio-group v-model="formData.financingWay">
            <el-radio v-for="finances in financingWayList" :key="finances.dataValue" :label="finances.dataValue">{{finances.dataName}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="way">
          <div v-if="formData.financingWay == 'G'">
            <el-form-item label="融资金额" class="w320 is-required" prop="financingMoney">
              <el-select v-model="formData.financingMoney" placeholder="请选择">
                <el-option v-for="itemMoney in financingMoneyList" :key="itemMoney.dataValue" :label="itemMoney.dataName" :value="itemMoney.dataValue">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="公司估值" class="w350 is-required" prop="companyAssessed">
              <el-input v-model="formData.companyAssessed">
                <span slot="append">万元</span>
              </el-input>
            </el-form-item>
            <el-form-item label="市盈率（P/E）" class="w350 is-required" prop="pe">
              <el-input v-model="formData.pe">
                <!-- <span slot="append">万元</span> -->
              </el-input>
            </el-form-item>
            <el-form-item label="市净率（P/B）" class="w350 is-required" prop="pb">
              <el-input v-model="formData.pb">
                <!-- <span slot="append">万元</span> -->
              </el-input>
            </el-form-item>
            <el-form-item label="支付方式" class="“is-required”">
              <el-checkbox-group v-model="paymentTypes">
                <el-checkbox v-for="paymentType in paymentTypeList" :label="paymentType.dataValue" :key="paymentType.dataValue" name="type">{{paymentType.dataName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="有效期限" class="is-required">
              <div style="width:28.16667%" class="fll">
                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="formData.expiryDateStartTimeStr"></el-date-picker>
              </div>
              <el-col class="line" :span="1" style="text-align:center;">~</el-col>
              <el-col :span="7">
                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="formData.expiryDateEndTimeStr"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="保障措施" style="width:600px">
              <el-input type="textarea" :autosize="{ minRows: 4}" placeholder="请填写保障措施，例如业绩承诺、回购、上市承诺等" v-model="formData.safeguard"></el-input>
            </el-form-item>
            <el-form-item label="交易对手简介" style="width:600px">
              <el-input type="textarea" :autosize="{ minRows: 4}" v-model="formData.opponentBrief"></el-input>
            </el-form-item>
          </div>
          <div v-else-if="formData.financingWay == 'Z'">
            <el-form-item label="融资金额" class="w320 is-required" prop="financingMoney">
              <el-select v-model="formData.financingMoney" placeholder="请选择">
                <el-option v-for="itemMoney in financingMoneyList" :key="itemMoney.dataValue" :label="itemMoney.dataName" :value="itemMoney.dataValue">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="品种" class="is-required">
              <el-checkbox-group v-model="varietys">
                <el-checkbox v-for="variety in varietyList" :label="variety.dataValue" :key="variety.dataValue" name="type">{{variety.dataName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="期限" class="w350">
              <el-input v-model="formData.dueTime"></el-input>
            </el-form-item>
            <el-form-item label="利润" class="w350 is-required">
              <el-input v-model="formData.interestRates"></el-input>
            </el-form-item>
            <el-form-item label="增信方式" class="is-required">
              <el-checkbox-group v-model="creditWays">
                <el-checkbox v-for="creditWay in creditWayList" :label="creditWay.dataValue" :key="creditWay.dataValue" name="type">{{creditWay.dataName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="融资用途" style="width:600px" class="is-required">
              <el-input type="textarea" :autosize="{ minRows: 4}" v-model="formData.loanUses"></el-input>
            </el-form-item>
            <el-form-item label="还款来源" class="w350 is-required">
              <el-input v-model="formData.repaymentsSource"></el-input>
            </el-form-item>
            <el-form-item label="有效期限">
              <div style="width:28.16667%" class="fll">
                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="formData.expiryDateStartTimeStr"></el-date-picker>
              </div>
              <el-col class="line" :span="1" style="text-align:center;">~</el-col>
              <el-col :span="7">
                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="formData.expiryDateEndTimeStr"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="项目建设合规性" style="width:600px" class="is-required">
              <el-input type="textarea" :autosize="{ minRows: 4}" v-model="formData.standard"></el-input>
            </el-form-item>
            <el-form-item label="资金来源及落实情况" style="width:600px" class="is-required">
              <el-input type="textarea" :autosize="{ minRows: 4}" v-model="formData.sourcesFunds"></el-input>
            </el-form-item>
            <el-form-item label="项目产品及竞争能力分析" style="width:600px" class="is-required">
              <el-input type="textarea" :autosize="{ minRows: 2}" v-model="formData.marketCompetitivePower"></el-input>
            </el-form-item>
            <el-form-item label="项目效益测算及偿债能力分析" style="width:600px" class="is-required">
              <el-input type="textarea" :autosize="{ minRows: 4}" v-model="formData.guessSovency"></el-input>
            </el-form-item>
          </div>
          <div v-else-if="formData.financingWay == 'B'">
            <el-form-item label="融资金额" class="w320 is-required" prop="financingMoney">
              <el-select v-model="formData.financingMoney" placeholder="请选择">
                <el-option v-for="itemMoney in financingMoneyList" :key="itemMoney.dataValue" :label="itemMoney.dataName" :value="itemMoney.dataValue">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="其他融资" style="width:600px">
              <el-input type="textarea" :autosize="{ minRows: 4}" v-model="formData.financingExplain"></el-input>
            </el-form-item>
          </div>
        </div>
        <p>
          <span class="item_title">核心团队</span>
          <el-button @click="addTeam" size="medium" style="margin-left:7px;">新增成员</el-button>
        </p>
        <el-form-item label="成员介绍" class="is-required" v-for="(team, index) in formData.teamList" :key="index">
          <el-col :span="14">
            <el-input type="textarea" :autosize="{ minRows: 2}" v-model="team.introduce"></el-input>
          </el-col>
          <el-col :span="3" style="margin-left:20px;">
            <el-button @click.prevent="removeTeam(team)">删除</el-button>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="团队介绍" style="width:600px" class="is-required" prop="teamBrief">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="formData.teamBrief"></el-input>
        </el-form-item> -->
        <p>
          <span class="item_title">项目负责人联系方式</span>
        </p>
        <el-form-item label="姓名" class="w350 is-required" prop="directorName">
          <el-input v-model="formData.directorName"></el-input>
        </el-form-item>
        <el-form-item label="职务" class="w350 is-required" prop="directorJob">
          <el-input v-model="formData.directorJob"></el-input>
        </el-form-item>
        <!-- <el-form-item label="年龄" class="w350" prop="directorAge">
          <el-input v-model="formData.directorAge"></el-input>
        </el-form-item>-->
        <el-form-item label="电话" class="w350 is-required" prop="directorPhone">
          <el-input v-model="formData.directorPhone"></el-input>
        </el-form-item>
        <el-form-item label="Email" class="w350 is-required" prop="directorEmail">
          <el-input v-model="formData.directorEmail"></el-input>
        </el-form-item>
        <p>
          <span class="item_title">个人信息展示</span>
        </p>
        <el-form-item label="姓名" class="w350 is-required" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="职务" class="w350 is-required">
          <el-input v-model="formData.job"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" class="w350 is-required">
          <el-input v-model="formData.company"></el-input>
        </el-form-item>
        <!-- <el-form-item label="所在地区" class="is-required">
          <v-distpicker
            :province="provinceStr1"
            :city="cityStr1"
            :area="countyStr1"
            @selected="selected1"
          ></v-distpicker>
        </el-form-item> -->
        <el-form-item label="所属行业" class="w320 is-required">
          <el-select v-model="formData.userIndustrys " placeholder="请选择">
            <el-option v-for="item in industryList" :key="item.dataValue" :label="item.dataName" :value="item.dataValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资金意向" class="w350 is-required" prop="name">
          <el-input v-model="formData.intention"></el-input>
        </el-form-item>
        <p>
          <span class="item_title">附件上传</span>
        </p>
        <el-form-item label="附件材料" prop="file">
          <div>商业计划书、融资计划书等文件请在此上传</div>
          <el-upload class="upload-demo" action :file-list="fileList" :http-request="uploadFlie">
            <div class="likeBtn fll">
              <i></i>点击上传文件
            </div>
          </el-upload>
        </el-form-item>
        <p>
          <span class="item_title">保密设置</span>
        </p>
        <el-form-item label="发布来源">
          <el-radio-group v-model="formData.issuerSecrecyType">
            <el-radio v-for="issuerSecrecyType in issuerSecrecyTypeList" :key="issuerSecrecyType.dataValue" :label="issuerSecrecyType.dataValue">{{issuerSecrecyType.dataName}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="融资主体信息">
          <el-radio-group v-model="formData.bodySecrecyType">
            <el-radio v-for="bodySecrecy in bodySecrecyList" :key="bodySecrecy.dataValue" :label="bodySecrecy.dataValue">{{bodySecrecy.dataName}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="项目融资信息">
          <el-radio-group v-model="formData.infoSecrecyType">
            <el-radio v-for="infoSecrecy in infoSecrecyList" :key="infoSecrecy.dataValue" :label="infoSecrecy.dataValue">{{infoSecrecy.dataName}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="项目负责人联系方式">
          <el-radio-group v-model="formData.contactSecrecyType">
            <el-radio v-for="contactSecrecyType in contactSecrecyTypeList" :key="contactSecrecyType.dataValue" :label="contactSecrecyType.dataValue">{{contactSecrecyType.dataName}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <div class="subBtn" @click="onSave('formData')" style="margin-right:20px;">保存</div>
          <div class="subBtn" @click="onSubmit(5,'formData')">提交</div>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog :visible.sync="toast_show" width="30%" center>
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
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("联系人手机号不能为空"));
        } else if (!/^1[34578]\d{9}$/.test(value)) {
          callback("手机号码有误，请重填");
        } else {
          callback();
        }
      };
      var checkNumber = (rule, value, callback) => {
        var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
        if (!re.test(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      };
      var checkAge = (rule, value, callback) => {
        var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
        // if (!value) {
        //   return callback(new Error("年龄不能为空"));
        // }
        if (!re.test(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      };
      var has_value = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("不能为空"));
        } else {
          callback();
        }
      };
      var checkEmail = (rule, value, callback) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!value) {
          return callback(new Error("邮箱不能为空"));
        }
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      };
      return {
        rules: {
          title: [{ validator: has_value, trigger: "blur" }],
          // industrys: [{  validator: has_value,trigger: 'blur' }],
          brief: [{ validator: has_value, trigger: "blur" }],
          companyName: [{ validator: has_value, trigger: "blur" }],
          address: [{ validator: has_value, trigger: "blur" }],
          financeBody: [{ validator: has_value, trigger: "blur" }],
          financingWay: [{ validator: has_value, trigger: "blur" }],
          financingMoney: [{ validator: has_value, trigger: "blur" }],
          stage: [{ validator: has_value, trigger: "blur" }],
          business: [{ validator: has_value, trigger: "blur" }],
          teamBrief: [{ validator: has_value, trigger: "blur" }],
          profitForecast: [{ validator: has_value, trigger: "blur" }],
          directorEmail: [
            {
              validator: checkEmail,
              message: "请输入正确的邮箱地址",
              trigger: "blur"
            }
          ],
          registeredCapitalFormat: [{ validator: checkNumber, trigger: "blur" }],
          companyAssessed: [{ validator: checkNumber, trigger: "blur" }],
          pe: [{ validator: checkNumber, trigger: "blur" }],
          pb: [{ validator: checkNumber, trigger: "blur" }],
          directorName: [{ validator: has_value, trigger: "blur" }],
          directorJob: [{ validator: has_value, trigger: "blur" }],
          directorPhone: [{ validator: checkPhone, trigger: "blur" }],
          directorAge: [{ validator: checkAge, trigger: "blur" }],
          averageAge: [{ validator: checkAge, trigger: "blur" }],
          companyFoundTimeStr: [{ trigger: "change" }],
          name: [{ validator: has_value, trigger: "blur" }]
        },
        loading: false,
        templateData: "<p>lalala</p>",
        countyStr: "昌平区",
        provinceStr: "北京市",
        cityStr: "北京城区",
        formData: {
          title: "",
          brief: "",
          financeBody: "",
          financingWay: "",
          companyName: "",
          address: "",
          registeredCapital: "",
          owner: "",
          business: "",
          brightSpot: "",
          position: "",
          trienniumFinancialData: "",
          profitForecast: "",
          averageAge: "",
          websiteUrl: "",
          weChat: "",
          companyFoundTimeStr: "",
          pe: "",
          pb: "",
          expiryDateStartTimeStr: "",
          expiryDateEndTimeStr: "",
          safeguard: "",
          opponentBrief: "",
          teamBrief: "",
          directorName: "",
          directorJob: "",
          directorAge: "",
          directorPhone: "",
          directorEmail: "",
          bodySecrecyType: "",
          infoSecrecyType: "",
          contactSecrecyType: "",
          regionProvinceId: "110000",
          regionCityId: "110100",
          regionCountyId: "110114",
          provinceId: "110000",
          cityId: "110100",
          countyId: "110114",
          stage: "",
          industryName: "",
          stockStructureImgPath: "",
          financingMoney: "",
          dueTime: "",
          interestRates: "",
          loanUses: "",
          repaymentsSource: "",
          standard: "",
          sourcesFunds: "",
          marketCompetitivePower: "",
          guessSovency: "",
          financingExplain: "",
          companyAssessed: "",
          shareholdingList: [{ name: "", value: "" }],
          registeredCapitalType: "",
          registeredCapitalFormat: "",
          yearTurnoverFormat: "",
          yearTurnoverType: "",
          yearTurnoverGrowth: "",
          yearNetProfitFormat: "",
          yearNetProfitType: "",
          yearNetProfitGrowth: "",
          netAssetsFormat: "",
          netAssetsType: "",
          teamList: [],
          issuerSecrecyType: "",
          name: "",
          job: "",
          company: "",
          userIndustrys: '',
          intention: ''
        },
        countyStr1: "昌平区",
        provinceStr1: "北京市",
        cityStr1: "北京城区",
        financeBodyList: [],
        financingWayList: [],
        stageList: [],
        industryList: [],
        paymentTypeList: [],
        financingMoneyList: [],
        bodySecrecyList: [
          { dataValue: "0", dataName: "全部可见" },
          { dataValue: "1", dataName: "登录用户可见" },
          { dataValue: "2", dataName: "仅对VIP会员公开" },
          { dataValue: "3", dataName: "保密，仅对后台管理员公开" }
        ],
        infoSecrecyList: [
          { dataValue: "0", dataName: "全部可见" },
          { dataValue: "1", dataName: "登录用户可见" },
          { dataValue: "2", dataName: "仅对VIP会员公开" },
          { dataValue: "3", dataName: "保密，仅对后台管理员公开" }
        ],
        contactSecrecyTypeList: [
          { dataValue: "0", dataName: "全部可见" },
          { dataValue: "1", dataName: "登录用户可见" },
          { dataValue: "2", dataName: "仅对VIP会员公开" },
          { dataValue: "3", dataName: "保密，仅对后台管理员公开" }
        ],
        issuerSecrecyTypeList: [
          { dataValue: "0", dataName: "全部可见" },
          { dataValue: "1", dataName: "登录用户可见" },
          { dataValue: "2", dataName: "仅对VIP会员公开" },
          { dataValue: "3", dataName: "保密，仅对后台管理员公开" }
        ],
        industrys: [],
        paymentTypes: [],
        fileNames: [],
        filePaths: [],
        fileList: [],
        varietyList: [],
        varietys: [],
        creditWayList: [],
        creditWays: [],
        intentCapitalList: [],
        intentCapitals: [],
        hint: "",
        success: false,
        toast_show: false,
        fin_way: 1,
        unit: [{ label: "万元", value: "2" }, { label: "亿元", value: "1" }]
      };
    },
    methods: {
      getData(id) {
        this.$axios
          .get(`/jsp/wap/center/ctrl/jsonProjectDetail.jsp?id=${id}`)
          .then(res => {
            console.log(res)
            this.formData = res.data.project;
            let project = res.data.project;
            if (project.regionNameStr != "") {
              this.provinceStr = project.regionNameStr.split(",")[0];
              var cityStr = project.regionNameStr.split(",")[1];
              if (this.provinceStr == "北京市" && cityStr == "市辖区") {
                cityStr = "北京城区";
              } else if (this.provinceStr == "天津市" && cityStr == "市辖区") {
                this.cityStr = "天津城区";
              } else if (this.provinceStr == "上海市" && cityStr == "市辖区") {
                this.cityStr = "上海城区";
              } else if (this.provinceStr == "重庆市" && cityStr == "市辖区") {
                this.cityStr = "重庆城区";
              } else {
                this.cityStr = project.regionNameStr.split(",")[1];
              }
              this.countyStr = project.regionNameStr.split(",")[2];
            }
            this.varietyList = res.data.varietyList;
            this.financeBodyList = res.data.financeBodyList;
            this.financingWayList = res.data.financingWayList;
            this.industryList = res.data.industryList;
            this.paymentTypeList = res.data.paymentTypeList;
            this.creditWayList = res.data.creditWayList;
            this.intentCapitalList = res.data.intentCapitalList;
            this.financingMoneyList = res.data.financingMoneyList;
            var stageList = res.data.stageList;
            if (this.formData.stage == "") {
              stageList.forEach(item => {
                this.$set(item, "checked", false);
              });
              this.stageList = stageList;
            } else if (this.formData.stage == "67") {
              stageList.forEach(item => {
                this.$set(item, "checked", false);
              });
              stageList[0].checked = true;
              this.stageList = stageList;
            } else if (this.formData.stage == "68") {
              stageList.forEach(item => {
                this.$set(item, "checked", false);
              });
              stageList[1].checked = true;
              this.stageList = stageList;
            } else if (this.formData.stage == "69") {
              stageList.forEach(item => {
                this.$set(item, "checked", false);
              });
              stageList[2].checked = true;
              this.stageList = stageList;
            } else if (this.formData.stage == "70") {
              stageList.forEach(item => {
                this.$set(item, "checked", false);
              });
              stageList[3].checked = true;
              this.stageList = stageList;
            } else if (this.formData.stage == "71") {
              stageList.forEach(item => {
                this.$set(item, "checked", false);
              });
              stageList[4].checked = true;
              this.stageList = stageList;
            } else if (this.formData.stage == "72") {
              stageList.forEach(item => {
                this.$set(item, "checked", false);
              });
              stageList[5].checked = true;
              this.stageList = stageList;
            }         
            if (res.data.project.industry != "") {
              this.industrys = res.data.project.industry
                .replace(/[\[\]]/g, "")
                .split(",");
            }
            if (res.data.project.intentCapital != "") {
              this.intentCapitals = res.data.project.intentCapital
                .replace(/[\[\]]/g, "")
                .split(",");
            }
            if (res.data.project.paymentType != "") {
              this.paymentTypes = res.data.project.paymentType
                .replace(/[\[\]]/g, "")
                .split(",");
            }
            if (res.data.project.variety != "") {
              this.varietys = res.data.project.variety
                .replace(/[\[\]]/g, "")
                .split(",");
            }
            if (res.data.project.creditWay != "") {
              this.creditWays = res.data.project.creditWay
                .replace(/[\[\]]/g, "")
                .split(",");
            }
            var file = {};
            var fileList = [];
            var fileList = res.data.project.fileList;
            if (fileList.length != 0) {
              fileList.forEach(item => {
                file.name = item.name;
                file.url = item.filePaths;
              });
              this.fileList.push(file);
            }
            if (this.formData.shareholdingList == "") {
              this.formData.shareholdingList = [{ name: "", value: "" }];
            }

            if (res.data.project.userIndustryStr != "") {
              this.formData.userIndustrys = res.data.project.userIndustryStr;
            }
          });
      },
      get_type(index, dataValue) {
        if (this.stageList[index].checked == true) {
          this.stageList[index].checked = false;
          this.formData.stage = "";
        } else {
          this.stageList.forEach(item => {
            item.checked = false;
          });
          this.stageList[index].checked = true;
          this.formData.stage = dataValue;
        }
      },
      onSave(formName) {
        this.onSubmit(0, formName);
      },
      onSubmit(status, formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (status == 0) {
              this.$confirm("即将保存项目, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).then(() => {
                var fileNames = this.fileNames.join(";=;");
                var filePaths = this.filePaths.join(",");
                var industrys = this.industrys.join(",");
                var intentCapitals = this.intentCapitals.join(",");
                var paymentTypes = this.paymentTypes.join(",");
                var varietys = this.varietys.join(",");
                var creditWays = this.creditWays.join(",");
                var shareholdersArray = [];
                this.formData.shareholdingList.forEach(item => {
                  shareholdersArray.push(item.name);
                });
                var shareholders = shareholdersArray.join(",");
                var shareholdingsArray = [];
                this.formData.shareholdingList.forEach(item => {
                  shareholdingsArray.push(item.name);
                });
                var shareholdings = shareholdingsArray.join(",");

                var teamInfoArray = [];
                this.formData.teamList.forEach(item => {
                  teamInfoArray.push(item.introduce);
                });
                var teamInfo = teamInfoArray.join(";=;");

                if (this.$route.query.id != "") {
                  var id = this.$route.query.id;
                } else {
                }
                if (id != "") {
                  var params = {
                    id,
                    title: this.formData.title,
                    brief: this.formData.brief,
                    financeBody: this.formData.financeBody,
                    financingWay: this.formData.financingWay,
                    financingMoney:this.formData.financingMoney,
                    companyName: this.formData.companyName,
                    address: this.formData.address,
                    registeredCapital: this.formData.registeredCapitalFormat,
                    owner: this.formData.owner,
                    business: this.formData.business,
                    brightSpot: this.formData.brightSpot,
                    position: this.formData.position,
                    trienniumFinancialData: this.formData.trienniumFinancialData,
                    profitForecast: this.formData.profitForecast,
                    averageAge: this.formData.averageAge,
                    websiteUrl: this.formData.websiteUrl,
                    weChat: this.formData.weChat,
                    companyFoundTimeStr: this.formData.companyFoundTimeStr,
                    registeredCapitalType: this.formData.registeredCapitalType,
                    pe: this.formData.pe,
                    pb: this.formData.pb,
                    expiryDateStartTimeStr: this.formData.expiryDateStartTimeStr,
                    expiryDateEndTimeStr: this.formData.expiryDateEndTimeStr,
                    safeguard: this.formData.safeguard,
                    opponentBrief: this.formData.opponentBrief,
                    teamBrief: this.formData.teamBrief,
                    directorName: this.formData.directorName,
                    directorJob: this.formData.directorJob,
                    directorAge: this.formData.directorAge,
                    directorPhone: this.formData.directorPhone,
                    directorEmail: this.formData.directorEmail,
                    bodySecrecyType: this.formData.bodySecrecyType,
                    infoSecrecyType: this.formData.infoSecrecyType,
                    contactSecrecyType: this.formData.contactSecrecyType,
                    regionProvinceId: this.formData.regionProvinceId,
                    regionCityId: this.formData.regionCityId,
                    regionCountyId: this.formData.regionCountyId,
                    provinceId: this.formData.provinceId,
                    cityId: this.formData.cityId,
                    countyId: this.formData.countyId,
                    stage: this.formData.stage,
                    stockStructureImgPath: this.formData.stockStructureImgPath,
                    dueTime: this.formData.dueTime,
                    interestRates: this.formData.interestRates,
                    loanUses: this.formData.loanUses,
                    standard: this.formData.standard,
                    sourcesFunds: this.formData.sourcesFunds,
                    marketCompetitivePower: this.formData.marketCompetitivePower,
                    guessSovency: this.formData.guessSovency,
                    financingExplain: this.formData.financingExplain,
                    companyAssessed: this.formData.companyAssessed,
                    yearTurnover: this.formData.yearTurnoverFormat,
                    yearTurnoverGrowth: this.formData.yearTurnoverGrowth,
                    yearTurnoverType: this.formData.yearTurnoverType,
                    yearNetProfit: this.formData.yearNetProfitFormat,
                    yearNetProfitGrowth: this.formData.yearNetProfitGrowth,
                    yearNetProfitType: this.formData.yearNetProfitType,
                    netAssets: this.formData.netAssetsFormat,
                    netAssetsType: this.formData.netAssetsType,
                    name: this.formData.name,
                    job: this.formData.job,
                    company: this.formData.company,
                    userIndustrys: this.formData.userIndustrys,
                    intention: this.formData.intention,
                    issuerSecrecyType: this.formData.issuerSecrecyType,
                    industrys,
                    paymentTypes,
                    fileNames,
                    filePaths,
                    status,
                    varietys,
                    creditWays,
                    intentCapitals,
                    shareholders,
                    shareholdings,
                    teamInfo,
                  };
                } else {
                  var params = {
                    title: this.formData.title,
                    brief: this.formData.brief,
                    financeBody: this.formData.financeBody,
                    financingWay: this.formData.financingWay,
                    financingMoney:this.formData.financingMoney,
                    companyName: this.formData.companyName,
                    address: this.formData.address,
                    registeredCapital: this.formData.registeredCapitalFormat,
                    owner: this.formData.owner,
                    business: this.formData.business,
                    brightSpot: this.formData.brightSpot,
                    position: this.formData.position,
                    trienniumFinancialData: this.formData.trienniumFinancialData,
                    profitForecast: this.formData.profitForecast,
                    averageAge: this.formData.averageAge,
                    websiteUrl: this.formData.websiteUrl,
                    weChat: this.formData.weChat,
                    companyFoundTimeStr: this.formData.companyFoundTimeStr,
                    registeredCapitalType: this.formData.registeredCapitalType,
                    pe: this.formData.pe,
                    pb: this.formData.pb,
                    expiryDateStartTimeStr: this.formData.expiryDateStartTimeStr,
                    expiryDateEndTimeStr: this.formData.expiryDateEndTimeStr,
                    safeguard: this.formData.safeguard,
                    opponentBrief: this.formData.opponentBrief,
                    teamBrief: this.formData.teamBrief,
                    directorName: this.formData.directorName,
                    directorJob: this.formData.directorJob,
                    directorAge: this.formData.directorAge,
                    directorPhone: this.formData.directorPhone,
                    directorEmail: this.formData.directorEmail,
                    bodySecrecyType: this.formData.bodySecrecyType,
                    infoSecrecyType: this.formData.infoSecrecyType,
                    contactSecrecyType: this.formData.contactSecrecyType,
                    regionProvinceId: this.formData.regionProvinceId,
                    regionCityId: this.formData.regionCityId,
                    regionCountyId: this.formData.regionCountyId,
                    provinceId: this.formData.provinceId,
                    cityId: this.formData.cityId,
                    countyId: this.formData.countyId,            
                    stage: this.formData.stage,
                    stockStructureImgPath: this.formData.stockStructureImgPath,
                    dueTime: this.formData.dueTime,
                    interestRates: this.formData.interestRates,
                    loanUses: this.formData.loanUses,
                    standard: this.formData.standard,
                    sourcesFunds: this.formData.sourcesFunds,
                    marketCompetitivePower: this.formData.marketCompetitivePower,
                    guessSovency: this.formData.guessSovency,
                    financingExplain: this.formData.financingExplain,
                    companyAssessed: this.formData.companyAssessed,
                    yearTurnover: this.formData.yearTurnoverFormat,
                    yearTurnoverGrowth: this.formData.yearTurnoverGrowth,
                    yearTurnoverType: this.formData.yearTurnoverType,
                    yearNetProfit: this.formData.yearNetProfitFormat,
                    yearNetProfitGrowth: this.formData.yearNetProfitGrowth,
                    yearNetProfitType: this.formData.yearNetProfitType,
                    netAssets: this.formData.netAssetsFormat,
                    netAssetsType: this.formData.netAssetsType,
                    name: this.formData.name,
                    job: this.formData.job,
                    company: this.formData.company,
                    userIndustrys: this.formData.userIndustrys,
                    intention: this.formData.intention,
                    issuerSecrecyType: this.formData.issuerSecrecyType,
                    industrys,
                    paymentTypes,
                    fileNames,
                    filePaths,
                    status,
                    varietys,
                    creditWays,
                    intentCapitals,
                    shareholders,
                    shareholdings,
                    teamInfo,
                  };
                }
                this.$axios
                  .post(
                    "/jsp/wap/center/do/doEditProject.jsp",
                    qs.stringify(params)
                  )
                  .then(res => {
                    if (res.success == "true") {
                      if (status == 0) {
                        this.success = true;
                        this.hint = "保存项目成功";
                        this.toast_show = true;
                        setTimeout(() => {
                          this.$router.push("/person/myProject");
                        }, 1000);
                      }
                    } else {
                      this.success = false;
                      this.hint = res.message;
                      this.toast_show = true;
                    }
                  });
              });
            } else {
              this.$confirm("即将提交项目, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).then(() => {
                var fileNames = this.fileNames.join(";=;");
                var filePaths = this.filePaths.join(",");
                var industrys = this.industrys.join(",");
                var intentCapitals = this.intentCapitals.join(",");
                var creditWays = this.creditWays.join(",");
                var varietys = this.varietys.join(",");
                var paymentTypes = this.paymentTypes.join(",");
                var shareholdersArray = [];
                this.formData.shareholdingList.forEach(item => {
                  shareholdersArray.push(item.name);
                });
                var shareholders = shareholdersArray.join(",");
                var shareholdingsArray = [];
                this.formData.shareholdingList.forEach(item => {
                  shareholdingsArray.push(item.name);
                });
                var shareholdings = shareholdingsArray.join(",");

                var teamInfoArray = [];
                this.formData.teamList.forEach(item => {
                  teamInfoArray.push(item.introduce);
                });
                var teamInfo = teamInfoArray.join(";=;");

                var id = this.$route.query.id;
                if (id != "") {
                  var params = {
                    id,
                    title: this.formData.title,
                    brief: this.formData.brief,
                    financeBody: this.formData.financeBody,
                    financingWay: this.formData.financingWay,
                    financingMoney:this.formData.financingMoney,
                    companyName: this.formData.companyName,
                    address: this.formData.address,
                    registeredCapital: this.formData.registeredCapitalFormat,
                    owner: this.formData.owner,
                    business: this.formData.business,
                    brightSpot: this.formData.brightSpot,
                    position: this.formData.position,
                    trienniumFinancialData: this.formData.trienniumFinancialData,
                    profitForecast: this.formData.profitForecast,
                    averageAge: this.formData.averageAge,
                    websiteUrl: this.formData.websiteUrl,
                    weChat: this.formData.weChat,
                    companyFoundTimeStr: this.formData.companyFoundTimeStr,
                    registeredCapitalType: this.formData.registeredCapitalType,
                    pe: this.formData.pe,
                    pb: this.formData.pb,
                    expiryDateStartTimeStr: this.formData.expiryDateStartTimeStr,
                    expiryDateEndTimeStr: this.formData.expiryDateEndTimeStr,
                    safeguard: this.formData.safeguard,
                    opponentBrief: this.formData.opponentBrief,
                    teamBrief: this.formData.teamBrief,
                    directorName: this.formData.directorName,
                    directorJob: this.formData.directorJob,
                    directorAge: this.formData.directorAge,
                    directorPhone: this.formData.directorPhone,
                    directorEmail: this.formData.directorEmail,
                    bodySecrecyType: this.formData.bodySecrecyType,
                    infoSecrecyType: this.formData.infoSecrecyType,
                    contactSecrecyType: this.formData.contactSecrecyType,
                    regionProvinceId: this.formData.regionProvinceId,
                    regionCityId: this.formData.regionCityId,
                    regionCountyId: this.formData.regionCountyId,
                    provinceId: this.formData.provinceId,
                    cityId: this.formData.cityId,
                    countyId: this.formData.countyId,
                    stage: this.formData.stage,
                    stockStructureImgPath: this.formData.stockStructureImgPath,
                    dueTime: this.formData.dueTime,
                    interestRates: this.formData.interestRates,
                    loanUses: this.formData.loanUses,
                    standard: this.formData.standard,
                    sourcesFunds: this.formData.sourcesFunds,
                    marketCompetitivePower: this.formData.marketCompetitivePower,
                    guessSovency: this.formData.guessSovency,
                    financingExplain: this.formData.financingExplain,
                    companyAssessed: this.formData.companyAssessed,
                    yearTurnover: this.formData.yearTurnoverFormat,
                    yearTurnoverGrowth: this.formData.yearTurnoverGrowth,
                    yearTurnoverType: this.formData.yearTurnoverType,
                    yearNetProfit: this.formData.yearNetProfitFormat,
                    yearNetProfitGrowth: this.formData.yearNetProfitGrowth,
                    yearNetProfitType: this.formData.yearNetProfitType,
                    netAssets: this.formData.netAssetsFormat,
                    netAssetsType: this.formData.netAssetsType,
                    name: this.formData.name,
                    job: this.formData.job,
                    company: this.formData.company,
                    userIndustrys: this.formData.userIndustrys,
                    intention: this.formData.intention,
                    issuerSecrecyType: this.formData.issuerSecrecyType,
                    industrys,
                    paymentTypes,
                    fileNames,
                    filePaths,
                    status,
                    varietys,
                    creditWays,
                    intentCapitals,
                    shareholders,
                    shareholdings,
                    teamInfo,
                  };
                } else {
                  var params = {
                    title: this.formData.title,
                    brief: this.formData.brief,
                    financeBody: this.formData.financeBody,
                    financingWay: this.formData.financingWay,
                    financingMoney:this.formData.financingMoney,
                    companyName: this.formData.companyName,
                    address: this.formData.address,
                    registeredCapital: this.formData.registeredCapitalFormat,
                    owner: this.formData.owner,
                    business: this.formData.business,
                    brightSpot: this.formData.brightSpot,
                    position: this.formData.position,
                    trienniumFinancialData: this.formData.trienniumFinancialData,
                    profitForecast: this.formData.profitForecast,
                    averageAge: this.formData.averageAge,
                    websiteUrl: this.formData.websiteUrl,
                    weChat: this.formData.weChat,
                    companyFoundTimeStr: this.formData.companyFoundTimeStr,
                    registeredCapitalType: this.formData.registeredCapitalType,
                    pe: this.formData.pe,
                    pb: this.formData.pb,
                    expiryDateStartTimeStr: this.formData.expiryDateStartTimeStr,
                    expiryDateEndTimeStr: this.formData.expiryDateEndTimeStr,
                    safeguard: this.formData.safeguard,
                    opponentBrief: this.formData.opponentBrief,
                    teamBrief: this.formData.teamBrief,
                    directorName: this.formData.directorName,
                    directorJob: this.formData.directorJob,
                    directorAge: this.formData.directorAge,
                    directorPhone: this.formData.directorPhone,
                    directorEmail: this.formData.directorEmail,
                    bodySecrecyType: this.formData.bodySecrecyType,
                    infoSecrecyType: this.formData.infoSecrecyType,
                    contactSecrecyType: this.formData.contactSecrecyType,
                    regionProvinceId: this.formData.regionProvinceId,
                    regionCityId: this.formData.regionCityId,
                    regionCountyId: this.formData.regionCountyId,
                    provinceId: this.formData.provinceId,
                    cityId: this.formData.cityId,
                    countyId: this.formData.countyId,
                    stage: this.formData.stage,
                    stockStructureImgPath: this.formData.stockStructureImgPath,
                    dueTime: this.formData.dueTime,
                    interestRates: this.formData.interestRates,
                    loanUses: this.formData.loanUses,
                    standard: this.formData.standard,
                    sourcesFunds: this.formData.sourcesFunds,
                    marketCompetitivePower: this.formData.marketCompetitivePower,
                    guessSovency: this.formData.guessSovency,
                    financingExplain: this.formData.financingExplain,
                    companyAssessed: this.formData.companyAssessed,
                    yearTurnover: this.formData.yearTurnoverFormat,
                    yearTurnoverGrowth: this.formData.yearTurnoverGrowth,
                    yearTurnoverType: this.formData.yearTurnoverType,
                    yearNetProfit: this.formData.yearNetProfitFormat,
                    yearNetProfitGrowth: this.formData.yearNetProfitGrowth,
                    yearNetProfitType: this.formData.yearNetProfitType,
                    netAssets: this.formData.netAssetsFormat,
                    netAssetsType: this.formData.netAssetsType,
                    name: this.formData.name,
                    job: this.formData.job,
                    company: this.formData.company,
                    userIndustrys: this.formData.userIndustrys,
                    intention: this.formData.intention,
                    issuerSecrecyType: this.formData.issuerSecrecyType,
                    industrys,
                    paymentTypes,
                    fileNames,
                    filePaths,
                    status,
                    varietys,
                    creditWays,
                    intentCapitals,
                    shareholders,
                    shareholdings,
                    teamInfo,
                  };
                }
                this.$axios
                  .post(
                    "/jsp/wap/center/do/doEditProject.jsp",
                    qs.stringify(params)
                  )
                  .then(res => {
                    if (res.success == "true") {
                      this.success = true;
                      this.hint = "上传项目成功";
                      this.toast_show = true;
                      setTimeout(() => {
                        this.$router.push("/person/myProject");
                      }, 1000);
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
            this.$message.error("请完善以下信息，方便我们更好的为您服务");
            return false;
          }
        });
      },
      selected(e) {
        this.formData.regionProvinceId = e.province.code;
        this.formData.regionCityId = e.city.code;
        this.formData.regionCountyId = e.area.code;
      },
      uploadImg(f) {
        this.loading = true;
        let param = new FormData(); //创建form对象
        param.append("file", f.file); //通过append向form对象添加数据
        let config = {
          headers: { "content-type": "multipart/form-data" }
        }; //添加请求头
        this.$axios
          .post("/component/trUpload2/uploadify", param, config)
          .then(res => {
            this.formData.stockStructureImgPath = res.data.relativePath;
            this.loading = false;
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
              this.$message.error("上传失败，请检查网络");
            }
          });
      },
      vip() {
        if (this.$store.state.userinfo.isVip == "0") {
          this.$confirm("只有会员才能享受快速上传, 是否办理会员?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            center: true
          })
            .then(() => {
              let { href } = this.$router.resolve({
                name: "member"
              });
              window.open(href, "_blank");
            })
            .catch(() => { });
        } else {
          this.$router.push({ name: "uploadApplyProject" });
        }
      },
      removeSharehold(item) {
        var index = this.formData.shareholdingList.indexOf(item);
        if (index !== -1) {
          this.formData.shareholdingList.splice(index, 1);
        }
      },
      addSharehold() {
        this.formData.shareholdingList.push({
          name: "",
          value: ""
        });
      },
      removeTeam(item) {
        var index1 = this.formData.teamList.indexOf(item);
        if (index1 !== -1) {
          this.formData.teamList.splice(index1, 1);
        }
      },
      addTeam() {
        this.formData.teamList.push({
          introduce: ""
        });
      },
      selected1(e) {
        this.formData.provinceId = e.province.code;
        this.formData.cityId = e.city.code;
        this.formData.countyId = e.area.code;
      }
    },
    created() {
      let id = this.$route.query.id;
      this.getData(id);
    },
    watch: {
      fin_way() {
        this.$refs.formData.clearValidate();
      }
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
    margin-left: 10px;
    color: rgb(0, 83, 133);
    cursor: pointer;
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
    margin: 0; // margin-left: 15px;
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

  .bg-f2 {
    background: #f2f2f2;
    padding: 20px 0;
    margin-bottom: 20px;
  }

  //融资方式
  .way {
    background: #f2f2f2;
    padding: 10px 0;
    margin-bottom: 20px;
  }

  /deep/ {
    .el-checkbox+.el-checkbox {
      margin-left: 20px !important;
    }
  }
</style>