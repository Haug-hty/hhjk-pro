<!-- 采样点管理 -->
<template>
    <main>
        <div style="height: 60px; padding: 15px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
            <el-row style="text-align:left;margin-top: -6px;">
                <el-form :inline="true" :model="formInline" style="height: 35px">
                    <el-form-item label="河段名称:">
                        <el-input v-model="formInline.reachName" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getReachTableList()" size="small">查询</el-button>
                        <el-button type="primary" @click="reset" size="small" plain>重置</el-button>
                        <el-button type="success" @click="addNew" size="small">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </div>
        <el-table :data="reachTableData" stripe style="width: 100%;font-size: 12px;text-align: center;">
            <!-- :height="tableMaxHeight"> -->
            <el-table-column type="index" label="序号" width="50" align="center" header-align="center"></el-table-column>
            <el-table-column prop="name" label="河段名称" align="center" header-align="center"></el-table-column>
            <el-table-column prop="length" label="河段（湖岸带）长度m" align="center" header-align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center" header-align="center">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" size="small" type="primary" plain>编辑</el-button>
                    <el-button @click="delInfo(scope)" size="small" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页栏 -->
        <el-row type="flex" justify="end">
            <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentChange" :current-page="pagination.current"
                :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total" layout="prev,pager,next,jumper,total,sizes"></el-pagination>
        </el-row>
        <!-- 新增河段（湖区）信息 -->
        <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="reachFlag" width="80%" title="新增河段（湖区）信息">
            <el-row :gutter="15">
                <el-form ref="reachForm" :inline="true" :model="reachForm" class="demo-form-inline">
                    <el-col :span="8">
                        <el-form-item label="对象类型" prop="startSiteId" label-width="150px">
                            <el-select v-model="reachForm.type" placeholder clearable @change="findRlInfo" style="width: 100%;">
                                <el-option v-for="item in typeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="名称：" prop="name" label-width="150px">
                            <el-input v-model="reachForm.name" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="150px" label="河湖对象名称：" prop="rlInfoId">
                            <el-select v-model="reachForm.rlInfoId" placeholder="请选择" style="width: 100%;" @change="findSite">
                                <el-option v-for="item in rlInfoOption" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="河段(湖岸带)长度m：" prop="length" label-width="150px">
                            <el-input v-model="reachForm.length" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="代表性站点：" prop="markerSiteId" label-width="150px">
                            <el-select v-model="reachForm.markerSiteId" placeholder clearable style="width: 100%;">
                                <el-option v-for="item in siteListOption" :key="item.id" :label="item.siteName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="reachForm.type == 2">
                        <el-form-item label="湖区面积㎡：" prop="area" label-width="150px">
                            <el-input v-model="reachForm.area"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="岸坡1名称：" prop="bankSlopeName1" label-width="150px">
                            <el-input v-model="reachForm.bankSlopeName1" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="岸坡1长度(m)：" prop="bankSlopeLength1" label-width="150px">
                            <el-input v-model="reachForm.bankSlopeLength1" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="岸坡1面积(m2)" prop="bankSlopeArea1" label-width="150px">
                            <el-input v-model="reachForm.bankSlopeArea1" style="width: 100%;" ></el-input>
                        </el-form-item>
                    </el-col>
                    <div v-if="reachForm.type == 1">
                        <el-col :span="8">
                            <el-form-item label="岸坡2名称：" prop="bankSlopeName2" label-width="150px">
                                <el-input v-model="reachForm.bankSlopeName2" style="width: 100%;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="岸坡2长度(km)：" prop="bankSlopeLength2" label-width="150px">
                                <el-input v-model="reachForm.bankSlopeLength2" style="width: 100%;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="岸坡2面积(km2)" prop="bankSlopeArea2" label-width="150px">
                                <el-input v-model="reachForm.bankSlopeArea2" style="width: 100%;"></el-input>
                            </el-form-item>
                        </el-col>
                    </div>

                    <el-col :span="8">
                        <el-form-item label="河段管理人员：" prop="management" label-width="150px">
                            <el-input v-model="reachForm.management" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系方式：" prop="managementTel" label-width="150px">
                            <el-input v-model="reachForm.managementTel" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="描述" prop="reachDesc" label-width="150px">
                            <el-input v-model="reachForm.reachDesc" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <div slot="footer">
                <el-button @click="reachFlag = false">取消</el-button>
                <el-button type="primary" @click="reachInfoSubmit(reachForm)">确定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑河段（湖区）信息 -->
        <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="dialogEditForm" width="80%" title="河段（湖区）信息编辑">
            <el-row :gutter="15">
                <el-form ref="reachEditForm" :inline="true" :model="reachEditForm" class="demo-form-inline">
                    <el-col :span="8">
                        <el-form-item label="河段(湖区)名称：" prop="name" label-width="150px">
                            <el-input v-model="reachEditForm.name" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="河段(湖岸带)长度m：" prop="length" label-width="150px">
                            <el-input v-model="reachEditForm.length" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="reachEditForm.area">
                        <el-form-item label="湖区面积㎡：" prop="area" label-width="150px">
                            <el-input v-model="reachEditForm.area"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="代表性站点：" prop="markerSiteId" label-width="150px">
                            <el-select v-model="reachEditForm.markerSiteId" placeholder clearable style="width: 100%;">
                                <el-option v-for="item in siteListOption" :key="item.id" :label="item.siteName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="8">
                        <el-form-item label="终止站点：" prop="endSiteId" label-width="150px">
                            <el-select v-model="reachEditForm.endSiteId" placeholder clearable style="width: 100%;">
                                <el-option v-for="item in siteListOption" :key="item.id" :label="item.siteName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="8">
                        <el-form-item label="河段顺序号：" prop="orderNo" label-width="150px">
                            <el-input v-model="reachEditForm.orderNo" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="管理单位：" prop="managementUnit" label-width="150px">
                            <el-input v-model="reachEditForm.managementUnit" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="岸坡1名称：" prop="bankSlopeName1" label-width="150px">
                            <el-input v-model="reachEditForm.bankSlopeName1" style="width: 100%;"> </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="岸坡1长度(km)：" prop="bankSlopeLength1" label-width="150px">
                            <el-input v-model="reachEditForm.bankSlopeLength1" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="岸坡1面积(km2)" prop="bankSlopeArea1" label-width="150px">
                            <el-input v-model="reachEditForm.bankSlopeArea1" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <div v-if="reachEditForm.bankSlopeName2">
                        <el-col :span="8">
                            <el-form-item label="岸坡2名称：" prop="bankSlopeName2" label-width="150px">
                                <el-input v-model="reachEditForm.bankSlopeName2" style="width: 100%;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="岸坡2长度(km)：" prop="bankSlopeLength2" label-width="150px">
                                <el-input v-model="reachEditForm.bankSlopeLength2" style="width: 100%;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="岸坡2面积(km2)" prop="bankSlopeArea2" label-width="150px">
                                <el-input v-model="reachEditForm.bankSlopeArea2" style="width: 100%;"></el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                    
                    <el-col :span="8">
                        <el-form-item label="河段管理人员：" prop="management" label-width="150px">
                            <el-input v-model="reachEditForm.management" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系方式：" prop="managementTel" label-width="150px">
                            <el-input v-model="reachEditForm.managementTel" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="描述" prop="reachDesc" label-width="150px">
                            <el-input v-model="reachEditForm.reachDesc" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <div slot="footer">
                <el-button @click="dialogEditForm= false">取消</el-button>
                <el-button type="primary" @click="editInfo(reachEditForm)">确定</el-button>
            </div>
        </el-dialog>
    </main>
</template>
<script>
    import {
        reach_info_query,
        lake_river_info_query,
        reach_info_add,
        reach_delInfo,
        site_info_query
    } from "@/api/rlObject/index";
    import { dict_search_domain } from "@/api/dict/index";
    export default {
        name: "samplingPointManagement",
        data() {
            return {
                formInline: {
                    reachName: ""
                },
                reachTableData: [],
                reachFlag: false,
                typeOption: [
                    {
                        label: "河段",
                        value: 1
                    },
                    {
                        label: "湖区",
                        value: 2
                    }
                ],
                reachForm: {},
                dialogEditForm: false,
                reachEditForm: {},
                rlInfoOption: [],
                reachTypeOption: [],
                siteListOption: [],
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                }
            };
        },
        created() {
            this.getReachTableList();
        },
        methods: {
            //河湖对象选择项查询
            getRlInfo(info) {                
                let params = {
                    pageSize: 100,
                    pageNum: 1,
                    type: info
                };
                lake_river_info_query(params).then(res => {
                    this.rlInfoOption = res.data.data.list;
                });
            },
            //列表信息查询
            getReachTableList() {
                let params = {
                    reachName: this.formInline.reachName,
                    pageSize: this.pagination.pageSize,
                    pageNum: this.pagination.current
                };
                reach_info_query(params).then(res => {
                    this.reachTableData = res.data.data.list;
                    this.pagination.total = res.data.data.total;
                });
            },
            // 根据选择的湖区/河段进行对象信息的获取
            findRlInfo(){
                this.reachForm.rlInfoId = "";
                this.getRlInfo(this.reachForm.type)
            },
            findSite(){
                this.getSiteInfo(this.reachForm.rlInfoId)
            },
            //重置
            reset() {
                this.formInline.reachName = "";
                this.getReachTableList();
            },
            //获取对象监测点信息
            getSiteInfo(info) {
                let params = {
                    rlInfoId: info,
                    pageSize: 100,
                    pageNum: 1
                };
                site_info_query(params).then(res => {
                    this.siteListOption = res.data.data.list;
                });
            },
            //新增河段信息
            addNew() {
                this.reachFlag = true;
            },
            reachInfoSubmit(info) {
                reach_info_add(info)
                    .then(() => {
                        this.$message({
                            type: "success",
                            message: "新增河段(湖区)信息成功！"
                        });
                        this.reachFlag = false;
                        this.reachForm = {};
                        this.getReachTableList();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //编辑信息
            edit(info) {
                this.reachEditForm = JSON.parse(JSON.stringify(info))
                this.getSiteInfo(info.rlInfoId)

                this.dialogEditForm = true;
                
            },
            editInfo(info) {
                reach_info_add(info)
                    .then(() => {
                        this.$message({
                            type: "success",
                            message: "编辑河段信息成功！"
                        });
                        this.dialogEditForm = false;
                        this.getReachTableList();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //删除河段信息
            delInfo(scope) {
                this.$confirm("确定要删除吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        reach_delInfo(scope.row.id).then(() => {
                            this.$message({
                                message: "删除成功",
                                type: "success"
                            });
                            this.getReachTableList();
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "warning",
                            message: "已取消删除"
                        });
                    });
            },
            //分页时展示页面数据的容量
            handlePageSizeChange(val) {
                this.pagination.pageSize = val;
                this.getReachTableList();
            },
            //分页时切换页
            handleCurrentChange(val) {
                this.pagination.current = val;
                this.getReachTableList();
            }
        },
        computed: {
            tableMaxHeight() {
                return window.innerHeight - 160 + "px";
            }
        }
    };
</script>
<style>
</style>