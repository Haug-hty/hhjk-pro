<!-- 科研成果库页面 -->

<template>
    <main>
        <div
            style="height: 60px; padding: 15px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
            <el-form :inline="true" :model="formInline" style="height: 35px;text-align: left;margin-top: -10px;">
                <el-form-item label="行业:">
                    <el-select v-model="formInline.industry" placeholder="请选择行业">
                        <el-option v-for="item in industryOption" :key="item.doKey" :label="item.doValue"
                            :value="item.doKey">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称:">
                    <el-input v-model="formInline.fileName" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchTableList" size="small">查询</el-button>
                    <el-button type="primary" @click="reset" size="small" >重置</el-button>
                    <el-button type="success" @click="addNew" size="small">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" stripe style="width: 100%;font-size: 12px;text-align: center;">
            <el-table-column type='index' label="序号" width="80" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="type" label="类别" width="100" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="fileName" label="文件名" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="author" label="作者" width="260" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="srcFrom" label="来源" width="150" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="publishDate" label="发布日期" width="200" align="center" header-align="center">
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="200" align="center" header-align="center">
                <template slot-scope="scope">
                    <el-button @click="downLoadFile(scope.row)" size="small" type="text" >下载</el-button>
                    <!-- <el-button size="small" type="primary" plain>查看</el-button> -->
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
        <!-- 新增科研成果 -->
        <el-dialog append-to-body :visible.sync="dialogFormVisible">
            <el-row :gutter="15">
                <el-form :model="addNewForm">
                    <el-col :span="12">
                        <el-form-item label="类别:" :label-width="formLabelWidth" prop="type" >
                            <el-input v-model="addNewForm.type" placeholder="请输入名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="文件名称:" :label-width="formLabelWidth" prop="fileName" required>
                            <el-input v-model="addNewForm.fileName" placeholder="请输入名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="作者:" :label-width="formLabelWidth" prop="author" required>
                            <el-input v-model="addNewForm.author" placeholder="请输入名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="来源:" :label-width="formLabelWidth" prop="srcFrom" required>
                            <el-input v-model="addNewForm.srcFrom" placeholder="请输入名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="发布日期:" :label-width="formLabelWidth" prop="publishDate">
                            <el-date-picker v-model="addNewForm.publishDate" format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd" :style="{width: '100%'}" placeholder="请选择日期选择" clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span='12'>
                        <el-form-item label="文件上传：" :label-width="formLabelWidth" prop="" >
                            <input type="file" id="file" size="50" @change="upload" />
                        </el-form-item>
                    </el-col>
                    




                </el-form>

            </el-row>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitAddInfo(addNewForm)">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑科研成果 -->


    </main>

</template>

<script>
    import { scientific_table_search, scientific_newInfo_submit, scientific_editInfo, scientific_delInfo } from '@/api/healthManage/index'
    import { dict_search_domain } from '@/api/dict/index'
    import { uploadFileRequest, getFileByCode } from '@/api/file/index'
    export default {
        name: 'keyan',
        data() {
            return {
                formInline: {
                    fileName: '',
                    industry: ''
                },
                tableData: [],
                dialogFormVisible: false, //新增dialog弹窗控制器
                addNewForm: {
                    fileName: '',
                    type: '',
                    srcFrom: '',
                    author: '',
                    publishDate: '',
                    fileCode: ''
                },
                formLabelWidth: '120px',
                dialogEdit: false,

                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                industryOption: [],
                filePath: '',//文件上传地址



            }
        },
        created() {
            this.searchTableList() //列表初始化查询
            this.industryDictSearch() //行业字典信息查询
        },
        methods: {
            //行业字典信息查询
            industryDictSearch() {
                let domian = 'industry'
                dict_search_domain(domian)
                    .then(response => {
                        this.industryOption = response.data.data
                    }).catch(() => {
                        console.log(err)
                    })
            },
            //列表信息查询
            searchTableList() {
                let params = {
                    fileName: this.formInline.fileName,
                    industry: this.formInline.industry,
                    pageSize: this.pagination.pageSize,
                    pageNum: this.pagination.current
                }
                scientific_table_search(params)
                    .then(response => {
                        // console.log(response.data.data)
                        this.tableData = response.data.data.list
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            //重置
            reset() {
                this.formInline.fileName = ''
                this.formInline.industry = ''
                this.searchTableList()

            },
            //新增科研成果
            addNew() {
                this.dialogFormVisible = true
                //新增form表单内容重置
                this.addNewForm.fileName = ''
                this.addNewForm.type = ''
                this.addNewForm.srcFrom = ''
                this.addNewForm.author = ''
                this.addNewForm.publishDate = ''
                this.addNewForm.fileCode = ''
            },
            //新增科研成果提交
            submitAddInfo(info) {
                this.addNewForm.fileCode = this.filePath
                scientific_newInfo_submit(this.addNewForm)
                    .then(() => {
                        this.$message({
                            type: 'success',
                            message: '新增科研成果成功'
                        })
                        this.dialogFormVisible = false
                        this.searchTableList()
                    }).catch(() => {
                        this.$message({
                            type: 'error',
                            message: '新增科研成果失败'
                        })
                    })

            },
            //编辑科研成果
            editInfo(Info) {
                scientific_editInfo(Info)
                    .then((response) => {
                        this.$message({
                            type: 'success',
                            message: '编辑成功'
                        })
                        this.dialogEdit = false
                        this.searchTableList()
                    }).catch(() => {
                        this.$message({
                            type: 'warning',
                            message: '编辑失败'
                        })
                    })

            },
            //删除科研成果
            delInfo(scope) {

                this.$confirm('确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    scientific_delInfo(scope.row.id)
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
                this.getList();
            },
            //分页时切换页
            handleCurrentChange(val) {
                this.pagination.current = val;
                this.getList();
            },


            //文件上传功能
            upload() {
                const loading = this.$loading({
                    lock: true,
                    text: "文件上传中...",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)",
                });
                var fileObj = document.getElementById("file").files; // js 获取文件对象
                var form = new FormData();
                form.append("file", this.file);
                form.append("srcType",5)
                if (fileObj.length != 0) {
                    var i = fileObj.length;
                    this.counts = i;
                    var that = this;
                    for (var j = 0; j < i; j++) {
                        (function (i) {
                            form.append("file", fileObj[i]); // 文件对象
                        })(j);
                    }
                }
                uploadFileRequest(form)
                    .then((res) => {
                        console.log(res, "文件上传成功");
                        loading.close();
                        this.filePath = res.data.data.fileCode

                    })
                    .catch(err => {
                        loading.close()
                        console.log(err)
                        this.$message("上传失败！")
                    })
            },
            //文件下载功能
            downLoadFile(info) {
                getFileByCode(info.fileCode).then(res=>{
                    console.log(res)
                    window.open(res.data.data);
                })

            },
        }
    }
</script>
<style scoped>
</style>