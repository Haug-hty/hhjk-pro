<template>
    <main>
        <div style="height: 60px; padding: 15px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
            <el-form :inline="true" :model="formInline" style="height: 35px;text-align: left;margin-top: -8px;">
                <el-form-item label="规范名称:">
                    <el-select v-model="formInline.guidelinesId" filterable remote reserve-keyword placeholder="请输入关键词"
                        :remote-method="remoteMethod" :loading="loading" :style="{width: '100%'}">
                        <el-option v-for="item in guidelinesOptions" :key="item.value" :label="item.value" :value="item.data">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="河湖类型:">
                    <el-select v-model="formInline.type" placeholder="请选择" :style="{width: '100%'}">
                        <el-option v-for="item in typeOptions" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="queryTableList" size="small">查询</el-button>
                    <el-button type="primary" @click="reset" size="small" plain>重置</el-button>

                </el-form-item>
            </el-form>
        </div>
        <div class="page">
            <div class="left">
                <el-table :data="targetScoreList" stripe style="width: 100%;font-size: 12px;text-align: center;">
                    <el-table-column type='index' label="序号" width="50" align="center" header-align="center">
                    </el-table-column>
                    <el-table-column prop="guidelinesCode" label="标准编号" width="150" align="center" header-align="center">
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
                            <div v-if="scope.row.guidelinesTargetVo.rlType==1">河流</div>
                            <div v-if="scope.row.guidelinesTargetVo.rlType==2">湖泊</div>
                            <div v-if="scope.row.guidelinesTargetVo.rlType==3">水库</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="指标名称" align="center" header-align="center">
                        <template slot-scope="scope">
                            <div>{{scope.row.guidelinesTargetVo.name}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="120" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-button @click="detile(scope)" size="small" type="info" plain>属性项填写</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页栏 -->
                <el-row type="flex" justify="end">
                    <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentChange"
                        :current-page="pagination.current" :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize"
                        :total="pagination.total" layout="prev,pager,next,jumper,total,sizes"></el-pagination>
                </el-row>
            </div>
            <!-- 指标赋分详情 -->
            <el-dialog append-to-body :visible.sync="dialogFormVisible" width="70%" :title="dialogTitle">
                <el-form :model="dynamicValidateForm" ref="dynamicValidateForm">
                    <el-form-item v-for="(domain, index) in dynamicValidateForm.targetScoreList" :key="domain.key">
                        <el-row style="margin-left:10px;">
                            <el-col :span="7">
                                评价因素：
                                <el-input v-model="domain.factor" style="width:50%;"
                                    placeholder="例：岸坡水土流失"></el-input>
                            </el-col>
                            <el-col :span="5">
                                <span>程度：</span>
                                <el-input v-model="domain.extent" style="width:50%;"
                                    placeholder="例：轻度">
                                </el-input>
                            </el-col>
                            <el-col :span="8">
                                <span>函数属性值：</span>
                                <el-select v-model="domain.bindFunAttr" placeholder="请选择函数属性值" 
                                    clearable>
                                    <el-option v-for="item in funOptions" :key="item.attrName" :label="item.desc" :value="item.attrName">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="2">
                                <el-button v-if='index!=0' @click.prevent="removeDomain(domain)" type="danger">删除</el-button>
                            </el-col>
                        </el-row>
                        
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addDomain" type='success'>新增指标赋分项</el-button>
                    <el-button type="primary" @click="submitForm(dynamicValidateForm)">提交</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <!-- <el-button type="primary" @click="submitNew(addNewForm),dialogFormVisible = false">确 定</el-button> -->
                </div>
            </el-dialog>

        </div>
    </main>

</template>

<script>
    import {
        guidelines_otions_select, target_byGuidelineId, target_score_tableList_search,
        target_score_save, target_score_sence_targetId_query, target_score_sence_add
    } from '@/api/standard/index'

    export default {
        name: 'zbtx',
        data() {
            return {
                formInline: {
                    type: '',
                    industry: '',//行业
                    guidelinesId: '',
                    code: ''
                },
                targetScoreList: [],
                guidelinesOptions: [],
                typeOptions: [],
                loading: false,
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                dialogFormVisible: false,
                dynamicValidateForm: {
                    guidelinesTargetScoreId: '',
                    rlType:'',
                    targetScoreList: [{
                        factor: '',
                        extent: '',
                        bindFunAttr: '',
                    }],
                },
                dataTypeOptions: [],
                dialogTitle: '',
                funOptions: [],
            }
        },
        components: {

        },
        created() {
            this.queryTableList()

        },
        methods: {
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


            queryTableList() {
                let params = {
                    dataType: 1,
                    pageSize: this.pagination.pageSize,
                    pageNum: this.pagination.current
                }
                target_score_tableList_search(params)
                    .then(res => {
                        this.targetScoreList = res.data.data.list
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
                    factor: '',
                    extent: '',
                    bindFunAttr: '',
                    key: Date.now()
                });
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

            //赋分
            detile(scope) {
                this.dialogFormVisible = true
                this.dynamicValidateForm.targetScoreList = []
                this.dynamicValidateForm.guidelinesTargetScoreId = scope.row.id
                this.dynamicValidateForm.rlType = scope.row.guidelinesTargetVo.rlType
                this.dialogTitle = scope.row.guidelinesTargetVo.name
                this.funOptions = scope.row.funParamListVo
                let params = {
                    guidelinesTargetScoreId: scope.row.id
                }
                target_score_sence_targetId_query(params)
                    .then(res => {
                        this.dynamicValidateForm.targetScoreList = res.data.data
                    })
                this.guidelinesId = scope.row.id
            },
            //提交指标赋分选择项
            submitForm(info) {
                let params = info
                console.log(params)
                target_score_sence_add(params)
                    .then(res => {
                        this.dialogFormVisible = false
                        this.queryTableList()
                    })

            }

        },
        computed: {
            //计算指标选项中的值变化
            getGuidelinesId: function () {
                return this.formInline.guidelinesId
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
                                    this.typeOptions.push(item)
                                }
                            });

                        })
                },
            },

        }
    }
</script>
<style scoped>
    .page {
        /* display: flex;
        height: 80vh;
        overflow: auto; */
    }

    .left {

        width: 99.9%;

        min-height: 400px;

        border-right: 1px solid #eee;

    }

    .examplesSty {
        margin-bottom: 20px;
        font-size: 14px;
        font-weight: 100;
        color: #aaa;
    }
</style>