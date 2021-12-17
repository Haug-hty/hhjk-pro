<template>
  <div id="centerLeft1">
    <Radar :options="options"></Radar>
  </div>
</template>

<script>
import Radar from "@/components/echart/radar.vue";
export default {
  data() {
    return {
      options: {},
    };
  },
  components: {
    Radar,
  },
  props: {
    radarData: Array,
  },
  created() {
    let dataArr = [];
    let indicatorData = [];
    if (this.radarData == undefined) {
      // dataArr = [0,0,0,0,0]
    } else {
      // dataArr = this.radarData
      this.radarData.forEach((item) => {
        let param = {
          name: item.name,
          max: 100,
          id: item.id,
        };
        indicatorData.push(param);
        dataArr.push(item.value);
      });
    }
    this.options = {
      color: 'rgba(60, 212, 149, 1)',
      grid: {
        top: "10%",
        left: "3%",
        right: "10%",
        bottom: "6%",
        containLabel: true,
      },
      radar: {
        indicator: indicatorData,
        center: ["50%", "50%"],
        color: "rgba(255, 255, 255, 0.3)",
        axisName: {
          color: "rgba(255, 255, 255, 0.9)",
        },
        splitArea: {
          areaStyle: {
            color: [
              "rgba(255, 255, 255, 0.28)",
              "rgba(255, 255, 255, 0.22)",
              "rgba(255, 255, 255, 0.16)",
              "rgba(255, 255, 255, 0.1)",
              "rgba(255, 255, 255, 0.06)",
            ],
            shadowColor: "",
            shadowBlur: 10,
          },
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, 0.05)",
          },
        },
      },

      series: [
        {
          name: "",
          type: "radar",
          symbolSize: 8,
          data: [
            {
              value: dataArr,
              areaStyle: {
                color: "rgba(60, 212, 149, 0.2)",
              },
            },
          ],
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