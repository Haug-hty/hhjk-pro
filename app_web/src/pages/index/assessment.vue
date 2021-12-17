<!-- 照片上传页面-->

<template>
  <div class="pic-main-page">
    <div class="nav-title">
      <!-- <common-header tittle="方案详情" :showmore="true"></common-header> -->
      <van-button v-if="this.status == 3" class="briefing-del" @click="briefingReport">简报</van-button>
    </div>
    <div>
      <div class="score-table">
          <table cellspacing='0' width="100%">
                
                <tr class="table-tr-title">
                    <th>评估指标</th>
                    <th>指标值</th>
                    <th>评估结果</th>
                </tr>
                <tbody class="table-body-score">
                    <tr class="table-tr-score" v-for="(item,index) in this.targetScoreList" v-bind:key="index">
                        <td class="target-name">
                            {{item.name}}
                        </td>
                        <td class="target-score">
                            <span v-if="!item.score">-</span>
                            <span v-if="item.score">{{item.score[0].score}}</span>
                            
                        </td>
                        <td class="scheme-evaluate">
                            <span v-if="!item.score">-</span>
                            <span v-if="item.score">{{item.score[0].scoreDesc}}</span>
                            
                        </td>
                    </tr>
                    <tr class="table-tr-score table-tr-footer">
                        <td class="total-name">
                            综合得分
                        </td>
                        <td class="total-score">
                            {{this.schemeScore.score}}
                        </td>
                        <td class="total-evaluate">
                            {{this.schemeScore.scoreDesc}}
                        </td>
                    </tr>
                    

                </tbody>
                


            </table>
      </div>
    </div>
  </div>
</template>
<script>
import { schemeTotalScoreTable } from "@/api/scheme.js";
import commonHeader from "common/common-header";
import { Toast } from "mint-ui";
export default {
  name: "picOther",
  props: {},
  components: {
    commonHeader
  },
  data() {
    return {
        schemeId: this.$route.query.schemeId,
        status: this.$route.query.status,
        targetScoreList:[],
        schemeScore:{},
    };
  },
  created() {
  },
  mounted() {
      this.getSchemeScore()
  },
  methods: {
      /** 获取方案指标评分列表 */
      getSchemeScore(){
          let param = {
              id: this.schemeId
          }
          schemeTotalScoreTable(param).then(res=>{
              
              this.targetScoreList = res.data.data.list
              if(res.data.data.score){
                    this.schemeScore = res.data.data.score[0]
              }
          })
      },
      /** 简报页面跳转 */
      briefingReport(){
          this.$router.push({
              name:"briefingPreparation",
              query:{
                  schemeId: this.schemeId
              }
          })
      }
  },
  computed: {},
  watch: {}
};
</script>
<style lang="less" scoped>
.pic-main-page {
  overflow-y: auto;
  height: 100%;
  width: 100%;
  background: #eee;

  .nav-title {
      
    height: 6vh;
    .briefing-del {
        position: fixed;
        right: 0;
        float:right;
        margin-right:10px;
        border-radius: 33px;
        background: rgba(44, 104, 255, 1);
        width: 66px;
        color: rgba(255, 255, 255, 1);
        font-family: PingFang SC;
        font-weight: 500;
        font-size: 17px;
        height:4vh;
        margin-top:1vh;
    }
  }
  .score-table {
    padding: 5% 3%;
    .table-tr-title {
        height: 47px;
        font-size: 15px;
        background-color: rgba(255, 255, 255, 0.3);
    }
    .table-body-score {
        font-size: 14px;
        background-color: rgba(255, 255, 255, 1);
        .table-tr-score {
            height: 30px;
            line-height:30px;
            .target-name {
                color: rgba(97, 101, 105, 1);
                font-family: PingFang SC;
                text-align: left;
                padding-left: 5%;
            }
            .target-score {
                color: rgba(97, 101, 105, 1);
                font-family: PingFang SC;
                text-align: center;
            }
            .scheme-evaluate {
                text-align: center;
            }
            .total-name {
                color: rgba(30, 34, 45, 1);
                font-family: PingFang SC;
                font-weight: 500;
                font-size: 16px;
                text-align: left;
                padding-left: 5%;
            }
            .total-score {
                color: rgba(30, 34, 45, 1);
                font-family: PingFang SC;
                font-weight: 500;
                font-size: 16px;
                text-align: center;
            }
            .total-evaluate {
                font-family: PingFang SC;
                font-weight: 500;
                font-size: 16px;
                text-align: center;
            }
        };
        .table-tr-footer {
            background-color: rgba(67, 41, 109, 0.3);
        }
    }
  }
}
</style>