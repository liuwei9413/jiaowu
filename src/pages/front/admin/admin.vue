<template>
  <div class="admin" v-loading.lock="fullscreenLoading">
    <div class="menus" >
        <div class="menus-head">
          <h4 class="title">机构列表</h4>
        </div>
        <div class="seach-bar" v-if=" userInfo.roleId != 4 ">
          <el-input
            placeholder="客户名称模糊筛选"
            icon="search"
            v-model="searchText"
            
            >
          </el-input >
        </div>
        <el-tree
          :data="orgListsData"
          :props="defaultProps"
          accordion
          :filter-node-method="filterNode"
          @node-click="getNodeId"
          ref="orgLists"
          >
        </el-tree>
    </div>
    <div class="main-content">
      <div class="tabs" :class="[{ isMove: firstLogin }]">
        <el-tabs  element-loading-text="页面加载中...">
          <div class="tabs-header text-right">
            <el-button type="success"  @click="editOrgInfoForm" v-if="!isEditing" class="move"><i class="icon-edit"></i> 编辑</el-button>
            <el-button type="primary"  @click="cancelOrgInfoForm" v-if="isEditing"><i class="icon-cancel"></i> 取消</el-button>
            <el-button type="success"  @click="saveOrgInfoForm" v-if="isEditing"><i class="icon-conserve"></i>保存</el-button>
            <div class="guide-tips-bg guide-tips-bg-edit"></div>
          </div>
          <el-tab-pane label="机构信息">
              
              <div class="tabs-body" >
                <el-form ref="orgInfoForm" :model="orgInfoForm" :rules="orgInfoRules" label-width="100px" class="edit" :class="[{ editing: isEditing }] " >
                  <el-form-item label="机构名称：" prop="childrenName">
                    <el-input v-model="orgInfoForm.childrenName" :maxlength="30" class="item-text"></el-input>
                    <p> {{ orgInfoForm.childrenName }}</p>
                  </el-form-item>
                  <el-form-item label="所在地址：" prop="address">

                    <el-select v-model="selectedProvince" :placeholder="defaultProvince" @change="provinceChange" class="item-text">
                        <el-option
                          v-for="item in province"
                          :label="item.name"
                          :value="item.id"
                          :key="item.id"
                          >
                        </el-option>
                      </el-select>


                    <el-select v-model="selectedCity" @change="cityChange" :placeholder="defaultCity" class="item-text"  :disabled="isSelect" v-if="isShowCity" >
                        <el-option
                          v-for="item in city"
                          :label="item.name"
                          :value="item.id"
                          :key="item.id"
                          >
                        </el-option>
                    </el-select>

                    <el-select v-model="selectedCounty" @change="countyChange" :placeholder="defaultCounty"  class="item-text" :disabled="isSelect" v-if="isShowCounty">
                      <el-option
                        v-for="item in county"
                        :label="item.name"
                        :value="item.id"
                        :key="item.id"
                        >
                      </el-option>
                    </el-select>
                    <div class="item-text">
                      <el-input type="textarea" v-model="orgInfoForm.address" class=""></el-input>
                    </div>

                    <p>{{defaultProvince}} {{defaultCity}} {{defaultCounty}} {{this.orgInfoForm.address}} </p>
                  </el-form-item>
                  <el-form-item label="学校数量：" prop="schoolNum">
                    <span> {{ orgInfoForm.schoolNum }} </span>  <!-- <router-link :to="{ name: 'eduSchoolManagement', params: {id: id,level:level,name: name }}" class="link-highlight" v-if=" userInfo.roleId != 32 ">学校列表</router-link> -->
                    <router-link :to="{ path:  '/eduSchoolManagement',query :{id: id,level:level,name: name }}" class="link-highlight" v-if=" userInfo.roleId != 32 ">学校列表</router-link>
                  </el-form-item>
                  <el-form-item label="描述：" prop="note">
                    <el-input type="textarea" v-model="orgInfoForm.note" :maxlength="200" class="item-text"></el-input>
                    <p> {{ orgInfoForm.note }} </p>
                  </el-form-item>
                </el-form>
              </div>
          </el-tab-pane>

        </el-tabs>
        <el-tabs>
          <div class="tabs-header text-right" >
            <el-button type="success" @click="addOrgUser" class="move" ><i class="icon-new"></i> 新建人员</el-button>
            <!-- <el-button type="danger" @click="orgUsersBatchDelete" icon="delete2" :disabled="true">批量删除</el-button> -->
            <div class="guide-tips-bg guide-tips-bg-add"></div>
          </div>
          <el-tab-pane label="机构人员">
            
            <div class="tabs-body">
              <div class="noData" v-if="orgUserTotal == 0" >
                <p class="empty-text">暂无机构人员</p>
              </div>

              <el-table
                  style="width:100%"
                  :data="orgUsers"
                  border
                  stripe
                  tooltip-effect="dark"
                  @cell-click="getOrgUserCurrentInfo"
                  @selection-change="orgUsersSelectionChange"
                  v-if="orgUserTotal != 0"
                  >
                  <!-- <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column> -->
                  <el-table-column
                    prop="name"
                    label="姓名"
                    show-overflow-tooltip
                    >
                  </el-table-column>
                  <el-table-column
                    prop="phone"
                    label="手机号"
                    width="150">

                  </el-table-column>

                  <el-table-column
                    prop="state"
                    label="状态"

                    >
                    <template scope="scope">
                      <el-dropdown trigger="click" menu-align="start" @command="getOrgUserSelectState">
                            <span class="el-dropdown-link">
                              <b v-if="scope.row.state == 0">正常</b>
                              <b v-if="scope.row.state == 1">禁用</b>
                              <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item v-if="scope.row.state == 1" command="0">正常</el-dropdown-item>
                              <el-dropdown-item v-if="scope.row.state == 0" command="1">禁用</el-dropdown-item>
                            </el-dropdown-menu>
                            <!-- <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item  command="0">正常</el-dropdown-item>
                              <el-dropdown-item  command="1">禁用</el-dropdown-item>
                            </el-dropdown-menu> -->
                          </el-dropdown>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="270"
                    >

                    <template scope="scope">
                        <el-button
                          type="primary"
                          size="small"
                          @click="orgUsersEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                          type="primary"
                          size="small"
                          @click="orgUsersRestPwd(scope.$index, scope.row)">重置密码</el-button>
                        <el-button
                          type="danger"
                          size="small"
                          @click="orgUsersDelete(scope.$index, scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                </el-table>

                <div class="pagination text-right">
                    <!-- <el-pagination
                      :page-size="10"
                      layout="prev, pager, next, jumper"
                      :total="orgUserTotal"
                      @current-change="paginationCurrentChange"
                      >
                    </el-pagination> -->
                </div>
                <el-dialog title="新建机构人员" v-model="dialogVisibleAdd"  :close-on-click-modal="false" size="tiny" >
                  <el-form ref="orgUserFormAdd" :model="orgUserFormAdd" :rules="orgUserAddRules" label-width="90px">
                    <el-form-item label="姓名：" prop="name">
                      <el-input v-model.trim="orgUserFormAdd.name" :maxlength="40"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：" prop="phone" >
                      
                      <el-input v-model.trim="orgUserFormAdd.phone" :maxlength="11"></el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibleAdd = false">取 消</el-button>
                    <el-button type="success" @click="orgUserFormAddData()">添 加</el-button>
                  </span>
                </el-dialog>

                <el-dialog title="编辑机构人员" v-model="dialogVisibleEdit"  :close-on-click-modal="false" size="tiny" >
                  <el-form ref="orgUserFormEdit" :model="orgUserFormEdit" :rules="orgUserAddRules" label-width="90px">
                    <el-form-item label="姓名：" prop="name">
                      <el-input v-model.trim="orgUserFormEdit.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：" prop="phone" v-if=" userInfo.roleId != 4 ">
                      <el-input v-model.trim="orgUserFormEdit.phone"></el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibleEdit = false">取 消</el-button>
                    <el-button type="success" @click="orgUserFormEditData()">保 存</el-button>
                  </span>
                </el-dialog>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="guide-tips" v-if="firstLogin"  @click="closeGuide">
      
    </div>
  </div>
</template>

<script>
  export default {
    name: 'admin',
    data() {
          return {
            value:'',
            // 全屏遮罩层
            fullscreenLoading: true,
            // 用户信息
            userInfo:'',
            firstLogin:true,
            // 编辑输入框
            orgInfoForm:{
              childrenName:'',
              address:'',
              schoolNum:'',
              orgInfo:{
                fullName:'',
              },
              note:'',
            },
            // 地区
            province:[],
            city:[],
            county:[],
            selectedProvince:'',
            defaultProvince:'',
            defaultProvinceId:'',

            selectedCity:'',
            defaultCity:'',
            defaultCityId:'',

            selectedCounty:'',
            defaultCounty:'',
            defaultCountyId:'',

            // 校验
            orgInfoRules: {
              childrenName: [
                {required: true, message: '请输入机构名称', trigger: 'blur' },
                {pattern: /^[\u4E00-\u9FA5]+$/,message: '用户名只能为中文',trigger: 'blur'},
                {pattern: /^[\u4E00-\u9FA5]{0,30}$/, message: '长度在 0 到 30 个字符'},
              ],
              note: [
                {required: true, message: '请输入描述信息', trigger: 'blur' },
                {pattern: /^[\S]{0,200}$/, message: '长度在 0 到 200 个字符' },
              ]
            },
            // 机构列表
            orgListsData: [],
            // 文本搜索
            searchText: '',
            // 树形图参数
            defaultProps: {
              children: 'childrens',
              label: 'name'
            },
            // 机构id
            orgInfoId:'',
            // 选择机构id
            chooseOrgId:'',
            // 机构类型
            type:'',
            // 上级机构id
            pId:'',
            // 地址
            address:'',
            // 名称
            name:'',
            // 编辑切换
            isEditing:false,
            // 机构人员
            orgUsers: [],
            // 机构人员总数
            orgUserTotal:0,
            // 新建机构人员字段
            orgUserFormAdd:{
              name:'',
              phone:'',
            },
            // 获取当前点击行的信息
            currentInfo:'',
            // 获取修改状态信息
            orgUserStutas:'',
            // 编辑机构人员字段
            orgUserFormEdit:{
              name:'',
              phone:'',
            },
            // 机构人员字输入段验证
            orgUserAddRules: {
                name: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                },{
                    pattern: /^[^\s]*$/,
                    message: '长度在 0 到 40 个非空白字符',
                    trigger: 'blur'
                }],
                phone: [{
                        required: true,
                        message: '请输入手机号',
                        trigger: 'blur'
                    },{
                        pattern: /^1[34578]\d{9}$/,
                        message: '请输入11位手机号',
                        trigger: 'blur'
                    }

                ],
            },


            // 隐藏对话框
            dialogVisibleAdd: false,
            dialogVisibleEdit: false,
            //列表选中列
            multipleSelection: [],

            isSelect:true,
            isShowCity:true,
            isShowCounty:true,
            // params
            id:'',
            level:'',
            name:''

          }
        },
    mounted(){
      this.getUserInfo()
      this.getOrgTree()
      
      this.getAreaTree()
    },
    methods: {
      // 获取节点id
      getNodeId(data) {
        this.isEditing=false;
        this.orgInfoId=data.id;

        // console.log(data)

        this.getOrgInfo(this.orgInfoId);
        this.getOrgUserLists(this.orgInfoId);
      },
      
      // 获取机构信息
      getOrgInfo(id){


        this.fullscreenLoading = true;

        this.$ajax('/eduadmin/eduInfo',{id: id})
        
        // this.$ajax('/eduadmin/orgInfo',{id: this.orgInfoId})

        .then(res => {
          if(res.code == 200){

            this.orgInfoForm=res.data;

            // this.defaultProvince= this.orgInfoForm.orgInfo[2].name || '',
            // this.defaultCity= this.orgInfoForm.orgInfo[1].name || '',
            // this.defaultCounty= this.orgInfoForm.orgInfo[0].name || '',
            // console.log(this.orgInfoForm)

            if(this.orgInfoForm.orgInfo.length ==1){


              this.defaultProvince = this.orgInfoForm.orgInfo[0].name;

              this.defaultCity= '';
              this.defaultCounty= '';

              this.defaultProvinceId= this.orgInfoForm.orgInfo[0].id;

              this.isShowCity=false;
              this.isShowCounty=false;

            }else if(this.orgInfoForm.orgInfo.length ==2 ){

              this.defaultProvince= this.orgInfoForm.orgInfo[1].name;

              this.defaultCity= this.orgInfoForm.orgInfo[0].name;
              this.defaultCityId= this.orgInfoForm.orgInfo[0].id;

              this.defaultCounty= '';

              this.isShowCounty=false;

            }else if(this.orgInfoForm.orgInfo.length ==3){


              this.defaultProvince= this.orgInfoForm.orgInfo[2].name;
              this.defaultProvinceId= this.orgInfoForm.orgInfo[0].id;

              this.defaultCity= this.orgInfoForm.orgInfo[1].name;
              this.defaultCounty= this.orgInfoForm.orgInfo[0].name;
              this.defaultCountyId= this.orgInfoForm.orgInfo[0].id;

              this.isShowCity=true;

              this.isShowCounty=true;

            }

            // 获取路由参数
            
            this.id=this.orgInfoForm.orgInfo[0].id;
            this.level=this.orgInfoForm.orgInfo[0].level;
            this.name=this.orgInfoForm.orgInfo[0].name;


            this.fullscreenLoading = false;
          }else{
            this.$message.error(res.message);
          }

        }).catch((res) => {
          this.$message.error(res.message);
        });
      },
      // 获取角色信息
      getUserInfo(){

        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.firstLogin=!localStorage.adminFirstLogin && this.userInfo.firstLogin;

        // console.log(this.userInfo)
        // console.log(this.firstLogin)

      },
      // 获取机构列表
      getOrgTree(){
        this.fullscreenLoading = true;
        let params={
          teacherId: this.userInfo.id
        };
        this.$ajax('/eduadmin/getEduTree',params)
        .then(res => {
          if(res.code == 200){
            this.orgListsData = res.data;

            this.getOrgInfo(this.orgListsData[0].id);

            this.orgInfoId=this.orgListsData[0].id;

            // console.log(this.orgInfoId)
            
            this.getOrgUserLists(this.orgInfoId)

            this.fullscreenLoading = false;
          }else{
            this.$message.error(res.message);
          }
              

        }).catch((res) => {
          this.$message.error(res.message);
        });
      },

      // 实时搜索
      filterNode(value, data) {
        if (!value) return true;
        // console.log(data.name)
        return data.name.indexOf(value) !== -1;
      },
      // 编辑机构信息
      editOrgInfoForm(){
        /*this.selectedProvince="";
        this.selectedCity='';
        this.selectedCounty='';*/
        this.isEditing=true;
        this.isSelect=true;

        this.selectedProvince='';

        this.getOrgInfo(this.orgInfoId)
/*
        this.defaultCity= this.orgInfoForm.orgInfo[1].name;
        this.defaultCounty= this.orgInfoForm.orgInfo[0].name;*/

        // this.defaultProvince= this.orgInfoForm.orgInfo[2].name;
        // this.defaultCity= this.orgInfoForm.orgInfo[1].name || '';
        // this.defaultCounty= this.orgInfoForm.orgInfo[0].name || '';
        // this.defaultCounty= this.orgInfoForm.orgInfo[0].name || '';


      },
      // 取消机构信息
      cancelOrgInfoForm(){

        this.isEditing=false;

        this.getOrgInfo(this.orgInfoId)

      },
      // 获取获取区域树
      getAreaTree(){
        this.$ajax('/org/getTree')
        .then(res => {
          if(res.code == 200){
            
            this.province = res.data;

            this.isShowCity= true;
        
            this.isShowCounty= true;

          }
        }).catch((res) => {
          this.$message.error(res.message);
        });
      },

      provinceChange(id){

        this.isSelect=false;
        this.defaultCity='';
        this.defaultCounty='';
        this.selectedCity='';
        this.selectedCounty='';
        this.selectedProvince=id;

        let params={
          parentId: this.selectedProvince
        };

        this.$ajax('/org/getChildren',params)
        .then(res => {
          if(res.code == 200){
            if(res.data ==0){

              this.isShowCity= false;
              this.isShowCounty= false;

            }else{

              this.city = res.data;

              this.isShowCity= true;
              this.isShowCounty= false;

              this.defaultCity='';
              this.defaultCounty='';
              
            }


          }

        }).catch((res) => {
          this.$message.error(res.message);
        });

      },
      cityChange(id){
        this.selectedCounty='';
        this.selectedCity=id;
        console.log(this.selectedCity)
        let params={
          parentId: this.selectedCity
        };

        this.$ajax('/org/getChildren',params)
        .then(res => {
          if(res.code == 200){

            if(res.data ==0){

              this.isShowCounty= false;

            }else{
              this.county = res.data;

              this.isShowCounty= true;
            }
          }

        }).catch((res) => {
          this.$message.error(res.message);
        });
      },
      countyChange(id){

        this.selectedCounty=id;

      },

      // 保存机构信息
      saveOrgInfoForm(){
        // console.log(this.selectedCounty)
        // console.log(this.selectedCity)
        // console.log(this.selectedProvince)

        // console.log(this.defaultCountyId)
        // console.log(this.defaultProvinceId)
        
        this.$refs.orgInfoForm.validate((valid) => {

                  if (valid) {

                     let params={
                       id: this.orgInfoId,
                       childrenName: this.orgInfoForm.childrenName,

                       orgId:this.selectedCounty || this.selectedCity || this.selectedProvince || this.defaultCountyId || this.defaultProvinceId,

                       address: this.orgInfoForm.address,
                       note: this.orgInfoForm.note
                     };

                     this.$ajax('/eduadmin/editEdu',params)
                     .then(res => {
                           if(res.code == 200){
                             this.$message({
                               type: 'success',
                               message: '保存成功!'
                             });
                             this.isEditing=false;
                             this.getOrgInfo(this.orgInfoId);
                           }

                     }).catch((res) => {
                       this.$message.error(res);
                    });

                  } else {

                    this.$message.error('验证未通过');
                    // return false;

                  }
                });
          


      },
      // 获取机构人员列表
      getOrgUserLists(id){
        this.$ajax('/eduadmin/eduUserList',{educationId: id})
        .then(res => {
              if(res.code == 200){

                this.orgUsers=res.data;
                // console.log(this.orgUsers)
                this.orgUserTotal=this.orgUsers.length;
              }else{
                this.$message.error(res.message);
              }
              

        }).catch((res) => {
          this.$message.error(res.message);
        });
      },
      // 新建机构人员
      addOrgUser(){
        this.orgUserFormAdd={};
        this.dialogVisibleAdd = true;

      },
      //确定添加机构人员
      orgUserFormAddData(){

        this.$refs.orgUserFormAdd.validate((valid) => {
                  if (valid) {

                    let params={
                      educationId: this.orgInfoId,
                      name: this.orgUserFormAdd.name,
                      phone: this.orgUserFormAdd.phone || ''
                    };

                    this.$ajax('/eduadmin/addEduUser',params)
                    .then(res => {
                          if(res.code == 200){
                            this.$message({
                              type: 'success',
                              message: '添加成功!'
                            });

                            this.dialogVisibleAdd = false;

                            this.getOrgUserLists(this.orgInfoId)

                          }else{

                            this.$message.error(res.message);
                          }

                    }).catch((res) => {
                      this.$message.error(res.message);
                    });

                  } else {

                    this.$message.error('验证未通过');

                    return false;

                  }
                });


      },
      // 获取点击当前行信息
      getOrgUserCurrentInfo(row, column, cell, event){
        // console.log(row.id)
        this.currentInfo = row;
      },
      // 获取机构人员状态
      getOrgUserSelectState(command){

          let params={
            educationId: this.orgInfoId,
            userId: this.currentInfo.id,
            state: command
          };

          this.$ajax('/eduadmin/changeOrgUserStatus',params).then((res) => {

            if(res.code == 200){

              this.$message({
                message: '状态修改成功',
                type: 'success'
              });

              this.getOrgUserLists(this.orgInfoId)

            }else{
              this.$message.error(res.message);
            }
        }).catch((res) => {
          this.$message.error(res.message);
        });


      },
      // 编辑机构人员信息
      orgUsersEdit(index, row) {

        this.dialogVisibleEdit = true;

        this.orgUserFormEdit.name= row.name;
        this.orgUserFormEdit.phone= row.phone;

        // console.log(index, row);
      },
      // 确定编辑
      orgUserFormEditData(){


        let params = {
          educationId: this.orgInfoId,
          userId: this.currentInfo.id,
          name: this.orgUserFormEdit.name,
          phone:  this.orgUserFormEdit.phone
        };

        this.$ajax('/eduadmin/editEduUser',params).then((res) => {

          if(res.code == 200){

            this.$message({
              message: '保存成功',
              type: 'success'
            });

            this.getOrgUserLists(this.orgInfoId);

            this.dialogVisibleEdit = false;
          }else{
            this.$message.error(res.message);
          }

        }).catch((res) => {
          this.$message.error(res.message);
        });
      },
      // 重置密码
      orgUsersRestPwd(index, row){
        // console.log(row)
        this.$confirm('是否确定重置密码?', '提示', {
          type: 'warning',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {

          let params = {
            phone: row.phone
          };

          this.$ajax('/password/reset',params).then((res) => {
            if(res.code == 200){
              // setTimeout(()=>{
                this.$alert(res.message, '新密码', {
                  confirmButtonText: '确定',
                  
                })
              // },1000)
              
            }else{
              this.$message.error(res.message);
            }

          }).catch((res) => {
            this.$message.error(res.message);
          });
        }).catch((res) => {

        });

      },
      // 确定删除单个机构人员
      orgUsersDelete(index, row) {
        // console.log(index,row)
        this.$confirm('确定要删除选中教师吗?', '提示', {
          type: 'warning',
          confirmButtonText: '删除',
          cancelButtonText: '取消',
        }).then(() => {

          let params = {
            userId: row.id,
            educationId:  this.orgInfoId
          };

          this.$ajax('/eduadmin/delEduUser',params).then((res) => {
            if(res.code == 200){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }
            this.getOrgUserLists(this.orgInfoId)
          });
        }).catch((res) => {
          this.$message.error(res.message);
        });
      },
      //获取列表选中列
      orgUsersSelectionChange(val) {
        // console.log(1)
        this.multipleSelection = val;
      },
      // 批量删除机构人员 备选
      orgUsersBatchDelete(index, row){
        var userIds = this.multipleSelection.map(item => item.id).toString();

        this.$confirm('确定要删除选中教师吗?', '提示', {
          type: 'warning',
          confirmButtonText: '删除',
          cancelButtonText: '取消',
        }).then(() => {

          let params = {
            userId: userIds,
            orgId:  this.orgInfoId
          };

          this.$ajax('/eduadmin/delOrgUser',params).then((res) => {
            if(res.code == 200){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.getOrgUserLists(this.orgInfoId)
            }else{
              this.$message.error(res.message);
            }
          });
        }).catch((res) => {
          this.$message.error(res.message);
        });
      },
      closeGuide(){
        if(this.firstLogin){
          this.firstLogin=false;

          this.isMove=false;

          localStorage.adminFirstLogin = 'NO';
        }
        
      }
    },
    watch: {
      searchText(val) {
        this.$refs.orgLists.filter(val);
      }
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import "../../../resources/front/css/common/adm-stu-tea-mgt.css";
  .admin{
    padding: 15px 20px 20px;
    height: 100%;
    text-align: left;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
  }
  .el-tree > .el-tree-node{
    border-bottom: 1px solid #d3e3f3;
  }
  .el-tree > .el-tree-node > .el-tree-node__content{
    background: #f4fcff;
  }
  .el-tree > .el-tree-node > .el-tree-node__content > .el-tree-node__label{
  color: #333;
  }
  .el-tree > .el-tree-node > .el-tree-node__children > .el-tree-node > .el-tree-node__content{
    position: relative;
  }
  .el-tree > .el-tree-node > .el-tree-node__children > .el-tree-node > .el-tree-node__content:first-child {
    border-top: 1px solid #d3e3f3;
  }
  .el-tree > .el-tree-node > .el-tree-node__children > .el-tree-node.is-expanded > .el-tree-node__content > .el-tree-node__label{
    color: #20a0ff;
  }
  .el-tree > .el-tree-node > .el-tree-node__children > .el-tree-node > .el-tree-node__content:after{
    position: absolute;
    content:'';
    bottom:-1px;
    border-bottom: 1px solid #d3e3f3;
    width: 100%;
    left: 30px;
  }
  .el-tree > .el-tree-node > .el-tree-node__children > .el-tree-node > .el-tree-node__content > .el-tree-node__label{
    color: #666;
  }
  .el-tree > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node > .el-tree-node__content{
    position: relative;
  }

  .el-tree > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node > .el-tree-node__content:before{
    position: absolute;
    content:'';
    bottom:0;
    border-right: 1px dashed #d3e3f3;
    left: 40px;
    width: 0px;
    top: 0;
    height: 36px;
  }
  .el-tree > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node > .el-tree-node__content:after{
    position: absolute;
    content:'';
    bottom:0;
    border-bottom: 1px dashed #d3e3f3;
    width: 100%;
    left: 60px;
  }
  .el-tree > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node:last-child .el-tree-node__content:after{
    border-bottom: 0;
  }
  /* .el-tree-node>.el-tree-node__children>.el-tree-node:first-child{
    border-top: 1px solid #d3e3f3;
  } */
  .el-tree > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node > .el-tree-node__content > .el-tree-node__label{
    position: relative;
    /* color: #858585; */
  }
  .el-tree > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node.is-expanded > .el-tree-node__children > .el-tree-node > .el-tree-node__content > .el-tree-node__label:after{
    position: absolute;
    content:'';
    width: 15px;
    border-bottom: 1px dashed #d3e3f3;
    left: -20px;
    top: 50%;
  }
  .el-tree-node.is-current{
    /* color: #20A0FF; */
  }
  .el-tree-node:last-child{
    border-bottom: none;
  }
  .el-tree-node__label{
    margin-left: 7px;
    width: 140px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .el-tree-node__expand-icon{
    border-left-color: transparent;
    position: relative;
    font-family: 'icomoon' !important;
    color: #bbb;
  }
  .el-tree-node__expand-icon:hover{
    border-left-color: transparent;
  }
  .el-tree-node__expand-icon:after{
    position: absolute;
    content:'\e911';
    top: -18px;
    left: -5px;
    font-size: 12px;
  }
  .el-tree-node__content:hover{
    background: none;
  }
  .el-tree-node.is-expanded>.el-tree-node__content>.el-tree-node__label{
    color: #20a0ff;
  }
  .el-tree-node.is-expanded>.el-tree-node__children>.el-tree-node.is-current.is-expanded > .el-tree-node__children > .el-tree-node > .el-tree-node > .el-tree-node__label{
    color: #858585;
  }
  .el-tree-node.is-expanded>.el-tree-node__children>.el-tree-node.is-current > .el-tree-node__label{
    color: #20a0ff;
  }
  .el-tree-node.is-expanded>.el-tree-node__children > .el-tree-node.is-current > .el-tree-node__content > .el-tree-node__label{
    color: #20a0ff;
  }
  .el-tree-node.is-expanded>.el-tree-node__children > .el-tree-node > .el-tree-node__content > .el-tree-node__label{
    color: #858585;
  }
  /* .el-tree-node__children .el-tree-node.is-current {
    color: #20a0ff;
  } */
  /* .el-tree-node.is-expanded .el-tree-node__expand-icon.expanded{
    color: #20a0ff;
  } */
  .el-tree-node__expand-icon.expanded{
    transform: rotate(0deg);
  }
  .el-tree-node__expand-icon.expanded:after{
    content:'\e910';
  }
  .el-tree-node__expand-icon.is-leaf:after{
    content:'';
  }
  .admin .menus{
    width: 200px;
    /* border: 1px solid #20A0FF; */
  }
  .admin .menus-head{
    background: #20A0FF;
    color: #fff;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
  .admin .menus .seach-bar .el-input__icon{
    right: auto;
    left: 0;
  }
  .admin .menus .seach-bar .el-input__icon+.el-input__inner{
    padding-right: 0px;
    padding-left: 30px;
  }
  .admin .menus-head .title{
    font-size: 14px;

  }
  .admin .menus-head .add-btn{
    color:#fff;
    border: 1px solid #fff;
    font-size: 12px;
    padding: 2px;
  }
  .admin .seach-bar{
    padding: 10px;
    border: 1px solid #d1dbe5;
    border-bottom: none;
  }
  .admin .seach-bar input{
    height: 30px;
    width: 100%;
    border-radius: 0;
    /* border: 1px solid #20A0FF; */
  }
  .admin .main-content{
    width: 750px;
  }
  /* .tabs .el-tabs--border-card>.el-tabs__header .el-tabs__item{
    border-top: 3px solid;
  }
  .tabs .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    border-top: 3px solid;
  } */

  .admin .el-tabs__active-bar{
    width: 3px !important;
    height: 15px;
    top: 13px;
  }
  .admin .el-tabs:nth-child(2){
    margin-top: 30px;
  }
  .admin .el-tabs__item.is-active{
    cursor: default;
  }
  .admin .tabs-header{
    margin-bottom: 10px;
    position: absolute;
    top:-60px;
    right: 0;
  }
  .admin .text-left {
    text-align: left;
  }
  .admin .text-right {
    text-align: right;
  }
  .admin .space-between{
    display: flex;
    justify-content: space-between;
  }
  .admin .space-around{
    display: flex;
    justify-content: space-around;
  }
  .admin .tabs-header .editor{
    padding: 10px;
    display: block;

  }

  /* .el-form-item.is-required .el-form-item__label:before{
    content: '•';
    color: #999;
  } */

  .admin .edit .item-text{
    display: none;
    /* display: inline-block; */
  }
  .admin .edit.editing .item-text{
    display: block;
    width: 200px;
  }
  .admin .edit .el-form-item  p{
    color: #666;
  }
  .admin .edit.editing p{
    display: none;
  }
  .admin .edit.editing .item-text.el-select{
    display: inline-block;
  }
  .admin .edit .item-text .el-textarea{
    margin-top: 22px;
    width: 300px;
    display: block;
  }
  .admin .pagination{
    margin-top: 20px;
    text-align: right;
  }
  .admin b{
    font-weight: normal;
  }
  .admin .details-address{
    margin-top: 10px;
  }

  .admin .link-highlight,
  .admin .link-highlight:hover{
    color: #20a0f2 ;
    text-decoration: underline;
  }

  .admin .cell .el-button{ 
    color: #20a0ff;
    background: none;
    border: none;
    text-decoration: underline;
  }
.admin .cell{
  text-align: center;
  white-space: nowrap;
}
.admin .cell .el-button.el-button--danger{
  color: #ff5353;
}
.admin .tabs-body{
  padding: 0 10px;
}
.admin .tabs-body .el-form-item__content{
  position: relative;
  min-height: 36px;
}

.admin .tabs-body .el-form-item__content:after{
  position: absolute;
  content:'';
  width: 100%;
  left: 0;
  bottom: -5px;
  border-bottom: 1px dashed #f0f0f0;
}

.admin .tabs-body .el-dialog .el-form-item__content:after{
  border-bottom: 0;
}
.admin .tabs-body .edit.editing .el-form-item__content:after{
  border-bottom: 0;
}
.admin .el-table table thead tr th:nth-last-child(2){
  border-right: 1px solid #a5defa;
}
.admin .el-form-item{
  /* margin-bottom: 15px; */
}
.admin .el-form-item:last-child .el-form-item__content:after{
  border-bottom: 0;
}
.admin .el-tabs__content{
  overflow: inherit;
}
.admin .edit.editing .el-textarea__inner{
  width: 640px;
}
.admin .tabs{
  padding-top: 5px;
}
.admin .tabs-body .el-input .el-input__inner::-moz-placeholder{color:#1f2d3d;font-family:"Microsoft YaHei";}
.admin .tabs-body .el-input .el-input__inner:-ms-input-placeholder{color:#1f2d3d;font-family:"Microsoft YaHei";}
.admin .tabs-body .el-input .el-input__inner::placeholder{color:#1f2d3d;font-family:"Microsoft YaHei";}
</style>
