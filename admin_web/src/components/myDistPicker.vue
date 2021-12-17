<template>
    <div>
        <v-distpicker ref="dist" :province="select.province" :city="select.city" :area="select.area"
            @selected="regionSelect">
        </v-distpicker>
    </div>
</template>
<script>
    /* 地区调用组件
    *
    * 地区组件：引用 v-distpicker 组件
    * 使用时页面调用 myDistPicker 组件，初始化方法调用组件的 getAreaCode 方法，传入 area 的code
    * 获取选取城市的 code 值，this.$refs.distPick.region.area（父调用子组件的值即可）
    * 
    * <myDistPicker ref="distPick" @selected="getAreaCode"></myDistPicker>
    * 
    * this.$refs.distPick.region.area === "" || this.$refs.distPick.region.area===undefined 判定是否选择了市/区（需要全部选择）
    * 
    * if(this.$refs.distPick.region.area === "" || this.$refs.distPick.region.area===undefined){
                    this.$message("请选择市/区级行政！")
                }
    * 
*/
    export default {
        name: 'myDistPicker',
        data() {
            return {
                select: { province: null, city: null, area: null },
                region: {
                    province: "",
                    city: "",
                    area: "",
                },
            }
        },
        prop: {},
        methods: {
            //根据传值反显
            setAreaCode(code) {
                let province = parseInt(code / 10000) * 10000
                let city = parseInt(code / 100) * 100
                let area = code
                this.select.province = this.$refs.dist.districts[100000][province];
                this.select.city = this.$refs.dist.districts[province][city];
                this.select.area = this.$refs.dist.districts[city][area];

            },
            //地区选择方法
            regionSelect(data) {
                this.region.province = data.province.code
                this.region.city = data.city.code
                this.region.area = data.area.code
                return this.region.area
            },
        },
    }
</script>