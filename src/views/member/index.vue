<template>
  <div>
    <img src="/static/img/hehuoren.jpg" alt="投融" class="member_img">
    <div class="w1200 clearfix">
      <div class="choose fll">
        <span class="top">选择</span>
        <span class="content">证券传媒投融连线</span>
      </div>
      <div class="help fll">
        <span class="top">助您</span>
        <span class="content">突破小圈子 &nbsp;快速精准对接</span>
      </div>
      <div class="finish flr">
        <span class="top">实现</span>
        <span class="content">全球视野 &nbsp;更多机会 &nbsp;更多选择</span>
        <span class="content1">更多通道 &nbsp;更高效率 &nbsp;更低成本</span>
        <span class="content2">更易成功</span>
      </div>
      <div class="vip fll">
        <button class="subBtn" @click="dialogFormVisible = true">联系我们开通VIP服务</button>
      </div>
      <div class="fll w1200">
        <p class="ser_title">服务内容</p>
        <div class="line"></div>
        <div class="clearfix ser">
          <div class="fll ser_left">
            <p v-for="(item,index) in seriver" :key="index" :class="item.choose ? 'active' : ''" class="ser_left_item" @click="get_ser(index)">
              <span>{{item.name}}</span>
            </p>
          </div>
          <div class="fll ser_right" v-show="right == 0">
            <p>1、寻找项目。根据资金方需求，在全球范围内寻找并筛选符合其发展战略方向的各类投资项目信息；</p>
            <p>2、寻找资金。根据项目方需求，在全球范围内寻找并筛选合适的投资人信息和资金信息；</p>
            <p>3、寻找专家。在全球范围内寻找并筛选外部专家信息，供企业参考选聘；</p>
            <p>4、寻找人才。在全球范围内寻找并筛选客户所需的高级人才信息，供企业参考选聘；</p>
            <p>5、寻找政策。在全球范围内寻找并筛选与企业相关的政策信息；</p>
            <p>6、商机提示。为企业作出商机提示及投资建议。</p>
            <p>以上信息定期形成信息简报并推送，推送如遇重要信息则通过即时快报即时发送。</p>
          </div>
          <div class="fll ser_right" v-show="right == 1">
            <p>对信息简报和即时快报中推送的项目、投资人、专家及高级人才，平台可提供</p>
            <p>商业衔接服务，安排项目方、投资人、专家及高级人才、政府相关部门等进行直接</p>
            <p>接洽，接洽的方式包括电话沟通、视频沟通、见面洽谈和现场考察等。</p>
          </div>
          <div class="fll ser_right" v-show="right == 2">
            <p>根据上市公司、私募机构等要求，平台按照精准推送的原则将其投资、融资、</p>
            <p>战略合作等需求信息定向发送给符合条件的潜在合作者。</p>
          </div>
          <div class="fll ser_right" v-show="right == 3">
            <p>1、小型专题研讨会。平台定期举行小型专题研讨会，会议将邀请国内外企业家、</p>
            <p>科技专家、投行高管、政府官员、跨界专家、法律和财税大咖等就特定行业、企业</p>
            <p>经典案例和热点事件等进行专题研讨和分享。</p>
            <p>2、大型主题会议。由证券传媒主办的各类大型年度会议。</p>
          </div>
          <div class="fll ser_right" v-show="right == 4">
            <p>1、资金解决建议方案及指定项目的投融资撮合；</p>
            <p>2、私人订制专项研讨会或项目研讨会；</p>
            <p>3、项目路演服务；</p>
            <p>4、推广服务和招商引资服务；</p>
            <p>5、重大舆情提示及媒体沟通解决方案服务；</p>
            <p>6、企业培训服务；</p>
            <p>7、全球商务考察与商务接待，以及翻译服务等</p>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="开通会员服务" :visible.sync="dialogFormVisible" width="30%" :before-close="before_close">
      <div v-if="sub_Vip">
        <el-form :model="vipForm" :rules="rules" ref="vipForm">
          <el-form-item label="姓名" label-width="100" prop="name">
            <el-input v-model="vipForm.name"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="vipForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="单位名称" prop="company">
            <el-input v-model="vipForm.company"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="info" @click="apply('vipForm')">确认办理</el-button>
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
</template>

<script>
  export default {
    data() {
      return {
        sub_Vip: true,
        dialogFormVisible: false,
        success: false,
        hint: '',
        right: 0,
        seriver: [{ name: '信息服务', choose: true }, { name: '商业衔接服务', choose: false }, { name: '商业需求推广服务', choose: false }, { name: '研修服务', choose: false }, { name: '定制化增值服务', choose: false },],
        vipForm: {
          name: '',
          mobile: '',
          company: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          mobile: [
            {
              required: true,
              message: "请输入手机号码",
              trigger: "blur"
            },
            {
              validator: function (rule, value, callback) {
                if (/^1[34578]\d{9}$/.test(value) == false) {
                  callback(new Error("请输入正确的手机号"));
                } else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ],
          company: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      get_ser(index) {
        this.right = index
        if (this.seriver[index].choose) {
          this.seriver[index].choose = !this.seriver[index].choose
        } else {
          this.seriver.forEach(item => {
            item.choose = false
          });
          this.seriver[index].choose = true
        }
      },
      apply(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.get(`/jsp/wap/index/do/doApplyVip.jsp`, { params: { name: this.vipForm.name, mobile: this.vipForm.mobile, company: this.vipForm.company } }).then(res => {
              console.log("会员", res)
              if (res.success == "true") {
                this.success = true
                this.hint = '信息提交成功,平台将尽快为您办理'
                this.sub_Vip = false
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //    submitForm(formName) {
      //   this.$refs[formName].validate(valid => {
      //     if (valid) {
      //       this.$axios.get('/jsp/wap/center/do/doExpertRecommend.jsp',{params:{name:this.attestForm.name,mobile:this.attestForm.mobile,company:this.attestForm.company,job:this.attestForm.job,introduce:this.attestForm.introduce}}).then(res => {
      //         if (res.success == "true") {
      //           this.success = true;
      //           this.hint = "提交成功！我们客服人员会尽快与您联系";
      //           this.toast_show = true;
      //         } else {
      //           this.success = false;
      //           this.hint = res.message;
      //           this.toast_show = true;
      //         }
      //       })
      //     } else {
      //       this.success = false;
      //       this.hint = "提交失败，请填写必填内容";
      //       this.toast_show = true;
      //       return false;
      //     }
      //   });
      // },
      before_close() {
        this.dialogFormVisible = false;
        setTimeout(() => {
          this.sub_Vip = true;
        }, 1000)
      },
    }
  }
</script>

<style scoped lang="scss">
  .member_img {
    width: 100%;
    min-width: 1200px;
  }

  .choose {
    margin-top: 20px;
    width: 390px;
    height: 350px;
    background: url(/static/img/xuanze.jpg) no-repeat center;
    background-size: contain;
    position: relative;
    .top {
      position: absolute;
      top: 160px;
      left: 165px;
      font-size: 30px;
      font-family: "PingFang";
      color: rgb( 51, 51, 51);
      font-weight: 700;
    }
    .content {
      position: absolute;
      top: 210px;
      left: 110px;
      font-size: 22px;
      font-family: "PingFang";
      color: #999;
      line-height: 1.667;
    }
  }

  .help {
    margin-top: 20px;
    margin-left: 15px;
    width: 390px;
    height: 350px;
    background: url(/static/img/zhunin.jpg) no-repeat center;
    background-size: contain;
    position: relative;
    .top {
      position: absolute;
      top: 160px;
      left: 165px;
      font-size: 30px;
      font-family: "PingFang";
      color: rgb( 51, 51, 51);
      font-weight: 700;
    }
    .content {
      position: absolute;
      top: 210px;
      left: 70px;
      font-size: 22px;
      font-family: "PingFang";
      color: #999;
      line-height: 1.667;
    }
  }

  .finish {
    margin-top: 20px;
    width: 390px;
    height: 350px;
    background: url(/static/img/shixian.jpg) no-repeat center;
    background-size: contain;
    position: relative;
    .top {
      position: absolute;
      top: 160px;
      left: 165px;
      font-size: 30px;
      font-family: "PingFang";
      color: rgb( 51, 51, 51);
      font-weight: 700;
    }
    .content {
      position: absolute;
      top: 210px;
      left: 50px;
      font-size: 22px;
      font-family: "PingFang";
      color: #999;
      line-height: 1.667;
    }
    .content1 {
      position: absolute;
      top: 250px;
      left: 50px;
      font-size: 22px;
      font-family: "PingFang";
      color: #999;
      line-height: 1.667;
    }
    .content2 {
      position: absolute;
      top: 290px;
      left: 50px;
      font-size: 22px;
      font-family: "PingFang";
      color: #999;
      line-height: 1.667;
    }
  }

  .vip {
    margin-top: 20px;
    width: 1200px;
    height: 430px;
    background: url(/static/img/chonghuiyuan.jpg) no-repeat center;
    background-size: cover;
    position: relative;
  }

  .subBtn {
    height: 35px;
    color: #fff;
    line-height: 0.1;
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
    padding: 20px 10px;
    border-radius: 6px;
    position: absolute;
    bottom: 50px;
    right: 310px;
  }

  .ser_title {
    font-size: 26px;
    font-family: "PingFang";
    color: rgb( 51, 51, 51);
    font-weight: bold;
    text-align: center;
    margin-top: 60px;
    margin-bottom: 10px;
  }

  .line {
    margin: 0 auto;
    width: 55px;
    height: 5px;
    background: url(/static/img/xian.jpg) no-repeat center;
    background-size: contain;
  }

  .ser {
    margin: 40px 0;
    height: 284px;
  }

  .ser_left {
    margin-top: 20px;
    width: 230px;
    padding-right: 30px;
    box-sizing: border-box;
    border-right: 1px solid #cdcdcd;
    margin-right: 40px;
    span {
      padding-right: 10px;
    }
  }

  .ser_left_item {
    font-size: 22px;
    font-family: "PingFang";
    color: rgb( 51, 51, 51);
    font-weight: bold;
    text-align: right;
    cursor: pointer;
  }

  .ser_left_item:nth-child(1) {
    margin-top: 0;
  }

  .ser_right {
    font-size: 18px;
    font-family: "PingFang";
    color: rgb( 102, 102, 102);
  }

  .active {
    span {
      color: #005682;
      background: url(/static/img/di.png)no-repeat center;
      background-size: cover;
    }
  }

  .dialog-footer {
    margin-left: 120px;
  }
</style>