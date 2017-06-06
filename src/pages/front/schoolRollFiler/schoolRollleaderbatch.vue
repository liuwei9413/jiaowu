<template>
  <div id="schoolRollleaderbatch">
    <div class="tabs-header text-right1">
      <router-link :to="{ path:'/leaderManagement' }" class=" icon-back">返回 </router-link>
    </div>
    <el-form method="post" action="/schadmin/import/importScore" enctype="multipart/form-data" id="importScoreForm">
      <ol>
        <li class="xiazai">
          <h3>1、下载模板</h3>
          <p style="margin-top:15px;margin-left: 36px;">点击下载导入模板&nbsp&nbsp&nbsp<a href="http://60.205.115.173:8888/yitai-educational/downloads/参测校长基本信息表.xls" target="_blank"><el-button type="primary" class="icon-download">   点击下载</el-button></a></p>
        </li>

        <li class="file-box">
          <h3>2、选择需要导入的EXCEL文件</h3>
          <el-form-item>
            <input type='text' name='textfield' id='textfield' class='txt' style="width:518px;"/>
            <input type='button' class='btn' value='选择文件'style="width: 78px;"  />
            <input  onchange="document.getElementById('textfield').value=this.value"
                    name="file"
                    class="upload-demo"
                    accept=".xls,.xlsx,.csv"
                    style="width: 598px;"
                    type="file">
            <!-- multiple="multiple"-->
            <el-button type="primary" class="submit icon-leadingin"  native-type="submit" :loading="formSubmited" v-on:click="submitForm($event)"> 导入</el-button>
          </el-form-item>
        </li>
      </ol>
    </el-form>


    <!--说明-->
    <div class="explain">
     <h2>导入格式案例</h2>
      <img  src="../../../resources/front/imgs/leadermoban.png">
      <h2>导入说明</h2>
      <p>1、文件导入前请严格按照数据要求和格式要求填写。</p>
      <p>2、导入如果出现异常或数据问题，请修改后重新导入。</p>
    </div>

    <div >
    <div v-show="isError" style="margin-top: 20px;min-height:500px;">
      <div   class="icon-cue" style="font-size: 14px;color:red;padding: 10px 0 10px 0;">  出错提示</div>
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
        fileList:[],
        formData:'',
        formSubmited: false,


      //异常处理
        isError:false,
        errorArr:[],//储存批量导入的异常
      /*

        formLabelWidth: '120px',
        dialogFormVisible: false,

        addOrEdit: 0,
        paperList: {
        },
        schoolYears: [],
        schoolYearId: '',
        firstSchoolYearId: '',
        errorMsg: '',
        showErrorMsg: false*/
      };
    },
    beforeCreate() {

    },
    mounted() {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log(this.userInfo.schools.schoolId)

    },
    methods: {

      submitForm: function(e) {

        e.preventDefault()
        let that = this
        that.formSubmited = true
        let formData = new window.FormData(document.getElementById('importScoreForm'));
        $.ajax({
          url:'http://60.205.115.173:8888/yitai-educational/schoolProvider/importTeacher?type=headmaster&schoolId='+that.userInfo.schools.schoolId,
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
          error:function(res){
            that.formSubmited = false
            if(res.code == 500){
              that.formSubmited = false
//            console.log(data);
              let errorArr=res.data;
              console.log(errorArr);
//              let row=errorArr[0].row;
//              let content=errorArr[0].content;
//              console.log(row)
//              console.log(content)
              let errorInfo='';
              errorArr.forEach( (item,index) =>{
                errorInfo+=item.row + item.content
              });
              that.$alert(res.message+errorInfo, '提示', {
                confirmButtonText: '确定',

              });
            }
          }
        });
      }
    }

  }
</script>

<style >
  #schoolRollleaderbatch{
    min-height:800px;
    padding: 0 20px  50px 20px;
  }

  #schoolRollleaderbatch .text-right1{
    padding: 10px 0  10px 0;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #e9edf1;
  }
  #schoolRollleaderbatch .text-right1 a {
    font-size: 14px;
    color: #666;
    line-height: 30px;
  }
  .icon-back:before{
    position: relative;
    top: 1px;
  }
  #schoolRollleaderbatch  li{
    padding-top: 20px;

  }
  #schoolRollleaderbatch .xiazai p{
    font-size:14px;
    color:#666666;
  }
  #schoolRollleaderbatch  h3{
    background:#f9f9f9;
    height: 34px;
    line-height: 34px;
    padding-left: 13px;
    font-size: 14px;
    color:#333333;
  }
  #schoolRollleaderbatch .el-form-item{
    margin-top: 15px;
    margin-left:34px;
    margin-bottom: 0;
  }
  #schoolRollleaderbatch .dialog-footer{
    text-align: center;
  }
  #schoolRollleaderbatch  .explain h2{
    font-size: 14px;
    color:#666;
    line-height:34px;
  }
  #schoolRollleaderbatch  .explain p{
    text-indent:2em;
    font-size: 14px;
    color:#666;
    line-height:23px;
  }
  /*导入*/
  #schoolRollleaderbatch  .file-box{ position:relative;width:100%;margin: 0px;}
  #schoolRollleaderbatch  .txt{ height:28px; border:1px solid #e6e6e6; width:180px;margin: 0px; position: relative;left:5px;top:-1px;}
  #schoolRollleaderbatch .btn{ background-color:#FFF; border:1px solid #e6e6e6;height:30px; color:#0d9ee9;margin: 0px;}
  #schoolRollleaderbatch .upload-demo{ position:absolute; top:0; left:0px; height:32px; opacity: 0;width:260px ;}

  /*导入*/
  #schoolRollleaderbatch .submit{
    position: relative;
    top: 1px;
    height:30px;
    width:80px;
    border:none;
    background:#1ec56b ;
  }
  #schoolRollleaderbatch  .submit:hover{
    position: relative;
    top: 1px;
    height:30px;
    width:80px;
    border:none;
    background:#48e791 ;
  }
</style>
