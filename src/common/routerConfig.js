import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },

    {
      path: '/home',
      component: resolve => require(['../pages/common/Home.vue'], resolve),
      children:[


        /*教育局登陆——开始*/
        {
          path: '/',
          component: resolve => require(['../pages/components/welcome.vue'], resolve)
        },

        {
          //path: '/eduSchoolManagement/:id/:level/:name',
          path: '/eduSchoolManagement',
          name:'eduSchoolManagement',
          component: resolve => require(['../pages/front/education/eduSchoolManagement.vue'], resolve) //教育局——学校管理
        },
        {
          path: '/admin',
          component: resolve => require(['../pages/front/admin/admin.vue'], resolve),
        },
        //教育局登陆的学校的新增--查看-编辑-批量导入
        {
          path: '/eduSchoolManagement/addschool',
          component: resolve => require(['../pages/front/education/addschool.vue'], resolve) //教育局——添加学校
        },
        {
          path: '/eduSchoolManagement/editSchool/:id',
          component: resolve => require(['../pages/front/education/editSchool.vue'], resolve) //教育局——添加学校
        }, {
          path: '/eduSchoolManagement/schoolinfo/:id',
          component: resolve => require(['../pages/front/education/schoolinfo.vue'], resolve) //教育局——查看学校
        },
        {
          path: '/eduSchoolManagement/schoolbatch',
          component: resolve => require(['../pages/front/education/schoolbatch.vue'], resolve) //教育局——批量添加学校
        },

        /*教育局登陆——结束*/
        /*学籍管理员——开始*/

        {
          path: '/password',
          component: resolve => require(['../pages/front/schoolRollFiler/password.vue'], resolve) //1学籍管理员-忘记密码
        },
        {
          path: '/schoolManagement',
          component: resolve => require(['../pages/front/schoolRollFiler/schoolManagement.vue'], resolve)//学籍管理员--学校管理
        },
        {
          path: '/classManagement',
          component: resolve => require(['../pages/front/schoolRollFiler/classManagement.vue'], resolve)//3学籍管理员-班级管理
        },
        {
          path: '/ClassAutomaticallyUpgrade',
          component: resolve => require(['../pages/front/schoolRollFiler/ClassAutomaticallyUpgrade.vue'], resolve)//4学籍管理员-班级自动升级
        },
        {
          path: '/studentManagement',
          component: resolve => require(['../pages/front/schoolRollFiler/studentManagement.vue'], resolve)//5学籍管理员-学生管理
        },
        //学生的添加-查看-编辑-批量导入
        {
          path: '/studentManagement/addstudens',
          name:'addstudens',
          component: resolve => require(['../pages/front/schoolRollFiler/addstudens.vue'], resolve)//5学籍管理员-新增学生
        },
        {
          path: '/studentManagement/editstudent/:type/:id',
          name:'editstudent',
          component: resolve => require(['../pages/front/schoolRollFiler/editstudent.vue'], resolve)//5学籍管理员-编辑查看学生管理
        },
        {
          path: '/studentManagement/schoolRollstudentbatch',
          component: resolve => require(['../pages/front/schoolRollFiler/schoolRollstudentbatch.vue'], resolve)//1学籍管理员-学生批量
        },
        {
          path: '/leaderManagement',
          component: resolve => require(['../pages/front/schoolRollFiler/leaderManagement.vue'], resolve)//6学籍管理员-校领导管理
        },
         {
           path: '/teacherManagement',
           component: resolve => require(['../pages/front/schoolRollFiler/teacherManagement.vue'], resolve)//7学籍管理员-教师管理
         },
        //教师的添加-查看-编辑-批量导入
        {
          path: '/teacherManagement/addteachers',
          component: resolve => require(['../pages/front/schoolRollFiler/addteachers.vue'], resolve)//6学籍管理员-增加教师
        },
        {
          path: '/teacherManagement/editteachers/:type/:id',
          component: resolve => require(['../pages/front/schoolRollFiler/editteachers.vue'], resolve)//6学籍管理员-查看编辑教师
        },
        {
          path: '/teacherManagement/schoolRollteacherbatch',
          component: resolve => require(['../pages/front/schoolRollFiler/schoolRollteacherbatch.vue'], resolve)//4学籍管理员-批量增加教师
        },
        //校领导的添加-查看-编辑-批量导入
        {
          path: '/leaderManagement/addSchoolleader',
          component: resolve => require(['../pages/front/schoolRollFiler/addSchoolleader.vue'], resolve)//6学籍管理员-添加校领导
        },
        {
          path: '/leaderManagement/editSchoolleader/:type/:id',
          component: resolve => require(['../pages/front/schoolRollFiler/editSchoolleader.vue'], resolve)//6学籍管理员-查看编辑校领导
        },
        {
          path: '/leaderManagement/schoolRollleaderbatch',
          component: resolve => require(['../pages/front/schoolRollFiler/schoolRollleaderbatch.vue'], resolve)//4学籍管理员-批量导入校领导
        },
        {
          path: '/teacherManagement',
          component: resolve => require(['../pages/front/schoolRollFiler/teacherManagement.vue'], resolve)//7学籍管理员-教师管理
        },
        {
          path: '/subjectManagement',
          component: resolve => require(['../pages/front/schoolRollFiler/subjectManagement.vue'], resolve)//8学籍管理员-科目管理
        },
        //学科批量导入
        {
          path: '/scoreManagement/subjectbatch',
          component: resolve => require(['../pages/front/schoolRollFiler/subjectbatch.vue'], resolve),//3学籍管理员-学科批量
        },
        //体育批量导入
        {
          path: '/sportManagement/tySubjectbatch',
          component: resolve => require(['../pages/front/schoolRollFiler/tySubjectbatch.vue'], resolve)//3学籍管理员-体育批量导入
        },
        {
          path: '/scoreManagement',
          component: resolve => require(['../pages/front/schoolRollFiler/scoreManagement.vue'], resolve),//9学籍管理员-成绩管理
        },
        {
          path: '/scoreManagement',
          component: resolve => require(['../pages/front/schoolRollFiler/scoreManagement.vue'], resolve)//9学籍管理员-科目成绩管理
        },
        {
          path: '/sportManagement',
          component: resolve => require(['../pages/front/schoolRollFiler/sportManagement.vue'], resolve)//10学籍管理员-体育成绩管理
        },
        {
          path: '/news',
          component: resolve => require(['../pages/front/schoolRollFiler/news.vue'], resolve)//11学籍管理员-消息通知
        },
        {
          name:'querySubjectScore',
          path: '/scoreManagement/querySubjectScore',
          component: resolve => require(['../pages/front/schoolRollFiler/querySubjectScore.vue'], resolve)//9-1学籍管理员-成绩管理--查看科目成绩
        },
        {
          name:'querySportScore',
          path: '/sportManagement/querySportScore',
          component: resolve => require(['../pages/front/schoolRollFiler/querySportScore.vue'], resolve)//10-1学籍管理员-成绩管理--查看体育成绩
        },
        /*学籍管理员——结束*/
        /*教师——开始*/
        {
          path: '/teacherPersonal',
          component: resolve => require(['../pages/front/teacher/teacherPersonal.vue'], resolve)
        },
        {
          path: '/teacherMyClass',
          name:'teacherMyClass',
          component: resolve => require(['../pages/front/teacher/teacherMyClass.vue'], resolve)
        },
        {
          path: '/teacherMyClass/addstudens/',
          name:'teacherMyClassAddstudens',
          component: resolve => require(['../pages/front/teacher/addstudens.vue'], resolve)//教师新建学生
        },
        {
          path: '/teacherMyClass/teacherstudentbatch/',
          name:'teacherstudentbatch',
          component: resolve => require(['../pages/front/teacher/teacherstudentbatch.vue'], resolve)//教师批量导入学生
        },
        {
          path: '/teacherMyClass/editstudent',
          name: 'teacherMyClassEditstudent',
          component: resolve => require(['../pages/front/teacher/editstudent.vue'], resolve)//教师查看编辑页面
        },
        {
          path: '/teacherViewScore',
          component: resolve => require(['../pages/front/teacher/teacherViewScore.vue'], resolve)
        },
        {
          path: '/teacherstudentbatch',
          component: resolve => require(['../pages/front/teacher/teacherstudentbatch.vue'], resolve)  // 2教师批量增加学生
        },
        {
          path: '/Teacherspersonalcenter',
          component: resolve => require(['../pages/front/teacher/Teacherspersonalcenter.vue'], resolve)  // 新增学生信息
        },
        /*教师——结束*/
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../pages/components/Login.vue'], resolve)
    },
    {
      path: '/forgetPassword',
      component: resolve => require(['../pages/components/forgetPassword.vue'], resolve)
    },
    {
      path: '/loginCheck',
      component: resolve => require(['../pages/components/loginCheck.vue'], resolve)
    },
  ]
})
