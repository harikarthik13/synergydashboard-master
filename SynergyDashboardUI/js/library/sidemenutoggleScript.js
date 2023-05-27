function funcHideMenuIn() {

  // $('.sidenav').toggleClass("in");
  $('.sidenav').addClass("in");
  $('.main-content').addClass("expand");
  $("#button-hide-menuOut").show();
  $("#button-hide-menuIn").hide();
  // e.preventDefault();
}

function funcHideMenuOut() {

  // $('.sidenav').toggleClass("in");
  $('.sidenav').removeClass("in");
  $('.main-content').removeClass("expand");
  $("#button-hide-menuIn").show();
  $("#button-hide-menuOut").hide();
  // e.preventDefault();
}

function fncQuickaction() {

  $("#activityDiv").hide();
  $("#table_main").hide();
  // $("#presales_task").hide();
  // $("#sddgd-actionitems").hide();
  var filter_val = JSON.stringify({});
  var result = callgetlist("GetQuickActionItems", filter_val);

  var options = "<option value=''>Select an activity</option>";
  for (var i = 0; i < result.length; i++) {
    options +=
      "<option value='" + result[i].Id + "'>" + result[i].ActionItem + "</option>";
  }

  $("#Action").html(options);
  $("#ActionSmall").html(options);
  $("#ActionBig").html(options);
  $("#div-QuickAction-Edit-Modal").appendTo('body').modal("show");
  $("#div-QuickAction-Edit-Modal .modal-body").css({"height": "130px"});
}

function fncQuickactiontraning() {
  $("#div-QuickAction-Add-Modal").appendTo('body').modal("show");
}
function fntrainingmaterials() {
  $("#div-training-materials-Add-Modal").appendTo('body').modal("show");
}

function fncProjectaction() {
  $("#div-project-detail-Modal").modal("show");
  $("#modal-submitproposal").modal("show");

}

function fncProjectdetailaction() {
  $("#modal-submitproposal").modal("show");
  $("#modal-submitproposal").modal("show");


}