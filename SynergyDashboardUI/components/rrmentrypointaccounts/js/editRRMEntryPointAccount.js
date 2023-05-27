EditRRMEntryPointAccount = (function () {
var _editRRMEntryPointAccount = {};

var dataResource = [];
var dataPlanB = [];
var dataComments = [];
var ResourceRequrimentId;
var dataSkillApi = [];
var IsRrmSaved = false;
var RRMID;
var ResourceRequirementId;
var ResourceRequirementSkillPlanId=null;

var enddateChangedplanA;
var hrComments;
var ResourceRequirementSkillPlanAId;
var ResourceRequirementSkillPlanBId;
    var OnHoldByOwnerStatusAccount = false;
    var OnHoldByClientStatusAccount = false;

var IsOwnerForSkill = false;

_editRRMEntryPointAccount.initializeRRMByTechnical = function (rrmid) {

}

//tab next btn events
_editRRMEntryPointAccount.toggleTabRRMEntry = function() { 

    var activeTab = $('#rrmtabAccount').find('li.active').attr('id')
        
    if (activeTab == "rrm_requirementTabAccount")
     {
            requirmentName = $("#sdtxt_rrmaccounts_requirementname").dxTextBox('instance').option('value');
            requireFor =$("#sdtxt_rrmaccounts_requiredfor").dxTextBox('instance').option('value');
            bde = $("#rrm_entrybdeAccount").val();
            if(bde==""){bde=null;}
            replacementFor = $("#rrm_replacementAccount").val();
            position = $("#sdnmb_rrmaccounts_numberofpositions").dxNumberBox('instance').option('value');
            priority = $("#sdcmb_rrmaccounts_priority").dxSelectBox('instance').option('value');
            department = $("#sdcmb_rrmaccounts_department").dxSelectBox('instance').option('value');
            designation = $("#sdcmb_rrmaccounts_designation").dxSelectBox('instance').option('value');
            experience = $("#sdnmb_rrmaccounts_experiencerequired").dxNumberBox('instance').option('value');
            communication = $("#sdcmb_rrmaccounts_communication").dxSelectBox('instance').option('value');
            reqlocation = $("#sdtxt_rrmaccounts_location").dxTextBox('instance').option('value');
            requestedDate = $("#sd_date_rrmaccounts_requestedDate").dxDateBox('instance').option('value');
            losingRevenue = $("#sdchk_rrmaccounts_losingRevenue").dxCheckBox('instance').option('value');
            fromVIP = $("#sdchk_rrmaccounts_fromVIP").dxCheckBox('instance').option('value');
            requirmentLead = $("#sdtxt_rrmaccounts_requirementlead").dxTextBox('instance').option('value');

            if(reqlocation==""){reqlocation=null;}
            var finalRequestedDate = moment(requestedDate).format("DD-MM-YYYY");
            
            if(requirmentName == "" || requireFor==""||position==""||position=="0"||department==""||designation==""||experience==""||experience=="0")
            {
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
                            $('#sdnmb_rrmaccounts_experiencerequired').addClass('input-error');
                            $('#rrm_experiencerequiredAccountError').html("Select Experience");
                        }
                        else
                        {
                            $('#sdnmb_rrmaccounts_experiencerequired').removeClass('input-error');
                            $('#rrm_experiencerequiredAccountError').html("");
                        }
                    }
                    if(experience=="0")
                    {
                        if(experience=="0")
                        {
                            $('#sdnmb_rrmaccounts_experiencerequired').addClass('input-error');
                            $('#rrm_experiencerequiredAccountError').html("Min Experience is 1");
                    }
                    else
                    {
                        $('#sdnmb_rrmaccounts_experiencerequired').removeClass('input-error');
                        $('#rrm_experiencerequiredAccountError').html("");
                    }
                }
            }
            
            $('.nav-tabs a[href="#rrm_requirementTabAccount"]').tab("show");
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
                        "RequestForProposalId": null,
                        "BDEId":bde, 
                        //"EmployeeId": EmployeeId,
                        "ResignedEmployeeId": EmployeeId,
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
                        "LeadId":BackupLeadId, 
                        "IsActive": 'True',  
                       
                    }
    
                }
                
                // var resultResorce = PostDataCall(dataResource); 
                PostDataCallAsync(dataResource, function (resultResorce) {
                    $('.nav-tabs a[href="#rrm_SkillDetailsAccount"]').tab("show");
                    $(".btnPrevious").show();
                    if (!IsRrmSaved) {
                        $(".saveFamilyBtn").hide();
                        $("a.btnNext").show();

                    }
                    // getSkillsDetails('"+RRMID+"');
                    // getSkillsDetailseditfrm(RRMID);
                    _editRRMEntryPointAccount.getSkillsDetails(RRMID);
                });
                // getSkillsDetails('"+RRMID+"');
                // getSkillsDetailseditfrm(RRMID);
               // _editRRMEntryPointAccount.getSkillsDetails(RRMID);
          }
}
        
    if (activeTab == "rrm_skillsTabAccount") 
        {

            var data = $("#sdgd-rrmAccountSkills").dxDataGrid("instance").option("dataSource");

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
                 $('.nav-tabs a[href="#rrm_SkillsPlanADetailsAccount"]').tab("show");
                 $("#sd_txtEditoraccounts_skillDetailsPlanA").dxHtmlEditor('instance').option("value",planAcomments);
                
               
                  $(".btnPrevious").show();
                  if (!IsRrmSaved) 
                  {
                      $(".saveFamilyBtn").hide();
                      $("a.btnNext").show();
                  }
            }
        }
    
    if (activeTab == "rrm_skillsplanaTabAccount") 
    {
        skillDetailsA = $("#sd_txtEditoraccounts_skillDetailsPlanA").dxHtmlEditor('instance').option("value");
        $("#sd_txtEditoraccounts_skillDetailsPlanA").dxHtmlEditor('instance').option("value",planAcomments);
            var datecheck=0;
            toOnBoardA = $("#sd_date_rrmaccounts_tobeonboardplana").dxDateBox('instance').option("value");;
            requirtersA =$("#rrm_AccountsplanaAccount").val();
        var edate = $("#sd_date_rrmaccounts_tobeonboardplana").dxDateBox('instance').option("value");;
        
            var varEDate = new Date().toISOString().slice(0,10); //dd-mm-YYYY
                if(edate <= varEDate) 
                {
                datecheck=1;
                swal({
                                        title: "Warning!",
                                        text: "Please enter valid Date current and previous date should not be selected",
                                        icon: "warning",
                                         button: "ok!",
                    })
                }
            if((skillDetailsA==""||toOnBoardA=="") || datecheck==1)
            {
        
                if(skillDetailsA==""){
                  $('#rrm_skilldetailsplanaAccountn').addClass('input-error');
                  $('#rrm_skilldetailsplanaAccountError').html("Enter Skill Details");
                } else{
                  $('#rrm_skilldetailsplanaAccountn').removeClass('input-error');
                  $('#rrm_skilldetailsplanaAccountError').html("");
                }
                if(toOnBoardA==""){
                    $('#sd_date_rrmaccounts_tobeonboardplana').addClass('input-error');
                  $('#rrm_tobeonboardplanaError').html("Select Date");
                } else{
                    $('#sd_date_rrmaccounts_tobeonboardplana').removeClass('input-error');
                    $('#rrm_tobeonboardplanaAccountError').html("");
                }
                $('.nav-tabs a[href="#rrm_skillsplanaTabAccount"]').tab("show");
                
                $(".btnPrevious").show();
                if (!IsRrmSaved) 
                {
                  $(".saveFamilyBtn").hide();
                  $("a.btnNext").show();
                } 
            }
            else 
            {
                dataPlanA_frmrrm = {
                    "Method": "PostResourceRequrimentSkillPlans",
                    "Data": {
                        "Token": Token,
                        "ResourceRequirementId": null,
                        "ResourceRequirementSkillPlanId": ResourceRequirementSkillPlanAId,
                        "SkillPlan": 'PlanA',
                        "SkillPlanInfo": skillDetailsA,
                        "ToBeOnBoard": toOnBoardA,
                        "IsActive": 'True'
                    }
                }

                //var resulPlanBt = PostDataCall(dataPlanA_frmrrm);
                PostDataCallAsync(dataPlanA_frmrrm, function (resulPlanBt) {
                    $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsAccount"]').tab("show");
                    $("#sd_txtEditoraccounts_skillDetailsPlanB").dxHtmlEditor('instance').option("value",planBcomments);

                    $(".btnPrevious").show();
                    if (!IsRrmSaved) {
                        $(".saveFamilyBtn").hide();
                        $("a.btnNext").show();
                    }
                });
            }
        }
    
    if (activeTab == "rrm_skillsplanbTabAccount") {
            var datecheck=0;
            skillDetailsB = $("#sd_txtEditoraccounts_skillDetailsPlanB").dxHtmlEditor('instance').option("value");
            toOnBoardB = $("#sd_date_rrmaccounts_tobeonboardplanb").dxDateBox('instance').option("value");
            requirtersB =$("#rrm_AccountsplanbAccount").val();
            var edate = $("#sd_date_rrmaccounts_tobeonboardplanb").dxDateBox('instance').option("value");
            var varEDate = new Date().toISOString().slice(0,10); //dd-mm-YYYY
            if(edate <= varEDate) {
             datecheck=1;
                swal({
                                        title: "Warning!",
                                        text: "Please enter valid Date current and previous date should not be selected",
                                        icon: "warning",
                                         button: "ok!",
                    })
                 }
            if((skillDetailsB==""||toOnBoardA=="") || datecheck==1){
        
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
                $('.nav-tabs a[href="#rrm_skillsplanbTabAccount"]').tab("show");

                $(".btnPrevious").show();
                if (!IsRrmSaved) {
                  $(".saveFamilyBtn").hide();
                  $("a.btnNext").show();
                } 
            } else {
                dataPlanB={
                    "Method":"PostResourceRequrimentSkillPlans",
                    "Data": {
                        "Token": Token,
                        "ResourceRequirementId": null,
                        "ResourceRequirementSkillPlanId": ResourceRequirementSkillPlanBId,
                        "SkillPlan": 'PlanB',
                        "SkillPlanInfo": skillDetailsB,
                        "ToBeOnBoard": toOnBoardB,
                        ////"RecruiterId": requirtersB,
                        "IsActive": 'True'
                    }
                  }
                  
                //var resulPlanBt = PostDataCall(dataPlanB);
                PostDataCallAsync(dataPlanB, function (resulPlanBt) {
                    $('.nav-tabs a[href="#rrm_CommentsDetailsAccount"]').tab("show");
                    $(".btnPrevious").show();
                    if (!IsRrmSaved) {
                        $(".saveFamilyBtn").show();
                        $("a.btnNext").hide();
                        _editRRMEntryPointAccount.getManageCommentHistory(ResourceRequirementId);
                    }
                });
            }
        }
    
    }

 _editRRMEntryPointAccount.btnsendreminder = function (ResourceRequirementId) {
        
        var Comments = "Please assign a Accounts for this RRM "
        dataComments_fromrrm = {
            "Method": "PostCommentsInResourceRequirement",
            "Data": {
                "ResourceRequirementId": ResourceRequirementId,
                "Comments": Comments,
                "IsActive": 'True',

            }
        }
     //var resultComments = PostDataCall(dataComments_fromrrm);
     PostDataCallAsync(dataComments_fromrrm, function (resultComments) {
         //
     });
     _editRRMEntryPointAccount.getManageCommentHistory(ResourceRequirementId);
    }

//bind getrrmbyid values in form
_editRRMEntryPointAccount.RRMEntryFromRRM = function (rrmid) {
 
    RRMID=rrmid;
    ResourceRequirementId=rrmid;
    //var getRRMData = callgetlist('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + rrmid + '","Token":"' + Token + '"}');
    callGetListAsync('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + rrmid + '","Token":"' + Token + '"}', function (getRRMData) {
        _editRRMEntryPointAccount.mapupdaterrmListcomputeHTML(getRRMData);

    })
    
}

//clear form data
_editRRMEntryPointAccount.clearAll = function(){
            $("#rrmnoAccount").text("");
            $("#sdtxt_rrmaccounts_requirementname").dxTextBox('instance').option('value',"");
            $("#sdtxt_rrmaccounts_requiredfor").dxTextBox('instance').option('value',"");
            $("#rrm_empidAccount").val("");
            $("#rrm_entrybdeAccount").val("");
            $("#sdnmb_rrmaccounts_numberofpositions").dxNumberBox('instance').option('value',"");

            $("#sdcmb_rrmaccounts_department").dxSelectBox('instance').option('value',"");
            $("#sdcmb_rrmaccounts_designation").dxSelectBox('instance').option('value',"");
            $("#sdnmb_rrmaccounts_experiencerequired").dxNumberBox('instance').option('value',"");
            $("#sdtxt_rrmaccounts_location").dxTextBox('instance').option('value',"");
            var date = new Date();
            var currentDate = date.toISOString().slice(0, 10);
            $("#sd_date_rrmaccounts_requestedDate").dxDateBox('instance').option('value',currentDate);
            $("#sdtxt_rrmaccounts_requirementlead").dxTextBox('instance').option('value',"");
            var tdydate = new Date();
            tdydate.setDate(tdydate.getDate() + 1);
            var nxtDate = tdydate.toISOString().slice(0, 10);
            $("#sd_date_rrmaccounts_tobeonboardplana").dxDateBox('instance').option("value",nxtDate);
            $("#sd_date_rrmaccounts_tobeonboardplanb").dxDateBox('instance').option("value",nxtDate);
            
            $("#sd_txtEditor_RRMAccounts").dxHtmlEditor('instance').option("value","");
            $("#sd_txtEditoraccounts_skillDetailsPlanA").dxHtmlEditor('instance').option("value","");
            $("#sd_txtEditoraccounts_skillDetailsPlanB").dxHtmlEditor('instance').option("value","");
}

//map update rrm List compute HTML
_editRRMEntryPointAccount.mapupdaterrmListcomputeHTML = function(getRRMData) {
        
    if (getRRMData[0].rrmid=="")
     {

     }
     else 
     {
        var data;
        var EmployeeId = null;
        getRRMData.forEach(function (key, item) {
            OnHoldByOwnerStatusAccount = key.OnHoldByOwner;
            OnHoldByClientStatusAccount = key.OnHoldByClient;
            if (OnHoldByClientStatusAccount == true || OnHoldByOwnerStatusAccount == true) {
                readOnlyFormDataAccount();
                $("#OwnerrrmHoldStatusAccount").html("On-Hold").addClass("label label-warning m-l-xs");
                if (OnHoldByOwnerStatusAccount == true) {
                    $("#switchLeadAccount").dxSwitch({
                        value: true,
                        disabled: true
                    });
                }
                if (OnHoldByClientStatusAccount == true) {
                    $("#switchClientAccount").dxSwitch({
                        value: true,
                        disabled: true
                    });
                }
            }
            else {
                $("#OwnerrrmHoldStatusAccount").attr('class', '');
                $("#OwnerrrmHoldStatusAccount").html('');
                $("#switchLeadAccount").dxSwitch({
                    value: false,
                    disabled: false
                });
                $("#switchLeadAccount").dxSwitch({
                    value: false,
                    disabled: false
                });
            }
               $("#rrmmodelpagetitleAccount").text("Edit RRM - "+key.RRMNo);
               $("#sdtxt_rrmaccounts_requirementname").dxTextBox('instance').option('value',key.RequirementName);
               $("#sdtxt_rrmaccounts_requiredfor").dxTextBox('instance').option('value',key.RequiredFor);
                $("#rrm_empidAccount").val(key.EmployeeId);
                $("#sdcmb_rrmaccounts_priority").dxSelectBox('instance').option('value',key.PriorityId);
               if(key.BDEName != " ")
               {
                   $("#rrm_entrybdeAccount").val(key.BDEName);
               }
               else
               {
                   $("#rrm_entrybdeAccount").val('');
               }
               $("#sdnmb_rrmaccounts_numberofpositions").dxNumberBox('instance').option('value',key.NumberOfPositions);
               $("#sdcmb_rrmaccounts_communication").dxSelectBox('instance').option('value',key.Communication);
                $("#sdcmb_rrmaccounts_department").dxSelectBox('instance').option('value',key.DepartmentId);
                $("#sdcmb_rrmaccounts_designation").dxSelectBox('instance').option('value',key.DesignationId);
                $("#sdnmb_rrmaccounts_experiencerequired").dxNumberBox('instance').option('value',key.ExperiencerequiredInYrs);
                $("#sdtxt_rrmaccounts_location").dxTextBox('instance').option('value',key.Location);
                var edate=key.RequestedDate;
                if(edate!=null){
                    var ed = edate;
                    $("#sd_date_rrmaccounts_requestedDate").dxDateBox('instance').option('value',ed);

                }

               if (ResourceRequirementTypeAccounts == "G") {
                    $("#sdtxt_rrmaccounts_requirementlead").dxTextBox('instance').option('value',key.Owner);
               }
               else if (ResourceRequirementTypeAccounts == "P") {
                    $("#sdtxt_rrmaccounts_requirementlead").dxTextBox('instance').option('value',key.Owner);
               }
               else if (ResourceRequirementTypeAccounts == "R") {
                    $("#sdtxt_rrmaccounts_requirementlead").dxTextBox('instance').option('value',key.LeadName);
               }




               $("#sdnmb_rrmaccounts_numberofpositions").dxNumberBox('instance').option('value',getRRMData[0].NumberOfPositions);
                planAcomments=key['PlanA-SkillPlanInfo'];
                planBcomments=key['PlanB-SkillPlanInfo'];
                hrComments=key.Comments;
                var edate=key['PlanA-OnBoardDate'];
                if(edate!=null)
                {
                    var ed = edate;
                    $("#sd_date_rrmaccounts_tobeonboardplana").dxDateBox('instance').option("value",ed);
                }
                var edate=key['PlanB-OnBoardDate'];
                if(edate!=null)
                {
                var ed = edate;
                $("#sd_date_rrmaccounts_tobeonboardplanb").dxDateBox('instance').option("value",ed);
                }

                if(key.OwnerId == localStorage.getItem("EmployeeID")){
                    IsOwnerForSkill = true;
                }
                else{
                    IsOwnerForSkill = false;
                }
            
            }); 
    }

    _editRRMEntryPointAccount.getResourceRequirementSkillPlanAId();
    _editRRMEntryPointAccount.getResourceRequirementSkillPlanBId();

    }

    //To get Resource RequirementSkill PlanB Id
    _editRRMEntryPointAccount.getResourceRequirementSkillPlanAId = function () {
        var dataResourceGetSkillId = JSON.stringify({
            "Token": Token,
            "ResourceRequirementId": ResourceRequirementId,
            "SkillPlans": "PlanA",
            "IsActive": "True"
        });

        //var result = callgetlist('GetResourceRequrimentSkillPlans', dataResourceGetSkillId);
        callGetListAsync('GetResourceRequrimentSkillPlans', dataResourceGetSkillId, function (result) {
            if (result != null || result != "") {
                ResourceRequirementSkillPlanAId = result[0].ResourceRequirementSkillPlanId;
            }
        })
    }
    //To get Resource RequirementSkill PlanB Id
    _editRRMEntryPointAccount.getResourceRequirementSkillPlanBId = function () {
        var dataResourceGetSkillId = JSON.stringify({
            "Token": Token,
            "ResourceRequirementId": ResourceRequirementId,
            "SkillPlans": "PlanB",
            "IsActive": "True"
        });

       // var result = callgetlist('GetResourceRequrimentSkillPlans', dataResourceGetSkillId);
        callGetListAsync('GetResourceRequrimentSkillPlans', dataResourceGetSkillId, function (result) {
            if (result != null || result != "") {
                ResourceRequirementSkillPlanBId = result[0].ResourceRequirementSkillPlanId;
            }
        });
        
    }

//investicate & delete

////skill mapping
//_editRRMEntryPointAccount.skillcomputeHTML = function(e) {   
//       var html = "";
//       if (e == null || e=="") {
//           html = "<table id='myTable' class='skillemptytbl myTable_rrm Account'>";
//           html += "<tr>";
//           html += "<th>Family</th>"
//           html += "<th>Skills</th>"
//           html += "<th>Version</th>"
//           html += "<th>Action</th>"
//           html += "</tr>";  
//          html += "<tr><td colspan='4'>No Data..!</td></tr>";
        
//     } else {
//           var html = "<table id='myTable' class='myTable_rrm Account'>";
//           html += "<tr>";
//           html += "<th>Family</th>"
//           html += "<th>Skills</th>"
//           html += "<th>Version</th>"
//           html += "<th>Action</th>"
//           html += "</tr>";        
//           e.forEach(function (key, item) {
//             var skillId = key.ResourceRequirementSkillId;
//             html += "<tr class='row_" + item + "' id='row_" + skillId + "'>";
//             html += "<td><input type='hidden' class='family' value='" + key.SkillFamily + "'> " + key.SkillFamily + "</td>"
//             html += "<td><input type='hidden' class='skill_type' value='" + key.Skill + "'>" + key.Skill + "</td>"
//             html += "<td><input type='hidden' class='version' value='" + key.SkillVersion + "'>" + key.SkillVersion + "</td>"
//               html += "<td><button class='btn edit-btn editskillAccount' data-rrmskillid=" + ResourceRequirementSkillId + "><i class='fas fa-pencil-alt'></i></button>"
//               html += "<button class='btn delete-btn deleteskillAccount' data-rrmskillid=" + ResourceRequirementSkillId + "><i class='fas fa-trash-alt'></i></button></td>"
//             html += "</tr>";
//         }); 
      
//       }
//        return html;
//} 

//tab previous btn evenet
_editRRMEntryPointAccount.toggleTabRRMEntryPrevious = function() {
    
    var activeTab = $('#rrmtabAccount').find('li.active').attr('id')

    if (activeTab == "rrm_skillsplanaTabAccount") 
    {
        $('.nav-tabs a[href="#rrm_SkillDetailsAccount"]').tab("show");
        $("a.btnNext").show();
        $(".saveFamilyBtn").hide();
    }
    
    if (activeTab == "rrm_skillsTabAccount") 
    {
        $('.nav-tabs a[href="#rrm_RequirementDetailsAccount"]').tab("show");
        $("a.btnNext").show();
        $(".saveFamilyBtn").hide();
        $(".btnPrevious").hide();
        _editRRMEntryPointAccount.updateresourcerequitementdata();
    }

    if (activeTab == "rrm_skillsplanbTabAccount") 
    {
        $('.nav-tabs a[href="#rrm_SkillsPlanADetailsAccount"]').tab("show");
        $("a.btnNext").show();
        $(".btnPrevious").show();
        $(".saveFamilyBtn").hide();
        
        var filter_valbtn = JSON.stringify({
        "IsActive": 'True',
			"Token":Token,
			"ResourceRequirementId":ResourceRequirementId,
            "SkillPlan":'PlanA'
        });
    
        //var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
        callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {
            if (result != null) {
                $("#sd_txtEditoraccounts_skillDetailsPlanB").dxHtmlEditor('instance').option("value",result[0].SkillPlanInfo);
                var edate = result[0].ToBeOnBoard;                

                $("#sd_date_rrmaccounts_tobeonboardplana").dxDateBox('instance').option("value",edate);
                ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
            }
        });
        
    }

    if (activeTab == "rrm_commentsAccountTabAccount") 
    {

        comments = $("#sd_txtEditoraccounts_skillDetailsPlanB").dxHtmlEditor('instance').option("value");

        if (!IsRrmSaved) 
        {
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
        }
        else
        {
            $("a.btnNext").hide();
        }
        
        $(".btnPrevious").show();
        $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsAccount"]').tab("show");
        
        var filter_valbtn = JSON.stringify({
            "IsActive": 'True',
          "Token":Token,
          "SkillPlans":'PlanB',
          "ResourceRequirementId":ResourceRequirementId
        });
        
        //var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
        callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {
            if (result != null) {
                $("#sd_txtEditoraccounts_skillDetailsPlanB").dxHtmlEditor('instance').option("value",result[0].SkillPlanInfo);
                var edate = result[0].ToBeOnBoard;
                $("#sd_date_rrmaccounts_tobeonboardplanb").dxDateBox('instance').option("value",edate);
                ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
            }
        });
       
    }
}

// get rrm detials by id
_editRRMEntryPointAccount.updateresourcerequitementdata = function(){
    //var getRRMData = callgetlist('GetRRMbyid','{"IsActive":"True","ResourceRequirementId":"'+ResourceRequirementId+'","Token":"'+Token+'"}');

    callGetListAsync('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + ResourceRequirementId + '","Token":"' + Token + '"}', function (getRRMData) {
        _editRRMEntryPointAccount.mapupdateaddrrmListcomputeHTML(getRRMData);
    })
}
  
  //bind rrm data from _addRRMEntryPoint.updateresourcerequitementdata function result
 _editRRMEntryPointAccount.mapupdateaddrrmListcomputeHTML = function(getRRMData){
  
         if (getRRMData[0].rrmid=="") {
  
        } else {
        var data;
            getRRMData.forEach(function (key, item) {
                $("#sdtxt_rrmaccounts_requirementname").dxTextBox('instance').option('value',key.RequirementName);
                $("#sdtxt_rrmaccounts_requiredfor").dxTextBox('instance').option('value',key.RequiredFor);
            $("#rrm_empidAccount").val(key.RequirementName);
            $("#rrm_entrybdeAccount").val(key.BDEName);
            $("#sdnmb_rrmaccounts_numberofpositions").dxNumberBox('instance').option('value',key.NumberOfPositions);
            
            $("#sdcmb_rrmaccounts_department").dxSelectBox('instance').option('value',key.DepartmentId);
            $("#sdnmb_rrmaccounts_experiencerequired").dxNumberBox('instance').option('value',key.ExperiencerequiredInYrs);
            $("#sdtxt_rrmaccounts_location").dxTextBox('instance').option('value',key.Location);
            var edate=key.RequestedDate;
            if(edate!=null){
            var ed = edate;
            $("#sd_date_rrmaccounts_requestedDate").dxDateBox('instance').option('value',ed);
            }
            $("#sdtxt_rrmaccounts_requirementlead").dxTextBox('instance').option('value',key.Owner);
           
            });
        }
}

//save hr commnets
    _editRRMEntryPointAccount.saveComments = function () {
        var finalComments = $("#sd_txtEditor_RRMAccounts").dxHtmlEditor('instance').option("value");
        if (finalComments != "") {
            dataComments = {
                "Method": "PostCommentsInResourceRequirement",
                "Data": {
                    "ResourceRequirementId": ResourceRequirementId,
                    "Comments": finalComments,
                    "IsActive": 'True',
                }
        }
            //var resultComments = PostDataCall(dataComments);
            PostDataCallAsync(dataComments, function (resultComments) {
                swal({
                    title: "Success!",
                    text: "Saved Successfully!",
                    icon: "success",
                    button: "ok!",
                })
            });
    }
        $('#RRMEntryPointModelAccount').modal("hide");
    ResourceRequirementId=null;
        var rrmEntryGrid = RRMEntryPointGridOwner("Accounts");
    rrmEntryGrid.getRRMEntryTable();
        _editRRMEntryPointAccount.clearAll();
        $('#rrm_SkillsPlanADetailsAccount').modal("hide");
}

//get skill details
_editRRMEntryPointAccount.getSkillsDetails = function(ResourceRequrimentId) {
    
    var filterData = JSON.stringify({
        "ResourceRequirementId": ResourceRequrimentId,
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
                allowUpdating: IsOwnerForSkill,
                allowDeleting: IsOwnerForSkill,
                allowAdding: IsOwnerForSkill
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
                _editRRMEntryPointAccount.insert_SkillInfoEntry(e);
            },
            onRowUpdated: function (e) {
                _editRRMEntryPointAccount.update_SkillInfoEntry(e);
            },
            onRowRemoved: function (e) {
                _editRRMEntryPointAccount.delete_SkillInfoEntry(e);
            }
        });
    });
}

//insert skill entry
_editRRMEntryPointAccount.insert_SkillInfoEntry = function (e) {
        
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
            _editRRMEntryPointAccount.skillsClearAndShow();
            _editRRMEntryPointAccount.getSkillsDetails(RRMID);
        }
    });
}

_editRRMEntryPointAccount.update_SkillInfoEntry = function (e) {
    
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
            _editRRMEntryPointAccount.skillsClearAndShow();
            _editRRMEntryPointAccount.getSkillsDetails(RRMID);
        }
    });       

}

_editRRMEntryPointAccount.delete_SkillInfoEntry = function (e) {
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
            _editRRMEntryPointAccount.skillsClearAndShow();
            _editRRMEntryPointAccount.getSkillsDetails(RRMID);
        }                    
    });   
}


//get Manage Comment History
_editRRMEntryPointAccount.getManageCommentHistory = function(ResourceRequirementId) {
    
    var filter_val = JSON.stringify({
      "ResourceRequirementId": ResourceRequirementId,
      "IsActive": 'True',
      "Token":Token
    });
    //var getManageplanComments = callgetlist("GetCommentsInResourceRequirement", filter_val);
    callGetListAsync('GetCommentsInResourceRequirement', filter_val, function (getManageplanComments) {
        var plan_comment_history_html = "";
        var plan_no_comments_count = 0;
        var plan_no_documentsCount = 0;
        getManageplanComments.forEach(function (item) {
            var plan_created_date = new Date(item.CreatedDate);
            var plan_date_month_year = plan_created_date.toLocaleDateString();
            var plan_time = plan_created_date.toLocaleTimeString();
            if(item.CreatedBy != localStorage.getItem("EmployeeID")){
                plan_comment_history_html += "<div style='width:100%;display:flow-root'><div class='message dx-theme-background-color'>"
                plan_comment_history_html += "<div class='name'>"+item.CreatedByName+"</div>"
                plan_comment_history_html += "<div class='date'>"+ plan_date_month_year+" " + plan_time +"</div>"
                plan_comment_history_html += "<div class='text'>"+item.Comments+"</div></div></div>";
            }
            else{
                plan_comment_history_html += "<div style='width:100%;display:flow-root'><div class='message dx-theme-background-color' style='float:right;background-color:rgb(225, 247, 223) !important'>"
                plan_comment_history_html += "<div class='date'>"+ plan_date_month_year+" " + plan_time +"</div>"
                plan_comment_history_html += "<div class='text'>"+item.Comments+"</div></div></div>";
            }
        });
        $("#rrm_manage_plan_comments_documents_Account").html(plan_comment_history_html);
        var div = document.getElementById('rrm_manage_plan_comments_documents_Account');
        div.scrollTop = div.scrollHeight - div.clientHeight;
    });
}

//skill data clear func
_editRRMEntryPointAccount.skillsClearAndShow = function() { // Clear our fields

    $("skillentry").value = "";
    $("skillversionentryAccount").value = "";

    // document.getElementById("skillentry").value = "";
    // document.getElementById("skillversionentryAccount").value = "";

    // document.getElementById("skillentry").value = "";
    // document.getElementById("skillversionentryAccount").value = "";

    // document.getElementById("familyentry_fromrfp").value = "";
    // document.getElementById("skillentry_fromrfp").value = "";
    // document.getElementById("skillversionentryAccount_fromrfp").value = "";

    // document.getElementById("familyentry_fromresign").value = "";
    // document.getElementById("skillentry_fromresign").value = "";
    // document.getElementById("skillversionentryAccount_fromresign").value = "";
}

//get versions entry
_editRRMEntryPointAccount.get_versionsentry = function(skillentry_id) {
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
        $("#skillversionentryAccount").html(options);
    });
}

//get skill entry
_editRRMEntryPointAccount.get_skillsentry = function(familyentry_id) {
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
        get_versionsentry("");
    });
}

return _editRRMEntryPointAccount;

});