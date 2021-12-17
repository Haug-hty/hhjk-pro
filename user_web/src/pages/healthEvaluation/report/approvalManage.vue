<!-- 审批报告管理页面 -->

<template>
  <main>
    <div style="height: 60px; padding: 15px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
    <el-row style="text-align:left;margin-top: -6px;">
            <el-form
        :inline="true"
        :model="formInline"
        
      >
        <el-form-item label="名称:">
          <el-input v-model="formInline.fileName" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchTableList" size="small">查询</el-button>
          <el-button type="primary" @click="reset" size="small" plain>重置</el-button>
          <el-button type="success" @click="addNew" size="small">新增</el-button>
        </el-form-item>
      </el-form>
    </el-row>

</div>
    
    <el-table :data="tableData" stripe style="width: 100%;font-size: 12px;text-align: center;" :header-cell-style="{background:'#eef1f6',color:'#606266',fontSize:'14px',borderBottom:'1px solid #000'}">
      <el-table-column type="index" label="序号" width="100" align="center" header-align="center"></el-table-column>
      <el-table-column prop="name" label="报告名称" align="center" header-align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="byUnit" label="编制单位" align="center" header-align="center" :show-overflow-tooltip="true"></el-table-column>

      <el-table-column fixed="right" label="操作" width="120" align="center" header-align="center">
        <template slot-scope="scope">
          <el-button @click="downLoadFile(scope.row)" size="small" type="text">下载</el-button>
          <!-- <el-button size="small" type="primary" plain>查看</el-button> -->
          <el-button @click="delInfo(scope)" size="small" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
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
    <!-- 新增审批报告 -->
    <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="dialogFormVisible" title="审批报告新增">
      <el-row :gutter="15">
        <el-form :model="addNewForm" ref="addNewForm" :rules="addNewRules">
          <el-col :span="20">
            <el-form-item label="报告名称:" :label-width="formLabelWidth" prop="name">
              <el-input v-model="addNewForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
                        <el-form-item label="方案:" :label-width="formLabelWidth" prop="assessSchemeId" required>
                            <el-select v-model="addNewForm.assessSchemeId" placeholder="请选择河湖类别" clearable :style="{width: '100%'}">
                                <el-option v-for="item in assessSchemeOption" :key="item.id" :label="item.name"
                                    :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
          </el-col>-->
          <el-col :span="20">
            <el-form-item label="编制单位:" :label-width="formLabelWidth" prop="author">
              <el-input v-model="addNewForm.byUnit" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="报告时间:" :label-width="formLabelWidth" prop="reportTime">
              <el-date-picker
                v-model="addNewForm.reportTime"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :style="{width: '100%'}"
                placeholder="请选择日期选择"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="20">
            <el-form-item label="文件上传：" :label-width="formLabelWidth" prop>
              <!-- <input type="file" id="file" size="50" @change="upload"> -->
              <el-upload class="upload-demo" ref="upload" action 
                     :http-request="uploadFunction">
                     <el-button size="small" type="primary">上传</el-button>
                    <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            
          </el-col>
          
        </el-form>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('addNewForm'),dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddInfo(addNewForm)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑审批报告 -->
  </main>
</template>

<script>
import { dict_search_domain } from "@/api/dict/index";
import { uploadFileRequest, getFileByCode} from "@/api/file/index";
import {
  approval_report_submit,
  report_tableList_query,
  scientific_delInfo
} from "@/api/report/index";
import { scheme_tableList_query } from "@/api/scheme/index";
export default {
  name: "approvalManage",
  data() {
    return {
      formInline: {
        fileName: "",
        industry: ""
      },
      tableData: [],
      dialogFormVisible: false, //新增dialog弹窗控制器
      addNewForm: {},
      formLabelWidth: "120px",
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      filePath: "", //文件上传地址
      assessSchemeOption: [],
      addNewRules: {
        name: [{ required: true, trigger: "blur", message: "不能为空" }]
      }
    };
  },
  created() {
    this.schemeTabelList();
    this.searchTableList(); //列表初始化查询
  },
  methods: {
    //方案列表查询
    schemeTabelList() {
      let params = {
        pageSize: 100,
        pageNum: 1
      };
      scheme_tableList_query(params).then(res => {
        this.assessSchemeOption = res.data.data.list;
      });
    },

    //列表信息查询
    searchTableList() {
      let params = {
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.current
      };
      report_tableList_query(params).then(res => {
        this.tableData = res.data.data.list;
        this.pagination.total = res.data.data.total;
        this.tableData.forEach(item => {
          this.assessSchemeOption.forEach(scheme => {
            if (scheme.id == item.assessSchemeId) {
              item.schemeName = scheme.name;
            }
          });
        });
      });
    },
    //重置
    reset() {
      this.formInline.fileName = "";
      this.formInline.industry = "";
      this.searchTableList();
    },
    //新增审批报告
    addNew() {
      this.dialogFormVisible = true;
      //新增form表单内容重置
      this.addNewForm = {};
    },
    /** 表单校验重置 */
    cancel(formName) {
      this.$refs[formName].resetFields();
    },
    uploadFunction(file) {
        var form = new FormData();
        form.append("file", file.file);
        form.append("srcType",3)
        uploadFileRequest(form)
            .then(res => {
                file.status = "success";
                this.filePath = res.data.data.fileCode;
            })
            .catch(err => {
                // loading.close()
                console.log(err);
                this.$message("上传失败！");
            });
    },
    //新增审批报告提交
    submitAddInfo(info) {
      this.$refs.addNewForm.validate(valid => {
        if (valid) {
          this.addNewForm.fileCode = this.filePath;
          console.log(this.addNewForm);
          
          approval_report_submit(this.addNewForm)
            .then(() => {
              this.$message({
                type: "success",
                message: "新增审批报告成功"
              });
              this.dialogFormVisible = false;
              this.searchTableList();
            })
            .catch(() => {
              this.$message({
                type: "error",
                message: "新增审批报告失败"
              });
            });
        }
      });
    },

    //删除审批报告
    delInfo(scope) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          scientific_delInfo(scope.row.id)
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.searchTableList();
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
    //文件下载功能
    downLoadFile(info) {
      getFileByCode(info.fileCode).then(res=>{
                    console.log(res)
                    window.open(res.data.data);
                })
    }
  }
};
</script>
<style scoped>
</style>