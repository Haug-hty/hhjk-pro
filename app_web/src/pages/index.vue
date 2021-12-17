<template>
  <div>
    <div>
      <keep-alive>
        <router-view class="main-page" ></router-view>
      </keep-alive>
      
    </div>
    <div class="nav-footer">
        <footer>
          <router-link
            v-for="(item, index) in navList"
            :to="item.path"
            :key="index"
            v-bind:class="{'active':activeRoute == item.path}"
          >
            <div :class="'tab-'+index"></div>
            <p v-text="item.name"></p>
          </router-link>
        </footer>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          path: "/scheme",
          name: "照片"
        },
        {
          path: "/briefing",
          name: "评估"
        },
        {
          path: "/person",
          name: "我的"
        }
      ]
    };
  },
  computed: {
    activeRoute() {
      return this.$route.path;
    }
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.main-page {
  background: #f0f0f0;
}
.nav-footer {
  position: fixed;
  left: 0px;
  bottom: 0;
  width: 100%;
  // .h(98);
  height: 8%;
  background: @tab-general-bg-color;
  display: block;
  footer {
    font-size: 0;
    border-top: 1px solid #e7e7e7;
    border-bottom: 1px solid #f8f8f8;
    .pt(10);
    line-height: 1.2;
    width: 100%;
    // .h(98);
    height: 100%;
    display: flex;
    a {
      text-decoration: none;
      color: @base-font-color;
      -webkit-box-flex: 1;
      -moz-box-flex: 1;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      text-align: center;
      box-sizing: border-box;
      display: block;
      .fs(22);
      .tab-0,
      .tab-1,
      .tab-2,
      .tab-3 {
        display: inline-block;
        .h(42);
        .w(42);
        background-size: cover;
      }
      .tab-0 {
        background-image: url("../assets/imgs/index-noselect.svg");
      }
      .tab-1 {
        background-image: url("../assets/imgs/note-noselect.svg");
      }
      .tab-2 {
        background-image: url("../assets/imgs/print-noselect.svg");
      }
      .tab-3 {
        background-image: url("../assets/imgs/dy-noselect.svg");
      }
      &:hover {
        text-decoration: none;
      }
      &.router-link-active.active {
        .tab-0 {
          background-image: url("../assets/imgs/index-select.svg");
        }
        .tab-1 {
          background-image: url("../assets/imgs/note-select.svg");
        }
        .tab-2 {
          background-image: url("../assets/imgs/print-select.svg");
        }
        .tab-3 {
          background-image: url("../assets/imgs/dy-select.svg");
        }
      }
    }
    p {
      margin: 0;
    }
  }
}
</style>
