<template>
    <main class="page">
        <div class="left">
            <br>
            <el-select v-model="object" placeholder="请选择" @change="bgxz"
                style="padding-bottom: 20px;padding-left: 10px;">
                <el-option label="河湖健康技术报告" value="河湖健康技术报告"></el-option>
                <el-option label="河湖（简报）" value="河湖（简报）"></el-option>
                <el-option label="河湖健康状况报告" value="河湖健康状况报告"></el-option>
            </el-select>
            <!-- accordion 同级展示一个 -->
            <el-tree :data="data"  :props="defaultProps" @node-click="getCurrentNode"></el-tree>

        </div>
        <div class="right">
            <br>
            <h2 style="text-align: center;">{{headerMessage}}</h2>
            <div>
                <el-card>
                    <Editor v-model="article.content" style="height: 500px;"/>

                </el-card>
                <el-button type="primary" style="margin-right: 0px;">保存</el-button>
                <el-button type="success" style="margin-right: 0px;">报告导出</el-button>

            </div>
        </div>

    </main>

</template>
<script>
    export default {
        name: "",
        data() {
            return {
                headerMessage: '点击左侧树选择标题',
                object: '',
                article: {
                    content: null
                },
                data: [],
                data1: [
                    {
                        label: '1.概述',
                        children: [{
                            label: '1.1.工作背景'
                        },
                        {
                            label: '1.2.区域水系'
                        },
                        {
                            label: '1.3.评估河流概况'
                        },
                        {
                            label: '1.4.主要工作内容'
                        },
                        {
                            label: '1.5.评估工作路线'
                        },
                        ]
                    },
                    {
                        label: '2.基础数据收集与野外调查',
                        children: [{
                            label: '2.1.调查频次及站点设定',
                        },
                        {
                            label: '2.2.调查内容',
                        },
                        {
                            label: '2.3.相关指标检测方法',
                            children: [{
                                label: '2.3.1.水质指标'
                            }, {
                                label: '2.3.2.底泥指标'
                            }, {
                                label: '2.3.3.生物指标'
                            },
                            ]
                        },]

                    }, 
                    {
                        label: '3.河流将康状况评估',
                        children: [{
                            label: '3.1.自然生态',

                        }, {
                            label: '3.2.服务功能',
                            children: [{
                                label: '三级 3-2-1'
                            }]
                        }, {
                            label: '3.3.干扰程度',                            
                        }, {
                            label: '3.4.管理水平',                            
                        }, {
                            label: '3.5.健康评估结果',                            
                        }, {
                            label: '3.6.河流健康主要问题',                            
                        }]
                    },
                    {
                        label: '4.结论与建议',
                        children: [{
                            label: '4.1.结论',

                        }, {
                            label: '4.2.建议',
                            
                        }]
                    }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        methods: {
            getCurrentNode(data) {
                console.log(data);
                if (data.label) {
                    this.headerMessage = data.label
                } else {
                    this.headerMessage = '点击左侧树选择标题'
                }
            },
            bgxz() {
                if (this.object == '河湖健康技术报告') {
                    this.data = this.data1
                } else {
                    this.data = []
                }
            }
        }
    }
</script>
<style>
    .page {

        display: flex;



    }

    .left {

        width: 300px;

        min-height: 400px;

        border-right: 1px solid #eee;

    }

    .right {
        flex: 1;
        width: 88%;
    }
</style>