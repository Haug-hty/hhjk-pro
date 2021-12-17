<!-- 照片上传页面-->

<template>
  <div class="pic-main-page">
    <!-- <div class="nav-title">
      <common-header tittle="照片上传" :showmore="true"></common-header>
    </div> -->
    <div>
      <div class="detile-title">
        <span>
          *注：该页面上传的照片只是为了给某些指标项提供现场照片，不同于采样照片以及“四乱”等需要扣分项，直接参与指标评分计算，
          只是做一些现场照片的保存，提供在方案的照片资料库中
        </span>
      </div>

      <div class="target-card">
        <p class="simpling-pic-schemename">
          <span class="flag-title">丨</span>
          {{schemeName}}
        </p>
        <van-uploader
          :before-read="beforeRead"
          accept="image/*"
          v-model="picList"
          :after-read="afterRead"
          :before-delete="beforeDel"
          multiple
        />
      </div>
      <div class="target-card">
        <p class="simpling-pic-schemename">
          <span class="flag-title">丨</span>
          {{schemeName}}
        </p>
        <p class="simple-name">具体河段</p>
        <van-cell-group class="text-box">
          <van-field
            readonly
            clickable
            name="picker"
            :value="reach"
            placeholder="选择河段"
            right-icon="arrow-down"
            @click="showPicker = true"
          />
        </van-cell-group>
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
      </div>
      <div class="target-card">
        <p class="simpling-pic-schemename">
          <span class="flag-title">丨</span>
          {{schemeName}}
        </p>
        <p class="simple-name">具体指标项</p>
        <van-cell-group class="text-box">
          <van-field
            readonly
            clickable
            name="picker1"
            :value="target"
            placeholder="选择指标项"
            right-icon="arrow-down"
            @click="showPicker2 = true"
          />
        </van-cell-group>
        <van-popup v-model="showPicker2" position="bottom">
          <van-picker
            show-toolbar
            :columns="columnsTarget"
            @confirm="onConfirmTarget"
            @cancel="showPicker2 = false"
          />
        </van-popup>
      </div>
      <div class="target-card">
        <p class="simpling-pic-schemename">
          <span class="flag-title">丨</span>
          {{schemeName}}
        </p>
        <van-cell-group class="text-box">
          <van-field
            v-model="comments"
            rows="2"
            autosize
            type="textarea"
            maxlength="100"
            placeholder="请输入备注信息"
            show-word-limit
          />
        </van-cell-group>
      </div>
    </div>
    <div class="pic-footer">
      <van-button class="pic-reset-button" @click="reset">重置</van-button>
      <van-button class="pic-submit-button" @click="confirmPicInfo">提交</van-button>
    </div>
  </div>
</template>
<script>
import {
  reach_info_list,
  pic_zj_submit,
  uploadFileRequest,
  scheme_data_serach
} from "@/api/scheme.js";
import commonHeader from "common/common-header";
import { Toast } from "mint-ui";
export default {
  name: "picOther",
  props: {},
  components: {
    commonHeader
  },
  data() {
    return {
      schemeId: this.$route.params.schemeId,
      schemeName: this.$route.params.schemeName,
      picPhoneForm: {
        fileUrl: "",
        reachId: undefined,
        targetId: undefined
      },
      targetOption: [],
      reachIdOptions: [],
      comments: "",
      showPicker: false,
      showPicker2: false,
      columns: [],
      columnsTarget: [],
      reachId: undefined,
      reach: "",
      targetId: undefined,
      target: "",
      picList: [],
      picUrlList: []
    };
  },
  created() {
    this.reachOptionsQuery();
    this.getSchemeTargetList();
  },
  methods: {
    getSchemeTargetList() {
      //查询评估方案对应的指标填报数据列表信息
      let params = {
        id: this.schemeId
      };
      scheme_data_serach(params).then(res => {
        console.log("===", res.data.data);
        if (res.data.data == [] || res.data.data[0] == null) {
          this.targetOption = [];
        } else {
          this.columnsTarget = [];
          this.targetOption = res.data.data;
          this.targetOption.forEach(item => {
            let param = {
              text: item.guidelinesTargetName,
              id: item.guidelinesTargetId
            };
            this.columnsTarget.push(param);
          });
        }
      });
    },
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
    /** 河段信息选择下拉选 */
    onConfirm(value, index) {
      this.reach = value.text;
      this.reachId = value.id;
      this.showPicker = false;
    },
    /** 指标项选择下拉选 */
    onConfirmTarget(value, index) {
      this.target = value.text;
      this.targetId = value.id;
      this.showPicker2 = false;
    },
    /** 文件上传之后的回调函数（上传文件和文件数组） */
    afterRead(file) {
      // 判定是一张还是多张同时上传
      if (file instanceof Array) {
        file.forEach(item => {
          item.status = "uploading";
          item.message = "上传中...";
          var form = new FormData();
          form.append("file", item.file);
          form.append("srcType",8)
          uploadFileRequest(form)
            .then(res => {
              console.log(res);
              item.status = "done";
              item.message = "上传成功";
              this.picUrlList.push(res.data.data.fileCode);
            })
            .catch(err => {
              item.status = "failed";
              item.message = "上传失败";
            });
        });
      } else {
        file.status = "uploading";
        file.message = "上传中...";
        var form = new FormData();
        form.append("file", file.file);
        uploadFileRequest(form)
          .then(res => {
            console.log(res);
            file.status = "done";
            file.message = "上传成功";
            this.picUrlList.push(res.data.data.fileCode);
          })
          .catch(err => {
            file.status = "failed";
            file.message = "上传失败";
          });
      }
    },
    /** 图片上传前验证 */
    beforeRead(file) {
      let isLt2M;
      if (file instanceof Array) {
        file.forEach(item => {
          isLt2M = item.size / 1024 / 1024 < 50;
          if (!isLt2M) {
            Toast("上传文件大小不能超过 50MB!");
            return false;
          }
        });
      } else {
        isLt2M = file.size / 1024 / 1024 < 50;
        if (!isLt2M) {
          Toast("上传文件大小不能超过 50MB!");
          return false;
        }
      }

      return true;
    },
    /** 删除回调 */
    beforeDel(file, detail) {
      let picListLength = 0;
      for (let i = 0; i < this.picList.length; i++) {
        if (this.picList[i].status) {
          if (this.picList[i].status == "done") {
            picListLength = i;
            break;
          }
        }
      }
      if (file.status) {
        if (file.status == "done") {
          this.picUrlList.splice(detail.index - picListLength, 1);
          return true;
        } else {
          return true;
        }
      } else {
        Toast("只能删除本次上传的照片");
      }
    },
    /** reset重置请求 */
    reset() {
      this.comments = "";
      this.reachId = undefined;
      this.reach = "";
      this.targetId = undefined;
      this.target = "";
    },
    /** 采样照片信息提交功能 */
    confirmPicInfo() {
      let param = {
        comments: this.comments,
        assessSchemeId: this.schemeId,
        reachId: this.reachId,
        guidelinesTargetId: this.targetId,
        fileUrls: this.picUrlList,
        busType: 3
      };
      pic_zj_submit(param).then(res => {
        Toast({
          message: "上传成功！"
          // iconClass: 'icon icon-success'
        });
        this.$router.push({
          name: "tabList",
          query: {
            id: this.schemeId,
            activeName: "other"
          }
        });
      });
    }
  },
  computed: {},
  watch: {}
};
</script>
<style lang="less" scoped>
.pic-main-page {
  overflow-y: auto;
  height: 90%;
  width: 100%;
  background: #eee;

  .nav-title {
    height: 6vh;
  }
  .detile-title {
    padding: 2% 5%;
    color: coral;
  }
}

.target-card {
  width: auto;
  padding: 5%;
  margin-bottom: 5%;
  background: rgba(255, 255, 255, 1);

  p {
    margin-top: 0;
  }

  .pic-box {
    display: flex;
    justify-content: space-between;
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
  padding-bottom: 5%;
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