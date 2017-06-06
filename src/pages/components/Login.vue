<template>
    <div class="login-wrap">
        <div class="nav_container">
          <div class="nav-centre">
            <img src="../../resources/front/imgs/loginTitle.png">
          </div>
        </div>
        <!--<div class="ms-title">教务管理系统</div>-->
        <div class="loginBody">
          <div class="loginElement">
            <div class="ms-login">
              <div class="loginTitleName">基础教务系统</div>
              <div class="loginBodyMsg">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="" class="demo-ruleForm"><!--60 -->
                  <el-form-item prop="username" label="">
                    <el-input :maxlength="19" @change="queryMsgAllow(ruleForm)" id="userName" v-model="ruleForm.username" placeholder="请输入您的账号"></el-input>
                    <div class="userIcon"><i class="icon-account"></i></div>
                  </el-form-item>
                  <el-form-item prop="password" label="">
                    <el-input :maxlength="19" @change="queryMsgAllow(ruleForm)" id="passWord" type="password" placeholder="请输入您的密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>      <div class="userIcon"><i class="icon-password"></i></div>
                  </el-form-item>
                  <el-form-item prop="captcha" label="">
                    <el-input id="captcha" @change="queryMsgAllow(ruleForm)" v-model="ruleForm.captcha" placeholder="请输入验证码" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    <div class="userIcon"><i class="icon-verification-code"></i></div>
                    <div class="captchaWrap">
                      <img @click="reloadImg" :src="captchaImg" alt="验证码">
                      <div @click="reloadImg" class="captchaText"><i class="icon-reload"></i></div>
                    </div>

                  </el-form-item>
                  <div class="forgetWrap">
                    <router-link to="/forgetPassword"><span class="forgetPasswordBtn">忘记密码</span></router-link>
                  </div>
                  <div class="login-btn">
                    <el-button :disabled="btnStatus==false" type="primary"  @click="submitForm('ruleForm')">登录</el-button>
                  </div>
                  <!--<p style="font-size:12px;line-height:30px;color:#999;">Tips : 验证码随便填。</p>-->
                </el-form>
              </div>
            </div>
            <!--<div class="loginbg_left"></div>-->
            <!--<div class="loginbg_right"></div>-->
          </div>
        </div>
        <div class="footer">
          <div class="copyright-box">
            <p>Copyright © 2007-2017 北京译泰教育科技有限公司 版权所京ICP备14052628号</p>

            <p>地址：北京市朝阳区利泽中二路望京科技园B座二层</p>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
          var validateUser = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入用户名'));
            } else {
              var patrn=/^(\w){1,19}$/;
              if (!patrn.exec(value)) {
//                  this.$refs.ruleForm2.validateField('checkPass');
                callback(new Error('用户名不包含汉字或空格及特殊符号'));
              }else{
                callback();
              }
            }
          };
          var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              var patrn=/^(\w){6,19}$/;
              if (!patrn.exec(value)) {
//                  this.$refs.ruleForm2.validateField('checkPass');
                callback(new Error('至少6位不包含空格及特殊符号的密码'));
              }else{
                callback();
              }
            }
          };
          var validateCaptcha = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入验证码'));
            } else {
              var patrn=/^(\w){4,10}$/;
              if (!patrn.exec(value)) {
//                  this.$refs.ruleForm2.validateField('checkPass');
                callback(new Error('数字字母的组合'));
              }else{
                callback();
              }
            }
          };
            return {
                ruleForm: {
                    username: '',
                    password: '',
                    captcha: ''
                },
                rules: {
                    username: [
                        { validator:validateUser, trigger: 'blur' }
                    ],
                    password: [
                        { validator:validatePass, trigger: 'blur' }
                    ],
                    captcha: [
                      { validator:validateCaptcha, trigger: 'blur' }
                    ]
                },
                captchaImg:this.staticResources+'captcha?ts='+new Date().getTime(),
                btnStatus : false
            }
        },
        mounted: function () {
          if (localStorage.getItem('userInfo') == '' || localStorage.getItem('userInfo') == null){
          }else {
            this.$router.push({ path: '/loginCheck',  query: ''});
          }
//            let $this = this;
//            this.$ajax('/captcha',
//  //          $this.param
//            ).then(function (response) {
////              console.log(response);
//                $this.captchaImg = response;
//            }).catch(function (error) {
//                console.log(error);
//            });
        },
        methods: {
            submitForm(formName) {

              const self = this;
              self.$refs[formName].validate((valid) => {
                if (valid) {
                  self.$ajax('login',
                    self.ruleForm
                    ).then(function (response) {
                        console.log(response);
                        if (response.code == 200){
//                          localStorage.setItem('ms_username',self.ruleForm.username);
                          self.$router.push('/loginCheck');
                        }else {
                          self.$alert(response.message, '提示', {
                          confirmButtonText: '确定',
                          callback: action => {
                              self.ruleForm.password = "";
                              self.ruleForm.captcha = "";
                              self.reloadImg();
                              self.btnStatus = false;
                          }
                        });
                        }
                      }).catch(function (error) {
                          console.log(error);
                      });
//
                } else {
                  console.log('error submit!!');
                  return false;
                }
              });

            },
            reloadImg(){
              this.captchaImg = this.staticResources+'captcha?ts='+new Date().getTime();
            },
            queryMsgAllow(val){
            if (val.username.length>0 && val.password.length>0 && val.captcha.length>0){
                this.btnStatus = true;
            }else {
                this.btnStatus = false;
            }
          }
        }
    }
</script>

<style>
    .login-wrap{
      margin: 0 auto;
      color: #7b7b7b;
    }
    .login-wrap .nav_container {
      width: 100%;
      height: auto;
      position: relative;
      z-index: 100;
      background: #fff;
    }
    .login-wrap .nav-centre {
      width: 100%;
      height: 48px;
      background: #fff;
      margin: 0 auto;
      overflow: hidden;
    }
    .login-wrap .nav_container img {
      width: 261px;
      height: 29px;
      margin-top: 10px;
      float: left;
      margin-left: 30px;
    }
    .login-wrap .loginBody {
      background: #2372b7;
      width: 100%;
      height: 609px;
      /*margin-top: 100px;*/
      /*position: relative;*/
      /*top: 50px;*/
    }
    .login-wrap .loginElement {
      position: relative;
      margin: 0 auto;
      width: 1024px;
      height: 609px;
      background: url(../../resources/front/imgs/login_bg.png);
    }
    .login-wrap .ms-title{
        position: absolute;
        top:30%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: black;

    }
    .login-wrap .ms-login{
        box-sizing: border-box;
        position: absolute;
        left:50%;
        top:50%;
        width:306px;
        height:311px;
        margin-top:-156px;
        margin-left:-153px;
        /*padding:40px 30px 40px 14px;*/
        border-radius: 5px;
        background: #fff;
        box-shadow: 8px 8px 10px #3479ba;
        -webkit-box-shadow: #3479ba 8px 8px 10px;
        -moz-box-shadow: #3479ba 8px 8px 10px;
    }
    .login-wrap .ms-login .loginTitleName{
      text-align: center;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e0e0e0;
    }
    .login-wrap #userName, .login-wrap #passWord, .login-wrap #captcha{
      position: relative;
    }
    .login-wrap .ms-login .userIcon {
      font-size: 17px;
      position: absolute;
      top: 0;
      left: 0;
      width: 42px;
      text-align: center;
    }
    .login-wrap .ms-login .userIcon i {
      color: #0d9ee9;
      display: inline-block;
      width: 100%;
      border-right: 1px solid #e0e0e0;
    }
    .login-wrap .ms-login .loginBodyMsg{
      padding: 16px 30px 40px 30px;
    }
    .login-wrap #userName input {
      text-indent: 40px;
    }
    .login-wrap #passWord input {
      text-indent: 40px;
    }
    .login-wrap #captcha input {
      /*box-sizing: border-box;*/
      text-indent: 40px;
      border-radius: 1px 0 0 1px;
      display: inline-block;
      width: 100%;
    }
    .login-wrap .ms-login .el-form .el-form-item{
      height: 36px;
    }
    .login-wrap .ms-login .el-form .el-form-item .el-form-item__content {
      height: 36px;
    }
    .login-wrap .login-btn{
        margin-top: 40px;
        text-align: center;
    }
    .login-wrap .login-btn button{
        width:100%;
        height:36px;
    }
    .login-wrap #captcha {
      width: 147px;
      box-sizing: border-box;
      height: 36px;
      line-height: normal;
      overflow: hidden;
    }
    .login-wrap .captchaWrap {
      box-sizing: border-box;
      vertical-align: top;
      margin-left: -4px;
      display: inline-block;
      width: 98px;
      height: 36px;
      border: 1px solid #bfcbd9;
      border-radius: 0 1px 1px 0;
      border-left: none;
    }
    .login-wrap .captchaWrap img {
      cursor: pointer;
      display: inline-block;
      width: 70%;
      height: 100%;
      /*margin-top: 5%;*/
  }
    .login-wrap .el-form-item__content .captchaText{
      display: inline-block;
      font-size: 14px;
      color: #0d9ee9;
      vertical-align: top;
      width: 24px;
      text-align: center;
      margin-left: -2px;
      cursor: pointer;
    }
    /*.login-wrap .login-btn .notAllowBtn {*/
      /*background: #8F8F8F;*/
      /*width:100%;*/
      /*height:36px;*/
      /*border: 1px solid #8F8F8F;*/
    /*}*/
    .login-wrap .notAllowBtn:hover {
      background: #8F8F8F;
      width:100%;
      height:36px;
    }
    .login-wrap .forgetWrap{
      /*position: absolute;*/
      /*width: 246px;*/
      /*height: 36px;*/
    }
    .login-wrap .forgetPasswordBtn {
    position: absolute;
    right: 30px;
    top: 225px;
    font-size: 12px;
    cursor: pointer;
    color: #0d9ee9;
    text-align: right;
    display: inline-block;
  }
    .login-wrap .forgetPasswordBtn:hover {
      color: mediumblue;
      text-decoration:underline;
    }
    .login-wrap .footer {
      width: 100%;
      height: 69px;
      background: #fff;
      padding-top: 10px;
    }
    .login-wrap .footer .copyright-box p {
      font-size: 12px;
      color: #8e8e8e;
      line-height: 24px;
      text-align: center;
    }
    .login-wrap .ms-login .el-form-item__error {
      font-family: 'icomoon' !important;
    }
    .login-wrap .ms-login .el-form-item__error:before{
      content: '\e90a';
      display: inline-block;
      vertical-align: -0.8px;
      margin-right: 1px;
    }
    .login-wrap .el-input__inner {
      border-radius: 1px;
    }
</style>
