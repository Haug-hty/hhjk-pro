<!-- // 调查问卷研判页面 -->
<template>
    <main>
        <el-button @click="nextQuestionnaire">下一份</el-button>
        <el-button @click="fitQuestionnaire">评判问卷</el-button>
        <h3>问卷状态：{{fitFlag}}</h3>
        <form id="questionnaire" style="padding: 10px;" label-width="120px" disabled>

        </form>
    </main>
</template>
<script>
    import { questionnaire_list, questionnaire_detile_get, nopass } from "@/api/questionnaire/index";
    export default {
        name: "questionnaireDetile",
        data() {
            return {
                schemeId: this.$route.query.schemeId,
                questionnaireData: [],
                flagCount: 0,
                questionnaireDetile: {},
                fitFlag:'',
            };
        },
        mounted() {
            this.getQuestionnaireList()
        },
        methods: {
            //问卷列表查询
            getQuestionnaireList() {
                let params = {
                    assessSchemeId: this.schemeId
                }
                questionnaire_list(params)
                    .then(res => {
                        this.questionnaireData = res.data.data.list
                        console.log(this.questionnaireData);
                        this.flagCount = 0;
                        this.nextQuestionnaire()
                    })
            },
            // 下一份问卷操作按钮
            nextQuestionnaire() {
                if (this.flagCount < this.questionnaireData.length) {
                    if(this.questionnaireData[this.flagCount].fit){
                        this.fitFlag ="有效"
                    } else {
                        this.fitFlag = "无效"
                    }
                    let params = {
                        assessSchemeId: this.questionnaireData[this.flagCount].assessSchemeId,
                        id: this.questionnaireData[this.flagCount].id
                    }
                    console.log(this.flagCount);

                    this.flagCount++
                    console.log(this.flagCount);
                    this.getDetile(params)
                } else {
                    return this.$message("已经是最后一份调查问卷！")
                }
            },
            getDetile(info) {
                questionnaire_detile_get(info)
                    .then(res => {
                        console.log(res.data.data);
                        this.questionnaireDetile = res.data.data
                        this.questionnaireDataInner(this.questionnaireDetile)
                    })
            },
            // 问卷判无效
            fitQuestionnaire() {
                this.$confirm('确定要判定此份调查问卷为无效问卷吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (this.flagCount <= this.questionnaireData.length) {
                        let params = {
                            assessSchemeId: this.questionnaireData[this.flagCount - 1].assessSchemeId,
                            id: this.questionnaireData[this.flagCount - 1].id
                        }
                        nopass(params).then(res => {
                            this.$message("判定成功！")
                            this.getQuestionnaireList()
                        }).catch(err => {
                            console.log(err)
                        })
                    }

                }).catch(() => {
                    this.$message({
                        message: '取消判定无效操作！',
                        type: "warning"
                    })
                })

            },

            questionnaireDataInner(info) {
                const _this = this;
                let result = info;
                this.strHtml = "";
                this.strHtmlTotal = "";
                this.getBlockList(result)
                document.getElementById("questionnaire").innerHTML = this.strHtmlTotal;

            },
            // 表单填报问题获取递归算法
            getBlockList(info) {
                if (info.nodeList) {
                    this.getodelist(info.nodeList);
                }
                if (info.blockList) {
                    for (let i = 0; i < info.blockList.length; i++) {
                        this.getBlockList(info.blockList[i])
                    }

                }
            },
            // 问题表单项渲染实现
            getodelist(info) {
                for (let i = 0; i < info.length; i++) {
                    if (info[i].nodeList == undefined || info[i].nodeList == null) {
                        if (info[i].type == "radio") {
                            this.strHtml += "<div style='padding:" + 6 + "px'>";
                            this.strHtml += "<p style='padding-:" + 6 + "px'>" + info[i].label + "：</p>";
                            for (let j = 0; j < info[i].propList.length; j++) {
                                if (info[i].val === info[i].propList[j].code) {
                                    this.strHtml +=
                                        '<label><input type="radio" name="' +
                                        info[i].name +
                                        '" value="' +
                                        info[i].propList[j].code +
                                        '" checked/>' +
                                        info[i].propList[j].label +
                                        '</label>';
                                } else {
                                    this.strHtml +=
                                        '<label><input type="radio" name="' +
                                        info[i].name +
                                        '" value="' +
                                        info[i].propList[j].code +
                                        '" />' +
                                        info[i].propList[j].label +
                                        '</label>';
                                }

                            }
                            this.strHtml += "</div>";
                            this.strHtmlTotal += this.strHtml;
                            this.strHtml = "";
                        } else if (info[i].type == "text") {
                            this.strHtml += "<div style='padding:" + 6 + "px'>";
                            this.strHtml += "<p style='padding-:" + 6 + "px'>" + info[i].label + "：</p>";
                            this.strHtml += '<input type="text" name="' + info[i].name + '" value="' + info[i].val + '" />';
                            this.strHtml += "</div>";
                            this.strHtmlTotal += this.strHtml;
                            this.strHtml = "";
                        }
                    }
                }
            },
        },
    };
</script>