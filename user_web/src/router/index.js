import Vue from 'vue'
import Router from 'vue-router'
import LuffyHeader from '@/components/Common/LuffyHeader'

Vue.use(Router)

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default new Router({
  routes: [

    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      component: () => import('@/pages/login.vue'),
      // hidden: true
    },
    {
      path: '/submit',
      component: () => import('@/pages/healthEvaluation/onlineEvaluation/submitSucess.vue'),
      hidden: true
    },
    {
      path: '',
      component: LuffyHeader,
      children: [
        {
          path: '/NotFound',
          component: () => import('@/pages/error/404'),
          hidden: true,
          meta:{
            title:'404',
            // hideclose:true,
            
          }
        },
        {
          path: '/401',
          component: () => import('@/pages/error/401'),
          hidden: true
        },
        
        //健康在线
        {
          path: '/map',
          component: () => import('@/pages/healthOnline/index'),
          meta:{
            title:'地图',
            // hideclose:true,
            
          }
        },
         //标准库管理
         {
          path: 'biaozhun',
          name: 'biaozhun',
          component: () => import('@/pages/healthManagement/healthIndex/biaozhun'),
          meta:{
            title:'标准库管理',
            
          }
        },
        //指标库管理
        {
          path: 'zhibiao',
          name: 'zhibiao',
          component: () => import('@/pages/healthManagement/healthIndex/zhibiao'),
          meta:{
            title:'指标库管理',
            
          }
        },
        //分级标准管理
        {
          path: 'fjbz',
          name: 'fjbz',
          component: () => import('@/pages/healthManagement/healthIndex/fjbz'),
          meta:{
            title:'分级标准管理',
            
          }
        },
        //权重赋值管理
        {
          path: 'weight',
          name: 'weight',
          component: () => import('@/pages/healthManagement/healthIndex/weight'),
          meta:{
            title:'权重赋值管理',
            
          }
        },
        //治理建议库
        {
          path: 'suggestion',
          name: 'suggestion',
          component: () => import('@/pages/healthManagement/suggestion'),
          meta:{
            title:'治理建议库',
            
          }
        },
        //科研成果库
        {
          path: 'achievements',
          name: 'achievements',
          component: () => import('@/pages/healthManagement/achievements'),
          meta:{
            title:'科研成果库',
            
          }
        },
        //任务管理
        {
          path: 'taskManagement',
          name: 'taskManagement',
          component: () => import('@/pages/healthEvaluation/onlineEvaluation/taskManagement'),
          meta:{
            title:'任务管理',
          }
        },
        //方案制定
        {
          path: 'planCreate',
          name: 'planCreate',
          component: () => import('@/pages/healthEvaluation/onlineEvaluation/planCreate'),
          meta:{
            title:'方案制定',
            
          }
        },
        //数据填报入口文件
        {
          path: 'dataEntry',
          name: 'dataEntry',
          component: () => import('@/pages/healthEvaluation/onlineEvaluation/dataEntry'),
          meta:{
            title:'数据填报入口',
            
          }
        },
        //数据填报页面
        {
          path: 'dataEntryIndex/:schemeId/:schemeName/:questionnaireToken',
          name: 'dataEntryIndex',
          component: () => import('@/pages/healthEvaluation/onlineEvaluation/dataEntryIndex'),
          meta:{
            title:'数据填报',
            
            
          }
        },
        //手机图片上传入口页面
        {
          path: 'picPhone',
          name: 'picPhone',
          component: () => import('@/pages/healthEvaluation/onlineEvaluation/picPhone/picPhone.vue'),
          meta:{
            title:'图片上传入口',
            
          }
        },
        //手机图片上传页面
        {
          path: 'picPhonePage',
          name: 'picPhonePage',
          component: () => import('@/pages/healthEvaluation/onlineEvaluation/picPhone/picPhonePage.vue'),
          meta:{
            title:'图片上传',
            
          }
        },
        //手机图片上传页面
        {
          path: 'picPhoneTarget',
          name: 'picPhoneTarget',
          component: () => import('@/pages/healthEvaluation/onlineEvaluation/picPhone/picPhoneTarget.vue'),
          meta:{
            title:'图片上传',
            
          }
        },
        //手机图片上传页面
        {
          path: 'picOther',
          name: 'picOther',
          component: () => import('@/pages/healthEvaluation/onlineEvaluation/picPhone/picOther.vue'),
          meta:{
            title:'图片上传',
            
          }
        },
       
        //对象管理基础信息
        {
          path: 'objectManagement',
          name: 'objectManagement',
          component: () => import('@/pages/healthEvaluation/object/objectManagement'),
          meta:{
            title:'对象管理',
            
          }
        },
        //河湖信息
        {
          path: 'rlCompleteInfo',
          name: 'rlCompleteInfo',
          component: () => import('@/pages/healthEvaluation/object/rlCompleteInfo'),
          meta:{
            title:'河湖信息',
            
          }
        },
        //河湖信息
        {
          path: 'rlInfo',
          name: 'rlInfo',
          component: () => import('@/pages/healthEvaluation/object/objectInfo'),
          meta:{
            title:'评估河湖队对象',
            
          }
        },
        //监测站点管理
        {
          path: 'site',
          name: 'site',
          component: () => import('@/pages/healthEvaluation/object/site'),
          meta:{
            title:'监测站点管理',
            
          }
        },

        // 入河、湖排口信息管理页面
        {
          path: 'outLet',
          name: 'outLet',
          component: () => import('@/pages/healthEvaluation/object/outLet'),
          meta:{
            title:'入河/湖排口信息管理',
            
          }
        },
        //河段管理
        {
          path: 'reach',
          name: 'reach',
          component: () => import('@/pages/healthEvaluation/object/reach'),
          meta:{
            title:'河段管理',
            
          }
        },
        //河湖评估团队
        {
          path: 'team',
          name: 'team',
          component: () => import('@/pages/healthEvaluation/object/team'),
          meta:{
            title:'河湖评估团队',
            
          }
        },
        
        //计算评估
        {
          path: 'jspg',
          name: 'jspg',
          component: () => import('@/pages/healthEvaluation/onlineEvaluation/jspg'),
          meta:{
            title:'计算评估',
            
          }
        },
        //报告模版
        {
          path: 'template',
          name: 'template',
          component: () => import('@/pages/healthEvaluation/report/template'),
          meta:{
            title:'报告模版',
            
          }
        },
        //报告编制入口页面
        {
          path: 'briefing',
          name: 'briefing',
          component: () => import('@/pages/healthEvaluation/report/briefing'),
          meta:{
            title:'报告编制',
            
          }
        },
        
        //审批报告管理
        {
          path: 'approvalManage',
          name: 'approvalManage',
          component: () => import('@/pages/healthEvaluation/report/approvalManage'),
          meta:{
            title:'审批报告管理',
            
          }
        },

      ]
    },

    
    {
      path: '/picGallery',
      name: 'picGallery',
      component: () => import('@/pages/healthEvaluation/onlineEvaluation/picGallery'),
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
    //报告编制页面
    {
      path: '/briefingPreparation',
      name: 'briefingPreparation',
      component: () => import('@/pages/healthEvaluation/report/briefingPreparation'),
      meta:{
        title:'报告编制页面',
        
      }
    },
    {
      path: '/distTest',
      component: () => import('@/components/myDistPicker.vue'),
      meta:{
        title:'任务管理',
        
      }
    },
    // 问卷调查页面
    {
      path: '/questionnaire',
      component: () => import('@/pages/healthEvaluation/onlineEvaluation/questionnaire.vue'),
    },
    // 问卷研判页面
    {
      path: '/questionnaireDetile',
      component: () => import('@/pages/healthEvaluation/onlineEvaluation/questionnaireDetile.vue'),
    },

    
    


  ]
})
