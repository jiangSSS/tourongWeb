<template>
  <div class="w1200 clearfix">
    <div class="w840 fll mes_all">
      <div class="mes_top">
        <p class="mes_type">
          <span 
          class="type"
          v-for="(item , index) in categoryList"
          :key="index"
          @click="getType(item.dataValue,index)"
          :class="{active:item.checked}"
          style="cursor:pointer">{{item.dataName}}</span>
        </p>
      </div>
      <div style="min-height:1200px;" v-loading="loading">
        <div v-for="(item , index) in messageData" :key="index" style="cursor:pointer;" class="mg-20" @click="toMessageDetailPage(item.id)">
          <div v-if="item.imgPath" class="clearfix">
            <img :src="$url + item.imgPath" alt class="fll" width="152px" height="101px">
            <div class="fll mes_box">
              <p class="title">{{item.title}}</p>
              <div class="clearfix">
                <span class="fll time">发布时间；{{item.publishTimeStr}}</span>
                <span class="fll time" style="margin-left:20px">来源：{{item.source}}</span>
                <span class="fll time" style="margin-left:20px" v-if="item.author">作者：{{item.author}}</span>
                <span class="fll time" style="margin-left:20px" v-else>作者：网络</span>
                <span class="flr num">阅读：{{item.showNum}}次</span>
              </div>
              <p class="content">{{item.brief}}</p>
            </div>
          </div>
          <div v-else class="clearfix">
            <div class="fll mes_box2">
              <p class="title">{{item.title}}</p>
              <div class="clearfix">
                <span class="fll time">发布时间；{{item.publishTimeStr}}</span>
                <span class="flr num">阅读：{{item.readNum}}次</span>
              </div>
              <p class="content" >{{item.brief}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="mes_page">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="current_page"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
      </div>
    </div>
    <div class="w360 flr mes_list clearfix">
      <p class="mes">
        热门资讯
        <span class="mes_more flr"  @click="toMessagePage">更多></span>
      </p>
      <ul class="mes_title" v-loading="newsloading">
          <li v-for="(item,index) in mesData" :key="index" class="mes_content" @click="toMessageDetailPage(item.id)">
              <span class="cl-0">{{item.title}}</span>
          </li>
      </ul>
      <img src="/static/img/bg-4.jpg" alt width="360px" height="350px" style="margin-bottom:75px">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mesData: [],
      count:1,
      messageData:[],
      loading:false,
      newsloading:false,
      categoryList:[],
      categorys:'',
      current_page:1
    };
  },
  methods: {
    //获取分类数据
    getTypeData(){
      this.$axios.get('/jsp/wap/trNews/ctrl/jsonCategoryList.jsp').then(res => {
        if(res.success == "true"){
          let categoryList = res.data
          categoryList.forEach(item => {
            this.$set(item, 'checked', false)
          });
          categoryList.forEach(item => {
            if(item.dataValue == this.categorys){
              item.checked = true
            }
          })
          this.categoryList = categoryList
        }
      })
    },
    //获取数据
    getData(categorys,pageNumber){
      this.loading = true
      this.$axios.get('/jsp/wap/trNews/ctrl/jsonNewsPage.jsp',{params:{dataValues:categorys,pageNumber}}).then(res => {
        console.log('资讯列表',res)
        this.messageData = res.data.pageList
        this.count = Number(res.data.pagination.totalCount)
        this.loading = false
      })
    },
    //通过类型获取数据
    getType(e,index) {
      this.categorys = e
      this.categoryList.forEach(item => {
          item.checked = false
      });
      this.categoryList[index].checked = true
      this.current_page = 1
      this.getData(this.categorys)
    },
    //获取热评
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
    // toMeet() {
    //   this.mes_type = 12;
    //   this.getData(this.mes_type)
    // },
    // toScience() {
    //   this.mes_type = 13;
    //   this.getData(this.mes_type)
    // },
    // toPolicy() {
    //   this.mes_type = 14;
    //   this.getData(this.mes_type)
    // },
    // toInduty() {
    //   this.mes_type = 15;
    //   this.getData(this.mes_type)
    // },
    // toProduct() {
    //   this.mes_type = 16;
    //   this.getData(this.mes_type)
    // },
    // toOrgan() {
    //   this.mes_type = 17;
    //   this.getData(this.mes_type)
    // },
    // toRefe() {
    //   this.mes_type = 6;
    // },
    // toServer() {
    //   this.mes_type = 7;
    // },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //翻页
    handleCurrentChange(val) {
      this.getData(this.categorys,val)
    },
    //去资讯页
    toMessagePage(){
      let {href} = this.$router.resolve({
          name: "message",
      });
      window.open(href, '_blank');
    },
    //去资讯详情页
    toMessageDetailPage(id){
      let {href} = this.$router.resolve({
          name: "messageDetail",
          query: {id}
      });
      window.open(href, '_blank');
    },

  },
  created(){
    if(this.$route.query.category) {
      this.categorys = this.$route.query.category
      this.getTypeData()
      this.getData(this.categorys)
    } else {
      this.categorys = '12'
      this.getTypeData()
      this.getData(this.categorys)
    }

      this.getNewsList()
  }
};
</script>

<style scoped lang="scss">
//信息列表
.mes_list {
  .mes {
    font-size: 22px;
    font-family: "Microsoft YaHei";
    color: rgb(51, 51, 51);
    line-height: 1.333;
    text-align: left;
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
  }
}
.mes_title {
  border-top: 1px solid #d9d9d9;
  padding-left: 20px;
}
.mes_content {
  cursor: pointer;
  padding: 20px 0;
  border-bottom: 1px dashed #d9d9d9;
  color: #d9d9d9;
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

//资讯
.mes_all {
  padding-right: 30px;
  box-sizing: border-box;
}
.mes_type {
  font-size: 18px;
  font-family: "Microsoft YaHei";
  color: rgb(102, 102, 102);
  line-height: 1.333;
  text-align: left;
  border-left: 3px solid #005982;
  margin-bottom: 0;
  .type {
    margin-left: 30px;
    cursor: pointer;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
}
  .active {
    font-weight: 700;
    color: #005982;
  }
.mes_top {
  padding-bottom: 18px;
  border-bottom: 1px solid #d9d9d9;
}
.mes_box {
  width: 638px;
  margin-left: 20px;
  .title {
    color: #000;
    margin-top: 0;
    margin-bottom: 10px;
  }
  .time {
    font-size: 12px;
    font-family: "SimSun";
    color: rgb(153, 153, 153);
    line-height: 2;
  }
  .num {
    font-size: 12px;
    font-family: "SimSun";
    color: rgb(153, 153, 153);
    line-height: 2;
  }
  .content {
    font-size: 14px;
    font-family: "Microsoft YaHei";
    color: #999;
    line-height: 1.5;
    margin-top: 8px;
  }
  .content {
    position: relative;
    max-height: 40px;
    overflow: hidden;
  }
  .content::after {
    // ;
    position: absolute;
    bottom: 0;
    right: 0;
    padding-left: 5px;
    background: -webkit-linear-gradient(left, transparent, #fff 55%);
    background: -o-linear-gradient(right, transparent, #fff 55%);
    background: -moz-linear-gradient(right, transparent, #fff 55%);
    background: linear-gradient(to right, transparent, #fff 55%);
  }
}
.mes_box2 {
  .title {
    margin-top: 5px;
    margin-bottom: 10px;
    color: #000;
  }
  .time {
    font-size: 12px;
    font-family: "SimSun";
    color: rgb(153, 153, 153);
    line-height: 2;
  }
  .num {
    font-size: 12px;
    font-family: "SimSun";
    color: rgb(153, 153, 153);
    line-height: 2;
  }
  .content {
    font-size: 14px;
    font-family: "Microsoft YaHei";
    color: #999;
    line-height: 1.286;
    
  }
  .content {
    position: relative;
    max-height: 35px;
    overflow: hidden;
  }
  .content::after {
    position: absolute;
    bottom: 0;
    right: 0;
    padding-left: 5px;
    background: -webkit-linear-gradient(left, transparent, #fff 55%);
    background: -o-linear-gradient(right, transparent, #fff 55%);
    background: -moz-linear-gradient(right, transparent, #fff 55%);
    background: linear-gradient(to right, transparent, #fff 55%);
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
</style>