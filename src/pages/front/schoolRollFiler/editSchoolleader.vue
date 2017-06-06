<template>
  <section>
    <!-- <left-sidebar></left-sidebar> -->
    <!-- <right-wrap></right-wrap> -->

    <div class="main-content" v-loading.fullscreen.lock="fullscreenLoading">
      <div id="editteachers">
        <div  class="btns">
          <a href="javascript:;" @click="remindSave"  class=" icon-back">返回 </a>
          <el-button style="float: right;" class="white-color add-btn el-button el-button--primary"
                     type="primary" @click="saveSchoolleaderInfoForm" v-if="type != 'detail'"><i class="icon-conserve"></i><span>保存</span></el-button>

        </div>
      <!--  <div class="tabs-header text-right">
          <el-button type="text" class="text-left"> <router-link :to="{ path:  '/leaderManagement' }" >< 返回 </router-link></el-button>
         &lt;!&ndash; <el-button type="success" icon="edit" @click="editOrgInfoForm" v-if="type != 'detail' && !isEditing">编辑</el-button>&ndash;&gt;
          <el-button type="success" icon="edit" @click="cancelOrgInfoForm" v-if="isEditing">取消</el-button>
          <el-button type="success" icon="edit" @click="saveSchoolleaderInfoForm" v-if="isEditing">保存</el-button>
        </div>-->

        <!-- type="border-card" -->

        <div class="title"><i></i><span>校领导基本信息</span></div>
        <el-form ref="form" :model="teacherInfoForm" :rules="teacherInfoRules"  :show-message="type != 'detail'" label-width="200px" class="edit"
                 :class="[{ editing: type != 'detail' }] ">


          <el-form-item label="姓名：" prop="name">
            <el-input v-model.trim="teacherInfoForm.name"  :maxlength="40" class="inputWidth"></el-input>
            <p> {{ teacherInfoForm.name }} </p>
          </el-form-item>

          <el-form-item label="性别：" prop="sex">
            <el-radio-group v-model="teacherInfoForm.sex">
              <el-radio label="1" >男</el-radio>
              <el-radio label="2" >女</el-radio>
              <el-radio label="3" >其他</el-radio>
            </el-radio-group>
            <p v-if="teacherInfoForm.sex =='1'">男</p>
            <p v-if="teacherInfoForm.sex =='2'">女</p>
            <p v-if="teacherInfoForm.sex =='3'">其他</p>
          </el-form-item>
          <!--民族-->
          <el-form-item label="民族："  prop="national" >
            <el-select v-model="teacherInfoForm.national"   class="inputWidth" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <p>{{teacherInfoForm.national}}</p>
          </el-form-item>
          <!--  <minority></minority>-->
          <!--民族结束-->
          <!--手机-->
          <el-form-item label="手机号码：" prop="phone">
            <!-- <el-input v-model="orgInfoForm.phone"></el-input>-->
            <p style="display:inline-block;"> {{ teacherInfoForm.phone }} </p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<a href="javascript:" class="changephone" v-show=" type != 'detail'" @click="UpdPhone()">手机号码变更</a>
          </el-form-item>

          <el-form-item label="身份证号：" prop="idCard">
            <el-input v-model.trim="teacherInfoForm.idCard" :maxlength="18" class="inputWidth"></el-input>
            <p>{{teacherInfoForm.idCard}}</p>
          </el-form-item>

          <el-form-item label="教龄：" prop="schoolAge">
            <el-input v-model.trim="teacherInfoForm.schoolAge" :maxlength="2" class="inputWidth"></el-input>
            <p> {{ teacherInfoForm.schoolAge }} </p>
          </el-form-item>
          <!--第一学历-->
          <el-form-item label="第一学历：" prop="education">
            <el-select v-model="teacherInfoForm.education" class="inputWidth" placeholder="请选择学历" required>
              <el-option label="高中" value="高中"></el-option>
              <el-option label="中专"  value="中专"></el-option>
              <el-option label="大专" value="大专"></el-option>
              <el-option label="本科" value="本科"></el-option>
              <el-option label="硕士及以上" value="硕士及以上"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
            <p> {{ teacherInfoForm.education }} </p>
          </el-form-item>
          <el-form-item label="毕业学校：" prop="graduatedFromSchool">
            <el-input v-model.trim="teacherInfoForm.graduatedFromSchool" class="inputWidth"></el-input>
            <p>{{ teacherInfoForm.graduatedFromSchool }}</p>
          </el-form-item>
          <el-form-item label="高校类别：" prop="schoolType">
            <el-select v-model="teacherInfoForm.schoolType" class="inputWidth" placeholder="请选择高校类别">
              <el-option label="本科提前批次" value="本科提前批次" ></el-option>
              <el-option label="本科第一批次" value="本科第一批次"></el-option>
              <el-option label="本科第二批次"  value="本科第二批次"></el-option>
              <el-option label="本科第三批次" value="本科第三批次"></el-option>
              <el-option label="专科" value="专科"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
            <p> {{ teacherInfoForm.schoolType }}</p>
          </el-form-item>
          <el-form-item label="是否为师范专业：" prop="ifNormal">
            <el-radio-group v-model="teacherInfoForm.ifNormal" >
              <el-radio label="1" >是</el-radio>
              <el-radio label="0" >否</el-radio>
            </el-radio-group>
            <p v-if="teacherInfoForm.ifNormal =='1'">是</p>
            <p v-if="teacherInfoForm.ifNormal =='0'">否</p>
            <p v-else></p>
          </el-form-item>
          <el-form-item class="block" label="毕业时间：" prop="graduationOfYear" >
            <el-date-picker
              v-model="teacherInfoForm.graduationOfYear"
              align="right"
              type="year"
              style="width:288px;"
              placeholder="选择年">
            </el-date-picker>
            <p>{{teacherInfoForm.graduationOfYear}}</p>
          </el-form-item>
          <!--第二学历-->
          <el-form-item label="最高学历：" prop="maxEducation" >
            <el-select v-model="teacherInfoForm.maxEducation" class="inputWidth" placeholder="请选择父亲学历">
              <el-option label="高中" value="高中"></el-option>
              <el-option label="中专" value="中专"></el-option>
              <el-option label="大专" value="大专"></el-option>
              <el-option label="本科" value="本科"></el-option>
              <el-option label="硕士及以上" value="硕士及以上"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
            <p>{{teacherInfoForm.maxEducation}}</p>
          </el-form-item>

          <el-form-item label="考取途径：" prop="maxGetTheWay">
            <el-select v-model="teacherInfoForm.maxGetTheWay" class="inputWidth" placeholder="请选择考取">
              <el-option label="统招" value="统招"></el-option>
              <el-option label="自考" value="自考"></el-option>
              <el-option label="成招" value="成招"></el-option>
              <el-option label="专升本" value="专升本"></el-option>
              <el-option label="在职" value="在职"></el-option>
              <el-option label="其他"  value="其他"></el-option>
            </el-select>
            <p>{{teacherInfoForm.maxGetTheWay}}</p>
          </el-form-item>

          <el-form-item label="毕业学校：" prop="maxGraduatedFromSchool" >
            <el-input v-model.trim="teacherInfoForm.maxGraduatedFromSchool" class="inputWidth"></el-input>
            <p>{{teacherInfoForm.maxGraduatedFromSchool}}</p>
          </el-form-item>

          <el-form-item label="是否为师范专业:" prop="maxIfNormal">
            <el-radio-group v-model="teacherInfoForm.maxIfNormal">
              <el-radio label="1" >是</el-radio>
              <el-radio label="0" >否</el-radio>
            </el-radio-group>
            <p v-if="teacherInfoForm.maxIfNormal =='1'">是</p>
            <p v-if="teacherInfoForm.maxIfNormal =='0'">否</p>
            <p v-else></p>
          </el-form-item>

          <el-form-item class="block" label="毕业时间：" prop="maxGraduationOfYear">
            <el-date-picker
              v-model="teacherInfoForm.maxGraduationOfYear"
              align="right"
              type="year"
              style="width:288px;"
              placeholder="选择年">
            </el-date-picker>
            <p >{{teacherInfoForm.maxGraduationOfYear}}</p>
          </el-form-item>




          <div class="title"><i></i>
            <span>校领导个人信息</span></div>

          <el-form-item label="职称：" prop="jobTitle">
            <el-select v-model="teacherInfoForm.jobTitle" class="inputWidth" placeholder="请选择职称">
              <el-option label="正高级" value="正高级"></el-option>
              <el-option label="高级" value="高级"></el-option>
              <el-option label="一级" value="一级"></el-option>
              <el-option label="二级" value="二级"></el-option>
              <el-option label="三级" value="三级"></el-option>
              <el-option label="无" value="无"></el-option>
            </el-select>
            <p>{{teacherInfoForm.jobTitle}}</p>
          </el-form-item>
          <el-form-item label="职务：" prop="position">
            <el-select v-model="teacherInfoForm.position" class="inputWidth"  placeholder="请选择职称">
              <el-option label="正校长" value="正校长"></el-option>
              <el-option label="教学副校长" value="教学副校长"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
            <p>{{teacherInfoForm.position}}</p>
          </el-form-item>

          <el-form-item label="担任校长或者副校长年限：" prop="headerAge">
            <el-input v-model.trim="teacherInfoForm.headerAge" class="inputWidth"></el-input>
            <p> {{ teacherInfoForm.headerAge }} </p>
          </el-form-item>

          <el-form-item label="现任校长或者副校长年限：" prop="nowHeaderAge">
            <el-input v-model.trim="teacherInfoForm.nowHeaderAge" class="inputWidth"></el-input>
            <p> {{ teacherInfoForm.nowHeaderAge }} </p>
          </el-form-item>

          <el-form-item label="专、兼职教研员：" prop="fullOrNot">
            <el-select v-model="teacherInfoForm.fullOrNot" class="inputWidth" placeholder="请选择职称">
              <el-option label="专职" value="专职"></el-option>
              <el-option label="兼职" value="兼职"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
            <p v-if="teacherInfoForm.fullOrNot =='兼职'">兼职</p>
            <p v-if="teacherInfoForm.fullOrNot =='专职'">专职</p>
            <p v-if="teacherInfoForm.fullOrNot =='否'">否</p>
            <!-- <p v-if="teacherInfoForm.jobTitle =='2'">否</p>-->
          </el-form-item>

          <el-form-item class="note"  label="近三年获奖或发表文章情况：（按照奖项、获奖时间、获奖级别、获奖内容顺序填写）" prop="note">
            <el-input type="textarea" v-model.trim="teacherInfoForm.note" :maxlength="200" class="item-text"></el-input>
            <p> {{teacherInfoForm.note }} </p>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--新增部分-->
    <div  class="Tel_dialog" v-show="dialogupd">
      <div class="Tel_title">手机号码变更</div>
      <div class="Tel_From">
        <el-form :model="UpdateForm" ref="UpdateForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="原始手机号码" prop="oldtel">
            <el-input :disabled="true" v-model.trim="UpdateForm.oldtel" placeholder="原始手机号码"></el-input>
          </el-form-item>
          <el-form-item style="text-align:left;" label="短信验证码" prop="code">
            <el-row :gutter="20">
              <el-col :span="14" style="padding:0;height:36px"><el-input style="margin-left:0; width:100%" v-model.trim="UpdateForm.code" placeholder="短信验证码"></el-input></el-col>
              <el-col :span="8" style="padding-left:8px;"><el-button v-text="Btnmsg" style="padding:10px  10px;" @click="GetVercode()"></el-button></el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="新手机号码" prop="newtel">
            <el-input v-model.trim="UpdateForm.newtel" placeholder="新手机号码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="Tel_footer">
        <el-row>
          <el-col :span="12"><el-button type="info" style="width:120px;letter-spacing:2px;" @click="ClearTel()">取消</el-button></el-col>
          <el-col :span="12"><el-button type="success" style="width:120px;letter-spacing:2px;" @click="SureTel()">确定</el-button></el-col>
        </el-row>
      </div>
    </div>
    <div class="mask" v-show="dialogupd"></div>
  </section>
</template>

<script>
  // import leftSidebar from './leftSidebar.vue';
  // import rightWrap from './rightWrap.vue';




  export default {
    name: 'admin',
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
        //新增部分
        dialogupd:false,
        Btnmsg:"发送验证码",
        bool:true,
        UpdateForm: {oldtel:'',code: '',newtel:''},
        Usercode:'',

        type:this.$route.params.type,
        value:'',
        // 全屏遮罩层
        fullscreenLoading: true,
        // 编辑输入框
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
          maxGraduatedFromSchool:'',
          maxGetTheWay:'',
          maxIfNormal:'',
          maxGraduationOfYear:'',
          //个人信息
          jobTitle:'',//职称
          position:'',//职务
          headerAge:'',
          nowHeaderAge:'',
          fullOrNot:'',//专兼职
          note:'',
        },
        teacherInfoForm2:{},
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
            { required: true, message: '请选择性别', trigger: 'change' }
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
            { required: true, message: '教龄不能为空！', trigger: 'change' },
            {pattern: /^\d{1,2}$/,message: '教龄输入为1~2位数字！'},
          ],
          education : [
            { required: true, message: '第一学历不能为空！', trigger: 'blur' }
          ],
          headerAge : [
            {pattern: /^\d{1,2}$/,message: '担任校长或者副校长年限输入为1~2位数字！'},
          ],
          nowHeaderAge : [
            {pattern: /^\d{1,2}$/,message: '现任校长或者副校长年限输入为1~2位数字！'},
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


        // 编辑切换
        isEditing:false,

      }
    },
    mounted(){
      /* this.getOrgTree()
       this.getOrgUserLists()
       this.getAreaTree()
       // this.getOrgInfo(this.orgInfoId)*/
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log(this.userInfo.schools.schoolId);
      this.getteacherInfo();
    },
    methods: {
        //返回提醒保存
      remindSave(){
       if(this.type == 'detail' || !this.searchIsOk){
         this.$router.go(-1);
         return;
       }else {
         this.$confirm('当前界面存在编辑操作是否保存', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         //确定
         /*this.$router.replace('/eduSchoolManagement');*/
         this.$router.go(-1);
       }).catch(() => {
         //取消
       });
       }
      },
      //新增部分
      UpdPhone(){
        this.dialogupd=true;
        this.UpdateForm.oldtel = this.teacherInfoForm.phone;
      },
      GetVercode(){
        var _self = this;
        if(!this.bool)return;
        var contlength=60;
        var restInterval = window.setInterval(function() {
          if(contlength==0)
          {
            clearInterval(restInterval);
            _self.Btnmsg ="获取验证码";
            _self.bool=true;
            return;
          }
          _self.Btnmsg=contlength+'s后可重发';
          contlength--;
        },1000);
        let params={
          phone:this.teacherInfoForm.phone,
        };
        this.$ajax('/schadmin/sms/send', params).then(res => {
          if (res.code == 200) {
            //明天你就看看这里res.data有没有值
            console.log(res);
            console.log(res.data);
            _self.Usercode=res.data;
            console.log(_self.Usercode)
            //
          } else {
          }
        });
      },
      ClearTel(){
        this.dialogupd=false;
        //this.Btnmsg="获取验证码";
        //this.bool=true;
      },
      SureTel(){
        var _self = this.UpdateForm;
        //if(_self.code =="")
        var ph =/^1[3|4|5|8][0-9]\d{4,8}$/;
        var flag = ph.test(_self.newtel);
        if(!this.Usercode){
          this.$message({
            showClose: true,
            message: '请获取验证码',
            type: 'warning'
          });
          return;
        }
        if(_self.code=="" ||_self.code!=this.Usercode){
          this.$message({
            showClose: true,
            message: '请输入正确验证码',
            type: 'warning'
          });
          return;
        }
        if(!flag)
        {
          this.$message({
            showClose: true,
            message: '手机格式错误',
            type: 'warning'
          });
          return;
        }
        console.log('确定后的值：'+_self.code+'  '+this.Usercode);
        this.$ajax('/schadmin/changeLoginName',{oldPhone:_self.oldtel,newPhone:_self.newtel,isSchoolHeader:1}).then(res => {
          if(res.code == 200) {
            this.$message({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
            this.teacherInfoForm.phone =_self.newtel;
            this.dialogupd=false;
          }else{
            this.$message({
              type: 'error',
              message: res.message
            });

          }
        });
      },
      // 获取教师基本信息
      getteacherInfo(id){
        let params={
          schoolId:  this.userInfo.schools.schoolId,
          Id: this.$route.params.id,
          isSchoolHeader:1,
          teacherId: this.$route.params.id
        };
        this.$ajax('/headMaster/getAttribute',params)
          .then(res => {
            this.teacherInfoForm=res.data;
            this.teacherInfoForm2=_.cloneDeep(this.teacherInfoForm);
            this.fullscreenLoading=false;
          });
      },
      //编辑保存教师基本信息editSchoolleader.vue
      saveSchoolleaderInfoForm(){
        this.teacherInfoForm.graduationOfYear = Object.prototype.toString.call(this.teacherInfoForm.graduationOfYear) === '[object Date]'? this.teacherInfoForm.graduationOfYear.getFullYear(): this.teacherInfoForm.graduationOfYear;
        this.teacherInfoForm.maxGraduationOfYear = Object.prototype.toString.call(this.teacherInfoForm.maxGraduationOfYear) === '[object Date]'? this.teacherInfoForm.maxGraduationOfYear.getFullYear(): this.teacherInfoForm.maxGraduationOfYear;

        let params={
          schoolId:  this.userInfo.schools.schoolId,
          id: this.$route.params.id,
          isSchoolHeader:1,
          /*  id: this.teacherInfoForm.id ,*/
          name: this.teacherInfoForm.name,
          sex: this.teacherInfoForm.sex,
          national: this.teacherInfoForm.national,
          phone:this.teacherInfoForm.phone,
          idCard:this.teacherInfoForm. idCard,
          schoolAge:this.teacherInfoForm.schoolAge,
          /*第一学历*/
          education:this.teacherInfoForm.education,
          graduatedFromSchool:this.teacherInfoForm.graduatedFromSchool,
          schoolType:this.teacherInfoForm.schoolType,
          ifNormal:this.teacherInfoForm.ifNormal,
          graduationOfYear:this.teacherInfoForm.graduationOfYear,
          /*第一学历*/
          maxEducation:this.teacherInfoForm.maxEducation,
          maxGraduatedFromSchool:this.teacherInfoForm.maxGraduatedFromSchool,
          maxGetTheWay:this.teacherInfoForm.maxGetTheWay,
          maxIfNormal:this.teacherInfoForm.maxIfNormal,
          maxGraduationOfYear:this.teacherInfoForm.maxGraduationOfYear,
          /*个人信息*/
          jobTitle:this.teacherInfoForm.jobTitle,
          position:this.teacherInfoForm.position,
          headerAge:this.teacherInfoForm.headerAge,
          nowHeaderAge:this.teacherInfoForm.nowHeaderAge,
          fullOrNot:this.teacherInfoForm. fullOrNot,
          note:this.teacherInfoForm.  note,

          /* orgId: this.selectedCounty || this.selectedCity || this.selectedProvince,*/
        };

        this.$ajax('/headMaster/updateHeader',params)
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
        this.teacherInfoForm2=_.cloneDeep(this.teacherInfoForm);
      }

    },


    watch: {
      teacherInfoForm: {
        handler: function (after, before) {
          var _this = this;
          console.log(JSON.stringify(after))
          console.log(JSON.stringify(_this.teacherInfoForm2));
          this.searchIsOk = JSON.stringify(after) !== JSON.stringify(_this.teacherInfoForm2);

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
  #editteachers{
    padding: 0 20px 50px 20px;
  }
  /*系统自带*/
  #editteachers .el-form-item {
    margin-bottom: 14px;
  }
  #editteachers  .el-form-item__error {
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    position: absolute;
    top: 90%;
    left: 0;
  }
  #editteachers  .el-form-item__label{
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
  #addteachers .el-form-item__content{
    height: 36px;
  }
  #editteachers .btns {
    border-bottom: 1px solid #ECEDEF;
    padding-bottom: 10px;
    padding-top: 10px;
    height: 30px;
    line-height: 30px;
  }
  #editteachers .btns a {
    font-size: 14px;
    color: #666;
    line-height: 30px;
  }
  .icon-back:before{
    position: relative;
    top: 2px;
  }
  #editteachers .btns .el-button{
    padding: 8px 20px;
  }
  #editteachers .btns i {
    margin-right: 5px;
  }
  #editteachers .text-left {
    float: left;
    font-size: 14px;
    color:#666666;
  }
  #editteachers  .space-between{
    display: flex;
    justify-content: space-between;
  }
  #editteachers .space-around{
    display: flex;
    justify-content: space-around;
  }
  #editteachers  .tabs-header .editor{
    padding: 10px;
    display: block;
  }

  /* 查看显示p  隐藏输入框*/
  /*输入框*/
  #editteachers .edit .el-input{
    display: none;
  }
  #editteachers  .edit .item-text{
    display: none;
  }
  /*下拉框*/
  #editteachers .edit .el-select{
    display: none;
    /* display: inline-block; */
  }
  /*民族*/
  #editteachers  .edit .el-autocomplete{
    display: none;
  }
  /*单选*/
  #editteachers  .edit  .el-radio-group{
    display: none;
  }
  /* 编辑状态隐藏p  显示输入框*/
  #editteachers  .edit.editing p{
    display: none;
  }
  /*输入框*/
  #editteachers  .edit.editing .el-input{
    display: inline-block;
  }
  /*下拉框*/
  #editteachers  .edit.editing .el-select{
    display: inline-block;
  }
  /*单选*/
  #editteachers .edit.editing .el-radio-group{
    line-height: 36px;
    display: block;
  }
  #editteachers .edit.editing .item-text{
    display: block;
  }
  /*民族*/
  #editteachers .edit.editing .el-autocomplete{
    display: block;
  }






  #editteachers .pagination{
    margin-top: 30px;
  }
  #editteachers  b{
    font-weight: normal;
  }
  #editteachers .blind{
    clip: rect(1px,1px,1px,1px);
    clip: rect(1px 1px 1px 1px);
    position: absolute;
  }
  /* .el-select .el-input .el-input__icon{
     right:420px;
   }*/
  /*负责人样式*/
  #editteachers  .space-between{
    line-height: 50px;
    float: right;
    margin-left: 20px;

  }
  #editteachers  .el-table{width:742px;margin: 0 auto;}
  .principal-top span{display: inline-block;}
  #editteachers  .principal-top{width:984px;height:50px;line-height: 50px;   border-bottom: 1px solid #e9edf1;margin-bottom:16px;}
  /*标题样式*/
  #editteachers  .title{
    padding: 20px 0 18px 0;
    /* border-bottom: 1px solid #e9edf1;*/
  }
  #editteachers   .title i{
    display: inline-block;
    height:16px;
    width:3px;
    margin-right:7px;
    background:#0d9ee9 ;
  }
  #editteachers  .title span{
    font-size:14px;
    color: #0d9ee9;
    display:inline-block;
    line-height: 12px;
  }
  /*新增部分*/
 .Tel_dialog{
    border-top: 4px solid #049be8;
    position: fixed;
    width: 420px;
    top: 50%;
    left: 50%;
    background: #fff;
    z-index: 1997;
    font-size: 15px;
    text-align: center;
    padding: 10px;
    border-radius:3px;
   min-height: 300px;
    transform: translate(-50%, -50%);
  }
  .mask{
    z-index: 1996;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.7;
    filter: alpha(opacity=70);
  }
  .el-message{
    z-index: 9999 !important;
  }
 .Tel_title{
    font-size: 20px;
    letter-spacing:1px;
    color: #13a1e9;
  }
.Tel_From{
    margin-top: 30px;
    margin-right: 20px;
  }
  .Tel_footer{
    margin-top:15px;
  }
  .changephone{
    text-decoration:underline;
    color: #0d9ee9;
  }
  #editteachers .el-form-item__content{
    height: 36px;
  }

.inputWidth{
  width: 288px;
}

</style>
