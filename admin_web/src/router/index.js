import Vue from 'vue'
import Router from 'vue-router'
import LuffyHeader from '@/components/Common/LuffyHeader'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'login'
    },

    {
      path: '/login',
      component: () => import('@/pages/login.vue'),
    },
    {
      path: '/NotFound',
      component: () => import('@/pages/error/404'),
      hidden: true
    },
    {
      path: '/401',
      component: () => import('@/pages/error/401'),
      hidden: true
    },
    {
      path: '/index',
      redirect:'biaozhunku'
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/pages/test')
    },
    {
      path: '',
      component: LuffyHeader,
      children: [
        //标准库管理
    // {
    //   path: '/standardLibraryPage',
    //   name: 'standardLibraryPage',
    //   component: () => import('@/pages/standardLibrary/standardLibraryPage'),
    //   children: [
        //标准规范库
        {
          path: 'biaozhunku',
          name: 'biaozhunku',
          component: () => import('@/pages/standardLibrary/biaozhunku'),
          meta:{
            title:'标准规范',
            // hideclose:true
          }
        },
        //指标体系查询
        {
          path: 'zbtx',
          name: 'zbtx',
          component: () => import('@/pages/standardLibrary/zbtx'),
          meta:{
            title:'指标体系',
          }
        },
        //指标体系内容编辑
        {
          path: 'objectEdit',
          name: 'objectEdit',
          component: () => import('@/pages/standardLibrary/objectEdit'),
          meta:{
            title:'指标体系内容',
          }
        },


        
        //河湖总体评价
        // {
        //   path: 'hhztpj',
        //   name: 'hhztpj',
        //   component: () => import('@/pages/standardLibrary/hhztpj'),
        //   meta:{
        //     title:'河湖总体评价',
        //   }
        // },
        //指标赋分评价
        {
          path: 'zbpj',
          name: 'zbpj',
          component: () => import('@/pages/standardLibrary/zbpj'),
          meta:{
            title:'指标赋分',
          }
        },
        //现场勘看赋分页面
        {
          path: 'picPoint',
          name: 'picPoint',
          component: () => import('@/pages/standardLibrary/picPoint'),
          meta:{
            title:'现场勘看',
          }
        },
        //全域对象信息管理页面
        {
          path: 'rlCompleteInfo',
          name: 'rlCompleteInfo',
          component: () => import('@/pages/standardLibrary/rlCompleteInfo'),
          meta:{
            title:'对象信息管理',
          }
        },
    //   ]

    // },
    //指标体系管理
    // {
    //   path: '/healthManage',
    //   name: 'healthManage',
    //   component: () => import('@/pages/healthManage/indicatorsManagePage'),
    //   children: [
        //治理建议库
        {
          path: 'suggestion',
          name: 'suggestion',
          component: () => import('@/pages/healthManage/suggestion'),
          meta:{
            title:'治理建议库',
          }
        },
        //科研成果库
        {
          path: 'keyan',
          name: 'keyan',
          component: () => import('@/pages/healthManage/keyan'),
          meta:{
            title:'科研成果库',
          }
        },
        //文本资料库
        {
          path: 'material',
          name: 'material',
          component: () => import('@/pages/healthManage/knowledge'),
          meta:{
            title:'文本资料库',
          }
        },
    //   ]
    // },
    //系统管理
    // {
    //   path: '/system',
    //   name: 'system',
    //   component: () => import('@/pages/system/index'),
    //   children: [
        //组织机构管理
        {
          path: 'organization',
          name: 'organization',
          component: () => import('@/pages/system/organization'),
          meta:{
            title:'组织机构管理',
          }
        },
        //小组管理
        {
          path: 'team',
          name: 'team',
          component: () => import('@/pages/system/team'),
          meta:{
            title:'小组管理',
          }
        },
        //用户管理
        {
          path: 'user',
          name: 'user',
          component: () => import('@/pages/system/user'),
          meta:{
            title:'用户管理',
          }
        },
        //角色管理
        {
          path: 'role',
          name: 'role',
          component: () => import('@/pages/system/role'),
          meta:{
            title:'角色管理',
          }
        },
        //机构用户管理
        {
          path: 'userOrg',
          name: 'userOrg',
          component: () => import('@/pages/system/userOrg'),
          meta:{
            title:'组织用户',
          }
        },
      // ]
    // },

      ]
    },
    {
      path: '/user',
      component: LuffyHeader,
      hidden: true,
      // redirect: 'noredirect',
      children: [
        {
          path: 'profile',
          component: () => import('@/pages/system/user/profile/index'),
          name: 'Profile',
          meta: { title: '个人中心', icon: 'user' }
        }
      ]
    },
    

  ]
})
