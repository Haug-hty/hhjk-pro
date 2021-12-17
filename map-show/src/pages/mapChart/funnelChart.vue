<template>
  <div id="centerLeft1">
    <Funnel :options="options"></Funnel>
  </div>
</template>

<script>
import Funnel from "@/components/echart/funnel.vue";
export default {
  data() {
    return {
      options: {},
    };
  },
  components: {
    Funnel,
  },
  props: {
    funnelData: Array,
  },
  created() {
    console.log(this.funnelData)
    let dataStic = [] 
    let legendData = []
    if(this.funnelData == undefined){
      dataStic = [
                { value: 0, name: "暂无数据" }
              ]      
    } else {
      dataStic = this.funnelData
      this.funnelData.forEach(item => {
        legendData.push(item.name)
      })
    }    
    this.options = {
      color: [
          "rgba(78, 141, 229, 1)",
          "rgba(14, 89, 193, 1)",
          "rgba(34, 118, 252, 1)",
          "rgba(0, 67, 159, 1)",
        ],
        legend: {
          orient: "vertical",
          right: '5%',
          top: '13%',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
          textStyle: {
            color: "rgba(216, 251, 255, 0.9)",
          },
        },
        series: [
          {
            name: "Funnel",
            type: "funnel",
            left: "5%",
            top: 20,
            height: "70%",
            bottom: 20,
            width: "40%",
            min: 0,
            max: 100,
            minSize: "70%",
            maxSize: "90%",
            sort: "descending",
            gap: 5,
            label: {
              show: true,
              position: "inside",
              formatter: "{c}%",
              color: "#fff",
            },
            labelLine: {
              length: 20,
              lineStyle: {
                width: 1,
                type: "solid",
              },
            },
            itemStyle: {
              borderColor: "none",
              borderWidth: 1,
            },
            emphasis: {
              label: {
                fontSize: 20,
              },
            },
            data: dataStic,
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