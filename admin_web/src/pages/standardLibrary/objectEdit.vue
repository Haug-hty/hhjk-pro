<!-- 体系指标内容编辑 -->

<template>
    <main>
        <el-card>
            <el-form :inline="true" :model="formInline" style="height: 35px;text-align: left;margin-top: -10px;">
                <el-form-item label="规范名称:" :label-width="formLabelWidth">
                    <el-select v-model="formInline.guidelinesId" filterable remote reserve-keyword placeholder="请输入关键词"
                        :remote-method="remoteMethod" :loading="loading" :style="{width: '100%'}">
                        <el-option v-for="item in guidelinesOptions" :key="item.value" :label="item.value" :value="item.data">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="河湖类型:" :label-width="formLabelWidth">
                    <el-select v-model="formInline.rlType" placeholder="请选择" :style="{width: '80%'}">
                        <el-option v-for="item in typeOptions" :key="item.doValue" :label="item.doValue" :value="item.doKey">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="success" @click="getTabledata" size="small">查询</el-button>
                    <el-button type="success" @click="addNewObject" size="small">新增指标体系河湖对象信息</el-button>
                    <el-button type="info" @click="importData" size="small">数据导入</el-button>
                </el-form-item>
                <div style="text-align: left;">

                </div>
            </el-form>
        </el-card>
        <div class="bodyPage">
            <table id="tablePage">

            </table>



        </div>
        <!-- 新增节点 -->
        <el-dialog append-to-body :visible.sync="dialogAddTypeFlag" width='50%'>
            <el-row :gutter="15">

                <el-form :model="newObjectForm" ref="newObjectForm">
                    <el-col :span='24' v-if="parentName">
                        <el-form-item label="父级名称:" :label-width="formLabelWidth">
                            <el-input v-model="parentName" placeholder="" disabled readonly :style="{width: '80%'}">
                            </el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span='24'>
                        <el-form-item label="名称:" :label-width="formLabelWidth" prop="name" required>
                            <el-input v-model="newObjectForm.name" placeholder="请输入对象名称" :style="{width: '80%'}">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label="权重:" :label-width="formLabelWidth" prop='weight' required>
                            <el-input v-model="newObjectForm.weight" placeholder="请输入对象权重,'-'或者没有请输入1" :style="{width: '80%'}">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label="编号:" :label-width="formLabelWidth" prop='code'>
                            <el-input v-model="newObjectForm.code" placeholder="请输入对象编号" :style="{width: '80%'}">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label="是否必选:" :label-width="formLabelWidth" prop='weight'>
                            <el-radio-group v-model="newObjectForm.choice" size="medium">
                                <el-radio v-for="(item, index) in choiceOptions" :key="index" :label="item.value">
                                    {{item.label}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>


                </el-form>

            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddTypeFlag = false">取 消</el-button>
                <el-button type="primary" @click="addSubmit">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 编辑 -->
        <el-dialog append-to-body :visible.sync="dialogEditTypeFlag" width='50%'>
            <el-row :gutter="15">

                <el-form :model="editObjectForm" ref="editObjectForm">
                    <el-col :span='24'>
                        <el-form-item label="名称:" :label-width="formLabelWidth" prop="name" required>
                            <el-input v-model="editObjectForm.name" placeholder="请输入对象名称" :style="{width: '80%'}">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label="权重:" :label-width="formLabelWidth" prop='weight' required>
                            <el-input v-model="editObjectForm.weight" placeholder="请输入对象权重,'-'或者没有请输入1" :style="{width: '80%'}">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label="编号:" :label-width="formLabelWidth" prop='code'>
                            <el-input v-model="editObjectForm.code" placeholder="请输入对象编号" :style="{width: '80%'}">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label="是否必选:" :label-width="formLabelWidth" prop='weight'>
                            <el-radio-group v-model="editObjectForm.choice" size="medium">
                                <el-radio v-for="(item, index) in choiceOptions" :key="index" :label="item.value">
                                    {{item.label}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>


                </el-form>

            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditTypeFlag = false">取 消</el-button>
                <el-button type="primary" @click="editSubmit">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 新增河湖对象第一层 -->
        <el-dialog append-to-body :visible.sync="dialogAddFirstTypeFlag" width='50%' :rules="rules">
            <el-row :gutter="15">

                <el-form :model="newObjectForm">
                    <el-col :span='24'>
                        <el-form-item label="河湖类型:" :label-width="formLabelWidth" prop='rlType' required>
                            <el-select v-model="newObjectForm.rlType" placeholder="请选择" :style="{width: '80%'}">
                                <el-option v-for="item in typeOptions" :key="item.doValue" :label="item.doValue" :value="item.doKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>



                </el-form>

            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddFirstTypeFlag = false">取 消</el-button>
                <el-button type="primary" @click="addFirstSubmit">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 数据导入 -->
        <el-dialog append-to-body :visible.sync="dialogImportData" width='50%'>
            <el-row :gutter="15">
                <el-form :model="importDataForm">
                    <el-col :span='24'>
                        <el-form-item label="河湖类型:" :label-width="formLabelWidth" prop='rlType' required>
                            <el-select v-model="importDataForm.rlType" placeholder="请选择" :style="{width: '80%'}">
                                <el-option v-for="item in typeOptions" :key="item.doValue" :label="item.doValue" :value="item.doKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-upload class="upload-demo" list-type="text" ref="upload" action="''" :auto-upload="false"
                        :limit="1">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>

                </el-form>


            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogImportData = false">取 消</el-button>
                <el-button type="primary" @click="importDataSubmit">确 定</el-button>
            </div>
        </el-dialog>

    </main>

</template>

<script>
    import "../js/jquery-1.9.1.js"
    import {
        guidelines_otions_select, target_newInfo_submit, target_tableList_search, import_data_submit,
        search_tree_type_guidelinesTarget, search_list_type_guidelinesTarget, target_info_del, target_byGuidelineId, getTargetInfo
    } from '@/api/standard/index'
    import { dict_search_domain } from "@/api/dict/index"
    export default {
        name: 'objectEdit',
        data() {
            return {
                formInline: {
                    guidelinesId: '',
                    rlType: ''
                },

                dialogAddTypeFlag: false,//新增河湖对象控制器
                dialogAddFirstTypeFlag: false,
                newObjectForm: {
                },
                editObjectForm: {},
                dialogEditTypeFlag: false,
                guidelinesOptions: [],
                guidelinesName: '',
                loading: false,
                formLabelWidth: '120px',
                parentName: '',
                typeOptions: [],
                rules: [],
                dialogImportData: false,
                importDataForm: {},
                data: [],
                strHtml: '',
                strHtmlTotal: '',
                dialogAddTypeFlag: false,
                newObjectForm: {},
                parentName: '',
                parentId: '',
                formLabelWidth: "140px",
                rlType: '',
                guidelinesId: '',
                choiceOptions: [{
                    "label": "是",
                    "value": true
                }, {
                    "label": "否",
                    "value": false
                }],
            }
        },
        created() {
            this.rlTypeDictSearch()
        },
        mounted() {
            const _this = this
        },
        methods: {
            //河湖类型字典信息查询
            rlTypeDictSearch() {
                let domian = 'rlType'
                dict_search_domain(domian)
                    .then(response => {
                        this.typeOptions = response.data.data
                        console.log('--', this.typeOptions)
                    }).catch(() => {
                        console.log(err)
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



            //河湖对象新增
            addNewObject() {
                if (!this.guidelinesName) {
                    return this.$message("请先选择一个指标体系进行新增操作！")
                } else {
                    this.newObjectForm = {}
                    this.dialogAddFirstTypeFlag = true
                    this.newObjectForm.guidelinesId = this.formInline.guidelinesId
                    this.newObjectForm.parentId = 0
                }
            },
            addFirstSubmit() {
                let params = this.newObjectForm
                this.typeOptions.forEach(item => {
                    if (item.doKey == this.newObjectForm.rlType) {
                        params.name = item.doValue + '健康'
                    }
                })
                target_newInfo_submit(params)
                    .then(() => {
                        this.$message({
                            type: 'success',
                            message: '新增成功'
                        })
                        this.dialogAddFirstTypeFlag = false
                    }).catch(() => {
                        this.$message({
                            type: 'error',
                            message: '新增失败'
                        })
                    })
            },
            // -------------------------------数据导入功能开始
            importData() {
                if (!this.guidelinesName) {
                    return this.$message("请先选择一个指标体系进行数据导入操作！")
                } else {
                    this.dialogImportData = true
                    this.importDataForm = {}
                    this.importDataForm.guidelinesId = this.formInline.guidelinesId
                }

            },
            importDataSubmit() {
                console.log(this.importDataForm)
                console.log(this.$refs.upload.$refs["upload-inner"].fileList[0].raw)
                var form = new FormData();
                form.append("file", this.$refs.upload.$refs["upload-inner"].fileList[0].raw);
                import_data_submit(this.importDataForm.guidelinesId, this.importDataForm.rlType, form)
                    .then(res => {
                        this.$message("上传成功！")
                        this.dialogImportData = false
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // -------------------------------数据导入功能结束

            getTabledata() {
                if (!this.formInline.guidelinesId) {
                    return this.$message("请选择一种指标")
                } else if (!this.formInline.rlType) {
                    return this.$message("请选择一种河湖类型")
                } else {
                    target_byGuidelineId(this.formInline.guidelinesId, false)
                        .then(res => {
                            var guidelineTargetId = null
                            res.data.data.forEach(item => {
                                if (item.rlType == this.formInline.rlType) {
                                    guidelineTargetId = item.id
                                }
                            })
                            if (guidelineTargetId) {
                                document.querySelector("#tablePage").style.visibility="visible"
                                search_list_type_guidelinesTarget(guidelineTargetId)
                                    .then(res => {
                                        this.data = res.data.data
                                        this.bindRiverHealthInfo()
                                    })
                            } else {
                                this.$message("该指标没有此类型河湖对象的指标体系信息，请优先录入指标体系河湖对象信息！")
                                document.querySelector("#tablePage").style.visibility="hidden"
                            }
                        })
                }

            },

            initdata(parentID) {
                var arrObj = [];
                if (parentID == null) {
                    for (var i = 0; i < this.data.length; i++) {
                        // if (1 == this.data[i].guidelinesId && 1 == this.data[i].layerDepth && 2 == this.data[i].rlType) {
                        if (1 == this.data[i].layerDepth) {

                            //if (this.data[i].layer_depth > layer_depth) {
                            //    layer_depth = this.data[i].layer_depth;
                            //}
                            var childrenCount = 0;
                            var result = this.initdata(this.data[i].id);
                            for (var j = 0; j < result.length; j++) {
                                if (result[j].childrenCount == 0) {
                                    childrenCount++;
                                } else {
                                    childrenCount += result[j].childrenCount;
                                }
                            }
                            arrObj.push(
                                {
                                    id: this.data[i].id,
                                    category: this.data[i].category,
                                    choice: this.data[i].choice,
                                    code: this.data[i].code,
                                    evaluateScoreSelf: this.data[i].evaluateScoreSelf,
                                    guidelinesId: this.data[i].guidelinesId,
                                    layerDepth: this.data[i].layerDepth,
                                    name: this.data[i].name,
                                    parentId: this.data[i].parentId,
                                    rlType: this.data[i].rlType,
                                    superParentId: this.data[i].superParentId,
                                    weight: this.data[i].weight,
                                    weightFinal: this.data[i].weightFinal,
                                    children: result,
                                    childrenCount: childrenCount
                                }
                            );
                        }

                    }
                } else {
                    for (var i = 0; i < this.data.length; i++) {
                        if (this.data[i].parentId == parentID) {
                            //if (this.data[i].layer_depth > layer_depth) {
                            //    layer_depth = this.data[i].layer_depth;
                            //}
                            var childrenCount = 0;
                            var result = this.initdata(this.data[i].id);
                            for (var j = 0; j < result.length; j++) {
                                if (result[j].childrenCount == 0) {
                                    childrenCount++;
                                } else {
                                    childrenCount += result[j].childrenCount;
                                }
                            }
                            //count += childrenCount;
                            arrObj.push(
                                {
                                    id: this.data[i].id,
                                    category: this.data[i].category,
                                    choice: this.data[i].choice,
                                    code: this.data[i].code,
                                    evaluateScoreSelf: this.data[i].evaluateScoreSelf,
                                    guidelinesId: this.data[i].guidelinesId,
                                    layerDepth: this.data[i].layerDepth,
                                    name: this.data[i].name,
                                    parentId: this.data[i].parentId,
                                    rlType: this.data[i].rlType,
                                    superParentId: this.data[i].superParentId,
                                    weight: this.data[i].weight,
                                    weightFinal: this.data[i].weightFinal,
                                    children: result,
                                    childrenCount: childrenCount
                                }
                            );
                        }
                    }
                }
                return arrObj;
            },
            GetChild(arr) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].childrenCount == 0) {
                        if (this.strHtml == '') {
                            this.strHtml += '<tr><td>' + arr[i].name + '(' + arr[i].code + ')' + '<span class="edit" pointid="' + arr[i].id + '"  ></span><span class="add" pointid="' + arr[i].id + '"  ></span><span class="delete" pointid="' + arr[i].id + '"></span></td></tr>';
                            this.strHtmlTotal += this.strHtml;
                            this.strHtml = '';
                        } else {
                            this.strHtml += '<td>' + arr[i].name + '(' + arr[i].code + ')' + '<span class="edit" pointid="' + arr[i].id + '"  ></span><span class="add" pointid="' + arr[i].id + '"  ></span><span class="delete" pointid="' + arr[i].id + '"></span></td></tr>';
                            this.strHtmlTotal += this.strHtml;
                            this.strHtml = '';
                        }
                    } else if (arr[i].childrenCount == 1) {
                        if (this.strHtml == '') {
                            this.strHtml += '<tr><td>' + arr[i].name + '(' + arr[i].code + ')' + '<span class="edit" pointid="' + arr[i].id + '"  ></span><span class="add" pointid="' + arr[i].id + '"  ></span><span class="delete" pointid="' + arr[i].id + '"></span></td>';
                        } else {
                            this.strHtml += '<td>' + arr[i].name + '(' + arr[i].code + ')' + '<span class="edit" pointid="' + arr[i].id + '"  ></span><span class="add" pointid="' + arr[i].id + '"  ></span><span class="delete" pointid="' + arr[i].id + '"></span></td>';
                        }
                        this.GetChild(arr[i].children);
                    } else {
                        if (this.strHtml == '') {
                            this.strHtml += '<tr><td rowspan="' + arr[i].childrenCount + '">' + arr[i].name + '(' + arr[i].code + ')' + '<span class="edit" pointid="' + arr[i].id + '"  ></span><span class="add" pointid="' + arr[i].id + '"  ></span><span class="delete" pointid="' + arr[i].id + '"></span></td>';
                        } else {
                            this.strHtml += '<td rowspan="' + arr[i].childrenCount + '">' + arr[i].name + '(' + arr[i].code + ')' + '<span class="edit" pointid="' + arr[i].id + '"  ></span><span class="add" pointid="' + arr[i].id + '"  ></span><span class="delete" pointid="' + arr[i].id + '"></span></td>';
                        }
                        this.GetChild(arr[i].children);
                    }
                }
            },
            bindRiverHealthInfo() {
                const _this = this
                var result = this.initdata(null);

                this.strHtml = '';
                this.strHtmlTotal = '';
                for (var i = 0; i < result.length; i++) {
                    if (result[i].childrenCount == 0 && result.length == 1) {
                        this.strHtml += '<tr><td>' + result[i].name + '(' + result[i].code + ')' + '<span class="edit" pointid="' + result[i].id + '"  ></span><span class="add" pointid="' + result[i].id + '"  ></span><span class="delete" pointid="' + result[i].id + '"></span></td></tr>';
                        this.strHtmlTotal += this.strHtml
                    } else if (result[i].childrenCount == 0) {
                        this.strHtml += '<tr><td>' + result[i].name + '(' + result[i].code + ')' + '<span class="edit" pointid="' + result[i].id + '"  ></span><span class="add" pointid="' + result[i].id + '"  ></span><span class="delete" pointid="' + result[i].id + '"></span></td></tr>';
                    }
                    else {
                        this.strHtml += '<tr><td rowspan="' + result[i].childrenCount + '">' + result[i].name + '(' + result[i].code + ')' + '<span class="edit" pointid="' + result[i].id + '"  ></span><span class="add" pointid="' + result[i].id + '"  ></span><span class="delete" pointid="' + result[i].id + '"></span></td>';
                        this.GetChild(result[i].children);
                    }
                }
                // $("#dataTable").html(this.strHtmlTotal);
                document.getElementById('tablePage').innerHTML = this.strHtmlTotal
                $(".add").click(function () {
                    var pointid = $(this).attr("pointid");
                    _this.addNewTarget(pointid)
                });
                $(".delete").click(function () {
                    var pointid = $(this).attr("pointid");
                    _this.delTarget(pointid)
                });
                $(".edit").click(function () {
                    var pointid = $(this).attr("pointid");
                    _this.editTarget(pointid)
                });


            },
            addNewTarget(info) {
                this.newObjectForm = {}
                this.data.forEach(item => {
                    if (item.id == info) {
                        this.parentName = item.name
                        this.rlType = item.rlType
                        this.guidelinesId = item.guidelinesId
                    }

                });
                this.parentId = info
                this.newObjectForm.choice = true
                this.dialogAddTypeFlag = true
            },
            editTarget(info) {
                this.dialogEditTypeFlag = true
                getTargetInfo(info)
                    .then(res => {
                        this.editObjectForm = res.data.data
                    })

            },
            editSubmit(){
                target_newInfo_submit(this.editObjectForm)
                        .then(() => {
                            this.$message({
                                type: 'success',
                                message: '编辑成功'
                            })
                            this.dialogEditTypeFlag = false
                            this.getTabledata()
                        }).catch(() => {
                            this.$message({
                                type: 'error',
                                message: '编辑失败'
                            })
                        })
            },
            delTarget(info) {
                this.$confirm('确定要删除该节点及其所有子节点吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    target_info_del(info)
                        .then(() => {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.getTabledata()
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
            //新增指标内容提交
            addSubmit() {
                this.$refs['newObjectForm'].validate(valid => {
                    if (!valid) return
                    let params = {
                        parentId: this.parentId,
                        rlType: this.rlType,
                        guidelinesId: this.guidelinesId
                    }
                    Object.assign(params, this.newObjectForm)

                    target_newInfo_submit(params)
                        .then(() => {
                            this.$message({
                                type: 'success',
                                message: '新增成功'
                            })
                            this.dialogAddTypeFlag = false
                            this.getTabledata()
                        }).catch(() => {
                            this.$message({
                                type: 'error',
                                message: '新增失败'
                            })
                        })
                })

            },

        },
        computed: {
            //计算指标选项中的值变化
            getGuidelinesId: function () {
                return this.formInline.guidelinesId
            }
        },
        watch: {
            //监听指标选项值变化，远程数据实时匹配查询
            getGuidelinesId: {
                handler: function () {
                    this.guidelinesOptions.forEach(item => {
                        if (item.data == this.getGuidelinesId) {
                            this.guidelinesName = item.value
                        }

                    });
                },
            },

        }
    }
</script>
<style>
    .bodyPage {
        /* position: fixed;
        height: 80vh;
        width: 87vw;
        overflow: auto; */
    }

    #tablePage {
        width: 100%;
        border: 1px, solid;

        border-collapse: collapse;
        border-spacing: 0;
    }

    #tablePage td {
        padding: 5px 10px;
        border: 1px solid #ddd;
    }

    .edit::before {
        content: '\270E';
        font-size: 20px;
        cursor: pointer;
    }

    .add:before {
        content: '\271A';
        font-size: 20px;
        cursor: pointer;
    }

    .delete:before {
        content: '\2716';
        font-size: 18px;
        cursor: pointer;
    }
</style>