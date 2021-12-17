<template>
  <div ref="myEchart" id="ciYun"></div>
</template>

<script type="text/babel">
import * as echarts from "echarts";
import 'echarts-wordcloud/dist/echarts-wordcloud'
import 'echarts-wordcloud/dist/echarts-wordcloud.min'
export default {
  name: "ciYun",
  data() {
    return {
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
      let that = this
      myChart.on('click', function (event) {
        that.$store.dispatch("targetInfo/changeTargetId",event.data.id);
      });
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
#ciYun {
  width: 100%;
  height: 100%;
}
</style>
