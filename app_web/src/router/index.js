import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 需要左方向动画的路由用this.$router.to('****')
Router.prototype.togo = function (path) {
  this.isleft = true
  this.isright = false
  this.push(path)
}
// 需要右方向动画的路由用this.$router.goRight('****')
Router.prototype.goRight = function (path) {
  this.isright = true
  this.isleft = false
  this.push(path)
}
// 需要返回按钮动画的路由用this.$router.goBack()，返回上一个路由
Router.prototype.goBack = function () {
  this.isright = true
  this.isleft = false
  this.go(-1)
}
// 点击浏览器返回按钮执行，此时不需要路由回退
Router.prototype.togoback = function () {
  this.isright = true
  this.isleft = false
}
// 点击浏览器前进按钮执行
Router.prototype.togoin = function () {
  this.isright = false
  this.isleft = true
}

export default new Router({
  // 服务器打包配置
  mode: "history",
  base:"/app",
  routes: [
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['@/pages/login'], resolve),
    },
    {
      path: '/',
      name: 'index',
      component: (resolve) => require(['@/pages/index'], resolve),
      redirect: '/login',
      children: [
        {
          path: '/scheme',
          name: 'scheme',
          component: (resolve) => require(['@/pages/index/scheme'], resolve),
          meta: {
            title: '照片上传'
          },
        },
        {
          path: '/person',
          name: 'person',
          component: (resolve) => require(['@/pages/index/person'], resolve),
          meta: {
            title: '个人中心'
          },
        },
        {
          path: 'briefing',
          name: 'briefing',
          component: (resolve) => require(['@/pages/index/briefing'], resolve),
          meta: {
            title: '评估'
          },
        },
        
        
      ]
    },
    /** tab列表页面 */
    {
      path: '/tabList',
      name: 'tabList',
      component: (resolve) => require(['@/pages/index/tabList'], resolve),
      meta: {
        title: '照片列表'
      },
    },
    {
      path: '/calculationPic',
      name: 'calculationPic',
      component: (resolve) => require(['@/pages/index/calculationPic'], resolve),
      meta: {
        title: '计算指标照片'
      },
    },
    /** 采样照片 */
    {
      path: '/samplingPic',
      name: 'samplingPic',
      component: (resolve) => require(['@/pages/index/samplingPic'], resolve),
      meta: {
        title: '采样照片'
      },
    },
    {
      path: '/otherPic',
      name: 'otherPic',
      component: (resolve) => require(['@/pages/index/otherPic'], resolve),
      meta: {
        title: '其他照片'
      },
    },
    {
      path: '/briefingPreparation',
      name: 'briefingPreparation',
      component: (resolve) => require(['@/pages/index/briefingPreparation'], resolve),
      meta: {
        title: '简报'
      },
    },
    {
      path: '/assessment',
      name: 'assessment',
      component: (resolve) => require(['@/pages/index/assessment'], resolve),
      meta: {
        title: '指标结果'
      },
    },
  ]
})
