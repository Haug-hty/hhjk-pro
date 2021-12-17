<template>
    <div id="app">
      <div style="position: fixed;top: 0; height: 60px; width: 100%;">
        <div style="width: 100%; height: 100%; display: block; box-shadow: 2px 2px 5px rgb(0 0 0 / 20%);">
          <!-- <div style="background: url('../../img/top_bg.95a2ba7.png');height: 100%;"> -->
            <div style="background-color: black;height: 100%;">
            <!-- <img src="~@/assets/top_bg.png" alt=""> -->
            <div style="display: flex; height: 100%;">
              <div style="width: 300px; padding-left: 20px; height: 100%; align-items: center;">
                <h3 style="color: white; height: 100%; display: flex; align-items: center; margin: 0px; padding: 0px;">
                  河湖健康后台管理系统</h3>
              </div>
              <div style="display: flex; align-items: center;">
                <ul style="display: inline-block;">
                  <!-- <span>
                    <router-link to="/map" tag="li">地图信息</router-link>
                  </span> -->
                  <span>
                    <router-link to="/standardLibraryPage/biaozhunku" tag="li">指标规范管理</router-link>
                  </span>
                  <span>
                    <router-link to="/healthManage/suggestion" tag="li">知识库管理</router-link>
                  </span>
                  <span>
                    <router-link to="" tag="li">专家库管理</router-link>
                  </span>
                  <span>
                    <router-link to="" tag="li">地图管理</router-link>
                  </span>
                  <span>
                    <router-link to="" tag="li">评价算法管理</router-link>
                  </span>
                  <span>
                    <router-link to="" tag="li">模型算法管理</router-link>
                  </span>
                  <span>
                    <router-link to="/system" tag="li">系统管理</router-link>                   
                  </span>
                </ul>
              </div>
              <div style="display: flex;align-items: center;margin-left: 350px;">
                <i class="el-icon-user-solid" style="color: blanchedalmond;"></i>
                &nbsp;
                <h4 style="color: white; height: 100%; display: flex; align-items: center; margin: 0px; padding: 0px;">管理员</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main style="padding-top: 60px;">
        <router-view />
      </main>
    </div>
  </template>
  
  <script>
      export default {
      name: 'index'
    }
  </script>
  
  <style scoped>
    span {
      color: white;
    }
  
  
    h3 {
      color: white;
      height: 100%;
      display: flex;
      align-items: center;
      margin: 0px;
      padding: 0px;
    }
  
  
  
    ul {
      list-style: none;
      background-color: transparent;
      display: flex;
      position: relative;
      margin: 0;
      padding-left: 0;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 40px;
    }
  
    li {
      font-size: 16px;
      color: white;
      padding: 0 20px;
      cursor: pointer;
      transition: border-color .3s, background-color .3s, color .3s;
      box-sizing: border-box;
      height: 56px;
      line-height: 56px;
      position: relative;
      white-space: nowrap;
      list-style: none;
      display: inline;
    }
  
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      height: 100%;
      width: 100%;
    }
  </style>