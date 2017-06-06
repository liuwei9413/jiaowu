<template>
  <div class="editstudent">
    <!-- <left-sidebar></left-sidebar> -->
    <!-- <right-wrap></right-wrap> -->

    <div class="main-content" v-loading.fullscreen.lock="fullscreenLoading">
      <div class="save">
        <a  href="javascript:;"  @click="remindSave" class=" icon-back">返回 </a>
       <!-- <el-button type="success" icon="edit" @click="cancelOrgInfoForm" v-if="isEditing">取消</el-button>-->
        <el-button type="success" style="float: right;" @click="savestudentInfoForm" v-if="type != 'detail'"><i class="icon-conserve"></i> <span>保存</span></el-button>
      </div>

        <!-- type="border-card" -->
      <el-form ref="form" :model="studentInfoForm.studentChangeToPage" :rules="studentInfoRules" label-width="130px" class="edit"  :show-message="type != 'detail'" :class="[{ editing:type != 'detail' }] " >
      <!--选择班级年级-->
      <div class="title"><i></i>
        <span>所在年级班级</span></div>

      <el-form-item label="年级：" prop="gradeId">
        <span>{{studentInfoForm.gradeName}}</span>
       <!-- <div v-model="studentInfoForm.gradeId">
          <span :label="grade.index" v-for="(grade,index) in gradeList" :key="index">{{grade.name}}
          </span>
        </div>-->
      </el-form-item>
      <el-form-item label="班级：" prop="classIndex">
      <!--  <div v-model="studentInfoForm.classIndex" v-if="studentInfoForm.gradeId">
          <span :label="classes.index" v-for="(classes,index) in gradeList[studentInfoForm.gradeId].classList" :key="index">
            {{classes.name}}
          </span>
        </div>-->
        <span>{{studentInfoForm.className}}</span>
      </el-form-item>

      <div class="title"><i></i><span>学生基本信息</span></div>


                <el-form-item label="请输入学籍号：" prop="sid">
                  <span>{{studentInfoForm.studentChangeToPage.sid}}</span>
                </el-form-item>
                <el-form-item label="姓名："  prop="name">
                  <el-input v-model.trim="studentInfoForm.studentChangeToPage.name"  class="inputWidth"></el-input>
                  <p>{{studentInfoForm.studentChangeToPage.name}}</p>
                </el-form-item>

                <el-form-item label="性别：" prop="sex">
                  <el-radio-group v-model="studentInfoForm.studentChangeToPage.sex">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                  </el-radio-group>
                  <p v-if="studentInfoForm.studentChangeToPage.sex =='1'">男</p>
                  <p v-if="studentInfoForm.studentChangeToPage.sex =='2'">女</p>
                </el-form-item>
                <!--民族-->
                <el-form-item label="民族："  prop="nation" >
          <el-select v-model="studentInfoForm.studentChangeToPage.nation"   class="inputWidth" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <p>{{studentInfoForm.studentChangeToPage.nation}}</p>
        </el-form-item>
              <!--  <minority></minority>-->
                <!--民族结束-->
                <el-form-item label="身份证号：" prop="idCard">
                  <el-input v-model.trim="studentInfoForm.studentChangeToPage.idCard" class="inputWidth"></el-input>
                  <p>{{studentInfoForm.studentChangeToPage.idCard}}</p>
                </el-form-item>
                <el-form-item label="出生年月日："  prop="birthday">
                      <el-date-picker type="date" placeholder="选择日期" v-model="studentInfoForm.studentChangeToPage.birthday"   style="width: 288px"></el-date-picker>
                  <p>{{studentInfoForm.studentChangeToPage.birthday}}</p>
                </el-form-item>

        <el-form-item class="block" label="入学年份：" prop="schoolYear">
          <el-date-picker
            v-model="studentInfoForm.studentChangeToPage.schoolYear"
            align="right"
            type="year"
          style="width: 288px"
            placeholder="选择年">
          </el-date-picker>
          <p>{{studentInfoForm.studentChangeToPage.schoolYear}}</p>
        </el-form-item>
                <el-form-item label="是否是独生子女：" prop="isOneChile">
                  <el-radio-group v-model="studentInfoForm.studentChangeToPage.isOneChile">
                    <el-radio label="1" value="1">是</el-radio>
                    <el-radio label="0" value="0">否</el-radio>
                  </el-radio-group>
                  <p v-if="studentInfoForm.studentChangeToPage.isOneChile==1">是</p>
                  <p v-if="studentInfoForm.studentChangeToPage.isOneChile==0">否</p>
                </el-form-item>
                <el-form-item label="是否住校" prop="isZhuXiao">
                  <el-radio-group v-model="studentInfoForm.studentChangeToPage.isZhuXiao">
                    <el-radio label="1" value="1">是</el-radio>
                    <el-radio label="0" value="0">否</el-radio>
                  </el-radio-group>
                  <p v-if="studentInfoForm.studentChangeToPage.isZhuXiao==1">是</p>
                  <p v-if="studentInfoForm.studentChangeToPage.isZhuXiao==0">否</p>
                </el-form-item>
                <el-form-item label="监护人：" prop="guardian">
                  <el-select v-model="studentInfoForm.studentChangeToPage.guardian" class="inputWidth" placeholder="请选择监护人">
                    <el-option label="有父或母照料" value="有父或母照料"></el-option>
                    <el-option label="祖辈照料" value="祖辈照料"></el-option>
                    <el-option label="托管给亲戚" value="托管给亲戚"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                 <!-- <p v-if="studentInfoForm.guardian==1">有</p>
                  <p v-if="studentInfoForm.guardian==0">无</p>-->
                  <p>{{studentInfoForm.studentChangeToPage.guardian}}</p>
                </el-form-item>
                <span class="title"><i></i>
                  <span>家庭信息</span></span>

                <el-form-item label="父亲学历：" prop="fatherDucation">
                  <el-select v-model="studentInfoForm.studentChangeToPage.fatherDucation" class="inputWidth" placeholder="请选择父亲学历">
                    <el-option label="小学" value="小学"></el-option>
                    <el-option label="初中" value="初中"></el-option>
                    <el-option label="高中" value="高中"></el-option>
                    <el-option label="中专" value="中专"></el-option>
                    <el-option label="大专" value="大专"></el-option>
                    <el-option label="本科" value="本科"></el-option>
                    <el-option label="硕士及以上" value="硕士及以上"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                  <p>{{studentInfoForm.studentChangeToPage.fatherDucation}}</p>
                </el-form-item>
                <el-form-item label="父亲职业：" prop="fatherCareer">
                  <el-select v-model="studentInfoForm.studentChangeToPage.fatherCareer" class="inputWidth" placeholder="请选择父亲学历">
                    <el-option label="国企员工" value="国企员工"></el-option>
                    <el-option label="公务员" value="公务员"></el-option>
                    <el-option label="事业人员" value="事业人员"></el-option>
                    <el-option label="私企员工" value="私企员工"></el-option>
                    <el-option label="企业主" value="企业主"></el-option>
                    <el-option label="个体户" value="个体户"></el-option>
                    <el-option label="自由职业" value="自由职业"></el-option>
                    <el-option label="农民" value="农民"></el-option>
                    <el-option label="军人" value="军人"></el-option>
                  </el-select>
                  <p>{{studentInfoForm.studentChangeToPage.fatherCareer}}</p>
                </el-form-item>
                <el-form-item label="电话：" prop="fatherPhone">
                  <el-input v-model.trim="studentInfoForm.studentChangeToPage.fatherPhone" class="inputWidth"></el-input>
                  <p>{{studentInfoForm.studentChangeToPage.fatherPhone}}</p>
                </el-form-item>

                <el-form-item label="母亲学历：" prop="motherDucation">
                  <el-select v-model="studentInfoForm.studentChangeToPage.motherDucation" class="inputWidth" placeholder="请选择母亲学历">
                    <el-option label="小学" value="小学"></el-option>
                    <el-option label="初中" value="初中"></el-option>
                    <el-option label="高中" value="高中"></el-option>
                    <el-option label="中专" value="中专"></el-option>
                    <el-option label="大专" value="大专"></el-option>
                    <el-option label="本科" value="本科"></el-option>
                    <el-option label="硕士及以上" value="硕士及以上"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                  <p>{{studentInfoForm.studentChangeToPage.motherDucation}}</p>
                </el-form-item>
                <el-form-item label="母亲职业：" prop="motherCareer">
                  <el-select v-model="studentInfoForm.studentChangeToPage.motherCareer" class="inputWidth" placeholder="请选择母亲职业">
                    <el-option label="国企员工" value="国企员工"></el-option>
                    <el-option label="公务员" value="公务员"></el-option>
                    <el-option label="事业人员" value="事业人员"></el-option>
                    <el-option label="私企员工" value="私企员工"></el-option>
                    <el-option label="企业主" value="企业主"></el-option>
                    <el-option label="个体户" value="个体户"></el-option>
                    <el-option label="自由职业" value="自由职业"></el-option>
                    <el-option label="农民" value="农民"></el-option>
                    <el-option label="军人" value="军人"></el-option>
                  </el-select>
                  <p>{{studentInfoForm.studentChangeToPage.motherCareer}}</p>
                </el-form-item>
                <el-form-item label="电话：" prop="motherPhone">
                  <el-input v-model.trim="studentInfoForm.studentChangeToPage.motherPhone" class="inputWidth"></el-input>
                  <p>{{studentInfoForm.studentChangeToPage.motherPhone}}</p>
                </el-form-item>
              </el-form>
            </div>


  </div>
</template>

<script>
  // import leftSidebar from './leftSidebar.vue';
  // import rightWrap from './rightWrap.vue';
  if(!Array.prototype.remove) {
    Array.prototype.remove = function(item) {
      var i = this.indexOf(item);
      if(i === -1) {
        return;
      }
      this.splice(i, 1);
    };
  }
  function arrange(source) {
    var t;
    var ta;
    var r = [];

    source.forEach(function(v) {
      if (t === v) {
        ta.push(t);
        t++;
        return;
      }

      ta = [v];
      t = v + 1;
      r.push(ta);
    });

    return r;
  }
  var grads_default = [
    {
      checked:false,
      name:'一年级',
      display: true
    },
    {
      checked:false,
      name:'二年级',
      display: true
    },
    {
      checked:false,
      name:'三年级',
      display: true
    },
    {
      checked:false,
      name:'四年级',
      display: true
    },
    {
      checked:false,
      name:'五年级',
      display: true
    },
    {
      checked:false,
      name:'六年级',
      display: true
    },
    {
      checked:false,
      name:'初一',
      display: true
    },
    {
      checked:false,
      name:'初二',
      display: true
    },
    {
      checked:false,
      name:'初三',
      display: true
    },
    {
      checked:false,
      name:'初四',
      display: false
    },
    {
      checked:false,
      name:'高一',
      display: true
    },
    {
      checked:false,
      name:'高二',
      display: true
    },
    {
      checked:false,
      name:'高三',
      display: true
    }
  ];



  export default {
    data() {
      return {
        //民族选项
        options: [{
          value: '汉族',
          label: '汉族'
        },{
          value: '阿昌族',
          label: '阿昌族'
        }, {
          value: '傈僳族',
          label: '傈僳族'
        }, {
          value: '水族',
          label: '水族'
        },{
          value: '白族',
          label: '白族'
        },{
          value: '高山族',
          label: '高山族'
        }, {
          value: '珞巴族',
          label: '珞巴族'
        }, {
          value: '塔吉克族',
          label: '塔吉克族'
        },{
          value: '保安族',
          label: '保安族'
        },{
          value: '仡佬族',
          label: '仡佬族'
        },{
          value: '满族',
          label: '满族'
        },{
          value: '塔塔尔族',
          label: '塔塔尔族'
        },{
          value: '布朗族',
          label: '布朗族'
        },{
          value: '哈尼族',
          label: '哈尼族'
        },{
          value: '毛南族',
          label: '毛南族'
        },{
          value: '土家族',
          label: '土家族'
        },{
          value: '布依族',
          label: '布依族'
        },{
          value: '哈萨克族',
          label: '哈萨克族'
        },{
          value: '门巴族',
          label: '门巴族'
        },{
          value: '土族',
          label: '土族'
        },{
          value: '朝鲜族',
          label: '朝鲜族'
        },{
          value: '蒙古族',
          label: '蒙古族'
        },{
          value: '佤族',
          label: '佤族'
        },{
          value: '达斡尔族',
          label: '达斡尔族'
        },{
          value: '赫哲族',
          label: '赫哲族'
        },{
          value: '苗族',
          label: '苗族'
        },{
          value: '维吾尔族',
          label: '维吾尔族'
        },{
          value: '傣族',
          label: '傣族'
        },{
          value: '回族',
          label: '回族'
        },{
          value: '仫佬族',
          label: '仫佬族'
        },{
          value: '乌孜别克族',
          label: '乌孜别克族'
        },{
          value: '基诺族',
          label: '基诺族'
        },{
          value: '纳西族',
          label: '纳西族'
        },{
          value: '锡伯族',
          label: '锡伯族'
        },{
          value: '东乡族',
          label: '东乡族'
        },{
          value: '京族',
          label: '京族'
        },{
          value: '怒族',
          label: '怒族'
        },{
          value: '瑶族',
          label: '瑶族'
        },{
          value: '侗族',
          label: '侗族'
        },{
          value: '景颇族',
          label: '景颇族'
        },{
          value: '普米族',
          label: '普米族'
        },{
          value: '彝族',
          label: '彝族'
        },{
          value: '独龙族',
          label: '独龙族'
        },{
          value: '柯尔克孜族',
          label: '柯尔克孜族'
        },{
          value: '羌族',
          label: '羌族'
        },{
          value: '裕固族',
          label: '裕固族'
        },{
          value: '俄罗斯族',
          label: '俄罗斯族'
        },{
          value: '撒拉族',
          label: '撒拉族'
        },{
          value: '藏族',
          label: '藏族'
        },{
          value: '鄂伦春族',
          label: '鄂伦春族'
        },{
          value: '黎族',
          label: '黎族'
        },{
          value: '畲族',
          label: '畲族'
        },{
          value: '壮族',
          label: '壮族'
        },{
          value: '拉祜族',
          label: '拉祜族'
        }],
        type:this.$route.params.type,
        value:'',
        // 全屏遮罩层
        fullscreenLoading: true,
        // 编辑输入框
        birthday:'',
        gradeList: {},
        studentInfoForm:{
         /* birthday:'',*/
         studentChangeToPage:{



          sid:'',
          name:'',
          sex:'',
          birthday:'',
          nation:'',
          national: '',
          idCard:'',


          schoolYear:'',
          isOneChile:'',
          isZhuXiao:'',
          guardian:'',
          //
          fatherDucation:'',
          fatherCareer:'',
          fatherPhone:'',
          motherDucation:'',
          motherCareer:'',
          motherPhone:'',
         }
        },
        studentInfoForm2:'',
        //民族参数
        restaurants: [],
        nation: '',
        // 校验
        studentInfoRules: {
         /* classIndex: [
            { required: true, message: '请选择班级', trigger: 'blur' },
          ],
          gradeId: [
            { required: true, message: '请选择年级', trigger: 'blur' },
          ],*/
          name: [
            {required: true, message: '姓名不能为空！', trigger: 'blur' },
            {pattern:/^[\S]{2,40}$/,message: '姓名输入在2~40个字！'}
          ],
          sex: [
            { required: true, message: '性别不能为空！', trigger: 'change' }
          ],
          nation: [
            { required: true, message: '民族不能为空！', trigger: 'change' },
          ],
          idCard: [
            { required: false, message: '请输入身份证号', trigger: 'blur' },
            {pattern: /^([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9xX]))|((yt)\S{0,18})$/i,message: '身份证号格式输入错误！'},
          ],
         /* date1: [
            { type: 'date', required: false, message: '请选择日期', trigger: 'change' }
          ],*/
          fathereducation : [
            { required: false, message: '请选择父亲学历', trigger: 'change' }
          ],
          fatherprofession : [
            { required: false, message: '请选择父亲职业', trigger: 'change' }
          ],
          fatherPhone: [
            { required: false, message: '请输入电话', trigger: 'blur' },
            {pattern:/^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/,message: '电话格式输入错误'},
          ],
          motherPhone: [
            { required: false, message: '请输入电话', trigger: 'blur' },
            {pattern: /^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/,message: '电话格式输入错误'},
          ]
        },


        // 编辑切换
        isEditing:false,

      }
    },
   /* beforeCreate() {
      let that = this
      //获取班级列表
      that.$ajax('/schadmin/getGradeList', {schoolId: 1})
        .then(res => {
          if(res.code == 200 && res.data && res.data.length) {
            that.gradeList = {};
            res.data.forEach((grade, index) => {
              if(!that.gradeList[grade.index]) {
                that.gradeList[grade.index] = grade;
              }
            })
            console.log(that.gradeList);
          }
        });
    },*/
    mounted(){
     /* this.getOrgTree()
      this.getOrgUserLists()
      this.getAreaTree()
      // this.getOrgInfo(this.orgInfoId)*/
      this.getOrgInfo();

    },
    methods: {
      //返回提醒保存
      remindSave(){
        if (this.type == 'detail'|| !this.searchIsOk) {
          this.$router.go(-1);
          return;
        } else {
          this.$confirm('当前界面存在编辑操作是否保存', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //确定
            /*this.$router.replace('/eduSchoolManagement');*/
//            this.$router.go(-1);
            this.savestudentInfoForm();
            //保存
          }).catch(() => {
            //取消
            this.$router.go(-1);
          });
        }
      },
      // 获取学生基本信息
      getOrgInfo(id){
        let params={
          id:this.$route.params.id,//425120
        };
        this.$ajax('/teacher/getOneStu',params)
          .then(res => {
            this.studentInfoForm=res.data;
            this.studentInfoForm2=_.cloneDeep(this.studentInfoForm);
            this.fullscreenLoading=false;
          });
      },
      //编辑保存学生基本信息
      savestudentInfoForm(){

        var nowDate = this.studentInfoForm.studentChangeToPage.birthday;
        if( Object.prototype.toString.call(nowDate) === '[object Date]'){
          var nowMonth = (nowDate.getMonth() + 1) > 9 ? (nowDate.getMonth() + 1) : ('0' + (nowDate.getMonth() + 1));
          var nowday = (nowDate.getDate() ) > 9 ? (nowDate.getDate()) : ('0' + (nowDate.getDate()));
          nowDate = nowDate.getFullYear() + '-' + nowMonth + '-' + nowday;
        }
        this.studentInfoForm.studentChangeToPage.birthday = nowDate;
        this.studentInfoForm.studentChangeToPage.schoolYear = Object.prototype.toString.call(this.studentInfoForm.studentChangeToPage.schoolYear) === '[object Date]' ? this.studentInfoForm.studentChangeToPage.schoolYear.getFullYear() : this.studentInfoForm.studentChangeToPage.schoolYear;

        let params={
          id:this.$route.params.id,
          name: this.studentInfoForm.studentChangeToPage.name,
          sex: this.studentInfoForm.studentChangeToPage.sex,
          national: this.studentInfoForm.studentChangeToPage.nation,
          idCard: this.studentInfoForm.studentChangeToPage.idCard,
          schoolYear: this.studentInfoForm.studentChangeToPage.schoolYear,
          isOneChile: this.studentInfoForm.studentChangeToPage.isOneChile,
          isZhuXiao: this.studentInfoForm.studentChangeToPage.isZhuXiao,
          guardian: this.studentInfoForm.studentChangeToPage.guardian,
          birthday:this.studentInfoForm.studentChangeToPage.birthday,
          fatherDucation: this.studentInfoForm.studentChangeToPage.fatherDucation,
          fatherCareer: this.studentInfoForm.studentChangeToPage.fatherCareer,
          fatherPhone: this.studentInfoForm.studentChangeToPage.fatherPhone,
          motherDucation: this.studentInfoForm.studentChangeToPage.motherDucation,
          motherCareer: this.studentInfoForm.studentChangeToPage.motherCareer,
          motherPhone: this.studentInfoForm.studentChangeToPage.motherPhone,
         /* orgId: this.selectedCounty || this.selectedCity || this.selectedProvince,*/
        };

        this.$ajax('/teacher/updateOneStudent',params)
          .then(res => {
            if(res.code == 200){
              this.$alert(res.message, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.go(-1);
                }
              });
              this.isEditing=false;
            }else{
              this.$alert(res.message, '提示', {
                confirmButtonText: '确定',
              });
              this.isEditing=false;
            }
          });
      },
      // 编辑机构信息
      editOrgInfoForm(){

        this.isEditing=true;

      },

      // 取消机构信息
      cancelOrgInfoForm(){
        this.isEditing=false;
        this.getOrgInfo(this.orgInfoId)

      },
      setValue:function(){
        this. studentInfoForm2=_.cloneDeep(this. studentInfoForm);
      }
    },
    created: function() {
      this.grads = JSON.parse(JSON.stringify(grads_default));
    },
    watch: {
      studentInfoForm: {
        handler: function (after, before) {
          var _this = this;
          console.log(JSON.stringify(after))
          console.log(JSON.stringify(_this. studentInfoForm2));
          this.searchIsOk = JSON.stringify(after) !== JSON.stringify(_this. studentInfoForm2);

//          this.searchIsOk = Object.keys(after).some( function( prop ) {
//            return after[prop] !== _this.teacherInfoForm2[prop];
//          });
          console.log(this.searchIsOk);
          this.setValue();
        },
        deep: true
      }
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  /* 系统自带*/
  .editstudent  .el-form-item {
    margin-bottom: 14px;
  }
  .editstudent .el-form-item__error {
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    position: absolute;
    top:90%;
    left: 0;
  }
  .editstudent  .el-form-item__label{
    color:#333;
  }
  .editstudent .el-form-item__content{
    height: 36px;
  }
  .editstudent{
    height: 100%;
    width:1004px;
    padding-left: 20px;
    text-align: left;
    display: flex;
    justify-content: space-between;
  }

  .editstudent .save{
    width:984px ;
   padding:15px 0 15px 0;
    border-bottom: 1px solid #e9edf1;
    height: 30px;
    line-height: 30px;
  }
  .editstudent .save a {
    font-size: 14px;
    color: #666;
    line-height: 30px;
  }
  .icon-back:before{
    position: relative;
    top:1px;
  }
  .editstudent .menus{
    width: 200px;
    border: 1px solid #20A0FF;
  }
  .editstudent  .menus-head{
    background: #20A0FF;
    color: #fff;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
  .editstudent  .menus-head .title{
    font-size: 14px;

  }
  .editstudent  .menus-head .add-btn{
    color:#fff;
    border: 1px solid #fff;
    font-size: 12px;
    padding: 2px;
  }
  .editstudent  .seach-bar input{
    height: 30px;
    width: 100%;
    border: 1px solid #20A0FF;
  }
  .editstudent  .main-content{
    width: 984px;
  }
  /* .tabs .el-tabs--border-card>.el-tabs__header .el-tabs__item{
    border-top: 3px solid;
  }
  .tabs .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    border-top: 3px solid;
  } */

  .editstudent  .el-tabs__active-bar{
    top: 0;
  }
  .editstudent  .el-tree-node.is-current{
    color: #20A0FF;
  }
  .editstudent .tabs-header{
    padding-bottom: 10px;
    border-bottom: 1px solid #e9edf1;
  }

  .editstudent .space-between{
    display: flex;
    justify-content: space-between;
  }
  .editstudent .space-around{
    display: flex;
    justify-content: space-around;
  }
  .editstudent .tabs-header .editor{
    padding: 10px;
    display: block;
  }

/* 查看显示p  隐藏输入框*/
  /*输入框*/
  .editstudent .edit .el-input{
    display: none;
  }
  /*下拉框*/
  .editstudent  .edit .el-select{
    display: none;
    /* display: inline-block; */
  }
     /*民族*/
  .editstudent  .edit .el-autocomplete{
    display: none;
  }
      /*单选*/
  .editstudent .edit  .el-radio-group{
    display: none;
  }
  /* 编辑状态隐藏p  显示输入框*/
  .edit.editing p{
  display: none;
  }
     /*输入框*/
  .editstudent .edit.editing .el-input{
    display: inline-block;
  }
     /*下拉框*/
  .editstudent .edit.editing .el-select{
    display: inline-block;
  }
     /*单选*/
  .editstudent .edit.editing .el-radio-group{
       line-height: 36px;
       display: block;
     }







  .editstudent  .pagination{
    margin-top: 30px;
  }
  b{
    font-weight: normal;
  }
  .editstudent  .grads li{list-style:none;float:left;margin-right:10px}
  .editstudent  .grads label{border:1px solid lightblue;width:50px;text-align:center;display:inline-block;cursor:pointer}
  .editstudent .grads li label.disabled{background:lightgray;color:#000;cursor:not-allowed}
  .editstudent .grads li label.checked{background:lightblue;color:#fff}
  .editstudent  .blind{
    clip: rect(1px,1px,1px,1px);
    clip: rect(1px 1px 1px 1px);
    position: absolute;
  }
  /*标题样式*/
  .editstudent .title{
    padding: 20px 0 18px 0;
   /* border-bottom: 1px solid #e9edf1;*/
  }
  .editstudent .title i{
    display: inline-block;
    height:16px;
    width:3px;
    margin-right:7px;
    background:#0d9ee9 ;
    position: relative;
    top:3px;
  }
  .editstudent .title span{
    font-size:14px;
    color: #0d9ee9;
    display:inline-block;
    line-height: 12px;
  }
  .inputWidth{
    width: 288px;
  }
</style>
