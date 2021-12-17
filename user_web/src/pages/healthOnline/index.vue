<template>
    <main style="position: relative;">
        <div></div>
        <img usemap="#indexMap" :src="file" alt="" width="100%" :height="heightMax"
            style="position: absolute;z-index: 0;">
        <!-- <img src="../../assets/loujiang.png" alt="" width="100%" height="100%">  -->
        <map name="indexMap">
            <area shape="circle" coords="680,600,300" @click="getNcj">
            <!-- <area shape="circle" coords="680,520,100"  href=""> -->
            <area shape="circle" coords="620,180,150" @click='getNcj1Pic'>
            <!-- <area shape="circle" coords="620,180,50" href="http://www.baidu.com" target="_black"> -->
        </map>
        <!-- 单一河流信息展示左侧 -->
        <div style="position: fixed; border: rgba(69, 73, 87, 0.5) solid 0px;" v-if="!cardtag">
            <el-card
                style="background-color: rgba(69, 73, 87, 0.7);color: #fff;margin-top: 20px;margin-left: 10px;border: none;font-size: 14px;">

                <span style="font-size:16px;font-weight:600;">苏州河湖概况</span>
                <br>
                <br>
                <p>苏州市位于太湖流域东北部，是典型的平原水</p>
                <p>网地区。境内河港交织、湖荡棋布，共计有大</p>
                <p>小河道2万余条，湖泊荡漾323个，主要通江河</p>
                <p>道41条，丰富的水资源为苏州市提供了得天独</p>
                <p>厚的发展优势。</p>
            </el-card>
            <el-card
                style="background-color: rgba(69, 73, 87, 0.7);color: #fff;margin-top: 20px;margin-left: 10px;border: none;">
                <span style="font-size:16px;font-weight:600;">河湖健康状况统计</span>

                <div id="qqChart" style="width:280px;height:100px;"></div>

            </el-card>
            <el-card
                style="background-color: rgba(69, 73, 87, 0.7);color: #fff;margin-top: 20px;margin-left: 10px;border: none;">
                <h3>河湖问题统计</h3>
                <br>
                <div id="hhwtChart" style="width:250px;height:180px;"></div>


            </el-card>
        </div>
        <!-- 全地区信息展示 -->
        <div style="position: absolute; right:10px;border: rgba(69, 73, 87, 0.5) solid 0px;" v-if="!cardtag">
            <el-card
                style="background-color: rgba(69, 73, 87, 0.7);color: #fff;margin-top: 20px;margin-left: 10px;border: none; ">

                <h3 style="display: inline-block;">健康排名</h3>
                <el-select class="selection" v-model="object" placeholder="请选择" size="mini">
                    <el-option label="河流" value="河流"></el-option>
                    <el-option label="湖泊" value="湖泊"></el-option>
                </el-select>

                <br>

                <br>
                <table width="300px">
                    <tr style="text-align: center;font-size: 14px;">
                        <th class="thd">排名</th>
                        <th class="thd">名称</th>
                        <th class="thd">健康指数</th>
                        <th class="thd">健康状况</th>
                        <th class="thd">健康码</th>

                    </tr>
                    <tbody style="text-align: center;font-size: 12px;" v-if="this.object == '河流'">
                        <tr>

                            <td>1</td>
                            <td>杨林塘（昆山）</td>
                            <td>81.6</td>
                            <td>健康</td>
                            <td>
                                <img src="../../assets/lm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>2</td>
                            <td>急水港</td>
                            <td>81.2</td>
                            <td>健康</td>
                            <td>
                                <img src="../../assets/lm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>3</td>
                            <td>娄江（市区）</td>
                            <td>81.1</td>
                            <td>健康</td>
                            <td>
                                <img src="../../assets/lm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>4</td>
                            <td>杨林塘（太仓）</td>
                            <td>80.7</td>
                            <td>健康</td>
                            <td>
                                <img src="../../assets/lm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>5</td>
                            <td>牛长泾</td>
                            <td>80.3</td>
                            <td>健康</td>
                            <td>
                                <img src="../../assets/lm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>6</td>
                            <td>娄江（昆山）</td>
                            <td>79.4</td>
                            <td>亚健康</td>
                            <td>
                                <img src="../../assets/hm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>7</td>
                            <td>屯浦塘</td>
                            <td>79.3</td>
                            <td>亚健康</td>
                            <td>
                                <img src="../../assets/hm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>8</td>
                            <td>张家港</td>
                            <td>78.7</td>
                            <td>亚健康</td>
                            <td>
                                <img src="../../assets/hm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>9</td>
                            <td>外塘河</td>
                            <td>76.4</td>
                            <td>亚健康</td>
                            <td>
                                <img src="../../assets/hm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>10</td>
                            <td>斜港</td>
                            <td>75.9</td>
                            <td>亚健康</td>
                            <td>
                                <img src="../../assets/hm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>11</td>
                            <td>三泾河</td>
                            <td>75.3</td>
                            <td>亚健康</td>
                            <td>
                                <img src="../../assets/hm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>12</td>
                            <td>黄埭塘</td>
                            <td>74.3</td>
                            <td>亚健康</td>
                            <td>
                                <img src="../../assets/hm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>13</td>
                            <td>胥江</td>
                            <td>74.0</td>
                            <td>亚健康</td>
                            <td>
                                <img src="../../assets/hm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>14</td>
                            <td>浏河</td>
                            <td>73.7</td>
                            <td>亚健康</td>
                            <td>
                                <img src="../../assets/hm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>15</td>
                            <td>蛇泾</td>
                            <td>73.5</td>
                            <td>亚健康</td>
                            <td>
                                <img src="../../assets/hm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>16</td>
                            <td>木光运河</td>
                            <td>73.1</td>
                            <td>亚健康</td>
                            <td>
                                <img src="../../assets/hm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>17</td>
                            <td>十一圩港 </td>
                            <td>72.7</td>
                            <td>亚健康</td>
                            <td>
                                <img src="../../assets/hm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>18</td>
                            <td>西塘河</td>
                            <td>70.7</td>
                            <td>亚健康</td>
                            <td>
                                <img src="../../assets/hm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>19</td>
                            <td>尤泾</td>
                            <td>70.4</td>
                            <td>亚健康</td>
                            <td>
                                <img src="../../assets/hm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <!-- <tr>

                            <td>20</td>
                            <td>横路港</td>
                            <td>68.7</td>
                            <td>亚健康</td>
                            <td>
                                <img src="../../assets/hm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr> -->

                    </tbody>

                    <tbody style="text-align: center;font-size: 12px;" v-if="this.object == '湖泊'">
                        <tr>

                            <td>1</td>
                            <td>金鸡湖</td>
                            <td>80.7</td>
                            <td>健康</td>
                            <td>
                                <img src="../../assets/lm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>2</td>
                            <td>淀山湖</td>
                            <td>76.5</td>
                            <td>亚健康</td>
                            <td>
                                <img src="../../assets/hm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>3</td>
                            <td>镬底潭</td>
                            <td>75.3</td>
                            <td>亚健康</td>
                            <td>
                                <img src="../../assets/hm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>4</td>
                            <td>春申湖</td>
                            <td>75.2</td>
                            <td>亚健康</td>
                            <td>
                                <img src="../../assets/hm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>5</td>
                            <td>金鱼漾</td>
                            <td>71.0</td>
                            <td>亚健康</td>
                            <td>
                                <img src="../../assets/hm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>
                        <tr>

                            <td>6</td>
                            <td>阳澄湖</td>
                            <td>68.8</td>
                            <td>亚健康</td>
                            <td>
                                <img src="../../assets/hm.png" alt="" height="22px" width="22px">
                            </td>

                        </tr>

                    </tbody>
                </table>



            </el-card>

        </div>
        <!-- 单一河流信息展示左侧 -->
        <div style="position: fixed; border: rgba(69, 73, 87, 0.5) solid 0px;" v-if="cardtag">
            <el-card
                style="background-color: rgba(69, 73, 87, 0.7);color: #fff;margin-top: 20px;margin-left: 10px;border: none;">

                <span style="font-size:16px;font-weight:600;">牛长泾概况</span>
                <span style="font-size: 16px;font-style: italic;margin-left: 130px;text-align: center;padding: 2px;">
                    报告查看</span>

                <br>
                <br>
                <p>牛长泾北起南星湖，南至三白荡，全长9km，</p>
                <p>河道功能主要为排涝和供水</p>


            </el-card>
            <el-card
                style="background-color: rgba(69, 73, 87, 0.7);color: #fff;margin-top: 20px;margin-left: 10px;border: none;">
                <span style="font-size:16px;font-weight:600;">牛长泾健康评估</span>
                <span
                    style="font-size: 16px;font-style: italic;margin-left: 100px;background-color: lightgreen;width: 120px;text-align: center;padding: 2px;">
                    健康 80.33</span>

                <br>
                <div id="titalChart" style="width:300px;height:220px;"></div>

            </el-card>
            <el-card
                style="background-color: rgba(69, 73, 87, 0.7);color: #fff;margin-top: 20px;margin-left: 10px;border: none;">
                <h3>牛长泾问题</h3>
                <br>
                <ul style="margin-left: 20px;">
                    <li style="padding-bottom: 2px;">流动性偏差</li>
                    <li style="padding-bottom: 2px;">生物多样性偏低</li>
                    <li style="padding-bottom: 2px;">岸线开发利用率高
                        <el-button type='text' @click='detileWt' size='mini'>详情</el-button>
                    </li>
                    <li style="padding-bottom: 2px;">生态岸坡比例偏低</li>
                    <li style="padding-bottom: 2px;">景观舒适度和公众满意度偏低</li>
                </ul>


            </el-card>
        </div>
        <!-- 单一河流信息展示右侧 -->
        <div style="right: 10px; position: fixed; border: rgba(69, 73, 87, 0.5) solid 0px;" v-if="cardtag">
            <el-card
                style="background-color: rgba(69, 73, 87, 0.7);color: #fff;margin-top: 20px;margin-left: 10px;border: none;">

                <div id="szChart" style="width:380px;height:210px;"></div>
                <h3 style="text-align:center;">水生生物检测结果</h3>
                <h4 style="margin-left: 20px;">春季</h4>
                <table width="380px">
                    <tr style="text-align: center;font-size: 8px;background-color:#D0D0D0;color: #000;">
                        <th class="thd">底栖生物S-W多样性指数</th>
                        <th class="thd">底栖生物OI指数</th>
                        <th class="thd">浮游植物Marglef丰富度指数</th>
                        <th class="thd">着生藻类S-W多样性</th>

                    </tr>
                    <tbody style="text-align: center;font-size: 8px;" v-if="this.object == '河流'">
                        <tr>

                            <td>1.712</td>
                            <td>4%</td>
                            <td>0.79</td>
                            <td>0.68</td>
                        </tr>
                        <tr>

                            <td>不健康</td>
                            <td>非常健康</td>
                            <td>病态</td>
                            <td>病态</td>

                        </tr>

                    </tbody>
                </table>
                <hr color='#000'>
                <h4 style="margin-left:20px;">夏季</h4>
                <table width="380px">
                    <tr style="text-align: center;font-size: 10px;background-color:#D0D0D0;color: #000;">
                        <th class="thd">底栖生物S-W多样性指数</th>
                        <th class="thd">底栖生物OI指数</th>
                        <th class="thd">浮游植物Marglef丰富度指数</th>
                        <th class="thd">着生藻类S-W多样性</th>

                    </tr>
                    <tbody style="text-align: center;font-size: 12px;" v-if="this.object == '河流'">
                        <tr>

                            <td>1.528</td>
                            <td>1%</td>
                            <td>0.71</td>
                            <td>1.90</td>
                        </tr>
                        <tr>

                            <td>不健康</td>
                            <td>非常健康</td>
                            <td>病态</td>
                            <td>不健康</td>

                        </tr>

                    </tbody>
                </table>
                <hr color='#000'>
                <h4 style="margin-left:20px;">秋季</h4>
                <table width="380px">
                    <tr style="text-align: center;font-size: 10px;background-color:#D0D0D0;color: #000;">
                        <th class="thd">底栖生物S-W多样性指数</th>
                        <th class="thd">底栖生物OI指数</th>
                        <th class="thd">浮游植物Marglef丰富度指数</th>
                        <th class="thd">着生藻类S-W多样性</th>

                    </tr>
                    <tbody style="text-align: center;font-size: 12px;" v-if="this.object == '河流'">
                        <tr>

                            <td>1.228</td>
                            <td>0/td>
                            <td>0.71</td>
                            <td>2.49</td>
                        </tr>
                        <tr>

                            <td>不健康</td>
                            <td>非常健康</td>
                            <td>病态</td>
                            <td>亚健康</td>

                        </tr>

                    </tbody>
                </table>
                <hr color='#000'>
                <h4 style="margin-left:20px;">冬季</h4>
                <table width="380px">
                    <tr style="text-align: center;font-size: 10px;background-color:#D0D0D0;color: #000;">
                        <th class="thd">底栖生物S-W多样性指数</th>
                        <th class="thd">底栖生物OI指数</th>
                        <th class="thd">浮游植物Marglef丰富度指数</th>
                        <th class="thd">着生藻类S-W多样性</th>

                    </tr>
                    <tbody style="text-align: center;font-size: 12px;" v-if="this.object == '河流'">
                        <tr>

                            <td>1.707</td>
                            <td>1%</td>
                            <td>0.88</td>
                            <td>188</td>
                        </tr>
                        <tr>

                            <td>不健康</td>
                            <td>非常健康</td>
                            <td>病态</td>
                            <td>不健康</td>

                        </tr>

                    </tbody>
                </table>


            </el-card>
        </div>
        <!-- 问题详情 -->
        <div style="position: fixed; border: rgba(69, 73, 87, 0.5) solid 0px;" v-if='detileWttag'>
            <el-card
                style="background-color: rgba(69, 73, 87, 0.7);color: #fff;margin-top: 350px;margin-left: 350px;border: none;width: 400px;">
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对牛长泾两岸踏勘调查结果，除农业等利用因素外，两岸部分岸坡主要被民居建筑以及桥梁、管道、道路等固定设施占用，对河道生态系统产生干扰。根据现场踏勘调查结果，综合影像图片资料统计，调查河段岸线全长约18km，两侧占用岸线共计7.04km，岸线开发利用率为49%，开发利用率高。
                </p>
                <img src="../../assets/ncjkf1.jpeg" alt="" style="height: 150px;width: 170px;">
                <img src="../../assets/ncjkf2.png" alt="" style="height: 150px;width: 170px;">

            </el-card>

        </div>
        <!-- 断面信息弹窗 -->
        <el-dialog :close-on-click-modal="false" append-to-body title="NCJ1" :visible.sync="ncjDialogFlag" width="50%">
            <el-tabs v-model="activeName" style="margin-top: -30px;">
                <el-tab-pane label="岸坡稳定性" name="first">
                    <p>岸坡已整治，多为直立钢筋混凝土岸坡，未见有不稳定岸坡现象</p>
                    <br>
                    <img src="../../assets/ncj1.png" alt="" style="height: 200px;width: 300px;">
                    <img src="../../assets/ncj12.png" alt="" style="height: 200px;width: 300px;">
                </el-tab-pane>
                <el-tab-pane label="岸坡植被覆盖率" name="second">
                    <p>多为新建岸坡，两岸多为农用地，植被带窄。岸坡开发利用及植被分布调查统计情况如下</p>
                    <br>
                    <table border="1" cellspacing='0' width="100%">

                        <tr style="height: 60px;font-size: 12px;background-color: #e6e6e6;">
                            <th>起讫位置</th>
                            <th></th>
                            <th>河岸长度（m）</th>
                            <th>岸坡占用长度(m)</th>
                            <th>无植被岸坡面积(m2)</th>
                            <th>河段面积(m2)</th>
                            <th>岸线占用率(%)</th>
                            <th>植被覆盖率(%)</th>
                            <th>主要占用项</th>
                        </tr>
                        <tbody style="text-align: center;font-size: 16px;">
                            <tr style="height: 30px;">
                                <td rowspan="2">
                                    南星湖——牛头湖
                                </td>
                                <td>
                                    西岸
                                </td>
                                <td>
                                    2370
                                </td>
                                <td>
                                    1148
                                </td>
                                <td>
                                    50584
                                </td>
                                <td>
                                    118500
                                </td>
                                <td>
                                    48.44%
                                </td>
                                <td>
                                    57.31%
                                </td>
                                <td>
                                    桥（1座）住宅等建筑
                                </td>
                            </tr>
                            <tr style="height: 30px;">
                                <td>
                                    东岸
                                </td>
                                <td>
                                    2365
                                </td>
                                <td>
                                    2158
                                </td>
                                <td>
                                    75478
                                </td>
                                <td>
                                    118250
                                </td>
                                <td>
                                    91.25%
                                </td>
                                <td>
                                    36.17%
                                </td>
                                <td>
                                    桥（1座）住宅等建筑
                                </td>
                            </tr>

                        </tbody>




                    </table>
                </el-tab-pane>
                <el-tab-pane label="岸坡环境整治程度" name="third">
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;结合牛长泾“一河一策”等相关资料，根据现场调查情况，牛长泾沿岸岸坡虽多已经整治，但因穿越乡郊</p>
                    <p>及民居密集地带，部分河段“四乱”现象较严重， NCJ1河段民居密集处沿河有一处有乱占现象。</p>
                    <br>
                    <img src="../../assets/ncj1hjzz.png" alt="" style="height: 200px;width: 300px;">

                </el-tab-pane>
                <el-tab-pane label="水体整洁程度" name="fourth">
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据现场调查及航拍影像资料统计，牛长泾4个季节水体均未有异味，但河道内垃圾、水葫芦等漂浮物较为常见，</p>
                    <p>调查期间，3个河段内均可见有少量漂浮废弃物。</p>
                    <br>
                    <img src="../../assets/ncj1fqw.png" alt="" style="height: 200px;width: 300px;">
                </el-tab-pane>


            </el-tabs>
        </el-dialog>



    </main>
</template>
<script>
    import * as echarts from 'echarts';
    export default {
        data() {
            return {
                file: '',
                cardtag: false,
                ncjDialogFlag: false,
                detileWttag: false,
                heightMax: '',
                activeName: 'first',
                object: '河流',
                imgList: [
                    {
                        url: require('../../assets/index.png')
                    },
                    {
                        url: require('../../assets/ncjzx.png')
                    }
                ],


            }
        },
        mounted() {
            this.newIndex();
            this.getheught();
            this.drawqqChart();
            this.drawhhwtChart();
        },
        methods: {
            getheught() {
                this.heightMax = document.documentElement.clientHeight - 60
                console.log(document.body.clientHeight)

            },
            newIndex() {
                this.file = this.imgList[0].url
            },
            getNcj() {
                this.file = this.imgList[1].url
                this.cardtag = true
                setTimeout(() => this.draw(), 500)

            },
            //断面点击方法
            getNcj1Pic() {
                this.ncjDialogFlag = true
            },
            getNcj1Picout() {
                setTimeout(() => {
                    this.changeType()
                }, 1000)

            },
            draw() {
                this.drawtitalChart()
                this.drawszChart()
            },
            detileWt() {

                this.detileWttag = true
                setTimeout(() => { this.detileWt1() }, 1000)
            },
            detileWt1() {
                this.detileWttag = false
            },
            changeType() {
                this.ncj1Pic = false
            },
            //健康评估
            drawtitalChart() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('titalChart'));
                var option;

                option = {
                    color: ['#FFE434'],

                    radar: [
                        {
                            indicator: [
                                { text: '生态健康\n71.63', max: 100 },
                                { text: '服务功能\n91.96', max: 100 },
                                { text: '干扰程度\n70.50', max: 100 },
                                { text: '管理水平\n85.20', max: 100 }
                            ],
                            center: ['50%', '50%'],
                            radius: 60,
                            startAngle: 90,
                            splitNumber: 4,
                            shape: 'circle',
                            name: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#fff'

                                }
                            },
                            splitArea: {
                                areaStyle: {
                                    color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
                                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                                    shadowBlur: 10
                                }
                            },
                        },

                    ],
                    series: [
                        {
                            name: '雷达图',
                            type: 'radar',
                            emphasis: {
                                lineStyle: {
                                    width: 4
                                }
                            },
                            data: [
                                {
                                    value: [71.63, 91.96, 70.50, 85.20],
                                    name: 'Data B',
                                    areaStyle: {
                                        color: 'rgba(255, 228, 52, 0.7)'
                                    }
                                }
                            ]
                        },
                    ]
                };

                option && myChart.setOption(option);
            },
            //水质图表
            drawszChart() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('szChart'));
                var option;

                option = {
                    title: {
                        text: '水质监测结果统计',
                        textStyle: {
                            color: '#fff'
                        },
                    },

                    tooltip: {
                        trigger: 'axis',
                        color: ['#FFE434'],
                    },
                    legend: {
                        data: ['pH', 'DO', 'CODMn', 'BOD5', 'NH3-N', 'TP'],
                        orient: 'vertical',
                        left: 'right',
                        textStyle: {
                            fontSize: 15,
                            color: '#fff'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '10%',
                        bottom: '8%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['1月', '3月', '5月', '7月', '9月', '11月'],
                        axisLabel: {
                            textStyle: {
                                color: '#fff',//坐标值得具体的颜色

                            }
                        },
                        axisLine: {
                            lineStyle: {
                                type: 'solid',
                                color: '#fff',//左边线的颜色
                                width: '2'//坐标线的宽度
                            }
                        },
                        splitLine: {
                            show: false
                        }


                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            textStyle: {
                                color: '#fff',//坐标值得具体的颜色

                            }
                        },
                        axisLine: {
                   lineStyle: {
                       type: 'solid',
                       color:'#fff',
                       width:'2'
                   }
               },
                        splitLine: {
                            show: false
                        }
                    },
                    series: [
                        {
                            name: 'pH',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
                            data: [8.02, 8.82, 7.86, 7.79, 7.84, 8.17]
                        },
                        {
                            name: 'DO',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
                            data: [10.20, 12.02, 7.31, 6.30, 5.25, 7.56]
                        },
                        {
                            name: 'CODMn',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
                            data: [3.25, 3.65, 4.25, 4.35, 4.05, 3.75]
                        },
                        {
                            name: 'BOD5',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
                            data: [4.10, 4.60, 2.65, 1.45, 1.70, 1.25]
                        },
                        {
                            name: 'NH3-N',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
                            data: [0.66, 0.08, 0.41, 0.32, 0.35, 0.25]
                        },
                        {
                            name: 'TP',
                            type: 'line',
                            stack: '总量',
                            smooth: true,
                            data: [0.13, 0.26, 0.13, 0.12, 0.05, 0.12]
                        }
                    ]
                };

                option && myChart.setOption(option);
            },
            //全区健康图表
            drawqqChart() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('qqChart'));
                var option;

                option = {
                    tooltip: {
                        trigger: 'item',


                    },
                    legend: {
                        top: '5%',
                        left: 'right',
                        orient: 'vertical',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    series: [
                        {
                            name: '数量',
                            type: 'pie',
                            radius: ['40%', '80%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                { value: 5, name: '健康' },
                                { value: 14, name: '亚健康' }
                            ]
                        }
                    ]
                };

                option && myChart.setOption(option);
            },
            //全区健康图表
            drawhhwtChart() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('hhwtChart'));
                var option;

                option = {
                    radar: {
                        indicator: [
                            { name: '流动性偏差 ', max: 100 },
                            { name: '岸线开\n发利用\n率偏高', max: 100 },
                            { name: '生态岸坡\n比例偏低 ', max: 100 },
                            { name: '水体整洁\n度偏差', max: 100 },
                            { name: '水生物\n多样性\n偏差', max: 100 }
                        ],
                        center: ['50%', '55%']

                    },
                    series: [{
                        name: '',
                        type: 'radar',
                        data: [
                            {
                                value: [56, 60, 44, 36, 82],
                                name: '数量'
                            }
                        ]
                    }]
                };



                option && myChart.setOption(option);
            }

        }
    }

</script>
<style>
    .selection {
        background-color: cadetblue;

    }
</style>