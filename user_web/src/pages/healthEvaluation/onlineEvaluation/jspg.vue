<template>
    <main>
        <div style="height: 60px; padding: 15px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
            <el-row style="text-align:left;margin-top: -6px;">
                <el-form :inline="true" :model="formInline" style="height: 35px;text-align: left;display: inline-block;">
                <el-form-item label="评估方案:">
                    <el-select v-model="formInline.schemeId" placeholder="请选择评估方案" clearable style="width: 300px;"
                        filterable>
                        <el-option v-for="item in schemeOptions" :key="item.id" :label="item.label" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            <el-button @click="commitScheme" type="text" v-if="schemeData.processState == 2">结束数据填报工作</el-button>
            </el-form>
            </el-row>

        </div>
        <h2 style="text-align: center;margin:10px;">{{schemeName}}--{{rlName}}--评估结果</h2>
        <table id="table" border="1" cellspacing='0' width="98%" style="text-align: center;">
        </table>


    </main>
</template>
<script>
    import { scheme_tableList_query, scheme_data_score, schemeProcessState } from '@/api/scheme/index'
    import dataMo from '@/pages/jianbaoData.json'
    export default {
        inject:['reload'],
        name: 'weight',
        data() {
            return {
                formInline: {
                    schemeId: ''
                },
                schemeOptions: [],
                treeData: {},
                strHtml: '',//表格生成行
                strHtmlTotal: '',//表格生成最终html代码块
                schemeName: '',
                layerDepth:null,
                schemeData:{},
                rlName:'',
            }
        },
        components: {},
        created() {
            this.getScchemeList()
        },
        methods: {
            //标准信息实时查询
            getScchemeList() {
                let param = {
                    pageSize:100,
                    pageNum:1,
                }
                scheme_tableList_query(param)
                    .then(res => {
                        console.log(res);
                        this.schemeOptions = res.data.data.list
                        this.schemeOptions.forEach(item=>{
                            if(item.name){
                                item.label = item.name
                            }                            
                            if(item.rlInfoVo){
                                item.label = item.label + '--' + item.rlInfoVo.name
                            }
                            if(item.year){
                                item.label = item.label +'--'+ item.year
                            }
                            
                        })
                    })
            },

            GetChild(arr) {
                let varT = ''
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].finalNodeSize == 0) {
                        if (this.strHtml == '') {
                            if (arr[i].score) {
                                varT = arr[i].score[0]
                                if(varT.scoreDesc){
                                    this.strHtml += '<td>' + arr[i].name + '(' + arr[i].code + ')' + '</td>' + '<td>' + varT.score + '</td><td>' + varT.scoreDesc + '</td></tr>';
                                } else{
                                    this.strHtml += '<td>' + arr[i].name + '(' + arr[i].code + ')' + '</td>' + '<td>' + varT.score + '</td><td>' +'-' + '</td></tr>';
                                }
                                // this.strHtml += '<tr><td>' + arr[i].name + '(' + arr[i].code + ')' + '</td>' + '<td>' + varT.score + '</td><td>' + varT.scoreDesc + '</td></tr>';
                                this.strHtmlTotal += this.strHtml;
                                this.strHtml = '';
                            } else {
                                this.strHtml += '<tr><td>' + arr[i].name + '(' + arr[i].code + ')' + '</td>' + '<td>' + '-' + '</td><td>' + '-' + '</td></tr>';
                                this.strHtmlTotal += this.strHtml;
                                this.strHtml = '';
                            }


                        } else {
                            if (arr[i].score) {
                                varT = arr[i].score[0]
                                if(varT.scoreDesc){
                                    this.strHtml += '<td>' + arr[i].name + '(' + arr[i].code + ')' + '</td>' + '<td>' + varT.score + '</td><td>' + varT.scoreDesc + '</td></tr>';
                                } else{
                                    this.strHtml += '<td>' + arr[i].name + '(' + arr[i].code + ')' + '</td>' + '<td>' + varT.score + '</td><td>' +'-' + '</td></tr>';
                                }
                                
                                this.strHtmlTotal += this.strHtml;
                                this.strHtml = '';
                            } else {
                                this.strHtml += '<td>' + arr[i].name + '(' + arr[i].code + ')' + '</td>' + '<td>' + '-' + '</td><td>' + '-' + '</td></tr>';
                                this.strHtmlTotal += this.strHtml;
                                this.strHtml = '';
                            }

                        }
                    } else if (arr[i].finalNodeSize == 1) {
                        if (this.strHtml == '') {
                            this.strHtml += '<tr><td>' + arr[i].name + '(' + arr[i].code + ')' + '</td>';
                        } else {
                            this.strHtml += '<td>' + arr[i].name + '(' + arr[i].code + ')' + '</td>';
                        }
                        this.GetChild(arr[i].children);
                    } else {
                        if (this.strHtml == '') {
                            this.strHtml += '<tr><td rowspan="' + arr[i].finalNodeSize + '">' + arr[i].name + '(' + arr[i].code + ')' + '</td>';
                        } else {
                            this.strHtml += '<td rowspan="' + arr[i].finalNodeSize + '">' + arr[i].name + '(' + arr[i].code + ')' + '</td>';
                        }
                        this.GetChild(arr[i].children);
                    }
                }
            },
            bindRiverHealthInfo() {
                const _this = this
                var result = this.treeData;
                // let result =dataMo.data.resultTable;

                this.strHtml = '';
                this.strHtmlTotal = '';
                if (!result.score) {// 没有指标录入数据，不展示
                    // this.strHtml += '<tr><td>' + result.name + '(' + result.code + ')' + '</td></tr>';
                    this.strHtml += ''
                    document.getElementById('table').innerHTML = this.strHtmlTotal
                    return
                } else {
                    this.strHtml += '<tr><td rowspan="' + result.finalNodeSize + '">' + result.name + '(' + result.code + ')</span></td>';
                    this.GetChild(result.children);
                }
                this.getLayerDepth(result)
                let colspanNum = this.layerDepth
                let totalScore = result.score[0]
                this.strHtmlTotal += '<tr><td colspan="' + colspanNum + '">' + '综合得分' + '</td><td>' + totalScore.score + '</td><td>' + totalScore.scoreDesc + '</td></tr>'

                document.getElementById('table').innerHTML = this.strHtmlTotal


            },
            getLayerDepth(result){
                if(result.children){
                    this.getLayerDepth(result.children[0])
                } else {
                    this.layerDepth = result.layerDepth
                }
            },

            /** 确认评估数据无误后结束数据填报阶段工作*/
            commitScheme(){
                this.$confirm('确认评估数据和计算结果无误并且结束本方案数据填报阶段工作吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let param = {
                        id: this.formInline.schemeId,
                        processState : 3
                    }
                    schemeProcessState(param)
                    .then(res=>{
                        this.$message("数据填报工作已结束！")
                        this.reload()
                    })

                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '已取消'
                    });
                });
            },

        },
        computed: {
            //计算指标选项中的值变化
            getSchemeId: function () {
                return this.formInline.schemeId
            },
        },
        watch: {
            //
            getSchemeId: {
                handler: function () {
                    this.treeData = {}
                    this.schemeOptions.forEach(item => {
                        if (item.id == this.getSchemeId) {
                            this.schemeName = item.name
                            this.rlName = item.rlInfoVo.name
                            this.schemeData = item
                        }

                    });
                    let id = this.getSchemeId
                    scheme_data_score(id)
                        .then(res => {
                            this.treeData = res.data.data
                            this.bindRiverHealthInfo()
                        })
                },
            },
        }
    }
</script>
<style scoped>
</style>