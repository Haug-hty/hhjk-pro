<!-- 手机端图片上传功能组件页面 -->
<template>
    <div>
        <div style="height: 60px; padding: 15px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
            <el-row style="text-align:left;margin-top: -6px;">
                <el-form :inline="true" :model="formInline">
                <!-- <el-form-item label="地市:">
                    <v-distpicker :province="select.province" :city="select.city" :area="select.area"
                        @selected="regionSelect"></v-distpicker>
                </el-form-item> -->

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
        <!-- 方案信息表格 -->
        <el-table :data="schemeTableList" stripe :cell-style="cellStyle"  style="width: 100%;font-size: 12px;text-align: center;" :header-cell-style="{background:'#eef1f6',color:'#606266',fontSize:'14px',borderBottom:'1px solid #000'}">
            <el-table-column type='index' label="序号" width="50" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="name" label="方案名称" align="center" header-align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="rlName" label="评估对象" width="100" align="center" header-align="center">
                <template slot-scope="scope">
                    <div>{{scope.row.rlInfoVo.name}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="河湖类型" width="120" align="center" header-align="center">
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
            <el-table-column prop="processState" label="方案进程" width="80" align="center" header-align="center">
                <template slot-scope="scope">
                    <div>{{scope.row.processStateName}}</div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100" align="center" header-align="center">
                <template slot-scope="scope">
                    <el-button :disabled='scope.row.processState == 1' @click="editInfo(scope.row)" size="small"
                        type="text">上传照片</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="picUp" width="30%" title="照片性质类别选择">
            <el-button type="primary" @click="goInPic1(dialogForm)">采样拍照</el-button>
            <el-button type="primary" @click="goInPic2(dialogForm)">指标数据照片</el-button>
            <el-button type="primary" @click="goInPic3(dialogForm)">其他</el-button>
        </el-dialog>
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
    import { lake_river_info_query } from "@/api/rlObject/index"
    import { guidelines_otions_select } from '@/api/guidelines/index'
    export default {
        name: 'picPhone',
        data() {
            return {
                formInline: {
                    rlInfoId:null,
                    year:null,
                    guidelinesId:null,
                },
                guidelinesOptions:[],
                rlInfoIdOption:[],
                schemeTableList: [],//方案信息表格数据
                processStateOption: [],
                //分页
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                dialogForm:{},
                picUp:false,
                loading:false
            
            }
        },
        created() {
            this.getRlInfoList()
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
                if (data.columnIndex == 6) {
                    if (data.row.processState == 1) {
                        return 'color:rgba(245, 47, 62, 1)'
                    } else if(data.row.processState == 2){
                        return 'color:rgba(255, 181,64,1)'
                    } else if(data.row.processState == 3){
                        return 'color:rgba(11, 219, 168, 1)'
                    }
                }
            },
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
                    pageNum: this.pagination.current
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
            queryList() {
                let params = {
                    pageNum:1,
                    pageSize:10,
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
            //上传照片
            editInfo(info){
                this.dialogForm=info
                this.picUp = true
                
            },
            //采样照片
            goInPic1(info){
                let schemeId = info.id
                let schemeName = info.name

                this.$router.push({
                    name: 'picPhonePage',
                    params: {
                        schemeId: schemeId,
                        schemeName: schemeName
                    }
                })
            },
            //指标数据照片
            goInPic2(info){
                let schemeId = info.id
                let schemeName = info.name
                let guidelinesId = info.guidelinesId
                let rlType = info.rlType

                this.$router.push({
                    name: 'picPhoneTarget',
                    params: {
                        schemeId: schemeId,
                        schemeName: schemeName,
                        guidelinesId:guidelinesId,
                        rlType:rlType
                    }
                })
            },
            goInPic3(info){//其他类型照片上传，部分指标直接上传照片，不参与计算
                let schemeId = info.id
                let schemeName = info.name

                this.$router.push({
                    name: 'picOther',
                    params: {
                        schemeId: schemeId,
                        schemeName: schemeName
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



        }
    }
</script>