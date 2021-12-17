<!-- 属性内容转换组件，将多个数据转化为：["vaule1","vaule2"]形式 -->

<template>
    <div>
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px">
            <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'参数内容' + index" :key="domain.key"
                :prop="'domains.' + index + '.value'">
                <el-input v-model="domain.value" style="width:80%;"></el-input>
                <el-button type="danger" @click.prevent="removeDomain(domain)">删除</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="info" @click="addDomain">新增内容</el-button>
            </el-form-item>
        </el-form>

    </div>


</template>

<script>
    export default {
        name: 'textTrs',
        data() {
            return {
                dynamicValidateForm: {
                    domains: [],
                },
                data: '',
                dataArr: [],
                dataTrsInfo: this.dataTrs

            };
        },
        props: { dataTrs: String },
        mounted() {
            this.setData()
        },
        methods: {
            setData() {
                if (this.dataTrsInfo) {                    
                    var jsonObj = JSON.parse(this.dataTrsInfo)
                    for (let i = 0; i < jsonObj.length; i++) {
                        let param = {
                            value: jsonObj[i]
                        }
                        this.dynamicValidateForm.domains.push(param)
                    }
                } else {
                    this.dynamicValidateForm.domains.push({value:''})
                }


            },
            submitForm(formName) {
                this.data = ''
                this.dataArr = []
                this.dynamicValidateForm.domains.forEach(item => {
                    // this.data = this.data + ',"' + item.value + '"'
                    this.dataArr.push(item.value)

                });
                // this.data = "[" + this.data.slice(1) + "]"
                this.data = JSON.stringify(this.dataArr);
                // this.dynamicValidateForm.domains = []
                return this.data
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item)
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
                }
            },
            addDomain() {
                this.dynamicValidateForm.domains.push({
                    value: '',
                    key: Date.now()
                });
            }
        },
        watch: {
            dataTrs1: {
                handler: function () {
                    alert(this.dataTrs1)
                },
            },
        }
    }
</script>