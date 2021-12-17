<!-- 河湖管理 -->
<template>
    <main style="height: calc(100% - 60px); ;">
        <div style="height: 60px; padding: 15px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
            <el-row style="text-align:left;margin-top: -6px;">
                <el-form :inline="true" :model="formInline" style="height: 35px">
                    <el-form-item label="河流名称:">
                        <el-input v-model="formInline.name" placeholder="请输入名称" ></el-input>
                    </el-form-item>
                    <el-form-item label="河湖类型:">
                        <el-select v-model="formInline.type" placeholder="请选择" style="width: 100%;">
                            <el-option v-for="item in rltypeOption" :key="item.doKey" :label="item.doValue" :value="item.doKey"></el-option>
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
        <el-table :data="objectTableData" stripe :cell-style="cellStyle" style="width: 100%;font-size: 12px;text-align: center;" :header-cell-style="{background:'#eef1f6',color:'#606266',fontSize:'14px',borderBottom:'1px solid #000'}">
            <el-table-column type="index" label="序号" width="80" align="center" header-align="center"></el-table-column>
            <el-table-column prop="name" label="河流名称" align="center" header-align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="rltype" label="河湖类型" align="center" header-align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="300" align="center" header-align="center" >
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" size="small" type="text">编辑</el-button>
                    <el-button @click="reachAdd(scope.row)" size="small" type="text">
                        <div v-if="scope.row.type == 1">河段</div>
                        <div v-else>湖区</div>
                    </el-button>
                    <el-button v-if="scope.row.type==2" @click="outLetAdd(scope.row)" size="small" type="text">出入湖河流</el-button>
                    <!-- <el-button @click="riverPic(scope.row)" size="small" type="primary" plain>水系图</el-button> -->
                    <el-button @click="delInfo(scope)" size="small" type="text">删除</el-button>
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
                <el-form ref="newForm" :model="newRlObject" size="medium" :rules="newRlFormRules">
                    <el-col :span="24">
                        <el-form-item label-width="180px" label="河湖名称：" prop="rlCompleteInfoId">
                            <el-select v-model="newRlObject.rlCompleteInfoId" placeholder="请选择" style="width: 70%;" @change="getType()">
                                <el-option v-for="item in rlCompleteInfoOption" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="180px" label="评估对象：" prop="name">
                            <el-input v-model="newRlObject.name" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="180px" label="流域名称：" prop="basinName">
                            <el-input v-model="newRlObject.basinName" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label-width="180px" label="河长/岸带长 m：" prop="length">
                            <el-input type="number" v-model="newRlObject.length" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="newRlObject.type==2">
                        <el-form-item label-width="180px" label="面积 ㎡：" prop="area">
                            <el-input type="number" v-model="newRlObject.area" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="newRlObject.type==2">
                        <el-form-item label-width="180px" label="湖容积 m³：" prop="volume">
                            <el-input type="number" v-model="newRlObject.volume" clearable style="width: 70%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="24">
                        <el-form-item label-width="180px" label="河湖简介：" prop="simpleDesc">
                            <el-input v-model="newRlObject.simpleDesc" clearable type="textarea" style="width: 70%;"
                                :autosize="{minRows: 2, maxRows: 2}"></el-input>
                        </el-form-item>
                    </el-col> -->
                </el-form>
            </el-row>
            <div slot="footer">
                <el-button type="primary" @click="submitNewInfo(newRlObject)">提交</el-button>
                <el-button @click="cancel('newForm'),dialogNewObject = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 河流水系图上传 -->
        <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="picFlag" width="30%" title="水系图上传">
            <div style="padding:10px;text-align:center">
                <el-upload multiple action :before-upload="beforeUpload" list-type="picture-card" accept="image/*"
                    :http-request="upload" style="margin:20px">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
            <div>
                <el-button type="primary" @click="submitpicInfo">提交</el-button>
                <el-button @click="picFlag = false">取消</el-button>
            </div>
            <!-- </el-form-item> -->
        </el-dialog>

        <!-- 河段（湖区）信息新增/修改 -->
        <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="dialogAddReach" width="50%" :title="reachTitle">
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" >
                <div v-for="(domain, index) in dynamicValidateForm.reachInfoList" :key="domain.key">
                    <el-row style="margin-left:10px;" :gutter="15">
                        <div style="font-size:16px;font-weight:500;">{{index +1}}</div>
                        <el-col :span="20">
                            <el-form-item label="名称：" prop="name" label-width="150px" >
                                <el-input v-model="domain.name" style="width: 50%;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="20" v-if="dynamicValidateForm.type == 1">
                            <el-form-item label="河段长度：" prop="length" label-width="150px" >
                                <el-input v-model="domain.length" style="width: 50%;"></el-input>&nbsp;m
                            </el-form-item>
                        </el-col>
                        <el-col :span="20">
                            <el-form-item label="站点：" prop="markerSiteId" label-width="150px" >
                                <el-select v-model="domain.markerSiteIdList" placeholder clearable style="width: 80%;" multiple>
                                    <el-option v-for="item in siteListOption" :key="item.id" :label="item.siteName"
                                        :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="20" v-if="dynamicValidateForm.type == 2" >
                            <el-form-item label="湖区面积：" prop="area" label-width="150px" >
                                <el-input v-model="domain.area" style="width: 80%;"></el-input>&nbsp;㎡
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="8">
                            <el-form-item label="左岸名称：" prop="bankSlopeName1" label-width="150px">
                                <el-input v-model="domain.bankSlopeName1" style="width: 100%;"></el-input>
                            </el-form-item>
                        </el-col>-->
                        <el-col :span="12" v-if="dynamicValidateForm.type == 1">
                            <el-form-item label="左岸长度：" prop="bankSlopeLength1" label-width="150px" >
                                <el-input type="number" v-model="domain.bankSlopeLength1" style="width: 80%;"></el-input>&nbsp;m
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" v-if="dynamicValidateForm.type == 1">
                            <el-form-item label="左岸面积：" prop="bankSlopeArea1" label-width="150px" >
                                <el-input type="number" v-model="domain.bankSlopeArea1" style="width: 80%;"></el-input>&nbsp;㎡
                            </el-form-item>
                        </el-col>
                        <div v-if="dynamicValidateForm.type == 1">
                            <!-- <el-col :span="8">
                <el-form-item label="右岸名称：" prop="bankSlopeName2" label-width="150px">
                  <el-input v-model="domain.bankSlopeName2" style="width: 100%;"></el-input>
                </el-form-item>
              </el-col>-->
                            <el-col :span="12">
                                <el-form-item label="右岸长度：" prop="bankSlopeLength2" label-width="150px" >
                                    <el-input type="number" v-model="domain.bankSlopeLength2" style="width: 80%;"></el-input>&nbsp;m
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="右岸面积：" prop="bankSlopeArea2" label-width="150px" >
                                    <el-input type="number" v-model="domain.bankSlopeArea2" style="width: 80%;"></el-input>&nbsp;㎡
                                </el-form-item>
                            </el-col>
                        </div>
                        <el-col :span="20">
                            <el-form-item label="描述：" prop="reachDesc" label-width="150px">
                                <el-input type="textarea" v-model="domain.reachDesc" style="width: 100%;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">
                            <el-button v-if="index!=0" @click.prevent="removeDomain(domain)" type="danger">删除</el-button>
                        </el-col>
                    </el-row>
                    <hr>
                </div>
            </el-form>

            <div slot="footer">
                <el-button @click="addDomain" type="success">新增河段（湖区）信息</el-button>
                <el-button type="primary" @click="submitReachInfo(dynamicValidateForm)">提交</el-button>
                <el-button @click="dialogAddReach = false">取消</el-button>
            </div>
        </el-dialog>

        <!-- 入湖排口信息新增/修改 -->
        <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="dialogAddOutLet" width="50%" :title="outLetTitle">
            <el-form :model="outLetForm" ref="outLetForm">
                <div v-for="(domain, index) in outLetForm.outLetInfoList" :key="domain.key">
                        <el-row style="margin-left:10px;">
                            <div>{{index + 1}}</div>
                    <el-col :span="20">
                            <el-form-item label-width="30%" label="是否出口：" prop="enter">
                                <el-select v-model="domain.enter" placeholder="请选择" style="width: 60%;">
                                    <el-option v-for="item in enterOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    <el-col :span="20">
                        <el-form-item label-width="30%" label="河流名称：" prop="siteName">
                            <el-input v-model="domain.riverName" clearable style="width:60%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="20">
                        <el-form-item label-width="30%" label="经度°：" prop="lon">
                            <el-input v-model="domain.lon" clearable style="width: 60%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="20">
                        <el-form-item label-width="30%" label="纬度°：" prop="lat">
                            <el-input v-model="domain.lat" clearable style="width: 60%;"></el-input>
                        </el-form-item>
                    </el-col>
                    
                    <el-col :span="20">
                        <el-form-item label-width="30%" label="是否存在饮用水水源地：" prop="drinkingSource">
                            <el-select v-model="domain.drinkingSource" placeholder="请选择" style="width: 60%;">
                                <el-option v-for="item in enterOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                        <el-col :span="2">
                            <el-button v-if="index!=0" @click.prevent="removeDomainOutLet(domain)" type="danger">删除</el-button>
                        </el-col>
                        </el-row>
                    <hr>
                </div>
            </el-form>

            <div slot="footer">
                <el-button @click="addDomainOutLet" type="success">新增入湖排口</el-button>
                <el-button type="primary" @click="submitOutLetInfo(outLetForm)">提交</el-button>
                <el-button @click="dialogAddOutLet = false">取消</el-button>
            </div>
        </el-dialog>
    </main>
</template>
<script>
    import {
        lake_river_info_query,
        rl_object_addInfo,
        rl_object_delInfo,
        site_info_query,
        reach_info_query,
        reach_delInfo,
        outLet_info_query,
        site_delInfo,
        outLetInfoAddBatch,
        reachInfoAddBatch,
        rl_complete_info_query,
    } from "@/api/rlObject/index";
    import { dict_search_domain } from "@/api/dict/index";
    import { uploadFileRequest } from "@/api/file/index";
    import myDistPicker from "@/components/myDistPicker";
    export default {
        name: "riverLakeMangement",
        data() {
            return {
                formInline: {},
                dialogNewObject: false,
                objectTableData: [],
                newRlObject: {},
                dialogEditObject: false,
                editInfoForm: {},
                rltypeOption: [],
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                picFlag: false,
                fileUrl: "",
                rowdata: {},
                dialogAddReach: false,
                dynamicValidateForm: {
                    type: null,
                    rlInfoId: null,
                    reachInfoList: [
                        {
                            rlInfoId: null,
                            bankSlopeName1: "左岸",
                            bankSlopeName2: "右岸"
                        }
                    ]
                },
                siteListOption: [],
                reachTitle: "",

                dialogAddOutLet: false,
                outLetForm: {
                    rlInfoId: null,
                    outLetInfoList: [
                        {
                            rlInfoId: null
                        }
                    ]
                },
                outLetTitle:'',
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
                rlCompleteInfoOption:[],
                newRlFormRules: {
                    rlCompleteInfoId: [
                        { required: true, trigger: "blur", message: "评估对象不能为空" }
                    ],
                    name: [
                        { required: true, trigger: "blur", message: "河湖名称不能为空" }
                    ],
                    length: [
                        { required: true, trigger: "blur", message: "河长/岸带长不能为空" }
                    ],
                    area: [
                        { required: true, trigger: "blur", message: "湖面积不能为空" }
                    ],
                    volume: [
                        { required: true, trigger: "blur", message: "湖容积不能为空" }
                    ],
                }
            };
        },
        components: {
            myDistPicker
        },
        created() {
            this.getRlComList()
            this.typeDictSearch();
            
        },
        methods: {
            /** 对象类型列项内容样式填充 */
            cellStyle(data) {                
                if (data.columnIndex == 2) {
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
            //河湖类型字典信息查询
            typeDictSearch() {
                let domian = "rlType";
                dict_search_domain(domian)
                    .then(response => {
                        this.rltypeOption = response.data.data;
                        // console.log(1)
                        this.getTableList();
                    })
                    .catch(() => {
                        console.log(err);
                    });
            },

            /** 表单校验重置 */
            cancel(formName){
                this.$refs[formName].clearValidate()
            },

            /** /列表信息查询*/
            getRlComList() {
                let params = {
                    pageSize: 100,
                    pageNum: 1
                }
                rl_complete_info_query(params)
                    .then(res => {
                        this.rlCompleteInfoOption = res.data.data.list
                    })

            },
            //查询
            getTableList() {
                let params = {
                    pageSize: this.pagination.pageSize,
                    pageNum: this.pagination.current,
                    type: this.formInline.type,
                    name: this.formInline.name
                };
                lake_river_info_query(params).then(res => {
                    this.pagination.total = res.data.data.total;
                    // this.objectTableData = res.data.data.list;

                    res.data.data.list.forEach(item => {
                        this.rltypeOption.forEach(rl => {
                            if (item.type == rl.doKey) {
                                item.rltype = rl.doValue;
                                // console.log(2)
                            }
                        });
                    });
                    
                    this.objectTableData = res.data.data.list;
                    // console.log(this.objectTableData)
                });
            },
            //重置功能
            reset() {
                this.formInline = {};
                this.getTableList();
            },
            //新增河湖对象
            addNewRl() {
                this.dialogNewObject = true;
                this.newRlObject = {};
            },
            getType(){
                this.rlCompleteInfoOption.forEach(item=>{
                    if(item.id === this.newRlObject.rlCompleteInfoId){
                        this.newRlObject.type =item.type
                        this.newRlObject.name = item.name
                    }
                })
            },
            // getAreaCode() {
            //     //获取地区code信息
            //     if (
            //         this.$refs.distPick.region.area === "" ||
            //         this.$refs.distPick.region.area === undefined
            //     ) {
            //         this.$message("请选择市/区级行政！");
            //     } else {
            //         return this.$refs.distPick.region.area;
            //     }
            // },
            //新增河湖对象信息提交
            submitNewInfo(info) {
                this.$refs.newForm.validate(valid => {
                    if (valid) {
                        // this.newRlObject.areaCode = this.getAreaCode();
                rl_object_addInfo(this.newRlObject)
                    .then(() => {
                        this.$message({
                            message: "编辑河湖对象信息成功！",
                            type: "success"
                        });
                        this.dialogNewObject = false;
                        this.newRlObject = {};
                        this.getTableList();
                    })
                    .catch(err => {
                        console.log(err);
                    });

                    }
                    })
                
            },
            //编辑河湖对象信息
            edit(info) {
                this.dialogNewObject = true;
                this.newRlObject = JSON.parse(JSON.stringify(info));
            },
            // 水系图上传
            riverPic(info) {
                this.picFlag = true;
                this.rowdata = info;
            },
            // 图片上传前验证
            beforeUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 50;
                if (!isLt2M) {
                    this.$message.error("上传文件大小不能超过 50MB!");
                }
                return isLt2M;
            },
            //
            upload(file) {
                const loading = this.$loading({
                    lock: true,
                    text: "文件上传中...",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)"
                });
                this.fileUrl = "";
                var form = new FormData();
                form.append("file", file.file);
                console.log(form);
                uploadFileRequest(form)
                    .then(res => {
                        loading.close();
                        this.fileUrl = res.data.data.url;
                        this.$message("上传成功！");
                    })
                    .catch(err => {
                        loading.close();
                        console.log(err);
                        this.$message("上传失败！");
                    });
            },
            submitpicInfo() {
                if (!this.fileUrl) {
                    return this.$message("请上传水系图！");
                } else {
                    this.rowdata.waterSystemMap = this.fileUrl;
                    console.log(this.rowdata);
                    rl_object_addInfo(this.rowdata)
                        .then(res => {
                            this.$message("提交成功！");
                            this.picFlag = false;
                            this.getTableList();
                        })
                        .catch(err => {
                            console.log(err);
                            this.$message("提交失败！");
                        });
                }
            },
            //河湖对象信息删除
            delInfo(scope) {
                this.$confirm("确定要删除吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        rl_object_delInfo(scope.row.id).then(() => {
                            this.$message({
                                message: "删除成功",
                                type: "success"
                            });
                            this.getTableList();
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
                this.getTableList();
            },
            //分页时切换页
            handleCurrentChange(val) {
                this.pagination.current = val;
                this.getTableList();
            },
            //根据传值反显
            setAreaCode() {
                // this.$refs.distPick.setAreaCode(this.editInfoForm.areaCode);
            },
            /** 添加河段、湖区信息 */
            reachAdd(info) {
                this.getSiteInfo(info.id);
                this.dynamicValidateForm.type = info.type;
                this.dynamicValidateForm.rlInfoId = info.id;
                if (info.type == 1) {
                    this.reachTitle = info.name + "--河段信息";
                    this.dynamicValidateForm.reachInfoList = [
                        {
                            rlInfoId: this.dynamicValidateForm.rlInfoId,
                            bankSlopeName1: "左岸",
                            bankSlopeName2: "右岸"
                        }
                    ];
                } else {
                    this.reachTitle = info.name + "--湖区信息";
                    this.dynamicValidateForm.reachInfoList = [
                        {
                            rlInfoId: this.dynamicValidateForm.rlInfoId,
                            bankSlopeName1: "左岸"
                        }
                    ];
                }
                this.getHaveReach(info.id);
                this.dialogAddReach = true;
            },
            /** 新增指标赋分项*/
            addDomain() {
                if (this.dynamicValidateForm.type == 1) {
                    this.dynamicValidateForm.reachInfoList.push({
                        rlInfoId: this.dynamicValidateForm.rlInfoId,
                        bankSlopeName1: "左岸",
                        bankSlopeName2: "右岸",
                        key: Date.now()
                    });
                } else {
                    this.dynamicValidateForm.reachInfoList.push({
                        rlInfoId: this.dynamicValidateForm.rlInfoId,
                        bankSlopeName1: "左岸",
                        key: Date.now()
                    });
                }
            },
            /** /删除指标赋分项*/
            removeDomain(item) {
                console.log("remove", item);
                if (item.id) {
                    this.$confirm("确定要删除吗?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                        .then(() => {
                            reach_delInfo(item.id).then(() => {
                                this.$message({
                                    message: "删除成功",
                                    type: "success"
                                });
                                let index = this.dynamicValidateForm.reachInfoList.indexOf(item);
                                if (index !== -1) {
                                    this.dynamicValidateForm.reachInfoList.splice(index, 1);
                                }
                            });
                        })
                        .catch(() => {
                            this.$message({
                                type: "warning",
                                message: "已取消删除"
                            });
                        });
                } else {
                    let index = this.dynamicValidateForm.reachInfoList.indexOf(item);
                    if (index !== -1) {
                        this.dynamicValidateForm.reachInfoList.splice(index, 1);
                    }
                }
            },
            /** 获取对象监测点信息 */
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
            /** 获取对象现有湖区河段信息 */
            getHaveReach(info) {
                let params = {
                    rlInfoId: info,
                    pageSize: 100,
                    pageNum: 1
                };
                reach_info_query(params).then(res => {
                    console.log(res.data.data.list);
                    if (res.data.data.list.length > 0) {
                        res.data.data.list.forEach(item=>{
                            if(item.markerSiteId){
                                item.markerSiteIdList = []
                                let arr = item.markerSiteId.split(",")
                                arr.forEach(it => {  
                                    item.markerSiteIdList.push(+it);  
                                }); 
                            }                            
                        })
                        
                        this.dynamicValidateForm.reachInfoList = res.data.data.list;
                        
                    }
                });
            },
            /** 河湖信息提交 */
            submitReachInfo(info) {
                // console.log('111',info);
                for(let i=0;i<info.reachInfoList.length;i++){
                    let arr = ""
                    if(info.reachInfoList[i].markerSiteIdList){
                        arr = info.reachInfoList[i].markerSiteIdList.join()
                        info.reachInfoList[i].markerSiteId = arr
                    }                    
                }
                reachInfoAddBatch(info.reachInfoList).then(res => {
                    this.$message(this.reachTitle + "编辑成功！");
                    this.dialogAddReach = false;
                });
            },

            /** 添加入湖排口信息 */
            outLetAdd(info) {
                this.outLetForm.rlInfoId = info.id;
                this.outLetTitle = info.name + "--入湖排口";
                this.outLetForm.outLetInfoList = [{
                    rlInfoId:info.id
                }]
                this.getHaveOutLet(info.id)
                this.dialogAddOutLet = true;
            },
            /** 新增入湖排口*/
            addDomainOutLet() {
                this.outLetForm.outLetInfoList.push({
                        rlInfoId: this.outLetForm.rlInfoId,
                        key: Date.now()
                    });
                
            },
            /** /删除入湖排口*/
            removeDomainOutLet(item) {
                if (item.id) {
                    this.$confirm("确定要删除吗?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                        .then(() => {
                            site_delInfo(item.id).then(() => {
                                this.$message({
                                    message: "删除成功",
                                    type: "success"
                                });
                                let index = this.outLetForm.outLetInfoList.indexOf(item);
                                if (index !== -1) {
                                    this.outLetForm.outLetInfoList.splice(index, 1);
                                }
                            });
                        })
                        .catch(() => {
                            this.$message({
                                type: "warning",
                                message: "已取消删除"
                            });
                        });
                } else {
                    let index = this.outLetForm.outLetInfoList.indexOf(item);
                    if (index !== -1) {
                        this.outLetForm.outLetInfoList.splice(index, 1);
                    }
                }
            },
            /** 获取对象现有入湖排口信息 */
            getHaveOutLet(info) {
                let params = {
                    rlInfoId: info,
                    pageSize: 100,
                    pageNum: 1
                };
                outLet_info_query(params).then(res => {
                    if (res.data.data.list.length > 0) {
                        this.outLetForm.outLetInfoList = res.data.data.list;
                    }
                });
            },
            /** 入湖排口信息提交 */
            submitOutLetInfo(info) {
                outLetInfoAddBatch(info.outLetInfoList).then(res => {
                    this.$message(this.outLetTitle + "编辑成功！");
                    this.dialogAddOutLet = false;
                });
            },
        },
        computed: {
            tableMaxHeight() {
                return window.innerHeight - 160 + "px";
            }
        }
    };
</script>
<style lang="less" scoped>
/deep/ .el-dialog__body{
    max-height: 50vh; 
    overflow-y: auto;
}
</style>
