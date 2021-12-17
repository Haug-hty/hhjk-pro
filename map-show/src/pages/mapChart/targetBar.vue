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
        options: {}
      }
    },
    components: {
      Bar
    },
    props:{
      targetChartData:Array
    },
    created(){
    console.log(this.targetChartData);
    
      let dataArr = []
      let dataName = []
      if(this.targetChartData == undefined){
        dataArr = [0,0,0,0,0]
      } else {
          this.targetChartData.forEach(item => {
              dataName.push(item.name)
              dataArr.push(item.value)
          })
      }
      this.options ={
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: dataName
            },
            series: [
                {
                    type: 'bar',
                    data: dataArr
                }
            ]
        };
    }
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
    margin-top:2vh;

    .bg-color-black {
      // height: $box-height - 30px;
      border-radius: 10px;

    }

    .text {
      color: #c3cbde;
    }
  }
</style>