  <template>
    <div class="fll">
      <div class="person_content">
        <p class="project_title">
          <span class="project_">添加动态</span>
        </p>
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="内容" prop="content" style="width:500px;">
            <el-input v-model="form.content"></el-input>
          </el-form-item>
          <el-form-item label="图片上传" style="width:700px;">
            <el-upload
              class="upload-demo"
              action
              :http-request="uploadImg"
              list-type="picture"
              :file-list="fileList"
            >
              <el-button
                size="small"
                type="primary"
                class="fll"
                style="margin-bottom:10px;"
                :loading="loading"
              >立即上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button class="subBtn" @click="submitForm('form')" :loading="loading">立即创建</el-button>
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
  export default {
    data() {
      return {
        rules: {content:[{ required: true, message: '请输入进展', trigger: 'blur' }]},
        form: {
          content: "",
        },
        loading: false,
        fileList: [],
        success: false,
        hint: "",
        toast_show: false,
        imgPaths:[]
      };
    },
    methods: {
      submitForm(formName) {
        var id = this.$route.query.id
        var imgPaths = this.imgPaths.join(',')
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.get('/jsp/wap/center/do/doEditCapitalDynamic.jsp',{params:{projectId:id,content:this.form.content,imgPaths}}).then(res => {
              if(res.success == 'true'){
                this.success = true
                this.hint = '提交动态成功'
                this.toast_show = true
                setTimeout(()=> {
                  this.$router.push({name:'manageMoney',query:{id}})
                },500)
              } else {
              this.success = false
              this.hint = res.message
              this.toast_show = true
              }
            })
          } else {
            
            return false;
          }
        });
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
            this.imgPaths.push(res.data.relativePath);
            this.loading = false;
          });
      },
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
  .demo-ruleForm {
    margin-top:50px;
  }
  </style>