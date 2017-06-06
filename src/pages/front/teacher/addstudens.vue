<template>
  <div id="addstudent">

    <el-form :model="studentForm" :rules="rules" ref="studentForm" label-width="124px" class="demo-studentForm">

        <!--按钮部分-->
        <!--<div class="saveDiv">
        <el-button type="text" class="text-left"><router-link :to="{ path:  '/studentManagement' }" > < 返回 </router-link></el-button>
        <el-button type="primary"  class="text-right"   @click="submitForm('studentForm')">保存</el-button>
        &lt;!&ndash;<el-button @click="resetForm('studentForm')">取消</el-button>&ndash;&gt;
      </div>-->
        <div class="btns">
          <a href="javascript:;" @click="goBack" class=" icon-back">返回 </a>
          <!--*<i class=" icon-back" style="position:relative;top:1px;"></i>-->
          <el-button style="float: right;" class="white-color add-btn el-button el-button--primary"
                     type="primary" @click="submitForm"><i class="icon-conserve"></i><span>保存</span></el-button>

        </div>

      <!--  &lt;!&ndash;选择班级年级&ndash;&gt;
        <div class="title"><i></i>
          <span>选择导入班级</span></div>
        <el-form-item label="年级" prop="gradeIndex">
          <el-radio-group v-model="studentForm.gradeIndex">
            <el-radio-button :label="grade.index" v-for="(grade,index) in gradeList" :key="index">{{grade.name}}

            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="班级" prop="classIndex">
          <el-radio-group v-model="studentForm.classIndex" v-if="studentForm.gradeIndex">
            <el-radio-button :label="classes.index"
                             v-for="(classes,index) in gradeList[studentForm.gradeIndex].classList" :key="index">
              {{classes.name}}

            </el-radio-button>
          </el-radio-group>
        </el-form-item>-->
      <!--学生信息-->
      <div class="title"><i></i><span>学生信息</span></div>
      <el-form-item label="请输入学籍号：" prop="sid">
        <el-input v-model="studentForm.sid" class="inputWidth" :maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="studentForm.name" :maxlength="40" class="inputWidth"></el-input>
      </el-form-item>

      <el-form-item label="性别：" prop="sex">
        <el-radio-group v-model="studentForm.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <!--民族-->
      <el-form-item label="民族："  prop="nation" >
        <el-select v-model="studentForm.nation"   class="inputWidth" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!--  <minority></minority>-->
      <!--民族结束-->

      <el-form-item label="身份证号：" prop="idCard">
        <el-input v-model="studentForm.idCard" class="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="出生年月日：" prop="birthday">
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="date"  placeholder="选择日期" v-model="studentForm.birthday" class="inputWidth"
                           ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item class="block" label="入学年份：" prop="schoolYear">
        <el-date-picker
          v-model="studentForm.schoolYear"
          style="width:288px;"
          align="right"
          type="year"
          placeholder="选择年">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="是否是独生子女：" prop="isOneChile">
        <el-radio-group v-model="studentForm.isOneChile">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否住校：" prop="isZhuXiao">
        <el-radio-group v-model="studentForm.isZhuXiao">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="监护人：" prop="guardian">
        <el-select v-model="studentForm.guardian" placeholder="请选择监护人" class="inputWidth">
          <el-option label="有父或母照料" value="有父或母照料"></el-option>
          <el-option label="祖辈照料" value="祖辈照料"></el-option>
          <el-option label="托管给亲戚" value="托管给亲戚"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>

      <div class="title"><i></i><span>家庭信息</span></div>
      <el-form-item label="父亲学历：" prop="fatherDucation">
        <el-select v-model="studentForm.fatherDucation" placeholder="请选择父亲学历" class="inputWidth">
          <el-option label="小学" value="小学"></el-option>
          <el-option label="初中" value="初中"></el-option>
          <el-option label="高中" value="高中"></el-option>
          <el-option label="中专" value="中专"></el-option>
          <el-option label="大专" value="大专"></el-option>
          <el-option label="本科" value="本科"></el-option>
          <el-option label="硕士及以上" value="硕士及以上"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="父亲职业：" prop="fatherCareer">
        <el-select v-model="studentForm.fatherCareer" placeholder="请选择父亲学历" class="inputWidth">
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
      </el-form-item>
      <el-form-item label="电话：" prop="fatherPhone">
        <el-input v-model="studentForm.fatherPhone" placeholder="请填写电话" class="inputWidth"></el-input>
      </el-form-item>

      <el-form-item label="母亲学历：" prop="motherDucation">
        <el-select v-model="studentForm.motherDucation" placeholder="请选择母亲学历" class="inputWidth">
          <el-option label="小学" value="小学"></el-option>
          <el-option label="初中" value="初中"></el-option>
          <el-option label="高中" value="高中"></el-option>
          <el-option label="中专" value="中专"></el-option>
          <el-option label="大专" value="大专"></el-option>
          <el-option label="本科" value="本科"></el-option>
          <el-option label="硕士及以上" value="硕士及以上"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="母亲职业：" prop="motherCareer">
        <el-select v-model="studentForm.motherCareer" placeholder="请选择母亲职业" class="inputWidth">
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
      </el-form-item>
      <el-form-item label="电话：" prop="motherPhone">
        <el-input v-model="studentForm.motherPhone" placeholder="请填写电话" class="inputWidth"></el-input>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  import Minority from '@/pages/components/Minority'
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
        userInfo: "",
        gradeList: {},
        studentForm: {
          schoolId: '',
         /* classIndex: '',
          gradeIndex: '',*/
          sid: '',
          name: '',
          sex: '',
          nation: '',
          idCard: '',
          birthday: '',    //出生日期
          schoolYear: '',//入学年份
          isOneChile: '',
          isZhuXiao: '',
          guardian: '',
          fatherDucation: '',
          fatherCareer: '',
          fatherPhone: '',
          motherDucation: '',
          motherCareer: '',
          motherPhone: '',
        },
        studentresData: '',
        //民族参数
        restaurants: [],
        nation: '',
        rules: {
         /* classIndex: [
            {required: true, message: '请选择班级', trigger: 'blur'},
          ],
          gradeId: [
            {required: true, message: '请选择年级', trigger: 'blur'},
          ],*/
          sid: [
            {required: true, message: '请输入19位学籍号', trigger: 'change'},
            {pattern:/^[\S]{8,20}$/,message: '学籍号输入在8-20个非空字符！'}
          ],
          name: [
            {required: true, message: '请输入姓名', trigger: 'change' },
            {pattern: /^[\S]{1,40}$/,message: '用户名只能为1-40个字符'},
          ],
          nation: [
            {required: true, message: '请输入民族', trigger: 'change'},
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          idCard: [
            {required: false, message: '请输入身份证号', trigger: 'blur'},
            {pattern: /^([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9xX]))|((yt)\S{0,18})$/i,message: '身份证号格式输入错误！'},
          ],

          fatherPhone: [
            {pattern: /^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/, message: '请输入正确的电话号码'}
          ],
          motherPhone: [
            {pattern: /^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/, message: '请输入正确的电话号码'}
          ],


        },
        classId:'',
      };
    },
    mounted() {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.classId= this.$route.query.classId;

//      console.log(this.userInfo)
    },
    beforeCreate() {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      //console.log(this.userInfo.schools.schoolId)
      let that = this
      //获取班级列表
      that.$ajax('/teacher/getGradeList', {schoolId: that.userInfo.schools.schoolId})
        .then(res => {
          if (res.code == 200 && res.data && res.data.length) {
            that.gradeList = {};
            res.data.forEach((grade, index) => {
              if (!that.gradeList[grade.index]) {
                that.gradeList[grade.index] = grade;
              }
            })
            // console.log(that.gradeList);
          }
        });
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      },
      /*保存*/
      submitForm(studentForm) {
        console.log(  this.classId)
        this.$refs.studentForm.validate((valid) => {
          if (valid) {
            // console.log(this.studentForm.birthday)
            var nowDate = this.studentForm.birthday;
            // console.log(nowDate)
            if (Object.prototype.toString.call(nowDate) === '[object Date]') {
              var nowMonth = (nowDate.getMonth() + 1) > 9 ? (nowDate.getMonth() + 1) : ('0' + (nowDate.getMonth() + 1));
              var nowday = (nowDate.getDate() ) > 9 ? (nowDate.getDate()) : ('0' + (nowDate.getDate()));
              nowDate = nowDate.getFullYear() + '-' + nowMonth + '-' +nowday;
            }
            this.studentForm.birthday = nowDate;
            this.studentForm.schoolYear = Object.prototype.toString.call(this.studentForm.schoolYear) === '[object Date]' ? this.studentForm.schoolYear.getFullYear() : this.studentForm.schoolYear;
            console.log(  this.classId)
            var params = Object.assign({}, this.studentForm, {schoolId: this.userInfo.schools.schoolId},{classIndex: this.classId});
            console.log( params)
            this.$ajax('/teacher/saveOneStudent', params)
              .then(res => {
                if (res.code == 200) {
                  this.$alert('保存成功', '标题名称', {
                    confirmButtonText: '确定',
                    callback: action => {

                    }
                  });
                } else {
                  this.$alert(res.message, '提示', {
                    confirmButtonText: '确定',

                  });
                }
              });
          } else {
            this.$message.error('缺少必填信息，请填写完整');
            // return false;

          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    components: {
      Minority
    }
  }
</script>
<style>
  #addstudent  .el-form-item {
    margin-bottom: 14px;
  }
  #addstudent  .el-form-item__error {
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    position: absolute;
    top: 90%;
    left: 0;
  }
  #addstudent {
    padding: 0 20px 50px 20px;
  }
  #addstudent .el-form-item__content{
    height: 36px;
  }
  /*按钮*/
  #addstudent .btns {
    border-bottom: 1px solid #ECEDEF;
    padding-bottom:10px;
    padding-top: 10px;
    height: 30px;
  }

  #addstudent .btns .el-button {
    padding: 8px 20px;
  }
  #addstudent .btns a {
    font-size: 14px;
    color:#666;
    line-height: 30px;
  }
  .icon-back:before{
    position: relative;
    top: 1px;
  }
  #addstudent .btns i {
    margin-right: 5px;
  }

  #addstudent .text-left {
    font-size: 14px;
    color: #666666;
  }

  #addstudent .title {
    padding: 20px 0 18px 0;
    height: 14px;
  }

  #addstudent .title i {
    display: inline-block;
    height:14px;
    width: 3px;
    margin-right: 7px;
    background: #0d9ee9;
    position: relative;
    top:2px;
  }

  #addstudent .title span {
    font-size: 14px;
    color: #0d9ee9;
    display: inline-block;
    line-height: 14px;
  }
  .inputWidth{
    width: 288px;
  }
</style>
