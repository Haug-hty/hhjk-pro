<!-- 治理建议库页面 -->

<template>
    <main>
        <div
            style="height: 60px; padding: 15px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
            <el-form :inline="true" :model="formInline" style="height: 35px;text-align: left;margin-top: -10px;">
                <el-form-item label="标准名称:">
                    <el-select v-model="formInline.name" filterable remote reserve-keyword placeholder="请输入关键词"
                        :remote-method="remoteMethod" :loading="loading" :style="{width: '100%'}">
                        <el-option v-for="item in guidelinesOptions" :key="item.value" :label="item.value"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchTableList" size="small">查询</el-button>
                    <el-button type="primary" @click="reset" size="small" plain>重置</el-button>
                    <el-button type="success" @click="addNew" size="small">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 列表展示 -->
        <el-table :data="tableData" stripe style="width: 100%;font-size: 12px;text-align: center;">
            <el-table-column type='index' label="序号" width="50" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="guidelinesId" label="规范名称" width='200' align="center" header-align="center">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.guidelinesVo.name}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="河湖对象" align="center" header-align="center">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.guidelinesTargetParentVo[0].name}}
                    </div>
                </template>

            </el-table-column>
            <el-table-column prop="guidelinesTargetId" label="指标名称" width="200" align="center" header-align="center">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.guidelinesTargetVo.name}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="problem" label="问题" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="suggest" label="治理建议" align="center" header-align="center">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center" header-align="center">
                <template slot-scope="scope">
                    <el-button @click="editSuggestion(scope)" size="small" type="primary" plain>编辑</el-button>
                    <el-button @click="delInfo(scope)" size="small" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="end">
            <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentChange"
                :current-page="pagination.current" :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize"
                :total="pagination.total" layout="prev,pager,next,jumper,total,sizes"></el-pagination>
        </el-row>
        <!-- 新增治理建议 -->
        <el-dialog append-to-body :visible.sync="dialogFormVisible">
            <el-row :gutter="15">
                <el-form :model="newSuggestForm">
                    <el-col :span='12'>
                        <el-form-item label="规范名称:" :label-width="formLabelWidth">
                            <el-select v-model="newSuggestForm.guidelinesId" filterable remote reserve-keyword
                                placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading"
                                :style="{width: '100%'}">
                                <el-option v-for="item in guidelinesOptions" :key="item.value" :label="item.value"
                                    :value="item.data">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span='12'>
                        <el-form-item label="河湖类型:" :label-width="formLabelWidth">
                            <el-select v-model="newSuggestForm.type" placeholder="请选择" :style="{width: '100%'}">
                                <el-option v-for="item in typeOptions" :key="item.id" :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span='12'>
                        <el-form-item label="指标层名称:" :label-width="formLabelWidth">
                            <el-select v-model="newSuggestForm.guidelinesTargetId" placeholder="请选择"
                                :style="{width: '100%'}">
                                <el-option v-for="item in guidelinesTargetOptions" :key="item.id" :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label="可选择指标:" :label-width="formLabelWidth" prop="guidelinesTargetScoreId">
                            <el-select v-model="newSuggestForm.guidelinesTargetScoreId" placeholder="请选择"
                                :style="{width: '100%'}">
                                <el-option v-for="item in scoreOption" :key="item.id" :label="item.optionalIndicators"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label="问题:" :label-width="formLabelWidth">
                            <el-input v-model="newSuggestForm.problem" placeholder="" :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label="治理建议:" :label-width="formLabelWidth">
                            <el-input v-model="newSuggestForm.suggest" placeholder="" type="textarea"
                                :style="{width:'100%'}" :autosize="{minRows: 2, maxRows: 2}">
                            </el-input>
                        </el-form-item>
                    </el-col>

                </el-form>

            </el-row>


            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitAddInfo(newSuggestForm)">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑治理建议信息 -->
        <el-dialog append-to-body :visible.sync="dialogEditFlag">
            <el-row :gutter="15">
                <el-form :model="editInfoForm">
                    <el-col :span='12'>
                        <el-form-item label="规范名称:" :label-width="formLabelWidth">
                            <el-input v-model="editInfoForm.guidelinesVoName" disabled :style="{width:'100%'}">
                            </el-input>

                        </el-form-item>
                    </el-col>

                    <el-col :span='12'>
                        <el-form-item label="目标层名称:" :label-width="formLabelWidth">
                            <el-input v-model="editInfoForm.guidelinesTargetParentVoName" disabled
                                :style="{width:'100%'}"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span='12'>
                        <el-form-item label="指标层名称:" :label-width="formLabelWidth">
                            <el-input v-model="editInfoForm.guidelinesTargetVoName" disabled :style="{width:'100%'}">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label="问题:" :label-width="formLabelWidth">
                            <el-input v-model="editInfoForm.problem" placeholder="" :style="{width:'100%'}"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label="治理建议:" :label-width="formLabelWidth">
                            <el-input v-model="editInfoForm.suggest" placeholder="" type="textarea"
                                :style="{width:'100%'}" :autosize="{minRows: 2, maxRows: 2}"></el-input>
                        </el-form-item>
                    </el-col>

                </el-form>
            </el-row>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditFlag = false">取 消</el-button>
                <el-button type="primary" @click="editInfo(editInfoForm)">确 定</el-button>
            </div>
        </el-dialog>

    </main>

</template>

<script>
    import { suggestion_table_search, suggestion_newInfo_submit, suggestion_editInfo, suggestion_delInfo } from '@/api/healthManage/index'
    import { dict_search_domain } from '@/api/dict/index'
    import { guidelines_otions_select, target_byGuidelineId, target_score_targetId_query } from '@/api/standard/index'
    export default {
        name: 'suggestion',
        data() {
            return {
                formInline: {
                    name: ''
                },
                tableData: [],
                dialogFormVisible: false, //新增dialog弹窗控制器
                newSuggestForm: {
                    guidelinesId: '',//标准id
                    guidelinesTargetId: '',//指标id
                    type: '',//河湖类型
                    suggest: '',//建议
                    problem: '',//问题
                    guidelinesTargetScoreId:'',

                },
                loading: false,
                guidelinesOptions: [],//指标下拉选
                typeOptions: [],//河湖类别下拉选
                guidelinesTarget: [],//指标下的所有层级
                guidelinesTargetOptions: [],//指标层下拉选
                scoreOption: [],//指标是否有多重方法选项值
                showScore: false,//控制是否需要展示
                editInfoForm: {
                    guidelinesId: '',//标准id
                    guidelinesTargetId: '',//指标id
                    type: '',//河湖类型
                    suggest: '',//建议
                    problem: ''//问题

                },
                formLabelWidth: '120px',
                dialogEditFlag: false, //编辑弹窗控制
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
            }
        },
        created() {
            this.searchTableList() //页面初始化加载
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
            //列表信息查询
            searchTableList() {
                let params = {
                    guidelinesVo: {
                        name: this.formInline.name,
                    },
                    pageSize: this.pagination.pageSize,
                    pageNum: this.pagination.current
                }
                suggestion_table_search(params)
                    .then(response => {
                        this.tableData = response.data.data.list
                        this.pagination.total = response.data.data.total
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            //查询重置按钮
            reset() {
                this.formInline.guidelinesId = ''
                this.searchTableList()

            },
            //下拉选择内容清空
            cleanOptions() {
                this.guidelinesOptions = []
                this.typeOptions = []
                this.guidelinesTarget = []
                this.guidelinesTargetOptions = []
            },
            //新增治理建议
            addNew() {
                this.dialogFormVisible = true
                //新增form表单内容重置
                this.newSuggestForm.guidelinesId = ''
                this.newSuggestForm.guidelinesTargetId = ''
                this.newSuggestForm.type = ''
                this.newSuggestForm.suggest = ''
                this.newSuggestForm.problem = ''
                this.newSuggestForm.guidelinesTargetScoreId = ''
                this.typeOptions = []
                this.guidelinesOptions = []

            },
            //新增治理建议提交
            submitAddInfo(info) {
                suggestion_newInfo_submit(info)
                    .then(() => {
                        this.$message({
                            type: 'success',
                            message: '新增治理建议成功'
                        })
                        this.dialogFormVisible = false
                        this.cleanOptions()
                        this.searchTableList()
                    }).catch(() => {
                        this.$message({
                            type: 'error',
                            message: '新增治理建议失败'
                        })
                    })

            },
            //编辑功能
            editSuggestion(scope) {
                this.dialogEditFlag = true
                this.editInfoForm = JSON.parse(JSON.stringify(scope.row))
                this.editInfoForm.guidelinesVoName = JSON.parse(JSON.stringify(scope.row.guidelinesVo.name))
                this.editInfoForm.guidelinesTargetParentVoName = JSON.parse(JSON.stringify(scope.row.guidelinesTargetParentVo[0].name))
                this.editInfoForm.guidelinesTargetVoName = JSON.parse(JSON.stringify(scope.row.guidelinesTargetVo.name))
            },
            //编辑治理建议
            editInfo(Info) {
                suggestion_editInfo(Info)
                    .then((response) => {
                        this.$message({
                            type: 'success',
                            message: '编辑成功'
                        })
                        this.dialogEditFlag = false
                        this.searchTableList()
                    }).catch(() => {
                        this.$message({
                            type: 'warning',
                            message: '编辑失败'
                        })
                    })

            },
            //删除治理建议
            delInfo(scope) {

                this.$confirm('确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    suggestion_delInfo(scope.row.id)
                        .then(() => {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.searchTableList()
                        }).catch(() => {
                            this.$message({
                                type: 'warning',
                                message: '删除失败'
                            });
                        })


                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '已取消删除'
                    });
                });
            },
            //分页时展示页面数据的容量
            handlePageSizeChange(val) {
                this.pagination.pageSize = val;
                this.getList();
            },
            //分页时切换页
            handleCurrentChange(val) {
                this.pagination.current = val;
                this.getList();
            },
        },
        computed: {
            //计算指标选项中的值变化
            getGuidelinesId: function () {
                return this.newSuggestForm.guidelinesId
            },
            //计算河湖对象选项值变化
            getType: function () {
                return this.newSuggestForm.type
            },
            //计算河湖对象选项值变化
            getGuidelinesTargetId: function () {
                return this.newSuggestForm.guidelinesTargetId
            },
        },
        watch: {
            //监听指标选项值变化，远程数据实时匹配查询
            getGuidelinesId: {
                handler: function () {
                    let params = {
                        all: true,
                        id: this.newSuggestForm.guidelinesId
                    }
                    target_byGuidelineId(params.id, params.all)
                        .then(res => {
                            res.data.data.forEach(item => {
                                if (item.layerDepth == 1) {
                                    this.typeOptions.push(item)
                                }
                            });
                            console.log(this.typeOptions)
                            this.guidelinesTarget = res.data.data

                        })
                },
            },
            //监听河湖对象选项值变化，匹配对应指标层数据
            getType: {
                handler: function () {
                    this.guidelinesTargetOptions = []
                    var layerDepthFind = new Array();
                    for (var i = 0; i < this.guidelinesTarget.length; i++) {
                        layerDepthFind.push(this.guidelinesTarget[i].layerDepth);
                    };

                    var maxlayerDepth = Math.max(...layerDepthFind);  //最大值
                    this.guidelinesTarget.forEach(item => {
                        if (item.layerDepth == maxlayerDepth) {
                            if (item.superParentId.indexOf(this.getType) == 0) {
                                this.guidelinesTargetOptions.push(item)
                            }

                        }
                    })
                },
            },
            //监听指标项变化，匹配对应指标多重方法选项
            getGuidelinesTargetId: {
                handler: function () {
                    target_score_targetId_query(this.getGuidelinesTargetId)
                        .then(res => {
                            console.log(res)
                            this.scoreOption = res.data.data
                            if (this.scoreOption.length <= 1) {
                                this.scoreOption[0].optionalIndicators = "默认单一指标方法"
                                this.newSuggestForm.guidelinesTargetScoreId = this.scoreOption[0].id
                            } else {
                                this.newSuggestForm.guidelinesTargetScoreId = ''
                                // this.showScore = true
                            }
                        })
                },
            },

        }
    }
</script>
<style scoped>
</style>