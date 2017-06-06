webpackJsonp([32],{203:function(e,t,a){a(324);var o=a(73)(a(257),a(367),null,null);e.exports=o.exports},257:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"admin",data:function(){return{type:this.$route.params.type,value:"",fullscreenLoading:!0,teacherInfoForm:{id:this.$route.params.id,name:"",sex:"",national:"",phone:"",idCard:"",schoolAge:"",firstEducation:"",firstGraduatedFromSchool:"",firstSchoolType:"",firstIfNormal:"",firstGraduationOfYear:"",highestEducation:"",highestGraduatedFromSchool:"",highestSchoolType:"",highestIfNormal:"",highestGraduationOfYear:"",jobTitle:"",educationLeader:"",nowTeacherAge:"",privateTeacher:"",backboneTeacher:"",theLeader:"",fullOrNot:"",note:""},restaurants:[],nation:"",teacherInfoRules:{name:[{required:!0,message:"请输入机构名称",trigger:"change"},{pattern:/^[\u4E00-\u9FA5]+$/,message:"用户名只能为中文"},{min:1,max:30,message:"长度在 1 到 30 个字符"}],national:[{required:!0,message:"请选择民族",trigger:"change"}],sex:[{required:!0,message:"请选择性别",trigger:"change"}],phone:[{required:!0,message:"请输入电话号",trigger:"change"},{pattern:/^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/,message:"请输入正确的电话号码"},{min:11,max:11,message:"请输入11个数字",trigger:"blur"}],idCard:[{required:!1,message:"请输入身份证号",trigger:"change"},{pattern:/^[1-9]\d{13,16}(\d|X)$/,message:"请正确输入身份证号码"}],schoolAge:[{required:!0,message:"请输入教龄",trigger:"change"},{pattern:/^\d{1,2}$/,message:"请输入1到2位数的数字"}],firstEducation:[{required:!0,message:"请选择第一学历",trigger:"change"}]},isEditing:!1}},mounted:function(){this.getteacherInfo(),this.restaurants=this.loadAll()},methods:{querySearch:function(e,t){var a=this.restaurants;t(e?a.filter(this.createFilter(e)):a)},createFilter:function(e){return function(t){return 0===t.value.indexOf(e.toLowerCase())}},loadAll:function(){return[{value:"阿昌族"},{value:"傈僳族"},{value:"水族"},{value:"白族"},{value:"高山族"},{value:"珞巴族"},{value:"塔吉克族"},{value:"保安族"},{value:"仡佬族"},{value:"满族"},{value:"塔塔尔族"},{value:"布朗族"},{value:"哈尼族"},{value:"毛南族"},{value:"土家族"},{value:"布依族"},{value:"哈萨克族"},{value:"门巴族"},{value:"土族"},{value:"朝鲜族"},{value:"汉族"},{value:"蒙古族"},{value:"佤族"},{value:"达斡尔族"},{value:"赫哲族"},{value:"苗族"},{value:"维吾尔族"},{value:"傣族"},{value:"回族"},{value:"仫佬族"},{value:"乌孜别克族"},{value:"基诺族"},{value:"纳西族"},{value:"锡伯族"},{value:"东乡族"},{value:"京族"},{value:"怒族"},{value:"瑶族"},{value:"侗族"},{value:"景颇族"},{value:"普米族"},{value:"彝族"},{value:"独龙族"},{value:"柯尔克孜族"},{value:"羌族"},{value:"裕固族"},{value:"俄罗斯族"},{value:"撒拉族"},{value:"藏族"},{value:"鄂伦春族"},{value:"黎族"},{value:"畲族"},{value:"壮族"},{value:"拉祜族"}]},handleSelect:function(e){console.log(e)},getteacherInfo:function(e){var t=this,a={teacherId:this.$route.params.id};this.$ajax("/teacher/ceneter/getInfo",a).then(function(e){t.teacherInfoForm=e.data,t.fullscreenLoading=!1})},saveteacherInfoForm:function(){var e=this,t={id:this.teacherInfoForm.id,name:this.teacherInfoForm.name,sex:this.teacherInfoForm.sex,national:this.teacherInfoForm.nation,phone:this.teacherInfoForm.phone,idCard:this.teacherInfoForm.idCard,schoolAge:this.teacherInfoForm.schoolAge,firstEducation:this.teacherInfoForm.firstEducation,firstGraduatedFromSchool:this.teacherInfoForm.firstGraduatedFromSchool,firstSchoolType:this.teacherInfoForm.firstSchoolType,firstIfNormal:this.teacherInfoForm.firstIfNormal,firstGraduationOfYear:this.teacherInfoForm.firstGraduationOfYear,highestEducation:this.teacherInfoForm.highestEducation,highestGraduatedFromSchool:this.teacherInfoForm.highestGraduatedFromSchool,highestSchoolType:this.teacherInfoForm.highestSchoolType,highestIfNormal:this.teacherInfoForm.highestIfNormal,highestGraduationOfYear:this.teacherInfoForm.highestGraduationOfYear,jobTitle:this.teacherInfoForm.jobTitle,educationLeader:this.teacherInfoForm.educationLeader,nowTeacherAge:this.teacherInfoForm.privateTeacher,privateTeacher:this.teacherInfoForm.privateTeacher,backboneTeacher:this.teacherInfoForm.backboneTeacher,theLeader:this.teacherInfoForm.theLeader,fullOrNot:this.teacherInfoForm.fullOrNot,note:this.teacherInfoForm.note};this.$ajax("/teacher/ceneter/editInfo",t).then(function(t){200==t.code?(e.$alert("保存成功","标题名称",{confirmButtonText:"确定",callback:function(t){e.$message({type:"info",message:"action: "+t})}}),e.isEditing=!1):(e.$message({type:"error",message:t.message}),e.isEditing=!1)})},editOrgInfoForm:function(){this.isEditing=!0},cancelOrgInfoForm:function(){this.isEditing=!1,this.getOrgInfo(this.orgInfoId)}},watch:{searchText:function(e){this.$refs.orgLists.filter(e)}}}},286:function(e,t,a){t=e.exports=a(182)(),t.push([e.i,"#editteachers{padding:0 20px 20px 50px}#editteachers .text-right{padding-top:5px;height:45px;border-bottom:1px solid #e9edf1}.text-right{text-align:right}.text-left{float:left}.space-between{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.space-around,.space-between{display:-webkit-box;display:-ms-flexbox;display:flex}.space-around{-ms-flex-pack:distribute;justify-content:space-around}.tabs-header .editor{padding:10px;display:block}.edit.editing p,.edit .el-autocomplete,.edit .el-input,.edit .el-radio-group,.edit .el-select,.edit .item-text{display:none}.edit.editing .el-input,.edit.editing .el-select{display:inline-block}.edit.editing .el-radio-group{line-height:36px;display:block}.edit.editing .el-autocomplete,.edit.editing .item-text{display:block}.pagination{margin-top:30px}b{font-weight:400}.blind{clip:rect(1px,1px,1px,1px);clip:rect(1px 1px 1px 1px);position:absolute}.space-between{line-height:50px;float:right;margin-left:20px}.el-table{width:742px;margin:0 auto}.principal-top span{display:inline-block}.principal-top{width:984px;height:50px;line-height:50px;border-bottom:1px solid #e9edf1;margin-bottom:16px}.title{padding:20px 0 18px}.title i{display:inline-block;height:16px;width:3px;margin-right:7px;background:#0d9ee9}.title span{font-size:14px;color:#0d9ee9;display:inline-block;line-height:12px}","",{version:3,sources:["E:/works/platform/yitai-educational/src/main/webapp/src/pages/front/schoolRollFiler/editteachers.vue"],names:[],mappings:"AACA,cACE,wBAA0B,CAC3B,AACD,0BACE,gBAAiB,AACjB,YAAY,AACZ,+BAAiC,CAClC,AACD,YACI,gBAAkB,CACrB,AACD,WACI,UAAY,CACf,AACD,eAII,yBAA0B,AACtB,sBAAuB,AACnB,6BAA+B,CAC1C,AACD,6BAPI,oBAAqB,AACrB,oBAAqB,AACrB,YAAc,CAWjB,AAND,cAII,yBAA0B,AACtB,4BAA8B,CACrC,AACD,qBACI,aAAc,AACd,aAAe,CAClB,AAwBD,+GACE,YAAc,CACf,AAMD,iDACI,oBAAsB,CACzB,AAED,8BACO,iBAAkB,AAClB,aAAe,CACrB,AAKD,wDACI,aAAe,CAClB,AACD,YACI,eAAiB,CACpB,AACD,EACI,eAAoB,CACvB,AACD,OACI,2BAA4B,AAC5B,2BAA4B,AAC5B,iBAAmB,CACtB,AAKD,eACI,iBAAkB,AAClB,YAAa,AACjB,gBAAkB,CACjB,AACD,UAAU,YAAY,aAAe,CACpC,AACD,oBAAoB,oBAAsB,CACzC,AACD,eAAe,YAAY,YAAY,iBAAkB,AAAG,gCAAiC,kBAAmB,CAC/G,AAED,OACI,mBAAuB,CAE1B,AACD,SACI,qBAAsB,AACtB,YAAY,AACZ,UAAU,AACV,iBAAiB,AACjB,kBAAoB,CACvB,AACD,YACI,eAAe,AACf,cAAe,AACf,qBAAqB,AACrB,gBAAkB,CACrB",file:"editteachers.vue",sourcesContent:["\n#editteachers{\n  padding: 0 20px 20px 50px;\n}\n#editteachers .text-right{\n  padding-top: 5px;\n  height:45px;\n  border-bottom: 1px solid #e9edf1;\n}\n.text-right {\n    text-align: right;\n}\n.text-left{\n    float: left;\n}\n.space-between{\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n}\n.space-around{\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: distribute;\n        justify-content: space-around;\n}\n.tabs-header .editor{\n    padding: 10px;\n    display: block;\n}\n\n/* 查看显示p  隐藏输入框*/\n  /*输入框*/\n.edit .el-input{\n    display: none;\n}\n.edit .item-text{\n    display: none;\n}\n  /*下拉框*/\n.edit .el-select{\n    display: none;\n    /* display: inline-block; */\n}\n     /*民族*/\n.edit .el-autocomplete{\n    display: none;\n}\n      /*单选*/\n.edit  .el-radio-group{\n    display: none;\n}\n  /* 编辑状态隐藏p  显示输入框*/\n.edit.editing p{\n  display: none;\n}\n     /*输入框*/\n.edit.editing .el-input{\n    display: inline-block;\n}\n     /*下拉框*/\n.edit.editing .el-select{\n    display: inline-block;\n}\n     /*单选*/\n.edit.editing .el-radio-group{\n       line-height: 36px;\n       display: block;\n}\n.edit.editing .item-text{\n  display: block;\n}\n  /*民族*/\n.edit.editing .el-autocomplete{\n    display: block;\n}\n.pagination{\n    margin-top: 30px;\n}\nb{\n    font-weight: normal;\n}\n.blind{\n    clip: rect(1px,1px,1px,1px);\n    clip: rect(1px 1px 1px 1px);\n    position: absolute;\n}\n /* .el-select .el-input .el-input__icon{\n    right:420px;\n  }*/\n  /*负责人样式*/\n.space-between{\n    line-height: 50px;\n    float: right;\nmargin-left: 20px;\n}\n.el-table{width:742px;margin: 0 auto;\n}\n.principal-top span{display: inline-block;\n}\n.principal-top{width:984px;height:50px;line-height: 50px;   border-bottom: 1px solid #e9edf1;margin-bottom:16px;\n}\n  /*标题样式*/\n.title{\n    padding: 20px 0 18px 0;\n   /* border-bottom: 1px solid #e9edf1;*/\n}\n.title i{\n    display: inline-block;\n    height:16px;\n    width:3px;\n    margin-right:7px;\n    background:#0d9ee9 ;\n}\n.title span{\n    font-size:14px;\n    color: #0d9ee9;\n    display:inline-block;\n    line-height: 12px;\n}\n"],sourceRoot:""}])},324:function(e,t,a){var o=a(286);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);a(183)("1111bec6",o,!0)},367:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"main-content"},[a("div",{attrs:{id:"editteachers"}},[a("div",{staticClass:"tabs-header text-right"},[a("el-button",{staticClass:"text-left",attrs:{type:"text"}},[a("a",{attrs:{href:"/teacherManagement"}},[e._v(" < 返回")])]),e._v(" "),"detail"!=e.type?a("el-button",{attrs:{type:"success",icon:"edit"},on:{click:e.editOrgInfoForm}},[e._v("编辑")]):e._e(),e._v(" "),e.isEditing?a("el-button",{attrs:{type:"success",icon:"edit"},on:{click:e.cancelOrgInfoForm}},[e._v("取消")]):e._e(),e._v(" "),e.isEditing?a("el-button",{attrs:{type:"success",icon:"edit"},on:{click:e.saveteacherInfoForm}},[e._v("保存")]):e._e()],1),e._v(" "),e._m(0),e._v(" "),a("el-form",{ref:"form",staticClass:"edit",class:[{editing:e.isEditing}],attrs:{model:e.teacherInfoForm,rules:e.teacherInfoRules,"label-width":"130px"}},[a("el-form-item",{attrs:{label:"姓名：",prop:"name"}},[a("el-input",{model:{value:e.teacherInfoForm.name,callback:function(t){e.teacherInfoForm.name=t},expression:"teacherInfoForm.name"}}),e._v(" "),a("p",[e._v(" "+e._s(e.teacherInfoForm.name)+" ")])],1),e._v(" "),a("el-form-item",{attrs:{label:"性别",prop:"sex"}},[a("el-radio-group",{model:{value:e.teacherInfoForm.sex,callback:function(t){e.teacherInfoForm.sex=t},expression:"teacherInfoForm.sex"}},[a("el-radio",{attrs:{label:"1"}},[e._v("男")]),e._v(" "),a("el-radio",{attrs:{label:"0"}},[e._v("女")])],1),e._v(" "),"1"==e.teacherInfoForm.sex?a("p",[e._v("男")]):e._e(),e._v(" "),"0"==e.teacherInfoForm.sex?a("p",[e._v("女")]):e._e()],1),e._v(" "),a("el-form-item",{staticClass:"demo-autocomplete",attrs:{label:"民族：",prop:"national"}},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":e.querySearch,placeholder:"请输入内容"},on:{select:e.handleSelect},model:{value:e.teacherInfoForm.national,callback:function(t){e.teacherInfoForm.national=t},expression:"teacherInfoForm.national"}}),e._v(" "),a("p",[e._v(e._s(e.teacherInfoForm.national))])],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号码：",prop:"phone"}},[a("p",{staticStyle:{display:"inline-block"}},[e._v(" "+e._s(e.teacherInfoForm.phone)+" ")]),e._v("   "),a("span",[e._v("手机号码变更")])]),e._v(" "),a("el-form-item",{attrs:{label:"身份证号：",prop:"idCard"}},[a("el-input",{model:{value:e.teacherInfoForm.idCard,callback:function(t){e.teacherInfoForm.idCard=t},expression:"teacherInfoForm.idCard"}}),e._v(" "),a("p",[e._v(e._s(e.teacherInfoForm.idCard))])],1),e._v(" "),a("el-form-item",{attrs:{label:"教龄：",prop:"schoolAge"}},[a("el-input",{model:{value:e.teacherInfoForm.schoolAge,callback:function(t){e.teacherInfoForm.schoolAge=t},expression:"teacherInfoForm.schoolAge"}}),e._v(" "),a("p",[e._v(" "+e._s(e.teacherInfoForm.schoolAge)+" ")])],1),e._v(" "),a("el-form-item",{attrs:{label:"第一学历：",prop:"firstEducation"}},[a("el-select",{attrs:{placeholder:"请选择学历",required:""},model:{value:e.teacherInfoForm.firstEducation,callback:function(t){e.teacherInfoForm.firstEducation=t},expression:"teacherInfoForm.firstEducation"}},[a("el-option",{attrs:{label:"高中",value:"高中"}}),e._v(" "),a("el-option",{attrs:{label:"中专",value:"中专"}}),e._v(" "),a("el-option",{attrs:{label:"大专",value:"大专"}}),e._v(" "),a("el-option",{attrs:{label:"本科",value:"本科"}}),e._v(" "),a("el-option",{attrs:{label:"硕士及以上",value:"硕士及以上"}}),e._v(" "),a("el-option",{attrs:{label:"其他",value:"其他"}})],1),e._v(" "),a("p",[e._v(" "+e._s(e.teacherInfoForm.firstEducation)+" ")])],1),e._v(" "),a("el-form-item",{attrs:{label:"毕业学校：",prop:"firstGraduatedFromSchool"}},[a("el-input",{model:{value:e.teacherInfoForm.firstGraduatedFromSchool,callback:function(t){e.teacherInfoForm.firstGraduatedFromSchool=t},expression:"teacherInfoForm.firstGraduatedFromSchool"}}),e._v(" "),a("p",[e._v(e._s(e.teacherInfoForm.firstGraduatedFromSchool))])],1),e._v(" "),a("el-form-item",{attrs:{label:"高校类别：",prop:"firstSchoolType"}},[a("el-select",{attrs:{placeholder:"请选择高校类别"},model:{value:e.teacherInfoForm.firstSchoolType,callback:function(t){e.teacherInfoForm.firstSchoolType=t},expression:"teacherInfoForm.firstSchoolType"}},[a("el-option",{attrs:{label:"本科提前批次",value:"本科提前批次"}}),e._v(" "),a("el-option",{attrs:{label:"本科第一批次",value:"本科第一批次"}}),e._v(" "),a("el-option",{attrs:{label:"本科第二批次",value:"本科第二批次"}}),e._v(" "),a("el-option",{attrs:{label:"本科第三批次",value:"本科第三批次"}}),e._v(" "),a("el-option",{attrs:{label:"专科",value:"专科"}}),e._v(" "),a("el-option",{attrs:{label:"其他",value:"其他"}})],1),e._v(" "),a("p",[e._v(" "+e._s(e.teacherInfoForm.firstSchoolType)+" 0000")])],1),e._v(" "),a("el-form-item",{attrs:{label:"是否为师范专业：",prop:"firstIfNormal"}},[a("el-radio-group",{model:{value:e.teacherInfoForm.firstIfNormal,callback:function(t){e.teacherInfoForm.firstIfNormal=t},expression:"teacherInfoForm.firstIfNormal"}},[a("el-radio",{attrs:{label:"1"}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:"0"}},[e._v("否")])],1),e._v(" "),"1"==e.teacherInfoForm.firstIfNormal?a("p",[e._v("是")]):e._e(),e._v(" "),"0"==e.teacherInfoForm.firstIfNormal?a("p",[e._v("否")]):a("p")],1),e._v(" "),a("el-form-item",{staticClass:"block",attrs:{label:"毕业时间：",prop:"firstGraduationOfYear"}},[a("el-date-picker",{attrs:{align:"right",type:"year",placeholder:"选择年"},model:{value:e.teacherInfoForm.firstGraduationOfYear,callback:function(t){e.teacherInfoForm.firstGraduationOfYear=t},expression:"teacherInfoForm.firstGraduationOfYear"}}),e._v(" "),a("p",[e._v(e._s(e.teacherInfoForm.firstGraduationOfYear))])],1),e._v(" "),a("el-form-item",{attrs:{label:"最高学历：",prop:"highestEducation"}},[a("el-select",{attrs:{placeholder:"请选择父亲学历"},model:{value:e.teacherInfoForm.highestEducation,callback:function(t){e.teacherInfoForm.highestEducation=t},expression:"teacherInfoForm.highestEducation"}},[a("el-option",{attrs:{label:"高中",value:"高中"}}),e._v(" "),a("el-option",{attrs:{label:"中专",value:"中专"}}),e._v(" "),a("el-option",{attrs:{label:"大专",value:"大专"}}),e._v(" "),a("el-option",{attrs:{label:"本科",value:"本科"}}),e._v(" "),a("el-option",{attrs:{label:"硕士及以上",value:"硕士及以上"}}),e._v(" "),a("el-option",{attrs:{label:"其他",value:"其他"}})],1),e._v(" "),a("p",[e._v(e._s(e.teacherInfoForm.highestEducation))])],1),e._v(" "),a("el-form-item",{attrs:{label:"考取途径：",prop:"highestSchoolType"}},[a("el-select",{attrs:{placeholder:"请选择考取"},model:{value:e.teacherInfoForm.highestSchoolType,callback:function(t){e.teacherInfoForm.highestSchoolType=t},expression:"teacherInfoForm.highestSchoolType"}},[a("el-option",{attrs:{label:"统招",value:"统招"}}),e._v(" "),a("el-option",{attrs:{label:"自考",value:"自考"}}),e._v(" "),a("el-option",{attrs:{label:"成招",value:"成招"}}),e._v(" "),a("el-option",{attrs:{label:"专升本",value:"专升本"}}),e._v(" "),a("el-option",{attrs:{label:"在职",value:"在职"}}),e._v(" "),a("el-option",{attrs:{label:"其他",value:"其他"}})],1),e._v(" "),a("p",[e._v(e._s(e.teacherInfoForm.highestSchoolType))])],1),e._v(" "),a("el-form-item",{attrs:{label:"毕业学校：",prop:"highestGraduatedFromSchool"}},[a("el-input",{model:{value:e.teacherInfoForm.highestGraduatedFromSchool,callback:function(t){e.teacherInfoForm.highestGraduatedFromSchool=t},expression:"teacherInfoForm.highestGraduatedFromSchool"}}),e._v(" "),a("p",[e._v(e._s(e.teacherInfoForm.highestGraduatedFromSchool))])],1),e._v(" "),a("el-form-item",{attrs:{label:"是否为师范专业:",prop:"highestIfNormal"}},[a("el-radio-group",{model:{value:e.teacherInfoForm.highestIfNormal,callback:function(t){e.teacherInfoForm.highestIfNormal=t},expression:"teacherInfoForm.highestIfNormal"}},[a("el-radio",{attrs:{label:"1"}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:"0"}},[e._v("否")])],1),e._v(" "),"1"==e.teacherInfoForm.highestIfNormal?a("p",[e._v("是")]):e._e(),e._v(" "),"0"==e.teacherInfoForm.highestIfNormal?a("p",[e._v("不是")]):a("p")],1),e._v(" "),a("el-form-item",{staticClass:"block",attrs:{label:"毕业时间：",prop:"highestGraduationOfYear"}},[a("el-date-picker",{attrs:{align:"right",type:"year",placeholder:"选择年"},model:{value:e.teacherInfoForm.highestGraduationOfYear,callback:function(t){e.teacherInfoForm.highestGraduationOfYear=t},expression:"teacherInfoForm.highestGraduationOfYear"}}),e._v(" "),a("p",[e._v(e._s(e.teacherInfoForm.highestGraduationOfYear))])],1),e._v(" "),a("div",{staticClass:"title"},[a("i"),e._v(" "),a("span",[e._v("教师个人信息")])]),e._v(" "),a("el-form-item",{attrs:{label:"职称：",prop:"jobTitle"}},[a("el-select",{attrs:{placeholder:"请选择职称"},model:{value:e.teacherInfoForm.jobTitle,callback:function(t){e.teacherInfoForm.jobTitle=t},expression:"teacherInfoForm.jobTitle"}},[a("el-option",{attrs:{label:"正高级",value:"高中"}}),e._v(" "),a("el-option",{attrs:{label:"高级",value:"高级"}}),e._v(" "),a("el-option",{attrs:{label:"一级",value:"一级"}}),e._v(" "),a("el-option",{attrs:{label:"二级",value:"二级"}}),e._v(" "),a("el-option",{attrs:{label:"三级",value:"三级"}}),e._v(" "),a("el-option",{attrs:{label:"无",value:"无"}})],1),e._v(" "),a("p",[e._v(e._s(e.teacherInfoForm.jobTitle))])],1),e._v(" "),a("el-form-item",{attrs:{label:"是否为教务主任",prop:"educationLeader"}},[a("el-radio-group",{model:{value:e.teacherInfoForm.educationLeader,callback:function(t){e.teacherInfoForm.educationLeader=t},expression:"teacherInfoForm.educationLeader"}},[a("el-radio",{attrs:{label:"1"}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:"0"}},[e._v("否")])],1),e._v(" "),"1"==e.teacherInfoForm.educationLeader?a("p",[e._v("是")]):e._e(),e._v(" "),"0"==e.teacherInfoForm.educationLeader?a("p",[e._v("不是")]):e._e()],1),e._v(" "),a("el-form-item",{attrs:{label:"是否为年级班主任或组长",prop:"classTeacher"}},[a("el-radio-group",{model:{value:e.teacherInfoForm.classTeacher,callback:function(t){e.teacherInfoForm.classTeacher=t},expression:"teacherInfoForm.classTeacher"}},[a("el-radio",{attrs:{label:"1"}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:"0"}},[e._v("否")])],1),e._v(" "),"1"==e.teacherInfoForm.classTeacher?a("p",[e._v("是")]):e._e(),e._v(" "),"0"==e.teacherInfoForm.classTeacher?a("p",[e._v("不是")]):e._e()],1),e._v(" "),a("el-form-item",{attrs:{label:"民办教师:",prop:"privateTeacher"}},[a("el-radio-group",{model:{value:e.teacherInfoForm.privateTeacher,callback:function(t){e.teacherInfoForm.privateTeacher=t},expression:"teacherInfoForm.privateTeacher"}},[a("el-radio",{attrs:{label:"1"}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:"0"}},[e._v("否")])],1),e._v(" "),"1"==e.teacherInfoForm.privateTeacher?a("p",[e._v("是")]):e._e(),e._v(" "),"0"==e.teacherInfoForm.privateTeacher?a("p",[e._v("不是")]):e._e()],1),e._v(" "),a("el-form-item",{attrs:{label:"骨干教师：",prop:"backboneTeacher"}},[a("el-radio-group",{model:{value:e.teacherInfoForm.backboneTeacher,callback:function(t){e.teacherInfoForm.backboneTeacher=t},expression:"teacherInfoForm.backboneTeacher"}},[a("el-radio",{attrs:{label:"1"}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:"0"}},[e._v("否")])],1),e._v(" "),"1"==e.teacherInfoForm.backboneTeacher?a("p",[e._v("是")]):e._e(),e._v(" "),"0"==e.teacherInfoForm.backboneTeacher?a("p",[e._v("不是")]):e._e()],1),e._v(" "),a("el-form-item",{attrs:{label:"学科带头人：",prop:"theLeader"}},[a("el-radio-group",{model:{value:e.teacherInfoForm.theLeader,callback:function(t){e.teacherInfoForm.theLeader=t},expression:"teacherInfoForm.theLeader"}},[a("el-radio",{attrs:{label:"1"}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:"0"}},[e._v("否")])],1),e._v(" "),"1"==e.teacherInfoForm.theLeader?a("p",[e._v("是")]):e._e(),e._v(" "),"0"==e.teacherInfoForm.theLeader?a("p",[e._v("不是")]):e._e()],1),e._v(" "),a("el-form-item",{attrs:{label:"专、兼职教研员：",prop:"fullOrNot"}},[a("el-select",{attrs:{placeholder:"请选择职称"},model:{value:e.teacherInfoForm.jobTitle,callback:function(t){e.teacherInfoForm.jobTitle=t},expression:"teacherInfoForm.jobTitle"}},[a("el-option",{attrs:{label:"专职",value:"专职"}}),e._v(" "),a("el-option",{attrs:{label:"兼职",value:"兼职"}}),e._v(" "),a("el-option",{attrs:{label:"否",value:"否"}})],1),e._v(" "),"1"==e.teacherInfoForm.jobTitle?a("p",[e._v("专职")]):e._e(),e._v(" "),"0"==e.teacherInfoForm.jobTitle?a("p",[e._v("兼职")]):e._e(),e._v(" "),"2"==e.teacherInfoForm.jobTitle?a("p",[e._v("否")]):e._e()],1),e._v(" "),a("el-form-item",{attrs:{label:"近三年获奖或发表文章情况:（按照奖项、获奖时间、获奖级别、获奖内容顺序填写）",prop:"note"}},[a("el-input",{staticClass:"item-text",attrs:{type:"textarea"},model:{value:e.teacherInfoForm.note,callback:function(t){e.teacherInfoForm.note=t},expression:"teacherInfoForm.note"}}),e._v(" "),a("p",[e._v(" "+e._s(e.teacherInfoForm.note)+" ")])],1)],1)],1)])},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"title"},[a("i"),a("span",[e._v("教师个人信息")])])}]}}});
//# sourceMappingURL=32.051a894993f93abacea7.js.map