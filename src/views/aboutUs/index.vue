<template>
  <div>
    <img src="/static/img/about-1.jpg" alt width="100%" style="min-width: 1200px;">
    <div class="w1200">
      <div class="title">
        <p class="title_1">关于我们</p>
        <p class="title_2">倾力打造的专业的投融资信息服务平台</p>
      </div>
      <div class="clearfix">
        <div class="fll box_content">
          <el-card>
            <strong>“证券传媒·投融连线”</strong><span style="color:#666;">是证券日报传媒股份有限公司（以下简称
            “证券传媒”）倾力打造的专业的投融资信息服务平台。凭借自身
            优势和强大的整合能力，建立全球范围内的资金和项目信息数据
            库，并通过线上与线下服务并重、标准化与定制化需求互补的专业
            服务体系，为项目方和投资方寻找投资人或资金/项目/专家/政策
            等，解决投融资信息不对称的问题，同时为项目发展（或产业升
            级）提供必要的智力支持。</span>
          </el-card>
        </div>
        <div class="flr about_content">
        </div>
      </div>
    </div>
    <div class="servier">
        <div class="w1200 clearfix">
          <div class="title2">
            <p class="title_1">我们的服务</p>
            <div class="line"></div>
          </div>
          <div class="ser-1 fll">
            <span class="ser_title">寻找目标</span>
            <span class="ser_content">按客户需求寻找项目、寻找资金、寻找专家、寻找人才、寻找政策等</span>
          </div>
          <div class="ser-2 fll">
            <span class="ser_title">推送信息</span>
            <span class="ser_content">按客户定制的信息要求，及时将优选后的信息推送给客户</span>
          </div>
          <div class="ser-3 fll">
            <span class="ser_title">衔接服务</span>
            <span class="ser_content">安排有关各方直接面对面沟通</span>
          </div>
          <div class="ser-4 fll">
            <span class="ser_title">推广服务</span>
            <span class="ser_content">根据客户的要求，通过我公司的全球财经资讯媒体网络，将客户的投资、融资、战略合作等需求信息定向发送给符合条件的潜在合作对象</span>
          </div>
          <div class="ser-5 fll">
            <span class="ser_title">研修服务</span>
            <span class="ser_content">是我公司精心打造的以小型专题研讨会、主题游学、标杆考察等为核心内容的常年服务项目，旨在加强交流、把握大势、学习标杆</span>
          </div>
        </div>
    </div>
    <div class="advantage">
      <div class="w1200">
        <div class="title2">
            <p class="title_1">我们的优势</p>
            <div class="line"></div>
        </div>
        <el-card>
          <p class="card_title">20多年资源积累成就于一身</p>
          <div class="bulb">
            <span class="bulb_title">证券传媒</span>
            <span class="bulb_content1">具有近20年的财经资讯经验，拥有中国境内3000多家上市公司的客户资源，合作达20年之久</span>
            <span class="bulb_content2">无论与上市公司还是其高管，我们均保持着良好的关系与密切的合作</span>
            <span class="bulb_content3">我们还与国内外相关政府监管部门、金融机构、投资机构建立了良好的信任与合作关系</span>
            <span class="bulb_content4">证券传媒拥有全球网络、信息与资源。我们在中国境内设有30多个办事机构，同时在北美、欧洲的主要大国设有分支机构</span>
            <span class="bulb_content5">在投融资项目信息、专家和人才资源、产业政策研究、战略资源匹配以及信息传播推广等方面所具有独特优势</span>
            <span class="bulb_content6">在国内各地建立了完整的业务体系、国际业务体系也日臻完善</span>
          </div>
        </el-card>
        <p class="card_title" style="margin:50px 0; margin-left:40px; ">四大支持平台提升衔接实力</p>
        <div class="suport">
          <span class="suport_title1">全球财经媒体精准推送系统</span>
          <span class="suport_content1">将您的投融资需求精准推送到指定的国家、地区和目标人群</span>
          <span class="suport_title2">全球路演平台</span>
          <span class="suport_title3">全球专家平台</span>
          <span class="suport_title4">全球办事处系统</span>
        </div>
        <el-card style="margin-top:45px;" class="clearfix">
          <p class="card_title">三千+计划助力高端融合</p>
          <div class="brag1 fll">
            <span class="num">3000</span>
            <span class="brag_content">优选1000家上市公司、1000家私募机构、1000家资金机构</span>
          </div>
          <div class="brag2 fll">
            <span class="num">500</span>
            <span class="brag_content">精挑500家会计师事务所、律师事务所、券商等专业服务机构</span>
          </div>
          <div class="brag3 fll">
            <span class="num">10万</span>
            <span class="brag_content">筛选并认证10万名行业专家</span>
          </div>
        </el-card>
          <p class="card_title" style="margin-left:40px;margin-top:50px;">夯实平台基础，快速精准对接</p>
          <div class="base"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.title {
  background: url(/static/img/about-title.png) no-repeat center;
  background-size: contain;
  width: 950px;
  margin: 0 auto;
  text-align: center;
  margin-top:60px;
  margin-bottom:20px;
  .title_1 {
    font-size: 35px;
    font-family: "Microsoft YaHei";
    color: rgb(51, 51, 51);
    margin-bottom: 10px;
    position: relative;
    top: -30px;
  }
  .title_2 {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    color: rgb(102, 102, 102);
    position: relative;
    top: -30px;
  }
}
.title2 {
  width: 950px;
  height: 30px;
  margin: 0 auto;
  text-align: center;
  margin-top: 90px;
  margin-bottom: 70px;
  .title_1 {
    font-size: 35px;
    font-family: "Microsoft YaHei";
    color: rgb(51, 51, 51);
    margin-bottom: 10px;
    position: relative;
    top: -30px;
  }
  .line{
    background-color: #005982;
    width: 85px;
    height: 5px;
    margin:0 auto;
    position: relative;
    top: -20px;
  }
}
.box_content {
  font-family: "Microsoft YaHei";
  line-height: 1.6;
  font-size: 18px;
  /deep/ {
    .el-card {
      width: 679px;
      box-sizing: border-box;
      padding-right: 15px;
    }
  }
}
.about_content {
  background: url(/static/img/about_content.png) no-repeat center;
  background-size: contain;
  width: 300px;
  height: 310px;
  position: relative;
  top: -50px;
  left: -100px;
}

.servier {
  width: 100%;
  min-width: 1200px;
  height: 650px;
  background-color: #f0efef;
  padding-top: 10px;
  padding-bottom: 40px;
}

.ser-1 {
  background: url(/static/img/ser-1.png) no-repeat center;
  background-size: contain;
  width: 220px;
  height: 460px;
  position: relative;
  .ser_title{
  font-size: 26px;
  font-family: "Microsoft YaHei";
  color: rgb( 51, 51, 51 );
  position: absolute;
  top: 215px;
  left: 60px;
  }
  .ser_content{
    display: block;
    width: 182px;
    font-size: 14px;
    font-family: "Microsoft YaHei";
    line-height: 2;
    color: rgb( 51, 51, 51 );
    position: absolute;
    top: 280px;
    left: 20px;
  }
}
.ser-2 {
  background: url(/static/img/tuisongxinxi.png) no-repeat center;
  background-size: contain;
  width: 220px;
  height: 460px;
  margin-left: 20px;
  margin-right: 30px;  
  position: relative;
  .ser_title{
  font-size: 26px;
  font-family: "Microsoft YaHei";
  color: rgb( 51, 51, 51 );
  position: absolute;
  top: 215px;
  left: 60px;
  }
  .ser_content{
    display: block;
    width: 182px;
    font-size: 14px;
    font-family: "Microsoft YaHei";
    line-height: 2;
    color: rgb( 51, 51, 51 );
    position: absolute;
    top: 280px;
    left: 20px;
  }
}
.ser-3 {
  background: url(/static/img/xianjiefuwu.png) no-repeat center;
  background-size: contain;
  width: 220px;
  height: 460px;
  position: relative;
  .ser_title{
  font-size: 26px;
  font-family: "Microsoft YaHei";
  color: rgb( 51, 51, 51 );
  position: absolute;
  top: 215px;
  left: 60px;
  }
  .ser_content{
    display: block;
    width: 182px;
    font-size: 14px;
    font-family: "Microsoft YaHei";
    line-height: 2;
    color: rgb( 51, 51, 51 );
    position: absolute;
    top: 280px;
    left: 20px;
  }
}
.ser-4 {
  background: url(/static/img/tuiguangfuwu.png) no-repeat center;
  background-size: contain;
  width: 220px;
  height: 460px;
  margin-left: 20px;
  margin-right: 20px;
  position: relative;
  .ser_title{
  font-size: 26px;
  font-family: "Microsoft YaHei";
  color: rgb( 51, 51, 51 );
  position: absolute;
  top: 215px;
  left: 60px;
  }
  .ser_content{
    display: block;
    width: 182px;
    font-size: 14px;
    font-family: "Microsoft YaHei";
    line-height: 2;
    color: rgb( 51, 51, 51 );
    position: absolute;
    top: 280px;
    left: 20px;
  }
}
.ser-5 {
  background: url(/static/img/yanxiufuwu.png) no-repeat center;
  background-size: contain;
  width: 220px;
  height: 460px;
  position: relative;
  .ser_title{
  font-size: 26px;
  font-family: "Microsoft YaHei";
  color: rgb( 51, 51, 51 );
  position: absolute;
  top: 215px;
  left: 60px;
  }
  .ser_content{
    display: block;
    width: 182px;
    font-size: 14px;
    font-family: "Microsoft YaHei";
    line-height: 2;
    color: rgb( 51, 51, 51 );
    position: absolute;
    top: 280px;
    left: 20px;
  }
}
.card_title{
  padding-left: 20px;
  margin-left: 20px;
  border-left: 5px solid #005982;
  font-size: 30px;
  font-family: "Microsoft YaHei";
  color: rgb( 51, 51, 51 );
  font-weight: bold;
}

.bulb {
  background: url(/static/img/dengpao.png) no-repeat center;
  background-size: contain;
  width: 750px;
  height: 330px;
  margin: 0 auto;
  margin-bottom: 30px;
  position: relative;
  .bulb_title {
    font-size: 31.071px;
    font-family: "Microsoft YaHei";
    color: rgb( 51, 73, 93 );
    position: absolute;
    left: 314px;
    top: 165px;
  }
  .bulb_content1 {
    display: block;
    width: 226px;
    font-size: 14px;
    font-family: "Microsoft YaHei";
    color: #999;
    line-height: 1.5;
    position: absolute;
    top: 10px;
    left: 20px;
  }
  .bulb_content2 {
    display: block;
    width: 226px;
    font-size: 14px;
    font-family: "Microsoft YaHei";
    color: #999;
    line-height: 1.5;
    position: absolute;
    top: 25px;
    left: 500px;
  }
  .bulb_content3 {
    display: block;
    width: 323px;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    color: rgb( 51, 51, 51 );
    line-height: 1.5;
    position: absolute;
    top: 150px;
    left: -100px;
  }
  .bulb_content4 {
    display: block;
    width: 323px;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    color: rgb( 51, 51, 51 );
    line-height: 1.5;
    position: absolute;
    top: 140px;
    left: 550px;
  }
  .bulb_content5 {
    display: block;
    width: 239px;
    font-size: 14px;
    font-family: "Microsoft YaHei";
    line-height: 1.5;
    color: #999;
    position: absolute;
    top: 270px;
    left: 20px;
  }
  .bulb_content6 {
    display: block;
    width: 226px;
    font-size: 14px;
    font-family: "Microsoft YaHei";
    line-height: 1.5;
    color: #999;
    position: absolute;
    top: 270px;
    left: 500px;
  }
}
.suport {
  background: url(/static/img/zhichipingtai.png) no-repeat center;
  background-size: contain;
  width: 380px;
  height: 380px;
  margin: 0 auto;
  position: relative;
  .suport_title1 {
    font-size: 22px;
    font-family: "Microsoft YaHei";
    color: rgb( 51, 51, 51 );
    font-weight: bold;
    position: absolute;
    top: 40px;
    left: -290px;
  }
  .suport_content1 {
    display: block;
    width: 205px;
    font-size: 14px;
    font-family: "Microsoft YaHei";
    line-height: 2;
    color: #999;
    position: absolute; 
    left: -250px;
    top: 80px;
  }
  .suport_title2 {
    display: block;
    width: 200px;
    font-size: 22px;
    font-family: "Microsoft YaHei";
    color: rgb( 51, 51, 51 );
    font-weight: bold;
    position: absolute;
    top: 40px;
    left: 400px;
  }
  .suport_title3 {
    font-size: 22px;
    font-family: "Microsoft YaHei";
    color: rgb( 51, 51, 51 );
    font-weight: bold;
    position: absolute;
    top: 320px;
    left: -160px;
  }
  .suport_title4 {
    display: block;
    width: 200px;
    font-size: 22px;
    font-family: "Microsoft YaHei";
    color: rgb( 51, 51, 51 );
    font-weight: bold;
    position: absolute;
    top: 320px;
    left: 400px;
  }
}

.brag1 {
  width: 320px;
  height: 397px;
  background: url(/static/img/3000.jpg) no-repeat center;
  background-size: contain;
  margin-left: 45px;
  position: relative;
  .num {
    font-size: 40px;
    font-family: "Microsoft YaHei";
    color: rgb( 255, 255, 255 );
    font-weight: bold;
    position: absolute;
    top: 40px;
    left: 110px;
  }
}
.brag2 {
  width: 320px;
  height: 397px;
  background: url(/static/img/500.jpg) no-repeat center;
  background-size: contain;
  margin: 0 45px;
  position: relative;
  .num {
    font-size: 40px;
    font-family: "Microsoft YaHei";
    color: rgb( 255, 255, 255 );
    font-weight: bold;
    position: absolute;
    top: 40px;
    left: 123px;
  }
}
.brag3 {
  width: 320px;
  height: 397px;
  background: url(/static/img/10wan.jpg) no-repeat center;
  background-size: contain;
  position: relative;
  margin-bottom: 40px;
  .num {
    font-size: 40px;
    font-family: "Microsoft YaHei";
    color: rgb( 255, 255, 255 );
    font-weight: bold;
    position: absolute;
    top: 40px;
    left: 110px;
  }
}

.brag_content {
  display: block;
  width: 255px;
  font-size: 24px;
  font-family: "Microsoft YaHei";
  color: rgb( 51, 51, 51 );
  line-height: 1.917;
  position: absolute;
  top: 230px;
  left: 40px;
}

.base {
  width: 1200px;
  height: 338px;
  background: url(/static/img/tobase.png) no-repeat center;
  background-size: contain;
  margin-bottom: 80px;
}
</style>