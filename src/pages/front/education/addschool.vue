<template>
  <div id="addschool" style="text-align: left">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" v-on:submit="submitForm">
      <div  class="btns">
        <a href="javascript:;"  @click="toEduSchoolMgr" class=" icon-back">返回 </a>
      </div>
      <div class="title"><i></i>
        <span>基础信息</span>
        <el-button style="float: right;" class="white-color add-btn el-button  icon-conserve el-button--primary" type="primary" v-if="isSaveSchool == false" @click="submitForm('ruleForm')" >  保存</el-button>
      </div>
      <el-form-item label="校归属地区：" prop="orgInfo">
       <!-- <el-cascader
          :options="orgListsData"
          :change-on-select = "true"
          :show-all-levels="false"
          style="width:288px;"
          v-model="educationIds"
          :placeholder="userInfo.education.orgName" v-show="isSaveSchool == false"
        ></el-cascader>-->
        <el-select v-model="selectedProvince" style="width:288px;" :placeholder="defaultProvince.name" @change="provinceChange" :disabled="defaultMaxLevel>=1" class="item-text"  v-show="isSaveSchool == false">
          <el-option
            v-for="item in province"
            :label="item.name"
            :value="item"
            :key="item.id"
          >
          </el-option>
        </el-select>
        <el-select v-model="selectedCity" @change="cityChange" :placeholder="defaultCity.name" class="item-text" v-if="city.length !=0 || (defaultProvince.id  != '' && defaultProvince.id != null )" :disabled="defaultMaxLevel>=2" v-show="isSaveSchool == false">
          <!--<el-option value="省直属">省直属</el-option>-->
          <el-option
            v-for="item in city"
            :label="item.name"
            :value="item"
            :key="item.id"
          >
          </el-option>
        </el-select>
        <el-select v-model="selectedCounty" @change="countyChange" :placeholder="defaultCounty.name" class="item-text" v-if="county.length !=0 || (defaultCity.id  != '' && defaultCity.id != null )"  :disabled="defaultMaxLevel>=3" v-show="isSaveSchool == false">
         <!-- <el-option value="市直属">市直属</el-option>-->
          <el-option
            v-for="item in county"
            :label="item.name"
            :value="item"
            :key="item.id"
          >
          </el-option>
        </el-select>
        <p v-show="isSaveSchool != false">{{orgNameStr}}</p>

      </el-form-item>
      <el-form-item label="学校名称：" prop="name">
        <el-input v-model.trim="ruleForm.name" v-show="isSaveSchool == false" :maxlength="30" style="width:288px;"></el-input>
        <p v-show="isSaveSchool != false" >{{ruleForm.name}}</p>
      </el-form-item>
      <el-form-item label="学校类型：" prop="schoolType">
        <el-select name="schoolType" id="ruleForm.schoolType" v-model="ruleForm.schoolType" style="width:288px;" v-on:change="changeSchoolType" v-show="isSaveSchool == false">
          <el-option label="请选择" value="">请选择</el-option>
          <!--<el-option label="大学" value="1">大学</el-option>-->
          <el-option label="高中" value="2">高中</el-option>
          <el-option label="初中" value="3">初中</el-option>
          <el-option label="完中" value="4">完中</el-option>
          <el-option label="九年一贯制" value="5">九年一贯制</el-option>
          <el-option label="小学" value="6">小学</el-option>
          <!--  <el-option label="教学点" value="7">教学点</el-option>-->
          <el-option label="完小" value="8">完小</el-option>
          <el-option label="职业高中(职高)" value="9">职业高中(职高)</el-option>
          <el-option label="中等专业学校(中专)" value="10">中等专业学校(中专)</el-option>
          <!--  <el-option label="技工学校(技校)" value="11">技工学校(技校)</el-option>
						<el-option label="普通高等学校(体校、军校)" value="12">普通高等学校(体校、军校)</el-option>-->
        </el-select>
        <p v-show="isSaveSchool != false" >{{convertSchoolType(ruleForm.schoolType)}}</p>
      </el-form-item>
      <el-form-item label="学制：" prop="codeVal">
        <!-- 学制不可选择情况：职高、职专、高中、其它情况；-->
        <el-select name="codeVal" id="codeVal" v-model="codeVal"  style="width:288px;" v-on:change="changeSchooling" v-bind:disabled="ruleForm.schoolType === '' || ruleForm.schoolType > 8 || ruleForm.schoolType == 2" v-show="isSaveSchool == false">
          <el-option value="">请选择</el-option>
          <el-option label='六三制' value="1">六三制</el-option>
          <el-option  label='五四制' value="2">五四制</el-option>
        </el-select>
        <p v-show="isSaveSchool != false" >{{convertCodeType(ruleForm.codeType)}}</p>
      </el-form-item>
      <el-form-item label="教学范围" prop="region" class="region">
            <ul class="grads" v-show="isSaveSchool == false">
              <li v-for="(grad, index) in grads" v-show="grad['display'] === true">
              <label v-bind:for="'grad' + index" v-bind:class="{ disabled:grad['disabled'], checked:grad['checked'] }">{{grad['name']}}</label>
              <input type="checkbox" v-bind:id="'grad' + index" name="grad[]" v-bind:disabled="grad['disabled']" v-bind:checked="grad['checked']" class="blind" v-on:change="changeGrad(index, $event)">
              </li>
            </ul>
            <p v-show="isSaveSchool != false" >{{convertGrads(grads)}}</p>
      </el-form-item>

      <el-form-item label="地理位置：" prop="position"  v-show="isSaveSchool == false">
        <el-select v-model="ruleForm.position" style="width:288px;"  placeholder="请选择地理位置">
          <el-option label="中学城区" value="1"></el-option>
          <el-option label="城乡结合" value="2"></el-option>
          <el-option label="近郊" value="3"></el-option>
          <el-option label="远郊" value="4"></el-option>
          <el-option label="山区" value="5"></el-option>
        </el-select>
        <p v-show="isSaveSchool != false" >{{convertPosition(ruleForm.position)}}</p>
      </el-form-item>
      <!--------------------------所在地址-------------------------------->
      <el-form-item label="所在地址：" prop="address">
        <el-input type="textarea" class="address" v-model.trim="ruleForm.address"   placeholder="请输入详细地址" v-show="isSaveSchool == false" :maxlength="50"></el-input>
        <p v-show="isSaveSchool != false" >{{( selectedCounty.name || '')+( selectedCity.name || '')+( selectedProvince.name || '')+(ruleForm.address)}}</p>
      </el-form-item>


      <!--------------------------所在地址结束-------------------------------->
      <el-form-item label="描述：" prop="describe">
        <el-input type="textarea" v-model.trim="ruleForm.describe" v-show="isSaveSchool == false" :maxlength="200"></el-input>
        <p v-show="isSaveSchool != false" >{{ruleForm.describe}}</p>
      </el-form-item>
    </el-form>
    <!------------------机构人员----------------->
    <div id="userListDiv">
        <div style="height:50px;border-bottom: 1px solid #e9edf1;margin-bottom: 20px;"  v-if="isAdd">
          <div class="title">
            <i></i>
            <span>负责人信息</span></div>
          <div class="tabs-header space-between">
              <el-button type="success" @click="addOrgUser"   icon="plus">新建人员</el-button>
              <!-- <el-button type="danger" @click="orgUsersBatchDelete" icon="delete2" :disabled="true">批量删除</el-button> -->
            </div>
        </div>
        <div class="tabs-body" v-if="isAdd">
            <el-table
              :data="orgUsers"
              border
              tooltip-effect="dark"
              @cell-click="getOrgUserCurrentInfo"
              @selection-change="orgUsersSelectionChange" >
              <!-- <el-table-column
                type="selection"
                width="55">
              </el-table-column> -->
              <el-table-column
                prop="name"
                label="姓名"
                width="170">
              </el-table-column>
              <el-table-column
                prop="phoneNumber"
                label="手机号"
                width="200">

              </el-table-column>
              <el-table-column
                label="操作"
                width="320"
              >

                <template scope="scope">
                  <el-button
                    type="primary"
                    size="small"
                    @click="orgUsersEdit(scope.$index, scope.row)">编辑</el-button>
                <!--  <el-button
                    type="primary"
                    size="small"
                    @click="orgUsersRestPwd(scope.$index, scope.row)">重置密码</el-button>-->
                  <el-button
                    type="danger"
                    size="small"
                    @click="orgUsersDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination text-right">
            <!-- <el-pagination
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="orgUserTotal"
              @current-change="paginationCurrentChange"
              >
            </el-pagination> -->
          </div>
            <el-dialog title="新建人员信息" v-model="dialogVisibleAdd"  :close-on-click-modal="false" size="tiny" >
              <el-form ref="orgUserFormAdd" :model="orgUserFormAdd" :rules="orgUserAddRules" label-width="90px">
                <el-form-item label="姓名：" prop="name">
                  <el-input v-model.trim="orgUserFormAdd.name" :maxlength="40" :minlength="2"></el-input>
                </el-form-item>
                <el-form-item label="手机号：" prop="phone" >
                  <el-input v-model.trim="orgUserFormAdd.phone" :maxlength="11"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleAdd = false">取 消</el-button>
                <el-button type="success" @click="orgUserFormAddData()">添 加</el-button>
              </span>
            </el-dialog>
            <el-dialog title="编辑人员信息" v-model="dialogVisibleEdit"  :close-on-click-modal="false" size="tiny" >
              <el-form ref="orgUserFormEdit" :model="orgUserFormEdit" :rules="orgUserAddRules" label-width="90px">
                <el-form-item label="姓名：" prop="name">
                  <el-input v-model.trim="orgUserFormEdit.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号：" prop="phone" v-if=" userInfo.roleId != 4 ">
                  <el-input v-model.trim="orgUserFormEdit.phone"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleEdit = false">取 消</el-button>
                <el-button type="success" @click="orgUserFormEditData()">保 存</el-button>
              </span>
            </el-dialog>
        </div>
      </div>
  </div>
</template>

<script>
  import ElIcon from "../../../../node_modules/element-ui/packages/icon/src/icon";
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
    components: {ElIcon},
    data() {
      var regExp = /select|update|delete|truncate|join|union|exec|insert|drop|count|script|src|alert|window|document|location|>|<|%/i;
      var checkSchoolName = (rule, value, callback) => {
        if(value == null || value == ""){
          callback(new Error("学校名称不能为空！"));
        }else if(value.length > 30){
          callback(new Error("最多可输入30个字！"))
        }else if(regExp.test(value)){
          callback(new Error("输入中不能包含特殊字符！"))
        }else{
          callback();
        }
      };
      var checkUserName = (rule, value, callback) => {
        if(value == null || value == ""){
          callback(new Error("姓名不能为空！"));
        }else if(value.length < 2){
          callback(new Error("姓名输入在2~40个字！"))
        }else if(value.length > 40){
          callback(new Error("姓名输入在2~40个字！"))
        }else if(regExp.test(value)){
          callback(new Error("输入中不能包含特殊字符！"))
        }else{
          callback();
        }
      };
      var checkAddress = (rule, value, callback) => {
        if(value == null || value == ""){
          callback();
        }else if(value.length > 50){
          callback(new Error("最多可输入50个字！"))
        }else if(regExp.test(value)){
          callback(new Error("输入中不能包含特殊字符！"))
        }else{
          callback();
        }
      };
      var checkDescribe = (rule, value, callback) => {
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
      var checkCodeVal = (rule, value, callback) => {
        if(value == null || value == ""){
          callback(new Error("学制不能为空！"))
        }
        else{
          callback();
        }
      };
      return {
        userInfo:'', //用户基本信息
        orgListsData: [], //机构列表
        orgNameStr: [],  //保存成功后返显的机构名称
        educationIds: [],  //机构选择层级id集合
        orgName:'',

        grads: '',
        selectedGrad: [],
        codeVal: '', //学制value值，Number类型
        indexStart: '',
        indexEnd: '',

        ruleForm: {
          orgId: '',       //区域ID
//          educationId: '', //机构ID
          name: '',        //学校名称
          schoolType: '',  //学校类型
          codeType: '',    //学制
          codeStart: '',   //教学开始
          codeEnd: '',      //教学结束
          position: '',   //地理位置
          address: '',     //详细地址
          describe: '',         //描述
        },
        schoolId:'',
        isSaveSchool: false, //表单是否保存成功
        //校归属地区
        defaultMaxLevel: 0,
        defaultProvince: {
          id: '',
          name: '',
          level: 1
        }, //默认省
        defaultCity: {
          id: '',
          name: '',
          level: 2
        }, //默认市
        defaultCounty: {
          id: '',
          name: '',
          level: 3
        }, //默认区/县
        province:[],
        city:[],
        county:[],
        selectedProvince: {},
        selectedCity: {},
        selectedCounty: {},

        isAdd:false,
       //校验
        rules: {
          name: [
            {required: true, validator: checkSchoolName, trigger: 'blur' }
          /*  {required: true, message: '学校名称不能为空！', trigger: 'change'},
            {min: 1, max: 30, message: '请输入1~30个汉字！', trigger: 'blur'},
            { pattern: /^[\u4e00-\u9fa5]{1,30}$/, message: '请输入1~30个汉字！'}*/
          ],
          schoolType:[
            {required: true, message: '学校类型不能为空！', trigger: 'change'},
          ],
          codeVal:[
           /* {required: true,validator: checkCodeVal, trigger: 'blur' }*/
          ],
          position:[
            {required: true, message: '地理位置不能为空！', trigger: 'change'},
          ],
          address: [
            {validator: checkAddress, trigger: 'blur' }
          ],
          describe: [
            {validator: checkDescribe, trigger: 'blur' }
          ]
        },
       //机构人员
        // 机构人员
        orgUsers: [],
        // 机构人员总数
        orgUserTotal:0,
        // 新建机构人员字段
        orgUserFormAdd:{
          name:'',
          phone:'',
        },
        // 获取当前点击行的信息
        currentInfo:'',
        // 获取修改状态信息
        orgUserStutas:'',
        // 编辑机构人员字段
        //当前负责人ID
        principalId:'',
        orgUserFormEdit:{
          name:'',
          phone:'',
        },
        // 机构人员字输入段验证
        orgUserAddRules: {
          /*name: [{
            required: true,
            message: '姓名不能为空！',
            trigger: 'blur'
          }, {
            pattern: /^[\u4E00-\u9FA5]+$/,
            message: '姓名只能输入中文！',
            trigger: 'blur'
          }, {
            min: 2,
            max: 40,
            message: '姓名输入在2~40个字！',
            trigger: 'blur'
          }],*/
          name: {validator: checkUserName, trigger: 'blur' },
          phone: [{
            required: true,
            message: '手机号不能为空！',
            trigger: 'blur'
          },{
            pattern: /^1[34578]\d{9}$/,
            message: '请输入11位手机号！',
            trigger: 'blur'
          }
          ],
        },
        // 隐藏对话框
        dialogVisibleAdd: false,
        dialogVisibleEdit: false,
        //列表选中列
        multipleSelection: [],
        formInline: {
          query: ''
        },
      }
    },
    beforeMount(){
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
     //三级
      /*this.userInfo.education.orgInfo = [
        {
          "id": 430000,
          "level": "1",
          "name": "湖南省"
        },
        {
          "id": 431300,
          "level": "2",
          "name": "娄底市"
        },
        {
          "id": 431321,
          "level": "3",
          "name": "双峰县"
        }
      ];*/
      /*this.userInfo.education.orgInfo = [
        {
          "id": 110000,
          "level": "1",
          "name": "北京市"
        },
        {
          "id": 110100,
          "level": "2",
          "name": "市辖区"
        },
        {
          "id": 110117,
          "level": "3",
          "name": "平谷区"
        }
      ];*/
      //二级
      /*this.userInfo.education.orgInfo = [
        {
          "id": 430000,
          "level": "1",
          "name": "湖南省"
        },
        {
          "id": 431300,
          "level": "2",
          "name": "娄底市"
        }
      ];*/
      /*this.userInfo.education.orgInfo = [
        {
          "id": 110000,
          "level": "1",
          "name": "北京市"
        },
        {
          "id": 110100,
          "level": "2",
          "name": "市辖区"
        }
      ];*/
      //一级
      /*this.userInfo.education.orgInfo = [
        {
          "id": 430000,
          "level": "1",
          "name": "湖南省"
        }
      ];*/
      /*this.userInfo.education.orgInfo = [
        {
          "id": 110000,
          "level": "1",
          "name": "北京市"
        }
      ];*/
      //设定默认的 省、市、区/县内容
      this.defaultMaxLevel = this.userInfo.education.orgInfo.length;
      this.defaultProvince = this.userInfo.education.orgInfo[0] || {
          id: '',
          name: '',
          level: 1
      };
      this.defaultCity = this.userInfo.education.orgInfo[1] || {
          id: '',
          name: '',
          level: 2
      };
      this.defaultCounty = this.userInfo.education.orgInfo[2] || {
          id: '',
          name: '',
          level: 3
      };
    },
    mounted(){
      //获取区域树-省
      this.getAreaTree();
      if(this.defaultProvince.id != null && this.defaultProvince.id != ''){
      	//拿取市
      	this.provinceChange(this.defaultProvince);
      }
      if(this.defaultCity.id != null && this.defaultCity.id != '') {
        //拿取区
        this.cityChange(this.defaultCity);
      }
      //获取机构树
//      this.getEduOrgTree();
    /*  this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log(this.userInfo.schools.schoolId)*/
    },
    methods: {
      //判断你是否空对象
      isEmptyData(name){
        return name !== undefined && name !== null && name !== '' ? false : true;
      },
    	//转换
      convertSchoolType(schoolType){
          let schoolTypeArr = ['','大学','高中','初中','完中','九年一贯制','小学','教学点','完小','职业高中(职高)','中等专业学校(中专)','技工学校(技校)','普通高等学校(体校、军校)'];
          return schoolTypeArr[schoolType || 0] || '';
      },
      convertCodeType(codeType){
        if(codeType == '6-3'){
          return "六三制";
        }
        else if(codeType == '5-4'){
          return "五四制"
        }
        else{
          return "";
        }
      },
      convertGrads(grads){
        let gradStr = '';
        for(let i =0; i<grads.length; i++){
        	let grad = grads[i];
        	if(grad.checked == true){
        		if(gradStr == ''){
              gradStr += grad.name;
            }else{
        			gradStr += '、'+grad.name;
            }
          }
        }
        return gradStr;
      },
      convertPosition(position){
         let positionArrs = ['','中学城区','城乡结合','近郊','远郊','山区'];
         return positionArrs[position || 0] || '';
      },
      toEduSchoolMgr(){
      	  /*
      	  * 一：未做任何更改，直接返回
      	  * 二：有做更改，有保存，直接返回  --isSaveSchool 为 true情况
      	  * 三：有更改，未点击保存数据，提示
      	  * */
          /* 被废弃返回方式： this.$router.replace('/eduSchoolManagement');*/
          if(this.isSaveSchool){
            this.$router.go(-1);
          }
          else{
          	//基本信息判断-----isEmptyData 是空对象 返回 true
          	let nameFlag = this.isEmptyData(this.ruleForm.name);
            let schoolFlag = this.isEmptyData(this.ruleForm.schoolType);
            let codeFlag = this.isEmptyData(this.codeVal);
            let codeStartFlag = this.isEmptyData(this.ruleForm.codeStart);
            let codeEndFlag = this.isEmptyData(this.ruleForm.codeEnd);
            let positionFlag = this.isEmptyData(this.ruleForm.position);
            let addressFlag = this.isEmptyData(this.ruleForm.address);
            let describeFlag = this.isEmptyData(this.ruleForm.describe);
            console.log('返回当前： name='+this.ruleForm.name+',schoolType='+this.ruleForm.schoolType+',codeVal='+this.codeVal+',codeStart='+this.ruleForm.codeStart+',codeEnd='+this.ruleForm.codeEnd+',position='+this.ruleForm.position+',address='+this.ruleForm.address+',describe='+this.ruleForm.describe);

            //校归属地区修改判断
            let pageOrgId = this.getSaveOrgId().id;
            let userOrgId = this.userInfo.education.orgInfo[this.userInfo.education.orgInfo.length-1].id;
            console.log('pageOrgId= '+pageOrgId+',userOrgId='+userOrgId);
            let orgIdFlag = (pageOrgId == userOrgId) ? true : false;
            console.log(orgIdFlag);
            let flagList = [orgIdFlag, nameFlag, schoolFlag, codeFlag, codeStartFlag, codeEndFlag, positionFlag, addressFlag, describeFlag];
            console.log(flagList);
            //未进行任何更改，返回
            //有更改提示
            if(flagList.indexOf(false) != -1){
            	console.log('结果中包含非空数据，进行了修改');
              this.$confirm('当前界面存在编辑操作是否保存？', '提示', {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning'
              }).then(() => {
                //确定
                /* this.$router.replace('/eduSchoolManagement');*/
                this.submitForm();
              }).catch(() => {
                //取消
                this.$router.go(-1);
              });
            }
            else{
            	console.log('结果中都是空数据，未进行任何更改');
              this.$router.go(-1);
            }
          }
      },
      //获取机构树
      getEduOrgTree(){
      	//orgId 为区域ID；educationId为机构ID
      	let educationId = this.userInfo.education.educationId || '';
        this.$ajax('/eduadmin/getEduChildrenTree?parentEducationId='+educationId)
          .then(res => {
          	if(res.code == 200){
              var orgListsData = JSON.stringify(res.data);
              orgListsData = orgListsData.replace(/name/g, 'label').replace(/id/g, 'value').replace(/childrens/g, 'children').replace(/\,\"children\"\:\[\]/g, '');
              orgListsData = '[' + orgListsData + ']';
              console.log(orgListsData);
              this.orgListsData = JSON.parse(orgListsData);
              /*if(Object.prototype.toString.call(res.data) === "[object Array]"){
              	this.orgListsData = res.data;
              }else{
                this.orgListsData = [res.data || {}];
              }*/
            }else{
          		//其它非两百情况
              this.orgListsData = [{}];
            }
            console.log(this.orgListsData);
          }).catch(() => {
        });
      },
      getEduOrgByName(eduId){
      	if(eduId == null || eduId == ''){
      		this.orgNameStr = '';
      		return;
        }
        this.$ajax('/eduadmin/getEduChildrenTree?parentEducationId='+eduId)
          .then(res => {
            if(res.code == 200){
              this.orgNameStr = res.data.name || '';
            }else{
              this.orgNameStr = '';
            }
          }).catch(() => {
            this.orgNameStr = '';
        });
      },
      // 获取获取区域树
      getAreaTree(){
        this.$ajax('/org/getTree')
          .then(res => {
            this.province = res.data;
          }).catch(() => {
        });
      },
      provinceChange(item){
        console.log('province======'+item.id+','+item.name);
        this.selectedCity = {};
        this.selectedCounty = {};
        this.selectedProvince = item;
        if(item.id == null || item.id == ''){
        	return;
        }
        let params={
          parentId: item.id
        };
        this.$ajax('/org/getChildren',params)
          .then(res => {
            this.city = res.data;
            if(this.defaultMaxLevel == 1){
              this.defaultCity.name = this.city[0].name;
            }
//            this.city.splice(0, 0, {id: '', name: '省直属'});
          }).catch(() => {
        });

      },
      cityChange(item){
        console.log('city======'+item.id+','+item.name);
        this.selectedCounty = {};
//        item.id = item.id || '';
//        item.name = item.name || '省直属';
//        item.level = item.level || '';
        this.selectedCity = item;
        if(item.id == null || item.id == ''){
          return;
        }
        let params={
          parentId: item.id
        };
        this.$ajax('/org/getChildren',params)
          .then(res => {
            this.county = res.data;
            if(this.defaultMaxLevel == 2){
              this.defaultCounty.name = this.county[0].name;
            }
//            this.county.splice(0, 0, {id: '', name: '市直属'});
          }).catch(() => {
        });
      },
      countyChange(item){
      	console.log('county======'+item.id+','+item.name);
//      	item.id = item.id || '';
//      	item.name = item.name || '市直属';
//      	item.level = item.level || '';
        this.selectedCounty = item;
      },
      //教学范围
      changeSchoolType: function() {
        var that = this;
        if(!that.ruleForm.schoolType || that.ruleForm.schoolType > 8 || that.ruleForm.schoolType == 2) {
              that.codeVal = ''
          }
          that.changeSchooling();
      },
      changeSchooling: function() {
          var that = this;
          that.grads = JSON.parse(JSON.stringify(grads_default));
          that.selectedGrad = [];
          if(!that.ruleForm.schoolType) {
              return;
          }
          that.ruleForm.codeStart = 1;
          that.indexStart = 0;
          if(that.codeVal == 2) {
          	  //五四制
              that.grads[5].display = false;
              that.grads[9].display = true;
          }
          else {
              that.grads[5].display = true;
              that.grads[9].display = false;
          }
           //小学，完小
          if(that.ruleForm.schoolType == 6 || that.ruleForm.schoolType == 8) {
              that.ruleForm.codeEnd = 7 - (Number(that.codeVal) || 1);
              that.indexEnd = 6 - (Number(that.codeVal) || 1);
          }
          //初中，九年一贯制
          if(that.ruleForm.schoolType == 3 || that.ruleForm.schoolType == 5) {
              if(that.ruleForm.schoolType == 3) {
              	if(that.codeVal == 2){
                  //初中，五四制，下标6-9，存储6-9
                  that.ruleForm.codeStart = 6;
                  that.indexStart = 6;
                }
                else{
                  that.ruleForm.codeStart = 7;
                  that.indexStart = 6;
                }
              }
              that.ruleForm.codeEnd = 9;
              that.indexEnd = 9;
          }
          //高中，完中，职高，职专
          if([2,4,9,10].indexOf(Number(that.ruleForm.schoolType) || 0) != -1) {
          	  if(that.ruleForm.schoolType == 4 && that.codeVal == 1){
                //完中-六三制
                that.ruleForm.codeStart = 7;
                that.indexStart = 6;
              }
              else if(that.ruleForm.schoolType == 4 && that.codeVal == 2){
                //完中-五四制
                that.ruleForm.codeStart = 6;
                that.indexStart = 6;
              }
              else if(that.ruleForm.schoolType == 4 && that.codeVal != 2 && that.codeVal != 1){
                //完中-五四制
                that.ruleForm.codeStart = 7;
                that.indexStart = 6;
              }
              else {
                that.ruleForm.codeStart = 10;
                that.indexStart = 10;
              }
              that.ruleForm.codeEnd = 12;
              that.indexEnd = 12;
          }
          //匹配下标选中与未选中状态
          for(var j = that.indexStart;j <= that.indexEnd;j++) {
          	  //抛除特殊的
              if(that.codeVal == 2 && j == 5){
              	 //五四制  --6年级下标ID=5刨除
                 continue;
              }else if(that.codeVal == 1 && j == 9){
              	 //六三制  --初四下标I=9刨除
                 continue;
              }else{
              	//其它
              }
              that.grads[j].checked = true;
              that.selectedGrad.push(j);
          }
      },
      changeGrad(index, event) {
          var that = this;
          if(event.currentTarget.checked) {
              that.selectedGrad.push(index);
              that.grads[index].checked = true
          } else {
              that.selectedGrad.remove(index);
              that.grads[index].checked = false
          }
          var min = Math.min.apply(Math, that.selectedGrad);
          var max = Math.max.apply(Math, that.selectedGrad);
          for(var j=min;j<=max;j++) {
            if(!that.grads[j].checked && that.grads[j].display) {
              that.grads[j].checked = true
            }
          }
      },
      /*机构人员*/
      getSaveOrgId(){
          let orgTempObj = {id: '', name: '',orgNameStr: ''};
          if(this.defaultMaxLevel == 3){
          	//地区三级，当前已经是最后一级
            orgTempObj.id = this.defaultCounty.id;
            orgTempObj.name = this.defaultCounty.name;
            orgTempObj.orgNameStr = this.defaultProvince.name+''+this.defaultCity.name+''+this.defaultCounty.name;
          }
          else if(this.defaultMaxLevel == 2){
          	//地区二级，默认city已经是最后一级别
            let orgStr = this.defaultProvince.name+''+this.defaultCity.name;
            orgTempObj.id = this.selectedCounty.id;
            orgTempObj.name = this.selectedCounty.name;
            orgTempObj.orgNameStr = orgStr+''+this.selectedCounty.name;
            //二级地区选择中，默认会是市直属，此时机构ID应该是默认的市级Id
            if(this.selectedCounty.name == null || this.selectedCounty.name == "" || this.selectedCounty.name == '市直属'){
            	orgTempObj.id = this.defaultCity.id;
            	orgTempObj.name = this.defaultCounty.name;
            	orgTempObj.orgNameStr = orgStr+''+this.defaultCounty.name;
            }
          }
          else if(this.defaultMaxLevel == 1){
          	//地区一级，默认province已经是最后一级别
            let orgStr = this.defaultProvince.name;
            if(this.selectedCounty.name != null && this.selectedCounty.name != '' && this.selectedCounty.name != '市直属'){
            	orgTempObj.id = this.selectedCounty.id;
            	orgTempObj.name = this.selectedCounty.name;
            }
            else if(this.selectedCity.name != null && this.selectedCity.name != '' && this.selectedCity.name != '省直属'  && this.selectedCity.name != '市直属'){
            	orgTempObj.id = this.selectedCity.id;
            	orgTempObj.name = this.selectedCity.name;
            }
            else{
            	orgTempObj.id = this.defaultProvince.id;
            	orgTempObj.name = this.defaultProvince.name;
            }
            orgTempObj.orgNameStr = orgStr+''+(this.selectedCity.name || this.defaultCity.name)+''+(this.selectedCounty.name || this.defaultCounty.name);
          }
//          console.log('存储----id='+orgTempObj.id+',name='+orgTempObj.name+',nameStr='+orgTempObj.orgNameStr);
          return orgTempObj;
      },
      setScrollTop(userDivDom){
        let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        let isOpera = userAgent.indexOf("Opera") > -1;
        let agentStr = '';
        if (isOpera) {
          agentStr = "Opera"
        } //判断是否Opera浏览器
        else if (userAgent.indexOf("Firefox") > -1) {
          agentStr = "FF";
        } //判断是否Firefox浏览器
        else if (userAgent.indexOf("Chrome") > -1){
          agentStr = "Chrome";
        }
        else if (userAgent.indexOf("Safari") > -1) {
          agentStr =  "Safari";
        } //判断是否Safari浏览器
        else if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
          agentStr = "IE";
        } //判断是否IE浏览器
        if(agentStr == 'FF'){
          document.documentElement.scrollTop = userDivDom.offsetTop;
        }else{
          document.body.scrollTop = userDivDom.offsetTop;
        }
      },
      //保存数据
      submitForm(formName) {
        this.ruleForm.codeType = ( this.codeVal == 1 ? '6-3' : (this.codeVal == 2 ? '5-4' : '') );
      	let orgTempObj = this.getSaveOrgId();
        //处理校归属地区-市直属 和 校归属地区-省直属问题

        let params = Object.assign( this.ruleForm,{delFlag: 0},{orgId : orgTempObj.id});
//        let selectedEducationIds = this.educationIds[this.educationIds.length-1] || this.userInfo.education.educationId;
//        this.ruleForm.educationId = selectedEducationIds;
        //保存请求发送
        var that = this;
        this.$refs.ruleForm.validate((valid) => {
            if (valid) {
              //验证学制
              if(!that.isEmptyData(that.ruleForm.schoolType) && that.ruleForm.schoolType != 2 && that.ruleForm.schoolType <= 8) {
                //此时不验证大小
                if(that.codeVal == "" || that.codeVal == null){
                  this.$message({ type: 'error', message: '学制不能为空!'});
                  return;
                }
              }
              this.$ajax('/eduadmin/saveOneSchool', params)
                .then(res => {
                  if(res.code == 200) {
                    this.schoolId = res.data,
                    this.buildGrade(); //调用新增年级接口（后台自动生成年级）
                    this.$alert('保存成功', '提示', {
                      confirmButtonText: '确定',
                      type: 'success',
                      callback: action => {
                        //展示负责人列表，信息展示标签化，按钮全部隐藏
                        that.isAdd = true;
                        that.isSaveSchool = true;
                        that.orgNameStr = orgTempObj.orgNameStr;
                        //展示成功，定位至添加负责人这块
                        let userDivDom = that.$el.querySelector('#userListDiv');
                        this.setScrollTop(userDivDom);
                     }
                    });
                  }else{
                    this.$alert('保存失败：'+res.message, '提示', {
                      confirmButtonText: '确定',
                      type: 'warning',
                      callback: action => {
                        that.isAdd = false;
                      }
                    });
                  }
                });
            } else {
              this.$message({ type: 'error', message: '请先填写相关信息!'});
              return false;
            }
        });
      },
      buildGrade(schoolId) {
        //console.log(this.ruleForm)
      //  var params = Object.assign( this.ruleForm, {educationId : this.userInfo.education.educationId},{orgId : this.userInfo.education.orgId});
        this.$ajax('/schadmin/buildGrade', {schoolId: this.schoolId})
          .then(res => {
          });
      },
      // 获取机构人员列表
      getOrgUserLists(id){
        this.$ajax('/schadmin/justShowSchadmin',{id: this.schoolId})
          .then(res => {
            // console.log(res)
            if(res.code == 200){
              this.orgUsers=res.data;
              this.orgUserTotal=this.orgUsers.length;
            }
          });
      },
      // 新建机构人员
      addOrgUser(){
        this.orgUserFormAdd={};
        this.dialogVisibleAdd = true;
      },
      //确定添加机构人员
      orgUserFormAddData(){
        this.$refs.orgUserFormAdd.validate((valid) => {
          if (valid) {

            let params={
              schoolId:this.schoolId,
              name: this.orgUserFormAdd.name,
              phoneNumber: this.orgUserFormAdd.phone || ''
            };
            console.log(params)
            this.$ajax('/eduadmin/saveSchoolAdmin',params)
              .then(res => {
                if(res.code == 200){
                  this.$message({
                    type: 'success',
                    message: '添加成功!'
                  });

                  this.dialogVisibleAdd = false;

                  this.getOrgUserLists(this.schoolId)

                }else{
                  this.$message({
                    type: 'error',
                    message: res.message
                  });
                  this.dialogVisibleAdd = false;
                }

              });

          } else {

            return false;

          }
        });
      },
      // 编辑机构人员信息
      orgUsersEdit(index, row) {
        this.dialogVisibleEdit = true;
        this.orgUserFormEdit.name= row.name;
        this.orgUserFormEdit.phone= row.phone;
        this.principalId=row.id
         console.log(this.principalId);
      },
      // 确定编辑
      orgUserFormEditData(){


        let params = {
          schoolId: this.schoolId,
          userId: this.currentInfo.id,
          name: this.orgUserFormEdit.name,
          id: this.principalId
        };

        this.$ajax('/eduadmin/updateSchoolAdmin',params).then((res) => {

          if(res.code == 200){

            this.$message({
              message: '保存成功',
              type: 'success'
            });

            this.getOrgUserLists(this.schoolId);
            this.dialogVisibleEdit = false;
          }

        }).catch(() => {

        });
      },
      // 获取点击当前行信息
      getOrgUserCurrentInfo(row, column, cell, event){
        // console.log(row.id)
        this.currentInfo = row;
      },
      // 获取机构人员状态
      getOrgUserSelectState(command){
        let params={
          orgId: this.orgInfoId,
          userId: this.currentInfo.id,
          state: command
        };
        this.$ajax('/eduadmin/changeOrgUserStatus',params).then((res) => {
          if(res.code == 200){
            this.$message({
              message: '状态修改成功',
              type: 'success'
            });
            this.getOrgUserLists(this.orgInfoId)
          }
        }).catch(() => {
        });
      },
      // 确定删除单个机构人员
      orgUsersDelete(index, row) {
        console.log(index,row)
        this.$confirm('确定要删除选中教师吗?', '提示', {
          type: 'warning',
          confirmButtonText: '删除',
          cancelButtonText: '取消',
        }).then(() => {
          let params = {
            userId: row.id,
            schoolId:this.schoolId,
          };
          this.$ajax('/eduadmin/deleteSchoolAdmin',params).then((res) => {
            if(res.code == 200){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }
            this.getOrgUserLists(this.orgInfoId)
          });
        }).catch(() => {
        });
      },
      //获取列表选中列
      orgUsersSelectionChange(val) {
        // console.log(1)
        this.multipleSelection = val;
      },
      // 重置密码
      orgUsersRestPwd(index, row){
        // console.log(row)
        this.$confirm('是否要重置密码为手机号码后六位?', '提示', {
          type: 'warning',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {

          let params = {
            phone: row.phone
          };

          this.$ajax('/password/reset',params).then((res) => {
            if(res.code == 200){

              this.$alert(res.message, '新密码', {
                confirmButtonText: '确定',

              });
            }

          });
        }).catch(() => {

        });

      },
      // 批量删除机构人员 备选
      orgUsersBatchDelete(index, row){
        var userIds = this.multipleSelection.map(item => item.id).toString();
        this.$confirm('确定要删除选中教师吗?', '提示', {
          type: 'warning',
          confirmButtonText: '删除',
          cancelButtonText: '取消',
        }).then(() => {

          let params = {
            userId: userIds,
            orgId:  this.orgInfoId
          };

          this.$ajax('/eduadmin/delOrgUser',params).then((res) => {
            if(res.code == 200){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }
            this.getOrgUserLists(this.orgInfoId)
          });
        }).catch(() => {

        });
      },
    },
    created: function() {
      this.grads = JSON.parse(JSON.stringify(grads_default));
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
</script>
<style >
  #addschool{
    padding: 0 20px 50px 20px;
  }
  /*顶部保存*/
  #addschool .btns {
    border-bottom: 1px solid #ECEDEF;
    padding-bottom: 10px;
    padding-top:10px;
    height: 30px;
    line-height: 30px;
  }
  #addschool .btns a {
    font-size: 14px;
    color: #666;
    line-height: 30px;
  }
  .icon-back:before{
    position: relative;
    top:1px;
  }
  #addschool .icon-conserve:before{
    margin-right: 3px;
  }
  #addschool .el-button{
    padding: 8px 20px;
  }

  /*表格边框问题*/
  .el-table table{
    width: 100%;
  }
  /*标题样式*/
  #addschool  .title{
    padding: 20px 0 18px 0;
    display: inline-block;
    width:100%;
    /* border-bottom: 1px solid #e9edf1;*/
  }
  #addschool  .title i{
    display: inline-block;
    height:16px;
    width:3px;
    margin-right:7px;
    background:#0d9ee9 ;
  }
  #addschool .title span{
    font-size:14px;
   /* color: #0d9ee9;*/
    display:inline-block;
    line-height: 12px;
  }

  #addschool .tabs-header{
    float: right;
  }
  /*保存*/
 #addschool .submitForm{
text-align: right;
   height:50px;
   border-bottom:1px solid #e9edf1;
 }
  #addschool .submitForm .el-button--primary{
    margin-top:8px;
    margin-bottom:0px;
  }


  /*省市区*/
  #addschool .item-text .address{
    margin-top: 22px;
    height: 40px;
    display: block;
  }

  .el-input__icon{
    right:13px;
  }
  .el-textarea__inner {
    height: 60px;
    width: 600px;
  }

/*添加按钮*/
  #addschool .el-button--info{
    width:40px;
    float: right;
    text-align: center;
  }
  #addschool .grads li{list-style:none;float:left;margin-right:10px}
  #addschool .grads label{border:1px solid lightblue;width:50px;text-align:center;display:inline-block;cursor:pointer}
  #addschool .grads li label.disabled{background:lightgray;color:#000;cursor:not-allowed}
  #addschool .grads li label.checked{background:lightblue;color:#fff}
  #addschool .blind{
    clip: rect(1px,1px,1px,1px);
    clip: rect(1px 1px 1px 1px);
    position: absolute;
}


  #addschool a, input, textarea, keygen, select, button{font-family:"微软雅黑";}
  #addschool .el-input.is-disabled .el-input__inner::-webkit-input-placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #addschool .el-input.is-disabled .el-input__inner::-moz-placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #addschool .el-input.is-disabled .el-input__inner:-ms-input-placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #addschool .el-input.is-disabled .el-input__inner::placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #addschool .el-input__inner::-webkit-input-placeholder{color:#1f2d3d;font-family:"微软雅黑"}
  #addschool .el-input__inner::-moz-placeholder{color:#1f2d3d;}
  #addschool .el-input__inner:-ms-input-placeholder{color:#1f2d3d;}
  #addschool .el-input__inner::placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  /*机构负责人*/

</style>
