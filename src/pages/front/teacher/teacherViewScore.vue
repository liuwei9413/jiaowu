<template>
  <div class="teacherViewScore"v-loading="loadingStatus">
    <div v-if="noClass == true">
      <div>
        <div class="yearTime textLeft">
          <i class="school-year-icon"></i>
          <span class="school-year-text">{{schoolYear}}</span>
        </div>

        <div class="gradeWrap textLeft">
          <span>执教班级：</span>
          <ul v-for="(classInfo, index) in classList">

            <li @click="queryTableMsg($event,classInfo,index)" :class="{active:active==index}">{{classInfo.gradeClassName}}</li>
          </ul>
        </div>
        <div class="termWrap">
          <h4 class="">
            {{term == 0 ? "上学期" : "下学期"}}
          </h4>
        </div>
        <div class="selectWrap textLeft">
          <h4>
            请选择试卷名称:
          </h4>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in selectData"
              :key="item.id"
              :label="item.examName"
              :value="item.examId">
            </el-option>
          </el-select>
        </div>
      </div>
    <div class="scoreTable" v-if="noScore == true">
      <!--<div class="countWrap">-->
        <!--<div class="headcount">合计：{{count}}人</div>-->
      <!--</div>-->
      <table class="table" v-for="tableList in selectData" v-if="tableList.examId == value">
        <tr v-for="tableTh in tableList.tableData.tableHeader">
          <th v-for="thData in tableTh" :rowspan="thData.rowNum" :colspan="thData.colNum">{{thData.text}}</th>
        </tr>
        <tr ref="tr" v-for="tableTrBody in tableList.tableData.tableBody">
          <td v-for="(tdValue, tdKey) in tableTrBody" v-show="tdKey != 'studentId' ">
            {{tdValue}}
          </td>
        </tr>
      </table>
    </div>
    <div class="noData" v-if="noScore == false">
      <p class="empty-text">暂无成绩信息</p>
    </div>
    </div>
    <div class="noData" v-if="noClass == false">
      <p class="empty-text">暂无成绩信息</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'teacherViewScore',
    data() {
      return {
        active:0,
        classId:"",
        examId:"",
        className:"",
        schoolYear:"",
        term:"",
        count:"",
        selectData:"",
        value:"",
        loadingStatus:true,
        classList:'',
        noClass:false,
        noScore:false,
      }
    },
    mounted(){
      let $this = this;
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.$ajax('teacher/findGradeClassByTeacherId',
        {'teacherId':userInfo.id}
      )
        .then(function (response) {
//             声明初始化变量
//            console.log(response);
          if (response.code == 200){
            $this.loadingStatus = false;
            $this.classList = response.data;
            if (response.data.length > 0){
              $this.classId = response.data[0].classId;
              $this.fetchDate();
              $this.noClass = true;

            }else {
              $this.noClass = false;
            }
            console.log($this.noClass);
          }else {
            $this.loadingStatus = false;
            $this.$alert(response.message, '提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
          }
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
      fetchDate(){
//        页面渲染请求
        let $this = this;
        $this.loadingStatus = true;
        var params = this.$route.query;
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        let schoolId = userInfo.schools.schoolId;
//      this.$ajax('static/tableScore.json',
        this.$ajax('teacher/findSubjectStudentScoreTableByCondition',
          {'classId':$this.classId,'schoolId':schoolId,'teacherId':userInfo.id}
        )
          .then(function (response) {
//             声明初始化变量
//            console.log(response);
            if (response.code == 200){
              $this.loadingStatus = false;
              $this.schoolYear = response.data.schoolYear;
              $this.term = response.data.term;
              $this.selectData = response.data.tableList;
              $this.value = response.data.tableList[0].examId;
//              $this.count = response.data.count;
              if(response.data.tableList.length<1){
                $this.noScore = false;
              }else {
                $this.noScore = true;
              }
              console.log($this.noScore)
            }else {
              $this.loadingStatus = false;
              $this.$alert(response.message, '提示', {
                confirmButtonText: '确定',
                callback: action => {}
              });
            }
//  $this.tableData = response.data
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      queryTableMsg(event,data,index){
        this.loadingStatus = true;
        this.active = index;
        this.classId = data.classId;
        this.fetchDate();
      },
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
//      "$route": "fetchDate"
    }
  }
</script>
<style >
  .teacherViewScore{
    padding: 20px;
    color: #666666;
    font-size: 14px;
  }
  .teacherViewScore .yearTime{
    text-align: left;
    /*margin: 20px 0;*/
  }
  .teacherViewScore .termWrap{
    margin: 10px 8px 10px;
  }
  .teacherViewScore .school-year-icon {
    display: inline-block;
    width: 3px;
    height: 14px;
    background: #0e9deb;
    vertical-align: middle;
  }
  .teacherViewScore .school-year-text {
    display: inline-block;
    margin-left: 8px;
    /*font-size: 14px;*/
    color: #0d9ee9;
    /*font-family: "\5B8B\4F53";*/
    vertical-align: middle;
  }
  .teacherViewScore .selectWrap{
    margin-bottom: 10px;
    padding-left: 8px;
  }
  .teacherViewScore .selectWrap h4{
    display: inline-block;
    margin-right: 10px;
  }
  .teacherViewScore .gradeWrap {
    margin-top: 10px;
    padding-left: 8px;
  }
  .teacherViewScore .gradeWrap ul {
    display: inline-block;
    margin-left: 5px;
  }
  .teacherViewScore .gradeWrap li {
    box-sizing: border-box;
    color: #545454;
    margin: 0 5px;
    display: inline-block;
    /*width: 60px;*/
    padding: 0 10px;
    height: 30px;
    line-height: 28.5px;
    border: 1px solid #d7d7d7;
    /*border-radius: 5px;*/
    text-align: center;
    cursor: pointer;
  }
  .teacherViewScore .gradeWrap li:hover {
    /*background: 0b81bf;*/
    color: #0b81bf;
    border: 1px solid #0b81bf;
  }
  .teacherViewScore .gradeWrap li.active {
    color: #0b81bf;
    border: 1px solid #0b81bf;
  }
  .teacherViewScore .el-input__inner {
    width: 290px;
    height: 30px;
    border-radius: 0;
  }
  .teacherViewScore .tableWrap {
    text-align: center;
    margin-top: 20px;
    padding: 0 8px;
  }
  .teacherViewScore .tableWrap th {
    font-weight: 600;
  }
  /*.teacherViewScore .el-button--primary {*/
  /*color: #fff;*/
  /*background-color: #0d9ee9;;*/
  /*border-color: #0d9ee9;;*/
  /*}*/








  /*查看成绩样式*/
  .teacherViewScore .countWrap {
    text-align: right;
  }
  .teacherViewScore .headcount {
    display: inline-block;
    text-align: center;
    width: 90px;
  }
  .teacherViewScore .scoreTable .table {
    width: 100%;
    border: 1px solid #dfe6ec;
    margin-top: 10px;
  }
  .teacherViewScore .scoreTable .table tr,td {
    text-align: center;
    border-bottom: 1px solid #dfe6ec;
    border-right: 1px solid #dfe6ec;
  }
  .teacherViewScore .scoreTable .table tr:nth-child(1) th{
    font-weight: 600;
  }
  .teacherViewScore .scoreTable .table th { box-sizing:border-box; text-align: center; background-color: #effaff; color: #007dc4; border:none; border-left: 1px solid #a5defa; border-top: 1px solid #a5defa;padding: 2px 1px}
  .teacherViewScore .scoreTable .table td {
    box-sizing: border-box;
    height: 30px;
  }
  .teacherViewScore .scoreTable .table td:nth-child(1) {
    width: 15%;
    min-width: 53px;
  }
  .teacherViewScore .scoreTable .table td:nth-child(2) {
    width: 20%;
    min-width: 150px;
  }

  /*固定表头样式设置*/
  .teacherViewScore .scrollTable .tbodyScroll  {
    box-sizing: border-box;
    display:block;
    height:500px;
    /*overflow-y:scroll;*/
    overflow: scroll;
    overflow-x:hidden
  }
  .teacherViewScore  .scrollTable .theadFixed {
    display:table;
    width: calc( 100% - 18px );
    table-layout:fixed;
  }
  .teacherViewScore .scrollTable .trFixed {
    display:table;
    width:100%;
    table-layout:fixed;
  }
  .teacherViewScore .scrollTable thead tr:nth-child(1) th:nth-child(1) {
    width: 5.55%;
  }
  .teacherViewScore .scrollTable thead tr:nth-child(1) th:nth-child(2) {
    width: 15.55%;
  }
  /*谷歌浏览器滚动条宽度*/
  .teacherViewScore ::-webkit-scrollbar/*整体部分*/
  {
    width: 19px;
  }
  .teacherViewScore .noData{
    background: url("../../../resources/front/imgs/nodata.png") no-repeat center;
    margin-top: 50px;
    height: 233px;
    margin-bottom: 40px;
    position: relative;
  }

  .teacherViewScore .noData .empty-text{
    position: absolute;
    left: 50%;
    transform: translate(-50%,0);
    bottom:-30px;
    font-size: 14px;
    color: #b6b6b6;
  }

</style>
