<template>
  <div>
    <van-nav-bar
        class="nav-bar"
      :title="schemeData.name"
      :left-arrow="true"
      @click-left="back"
    /> 
    <div class="content-page">
        <van-tabs v-model="activeName" color="rgb(44, 104, 255)">
        <van-tab title="采样" name="sampling" >
            <!-- <van-grid :border="false" :column-num="3" class="pic-box">
                <van-grid-item v-for="item in samplingPicList" v-bind:key="item.id">
                    <van-image :src="item.fileUrl" width="98px" height="98px" />
                </van-grid-item>
            </van-grid> -->

            <div class="pic-box">
                <div v-for="item in samplingPicList" v-bind:key="item.id">
                    <img :src="item.fileCode" width="100%" height="100%" @click="delPic(item.id)"/>
                </div>
            </div>
            <div class="pic-upload-div">
                <van-button class="pic-upload-button" @click="addSampling">添加</van-button>
            </div>
            
        </van-tab>
        <van-tab title="计算" name="calculation">
            <div class="pic-box">
                <div v-for="item in calculationPicList" v-bind:key="item.id">
                    <img :src="item.fileCode" width="100%" height="100%" @click="delPic(item.id)"/>
                </div>
            </div>
            <div class="pic-upload-div">
                <van-button class="pic-upload-button" @click="addCalculation">添加</van-button>
            </div>
        </van-tab>
        <van-tab title="其他" name="other">
            <div class="pic-box">
                <div v-for="item in otherPicList" v-bind:key="item.id" >
                    <img :src="item.fileCode" width="100%" height="100%" @click="delPic(item.id)"/>
                </div>
                
            </div>
            <div class="pic-upload-div">
                <van-button class="pic-upload-button" @click="addOther">添加</van-button>
            </div>
        </van-tab>
    </van-tabs>

    </div>
    
  </div>
</template>
<script>
import commonHeader from "common/common-header";
import {schemeInfoquery, schemePicInfo, delPic} from "@/api/scheme.js"
import { Dialog } from "vant"
export default {
    name:"tabList",
    data(){
        return {
            title:"",
            schemeData:{},
            activeName:this.$route.query.activeName,
            samplingPicList:[],
            calculationPicList:[],
            otherPicList:[],
        }
    },
    props:{},
    components: {
        commonHeader
    },
    created(){
        this.getSchemeInfo()
        this.getSchemePicInfo()
    },
    methods:{
        /** 路由页面回调（返回）办法 */
        back() {
            this.$router.push({
                name: 'scheme',
            });
        },
        getSchemeInfo(){
            schemeInfoquery(this.$route.query.id).then(res=>{
                this.schemeData = res.data.data
            })
        },
        /** 获取当前方案的图片 */
        getSchemePicInfo(){
            let param = {
                assessSchemeId: this.$route.query.id
            }
            schemePicInfo(param).then(res=>{
                console.log(res.data.data)
                this.samplingPicList =[]
                this.calculationPicList = []
                this.otherPicList = []
                res.data.data.forEach(item => {
                    if(item.busType ==2){
                        this.samplingPicList.push(item)
                    } else if(item.busType ==1){
                        this.calculationPicList.push(item)
                    } else {
                        this.otherPicList.push(item)
                    }
                });
                })

        },
        /** 添加采样类型照片*/
        addSampling(){
            console.log(this.schemeData)
            let info = this.schemeData
            let schemeId = info.id
            let schemeName = info.name
            this.$router.push({
                name: 'samplingPic',
                params: {
                    schemeId: schemeId,
                    schemeName: schemeName
                }
            })
        },
        /** 添加计算类型照片*/
        addCalculation(){     
            console.log(this.schemeData)
            let info = this.schemeData
            let schemeId = info.id;
            let schemeName = info.name;
            let guidelinesId = info.guidelinesId;
            let rlType = info.rlType;
            this.$router.push({
                name: "calculationPic",
                params: {
                schemeId: schemeId,
                schemeName: schemeName,
                guidelinesId: guidelinesId,
                rlType: rlType
                }
            });
        },
        /** 添加其他类型照片*/
        addOther(){
            let info = this.schemeData
            let schemeId = info.id;
            let schemeName = info.name;
            this.$router.push({
                name: "otherPic",
                params: {
                    schemeId: schemeId,
                    schemeName: schemeName,
                }
            });
        },

        /** 删除照片 */
        delPic(info){
            Dialog.confirm({
                title: '确认操作',
                message: '是否删除照片',
                })
                .then(() => {
                    delPic(info).then(res=>{                
                        this.getSchemePicInfo()
                    })
                })
                .catch(() => {
                    // on cancel
                });
            
        }
    },
    watch:{
        '$route'(){
            console.log($route)
            if(this.$route.params.schemeData){
                this.schemeData = this.$route.params.schemeData
            }
            else {
                this.schemeData = this.schemeData
            }
        }

    }
    
}
</script>
<style lang="less" scoped>
.nav-bar {
    height: 6vh;
}
.content-page {
    height: 94vh;
    width: 100%;
    overflow-y: auto;
    background:#eee;
    .pic-box {
        background:#eee;
        margin-top:5%; 
        margin-bottom: 10vh;
        // padding: 0px 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        img {
            margin: 0 3% 10px 0;
        };
        display: grid;
        grid-template-columns: repeat(3, 33%);
        // grid-template-rows: repeat(50,33vw);
        grid-row-gap: 1px;
        grid-column-gap: 1px;
    }
    .pic-upload-div {
        text-align: center;
        width: 100%;
        bottom: 5vh;
        position: fixed;
        margin: 0px auto;
        .pic-upload-button {
            color: rgba(255, 255, 255, 1);
            font-family: PingFang SC;
            font-weight: 500;
            font-size: 17px;
            width: 280px;
            height: 40px;
            border-radius: 63px;
            background: rgba(44, 104, 255, 1);

        }
    }
    
}

</style>

