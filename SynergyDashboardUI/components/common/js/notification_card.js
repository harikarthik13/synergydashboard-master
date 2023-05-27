$(document).ready(function () {
    var localget = localStorage.getItem("UserCheckRes");
    var jsonData = JSON.parse(localget);
    EmployeeId = jsonData.Data["0"].EmployeeID;  
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    currentdate = mm + '/' + dd + '/' + yyyy;
    
    announcementCard();
    bindleavebalance();
})

function bindleavebalance() {
    var leavebalance = callgetlist('GetLeaveBalance', '{"TillDate":"' + currentdate + ' ","EmployeeId":"' + EmployeeId + '"}')
    var data = mapLeavebalance(leavebalance);
}
function mapLeavebalance(leavebalance) {
    leavebalance.forEach(function (key, item) {
        var ledgerCLClass="";
        var ledgerELClass="";
        var ledgerCompOffClass="";
         //$("#lbcasualleave").text(key.CLBalance).addClass(ledgerCLClass);
        if(key.CLBalance >= 1){
            ledgerCLClass="label-success";
        }
        else if(key.CLBalance > 0 &&  key.CLBalance < 1){
            ledgerCLClass="label-warning";
        }else{
            ledgerCLClass="label-danger";
        } 
        //ELBalance
        if(key.ELBalance >= 1){
            ledgerELClass="label-success";
        }
        else if(key.ELBalance > 0 &&  key.ELBalance < 1){
            ledgerELClass="label-warning";
        }else{
            ledgerELClass="label-danger";
        }   

        //CompOffBalance
        if(key.CompOffBalance >= 8){
            ledgerCompOffClass="label-success";
        }
        else if(key.CompOffBalance > 0 &&  key.CompOffBalance < 8){
            ledgerCompOffClass="label-warning";
        }else{
            ledgerCompOffClass="label-danger";
        } 
        $("#lbcasualleave").text(key.CLBalance +" day(s)").addClass(ledgerCLClass);
        $("#lbearnedleave").text(key.ELBalance +" day(s)").addClass(ledgerELClass);
        $("#lbcompensation").text(key.CompOffBalance +" hours").addClass(ledgerCompOffClass);
    })
}

function announcementCard() {
  var GetAnnouncementCardList = callgetlist('GetAnnouncementForDashboard', '{"IsActive":"True"}');  
  var mapannouncementListHtml = mapannouncementCardcomputeHTML(GetAnnouncementCardList);
  $('#announcementCardvalue').html(mapannouncementListHtml);
  if(document.getElementById("announcementCardvalue") != null){
    document.getElementById("announcementCardvalue").innerHTML = (mapannouncementListHtml == null ? "" : mapannouncementListHtml)
  }

  
  }
function mapannouncementCardcomputeHTML(GetAnnouncementCardList) {
  var html = "";
  $('#subjectdata').html("");
  if (GetAnnouncementCardList == "") {
    html += "<tr colspan='9'><td>No Data Found.!</td></tr>";
  } else {

    GetAnnouncementCardList.forEach(function (key, item) {
      if(key.ShowNewTag)
      {
        html += "<li onclick=showcarddata('" + key.AnnouncementId + "') id='" + key.AnnouncementId + "' >" + key.Subject + " <img src='image/new.png' style='width:30px;height:25px;'> </li>";
      }
      else
      {
        html += "<li onclick=showcarddata('" + key.AnnouncementId + "') id='" + key.AnnouncementId + "' >" + key.Subject + " </li>";
      }     
    });

  }
  return html;
}
function showcarddata(announcementId) {
  $('#showcarddatadetails').appendTo("body").modal("show");
  var C_GetAnnouncementdata = callgetlist('GetAnnouncementById', '{"IsActive":"True","AnnouncementId":"' + announcementId + '"}');
  var mapannouncementcaed = mapcardannouncementDatacomputeHTML(C_GetAnnouncementdata);
  $('#announcementcarddata').html(mapannouncementcaed);
}

function mapcardannouncementDatacomputeHTML(C_GetAnnouncementdata) {
    var html = "";
    if (C_GetAnnouncementdata == "") {
        html += "<tr colspan='9'><td>No Data Found.!</td></tr>";
    } else {
        C_GetAnnouncementdata.forEach(function (key, item) {
            var data = key.Content;
            if (data == "") {
                html += "-- No Record --";
            }
            else {
                html += key.Content;
            }
            $('#subjectdata').html(key.Subject);
        });
    }
    return html;
}

/*- Leave Balance - Swipe -*/
$(document).ready(function () {
    var setManualSwipeValue = callgetlist('GetEmployeeSwipePunchStatus', '{"EmployeeId":"' + EmployeeId + '"}');
    getNotificationCardDetails();
    var current_status = false;
    
    if(setManualSwipeValue[0].Status == "In") {
        current_status = true;
        swipeSwitchcolor(true);
    }else{
        swipeSwitchcolor(false);
    }

    $("#manual-swipe").dxSwitch({
        value: current_status,
        switchedOnText:'IN',
        switchedOffText:'OUT',
        onValueChanged: function(data) {
            swipeSwitchcolor(data.value);
            console.log(data.value);
            postSwipe(data.value);
            getNotificationCardDetails();
        }
    });
    function postSwipe(current_swipe_value) {
        var setManualSwipeValue = callgetlist('PostEmployeeSwipePunchStatus', '{"Message":"","Status":"'+ current_swipe_value +'","EmployeeId":"' + EmployeeId + '"}' );
    }

    
});

function swipeSwitchcolor(status){
    if (status === true) {
        $('head').append('<style>.dx-switch-handle:before{background-color:#5cb85c !important;}</style>');

    } else {
        $('head').append('<style>.dx-switch-handle:before{background-color:#dd2c36 !important;}</style>');
    }
}  

function getNotificationCardDetails() {
    getswipeLogs();
        var billiableHours = callgetlist('GetEmployeeWorkingBilliableHours', '{"EmployeeId":"' + EmployeeId + '"}');
    if(billiableHours != null){
        var billableDetails = billiableHours[0];
        $("#LoggedHoursToday").text(billableDetails.LoggedHourToday);
        $("#BillableHoursToday").text(billableDetails.BillableHourToday);
        $("#LoggedHoursMonth").text(billableDetails.LoggedHourMonth);
        $("#BillableHoursMonth").text(billableDetails.BillableHourMonth);
        $("#ApprovedHoursMonth").text(billableDetails.ApprovedBillableHourMonth);
        $("#LoggedHoursYear").text(billableDetails.LoggedHourYear);
        $("#BillableHoursYear").text(billableDetails.BillableHourYear);
        $("#ApprovedHoursYear").text(billableDetails.ApprovedBillableHourYear);
        // $('#punchedInHrs').text(getHhMmFromPoint(billableDetails.LoggedHourToday));
    }
    }

function getswipeLogs() {
    var swipeLogs = callgetlist('GetCurrentDaySwipeLogs', '{"EmployeeId":"' + EmployeeId + '"}');
    var i_scroller = $("#divSwipeLogs").dxList({
        dataSource: swipeLogs,
        itemTemplate: function (data, index) {
            var result = $("<div>").addClass("swipe");
            $("<div style=float:left;>").text(data.Status == "In" ? "Swipe In:" : "Swipe Out:").appendTo(result);
            if (data.Status == "In") {
                $("<div>").addClass("btn btn-success pull-right btn-xs").css("font-weight", "bold")
                    .html(moment(data.PunchDate).format('hh:mm A')).appendTo(result);

            } else {
                $("<div>").addClass("btn btn-danger pull-right btn-xs").css("font-weight", "bold")
                    .html(moment(data.PunchDate).format('hh:mm A')).appendTo(result);
            }
            if (data.Unit == "MANUAL") {
                if (data.Approved == true) {
                    $("<span>").addClass("SwipeCircleGreen pull-right badge").attr("data-toggle", "tooltip").attr("data-placement", "left").attr("title", "Approved Manual Entry").attr("data-container", "body").html("M").appendTo(result);
                } else {
                    $("<span>").addClass("SwipeCircleRed pull-right badge").attr("data-toggle", "tooltip").attr("data-placement", "left").attr("title", "Unapproved Manual Entry").attr("data-container", "body").html("M").appendTo(result);
                }
                $('[data-toggle="tooltip"]').tooltip();
            }
            return result;
        }
    }).dxList("instance");
    var i_height = i_scroller.scrollHeight();
    i_scroller.scrollTo(i_height);
}

function getHhMmFromPoint(pointVal){
    hh = Number(pointVal.toString().split('.')[0]);
    mm = Number(pointVal.toString().split('.')[1]);
    if (!hh) hh = 0;
    if (!mm) mm = 0;
    if (hh < 10) hh = '0' + hh;
    if (mm < 10) mm = '0' + mm;
    return (hh + ':' + mm);
}
