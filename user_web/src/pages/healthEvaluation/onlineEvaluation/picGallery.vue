<!-- 照片库查看页面 -->

<template>
    <div>
        <!-- <el-image v-for="(url,index) in urls" :key="index" :src="url" style="width: 200px;height: 200px;margin: 8px;"
            :preview-src-list="urls ">
        </el-image> -->
        <div v-for="(item,index) in urls" style="margin-left: 20px;">
            <el-col :span="4">
                <img :src="item.fileCode" alt="" style="width: 150px;height: 150px;margin: 8px;"
                    @click="preview(item.fileUrl)">
                <p v-if="item.guidelinesTargetScoreSenceVo">
                    {{item.guidelinesTargetScoreSenceVo.factor}}--{{item.guidelinesTargetScoreSenceVo.extent}}</p>
                <p v-else>{{item.reachInfoVo.name}}</p>
                <el-button style="margin:8px;color: #f40;" type="text" @click="del(item)">删除</el-button>

            </el-col>

        </div>
        <el-button @click="picUpload">上传照片</el-button>
    </div>
</template>
<script>
    import { schemePic, picDel } from "@/api/scheme/index";
    export default {
        name: 'picGallery',
        data() {
            return {
                assessScheme: this.$route.query.schemeId,//方案id
                guidelinesTargetScore: this.$route.query.scoreId, //方案名称
                urls: [],
            }
        },
        props: {},
        mounted() {
            this.getPicGallery()
        },
        methods: {
            getPicGallery() {//评价方案照片库信息获取
                let param = {
                    assessSchemeId: this.assessScheme,
                    guidelinesTargetScoreId: this.guidelinesTargetScore
                }
                schemePic(param)
                    .then(res => {
                        if (res.data.data.length !== 0) {
                            // res.data.data.forEach(item => {
                            //     this.urls.push(item.fileUrl)
                            // });
                            this.urls = res.data.data
                        } else {
                            this.$message("此类指标暂时没有现场拍照的图片！")
                        }

                    })
            },
            preview(info) {//图片预览
                window.open(info)
            },
            del(info) {
                this.$confirm('确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    picDel(info.id)
                        .then(() => {
                            this.$message({
                                message: "删除成功",
                                type: 'success'
                            })
                            this.getPicGallery()
                        })

                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '已取消删除'
                    });
                });
            },
            picUpload(){
                this.$router.push({
                    name:'picPhone'
                })
            }
        }
    }
</script>
<style></style>