webpackJsonp([15],{198:function(e,t,a){a(330);var l=a(73)(a(252),a(374),null,null);e.exports=l.exports},230:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{restaurants:[],national:""}},methods:{querySearch:function(e,t){var a=this.restaurants;t(e?a.filter(this.createFilter(e)):a)},createFilter:function(e){return function(t){return 0===t.value.indexOf(e.toLowerCase())}},loadAll:function(){return[{value:"阿昌族"},{value:"傈僳族"},{value:"水族"},{value:"白族"},{value:"高山族"},{value:"珞巴族"},{value:"塔吉克族"},{value:"保安族"},{value:"仡佬族"},{value:"满族"},{value:"塔塔尔族"},{value:"布朗族"},{value:"哈尼族"},{value:"毛南族"},{value:"土家族"},{value:"布依族"},{value:"哈萨克族"},{value:"门巴族"},{value:"土族"},{value:"朝鲜族"},{value:"汉族"},{value:"蒙古族"},{value:"佤族"},{value:"达斡尔族"},{value:"赫哲族"},{value:"苗族"},{value:"维吾尔族"},{value:"傣族"},{value:"回族"},{value:"仫佬族"},{value:"乌孜别克族"},{value:"基诺族"},{value:"纳西族"},{value:"锡伯族"},{value:"东乡族"},{value:"京族"},{value:"怒族"},{value:"瑶族"},{value:"侗族"},{value:"景颇族"},{value:"普米族"},{value:"彝族"},{value:"独龙族"},{value:"柯尔克孜族"},{value:"羌族"},{value:"裕固族"},{value:"俄罗斯族"},{value:"撒拉族"},{value:"藏族"},{value:"鄂伦春族"},{value:"黎族"},{value:"畲族"},{value:"壮族"},{value:"拉祜族"}]},handleSelect:function(e){console.log(e)}},mounted:function(){this.restaurants=this.loadAll()}}},231:function(e,t,a){var l=a(73)(a(230),a(232),null,null);e.exports=l.exports},232:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form-item",{staticClass:"demo-autocomplete",attrs:{label:"民族："}},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":e.querySearch,placeholder:"请输入内容"},on:{select:e.handleSelect},model:{value:e.national,callback:function(t){e.national=t},expression:"national"}})],1)},staticRenderFns:[]}},252:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(231),r=a.n(l);t.default={data:function(){return{gradeList:{},studentForm:{schoolId:"1",classIndex:"",gradeId:"",sid:"",name:"",sex:"",nation:"",IDnumber:"",birthday:"",schoolYear:"",isOneChile:"",isZhuXiao:"",guardian:"",fatherDucation:"",fatherCareer:"",fatherPhone:"",motherDucation:"",motherCareer:"",motherPhone:""},studentresData:"",restaurants:[],nation:"",rules:{classIndex:[{required:!0,message:"请选择班级",trigger:"blur"}],gradeId:[{required:!0,message:"请选择年级",trigger:"blur"}],sid:[{required:!0,message:"请输入学籍号",trigger:"change"}],name:[{required:!0,message:"请输入姓名",trigger:"blur"},{pattern:/^[\u4e00-\u9fa5]{2,30}$/,message:"只能输入汉字"}],nation:[{required:!0,message:"请输入民族",trigger:"change"}],sex:[{required:!0,message:"请选择性别",trigger:"change"}],IDnumber:[{required:!0,message:"请输入身份证号",trigger:"blur"},{pattern:/^[1-9](\d{13}|\d{16})(\d|X)$/,message:"请输入正确的身份证号码"}],birthday:[{type:"date",required:!0,message:"请选择日期",trigger:"change"}],fatherPhone:[{pattern:/^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/,message:"请输入正确的身份证号码"}],motherPhone:[{pattern:/^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/,message:"请输入正确的身份证号码"}]}}},mounted:function(){this.restaurants=this.loadAll()},beforeCreate:function(){var e=this;e.$ajax("/schadmin/getGradeList",{schoolId:1}).then(function(t){200==t.code&&t.data&&t.data.length&&(e.gradeList={},t.data.forEach(function(t,a){e.gradeList[t.index]||(e.gradeList[t.index]=t)}),console.log(e.gradeList))})},methods:{querySearch:function(e,t){var a=this.restaurants;t(e?a.filter(this.createFilter(e)):a)},createFilter:function(e){return function(t){return 0===t.value.indexOf(e.toLowerCase())}},loadAll:function(){return[{value:"阿昌族"},{value:"傈僳族"},{value:"水族"},{value:"白族"},{value:"高山族"},{value:"珞巴族"},{value:"塔吉克族"},{value:"保安族"},{value:"仡佬族"},{value:"满族"},{value:"塔塔尔族"},{value:"布朗族"},{value:"哈尼族"},{value:"毛南族"},{value:"土家族"},{value:"布依族"},{value:"哈萨克族"},{value:"门巴族"},{value:"土族"},{value:"朝鲜族"},{value:"汉族"},{value:"蒙古族"},{value:"佤族"},{value:"达斡尔族"},{value:"赫哲族"},{value:"苗族"},{value:"维吾尔族"},{value:"傣族"},{value:"回族"},{value:"仫佬族"},{value:"乌孜别克族"},{value:"基诺族"},{value:"纳西族"},{value:"锡伯族"},{value:"东乡族"},{value:"京族"},{value:"怒族"},{value:"瑶族"},{value:"侗族"},{value:"景颇族"},{value:"普米族"},{value:"彝族"},{value:"独龙族"},{value:"柯尔克孜族"},{value:"羌族"},{value:"裕固族"},{value:"俄罗斯族"},{value:"撒拉族"},{value:"藏族"},{value:"鄂伦春族"},{value:"黎族"},{value:"畲族"},{value:"壮族"},{value:"拉祜族"}]},handleSelect:function(e){console.log(e)},submitForm:function(e){var t=this,a=this.studentForm.birthday,l=a.getMonth()+1>9?a.getMonth()+1:"0"+(a.getMonth()+1);a=a.getFullYear()+"-"+l+"-"+a.getDate(),this.studentForm.birthday=a,this.$ajax("/teacher/saveOneStudent",this.studentForm).then(function(e){200==e.code&&t.$alert("保存成功","标题名称",{confirmButtonText:"确定",callback:function(e){t.$message({type:"info",message:"action: "+e})}})})},resetForm:function(e){this.$refs[e].resetFields()}},components:{Minority:r.a}}},292:function(e,t,a){t=e.exports=a(182)(),t.push([e.i,"#addstudent{padding:0 20px 50px}.saveDiv{height:45px;padding-top:5px;border-bottom:1px solid #e9edf1}.text-right{float:right}.text-left{float:left}.title{padding:20px 0 18px}.title i{display:inline-block;height:16px;width:3px;margin-right:7px;background:#0d9ee9}.title span{font-size:14px;color:#0d9ee9;display:inline-block;line-height:12px}","",{version:3,sources:["E:/works/platform/yitai-educational/src/main/webapp/src/pages/front/schoolRollFiler/addstudens.vue"],names:[],mappings:"AACA,YACE,mBAA0B,CAC3B,AAED,SACE,YAAa,AACb,gBAAiB,AACjB,+BAAiC,CAClC,AACD,YACE,WAAa,CACd,AACD,WACE,UAAY,CACb,AACD,OACE,mBAAuB,CACxB,AACD,SACE,qBAAsB,AACtB,YAAY,AACZ,UAAU,AACV,iBAAiB,AACjB,kBAAoB,CACrB,AACD,YACE,eAAe,AACf,cAAe,AACf,qBAAqB,AACrB,gBAAkB,CACnB",file:"addstudens.vue",sourcesContent:["\n#addstudent{\n  padding: 0 20px 50px 20px;\n}\n/*按钮*/\n.saveDiv {\n  height: 45px;\n  padding-top: 5px;\n  border-bottom: 1px solid #e9edf1;\n}\n.text-right {\n  float: right;\n}\n.text-left {\n  float: left;\n}\n.title{\n  padding: 20px 0 18px 0;\n}\n.title i{\n  display: inline-block;\n  height:16px;\n  width:3px;\n  margin-right:7px;\n  background:#0d9ee9 ;\n}\n.title span{\n  font-size:14px;\n  color: #0d9ee9;\n  display:inline-block;\n  line-height: 12px;\n}\n"],sourceRoot:""}])},330:function(e,t,a){var l=a(292);"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a(183)("3e3350a9",l,!0)},374:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"addstudent"}},[a("el-form",{ref:"studentForm",staticClass:"demo-studentForm",attrs:{model:e.studentForm,rules:e.rules,"label-width":"140px"}},[a("div",[a("div",{staticClass:"saveDiv"},[a("el-button",{staticClass:"text-left",attrs:{type:"text"}},[e._v(" < 返回 ")]),e._v(" "),a("el-button",{staticClass:"text-right",attrs:{type:"primary"},on:{click:function(t){e.submitForm("studentForm")}}},[e._v("保存")])],1),e._v(" "),a("div",{staticClass:"title"},[a("i"),e._v(" "),a("span",[e._v("选择导入班级")])]),e._v(" "),a("el-form-item",{attrs:{label:"年级",prop:"gradeId"}},[a("el-radio-group",{model:{value:e.studentForm.gradeId,callback:function(t){e.studentForm.gradeId=t},expression:"studentForm.gradeId"}},e._l(e.gradeList,function(t,l){return a("el-radio-button",{key:l,attrs:{label:t.index}},[e._v(e._s(t.name)+"\n        ")])}))],1),e._v(" "),a("el-form-item",{attrs:{label:"班级",prop:"classIndex"}},[e.studentForm.gradeId?a("el-radio-group",{model:{value:e.studentForm.classIndex,callback:function(t){e.studentForm.classIndex=t},expression:"studentForm.classIndex"}},e._l(e.gradeList[e.studentForm.gradeId].classList,function(t,l){return a("el-radio-button",{key:l,attrs:{label:t.index}},[e._v("\n            "+e._s(t.name)+"\n        ")])})):e._e()],1)],1),e._v(" "),a("div",{staticClass:"title"},[a("i"),a("span",[e._v("学生信息")])]),e._v(" "),a("el-form-item",{attrs:{label:"请输入学籍号：",prop:"sid"}},[a("el-input",{model:{value:e.studentForm.sid,callback:function(t){e.studentForm.sid=t},expression:"studentForm.sid"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"姓名：",prop:"name"}},[a("el-input",{model:{value:e.studentForm.name,callback:function(t){e.studentForm.name=t},expression:"studentForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"性别",prop:"sex"}},[a("el-radio-group",{model:{value:e.studentForm.sex,callback:function(t){e.studentForm.sex=t},expression:"studentForm.sex"}},[a("el-radio",{attrs:{label:"男",value:"男"}}),e._v(" "),a("el-radio",{attrs:{label:"女",value:"女"}})],1)],1),e._v(" "),a("el-form-item",{staticClass:"demo-autocomplete",attrs:{label:"民族：",prop:"nation"}},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":e.querySearch,placeholder:"请输入内容"},on:{select:e.handleSelect},model:{value:e.studentForm.nation,callback:function(t){e.studentForm.nation=t},expression:"studentForm.nation"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"身份证号",prop:"IDnumber"}},[a("el-input",{model:{value:e.studentForm.IDnumber,callback:function(t){e.studentForm.IDnumber=t},expression:"studentForm.IDnumber"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"出生年月日",required:""}},[a("el-col",{attrs:{span:11}},[a("el-form-item",{attrs:{prop:"birthday"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",format:"yyyy-MM-dd",placeholder:"选择日期"},model:{value:e.studentForm.birthday,callback:function(t){e.studentForm.birthday=t},expression:"studentForm.birthday"}})],1)],1)],1),e._v(" "),a("el-form-item",{staticClass:"block",attrs:{label:"入学年份：",prop:"schoolYear"}},[a("el-date-picker",{attrs:{align:"right",type:"year",placeholder:"选择年"},model:{value:e.studentForm.schoolYear,callback:function(t){e.studentForm.schoolYear=t},expression:"studentForm.schoolYear"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否是独生子女：",prop:"isOneChile"}},[a("el-radio-group",{model:{value:e.studentForm.isOneChile,callback:function(t){e.studentForm.isOneChile=t},expression:"studentForm.isOneChile"}},[a("el-radio",{attrs:{label:"是",value:"1"}}),e._v(" "),a("el-radio",{attrs:{label:"否",value:"0"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"是否住校",prop:"isZhuXiao"}},[a("el-radio-group",{model:{value:e.studentForm.isZhuXiao,callback:function(t){e.studentForm.isZhuXiao=t},expression:"studentForm.isZhuXiao"}},[a("el-radio",{attrs:{label:"是",value:"1"}}),e._v(" "),a("el-radio",{attrs:{label:"否",value:"0"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"监护人：",prop:"guardian"}},[a("el-select",{attrs:{placeholder:"请选择监护人"},model:{value:e.studentForm.guardian,callback:function(t){e.studentForm.guardian=t},expression:"studentForm.guardian"}},[a("el-option",{attrs:{label:"有父或母照料",value:"有父或母照料"}}),e._v(" "),a("el-option",{attrs:{label:"祖辈照料",value:"祖辈照料"}}),e._v(" "),a("el-option",{attrs:{label:"托管给亲戚",value:"托管给亲戚"}}),e._v(" "),a("el-option",{attrs:{label:"其他",value:"其他"}})],1)],1),e._v(" "),a("div",{staticClass:"title"},[a("i"),a("span",[e._v("家庭信息")])]),e._v(" "),a("el-form-item",{attrs:{label:"父亲学历",prop:"fatherDucation"}},[a("el-select",{attrs:{placeholder:"请选择父亲学历"},model:{value:e.studentForm.fatherDucation,callback:function(t){e.studentForm.fatherDucation=t},expression:"studentForm.fatherDucation"}},[a("el-option",{attrs:{label:"小学",value:"小学"}}),e._v(" "),a("el-option",{attrs:{label:"初中",value:"初中"}}),e._v(" "),a("el-option",{attrs:{label:"高中",value:"高中"}}),e._v(" "),a("el-option",{attrs:{label:"中专",value:"中专"}}),e._v(" "),a("el-option",{attrs:{label:"大专",value:"大专"}}),e._v(" "),a("el-option",{attrs:{label:"本科",value:"本科"}}),e._v(" "),a("el-option",{attrs:{label:"硕士及以上",value:"硕士及以上"}}),e._v(" "),a("el-option",{attrs:{label:"其他",value:"其他"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"父亲职业",prop:"fatherCareer"}},[a("el-select",{attrs:{placeholder:"请选择父亲学历"},model:{value:e.studentForm.fatherCareer,callback:function(t){e.studentForm.fatherCareer=t},expression:"studentForm.fatherCareer"}},[a("el-option",{attrs:{label:"国企员工",value:"国企员工"}}),e._v(" "),a("el-option",{attrs:{label:"公务员",value:"公务员"}}),e._v(" "),a("el-option",{attrs:{label:"事业人员",value:"事业人员"}}),e._v(" "),a("el-option",{attrs:{label:"私企员工",value:"私企员工"}}),e._v(" "),a("el-option",{attrs:{label:"企业主",value:"企业主"}}),e._v(" "),a("el-option",{attrs:{label:"个体户",value:"个体户"}}),e._v(" "),a("el-option",{attrs:{label:"自由职业",value:"自由职业"}}),e._v(" "),a("el-option",{attrs:{label:"农民",value:"农民"}}),e._v(" "),a("el-option",{attrs:{label:"军人",value:"军人"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"电话",prop:"fatherPhone"}},[a("el-input",{attrs:{placeholder:"请填写电话"},model:{value:e.studentForm.fatherPhone,callback:function(t){e.studentForm.fatherPhone=t},expression:"studentForm.fatherPhone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"母亲学历：",prop:"motherDucation"}},[a("el-select",{attrs:{placeholder:"请选择母亲学历"},model:{value:e.studentForm.motherDucation,callback:function(t){e.studentForm.motherDucation=t},expression:"studentForm.motherDucation"}},[a("el-option",{attrs:{label:"小学",value:"小学"}}),e._v(" "),a("el-option",{attrs:{label:"初中",value:"初中"}}),e._v(" "),a("el-option",{attrs:{label:"高中",value:"高中"}}),e._v(" "),a("el-option",{attrs:{label:"中专",value:"中专"}}),e._v(" "),a("el-option",{attrs:{label:"大专",value:"大专"}}),e._v(" "),a("el-option",{attrs:{label:"本科",value:"本科"}}),e._v(" "),a("el-option",{attrs:{label:"硕士及以上",value:"硕士及以上"}}),e._v(" "),a("el-option",{attrs:{label:"其他",value:"其他"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"母亲职业：",prop:"motherCareer"}},[a("el-select",{attrs:{placeholder:"请选择母亲职业"},model:{value:e.studentForm.motherCareer,callback:function(t){e.studentForm.motherCareer=t},expression:"studentForm.motherCareer"}},[a("el-option",{attrs:{label:"国企员工",value:"国企员工"}}),e._v(" "),a("el-option",{attrs:{label:"公务员",value:"公务员"}}),e._v(" "),a("el-option",{attrs:{label:"事业人员",value:"事业人员"}}),e._v(" "),a("el-option",{attrs:{label:"私企员工",value:"私企员工"}}),e._v(" "),a("el-option",{attrs:{label:"企业主",value:"企业主"}}),e._v(" "),a("el-option",{attrs:{label:"个体户",value:"个体户"}}),e._v(" "),a("el-option",{attrs:{label:"自由职业",value:"自由职业"}}),e._v(" "),a("el-option",{attrs:{label:"农民",value:"农民"}}),e._v(" "),a("el-option",{attrs:{label:"军人",value:"军人"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"电话：",prop:"motherPhone"}},[a("el-input",{attrs:{placeholder:"请填写电话"},model:{value:e.studentForm.motherPhone,callback:function(t){e.studentForm.motherPhone=t},expression:"studentForm.motherPhone"}})],1)],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=15.d0b761fc98efbc8ef77e.js.map