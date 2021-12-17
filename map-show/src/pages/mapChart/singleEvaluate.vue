<template>
  <div id="centerLeft1">
    <Pie :options="options"></Pie>
  </div>
</template>

<script>
import Pie from "@/components/echart/pie.vue";
export default {
  data() {
    return {
      options: {}
    }
  },
  components: {
    Pie
  },
  props:{
    interferenceData:Array
  },
  created(){
    let dataStic = [] 
    if(this.interferenceData == undefined){
      dataStic = [
                { value: 0, name: "暂无数据" }
              ]
    } else {
      if(this.interferenceData.length>0){
          this.interferenceData.forEach(item => {
              let param = {
                value: item.value,
                name: item.name,
                id: item.id
              }
              dataStic.push(param)
          })
      } else {
        dataStic = [
                { value: 0, name: "暂无数据" }
              ]
      }

    }    
    this.options = {
          tooltip: {
            trigger: "item"
          },
          legend: {
            top: '6%',
            left: 'center',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 16,
            textStyle: {
              color: "#fff"
            },
            formatter: function(name) {
              return `${name}`;
            }
          },
          calculable : true,
          series: [
            {
              name: "指标分类",
              type: "pie",
              radius: ["40%", "60%"],
              center: ["50%", "55%"], 
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "left"
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: "60",
                  fontWeight: "bold"
                }
              },
              labelLine: {
                show: true
              },
              data: dataStic,
              roseType: 'radius',
            }
          ],
          color: [
            "rgb(72,229,229)",
            "rgb(53,93,226)"
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