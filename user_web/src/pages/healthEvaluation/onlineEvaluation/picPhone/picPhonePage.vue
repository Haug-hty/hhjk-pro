<!-- 照片上传页面-->

<template>
    <el-card style="height: 99%;">
        <h2>现场采样佐证照片上传</h2>
        <hr>
        <el-form ref="picPhoneForm" :model="picPhoneForm" size="mini" label-width="120px" label-position="top">
            <el-form-item label="图片上传">
                <el-upload multiple action="" :before-upload="beforeUpload" list-type="picture-card" accept="image/*"
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
            <el-form-item label="备注" prop="comments">
                <el-input v-model="picPhoneForm.comments" placeholder="填写备注信息"></el-input>
            </el-form-item>

            <el-form-item size="large">
                <el-button type="primary" @click="submitForm">提交</el-button>
            </el-form-item>
        </el-form>

    </el-card>
</template>
<script>
    import { reach_info_list, pic_zj_submit } from "@/api/picPhone/index"
    import { uploadFileRequest } from '@/api/file/index'
    export default {
        name: 'picPhonePage',
        props: {

        },
        data() {
            return {
                schemeId: this.$route.params.schemeId,
                schemeName: this.$route.params.schemeName,
                picPhoneForm: {
                    fileUrls: [],
                    reachId: undefined,
                    comments:"",
                },
                reachIdOptions: [],

            }

        },
        created() {
            this.reachOptionsQuery()
        },
        methods: {
            reachOptionsQuery() {
                reach_info_list(this.schemeId)
                    .then(res => {
                        console.log(res)
                        this.reachIdOptions = res.data.data
                    }).catch(err => {
                        console.log(err)
                    })


            },
            submitForm() {
                this.$refs['picPhoneForm'].validate(valid => {
                    if (valid) {
                        let params = {
                            assessSchemeId: this.schemeId,
                            busType:2,
                        }
                        Object.assign(params, this.picPhoneForm)
                        pic_zj_submit(params)
                            .then(res => {
                                console.log(res)
                                this.$message("上传成功！")
                                this.picPhoneForm.fileUrls=[]
                                this.$router.push({
                                    name: 'picPhone'
                                })
                            }).catch(err => {
                                console.log(err)
                            })
                    }
                    // TODO 提交表单
                })
            },
            resetForm() {
                this.$refs['picPhoneForm'].resetFields()
            },
            // 图片上传前验证
            beforeUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 50
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 50MB!')
                }
                return isLt2M
            },
            // 
            upload(file) {
                const loading = this.$loading({
                    lock: true,
                    text: "文件上传中...",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)",
                });
                var form = new FormData();
                form.append("file", file.file);
                form.append("srcType",8)
                console.log(form)
                uploadFileRequest(form)
                    .then((res) => {
                        console.log(res, "文件上传成功");
                        loading.close();
                        this.picPhoneForm.fileUrls.push(res.data.data.fileCode)

                    })
                    .catch(err => {
                        // loading.close()
                        console.log(err)
                        this.$message("上传失败！")
                    })
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