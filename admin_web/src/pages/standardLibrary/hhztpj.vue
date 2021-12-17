<!-- 河湖总体评价页面 -->

<template>
    <main>
        <div
            style="height: 60px; padding: 15px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
            <el-form :inline="true" :model="formInline" style="height: 35px;text-align: left;margin-top: -10px;">

                <el-form-item label="行政区划:" style="height: 32px">
                    <el-select v-model="formInline.areaCode" placeholder="请选择行政区划" style="width: 150px;">
                        <el-option label="苏州市" value="苏州市"></el-option>
                        <el-option label="江苏省" value="江苏省"></el-option>
                        <el-option label="全国" value="全国"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-row>
                    
                </el-row> -->
                <!-- <el-form-item label="标准规范类别:">
                    <el-select v-model="formInline.standardClassification" placeholder="请选择标准规范">
                        <el-option label="评价规范" value="评价规范"></el-option>
                        <el-option label="其他标准" value="其他标准"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="行业:">
                    <el-select v-model="formInline.industry" placeholder="请选择行业" style="width: 150px;">
                        <el-option v-for="item in industryOption" :key="item.doKey" :label="item.doValue"
                            :value="item.doKey">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标准编号:">
                    <el-input v-model="formInline.code" placeholder="请输入标准编号"></el-input>
                </el-form-item>
                <el-form-item label="标准名称:">
                    <el-input v-model="formInline.name" placeholder="请输入规范名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchGudilelines" size="small">查询</el-button>
                    <el-button type="primary" @click="reset" size="small" plain>重置</el-button>
                    <!-- <el-button type="success" @click="addNew" size="small">新增</el-button> -->
                </el-form-item>
            </el-form>
        </div>
        <div class="page">
            <div class="left">
                <el-table :data="gudilelinesTableData" stripe style="width: 100%;font-size: 12px;text-align: center;">
                    <el-table-column type='index' label="序号" width="50" align="center" header-align="center">
                    </el-table-column>
                    <el-table-column prop="code" label="标准编号" width="160" align="center" header-align="center">
                    </el-table-column>
                    <el-table-column prop="name" label="规范名称" align="center" header-align="center">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="200" align="center" header-align="center">
                        <template slot-scope="scope">
                            <!-- <el-button @click="handleClick(scope.row)" size="small" type="primary" plain>下载</el-button> -->
                            <el-button @click="detile(scope)" size="small" type="primary" plain>查看</el-button>
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
            <div class="right" style="display: inline-block;">
                <h3>{{choseCode}}</h3>
                <!-- <el-table :data="overallTableData" stripe style="width: 100%;font-size: 12px;text-align: center;">
                    <el-table-column type='index' label="分级" width="50" align="center" header-align="center">
                    </el-table-column>
                    <el-table-column prop="healthDesc" label="健康状况" width="160" align="center" header-align="center">
                    </el-table-column>
                    <el-table-column prop="down" label="下限值" align="center" header-align="center">
                    </el-table-column>
                    <el-table-column prop="top" label="上限值" align="center" header-align="center">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="200" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" size="small" type="primary" plain>下载</el-button>
                            <el-button size="small" type="primary" plain>编辑</el-button>
                            <el-button @click="delInfo(scope)" size="small" type="danger">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table> -->
                <el-table :data="overallTableData" stripe style="width: 100%;font-size: 12px;text-align: center;">
                    <el-table-column align="center" type="index" label="分级" width="50">
                    </el-table-column>
                    <el-table-column prop="healthDesc" label="健康状况">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.healthDesc" :disabled="!scope.row.disabled"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="down" label="下限值">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.down" :disabled="!scope.row.disabled"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="top" label="上限值">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.top" :disabled="!scope.row.disabled"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" fixed="right" label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.edit" type="success" size="mini" @click="confirmEdit(scope.row)"
                                style="margin-left:0px;">保存
                            </el-button>
                            <el-button v-if="scope.row.edit" class="cancel-btn" size="mini" type="warning"
                                @click="cancelEdit(scope.$index, scope.row)" style="margin-left:0px;">取消
                            </el-button>
                            <el-button v-else type="primary" size="mini" @click="startEdit(scope.row)"
                                style="margin-left:0px;">
                                编辑
                            </el-button>
                            <el-button @click="handleDelete(scope)" type="danger" size="mini" style="margin-left:0px;">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="text-align: left;">
                    <el-button class="addBtn" type="primary " @click="addRow" size="small" style="margin-bottom:10px;">
                        新增综合评价标准
                    </el-button>
                </div>
            </div>

        </div>



    </main>

</template>

<script>
    import { dict_search_domain } from '@/api/dict/index'
    import { guidelines_table_search, overall_tableList_search, overall_addInfo, overall_delInfo } from "@/api/standard/index"
    export default {
        name: 'zbtx',
        data() {
            return {
                formInline: {
                    areaCode: '',//行政区划
                    industry: '',//行业
                    name: '',//名称
                    code: ''
                },
                gudilelinesTableData: [],
                overallTableData: [],
                industryOption: [],//行业字典选项值
                dialogFormVisible: false, //新增dialog弹窗控制器
                addNewForm: {
                    administrativeDivision: '',//行政区划
                    industry: '',//行业
                    standardClassification: '',//标准分类
                    name: '',//名称
                },
                formLabelWidth: '120px',
                choseCode: '',
                guidelinesId: null,
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
            }
        },
        created() {
            this.industryDictSearch() //行业字典信息查询
            this.searchGudilelines()
        },
        methods: {
            //行业字典信息查询
            industryDictSearch() {
                let domian = 'industry'
                dict_search_domain(domian)
                    .then(response => {
                        console.log("dict1", response)
                        this.industryOption = response.data.data
                        console.log('industryOption', this.industryOption)
                    }).catch(() => {
                        console.log(err)
                    })
            },
            //标准列表信息查询
            searchGudilelines() {
                let params = {
                    areaCode: this.formInline.areaCode,
                    industry: this.formInline.industry,
                    name: this.formInline.name,
                    code: this.formInline.code,
                    pageSize: this.pagination.pageSize,
                    pageNum: this.pagination.current

                }
                guidelines_table_search(params)
                    .then(response => {
                        this.gudilelinesTableData = response.data.data.list
                        this.pagination.total = response.data.data.total
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            //查看指标综合评价标准
            detile(scope) {
                this.choseCode = scope.row.name
                this.guidelinesId = scope.row.id
                let params = {
                    guidelinesId: scope.row.id
                }
                this.queryAll(params)
            },
            //综合评价标准查询
            queryAll(filter) {
                overall_tableList_search(filter)
                    .then(res => {
                        res.data.data.list.forEach(item => {
                            let key = 'disabled'
                            let value = false
                            item[key] = value
                        })
                        this.overallTableData = res.data.data.list
                    })

            },
            //重置查询
            reset() {
                this.formInline.areaCode = ''
                this.formInline.industry = ''
                this.formInline.code = ''
                this.formInline.name = ''
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
            // 表格编辑
            // 增加行
            addRow() {
                if (this.guidelinesId == null) {
                    return this.$message({
                        message: "请先选择一种指标体系!",
                        type: "warning"
                    });
                }
                let newLine = {
                    guidelinesId: this.guidelinesId,
                    edit: true, // 新增时处于可编辑状态，所以按钮是保存和取消
                    disabled: true // 打开编辑状态
                };
                this.overallTableData.push(newLine); // 移到第一行
                console.log(newLine.$index)
            },

            // 编辑
            startEdit(row) {
                row.edit = !row.edit;
                row.disabled = true;
            },

            // 编辑保存保存
            confirmEdit(row) {
                row.edit = false;
                row.disabled = false;
                console.log(row)
                overall_addInfo(row)
                    .then(() => {
                        this.$message({
                            message: "修改成功!",
                            type: "success"
                        });
                    }).catch((err) => {
                        console.log(err)
                    })
                //调取Api接口地址
                //成功后


            },

            // 取消编辑或新增
            cancelEdit(index, row) {
                row.edit = false;
                row.disabled = !row.disabled;
                if (row.id === undefined) {
                    // 重新加载该页面
                    return this.cancleAdd(index, this.overallTableData)
                }
                this.$message({
                    message: "已取消修改!",
                    type: "warning"
                });
                console.log(row)
            },
            //取消新增
            cancleAdd(index, row) {
                row.splice(index, 1);
                this.$message({
                    message: "已取消新增!",
                    type: "warning"
                });
            },
            //删除
            handleDelete(info) {
                overall_delInfo(info.row.id)
                    .then(() => {
                        this.$message({
                            message: "已删除!",
                            type: "success"
                        });
                        let params = {
                            guidelinesId: this.guidelinesId
                        }
                        this.queryAll(params)

                    }).catch((err) => {
                        console.log(err)
                    })

            },

        }
    }
</script>
<style scoped>
    .page {
        display: flex;
        height: 80vh;
        overflow: auto;
    }

    .left {

        width: 50%;

        min-height: 400px;

        border-right: 1px solid #eee;

    }

    .right {
        flex: 1;
        width: 50%;
    }
</style>