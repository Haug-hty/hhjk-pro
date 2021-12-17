<template>
  <el-container class="layout-body">
    <el-aside>
      <div class="title-logo">
        <div class="logo-cls"/>
        <span>{{title}}</span>
      </div>
      <el-menu v-for="(item,index) in menuList" v-bind:key="index" router>
        <el-submenu v-if="item.childrenMenu" :index="item.name">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            {{item.name}}
          </template>
          <div v-for="(menu) in item.childrenMenu" v-bind:key="menu.id">
            <el-menu-item v-if="!menu.childrenMenu" :index="menu.path">{{menu.name}}</el-menu-item>
            <el-submenu v-if="menu.childrenMenu" :index="menu.name">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                {{menu.name}}
              </template>
              <div v-for="(thirdMenu) in menu.childrenMenu" v-bind:key="thirdMenu.id">
                <el-menu-item :index="thirdMenu.path">{{thirdMenu.name}}</el-menu-item>
              </div>
            </el-submenu>
          </div>
        </el-submenu>
        <el-menu-item v-if="!item.childrenMenu" :index="item.path">
          <i class="el-icon-s-order"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <div class="setting-cls">
          <el-dropdown @command="handleCommand">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="person">个人中心</el-dropdown-item>
              <el-dropdown-item command="logoOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <el-dropdown trigger="click">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/user/profile">
                <el-dropdown-item>个人中心</el-dropdown-item>
              </router-link>
              <el-dropdown-item divided @click.native="logout">
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <span>{{username}}</span>
        </div>
      </el-header>
      <tagViews></tagViews>

      <el-main>
        <router-view style="background-color: rgba(255, 255, 255, 1);"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<style lang="scss" scoped>
.layout-body {
  height: 100vh;
}

.el-aside {
  background-color: rgba(255, 255, 255, 1);
  color: #333;
  width: 300px;
  height: calc(100vh);
  text-align: left;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
  line-height: 40px;
}

.el-header {
  background-color: rgba(255, 255, 255, 1);
  color: #333;
  height: 61px;
  line-height: 60px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-bottom: 0.5px solid #eee;
  font-size: 18px;
}
.title-logo {
  text-align: center;
  height: 60px;
  line-height: 60px;
  width: 100%;
  color: rgba(0, 0, 0, 1);
  font-family: Noto Sans SC;
  font-weight: 500;
  font-size: 21.3px;
  border-bottom: 0.5px solid #eee;
  .logo-cls {
    display: inline-block;
    // background: red;
    width: 48px;
    height: 48px;
    background-image: url("../../assets/logo-48.png");
    vertical-align: middle;
  }
}

.header-nav {
  display: inline-block;
  position: relative;
  width: 50%;
}

.setting-cls {
  display: inline;
  position: fixed;
  right: 15px;
}
</style>


<script>
import tagViews from "./TagViews";
import { loginOut } from "@/api/login/login";
import { getUserProfile } from "@/api/system/user.js";
export default {
  name: "layout",
  data() {
    return {
      title: "河湖健康",
      username: "admin",
      menuList: [
        {
          name: "指标规范管理",
          childrenMenu: [
              {
                  id:1,
                  name:"标准规范管理",
                  path:"/biaozhunku"
              },
            {
              name: "指标体系管理",
              childrenMenu: [
                {
                  id: 2,
                  name: "指标查询",
                  path: "/zbtx"
                },
                {
                  id: 3,
                  name: "体系指标内容",
                  path: "/objectEdit"
                },
                {
                  id: 4,
                  name: "指标赋分评价",
                  path: "/zbpj"
                },
                {
                  id: 5,
                  name: "照片指标项",
                  path: "/picPoint"
                }
              ]
            },
            // {
            //   name: "系统管理",
            //   childrenMenu: [
            //     {
            //       id: 4,
            //       name: "指标赋分评价",
            //       path: "/zbpj"
            //     },
            //     {
            //       id: 5,
            //       name: "照片指标项",
            //       path: "/picPoint"
            //     }
            //   ]
            // },
            
          ]
        },
        {
          name: "对象信息管理",
          path:"/rlCompleteInfo"
        },
        {
          name: "知识库管理",
          childrenMenu: [
            {
              id: 6,
              name: "治理建议库",
              path: "/suggestion"
            },
            {
              id: 7,
              name: "科研成果库",
              path: "/keyan"
            },
            {
              id: 8,
              name: "文本资料库",
              path: "/material"
            },
            // {
            //   id: 9,
            //   name: "模版管理",
            //   path: "/templateManagement"
            // },
            
          ]
        },
        {
          name: "系统管理",
          childrenMenu: [
            {
              id: 10,
              name: "组织机构管理",
              path: "/organization"
            },
            {
              id: 11,
              name: "角色管理",
              path: "/role"
            },
            {
              id: 12,
              name: "用户管理",
              path: "/user"
            },
            {
              id: 13,
              name: "用户机构",
              path: "/userOrg"
            },
            {
              id: 14,
              name: "小组管理",
              path: "/team"
            },
            
          ]
        }
      ]
    };
  },
  components: { tagViews },
  created(){
    this.getUser()
  },
  methods: {
    /** 获取当前登录用户信息 */
    getUser() {
      getUserProfile().then(response => {        
        this.username = response.data.data.realName
      });
    },
    /** 设置下拉选触发按钮 */
    handleCommand(command) {
      if (command == "person") {
        this.$router.push({path:"/user/profile"})
      } else if (command == "logoOut") {
        this.logout()
      }
    },
    /** 退出登录 */
    async logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        loginOut().then(() => {
          this.$router.push({ path: "/login" });
        });
      });
    }
  }
};
</script>
