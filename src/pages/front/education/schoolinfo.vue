<template>
    <div  id="schoolinfo">
      <div class="main-content" v-loading.fullscreen.lock="fullscreenLoading">
        <div  class="btns">
          <a type="text" class="icon-back" @click="toEduSchoolMgr">返回</a>
          <!--
                  <el-button type="text" class="text-left"><router-link :to="{ path:  '/eduSchoolManagement' }" > < 返回 </router-link></el-button>
          -->
        </div>

        <div class="title" style="border: none"><span></span>
          <p>基础信息</p></div>
        <el-form :model="getForm" ref="getForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="学校名称：" prop="name">
          <p>{{getForm.name || ''}}</p>
        </el-form-item>

        <el-form-item label="校归属地区：">
          <p>{{orgNameStr || ''}}</p>
        </el-form-item>
<!--
        <el-form-item label="所属机构：">
          <p>{{getForm.eduOrganPojo.name || ''}}</p>
        </el-form-item>
-->


        <el-form-item label="学校类型：" prop="schoolType">
          {{convertSchoolType()}}
        </el-form-item>
        <el-form-item label="学制：" prop="codeType">
          <p v-if="getForm.codeType == '6-3' ">六三制</p>
          <p v-if="getForm.codeType == '5-4' ">五四制</p>
        </el-form-item>
        <el-form-item label="教学范围：" prop="region" class="region">
          <p>{{convertGrads()}}</p>
        </el-form-item>

        <el-form-item label="地理位置：" prop="position">
          <p v-if="getForm.position==1">中学城区</p>
          <p v-if="getForm.position==2">城乡结合</p>
          <p v-if="getForm.position==3">近郊</p>
          <p v-if="getForm.position==4">远郊</p>
          <p v-if="getForm.position==5">山区</p>
        </el-form-item>

        <el-form-item label="教师数量：" prop="teacherCount">
          <p>{{getForm.teacherCount}}</p>
        </el-form-item>
        <el-form-item label="学生数量：" prop="studentCount">
          <p>{{getForm.studentCount}}</p>
        </el-form-item>
        <el-form-item label="地址：" prop="address">
          <p>{{getForm.address}}</p>
        </el-form-item>
        <el-form-item label="描述：" prop="describe">
          <p>{{getForm.describe}}</p>
        </el-form-item>
        <div class="title"><span></span><p>负责人信息</p></div>
        <el-table
          :data="getlPrincipalInfoForm"
          border
          style="width:599px;margin: 20px auto;">
          <el-table-column
            prop="name"
            label="姓名"
            width="220">
          </el-table-column>
          <el-table-column
            prop="phoneNumber"
            label="手机号"
            width="220">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="157">
            <template scope="scope">
              <b v-if="scope.row.status == 0">正常</b>
              <b v-else>禁用</b>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      </div>
    </div>
</template>

<script>
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
  import VDistpicker from 'v-distpicker'

  export default {
    components: {
      VDistpicker
    },
    created(){
      this.getSchoolDetail(this.id); //获取学校基本信息
      this.getschoolPrincipalInfo(this.id); //获取负责人信息列表
    },
    data() {
      return {
        id: '', //学校id
        fullscreenLoading: true,// 全屏遮罩层
        userInfo: {},
        defaultMaxLevel: 0, //默认查询到的等级
        orgNameStr: '',
        grads: '',
        selectedGrad: [],
        rules:'',
        loaded: false,
        indexStart: '',
        indexEnd: '',
        codeVal: '', //codeType默认值
        getForm: {
//          educationId: '', //机构ID
          name: '',        //学校名称
          schoolType: '',  //学校类型
          codeType: '',    //学制
          codeStart: '',   //教学开始
          codeEnd: '',      //教学结束
          position: '',   //地理位置
          orgId: '',       //区域ID
          address: '',     //详细地址
          note: '',         //描述
          nowIndex:-100
        },
        getlPrincipalInfoForm:[],
        pickerOptions0: {
          disabledDate(time) {
            // return time.getTime() < Date.now() - 8.64e7;
          }
        },
        currentIndex: '',
        dialogVisibleAdd: false,
        dialogVisibleEdit: false,

        formInline: {
          query: ''
        },

      }
    },
    beforeMount(){
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.defaultMaxLevel = this.userInfo.education.orgInfo.length;
    },
    methods: {
      //转换
      convertSchoolType(){
        let schoolTypeArr = ['','大学','高中','初中','完中','九年一贯制','小学','教学点','完小','职业高中(职高)','中等专业学校(中专)','技工学校(技校)','普通高等学校(体校、军校)'];
        return schoolTypeArr[this.getForm.schoolType || 0] || '';
      },
      convertGrads(){
        let gradStr = '';
        for(let i =0; i<this.grads.length; i++){
          let grad = this.grads[i];
          if(grad.checked == true){
            if(gradStr == ''){
              gradStr += (grad.name || '');
            }else{
              gradStr += '、'+(grad.name || '');
            }
          }
        }
        return gradStr;
      },
      toEduSchoolMgr(){
//        this.$router.replace('/eduSchoolManagement');
        this.$router.go(-1);
      },
      // 获取机构信息
      getSchoolDetail(id){
        let params={
          id: this.$route.params.id || '',//425120
        };
        var that = this;
        that.$ajax('/schadmin/getOneSchool',params)
          .then(res => {
            if(res.code == 200){
              that.getForm = res.data;
              that.fullscreenLoading = false;
              //处理区域呈现
              let selectOrgList = res.data.orgList;
              let provinceName = this.userInfo.education.orgInfo[0].name || '';
              let cityName = that.defaultMaxLevel > 1 ? (this.userInfo.education.orgInfo[1].name  || '' ) : '';
              let countyName = that.defaultMaxLevel > 2 ? (this.userInfo.education.orgInfo[2].name || '') : '';
              if(that.defaultMaxLevel == 1){
              	//用户当前为省级地区
                that.orgNameStr = provinceName+(selectOrgList[0].name || '')+(selectOrgList[1].name || '');
              }
              else if(that.defaultMaxLevel == 2){
              	//用户当前市级地区
                that.orgNameStr = provinceName + cityName + (selectOrgList[0].name || '');
              }
              else if(that.defaultMaxLevel == 3){
              	//用户当前县级地区
                that.orgNameStr = provinceName + cityName + countyName;
              }
              that.changeSchoolType();
            }else{
              this.$message({ type: 'info', message: '系统查询失败，请稍后再试!'});
            }
          });
      },
      getschoolPrincipalInfo(id){
        let params={
          id:this.$route.params.id,//425120
        };
        var that = this
        that.$ajax('/schadmin/justShowSchadmin',params)
          .then(res => {
            that.getlPrincipalInfoForm = res.data;
            console.log(that.getlPrincipalInfoForm)
          });
      },
      selectCurrent(selection, row){
        console.log(row)
      },

      /*教学范围*/
      changeSchoolType: function() {
          var that = this;
          if(!that.getForm.schoolType || that.getForm.schoolType > 8 || that.getForm.schoolType == 2) {
            that.getForm.codeType = '';
          }
          that.changeSchooling();
      },
      changeSchooling: function() {
        var that = this;
        that.grads = JSON.parse(JSON.stringify(grads_default));
        that.selectedGrad = [];
        if(!that.getForm.schoolType) {
          return;
        }
        that.getForm.codeStart = 1;
        that.indexStart = 0;
        if(that.getForm.codeType == '5-4') {
          //五四制
          that.grads[5].display = false;
          that.grads[9].display = true;
          that.codeVal = 2;
        }
        else if(that.getForm.codeType == '6-3'){
          //六三制
          that.codeVal = 1;
          that.grads[5].display = true;
          that.grads[9].display = false;
        }
        else {
          that.codeVal = '';
          that.grads[5].display = true;
          that.grads[9].display = false;
        }
        let codeValThis = Number(that.codeVal) == 0 ? 1 : Number(that.codeVal);
        //小学，完小
        if(that.getForm.schoolType == 6 || that.getForm.schoolType == 8) {
          that.getForm.codeEnd = 7 - (codeValThis || 1);
          that.indexEnd = 6 - (codeValThis || 1);
        }
        //初中，九年一贯制
        if(that.getForm.schoolType == 3 || that.getForm.schoolType == 5) {
          if(Number(that.getForm.schoolType) == 3) {
            if(that.codeVal == 2){
              //初中，五四制，下标6-9，存储6-9
              that.getForm.codeStart = 6;
              that.indexStart = 6;
            }
            else{
              that.getForm.codeStart = 7;
              that.indexStart = 6;
            }
          }
          else{
            that.getForm.codeStart = 1;
            that.indexStart = 0;
          }
          that.getForm.codeEnd = 9;
          that.indexEnd = 9;
        }
        //高中，完中，职高，职专
        if([2,4,9,10].indexOf(Number(that.getForm.schoolType) || 0) != -1) {
          if(Number(that.getForm.schoolType) == 4 && that.codeVal == 1){
            //完中-六三制
            that.getForm.codeStart = 7;
            that.indexStart = 6;
          }
          else if(Number(that.getForm.schoolType) == 4 && that.codeVal == 2){
            //完中-五四制
            that.getForm.codeStart = 6;
            that.indexStart = 6;
          }
          else if(Number(that.getForm.schoolType) == 4 && that.codeVal != 2 && that.codeVal != 1){
            //完中-五四制
            that.getForm.codeStart = 7;
            that.indexStart = 6;
          }
          else {
            that.getForm.codeStart = 10;
            that.indexStart = 10;
          }
          that.getForm.codeEnd = 12;
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
      changeGrad(index) {
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
      }
    },
    /*computed:{
     save()
     },*/


  }
</script>
<style>
  #schoolinfo{
    padding: 0 20px 50px 20px;
  }
  #schoolinfo .btns {
    border-bottom: 1px solid #ECEDEF;
    padding-bottom: 10px;
    padding-top: 10px;
    height: 30px;
    line-height: 30px;
  }
  #schoolinfo .btns  a{
    font-size: 14px;
    color: #666;
    cursor:pointer;
    line-height: 30px;
  }
  .icon-back:before{
    position: relative;
    top: 1px;
  }
  #schoolinfo .btns .el-button{
    padding: 8px 20px;
  }
  /*标题样式*/
  #schoolinfo .title{
    padding: 20px 0 18px 0;
    border-bottom: 1px solid #e9edf1;
  }
  #schoolinfo .title span{
  display: inline-block;
  height:16px;
  width:3px;
  margin-right:7px;

}
  #schoolinfo .title p{
    font-size:14px;
    color: #0d9ee9;
    display:inline-block;
    line-height: 12px;
  }
  #schoolinfo .el-input__inner {
    width: 280px;
  }

  #schoolinfo .el-textarea__inner {
    height: 60px;
    width: 600px;
  }

  #schoolinfo .region span {
    display: inline-block;
    width: 50px;
    text-align: center;
    height: 40px;
    font-size: 14px;
    color: #fff;
    line-height: 40px;
    border: 1px solid #20a0ff;
    background: #97a8be;
    margin-left: 10px;
  }

  #schoolinfo .bluespan {
    background: #20a0ff;
  }

  /*保存按钮*/
/*  .el-button--primary {
    margin-top: 50px;
    margin-left: 500px;
    margin-bottom: 50px;
  }*/

  #schoolinfo .grads li{list-style:none;float:left;margin-right:10px}
  #schoolinfo .grads label{border:1px solid lightblue;width:50px;text-align:center;display:inline-block;}
  #schoolinfo .grads li label.disabled{background:lightgray;color:#000;cursor:not-allowed;}
  #schoolinfo .grads li label.checked{background:lightblue;color:#fff;display: none;}
  #schoolinfo .blind{
    clip: rect(1px,1px,1px,1px);
    clip: rect(1px 1px 1px 1px);
    position: absolute;
}
  #schoolinfo .el-input__icon{
    left:100px;
  }
  #schoolinfo .el-icon-date{
    right:98px;
  }




  #schoolinfo .el-form-item {
    margin-bottom: 5px;
  }
  #schoolinfo  .el-form-item__label{
    background:url(/resources/front/imgs/dot.png) no-repeat;
    top:3px;
    left:10px;
    color:#333333;
  }
  #schoolinfo .el-form-item__content{
    color:#666;
  }

  #schoolinfo a, input, textarea, keygen, select, button{font-family:"微软雅黑";}
  #schoolinfo .el-input.is-disabled .el-input__inner::-webkit-input-placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #schoolinfo .el-input.is-disabled .el-input__inner::-moz-placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #schoolinfo .el-input.is-disabled .el-input__inner:-ms-input-placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #schoolinfo .el-input.is-disabled .el-input__inner::placeholder{color:#1f2d3d;font-family:"微软雅黑";}
  #schoolinfo .el-input__inner::-webkit-input-placeholder{color:#1f2d3d;font-family:"微软雅黑"}
  #schoolinfo .el-input__inner::-moz-placeholder{color:#1f2d3d;}
  #schoolinfo .el-input__inner:-ms-input-placeholder{color:#1f2d3d;}
  #schoolinfo .el-input__inner::placeholder{color:#1f2d3d;font-family:"微软雅黑";}
</style>
