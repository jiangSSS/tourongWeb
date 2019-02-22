<template>
  <div class="fll">
    <div class="person_content clearfix">
      <p class="project_title">
        <span class="project_">需求填报</span>
      </p>
      <!-- <p>请详细填写您的需求：</p> -->
      <div class="clearfix">
        <div
          v-for="(item , index) in type"
          :key="index"
          class="fll type_btn"
          :class="{'active':item.checked}"
          @click="get_type(index)"
        >{{item.name}}</div>
      </div>
      <div v-show="!table">
      <el-form
        style="margin-top:20px;"
        :model="attestForm"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules"
        ref="attestForm"
        v-show="specialist_show"
      >
        <el-form-item label="姓名：" style="width:400px;" prop="name">
          <el-input v-model="attestForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" style="width:400px;" prop="mobile">
          <el-input v-model="attestForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="单位：" style="width:400px;">
          <el-input v-model="attestForm.company"></el-input>
        </el-form-item>
        <el-form-item label="职位：" style="width:400px;">
          <el-input v-model="attestForm.job"></el-input>
        </el-form-item>
        <el-form-item label="介绍：" prop="introduce">
          <el-input
            type="textarea"
            v-model="attestForm.introduce"
            :autosize="{ minRows: 15}"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="sub_btn" @click="submitForm('attestForm')">提交</div>
        </el-form-item>
      </el-form>
      <el-form v-show="!specialist_show">
        <el-form-item style="margin-top:20px;">
          <el-input
            type="textarea"
            :autosize="{ minRows: 20}"
            :placeholder="placeholder"
            v-model="content"
          ></el-input>
        </el-form-item>
        <div class="sub_btn flr" @click="submitFind" v-show="sub_type == 1">提交</div>
        <div class="sub_btn flr" @click="submit" v-show="sub_type == 3">提交</div>
      </el-form>
      </div>
      <div v-show="table">
      <el-table
          :data="otherDemand"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
          >
          <el-table-column
            prop="status"
            label="类型"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="addTimeStr"
            label="填报时间"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="content"
            label="内容"
            sortable
            >
          </el-table-column>
          <el-table-column
            label="操作"
            >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
export default {
  data() {
    return {
      table:false,
      specialist_show: false,
      hint:"",
      success:false,
      toast_show:false,
      sub_type:1,
      content: "",
      otherDemand:[],
      attestForm: {
        name : "",
        mobile:'',
        company:'',
        job:'',
        introduce:''
      },
      placeholder: "请填写详细需求！例如专家的所属领域、行业等。",
      type: [
        { name: "成为专家", checked: false },
        { name: "找专家", checked: true },
        { name: "推荐专家", checked: false },
        { name: "其他需求", checked: false },
        { name: "查看需求", checked: false }
      ],
      rules: {
        introduce: { required: true, message: "请填写介绍", trigger: "blur" },
        name: { required: true, message: "请填写姓名", trigger: "blur" },
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
      },
    };
  },
  methods: {
    submit() {
      if(this.content == ''){
        this.success = false;
        this.hint = "请填写需求";
        this.toast_show = true;
      } else {
        this.$axios
          .get("/jsp/wap/center/do/doFeedback.jsp", {
            params: { content: this.content }
          })
          .then(res => {
            if (res.success == "true") {
              this.success = true;
              this.hint = "提交成功！我们客服人员会尽快与您联系";
              this.toast_show = true;
            } else {
              this.success = false;
              this.hint = "提交失败，请检查网络或重试";
              this.toast_show = true;
            }
        });
      }
    },
    submitFind(){
      if(this.content == ''){
        this.success = false;
        this.hint = "请填写需求";
        this.toast_show = true;
      } else {
      this.$axios
        .get("/jsp/wap/center/do/doExpertFind.jsp", {
          params: { content: this.content }
        })
        .then(res => {
          if (res.success == "true") {
            this.success = true;
            this.hint = "提交成功！我们客服人员会尽快与您联系";
            this.toast_show = true;
          } else {
            this.success = false;
            this.hint = res.message;
            this.toast_show = true;
          }
        });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.get('/jsp/wap/center/do/doExpertRecommend.jsp',{params:{name:this.attestForm.name,mobile:this.attestForm.mobile,company:this.attestForm.company,job:this.attestForm.job,introduce:this.attestForm.introduce}}).then(res => {
            if (res.success == "true") {
              this.success = true;
              this.hint = "提交成功！我们客服人员会尽快与您联系";
              this.toast_show = true;
            } else {
              this.success = false;
              this.hint = res.message;
              this.toast_show = true;
            }
          })
        } else {
          this.success = false;
          this.hint = "提交失败，请填写必填内容";
          this.toast_show = true;
          return false;
        }
      });
    },
    getDemand(){
      this.$axios.get('/jsp/wap/center/ctrl/jsonFeedbackList.jsp').then(res => {
        console.log(res);
        var demand = res.data.pageList
        demand.forEach(item => {
          if(item.status == '0'){
            item.status = '其他需求'
          }
        })
        this.otherDemand = demand
      })
    },
    get_type(index) {
      if (this.type[index].checked == true) {
        this.type[index].checked = false;
      } else {
        this.type.forEach(item => {
          item.checked = false;
        });
        this.type[index].checked = true;
      }

      if (index == 0) {
        this.table = true
        let { href } = this.$router.resolve({
          name: "memberAttest"
        });
        window.open(href, "_blank");
      }
      if (index == 1) {
        this.table = false
        this.placeholder = "请填写详细需求！例如专家的所属领域、行业等。";
        this.specialist_show = false;
        this.sub_type = 1
      }
      if (index == 2) {
        this.table = false
        this.specialist_show = true;
        this.sub_type = 2
      }
      if (index == 3) {
        this.table = false
        this.specialist_show = false;
        this.placeholder = "请详细填写您的需求：";
        this.sub_type = 3
      }
      if (index == 4) {
        this.table = true
        this.getDemand()
      }
    },
    handleDelete(row,index){
    let id = row.id
    this.$axios.get(`/jsp/wap/center/do/doDelFeedback.jsp?id=${id}`).then(res => {
      if(res.success == 'true'){
        this.otherDemand.splice(index,1)
        this.success = true;
        this.hint = "删除成功";
        this.toast_show = true;
      } else {
        this.success = false;
        this.hint = res.message;
        this.toast_show = true;
      }
    })
   }
  },
  
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
  font-size: 14px;
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