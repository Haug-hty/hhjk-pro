<template>
    <div class="page">
        <div class="left">
            <el-menu default-active="/standardLibraryPage/biaozhunku" class="el-menu-vertical-demo" 
                 style="text-align: left;" router>
                <el-menu-item index="/standardLibraryPage/biaozhunku">
                    <i class="el-icon-menu"></i>
                    <span slot="title">标准规范管理</span>
                    <!-- <router-link to="/indicatorsManagePage/riverHealthEvaluation" tag='span'>河流健康评价指标</router-link> -->
                </el-menu-item>
                <el-submenu>
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span slot="title">指标体系管理</span>

                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/standardLibraryPage/zbtx">指标查询</el-menu-item>
                        <el-menu-item index="/standardLibraryPage/objectEdit">体系指标内容</el-menu-item>


                    </el-menu-item-group>
                    <!-- <router-link to="/indicatorsManagePage/evaluationIndexManagement" tag='span'>评价指标管理</router-link> -->
                </el-submenu>
                <el-submenu index='2'>
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span slot="title">指标细则管理</span>

                    </template>
                    <el-menu-item-group>
                        <!-- <el-menu-item index="/standardLibraryPage/hhztpj">综合评价标准</el-menu-item> -->
                        <el-menu-item index="/standardLibraryPage/zbpj">指标赋分评价</el-menu-item>
                        <el-menu-item index="/standardLibraryPage/picPoint">照片指标项</el-menu-item>

                    </el-menu-item-group>
                    <!-- <router-link to="/indicatorsManagePage/evaluationIndexManagement" tag='span'>评价指标管理</router-link> -->
                </el-submenu>
                
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

        width: 13vw;

        min-height: 400px;

        border-right: 1px solid #eee;

    }

    .right {
        flex: 1;
        width: 87vw;
    }
</style>