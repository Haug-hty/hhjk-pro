<template>
  <div id="centerLeft1">
    <BarCircle :options="options"></BarCircle>
  </div>
</template>

<script>
import BarCircle from "@/components/echart/barCircle.vue";
export default {
  data() {
    return {
      options: {},
    };
  },
  components: {
    BarCircle,
  },
  props:{
    interferenceData:Array
  },
  created() {
    let series = [];
    let pieDatas = this.interferenceData;
    let maxRadius = 75,
      barWidth = 10,
      barGap = 5;
    let sumValue = 0;
    let showValue = true,
      showPercent = true;
    pieDatas.map((item) => {
      sumValue += item.value;
    });
    let barColor = [
      {
        color1: "rgba(60, 212, 149, 1)",
        color2: "",
      },
      {
        color1: "rgba(90, 169, 251, 1)",
        color2: "",
      },
    ];
    pieDatas.map((item, i) => {
      series.push({
        type: "pie",
        clockWise: true, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        radius: [
          maxRadius - i * (barGap + barWidth) + "%",
          maxRadius - (i + 1) * barWidth - i * barGap + "%",
        ],
        center: ["30%", "50%"],
        label: {
          show: false,
        },
        itemStyle: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          borderWidth: 5,
        },
        data: [
          {
            value: item.value,
            name: item.name,
            itemStyle: {
              color:
                (barColor[i] && barColor[i].color1) || "rgba(68,165,255,1)",
            },
          },
          {
            value: sumValue - item.value,
            name: "",
            itemStyle: {
              color: "transparent",
            },
            tooltip: {
              show: false,
            },
            hoverAnimation: false,
          },
        ],
      });
      series.push({
        name: "blank",
        type: "pie",
        silent: true,
        z: 0,
        clockWise: false, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        radius: [
          maxRadius - i * (barGap + barWidth) + "%",
          maxRadius - (i + 1) * barWidth - i * barGap + "%",
        ],
        center: ["30%", "50%"],
        label: {
          show: false,
        },
        itemStyle: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          borderWidth: 5,
        },
        data: [
          {
            value: 1,
            itemStyle: {
              color: "rgba(255, 255, 255,.13)",
              borderWidth: 0,
            },
            tooltip: {
              show: false,
            },
            hoverAnimation: false,
          },
        ],
      });
    });
    this.options = {
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      tooltip: {
        show: true,
        trigger: "item",
        formatter:function(item) {
              return `${item.name} ${item.value} 分`;
            }
      },
      legend: {
        show: true,
        left: "55%",
        top: "middle",
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 10,
        textStyle: {
          fontSize: 12,
          color: "rgba(255, 255, 255, 0.9)",
        },
      },
      series: series,
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
  border-radius: 5px;
  // background-color: red;
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