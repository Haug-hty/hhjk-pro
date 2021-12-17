<template>
    <main>
        <el-table :data="tableData" stripe style="width: 100%;font-size: 12px;text-align: center;">
            <el-table-column type='index' label="序号" width="50" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="type" label="类别" width="100" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="name" label="文件名" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="author" label="作者" width="260" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="source" label="来源" width="150" align="center" header-align="center">
            </el-table-column>
            <el-table-column prop="date" label="发布日期" width="150" align="center" header-align="center">
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="300" align="center" header-align="center">
                <template slot-scope="scope">
                    <el-button size="small" type="primary" plain>查看</el-button>
                    <!-- <el-button @click="delInfo(scope)" size="small" type="danger">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
    </main>
</template>
<script></script>
<style></style>