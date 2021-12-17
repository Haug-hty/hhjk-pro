<template>
    <div>
        <div style="height: 60px; padding: 10px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
            <el-form :inline="true">
            <el-form-item label="部门名称">
                <el-input v-model="queryParams.name" placeholder="请输入机构名称" clearable size="small"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item>
                <el-button class="filter-item" type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索
                </el-button>
                <el-button class="filter-item" type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增
                </el-button>
            </el-form-item>
        </el-form>
        </div>
        

        <el-table :data="organizationList" row-key="organizationId" default-expand-all stripe
            style="width: 100%;font-size: 12px;text-align: center;">
            <el-table-column type='index' label="序号" width="80" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="name" label="机构名称" align="center" header-align="center"></el-table-column>
            <el-table-column prop="contacts" label="联系人" width="200" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="contactsAddress" label="联系地址" align="center" header-align="center"></el-table-column>
            <el-table-column prop="contactsTel" label="联系电话" width="200" align="center" header-align="center">
            </el-table-column>
            <el-table-column label="操作" align="center" header-align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改
                    </el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
            <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentChange"
                :current-page="queryParams.pageNum" :page-sizes="[10, 20, 50, 100]" :page-size="queryParams.pageSize"
                :total="total" layout="prev,pager,next,jumper,total,sizes"></el-pagination>
        </el-row>

        <!-- 添加或修改组织机构对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="60%" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="机构名称" prop="name">
                            <el-input v-model="form.name" placeholder="请输入机构名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系人" prop="contacts">
                            <el-input v-model="form.contacts" placeholder="请输入联系人" maxlength="20" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话" prop="contactsTel">
                            <el-input v-model="form.contactsTel" placeholder="请输入联系电话" maxlength="11" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系地址" prop="contactsAddress">
                            <el-input v-model="form.contactsAddress" placeholder="请输入联系地址" maxlength="50" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮件地址" prop="contactsEmail">
                            <el-input v-model="form.contactsEmail" placeholder="请输入邮件地址" maxlength="100" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="传真地址" prop="contactsFax">
                            <el-input v-model="form.contactsFax" placeholder="请输入传真地址" maxlength="50" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="简介" prop="simpleDesc">
                            <el-input v-model="form.simpleDesc" placeholder="简介" maxlength="200" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { addOrganization, listOrganization, updateOrganization, delOrganization } from "@/api/system/organization"

    export default {
        name: "Organization",
        data() {
            return {
                // 表格数据
                organizationList: [],
                // 弹出层标题
                title: "",
                // 是否显示弹出层
                open: false,
                // 查询参数
                queryParams: {
                    name: undefined,
                    pageNum: 1,
                    pageSize: 10,
                },
                total: 0,
                // 表单参数
                form: {},
                // 表单校验
                rules: {
                    name: [
                        { required: true, message: "机构名不能为空", trigger: "blur" }
                    ],
                    contacts: [
                        { required: true, message: "联系人不能为空", trigger: "blur" }
                    ],
                    contactsTel: [
                        { required: true, message: "联系电话不能为空", trigger: "blur" }
                    ],
                    contactsEmail: [
                        {
                            type: "email",
                            message: "'请输入正确的邮箱地址",
                            trigger: ["blur", "change"]
                        }
                    ],
                    contactsTel: [
                        {
                            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
                            message: "请输入正确的手机号码",
                            trigger: "blur"
                        }
                    ]
                }
            };
        },
        created() {
            this.getList()
        },
        methods: {
            /** 查询机构列表 */
            getList() {
                listOrganization(this.queryParams).then(response => {
                    this.organizationList = response.data.data.list;
                    this.total = response.data.data.size
                });
            },
            // 取消按钮
            cancel() {
                this.open = false;
                this.reset();
            },
            // 表单重置
            reset() {
                this.form = {
                    name: undefined,
                    contacts: undefined,
                    contactsTel: undefined,
                    contactsAddress: undefined,
                    contactsEmail: undefined,
                    contactsFax: undefined,
                    simpleDesc: undefined,
                };
                // this.resetForm("form");
            },
            /** 搜索按钮操作 */
            handleQuery() {
                this.getList();
            },
            /** 新增按钮操作 */
            handleAdd(row) {
                this.reset();
                this.open = true;
                this.title = "添加机构"
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset()
                this.form = JSON.parse(JSON.stringify(row));
                this.open = true;
                this.title = "修改机构信息";
            },
            /** 提交按钮 */
            submitForm: function () {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        if (this.form.id != undefined) {
                            updateOrganization(this.form).then(response => {
                                if (response.data.code === 0) {
                                    this.$message("修改成功");
                                    this.open = false;
                                    this.getList();
                                } else {
                                    this.$message(response.data.msg);
                                }
                            });
                        } else {
                            addOrganization(this.form).then(response => {
                                if (response.data.code === 0) {
                                    this.$message("新增成功");
                                    this.open = false;
                                    this.getList();
                                } else {
                                    this.$message(response.data.data);
                                }
                            });
                        }
                    }
                });
            },
            /** 删除按钮操作 */
            handleDelete(row) {
                this.$confirm('是否确认删除名称为"' + row.name + '"的数据项?', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(function () {
                    return delOrganization(row.id);
                }).then(() => {
                    this.getList();
                    this.msgSuccess("删除成功");
                }).catch(function () { });
            },
            //分页时展示页面数据的容量
            handlePageSizeChange(val) {
                this.queryParams.pageSize = val;
                this.getList();
            },
            //分页时切换页
            handleCurrentChange(val) {
                this.queryParams.pageNum = val;
                this.getList();
            },

            memberAdd(info){
                console.log(info);
                
            },
        }
    };
</script>