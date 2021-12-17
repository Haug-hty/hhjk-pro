<template>
    <div>
        <el-upload class="upload-demo" list-type="picture-card" ref="upload" action="''" :before-upload="beforeUpload"
            :auto-upload="true" :http-request="upload">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
        <!-- <input type="file" id="file" size="50" @change="upload" /> -->

    </div>

</template>
<script>
    import { uploadFileRequest } from '@/api/file/index'
    export default {
        name: 'fileUpload',
        data() {
            return {
                filePath: '',
            }
        },
        methods: {
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
                console.log(form)
                uploadFileRequest(form)
                    .then((res) => {
                        // console.log(res, "文件上传成功");
                        loading.close();
                        this.filePath = res.data.data.url

                    })
                    .catch(err => {
                        // loading.close()
                        console.log(err)
                        this.$message("上传失败！")
                    })
            },

            // upload() {

            //     var fileObj = document.getElementById("file").files; // js 获取文件对象
            //     console.log(fileObj)
            //     console.log(this.file)
            //     var form = new FormData();
            //     form.append("file", this.file);
            //     console.log(form)
            //     if (fileObj.length != 0) {
            //         var i = fileObj.length;
            //         this.counts = i;
            //         var that = this;
            //         for (var j = 0; j < i; j++) {
            //             (function (i) {
            //                 form.append("file", fileObj[i]); // 文件对象
            //             })(j);
            //         }
            //     }
            //     console.log(form)
            //     uploadFileRequest(form)
            //         .then((res) => {
            //             // console.log(res, "文件上传成功");
            //             // loading.close();
            //             this.filePath = res.data.data.url

            //         })
            //         .catch(err => {
            //             loading.close()
            //             console.log(err)
            //             this.$message("上传失败！")
            //         })
            // },
        }
    }
</script>