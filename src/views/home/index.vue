<template>
  <div>
    <swiper v-if="swiperSlides.length > 0" :options="swiperOption" class="home-swiper">
      <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
        <img :src="$url + slide.imgPath" width="100%" height="100%" class="swiper-img">
      </swiper-slide>
    </swiper>
    <div class="w1200 swiper-bottom">
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev" style="outline: none">
        <div class="swiper-button-next" slot="button-next" style="outline: none">></div>
      </div>
      <div class="w1200">
        <div class="project clearfix">
          <div class="project-title" @click="toProductPage">
            优质项目
            <i></i>
          </div>
          <div class="project-menu">
            <div v-for="(item , index) in projectData.slice(0,6)" :key="index" class="project-item fll" @click="toProjectDetailPage(item.id)">
              <img :src="$url + item.recommendImgPath" alt width="360px" height="120px" style="cursor:pointer" v-if="item&&item.recommendImgPath">
              <p class="project-item-title" v-if="item&&item.title">{{item.title}}</p>
              <p class="project-item-content" v-if="item&&item.brief">{{item.brief}}</p>
            </div>
          </div>
        </div>
      </div>
      <img :src="$url + imgData.webImgPath" alt width="100%" style="display:block;min-width: 1200px;">
      <div class="bg-f2f2f3">
        <div class="w1200 clearfix">
          <div class="invest-title" @click="toMoneyPage">
            投资信息
            <i></i>
          </div>
          <div class="invest-menu">
            <div v-for="(item , index) in investData.slice(0,4)" :key="index" class="invest-item fll clearfix" @click="toMoneyDetailPage(item.id)">
              <img :src="$url + item.recommendImgPath" alt width="140px" height="180px" class="fll" style="cursor:pointer">
              <div class="invest-text fll">
                <p class="invest-item-title" v-if="item&&item.title">{{item.title}}</p>
                <p class="invest-item-list" v-if="item&&item.investAmountName">
                  投资资金：
                  <span class="invest-money" v-if="item&&item.investAmountName">{{item.investAmountName}}</span>
                </p>
                <p class="invest-item-list w230 inb" v-if="item&&item.investWayName">
                  投资方式：
                  <span class="invest-content" v-if="item&&item.investWayName">{{item.investWayName}}</span>
                </p>
                <p class="invest-item-list inb w175" v-if="item&&item.pawnTypeName">
                  资金类型：
                  <span class="invest-content" v-if="item&&item.pawnTypeName">{{item.pawnTypeName}}</span>
                </p>
                <p class="invest-item-list w230 inb" v-if="item&&item.investRegionNameStr">
                  投资地区：
                  <span class="invest-content" v-if="item&&item.investRegionNameStr">{{item.investRegionNameStr}}</span>
                </p>
                <p class="invest-item-list inb w175" v-if="item&&item.investIndustryName">
                  投资行业：
                  <span class="invest-content" v-if="item&&item.investIndustryName">{{item.investIndustryName}}</span>
                </p>
                <p class="invest-item-list w230 inb" v-if="item&&item.investTypeName">
                  投资类型：
                  <span class="invest-content" v-if="item&&item.investTypeName">{{item.investTypeName}}</span>
                </p>
                <p class="invest-item-list inb w175" v-if="item&&item.investStageName">
                  投资阶段：
                  <span class="invest-content" v-if="item&&item.investStageName">{{item.investStageName}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w1200" style="padding-bottom:80px;">
        <div class="message-title" @click="toMessagePage">
          投融资讯
          <i></i>
        </div>
        <div class="mes-title">
          <span class="mes-title-item" v-for="(item , index) in categoryList" :key="index" @click="getType(item.dataValue,index)" :class="{active:item.checked}">{{item.dataName}}</span>
          <div class="mes-content clearfix">
            <ul class="clearfix">
              <li v-for="(item,index) in messageData.slice(0,18)" :key="index" class="fll mes-list" @click="toMessageDetailPage(item.id)">
                <span class="mes-text fll" v-if="item&&item.title">{{item.title}}</span>
                <span class="mes-time" v-if="item&&item.addTimeStr">{{item.addTimeStr.substr(0,10)}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="enter">
        <div class="w1200 clearfix">
          <img src="/static/img/fabuzijin.jpg" alt class="fll" width="400px" style="cursor:pointer" @click="tozijin">
          <img src="/static/img/fabuxiangmu.jpg" alt width="400px" style="cursor:pointer" @click="toxiangmu">
          <img src="/static/img/chengweizhuanjia.jpg" alt class="flr" width="400px" style="cursor:pointer" @click="tozhuanjia">
        </div>
      </div>
      <div class="lg_box" v-show="should_login" @click="should_login = false"></div>
      <Login :should_login="should_login"></Login>
    </div>
    </div>
</template>

<script>
  import "swiper/dist/css/swiper.css";
  import { swiper, swiperSlide } from "vue-awesome-swiper";
  import * as Cookies from "js-cookie";

  let vm = null;

  export default {
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        swiperOption: {
          pagination: {
            el: ".swiper-pagination",
            type: "fraction"
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          },
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          loop: true,
          on: {
            click() {
              const realIndex = this.realIndex;
              vm.toSwiper(realIndex);
            }
          }
        },
        // swiperSlides: ["/static/img/lunbo-1.png"],
        swiperSlides: [],
        projectData: [],
        investData: [],
        categoryList: [],
        categorys: "",
        messageData: [],
        should_login: false,
        imgData: []
      };
    },
    methods: {
      toSwiper(index) {
        let id = this.swiperSlides[index].resourceId;
        let type = this.swiperSlides[index].resourceType;
        if (id != '') {
          if (type == "1") {
            this.toProjectDetailPage(id);
          } else if (type == "2") {
            this.toMoneyDetailPage(id);
          } else if (type == "3") {
            this.toNewsDetailPage(id);
          } else if (type == "4") {
            this.$router.push({ name: 'activityDetail', query: { id } })
          }
        } else {

        }
      },
      getImg() {
        this.$axios.get(`/jsp/wap/index/ctrl/jsonAdvertisement.jsp?key=webIndex`).then(res => {
          console.log("img", res)
          this.imgData = res.data
        })
      },
      getData() {
        this.$axios.get("/jsp/wap/index/ctrl/jsonIndex.jsp").then(res => {
          this.swiperSlides = res.data.banner;
          this.investData = res.data.capitalList;
          this.projectData = res.data.projectList;
          // let banner = res.data.banner
          // banner.forEach(item => {
          //   this.swiperSlides.push(item.imgPath)
          // });
        });
      },
      getTypeData() {
        this.$axios.get("/jsp/wap/trNews/ctrl/jsonCategoryList.jsp").then(res => {
          if (res.success == "true") {
            let categoryList = res.data;
            categoryList.forEach(item => {
              this.$set(item, "checked", false);
            });
            categoryList.forEach(item => {
              if (item.dataValue == this.categorys) {
                item.checked = true;
              }
            });
            this.categoryList = categoryList;
          }
        });
      },
      getMessageData(categorys, pageNumber) {
        this.$axios
          .get("/jsp/wap/trNews/ctrl/jsonNewsPage.jsp", {
            params: { dataValues: categorys, pageNumber }
          })
          .then(res => {
            this.messageData = res.data.pageList;
          });
      },
      getType(e, index) {
        this.categorys = e;
        this.categoryList.forEach(item => {
          item.checked = false;
        });
        this.categoryList[index].checked = true;
        this.getData(this.categorys);
        this.getMessageData(this.categorys);
      },
      getUserInfo() {
        this.$axios.get("/jsp/wap/center/ctrl/jsonUserInfo.jsp").then(res => {
          this.$store.commit("CHANGE_USERINFO", res.data.userInfo);
        });
      },
      //首页跳转打开新窗口
      toProductPage() {
        let { href } = this.$router.resolve({
          name: "project"
        });
        window.open(href, "_blank");
      },
      toMoneyPage() {
        let { href } = this.$router.resolve({
          name: "money"
        });
        window.open(href, "_blank");
      },
      toMessagePage() {
        let { href } = this.$router.resolve({
          name: "message"
        });
        window.open(href, "_blank");
      },
      toProjectDetailPage(id) {
        let { href } = this.$router.resolve({
          name: "projectDetail",
          query: { id }
        });
        window.open(href, "_blank");
      },
      toMoneyDetailPage(id) {
        let { href } = this.$router.resolve({
          name: "moneyDetail",
          query: { id }
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
      tozijin() {
        if (Cookies.get("userKey")) {
          let { href } = this.$router.resolve({
            name: "applyMoney"
          });
          window.open(href, "_blank");
        } else {
          this.should_login = true;
        }
      },
      toxiangmu() {
        if (Cookies.get("userKey")) {
          let { href } = this.$router.resolve({
            name: "applyProject"
          });
          window.open(href, "_blank");
        } else {
          this.should_login = true;
        }
      },
      tozhuanjia() {
        if (Cookies.get("userKey")) {
          let { href } = this.$router.resolve({
            name: "myDemand"
          });
          window.open(href, "_blank");
        } else {
          this.should_login = true;
        }
      }
    },
    created() {
      this.getData();
      this.getTypeData();
      this.getMessageData();
      this.getImg()
      vm = this;
    },
    mounted() {
      if (Cookies.get("userKey")) {
        this.getUserInfo();
      }
    }
  };
</script>

<style scoped lang="scss">
  // 轮播图高度
  .swiper-bottom {
    position: relative;
  }

  @media screen and (max-width: 1640px) {
    .home-swiper {
      min-width: 1200px;
      width: 100%;
      height: 475px;
    } //轮播图样式
    /deep/ {
      .swiper-pagination {
        width: 190px !important;
        height: 55px !important;
        line-height: 3.5 !important;
        position: absolute !important;
        color: #fff !important;
        bottom: 1px !important;
        left: 75% !important; // background-color: rgba(0, 0, 0, 0.5) !important;
      }
      .swiper-button-prev,
      .swiper-button-next {
        color: #999 !important;
        font-size: 40px !important;
        background-image: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
      }
      .swiper-button-prev:hover,
      .swiper-button-next:hover {
        color: #fff !important;
      }
      .swiper-button-prev {
        top: calc(100% - 30px) !important;
        left: 75% !important;
      }
      .swiper-button-next {
        top: calc(100% - 30px) !important;
        left: calc(75% + 162px) !important;
      }
    }
  }

  @media screen and (min-width: 1640px) and (max-width: 1920px) {
    .home-swiper {
      width: 100%;
      height: 600px;
    }
    /deep/ {
      .swiper-pagination {
        width: 190px !important;
        height: 55px !important;
        line-height: 3.5 !important;
        position: absolute !important;
        color: #fff !important;
        bottom: 1px !important;
        left: 75% !important; // background-color: rgba(0, 0, 0, 0.5) !important;
      }
      .swiper-button-prev,
      .swiper-button-next {
        color: #999 !important;
        font-size: 40px !important;
        background-image: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
      }
      .swiper-button-prev:hover,
      .swiper-button-next:hover {
        color: #fff !important;
      }
      .swiper-button-prev {
        top: calc(100% - 30px) !important;
        left: 75% !important;
      }
      .swiper-button-next {
        top: calc(100% - 30px) !important;
        left: calc(75% + 162px) !important;
      }
    }
  } // 项目模块
  .project-title {
    cursor: pointer;
    width: 100%;
    text-align: center;
    font-size: 36px;
    font-family: "Microsoft YaHei";
    color: rgb(137, 137, 137);
    padding: 50px 0;
    i {
      cursor: pointer;
      display: inline-block;
      width: 25px;
      height: 25px;
      background: url(/static/img/chakan.png) no-repeat center;
      background-size: contain;
    }
  }

  .project-menu .project-item:nth-child(2) {
    padding: 0 60px;
  }

  .project-menu .project-item:nth-child(5) {
    padding: 0 60px;
  }

  .project {
    margin-bottom: 20px;
  }

  .project-item {
    width: 360px;
    height: 300px;
    margin-bottom: 50px;
    .project-item-title {
      font-size: 18px;
      font-family: "Microsoft YaHei";
      color: rgb(62, 58, 57);
      font-weight: bold;
      line-height: 1.333;
      text-align: left;
      width: 342px;
      cursor: pointer;
    }
    .project-item-title:hover {
      color: rgb(0, 89, 130);
    }
    .project-item-content {
      font-size: 14px;
      font-family: "Microsoft YaHei";
      color: rgb(137, 137, 137);
      line-height: 1.429;
      text-align: left;
      width: 360px;
      height: 100px; // 省略
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      overflow: hidden;
    } // 适配所有的省略
    .project-item-content {
      position: relative;
      line-height: 20px;
      max-height: 100px;
      overflow: hidden;
    }
    .project-item-content::after {
      position: absolute;
      bottom: 0;
      right: 0;
      padding-left: 5px;
      background: -webkit-linear-gradient(left, transparent, #fff 55%);
      background: -o-linear-gradient(right, transparent, #fff 55%);
      background: -moz-linear-gradient(right, transparent, #fff 55%);
      background: linear-gradient(to right, transparent, #fff 55%);
    }
  } // 投资信息
  .bg-f2f2f3 {
    background: #f2f2f3;
    width: 100%;
    min-width: 1200px;
    height: 700px;
  }

  .invest-title {
    cursor: pointer;
    width: 100%;
    text-align: center;
    font-size: 36px;
    font-family: "Microsoft YaHei";
    color: rgb(137, 137, 137);
    padding: 75px 0 50px 0;
    i {
      cursor: pointer;
      display: inline-block;
      width: 25px;
      height: 25px;
      background: url(/static/img/chakan.png) no-repeat center;
      background-size: contain;
    }
  }

  .invest-menu .invest-item:nth-child(1) {
    // margin-right: 40px;
  }

  .invest-menu .invest-item:nth-child(3) {
    // margin-right: 40px;
  }

  .invest-item {
    // width: 560px;
    height: 180px;
    margin-bottom: 55px;
  }

  .invest-text {
    margin-left: 10px;
    width: 450px;
  }

  .invest-item-title {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    color: rgb(62, 58, 57);
    font-weight: bold;
    line-height: 1.333;
    text-align: left;
    width: 369px;
    height: 42px;
    margin: 0;
    cursor: pointer;
    overflow: hidden;
    /*超出部分隐藏*/
    white-space: nowrap;
    /*不换行*/
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
    .invest-content {
      color: #000;
      display: inline-block;
      width: 150px;
    }
  }

  .w230 {
    width: 220px;
  }

  .w175 {
    width: 220px;
  }

  .inb {
    // width: 150px;
    display: inline-block;
    overflow: hidden;
    /*超出部分隐藏*/
    white-space: nowrap;
    /*不换行*/
    text-overflow: ellipsis;
  } // 资讯
  .message-title {
    cursor: pointer;
    width: 100%;
    text-align: center;
    font-size: 36px;
    font-family: "Microsoft YaHei";
    color: rgb(137, 137, 137);
    padding-top: 75px;
    i {
      cursor: pointer;
      display: inline-block;
      width: 25px;
      height: 25px;
      background: url(/static/img/chakan.png) no-repeat center;
      background-size: contain;
    }
  }

  .mes-title {
    text-align: center;
  }

  .mes-title-item {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    color: #444;
    line-height: 4.444;
    margin-right: 30px;
    cursor: pointer;
  }

  .active {
    color: #005982;
    font-weight: 700;
  }

  .mes-content {
    margin-top: 20px;
  }

  .mes-content li:nth-child(2n + 1) {
    margin-right: 80px;
  }

  .mes-time {
    font-size: 14px;
    font-family: "Microsoft YaHei";
    color: rgb(137, 137, 137);
    margin-left: 55px;
  }

  .mes-list {
    font-size: 16px;
    font-family: "Microsoft YaHei";
    color: rgb(201, 202, 202);
    line-height: 2.25;
    text-align: left;
    width: 535px;
    cursor: pointer;
  }

  .mes-text {
    color: #000;
    display: inline-block;
    width: 400px;
    overflow: hidden;
    /*超出部分隐藏*/
    white-space: nowrap;
    /*不换行*/
    text-overflow: ellipsis;
  }

  .mes-text:hover {
    color: rgb(0, 89, 130);
  }

  .enter {
    width: 100%;
    min-width: 1200px;
    padding: 90px 0;
    background-color: #f2f2f3;
  }
</style>