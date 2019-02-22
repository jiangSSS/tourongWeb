<template>
    <div class="w1200 clearfix">
        <div class="w840 fll">
            <div v-loading="loading">
                <div class="act_list clearfix" v-for="(item, index) in pageList" :key="index">
                    <div>
                        <img :src="$url + item.imgPath" alt width="270px" height="180px" class="fll" @click="toActivityDetailPage(item.id)">
                        <div class="fll list">
                            <p class="list-title" @click="toActivityDetailPage(item.id)">{{item.title}}</p>
                            <p class="list-content">
                                <i class="local"></i>
                                {{item.address}}
                            </p>
                            <p class="list-content">
                                <i class="company"></i>
                                {{item.speaker}}
                            </p>
                            <!-- <p class="list-content2">
              <i class="num"></i>
              报名人数：{{item.applyNumStr}}
            </p> -->
                            <p class="list-content2">
                                <i class="time"></i>
                                报名时间：{{item.regStartTimeStr}} 至 {{item.regEndTimeStr}}
                            </p>
                        </div>
                    </div>
                    <div class="flr">
                        <span :class="item.status == 1 ? 'apply' : 'over'" @click="cancelBtn(item.id,index)">取消关注</span>
                        <!-- @click="apply(item.status,item.id)" -->
                        <button v-if="item.status == 1" class="applyBtn" @click="toActivityDetailPage(item.id)">我要报名</button>
                        <button v-else-if="item.status == 0" class="overBtn" @click="toActivityDetailPage(item.id)">活动预告</button>
                        <button v-else-if="item.status == -1" class="overBtn" @click="toActivityDetailPage(item.id)">往期回顾</button>
                    </div>
                </div>
            </div>
            <div class="load_more" @click="morePage" v-show="more">加载更多...</div>
            <p v-show="invest_show" class="noAtt">你没有关注任何活动哦~
                <span style="color:#005982;cursor:pointer" @click="toActivity">前去关注→</span>
            </p>
            <!-- <p style="color:#999;" v-show="noMore">-------------------------------------------------没有更多活动了----------------------------------------------------</p> -->
        </div>
        <div class="lg_box" v-show="should_login" @click="should_login = false"></div>
        <Login :should_login="should_login"></Login>
     
    </div>
</template>

<script>
    import * as Cookies from 'js-cookie'

    export default {
        data() {
            return {
                appleform: {
                    memberName: "",
                    memberMobile: "",
                    remark: ""
                },
                should_login: false,
                categoryList: [],
                // statusList: ["报名中", "未开始", "已结束", "往期活动", "筛选"],
                statusList: [],
                pageList: [],
                loading: false,
                newsloading: false,
                category: '',
                status: '',
                pn: 1,
                totalCount: 0,
                more: false,
                noMore: false,
                hint: '',
                success: false,
                toast_show: false,
                sub_act: true,
                showApply: false,
                activityId: '',
                invest_show:false
            };
        },
        methods: {
            toActivity() {
                let { href } = this.$router.resolve({
                    name: "activity",
                });
                window.open(href, '_blank');
            },
            cancelBtn(id, index) {
                this.$confirm("即将取消关注, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$axios.get(`/jsp/wap/trActivity/do/doUnfollow.jsp?id=${id}`).then(res => {
                        console.log("取消关注",res)
                        if (res.success == 'true') {
                            this.pageList.splice(index, 1)
                            if(this.pageList.length == 0){
                                this.invest_show = true
                            }
                        }
                    })
                })
            },
            getActData() {
                this.loading = true
                this.$axios.get('/jsp/wap/center/ctrl/jsonFollowList.jsp?type=4', ).then(res => {
                    console.log("关注列表",res)
                    if (res.success == "true") {
                        this.pageList = res.data.pageList
                        this.totalCount = res.data.pagination.totalCount;
                        if(this.pageList.length == 0){
                            this.invest_show = true
                        }
                        if (this.totalCount > this.pageList.length) {
                            this.more = true
                            this.noMore = false
                        } else {
                            this.more = false
                            this.noMore = true
                        }
                        this.pn = 1
                        this.loading = false
                    }
                })
            },
            morePage() {
                this.pn += 1
                this.loading = true
                this.$axios.get('/jsp/wap/center/ctrl/jsonFollowList.jsp?type=4').then(res => {
                    if (res.success == "true") {
                        this.pageList = [...this.pageList, ...res.data.pageList]
                        this.totalCount = res.data.pagination.totalCount;
                        if (this.totalCount > this.pageList.length) {
                            this.more = true
                            this.noMore = false
                        } else {
                            this.more = false
                            this.noMore = true
                        }
                        this.loading = false
                    }
                })
            },
            toActivityDetailPage(id) {
                let { href } = this.$router.resolve({
                    name: "activityDetail",
                    query: { id }
                });
                window.open(href, '_blank');
            },
        },
        created() {
            this.getActData()
        }
    };
</script>

<style scoped lang="scss">
    //选择类型
    .act_type {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        color: rgb(51, 51, 51);
        font-weight: bold;
        line-height: 1.857;
    }

    .type_item {
        font-size: 12px;
        font-family: "Microsoft YaHei";
        color: #444;
        cursor: pointer;
        padding-right: 45px;
    }

    //活动列表
    .act_list {
        cursor: pointer;
        width: 810px;
        height: 180px;
        margin-bottom: 20px;
    }

    .list {
        margin-left: 20px;
    }

    .list-title {
        font-size: 20px;
        font-family: "Microsoft YaHei";
        color: rgb(51, 51, 51);
        margin: 10px 0 25px;
    }

    .list-title:hover {
        color: #005385;
    }

    .list-content {
        margin-left: 30px;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        color: rgb(128, 128, 128);
        position: relative;
        .local {
            position: absolute;
            display: inline-block;
            top: -3px;
            left: -30px;
            width: 20px;
            height: 20px;
            background: url(/static/img/local.png) no-repeat center;
            background-size: contain;
        }
        .company {
            position: absolute;
            display: inline-block;
            top: -3px;
            left: -30px;
            width: 20px;
            height: 20px;
            background: url(/static/img/company.png) no-repeat center;
            background-size: contain;
        }
    }

    .list-content2 {
        margin-left: 30px;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        color: rgb(153, 153, 153);
        position: relative;
        .num {
            position: absolute;
            display: inline-block;
            top: -3px;
            left: -30px;
            width: 20px;
            height: 20px;
            background: url(/static/img/num.png) no-repeat center;
            background-size: contain;
        }
        .time {
            position: absolute;
            display: inline-block;
            top: -3px;
            left: -30px;
            width: 20px;
            height: 20px;
            background: url(/static/img/time.png) no-repeat center;
            background-size: contain;
        }
    }

    .apply {
        display: block;
        text-align: right;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        color: #ff9440;
        font-weight: bold;
        margin-top: 10px;
    }

    .over {
        display: block;
        text-align: right;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        color: #999;
        font-weight: bold;
        margin-top: 10px;
    }

    .applyBtn {
        width: 110px;
        height: 35px;
        color: #fff;
        line-height: 0.425;
        display: inline-block;
        white-space: nowrap;
        cursor: pointer;
        background: #005982;
        border: 1px solid #dcdfe6;
        border-color: #dcdfe6;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        margin-top: 80px;
        transition: 0.1s;
        font-weight: 500;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 12px 20px;
        border-radius: 4px;
    }

    .overBtn {
        width: 110px;
        height: 35px;
        color: #c4c4c4;
        line-height: 0.425;
        display: inline-block;
        white-space: nowrap;
        cursor: pointer;
        background: #e6e6e6;
        border: 1px solid #dcdfe6;
        border-color: #dcdfe6;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        margin-top: 80px;
        transition: 0.1s;
        font-weight: 500;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 12px 20px;
        border-radius: 4px;
    }

    //加载更多
    .load_more {
        width: 810px;
        text-align: center;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        color: rgb(153, 153, 153);
        line-height: 1.333;
        padding: 10px 0;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        margin: 40px 0 75px;
        cursor: pointer;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }

    .load_more:active {
        background: #fff;
        border-color: #409eff;
        color: #409eff;
    }

    //活动排表
    .act_timelist {
        margin: 20px 0;
    }

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
            .mes_more:hover {
                color: #005385;
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

    .active {
        color: #005982;
        font-weight: 700;
    }
    .noAtt {
        margin-top: 150px;
        text-align: center;
    }
</style>