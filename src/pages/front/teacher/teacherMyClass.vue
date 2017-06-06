<template>
  <div class="teacherMyClass" v-loading.lock="fullscreenLoading" element-loading-text="页面加载中...">
    <div class="myClassMgt-header btns">
      <router-link :to="{ path: '/teacherMyClass/addstudens', query:{classId:classId,gradeId:gradeId }}" class="el-button el-button--success"><i class="icon-new"></i> 新建学生  </router-link>
      <router-link :to="{ path: '/teacherMyClass/teacherstudentbatch', query:{classId:classId,gradeId:gradeId}}" class="el-button el-button--primary"> <i class="icon-leading-in"></i> 批量导入学生</router-link>

      <el-button type="primary" @click="manageClass" ><i class="icon-grouping"></i> 分班</el-button>
      <el-button   @click.prevent="batchDeleteStudents" :disabled="listenStudentsMultipleSelection.length == 0" class="del-btn"><i class="icon-delete"></i> 删除学生</el-button>

    </div>
    <div class="myClassMgt-body">
      <div class="noData" v-if="total == 0" >
        <p class="empty-text">班级暂无学生</p>
      </div>
      <div class="myClassMgt-body-table" v-if="total != 0">
        <el-table
          :data="studentListsData"
          @row-click="getCurrentRowInfo"
          @selection-change="listenStudentsSelectionChange"
          border
          stripe
          style="width: 100%">
          <el-table-column
            type="selection"
            width="30">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            width="80">
            <template scope="scope">
              <span v-if=" scope.row.sex == 1 ">
                男
              </span>
              <span v-if=" scope.row.sex == 2 ">
                女
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="nation"
            label="民族">
          </el-table-column>

          <el-table-column
            prop="sid"
            label="学籍号" >
          </el-table-column>

          <el-table-column
            prop="schoolYear"
            label="入学年份">
          </el-table-column>
          <el-table-column

            label="状态">
            <template scope="scope">
              <el-dropdown trigger="click" @command="changeStudensState">
                    <span class="el-dropdown-link">
                      <b v-if="scope.row.state == 0">正常</b>
                      <b v-else-if="scope.row.state == 1"> 禁用</b>
                      <b v-else-if="scope.row.state == 2">休学</b>
                      <b v-else="scope.row.state == 3">离校</b>

                      <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="0">正常</el-dropdown-item>
                      <el-dropdown-item command="1">禁用</el-dropdown-item>
                      <el-dropdown-item command="2">休学</el-dropdown-item>
                      <el-dropdown-item command="3">离校</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>


            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="280"
            >
            <template scope="scope">

                  <router-link :to="{ path: '/teacherMyClass/editstudent', query:{classId:classId,gradeId:gradeId, type:'detail',id: scope.row.id }}" class="el-button el-button--primary">查看</router-link>


                  <router-link :to="{ path: '/teacherMyClass/editstudent', query:{classId:classId,gradeId:gradeId, type:'edit',id: scope.row.id }}" class="el-button el-button--primary">编辑</router-link>

                <el-button
                  type="primary"
                  size="small"
                  @click="studentRestPwd(scope.$index, scope.row)">重置密码</el-button>
                <el-button
                  type="danger"
                  size="small"
                  @click="studentDelete(scope.$index, scope.row)">删除</el-button>
              </template>
          </el-table-column>

        </el-table>
        <div class="pagination">
            <el-pagination
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="total"
              :current-page="currentPage"
              @current-change="paginationCurrentChange"
              border
              stripe
              >
            </el-pagination>
        </div>
      </div>
    </div>

    <el-dialog title="分班管理" v-model="dialogVisible" class="teacherMyClass"  :close-on-click-modal="false" size="small" >
      <div class="transfer-data">
        <div class="transfer-data-left">
          <div class="transfer-data-header">
            <h2 class="title">年级池</h2>

            <!-- <el-select v-model="gradeAllName" @change="gradesAllSelected(gradeAllName)">
              <el-option
                v-for=" (item,index) in editGrades"
                :label="item.name"
                :value="item.serial"
                :key="index"
                @click.native="getGradeAllSelected(item)"
                >
              </el-option>
            </el-select> -->

            <el-input placeholder="模糊筛选" v-model="gradesSearchText" >
              <!-- <el-button slot="append" icon="search" @click="gradesSearch(gradesSearchText)"></el-button> -->
            </el-input>
          </div>
          <div class="transfer-data-body">
            <el-table
              ref="gradesAllTable"
              :data="studentGradeListsDataFilter"
              @selection-change="studentsSelectionChange"
              @select-all="addStudentsSelectionAll"
              empty-text="请通过新增学生或者批量导入学生的方式维护班级学生"
              >
              <!-- style="width: 100%" -->
              <!-- @current-change="currentChange" -->
              <el-table-column
                    type="selection"
                    width="30">
                  </el-table-column>
              <el-table-column
                prop="sid"
                label="学籍号"
                >
              </el-table-column>

              <el-table-column
                prop="name"
                label="姓名">
              </el-table-column>
              <el-table-column
                 prop="className"
                label="上学年班级"

                >
              </el-table-column>
            </el-table>
            <!-- <div class="pagination">
                <el-pagination
                  :page-size="10"
                  layout="prev, pager, next, jumper"
                  :total="gradesTotal"
                  @current-change="gradesPaginationCurrentChange"
                  >
                </el-pagination>
            </div> -->

          </div>
        </div>
        <div class="transfer-data-operation">

          <el-button type="primary" icon="arrow-right" @click="addStudent" :disabled=" addStudensState "></el-button>
          <el-button type="primary" icon="arrow-left"  @click="removeStudent"  :disabled=" removeStudensState "></el-button>
          <!-- <el-button type="primary" icon="upload" @click="saveStudents" :disabled=" saveStudensState ">保存</el-button> -->


        </div>
        <div class="transfer-data-right">

          <div class="transfer-data-header">
            <h2 class="title">所选班级</h2>
            <el-input placeholder="模糊筛选" v-model="classesSearchText">
              <!-- <el-button slot="append" icon="search" @click="classesSearch(classesSearchText)"></el-button> -->
            </el-input>
          </div>
          <div class="transfer-data-body">
            <el-table
              ref="gradesTable"
              :data="editStudentsListsDataFilter"
              style="width: 100%"

              @selection-change="removeStudentsSelectionChange"
              @select-all="removeStudentsSelectionAll"
              border
              stripe
              empty-text="暂无学生"
              >
              <el-table-column
                type="selection"
                width="30">

              </el-table-column>
              <el-table-column
                prop="sid"
                label="学籍号"
                >
              </el-table-column>

              <el-table-column
                prop="name"
                label="姓名"
                >
              </el-table-column>
              <!-- <el-table-column
                prop="className"
                label="历史班级"
                width="80">
              </el-table-column> -->

            </el-table>
          </div>

        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="success" @click="saveStudents" :disabled=" saveStudensState " >添 加</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'teacherMyClass',
    data () {
      return {
        // 全屏遮罩层
        fullscreenLoading: false,
        // 角色信息
        userInfo:'',


        dialogVisible:false,

        gradeName:'',
        // className:'',
        // 年级池当前班级id
        allCurrentGradeId:'',
        gradesAllSelectedIndex:'1',
        defaultClassName:'',
        // 年级
        grades:[],
        // 所要编辑的年级
        editGrades:[],
        editGradeId:'',
        editGradeCodeId:'',
        // 默认年级
        gradeId:'',
        // 当前行信息
        currentRowInfo:'',

        // 班级
        classes:[],
        // 所要编辑的班级
        editClasses:[],

        editClassId:'',
        // 默认班级
        classId:'',
        // 当前年级学生列表数据
        studentGradeListsData:[],
        // 当前班级学生列表数据
        studentListsData:[],
        // 学生数量
        studentListslength:'',
        // 所要编辑的学生列表
        editStudentsListsData:[],
        // 所要编辑的年级当前id
        editCurrentGradeId:'',
        // 所要编辑的班级当前id
        editCurrentClassId:'',

        gradesSearchText:'',
        classesSearchText:'',
        //当前选中学生列表
        listenStudentsMultipleSelection:[],
        // 批量删除学生按钮状态
        batchDeleteStudentsState:true,

        // 当前年级总页数
        total:0,
        // 当前页
        currentPage:1,
        // 年级池总页数
        gradesTotal:0,
        // 选择添加学生集合
        addMultipleSelection:[],
        // 选择移除学生集合
        removeMultipleSelection:[],
        // 添加学生按钮状态
        addStudensState:true,
        // 移除学生按钮状态
        removeStudensState:true,
        // 保存学生按钮状态
        saveStudensState:true,

      }
    },
    mounted(){
      this.getUserInfo()
      this.getSutdentClassLists(this.classId,this.currentPage)
      this.getEditStudentsLists(this.classId)
      this.getEditGrade();

      
    },
    watch:{
      $route () {
        // 判断是否是空对象
        function isEmptyObject(obj) {
          for (var key in obj) {
            return false;
          }
          return true;
        };

         console.log( this.$route.query )

        // 是否获取到对应参数
        if( !isEmptyObject(this.$route.query) ){

          this.gradeId = this.$route.query.gradeId;
          this.classId = this.$route.query.classId;

          this.getSutdentClassLists(this.classId,this.currentPage)

          this.getEditStudentsLists(this.classId)

        }else{
          return false
        }


      }
    },
    computed:{
      // 年级池筛选
      studentGradeListsDataFilter:function(){
        return this.studentGradeListsData.filter(item => item.name.indexOf(this.gradesSearchText) != '-1' || item.className.indexOf(this.gradesSearchText) != '-1' || item.sid.indexOf(this.gradesSearchText) != '-1' )
      },
      // 班级筛选
      editStudentsListsDataFilter:function(){
        return this.editStudentsListsData.filter(item => item.name.indexOf(this.classesSearchText) != '-1' || item.className.indexOf(this.classesSearchText) != '-1' || item.sid.indexOf(this.classesSearchText) != '-1' )
      }
    },
    methods:{
      // 获取角色信息
      getUserInfo(){

        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));

        this.schoolId = this.userInfo.schools.schoolId;



        this.gradeId = this.$route.query.gradeId;
        this.classId = this.$route.query.classId;

        /*console.log(this.$route.query)
        console.log(this.gradeId)
        console.log(this.classId)*/

      },
      // 获取当前老师下的学生列表
      getSutdentClassLists(classId,currentPage){

        this.fullscreenLoading=true;
        let params={
            schoolId: this.schoolId,
            classIndex: classId,
            pageSize:10,
            pageNumber:currentPage

          };
          this.$ajax('/findStudentByClassIdAndSchoolId',params)

          .then(res => {
              if(res.code ==200){

                // console.log(res)

                this.studentListsData=res.data.resultList;


                this.total = res.data.total;

                this.fullscreenLoading=false;

              }else{
                this.$message.error(res.message);
              }


          }).catch((res) => {

            this.$message.error(res.message);

          });

      },
      // 获取点击当前行信息
      getCurrentRowInfo(row, column, cell, event){
        // console.log(row)
        this.currentRowInfo = row;
      },
      // 设置学生状态
      changeStudensState(command){

          // console.log(this.currentRowInfo)
          // console.log(command)
          let params={
            id: this.currentRowInfo.id,
            state: command
          };

          this.$ajax('/changeStudentState',params).then((res) => {

            if(res.code == 200){

              this.$message({
                message: '状态修改成功',
                type: 'success'
              });

              this.getSutdentClassLists(this.classId,this.currentPage)
            }else{
              this.$message.error(res.message);
            }
        }).catch((res) => {
          this.$message.error(res.message);

        });
      },
      // 重置密码
      studentRestPwd(index,row){
        this.$confirm('是否确定重置密码?', '提示', {
          type: 'warning',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {

          let params = {
            id: row.id
          };

          this.$ajax('/password/reset',params).then((res) => {

            if(res.code == 200){
              this.$alert(res.message, '新密码', {
                confirmButtonText: '确定',

              });

            }else{
              this.$message.error(res.message);
            }

          });
        }).catch((res) => {
          this.$message.error(res.message);
        });
      },
      // 删除单个学生
      studentDelete(index,row){
        this.$confirm('确定要删除选中学生吗?', '提示', {
          type: 'warning',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {

          let params = {
            id: row.id
          };

          this.$ajax('/teacher/delOneStudent',params).then((res) => {
            if(res.code == 200){
              this.$message({
                message: '删除成功',
                type: 'success'
              });

              this.getSutdentClassLists(this.classId,this.currentPage)

            }else{
              this.$message.error(res.message);
            }

          }).catch((res) => {
              this.$message.error(res.message);
          });

        }).catch((res) => {

        });
      },
      //获取列表选中列
      listenStudentsSelectionChange(val) {

        this.listenStudentsMultipleSelection = val;


      },
      // 批量删除机当前学生
      batchDeleteStudents(){
        var studentsIds = this.listenStudentsMultipleSelection.map(item => item.id).toString();
        // if(studentsIds>0){
          this.$confirm('确定要删除选中学生吗?', '提示', {
            type: 'warning',
            confirmButtonText: '删除',
            cancelButtonText: '取消',
          }).then(() => {

            let params = {
              ids: studentsIds
            };

            this.$ajax('/teacher/deleteManyStudent',params).then((res) => {
              if(res.code == 200){
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.getSutdentClassLists(this.classId,this.currentPage);
              }else{
                this.$message.error(res.message);
              }
            }).catch((res) => {
              this.$message.error(res.message);
            });

          }).catch((res) => {

          });
        /*}else{

          this.$alert('请选择学生', '提示', {
            confirmButtonText: '确定',
          });

          return false;
        }*/


      },
      // 管理分班弹窗
      manageClass(){

        this.saveStudensState=true;

        this.dialogVisible=true;


      },
      // 班级列表分页
      paginationCurrentChange(val){
        // console.log(val)
        this.fullscreenLoading=true;

        this.currentPage = val;

        let params={
            schoolId: this.schoolId,
            classIndex: this.classId,
            pageSize:10,
            pageNumber:this.currentPage
          };
          this.$ajax('/findStudentByClassIdAndSchoolId',params)

          .then(res => {
            if(res.code ==200){
              this.studentListsData=res.data.resultList;

              this.fullscreenLoading=false;
            }else{
              this.$message.error(res.message);
            }


          }).catch((res) => {
            this.$message.error(res.message);

          });
      },
      // 获取所要编辑年级列表
      getEditGrade(){

        let params={
          schoolId:this.schoolId
        };
        this.$ajax('/headteacher/findGradeByCurrentUser',params)

        .then(res => {
            if (res.code == 200) {
              if(res.data.length ==0){
                return false
              }else{

                this.editGrades=res.data;

                this.gradeName = this.editGrades.filter(item => item.index == this.gradeId)[0].serial;
                
                this.getSutdentGradeLists(this.gradeName)
              }
              





            }else{
              this.$message.error(res.message);
            }




        }).catch((res) => {
          this.$message.error(res.message);
        });
      },

      // 获取当前年级池学生列表
      getSutdentGradeLists(gradeId){

        let params={
            schoolId: this.schoolId,
            gradeCode: gradeId,
            pageSize:10,
            currentPage:1
          };
          this.$ajax('/headteacher/findGradePoolByConditionAndPage',params)

          .then(res => {
            if(res.code == 200){

              this.studentGradeListsData=res.data.rows;
              this.gradesTotal=res.data.totalCount;
            }else{
              this.$message.error(res.message);
            }

              // this.gradeName = this.grades[0].name

          }).catch((res) => {
            this.$message.error(res.message);

          });

      },

      // 获取要编辑年级的学生列表 班级id获取学生列表

      getEditStudentsLists(classId){
        let params={
            // classId: this.classId,
            classId: classId,
          };
          this.$ajax('/headteacher/findStudentByClassId',params)

          .then(res => {
            if(res.code == 200){

              this.editStudentsListsData=res.data;
            }else{
              this.$message.error(res.message);
            }

              // console.log(this.editStudentsListsData)

          }).catch((res) => {
            this.$message.error(res.message);

          });
      },
      // 班级搜索
      classesSearch(val){

        if(val != ''){
          let params={
              classId: this.classId,
              // classId: this.className,
              keyWord: val
            };
            this.$ajax('/headteacher/findStudentByClassId',params)

            .then(res => {
              if(res.code == 200){
                this.editStudentsListsData=res.data;
                this.classesSearchText='';
              }else{
                this.$message.error(res.message);
              }


            }).catch((res) => {
              this.$message.error(res.message);

            });

        }else{
          return false
        }

      },
      // 选择添加学生改变时
      studentsSelectionChange(val){

        this.addMultipleSelection=val;

        if(this.addMultipleSelection.length > 0){
          this.addStudensState=false;
          this.saveStudensState=true;
        }
        if(this.addMultipleSelection == 0){
          this.addStudensState=true;
        }

        localStorage.setItem("addStudents", JSON.stringify(this.addMultipleSelection));


      },
      // 添加到缓存列表
      addStudent(){

        let addStudentsItem = JSON.parse(localStorage.getItem("addStudents"));

        if(addStudentsItem.length !=0 ){

          
            this.editStudentsListsData=_.concat(addStudentsItem,this.editStudentsListsData,)


            this.studentGradeListsData = _.differenceWith(this.studentGradeListsData , addStudentsItem , _.isEqual )
            this.gradesSearchText='';
            this.addStudensState=true;

            this.saveStudensState=false;



        }else{
          return false

        }


      },

      // 选择移除学生改变时
      removeStudentsSelectionChange(val){

        this.RemoveMultipleSelection=val;

        if( val.length == 0){

          this.removeStudensState=true;

        }

        // console.log(this.RemoveMultipleSelection)

        if(this.RemoveMultipleSelection.length > 0){

          this.removeStudensState=false;

          this.saveStudensState=true;

        }




        localStorage.setItem("removeStudents", JSON.stringify(this.RemoveMultipleSelection));

      },
      // 添加学生全选，反选
      addStudentsSelectionAll(){

        this.addStudensState= !!this.addStudensState;
        this.saveStudensState= !this.addStudensState;

      },
      // 移除学生全选，反选
      removeStudentsSelectionAll(){
        this.removeStudensState= !!this.removeStudensState;
        this.saveStudensState= !this.removeStudensState;
      },

      // 移除学生
      removeStudent(){


        let removeStudentsItem = JSON.parse(localStorage.getItem("removeStudents"));

        if(removeStudentsItem.length > 0 ){

          this.editGradeCodeId = this.editGrades.filter(item => item.index == this.gradeId)[0].code;




            this.studentGradeListsData=_.uniq(_.concat(removeStudentsItem,this.studentGradeListsData));

            this.editStudentsListsData = _.differenceWith(this.editStudentsListsData , removeStudentsItem , _.isEqual );
            this.classesSearchText='';
            this.removeStudensState=true;
            this.saveStudensState=false;

        }else{

          return false

        }

      },
      // 保存编辑学生数据
      saveStudents(){

        var sids= this.editStudentsListsData.map(item => item.sid).toString();

        /*console.log(sids)
        console.log(this.editCurrentClassId)
        console.log(this.editClassId)*/


        let params={

            classId: this.classId,
            sids:sids
          };
          this.$ajax('/headteacher/saveUpgradeStudent',params)

          .then(res => {

            if(res.code == 200){

              this.$message({
                message: '保存成功',
                type: 'success'
              });

              localStorage.removeItem("addStudents");
              localStorage.removeItem("removeStudents");

              this.dialogVisible = false;
              this.getSutdentClassLists(this.classId,this.currentPage)



            }else{
              this.$message.error(res.message);
            }



          }).catch((res) => {
            this.$message.error(res.message);
          });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.teacherMyClass{
  padding: 20px;
}
.teacherMyClass .myClassMgt-header{
  padding-bottom: 20px;

}
.teacherMyClass .myClassMgt-header .del-btn{
  float: right;
}
.teacherMyClass .myClassMgt-body-table .cell{
  text-align: center;
  white-space: nowrap;
}

.teacherMyClass .el-button a{
  color: #fff;
}
.teacherMyClass .pagination{
  margin-top: 20px;
  text-align: right;
}
.teacherMyClass  .transfer-data {
  display:flex;
  /* margin-top: 10px; */
}
.teacherMyClass  .transfer-data .el-table__body-wrapper{
  height: 300px;
  overflow-x: hidden;
}

.teacherMyClass.el-dialog__wrapper .transfer-data .transfer-data-left{
  width: 366px;
}
.teacherMyClass.el-dialog__wrapper .transfer-data .transfer-data-right{
  width: 250px;
}

.teacherMyClass  .transfer-data-header .el-select{
  display: inline-block;
  width: 120px;
}
.transfer-data-header .el-input{
  margin-top: 10px;
}

.teacherMyClass  .transfer-data-operation{
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.teacherMyClass .transfer-data-operation .el-button{
  margin: 10px 0;
  background: #fff;
  border: 1px solid #0d9ee9;
}
.teacherMyClass .transfer-data-operation .el-button [class^=el-icon-arrow]{
  color: #0d9ee9;
}
.teacherMyClass .transfer-data-operation .el-button.is-disabled [class^=el-icon-arrow]{
  color: #bfcbd9;
}
.teacherMyClass .transfer-data-operation .el-button.is-disabled,
.teacherMyClass .transfer-data-operation .el-button.is-disabled:focus,
.teacherMyClass .transfer-data-operation .el-button.is-disabled:hover{
  background-image: none;
  background-color: #eef1f6;
  border-color: #d1dbe5;
}

.teacherMyClass  .transfer-data-body{
  margin-top: 10px;
}
.teacherMyClass  .el-table__empty-block{
  overflow: hidden;
}
.teacherMyClass  .el-table__empty-text {
  white-space: nowrap;
}

.teacherMyClass .cell {
  text-align: center;
  white-space: nowrap;
}

.teacherMyClass .cell b{
  font-weight: normal;
}
.teacherMyClass .cell .el-button{
  color: #20a0ff;
  background: none;
  border: none;
  text-decoration: underline;
}
.teacherMyClass .myClassMgt-body-table .el-button a{
  color: #20a0ff;
}
.teacherMyClass.el-dialog__wrapper .el-dialog__body{
  padding-top: 20px;
}
.teacherMyClass.el-dialog__wrapper .el-dialog.el-dialog--small{
  width: 730px;
}

.teacherMyClass.el-dialog__wrapper .el-dialog .el-dialog__header{
  display: none;
}

.teacherMyClass .el-dialog__wrapper .el-dialog__header{
  /* display: none; */
}
.teacherMyClass .transfer-data-header .title{
  font-size: 14px;
  border-left:3px solid #0d9ee9;
  color: #0d9ee9;
  padding-left: 10px;

}
.teacherMyClass .transfer-data-header .el-select{
  display: inline-block;
  width: 120px;
}
.teacherMyClass .el-dialog__wrapper .el-dialog__body{
  padding-top: 20px;
}
.teacherMyClass .myClassMgt-body-table .cell .el-button.el-button--danger{
  color: #ff5353;
}

.teacherMyClass .el-dialog.el-dialog--small{
  width: 700px;
}
.teacherMyClass .el-input-group__append{
  border-radius: 0px;
  border: 1px solid #e6e6e6;
  border-left: 0;
}
.teacherMyClass .noData{
  background: url("../../../resources/front/imgs/nodata.png") no-repeat center;
  margin-top: 100px;
  height: 233px;
  margin-bottom: 40px;
  position: relative;
}

.teacherMyClass .noData .empty-text{
  position: absolute;
  left: 50%;
  transform: translate(-50%,0);
  bottom:-40px;
  font-size: 14px;
  color: #b6b6b6;
}
</style>
