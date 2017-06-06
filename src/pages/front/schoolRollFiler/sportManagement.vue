<template>
 <div class="sportManagement publicScore">
   <div class="tabBtn textLeft btns">
     <el-button type="primary" @click="goTYSubjectBatch"><i class="icon-leading-in svgStyle"></i>批量导入</el-button>
     <el-button type="primary" @click="batchLoad()"><i class="icon-download svgStyle"></i>批量下载</el-button>
     <el-button class="del-btn" type="primary" @click="batchDelete()" :disabled="multipleSelection.length==0" icon="delete2" style="float: right;">批量删除</el-button>
   </div>
   <div class="yearTime textLeft">
     <i class="school-year-icon"></i>
     <span class="school-year-text">{{yearTime}}</span>
   </div>
   <div class="selectWrap textLeft">
     <h4>
        请选择试卷名称:
     </h4>
     <el-select v-model="value" @change="querySelect(value)" placeholder="请选择">
       <el-option
         v-for="item in datas"
         :key="item.id"
         :label="item.examName"
         :value="item.examId">
       </el-option>
     </el-select>
   </div>
   <div class="gradeWrap textLeft">
     <span>年级：</span>
     <ul v-for="(gradeList, index) in datas" v-if="gradeList.examId == value">

       <li @click="queryTableMsg($event,grades.classes,index)" ref="li" :class="{active:active==index}" v-for="(grades,index) in gradeList.grades">
         <span hidden>{{grades.classes}}</span>
         {{grades.gradeName}}
       </li>
     </ul>
   </div>
   <div class="tableWrap">
     <el-table
       :data="tableData3"
       border
       tooltip-effect="dark"
       style="width: 100%"
       @selection-change="handleSelectionChange">
       <el-table-column
         type="selection"
         width="52">
         <!--<template scope="scope">{{ scope.row.index }}</template>-->
       </el-table-column>
       <el-table-column
         prop="gradeName"
         label="年级"
         width="132">
       </el-table-column>
       <el-table-column
         prop="className"
         label="班级"
         width="132">
       </el-table-column>
       <el-table-column
         prop="term"
         label="学期"
         width="132">
       </el-table-column>
       <el-table-column
         label="创建时间"
         width="182">
         <template scope="scope">{{ scope.row.createTime }}</template>
       </el-table-column>
       <el-table-column label="操作" width="336">
         <template scope="scope">
           <el-button class="textBtn"
             type="text"
             @click="handleQuery(scope.$index, scope.row)" ><span>查看</span></el-button>
           <el-button class="textBtn"
             type="text"
             @click="handleUpload(scope.$index, scope.row)"><span>下载</span>
           </el-button>
           <el-button class="textBtn"
             type="text"
             @click="handleDelete(scope.$index, scope.row)"><span class="del">删除</span></el-button>
         </template>
       </el-table-column>
     </el-table>
   </div>
 </div>
</template>

<script>
  export default {
    name: 'sportManagement',
    data() {
      return {
        tableData3: [],
        allSelectMsg:[],
        multipleSelection: [],
        yearTime:"2017-2018学年",
        datas: [],
        gradeList:[],
        value: '',
        active:"0",
        param: {},
        tableMsg:[],
        grades:{
          scoreList:[]
        },
        userInfo:JSON.parse(localStorage.getItem('userInfo')),
      }
    },
//    beforeMount: function () {
    mounted: function () {
      let $this = this;
      let schoolId = this.userInfo.schools.schoolId;
      this.$ajax('physical/index',
        {"schoolId":schoolId}
      )
        .then(function (response) {
          if (response.code == 200){
            $this.tableData3 = response.data.datas[0].grades[0].classes;
            $this.value = response.data.datas[0].examId;
            $this.datas = response.data.datas;
            console.log($this.datas);

            $this.yearTime = response.data.schoolYear;
          }else {
            $this.$alert(response.message, '提示', {
                confirmButtonText: '确定',
                callback: action => {
//                  this.$message({
//                    type: 'info',
//                    message: `action: ${ action }`
//                  });
              }
          });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods: {
      querySelect(value){
//        console.log(this.$refs.li[0].firstChild.innerHTML);
        this.value = value;
        this.active = "0";
        this.tableData3 = eval(this.$refs.li[0].firstChild.innerHTML);
      },
      queryTableMsg(event,data,index){
        this.tableData3 = data;
        this.active = index;
      },
//      allSelectionChange(val){
////          console.log(val);
//        this.multipleSelection = [];
//        this.allSelectMsg = val;
////        console.log(this.allSelectMsg)
//      },
      handleSelectionChange(val) {
          console.log(val);
        this.multipleSelection = val;
//        console.log(this.multipleSelection);
//        console.log("all"+this.allSelectMsg);

      },
      handleUpload(index, row) {
        console.log(index, row);
        let $this = this;
        location.href = this.staticResources+'physical/exportClassScore?'+"classId="+row.classId+"&examId="+$this.value;
//        this.$ajax('physical/exportClassScore',
//          {"classId" : row.classId,"examId":$this.value}
//        ).then(function (response) {
//          if (response.code == 200){
//            alert("下载成功！")
//          }else {
//            $this.$message({
//              type: 'info',
//              message: '下载失败！'
//            });
//          }
//        }).catch(function (error) {
//          console.log(error);
//        });
      },
      handleQuery(index, row) {
//        this.router.push({ path: '/querySubjectScore' });
//        this.$route.push( { path: '/querySubjectScore/:id'});
//        this.$route.path = "/querySubjectScore"
//        location.href = '/querySubjectScore?data=1';
        this.$router.push({ path: '/sportManagement/querySportScore',  query: {"examId":this.value,"classId":row.classId}});

//
        console.log(index, row);
//        console.log(this,this.$route.path);
      },
      handleDelete(index, row) {
          let $this = this;
//        console.log(index, row);
//        this.tableData3.splice(this.nowIndex, 1, newValue);
//        this.tableData3.splice(index, 1);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax('physical/delClassScore',
            {"classId" : row.classId,"examId":$this.value}
          ).then(function (response) {
            if (response.code == 200){
              $this.tableData3.splice(index, 1);
              $this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else {
              $this.$message({
                type: 'info',
                message: '删除失败！'
              });
            }
          }).catch(function (error) {
              console.log(error);
            });
//          this.$message({
//            type: 'success',
//            message: '删除成功!'
//          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      batchLoad(){
          let $this = this;
        if (this.multipleSelection && this.multipleSelection.length >0){
          let multipleSelection = this.multipleSelection;
          let downLoadId = [];
          multipleSelection.forEach( ( item, i ) => {
            downLoadId[i] = item.classId;
          });
          downLoadId = downLoadId.join();
          this.$confirm('您将批量下载选中的文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            location.href = this.staticResources+'physical/exportClassScore?'+"classId="+downLoadId+"&examId="+$this.value;
//            this.$ajax('physical/exportClassScore',
//            {"classId":downLoadId, "examId":$this.value}
//            ).then(function (response) {
//              if (response.code == 200){
//                alert("下载成功！")
//              }else {
//                $this.$message({
//                  type: 'info',
//                  message: '下载失败！'
//                });
//              }
//            }).catch(function (error) {
//              console.log(error);
//            });
//          this.$message({
//            type: 'success',
//            message: '删除成功!'
//          });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消下载'
            });
          });
        }else {
          alert("未选中文件！")
        }
      },
      batchDelete(){
          let $this = this;
          if (this.multipleSelection && this.multipleSelection.length >0){
            let multipleSelection = this.multipleSelection;
            let delId = [];
            multipleSelection.forEach( ( item, i ) => {
              delId[i] = item.classId;
            });
//            console.log(delId);
            delId = delId.join();
            this.$confirm('您将批量删除选中的文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$ajax('physical/delClassScore',
                {"classId" : delId,"examId":$this.value}
              ).then(function (response) {
                if (response.code == 200){
                  $this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  multipleSelection.forEach( ( item, i ) => {
//                    console.log(item);
                      $this.tableData3.forEach( ( items, j ) => {
                          if (item == items){
//                              console.log(1,j);
                            $this.tableData3.splice(j, 1);
                          }
                      });
                  });
                  $this.multipleSelection = [];

                }else {
                  $this.$message({
                    type: 'info',
                    message: '删除失败！'
                  });
                }
              }).catch(function (error) {
                console.log(error);
              });
//          this.$message({
//            type: 'success',
//            message: '删除成功!'
//          });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }else {
            alert("未选中文件！")
          }
      },
      //      跳转批量导入
      goTYSubjectBatch(){
        this.$router.push({ path: '/sportManagement/tySubjectbatch',  query: {'schoolId':this.userInfo.schools.schoolId}});
      }
    },
  }

</script>
<style >
  @import "../../../resources/front/css/common/scoreAndSport.css";
</style>

