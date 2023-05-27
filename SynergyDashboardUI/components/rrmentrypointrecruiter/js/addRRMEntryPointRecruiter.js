AddRRMEntryPointRecruiter = (function(){
    var _addRRMEntryPointRecruiter = {};
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
    $rrm_requirementnamerecruiter = $("#rrm_requirementnamerecruiter"),
    $rrm_requiredforrecruiter = $("#rrm_requiredforrecruiter"),
    $rrm_entrybderecruiter= $("#rrm_entrybderecruiter"),
    $rrm_empidrecruiter = $("#rrm_empidrecruiter"),
    $rrm_replacementrecruiter = $("#rrm_replacementrecruiter"),
    $rrm_numberofpositionsrecruiter = $("#rrm_numberofpositionsrecruiter"),
    $rrm_priorityrecruiter = $("#rrm_priorityrecruiter"),
    $rrm_departmentrecruiter =  $("#rrm_departmentrecruiter"),
    $rrm_designationrecruiter = $("#rrm_designationrecruiter"),
    $rrm_experiencerequired = $("#rrm_experiencerequired"),
    $rrm_communicationrecruiter = $("#rrm_communicationrecruiter"),
    $rrm_locationforrecruiter = $("#rrm_locationforrecruiter"), 
    $rrm_requesteddaterecruiter = $("#rrm_requesteddaterecruiter"),
    $rrm_losingrevenuerecruiter = $('#rrm_losingrevenuerecruiter'),
    $rrm_fromVIPrecruiter =  $('#rrm_fromVIP'),
    $rrm_requirementlead = $("#rrm_requirementlead"),
    $rrm_commentsrecruiter = $("#rrm_commentsrecruiter")
}

//save hr commnents once save&close btn clicked 
    _addRRMEntryPointRecruiter.saveComments = function () {
        
    var finalComments=CKEDITOR.instances.rrm_commentsrecruiter.getData();
    if(finalComments=="")
    {
      swal({
							title: "Warning!",
							text: "Please Enter Comments",
							icon: "warning",
							button: "ok!",
		      })
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

    ResourceRequirementSkillPlanId = null;
    ResourceRequirementId = null;
        $('#RRMEntryPointModelRecruiter').modal("hide");
        var rrmEntryGrid = RRMEntryPointGridOwner("Recruiter");
        rrmEntryGrid.getRRMEntryTable();
        _addRRMEntryPointRecruiter.clearAll_addrrmdata();
    });
}}

//tab next button event (rrmentry->skills->planA->planB->commnets) 
_addRRMEntryPointRecruiter.toggleTabRRMEntry = function() { 
    
    var activeTab = $('#rrmtabRecruiter').find('li.active').attr('id')

    if (activeTab == "rrm_requirementTabRecruiter")
    {   
    requirmentName=$("#rrm_requirementnamerecruiter").val();
     requireFor=$("#rrm_requiredforrecruiter").val(); 
     bde=$("#rrm_entrybderecruiter").val();  
     if(bde==""){bde=null;}	 
     EmployeeId=$("#rrm_empidrecruiter").val();
     if(EmployeeId==""){EmployeeId=null}
     replacementFor=$("#rrm_replacementrecruiter").val();
     position=$("#rrm_numberofpositionsrecruiter").val();
     priority=$("#rrm_priorityrecruiter").val();
     department=$("#rrm_departmentrecruiter").val();
     designation=$("#rrm_designationrecruiter").val();
        experience = $("#rrm_experiencerequiredrecruiter").val();
     communication=$("#rrm_communicationrecruiter").val();
     reqlocation=$("#rrm_locationforrecruiter").val(); 
     if(reqlocation==""){reqlocation=null;}
     if(ResourceRequirementId=="" ||ResourceRequirementId==undefined)
     {
      ResourceRequirementId=null;
     }	 
     requestedDate=$("#rrm_requesteddaterecruiter").val();;     
     losingRevenue= $('#rrm_losingrevenuerecruiter').prop('checked');
     fromVIP=$('#rrm_fromVIPrecruiter').prop('checked');    
     requirmentLead=$("rrm_requirementlead").val();;
     leadApproval = $("#sdchk_rrmrecruiter_leadApproval").dxCheckBox('instance').option('value');
	   var finalRequestedDate = moment(requestedDate).format("DD-MM-YYYY");
  
     if(requirmentName.trim() == "" || requireFor.trim()==""||position==""||position=="0"||department==""||designation==""||experience==""||experience=="0"){
     if (requirmentName.trim() == "")
     {
     $('#rrm_requirementnamerecruiter').addClass('input-error');
     $('#rrm_requirementnamerecruiterError').html("Enter Requirment Name");
     }
     else
     {
       $('#rrm_requirementnamerecruiter').removeClass('input-error');
       $('#rrm_requirementnamerecruiterError').html("");
     }
     if(requireFor.trim()=="")
     {
       $('#rrm_requiredforrecruiter').addClass('input-error');
       $('#rrm_requiredforrecruiterError').html("Enter Required For");
     }
     else
     {
     $('#rrm_requiredforrecruiter').removeClass('input-error');
     $('#rrm_requiredforrecruiterError').html("");
     } 
     if(position==""||position=="0")
     {
     if(position=="")
     {
      if(position=="")
        {
          $('#rrm_numberofpositionsrecruiter').addClass('input-error');
          $('#rrm_numberofpositionsrecruiterError').html("Enter Position");
        }
      else
        {
          $('#rrm_numberofpositionsrecruiter').removeClass('input-error');
          $('#rrm_numberofpositionsrecruiterError').html("");
        }
     }
     if(position=="0")
      {
        if(position=="0")
          {
            $('#rrm_numberofpositionsrecruiter').addClass('input-error');
            $('#rrm_numberofpositionsrecruiterError').html("Min Position is 1");
          }
     else
       {
         $('#rrm_numberofpositionsrecruiter').removeClass('input-error');
        $('#rrm_numberofpositionsrecruiterError').html("");
        }
    }
  }
    if(department=="")
    {
       $('#rrm_departmentrecruiter').addClass('input-error');
      $('#rrm_departmentrecruiterError').html("Select Department");
    }
    else
    {
       $('#rrm_departmentrecruiter').removeClass('input-error');
        $('#rrm_departmentrecruiterError').html("");
    }
    if(designation=="")
    {
      $('#rrm_designationrecruiter').addClass('input-error');
      $('#rrm_designationrecruiterError').html("Select Designation");
    }
    else
    {
      $('#rrm_designationrecruiter').removeClass('input-error');
      $('#rrm_designationrecruiterError').html("");
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
    "leadApproval":leadApproval,
    "IsActive": 'true',  
    }
  }
  
         //var resultResorce = PostDataCall(dataResource); 
         PostDataCallAsync(dataResource, function (resultResorce) {
             if (ResourceRequirementId == null) {
                 ResourceRequirementId = resultResorce.Data[0].ResourceRequirementId;
             }
         });
         $('.nav-tabs a[href="#rrm_SkillDetailsRecruiter"]').tab("show");
      $(".btnPrevious").show();
      if (!IsRrmSaved) 
      {
        $(".saveFamilyBtn").hide();
        $("a.btnNext").show();
      }

  _addRRMEntryPointRecruiter.getSkillsDetails();
}
}
      $(".btnPrevious").show();
      if (!IsRrmSaved) 
        {
            $(".saveFamilyBtn").hide();
            $("a.btnNext").show();

          if (activeTab == "rrm_skillsTabRecruiter") 
    {   
      family=$("#familyentry").value;
      skills=$("#skillentry").value;
      version=$("#skillversionentry").value;   

      if($(".myTable_rrm").hasClass("skillemptytbl")==true)
      {
      $(".skillset_status").addClass("data_error");
      $(".skillset_status").html("Please Add SKill Details");
          swal({
							title: "Warning!",
							text: "Please Add Skill  Details",
							icon: "warning",
							button: "ok!",
		          })
      }
      else
      {
          $('.nav-tabs a[href="#rrm_SkillsPlanADetailsRecruiter"]').tab("show");
         $(".btnPrevious").show();
        if (!IsRrmSaved) 
          {
            $(".saveFamilyBtn").hide();
            $("a.btnNext").show();
          }
      }
}

 if (activeTab == "rrm_skillsplanaTabRecruiter") {
    var datecheck=0;
    skillDetailsA = $("#sd_txtEditorRecruiter_skillDetailsPlanA").dxHtmlEditor('instance').option('value');
    toOnBoardA = $("#sd_date_rrmrecruiter_tobeonboardplana").dxDateBox('instance').option('value');
    requirtersA=$("#rrm_recruitersplanarecruiterrecruiterrecruiter").val(); 
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
       $('#sd_txtEditorRecruiter_skillDetailsPlanA').addClass('input-error');
       $('#rrm_skilldetailsplanarecruiterError').html("Enter Skill Details");
     }
     else{
       $('#sd_txtEditorRecruiter_skillDetailsPlanA').removeClass('input-error');
       $('#rrm_skilldetailsplanarecruiterError').html("");
     }
     if(toOnBoardA==""){
       $('#sd_date_rrmrecruiter_tobeonboardplana').addClass('input-error');
       $('#rrm_tobeonboardplanarecruiterError').html("Select Date");
     }
     else{
       $('#sd_date_rrmrecruiter_tobeonboardplana').removeClass('input-error');
       $('#rrm_tobeonboardplanarecruiterError').html("");
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
     "RecruiterId":null,
     "IsActive":'True',
   }
 }
       //var resulPlanBt = PostDataCall(dataPlanA);
       PostDataCallAsync(dataPlanA, function (resulPlanBt) {
           $(".skillset_status").show();

           $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsRecruiter"]').tab("show");
           $(".btnPrevious").show();
           if (!IsRrmSaved) {
               $(".saveFamilyBtn").hide();
               $("a.btnNext").show();
           }
       });    
  }   
  }

if (activeTab == "rrm_skillsplanbTabRecruiter") {   
  var datecheckplanb=0;
  skillDetailsB= $("#sd_txtEditorRecruiter_skillDetailsPlanB").dxHtmlEditor('instance').option('value');
  toOnBoardB = $("#sd_date_rrmrecruiter_tobeonboardplana").dxDateBox('instance').option('value')

  requirtersB=$("#rrm_recruitersplanbrecruiter").val();
	var varEDate = new Date().toISOString().slice(0,10); //dd-mm-YYYY
	
	if(toOnBoardB <= varEDate) {
		datecheckplanb=1;
swal({
							title: "Warning!",
							text: "Please enter valid Date current and previous date should not be selected",
							icon: "warning",
							button: "ok!",
						})
        $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsRecruiter"]').tab("show");
}
   if((skillDetailsB==""||toOnBoardB=="")||datecheckplanb==1){
   if(skillDetailsB==""){
    $('#sd_txtEditorRecruiter_skillDetailsPlanB').addClass('input-error');
    $('#rrm_skilldetailsplanbrecruiterError').html("Enter Skill Details");
    } 
    else{
      $('#sd_txtEditorRecruiter_skillDetailsPlanB').removeClass('input-error');
     $('#rrm_skilldetailsplanbrecruiterError').html("");
    }
    if(toOnBoardB==""){
      $('#sd_date_rrmrecruiter_tobeonboardplana').addClass('input-error');
      $('#rrm_tobeonboardplanbrecruiterError').html("Select Date");
    } else{
     $('#sd_date_rrmrecruiter_tobeonboardplana').removeClass('input-error');
    $('#rrm_tobeonboardplanbrecruiterError').html("");
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
   "ResourceRequirementId":ResourceRequirementId,
   "ResourceRequirementSkillPlanId":ResourceRequirementSkillPlanId,
   "SkillPlan":'PlanB',
   "SkillPlanInfo":skillDetailsB,
   "ToBeOnBoard":toOnBoardB,
   "RecruiterId":null,
   "IsActive":'True',

   }
 }

       //var resulPlanBt = PostDataCall(dataPlanB);
       PostDataCallAsync(dataPlanB, function (resulPlanBt) {
           $('.nav-tabs a[href="#rrm_CommentsDetailsRecruiter"]').tab("show");
           $("#rrm_manage_plan_comments_documents_recruiter").hide();
           $(".btnPrevious").show();
           if (!IsRrmSaved) {
               $(".saveFamilyBtn").show();
               $("a.btnNext").hide();
               //_addRRMEntryPointRecruiter.getcommentsinrrm();
           }
       });     
    }   
  }
}
resetSimpleBarRRMEntryPointRecruiter();
}

//tab previous button functions (rrmentry<-skills<-planA<-planB<-commnets) 
_addRRMEntryPointRecruiter.toggleTabRRMEntryPrevious = function(){
  
   var activeTab = $('#rrmtab').find('li.active').attr('id')
      if (activeTab == "rrm_skillsplanaTab") 
      {
          $('.nav-tabs a[href="#rrm_SkillDetails"]').tab("show");
          $("a.btnNext").show();
          $(".saveFamilyBtn").hide();
      }
      if (activeTab == "rrm_skillsTab") 
        {
            $('.nav-tabs a[href="#rrm_RequirementDetails"]').tab("show");
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
            $(".btnPrevious").hide();
            _addRRMEntryPointRecruiter.updateresourcerequitementdata();
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

      //var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
        callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {
            if (result != null) {
                $("#sd_txtEditorRecruiter_skillDetailsPlanA").dxHtmlEditor('instance').option('value',(result[0].SkillPlanInfo));
                var edate = result[0].ToBeOnBoard;
                $("#sd_date_rrmrecruiter_tobeonboardplana").dxDateBox('instance').option('value',edate);
                ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
            }
        });
    }
    if (activeTab == "rrm_commentsrecruiterTab") {

        comments = $("#sd_txtEditorRecruiter_skillDetailsPlanB").dxHtmlEditor('instance').option('value');

        if (!IsRrmSaved) {
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
        } else {
            $("a.btnNext").hide();
        }
        $(".btnPrevious").show();
        $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsRecruiter"]').tab("show");
        var filter_valbtn = JSON.stringify({
            "IsActive": "True",
            "Token": Token,
            "SkillPlans": 'PlanB',
            "ResourceRequirementId": ResourceRequirementId
        });
        //var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);

        callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {
            if (result != null) {
                $("#sd_txtEditorRecruiter_skillDetailsPlanB").dxHtmlEditor('instance').option('value',result[0].SkillPlanInfo);
                var edate = result[0].ToBeOnBoard;
                $("#sd_date_rrmrecruiter_tobeonboardplanb").dxDateBox('instance').option('value',edate);
                ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
            }
        });
    }
    resetSimpleBarRRMEntryPointRecruiter();
}

// get rrm detials by id
_addRRMEntryPointRecruiter.updateresourcerequitementdata = function()
{
    //var getRRMData = callgetlist('GetRRMbyid','{"IsActive":"True","ResourceRequirementId":"'+ResourceRequirementId+'","Token":"'+Token+'"}');
    callGetListAsync('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + ResourceRequirementId + '","Token":"' + Token + '"}', function (getRRMData) {
        _addRRMEntryPointRecruiter.mapupdateaddrrmListcomputeHTML(getRRMData)
    });
}

//bind rrm data from _addRRMEntryPointRecruiter.updateresourcerequitementdata function result
_addRRMEntryPointRecruiter.mapupdateaddrrmListcomputeHTML = function(getRRMData){
    if (getRRMData[0].rrmid=="") 
    {
        //
    }
    else
       {
           var data;
          getRRMData.forEach(function (key, item) {
              $("#rrm_requirementnamerecruiter").val(key.RequirementName);
              $("#rrm_requiredforrecruiter").val(key.RequiredFor);
              $("#rrm_empidrecruiter").val(key.RequirementName);
              $("#rrm_entrybderecruiter").val(key.BDEName);
              $("#rrm_numberofpositionsrecruiter").val(key.NumberOfPositions);

              $("#rrm_departmentrecruiter").val(key.DepartmentId);
              $("#rrm_experiencerequired").val(key.ExperiencerequiredInYrs);
              $("#rrm_locationforrecruiter").val(key.Location);
          var edate=key.RequestedDate;
            if(edate!=null)
            {
              var ed = edate;
              var enddateChanged= ed.replace(/\//g, "-");
              enddateChanged=enddateChanged.replace("T00:00:00","");
              enddateChanged = enddateChanged.split('-');
              enddateChanged=enddateChanged[0]+"-"+enddateChanged[1]+"-"+enddateChanged[2];
              $("#rrm_requesteddaterecruiter").val(enddateChanged);
            }
          $("#rrm_requirementlead").val(key.LeadName);
         // $("#rrm_numberofpositionsrecruiter").val(getRRMData[0].NumberOfPositions);
          });
        }
}

//rrmFormVAlidation
_addRRMEntryPointRecruiter.rrmValidation = function(){
    if ($("#rrm_requirementnamerecruiter").val() == "") {
        $("#rrm_requirementnamerecruiterError").html("Please Enter Name");
    }
    if ($("#rrm_requiredforrecruiter").val() == "") {
        $("#rrm_requiredforrecruiterError").html("Please Enter RequiredFor");
    }
    if ($("#rrm_numberofpositionsrecruiter").val() == "") {
        $("#rrm_numberofpositionsrecruiterError").html("Please Enter No. Of Positions");
    }
    if ($("#rrm_departmentrecruiter").val() == "") {
        $("#rrm_departmentrecruiterError").html("Please Select Department");
    }
    if ($("#rrm_experiencerequired").val() == "") {
        $("#rrm_experiencerequiredError").html("Please Enter Experience");
    }
    if ($("#rrm_communicationrecruiter").val() == "") {
        $("#rrm_communicationrecruiterError").html("Please Select Communication");
    }
    if ($("#rrmfamily").val() == "") {
        $("#rrmfamilyError").html("Please Select Family");
    }
    if ($("#rrmskill").val() == "") {
        $("#rrmskillError").html("Please Select Skill");
    }
    if ($("#sd_txtEditorRecruiter_skillDetailsPlanA").dxHtmlEditor('instance').option('value') == "") {
        $("#rrm_skilldetailsplanarecruiterError").html("Please Enter Skill Details (Plan A)");
    }
    if ($("#sd_txtEditorRecruiter_skillDetailsPlanB").dxHtmlEditor('instance').option('value') == "") {
        $("#rrm_skilldetailsplanbrecruiterError").html("Please Enter Skill Details (Plan B)");
    }
    if ($("#sd_date_rrmrecruiter_tobeonboardplana").dxDateBox('instance').option('value') == "") {
        $("#rrm_tobeonboardplanarecruiterError").html("Please Select To on Board");
    }
    if ($("#sd_date_rrm_tobeonboardplanb").dxDateBox('instance').option('value') == "") {
        $("#rrm_tobeonboardplanbrecruiterError").html("Please Select To on Board");
    }
}

//reset skill data 
_addRRMEntryPointRecruiter.skillsClearAndShow = function(){ // Clear our fields

    $("#familyentry").val("");
    $("#skillentry").val("");
    $("#skillversionentry").val("");
   
}

//get skill version details 
_addRRMEntryPointRecruiter.get_versionsentry = function(skillentry_id){
    var skillentry_id = skillentry_id;
    var filter_val = JSON.stringify({
        "SkillId": skillentry_id
    });

    //var result = callgetlist('GetSkillVersions', filter_val);
    callGetListAsync('GetSkillVersions', filter_val, function (result) {
        var options = "<option value=''>Select Skill Version</option>";

        for (var i = 0; i < result.length; i++) {
            options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
        }

        $("#skillversionentry").html(options);
    });
}

//get entered skill details 
_addRRMEntryPointRecruiter.get_skillsentry = function(familyentry_id){
    var familyentry_id = familyentry_id;

    var filter_val = JSON.stringify({
        "FamilyId": familyentry_id
    });
    
    //var result = callgetlist('GetSkills', filter_val);
    callGetListAsync('GetSkills', filter_val, function (result) {
        var options = "<option value=''>Select Skills</option>";

        for (var i = 0; i < result.length; i++) {
            options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
        }

        $("#skillentry").html(options);
        _addRRMEntryPointRecruiter.get_versionsentry("");
    });
    }
  
  //insert skill details 
  _addRRMEntryPointRecruiter.insert_SkillInfoEntry = function(){  

    var skill_version = $("#skillversionentryRecruiter").val(); 
    if(skill_version==""){skill_version=null}	
      var family = $("#familyentryRecruiter").val();
      var skill = $("#skillentryRecruiter").val();

    if (family == "" || skill == "")
     {

        if (family == "") {
            $('#familyentryRecruiter_error').html("Select Family");
            $('#familyentryRecruiter').addClass('input-error');
        } else {
            $('#familyentryRecruiter_error').html("");
            $('#familyentryRecruiter').removeClass('input-error');
        }
        if (skill == "") {
            $('#skillentryRecruiter_error').html("Select Skills");
            $('#skillentryRecruiter').addClass('input-error');
        } else {
            $('#skillentryRecruiter_error').html(" ");
            $('#skillentryRecruiter').removeClass('input-error');
        }

      } 
   
    if (family != "" && skill != "")
     {
        $('#familyentryRecruiter_error').html("");
        $('#familyentryRecruiter').removeClass('input-error');
        $('#skillentryRecruiter_error').html(" ");
        $('#skillentryRecruiter').removeClass('input-error');
    
      var data = [];
//      if (SkillId)
		      {
            data = {
              "Method": "PostResourceRequirementSkillMappings",
              "Data": 
              {
                "SkillFamilyId": family,
                "SkillVersionID": skill_version,
                "SkillId": skill,
                "IsActive": 'True',
			          "Token":Token,
			          "ResourceRequirementSkillID":null,
			          "ResourceRequirementId":ResourceRequirementId
              }
            }
          }

        // var postCall = PostDataCall(data);
        PostDataCallAsync(data, function (postCall) {
            $(".skillset_status").attr("class", "skillset_status");
            $(".skillset_status").html("");
            $(".skillset_status").show();

            if (postCall['IsSuccess'] == true) {
                $(".skillset_status").addClass("data_success");
                $(".skillset_status").html(postCall['Message']);
            }
            else {
                $(".skillset_status").addClass("data_error");
                $(".skillset_status").html(postCall['Message']);
            }
        });
  
        setTimeout(function () {
            $(".skillset_status").fadeOut("slow", function () {
            $(".skillset_status").html("");
        });
        }, 1500);
    }
    else{
    // not yet dsidded 
    }

    jQuery("#SkillsetsBtnEntry").attr("data-id", "");
    jQuery("#SkillsetsBtnEntry").attr("onclick", "insert_SkillInfoEntry()");

    _addRRMEntryPointRecruiter.skillsClearAndShow()
    _addRRMEntryPointRecruiter.getSkillsDetails()

}

  //show skill in skill table
    _addRRMEntryPointRecruiter.getSkillsDetails = function () {

        var filter_val = JSON.stringify({
            "ResourceRequirementId": ResourceRequirementId,
            "IsActive": "True",
            "Token": Token
        });

        //var getSkillList = callgetlist('GetResourceRequrirementSkill', filter_val);
        callGetListAsync('GetResourceRequrirementSkill', filter_val, function (getSkillList) {
            var skillsListHtml = _addRRMEntryPointRecruiter.skillcomputeHTML(getSkillList);
            $('#rrmdisplay_SkillsEntryRecruiter').html(skillsListHtml);
        });
    }

  // bind skill  table date 
    _addRRMEntryPointRecruiter.skillcomputeHTML = function (getSkillList) {
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
            html += "<td><button class='btn edit-btn editrrmskillmappingRecruiterAdd' data-rrmskillid=" + ResourceRequirementSkillId + "><i class='fas fa-pencil-alt'></i></button>"
            html += "<button class='btn delete-btn deleteSkillMappingrecruiterAdd' data-rrmskillid=" + ResourceRequirementSkillId + "><i class='fas fa-trash-alt'></i></button></td>"
          html += "</tr>";
        }); 
   
    }
	 return html;
  } 
    //editskillmapping function
    $(document).on("click", ".editrrmskillmappingRecruiterAdd", function (e) {
        var skillId = $(e.currentTarget).data("rrmskillid");
        if (skillId != "" || skillId != undefined) {
            _addRRMEntryPointRecruiter.editRow_SkillMapping(skillId);
        }
    })

    //deleteskillmapping function
    $(document).on("click", ".deleteSkillMappingrecruiterAdd", function (e) {
        var skillId = $(e.currentTarget).data("rrmskillid");
        if (skillId != "" && skillId != undefined) {
            _addRRMEntryPointRecruiter.deleteRow_SkillMapping(skillId);
        }
    })

  //edit skill details
  _addRRMEntryPointRecruiter.editRow_SkillMapping = function(SkillId){
   var skillid=SkillId;
   var SkillFamily1 = jQuery("#row_" + SkillId + " td .family").val();
   var Skill1 = jQuery("#row_" + SkillId + " td .skill_type").val();
   var SkillVersion1 = jQuery("#row_" + SkillId + " td .version").val();
   
   $("#familyentry").val(SkillFamily1);
   $("#skillentry").val(Skill1);
   $("#skillversionentry").val(SkillVersion1);
   
   var parent_fielset1 = jQuery("fieldset.previous_employer1_field");
   parent_fielset1.find("#familyentry").val(SkillFamily1);
   
   $("#familyentry").val(SkillFamily1);
 
   jQuery("#SkillsetsBtnEntry").attr("onclick", "insert_SkillInfoEntry('" + skillid + "')");
  }
 
  //delete skill details
 _addRRMEntryPointRecruiter.deleteRow_SkillMapping = function(SkillId){
     if (confirm('Are you sure do you want to delete?')) {
         var skillId = SkillId;

         if ($("#SkillsetsBtnEntryRecruiter").attr("data-id")) {
             var dataId = $("#SkillsetsBtnEntryRecruiter").attr("data-id");
             if (dataId == skillId) {
                 if ($.trim($("#familyentryRecruiter")) != "") {
                     $("#familyentryRecruiter").val("");
                 }
                 if ($.trim($("#skillentry")) != "") {
                     $("#skillentry").val("");
                 }
                 if ($.trim($("#skillversionentryRecruiter")) != "") {
                     $("#skillversionentryRecruiter").val("");
                 }
                 jQuery("#SkillsetsBtnEntryRecruiter").attr("onclick", "insert_SkillInfoEntry('" + skillId + "')");
                 jQuery("#SkillsetsBtnEntryRecruiter").attr("data-id", "");
             }
         }

         data = {
             "Method": "DeleteResourceRequrirementSkill",
             "Data": {
                 "ResourceRequirementSkillId": SkillId,
                 "Token": Token,
                 "IsActive": 0

             }
         }
         //var postCall = PostDataCall(data);
         PostDataCallAsync(data, function (postCall) {

             jQuery(".status").attr("class", "status");
             jQuery(".status").html("");
             jQuery(".status").show();
             if (postCall['IsSuccess'] == true) {
                 _addRRMEntryPointRecruiter.getSkillsDetails();
             }
             else {
                 jQuery(".status").addClass("data_error");
                 jQuery(".status").html(postCall['Message']);
             }
         });
         setTimeout(function () {
             $(".status").fadeOut("slow", function () {
                 $(".status").html("");
             });
         }, 2500);
     }
 }

  
  //reset form data
  _addRRMEntryPointRecruiter.clearAll_addrrmdata = function(){
    
            $("#rrm_requirementnamerecruiter").val("");
            $("#rrm_requiredforrecruiter").val("");
            $("#rrm_empidrecruiter").val("");
            $("#rrm_entrybderecruiter").val("");
            $("#rrm_numberofpositionsrecruiter").val("");
            
            $("#rrm_departmentrecruiter").val("");
            $("#rrm_designationrecruiter").val("");
            $("#rrm_experiencerequired").val("");
            $("#rrm_locationforrecruiter").val("");
            $("#rrm_requesteddaterecruiter").val("");
            $("#rrm_requirementlead").val("");
            $("#rrm_numberofpositionsrecruiter").val("");
            var tdydate = new Date();
            tdydate.setDate(tdydate.getDate() + 1);
            var nxtDate = tdydate.toISOString().slice(0,10);
            $("#sd_date_rrmrecruiter_tobeonboardplanb").dxDateBox('instance').option('value',nxtDate);
            $("#sd_date_rrmrecruiter_tobeonboardplana").dxDateBox('instance').option('value',nxtDate);
            skillsClearAndShow();            

  }

  mapUI();
  return _addRRMEntryPointRecruiter;
});
