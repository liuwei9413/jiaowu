<template>
  <div id="studentbatch">
    <div class="saveDiv">
      <router-link  :to="{ path:'/studentManagement' }" class=" icon-back">返回 </router-link>

    </div>
    <el-form :model="formData" method="post" action="/schadmin/import/importScore" enctype="multipart/form-data" id="importScoreForm">
    <ol>
      <li class="xiazai">
        <h3>1、下载模板</h3>
        <p>点击下载导入模板&nbsp&nbsp&nbsp<a href="http://60.205.115.173:8888/yitai-educational/downloads/参测学生基本信息表.xls" target="_blank"><el-button type="primary" class="icon-download download"> 下载</el-button></a></p>
      </li>
      <li>
        <h3>2、选择导入班级</h3>
        <el-form-item label="年级：" :label-width="formLabelWidth">
          <el-radio-group v-model="formData.gradeId">
            <el-radio-button :label="grade.index" v-for="(grade,index) in gradeList" :key="index">{{grade.name}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="班级：" :label-width="formLabelWidth" >
          <el-radio-group v-model="formData.classId " v-if="formData.gradeId">
            <el-radio-button :label="classes.index" v-for="(classes,index) in gradeList[formData.gradeId].classList" :key="index">{{classes.name}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </li>
      <li class="file-box">
        <h3>3、选择需要导入的EXCEL文件</h3>
        <el-form-item>
          <input type='text' name='textfield' id='textfield' class='txt'  style="width:518px;" />
          <input type='button' class='btn' value='选择文件'style="width: 78px;" />
          <input  onchange="document.getElementById('textfield').value=this.value"
          name="file"
          class="upload-demo"
          accept=".xls,.xlsx,.csv"
          style="width: 598px;"
          type="file"
          v-on:change="fileChange($event)">
          <!-- multiple="multiple"-->
          <el-button type="primary" class="submit icon-leadingin" native-type="submit " :loading="formSubmited" v-on:click="submitForm($event)"> 导入</el-button>
        </el-form-item>
        <input type="hidden" name="examId" value="" v-model="formData.gradeId">
        <input type="hidden" name="classId" value="" v-model="formData.classId">
      </li>
    </ol>

    </el-form>
    <div class="explain">
      <h1>导入格式案例</h1>
      <img src="../../../resources/front/imgs/studentExcel.png"/>
      <h1>导入说明</h1>
      <p>1、文件导入前请严格按照数据要求和格式要求填写。</p>
      <p>2、导入如果出现异常或数据问题，请修改后重新导入。</p>
    </div>
    <div>
      <div v-show="isError" style="margin-top: 20px;min-height:500px;" id="div1">
        <div class="icon-cue" style="font-size: 14px;color:red;padding: 10px 0 10px 0;"> 出错提示</div>
        <el-table
          :data="errorArr"
          border
          style="width: 100%" align="center">
          <el-table-column
            prop="fileName"
            label="出错文件名"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="row"
            label="EXCEL左侧出错行数"
            width="200"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="出错人"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="content"
            label="出错内容"
            align="center">
          </el-table-column>
        </el-table>
      </div>
      <div id="error"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'
export default {
  data() {
    return {
      formSubmited: false,
      formLabelWidth: '60px',
      gradeList: {},
      formData: {
        classId: '',
        gradeId: ''
      },
      //异常处理
      isError:false,
      errorArr:[],//储存批量导入的异常

    };
  },
  beforeCreate() {
    let that = this
    that.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log()
    //获取班级列表
    that.$ajax('/teacher/getGradeList', {schoolId: that.userInfo.schools.schoolId})
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

  },
  mounted() {

  },
  methods: {
    fileChange: function() {
      if( this.formData.gradeId=='') {
        this.$alert('请选择年级', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }else if( this.formData.gradeId=='' || this.formData.classId=='' ) {
        this.$alert('请选择年级班级', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
    },
    submitForm: function(e) {
      if( this.formData.gradeId=='') {
        this.$alert('请选择年级', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }else if( this.formData.gradeId=='' || this.formData.classId=='' ) {
        this.$alert('请选择年级班级', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }


      e.preventDefault()
      let that = this
      that.formSubmited = true
      let formData = new window.FormData(document.getElementById('importScoreForm'));
      $.ajax({
      url:'http://60.205.115.173:8888/yitai-educational/import/student?classId='+that.formData.classId+'&gradeId='+that.formData.gradeId+'&schoolId='+that.userInfo.schools.schoolId,
        type:"post",
        data:formData,
        dataType: 'json',
        processData:false,
        contentType:false,
        success:function(res){

          if(res.code == 200||res.code == 400){
            that.formSubmited = false
//            console.log(data);
            that.$alert(res.message, '提示1', {
              confirmButtonText: '确定',
            });
          }else {
            that.formSubmited = false
            that.isError=true;
            that.errorArr=res.data;
            that.$nextTick(function () {
              var anchor =$('#error');
              $("body,html").animate({
                scrollTop: anchor.offset().top
              })

            })
            /*  let row=errorArr[0].row;
             //              let content=errorArr[0].content;
             //              console.log(row)
             //              console.log(content)
             let errorInfo=''
             errorArr.forEach((item,index) =>{
             errorInfo+=item.row + item.content
             });
             that.$alert(res.message+errorInfo, '提示', {
             confirmButtonText: '确定',

             });*/
          }

        },
       /* error:function(e){
          that.formSubmited = false
          alert("错误！！");
        }*/
      });
    }
  }

}
</script>

<style>
  #studentbatch{
    min-height: 800px;
    padding:0 20px  50px 20px;

  }
  #studentbatch h1{
    font-size:14px;
    color:#666;
    line-height:34px;
  }
  #studentbatch .explain p{
    font-size: 14px;
    color:#666;
    line-height:34px;
    text-indent: 2em;
  }
  #studentbatch .download{
    height: 30px;
    width: 80px;
    margin-left: 10px;
  }
  #studentbatch li{
  padding-top:20px;
}
  #studentbatch .xiazai p{
    font-size:14px;
    color:#666666;
    margin-top:15px;
    margin-left: 36px;
  }
  #studentbatch h3 {
    background:#f9f9f9;
    height: 34px;
    line-height: 34px;
    padding-left: 13px;
    font-size: 14px;
    color:#333333;
  }
  #studentbatch .dialog-footer{
  text-align: center;

}
  #studentbatch .el-form-item{
    margin-left: 34px;
    margin-top: 15px;
  }
  #studentbatch .el-radio-button{
    margin-right: 10px;
    border-left:1px solid #bfcbd9;

  }
  #studentbatch  .el-radio-button:first-child .el-radio-button__inner{
    border-radius:0px 0px 0px 0px ;
  }
  #studentbatch  .el-radio-button:last-child .el-radio-button__inner{
    border-radius:0px 0px 0px 0px ;
  }
  /*选择文件*/
/*  .upload-demo{
    width: 300px;
    border:1px solid #97a8be;
  }*/
  #studentbatch  .file-box{ position:relative;width:100%;margin: 0px;}
  #studentbatch  .txt{ height:28px; border:1px solid #e6e6e6; width:180px;margin: 0px;position: relative;left:5px;top:-1px;}
  #studentbatch  .btn{ background-color:#FFF; border:1px solid #e6e6e6;height:30px;  color:#0d9ee9;margin: 0px;}
  #studentbatch .upload-demo{ position:absolute; top:0; left:0px; height:32px; opacity: 0;width:260px ;}

  /*导入*/
  #studentbatch  .submit{
    position: relative;
    top: 1px;
    margin-top: 3px;
    height:30px;
    width:80px;
    border:none;
    background:#1ec56b ;
  }
  #studentbatch  .submit:hover{
    position: relative;
    top: 1px;
    margin-top: 3px;
    height:30px;
    width:80px;
    border:none;
    background:#48e791 ;
  }
  #studentbatch .saveDiv {
    padding: 10px 0 10px 0;
    border-bottom: 1px solid #e9edf1;
  }

  #studentbatch .saveDiv a {
    font-size: 14px;
    color: #666;
    height: 30px;
    line-height: 30px;
  }
  .icon-back:before{
    position: relative;
    top:1px;
  }
</style>
