<template>
  <div id="schoolbatch">
    <div class="saveDiv">
<router-link :to="{ path:  '/eduSchoolManagement' }" class=" icon-back">返回 </router-link>

    </div>
    <el-form method="post" action="http://60.205.115.173:8888/yitai-educational/schadmin/import/importScore" enctype="multipart/form-data" id="importScoreForm">
    <ol>
      <li class="xiazai">
        <h3>1、下载模板</h3>
        <p>点击下载导入模板&nbsp&nbsp&nbsp&nbsp&nbsp<a href="http://60.205.115.173:8888/yitai-educational/downloads/学校信息模板.xls" target="_blank"><el-button type="primary" class="icon-download  download"> 下载</el-button></a></p>
      </li>
      <!--下属机构列表-->
      <li>
        <h3>2、校归属地区：</h3>
        <el-form-item label="" prop="orgInfo">
          <!-- <el-cascader
             :options="orgListsData"
             :change-on-select = "true"
             :show-all-levels="false"
             style="width:288px;"
             v-model="educationIds"
             :placeholder="userInfo.education.orgName" v-show="isSaveSchool == false"
           ></el-cascader>-->
          <el-select v-model="selectedProvince" style="width:288px;" :placeholder="defaultProvince.name" @change="provinceChange" :disabled="defaultMaxLevel>=1" class="item-text" >
            <el-option
              v-for="item in province"
              :label="item.name"
              :value="item"
              :key="item.id"
            >
            </el-option>
          </el-select>
          <el-select v-model="selectedCity" @change="cityChange" :placeholder="defaultCity.name" class="item-text" v-if="city.length !=0 || (defaultProvince.id  != '' && defaultProvince.id != null )" :disabled="defaultMaxLevel>=2" >
            <!--<el-option value="省直属">省直属</el-option>-->
            <el-option
              v-for="item in city"
              :label="item.name"
              :value="item"
              :key="item.id"
            >
            </el-option>
          </el-select>
          <el-select v-model="selectedCounty" @change="countyChange" :placeholder="defaultCounty.name" class="item-text" v-if="county.length !=0 || (defaultCity.id  != '' && defaultCity.id != null )"  :disabled="defaultMaxLevel>=3" >
            <!-- <el-option value="市直属">市直属</el-option>-->
            <el-option
              v-for="item in county"
              :label="item.name"
              :value="item"
              :key="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </li>
      <li class="file-box">
        <h3>3、选择需要导入的EXCEL文件</h3>
        <el-form-item>
          <input type='text' name='textfield' id='textfield' class='txt' style="width:518px;"/>
          <input type='button' class='btn' value='选择文件'style="width: 78px;"/>
          <input  onchange="document.getElementById('textfield').value=this.value"
                  name="file"
                  class="upload-demo"
                  accept=".xls,.xlsx,.csv"
                  style="width: 598px;"
                  type="file"
                  v-on:change="fileChange($event)">
          <!-- multiple="multiple"-->
          <el-button type="primary" class="submit icon-leadingin"  native-type="submit" :loading="formSubmited" v-on:click="submitForm($event)"> 导入</el-button>
        </el-form-item>
      </li>
    </ol>
    </el-form>
    <div  class="explain">
      <h1>导入格式案例</h1>
      <img src="../../../resources/front/imgs/schoolinfomoban.png"/>
      <h1>导入说明</h1>
      <p>1、文件导入前请严格按照数据要求和格式要求填写。</p>
      <p>2、导入如果出现异常或数据问题，请修改后重新导入。</p>
    </div>
    <!--异常处理-->
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
      selectDialogFlag: false,
      educationId:[],
      formData: {
        orgId: '',       //区域ID
      },
      orgList: [],
      formSubmited: false,
      //校归属地区
      defaultMaxLevel: 0,
      defaultProvince: {
        id: '',
        name: '',
        level: 1
      }, //默认省
      defaultCity: {
        id: '',
        name: '',
        level: 2
      }, //默认市
      defaultCounty: {
        id: '',
        name: '',
        level: 3
      }, //默认区/县
      province:[],
      city:[],
      county:[],
      selectedProvince: {},
      selectedCity: {},
      selectedCounty: {},
       //异常处理
      isError:false,
      errorArr:[],//储存批量导入的异常
    };
  },
  beforeMount() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    //设定默认的 省、市、区/县内容
    this.defaultMaxLevel = this.userInfo.education.orgInfo.length;
    this.defaultProvince = this.userInfo.education.orgInfo[0] || {
        id: '',
        name: '',
        level: 1
      };
    this.defaultCity = this.userInfo.education.orgInfo[1] || {
        id: '',
        name: '',
        level: 2
      };
    this.defaultCounty = this.userInfo.education.orgInfo[2] || {
        id: '',
        name: '',
        level: 3
      };
  },
  mounted(){
    //获取区域树-省
    this.getAreaTree();
    if(this.defaultProvince.id != null && this.defaultProvince.id != ''){
      //拿取市
      this.provinceChange(this.defaultProvince);
    }
    if(this.defaultCity.id != null && this.defaultCity.id != ''){
      //拿取区
      this.cityChange(this.defaultCity);
    }
    if(this.defaultMaxLevel == 1){
      this.defaultCity.name = '省直属';
    }
    if(this.defaultMaxLevel == 2){
      this.defaultCounty.name = '市直属';
    }

    //获取机构树
//      this.getEduOrgTree();
    /*  this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
     console.log(this.userInfo.schools.schoolId)*/
  },
  methods: {
    //获取机构树
    getEduOrgTree(){
      //orgId 为区域ID；educationId为机构ID
      let educationId = this.userInfo.education.educationId || '';
      this.$ajax('/eduadmin/getEduChildrenTree?parentEducationId='+educationId)
        .then(res => {
          if(res.code == 200){
            var orgListsData = JSON.stringify(res.data);
            orgListsData = orgListsData.replace(/name/g, 'label').replace(/id/g, 'value').replace(/childrens/g, 'children').replace(/\,\"children\"\:\[\]/g, '');
            orgListsData = '[' + orgListsData + ']';
            console.log(orgListsData);
            this.orgListsData = JSON.parse(orgListsData);
            /*if(Object.prototype.toString.call(res.data) === "[object Array]"){
             this.orgListsData = res.data;
             }else{
             this.orgListsData = [res.data || {}];
             }*/
          }else{
            //其它非两百情况
            this.orgListsData = [{}];
          }
          console.log(this.orgListsData);
        }).catch(() => {
      });
    },

    // 获取获取区域树
    getAreaTree(){
      this.$ajax('/org/getTree')
        .then(res => {
          this.province = res.data;
        }).catch(() => {
      });
    },
    provinceChange(item){
      console.log('province======'+item.id+','+item.name);
      this.selectedCity = {};
      this.selectedCounty = {};
      this.selectedProvince = item;
      if(item.id == null || item.id == ''){
        return;
      }
      let params={
        parentId: item.id
      };
      this.$ajax('/org/getChildren',params)
        .then(res => {
          this.city = res.data;
//            this.city.splice(0, 0, {id: '', name: '省直属'});
        }).catch(() => {
      });

    },
    cityChange(item){
      console.log('city======'+item.id+','+item.name);
      this.selectedCounty = {};
//        item.id = item.id || '';
//        item.name = item.name || '省直属';
//        item.level = item.level || '';
      this.selectedCity = item;
      if(item.id == null || item.id == ''){
        return;
      }
      let params={
        parentId: item.id
      };
      this.$ajax('/org/getChildren',params)
        .then(res => {
          this.county = res.data;
//            this.county.splice(0, 0, {id: '', name: '市直属'});
        }).catch(() => {
      });
    },
    countyChange(item){
      console.log('county======'+item.id+','+item.name);
//      	item.id = item.id || '';
//      	item.name = item.name || '市直属';
//      	item.level = item.level || '';
      this.selectedCounty = item;
    },
    getSaveOrgId(){
      let orgTempObj = {id: '', name: '',orgNameStr: ''};

      if(this.defaultMaxLevel == 3){
        //地区三级，当前已经是最后一级
        orgTempObj.id = this.defaultCounty.id;
        orgTempObj.name = this.defaultCounty.name;
        orgTempObj.orgNameStr = this.defaultProvince.name+''+this.defaultCity.name+''+this.defaultCounty.name;
      }
      else if(this.defaultMaxLevel == 2){
        //地区二级，默认city已经是最后一级别
        let orgStr = this.defaultProvince.name+''+this.defaultCity.name;
        orgTempObj.id = this.selectedCounty.id;
        orgTempObj.name = this.selectedCounty.name;
        orgTempObj.orgNameStr = orgStr+''+this.selectedCounty.name;
        //二级地区选择中，默认会是市直属，此时机构ID应该是默认的市级Id
        if(this.selectedCounty.name == null || this.selectedCounty.name == "" || this.selectedCounty.name == '市直属'){
          orgTempObj.id = this.defaultCity.id;
          orgTempObj.name = this.defaultCounty.name;
          orgTempObj.orgNameStr = orgStr+''+this.defaultCounty.name;
        }
      }
      else if(this.defaultMaxLevel == 1){
        //地区一级，默认province已经是最后一级别
        let orgStr = this.defaultProvince.name;
        if(this.selectedCounty.name != null && this.selectedCounty.name != '' && this.selectedCounty.name != '市直属'){
          orgTempObj.id = this.selectedCounty.id;
          orgTempObj.name = this.selectedCounty.name;
        }
        else if(this.selectedCity.name != null && this.selectedCity.name != '' && this.selectedCity.name != '省直属'  && this.selectedCity.name != '市直属'){
          orgTempObj.id = this.selectedCity.id;
          orgTempObj.name = this.selectedCity.name;
        }
        else{
          orgTempObj.id = this.defaultProvince.id;
          orgTempObj.name = this.defaultProvince.name;
        }
        orgTempObj.orgNameStr = orgStr+''+(this.selectedCity.name || this.defaultCity.name)+''+(this.selectedCounty.name || this.defaultCounty.name);
      }
//          console.log('存储----id='+orgTempObj.id+',name='+orgTempObj.name+',nameStr='+orgTempObj.orgNameStr);
      return orgTempObj;
    },


    fileChange: function() {
      if( this.orgId=='') {
        this.$alert('请选择学校所在区域', '标题名称', {
          confirmButtonText: '确定',
        });
      }
    },
    submitForm: function(e) {
        let orgTempObj=this.getSaveOrgId();
        console.log(orgTempObj.id)
        this.formData.orgId=orgTempObj.id
      console.log( this.formData.orgId)
      if( !this.formData.orgId ) {
        this.$alert('请选择学校所在区域', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }

      e.preventDefault()
      let that = this
      let formData = new window.FormData(document.getElementById('importScoreForm'));
    /*  that.formSubmited = true
      let formData = new window.FormData(document.getElementById('importScoreForm'));
      that.formData.educationId = this.educationId[this.educationId.length - 1]*/
      console.log( that.formData.orgId)
      $.ajax({
        url:'http://60.205.115.173:8888/yitai-educational/eduadmin/import/importSchool?orgId='+that.formData.orgId,

        type:"post",
        data:formData,
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
        /*error:function(e){
          that.formSubmited = false
          alert("错误！！");
        }*/
      });
    }
  }

}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
/*返回按钮*/
.saveDiv {
 padding: 10px 0 10px 0;
  border-bottom: 1px solid #e9edf1;
}
.saveDiv a {
  font-size: 14px;
  color: #666;
  line-height: 30px;
}
.icon-back:before{
  position: relative;
  top:1px;
}
#schoolbatch{
  min-height: 860px;
  padding:0 20px  50px 20px;

}
#schoolbatch h1{
  font-size:14px;
  color:#666;
  line-height:34px;
}
#schoolbatch .explain p{
  font-size: 14px;
  color:#666;
  line-height:34px;
  text-indent: 2em;
}
#schoolbatch li{
margin-top: 20px;
}

#schoolbatch h3 {
  background:#f9f9f9;
  height: 34px;
  line-height: 34px;
  padding-left: 13px;
  font-size: 14px;
  color:#333333;
}
#schoolbatch  .xiazai p{
  font-size:14px;
  color:#666666;
  margin-top:15px;
  margin-left: 36px;
}
#schoolbatch .el-cascader {
  margin-left: 30px;
}
/*下载*/
#schoolbatch .download{
  margin-left: 5px;
}

  /*导入*/

#schoolbatch .el-form-item{
  margin-left: 32px;
  margin-top: 15px;
}
/*导入*/
#schoolbatch .file-box{ position:relative;width:100%;margin: 0px;}
#schoolbatch .txt{ height:28px; border:1px solid #e6e6e6; width:180px;margin: 0px;position: relative;left:5px;top:-1px;}
#schoolbatch .btn{ background-color:#FFF; border:1px solid #e6e6e6;height:30px;  color:#0d9ee9;margin: 0px;}
#schoolbatch .upload-demo{ position:absolute; top:0; left:0px; height:32px; opacity: 0;width:260px ;}

#schoolbatch .submit{
  position: relative;
  top: 1px;
  margin-top: 3px;
  height:30px;
  width:80px;
  border:none;
  background:#1ec56b ;
}
#schoolbatch .submit:hover{
  position: relative;
  top: 1px;
  margin-top: 3px;
  height:30px;
  width:80px;
  border:none;
  background:#48e791 ;
}
</style>
