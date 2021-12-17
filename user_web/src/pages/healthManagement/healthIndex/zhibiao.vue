<!-- 指标体系管理--指标查询页面 -->

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
                    <el-button type="primary" @click="queryTableList" size="small">查询</el-button>
                    <el-button type="primary" @click="reset" size="small" plain>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div >
            <el-table :data="tableData" stripe style="width: 100%;font-size: 12px;text-align: center;">
                <el-table-column type='index' label="序号" width="50" align="center" header-align="center">
                </el-table-column>
                <el-table-column prop="industry" label="行业" width="100" align="center" header-align="center">
                    <template slot-scope="scope">
                        <div v-if='scope.row.guidelinesVo.industry == 1'>水利</div>
                        <div v-else-if='scope.row.guidelinesVo.industry == 2'>生态</div>
                        <div v-else>其他</div>
                    </template>
                </el-table-column>
                <el-table-column prop="areaCode" label="行政区别" width="120" align="center" header-align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.guidelinesVo.areaCode}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="guidelinesCode" label="标准编号" width="160" align="center" header-align="center">
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
                <!-- <el-table-column prop="lbcName" label="类别层名称" align="center" header-align="center">
                </el-table-column>
                <el-table-column prop="yscName" label="要素层名称" align="center" header-align="center">
                </el-table-column> -->
                <el-table-column prop="name" label="指标名称" width="150" align="center" header-align="center">
                </el-table-column>
                <el-table-column prop="weight" label="权重" width="80" align="center" header-align="center">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200" align="center" header-align="center">
                    <template slot-scope="scope">
                        <el-button @click='detileInfo(scope)' size="small" type="primary" plain>查看</el-button>
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
        
        <!-- 详情内容抽屉式打开查看 -->
        <el-drawer title="指标详情信息" :visible.sync="drawer" append-to-body>
            <el-form :model="targetDetile">
                <template slot-scope="scope" >
                    <div style="text-align: left;margin-left: 20px;">
                        <p>指标名称：{{targetDetile.guidelinesVo.name}}</p>
                        <p>指标编号：{{targetDetile.guidelinesVo.code}}</p>
                        <p>行政区划：{{targetDetile.guidelinesVo.areaCode}}</p>
                        <p>河湖对象:{{targetDetile.superParent[0].name}}</p>
                        <p>父层列表:</p>
                        <p>指标名称:{{targetDetile.name}}</p>
                        <p>权重:{{targetDetile.weight}}</p>
                        <p></p>
                    </div>
                </template>                
            </el-form>
        </el-drawer>


    </main>

</template>

<script>
    import { dict_search_domain } from '@/api/dict/index'
    import { target_tableList_search } from '@/api/guidelines/index'
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
                tableData: [
                ],
                industryOption: [],//行业字典选项值
                drawer: false, //指标详情信息抽屉控制器
                //分页
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                targetDetile: {},//详情信息表单对象
            }
        },
        created() {
            this.industryDictSearch() //行业字典信息查询
            this.queryTableList() //页面初始化查询
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
            //表格数据查询功能
            queryTableList() {
                let params = {
                    guidelinesVo: {
                        areaCode: this.formInline.areaCode,
                        industry: this.formInline.industry,
                        code: this.formInline.code,
                        name: this.formInline.name
                    },
                    pageSize: this.pagination.pageSize,
                    pageNum: this.pagination.current,
                    queryExt:{
                        queryType:"depth",
                    },
                }
                target_tableList_search(params)
                    .then(res => {
                        this.tableData = res.data.data.list
                        this.pagination.total = res.data.data.total
                    })
            },
            //重置查询条件
            reset() {
                this.formInline.areaCode = ''
                this.formInline.industry = ''
                this.formInline.caode = ''
                this.formInline.name = ''
                this.queryTableList()
            },
            //查看详情
            detileInfo(Info) {
                console.log('info', Info)
                this.targetDetile = Info.row
                this.drawer = true
                this.targetDetile.guidelinesName = Info.row.guidelinesVo.name

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

        }
    }
</script>
<style >
    .page {
        position:fixed ;
        height: 83vh;
        width: 87vw;
        overflow: auto;
    }
</style>