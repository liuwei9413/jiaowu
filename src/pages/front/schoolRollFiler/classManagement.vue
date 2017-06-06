<template>
  <div id="classManagement">
    <div class="school-year">
      <i class="school-year-icon"></i>
      <span class="school-year-text">{{ schoolYear }}学年</span>
    </div>
    <div class="clearfix" v-loading="listLoading">
      <div class="grade-box" v-for="gradeItem in gradeList" :key="gradeItem.index">
        <div class="grade-btn btn">{{ gradeItem.name }}</div>
        <div class="class-box" v-for="classItem in gradeItem.classList">
          <div class="class-btn btn">{{ classItem.name }}</div>
          <div class="class-edit-box">
            <el-tooltip class="item" effect="dark" :content="classItem.teacherName" placement="top-start" :disabled="classItem.teacherName.length <= 7">
              <div class="edit-btn" style="overflow: hidden; text-overflow: ellipsis;">班主任：{{ classItem.teacherName }}</div>
            </el-tooltip>
            <div class="edit-btn" @click="editFormDialog(classItem, gradeItem.index)">
              <i class="el-icon-edit"></i>
              <span>编辑</span>
            </div>
            <div class="edit-btn" @click="deleteDialog(classItem)">
              <i class="el-icon-delete2"></i>
              <span>删除</span>
            </div>
          </div>
        </div>
        <div class="addclass-btn btn">
          <el-button @click="addFormDialog(gradeItem.index)" type="primary" size="mini" icon="plus">新增班</el-button>
        </div>
      </div>
    </div>
    <!--新增界面-->
    <el-dialog v-model="addFormVisible" title="新增班级" size="small" :close-on-click-modal="false" class="form-dialog">
      <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="120px" class="addForm">
        <el-form-item label="班级名称：" prop="name">
          <el-input v-model="addForm.name" placeholder="格式：一班，1班，一，1"></el-input>
        </el-form-item>
        <el-form-item label="选择班主任：" prop="teacherIdOld">
          <el-select v-model="addForm.teacherIdOld" filterable placeholder="请选择">
            <el-option
              v-for="item in teacherList" :key="item.id"
              :label="item.name + ' ' + item.phone"
              :value="item.id + ''">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑界面-->
    <el-dialog v-model="editFormVisible" title="编辑班级" size="small" :close-on-click-modal="false" class="form-dialog">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="120px" class="editForm">
        <el-form-item label="班级名称" prop="name" placeholder="格式：一班，1班，一，1">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="选择班主任" prop="teacherIdNow">
          <el-select v-model="editForm.teacherIdNow" filterable placeholder="请选择">
            <el-option
              v-for="item in teacherList" :key="item.id"
              :label="item.name + ' ' + item.phone"
              :value="item.id + ''">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'classManagement',
    data () {
      return {
        schoolId: JSON.parse(localStorage.userInfo).schools.schoolId, //学校id
        schoolYear: '2017-2018',
        gradeList: [],  //年级列表
        listLoading: false, //加载列表loading图
        teacherList: [],  //教师列表
        gradeIndex: '', //当前年级id
        classIndex: '', //当前班级id
        classTeacherId: '', //当前班级班主任id
        addFormVisible: false, //新增界面是否显示
        addLoading: false,
        //新增界面数据
        addForm: {
          name: '',
          teacherIdOld: ''
        },
        addFormRules: {
          name: [
            {required: true, message: '请输入班级名称', trigger: 'blur'},
            {min: 1, max: 4, message: '班级最多可输入4个字', trigger: 'blur'}
          ],
          teacherIdOld: [
            {required: true, message: '请选择班主任', trigger: 'blur'}
          ]
        },
        editFormVisible: false, //编辑界面是否显示
        editLoading: false,
        //编辑界面数据
        editForm: {
          name: '',
          teacherIdNow: '',
          teacherIdOld: ''
        },
        editFormRules: {
          name: [
            {required: true, message: '请输入班级名称', trigger: 'blur'},
            {min: 1, max: 4, message: '班级最多可输入4个字', trigger: 'blur'}
          ],
          teacherIdNow: [
            {required: true, message: '请选择班主任', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      //获取年级列表
      getGradeList(params) {
        var _this = this;
        this.listLoading = true;
          this.$ajax('teacher/getGradeList', params).then( res => {
            this.listLoading = false;
            if ( res.code === '200' ) {
              _this.gradeList = res.data;
            } else {
              _this.$alert(res.message, '提示', {
                confirmButtonText: '确定',
                callback: () => {
                }
              });
            }
        } );
      },
      //新增班弹框
      addFormDialog(gradeIndex) {
        var _this = this;
        var params = Object.assign({}, {schoolId: this.schoolId});
        this.gradeIndex = gradeIndex;
        this.$ajax('teacher/schoolAllTeacher', params).then( res => {
          if ( res.code === '200' ) {
            if ( res.data.length > 0 ) {
              _this.teacherList = res.data;
              _this.addFormVisible = true;
            } else {
              this.$confirm('教师列表为空，请前往教师管理界面维护教师信息', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(function() {
                alert('跳转到教师管理界面！');
              }).catch(function() {
              })
            }
          } else {
            _this.$message({
              message: res.message,
              type: 'warning'
            });
          }
        } );
      },
      //新增
      addSubmit() {
        var _this = this;
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            _this.addLoading = true;
            var params = Object.assign({}, _this.addForm, { schoolId: _this.schoolId, gradeIndex: _this.gradeIndex, teacherIdNow: _this.addForm.teacherIdOld});
            _this.$ajax('teacher/saveClassOne', params).then( (res) => {
              _this.addLoading = false;
              if ( res.code === '200' ) {
                _this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                _this.$refs['addForm'].resetFields();
                _this.addFormVisible = false;
                _this.getGradeList({schoolId: _this.schoolId});
              } else {
                _this.$message({
                  message: res.message,
                  type: 'warning'
                });
              }
            } );
          }
        });
      },
      //编辑班级弹框
      editFormDialog(classItem, gradeIndex) {
        var _this = this;
        this.classIndex = classItem.index;
        this.gradeIndex = gradeIndex;
        this.classTeacherId = classItem.teacherIdOld;
        var params = Object.assign({}, {teacherId: this.classTeacherId, classIndex: this.classIndex, schoolId: this.schoolId});
        this.editForm.name = classItem.name;
        this.$ajax('teacher/showClassTeacher', params).then( res => {
          if ( res.code === '200' ) {
            _this.editFormVisible = true;
            _this.teacherList = res.data;
            res.data.forEach((item, index) => {
              if ( item.baDing ) {
                _this.editForm.teacherIdNow = _this.editForm.teacherIdOld = item.id + '';
              }
            });
          } else {
            _this.$message({
              message: res.message,
              type: 'warning'
            });
          }
        } );
      },
      //编辑提交
      editSubmit() {
        var _this = this;
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            _this.editLoading = true;
            var params = Object.assign({}, _this.editForm, { schoolId: _this.schoolId, index: _this.classIndex, gradeIndex: this.gradeIndex});
            _this.$ajax('schadmin/updateOne', params).then( (res) => {
              _this.editLoading = false;
              _this.editFormVisible = false;
              if ( res.code === '200' ) {
                _this.$message({
                  message: res.message,
                  type: 'success'
                });
                _this.editFormVisible = false;
                _this.getGradeList({schoolId: _this.schoolId});
              } else {
                var message = res.message || '未知错误';
                _this.$message({
                  message: message,
                  type: 'warning'
                });
              }
            });
          }
        });
      },
      //删除弹框
      deleteDialog(classItem) {
        console.log(classItem);
        this.classTeacherId = classItem.teacherIdOld;
        this.classIndex = classItem.index;
        var params = Object.assign({}, {classIndex: this.classIndex});
        var _this = this;
        this.$ajax('schadmin/deleteQuery', params).then( res => {
          if ( res.code === '200' ) {
            //班级下无学生，可删除
            _this.$confirm(res.message, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(function() {
              _this.deleteOne();
            }).catch(function() {
              console.log('取消')
            })
          } else {
            //班级下有学生，无法删除
            _this.$alert(res.message, '提示', {
              confirmButtonText: '确定',
              callback: () => {
//                alert('跳转到学生页面删除学生，或者什么都不做');
              }
            });
          }
        } );
      },
      //删除
      deleteOne() {
        var _this = this;
        var params = Object.assign({}, {classIndex: this.classIndex, classTeacherId: this.classTeacherId});
        this.$ajax('schadmin/deleteOne', params).then(function(res) {
          if ( res.code === '200' ) {
            _this.$message({
              message: res.message,
              type: 'success'
            });
            _this.getGradeList({schoolId: _this.schoolId});
          } else {
            var message = res.message || '未知错误';
            _this.$message({
              message: message,
              type: 'warning'
            });
          }
        }, function(err) {})
      },
      //获取当前学年
      getYear() {
        this.$ajax('schadmin/findNowSchoolYear').then((res) => {
          if ( res.code === '200' ) {
            this.schoolYear = res.data;
          } else {
            var message = res.message || '未知错误';
            this.$message({
              message: message,
              type: 'error'
            });
          }
        }, (err) => {});
      }
    },
    beforeMount() {
      this.getGradeList({schoolId: this.schoolId});
      this.getYear();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #classManagement { padding: 20px; min-height: 600px;}
  #classManagement .white-color { color: #fff;}
  #classManagement .school-year { margin-bottom: 20px; padding-bottom: 18px; border-bottom: 1px solid #ecedef;}
  #classManagement .school-year-icon { display: inline-block; width: 3px; height: 14px; background: #0e9deb; vertical-align: middle;}
  #classManagement .school-year-text { display: inline-block; font-size: 14px; color: #0d9ee9; font-family: "宋体"; vertical-align: middle;}
  #classManagement .grade-box { float: left; margin-right: 7px;}
  #classManagement .grade-box:nth-of-type(2n+1) { background-color: #f9f9f9;}
  #classManagement .class-box { position: relative;}
  #classManagement .btn { width: 100px; height: 38px; line-height: 38px; text-align: center;}
  #classManagement .grade-btn { border: 1px solid #a9dbfc; color: #0478c1; background: #effaff;}
  #classManagement .class-btn { font-size: 14px; color: #333; border: 1px solid #e1e1e1; border-top: none;}
  /*#classManagement .class-btn:hover { background-color: #0d9ee9; color: #fff;}*/
  #classManagement .class-box:hover .class-btn { background-color: #0d9ee9; color: #fff;}
  #classManagement .addclass-btn { border: 1px solid #e1e1e1; border-top: none; height: 24px; line-height: 1; padding: 7px 0;}
  #classManagement .addclass-btn .el-button { border-radius: 1px; background-color: #24c178; border-color: #24c178; padding: 5px 8px;}
  #classManagement .addclass-btn .el-button:hover { background-color: #43ca8b; border-color: #43ca8b;}
  #classManagement .addclass-btn .el-button:active { background-color: #1fa667; border-color: #1fa667;}
  #classManagement .class-edit-box { position: absolute; left: 92px; top:3px; z-index: 100; padding-left: 7px; padding-right: 1px; width: 152px; height: 110px; background: url("../../../resources/front/imgs/class/border.png") no-repeat center; overflow: hidden; display: none;}
  #classManagement .grade-box:nth-of-type(10) .class-edit-box { left: -159px; padding-left: 1px; padding-right: 7px; background-image: url("../../../resources/front/imgs/class/border2.png");}
  #classManagement .class-box:hover .class-edit-box { display: block;}
  #classManagement .edit-btn { padding-left: 14px; height: 35px; line-height: 35px; font-size: 12px; color: #666; cursor: pointer; border-bottom: 1px dotted #e3e3e3; overflow: hidden;}
  #classManagement .edit-btn:nth-of-type(1) { border-radius: 4px 4px 0 0;}
  #classManagement .edit-btn:nth-of-type(3) { border-radius: 0 0 4px 4px;}
  #classManagement .edit-btn:hover { background-color: #0d9ee9; color: #fff; border: 1px solid #0d9ee9;}
  #classManagement .edit-btn:last-child { border-bottom: none;}
  #classManagement .form-dialog .el-dialog{ max-width: 390px;}
  #classManagement .form-dialog .el-dialog__body { padding: 30px 33px 30px 20px;}
</style>
