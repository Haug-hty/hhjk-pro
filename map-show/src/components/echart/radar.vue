<template>
  <div ref="myEchart" id="radar"></div>
</template>

<script type="text/babel">
import * as echarts from "echarts";
export default {
  name: "radar",
  data() {
    return {
      data: this.options
    };
  },
  props: {
    options: Object
  },
  methods: {
    // 图表初始化数据
    initChart() {
      if (this.$refs.myEchart == null) {
        return;
      }
      echarts.dispose(this.$refs.myEchart);
      let myChart = echarts.init(this.$refs.myEchart);
      let option = this.data;
      let that = this
      myChart.on('click', function (event) {
        let id = option.radar.indicator[event.event.topTarget.__dimIdx].id
        that.$store.dispatch("targetInfo/changeTargetId",id);
      });
      myChart.setOption(option);
    }
  },
  mounted() {
    let obj = this.$refs.myEchart;
    if (obj) {
      this.initChart();
    }
  }
};
</script>

<style lang="scss" scoped>
#radar {
  width: 100%;
  height: 100%;
}
</style>
