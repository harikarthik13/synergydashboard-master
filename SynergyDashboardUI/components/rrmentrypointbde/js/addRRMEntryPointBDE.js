AddRRMEntryPointBDE = (function(){
var _addRRMEntryPointBDE = {};
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
    $rrm_entrybdeBDE= $("#rrm_entrybdeBDE"),
    $rrm_empidBDE = $("#rrm_empidBDE"),
    $rrm_replacementBDE = $("#rrm_replacementBDE"),
    $rrm_experiencerequired = $("#rrm_experiencerequired"),
    $rrm_requirementlead = $("#rrm_requirementlead")
}

//save hr commnents once save&close btn clicked 
    _addRRMEntryPointBDE.saveComments = function () {
        
    var finalComments=$("#sd_txtEditor_RRMBDEComments").dxHtmlEditor('instance').option("value");
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
        $('#RRMEntryPointModelBDE').modal("hide");
        var rrmEntryGrid = RRMEntryPointGridOwner("BDE");
        rrmEntryGrid.getRRMEntryTable();
        _addRRMEntryPointBDE.clearAll_addrrmdata();
    }

//tab next button event (rrmentry->skills->planA->planB->commnets) 
_addRRMEntryPointBDE.toggleTabRRMEntry = function() { 
  
    var activeTab = $('#rrmtabBDE').find('li.active').attr('id')
    var EmployeeId = null;
    if (activeTab == "rrm_requirementTabBDE")
    {   
    requirmentName=$("#sdtxt_rrmbde_requirementname").dxTextBox('instance').option('value');
     requireFor=$("#sdtxt_rrmbde_requiredfor").dxTextBox('instance').option('value');
     bde=$("#rrm_entrybdeBDE").val();  
     if(bde==""){bde=null;}	 
     EmployeeId=$("#rrm_empidBDE").val();
     if(EmployeeId==""){EmployeeId=null}
     replacementFor=$("#rrm_replacementBDE").val();
     position=$("#sdnmb_rrmbde_numberofpositions").dxNumberBox('instance').option('value');
     priority=$("#sdcmb_rrmbde_priority").dxSelectBox('instance').option('value');
     department=$("#sdcmb_rrmbde_department").dxSelectBox('instance').option('value');
     designation=$("#sdcmb_rrmbde_designation").dxSelectBox('instance').option('value');
        experience = $("#sdnmb_rrmbde_experiencerequired").dxNumberBox('instance').option('value');
     communication=$("#sdcmb_rrmbde_communication").dxSelectBox('instance').option('value');
     reqlocation=$("#sdtxt_rrmbde_location").dxTextBox('instance').option('value');
     if(reqlocation==""){reqlocation=null;}
     if(ResourceRequirementId=="" ||ResourceRequirementId==undefined)
     {
      ResourceRequirementId=null;
     }	 
     requestedDate=$("#sd_date_rrmbde_requestedDate").dxDateBox('instance').option('value');   
     losingRevenue= $("#sdchk_rrmbde_losingRevenue").dxCheckBox('instance').option('value');
     fromVIP=$("#sdchk_rrmbde_fromVIP").dxCheckBox('instance').option('value');   
     requirmentLead=$("rrm_requirementlead").val();;
	   var finalRequestedDate = moment(requestedDate).format("DD-MM-YYYY");
  
     if(requirmentName == "" || requireFor==""||position==""||position=="0"||department==""||designation==""||experience==""||experience=="0"){
     if (requirmentName == "")
     {
        $('#sdtxt_rrmbde_requirementname').addClass('input-error');
        $('#rrm_requirementnameBDEError').html("Enter Requirment Name");
     }
     else
     {
       $('#sdtxt_rrmbde_requirementname').removeClass('input-error');
       $('#rrm_requirementnameBDEError').html("");
     }
     if(requireFor=="")
     {
       $('#sdtxt_rrmbde_requiredfor').addClass('input-error');
       $('#rrm_requiredforBDEError').html("Enter Required For");
     }
     else
     {
     $('#sdtxt_rrmbde_requiredfor').removeClass('input-error');
     $('#rrm_requiredforBDEError').html("");
     } 
     if(position==""||position=="0")
     {
     if(position=="")
     {
      if(position=="")
        {
          $('#sdnmb_rrmbde_numberofpositions').addClass('input-error');
          $('#rrm_numberofpositionsBDEError').html("Enter Position");
        }
      else
        {
          $('#sdnmb_rrmbde_numberofpositions').removeClass('input-error');
          $('#rrm_numberofpositionsBDEError').html("");
        }
     }
     if(position=="0")
      {
        if(position=="0")
          {
            $('#sdnmb_rrmbde_numberofpositions').addClass('input-error');
            $('#rrm_numberofpositionsBDEError').html("Min Position is 1");
          }
     else
       {
         $('#sdnmb_rrmbde_numberofpositions').removeClass('input-error');
        $('#rrm_numberofpositionsBDEError').html("");
        }
    }
  }
    if(department=="")
    {
       $('#sdcmb_rrmbde_department').addClass('input-error');
      $('#rrm_departmentBDEError').html("Select Department");
    }
    else
    {
       $('#sdcmb_rrmbde_department').removeClass('input-error');
        $('#rrm_departmentBDEError').html("");
    }
    if(designation=="")
    {
      $('#sdcmb_rrmbde_designation').addClass('input-error');
      $('#rrm_designationBDEError').html("Select Designation");
    }
    else
    {
      $('#sdcmb_rrmbde_designation').removeClass('input-error');
      $('#rrm_designationBDEError').html("");
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
         $('.nav-tabs a[href="#rrm_SkillDetailsBDE"]').tab("show");
      $(".btnPrevious").show();
      if (!IsRrmSaved) 
      {
        $(".saveFamilyBtn").hide();
        $("a.btnNext").show();
      }

  _addRRMEntryPointBDE.getSkillsDetails();
}
}
      $(".btnPrevious").show();
      if (!IsRrmSaved) 
        {
            $(".saveFamilyBtn").hide();
            $("a.btnNext").show();

          if (activeTab == "rrm_skillsTabBDE") 
    {   
      family=$("#familyentry").value;
      skills=$("#skillentry").value;
      version=$("#skillversionentry").value;   

      var data = $("#sdgd-rrmBDESkills").dxDataGrid("instance").option("dataSource");

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
          $('.nav-tabs a[href="#rrm_SkillsPlanADetailsBDE"]').tab("show");
         $(".btnPrevious").show();
        if (!IsRrmSaved) 
          {
            $(".saveFamilyBtn").hide();
            $("a.btnNext").show();
          }
      }
}

          if (activeTab == "rrm_skillsplanaTabBDE") {
    var datecheck=0;
    skillDetailsA = $("#sd_txtEditorbde_skillDetailsPlanA").dxHtmlEditor('instance').option("value");
    
    toOnBoardA=$("#sd_date_rrmbde_tobeonboardplana").dxDateBox('instance').option("value");
              requirtersA = $("#rrm_BDEsplanaBDE").val(); 
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
       $('#sd_txtEditorbde_skillDetailsPlanA').addClass('input-error');
       $('#rrm_skilldetailsplanaBDEError').html("Enter Skill Details");
     }
     else{
       $('#sd_txtEditorbde_skillDetailsPlanA').removeClass('input-error');
       $('#rrm_skilldetailsplanaBDEError').html("");
     }
     if(toOnBoardA==""){
       $('#sd_date_rrmbde_tobeonboardplana').addClass('input-error');
       $('#rrm_tobeonboardplanaBDEError').html("Select Date");
     }
     else{
       $('#sd_date_rrmbde_tobeonboardplana').removeClass('input-error');
       $('#rrm_tobeonboardplanaBDEError').html("");
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
       //  var resulPlanBt = PostDataCall(dataPlanA);
       PostDataCallAsync(dataPlanA, function (resulPlanBt) {
           $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsBDE"]').tab("show");
           $(".btnPrevious").show();
           if (!IsRrmSaved) {
               $(".saveFamilyBtn").hide();
               $("a.btnNext").show();
           }
       });
  }   
  }

          if (activeTab == "rrm_skillsplanbTabBDE") {   
  var datecheckplanb=0;
  skillDetailsB= $("#sd_txtEditorbde_skillDetailsPlanB").dxHtmlEditor('instance').option("value");

      toOnBoardB = $("#sd_date_rrmbde_tobeonboardplanb").dxDateBox('instance').option("value");
  requirtersB=$("#rrm_BDEsplanbBDE").val();
	var varEDate = new Date().toISOString().slice(0,10); //dd-mm-YYYY
	
	if(toOnBoardB <= varEDate) {
		datecheckplanb=1;
swal({
							title: "Warning!",
							text: "Please enter valid Date current and previous date should not be selected",
							icon: "warning",
							button: "ok!",
						})
        $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsBDE"]').tab("show");
}
   if((skillDetailsB==""||toOnBoardB=="")||datecheckplanb==1){
   if(skillDetailsB==""){
    $('#sd_txtEditorbde_skillDetailsPlanB').addClass('input-error');
    $('#rrm_skilldetailsplanbBDEError').html("Enter Skill Details");
    } else{
    $('#sd_txtEditorbde_skillDetailsPlanB').removeClass('input-error');
     $('#rrm_skilldetailsplanbBDEError').html("");
    }
     if(toOnBoardB==""){
     $('#sd_date_rrmbde_tobeonboardplanb').addClass('input-error');
     $('#rrm_tobeonboardplanbBDEError').html("Select Date");
     } else{
     $('#sd_date_rrmbde_tobeonboardplanb').removeClass('input-error');
    $('#rrm_tobeonboardplanbBDEError').html("");
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
           $('.nav-tabs a[href="#rrm_CommentsDetailsBDE"]').tab("show");
           $("#rrm_manage_plan_comments_documents_BDE").hide();
           $(".btnPrevious").show();
           if (!IsRrmSaved) {
               $(".saveFamilyBtn").show();
               $("a.btnNext").hide();
               //_addRRMEntryPointBDE.getcommentsinrrm();
           }
       });     
    }   
  }

}}

//tab previous button functions (rrmentry<-skills<-planA<-planB<-commnets) 
    _addRRMEntryPointBDE.toggleTabRRMEntryPrevious = function () {

        var activeTab = $('#rrmtab').find('li.active').attr('id')
        if (activeTab == "rrm_skillsplanaTab") {
            $('.nav-tabs a[href="#rrm_SkillDetails"]').tab("show");
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
        }
        if (activeTab == "rrm_skillsTab") {
            $('.nav-tabs a[href="#rrm_RequirementDetailsBDE"]').tab("show");
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
            $(".btnPrevious").hide();
            _addRRMEntryPointBDE.updateresourcerequitementdata();
        }
        if (activeTab == "rrm_skillsplanbTab") {
            $('.nav-tabs a[href="#rrm_SkillsPlanADetails"]').tab("show");
            $("a.btnNext").show();
            $(".btnPrevious").show();
            $(".saveFamilyBtn").hide();

            var filter_valbtn = JSON.stringify({
                "IsActive": "True",
                "Token": Token,
                "SkillPlan": 'PlanA',
                "ResourceRequirementId": ResourceRequirementId
            });

            // var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
            callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {
                if (result != null) {
                    $("#sd_txtEditorbde_skillDetailsPlanA").dxHtmlEditor('instance').option("value",result[0].SkillPlanInfo);
                    var edate = result[0].ToBeOnBoard;                   
                    $("#sd_date_rrmbde_tobeonboardplana").dxDateBox('instance').option("value",edate);
                    ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
                }
            })
        }
        if (activeTab == "rrm_commentsBDETab") {

            comments = $("#sd_txtEditorbde_skillDetailsPlanB").dxHtmlEditor('instance').option("value");

            if (!IsRrmSaved) {
                $("a.btnNext").show();
                $(".saveFamilyBtn").hide();
            } else {
                $("a.btnNext").hide();
            }
            $(".btnPrevious").show();
            $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsBDE"]').tab("show");
            var filter_valbtn = JSON.stringify({
                "IsActive": "True",
                "Token": Token,
                "SkillPlans": 'PlanB',
                "ResourceRequirementId": ResourceRequirementId
            });
            //var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
            callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {
                if (result != null) {
                    $("#sd_txtEditorbde_skillDetailsPlanB").dxHtmlEditor('instance').option("value",result[0].SkillPlanInfo);
                    var edate = result[0].ToBeOnBoard;
                    var ed = edate;                    
                    $("#sd_date_rrmbde_tobeonboardplanb").dxDateBox('instance').option("value",ed);
                    ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
                }
            })
        }
    }

// get rrm detials by id
_addRRMEntryPointBDE.updateresourcerequitementdata = function()
{
  //  var getRRMData = callgetlist('GetRRMbyid','{"IsActive":"True","ResourceRequirementId":"'+ResourceRequirementId+'","Token":"'+Token+'"}');
    callGetListAsync('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + ResourceRequirementId + '","Token":"' + Token + '"}', function (getRRMData) {
        _addRRMEntryPointBDE.mapupdateaddrrmListcomputeHTML(getRRMData)
    });
}

//bind rrm data from _addRRMEntryPointBDE.updateresourcerequitementdata function result
_addRRMEntryPointBDE.mapupdateaddrrmListcomputeHTML = function(getRRMData){
    if (getRRMData[0].rrmid=="") 
    {
        //
    }
    else
       {
           var data;
          getRRMData.forEach(function (key, item) {
            $("#sdtxt_rrmbde_requirementname").dxTextBox('instance').option('value',key.RequirementName);
            $("#sdtxt_rrmbde_requiredfor").dxTextBox('instance').option('value',key.RequiredFor);
              $("#rrm_empidBDE").val(key.RequirementName);
              $("#rrm_entrybdeBDE").val(key.BDEName);
              $("#sdnmb_rrmbde_numberofpositions").dxNumberBox('instance').option('value',key.NumberOfPositions);

              $("#sdcmb_rrmbde_department").dxSelectBox('instance').option('value',key.DepartmentId);
              $("#rrm_experiencerequired").val(key.ExperiencerequiredInYrs);
              $("#sdtxt_rrmbde_location").dxTextBox('instance').option('value',key.Location);
          var edate=key.RequestedDate;
            if(edate!=null)
            {
              var ed = edate;
              $("#sd_date_rrmbde_requestedDate").dxDateBox('instance').option('value',ed);
            }
          $("#rrm_requirementlead").val(key.LeadName);
          });
        }
}

//rrmFormVAlidation
_addRRMEntryPointBDE.rrmValidation = function(){
    if ($("#sdtxt_rrmbde_requirementname").dxTextBox('instance').option('value') == "") {
        $("#rrm_requirementnameBDEError").html("Please Enter Name");
    }
    if ($("#sdtxt_rrmbde_requiredfor").dxTextBox('instance').option('value') == "") {
        $("#rrm_requiredforBDEError").html("Please Enter RequiredFor");
    }
    if ($("#sdnmb_rrmbde_numberofpositions").dxNumberBox('instance').option('value') == "") {
        $("#rrm_numberofpositionsBDEError").html("Please Enter No. Of Positions");
    }
    if ($("#sdcmb_rrmbde_department").dxSelectBox('instance').option('value') == "") {
        $("#rrm_departmentBDEError").html("Please Select Department");
    }
    if ($("#rrm_experiencerequired").val() == "") {
        $("#rrm_experiencerequiredError").html("Please Enter Experience");
    }
    if ($("#sdcmb_rrmbde_communication").dxSelectBox('instance').option('value') == "") {
        $("#rrm_communicationBDEError").html("Please Select Communication");
    }
    if ($("#rrmfamily").val() == "") {
        $("#rrmfamilyError").html("Please Select Family");
    }
    if ($("#rrmskill").val() == "") {
        $("#rrmskillError").html("Please Select Skill");
    }
    if ($("#sd_txtEditorbde_skillDetailsPlanA").dxHtmlEditor('instance').option("value") == "") {
        $("#rrm_skilldetailsplanaBDEError").html("Please Enter Skill Details (Plan A)");
    }
    if ($("#sd_txtEditorbde_skillDetailsPlanB").val() == "") {
        $("#rrm_skilldetailsplanbBDEError").html("Please Enter Skill Details (Plan B)");
    }
    if ($("#sd_date_rrmbde_tobeonboardplana").dxDateBox('instance').option("value") == "") {
        $("#rrm_tobeonboardplanaBDEError").html("Please Select To on Board");
    }
    if ($("#sd_date_rrmbde_tobeonboardplanb").dxDateBox('instance').option("value") == "") {
        $("#rrm_tobeonboardplanbBDEError").html("Please Select To on Board");
    }
}

//reset skill data 
_addRRMEntryPointBDE.skillsClearAndShow = function(){ // Clear our fields

    $("#familyentry").val("");
    $("#skillentry").val("");
    $("#skillversionentry").val("");
   
}

//get skill version details 
_addRRMEntryPointBDE.get_versionsentry = function(skillentry_id){
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
_addRRMEntryPointBDE.get_skillsentry = function(familyentry_id){
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
        _addRRMEntryPointBDE.get_versionsentry("");
    });
}


  //show skill in skill table
  _addRRMEntryPointBDE.getSkillsDetails = function(){
    
    var filterData = JSON.stringify({
      "ResourceRequirementId": ResourceRequirementId,
      "IsActive": "True",
      "Token": Token
  });        

  callGetListAsync('GetResourceRequrirementSkill', filterData, function (e) {
      GetSkillList = e;

      $("#sdgd-rrmBDESkills").dxDataGrid({
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
            _addRRMEntryPointBDE.insert_SkillInfoEntry(e);
          },
          onRowUpdated: function (e) {
            _addRRMEntryPointBDE.update_SkillInfoEntry(e);
          },
          onRowRemoved: function (e) {
            _addRRMEntryPointBDE.delete_SkillInfoEntry(e);
          }
      });
    })
    }

    //insert skill details 
    _addRRMEntryPointBDE.insert_SkillInfoEntry = function (e) {
        
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
          _addRRMEntryPointBDE.skillsClearAndShow();
          _addRRMEntryPointBDE.getSkillsDetails();
        }
    });
}

_addRRMEntryPointBDE.update_SkillInfoEntry = function (e) {
    
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
          _addRRMEntryPointBDE.skillsClearAndShow();
          _addRRMEntryPointBDE.getSkillsDetails();
        }
    });       

}

_addRRMEntryPointBDE.delete_SkillInfoEntry = function (e) {
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
          _addRRMEntryPointBDE.skillsClearAndShow();
          _addRRMEntryPointBDE.getSkillsDetails();
        }                    
    });   
}
  // bind skill  table date 
    _addRRMEntryPointBDE.skillcomputeHTML = function (getSkillList) {
        
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
            html += "<td><button class='btn edit-btn editrrmskillmappingaddbde' data-rrmskillid=" + key.ResourceRequirementSkillId + "><i class='fas fa-pencil-alt'></i></button>"
            html += "<button class='btn delete-btn deleteSkillMappingaddbde' data-rrmskillid=" + key.ResourceRequirementSkillId + "><i class='fas fa-trash-alt'></i></button></td>"
          html += "</tr>";
        }); 
   
    }
	 return html;
  } 

  
  //reset form data
  _addRRMEntryPointBDE.clearAll_addrrmdata = function(){
    
    $("#sdtxt_rrmbde_requirementname").dxTextBox('instance').option('value',"");
    $("#sdtxt_rrmbde_requiredfor").dxTextBox('instance').option('value',"");
            $("#rrm_empidBDE").val("");
            $("#rrm_entrybdeBDE").val("");
            $("#sdnmb_rrmbde_numberofpositions").dxNumberBox('instance').option('value',"");
            
            $("#sdcmb_rrmbde_department").dxSelectBox('instance').option('value',"");
            $("#sdcmb_rrmbde_designation").dxSelectBox('instance').option('value',"");
            $("#rrm_experiencerequired").val("");
            $("#sdtxt_rrmbde_location").dxTextBox('instance').option('value',"");
            var date = new Date();
            var currentDate = date.toISOString().slice(0, 10);
            $("#sd_date_rrmbde_requestedDate").dxDateBox('instance').option('value',currentDate);
            $("#rrm_requirementlead").val("");
            var tdydate = new Date();
            tdydate.setDate(tdydate.getDate() + 1);
            var nxtDate = tdydate.toISOString().slice(0, 10);
            $("#sd_date_rrmbde_tobeonboardplana").dxDateBox('instance').option("value",nxtDate);
            $("#sd_date_rrmbde_tobeonboardplanb").dxDateBox('instance').option("value",nxtDate);
            skillsClearAndShow();            

  }

  mapUI();
  return _addRRMEntryPointBDE;
});

