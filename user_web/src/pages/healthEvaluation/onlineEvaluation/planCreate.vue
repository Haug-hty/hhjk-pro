<!-- 制定方案页面 -->
<template>
    <main>
        <el-card :collapse="true">
            <div slot="header" class="clearfix">
                <span style="font-size: 18px;font-weight:600;margin-right: 50px;">方案列表</span>
                <el-button @click="createdFlag = !createdFlag" type="info" size="small">
                    <h3>新增</h3>
                </el-button>
            </div>
            <!-- 方案信息表格 -->
            <div style="margin:-20px;">
                <el-table :data="schemeTableList" :cell-style="cellStyle"  stripe style="width: 100%;font-size: 12px;text-align: center;" :header-cell-style="{background:'#eef1f6',color:'#606266',fontSize:'14px',borderBottom:'1px solid #000'}">
                <el-table-column type='index' label="序号" width="50" align="center" header-align="center">
                </el-table-column>
                <el-table-column prop="name" label="方案名称" align="center" header-align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="rlName" label="评估对象" width="100" align="center" header-align="center" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div v-if="scope.row.rlInfoVo">{{scope.row.rlInfoVo.name}}</div>
                        <div v-if="!scope.row.rlInfoVo">-</div>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="河湖类型" width="80" align="center" header-align="center" :formatter="rltypeFine">
                </el-table-column>
                <el-table-column prop="guidelinesName" label="标准名称" align="center" header-align="center" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div v-if="scope.row.guidelinesVo">{{scope.row.guidelinesVo.name}}</div>
                        <div v-if="!scope.row.guidelinesVo">-</div>
                    </template>
                </el-table-column>
                <el-table-column prop="year" label="评估年份" width="100" align="center" header-align="center">
                </el-table-column>
                <el-table-column prop="processState" label="方案进程" width="80" align="center" header-align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.processStateName}}</div>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="300" align="center" header-align="center">
                    <template slot-scope="scope">
                        <el-button :disabled='scope.row.processState != 1' @click="editInfo(scope.row)" size="small"
                            type="text">制定</el-button>
                        <el-button :disabled='scope.row.processState != 1' @click="targetCho(scope.row)" size="small"
                        type="text">可选指标项</el-button>
                        <el-button :disabled='scope.row.processState != 1 || scope.row.step != 5' @click="send(scope.row)"
                            size="small" type="text">发起评估</el-button>
                        <el-button @click="geographic(scope.row)" size="small" type="text">地理信息</el-button>
                        <el-button @click="delInfo(scope)" size="small" type="text">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row type="flex" justify="end">
                <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentChange" :current-page="pagination.current"
                    :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total" layout="prev,pager,next,jumper,total,sizes"></el-pagination>
            </el-row>
            </div>
            
            <!-- 分页栏 -->
            


        </el-card>
        <!-- -----------------方案制定：基本信息填写，方案对象选取，评估指标选取-------页面开始---------- -->
        <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="createdFlag" width="50%" title='方案基本信息' @close="closingDialog('elForm')">
            <!-- <hr> -->
            <el-row>
                <el-form ref="elForm" :model="schemeData" class="scheme-create-dialog" size="medium" label-width="100px" :rules="elFormRules">
                    <el-col :span="20">
                        <el-form-item label="地区：" prop="name">
                            <el-input v-model="schemeData.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="20">
                        <el-form-item label="方案年份：" prop="year">
                            <el-date-picker type="year" v-model="schemeData.year" format="yyyy" value-format="yyyy"
                                :style="{width: '100%'}" placeholder="请选择方案年份" clearable></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="7">
                        <el-form-item label="行业：" prop="industry">
                            <el-select v-model="schemeData.industry" placeholder="请输入行业" clearable :style="{width: '100%'}">
                                <el-option v-for="item in industryOption" :key="item.doKey" :label="item.doValue"
                                    :value="item.doKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col> -->

                    <el-col :span="20">
                        <el-form-item label="标准名称：" prop="guidelinesId">
                            <el-select v-model="schemeData.guidelinesId" filterable remote reserve-keyword placeholder="请输入关键词"
                                :remote-method="remoteMethod" :loading="loading" :style="{width: '100%'}">
                                <el-option v-for="item in guidelinesOptions" :key="item.value" :label="item.value"
                                    :value="item.data">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <!-- <el-col :span="14">
                        <el-form-item label="行政区划：" prop="areaCode">
                            <myDistPicker ref="distPick"></myDistPicker>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="20">
                        <el-form-item label="标准编号：" prop="code">
                            <el-input v-model="schemeData.code" :style="{width: '100%'}"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="20">
                        <el-form-item label="河湖类别：" prop="rlType">
                            <el-select v-model="schemeData.rlType" placeholder="请选择河湖类别" clearable :style="{width: '100%'}"
                                @change="getRlTypeName">
                                <el-option v-for="item in rlTypeOptions" :key="item.doKey" :label="item.doValue" :value="item.doKey"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col v-if="this.schemeData.rlType">
                        <el-form-item :label="nameLabel" prop="rlInfoIds">
                            <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                            <el-checkbox-group v-model="schemeData.rlInfoIds" size="medium">
                                <el-checkbox v-for="(item, index) in schemeObjectOptions" :key="index" :label="item.id">
                                    {{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <div class="footer-button">
                            <el-button  @click="schemeBaseInfoSubmit" type="primary" size="small">确认</el-button>

                        </div>
                    </el-col>



                </el-form>

            </el-row>
        </el-dialog>
        <!-- -----------------方案制定：基本信息填写，方案对象选取，评估指标选取-------页面结束---------- -->


        <!-- -------------方案基本信息编辑，方案具体实施对象的站点信息、河段信息以及方案的评估组，评估时间的信息编辑管理------页面开始------------ -->
        <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="schemeInfoFlag" width="60%" title="方案详情编制">
            <el-steps :active="active" finish-status="success">
                <el-step title="基本信息"></el-step>
                <el-step title="监测点/采样点信息"></el-step>
                <el-step title="河段/湖区信息"></el-step>
                <el-step title="评估组、评估时间"></el-step>
            </el-steps>
            <!-- 基本信息编辑步骤 -->
            <el-card v-if="active == 0">
                <el-row :gutter="15">
                    <el-form :model="editInfoForm" size="medium" label-width="100px">

                        <el-col :span="20">
                            <el-form-item label="方案名称：" prop="name">
                                <el-input v-model="editInfoForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="20">
                            <el-form-item label="方案年份：" prop="year">
                                <el-date-picker type="year" v-model="editInfoForm.year" format="yyyy" value-format="yyyy"
                                    :style="{width: '100%'}" placeholder="请选择方案年份" clearable>
                                </el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="20">
                            <el-form-item label="标准名称：" prop="guidelinesName">
                                <el-input v-model="editInfoForm.guidelinesName" readonly disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="20">
                            <el-form-item label="标准编号：" prop="guidelinesCode">
                                <el-input v-model="editInfoForm.guidelinesCode" readonly disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="20">
                            <el-form-item label="河湖类别：" prop="rlType" readonly disabled>
                                <el-select v-model="editInfoForm.rlType" placeholder="请选择河湖类别" disabled readonly :style="{width: '100%'}">
                                    <el-option v-for="item in rlTypeOptions" :key="item.doKey" :label="item.doValue"
                                        :value="item.doKey"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="20">
                            <el-form-item label="评估对象：" prop="rlName" readonly disabled>
                                <el-input v-model="editInfoForm.rlName" readonly disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </el-row>
                <!-- <el-button type="primary" @click="editInfoSubmit">确定</el-button> -->
                <div>
                    <el-button style="margin-top: 12px;" @click="editInfoSubmit">下一步</el-button>
                </div>
            </el-card>
            <!-- 检测点/采样点信息编辑步骤 -->
            <el-table :data="siteTableData1" stripe style="width: 100%;font-size: 12px;text-align: center;" v-if="active == 1">
                <el-table-column prop="name" label="监测断面/站点名称" align="center" header-align="center">
                </el-table-column>
                
                <!-- <el-table-column align="center" fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button :disabled="!scope.row.edit" class="cancel-btn" size="mini" type="warning" @click="cancelEdit(scope.$index, scope.row)"
                            style="margin-left:0px;">取消
                        </el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            <el-button style="margin-top: 12px;" @click="before" v-if="active == 1">上一步</el-button>
            <el-button style="margin-top: 12px;" @click="siteSubmit" v-if="active == 1">下一步</el-button>
            <!-- 检测点/采样点信息编辑步骤结束 -->
            <!-- 河段信息编辑步骤开始 -->
            <div v-if="active == 2">
                <el-table :data="reachTableData" stripe style="width: 100%;font-size: 12px;text-align: center;">
                    <el-table-column prop="name" label="河段(湖区)名称" align="center" header-align="center">
                    </el-table-column>
                    <el-table-column prop="simpleDesc" label="描述" width="200" align="center" header-align="center">
                    </el-table-column>
                </el-table>
                <!-- <el-button @click="addNewReach" v-if="active == 2">新增河段</el-button> -->
                <el-button style="margin-top: 12px;" @click="before" v-if="active == 2">上一步</el-button>
                <el-button style="margin-top: 12px;" @click="reachSubmit" v-if="active == 2">下一步</el-button>
            </div>
            <!-- 河段信息编辑步骤结束 -->
            <!-- 评估小组/时间编辑内容 -->
            <el-card v-if="active == 3">
                <el-row :gutter="15">
                    <el-form :inline="true" :model="assessorForm" class="demo-form-inline">
                        <el-col :span="24">
                            <el-form-item label="评估组：" labelWidth="150px">
                                <el-select v-model="assessorForm.teamId" placeholder="" clearable :style="{width: '100%'}">
                                    <el-option v-for="item in assessorOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="评估时间：" labelWidth="150px">
                                <el-date-picker v-model="assessorForm.starTime" type="date" placeholder="选择日期">
                                </el-date-picker>--
                                <el-date-picker v-model="assessorForm.enddTime" type="date" placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>

                        </el-col>
                    </el-form>
                </el-row>

                <el-button style="margin-top: 12px;" @click="before">上一步</el-button>
                <el-button style="margin-top: 12px;" @click="assessorInfoSubmit">保存</el-button>
            </el-card>


        </el-dialog>
        <!-- -------------方案基本信息编辑，方案具体实施对象的站点信息、河段信息以及方案的评估组，评估时间的信息编辑管理------页面结束------------ -->

        <!-- 方案信息查看---开始 -->
        <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="dialogSchemeInfo" width="50%" :title="schemeTitle">
            <el-row :gutter="15">

                <el-form ref="schemeInfoForm" :inline="true" :model="reachForm">
                    <p>方案名称：{{schemeInfoForm.name}}</p>
                    <p>方案年份：{{schemeInfoForm.year}}</p>
                    <p>标准名称：{{schemeInfoForm.guidelinesName}}</p>
                    <p>标准编号：{{schemeInfoForm.guidelinesCode}}</p>
                    <p>评估对象：{{schemeInfoForm.rlname}}</p>
                    <p>评估小组：{{schemeInfoForm.teamName}}</p>
                    <p>评估时间：{{schemeInfoForm.startTime}}&nbsp;至&nbsp;{{schemeInfoForm.endTime}}</p>
                    <p>方案站点：{{schemeInfoForm.site}}</p>
                    <p>方案河段（湖区）：{{schemeInfoForm.reach}}</p>

                </el-form>
            </el-row>
            <div slot="footer">
                <el-button @click="dialogSchemeInfo = false">取消</el-button>
                <el-button type="primary" @click="sendSubmit">确定</el-button>
            </div>
        </el-dialog>
        <!-- 方案信息查看---结束 -->
        <!-- 选择指标项内容选择---开始 -->
        <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="targetFlag" width="30%" title="可选项指标选定">
            <el-row :gutter="15">
                <el-table
                    ref="multipleTable"
                    :data="targetChooseList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @select="targetChange"
                    @select-all="targetChangeAll">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    label="指标名称">
                    <template slot-scope="scope">{{ scope.row.guidelinesTargetName }}</template>
                    </el-table-column>
                </el-table>
            </el-row>
            <div slot="footer">
                <el-button @click="targetFlag = false">取消</el-button>
                <el-button type="primary" @click="targetInfoSubmit">确定</el-button>
            </div>
        </el-dialog>
        <!-- 选择指标项内容---结束 -->

    </main>

</template>
<script>
    import { dict_search_domain } from '@/api/dict/index'
    
    import { target_save_batch, target_GuidelineId_choose} from "@/api/schemeGt/index"
    import { guidelines_otions_select, guidelines_info_findById } from '@/api/guidelines/index'
    import { site_info_query, lake_river_info_query, reach_info_query } from "@/api/rlObject/index"
    import {
        scheme_addInfo, scheme_tableList_query, rl_scheme_editInfo,
        scheme_site_info_submit, scheme_delInfo,
    } from '@/api/scheme/index'
    import { assessor_team_query } from '@/api/team/index'
    import myDistPicker from '@/components/myDistPicker'
    import { getToken } from '@/utils/auth'
    import { mapIDE } from '@/global.js'
    export default {
        data() {
            return {
                checkAll:false,
                schemeData: { //方案基本内容
                    name: '',
                    year: '',
                    industry: '',
                    areaCode: '',
                    rlType: '',
                    rlInfoIds: [],
                    code: '',
                    guidelinesId: ''
                },
                createdFlag: false,//方案制定控制器
                loading: false,
                nameLabel: '',//动态标签名，选择河湖对象以及具体对象
                industryOption: [],//行业字典选项
                guidelinesOptions: [],//指标字典选项
                rlTypeOptions: [],//河湖类型字典选项
                schemeObjectOptions: [],//河湖对象信息多选框选项
                schemeTableList: [],//方案信息表格数据
                processStateOption: [],//进程字典
                schemeInfoFlag: false,//方案对象基本信息编辑控制器
                active: 0,//step步骤条
                editInfoForm: {//方案编辑
                    name: '',
                    year: ''
                },
                reachTableData: [],//河段信息表格数据
                schemeId: '',//提交监测点/河段信息的方案ID
                siteTableData1: [],//站点信息表格数据
                siteTypeOption: [],//站点类型选择项内容
                rlInfoId: null,//河湖对象信息id
                siteListOption: [],//河段新增使用的站点列表
                reachForm: {},//河段新增表单
                multipleReachSelection: [],//河段勾选内容
                assessorOptions: [],//工作组选项值
                multipleSelection: [],//多选监测点信息列表
                //评估小组、时间
                assessorForm: {
                    teamId: '',
                    // startTime: '',
                    // endTime: ''
                },
                // 发起行数据
                rowData:{},
                //分页
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                dialogSchemeInfo: false,
                schemeTitle: '',
                schemeInfoForm: {},
                elFormRules: {
                    name: [
                        { required: true, trigger: "blur", message: "不能为空" }
                    ],
                    year: [
                        { required: true, trigger: "blur", message: "方案年份不能为空" }
                    ],
                    guidelinesId: [
                        { required: true, trigger: "blur", message: "标准名称不能为空" }
                    ],
                    rlType: [
                        { required: true, trigger: "blur", message: "河湖类别不能为空" }
                    ],
                },
                targetChooseList:[],
                targetData:{},
                targetFlag:false,
            }
        },
        components: {
            myDistPicker
        },
        created() {
            this.processStateDictSearch()
            this.industryDictSearch() //行业字典信息查询
            this.rlTypeDictSearch() //河湖类型字典信息查询
            this.siteTypeDictSearch() //站点类型字典信息查询
            this.assessor()
        },
        mounted() {
            this.schemeTabelList()
        },
        methods: {
             handleCheckAllChange(val) {
                 this.schemeData.rlInfoIds =[]
                 if(val){
                     this.schemeObjectOptions.forEach(item=>{
                         this.schemeData.rlInfoIds.push(item.id)
                     })
                 } else {
                     this.schemeData.rlInfoIds =[]
                 }
                console.log(this.schemeData.rlInfoIds);                
            },

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
            /** 河湖类型信息查询 */
            rlTypeDictSearch() {
                let domian = 'rlType'
                dict_search_domain(domian)
                    .then(response => {
                        this.rlTypeOptions = response.data.data
                    }).catch(() => {
                        console.log(err)
                    })
            },
            //站点类型信息查询
            siteTypeDictSearch() {
                let domian = 'monitorType'
                dict_search_domain(domian)
                    .then(response => {
                        this.siteTypeOption = response.data.data
                    }).catch(() => {
                        console.log(err)
                    })
            },
            //方案进程信息查询
            processStateDictSearch() {
                let domian = 'processState'
                dict_search_domain(domian)
                    .then(response => {
                        this.processStateOption = response.data.data
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
            //对象选择label标签和选取的河湖对象类型一致
            getRlTypeName(val) {
                // this.getAreaCode()
                this.rlTypeOptions.forEach(item => {
                    if (item.doKey == val) {
                        this.nameLabel = item.doValue
                    }

                });
            },
            /** 关闭表单校验 */
            closingDialog(formName){
                this.$refs[formName].resetFields()
            },
            //方案的基本信息以及本次评估对象集合信息的保存
            schemeBaseInfoSubmit() {
                this.$refs.elForm.validate(valid => {
                    if (valid) {
                        if (this.schemeData.rlInfoIds.length == 0) {
                            return this.$message("请选择河湖对象！")
                        } else {
                            let params = {
                                name: this.schemeData.name,
                                year: this.schemeData.year,
                                industry: this.schemeData.industry,
                                areaCode: this.schemeData.areaCode,
                                rlType: this.schemeData.rlType,
                                rlInfoIds: this.schemeData.rlInfoIds,
                                guidelinesId: this.schemeData.guidelinesId,
                                processState: 1,
                                // createPer:'admin' //创建人 获取当前登录用户信息
                            }
                            scheme_addInfo(params)
                                .then(() => {
                                    this.$message({
                                        message: '新增方案基础信息成功！',
                                        type: 'success'
                                    })
                                    this.createdFlag = false
                                    this.schemeData = {}
                                    this.schemeTabelList()
                                    // window.location.reload()

                                }).catch(err => {
                                    console.log(err)
                                })

                        }

                    }
                })

            },
            //方案列表信息查询
            schemeTabelList() {
                let params = {
                    pageSize: this.pagination.pageSize,
                    pageNum: this.pagination.current
                }
                scheme_tableList_query(params)
                    .then((res) => {
                        
                        this.pagination.total = res.data.data.total
                        res.data.data.list.forEach(item => {
                            this.processStateOption.forEach(option => {
                                if (option.doKey == item.processState) {
                                    item.processStateName = option.doValue
                                }
                            })
                        })
                        this.schemeTableList = res.data.data.list

                    })

            },
            //方案删除
            delInfo(info) {
                this.$confirm('确定要删除此方案吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (info.row.processState == 2) {
                        return this.$message("方案已经发起，删除请联系相关人员进行确认沟通！")
                    } else {
                        scheme_delInfo(info.row.id)
                            .then(() => {
                                this.$message({
                                    message: '方案删除成功！',
                                    type: 'success'
                                })
                                this.schemeTabelList()
                            })
                    }


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
                this.schemeTabelList();
            },
            //分页时切换页
            handleCurrentChange(val) {
                this.pagination.current = val;
                this.schemeTabelList();
            },

            //----------------------------------------------方案基本信息内容以及监测点、河段、评估小组等信息编辑功能开始
            //上一步按钮功能
            before() {
                this.active--
            },
            /** 时间格式化 */
            formatDate(info) {
                let date = new Date(info);
                let YY = date.getFullYear() + '-';
                let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                return YY + MM + DD;
            },
            /** /方案信息编辑修改功能*/
            editInfo(info) {
                console.log(info);
                if (info.step == 5) {
                    this.active = 3
                } else {
                    this.active = info.step - 1
                }

                this.schemeInfoFlag = true
                this.assessorForm.teamId = info.teamId
                this.assessorForm.startTime = this.formatDate(info.startTime)
                this.assessorForm.endTime = this.formatDate(info.endTime)
                this.editInfoForm.processState = info.processState
                this.editInfoForm.id = info.id
                //---------------基础信息内容展示开始
                this.editInfoForm.name = info.name
                this.editInfoForm.year = info.year
                this.editInfoForm.areaCode = info.guidelinesVo.areaCode
                this.editInfoForm.guidelinesName = info.guidelinesVo.name
                this.editInfoForm.guidelinesCode = info.guidelinesVo.code
                this.editInfoForm.rlType = info.rlType
                this.editInfoForm.rlName = info.rlInfoVo.name
                //----------------基础信息内容展示结束

                //-----------------站点信息展示开始
                this.schemeId = info.id
                let params = {
                    pageSize: 100,
                    pageNum: 1,
                    assessSchemeId: this.schemeId
                }
                site_info_query(params)
                    .then(res => {
                        console.log(res)
                        this.siteTableData1 = res.data.data.list
                    })

                //-----------------站点信息展示结束
                this.getReachList()
                this.assessor()
            },
            //基本信息模块步骤提交功能
            editInfoSubmit() {
                Object.assign(this.editInfoForm, { step: 2 })
                rl_scheme_editInfo(this.editInfoForm)
                    .then(() => {
                        this.$message({
                            message: '编辑评估方案对象信息成功！',
                            type: 'success'
                        })
                        // this.schemeInfoFlag = false
                        // this.schemeTabelList()
                        this.active++
                    })

            },

            // -----------------------------------------监测点部分方法开始

            //选择方案监测点信息提交（包含新增监测点）
            siteSubmit() {
                this.active++
                // let key = this.schemeId
                // let value = this.multipleSelection
                // let data = {}
                // data[key] = value
                // scheme_site_info_submit(data)
                //     .then(() => {
                //         Object.assign(this.editInfoForm, { step: 3 })
                //         rl_scheme_editInfo(this.editInfoForm)
                //             .then(() => {
                //                 this.$message({
                //                     message: '监测点选择信息提交成功！',
                //                     type: 'success'
                //                 })
                //                 this.getSiteList()
                //                 this.active++
                //             })

                //     })



            },
            // --------------------------------------------------监测点部分方法结束


            // --------------------------------------------------河段部分方法开始
            //河段列表查询
            getReachList() {
                let reach = {
                    assessSchemeId: this.editInfoForm.id                    
                }
                reach_info_query(reach)
                    .then(res => {
                        console.log(res)
                        res.data.data.list.forEach(item => {
                            item.reachId = item.id
                        });
                        this.reachTableData = res.data.data.list
                    })

            },
            //提交选取的河段信息与方案绑定
            reachSubmit() {
                this.active++
            },
            // --------------------------------------------------河段部分方法结束
            // --------------------------------------------------评估人/时间部分方法开始
            //评估团队信息列表查询
            assessor() {
                let params = {
                    pageSize: 100,
                    pageNum: 1
                }
                assessor_team_query(params)
                    .then(res => {
                        this.assessorOptions = res.data.data.list
                    })
            },
            assessorInfoSubmit() {
                // console.log(this.editInfoForm)
                let params = {
                    step: 5,
                    startTime: this.assessorForm.starTime,
                    endTime: this.assessorForm.enddTime,
                    teamId: this.assessorForm.teamId,
                    id: this.editInfoForm.id,
                    processState: 1
                }
                Object.assign(params,this.editInfoForm,{step: 5})
                rl_scheme_editInfo(params)
                    .then(() => {
                        this.$message({
                            message: '编辑评估人和评估时间信息成功！',
                            type: 'success'
                        })
                        this.schemeInfoFlag = false
                        this.schemeTabelList()
                    })

            },

            // --------------------------------------------------评估人/时间部分方法结束

            // --------------------------------------------------发起评估方法开始

            send(info) {
                let schemeSite = []
                let schemeReach = []

                this.schemeTitle = info.name + "--信息审查"
                this.schemeInfoForm = info
                this.schemeInfoForm.guidelinesName = info.guidelinesVo.name
                this.schemeInfoForm.guidelinesCode = info.guidelinesVo.code
                this.schemeInfoForm.rlname = info.rlInfoVo.name
                this.assessorOptions.forEach(item => {
                    if (item.id == info.teamId) {
                        this.schemeInfoForm.teamName = item.name
                    }
                })
                this.schemeInfoForm.startTime = this.formatDate(info.startTime)
                this.schemeInfoForm.endTime = this.formatDate(info.endTime)

                /**站点、河段湖区信息查询 */
                let params = {
                    assessSchemeId: info.id
                }
                // 获取方案站点信息
                site_info_query(params).then(res => {
                    
                    let arr = []
                    res.data.data.list.forEach(it => {
                        arr.push(it.name)
                    })
                    this.schemeInfoForm.site = arr.join()
                    // 获取方案河段湖区
                    reach_info_query(params).then(res => {
                            let reachList = []
                            res.data.data.list.forEach(it => {
                                reachList.push(it.name)
                            })
                            this.schemeInfoForm.reach = reachList.join()
                            this.dialogSchemeInfo = true
                        })
                    })
                


            },
            sendSubmit() {
                this.$confirm('确定要发起此方案吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = this.schemeInfoForm
                    params.processState = 2
                    rl_scheme_editInfo(params)
                        .then(() => {
                            this.$message({
                                message: '方案发起成功！',
                                type: 'success'
                            })
                            this.dialogSchemeInfo = false
                            this.schemeTabelList()
                        })


                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '已取消发起'
                    });
                });
            },

            // --------------------------------------------------发起评估方法结束
            //----------------------------------------------方案基本信息内容以及监测点、河段、评估小组等信息编辑功能结束

            // -------------------------------------------------可选指标项属性配置功能开始------------------------
            /** 可选项指标项内容选择*/
            targetCho(info){
                
                this.targetFlag = true
                this.targetData = JSON.parse(JSON.stringify(info))
                target_GuidelineId_choose(this.targetData.id).then(res=>{
                    this.targetChooseList = res.data.data
                    this.$nextTick(()=>{
                    this.targetChooseList.forEach(row => {
                        if(row.exist == true){
                            this.$refs.multipleTable.toggleRowSelection(row,true);
                        }
                    })
                    })
                })
                
                
            },
            /** 单个点击事件*/
            targetChange(val, row){
                console.log(val, row)
                if(row.exist){
                    row.del =!row.del
                } else {
                    row.add =!row.add
                }
                console.log(this.targetChooseList)
            },
            /** 全选点击事件*/
            targetChangeAll(val){
                console.log(val)
                if(val.length == 0){
                    this.targetChooseList.forEach(item=>{
                        if(item.exist){
                            item.del = true
                        }
                    })
                } else {
                    this.targetChooseList.forEach(item=>{
                        if(item.exist){
                            item.del = false
                        } else {
                            item.add = true
                        }
                    })
                }
            },
            /** 指标项选择提交事件 */
            targetInfoSubmit(){
                console.log(this.targetChooseList);
                let params ={
                    assessSchemeId : this.targetData.id,
                    dataList:this.targetChooseList
                }
                target_save_batch(params).then(res=>{
                    this.$message({
                        message:"提交成功!",
                        type:"success"
                    })
                    this.targetFlag = false
                })
                
            },
            // -------------------------------------------------可选指标项属性配置功能结束-----------------------

            /** 方案进入地图编辑器 */
            geographic(info){
                let id = info.id
                let TOKEN = getToken()
                window.open( mapIDE + "/#/index?Scheme="+ id+"&T="+TOKEN)
            },

            //   ----------------------------------------------table 表格内容设置----------------------
            rltypeFine(row, column, cellValue, index){
                return row.rlType===1?'河流':row.rlType===2?'湖泊':'水库'
            },
            /** 对象类型列项内容样式填充 */
            cellStyle(data) {                
                if (data.columnIndex == 3) {
                    if (data.row.rlType == 1) {
                        // return 'color:rgba(65, 97, 235, 1);background:rgba(65, 97, 235, 0.1);'
                        return 'color:rgba(65, 97, 235, 1)'
                    } else if(data.row.rlType == 2){
                        // return 'color:rgba(11, 219, 168, 1);background:rgba(11, 219, 168, 0.1);'
                        return 'color:rgba(11, 219, 168, 1)'
                    } else if(data.row.rlType == 3){
                        // return 'color:rgba(255, 181, 64, 1);background:rgba(255, 181, 64, 0.1);'
                        return 'color:rgba(255, 181, 64, 1);'
                    }
                }
                if (data.columnIndex == 6) {
                    if (data.row.processState == 1) {
                        return 'color:rgba(245, 47, 62, 1)'
                    } else if(data.row.processState == 2){
                        return 'color:rgba(255, 181,64,1)'
                    } else if(data.row.processState == 3){
                        return 'color:rgba(11, 219, 168, 1)'
                    }
                }
            },

        },
        computed: {
            //计算指标选项中的值变化
            getGuidelinesId: function () {
                return this.schemeData.guidelinesId
            },
            //计算河湖对象选项值变化
            getRlType: function () {
                return this.schemeData.rlType
            },
        },
        watch: {
            //监听指标选项值变化，远程数据获取指标编码
            getGuidelinesId: {
                handler: function () {
                    if(this.getGuidelinesId){
                        let id = this.getGuidelinesId
                        guidelines_info_findById(id)
                            .then(res => {
                                this.schemeData.code = res.data.data.code
                            })
                    }
                    
                },
            },
            //监听河湖对象选项值变化，展示对应河湖对象选项列表
            getRlType: {
                handler: function () {
                    this.schemeObjectOptions = []
                    // if (!this.schemeData.areaCode) {
                    //     // this.$message("请选择行政区划信息，来确定您本次需要制定计划的河湖对象！")
                    //     this.schemeData.rlType = ""
                    // } else {
                    let params = {
                        pageSize: 100,
                        pageNum: 1,
                        type: this.getRlType,
                        // areaCode: this.schemeData.areaCode
                    }
                    lake_river_info_query(params)
                        .then(res => {
                            this.schemeObjectOptions = res.data.data.list
                        })

                },
            },

        }

    }
</script>
<style lang="less" scoped>
/deep/ .el-dialog__header{
    border-bottom: 1px solid #eee;
}

.scheme-create-dialog {
    margin: 0 30px;
}
.footer-button{
    position: absolute;
    right: 20px;
    margin: -20px 0;
    // bottom:10px;
}
</style>