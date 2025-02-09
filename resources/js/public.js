var Positioning_id;
var Positioning_label;
function publicHeader(target){ //target 事件属性可返回事件的目标节点（触发该事件的节点），如生成事件的元素、文档或窗口。
  //老師功能選單區
  var nvbarData=[
     {
       id:"school",
       label:"首頁",
       arr:[]
     },
     {
       id:"issue_combine",
       label:"出題組卷",
       arr:[
           {
             id:"issue_combine_chapter",
             label:"章節出題"
           },{
             id:"issue_combine_knowledge",
             label:"知識點出題"
           }
       ]
     },
     {
       id:"exam_mark",
       label:"考試閱卷",
       arr:[
           {
             id:"exam_mark_online",
             label:"在線考試"
           },
           {
             id:"exam_mark_manage",
             label:"組卷管理"
           }
       ]
     },
     {
       id:"expert_task",
       label:"專家題庫",
       arr:[
         {
           id:"expert_task_chapter",
           label:"章節出題"
         },{
           id:"expert_task_knowledge",
           label:"知識點出題"
         }
       ]
     },
     {
       id:"help_center",
       label:"幫助中心",
       arr:[]                     
     }
   ];
   //個人設定
    var userData=[
      {
        id:"user",
        label:"ShoreyCai",
        arr:[
          {
            id:"control_center",
            label:"管理中心"
          },{
            id:"Personal_center",
            label:"個人中心"
          },{
            id:"Log_out",
            label:"退出登入"
          }
        ]
      }
    ];
  //老師功能選單區輸出 
  var nvbarText=``;
  for(var i=0;i<nvbarData.length;i++){                        //將nvbarData的數組輸出.html
    var item = nvbarData[i];                                  //存取nvbarData的數組
    var childArr = item.arr;                                  //存取下拉值
    var childText=``;  
    var childClass=``;
    var titleimg=``;

    if(childArr.length != 0){
     //沒有值的選單不要顯示圖片
     titleimg +=`
        ${item.label}
        <div style="float:right;"><img src="../resources/img/header/triangle.png" alt="" width="9px" height="5.5px" ></div>
      `;
      for(var j=0;j<childArr.length;j++){
        //去除無值得框線
        childClass=`nvbar-item-child`;
        Positioning_label=childArr[j].label;
        childText +=`
          <div id="${childArr[j].id}" class="nvbar-item-child-title"  onclick="
          handleNavbar('${childArr[j].id}')">${childArr[j].label}</div>
        `; 
      }
    }else{
     titleimg +=`
     <div>${item.label}</div> 
     `;      
    }    
    nvbarText +=`
      <div id="${item.label}" class="nvbar-item" onmouseenter="enterNavbar('${item.id}')" onmouseleave="leaveNavbar('${item.id}')">                                          
        <div class="nvbar-item-title" >${titleimg}</div>
        <div id="${item.id}_child"  class="${childClass}" >${childText}</div>
      </div>
    `;  
  
  }

   //個人功能選單區輸出 
  var userText=``;
   for(var i=0;i<userData.length;i++){                        //將nvbarData的數組輸出.html
     var item = userData[i];                                  //存取nvbarData的數組
     var childArr = item.arr;                                  //存取下拉值
     var childText=``;  
     var childClass=``;
     if(childArr.length != 0){
      //沒有值的選單不要顯示圖片
       for(var j=0;j<childArr.length;j++){
         //去除無值得框線
         childClass=`nvbar-item-child`;
         childText +=`
         <div id="${childArr[j].id}" class="nvbar-item-child-title" onclick="handleNavbar('${childArr[j].id}')">${childArr[j].label}</div>
         `; 
       }
     }   //onclick="handleNavbar('${item.id}')"
     userText +=`
       <div id="${item.id}" class="nvbar-item" onmouseenter="enterNavbar('${item.id}')" onmouseleave="leaveNavbar('${item.id}')">                                          
         <div class="header-user-title" >
         <img src="../resources/img/header/user.png" alt="" class="header-user-img">
         <span style="font-size: 12px;font-family: DengXian;color: #fff;">${item.label}</span>
         <img src="../resources/img/header/triangle.png" alt="" width="9px" height="5.5px">
         </div>
         <div id="${item.id}_child"  class="${childClass}" >${childText}</div>
       </div>
     `;
   }
   
   //調入index.js
   var text=`
     <div class="header-wrapper">
       <div class="header-content">
          <img src="../resources/img/header/logo.png" alt="" class="header-logo">
          <img src="../resources/img/header/title.png" alt="" class="header-title">
          <div style="position:absolute; top:0px;left:180px; ">
            ${nvbarText}
            <div style="clear:both;"></div>
          </div>
          <div style="position:relative; float:right; width:120px;height: 50px;">
            ${userText}
         </div>
       </div>
     </div>
   `;
   $("#"+target).html(text);  //拼接調用index.js      
 }

 //區塊滑鼠移入效果
 var hoverHeaderTimeNum=0;
 var setCommonHeaderInterval;
 function enterNavbar(target){ 
    setCommonHeaderInterval=setInterval(function(){//循環定時器
      hoverHeaderTimeNum++;
      if(hoverHeaderTimeNum>0){
        var id = target; //觸發item.id
      $("#"+id+'_child').slideDown("fast");//加快下拉的速度調整
      }
    },200) 
 }

 function leaveNavbar(target) {
   hoverHeaderTimeNum=0;
   clearInterval(setCommonHeaderInterval);
   var id = target;// 觸發item.id
   switch(id){
    case 'school':
      window.location.href='./index.html';
      break;
   }
   $("#"+id+'_child').slideUp(200);//向上收回的速度
 }

 //滑鼠點擊
  function handleNavbar(target) {
    console.log(target);
   var id = target;
   switch(id){
     case 'issue_combine_chapter':
        window.location.href='./task.html';
        break;
    case'exam_mark_manage':
        window.location.href='./combine.html';
        break;
    case'exam_mark_online':
        window.location.href='./grades.html';
    break;    
    case 'Log_out':
        window.location.href = '../login.html'; 
      break;
   }
 }
//  頁尾
function publicFooter(target) {
  text=`
    <div class="footer-wrapper">
      <span >Copyright ©2019作业系统 版权所有 苏州博智电子科技有限公司</span>
    </div>
  `;
  $("#"+target).html(text);
}

function publication(arr) {
  var itemText=``;
  for(var i=0;i<arr.length;i++){
    itemText +=`
      <span>${arr[i]}</span>
    `;
    if(i != arr.length-1){
      itemText +=` <span> > </span>`;
    }
  }
  text=`
    <div class="task_Positioning">
    <span class="iconfont icon-dingweiweizhi" style="display:inline-block;position:relatvie;">
    <span style="color: dimgrey; font-size: 12px;">当前位置：首页 > ${itemText} </span>
    </span>
    </div>
  `;
  return text;
}

function getRandomIDSuffix() {
  var date = new Date();
  var month = date.getMonth()+1;
  var strDate = date.getDate();
  var hour =  date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  if(month >= 0 && month <=9){
    month = "0" + month;
  }
  if(strDate >= 0 && strDate <=9){
    strDate = "0" + strDate;
  }
  if(hour >= 0 && hour <=9){
    hour = "0" + hour;
  }
  if(minute >= 0 && minute <=9){
    minute = "0" + minute;
  }
  if(second >= 0 && second <=9){
    second = "0" + second;
  }  
  var activeTime=date.getFullYear()+month+strDate+hour+minute+second;
  var radFloat=Math.random()*100000;//隨即數
  var rad=Math.floor(radFloat);//隨即數取整
  var _id=activeTime+rad;
  return _id;     
}

function getActiveDate() {
  var date = new Date();
  var month = date.getMonth()+1;
  var strDate = date.getDate();
  if(month >= 0 && month <=9){
    month = "0" + month;
  }
  if(strDate >= 0 && strDate <=9){
    strDate = "0" + strDate;
  }
  var activeTime=date.getFullYear()+'-'+month+'-'+strDate;  
 return activeTime;
}