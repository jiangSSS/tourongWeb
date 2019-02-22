<template>
  <div class="fll">
    <div class="person_content">
      <div class="project">
        <p class="project_title">
          <span class="project_">资金动态</span>
          <span class="project_more flr">
          <button class="noLikeBtn" @click="applyDynamic">
            <i></i>添加动态
          </button>
          </span>
        </p>
        <div v-for="(item, index) in MoneyData" :key="index" class="project_list">
          <p class="title">{{title}}</p>
          <p class="con clearfix">
            <span class="content fll">{{item.content}}</span>
            <img :src=" $url + imgPaths" alt="" v-for="(imgPaths,idx) in item.imgPathList" :key="idx" style="max-width:250px;padding-right:10px">
            <span class="time flr">
              <i></i>
              {{item.addTimeStr.slice(0,10)}}
              <span class="seconed">{{item.addTimeStr.slice(10,19)}}</span>
            </span>
          </p>
          <el-button type="danger" icon="el-icon-delete" circle class="flr cancel" size="mini" @click="delete_item(item.id,index)"></el-button>
        </div>
        <div v-show="noShow" class="noChange">您还未添加过动态</div>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        time:'2019-01-15',
        content:'项目启动',
        imgPath:'',
        MoneyData:[],
        noShow:false,
        title:'',
        img:[]
      }
    },
    methods:{
      getData(){
        let id = this.$route.query.id
        this.$axios.get(`/jsp/wap/center/ctrl/jsonCapitalDetail.jsp?id=${id}`).then(res => {
          this.title = res.data.capital.title
        })
        this.$axios.get(`/jsp/wap/trCapital/ctrl/jsonCapitalDynamicList.jsp?id=${id}`).then(res => {
          this.MoneyData = res.data
          if(this.MoneyData.length == 0){
            this.noShow = true
          }
        })
      },
      applyDynamic(){
        let id = this.$route.query.id
        let {href} = this.$router.resolve({
              name: "addDynamicMoney",
              query: {id}
          });
        window.open(href, '_blank');
      },
      delete_item(id,index){
          this.$confirm("即将删除资金, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(()=> {
          this.$axios.get(`/jsp/wap/center/do/doDelProjectDynamic.jsp?id=${id}`).then(res => {
            if(res.success == 'true') {
              this.MoneyData.splice(index,1)
            } else {
              this.success = false
              this.hint = res.message
              this.toast_show = true
            }
          })
        })
      }
    },
    created(){
      this.getData()
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
.time {
  padding: 30px;
}
.dynamic {
  border-bottom: 1px solid #cdcdcd;
}

.project_title {
  font-size: 18px;
  font-family: "Microsoft YaHei";
  color: rgb( 0, 83, 133 );
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
    color: rgb( 153, 153, 153 );
    cursor: pointer;
  }
  .project_more:hover {
    color: #000;
  }
}
  .project_list {
    padding: 20px 0;
    border-bottom: 1px solid #cdcdcd;
    position: relative;
    .title {
      font-size: 18px;
      font-family: "Microsoft YaHei";
      color: rgb( 51, 51, 51 );
      font-weight: bold;
    }
    .content {
      font-size: 16px;
      font-family: "Microsoft YaHei";
      color: rgb( 102, 102, 102 );
      width: 710px;
      overflow: hidden; /*超出部分隐藏*/
      white-space: nowrap; /*不换行*/
      text-overflow: ellipsis;
    }
    .time {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 16px;
      font-family: "Microsoft YaHei";
      color: rgb( 204, 204, 204 );
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
  .cancel {
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>