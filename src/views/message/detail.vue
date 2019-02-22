<template>
  <div class="bg-fa">
    <div class="w1200 clearfix">
      <div class="bread">
        <span>
          <router-link to="/home">首页 ></router-link>
        </span>
        <span>
          <router-link :to="{name:'message',query:{category:mesDetailData.category}}">投融资讯 ></router-link>
        </span>
        <span>
          <router-link :to="{name:'message',query:{category:mesDetailData.category}}">{{mesDetailData.categoryName}} ></router-link>
        </span>
        <span>{{$route.meta.title}}</span>
      </div>
      <div class="w870 fll mes_card" v-loading="loading">
        <p class="title">{{mesDetailData.title}}</p>
        <div class="about">
          <span class="about_item">{{mesDetailData.publishTimeStr}}</span>
          <span class="about_item">来源：{{mesDetailData.source}}</span>
          <span class="about_item">作者：{{mesDetailData.author}}</span>
          <span class="about_item">阅读：{{mesDetailData.showNum}}</span>
          <i class="like" @click="like" v-show="!like_show"></i>
          <i class="nolike" @click="nolike" v-show="like_show"></i>
          {{mesDetailData.greatNum}}
          <share :config="config" class="share_mes"></share>
        </div>
        <p class="contentHtml" v-html="mesDetailData.content"></p>
        <div class="discuss">
          <img :src="$url + avatar" alt="" class="avatar" v-if="avatar_show&&avatar != '/static/img/avatar-1.png'">
          <img :src="avatar" alt="" class="avatar" v-else-if="avatar_show&&avatar == '/static/img/avatar-1.png'">
          <p class="login" @click="login_in" v-else>登录</p>
          <textarea name="" id="" style="width:785px;" rows="3" placeholder="来说两句吧..." v-model="content"></textarea>
        </div>
        <div class="clearfix icon">
          <i class="face" @click="showEmoji = !showEmoji"></i>
          <div class="flr submitBtn" @click="submit_common">发布留言</div>
          <transition name="fade" mode="">
            <div class="emoji-box" v-if="showEmoji" >
              <el-button 
                class="pop-close" 
                :plain="true" 
                type="text"
                icon="el-icon-close"
                @click="showEmoji = false"></el-button>
                <vue-emoji
                  @select="selectEmoji">
                </vue-emoji>
              <span class="pop-arrow arrow"></span>
            </div>       
          </transition>
        </div>
        <div class="common_line">
          <span class="common">评论</span>
        </div>
        <p class="common_title" v-show="!com_show">最新评论</p>
        <div class="common_list clearfix" v-for="(item , index) in commonData" :key="index">
          <img :src="$url + item.headImgPath" alt="" class="common_img fll" v-if="item.headImgPath != ''">
          <img :src="avatar" alt="" class="common_img fll" v-else>
          <div class="fll common_item">
            <div class="clearfix">
              <span class="username fll">{{item.memberName}}</span>
              <span class="location fll ">[{{item.provinceStr}}网友]</span>
              <span class="beforeTime flr">{{item.beforeTime}}前</span>
            </div>
            <p class="content" v-html="emoji(item.content)"></p>
            <div class="clearfix">
              <span class="fll from">{{item.addTimeStr}}</span>
              <!-- <span class="flr reply" @click="sub_com_com(index)">回复</span> -->
            </div>
          </div>
          <!-- <div class="common_common fll clearfix" v-for="(common ,ind) in 5" :key="ind">
            <img :src="avatar" alt="" class="common_common_img fll">
            <div class="fll common_common_item">
              <div class="clearfix">
                <span class="username fll">{{item.memberName}}</span>
                <span class="location fll ">[{{item.provinceStr}}网友]</span>
                <span class="content">{{item.content}}</span>
              </div>
              <div class="clearfix common_common_time">
                <span class="fll from">{{item.addTimeStr}}</span>
                <span class="flr reply" @click="sub_com_com2(index)">回复</span>
              </div>
          </div>
          </div> -->
          <!-- <div class="fll" style="margin-left:60px;">
          <el-pagination
            small
            layout="total, prev, pager, next"
            :total="50">
          </el-pagination>
          </div> -->
          <!-- <div class="clearfix fll common_bottom" v-if="comm_input_show && comindex == index">
            <img :src="$url + avatar" alt="" class="common_img fll" >
            <div class="com_input fll">
            <el-input
              :rows="3"
              type="textarea"
              placeholder="请输入内容"
              v-model="common_content">
            </el-input>
            </div>
            <div class="sub_com_btn fll">发表评论</div>
          </div> -->
        </div>
        <!-- <button class="moreBtn" v-show="!commonData">查看更多</button> -->
        <p v-show="com_show" style="text-align:center;">暂无评论</p>
        <div class="mes_page">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
        </div>
      </div>
      <div class="w300 clearfix mes_list flr">
        <p class="mes">热门资讯
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

    <div class="lg_box" v-show="should_login" @click="should_login = false"></div>
    <Login :should_login="should_login"></Login>
  </div>
</template>

<script>
import * as Cookies from 'js-cookie'
import vueEmoji from '../../components/emoji.vue'

export default {
  components: {
    vueEmoji
  },
  data(){
    return {
      should_login:false,
      mesDetailData:{
        title:'投资界沙龙：共享经济——势不可挡 or 资本捧杀',
        time:'2017-06-06 11:20',
        weixin:'创业智库',
        author:'唐一',
        num:294,
        greatNum:0,
      },
      mesData: [
        {
          content:
            "“ofo小黄车退了么”成为了关注焦点；中移动受让中国民航信息5.01%股权"
        },
        {
          content:
            "“ofo小黄车退了么”成为了关注焦点；中移动受让中国民航信息5.01%股权"
        },
        {
          content:
            "“ofo小黄车退了么”成为了关注焦点；中移动受让中国民航信息5.01%股权"
        },
        {
          content:
            "“ofo小黄车退了么”成为了关注焦点；中移动受让中国民航信息5.01%股权"
        },
        {
          content:
            "“ofo小黄车退了么”成为了关注焦点；中移动受让中国民航信息5.01%股权"
        },
        {
          content:
            "“ofo小黄车退了么”成为了关注焦点；中移动受让中国民航信息5.01%股权"
        },
        {
          content:
            "“ofo小黄车退了么”成为了关注焦点；中移动受让中国民航信息5.01%股权"
        },
        {
          content:
            "“ofo小黄车退了么”成为了关注焦点；中移动受让中国民航信息5.01%股权"
        },
        {
          content:
            "“ofo小黄车退了么”成为了关注焦点；中移动受让中国民航信息5.01%股权"
        },
        {
          content:
            "“ofo小黄车退了么”成为了关注焦点；中移动受让中国民航信息5.01%股权"
        }
      ],
      commonData:[],
      content:"",
      com_show: false,
      toast_show:false,
      success:false,
      comm_input_show:false,
      hint:'',
      comindex:0,
      like_show:true,
      avatar_show:false,
      // commonData:[
      //   {
      //     avatar:'/static/img/avatar-1.png',
      //     username:'投融网友',
      //     location:'陕西省西安市',
      //     beforeTime:'10分钟前',
      //     content:'谢谢习主席',
      //     from:'投融连线平台',
      //     good:1,
      //   },
      //   {
      //     avatar:'/static/img/avatar-1.png',
      //     username:'投融网友',
      //     location:'陕西省西安市',
      //     beforeTime:'10分钟前',
      //     content:'谢谢习主席',
      //     from:'投融连线平台',
      //     good:1,
      //   },
      //   {
      //     avatar:'/static/img/avatar-1.png',
      //     username:'投融网友',
      //     location:'陕西省西安市',
      //     beforeTime:'10分钟前',
      //     content:'谢谢习主席',
      //     from:'投融连线平台',
      //     good:1,
      //   },
      // ],
      id:'',
      loading:false,
      newsloading:false,
      avatar:'/static/img/avatar-1.png',
      config:{
        // url                 : '', // 网址，默认使用 window.location.href
        // source              : '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        // title               : '', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        // description         : '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        // image               : '', // 图片, 默认取网页中第一个img标签
        sites               : ['qzone', 'qq', 'weibo','wechat'], // 启用的站点
        // disabled            : ['google', 'facebook', 'twitter','douban], // 禁用的站点
        wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
        wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
      },
      count:0,
      memberName:'投融用户',
      provinceStr:'中国',
      common_content:'',
      showEmoji: false,
    }
  },
  methods:{
    getData(){
      this.id = this.$route.query.id
      this.loading = true
      this.$axios.get(`/jsp/wap/trNews/ctrl/jsonNewsDetail.jsp?id=${this.id}`).then(res => {
        console.log("资讯",res)
        this.mesDetailData = res.data
        this.mesDetailData.greatNum = Number(res.data.greatNum)
        document.title = res.data.title
        this.loading = false
      })
      if(Cookies.get('userKey')){
        this.avatar_show = true
        this.$axios.get("/jsp/wap/center/ctrl/jsonUserInfo.jsp").then(res => {
          this.$store.commit("CHANGE_USERINFO", res.data.userInfo);
        });
      }
      if(Cookies.get('userKey') && this.$store.state.userinfo.headImgPath != ''){
        this.avatar = this.$store.state.userinfo.headImgPath
      }
      if(Cookies.get('userKey') && this.$store.state.userinfo.name != ''){
        this.memberName = this.$store.state.userinfo.name
      }
      if(Cookies.get('userKey') && this.$store.state.userinfo.provinceStr != ''){
        this.provinceStr = this.$store.state.userinfo.provinceStr
      }
    },
    //获取当前登录用户是否点赞
    getLike(){
      let id = this.$route.query.id
      this.$axios.get(`/jsp/wap/trNews/do/isGreat.jsp?id=${id}`).then(res => {
        if(res.data == '0'){
          this.like_show = false
        } else if(res.data == '1'){
          this.like_show = true
        } else {
          this.like_show = false
        }
      })
    },
    //获取新闻热评
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
    //获取评论的内容
    getCommonData(pn){
      let id = this.$route.query.id
      this.$axios.get(`/jsp/wap/trNews/ctrl/jsonCommentPage.jsp?id=${id}`,{params:{pageNumber:pn}}).then(res => {
        if(res.success == "true") {
          var commonData = res.data.pageList
          commonData.forEach(item => {
            var time = (new Date(item.addTimeStr)).valueOf()
            item.beforeTime = this.get_time_diff(time)
          })
          this.commonData = commonData
          this.count = Number(res.data.pagination.totalCount)
          if(commonData.length == 0){
            this.com_show = true
          }
        } else {
            this.com_show = true
        }
      })
    },
    submit_common(){
      if(Cookies.get('userKey')) {
        if(this.content != ''){
          let id = this.$route.query.id
          this.$axios.get('/jsp/wap/trNews/do/doComment.jsp',{params:{id,content:this.content}}).then(res => {
            if(res.success == 'true'){
              var newCommon = {
                beforeTime:'1秒',
                content:this.content,
                headImgPath:this.avatar,
                provinceStr:this.provinceStr,
                memberName:this.memberName
              }
              this.com_show = false
              this.commonData.unshift(newCommon)
              this.content = ''
              this.count += 1
            }
          })
        } else {
          this.success = false;
          this.hint = '不能发表空评论';
          this.toast_show = true;
        }    
      } else {
        // this.success = false;
        // this.hint = '登录后才能发表评论';
        // this.toast_show = true;
        this.should_login = true
      }
    },
    sub_com_com(index){
      if(Cookies.get('userKey')) {
        this.comindex = index
        this.comm_input_show = !this.comm_input_show
      } else {
        // this.success = false;
        // this.hint = '登录后才能发表评论';
        // this.toast_show = true;
        this.should_login = true
      }
    },
    sub_com_com2(index){
      if(Cookies.get('userKey')) {
        this.comindex = index
        this.comm_input_show = true
      } else {
        // this.success = false;
        // this.hint = '登录后才能发表评论';
        // this.toast_show = true;
        this.should_login = true
      }
    },
    //换页
    handleCurrentChange(val) {
      this.getCommonData(val)
    },
    //获取发布时间差
    get_time_diff(time) {
      var diff = '';
      var time_diff = new Date().getTime() - time; //时间差的毫秒数 
      
      //计算出相差的月数
      var months = Math.floor(time_diff/(30 * 24 * 3600 * 1000))
      //计算出相差天数 
      var days = Math.floor(time_diff / (24 * 3600 * 1000));
      // if (days > 0) {
      // diff += days + '天';
      // }
      //计算出小时数 
      var leave1 = time_diff % ( 24 * 3600 * 1000); 
      var hours = Math.floor(leave1 / (3600 * 1000));
      // if (hours > 0) {
      // diff += hours + '小时';
      // } else {
      // if (diff !== '') {
      //   diff += hours + '小时';
      // }
      // }
      //计算相差分钟数 
      var leave2 =leave1 % (3600 * 1000);
      var minutes = Math.floor(leave2 / (60 * 1000));
      // if (minutes > 0) {
      // diff += minutes + '分';
      // } else {
      // if (diff !== '') {
      //   diff += minutes + '分';
      // }
      // }
      //计算相差秒数 
      var leave3 = leave2%(60*1000);
      var seconds = Math.round(leave3/1000);
      // if (seconds > 0) {
      // diff += seconds + '秒';
      // } else {
      // if (diff !== '') {
      //   diff += seconds + '秒';
      // }
      // }
      if(months >= 1){
        diff = months + '月';
      } else if (days >= 1){
        diff = days + '天'
      } else if (hours >= 1){
        diff = hours + '小时'
      } else if (minutes >= 1){
        diff = minutes + '分'
      } else if (seconds >= 1){
        diff = seconds + '秒'
      } else {
        if (diff !== '') {
          diff += seconds + '秒';
        }
      }
      return diff;
      },
    toMessagePage(){
      let {href} = this.$router.resolve({
          name: "message",
      });
      window.open(href, '_blank');
    },
    //资讯页详情
    toMessageDetailPage(id){
      let {href} = this.$router.resolve({
          name: "messageDetail",
          query: {id}
      });
      window.open(href, '_blank');
    },
    //点赞
    like(){
      if(Cookies.get('userKey')) {
          let id = this.$route.query.id
          this.$axios.get(`/jsp/wap/trNews/do/doGreat.jsp?id=${id}`).then(res => {
            if(res.success == 'true'){
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
    //取消点赞
    nolike(){
        if(Cookies.get('userKey')) {
          let id = this.$route.query.id
          this.$axios.get(`/jsp/wap/trNews/do/cancelGreat.jsp?id=${id}`).then(res => {
            if(res.success == 'true'){
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
    login_in(){
      // let { href } = this.$router.resolve({
      //   name: "login"
      // });
      // window.open(href, "_blank");
        this.should_login = true
    },
    //表情
    selectEmoji (code) {
      this.showEmoji = false
      this.content += code
    },
  },
  created(){
    this.getData()
    this.getLike()
    this.getNewsList()
    this.getCommonData()
  }
};
</script>

<style scoped lang="scss">
.contentHtml {
  min-height: 500px;
}
//详情
.mes_card {
  padding: 30px 20px;
  margin-bottom: 20px;
  background: #fff;
  box-sizing: border-box;
  .title {
  font-size: 30px;
  font-family: "Microsoft YaHei";
  color: rgb( 51, 51, 51 );
  line-height: 0.8;
  margin: 0 0 40px;
  }
  .about {
    position: relative;
    font-size: 14px;
    color: #999;
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
}

//信息列表
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
      color:#005982;
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
  overflow: hidden;/*超出部分隐藏*/
  white-space: nowrap;/*不换行*/
  text-overflow:ellipsis;
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
}

//讨论
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
    resize:none;
    overflow:hidden;
    position: absolute;
    left:20px;
    top: 55px;
  }
  .login {
    font-size: 14px;
    font-family: "Microsoft YaHei";
    color: rgb( 0, 89, 130 );
    position: absolute;
    left:16px;
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
      color:#ccc;
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
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }
  }
}

.common_common {
  width: 750px;
  height: 50px;
  margin-left: 60px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.common_common_item {
  margin-left: 10px;
  width: 700px;
  .username {
      font-size: 16px;
      color: #005982;
      margin-right: 10px;
    }
    .location {
      font-size: 14px;
      line-height: 1.4;
      color:#ccc;
    }
    .beforeTime {
      color: #ccc;
      font-size: 14px;
      line-height: 1.4;
    }
    .content {
      display: inline-block;
      width: 500px;
      margin-left: 20px;
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
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }
}
.common_common_time {
  width: 250px;
  margin-top: 10px;
}
.common_common_img {
  display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #f0f0f0;
}
.moreBtn {
  display:block;
  margin:0 auto;
  width: 190px;
  height: 50px;
  text-align:center;
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
  outline:none
}
.moreBtn:active {
  background: #fff;
  border-color: #409eff;
  color: #409eff;
}

.avatar {
  width:46px;
  height: 46px;
  margin-left: 6px;
  border-radius: 50%;
}

.share_mes {
  position: absolute;
  right: 0;
  top: -20px;
}

.com_input {
  margin-left: 20px;
  width: 500px;
}

.common_bottom {
  width:750px; 
  margin-left:60px;
  padding: 20px;
}

.sub_com_btn {
  width: 65px;
  height: 75px;
  box-sizing: border-box;
  padding: 20px 15px;
  border-radius: 4px;
  border: 1px solid #005982;
  background: #005982;
  color: #f1f1f1;
  margin-left: 10px;
  cursor: pointer;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

/deep/ {
  .contentHtml {
    line-height: 1.5!important;
  }
}

//分页
.mes_page {
  margin: 70px 0 60px;
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

//表情
.face {
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url(/static/img/biaoqing.png)no-repeat center;
  background-size: contain;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 10px;
}
.icon {
  position: relative;
}

.emoji-box {
      position: absolute;
      z-index: 10;
      left: -10px;
      top: 24px;
      box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.2);
      background: white;
      .el-button {
        position: absolute;
        border: none;
        right: 12px;
        top: 0;
        z-index: 10;
      }
      .arrow {
        left: 10px;
      }
    }

    
.fade-enter-active, .fade-leave-active { transition: opacity .5s; }
.fade-enter, .fade-leave-active { opacity: 0; }
.fade-move { transition: transform .4s; }

.list-enter-active, .list-leave-active { transition: all .5s; }
.list-enter, .list-leave-active { opacity: 0; transform: translateX(30px); }
.list-leave-active { position: absolute !important; }
.list-move { transition: all .5s;}
</style>