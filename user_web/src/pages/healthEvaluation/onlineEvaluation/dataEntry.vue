<!-- 数据填报入口页面 -->

<template>
    <main>
        <div style="height: 60px; padding: 15px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
            <el-row style="text-align:left;margin-top: -6px;">
                <el-form :inline="true" :model="formInline" style="height: 35px">
                    <el-form-item label="评估对象:">
                    <el-select v-model="formInline.rlInfoId" placeholder="请选择河湖对象" clearable style="width: 160px;">
                        <el-option v-for="item in rlInfoIdOption" :key="item.id" :label="item.name"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间:">
                    <el-date-picker type="year" v-model="formInline.year" format="yyyy" value-format="yyyy"
                        :style="{width: '120px'}" placeholder="请选择" clearable></el-date-picker>
                </el-form-item>
                <el-form-item label="标准名称:">
                    <el-select v-model="formInline.guidelinesId" filterable remote reserve-keyword clearable placeholder="请输入关键词"
                        :remote-method="remoteMethod" :loading="loading" :style="{width: '100%'}">
                        <el-option v-for="item in guidelinesOptions" :key="item.value" :label="item.value"
                            :value="item.data">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="queryList">查询</el-button>
                </el-form-item>
                </el-form>
            </el-row>

        </div>
        <div>
            <!-- 方案列表 -->
            <el-table :data="schemeTableList" stripe :cell-style="cellStyle"  style="width: 100%;font-size: 12px;text-align: center;" :header-cell-style="{background:'#eef1f6',color:'#606266',fontSize:'14px',borderBottom:'1px solid #000'}">
                <el-table-column type='index' label="序号" width="50" align="center" header-align="center">
                </el-table-column>
                <el-table-column prop="name" label="方案名称" align="center" header-align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="rlName" label="评估对象" width="150" align="center" header-align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.rlInfoVo.name}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="河湖类型" width="100" align="center" header-align="center" :formatter="rltypeFine">
                </el-table-column>
                <el-table-column prop="guidelinesName" label="标准名称" align="center" header-align="center" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div>{{scope.row.guidelinesVo.name}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="year" label="评估年份" width="100" align="center" header-align="center">
                </el-table-column>
                
                <el-table-column fixed="right" label="操作" width="120" align="center" header-align="center">
                    <template slot-scope="scope">
                        <el-button :disabled='scope.row.processState!=2' @click="dataEntry(scope)" size="small"
                            type="text">数据录入</el-button>
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

    </main>
</template>
<script>
    import { search_tree_type_guidelinesTarget } from "@/api/guidelines/index"
    import { lake_river_info_query } from "@/api/rlObject/index"
    import { guidelines_otions_select } from '@/api/guidelines/index'
    import { scheme_tableList_query } from '@/api/scheme/index'
    import { dict_search_domain } from '@/api/dict/index'
    export default {
        name: 'dataEntry',
        data() {
            return {
                formInline: {
                    rlInfoId:null,
                    year:null,
                    guidelinesId:null,
                },
                rlInfoIdOption:[],

                applyForm: {
                    region: {
                        province: "",
                        city: ""
                    }
                },
                targetTableList: [],
                loading: false,
                guidelinesOptions: [],
                schemeTableList: [],
                processStateOption: [],//进程字典
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                select: {province:null,city:null, area: null },

            }
        },
        components: {
        },
        created() {
            // this.getRlInfoList()
            this.processStateDictSearch()
            this.schemeTabelList()

        },
        methods: {
            /** 评估对象选项 */
            getRlInfoList(){
                let params = {
                    pageSize:100,
                    pageNum:1,
                }
                lake_river_info_query(params)
                        .then(res => {
                            this.rlInfoIdOption = res.data.data.list
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
            //方案进程信息查询
            processStateDictSearch() {
                let domian = 'processState'
                dict_search_domain(domian)
                    .then(response => {
                        this.processStateOption = response.data.data
                    }).catch(() => {
                        console.log(err)
                    })
            },
            //方案列表信息查询
            schemeTabelList() {
                let params = {
                    pageSize: this.pagination.pageSize,
                    pageNum: this.pagination.current,
                    processState: 2
                }
                scheme_tableList_query(params)
                    .then((res) => {
                        this.schemeTableList = res.data.data.list
                        this.pagination.total = res.data.data.total
                        this.schemeTableList.forEach(item => {
                            this.processStateOption.forEach(option => {
                                if (option.doKey == item.processState) {
                                    item.processStateName = option.doValue
                                }
                            })
                        })

                    })

            },
            /** 河湖类型表单内容格式化 */
            rltypeFine(row, column, cellValue, index){
                return row.rlType===1?'河流':row.rlType===2?'湖泊':'水库'
            },
            /** 方案进程列项内容样式填充 */
            cellStyle(data) {
                if (data.columnIndex == 3) {
                    if (data.row.rlType == 1) {
                        // return 'color:rgba(65, 97, 235, 1);background:rgba(65, 97, 235, 0.1);'
                        return 'color:rgba(65, 97, 235, 1)'
                    } else if(data.row.rlType == 2){
                        // return 'color:rgba(11, 219, 168, 1);background:rgba(11, 219, 168, 0.1);'
                        return 'color:rgba(11, 219, 168, 1)'
                    } else if(data.row.rlType == 3){
                        // return 'color:rgba(255, 181, 64, 1);background:rgba(255, 181, 64, 0.1);'
                        return 'color:rgba(255, 181, 64, 1);'
                    }
                }
            },
            //数据录入页面跳转，子父传值
            dataEntry(info) {
                let schemeId = info.row.id
                let schemeName = info.row.name
                let questionnaireToken = info.row.questionnaireToken

                this.$router.push({
                    name: 'dataEntryIndex',
                    params: {
                        schemeId: schemeId,
                        schemeName: schemeName,
                        questionnaireToken: questionnaireToken
                    }
                })
            },
            //分页时展示页面数据的容量
            handlePageSizeChange(val) {
                this.pagination.pageSize = val;
                this.schemeTabelList();
            },
            //分页时切换页
            handleCurrentChange(val) {
                this.pagination.current = val;
                this.schemeTabelList();
            },

            queryList() {
                let params = {
                    pageNum:1,
                    pageSize:10,
                    processState: 2,
                }
                Object.assign(params,this.formInline)
                scheme_tableList_query(params)
                    .then((res) => {
                        this.schemeTableList = res.data.data.list
                        this.pagination.total = res.data.data.total
                        this.schemeTableList.forEach(item => {
                            this.processStateOption.forEach(option => {
                                if (option.doKey == item.processState) {
                                    item.processStateName = option.doValue
                                }
                            })
                        })

                    })


            },

            //地区选择方法
            regionSelect(data) {
                console.log(data.area.code)
                console.log(data)
                this.applyForm.region.province = data.province.value
                this.applyForm.region.city = data.city.value
                console.log(this.applyForm.region)
            },



        },
        computed: {
            //计算指标选项中的值变化
            // getAreaCode: function () {
            //     return this.applyForm.region.city
            // },
        },
        watch: {
            //监听地区选项值变化，远程数据获取对象列表
            // getAreaCode: {
            //     handler: function () {
            //         let params = {
            //             areaCode: this.getAreaCode
            //         }
            //         lake_river_info_query(params)
            //             .then(res => {
            //                 this.schemeObjectOptions = res.data.data.list
            //             })
            //     },
            // },



        }

    }
</script>
<style scoped>
    .page {
        position: fixed;
        height: 85vh;
        width: 87vw;
        overflow: auto;
    }
</style>