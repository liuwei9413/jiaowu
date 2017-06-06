<template>
  <div class="header-wrapper">
    <div class="header">
      <div class="logo"><img src="../../resources/front/imgs/logo.png" alt=""></div>
      <div class="user-info">
        <el-dropdown trigger="click" @command="handleCommand">
                  <span class="el-dropdown-link">
                      <img class="user-logo" src="../../resources/front/imgs/common/cat.png">
                      欢迎回来，{{username}}
                  </span>
          <el-dropdown-menu slot="dropdown" class="leaveWrap">
            <el-dropdown-item command="loginout" class="leaveList">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        name: '译泰'
      }
    },
    computed:{
      username(){
        let username = JSON.parse(localStorage.getItem('userInfo')).name;
        return username ? username : this.name;
      }
    },
    mounted() {
      if (localStorage.getItem('userInfo') == '' || localStorage.getItem('userInfo') == null) {
        this.$router.push({path: '/login', query: ''});
        return;
      }
      ;
    },
    methods:{
      handleCommand(command) {
        if(command == 'loginout'){
          let $this = this;
          this.$ajax('logout',
          ).then(function (response) {
            console.log(response);
            if (response.code == 200){
              localStorage.removeItem('userInfo')
              $this.$router.push('/login');
            }
          }).catch(function (error) {
            console.log(error);
          });

        }
      }
    }
  }
</script>
<style scoped>
  .header-wrapper {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 48px;
    /*font-size: 22px;*/
    line-height: 70px;
    color: black;
    background: #fff;
  }
  .header-wrapper .header {
    width: 1024px;
    margin: 0 auto;
  }
  .header-wrapper .header .logo{
    float: left;
    width:262px;
    text-align: center;
  }
  .header-wrapper .header .logo img {
    width: 262px;
    height: 30px;
    margin-top: 10px;
    float: left;
    margin-left: 20px;
  }
  .header-wrapper .user-info {
    float: right;
    color: black;
    height: 30px;
    width: 175px;
    padding-top: 10px;
  }
  .header-wrapper .el-dropdown {
    height: 30px;
    width: 175px;
    top:0;
  }
  .header-wrapper .user-info .el-dropdown-link{
    box-sizing: border-box;
    position: relative;
    font-size: 12px;
    top:-22px;
    height: 30px;
    width: 175px;
    line-height: 30px;
    display: inline-block;
    padding-left: 35px;
    color: black;
    cursor: pointer;
    vertical-align: middle;
  }
  .header-wrapper .user-info .user-logo{
    position: absolute;
    left:0;
    top:0;
    width:30px;
    height:30px;
    border-radius: 50%;
  }
  .header-wrapper .el-dropdown-menu__item{
    text-align: center;
  }
  .leaveWrap {
    height: 30px;
    border-radius: 5px;
  }
  .leaveList{
    font-size: 12px;
    line-height: 30px;
    text-align: center;
  }
</style>
