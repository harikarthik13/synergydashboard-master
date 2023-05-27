
$(document).ready(function () {

  //showbenchtobillingdata();
        
  $('#btbsearch').keyup(function() {
	var value = $(this).val().toLowerCase();
    $("#tblbenchtobillable tr").filter(function() {
     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
var ManagebtbPlanSecurityToken = localStorage.getItem("securityToken");
var plandocuploadId=null;
var manageRPMURL = SynergyAPIURL;

//edit btn click event
 $("#benchToBillingGrid").on('click','.btnSelect',function(){
 // get the current row

         var currentRow=$(this).closest("tr"); 
         
         var rno=currentRow.find(".rno").html(); 
		 var eid=currentRow.find(".eid").html(); 
         var ecode=currentRow.find(".ecode").html(); 
         var ename=currentRow.find(".ename").html(); 
		 var sdate=currentRow.find(".date").html(); 
		 // var eid=currentRow.find("td:eq(7)").html(); 
		 var btbid=currentRow.find(".bid").html();
		 
		$("#btb_txtemployeeCode").val(ecode);
		$("#btb_txtemployeeName").val(ename);
		$("#btb_empidval").val(eid);
		$("#btb_empsdateval").val(sdate);
		$("#btb_id").val(btbid);
		//ckediter & dropzone
		 $("#manageBenchlistPlanModals").appendTo("body").modal("show");
	     //$('#manageBenchlistPlanModals').modal('show');
		  getManageCommentplanssHistory(eid);
		 editor();
		//resetdata();
	 // CKEDITOR.instances.manage_plan_comment.setData("");
	 
		// display value in popup
        $("#btb_txtemployeeCode").val(ecode);
		$("#btb_txtemployeeName").val(ename);
		$("#btb_empidval").val(eid);
		$("#btb_empsdateval").val(sdate);
		$("#btb_id").val(btbid);
         
         
  });

 //showplan function 
function showbenchplan(){}

//show skill details
function showskill(empid)
{
var id=empid;
 $('.form-control').removeClass('required_field');
 $('.error_message').html('');
 $('#showemployeeskills').appendTo("body").modal("show");
   var GetTechEmpIdFilters = JSON.stringify({
    "EmployeeId": id
  });
  var GetskillListbyID = callgetlist("GetResourceSkillsById", GetTechEmpIdFilters);
  // var GetskillListbyID = callgetlist('GetEmployeeSkills','{"EmployeeId":"'+id+'"}');
  var mapskilllistbyid = mapskilltListcomputeHTML(GetskillListbyID);
  $('#tblemployeeskilldata').html(mapskilllistbyid);
}

//show skill details
function showHistory(empid)
{
	var id=empid;
	$('#showhistory').appendTo("body").modal("show");
   	var GetTechEmpIdFilters = JSON.stringify({
		"Token": localStorage.getItem('securityToken'),
    	"SelectedEmployeeId": id,
		"IsActive": 1
  	});
  	var getHistory = callgetlist("GetBenchResourcesMonthlybillableById", GetTechEmpIdFilters);
	var mapHistory = mapHistoryHTML(getHistory, id);
	$('#tblemployeehistorydata').html(mapHistory);
}

function showEmployeeBilling(empid, monthyear='')
{

	$("#mdlBillableDetailsOfResourceFortheMonthAndYear").appendTo("body").modal("show");
 	$("#lblemployeeBillableDetailsTitile").html("Billable Details for Jan 2023	" /*+ decodeURIComponent(monthyear)*/);
	
	var requestGetEmployeeBilling = JSON.stringify({
		"Token": localStorage.getItem('securityToken'),
    	"EmployeeId": empid,
		"Month":1,
		"Year":2021
  	});

  	var responseGetEmployeeBilling = callgetlist("GetBenchResourcesMonthlybillableinDetailById", requestGetEmployeeBilling);

  	if (GetEmpBillableDetails != null) {
            renderBillableDetailsOfResourceGrid(GetEmpBillableDetails);
        }
        
  	console.log(responseGetEmployeeBilling);
}

function renderBillableDetailsOfResourceGrid(data) {
    var OpeningskillratingGrid = $("#view_Billable_Details")
        .dxDataGrid({
            filterRow: {
                visible: true,
                applyFilter: "auto",
            },
            dataSource: data,
            export: {
                enabled: true,
                allowExportSelectedData: true,
            },
            searchPanel: {
                visible: true,
                width: 240,
                placeholder: "Search...",
            },
            headerFilter: {
                visible: true,
            },
            grouping: {
                autoExpandAll: true,
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [5, 10, 20],
                showInfo: true,
            },
            paging: {
                pageSize: 10,
            },
            groupPanel: {
                visible: true,
                emptyPanelText: "Drag a column"
            },
            sorting: {
                mode: "multiple",
            },
            summary: {
                totalItems: [
                    {
                        column: "Billed Hours",
                        summaryType: "sum",
                        displayFormat: "Total Billed Hours: {0}"
                    },
                ],
                groupItems: [
                    {
                        column: "Billed Hours",
                        summaryType: "sum",
                        displayFormat: "Total Billed Hours: {0}"
                    },
                ],
            },
            editing: {
                mode: "popup",
                allowAdding: false,
                allowUpdating: false,
                useIcons: true,
            },
            columnChooser: {
                enabled: true,
            },
            rowAlternationEnabled: true,
            //filterPanel: { visible: true },
            allowColumnReordering: true,
            allowColumnResizing: true,
            showBorders: true,
            columns: [
                {
                    caption: "#",
                    dataField: "sno",
                    cssClass: "rno",
                    allowGrouping: false,
                    allowCollapsing: false,
                    allReordering: false,
                    width: 70,
                    cellTemplate: function (container, options) {
                        container.text(
                            OpeningskillratingGrid.pageIndex() * OpeningskillratingGrid.pageSize() + options.rowIndex + 1
                        );
                    },
                },
                {
                    caption: "Date",
                    dataField: "Date",
                    dataType: "date",
                    format: "dd-MMM-yy"

                    // caption: "Date",
                    //dataField: "DateKey",
                    //dataType: "date",
                    //format: "yyyy-MM-dd",
                    //width: 100
                },
                {
                    caption: "Project Name",
                    dataField: "projectname"
                },
                {
                    caption: "Client",
                    dataField: "Client"
                },
                {
                    caption: "Approved Hours",
                    dataField: "Approved Hours",
                },
                {
                    caption: "Billed Hours",
                    dataField: "Billed Hours"
                }
            ],
        })
        .dxDataGrid("instance");
    }

//map skill List compute HTML
function mapskilltListcomputeHTML(GetskillListbyID) {

  var html = "";
  if (GetskillListbyID == "") {
    html += "<tr><td colspan='5'>No Data Found.!</td></tr>";
	} else {
    var data;
    GetskillListbyID.forEach(function (key, item) { 
	var RCount = item + 1;
      data = {
        // "EmployeeId": key[ 'Employee id' ],
		"#":RCount,
		"Grade":key.Grade,
        "Family": key.Family,
        "Skils": key.Skils,
        "Version": key.Version
      };
	   
      html += "<tr class='myRow' id='row_" + RCount + "'>";
	  html += "<td>" + RCount + "</td>"; 
      html += "<td>" + key.SkillFamilieName + "</td>";
	  html += "<td>" + key.SkillName + "</td>"; 
	  html += "<td>" + key.SkillVersionName + "</td>";
	    html += "<td>" + key.SkillGradeName + "</td>"; 
	 
      // html += "<td><button class='btn btn-xs btn-primary edit-btn' onclick=updateinprojectdata('"+key.Id+"')><i class='fas fa-pencil-alt'></i></button></td>"
      html += "</tr>"; 
    }); 
	
  }
  return html;
}

//map skill List compute HTML
function mapHistoryHTML(getHistory, empid) {
	var html = "";
	if (getHistory == "") {
	  html += "<tr><td colspan='3'>No Data Found.!</td></tr>";
	  } else {
	  var data;
	  getHistory.forEach(function (key, item) { 
	  		console.log(item);

	  var RCount = item + 1;
		data = {
		  "#":RCount,
		  "Month/Year":key.MonthYear,
		  "Billable": key.BilledHours,
		};
		 
		html += "<tr class='myRow' id='row_" + RCount + "'>";
		html += "<td>" + RCount + "</td>"; 
		html += "<td>" + key.MonthYear + "</td>";
		html += "<td><a href='#' onclick=showEmployeeBilling('"+empid+"') >"+key.BilledHours+"</a></td>"; 
		html += "</tr>"; 
	  }); 
	  
	}
	return html;
  }
//save Manage Plan Documents
function saveManagePlanDocuments(id)
{
	
	// $('#benchtobillingmodel').appendTo("body").modal("show");
	saveManagePlanComments(id); 
}
//convert date Format
function dateFormat(convertDate){
	if(convertDate!="")
		{
			var event = new Date(convertDate);
			convertDate = JSON.stringify(event)
			convertDate = convertDate.slice(1,11)
		}
		return convertDate;
}
//save btm model popup
$("#manage_plan_reassign_save").on("click", function () {
	
	var validatefiledoc  = $('#assign_plan_document_upload').get(0).dropzone.getAcceptedFiles();
	if(validatefiledoc.length!=0)
	{
	var size=validatefiledoc[0].size / 1024 / 1024;
	if(validatefiledoc.length <2 && size<=5)
		
	{
	var todate =new Date();
		var EmployeeId=$("#btb_empidval").val();
		var StartDate=$("#btb_empsdateval").val();
		StartDate=StartDate.replace(/<[^>]+>/g, '');
		StartDate=dateFormat(StartDate);
		var EndDate=todate;
		EndDate=dateFormat(EndDate);
		var benchToPlanBillingId=$("#btb_id").val();
		if(benchToPlanBillingId=="null" || benchToPlanBillingId=="")
		{
			data = {
							"Method": "UpdateBenchToBilling",
							"Data": {
							"BenchToBillingId" : null,	
							"EmployeeId":EmployeeId,
							"StartDate":StartDate,
							"EndDate":EndDate
							
		}}
		var postCall = PostDataCall(data);
		if (postCall['IsSuccess'] == true) {
							swal({
							title: "Success!",
							text: "Data Updated Successfully!",
							icon: "success",
							button: "ok!",
						})
		}	
   benchToPlanBillingId =postCall.Data[0].BenchToBillingId;
		}
		

 if (CKEDITOR.instances.manage_plan_comment.getData() != "") {

    saveManagePlanComments(benchToPlanBillingId,EmployeeId, CKEDITOR.instances.manage_plan_comment.getData());
   
if(plandocuploadId !="")
{
    savedocsPlanComments(plandocuploadId,EmployeeId);

getManageCommentplanssHistory(EmployeeId);
showbenchtobillingdata();	
// clean();
}
 }
else{
 swal({
			title: "Error",
            text: "Some fields are Empty....Please check the fields",
            icon: "warning",
            dangerMode: true,
 })
} 

if (CKEDITOR.instances.manage_plan_comment.getData() != "" && plandocuploadId==null) {
clean();
}
getManageCommentplanssHistory(EmployeeId);
showbenchtobillingdata();
	}
	else{
		 swal({
			title: "Error",
            text: "Please upload single file and file size must be less than 5 MB.",
            icon: "warning",
            dangerMode: true,
	 })
	 }
	}
	else{
		var todate =new Date();
		var EmployeeId=$("#btb_empidval").val();
		var StartDate=$("#btb_empsdateval").val();
		StartDate=StartDate.replace(/<[^>]+>/g, '');
		StartDate=dateFormat(StartDate);
		var EndDate=todate;
		var benchToPlanBillingId=$("#btb_id").val();
		if(benchToPlanBillingId=="null" || benchToPlanBillingId=="")
		{
			data = {
							"Method": "UpdateBenchToBilling",
							"Data": {
							"BenchToBillingId" : null,	
							"EmployeeId":EmployeeId,
							"StartDate":StartDate,
							"EndDate":EndDate
							
		}}
		var postCall = PostDataCall(data);
		if (postCall['IsSuccess'] == true) {
							swal({
							title: "Success!",
							text: "Data Updated Successfully!",
							icon: "success",
							button: "ok!",
						})
		}	
   benchToPlanBillingId =postCall.Data[0].BenchToBillingId;
		}
		if (CKEDITOR.instances.manage_plan_comment.getData() != "") {
var plan=CKEDITOR.instances.manage_plan_comment.getData();
    saveManagePlanComments(benchToPlanBillingId,EmployeeId,plan);
		}
		else{
 swal({
			title: "Error",
            text: "Some fields are Empty....Please check the fields",
            icon: "warning",
            dangerMode: true,
 })
} 

clean();
getManageCommentplanssHistory(EmployeeId);
showbenchtobillingdata();
	}
});

//save plans model popu btn
function savedocsPlanComments(plandocuploadId,EmployeeId) 
{
	
    var AssignRfpDocumentFiles = $('#assign_plan_document_upload').get(0).dropzone.getAcceptedFiles();
	if (AssignRfpDocumentFiles.length > 0) {
     for (i = 0; i < AssignRfpDocumentFiles.length; i++) {
     var FileExtension = AssignRfpDocumentFiles[i].name.slice((Math.max(0, AssignRfpDocumentFiles[i].name.lastIndexOf(".")) || Infinity) + 1);
     var FileType = AssignRfpDocumentFiles[i].type;
     var FileName = AssignRfpDocumentFiles[i].name.substr(0, AssignRfpDocumentFiles[i].name.lastIndexOf("."));
      var AssignRfpDocumentsFormData = new FormData();
	  var uploadfile=AssignRfpDocumentFiles[i];
	  var FileSize = AssignRfpDocumentFiles[i].size / 1024 / 1024; // in MB
	  if (FileSize <= 5) {
      AssignRfpDocumentsFormData.append('content', uploadfile);
      var contentdetails =
         [{
         "DocumentTypeId": plandocuploadId,
         "DocumentType": "RPM",
         "DocumentName":FileName,
         "Extension": FileExtension,
         "ContentType": FileType
        }]

       AssignRfpDocumentsFormData.append('contentDetails', JSON.stringify(contentdetails));
       var SaveAssignRfpDocumentsResult = postFileGeneric(AssignRfpDocumentsFormData);
	   clean();
	   $('#manageBenchlistPlanModals').appendTo("body").modal("hide");
	   
	 }
	 
	 }
   }
   else{
	   showbenchtobillingdata();
		getManageCommentplanssHistory(EmployeeId);
		clean();
   }
   // showbenchtobillingdata();
// getManageCommentplanssHistory(EmployeeId);
}
//save Manage Plan Comments
function saveManagePlanComments(benchToPlanBillingId,EmployeeId, comments) {
	
	var BenchToBillingId=benchToPlanBillingId;
	var EmployeeId=EmployeeId;
	var Plans=comments;
	if(BenchToBillingId!="" && EmployeeId!="" && Plans!="")
	{

 data = {
							"Method": "UpdateBenchToBillingPlan",
							"data":{
							"BenchToBillingPlanId" : null,
							"BenchToBillingId" : BenchToBillingId,
							"EmployeeId" : EmployeeId,
							"Plans": Plans 
			 
    }}

		var postCall = PostDataCall(data);
		if (postCall['IsSuccess'] == true) {
							swal({
							title: "Success!",
							text: postCall.Message,
							icon: "success",
							button: "ok!",
						})
		}
		plandocuploadId=postCall.Data[0].BenchToBillingPlanId;
	// showbenchtobillingdata();	
// getManageCommentplanssHistory(EmployeeId);

	}

}

//get Manage Comment plans sHistory
function getManageCommentplanssHistory(EmpID) {
	
  var filter_val = JSON.stringify({
    "SelectedEmployeeId": EmpID,
    "IsActive": 1
  });
  var getManageplanComments = callgetlist("GetPlansHistory", filter_val);
  // //console.log("History", getManageplanComments);
  var plan_comment_history_html = "";
  var plan_no_comments_count = 0;
  var plan_no_documentsCount = 0;
  getManageplanComments.forEach(function (item) {
	var plan_created_date = new Date(item.CreatedDate);
    var plan_date_month_year = convert(plan_created_date);
	var plan_time = plan_created_date.toLocaleTimeString();
     // if (item.ContentType != null) {
      // commentsContent[item.BenchToBillingId] = item.ContentType.toString();
	 // }
      plan_comment_history_html += "<small class='pull-left' style='padding-top:5px'><span>" + item.CreatedBy + ":</span></small>";
      plan_comment_history_html += "<div class='manage_comment'>";
	  plan_comment_history_html += "<small class='pull-right'><span>" + plan_date_month_year + "</span><span>" + plan_time + "</span></small>";
      plan_comment_history_html += "<small style='padding-bottom:10px'>"+item.Plans+"</small>";
if(item.DocumentName!=null)
{	
	 plan_comment_history_html += "<b>Download-file: </b><button class='btn btn-primary btn-xs' onclick=downloadDocumentRPM('" + item.BenchToBillingPlanId + "')><span class='glyphicon glyphicon-arrow-down'></span></button><span style='padding:10px;'><b>" + item.DocumentName + "." + item.Extension + " </b></span></div>";
}
else
 {
 plan_comment_history_html += "</div>";
 }	
    // }
  
   
 });
 // if(plan_no_comments_count >= 0 && plan_no_documentsCount >= 0 )
 // {
  // plan_comment_history_html = "<h3 class='text-center'>There are No Comments and Documents Yet</h3>";
 // }
  $("#manage_plan_comments_documents").html(plan_comment_history_html);
}
//clean form data
function clean(){
	$("#btb_txtemployeeCode").val("");
	$("#btb_txtemployeeName").val("");
	CKEDITOR.instances.manage_plan_comment.setData("");
	Dropzone.forElement("#assign_plan_document_upload").removeAllFiles(true);
	  $('#manageBenchlistPlanModals').appendTo("body").modal("hide");
}

//model cancel btn
$("#manage_plan_reassign_cancel").on("click", function () {
  $("#btb_txtemployeeCode").val("");
  $("#btb_txtemployeeName").val("");
  CKEDITOR.instances.manage_plan_comment.setData("");
	Dropzone.forElement("#assign_plan_document_upload").removeAllFiles(true);
  $('#manageBenchlistPlanModals').appendTo("body").modal("hide");
});

//download DocumentRPM
function downloadDocumentRPM(PlanId) {
  swal({
    title: "Are you sure?",
    text: "You want to download the File",
    icon: "warning",
    buttons: true,
  })
    .then((willDownload) => {
      if (willDownload) {
        window.open(manageRPMURL + "DownloadFile?query=GetDownloadBillingPlanFile&filters={'PlanId':'" + PlanId + "'}&Token=" + ManagebtbPlanSecurityToken, '_blank');
      }
    });
}
//ckeditor func
function editor(){
	 try {
            CKEDITOR.instances['manage_plan_comment'].destroy();
        } catch (e) {

            var manageplan_Description_ckeditor = CKEDITOR.replace(
                "manage_plan_comment",
                {});

            manageplan_Description_ckeditor.on("paste", function (evt) {
                if (evt.data.dataTransfer.getFilesCount() > 0) {
                    var manageDescriptionFile = evt.data.dataTransfer.getFile(0);
                    var manageDescriptionReader = new FileReader();
                    manageDescriptionReader.onload = function (evt) {
                        var manageDescriptionPictureElement = manageplan_Description_ckeditor.document.createElement(
                            "img",
                            {
                                attributes: {
                                    src: evt.target.result
                                }
                            }
                        );

                        setTimeout(function () {
                            manageplan_Description_ckeditor.insertElement(
                                manageDescriptionPictureElement
                            );
                        }, 0);
                    };
                    manageDescriptionReader.readAsDataURL(manageDescriptionFile);
                }
            });
        }
}

//convert function for date as dd-jun-yyyy
function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [day, mnth, date.getFullYear()].join("-");
}

//close model btn func
function closeManageplanModal(){
	
	$("#btb_txtemployeeCode").val("");
	$("#btb_txtemployeeName").val("");
	CKEDITOR.instances.manage_plan_comment.setData("");
	Dropzone.forElement("#assign_plan_document_upload").removeAllFiles(true);
	  $('#manageBenchlistPlanModals').appendTo("body").modal("hide");
}

