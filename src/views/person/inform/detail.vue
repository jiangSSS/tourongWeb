<template>
  <div class="fll">
    <div class="person_content">
      <p class="project_title">
        <span class="project_">消息中心</span>
      </p>
      <div class="inform_list">
        <p class="type">
          <span>{{inform.type}}</span>
          <span style="margin-left:15px;">{{inform.time}}</span>
        </p>
        <p class="clearfix">
          <span class="fll">{{inform.content}}</span>
          <span class="flr delete">删除</span>
        </p>
      </div>
      <div class="inform_con">
        <p class="title">消息内容</p>
        <div class="content"></div>
        <div class="empty"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inform: {
        type: "系统",
        time: "2018-11-14",
        content: "您发布的投资信息审核通过",
        contentDetail:'',
      }
    };
  }
};
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

//通知列表
.inform_list {
  cursor: pointer;
  margin-left: 23px;
  padding-bottom: 10px;
  .type {
    color: rgb(153, 153, 153);
    font-size: 14px;
    font-family: "Microsoft YaHei";
  }
  .delete:hover {
    color: rgb(0, 83, 133);
  }
}

.inform_con {
  .title {
    margin-left: 23px;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    color: rgb(51, 51, 51);
    font-weight: bold;
  }
  .empty {
    width: 500px;
    height: 500px;
    margin: 0 auto;
    background: url(/static/img/kong.png) no-repeat center;
    background-size: contain;
  }
}
</style>