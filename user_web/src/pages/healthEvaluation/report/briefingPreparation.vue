<template>
    <div>
        <!-- <div>
            <el-button @click="exportBriefing" type="info">简报导出</el-button>
        </div> -->
        <div id="mainPage">
            <el-row class="row-width">
                <h2 style="text-align: center;margin: 40px;" @click="exportBriefing">{{briefingData.objName}}</h2>
            </el-row>
            <el-row class="row-width" :gutter="20">
                <el-col :span="24">
                    <div class="wordLeft1" contenteditable=true>{{briefingData.objName}}{{briefingData.simpleDesc}}
                    </div>
                </el-col>
                <!-- <el-col :span="8">
                    <img :src="url" alt="" style="height:70mm ;width: 70mm;">
                </el-col> -->
            </el-row>
            <el-row class="row-width" :gutter="20">
                <el-col :span="12">
                    <div id="pointChart" class="point-chart"></div>
                </el-col>
                <el-col :span="12">
                    <div class="wordright1" contenteditable=true>
                        {{briefingData.objName}}健康状况指数综合得分为{{briefingData.score}}，健康综合评价等级为“优”，健康状态为“{{briefingData.scoreDesc}}”。
                    </div>
                    <div class="wordQuestion" v-if="briefingData.suggestionsList == []">
                        <p>河道主要问题有：</p>
                        <ul v-for="item in briefingData.suggestionsList"  contenteditable=true>
                            <li>{{item.problem}}</li>
                        </ul>
                    </div>

                </el-col>
            </el-row>
            <el-row class="row-width" :gutter="20">
                <el-col :span="9">
                    <div class="wordSz" contenteditable=true>
                        依据《地表水环境质量标准》（GB3838-2002），选取溶解氧、高锰酸盐指数、氨氮、五日生化需氧量、总磷指标，采用{{siteName}}个水质监测断面{{briefingData.year}}年度水功能区监测成果，取各项指标的加权平均值对{{briefingData.objName}}水质进行评价。{{briefingData.year}}
                        年度{{briefingData.objName}}水质年均值综合评价为{{briefingData.waterQualityLevel}}类</div>
                </el-col>
                <el-col :span="13">
                    <div id="szChart" class="sz-chart"></div>
                </el-col>
            </el-row>
            <el-row class="row-width" :gutter="20">
                <div v-for="item in this.urlList" v-bind:key="item">
                    <el-col :span="12" contenteditable=true>
                        <!-- <div v-for="item in this.urlList"> -->
                        <img :src="item" alt="" style="height:70mm ;width: 70mm;">
                        <!-- </div> -->
                    </el-col>
                </div>

            </el-row>
            <el-row class="row-width" :gutter="20">
                <div class="wordQuestion" v-if="briefingData.suggestionsList == []">
                    <p>建议：</p>
                    <ul v-for="item in briefingData.suggestionsList" v-bind:key="item" contenteditable=true>
                        <li>{{item.suggest}}</li>
                    </ul>
                </div>
            </el-row>

            <el-row class="row-width" :gutter="20">
                <div style="width: auto;height: auto;">
                    <h2 style="text-align: center;margin: 10px;">{{briefingData.objName}}健康评估单项指标及综合评价结果</h2>
                    <table id="table" border="1" cellspacing='0' width="98%" style="text-align: center;">
                    </table>
                </div>
            </el-row>
        </div>

    </div>

</template>
<script>
    import * as echarts from 'echarts';
    import saveAs from "file-saver"
    import dataMo from '@/pages/jianbaoData.json'
    import "../../../../static/js/jquery-1.9.1.js"
    import "../../../../static/js/jquery.wordexport"
    import { get_briefing_data } from "@/api/scheme/index";
    export default {
        name: "briefingPreparation",
        data() {
            return {
                schemeId: this.$route.query.schemeId,
                briefingData: {},//简报数据内容
                url: "",//水系图url
                urlList: [],//现场图列表
                siteName: '',//站点名称处理
                pointlegend: [],//指标分数图指标项数组
                pointData: [],//指标分数图数据项数组
                strHtml: '',//表格生成行
                strHtmlTotal: '',//表格生成最终html代码块
                layerDepth:null
            }
        },
        props: {},
        created() {
            this.getBriefingData()

        },
        mounted() {

        },
        methods: {
            getBriefingData() {
                get_briefing_data(this.schemeId)
                    .then(res => {
                        console.log('res', res)
                        this.briefingData = res.data.data//简报数据赋值
                        // this.url = res.data.data.waterSystemMap
                        res.data.data.siteList.forEach(item => {
                            this.siteName += item.siteName + '、'
                        });
                        this.siteName = this.siteName.substr(0, this.siteName.length - 1) + res.data.data.siteList.length
                        this.urlList = res.data.data.sceneImage
                        res.data.data.asdList.forEach(item => {
                            this.pointlegend.push(item.guidelinesTargetName)
                            this.pointData.push(item.score)

                        })
                        this.drawPointChart()
                        this.bindRiverHealthInfo()
                    })
            },
            //生成评分值的极坐标图
            drawPointChart() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('pointChart'));
                let option;
                let pointlegend = [];


                option = {
                    angleAxis: {
                        type: 'category',
                        data: this.pointlegend
                    },
                    radiusAxis: {
                    },
                    polar: {
                    },
                    series: [{
                        type: 'bar',
                        data: this.pointData,
                        coordinateSystem: 'polar',
                        itemStyle: {
                            color: function (params) {
                                if (params.value > 0 && params.value < 40) {
                                    return "#FF5809";
                                } else if (params.value >= 40 && params.value < 60) {
                                    return "#FFFF37";
                                } else if (params.value >= 60 && params.value < 80) {
                                    return "#28FF28";
                                }
                                return "#0000E3";
                            }
                        }
                    }],

                };

                option && myChart.setOption(option);
            },

            exportBriefing() {
                window.print();
            },

            GetChild(arr) {
                let varT = ''
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].finalNodeSize == 0) {
                        if (this.strHtml == '') {
                            if (arr[i].score) {
                                varT = arr[i].score[0]
                                if(varT.scoreDesc){
                                    this.strHtml += '<td>' + arr[i].name + '(' + arr[i].code + ')' + '</td>' + '<td>' + varT.score + '</td><td>' + varT.scoreDesc + '</td></tr>';
                                } else{
                                    this.strHtml += '<td>' + arr[i].name + '(' + arr[i].code + ')' + '</td>' + '<td>' + varT.score + '</td><td>' +'-' + '</td></tr>';
                                }
                                this.strHtmlTotal += this.strHtml;
                                this.strHtml = '';
                            } else {
                                this.strHtml += '<tr><td>' + arr[i].name + '(' + arr[i].code + ')' + '</td>' + '<td>' + '-' + '</td><td>' + '-' + '</td></tr>';
                                this.strHtmlTotal += this.strHtml;
                                this.strHtml = '';
                            }


                        } else {
                            if (arr[i].score) {
                                varT = arr[i].score[0]
                                if(varT.scoreDesc){
                                    this.strHtml += '<td>' + arr[i].name + '(' + arr[i].code + ')' + '</td>' + '<td>' + varT.score + '</td><td>' + varT.scoreDesc + '</td></tr>';
                                } else{
                                    this.strHtml += '<td>' + arr[i].name + '(' + arr[i].code + ')' + '</td>' + '<td>' + varT.score + '</td><td>' +'-' + '</td></tr>';
                                }
                                
                                this.strHtmlTotal += this.strHtml;
                                this.strHtml = '';
                            } else {
                                this.strHtml += '<td>' + arr[i].name + '(' + arr[i].code + ')' + '</td>' + '<td>' + '-' + '</td><td>' + '-' + '</td></tr>';
                                this.strHtmlTotal += this.strHtml;
                                this.strHtml = '';
                            }
                        }
                    } else if (arr[i].finalNodeSize == 1) {
                        if (this.strHtml == '') {
                            this.strHtml += '<tr><td>' + arr[i].name + '(' + arr[i].code + ')' + '</td>';
                        } else {
                            this.strHtml += '<td>' + arr[i].name + '(' + arr[i].code + ')' + '</td>';
                        }
                        this.GetChild(arr[i].children);
                    } else {
                        if (this.strHtml == '') {
                            this.strHtml += '<tr><td rowspan="' + arr[i].finalNodeSize + '">' + arr[i].name + '(' + arr[i].code + ')' + '</td>';
                        } else {
                            this.strHtml += '<td rowspan="' + arr[i].finalNodeSize + '">' + arr[i].name + '(' + arr[i].code + ')' + '</td>';
                        }
                        this.GetChild(arr[i].children);
                    }
                }
            },
            bindRiverHealthInfo() {
                const _this = this
                var result = this.briefingData.resultTable;

                this.strHtml = '';
                this.strHtmlTotal = '';
                if (result.finalNodeSize == 0) {
                    this.strHtml += '<tr><td>' + result.name + '(' + result.code + ')' + '</td></tr>';
                } else {
                    this.strHtml += '<tr>';
                    this.GetChild(result.children);
                }
                this.getLayerDepth(result)
                let colspanNum = this.layerDepth - 1
                this.strHtmlTotal += '<tr><td colspan="' + colspanNum + '">' + '综合得分' + '</td><td>' + this.briefingData.score + '</td><td>' + this.briefingData.scoreDesc + '</td></tr>'

                document.getElementById('table').innerHTML = this.strHtmlTotal


            },
            getLayerDepth(result){
                if(result.children){
                    this.getLayerDepth(result.children[0])
                } else {
                    this.layerDepth = result.layerDepth
                }
            }

        },
    }
</script>
<style>
    #mainPage {
        height: 99%;
        width: 210mm;
        position: absolute;
        /* left: 20%; */

    }

    .row-width {
        padding-top: 2px;
        padding-left: 10%;
        padding-right: 10%;
        width: 100%;
    }

    .wordLeft1 {
        line-height: 2em;
        text-indent: 2em;
        /* float: left; */
    }

    .point-chart {
        height: 80mm;
        width: 80mm;
        /* border: 1px solid #000; */
    }

    .wordright1 {
        /* margin-left: 30px; */
        line-height: 2em;
        text-indent: 2em;
        /* float: left; */
    }

    .wordQuestion {
        margin-left: 2em;
        line-height: 2em;
        text-indent: 2em;
    }

    .wordSz {
        line-height: 2em;
        text-indent: 2em;
    }

    .sz-chart {
        height: 80mm;
        width: 105mm;
        border: 1px solid #000;
    }
</style>