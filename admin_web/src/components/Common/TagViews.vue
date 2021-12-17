<template>
    <div class="_tag">
      <el-scrollbar style="margin-right: 6px;">
        <div class="left">
          <el-button @click="toIndex" class="tag-title-index">首页</el-button>
          <el-tag
            v-for="tag in tagsList"
            :key="tag.title"
            :closable="!tag.hideclose"
            :type="isActive(tag)"
            @close="handleCloseTag(tag)"
          >
            <router-link :to="tag.path" class="tag-title">{{ tag.title }}</router-link>
          </el-tag>
        </div>
      </el-scrollbar>
   
      <el-dropdown @command="handleCloseBtn" class="_dropdown">
        <!-- <el-button type="primary" size="small">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button> -->
        <i class="el-icon-arrow-down el-icon--right"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="closeOther">关闭其它</el-dropdown-item>
          <el-dropdown-item command="closeAll">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </template>
  <style lang="scss">
  ._tag {
    // border: 1px solid green;
    flex: 0 0 40px;
    display: flex;
    align-items: center;
    background-color: white;
    border-bottom: 1px solid #e6e6e6;
    justify-content: space-between;
    .left {
      display: flex;
      height: 40px;
      align-items: center;
      .el-tag {
        margin-left: 6px;
        .tag-title {
          color: black;
          padding: 8px 2px;
          text-decoration: none;
        }
      }
    }
    ._dropdown {
      height: 40px;
      display: flex;
      align-items: center;
      background-color: white;
      box-shadow: rgba(0, 0, 0, 0.1) -3px 0px 15px 3px;
      padding: 0 5px;
    }
    .tag-title-index {
      margin-left: 6px;
      font-size: 10px;
      color:  black;
      padding: 8px 2px;
      background-color: #ecf5ff;
      border: 1px solid #d9ecff;
    }
    .tag-title-index:active {
      margin-left: 6px;
      font-size: 10px;
      color:  black;
      padding: 8px 8px;
      background-color: #ecf5ff;
      border: 1px solid #d9ecff;
      border-radius: 4px;
      text-decoration: none;
      height: 40px;
    }
  }
  </style>
   
  <script>
  export default {
    data() {
      return {
        tagsList: []
      };
    },
    mounted() {
      this.setTags(this.$route);
      // console.log("this.$route:", this.$route);
    },
    methods: {
      //设置标签
      setTags(route) {
        const isExsit = this.tagsList.some(item => {
          return item.path === route.fullPath;
        });
        if (isExsit == false) {
          this.tagsList.push({
            title: route.meta.title, //标签名
            name: route.name, //路由里的name对应vue页的name,标签列表里的name可以做vue页面缓存
            path: route.fullPath, //路由
            hideclose: route.meta.hideclose ? route.meta.hideclose : false //是否隐藏关闭
          });
        }
      },
      //关闭标签
      handleCloseTag(tag) {
        this.tagsList.splice(this.tagsList.indexOf(tag), 1);
        // array.splice(index,howmany) 从索引为index处删除howmany个元素
        if (this.tagsList.length > 0) {
          this.$router.push(this.tagsList[this.tagsList.length - 1].path);
        } else {
          // this.$router.push("/index");
          // this.$router.push({ name: "sadmasMain" });
        }
      },
      //关闭功能按钮
      handleCloseBtn(command) {
        if (command == "closeOther") {
          //关闭其它,保留没有删除的标签。find() 方法返回通过测试（函数内判断）的数组的第一个元素的值。
          var activeTag = this.tagsList.find(item => {
            return item.path == this.$route.fullPath;
          }); //查找第一个满足的
          var noCloseTags = this.getNoCloseTabs();
          if (
            noCloseTags.some(item => {
              return item.path == activeTag.path && item.title == activeTag.title;
            }) == false
          ) {
            //不包含
            noCloseTags = noCloseTags.concat(activeTag);
          }
          this.tagsList = noCloseTags;
        } else if (command == "closeAll") {
          //关闭所有,保留没有删除的标签
          this.tagsList = this.getNoCloseTabs();
          this.$router.push(this.tagsList[this.tagsList.length - 1].path);
        }
      },
      getNoCloseTabs() {
        //获取没有删除的标签
        var noCloseList = this.tagsList.filter(item => {
          return item.hideclose == true;
        });
        return noCloseList;
      },
      //是否选中
      isActive(tag) {
        if (tag.path == this.$route.fullPath) {
          return "";
        } else {
          return "info";
        }
      },
      //跳转首页
      toIndex(){
        this.$router.push({ name: "biaozhunku" });
      }
    },
    watch: {
      //路由变化,设置标签
      $route(newValue, oldValue) {
        this.setTags(newValue);
      }
    }
  };
  </script>