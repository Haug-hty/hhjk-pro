<!-- 照片上传页面-->

<template>
    <el-card style="height: 99%;overflow: auto;">
        <h2>计算属性照片上传</h2>
        <hr>
        <el-form ref="picPhoneForm" :model="picPhoneForm" size="mini" label-width="120px" label-position="top">
            <el-form-item label="图片上传" prop="field103">
                <el-upload ref="field103" action="" list-type="picture-card" accept="image/*" :limit="1"
                    :http-request="upload">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="河段信息选择" prop="reachId">
                <el-select v-model="picPhoneForm.reachId" placeholder="请选择河段河段信息" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in reachIdOptions" :key="index" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="指标项细则选择：">
                <div v-for="(item,index) in factorList" style="width:100%">
                    <div :label="item.factor" :value="item.factor" :key="item.factor">
                        {{item.factor}}：
                        <el-radio-group v-model="radioList[index]">
                            <template v-for="(perm) in extentList">
                                <span v-if="perm.factor === item.factor" style="margin-left: 15px;margin-right:0px">
                                    <el-radio :label="perm.id">{{perm.extent}}</el-radio>
                                </span>

                            </template>
                        </el-radio-group>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="备注" prop="comments">
                <el-input v-model="picPhoneForm.comments" placeholder="填写备注信息"></el-input>
            </el-form-item>

            <el-form-item size="large">
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>




        </el-form>

    </el-card>
</template>
<script>
    import { target_score_detile, reach_info_list, pic_data_submit } from "@/api/picPhone/index"
    import { uploadFileRequest } from '@/api/file/index'
    export default {
        name: 'picPhoneTarget',
        props: {

        },
        data() {
            return {
                schemeId: this.$route.params.schemeId,
                schemeName: this.$route.params.schemeName,
                guidelinesId: this.$route.params.guidelinesId,
                rlType: this.$route.params.rlType,
                picPhoneForm: {
                    field103: null,
                    picType: undefined,
                    reachId: undefined,
                },
                reachIdOptions: [],
                scoreList: [],
                factorList: [],//指标小分类列表：四乱/水土流失/塌岸等
                extentList: [],//明细分类列表：轻度/中度/严重等
                radioList: {
                },//图片的绑定属性
                fileUrl: '',//图片地址
                picList: []

            }

        },
        created() {
            this.reachOptionsQuery()

        },
        mounted() {
            this.targetScoreSence()
        },
        methods: {
            //河段信息列表
            reachOptionsQuery() {
                reach_info_list(this.schemeId)
                    .then(res => {
                        this.reachIdOptions = res.data.data
                    }).catch(err => {
                        console.log(err)
                    })

            },
            //获取填写指标项的详细内容
            targetScoreSence() {
                // let scoreList=[],
                let guidelinesTargetScoreId = null;
                let factor = "";
                let extent = "";
                let params = {
                    guidelinesId: this.guidelinesId,
                    rlType: this.rlType
                }
                target_score_detile(params)
                    .then(res => {
                        console.log(res)
                        this.scoreList = res.data.data
                        res.data.data.forEach(item => {

                            if (item.factor == factor) {
                            } else {
                                this.factorList.push({ "factor": item.factor, "scoreId": item.guidelinesTargetScoreId })
                                factor = item.factor
                            }
                            if (item.extent === extent) {
                            } else {
                                this.extentList.push({ "extent": item.extent, "id": item.id, "factor": item.factor, "scoreId": item.guidelinesTargetScoreId })
                                extent = item.extent
                            }
                        });
                    }).catch(err => {
                        console.log(err)
                    })

            },
            //上传图片
            upload(file) {
                const loading = this.$loading({
                    lock: true,
                    text: "图片上传中...",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)",
                });
                var form = new FormData();
                form.append("file", file.file);
                form.append("srcType",7)
                uploadFileRequest(form)
                    .then((res) => {
                        // console.log(res, "文件上传成功");
                        loading.close();
                        this.fileUrl = res.data.data.fileCode

                    })
                    .catch(err => {
                        // loading.close()
                        console.log(err)
                        this.$message("上传失败！")
                    })
            },
            submitForm() {
                this.$refs['picPhoneForm'].validate(valid => {
                    if (!valid) return
                    // TODO 提交表单
                    let resdata = JSON.parse(JSON.stringify(this.radioList));
                    this.picList = []
                    // let resdata=JSON.parse(JSON.stringify(that.radioList));
                    // console.log(resdata[0]);
                    for (let i = 0; i < this.factorList.length; i++) {
                        if (resdata[i]) {
                            this.scoreList.forEach(radio => {
                                if (resdata[i] == radio.id) {
                                    let picVo = {
                                        assessSchemeId: this.schemeId,
                                        fileCode: this.fileUrl,
                                        reachId: this.picPhoneForm.reachId,
                                        comments: this.picPhoneForm.comments,
                                        guidelinesTargetScoreId: radio.guidelinesTargetScoreId,
                                        guidelinesTargetScoreSenceId: radio.id
                                    }
                                    console.log(picVo)
                                    this.picList.push(picVo)

                                }
                            })
                        }

                    }
                    console.log(this.picList)
                    pic_data_submit(this.picList)
                        .then((res) => {
                            this.$message("上传成功！")
                            this.$router.push({
                                name: 'picPhone'
                            })
                        }).catch(err=>{
                            console.log(err)
                        })

                })
            },
            resetForm() {
                // this.$refs['picPhoneForm'].resetFields()
                this.radioList = {}
            },
        },
        computed: {
        },
        watch: {
        },
    }
</script>
<style>
    .el-upload__tip {
        line-height: 1.2;
    }
</style>