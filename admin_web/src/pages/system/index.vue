<template>
    <div class="page">
        <div class="left">
            <el-menu default-active="/system/index" class="el-menu-vertical-demo"
                 style="text-align: left;" router>
                <el-menu-item index="/system/organization">
                    <i class="el-icon-menu"></i>
                    <span slot="title">组织机构管理</span>
                </el-menu-item>
                <!-- <el-menu-item index="/system/team">
                    <i class="el-icon-menu"></i>
                    <span slot="title">小组管理</span>
                </el-menu-item> -->
                <el-menu-item index="/system/user">
                    <i class="el-icon-menu"></i>
                    <span slot="title">用户管理</span>
                    <!-- <router-link to="/indicatorsManagePage/riverHealthEvaluation" tag='span'>河流健康评价指标</router-link> -->
                </el-menu-item>
                
                <el-menu-item index="/system/role">
                    <i class="el-icon-menu"></i>
                    <span slot="title">角色管理</span>
                    <!-- <router-link to="/indicatorsManagePage/indexScoringManagement" tag='span'>指标赋分管理</router-link> -->
                </el-menu-item>
                <el-menu-item index="/system/userOrg">
                    <i class="el-icon-menu"></i>
                    <span slot="title">机构用户</span>
                </el-menu-item>

            </el-menu>

        </div>
        <div class="right">

            <router-view>

            </router-view>

        </div>

    </div>

</template>
<script>
    export default {

    }
</script>
<style scoped>
    .page {

        display: flex;



    }

    .left {

        width: 200px;

        min-height: 400px;

        border-right: 1px solid #eee;

    }

    .right {
        flex: 1;
        width: 88%;
    }
</style>