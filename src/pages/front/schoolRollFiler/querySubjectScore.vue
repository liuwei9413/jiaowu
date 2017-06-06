<template>
  <div class="querySubjectScore publicScore"v-loading="loadingStatus">
    <div class="callBackBtn">
      <el-button @click="callBackPages" type="text" icon="arrow-left">返回</el-button>
      <div class="editBtn" :class="{hideStatus: !hideBtnState}">
        <el-button @click="editPages" type="success"> <i class="icon-edit svgStyle"></i> 编辑</el-button>
      </div>
      <div class="hideBtn" :class="{hideStatus: hideBtnState}">
        <el-button @click="cancelPages" type="primary"><i class="icon-cancel svgStyle"></i>取消</el-button>
        <el-button @click="savePages" type="success"><i class="icon-conserve svgStyle"></i>保存</el-button>
      </div>
    </div>
    <div class="examMsg">考试名称：<p>{{examName}}</p></div>
    <div class="gradeWrapMsg">
      <div>年级：<p>{{gradeName}}</p></div>
      <div class="classMsg">班级：<p>{{className}}</p></div>
    </div>
    <div class="scoreTable scrollTable">
      <div class="countWrap">
        <div class="headcount">合计：{{count}}</div>
      </div>
      <table class="table form-table">
        <thead :class="scrollState > 16 ? 'theadFixed' : ''">
        <tr v-for="tableTh in tableData.tableHeader">
          <th v-for="thData in tableTh" :rowspan="thData.rowNum == 0 ? '' : thData.rowNum" :colspan="thData.colNum == 0 ? '' : thData.colNum">{{thData.text}}</th>
        </tr>
        </thead>
        <tbody :class="scrollState > 16 ? 'tbodyScroll' : ''">
        <tr ref="tr" v-for="tableTrBody in tableData.tableBody" :class="scrollState > 16 ? 'trFixed' : ''">
          <td v-for="(tdValue, tdKey) in tableTrBody" v-show="tdKey != 'studentId' ">
            <input ref="input" maxlength="4" @change="queryChangeStatus($event)" :class="editStatus ? 'allowEdit' : 'notAllowEdit'" disabled="disabled" :model="tdKey" :value="tdValue"  v-if="">
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'querySubjectScore',
    data() {
      return {
        examName:"",
        examId:"",
        gradeName:"",
        className:"",
        schoolYear:"",
        classId:"",
        term:"",
        count:"",
        tableData:[],
        oldData: [],
        hideBtnState:true,
        editStatus: false,
        queryChangeCount:0,
        errorMsg:0,
        loadingStatus:true,
        scrollState : '' // 是否滚动表格
      }
    },
    mounted(){
//        页面渲染请求
      let $this = this;
      //获取query传递的参数
      var scoreId = this.$route.query;
      $this.examId = scoreId.examId;
      $this.classId = scoreId.classId;
//      this.$ajax('static/tableScore.json',
      this.$ajax('schadmin/findClassStudentScoreTableByCondition',
          scoreId
       )
         .then(function (response) {
//             声明初始化变量
           $this.tableData = response.data.tableData;console.log(response.data.tableData)
           $this.scrollState = response.data.tableData.tableBody.length;
           $this.oldData = response.data.tableData;
           $this.examName = response.data.examName;
           $this.gradeName = response.data.gradeName;
           $this.className = response.data.className;
           $this.schoolYear = response.data.schoolYear;
           $this.term = response.data.term;
           $this.count = response.data.count;
           $this.loadingStatus = false;
         })
         .catch(function (error) {
           console.log(error);
         });
  },
    methods: {
      callBackPages(){
//          返回上一页
          this.$router.go(-1);
      },
      editPages(){
//          编辑表格
        this.$confirm('您将编辑当前的表格, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var input = this.$refs.input;
          input.forEach( ( item, i ) => {
              var key = item.getAttribute("model");
              //判断是否可编辑项
              if (key == "studentName" || key == "sid"){
                item.disabled = "disabled"
              }else {
                item.disabled = false;
              }
          });
          this.editStatus = true;
          this.hideBtnState = false;
//          this.$message({
//            type: 'success',
//            message: '删除成功!'
//          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
//        console.log(this.$refs);

      },
      cancelPages(){
          //取消编辑
          var oldData = this.tableData;
          this.$set(this.tableData,oldData);
          var input = this.$refs.input;
          input.forEach( ( item, i ) => {
            item.disabled = "disabled";
            item.style.border = ""
          });
        this.editStatus = false;
        this.hideBtnState = true;
        this.errorMsg = 0;

      },
      savePages(){
//          保存提交数据
        const $this = this;
        if (this.queryChangeCount == 0){
          this.editStatus = false;
          this.hideBtnState = true;
          var input = this.$refs.input;
          input.forEach( ( item, i ) => {
            item.disabled = "disabled";
          });
          return;
        }else {
//          if (this.errorMsg > 0){
//            this.$alert('您输入修改的成绩格式有误,请您修改后从新提交', '提示', {
//                confirmButtonText: '确定',
//                callback: action => {
////                  this.$message({
////                    type: 'info',
////                    message: `action: ${ action }`
////                  });
//                }
//              });
//          }else{
            this.$confirm('您将保存当前已编辑过的成绩表格, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var tdList = this.$refs.tr;
              var userData = [];
              var user = {};
              tdList.forEach( ( item, i ) => {
                var tdBox = item.querySelectorAll('td input');
                user = new Object();
                (function (i) {
                  tdBox.forEach( ( value, j ) => {
                    value.disabled= "disabled";
                    var key = value.getAttribute("model");
                    var $value = value.value;
                    user[key] = $value;
                  });
                })(i);
                userData.push(user);
              });
              userData = JSON.stringify(userData);
              this.$ajax('schadmin/updateScoreByClassIdAndExamId',
                {
//                  "examId":'32',
                  "examId":$this.examId,
//                  "classId":'1',
                  "classId":$this.classId,
                  "schoolYear":$this.schoolYear,
                  "term":$this.term,
                  "data":userData
                }
              )
                .then(function (response) {
//                console.log(response);
                  $this.$message({
                    type: 'success',
                    message: '保存成功!'
                  });
                })
                .catch(function (error) {
//                console.log(error);
                  $this.$message({
                    type: 'error',
                    message: '保存失败'
                  });
                });
              userData = JSON.parse(userData);
              this.oldData.tableBody = userData;
              this.queryChangeCount = 0;
              this.editStatus = false;
              this.hideBtnState = true;
            }).catch(() => {
              $this.$message({
                type: 'info',
                message: '已取消操作'
              });
            });
//          }
        }
      },
      queryChangeStatus(event){
//          输入数据监测、验证
//        var scoreReg = /^(0|\d{1,2}|100)(\.\d)?$/;//0-100 可以带一位小数
        this.queryChangeCount += 1;
//        var scoreValue = event.target.value;
//        var res = scoreReg.test(scoreValue);
////        console.log(scoreValue,res,event);
//        if (!res){
//          event.target.style.border = "1px solid red";
//          this.errorMsg += 1;
//        } else {
//          event.target.style.border = "";
//          this.errorMsg -= 1;
//        }
      }
    }
  }
</script>
<style>
  @import "../../../resources/front/css/common/scoreAndSport.css";
</style>
