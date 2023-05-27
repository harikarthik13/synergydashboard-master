$(document).ready(function(){

$("#HistoryPopupModelBox").load("components/resourcepoolmanagement/historyModal.html");  
$("#DeletedConsultantHistoryPopupModelBox").load("components/resourcepoolmanagement/deletedConsultantHistoryModal.html");  


document.getElementById("dttilldate").onclick = function(e){
    
	 $('#dttilldate').val("");
	var dtToday = new Date();
    
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    
    var minDate= year + '-' + month + '-' + day;
    
	$('#dttilldate').attr('min', minDate);
	
}

document.getElementById("dtprojectenddate").onclick = function(e){
    
	 $('#dtprojectenddate').val("");
	var dtToday = new Date();
    
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    
    var minDate= year + '-' + month + '-' + day;
    
    $('#dtprojectenddate').attr('min', minDate);
    }
    $("#rshadow").click(function () {
        $('#billableHours').val(0);
    });

   $('input:radio').change(function() {
       benchdatahide();
    });
    $('#tblinprojectsList').keyup(function() {
    var value = $(this).val().toLowerCase();
    $("#tblinprojectsList tr").filter(function() {
	 $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

	
  $('#woexpiredsearch').keyup(function() {
   var value = $(this).val().toLowerCase();
    $("#tblwoexpired tr").filter(function() {
     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
  
    $('#nonbillablesearch').keyup(function() {
   var value = $(this).val().toLowerCase();
    $("#tblnonbillable tr").filter(function() {
     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
      
	
 $('#shadowsearch').keyup(function() {
       var value = $(this).val().toLowerCase();
    $("#tblshadow tr").filter(function() {
     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  $('#benchsearch').keyup(function() {
   var value = $(this).val().toLowerCase();
    $("#tblbenchsearch tr").filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
       
  $('#consultantsearch').keyup(function() {
   var value = $(this).val().toLowerCase();
    $("#tblconsultant tr").filter(function() {
     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  $('#txtProject').keyup(function() {
    $("#txtProjecterror").html("");
  });

  $('#rpm_txtclient').keyup(function() {
     $("#rpmclienterrormsg").html("");
	 
  });

  $('#dttilldate').change(function() {
     $("#dttilldateerror").html("");
});

  $('#txtprojectlead').keyup(function() {
   $("#rpmtxtprojectleaderror").html("");
  });

  $('#txtprojectlead').change(function() {
   $("#rpmtxtprojectleaderror").html("");
});

$('#occupiedHours').keyup(function() {
   $("#occupiedHourserror").html("");
  });

  $('#billableHours').keyup(function() {
   $("#billableHourserror").html("");
  });

  $('#conslt_txtemployeename').keyup(function() {
  $("#conslttxtemployeenameerror").html("");
  });

   $('#conslt_txtemployeemail').keyup(function() {
  $("#conslttxtemployeemailerror").html("");
  });

$('#phnum').keyup(function() {
 	$("#consltphnumerror").html("");
  });

$('#txtskypeid').keyup(function() {
 $("#consltskypeiderror").html("");
  });

	$('#conslt_txtProject').keyup(function() {
 $("#conslttxtProjecterror").html("");
  });
	
		$('#txtclient').keyup(function() {
 $("#consltclienterror").html("");
  });
	
$('#dtprojectstartdate').change(function() {
    $("#consltdtprojectstartdateerror").html("");
});

  $('#dtprojectenddate').change(function() {
    $("#consltdtprojectenddateerror").html("");
});

	$('#conslt_txtprojectlead').keyup(function() {
 $("#conslttxtprojectleaderror").html("");
  });

	$('#conslt_txtprojectlead').change(function() {
   $("#conslttxtprojectleaderror").html("");
});

$('#conslt_billableHours').keyup(function() {
 $("#consltbillableHourserror").html("");
  });
	
	$('#conslt_AvailableHours').keyup(function() {
 $("#consltavailbleHourserror").html("");
  });
    
});

// function searchtbl()
// {
// 	 var value = $(this).val().toLowerCase();
//     $("#projectid tr").filter(function() {
// 	 $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//     });
	
// }

//tab click event
function opentab(evt, tabName) {
  var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

//update inproject data
function updateinprojectdata(id)
{

var id=id;
 $('.form-control').removeClass('required_field');
 $('.error_message').html('');
 $('#rpmmodel').appendTo("body").modal("show");
 var GetinprojectListbyID = callgetlist('GetResourcesById','{"IsActive":"True","SelectedEmployeeId":"'+id+'"}');
 var mapinprojectlistbyid = mapupdateinprojectListcomputeHTML(GetinprojectListbyID);
}

//map update inproject List computeHTML
function mapupdateinprojectListcomputeHTML(GetinprojectListbyID) {
	clear();
benchdatahide();
  var html = "";
  if (GetinprojectListbyID=="") {
   
  } else {
    var data;
    GetinprojectListbyID.forEach(function (key, item) { 
$("#empidval").val(key.Id);
radiobtn = document.getElementById("rproject");
radiobtn.checked = true;
$('#rbench').attr('disabled',false);
 var edate=key.ProjectEndDate;
 var ed = edate;
 var enddateChanged= ed.replace(/\//g, "-");
 enddateChanged=enddateChanged.replace("T00:00:00","");

var projectlead=[];
projectlead = key.ProjectLeads.split(',');
$('#txtprojectlead').val(projectlead).change();

$('#rpm_txtemployeeCode').val(key.EmployeeCode);
$('#txtemployeeName').val(key.EmployeeName);
$('#txtProject').val(key.Projects);
$('#rpm_txtclient').val(key.Client);
$('#dttilldate').val(enddateChanged);
// $('#txtprojectlead').val(key.ProjectLeads);
$('#occupiedHours').val(key.OccupiedHours);
$('#billableHours').val(key.BillableHours);

// CKEDITOR.instances.txtareaDescription.setData(key.Content);

     }); 
  }
// inprojectsList();
showinprojectsList();
rendershowinprojectsListGrid();
}

//update woexpired data
function updatewoexpireddata(id)
{

 $('.form-control').removeClass('required_field');
      $('.error_message').html('');
      $('#rpmmodel').appendTo("body").modal("show");
	var GetwoexpireddataListbyID = callgetlist('GetResourcesById','{"IsActive":"True","SelectedEmployeeId":"'+id+'"}');
	var mapwoexpireddatalistbyid = mapupdatewoexpiredListcomputeHTML(GetwoexpireddataListbyID);
}

//map update woexpired List computeHTML
function mapupdatewoexpiredListcomputeHTML(GetwoexpireddataListbyID) {
	clear();
benchdatahide();
  var html = "";
  if (GetwoexpireddataListbyID=="") {
   
  } else {
    var data;
    GetwoexpireddataListbyID.forEach(function (key, item) { 
$("#empidval").val(key.Id);
radiobtn = document.getElementById("rproject");
radiobtn.checked = true;
$('#rbench').attr('disabled',false);
 var edate=key.ProjectEndDate;
 var ed = edate;
 var enddateChanged= ed.replace(/\//g, "-");
 enddateChanged=enddateChanged.replace("T00:00:00","");
var projectlead=[];
projectlead = key.ProjectLeads.split(',');
$('#txtprojectlead').val(projectlead).change();

$('#rpm_txtemployeeCode').val(key.EmployeeCode);
$('#txtemployeeName').val(key.EmployeeName);
$('#txtProject').val(key.Projects);
$('#rpm_txtclient').val(key.Client);
$('#dttilldate').val(enddateChanged);
// $('#txtprojectlead').val(key.ProjectLeads);
$('#occupiedHours').val(key.OccupiedHours);
$('#billableHours').val(key.BillableHours);

// CKEDITOR.instances.txtareaDescription.setData(key.Content);

     }); 
  }
WOExpiredList();
renderShowWOExpiredListGrid();
}

//update nonbillable data
function updatenonbillabledata(id)
{

 $('.form-control').removeClass('required_field');
      $('.error_message').html('');
      $('#rpmmodel').appendTo("body").modal("show");
var GetnonbillabledataListbyID = callgetlist('GetResourcesById','{"IsActive":"True","SelectedEmployeeId":"'+id+'"}');
	var mapnonbillabledatalistbyid = mapupdatenonbillabledataListcomputeHTML(GetnonbillabledataListbyID);
 
}

//mapupdate nonbillable dataList computeHTML
function mapupdatenonbillabledataListcomputeHTML(GetnonbillabledataListbyID) {
	clear();
benchdatahide();
  var html = "";
  if (GetnonbillabledataListbyID=="") {
   
  } else {
    var data;
    GetnonbillabledataListbyID.forEach(function (key, item) { 
$("#empidval").val(key.Id);
radiobtn = document.getElementById("rshadow");
radiobtn.checked = false;
$('#rbench').attr('disabled',false);
proradiobtn = document.getElementById("rproject");
proradiobtn.checked = false;

 var edate=key.ProjectEndDate;
 var ed = edate;
 var enddateChanged= ed.replace(/\//g, "-");
 enddateChanged=enddateChanged.replace("T00:00:00","");

var projectlead=[];
projectlead = key.ProjectLeads.split(',');
$('#txtprojectlead').val(projectlead).change();
$('#rpm_txtemployeeCode').val(key.EmployeeCode);
$('#txtemployeeName').val(key.EmployeeName);
$('#txtProject').val(key.Projects);
$('#rpm_txtclient').val(key.Client);
$('#dttilldate').val(enddateChanged);
// $('#txtprojectlead').val(key.ProjectLeads);
$('#occupiedHours').val(key.OccupiedHours);
$('#billableHours').val(key.BillableHours);

// CKEDITOR.instances.txtareaDescription.setData(key.Content);

     }); 
  }
NonBillableList();
renderNonBillableList();
}

//update shadowdata
function updateshadowdata(id)
{

 $('.form-control').removeClass('required_field');
      $('.error_message').html('');
      $('#rpmmodel').appendTo("body").modal("show");
var GetshadowdataListbyID = callgetlist('GetResourcesById','{"IsActive":"True","SelectedEmployeeId":"'+id+'"}');
	var mapshadowdatalistbyid = mapshadowdataListcomputeHTML(GetshadowdataListbyID);
 
}

//map shadowdata List computeHTML
function mapshadowdataListcomputeHTML(GetshadowdataListbyID) {
	clear();
benchdatahide();
  var html = "";
  if (GetshadowdataListbyID=="") {
   
  } else {
    var data;
    GetshadowdataListbyID.forEach(function (key, item) { 
$("#empidval").val(key.Id);
radiobtn = document.getElementById("rshadow");
        radiobtn.checked = true;
        
 $('#rbench').attr('disabled',false);
 var edate=key.ProjectEndDate;
 var ed = edate;
 var enddateChanged= ed.replace(/\//g, "-");
 enddateChanged=enddateChanged.replace("T00:00:00","");
var projectlead=[];
projectlead = key.ProjectLeads.split(',');
$('#txtprojectlead').val(projectlead).change();
$('#rpm_txtemployeeCode').val(key.EmployeeCode);
$('#txtemployeeName').val(key.EmployeeName);
$('#txtProject').val(key.Projects);
$('#rpm_txtclient').val(key.Client);
$('#dttilldate').val(enddateChanged);
// $('#txtprojectlead').val(key.ProjectLeads);
$('#occupiedHours').val(key.OccupiedHours);
$('#billableHours').val(key.BillableHours);

// CKEDITOR.instances.txtareaDescription.setData(key.Content);

     }); 
  }
ShadowList();
renderShadowList();
}

//update bench listdata
function updatebenchlistdata(id)
{
 $('.form-control').removeClass('required_field');
      $('.error_message').html('');
      $('#rpmmodel').appendTo("body").modal("show");
	var GetbenchlistdataListbyID = callgetlist('GetResourcesInBenchById','{"IsActive":"True","SelectedEmployeeId":"'+id+'"}');
	var mapbenchlistdatalistbyid = mapbenchlistdataListcomputeHTML(GetbenchlistdataListbyID);
 
}

//map benchlist data to List computeHTML
function mapbenchlistdataListcomputeHTML(GetbenchlistdataListbyID) {
	clear();
benchdatahide();
  var html = "";
  if (GetbenchlistdataListbyID=="") {
   
  } else {
    var data;
    GetbenchlistdataListbyID.forEach(function (key, item) { 
$("#empidval").val(key.Id);
 $('#rbench').attr('disabled','disabled');
$('#rpm_txtemployeeCode').val(key.EmployeeCode);
$('#txtemployeeName').val(key.EmployeeName);
     }); 
  }
  
$('#txtProject').prop("disabled", true); 
$('#rpm_txtclient').prop("disabled", true);  
$('#dttilldate').prop("disabled", true);  
$('#txtprojectlead').prop("disabled", true);  
$('#occupiedHours').prop("disabled", true);  
$('#billableHours').prop("disabled", true);  
  
BenchList();
renderBenchList();
}

//bench data hide
function benchdatahide()
{

var returnstatusbench = $('#rbench').is(':checked') ? 1 : 0;
var returnstatusproject = $('#rproject').is(':checked') ? 1 : 0;
var returnstatusshadow = $('#rshadow').is(':checked') ? 1 : 0;
  if(returnstatusbench==1)
  {
	returnstatusbench = document.getElementById("rbench");
	returnstatusbench.checked = true; 
 	returnstatusshadow = document.getElementById("rshadow");
	returnstatusshadow.checked = false; 
 	returnstatusproject = document.getElementById("rproject");
	returnstatusproject.checked = false; 
$('#txtProject').prop("disabled", true); 
$('#rpm_txtclient').prop("disabled", true);  
$('#dttilldate').prop("disabled", true);  
$('#txtprojectlead').prop("disabled", true);  
$('#occupiedHours').prop("disabled", true);  
$('#billableHours').prop("disabled", true);  
	$("#txtProject").val("");
	$("#rpm_txtclient").val("");
	$("#dttilldate").val("");
	$("#txtprojectlead").val("");
	$("#occupiedHours").val("");
	$("#billableHours").val("");
  }
  else if(returnstatusproject==1){
		returnstatusbench = document.getElementById("rbench");
	returnstatusbench.checked = false; 
 	returnstatusshadow = document.getElementById("rshadow");
	returnstatusshadow.checked = false; 
 	returnstatusproject = document.getElementById("rproject");
	returnstatusproject.checked = true; 
   $('#txtProject').prop("disabled", false); 
	$('#rpm_txtclient').prop("disabled", false);  
$('#dttilldate').prop("disabled", false);  
$('#txtprojectlead').prop("disabled", false);  
$('#occupiedHours').prop("disabled", false);  
  $('#billableHours').prop("disabled", false);  
  
  }
    else if(returnstatusshadow==1){
		returnstatusbench = document.getElementById("rbench");
	returnstatusbench.checked = false; 
 	returnstatusshadow = document.getElementById("rshadow");
	returnstatusshadow.checked = true; 
 	returnstatusproject = document.getElementById("rproject");
	returnstatusproject.checked = false; 
	  $('#txtProject').prop("disabled", false); 
$('#rpm_txtclient').prop("disabled", false);  
$('#dttilldate').prop("disabled", false);  
$('#txtprojectlead').prop("disabled", false);  
$('#occupiedHours').prop("disabled", false);  
  $('#billableHours').prop("disabled", false);

  }
else
{
  $('#txtProject').prop("disabled", false); 
$('#rpm_txtclient').prop("disabled", false);  
$('#dttilldate').prop("disabled", false);  
$('#txtprojectlead').prop("disabled", false);  
$('#occupiedHours').prop("disabled", false);  
  $('#billableHours').prop("disabled", false);  
}
}

//update consultants list data
function updateconsultantslistdata(id)
{

 $('.form-control').removeClass('required_field');
      $('.error_message').html('');
      $('#consultantModel').appendTo("body").modal("show");
	var GetconsultantslistListbyID = callgetlist('GetConsultantsById','{"IsActive":"True","ConsultantId":"'+id+'"}');
	var mapconsultantslistlistbyid = mapconsultantslistListcomputeHTML(GetconsultantslistListbyID);
}

//map consultants list List compute HTML
function mapconsultantslistListcomputeHTML(GetconsultantslistListbyID) {
  clearconsultant();
  renderConsultantsList();
  var html = "";
  if (GetconsultantslistListbyID=="") {
   
  } else {
    var data;
	$("#consultantidval").val("");
    GetconsultantslistListbyID.forEach(function (key, item) { 
$("#consultantidval").val(key.id);
 var sdate=key.ProjectStartDate;
 var sd = sdate;
 var startdateChanged= sd.replace(/\//g, "-");
 startdateChanged=startdateChanged.replace("T00:00:00","");
 
  var edate=key.ProjectEndDate;
 var ed = edate;
 var enddateChanged= ed.replace(/\//g, "-");
 enddateChanged=enddateChanged.replace("T00:00:00","");
var projectlead=[];
projectlead = key.ProjectLeads.split(',');
$('#conslt_txtprojectlead').val(projectlead).change();
$('#conslt_txtemployeename').val(key.EmployeeName);
$('#conslt_txtemployeemail').val(key.EmailId);
$('#phnum').val(key.PhoneNumber);
$('#txtskypeid').val(key.SkypeId);
$('#conslt_txtProject').val(key.Projects);
$('#txtclient').val(key.Client);
$('#dtprojectstartdate').val(startdateChanged);
$('#dtprojectenddate').val(enddateChanged);
// $('#conslt_txtprojectlead').val(key.ProjectLeads);
$('#conslt_billableHours').val(key.BillableHours);
$("#conslt_AvailableHours").val(key.AvailableHours);
// CKEDITOR.instances.txtareaDescription.setData(key.Content);

     }); 
  }
ShadowList();
renderShadowList();
}

//delete consultants list data
function deleteconsultantslistdata(id)
{
	
 swal({
        title: "Delete",
        text: "Are you sure, Do you want to delete this data?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
      var data=[];     
data = {
          "Method": "DeleteConsultantById",
          "Data": {
		  "ConsultantId":id
		  }
        }
	var result = PostDataCall(data);
	if (PostDataCall['IsSuccess'] == true) {
			swal({
            title: "Success!",
            text: "Deleted Successfully!",
            icon: "success",
            button: "ok!",
        })
	}
	showConsultantsList();
	renderConsultantsList();
           
        } 
      })
}

//consultant Model
function consultantModel()
{
	$('.form-control').removeClass('required_field');
      $('.error_message').html('');
      $('#consultantModel').appendTo("body").modal("show");
	clearconsultant();
}

//update resource details
function updateresourcedetails()
{
	
	var todate =new Date();
		var EmployeeId=$("#empidval").val().trim();
		var Projects=$("#txtProject").val().trim();
		var Client =$("#rpm_txtclient").val().trim();
		var ProjectLeads=$("#txtprojectlead").val();
		var StartDate=todate;
		var EndDate=$("#dttilldate").val().trim();
		var OccupiedHours=$("#occupiedHours").val().trim();
		var BillableHours=$("#billableHours").val().trim();
		var IsShadow = 0;
		var data = []
		var returnRequired = $('#rshadow').is(':checked') ? 1 : 0;
		var returnstatusbench = $('#rbench').is(':checked') ? 1 : 0;		
		var returnstatusproject = $('#rproject').is(':checked') ? 1 : 0;	
		var IsOcuupied=0;		
		var IsBillablehrs=0;
		ProjectLeads = ProjectLeads.join([separator = ','])
		
		var Occupiedhrs = Number(document.getElementById("occupiedHours").value);
		var billable = Number(document.getElementById("billableHours").value);
		
		if(Occupiedhrs>0 && Occupiedhrs!=0)
		{
			IsOcuupied=1;
		}else{
			swal({
							title: "Warning!",
							text: "Please enter valid Occupied Hours",
							icon: "warning",
							button: "ok!",
						})
		}

		if(IsBillablehrs==0 && IsOcuupied==0){
			swal({
							title: "Warning!",
							text: "Please enter valid Hours",
							icon: "warning",
							button: "ok!",
						})
		}
		else{
			IsBillablehrs=1;
		}
		if(returnRequired==1)
        {
            IsShadow = 1;
          
		 if ($("#txtProject").val().trim() == "") {
        $("#txtProjecterror").html("Please enter Project");
		}
		if ($("#rpm_txtclient").val().trim() == "") {
        $("#rpmclienterrormsg").html("Please enter Client");
		}
		if ($("#dttilldate").val() == "") {
        $("#dttilldateerror").html("Please enter To Date");
		}
		if ($("#txtprojectlead").val() == "") {
        $("#rpmtxtprojectleaderror").html("Please enter Project Lead");
		}
		if ($("#occupiedHours").val().trim() == "") {
        $("#occupiedHourserror").html("Please enter valid Occupied Hours");
		}
		if ($("#billableHours").val().trim() == "") {
        $("#billableHourserror").html("Please enter valid billable Hours");
		}
		if ($("#occupiedHours").val() <0) {
        $("#occupiedHourserror").html("Please enter valid Occupied Hours");
		}
		if ($("#billableHours").val() < 0) {
        $("#billableHourserror").html("Please enter valid billable Hours");
		}
		
			if ($("#txtProject").val().trim() != "" && $("#rpm_txtclient").val().trim() != "" && $("#dttilldate").val() != "" && $("#txtprojectlead").val() != "" && $("#occupiedHours").val().trim() != "" &&
		$("#billableHours").val().trim() != "" && $("#occupiedHours").val() >= 0 && $("#billableHours").val() >= 0 && IsOcuupied==1 &&IsBillablehrs==1){
							 data = {
							"Method": "UpdateResourceStatus",
							"Data": {
							"EmployeeId":EmployeeId,
							"Projects": Projects,
							"Client" : Client,
							"ProjectLeads":ProjectLeads,
							"StartDate":StartDate,
							"EndDate" :EndDate,
							"OccupiedHours":OccupiedHours,
							"BillableHours":BillableHours,
							"IsShadow":1
		}}
						var postCall = PostDataCall(data);
						// ////console.log(postCall);
						if (postCall['IsSuccess'] == true) {
							swal({
							title: "Success!",
							text: "Data Updated Successfully!",
							icon: "success",
							button: "ok!",
						})
						clear();
						showinprojectsList();
						showWOExpiredList();
						showNonBillableList();
						showShadowList();
						showBenchList();
						showConsultantsList();
						renderShowWOExpiredListGrid();
                        rendershowinprojectsListGrid();
                        renderNonBillableList();
                        renderShadowList();
                        renderBenchList();
                        renderConsultantsList()
						$('#rpmmodel').appendTo("body").modal("hide");
						}
else{
	swal({
							title: "Warning!",
							text: postCall.Message,
							icon: "warning",
							button: "ok!",
						})
	
}
		}
	
		}
		if(returnstatusproject==1)
		{
		 if ($("#txtProject").val().trim() == "") {
        $("#txtProjecterror").html("Please enter Project");
		}
		if ($("#rpm_txtclient").val().trim() == "") {
        $("#rpmclienterrormsg").html("Please enter Client");
		}
		if ($("#dttilldate").val() == "") {
        $("#dttilldateerror").html("Please enter To Date");
		}
		if ($("#txtprojectlead").val() == "") {
        $("#rpmtxtprojectleaderror").html("Please enter Project Lead");
		}
		if ($("#occupiedHours").val().trim() == "") {
        $("#occupiedHourserror").html("Please enter valid Occupied Hours");
		}
		if ($("#billableHours").val().trim() == "") {
        $("#billableHourserror").html("Please enter valid billable Hours");
		}
		if ($("#occupiedHours").val() < 0) {
        $("#occupiedHourserror").html("Please enter valid Occupied Hours");
		}
		if ($("#billableHours").val() < 0) {
        $("#billableHourserror").html("Please enter valid billable Hours");
		}
		if ($("#txtProject").val().trim() != "" && $("#rpm_txtclient").val().trim() != "" && $("#dttilldate").val() != "" && $("#txtprojectlead").val() != "" && $("#occupiedHours").val().trim() != "" &&
		$("#billableHours").val().trim() != "" && $("#occupiedHours").val() >= 0 && $("#billableHours").val() >= 0  && IsOcuupied==1 &&IsBillablehrs==1){
					 data = {
							"Method": "UpdateResourceStatus",
							"Data": {
							"EmployeeId":EmployeeId,
							"Projects": Projects,
							"Client" : Client,
							"ProjectLeads":ProjectLeads,
							"StartDate":StartDate,
							"EndDate" :EndDate,
							"OccupiedHours":OccupiedHours,
							"BillableHours":BillableHours,
							"IsShadow":0
		}}
								var postCall = PostDataCall(data);
						// ////console.log(postCall);
						if (postCall['IsSuccess'] == true) {
							swal({
							title: "Success!",
							text: "Data Updated Successfully!",
							icon: "success",
							button: "ok!",
						})
						clear();

						
						showinprojectsList();
						showWOExpiredList();
						showNonBillableList();
						showShadowList();
						showBenchList();
						showConsultantsList();

						//Call JS 
						renderShowWOExpiredListGrid();
						rendershowinprojectsListGrid();
						renderNonBillableList();
						renderShadowList();
						renderBenchList();
						renderConsultantsList();

						$('#rpmmodel').appendTo("body").modal("hide");
						}
else{
	swal({
							title: "Warning!",
							text: postCall.Message,
							icon: "warning",
							button: "ok!",
						})
	
}
		}}
	else if(returnstatusbench==1){
		data = {
							"Method": "UpdateResourceStatus",
							"Data": {
							"EmployeeId":EmployeeId,
							"Projects": "",
							"Client" : "",
							"ProjectLeads":"",
							"StartDate":StartDate,
							"EndDate" :"",
							"OccupiedHours":"",
							"BillableHours":"",
							"IsShadow":IsShadow
							}
}
						var postCall = PostDataCall(data);
						// ////console.log(postCall);
						if (postCall['IsSuccess'] == true) {
							swal({
							title: "Success!",
							text: "Data Updated Successfully!",
							icon: "success",
							button: "ok!",
						})
						clear();

						showinprojectsList();
						showWOExpiredList();
						showNonBillableList();
						showShadowList();
						showBenchList();
						showConsultantsList();
						$('#rpmmodel').appendTo("body").modal("hide");
						}
else{
	swal({
							title: "Warning!",
							text: postCall.Message,
							icon: "warning",
							button: "ok!",
						})
	
}
	}

					else
				{
				if ($("#txtProject").val().trim() == "") {
				$("#txtProjecterror").html("Please enter Project");
				}
				if ($("#rpm_txtclient").val().trim() == "") {
				$("#rpmclienterrormsg").html("Please enter Client");
				}
				if ($("#dttilldate").val() == "") {
				$("#dttilldateerror").html("Please enter To Date");
				}	
				if ($("#txtprojectlead").val() == "") {
				$("#rpmtxtprojectleaderror").html("Please enter Project Lead");
				}
				if ($("#occupiedHours").val().trim() == "") {
				$("#occupiedHourserror").html("Please enter Occupied Hours");
				}
				if ($("#billableHours").val().trim() == "") {
				$("#billableHourserror").html("Please enter billable Hours");
				}
				if ($("#occupiedHours").val() <0 && $("#occupiedHours").val() !=0) {
        $("#occupiedHourserror").html("Please enter valid Occupied Hours");
		}
		if ($("#billableHours").val() <0 && $("#billableHours").val() !=0) {
        $("#billableHourserror").html("Please enter valid billable Hours");
		}
				if ($("#txtProject").val().trim() != "" && $("#rpm_txtclient").val().trim() != "" && $("#dttilldate").val() != "" && $("#txtprojectlead").val() != "" && $("#occupiedHours").val().trim() != "" &&
		$("#billableHours").val().trim() != "" && $("#occupiedHours").val().trim() >= 0  && IsOcuupied==1 &&IsBillablehrs==1){
			if(IsShadow==1 && BillableHours==0)
			{
			
							data = {
							"Method": "UpdateResourceStatus",
							"Data": {
							"EmployeeId":EmployeeId,
							"Projects": Projects,
							"Client" : Client,
							"ProjectLeads":ProjectLeads,
							"StartDate":StartDate,
							"EndDate" :EndDate,
							"OccupiedHours":OccupiedHours,
							"BillableHours":BillableHours,
							"IsShadow":IsShadow
							}}			
			}
			else
			{
				 data = {
							"Method": "UpdateResourceStatus",
							"Data": {
							"EmployeeId":EmployeeId,
							"Projects": Projects,
							"Client" : Client,
							"ProjectLeads":ProjectLeads,
							"StartDate":StartDate,
							"EndDate" :EndDate,
							"OccupiedHours":OccupiedHours,
							"BillableHours":BillableHours,
							"IsShadow":IsShadow
							}}
			}
							
						var postCall = PostDataCall(data);
						// ////console.log(postCall);
						if (postCall['IsSuccess'] == true) {
							swal({
							title: "Success!",
							text: "Data Updated Successfully!",
							icon: "success",
							button: "ok!",
						})
						clear();

						inprojectsdata();
						WOExpiredList();
						NonBillableList();
						ShadowList();
						BenchList();
						ConsultantsList();
						$('#rpmmodel').appendTo("body").modal("hide");
						}
else{
	swal({
							title: "Warning!",
							text: postCall.Message,
							icon: "warning",
							button: "ok!",
						})
	
}
		}					}

}

//clear func
function clear()
{
	$("#empidval").val("");
	$("#rpm_txtemployeeCode").val("");
	$("#txtemployeeName").val("");
	$("#txtProject").val("");
	$("#rpm_txtclient").val("");
	$("#dttilldate").val("");
	$("#txtprojectlead").val("");
	$("#occupiedHours").val("");
	$("#billableHours").val("");
$('#txtprojectlead').select2('val', [""]);
	// $("#txtProjecterror").html("");
	$("#rpmclienterrormsg").html("");
	$("#dttilldateerror").html("");
	$("#rpmtxtprojectleaderror").html("");
	$("#occupiedHourserror").html("");
	$("#billableHourserror").html("");

 radiobtn = document.getElementById("rbench");
 radiobtn.checked = false;

 radiobtnproject = document.getElementById("rproject");
 radiobtnproject.checked = false; 
 
 radiobtnshadow = document.getElementById("rshadow");
 radiobtnshadow.checked = false;
}

//upadte consultant data
function updateconsultantdata()
{
	
	var	ConsultantId =$("#consultantidval").val();
	if(ConsultantId=="")
	{
		ConsultantId=null;
	}
	var	Name  =$("#conslt_txtemployeename").val().trim();
	var	EmailId  =$("#conslt_txtemployeemail").val().trim();
	var	PhoneNumber  =$("#phnum").val().trim();
	var	SkypeId  =$("#txtskypeid").val().trim();
	var	Projects  =$("#conslt_txtProject").val().trim();
	var	Client  =$("#txtclient").val().trim();
	var	ProjectLeads  =$("#conslt_txtprojectlead").val();
	var	AvailableHours =$("#conslt_AvailableHours").val().trim();
	var	BillableHours =$("#conslt_billableHours").val().trim();
	var	StartDate =$("#dtprojectstartdate").val().trim();
	var	EndDate =$("#dtprojectenddate").val().trim();
	var	Isconfirmation =0;
	var Isvalidmail=0;
	var IsvalidHours=0;
	var IsvalidDate=0;
	var IsBillable=0; 
	var IsAvailablehrs=0;
	var Isvalidhrs=0;
	
	ProjectLeads = ProjectLeads.join([separator = ','])
	var data = []
	if ($("#conslt_txtemployeename").val().trim() == "") {
	$("#conslttxtemployeenameerror").html("Please enter Employee Name");
	}
	if ($("#conslt_txtemployeemail").val().trim() == "") {
	$("#conslttxtemployeemailerror").html("Please enter Email Id");
	}
	if ($("#phnum").val() == "") {
	$("#consltphnumerror").html("Please enter Phone Number");
	}
	if ($("#txtskypeid").val().trim() == "") {
	$("#consltskypeiderror").html("Please enter Skype Id");
	}
	if ($("#conslt_txtProject").val().trim() == "") {
	$("#conslttxtProjecterror").html("Please enter Project");
	}
	if ($("#txtclient").val().trim() == "") {
	$("#consltclienterror").html("Please enter Client");
	}
	if ($("#dtprojectstartdate").val() == "") {
	$("#consltdtprojectstartdateerror").html("Please enter Start Date");
	}
	if ($("#dtprojectenddate").val() == "") {
	$("#consltdtprojectenddateerror").html("Please enter End Date");
	}
	if ($("#conslt_txtprojectlead").val() == "") {
	$("#conslttxtprojectleaderror").html("Please enter Project Lead");
	}
	
	if ($("#conslt_billableHours").val().trim() == "") {
	$("#consltbillableHourserror").html("Please enter Billable Hours");
	}
	if ($("#conslt_AvailableHours").val().trim() == "") {
	$("#consltavailbleHourserror").html("Please enter Available Hours");
	}
	if ($("#conslt_billableHours").val() <=0 && $("#conslt_billableHours").val() !=0) {
    $("#consltbillableHourserror").html("Please enter valid Billable Hours");
	}
	if ($("#conslt_AvailableHours").val() <=0 && $("#conslt_AvailableHours").val() != 0) {
    $("#consltavailbleHourserror").html("Please enter valid Available Hours");
	}
	var x=$("#conslt_txtemployeemail").val();
		var atposition=x.indexOf("@");  
		var dotposition=x.lastIndexOf(".");  
		if (atposition<1 || dotposition<atposition+2 || dotposition+2>=x.length){  
		$("#conslttxtemployeemailerror").html("Please enter valid Email Id"); 
		}
		else
		{
			Isvalidmail=1;
		}

   var billable = Number(document.getElementById( "conslt_billableHours" ).value);
   var available = Number(document.getElementById( "conslt_AvailableHours" ).value);
   
   if(billable>available)
	{
		swal({
							title: "Warning!",
							text: "Please enter valid Billable Hours",
							icon: "warning",
							button: "ok!",
						})
	}
	else
	{
		IsvalidHours=1;
	}		
	
	var edate = document.getElementById("dtprojectenddate").value;
	var sdate = document.getElementById("dtprojectstartdate").value;
	var varEDate = new Date(edate); //dd-mm-YYYY
	var varSDate = new Date(sdate);

	if(varSDate >= varEDate) {
swal({
							title: "Warning!",
							text: "Please enter valid Start Date",
							icon: "warning",
							button: "ok!",
						})
}
else{
	IsvalidDate=1;
}
var IsValidnum= $("#phnum").val();
 if(!IsValidnum.match(/^\d+/))
        {
      $("#consltphnumerror").html("Please enter Valid Phone Number");
        }
		else{
			IsValidnum=1;
		}
	if(available>0 && available!=0){
		IsAvailablehrs=1;
	}
	else{
		swal({
							title: "Warning!",
							text: "Please enter valid Available Hours",
							icon: "warning",
							button: "ok!",
						})
	}
	
	if(billable>0 && billable!=0){
		IsBillable=1;
	}
	else{
		swal({
							title: "Warning!",
							text: "Please enter valid Billable Hours",
							icon: "warning",
							button: "ok!",
						})
	}
	if(billable==0 && available==0)
   {
	   swal({
							title: "Warning!",
							text: "Please enter valid Hours",
							icon: "warning",
							button: "ok!",
						})
   }
   else{
	   Isvalidhrs=1;
   }
	
	if($("#conslt_txtemployeename").val() != "" && $("#conslt_txtemployeemail").val() != "" &&$("#phnum").val() != "" &&$("#txtskypeid").val() != ""&&$("#conslt_txtProject").val() != "" &&$("#txtclient").val() != ""
	&& $("#dtprojectstartdate").val() != "" && $("#dtprojectenddate").val() != "" && $("#conslt_txtprojectlead").val() != "" &&
	$("#conslt_billableHours").val() != "" &&$("#conslt_AvailableHours").val() != "" &&$("#conslt_billableHours").val() >= 0 &&$("#conslt_AvailableHours").val() >=0 
	&& Isvalidmail==1 && IsvalidHours==1 && IsvalidDate==1 && IsValidnum==1 && IsBillable==1 && IsAvailablehrs==1 && Isvalidhrs==1)
	{
		data={
		
		"method": "UpdateConsultants",
		"data": {
        		
		"ConsultantId" : ConsultantId,
		"Name": Name,
		"EmailId": EmailId,
		"PhoneNumber": PhoneNumber,
		"SkypeId": SkypeId,
		"Projects": Projects,
		"Client":Client,
		"ProjectLeads": ProjectLeads,
		"AvailableHours": AvailableHours,
		"BillableHours": BillableHours,
		"StartDate": StartDate,
		"EndDate" : EndDate,
		"Isconfirmation" : 0
   
    }
	}
	var postCall = PostDataCall(data);
						// ////console.log(postCall);
						if (postCall['IsSuccess'] == true) {
							swal({
							title: "Success!",
							text: "Data Updated Successfully!",
							icon: "success",
							button: "ok!",
						})
						clearconsultant();
						showConsultantsList();
  $('#consultantModel').appendTo("body").modal("hide");
}
else{
	swal({
							title: "Warning!",
							text: postCall.Message,
							icon: "warning",
							button: "ok!",
						})
	
	}}
;
}

//form reset 
function clearconsultant()
{
	$("#consultantidval").val("");
	$("#conslt_txtemployeename").val("");
	$("#conslt_txtemployeemail").val("");
	$("#phnum").val("");
	$("#txtskypeid").val("");
	$("#conslt_txtProject").val("");
	$("#txtclient").val("");
	$("#conslt_txtprojectlead").val("");
	$("#conslt_AvailableHours").val("");
	$("#conslt_billableHours").val("");
	$("#dtprojectstartdate").val("");
	$("#dtprojectenddate").val("");
	$("#conslttxtemployeenameerror").html("");
	$("#conslttxtemployeemailerror").html("");
	$("#consltphnumerror").html("");
	$("#consltskypeiderror").html("");
	$("#conslttxtProjecterror").html("");
	$("#consltclienterror").html("");
	$("#consltdtprojectstartdateerror").html("");
	$("#consltdtprojectenddateerror").html("");
	// $("#conslttxtprojectleaderror").html("");
	$('#conslt_txtprojectlead').select2('val', [""]);
	$("#consltbillableHourserror").html("");
	$("#consltavailbleHourserror").html("");
	
}

//form validation
function validation()
{
	 if ($("#txtProject").val() == "") {
        $("#txtProjecterror").html("Please Enter Project");
    }
 if ($("#rpm_txtclient").val() == "") {
        $("#rpm_txtclienterror").html("Please enter Client");
    }
 if ($("#dttilldate").val() == "") {
        $("#dttilldateerror").html("Please enter To Date");
    }
 if ($("#txtprojectlead").val() == "") {
        $("#txtprojectleaderror").html("Please enter ProjectLead");
    }
	 if ($("#occupiedHours").val() == "") {
        $("#occupiedHourserror").html("Please enter OccupiedHours");
    }
	 if ($("#billableHours").val() == "") {
        $("#billableHourserror").html("Please enter billableHours");
    }
	
}

//date format converter
function dateformat(EndDate){
	var edate = EndDate;
	      var ed = edate;
	      ed = ed.split(' ')[0];
	      var enddateChanged = ed.replace(/\//g, "-");
	      enddateChanged = enddateChanged.split('-');
		  enddateChanged = enddateChanged[2] + "-" + enddateChanged[1] + "-" + enddateChanged[0];
		  return enddateChanged;
}