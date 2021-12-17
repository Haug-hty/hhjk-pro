<template>
  <div>
    <div style="height: 60px; padding: 15px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
    <el-form :inline="true">
          <el-form-item label="账号名称">
            <el-input v-model="queryParams.userName" placeholder="请输入账号名称" clearable size="small" @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item>
            <el-button class="filter-item" type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索
            </el-button>
            <el-button class="filter-item" type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增
            </el-button>
          </el-form-item>
        </el-form>
    </div>
    

    <el-table :data="userList" row-key="userId" default-expand-all stripe style="width: 100%;font-size: 12px;text-align: center;">
      <el-table-column type='index' label="序号" width="80" align="center" header-align="center">
      </el-table-column>
      <el-table-column prop="username" label="账户名" align="center" header-align="center"></el-table-column>
      <el-table-column prop="tel" label="联系电话" width="200" align="center" header-align="center">
      </el-table-column>
      <el-table-column prop="job" label="职位" align="center" header-align="center"></el-table-column>
      <el-table-column label="操作" align="center" header-align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改
          </el-button>
          <el-button size="mini" type="text" icon="el-icon-key" @click="handleResetPwd(scope.row)">密码修改</el-button>
          <el-dropdown size="mini">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon-d-arrow-right"></i>更多
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item><el-button size="mini" type="text" icon="el-icon-circle-check" @click="handleOrg(scope.row)">添加机构</el-button></el-dropdown-item> -->
              <el-dropdown-item>
                <el-button size="mini" type="text" icon="el-icon-circle-check" @click="handleRole(scope.row)">分配角色</el-button>
                </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                </el-dropdown-item>
          
          
            </el-dropdown-menu>
          </el-dropdown>
          
          
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end">
      <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentChange" :current-page="queryParams.pageNum"
        :page-sizes="[10, 20, 50, 100]" :page-size="queryParams.pageSize" :total="total" layout="prev,pager,next,jumper,total,sizes"></el-pagination>
    </el-row>

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="50%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-row>
          <el-col :span="12" v-if="userInfoToken.type==='superAdmin' && form.type !='superAdmin'">
            <el-form-item label="归属机构" prop="orgId">
              <el-select v-model="form.orgId" placeholder="请选择归属机构" clearable style="width: 100%;">
                <el-option v-for="item in orgOptions" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item v-if="form.id == undefined" label="账户名称" prop="username">
              <el-input v-model="form.username" placeholder="请输入账户名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.id == undefined" label="用户密码" prop="pwd">
              <el-input v-model="form.pwd" placeholder="请输入用户密码" type="password" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.id == undefined" label="确认密码" prop="checkPass">
              <el-input type="password" v-model="form.checkPass" placeholder="请再次输入用户密码" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="真实姓名" prop="realName">
              <el-input v-model="form.realName" placeholder="请输入真实姓名" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="tel">
              <el-input v-model="form.tel" placeholder="请输入手机号码" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职位" prop="job">
              <el-input v-model="form.job" placeholder="请输入职位" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="form.comments" type="textarea" placeholder="请输入备注" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改用户-角色信息 -->
    <el-dialog :title="title" :visible.sync="openRole" width="50%" append-to-body>
      <el-form  :model="roleForm"  label-width="140px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="分配角色" prop="roleId">
              <el-select v-model="roleForm.roleId" placeholder="请选择角色" clearable style="width: 100%;">
                <el-option v-for="item in roleOption" :key="item.id" :label="item.roleName" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitRoleForm">确 定</el-button>
        <el-button @click="openRole = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { addUser, listUser, updateUser, delUser, resetUserPwd, userInfo ,getUserRole, userRoleSave} from "@/api/system/user"
  import { listOrganization } from "@/api/system/organization";
  import { listRole } from "@/api/system/role";

  export default {
    name: "User",
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        // 表格数据
        userList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          userName: undefined,
          pageNum: 1,
          pageSize: 10,
        },
        total: 0,
        // 表单参数        
        form: {},
        // 当前用户信息
        userInfoToken: '',
        // 表单校验
        checkPass: '',
        rules: {
          orgId:[
          { required: true, message: "归属机构不能为空", trigger: "blur"}
          ],
          username: [
            { required: true, message: "账户名不能为空", trigger: "blur" }
          ],
          realName: [
            { required: true, message: "真实姓名不能为空", trigger: "blur" }
          ],
          pwd: [
            { required: true, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, required: true, trigger: 'blur' }
          ],
          tel: [
            { required: true, message: "联系电话不能为空", trigger: "blur" },
            {
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: "请输入正确的手机号码",
              trigger: "blur"
            }
          ],
        },
        /** 组织机构选项 */
        orgOptions:[],
        /** 角色选择 */
        openRole:false,
        /** 角色选项 */
        roleOption:[],
        /** 用户角色表单 */
        roleForm:{},
      };
    },
    created() {
      this.getList()
      this.getUserInfo()
      this.getRoleList()
    },
    methods: {
      // 查询当前登录用户信息
      getUserInfo() {
        userInfo()
          .then(response => {
            this.userInfoToken = response.data.data
            if(this.userInfoToken.type === 'superAdmin'){
              this.getOrgList()
            } else [
              this.form.orgId = this.userInfoToken.orgId
            ]
          });
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
      /** 查询用户列表*/ 
      getList() {
        listUser(this.queryParams).then(response => {
          this.userList = response.data.data.list;
          this.total = response.data.data.total
        });
      },
      /** 查询角色列表*/ 
      getRoleList() {
        let params = {
          pageNum: 1,
          pageSize: 100,
        }
        listRole(params).then(response => {
          this.roleOption = response.data.data.list;
        });
      },
      /** 取消按钮*/ 
      cancel() {
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          tel: undefined,
          username: undefined,
          pwd: undefined,
          checkPass: undefined,
          realName: undefined,
          comments: undefined
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
        this.title = "添加用户"
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset()
        this.form = JSON.parse(JSON.stringify(row));
        this.form.checkPass = row.pwd
        this.open = true;
        this.title = "修改用户";
      },
      /** 提交按钮 */
      submitForm: function () {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != undefined) {
              updateUser(this.form).then(response => {
                if (response.data.code === 0) {
                  this.$message("修改成功");
                  this.open = false;
                  this.getList();
                } 
              });
            } else {
              addUser(this.form).then(response => {
                if (response.data.code === 0) {
                  this.$message("新增成功");
                  this.open = false;
                  this.getList();
                } 
              });
            }
          }
        });
      },
      /** 重置密码按钮操作 */
      handleResetPwd(row) {
        this.$prompt('请输入"' + row.username + '"的新密码', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputValidator: (value) => {       // 点击按钮时，对文本框里面的值进行验证
            if (!value) {
              return '密码不能为空';
            } else if (value.length < 6 || value.length > 30) {
              return '密码长度为6~30位';
            }
          },
        }).then(({ value }) => {
          let params = {
            id: row.id,
            pwd: value
          }
          resetUserPwd(params).then(response => {
            if (response.code === 0) {
              this.$message("修改密码成功!");
            } else {
              this.$message(response.data.data);
            }
          });
        }).catch(() => { });
      },
      /** 用户-分配角色操作 */
      handleRole(row){
        this.roleForm = {}        
        this.title = row.username +" 用户角色分配"
        this.roleForm.userId = row.id
        let params = {
          pageNum: 1,
          pageSize: 100,
          userId:row.id
        }
        getUserRole(params).then(res=>{
          if(res.data.data.list.length != 0){
              this.roleForm = res.data.data.list[0]
          } 

        })
        this.openRole = true
      },
      /** 提交用户角色操作 */
      submitRoleForm(){
        userRoleSave(this.roleForm).then(res=>{
          this.$message("用户分配角色成功！")
          this.openRole = false
        })
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        this.$confirm('是否确认删除名称为"' + row.username + '"的账户数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return delUser(row.id);
        }).then(() => {
          this.getList();
          this.$message("删除成功");
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
    }
  };
</script>
<style scoped>
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    font-size: 12px;
    margin-left:3px; 
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
