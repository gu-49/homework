$(function () {
  //註冊layui checkbox
  layui.config({
    base: '../resources/assets/'
  }).extend({
    xmSelect: 'xm-select'
  });
  init();
 
  exerciseList();
  basketDataInit();
})
// 位置導航


function init(){
  var locationArr=["出題組卷","章節出題"];
  var locationText=publication(locationArr);
  var text=` 
  <!---頁首--->
      <div id="public-header"></div>
      <!----區域內容---->
      <div style="position: relative;width: 100%;top:50px;">
            <!---試題籃--->
            <div class="taskBasketContentWrapper" id="taskBasketBtn-wrapper" style="width:0px;" data-show="flase">
              <div style="top: 0px;width:239px;margin: 0 auto;background:rgba(235,233,233,1);position: relative;">
                  <div style="width:90%;height:40px;line-height: 40px;color: #0048e5; font-size: 14px;font-family: SimHei;margin: 0 auto; ">我的試卷</div>
              </div> 
              <div id="basketContent" style="width:239px;margin: 0 auto;position: relative;"></div>            
              <div id="taskBasketBtn" class="taskBasketBtn" >
                  <div style="text-align:center;" > 
                      <div class="totalwapper"><span id="sum"></span></div>
                      <img src="../resources/img/task/task_basket.png" alt="" style="width:24px;height:15px;margin-top:15px;">
                      <span style="-webkit-writing-mode: vertical-rl;writing-mode: vertical-rl;font-size: 14px;margin-top: 6px;"> 試題籃 </span>
                  </div>
              </div>   
            </div>
            <!---試題呈現--->
            <div style="width: 100%;height:100%;margin: 0 auto;">
                <div  style="width: 1200px;height: 100%;margin: 0 auto;text-align: center;position: relative;">
                    <div style="width: 100%;height:100%;position: relative;">
                        <div style="width: 100%;height: 41.6px;position: relative;">
                            ${locationText}
                            <span id="add-exercise-btn" class="add-exercise-btn">+ 新增試題</span>
                        </div>
                        <div style="width: 100%;min-height: 800px;position: relative;">
                            <div id="exercise-list-wrapper" ></div>
                        </div>
                    </div>

            </div>
      </div>
      <!---頁尾--->
      <div id="public-footer" style=" margin-top: 20px;"></div>
  `;

  $('#app').html(text);
  publicHeader('public-header');
  publicFooter('public-footer');//頁尾
  $('#add-exercise-btn').on('click',function() {
    addExerciseInit();
  });
  /**試題籃 */
  $('#taskBasketBtn').on('click',function() {
      var show=$("#taskBasketBtn-wrapper").attr('data-show');                      // var width=document.getElementById("taskBasketBtn-wrapper").style.width;
      if(show=='false'){                                                           // switch(width){
          $("#taskBasketBtn-wrapper").css('width','239px');                        //   case '239px':
          $("#taskBasketBtn-wrapper").attr('data-show','true');                   //       document.getElementById("taskBasketBtn-wrapper").style.width = "0px";
      }else{                                                                      //       break;
          $("#taskBasketBtn-wrapper").css('width','0px');                          //   case '0px':
          $("#taskBasketBtn-wrapper").attr('data-show','false');                    //     document.getElementById("taskBasketBtn-wrapper").style.width = "239px";
      }                                                                              //    break;  
                                                                                  // }
    basketDataInit();
  });

}

function basketDataInit() {
  var data=JSON.parse(localStorage.getItem('basketArr'));
  var arr=data.data;
  var sum=arr.length;
  var radioNum=0;
  var checkboxNum=0;
  var judgNum=0;
  var comNum=0;
  for(var i=0;i<arr.length;i++){
      var item=arr[i];
      switch(item.type){
        case'radio':radioNum++;break;
        case'checkbox':checkboxNum++;break;
        case'jude':judgNum++;break;
        case'com':comNum++;break;
      }
  }
  var text=`
            <div style="width:90%;height:40px;line-height: 40px;color: #303133; font-size: 13px;font-family: SimHei;margin: 0 auto; ">
                最新加入試題<span style="color: #6F6F6F; font-size: 12px;font-family: SimHei;">（共<span id="total">${sum}</span>題）</span>
                <div  style="position: relative;">
                    <span>單選題</span><span style="margin-left:10px;">${radioNum}</span>
                    <div class="basketContent-wrapper"><span class="iconfont icon-shanchu" onclick="deleteTaskType('radio')" style=" font-size: 13px;"></span></div>
                </div>
                <div  style="position: relative;">
                    <span>多選題</span><span style="margin-left:10px;">${checkboxNum}</span>
                    <div class="basketContent-wrapper"><span class="iconfont icon-shanchu" onclick="deleteTaskType('checkbox')" style=" font-size: 13px;"></span></div>
                </div>
                <div  style="position: relative;">
                    <span>判斷題</span><span style="margin-left:10px;">${judgNum}</span>
                    <div class="basketContent-wrapper"><span class="iconfont icon-shanchu" onclick="deleteTaskType('jude')" style=" font-size: 13px;"></span></div>
                </div>             
                <div style="position: relative;">
                    <span>問答題</span><span style="margin-left:10px;">${comNum}</span>
                    <div class="basketContent-wrapper"><span class="iconfont icon-shanchu" onclick="deleteTaskType('com')" style=" font-size: 13px;"></span></div>
                </div>
                
                <div style="width:100%;height:40px;position: relative;">
                    <div class="basketContent-empty"> 
                        <span id="emptyExerciseList" class="iconfont icon-shanchu" style="font-size: 12px;font-family: SimHei;">
                        <span style="padding-left:4px;">清空試卷</span>
                        </span>
                    </div>
                </div> 
              <div id="taskBasketPreviewBtn" class="taskBasketPreviewBtnwrapper">試題預覽</div>
            </div>
  `;
  $("#basketContent").html(text);
  $("#sum").html(sum);
  $("#emptyExerciseList").on('click',function(){
    // 刪除試題藍所有題目類型
      layui.use('layer', function(){
          var layer = layui.layer;
          layer.confirm('確認刪除試題籃中所有試題嗎？', {
            btn: ['確認','取消'] //按钮
          }, function(){
            var basketArr={
              "data":[]
            }
            localStorage.setItem('basketArr',JSON.stringify(basketArr)); 
            layui.use('layer', function(){
              var layer = layui.layer;
              layer.closeAll(); //關閉彈窗
            });   
            exerciseList();//刷新頁面/讀取資料
            basketDataInit();
          }, function(){});
      }); 
  })
    publicFooter('public-footer');//頁尾
  $('#taskBasketPreviewBtn').on('click',function() {
    window.location.href='./paper.html';
  });
}

function addExerciseInit() {
  var typeArr=[
    {id:"radio",label:"單選題"},
    {id:"checkbox",label:"多選題"},
    {id:"jude",label:"判斷題"},
    {id:"com",label:"問答題"}
  ];
  // 預設介面 樣式
  var typeText=``;
  for(var i=0;i<typeArr.length;i++){
    var item = typeArr[i];
    if(i==0){
        typeText =`
          <div id="${item.id}" class="add-type-btn-active">${item.label}</div>
        `;
    }else{
        typeText +=`
          <div id="${item.id}" class="add-type-btn">${item.label}</div>
        `;  
    }
  }

  var text=`
  <div style="width:90%;margin: 0 auto;">
      <div style="padding:20px;">
        ${typeText}
      </div>
      <div id="exercise-wrapper"　style="padding-top:20px;">
          <form class="layui-form" action="">
              <div class="layui-form-item">
                  <label class="layui-form-label">試題題幹：</label>
                  <div class="layui-input-block">
                    <textarea name="title" placeholder="请输入内容" class="layui-textarea"></textarea>
                  </div>
              </div>
              <div id="option-warpper" class="layui-form-item"></div>
              <div class="layui-form-item">
                  <label class="layui-form-label">答案解析：</label>
                  <div class="layui-input-block">
                    <textarea name="answer" placeholder="请输入内容" class="layui-textarea"></textarea>
                  </div>
              </div>
              <div class="layui-form-item">
                  <label class="layui-form-label">解答過程：</label>
                  <div class="layui-input-block">
                    <textarea name="complete" placeholder="请输入内容" class="layui-textarea"></textarea>
                  </div>
              </div>
              <div class="layui-form-item">
                  <label class="layui-form-label">試題點評：</label>
                  <div class="layui-input-block">
                    <textarea name="commite" placeholder="请输入内容" class="layui-textarea"></textarea>
                  </div>
              </div>   
              <div class="layui-form-item">
                    <div style="text-align:center;padding:20px;">
                        <button id="submit-add-btn" type="button" class="layui-btn sumbit-btn" style="background: #0048e1;width: 260px;height: 40px;line-height: 40px;color:#fff;">保存並加試卷</button>
                    </div>
              </div>                                       
          </form>    
      </div>
      </div>
  `;
  layui.use('layer', function(){
      var layer = layui.layer;
      layer.open({
        type: 1,
        //skin: 'layui-layer-rim', 加上边框
        area: ['1200px', '700px'], //宽高
        content: text
      });
      handleChangTypeBtn(typeArr);
      justifyMode('radio');
      $("#submit-add-btn").on('click',function () {
        justifyAddform();
      })
  }); 
}

var modeVal='radio';
function handleChangTypeBtn(typeArr) {
   for(var j=0;j<typeArr.length;j++){
        var item=typeArr[j];
        (function (item) {        //[立即執行]的function後有() 暱名函數
            $("#"+item.id).on('click',function() {   //沒能及時觸發,所以綁定一個function
              //$(this).removeClass('add-type-btn').addClass('add-type-btn-active');
               for(var k=0;k<typeArr.length;k++){
                var item2=typeArr[k];
                if(item2.id == item.id){
                  modeVal=item.id;
                  $('#'+item2.id).removeClass('add-type-btn').addClass('add-type-btn-active');   // removeClass移除樣式 addClass新增樣式
                  justifyMode(item.id);
                }else{
                  $('#'+item2.id).removeClass('add-type-btn-active').addClass('add-type-btn');
                }
              }
            });
        })(item);
      }  
}
 
function justifyMode(target) {
  switch(target){
    case 'radio':
      radioInit();
      break;
    case'checkbox':
      checkboxInit();
      break;
    case'jude':
      judgInit();
      break;
    case 'com':
      comInit();
      break;
  }
}
// 單選題
function radioInit() {
  var numCountText=numCount(4,'radio');
  var text=`
            <label class="layui-form-label">選項數：</label>
            <div class="layui-input-block">
                <div style="float:left;">${numCountText}</div>
                <div style="float:left;margin-left:20px;line-height:40px;color: #676767;" class="layui-input-block">
                   <div  style="float:left;">正確答案：</div>
                   <div id="radio-select-wrapper"  style="float:left;"></div>
                </div>
              <div style="clear:both;"></div>
            </div>
  `;
  $('#option-warpper').html(text);
  radioOptionInit();
 } 
//  計數器exercise-list-header
function numCount(num,type) {
  var text=`
    <div>
      <div class="num-count-operate num-count-reduce" onclick="numCountReduce(${type})"> - </div>
      <div class="num-count-input-wrapper">
        <input id="num-count-input" type="text" class="layui-input" value="${num}" style="text-align:center;padding:0px;">
      </div>
      <div class="num-count-operate num-count-plus"  onclick="numCountPlus(${type})"> + </div>
      <div style="clear:both;"></div>
    </div>
  `;
  return text;
}
// 點選題  控制題數-
function numCountReduce(type) {
  var target=type.id;
  var num=$('#num-count-input').val().trim();
  if(!isNaN(num)){
    if(num>2){
      num--;
      $("#num-count-input").val(num);
      switch(target){
        case 'radio':radioOptionInit();break;
        case 'checkbox':checkboxOptionInit();break;
      }
    }
  }
}
//點選題  控制題數+  
function numCountPlus(type) {
  var target=type.id;
  var num=$('#num-count-input').val().trim();
  if(!isNaN(num)){
    if(num>2){
      num++;
      $("#num-count-input").val(num);
      switch(target){
        case 'radio':radioOptionInit();break;
        case 'checkbox':checkboxOptionInit();break;
      }
    }
  }
}
//單選題數加減
function radioOptionInit(){
  var num=Number($('#num-count-input').val());
  var optionText=``;
  for(var i=0;i<num;i++){
    var numVal=String.fromCharCode(i+65);//String.fromCharCode() ASCII編碼
    optionText +=`
      <option value="${numVal}">${numVal}</option>
    `;
  }
  var text =`
      <div>
          <select name="radio" lay-verify="required">
            <option value=""></option>
            ${optionText}
          </select>
      </div>   
  `;

  $("#radio-select-wrapper").html(text);
// 套用layui
  layui.use('form', function(){
      layui.form.render();//復用
  });
}

//多選題
function checkboxInit() {
  var numCountText=numCount(4,'checkbox');
  var text=`
            <label class="layui-form-label">選項數：</label>
            <div class="layui-input-block">
                <div style="float:left;">${numCountText}</div>
                <div style="float:left;margin-left:20px;line-height:40px;color: #676767;" class="layui-input-block">
                   <div  style="float:left;">正確答案：</div>
                   <div id="checkbox-select-wrapper"  style="float:left;width:200px;"></div>
                </div>
              <div style="clear:both;"></div>
            </div>
  `;
  $('#option-warpper').html(text);
  checkboxOptionInit();//預設值
}
//多選題
var checkboxAnswer='';
function checkboxOptionInit() {
  var num=Number($('#num-count-input').val()); 
  var arr=[];
  for(var i=0;i<num;i++){
    var word=String.fromCharCode(i+65);
    var obj={
      name:word,
      value:word
    }
    arr.push(obj);//導入arr
  }

  layui.use(['xmSelect'], function(){
    var xmSelect = layui.xmSelect;
    //渲染多选
    var demo1 = xmSelect.render({
        el: '#checkbox-select-wrapper', //呼叫div id
        data:arr,
        on({arr}){//監聽
          const animals = [];
          for(var i=0; i<arr.length;i++){
              checkboxAnswer=arr[i]['value'];
              const  answerStr = animals.push(""+arr[i]['value']+"");  
              checkboxAnswer=animals.sort();     
          }
          while (arr.length) {
            arr.pop();
          }
          for(var k=0;k<checkboxAnswer.length;k++){
              var cun=checkboxAnswer[k];
              var obj2={
                name:cun,
                value:cun
              }
              arr.push(obj2);                 
          }        
        }
    })
  })
}
// 判斷題
function judgInit() {
  var text=`
      <label class="layui-form-label">正確答案：</label>
      <div class="layui-input-block">
          <div id="judg-select-wrapper"  style="float:left;"></div>
      </div>
  `;
  $('#option-warpper').html(text);
  judgOptionInit();
}

function judgOptionInit(){
  var text =`
      <div>
          <select name="judg" lay-verify="required">
            <option value=""></option>
            <option value="對">對</option>
            <option value="錯">錯</option>
          </select>
      </div>   
  `;
  $("#judg-select-wrapper").html(text);
// 套用layui
  layui.use('form', function(){
      layui.form.render();//復用
  });
}

//問答題
function comInit() {
    var text=`
        <label class="layui-form-label">正確答案：</label>
        <div class="layui-input-block">
          <textarea name="com" placeholder="请输入内容" class="layui-textarea"></textarea>
        </div>    
    `;
    $('#option-warpper').html(text);
    layui.use('form', function(){
      layui.form.render();//復用
  });
} 

function justifyAddform() {
  var textareaArr=$("textarea");
  var titleVal=``;
  var answerVal=``;
  var completeVal=``;
  var commiteVal=``;
  for(var i=0;i<textareaArr.length;i++){ //立即執行每個if裡的變數才能存取到值
    var item = textareaArr[i];                                                  //第二種
         (function (item) {                                                     //   switch(item.name){
               if(item.name=='title'){                                          //    case'title':
                    titleVal=item.value;                                        //     titleVal=item.value;
               }                                                                //     break;
               if(item.name=='answer'){                                         //     case'answer':
                    answerVal=item.value;                                       //     answerVal=item.value;
               }                                                                //     break;
               if(item.name=='complete'){                                       //     case'complete':
                    completeVal=item.value;                                     //     completeVal=item.value;
               }                                                                //     break;   
               if(item.name=='commite'){                                        //     case'commite':
                    commiteVal=item.value;                                      //     commiteVal=item.value;
               }                                                                //     break;              
           })(item)                                                             //   }
  }

  if(titleVal==''){
    layui.use('layer', function(){
      var layer = layui.layer;
      layer.msg("請輸入試題題幹",{icon:5});
    });
    return; 
  }

  var optionVal=``;
  var optionNum=0;
  switch(modeVal){
    case 'radio':
      optionVal=$("select option:selected").val();//獲取下拉選戴單被選區的選項
      optionNum= Number($('#num-count-input').val()); 
      break;
    case'checkbox':
      optionVal=checkboxAnswer;
      optionNum=Number($('#num-count-input').val()); 
      break;
    case'jude':
      optionVal=$("select option:selected").val();
      break;
    case 'com':
      optionVal=$("textarea[name='com']").val();
      break;
   }
 
   var activeid= getRandomIDSuffix();
   var activeDate=getActiveDate();
   var obj={
      id:activeid,
      title:titleVal,
      answer:answerVal,
      complete:completeVal,
      commite: commiteVal,
      optionNum:optionNum,
      optionval:optionVal,
      type:modeVal,
      date:activeDate
   };

  var exerciseArr=JSON.parse(localStorage.getItem('exerciseArr'));//解析字符串
  exerciseArr["data"].push(obj);
   localStorage.setItem('exerciseArr',JSON.stringify(exerciseArr));//存取容量大,無時間限制
   layui.use('layer', function(){
    var layer = layui.layer;
    layer.closeAll(); //關閉彈窗
  }); 
  exerciseList();
}

function exerciseList() {
  var exerciseArr=JSON.parse(localStorage.getItem('exerciseArr'));
  var arr=exerciseArr.data.reverse();//.reverse()倒敘
  var itemText=``;
  for(var i=0;i<arr.length;i++){
    var item=arr[i];
    var typeText='';
    switch(item.type){
        case 'radio':typeText='單選題';break;
        case 'checkbox':typeText='多選題';break;
        case 'judg':typeText='判斷題';break;
        case 'com':typeText='問答題';break;
    }

   var addBtnText=basketAddbtn(item.id);
    itemText +=`
      <div style="border:1px solid rgba(231,235,250,1);text-align: left;margin-top:10px;position: relative;">
            <div class="exercise-list-header">
                <div style="display:inline-block;">
                    題號：${item.id}
                </div>
                <div style="display:inline-block;margin-left:15px;margin-left:20px;">
                    題型：${typeText}
                </div>
                <div style="display:inline-block;margin-left:15px;margin-left:20px;">
                    日期：${item.date}
                </div>
                <!---刪除--->
                <div class="exercise-list-header-icon">
                  <span id="listDelete-${item.id}" class="iconfont icon-shanchu" onclick="handleDeleteListItem('listDelete-${item.id}')"></span>
                </div>
            </div> 
           <div style="position: relative;">
                <div style="padding:10px;font-size: 13px;position: relative;">
                    ${item.title}${addBtnText}
                </div>
           </div>
      </div>
       
    `;
  } 
  $("#exercise-list-wrapper").html(itemText);
}
 //是否重複存取試題 ${addBtnText}
function basketAddbtn(target) {                          
  var basketArr=JSON.parse(localStorage.getItem('basketArr'));
  var basketData=basketArr.data;
  var isHas=false;
  for(var j=0;j<basketData.length;j++){
    if(basketData[j].id==target){
        isHas=true;
    }
  }
  var text=``;
  if(!isHas){
      text=`<div style="position: relative; text-align: right;"><img src="../resources/img/task/add_task_item.png" alt="" style="width:70px;height:26px;" onclick="handleAddBasket('listAdd-${target}')"></div>`; 
  }else{
      text=`<div style="position: relative; text-align: right;"><img src="../resources/img/task/delete_task_item.png" alt="" style="width:70px;height:26px;" onclick="handleDetele('listdelete-${target}')"></div>`;   
  }
  return text;
}
// 試題刪除
function  handleDeleteListItem(target) {
  var arr=target.split('-');//切割 - 
  var activeid=arr[1];
  layui.use('layer', function(){
      var layer = layui.layer;
      layer.confirm('確認刪除試題籃中此試題嗎？', {
        btn: ['確認','取消'] //按钮
      }, function(){
        deleteListEachExercise(activeid);
      }, function(){});
  }); 
}

function deleteListEachExercise(activeid) {
  var exerciseData=JSON.parse(localStorage.getItem('exerciseArr'));
  var arr=exerciseData.data;
  var  newArr=[];
  for(var i=0;i<arr.length;i++){
    var item=arr[i];
    if(item.id!=activeid){//存取刪除
      newArr.push(item);
    }
  }
  exerciseData.data=newArr;
  localStorage.setItem('exerciseArr',JSON.stringify(exerciseData));
  layui.use('layer', function(){
    var layer = layui.layer;
    layer.closeAll(); //關閉彈窗
  });   
  exerciseList();//刷新頁面/讀取資料
}
//試題增加
function handleAddBasket(target) {
  var arr=target.split('-');//切割 - 
  var activeid=arr[1];
  var exerciseData=JSON.parse(localStorage.getItem('exerciseArr'));
  var arr=exerciseData.data;
  for(var i=0;i<arr.length;i++){
    var item=arr[i];
    if(item.id==activeid){//存入試題籃
        var basketArr=JSON.parse(localStorage.getItem('basketArr'));
        basketArr["data"].push(item);
        localStorage.setItem('basketArr',JSON.stringify(basketArr));    
        exerciseList();//刷新頁面/讀取資料
        basketDataInit(); 
    }
  }  
}
// 試題藍移除
function  handleDetele(target) {
  var arr=target.split('-');//切割 - 
  var activeid=arr[1];  
  var basketArrData=JSON.parse(localStorage.getItem('basketArr'));
  var arr=basketArrData.data;
  var  newArr=[];
  for(var i=0;i<arr.length;i++){
    var item=arr[i];
    if(item.id!=activeid){//存取刪除
      newArr.push(item);
    }
  }
  basketArrData.data=newArr;
  localStorage.setItem('basketArr',JSON.stringify(basketArrData));
  layui.use('layer', function(){
    var layer = layui.layer;
    layer.closeAll(); //關閉彈窗
  });   
  exerciseList();//刷新頁面/讀取資料
  basketDataInit(); 
}

// 移除試題藍題目類型
function  deleteTaskType(target) {
  layui.use('layer', function(){
      var layer = layui.layer;
      layer.confirm('確認刪除試題籃中此類試題嗎？', {
        btn: ['確認','取消'] //按钮
      }, function(){
        deleteTaskTypewrapper(target);
      }, function(){});
  }); 
}

function  deleteTaskTypewrapper(target) {
  var basketArrData=JSON.parse(localStorage.getItem('basketArr'));
  var arr=basketArrData.data;
  var  newArr=[];
    for(var i=0;i<arr.length;i++){
      var item=arr[i];
      if(item.type!=target){//存取刪除
        newArr.push(item);
      }
    } 
  basketArrData.data=newArr;
  localStorage.setItem('basketArr',JSON.stringify(basketArrData));
  layui.use('layer', function(){
    var layer = layui.layer;
    layer.closeAll(); //關閉彈窗
  });   
  exerciseList();//刷新頁面/讀取資料
  basketDataInit(); 
}




