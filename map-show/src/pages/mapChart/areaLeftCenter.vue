<template>
  <div id="centerLeft1">
    <Bar :options="options"></Bar>
  </div>
</template>

<script>
import Bar from "@/components/echart/bar.vue";
export default {
  data() {
    return {
      options: {},
    };
  },
  props: {
    healthStatistics: Array,
  },
  components: {
    Bar,
  },
  created() {
    let legnend = []; //图例数组
    let dataStic = []; // 数据数组
    if (this.healthStatistics.length > 0) {
      this.healthStatistics.forEach((item) => {
        legnend.push(item.type);
        dataStic.push(item.num);
      });
    }
    this.options = {
      grid: {
        // show:true,
        // width:300,
        // height:350,
        left: "17%",
        // right: "25",
        // bottom: '3%',
        top: "1%",
      },
      xAxis: {
        show: false,
        type: "value",
      },
      yAxis: [
        {
          type: "category",
          inverse: true,
          axisLabel: {
            textStyle: {
              color: "rgba(216, 251, 255, 0.7)",
              fontFamily: "Source Han Sans CN",
              fontSize: "14",
              lineHeight: 24,
            },
            // 调整左侧文字的3个属性，缺一不可
            // verticalAlign: 'bottom',
            align: "right",
            //调整文字上右下左
            // padding: [0,-40,15,0],
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          data: legnend,
        },
        {
          type: "category",
          inverse: true,
          axisTick: "none",
          axisLine: "none",
          show: true,
          axisLabel: {
            textStyle: {
              // color: "rgba(60, 212, 149, 1)",
              fontSize: "20",
            },
            formatter: "{value}",
          },
          // data: dataStic,
          data: [
            {
              value: dataStic[0],
              textStyle: {
                color: "rgba(26, 177, 214, 1)",
              },
            },
            {
              value: dataStic[1],
              textStyle: {
                color: "rgba(124, 234, 189, 1)",
              },
            },
            {
              value: dataStic[2],
              textStyle: {
                color: "rgba(251, 252, 84, 1)",
              },
            },
            {
              value: dataStic[3],
              textStyle: {
                color: "rgba(239, 138, 52, 1)",
              },
            },
            {
              value: dataStic[4],
              textStyle: {
                color: "rgba(213, 56, 38, 1)",
              },
            },
          ],
        },
      ],
      series: [
        {
          name: "值",
          type: "bar",
          zlevel: 1,
          // itemStyle: {
          //   normal: {
          //     color: "rgba(60, 212, 149, 0.5)",
          //     borderColor: "rgba(60, 212, 149, 1)"
          //   }
          // },
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = [
                  "rgba(26, 177, 214, 0.5)",
                  "rgba(124, 234, 189, 0.5)",
                  "rgba(251, 252, 84, 0.5)",
                  "rgba(239, 138, 52, 0.5)",
                  "rgba(213, 56, 38, 0.5)",
                ];
                return colorList[params.dataIndex];
              },
            },
          },
          barWidth: 12,
          data: [
            {
              value: dataStic[0],
              itemStyle: {
                normal: {
                  borderColor: "rgba(26, 177, 214, 1)",
                },
              },
            },
            {
              value: dataStic[1],
              itemStyle: {
                normal: {
                  borderColor: "rgba(124, 234, 189, 1)",
                },
              },
            },
            {
              value: dataStic[2],
              itemStyle: {
                normal: {
                  borderColor: "rgba(251, 252, 84, 1)",
                },
              },
            },
            {
              value: dataStic[3],
              itemStyle: {
                normal: {
                  borderColor: "rgba(239, 138, 52, 1)",
                },
              },
            },
            {
              value: dataStic[4],
              itemStyle: {
                normal: {
                  borderColor: "rgba(213, 56, 38, 1)",
                },
              },
            },
          ],
        },
        {
          name: "背景",
          type: "bar",
          barWidth: 12,
          barGap: "-100%",
          data: [15, 15, 15, 15, 15],
          itemStyle: {
            normal: {
              color: "rgba(51, 194, 255, 0.1)",
            },
          },
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#centerLeft1 {
  //   $box-width: 100%;
  //   $box-height: 100%;
  //   padding: 16px;
  height: 100%;
  min-width: 100%;
  min-height: 220px;
  // border-radius: 5px;
  // margin-top:2vh;

  .bg-color-black {
    // height: $box-height - 30px;
    border-radius: 10px;
  }

  .text {
    color: #c3cbde;
  }

  //   .dv-dec-1 {
  //     position: relative;
  //     width: 100px;
  //     height: 20px;
  //     top: -3px;
  //   }
  //   .chart-box {
  //     margin-top: 16px;
  //     width: 170px;
  //     height: 170px;
  //     .active-ring-name {
  //       padding-top: 10px;
  //     }
  //   }
}
</style>