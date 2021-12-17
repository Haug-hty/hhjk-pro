<!-- 标准库管理页面 -->

<template>
  <main>
    <!-- 上方查询操作栏 -->
    <div
      style="height: 60px; padding: 10px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;"
    >
      <el-form
        :inline="true"
        :model="formInline"
      >
        <el-form-item label="行业:">
          <el-select v-model="formInline.industry" placeholder="请选择" style="width: 120px;">
            <el-option
              v-for="item in industryOption"
              :key="item.doKey"
              :label="item.doValue"
              :value="item.doKey"
            ></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="标准名称:">
          <el-select
            v-model="formInline.guidelinesId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading"
            :style="{width: '100%'}"
          >
            <el-option
              v-for="item in guidelinesOptions"
              :key="item.value"
              :label="item.value"
              :value="item.data"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标准编号:">
          <el-input v-model="formInline.code" placeholder="请输入标准编号" style="width: 150px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryList" size="small">查询</el-button>
          <el-button type="primary" @click="reset" size="small" plain>重置</el-button>
          <el-button type="success" @click="addNew" size="small">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="page">
      <!-- 数据列表 -->
      <el-table :data="tableData" stripe style="width: 100%;font-size: 12px;text-align: center;" :header-cell-style="{background:'#eef1f6',color:'#606266',fontSize:'14px',borderBottom:'1px solid #000'}">
        <el-table-column type="index" label="序号" width="50" align="center" header-align="center"></el-table-column>
        <el-table-column
          prop="industry"
          label="行业"
          width="100"
          align="center"
          header-align="center"
          :formatter="industryMatter"
        ></el-table-column>
        <el-table-column
          prop="specType"
          label="规范类别"
          width="120"
          align="center"
          header-align="center"
          :formatter="specTypeMatter"
        ></el-table-column>
        <!-- <el-table-column prop="areaCode" label="行政区别" width="120" align="center" header-align="center">
        </el-table-column>-->
        <el-table-column prop="code" label="标准编号" width="160" align="center" header-align="center"></el-table-column>
        <el-table-column prop="name" label="名称" align="center" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column
          prop="publishDate"
          label="发布日期"
          width="140"
          align="center"
          header-align="center"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="300" align="center" header-align="center">
          <template slot-scope="scope">
            <el-button @click="downLoadFile(scope.row)" size="small" type="text">下载</el-button>
            <el-button @click="editInfo(scope)" size="small" type="text">编辑</el-button>
            <el-button @click="evaluate(scope.row)" size="small" type="text">评分体系</el-button>
            <el-button @click="xmlUpload(scope.row)" size="small" type="text">调查问卷</el-button>
            <el-button @click="delInfo(scope)" size="small" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页栏 -->
      <el-row type="flex" justify="end">
        <el-pagination
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          layout="prev,pager,next,jumper,total,sizes"
        ></el-pagination>
      </el-row>
    </div>

    <!-- 新增标准信息 -->
    <el-dialog append-to-body :visible.sync="dialogFormVisible" width="60%" title="新增标准">
      <el-row :gutter="15">
        <el-form :model="addNewForm" ref="addNewForm" :rules="addNewFormRules">
          <!-- <el-col :span="18">
            <el-form-item label="指标级别:" :label-width="formLabelWidth" prop="areaCode" v-if="!addNewForm.id">
              <el-select
                v-model="addNewForm.levelType"
                :options="levelTypeOption"
                clearable
                placeholder="标准级别"
                style="width: 30%;"
              >
                <el-option
                  v-for="item in levelTypeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select
                v-model="addNewForm.local"
                :options="levelTypeOption"
                clearable
                v-if="addNewForm.levelType == 'local'"
                style="width: 30%;"
              >
                <el-option
                  v-for="item in distOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <v-distpicker
                ref="distPick"
                v-if="addNewForm.levelType == 'local' && addNewForm.local=='city' "
                hideArea
              ></v-distpicker>
              <v-distpicker
                ref="distPick"
                v-if="addNewForm.levelType == 'local' && addNewForm.local=='provice'"
                onlyProvince
              ></v-distpicker>
              <v-distpicker
                ref="distPick"
                v-if="addNewForm.levelType == 'local' && addNewForm.local=='area'"
              ></v-distpicker>
            </el-form-item>
          </el-col> -->
          <el-col :span="20">
            <el-form-item label="行业:" :label-width="formLabelWidth" prop="industry">
              <el-select
                v-model="addNewForm.industry"
                placeholder="请选择行业"
                clearable
                style="width: 80%;"
              >
                <el-option
                  v-for="item in industryOption"
                  :key="item.doKey"
                  :label="item.doValue"
                  :value="item.doKey"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="标准规范:" :label-width="formLabelWidth" prop="specType">
              <el-select
                v-model="addNewForm.specType"
                placeholder="请选择标准分类"
                clearable
                style="width: 80%;"
              >
                <el-option
                  v-for="item in specTypeOption"
                  :key="item.doKey"
                  :label="item.doValue"
                  :value="item.doKey"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span='12'>
                        <el-form-item label="指标级别:" :label-width="formLabelWidth" prop="levelType" required>
                            <el-cascader v-model="addNewForm.levelType" :options="levelTypeOption" clearable placeholder="标准级别" style="width: 100%;">
                                <el-option v-for="item in levelTypeOption" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-cascader>
                        </el-form-item>
          </el-col>-->
          <el-col :span="20">
            <el-form-item label="发布时间:" :label-width="formLabelWidth" prop="publishDate">
              <el-date-picker
                v-model="addNewForm.publishDate"
                type="month"
                format="yyyy-MM"
                value-format="yyyy-MM"
                placeholder="选择日期"
                style="width: 80%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="标准名称:" :label-width="formLabelWidth" prop="name">
              <el-input v-model="addNewForm.name" placeholder="请输入标准名称" style="width: 80%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="标准编号:" :label-width="formLabelWidth" prop="code">
              <el-input v-model="addNewForm.code" placeholder="请输入标准编号" style="width: 80%;"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span='24'>
                        <el-form-item label="评价等级:" :label-width="formLabelWidth" prop="evaluateDesc">
                            <el-input v-model="addNewForm.evaluateDesc" readonly  placeholder="例如：['非常健康','健康','亚健康','不健康','病态']"
                                style="width:80%">
                            </el-input>
                            <el-button type="info" @click="addEvaluateDesc">填写</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label="评价等级分数:" :label-width="formLabelWidth" prop="evaluateScore">
                            <el-input v-model="addNewForm.evaluateScore" readonly  placeholder="例如：['[90,100','[80,90)','[60,80)','[40,60)','[0,40)']"
                                style="width:80%">
                            </el-input>
                            <el-button type="info" @click="addEvaluateScore">填写</el-button>
                        </el-form-item>

          </el-col>-->
          <el-col :span="20">
            <el-form-item label="文件上传：" :label-width="formLabelWidth">
              <el-upload class="upload-demo" ref="upload" action 
                     :http-request="upload">
                     <el-button size="small" type="primary">上传</el-button>
                    <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                </el-upload>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitNew">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改标准信息 -->
    <el-dialog append-to-body :visible.sync="dialogEdit" title="标准信息编辑">
      <el-row :gutter="15">
        <el-form :model="editInfoForm" ref="editInfoForm" :rules="editInfoFormRules">
          <!-- <el-col :span='24'>
                        <el-form-item label="行政区划:" :label-width="formLabelWidth" prop="areaCode">
                            <myDistPicker ref="distPick"></myDistPicker>
                        </el-form-item>
          </el-col>-->
          <el-col :span="20">
            <el-form-item label="行业:" :label-width="formLabelWidth" prop="industry" required>
              <el-select
                v-model="editInfoForm.industry"
                placeholder="请选择行业"
                clearable
                style="width: 100%;"
              >
                <el-option
                  v-for="item in industryOption"
                  :key="item.doKey"
                  :label="item.doValue"
                  :value="item.doKey"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="标准规范:" :label-width="formLabelWidth" prop="specType" required>
              <el-select
                v-model="editInfoForm.specType"
                placeholder="请选择标准分类"
                clearable
                style="width: 100%;"
              >
                <el-option
                  v-for="item in specTypeOption"
                  :key="item.doKey"
                  :label="item.doValue"
                  :value="item.doKey"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="发布时间:" :label-width="formLabelWidth" prop="publishDate" required>
              <el-date-picker
                v-model="editInfoForm.publishDate"
                type="month"
                format="yyyy-MM"
                value-format="yyyy-MM"
                placeholder="选择日期"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="名称:" :label-width="formLabelWidth" prop="name" required>
              <el-input v-model="editInfoForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="标准编号:" :label-width="formLabelWidth" prop="code" required>
              <el-input v-model="editInfoForm.code" placeholder></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span='24'>
                        <el-form-item label="评价等级:" :label-width="formLabelWidth" prop="evaluateDesc">
                            <el-input v-model="editInfoForm.evaluateDesc" readonly  placeholder="['非常健康','健康','亚健康','不健康','病态']" style="width:80%">
                            </el-input>
                            <el-button type="info" @click="editEvaluateDesc">填写</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label="评价等级分数:" :label-width="formLabelWidth" prop="evaluateScore">
                            <el-input v-model="editInfoForm.evaluateScore" readonly  placeholder="['[90,100]','[80,90)','[60,80)','[40,60)','[0,40)']" style="width:80%"></el-input>
                            <el-button type="info" @click="editEvaluateScore">填写</el-button>
                        </el-form-item>
          </el-col>-->
          <el-col :span="20">
            <el-form-item label="文件上传：" :label-width="formLabelWidth">
              <!-- <input type="file" id="fileEdit" size="50" @change="uploadEdit"> -->
              <el-upload class="upload-demo" ref="upload" action 
                     :http-request="uploadEdit">
                     <el-button size="small" type="primary">上传</el-button>
                    <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                </el-upload>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit(editInfoForm),dialogEdit = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 指标评价分级页面 -->
    <el-dialog append-to-body :visible.sync="dialogEvaluate" title="评分体系编辑">
      <el-row>
      <el-form :model="evaluateForm">
        <el-col :span="20">
          <el-form-item label="评价等级:" :label-width="formLabelWidth" prop="evaluateDesc">
            <el-input
              v-model="evaluateForm.evaluateDesc"
              readonly
              placeholder="['非常健康','健康','亚健康','不健康','病态']"
              style="width:80%"
            ></el-input>
            <el-button type="info" @click="editEvaluateDesc">填写</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="评价等级分数:" :label-width="formLabelWidth" prop="evaluateScore">
            <el-input
              v-model="evaluateForm.evaluateScore"
              readonly
              placeholder="['[90,100]','[80,90)','[60,80)','[40,60)','[0,40)']"
              style="width:80%"
            ></el-input>
            <el-button type="info" @click="editEvaluateScore">填写</el-button>
          </el-form-item>
        </el-col>
      </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEvaluate = false">取 消</el-button>
        <el-button type="primary" @click="evaluateSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--  新增评价-->
    <!-- <el-dialog append-to-body :visible.sync="dialogCompont">
            <textTrs :dataTrs="dataTrs" ref="textTrs1" v-if="showTextTrs"></textTrs>


            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCompont = false">取 消</el-button>
                <el-button type="primary" @click="componentSubmit">确 定</el-button>
            </div>
    </el-dialog>-->
    <!-- 新增赋分 -->
    <!-- <el-dialog append-to-body :visible.sync="dialogEvaluateScore">
            <textTrs :dataTrs="dataTrs" ref="textTrs2" v-if="showTextTrs"></textTrs>


            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEvaluateScore = false">取 消</el-button>
                <el-button type="primary" @click="evaluateScoreSubmit">确 定</el-button>
            </div>
    </el-dialog>-->

    <!--  编辑-->
    <el-dialog append-to-body :visible.sync="dialogCompontedit">
      <textTrs :dataTrs="dataTrs" ref="textTrs1edit" v-if="showTextTrs"></textTrs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCompontedit = false">取 消</el-button>
        <el-button type="primary" @click="editcomponentSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog append-to-body :visible.sync="dialogEvaluateScoreedit">
      <textTrs :dataTrs="dataTrs" ref="textTrs2edit" v-if="showTextTrs"></textTrs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEvaluateScoreedit = false">取 消</el-button>
        <el-button type="primary" @click="editevaluateScoreSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 指标体系问卷xml文件上传生成对应数据表 -->
    <el-dialog append-to-body :visible.sync="dialogXml" title="问卷调查xml文件上传" width="30%">
      <el-upload class="upload-demo" action :auto-upload="true" :http-request="uploadTemplateDta">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      </el-upload>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogXml = false">取 消</el-button>
        <el-button type="primary" @click="submitXmlFile">确 定</el-button>
      </div>
    </el-dialog>
  </main>
</template>

<script>
import { mapState } from "vuex";
import {
  guidelines_table_search,
  guidelines_newInfo_submit,
  guidelines_delInfo,
  guidelines_edit,
  guidelines_otions_select,
  xmlSubmit
} from "@/api/standard/index";
import { dict_search_domain } from "@/api/dict/index";
import { uploadFileRequest, getFileByCode } from "@/api/file/index";
import textTrs from "@/components/textTrs";
import myDistPicker from "@/components/myDistPicker";
export default {
  name: "biaozhunku",
  data() {
    return {
      formInline: {
        industry: null, //行业
        specType: null, //标准分类
        name: "", //名称
        code: ""
      },
      tableData: [],
      dialogFormVisible: false, //新增dialog弹窗控制器
      addNewForm: {
        code: "", //'标准编号',
        attachCode: "", //附件路径
        industry: 0, //行业
        name: "", //名称
        publishDate: "", //发布日期
        specType: 0 //规范类型
      },
      addNewFormRules: {
        industry: [
          { required: true, trigger: "blur", message: "行业不能为空" }
        ],
        specType: [
          { required: true, trigger: "blur", message: "标准分类不能为空" }
        ],
        publishDate: [
          { required: true, trigger: "blur", message: "发布时间不能为空" }
        ],
        name: [
          { required: true, trigger: "blur", message: "标准名称不能为空" }
        ],
        code: [{ required: true, trigger: "blur", message: "标准编号不能为空" }]
      },
      editInfoFormRules: {
        industry: [
          { required: true, trigger: "blur", message: "行业不能为空" }
        ],
        specType: [
          { required: true, trigger: "blur", message: "标准分类不能为空" }
        ],
        publishDate: [
          { required: true, trigger: "blur", message: "发布时间不能为空" }
        ],
        name: [
          { required: true, trigger: "blur", message: "标准名称不能为空" }
        ],
        code: [{ required: true, trigger: "blur", message: "标准编号不能为空" }]
      },
      dialogEdit: false,
      editInfoForm: {
        code: "", //'标准编号',
        attachCode: "", //附件路径
        industry: "", //行业
        name: "", //名称
        publishDate: "", //发布日期
        specType: "", //规范类型
      },

      formLabelWidth: "30%",
      industryOption: [],
      specTypeOption: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      guidelinesOptions: [],
      region: {
        province: "",
        city: ""
      },
      loading: false,
      filePath: "", //文件上传地址
      dialogCompont: false,
      dialogEvaluateScore: false,
      dialogEvaluate: false,
      evaluateForm: {},
      dataComponent: "",
      dataEvaluateScore: "",
      dialogXml: false, //问卷调查
      xmlId: null,
      xmlFile: "",
      dataTrs: "",
      showTextTrs: false,
      dialogCompontedit: false,
      dialogEvaluateScoreedit: false,
      levelTypeOption: [
        {
          label: "国家标准",
          value: "national"
        },
        {
          label: "行业标准",
          value: "industry"
        },
        {
          label: "地方标准",
          value: "local"
        }
      ],
      distOption: [
        {
          label: "省级",
          value: "provice"
        },
        {
          label: "市级",
          value: "city"
        },
        {
          label: "区级",
          value: "area"
        }
      ]
    };
  },
  components: {
    textTrs,
    myDistPicker
  },
  computed: {
    ...mapState({
      // SDKinformation: state => state.sddmstore.SDKinformation,
    })
  },
  created() {
    this.industryDictSearch(); //行业字典信息查询
    this.specTypeDictSearch();
    this.getList();
  },
  methods: {
    //标准信息实时查询
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          guidelines_otions_select(query).then(res => {
            this.loading = false;
            this.guidelinesOptions = res.data.data;
          });
        }, 200);
      } else {
        this.guidelinesOptions = [];
      }
    },
    //行业字典信息查询
    industryDictSearch() {
      let domian = "industry";
      dict_search_domain(domian)
        .then(response => {
          this.industryOption = response.data.data;
        })
        .catch(() => {
          console.log(err);
        });
    },
    //标准类型字典信息查询
    specTypeDictSearch() {
      let domian = "specType";
      dict_search_domain(domian)
        .then(response => {
          this.specTypeOption = response.data.data;
        })
        .catch(() => {
          console.log(err);
        });
    },
    //标准列表信息查询
    getList() {
      let params = {
        areaCode: this.formInline.areaCode,
        industry: this.formInline.industry,
        name: this.formInline.name,
        code: this.formInline.code,
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.current
      };
      guidelines_table_search(params)
        .then(response => {
          this.tableData = response.data.data.list;
          this.pagination.total = response.data.data.total;
        })
        .catch(error => {
          console.log(error);
        });
    },

    //表格列表内容格式化
    industryMatter(row, column) {
      let industryName;
      this.industryOption.forEach(item => {
        if (item.doKey == row.industry) {
          industryName = item.doValue;
        }
      });
      return industryName;
    },
    specTypeMatter(row, column) {
      let specTypeName;
      this.specTypeOption.forEach(item => {
        if (item.doKey == row.specType) {
          specTypeName = item.doValue;
        }
      });
      return specTypeName;
    },

    //重置查询条件
    reset() {
      this.formInline.areaCode = "";
      this.formInline.industry = "";
      this.formInline.code = "";
      this.formInline.name = "";
      this.getList();
    },

    //新增标准
    addNew() {
      this.dialogFormVisible = true;
      this.addNewForm = {};
    },
    //条件查询
    queryList() {
      this.getList();
    },
    // //添加评价等级
    // addEvaluateDesc() {
    //     if (this.addNewForm.evaluateDesc) {
    //         this.dataTrs = this.addNewForm.evaluateDesc
    //     } else {
    //         this.dataTrs = ''
    //     }
    //     this.showTextTrs = true
    //     this.dialogCompont = true
    //     // this.addNewForm.evaluateDesc = this.componentSubmit()
    // },
    // //评价描述提交
    // componentSubmit() {
    //     this.dataComponent = this.$refs.textTrs1.submitForm()
    //     this.addNewForm.evaluateDesc = this.dataComponent
    //     console.log(this.dataComponent)
    //     // this.addNewForm.evaluateDesc = this.$refs.textTrs1.submitForm()
    //     this.showTextTrs = false
    //     this.dialogCompont = false
    //     // return this.dataComponent

    // },

    // //添加分值等级
    // addEvaluateScore() {
    //     if (this.addNewForm.evaluateScore) {
    //         this.dataTrs = this.addNewForm.evaluateScore
    //     } else {
    //         this.dataTrs = ''
    //     }
    //     this.showTextTrs = true
    //     this.dialogEvaluateScore = true
    // },
    // //评价分值提交
    // evaluateScoreSubmit() {
    //     this.dataEvaluateScore = this.$refs.textTrs2.submitForm()
    //     this.addNewForm.evaluateScore = this.dataEvaluateScore
    //     this.showTextTrs = false
    //     this.dialogEvaluateScore = false
    //     // return this.dataComponent
    // },
    //新增提交
    submitNew() {
      this.$refs.addNewForm.validate(valid => {
        if (valid) {
          this.addNewForm.attachCode = this.filePath;
          this.addNewForm.areaCode = this.region.province + this.region.city;
          const params = Object.assign({}, this.addNewForm);
          guidelines_newInfo_submit(params)
            .then(res => {
              this.$message({
                type: "info",
                message: "新建成功"
              });
              this.dialogFormVisible = false;
              // window.location.reload()
              this.getList();
            })
            .catch(err => {
              this.$message({
                type: "warning",
                message: "新建失败"
              });
              console.log(err);
            });
        }
      });
    },
    //标准信息编辑
    editInfo(scope) {
        this.dialogEdit = true;
        this.editInfoForm = JSON.parse(JSON.stringify(scope.row));
    //   this.dialogFormVisible = true;
    //   this.addNewForm = scope.row;
    },
    // //添加评价等级
    // editEvaluateDesc() {
    //     if (this.editInfoForm.evaluateDesc) {
    //         this.dataTrs = this.editInfoForm.evaluateDesc
    //     } else {
    //         this.dataTrs = ''
    //     }
    //     this.showTextTrs = true
    //     this.dialogCompontedit = true
    //     // this.addNewForm.evaluateDesc = this.componentSubmit()
    // },
    // //评价描述提交
    // editcomponentSubmit() {
    //     this.dataComponent = this.$refs.textTrs1edit.submitForm()
    //     this.editInfoForm.evaluateDesc = this.dataComponent
    //     // this.addNewForm.evaluateDesc = this.$refs.textTrs1.submitForm()
    //     this.showTextTrs = false
    //     this.dialogCompontedit = false
    //     // return this.dataComponent

    // },

    // //添加分值等级
    // editEvaluateScore() {
    //     if (this.editInfoForm.evaluateScore) {
    //         this.dataTrs = this.editInfoForm.evaluateScore
    //     } else {
    //         this.dataTrs = ''
    //     }
    //     this.showTextTrs = true
    //     this.dialogEvaluateScoreedit = true
    // },
    // //评价分值提交
    // editevaluateScoreSubmit() {
    //     this.dataEvaluateScore = this.$refs.textTrs2edit.submitForm()
    //     this.editInfoForm.evaluateScore = this.dataEvaluateScore
    //     this.showTextTrs = false
    //     this.dialogEvaluateScoreedit = false
    //     // return this.dataComponent
    // },
    //标准信息编辑提交
    submitEdit(info) {
      this.$refs.editInfoForm.validate(valid => {
        if (valid) {
          if (this.filePath) {
            this.editInfoForm.attachCode = this.filePath;
          }
          let params = this.editInfoForm;
          guidelines_edit(params).then(() => {
            // window.location.reload();
            this.getList();
          });
        }
      });
    },
    //标准信息删除
    delInfo(scope) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          guidelines_delInfo(scope.row.id)
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getList();
            })
            .catch(() => {
              this.$message({
                type: "warning",
                message: "删除失败"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消删除"
          });
        });
    },
    /** 评价体系编辑 */
    evaluate(info) {
      this.dialogEvaluate = true;
      this.evaluateForm = JSON.parse(JSON.stringify(info));
    },
    /** /添加评价等级*/
    editEvaluateDesc() {
      if (this.evaluateForm.evaluateDesc) {
        this.dataTrs = this.evaluateForm.evaluateDesc;
      } else {
        this.dataTrs = "";
      }
      this.showTextTrs = true;
      this.dialogCompontedit = true;
      // this.addNewForm.evaluateDesc = this.componentSubmit()
    },
    /** /评价描述提交*/
    editcomponentSubmit() {
      this.dataComponent = this.$refs.textTrs1edit.submitForm();
      this.evaluateForm.evaluateDesc = this.dataComponent;
      // this.addNewForm.evaluateDesc = this.$refs.textTrs1.submitForm()
      this.showTextTrs = false;
      this.dialogCompontedit = false;
      // return this.dataComponent
    },

    /** /添加分值等级*/
    editEvaluateScore() {
      if (this.evaluateForm.evaluateScore) {
        this.dataTrs = this.evaluateForm.evaluateScore;
      } else {
        this.dataTrs = "";
      }
      this.showTextTrs = true;
      this.dialogEvaluateScoreedit = true;
    },
    /** 评价分值提交*/
    editevaluateScoreSubmit() {
      this.dataEvaluateScore = this.$refs.textTrs2edit.submitForm();
      this.evaluateForm.evaluateScore = this.dataEvaluateScore;
      this.showTextTrs = false;
      this.dialogEvaluateScoreedit = false;
      // return this.dataComponent
    },
    /** 指标赋分体系内容提交 */
    evaluateSubmit() {
      let params = this.evaluateForm;
      guidelines_edit(params).then(() => {
        this.dialogEvaluate = false;
        // window.location.reload()
        this.getList();
      });
    },
    xmlUpload(info) {
      //上传调查问卷xml文件
      this.dialogXml = true;
      this.xmlId = info.id;
    },
    uploadTemplateDta(file) {
      //文件流
      this.xmlFile = file;
    },
    submitXmlFile() {
      //提交导入的数据
      var form = new FormData();
      form.append("file", this.xmlFile.file);
      form.append("guidelinesId", this.xmlId);
      form.append("srcType",2)
      xmlSubmit(form)
        .then(res => {
          this.dialogXml = false;
        })
        .catch(err => {
          console.log(err);
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

    //地区选择方法
    regionSelect(data) {
      this.region.province = data.province.value;
      this.region.city = data.city.value;
      console.log(this.region);
    },

    //文件下载功能
    downLoadFile(info) {
      getFileByCode(info.attachCode).then(res=>{
        console.log(res)
        window.open(res.data.data);
      })
      
    },

    //文件上传功能
    // upload() {
    //   const loading = this.$loading({
    //     lock: true,
    //     text: "文件上传中...",
    //     spinner: "el-icon-loading",
    //     background: "rgba(0, 0, 0, 0.7)"
    //   });
    //   var fileObj = document.getElementById("file").files; // js 获取文件对象
    //   var form = new FormData();
    //   form.append("file", this.file);
    //   if (fileObj.length != 0) {
    //     var i = fileObj.length;
    //     this.counts = i;
    //     var that = this;
    //     for (var j = 0; j < i; j++) {
    //       (function(i) {
    //         form.append("file", fileObj[i]); // 文件对象
    //       })(j);
    //     }
    //   }
    //   uploadFileRequest(form)
    //     .then(res => {
    //       // console.log(res, "文件上传成功");
    //       loading.close();
    //       this.filePath = res.data.data.url;
    //     })
    //     .catch(err => {
    //       loading.close();
    //       console.log(err);
    //       this.$message("上传失败！");
    //     });
    // },
    upload(file) {
        const loading = this.$loading({
          lock: true,
          text: "文件上传中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        var form = new FormData();
        form.append("file", file.file);
        form.append("srcType",1)
        uploadFileRequest(form)
            .then(res => {
              console.log(res)
                loading.close();
                file.status = "success";
                this.filePath = res.data.data.fileCode;
            })
            .catch(err => {
                loading.close()
                console.log(err);
                this.$message("上传失败！");
            });
    },
    //文件上传功能
    uploadEdit() {
      const loading = this.$loading({
          lock: true,
          text: "文件上传中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        var form = new FormData();
        form.append("file", file.file);
        form.append("srcType",1)
        uploadFileRequest(form)
            .then(res => {
                loading.close();
                file.status = "success";
                this.filePath = res.data.data.fileCode;
            })
            .catch(err => {
                loading.close()
                console.log(err);
                this.$message("上传失败！");
            });
    }
  }
};
</script>
<style scoped>
</style>