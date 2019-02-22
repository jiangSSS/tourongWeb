<template>
  <div class="fll">
    <div class="person_content">
      <p class="project_title">
        <span class="project_">会员信息认证</span>
      </p>
      <p style="color:#999;line-height:1.5;font-size:14px;">通过认证信息能增加您身份的可信程度，增加投融资信息匹配的精准度，能够更容易促成投融资意向。名片、营业执照、微信号等信息，仅供认证使用，平台不会暴露您的个人信息。</p>
      <el-form :model="attestForm" label-width="130px" class="demo-ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="类型：" prop="type">
          <div v-for="(item , index) in type" :key="index" class="fll type_btn" :class="{'active':item.checked}" @click="get_type(index)">{{item.name}}</div>
        </el-form-item>
        <div v-if="attestForm.type == 1">
          <div v-if="!project">
            <el-form-item label="个人名片：" prop="cardFilePath" v-model="attestForm.cardFilePath">
              <el-upload class="upload-demo" :http-request="uploadFlie" action="" :file-list="fileList">
                <div class="likeBtn">
                  <i></i>点击上传名片
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="个人简历：">
              <el-upload class="upload-demo" :http-request="uploadFlie1" action="" :file-list="fileList1">
                <div class="likeBtn">
                  <i></i>点击上传简历
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="个人荣誉：">
              <el-upload class="upload-demo" :http-request="uploadFlie2" action="" :file-list="fileList2">
                <div class="likeBtn">
                  <i></i>点击上传荣誉
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="企业营业执照：" prop="licenseFilePath" v-model="attestForm.licenseFilePath">
              <el-upload class="upload-demo" :http-request="uploadFlie3" action="" :file-list="fileList3">
                <div class="likeBtn">
                  <i></i>点击上传企业营业执照
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="投资能力&风险承担能力介绍：">
              <el-input type="textarea" v-model="attestForm.abilityBrief" :autosize="{ minRows: 5}" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="sub_btn" @click="submitForm('ruleForm')">提交认证</div>
            </el-form-item>
          </div>
          <div v-else>
            <el-form-item>
              <p>您已通过认证成为项目方</p>
            </el-form-item>
          </div>
        </div>
        <div v-else-if="attestForm.type == 2">
          <div v-if="!money">

            <el-form-item label="个人名片：" prop="cardFilePath" v-model="attestForm.cardFilePath">
              <el-upload class="upload-demo" :http-request="uploadFlie" action="" :file-list="fileList">
                <div class="likeBtn">
                  <i></i>点击上传名片
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="个人简历：">
              <el-upload class="upload-demo" :http-request="uploadFlie1" action="" :file-list="fileList1">
                <div class="likeBtn">
                  <i></i>点击上传简历
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="个人荣誉：">
              <el-upload class="upload-demo" :http-request="uploadFlie2" action="" :file-list="fileList2">
                <div class="likeBtn">
                  <i></i>点击上传荣誉
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="企业营业执照：" prop="licenseFilePath" v-model="attestForm.licenseFilePath">
              <el-upload class="upload-demo" :http-request="uploadFlie3" action="" :file-list="fileList3">
                <div class="likeBtn">
                  <i></i>点击上传企业营业执照
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="历史投资案例：">
              <el-input type="textarea" v-model="attestForm.brief" :autosize="{ minRows: 5}" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="投资能力&风险承担能力介绍：">
              <el-input type="textarea" v-model="attestForm.abilityBrief" :autosize="{ minRows: 5}" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="sub_btn" @click="submitForm('ruleForm')">提交认证</div>
            </el-form-item>
          </div>
          <div v-else>
            <el-form-item>
              <p>您已通过认证成为资金方</p>
            </el-form-item>
          </div>
        </div>
        <div v-else-if="attestForm.type == 3">
          <div v-if="!member">
            <el-form-item label="个人名片：" prop="cardFilePath" v-model="attestForm.cardFilePath">
              <el-upload class="upload-demo" :http-request="uploadFlie" action="" :file-list="fileList">
                <div class="likeBtn">
                  <i></i>点击上传名片
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="个人简历：" prop="cvFilePath" v-model="attestForm.cvFilePath">
              <el-upload class="upload-demo" :http-request="uploadFlie1" action="" :file-list="fileList1">
                <div class="likeBtn">
                  <i></i>点击上传简历
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="个人荣誉：" prop="honorFilePath" v-model="attestForm.honorFilePath">
              <el-upload class="upload-demo" :http-request="uploadFlie2" action="" :file-list="fileList2">
                <div class="likeBtn">
                  <i></i>点击上传荣誉
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <div class="sub_btn" @click="submitForm('ruleForm')">提交认证</div>
            </el-form-item>
          </div>
          <div v-else>
            <el-form-item>
              <p>您已通过认证成为专家</p>
            </el-form-item>
          </div>
        </div>
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
  export default {
    data() {
      return {
        attestForm: {
          brief: "",
          abilityBrief: "",
          type: "1",
          cardFilePath: [],
          cvFilePath: [],
          honorFilePath: [],
          licenseFilePath: [],
          project: false,
          money: false,
          member: false,
        },
        type: [{ name: "项目方", checked: true }, { name: "资金方", checked: false }, { name: "专家", checked: false }],
        rules: {
          type: [
            {
              type: "string",
              required: true,
              message: "请至少选择一个认证类型",
              trigger: "change"
            }
          ],
          cardFilePath: [{ required: true, message: '请上传个人名片', trigger: 'blur' }],
          cvFilePath: [{ required: true, message: '请上传个人简历', trigger: 'blur' }],
          honorFilePath: [{ required: true, message: '请上传个人荣誉', trigger: 'blur' }],
          licenseFilePath: [{ required: true, message: '请上传企业营业执照', trigger: 'blur' }],
          // file: [
          //   {
          //     type: "file",
          //     required: true,
          //     message: "请上传资料",
          //     trigger: "change"
          //   }
          // ],
          // brief: [{ required: true, message: "请填写历史投资案例", trigger: "blur" }]
        },
        fileList: [],
        fileList1: [],
        fileList2: [],
        fileList3: [],
        hint: "",
        success: false,
        toast_show: false,
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var cardFilePath = this.attestForm.cardFilePath.join(',')
            var cvFilePath = this.attestForm.cvFilePath.join(',')
            var honorFilePath = this.attestForm.honorFilePath.join(',')
            var licenseFilePath = this.attestForm.licenseFilePath.join(',')
            this.$axios.get('/jsp/wap/center/do/doAuthentication.jsp', { params: { type: this.attestForm.type, brief: this.attestForm.brief, abilityBrief: this.attestForm.abilityBrief, cardFilePath, cvFilePath, honorFilePath, licenseFilePath } }).then(res => {
              if (res.success == "true") {
                this.success = true;
                this.hint = "上传认证资料成功";
                this.toast_show = true;
                this.attestForm.brief = ""
                this.attestForm.abilityBrief = ""
                this.type.forEach(item => {
                  item.checked = false
                })
                this.attestForm.type = ""
                this.fileList = []
                this.attestForm.cardFilePath = []
                this.attestForm.cvFilePath = []
                this.attestForm.honorFilePath = []
                this.attestForm.licenseFilePath = []
              } else {
                this.success = false;
                this.hint = res.message;
                this.toast_show = true;
              }
            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      get_type(index) {
        if (this.type[index].checked == true) {
          this.type[index].checked = false
          this.attestForm.type = ''
        } else {
          this.type.forEach(item => {
            item.checked = false
          })
          this.type[index].checked = true
          this.attestForm.type = (index + 1).toString()
        }
      },
      uploadFlie(f) {
        let param = new FormData(); //创建form对象
        param.append('file', f.file);//通过append向form对象添加数据
        let config = {
          headers: { 'content-type': 'multipart/form-data' }
        };  //添加请求头
        this.$axios.post('/component/trUpload2/uploadify', param, config).then(res => {
          console.log('111', res)
          if (res.success == true) {
            this.attestForm.cardFilePath.push(res.data.relativePath)
          } else {
            this.success = false;
            this.hint = res.message;
            this.toast_show = true;
          }
        })
      },
      uploadFlie1(f) {
        let param = new FormData(); //创建form对象
        param.append('file', f.file);//通过append向form对象添加数据
        let config = {
          headers: { 'content-type': 'multipart/form-data' }
        };  //添加请求头
        this.$axios.post('/component/trUpload2/uploadify', param, config).then(res => {
          console.log('111', res)
          if (res.success == true) {
            this.attestForm.cvFilePath.push(res.data.relativePath)
          } else {
            this.success = false;
            this.hint = res.message;
            this.toast_show = true;
          }
        })
      },
      uploadFlie2(f) {
        let param = new FormData(); //创建form对象
        param.append('file', f.file);//通过append向form对象添加数据
        let config = {
          headers: { 'content-type': 'multipart/form-data' }
        };  //添加请求头
        this.$axios.post('/component/trUpload2/uploadify', param, config).then(res => {
          console.log('111', res)
          if (res.success == true) {
            this.attestForm.honorFilePath.push(res.data.relativePath)
          } else {
            this.success = false;
            this.hint = res.message;
            this.toast_show = true;
          }
        })
      },
      uploadFlie3(f) {
        let param = new FormData(); //创建form对象
        param.append('file', f.file);//通过append向form对象添加数据
        let config = {
          headers: { 'content-type': 'multipart/form-data' }
        };  //添加请求头
        this.$axios.post('/component/trUpload2/uploadify', param, config).then(res => {
          console.log('111', res)
          if (res.success == true) {
            this.attestForm.licenseFilePath.push(res.data.relativePath)
          } else {
            this.success = false;
            this.hint = res.message;
            this.toast_show = true;
          }
        })
      },
    },
    watch: {
      'attestForm.type'() {
        this.$refs.ruleForm.clearValidate()
      }
    },
    created() {
      let authenticationType = this.$store.state.userinfo.authenticationType
      console.log(authenticationType);
      let Type = authenticationType.split(',')
      Type.forEach(item => {
        if (item == 1) {
          this.project = true
        }
        if (item == 2) {
          this.money = true
        }
        if (item == 3) {
          this.member = true
        }
      })

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

  .sub_btn {
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
    margin-top: 20px;
    transition: 0.1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    border-radius: 4px;
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
    border: none;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    padding-left: 15px;
    transition: 0.1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    position: relative;
    i {
      display: inline-block;
      width: 15px;
      height: 15px;
      background: url(/static/img/shangchuan-1.png) no-repeat center;
      background-size: contain;
      position: absolute;
      top: -5px;
      left: 0;
    }
  }

  .demo-ruleForm {
    width: 670px;
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
</style>