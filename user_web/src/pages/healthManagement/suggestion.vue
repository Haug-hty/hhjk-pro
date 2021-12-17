<!-- 治理建议库页面 -->

<template>
    <main>
        <div
            style="height: 60px; padding: 10px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
            <el-form :inline="true" :model="formInline">
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
                    <el-button type="info" @click="reset" size="small" plain>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 列表展示 -->
        <el-table :data="tableData" stripe style="width: 100%;font-size: 12px;text-align: center;" :header-cell-style="{background:'#eef1f6',color:'#606266',fontSize:'14px',borderBottom:'1px solid #000'}">
            <el-table-column type='index' label="序号" width="50" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="guidelinesId" label="规范名称" width='200' align="center" header-align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.guidelinesVo.name}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="河湖对象" width='150' align="center" header-align="center" >
                <template slot-scope="scope">
                    <div>
                        {{scope.row.guidelinesTargetParentVo[0].name}}
                    </div>
                </template>

            </el-table-column>
            <el-table-column prop="guidelinesTargetId" label="指标名称" width="160" align="center" header-align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.guidelinesTargetVo.name}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="problem" label="问题" align="center" header-align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="suggest" label="治理建议" align="center" header-align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <!-- <el-table-column fixed="right" label="操作" width="200" align="center" header-align="center">
                <template slot-scope="scope">
                    <el-button @click="editSuggestion(scope)" size="small" type="primary" plain>编辑</el-button>
                    <el-button @click="delInfo(scope)" size="small" type="danger">删除</el-button>
                </template>
            </el-table-column> -->
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="end">
            <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentChange"
                :current-page="pagination.current" :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize"
                :total="pagination.total" layout="prev,pager,next,jumper,total,sizes"></el-pagination>
        </el-row>
        
    </main>

</template>

<script>
    import { suggestion_table_search } from '@/api/healthManagement/index'
    import { dict_search_domain } from '@/api/dict/index'
    import { guidelines_otions_select } from '@/api/guidelines/index'
    export default {
        name: 'suggestion',
        data() {
            return {
                formInline: {
                    name: ''
                },
                tableData: [],               
                loading: false,
                guidelinesOptions: [],//指标下拉选
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
                    guidelinesVo:{
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
                this.formInline.name = ''
                this.searchTableList()

            },
            //分页时展示页面数据的容量
            handlePageSizeChange(val) {
                this.pagination.pageSize = val;
                this.searchTableList();
            },
            //分页时切换页
            handleCurrentChange(val) {
                this.pagination.current = val;
                this.searchTableList();
            },
        },
        computed: {
            //计算指标选项中的值变化
            
        },
        watch: {
            //监听指标选项值变化，远程数据实时匹配查询
            
        }
    }
</script>
<style scoped>
</style>