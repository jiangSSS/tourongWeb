<template>
  <div class="fll">
    <div class="person_content" v-loading="loading">
      <!-- <div class="" v-for="(btn,ind) in begin" :key="ind" @click="get_ser(ind)">{{btn.name}}</div> -->
      <el-tabs type="card">
        <el-tab-pane label="我发出的投递">
          <div class="project">
            <!-- <p class="project_title">
          <span class="project_">关注的项目进展</span>
          <span class="project_more flr"> -->
            <!-- <button class="noLikeBtn" @click="applyDynamic">
            <i></i>添加进展
          </button> -->
            <!-- <span class="project_more flr" @click="project">查看更多项目></span> -->
            <!-- </span>
        </p> -->
            <div v-for="(item, index) in myPageList" :key="index" class="project_list">
              <p class="title" @click="toSendProject(item.projectId)">{{item.projectName}}</p>
              <!-- <p class="con clearfix">
                <span class="content">{{item.capitalName}}</span>
              </p> -->
              <div class="clearfix">
                <span class="content1 fll">我的资金：</span> <span class="content content1 fll">{{item.capitalName}}</span>
              </div>
              <p>
                接收人：
                <span class="">{{item.projectMemberName}}</span>
                <span class="time">
                  <i></i>
                  {{item.addTimeStr.substr(0,10)}}
                  <span class="seconed">{{item.addTimeStr.substr(10,19)}}</span>
                </span>
              </p>
            </div>
            <!-- <div v-show="noShow" class="noChange">您还没有发出投递</div> -->
          </div>
        </el-tab-pane>
        <el-tab-pane label="我收到的投递">
          <div class="project">
            <div v-for="(item, index) in pageList" :key="index" class="project_list">
              <p class="title" @click="toReceiveProject(item.capitalId)">{{item.capitalName}}</p>
              <!-- <p class="con clearfix">
                <span class="content">{{item.capitalName}}</span>
              </p> -->
              <div class="clearfix">
                <span class="content1 fll">我的项目：</span> <span class="content content1 fll">{{item.projectName}}</span>
              </div>
              <p>
                发起人：
                <span class="">{{item.capitalMemberName}}</span>
                <span class="time">
                  <i></i>
                  {{item.addTimeStr.substr(0,10)}}
                  <span class="seconed">{{item.addTimeStr.substr(10,19)}}</span>
                </span>
              </p>
              <!-- <el-button type="danger" icon="el-icon-delete" circle class="flr cancel" size="mini" @click="delete_item(item.id,index)"></el-button> -->
            </div>
            <!-- <div v-show="noShow1" class="noChange">您还没有收到投递</div> -->
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        time: '2019-01-15',
        content: '项目启动',
        imgPath: '',
        projectData: [],
        noShow: false,
        title: '',
        MoneyData: [],
        noShow1: false,
        loading: false,
        begin: [{ name: '关注项目进展', checked: false }, { name: '关注的资金动态', checked: false }],
        right: 0,

        myPageList: [],
        pageList: []
      }
    },
    methods: {
      // getData(){
      //   this.loading = true
      //   this.$axios.get('/jsp/wap/center/ctrl/jsonDynamicList.jsp?type=1').then(res => {
      //     console.log(res)
      //     this.projectData = res.data
      //     if(this.projectData.length == 0){
      //       this.noShow = true
      //     }
      //   })
      // },
      // getData1(){
      //   this.$axios.get('/jsp/wap/center/ctrl/jsonDynamicList.jsp?type=2').then(res => {
      //     console.log('11',res)
      //     this.MoneyData = res.data
      //     if(this.MoneyData.length == 0){
      //       this.noShow1 = true
      //       this.loading = false
      //     }
      //   })
      // },
      getData() {
        this.$axios.get(`/jsp/wap/center/ctrl/jsonBespoketMeList.jsp`).then(res => {
          console.log("我收到的投递", res)
          this.pageList = res.data.pageList
        })
      },
      getData1() {
        this.$axios.get(`/jsp/wap/center/ctrl/jsonMyBespoketList.jsp`).then(res => {
          console.log("我发起的投递", res)
          this.myPageList = res.data.pageList
        })
      },
      toSendProject(id){
        let { href } = this.$router.resolve({
          name: "projectDetail",
          query: {id}
        });
        window.open(href, '_blank');
      },
      toReceiveProject(id){
        let { href } = this.$router.resolve({
          name: "moneyDetail",
          query: {id}
        });
        window.open(href, '_blank');
      }
      // project() {
      //   let id = this.$route.query.id
      //   let { href } = this.$router.resolve({
      //     name: "projectDetail",
      //   });
      //   window.open(href, '_blank');
      // }
    },
    created() {
      this.getData()
      this.getData1()
    }
  }
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

  .dynamic {
    border-bottom: 1px solid #cdcdcd;
  }

  .project_title {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    color: rgb( 0, 83, 133);
    font-weight: bold;
    border-bottom: 1px dashed #cdcdcd;
    padding-bottom: 20px;
    margin-bottom: 0;
    .project_ {
      padding-left: 20px;
      border-left: 5px solid #005982;
    }
    .project_more {
      font-size: 14px;
      font-family: "Microsoft YaHei";
      color: rgb( 153, 153, 153);
      cursor: pointer;
    }
    .project_more:hover {
      color: #000;
    }
  }

  .project_list {
    // padding: 20px 0;
    border-bottom: 1px solid #cdcdcd;
    position: relative;
    .title {
      font-size: 18px;
      font-family: "Microsoft YaHei";
      color: rgb( 51, 51, 51);
      font-weight: bold;
      cursor: pointer;
    }
    .content {
      font-size: 16px;
      font-family: "Microsoft YaHei";
      color: rgb( 102, 102, 102);
      width: 800px;
      overflow: hidden;
      /*超出部分隐藏*/
      white-space: nowrap;
      /*不换行*/
      text-overflow: ellipsis;
    }
    .time {
      // position: absolute;
      // bottom: 0;
      // right: 0;
      font-size: 16px;
      font-family: "Microsoft YaHei";
      color: rgb( 204, 204, 204);
      i {
        display: inline-block;
        width: 15px;
        height: 15px;
        background: url(/static/img/time-2.png)no-repeat center;
        background-size: contain;
      }
      .seconed {
        margin-left: 20px;
      }
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

  .noChange {
    width: 200px;
    margin: 250px auto;
  }

  .content1 {
    padding: 10px 0;
  }

  .con {
    width: 690px;
  }
</style>