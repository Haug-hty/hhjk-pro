<template>
    <main>
        <div
            style="height: 60px; padding: 15px; background-color: rgb(245, 247, 250); box-shadow: rgb(221 221 221) 0px 0px 10px;box-sizing: border-box;">
            <el-form :inline="true" :model="formInline" style="height: 35px;text-align: left;">
                <el-form-item label="标准编号:">
                    <el-select v-model="formInline.code" placeholder="请选择">
                        <el-option label="DB3205/T 1016-2021" value="DB3205/T 1016-2021"></el-option>
                        <el-option label="DB32/T 3674-2019" value="DB32/T 3674-2019"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标准名称:">
                    <el-select v-model="formInline.name" placeholder="请选择">
                        <el-option label="苏州市河湖健康评价规范" value="苏州市河湖健康评价规范"></el-option>
                        <el-option label="江苏省生态河湖状况评价规范" value="江苏省生态河湖状况评价规范  "></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="目标:">
                    <el-select v-model="formInline.object" placeholder="请选择">
                        <el-option label="河流" value="河流"></el-option>
                        <el-option label="湖泊" value="湖泊"></el-option>
                        <el-option label="水库" value="水库"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
                    <el-button type="primary" @click="reset" size="small" plain>重置</el-button>
                </el-form-item> -->
            </el-form>
        </div>
        <div>
            <br>
            <h2 style="text-align: center;">{{this.formInline.object}}健康评价指标权重赋分</h2>
            <br>
            <table border="1" cellspacing='0' width="90%"  style="margin-left: 5%;">
                
                <tr style="height: 60px;font-size: 16px;background-color: #e6e6e6;">
                    <th>目标层</th>
                    <th>类别层</th>
                    <th>要素层</th>
                    <th>指标层</th>
                </tr>
                <tbody style="text-align: center;font-size: 16px;" v-if="this.formInline.object=='河流'">
                    <tr style="height: 30px;">
                        <td rowspan="21">
                            河流健康指标
                        </td>
                        <td rowspan="9">
                            生态健康（0.4）
                        </td>
                        <td rowspan="2">
                            形态结构（0.2）
                        </td>
                        <td>
                            岸坡稳定性（0.5）
                        </td>
                    </tr>
                    <tr style="height: 30px;">
                        <td>
                            岸坡植被覆盖度（0.5）
                        </td>
                    </tr>
                    <tr style="height: 30px;">
                        <td rowspan="2">
                            水文水资源（0.2）
                        </td>
                        <td>
                            河流流动性（0.5）
                        </td>

                    </tr>
                    <tr style="height: 30px;">
                        <td>
                            生态用水满足程度（0.5）
                        </td>
                    </tr>
                    <tr style="height: 30px;">
                        <td rowspan="2">
                            水质（0.3）
                        </td>
                        <td>
                            水质优劣程度（0.6）
                        </td>

                    </tr>
                    <tr style="height: 30px;">
                        <td>
                            底泥污染状况（0.4）
                        </td>
                    </tr>
                    <tr style="height: 30px;">
                        <td rowspan="3">
                            水生生物（0.3）
                        </td>
                        <td>
                            底栖生物指数（0.4）
                        </td>

                    </tr>
                    <tr style="height: 30px;">
                        <td>
                            浮游植物生物指数（0.3）
                        </td>
                    </tr>
                    <tr style="height: 30px;">
                        <td>
                            着生藻类生物指数（0.3）
                        </td>
                    </tr>
                    <tr style="height: 30px;">
                        <td rowspan="6">服务功能（0.3）</td>
                        <td>防洪（0.2）</td>
                        <td>防洪达标率（-）</td>
                    </tr>
                    <tr style="height: 30px;">
                        <td rowspan="3">用水保障（0.5）</td>
                        <td>水功能区达标率（0.3）（0.5）</td>
                    </tr>
                    <tr style="height: 30px;">
                        <td>供水水量保证率（0.3）（0.5）</td>
                    </tr>
                    <tr style="height: 30px;">
                        <td>供水水量保证率（0.4）（-）</td>
                    </tr>
                    <tr style="height: 30px;">
                        <td rowspan="1">人文景观（0.1）</td>
                        <td>景观舒适度（-）</td>
                    </tr>
                    <tr style="height: 30px;">
                        <td rowspan="1">大众意愿（0.2）</td>
                        <td>公众满意度（-）</td>
                    </tr>
                    <tr style="height: 30px;">
                        <td rowspan="2">干扰程度（0.1）</td>
                        <td>开发利用（0.5）</td>
                        <td>岸线开发利用率（-）</td>
                    </tr>
                    <tr style="height: 30px;">
                        <td>水污染（0.5）</td>
                        <td>入河排污口规范化建设率（-）</td>
                    </tr>
                    <tr style="height: 30px;">
                        <td rowspan="4">管理水平（0.2）</td>
                        <td>空间管控（0.4）</td>
                        <td>管理（保护）范围划定率（-）</td>
                    </tr>
                    <tr style="height: 30px;">
                        <td rowspan="2">环境治理（0.4）</td>
                        <td>岸坡环境治理整治程度（0.5）</td>
                    </tr>
                    <tr style="height: 30px;">
                        <td>水体整洁程度（0.5）</td>
                    </tr>
                    <tr style="height: 30px;">
                        <td rowspan="1">生态修复（0.2）</td>
                        <td>生态岸坡比例（-）</td>
                    </tr>

                </tbody>
                


            </table>
            <br>

        </div>


    </main>
</template>
<script>
    export default {
        name: 'weight',
        data() {
            return {
                formInline:{
                    administrativeDivision:'',
                    object:''

                }

            }
        }
    }
</script>