
function getUserMenus(classname) {
  var filter_val = JSON.stringify({
    "IsActive": true,
    "Status" : "",
    "Message" : ""
  });
  var result = callgetlist('GetDashBoardEmployeeMenuDetails', filter_val);
  var li = "<li onclick='funcHideMenuIn()' id='button-hide-menuIn'><a href='#'><span class='glyphicon glyphicon-chevron-left' width='20px' height='20px'></span></a></li>";
  li +="<li onclick='funcHideMenuOut()' id='button-hide-menuOut'><a href='#'> <span class='glyphicon glyphicon-chevron-right' width='20px' height='20px'></span></a></a></li>" 
  for (var i = 0; i < result.length; i++) {
    li += "<li><i> <img src='./image/dashboard/notes.png' width='20px' height='20px' /></i><div class='Synergy-menu-class'><span id='nav-title'>" + result[i].Menus + "</span></div></li>";
  }
  $("." + classname).html(li);
}