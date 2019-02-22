<template>
  <div class="bg-fa">
    <div class="w1200 clearfix">
      <div class="bread">
        <span>
          <router-link to="/home">首页 ></router-link>
        </span>
        <span>
          <router-link to="/activity">活动 ></router-link>
        </span>
        <span>{{$route.meta.title}}</span>
      </div>
      <div class="w870 fll mes_card" v-loading="loading">
        <p class="title">{{mesDetailData.title}}</p>

        <p class="about">
          <!-- <span class="about_item">活动时间：{{mesDetailData.regStartTimeStr.slice(0,10)}} ~ {{mesDetailData.regEndTimeStr.slice(0,10)}}</span> -->
          <span class="about_item" v-if="mesDetailData&&mesDetailData.startTimeStr">活动时间：{{mesDetailData.startTimeStr.slice(0,10)}} ~ {{mesDetailData.endTimeStr.slice(0,10)}}</span>

          <span class="about_item">主办：{{mesDetailData.speaker}}</span>
          <span class="about_item">地址：{{mesDetailData.address}}</span>
          <span class="about_item">类型：{{mesDetailData.categoryName}}</span>
          <i class="like" @click="like" v-show="!like_show"></i>
          <i class="nolike" @click="nolike" v-show="like_show"></i>
          {{mesDetailData.greatNum}}
          <share :config="config" class="share_mes"></share>
          <!-- <span>111</span> -->
          <el-button v-if="follow" class="sendBtn" @click="nofollow">已关注</el-button>
          <el-button plain v-else class="focus" @click="gofollow">关注</el-button>
        </p>
        <p class="about">
          <i class="time"></i>
          <span v-if="mesDetailData&&mesDetailData.regStartTimeStr">
            报名时间：{{mesDetailData.regStartTimeStr.slice(0,10)}} ~ {{mesDetailData.regEndTimeStr.slice(0,10)}}

          </span>
        </p>
        <p class="contentHtml" v-html="mesDetailData.content"></p>
        <button class="moreBtn" @click="act_show" v-show="mesDetailData.status == 1">报名参加</button>
        <button class="moreBtn1" v-show="mesDetailData.status == 0">活动预告</button>
        <button class="moreBtn1" v-show="mesDetailData.status == -1">往期回顾</button>
      </div>
      <div class="w300 clearfix mes_list flr">
        <p class="mes">
          热门资讯
          <span class="mes_more flr" @click="toMessagePage">更多></span>
        </p>
        <div class="mes_title" v-loading="newsloading">
          <div v-for="(item , index) in mesData" :key="index" class="mes_content" @click="toMessageDetailPage(item.id)">
            <span class="cl-0">
              <span class="count" :class=" index <= 2 ? 'hot' : '' ">{{index + 1}}</span>
              {{item.title}}
            </span>
          </div>
        </div>
      </div>
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
        should_login: false,
        mesDetailData: {
          // title:'最新中国联通微博关注领取500M手机流量奖励 非秒到',
          // time:'2018-12-28 10:50:53',
          // weixin:'创业智库',
          // author:'微博活动网',
          // num:294,
          // contentHtml:'<article id="post-71044" class="post-71044 post type-post status-publish format-standard has-post-thumbnail hentry category-weibo category-youjiang"><div class="entry"><div class="entry-head"><h1 class="entry-title"></h1><div class="entry-info"><span> </span><span class="dot"></span><span></span></div></div><div class="wpcom_ad_wrap"></div><div class="entry-content clearfix"><p><span style="color: #ff7b33;"><strong>活动介绍：</strong></span></p><p><span style="text-indent: 2em;">活动期间参与中国联通举办的微博关注送流量活动，通过成功关注【中国联通】官方微博，再点击他的应用【联通流量银行】右边的【去看看】按钮进去活动页面输入联通手机号码均可领取到一份500M手机流量奖励，所得流量官方规则是4个工作日到账。</span><span style="text-indent: 2em;">活动资讯网</span><span style="text-indent: 2em;">的网友快去参加试试运气吧</span>！</p><p><strong><span style="color: #ff7b33;">活动时间：</span></strong></p><p>2018年12月27日-结束时间未知<span style="color: #ff0000;">现在是新的一期，所以再发到前面来，之前领取过的老用户也可以领取</span></p><p><strong><span style="color: #ff7b33;">活动奖励：</span></strong></p><p>500M中国联通手机流量</p><p><strong><span style="color: #ff7b33;"><span style="color: #ff0000;">立即参与：打开新浪微博app扫描以下二维码关注中国联通微博参与，或点击下面的链接参与</span></span></strong></p><p>小编提示详细流程：</p><p>1，新浪微博app扫描以下二维码进入点击左下角的【关注】按钮成功关注（已经关注过的先取消关注再重新关注）</p><p>2，再点击【联系企业】进去点击推送的链接进去活动页面输入中国联通手机号码并接收验证码领取流量</p><p>如果不方便扫码的话就复制该链接到自己的微博app里面再点击参与：http://weibo.com/chinaunicom</p><p><img class="alignnone size-full wp-image-104357" src="https://pic.huodong5.com/wp-content/uploads/2018/08/20181228104537.jpg" alt="最新中国联通微博关注领取500M手机流量奖励 非秒到" width="216" height="221" /></p><p><img class="alignnone size-full wp-image-104358" src="https://pic.huodong5.com/wp-content/uploads/2018/08/20181228104652.jpg" alt="最新中国联通微博关注领取500M手机流量奖励 非秒到" width="609" height="540" /></p></div><div class="entry-footer"><div class="entry-tag"></div><div class="entry-action"><div class="btn-zan" data-id="71044"><i class="fa fa-thumbs-up"></i> <span class="entry-action-num"></span></div></div><div class="entry-bar"><div class="entry-bar-inner clearfix"><div class="info text-center"><div class="info-item meta"><a class="meta-item j-heart" href="javascript:;" data-id="71044"><i class="fa fa-heart"></i><span class="data"></span></a><a class="meta-item" href="#comments"><i class="fa fa-comment"></i><span class="data"></span></a></div><div class="info-item share"><a class="meta-item mobile j-mobile-share" href="javascript:;" data-id="71044"><i class="fa fa-share-alt"></i> </a><a class="meta-item wechat" href="javascript:;"><i class="fa fa-wechat"></i><span class="wx-wrap"><span class="j-qrcode" data-text="https://www.huodong5.com/71044.html"></span><span></span></span></a></article>'
        },
        id:"",
        follow: 0,
        appleform: {
          memberName: "",
          memberMobile: "",
          remark: ""
        },
        loading: false,
        newsloading: false,
        showApply: false,
        config: {
          // url                 : '', // 网址，默认使用 window.location.href
          // source              : '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
          // title               : '', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
          // description         : '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
          // image               : '', // 图片, 默认取网页中第一个img标签
          sites: ["qzone", "qq", "weibo", "wechat"], // 启用的站点
          // disabled            : ['google', 'facebook', 'twitter','douban], // 禁用的站点
          wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
          wechatQrcodeHelper:
            "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>"
        },
        hint: '',
        success: false,
        toast_show: false,
        like_show: true,
        sub_act: true,
        rule: {
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
        }
      };
    },
    methods: {
      getData() {
        this.id = this.$route.query.id;
        this.loading = true;
        this.$axios
          .get(`/jsp/wap/trActivity/ctrl/jsonActivityDetail.jsp?id=${this.id}`)
          .then(res => {
            this.mesDetailData = res.data;
            this.mesDetailData.greatNum = Number(res.data.greatNum)
            document.title = res.data.title
            this.loading = false;
          });
      },
      // apply(e,id) {
      //   if(e == 0){
      //     this.$notify.error({
      //       title: "抱歉",
      //       message: "活动尚未开始"
      //     });/*  */
      //   } else if (e == 1) {
      //   // this.$router.push({name:'activityDetail',query:{id}})
      //     this.showApply = true
      //   } else if (e == 3){
      //     this.$notify.error({
      //       title: "抱歉",
      //       message: "活动已结束"
      //     });
      //   }
      // },
      getNewsList() {
        this.newsloading = true;
        this.$axios.get("/jsp/wap/trNews/ctrl/jsonHotNewsList.jsp").then(res => {
          if (res.success == "true") {
            this.mesData = res.data;
            this.newsloading = false;
          }
        });
      },
      getLike() {
        let id = this.$route.query.id
        this.$axios.get(`/jsp/wap/trActivity/do/isGreat.jsp?id=${id}`).then(res => {
          if (res.data == '0') {
            this.like_show = false
          } else if (res.data == '1') {
            this.like_show = true
          } else {
            this.like_show = false
          }
        })
      },
      sub_apply(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let activityId = this.$route.query.id;
            this.$axios
              .get("/jsp/wap/trActivity/do/doSignUp.jsp", {
                params: {
                  activityId,
                  memberName: this.appleform.memberName,
                  memberMobile: this.appleform.memberName,
                  remark: this.appleform.remark
                }
              })
              .then(res => {
                if (res.success == 'true') {
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
      act_show() {
        if (Cookies.get('userKey')) {
          this.showApply = true
        } else {
          // this.success = false;
          // this.hint = '登录后才能报名哦';
          // this.toast_show = true;
          this.should_login = true
        }
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
      like() {
        if (Cookies.get('userKey')) {
          let id = this.$route.query.id
          this.$axios.get(`/jsp/wap/trActivity/do/doGreat.jsp?id=${id}`).then(res => {
            if (res.success == 'true') {
              this.like_show = true
              this.mesDetailData.greatNum += 1
            } else {
              this.success = false;
              this.hint = '点赞失败';
              this.toast_show = true;
            }
          })
        } else {
          // this.success = false;
          // this.hint = '登录后才能点赞哦';
          // this.toast_show = true;
          this.should_login = true
        }
      },
      nolike() {
        if (Cookies.get('userKey')) {
          let id = this.$route.query.id
          this.$axios.get(`/jsp/wap/trActivity/do/cancelGreat.jsp?id=${id}`).then(res => {
            if (res.success == 'true') {
              this.like_show = false
              this.mesDetailData.greatNum -= 1
            } else {
              this.success = false;
              this.hint = '取消失败';
              this.toast_show = true;
            }
          })
        } else {
          // this.success = false;
          // this.hint = '登录后才能点赞哦';
          // this.toast_show = true;
          this.should_login = true
        }
      },
      before_close() {
        this.showApply = false;
        setTimeout(() => {
          this.sub_act = true;
        }, 1000)
      },
      // 获取关注状态
      getFollow() {
        this.$axios
          .get(`/jsp/wap/trActivity/ctrl/jsonIsFollow.jsp?id=${this.id}`)
          .then(res => {
            this.follow = Number(res.data);
          });
      },
      //关注
      gofollow() {
        this.$axios.get(`/jsp/wap/trActivity/do/doFollow.jsp?id=${this.id}`).then(res => {
          console.log("关注", res)
          if (res.success == "true") {  
            this.success = true;
            this.hint = "关注成功";
            this.toast_show = true;
            this.follow = 1;
          } else {
            this.success = false;
            this.hint = res.message;
            this.toast_show = true;
          }
        });
      },
      //取消关注
      nofollow() {
        this.$axios
          .get(`/jsp/wap/trActivity/do/doUnfollow.jsp?id=${this.id}`)
          .then(res => {
            if (res.success == "true") {
              this.follow = 0;
              this.success = true;
              this.hint = "取消成功";
              this.toast_show = true;
            } else {
              this.success = false;
              this.hint = "取消失败";
              this.toast_show = true;
            }
          });
      },
    },
    created() {
      this.getData();
      this.getNewsList();
      this.getLike()
      this.getFollow()
    }
  };
</script>

<style scoped lang="scss">
  //详情
  .mes_card {
    padding: 30px 20px;
    margin-bottom: 20px;
    background: #fff;
    box-sizing: border-box;
    .title {
      font-size: 30px;
      font-family: "Microsoft YaHei";
      color: rgb(51, 51, 51);
      line-height: 0.8;
      margin: 0 0 40px;
    }
    .about {
      font-size: 14px;
      color: #999;
      position: relative;
      .about_item {
        padding-right: 15px;
      }
    }
    /deep/ {
      .contentHtml {
        img {
          max-width: 830px !important;
        }
      }
    }
  } //信息列表
  .mes_list {
    padding: 20px;
    background: #fff;
    box-sizing: border-box;
    .mes {
      font-size: 18px;
      font-family: "Microsoft YaHei";
      color: rgb(51, 51, 51);
      line-height: 1.333;
      text-align: left;
      margin-top: 0;
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
    border-top: 1px dashed #d9d9d9;
  }

  .mes_content {
    cursor: pointer;
    font-size: 14px;
    padding: 20px 0;
    border-bottom: 1px solid #d9d9d9;
    color: #d9d9d9;
    overflow: hidden;
    /*超出部分隐藏*/
    white-space: nowrap;
    /*不换行*/
    text-overflow: ellipsis;
    .count {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: #ccc;
      color: #fff;
      text-align: center;
      line-height: 1.5;
    }
    .hot {
      background: #005982;
    }
  }

  .mes_title .mes_content:last-child {
    border: none;
    padding-bottom: 0;
  }

  .mes_content:hover {
    color: #005982;
  }

  .cl-0 {
    color: #000;
  }

  .cl-0:hover {
    color: #005982;
  } //讨论
  .discuss {
    width: 100%;
    height: 140px;
    margin-top: 40px;
    background: url(/static/img/textarea-1.png) no-repeat center;
    background-size: contain;
    position: relative;
    textarea {
      outline: none;
      -moz-outline: none;
      appearance: none;
      border: 0;
      resize: none;
      overflow: hidden;
      position: absolute;
      left: 20px;
      top: 55px;
    }
    .login {
      font-size: 14px;
      font-family: "Microsoft YaHei";
      color: rgb(0, 89, 130);
      position: absolute;
      left: 16px;
      top: 2px;
      cursor: pointer;
      color: #005982;
    }
  }

  .submitBtn {
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
    margin-top: 10px;
    transition: 0.1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    border-radius: 55px;
  }

  .common_line {
    width: 100%;
    height: 30px;
    margin-top: 20px;
    background: url(/static/img/pinglun.png) no-repeat center;
    background-size: contain;
    position: relative;
    .common {
      position: absolute;
      top: 8px;
      left: 17px;
      color: #005982;
    }
  }

  .common_title {
    padding-left: 15px;
    border-left: 3px solid #005982;
    color: #005982;
    margin: 20px 0;
  }

  .common_list {
    padding-bottom: 15px;
    margin-bottom: 20px;
    border-bottom: 1px dashed #ccc;
    .common_img {
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #f0f0f0;
    }
    .common_item {
      width: 767px;
      margin-left: 20px;
      .username {
        font-size: 16px;
        color: #005982;
        margin-right: 10px;
      }
      .location {
        font-size: 14px;
        line-height: 1.4;
        color: #ccc;
      }
      .beforeTime {
        color: #ccc;
        font-size: 14px;
        line-height: 1.4;
      }
      .content {
        font-family: "Microsoft YaHei";
      }
      .from {
        color: #ccc;
        font-size: 14px;
      }
      .reply {
        color: #999;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }

  .moreBtn {
    display: block;
    margin: 0 auto;
    width: 190px;
    height: 50px;
    text-align: center;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    color: #005982;
    line-height: 1.333;
    padding: 10px 0;
    border: 1px solid #005982;
    border-radius: 95px;
    cursor: pointer;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    background: #fff;
    outline: none;
  }

  .moreBtn:active {
    background: #fff;
    border-color: #409eff;
    color: #409eff;
  }

  .moreBtn1 {
    display: block;
    margin: 0 auto;
    width: 190px;
    height: 50px;
    text-align: center;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    color: #999;
    line-height: 1.333;
    padding: 10px 0;
    border: 1px solid #999;
    border-radius: 95px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    background: #fff;
    outline: none;
  }

  .contentHtml {
    min-height: 450px;
  }

  .applyBtn {
    width: 100px;
    height: 40px;
    color: #fff;
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
    padding: 12px 10px;
    border-radius: 4px;
    line-height: 1;
  }

  .cancle {
    width: 80px;
    height: 40px;
    color: #000;
    line-height: 0.425;
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
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
    padding: 12px 10px;
    border-radius: 4px;
  }

  .cancle:hover {
    border-color: #409eff;
    color: #409eff;
  }

  .share_mes {
    position: absolute;
    right: 0;
    top: -70px;
  }

  .focus {
    color: #005982;
    border-color: #005982;
    width: 100px;
    display: inline-block;
    margin-left: 20px;
  }

  .sendBtn {
    background: #005982;
    color: #fff;
    width: 100px;
    display: inline-block;
    margin-left: 20px;
  }
  .toast_content {
    text-align: center;
    font-size: 22px;
    font-weight: 700;
}
</style>