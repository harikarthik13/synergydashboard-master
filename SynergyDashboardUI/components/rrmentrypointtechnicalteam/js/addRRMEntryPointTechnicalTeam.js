AddRRMEntryPointTechnicalTeam = (function(){
var _addRRMEntryPointTechnicalTeam = {};
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
    $rrmtab =  $('#rrmtab'),
    $rrm_entrybdeTechnicalTeam= $("#rrm_entrybdeTechnicalTeam"),
    $rrm_empidTechnicalTeam = $("#rrm_empidTechnicalTeam"),
    $rrm_replacementTechnicalTeam = $("#rrm_replacementTechnicalTeam"),
    $rrm_requirementlead = $("#rrm_requirementlead")
}

//save hr commnents once save&close btn clicked 
 _addRRMEntryPointTechnicalTeam.saveComments = function () {
        
    var finalComments=$("#sd_txtEditor_RRMTechnicalComments").dxHtmlEditor('instance').option("value");
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
     $('#RRMEntryPointModelTechnicalTeam').modal("hide");
     var rrmEntryGrid = RRMEntryPointGridOwner("TechnicalTeam");
     rrmEntryGrid.getRRMEntryTable();
     _addRRMEntryPointTechnicalTeam.clearAll_addrrmdata();
 }

//tab next button event (rrmentry->skills->planA->planB->commnets) 
_addRRMEntryPointTechnicalTeam.toggleTabRRMEntry = function() { 
  
    var activeTab = $('#rrmtabTechnicalTeam').find('li.active').attr('id')
    var EmployeeId = null;
    if (activeTab == "rrm_requirementTabTechnicalTeam")
    {   
    requirmentName=$("#sdtxt_rrmtechnical_requirementname").dxTextBox('instance').option('value');
     requireFor=$("#sdtxt_rrmtechnical_requiredfor").dxTextBox('instance').option('value');
     bde=$("#rrm_entrybdeTechnicalTeam").val();  
     if(bde==""){bde=null;}	 
     EmployeeId=$("#rrm_empidTechnicalTeam").val();
     if(EmployeeId==""){EmployeeId=null}
     replacementFor=$("#rrm_replacementTechnicalTeam").val();
     position=$("#sdnmb_rrmtechnical_numberofpositions").dxNumberBox('instance').option('value');
     priority=$("#sdcmb_rrmtechnical_priority").dxSelectBox('instance').option('value');
     department=$("#sdcmb_rrmtechnical_department").dxSelectBox('instance').option('value');
     designation=$("#sdcmb_rrmtechnical_designation").dxSelectBox('instance').option('value');
        experience = $("#sdnmb_rrmtechnical_experiencerequired").dxNumberBox('instance').option('value');
     communication=$("#sdcmb_rrmtechnical_communication").dxSelectBox('instance').option('value');
     reqlocation=$("#sdtxt_rrmtechnical_location").dxTextBox('instance').option('value');
     if(reqlocation==""){reqlocation=null;}
     if(ResourceRequirementId=="" ||ResourceRequirementId==undefined)
     {
      ResourceRequirementId=null;
     }	 
     requestedDate=$("#sd_date_rrmtechnical_requestedDate").dxDateBox('instance').option('value');  
     losingRevenue= $("#sdchk_rrmtechnical_losingRevenue").dxCheckBox('instance').option('value');
     fromVIP=$("#sdchk_rrmtechnical_fromVIP").dxCheckBox('instance').option('value');
     requirmentLead=$("rrm_requirementlead").val();;
	   var finalRequestedDate = moment(requestedDate).format("DD-MM-YYYY");
  
     if(requirmentName == "" || requireFor==""||position==""||position=="0"||department==""||designation==""||experience==""||experience=="0"){
     if (requirmentName == "")
     {
     $('#sdtxt_rrmtechnical_requirementname').addClass('input-error');
     $('#rrm_requirementnameTechnicalTeamError').html("Enter Requirment Name");
     }
     else
     {
       $('#sdtxt_rrmtechnical_requirementname').removeClass('input-error');
       $('#rrm_requirementnameTechnicalTeamError').html("");
     }
     if(requireFor=="")
     {
       $('#sdtxt_rrmtechnical_requiredfor').addClass('input-error');
       $('#rrm_requiredforTechnicalTeamError').html("Enter Required For");
     }
     else
     {
     $('#sdtxt_rrmtechnical_requiredfor').removeClass('input-error');
     $('#rrm_requiredforTechnicalTeamError').html("");
     } 
     if(position==""||position=="0")
     {
     if(position=="")
     {
      if(position=="")
        {
          $('#sdnmb_rrmtechnical_numberofpositions').addClass('input-error');
          $('#rrm_numberofpositionsTechnicalTeamError').html("Enter Position");
        }
      else
        {
          $('#sdnmb_rrmtechnical_numberofpositions').removeClass('input-error');
          $('#rrm_numberofpositionsTechnicalTeamError').html("");
        }
     }
     if(position=="0")
      {
        if(position=="0")
          {
            $('#sdnmb_rrmtechnical_numberofpositions').addClass('input-error');
            $('#rrm_numberofpositionsTechnicalTeamError').html("Min Position is 1");
          }
     else
       {
         $('#sdnmb_rrmtechnical_numberofpositions').removeClass('input-error');
        $('#rrm_numberofpositionsTechnicalTeamError').html("");
        }
    }
  }
    if(department=="")
    {
       $('#sdcmb_rrmtechnical_department').addClass('input-error');
      $('#rrm_departmentTechnicalTeamError').html("Select Department");
    }
    else
    {
       $('#sdcmb_rrmtechnical_department').removeClass('input-error');
        $('#rrm_departmentTechnicalTeamError').html("");
    }
    if(designation=="")
    {
      $('#sdcmb_rrmtechnical_designation').addClass('input-error');
      $('#rrm_designationTechnicalTeamError').html("Select Designation");
    }
    else
    {
      $('#sdcmb_rrmtechnical_designation').removeClass('input-error');
      $('#rrm_designationTechnicalTeamError').html("");
     }
    if(experience==""||experience=="0")
    {
      if(experience=="")
      {  
        if(experience=="")
        {
          $('#sdnmb_rrmtechnical_experiencerequired').addClass('input-error');
          $('#rrm_experiencerequiredError').html("Select Experience");
        }
        else
        {
          $('#sdnmb_rrmtechnical_experiencerequired').removeClass('input-error');
          $('#rrm_experiencerequiredError').html("");
        }
      }
     if(experience=="0")
     {
      if(experience=="0")
        {
          $('#sdnmb_rrmtechnical_experiencerequired').addClass('input-error');
          $('#rrm_experiencerequiredError').html("Min Experience is 1");
        }
      else
        {
        $('#sdnmb_rrmtechnical_experiencerequired').removeClass('input-error');
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
  
    var resultResorce = PostDataCall(dataResource); 
   
    if(ResourceRequirementId==null)
    {
      ResourceRequirementId =resultResorce.Data[0].ResourceRequirementId;
    }
         $('.nav-tabs a[href="#rrm_SkillDetailsTechnicalTeam"]').tab("show");
      $(".btnPrevious").show();
      if (!IsRrmSaved) 
      {
        $(".saveFamilyBtn").hide();
        $("a.btnNext").show();
      }

  _addRRMEntryPointTechnicalTeam.getSkillsDetails();
}
}
      $(".btnPrevious").show();
      if (!IsRrmSaved) 
        {
            $(".saveFamilyBtn").hide();
            $("a.btnNext").show();

          if (activeTab == "rrm_skillsTabTechnicalTeam") 
    {   
      var data = $("#sdgd-rrmTechnicalSkills").dxDataGrid("instance").option("dataSource");
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
          $('.nav-tabs a[href="#rrm_SkillsPlanADetailsTechnicalTeam"]').tab("show");
         $(".btnPrevious").show();
        if (!IsRrmSaved) 
          {
            $(".saveFamilyBtn").hide();
            $("a.btnNext").show();
          }
      }
}

          if (activeTab == "rrm_skillsplanaTabTechnicalTeam") {
    var datecheck=0;
    skillDetailsA = $("#sd_txtEditor_technical_skillDetailsPlanA").dxHtmlEditor('instance').option("value");
    
    toOnBoardA=$("#sd_date_rrm_technical_tobeonboardplana").dxDateBox('instance').option("value");
              requirtersA = $("#rrm_TechnicalTeamsplanaTechnicalTeam").val(); 
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
       $('#rrm_skilldetailsplanaTechnicalTeam').addClass('input-error');
       $('#rrm_skilldetailsplanaTechnicalTeamError').html("Enter Skill Details");
     }
     else{
       $('#rrm_skilldetailsplanaTechnicalTeam').removeClass('input-error');
       $('#rrm_skilldetailsplanaTechnicalTeamError').html("");
     }
     if(toOnBoardA==""){
       $('#sd_date_rrm_technical_tobeonboardplana').addClass('input-error');
       $('#rrm_tobeonboardplanaTechnicalTeamError').html("Select Date");
     }
     else{
       $('#sd_date_rrm_technical_tobeonboardplana').removeClass('input-error');
       $('#rrm_tobeonboardplanaTechnicalTeamError').html("");
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
       $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsTechnicalTeam"]').tab("show");
    $(".btnPrevious").show();
    if (!IsRrmSaved) {
        $(".saveFamilyBtn").hide();
        $("a.btnNext").show();
    }     
  }   
  }

          if (activeTab == "rrm_skillsplanbTabTechnicalTeam") {   
  var datecheckplanb=0;
  skillDetailsB= $("#sd_txtEditor_technical_skillDetailsPlanB").dxHtmlEditor('instance').option("value");

      toOnBoardB = $("#sd_date_rrm_technical_tobeonboardplanb").dxDateBox('instance').option("value");
  requirtersB=$("#rrm_TechnicalTeamsplanbTechnicalTeam").val();
	var varEDate = new Date().toISOString().slice(0,10); //dd-mm-YYYY
	
	if(toOnBoardB <= varEDate) {
		datecheckplanb=1;
swal({
							title: "Warning!",
							text: "Please enter valid Date current and previous date should not be selected",
							icon: "warning",
							button: "ok!",
						})
        $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsTechnicalTeam"]').tab("show");
}
   if((skillDetailsB==""||toOnBoardB=="")||datecheckplanb==1){
   if(skillDetailsB==""){
    $('#sd_txtEditor_technical_skillDetailsPlanB').addClass('input-error');
    $('#rrm_skilldetailsplanbTechnicalTeamError').html("Enter Skill Details");
    } else{
    $('#sd_txtEditor_technical_skillDetailsPlanB').removeClass('input-error');
     $('#rrm_skilldetailsplanbTechnicalTeamError').html("");
    }
     if(toOnBoardB==""){
     $('#sd_date_rrm_technical_tobeonboardplanb').addClass('input-error');
     $('#rrm_tobeonboardplanbTechnicalTeamError').html("Select Date");
     } else{
     $('#sd_date_rrm_technical_tobeonboardplanb').removeClass('input-error');
    $('#rrm_tobeonboardplanbTechnicalTeamError').html("");
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

var resulPlanBt = PostDataCall(dataPlanB);
       $('.nav-tabs a[href="#rrm_CommentsDetailsTechnicalTeam"]').tab("show");  
       $("#rrm_manage_plan_comments_documents_TechnicalTeam").hide();
      $(".btnPrevious").show();
      if (!IsRrmSaved) {
          $(".saveFamilyBtn").show();
          $("a.btnNext").hide();
		 //_addRRMEntryPointTechnicalTeam.getcommentsinrrm();
      }     
    }   
  }

}}

//tab previous button functions (rrmentry<-skills<-planA<-planB<-commnets) 
_addRRMEntryPointTechnicalTeam.toggleTabRRMEntryPrevious = function(){
  
   var activeTab = $('#rrmtab').find('li.active').attr('id')
      if (activeTab == "rrm_skillsplanaTab") 
      {
          $('.nav-tabs a[href="#rrm_SkillDetails"]').tab("show");
          $("a.btnNext").show();
          $(".saveFamilyBtn").hide();
      }
      if (activeTab == "rrm_skillsTab") 
        {
            $('.nav-tabs a[href="#rrm_RequirementDetailsTechnicalTeam"]').tab("show");
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
            $(".btnPrevious").hide();
            _addRRMEntryPointTechnicalTeam.updateresourcerequitementdata();
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

     // var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
        callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {
            if (result != null) {
              $("#sd_txtEditor_technical_skillDetailsPlanA").dxHtmlEditor('instance').option("value",result[0].SkillPlanInfo);
                var edate = result[0].ToBeOnBoard;
                var ed = edate;
                $("#sd_date_rrm_technical_tobeonboardplana").dxDateBox('instance').option("value",ed);
                ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
            }
        });
    }
    if (activeTab == "rrm_commentsTechnicalTeamTab") 
    {

        comments = $("#sd_txtEditor_technical_skillDetailsPlanB").dxHtmlEditor('instance').option("value");

        if (!IsRrmSaved) {
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
        } else {
            $("a.btnNext").hide();
        }
        $(".btnPrevious").show();
        $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsTechnicalTeam"]').tab("show");
        var filter_valbtn = JSON.stringify({
          "IsActive":"True",
          "Token":Token,
          "SkillPlans":'PlanB',
          "ResourceRequirementId":ResourceRequirementId
        });
          //var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
        callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {
            if (result != null) {
              $("#sd_txtEditor_technical_skillDetailsPlanB").dxHtmlEditor('instance').option("value",result[0].SkillPlanInfo);
                var edate = result[0].ToBeOnBoard;
                var ed = edate;
                $("#sd_date_rrm_technical_tobeonboardplanb").dxDateBox('instance').option("value",ed);
                ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
            }
        });
    }
}

// get rrm detials by id
_addRRMEntryPointTechnicalTeam.updateresourcerequitementdata = function()
{
   // var getRRMData = callgetlist('GetRRMbyid','{"IsActive":"True","ResourceRequirementId":"'+ResourceRequirementId+'","Token":"'+Token+'"}');
    callGetListAsync('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + ResourceRequirementId + '","Token":"' + Token + '"}', function (getRRMData) {
        _addRRMEntryPointTechnicalTeam.mapupdateaddrrmListcomputeHTML(getRRMData)
    });
}

//bind rrm data from _addRRMEntryPointTechnicalTeam.updateresourcerequitementdata function result
_addRRMEntryPointTechnicalTeam.mapupdateaddrrmListcomputeHTML = function(getRRMData){
    if (getRRMData[0].rrmid=="") 
    {
        //
    }
    else
       {
           var data;
          getRRMData.forEach(function (key, item) {
            $("#sdtxt_rrmtechnical_requirementname").dxTextBox('instance').option('value',key.RequirementName);
            $("#sdtxt_rrmtechnical_requiredfor").dxTextBox('instance').option('value',key.RequiredFor);
              $("#rrm_empidTechnicalTeam").val(key.RequirementName);
              $("#rrm_entrybdeTechnicalTeam").val(key.BDEName);
              $("#sdnmb_rrmtechnical_numberofpositions").dxNumberBox('instance').option('value',key.NumberOfPositions);

              $("#sdcmb_rrmtechnical_department").dxSelectBox('instance').option('value',key.DepartmentId);
              $("#sdnmb_rrmtechnical_experiencerequired").dxNumberBox('instance').option('value',key.ExperiencerequiredInYrs);
              $("#sdtxt_rrmtechnical_location").dxTextBox('instance').option('value',key.Location);
          var edate=key.RequestedDate;
            if(edate!=null)
            {
              var ed = edate;
              $("#sd_date_rrmtechnical_requestedDate").dxDateBox('instance').option('value',ed);
            }
          $("#rrm_requirementlead").val(key.LeadName);
         
          });
        }
}

//rrmFormVAlidation
_addRRMEntryPointTechnicalTeam.rrmValidation = function(){
    if ($("#sdtxt_rrmtechnical_requirementname").dxTextBox('instance').option('value') == "") {
        $("#rrm_requirementnameTechnicalTeamError").html("Please Enter Name");
    }
    if ($("#sdtxt_rrmtechnical_requiredfor").dxTextBox('instance').option('value') == "") {
        $("#rrm_requiredforTechnicalTeamError").html("Please Enter RequiredFor");
    }
    if ($("#sdnmb_rrmtechnical_numberofpositions").dxNumberBox('instance').option('value') == "") {
        $("#rrm_numberofpositionsTechnicalTeamError").html("Please Enter No. Of Positions");
    }
    if ($("#sdcmb_rrmtechnical_department").dxSelectBox('instance').option('value') == "") {
        $("#rrm_departmentTechnicalTeamError").html("Please Select Department");
    }
    if ($("#sdnmb_rrmtechnical_experiencerequired").dxNumberBox('instance').option('value') == "") {
        $("#rrm_experiencerequiredError").html("Please Enter Experience");
    }
    if ($("#sdcmb_rrmtechnical_communication").dxSelectBox('instance').option('value') == "") {
        $("#rrm_communicationTechnicalTeamError").html("Please Select Communication");
    }
    if ($("#rrmfamily").val() == "") {
        $("#rrmfamilyError").html("Please Select Family");
    }
    if ($("#rrmskill").val() == "") {
        $("#rrmskillError").html("Please Select Skill");
    }
    if ($("#sd_txtEditor_technical_skillDetailsPlanA").dxHtmlEditor('instance').option("value") == "") {
        $("#rrm_skilldetailsplanaTechnicalTeamError").html("Please Enter Skill Details (Plan A)");
    }
    if ($("#sd_txtEditor_technical_skillDetailsPlanB").dxHtmlEditor('instance').option("value") == "") {
        $("#rrm_skilldetailsplanbTechnicalTeamError").html("Please Enter Skill Details (Plan B)");
    }
    if ($("#sd_date_rrm_technical_tobeonboardplana").dxDateBox('instance').option("value") == "") {
        $("#rrm_tobeonboardplanaTechnicalTeamError").html("Please Select To on Board");
    }
    if ($("#sd_date_rrm_technical_tobeonboardplanb").dxDateBox('instance').option("value") == "") {
        $("#rrm_tobeonboardplanbTechnicalTeamError").html("Please Select To on Board");
    }
}

//reset skill data 
_addRRMEntryPointTechnicalTeam.skillsClearAndShow = function(){ // Clear our fields

    $("#familyentry").val("");
    $("#skillentry").val("");
    $("#skillversionentry").val("");
   
}

//get skill version details 
_addRRMEntryPointTechnicalTeam.get_versionsentry = function(skillentry_id){
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
_addRRMEntryPointTechnicalTeam.get_skillsentry = function(familyentry_id){
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
        _addRRMEntryPointTechnicalTeam.get_versionsentry("");
    });
}
  


  //show skill in skill table
  _addRRMEntryPointTechnicalTeam.getSkillsDetails = function(){
    var filterData = JSON.stringify({
      "ResourceRequirementId": ResourceRequirementId,
      "IsActive": "True",
      "Token": Token
  });        

  callGetListAsync('GetResourceRequrirementSkill', filterData, function (e) {
      GetSkillList = e;

      $("#sdgd-rrmTechnicalSkills").dxDataGrid({
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
            _addRRMEntryPointTechnicalTeam.insert_SkillInfoEntry(e);
          },
          onRowUpdated: function (e) {
            _addRRMEntryPointTechnicalTeam.update_SkillInfoEntry(e);
          },
          onRowRemoved: function (e) {
            _addRRMEntryPointTechnicalTeam.delete_SkillInfoEntry(e);
          }
      });
    })

    }


    _addRRMEntryPointTechnicalTeam.insert_SkillInfoEntry = function (e) {
        
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
            _addRRMEntryPointTechnicalTeam.skillsClearAndShow();
            _addRRMEntryPointTechnicalTeam.getSkillsDetails();
          }
      });
    }
  
    _addRRMEntryPointTechnicalTeam.update_SkillInfoEntry = function (e) {
        
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
              _addRRMEntryPointTechnicalTeam.skillsClearAndShow();
              _addRRMEntryPointTechnicalTeam.getSkillsDetails();
            }
        });       
  
    }
  
    _addRRMEntryPointTechnicalTeam.delete_SkillInfoEntry = function (e) {
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
    _addRRMEntryPointTechnicalTeam.skillcomputeHTML = function (getSkillList) {
        
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
            html += "<button class='btn delete-btn' onclick=_addRRMEntryPointTechnicalTeam.deleteRow_SkillMapping('" + skillId + "')><i class='fas fa-trash-alt'></i></button></td>"
          html += "</tr>";
        }); 
   
    }
	 return html;
  } 

  
  //reset form data
  _addRRMEntryPointTechnicalTeam.clearAll_addrrmdata = function(){
    
    $("#sdtxt_rrmtechnical_requirementname").dxTextBox('instance').option('value',"");
    $("#sdtxt_rrmtechnical_requiredfor").dxTextBox('instance').option('value',"");
            $("#rrm_empidTechnicalTeam").val("");
            $("#rrm_entrybdeTechnicalTeam").val("");
            $("#sdnmb_rrmtechnical_numberofpositions").dxNumberBox('instance').option('value',"");
            
            $("#sdcmb_rrmtechnical_department").dxSelectBox('instance').option('value',"");
            $("#sdcmb_rrmtechnical_designation").dxSelectBox('instance').option('value',"");
            $("#sdnmb_rrmtechnical_experiencerequired").dxNumberBox('instance').option('value',"");
            $("#sdtxt_rrmtechnical_location").dxTextBox('instance').option('value',"");
            var date = new Date();
            var currentDate = date.toISOString().slice(0, 10);
            $("#sd_date_rrmtechnical_requestedDate").dxDateBox('instance').option('value',currentDate);
            $("#rrm_requirementlead").val("");
            $("#sdnmb_rrmtechnical_numberofpositions").dxNumberBox('instance').option('value',"");
            var tdydate = new Date();
            tdydate.setDate(tdydate.getDate() + 1);
            var nxtDate = tdydate.toISOString().slice(0, 10);
            $("#sd_date_rrm_technical_tobeonboardplana").dxDateBox('instance').option("value",nxtDate);
            $("#sd_date_rrm_technical_tobeonboardplanb").dxDateBox('instance').option("value",nxtDate);
            skillsClearAndShow();            

  }

  mapUI();
  return _addRRMEntryPointTechnicalTeam;
});

