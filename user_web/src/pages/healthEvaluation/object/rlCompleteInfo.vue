// 河湖对象完整信息
<!-- 入河、湖排口管理页面 -->
<template>
    <main>
        <div style="height: 60px; padding: 15px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
            <el-row style="text-align:left;margin-top: -6px;">
                <el-form :inline="true" :model="formInline" style="height: 35px">
                    <el-form-item label="河湖对象:">
                        <el-input v-model="formInline.name" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getRlComTableList()" size="small">查询</el-button>
                        <el-button type="primary" @click="reset" size="small" plain>重置</el-button>
                        <el-button type="success" @click="addNew" size="small">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-row>

        </div>
        <el-table :data="rlComTableData" stripe :cell-style="cellStyle" style="width: 100%;font-size: 12px;text-align: center;" :header-cell-style="{background:'#eef1f6',color:'#606266',fontSize:'14px',borderBottom:'1px solid #000'}">
            <el-table-column type='index' label="序号" width="50" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="name" label="河湖名称" width="150" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="code" label="编码" width="100" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="rltype" label="河湖类型" width="100" align="center" header-align="center">
                <template slot-scope="scope">
                    <div v-if="scope.row.type == 1">河流</div>
                    <div v-if="scope.row.type == 2">湖泊</div>
                    <div v-if="scope.row.type == 3">水库</div>
                </template>
            </el-table-column>
            <el-table-column prop="simpleDesc" label="简介"  align="center" header-align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200%" align="center" header-align="center">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" size="small" type="text" plain>编辑</el-button>
                    <el-button @click="delInfo(scope)" size="small" type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页栏 -->
        <el-row type="flex" justify="end">
            <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentChange" :current-page="pagination.current"
                :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total" layout="prev,pager,next,jumper,total,sizes"></el-pagination>
        </el-row>
        <!-- 河湖总体信息 -->
        <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="dialogFormVisible" width='50%' :title="title">
            <el-row :gutter="15">
                <el-form ref="rlComForm" :rules="rlComFormRules" :model="rlComForm" size="medium">
                    
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="河湖名称：" prop="name">
                            <el-input v-model="rlComForm.name" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="河湖编码：" prop="code">
                            <el-input v-model="rlComForm.code" clearable style="width: 70%;">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="河湖类型：" prop="type">
                            <el-select v-model="rlComForm.type" placeholder="请选择" style="width: 70%;">
                                <el-option v-for="item in rlTypeOptions" :key="item.doKey" :label="item.doValue"
                                    :value="item.doKey"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="河湖简介：" prop="simpleDesc">
                            <el-input v-model="rlComForm.simpleDesc" type="textarea" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <div slot="footer">
                <el-button @click="resetForm('rlComForm'),dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submit(rlComForm)">确定</el-button>
            </div>
        </el-dialog>

    </main>

</template>
<script>
    import { rl_complete_info_query ,rl_complete_info_save ,rl_complete_delInfo } from "@/api/rlObject/index"
    import { dict_search_domain } from '@/api/dict/index'
    export default {
        name: 'rlCompleteInfo',
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
                rlComTableData:[],
                dialogFormVisible: false,
                rlComForm: {
                    name:'',
                    type:null,
                    code:'',
                    simpleDesc:'',
                },
                rlTypeOptions:[],
                title:'',
                rlComFormRules: {
                    name: [
                        { required: true, trigger: "blur", message: "河湖名称不能为空" }
                    ],
                    type: [
                        { required: true, trigger: "blur", message: "河湖类型不能为空" }
                    ]
                }

            }
        },
        created() {
            this.rlTypeDictSearch()
            this.getRlComTableList()

        },
        // updated(data,obj){
        //     this.$refs['rlComForm'].resetFields();
        // },
        methods: {
            /** 对象类型列项内容样式填充 */
            cellStyle(data) {
                if (data.columnIndex == 3) {
                    if (data.row.type == 1) {
                        // return 'color:rgba(65, 97, 235, 1);background:rgba(65, 97, 235, 0.1);'
                        return 'color:rgba(65, 97, 235, 1)'
                    } else if(data.row.type == 2){
                        // return 'color:rgba(11, 219, 168, 1);background:rgba(11, 219, 168, 0.1);'
                        return 'color:rgba(11, 219, 168, 1)'
                    } else if(data.row.type == 3){
                        // return 'color:rgba(255, 181, 64, 1);background:rgba(255, 181, 64, 0.1);'
                        return 'color:rgba(255, 181, 64, 1);'
                    }
                }
            },
            /** /河湖类型信息查询*/
            rlTypeDictSearch() {
                let domian = 'rlType'
                dict_search_domain(domian)
                    .then(response => {
                        this.rlTypeOptions = response.data.data
                    }).catch(() => {
                        console.log(err)
                    })
            },
            //列表信息查询
            getRlComTableList() {
                let params = {
                    name: this.formInline.name,
                    pageSize: this.pagination.pageSize,
                    pageNum: this.pagination.current
                }
                rl_complete_info_query(params)
                    .then(res => {
                        this.rlComTableData = res.data.data.list
                        this.pagination.total = res.data.data.total
                    })

            },

            //重置
            reset() {
                this.formInline.name = ''
                this.getRlComTableList()
            },
            //新增监测点/断面信息
            addNew() {
                this.dialogFormVisible = true
                this.rlComForm = {}
                this.title = "整体河湖对象新增"
            },
            submit(info) {
                this.$refs.rlComForm.validate(valid => {
                    if (valid) {
                        rl_complete_info_save(info)
                            .then(() => {
                                this.$message({
                                    type: 'success',
                                    message: '河湖信息'+this.title+'成功！'
                                });
                                this.dialogFormVisible = false
                                this.getRlComTableList()
                            }).catch((err) => {
                                console.log(err)
                            })

                    }
                })
                

            },

            resetForm(obj){
                // location.reload()
                this.$refs[obj].resetFields();
            },
            //编辑信息
            edit(info) {
                this.rlComForm = JSON.parse(JSON.stringify(info))
                this.title = "修改"
                this.dialogFormVisible = true
                
            },
            //删除监测点/断面信息
            delInfo(scope) {
                this.$confirm('确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    rl_complete_delInfo(scope.row.id)
                        .then(() => {
                            this.$message({
                                message: "删除成功",
                                type: 'success'
                            })
                            this.getRlComTableList()
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
                this.getRlComTableList();
            },
            //分页时切换页
            handleCurrentChange(val) {
                this.pagination.current = val;
                this.getRlComTableList();
            },

        },
        computed: {
            tableMaxHeight() {
                return window.innerHeight - 160 + 'px';
            }
        },
    }
</script>
<style lang="less" scoped>

/deep/ .el-dialog__body{
    padding: 0 20px;
}

</style>