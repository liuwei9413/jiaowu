<template>
  <div id="teacherPersonal">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="教师基本信息" name="teacherpersonageinfo">

        <section>
          <!-- <left-sidebar></left-sidebar> -->
          <!-- <right-wrap></right-wrap> -->

          <div class="main-content" v-loading.fullscreen.lock="fullscreenLoading">
            <div id="editteachers">

              <div class="tabs-header text-right">
                <!--   <el-button type="text" class="text-left"> <router-link :to="{ path:  '/teacherManagement' }" >< 返回 </router-link></el-button>-->
                <el-button type="success" icon="edit icon-edit" @click="editOrgInfoForm" v-if="type != 'detail' && !isEditing">
                  编辑
                </el-button>
                <el-button type="info" icon="edit icon-cancel" @click="cancelOrgInfoForm" v-if="isEditing">取消</el-button>
                <el-button type="success" icon="edit icon-conserve" @click="saveteacherInfoForm" v-if="isEditing">保存</el-button>
              </div>

              <!-- type="border-card" -->

              <div class="title"><i></i><span>教师个人信息</span></div>
              <el-form ref="form" :model="teacherInfoForm" :rules="teacherInfoRules" label-width="200px" class="edit"
                       :class="[{ editing: isEditing }] ">


                <el-form-item label="姓名：" prop="name">
                  <el-input v-model="teacherInfoForm.name"  class="inputWidth" :maxlength="40"></el-input>
                  <p class="pcolor"> {{ teacherInfoForm.name }} </p>
                </el-form-item>
                <el-form-item label="所带班级年级：" v-if="isshowgradeClass">
                  <span :class="[{ pcolor: !isEditing }] " style="display:inline-block;width: 784px;line-height:37px"> {{ gradeClass }} </span>
                </el-form-item>
                <el-form-item label="担任班主任总年限：" prop="teacherAge">
                  <el-input v-model="teacherInfoForm.teacherAge"  class="inputWidth" :maxlength="2"></el-input>
                  <p class="pcolor"> {{ teacherInfoForm.teacherAge }} </p>
                </el-form-item>
                <el-form-item label="性别：" prop="sex">
                  <el-radio-group v-model="teacherInfoForm.sex">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                    <el-radio label="3">其他</el-radio>
                  </el-radio-group>
                  <p class="pcolor"  v-if="teacherInfoForm.sex =='1'">男</p>
                  <p class="pcolor" v-if="teacherInfoForm.sex =='2'">女</p>
                  <p class="pcolor" v-if="teacherInfoForm.sex =='3'">其他</p>
                </el-form-item>
                <!--民族-->
                <el-form-item label="民族："  prop="national" >
                  <el-select v-model="teacherInfoForm.national"   style="width:288px;" filterable placeholder="请选择民族">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <p class="pcolor">{{teacherInfoForm.national}}</p>
                </el-form-item>
                <!--  <minority></minority>-->
                <!--民族结束-->
                <!--手机-->
                <el-form-item label="手机号码：" prop="phone">
                  <!-- <el-input v-model="orgInfoForm.phone"></el-input>-->
                  <span :class="[{ pcolor: !isEditing }] " style="display:inline-block;width: 784px;line-height:37px"> {{ teacherInfoForm.phone }} &nbsp&nbsp&nbsp<a href="javascript:" class="changephone"
                                                                                                      @click="UpdPhone()">手机号码变更</a></span>
                </el-form-item>

                <el-form-item label="身份证号：" prop="idCard">
                  <el-input v-model="teacherInfoForm.idCard"  class="inputWidth"></el-input>
                  <p class="pcolor">{{teacherInfoForm.idCard}}</p>
                </el-form-item>

                <el-form-item label="教龄：" prop="schoolAge">
                  <el-input v-model="teacherInfoForm.schoolAge"  class="inputWidth" :maxlength="2"></el-input>
                  <p class="pcolor"> {{ teacherInfoForm.schoolAge }} </p>
                </el-form-item>
                <!--第一学历-->
                <el-form-item label="第一学历：" prop="education">
                  <el-select v-model="teacherInfoForm.education" class="inputWidth"  placeholder="请选择学历" required>
                    <el-option label="高中" value="高中"></el-option>
                    <el-option label="中专" value="中专"></el-option>
                    <el-option label="大专" value="大专"></el-option>
                    <el-option label="本科" value="本科"></el-option>
                    <el-option label="硕士及以上" value="硕士及以上"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                  <p class="pcolor"> {{ teacherInfoForm.education }} </p>
                </el-form-item>
                <el-form-item label="毕业学校：" prop="graduatedFromSchool">
                  <el-input v-model="teacherInfoForm.graduatedFromSchool" class="inputWidth" ></el-input>
                  <p>{{ teacherInfoForm.graduatedFromSchool }}</p>
                </el-form-item>
                <el-form-item label="高校类别：" prop="schoolType">
                  <el-select v-model="teacherInfoForm.schoolType" class="inputWidth"  placeholder="请选择高校类别">
                    <el-option label="本科提前批次" value="本科提前批次"></el-option>
                    <el-option label="本科第一批次" value="本科第一批次"></el-option>
                    <el-option label="本科第二批次" value="本科第二批次"></el-option>
                    <el-option label="本科第三批次" value="本科第三批次"></el-option>
                    <el-option label="专科" value="专科"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                  <p class="pcolor"> {{ teacherInfoForm.schoolType }}</p>
                </el-form-item>
                <el-form-item label="是否为师范专业：" prop="ifNormal">
                  <el-radio-group v-model="teacherInfoForm.ifNormal">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <p  v-if="teacherInfoForm.ifNormal =='1'">是</p>
                  <p v-if="teacherInfoForm.ifNormal =='0'">否</p>
                  <p v-else></p>
                </el-form-item>
                <el-form-item class="block" label="毕业时间：" prop="graduationOfYear">
                  <el-date-picker
                    v-model="teacherInfoForm.graduationOfYear"
                    align="right"
                    type="year"
                    style="width: 288px;"
                    placeholder="选择年">
                  </el-date-picker>
                  <p class="pcolor">{{teacherInfoForm.graduationOfYear}}</p>
                </el-form-item>
                <!--第二学历-->
                <el-form-item label="最高学历：" prop="maxEducation">
                  <el-select v-model="teacherInfoForm.maxEducation"  class="inputWidth" placeholder="请选择父亲学历">
                    <el-option label="高中" value="高中"></el-option>
                    <el-option label="中专" value="中专"></el-option>
                    <el-option label="大专" value="大专"></el-option>
                    <el-option label="本科" value="本科"></el-option>
                    <el-option label="硕士及以上" value="硕士及以上"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                  <p class="pcolor">{{teacherInfoForm.maxEducation}}</p>
                </el-form-item>

                <el-form-item label="考取途径：" prop="maxGetTheWay">
                  <el-select v-model="teacherInfoForm.maxGetTheWay"  class="inputWidth" placeholder="请选择考取">
                    <el-option label="统招" value="统招"></el-option>
                    <el-option label="自考" value="自考"></el-option>
                    <el-option label="成招" value="成招"></el-option>
                    <el-option label="专升本" value="专升本"></el-option>
                    <el-option label="在职" value="在职"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                  <p class="pcolor">{{teacherInfoForm.maxGetTheWay}}</p>
                </el-form-item>

                <el-form-item label="毕业学校：" prop="maxGraduatedFromSchool">
                  <el-input v-model="teacherInfoForm.maxGraduatedFromSchool"  class="inputWidth"></el-input>
                  <p class="pcolor">{{teacherInfoForm.maxGraduatedFromSchool}}</p>
                </el-form-item>

                <el-form-item label="是否为师范专业：" prop="maxIfNormal">
                  <el-radio-group v-model="teacherInfoForm.maxIfNormal">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <p  class="pcolor" v-if="teacherInfoForm.maxIfNormal =='1'">是</p>
                  <p class="pcolor" v-if="teacherInfoForm.maxIfNormal =='0'">不是</p>
                  <p class="pcolor" v-else></p>
                </el-form-item>

                <el-form-item class="block" label="毕业时间：" prop="maxGraduationOfYear">
                  <el-date-picker
                    v-model="teacherInfoForm.maxGraduationOfYear"
                    align="right"
                    type="year"
                    style="width: 288px;"
                    placeholder="选择年">
                  </el-date-picker>
                  <p class="pcolor">{{teacherInfoForm.maxGraduationOfYear}}</p>
                </el-form-item>


                <div class="title"><i></i>
                  <span>教师个人信息</span></div>

                <el-form-item label="职称：" prop="jobTitle">
                  <el-select v-model="teacherInfoForm.jobTitle"  class="inputWidth" placeholder="请选择职称">
                    <el-option label="正高级" value="高中"></el-option>
                    <el-option label="高级" value="高级"></el-option>
                    <el-option label="一级" value="一级"></el-option>
                    <el-option label="二级" value="二级"></el-option>
                    <el-option label="三级" value="三级"></el-option>
                    <el-option label="无" value="无"></el-option>
                  </el-select>
                  <p class="pcolor">{{teacherInfoForm.jobTitle}}</p>
                </el-form-item>

                <el-form-item label="是否为教务主任：" prop="educationLeader">
                  <el-radio-group v-model="teacherInfoForm.educationLeader">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <p class="pcolor" v-if="teacherInfoForm.educationLeader =='1'">是</p>
                  <p class="pcolor" v-if="teacherInfoForm.educationLeader =='0'">不是</p>

                </el-form-item>

                <el-form-item label="是否为年级班主任或组长：" prop="classTeacher">
                  <el-radio-group v-model="teacherInfoForm.classTeacher">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <p class="pcolor" v-if="teacherInfoForm.classTeacher =='1'">是</p>
                  <p class="pcolor" v-if="teacherInfoForm.classTeacher =='0'">不是</p>

                </el-form-item>

                <el-form-item label="民办教师：" prop="privateTeacher">
                  <el-radio-group v-model="teacherInfoForm.privateTeacher">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <p class="pcolor" v-if="teacherInfoForm.privateTeacher =='1'">是</p>
                  <p class="pcolor" v-if="teacherInfoForm.privateTeacher =='0'">不是</p>

                </el-form-item>

                <el-form-item label="骨干教师：" prop="backboneTeacher">
                  <el-radio-group v-model="teacherInfoForm.backboneTeacher">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <p class="pcolor" v-if="teacherInfoForm.backboneTeacher =='1'">是</p>
                  <p class="pcolor" v-if="teacherInfoForm.backboneTeacher =='0'">不是</p>

                </el-form-item>

                <el-form-item label="学科带头人：" prop="theLeader">
                  <el-radio-group v-model="teacherInfoForm.theLeader">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                  <p class="pcolor" v-if="teacherInfoForm.theLeader =='1'">是</p>
                  <p class="pcolor" v-if="teacherInfoForm.theLeader =='0'">不是</p>
                </el-form-item>

                <el-form-item label="专、兼职教研员：" prop="fullOrNot">
                  <el-select v-model="teacherInfoForm.fullOrNot" class="inputWidth" placeholder="请选择职称">
                    <el-option label="专职" value="专职"></el-option>
                    <el-option label="兼职" value="兼职"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                  <p class="pcolor">{{teacherInfoForm.fullOrNot}}</p>
                </el-form-item>

                <el-form-item class="note"  label="近三年获奖或发表文章情况：（按照奖项、获奖时间、获奖级别、获奖内容顺序填写）" prop="note">
                  <el-input type="textarea" v-model="teacherInfoForm.note" class="item-text" :maxlength="200"></el-input>
                  <p class="pcolor"> {{teacherInfoForm.note }} </p>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <!--新增部分-->
          <div v-show="dialogupd" class="Tel_dialog">
            <div class="Tel_title">手机号码变更</div>
            <div class="Tel_From">
              <el-form :model="UpdateForm" ref="UpdateForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="原始手机号码：" prop="oldtel">
                  <el-input :disabled="true" v-model="UpdateForm.oldtel" placeholder="原始手机号码"></el-input>
                </el-form-item>
                <el-form-item style="text-align:left;" label="短信验证码：" prop="code">
                  <el-row :gutter="20">
                    <el-col :span="14" style="padding:0;height:36px;">
                      <el-input style="margin-left:0; width:100%" v-model="UpdateForm.code"
                                placeholder="短信验证码："></el-input>
                    </el-col>
                    <el-col :span="8" style="padding-left:8px;">
                      <el-button v-text="Btnmsg" @click="GetVercode()" style="padding:10px 10px;"></el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="新手机号码：" prop="newtel">
                  <el-input v-model="UpdateForm.newtel" placeholder="新手机号码"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="Tel_footer">
              <el-row>
                <el-col :span="12">
                  <el-button type="info" style="width:120px;letter-spacing:2px;" @click="ClearTel()">取消</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button type="success" style="width:120px;letter-spacing:2px;" @click="SureTel()">确定</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="mask" v-show="dialogupd"></div>
        </section>


      </el-tab-pane>
      <el-tab-pane label="教师执教信息" name="teacherteachinginfo">
        <!--选择教学信息-->
        <div class="teachingMsg">
          <!--<div class="callBackBtn">-->
          <!--<div class="editBtn" :class="{hideStatus: !hideBtnState}">-->
          <!--<el-button @click="editPages" type="success"> <i class="icon-edit svgStyle"></i> 编辑</el-button>-->
          <!--</div>-->
          <!--<div class="hideBtn" :class="{hideStatus: hideBtnState}">-->
          <!--<el-button @click="cancelPages" type="primary"><i class="icon-cancel svgStyle"></i>取消</el-button>-->
          <!--<el-button @click="savePages" type="success"><i class="icon-conserve svgStyle"></i>保存</el-button>-->
          <!--</div>-->
          <!--</div>-->
          <div class="titleContent">
            <i class="title-icon"></i>
            <span class="title-text">任教班级科目</span>
          </div>
          <div class="paddingTen">
            <div class="gradeContent">
              <el-radio-group v-model="currentGradeId" @change="getCurrentGradeId(currentGradeId)">
                <el-radio-button v-for="(item,index) in gradeList" :label="item" :key="index"> {{item.gradeName}}
                </el-radio-button>
              </el-radio-group>
            </div>
            <div class="scoreTable">
                <table class="table" v-for="(item,index) in gradeList" border="1" v-show="item.gradeId == currentGradeId.gradeId" v-if="item.classInfo.length>0">
                  <tr>
                    <th>班级</th>
                    <th v-for="subject in item.classInfo[0].subjectInfo">{{subject.subjectName}}</th>
                  </tr>
                  <tr v-for="classList in item.classInfo">
                    <td :title="classData" ref="td" v-for="classData in classList" v-if="classData == classList.className">{{classData}}</td>
                    <td :title="teacherData.teachingInfo.teacherName" ref="td" v-for="teacherData in classList.subjectInfo"
                        :class="teacherData.teachingInfo.teacherName == '' ? 'AllowClick' : 'hasPeople'"
                        @click="getTarget(classList,teacherData,$event)"
                        v-html="teacherData.teachingInfo.teacherId == userInfo.id ? queryRight : teacherData.teachingInfo.teacherName"></td>
                  </tr>
                </table>
                <div class="noData" v-for="(item,index) in gradeList" v-show="item.gradeId == currentGradeId.gradeId" v-if="item.classInfo.length <= 0">
                  <p class="empty-text">暂无科目信息</p>
                </div>
            </div>
          </div>
          <div class="querySubWrap">
            <div class="titleContent">
              <!--<i class="title-icon"></i>-->
              <span class="title-text">已选课程：</span>
            </div>
            <ul class="subjectNameContent">
              <li class="subjectInfo" v-for="teacherData in selectSubject">{{teacherData.gradeName}}
              <span>{{teacherData.className}}（{{teacherData.subjectName}}）</span>
              </li>
            </ul>
            <div class="gradeContentBtn">
              <!--<el-button class="primary" type="primary" @click="submitSubject">保存</el-button>-->
              <!--<el-button  type="text"  @click="skipSubject">跳过</el-button>-->
            </div>
          </div>
        </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'teacherPersonal',
    data () {
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
        activeName: 'teacherpersonageinfo',
        //新增部分
        dialogupd: false,
        Btnmsg: "发送验证码",
        bool: true,
        UpdateForm: {oldtel: '', code: '', newtel: ''},
        Usercode: '',

        isshowgradeClass: false,
        gradeClass: '',
        userInfo: '',
        type: this.$route.params.type,
        value: '',
        // 全屏遮罩层
        fullscreenLoading: true,
        // 编辑输入框
        teacherInfoForm: {
          id: this.$route.params.id,
          teacherAge:'',
          name: '',
          sex: '',
          national: '',
          phone: '',
          idCard: '',
          schoolAge: '',//教龄
          //第一学历
          education: '',//第一学历
          graduatedFromSchool: '',//毕业学校
          schoolType: '',//高校类别
          ifNormal: '',//是否为师范专业
          graduationOfYear: '',//毕业年份
          // 第二学历
          maxEducation: '',
          maxGraduatedFromSchool: '',
          maxGetTheWay: '',
          highestIfNormal: '',
          highestGraduationOfYear: '',
          //个人信息
          jobTitle: '',//职称
          educationLeader: '',//是否为教务主任
          classTeacher: '',//是否为年级主任
          privateTeacher: '',//是否为民办教师
          backboneTeacher: '',//是否为骨干教师
          theLeader: '',//学科带头人
          fullOrNot: '',//专兼职
          note: '',
        },
        //民族参数
        restaurants: [],
        nation: '',
        // 校验
        teacherInfoRules: {
          name: [
            {required: true, message: '请输入机构名称', trigger: 'change'},
            {pattern:  /^[\S]{1,40}$/, message: '用户名为小于40个的字符'},
          ],
          teacherAge:[
            {pattern: /^\d{1,2}$/, message: '请输入1到2位数的数字'},
          ],
          national: [
            {required: true, message: '请选择民族', trigger: 'change'},
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          phone: [
            {required: true, message: '请输入电话号', trigger: 'change'},
            {pattern: /^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/, message: '请输入正确的电话号码'},
            {min: 11, max: 11, message: '请输入11个数字', trigger: 'blur'}
          ],
          idCard: [
            {required: false, message: '请输入身份证号', trigger: 'change'},
            {pattern: /^([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9xX]))|（(yt)\S{0,18}）$/i,message: '身份证号格式输入错误！'},
          ],
          schoolAge: [
            {required: true, message: '请输入教龄', trigger: 'change'},
            {pattern: /^\d{1,2}$/, message: '请输入1到2位数的数字'},
          ],
          education: [
            {required: true, message: '请选择第一学历', trigger: 'change'}
          ],
          note: [
            {validator: checkNote, trigger: 'blur' }
            ]
        },


        // 编辑切换
        isEditing: false,


        currentGradeId: '',//d 班级id
        teacherId: '',
        gradeList: [],
        selectSubject: [],
        editStatus: false,
        hideBtnState: true,
        oldSubMsg: '',
        oldSelectSubject: [],
        queryRight: '<i class="el-icon-check queryRight"></i>',
        allowEdit: false,


      }
    },
    mounted(){
      /* this.getOrgTree()
       this.getOrgUserLists()
       this.getAreaTree()
       // this.getOrgInfo(this.orgInfoId)*/
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.teacherId = this.userInfo.id;
      if (this.userInfo.headTeacherClassList) {
        this.userInfo.headTeacherClassList.forEach((item, index) => {
          this.gradeClass += item.gradeName + '（' + item.className + '）、';
        });
        this.gradeClass = this.gradeClass.substring(0, this.gradeClass.length - 1);
        this.isshowgradeClass = true;
      }
      /* console.log(this.gradeClass);
       console.log(this.userInfo.headTeacherClassList.gradeName);
       console.log(this.userInfo.headTeacherClassList.className);
       console.log(this.userInfo.id);*/
      this.getteacherInfo();

    },
    methods: {
      //tab切换
      handleClick(tab, event) {
        console.log(tab, event);
        if (tab.name == 'teacherteachinginfo') {
          this.fullscreenLoading = true;
          this.getSubjectMsg();
        }
      },
      // begin D
      getSubjectMsg(){
        const self = this;
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        self.$ajax('teacher/findTeachingBySchoolId',
          {"schoolId": userInfo.schools.schoolId}
//            {"schoolId":1}
        ).then(function (response) {
//            console.log(response);
          if (response.code == 200) {
            self.fullscreenLoading = false;
            self.gradeList = response.data;
            self.oldSubMsg = response.data;
            self.currentGradeId = response.data[0];
            var gradeData = response.data;
            self.selectSubject = [];
            self.oldSelectSubject = [];
            gradeData.forEach((item, i) => {
              item.classInfo.forEach((subjectInfo, c) => {
                subjectInfo.gradeId = item.gradeId;
                subjectInfo.gradeName = item.gradeName;
                subjectInfo.subjectInfo.forEach((teaching, o) => {
                  teaching.classId = subjectInfo.classId;
                  teaching.gradeId = subjectInfo.gradeId;
                  teaching.gradeName = subjectInfo.gradeName;
                  teaching.className = subjectInfo.className;

                  if (teaching.teachingInfo.teacherId == self.teacherId) {
                    self.selectSubject.push(teaching);
                    self.oldSelectSubject.push(teaching);
                  }
//                });
                });
              });
            });
          } else {
            self.$alert(response.message, '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
//      editPages(){
////          编辑
//        this.allowEdit = true;
//        this.editStatus = true;
//        this.hideBtnState = false;
//      },
//      cancelPages(){
//        //取消编辑
//        this.editStatus = false;
//        this.hideBtnState = true;
//
//        var oldSelectData = new Array();
//        oldSelectData = this.oldSelectSubject;
//        this.selectSubject = oldSelectData;
//        this.selectSubject.forEach( ( item, i ) => {
//
//        });
//        this.$set(this.selectSubject,oldSelectData);
//
//
//        this.allowEdit = false;
//        var tdList = this.$refs.td;
////        console.log(tdList);
//        tdList.forEach( ( item, i ) => {
//            if (item.className == 'AllowClick' && item.innerHTML == '<i class="el-icon-check queryRight"></i>'){
//              item.innerHTML='';
//            }
//          });
////        this.getSubjectMsg();
//      },
//      //      提交勾选的学科
//      savePages(){
//        let subjectData = [];
//        let sub = {};
//        let self = this;
//        if(this.selectSubject != "" && this.selectSubject.length>0){
//          this.selectSubject.forEach( ( item, i ) => {
//            let sub = new Object();
//            sub.classId = item.classId;
//            sub.subjectId = item.subjectId;
//            sub.teacherId = this.userInfo.id;
//            subjectData.push(sub);
//          });
//          subjectData = JSON.stringify(subjectData);
//          this.$ajax('teacher/bitchSaveClassTeacherSubject',
//            {"data":subjectData}
//          ).then(function (response) {
//            if (response.code == 200){
//              self.allowEdit = false;
//              self.editStatus = false;
//              self.hideBtnState = true;
////              self.oldSelectSubject = self.selectSubject;
//              self.$alert(response.message, '提示', {
//                confirmButtonText: '确定',
//                callback: action => {
//                  self.fullscreenLoading = true;
//                  self.getSubjectMsg();
//                }
//              });
//            }else {
//              self.$alert(response.message, '提示', {
//                confirmButtonText: '确定',
//                callback: action => {}
//              });
//            }
//          }).catch(function (error) {
//            console.log(error);
//          });
//
//        }else {
//          this.$alert('请选择任课学科后再点击保存', '提示', {
//            confirmButtonText: '确定',
//            callback: action => {
//              //                  this.$message({
//              //                    type: 'info',
//              //                    message: `action: ${ action }`
//              //                  });
//            }
//          });
//        }
//        //        console.log(JSON.stringify(this.selectSubject))
//      },
      getCurrentGradeId(GradeId,){
//         console.log(GradeId);
//        this.currentGradeId = GradeId;
//        this.getTeachingMsg()
      },
      // 添加选择的科目
      getTarget(item, list, event){
//        console.log(1,this.allowEdit);
        if (this.allowEdit == true) {
          let data = list;
          if (list.teachingInfo.teacherName == "" || list.teachingInfo.teacherId == this.teacherId) {
            data.classId = item.classId;
            data.className = item.className;
            data.gradeId = this.currentGradeId.gradeId;
            data.gradeName = this.currentGradeId.gradeName;
            //              console.log(event.target.tagName)
            var queryRight = '<i class="el-icon-check queryRight"></i>';
            if (event.target.innerHTML == "" && event.target.tagName == "TD") {
              event.target.innerHTML = queryRight;
              this.selectSubject.push(data);
//                console.log(this.selectSubject);


            } else if (event.target.tagName == "I") {
              event.target.parentNode.innerHTML = '';
              this.selectSubject.forEach((item, i) => {
                if (item == data) {
                  this.selectSubject.splice(i, 1);
                }
              });
            } else {
              event.target.innerHTML = '';
              this.selectSubject.forEach((item, i) => {
                if (item == data) {
                  this.selectSubject.splice(i, 1);
                }
              });
            }
//            console.log(item,list);
//            console.log(this.selectSubject);
          }
        }
      },

      //新增部分
      UpdPhone(){
        this.dialogupd = true;
        this.UpdateForm.oldtel = this.teacherInfoForm.phone;
      },
      GetVercode(){
        var _self = this;
        if (!this.bool)return;
        var contlength =60;
        var restInterval = window.setInterval(function () {
          if (contlength == 0) {
            clearInterval(restInterval);
            _self.Btnmsg = "获取验证码";
            _self.bool = true;
            return;
          }
          _self.Btnmsg = contlength+'s后可重发';
          contlength--;
        }, 1000);
        let params = {
          phone: this.teacherInfoForm.phone,
        };
        this.$ajax('/teacher/sms/send', params).then(res => {
          if (res.code == 200) {
            console.log(res);
            console.log(res.data)
            _self.Usercode = res.data;
            console.log(_self.Usercode)
            //
          } else {
          }
        });
      },
      ClearTel(){
        this.dialogupd = false;
        //this.Btnmsg="获取验证码";
        //this.bool=true;
      },
      SureTel(){
        var _self = this.UpdateForm;
        //if(_self.code =="")
        var ph = /^1[3|4|5|8][0-9]\d{4,8}$/;
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
            message: '请输入验证码',
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

        this.$ajax('/schadmin/changeLoginName', {
          oldPhone: _self.oldtel,
          newPhone: _self.newtel,
          isSchoolHeader: 0
        }).then(res => {
          if (res.code == 200) {
            this.$message({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
            this.teacherInfoForm.phone = _self.newtel;
            this.dialogupd = false;
          } else {
            this.$message({
              type: 'error',
              message: res.message
            });

          }
        });
      },

      // 获取教师基本信息
      getteacherInfo(id){
        let params = {
          //schoolId:  this.userInfo.schools.schoolId,
          teacherId: this.userInfo.id,
          //isSchoolHeader:1
        };
        this.$ajax('/teacher/ceneter/getInfo', params)
          .then(res => {
            this.teacherInfoForm = res.data;
            this.fullscreenLoading = false;
          });
      },
      //编辑保存教师基本信息
      saveteacherInfoForm(){
        this.$refs.form.validate((valid) => {
          if (valid) {

            this.teacherInfoForm.graduationOfYear = Object.prototype.toString.call(this.teacherInfoForm.graduationOfYear) === '[object Date]' ? this.teacherInfoForm.graduationOfYear.getFullYear() : this.teacherInfoForm.graduationOfYear;
            this.teacherInfoForm.maxGraduationOfYear = Object.prototype.toString.call(this.teacherInfoForm.maxGraduationOfYear) === '[object Date]' ? this.teacherInfoForm.maxGraduationOfYear.getFullYear() : this.teacherInfoForm.maxGraduationOfYear;
            let params = {
              schoolId: this.userInfo.schools.schoolId,
              teacherId: this.$route.params.id,
              id: this.teacherInfoForm.id,
              teacherAge:this.teacherInfoForm.teacherAge,
              name: this.teacherInfoForm.name,
              sex: this.teacherInfoForm.sex,
              national: this.teacherInfoForm.national,
              phone: this.teacherInfoForm.phone,
              idCard: this.teacherInfoForm.idCard,
              schoolAge: this.teacherInfoForm.schoolAge,
              /*第一学历*/
              education: this.teacherInfoForm.education,
              graduatedFromSchool: this.teacherInfoForm.graduatedFromSchool,
              schoolType: this.teacherInfoForm.schoolType,
              ifNormal: this.teacherInfoForm.ifNormal,
              graduationOfYear: this.teacherInfoForm.graduationOfYear,
              /*第一学历*/
              maxEducation: this.teacherInfoForm.maxEducation,
              maxGraduatedFromSchool: this.teacherInfoForm.maxGraduatedFromSchool,
              maxGetTheWay: this.teacherInfoForm.maxGetTheWay,
              maxIfNormal: this.teacherInfoForm.maxIfNormal,
              maxGraduationOfYear: this.teacherInfoForm.maxGraduationOfYear,
              /*个人信息*/
              jobTitle: this.teacherInfoForm.jobTitle,
              educationLeader: this.teacherInfoForm.educationLeader,
              classTeacher: this.teacherInfoForm.classTeacher,
              privateTeacher: this.teacherInfoForm.privateTeacher,
              backboneTeacher: this.teacherInfoForm.backboneTeacher,
              theLeader: this.teacherInfoForm.theLeader,
              fullOrNot: this.teacherInfoForm.fullOrNot,
              note: this.teacherInfoForm.note,

              /* orgId: this.selectedCounty || this.selectedCity || this.selectedProvince,*/
            };

            this.$ajax('/teacher/ceneter/editInfo', params)
              .then(res => {
                if (res.code == 200) {
                  this.$alert('保存成功', '标题名称', {
                    confirmButtonText: '确定',
                  });
                  this.isEditing = false;
                } else {
                  this.$alert(res.message, '提示', {
                    confirmButtonText: '确定',

                  });
                  this.isEditing = false;
                }

              });
          } else {
            this.$message.error('必填项未填写');
            // return false;

          }
        });

      },
      // 编辑机构信息
      editOrgInfoForm(){

        this.isEditing = true;

      },
      // 取消机构信息
      cancelOrgInfoForm(){
        this.isEditing = false;
        this.getteacherInfo(this.teacherInfoForm)
      },
    },
    watch: {
      searchText(val) {
        this.$refs.orgLists.filter(val);
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  #teacherPersonal {
    padding:20px 20px 50px 20px;
  }
/*  系统自带*/
  #teacherPersonal .el-form-item {
      margin-bottom: 14px;
    }
  #teacherPersonal  .el-form-item__error {
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    position: absolute;
    top: 100%;
    left: 0;
  }
  #teacherPersonal.el-form-item__label{
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
  #teacherPersonal  .el-button{
    padding: 5px 16px;
  }

  .space-between {
    display: flex;
    justify-content: space-between;
  }

  .space-around {
    display: flex;
    justify-content: space-around;
  }

  .tabs-header .editor {
    padding: 10px;
    display: block;
  }

  /* 查看显示p  隐藏输入框*/
  /*输入框*/
  .edit .el-input {
    display: none;
  }

  .edit .item-text {
    display: none;
  }

  /*下拉框*/
  .edit .el-select {
    display: none;
    /* display: inline-block; */
  }

  /*民族*/
  .edit .el-autocomplete {
    display: none;
  }

  /*单选*/
  .edit .el-radio-group {
    display: none;
  }

  /* 编辑状态隐藏p  显示输入框*/
  .edit.editing p {
    display: none;
  }
  /*改变详情p的文字颜色*/
  #teacherPersonal .pcolor{
    font-size: 14px;
    color:#666666;
    border-bottom: 1px dotted #f0f0f0;
  }
  /*输入框*/
  .edit.editing .el-input {
    display: inline-block;
  }

  /*下拉框*/
  .edit.editing .el-select {
    display: inline-block;
  }

  /*单选*/
  .edit.editing .el-radio-group {
    line-height: 36px;
    display: block;
  }

  .edit.editing .item-text {
    display: block;
  }

  /*民族*/
  .edit.editing .el-autocomplete {
    display: block;
  }

  .pagination {
    margin-top: 30px;
  }

  b {
    font-weight: normal;
  }

  .blind {
    clip: rect(1px, 1px, 1px, 1px);
    clip: rect(1px 1px 1px 1px);
    position: absolute;
  }

  /* .el-select .el-input .el-input__icon{
     right:420px;
   }*/

  /*负责人样式*/
  .space-between {
    line-height: 50px;
    float: right;
    margin-left: 20px;

  }

  .el-table {
    width: 742px;
    margin: 0 auto;
  }

  .principal-top span {
    display: inline-block;
  }

  .principal-top {
    width: 984px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e9edf1;
    margin-bottom: 16px;
  }

  /*标题样式*/
 #teacherPersonal .title {
    padding: 20px 0 18px 0;
    /* border-bottom: 1px solid #e9edf1;*/
  }

  #teacherPersonal  .title i {
    display: inline-block;
    height: 16px;
    width: 3px;
    margin-right: 7px;
    background: #0d9ee9;
    position: relative;
    top:2px;
  }

  #teacherPersonal  .title span {
    font-size: 14px;
    color: #0d9ee9;
    display: inline-block;
    line-height: 12px;
  }

  /*新增部分*/
  .Tel_dialog{
    border-top:4px solid #049be8;
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
    margin-top: 15px;
}
  #teacherPersonal .el-form-item__content{
    height: 36px;
  }
  #teacherPersonal .callBackBtn {
    border-bottom: 1px solid #ECEDEF;
    padding-bottom: 25px;
    padding-top: 15px;
    position: relative;
  }

  #teacherPersonal .svgStyle {
    margin-right: 5px;
  }

  #teacherPersonal .el-button--text {
    font-size: 16px;
    color: #666666;
  }

  #teacherPersonal .editBtn {
    /*margin: 20px 0;*/
    position: absolute;
    right: 0;
    top: 0;
    display: inline-block;
    text-align: right;
  }

  #teacherPersonal .callBackBtn button {
    padding: 0;
    width: 84px;
    height: 28px;
    text-align: center;
    line-height: 28px;
  }

  #teacherPersonal .hideBtn {
    position: absolute;
    right: 0;
    top: 0;
  }

  #teacherPersonal .hideStatus {
    display: none;
  }

  #teacherPersonal .AllowClick {
    cursor: pointer;
  }

  /*选择科目样式*/
  #teacherPersonal .gradeContent {
    text-align: left;
    margin-top: 15px;
  }
  #teacherPersonal .subjectNameContent {
    margin-top: 10px;
  }

  #teacherPersonal .scoreTable .table {
    width: 100%;
    border: 1px solid #dfe6ec;
    margin-top: 10px;
  }

  #teacherPersonal .scoreTable .table tr, td {
    text-align: center;
    border-bottom: 1px solid #dfe6ec;
    border-right: 1px solid #dfe6ec;
  }

  #teacherPersonal .scoreTable .table tr:nth-child(1) th {
    font-weight: 600;
  }

  #teacherPersonal .scoreTable .table th {
    box-sizing: border-box;
    text-align: center;
    background-color: #effaff;
    color: #007dc4;
    border: none;
    border-left: 1px solid #a5defa;
    border-top: 1px solid #a5defa;
    padding: 2px 1px
  }

  #teacherPersonal .scoreTable .table td {
    box-sizing: border-box;
    height: 30px;
  }

  #teacherPersonal .gradeContentBtn {
    width: 300px;
    margin: 20px auto;
  }

  #teacherPersonal .gradeContentBtn button {
    width: 30%;
    height: 36px;
    margin-right: 11px;
  }

  #teacherPersonal .queryRight {
    color: #24c178;
  }
  #teacherPersonal .paddingTen {
    padding: 0 10px;
    box-sizing: border-box;
  }

  #teacherPersonal .querySubWrap {
    margin-top: 20px;
    text-align: left;
  }

  #teacherPersonal .subjectInfo {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    background: #effaff;
    color: #007dc4;
    border-radius: 5px;
    padding: 0 10px;
    margin: 0 10px 10px 0;
  }

  #teacherPersonal .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 0;
  }

  #teacherPersonal .el-radio-button:first-child .el-radio-button__inner {
    border-radius: 0;
  }

  #teacherPersonal .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    color: #fff;
    background-color: #0d9ee9;
    border-color: #0d9ee9;
  }

  #teacherPersonal .el-radio-button {
    margin-right: 8px;
  }

  #teacherPersonal .el-radio-button__inner {
    border: 1px solid #bfcbd9;
  }
  #teacherPersonal .noData{
    background: url("../../../resources/front/imgs/nodata.png") no-repeat center;
    margin-top: 50px;
    height: 233px;
    margin-bottom: 40px;
    position: relative;
  }

  #teacherPersonal .noData .empty-text{
    position: absolute;
    left: 50%;
    transform: translate(-50%,0);
    bottom:-30px;
    font-size: 14px;
    color: #b6b6b6;
  }
  #teacherPersonal .title-icon {
    display: inline-block;
    width: 3px;
    height: 14px;
    background: #0e9deb;
    vertical-align: middle;
  }
  #teacherPersonal .title-text {
    display: inline-block;
    margin-left: 7px;
    /*font-size: 14px;*/
    color: #0d9ee9;
    /*font-family: "\5B8B\4F53";*/
    vertical-align: middle;
  }
  #teacherPersonal  .changephone{
    text-decoration:underline;
    color: #0d9ee9;
  }
  .inputWidth{
    width: 288px;
  }
  /*tab切换*/
  #teacherPersonal .el-tabs__active-bar{
    bottom: initial;
  }
  #teacherPersonal .el-tabs__item.is-active{
    border-bottom: 1px solid #fff;
  }
  #teacherPersonal .el-tabs__item {
    border: 1px solid #cedaea;
  }
  #teacherPersonal .el-tabs__content{
 /*   position: relative;
    top: 10px;*/
    border: 1px solid #cedaea;
    padding:10px 20px 100px 20px ;
    border-top: none;
  }
  #teacherPersonal .el-tabs__header{
    margin: 0;
  }
  #teacherPersonal .text-right {
   padding-bottom: 10px;
    text-align: right;
    border-bottom: 1px solid #cedaea;
  }
  #teacherPersonal .scoreTable .table{
    table-layout:fixed;
    word-wrap:break-word;
  }
  #teacherPersonal .scoreTable .table td{
    white-space:nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
    /*max-width: 200px;*/
    /*width: 50px;*/
  }
</style>
