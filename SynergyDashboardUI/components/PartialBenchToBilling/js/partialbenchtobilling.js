
$(document).ready(function () {

  //pbb_showbenchtobillingdata();
        
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
 $("#partialBenchToBillingGrid").on('click','.btnSelect',function(){
 // get the current row

         var currentRow=$(this).closest("tr"); 
         
         var rno=currentRow.find(".rno").html(); 
		 var eid=currentRow.find(".eid").html(); 
         var ecode=currentRow.find(".ecode").html(); 
         var ename=currentRow.find(".ename").html(); 
		 var sdate=currentRow.find(".date").html(); 
		 // var eid=currentRow.find("td:eq(7)").html(); 
		 var btbid=currentRow.find(".bid").html();
		 
		$("#btb_txtpartialemployeeCode").val(ecode);
		$("#btb_txtpartialemployeeName").val(ename);
		$("#partial_btb_empidval").val(eid);
		$("#partial_btb_empsdateval").val(sdate);
		$("#partial_btb_id").val(btbid);
		//ckediter & dropzone
		 $("#managePartialBenchlistPlanModals").appendTo("body").modal("show");
	     //$('#managePartialBenchlistPlanModals').modal('show');
		  pbb_getManageCommentplansHistory(eid);
		 pbb_editor();
		//resetdata();
	 // CKEDITOR.instances.manage_partial_plan_comment.setData("");
	 
		// display value in popup
        $("#btb_txtpartialemployeeCode").val(ecode);
		$("#btb_txtpartialemployeeName").val(ename);
		$("#partial_btb_empidval").val(eid);
		$("#partial_btb_empsdateval").val(sdate);
		$("#partial_btb_id").val(btbid);
         
         
  });

 //showplan function 
function showbenchplan(){}

//show skill details
function pbb_showskill(empid)
{
var id=empid;
 $('.form-control').removeClass('required_field');
 $('.error_message').html('');
 $('#showpartialemployeeskills').appendTo("body").modal("show");
   var GetTechEmpIdFilters = JSON.stringify({
    "EmployeeId": id
  });
  var GetskillListbyID = callgetlist("GetResourceSkillsById", GetTechEmpIdFilters);
  // var GetskillListbyID = callgetlist('GetEmployeeSkills','{"EmployeeId":"'+id+'"}');
  var mapskilllistbyid = pbb_mapskilltListcomputeHTML(GetskillListbyID);
  $('#tblpartialemployeeskilldata').html(mapskilllistbyid);
}
//map skill List compute HTML
function pbb_mapskilltListcomputeHTML(GetskillListbyID) {

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
function pbb_saveManagePlanDocuments(id)
{
	
	// $('#benchtobillingmodel').appendTo("body").modal("show");
	pbb_saveManagePlanComments(id); 
}
//convert date Format
function pbb_dateFormat(convertDate){
	if(convertDate!="")
		{
			var event = new Date(convertDate);
			convertDate = JSON.stringify(event)
			convertDate = convertDate.slice(1,11)
		}
		return convertDate;
}
//save btm model popup
$("#manage_partial_plan_reassign_save").on("click", function () {
	
	var validatefiledoc  = $('#assign_partial_plan_document_upload').get(0).dropzone.getAcceptedFiles();
	if(validatefiledoc.length!=0)
	{
	var size=validatefiledoc[0].size / 1024 / 1024;
	if(validatefiledoc.length <2 && size<=5)
		
	{
	var todate =new Date();
		var EmployeeId=$("#partial_btb_empidval").val();
		var StartDate=$("#partial_btb_empsdateval").val();
		StartDate=StartDate.replace(/<[^>]+>/g, '');
		StartDate=pbb_dateFormat(StartDate);
		var EndDate=todate;
		EndDate=pbb_dateFormat(EndDate);
		var BenchToPartialPlanBillingId=$("#partial_btb_id").val();
		if(BenchToPartialPlanBillingId=="null" || BenchToPartialPlanBillingId=="")
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
   BenchToPartialPlanBillingId =postCall.Data[0].BenchToBillingId;
		}
		

 if (CKEDITOR.instances.manage_partial_plan_comment.getData() != "") {

    pbb_saveManagePlanComments(BenchToPartialPlanBillingId,EmployeeId, CKEDITOR.instances.manage_partial_plan_comment.getData());
   
if(plandocuploadId !="")
{
    pbb_savedocsPlanComments(plandocuploadId,EmployeeId);

pbb_getManageCommentplansHistory(EmployeeId);
pbb_showbenchtobillingdata();	
// pbb_clean();
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

if (CKEDITOR.instances.manage_partial_plan_comment.getData() != "" && plandocuploadId==null) {
pbb_clean();
}
pbb_getManageCommentplansHistory(EmployeeId);
pbb_showbenchtobillingdata();
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
		var EmployeeId=$("#partial_btb_empidval").val();
		var StartDate=$("#partial_btb_empsdateval").val();
		StartDate=StartDate.replace(/<[^>]+>/g, '');
		StartDate=pbb_dateFormat(StartDate);
		var EndDate=todate;
		var BenchToPartialPlanBillingId=$("#partial_btb_id").val();
		if(BenchToPartialPlanBillingId=="null" || BenchToPartialPlanBillingId=="")
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
   BenchToPartialPlanBillingId =postCall.Data[0].BenchToBillingId;
		}
		if (CKEDITOR.instances.manage_partial_plan_comment.getData() != "") {
var plan=CKEDITOR.instances.manage_partial_plan_comment.getData();
    pbb_saveManagePlanComments(BenchToPartialPlanBillingId,EmployeeId,plan);
		}
		else{
 swal({
			title: "Error",
            text: "Some fields are Empty....Please check the fields",
            icon: "warning",
            dangerMode: true,
 })
} 

pbb_clean();
pbb_getManageCommentplansHistory(EmployeeId);
pbb_showbenchtobillingdata();
	}
});

//save plans model popu btn
function pbb_savedocsPlanComments(plandocuploadId,EmployeeId) 
{
	
    var AssignRfpDocumentFiles = $('#assign_partial_plan_document_upload').get(0).dropzone.getAcceptedFiles();
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
	   pbb_clean();
	   $('#managePartialBenchlistPlanModals').appendTo("body").modal("hide");
	   
	 }
	 
	 }
   }
   else{
	   pbb_showbenchtobillingdata();
		pbb_getManageCommentplansHistory(EmployeeId);
		pbb_clean();
   }
   // pbb_showbenchtobillingdata();
// pbb_getManageCommentplansHistory(EmployeeId);
}
//save Manage Plan Comments
function pbb_saveManagePlanComments(BenchToPartialPlanBillingId,EmployeeId, comments) {
	
	var BenchToBillingId=BenchToPartialPlanBillingId;
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
	// pbb_showbenchtobillingdata();	
// pbb_getManageCommentplansHistory(EmployeeId);

	}

}

//get Manage Comment plans sHistory
function pbb_getManageCommentplansHistory(EmpID) {
	
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
    var plan_date_month_year = pbb_convert(plan_created_date);
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
	 plan_comment_history_html += "<b>Download-file: </b><button class='btn btn-primary btn-xs' onclick=pbb_downloadDocumentRPM('" + item.BenchToBillingPlanId + "')><span class='glyphicon glyphicon-arrow-down'></span></button><span style='padding:10px;'><b>" + item.DocumentName + "." + item.Extension + " </b></span></div>";
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
  $("#manage_partial_plan_comments_documents").html(plan_comment_history_html);
}
//clean form data
function pbb_clean(){
	$("#btb_txtpartialemployeeCode").val("");
	$("#btb_txtpartialemployeeName").val("");
	CKEDITOR.instances.manage_partial_plan_comment.setData("");
	Dropzone.forElement("#assign_partial_plan_document_upload").removeAllFiles(true);
	  $('#managePartialBenchlistPlanModals').appendTo("body").modal("hide");
}

//model cancel btn
$("#manage_partial_plan_reassign_cancel").on("click", function () {
  $("#btb_txtpartialemployeeCode").val("");
  $("#btb_txtpartialemployeeName").val("");
  CKEDITOR.instances.manage_partial_plan_comment.setData("");
	Dropzone.forElement("#assign_partial_plan_document_upload").removeAllFiles(true);
  $('#managePartialBenchlistPlanModals').appendTo("body").modal("hide");
});

//download DocumentRPM
function pbb_downloadDocumentRPM(PlanId) {
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
function pbb_editor(){
	 try {
            CKEDITOR.instances['manage_partial_plan_comment'].destroy();
        } catch (e) {

            var manageplan_Description_ckeditor = CKEDITOR.replace(
                "manage_partial_plan_comment",
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
function pbb_convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [day, mnth, date.getFullYear()].join("-");
}

//close model btn func
function pbb_closeManageplanModal(){
	
	$("#btb_txtpartialemployeeCode").val("");
	$("#btb_txtpartialemployeeName").val("");
	CKEDITOR.instances.manage_partial_plan_comment.setData("");
	Dropzone.forElement("#assign_partial_plan_document_upload").removeAllFiles(true);
	  $('#managePartialBenchlistPlanModals').appendTo("body").modal("hide");
}

