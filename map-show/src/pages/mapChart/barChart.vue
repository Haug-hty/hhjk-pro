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
      publicSatisfaction:Array
    },
    created(){
      let dataArr = []
      if(this.publicSatisfaction.length == 0){
        dataArr = [0,0,0,0,0]
      } else {
        dataArr = this.publicSatisfaction
      }
      this.options ={
          grid:{
            right: "10"
          },
          xAxis: {
            type: 'category',
            data: ['很满意', '满意', '基本满意', '不满意', '无效'],
            axisLabel: {
                  textStyle: {
                      color: 'rgba(255, 255, 255, 0.7)',
                      size:10
                  }
              }
          },
          yAxis: {
            type: 'value',
            name: "数量",
            splitLine: {     //网格线
              "show": false
            },
            axisLabel: {
                  textStyle: {
                      color: 'rgba(255, 255, 255, 0.7)'
                  }
              }
          },

          series: [
            {
              data: [dataArr[0], 
              dataArr[1], 
              dataArr[2], 
              dataArr[3], 
              {
                value: dataArr[4],
                itemStyle: {
                  color: 'rgba(60, 212, 149, 0.5)',
                  borderColor: "rgba(60, 212, 149, 1)"
                }
              },],
              type: 'bar',
              barWidth: 10,
              label: {
                show: true,
                position: 'top',
                textStyle:{
                  color:'rgba(255, 255, 255, 0.9)'
                }
              },
              itemStyle: {
                normal: {
                    // barBorderRadius: 5,
                    color: 'rgba(60, 212, 149, 0.5)',
                    borderColor: "rgba(60, 212, 149, 1)"
                },
            },
            }
          ]
        }
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