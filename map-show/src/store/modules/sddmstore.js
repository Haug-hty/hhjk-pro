import {
  getsdkversion_api,
  getTableData_action_getgetList_api,
  getList_search_action_api,
  sdkversion_delete_action_api,
  sdkversion_addInfo_action_api,
  getstocktypecode_delete_api,
  getstocktypecode_post_api,
  getstocktypecode_get_api,
  getSDKinterface_get_api,
  getSDKinterface_remove_api,
  getSDKinterface_addinfo_api,
  getSDKinterface_getparam_api,
  getsdkinterface_delinfo_api,
  getmethodpage_getparam_api,
  getmethod_addinfo_api,
  getmethod_delinfo_api,
  sdkversion_editinfo_api,
  getSDKinterface_editinfo_api,
  getTestCase_editinfo_api,
  getTestPlan_addinfo_api,
  getTestPlan_editinfo_api,
  getTestPlanTableData_action_get,
  getRunPlan_action_api,
  getaddTestCaseinfo_action,
  getTestCase_getparam_api,
  getTestCase_addinfo_api,
  getTestCase_delinfo_api,
  getTestReport_Planlist_api,
  getTestCasePlan_addTimeStamp_api,
  TestPlan_getState_result_api,
  getTestPlan_state_api,
  getTestResult_PlanName_api,
  getTestResult_PlanQuestions_api,
  getTestResult_CheckAndIgnoreOptions_api,
  getTestResult_PlanReport_api,
  getTestResult_reflashFlag_api,
  getsamemethod_action_api,
} from '../../api/sddm/index'
import { get } from 'http';
//  自动化测试平台添加

const state = {
  //数据结构
  SDKinformation: [{
    id: "",
    schemaId: "",
    collectionName: "",
    data: {
      sdk_version: "v4.0",
      sdk_version_des: "上证12月份版本",
      platform: "IOS",
      release_date: "2020-03-07 12:14:35",
      file_name: "/use/XXX.sdk",
      interfaces: [{
        interface_name: "QuoteDetail",
        interface_name_des: "行情快照接口",
        methods: [{
          method_name: "QuoteDetailTest",
          method_des: "行情快照测试方法",
          testcases: [{
              case_name: "json.dumps({'CODE': '000100.sz','SUBTYPE': '1001'}",
              case_name_des: "000100.sz测试用例",
              interval_time: 1000,
              times: 1
            },
            {
              case_name: "json.dumps({'CODE': '000100.sh','SUBTYPE': '1001'}",
              case_name_des: "000100.sh测试用例",
              interval_time: 1000,
              times: 1
            }
          ]
        }, ]
      }, ]
    },
    status: ""
  }],

  //测试计划制定数据结构
  // TestPlaninformation: {
  //  _class: '',
  //  collectionName: '',
  //  schemaId: '',
   // status: '',
  //  data: {
   //   plan_name: '',
   //   plan_type: [],
   //   market: [],
   //   start_time: '',
   //   end_time: '', //针对竞品数据分析比对使用
   //   state: [],
   //   tp_environment: [],
   //   methods: [{
  //      method_name: '',
   //     method_des: '',
   //     testcases: [{
    //        case_name: '',
   //         case_name_des: '',
   //         stockcode: '',
    //        stocktype: '',
   //       }
   //     ]
   //   }],
   //   sdk_release_info: [],
   //   collection_name: [],
  //  }
  //},
  TestPlaninformation:[],

  //SDK版本页面
  sdkversion: {
    //文件上传功能
    fileList:[],
    //非空校验
    rules: {
      sdk_version: [{
        validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入版本名称'));
          }         
            setTimeout(() => {
            
            if (value == state.sdkversion.copydata.sdk_version) {
           
              callback(new Error('不能输入相同的版本名称'));
            }else{
            
              callback()      
            }
        }, 1000)      
      },
      required: true,
      trigger: 'blur',
      }],
      tag_id: [{
        required: true,
        message: '请输入tag_id',
        trigger: 'blur'
      }],
      tag_sha: [{
        required: true,
        message: '请输入tag_sha',
        trigger: 'blur'
      }],
    },
    copydata: {},
    currentRow: null,
    filter: {
      sdk_version: ''
    },
    activeCollapse: 'search', //开关查询折叠面板
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10
    },
    //新增版本弹窗
    dialogFormVisible: false,
    //修改版本弹窗
    dialogupdataVisible: false,
    //复制版本弹窗
    dialogcopyVisible: false,
    //新增数据
    form: {
      sdk_version: '',
      sdk_version_des: '',
      platform: '',
      upload_time: '',
      tag_id:'',
      tag_sha:''
    },
    //修改数据
    updata: {
      sdk_version: '',
      sdk_version_des: '',
      platform: '',
      upload_time: '',
      id: '',
      tag_id:'',
      tag_sha:''
    },
    //复制数据
    copyinfo: {
      sdk_version: '',
      sdk_version_des: '',
      platform: '',
      id: '',
      tag_id:'',
      tag_sha:''
    },
  },


  //接口管理
  SDKinterface: {
    //非空校验
    rule: {
      interface_name: [{
        required: true,
        message: "请输入接口名称",
        trigger: 'blur'
      }]
    },
    currentRow:null,
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10
    },
    id: '',
    //列表显示数据
    data: [{
      interface_name: '',
      interface_name_des: '',
    }],
    //级联框中的版本数据
    version: '',
    //条件查询(根据接口名称查询)
    filter: {
      interfaceName: ''
    },
    activeCollapse: 'search', //开关查询折叠面板   
    //新增弹窗
    dialogFormVisible: false,
    //修改弹窗
    dialogupdataVisible: false,
    form: {
      interface_name: '',
      interface_name_des: '',
      id: '',
    },
    //修改弹窗
    updata: {
      interface_name: '',
      interface_name_des: '',
      id: '',
      interface_name_old: '',
    },
    //版本列表
    options: []
  },





  //方法管理页面
  methodPage: {
    rule: {
      method_name: [{
        required: true,
        message: "请输入方法名称",
        trigger: 'blur'
      }]
    },
    currentRow: null,
    filter: {
      sdk_version_number: '',
      interface_name: '',
      method_name: ''
    },
    status: '',
    formlist: [{
      method_name: '',
      method_des: '',
    }],
    //开关查询折叠面板									
    activeCollapse: 'search',
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10
    },
    //新增方法dialog弹窗控制器
    dialogaddMethodVisible: false,
    //新增方法页面表单
    form: {
      method_name: '',
      method_des: '',
    },
    //修改方法dialog弹窗控制器
    dialogupdataMethodVisible: false,
    //修改方法页面表单
    updata: {
      method_name: "QuoteDetailTest1",
      method_des: "行情快照测试方法1",
    },
    formLabelWidth: '120px',
    options1: [],
    options2: [],
    formlist: [{
      id: "",
      schemaId: "",
      collectionName: "",
      data: {
        sdk_version_number: '',
        sdk_itrative_version: '',
        platform: '',
        upload_time: '',
        file_name: '',
        interFaceList: [{
          interface_name: '',
          interface_name_des: '',
        }, ]
      },
      status: ""
    }],
    interFaceList: [],
    sdk_version_number: '',
    interface_name: '',
    list: []
  },

  //用例管理
  TestCase: {
    dialogArrayVisible:false,
    updataArray:{
      case_name_des:''
    },
    loading: true,
    method_name_des: "",
    copydata: {},
    currentRow: null,
    flag1: false,
    flag: false,
    filterStock: {
      stock_type: '',
      stock_code: ''
    },
    temp:{},
    pagination1: {
      total: 0,
      current: 1,
      pageSize: 10
    },
    sdk_version_number: '',
    interface_name: '',
    method_name: '',
    options: [],
    options2: [],
    options3: [],

    tableadd: [],
    initvisable: true,
    addvisable: false,
    dialogupdata: false,
    id: '',
    formlist: [{
      id: "",
      schemaId: "",
      collectionName: "",
      data: {
        sdk_version_number: '',
        sdk_itrative_version: '',
        platform: '',
        upload_time: '',
        file_name: '',
        interFaceList: [{
          interface_name: '',
          interface_name_des: '',
        }, ]
      },
      status: ""
    }],
    data: [{}

    ],
    list: [],
    delArray: [],
    multipleSelection: [],
    objMultipleSelection: {},
    fileList: [{
      name: 'food.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    }, {
      name: 'food2.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    }],
    table: [],
    table1: [],
    stockOption: [],
    filter: {
      stocktype: '',
      stockcode: '',
    }, //查询条件
    activeCollapse: 'search', //开关查询折叠面板
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10
    },
    editVisible: false,
    dialogFormVisible: false,
    dialogCaseList: false,
    form: {
      versionName: '',
      iterationVersion: '',
      platform: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    },
    datademo: {
      form1: [{
        value: ""
      }],
    },

    form2: {
      case_name: '',
      case_des: '',
      param: 'a;b;c',
      param1: 'd;e;f'
    },
    dialogupdataVisible: false,
    updata: {
      case_name: "",
      case_name_des: '',
      stocktype: '',
      stockcode: '',
      param: '',
    },
    updata1: {
      case_name: "",
      case_name_des: '',
      stocktype: '',
      stockcode: '',
      param: '',
    },
    formLabelWidth: '120px',

  },



  //测试计划制定
  testPlan: {
    //测试计划列表分页
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10
    },
    //用例选择列表分页
    pagination1: {
      total: 0,
      current: 1,
      pageSize: 100
    },
    filter:{
      name: ''
    },													//查询条件
    activeCollapse: 'search',										//开关查询折叠面板
    SDKversion:'',  //同版本不同数据源sdk版本
    SDKversion_1:'',
    interface_name:'',
    method_name: '', //选择用例时使用方法名  
    dialogCreatePlan: false,    //测试计划复制dialog控制 
    planForm: {               
      name: '',
      type: ''
    },
    //计划类型选择
    options: [{
      value: '1',
      label: '同数据源不同版本对比'
    }, {
      value: '2',
      label: '同版本不同数据源对比'
    },
    {
      value: '3',
      label: '不同版本不同数据源对比'
    }, 
    {
      value: '4',
      label: '竞品数据对比'
    }],
    //快照规则比对选择
    optionsQuote: [{
      value: '0',
      label: '基准比对'
    }, {
      value: '1',
      label: '行情快照比对'
    },
    {
      value: '2',
      label: '排序'
    }],

    //不同数据源选择的运行环境
    Env1value: '',
    Env2value: '',
    Env: [{
      value: '0',
      label: '测试环境'
    }, {
      value: '1',
      label: '全真环境'
    }, {
      value: '2',
      label: '生产环境'
    }],
    //站点名称和ip
    Url1value: [],
    Url2value: [],
    Url3value: [],
    //对比方法
    compareMethod:[],
    dag_id:'',
    id:'',
    jingpincase: {
      dynamicItem: []
    },
    //执行方法列表
    contentList: [],
    samecaseList: [],
    //不同版本
    androidSDKversion: '',
    androidSDKlist: [],
    iosSDKversion: '',
    iosSDKlist: [],
    //选择用例dialog控制
    dialogCreateJiaoBen: false,
    //市场权限字典列表
    MarketPerm: [],
    start_date:'',  //开始时间
    round_interval_sec:'',  //执行间隔
    run_times:'', //执行次数
    testPlanDes:'',
    quote_detail:'',
    tag_id:'',
    tag_sha:'',
    tag_id_1:'',
    tag_sha_1:'',
    //市场名称以及选择控制
    marketname:[],
    marketname1:[],
    //选择的市场权限数组
    marketPermission:[],
    //用例列表数组
    testcaseList:[],
    paramStrs:[], 
    collectionName:'',
    controlCase:0,
    transfer:{},
    number:'',
    useMethod:[],
    runEenvironment1:[],
    runEenvironment2:[],
    //新增市场
    market:[{
      name:'沪深市场',
      permission:[]
    },
    {
      name: '港股市场',
      permission: []
    },
    {
      name: '境外市场',
      permission: []
    },
    {
      name: '中金所市场',
      permission: []
    }
    ],
    serverSites1: [],
    serverSites2: [],
    HKPerms: [],
    Level: '',
    transferMethods: [],
    response: '',
    server: [],
    state: '', //测试计划运行状态
  },
  
  //------------------------------测试结果模块Start-------------------------------------
  //问题列表
  testResult: {
    currentRow: null,
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10
    },
    //测试计划下拉列表
    options: [],
    //问题列表
    errormessage: [],
    allErrormessage: [],
    toLargeFlag:'',
    allRightFlag:false,
    //返回状态
    statusflag: false
  },

  //测试报告
  testReport: {
    options:[],
    environment: '',
    planType: '',
    planName: '',
    currentRow:{},
    sdkVersion: '',
    //接口通过数
    approveInterface: 0,
    //接口未通过数
    unApproveInterface: 0,
    //方法通过数
    approveMethod: 0,
    //方法未通过数
    unApproveMethod: 0,
    //用例通过数
    approveCase: 0,
    //用例未通过数
    unApproveCase: 0,
    //缺陷列表
    bugList: [],
    methodPassRate: [],
    methodPie1:{},
    
  }

  //-------------------------------测试结果模块End--------------------------------------
}
const mutations = {

  //sdk版本管理
  GET_SDKVERSION(state, address) {
    //判断是否是条件查询
    if (state.sdkversion.filter.sdk_version != '') {
      let array = [];
      address.forEach(item => {
        if (item.data.sdk_version.toLowerCase().indexOf(state.sdkversion.filter.sdk_version.toLowerCase()) >= 0 || item.data.sdk_version_des.toLowerCase().indexOf(state.sdkversion.filter.sdk_version.toLowerCase()) >= 0 || item.data.platform.toLowerCase().indexOf(state.sdkversion.filter.sdk_version.toLowerCase()) >= 0) {
          array.push(item)
        }
      })
      state.SDKinformation = array
      state.sdkversion.pagination.total = array.length
    } else {
      state.sdkversion.pagination.total = address.length
      state.SDKinformation = address
    }

    if (state.sdkversion.pagination.total <= state.sdkversion.pagination.pageSize) {
      state.SDKinformation = state.SDKinformation;
    } else {
      if (state.sdkversion.pagination.current != 1) {
        state.SDKinformation = state.SDKinformation.slice((state.sdkversion.pagination.current - 1) * state.sdkversion.pagination.pageSize, state.sdkversion.pagination.current * state.sdkversion.pagination.pageSize)
      }
      state.SDKinformation = state.SDKinformation.slice(0, state.sdkversion.pagination.pageSize)
    }
    let array = [];
    for (let i = 0; i < state.SDKinformation.length; i++) {
      array.push(address[i].data)
    }

    state.methodPage.options1 = [...new Set(array)]
    state.TestCase.options = [...new Set(array)]

    state.testPlan.androidSDKlist = [...new Set(array)]
    // var array2 = [];
    // for (let i = 0; i < state.TestCase.formlist.length; i++) {
    //   array2.push(state.TestCase.formlist[i].data)
    // }
    // state.TestCase.options1 = [...new Set(array)]
  },




  //接口管理中版本初始化
  GET_SDKINTERFACE_GETINIT(state, address) {
    let array = []
    address.forEach(item => {
      array.push(item.data)
    })
    state.SDKinterface.options = [...new Set(array)]
    if (state.SDKinterface.version == '') {
      state.SDKinterface.data = []
    }
  },


  //接口管理
  GET_SDKINTERFACE_GET(state, address) {


    state.SDKinterface.id = address.data[0].id
    state.methodPage.id = address.data[0].id
    state.TestCase.id = address.data[0].id
    //判断是否是条件查询
    if (state.SDKinterface.filter.interfaceName != '') {
      let array = []
      address.data[0].data.interfaces.forEach(item => {
        if (item.interface_name.toLowerCase().indexOf(state.SDKinterface.filter.interfaceName.toLowerCase()) >= 0 || item.interface_name_des.toLowerCase().indexOf(state.SDKinterface.filter.interfaceName.toLowerCase()) >= 0) {
          array.push(item)
        }
      })
      state.SDKinterface.data = array
    } else {
      state.SDKinterface.data = address.data[0].data.interfaces
    }
    let interfaceData = state.SDKinterface.data
    if (interfaceData && interfaceData.length > 0) {
      state.SDKinterface.pagination.total = interfaceData.length
      if (state.SDKinterface.pagination.total <= state.SDKinterface.pagination.pageSize) {

        state.SDKinterface.data = state.SDKinterface.data
      } else {

        if (state.SDKinterface.pagination.current != 1) {
          state.SDKinterface.data = state.SDKinterface.data.slice((state.SDKinterface.pagination.current - 1) * state.SDKinterface.pagination.pageSize, state.SDKinterface.pagination.current * state.SDKinterface.pagination.pageSize)
        }
        state.SDKinterface.data = state.SDKinterface.data.slice(0, state.SDKinterface.pagination.pageSize)
      }
      let array = [];
      for (let i = 0; i < interfaceData.length; i++) {
        array.push(interfaceData[i])
      }
      if (state.methodPage.sdk_version == undefined) {
        state.methodPage.options2 = []
      } else {
        state.methodPage.options2 = [...new Set(array)]
      }
      state.TestCase.options2 = [...new Set(array)]
      if (state.TestCase.sdk_version == undefined) {
        state.TestCase.options2 = []
      }
    } else {
      state.SDKinterface.data = []
      state.SDKinterface.pagination.total = 0
      state.TestCase.interface_name = ''
      state.methodPage.options2 = []
      state.TestCase.options2 = []
      if (state.methodPage.interface_name == '') {
        state.methodPage.list = []
      }
      if (state.TestCase.options2.length == 0) {
        state.TestCase.method_name = ''
        state.TestCase.options3 = []
        state.TestCase.list = []
      }

    }
  },



  //方法管理
  GET_METHODPAGE_GET(state, address) {


    address.data[0].data.interfaces.forEach(item => {
      //判断是否是该接口下的数据
      if (item.interface_name == state.methodPage.interface_name) {

        if (item.methods && item.methods.length > 0) {
          if (state.methodPage.filter.method_name != '') {
            let array = []
            for (let i = 0; i < item.methods.length; i++) {
              if (item.methods[i].method_name.toLowerCase().indexOf(state.methodPage.filter.method_name.toLowerCase()) >= 0 || item.methods[i].method_des.toLowerCase().indexOf(state.methodPage.filter.method_name.toLowerCase()) >= 0) {
                array.push(item.methods[i])
              }
            }
            state.methodPage.list = array
          } else {
            state.methodPage.list = item.methods
          }
          state.methodPage.pagination.total = state.methodPage.list.length
          if (state.methodPage.pagination.total <= state.methodPage.pagination.pageSize) {
            state.methodPage.list = state.methodPage.list
          } else {
            if (state.methodPage.pagination.current != 1) {
              state.methodPage.list = state.methodPage.list.slice((state.methodPage.pagination.current - 1) * state.methodPage.pagination.pageSize, state.methodPage.pagination.current * state.methodPage.pagination.pageSize)
            }
            state.methodPage.list = state.methodPage.list.slice(0, state.methodPage.pagination.pageSize)
          }
        } else {
          state.methodPage.list = []
          state.methodPage.pagination.total = 0
        }

      }
      if (item.interface_name == state.TestCase.interface_name) {
        if (item.methods && item.methods.length > 0) {
          state.TestCase.options3 = item.methods
        } else {
          state.TestCase.options3 = []
          state.TestCase.method_name = ''
          state.TestCase.list = []
        }
      }
    })
  },

  //用例管理
  GET_TESTCASE_GET(state, address) {

    let array = [];
    array = address.data[0].data.interfaces;
    for (let i = 0; i < array.length; i++) {
      if (array[i].interface_name == state.TestCase.interface_name) {


        for (let j = 0; j < address.data[0].data.interfaces[i].methods.length; j++) {
          if (address.data[0].data.interfaces[i].methods[j].method_name == state.TestCase.method_name) {
            state.TestCase.method_name_des = address.data[0].data.interfaces[i].methods[j].method_des
          
            if (address.data[0].data.interfaces[i].methods[j].testcases && address.data[0].data.interfaces[i].methods[j].testcases.length > 0) {
              if (state.TestCase.filter.stockcode != '') {
                let array1 = []
                address.data[0].data.interfaces[i].methods[j].testcases.forEach(item => {
                  if(item.CODE!=undefined&&item.SUBTYPE!=undefined){
                   
                    if (item.CODE.toLowerCase().indexOf(state.TestCase.filter.stockcode.toLowerCase()) >= 0||item.SUBTYPE.toLowerCase().indexOf(state.TestCase.filter.stockcode.toLowerCase()) >= 0) {
                      array1.push(item)
                    }
                  }
                })
                state.TestCase.list = array1
                console.log("GET_TESTCASE_GET -> state.TestCase.list", state.TestCase.list.length)
              } else {
                state.TestCase.list = address.data[0].data.interfaces[i].methods[j].testcases
              }
              state.TestCase.pagination.total = state.TestCase.list.length
              if (state.TestCase.pagination.total <= state.TestCase.pagination.pageSize) {
                state.TestCase.list = state.TestCase.list
              } else {
                if (state.TestCase.pagination.current != 1) {
                  state.TestCase.list = state.TestCase.list.slice((state.TestCase.pagination.current - 1) * state.TestCase.pagination.pageSize, state.TestCase.pagination.current * state.TestCase.pagination.pageSize)
                }
                state.TestCase.list = state.TestCase.list.slice(0, state.TestCase.pagination.pageSize)
              }
              state.TestCase.list.forEach(item => {
                if (item.case_name_des == '') {
                  item.case_name_des = state.methodPage.list.method_des
                }
                if (item.case_name_des === undefined) {
                  item.case_name_des = address.data[0].data.interfaces[i].methods[j].method_des
                }
              })
            } else {
              state.TestCase.list = []
              state.TestCase.pagination.total = 0
            }
          }
        }

      }
    }

  },
  //条件查询
  // GET_TESTCASE_GETFLITER(state, address) {
  //   let array = [];
  //   let array1 = [];
  //   let tempDemo = [];
  //   array = address.data[0].data.interfaces;
  //   for (let i = 0; i < array.length; i++) {
  //     if (array[i].interface_name == state.TestCase.interface_name) {
  //       for (let j = 0; j < address.data[0].data.interfaces[i].methods.length; j++) {
  //         if (address.data[0].data.interfaces[i].methods[j].method_name == state.TestCase.method_name) {
  //           tempDemo = address.data[0].data.interfaces[i].methods[j].testcases
  //           state.TestCase.list = address.data[0].data.interfaces[i].methods[j].testcases
  //           state.TestCase.tableadd = address.data[0].data.interfaces[i].methods[j].testcases
  //           state.TestCase.pagination.total = address.data[0].data.interfaces[i].methods[j].testcases.length
  //           if (state.TestCase.pagination.total <= state.TestCase.pagination.pageSize) {
  //             state.TestCase.list = address.data[0].data.interfaces[i].methods[j].testcases
  //           } else {
  //             let temp = address.data[0].data.interfaces[i].methods[j].testcases
  //             state.TestCase.list = address.data[0].data.interfaces[i].methods[j].testcases.slice(0, state.TestCase.pagination.pageSize)
  //             if (state.TestCase.pagination.current != 1) {
  //               state.TestCase.list = temp.slice((state.TestCase.pagination.current - 1) * state.TestCase.pagination.pageSize, state.TestCase.pagination.current * state.TestCase.pagination.pageSize)
  //             }
  //           }
  //         }

  //       }
  //     }
  //   }
  //   if (state.TestCase.filter.stockcode != '') {
  //     tempDemo.forEach(item => {
  //       if (item.CODE.toLowerCase().indexOf(state.TestCase.filter.stockcode.toLowerCase()) >= 0) {
  //         array1.push(item)
  //       }
  //     })
  //     state.TestCase.list = array1
  //     state.TestCase.pagination.total = array1.length
  //     if (state.TestCase.pagination.total <= state.TestCase.pagination.pageSize) {
  //       state.TestCase.list = array1
  //     } else {
  //       let temp = array1
  //       state.TestCase.list = array1.slice(0, state.TestCase.pagination.pageSize)
  //       if (state.TestCase.pagination.current != 1) {
  //         state.TestCase.list = temp.slice((state.TestCase.pagination.current - 1) * state.TestCase.pagination.pageSize, state.TestCase.pagination.current * state.TestCase.pagination.pageSize)
  //       }
  //     }
  //   }
  // },
  //测试计划制定页面
  GET_TESTPLAN(state, address) {
    state.TestPlaninformation = address;
    state.testPlan.pagination.total = address.length
    if (address.length <= state.testPlan.pagination.pageSize) {
      state.TestPlaninformation = address;
    } else {
      let temp = address
      state.TestPlaninformation = address.slice(0, state.testPlan.pagination.pageSize)
      if (state.testPlan.pagination.current != 1) {
        state.TestPlaninformation = temp.slice((state.testPlan.pagination.current - 1) * state.testPlan.pagination.pageSize, state.testPlan.pagination.current * state.testPlan.pagination.pageSize)
      }
    }
    if (state.TestCase.filter.stockcode != '') {
      tempDemo.forEach(item => {
        if (item.CODE.toLowerCase().indexOf(state.TestCase.filter.stockcode.toLowerCase()) >= 0) {
          array1.push(item)
        }
      })
      state.TestCase.list = array1
      state.TestCase.pagination.total = array1.length
      if (state.TestCase.pagination.total <= state.TestCase.pagination.pageSize) {
        state.TestCase.list = array1
      } else {
        let temp = array1
        state.TestCase.list = array1.slice(0, state.TestCase.pagination.pageSize)
        if (state.TestCase.pagination.current != 1) {
          state.TestCase.list = temp.slice((state.TestCase.pagination.current - 1) * state.TestCase.pagination.pageSize, state.TestCase.pagination.current * state.TestCase.pagination.pageSize)
        }
      }
    }
  },
  



  //测试计划制定页面
  GET_TESTPLAN(state, address) {
    state.TestPlaninformation = address.data.planList;
    state.testPlan.pagination.total=address.data.count  
    // if(address.length<=state.testPlan.pagination.pageSize){
    //   state.TestPlaninformation = address;    
    // }else{     
    //   let temp = address
    //  state.TestPlaninformation = address.slice(0,state.testPlan.pagination.pageSize)
    //  if(state.testPlan.pagination.current!=1){  
    //   state.TestPlaninformation = temp.slice((state.testPlan.pagination.current-1)*state.testPlan.pagination.pageSize,state.testPlan.pagination.current*state.testPlan.pagination.pageSize)
    //  }
    // }
    // if(state.testPlan.filter.name !=''){
    //   var a=[]
    //   state.TestPlaninformation.forEach(item=>{
    //     if(item.data.plan_name == state.testPlan.filter.name){
    //       a.push(item)
         
    //     }
    //   })
    //   state.testPlan.pagination.total = a.length
    //   if( state.testPlan.pagination.total<=state.testPlan.pagination.pageSize){
    //     state.TestPlaninformation = a;    
    //   }else{     
    //     let temp = a
    //    state.TestPlaninformation = a.slice(0,state.testPlan.pagination.pageSize)
    //    if(state.testPlan.pagination.current!=1){  
    //     state.TestPlaninformation = temp.slice((state.testPlan.pagination.current-1)*state.testPlan.pagination.pageSize,state.testPlan.pagination.current*state.testPlan.pagination.pageSize)
    //    }
    //   }
    // }
   
  },

  //测试计划制定展示方法列表
  GET_methodlist_GET(state, address) {
    state.SDKinformation = address.data;
    state.testPlan.contentList = []
    if(address.data[0].data.interfaces&&address.data[0].data.interfaces.length>=0){

      address.data[0].data.interfaces.forEach(item => {     
        item.methods.forEach(item1 => {
          state.testPlan.contentList.push({interfacename:item.interface_name,method_des:item1.method_des,
            method_name:item1.method_name,testcases:item1.testcases})
        })
      })
    }
  },
  GET_methodlist_GET1(state, address) {
    state.SDKinformation = address.data;
    address.data[0].data.interfaces.forEach(item => {
      if(item.interface_name == state.testPlan.interface_name){
        item.methods.forEach(item1 => {
          if (item1.method_name == state.testPlan.method_name) {

            state.testPlan.pagination1.total=item1.testcases.length  
            if(item1.testcases.length<=state.testPlan.pagination1.pageSize){
              state.testPlan.testcaseList = item1.testcases;    
            }else{
              let tep = item1.testcases
              state.testPlan.testcaseList = item1.testcases.slice(0,state.testPlan.pagination1.pageSize)
             if(state.testPlan.pagination1.current!=1){
              state.testPlan.testcaseList = tep.slice((state.testPlan.pagination1.current-1)*state.testPlan.pagination1.pageSize,state.testPlan.pagination1.current * state.testPlan.pagination1.pageSize)
             }
            }
           
          }
        })
      }
    })


  },

  //相同方法数据处理
  GET_samemethodlist(state, address) {
    state.testPlan.contentList = address.data
  },

  //相同用例数据处理
  GET_samecaselist(state, address) {
    state.testPlan.samecaseList = address.data
    state.testPlan.samecaseList.forEach(element => {
      if(element.method_name = state.testPlan.method_name){
        state.testPlan.testcaseList = element.testcases

        state.testPlan.pagination1.total=element.testcases.length  
            if(element.testcases.length<=state.testPlan.pagination1.pageSize){
              state.testPlan.testcaseList = element.testcases;    
            }else{
              let tep = element.testcases
              state.testPlan.testcaseList = element.testcases.slice(0,state.testPlan.pagination1.pageSize)
             if(state.testPlan.pagination1.current!=1){
              state.testPlan.testcaseList = tep.slice((state.testPlan.pagination1.current-1)*state.testPlan.pagination1.pageSize,state.testPlan.pagination1.current * state.testPlan.pagination1.pageSize)
             }
            }
      }
      
    });
  },

 //测试计划运行放回值
  GET_TESTPLAN_RES(state, address) {
    state.testPlan.response = address;
   
  },
  GET_TestPlan_state(state, address) {
    state.testPlan.state = address.data.state;
  },
  //------------------------------测试结果模块Start-------------------------------------
  //获取测试计划名称
  GET_TESTPLAN_NAME(state, address) {
    console.log(address)
    state.testResult.options = [];
    for(let i=0; i<address.data.length; i++){
      state.testResult.options.push({'label':address.data[i].planName+'('+address.data[i].jobID.substring(8,18)+' '+address.data[i].jobID.substring(19,27)+')','value':address.data[i].jobID});
    }
  },

  //获取测试计划对应的问题列表
  GET_TESTPLAN_QUESTIONS(state, address) {  
    state.testResult.allErrormessage = address.data
    state.testResult.allRightFlag = true
    if(address.data ==''){
      state.testResult.allRightFlag = false
    }else{
      state.testResult.toLargeFlag = address.data[0].type
      let array = []
      for (let i = 0; i < address.data.length; i++) {
        var str = ''
        for (var key in address.data[i].paramData) {
          str = str + key + ':' + address.data[i].paramData[key] + ";"
        }
        address.data[i].paramData = str
        if(address.data[i].environment == '0'){
          address.data[i].environment = "测试环境"
        }else if(address.data[i].environment == '1'){
          address.data[i].environment = "全真环境"
        }else{
          address.data[i].environment = "生产环境"
        }
        array.push(address.data[i]);
      }
      state.testResult.pagination.total = array.length
      if (state.testResult.pagination.total <= state.testResult.pagination.pageSize) {
        state.testResult.errormessage = array
      } else {
        let temp = array
        state.testResult.errormessage = array.slice(0, state.testResult.pagination.pageSize)
        if (state.testResult.pagination.current != 1) {    
          state.testResult.errormessage = temp.slice((state.testResult.pagination.current - 1) * state.testResult.pagination.pageSize, state.testResult.pagination.current * state.testResult.pagination.pageSize)
         
        }
  
  
      }
    }
    
  },

  

  //确认和忽略操作
  GET_TESTPLAN_CHECKANDIGNOREOPTIONS(state, address) {
    state.testResult.statusflag = address.data.statusFlag;
  },

  //测试报告数据
  GET_TESTPLAN_PLANREPORT(state, address) {
   
    address.data[0].options =state.testReport.options
  
    state.testReport = address.data[0]
    if(state.testReport.environment&&state.testReport.environment!=''){

      state.testReport.environment = state.testReport.environment.replace(/0/g,'测试')
      state.testReport.environment = state.testReport.environment.replace(/1/g,'全真')
      state.testReport.environment = state.testReport.environment.replace(/2/g,'生产')
      for(let i=0; i<address.data[0].bugList.length; i++){
        var str = ''        
        for(var key in address.data[0].bugList[i].paramStr){        
          str = str + key+':'+ address.data[0].bugList[i].paramStr[key]+";"
        }
        address.data[0].bugList[i].paramStr = str
      }
    }
  },
  GET_TESTRESULT_REPORTLIST(state,address) {
   
    for(let i=0; i<address.data.length; i++){
      state.testReport.options.push({'label':address.data[i].planName+'('+address.data[i].jobID.substring(8,18)+' '+address.data[i].jobID.substring(19,27)+')','value':address.data[i].jobID});
      
    }
    

  }
 //-------------------------------测试结果模块End--------------------------------------
}


const actions = {


  //sdk版本页面初始化查询
  getTableData_action_get(context,params) {
   
    const res = getTableData_action_getgetList_api()
    
    res.then(function (response) {
      context.commit('GET_SDKVERSION', response)
    })
  },
  //sdk版本删除
  sdkversion_delete_action(context, params) {
    return new Promise((resolve, reject) => {
      sdkversion_delete_action_api(params)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  //sdk版本新增
  sdkversion_addInfo_action(context, params) {

    
    // const res = sdkversion_addInfo_action_api(params)
    return new Promise((resolve, reject) => {
      sdkversion_addInfo_action_api(params)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })

  },
  //版本修改
  sdkversion_editInfo_action(context, param) {
    var id = param.id
    let params = {
      "content": [ {
          "key": "data.sdk_version_des",
          "value": param.sdk_version_des
        },
        {
          "key": "data.platform",
          "value": param.platform
        },{
          "key": "data.tag_id",
          "value": param.tag_id
        },{
          "key": "data.tag_sha",
          "value": param.tag_sha
        }, {
          "key": "data.sdk_version",
          "value": param.sdk_version
        },
      ]
    }
    return new Promise((resolve, reject) => {
      sdkversion_editinfo_api(id, params)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },




  //                                  --------------接口管理----------------
  //版本初始化列表
  getSDKinterface_action_initTable(context, params) {
    const res = getTableData_action_getgetList_api()
    res.then(function (response) {

      context.commit('GET_SDKINTERFACE_GETINIT', response)
    })
  },
  //根据版本查找接口
  getSDKinterface_action_getparam(context, params) {
    const res = getSDKinterface_getparam_api(params)
    res.then(function (response) {

      context.commit('GET_SDKINTERFACE_GET', response)
    })
  },
  //接口新增
  getSDKinterface_action_addinfo(context, param) {
    var id = param.id
    let params = {
      "type": "insert",
      "location": "data.interfaces",
      "content": [{
        "interface_name": param.interface_name,
        "interface_name_des": param.interface_name_des
      }]
    }
    return new Promise((resolve, reject) => {
      getSDKinterface_addinfo_api(id, params)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //接口修改
  getSDKinterface_action_editinfo(context, param) {

    var id = param.id
    let params = {
      "filterFactors": [{
        "key": "i.interface_name",
        "value": param.interface_name1
      }],
      "content": [{
        "key": "data.interfaces.$[i].interface_name_des",
        "value": param.interface_name_des
      }, {
        "key": "data.interfaces.$[i].interface_name",
        "value": param.interface_name
      }]
    }
    return new Promise((resolve, reject) => {
      getSDKinterface_editinfo_api(id, params)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  //接口删除
  getSDKinterface_action_delinfo(context, param) {

    let id = param.id
    let params = {
      "type": "delete",
      "location": "data.interfaces",
      "content": [{
        "key": "interface_name",
        "value": param.interface_name
      }]
    }
    return new Promise((resolve, reject) => {
      getsdkinterface_delinfo_api(id, params)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },




  //                           --------------方法管理--------------


  //方法管理
  getmethodPage_action_getparam(context, param) {
    const res = getmethodpage_getparam_api(param)

    res.then(function (response) {

      context.commit('GET_METHODPAGE_GET', response)
    })
  },
  //方法页面查询
  getMethodList_search_action(context, param) {
    const res = getmethodpage_getparam_api(param)
    res.then(function (response) {
      context.commit('GET_METHODPAGE_GET', response)
    })
  },
  getMethodList_search_actionfilter(context, param) {
    const res = getmethodpage_getparam_api(param)
    res.then(function (response) {
      context.commit('GET_METHODPAGE_GETFILTER', response)
    })
  },
  //方法新增
  getaddMethodinfo_action(context, param) {
    var id = param.id
    let params = {
      "type": "insert",
      "location": "data.interfaces.$[i].methods",
      "filterFactors": [{
        "key": "i.interface_name",
        "value": param.interface_name
      }],
      "content": [{
        "method_name": param.method_name,
        "method_des": param.method_des
      }]
    }
    return new Promise((resolve, reject) => {
      getmethod_addinfo_api(id, params)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })

  },
  //方法修改  
  getMethod_action_editinfo(context, param) {
    var id = param.id
    let params = {
      "filterFactors": [{
        "key": "i.interface_name",
        "value": state.methodPage.interface_name
      }, {
        "key": "j.method_name",
        "value": param.method_name_old
      }],
      "content": [{
        "key": "data.interfaces.$[i].methods.$[j].method_des",
        "value": param.method_des
      }, {
        "key": "data.interfaces.$[i].methods.$[j].method_name",
        "value": param.method_name
      }]
    }
    return new Promise((resolve, reject) => {
      getSDKinterface_editinfo_api(id, params)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })

  },

  //方法删除
  getMethod_action_delinfo(context, param) {
   
    var id = param.id
    let params = {
      "type": "delete",
      "location": "data.interfaces.$[first].methods",
      "filterFactors": [{
        "key": "first.interface_name",
        "value": param.interface_name
      }],
      "content": [{
        "key": "method_name",
        "value": param.method_name
      }]
    }
    return new Promise((resolve, reject) => {
      getmethod_delinfo_api(id, params)
        .then(response => {

          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },



  //                      -------------用例管理-----------------
  //用例管理
  getTestCase_action_getparam(context, param) {
    return new Promise((resolve, reject) => {
      getTestCase_getparam_api(param)
        .then(response => {
          context.commit('GET_TESTCASE_GET', response)
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  //条件查询
  getTestCase_action_getfliter(context, param) {

    const res = getTestCase_getparam_api(param)

    res.then(function (response) {

      context.commit('GET_TESTCASE_GETFLITER', response)
    })
  },
  getTestCase_action_getfliterStockType(context, param) {
    const res = getTestCase_getparam_api(param)
    res.then(function (response) {
      context.commit('GET_TESTCASE_GETFLITERSTOCKTYPE', response)
    })
  },
  //用例修改  
  getTestCase_action_editinfo(context, param1) {
    let temp;
   if(param1.stocktype!=undefined&&param1.stockcode!=undefined){

      temp =
       state.TestCase.method_name + "-" +
       param1.stocktype + "-" +
       param1.stockcode + "-" +
       param1.param;
   }else{
     temp =
    state.TestCase.method_name + "-" +
    param1.param;
   }
    param1.case_newName = temp
    var id = param1.id
    let array = param1.param.split(';')
    let array1 = [{
      "case_name_des": param1.case_name_des,
      "SUBTYPE": param1.stocktype,
      "CODE": param1.stockcode,
      "param": param1.param,
      "case_name": param1.case_newName
    }]

    array.forEach(item => {
      let demo = '{' + item.replace(/;/g, ',') + '}'
      array1[0] = {
        ...array1[0],
        ...eval("(" + demo + ")")
      }
    })
    let params = {
      "type": "update",
      "location": "data.interfaces.$[i].methods.$[j].testcases.$[k]",
      "filterFactors": [{
        "key": "i.interface_name",
        "value": state.TestCase.interface_name
      }, {
        "key": "j.method_name",
        "value": state.TestCase.method_name
      }, {
        "key": "k.case_name",
        "value": param1.case_name
      }],
      "content": array1
    }
    return new Promise((resolve, reject) => {
      getTestCase_editinfo_api(id, params)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })

  },
  //用例新增
  getaddTestCaseinfo_action(context, param1) {
    var id = param1.id
    var array = []
    for (let i = 0; i < param1.list.length; i++) {
      if(param1.list[i].param&&param1.list[i].param!=''){
        let demo = '{' + param1.list[i].param.replace(/;/g, ',') + '}'
        if(param1.list[i].dictLabel!=''&&param1.list[i].dictValue!=''){

          array.push({
            "case_name": param1.list[i].case_name,
            "case_name_des": param1.list[i].case_name_des,
            "SUBTYPE": param1.list[i].dictLabel,
            "CODE": param1.list[i].dictValue,
            "param": param1.list[i].param,
            ...eval("(" + demo + ")")
          })
        }else{
          array.push({
            "case_name": param1.list[i].case_name,
            "case_name_des": param1.list[i].case_name_des,
            "param": param1.list[i].param,
            ...eval("(" + demo + ")")
          })
        }
      }else{
        if(param1.list[i].dictLabel!=''&&param1.list[i].dictValue!=''){

          array.push({
            "case_name": param1.list[i].case_name,
            "case_name_des": param1.list[i].case_name_des,
            "SUBTYPE": param1.list[i].dictLabel,
            "CODE": param1.list[i].dictValue,
            "param": param1.list[i].param,         
          })
        }else{
          array.push({
            "case_name": param1.list[i].case_name,
            "case_name_des": param1.list[i].case_name_des,
            "param": param1.list[i].param,         
          })
        }
      }
    }
    state.TestCase.tableadd = array
   
    let params = {
      "type": "insert",
      "location": "data.interfaces.$[i].methods.$[j].testcases",
      "filterFactors": [{
        "key": "i.interface_name",
        "value": param1.interface_name
      }, {
        "key": "j.method_name",
        "value": param1.method_name
      }],
      "content": array
    }
    return new Promise((resolve, reject) => {
      getTestCase_addinfo_api(id, params)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //用例删除
  getTestCase_action_delList(context, param) {

    var id = param.id

    let params = {
      "type": "delete",
      "location": "data.interfaces.$[first].methods.$[second].testcases",
      "filterFactors": [{
        "key": "first.interface_name",
        "value": param.interface_name
      }, {
        "key": "second.method_name",
        "value": param.method_name
      }],
      "content": [{
        "key": "case_name",
        "value": param.case_name
      }]
    }
    return new Promise((resolve, reject) => {
      getTestCase_delinfo_api(id, params)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  //批量删除
  getTestCase_action_delArray(context, params) {

    var id = state.TestCase.id
    var array = []
    params.forEach(item => {
      array.push({
        "key": "case_name",
        "value": item.case_name
      })
    })

    let param = {
      "type": "delete",
      "location": "data.interfaces.$[first].methods.$[second].testcases",
      "filterFactors": [{
        "key": "first.interface_name",
        "value": state.TestCase.interface_name
      }, {
        "key": "second.method_name",
        "value": state.TestCase.method_name
      }],
      "content": array
    }

    return new Promise((resolve, reject) => {
      getTestCase_delinfo_api(id, param)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
//批量修改用例描述
getTestCase_action_modfiyArray(context, params) {
console.log("getTestCase_action_modfiyArray -> params", params)
  
  var id = state.TestCase.id
  
  state.TestCase.modfiyArray.forEach(item => {
    
    item.case_newName=state.TestCase.method_name+'-'+item.SUBTYPE+'-'+item.SUBTYPE+'-'+item.param
    let array = []
    array.push({
      "case_name_des": params,
      "SUBTYPE": item.SUBTYPE,
      "CODE": item.CODE,
      "param": item.param,
      "case_name": item.case_newName
    })
    let param = {
      "type": "update",
      "location": "data.interfaces.$[first].methods.$[second].testcases.$[third]",
      "filterFactors": [{
        "key": "first.interface_name",
        "value": state.TestCase.interface_name
      }, {
        "key": "second.method_name",
        "value": state.TestCase.method_name
      },{
        "key": "third.case_name",
        "value": item.case_name
      }],
      "content": array
    }
    console.log('param',param)
    return new Promise((resolve, reject) => {
      getTestCase_editinfo_api(id, param)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  })

 
},




  //测试报告
  gettestreport_action_getList(context, param) {
   
    const res = gettestreport_get_api(param)
    res.then(function (response) {

      context.commit('GET_TESTREPORT_GET', response)
    })
  },

  
  //测试计划新增
  getTestCasePlan_action_addinfo(){
    let params ={
          collectionName:'test_result',
          plan_name: state.testPlan.planForm.name,
          plan_type: state.testPlan.planForm.type,
          market:state.testPlan.market,                        
          start_time: state.testPlan.start_date,
          roundIntervalSec:state.testPlan.round_interval_sec,
          run_times:state.testPlan.run_times,
          sdk_version:state.testPlan.SDKversion,
          sdk_version_1:state.testPlan.SDKversion_1,
          state:"已计划",
          plan_des:state.testPlan.testPlanDes,
          dag_id:state.testPlan.dag_id,
          quote_detail:state.testPlan.quote_detail,
          tp_environment1:{
            environment:state.testPlan.Env1value,
            serverSites1:state.testPlan.serverSites1
          },              
          tp_environment2:{
            environment:state.testPlan.Env2value,
            serverSites2:state.testPlan.serverSites2
          },
          methods: state.testPlan.useMethod,
          sdk_release_info:{
            tag_id: state.testPlan.tag_id, tag_sha:state.testPlan.tag_sha},
          sdk_release_info_1:{
            tag_id: state.testPlan.tag_id_1, tag_sha:state.testPlan.tag_sha_1},
          time_stamp:'',
      }
    return new Promise((resolve, reject) => {
      getTestPlan_addinfo_api(params)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //测试计划复制
  getTestCasePlan_action_copyinfo(context,param){
    return new Promise((resolve, reject) => {
      getTestPlan_addinfo_api(param)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })

  },

  //测试计划修改
  getTestCasePlan_action_editinfo(context,param){
    let id = state.testPlan.id
    let params ={
      collectionName:'test_result',
      plan_name: state.testPlan.planForm.name,
      plan_type: state.testPlan.planForm.type,
      market:state.testPlan.market,                        
      start_time: state.testPlan.start_date,
      roundIntervalSec:state.testPlan.round_interval_sec,
      run_times:state.testPlan.run_times,
      sdk_version:state.testPlan.SDKversion,
      sdk_version_1:state.testPlan.SDKversion_1,
      state:"已计划",
      plan_des:state.testPlan.testPlanDes,
      dag_id:state.testPlan.dag_id,
      quote_detail:state.testPlan.quote_detail,
      tp_environment1:{
        environment:state.testPlan.Env1value,
        serverSites1:state.testPlan.serverSites1
      },              
      tp_environment2:{
        environment:state.testPlan.Env2value,
        serverSites2:state.testPlan.serverSites2
      },
      methods: state.testPlan.useMethod,
      sdk_release_info:{
        tag_id: state.testPlan.tag_id, tag_sha:state.testPlan.tag_sha},
      sdk_release_info_1:{
        tag_id: state.testPlan.tag_id_1, tag_sha:state.testPlan.tag_sha_1},
      time_stamp:'',
  }
    return new Promise((resolve, reject) => {
      getTestPlan_editinfo_api(id,params)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })

  },
  //测试计划查询
  getTestPlanData_action_get(context) {
    let param ={
      pageNumber:state.testPlan.pagination.current,
      pageSize:state.testPlan.pagination.pageSize,
      queryField:{
        "data.plan_name":state.testPlan.filter.name
      }
    }
    return new Promise((resolve, reject) => {
      getTestPlanTableData_action_get(param)
        .then(response => {
          context.commit('GET_TESTPLAN', response)
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //测试计划运行
  getTestCasePlan_action_runPlan(context,param){
   
    param.market.forEach(item=>{
      if(item.name == "沪深市场"){
        if(item.permission[0]=="1"){
            state.testPlan.Level = "1"
        }else{
          state.testPlan.Level = "2"
        }
      }else{
        state.testPlan.HKPerms = item.permission
      }
    })
    //执行方法用例数据处理
    var dealMethod = param.methods
    dealMethod.forEach(item=>{
      delete item.method_des
      delete item.interfacename
      item.testcases.forEach(cases=>{
        delete cases.case_name
        delete cases.case_name_des
        delete cases.param
      })
    })
    state.testPlan.transferMethods = []
    dealMethod.forEach(item=>{
      state.testPlan.transferMethods.push({"testcaseID":item.method_name,"paramStrs":item.testcases})
    })
    //tag_id和tag_sha数据处理
    var tag1 =[]
    var tag2 =[]
    var tag =[]
    tag1.push(param.sdk_release_info.tag_id)
    tag1.push(param.sdk_release_info.tag_sha)
    tag.push(tag1)
    if(param.sdk_release_info_1.tag_id != ""){
      tag2.push(param.sdk_release_info_1.tag_id)
      tag2.push(param.sdk_release_info_1.tag_sha)
      tag.push(tag2)
    }    
    //运行环境数据处理
    state.testPlan.server.push({"serverSites1":param.tp_environment1.serverSites1})
    state.testPlan.server.push({"serverSites2":param.tp_environment2.serverSites2})
    //运行时间处理

    let dag_id = param.dag_id
    let params ={"conf": {
			"collectionName": param.collectionName,
			"Level": state.testPlan.Level,
			"HKPerms": state.testPlan.HKPerms,
			"roundIntervalSec": param.roundIntervalSec,
			"tag": tag,
			"AirflowMethod":state.testPlan.transferMethods,
      "server":state.testPlan.server,
      "run_times":param.run_times ,
			"quote_detail":param.quote_detail,			
			"plan_type":param.plan_type
        },
      //"execution_date": '2020-04-07 03:16:18',
    }
    return new Promise((resolve, reject) => {
      getRunPlan_action_api(dag_id,params)
        .then(response => {
          context.commit('GET_TESTPLAN_RES', response)
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
    

    },

    //运行成功后将time_stamp字段更新
    getTestCasePlan_action_addTimeStamp(context, param) {
      var id = param.id
      let params ={
      "content":[{"key":"data.time_stamp","value":param.time_stamp},{"key":"data.state","value":"运行中"}]
      }
      //const res =getTestCasePlan_addTimeStamp_api(id,params)
      return new Promise((resolve, reject) => {
        getTestCasePlan_addTimeStamp_api(id,params)
          .then(response => {
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })

    },
    
    //得到版本对应的tag_ig和tag_sha
    getmethod_action_getTag(context, param) {      
      return new Promise((resolve, reject) => {
        getSDKinterface_getparam_api(param)
          .then(response => {
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    //获取两个版本相同的方法
    getsamemethod_action(context, param){
      return new Promise((resolve, reject) => {
        console.log(param)
        getsamemethod_action_api(param)
          .then(response => {
            context.commit('GET_samemethodlist', response)
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    
    //获取两个版本相同的用例
    getsamemethod_action_case(context, param){
      return new Promise((resolve, reject) => {
        console.log(param)
        getsamemethod_action_api(param)
          .then(response => {
            context.commit('GET_samecaselist', response)
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    //测试计划页面获取版本下的方法列表
    getmethod_action_get(context, param) {
      
      return new Promise((resolve, reject) => {
        getSDKinterface_getparam_api(param)
          .then(response => {
            context.commit('GET_methodlist_GET', response)
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    //获取方法对应的用例列表
    getmethod_action_get1(context, param) {
      return new Promise((resolve, reject) => {
        getSDKinterface_getparam_api(param)
          .then(response => {
            context.commit('GET_methodlist_GET1', response)
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
     //查询测试计划运行状态
    getTestPlan_action_state(context, param){
      var dag_id =param.dag_id
      //var dag_id ='android_test'
      var time = param.time_stamp
      
      return new Promise((resolve, reject) => {
        getTestPlan_state_api(dag_id,time)
          .then(response => {
            context.commit('GET_TestPlan_state', response)
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })

    },

    //将查询的计划状态返回给后台，并对完成的进行结果查询
    getTestPlan_action_findResult(context, param){
      var id = param.id
      var collectionName = 'compare_result'
      let params =[
                    {"content":[{"key":"data.state","value":param.state}]},
                    {"jobID":param.time_stamp},
                    {"planName":param.plan_name},
                    {"quoteDetail":param.quote_detail},
                    {"detailType":param.detail_type}
                  ]   
      //const res = TestPlan_getState_result_api(id,collectionName,params)
      return new Promise((resolve, reject) => {
        TestPlan_getState_result_api(id,collectionName,params)
          .then(response => {
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })

    },

  //-------------------测试结果Start-------------------------
    getTestResult_PlanName(context,param) {
      const res = getTestResult_PlanName_api()
      res.then(function (response) {
        context.commit('GET_TESTPLAN_NAME', response)
      })
    },
  
    getTestResult_PlanQuestions(context,param) {
      // const res = getTestResult_PlanQuestions_api(param)
      // res.then(function (response) {
      //   context.commit('GET_TESTPLAN_QUESTIONS', response)
      // })
      return new Promise((resolve, reject) => {
        getTestResult_PlanQuestions_api(param)
          .then(response => {
            context.commit('GET_TESTPLAN_QUESTIONS', response)
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    //更新是否有测试报告标志
    getTestResult_reflashFlag(context,param){
      var id = param
      let params ={
        "content":[{"key":"reportFlag","value":"1"}]
        }
      return new Promise((resolve, reject) => {
        getTestResult_reflashFlag_api(id,params)
          .then(response => {
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
  
    getTestResult_CheckAndIgnoreOptions(context,param){
      return new Promise((resolve, reject) => {
        getTestResult_CheckAndIgnoreOptions_api(param.id,param)
          .then(response => {
            context.commit('GET_TESTPLAN_CHECKANDIGNOREOPTIONS', response)
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
  },

  getTestResult_PlanReport(context,param) {
    // const res = getTestResult_PlanReport_api(param)
    // res.then(function (response) {
    //   context.commit('GET_TESTPLAN_PLANREPORT', response)
    // })
    return new Promise((resolve, reject) => {
      getTestResult_PlanReport_api(param)
        .then(response => {
          context.commit('GET_TESTPLAN_PLANREPORT', response)
        
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getTestReport_PlanName(context,param) {
    return new Promise((resolve, reject) => {
      getTestReport_Planlist_api(param)
        .then(response => {
          context.commit('GET_TESTRESULT_REPORTLIST', response)
        
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  //--------------------------End----------------------------
}



export default {
  namespaced: true,
  state,
  mutations,
  actions
}
