<!-- 数据填报页面 -->

<template>
    <el-container>
        <el-main style="width: 500px;">
            <h3 style="text-align: center;padding: 10px;">{{schemeName}}--数据填报页面</h3>
            <el-table :data="targetDataList" stripe :cell-style="cellStyle"  style="width: 100%;font-size: 12px;text-align: center;">
                <el-table-column type="index" label="序号" width="100" align="center" header-align="center"></el-table-column>
                <el-table-column prop="guidelinesTargetName" label="指标名称" align="center" header-align="center"></el-table-column>
                <!-- <el-table-column prop="dataTypeName" label="数据类型" width="200" align="center" header-align="center"></el-table-column> -->
                <el-table-column prop="fillStatus" label="填报状态" width="200" align="center" header-align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.fillStatus == false">尚未填报数据</div>
                        <div v-if="scope.row.fillStatus == true">数据已填报</div>
                    </template>
                </el-table-column>
                <el-table-column prop="score" label="计算评价得分" width="180" align="center" header-align="center"></el-table-column>
                <el-table-column fixed="right" label="操作" align="center" header-align="center">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.dataType === 1" @click="dataSceneEntry(scope)" size="small" type="text">数据录入</el-button>
                        <el-button v-if="scope.row.dataType === 2" @click="dataNotEmplatePic(scope)" size="small" type="text">数据录入</el-button>
                        <el-button v-if="scope.row.dataType === 3" @click="dataLaboratoryEntry(scope)" size="small"
                            type="text">数据录入</el-button>
                        <el-button v-if="scope.row.dataType === 4" @click="questionnaireDetile(scope)" size="small"
                            type="text">研判</el-button>
                        <el-button v-if="scope.row.dataType === 4" @click="questionnaireTJ(scope)" size="small" type="text">统计</el-button>
                        <el-button v-if="scope.row.dataType === 4" @click="questionnaire(scope)" size="small" type="text">查看问卷</el-button>
                        <el-button v-if="scope.row.dataType === 4" @click="qrCode(scope)" size="small" type="text">生成二维码</el-button>
                        <el-button v-if="scope.row.dataType === 5" @click="dataTemplateEntry(scope)" size="small" type="text">数据录入</el-button>
                        <el-button @click="dataWork(scope)" v-if="scope.row.dataType !== 4" size="small" type="text">上传文件</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- -----------------------------------（苏州河流）河流流动性----（其他类型，模版导出，数据导入）-----开始--------------------- -->
            <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="hlldxFlag" width="50%" :title="dialogTitle +'--基础数据填报'">
                <el-row :gutter="15">
                    <div v-if="exportXlsxModel">
                        <el-button @click="templateDownLoad" type="text">模版下载</el-button>
                        <el-button @click="importDtaEntry" type="text">数据导入</el-button>
                    </div>

                    <el-button v-if="exportXlsxResult">导出表格</el-button>

                    <el-form :model="dataTemplate" ref="dataTemplate">
                        <div>
                            <el-form-item v-for="(item) in dataTemplate.paramList" :key="item.key">
                                <p>参数描述：{{item.desc}}</p>
                                <span>填写参数：</span>
                                <el-input v-model="item.value" style="width:80%;margin-bottom: 10px;" :placeholder="item.placeholder"></el-input>
                                <hr>
                            </el-form-item>
                        </div>

                        <div v-if="showCalculation">
                            <p>单项评估值：{{result}}</p>
                            <p>赋分值：{{score}}</p>
                            <p>结果评价：{{scoreDesc}}</p>
                        </div>
                    </el-form>
                </el-row>
                <div slot="footer">
                    <el-button @click="calculationHLLDX" type="info">计算评分结果预览</el-button>
                    <el-button type="primary" @click="dataHLLDXSubmit">提交</el-button>
                    <el-button @click="hlldxFlag = false">取消</el-button>
                </div>
            </el-dialog>
            <!-- -----------------------------------河流流动性---------结束--------------------- -->

            <!-- -----------------------------------（苏州河流）水功能区---------开始--------------------- -->
            <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="sgnqFlag" width="50%" :title="dialogTitle +'--基础数据填报'">
                <!-- <el-row :gutter="15"> -->
                <el-table :data="sgnqTable" stripe style="width: 100%;font-size: 12px;text-align: center;">
                    <el-table-column prop="passNum" label="达标测次" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-input type="number" v-model="scope.row.passNum"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="totalNum" label="总测次" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-input type="number" v-model="scope.row.totalNum"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="reachLen" label="河岸长度（m）" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-input type="number" v-model="scope.row.reachLen"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button @click.native.prevent="deleteRow(scope.$index, sgnqTable)" type="text">移除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button @click="addNewSgnq" icon="el-icon-plus" type="warning" round size="small"></el-button>
                <div v-if="showCalculation">
                    <p>单项评估值：{{result}}</p>
                    <p>赋分值：{{score}}</p>
                    <p>结果评价：{{scoreDesc}}</p>
                </div>
                <!-- </el-row> -->
                <div slot="footer">
                    <el-button @click="calculationSGNQ" type="info">计算评分结果预览</el-button>
                    <el-button type="primary" @click="dataSgnqSubmit">提交</el-button>
                    <el-button @click="sgnqFlag = false">取消</el-button>
                </div>
            </el-dialog>
            <!-- -----------------------------------水功能区---------结束--------------------- -->

            <!-- -----------------------------------（苏州河流）岸坡植被覆盖度---------开始--------------------- -->
            <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="apzbFlag" width="70%" :title="dialogTitle +'--基础数据填报'">
                <div>
                    <div v-if="exportXlsxModel">
                        <el-button @click="templateDownLoad" type="text">模版下载</el-button>
                        <el-button @click="importDtaEntry" type="text">数据导入</el-button>
                    </div>
                    <!-- <el-button v-if="exportXlsxResult" type="warning">导出表格</el-button> -->
                    <!-- <span>岸坡植被覆盖度页面功能 </span> -->
                    <el-table :data="apzbTable" stripe style="width: 100%;font-size: 12px;text-align: center;"
                        show-summary>
                        <el-table-column prop="name" label="河段名称" width="100" align="center" header-align="center"
                            fixed="left"></el-table-column>
                        <el-table-column prop="bsName" label="岸带名称" width="150" align="center" header-align="center"
                            fixed="left"></el-table-column>
                        <el-table-column prop="bsLen" label="河岸长度（m）" width="150" align="center" header-align="center"></el-table-column>
                        <el-table-column prop="bsBareArea" label="无植被岸坡面积（㎡）" align="center" header-align="center">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.bsBareArea"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="bsArea" label="河段面积（㎡）" align="center" header-align="center"></el-table-column>
                        <el-table-column prop="bsOccupy" label="主要占用项" align="center" header-align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.bsOccupy"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div v-if="showCalculation">
                        <p>单项评估值：{{result}}</p>
                        <p>赋分值：{{score}}</p>
                        <p>结果评价：{{scoreDesc}}</p>
                    </div>
                </div>
                <div slot="footer">
                    <el-button @click="calculationAPWD" type="info">计算评分结果预览</el-button>
                    <el-button type="primary" @click="dataAPWDSubmit">提交</el-button>
                    <el-button @click="apzbFlag = false">取消</el-button>
                </div>
            </el-dialog>
            <!-- -----------------------------------岸坡植被覆盖度---------结束--------------------- -->

            <!-- -----------------------------------（苏州河流）景观舒适度---------开始--------------------- -->
            <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="jgssFlag" width="60%" :title="dialogTitle +'--基础数据填报'">
                <div>
                    <el-table :data="landscapeData" stripe style="width: 100%;font-size: 12px;text-align: center;">
                        <el-table-column prop="name" label="河段名称" align="center" header-align="center"></el-table-column>
                        <el-table-column prop="guanShangXing" label="观赏性" align="center" header-align="center">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.guanShangXing"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="qinShuiBianLiXing" label="亲水性" align="center" header-align="center">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.qinShuiBianLiXing"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="shuiWenHuaJianShe" label="水文化" align="center" header-align="center">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.shuiWenHuaJianShe"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div v-if="showCalculation">
                        <p>单项评估值：{{result}}</p>
                        <p>赋分值：{{score}}</p>
                        <p>结果评价：{{scoreDesc}}</p>
                    </div>
                </div>
                <div slot="footer">
                    <el-button @click="calculationJGSSD" type="info">计算评分结果预览</el-button>
                    <el-button type="primary" @click="dataJGSSSubmit">提交</el-button>
                    <el-button @click="jgssFlag = false">取消</el-button>
                </div>
            </el-dialog>
            <!-- -----------------------------------景观舒适度---------结束--------------------- -->

            <!-- -----------------------------------（苏州河流）岸线开发利用率---------开始--------------------- -->
            <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="axkfFlag" width="60%" :title="dialogTitle +'--基础数据填报'">
                <div>
                    <!-- <el-button v-if="exportXlsxResult" type="warning">导出表格</el-button> -->
                    <el-table :data="axkfTable" stripe style="width: 100%;font-size: 12px;text-align: center;"
                        show-summary>
                        <el-table-column prop="name" label="河段名称" align="center" header-align="center" fixed="left"></el-table-column>
                        <el-table-column prop="bsName" label="岸带名称" align="center" header-align="center" fixed="left"></el-table-column>
                        <el-table-column prop="bsLen" label="河岸长度（m）" align="center" header-align="center"></el-table-column>
                        <el-table-column prop="bsOccupyLen" label="岸线占用长度（m）" align="center" header-align="center">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.bsOccupyLen"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div v-if="showCalculation">
                        <p>单项评估值：{{result}}</p>
                        <p>赋分值：{{score}}</p>
                        <p>结果评价：{{scoreDesc}}</p>
                    </div>
                </div>
                <div slot="footer">
                    <el-button @click="calculationAXKF" type="info">计算评分结果预览</el-button>
                    <el-button type="primary" @click="dataAXKFSubmit">提交</el-button>
                    <el-button @click="axkfFlag = false">取消</el-button>
                </div>
            </el-dialog>
            <!-- -----------------------------------岸线开发利用率---------结束--------------------- -->

            <!-- -----------------------------------（苏州河流）水质优劣程度---------开始--------------------- -->
            <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="szFlag" width="60%" :title="dialogTitle +'--基础数据填报'">
                <el-row :gutter="15">
                    <div v-if="exportXlsxModel">
                        <el-button @click="templateDownLoad" type="text">模版下载</el-button>
                        <el-button @click="importDtaEntry" type="text">数据导入</el-button>
                    </div>

                    <!-- <el-button v-if="exportXlsxResult">导出表格</el-button> -->

                    <el-form :model="dataTemplate" ref="dataTemplate">
                        <div>
                            <el-form-item v-for="item in dataTemplate.paramList" :key="item.key">
                                <p>参数描述：{{item.desc}}</p>
                                <span>填写参数：</span>
                                <el-input v-model="item.value" style="width:80%;margin-bottom: 10px;" :placeholder="item.placeholder"></el-input>
                                <hr>
                            </el-form-item>
                        </div>

                        <div v-if="showCalculation">
                            <p>单项评估值：{{result}}</p>
                            <p>赋分值：{{score}}</p>
                            <p>结果评价：{{scoreDesc}}</p>
                        </div>
                    </el-form>
                </el-row>

                <div slot="footer">
                    <el-button @click="calculationSZ" type="info">计算评分结果预览</el-button>
                    <el-button type="primary" @click="dataSZSubmit">提交</el-button>
                    <el-button @click="szFlag = false">取消</el-button>
                </div>
            </el-dialog>
            <!-- -----------------------------------水质优劣程度---------结束--------------------- -->

            <!-- -----------------------------------（苏州河流）生态用水满足程度---------开始--------------------- -->
            <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="stysFlag" width="60%" :title="dialogTitle +'--基础数据填报'">
                <el-select v-model="funChoice" placeholder="请选择方法" clearable :style="{width: '100%'}" @change="funCodeChoose">
                    <el-option v-for="item in funChoiceOption" :key="item.relationFun" :label="item.optionalIndicators"
                        :value="item.relationFun"></el-option>
                </el-select>
                <el-row :gutter="15" v-if="funChoice">
                    <div v-if="exportXlsxModel">
                        <br>
                        <el-button @click="templateDownLoad" type="text">模版下载</el-button>
                        <el-button @click="importDtaEntry" type="text">数据导入</el-button>
                    </div>

                    <!-- <el-button v-if="exportXlsxResult">导出表格</el-button> -->

                    <el-form :model="dataTemplate" ref="dataTemplate">
                        <div>
                            <el-form-item v-for="(item) in dataTemplate.paramList" :key="item.key">
                                <p>参数描述：{{item.desc}}</p>
                                <span>填写参数：</span>
                                <el-input v-model="item.value" style="width:80%;margin-bottom: 10px;" :placeholder="item.placeholder"></el-input>
                                <hr>
                            </el-form-item>
                        </div>

                        <div v-if="showCalculation">
                            <p>单项评估值：{{result}}</p>
                            <p>赋分值：{{score}}</p>
                            <p>结果评价：{{scoreDesc}}</p>
                        </div>
                    </el-form>
                </el-row>
                <div slot="footer">
                    <el-button @click="calculationSTYS" type="info">计算评分结果预览</el-button>
                    <el-button type="primary" @click="dataSTYSSubmit">提交</el-button>
                    <el-button @click="stysFlag = false">取消</el-button>
                </div>
            </el-dialog>
            <!-- -----------------------------------生态用水满足程度---------结束--------------------- -->

            <!-- -----------------------------------（苏州河流）入河排口整治规范程度---------开始--------------------- -->
            <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="rhpkFlag" width="60%" :title="dialogTitle +'--基础数据填报'">
                <el-row :gutter="15">
                    <el-form :model="dataTemplate" ref="dataTemplate">
                        <div>
                            <el-form-item v-for="(item) in dataTemplate.paramList" :key="item.key">
                                <p>参数描述：{{item.desc}}</p>
                                <span>填写参数：</span>
                                <el-input v-model="item.value" style="width:80%;margin-bottom: 10px;" :placeholder="item.placeholder"></el-input>
                                <hr>
                            </el-form-item>
                        </div>

                        <div v-if="showCalculation">
                            <p>单项评估值：{{result}}</p>
                            <p>赋分值：{{score}}</p>
                            <p>结果评价：{{scoreDesc}}</p>
                        </div>
                    </el-form>
                </el-row>
                <div slot="footer">
                    <el-button @click="picWatchRHPK" type="warning">查看照片</el-button>
                    <el-button @click="calculationRHPK" type="info">计算评分结果预览</el-button>
                    <el-button type="primary" @click="dataRHPKSubmit">提交</el-button>
                    <el-button @click="rhpkFlag = false">取消</el-button>
                </div>
            </el-dialog>
            <!-- -----------------------------------入河排口整治规范程度---------结束--------------------- -->

            <!-- -----------------------------------（苏州湖泊）湖滨带植被覆盖度---------开始--------------------- -->
            <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="hbdzbFlag" width="70%" :title="dialogTitle +'--基础数据填报'">
                <div>
                    <div v-if="exportXlsxModel">
                        <el-button @click="templateDownLoad" type="text">模版下载</el-button>
                        <el-button @click="importDtaEntry" type="text">数据导入</el-button>
                    </div>
                    <!-- <el-button v-if="exportXlsxResult" type="warning">导出表格</el-button> -->
                    <!-- <span>岸坡植被覆盖度页面功能 </span> -->
                    <el-table :data="hbdzbTable" stripe style="width: 100%;font-size: 12px;text-align: center;">
                        <el-table-column prop="sePosition" label="起讫位置" align="center" header-align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.sePosition"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="bsBareArea" label="无植被岸坡面积（m）" align="center" header-align="center">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.bsBareArea"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="bsArea" label="湖滨带面积（m2）" align="center" header-align="center">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.bsArea"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="bsLen" label="湖岸长度（m）" align="center" header-align="center">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.bsLen"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="bsOccupy" label="河岸主要占用项名称" align="center" header-align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.bsOccupy"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="120">
                            <template slot-scope="scope">
                                <el-button @click.native.prevent="deleteRow(scope.$index, hbdzbTable)" type="text">移除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button @click="addNewHbdzb" icon="el-icon-plus" type="warning" round size="small"></el-button>
                    <div v-if="showCalculation">
                        <p>单项评估值：{{result}}</p>
                        <p>赋分值：{{score}}</p>
                        <p>结果评价：{{scoreDesc}}</p>
                    </div>
                </div>
                <div slot="footer">
                    <el-button @click="calculationHBDZB" type="info">计算评分结果预览</el-button>
                    <el-button type="primary" @click="dataHBDZBSubmit">提交</el-button>
                    <el-button @click="hbdzbFlag = false">取消</el-button>
                </div>
            </el-dialog>
            <!-- -----------------------------------（苏州湖泊）湖滨带植被覆盖度---------结束--------------------- -->
            <!-- -----------------------------------（苏州湖泊）入湖河流水质达标率---------开始--------------------- -->
            <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="rhhsFlag" width="60%" :title="dialogTitle +'--基础数据填报'">
                <div>
                    <!-- <el-button v-if="exportXlsxResult" type="warning">导出表格</el-button> -->
                    <el-table :data="rhhsszTable" stripe style="width: 100%;font-size: 12px;text-align: center;"
                        show-summary>
                        <el-table-column prop="name" label="入湖河流名称" align="center" header-align="center" fixed="left"></el-table-column>
                        <el-table-column prop="standardNum" label="达标测次" align="center" header-align="center" fixed="left">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.standardNum"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="totalNum" label="总测次" align="center" header-align="center">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.totalNum"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div v-if="showCalculation">
                        <p>单项评估值：{{result}}</p>
                        <p>赋分值：{{score}}</p>
                        <p>结果评价：{{scoreDesc}}</p>
                    </div>
                </div>
                <div slot="footer">
                    <el-button @click="calculationRHHS" type="info">计算评分结果预览</el-button>
                    <el-button type="primary" @click="dataRHHSSubmit">提交</el-button>
                    <el-button @click="rhhsFlag = false">取消</el-button>
                </div>
            </el-dialog>
            <!-- -----------------------------------入湖河流水质达标率---------结束--------------------- -->
            <!-- -----------------------------------（苏州湖泊）水功能区---------开始--------------------- -->
            <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="hpsgnqFlag" width="50%" :title="dialogTitle +'--基础数据填报'">
                <!-- <el-row :gutter="15"> -->
                <el-table :data="hpsgnqTable" stripe style="width: 100%;font-size: 12px;text-align: center;">
                    <el-table-column prop="passNum" label="达标测次" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-input type="number" v-model="scope.row.passNum"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="totalNum" label="总测次" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-input type="number" v-model="scope.row.totalNum"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="reachArea" label="湖区面积（㎡）" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-input type="number" v-model="scope.row.reachArea"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button @click.native.prevent="deleteRow(scope.$index, sgnqTable)" type="text">移除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button @click="addNewHpsgnq" icon="el-icon-plus" type="warning" round size="small"></el-button>
                <div v-if="showCalculation">
                    <p>单项评估值：{{result}}</p>
                    <p>赋分值：{{score}}</p>
                    <p>结果评价：{{scoreDesc}}</p>
                </div>
                <!-- </el-row> -->
                <div slot="footer">
                    <el-button @click="calculationHPSGNQ" type="info">计算评分结果预览</el-button>
                    <el-button type="primary" @click="dataHpsgnqSubmit">提交</el-button>
                    <el-button @click="hpsgnqFlag = false">取消</el-button>
                </div>
            </el-dialog>
            <!-- -----------------------------------水功能区---------结束--------------------- -->
            <!-- -----------------------------------（苏州河流）岸线开发利用率---------开始--------------------- -->
            <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="hpaxkfFlag" width="60%" :title="dialogTitle +'--基础数据填报'">
                <div>
                    <!-- <el-button v-if="exportXlsxResult" type="warning">导出表格</el-button> -->
                    <el-table :data="hpaxkfTable" stripe style="width: 100%;font-size: 12px;text-align: center;"
                        show-summary>
                        <el-table-column prop="name" label="河段名称" align="center" header-align="center" fixed="left"></el-table-column>
                        <el-table-column prop="bsName" label="岸带名称" align="center" header-align="center" fixed="left"></el-table-column>
                        <el-table-column prop="bsLen" label="河岸长度（m）" align="center" header-align="center"></el-table-column>
                        <el-table-column prop="bsOccupyLen" label="岸线占用长度（m）" align="center" header-align="center">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.bsOccupyLen"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div v-if="showCalculation">
                        <p>单项评估值：{{result}}</p>
                        <p>赋分值：{{score}}</p>
                        <p>结果评价：{{scoreDesc}}</p>
                    </div>
                </div>
                <div slot="footer">
                    <el-button @click="calculationHPAXKF" type="info">计算评分结果预览</el-button>
                    <el-button type="primary" @click="dataHPAXKFSubmit">提交</el-button>
                    <el-button @click="hpaxkfFlag = false">取消</el-button>
                </div>
            </el-dialog>
            <!-- -----------------------------------岸线开发利用率---------结束--------------------- -->

            <!-- -----------------------------------模板数据导入---------开始--------------------- -->
            <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="dialogImportDataFlag" width="40%" title="数据导入">
                <el-form :model="templateData" ref="templateData">
                    <el-form-item label="上传数据文件:" >
                        <el-upload class="upload-demo" ref="importFile" action :auto-upload="true" :http-request="uploadTemplateDta">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        </el-upload>
                    </el-form-item>
                    <!-- <el-form-item label="是否保存文件：" prop="saveFile">
                        <el-radio-group v-model="templateData.saveFile" size="medium">
                            <el-radio v-for="(item, index) in saveFileOptions" :key="index" :label="item.value"
                                :disabled="item.disabled">{{item.label}}</el-radio>
                        </el-radio-group>
                    </el-form-item> -->
                </el-form>
                <div slot="footer">
                    <el-button @click="dialogImportDataFlag = false">取消</el-button>
                    <el-button type="primary" @click="submitTemplateData">确定</el-button>
                </div>
            </el-dialog>
            <!-- -----------------------------------模板数据导入---------结束--------------------- -->

            <!-- 指标基础数据填写操作，直接填写结果数据，不需要模板导入数据的指标项 -----------开始---->
            <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="dialogNotTemplatePicVisable" width="50%" :title="dialogTitle +'--基础数据填报'">
                <el-row :gutter="15">
                    <el-form :model="dataNotTemplatePic" ref="dataNotTemplatePic">
                        <div>
                            <el-form-item v-for="(item, index) in dataNotTemplatePic.paramList" :key="index">
                                <div v-if="item.widgetType =='Text'">
                                    <p>参数描述：{{item.desc}}</p>
                                    <span>填写参数：</span>
                                    <el-input v-model="item.value" style="width:80%;margin-bottom: 10px;" :placeholder="item.placeholder"></el-input>

                                    <hr>
                                </div>
                                <div v-if="item.widgetType == 'Select'">
                                    <span>选择描述值：</span>
                                    <el-select v-model="item.value" placeholder="请选择方法" clearable style="width:80%;margin-bottom: 10px;">
                                        <el-option v-for="selection in item.widgetSelection" :key="selection.value"
                                            :label="selection.label" :value="selection.value"></el-option>
                                    </el-select>
                                    <hr>
                                </div>
                                <div v-if="item.widgetType == 'CheckBox'">
                                    <el-checkbox v-model="item.value" placeholder="请选择方法" clearable style="width:80%;margin-bottom: 10px;">{{item.widgetVal}}
                                    </el-checkbox>
                                </div>

                            </el-form-item>
                        </div>

                        <div v-if="showCalculation">
                            <p>单项评估值：{{result}}</p>
                            <p>赋分值：{{score}}</p>
                            <p>结果评价：{{scoreDesc}}</p>
                        </div>
                    </el-form>
                </el-row>
                <div slot="footer">
                    <el-button @click="calculationPreviewDataNotTemplatePic" type="info">计算评分结果预览</el-button>
                    <el-button type="primary" @click="dataNotTemplatePicSubmit">确定</el-button>
                    <el-button @click="dialogNotTemplatePicVisable = false">取消</el-button>
                </div>
            </el-dialog>
            <!-- 指标基础数据填写操作，直接填写结果数据，不需要模板导入数据的指标项 ----------------结束-->

            <!-- 现场查勘数据，需要展示pic，且针对pic可以进行删除操作，以及上传新pic ----------------开始-->
            <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="dialogSceneVisable" width="60%" :title="dialogTitle +'--基础数据填报'">
                <el-row :gutter="15">
                    <div v-for="(item, index) in paramListTag" :key="index">
                        <el-col :span="8" style="padding: 10px;border: 1px solid #eee;">
                            <span style="font-weight: 400;font-size: 16px;">{{item.desc}}：</span>
                            <span style="color: #2894FF;">{{item.value}}</span>
                        </el-col>
                    </div>
                </el-row>
                <div slot="footer">
                    <el-button type="warning" @click="picWatch">查看现场照片</el-button>
                    <el-button @click="dialogSceneVisable = false">取消</el-button>
                    <!-- <el-button type="primary" @click="dataSceneSubmit">确定</el-button> -->
                </div>
            </el-dialog>
            <!-- 现场查勘数据，需要展示pic，且针对pic可以进行删除操作，以及上传新pic ----------------结束-->
            <!-- 实验室数据填报，下载模版，导入数据 ----------------开始-->
            <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="dialogLaboratoryVisable" width="60%" :title="dialogTitle +'--基础数据填报'">
                <el-select v-model="funChoice" placeholder="请选择方法" clearable :style="{width: '100%'}" @change="choiceFun"
                    v-if="funMore">
                    <el-option v-for="item in funChoiceOption" :key="item.relationFun" :label="item.optionalIndicators"
                        :value="item.relationFun"></el-option>
                </el-select>
                <div v-if="exportXlsxModel">
                    <el-button @click="templateDownLoad" type="text">模版下载</el-button>
                    <el-button @click="importDtaEntry" type="text">数据导入</el-button>
                </div>
                <el-form :model="laboratoryData" ref="laboratoryData" v-if="laboratoryShowFlag">
                    <div>
                        <el-form-item v-for="(item) in laboratoryData.paramList" :key="item.key">
                            <p>参数描述：{{item.desc}}</p>
                            <span>填写参数：</span>
                            <el-input v-model="item.value" style="width:80%;margin-bottom: 10px;" :placeholder="item.placeholder"></el-input>
                            <hr>
                        </el-form-item>
                    </div>

                    <div v-if="showCalculation">
                        <p>单项评估值：{{result}}</p>
                        <p>赋分值：{{score}}</p>
                        <p>结果评价：{{scoreDesc}}</p>
                    </div>
                </el-form>
                <div slot="footer">
                    <el-button @click="calculationPreviewDataLaboratory" type="info">计算评分结果预览</el-button>
                    <el-button type="primary" @click="dataLaboratorySubmit">确定</el-button>
                    <el-button @click="dialogLaboratoryVisable = false">取消</el-button>
                </div>
            </el-dialog>
            <!-- 实验室数据填报，下载模版，导入数据 ----------------结束-->

            <!-- 绑定原始文件--------------------------------------开始-->
            <el-dialog :close-on-click-modal="false" append-to-body :visible.sync="dialogOverVisable" width="50%" :title="dialogTitle +'--文件上传'">
                <span style="color: coral;">
                    *注：该页面上传的文件只是为了最终编写报告时可以快速查找对应指标的过程文件，
                    做一个文件备份的工作，不会对文件内容进行解析和数据上传保存
                </span>
                <el-upload list-type="picture" multiple class="upload-demo" ref="upload" action :before-remove="beforRemove"
                    :file-list="fileList" :http-request="uploadFunction">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <div slot="footer">
                    <el-button @click="dialogOverVisable = false">取消</el-button>
                    <el-button type="primary" @click="submitUpload">确定</el-button>
                </div>
            </el-dialog>
            <!-- 绑定原始文件--------------------------------------结束-->

            <!-- 问卷二维码--------------------------------------开始-->
            <el-drawer title="问卷二维码" :visible.sync="drawer" direction="rtl" append-to-body>
                <div style="margin-left:10px;" id="qrcodeId" ref="qrcode" @click="download"></div>
                <span style="padding:10px;color: coral">提示：可以点击二维码进行二维码的下载功能，将下载的二维码图片转发给公众即可扫码填报问卷</span>
            </el-drawer>

            <!-- 问卷二维码--------------------------------------结束-->

        </el-main>

    </el-container>
</template>

<script>
    import {
        scheme_data_serach,
        scheme_data_params,
        scheme_data_computed,
        scheme_data_computed_save,
        reach_info_list,
        workFileAddBatch,
        getWorkFileList,
        picDel,
        get_scheme_info,
    } from "@/api/scheme/index";
    import { outLet_info_query } from "@/api/rlObject/index";
    import {
        get_target_template,
        template_data_submit,
        exls_template_down
    } from "@/api/template/index";
    import { dict_search_domain } from "@/api/dict/index";
    import funCodeList from "@/pages/funCodeList.js";
    import saveAs from "file-saver";
    import { uploadFileRequest } from "@/api/file/index";
    import { getQuestionnaire, statisticsQuestionnaire } from "@/api/questionnaire/index";
    import QRCode from 'qrcodejs2'
    export default {
        name: "dataEntryIndex",
        props: {},
        data() {
            return {
                schemeId: this.$route.params.schemeId, //方案id
                schemeName: this.$route.params.schemeName, //方案名称
                questionnaireToken: this.$route.params.questionnaireToken, //方案名称
                targetDataList: [], //方案数据填报列表数据
                dataTypeOption: [], //指标数据类型字典项数据列表
                reachIdOptions: [], //评估方案河段信息列表
                dialogTitle: "", //弹窗名称
                rowData: "", //数据填报按钮的行数据
                relationFun: "", //选取的方法包
                funChoiceOption: [], //指标项拥有多个方法
                funChoice: "", //多种方法中选择的方法
                // 计算结果预览展示部分参数定义开始
                result: null,
                score: null,
                scoreDesc: "",
                showCalculation: false,
                // 计算结果预览展示部分参数定义结束

                // 自定义指标内容共性数据定义
                otherShowFlag: null, //对应关系，funCodeList.js
                dataTemplate: {
                    paramList: [
                        {
                            attrName: "",
                            desc: "",
                            type: "",
                            value: ""
                        }
                    ],
                    scoreId: ""
                },
                //模版数据表单
                exportXlsxModel: false, //模版下载和数据导入功能
                exportXlsxResult: false, //页面表格导出功能

                // ===========================苏州河流===============================
                // 河流流动性开始
                hlldxFlag: false,
                // 河流流动性结束

                //水功能区开始
                sgnqFlag: false,
                sgnqTable: [],
                //水功能区结束

                //岸坡植被覆盖度开始
                apzbFlag: false,
                apzbTable: [],
                //岸坡植被覆盖度结束

                //生态用水满足程度3开始
                stysFlag: false,
                //生态用水满足程度3结束
                //水质优劣程度4开始
                szFlag: false,
                //水质优劣程度4结束
                //5开始
                jgssFlag: false,
                landscapeData: [],
                //5结束
                //入河排口6开始
                rhpkFlag: false,
                //入河排口6结束
                //岸线开发利用率7开始
                axkfFlag: false,
                axkfTable: [],
                //岸线开发利用率7结束


                // ===========================苏州湖泊===============================
                // 湖滨带植被覆盖度开始
                hbdzbFlag: false,
                hbdzbTable: [],
                // 湖滨带植被覆盖度结束

                // 入湖河水开始
                rhhsFlag: false,
                rhhsszTable: [],
                joinInfoOption: [],
                // 入湖河水结束

                 //水功能区开始
                 hpsgnqFlag: false,
                hpsgnqTable: [],
                //水功能区结束
                //岸线开发利用率12开始
                hpaxkfFlag: false,
                hpaxkfTable: [],
                //岸线开发利用率12结束


                // 数据导入页面开始
                dialogImportDataFlag: false, //数据导入页面
                templateData: {},
                templateDataFile: "",
                saveFileOptions: [
                    {
                        label: "保存",
                        value: true
                    },
                    {
                        label: "不保存",
                        value: false
                    }
                ],
                templateFileUrl:null,
                templateGuidelinesTargetScoreId: undefined,
                // 数据导入页面结束

                //查阅资料页面开始
                dialogNotTemplatePicVisable: false,
                dataNotTemplatePic: {
                    paramList: [
                        {
                            attrName: "",
                            desc: "",
                            type: "",
                            value: ""
                        }
                    ],
                    scoreId: ""
                },
                //查阅资料页面结束

                //现场拍照页面开始
                dialogSceneVisable: false,
                dataScene: {
                    paramList: [
                        {
                            attrName: "",
                            desc: "",
                            type: "",
                            value: ""
                        }
                    ],
                    scoreId: ""
                },
                paramListTag: [], //现场照片属性指标值展示
                //现场拍照页面结束
                //实验室数据开始
                dialogLaboratoryVisable: false,
                funMore: false, //指标数据拥有多种计算方法
                laboratoryData: {
                    paramList: [
                        {
                            attrName: "",
                            desc: "",
                            type: "",
                            value: ""
                        }
                    ],
                    scoreId: ""
                },
                laboratoryShowFlag: false,
                // 实验室数据结束

                // 上传工作文件开始
                dialogOverVisable: false,
                fileList: [],
                filePathList: [],
                workFileTargetId: "",
                // 上传工作文件结束

                // 调查问卷开始
                drawer: false,
                // 调查问卷结束
            };
        },
        created() {
            this.dataTypeDictSearch();
            this.getSchemeTargetList();
            this.reachOptionsQuery();
        },
        methods: {
            /** 数据填报列内容样式填充 */
            cellStyle(data) {
                if (data.columnIndex == 2) {
                    if (data.row.fillStatus == false) {
                        return 'color:rgba(245, 47, 62, 1)'
                    } else {
                        return 'color:rgba(11, 219, 168, 1)'
                    }
                }
                if(data.columnIndex == 3){
                    if(data.row.score >= 90){
                        return 'color:rgb(0,180,255)'
                    } else if(data.row.score >= 80 && data.row.score < 90) {
                        return 'color:rgb(150,200,80)'
                    } else if(data.row.score >= 60 && data.row.score < 80) {
                        return 'color:rgb(255,255,0)'
                    } else if(data.row.score >= 40 && data.row.score < 60) {
                        return 'color:rgb(255,165,0)'
                    } else {
                        return 'color:rgb(255,0,0)'
                    }
                    

                }
            },
            dataTypeDictSearch() {
                //数据类型字典查询
                let domian = "dataType";
                dict_search_domain(domian)
                    .then(response => {
                        this.dataTypeOption = response.data.data;
                    })
                    .catch(() => {
                        console.log(err);
                    });
            },
            getSchemeTargetList() {
                //查询评估方案对应的指标填报数据列表信息
                let params = {
                    id: this.schemeId
                };
                scheme_data_serach(params).then(res => {
                    console.log(res)
                    this.targetDataList = res.data.data;
                    this.targetDataList.forEach(item => {
                        this.dataTypeOption.forEach(dataTy => {
                            if (dataTy.doKey === item.dataType) {
                                item.dataTypeName = dataTy.doValue;
                            }
                        });
                    });
                });
            },
            reachOptionsQuery() {
                //方案河段信息列表
                reach_info_list(this.schemeId)
                    .then(res => {
                        if(res == undefined || res ==null){
                        } else {
                            this.reachIdOptions = res.data.data;
                        }
                        
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },

            // <-------------查阅资料类型  开始----->
            dataNotEmplatePic(info) {
                //页面展示
                this.showCalculation = false;
                this.result = null;
                this.score = null;
                this.scoreDesc = "";
                this.dialogTitle = info.row.guidelinesTargetName;
                this.dialogNotTemplatePicVisable = true;
                this.rowData = info.row;
                if (info.row.gtsDetailList.length == 1) {
                    //指标只有一种方法
                    let funChoiceList = info.row.gtsDetailList;
                    this.dataNotTemplatePic.scoreId = funChoiceList[0].guidelinesTargetScoreId;
                    let params = {
                        id: info.row.id,
                        relationFun: funChoiceList[0].relationFun
                    };
                    scheme_data_params(params).then(res => {
                        this.dataNotTemplatePic.paramList = res.data.data.model.paramList;
                        this.dataNotTemplatePic.paramList.forEach(item => {

                            if (item.widgetType == "Select") {
                                let jsonObj = JSON.parse(item.widgetVal)
                                let keyArr = Object.keys(jsonObj)
                                let selection = []
                                for (let i = 0; i < keyArr.length; i++) {
                                    let param = {
                                        label: jsonObj[keyArr[i]],
                                        value: keyArr[i]
                                    }
                                    selection.push(param)
                                }
                                item.widgetSelection = selection

                            }
                            console.log(item)
                        })
                    });
                }
            },
            calculationPreviewDataNotTemplatePic() {
                //计算预览
                this.calculation(this.dataNotTemplatePic);
            },
            dataNotTemplatePicSubmit() {
                //数据保存
                let params = this.dataSubmitSave(this.dataNotTemplatePic);
                scheme_data_computed_save(params)
                    .then(res => {
                        this.$message({
                            message: "数据填写成功！",
                            type: "success"
                        });
                        this.dialogNotTemplatePicVisable = false;
                        this.getSchemeTargetList();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // <-------------查阅资料类型  结束---->

            // <-------------现场拍照类型  开始---->
            dataSceneEntry(info) {
                //页面展示
                this.dialogSceneVisable = true;
                this.showCalculation = false;
                this.result = null;
                this.score = null;
                this.scoreDesc = "";
                this.dialogTitle = info.row.guidelinesTargetName;
                if (info.row.gtsDetailList.length == 1) {
                    let funChoiceList = info.row.gtsDetailList;
                    this.dataScene.scoreId = funChoiceList[0].guidelinesTargetScoreId;
                    let params = {
                        id: info.row.id,
                        relationFun: funChoiceList[0].relationFun
                    };
                    scheme_data_params(params).then(res => {
                        this.dataScene.paramList = res.data.data.model.paramList;
                        this.paramListTag = [];
                        for (let i = 1; i < res.data.data.model.paramList.length; i++) {
                            this.paramListTag.push(res.data.data.model.paramList[i]);
                        }
                    });
                }
            },

            picWatch() {
                // 照片库查看
                const { href } = this.$router.resolve({
                    name: "picGallery",
                    query: {
                        schemeId: this.schemeId,
                        scoreId: this.dataScene.scoreId
                    }
                });
                window.open(href, "_blank");
            },
            // <-------------现场拍照类型  结束---->

            // <-------------实验室类型  开始---->
            dataLaboratoryEntry(info) {
                //页面展示
                this.showCalculation = false;
                this.result = null;
                this.score = null;
                this.funMore = false;
                this.scoreDesc = "";
                this.dialogTitle = info.row.guidelinesTargetName;
                this.dialogLaboratoryVisable = true;
                this.laboratoryShowFlag = false;
                this.exportXlsxResult = false;
                this.exportXlsxModel = false;
                this.funChoice = "";
                this.rowData = info.row;

                console.log(info);
                if (info.row.gtsDetailList.length == 1) {
                    //指标只有一种方法
                    this.laboratoryData.scoreId =
                        info.row.gtsDetailList[0].guidelinesTargetScoreId;
                    this.relationFun = info.row.gtsDetailList[0].relationFun;
                    this.templateGuidelinesTargetScoreId =
                        info.row.gtsDetailList[0].guidelinesTargetScoreId;
                    let funChoiceList = info.row.gtsDetailList;
                    this.dataNotTemplatePic.scoreId =
                        funChoiceList[0].guidelinesTargetScoreId;
                    let params = {
                        id: info.row.id,
                        relationFun: funChoiceList[0].relationFun
                    };
                    scheme_data_params(params).then(res => {
                        this.laboratoryShowFlag = true;
                        this.laboratoryData.paramList = res.data.data.model.paramList;
                        this.exportXlsxResult = res.data.data.model.exportXlsxResult;
                        this.exportXlsxModel = res.data.data.model.exportXlsxModel;
                    });
                } else {
                    this.funMore = true;
                    this.funChoiceOption = this.rowData.gtsDetailList;
                }
            },
            choiceFun() {
                this.funChoiceOption.forEach(item => {
                    if (item.relationFun == this.funChoice) {
                        this.laboratoryData.scoreId = item.guidelinesTargetScoreId;
                    }
                });
                this.templateGuidelinesTargetScoreId = this.laboratoryData.scoreId;
                this.relationFun = this.funChoice;
                let params = {
                    id: this.rowData.id,
                    relationFun: this.relationFun
                };
                scheme_data_params(params)
                    .then(res => {
                        this.laboratoryShowFlag = true;
                        this.laboratoryData.paramList = res.data.data.model.paramList;
                        this.exportXlsxResult = res.data.data.model.exportXlsxResult;
                        this.exportXlsxModel = res.data.data.model.exportXlsxModel;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },

            calculationPreviewDataLaboratory() {
                // 计算结果预览
                this.calculation(this.laboratoryData);
            },

            dataLaboratorySubmit() {
                // 保存
                let params = this.dataSubmitSave(this.laboratoryData);
                scheme_data_computed_save(params)
                    .then(res => {
                        this.$message({
                            message: "数据填写成功！",
                            type: "success"
                        });
                        this.dialogLaboratoryVisable = false;
                        this.getSchemeTargetList();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },

            // <-------------实验室类型  结束---->

            // <-------------其他类型，需要每项指标对应定制开发，根据本地的`funCodeList.js`配置文件寻找对应关系进行页面内容渲染  开始----->
            dataTemplateEntry(info) {
                this.showCalculation = false;
                this.result = null;
                this.score = null;
                this.scoreDesc = "";
                this.dialogTitle = info.row.guidelinesTargetName;
                this.rowData = info.row;
                this.otherShowFlag = null;
                funCodeList.forEach(item => {
                    if (item.code == info.row.gtsDetailList[0].relationFun) {
                        this.otherShowFlag = item.value;
                    }
                });
                if (this.otherShowFlag === 1) {
                    //岸坡植被覆盖度
                    this.apzbCreated();
                    return;
                } else if (this.otherShowFlag === 2) {
                    //河流流动性
                    this.hlldxCreated();
                    return;
                } else if (this.otherShowFlag === 3) {
                    //生态用水满足程度
                    this.stysCreated();
                    return;
                } else if (this.otherShowFlag === 4) {
                    //水质优劣程度
                    this.szCreated();
                    return;
                } else if (this.otherShowFlag === 5) {
                    //景观舒适程度
                    this.jgssCreated();
                    return;
                } else if (this.otherShowFlag === 6) {
                    //入河排污口规范化建设
                    this.rhpkCreated();
                    return;
                } else if (this.otherShowFlag === 7) {
                    //岸线开发利用率
                    this.axkfCreated();
                    return;
                } else if (this.otherShowFlag === 8) {
                    //水功能区
                    this.sgnqCreated();
                    return;
                } else if (this.otherShowFlag === 9) {
                    //湖滨带植被覆盖度
                    this.hbdzbfgdCreated();
                    return;
                } else if (this.otherShowFlag === 10) {
                    //入湖河水水质
                    this.rhhsszCreated();
                    return;
                } else if (this.otherShowFlag === 11) {
                    //湖泊水功能区
                    this.hpsgnqCreated();
                    return;
                } else if (this.otherShowFlag === 12) {
                    //湖泊水功能区
                    this.hpaxkfCreated();
                    return;
                }
            },

            //         <!-- -----------------------------------河流流动性（2）----（其他类型，模版导出，数据导入）-----开始--------------------- -->
            hlldxCreated() {
                // 初始化河流流动性
                this.hlldxFlag = true;
                if (this.rowData.gtsDetailList.length == 1) {
                    this.relationFun = this.rowData.gtsDetailList[0].relationFun;
                    this.dataTemplate.scoreId = this.rowData.gtsDetailList[0].guidelinesTargetScoreId;
                    this.templateGuidelinesTargetScoreId = this.dataTemplate.scoreId;
                    let params = {
                        id: this.rowData.id,
                        relationFun: this.relationFun
                    };
                    scheme_data_params(params).then(res => {
                        this.dataTemplate.paramList = res.data.data.model.paramList;
                        this.exportXlsxResult = res.data.data.model.exportXlsxResult;
                        this.exportXlsxModel = res.data.data.model.exportXlsxModel;
                    });
                }
            },
            calculationHLLDX() {
                //计算预览河流流动性
                this.calculation(this.dataTemplate);
            },
            dataHLLDXSubmit() {
                //河流流动性数据填报保存
                let params = this.dataSubmitSave(this.dataTemplate);
                scheme_data_computed_save(params)
                    .then(res => {
                        this.$message({
                            message: "数据填写成功！",
                            type: "success"
                        });
                        this.hlldxFlag = false;
                        this.getSchemeTargetList();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //         <!-- -----------------------------------河流流动性---------结束--------------------- -->
            //         <!-- -----------------------------------水功能区（8）---------开始--------------------- -->
            sgnqCreated() {
                //水功能区初始化
                this.sgnqFlag = true;
                this.sgnqTable = [];
                if (this.rowData.gtsDetailList.length == 1) {
                    this.relationFun = this.rowData.gtsDetailList[0].relationFun;
                    this.dataTemplate.scoreId = this.rowData.gtsDetailList[0].guidelinesTargetScoreId;
                    let params = {
                        id: this.rowData.id,
                        relationFun: this.relationFun
                    };
                    scheme_data_params(params)
                        .then(res => {
                            this.sgnqTable = JSON.parse(res.data.data.model.paramList[1].value);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            },
            addNewSgnq() {
                //水功能区表格动态新增
                let newLine = {};
                this.sgnqTable.push(newLine); // 移到第一行
            },
            deleteRow(index, rows) {
                //新增表格的删除
                rows.splice(index, 1);
            },
            calculationSGNQ() {
                //水功能区计算预览
                this.calculationList(this.sgnqTable);
            },
            dataSgnqSubmit() {
                //水功能区数据提交
                let params = this.dataSubmitSaveList(this.sgnqTable);
                scheme_data_computed(params)
                    .then(res => {
                        this.$message({
                            message: "数据填写成功！",
                            type: "success"
                        });
                        this.sgnqFlag = false;
                        this.getSchemeTargetList();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //         <!-- -----------------------------------水功能区---------结束--------------------- -->
            //         <!-- -----------------------------------岸线开发利用率（7）---------开始--------------------- -->
            axkfCreated() {
                //初始化
                this.axkfFlag = true;
                this.axkfTable=[]
                this.reachIdOptions.forEach(item => {
                    let param1 = {
                        name: item.name,
                        bsName: item.bankSlopeName1,
                        bsLen: item.bankSlopeLength1.toString(),
                        bsOccupyLen: ""
                    };
                    this.axkfTable.push(param1);
                    let param2 = {
                        name: item.name,
                        bsName: item.bankSlopeName2,
                        bsLen: item.bankSlopeLength2.toString(),
                        bsOccupyLen: ""
                    };
                    this.axkfTable.push(param2);
                });
                if (this.rowData.gtsDetailList.length == 1) {
                    this.relationFun = this.rowData.gtsDetailList[0].relationFun;
                    this.dataTemplate.scoreId = this.rowData.gtsDetailList[0].guidelinesTargetScoreId;
                    this.templateGuidelinesTargetScoreId = this.dataTemplate.scoreId;
                    let params = {
                        id: this.rowData.id,
                        relationFun: this.relationFun
                    };
                    scheme_data_params(params)
                        .then(res => {
                            if (res.data.data.model.paramList[1].value) {
                                this.axkfTable = JSON.parse(
                                    res.data.data.model.paramList[1].value
                                );
                            }
                            this.exportXlsxResult = res.data.data.model.exportXlsxResult;
                            this.exportXlsxModel = res.data.data.model.exportXlsxModel;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            },
            calculationAXKF() {
                //计算预览
                this.calculationList(this.axkfTable);
            },
            dataAXKFSubmit() {
                //数据保存
                let params = this.dataSubmitSaveList(this.axkfTable);
                scheme_data_computed(params)
                    .then(res => {
                        this.$message({
                            message: "数据填写成功！",
                            type: "success"
                        });
                        this.axkfFlag = false;
                        this.getSchemeTargetList();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //         <!-- -----------------------------------岸线开发利用率---------结束--------------------- -->
            //         <!-- -----------------------------------（6）---------开始--------------------- -->
            rhpkCreated() {
                //初始化
                this.rhpkFlag = true;
                if (this.rowData.gtsDetailList.length == 1) {
                    this.relationFun = this.rowData.gtsDetailList[0].relationFun;
                    this.dataTemplate.scoreId = this.rowData.gtsDetailList[0].guidelinesTargetScoreId;
                    this.templateGuidelinesTargetScoreId = this.dataTemplate.scoreId;
                    let params = {
                        id: this.rowData.id,
                        relationFun: this.relationFun
                    };
                    scheme_data_params(params).then(res => {
                        this.dataTemplate.paramList = res.data.data.model.paramList;
                    });
                }
            },
            calculationRHPK() {
                //计算预览
                this.calculation(this.dataTemplate);
            },
            dataRHPKSubmit() {
                //数据保存
                let params = this.dataSubmitSave(this.dataTemplate);
                scheme_data_computed_save(params)
                    .then(res => {
                        this.$message({
                            message: "数据填写成功！",
                            type: "success"
                        });
                        this.rhpkFlag = false;
                        this.getSchemeTargetList();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            picWatchRHPK() {
                // 照片库查看
                const { href } = this.$router.resolve({
                    name: "picGallery",
                    query: {
                        schemeId: this.schemeId,
                        scoreId: this.dataTemplate.scoreId
                    }
                });
                window.open(href, "_blank");
            },
            //         <!-- --------------------------------------------结束--------------------- -->
            //         <!-- -----------------------------------景观舒适度（5）---------开始--------------------- -->
            jgssCreated() {
                //初始化
                this.jgssFlag = true;
                this.landscapeData = [];
                this.reachIdOptions.forEach(item => {
                    let param = {
                        name: item.name,
                        guanShangXing: "",
                        qinShuiBianLiXing: "",
                        shuiWenHuaJianShe: ""
                    };
                    this.landscapeData.push(param);
                });

                if (this.rowData.gtsDetailList.length == 1) {
                    this.relationFun = this.rowData.gtsDetailList[0].relationFun;
                    this.dataTemplate.scoreId = this.rowData.gtsDetailList[0].guidelinesTargetScoreId;
                    this.templateGuidelinesTargetScoreId = this.dataTemplate.scoreId;
                    let params = {
                        id: this.rowData.id,
                        relationFun: this.relationFun
                    };
                    scheme_data_params(params).then(res => {
                        if (res.data.data.model.paramList[1].value) {
                            this.landscapeData = JSON.parse(
                                res.data.data.model.paramList[1].value
                            );
                        }
                    });
                }
            },
            calculationJGSSD() {
                //计算预览
                this.calculationList(this.landscapeData);
            },
            dataJGSSSubmit() {
                //数据保存
                let params = this.dataSubmitSaveList(this.landscapeData);
                scheme_data_computed(params)
                    .then(res => {
                        this.$message({
                            message: "数据填写成功！",
                            type: "success"
                        });
                        this.jgssFlag = false;
                        this.getSchemeTargetList();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //         <!-- ------------------------------------景观舒适度--------结束--------------------- -->
            //         <!-- -----------------------------------水质优劣程度（4）---------开始--------------------- -->
            szCreated() {
                //初始化
                this.szFlag = true;
                if (this.rowData.gtsDetailList.length == 1) {
                    this.relationFun = this.rowData.gtsDetailList[0].relationFun;
                    this.dataTemplate.scoreId = this.rowData.gtsDetailList[0].guidelinesTargetScoreId;
                    this.templateGuidelinesTargetScoreId = this.dataTemplate.scoreId;
                    let params = {
                        id: this.rowData.id,
                        relationFun: this.relationFun
                    };
                    scheme_data_params(params)
                        .then(res => {
                            console.log(res);
                            this.dataTemplate.paramList = res.data.data.model.paramList;
                            this.exportXlsxResult = res.data.data.model.exportXlsxResult;
                            this.exportXlsxModel = res.data.data.model.exportXlsxModel;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            },
            calculationSZ() {
                //计算预览
                this.calculation(this.dataTemplate);
            },
            dataSZSubmit() {
                //数据填报保存
                let params = this.dataSubmitSave(this.dataTemplate);
                scheme_data_computed_save(params)
                    .then(res => {
                        this.$message({
                            message: "数据填写成功！",
                            type: "success"
                        });
                        this.szFlag = false;
                        this.getSchemeTargetList();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //         <!-- ------------------------------------水质优劣程度--------结束--------------------- -->
            //         <!-- -----------------------------------生态用水满足程度（3）---------开始--------------------- -->
            stysCreated() {
                //初始化
                this.stysFlag = true;
                this.funChoice = "";
                if (this.rowData.gtsDetailList.length == 1) {
                    this.relationFun = this.rowData.gtsDetailList[0].relationFun;
                    this.dataTemplate.scoreId = this.rowData.gtsDetailList[0].guidelinesTargetScoreId;
                    this.templateGuidelinesTargetScoreId = this.dataTemplate.scoreId;
                    let params = {
                        id: this.rowData.id,
                        relationFun: this.relationFun
                    };
                    scheme_data_params(params)
                        .then(res => {
                            this.exportXlsxResult = res.data.data.model.exportXlsxResult;
                            this.exportXlsxModel = res.data.data.model.exportXlsxModel;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    this.funChoiceOption = this.rowData.gtsDetailList;
                }
            },
            funCodeChoose() {
                //选择计算方法
                this.dataTemplate.paramList = [];
                this.funChoiceOption.forEach(item => {
                    if (item.relationFun == this.funChoice) {
                        this.dataTemplate.scoreId = item.guidelinesTargetScoreId;
                    }
                });
                this.templateGuidelinesTargetScoreId = this.dataTemplate.scoreId;
                this.relationFun = this.funChoice;
                let params = {
                    id: this.rowData.id,
                    relationFun: this.relationFun
                };
                scheme_data_params(params)
                    .then(res => {
                        this.dataTemplate.paramList = res.data.data.model.paramList;
                        this.exportXlsxResult = res.data.data.model.exportXlsxResult;
                        this.exportXlsxModel = res.data.data.model.exportXlsxModel;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            calculationSTYS() {
                //计算预览
                this.calculation(this.dataTemplate);
            },
            dataSTYSSubmit() {
                //数据填报保存
                let params = this.dataSubmitSave(this.dataTemplate);
                scheme_data_computed_save(params)
                    .then(res => {
                        this.$message({
                            message: "数据填写成功！",
                            type: "success"
                        });
                        this.stysFlag = false;
                        this.getSchemeTargetList();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },

            //         <!-- -----------------------------------生态用水满足程度---------结束--------------------- -->
            //         <!-- -----------------------------------岸坡植被覆盖度（1）---------开始--------------------- -->
            apzbCreated() {
                //初始化
                this.apzbFlag = true;
                this.apzbTable = [];
                this.reachIdOptions.forEach(item => {
                    let param1 = {
                        name: item.name,
                        bsName: item.bankSlopeName1,
                        bsArea: item.bankSlopeArea1.toString(),
                        bsLen: item.bankSlopeLength1.toString(),
                        bsBareArea: "",
                        bsOccupy: ""
                    };
                    this.apzbTable.push(param1);
                    let param2 = {
                        name: item.name,
                        bsName: item.bankSlopeName2,
                        bsArea: item.bankSlopeArea2.toString(),
                        bsLen: item.bankSlopeLength2.toString(),
                        bsBareArea: "",
                        bsOccupy: ""
                    };
                    this.apzbTable.push(param2);
                });
                if (this.rowData.gtsDetailList.length == 1) {
                    this.relationFun = this.rowData.gtsDetailList[0].relationFun;
                    this.dataTemplate.scoreId = this.rowData.gtsDetailList[0].guidelinesTargetScoreId;
                    this.templateGuidelinesTargetScoreId = this.dataTemplate.scoreId;
                    let params = {
                        id: this.rowData.id,
                        relationFun: this.relationFun
                    };
                    scheme_data_params(params)
                        .then(res => {
                            if (res.data.data.model.paramList[1].value) {
                                this.apzbTable = JSON.parse(
                                    res.data.data.model.paramList[1].value
                                );
                            }
                            this.exportXlsxResult = res.data.data.model.exportXlsxResult;
                            this.exportXlsxModel = res.data.data.model.exportXlsxModel;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            },
            calculationAPWD() {
                //计算预览
                this.calculationList(this.apzbTable);
            },
            dataAPWDSubmit() {
                //数据保存
                let params = this.dataSubmitSaveList(this.apzbTable);
                scheme_data_computed(params)
                    .then(res => {
                        this.$message({
                            message: "数据填写成功！",
                            type: "success"
                        });
                        this.apzbFlag = false;
                        this.getSchemeTargetList();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //         <!-- -----------------------------------岸坡植被覆盖度---------结束--------------------- -->

            //         <!-- -----------------------------------湖滨带植被覆盖度（9）---------开始--------------------- -->
            hbdzbfgdCreated() {
                this.hbdzbFlag = true
                this.hbdzbTable = [];
                if (this.rowData.gtsDetailList.length == 1) {
                    this.relationFun = this.rowData.gtsDetailList[0].relationFun;
                    this.dataTemplate.scoreId = this.rowData.gtsDetailList[0].guidelinesTargetScoreId;
                    let params = {
                        id: this.rowData.id,
                        relationFun: this.relationFun
                    };
                    scheme_data_params(params)
                        .then(res => {
                            this.hbdzbTable = JSON.parse(res.data.data.model.paramList[1].value);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            },
            addNewHbdzb() {
                //表格动态新增
                let newLine = {};
                this.hbdzbTable.push(newLine); // 移到第一行
            },
            calculationHBDZB() {
                //计算预览
                this.calculationList(this.hbdzbTable);
            },
            dataHBDZBSubmit() {
                //数据提交
                let params = this.dataSubmitSaveList(this.hbdzbTable);
                scheme_data_computed(params)
                    .then(res => {
                        this.$message({
                            message: "数据填写成功！",
                            type: "success"
                        });
                        this.hbdzbFlag = false;
                        this.getSchemeTargetList();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //         <!-- -----------------------------------湖滨带植被覆盖度---------结束--------------------- -->
            //         <!-- -----------------------------------入湖河水水质达标率（10）---------开始--------------------- -->
            rhhsszCreated() {
                //初始化
                this.rhhsFlag = true;
                this.rhhsszTable = [];
                get_scheme_info(this.schemeId)
                    .then(res => {
                        let params = {
                            pageSize: 100,
                            pageNum: 1,
                            rlInfoId: res.data.data.rlInfoId
                        }
                        outLet_info_query(params).then(res => {
                            this.joinInfoOption = res.data.data.list
                            console.log(this.joinInfoOption)
                            this.joinInfoOption.forEach(item => {
                                let param = {
                                    name: item.riverName,
                                    standardNum: null,
                                    totalNum: null
                                };
                                this.rhhsszTable.push(param);
                            });
                        })
                    })


                if (this.rowData.gtsDetailList.length == 1) {
                    this.relationFun = this.rowData.gtsDetailList[0].relationFun;
                    this.dataTemplate.scoreId = this.rowData.gtsDetailList[0].guidelinesTargetScoreId;
                    this.templateGuidelinesTargetScoreId = this.dataTemplate.scoreId;
                    let params = {
                        id: this.rowData.id,
                        relationFun: this.relationFun
                    };
                    scheme_data_params(params)
                        .then(res => {
                            if (res.data.data.model.paramList[1].value) {
                                this.rhhsszTable = JSON.parse(
                                    res.data.data.model.paramList[1].value
                                );
                            }
                            this.exportXlsxResult = res.data.data.model.exportXlsxResult;
                            this.exportXlsxModel = res.data.data.model.exportXlsxModel;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            },
            calculationRHHS() {
                //计算预览
                this.calculationList(this.rhhsszTable);
            },
            dataRHHSSubmit() {
                //数据保存
                let params = this.dataSubmitSaveList(this.rhhsszTable);
                scheme_data_computed(params)
                    .then(res => {
                        this.$message({
                            message: "数据填写成功！",
                            type: "success"
                        });
                        this.rhhsFlag = false;
                        this.getSchemeTargetList();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //         <!-- -----------------------------------入湖河水水质达标率（10）---------结束--------------------- -->
            //         <!-- -----------------------------------湖泊水功能区（11）---------开始--------------------- -->
            hpsgnqCreated() {
                //水功能区初始化
                this.hpsgnqFlag = true;
                this.hpsgnqTable = [];
                if (this.rowData.gtsDetailList.length == 1) {
                    this.relationFun = this.rowData.gtsDetailList[0].relationFun;
                    this.dataTemplate.scoreId = this.rowData.gtsDetailList[0].guidelinesTargetScoreId;
                    let params = {
                        id: this.rowData.id,
                        relationFun: this.relationFun
                    };
                    scheme_data_params(params)
                        .then(res => {
                            this.hpsgnqTable = JSON.parse(res.data.data.model.paramList[1].value);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            },
            addNewHpsgnq() {
                //水功能区表格动态新增
                let newLine = {};
                this.hpsgnqTable.push(newLine); // 移到第一行
            },
            calculationHPSGNQ() {
                //水功能区计算预览
                this.calculationList(this.hpsgnqTable);
            },
            dataHpsgnqSubmit() {
                //水功能区数据提交
                let params = this.dataSubmitSaveList(this.hpsgnqTable);
                scheme_data_computed(params)
                    .then(res => {
                        this.$message({
                            message: "数据填写成功！",
                            type: "success"
                        });
                        this.hpsgnqFlag = false;
                        this.getSchemeTargetList();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //         <!-- -----------------------------------水功能区---------结束--------------------- -->
            //         <!-- ----------------------------------湖泊岸线开发利用率（12）---------开始--------------------- -->
            hpaxkfCreated() {
                //初始化
                this.hpaxkfFlag = true;
                this.hpaxkfTable=[]
                this.reachIdOptions.forEach(item => {
                    let param1 = {
                        name: item.name,
                        bsName: item.bankSlopeName1,
                        bsLen: item.bankSlopeLength1.toString(),
                        bsOccupyLen: ""
                    };
                    this.hpaxkfTable.push(param1);
                });
                if (this.rowData.gtsDetailList.length == 1) {
                    this.relationFun = this.rowData.gtsDetailList[0].relationFun;
                    this.dataTemplate.scoreId = this.rowData.gtsDetailList[0].guidelinesTargetScoreId;
                    this.templateGuidelinesTargetScoreId = this.dataTemplate.scoreId;
                    let params = {
                        id: this.rowData.id,
                        relationFun: this.relationFun
                    };
                    scheme_data_params(params)
                        .then(res => {
                            if (res.data.data.model.paramList[1].value) {
                                this.hpaxkfTable = JSON.parse(
                                    res.data.data.model.paramList[1].value
                                );
                            }
                            this.exportXlsxResult = res.data.data.model.exportXlsxResult;
                            this.exportXlsxModel = res.data.data.model.exportXlsxModel;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            },
            calculationHPAXKF() {
                //计算预览
                this.calculationList(this.hpaxkfTable);
            },
            dataHPAXKFSubmit() {
                //数据保存
                let params = this.dataSubmitSaveList(this.hpaxkfTable);
                scheme_data_computed(params)
                    .then(res => {
                        this.$message({
                            message: "数据填写成功！",
                            type: "success"
                        });
                        this.hpaxkfFlag = false;
                        this.getSchemeTargetList();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //         <!-- -----------------------------------岸线开发利用率---------结束--------------------- -->

            // <-------------其他类型，需要每项指标对应定制开发，根据本地的`funCodeList.js`配置文件寻找对应关系进行页面内容渲染 结束----->

            //         <!-- -----------------------------------计算预览/保存操作共性（param非数组）--------开始--------------------- -->
            calculation(info) {
                // 计算预览
                let param = {};
                info.paramList.forEach(item => {
                    let key = item.attrName;
                    let value = item.value;
                    let transf = {};
                    transf[key] = value;
                    Object.assign(param, transf);
                });
                let save = false; //是否调用保存方法
                let guidelinesTargetScoreId = info.scoreId;
                let params = {
                    save: save,
                    guidelinesTargetScoreId: guidelinesTargetScoreId,
                    assessSchemeId: this.schemeId,
                    data: param
                };
                Object.assign(params, this.rowData);
                scheme_data_computed(params).then(res => {
                    this.showCalculation = true;
                    this.result = res.data.data.result;
                    this.score = res.data.data.score;
                    this.scoreDesc = res.data.data.scoreDesc;
                });
            },
            dataSubmitSave(info) {
                // 保存
                let param = {};
                info.paramList.forEach(item => {
                    let key = item.attrName;
                    let value = item.value;
                    let transf = {};
                    transf[key] = value;
                    Object.assign(param, transf);
                });
                let save = true; //是否调用保存方法
                let guidelinesTargetScoreId = info.scoreId;
                let params = {
                    save: save,
                    guidelinesTargetScoreId: guidelinesTargetScoreId,
                    assessSchemeId: this.schemeId,
                    data: param,
                    fileCode: this.templateFileUrl
                };
                Object.assign(params, this.rowData);
                return params;
            },

            //         <!-- -----------------------------------计算预览/保存操作共性（param非数组）--------结束--------------------- -->
            //         <!-- -----------------------------------计算预览/保存操作共性（param数组）--------开始--------------------- -->
            calculationList(info) {
                // 计算预览
                let param = [];
                param = info;
                let save = false; //是否调用保存方法
                let guidelinesTargetScoreId = this.dataTemplate.scoreId;
                let params = {
                    save: save,
                    guidelinesTargetScoreId: guidelinesTargetScoreId,
                    assessSchemeId: this.schemeId,
                    data: {
                        param: param
                    }
                };
                Object.assign(params, this.rowData);
                scheme_data_computed(params).then(res => {
                    this.showCalculation = true;
                    this.result = res.data.data.result;
                    this.score = res.data.data.score;
                    this.scoreDesc = res.data.data.scoreDesc;
                });
            },
            dataSubmitSaveList(info) {
                // 保存
                let param = [];
                param = info;
                let save = true; //是否调用保存方法
                let guidelinesTargetScoreId = this.dataTemplate.scoreId;
                let params = {
                    save: save,
                    guidelinesTargetScoreId: guidelinesTargetScoreId,
                    assessSchemeId: this.schemeId,
                    data: {
                        param: param
                    },
                    fileCode: this.templateFileUrl
                };
                Object.assign(params, this.rowData);
                return params;
            },

            //         <!-- -----------------------------------计算预览/保存操作共性（param数组）--------结束--------------------- -->

            //         <!-- -----------------------------------模版下载功能---------开始--------------------- -->
            templateDownLoad() {
                // 模版下载
                let params = {
                    assessSchemeId: this.schemeId,
                    relationFun: this.relationFun
                };
                console.log(params);
                exls_template_down(params).then(res => {
                    let filename = "";

                    let disposition = res.headers["content-disposition"];

                    if (disposition && disposition.indexOf('attachment') !== -1) {
                        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;

                        var matches = filenameRegex.exec(disposition);

                        if (matches != null && matches[1]) {
                            filename = matches[1].replace(/['"]/g, '');

                        }
                    }

                    if (res.data.type == "application/json") {
                        //已有上传的文件模版
                        var reader = new FileReader();
                        reader.addEventListener("loadend", function () {
                            let resUrl = JSON.parse(reader.result);
                            window.location.href = resUrl.data.url;
                        });
                        if(res.data.size < 100){
                            // console.log(reader.readAsText(res.data))
                            this.$message("缺少必要基本信息，例如：河段（湖区）/站点信息")
                        } else {
                            reader.readAsBinaryString(res.data);
                        }
                        
                    } else {
                        //通过函数系统自动生产的模版
                        const link = document.createElement("a");
                        let blob = res.data;
                        link.style.display = "none";
                        link.href = URL.createObjectURL(blob);
                        link.download = decodeURI(filename); //下载的文件名
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                })
                .catch(err =>{
                    this.$message(err)
                });
            },
            importDtaEntry() {
                // 数据导入
                this.dialogImportDataFlag = true;
                this.templateDataFile = "";
            },
            uploadTemplateDta(file) {
                //文件流
                this.templateDataFile = file;
            },
            submitTemplateData() {
                //提交导入的数据(非实验室)
                var form = new FormData();
                form.append("file", this.templateDataFile.file);
                form.append(
                    "guidelinesTargetScoreId",
                    this.templateGuidelinesTargetScoreId
                );
                form.append("id", this.rowData.id);
                form.append("saveFile", true);
                form.append("srcType",7)
                console.log(this.rowData);
                this.templateFileUrl = null;
                if (this.rowData.dataType === 3) {
                    template_data_submit(form)
                        .then(res => {
                            this.$refs.importFile.clearFiles()
                            let datas = JSON.parse(res.data.data.data);
                            this.laboratoryData.paramList.forEach(item => {
                                for (let key in datas) {
                                    if (key == item.attrName) {
                                        item.value = JSON.stringify(datas[key]);
                                    }
                                }
                            });
                            this.templateFileUrl = res.data.data.fileCode
                            this.dialogImportDataFlag = false;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    template_data_submit(form)
                        .then(res => {
                            console.log(res);
                            this.$refs.importFile.clearFiles()
                            let datas = JSON.parse(res.data.data.data);
                            this.dataTemplate.paramList.forEach(item => {
                                for (let key in datas) {
                                    if (key == item.attrName) {
                                        item.value = JSON.stringify(datas[key]);
                                    }
                                }
                            });
                            this.templateFileUrl = res.data.data.fileCode
                            this.dialogImportDataFlag = false;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            },
            //         <!-- -----------------------------------模版下载功能---------结束--------------------- -->

            //         <!-- -----------------------------------工作文件上传---------开始--------------------- -->
            dataWork(info) {
                // 初始化
                this.fileList = [];
                this.dialogTitle = info.row.guidelinesTargetName;
                this.dialogOverVisable = true;
                console.log(this.schemeId, info);
                this.filePathList = [];

                this.workFileTargetId = info.row.guidelinesTargetId;
                let params = {
                    assessSchemeId: this.schemeId,
                    busType: 3,
                    guidelinesTargetId: this.workFileTargetId
                }
                getWorkFileList(params)
                    .then(res => {
                        console.log(res);

                        res.data.data.forEach(item => {
                            let param = {
                                id: item.id,
                                url: item.fileCode
                            }
                            this.fileList.push(param)
                        })
                    })
            },
            submitUpload() {
                let params = {
                    assessSchemeId: this.schemeId,
                    guidelinesTargetId: this.workFileTargetId,
                    picUrls: this.filePathList
                };
                workFileAddBatch(params).then(res => {
                    this.dialogOverVisable = false;
                    this.$message("提交成功！");
                    this.getSchemeTargetList();
                });
            },
            beforRemove(file, fileList) {
                return this.$confirm('确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    picDel(file.id)
                        .then(() => {
                            this.$message({
                                message: "删除成功",
                                type: 'success'
                            })
                        })

                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '已取消删除'
                    });
                });

            },
            uploadFunction(file) {
                var form = new FormData();
                form.append("file", file.file);
                form.append("srcType",7)
                uploadFileRequest(form)
                    .then(res => {
                        file.status = "success";
                        let path = "";
                        path = res.data.data.fileCode;
                        this.filePathList.push(path);
                    })
                    .catch(err => {
                        // loading.close()
                        console.log(err);
                        this.$message("上传失败！");
                    });
            },
            //         <!-- -----------------------------------工作文件上传--------结束--------------------- -->

            //         <!-- -----------------------------------问卷调查---------开始--------------------- -->
            questionnaireDetile(info) {
                console.log(info);
                let routeUrl = this.$router.resolve({
                    path: "/questionnaireDetile",
                    query: {
                        schemeId: this.schemeId
                    }
                });
                window.open(routeUrl.href, '_blank');

            },
            questionnaireTJ(info) {
                console.log(info);
                let params = {
                    assessSchemeId: this.schemeId,
                    guidelinesTargetId: info.row.guidelinesTargetId,
                    guidelinesTargetScoreId: info.row.gtsDetailList[0].guidelinesTargetScoreId
                }
                statisticsQuestionnaire(params).then(res => {
                    this.getSchemeTargetList()
                })

            },
            // 查看问卷页面（二维码对应的填报页面，用于pc端查看）
            questionnaire(info) {
                // console.log(info, this.questionnaireToken);
                // console.log(window.location.origin,window.location.pathname)
                let url = window.location.origin + window.location.pathname + '#/questionnaire?questionnaireToken=' + this.questionnaireToken
                window.open(url, '_blank')
                // this.$router.push({
                //     path: "/questionnaire",
                //     query: {
                //         questionnaireToken: this.questionnaireToken
                //     }
                // });
            },
            // 调查问卷二维码动态生成
            qrCode(info) {
                this.drawer = true
                setTimeout(() => {
                    let url = window.location.origin + window.location.pathname + '/#/questionnaire?questionnaireToken=' + this.questionnaireToken
                    document.getElementById("qrcodeId").innerHTML = "";
                    let qrcode = new QRCode('qrcodeId', { // 第一个参数是组件的id值
                        text: url, // 生成二维码的文本
                        width: 300,
                        height: 300,
                        colorDark: '#000000', // 二维码色
                        colorLight: '#ffffff', // 二维码背景色
                        correctLevel: QRCode.CorrectLevel.H // 容错等级
                    })
                }, 0);
            },
            // 二维码下载
            download() {
                let canvasData = this.$refs.qrcode.getElementsByTagName('canvas')
                let a = document.createElement("a");
                let event = new MouseEvent("click"); // 创建一个单击事件
                a.href = canvasData[0].toDataURL("image/png");;
                a.download = this.schemeName + "公众满意度调查问卷二维码";
                a.dispatchEvent(event); // 触发a的单击事件
            },
            //         <!-- -----------------------------------问卷调查---------结束--------------------- -->
        }
    };
</script>

<style lang="less" scoped>

/deep/ .el-dialog__body{
    padding: 0 20px;
}
</style>