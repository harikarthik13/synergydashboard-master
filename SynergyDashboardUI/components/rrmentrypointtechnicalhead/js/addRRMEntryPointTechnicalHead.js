AddRRMEntryPointTechnicalHead = (function(){
var _addRRMEntryPointTechnicalHead = {};
var GetRRMs;
var dataResource = [];
var dataPlanA = [];
var dataPlanB = [];
var dataComments = [];
var ResourceRequirementId;
var dataSkillApi = [];
var table;
var skilltblid; 
var ResourceRequirementSkillPlanId=null;
var nextFlag = false;
var IsRrmSaved = false;

function mapUI(){
    $rrmtab =  $('#rrmtab')
    $rrm_entrybdeTechnicalHead= $("#rrm_entrybdeTechnicalHead"),
    $rrm_empidTechnicalHead = $("#rrm_empidTechnicalHead"),
    $rrm_replacementTechnicalHead = $("#rrm_replacementTechnicalHead"),
    $rrm_experiencerequired = $("#rrm_experiencerequired"), 
    $rrm_requirementlead = $("#rrm_requirementlead")
}

//save hr commnents once save&close btn clicked 
    _addRRMEntryPointTechnicalHead.saveComments = function () {
        
    var finalComments=$("#sd_txtEditor_RRMTechnicalHeadComments").dxHtmlEditor('instance').option("value");
    if(finalComments=="")
    {
      //
    }
    else
    {	
      dataComments={
      "Method":"PostCommentsInResourceRequirement",
      "Data":{
      "ResourceRequirementId":ResourceRequirementId,
      "Comments":finalComments,   
      "IsActive":'True',
            }
    }

    PostDataCallAsync(dataComments,function(e){
    resultComments = e;

    swal({
      title: "Success!",
      text: "Saved Successfully!",
      icon: "success",
      button: "ok!",
        });

    
    });
        }
        ResourceRequirementSkillPlanId = null;
        ResourceRequirementId = null;
        $('#RRMEntryPointModelTechnicalHead').modal("hide");
        var rrmEntryGrid = RRMEntryPointGridOwner("TechnicalHead");
        rrmEntryGrid.getRRMEntryTable();
        _addRRMEntryPointTechnicalHead.clearAll_addrrmdata();
    }

//tab next button event (rrmentry->skills->planA->planB->commnets) 
_addRRMEntryPointTechnicalHead.toggleTabRRMEntry = function() { 
  
    var activeTab = $('#rrmtabTechnicalHead').find('li.active').attr('id')
    var EmployeeId;

    if (activeTab == "rrm_requirementTabTechnicalHead")
    {   
    requirmentName=$("#sdtxt_rrmtechnicalhead_requirementname").dxTextBox('instance').option('value');
     requireFor=$("#sdtxt_rrmtechnicalhead_requiredfor").dxTextBox('instance').option('value'); 
     bde=$("#rrm_entrybdeTechnicalHead").val();  
     if(bde==""){bde=null;}	 
     EmployeeId=$("#rrm_empidTechnicalHead").val();
     if(EmployeeId==""){EmployeeId=null}
     replacementFor=$("#rrm_replacementTechnicalHead").val();
     position=$("#sdnmb_rrmtechnicalhead_numberofpositions").dxNumberBox('instance').option('value');
     priority=$("#sdcmb_rrmtechnicalhead_priority").dxSelectBox('instance').option('value');
     department=$("#sdcmb_rrmtechnicalhead_department").dxSelectBox('instance').option('value');
     designation=$("#sdcmb_rrmtechnicalhead_designation").dxSelectBox('instance').option('value');
        experience = $("#rrm_experiencerequiredTechnicalHead").val();
     communication=$("#sdcmb_rrmtechnicalhead_communication").dxSelectBox('instance').option('value');
     reqlocation=$("#sdtxt_rrmtechnicalhead_location").dxTextBox('instance').option('value');
     if(reqlocation==""){reqlocation=null;}
     if(ResourceRequirementId=="" ||ResourceRequirementId==undefined)
     {
      ResourceRequirementId=null;
     }	 
     requestedDate=$("#sd_date_rrmtechnicalhead_requestedDate").dxDateBox('instance').option('value');   
     losingRevenue= $("#sdchk_rrmtechnicalhead_losingRevenue").dxCheckBox('instance').option('value');
     fromVIP=$("#sdchk_rrmtechnicalhead_fromVIP").dxCheckBox('instance').option('value');   
     requirmentLead=$("rrm_requirementlead").val();;
	   var finalRequestedDate = moment(requestedDate).format("DD-MM-YYYY");
  
     if(requirmentName == "" || requireFor==""||position==""||position=="0"||department==""||designation==""||experience==""||experience=="0"){
     if (requirmentName == "")
     {
     $('#sdtxt_rrmtechnicalhead_requirementname').addClass('input-error');
     $('#rrm_requirementnameTechnicalHeadError').html("Enter Requirment Name");
     }
     else
     {
       $('#sdtxt_rrmtechnicalhead_requirementname').removeClass('input-error');
       $('#rrm_requirementnameTechnicalHeadError').html("");
     }
     if(requireFor=="")
     {
       $('#sdtxt_rrmtechnicalhead_requiredfor').addClass('input-error');
       $('#rrm_requiredforTechnicalHeadError').html("Enter Required For");
     }
     else
     {
     $('#sdtxt_rrmtechnicalhead_requiredfor').removeClass('input-error');
     $('#rrm_requiredforTechnicalHeadError').html("");
     } 
     if(position==""||position=="0")
     {
     if(position=="")
     {
      if(position=="")
        {
          $('#sdnmb_rrmtechnicalhead_numberofpositions').addClass('input-error');
          $('#rrm_numberofpositionsTechnicalHeadError').html("Enter Position");
        }
      else
        {
          $('#sdnmb_rrmtechnicalhead_numberofpositions').removeClass('input-error');
          $('#rrm_numberofpositionsTechnicalHeadError').html("");
        }
     }
     if(position=="0")
      {
        if(position=="0")
          {
            $('#sdnmb_rrmtechnicalhead_numberofpositions').addClass('input-error');
            $('#rrm_numberofpositionsTechnicalHeadError').html("Min Position is 1");
          }
     else
       {
         $('#sdnmb_rrmtechnicalhead_numberofpositions').removeClass('input-error');
        $('#rrm_numberofpositionsTechnicalHeadError').html("");
        }
    }
  }
    if(department=="")
    {
       $('#sdcmb_rrmtechnicalhead_department').addClass('input-error');
      $('#rrm_departmentTechnicalHeadError').html("Select Department");
    }
    else
    {
       $('#sdcmb_rrmtechnicalhead_department').removeClass('input-error');
        $('#rrm_departmentTechnicalHeadError').html("");
    }
    if(designation=="")
    {
      $('#sdcmb_rrmtechnicalhead_designation').addClass('input-error');
      $('#rrm_designationTechnicalHeadError').html("Select Designation");
    }
    else
    {
      $('#sdcmb_rrmtechnicalhead_designation').removeClass('input-error');
      $('#rrm_designationTechnicalHeadError').html("");
     }
    if(experience==""||experience=="0")
    {
      if(experience=="")
      {  
        if(experience=="")
        {
          $('#rrm_experiencerequired').addClass('input-error');
          $('#rrm_experiencerequiredError').html("Select Experience");
        }
        else
        {
          $('#rrm_experiencerequired').removeClass('input-error');
          $('#rrm_experiencerequiredError').html("");
        }
      }
     if(experience=="0")
     {
      if(experience=="0")
        {
          $('#rrm_experiencerequired').addClass('input-error');
          $('#rrm_experiencerequiredError').html("Min Experience is 1");
        }
      else
        {
        $('#rrm_experiencerequired').removeClass('input-error');
        $('#rrm_experiencerequiredError').html("");
        }
    }
  }
  
  $('.nav-tabs a[href="#rrm_requirementTab"]').tab("show");
  $(".btnPrevious").hide();
    if (!IsRrmSaved) 
      {
        $(".saveFamilyBtn").hide();
        $("a.btnNext").show();
      }     
 }
 else
  { 
     dataResource = {
    "Method": "PostResourceRequirement",
    "Data": {                             
    "Token":Token,   
    "RequirementName": requirmentName,
    "ResourceRequirementId":ResourceRequirementId,
    "ResourceRequirementTypeId":null,
    "RequiredFor": requireFor, 
    //"RequestForProposalId": null,
    "BDEId":bde, 
    "RequestForProposalId": EmployeeId,
    "ReplacementEmployeeId": replacementFor, 
    "NumberOfPositions": position,
    "PriorityId": priority, 
    "DepartmentId": department,
    "DesignationId": designation, 
    "ExperiencerequiredInYrs": experience, 
    "CommunicationId":  communication,
    "LocationId": reqlocation, 
    "RequestedDate": requestedDate,
    "LosingRevenue": losingRevenue, 
    "VIP": fromVIP,
    "LeadId": BackupLeadId, 
        "ResignedEmployeeId": EmployeeId,
    "IsActive": 'true',  
    }
  }
  
         //var resultResorce = PostDataCall(dataResource); 
         PostDataCallAsync(dataResource, function (resultResorce) {
             if (ResourceRequirementId == null) {
                 ResourceRequirementId = resultResorce.Data[0].ResourceRequirementId;
             }
             $('.nav-tabs a[href="#rrm_SkillDetailsTechnicalHead"]').tab("show");
             $(".btnPrevious").show();
             if (!IsRrmSaved) {
                 $(".saveFamilyBtn").hide();
                 $("a.btnNext").show();
             }
         });

  _addRRMEntryPointTechnicalHead.getSkillsDetails();
}
}
      $(".btnPrevious").show();
      if (!IsRrmSaved) 
        {
            $(".saveFamilyBtn").hide();
            $("a.btnNext").show();

          if (activeTab == "rrm_skillsTabTechnicalHead") 
    {   
      family=$("#familyentry").value;
      skills=$("#skillentry").value;
      version=$("#skillversionentry").value;   

      var data = $("#sdgd-rrmTechnicalHeadSkills").dxDataGrid("instance").option("dataSource");
      if (data.length == 0) {
          swal({
							title: "Warning!",
							text: "Please Add Skill  Details",
							icon: "warning",
							button: "ok!",
		          })
      }
      else
      {
          $('.nav-tabs a[href="#rrm_SkillsPlanADetailsTechnicalHead"]').tab("show");
         $(".btnPrevious").show();
        if (!IsRrmSaved) 
          {
            $(".saveFamilyBtn").hide();
            $("a.btnNext").show();
          }
      }
}

          if (activeTab == "rrm_skillsplanaTabTechnicalHead") {
    var datecheck=0;
    skillDetailsA = $("#sd_txtEditor_technicalHead_skillDetailsPlanA").dxHtmlEditor('instance').option("value");
    
    toOnBoardA=$("#rrm_tobeonboardplanaTechnicalHead").val();
              requirtersA = $("#rrm_TechnicalHeadsplanaTechnicalHead").val(); 
    var varEDate = new Date().toISOString().slice(0,10); //dd-mm-YYYY

	 if(toOnBoardA <= varEDate) {
		 datecheck=1;
	swal({
							title: "Warning!",
							text: "Please enter valid Date current and previous date should not be selected",
							icon: "warning",
							button: "ok!",
		})
	 }
	
   if((skillDetailsA==""||toOnBoardA=="") || datecheck==1){

     if(skillDetailsA==""){
       $('#sd_txtEditor_technicalHead_skillDetailsPlanA').addClass('input-error');
       $('#rrm_skilldetailsplanaTechnicalHeadError').html("Enter Skill Details");
     }
     else{
       $('#sd_txtEditor_technicalHead_skillDetailsPlanA').removeClass('input-error');
       $('#rrm_skilldetailsplanaTechnicalHeadError').html("");
     }
     if(toOnBoardA==""){
       $('#rrm_tobeonboardplanaTechnicalHead').addClass('input-error');
       $('#rrm_tobeonboardplanaTechnicalHeadError').html("Select Date");
     }
     else{
       $('#rrm_tobeonboardplanaTechnicalHead').removeClass('input-error');
       $('#rrm_tobeonboardplanaTechnicalHeadError').html("");
     }
     $('.nav-tabs a[href="#rrm_skillsplanaTab"]').tab("show");
     
     $(".btnPrevious").show();
     if (!IsRrmSaved) {
     $(".saveFamilyBtn").hide();
     $("a.btnNext").show();
     } 
   }
  else{
   dataPlanA={
   "Method":"PostResourceRequrimentSkillPlans",
   "Data":{
     "ResourceRequirementId":ResourceRequirementId,
     "ResourceRequirementSkillPlanId":ResourceRequirementSkillPlanId,
     "SkillPlan":'PlanA',
     "SkillPlanInfo":skillDetailsA,
     "ToBeOnBoard":toOnBoardA,
     //"RecruiterId":null,
     "IsActive":'True',
   }
 }
       var resulPlanBt = PostDataCall(dataPlanA);
       PostDataCallAsync(dataPlanA, function (resulPlanBt) {
           $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsTechnicalHead"]').tab("show");
           $(".btnPrevious").show();
           if (!IsRrmSaved) {
               $(".saveFamilyBtn").hide();
               $("a.btnNext").show();
           }
       });  
  }   
  }

          if (activeTab == "rrm_skillsplanbTabTechnicalHead") {   
  var datecheckplanb=0;
  skillDetailsB= $("#sd_txtEditor_technicalHead_skillDetailsPlanB").dxHtmlEditor('instance').option("value");

      toOnBoardB = $("#sd_date_rrm_technicalHead_tobeonboardplanb").dxDateBox('instance').option("value");
  requirtersB=$("#rrm_TechnicalHeadsplanbTechnicalHead").val();
	var varEDate = new Date().toISOString().slice(0,10); //dd-mm-YYYY
	
	if(toOnBoardB <= varEDate) {
		datecheckplanb=1;
swal({
							title: "Warning!",
							text: "Please enter valid Date current and previous date should not be selected",
							icon: "warning",
							button: "ok!",
						})
        $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsTechnicalHead"]').tab("show");
}
   if((skillDetailsB==""||toOnBoardB=="")||datecheckplanb==1){
   if(skillDetailsB==""){
    $('#sd_txtEditor_technicalHead_skillDetailsPlanB').addClass('input-error');
    $('#rrm_skilldetailsplanbTechnicalHeadError').html("Enter Skill Details");
    } else{
    $('#sd_txtEditor_technicalHead_skillDetailsPlanB').removeClass('input-error');
     $('#rrm_skilldetailsplanbTechnicalHeadError').html("");
    }
     if(toOnBoardB==""){
     $('#sd_date_rrm_technicalHead_tobeonboardplanb').addClass('input-error');
     $('#rrm_tobeonboardplanbTechnicalHeadError').html("Select Date");
     } else{
     $('#sd_date_rrm_technicalHead_tobeonboardplanb').removeClass('input-error');
    $('#rrm_tobeonboardplanbTechnicalHeadError').html("");
     }
     $('.nav-tabs a[href="#rrm_skillsplanbTab"]').tab("show");
   $(".btnPrevious").show();
    if (!IsRrmSaved) {
    $(".saveFamilyBtn").hide();
    $("a.btnNext").show();
    } 
    }
    else{
      
 dataPlanB={
   "Method":"PostResourceRequrimentSkillPlans",
  "Data":{
    "ResourceRequirementId": ResourceRequirementId,
   "ResourceRequirementSkillPlanId":ResourceRequirementSkillPlanId,
   "SkillPlan":'PlanB',
   "SkillPlanInfo":skillDetailsB,
   "ToBeOnBoard":toOnBoardB,
   //"RecruiterId":null,
   "IsActive":'True',

   }
 }
       //var resulPlanBt = PostDataCall(dataPlanB);
       PostDataCallAsync(dataPlanB, function (resulPlanBt) {
           $('.nav-tabs a[href="#rrm_CommentsDetailsTechnicalHead"]').tab("show");
           $("#rrm_manage_plan_comments_documents_TechnicalHead").hide();
           $(".btnPrevious").show();
           if (!IsRrmSaved) {
               $(".saveFamilyBtn").show();
               $("a.btnNext").hide();
               //_addRRMEntryPointTechnicalHead.getcommentsinrrm();
           }
       });   
    }   
  }

}}

//tab previous button functions (rrmentry<-skills<-planA<-planB<-commnets) 
_addRRMEntryPointTechnicalHead.toggleTabRRMEntryPrevious = function(){
  
   var activeTab = $('#rrmtab').find('li.active').attr('id')
      if (activeTab == "rrm_skillsplanaTab") 
      {
          $('.nav-tabs a[href="#rrm_SkillDetails"]').tab("show");
          $("a.btnNext").show();
          $(".saveFamilyBtn").hide();
      }
      if (activeTab == "rrm_skillsTab") 
        {
            $('.nav-tabs a[href="#rrm_RequirementDetailsTechnicalHead"]').tab("show");
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
            $(".btnPrevious").hide();
            _addRRMEntryPointTechnicalHead.updateresourcerequitementdata();
        }
    if (activeTab == "rrm_skillsplanbTab")
     {
        $('.nav-tabs a[href="#rrm_SkillsPlanADetails"]').tab("show");
        $("a.btnNext").show();
        $(".btnPrevious").show();
        $(".saveFamilyBtn").hide();
       
      var filter_valbtn = JSON.stringify({
          "IsActive":"True",
		  	  "Token":Token,
		  	  "SkillPlan":'PlanA',
		  	  "ResourceRequirementId":ResourceRequirementId
      });

    //  var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
        callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {
            if (result != null) {
              $("#sd_txtEditor_technicalHead_skillDetailsPlanA").dxHtmlEditor('instance').option("value",result[0].SkillPlanInfo);
                var edate = result[0].ToBeOnBoard;
                var ed = edate;
                var enddateChanged = ed.replace(/\//g, "-");
                enddateChanged = enddateChanged.replace("T00:00:00", "");
                enddateChanged = enddateChanged.split('-');
                enddateChanged = enddateChanged[0] + "-" + enddateChanged[1] + "-" + enddateChanged[2];
                $("#rrm_tobeonboardplanaTechnicalHead").val(enddateChanged);
                ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
            }
        });
    }
    if (activeTab == "rrm_commentsTechnicalHeadTab") 
    {

        comments = $("#sd_txtEditor_technicalHead_skillDetailsPlanB").dxHtmlEditor('instance').option("value");

        if (!IsRrmSaved) {
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
        } else {
            $("a.btnNext").hide();
        }
        $(".btnPrevious").show();
        $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsTechnicalHead"]').tab("show");
        var filter_valbtn = JSON.stringify({
          "IsActive":"True",
          "Token":Token,
          "SkillPlans":'PlanB',
          "ResourceRequirementId":ResourceRequirementId
        });
        var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
        callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {
            if (result != null) {
              $("#sd_txtEditor_technicalHead_skillDetailsPlanB").dxHtmlEditor('instance').option("value",result[0].SkillPlanInfo);
                var edate = result[0].ToBeOnBoard;
                var ed = edate;
                $("#sd_date_rrm_technicalHead_tobeonboardplanb").dxDateBox('instance').option("value",ed);
                ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
            }
        });
    }
}

// get rrm detials by id
_addRRMEntryPointTechnicalHead.updateresourcerequitementdata = function()
{
    //var getRRMData = callgetlist('GetRRMbyid','{"IsActive":"True","ResourceRequirementId":"'+ResourceRequirementId+'","Token":"'+Token+'"}');
    callGetListAsync('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + ResourceRequirementId + '","Token":"' + Token + '"}', function (getRRMData) {
        _addRRMEntryPointTechnicalHead.mapupdateaddrrmListcomputeHTML(getRRMData);
    });
}

//bind rrm data from _addRRMEntryPointTechnicalHead.updateresourcerequitementdata function result
_addRRMEntryPointTechnicalHead.mapupdateaddrrmListcomputeHTML = function(getRRMData){
    if (getRRMData[0].rrmid=="") 
    {
        //
    }
    else
       {
           var data;
          getRRMData.forEach(function (key, item) {
            $("#sdtxt_rrmtechnicalhead_requirementname").dxTextBox('instance').option('value',key.RequirementName);
            $("#sdtxt_rrmtechnicalhead_requiredfor").dxTextBox('instance').option('value',key.RequiredFor);
              $("#rrm_empidTechnicalHead").val(key.RequirementName);
              $("#rrm_entrybdeTechnicalHead").val(key.BDEName);
              $("#sdnmb_rrmtechnicalhead_numberofpositions").dxNumberBox('instance').option('value',key.NumberOfPositions);

              $("#sdcmb_rrmtechnicalhead_department").dxSelectBox('instance').option('value',key.DepartmentId);
              $("#rrm_experiencerequired").val(key.ExperiencerequiredInYrs);
              $("#sdtxt_rrmtechnicalhead_location").dxTextBox('instance').option('value',key.Location);
          var edate=key.RequestedDate;
            if(edate!=null)
            {
              var ed = edate;
              $("#sd_date_rrmtechnicalhead_requestedDate").dxDateBox('instance').option('value',ed);
            }
          $("#rrm_requirementlead").val(key.LeadName);
         
          });
        }
}

//rrmFormVAlidation
_addRRMEntryPointTechnicalHead.rrmValidation = function(){
    if ($("#sdtxt_rrmtechnicalhead_requirementname").dxTextBox('instance').option('value') == "") {
        $("#rrm_requirementnameTechnicalHeadError").html("Please Enter Name");
    }
    if ($("#sdtxt_rrmtechnicalhead_requiredfor").dxTextBox('instance').option('value') == "") {
        $("#rrm_requiredforTechnicalHeadError").html("Please Enter RequiredFor");
    }
    if ($("#sdnmb_rrmtechnicalhead_numberofpositions").dxNumberBox('instance').option('value') == "") {
        $("#rrm_numberofpositionsTechnicalHeadError").html("Please Enter No. Of Positions");
    }
    if ($("#sdcmb_rrmtechnicalhead_department").dxSelectBox('instance').option('value') == "") {
        $("#rrm_departmentTechnicalHeadError").html("Please Select Department");
    }
    if ($("#rrm_experiencerequired").val() == "") {
        $("#rrm_experiencerequiredError").html("Please Enter Experience");
    }
    if ($("#sdcmb_rrmtechnicalhead_communication").dxSelectBox('instance').option('value') == "") {
        $("#rrm_communicationTechnicalHeadError").html("Please Select Communication");
    }
    if ($("#rrmfamily").val() == "") {
        $("#rrmfamilyError").html("Please Select Family");
    }
    if ($("#rrmskill").val() == "") {
        $("#rrmskillError").html("Please Select Skill");
    }
    if ($("#sd_txtEditor_technicalHead_skillDetailsPlanA").dxHtmlEditor('instance').option("value") == "") {
        $("#rrm_skilldetailsplanaTechnicalHeadError").html("Please Enter Skill Details (Plan A)");
    }
    if ($("#sd_txtEditor_technicalHead_skillDetailsPlanB").dxHtmlEditor('instance').option("value") == "") {
        $("#rrm_skilldetailsplanbTechnicalHeadError").html("Please Enter Skill Details (Plan B)");
    }
    if ($("#rrm_tobeonboardplanaTechnicalHead").val() == "") {
        $("#rrm_tobeonboardplanaTechnicalHeadError").html("Please Select To on Board");
    }
    if ($("#sd_date_rrm_technicalHead_tobeonboardplanb").dxDateBox('instance').option("value") == "") {
        $("#rrm_tobeonboardplanbTechnicalHeadError").html("Please Select To on Board");
    }
}

//reset skill data 
_addRRMEntryPointTechnicalHead.skillsClearAndShow = function(){ // Clear our fields

    $("#familyentry").val("");
    $("#skillentry").val("");
    $("#skillversionentry").val("");
   
}

//get skill version details 
_addRRMEntryPointTechnicalHead.get_versionsentry = function(skillentry_id){
    var skillentry_id = skillentry_id;
    var filter_val = JSON.stringify({
        "SkillId": skillentry_id
    });

   // var result = callgetlist('GetSkillVersions', filter_val);
    callGetListAsync('GetSkillVersions', filter_val, function (result) {
        var options = "<option value=''>Select Skill Version</option>";

        for (var i = 0; i < result.length; i++) {
            options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
        }

        $("#skillversionentry").html(options);
    });
}

//get entered skill details 
_addRRMEntryPointTechnicalHead.get_skillsentry = function(familyentry_id){
    var familyentry_id = familyentry_id;

    var filter_val = JSON.stringify({
        "FamilyId": familyentry_id
    });
    
   // var result = callgetlist('GetSkills', filter_val);
    callGetListAsync('GetSkills', filter_val, function (result) {
        var options = "<option value=''>Select Skills</option>";

        for (var i = 0; i < result.length; i++) {
            options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
        }

        $("#skillentry").html(options);
        _addRRMEntryPointTechnicalHead.get_versionsentry("");
    });
}

  //show skill in skill table
  _addRRMEntryPointTechnicalHead.getSkillsDetails = function(){
    
    var filterData = JSON.stringify({
      "ResourceRequirementId": ResourceRequirementId,
      "IsActive": "True",
      "Token": Token
  });        

  callGetListAsync('GetResourceRequrirementSkill', filterData, function (e) {
      GetSkillList = e;

      $("#sdgd-rrmTechnicalHeadSkills").dxDataGrid({
          dataSource: GetSkillList,
          showBorders: true,
          paging: {
              enabled: false
          },
          editing: {
              mode: "row",
              allowUpdating: true,
              allowDeleting: true,
              allowAdding: true
          },
          columns: [
              {
                  dataField:"ResourceRequirementSkillId",
                  visible:false
              },
              {
                  dataField: "SkillFamilyId",
                  caption: "Family",
                  setCellValue: function (rowData, value) {
                      rowData.SkillFamilyId = value;
                      rowData.SkillId = "";
                      rowData.SkillVersionId = "";
                  },
                  lookup: {
                      dataSource: skillfamilydata,
                      displayExpr: "Name",
                      valueExpr: "Id",
                  },
                  validationRules: [{ type: "required" }]
              },
              {
                  caption: "Skills", dataField: "SkillId",
                  setCellValue: function (rowData, value) {
                      rowData.SkillId = value;
                      rowData.SkillVersionId = ""
                  },
                  lookup: {
                      dataSource: function (options) {
                          return {
                              store: allSkilldata,
                              filter: options.data ? ["FamilyID", "=", options.data.SkillFamilyId] : null,
                          };
                      },
                      valueExpr: "Id",
                      displayExpr: "Name",
                  },
                  validationRules: [{ type: "required" }]
              },
              {
                  caption: "Versions", dataField: "SkillVersionId",
                  setCellValue: function (rowData, value) {
                      rowData.SkillVersionId = value;
                  },
                  lookup: {
                      dataSource: function (options) {
                          return {
                          store: allSkillversion,
                          filter: options.data ? ["SkillID", "=", options.data.SkillId] : null,
                          };
                      },
                      valueExpr: "Id",
                      displayExpr: "Name",
                  },
                  validationRules: [{ type: "required" }]
              }
          ],
          onRowInserted: function (e) {
            _addRRMEntryPointTechnicalHead.insert_SkillInfoEntry(e);
          },
          onRowUpdated: function (e) {
            _addRRMEntryPointTechnicalHead.update_SkillInfoEntry(e);
          },
          onRowRemoved: function (e) {
            _addRRMEntryPointTechnicalHead.delete_SkillInfoEntry(e);
          }
      });
    })

    }

    _addRRMEntryPointTechnicalHead.insert_SkillInfoEntry = function (e) {
        
      var skill_version = e.data.SkillVersionId;
      var family = e.data.SkillFamilyId;
      var skill = e.data.SkillId;
  
      var data = [];
      {
          data = {
              "Method": "PostResourceRequirementSkillMappings",
              "Data": {
                  "SkillFamilyId": family,
                  "SkillVersionID": skill_version,
                  "SkillId": skill,
                  "IsActive": 'True',
                  "Token": Token,
                  "ResourceRequirementSkillID": null,
                  "ResourceRequirementId": ResourceRequirementId
              }
          }
      }
  
      PostDataCallAsync(data, function (postCall) {
         
          if (postCall['IsSuccess'] == true) {
            _addRRMEntryPointTechnicalHead.skillsClearAndShow();
            _addRRMEntryPointTechnicalHead.getSkillsDetails();
          }
      });
    }
  
    _addRRMEntryPointTechnicalHead.update_SkillInfoEntry = function (e) {
        
        var skill_version = e.data.SkillVersionId;
        var family = e.data.SkillFamilyId;
        var skill = e.data.SkillId;
        var resource_requirement_skill_id = e.data.ResourceRequirementSkillId;
        var data = [];
        {
            data = {
                "Method": "PostResourceRequirementSkillMappings",
                "Data": {
                    "SkillFamilyId": family,
                    "SkillVersionID": skill_version,
                    "SkillId": skill,
                    "IsActive": 'True',
                    "Token": Token,
                    "ResourceRequirementSkillID": resource_requirement_skill_id,
                    "ResourceRequirementId": ResourceRequirementId
                }
            }
        }
  
        PostDataCallAsync(data, function (postCall) {
            
            if (postCall['IsSuccess'] == true) {
              _addRRMEntryPointTechnicalHead.skillsClearAndShow();
              _addRRMEntryPointTechnicalHead.getSkillsDetails();
            }
        });       
  
    }
  
    _addRRMEntryPointTechnicalHead.delete_SkillInfoEntry = function (e) {
      var resource_requirement_skill_id = e.data.ResourceRequirementSkillId;
      data = {
          "Method": "DeleteResourceRequrirementSkill",
          "Data": {
              "ResourceRequirementSkillId": resource_requirement_skill_id,
              "Token": Token,
              "IsActive": 0
  
          }
      }
      PostDataCallAsync(data, function (postCall) {                    
          if (postCall['IsSuccess'] == true) {
            _addRRMEntryPointTechnicalHead.skillsClearAndShow();
            _addRRMEntryPointTechnicalHead.getSkillsDetails();
          }                    
      });   
  }

  // bind skill  table date 
    _addRRMEntryPointTechnicalHead.skillcomputeHTML = function (getSkillList) {
        
     var html = "";
        html = "<table id='myTable' class='myTable_rrm'>";
		    html += "<tr>";
        html += "<th>Family</th>"
        html += "<th>Skills</th>"
        html += "<th>Version</th>"
        html += "<th>Action</th>"
        html += "</tr>";  

      if (getSkillList == null || getSkillList == "" || getSkillList == undefined)
     {
        $(".myTable_rrm").addClass('skillemptytbl');
		    html += "<tr><td colspan='4'>No Data..!</td></tr>";
     }
    else
    {
        getSkillList.forEach(function (key, item)
         {
          $(".myTable_rrm").removeClass('skillemptytbl'); 
          var skillId = key.ResourceRequirementSkillId;
          html += "<tr class='row_" + item + "' id='row_" + skillId + "'>";
          html += "<td><input type='hidden' class='family' value='" + key.SkillFamily + "'> " + key.SkillFamily + "</td>"
          html += "<td><input type='hidden' class='skill_type' value='" + key.Skill + "'>" + key.Skill + "</td>"
          html += "<td><input type='hidden' class='version' value='" + key.SkillVersion + "'>" + key.SkillVersion + "</td>"
          html += "<td><button class='btn edit-btn' onclick=editRow_SkillMapping('" + skillId + "')><i class='fas fa-pencil-alt'></i></button>"
            html += "<button class='btn delete-btn' onclick=_addRRMEntryPointTechnicalHead.deleteRow_SkillMapping('" + skillId + "')><i class='fas fa-trash-alt'></i></button></td>"
          html += "</tr>";
        }); 
   
    }
	 return html;
  } 

  mapUI();
  return _addRRMEntryPointTechnicalHead;
});

