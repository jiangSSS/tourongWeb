<template>
  <div>
    <p class="project_title">
      <span class="project_">已关注的标签</span>
    </p>
    <div class="babel_list">
      <button
        v-for="(item, index) in followLabel"
        :key="index"
        class="babel_btn like"
        :class="item.industryName.length > 2 ? '':'letter'"
      >{{item.industryName}}</button>
    </div>
    <p class="project_title">
      <span class="project_">请选择感兴趣的标签</span>
      <span class="project_more flr">
        <label class="my_protocol">
          <input class="input_agreement_protocol" type="checkbox" @click="followAll" :checked="checked">
          <span></span>
        </label>
        全选
      </span>
    </p>
    <div class="babel_list">
      <button
        v-for="(item, index) in labelData"
        :key="index"
        class="babel_btn"
        :class="(item.industryName.length > 2 ? '':'letter') + (item.isFollow == 0 ? ' nolike' : ' like')"
        @click="babelFollow(item.industryValue,index)"
      >{{item.industryName}}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      label: [
        {
          name: "投资",
          like: 0
        },
        {
          name: "融资",
          like: 1
        },
        {
          name: "健康医疗",
          like: 0
        },
        {
          name: "互联网",
          like: 1
        },
        {
          name: "投资",
          like: 0
        },
        {
          name: "投资",
          like: 1
        },

        {
          name: "投资",
          like: 0
        },
        {
          name: "投资",
          like: 0
        },
        {
          name: "投资",
          like: 0
        },
        {
          name: "投资",
          like: 0
        },
        {
          name: "投资",
          like: 0
        },
        {
          name: "投资",
          like: 0
        },
        {
          name: "投资",
          like: 0
        },
        {
          name: "投资",
          like: 0
        },
        {
          name: "投资",
          like: 0
        }
      ],
      labelData:[],
      followLabel:[],
      checked:false,
    };
  },
  methods: {
    babelFollow(industryValue,index) {
      this.checked = false
      if(this.labelData[index].isFollow == '0'){
        this.$axios.get('/jsp/wap/center/do/doFollowIndustry.jsp',{params:{ industryValue}}).then(res => {
          this.labelData[index].isFollow = '1'
          this.followLabel.push(this.labelData[index])
        })
      } else {
        this.$axios.get('/jsp/wap/center/do/doUnfollowIndustry.jsp',{params:{ industryValue}}).then(res => {
          this.labelData[index].isFollow = '0'
          this.followLabel.remove(this.labelData[index])
        })
      }
    },
    followAll(e) {
      this.checked = e.target.checked
      if(this.checked){
        var industry = []
        this.labelData.forEach(item => {
          industry.push(item.industryValue)
        })
        var industryValue = industry.join(',')
        this.$axios.get('/jsp/wap/center/do/doFollowIndustry.jsp',{params:{industryValue}}).then(res => {
            this.labelData.forEach(item => {
              item.isFollow = '1'    
            }) 
            this.followLabel = []
            this.labelData.forEach(item => {
            if(item.isFollow == '1'){
              this.followLabel.push(item)
            }
          })
        })
      }
    },
    getData(){
      this.$axios.get('/jsp/wap/center/ctrl/jsonIndustry.jsp').then(res => {
        var label = res.data
        label.forEach(item => {
          if(item.isFollow == '1'){
            this.followLabel.push(item)
          }
        })
        this.labelData = res.data
      })
    },
    searchLabel(labelId){
      let { href } = this.$router.resolve({
        name: "searchLabelMoney",
        query: {labelId}
      });
      window.open(href, "_blank");
    },
  },
  created(){
    this.getData()
  }
};
</script>

<style scoped lang="scss">
.project_title {
  margin-top: 40px;
  font-size: 18px;
  font-family: "Microsoft YaHei";
  color: rgb(0, 83, 133);
  font-weight: bold;
  padding-bottom: 20px;
  // border-bottom: 1px dashed #cdcdcd;
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
/*隐藏掉我们模型的checkbox*/
.my_protocol .input_agreement_protocol {
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  display: none;
}
/*未选中时*/
.my_protocol .input_agreement_protocol + span {
  width: 16px;
  height: 16px;
  background-color: #fff;
  display: inline-block;
  background: url(/static/img/quanxuan-2.png) no-repeat;
  background-size: contain;
  position: relative;
  top: 3px;
}
/*选中checkbox时,修改背景图片的位置*/
.my_protocol .input_agreement_protocol:checked + span {
  background: url(/static/img/quanxuan-1.png) no-repeat;
  background-size: contain;
}

.babel_list {
  width: 770px;
  .babel_btn {
    margin-bottom: 20px;
    margin-right: 20px;
  }
}

.nolike {
  width: 130px;
  height: 35px;
  line-height: 0.425;
  display: inline-block;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  border-radius: 6px;
  color: #999;
  background: #fff;
  border: 1.5px solid #999;
  border-color: #dcdfe6;
}
.like {
  width: 130px;
  height: 35px;
  line-height: 0.425;
  display: inline-block;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  border-radius: 6px;
  color: #005982;
  background: #fff;
  border: 1.5px solid #999;
  border-color: #005982;
}
.letter {
  letter-spacing: 8px;
  padding: 12px 20px 12px 30px;
}
</style>