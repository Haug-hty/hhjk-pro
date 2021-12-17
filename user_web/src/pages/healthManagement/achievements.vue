<!-- 科研成果库页面 -->

<template>
    <main>
        <div
            style="height: 60px; padding: 10px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
            <el-form :inline="true" :model="formInline">
                <el-form-item label="行业:">
                    <el-select v-model="formInline.industry" placeholder="请选择行业">
                        <el-option v-for="item in industryOption" :key="item.doKey" :label="item.doValue"
                            :value="item.doKey">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称:">
                    <el-input v-model="formInline.fileName" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchTableList" size="small">查询</el-button>
                    <el-button type="primary" @click="reset" size="small" plain>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" stripe style="width: 100%;font-size: 12px;text-align: center;" :header-cell-style="{background:'#eef1f6',color:'#606266',fontSize:'14px',borderBottom:'1px solid #000'}">
            <el-table-column type='index' label="序号" width="80" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="type" label="类别" width="100" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="fileName" label="文件名" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="author" label="作者"  align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="srcFrom" label="来源" width="150" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="publishDate" label="发布日期" width="200" align="center" header-align="center">
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100" align="center" header-align="center">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" size="small" type="text" >下载</el-button>
                </template>
            </el-table-column>
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
    import { scientific_table_search } from '@/api/healthManagement/index'
    import { dict_search_domain } from '@/api/dict/index'
    import { getFileByCode} from "@/api/file/index";
    export default {
        name: 'keyan',
        data() {
            return {
                formInline: {
                    fileName: '',
                    industry: ''
                },
                tableData: [],
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                industryOption: []

            }
        },
        created() {
            this.searchTableList() //列表初始化查询
            this.industryDictSearch() //行业字典信息查询
        },
        methods: {
            //行业字典信息查询
            industryDictSearch() {
                let domian = 'industry'
                dict_search_domain(domian)
                    .then(response => {
                        this.industryOption = response.data.data
                    }).catch(() => {
                        console.log(err)
                    })
            },
            //列表信息查询
            searchTableList() {
                let params = {
                    fileName: this.formInline.fileName,
                    industry: this.formInline.industry,
                    pageSize: this.pagination.pageSize,
                    pageNum: this.pagination.current
                }
                scientific_table_search(params)
                    .then(response => {
                        // console.log(response.data.data)
                        this.tableData = response.data.data.list
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            //重置
            reset() {
                this.formInline.fileName = ''
                this.formInline.industry = ''
                this.searchTableList()

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
            /** 文件下载 */
            handleClick(info){
                getFileByCode(info.fileCode).then(res=>{
                    console.log(res)
                    window.open(res.data.data);
                })
            },
        }
    }
</script>
<style scoped>
</style>