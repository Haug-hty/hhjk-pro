// 现场照片录入

<!-- 照片上传页面-->

<template>
<div class="pic-main-page" >
        <!-- <common-header tittle="照片上传" :showmore="true"></common-header> -->
        <div>
            <div class="target-card">
                <p class="simpling-pic-schemename">
                    <span class="flag-title">丨</span>
                    {{schemeName}}
                </p>
                <van-uploader :before-read="beforeRead" accept="image/*" v-model="picList"
                 :after-read="afterRead" :before-delete="beforeDel" :max-count="1"/>
            </div>
            <div class="target-card">
                <p class="simpling-pic-schemename">
                    <span class="flag-title">丨</span>
                    {{schemeName}}
                </p>
                <p class="simple-name">具体河段</p>
                <van-cell-group class="text-box">
                    <van-field readonly clickable name="picker" :value="reach" placeholder="选择河段" right-icon="arrow-down"
                        @click="showPicker = true" />
                </van-cell-group>
                <van-popup v-model="showPicker" position="bottom">
                    <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
                </van-popup>
            </div>
            <div class="target-card" >
                <p class="simpling-pic-schemename">
                    <span class="flag-title">丨</span>
                    {{schemeName}}
                </p>
                
            <!-- <el-form-item label="指标项细则选择："> -->
                <div v-for="(item,index) in targetNameList" v-bind:key="index" style="width:100%" >
                    <div class="target-name">{{item.targetName}}</div>
                    <div v-for="(fac,index) in factorList" v-bind:key="index" style="width:100%">
                    <!-- <p class="target-pic-name">{{item.name}}</p> -->
                    <div :label="fac.factor" :value="fac.factor" :key="fac.factor" v-if="item.targetName == fac.targetName">
                        <div class="target-radio-title">{{fac.factor}}：</div>
                        <van-radio-group v-model="radioList[index]" direction="horizontal">
                            <div v-for="(perm,index) in extentList" v-bind:key="index" class="target-radio-label">
                                    <van-radio :name="perm.id" v-if="perm.factor === fac.factor" >{{perm.extent}}</van-radio>
                            </div>
                        </van-radio-group>
                    </div>
                </div>

                </div>
                
                </div>
            <div class="target-card">
                <p class="simpling-pic-schemename">
                    <span class="flag-title">丨</span>
                    {{schemeName}}
                </p>
                <van-cell-group class="text-box">
                    <van-field v-model="comments" rows="2" autosize type="textarea" maxlength="100" placeholder="请输入备注信息"
                        show-word-limit />
                </van-cell-group>
            </div>
            
        </div>
        <div class="pic-footer">
            <van-button class="pic-reset-button" @click="resetForm">重置</van-button>
            <van-button class="pic-submit-button" @click="submitForm">提交</van-button>
        </div>
    </div>
</template>
<script>
    import { target_score_detile, reach_info_list, pic_data_submit, uploadFileRequest } from "@/api/scheme.js"
    import commonHeader from 'common/common-header'
    import { Toast } from "vant"
    export default {
        name: 'calculationPic',
        props: {

        },
        data() {
            return {
                schemeId: this.$route.params.schemeId,
                schemeName: this.$route.params.schemeName,
                guidelinesId: this.$route.params.guidelinesId,
                rlType: this.$route.params.rlType,
                scoreList: [],// 详细指标项打分细则内容
                factorList: [],//指标小分类列表：四乱/水土流失/塌岸等
                extentList: [],//明细分类列表：轻度/中度/严重等
                radioList: {},//图片的绑定属性
                picUrl: '',//图片地址
                calculationPicInfo: [],//提交数据
                targetNameList:[],//名称列表
                reach:"",//河段
                reachId: undefined,// 河段id
                reachIdOptions: [], // 河段下拉选项
                showPicker: false, //展示选项
                columns: [],// 
                comments:'',// 详情
                picList:[],

            }

        },
        components: {
            commonHeader
        },
        created() {
            this.reachOptionsQuery()

        },
        mounted() {
            this.targetScoreSence()
        },
        methods: {
            /** 方案河段、湖区信息列表查询功能 */
            reachOptionsQuery() {
                reach_info_list(this.schemeId)
                    .then(res => {
                        if (res.data.data == [] || res.data.data[0] == null) {
                            console.log(res.data.data);
                            this.reachIdOptions = [];
                        } else {
                            this.columns = [];
                            this.reachIdOptions = res.data.data;
                            this.reachIdOptions.forEach(item => {
                                let param = {
                                    text: item.name,
                                    id: item.id
                                };
                                this.columns.push(param);
                            });
                            console.log(this.columns);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            /** 获取填写指标项的详细内容 */ 
            targetScoreSence() {
                let guidelinesTargetScoreId = null;
                let factor = "";
                let extent = "";
                let targetName = "";
                let params = {
                    guidelinesId: this.guidelinesId,
                    rlType: this.rlType
                }
                target_score_detile(params)
                    .then(res => {
                        console.log(11,res)
                        this.scoreList = res.data.data
                        res.data.data.forEach(item => {

                            if (item.factor === factor) {
                            } else {
                                this.factorList.push({ "factor": item.factor, "scoreId": item.guidelinesTargetScoreId,"targetName":item.targetName })
                                factor = item.factor
                            }
                            if (item.extent === extent) {
                            } else {
                                this.extentList.push({ "extent": item.extent, "id": item.id, "factor": item.factor, "scoreId": item.guidelinesTargetScoreId })
                                extent = item.extent
                            }
                            if (item.targetName === targetName) {
                            } else {
                                this.targetNameList.push({ "targetName": item.targetName})
                                targetName = item.targetName
                            }
                        });
                        console.log('===',this.factorList)
                    }).catch(err => {
                        console.log(err)
                    })

            },
            /** 河段信息选择下拉选 */
            onConfirm(value, index) {
                this.reach = value.text;
                this.reachId = value.id;
                this.showPicker = false;
            },
            /** 文件上传之后的回调函数（上传文件和文件数组） */
            afterRead(file) {                
                file.status = 'uploading';
                file.message = '上传中...';
                var form = new FormData();
                form.append("file", file.file);
                form.append("srcType",7)
                uploadFileRequest(form)
                    .then(res => {
                        console.log(2,res)
                        file.status = 'done';
                        file.message = '上传成功';
                        this.picUrl = res.data.data.fileCode
                    })
                    .catch(err => {
                        file.status = 'failed';
                        file.message = '上传失败';
                    });
                

            },
            /** 图片上传前验证 */ 
            beforeRead(file) {
                let isLt2M
                if(file instanceof Array){
                    file.forEach(item=>{
                        isLt2M = item.size / 1024 / 1024 < 50;
                        if (!isLt2M) {
                            Toast("上传文件大小不能超过 50MB!");
                            return false
                        }
                    })
                } else {
                    isLt2M = file.size / 1024 / 1024 < 50;
                    if (!isLt2M) {
                        Toast("上传文件大小不能超过 50MB!");
                        return false
                    }
                }
                
                return true
            },
            /** 删除回调 */
            beforeDel(file,detail){
                let picListLength = 0
                for(let i =0 ; i<this.picList.length ;i++){
                    if(this.picList[i].status){
                        if(this.picList[i].status == "done"){
                            picListLength = i
                            break
                        }
                    }
                }
                if(file.status){
                    if(file.status=="done"){
                        this.picUrl = ""
                        return true
                    } else {
                        return true
                    }
                } else {
                    Toast("只能删除本次上传的照片")
                    
                }
            },
            /** 图片信息上传功能 */
            submitForm() {
                if(this.picUrl == ""){
                    Toast("请上传一张照片！")
                    return false
                }
                
                if(JSON.stringify(this.radioList)=='{}'){
                    
                    Toast("请至少选择一项评估类！")
                    return false
                }
                let resdata = JSON.parse(JSON.stringify(this.radioList));
                this.calculationPicInfo = []
                for (let i = 0; i < this.factorList.length; i++) {
                    if (resdata[i]) {
                        this.scoreList.forEach(radio => {
                            if (resdata[i] == radio.id) {
                                let picVo = {
                                    assessSchemeId: this.schemeId,
                                    fileCode: this.picUrl,
                                    reachId: this.reachId,
                                    guidelinesTargetScoreId: radio.guidelinesTargetScoreId,
                                    guidelinesTargetScoreSenceId: radio.id,
                                    comments: this.comments
                                }
                                console.log(picVo)
                                this.calculationPicInfo.push(picVo)

                            }
                        })
                    }

                }
                console.log(this.calculationPicInfo)
                pic_data_submit(this.calculationPicInfo)
                    .then((res) => {
                        Toast({
                            message: '上传成功！',
                            // iconClass: 'icon icon-success'
                        })
                        this.$router.push({
                            name: 'tabList',
                            query:{
                                id:this.schemeId,
                                activeName:"calculation"
                            }
                        })
                    }).catch(err => {
                        console.log(err)
                    })

            },
            /** 表单重置功能 */
            resetForm() {
                this.radioList = {}
            },
        },
        computed: {
        },
        watch: {
        },
    }
</script>
<style scoped lang="less">
    .el-upload__tip {
        line-height: 1.2;
    }
    .pic-main-page {
        overflow-y: auto;
        height: 90%;
        width:100%;
        background:#eee;
    }

    .target-card {
        width: auto;
        padding: 5%;
        // padding-bottom: 10%;
        margin-bottom: 5%;
        background: rgba(255, 255, 255, 1);
        p{
            margin-top: 0;
        }
        .pic-box {
            display: flex;
            justify-content: space-between
        }
        .target-name {
            margin: 5% 0;         
            color: rgba(44, 104, 255, 1);
            font-family: PingFang SC;
            font-weight: 500;
            font-size: 15px;
            
        }
        .target-radio-title {
                margin: 3% 0;
                align-items: center;
                color: rgba(132, 141, 150, 1);
                font-family: PingFang SC;
                font-weight: 500;
                font-size: 15px;
                
        }
        .target-radio-label {
                color: rgba(30, 34, 45, 1);
                font-family: PingFang SC;
                font-size: 14px;
        }
        
        .simpling-pic-schemename {
            color: rgba(30, 34, 45, 1);
            /* font-family: PingFang SC; */
            font-weight: 500;
            font-size: 0.453rem;

            .flag-title {
                width: 1px;
                height: 20px;
                color: rgba(44, 104, 255, 1);
            }
        }

        .simple-name {
            color: rgba(132, 141, 150, 1);
            // font-family: PingFang SC;
            font-weight: 500;
            font-size: 0.4rem;
        }

        .text-box {
            border-radius: 4px;
            border: 0.027rem solid rgba(0, 0, 0, 0.04);
            box-sizing: border-box;
            background: rgba(255, 255, 255, 0);
            // border:0.5px solid;
        }
    }

    .pic-footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        line-height: 2rem;
        padding-bottom:5%; 
        text-align: center;
        background: rgba(255, 255, 255, 1);
        .pic-submit-button {
            width: 40%;
            height: 1rem;
            border-radius: 63px;
            background: rgba(44, 104, 255, 1);
            color: rgba(255, 255, 255, 1);
            font-family: PingFang SC;
            font-weight: 500;
            // font-size: 0.438rem;

        }
        .pic-reset-button {
            width: 40%;
            height: 1rem;
            border-radius: 63px;
            border: 1.5px solid rgba(44, 104, 255, 1);
            box-sizing: border-box;
            color: rgba(44, 104, 255, 1);
            font-family: PingFang SC;
            font-weight: 500;
            // font-size: 0.438rem;
        }
        
    }
</style>
</style>