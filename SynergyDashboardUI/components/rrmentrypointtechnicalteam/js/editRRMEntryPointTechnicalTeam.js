EditRRMEntryPointOwnerTechnicalTeam = (function () {
var _editRRMEntryPointTechnicalTeam = {};

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
var OnHoldByOwnerStatusTechnicaTeam = false;
var OnHoldByClientStatusTechnicaTeam = false;

var IsOwnerForSkill = false;
_editRRMEntryPointTechnicalTeam.initializeRRMByTechnical = function (rrmid) {

}

//tab next btn events
_editRRMEntryPointTechnicalTeam.toggleTabRRMEntry = function() {

    var activeTab = $('#rrmtabTechnicalTeam').find('li.active').attr('id')
        
    if (activeTab == "rrm_requirementTabTechnicalTeam")
     {
            requirmentName = $("#sdtxt_rrmtechnical_requirementname").dxTextBox('instance').option('value');
            requireFor =$("#sdtxt_rrmtechnical_requiredfor").dxTextBox('instance').option('value');
            bde = $("#rrm_entrybdeTechnicalTeam").val();
            if(bde==""){bde=null;}
            replacementFor = $("#rrm_replacementTechnicalTeam").val();
            position = $("#sdnmb_rrmtechnical_numberofpositions").dxNumberBox('instance').option('value');
            priority = $("#sdcmb_rrmtechnical_priority").dxSelectBox('instance').option('value');
            department = $("#sdcmb_rrmtechnical_department").dxSelectBox('instance').option('value');
            designation = $("#sdcmb_rrmtechnical_designation").dxSelectBox('instance').option('value');
            experience = $("#sdnmb_rrmtechnical_experiencerequired").dxNumberBox('instance').option('value');
            communication = $("#sdcmb_rrmtechnical_communication").dxSelectBox('instance').option('value');
            reqlocation = $("#sdtxt_rrmtechnical_location").dxTextBox('instance').option('value');
            requestedDate = $("#sd_date_rrmtechnical_requestedDate").dxDateBox('instance').option('value');
            losingRevenue = $("#sdchk_rrmtechnical_losingRevenue").dxCheckBox('instance').option('value');
            fromVIP = $("#sdchk_rrmtechnical_fromVIP").dxCheckBox('instance').option('value');
            requirmentLead = $("#sdtxt_rrmtechnical_requirementlead").dxTextBox('instance').option('value');

            if(reqlocation==""){reqlocation=null;}
            var finalRequestedDate = moment(requestedDate).format("DD-MM-YYYY");
            
            if(requirmentName == "" || requireFor==""||position==""||position=="0"||department==""||designation==""||experience==""||experience=="0")
            {
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
                            $('#rrm_experiencerequiredTechnicalTeamError').html("Select Experience");
                        }
                        else
                        {
                            $('#sdnmb_rrmtechnical_experiencerequired').removeClass('input-error');
                            $('#rrm_experiencerequiredTechnicalTeamError').html("");
                        }
                    }
                    if(experience=="0")
                    {
                        if(experience=="0")
                        {
                            $('#sdnmb_rrmtechnical_experiencerequired').addClass('input-error');
                            $('#rrm_experiencerequiredTechnicalTeamError').html("Min Experience is 1");
                    }
                    else
                    {
                        $('#sdnmb_rrmtechnical_experiencerequired').removeClass('input-error');
                        $('#rrm_experiencerequiredTechnicalTeamError').html("");
                    }
                }
            }
            
            $('.nav-tabs a[href="#rrm_requirementTabTechnicalTeam"]').tab("show");
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
                
                //var resultResorce = PostDataCall(dataResource); 
                PostDataCallAsync(dataResource, function (resultResorce) {
                    $('.nav-tabs a[href="#rrm_SkillDetailsTechnicalTeam"]').tab("show");
                    $(".btnPrevious").show();
                    if (!IsRrmSaved) {
                        $(".saveFamilyBtn").hide();
                        $("a.btnNext").show();

                    }
                    // getSkillsDetails('"+RRMID+"');
                    // getSkillsDetailseditfrm(RRMID);
                    _editRRMEntryPointTechnicalTeam.getSkillsDetails(RRMID);
                });
          }
}
        
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
                 $("#sd_txtEditor_technical_skillDetailsPlanA").dxHtmlEditor('instance').option("value",planAcomments);
               
                  $(".btnPrevious").show();
                  if (!IsRrmSaved) 
                  {
                      $(".saveFamilyBtn").hide();
                      $("a.btnNext").show();
                  }
            }
        }
    
    if (activeTab == "rrm_skillsplanaTabTechnicalTeam") 
    {
            skillDetailsA = $("#sd_txtEditor_technical_skillDetailsPlanA").dxHtmlEditor('instance').option("value");
            $("#sd_txtEditor_technical_skillDetailsPlanA").dxHtmlEditor('instance').option("value",planAcomments);
            var datecheck=0;
            toOnBoardA = $("#sd_date_rrm_technical_tobeonboardplana").dxDateBox('instance').option("value");
            requirtersA =$("#rrm_TechnicalTeamsplanaTechnicalTeam").val();
            var edate = $("#sd_date_rrm_technical_tobeonboardplana").dxDateBox('instance').option("value");
            // var varEDate = new Date().toISOString().slice(0,10); //dd-mm-YYYY
            //     if(edate <= varEDate) 
            //     {
            //     datecheck=1;
            //     swal({
            //                             title: "Warning!",
            //                             text: "Please enter valid Date current and previous date should not be selected",
            //                             icon: "warning",
            //                              button: "ok!",
            //         })
            //     }
            if((skillDetailsA==""||toOnBoardA=="") || datecheck==1)
            {
        
                if(skillDetailsA==""){
                  $('#rrm_skilldetailsplanaTechnicalTeamn').addClass('input-error');
                  $('#rrm_skilldetailsplanaTechnicalTeamError').html("Enter Skill Details");
                } else{
                  $('#rrm_skilldetailsplanaTechnicalTeamn').removeClass('input-error');
                  $('#rrm_skilldetailsplanaTechnicalTeamError').html("");
                }
                if(toOnBoardA==""){
                    $('#sd_date_rrm_technical_tobeonboardplana').addClass('input-error');
                  $('#rrm_tobeonboardplanaError').html("Select Date");
                } else{
                    $('#sd_date_rrm_technical_tobeonboardplana').removeClass('input-error');
                    $('#rrm_tobeonboardplanaTechnicalTeamError').html("");
                }
                $('.nav-tabs a[href="#rrm_skillsplanaTabTechnicalTeam"]').tab("show");
               
                $(".btnPrevious").show();
                if (!IsRrmSaved) 
                {
                  $(".saveFamilyBtn").hide();
                  $("a.btnNext").show();
                } 
            }
            else 
            {
                dataPlanA_frmrrm={
                    "Method":"PostResourceRequrimentSkillPlans",
                    "Data":{
                        "Token": Token,
                        "ResourceRequirementId": null,
                        "ResourceRequirementSkillPlanId": ResourceRequirementSkillPlanAId,
                        "SkillPlan": 'PlanA',
                        "SkillPlanInfo": skillDetailsA,
                        "ToBeOnBoard": toOnBoardA,
                        //"RecruiterId": requirtersA,
                        "IsActive": 'True'
                    }
                  }

                //var resulPlanBt = PostDataCall(dataPlanA_frmrrm);
                PostDataCallAsync(dataPlanA_frmrrm, function (resulPlanBt) {
                    $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsTechnicalTeam"]').tab("show");
                    $("#sd_txtEditor_technical_skillDetailsPlanB").dxHtmlEditor('instance').option("value",planBcomments);

                    $(".btnPrevious").show();
                    if (!IsRrmSaved) {
                        $(".saveFamilyBtn").hide();
                        $("a.btnNext").show();
                    }
                });
            }
        }
    
    if (activeTab == "rrm_skillsplanbTabTechnicalTeam") {
            var datecheck=0;
            skillDetailsB = $("#sd_txtEditor_technical_skillDetailsPlanB").dxHtmlEditor('instance').option("value");
            toOnBoardB = $("#sd_date_rrm_technical_tobeonboardplanb").dxDateBox('instance').option("value");
            requirtersB =$("#rrm_TechnicalTeamsplanbTechnicalTeam").val();
            var edate = $("#sd_date_rrm_technical_tobeonboardplanb").dxDateBox('instance').option("value");
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
                $('.nav-tabs a[href="#rrm_skillsplanbTabTechnicalTeam"]').tab("show");
                
                $(".btnPrevious").show();
                if (!IsRrmSaved) {
                  $(".saveFamilyBtn").hide();
                  $("a.btnNext").show();
                } 
            } else {
                dataPlanB={
                    "Method":"PostResourceRequrimentSkillPlans",
                    "Data":{
                        "Token": Token,
                        "ResourceRequirementId": null,
                        "ResourceRequirementSkillPlanId": ResourceRequirementSkillPlanBId,
                        "SkillPlan": 'PlanB',
                        "SkillPlanInfo": skillDetailsB,
                        "ToBeOnBoard": toOnBoardB,
                        //"RecruiterId": requirtersB,
                        "IsActive": 'True'
                    }
                  }
                  
                //var resulPlanBt = PostDataCall(dataPlanB);
                PostDataCallAsync(dataPlanB, function (resulPlanBt) {
                    $('.nav-tabs a[href="#rrm_CommentsDetailsTechnicalTeam"]').tab("show");
                    $(".btnPrevious").show();
                    if (!IsRrmSaved) {
                        $(".saveFamilyBtn").show();
                        _editRRMEntryPointTechnicalTeam.getManageCommentHistory(ResourceRequirementId);
                        $("a.btnNext").hide();
                    }
                });
            }
        }
    
    }

 _editRRMEntryPointTechnicalTeam.btnsendreminder = function (ResourceRequirementId) {
        
        var Comments = "Please assign a TechnicalTeams for this RRM "
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
     });
     _editRRMEntryPointTechnicalTeam.getManageCommentHistory(ResourceRequirementId);
    }

//bind getrrmbyid values in form
_editRRMEntryPointTechnicalTeam.RRMEntryFromRRM = function (rrmid) {
 
    RRMID=rrmid;
    ResourceRequirementId=rrmid;
   // var getRRMData = callgetlist('GetRRMbyid','{"IsActive":"True","ResourceRequirementId":"'+rrmid+'","Token":"'+Token+'"}');
    callGetListAsync('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + rrmid + '","Token":"' + Token + '"}', function (getRRMData) {
        _editRRMEntryPointTechnicalTeam.mapupdaterrmListcomputeHTML(getRRMData);
    });
}

//clear form data
_editRRMEntryPointTechnicalTeam.clearAll = function(){
            $("#rrmnoTechnicalTeam").text("");
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
            $("#sdtxt_rrmtechnical_requirementlead").dxTextBox('instance').option('value',"");
            var tdydate = new Date();
            tdydate.setDate(tdydate.getDate() + 1);
            var nxtDate = tdydate.toISOString().slice(0, 10);
            $("#sd_date_rrm_technical_tobeonboardplana").dxDateBox('instance').option("value",nxtDate);
            $("#sd_date_rrm_technical_tobeonboardplanb").dxDateBox('instance').option("value",nxtDate);
            
            $("#sd_txtEditor_RRMTechnicalComments").dxHtmlEditor('instance').option("value","");
            $("#sd_txtEditor_technical_skillDetailsPlanA").dxHtmlEditor('instance').option("value","");
            $("#sd_txtEditor_technical_skillDetailsPlanB").dxHtmlEditor('instance').option("value","");
}

//map update rrm List compute HTML
_editRRMEntryPointTechnicalTeam.mapupdaterrmListcomputeHTML = function(getRRMData) {
        
    if (getRRMData[0].rrmid=="")
     {

     }
     else 
     {
        var data;
        var EmployeeId = null;
        getRRMData.forEach(function (key, item) {
            OnHoldByOwnerStatusTechnicaTeam = key.OnHoldByOwner;
            OnHoldByClientStatusTechnicaTeam = key.OnHoldByClient;
            if (OnHoldByClientStatusTechnicaTeam == true || OnHoldByOwnerStatusTechnicaTeam == true) {
                readOnlyFormDataTechnicaTeam();
                $("#OwnerrrmHoldStatusTechnicaTeam").html("On-Hold").addClass("label label-warning m-l-xs");
                if (OnHoldByOwnerStatusTechnicaTeam == true) {
                    $("#switchLeadTechnicalTeam").dxSwitch({
                        value: true,
                        disabled: true
                    });
                }
                if (OnHoldByClientStatusTechnicaTeam == true) {
                    $("#switchLeadTechnicalTeam").dxSwitch({
                        value: true,
                        disabled: true
                    });
                }
            }
            else {
                $("#OwnerrrmHoldStatusTechnicaTeam").attr('class', '');
                $("#OwnerrrmHoldStatusTechnicaTeam").html('');
                $("#switchClientTechnicaTeam").dxSwitch({
                    value: false,
                    disabled: false
                });
                $("#switchLeadTechnicaTeam").dxSwitch({
                    value: false,
                    disabled: false
                });
            }
               $("#rrmmodelpagetitleTechnicalTeam").text("Edit RRM - "+key.RRMNo);
               $("#sdtxt_rrmtechnical_requirementname").dxTextBox('instance').option('value',key.RequirementName);
               $("#sdtxt_rrmtechnical_requiredfor").dxTextBox('instance').option('value',key.RequiredFor);
                $("#rrm_empidTechnicalTeam").val(key.EmployeeId);
                $("#sdcmb_rrmtechnical_priority").dxSelectBox('instance').option('value',key.PriorityId);
               if(key.BDEName != " ")
               {
                   $("#rrm_entrybdeTechnicalTeam").val(key.BDEName);
               }
               else
               {
                   $("#rrm_entrybdeTechnicalTeam").val('');
               }
               $("#sdnmb_rrmtechnical_numberofpositions").dxNumberBox('instance').option('value',key.NumberOfPositions);
               $("#sdcmb_rrmtechnical_communication").dxSelectBox('instance').option('value',key.Communication);
                $("#sdcmb_rrmtechnical_department").dxSelectBox('instance').option('value',key.DepartmentId);
                $("#sdcmb_rrmtechnical_designation").dxSelectBox('instance').option('value',key.DesignationId);
                $("#sdnmb_rrmtechnical_experiencerequired").dxNumberBox('instance').option('value',key.ExperiencerequiredInYrs);
                $("#sdtxt_rrmtechnical_location").dxTextBox('instance').option('value',key.Location);
                var edate=key.RequestedDate;
                if(edate!=null){
                    var ed = edate;
                    $("#sd_date_rrmtechnical_requestedDate").dxDateBox('instance').option('value',ed);

                }

               if (ResourceRequirementTypeTechTeam == "G") {
                $("#sdtxt_rrmtechnical_requirementlead").dxTextBox('instance').option('value',key.Owner);
               }
               else if (ResourceRequirementTypeTechTeam == "P") {
                $("#sdtxt_rrmtechnical_requirementlead").dxTextBox('instance').option('value',key.Owner);
               }
               else if (ResourceRequirementTypeTechTeam == "R") {
                $("#sdtxt_rrmtechnical_requirementlead").dxTextBox('instance').option('value',key.LeadName);
               }

                
               $("#sdnmb_rrmtechnical_numberofpositions").dxNumberBox('instance').option('value',getRRMData[0].NumberOfPositions);
                planAcomments=key['PlanA-SkillPlanInfo'];
                planBcomments=key['PlanB-SkillPlanInfo'];
                hrComments=key.Comments;
                var edate=key['PlanA-OnBoardDate'];
                if(edate!=null)
                {
                var ed = edate;
                $("#sd_date_rrm_technical_tobeonboardplana").dxDateBox('instance').option("value",ed);
                }
                var edate=key['PlanB-OnBoardDate'];
                if(edate!=null)
                {
                var ed = edate;
                $("#sd_date_rrm_technical_tobeonboardplanb").dxDateBox('instance').option("value",ed);
                }

                if(key.OwnerId == localStorage.getItem("EmployeeID")){
                    IsOwnerForSkill = true;
                }
                else{
                    IsOwnerForSkill = false;
                }
            
            }); 
    }
        _editRRMEntryPointTechnicalTeam.getResourceRequirementSkillPlanAId();
        _editRRMEntryPointTechnicalTeam.getResourceRequirementSkillPlanBId();

    }

    //To get Resource RequirementSkill PlanB Id
    _editRRMEntryPointTechnicalTeam.getResourceRequirementSkillPlanAId = function () {
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
        });
    }

    //To get Resource RequirementSkill PlanB Id
    _editRRMEntryPointTechnicalTeam.getResourceRequirementSkillPlanBId = function () {
        var dataResourceGetSkillId = JSON.stringify({
            "Token": Token,
            "ResourceRequirementId": ResourceRequirementId,
            "SkillPlans": "PlanB",
            "IsActive": "True"
        });

        //var result = callgetlist('GetResourceRequrimentSkillPlans', dataResourceGetSkillId);
        callGetListAsync('GetResourceRequrimentSkillPlans', dataResourceGetSkillId, function (result) {
            if (result != null || result != "") {
                ResourceRequirementSkillPlanBId = result[0].ResourceRequirementSkillPlanId;
            }
        });
    }
//skill mapping
_editRRMEntryPointTechnicalTeam.skillcomputeHTML = function(e) {   
       var html = "";
       if (e == null || e=="") {
           html = "<table id='myTable' class='skillemptytbl myTable_rrm TechnicalTeam'>";
           html += "<tr>";
           html += "<th>Family</th>"
           html += "<th>Skills</th>"
           html += "<th>Version</th>"
           html += "<th>Action</th>"
           html += "</tr>";  
          html += "<tr><td colspan='4'>No Data..!</td></tr>";
        
     } else {
           var html = "<table id='myTable' class='myTable_rrm TechnicalTeam'>";
           html += "<tr>";
           html += "<th>Family</th>"
           html += "<th>Skills</th>"
           html += "<th>Version</th>"
           html += "<th>Action</th>"
           html += "</tr>";        
           e.forEach(function (key, item) {
             var skillId = key.ResourceRequirementSkillId;
             html += "<tr class='row_" + item + "' id='row_" + skillId + "'>";
             html += "<td><input type='hidden' class='family' value='" + key.SkillFamily + "'> " + key.SkillFamily + "</td>"
             html += "<td><input type='hidden' class='skill_type' value='" + key.Skill + "'>" + key.Skill + "</td>"
             html += "<td><input type='hidden' class='version' value='" + key.SkillVersion + "'>" + key.SkillVersion + "</td>"
             html += "<td><button class='btn edit-btn' id='editskillTechnicalTeam' onclick=editRow_SkillMapping('" + skillId + "')><i class='fas fa-pencil-alt'></i></button>"
               html += "<button class='btn delete-btn' id='deleteskillTechnicalTeam' onclick=_editRRMEntryPointTechnicalTeam.deleteRow_SkillMapping('" + skillId + "')><i class='fas fa-trash-alt'></i></button></td>"
             html += "</tr>";
         }); 
      
       }
        return html;
} 

//tab previous btn evenet
_editRRMEntryPointTechnicalTeam.toggleTabRRMEntryPrevious = function() {
    
    var activeTab = $('#rrmtabTechnicalTeam').find('li.active').attr('id')

    if (activeTab == "rrm_skillsplanaTabTechnicalTeam") 
    {
        $('.nav-tabs a[href="#rrm_SkillDetailsTechnicalTeam"]').tab("show");
        $("a.btnNext").show();
        $(".saveFamilyBtn").hide();
    }
    
    if (activeTab == "rrm_skillsTabTechnicalTeam") 
    {
        $('.nav-tabs a[href="#rrm_RequirementDetailsTechnicalTeam"]').tab("show");
        $("a.btnNext").show();
        $(".saveFamilyBtn").hide();
        $(".btnPrevious").hide();
        _editRRMEntryPointTechnicalTeam.updateresourcerequitementdata();
    }

    if (activeTab == "rrm_skillsplanbTabTechnicalTeam") 
    {
        $('.nav-tabs a[href="#rrm_SkillsPlanADetailsTechnicalTeam"]').tab("show");
        $("a.btnNext").show();
        $(".btnPrevious").show();
        $(".saveFamilyBtn").hide();
        
        var filter_valbtn = JSON.stringify({
        "IsActive": 'True',
			"Token":Token,
			"ResourceRequirementId":ResourceRequirementId,
            "SkillPlan":'PlanA'
        });
    
       // var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
        callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {
            if (result != null) {
                $("#sd_txtEditor_technical_skillDetailsPlanB").dxHtmlEditor('instance').option("value",result[0].SkillPlanInfo);
                var edate = result[0].ToBeOnBoard;
                var ed = edate;
                $("#sd_date_rrm_technical_tobeonboardplana").dxDateBox('instance').option("value",ed);
                ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
            }
        });
    }

    if (activeTab == "rrm_commentsTechnicalTeamTabTechnicalTeam") 
    {

        comments = $("#sd_txtEditor_technical_skillDetailsPlanB").dxHtmlEditor('instance').option("value");

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
        $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsTechnicalTeam"]').tab("show");
        
        var filter_valbtn = JSON.stringify({
            "IsActive": 'True',
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
            }
        });
    }
}

// get rrm detials by id
_editRRMEntryPointTechnicalTeam.updateresourcerequitementdata = function(){
   // var getRRMData = callgetlist('GetRRMbyid','{"IsActive":"True","ResourceRequirementId":"'+ResourceRequirementId+'","Token":"'+Token+'"}');
    callGetListAsync('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + ResourceRequirementId + '","Token":"' + Token + '"}', function (result) {
        _editRRMEntryPointTechnicalTeam.mapupdateaddrrmListcomputeHTML(getRRMData)
    });
}
  
  //bind rrm data from _addRRMEntryPoint.updateresourcerequitementdata function result
 _editRRMEntryPointTechnicalTeam.mapupdateaddrrmListcomputeHTML = function(getRRMData){
  
         if (getRRMData[0].rrmid=="") {
  
        } else {
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
            if(edate!=null){
            var ed = edate;
            $("#sd_date_rrmtechnical_requestedDate").dxDateBox('instance').option('value',ed);
            }
            $("#sdtxt_rrmtechnical_requirementlead").dxTextBox('instance').option('value',key.LeadName);
           
           
            });
        }
}

//save hr commnets
    _editRRMEntryPointTechnicalTeam.saveComments = function () {
        var finalComments = $("#sd_txtEditor_RRMTechnicalComments").dxHtmlEditor('instance').option("value");
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
        $('#RRMEntryPointModelTechnicalTeam').modal("hide");
    ResourceRequirementId=null;
    var rrmEntryGrid = RRMEntryPointGridOwner("TechnicalTeam");
    rrmEntryGrid.getRRMEntryTable();
        _editRRMEntryPointTechnicalTeam.clearAll();
        $('#rrm_SkillsPlanADetailsTechnicalTeam').modal("hide");
}

//get skill details
_editRRMEntryPointTechnicalTeam.getSkillsDetails = function(ResourceRequrimentId) {
    
    var filterData = JSON.stringify({
        "ResourceRequirementId": ResourceRequrimentId,
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
                _editRRMEntryPointTechnicalTeam.insert_SkillInfoEntry(e);
            },
            onRowUpdated: function (e) {
                _editRRMEntryPointTechnicalTeam.update_SkillInfoEntry(e);
            },
            onRowRemoved: function (e) {
                _editRRMEntryPointTechnicalTeam.delete_SkillInfoEntry(e);
            }
        });
    });

}

_editRRMEntryPointTechnicalTeam.insert_SkillInfoEntry = function (e) {
        
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
            _editRRMEntryPointTechnicalTeam.skillsClearAndShow();
            _editRRMEntryPointTechnicalTeam.getSkillsDetails(RRMID);
        }
    });
  }

  _editRRMEntryPointTechnicalTeam.update_SkillInfoEntry = function (e) {
      
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
            _editRRMEntryPointTechnicalTeam.skillsClearAndShow();
            _editRRMEntryPointTechnicalTeam.getSkillsDetails(RRMID);
          }
      });       

  }

  _editRRMEntryPointTechnicalTeam.delete_SkillInfoEntry = function (e) {
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
            _editRRMEntryPointTechnicalTeam.skillsClearAndShow();
            _editRRMEntryPointTechnicalTeam.getSkillsDetails(RRMID);
          }                    
      });   
  }   


//get Manage Comment History
_editRRMEntryPointTechnicalTeam.getManageCommentHistory = function(ResourceRequirementId) {
    
    var filter_val = JSON.stringify({
      "ResourceRequirementId": ResourceRequirementId,
      "IsActive": 'True',
      "Token":Token
    });
    //var getManageplanComments = callgetlist("GetCommentsInResourceRequirement", filter_val);
    callGetListAsync('GetResourceRequrimentSkillPlans', filter_val, function (getManageplanComments) {
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
        $("#rrm_manage_plan_comments_documents_TechnicalTeam").html(plan_comment_history_html);
        var div = document.getElementById('rrm_manage_plan_comments_documents_TechnicalTeam');
        div.scrollTop = div.scrollHeight - div.clientHeight;
    });
}

//skill data clear func
_editRRMEntryPointTechnicalTeam.skillsClearAndShow = function() { // Clear our fields


    // document.getElementById("skillentry").value = "";

    // document.getElementById("skillentry").value = "";

    // document.getElementById("familyentry_fromrfp").value = "";
    // document.getElementById("skillentry_fromrfp").value = "";
    // document.getElementById("skillversionentryTechnicalTeam_fromrfp").value = "";

    // document.getElementById("familyentry_fromresign").value = "";
    // document.getElementById("skillentry_fromresign").value = "";
    // document.getElementById("skillversionentryTechnicalTeam_fromresign").value = "";
}

//get versions entry
_editRRMEntryPointTechnicalTeam.get_versionsentry = function(skillentry_id) {
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
    });                                 
}

//get skill entry
_editRRMEntryPointTechnicalTeam.get_skillsentry = function(familyentry_id) {
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

return _editRRMEntryPointTechnicalTeam;

});