<template>
  <div id="centerLeft1">
    <CiYun :options="options"></CiYun>
  </div>
</template>

<script>
import CiYun from "@/components/echart/ciYun.vue";
export default {
  data() {
    return {
      options: {},
    };
  },
  components: {
    CiYun,
  },
  props: {
    ciYunData: Array,
  },
  created() {
    let dataArr = []
    if(this.ciYunData == undefined){
      dataArr = [{
                name: "暂无数据",
                value: 1,
                id:1,
              }]
    } else {
      dataArr = this.ciYunData
    }
    this.options = {
        tooltip: {
          show: true,
          borderColor: "#fe9a8bb3",
          borderWidth: 1,
          padding: [10, 15, 5, 15],
          confine: true,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          textStyle: {
            color: "hotpink",
            lineHeight: 22,
          },
          extraCssText:
            "box-shadow: 0 4px 20px -4px rgba(199, 206, 215, .7);border-radius: 4px;",
        },
        series: [
          {
            type: "wordCloud",
            gridSize: 25, //修改文字（画布）之间的间距
            shape: "pentagon",
            rotationRange: [0, 0], //数据翻转范围
            rotationStep: 0,
            sizeRange: [12, 20], //画布范围，如果设置太大会出现少词（溢出屏幕）设置文字大小范围
            drawOutOfBound: false,
            layoutAnimation: true,
            left: "3%",
            top: "0%",
            width: "95%",
            height: "95%",
            right: "null",
            bottom: "null",
            textStyle: {
              fontFamily: "title-font",
              color: function (params) {
                let colors = [
                  "rgba(255,255,255,0.8)",
                  "rgba(255,255,255,0.7)",
                  "rgba(255,255,255,0.6)",
                  "rgba(255,255,255,0.5)",
                  "rgba(255,255,255,0.4)",
                  "rgba(255,255,255,0.3)",
                  "rgba(255,255,255,0.5)",
                  "rgba(255,255,255,0.3)",
                  "rgba(255,255,255,0.6)",
                  "rgba(255,255,255,0.5)",
                  "rgba(255,255,255,0.8)",
                ];
                return colors[parseInt(Math.random() * 10)];
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: "60",
                  fontWeight: "bold"
                }
              },
            },
            data: dataArr,
          },
        ],
      };
  },
};
</script>

<style lang="scss" scoped>
#centerLeft1 {
  height: 100%;
  min-width: 100%;
  border-radius: 5px;
  .bg-color-black {
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
}
</style>