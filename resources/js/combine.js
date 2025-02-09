$(function(){
  init();
})

function init(){
  var locationArr=["考試閱卷","組卷管理"];
  var locationText=publication(locationArr);
  var paperListData=JSON.parse(localStorage.getItem('paperListArr'));
  var arr=paperListData.data;
  var itemText=``;
  var itemNum=0;
  
  for(var i=0;i<arr.length;i++){
    var item=arr[i];
    itemNum++;
    itemText+=`
      <div style="position: relative;margin: 0 auto;width: 100%;margin-top:20px;border-bottom: 1px solid #5A5A5A;">
      ${itemNum}．${item.paperTitle}<span style="margin-left: 30px;position: relative;">建立日期：　${item.paperDate}</span>
      <div class="Delete-wrapper" onclick="deleteTaskType('${item.id}')">刪除</div>
      <div class="Delete-wrapper" onclick="AddTaskType('${item.id}')">查看  /  </div>
      </div>
    `;
  }
  var text=`
      <div id="public-header"></div>
      <div style="position: relative;margin: 0 auto;width: 100%;top:50px;">
          <div  style="width: 1200px;height: 100%;margin: 0 auto;text-align: center;position: relative;">
              <div style="width: 100%;height: 41.6px;position: relative;">
                ${locationText}
              </div>
          </div>
          <div style="position: relative;margin: 0 auto;width: 50%;height:90vh;border:solid #E4E7ED 1px;top:20px;">
              <div style="border-bottom: dashed red;margin-left: 20px;margin-right: 20px;margin-top: 35px;font-size: 15px;">考試組卷（預覽）</div>
              <div style="margin-left: 20px;margin-right: 20px;">${itemText}</div>
          </div>
      </div>
  `;
  $('#app').html(text);  
  publicHeader('public-header');//頁首
}

// 刪除考試組卷
function  deleteTaskType(target) {
  layui.use('layer', function(){
      var layer = layui.layer;
      layer.confirm('確認刪除此考試組卷嗎？', {
        btn: ['確認','取消'] //按钮
      }, function(){
        paperDelete(target);
      }, function(){});
  }); 
}

function paperDelete(target){
  var paperData=JSON.parse(localStorage.getItem('paperListArr'));
  var arr=paperData.data;
  var  newArr=[];
  for(var i=0;i<arr.length;i++){
    var item=arr[i];
    if(item.id!=target){//存取刪除
      newArr.push(item);
    }
  }
  paperData.data=newArr;
  localStorage.setItem('paperListArr',JSON.stringify(paperData));
  layui.use('layer', function(){
    var layer = layui.layer;
    layer.closeAll(); //關閉彈窗
  });   
  init();
}

function AddTaskType(target){
  var paperListArr=JSON.parse(localStorage.getItem('paperListArr'));
  var arr=paperListArr.data;
  var  newArr=[];
    for(var i=0;i<arr.length;i++){
      var item=arr[i];
      if(item.id==target){//存取刪除
        newArr.push(item);
      }
    } 
    paperListArr.data=newArr;
    console.log(newArr);
  localStorage.setItem('TestArr',JSON.stringify(paperListArr));
  init();
  window.location.href='./test.html';


 
}