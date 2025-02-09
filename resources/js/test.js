$(function(){
    var paper=new PAPER();
    paper.init();
  })
  //js 原型鍊
  function PAPER(){
    this.locationArr=["出題組卷","章節出題","試題籃","試題預覽"];
  }
  
  PAPER.prototype={
    init:function (){
        var locationArr=this.locationArr;
        var locationText=publication(locationArr);
        var text=`
            <div id="public-header"></div>
            <div style="position: relative;width: 100%;top:50px;">
                <div  style="width: 1200px;height: 100%;margin: 0 auto;text-align: center;position: relative;">
                        <div style="width: 100%;height: 41.6px;position: relative;">
                            ${locationText}
                        </div>
                        <div id="paper-list-wrapper" style="width:900px;height: 100%;margin: 0 auto;border:solid #E4E7ED 1px;position: relative;"></div>
                </div>
            </div>   
        `;
        $('#app').html(text);  
        publicHeader('public-header');//頁首
        this.paper();//調用paper function
        var _this=this;
        $("#save-paper-btn").on('click',function(){
              _this.save();//作用域
        });
    },
    paper:function(){
      var text=`
          <div style="width:873.6px;margin: 0 auto;position: relative;">
              <div id="paper-header" style="margin-top:30px;"></div>
              <div id="paper-content" style="margin-top:10px;"></div>
          </div>
      `;
      $("#paper-list-wrapper").html(text);
      this.header();
      this.content();
    },
    header:function(){
      var locationArr=["學校：","班級：","姓名：","考號："];
      var itemText=``;
      for(var i=0;i<locationArr.length;i++){
        itemText +=`
          <div class="paperheaderwrapper" >${locationArr[i]}</div> 
          <div class="paperheaderwrapper-bottom" style="display:inline-block;"></div>
        `;
      }
      var TestArrData=JSON.parse(localStorage.getItem('TestArr'));
      var arr=TestArrData.data;
      var  newArr=[];
      for(var i=0;i<arr.length;i++){ 
          var item=arr[i];
          newArr=item.paperTitle;
       }  
      var text=`
          <div style="width:873.6px;height: 98px;margin: 0 auto;position: relative;">
              <div style="font-size: 20px;">${newArr}</div>
              <div  style="margin: 0 auto;margin-top:10px;width:610px;height:50px;position: relative;">${itemText}</div>
          </div>
      `;
      $("#paper-header").html(text);
    },
    content:function(){
        var TestArrData=JSON.parse(localStorage.getItem('TestArr'));
        var arr=TestArrData.data;
        var  newArr=[];
        for(var i=0;i<arr.length;i++){ 
            var item=arr[i];
            newArr=item.content;
         }  
         var radioText='';
         var checkboxText='';
         var judeText='';
         var comText='';
         var radioNum=0;
         var checkboxNum=0;
         var judeNum=0;
         var comNum=0;
         var radiotype='';
         var checkboxtype='';
         var judetype='';
         var comtype='';
         
         for(var i=0;i<newArr.length;i++){
             var item=newArr[i];
                 switch(item.type){
                   case 'radio':
                     radioNum++;
                     radiotype=`<div>一、單選題</div>`;
                     var optionNum=item.optionNum;
                     var optionText='';
                     for(var j=0;j<optionNum;j++){
                         var optionNumStr=String.fromCharCode(j+65);
                         optionText +=`
                             <div style="display:inline-block;margin-right: 10px;">${optionNumStr}</div>
                         `;
                     }
                     radioText+=`
                         <div >
                             <div style="margin-top:10px;position: relative;">${radioNum}.${item.title}</div>
                             <div style="margin-top:10px;position: relative;">${optionText}</div>
                         </div>
                     `;
                       break;
                     case 'checkbox':
                         checkboxNum++;
                         checkboxtype=`<div>二、多選題</div>`;
                         var optionNum=item.optionNum;
                         var optionText='';
                         for(var j=0;j<optionNum;j++){
                             var optionNumStr=String.fromCharCode(j+65);
                             optionText +=`
                                 <div style="display:inline-block;margin-right: 20px;">${optionNumStr}</div>
                             `;
                         }
                         checkboxText+=`
                             <div>
                                 <div style="margin-top:10px;position: relative;">${checkboxNum}.${item.title}</div>
                                 <div style="margin-top:10px;position: relative;">${optionText}</div>
                             </div>
                         `;
                         break;            
                     case 'jude':
                         judeNum++;
                         judetype=`<div>三、判斷題</div>`;
                         var  optionText =`
                               <div style="display:inline-block;margin-right: 20px;">對</div>
                               <div style="display:inline-block;margin-right: 20px;">錯</div>
                           `;
                         judeText+=`
                             <div>
                                 <div style="margin-top:10px;position: relative;">${judeNum}.${item.title}</div>
                                 <div style="margin-top:10px;position: relative;">${optionText}</div>
                             </div>
                         `;
                           break;    
                     case 'com':
                         comNum++;
                         comtype=`<div>四、問答題</div>`;
                         comText+=`
                               <div>
                                   <div style="margin-top:10px;position: relative;">${comNum}.${item.title}</div>
                               </div>
                           `; 
                           break;
                 }
         }
         var text=`
             <div style="margin-left: 30px;text-align: left;position: relative;">
                <div  style="position: relative;">${radiotype}<div style="margin-left: 15px;">${radioText}</div></div>
                 <div  style="margin-top:20px;position: relative;">${checkboxtype}<div style="margin-left: 15px;">${checkboxText}</div></div>
                 <div  style="margin-top:20px;position: relative;">${judetype}<div style="margin-left: 15px;">${judeText}</div></div>
                 <div  style="margin-top:20px;position: relative; margin-bottom: 50px;">${comtype}<div style="margin-left: 15px;">${comText}</div></div>
             </div>
         `;
         $("#paper-content").html(text);
       }
    }
     
     