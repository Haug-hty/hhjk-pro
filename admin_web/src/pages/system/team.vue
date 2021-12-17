<!-- 河湖评估团队人员信息管理 -->

<template>
    <main>
        <div
            style="height: 60px; padding: 15px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
            <el-row style="text-align:left;margin-top: -6px;">
                <el-form :inline="true" :model="formInline" style="height: 35px">
                    <el-form-item label="评估小组:">
                        <el-input v-model="formInline.name" placeholder=""></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="河湖类型:">
                        <el-select v-model="formInline.type" placeholder="请选择行业">
                            <el-option label="河流" value="河流"></el-option>
                            <el-option label="湖泊" value="湖泊"></el-option>
                        </el-select>
                    </el-form-item> -->

                    <el-form-item>
                        <el-button type="primary" @click="getTeamTableList" size="small">查询</el-button>
                        <el-button type="primary" @click="reset" size="small" plain>重置</el-button>
                        <el-button type="success" @click="addNew" size="small">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-row>

        </div>
        <el-table :data="teamTableData" stripe style="width: 100%;font-size: 12px;text-align: center;">
            <!-- :height="tableMaxHeight"> -->
            <el-table-column type='index' label="序号" width="50" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="name" label="小组名称" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="leader" label="负责人" width="100" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="tel" label="联系电话" align="center" header-align="center">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="300" align="center" header-align="center">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" size="small" type="text" >编辑</el-button>
                    <el-button @click="teamUser(scope.row)" size="small" type="text" >成员信息</el-button>
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
        <!-- 新增小组信息 -->
        <el-dialog append-to-body :visible.sync="dialogFormVisible" width='60%' >
            <el-row :gutter="15">
                <el-form ref="elForm" :model="newTeamForm" size="medium" label-width="100px">
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="小组名称：" prop="name">
                            <el-input v-model="newTeamForm.name" clearable :style="{width: '100%'}"></el-input>

                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="负责人：" prop="leader">
                            <el-input v-model="newTeamForm.leader" clearable :style="{width: '100%'}"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="联系方式：" prop="tel">
                            <el-input v-model="newTeamForm.tel" clearable :style="{width: '100%'}"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>

            </el-row>
            <div slot="footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="addNewInfo(newTeamForm)">确定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑小组信息 -->
        <el-dialog append-to-body :visible.sync="dialogEditForm" width='60%' >
            <el-row :gutter="15">
                <el-form ref="elForm" :model="editTeamForm" size="medium" label-width="100px">
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="小组名称：" prop="name">
                            <el-input v-model="editTeamForm.name" clearable :style="{width: '100%'}"></el-input>

                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="负责人：" prop="leader">
                            <el-input v-model="editTeamForm.leader" clearable :style="{width: '100%'}"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="联系方式：" prop="tel">
                            <el-input v-model="editTeamForm.tel" clearable :style="{width: '100%'}"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>

            </el-row>
            <div slot="footer">
                <el-button @click="dialogEditForm= false">取消</el-button>
                <el-button type="primary" @click="editInfo(editTeamForm)">确定</el-button>
            </div>
        </el-dialog>
        <!-- 成员信息编辑 -->
        <el-dialog append-to-body :visible.sync="teamUserFlag" width='50%' >
            <el-transfer v-model="userChoiceValue" :data="userdata" :titles="['人员列表', '小组成员']"></el-transfer>
            <div slot="footer">
                <el-button @click="teamUserFlag= false">取消</el-button>
                <el-button type="primary" @click="submitMember">确定</el-button>
            </div>
        </el-dialog>


    </main>

</template>
<script>
    import { teamMember, teamMemberBind, team_info_query, team_addInfo, team_delInfo } from "@/api/system/team.js"
    export default {
        name: 'samplingPointManagement',
        data() {
            return {
                formInline: {
                    name: ''
                },
                teamTableData: [],
                dialogFormVisible: false,
                newTeamForm: {},
                editTeamForm: {},
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                dialogEditForm: false,
                teamUserFlag: false,
                userChoiceValue: [],
                userdata: [],
                memberList: [],
                teamId: undefined,

            }
        },
        created() {
            this.getTeamTableList()
            // this.getUserData()
        },
        methods: {

            //列表信息查询
            getTeamTableList() {
                let params = {
                    name: this.formInline.name,
                    pageSize: this.pagination.pageSize,
                    pageNum: this.pagination.current
                }
                team_info_query(params)
                    .then(res => {
                        this.teamTableData = res.data.data.list
                        this.pagination.total = res.data.data.total

                    })

            },

            //重置
            reset() {
                this.formInline.name = ''
                this.getTeamTableList()
            },
            //新增评估小组信息
            addNew() {
                this.dialogFormVisible = true
            },
            addNewInfo(info) {
                team_addInfo(info)
                    .then(() => {
                        this.$message({
                            type: 'success',
                            message: '新增评估小组信息成功！'
                        });
                        this.dialogFormVisible = false
                        this.newTeamForm = {}
                        this.getTeamTableList()
                    }).catch((err) => {
                        console.log(err)
                    })

            },
            //编辑信息
            edit(info) {
                this.editTeamForm = JSON.parse(JSON.stringify(info))
                this.dialogEditForm = true
            },
            editInfo(info) {
                team_addInfo(info)
                    .then(() => {
                        this.$message({
                            type: 'success',
                            message: '编辑评估小组信息成功！'
                        });
                        this.dialogEditForm = false
                        this.getTeamTableList()
                    }).catch((err) => {
                        console.log(err)
                    })
            },
            //删除评估小组信息
            delInfo(scope) {
                this.$confirm('确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    team_delInfo(scope.row.id)
                        .then(() => {
                            this.$message({
                                message: "删除成功",
                                type: 'success'
                            })
                            this.getTeamTableList()
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
                this.getTeamTableList();
            },
            //分页时切换页
            handleCurrentChange(val) {
                this.pagination.current = val;
                this.getTeamTableList();
            },

            //成员信息
            teamUser(info) {
                this.teamUserFlag = true
                this.getUserData(info.id)
                this.teamId = info.id
            },
            getUserData(info) {
                this.userChoiceValue = []
                this.userdata = []
                this.memberList = []
                teamMember(info)
                    .then(res => {
                        console.log(res);
                        
                        this.memberList = res.data.data.memberList
                        res.data.data.memberList.forEach(item => {
                            this.userdata.push({
                                key: item.userId,
                                label: item.realName
                            })
                            if (item.exist) {
                                this.userChoiceValue.push(item.userId)
                            }
                        });
                    })
                    
            },
            submitMember() {
                let finalList = []
                this.memberList.forEach(item => {
                    if (item.exist) {
                        let count = 0
                        this.userChoiceValue.forEach(choiceMem => {
                            if (item.userId !== choiceMem) {
                                count += 1
                            }
                        })
                        if (count == this.userChoiceValue.length) {
                            item.del = true
                            finalList.push(item)
                        }
                    } else {
                        this.userChoiceValue.forEach(choiceMem => {
                            if (item.userId == choiceMem) {
                                item.add = true
                                item["teamId"] = this.teamId
                                finalList.push(item)
                            }
                        })
                    }

                })
                teamMemberBind(finalList)
                    .then(res => {
                        this.$message("成员绑定成功！")
                        this.teamUserFlag = false
                    })
            }

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