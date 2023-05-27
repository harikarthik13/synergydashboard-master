AddRRMEntryPointAccount = (function(){
var _addRRMEntryPointAccount = {};
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
    $rrm_entrybdeAccount= $("#rrm_entrybdeAccount"),
    $rrm_empidAccount = $("#rrm_empidAccount"),
    $rrm_replacementAccount = $("#rrm_replacementAccount"),
    $rrm_experiencerequired = $("#rrm_experiencerequired"),
    $rrm_requirementlead = $("#rrm_requirementlead")
}

//save hr commnents once save&close btn clicked 
    _addRRMEntryPointAccount.saveComments = function () {
        
    var finalComments=$("#sd_txtEditor_RRMAccounts").dxHtmlEditor('instance').option("value");
    if(finalComments=="")
    {
      ///
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
        $('#RRMEntryPointModelAccount').modal("hide");
        var rrmEntryGrid = RRMEntryPointGridOwner("Accounts");
        rrmEntryGrid.getRRMEntryTable();
        _addRRMEntryPointAccount.clearAll_addrrmdata();
    }

//tab next button event (rrmentry->skills->planA->planB->commnets) 
_addRRMEntryPointAccount.toggleTabRRMEntry = function() { 
  
    var activeTab = $('#rrmtabAccount').find('li.active').attr('id')

    if (activeTab == "rrm_requirementTabAccount")
    {   
    requirmentName=$("#sdtxt_rrmaccounts_requirementname").dxTextBox('instance').option('value');
     requireFor=$("#sdtxt_rrmaccounts_requiredfor").dxTextBox('instance').option('value');
     bde=$("#rrm_entrybdeAccount").val();  
     if(bde==""){bde=null;}	 
     EmployeeId=$("#rrm_empidAccount").val();
     if(EmployeeId==""){EmployeeId=null}
     replacementFor=$("#rrm_replacementAccount").val();
     position=$("#sdnmb_rrmaccounts_numberofpositions").dxNumberBox('instance').option('value');
     priority=$("#sdcmb_rrmaccounts_priority").dxSelectBox('instance').option('value');
     department=$("#sdcmb_rrmaccounts_department").dxSelectBox('instance').option('value');
     designation=$("#sdcmb_rrmaccounts_designation").dxSelectBox('instance').option('value');
        experience = $("#sdnmb_rrmaccounts_experiencerequired").dxNumberBox('instance').option('value');
     communication=$("#sdcmb_rrmaccounts_communication").dxSelectBox('instance').option('value');
     reqlocation=$("#sdtxt_rrmaccounts_location").dxTextBox('instance').option('value');
     if(reqlocation==""){reqlocation=null;}
     if(ResourceRequirementId=="" ||ResourceRequirementId==undefined)
     {
      ResourceRequirementId=null;
     }	 
     requestedDate=$("#sd_date_rrmaccounts_requestedDate").dxDateBox('instance').option('value');     
     losingRevenue= $("#sdchk_rrmaccounts_losingRevenue").dxCheckBox('instance').option('value');
     fromVIP=$("#sdchk_rrmaccounts_fromVIP").dxCheckBox('instance').option('value');   
     requirmentLead=$("rrm_requirementlead").val();;
	   var finalRequestedDate = moment(requestedDate).format("DD-MM-YYYY");
  
     if(requirmentName == "" || requireFor==""||position==""||position=="0"||department==""||designation==""||experience==""||experience=="0"){
     if (requirmentName == "")
     {
     $('#sdtxt_rrmaccounts_requirementname').addClass('input-error');
     $('#rrm_requirementnameAccountError').html("Enter Requirment Name");
     }
     else
     {
       $('#sdtxt_rrmaccounts_requirementname').removeClass('input-error');
       $('#rrm_requirementnameAccountError').html("");
     }
     if(requireFor=="")
     {
       $('#sdtxt_rrmaccounts_requiredfor').addClass('input-error');
       $('#rrm_requiredforAccountError').html("Enter Required For");
     }
     else
     {
     $('#sdtxt_rrmaccounts_requiredfor').removeClass('input-error');
     $('#rrm_requiredforAccountError').html("");
     } 
     if(position==""||position=="0")
     {
     if(position=="")
     {
      if(position=="")
        {
          $('#sdnmb_rrmaccounts_numberofpositions').addClass('input-error');
          $('#rrm_numberofpositionsAccountError').html("Enter Position");
        }
      else
        {
          $('#sdnmb_rrmaccounts_numberofpositions').removeClass('input-error');
          $('#rrm_numberofpositionsAccountError').html("");
        }
     }
     if(position=="0")
      {
        if(position=="0")
          {
            $('#sdnmb_rrmaccounts_numberofpositions').addClass('input-error');
            $('#rrm_numberofpositionsAccountError').html("Min Position is 1");
          }
     else
       {
         $('#sdnmb_rrmaccounts_numberofpositions').removeClass('input-error');
        $('#rrm_numberofpositionsAccountError').html("");
        }
    }
  }
    if(department=="")
    {
       $('#sdcmb_rrmaccounts_department').addClass('input-error');
      $('#rrm_departmentAccountError').html("Select Department");
    }
    else
    {
       $('#sdcmb_rrmaccounts_department').removeClass('input-error');
        $('#rrm_departmentAccountError').html("");
    }
    if(designation=="")
    {
      $('#sdcmb_rrmaccounts_designation').addClass('input-error');
      $('#rrm_designationAccountError').html("Select Designation");
    }
    else
    {
      $('#sdcmb_rrmaccounts_designation').removeClass('input-error');
      $('#rrm_designationAccountError').html("");
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
         $('.nav-tabs a[href="#rrm_SkillDetailsAccount"]').tab("show");
      $(".btnPrevious").show();
      if (!IsRrmSaved) 
      {
        $(".saveFamilyBtn").hide();
        $("a.btnNext").show();
      }

  _addRRMEntryPointAccount.getSkillsDetails();
}
}
      $(".btnPrevious").show();
      if (!IsRrmSaved) 
        {
            $(".saveFamilyBtn").hide();
            $("a.btnNext").show();

          if (activeTab == "rrm_skillsTabAccount") 
    {   
      var data = $("#sdgd-rrmAccountSkills").dxDataGrid("instance").option("dataSource");

      if (data.length == 0) 
      {
          swal({
							title: "Warning!",
							text: "Please Add Skill  Details",
							icon: "warning",
							button: "ok!",
		          })
      }
      else
      {
          $('.nav-tabs a[href="#rrm_SkillsPlanADetailsAccount"]').tab("show");
         $(".btnPrevious").show();
        if (!IsRrmSaved) 
          {
            $(".saveFamilyBtn").hide();
            $("a.btnNext").show();
          }
      }
}

          if (activeTab == "rrm_skillsplanaTabAccount") {
    var datecheck=0;
    skillDetailsA = $("#sd_txtEditoraccounts_skillDetailsPlanA").dxHtmlEditor('instance').option("value");
    
    toOnBoardA=$("#sd_date_rrmaccounts_tobeonboardplana").dxDateBox('instance').option("value");
              requirtersA = $("#rrm_AccountsplanaAccount").val(); 
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
       $('#sd_txtEditoraccounts_skillDetailsPlanA').addClass('input-error');
       $('#rrm_skilldetailsplanaAccountError').html("Enter Skill Details");
     }
     else{
       $('#sd_txtEditoraccounts_skillDetailsPlanA').removeClass('input-error');
       $('#rrm_skilldetailsplanaAccountError').html("");
     }
     if(toOnBoardA==""){
       $('#sd_date_rrmaccounts_tobeonboardplana').addClass('input-error');
       $('#rrm_tobeonboardplanaAccountError').html("Select Date");
     }
     else{
       $('#sd_date_rrmaccounts_tobeonboardplana').removeClass('input-error');
       $('#rrm_tobeonboardplanaAccountError').html("");
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
     "ResourceRequirementSkillPlanId":null,
     "SkillPlan":'PlanA',
     "SkillPlanInfo":skillDetailsA,
     "ToBeOnBoard":toOnBoardA,
     //"RecruiterId":null,
     "IsActive":'True',
   }
 }
       // var resulPlanBt = PostDataCall(resulPlanBt);
       PostDataCallAsync(dataPlanA, function (postCall) {
           $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsAccount"]').tab("show");
           $(".btnPrevious").show();
           if (!IsRrmSaved) {
               $(".saveFamilyBtn").hide();
               $("a.btnNext").show();
           }
       });
  }   
  }

          if (activeTab == "rrm_skillsplanbTabAccount") {   
  var datecheckplanb=0;
  skillDetailsB= $("#sd_txtEditoraccounts_skillDetailsPlanB").dxHtmlEditor('instance').option("value");

      toOnBoardB = $("#sd_date_rrmaccounts_tobeonboardplanb").dxDateBox('instance').option("value");
  requirtersB=$("#rrm_AccountsplanbAccount").val();
	var varEDate = new Date().toISOString().slice(0,10); //dd-mm-YYYY
	
	if(toOnBoardB <= varEDate) {
		datecheckplanb=1;
swal({
							title: "Warning!",
							text: "Please enter valid Date current and previous date should not be selected",
							icon: "warning",
							button: "ok!",
						})
        $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsAccount"]').tab("show");
}
   if((skillDetailsB==""||toOnBoardB=="")||datecheckplanb==1){
   if(skillDetailsB==""){
    $('#sd_txtEditoraccounts_skillDetailsPlanB').addClass('input-error');
    $('#rrm_skilldetailsplanbAccountError').html("Enter Skill Details");
    } else{
    $('#sd_txtEditoraccounts_skillDetailsPlanB').removeClass('input-error');
     $('#rrm_skilldetailsplanbAccountError').html("");
    }
     if(toOnBoardB==""){
     $('#sd_date_rrmaccounts_tobeonboardplanb').addClass('input-error');
     $('#rrm_tobeonboardplanbAccountError').html("Select Date");
     } else{
     $('#sd_date_rrmaccounts_tobeonboardplanb').removeClass('input-error');
    $('#rrm_tobeonboardplanbAccountError').html("");
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
   "ResourceRequirementSkillPlanId":null,
   "SkillPlan":'PlanB',
   "SkillPlanInfo":skillDetailsB,
   "ToBeOnBoard":toOnBoardB,
   //"RecruiterId":null,
   "IsActive":'True',

   }
 }

       //var resulPlanBt = PostDataCall(dataPlanB);
       PostDataCallAsync(dataPlanB, function (resulPlanBt) {
           $('.nav-tabs a[href="#rrm_CommentsDetailsAccount"]').tab("show");
           $("#rrm_manage_plan_comments_documents_Account").hide();
           $(".btnPrevious").show();
           if (!IsRrmSaved) {
               $(".saveFamilyBtn").show();
               $("a.btnNext").hide();
               //_addRRMEntryPointAccount.getcommentsinrrm();
           }
       });
    }   
  }

}}

//tab previous button functions (rrmentry<-skills<-planA<-planB<-commnets) 
_addRRMEntryPointAccount.toggleTabRRMEntryPrevious = function(){
  
   var activeTab = $('#rrmtab').find('li.active').attr('id')
      if (activeTab == "rrm_skillsplanaTab") 
      {
          $('.nav-tabs a[href="#rrm_SkillDetails"]').tab("show");
          $("a.btnNext").show();
          $(".saveFamilyBtn").hide();
      }
      if (activeTab == "rrm_skillsTab") 
        {
            $('.nav-tabs a[href="#rrm_RequirementDetailsAccount"]').tab("show");
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
            $(".btnPrevious").hide();
            _addRRMEntryPointAccount.updateresourcerequitementdata();
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

        //var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
        callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {
            if (result != null) {
                $("#sd_txtEditoraccounts_skillDetailsPlanA").dxHtmlEditor('instance').option("value",result[0].SkillPlanInfo)
                var edate = result[0].ToBeOnBoard;                
                $("#sd_date_rrmaccounts_tobeonboardplana").dxDateBox('instance').option("value",edate);
                ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
            }
        });
    }
    if (activeTab == "rrm_commentsAccountTab") 
    {

        comments = $("#sd_txtEditoraccounts_skillDetailsPlanB").dxHtmlEditor('instance').option("value");

        if (!IsRrmSaved) {
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
        } else {
            $("a.btnNext").hide();
        }
        $(".btnPrevious").show();
        $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsAccount"]').tab("show");
        var filter_valbtn = JSON.stringify({
          "IsActive":"True",
          "Token":Token,
          "SkillPlans":'PlanB',
          "ResourceRequirementId":ResourceRequirementId
        });
       //   var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
        callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {

            if (result != null) {
              $("#sd_txtEditoraccounts_skillDetailsPlanB").dxHtmlEditor('instance').option("value",result[0].SkillPlanInfo);
                var edate = result[0].ToBeOnBoard;
                $("#sd_date_rrmaccounts_tobeonboardplanb").dxDateBox('instance').option("value",edate)
            }
        });
    }
}

// get rrm detials by id
_addRRMEntryPointAccount.updateresourcerequitementdata = function()
{
   // var getRRMData = callgetlist('GetRRMbyid','{"IsActive":"True","ResourceRequirementId":"'+ResourceRequirementId+'","Token":"'+Token+'"}');
    callGetListAsync('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + ResourceRequirementId + '","Token":"' + Token + '"}', function (getRRMData) {
        _addRRMEntryPointAccount.mapupdateaddrrmListcomputeHTML(getRRMData)
    });
}

//bind rrm data from _addRRMEntryPointAccount.updateresourcerequitementdata function result
_addRRMEntryPointAccount.mapupdateaddrrmListcomputeHTML = function(getRRMData){
    if (getRRMData[0].rrmid=="") 
    {
        //
    }
    else
       {
           var data;
          getRRMData.forEach(function (key, item) {
            $("#sdtxt_rrmaccounts_requirementname").dxTextBox('instance').option('value',key.RequirementName);
            $("#sdtxt_rrmaccounts_requiredfor").dxTextBox('instance').option('value',key.RequiredFor);
              $("#rrm_empidAccount").val(key.RequirementName);
              $("#rrm_entrybdeAccount").val(key.BDEName);
              $("#sdnmb_rrmaccounts_numberofpositions").dxNumberBox('instance').option('value',key.NumberOfPositions);

              $("#sdcmb_rrmaccounts_department").dxSelectBox('instance').option('value',key.DepartmentId);
              $("#rrm_experiencerequired").val(key.ExperiencerequiredInYrs);
              $("#sdtxt_rrmaccounts_location").dxTextBox('instance').option('value',key.Location);
          var edate=key.RequestedDate;
            if(edate!=null)
            {
              var ed = edate;
              $("#sd_date_rrmaccounts_requestedDate").dxDateBox('instance').option('value',ed);
            }
          $("#rrm_requirementlead").val(key.LeadName);
         
          });
        }
}

//rrmFormVAlidation
_addRRMEntryPointAccount.rrmValidation = function(){
    if ($("#sdtxt_rrmaccounts_requirementname").dxTextBox('instance').option('value') == "") {
        $("#rrm_requirementnameAccountError").html("Please Enter Name");
    }
    if ($("#sdtxt_rrmaccounts_requiredfor").dxTextBox('instance').option('value') == "") {
        $("#rrm_requiredforAccountError").html("Please Enter RequiredFor");
    }
    if ($("#sdnmb_rrmaccounts_numberofpositions").dxNumberBox('instance').option('value') == "") {
        $("#rrm_numberofpositionsAccountError").html("Please Enter No. Of Positions");
    }
    if ($("#sdcmb_rrmaccounts_department").dxSelectBox('instance').option('value') == "") {
        $("#rrm_departmentAccountError").html("Please Select Department");
    }
    if ($("#rrm_experiencerequired").val() == "") {
        $("#rrm_experiencerequiredError").html("Please Enter Experience");
    }
    if ($("#sdcmb_rrmaccounts_communication").dxSelectBox('instance').option('value') == "") {
        $("#rrm_communicationAccountError").html("Please Select Communication");
    }
    if ($("#rrmfamily").val() == "") {
        $("#rrmfamilyError").html("Please Select Family");
    }
    if ($("#rrmskill").val() == "") {
        $("#rrmskillError").html("Please Select Skill");
    }
    if ($("#sd_txtEditoraccounts_skillDetailsPlanA").dxHtmlEditor('instance').option("value") == "") {
        $("#rrm_skilldetailsplanaAccountError").html("Please Enter Skill Details (Plan A)");
    }
    if ($("#sd_txtEditoraccounts_skillDetailsPlanB").dxHtmlEditor('instance').option("value") == "") {
        $("#rrm_skilldetailsplanbAccountError").html("Please Enter Skill Details (Plan B)");
    }
    if ($("#sd_date_rrmaccounts_tobeonboardplana").dxDateBox('instance').option("value") == "") {
        $("#rrm_tobeonboardplanaAccountError").html("Please Select To on Board");
    }
    if ($("#sd_date_rrmaccounts_tobeonboardplanb").dxDateBox('instance').option("value") == "") {
        $("#rrm_tobeonboardplanbAccountError").html("Please Select To on Board");
    }
}

//reset skill data 
_addRRMEntryPointAccount.skillsClearAndShow = function(){ // Clear our fields

    $("#familyentry").val("");
    $("#skillentry").val("");
    $("#skillversionentry").val("");
   
}

//get skill version details 
_addRRMEntryPointAccount.get_versionsentry = function(skillentry_id){
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
_addRRMEntryPointAccount.get_skillsentry = function(familyentry_id){
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
        _addRRMEntryPointAccount.get_versionsentry("");
    });
}

  //show skill in skill table
  _addRRMEntryPointAccount.getSkillsDetails = function(){
    
    var filterData = JSON.stringify({
      "ResourceRequirementId": ResourceRequirementId,
      "IsActive": "True",
      "Token": Token
  });        

  callGetListAsync('GetResourceRequrirementSkill', filterData, function (e) {
      GetSkillList = e;

      $("#sdgd-rrmAccountSkills").dxDataGrid({
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
            _addRRMEntryPointAccount.insert_SkillInfoEntry(e);
          },
          onRowUpdated: function (e) {
            _addRRMEntryPointAccount.update_SkillInfoEntry(e);
          },
          onRowRemoved: function (e) {
            _addRRMEntryPointAccount.delete_SkillInfoEntry(e);
          }
      });
  })
  }

  //insert skill details 
  _addRRMEntryPointAccount.insert_SkillInfoEntry = function (e) {
        
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
          _addRRMEntryPointAccount.skillsClearAndShow();
          _addRRMEntryPointAccount.getSkillsDetails();
        }
    });
}

_addRRMEntryPointAccount.update_SkillInfoEntry = function (e) {
    
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
          _addRRMEntryPointAccount.skillsClearAndShow();
          _addRRMEntryPointAccount.getSkillsDetails();
        }
    });       

}

_addRRMEntryPointAccount.delete_SkillInfoEntry = function (e) {
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
          _addRRMEntryPointAccount.skillsClearAndShow();
          _addRRMEntryPointAccount.getSkillsDetails();
        }                    
    });   
}
  
  //reset form data
  _addRRMEntryPointAccount.clearAll_addrrmdata = function(){
    
    $("#sdtxt_rrmaccounts_requirementname").dxTextBox('instance').option('value',"");
    $("#sdtxt_rrmaccounts_requiredfor").dxTextBox('instance').option('value',"");
            $("#rrm_empidAccount").val("");
            $("#rrm_entrybdeAccount").val("");
            $("#sdnmb_rrmaccounts_numberofpositions").dxNumberBox('instance').option('value',"");
            
            $("#sdcmb_rrmaccounts_department").dxSelectBox('instance').option('value',"");
            $("#sdcmb_rrmaccounts_designation").dxSelectBox('instance').option('value',"");
            $("#rrm_experiencerequired").val("");
            $("#sdtxt_rrmaccounts_location").dxTextBox('instance').option('value',"");
            var date = new Date();
            var currentDate = date.toISOString().slice(0, 10);
            $("#sd_date_rrmaccounts_requestedDate").dxDateBox('instance').option('value',currentDate);
            $("#rrm_requirementlead").val("");
            var tdydate = new Date();
            tdydate.setDate(tdydate.getDate() + 1);
            var nxtDate = tdydate.toISOString().slice(0, 10);
            $("#sd_date_rrmaccounts_tobeonboardplana").dxDateBox('instance').option("value",nxtDate);
            $("#sd_date_rrmaccounts_tobeonboardplanb").dxDateBox('instance').option("value",nxtDate);
            skillsClearAndShow();            

  }

  mapUI();
  return _addRRMEntryPointAccount;
});

