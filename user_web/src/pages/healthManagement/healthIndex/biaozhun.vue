<!-- 标准库管理页面 -->

<template>
    <main>
        <!-- 上方查询操作栏 -->
        <div
            style="height: 60px; padding: 10px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
            <el-form :inline="true" :model="formInline">

                <el-form-item label="行业:">
                    <el-select v-model="formInline.industry" placeholder="请选择" style="width: 100px;">
                        <el-option v-for="item in industryOption" :key="item.doKey" :label="item.doValue"
                            :value="item.doKey">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标准编号:">
                    <el-input v-model="formInline.code" placeholder="请输入标准编号" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="标准名称:">
                    <el-select v-model="formInline.name" filterable remote reserve-keyword placeholder="请输入关键词"
                        :remote-method="remoteMethod" :loading="loading" :style="{width: '100%'}">
                        <el-option v-for="item in guidelinesOptions" :key="item.value" :label="item.value"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="queryList" size="small">查询</el-button>
                    <el-button type="primary" @click="reset" size="small" plain>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 数据列表 -->
        <el-table :data="tableData" stripe style="width: 100%;font-size: 12px;text-align: center;" :header-cell-style="{lineHeight:'40px',background:'#eef1f6',color:'#606266',fontSize:'14px',borderBottom:'1px solid #000'}">
            <el-table-column type='index' label="序号" width="50" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="industry" label="行业" width="100" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="specType" label="标准规范" width="120" align="center" header-align="center">
                <template slot-scope="scope">
                    <div v-if="scope.row.specType == '1'">
                        评价标准
                    </div>
                    <div v-if="scope.row.state == '2'">
                        其他标准
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="code" label="标准编号" width="160" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="name" label="名称" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="publishDate" label="发布日期" width="200" align="center" header-align="center">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100" align="center" header-align="center">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" size="small" type="text" >下载</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页栏 -->
        <el-row type="flex" justify="end">
            <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentChange"
                :current-page="pagination.current" :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize"
                :total="pagination.total" layout="prev,pager,next,jumper,total,sizes"></el-pagination>
        </el-row>



    </main>

</template>

<script>
    import { mapState } from 'vuex'
    import { guidelines_table_search, guidelines_otions_select } from "@/api/guidelines/index"
    import { dict_search_domain } from '@/api/dict/index'
    import { getFileByCode} from "@/api/file/index";
    export default {

        name: 'biaozhunku',
        data() {
            return {
                formInline: {
                    areaCode: '',//行政区划
                    industry: null,//行业
                    specType: null,//标准分类
                    name: '',//名称
                    code: ''
                },
                tableData: [],
                industryOption: [],
                guidelinesOptions: [],
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                loading:false
            }
        },
        computed: {
            ...mapState({
                // SDKinformation: state => state.sddmstore.SDKinformation,
            })
        },
        created() {
            this.getList()
            this.industryDictSearch() //行业字典信息查询
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
            getList() {
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
                        console.log(response.data.data)
                        this.tableData = response.data.data.list
                        this.pagination.total = response.data.data.total
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            //重置查询条件
            reset() {
                this.formInline.areaCode = ''
                this.formInline.industry = ''
                this.formInline.code = ''
                this.formInline.name = ''
                this.getList()
            },
            //条件查询
            queryList() {
                this.getList()
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
                getFileByCode(info.attachCode).then(res=>{
                    console.log(res)
                    window.open(res.data.data);
                })
            },
        }
    }
</script>
<style scoped>
</style>