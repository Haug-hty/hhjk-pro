<!-- 采样点管理 -->
<template>
    <main>
        <div
            style="height: 60px; padding: 15px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
            <el-row style="text-align:left;margin-top: -6px;">
                <el-form :inline="true" :model="formInline" style="height: 35px">
                    <el-form-item label="采样(监测)点名称:">
                        <el-input v-model="formInline.siteName" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getSiteTableList()" size="small">查询</el-button>
                        <el-button type="primary" @click="reset" size="small" plain>重置</el-button>
                        <el-button type="success" @click="addNew" size="small">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-row>

        </div>
        <el-table :data="siteTableData" stripe style="width: 100%;font-size: 12px;text-align: center;" :header-cell-style="{background:'#eef1f6',color:'#606266',fontSize:'14px',borderBottom:'1px solid #000'}">
            <!-- :height="tableMaxHeight"> -->
            <el-table-column type='index' label="序号" width="50" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="rlName" label="河流名称" width="150" align="center" header-align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <!-- <el-table-column prop="siteCode" label="采样(监测)点编码" width="100" align="center" header-align="center">
            </el-table-column> -->
            <el-table-column prop="siteName" label="采样(监测)点名称" align="center" header-align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="siteTypeName" label="采样(监测)点类型" width="200" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="lon" label="经度°" width="100" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="lat" label="纬度°" width="100" align="center" header-align="center">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center" header-align="center">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" size="small" type="text">编辑</el-button>
                    <el-button @click="delInfo(scope)" size="small" type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页栏 -->
        <el-row type="flex" justify="end">
            <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentChange"
                :current-page="pagination.current" :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize"
                :total="pagination.total" layout="prev,pager,next,jumper,total,sizes"></el-pagination>
        </el-row>
        <!-- 新增监测点断面信息 -->
        <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="dialogFormVisible" width='50%' title="新增采样(监测)点信息">
            <el-row :gutter="15">
                <el-form ref="addForm" :model="newSiteForm" :rules="rulesAdd" size="medium">
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="河湖名称：" prop="rlInfoId">
                            <el-select v-model="newSiteForm.rlInfoId" placeholder="请选择" style="width: 70%;">
                                <el-option v-for="item in rlInfoOption" :key="item.id" :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>

                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="采样(监测)点编码：" prop="siteCode">
                            <el-input v-model="newSiteForm.siteCode" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="采样(监测)点类型：" prop="siteType">
                            <el-select v-model="newSiteForm.siteType" placeholder="请选择" style="width: 70%;">
                                <el-option v-for="item in siteTypeOption" :key="item.doKey" :label="item.doValue"
                                    :value="item.doKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="采样(监测)点名称：" prop="siteName">
                            <el-input v-model="newSiteForm.siteName" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="经度°：" prop="lon">
                            <el-input v-model="newSiteForm.lon" clearable style="width: 70%;">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="纬度°：" prop="lat">
                            <el-input v-model="newSiteForm.lat" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="站点描述：" prop="desc">
                            <el-input v-model="newSiteForm.desc" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <div slot="footer">
                <el-button @click="cancel('addForm'),dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="addNewInfo(newSiteForm)">确定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑监测点断面信息 -->
        <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="dialogEditForm" width='60%' title="编辑采样(监测)点信息">
            <el-row :gutter="15">
                <el-form ref="editForm" :model="editSiteForm" :rules="rulesEdit" size="medium" label-width="100px">
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="河湖名称：" prop="rlInfoId">
                            <el-select v-model="editSiteForm.rlInfoId" placeholder="请选择" style="width: 70%;">
                                <el-option v-for="item in rlInfoOption" :key="item.id" :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>

                        </el-form-item>
                    </el-col>
                    
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="采样(监测)点编码：" prop="siteCode">
                            <el-input v-model="editSiteForm.siteCode" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="采样(监测)点类型：" prop="siteType">
                            <el-select v-model="editSiteForm.siteType" placeholder="请选择" style="width: 70%;">
                                <el-option v-for="item in siteTypeOption" :key="item.doKey" :label="item.doValue"
                                    :value="item.doKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="采样(监测)点名称：" prop="siteName">
                            <el-input v-model="editSiteForm.siteName" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="经度°：" prop="lon">
                            <el-input v-model="editSiteForm.lon" clearable style="width: 70%;">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="纬度°：" prop="lat">
                            <el-input v-model="editSiteForm.lat" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="站点描述：" prop="desc">
                            <el-input v-model="editSiteForm.desc" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <div slot="footer">
                <el-button @click="cancel('editForm'),dialogEditForm= false">取消</el-button>
                <el-button type="primary" @click="editInfo(editSiteForm)">确定</el-button>
            </div>
        </el-dialog>


    </main>

</template>
<script>
    import { site_info_query, lake_river_info_query, site_addInfo, site_delInfo } from "@/api/rlObject/index"
    import { dict_search_domain } from '@/api/dict/index'
    export default {
        name: 'samplingPointManagement',
        data() {
            return {
                formInline: {
                    siteName: ''
                },
                siteTableData: [],
                dialogFormVisible: false,
                dialogEditForm: false,
                newSiteForm: {},
                editSiteForm: {},
                rlInfoOption: [],
                siteTypeOption: [],
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                rulesAdd:{
                    rlInfoId: [
                        { required: true, trigger: "blur", message: "河湖名称不能为空" }
                    ],
                    siteType: [
                        { required: true, trigger: "blur", message: "采样(监测)点类型不能为空" }
                    ],
                    lon: [
                        { required: true, trigger: "blur", message: "经度°不能为空" }
                    ],
                    lat: [
                        { required: true, trigger: "blur", message: "纬度°不能为空" }
                    ],
                },
                rulesEdit:{
                    rlInfoId: [
                        { required: true, trigger: "blur", message: "河湖名称不能为空" }
                    ],
                    siteType: [
                        { required: true, trigger: "blur", message: "采样(监测)点类型不能为空" }
                    ],
                    lon: [
                        { required: true, trigger: "blur", message: "经度°不能为空" }
                    ],
                    lat: [
                        { required: true, trigger: "blur", message: "纬度°不能为空" }
                    ],
                },

            }
        },
        created() {
            this.siteTypeDictSearch()
            this.rlInfoOptionSearch()
            
        },
        methods: {
            //监测站点类型字典信息查询
            siteTypeDictSearch() {
                let domian = 'monitorType'
                dict_search_domain(domian)
                    .then(response => {
                        this.siteTypeOption = response.data.data
                        this.getSiteTableList()
                    }).catch(() => {
                        console.log(err)
                    })
            },
            //河湖对象选择项查询
            rlInfoOptionSearch() {
                let params = {
                    pageSize: 100,
                    pageNum: 1
                }
                lake_river_info_query(params)
                    .then(res => {
                        this.rlInfoOption = res.data.data.list
                    })

            },
            //列表信息查询
            getSiteTableList() {
                let params = {
                    siteName: this.formInline.siteName,
                    pageSize: this.pagination.pageSize,
                    pageNum: this.pagination.current
                }
                site_info_query(params)
                    .then(res => {
                        res.data.data.list.forEach(item => {                            
                            this.siteTypeOption.forEach(siteTy=>{
                                if(item.siteType == siteTy.doKey){
                                    item.siteTypeName = siteTy.doValue
                                }
                            })
                            this.rlInfoOption.forEach(rlOp=>{
                                if(item.rlInfoId == rlOp.id){
                                    item.rlName = rlOp.name
                                }
                            })
                            
                        });
                        this.siteTableData = res.data.data.list
                        this.pagination.total = res.data.data.total
                        console.log(this.siteTableData)

                    })

            },

            //重置
            reset() {
                this.formInline.siteName = ''
                this.getSiteTableList()
            },

            /** 表单校验重置 */
            cancel(formName){
                this.$refs[formName].clearValidate()
            },
            //新增监测点/断面信息
            addNew() {
                this.dialogFormVisible = true
            },
            addNewInfo(info) {
                this.$refs.addForm.validate(valid => {
                    if (valid) {
                        site_addInfo(info)
                    .then(() => {
                        this.$message({
                            type: 'success',
                            message: '新增检测站点/断面信息成功！'
                        });
                        this.dialogFormVisible = false
                        this.newSiteForm = {}
                        this.getSiteTableList()
                    }).catch((err) => {
                        console.log(err)
                    })

                    }
                    })
                

            },
            //编辑信息
            edit(info) {
                this.editSiteForm = JSON.parse(JSON.stringify(info))
                this.dialogEditForm = true
            },
            editInfo(info) {
                this.$refs.editForm.validate(valid => {
                    if (valid) {
                        site_addInfo(info)
                    .then(() => {
                        this.$message({
                            type: 'success',
                            message: '编辑检测站点/断面信息成功！'
                        });
                        this.dialogEditForm = false
                        this.getSiteTableList()
                    }).catch((err) => {
                        console.log(err)
                    })

                    }
                    })
                
            },
            //删除监测点/断面信息
            delInfo(scope) {
                this.$confirm('确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    site_delInfo(scope.row.id)
                        .then(() => {
                            this.$message({
                                message: "删除成功",
                                type: 'success'
                            })
                            this.getSiteTableList()
                        })

                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '已取消删除'
                    });
                });
            },
            //分页时展示页面数据的容量
            handlePageSizeChange(val) {
                this.pagination.pageSize = val;
                this.getSiteTableList();
            },
            //分页时切换页
            handleCurrentChange(val) {
                this.pagination.current = val;
                this.getSiteTableList();
            },

        },
        computed: {
            tableMaxHeight() {
                return window.innerHeight - 160 + 'px';
            }
        },
    }
</script>
<style>

</style>