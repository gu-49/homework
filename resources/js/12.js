function publicHeader(target) {
  var nvbarData=[{
   id:"school",
   label:"首頁",
   arr:[] 
  },{
    id:"isscue_combine",
    label:"出題組卷",
    arr:[
      {
      id:"isscue_combine_child",
      label:"章節出題"
      }
    ]
  }];
  var nvbarText=``;
  for (var i=0;i<nvbarData.length;i++){
    var item =nvbarData[i];
    nvbarText+=`
    <div class="nvabar-item">
      <div class="nvabar">${item.label}</div>
    </div>
    `;
    var text=`
      <div class="header-wrapper">
        <div class="header-content">
        <img src="../resources/img/header/logo.png" alt="" class="header-logo">
        <img src="../resources/img/header/title.png" alt="" class="header-title">
        <div  style="position:absolute; top:0px;left:180px;">
            ${nvbarText}
        </div>
        </div>
      </div>
    `;
  }
}