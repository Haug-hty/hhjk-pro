<!-- 简报管理页面 -->

<template>
    <div>
        <!-- 方案信息表格 -->
        <el-table :data="schemeTableList" stripe :cell-style="cellStyle"  style="width: 100%;font-size: 12px;text-align: center;" :header-cell-style="{background:'#eef1f6',color:'#606266',fontSize:'14px',borderBottom:'1px solid #000'}">
            <el-table-column type='index' label="序号" width="50" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="name" label="方案名称" align="center" header-align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="rlName" label="评估对象" width="200" align="center" header-align="center">
                <template slot-scope="scope">
                    <div>{{scope.row.rlInfoVo.name}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="河湖类型" width="80" align="center" header-align="center">
                <template slot-scope="scope">
                    <div v-if='scope.row.rlType == 1'>
                        河流
                    </div>
                    <div v-if='scope.row.rlType == 2'>
                        湖泊
                    </div>
                    <div v-if='scope.row.rlType == 3'>
                        水库
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="guidelinesName" label="标准名称" align="center" header-align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div>{{scope.row.guidelinesVo.name}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="year" label="评估年份" width="100" align="center" header-align="center">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100" align="center" header-align="center">
                <template slot-scope="scope">
                    <el-button  @click="editInfo(scope.row)" size="small"
                        type="text">简报编制</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
                <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentChange"
                    :current-page="pagination.current" :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize"
                    :total="pagination.total" layout="prev,pager,next,jumper,total,sizes"></el-pagination>
            </el-row>

    </div>
</template>
<script>
    import { dict_search_domain } from '@/api/dict/index'
    import { scheme_tableList_query } from '@/api/scheme/index'
    export default {
        name: 'picPhone',
        data() {
            return {
                schemeTableList: [],//方案信息表格数据
                processStateOption: [],
                //分页
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
            
            }
        },
        created() {
            this.processStateDictSearch()
            this.schemeTabelList()
        },
        methods: {
            /** 对象类型列项内容样式填充 */
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
                    processState: 3,
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
            //
            editInfo(info){
                let schemeId = info.id
                let schemeName = info.name

                const { href } = this.$router.resolve({
                    name: 'briefingPreparation',
                    query: {
                        schemeId: schemeId,
                        schemeName: schemeName
                    }
                });
                window.open(href, '_blank');
                
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
            

        }
    }
</script>