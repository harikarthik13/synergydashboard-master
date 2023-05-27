AddRRMEntryPointMarketingHead = (function(){
var _addRRMEntryPointMarketingHead = {};
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
    $rrm_entrybdeMarketingHead= $("#rrm_entrybdeMarketingHead"),
    $rrm_empidMarketingHead = $("#rrm_empidMarketingHead"),
    $rrm_replacementMarketingHead = $("#rrm_replacementMarketingHead"),
    $rrm_experiencerequired = $("#rrm_experiencerequired"),
    $rrm_requirementlead = $("#rrm_requirementlead")
}

//save hr commnents once save&close btn clicked 
    _addRRMEntryPointMarketingHead.saveComments = function () {
    var finalComments=$("#sd_txtEditor_RRMMarkettingHeadComments").dxHtmlEditor('instance').option("value");
    if(finalComments=="")
    {
     
    }
    else
    {	
      dataComments={
      "Method":"PostCommentsInResourceRequirement",
      "Data":{
          "ResourceRequirementId": ResourceRequirementId,
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
        $('#RRMEntryPointModelMarketingHead').modal("hide");
        var rrmEntryGrid = RRMEntryPointGridOwner("MarketingHead");
        rrmEntryGrid.getRRMEntryTable();
        _addRRMEntryPointMarketingHead.clearAll_addrrmdata();
    }

//tab next button event (rrmentry->skills->planA->planB->commnets) 
_addRRMEntryPointMarketingHead.toggleTabRRMEntry = function() { 
  
    var activeTab = $('#rrmtabMarketingHead').find('li.active').attr('id')
    var EmployeeId = null;
    if (activeTab == "rrm_requirementTabMarketingHead")
    {   
    requirmentName=$("#sdtxt_rrmmarketinghead_requirementname").dxTextBox('instance').option('value');
     requireFor=$("#sdtxt_rrmmarketinghead_requiredfor").dxTextBox('instance').option('value');
     bde=$("#rrm_entrybdeMarketingHead").val();  
     if(bde==""){bde=null;}	 
     EmployeeId=$("#rrm_empidMarketingHead").val();
     if(EmployeeId==""){EmployeeId=null}
     replacementFor=$("#rrm_replacementMarketingHead").val();
     position=$("#sdnmb_rrmmarketinghead_numberofpositions").dxNumberBox('instance').option('value');
     priority=$("#sdcmb_rrmmarketinghead_priority").dxSelectBox('instance').option('value');
     department=$("#sdcmb_rrmmarketinghead_department").dxSelectBox('instance').option('value');
     designation=$("#sdcmb_rrmmarketinghead_designation").dxSelectBox('instance').option('value');
        experience = $("#sdnmb_rrmmarketinghead_experiencerequired").dxNumberBox('instance').option('value');
     communication=$("#sdcmb_rrmmarketinghead_communication").dxSelectBox('instance').option('value');
     reqlocation=$("#sdtxt_rrmmarketinghead_location").dxTextBox('instance').option('value');
     if(reqlocation==""){reqlocation=null;}
     if(ResourceRequirementId=="" ||ResourceRequirementId==undefined)
     {
      ResourceRequirementId=null;
     }	 
     requestedDate=$("#sd_date_rrmmarketinghead_requestedDate").dxDateBox('instance').option('value');
     losingRevenue= $("#sdchk_rrmmarketinghead_losingRevenue").dxCheckBox('instance').option('value');
     fromVIP=$("#sdchk_rrmmarketinghead_fromVIP").dxCheckBox('instance').option('value');    
     requirmentLead=$("rrm_requirementlead").val();;
	   var finalRequestedDate = moment(requestedDate).format("DD-MM-YYYY");
  
     if(requirmentName == "" || requireFor==""||position==""||position=="0"||department==""||designation==""||experience==""||experience=="0"){
     if (requirmentName == "")
     {
     $('#sdtxt_rrmmarketinghead_requirementname').addClass('input-error');
     $('#rrm_requirementnameMarketingHeadError').html("Enter Requirment Name");
     }
     else
     {
       $('#sdtxt_rrmmarketinghead_requirementname').removeClass('input-error');
       $('#rrm_requirementnameMarketingHeadError').html("");
     }
     if(requireFor=="")
     {
       $('#sdtxt_rrmmarketinghead_requiredfor').addClass('input-error');
       $('#rrm_requiredforMarketingHeadError').html("Enter Required For");
     }
     else
     {
     $('#sdtxt_rrmmarketinghead_requiredfor').removeClass('input-error');
     $('#rrm_requiredforMarketingHeadError').html("");
     } 
     if(position==""||position=="0")
     {
     if(position=="")
     {
      if(position=="")
        {
          $('#sdnmb_rrmmarketinghead_numberofpositions').addClass('input-error');
          $('#rrm_numberofpositionsMarketingHeadError').html("Enter Position");
        }
      else
        {
          $('#sdnmb_rrmmarketinghead_numberofpositions').removeClass('input-error');
          $('#rrm_numberofpositionsMarketingHeadError').html("");
        }
     }
     if(position=="0")
      {
        if(position=="0")
          {
            $('#sdnmb_rrmmarketinghead_numberofpositions').addClass('input-error');
            $('#rrm_numberofpositionsMarketingHeadError').html("Min Position is 1");
          }
     else
       {
         $('#sdnmb_rrmmarketinghead_numberofpositions').removeClass('input-error');
        $('#rrm_numberofpositionsMarketingHeadError').html("");
        }
    }
  }
    if(department=="")
    {
       $('#sdcmb_rrmmarketinghead_department').addClass('input-error');
      $('#rrm_departmentMarketingHeadError').html("Select Department");
    }
    else
    {
       $('#sdcmb_rrmmarketinghead_department').removeClass('input-error');
        $('#rrm_departmentMarketingHeadError').html("");
    }
    if(designation=="")
    {
      $('#sdcmb_rrmmarketinghead_designation').addClass('input-error');
      $('#rrm_designationMarketingHeadError').html("Select Designation");
    }
    else
    {
      $('#sdcmb_rrmmarketinghead_designation').removeClass('input-error');
      $('#rrm_designationMarketingHeadError').html("");
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
         });
         $('.nav-tabs a[href="#rrm_SkillDetailsMarketingHead"]').tab("show");
      $(".btnPrevious").show();
      if (!IsRrmSaved) 
      {
        $(".saveFamilyBtn").hide();
        $("a.btnNext").show();
      }

  _addRRMEntryPointMarketingHead.getSkillsDetails();
}
}
      $(".btnPrevious").show();
      if (!IsRrmSaved) 
        {
            $(".saveFamilyBtn").hide();
            $("a.btnNext").show();

          if (activeTab == "rrm_skillsTabMarketingHead") 
    {   
      family=$("#familyentry").value;
      skills=$("#skillentry").value;
      version=$("#skillversionentry").value;   

      var data = $("#sdgd-rrmMarketingHeadSkills").dxDataGrid("instance").option("dataSource");
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
          $('.nav-tabs a[href="#rrm_SkillsPlanADetailsMarketingHead"]').tab("show");
         $(".btnPrevious").show();
        if (!IsRrmSaved) 
          {
            $(".saveFamilyBtn").hide();
            $("a.btnNext").show();
          }
      }
}

          if (activeTab == "rrm_skillsplanaTabMarketingHead") {
    var datecheck=0;
    skillDetailsA = $("#sd_txtEditor_markettingHead_skillDetailsPlanA").dxHtmlEditor('instance').option("value");
    
    toOnBoardA=$("#sd_date_rrm_markettingHead_tobeonboardplana").dxDateBox('instance').option("value");
              requirtersA = $("#rrm_MarketingHeadsplanaMarketingHead").val(); 
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
       $('#sd_txtEditor_markettingHead_skillDetailsPlanA').addClass('input-error');
       $('#rrm_skilldetailsplanaMarketingHeadError').html("Enter Skill Details");
     }
     else{
       $('#sd_txtEditor_markettingHead_skillDetailsPlanA').removeClass('input-error');
       $('#rrm_skilldetailsplanaMarketingHeadError').html("");
     }
     if(toOnBoardA==""){
       $('#sd_date_rrm_markettingHead_tobeonboardplana').addClass('input-error');
       $('#rrm_tobeonboardplanaMarketingHeadError').html("Select Date");
     }
     else{
       $('#sd_date_rrm_markettingHead_tobeonboardplana').removeClass('input-error');
       $('#rrm_tobeonboardplanaMarketingHeadError').html("");
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
       //var resulPlanBt = PostDataCall(dataPlanA);
       PostDataCallAsync(dataPlanA, function (resulPlanBt) {
       });
       $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsMarketingHead"]').tab("show");
    $(".btnPrevious").show();
    if (!IsRrmSaved) {
        $(".saveFamilyBtn").hide();
        $("a.btnNext").show();
    }     
  }   
  }

          if (activeTab == "rrm_skillsplanbTabMarketingHead") {   
  var datecheckplanb=0;
  skillDetailsB= $("#sd_txtEditor_markettingHead_skillDetailsPlanB").dxHtmlEditor('instance').option("value");

      toOnBoardB = $("#sd_date_rrm_markettingHead_tobeonboardplanb").dxDateBox('instance').option("value");
  requirtersB=$("#rrm_MarketingHeadsplanbMarketingHead").val();
	var varEDate = new Date().toISOString().slice(0,10); //dd-mm-YYYY
	
	if(toOnBoardB <= varEDate) {
		datecheckplanb=1;
swal({
							title: "Warning!",
							text: "Please enter valid Date current and previous date should not be selected",
							icon: "warning",
							button: "ok!",
						})
        $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsMarketingHead"]').tab("show");
}
   if((skillDetailsB==""||toOnBoardB=="")||datecheckplanb==1){
   if(skillDetailsB==""){
    $('#sd_txtEditor_markettingHead_skillDetailsPlanB').addClass('input-error');
    $('#rrm_skilldetailsplanbMarketingHeadError').html("Enter Skill Details");
    } else{
    $('#sd_txtEditor_markettingHead_skillDetailsPlanB').removeClass('input-error');
     $('#rrm_skilldetailsplanbMarketingHeadError').html("");
    }
     if(toOnBoardB==""){
     $('#sd_date_rrm_markettingHead_tobeonboardplanb').addClass('input-error');
     $('#rrm_tobeonboardplanbMarketingHeadError').html("Select Date");
     } else{
     $('#sd_date_rrm_markettingHead_tobeonboardplanb').removeClass('input-error');
    $('#rrm_tobeonboardplanbMarketingHeadError').html("");
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
       });
       $('.nav-tabs a[href="#rrm_CommentsDetailsMarketingHead"]').tab("show");  
       $("#rrm_manage_plan_comments_documents_MarketingHead").hide();
      $(".btnPrevious").show();
      if (!IsRrmSaved) {
          $(".saveFamilyBtn").show();
          $("a.btnNext").hide();
		 //_addRRMEntryPointMarketingHead.getcommentsinrrm();
      }     
    }   
  }

}}

//tab previous button functions (rrmentry<-skills<-planA<-planB<-commnets) 
_addRRMEntryPointMarketingHead.toggleTabRRMEntryPrevious = function(){
  
   var activeTab = $('#rrmtab').find('li.active').attr('id')
      if (activeTab == "rrm_skillsplanaTab") 
      {
          $('.nav-tabs a[href="#rrm_SkillDetails"]').tab("show");
          $("a.btnNext").show();
          $(".saveFamilyBtn").hide();
      }
      if (activeTab == "rrm_skillsTab") 
        {
            $('.nav-tabs a[href="#rrm_RequirementDetailsMarketingHead"]').tab("show");
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
            $(".btnPrevious").hide();
            _addRRMEntryPointMarketingHead.updateresourcerequitementdata();
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
              $("#sd_txtEditor_markettingHead_skillDetailsPlanA").dxHtmlEditor('instance').option("value",result[0].SkillPlanInfo);
                var edate = result[0].ToBeOnBoard;
                var ed = edate;                
                $("#sd_date_rrm_markettingHead_tobeonboardplana").dxDateBox('instance').option("value",ed);
                ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
            }
        });
    }
    if (activeTab == "rrm_commentsMarketingHeadTab") 
    {

        comments = $("#sd_txtEditor_markettingHead_skillDetailsPlanB").dxHtmlEditor('instance').option("value");

        if (!IsRrmSaved) {
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
        } else {
            $("a.btnNext").hide();
        }
        $(".btnPrevious").show();
        $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsMarketingHead"]').tab("show");
        var filter_valbtn = JSON.stringify({
          "IsActive":"True",
          "Token":Token,
          "SkillPlans":'PlanB',
          "ResourceRequirementId":ResourceRequirementId
        });
        //var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
        callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {
            if (result != null) {
              $("#sd_txtEditor_markettingHead_skillDetailsPlanB").dxHtmlEditor('instance').option("value",result[0].SkillPlanInfo);
                var edate = result[0].ToBeOnBoard;
                var ed = edate;                
                $("#sd_date_rrm_markettingHead_tobeonboardplanb").dxDateBox('instance').option("value",ed);
                ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
            }
        });
    }
}

// get rrm detials by id
_addRRMEntryPointMarketingHead.updateresourcerequitementdata = function()
{
   // var getRRMData = callgetlist('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + ResourceRequirementId + '","Token":"' + Token + '"}');
    callGetListAsync('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + ResourceRequirementId + '","Token":"' + Token + '"}', function (getRRMData) {
        _addRRMEntryPointMarketingHead.mapupdateaddrrmListcomputeHTML(getRRMData)
    });
}

//bind rrm data from _addRRMEntryPointMarketingHead.updateresourcerequitementdata function result
_addRRMEntryPointMarketingHead.mapupdateaddrrmListcomputeHTML = function(getRRMData){
    if (getRRMData[0].rrmid=="") 
    {
        //
    }
    else
       {
           var data;
          getRRMData.forEach(function (key, item) {
            $("#sdtxt_rrmmarketinghead_requirementname").dxTextBox('instance').option('value',key.RequirementName);
            $("#sdtxt_rrmmarketinghead_requiredfor").dxTextBox('instance').option('value',key.RequiredFor);
              $("#rrm_empidMarketingHead").val(key.RequirementName);
              $("#rrm_entrybdeMarketingHead").val(key.BDEName);
              $("#sdnmb_rrmmarketinghead_numberofpositions").dxNumberBox('instance').option('value',key.NumberOfPositions);

              $("#sdcmb_rrmmarketinghead_department").dxSelectBox('instance').option('value',key.DepartmentId);
              $("#rrm_experiencerequired").val(key.ExperiencerequiredInYrs);
              $("#sdtxt_rrmmarketinghead_location").dxTextBox('instance').option('value',key.Location);
          var edate=key.RequestedDate;
            if(edate!=null)
            {
              var ed = edate;
              $("#sd_date_rrmmarketinghead_requestedDate").dxDateBox('instance').option('value',ed);
            }
          $("#rrm_requirementlead").val(key.LeadName);
          });
        }
}

//rrmFormVAlidation
_addRRMEntryPointMarketingHead.rrmValidation = function(){
    if ($("#sdtxt_rrmmarketinghead_requirementname").dxTextBox('instance').option('value') == "") {
        $("#rrm_requirementnameMarketingHeadError").html("Please Enter Name");
    }
    if ($("#sdtxt_rrmmarketinghead_requiredfor").dxTextBox('instance').option('value') == "") {
        $("#rrm_requiredforMarketingHeadError").html("Please Enter RequiredFor");
    }
    if ($("#sdnmb_rrmmarketinghead_numberofpositions").dxNumberBox('instance').option('value') == "") {
        $("#rrm_numberofpositionsMarketingHeadError").html("Please Enter No. Of Positions");
    }
    if ($("#sdcmb_rrmmarketinghead_department").dxSelectBox('instance').option('value') == "") {
        $("#rrm_departmentMarketingHeadError").html("Please Select Department");
    }
    if ($("#rrm_experiencerequired").val() == "") {
        $("#rrm_experiencerequiredError").html("Please Enter Experience");
    }
    if ($("#sdcmb_rrmmarketinghead_communication").dxSelectBox('instance').option('value') == "") {
        $("#rrm_communicationMarketingHeadError").html("Please Select Communication");
    }
    if ($("#rrmfamily").val() == "") {
        $("#rrmfamilyError").html("Please Select Family");
    }
    if ($("#rrmskill").val() == "") {
        $("#rrmskillError").html("Please Select Skill");
    }
    if ($("#rrm_skilldetailsplanaMarketingHead").val() == "") {
        $("#rrm_skilldetailsplanaMarketingHeadError").html("Please Enter Skill Details (Plan A)");
    }
    if ($("#sd_txtEditor_markettingHead_skillDetailsPlanB").dxHtmlEditor('instance').option("value") == "") {
        $("#rrm_skilldetailsplanbMarketingHeadError").html("Please Enter Skill Details (Plan B)");
    }
    if ($("#sd_date_rrm_markettingHead_tobeonboardplana").dxDateBox('instance').option("value") == "") {
        $("#rrm_tobeonboardplanaMarketingHeadError").html("Please Select To on Board");
    }
    if ($("#sd_date_rrm_markettingHead_tobeonboardplanb").dxDateBox('instance').option("value") == "") {
        $("#rrm_tobeonboardplanbMarketingHeadError").html("Please Select To on Board");
    }
}

//reset skill data 
_addRRMEntryPointMarketingHead.skillsClearAndShow = function(){ // Clear our fields

    $("#familyentry").val("");
    $("#skillentry").val("");
    $("#skillversionentry").val("");
   
}

//get skill version details 
_addRRMEntryPointMarketingHead.get_versionsentry = function(skillentry_id){
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
_addRRMEntryPointMarketingHead.get_skillsentry = function(familyentry_id){
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
        _addRRMEntryPointMarketingHead.get_versionsentry("");
    });
}


  //show skill in skill table
  _addRRMEntryPointMarketingHead.getSkillsDetails = function(){
    
    var filterData = JSON.stringify({
      "ResourceRequirementId": ResourceRequirementId,
      "IsActive": "True",
      "Token": Token
  });        

  callGetListAsync('GetResourceRequrirementSkill', filterData, function (e) {
      GetSkillList = e;

      $("#sdgd-rrmMarketingHeadSkills").dxDataGrid({
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
            _addRRMEntryPointMarketingHead.insert_SkillInfoEntry(e);
          },
          onRowUpdated: function (e) {
            _addRRMEntryPointMarketingHead.update_SkillInfoEntry(e);
          },
          onRowRemoved: function (e) {
            _addRRMEntryPointMarketingHead.delete_SkillInfoEntry(e);
          }
      });
    })
  }

  _addRRMEntryPointMarketingHead.insert_SkillInfoEntry = function (e) {
        
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
          _addRRMEntryPointMarketingHead.skillsClearAndShow();
          _addRRMEntryPointMarketingHead.getSkillsDetails();
        }
    });
  }

  _addRRMEntryPointMarketingHead.update_SkillInfoEntry = function (e) {
      
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
            _addRRMEntryPointMarketingHead.skillsClearAndShow();
            _addRRMEntryPointMarketingHead.getSkillsDetails();
          }
      });       

  }

  _addRRMEntryPointMarketingHead.delete_SkillInfoEntry = function (e) {
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
          _addRRMEntryPointMarketingHead.skillsClearAndShow();
          _addRRMEntryPointMarketingHead.getSkillsDetails();
        }                    
    });   
}


  // bind skill  table date 
    _addRRMEntryPointMarketingHead.skillcomputeHTML = function (getSkillList) {
        
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
            html += "<button class='btn delete-btn' onclick=_addRRMEntryPointMarketingHead.deleteRow_SkillMapping('" + skillId + "')><i class='fas fa-trash-alt'></i></button></td>"
          html += "</tr>";
        }); 
   
    }
	 return html;
  }

  //reset form data
  _addRRMEntryPointMarketingHead.clearAll_addrrmdata = function(){
    
            $("#sdtxt_rrmmarketinghead_requirementname").dxTextBox('instance').option('value',"");
            $("#sdtxt_rrmmarketinghead_requiredfor").dxTextBox('instance').option('value',"");
            $("#rrm_empidMarketingHead").val("");
            $("#rrm_entrybdeMarketingHead").val("");
            $("#sdnmb_rrmmarketinghead_numberofpositions").dxNumberBox('instance').option('value',"");
            
            $("#sdcmb_rrmmarketinghead_department").dxSelectBox('instance').option('value',"");
            $("#sdcmb_rrmmarketinghead_designation").dxSelectBox('instance').option('value',"");
            $("#rrm_experiencerequired").val("");
            $("#sdtxt_rrmmarketinghead_location").dxTextBox('instance').option('value',"");
            var date = new Date();
            var currentDate = date.toISOString().slice(0, 10);
            $("#sd_date_rrmmarketinghead_requestedDate").dxDateBox('instance').option('value',currentDate);
            $("#rrm_requirementlead").val("");
            var tdydate = new Date();
            tdydate.setDate(tdydate.getDate() + 1);
            var nxtDate = tdydate.toISOString().slice(0, 10);
            $("#sd_date_rrm_markettingHead_tobeonboardplana").dxDateBox('instance').option("value",nxtDate);
            $("#sd_date_rrm_markettingHead_tobeonboardplanb").dxDateBox('instance').option("value",nxtDate);
            skillsClearAndShow();            

  }

  mapUI();
  return _addRRMEntryPointMarketingHead;
});

