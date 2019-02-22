<template>
  <div class="fll">
    <div class="person_content">
      <p class="project_title">
        <span class="project_">上传资金信息</span>
      </p>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="资金标题" prop="applyTitle">
          <el-input
            placeholder="请输入内容"
            v-model="ruleForm.applyTitle"
            clearable style="width:400px;">
          </el-input>
        </el-form-item>
        <el-form-item label="上传文件" prop="fileList" style="margin-left:5px;">
            <el-upload
            class="upload-demo"
            action=""
            :http-request="uploadFlie" 
            :file-list="fileList"
            >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <!-- <div class="subBtn" @click="onSave" style="margin-right:20px; margin-left:70px;">保存</div> -->
          <div class="subBtn" @click="onSubmit(5,'ruleForm')" style="margin-left:400px;">提交</div>
        </el-form-item>
      </el-form>
      <div class="invest-menu clearfix" style="border-top: 1px solid #ededed;">
        <div v-for="(item , index) in pageList" :key="index" class="invest-item fll clearfix">
          <div class="invest-text fll">
            <p class="invest-item-list">{{item.applyTimeStr}}</p>
            <p class="invest-item-title" style="margin-top:20px;">
              <span class="invest-money" @click="toMoneyDetailPage(item.id,item.applyStatus)">{{item.applyTitle}}</span>
            </p>
          </div>
          <!-- <span class="flr" :class="item.check == 0 ? ' already':'' + item.check == 1 ? ' being':'' + item.check == 2 ? ' not':'' + item.check == 3 ? ' fail':''">{{item.check == 0 ? '已发布':'' + item.check == 1 ? '审核中':'' + item.check == 2 ? '未发布':''}}</span> -->
          <span
            class="flr"
            v-if="item.applyStatus != '0'"
            :class="item.applyStatus  == '5' ? ' being':'' + item.applyStatus == '10' ? ' already':'' + item.applyStatus == '15'? ' fail':''"
          >{{item.applyStatus == '5' ? '审核中':'' + item.applyStatus == '10' ? '已发布':'' + item.status == '15'? '':''}}</span>
          <span class="flr not" v-else>未发布</span>
          <!-- <el-button type="primary" icon="el-icon-edit" circle class="flr cancel1" size="mini" @click="amend(item.id)"></el-button> -->
          <el-button type="danger" icon="el-icon-delete" circle class="flr cancel2" size="mini" @click="delete_item(item.id,index)"></el-button>
        </div>
        <p v-show="pageList.length == 0" class="noAtt">你没有使用过上传资金哦~</p>
      </div>
      <div class="mes_page">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
      </div>
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
import qs from 'qs' 

  export default {
    data(){
      return {
        pageList:[],
        count:1,
        fileList:[],
        applyTitle:'',
        fileNames:[],
        filePaths:[],
        ruleForm:{
          applyTitle:'',
          fileList:[]
        },
        rules:{
          applyTitle:{ required: true, message: '请输入资金名称', trigger: 'blur' },
          fileList:{ required: true, message: '请上传资金相关文件', trigger: 'blur' },
        },
        hint:"",
        success:false,
        toast_show:false,
      }
    },
    methods:{
      getData(){
        this.$axios.get('/jsp/wap/center/ctrl/jsonCapitalApplyList.jsp').then(res => {
          if(res.success == 'true'){
            this.pageList = res.data.pageList
            this.count = Number(res.data.pagination.totalCount)
          }
        })
      },
      onSave() {
      this.onSubmit(0,'ruleForm');
    },
    onSubmit(applyStatus, formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (applyStatus == 0) {
            this.$confirm("即将保存资金, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              var fileNames = this.fileNames.join(";=;");
              var filePaths = this.filePaths.join(",");
              var params = {
                applyTitle: this.ruleForm.applyTitle,
                fileNames,
                filePaths,
                applyStatus
              };
              this.$axios
                .post(
                  "/jsp/wap/center/do/doCapitalDatumApply.jsp",
                  qs.stringify(params)
                )
                .then(res => {
                  if (res.success == "true") {
                    if (applyStatus == 0) {
                      this.success = true 
                      this.hint = '保存成功'
                      this.toast_show = true
                      setTimeout(()=> {
                        window.history.go(0)
                      },1000)
                    } else {
                      this.success = true 
                      this.hint = '上传资金成功'
                      this.toast_show = true
                      setTimeout(()=> {
                        window.history.go(0)
                      },1000)
                    }
                  } else {
                    this.success = false 
                    this.hint = res.message
                    this.toast_show = true
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
              var params = {
                applyTitle: this.ruleForm.applyTitle,
                fileNames,
                filePaths,
                applyStatus
              };
              this.$axios
                .post(
                  "/jsp/wap/center/do/doCapitalDatumApply.jsp",
                  qs.stringify(params)
                )
                .then(res => {
                  if (res.success == "true") {
                    if (applyStatus == 0) {
                      this.success = true 
                      this.hint = '保存成功'
                      this.toast_show = true
                      setTimeout(()=> {
                        window.history.go(0)
                      },1000)
                    } else {
                      this.success = true 
                      this.hint = '上传资金成功'
                      this.toast_show = true
                      setTimeout(()=> {
                        window.history.go(0)
                      },1000)
                    }
                  } else {
                    this.success = false 
                    this.hint = res.message
                    this.toast_show = true
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
              this.success = false 
              this.hint = res.message
              this.toast_show = true
            }
          });
      },
       handleCurrentChange(val) {
        this.getData(val)
      },
      toMoneyDetailPage(id,status){
        if(status == '10'){
          let {href} = this.$router.resolve({
              name: "moneyDetail",
              query: {id}
          });
          window.open(href, '_blank');
        } else {
          this.$message.info('资金尚未通过审核')
        }
      },
    amend(id){
      let {href} = this.$router.resolve({
              name: "applyMoney",
              query: {id}
          });
          window.open(href, '_blank');
    },
    delete_item(id,index){
      this.$confirm("即将删除资金, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=> {
        this.$axios.get(`/jsp/wap/center/do/doDelDatumApply.jsp?id=${id}`).then(res => {
          this.pageList.splice(index,1)
          this.count -= 1
        })
      })
    }
    },
    created(){
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
.mine_money {
  font-family: "Microsoft YaHei";
  color: rgb( 153, 153, 153 );
  line-height: 32px;
}
.invest-item {
  width: 100%;
  height: 90px;
  margin-top: 20px;
  border-bottom: 1px solid #cdcdcd;
  position: relative;
}
.invest-text {
  margin-left: 10px;
  width: 750px;
}
.invest-item-title {
  font-size: 18px;
  font-family: "Microsoft YaHei";
  color: rgb(62, 58, 57);
  font-weight: bold;
  line-height: 1.333;
  text-align: left;
  height: 42px;
  margin: 0;
  cursor: pointer;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis;
}
.invest-item-title:hover {
  color: rgb(0, 89, 130);
}
.invest-item-list {
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: rgb(137, 137, 137);
  text-align: left;
  margin-top: 13px;
  margin-bottom: 0;
  .invest-money {
    font-size: 18px;
    font-weight: bold;
    color: #005982;
  }
}
.w230 {
  width: 350px;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis;
}
.inb {
  display: inline-block;
  width: 350px;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis;
}
.cancel1 {
  position: absolute;
  right: 40px;
  bottom: 10px;
  background-color: rgb(0, 83, 133);
  border: #005982;
}

.cancel2 {
  position: absolute;
  right: 0;
  bottom: 10px;
}

.invest-menu .invest-item:last-of-type {
  border: none;
}

.noAtt {
  margin: 250px 0;
  text-align: center;
  height: 100px;
}

.project_title {
  // margin-top: 40px;
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

  .noLikeBtn {
    width: 110px;
    height: 35px;
    color: #999;
    line-height: 0.425;
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1.5px solid #999;
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
    padding: 12px 20px 12px 35px;
    border-radius: 6px;
    position: relative;
    i {
      display: inline-block;
      width: 15px;
      height: 15px;
      background: url(/static/img/jiahao-1.png) no-repeat center;
      background-size: contain;
      position: absolute;
      top: 9px;
      left: 15px;
    }
  }
  .noLikeBtn:active {
    background: #000;
    border-color: #000;
    color: #fff;
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
      margin-left: 15px;
      transition: 0.1s;
      font-weight: 500;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      padding: 12px 20px 12px 35px;
      border-radius: 4px;
      position: relative;
      i {
        display: inline-block;
        width: 15px;
        height: 15px;
        background: url(/static/img/shangchuan-1.png) no-repeat center;
        background-size: contain;
        position: absolute;
        top: 9px;
        left: 15px;
      }
  }

  //提醒样式
  .already {
    margin-top: 20px;
    margin-right: 7px;
    font-size: 18px;
    color: #999;
  }
  .being {
    margin-top: 20px;
    margin-right: 7px;
    font-size: 18px;
    color: #fc7f7f;
  }
  .not {
    margin-top: 20px;
    margin-right: 7px;
    font-size: 18px;
    color: #faa251;
  }
  .fail {
    display: inline-block;
    margin-top: 20px;
    width: 80px;
    height: 80px;
    background: url(/static/img/shenheshibai.png) no-repeat center;
    background-size: contain;
  }

  .mes_page {
  margin: 20px 0;
  padding: 0 60px;
  /deep/ {
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background: #005983 !important;
      color: #fff !important;
    }
    .el-pagination.is-background .el-pager li {
      background: #fff !important;
      color: #000 !important;
      border: 1px solid #d9d9d9 !important;
      font-weight: 400;
    }
  }
}

.upload-demo {
  width: 400px;
}

.el-form {
  width: 500px;
}
.subBtn {
  width: 80px;
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

/deep/ {
  .el-form-item__error {
    margin-left: 80px!important;
  }
}
</style>