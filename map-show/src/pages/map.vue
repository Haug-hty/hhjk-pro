<template>
  <div id="map-page">
    <div class="top-bg"></div>
    <div class="top">
      <div class="timeDiv">{{ dateYear }}&nbsp;{{ dateDay }}</div>
      <div class="title-box">
        <span class="textTitlle">吴江河湖健康管理</span>
      </div>
      <div class="btn btn-line">健康在线</div>
      <div class="btn btn-assess">健康评估</div>
      <div class="btn btn-manage">健康管理</div>
    </div>
    <div id="cmap" style="height: 100%; width: 100%"></div>
    <div class="mask-div" style></div>

    <!-- 首页左上信息 -->
    <div id="fraction" class="lakeFraction" v-if="isShow">
      <div class="lakeFraction-top">
        <div class="area-rl-score-img">
          <img src="../assets/area_river.png" alt>
        </div>
        <div class="area-rl-score">
          <p>河流</p>
          <code>{{riverScore}}</code>分
        </div>
      </div>
      <div class="lakeFraction-top">
        <div class="area-rl-score-img">
          <img src="../assets/area_lake.png" alt>
        </div>
        <div class="area-rl-score">
          <p>湖泊</p>
          <code>{{lakeScore}}</code>分
        </div>
      </div>
    </div>
    <div class="rl-score-box" v-if="!isShow">
      <div class="lakeFraction-top">
        <div class="area-rl-score">
          <p>综合得分</p>
          <code>{{ objScore.toFixed(2) }}</code>分
        </div>
      </div>
    </div>

    <!-- 首页右下信息 -->
    <div id="rlBox" class="rl-score-info-box" v-if="showDelFirst">
      <div
        class="title-text"
        :class="
          score > 90
            ? 'colorOver90 score borderLeftBlue'
            : score > 80
            ? 'colorOver80 score borderLeftGreen'
            : score > 60
            ? 'colorOver60 score borderLeftYellow'
            : score > 40
            ? 'colorOver40 score borderLeftOrange'
            : 'score colorOther borderLeftRed'
        "
      >
        <span class="name">{{ objName }}</span>
        <span class="score">{{ score }}</span>
        <span class="point">分</span>
      </div>

      <div class="text-score">
        <div class="popLine">
          <div class="lin">-</div>
          <div class="tran"></div>
          <div class="lin">-</div>
        </div>
        <div class="score-box">
          <div class="norm-index" v-for="(item, index) in delScoreList" v-bind:key="index">
            <p class="norm-healthy">{{ item.name }}</p>
            <div class="norm-grade">
              {{ item.score[0].score.toFixed(1) }}
              <span>分</span>
            </div>
          </div>
        </div>

        <div class="popLine">
          <div class="lin">-</div>
          <div class="tran"></div>
          <div class="lin">-</div>
        </div>
      </div>
    </div>

    <div id="boxLeft">
      <!-- 地区整体信息左侧信息列表 -->
      <div v-if="isShow">
        <div class="area-left-top">
          <div class="title">
            <img class="title-bg" src="../assets/area-title.png" alt>
            <div class="water">地区简介</div>
          </div>
          <div class="area-desc">
            <div class="area-desc-ani-1">
              <img
                class="text-leftImage"
                src="../assets/text-leftImage.jpg"
                align="left"
                width="224"
                alt
              >
              <p>
                吴江区位于苏州市南部，在北纬30°45′36″～31°13′41″，东经120°21′04″～120°53′59″之间，东西最大距离
                <span
                  class="text-2"
                >52.67</span>km，南北最大距离
                <span class="text-2">52.07</span>km，全区总面积
                <span class="text-2">1237.4</span>km2。吴江区东接上海市青浦区，西南邻浙江省嘉兴市和湖州市，北与吴中区相接，西傍太湖。
                吴江区北距苏州市中心
                <span
                  class="text-2"
                >16</span>km，南距嘉兴
                <span class="text-2">20</span>km，东距上海
                <span class="text-2">70</span>km，东南离杭州
                <span class="text-2">120</span>km，西南离湖州
                <span class="text-2">40</span>km。京杭大运河和苏嘉杭高速公路经市区东部穿过。             

              </p>
              <img
                class="text-leftImage"
                src="../assets/text-leftImage.jpg"
                align="left"
                width="224"
                alt
              >              
              <p>
                吴江区位于苏州市南部，在北纬30°45′36″～31°13′41″，东经120°21′04″～120°53′59″之间，东西最大距离
                <span
                  class="text-2"
                >52.67</span>km，南北最大距离
                <span class="text-2">52.07</span>km，全区总面积
                <span class="text-2">1237.4</span>km2。吴江区东接上海市青浦区，西南邻浙江省嘉兴市和湖州市，北与吴中区相接，西傍太湖。
                吴江区北距苏州市中心
                <span
                  class="text-2"
                >16</span>km，南距嘉兴
                <span class="text-2">20</span>km，东距上海
                <span class="text-2">70</span>km，东南离杭州
                <span class="text-2">120</span>km，西南离湖州
                <span class="text-2">40</span>km。京杭大运河和苏嘉杭高速公路经市区东部穿过。
              </p>
            </div>
          </div>
        </div>
        <!-- center  -->
        <div class="area-left-top">
          <div class="title">
            <img class="title-bg" src="../assets/area-title.png" alt>
            <div class="water">区域水系</div>
          </div>
          <div class="area-desc">
            <div class="area-desc-ani-2">
              <img
                class="text-leftImage"
                src="../assets/area-water.jpg"
                align="left"
                width="224"
                alt
              >
              <p>
                吴江地处太湖东畔，水资源丰富，是传统的江南水乡地区。吴江区境内湖荡星罗棋布，全区水域面积
                <span class="text-2">323.6</span>km2，其中太湖水面面积
                <span class="text-2">59.9</span>km2。境内水系以太浦河为界分为浦南、浦北2大片，浦南属杭嘉湖水网区、浦北属淀泖水网区。江南运河纵贯南北两片，起到了调节和承转境内水量的作用。
                浦北片主要来水为东太湖的出水，部分水流自苏州由运河、斜港和吴淞江南岸各口门注入，另有部分水流由太浦河经运河、窑港注入。东泄通道北有澄湖、白砚湖，南有八荡河、元荡进入淀山湖。浦南片来水以澜溪塘、頔塘为干流，澜溪塘南受浙江乌镇市河和横泾港来水，頔塘西受东西苕溪来水，两河之源同出天目山区，会于平望莺脰湖，一股由老运河南行至大坝港东泄，一股由雪湖（六里厍）入太浦河，一股由新运河北行至太浦河，浦南片主要东泄河道为太浦河。
              </p>
              <img
                class="text-leftImage"
                src="../assets/area-water.jpg"
                align="left"
                width="224"
                alt
              >
              <p>
                吴江地处太湖东畔，水资源丰富，是传统的江南水乡地区。吴江区境内湖荡星罗棋布，全区水域面积
                <span class="text-2">323.6</span>km2，其中太湖水面面积
                <span class="text-2">59.9</span>km2。境内水系以太浦河为界分为浦南、浦北2大片，浦南属杭嘉湖水网区、浦北属淀泖水网区。江南运河纵贯南北两片，起到了调节和承转境内水量的作用。
                浦北片主要来水为东太湖的出水，部分水流自苏州由运河、斜港和吴淞江南岸各口门注入，另有部分水流由太浦河经运河、窑港注入。东泄通道北有澄湖、白砚湖，南有八荡河、元荡进入淀山湖。浦南片来水以澜溪塘、頔塘为干流，澜溪塘南受浙江乌镇市河和横泾港来水，頔塘西受东西苕溪来水，两河之源同出天目山区，会于平望莺脰湖，一股由老运河南行至大坝港东泄，一股由雪湖（六里厍）入太浦河，一股由新运河北行至太浦河，浦南片主要东泄河道为太浦河。
              </p>
            </div>
          </div>
        </div>
        <div class="area-left-bottom">
          <div class="title">
            <img class="title-bg" src="../assets/area-title.png" alt>
            <div class="water">
              <span>评估方法</span>
            </div>
          </div>
          <div class="assess">
            <div class="assess-pic">
              <img src="../assets/icon_assess-green.png" alt>
            </div>
            <div class="assess-text" @click="schemeDel(1)">
              <div class="assess-text-del">
                <div>评价标准</div>
                <div class="delImg">详情</div>
              </div>
              <div class="assess-area">
                <div>《河湖健康评价规范》</div>
                <div class="assess-area-rightBottom">
                  <img src="../assets/assess_right-green.png" alt>
                </div>
              </div>
            </div>
          </div>
          <div class="assess">
            <div class="assess-pic">
              <img src="../assets/icon-assess-art-green.png" alt>
            </div>
            <div class="assess-text" @click="schemeDel(2)">
              <div class="assess-text-del">
                <div>技术路线</div>
                <div class="delImg">详情</div>
              </div>
              <div class="assess-area">
                <div>吴江河湖健康评估技术路线</div>
                <div class="assess-area-rightBottom">
                  <img src="../assets/assess_right-green.png" alt>
                </div>
              </div>
            </div>
          </div>
          <div class="assess">
            <div class="assess-pic">
              <img src="../assets/icon-assess-test-green.png" alt>
            </div>
            <div class="assess-text" @click="schemeDel(3)">
              <div class="assess-text-del">
                <div>检测标准</div>
                <div class="delImg">详情</div>
              </div>
              <div class="assess-area">
                <div>苏州市检验标准</div>
                <div class="assess-area-rightBottom">
                  <img src="../assets/assess_right-green.png" alt>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 单一对象信息左侧信息列表 -->
      <div v-if="!isShow">
        <div class="object-left-top">
          <div class="title">
            <img class="title-bg" src="../assets/area-title.png" alt>
            <div class="water">
              <div>{{ objName1 }}简介</div>
            </div>
          </div>
          <div class="obj-desc-uni">
            <div class="obj-desc" v-html="objDesc"></div>
          </div>
        </div>
        <div class="object-left-center">
          <div class="title">
            <img class="title-bg" src="../assets/area-title.png" alt>
            <div class="water">
              <div>公众满意度统计</div>
              <div>
                <span class="font-blueLeft">
                  <span class="font-blueLeft-out">有效率：</span>
                  {{ qusPer }}%
                </span>
              </div>
            </div>
          </div>
          <div class="public">
            <div class="totalScore">总分：{{ publicSatisfactionScore }}分</div>
            <BarChart :publicSatisfaction="publicSatisfaction"/>
          </div>
        </div>
        <div class="object-left-bottom">
          <div class="title">
            <img class="title-bg" src="../assets/area-title.png" alt>
            <div class="water">
              <span>问题与建议</span>
            </div>
          </div>
          <div class="swiperText">
            <el-carousel :interval="5000" arrow="always" height="22.1vh">
              <el-carousel-item v-for="item in items" :key="item.value">
                <div class="carousel-explain">
                  <p class="text-first">{{ item.txtFirst }}</p>
                  <p class="text-second" v-html="item.textSecond"></p>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
    </div>

    <div v-if="leftFlag" class="leftOut" @click="leftBoxPop"></div>
    <div v-if="!leftFlag" class="leftIn" @click="leftBoxPop"></div>
    <div id="boxRight">
      <!-- 地区整体信息右侧信息列表 -->
      <div v-if="isShow">
        <div class="area-right-top">
          <div class="title">
            <img class="title-bg" src="../assets/area-title.png" alt>
            <div class="water">
              <div>健康状态统计</div>
            </div>
          </div>
          <div class="health-status">
            <AreaLeftCenter :healthStatistics="healthStatistics"/>
          </div>
        </div>
        <div class="area-right-center">
          <div class="title">
            <img class="title-bg" src="../assets/area-title.png" alt>
            <div class="water">
              <div>健康状况排名</div>
            </div>
          </div>
          <div class="ranking">
            <dv-scroll-board class="dv-scr-board" :config="paimingshuju"/>
          </div>
        </div>
        <div class="area-right-bottom">
          <div class="title">
            <img class="title-bg" src="../assets/area-title.png" alt>
            <div class="water">
              <span>评估成果</span>
            </div>
          </div>
          <div class="file-box">
            <div class="assess" @click="reportView(2)">
              <div class="assess-pic">
                <img src="../assets/icon_word-green.png" alt>
                2021年度吴江区河湖健康评价中期报告
              </div>
              <div class="assess-text-del">
                <div class="delImg">详情</div>
              </div>
            </div>
            <div class="assess" @click="reportView(1)">
              <div class="assess-pic">
                <img src="../assets/icon_word-green.png" alt>
                2020吴江区河流健康技术报告
              </div>
              <div class="assess-text-del">
                <div class="delImg">详情</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 单一对象信息右侧信息列表 -->
      <div v-if="!isShow">
        <div class="object-right-top">
          <div class="title">
            <img class="title-bg" src="../assets/area-title.png" alt>
            <div class="water" @click="getALLdesc(1)">
              <span>生态健康</span>
              <span class="font-blue">
                <span class="font-blueLeft-out">评分：</span>
                {{ B1Score }}
              </span>
            </div>
          </div>
          <div id="txChart1A">
            <dv-scroll-ranking-board class="dv-scr-rank" :config="evaluatingRankingB1"/>
            <!-- <CiYunChart :ciYunData="ciYunData" /> -->
          </div>
        </div>
        <div class="object-right-center">
          <div class="title">
            <img class="title-bg" src="../assets/area-title.png" alt>
            <div class="water" @click="getALLdesc(2)">
              <span>服务功能</span>
              <span class="font-blue">
                <span class="font-blueLeft-out">评分：</span>
                {{ B2Score }}
              </span>
            </div>
          </div>
          <div class="public">
            <RadarChart :radarData="radarData"/>
          </div>
        </div>
        <div class="object-right-centerBar">
          <div class="title">
            <img class="title-bg" src="../assets/area-title.png" alt>
            <div class="water" @click="getALLdesc(3)">
              <span>干扰程度</span>
              <span class="font-blue">
                <span class="font-blueLeft-out">评分：</span>
                {{ B3Score }}
              </span>
            </div>
          </div>
          <div class="zxtjChartA">
            <BarCircleChart :interferenceData="interferenceData"/>
            <!-- <SingleEvaluate :interferenceData="interferenceData" /> -->
          </div>
        </div>
        <div class="object-right-bottom">
          <div class="title" @click="getALLdesc(4)">
            <img class="title-bg" src="../assets/area-title.png" alt>
            <div class="water">
              <span>管理水平</span>
              <span class="font-blue">
                <span class="font-blueLeft-out">评分：</span>
                {{ B4Score }}
              </span>
            </div>
          </div>
          <div class="zxtjChartA">
            <PieBingTuChart :funnelData="funnelData"/>
            <!-- <FunnelChart :funnelData="funnelData" /> -->
          </div>
        </div>
      </div>
    </div>

    <div v-if="rightFlag" class="rightOut" @click="rightBoxPop"></div>
    <div v-if="!rightFlag" class="rightIn" @click="rightBoxPop"></div>
    <div id="tag" class="map-legend" v-if="isShow">
      <div class="mark">
        <div class="legend-box">
          <div class="legend-1"></div>
        </div>

        <span>非常健康</span>
      </div>
      <div class="mark">
        <div class="legend-box">
          <div class="legend-2"></div>
        </div>
        <span>健康</span>
      </div>
      <div class="mark">
        <div class="legend-box">
          <div class="legend-3"></div>
        </div>
        <span>亚健康</span>
      </div>
      <div class="mark">
        <div class="legend-box">
          <div class="legend-4"></div>
        </div>
        <span>不健康</span>
      </div>
      <div class="mark">
        <div class="legend-box">
          <div class="legend-5"></div>
        </div>病态
      </div>
      <!-- <div class="mark">
        <div class="legend-6"></div>
        <span>采样点</span>
      </div>-->
    </div>
    <!-- 地区信息右侧信息列表 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="70vw"
      :title="delTitle"
      top="10vh"
      >
      <div class="agreement_picture" style="height: 70vh; overflow-y: auto">
        <!-- <div class="pdf"> -->
          <div v-if="!isFileList" style="width: 70vw; height: 100%">
            <iframe v-if="isFile" :src="delSrc" frameborder="0" style="width: 70vw; height: 100%"></iframe>
            <!-- </div> -->
            <div v-if="!isFile" style="width: 50%; margin: 0 auto">
              <img :src="delSrc" style="width: 100%; margin: 0 auto">
            </div>
          </div>
          <div v-if="isFileList" style="width: 100%; height: 100%">
            <div class="target-all-info" style="display: flex">
              <div class="target-list" style="overflow-y: auto">
                <ul type="none">
                  <li v-for="(item, index) in fileList" v-bind:key="index">
                    <el-button
                      :id="'button111'+index"
                      type="text"
                      class="score-target"
                      @click="getFile(item)"
                    >
                      <p class="target-name">{{ item.name }}</p>
                    </el-button>
                  </li>
                </ul>
              </div>
              <div class="target-content" style="width: 70%; height: 100%">
                <iframe :src="fileSrcGB" frameborder="0" style="width: 100%; height: 100%"></iframe>
              </div>
            </div>
                  
          </div>
        
      </div>
    </el-dialog>

    <!-- 指标项展示 - 直接展示分数 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="typeOfOnlyScore"
      width="40vw"
      :title="targetName"
      top="10vh"
      >
      <div class="target-type-1">
        <span>
          {{ targetScore }}
          <code>分</code>
        </span>
      </div>
    </el-dialog>

    <!-- 指标项展示 -- 展示文件 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="typeOfFile"
      width="80vw"
      :title="targetName"
      top="10vh"
      v-loading="loading"
      element-loading-text="数据加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      >
      <div class="target-type-2">
        <img @load="load" :src="fileUrl" alt>
      </div>
    </el-dialog>

    <!-- 指标项展示 -- 展示图片和图表 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="typeOfPicChart"
      width="55vw"
      :title="targetName"
      top="10vh"
      v-loading="loading"
      element-loading-text="数据加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      >
      <div class="target-type-3">
        <div class="target-type-3-title">{{ targetPicTitle }}</div>
        <div class="target-type-3-pic">
          <el-carousel :interval="4000" indicator-position="outside" arrow="always" height="315px">
            <el-carousel-item v-for="(item, key) in urlList" :key="key">
              <img :src="item" alt width="auto" height="100%">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div @click="changeUrlList(allPic)" class="target-type-3-title">赋分标准项统计：{{ allPic.num }}张</div>
        <div class="target-type-statistics">
          <div v-for="(item, index) in targetNameArr" :key="index" class="target-type-loop">
            <div class="total-name-out">
              <span class="total-name">{{ item }}</span>
            </div>
            <div v-for="(per, index) in targetChartData" :key="index" @click="changeUrlList(per)">
              <div v-if="per.targetName == item" class="total-num-out">
                <p class="total-name-small">{{ per.name }}</p>
                <span class="target-type-num">{{ per.num }}</span>
                <span class="target-type-text">处</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 指标项B层整体展示 -- 展示多个 -->
    <el-dialog
      :visible.sync="targetFlag"
      width="60vw"
      :title="bigTargetTitle"
      top="10vh"
     >
      <div class="target-all-info" style="display: flex">
        <div class="target-list">
          <ul type="none">
            <li v-for="(item, index) in targetDInfoData" v-bind:key="index">
              <el-button
                :id="'button'+index"
                type="text"
                class="score-target"
                @click="getTargetBody(item)"
              >
                <p class="target-name">{{ item.name }}</p>
                <p class="target-score">
                  综合得分：
                  <span v-if="item.score[0].score !=100">{{ item.score[0].score.toFixed(2) }}</span>
                  <span v-if="item.score[0].score ==100">{{ item.score[0].score}}</span>
                </p>
              </el-button>
            </li>
          </ul>
        </div>
        <div class="target-content">
          <!-- 指标项展示 - 直接展示分数 -->
          <div class="target-type-1" v-if="typeOfOnlyScoreFlag">
            <div>
              {{ targetScore }}
              <code>分</code>
            </div>
          </div>

          <!-- 指标项展示 -- 展示文件 -->
          <div class="target-type-2" v-if="typeOfFileFlag">
            <img @load="load" :src="fileUrl" alt>
          </div>

          <!-- 指标项展示 -- 展示图片和图表 -->
          <div class="target-type-3" v-if="typeOfPicChartFlag">
            <div class="target-title">
              {{ targetPicTitle }}
              <div class="all-pic" @click="changeUrlList(allPic)">查看全部（{{ allPic.num }}）</div>
            </div>
            <div class="target-type-3-pic">
              <el-carousel
                :interval="4000"
                indicator-position="outside"
                arrow="always"
                height="400px"
              >
                <el-carousel-item v-for="(item, key) in urlList" :key="key">
                  <img :src="item" alt width="auto" height="100%">
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="target-type-statistics">
              <div v-for="(item, index) in targetNameArr" :key="index" class="target-type-loop">
                <div class="total-name-out">
                  <span class="total-name">{{ item }}</span>
                </div>
                <div
                  v-for="(per, index) in targetChartData"
                  :key="index"
                  @click="changeUrlList(per)"
                >
                  <div v-if="per.targetName == item" class="total-num-out">
                    <p class="total-name-small">{{ per.name }}</p>
                    <span class="target-type-num">{{ per.num }}</span>
                    <span class="target-type-text">处</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="target-title">说明</div>
          <div v-html="targetDesc"></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "ol/ol.css";
import { Map, View, Feature } from "ol";
import { defaults as defaultControls } from "ol/control";
import { defaults } from "ol/interaction";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import Vector from "ol/source/Vector";
import { Style, Circle, Fill, Stroke, Text, Icon } from "ol/style";
import GeoJSON from "ol/format/GeoJSON";
import { fromLonLat, transform } from "ol/proj";
import WKT from "ol/format/WKT";
import Select from "ol/interaction/Select";
import { pointerMove, singleClick } from "ol/events/condition";
import XYZ from "ol/source/XYZ";
import Static from "ol/source/ImageStatic";
import ImageLayer from "ol/layer/Image";
import Projection from "ol/proj/Projection";
import { getCenter, extend } from "ol/extent";
import Overlay from "ol/Overlay";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import WMTS from "ol/source/WMTS";
import { getTopLeft, getWidth } from "ol/extent";
import { get as getProjection } from "ol/proj";
import Point from "ol/geom/Point";
import * as turf from "@turf/turf";

import BarChart from "./mapChart/barChart";
import SingleEvaluate from "./mapChart/singleEvaluate";
import AreaLeftCenter from "./mapChart/areaLeftCenter";
import CiYunChart from "./mapChart/ciYunChart";
import RadarChart from "./mapChart/radarChart";
import FunnelChart from "./mapChart/funnelChart";
import TargetBar from "./mapChart/targetBar";
import BarCircleChart from "./mapChart/barCircleChart";
import PieBingTuChart from "./mapChart/pieBingTuChart";

import { formatTime } from "../utils/index.js";
import { rlCom_data, target_info, getToken } from "@/api/main/index.js";
import { mapState } from "vuex";
import { imgNetUrl } from "@/global.js";
import { setToken } from "@/utils/auth";
import { convertLength } from '@turf/turf';

const areaMapData = require("./areaMap.json");
const pointJson = require("./point.json");
const imgUrl = require("../assets/pointIcon.png");
const imgUrlHover = require("../assets/pointIconHover.png");
const areaInfoData = require("./areaData.json");
const objInfoData = require("./objData.json");
const staticImgUrl = require("../assets/bgI.svg");
const fileImgUrl = imgNetUrl + "/admin/wj/excel2img?requUrl=";
const extent = [
  120.3569667238902,
  30.757833911398727,
  120.89901672389161,
  31.219523911397924
];
const FileList = require("./fileList.json")

export default {
  name: "mapCom",
  data() {
    return {
      isShow: true, // 第一级页面和第二级页面之间展示切换内容控制器
      leftFlag: true, // 左侧侧缩进控制器
      rightFlag: true, // 右侧缩进控制器
      items: [
        // 问题列表items轮播

        {
          txtFirst: "河流流动性偏差",
          textSecond:
            "科学开展调水引流，深入开展河道健康长效管护：有必要进一步科学、精准调度，优化牛长泾引水排涝，在保障区域防洪保供安全的同时，合理引流调水，增加河道水环境容量、促进水体流动，有效改善沿线地区河网水质"
        },
        {
          txtFirst: "生物多样性偏低",
          textSecond:
            "为深入掌握河流健康问题、影响原因以及变化情况，需持续开展河道健康监测与评估，定期提供监测数据与监测分析报告"
        },
        {
          txtFirst: "岸线开发利用率高，生态岸坡比例偏低",
          textSecond:
            "开展岸坡生态治理，加强岸线环境管理：现状牛长泾生态岸坡比例在45%左右，建议后续有序推进生态护岸建设，河道生态、景观功能得到提升，还原自然形态与生态功能，对沿河流的湿地林带进行补植和完善，提高生物多样性。"
        },
        {
          txtFirst: "景观舒适度和公众满意度偏低",
          textSecond:
            "河流管理部门应积极做好河流保护与健康维护宣传，发动公众参与，协调好河流利用与保护的矛盾，促进河流服务功能与自然健康的和谐"
        }
      ],

      map: null, // 地图对象
      mapTdt: null, // 天地图图层
      osmTile: null, // 图片图层
      areaLayer: null, // 行政区图层
      areaFeature: null, // 行政区对象
      pointLayer: null, // 首页点位标记图层
      infoLlayer: null, // 信息标准线图层
      imageAnnotation: null, // 影像注记图层
      vector: null, // 河湖对象图层
      centerPointList: [], // 河湖对象中心点列表
      featureList: [], //河湖对象图层列表
      infoLineFeatureList: [], // 信息线图层列表
      overlay: null, // 河湖对象名称得分显示框
      rlComReachLayer: null, // 方案河段湖区信息图层
      schemeSiteLayer: null, // 方案站点信息图层

      // 时间控件
      dateYear: null,
      dateDay: null,
      timing: null,

      delSrc: "", // 地区评估方法地址 src
      dialogVisible: false, // 地区评估方法弹窗控制器
      delTitle: "", // 地区评估方法弹窗标题
      isFile: false, //首页展示是否是文件还是图片
      isFileList:false,// 是否是文件列表
      fileSrcGB:'',
      fileList:[],

      paimingshuju: {}, // 区域健康状态排名
      healthStatistics: [{
              "type":"非常健康",
              "num":0
          },
          {
              "type":"健康",
              "num":7
          },
          {
              "type":"亚健康",
              "num":8
          },
          
          {
              "type":"不健康",
              "num":0
          },
          {
              "type":"病态",
              "num":0
          }], // 区域健康状态统计

      objDesc: ``, // 河湖对象简介
      objScore: null, // 二级展示具体对象得分
      publicSatisfactionScore: "", // 河湖对象公众满意度评分
      publicSatisfaction: [], // 公众满意度调查分布数据
      qusPer: null, //公众满意度有效率

      rlChartData: [], // 单一河湖对象图标数据
      B1Score: 0, // B1 层级分数
      ciYunData: [], // 词云数据
      B2Score: 0, // B2层级分数
      radarData: [], // 雷达图数据
      B3Score: 0, // B3层级分数
      interferenceData: [], // 饼图数据
      B4Score: 0, // B4层级分数
      funnelData: [], // 漏斗数据

      rlComDataList: [], // 河湖对象数据列表
      objName: "-", //首页河湖名称
      objName1:"",
      score: "0.00", //首页鼠标移动显示河湖得分
      showDelFirst: false, //首页详情展示
      delScoreList: [
        {
          // 四大类得分
          name: "生态健康",
          score: [
            {
              score: 0
            }
          ]
        },
        {
          name: "服务功能",
          score: [
            {
              score: 0
            }
          ]
        },
        {
          name: "干扰程度",
          score: [
            {
              score: 0
            }
          ]
        },
        {
          name: "管理水平",
          score: [
            {
              score: 0
            }
          ]
        }
      ], // 首页下方类别分
      riverScore:0,// 地区河评分
      lakeScore:0,// 地区湖评分

      targetScore: 0, // 指标得分
      targetName: "", // 指标层名称
      typeOfOnlyScore: false, // 只有分数的指标项控制器
      typeOfFile: false, // 长序列数据文件类型指标项控制器
      fileUrl: "", // 加载的 excel 数据文件地址
      loading: false, // excel 生成图片加载遮罩层控制器
      typeOfPicChart: false, // 现场照片指标项控制器
      allPic: {}, // 全部照片对象（数量和地址）
      urlList: [], // 现场照片指标项图片地址数组
      targetChartData: [], // 图片指标项表格数据
      targetNameArr: [], // 现场照片指标项细则名称列表
      targetPicTitle: "", // 图片标题名称
      targetDInfoData: [], // D层指标数据(整体展示用)
      targetFlag: false,
      bigTargetTitle: "", // 四大类指标名称
      typeOfPicChartFlag: false, //图表指标
      typeOfFileFlag: false, //文件指标
      typeOfOnlyScoreFlag: false, //分数指标
      targetDesc: ``, // 指标项说明文本
      evaluatingRankingB1: {} // 生态健康指标排行
    };
  },
  components: {
    BarChart,
    SingleEvaluate,
    AreaLeftCenter,
    CiYunChart,
    RadarChart,
    FunnelChart,
    TargetBar,
    BarCircleChart,
    PieBingTuChart
  },
  beforeCreate() {},
  mounted() {
    /** 时钟函数 */
    this.timeFn();

    let token = "347825499f3428e742eb9694db0cf";
    getToken(token).then(res => {
      console.log(res);
      setToken(res.data.data);
      this.getLayerData();
    });
    /** 获取图层信息 */
  },
  unMounted() {
    clearInterval(this.timing);
  },
  methods: {
    /** 时间函数 */
    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), "HH:mm:ss");
        this.dateYear = formatTime(new Date(), "yyyy.MM.dd");
      }, 1000);
    },
    /** 首页评估工作部分展示内容方法 */
    schemeDel(info) {
      if (info === 1) {
        this.delTitle = "评价标准";
        this.delSrc =
          "http://hhhealthy.xiejikeji.com/ACB816098D5C4842B6B5AA56B621FA97.pdf";
        this.isFileList = false;
        this.isFile = true;
      } else if (info === 2) {
        this.delTitle = "技术路线";
        this.delSrc =
          "http://hhhealthy.xiejikeji.com/2dfc906bd4ffe1fa93d8363403a5fdb.png";
        this.isFileList = false;
        this.isFile = false;
      } else {
        this.delTitle = "检测标准";
        this.delSrc =
          "http://hhhealthy.xiejikeji.com/%E5%BC%95%E7%94%A8%E6%96%87%E4%BB%B6.png";
        this.isFileList = true;
        this.fileList = FileList
        setTimeout(function(){
          document.getElementById("button1110").click()
          document.getElementById("button1110").focus()
        },10
        )
          
        
        
      }
      this.dialogVisible = true;
    },
    getFile(item){
      this.fileSrcGB = item.fileSrc
    },
    /** 报告查看 */
    reportView(info) {
      this.isFileList = false
      if (info === 1) {
        this.delTitle = "评估报告";
        this.delSrc =
          "http://hhhealthy.xiejikeji.com/2020%E5%90%B4%E6%B1%9F%E5%8C%BA%E6%B2%B3%E6%B5%81%E5%81%A5%E5%BA%B7%E6%8A%80%E6%9C%AF%E6%8A%A5%E5%91%8A.pdf";
        this.isFile = true;
      } else
      if (info === 2) {
        this.delTitle = "评估报告";
        this.delSrc =
          "http://hhhealthy.xiejikeji.com/2021%E5%B9%B4%E5%BA%A6%E5%90%B4%E6%B1%9F%E5%8C%BA%E6%B2%B3%E6%B9%96%E5%81%A5%E5%BA%B7%E8%AF%84%E4%BB%B7%E4%B8%AD%E6%9C%9F%E6%8A%A5%E5%91%8A(1).pdf";
        this.isFile = true;
      }
      this.dialogVisible = true;
    },
    /** 请求获取图层信息 */
    getLayerData() {
      rlCom_data().then(res => {
        console.log("信息对象", res);
        if (res.data.data) {
          this.rlComDataList = res.data.data.rlMap;
          this.layerDataHandle(res.data.data.rlMap);
          this.setHealthstatusRanking();
          this.getAreaScore();
        }
      });
    },
    /** 区域河湖分数计算 */
    getAreaScore() {
      console.log("jisuan", this.rlComDataList);
      let rlCount = 0
      let laCount = 0
      let rlTotle = 0
      let laTotle = 0

      this.rlComDataList.forEach(item => {
        if (item["assessScheme"]) {
          if (item.assessScheme.gtVo.rlType == 1) {
            rlCount ++;
            rlTotle +=  item.assessScheme.gtVo.score[0].score
          } else {
            laCount ++;
            laTotle +=  item.assessScheme.gtVo.score[0].score
          }
        }
      });
      console.log(rlCount,laCount,rlTotle,laTotle)
      if(rlCount!=0){
        this.riverScore = (rlTotle/rlCount).toFixed(2)
      }
      if(laCount!=0){
        this.lakeScore = (laTotle/laCount).toFixed(2)
      }
      let a=0,b=0,c=0,d=0,e=0
      this.rlComDataList.forEach(item => {
        if (item["assessScheme"]) {
          if (item.assessScheme.gtVo.score[0].scoreDesc == "非常健康") {
            a ++;
          } else if (item.assessScheme.gtVo.score[0].scoreDesc == "健康") {
            b++
          } else if (item.assessScheme.gtVo.score[0].scoreDesc == "亚健康") {
            c++
          } else if (item.assessScheme.gtVo.score[0].scoreDesc == "不健康") {
            d++
          } else {
            e++
          }
        }
      });
      this.healthStatistics = [
          {
              "type":"非常健康",
              "num":a
          },
          {
              "type":"健康",
              "num":b
          },
          {
              "type":"亚健康",
              "num":c
          },
          
          {
              "type":"不健康",
              "num":d
          },
          {
              "type":"病态",
              "num":e
          }
      ]
    },
    /** 图层资源数据处理方法 */
    layerDataHandle(info) {
      let geoData = info;
      let center = null;
      this.featureList = [];
      this.infoLineFeatureList = [];
      pointJson.features = [];
      geoData.forEach(item => {
        let wkt = item.geom;
        let infoLineFeature = null;
        let format = new WKT();
        let feature = format.readFeature(wkt, {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:4326"
        });
        let rlScore = null;
        if (item["assessScheme"]) {
          if (item.assessScheme.gtVo.score) {
            rlScore = item.assessScheme.gtVo.score[0].score;
          }
        }
        if (item.name == "行政边界") {
          this.areaFeature = format.readFeature(wkt, {
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:4326"
          });
          this.areaFeature.setProperties({
            type: 9,
            name: item.name
          });
          let areaStyle = new Style({
            stroke: new Stroke({
              color: "rgba(255, 193, 0, 1)",
              width: 3,
              lineDash: [10, 10, 10, 10]
            }),
            fill: new Fill({
              color: "rgba(3,25,28,0.5)"
            })
          });
          this.areaFeature.setStyle(areaStyle);
          return;
        }
        feature.setProperties({
          id: item.id,
          name: item.name,
          score: rlScore
        });
        // feature.setProperties(item.properties)
        if (rlScore != null) {
          // center = turf.centerOfMass(
          //   turf.polygon(feature.getGeometry().getCoordinates()[0])
          // );
          // center.properties.id = item.id;
          // center.properties.name = item.name;
          let colorStroke = null;
          let colorFill = null;
          if (rlScore >= 90) {
            (colorStroke = "rgba(26, 177, 214, 1)"),
              (colorFill = "rgba(26, 177, 214, 0.1)");
          } else if (rlScore >= 80) {
            (colorStroke = "rgba(124, 234, 189, 1)"),
              (colorFill = "rgba(124, 234, 189, 0.1)");
          } else if (rlScore >= 60) {
            (colorStroke = "rgba(251, 252, 84, 1)"),
              (colorFill = "rgba(251, 252, 84, 0.1)");
          } else if (rlScore >= 40) {
            (colorStroke = "rgba(239, 138, 52, 1)"),
              (colorFill = "rgba(239, 138, 52, 0.1)");
          } else {
            (colorStroke = "rgba(213, 56, 38, 1)"),
              (colorFill = "rgba(213, 56, 38, 0.1)");
          }
          let styleHh = new Style({
            stroke: new Stroke({
              color: colorStroke,
              width: 2
            }),
            fill: new Fill({
              color: colorFill
            })
          });
          let infoLineStyle = new Style({
            text: new Text({
              text: item.name + "\t" + rlScore.toFixed(2), // 添加文字描述
              font: "16px font-size", // 设置字体大小
              fill: new Fill({
                // 设置字体颜色
                color: colorStroke
              }),
              // offsetY: -100, // 设置文字偏移量
              offsetX: 50 // 设置文字偏移量
              // // padding:[10,10,10,10],
              // backgroundStroke:new Stroke({
              //   color:'rgb(160, 213, 38)',
              //   width:1
              // }),
              // //标签的背景填充
              // backgroundFill:new Fill({
              //   color:colorFill
              // }),
            })
          });
          feature.setStyle(styleHh);
          if (item["commnetLine"]) {
            infoLineFeature = format.readFeature(item.commnetLine, {
              dataProjection: "EPSG:4326",
              featureProjection: "EPSG:4326"
            });
            let param = {
              point: infoLineFeature.getGeometry().getCoordinates()[1],
              name: item.name,
              score: rlScore,
              id: item.id
            };
            this.centerPointList.push(param);
          }
        } else {
          let styleNull = new Style({
            stroke: new Stroke({
              color: "rgba(255, 255, 255, 0.9)",
              width: 1
            }),
            fill: new Fill({
              color: "rgba(255, 255, 255, 0.1)"
            })
          });
          feature.setStyle(styleNull);
          if (item["commnetLine"]) {
            infoLineFeature = format.readFeature(item.commnetLine, {
              dataProjection: "EPSG:4326",
              featureProjection: "EPSG:4326"
            });
            let param = {
              point: infoLineFeature.getGeometry().getCoordinates()[1],
              name: item.name,
              id: item.id
            };
            this.centerPointList.push(param);
          }
        }
        this.featureList.push(feature);
      });
      this.drawMap();
    },
    /** 地图加载渲染 */
    drawMap() {
      /** 地图底图 */
      this.osmTile = new TileLayer({
        source: new XYZ({
          name: "中国",
          url:
            "http://t0.tianditu.com/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=736609b144d89c6d91c9c31508ea545e",
          projection: "EPSG:4326",
          tileLoadFunction: function(imageTitle, src) {
            const img = new Image();
            img.crossOrigin = "";
            img.onload = () => {
              const canvas = document.createElement("canvas");
              const w = img.width;
              const h = img.height;
              canvas.width = w;
              canvas.height = h;
              const context = canvas.getContext("2d");
              context.drawImage(img, 0, 0, w, h, 0, 0, w, h);
              const imgData = context.getImageData(0, 0, w, h);
              for (let i = 0; i < imgData.height; i++) {
                for (let j = 0; j < imgData.width; j++) {
                  const x = i * 4 * imgData.width + j * 4;
                  var axi = 1.5;
                  imgData.data[x] = imgData.data[x] * axi;
                  imgData.data[x + 1] = imgData.data[x + 1] * axi;
                  imgData.data[x + 2] = imgData.data[x + 2] * axi;
                }
              }
              context.putImageData(imgData, 0, 0);
              imageTitle.getImage().src = canvas.toDataURL("image/png");
            };
            img.src = src;
          }
        })
      });
      /** 影像注记--图层 */
      let resolutions = [];
      for (let z = 2; z < 19; ++z) {
        resolutions[z] =
          getWidth(getProjection("EPSG:4326").getExtent()) /
          256 /
          Math.pow(2, z);
      }
      this.imageAnnotation = new TileLayer({
        source: new WMTS({
          name: "中国矢量注记1-4级",
          url:
            "http://t0.tianditu.gov.cn/cia_c/wmts?tk=65235e208cae9448e9f3a85d55c74bda",
          layer: "cia",
          style: "default",
          matrixSet: "c",
          format: "tiles",
          wrapX: true,
          tileGrid: new WMTSTileGrid({
            origin: getTopLeft(getProjection("EPSG:4326").getExtent()),
            resolutions: resolutions,
            matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
          })
        })
      });

      /** 行政区对象--图层 */
      this.areaLayer = new VectorLayer({
        source: new Vector({
          features: [this.areaFeature]
        })
      });

      /** 区域水系对象--图层 */
      this.vector = new VectorLayer({
        source: new Vector({
          features: [...this.featureList]
        })
      });

      this.map = new Map({
        controls: defaultControls({
          attribution: false,
          rotate: false,
          zoom: false
        }),
        target: "cmap",
        layers: [this.osmTile, this.areaLayer, this.vector],
        // 地图视图信息（中心店，坐标系，图层级别）
        view: new View({
          extent: [
            120.1069667238902,
            30.707833911398727,
            121.12601672389161,
            31.519523911397924
          ],
          projection: "EPSG:4326",
          center: getCenter(extent),
          zoom: 11.4
        }),
        interactions: defaults({
          doubleClickZoom: false, // 取消双击放大功能交互
          mouseWheelZoom: false, // 取消滚动鼠标中间的滑轮交互
          shiftDragZoom: false // 取消shift+wheel左键拖动交互
        })
      });

      /** 对象信息展示div */
      this.pointDo();
      this.getFeaterInfo();
      this.rlPointMove();
    },
    /** 对象信息展示div */
    pointDo() {
      this.centerPointList.forEach(item => {
        let colorStroke = null;
        let className = "";
        if (item.score) {
          if (item.score >= 90) {
            colorStroke = "rgba(26, 177, 214, 1)";
            className = "rl-veryHealthy";
          } else if (item.score >= 80) {
            colorStroke = "rgba(124, 234, 189, 1)";
            className = "rl-healthy";
          } else if (item.score >= 60) {
            colorStroke = "rgba(251, 252, 84, 1)";
            className = "rl-subhealthy";
          } else if (item.score >= 40) {
            colorStroke = "rgba(239, 138, 52, 1)";
            className = "rl-unhealthy";
          } else {
            colorStroke = "rgba(213, 56, 38, 1)";
            className = "rl-morbid";
          }
          /** popup 功能实现 */
          var container = document.createElement("div");
          let that = this
          container.onclick = function(){
             that.map.getLayers().array_[2].getSource().getFeatures().forEach(fea => {
               if(fea.values_.id == item.id){
                 that.map.getView().fit(fea.getGeometry(), {
                  padding: [150, 500, 30, 500],
                  duration: 1500
                });
                that.isShow = false;
                that.showDelFirst = false;
                that.getObjData(fea);
               }
             })
          }
          container.setAttribute("class", className + " rl-main");
          this.overlay = new Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
              duration: 250
            }
          });
          this.map.addOverlay(this.overlay);
          container.innerHTML =
            "<span class='rl-name'>" +
            item.name +
            "</span><span class='rl-score'>" +
            item.score.toFixed(2) +
            "</span>";
          this.overlay.setPosition(item.point);
        } else {
          /** popup 功能实现 */
          var container = document.createElement("div");
          let that = this
          container.onclick = function(){
             that.map.getLayers().array_[2].getSource().getFeatures().forEach(fea => {
               if(fea.values_.id == item.id){
                 that.map.getView().fit(fea.getGeometry(), {
                  padding: [150, 500, 30, 500],
                  duration: 1500
                });
                that.isShow = false;
                that.showDelFirst = false;
                that.getObjData(fea);
               }
             })
          }
          container.setAttribute("class", "rl-on-assessment  rl-main");
          this.overlay = new Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
              duration: 250
            }
          });
          this.map.addOverlay(this.overlay);
          container.innerHTML = "<span class='rl-name'> " +  item.name + '</span>';
          this.overlay.setPosition(item.point);
        }
      });
    },
    /** 点击地图如果有对象，展示对象信息 */
    getFeaterInfo() {
      const _that = this;
      this.map.on("click", function(event) {
        _that.vector.changed();
        const coordinate = transform(
          event.coordinate,
          "EPSG:3857",
          "EPSG:4326"
        );
        // 判定点击是否有图层，有的话返回图层信息，没有打点
        var feature = _that.map.forEachFeatureAtPixel(
          event.pixel,
          function(feature) {
            if (feature.get("type") == 9) {
              _that.map.getView().fit(feature.getGeometry(), {
                padding: [100, 400, 30, 400],
                duration: 1500
              });
              _that.map.setLayers([
                _that.osmTile,
                _that.areaLayer,
                _that.vector
              ]);
              _that.isShow = true;
              _that.showDelFirst = true;
              return false;
            }
            if (feature.values_.rlCom) {
              return false;
            }
            return feature;
          },
          // {
          //   hitTolerance: 50 // 触发事件的热区
          // }
        );
        // 点击有图层对象
        if (feature) {
          console.log("feature", feature);
          if (_that.isShow == true) {
            _that.map.getView().fit(feature.getGeometry(), {
              padding: [150, 500, 30, 500],
              duration: 1500
            });
            _that.isShow = false;
            _that.showDelFirst = false;
            _that.getObjData(feature);
          }
        } else {
          // _that.map.getView().setCenter(getCenter(extent));
          // _that.map.getView().setZoom(11.4);
          // _that.map.setLayers([_that.osmTile, _that.areaLayer, _that.vector]);
          // _that.isShow = true;
          // _that.showDelFirst = true;
        }
      });
    },
    /** 对象选取之后显示的style ，只针对河湖对象图层 */
    setSelectStyle() {
      var selectS = new Select({
        condition: singleClick, // 唯一的不同之处，设置鼠标移到feature上就选取 pointerMove
        layers: [this.map.getLayers().array_[2]], // 样式生效图层
        style: new Style({
          stroke: new Stroke({
            color: "#000000",
            width: 2
          }),
          fill: new Fill({
            color: "rgba(51, 194, 255, 0.5)"
          })
        })
      });
      this.map.addInteraction(selectS);
      selectS.on("select", function(e) {
        console.log("selectS", e.target.getFeatures());
        if (e.target.getFeatures().array_.length !== 0) {
          console.log(
            "selectS values_",
            e.target.getFeatures().array_[0].values_
          );
        }
      });
    },
    /** 首页展示分数详情鼠标移动事件 */
    rlPointMove() {      
      var _that = this;
      var selectS = new Select({
        condition: pointerMove, // 唯一的不同之处，设置鼠标移到feature上就选取 pointerMove
        layers: [this.map.getLayers().array_[2]],
        style: new Style({
          stroke: new Stroke({
            color: "rgba(255, 193, 0, 1)",
            width: 3
          }),
          fill: new Fill({
            color: "rgba(255, 193, 0, 0.1)"
          })
        })
      });
      this.map.addInteraction(selectS);
      selectS.on("select", function(e) {
        if (e.target.getFeatures().array_.length !== 0) {
          if(_that.isShow){
            _that.showDelFirst = true
          }
          let chooseRl = e.target.getFeatures().array_[0].values_;
          _that.rlComDataList.forEach(item => {
            if (item.id == chooseRl.id) {
              _that.objName = chooseRl.name;
              if (item["assessScheme"]) {
                _that.score = item.assessScheme.gtVo.score[0].score.toFixed(2);
                _that.delScoreList = item.assessScheme.gtVo.children;
              } else {
                _that.score = 0;
                _that.delScoreList = [
                  {
                    name: "生态健康",
                    score: [
                      {
                        score: 0
                      }
                    ]
                  },
                  {
                    name: "服务功能",
                    score: [
                      {
                        score: 0
                      }
                    ]
                  },
                  {
                    name: "干扰程度",
                    score: [
                      {
                        score: 0
                      }
                    ]
                  },
                  {
                    name: "管理水平",
                    score: [
                      {
                        score: 0
                      }
                    ]
                  }
                ];
              }
            }
          });
        }
      });
    },
    /** 左侧收缩标签方法 */
    leftBoxPop() {
      this.leftFlag = !this.leftFlag;
      var div = document.querySelector("#boxLeft");
      var tag = document.querySelector("#tag");
      var lakeFraction = document.querySelector("#fraction");
      if (!this.leftFlag) {
        div.style.left = "-22.05vw";
        tag.style.left = "0.5vw";
        lakeFraction.style.left = "0.5vw";
      } else {
        div.style.left = "24px";
        tag.style.left = "23vw";
        lakeFraction.style.left = "23vw";
      }
    },
    /** 右侧收缩标签方法 */
    rightBoxPop() {
      this.rightFlag = !this.rightFlag;
      var div = document.querySelector("#boxRight");
      if (!this.rightFlag) {
        div.style.right = "-22.05vw";
      } else {
        div.style.right = "24px";
      }
    },
    /** 大小比较函数 */
    compare(property) {
      return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      };
    },
    /** 全域信息排名数据处理函数*/
    setHealthstatusRanking() {
      let arr = [];
      this.rlComDataList.forEach(item => {
        if (item.assessScheme) {
          let param = {
            name: item.name,
            score: item.assessScheme.gtVo.score[0].score.toFixed(2),
            evaluation: item.assessScheme.gtVo.score[0].scoreDesc
          };
          arr.push(param);
        }
      });
      let objNum3 = "";
      let data = [];
      let objScoreArr = arr.sort(this.compare("score"));

      objScoreArr.forEach(item => {
        let singleObject = [];
        let score = "";
        singleObject.push(item.name);
        if (item.score >= 90) {
          score = "<span  class='colorOver90'>" + item.score + "</span>";
          objNum3 += item.name + "、";
        } else if (item.score >= 80) {
          score = "<span  class='colorOver80'>" + item.score + "</span>";
        } else if (item.score >= 60) {
          score = "<span  class='colorOver60'>" + item.score + "</span>";
        } else if (item.score >= 40) {
          score = "<span  class='colorOver40'>" + item.score + "</span>";
        } else {
          score = "<span  class='colorOther'>" + item.score + "</span>";
        }
        singleObject.push(score);
        singleObject.push(item.evaluation);
        data.push(singleObject);
      });

      this.areaObjNum3 = objNum3.slice(0, objNum3.length - 1);
      this.paimingshuju = {
        header: ["名称", "健康分值", "健康状态"],
        data: data,
        rowNum: 8, //表格行数
        headerHeight: 35,
        headerBGC: "rgba(51, 194, 255, 0.1)", //表头
        oddRowBGC: "rgba(28, 31, 34, 0.1)", //奇数行
        evenRowBGC: "rgba(28, 31, 34, 0.1)", //偶数行
        index: true,
        columnWidth: [60],
        // align: ["center"],
        indexHeader: "排名"
        // carousel: 'page'
      };
    },
    /** 获取鼠标点击对象信息 */
    getObjData(info) {
      let choosenRlInfo = {};
      this.objScore = 0;
      this.rlComDataList.forEach(item => {
        if (item.id == info.values_.id) {
          choosenRlInfo = item;
        }
      });
      if (choosenRlInfo["assessScheme"]) {
        let scheme = choosenRlInfo.assessScheme;
        console.log(scheme);
        if (scheme["siteList"]) {
          // 站点绘制
          this.drawSchemeSite(scheme.siteList);
        }
        if (scheme["reachList"]) {
          // 河段湖区绘制
          // this.drawSchemeReach(scheme.reachList)
        }
        if (scheme["qusVo"]) {
          // 调查问卷部分页面绘制
          this.qusPer =
            100 -
            scheme.qusVo.disable /
              (scheme.qusVo.bad +
                scheme.qusVo.disable +
                scheme.qusVo.middle +
                scheme.qusVo.good +
                scheme.qusVo.veryGood);
          this.publicSatisfactionScore = scheme.qusVo.score;
          this.publicSatisfaction = [
            scheme.qusVo.veryGood,
            scheme.qusVo.good,
            scheme.qusVo.middle,
            scheme.qusVo.bad,
            scheme.qusVo.disable
          ];
        }
        if (scheme["gtVo"]) {
          if (scheme.gtVo.children.length > 0) {
            for (let i = 0; i < scheme.gtVo.children.length; i++) {
              if (scheme.gtVo.children[i].code == "B1") {
                this.ciYunDataDo(scheme.gtVo.children[i]);
              }
              if (scheme.gtVo.children[i].code == "B2") {
                this.radarDataDo(scheme.gtVo.children[i]);
              }
              if (scheme.gtVo.children[i].code == "B3") {
                this.interferenceDataDo(scheme.gtVo.children[i]);
              }
              if (scheme.gtVo.children[i].code == "B4") {
                this.funnelDataDo(scheme.gtVo.children[i]);
              }
            }
          }
          this.objScore = scheme.gtVo.score[0].score;
        }
      }
      this.objName1 = choosenRlInfo.name;
      this.objDesc = `${choosenRlInfo.simpleDesc}`;
    },
    /** 方案对象河段/湖区地图绘制 */
    drawSchemeReach(info) {
      let schemeReachList = [];
      info.forEach(item => {
        let wkt = item.geom;
        let format = new WKT();
        let feature = format.readFeature(wkt, {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:4326"
        });
        feature.setProperties({
          id: item.id,
          siteName: item.name
        });
        let styleHh = null;
        if (item.area != undefined) {
          styleHh = new Style({
            text: new Text({
              text: item.name, // 添加文字描述
              font: "14px font-size", // 设置字体大小
              fill: new Fill({
                // 设置字体颜色
                color: "#000"
              }),
              offsetY: 10 // 设置文字偏移量
            }),
            stroke: new Stroke({
              color: "#000",
              width: 1
            }),
            fill: new Fill({
              color: "#80FFFF"
            })
          });
        } else {
          styleHh = new Style({
            text: new Text({
              text: item.name, // 添加文字描述
              font: "14px font-size", // 设置字体大小
              fill: new Fill({
                // 设置字体颜色
                color: "#000"
              }),
              offsetY: 10 // 设置文字偏移量
            }),
            stroke: new Stroke({
              color: "#f40",
              width: 3
            }),
            fill: new Fill({
              color: "#80FFFF"
            })
          });
        }
        feature.setStyle(styleHh);
        schemeReachList.push(feature);
      });
      this.rlComReachLayer = new VectorLayer({
        source: new Vector({
          features: [...schemeReachList]
        })
      });
      // this.rlComSiteLayer.setZIndex(2)
      this.map.addLayer(this.rlComReachLayer);
    },
    /** 方案站点地图绘制*/
    drawSchemeSite(info) {
      let schemeSiteList = [];
      info.forEach(item => {
        console.log(item,"item")
        let wkt = item.geom;
        let format = new WKT();
        let feature = format.readFeature(wkt, {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:4326"
        });
        feature.setProperties({
          id: item.id,
          siteName: item.siteName,
          rlCom: 1
        });
        let styleHh = new Style({
          image: new Icon({
            src: require("../assets/site-icon.svg"),
            anchor: [0.5, 1],
            fill: new Fill({
              color: "#f40"
            })
          }),
          stroke: new Stroke({
            size: 10
          }),
          fill: new Fill({
            color: "#f40"
          }),
          text: new Text({
            text: item.name, // 添加文字描述
            font: "16px font-size", // 设置字体大小
            fill: new Fill({
              // 设置字体颜色
              color: "rgba(255, 255, 255, 1)"
            }),
            offsetY: -55, // 设置文字偏移量
            padding:[5,5,5,5],
              //标签的背景填充
              backgroundFill:new Fill({
                color:"rgba(20, 31, 41, 0.4)",
                
              }),
          })
        });
        feature.setStyle(styleHh);
        schemeSiteList.push(feature);
      });
      this.schemeSiteLayer = new VectorLayer({
        source: new Vector({
          features: [...schemeSiteList]
        })
      });
      this.schemeSiteLayer.setZIndex(3);
      this.map.addLayer(this.schemeSiteLayer);
    },
    /** 处理单个河湖对象词云图表数据 */
    ciYunDataDo(info) {
      this.B1Score = info.score[0].score.toFixed(2);
      this.rlChartData = [];
      this.ciYunData = [];
      this.childData(info);
      this.rlChartData.forEach(item => {
        let param = {
          name: item.name,
          value: item.value
        };
        this.ciYunData.push(param);
      });
      // this.ciYunData = this.rlChartData;
      this.evaluatingRankingB1 = {
        data: this.ciYunData, // 河湖对象详细指标评分信息数据
        rowNum: 4
      };
      console.log(this.evaluatingRankingB1);
    },
    /** 处理单个河湖对象雷达图表数据 */
    radarDataDo(info) {
      this.B2Score = info.score[0].score.toFixed(2);
      this.rlChartData = [];
      this.radarData = [];
      this.childData(info);
      this.radarData = this.rlChartData;
    },
    /** 处理单个河湖对象饼图图表数据 */
    interferenceDataDo(info) {
      this.B3Score = info.score[0].score.toFixed(2);
      this.rlChartData = [];
      this.interferenceData = [];
      this.childData(info);
      this.interferenceData = this.rlChartData;
    },
    /** 处理单个河湖对象饼图图表数据 */
    funnelDataDo(info) {
      this.B4Score = info.score[0].score.toFixed(2);
      this.rlChartData = [];
      this.funnelData = [];
      this.childData(info);
      this.funnelData = this.rlChartData;
    },
    /** 获取指标层信息数据 */
    childData(info) {
      if (info["children"]) {
        info.children.forEach(item => {
          if (item["children"]) {
            this.childData(item);
          } else {
            if (item["score"]) {
              let param = {
                id: item.score[0].assessSchemeDataId,
                name: item.name,
                value: item.score[0].score
              };
              this.rlChartData.push(param);
              this.targetDInfoData.push(item);
            }
          }
        });
      } else {
        if (info["score"]) {
          let param = {
            id: info.score[0].assessSchemeDataId,
            name: info.name,
            value: info.score[0].score
          };
          this.ciYunData.push(param);
          this.targetDInfoData.push(info);
        }
      }
    },
    /** 获取指标项展示内容 */
    targetInfoShow(info) {
      target_info(info).then(res => {
        this.targetInfoDo(res.data.data);
      });
    },
    /** 单一处理指标项数据 */
    targetInfoDo(info) {
      console.log(info);
      this.targetName = info.name;
      this.targetScore = info.score.toFixed(2);
      if (info.type == 1) {
        this.allPic = {};
        this.urlList = [];
        this.targetChartData = [];
        this.targetNameArr = [];
        for (let key in info.data) {
          if (key == 0) {
            this.allPic = info.data[key];
            this.urlList = info.data[key].urls;
          } else {
            this.targetNameArr.push(info.data[key].name.split("-")[0]);
            let param = {
              name: info.data[key].name.split("-")[1],
              num: info.data[key].num,
              urls: info.data[key].urls,
              targetName: info.data[key].name.split("-")[0]
            };
            this.targetChartData.push(param);
            this.targetPicTitle = "现场照片";
          }
        }

        this.targetNameArr = [...new Set(this.targetNameArr)];
        console.log(this.targetNameArr);
        this.typeOfPicChart = true;
      } else if (info.type == 2) {
        if (info["dataUrl"]) {
          this.loading = true;
          this.fileUrl = fileImgUrl + info.dataUrl + "&" + Math.random();
          this.typeOfFile = true;
        } else {
          this.typeOfOnlyScore = true;
        }
      } else if (info.type == 3) {
        if (info["dataUrl"]) {
          this.loading = true;
          this.fileUrl = fileImgUrl + info.dataUrl + "&" + Math.random();
          this.typeOfFile = true;
        } else {
          this.typeOfOnlyScore = true;
        }
      } else if (info.type == 4) {
        this.typeOfOnlyScore = true;
      } else if (info.type == 5) {
        if (info["dataUrl"]) {
          this.loading = true;
          this.fileUrl = fileImgUrl + info.dataUrl + "&" + Math.random();
          this.typeOfFile = true;
        } else {
          this.typeOfOnlyScore = true;
        }
      }
      this.$store.dispatch("targetInfo/changeTargetId", 0);
    },
    load() {
      this.loading = false;
    },
    changeUrlList(info) {
      if (info["urls"]) {
        this.urlList = info.urls;
        if (info["targetName"]) {
          this.targetPicTitle = info.targetName + " - " + info.name;
        } else {
          this.targetPicTitle = info.name;
        }
      } else {
      }
    },

    /** 获取四大类详细指标 */
    getALLdesc(info) {
      let choosenRlInfo;
      this.targetDInfoData = [];
      this.rlChartData = [];
      this.rlComDataList.forEach(item => {
        if (item.name == this.objName) {
          console.log(item);
          choosenRlInfo = item;
        }
      });
      if (choosenRlInfo["assessScheme"]) {
        let scheme = choosenRlInfo.assessScheme;
        if (scheme["gtVo"]) {
          if (scheme.gtVo.children.length > 0) {
            for (let i = 0; i < scheme.gtVo.children.length; i++) {
              if (scheme.gtVo.children[i].code == "B1" && info == 1) {
                this.childData(scheme.gtVo.children[i]);
                this.bigTargetTitle = scheme.gtVo.children[i].name;
              }
              if (scheme.gtVo.children[i].code == "B2" && info == 2) {
                this.childData(scheme.gtVo.children[i]);
                this.bigTargetTitle = scheme.gtVo.children[i].name;
              }
              if (scheme.gtVo.children[i].code == "B3" && info == 3) {
                this.childData(scheme.gtVo.children[i]);
                this.bigTargetTitle = scheme.gtVo.children[i].name;
              }
              if (scheme.gtVo.children[i].code == "B4" && info == 4) {
                this.childData(scheme.gtVo.children[i]);
                this.bigTargetTitle = scheme.gtVo.children[i].name;
              }
            }
          }
        }
      }
      console.log(this.targetDInfoData);
      (this.typeOfPicChartFlag = false), //图表指标
        (this.typeOfFileFlag = false), //文件指标
        (this.typeOfOnlyScoreFlag = false), //分数指标
        (this.targetFlag = true);
      setTimeout(function() {
        document.getElementById("button0").click();
        document.getElementById("button0").focus();
      }, 100);
    },
    /** 展示指标内容 */
    getTargetBody(info) {
      target_info(info.score[0].assessSchemeDataId).then(res => {
        console.log(res);
        this.targetAllInfoDo(res.data.data);
      });
      this.targetDesc = `${info.score[0].stdExplain}`;
    },
    /** 四大类处理指标项数据 */
    targetAllInfoDo(info) {
      (this.typeOfPicChartFlag = false), //图表指标
        (this.typeOfFileFlag = false), //文件指标
        (this.typeOfOnlyScoreFlag = false), //分数指标
        (this.targetName = info.name);
      if (info.score == 100) {
        this.targetScore = info.score;
      } else {
        this.targetScore = info.score.toFixed(2);
      }

      if (info.type == 1) {
        this.allPic = {};
        this.urlList = [];
        this.targetChartData = [];
        this.targetNameArr = [];
        console.log(info);
        for (let key in info.data) {
          if (key == 0) {
            this.allPic = info.data[key];
            this.urlList = info.data[key].urls;
          } else {
            this.targetNameArr.push(info.data[key].name.split("-")[0]);
            let param = {
              name: info.data[key].name.split("-")[1],
              num: info.data[key].num,
              urls: info.data[key].urls,
              targetName: info.data[key].name.split("-")[0]
            };
            this.targetChartData.push(param);
            this.targetPicTitle = "现场照片";
          }
        }

        this.targetNameArr = [...new Set(this.targetNameArr)];
        console.log(this.targetNameArr);
        this.typeOfPicChartFlag = true;
      } else if (info.type == 2) {
        if (info["dataUrl"]) {
          this.loading = true;
          this.fileUrl = fileImgUrl + info.dataUrl + "&" + Math.random();
          this.typeOfFileFlag = true;
        } else {
          this.typeOfOnlyScoreFlag = true;
        }
      } else if (info.type == 3) {
        if (info["dataUrl"]) {
          this.loading = true;
          this.fileUrl = fileImgUrl + info.dataUrl + "&" + Math.random();
          this.typeOfFileFlag = true;
        } else {
          this.typeOfOnlyScoreFlag = true;
        }
      } else if (info.type == 4) {
        this.typeOfOnlyScoreFlag = true;
      } else if (info.type == 5) {
        if (info["dataUrl"]) {
          this.loading = true;
          this.fileUrl = fileImgUrl + info.dataUrl + "&" + Math.random();
          this.typeOfFileFlag = true;
        } else {
          this.typeOfOnlyScoreFlag = true;
        }
      }
    }
  },
  computed: {
    ...mapState({
      targetInfo: state => state.targetInfo.targetInfo
    }),
    targetId() {
      return this.targetInfo.id;
    }
  },
  watch: {
    targetId: {
      immediate: true,
      handler: function(newval) {
        if (newval !== 0) {
          this.targetInfoShow(newval);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
#map-page {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  font-family: PingFang SC;
  // background-image: url(../assets/bgI.png);
  // background-color: #111115;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.mask-div {
  pointer-events: none;
  position: absolute;
  background: radial-gradient(
    49.46% 63.74% at 50% 48.1%,
    rgba(1, 8, 17, 0) 0%,
    rgba(1, 8, 17, 0.08) 41.67%,
    rgba(1, 8, 17, 0.62) 84.38%
  );
  width: 100vw;
  height: 100vh;
  left: 0;
  bottom: 0;
  // opacity: 0.8;
}
// pop
.lakeFraction {
  position: absolute;
  left: 23vw;
  top: 8.7vh;
  .lakeFraction-top {
    width: 222px;
    height: 88px;
    background: rgba(20, 31, 41, 0.3);
    display: flex;
    margin-bottom: 24px;
    box-sizing: border-box;
    .area-rl-score-img {
      height: 88px;
      width: 70px;
      img {
        width: 51px;
        height: 51px;
        display: block;
        margin: 20px 0 20px 16px;
      }
    }
    .area-rl-score {
      color: rgba(255, 255, 255, 0.7);
      font-family: PingFang SC;
      font-size: 16px;
      vertical-align: middle;
      margin-left: 12px;
      margin-right: 16px;
      width: 130px;
      p {
        margin: 12px 0 0 0;
      }
      code {
        color: rgba(60, 212, 149, 1);
        font-family: PingFang SC;
        font-weight: 600;
        font-size: 40px;
        line-height: 40px;
        text-transform: lowercase;
      }
    }
  }
}
.rl-score-box {
  position: absolute;
  left: 23vw;
  top: 8.7vh;
  .lakeFraction-top {
    width: 150px;
    height: 88px;
    background: rgba(20, 31, 41, 0.3);
    display: flex;
    .area-rl-score {
      color: rgba(255, 255, 255, 0.7);
      font-family: PingFang SC;
      font-size: 16px;
      vertical-align: middle;
      margin-left: 16px;
      width: 130px;
      p {
        margin: 12px 0 0 0;
      }
      code {
        color: rgba(60, 212, 149, 1);
        font-family: PingFang SC;
        font-weight: 600;
        font-size: 40px;
        line-height: 40px;
        text-transform: lowercase;
      }
    }
  }
}
/deep/ .dv-scroll-board {
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  font-family: PingFang SC;
  font-size: 1.5vh;
}
/deep/ .dv-scroll-board .rows .ceil {
  font-size: 1.5vh;
  text-align: center !important;
  height: 44px !important;
  line-height: 44px !important;
}
/deep/ .dv-scroll-board .rows .row-item {
  height: 44px !important;
}
/deep/ .colorOver90 {
  color: rgba(26, 177, 214, 1);
  text-align: center;
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 1.7vh;
}
/deep/ .colorOver80 {
  color: rgba(124, 234, 189, 1);
  text-align: center;
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 1.7vh;
}
/deep/ .colorOver60 {
  color: rgba(251, 252, 84, 1);
  text-align: center;
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 1.7vh;
}
/deep/ .colorOver40 {
  color: rgba(239, 138, 52, 1);
  text-align: center;
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 1.7vh;
}
/deep/ .colorOther {
  color: rgba(213, 56, 38, 1);
  text-align: center;
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 1.7vh;
}
/deep/ .borderLeftBlue {
  border-left: 1px solid rgba(26, 177, 214, 1);
}
/deep/ .borderLeftGreen {
  border-left: 1px solid rgba(124, 234, 189, 1);
}
/deep/ .borderLeftYellow {
  border-left: 1px solid rgba(251, 252, 84, 1);
}
/deep/ .borderLeftOrange {
  border-left: 1px solid rgba(239, 138, 52, 1);
}
/deep/ .borderLeftRed {
  border-left: 1px solid rgba(213, 56, 38, 1);
}
.top-bg {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 6.4vh;
  background: rgba(20, 31, 41, 0.3);
  backdrop-filter: blur(20px);
  z-index: 1;
}
.top {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 7.4vh;
  display: flex;
  justify-content: space-between;
  z-index: 2;
  background-image: url("../assets/header-background-green.png/");
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  .timeDiv {
    position: fixed;
    right: 1.25vw;
    height: 6.1vh;
    line-height: 6.1vh;
    font-size: 2.6vh;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    font-family: PingFang SC;
  }
  .title-box {
    position: absolute;
    height: 7.4vh;
    line-height: 7.4vh;
    left: 1.25vw;
    .textTitlle {
      font-family: "title-font";
      color: rgba(60, 212, 149, 1);
      font-weight: 500;
      font-size: 4.1vh;
      letter-spacing: 7px;
    }
  }
  .btn {
    position: absolute;
    width: 7.4vw;
    height: 3.8vh;
    line-height: 3.8vh;
    top: 1.1vh;
    text-align: center;
    cursor: pointer;
  }
  .btn-line {
    font-size: 1.8vh;
    left: 27.2vw;
    font-weight: 600;
    color: rgba(60, 212, 149, 1);
    background-image: url("../assets/btn-sec.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
  }
  .btn-assess {
    font-size: 1.7vh;
    left: 35.4vw;
    color: rgba(255, 255, 255, 0.7);
    background-image: url("../assets/btn.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
  }
  .btn-manage {
    font-size: 1.7vh;
    left: 43.5vw;
    color: rgba(255, 255, 255, 0.7);
    background-image: url("../assets/btn.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
  }
}
.mask {
  pointer-events: none;
  position: absolute;
  background-color: rgba(23, 45, 56, 0.3);
  width: 100vw;
  height: 100vh;
  left: 0;
  bottom: 0;
}
#boxLeft {
  position: absolute;
  width: 20.8vw;
  height: 89.3vh;
  left: 24px;
  bottom: 24px;
  box-sizing: border-box;
  background: rgba(20, 31, 41, 0.3);
  backdrop-filter: blur(20px);
  transition-property: left;
  transition-duration: 0.1s;
  transition-timing-function: linear;
}
#boxRight {
  position: absolute;
  width: 20.8vw;
  height: 89.3vh;
  right: 24px;
  bottom: 24px;
  box-sizing: border-box;
  background: rgba(20, 31, 41, 0.3);
  backdrop-filter: blur(20px);
  transition-property: right;
  transition-duration: 0.1s;
  transition-timing-function: linear;
}
// 区域左侧顶部、中部介绍
.area-left-top {
  width: 19.2vw;
  height: 29.6vh;
  margin: 1.5vh 0.8vw 1.1vh 0.8vw;
  .area-desc {
    width: 19.2vw;
    height: 23.7vh;
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.5vh;
    line-height: 200%;
    margin: 1.5vh 0 0 0;
    text-indent: 3vh;
    overflow-y: auto;
    // overflow: hidden;
    text-align: justify;
    .area-desc-ani-1 {
      -webkit-animation: 10s rowup1 linear infinite normal;
      animation: 10s rowup1 linear infinite normal;
      &:hover{
      animation-play-state:paused;
      -webkit-animation-play-state:paused;
      }
    }
    .area-desc-ani-2 {
      -webkit-animation: 10s rowup2 linear infinite normal;
      animation: 10s rowup2 linear infinite normal;
      &:hover{
      animation-play-state:paused;
      -webkit-animation-play-state:paused;
      }
    }
    .text-leftImage {
      margin-right: 8px;
      margin-bottom: 3px;
    }
    .text-2 {
      color: rgba(60, 212, 149, 1);
      font-family: PingFang SC;
      margin-left: -3px;
    }
    .text-3 {
      color: rgba(60, 212, 149, 1);
      margin-left: -3px;
    }
  }
}
/*滚动条bai整体*/
::-webkit-scrollbar {
  width: 0px; /*滚动条宽度*/
}
/** 动画实现 */
@-webkit-keyframes rowup1 {
  0% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    100% {
        -webkit-transform: translate3d(0, -312px, 0);
        transform: translate3d(0, -312px, 0);
        display: none;
    }
}

@keyframes rowup1 {
  0% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    100% {
        -webkit-transform: translate3d(0, -312px, 0);
        transform: translate3d(0, -312px, 0);
        display: none;
    }
}
/** 动画实现 */
@-webkit-keyframes rowup2 {
  0% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    100% {
        -webkit-transform: translate3d(0, -395px, 0);
        transform: translate3d(0, -395px, 0);
        display: none;
    }
}

@keyframes rowup2 {
  0% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    100% {
        -webkit-transform: translate3d(0, -395px, 0);
        transform: translate3d(0, -395px, 0);
        display: none;
    }
}

// 区域左侧bottom
.area-left-bottom {
  width: 19.2vw;
  height: 30.1vh;
  margin: 0 0.8vw 1.5vh 0.8vw;
  position: relative;
  .assess {
    width: 100%;
    height: 4.8vh;
    margin-top: 2vh;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    .assess-pic {
      height: 4.8vh;
      img {
        height: 100%;
      }
    }
    .assess-text {
      width: 16vw;
      .assess-text-del {
        height: 1.8vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.3vh;
        color: rgba(255, 255, 255, 0.5);
        .delImg {
          width: 2.3vw;
          background-image: url(../assets/rightIcon-bg.png);
          background-position: right center;
          background-repeat: no-repeat;
          background-size: 38%;
        }
        // img{
        //   position: absolute;
        // }
      }
      .assess-area {
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.5vh;
        margin-top: 0.8vh;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: bottom;
        font-family: PingFang SC;
        .assess-area-rightBottom {
          height: 1vh;
          width: 5.1vw;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
// 区域右侧top健康状况统计
.area-right-top {
  width: 19.2vw;
  height: 22.1vh;
  margin: 1.5vh 0.8vw 1.1vh 0.8vw;
  position: relative;
  // text-align: right;
  .health-status {
    width: 19.2vw;
    height: 20.1vh;
    position: absolute;
    top: 6vh;
    .single-status {
      line-height: 200%;
      .status-font-style {
        text-align: right;
        display: inline-block;
        width: 4vw;
        color: rgba(255, 255, 255, 0.7);
        font-family: PingFang SC;
        font-size: 1vh;
        line-height: 20px;
      }
      .progress-sty {
        display: inline-block;
        width: 12vw;
        margin-left: 10px;
      }
    }
  }
}
.area-right-center {
  width: 19.2vw;
  height: 39vh;
  margin: 0 0.8vw 1.1vh 0.8vw;
  position: relative;
  .ranking {
    position: relative;
    margin: 10px 0;
    font-size: 1.5vh;
    color: rgba(60, 212, 149, 1);
    .dv-scr-board {
      width: 100%;
      height: 34vh;
    }
    /deep/ .header {
      height: 44px !important;
      line-height: 44px !important;
      color: rgba(60, 212, 149, 1);
      font-family: PingFang SC;
      font-size: 1.5vh;
      font-weight: 500;
      .header-item {
        height: 44px !important;
        line-height: 44px !important;
        text-align: center;
      }
    }
  }
}
.area-right-bottom {
  width: 19.2vw;
  height: 28.2vh;
  margin: 0 0.8vw 1.5vh 0.8vw;
  position: relative;
  .file-box {
    height: 30vh;
    width: 100%;
    overflow-y: auto;
  }
  .assess {
    width: 100%;
    height: 3.7vh;
    line-height: 3.7vh;
    margin-top: 1.1vh;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    .assess-pic {
      height: 3.7vh;
      line-height: 3.7vh;
      font-size: 1.5vh;
      color: rgba(216, 251, 255, 0.9);
      font-family: PingFang SC;
      img {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        height: 2.5vh;
      }
    }
    .assess-text-del {
      height: 3.7vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.3vh;
      color: rgba(255, 255, 255, 0.5);
      .delImg {
        width: 2.3vw;
        background-image: url(../assets/rightIcon-bg.png);
        background-position: right center;
        background-repeat: no-repeat;
        background-size: 38%;
      }
    }
  }
}
.title {
  width: 19.2vw;
  height: 4vh;
  line-height: 4vh;
  position: relative;
  .title-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 19.2vw;
    height: 3.7vh;
  }
  .water {
    position: absolute;
    left: 1.7vw;
    width: 17vw;
    height: 3.7vh;
    line-height: 3.7vh;
    color: rgba(60, 212, 149, 1);
    font-family: PingFang SC;
    font-size: 1.8vh;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    // background: red;
    .font-blueLeft-out {
      font-size: 1.5vh;
      color: rgba(255, 255, 255, 0.7);
      .font-blueLeft {
        padding-left: 4vw;
      }
    }
    .font-blue {
      color: rgba(60, 212, 149, 1);
    }
  }
}
.leftOut {
  width: 32px;
  height: 40px;
  position: absolute;
  left: 22vw;
  bottom: 50vh;
  cursor: pointer;
  transition-property: left;
  transition-duration: 0.1s;
  transition-timing-function: linear;
  background-image: url("../assets/leftIcon.png");
  background-repeat: no-repeat;
  background-position: center center;
}
.leftIn {
  width: 32px;
  height: 40px;
  position: absolute;
  left: 0;
  bottom: 50vh;
  cursor: pointer;
  transition-property: left;
  transition-duration: 0.1s;
  transition-timing-function: linear;
  background-image: url("../assets/rightIcon.png");
  background-repeat: no-repeat;
  background-position: center center;
}
.rightOut {
  width: 32px;
  height: 40px;
  position: absolute;
  right: 22vw;
  bottom: 50vh;
  cursor: pointer;
  transition-property: left;
  transition-duration: 0.1s;
  transition-timing-function: linear;
  background-image: url("../assets/rightIcon.png");
  background-repeat: no-repeat;
  background-position: center center;
}
.rightIn {
  width: 32px;
  height: 40px;
  position: absolute;
  right: 0;
  bottom: 50vh;
  cursor: pointer;
  transition-property: left;
  transition-duration: 0.1s;
  transition-timing-function: linear;
  background-image: url("../assets/leftIcon.png");
  background-repeat: no-repeat;
  background-position: center center;
}
.map-legend {
  width: 5.8vw;
  position: absolute;
  left: 23vw;
  bottom: 24px;
  color: rgba(255, 255, 255, 0.9);
  font-family: PingFang SC;
  font-size: 14px;
  background: rgba(20, 31, 41, 0.3);
  backdrop-filter: blur(20px);
  // background: rgba(196, 196, 196, 1);
  // box-shadow: 0px 14px 42px rgba(26, 62, 153, 0.12);
  transition-property: right;
  transition-duration: 0.1s;
  transition-timing-function: linear;
  .mark {
    position: relative;
    margin: 1.5vh 0.8vw 0.7vh 0.8vw;
    height: 16px;
    line-height: 16px;
    div {
      display: inline-block;
    }
    .legend-box {
      width: 16px;
      height: 16px;
    }
    .legend-1 {
      width: 10px;
      height: 10px;
      margin: 3px 3px 0 3px;
      background-color: rgba(26, 177, 214, 1);
    }
    .legend-2 {
      width: 10px;
      height: 10px;
      margin: 3px 3px 0 3px;
      background-color: rgba(124, 234, 189, 1);
    }
    .legend-3 {
      width: 10px;
      height: 10px;
      margin: 3px 3px 0 3px;
      background-color: rgba(251, 252, 84, 1);
    }
    .legend-4 {
      width: 10px;
      height: 10px;
      margin: 3px 3px 0 3px;
      background-color: rgba(239, 138, 52, 1);
    }
    .legend-5 {
      width: 10px;
      height: 10px;
      background-color: rgba(213, 56, 38, 1);
      margin: 3px 3px 0 3px;
    }
    .legend-6 {
      width: 16px;
      height: 16px;
      background-image: url("../assets/tag.png");
      background-size: cover;
    }
  }
}

.object-left-top {
  width: 19.2vw;
  height: 28.1vh;
  margin: 1.5vh 0.8vw 1.5vh 0.8vw;
  position: relative;
  .obj-desc-uni {
    text-indent: 2rem;
    color: rgba(255, 255, 255, 0.9);
    height: 24vh;
    font-size: 1.5vh;
    line-height: 200%;
    letter-spacing: 0.9px;
    margin: 1.5vh 0 0.7vh 0;
    overflow-y: auto;
    text-align: justify;
    .obj-desc {
      -webkit-animation: 10s rowup linear infinite normal;
      animation: 10s rowup linear infinite normal;
      span {
        font-family: PingFang SC;
        color: rgba(60, 212, 149, 1);
      }
    }
  }
}
.object-left-center {
  width: 19.2vw;
  height: 28.1vh;
  margin: 0 0.8vw 1.5vh 0.8vw;
  position: relative;
  .public {
    width: 19.2vw;
    height: 95%;
    .totalScore {
      position: absolute;
      left: 0;
      top: 5.9vh;
      margin-left: 7vw;
      color: rgba(60, 212, 149, 1);
      font-family: PingFang SC;
      font-size: 1.7vh;
    }
  }
}
.object-left-bottom {
  width: 19.2vw;
  height: 28.1vh;
  margin: 0 0.8vw 1.5vh 0.8vw;
  position: relative;
  .swiperText {
    width: 19.2vw;
    height: 21.7vh;
    position: absolute;
    left: 0;
    top: 5.9vh;
    .el-carousel__item .carousel-explain {
      width: 17.5vw;
      height: 18vh;
      margin: 1.5vh auto;
      color: rgba(255, 255, 255, 0.9);
      font-size: 1.5vh;
      line-height: 200%;
      overflow-y: auto;
      .text-first {
        width: 15.4vw;
        height: auto;
        margin: 0 0.4vw 1.1vh 1.7vw;
        position: relative;
      }
      .text-first::before {
        content: "";
        position: absolute;
        left: -1.2vw;
        top: 0.78vh;
        width: 1.5vh;
        height: 1.5vh;
        display: block;
        background: url(../assets/icon_？.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }
      .text-second {
        width: 15.4vw;
        height: auto;
        margin: 0 0.4vw 1.1vh 1.7vw;
        position: relative;
      }
      .text-second::before {
        content: "";
        position: absolute;
        left: -1.2vw;
        top: 0.78vh;
        width: 1.5vh;
        height: 1.5vh;
        display: block;
        background: url(../assets/icon_！.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }
    }

    .el-carousel__item:nth-child(2n) {
      height: 21.7vh;
      background: rgba(0, 232, 255, 0.04);
    }

    .el-carousel__item:nth-child(2n + 1) {
      height: 21.7vh;
      background: rgba(0, 232, 255, 0.04);
    }
    /deep/ .el-carousel__arrow--left {
      width: 24px;
      height: 24px;
      border-radius: 0 !important;
      position: absolute;
      left: 0px;
      color: rgba(216, 251, 255, 0.2);
      background-image: url(../assets/swiper-left.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
    /deep/ .el-carousel__arrow--left:hover {
      background-image: url(../assets/swiper-left-hover.png);
    }
    /deep/ .el-carousel__arrow--right {
      width: 24px;
      height: 24px;
      border-radius: 0 !important;
      position: absolute;
      right: 0px;
      color: rgba(216, 251, 255, 0.2);
      background-image: url(../assets/swiper-right.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
    /deep/ .el-carousel__arrow--right:hover {
      background-image: url(../assets/swiper-right-hover.png);
    }
    /deep/ .el-icon-arrow-left {
      display: none;
    }
    /deep/ .el-icon-arrow-right {
      display: none;
    }
    /deep/ .el-carousel__button {
      width: 0.5vh;
      height: 0.5vh;
      border-radius: 50%;
    }
  }
}
.object-right-top {
  width: 19.2vw;
  height: 17.8vh;
  margin: 1.5vh 0.8vw 1.5vh 0.8vw;
  position: relative;
  .title {
    cursor: pointer;
    .font-blue {
      width: auto;
      padding-right: 1.8vh;
      background-image: url(../assets/swiper-right-hover.png);
      background-position: right center;
      background-repeat: no-repeat;
      background-size: 15%;
    }
  }
  #txChart1A {
    width: 19.2vw;
    height: 90%;
    .dv-scr-rank {
      width: 100%;
      height: 80%;
      box-sizing: border-box;
      margin-top: 15px;
      /deep/ .row-item {
        height: auto;
      }
      /deep/ .ranking-info {
        height: 14px;
        .rank {
          display: none;
        }
        .info-name {
          font-size: 12px;
          margin-top: 5px;
          color: rgba(255, 255, 255, 0.9);
          font-family: PingFang SC;
        }
        .ranking-value {
          margin-top: 4px;
          color: rgba(60, 212, 149, 1);
          font-family: PingFang SC;
          font-weight: 500;
          font-size: 16px;
        }
      }
      /deep/ .ranking-column {
        margin-top: 8px;
        background: rgba(60, 212, 149, 0.1);
        border-bottom: none;
        .inside-column {
          height: 10px;
          border: 1px solid rgba(60, 212, 149, 0.7);
          box-sizing: border-box;
          background-color: rgba(60, 212, 149, 0.2);
        }
      }
    }
  }
}
.object-right-center {
  width: 19.2vw;
  height: 25vh;
  margin: 0 0.8vw 0 0.8vw;
  position: relative;
  .title {
    cursor: pointer;
    .font-blue {
      width: auto;
      padding-right: 1.8vh;
      background-image: url(../assets/swiper-right-hover.png);
      background-position: right center;
      background-repeat: no-repeat;
      background-size: 15%;
    }
  }
  .public {
    width: 19.2vw;
    height: 85%;
    position: absolute;
    left: 0;
    top: 6.5vh;
  }
}
.object-right-centerBar {
  width: 19.2vw;
  height: 21.2vh;
  margin: 0 0.8vw 0 0.8vw;
  position: relative;
  .title {
    cursor: pointer;
    .font-blue {
      width: auto;
      padding-right: 1.8vh;
      background-image: url(../assets/swiper-right-hover.png);
      background-position: right center;
      background-repeat: no-repeat;
      background-size: 15%;
    }
  }
  .zxtjChartA {
    width: 19.2vw;
    height: 88%;
  }
}
.object-right-bottom {
  width: 19.2vw;
  height: 21.7vh;
  margin: 0 0.8vw 1.5vh 0.8vw;
  position: relative;
  .title {
    cursor: pointer;
    .font-blue {
      width: auto;
      padding-right: 1.8vh;
      background-image: url(../assets/swiper-right-hover.png);
      background-position: right center;
      background-repeat: no-repeat;
      background-size: 15%;
    }
  }
  .zxtjChartA {
    width: 19.2vw;
    height: 88%;
  }
}

/deep/ .rl-main {
  // margin-left: -70px;
  // margin-top: -121px;
  padding: 4px 5px;
  font-size: 18px;
  font-family: "title-font";
  border: 1px solid rgba(60, 212, 149, 0.3);
  background: rgba(20, 31, 41, 0.3);
  backdrop-filter: blur(20px);
  .rl-name {
    text-align: center;
    color: rgba(255, 255, 255, 0.9);
    font-family: PingFang SC;
    font-size: 16px;
  }
  .rl-score {
    font-family: PingFang SC;
    font-weight: 500;
    font-size: 18px;
    line-height: 14px;
    margin-left: 8px;
  }
}

/deep/ .rl-veryHealthy {
  // border: 1px solid rgba(26, 177, 214, 1);
  color: rgba(26, 177, 214, 1);
}
/deep/ .rl-healthy {
  // border: 1px solid rgba(124, 234, 189, 1);
  color: rgba(124, 234, 189, 1);
}
/deep/ .rl-subhealthy {
  // border: 1px solid rgba(251, 252, 84, 1);
  color: rgba(251, 252, 84, 1);
}
/deep/ .rl-unhealthy {
  // border: 1px solid rgba(239, 138, 52, 1);
  color: rgba(239, 138, 52, 1);
}
/deep/ .rl-morbid {
  // border: 1px solid rgba(213, 56, 38, 1);
  color: rgba(213, 56, 38, 1);
}
/deep/ .rl-on-assessment {
  // border: 1px solid rgb(160, 213, 38);
  color: rgb(146, 213, 38);
  z-index: 999;
}
/deep/ .el-dialog__header  {
  padding: 1.5vh 1.25vw 1.5vh;
  text-align: center;
  background: linear-gradient(rgba(60, 212, 149, 0.3), rgba(60, 212, 149, 0.3)),
    rgba(0, 0, 0, 1);
}
/deep/ .el-dialog__body   {
  height: 70vh;
  min-height: 700px;
  background: rgba(20, 31, 41, 0.3);
  backdrop-filter: blur(20px);
  padding: 24px;
  color: rgba(60, 212, 149, 1);
}

/deep/ .el-dialog__title {
  color: rgba(255, 255, 255, 0.9);
  font-family: Source Han Sans CN;
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
}
/deep/ .el-dialog__headerbtn .el-dialog__close {
  font-size: 20px;
  line-height: 15px;
  color: rgba(255, 255, 255, 0.9);
}
/deep/ .el-dialog,
.el-pager li {
  background: none;
}
.target-type-1 {
  background: url(../assets/topBottom_lin.png) no-repeat;
  background-position: 50% 50%;
  background-size: 400px 400px;
  width: 100%;
  height: 600px;
  div {
    position: relative;
    top: 41%;
    left: 37%;
    color: rgba(60, 212, 149, 1);
    font-family: PingFang SC;
    font-size: 72px;
    width: 210px;
    text-align: center;
    code {
      color: rgba(255, 255, 255, 0.7);
      font-family: Source Han Sans CN;
      font-size: 24px;
      margin-left: -24px;
    }
  }
}
.target-type-2 {
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
  img {
    width: 100%;
    height: auto;
  }
}
.target-type-3 {
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
  .target-type-3-title {
    background: linear-gradient(
      90deg,
      rgba(0, 232, 255, 0.1) 0%,
      rgba(0, 232, 255, 0) 91.85%
    );
    backdrop-filter: blur(33px);
    color: rgba(60, 212, 149, 1);
    font-family: Source Han Sans CN;
    font-size: 14px;
    padding: 10px;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .target-type-3-pic {
    width: 100%;
    height: 60%;
    margin: 0 auto;
    img {
      display: block;
      margin: 0 auto;
    }
  }
  .target-type-statistics {
    margin: 16px auto;
    .target-type-loop {
      display: flex;
      justify-content: space-between;
      width: 528px;
      background: rgba(0, 232, 255, 0.08);
      margin: 0px auto;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      border-left: 1px solid rgba(255, 255, 255, 0.1);
      .total-name-out {
        width: 132px;
        height: 70px;
        line-height: 70px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        .total-name {
          color: rgba(216, 251, 255, 0.9);
          font-size: 14px;
          margin-left: 24px;
        }
      }
      .total-num-out {
        width: 132px;
        height: 70px;
        text-align: center;
        cursor: pointer;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        .total-name-small {
          font-size: 14px;
          padding-top: 12px;
          color: rgba(216, 251, 255, 0.9);
        }
        .target-type-num {
          color: rgba(255, 255, 255, 0.9);
          font-size: 20px;
        }
        .target-type-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
        }
      }
    }
    .target-type-loop:nth-child(1) {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
  }
}



.rl-score-info-box {
  position: absolute;
  right: 23vw;
  bottom: 2.2vh;
  width: 283px;
  height: 280px;
  background: rgba(20, 31, 41, 0.5);
  backdrop-filter: blur(20px);

  .title-text {
    width: 231px;
    height: 56px;
    background: rgba(60, 212, 149, 0.04);
    margin: 24px 24px 0;
    align-items: center;
    display: flex;
    .name {
      font-family: PingFang SC;
      font-size: 20px;
      margin: 0 16px;
    }
    .score {
      font-family: PingFang SC;
      font-weight: 600;
      font-size: 35px;
      line-height: 40px;
      text-transform: lowercase;
    }
    .point {
      color: rgba(255, 255, 255, 0.5);
      font-family: PingFang SC;
      font-size: 14px;
      text-transform: lowercase;
      margin-top: 10px;
      margin-left: 4px;
    }
  }
  .text-score {
    .popLine {
      margin: 0 24px;
      width: auto;
      height: 1px;
      display: flex;
      color: rgba(255, 255, 255, 0.6);
      margin-top: 0.8vh;
      .lin {
        width: 0.8vw;
        color: rgba(255, 255, 255, 0.7);
      }
      .tran {
        width: 10.8vw;
        height: 1px;
        border-top: 1px solid rgba(255, 255, 255, 0.4);
        margin-top: 1.1vh;
        margin-right: 0.5vh;
      }
    }
    .score-box {
      margin: 24px auto 0;
      width: 9vw;
      display: grid;
      justify-items: center;
      grid-template-columns: repeat(2, 50%);
      .norm-healthy {
        color: rgba(255, 255, 255, 0.7);
        font-family: PingFang SC;
        font-size: 14px;
        line-height: 24px;
      }
      .norm-grade {
        color: rgba(255, 255, 255, 0.9);
        font-family: PingFang SC;
        font-weight: 500;
        font-size: 24px;
        text-transform: lowercase;
        span {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
        }
      }
    }
  }
}

.target-all-info {
  display: flex;
  justify-content: space-between;
  height: 100%;
  .target-list {
    width: 25%;
    height: 100%;
    background: rgba(60, 212, 149, 0.04);
    ul {
      margin-left: -15px;
    }
    .score-target {
      width: 252px;
      height: 50px;
      text-align: left;
      padding: 0 10px;
      .target-name {
        color: rgba(255, 255, 255, 0.7);
        font-family: PingFang SC;
        font-weight: 500;
        font-size: 16px;
        line-height: 34px;
      }
      .target-score {
        display: none;
        color: rgba(255, 255, 255, 0.7);
        font-family: PingFang SC;
        font-size: 16px;
        span {
          color: rgba(60, 212, 149, 1);
          font-family: PingFang SC;
          font-weight: 500;
          font-size: 24px;
        }
      }
    }
    .score-target:focus {
      width: 252px;
      height: 84px;
      padding: 10px 0 10px 18px;
      text-align: left;
      background: linear-gradient(
        90.3deg,
        rgba(60, 212, 149, 0.1) 0.19%,
        rgba(60, 212, 149, 0) 97.57%
      );
      .target-name {
        color: rgba(60, 212, 149, 1);
        font-family: PingFang SC;
        font-weight: 500;
        font-size: 16px;
        line-height: 34px;
      }
      .target-score {
        display: block;
        color: rgba(255, 255, 255, 0.7);
        font-family: PingFang SC;
        font-size: 16px;
        span {
          color: rgba(60, 212, 149, 1);
          font-family: PingFang SC;
          font-weight: 500;
          font-size: 24px;
        }
      }
    }
    .score-target:hover {
      .target-name {
        color: rgba(60, 212, 149, 1);
        font-family: PingFang SC;
        font-weight: 500;
        font-size: 16px;
        line-height: 34px;
      }
    }
  }
  .target-content {
    width: 73%;
    height: 100%;
    overflow-y: auto;
    color: rgba(255, 255, 255, 0.7);
    margin-left: -70px;
    // background: rgba(60, 212, 149, 0.04);
    .all-pic {
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .target-title {
      background: linear-gradient(
        90deg,
        rgba(0, 232, 255, 0.1) 0%,
        rgba(0, 232, 255, 0) 91.85%
      );
      backdrop-filter: blur(33px);
      color: rgba(60, 212, 149, 1);
      font-family: Source Han Sans CN;
      font-size: 14px;
      padding: 10px;
      margin-bottom: 20px;
      cursor: pointer;
    }
  }
}
</style>