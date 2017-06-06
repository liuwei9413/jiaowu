<template>
  <div id="tySubjectbatch">
    <div class="saveDiv">
      <router-link :to="{ path:  '/sportManagement' }" class=" icon-back">返回 </router-link>
    </div>
    <el-form :model="formData" method="post" action="/schadmin/import/importScore" enctype="multipart/form-data" id="importScoreForm">
      <ol>
        <li style="height:80px">
          <h3 style="padding-left:13px;display: block">1、下载模板</h3>
          <p style="float: left;">点击下载体能小学模板 &nbsp&nbsp&nbsp<a href="http://60.205.115.173:8888/yitai-educational/downloads/体能模板小学.xls" target="_blank"><el-button type="primary" class="icon-download download" >   下载</el-button></a></p>
          <p style="float: left;">点击下载体能中学模板&nbsp&nbsp&nbsp<a href="http://60.205.115.173:8888/yitai-educational/downloads/体能模板中学.xls" target="_blank"><el-button type="primary" class="icon-download download ">   下载</el-button></a></p>
        </li>
        <li >
          <div style="padding-left:13px;height:34px;background:#f9f9f9;width: 100%;">
        <h3>2、选择导入试卷</h3>
          <button type="button" class="el-button addbtn" v-on:click="addNewPaper"><!----><i class="icon-spread" style="margin-right: 10px;"></i><span>新增试卷</span></button>

            <button type="button" class="el-button  editbtn" v-on:click="editPapers('')"><!----><i class="icon-edit" style="margin-right: 10px;"></i><span>编辑试卷</span></button>
         </div>

          <el-form-item label="试卷名称：" style="margin-top: 20px">
            <el-select v-model="deafultPaperId" class="inputWidth" placeholder="请选择试卷" v-on:change="consolePaperId">
              <el-option v-for="(paper, index) in paperList"
                         :key="index"
                         :value="paper.id"
                         :label="paper.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <input type="hidden" name="schoolYear" value="" v-model="formData.schoolYear">
          <input type="hidden" name="examId" value="" v-model="formData.examId">
          <input type="hidden" name="classId" value="" v-model="formData.classId">
          <input type="hidden" name="term" value="" v-model="formData.term">
        </li>
        <li class="file-box">
          <h3 style="padding-left:13px; display: block;">3、选择需要导入的EXCEL文件</h3>
          <form id="elcelform" style="margin-top: 15px;">
            <el-form-item style="margin-bottom:0;">
              <label class="LabBtn">选择文件
            <input
                name="file"
                class="upload-demo"
                accept=".xlsx;.xls;.csv"
                type="file"
                multiple="multiple"
                hidden="true"
                v-on:change="fileChange($event)">
              </label>
              <el-button class="submit" type="primary" native-type="submit" :loading="formSubmited" v-on:click="submitForm($event)">导入</el-button>
            </el-form-item>
          </form>
          <ul class="el-upload-list el-upload-list--text">
            <el-row>
              <el-col style="padding-right:40px;" :span="12" v-for="(value, index) in excelFile" :key="excelFile"><li style="padding:0;" class="el-upload-list__item is-success">
                <a class="el-upload-list__item-name"><i class="el-icon-document"></i><span v-text="value"></span></a>
                <label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-circle-check"></i></label>
                <i class="el-icon-close" @click="delexcel(index);"></i>
              </li>
              </el-col>
            </el-row>
          </ul>
        </li>
      </ol>

    </el-form>
    <div  class="explain" style="margin-top: 10px;">
      <h1>导入格式案例</h1>
      <img src="../../../resources/front/imgs/tySubjectinfomoban.png"/>
      <h1>导入说明</h1>
      <p>1、文件导入前请严格按照数据要求和格式要求填写。</p>
      <p>2、导入如果出现异常或数据问题，请修改后重新导入。</p>
    </div>

    <div >
      <div v-show="isError" style="margin-top: 20px;min-height:500px;">
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
    <el-dialog class="tankuang" :title="dialogTitle[addOrEdit] + '试卷'" v-model="dialogFormVisible">
      <el-row>
        <el-col  style="float:left;width:22%;height: 100px;" v-if="addOrEdit === 0">
          <div style="float:left;width: 10px;height: 10px;"></div>
        </el-col>
        <el-col :span="addOrEdit === 1 && 6 || 0" v-if="addOrEdit === 1" v-model="paperList">
          <ul>
            <li v-for="(paper, index) in paperList" :key="index"><el-button style="min-width:180px;" v-on:click="editPapers(paper.id)" :type="(paper.id == dialogForm.id) ? 'primary' : 'text'">{{paper.name}}</el-button></li>
          </ul>
        </el-col>
        <el-button v-if="dialogForm.id" style="float: right" v-on:click="deletePaper(dialogForm.id)">删除</el-button>
        <el-col :span="addOrEdit === 1 && 18 || 12">
          <el-form>
            <el-form-item label="试卷名称：" :label-width="formLabelWidth">
              <el-input auto-complete="off"  placeholder="请填写试卷名称，同一试卷请勿重复新增" v-model="dialogForm.name" style="width: 80%;"  :maxlength="30" ></el-input>
              <input v-model="dialogForm.id" type="hidden" v-if="dialogForm.id">
            </el-form-item>
            <el-form-item label="学年："  v-model="dialogForm.schoolYear" :label-width="formLabelWidth">
          <!--    <el-select v-model="dialogForm.schoolYear" style="width:80%;">
                <el-option v-for="(year, index) in schoolYears" :key="index"
                           :label="year"
                           :value="year">
                </el-option>
              </el-select>-->
              <p v-for="(year, index) in schoolYears">{{year}}</p>
            </el-form-item>
            <el-form-item label="学期：" v-model="dialogForm.term" :label-width="formLabelWidth">
              <!--<el-radio-group v-model="dialogForm.term">
                <el-radio :label="0">上学期</el-radio>
                <el-radio :label="1">下学期</el-radio>
              </el-radio-group>-->
              <p v-if="dialogForm.term == 0">下学期</p>
              <p v-if="dialogForm.term == 1">下学期</p>
            </el-form-item>
            <el-form-item class="dialog-footer" style="margin-left:5%;">
              <el-button v-on:click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" native-type="submit" v-on:click="updateExamination($event)">保 存</el-button>
            </el-form-item>
          </el-form>
          <el-alert
            :title="errorMsg"
            type="error"
            v-show="showErrorMsg">
          </el-alert>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import $ from 'jquery'
  export default {
    data() {
      return {
        formSubmited: false,
        formLabelWidth: '85px',
        dialogFormVisible: false,
        dialogTitle: ['新增', '编辑'],
        addOrEdit: 0,
        paperList: {
        },
        newTerm: '',
        schoolYears: [],
        schoolYearId: '',
        firstSchoolYearId: '',
        formData: {
          //classId:this.$route.query.classId,
          examId: '',
          term: '',
          schoolYear: '',
          fileList: []
        },
        dialogForm: {
          schoolId:this.$route.query.schoolId,
          id: '',
          name: '',
          schoolYear: '',
          term: '',
          type: ''
        },
        excelFile:[],//创建文件数组
        uploadexcel:[],//待上传数组
        errorMsg: '',
        showErrorMsg: false,
        //异常处理
        isError:false,
        errorArr:[],//储存批量导入的异常
        //默认
        papers:[],
        deafultPapername:'',
        deafultPaperId:'',
        deafultTerm:'',
        deafultSchoolYear:''
      };
    },
    mounted() {
      let that = this
      //获取考试列表
      console.log(this.$route.query)
      that.$ajax('/physical/examination/list', {schoolId:that.dialogForm.schoolId})
        .then(res => {
          if(res.code == 200 && res.data && res.data.length) {
            that.paperList = {};
            res.data.forEach((paper, index) => {
              (index === 0) && (that.firstSchoolYearId = paper.id)
              that.paperList[paper.id] = paper
            });
            that.papers=res.data;
            that.deafultPapername=that.papers[0].name;
            that.deafultPaperId=that.papers[0].id;
            that.deafultTerm=that.papers[0].term;
            that.deafultSchoolYear=that.papers[0].schoolYear;
          }
        });
      //获取学年列表
      that.$ajax('/schadmin/findSchoolYear')
        .then(res => {
          if(res.code == 200 && res.data && res.data.length) {
            that.schoolYears = res.data
          }
        });
      that.$ajax('/schadmin/findNowTerm')
        .then(res => {
          if(res.code == 200) {
            that.newTerm = res.data
          }
        });

    },
    methods: {
      consolePaperId () {
        console.log(this.deafultPaperId)
      },
      changeSchoolYear() {
        this.formData.schoolYear = this.paperList[this.schoolYearId].schoolYear
        this.formData.term = this.paperList[this.schoolYearId].term
        this.formData.examId = this.schoolYearId
        console.log(this.formData)
      },
      addNewPaper() {
        this.showErrorMsg = false
        this.dialogForm = {
          schoolId:this.$route.query.schoolId,
          id: '',
          name: '',
          schoolYear: '',
          term: this.newTerm,
          type: ''
        }
        this.addOrEdit = 0
        this.dialogFormVisible = true
      },
      editPapers(id) {
        let firstPaperId = (Object.keys(this.paperList).map(function (k, i) {
          return k;
        })[0])
        id = (id || this.deafultPaperId || firstPaperId)
        if(!this.firstSchoolYearId || !id) {
          this.$alert('暂无试卷，请先添加试卷！', '标题名称', {
            confirmButtonText: '确定',
          });
          return
        }
        this.showErrorMsg = false
        this.dialogForm = {};
        for(let xx in this.paperList[id]) {
          this.dialogForm[xx]  = this.paperList[id][xx].toString()
        }
        this.addOrEdit = 1
        this.dialogFormVisible = true
      },
      updateExamination(e) {
        e.preventDefault()
        let that = this
        let api = '/physical/examination/edit'
        delete that.dialogForm.createTime
        if(!that.dialogForm.id) {
          delete that.dialogForm.id
          api = '/physical/examination/add'
        }
        that.dialogForm.schoolYear = that.schoolYears[0];
        that.dialogForm.term = that.newTerm;
        that.$ajax(api, that.dialogForm)
          .then(res => {
            if(res.code == 200) {
              let id = res.data;
              if(!that.paperList[id]) {
                that.paperList[id] = {}
              }
              that.paperList[id] = JSON.parse(JSON.stringify(that.dialogForm))
              that.paperList[id].id = id
              for(let xx in that.dialogForm) {
                that.paperList[id][xx] = that.dialogForm[xx].toString()
              }
              if(that.dialogForm.id) {
//                that.paperList.filter(item => item.id == that.deafultPaperId )[0].name;

                that.deafultPaperId = that.papers.filter(item => item.id == id )[0].name;
              }
              if(!that.firstSchoolYearId) {
                that.firstSchoolYearId = id
              }
              if(!that.addOrEdit) {
                that.dialogFormVisible = false
              }
              this.$alert(res.message, '提示', {
                confirmButtonText: '确定',
              });
            }
            if(res.code != 200 && res.message) {
              that.errorMsg = res.message
              that.showErrorMsg = true
            }
          });
        return false
      },
      fileChange: function(e) {
        var _self = this;
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)return;
        if(this.excelFile.length){
          for(let i =0; i<files.length;i++){
            for(let j =0; j<_self.excelFile.length;j++){
              console.log(_self.excelFile[j].indexOf(files[i].name));
              if(_self.excelFile[j].indexOf(files[i].name)!=-1){
                this.$message({
                  message: '不能导入相同的文件',
                  type: 'warning'
                });
                return false;
              }
            }
          }
        }
        this.createfile(files);

      },
      createfile(file) {
        var vm = this;
        if(typeof FileReader==='undefined'){
          this.$message({
            message: '您的浏览器不支持上传，请升级您的浏览器',
            type: 'warning'
          });
          return false;
        }
        if(!this.Isexcel(file[0].name)){
          this.$message.error('请上传正确格式的文件');
          return;
        }
        if(vm.excelFile.length>6){
          this.$message.error('一次上传不能大于6份文件');
          return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);
        //reader.onload =function(e){
        reader.onload = (e) => {
          if(!e)e=window.event;//处理IE问题
          var target=(e.target)?e.target:e.srcElement;
          for(let i =0; i<file.length;i++){
            vm.uploadexcel.push(file[i]);
            vm.excelFile.push(file[i].name);
          }
        };
        setTimeout("document.getElementById('elcelform').reset()",500);
      },
      delexcel(ind){
        this.excelFile.splice(ind,1);
        this.uploadexcel.splice(ind,1);
      },
      Isexcel(type) {
        var strFilter=".xlsx|.xls|.csv|";
        if(type.indexOf(".")>-1)
        {
          var p = type.lastIndexOf(".");
          var strPostfix=type.substring(p,type.length) + '|';
          strPostfix = strPostfix.toLowerCase();
          if(strFilter.indexOf(strPostfix)>-1)
          {
            return true;
          }
        }
        return false;
      },
      deletePaper: function(paperId) {
        let that = this
        if(!paperId) {
          return
        }
        that.$ajax('/physical/examination/delete', {id: paperId})
          .then(res => {
            if(res.code == 200) {
              delete that.paperList[paperId]
              if(that.deafultPaperId == paperId) {
                that.deafultPaperId = ''
              }
              that.dialogForm = {
                schoolId: that.dialogForm.schoolId,
                id: '',
                name: '',
                schoolYear: '',
                term: '',
                type: ''
              }
              that.$alert(res.message, '提示', {
                confirmButtonText: '确定',
              });

              that.dialogFormVisible = false
            }
            if(res.code != 200 && res.message) {
              that.errorMsg = res.message
              that.showErrorMsg = true
            }
          });

      },
      submitForm: function(e) {
        let examId= this.formData.examId || this.deafultPaperId;
        e.preventDefault()
        if(this.uploadexcel.length==0){
          this.$message({message: '请选择文件',type: 'warning'});
          return;
        }
        if(examId=="" ||examId==null){
          this.$message({message: '请选择导入试卷',type: 'warning'});
          return;
        }
        let that = this
        that.formSubmited = true
        //let formData = new window.FormData(document.getElementById('importScoreForm'));
        var fd = new FormData();
        for(let i =0; i<this.uploadexcel.length;i++){
          fd.append('file', that.uploadexcel[i]);
        }
        fd.append('examId',examId);
        $.ajax({
          url:"http://60.205.115.173:8888/yitai-educational/import/physical?",
          type:"post",
          data:fd,
          processData:false,
          contentType:false,
          dataType: 'json',
          success:function(res){
            if(res.code == 200){
              that.formSubmited = false
//            console.log(data);
              that.$alert(res.message, '提示', {
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



             /* var anchor = that.$el.querySelector("#error");
              setTimeout(function(){
                document.body.scrollTop = anchor.offsetTop;
              },500)
              console.log(that.errorArr)*/
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
          error:function(e){
            that.formSubmited = false
            alert("错误！！");
          }
        });
      }
    }
  }
</script>

<style >
  #tySubjectbatch .saveDiv {
    padding: 10px 0 10px 0;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #e9edf1;
  }
  #tySubjectbatch .saveDiv a {
    font-size: 14px;
    color: #666;
    line-height: 30px;
  }
  .icon-back:before{
    position: relative;
    top: 1px;
  }
  #tySubjectbatch{
    padding:0 20px  50px 20px;
  }
  #tySubjectbatch h1{
    font-size:14px;
    color:#666;
    line-height:34px;
  }
  #tySubjectbatch p{

    font-size: 14px;
    color:#666;
    line-height:34px;
  }
  #tySubjectbatch .tankuang p{
    color: #1f2d3d;
    font-size: 14px;
    margin-left:2px;
  }
  #tySubjectbatch .download{
    height: 30px;
    width: 80px;
    margin-left: 10px;

  }
  #tySubjectbatch li{
    margin-top: 20px;
  }
  #tySubjectbatch h3 {
    display: inline-block;
    height:34px;
    line-height: 34px;
    font-size: 14px;
    color: #333333;
    background: #f9f9f9;
  }
  #tySubjectbatch .el-row{
    margin-left:36px;
  }
  #tySubjectbatch .addbtn{
    background: #f9f9f9;
    margin-left: 650px;
  }
  #tySubjectbatch .editbtn{
    background: #f9f9f9;
  }
  #tySubjectbatch .el-form-item{
    margin-left:36px;
  }
  .dialog-footer{
   padding-left: 150px;
  }
  #tySubjectbatch .file-box{ position:relative;margin: 0px;}
  #tySubjectbatch .txt{ height:28px; border:1px solid #e6e6e6; width:180px;margin: 0px;}
  #tySubjectbatch .btn{ background-color:#FFF; border:1px solid #e6e6e6;height:30px; width:70px;margin: 0px;}
  #tySubjectbatch .upload-demo{ position:absolute; top:0; left:0px; height:32px; opacity: 0;width:260px ;}

  /*导入*/
  #tySubjectbatch  .submit{
    border: 1px solid #1ec56b;
    text-align: right;
    width:80px;
    /* margin-left:500px;
      margin-bottom: 10px;*/
    background:#1ec56b url(../../../resources/front/imgs/lead.png) no-repeat 10px 8px;
  }
  #tySubjectbatch  .submit:hover{

    text-align: right;
    width:80px;
    border: 1px solid #52f29c;
    /*margin-left:500px;
    margin-bottom: 10px;*/
    background:#52f29c url(../../../resources/front/imgs/lead.png) no-repeat 10px 8px;
  }
  /*说明样式*/
  #tySubjectbatch h1{
    font-size:14px;
    color:#666;
    line-height:34px;
  }
  #tySubjectbatch .explain p{
    font-size: 14px;
    color:#666;
    line-height:34px;
    text-indent: 2em;
  }
  /*新增-编辑弹框*/

  #tySubjectbatch .el-dialog--small{
    min-width: 942px;
  }
  #tySubjectbatch  .el-dialog__header {
    text-align: center;
    padding: 0;
    line-height: 32px;
    border-bottom: 1px solid #efefef;
    margin: 0 auto;
  }
  #tySubjectbatch .el-dialog__title{
    font-size: 12px;
    color:#0d9ee9;
  }
  #tySubjectbatch  .el-dialog__headerbtn{
    margin-right: 20px;
  }
  /*下*/
  #tySubjectbatch .el-dialog__body {
    padding: 30px 30px;
    color: #48576a;
    font-size: 14px;
  }
  #tySubjectbatch .el-dialog__body .el-row{
    margin-left: 0;
  }
  #tySubjectbatch .el-dialog__body .el-row  .el-form-item{
    margin-left: 0;
  }
  #tySubjectbatch  .el-radio-group{
    width: 410px;
    padding-top: 10px;
  }
  #tySubjectbatch  .el-radio{
    margin-left: 0px;
    line-height:16px;
    margin-bottom: 10px;
    margin-right: 15px;
  }
  #tySubjectbatch .addbtn,.editbtn{
    border: none;
    list-style: none;
  }
  /*上传部分*/
  .LabBtn{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #bfcbd9;
    color: #1f2d3d;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #50bfff;
    border-color: #50bfff;
  }
</style>
