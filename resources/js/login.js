$(function(){//但文件匯入及加載完成,在執行裡面的自定義function();
  main();
})

function main(){
  var text=`
  <div class="main">
    <div class="left">
      <img src="./resources/img/login/left.png" alt="" class="left-img">
    </div> 

    <div class="right">
      <img src="./resources/img/login/right.png" alt="" class="right-img"> 
      <div class="top-img">
        <img src="./resources/img/login/logo.png" alt="" class="logo"> 
        <img src="./resources/img/login/title.png" alt="" class="title"> 
      </div>

      <div class="right-type"> 
        <div class="right-type-content">
        <div class="right-type-content-img" >
            <img src="./resources/img/login/username.png" alt="" style="width:26px;height:32px;">
        </div>
        <div class="right-type-content-input" >
            <input id="login_username" type="text" name="username" required lay-verify="required"  placeholder="請輸入帳號" class="layui-input"  autocomplete="off"  style="width:280px;height:50px;background:#f5faff;border:0px;">
        </div>
        </div>  

        <div class="right-type-content">
          <div class="right-type-content-img" >
              <img src="./resources/img/login/password.png" alt="" style="width:26px;height:32px;">
          </div>
          <div class="right-type-content-input" >
              <input id="login_password" type="password" name="password"  required lay-verify="required"  placeholder="請輸入密碼" class="layui-input"  autocomplete="off"  style="width:280px;height:50px;background:#f5faff;border:0px;">
          </div>
      </div>  
      <div class="type-button">
        <button id="Btn" type="button" class="layui-btn" style="width:180px;background:#1e52bc;">登入</button>
      </div>   
    </div>
  </div>
`;
  $("#app").html(text);
  $( "#Btn" ).click(function() {
    btn();
  });
}

function btn() {
  var acc=$('#login_username').val().trim();
  var pwd=$('#login_password').val().trim();
  
//登入判斷
  if(acc==""){
    layui.use('layer', function(){
      var layer = layui.layer;
      layer.msg("請輸入帳號",{icon:2});
    }); 
  }else{
    if(pwd==""){
      layui.use('layer', function(){
        var layer = layui.layer;
        layer.msg("請輸入密碼",{icon:2});
      });      
    }else{
      if(acc=="123" && pwd=="111"){
        layui.use('layer', function(){
          var layer = layui.layer;
          layer.msg("登入成功",{icon:1});
        });   
        var exerciseArr={
          "data":[]
        }
        localStorage.setItem('exerciseArr',JSON.stringify(exerciseArr));  
        var basketArr={
          "data":[]
        }
        localStorage.setItem('basketArr',JSON.stringify(basketArr));      
        var paperListArr={
          "data":[]
        }
        localStorage.setItem('paperListArr',JSON.stringify(paperListArr));     
        var TestArr={
          "data":[]
        }
        localStorage.setItem('TestArr',JSON.stringify(TestArr));     
        window.location.href='./pag/index.html';  
      }else{
        layui.use('layer', function(){
          var layer = layui.layer;
          layer.msg("帳號或密碼輸入錯誤",{icon:2});
        });
      }
    }
  }
}


