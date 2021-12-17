<template>
  <div id="centerLeft1">
    <PieBingTu :options="options"></PieBingTu>
  </div>
</template>

<script>
import PieBingTu from "@/components/echart/pieBingTu.vue";
export default {
  data() {
    return {
      options: {},
    };
  },
  components: {
    PieBingTu,
  },
  props: {
    funnelData: Array,
  },
  created() {
    console.log(this.funnelData)
    let dataArr = [];
    this.options = {
       color: [
          "rgba(60, 212, 149, 1)",
          "rgba(90, 169, 251, 1)",
          "rgba(50, 84, 221, 1)",
          "rgba(190, 229, 251, 1)",
        ],
      tooltip: {
        show: true,
        trigger: "item",
        formatter:function(item) {
              return `${item.name} ${item.value} 分`;
            }
      },
      legend: {
        orient: "vertical",
        top: "middle",
        left: "55%",
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 20,
        textStyle: {
          fontSize: 12,
          color: "rgba(255, 255, 255, 0.9)",
        },
      },
      series: [
        {
          name: "服务功能",
          type: "pie",
          avoidLabelOverlap: false,
          center: ['30%', '50%'],
          radius: ['45%', '75%'],
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: false,
              fontSize: "40",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: this.funnelData,
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