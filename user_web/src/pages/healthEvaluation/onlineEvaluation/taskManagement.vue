<template>
    <main>
        <h2 >任务管理</h2>
        <div class="top-box">
            <el-row :gutter="12" style="padding-top: 20px;padding-left:2%;">
                <el-col :span='6'>
                    <el-card shadow="always" style="background-color: #5470c6;">
                        <p class="pro-font-cls" @click='newPlan'>
                            <i class="el-icon-s-order icon-cls" ></i>                            
                            方案管理
                        </p>
                    </el-card>
                </el-col>
                <el-col :span='6'>
                    <el-card shadow="always" style="background-color: #73c0de;">
                        <p class="pro-font-cls" @click="dataEntry">
                            <i class="el-icon-s-data icon-cls"></i>                            
                            数据录入
                        </p>
                    </el-card>
                </el-col>
                <el-col :span='6'>
                    <el-card shadow="always" style="background-color: #fac858;">
                        <p class="pro-font-cls" @click="report">
                            <i class="el-icon-s-operation icon-cls" ></i>
                            报告编制</p>
                    </el-card>
                </el-col>
                <el-col :span='6'>
                    <el-card shadow="always" style="background-color: #28a745;">
                        <p class="pro-font-cls">
                            <i class="el-icon-success icon-cls"></i>
                            已完成</p>
                    </el-card>
                </el-col>
            </el-row>


        </div>
        <!-- <hr> -->
            <el-table class="main-table" :data="tableData" stripe  :cell-style="cellStyle"  @row-click="toState" :header-cell-style="{background:'#eef1f6',color:'#606266',fontSize:'14px',borderBottom:'1px solid #000'}">
                <el-table-column type='index' label="序号" width="50" align="center" header-align="center">
                </el-table-column>
                <el-table-column prop="name" label="方案名称" align="center" header-align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="rlName" label="评估对象" width="150" align="center" header-align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.rlInfoVo">{{scope.row.rlInfoVo.name}}</div>
                        <div v-if="!scope.row.rlInfoVo">-</div>
                    </template>
                </el-table-column>
                <el-table-column prop="guidelinesName" label="标准名称" align="center" header-align="center"
                    :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div v-if="scope.row.guidelinesVo">{{scope.row.guidelinesVo.name}}</div>
                        <div v-if="!scope.row.guidelinesVo">-</div>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="150" align="center" header-align="center"
                    sortable>
                </el-table-column>
                <el-table-column prop="year" label="评估年份" width="100" align="center" header-align="center" sortable>
                </el-table-column>
                <el-table-column prop="progress" label="完成指标" width="100" align="center" header-align="center" sortable>
                    <template slot-scope="scope">
                        <div>{{scope.row.inputNum}}/{{scope.row.totalNum}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="processState" label="方案进程" width="120" align="center" header-align="center"
                    sortable fixed="right">
                    <template slot-scope="scope">
                        <div @click="toState(scope.row)">{{scope.row.processStateName}}</div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页栏 -->
            <el-row type="flex" justify="end">
                <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentChange" :current-page="pagination.current"
                    :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total" layout="prev,pager,next,jumper,total,sizes"></el-pagination>
            </el-row>
    </main>
</template>

<script>
    import * as echarts from 'echarts';
    import { scheme_tableList_query } from '@/api/scheme/index'
    import { dict_search_domain } from '@/api/dict/index'
    export default {
        name: 'taskManagement',
        data() {
            return {
                schemeTableList: [],
                processStateOption: [],
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                tableData: [],
                tableHeight: '',

            }
        },

        mounted() {
            this.processStateDictSearch()

            // this.tableHeight = window.innerHeight - 300;
        },
        methods: {        //     
            //方案进程信息查询
            processStateDictSearch() {
                let domian = 'processState'
                dict_search_domain(domian)
                    .then(response => {
                        this.processStateOption = response.data.data
                        this.schemeTabelList()
                    }).catch(() => {
                        console.log(err)
                    })
            },
            //列表查询
            schemeTabelList() {
                let params = {
                    pageSize: this.pagination.pageSize,
                    pageNum: this.pagination.current
                }
                scheme_tableList_query(params)
                    .then((res) => {

                        this.pagination.total = res.data.data.total
                        res.data.data.list.forEach(item => {
                            item.createTime = this.formatDate(item.createTime)
                            this.processStateOption.forEach(option => {
                                if (option.doKey == item.processState) {
                                    item.processStateName = option.doValue
                                }
                            })
                        })
                        this.tableData = res.data.data.list

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
            /** 时间戳格式化YY-MM-DD */
            formatDate(info) {
                let date = new Date(info);
                let YY = date.getFullYear() + '-';
                let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                // var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                // var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                // var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                return YY + MM + DD;
            },
            newPlan() {
                this.$router.replace('/planCreate')
            },
            dataEntry() {
                this.$router.replace('/dataEntry')
            },
            report() {
                this.$router.replace('/briefing')
            },
            /** 方案进程列项内容样式填充 */
            cellStyle(data) {
                if (data.columnIndex == 7) {
                    if (data.row.processState == 1) {
                        return 'color:rgba(245, 47, 62, 1)'
                    } else if(data.row.processState == 2){
                        return 'color:rgba(255, 181,64,1)'
                    } else if(data.row.processState == 3){
                        return 'color:rgba(11, 219, 168, 1)'
                    }
                }
            },
            /** 方案进程跳转 */
            toState(row, column, event){
                console.log(row, column, event);
                if(row.processState == 1){
                    this.$router.replace('/planCreate')
                } else if(row.processState == 2){
                    this.$router.push({
                        name: 'dataEntryIndex',
                        params: {
                            schemeId: row.id,
                            schemeName: row.name,
                            questionnaireToken: row.questionnaireToken
                        }
                    })
                } else if(row.processState == 3){
                    const { href } = this.$router.resolve({
                        name: 'briefingPreparation',
                        query: {
                            schemeId: row.id,
                            schemeName: row.name
                        }
                    });
                    window.open(href, '_blank');
                }
            },
        }
    }
</script>
<style lang="less" scoped>
    h2 {
        padding-left: 20px;
        padding-top:10px;
    }
    // 头部四项盒子
    .top-box {
         display: inline-block;
         width: 98%;
         .pro-font-cls {
             margin: 10px;
             font-size: 22px;
             color: #fff;
             .icon-cls {
                 color: #fff;
                 font-size: 20px;
             }
         }
    }
    .main-table {
        width: 100%;
        font-size: 12px;
        text-align: center;
    }

</style>