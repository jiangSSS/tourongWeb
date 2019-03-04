<template>
  <div class="fll">
    <div class="person_content">
      <div class="fast_top">
        <span class="today">{{timeNow}}</span>
        <!-- <router-link to="/person/weeklyReport">往期回顾</router-link> -->
      </div>
      <p class="project_title">
        <span class="project_">项目精选</span>
        <!-- <span class="project_more flr" @click="$router.push('/project')">更多></span> -->
      </p>
      <div v-for="(item , index) in projectData" :key="index + 'project'" class="project_list clearfix">      
        <!-- <img :src="$url + item.imgPaths" alt="" class="fll" @click="toProjectDetailPage(item.resourceId)"> -->        
        <div class="fll project_con">    
          <p class="title"  @click="toProjectDetailPage(item.resourceId)">{{item.title}}</p>
          <p class="content">{{item.content}}</p>
          <div>
            <button class="noLikeBtn" @click="deletePro(item.id,index)"><i></i>不感兴趣</button>
            <button class="islikeBtn" v-if="item.isLike == '1'"><i></i>感兴趣</button>
            <button class="likeBtn" @click="likePro(item.id,index)" v-else ><i></i>感兴趣</button>
          </div>
        </div>
      </div>
      <p v-show="projectData.length == 0" class="noAtt">
        暂无
      </p>
      <p class="project_title" style="margin-top:0;">
        <span class="project_">资金对接</span>
        <!-- <span class="project_more flr"  @click="$router.push('/money')">更多></span> -->
      </p>
      <div v-for="(item , index) in moneyData" :key="index + 'money'" class="project_list clearfix lastborder">
        
        <!-- <img :src="$url + item.imgPaths" alt="" class="fll" @click="toMoneyDetailPage(item.resourceId)"> -->
        
        <div class="fll project_con">
        
          <p class="title" @click="toMoneyDetailPage(item.resourceId)">{{item.title}}</p>
          <p class="content">{{item.content}}</p>
        
          <div>
            <button class="noLikeBtn" @click="deleteMon(item.id,index)"><i></i>不感兴趣</button>
            <button class="islikeBtn" v-if="item.isLike == '1'"><i></i>感兴趣</button>
            <button class="likeBtn" @click="likeMon(item.id,index)" v-else ><i></i>感兴趣</button>
          </div>
        </div>
      </div>
      <p v-show="moneyData.length == 0" class="noAtt">
        暂无
      </p>
      <p class="project_title" style="margin-top:0;">
        <span class="project_">实时资讯</span>
        <!-- <span class="project_more flr"  @click="$router.push('/money')">更多></span> -->
      </p>
      <div v-for="(item , index) in newsList" :key="index + 'news'" class="project_list clearfix lastborder">
        
        <img :src="$url + item.imgPaths" alt="" class="fll" @click="toMessageDetailPage(item.resourceId)">
        
        <div class="fll project_con">
        
          <p class="title" @click="toMessageDetailPage(item.resourceId)">{{item.title}}</p>
          <p class="content">{{item.content}}</p>
        
          <div>
            <button class="noLikeBtn" @click="deleteNews(item.id,index)"><i></i>不感兴趣</button>
            <button class="islikeBtn" v-if="item.isLike == '1'"><i></i>感兴趣</button>
            <button class="likeBtn" @click="likeNews(item.id,index)" v-else ><i></i>感兴趣</button>
          </div>
        </div>
      </div>
      <p v-show="newsList.length == 0" class="noAtt">
        暂无
      </p>
      <p class="project_title" style="margin-top:0;">
        <span class="project_">精彩活动</span>
        <!-- <span class="project_more flr"  @click="$router.push('/money')">更多></span> -->
      </p>
      <div v-for="(item , index) in activityList" :key="index + 'activity'" class="project_list clearfix lastborder">
        
        <img :src="$url + item.imgPaths" alt="" class="fll" @click="activityDetailPage(item.resourceId)">
        
        <div class="fll project_con">
        
          <p class="title" @click="activityDetailPage(item.resourceId)">{{item.title}}</p>
          <!-- <p class="content">{{item.content}}</p> -->
          <div class="content" v-html="item.content"></div>
        
          <div>
            <button class="noLikeBtn" @click="deleteAct(item.id,index)"><i></i>不感兴趣</button>
            <button class="islikeBtn" v-if="item.isLike == '1'"><i></i>感兴趣</button>
            <button class="likeBtn" @click="likeAct(item.id,index)" v-else ><i></i>感兴趣</button>
          </div>
        </div>
      </div>
      <p v-show="activityList.length == 0" class="noAtt">
        暂无
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeNow: "",
      projectData:[],
      moneyData:[],
      newsList:[],
      activityList:[]
    };
  },
  methods: {
    getData(){
      this.$axios.get(`/jsp/wap/center/ctrl/jsonNewsflashList.jsp`).then(res => {
        this.projectData = res.data.projectList
        this.moneyData = res.data.capitalList
        this.newsList = res.data.newsList
        this.activityList = res.data.activityList
      })
    },
    now() {
      var month = new Date().getMonth() + 1;
      month = month < 10 ? "0" + month : "" + month;
      var day = new Date().getDate();
      day = day < 10 ? "0" + day : "" + day;
      var year = new Date().getFullYear();
      let time = [year, month, day];
      let time2 = time.join("-");
      this.timeNow = time2;
    },
    //  delete_item(id, index) {
    //             MessageBox.confirm('', {
    //                 message: '即将删除该资金, 是否继续?',
    //                 title: '提示',
    //                 showCancelButton: true
    //             }).then(action => {
    //                 if (action == 'confirm') {     //确认的回调
    //                     this.$axios.get(`/jsp/wap/center/do/doDelCapital.jsp?id=${id}`).then(res => {
    //                         this.pageList.splice(index, 1)
    //                         this.count -= 1
    //                     })
    //                 }
    //             }).catch(err => {
    //                 if (err == 'cancel') {     //取消的回调
    //                 }
    //             });
    //         },
    deleteMon(id,index){
      this.$axios.get(`/jsp/wap/center/do/unlikeNewsflash.jsp?id=${id}`).then(res => {
        this.moneyData.splice(index,1)
      })
    },
    deletePro(id,index){
      this.$axios.get(`/jsp/wap/center/do/unlikeNewsflash.jsp?id=${id}`).then(res => {
        this.projectData.splice(index,1)
      })
    },
    deleteNews(id,index){
      this.$axios.get(`/jsp/wap/center/do/unlikeNewsflash.jsp?id=${id}`).then(res => {
        this.newsList.splice(index,1)
      })
    },
    deleteAct(id,index){
      this.$axios.get(`/jsp/wap/center/do/unlikeNewsflash.jsp?id=${id}`).then(res => {
        this.activityList.splice(index,1)
      })
    },
    likePro(id,index){
      this.$axios.get(`/jsp/wap/center/do/likeNewsflash.jsp?id=${id}`).then(res => {
        this.projectData[index].isLike = '1'        
      })
    },
    likeMon(id,index){
      this.$axios.get(`/jsp/wap/center/do/likeNewsflash.jsp?id=${id}`).then(res => {
        this.moneyData[index].isLike = '1'                
      })
    },
    likeNews(id,index){
      this.$axios.get(`/jsp/wap/center/do/likeNewsflash.jsp?id=${id}`).then(res => {
        this.newsList[index].isLike = '1'                
      })
    },
    likeAct(id,index){
      this.$axios.get(`/jsp/wap/center/do/likeNewsflash.jsp?id=${id}`).then(res => {
        this.activityList[index].isLike = '1'                 
      })
    },
    toProjectDetailPage(id){
        let {href} = this.$router.resolve({
            name: "projectDetail",
            query: {id}
        });
        window.open(href, '_blank');
      },
    toProject(){
        let {href} = this.$router.resolve({
            name: "project",
        });
        window.open(href, '_blank');
    },
    toMoneyDetailPage(id){
        let {href} = this.$router.resolve({
            name: "moneyDetail",
            query: {id}
        });
        window.open(href, '_blank');
      },
    toMoney(){
        let {href} = this.$router.resolve({
            name: "money",
        });
        window.open(href, '_blank');
    },
    toMessage(){
      let {href} = this.$router.resolve({
            name: "message",
        });
        window.open(href, '_blank');
    },
    toMessageDetailPage(id){
        let {href} = this.$router.resolve({
            name: "messageDetail",
            query: {id}
        });
        window.open(href, '_blank');
      },
      activity(){
        let {href} = this.$router.resolve({
            name: "activity",
        });
        window.open(href, '_blank');
      },
      activityDetailPage(id){
        let {href} = this.$router.resolve({
            name: "activityDetail",
            query: {id}
        });
        window.open(href, '_blank');
      },
  },
  created() {
    this.now();
    this.getData()
  }
};
</script>

<style scoped lang="scss">
.fast_top {
  a {
    color: #005982;
    margin-left: 20px;
  }
}
.today {
  font-size: 16px;
  font-family: "Microsoft YaHei";
  color: rgb(153, 153, 153);
  -moz-transform: matrix(0.40594479830149, 0, 0, 0.40540540540541, 0, 0);
  -webkit-transform: matrix(0.40594479830149, 0, 0, 0.40540540540541, 0, 0);
  -ms-transform: matrix(0.40594479830149, 0, 0, 0.40540540540541, 0, 0);
}
.project_title {
  margin-top: 40px;
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
  .project_more {
    font-size: 14px;
    font-family: "Microsoft YaHei";
    color: rgb(153, 153, 153);
    cursor: pointer;
  }
}

//项目列表
.project_list {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #cdcdcd;
  img {
    width: 235px;
    height: 150px;
    border-radius: 4px;
  }
  .project_con {
    width: 660px;
    margin-left: 20px;
    .title {
      cursor: pointer;
      margin-top: 0;
      width: 550px;
      font-size: 18px;
      font-family: "Microsoft YaHei";
      color: rgb( 51, 51, 51 );
      font-weight: bold;
      overflow: hidden; /*超出部分隐藏*/
      white-space: nowrap; /*不换行*/
      text-overflow: ellipsis;
    }
    .content {
      font-size: 14px;
      font-family: "Microsoft YaHei";
      color: rgb( 102, 102, 102 );
      line-height: 1.5;
      position: relative;
      max-height: 50px;  
      padding: 0;
      overflow: hidden}
     
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
    margin-top: 20px;
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
      width: 20px;
      height: 20px;
      background: url(/static/img/noLike.png) no-repeat center;
      background-size: contain;
      position: absolute;
      top: 7px;
      left: 10px;
    }
  }
  .noLikeBtn:active {
    background: #000;
    border-color: #000;
    color: #fff;
  }
  .likeBtn {
      width: 110px;
      height: 35px;
      color: #005982;
      line-height: 0.425;
      display: inline-block;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1.5px solid #005982;
      border-color: #005982;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      margin: 0;
      margin-top: 20px;
      margin-left: 15px;
      transition: 0.1s;
      font-weight: 500;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      padding: 12px 20px 12px 40px;
      border-radius: 4px;
      position: relative;
      i {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url(/static/img/like.png) no-repeat center;
        background-size: contain;
        position: absolute;
        top: 7px;
        left: 15px;
      }
  }
  .likeBtn:active {
    background: #005982;
    border-color: #005982;
    color: #fff;
    i {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url(/static/img/hoingxin.png) no-repeat center;
        background-size: contain;
        position: absolute;
        top: 7px;
        left: 15px;
      }
  }
}

.islikeBtn {
      width: 110px;
      height: 35px;
      // color: #005982;
      line-height: 0.425;
      display: inline-block;
      white-space: nowrap;
      cursor: pointer;
      // background: #fff;
      border: 1.5px solid #005982;
      border-color: #005982;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      margin: 0;
      margin-top: 20px;
      margin-left: 15px;
      transition: 0.1s;
      font-weight: 500;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      padding: 12px 20px 12px 40px;
      border-radius: 4px;
      position: relative;
      background: #005982;
      border-color: #005982;
      color: #fff;
      i {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url(/static/img/hoingxin.png) no-repeat center;
        background-size: contain;
        position: absolute;
        top: 7px;
        left: 15px;
      }
  }

.person_content .lastborder:last-of-type {
  border: none;
  margin-bottom: 0;
}
</style>