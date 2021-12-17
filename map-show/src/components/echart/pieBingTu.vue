<template>
  <div ref="myEchart" id="pieBingTu"></div>
</template>

<script type="text/babel">
import * as echarts from "echarts";
export default {
  name: "pieBingTu",
  data() {
    return {
      // data: this.options.data,
      data: this.options,
    };
  },
  props: {
    options: Object,
  },
  methods: {
    // 图表初始化数据
    initChart() {
      if (this.$refs.myEchart == null) {
        return;
      }
      echarts.dispose(this.$refs.myEchart);
      let myChart = echarts.init(this.$refs.myEchart);

      let option = this.data
      myChart.setOption(option);
    },
  },
  mounted() {
    let obj = this.$refs.myEchart;
    if (obj) {
      this.initChart();
    }
  },
};
</script>

<style lang="scss" scoped>
#pieBingTu {
  width: 100%;
  height: 100%;
}
</style>
