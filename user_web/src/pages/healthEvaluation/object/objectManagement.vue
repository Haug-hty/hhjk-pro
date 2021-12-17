<!-- 河湖管理 -->
<template>
    <main style="height: calc(100% - 60px); ;">
        <div style="height: 60px; padding: 15px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
            <el-row style="text-align:left;margin-top: -6px;">
                <el-form :inline="true" :model="formInline" style="height: 35px">
                    <el-form-item label="河流名称:">
                        <el-input v-model="formInline.name" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item label="河湖类型:">
                        <el-select v-model="formInline.type" placeholder="请选择" style="width: 100%;">
                            <el-option v-for="item in rltypeOption" :key="item.doKey" :label="item.doValue" :value="item.doKey">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="getTableList" size="small">查询</el-button>
                        <el-button type="info" @click="reset" size="small" plain>重置</el-button>
                        <el-button type="success" @click="addNewRl" size="small">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-row>

        </div>
        <!-- 表格信息展示 -->
        <el-table :data="objectTableData" stripe style="width: 100%;font-size: 12px;text-align: center;">
            <el-table-column type='index' label="序号" width="80" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="name" label="河流名称" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="rltype" label="河湖类型" align="center" header-align="center">
            </el-table-column>
            <!-- <el-table-column prop="basinName" label="流域名称" width="120" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="length" label="河长 km" width="100" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="area" label="面积 k㎡" width="100" align="center" header-align="center">
            </el-table-column> -->
            <!-- <el-table-column prop="location" label="河湖所在地" width="100" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="lon" label="经度°" width="140" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="lat" label="纬度°" width="140" align="center" header-align="center">
            </el-table-column> -->
            <el-table-column fixed="right" label="操作" width="300" align="center" header-align="center">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" size="small" type="primary" plain>编辑</el-button>
                    <!-- <el-button @click="riverPic(scope.row)" size="small" type="primary" plain>水系图</el-button> -->
                    <el-button @click="delInfo(scope)" size="small" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页栏 -->
        <el-row type="flex" justify="end">
            <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentChange" :current-page="pagination.current"
                :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total" layout="prev,pager,next,jumper,total,sizes"></el-pagination>
        </el-row>
        <!-- 新增河湖对象 -->
        <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="dialogNewObject" width="50%" title="新增河湖对象信息">
            <el-row :gutter="15">
                <el-form ref="newForm" :model="newRlObject" size="medium">
                    <el-col :span="24">
                        <el-form-item label-width="180px" label="河湖类型：" prop="type" >
                            <el-select v-model="newRlObject.type" placeholder="请选择" style="width: 70%;">
                                <el-option v-for="item in rltypeOption" :key="item.doKey" :label="item.doValue" :value="item.doKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="24">
                        <el-form-item label-width="180px" label="行政区划：" prop="areaCode" style="width: 100%;">
                            <myDistPicker ref="distPick"></myDistPicker>
                        </el-form-item>
                    </el-col> -->
                    <!-- <el-col :span="8">
                        <el-form-item label-width="180px" label="河流编码：" prop="code">
                            <el-input v-model="newRlObject.code" clearable :style="{width: '100%'}"></el-input>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="24">
                        <el-form-item label-width="180px" label="河湖名称：" prop="name">
                            <el-input v-model="newRlObject.name" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="180px" label="流域名称：" prop="basinName">
                            <el-input v-model="newRlObject.basinName" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="8">
                        <el-form-item label-width="120px" label="水系名称：" prop="systemName">
                            <el-input v-model="newRlObject.systemName" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                    </el-col> -->

                    <el-col :span="24">
                        <el-form-item label-width="180px" label="河长/岸带长（m）：" prop="length">
                            <el-input v-model="newRlObject.length" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="newRlObject.type==2">
                        <el-form-item label-width="180px" label="面积 ㎡：" prop="area">
                            <el-input v-model="newRlObject.area" clearable style="width: 70%;">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="newRlObject.type==2">
                        <el-form-item label-width="180px" label="湖容积 m³：" prop="volume">
                            <el-input v-model="newRlObject.volume" clearable style="width: 70%;">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="8">
                        <el-form-item label-width="120px" label="基面名称：" prop="baseSurfaceName">
                            <el-input v-model="newRlObject.baseSurfaceName" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="基面高程 m：" prop="baseElevation">
                            <el-input v-model="newRlObject.baseElevation" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="基面修正值 m：" prop="baseCorrection">
                            <el-input v-model="newRlObject.baseCorrection" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                    </el-col> -->
                    <!-- <el-col :span="24">
                        <el-form-item label-width="180px" label="河湖所在地：" prop="location">
                            <el-input v-model="newRlObject.location" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col> -->
                    <!-- <el-col :span="8">
                        <el-form-item label-width="120px" label="经度°：" prop="lon">
                            <el-input v-model="newRlObject.lon" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label-width="120px" label="纬度°：" prop="lat">
                            <el-input v-model="newRlObject.lat" clearable :style="{width: '100%'}"></el-input>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="24">
                        <el-form-item label-width="180px" label="河湖简介：" prop="simpleDesc">
                            <el-input v-model="newRlObject.simpleDesc" clearable type="textarea" style="width: 70%;"
                                :autosize="{minRows: 2, maxRows: 2}"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <div slot="footer">
                <el-button type="primary" @click="submitNewInfo(newRlObject)">提交</el-button>
                <el-button @click="dialogNewObject = false">取消</el-button>
                
            </div>
        </el-dialog>
        <!-- 编辑河湖对象信息 -->
        <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="dialogEditObject" width="50%" @opened="setAreaCode" title="编辑河湖对象信息">
            <el-row :gutter="15">
                <el-form ref="elForm" :model="editInfoForm" size="medium">
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="河湖类型：" prop="type" >
                            <el-select v-model="editInfoForm.type" placeholder="请选择" style="width: 70%;" >
                                <el-option v-for="item in rltypeOption" :key="item.doKey" :label="item.doValue" :value="item.doKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="24">
                        <el-form-item label-width="160px" label="行政区划：" prop="areaCode">
                            <myDistPicker ref="distPick"></myDistPicker>
                        </el-form-item>
                    </el-col> -->
                    <!-- <el-col :span="24">
                        <el-form-item label-width="160px" label="河流编码：" prop="code">
                            <el-input v-model="editInfoForm.code" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="河湖名称：" prop="name">
                            <el-input v-model="editInfoForm.name" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="24">
                        <el-form-item label-width="160px" label="水系名称：" prop="systemName">
                            <el-input v-model="editInfoForm.systemName" clearable style="width: 70%;">
                            </el-input>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="流域名称：" prop="basinName">
                            <el-input v-model="editInfoForm.basinName" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="河长/岸带长（m）：" prop="length">
                            <el-input v-model="editInfoForm.length" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="editInfoForm.area">
                        <el-form-item label-width="160px" label="面积 ㎡：" prop="area">
                            <el-input v-model="editInfoForm.area" clearable style="width: 70%;">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="editInfoForm.volume">
                        <el-form-item label-width="180px" label="湖容积 m³：" prop="volume">
                            <el-input v-model="editInfoForm.volume" clearable style="width: 70%;">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="24">
                        <el-form-item label-width="160px" label="基面名称：" prop="baseSurfaceName">
                            <el-input v-model="editInfoForm.baseSurfaceName" clearable style="width: 70%;">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="基面高程 m：" prop="baseElevation">
                            <el-input v-model="editInfoForm.baseElevation" clearable style="width: 70%;">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="基面修正值 m：" prop="baseCorrection">
                            <el-input v-model="editInfoForm.baseCorrection" clearable style="width: 70%;">
                            </el-input>
                        </el-form-item> -->
                    <!-- </el-col> -->
                    <!-- <el-col :span="24">
                        <el-form-item label-width="160px" label="河湖所在地：" prop="location">
                            <el-input v-model="editInfoForm.location" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col> -->
                    <!-- <el-col :span="24">
                        <el-form-item label-width="160px" label="经度°：" prop="lon">
                            <el-input v-model="editInfoForm.lon" clearable style="width: 70%;">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="纬度°：" prop="lat">
                            <el-input v-model="editInfoForm.lat" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="24">
                        <el-form-item label-width="160px" label="河湖简介：" prop="simpleDesc">
                            <el-input v-model="editInfoForm.simpleDesc" clearable type="textarea" style="width: 70%;"
                                :autosize="{minRows: 2, maxRows: 2}"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <div slot="footer">
                <el-button @click="dialogEditObject = false">取消</el-button>
                <el-button type="primary" @click="submitEditInfo(editInfoForm)">提交</el-button>
            </div>
        </el-dialog>
        <!-- 河流水系图上传 -->
        <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="picFlag" width="30%" title="水系图上传" >
            <div style="padding:10px;text-align:center">
                <el-upload multiple action="" :before-upload="beforeUpload" list-type="picture-card" accept="image/*"
                    :http-request="upload" style="margin:20px">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
            <div >
                <el-button type="primary" @click="submitpicInfo">提交</el-button>
                <el-button @click="picFlag = false">取消</el-button>
        
            </div>
            <!-- </el-form-item> -->
            
        </el-dialog>

    </main>

</template>
<script>
    import { lake_river_info_query, rl_object_addInfo, rl_object_delInfo } from '@/api/rlObject/index'
    import { dict_search_domain } from '@/api/dict/index'
    import { uploadFileRequest } from '@/api/file/index'
    import myDistPicker from '@/components/myDistPicker'
    export default {
        name: 'riverLakeMangement',
        data() {
            return {
                formInline: {
                },
                dialogNewObject: false,
                objectTableData: [],
                newRlObject: {
                },
                dialogEditObject: false,
                editInfoForm: {},
                rltypeOption: [],
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                picFlag: false,
                fileUrl: '',
                rowdata: {},
            }
        },
        components: {
            myDistPicker
        },
        created() {

            this.typeDictSearch()
            this.getTableList()
        },
        methods: {
            //河湖类型字典信息查询
            typeDictSearch() {
                let domian = 'rlType'
                dict_search_domain(domian)
                    .then(response => {
                        this.rltypeOption = response.data.data
                    }).catch(() => {
                        console.log(err)
                    })
            },

            //查询
            getTableList() {
                let params = {
                    pageSize: this.pagination.pageSize,
                    pageNum: this.pagination.current,
                    type: this.formInline.type,
                    name: this.formInline.name

                }
                lake_river_info_query(params)
                    .then(res => {
                        this.pagination.total = res.data.data.total
                        res.data.data.list.forEach(item => {
                            this.rltypeOption.forEach(rl => {
                                if (item.type == rl.doKey) {
                                    item.rltype = rl.doValue
                                }
                            })
                        })
                        this.objectTableData = res.data.data.list
                    })

            },
            //重置功能
            reset() {
                this.formInline = {}
                this.getTableList()
            },
            //新增河湖对象
            addNewRl() {
                this.dialogNewObject = true
                this.newRlObject = {}
            },
            getAreaCode() {//获取地区code信息
                if (this.$refs.distPick.region.area === "" || this.$refs.distPick.region.area === undefined) {
                    this.$message("请选择市/区级行政！")
                } else {
                    return this.$refs.distPick.region.area
                }
            },
            //新增河湖对象信息提交
            submitNewInfo(info) {
                this.newRlObject.areaCode = this.getAreaCode()
                rl_object_addInfo(this.newRlObject)
                    .then(() => {
                        this.$message({
                            message: "新增河湖对象信息成功！",
                            type: 'success'
                        })
                        this.dialogNewObject = false
                        this.newRlObject = {}
                        this.getTableList()

                    }).catch((err) => {
                        console.log(err)
                    })


            },
            //编辑河湖对象信息
            edit(info) {
                this.dialogEditObject = true
                this.editInfoForm = JSON.parse(JSON.stringify(info))
            },
            //编辑河湖对象信息提交
            submitEditInfo(info) {
                this.editInfoForm.areaCode = this.getAreaCode()
                // console.log(this.editInfoForm)
                rl_object_addInfo(this.editInfoForm)
                    .then(() => {
                        this.$message({
                            message: "编辑河湖对象信息成功！",
                            type: 'success'
                        })
                        this.dialogEditObject = false
                        this.getTableList()
                    }).catch((err) => {
                        console.log(err)
                    })


            },
            // 水系图上传
            riverPic(info) {
                this.picFlag = true
                this.rowdata = info
            },
            // 图片上传前验证
            beforeUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 50
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 50MB!')
                }
                return isLt2M
            },
            // 
            upload(file) {
                const loading = this.$loading({
                    lock: true,
                    text: "文件上传中...",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)",
                });
                this.fileUrl = ''
                var form = new FormData();
                form.append("file", file.file);
                console.log(form)
                uploadFileRequest(form)
                    .then((res) => {
                        loading.close();
                        this.fileUrl = res.data.data.url
                        this.$message("上传成功！")
                    })
                    .catch(err => {
                        loading.close()
                        console.log(err)
                        this.$message("上传失败！")
                    })
            },
            submitpicInfo() {
                if (!this.fileUrl) {
                    return this.$message("请上传水系图！")
                } else {
                    this.rowdata.waterSystemMap = this.fileUrl
                    console.log(this.rowdata);
                    rl_object_addInfo(this.rowdata)
                        .then(res => {
                            this.$message("提交成功！")
                            this.picFlag = false
                            this.getTableList()
                        }).catch(err => {
                            console.log(err);
                            this.$message("提交失败！")
                        })
                }


            },
            //河湖对象信息删除
            delInfo(scope) {
                this.$confirm('确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    rl_object_delInfo(scope.row.id)
                        .then(() => {
                            this.$message({
                                message: "删除成功",
                                type: 'success'
                            })
                            this.getTableList()
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
                this.getTableList();
            },
            //分页时切换页
            handleCurrentChange(val) {
                this.pagination.current = val;
                this.getTableList();
            },
            //根据传值反显
            setAreaCode() {
                this.$refs.distPick.setAreaCode(this.editInfoForm.areaCode);
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