<template>
  <div id="addteacher">
    <div  class="btns">
      <router-link :to="{ path:  '/teacherManagement' }" class=" icon-back">返回 </router-link>
      <!-- <el-button style="float: right;"  @click="resetForm('ruleForm')" class="white-color el-button el-
 button&#45;&#45;primary"> <i class="icon-cancel"></i><span>取消</span></el-button>-->
      <el-button style="float: right;" class="white-color add-btn el-button el-button--primary"
                 type="primary" @click="saveteacherInfoForm" ><i class="icon-conserve"></i><span>保存</span></el-button>

    </div>
    <!--表单-->
  <el-form :model="teacherInfoForm" :rules="teacherInfoRules"  ref="orgInfoForm" label-width="200px" class="demo-ruleForm">

    <div class="title"><i></i><span>教师个人信息</span></div>
    <el-form-item label="姓名：" prop="name">
      <el-input v-model.trim="teacherInfoForm.name " :maxlength="40"class="inputWidth"></el-input>
    </el-form-item>

    <el-form-item label="性别：" prop="sex">
      <el-radio-group v-model="teacherInfoForm.sex">
        <el-radio label="1" >男</el-radio>
        <el-radio label="2" >女</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="民族："  prop="national" >
      <el-select v-model="teacherInfoForm.national"  class="inputWidth" filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="手机号码：" prop="phone">
      <el-input v-model.trim="teacherInfoForm.phone" class="inputWidth"></el-input>
    </el-form-item>

    <el-form-item label="身份证号：" prop="idCard">
      <el-input v-model.trim="teacherInfoForm.idCard"class="inputWidth"></el-input>
    </el-form-item>

    <el-form-item label="教龄（年）：" prop="schoolAge">
      <el-input v-model.trim="teacherInfoForm.schoolAge" class="inputWidth" :maxlength="2"></el-input>
    </el-form-item>

    <el-form-item label="第一学历：" prop="education" required>
      <el-select v-model="teacherInfoForm.education" placeholder="请选择学历" class="inputWidth" required >
        <el-option label="高中" value="高中"></el-option>
        <el-option label="中专"  value="中专"></el-option>
        <el-option label="大专" value="大专"></el-option>
        <el-option label="本科" value="本科"></el-option>
        <el-option label="硕士及以上" value="硕士及以上"></el-option>
        <el-option label="其他" value="其他"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="毕业学校：" prop="graduatedFromSchool">
      <el-input v-model.trim="teacherInfoForm.graduatedFromSchool" :maxlength="200" class="inputWidth"></el-input>
    </el-form-item>

    <el-form-item label="高校类别：" prop="schoolType">
      <el-select v-model="teacherInfoForm.schoolType" placeholder="请选择高校类别" class="inputWidth">
        <el-option label="本科提前批次" value="本科提前批次" ></el-option>
        <el-option label="本科第一批次" value="本科第一批次"></el-option>
        <el-option label="本科第二批次"  value="本科第二批次"></el-option>
        <el-option label="本科第三批次" value="本科第三批次"></el-option>
        <el-option label="专科" value="专科"></el-option>
        <el-option label="其他" value="其他"></el-option>
      </el-select>
    </el-form-item>

      <el-form-item label="是否为师范专业：" prop="ifNormal">
        <el-radio-group v-model="teacherInfoForm.ifNormal">
          <el-radio label="1" >是</el-radio>
          <el-radio label="0" >否</el-radio>
        </el-radio-group>
    </el-form-item>

    <el-form-item class="block" label="毕业时间：" prop="graduationOfYear">
      <el-date-picker
        v-model="teacherInfoForm.graduationOfYear"
        align="right"
        type="year"
        class="inputWidth"
        placeholder="选择年">
      </el-date-picker>
    </el-form-item>
    <!--第二学历-->
    <el-form-item label="最高学历：" prop="maxEducation">
      <el-select v-model="teacherInfoForm.maxEducation" placeholder="请选择父亲学历" class="inputWidth">
        <el-option label="高中" value="高中"></el-option>
        <el-option label="中专" value="中专"></el-option>
        <el-option label="大专" value="大专"></el-option>
        <el-option label="本科" value="本科"></el-option>
        <el-option label="硕士及以上" value="硕士及以上"></el-option>
        <el-option label="其他" value="其他"></el-option>
      </el-select>

    </el-form-item>

    <el-form-item label="考取途径：" prop="maxGetTheWay">
      <el-select v-model="teacherInfoForm.maxGetTheWay" placeholder="请选择考取" class="inputWidth">
        <el-option label="统招" value="统招"></el-option>
        <el-option label="自考" value="自考"></el-option>
        <el-option label="成招" value="成招"></el-option>
        <el-option label="专升本" value="专升本"></el-option>
        <el-option label="在职" value="在职"></el-option>
        <el-option label="其他"  value="其他"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="毕业学校：" prop="maxGraduatedFromSchool">
      <el-input v-model.trim="teacherInfoForm.maxGraduatedFromSchool" :maxlength="200" class="inputWidth"></el-input>

    </el-form-item>

    <el-form-item label="是否为师范专业：" prop="maxIfNormal">
      <el-radio-group v-model="teacherInfoForm.maxIfNormal">
        <el-radio label="1" >是</el-radio>
        <el-radio label="0" >否</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item class="block" label="毕业时间：" prop="maxGraduationOfYear">
      <el-date-picker
        v-model="teacherInfoForm.maxGraduationOfYear"
        align="right"
        type="year"
        class="inputWidth"
        placeholder="选择年">
      </el-date-picker>

    </el-form-item>




    <div class="title"><i></i>
      <span>教师个人信息</span></div>

    <el-form-item label="职称：" prop="jobTitle">
      <el-select v-model="teacherInfoForm.jobTitle" placeholder="请选择职称" class="inputWidth">
        <el-option label="正高级" value="正高级"></el-option>
        <el-option label="高级" value="高级"></el-option>
        <el-option label="一级" value="一级"></el-option>
        <el-option label="二级" value="二级"></el-option>
        <el-option label="三级" value="三级"></el-option>
        <el-option label="无" value="无"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="是否为教务主任：" prop="educationLeader">
      <el-radio-group v-model="teacherInfoForm.educationLeader">
        <el-radio label="1" >是</el-radio>
        <el-radio label="0" >否</el-radio>
      </el-radio-group>

    </el-form-item>

    <el-form-item label="是否为年级班主任或组长：" prop="classTeacher">
      <el-radio-group v-model="teacherInfoForm.classTeacher">
        <el-radio label="1" >是</el-radio>
        <el-radio label="0" >否</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="民办教师：" prop="privateTeacher">
      <el-radio-group v-model="teacherInfoForm.privateTeacher">
        <el-radio label="1" >是</el-radio>
        <el-radio label="0" >否</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="骨干教师：" prop="backboneTeacher">
      <el-radio-group v-model="teacherInfoForm.backboneTeacher">
        <el-radio label="1" >是</el-radio>
        <el-radio label="0" >否</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="学科带头人：" prop="theLeader">
      <el-radio-group v-model="teacherInfoForm.theLeader">
        <el-radio label="1">是</el-radio>
        <el-radio label="0" >否</el-radio>
      </el-radio-group>

    </el-form-item>

    <el-form-item label="专、兼职教研员：" prop="fullOrNot">
      <el-select v-model="teacherInfoForm.fullOrNot" placeholder="请选择职称" class="inputWidth">
        <el-option label="专职" value="专职"></el-option>
        <el-option label="兼职" value="兼职"></el-option>
        <el-option label="否" value="否"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item class="note" label="近三年获奖或发表文章情况：（按照奖项、获奖时间、获奖级别、获奖内容顺序填写）" prop="note">
      <el-input type="textarea" v-model.trim="teacherInfoForm.note" class="item-text" :maxlength="200"></el-input>
    </el-form-item>
  </el-form>

  </div>
</template>

<script>

  export default {
    data() {
      var regExp = /select|update|delete|truncate|join|union|exec|insert|drop|count|script|src|alert|window|document|location|>|<|%/i;
      var checkNote = (rule, value, callback) => {
        if(value == null || value == ""){
          callback();
        }else if(value.length > 200){
          callback(new Error("最多可输入200个字！"))
        }else if(regExp.test(value)){
          callback(new Error("输入中不能包含特殊字符！"))
        }else{
          callback();
        }
      };
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
        teacherInfoForm:{
          id:this.$route.params.id,
          name:'',
          sex:'',
          national:'',
          phone:'',
          idCard:'',
          schoolAge:'',//教龄
          //第一学历
          education:'',//第一学历
          graduatedFromSchool:'',//毕业学校
          schoolType:'',//高校类别
          ifNormal:'',//是否为师范专业
          graduationOfYear:'',//毕业年份
          // 第二学历
          maxEducation:'',
          maxSeq:'',
          maxGraduatedFromSchool:'',
          maxSchoolType:'',
          maxIfNormal:'',
          maxGraduationOfYear:'',
          maxGetTheWay:'',
          //个人信息
          jobTitle:'',//职称
          educationLeader:'',//是否为教务主任
          classTeacher:'',//是否为年级主任
          privateTeacher:'',//是否为民办教师
          backboneTeacher:'',//是否为骨干教师
          theLeader:'',//学科带头人
          fullOrNot:'',//专兼职
          note:'',
        },
        //民族参数
        restaurants: [],
        nation: '',
        // 校验
        teacherInfoRules: {
          name: [
            {required: true, message: '姓名不能为空！', trigger: 'blur' },
            {pattern:/^[\S]{2,40}$/,message: '姓名输入在2~40个字！'}
          ],
          national: [
            { required: true, message: '民族不能为空！', trigger: 'change' },
          ],
          sex: [
            { required: true, message: '性别不能为空！', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '手机号码不能为空！', trigger: 'blur' },
            {pattern: /^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/,message: '手机号码格式输入错误！'},
            { min: 11, max: 11, message: '手机号码输入为11位数字！', trigger: 'blur' }
          ],
          idCard: [
            { required: false, message: '请输入身份证号', trigger: 'blur' },
            {pattern: /^([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9xX]))|((yt)\S{0,18})$/i,message: '身份证号格式输入错误！'},
          ],
          schoolAge: [
            {required: true, message: '教龄不能为空！', trigger: 'change' },
            {pattern: /^\d{1,2}$/,message: '教龄输入为1~2位数字！'},
          ],
          firstEducation : [
            { required: true, message: '第一学历不能为空！', trigger: 'blur' }
          ],
          graduatedFromSchool:[
            {pattern: /^[\S]{0,20}$/, message: '最多可输入20个字！' },
          ],
          maxGraduatedFromSchool:[
            {pattern: /^[\S]{0,20}$/, message: '最多可输入20个字！' },
          ],
          /*note: [
            {required: false, message: '请输入描述信息', trigger: 'blur' },
            {pattern: /^[\S]{0,200}$/, message: '长度在 0 到 200 个字符' },
          ]*/
          note: [
            {validator: checkNote, trigger: 'blur' }
          ]
          /*  IDnumber: [
           { required: false, message: '请输入身份证号', trigger: 'blur' },
           {pattern: /^[1-9]\d{13,16}(\d|X)$/,message: '请正确输入身份证号码'},
           ],
           date1: [
           { type: 'date', required: false, message: '请选择日期', trigger: 'change' }
           ],


           fatherprofession : [
           { required: false, message: '请选择父亲职业', trigger: 'change' }
           ],

           mathereducation : [
           { required: false, message: '请选择父亲学历', trigger: 'change' }
           ],
           matherprofession : [
           { required: false, message: '请选择父亲职业', trigger: 'change' }
           ],
           phone2: [
           { required: false, message: '请输入电话号', trigger: 'blur' },
           { min: 11, max: 11, message: '请输入11个数字', trigger: 'blur' }
           ],
           desc: [
           { required: false, message: '请填写活动形式', trigger: 'blur' }
           ]*/
        },
      };
    },
    mounted(){
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      /*console.log(this.userInfo.schools.schoolId)*/
    },
    methods: {

      /*提交*/
     /* setDate(nowDate){
          var result = '';
        if(Object.prototype.toString.call(nowDate) === '[object Date]'){
          result = nowDate.getFullYear();
          console.log(result);
        } else {

        }
        return result;
      },*/
      saveteacherInfoForm(formName) {
        this.$refs.orgInfoForm.validate((valid) => {
          if (valid) {
        this.teacherInfoForm.graduationOfYear = Object.prototype.toString.call(this.teacherInfoForm.graduationOfYear) === '[object Date]'? this.teacherInfoForm.graduationOfYear.getFullYear(): this.teacherInfoForm.graduationOfYear;
        this.teacherInfoForm.maxGraduationOfYear = Object.prototype.toString.call(this.teacherInfoForm.graduationOfYear) === '[object Date]'? this.teacherInfoForm.graduationOfYear.getFullYear(): this.teacherInfoForm.graduationOfYear;
        var params = Object.assign({}, this.teacherInfoForm, {isSchoolHeader: 0},{schoolId : this.userInfo.schools.schoolId});
        this.$ajax('/schadmin/saveOneTeacher?',params )
          .then(res => {
            if(res.code == 200) {
              this.$alert('保存成功', '标题名称', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push('/teacherManagement')
                }
              });
            }else{
              this.$alert(res.message, '提示', {
                confirmButtonText: '确定',

              });
            }
          });

          } else {
            this.$message.error('验证未通过');
            // return false;

          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
  }
</script>
<style>
 /* 系统自带*/
 #addteacher .el-form-item {
    margin-bottom: 14px;
  }
 #addteacher .el-form-item__error {
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    margin-top: 0;
    position: absolute;
    top: 100%;
    left: 0;
  }
 #addteacher .el-form-item__label{
    color:#333;
    padding-right: 10px;
  }
 /*描述*/
 .note .el-form-item__label{
   padding: 0;
   height:48px;
   line-height: 16px;
   margin-top: 10px;
 }
 #addteacher .el-form-item__content{
   height: 36px;
 }
  /*返回栏*/
  #addteacher{
    padding: 0 20px 50px 20px;
  }
  #addteacher .btns {
    border-bottom: 1px solid #ECEDEF;
    padding-bottom: 10px;
    padding-top: 10px;
    height: 30px;
  }
  #addteacher .btns a {
    font-size: 14px;
    color: #666;
    line-height: 30px;
  }
  .icon-back:before{
    position: relative;
    top: 1px;
  }
  #addteacher .btns .el-button{
    padding: 8px 20px;
  }
  #addteacher .btns i {
    margin-right: 5px;
  }
  /*标题样式*/
 #addteacher .title{
    padding: 20px 0 18px 0;
    /* border-bottom: 1px solid #e9edf1;*/
  }
 #addteacher  .title i{
    display: inline-block;
    height:16px;
    width:3px;
    position: relative;
    top:2px;
    margin-right:7px;
    background:#0d9ee9 ;
  }
 #addteacher .title span{
    font-size:14px;
    color: #0d9ee9;
    display:inline-block;
    line-height: 12px;
  }
 .inputWidth{
   width:288px;
 }

</style>

