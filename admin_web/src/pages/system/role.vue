// 角色管理页面
<template>
  <div>
    <div style="height: 60px; padding: 15px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
      <el-form :inline="true">
            <el-form-item label="角色名称">
              <el-input
                v-model="queryParams.roleName"
                placeholder="请输入角色名称"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                class="filter-item"
                type="primary"
                icon="el-icon-search"
                size="mini"
                @click="handleQuery"
              >搜索</el-button>
              <el-button
                class="filter-item"
                type="primary"
                icon="el-icon-plus"
                size="mini"
                @click="handleAdd"
              >新增</el-button>
            </el-form-item>
          </el-form>
    </div>
    

    <el-table
      :data="roleList"
      row-key="id"
      default-expand-all
      stripe
      style="width: 100%;font-size: 12px;text-align: center;"
    >
      <el-table-column type="index" label="序号" width="80" align="center" header-align="center"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" align="center" header-align="center"></el-table-column>
      <el-table-column prop="remark" label="备注" width="200" align="center" header-align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" header-align="center"></el-table-column>
      <el-table-column
        label="操作"
        align="center"
        header-align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-circle-check"
            @click="handleDataScope(scope.row)"
          >数据权限</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end">
      <el-pagination
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryParams.pageSize"
        :total="total"
        layout="prev,pager,next,jumper,total,sizes"
      ></el-pagination>
    </el-row>

    <!-- 添加或修改角色对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="50%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="160px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="form.roleName" placeholder="请输入角色名称" maxlength="30"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入备注" maxlength="50"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述" prop="description">
              <el-input v-model="form.description" placeholder="请输入角色描述信息" maxlength="500"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色数据权限对话框 -->
    <el-dialog :title="title" :visible.sync="openDataScope" width="500px" accordion="true" check-on-click-node="true">
      <el-form :model="form" label-width="80px">
        <!-- <el-form-item label="角色名称">
          <el-input v-model="form.roleName" :disabled="true" />
        </el-form-item> -->
        
        <el-form-item label="数据权限">
          <el-tree
            :data="deptOptions"
            show-checkbox
            default-expand-all            
            node-key="nodeId"
            ref="dept"
            empty-text="加载中，请稍后"
            @check="nodeClick"
          ></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDataScope">确 定</el-button>
        <el-button @click="cancelDataScope">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listRole, updateRole, addRole, delRole, getRolePermission,dataScope } from "@/api/system/role.js";
import { sysMenuList } from "@/api/mian/index";
export default {
  name: "Role",
  data() {
    return {
      // 表格数据
      roleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层（数据权限）
      openDataScope: false,
      // 查询参数
      queryParams: {
        organizationName: undefined,
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      // 部门列表
      deptOptions: [],
      listHelp:[],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        roleName: [{ required: true, message: "角色名不能为空", trigger: "blur" }],        
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询机构列表 */
    getList() {
      listRole(this.queryParams).then(response => {
        this.roleList = response.data.data.list;
        this.total = response.data.data.size;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {};
    //   this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      this.open = true;
      this.title = "添加角色";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.form = JSON.parse(JSON.stringify(row));
      this.open = true;
      this.title = "修改角色";
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateRole(this.form).then(response => {
              if (response.data.code === 0) {
                this.$message("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.$message(response.data.msg);
              }
            });
          } else {
            addRole(this.form).then(response => {
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
    /** 分配数据权限操作 */
    handleDataScope(row) {
        this.reset();
      
        this.form.roleId = row.id;
        this.openDataScope = true;
        this.title = row.roleName +"--数据权限分配";
        this.deptOptions=[]
        let i = 1
        this.listHelp =[]
        getRolePermission(row.id).then(response=>{
          if(response.data.code == 0){
              let nodeIdArr =[]
              response.data.data.forEach(item => {
                  let children1 = []
                  let params ={
                      label:item.name,
                      add:false
                  }
                  if(item.mpList){                    
                      item.mpList.forEach(mp=>{
                          let param = {
                              label:mp.name,
                              domain:mp.domain,
                              code: mp.code,
                              add:mp.add,
                              del:mp.del,
                              id:mp.id,
                              nodeId:mp.domain+mp.code
                          }
                          if(mp.id){
                              nodeIdArr.push(param.nodeId)
                              this.listHelp.push(mp)
                          }
                          children1.push(param)
                      })

                  }
                  params = Object.assign(params,{children:children1})                
                  this.deptOptions.push(params)                
              });
              this.$nextTick(function() {
                  this.$refs['dept'].setCheckedKeys(nodeIdArr)
              })
          }
            
            
        })
    },
    nodeClick(val){
      if(val.children){
        for(let i =0; i<val.children.length;i++){
          if(val.children[i].id==undefined){
            val.add = !val.add
            break
          }
        }
        if(val.add){
          val.children.forEach(a=>{
            if(a.id){
            } else {
                a.add = !a.add
            }
          })
        } else {
          val.children.forEach(item=>{
            if(item.id){
                item.del = !item.del
                this.listHelp.forEach(hl=>{
                    if(hl.id == item.id){
                        hl.del =!hl.del
                    }
                })
            } else {
                item.add = !item.add
            }
          })
        }
      } else{
        if(val.id){
            val.del = !val.del
            this.listHelp.forEach(item=>{
                if(item.id == val.id){
                    item.del =!item.del
                }
            })
        } else {
            val.add = !val.add
        }
      }
        console.log(val)
    },
     /** 提交按钮（数据权限） */
    submitDataScope: function() {
        if (this.form.roleId != undefined) {
            this.form.authList = this.getDeptAllCheckedKeys();
            this.listHelp.forEach(item=>{
                if(item.del==true){
                    this.form.authList.push(item)
                }
        })
        dataScope(this.form).then(response => {
          
          this.$message("角色权限赋值成功！")
          this.openDataScope = false
        })
        .catch(err=>{
          console.log(err)

        });
      }
    },
    // 所有部门节点数据
    getDeptAllCheckedKeys() {
      let checkedKeys = this.$refs.dept.getCheckedNodes(true,true);
      console.log(checkedKeys)
      return checkedKeys;
    },
    // 取消按钮（数据权限）
    cancelDataScope() {
      this.openDataScope = false;
      this.reset();
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm('是否确认删除名称为"' + row.name + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return delRole(row.id);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
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
    }
  }
};
</script>