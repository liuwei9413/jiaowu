<template>
  <div class="siderbar-wrapper">
      <!--横向导航-->
      <div id="sidebar" class="sidebar">
        <!--班主任权限-->
        <el-menu id="sidebarNav" theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" v-if="roleId==1">
        <!--<el-menu-item index="/home">首页</el-menu-item>-->
        <el-menu-item index="/teacherPersonal">个人中心</el-menu-item>
        <el-menu-item index="/teacherMyClass">我的班级</el-menu-item>
        <el-menu-item index="/teacherViewScore">查看成绩</el-menu-item>
          <div class="classSelect" v-if="classInfoShow">
            <span>班级：</span>
            <el-select v-model="value" @change="querySelect(value)" placeholder="请选择">
              <el-option
                v-for="item in classList"
                :key="item.gradeId"
                :label="item.gradeName+'（'+item.className+'）'"
                @click.native="getGradeId(item.gradeId)"
                :value="item.classId">
              </el-option>
            </el-select>
          </div>
      </el-menu>

        <!--学校管理员权限-->
        <el-menu id="sidebarNav" theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"  v-if="roleId==2">
          <!--<el-menu-item index="/home">首页</el-menu-item>-->
          <el-menu-item index="/schoolManagement">学校信息</el-menu-item>
          <el-menu-item index="/classManagement">班级管理</el-menu-item>
          <el-menu-item index="/studentManagement">学生管理</el-menu-item>
          <el-menu-item index="/leaderManagement">校领导管理</el-menu-item>
          <el-menu-item index="/teacherManagement">教师管理</el-menu-item>
          <el-menu-item index="/subjectManagement">科目管理</el-menu-item>
          <el-menu-item index="/scoreManagement">科目成绩管理</el-menu-item>
          <el-menu-item index="/sportManagement">体育成绩管理</el-menu-item>

        </el-menu>


        <!--教育局权限-->
        <el-menu id="sidebarNav" theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" v-if="roleId==4">
          <el-menu-item index="/admin">机构管理</el-menu-item>
          <el-menu-item index="/eduSchoolManagement">学校管理</el-menu-item>
        </el-menu>

        <!--普通教师权限-->
        <el-menu id="sidebarNav" theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" v-if="roleId==8">
          <!--<el-menu-item index="/home">首页</el-menu-item>-->
          <el-menu-item index="/teacherPersonal">个人中心</el-menu-item>
          <el-menu-item index="/teacherViewScore">查看成绩</el-menu-item>
        </el-menu>

        <!--普通校长权限-->
        <el-menu id="sidebarNav" theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" v-if="roleId==16">
          <!--<el-menu-item index="/home">首页</el-menu-item>-->
          <el-menu-item index="/teacherPersonal">个人中心</el-menu-item>
          <el-menu-item index="/teacherViewScore">查看成绩</el-menu-item>
        </el-menu>

        <!--admin权限-->
        <el-menu id="sidebarNav" theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" v-if="roleId==32">
          <!--<el-menu-item index="/home">首页</el-menu-item>-->
          <el-menu-item index="/admin">机构管理</el-menu-item>
        </el-menu>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      return {
        roleId : userInfo.roleId,
        activeIndex: '/home',
        value: '',
        classList: '',
        classId : '',
        gradeId:'',
        orgInfo: '',
        classInfoShow:true,
      };
    },
    mounted() {
      if (localStorage.getItem('userInfo') == '' || localStorage.getItem('userInfo') == null){
        this.$router.push({ path: '/login',  query: ''});
        return;
      };
        let navName ='/'+this.$route.path.split('/')[1];
      if (navName == "/teacherViewScore"){
        this.classInfoShow = false;
      }else {
        this.classInfoShow = true;
      }
      this.activeIndex = navName;
      let params = this.$route.query;
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if(userInfo.roleId == 1){
        this.classId = parseInt(params.classId) || '';
        this.gradeId = parseInt(params.gradeId) || '';
        this.classList = userInfo.headTeacherClassList || '';
        this.classList.forEach( ( item, i ) => {
          if (item.classId == this.classId){
            this.value = item.classId;
          }
        });

//        this.$router.push({ path: navName,  query: {'classId':this.classId,'gradeId':this.gradeId}});
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        if (localStorage.getItem('userInfo') == '' || localStorage.getItem('userInfo') == null){
          this.$router.push({ path: '/login',  query: ''});
          return;
        };
//        console.log(key, keyPath);
        this.activedIndex = key;
        if (key == "/teacherViewScore"){
          this.classInfoShow = false;
        }else {
          this.classInfoShow = true;
        }
        if (this.roleId == 1){
          this.$router.push({ path: key,  query: {'classId':this.classId,'gradeId':this.gradeId}});
        }else {
          this.$router.push({ path: key,  query: ''});
        }
      },
      querySelect(val){
        this.classId = val;
//        this.$router.go(0);
      },
      getGradeId(gradeId){
        this.gradeId = gradeId;
        this.$router.push({ path: this.$route.path,  query: {'classId':this.classId,'gradeId':gradeId}});
      },
      isEmptyObject(obj) {
        for ( var i in obj ) {
          return false;
        }
        return true;
      },
      changeNav(){
        this.activeIndex = '/'+this.$route.path.split('/')[1];
      }
    },
    computed:{
      onRoutes(){
        return this.$route.path.replace('','');
//        return this.$route.path.replace('/','');
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      "$route": "changeNav"
    }
  }
</script>

<style>
/*横向导航*/
  .siderbar-wrapper {
    display: block;
    width: 100%;
    height: 42px;
    background-color: #0d9ee9;
    position: relative;
  }
.siderbar-wrapper .sidebar #sidebarNav {
    box-sizing: border-box;
    position: absolute;
    width: 1024px;
    height: 42px;
    overflow: hidden;
  }
.siderbar-wrapper .sidebar{
    box-sizing: border-box;
    height: 42px;
    width: 1024px;
    margin: 0 auto;
  }
  .siderbar-wrapper .sidebar ul{
    padding-left: 30px;
  }
.siderbar-wrapper .el-menu--dark {
  background-color: #0d9ee9;
}
.siderbar-wrapper .el-menu--dark .el-menu-item,
.siderbar-wrapper .el-menu--dark .el-submenu__title {
  color: white;
}
.siderbar-wrapper #sidebar .el-menu--horizontal.el-menu--dark .el-menu-item.is-active {
  background: #ffffff;
  color: #0d9ee9;
  height: 38px;
  margin-top: 5px;
  line-height: 35px;
  border-radius: 5px 5px 0 0;
  border: none;
}
.siderbar-wrapper .el-menu--horizontal.el-menu--dark .el-menu-item:hover, .el-menu--horizontal.el-menu--dark .el-submenu__title:hover {
  background: #ffffff;
  color: #0d9ee9;
  height: 38px;
  margin-top: 5px;
  line-height: 35px;
  border-radius: 5px 5px 0 0;
  border: none;
}
.siderbar-wrapper .el-menu-item, .el-submenu__title{
  transition: 0s;
}
.siderbar-wrapper .el-menu--horizontal .el-menu-item{
  height: 38px;
  margin-top: 5px;
  line-height: 35px;
  margin-right: 1px;
}
.siderbar-wrapper .classSelect {
  color: #ffffff;
  position: absolute;
  top: 7px;
  right: 20px;
}
.siderbar-wrapper .classSelect span{
  display: inline-block;
  vertical-align: top;
  height: 30px;
  line-height: 30px;
}
.siderbar-wrapper .classSelect .el-input__inner {
    height: 30px;
    width: 200px;
    border-radius: 0;
  }
.siderbar-wrapper .el-menu{
    border-radius: 0;
  }


</style>
