<template>
  <div class="pic-main-page">
    <div
      style="height:60px;line-height:60px;width:100%;text-align:center;color: rgba(30, 34, 45, 1);
            font-family: PingFang SC;
            font-weight: 500;
            font-size: 20px;"
    >{{briefingData.objName}}</div>
    <div
      style="text-align: justify;
        text-indent: 30px;
        color: rgba(97, 101, 105, 1);
        font-family: PingFang SC;
        font-weight: 600;
        font-size: 16px;line-height:200%;"
    >
      <span style="font-size:18px">{{briefingData.objName}}</span>
      <span>{{briefingData.simpleDesc}}</span>
    </div>
    <div style="padding:10px;">
      <img
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimagecloud.thepaper.cn%2Fthepaper%2Fimage%2F106%2F408%2F448.png&refer=http%3A%2F%2Fimagecloud.thepaper.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637306825&t=f717bba607f109a3e6e8fdb3bc9a3a22"
        alt
        width="100%"
      >
    </div>
    <div
      style="text-indent: 30px;
            color: rgba(97, 101, 105, 1);
            font-family: PingFang SC;
            font-weight: 500;
            font-size: 16px;
            line-height: 200%;"
    >
      {{briefingData.objName}}健康状况指数综合得分为{{briefingData.score}}，健康综合评价等级为
      <span style="font-weight:600;font-size:18px">“优”</span>，健康状态为
      <span style="font-weight:600;font-size:18px">“{{briefingData.scoreDesc}}”</span>。
    </div>
    <div v-if="briefingData.suggestionsList == []">
      <!-- <div> -->
      <p
        style="color: rgba(30, 34, 45, 1);
                font-family: PingFang SC;
                font-weight: 600;
                font-size: 18px;
                line-height: 200%;"
      >河道主要问题有：</p>
      <ul v-for="(item,index) in briefingData.suggestionsList" v-bind:key="index">
        <li>{{item.problem}}</li>
      </ul>
    </div>
    <div id="pointChart" style="width:100%;height:40%"></div>
    <div style="text-indent: 30px;
    color: rgba(97, 101, 105, 1);
    font-family: PingFang SC;
    font-weight: 500;
    font-size: 16px;
    line-height: 200%;">
        依据《地表水环境质量标准》（GB3838-2002），<span style="color: rgba(44, 104, 255, 1)">选取溶解氧、高锰酸盐指数、氨氮、五日生化需氧量、总磷指标</span>，采用<span style="padding:2px;color: rgba(44, 104, 255, 1);font-weight:500;">{{siteName}}</span>水质监测断面{{briefingData.year}}年度水功能区监测成果，取各项指标的加权平均值对{{briefingData.objName}}水质进行评价。{{briefingData.year}}
            年度<span style="color: rgba(44, 104, 255, 1)">{{briefingData.objName}}水质年均值综合评价为{{briefingData.waterQualityLevel}}类</span>
    </div>
    <div v-for="item in this.urlList" v-bind:key="item">
        <img :src="item" width="95%" >
    </div>
    <div v-if="briefingData.suggestionsList == []">
          <p style="color: rgba(30, 34, 45, 1);
                font-family: PingFang SC;
                font-weight: 600;
                font-size: 18px;
                line-height: 200%;">建议：</p>
          <ul v-for="item in briefingData.suggestionsList" v-bind:key="item">
            <li>{{item.suggest}}</li>
          </ul>
    </div>
    <div>
        <h2>{{briefingData.objName}}健康评估单项指标及综合评价结果</h2>
          <table id="table" border="1" cellspacing="0" width="98%" style="text-align: center;"></table>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { get_briefing_data } from "@/api/scheme";
import commonHeader from "common/common-header";

export default {
  name: "briefingPreparation",
  data() {
    return {
      schemeId: this.$route.query.schemeId,
      briefingData: {}, //简报数据内容
      url: "", //水系图url
      urlList: ["http://hhjk.srgo.xyz/D101477ADE4F4BF7954322C8A29BCFDE.jpg"], //现场图列表
      siteName: "", //站点名称处理
      pointlegend: [], //指标分数图指标项数组
      pointData: [], //指标分数图数据项数组
      strHtml: "", //表格生成行
      strHtmlTotal: "", //表格生成最终html代码块
      layerDepth: null
    };
  },
  components: {
    commonHeader
  },
  props: {},
  created() {
    this.getBriefingData();
  },
  mounted() {},
  methods: {
    getBriefingData() {
      get_briefing_data(this.schemeId).then(res => {
        console.log("res", res);
        this.briefingData = res.data.data; //简报数据赋值
        // this.url = res.data.data.waterSystemMap
        res.data.data.siteList.forEach(item => {
          this.siteName += item.siteName + "、";
        });
        this.siteName = this.siteName.substr(0, this.siteName.length - 1) + res.data.data.siteList.length;
        if(res.data.data.sceneImage.length !== 0){
            this.urlList = res.data.data.sceneImage;
        }
        
        res.data.data.asdList.forEach(item => {
          this.pointlegend.push(item.guidelinesTargetName);
          this.pointData.push(item.score);
        });
        this.drawPointChart();
        this.bindRiverHealthInfo();
      });
    },
    //生成评分值的极坐标图
    drawPointChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("pointChart"));
      let option;

      option = {
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [10, 150],
            center: ["50%", "50%"],
            roseType: "radius",
            itemStyle: {
              borderRadius: 5,
              color: function(params) {
                if (params.value > 0 && params.value < 40) {
                  return "rgba(246, 144, 61, 1)";
                } else if (params.value >= 40 && params.value < 60) {
                  return "rgba(246, 189, 22, 1)";
                } else if (params.value >= 60 && params.value < 80) {
                  return "rgba(91, 143, 249, 1)";
                }
                return "rgba(97, 221, 170, 1)";
              }
            },
            data: this.pointData,
            label: {
              show: false
            }
          }
        ]
        // series: [{
        //     label: {
        //         show: false
        //     },
        //     type: 'bar',
        //     data: this.pointData,
        //     coordinateSystem: 'polar',
        //     itemStyle: {
        //         color: function (params) {
        //             if (params.value > 0 && params.value < 40) {
        //                 return "#FF5809";
        //             } else if (params.value >= 40 && params.value < 60) {
        //                 return "#FFFF37";
        //             } else if (params.value >= 60 && params.value < 80) {
        //                 return "#28FF28";
        //             }
        //             return "#0000E3";
        //         }
        //     }
        // }],
      };

      option && myChart.setOption(option);
    },

    GetChild(arr) {
      let varT = "";
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].finalNodeSize == 0) {
          if (this.strHtml == "") {
            if (arr[i].score) {
              varT = arr[i].score[0];
              if (varT.scoreDesc) {
                this.strHtml +=
                  "<td>" +
                  arr[i].name +
                  "(" +
                  arr[i].code +
                  ")" +
                  "</td>" +
                  "<td>" +
                  varT.score +
                  "</td><td>" +
                  varT.scoreDesc +
                  "</td></tr>";
              } else {
                this.strHtml +=
                  "<td>" +
                  arr[i].name +
                  "(" +
                  arr[i].code +
                  ")" +
                  "</td>" +
                  "<td>" +
                  varT.score +
                  "</td><td>" +
                  "-" +
                  "</td></tr>";
              }
              this.strHtmlTotal += this.strHtml;
              this.strHtml = "";
            } else {
              this.strHtml +=
                "<tr><td>" +
                arr[i].name +
                "(" +
                arr[i].code +
                ")" +
                "</td>" +
                "<td>" +
                "-" +
                "</td><td>" +
                "-" +
                "</td></tr>";
              this.strHtmlTotal += this.strHtml;
              this.strHtml = "";
            }
          } else {
            if (arr[i].score) {
              varT = arr[i].score[0];
              if (varT.scoreDesc) {
                this.strHtml +=
                  "<td>" +
                  arr[i].name +
                  "(" +
                  arr[i].code +
                  ")" +
                  "</td>" +
                  "<td>" +
                  varT.score +
                  "</td><td>" +
                  varT.scoreDesc +
                  "</td></tr>";
              } else {
                this.strHtml +=
                  "<td>" +
                  arr[i].name +
                  "(" +
                  arr[i].code +
                  ")" +
                  "</td>" +
                  "<td>" +
                  varT.score +
                  "</td><td>" +
                  "-" +
                  "</td></tr>";
              }

              this.strHtmlTotal += this.strHtml;
              this.strHtml = "";
            } else {
              this.strHtml +=
                "<td>" +
                arr[i].name +
                "(" +
                arr[i].code +
                ")" +
                "</td>" +
                "<td>" +
                "-" +
                "</td><td>" +
                "-" +
                "</td></tr>";
              this.strHtmlTotal += this.strHtml;
              this.strHtml = "";
            }
          }
        } else if (arr[i].finalNodeSize == 1) {
          if (this.strHtml == "") {
            this.strHtml +=
              "<tr><td>" + arr[i].name + "(" + arr[i].code + ")" + "</td>";
          } else {
            this.strHtml +=
              "<td>" + arr[i].name + "(" + arr[i].code + ")" + "</td>";
          }
          this.GetChild(arr[i].children);
        } else {
          if (this.strHtml == "") {
            this.strHtml +=
              '<tr><td rowspan="' +
              arr[i].finalNodeSize +
              '">' +
              arr[i].name +
              "(" +
              arr[i].code +
              ")" +
              "</td>";
          } else {
            this.strHtml +=
              '<td rowspan="' +
              arr[i].finalNodeSize +
              '">' +
              arr[i].name +
              "(" +
              arr[i].code +
              ")" +
              "</td>";
          }
          this.GetChild(arr[i].children);
        }
      }
    },
    bindRiverHealthInfo() {
      const _this = this;
      var result = this.briefingData.resultTable;

      this.strHtml = "";
      this.strHtmlTotal = "";
      if (result.finalNodeSize == 0) {
        this.strHtml +=
          "<tr><td>" + result.name + "(" + result.code + ")" + "</td></tr>";
      } else {
        this.strHtml += "<tr>";
        this.GetChild(result.children);
      }
      this.getLayerDepth(result);
      let colspanNum = this.layerDepth - 1;
      this.strHtmlTotal +=
        '<tr><td colspan="' +
        colspanNum +
        '">' +
        "综合得分" +
        "</td><td>" +
        this.briefingData.score +
        "</td><td>" +
        this.briefingData.scoreDesc +
        "</td></tr>";

      document.getElementById("table").innerHTML = this.strHtmlTotal;
    },
    getLayerDepth(result) {
      if (result.children) {
        this.getLayerDepth(result.children[0]);
      } else {
        this.layerDepth = result.layerDepth;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.pic-main-page {
  overflow-y: auto;
  height: 100%;
  width: 100%;
  padding: 0 5px;
}
</style>