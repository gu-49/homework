$(function () {
  init();
  //Featuredcenter();
  mainClassifyInit();
})

function init(){
  //必須先設定一個div & id
  text=`
  <div style="position: relative;width: 100%;height: 100%;"">
    <div id="public-header"></div>
    <div class="Marquee">
      <div style="position: relative;width: 100%;height: 320px;">
      <div class="layui-carousel" id="carousl-wrapper">
        <div carousel-item style=" width: 100%;height: 100%;">
          <div><img src="../resources/img/wrapper/s1.png" alt="" class="carousel-item-image"></div>
          <div><img src="../resources/img/wrapper/s2.png" alt="" class="carousel-item-image"></div>
          <div><img src="../resources/img/wrapper/s3.png" alt="" class="carousel-item-image"></div>
          <div><img src="../resources/img/wrapper/s4.png" alt="" class="carousel-item-image"></div>
        </div>
      </div>
      </div>
      <div style="position: relative;width: 100%;height: 488.63px;">
        <div class="Featured">
          <div id="homeRecommendModel" style="position: relative;width: 1200px;height: 91.6px;"></div>
          <div style="position: relative;width: 1200px;"></div>
          <div id="time" style="position: relative;width: 1200px;height:100px;">
          </div>
        </div>
      </div>
    </div>
    <div id="public-footer" style="top: 250px;z-index:0;position: relative;"></div>
  </div>  
  `;
  $('#app').html(text);
  //定義一個function 調用(引用)函數
  publicHeader('public-header'); //頁首
  publicFooter('public-footer');//頁尾
  Featuredcenter();//內容
  Featuredtime();//時間
  //跑馬燈layui 

   //淡出
   layui.use('carousel', function(){
    var carousel = layui.carousel;
    //建造实例
    carousel.render({
      elem: '#carousl-wrapper'
      ,width: '100%' //设置容器宽度
      ,height:'320px'
      ,arrow: 'always' //始终显示箭头
      //,anim: 'updown' //切换动画方式
    });
  });  
}

//json 
function Featuredcenter() {
  $.ajax({
    url:'data.json',
    type:'GET',
    dateType:'json',
    data:{},
    success: function (json) {
      if (json.code == '1'){
        var data=json.data;
        mainClassifyInit(data);
      }
    },
	error: function(response) {
		// console.log(response);
	}
  })
}

function mainClassifyInit(json) {
  var Featuredtext=``;
  var setup=``;
  for (var i=0;i<json.length;i++){ 
    var itemid=json[i].id;
    var itemlabel=json[i].label;
    //設定樣式
    switch(itemid){
        case '1':
          childClass=`homeRecommendItemWrapper`;
          setup =`${itemlabel}`;
        break;
        case '2':
          childClass=`homeRecommendItemWrapper2`;
          setup =`${itemlabel}`;
        break;
        case '3':
          childClass=`homeRecommendItemWrapper3`;
          setup =`${itemlabel}`;
        break;
        case '4':
          childClass=`homeRecommendItemWrapper4`;
          setup =`${itemlabel}`;
        break;
        case '5':
          childClass=`homeRecommendItemWrapper5`;
          setup =`${itemlabel}`; 
        break;     
    };
    Featuredtext +=`
        <div  class="${childClass}" >
            <div class="homeRecommendItemTitle">
            <div class="homeRecommendItemTitle-center">
              <img src="../resources/img/wrapper/recommend.png" alt="" style="width:25px;height:20px;" />
              <div class="homeRecommendItemTitle-centertext">${setup}</div>
            </div>
            <div class="homeRecommendItemLabel">精品推薦</div>
            </div>
        </div>
    `;
  }
  var text=`
    <div>${Featuredtext}</div>
  `;
  $('#homeRecommendModel').html(text);
}
function Featuredtime(){
  var text=`
  <div style="margin-top: 30px;">
  <fieldset class="layui-elem-field layui-field-title" style="height:0px;">
      <legend>常规时间线</legend>
    </fieldset>
    <ul class="layui-timeline">
      <li class="layui-timeline-item">
        <i class="layui-icon layui-timeline-axis"></i>
        <div class="layui-timeline-content layui-text">
          <h3 class="layui-timeline-title">8月18日</h3>
          <p>
            layui 2.0 的一切准备工作似乎都已到位。发布之弦，一触即发。
            <br>不枉近百个日日夜夜与之为伴。因小而大，因弱而强。
            <br>无论它能走多远，抑或如何支撑？至少我曾倾注全心，无怨无悔 <i class="layui-icon"></i>
          </p>
        </div>
      </li>
      <li class="layui-timeline-item">
        <i class="layui-icon layui-timeline-axis"></i>
        <div class="layui-timeline-content layui-text">
          <h3 class="layui-timeline-title">8月16日</h3>
          <p>杜甫的思想核心是儒家的仁政思想，他有<em>“致君尧舜上，再使风俗淳”</em>的宏伟抱负。个人最爱的名篇有：</p>
          <ul>
            <li>《登高》</li>
            <li>《茅屋为秋风所破歌》</li>
          </ul>
        </div>
      </li>
      <li class="layui-timeline-item">
      <i class="layui-icon layui-timeline-axis"></i>
      <div class="layui-timeline-content layui-text">
        <h3 class="layui-timeline-title">8月16日</h3>
        <p>杜甫的思想核心是儒家的仁政思想，他有<em>“致君尧舜上，再使风俗淳”</em>的宏伟抱负。个人最爱的名篇有：</p>
        <ul>
          <li>《登高》</li>
          <li>《茅屋为秋风所破歌》</li>
        </ul>
      </div>
    </li>
    
      <li class="layui-timeline-item">
        <i class="layui-icon layui-timeline-axis"></i>
        <div class="layui-timeline-content layui-text">
          <div class="layui-timeline-title">过去</div>
        </div>
      </li>
    </ul>  
    </div>
    `;
    $('#time').html(text);
}