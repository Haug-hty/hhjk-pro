<!-- 问卷调查页面 -->

<template>
    <div class="image-page">
        <div class="header-pic">
            <img style="width:100%" src="../../../assets/header-questionnaire.png" alt="">
        </div>
        
        <div class="main-page">
            <div style="text-align: center;">
                <div class="my-title-lr"></div>
                <div class="my-title">{{this.questionnaireData.label}}</div>
                <div class="my-title-lr"></div>
            </div>
            <form id="questionnaire" style="padding: 10px;" label-width="120px" action="" method="post" enctype="multipart/form-data">

            </form>
            
        </div>
        <div class="footer-pic">
            <img class="footer-img" src="../../../assets/footer_1.png" alt="">
            <img class="footer-img"  src="../../../assets/footer_2.png" alt="">
        </div>
    </div>

</template>
<script>
    import "../../js/jquery-1.9.1.js"
    import { getQuestionnaire } from "@/api/questionnaire/index";
    import { netAddress } from '../../../global.js';  
    const BASE_URL = netAddress
    export default {
        name: "questionnaire",
        data() {
            return {
                questionnaireToken: this.$route.query.questionnaireToken,
                // formData:'',
                questionnaireData: {},
                strHtml: "", //表格生成行
                strHtmlTotal: "", //表格生成最终html代码块
                formdata: {},
                arrSort: [],
                array : [],
            };
        },
        props: {},
        mounted() {
            this.getToken();
        },
        methods: {
            /** 获取调查问卷xml信息数据*/
            getToken() {
                // console.log(this.$route.query.questionnaireToken);
                // console.log(window.location.href)
                getQuestionnaire(this.$route.query.questionnaireToken).then(res => {
                    // console.log(res);
                    this.questionnaireData = res.data.data;
                    this.questionnaireDataInner();
                });
                // 调查问卷内容提交

                let url = window.location.origin +`${BASE_URL}/admin/questionnaire/add/` + this.questionnaireToken
                console.log(url)
                document.getElementById('questionnaire').action = url
            },

            /** 问卷表单信息渲染 */
            questionnaireDataInner() {
                let _this = this;
                let result = this.questionnaireData;
                this.strHtml = "";
                this.strHtmlTotal = "";
                this.arrSort = []
                this.getBlockList(result)
                this.getodelist(this.arrSort.sort(this.compare('orderNum')));
                // console.log(this.strHtmlTotal);
                this.strHtmlTotal += '<div class="button-div"><input type="button" id="submitButton" value="提交调查问卷"></input></div>'
                document.getElementById("questionnaire").innerHTML = this.strHtmlTotal;
                // console.log(document.getElementById('questionnaire'))
                $("#submitButton").click(function () {
                    _this.questionnaireSubmit()
                });

            },
            /** 表单填报问题获取递归算法 */
            getBlockList(info) {

                if (info.nodeList) {
                    info.nodeList.forEach(item => {
                        this.arrSort.push(item)
                    });
                }
                if (info.blockList) {
                    for (let i = 0; i < info.blockList.length; i++) {
                        this.getBlockList(info.blockList[i])
                    }
                    return

                }
            },
            compare(property) {
                return function (a, b) {
                    var value1 = a[property];
                    var value2 = b[property];
                    return value1 - value2;
                }
            },
            /**问题表单项渲染实现 */
            getodelist(info) {
                for (let i = 0; i < info.length; i++) {
                    if (info[i].nodeList == undefined || info[i].nodeList == null) {
                        if (info[i].type == "radio") {
                            this.strHtml += "<div class='my-element'>";
                            this.strHtml += "<div class='my-index'>" + (i - 1) + "</div><p class='my-qus'>" + info[i].label + "：</p>";
                            for (let j = 0; j < info[i].propList.length; j++) {
                                this.strHtml +=
                                    '<div class="my-attr"><label><input type="radio" required name="' +
                                    info[i].name +
                                    '" value="' +
                                    info[i].propList[j].code +
                                    '"  />' +
                                    info[i].propList[j].label +
                                    '</label></div>';
                            }
                            this.strHtml += "</div>";
                            this.strHtmlTotal += this.strHtml;
                            this.strHtml = "";
                        } else if (info[i].type == "text") {
                            this.strHtml += "<div class='my-element' >";
                            this.strHtml += "<div class='my-index'>" + (i - 1) + "</div><p class='my-qus'>" + info[i].label + "：</p>";
                            this.strHtml += '<input class="my-attr" type="text" name="' + info[i].name + '" />';
                            this.strHtml += "</div>";
                            this.strHtmlTotal += this.strHtml;
                            this.strHtml = "";
                        }
                    }
                }
            },
            /** 表单必填项属性校验 */
            check(){
                let _this = this
                for (let i = 0; i < this.array.length; i++) {
                        if ($("input[name='" + this.array[i] + "']:checked").length == 1) {
                                // alert(this.array[i] + "校验成功!");
                        } else {
                            const activeElement = $("input[name='" + this.array[i] + "']").first().parents(".my-element");
                            var offset = $(activeElement).offset();
                            activeElement.addClass("active-cls")
                            $('body,html').animate({
                                    scrollTop:offset.top+"px",
                            }, 1000, function () {
                                setTimeout(() => {
                                    activeElement.removeClass("active-cls")
                                }, 2000);
                                
                            });
                            return;
                        }
                }
                $.ajax({
                    async: false,
                    type: 'post',
                    url: window.location.origin + `${BASE_URL}/admin/questionnaire/add/` + this.questionnaireToken,
                    dataType: 'json',
                    data: $('#questionnaire').serialize(),
                    success: function (res) {
                        _this.$router.push('/submit')
                    }
                })
                return false;
            },
            /** 表单提交 */
            questionnaireSubmit() {
                let _this = this
                $("input[type='radio']").each(function() {
                        if ($(this).attr("required") != undefined) {
                                var name = $(this).attr("name");
                                if (_this.array.indexOf(name) == -1) {
                                        _this.array.push(name);
                                }
                        }
                });
                this.check();
                        
                
            },
        }
    };
</script>
<style lang="less" scoped>
    .image-page {
        background: linear-gradient(140.03deg, rgba(50, 68, 253, 1) 9.61%, rgba(48, 68, 253, 1) 95.05%);
        
    }

    .header-pic {
        z-index: -222;
        height: 300px;
    }


    .main-page {
        margin-top: 300px;
        position: relative;
        margin: 0 15px;
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 1);


    }

    .my-title-lr {
        background-color: rgb(44, 104, 255);
        border-radius: 2.5px;
        width: 5px;
        height: 5px;
        display: inline-block;
    }

    .my-title {
        display: inline-block;
        font-weight: inherit;
        font-size: 20px;
        word-spacing: normal;
        color: rgb(44, 104, 255);
        margin-top: 50px;
        margin-bottom: 20px;
    }

    /deep/ .my-element {
        margin-top: 15px;
        margin-left: 6px;
        border: 1px solid #fff;
    }

    /deep/ .active-cls {
        border-color: #f40;
        animation: mymove 1s infinite ;
        animation-direction:alternate;
        // -webkit-animation:mymove 1s infinite;
        // -webkit-animation-direction:alternate;
        // -moz-animation:mymove 1s infinite;    
        // -ms-animation:mymove 1s infinite;    
        // -o-animation:mymove 1s infinite;
        // -moz-animation-direction:alternate;   
        // -ms-animation-direction:alternate;  
        // -o-animation-direction:alternate;
    }
    @keyframes mymove {
        from {border: 1px solid #fff;}
        to {border: 1px solid #f40;}
        
    }
    // @-webkit-keyframes mymove {
    //     0% {-webkit-border: 1px solid #fff;}
    //     100% {-webkit-border: 1px solid #f40;}
    // }
    // @-moz-keyframes mymove {
    //     0% {-moz-border: 1px solid #fff;}
    //     100% {-moz-border: 1px solid #f40;}
    // }
    // @-ms-keyframes mymove {
    //     0% {-ms-border: 1px solid #fff;}
    //     100% {-ms-border: 1px solid #f40;}
    // }
    // @-o-keyframes mymove {
    //     0% {-o-border: 1px solid #fff;}
    //     100% {-o-border: 1px solid #f40;}
    // }

    /deep/ .my-qus {
        margin-left: 10px;
        display: inline;
        font-size: 16px;
        font-weight: bold;
    }

    /deep/ .my-index {
        text-align: center;
        background-color: rgb(44, 104, 255);
        border-radius: 50px;
        width: 24px;
        height: 24px;
        display: inline-block;
        color: white;
    }

    /deep/ .my-attr {
        display: block;
        margin-left: 40px;
        margin-top: 10px;
    }

    /deep/ input[type="text"] {
        // top: 412px;
        // left: 64px;
        width: 80%;
        height: 40px;
        border-radius: 4px;
        border: 1px solid rgba(193, 199, 206, 1);
        box-sizing: border-box;
        background: rgba(255, 255, 255, 0);
        // margin-left: 40px;
    }

    /deep/ input[type="radio"] {
        width: 20px;
        height: 20px;
        margin-right: 4px;
        vertical-align: sub;
    }

    /deep/ input[type="button"] {
        background-color: rgb(0, 87, 255);
        border-radius: 20px;
        color: white;
        height: 40px;
        width: 200px;
        border: none;
        font-size: 16px;
        margin-top: 20px;
        margin-bottom: 20px;
        /* margin: 16px auto; */
    }

    /deep/ label {
        margin-top: 10px;
        display: block;
    }

    /deep/ .button-div {
        width: 100%;
        text-align: center;
    }

    /deep/ .footer-pic {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-top:-15% ;
        
        
    }

    /deep/ .footer-img {
         z-index: 1;
    }
</style>