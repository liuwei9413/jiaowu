<template>
  <div id="leaderManagement">
    <div class="btns">
      <router-link :to="{ path: '/leaderManagement/addSchoolleader' }" class="white-color add-btn el-button el-button--primary">
        <i class="icon-new"></i>
        <span>新建校领导</span>
      </router-link>
      <router-link :to="{ path: '/leaderManagement/schoolRollleaderbatch' }" class="white-color el-button el-button--primary">
        <i class="icon-leading-in"></i>
        <span>批量导入</span>
      </router-link>
      <a class="white-color el-button el-button--primary" v-bind:href="staticResources+'schadmin/export/account/headmaster?schoolId='+params.schoolId" target="downloadFrame" hidefocus="hidefocus">
        <i class="icon-download"></i>
        <span>下载账号</span>
      </a>
      <el-button @click="deleteAllDialog" type="primary" :disabled="this.multipleSelection.length===0" icon="delete2" style="float: right;" class="del-btn">批量删除</el-button>
    </div>
    <div class="search">
      <el-form ref="searchInfo" :model="searchParams" :rules="searchRules" :label-position="'left'">
        <el-row :gutter="15">
          <el-col :span="7">
            <el-input placeholder="姓名模糊筛选" v-model="searchParams.name" class="search-input-text">
              <template slot="prepend">
                <i class="icon-name iconbtn"></i>
                <span>姓名</span>
              </template>
            </el-input>
          </el-col>
          <el-col :span="7">
            <el-form-item prop="phone">
              <el-input placeholder="手机号码筛选" v-model="searchParams.phone" class="search-input-text">
                <template slot="prepend">
                  <i class="icon-phone-number iconbtn"></i>
                  <span>手机</span>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" class="el-col-select">
            <el-input>
              <template slot="prepend">
                <i class="icon-title iconbtn"></i>
                <span>职称</span>
              </template>
              <el-select v-model="searchParams.jobTitle" clearable slot="append" placeholder="请选择">
                <!--<el-option label="请选择" value=""></el-option>-->
                <el-option label="正高级" value="正高级"></el-option>
                <el-option label="高级" value="高级"></el-option>
                <el-option label="一级" value="一级"></el-option>
                <el-option label="二级" value="二级"></el-option>
                <el-option label="三级" value="三级"></el-option>
                <el-option label="无" value="无"></el-option>
              </el-select>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" icon="search" @click="search">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div class="search-bg"></div>
    </div>
    <div v-if="!tableDataIsNull" v-loading="listLoading">
      <div class="teacher-table tables">
        <el-table
          :data="tableData"
          border
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
            width="90"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="sexStr"
            label="性别"
            align="center">
          </el-table-column>
          <el-table-column
            prop="national"
            label="民族"
            align="center"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号码"
            align="center"
            width="130">
          </el-table-column>
          <el-table-column
            prop="teacherEducation"
            label="第一学历"
            align="center"
            width="130">
          </el-table-column>
          <el-table-column
            prop="jobTitle"
            label="职称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="teacherSubject"
            label="任教学科"
            align="center"
            width="140"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="状态"
            align="center">
            <template scope="props">
              <el-dropdown
                @command="setState"
                trigger="click"
                menu-align="start">
                <span class="el-dropdown-link" style="cursor: pointer;">
                  <span v-if="props.row.state === 1">禁用</span>
                  <span v-if="props.row.state === 0">正常</span>
                  <i class="el-icon-caret-bottom el-icon--right" style="color: #d7d7d7;"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="props.row.id + '-1'" v-if="props.row.state !== 1">禁用</el-dropdown-item>
                  <el-dropdown-item :command="props.row.id + '-0'" v-if="props.row.state !== 0">正常</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
            width="200">
            <template scope="props">
              <router-link :to="{ path: '/leaderManagement/editSchoolleader/detail/'+props.row.id }" class="link-text">查看</router-link>
              <router-link :to="{ path: '/leaderManagement/editSchoolleader/edit/'+props.row.id }" class="link-text">编辑</router-link>
              <el-button @click="resetPasswordDialog(props.row.phone)" type="text" size="small" style=" text-decoration: underline;">重置密码</el-button>
              <el-button @click="deleteOneDialog(props.row.id)" type="text" size="small" style="color: #ff5353; text-decoration: underline;">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="teacher-pagination pagination-box mb40" v-show="tableDataTotal != 0">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="params.pageNumber"
          :page-size="params.pageSize"
          layout="prev, pager, next, jumper"
          :total="tableDataTotal">
        </el-pagination>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="teacher-nodata" v-if="tableDataIsNull">
      <p class="text">请导入教师信息！</p>
    </div>
    <div class="first-login-notice" v-if="firstLogin">
      <div class="teacher-batch-notice" :style="noticeStyle"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'leaderManagement',
    data () {
      return {
        params: {
          pageNumber: 1,
          pageSize: 10,
          isSchoolHeader: 1,
          schoolId: JSON.parse(localStorage.userInfo).schools.schoolId,  //11000026
          name: '',
          phone: '',
          jobTitle: '',
        },
        searchParams: {
          name: '',
          phone: '',
          jobTitle: '',
        },
        searchParams2: {},
        searchIsOk: false,
        searchRules: {
          phone: [
            { pattern: /^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/,message: '请输入正确的电话号码', trigger: 'blur'},
          ]
        },
        firstLogin: !localStorage.leaderManagementFirstLogin && JSON.parse(localStorage.userInfo).firstLogin, //用户是否第一次进入页面
        noticeStyle: {},  //引导框
        listLoading: false, //加载列表loading图
        tableDataIsNull: false, //数据库无校领导
        isFirstReqList: true,  //第一次加载列表
        isPageLoad: true,  //页码变动是否执行分页切换
        isSearch: false,  //是否为检索
        tableData: [],  //列表集合
        tableDataTotal: 0,  //总数
        teacherId: 0, //当前校领导id
        teacherPhone: '', //当前校领导手机号
        multipleSelection: [],  //多选集合
        multipleSelectionStr: '', //多选集合转字符串
        state: '', //用户账号状态
      }
    },
    watch: {
      searchParams: {
        handler: function (after, before) {
          var _this = this;
          this.searchIsOk = Object.keys(after).some( function( prop ) {
            return after[prop] !== _this.searchParams2[prop];
          });
          this.setValue();
        },
        deep: true
      }
    },
    methods:{
      //获取列表
      getList(params){
        var _this = this;
        this.listLoading = true;
        this.$ajax('schadmin/findTeacher', params).then(function(res) {
          _this.listLoading = false;
          _this.searchIsOk = false;
          if ( res.code === '200' ) {
            _this.tableData = res.data.resultList;
            _this.tableDataTotal = res.data.total;
            if ( _this.isFirstReqList && res.data.total === 0 ) {
              _this.tableDataIsNull = true;
            }
            _this.isFirstReqList = false;
          } else {
            _this.$alert(res.message, '提示', {
              confirmButtonText: '确定',
              callback: () => {
              }
            });
          }
        }, function(err) {})
      },
      //搜索
      search() {
        if ( !this.searchIsOk ) return;
        this.$refs.searchInfo.validate((valid) => {
          if (valid) {
            this.isSearch = this.params.pageNumber !== 1;
            this.params.pageNumber = 1;
            Object.assign(this.params, this.searchParams);
            this.getList(this.params);
          }
        });
      },
      //多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.multipleSelectionStr = '';
        if ( val.length > 0 ) {
          for ( var i=0; i<val.length; i++ ) {
            this.multipleSelectionStr += val[i].id + ',';
          }
          this.multipleSelectionStr = this.multipleSelectionStr.substring(0, this.multipleSelectionStr.length-1);
        }
      },
      //删除数据后计算正确页码
      setPageNumber(count) {
        let nowPageNumber;
        nowPageNumber = Math.ceil(( this.tableDataTotal - count ) / 10);
        nowPageNumber = nowPageNumber < 1 ? 1 : nowPageNumber;
        nowPageNumber = nowPageNumber < this.params.pageNumber ? nowPageNumber : this.params.pageNumber;
//        console.log('this.tableDataTotal:'+this.tableDataTotal+'count:'+count+'page:'+nowPageNumber+'this.params.pageNumber:'+this.params.pageNumber);
        return nowPageNumber;
      },
      //重置密码确认框
      resetPasswordDialog(phone) {
        var _this = this;
        this.$confirm('是否要重置密码？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          _this.teacherPhone = phone;
          _this.resetPassword();
        }).catch(function() {
        })
      },
      //重置密码
      resetPassword() {
        var _this = this;
        var params = {phone: this.teacherPhone};
        this.$ajax('password/reset', params).then(function(res) {
          if ( res.code === '200' ) {
            _this.$alert(res.message, '提示', {
              confirmButtonText: '确定',
              callback: () => {
                _this.getList(_this.params);
              }
            });
          } else {
            _this.$alert(res.message, '提示', {
              confirmButtonText: '确定',
              callback: () => {
              }
            });
          }
        }, function(err) {})
      },
      //删除单个教师确认框
      deleteOneDialog(id) {
        var _this = this;
        this.$confirm('确定要删除选中教师吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          _this.teacherId = id;
          _this.deleteOne();
        }).catch(function() {
        })
      },
      //删除
      deleteOne() {
        var _this = this;
        var params = Object.assign({}, {teacherId: this.teacherId, schoolId: this.params.schoolId});
        this.$ajax('headMaster/deleteHeader', params).then(function(res) {
          if ( res.code === '200' ) {
            _this.$message({
              message: res.message,
              type: 'success'
            });
            var nowPageNumber = _this.setPageNumber(1);
            _this.isPageLoad = (_this.params.pageNumber === nowPageNumber);
            _this.params.pageNumber = nowPageNumber;
            _this.getList(_this.params);
          } else {
            _this.$alert(res.message, '提示', {
              confirmButtonText: '确定',
              callback: () => {
                _this.getList(_this.params);
              }
            });
          }
        }, function(err) {})
      },
      //批量删除教师确认框
      deleteAllDialog() {
        var _this = this;
        this.$confirm('确定要删除选中教师吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          _this.deleteAll();
        }).catch(function() {
        })
      },
      //批量删除
      deleteAll() {
        var _this = this;
        var count = this.multipleSelection.length;
//        console.log(' count:'+count);
        var params = {ids: this.multipleSelectionStr.toString(), schoolId: this.params.schoolId};
        this.$ajax('headMaster/batchDeleteHeader', params).then(function(res) {
          if ( res.code === '200' ) {
            _this.$message({
              message: res.message,
              type: 'success'
            });
            _this.multipleSelection = [];
            _this.multipleSelectionStr = '';
            var nowPageNumber = _this.setPageNumber(count);
            _this.isPageLoad = (_this.params.pageNumber === nowPageNumber);
            _this.params.pageNumber = nowPageNumber;
            _this.getList(_this.params);
          } else {
            _this.$alert(res.message, '提示', {
              confirmButtonText: '确定',
              callback: () => {
                _this.getList(_this.params);
              }
            });
          }
        }, function(err) {})
      },
      //设置状态
      setState(command) {
        var _this = this;
        var params = Object.assign({}, {id: command.split('-')[0], state: command.split('-')[1]});
        this.$ajax('schadmin/changeState', params).then(function(res) {
          if ( res.code === '200' ) {
            _this.$message({
              message: res.message,
              type: 'success'
            });
            _this.getList(_this.params);
          } else {
            _this.$message({
              message: res.message,
              type: 'warning'
            });
          }
        }, function(err) {})
      },
      //跳页
      handleCurrentChange(val) {
        if ( this.isPageLoad && !this.isSearch ) {
          this.params.pageNumber = val;
          this.getList(this.params);
        } else {
          this.isPageLoad = true;
          this.isSearch = false;
        }
      },
      //是否第一次进入页面
      isFirstLogin() {
        const clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        const left = ((clientWidth - 1024)/2 + 20) + 'px';
        this.noticeStyle = {
          left: left
        };
        if ( this.firstLogin ) {
          document.onclick = () => {
            this.firstLogin = false;
            localStorage.leaderManagementFirstLogin = 'NO';
          }
        };
      },
      setValue:function(){
        this.searchParams2=_.cloneDeep(this.searchParams);
      }
    },
    beforeMount(){
      this.getList(this.params);
      this.isFirstLogin();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #leaderManagement { padding: 0 20px 20px; min-height: 400px;}
  #leaderManagement .white-color { color: #fff;}
  #leaderManagement .link-text { color: #20a0ff; text-decoration: underline; font-size: 14px; display: inline-block; margin-right: 6px;}
  #leaderManagement .link-text:hover { color: #4db3ff; font-size: 14px;}
  #leaderManagement .mt20 { margin-top: 20px;}
  #leaderManagement .mt40 { margin-top: 40px;}
  #leaderManagement .mb40 { margin-bottom: 40px;}
  #leaderManagement .btns { border-bottom: 1px solid #ECEDEF; padding-bottom: 15px; padding-top: 15px;}
  #leaderManagement .teacher-nodata { background: url("../../../resources/front/imgs/nodata.png") no-repeat center; text-align: center; padding-top: 100px; height: 233px; position: relative;}
  #leaderManagement .teacher-nodata .text { position: absolute; bottom: 0; width: 100%; text-align: center; font-size: 14px; color: #b6b6b6;}
  #leaderManagement .search { padding: 15px 20px 15px 80px; border: 1px solid #cedaea; border-top:3px solid #0d9ee9; margin-top: 18px; margin-bottom: 16px; position: relative;}
  #leaderManagement .search-bg { position: absolute; left: 12px; top: -11px; z-index: 10; width: 56px; height: 61px; background: url("../../../resources/front/imgs/search-bg.png") no-repeat;}
  #leaderManagement .pagination-box { float: right; margin-top: 20px;}
  #leaderManagement .el-col-select .el-input-group__append { width: 190px; border-left: 1px solid #BFCBD9;}
  #leaderManagement .el-col-select .el-input__inner { padding: 0; text-indent: 12px; border: none;}
  #leaderManagement .search .iconbtn { display: inline-block; height: 18px; line-height: 18px; vertical-align: bottom; color: #a3a3a3;}
  #leaderManagement .search .iconbtn+span { color: #666;}
  #leaderManagement .el-input-group__append,#leaderManagement  .el-input-group__prepend { border-radius: 0;}
  #leaderManagement .search .el-input__inner { border-radius: 0; height: 34px;}
  #leaderManagement .search .search-input-text .el-input__inner{ border: 1px solid #bfcbd9; }
  #leaderManagement .search .search-input-text .el-input__inner:hover{ border-color: #8391a5;}
  #leaderManagement .search .search-input-text .el-input__inner:focus { outline: 0; border-color: #20a0ff; }
  #leaderManagement .first-login-notice { position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 2002; background-color: rgba(0, 0, 0, 0.6);}
  #leaderManagement .teacher-batch-notice { position: fixed; z-index: 2003; left: -1000px; top: 102px; width: 530px; height: 160px; background: url("../../../resources/front/imgs/leader-notice.png") no-repeat center;}
  #leaderManagement .el-form-item { margin-bottom: 0;}
  #leaderManagement .el-form-item__content { line-height: 1;}
</style>
