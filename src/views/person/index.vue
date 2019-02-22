<template>
  <div class="bg-fa">
    <div class="w1200 clearfix">
      <div class="bread">
        <span>
          <router-link to="/home">首页 ></router-link>
        </span>
        <span>
          <router-link to="/person">个人中心</router-link>
        </span>
        <span v-show="$route.meta.title != '个人中心'">> {{$route.meta.title}}</span>
      </div>
      <div class="person_navbar fll">
        <div class="person_top" @click="$router.push('/person')"></div>
        <div class="person_information clearfix">
          <div class="imgBox fll">
            <img :src="$url + personData.avatar" alt class="avatar" v-if="personData&&personData.avatar != '/static/img/avatar-1.png'">
            <img :src="personData.avatar" alt="" v-else class="avatar">
          </div>
          <div class="nameBox flr">
            <i class="attest" v-show="personData.vip == '1'"></i>
            <div class="username">
              <i></i>
              <span v-if="personData&&personData.avatar">{{personData.name}}</span>
            </div>
            <div class="equity" @click="$router.push({name:'member'})">
              <i></i>会员权益中心
            </div>
          </div>
        </div>
        <div class="companyBox">
          <span class="company menber" v-if="personData.authenticationName != ''">{{personData.authenticationName}}</span>
          <span class="company" v-else>暂未认证</span>
        </div>
        <!-- <div class="attest">
            <span class="num"><i class="iconfont icon-touzi"></i>投资方</span>
            <span class="num"><i class="iconfont icon-xiangmu1"></i>项目方</span>
            <span class="num"><i class="iconfont icon-zhuanjia"></i>专家</span>
          </div> -->
        <div class="nav_list">
          <div class="nav_item">
            <span>
              <router-link :to="{name:'weeklyReport'}">
                <i class="place report"></i>
                周报
              </router-link>
            </span>
          </div>
          <div class="nav_item">
            <span>
              <router-link :to="{name:'fastReport'}">
                <i class="place fast"></i>
                及时快报
              </router-link>
            </span>
          </div>
          <div class="nav_item">
            <span>
              <router-link :to="{name:'memberAttest'}">
                <i class="place attest"></i>
                会员认证
              </router-link>
            </span>
          </div>
          <div class="nav_item">
            <span>
              <router-link :to="{name:'myData'}">
                <i class="place data"></i>
                我的资料
              </router-link>
            </span>
          </div>
          <div class="nav_item">
            <span>
              <router-link :to="{name:'myAttention'}">
                <i class="place attention"></i>
                我的关注
              </router-link>
            </span>
          </div>
          <div class="nav_item">
            <span>
              <router-link :to="{name:'myMoney'}">
                <i class="place money"></i>
                我的资金
              </router-link>
            </span>
          </div>
          <div class="nav_item">
            <span>
              <router-link :to="{name:'myProject'}">
                <i class="place project"></i>
                我的项目
              </router-link>
            </span>
          </div>
          <div class="nav_item">
            <span>
              <router-link :to="{name:'myActivity'}">
                <i class="place activity"></i>
                我报名的活动
              </router-link>
            </span>
          </div>
          <div class="nav_item">
            <span>
              <router-link :to="{name:'myDemand'}">
                <i class="place demand"></i>
                需求填报
              </router-link>
            </span>
          </div>
          <div class="nav_item">
            <span @click="login_out">
              <a href="javascript:;">
                <i class="place quit"></i>
                退出登录
              </a>
            </span>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import * as Cookies from 'js-cookie'

  export default {
    data() {
      return {
        personData: {
          avatar: "/static/img/avatar-1.png",
          attest: 1,
          name: "投融用户",
          authenticationName: '',
          isVip: '0',
        }
      };
    },
    methods: {
      login_out() {
        Cookies.remove('userKey')
        this.login = false
        this.$router.push('/login')
      },
      getUserInfo() {
        this.$axios.get('/jsp/wap/center/ctrl/jsonUserInfo.jsp').then(res => {
          if (res.success == 'true') {
            this.personData.avatar = res.data.userInfo.headImgPath
            this.personData.name = res.data.userInfo.name
            this.personData.isVip = res.data.userInfo.isVip
            this.personData.authenticationName = res.data.userInfo.authenticationName
            this.$store.commit('CHANGE_USERINFO', res.data.userInfo)
          }
        })
      },
    },
    created() {
      this.getUserInfo()
    },
  };
</script>

<style scoped lang="scss">
  .companyBox {
    text-align: center;
  }

  .company {
    display: inline-block;
    text-align: center;
    color: #999;
    padding: 10px 0
  } 
  .menber{
        color: #005982!important
      }
  //左导航栏
  .person_navbar {
    width: 220px;
    height: 890px;
    background: #fff;
    margin-bottom: 100px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1);
    .person_top {
      width: 100%;
      height: 50px;
      background: url(/static/img/person.png) no-repeat center;
      background-size: contain;
      cursor: pointer;
    }
    .person_information {
      position: relative;
      .avatar {
        display: block;
        width: 70px;
        height: 70px;
        border: 1px solid #ededed;
        border-radius: 50%;
        margin: 0 auto;
        margin-top: 20px;
      }
      .attest {
        display: inline-block;
        width: 30px;
        height: 30px;
        background: url(/static/img/renzheng.png);
        background-size: contain;
        position: absolute;
        left: 55%;
        top: 55px;
      }
      .username {
        // text-align: center;
        // margin-right: 18px;
        margin: 25px 0 10px 0;
        position: relative;
        i {
          display: inline-block;
          width: 15px;
          height: 15px;
          background: url(/static/img/ren.png) no-repeat center;
          background-size: contain; // position: absolute;
          // top: 1px;
          // left: 60px;
        }
      }
      .imgBox {
        width: 90px
      }
      .nameBox {
        width: 130px
      }
      .equity {
        width: 85px;
        padding: 5px 10px 5px 25px;
        font-size: 14px;
        line-height: 1.5;
        cursor: pointer;
        background-color: #ededed;
        border-radius: 8%; // margin: 0px auto;
        position: relative;
        i {
          display: inline-block;
          width: 20px;
          height: 15px;
          background: url(/static/img/zunshi.png) no-repeat center;
          background-size: contain;
          position: absolute;
          top: 10px;
          left: 5px;
        }
      }
    }
    .attest {
      display: flex;
      .num {
        display: inline-block;
        padding: 15px 0px;
        text-align: center;
        color: #999;
        font-size: 14px;
        flex: 1; // justify-content: space-around  
        i {
          font-size: 20px;
        }
      }
    }
    .nav_item {
      padding: 20px 0;
      border-top: 1px dashed #cdcdcd;
      position: relative;
      span {
        font-size: 16px;
        font-family: "Microsoft YaHei";
        cursor: pointer;
      }
      a {
        color: #000;
        border-left: 3px solid #fff;
        padding-left: 90px;
      }
      .place {
        display: inline-block;
        width: 22px;
        height: 22px;
        position: absolute;
        top: 18px;
        left: 58px;
      }
      .report {
        background: url(/static/img/zhoubao.png) no-repeat center;
        background-size: contain;
      }
      .fast {
        background: url(/static/img/kuaibao.png) no-repeat center;
        background-size: contain;
      }
      .attest {
        background: url(/static/img/renzheng-3.png) no-repeat center;
        background-size: contain;
      }
      .data {
        background: url(/static/img/ziliao.png) no-repeat center;
        background-size: contain;
      }
      .attention {
        background: url(/static/img/guanzhu.png) no-repeat center;
        background-size: contain;
      }
      .money {
        background: url(/static/img/zijin.png) no-repeat center;
        background-size: contain;
      }
      .project {
        background: url(/static/img/xiangmu.png) no-repeat center;
        background-size: contain;
      }
      .activity {
        background: url(/static/img/huodong.png) no-repeat center;
        background-size: contain;
      }
      .demand {
        background: url(/static/img/xuqiu.png) no-repeat center;
        background-size: contain;
      }
      .quit {
        background: url(/static/img/tuichu.png) no-repeat center;
        background-size: contain;
      }
      .router-link-active {
        color: #005982;
        border-left: 3px solid #005982;
        .report {
          background: url(/static/img/zhoubao-1.png) no-repeat center;
          background-size: contain;
        }
        .fast {
          background: url(/static/img/kuaibao-1.png) no-repeat center;
          background-size: contain;
        }
        .attention {
          background: url(/static/img/shoucang-1.png) no-repeat center;
          background-size: contain;
        }
        .data {
          background: url(/static/img/ziliao-1.png) no-repeat center;
          background-size: contain;
        }
        .money {
          background: url(/static/img/zijin-1.png) no-repeat center;
          background-size: contain;
        }
        .project {
          background: url(/static/img/xiangmu-1.png) no-repeat center;
          background-size: contain;
        }
        .activity {
          background: url(/static/img/huodong-1.png) no-repeat center;
          background-size: contain;
        }
        .demand {
          background: url(/static/img/xuqiu-1.png) no-repeat center;
          background-size: contain;
        }
        .attest {
          background: url(/static/img/renzheng-1.png) no-repeat center;
          background-size: contain;
        }
      }
    }
  }
</style>