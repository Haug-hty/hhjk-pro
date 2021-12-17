<!-- 知识文档库 -->

<template>
    <main>
        <div
            style="height: 60px; padding: 15px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
            <el-form :inline="true" :model="formInline" style="height: 35px;text-align: left;margin-top: -10px;">

                <el-form-item label="">
                    <el-input v-model="formInline.userName" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchTableList" size="small">查询</el-button>
                    <el-button type="primary" @click="reset" size="small" plain>重置</el-button>
                    <el-button type="success" @click="dialogFormVisible = true" size="small">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" stripe style="width: 100%;font-size: 12px;text-align: center;">
            <el-table-column type='index' label="序号" width="80" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="userName" label="用户名"  align="center" header-align="center">
                <template slot-scope="scope">
                    {{scope.row.user.realName}}
                </template>
            </el-table-column>
            <el-table-column prop="userName" label="账户名"  align="center" header-align="center">
                <template slot-scope="scope">
                    {{scope.row.user.username}}
                </template>
            </el-table-column>
            <el-table-column prop="orgName" label="组织机构" align="center" header-align="center">
                <template slot-scope="scope">
                    {{scope.row.organization.name}}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center" header-align="center">
                <template slot-scope="scope">
                    <el-button @click="delInfo(scope)" size="small" type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="end">
            <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentChange"
                :current-page="pagination.current" :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize"
                :total="pagination.total" layout="prev,pager,next,jumper,total,sizes"></el-pagination>
        </el-row>
        <!-- 新增机构用户 -->
        <el-dialog append-to-body :visible.sync="dialogFormVisible" title="组织机构信息">
            <el-row :gutter="8">
                <el-form :model="addNewForm">
                    <el-col :span="12">
                        <el-form-item label="用户名:" :label-width="formLabelWidth" prop="userId">
                            <el-select v-model="addNewForm.userId" placeholder="请选择归属机构" clearable style="width: 100%;">
                            <el-option v-for="item in userOptions" :key="item.id" :label="item.realName" :value="item.id">
                            </el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="归属机构" prop="orgId" :label-width="formLabelWidth">
                        <el-select v-model="addNewForm.orgId" placeholder="请选择归属机构" clearable style="width: 100%;">
                            <el-option v-for="item in orgOptions" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                    
                </el-form>

            </el-row>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitAddInfo(addNewForm)">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑机构用户 -->


    </main>

</template>

<script>
import {userOrgListSearch,addUserOrg,deluserOrgInfo} from "@/api/system/userOrg"
    import { listOrganization } from "@/api/system/organization";
    import { listUser } from "@/api/system/user";
    export default {
        name: 'keyan',
        data() {
            return {
                formInline: {
                    userName: ''
                },
                tableData: [],
                dialogFormVisible: false, //新增dialog弹窗控制器
                addNewForm: {
                },
                formLabelWidth: '120px',
                dialogEdit: false,
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                /** 组织机构选项 */
                orgOptions:[],
                userOptions:[],



            }
        },
        created() {
            this.getOrgList()
            this.getUserList()
            this.searchTableList() //列表初始化查询
        },
        methods: {
            /** 查询用户列表 */
            getUserList(){
                let params = {
                pageNum: 1,
                pageSize: 100,
                }
                listUser(params).then(res=>{
                    this.userOptions = res.data.data.list
                })
            },
            /** 查询机构列表 */
            getOrgList(){
                let params = {
                pageNum: 1,
                pageSize: 100,
                }
                listOrganization(params).then(res=>{
                this.orgOptions = res.data.data.list
                })
            },

            //列表信息查询
            searchTableList() {
                let params = {
                    fileName: this.formInline.fileName,
                    pageSize: this.pagination.pageSize,
                    pageNum: this.pagination.current
                }
                userOrgListSearch(params)
                    .then(response => {
                        this.tableData = response.data.data.list
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            //重置
            reset() {
                this.formInline.fileName = ''
                this.searchTableList()

            },
            //新增机构用户提交
            submitAddInfo() {
                let params = {
                    userId: this.addNewForm.userId,
                    orgId: this.addNewForm.orgId
                }
                addUserOrg(params).then(res=>{
                    this.$message({
                        type: 'success',
                        message: '新增成功！'
                    });
                    this.dialogFormVisible = false
                    this.searchTableList()
                })

            },

            //删除机构用户
            delInfo(scope) {

                this.$confirm('确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deluserOrgInfo(scope.row.id)
                        .then(() => {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.searchTableList()
                        }).catch(() => {
                            this.$message({
                                type: 'warning',
                                message: '删除失败'
                            });
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
                this.searchTableList();
            },
            //分页时切换页
            handleCurrentChange(val) {
                this.pagination.current = val;
                this.searchTableList();
            },
        }
    }
</script>
<style scoped>
</style>