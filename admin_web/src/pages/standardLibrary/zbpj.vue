<!-- 指标层赋分页面 -->

<template>
    <main>
        <div
            style="height: 50px; padding: 10px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
            <el-form :inline="true" :model="formInline" style="height: 35px;text-align: left;margin-top: -8px;">

                <el-form-item label="规范名称:">
                    <el-select v-model="formInline.guidelinesId" filterable remote reserve-keyword placeholder="请输入关键词"
                        :remote-method="remoteMethod" :loading="loading" :style="{width: '100%'}">
                        <el-option v-for="item in guidelinesOptions" :key="item.value" :label="item.value"
                            :value="item.data">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="河湖类型:">
                    <el-select v-model="formInline.rlType" placeholder="请选择" :style="{width: '100%'}">
                        <el-option v-for="item in typeOptions" :key="item.doKey" :label="item.doValue"
                            :value="item.doKey">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="queryTableList" size="small">查询</el-button>
                    <el-button type="primary" @click="reset" size="small" plain>重置</el-button>

                </el-form-item>
            </el-form>
        </div>
        <div class="bodyPage">
            <div style="width: 100%;">
                <el-table :data="guidelineTableData" stripe style="width: 100%;font-size: 12px;text-align: center;">
                    <el-table-column type='index' label="序号" width="50" align="center" header-align="center">
                    </el-table-column>
                    <el-table-column prop="guidelinesCode" label="标准编号" width="150" align="center"
                        header-align="center">
                        <template slot-scope="scope">
                            <div>{{scope.row.guidelinesVo.code}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="guidelinesName" label="规范名称" align="center" header-align="center">
                        <template slot-scope="scope">
                            <div>{{scope.row.guidelinesVo.name}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mbcName" label="河湖对象" align="center" header-align="center">
                        <template slot-scope="scope">
                            <div>{{scope.row.superParent[0].name}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="指标名称" align="center" header-align="center">
                    </el-table-column>
                    <el-table-column prop="recordFlag" label="赋分状态" align="center" header-align="center">
                        <template slot-scope="scope">
                            <div v-if="scope.row.recordFlag == true" style="color:#00A600">
                                指标已赋分
                            </div>
                            <div v-if="scope.row.recordFlag == false" style="color:#F75000"></div>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-button @click="detile(scope)" size="small" type="info" plain>指标赋分</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页栏 -->
                <el-row type="flex" justify="end">
                    <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentChange"
                        :current-page="pagination.current" :page-sizes="[10, 20, 50, 100]"
                        :page-size="pagination.pageSize" :total="pagination.total"
                        layout="prev,pager,next,jumper,total,sizes"></el-pagination>
                </el-row>
            </div>
            <!-- 指标赋分详情 -->
            <el-dialog append-to-body :visible.sync="dialogFormVisible" width="50%" :title="titleName">
                <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px">
                    <el-form-item v-for="(domain, index) in dynamicValidateForm.targetScoreList" :label="'指标赋分:'"
                        :key="domain.key">
                        <span>指标赋分评价：</span>
                        <el-input v-model="domain.evaluate" style="width:60%;" readonly disabled></el-input>
                        <el-button @click="addEvaluate(domain,index)">填报</el-button>
                        <br>
                        <span class="examplesSty">例：[[95,100], [90,95), [80,90), [60,80), [0,60)]，符号都为英文半角符号</span>
                        <br>
                        <span>基础数据类型：</span>
                        <el-select v-model="domain.dataType" placeholder="请选择数据类型" style="width:60%;margin-top: 10px;"
                            clearable>
                            <el-option v-for="item in dataTypeOptions" :key="item.doKey" :label="item.doValue"
                                :value="item.doKey">
                            </el-option>
                        </el-select>
                        <br>
                        <span>关联函数：</span>
                        <el-select v-model="domain.relationFun" placeholder="请关联对应方法函数"
                            style="width:60%;margin-top: 10px;" clearable filterable>
                            <el-option v-for="item in funList" :key="item.code" :label="item.title" :value="item.code">
                            </el-option>
                        </el-select>
                        <br>
                        <span>指标选择项：</span>
                        <el-input v-model="domain.optionalIndicators" style="width:60%;margin-top: 10px;"></el-input>
                        <br>
                        <span class="examplesSty">例：指标项底泥污染指数选择项：污染指数/重金属生态风险指数</span>
                        <br>
                        <span>指标描述：</span>
                        <el-input v-model="domain.stdExplain" type="textarea" style="width:60%;margin-top: 10px;"></el-input>
                        <br>

                        <el-button v-if='index!=0' @click.prevent="removeDomain(domain)" type="danger">删除</el-button>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addDomain" type='success'>新增指标赋分项</el-button>
                    <el-button type="primary" @click="submitForm(dynamicValidateForm)">提交</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <!-- <el-button type="primary" @click="submitNew(addNewForm),dialogFormVisible = false">确 定</el-button> -->
                </div>
            </el-dialog>
            <el-dialog append-to-body :visible.sync="dialogCompont">
                <textTrs :dataTrs="dataTrs" ref="textTrs" v-if="showTextTrs"></textTrs>


                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogCompont = false">取 消</el-button>
                    <el-button type="primary" @click="componentSubmit">确 定</el-button>
                </div>
            </el-dialog>

        </div>
    </main>

</template>

<script>
    import { guidelines_otions_select, target_byGuidelineId, target_tableList_search, target_score_save, 
        target_score_targetId_query } from '@/api/standard/index'
    import { fun_list } from '@/api/mian/index'
    import { dict_search_domain } from '@/api/dict/index'
    import textTrs from "@/components/textTrs"
    export default {
        name: 'zbtx',
        data() {
            return {
                formInline: {
                    rlType: '',
                    guidelinesId: '',
                },
                guidelineTableData: [],
                guidelinesOptions: [],
                typeOptions: [],
                loading: false,
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                choseCode: '',
                choseType: '',
                choseTarget: '',
                dialogFormVisible: false,
                dynamicValidateForm: {
                    guidelinesTargetId: '',
                    targetScoreList: [{
                        evaluate: '',
                        relationFun: '',
                        optionalIndicators: '',
                        id: ''
                    }],
                },
                funList: [],
                dataTypeOptions: [],
                dialogCompont: false,
                indexType: 0,
                dataComponent: '',
                titleName: '',
                showTextTrs:false,
                dataTrs:''
            }
        },
        components: {
            textTrs
        },
        created() {
            this.dataTypeDictSearch()
            this.rlTypeDictSearch()
            this.queryTableList()

        },
        methods: {
            //河湖类型字典信息查询
            rlTypeDictSearch() {
                let domian = 'rlType'
                dict_search_domain(domian)
                    .then(response => {
                        this.typeOptions = response.data.data
                        
                        console.log(this.typeOptions)
                    }).catch(() => {
                        console.log(err)
                    })
            },
            //数据类型信息查询
            dataTypeDictSearch() {
                let domian = 'dataType'
                dict_search_domain(domian)
                    .then(response => {
                        this.dataTypeOptions = response.data.data
                    }).catch(() => {
                        console.log(err)
                    })
            },
            //标准信息实时查询
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        guidelines_otions_select(query)
                            .then(res => {
                                this.loading = false;
                                this.guidelinesOptions = res.data.data
                            })

                    }, 200);
                } else {
                    this.guidelinesOptions = []
                }
            },

            //方法函数包选项值查询
            getFunList(guidelinesId,rlType) {
                let params = {
                    guidelinesId:guidelinesId,
                    rlType:rlType
                }
                fun_list(params)
                    .then(res => {
                        this.funList = res.data.data
                    })

            },

            queryTableList() {
                let params = {
                    guidelinesId: this.formInline.guidelinesId,
                    rlType: this.formInline.rlType,
                    queryExt: {
                        queryType: "depth",
                    },
                    pageSize: this.pagination.pageSize,
                    pageNum: this.pagination.current
                }
                target_tableList_search(params)
                    .then(res => {
                        this.guidelineTableData = res.data.data.list
                        this.pagination.total = res.data.data.total
                    })
            },

            //删除指标赋分项
            removeDomain(item) {
                var index = this.dynamicValidateForm.targetScoreList.indexOf(item)
                if (index !== -1) {
                    this.dynamicValidateForm.targetScoreList.splice(index, 1)
                }
            },
            //新增指标赋分项
            addDomain() {
                this.dynamicValidateForm.targetScoreList.push({
                    evaluate: '',
                    relationFun: '',
                    optionalIndicators: '',
                    key: Date.now()
                });
            },

            //详细指标赋分项填报
            addEvaluate(info,index) {
                
                 if (info.evaluate) {
                    this.dataTrs = info.evaluate
                } else {
                    this.dataTrs = ''
                }
                this.showTextTrs = true
                this.dialogCompont = true
                this.indexType = index
            },
            //评价分值提交
            componentSubmit() {
                this.dataComponent = this.$refs.textTrs.submitForm()
                this.dynamicValidateForm.targetScoreList[this.indexType].evaluate = this.dataComponent
                this.showTextTrs = false
                this.dialogCompont = false
                // return this.dataComponent
            },

            //重置
            reset() {
                this.formInline.code = ''
                this.formInline.guidelinesId = ''
                this.formInline.type = ''
                this.queryTableList()
            },
            //分页时展示页面数据的容量
            handlePageSizeChange(val) {
                this.pagination.pageSize = val;
                this.queryTableList();
            },
            //分页时切换页
            handleCurrentChange(val) {
                this.pagination.current = val;
                this.queryTableList();
            },
            //查看详情
            detile(scope) {
                this.getFunList(scope.row.guidelinesId,scope.row.rlType)
                this.dialogFormVisible = true
                this.dynamicValidateForm.guidelinesTargetId = scope.row.id
                this.titleName = scope.row.name
                target_score_targetId_query(scope.row.id)
                    .then(res => {
                        this.dynamicValidateForm.targetScoreList = res.data.data
                    })
            },
            //提交指标赋分选择项
            submitForm(info) {
                let params = info
                target_score_save(params)
                    .then(res => {
                        this.dialogFormVisible = false
                        this.$message({
                            message: '指标赋分内容填写成功！',
                            type: 'success'
                        })
                        this.queryTableList()
                    })
            }

        },
        computed: {
            //计算指标选项中的值变化
            getGuidelinesId: function () {
                return this.formInline.guidelinesId
            },
            //计算指标选项中的值变化
            getRelationFun: function () {
                return this.dynamicValidateForm.targetScoreList[0].relationFun
            },
        },
        watch: {
            //监听指标选项值变化，远程数据实时匹配查询
            getGuidelinesId: {
                handler: function () {
                    let params = {
                        all: true,
                        id: this.formInline.guidelinesId
                    }
                    target_byGuidelineId(params.id, params.all)
                        .then(res => {
                            res.data.data.forEach(item => {
                                if (item.layerDepth == 1) {
                                    // this.typeOptions.push(item)
                                }
                            });

                        })
                },
            },

        }
    }
</script>
<style>
    .bodyPage {
        display: flex;
        height: 80vh;
        overflow: auto;
    }

    .examplesSty {
        margin-bottom: 20px;
        font-size: 14px;
        font-weight: 100;
        color: #aaa;
    }
</style>