
$(document).ready(function () {

  //rab_showbenchtobillingdata();
        
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
 $("#ResourcesinAverageBillingGrid").on('click','.btnSelect',function(){
 // get the current row

         var currentRow=$(this).closest("tr"); 
         
         var rno=currentRow.find(".rno").html(); 
		 var eid=currentRow.find(".eid").html(); 
         var ecode=currentRow.find(".ecode").html(); 
         var ename=currentRow.find(".ename").html(); 
		 var sdate=currentRow.find(".date").html(); 
		 // var eid=currentRow.find("td:eq(7)").html(); 
		 var btbid=currentRow.find(".bid").html();
		 
		$("#btb_txtresourcesinaverageemployeeCode").val(ecode);
		$("#btb_txtresourcesinaverageemployeeName").val(ename);
		$("#ResourcesinAverage_btb_empidval").val(eid);
		$("#ResourcesinAverage_btb_empsdateval").val(sdate);
		$("#ResourcesinAverage_btb_id").val(btbid);
		//ckediter & dropzone
		 $("#ResourcesinAverageBillingPlanModals").appendTo("body").modal("show");
	     //$('#ResourcesinAverageBillingPlanModals').modal('show');
		  rab_getManageCommentplanssHistory(eid);
		 rab_editor();
		//resetdata();
	 // CKEDITOR.instances.resources_in_average_plan_comment.setData("");
	 
		// display value in popup
        $("#btb_txtresourcesinaverageemployeeCode").val(ecode);
		$("#btb_txtresourcesinaverageemployeeName").val(ename);
		$("#ResourcesinAverage_btb_empidval").val(eid);
		$("#ResourcesinAverage_btb_empsdateval").val(sdate);
		$("#ResourcesinAverage_btb_id").val(btbid);
         
         
  });

 //showplan function 
function showbenchplan(){}

//show skill details
function rab_showskill(empid)
{
var id=empid;
 $('.form-control').removeClass('required_field');
 $('.error_message').html('');
 $('#showresourcesinaverageemployeeskills').appendTo("body").modal("show");
   var GetTechEmpIdFilters = JSON.stringify({
    "EmployeeId": id
  });
  var GetskillListbyID = callgetlist("GetResourceSkillsById", GetTechEmpIdFilters);
  // var GetskillListbyID = callgetlist('GetEmployeeSkills','{"EmployeeId":"'+id+'"}');
  var mapskilllistbyid = rab_mapskilltListcomputeHTML(GetskillListbyID);
  $('#tblresourcesinaverageemployeeskilldata').html(mapskilllistbyid);
}
//map skill List compute HTML
function rab_mapskilltListcomputeHTML(GetskillListbyID) {

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
//save Manage Plan Documents
function rab_saveManagePlanDocuments(id)
{
	
	// $('#benchtobillingmodel').appendTo("body").modal("show");
	rab_saveManagePlanComments(id); 
}
//convert date Format
function rab_dateFormat(convertDate){
	if(convertDate!="")
		{
			var event = new Date(convertDate);
			convertDate = JSON.stringify(event)
			convertDate = convertDate.slice(1,11)
		}
		return convertDate;
}
//save btm model popup
$("#resources_in_average_plan_reassign_save").on("click", function () {
	var validatefiledoc  = $('#resources_in_average_plan_document_upload').get(0).dropzone.getAcceptedFiles();
	if(validatefiledoc.length!=0)
	{
	var size=validatefiledoc[0].size / 1024 / 1024;
	if(validatefiledoc.length <2 && size<=5)
		
	{
	var todate =new Date();
		var EmployeeId=$("#ResourcesinAverage_btb_empidval").val();
		var StartDate=$("#ResourcesinAverage_btb_empsdateval").val();
		StartDate=StartDate.replace(/<[^>]+>/g, '');
		StartDate=rab_dateFormat(StartDate);
		var EndDate=todate;
		EndDate=rab_dateFormat(EndDate);
		var ResourcesinAveragePlanBillingId=$("#ResourcesinAverage_btb_id").val();
		if(ResourcesinAveragePlanBillingId=="null" || ResourcesinAveragePlanBillingId=="")
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
   ResourcesinAveragePlanBillingId =postCall.Data[0].BenchToBillingId;
		}
		

 if (CKEDITOR.instances.resources_in_average_plan_comment.getData() != "") {

    rab_saveManagePlanComments(ResourcesinAveragePlanBillingId,EmployeeId, CKEDITOR.instances.resources_in_average_plan_comment.getData());
   
if(plandocuploadId !="")
{
    rab_savedocsPlanComments(plandocuploadId,EmployeeId);

rab_getManageCommentplanssHistory(EmployeeId);
rab_showbenchtobillingdata();	
// rab_clean();
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

if (CKEDITOR.instances.resources_in_average_plan_comment.getData() != "" && plandocuploadId==null) {
rab_clean();
}
rab_getManageCommentplanssHistory(EmployeeId);
rab_showbenchtobillingdata();
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
		var EmployeeId=$("#ResourcesinAverage_btb_empidval").val();
		var StartDate=$("#ResourcesinAverage_btb_empsdateval").val();
		StartDate=StartDate.replace(/<[^>]+>/g, '');
		StartDate=rab_dateFormat(StartDate);
		var EndDate=todate;
		var ResourcesinAveragePlanBillingId=$("#ResourcesinAverage_btb_id").val();
		if(ResourcesinAveragePlanBillingId=="null" || ResourcesinAveragePlanBillingId=="")
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
   ResourcesinAveragePlanBillingId =postCall.Data[0].BenchToBillingId;
		}
		if (CKEDITOR.instances.resources_in_average_plan_comment.getData() != "") {
var plan=CKEDITOR.instances.resources_in_average_plan_comment.getData();
    rab_saveManagePlanComments(ResourcesinAveragePlanBillingId,EmployeeId,plan);
		}
		else{
 swal({
			title: "Error",
            text: "Some fields are Empty....Please check the fields",
            icon: "warning",
            dangerMode: true,
 })
} 

rab_clean();
rab_getManageCommentplanssHistory(EmployeeId);
rab_showbenchtobillingdata();
	}
});

//save plans model popu btn
function rab_savedocsPlanComments(plandocuploadId,EmployeeId) 
{
	
    var AssignRfpDocumentFiles = $('#resources_in_average_plan_document_upload').get(0).dropzone.getAcceptedFiles();
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
	   rab_clean();
	   $('#ResourcesinAverageBillingPlanModals').appendTo("body").modal("hide");
	   
	 }
	 
	 }
   }
   else{
	   rab_showbenchtobillingdata();
		rab_getManageCommentplanssHistory(EmployeeId);
		rab_clean();
   }
   // rab_showbenchtobillingdata();
// rab_getManageCommentplanssHistory(EmployeeId);
}
//save Manage Plan Comments
function rab_saveManagePlanComments(ResourcesinAveragePlanBillingId,EmployeeId, comments) {
	
	var BenchToBillingId=ResourcesinAveragePlanBillingId;
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
	// rab_showbenchtobillingdata();	
// rab_getManageCommentplanssHistory(EmployeeId);

	}

}

//get Manage Comment plans sHistory
function rab_getManageCommentplanssHistory(EmpID) {
	
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
    var plan_date_month_year = rab_convert(plan_created_date);
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
	 plan_comment_history_html += "<b>Download-file: </b><button class='btn btn-primary btn-xs' onclick=rab_downloadDocumentRPM('" + item.BenchToBillingPlanId + "')><span class='glyphicon glyphicon-arrow-down'></span></button><span style='padding:10px;'><b>" + item.DocumentName + "." + item.Extension + " </b></span></div>";
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
  $("#resources_in_average_plan_comments_documents").html(plan_comment_history_html);
}
//clean form data
function rab_clean(){
	$("#btb_txtresourcesinaverageemployeeCode").val("");
	$("#btb_txtresourcesinaverageemployeeName").val("");
	CKEDITOR.instances.resources_in_average_plan_comment.setData("");
	Dropzone.forElement("#resources_in_average_plan_document_upload").removeAllFiles(true);
	  $('#ResourcesinAverageBillingPlanModals').appendTo("body").modal("hide");
}

//model cancel btn
$("#resources_in_average_plan_reassign_cancel").on("click", function () {
  $("#btb_txtresourcesinaverageemployeeCode").val("");
  $("#btb_txtresourcesinaverageemployeeName").val("");
  CKEDITOR.instances.resources_in_average_plan_comment.setData("");
	Dropzone.forElement("#resources_in_average_plan_document_upload").removeAllFiles(true);
  $('#ResourcesinAverageBillingPlanModals').appendTo("body").modal("hide");
});

//download DocumentRPM
function rab_downloadDocumentRPM(PlanId) {
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
function rab_editor(){
	 try {
            CKEDITOR.instances['resources_in_average_plan_comment'].destroy();
        } catch (e) {

            var manageplan_Description_ckeditor = CKEDITOR.replace(
                "resources_in_average_plan_comment",
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
function rab_convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [day, mnth, date.getFullYear()].join("-");
}

//close model btn func
function rab_closeManageplanModal(){
	
	$("#btb_txtresourcesinaverageemployeeCode").val("");
	$("#btb_txtresourcesinaverageemployeeName").val("");
	CKEDITOR.instances.resources_in_average_plan_comment.setData("");
	Dropzone.forElement("#resources_in_average_plan_document_upload").removeAllFiles(true);
	  $('#ResourcesinAverageBillingPlanModals').appendTo("body").modal("hide");
}

