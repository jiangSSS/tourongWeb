<template>
  <div>
    <div class="lg_box" v-show="should_login" @click="should_login = false"></div>
    <Login :should_login="should_login" :login_show="login_show"></Login>
    <div class="bg-89">
      <div class="w1200">
        <span class="txt-202" v-show="!login">您好，请
          <span @click="login_in" style="cursor:pointer">登录</span>!
        </span>
        <span class="txt-202" v-show="login">
          您好，欢迎您
        </span>
        <span class="txt-202 register" @click="login_re" v-show="!login">免费注册</span>
        <span class="txt-202 register" v-show="login" style="color:#fff;" @click="login_out">退出登录</span>
        <el-dropdown placement="bottom">
          <span class="invest el-dropdown-link">
            <i></i>
            我是投资人
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toMymoney">发布资金</el-dropdown-item>
            <el-dropdown-item @click.native="toMemberAttest">认证投资人</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push('/message')">创投资讯</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push('/project')">找项目</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span style="display:inline-block;width:40px;"></span>
        <el-dropdown placement="bottom">
          <span class="gem el-dropdown-link">
            <i></i>
            我是创业人
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toMyproject">创建项目</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push('/message')">创投资讯</el-dropdown-item>
            <el-dropdown-item @click.native="toMemberAttest">认证创业者</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push('/money')">找投资</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="mine el-dropdown-link flr" @click="person">
          <i></i>
          个人中心
        </span>
        <span class="message el-dropdown-link flr" @click="inform">
          <i></i>
          消息通知
        </span>
      </div>
    </div>
    <div class="header_2">
      <div class="w1200 nav clearfix">
        <img src="/static/img/logo-1.png" alt="投融连线" class="fll" @click="$router.push('/home')" style="cursor:pointer">
        <div class="navMenu fll">
          <router-link to="/home">首页</router-link>
        </div>
        <div class="navMenu fll">
          <router-link to="/money" @click.native="flushCom1">找资金</router-link>
        </div>
        <div class="navMenu fll">
          <router-link to="/project" @click.native="flushCom2">选项目</router-link>
        </div>
        <div class="navMenu fll">
          <router-link to="/message">投融资讯</router-link>
        </div>
        <div class="navMenu fll">
          <router-link to="/activity">活动</router-link>
        </div>
        <div class="navMenu fll">
          <router-link to="/member">会员</router-link>
        </div>
        <div class="navMenu fll" style="color:#999;">专家团队</div>
        <div class="navMenu fll" style="color:#999;">路演</div>
        <div class="search fll">
          <form action class="form fll">
            <select v-model="type" class="select">
              <option value="1" class="option">找资金</option>
              <option value="2" class="option">找项目</option>
              <option value="3" class="option">找资讯</option>
            </select>
            <input type="text" placeholder="输入关键字" class="input" v-model="title" @keyup.enter="search">
            <input id="hiddenText" type="text" style="display:none" @keyup.enter="search" />
            <img src="/static/img/search.png" alt="" class="search-button" @click="search">
          </form>
          <img src="/static/img/kefu.png" alt="" class="fll" style="margin-left:5px;cursor:pointer;" @click="tokefu">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as Cookies from 'js-cookie'
  // import Vue from 'vue'
  // import vSelect from 'vue-select'
  // Vue.component('v-select', vSelect)

  export default {
    data() {
      return {
        login_show: true,
        should_login: false,
        login: false,
        type: '1',
        title: '',
        timer: null
      }
    },
    methods: {
      login_now() {
        if (Cookies.get('userKey')) {
          this.login = true
        } else {
          this.login = false
        }
      },
      login_out() {
        this.$confirm('即将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          Cookies.remove('userKey')
          this.login = false
          setTimeout(() => {
            window.history.go(0)
          }, 50)
        }).catch(() => {

        });


      },
      person() {
        if (Cookies.get('userKey')) {
          let { href } = this.$router.resolve({
            name: "person",
          });
          window.open(href, '_blank');
        } else {
          //  this.$router.push('/login')
          this.should_login = true
        }
      },
      toMymoney() {
        if (Cookies.get('userKey')) {
          this.$router.push('/person/applyMoney')
        } else {
          // this.$router.push('/login')
          this.should_login = true
        }
      },
      toMemberAttest() {
        if (Cookies.get('userKey')) {
          this.$router.push('/person/memberAttest')
        } else {
          // this.$router.push('/login')
          this.should_login = true
        }
      },
      toMyproject() {
        if (Cookies.get('userKey')) {
          this.$router.push('/person/applyProject')
        } else {
          // this.$router.push('/login')
          this.should_login = true
        }
      },
      tokefu() {
        window.open('https://tb.53kf.com/code/client/10193554/1', '_blank')
      },
      inform() {
        if (Cookies.get('userKey')) {
          let { href } = this.$router.resolve({
            name: "inform",
          });
          window.open(href, '_blank');
        } else {
          //  this.$router.push('/login')
          this.should_login = true
        }
      },
      search() {
        if (this.type == '1') {
          let { href } = this.$router.resolve({
            name: "searchMoney",
            query: {
              title: this.title,
            }
          });
          window.open(href, '_blank');

        } else if (this.type == '2') {
          let { href } = this.$router.resolve({
            name: "searchProject",
            query: {
              title: this.title,
            }
          });
          window.open(href, '_blank');
        } else if (this.type == '3') {
          let { href } = this.$router.resolve({
            name: "searchMessage",
            query: {
              title: this.title,
            }
          });
          window.open(href, '_blank');
        }
      },
      login_in() {
        let { href } = this.$router.resolve({
          name: "login"
        });
        window.open(href, "_blank");
        // this.login_show = true
        // this.should_login = true
      },
      login_re() {
        // this.login_show = false
        // this.should_login = true
        let { href } = this.$router.resolve({
          name: "login"
        });
        window.open(href, "_blank");
      },
      setTimer: function () {
        this.timer = setInterval(() => {
          if (Cookies.get("userKey") == undefined && this.$route.meta.authority) {
            this.login = false
            this.$router.push({ name: 'home' })
          }
        }, 1000)
      },
      flushCom1() {
        if (this.$route.name == 'money') {
          this.$router.go(0);
        } else {
          this.$router.push('/money')
        }
      },
      flushCom2() {
        if (this.$route.name == 'project') {
          this.$router.go(0);
        } else {
          this.$router.push('/project')
        }
      },
    },
    created() {
      this.setTimer()
      this.login_now()
    }
  };
</script>

<style scoped lang="scss">
  // 最上面的背景
  .bg-89 {
    width: 100%;
    min-width: 1200px;
    height: 30px;
    background-color: #898989;
    font-size: 14px;
    line-height: 28px;
  } // 字体颜色
  .txt-202 {
    font-family: "Microsoft YaHei";
    color: rgb(201, 202, 202);
  } // 登录页跳转颜色
  a {
    color: #e5e5e5;
  }

  .register {
    margin-left: 15px;
    margin-right: 600px;
    cursor: pointer;
  }

  .invest {
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    position: relative;
    i {
      display: inline-block;
      position: absolute;
      bottom: 2px;
      left: -23px;
      width: 17px;
      height: 13px;
      background: url(/static/img/zuanshi.png) no-repeat center;
      background-size: contain;
    }
  }

  .gem {
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    position: relative;
    i {
      display: inline-block;
      position: absolute;
      bottom: 2px;
      left: -23px;
      width: 17px;
      height: 14px;
      background: url(/static/img/zhiwu.png) no-repeat center;
      background-size: contain;
    }
  }

  .message {
    color: #e5e5e5;
    cursor: pointer;
    position: relative;
    i {
      display: inline-block;
      position: absolute;
      bottom: 6px;
      left: -23px;
      width: 17px;
      height: 17px;
      background: url(/static/img/xiaoxi.png) no-repeat center;
      background-size: contain;
    }
  }

  .mine {
    margin-left: 40px;
    color: #e5e5e5;
    cursor: pointer;
    position: relative;
    i {
      display: inline-block;
      position: absolute;
      bottom: 6px;
      left: -20px;
      width: 17px;
      height: 16px;
      background: url(/static/img/geren.png) no-repeat center;
      background-size: contain;
    }
  } //logo及菜单行
  .nav {
    padding: 30px 0;
  }

  .navMenu {
    margin: 10px 0 10px 30px;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    color: rgb(62, 58, 57);
    cursor: pointer;
    a {
      font-size: 18px;
      font-family: "Microsoft YaHei";
      color: rgb(62, 58, 57);
      padding-bottom: 15px;
    }
  }

  .navMenu:hover {
    color: rgb(0, 89, 130);
  } // 搜索框
  .search {
    height: 40px;
    margin-left: 95px;
  }

  .form {
    position: relative;
    font-size: 14px;
    width: 240px;
    height: 40px;
    background: #e6e6e6;
    padding-top: 4px;
    box-sizing: border-box;
  }

  .input {
    outline: none;
    border: 0;
    width: 130px;
    height: 30px;
    margin-left: 10px;
    background: #e6e6e6;
  }

  .select {
    outline: none;
    -moz-outline: none;
    appearance: none;
    border: 0;
    width: 68px;
    padding-left: 10px;
    padding-bottom: 6px; // // background: #e6e6e6;
    background: rgba(0, 0, 0, 0);
    ;
    background-image: url(/static/img/xiala.png);
    background-size: 20% auto;
    background-repeat: no-repeat;
    background-position: 100% 30%;
  }

  .select::-ms-expand {
    display: none;
  }

  option {
    color: black;
    line-height: 40px;
    border: none;
  }

  @-moz-document url-prefix() {
    .select {
      background-position: calc(100% - 2px) 50% !important;
    }
  }

  .search-button {
    position: absolute;
    width: 38px;
    height: 100%;
    cursor: pointer;
    right: 0;
    top: 0;
  }

  .header_2 {
    border-bottom: 1px solid #ebeef5;
  } //点击样式随路由变化
  .router-link-active {
    color: rgb(0, 89, 130) !important;
    border-bottom: 3px solid #005982;
  }
</style>