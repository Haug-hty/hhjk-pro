<!-- 入河、湖排口管理页面 -->
<template>
    <main>
        <div style="height: 60px; padding: 15px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
            <el-row style="text-align:left;margin-top: -6px;">
                <el-form :inline="true" :model="formInline" style="height: 35px">
                    <el-form-item label="排口名称:">
                        <el-input v-model="formInline.name" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getOutLetTableList()" size="small">查询</el-button>
                        <el-button type="primary" @click="reset" size="small" plain>重置</el-button>
                        <el-button type="success" @click="addNew" size="small">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-row>

        </div>
        <el-table :data="outLetTableData" stripe style="width: 100%;font-size: 12px;text-align: center;">
            <el-table-column type='index' label="序号" width="50" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="rlName" label="河湖名称" width="150" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="riverName" label="排口名称" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="lon" label="经度°" width="200%" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="lat" label="纬度°" width="200%" align="center" header-align="center">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200%" align="center" header-align="center">
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
        <!-- 新增入河湖排口信息 -->
        <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="dialogFormVisible" width='50%' title="新增入河/湖排口信息">
            <el-row :gutter="15">
                <el-form ref="elForm" :model="newOutLetForm" size="medium">
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="湖泊名称：" prop="rlInfoId">
                            <el-select v-model="newOutLetForm.rlInfoId" placeholder="请选择" style="width: 70%;">
                                <el-option v-for="item in rlInfoOption" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>

                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="排口名称：" prop="siteName">
                            <el-input v-model="newOutLetForm.riverName" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="经度°：" prop="lon">
                            <el-input v-model="newOutLetForm.lon" clearable style="width: 70%;">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="纬度°：" prop="lat">
                            <el-input v-model="newOutLetForm.lat" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="是否出口：" prop="enter">
                            <el-select v-model="newOutLetForm.enter" placeholder="请选择" style="width: 70%;">
                                <el-option v-for="item in enterOption" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="是否存在饮用水水源地：" prop="drinkingSource">
                            <el-select v-model="newOutLetForm.drinkingSource" placeholder="请选择" style="width: 70%;">
                                <el-option v-for="item in enterOption" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <div slot="footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="newSubmit(newOutLetForm)">确定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑监测点断面信息 -->
        <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="dialogEditForm" width='50%' title="新增入河/湖排口信息">
            <el-row :gutter="15">
                <el-form ref="elForm" :model="editOutLetForm" size="medium">
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="湖泊名称：" prop="rlInfoId">
                            <el-select v-model="editOutLetForm.rlInfoId" placeholder="请选择" style="width: 70%;">
                                <el-option v-for="item in rlInfoOption" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>

                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="排口名称：" prop="siteName">
                            <el-input v-model="editOutLetForm.riverName" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="经度°：" prop="lon">
                            <el-input v-model="editOutLetForm.lon" clearable style="width: 70%;">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="纬度°：" prop="lat">
                            <el-input v-model="editOutLetForm.lat" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="是否出口：" prop="enter">
                            <el-select v-model="editOutLetForm.enter" placeholder="请选择" style="width: 70%;">
                                <el-option v-for="item in enterOption" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="是否存在饮用水水源地：" prop="drinkingSource">
                            <el-select v-model="editOutLetForm.drinkingSource" placeholder="请选择" style="width: 70%;">
                                <el-option v-for="item in enterOption" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <div slot="footer">
                <el-button @click="dialogEditForm = false">取消</el-button>
                <el-button type="primary" @click="editInfo(editOutLetForm)">确定</el-button>
            </div>
        </el-dialog>


    </main>

</template>
<script>
    import { lake_river_info_query, outLet_info_save, outLet_info_query } from "@/api/rlObject/index"
    import { dict_search_domain } from '@/api/dict/index'
    export default {
        name: 'outLet',
        data() {
            return {
                formInline: {
                    name: ''
                },
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                outLetTableData:[],
                dialogFormVisible: false,
                dialogEditForm:false,
                newOutLetForm: {},
                editOutLetForm:{},
                enterOption:[
                    {
                        label:'是',
                        value: true
                    },
                    {
                        label:'否',
                        value:false
                    }
                ],
                rlInfoOption:[],

            }
        },
        created() {
            this.rlInfoOptionSearch()
            this.getOutLetTableList()

        },
        methods: {
            //河湖对象选择项查询
            rlInfoOptionSearch() {
                let params = {
                    pageSize: 100,
                    pageNum: 1,
                    type:2
                }
                lake_river_info_query(params)
                    .then(res => {
                        this.rlInfoOption = res.data.data.list
                    })
            },
            //列表信息查询
            getOutLetTableList() {
                let params = {
                    riverName: this.formInline.name,
                    pageSize: this.pagination.pageSize,
                    pageNum: this.pagination.current
                }
                outLet_info_query(params)
                    .then(res => {                        
                        this.pagination.total = res.data.data.total
                        res.data.data.list.forEach(item => {
                            this.rlInfoOption.forEach(rl=>{
                                if(item.rlInfoId == rl.id){
                                    item.rlName = rl.name
                                }
                            })
                            
                        });
                        this.outLetTableData = res.data.data.list

                    })

            },

            //重置
            reset() {
                this.formInline.name = ''
                this.getOutLetTableList()
            },
            //新增监测点/断面信息
            addNew() {
                this.dialogFormVisible = true
                this.newOutLetForm = {}
            },
            newSubmit(info) {
                outLet_info_save(info)
                    .then(() => {
                        this.$message({
                            type: 'success',
                            message: '新增排口信息成功！'
                        });
                        this.dialogFormVisible = false
                        this.getOutLetTableList()
                    }).catch((err) => {
                        console.log(err)
                    })

            },
            //编辑信息
            edit(info) {
                this.editOutLetForm = JSON.parse(JSON.stringify(info))
                this.dialogEditForm = true
            },
            editInfo(info) {
                outLet_info_save(info)
                    .then(() => {
                        this.$message({
                            type: 'success',
                            message: '编辑检测站点/断面信息成功！'
                        });
                        this.dialogEditForm = false
                        this.getOutLetTableList()
                    }).catch((err) => {
                        console.log(err)
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