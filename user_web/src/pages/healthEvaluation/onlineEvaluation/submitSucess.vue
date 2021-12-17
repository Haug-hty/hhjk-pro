<template>
    <div class="success-submit">
        <div class="header-pic">
            <img style="width:100%" src="../../../assets/header-questionnaire.png" alt="">
        </div>
        <!-- <div class="zz"> -->
            <div class="content-box">
                <img src="../../../assets/icon_success.png" alt="">
                        <!-- <el-icon ></el-icon> -->
                    <p>您的问卷已提交</p>
                    <p>感谢您的参与</p>
                </div>
        <!-- </div> -->
        
    </div>
</template>
<script>
export default {
    name:'submitSucess',
    data(){
        return {
            flag:true
        }
    }
    
}
</script>
<style lang="less" scoped>
.success-submit {
    background: linear-gradient(140.03deg, rgba(50, 68, 253, 1) 9.61%, rgba(48, 68, 253, 1) 95.05%);

    .header-pic {
        z-index: -222;
        height: 300px;
    }
    &:after{
	    content: "";
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    filter: blur(1px);
	    background-color: rgba(116, 175, 255, 0.25);
	    z-index: -1;
	  }
    .content-box {
        opacity: 1;
        z-index: 10;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%, -50%);
        width: 250px;
        height: 18vh;
        border-radius: 16px;
        background: rgba(255, 255, 255, 1);
        padding: 5vh 0;
        text-align: center;
        color: rgba(35, 47, 74, 1);
        font-family: Microsoft YaHei;
        font-size: 20px;
        line-height: 160.000002%;
    }
    
}


</style>

