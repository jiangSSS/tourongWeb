<template>
  <div class="fll">
    <div class="person_content">
      <el-tabs type="card">
        <el-tab-pane label="关注的项目进展">
          <div class="project">
            <div v-for="(item, index) in projectData" :key="index" class="project_list">
              <p class="title" @click="toFocusProject(item.projectId)">{{item.title}}</p>
              <p class="con clearfix">
                <span class="content fll">{{item.content}}</span>
                <img :src=" $url + imgPaths" alt="" v-for="(imgPaths,idx) in item.imgPathList" :key="idx" style="max-width:250px;padding-right:10px">
              </p>
              <div class="time">
                <i></i>
                {{item.addTimeStr.substr(0,10)}}
                <span class="seconed">{{item.addTimeStr.substr(10,19)}}</span>
              </div>
              <!-- <el-button type="danger" icon="el-icon-delete" circle class="flr cancel" size="mini" @click="delete_item(item.id,index)"></el-button> -->
            </div>
            <div v-show="noShow" class="noChange">您关注的项目还未发布进展</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="关注的资金动态">
          <div class="project">
            <div v-for="(item, index) in MoneyData" :key="index" class="project_list">
              <p class="title" @click="toFocusMoney(item.projectId)">{{item.title}}</p>
              <p class="con clearfix">
                <span class="content fll">{{item.content}}</span>
                <img :src=" $url + imgPaths" alt="" v-for="(imgPaths,idx) in item.imgPathList" :key="idx" style="max-width:250px;padding-right:10px">
              </p>
              <div class="time">
                <i></i>
                {{item.addTimeStr.substr(0,10)}}
                <span class="seconed">{{item.addTimeStr.substr(10,19)}}</span>
              </div>
              <!-- <el-button type="danger" icon="el-icon-delete" circle class="flr cancel" size="mini" @click="delete_item(item.id,index)"></el-button> -->
            </div>
            <div v-show="noShow1" class="noChange">您关注的资金未添加动态</div>
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
        begin: [{ name: '关注项目进展', checked: false }, { name: '关注的资金动态', checked: false }],
        right: 0,
      }
    },
    methods: {
      getData() {
        this.$axios.get('/jsp/wap/center/ctrl/jsonDynamicList.jsp?type=1').then(res => {
          console.log(res)
          this.projectData = res.data
          if (this.projectData.length == 0) {
            this.noShow = true
          }
        })
      },
      getData1() {
        this.$axios.get('/jsp/wap/center/ctrl/jsonDynamicList.jsp?type=2').then(res => {
          console.log('11', res)
          this.MoneyData = res.data
          if (this.MoneyData.length == 0) {
            this.noShow1 = true
          }
        })
      },
      get_ser(index) {
        this.right = index
        if (this.begin[index].checked) {
          this.begin[index].checked = !this.begin[index].checked
        } else {
          this.begin.forEach(item => {
            item.checked = false
          });
          this.begin[index].checked = true
        }
      },
      toFocusMoney(id) {
        let { href } = this.$router.resolve({
          name: "moneyDetail",
          query: { id }
        });
        window.open(href, "_blank");
      },
      toFocusProject(id) {
        let { href } = this.$router.resolve({
          name: "projectDetail",
          query: { id }
        });
        window.open(href, "_blank");
      },
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

  // .time {
  //   padding: 30px;
  // }
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
      line-height: 1.4;
      overflow: hidden;
      /*超出部分隐藏*/
      white-space: nowrap;
      /*不换行*/
      text-overflow: ellipsis;
      cursor: pointer;
    }
    .content {
      font-size: 16px;
      font-family: "Microsoft YaHei";
      color: rgb( 102, 102, 102);
      width: 710px;
      line-height: 1.4;
    }
    .time {
      font-size: 16px;
      padding: 15px 0;
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

  .content {
    padding: 10px 0;
  }

  .con {
    width: 690px;
  }
</style>