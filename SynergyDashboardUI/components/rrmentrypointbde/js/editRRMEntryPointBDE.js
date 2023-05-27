EditRRMEntryPointOwnerBDE = (function () {
var _editRRMEntryPointBDE = {};

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
var OnHoldByOwnerStatusBDE = false;
var OnHoldByClientStatusBDE = false;    

var IsOwnerForSkill = false;

_editRRMEntryPointBDE.initializeRRMByTechnical = function (rrmid) {

}

//tab next btn events
_editRRMEntryPointBDE.toggleTabRRMEntry = function() { 

    var activeTab = $('#rrmtabBDE').find('li.active').attr('id')
        
    if (activeTab == "rrm_requirementTabBDE")
     {
            requirmentName = $("#sdtxt_rrmbde_requirementname").dxTextBox('instance').option('value');
            requireFor =$("#sdtxt_rrmbde_requiredfor").dxTextBox('instance').option('value');
            bde = $("#rrm_entrybdeBDE").val();
            if(bde==""){bde=null;}
            replacementFor = $("#rrm_replacementBDE").val();
            position = $("#sdnmb_rrmbde_numberofpositions").dxNumberBox('instance').option('value');
            priority = $("#sdcmb_rrmbde_priority").dxSelectBox('instance').option('value');
            department = $("#sdcmb_rrmbde_department").dxSelectBox('instance').option('value');
            designation = $("#sdcmb_rrmbde_designation").dxSelectBox('instance').option('value');
            experience = $("#sdnmb_rrmbde_experiencerequired").dxNumberBox('instance').option('value');
            communication = $("#sdcmb_rrmbde_communication").dxSelectBox('instance').option('value');
            reqlocation = $("#sdtxt_rrmbde_location").dxTextBox('instance').option('value');
            requestedDate = $("#sd_date_rrmbde_requestedDate").dxDateBox('instance').option('value');
            losingRevenue = $("#sdchk_rrmbde_losingRevenue").dxCheckBox('instance').option('value');
            fromVIP = $("#sdchk_rrmbde_fromVIP").dxCheckBox('instance').option('value');
            requirmentLead = $("#sdtxt_rrmbde_requirementlead").dxTextBox('instance').option('value');

            if(reqlocation==""){reqlocation=null;}
            var finalRequestedDate = moment(requestedDate).format("DD-MM-YYYY");
            
            if(requirmentName == "" || requireFor==""||position==""||position=="0"||department==""||designation==""||experience==""||experience=="0")
            {
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
                            $('#sdnmb_rrmbde_experiencerequired').addClass('input-error');
                            $('#rrm_experiencerequiredBDEError').html("Select Experience");
                        }
                        else
                        {
                            $('#sdnmb_rrmbde_experiencerequired').removeClass('input-error');
                            $('#rrm_experiencerequiredBDEError').html("");
                        }
                    }
                    if(experience=="0")
                    {
                        if(experience=="0")
                        {
                            $('#sdnmb_rrmbde_experiencerequired').addClass('input-error');
                            $('#rrm_experiencerequiredBDEError').html("Min Experience is 1");
                    }
                    else
                    {
                        $('#sdnmb_rrmbde_experiencerequired').removeClass('input-error');
                        $('#rrm_experiencerequiredBDEError').html("");
                    }
                }
            }
            
            $('.nav-tabs a[href="#rrm_requirementTabBDE"]').tab("show");
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
                    $('.nav-tabs a[href="#rrm_SkillDetailsBDE"]').tab("show");
                    $(".btnPrevious").show();
                    if (!IsRrmSaved) {
                        $(".saveFamilyBtn").hide();
                        $("a.btnNext").show();

                    }
                    // getSkillsDetails('"+RRMID+"');
                    // getSkillsDetailseditfrm(RRMID);
                    _editRRMEntryPointBDE.getSkillsDetails(RRMID);
                });
          }
}
        
    if (activeTab == "rrm_skillsTabBDE") 
        {
            
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
                 $("#sd_txtEditorbde_skillDetailsPlanA").dxHtmlEditor('instance').option("value",planAcomments);
               
                  $(".btnPrevious").show();
                  if (!IsRrmSaved) 
                  {
                      $(".saveFamilyBtn").hide();
                      $("a.btnNext").show();
                  }
            }
        }
    
    if (activeTab == "rrm_skillsplanaTabBDE") 
    {
        skillDetailsA = $("#sd_txtEditorbde_skillDetailsPlanA").dxHtmlEditor('instance').option("value");
        $("#sd_txtEditorbde_skillDetailsPlanA").dxHtmlEditor('instance').option("value",planAcomments);
            var datecheck=0;
            toOnBoardA = $("#sd_date_rrmbde_tobeonboardplana").dxDateBox('instance').option("value");
            requirtersA =$("#rrm_BDEsplanaBDE").val();
            var edate = $("#sd_date_rrmbde_tobeonboardplana").dxDateBox('instance').option("value");
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
                  $('#rrm_skilldetailsplanaBDEn').addClass('input-error');
                  $('#rrm_skilldetailsplanaBDEError').html("Enter Skill Details");
                } else{
                  $('#rrm_skilldetailsplanaBDEn').removeClass('input-error');
                  $('#rrm_skilldetailsplanaBDEError').html("");
                }
                if(toOnBoardA==""){
                    $('#sd_date_rrmbde_tobeonboardplana').addClass('input-error');
                  $('#rrm_tobeonboardplanaError').html("Select Date");
                } else{
                    $('#sd_date_rrmbde_tobeonboardplana').removeClass('input-error');
                    $('#rrm_tobeonboardplanaBDEError').html("");
                }
                $('.nav-tabs a[href="#rrm_skillsplanaTabBDE"]').tab("show");
                
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
                    $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsBDE"]').tab("show");
                    $("#sd_txtEditorbde_skillDetailsPlanB").dxHtmlEditor('instance').option("value",planBcomments);

                    $(".btnPrevious").show();
                    if (!IsRrmSaved) {
                        $(".saveFamilyBtn").hide();
                        $("a.btnNext").show();
                    }
                });
            }
        }
    
    if (activeTab == "rrm_skillsplanbTabBDE") {
            var datecheck=0;
            skillDetailsB = $("#sd_txtEditorbde_skillDetailsPlanB").dxHtmlEditor('instance').option("value");
            toOnBoardB = $("#sd_date_rrmbde_tobeonboardplanb").dxDateBox('instance').option("value");
            requirtersB =$("#rrm_BDEsplanbBDE").val();
            var edate = $("#sd_date_rrmbde_tobeonboardplanb").dxDateBox('instance').option("value");
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
                $('.nav-tabs a[href="#rrm_skillsplanbTabBDE"]').tab("show");
                
                $(".btnPrevious").show();
                if (!IsRrmSaved) {
                  $(".saveFamilyBtn").hide();
                  $("a.btnNext").show();
                } 
              }else {
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
                    $('.nav-tabs a[href="#rrm_CommentsDetailsBDE"]').tab("show");
                    $(".btnPrevious").show();
                    if (!IsRrmSaved) {
                        $(".saveFamilyBtn").show();
                        _editRRMEntryPointBDE.getManageCommentHistory(ResourceRequirementId);
                        $("a.btnNext").hide();
                    }
                });
            }
        }
    
    }

 _editRRMEntryPointBDE.btnsendreminder = function (ResourceRequirementId) {
        
        var Comments = "Please assign a BDEs for this RRM "
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
     _editRRMEntryPointBDE.getManageCommentHistory(ResourceRequirementId);
    }

//bind getrrmbyid values in form
    _editRRMEntryPointBDE.RRMEntryFromRRM = function (rrmid) {
        
    RRMID=rrmid;
    ResourceRequirementId=rrmid;
    //var getRRMData = callgetlist('GetRRMbyid','{"IsActive":"True","ResourceRequirementId":"'+rrmid+'","Token":"'+Token+'"}');
        callGetListAsync('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + rrmid + '","Token":"' + Token + '"}', function (getRRMData) {
            _editRRMEntryPointBDE.mapupdaterrmListcomputeHTML(getRRMData);
        });
}

//clear form data
_editRRMEntryPointBDE.clearAll = function(){
            $("#rrmnoBDE").text("");
            $("#sdtxt_rrmbde_requirementname").dxTextBox('instance').option('value',"");
            $("#sdtxt_rrmbde_requiredfor").dxTextBox('instance').option('value',"");
            $("#rrm_empidBDE").val("");
            $("#rrm_entrybdeBDE").val("");
            $("#sdnmb_rrmbde_numberofpositions").dxNumberBox('instance').option('value',"");

            $("#sdcmb_rrmbde_department").dxSelectBox('instance').option('value',"");
            $("#sdcmb_rrmbde_designation").dxSelectBox('instance').option('value',"");
            $("#sdnmb_rrmbde_experiencerequired").dxNumberBox('instance').option('value',"");
            $("#sdtxt_rrmbde_location").dxTextBox('instance').option('value',"");
            var date = new Date();
            var currentDate = date.toISOString().slice(0, 10);
            $("#sd_date_rrmbde_requestedDate").dxDateBox('instance').option('value',currentDate);
            $("#sdtxt_rrmbde_requirementlead").dxTextBox('instance').option('value',"");
            $("#rrm_tobeonboardplana").val("");
            var tdydate = new Date();
            tdydate.setDate(tdydate.getDate() + 1);
            var nxtDate = tdydate.toISOString().slice(0, 10);
            $("#sd_date_rrmbde_tobeonboardplanb").dxDateBox('instance').option("value",nxtDate);
            
            $("#sd_txtEditor_RRMBDEComments").dxHtmlEditor('instance').option("value","");
            $("#sd_txtEditorbde_skillDetailsPlanA").dxHtmlEditor('instance').option("value","");
            $("#sd_txtEditorbde_skillDetailsPlanB").dxHtmlEditor('instance').option("value","");
}

//map update rrm List compute HTML
    _editRRMEntryPointBDE.mapupdaterrmListcomputeHTML = function (getRRMData) {
    if (getRRMData[0].rrmid=="")
     {

     }
     else 
     {
        var data;
        var EmployeeId = null;
        getRRMData.forEach(function (key, item) {
            OnHoldByOwnerStatusBDE = key.OnHoldByOwner;
            OnHoldByClientStatusBDE = key.OnHoldByClient;
            if (OnHoldByClientStatusBDE == true || OnHoldByOwnerStatusBDE == true) {
                readOnlyFormDataBDE();
                $("#OwnerrrmHoldStatusBDE").html("On-Hold").addClass("label label-warning m-l-xs");
                if (OnHoldByOwnerStatusBDE == true) {
                    $("#switchLeadBDE").dxSwitch({
                        value: true,
                        disabled: true
                    });
                }
                if (OnHoldByClientStatusBDE == true) {
                    $("#switchClientBDE").dxSwitch({
                        value: true,
                        disabled: true
                    });
                }
            }
            else {
                $("#OwnerrrmHoldStatusBDE").attr('class', '');
                $("#OwnerrrmHoldStatusBDE").html('');
                $("#switchClientBDE").dxSwitch({
                    value: false,
                    disabled: false
                });
                $("#switchLeadBDE").dxSwitch({
                    value: false,
                    disabled: false
                });
            }
               $("#rrmmodelpagetitleBDE").text("Edit RRM - "+key.RRMNo);
               $("#sdtxt_rrmbde_requirementname").dxTextBox('instance').option('value',key.RequirementName);
               $("#sdtxt_rrmbde_requiredfor").dxTextBox('instance').option('value',key.RequiredFor);
                $("#rrm_empidBDE").val(key.EmployeeId);
                $("#sdcmb_rrmbde_priority").dxSelectBox('instance').option('value',key.PriorityId);
               if(key.BDEName != " ")
               {
                   $("#rrm_entrybdeBDE").val(key.BDEName);
               }
               else
               {
                   $("#rrm_entrybdeBDE").val('');
               }
               $("#sdnmb_rrmbde_numberofpositions").dxNumberBox('instance').option('value',key.NumberOfPositions);
               $("#sdcmb_rrmbde_communication").dxSelectBox('instance').option('value',key.Communication);
                $("#sdcmb_rrmbde_department").dxSelectBox('instance').option('value',key.DepartmentId);
                $("#sdcmb_rrmbde_designation").dxSelectBox('instance').option('',key.DesignationId);
                $("#sdnmb_rrmbde_experiencerequired").dxNumberBox('instance').option('value',key.ExperiencerequiredInYrs);
                $("#sdtxt_rrmbde_location").dxTextBox('instance').option('value',key.Location);
                var edate=key.RequestedDate;
                if(edate!=null){
                    var ed = edate;
                    $("#sd_date_rrmbde_requestedDate").dxDateBox('instance').option('value',ed);

                }
               if (ResourceRequirementTypeBDE == "G") {
                    $("#sdtxt_rrmbde_requirementlead").dxTextBox('instance').option('value',key.Owner);
               }
               else if (ResourceRequirementTypeBDE == "P") {
                    $("#sdtxt_rrmbde_requirementlead").dxTextBox('instance').option('value',key.Owner);
               }
               else if (ResourceRequirementTypeBDE == "R") {
                    $("#sdtxt_rrmbde_requirementlead").dxTextBox('instance').option('value',key.LeadName);
               }

               $("#sdnmb_rrmbde_numberofpositions").dxNumberBox('instance').option('value',getRRMData[0].NumberOfPositions);
                planAcomments=key['PlanA-SkillPlanInfo'];
                planBcomments=key['PlanB-SkillPlanInfo'];
                hrComments=key.Comments;
                var edate=key['PlanA-OnBoardDate'];
                if(edate!=null)
                {
                var ed = edate;
                $("#sd_date_rrmbde_tobeonboardplana").dxDateBox('instance').option("value",ed);
                }
                var edate=key['PlanB-OnBoardDate'];
                if(edate!=null)
                {
                var ed = edate;                
                $("#sd_date_rrmbde_tobeonboardplanb").dxDateBox('instance').option("value",ed);
                }

                if(key.OwnerId == localStorage.getItem("EmployeeID")){
                    IsOwnerForSkill = true;
                }
                else{
                    IsOwnerForSkill = false;
                }
            
            }); 
    }

    _editRRMEntryPointBDE.getResourceRequirementSkillPlanAId();
    _editRRMEntryPointBDE.getResourceRequirementSkillPlanBId();

    }

    //To get Resource RequirementSkill PlanB Id
    _editRRMEntryPointBDE.getResourceRequirementSkillPlanAId = function () {
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
    _editRRMEntryPointBDE.getResourceRequirementSkillPlanBId = function () {
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

    //investicate & delete
//skill mapping
_editRRMEntryPointBDE.skillcomputeHTML = function(e) {   
       var html = "";
       if (e == null || e=="") {
           html = "<table id='myTable' class='skillemptytbl myTable_rrm BDE'>";
           html += "<tr>";
           html += "<th>Family</th>"
           html += "<th>Skills</th>"
           html += "<th>Version</th>"
           html += "<th>Action</th>"
           html += "</tr>";  
          html += "<tr><td colspan='4'>No Data..!</td></tr>";
        
     } else {
           var html = "<table id='myTable' class='myTable_rrm BDE'>";
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
             html += "<td><button class='btn edit-btn' id='editskillBDE' onclick=editRow_SkillMapping('" + skillId + "')><i class='fas fa-pencil-alt'></i></button>"
               html += "<button class='btn delete-btn' id='deleteskillBDE' onclick=_editRRMEntryPointBDE.deleteRow_SkillMapping('" + skillId + "')><i class='fas fa-trash-alt'></i></button></td>"
             html += "</tr>";
         }); 
      
       }
        return html;
} 

//tab previous btn evenet
    _editRRMEntryPointBDE.toggleTabRRMEntryPrevious = function () {

        var activeTab = $('#rrmtabBDE').find('li.active').attr('id')

        if (activeTab == "rrm_skillsplanaTabBDE") {
            $('.nav-tabs a[href="#rrm_SkillDetailsBDE"]').tab("show");
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
        }

        if (activeTab == "rrm_skillsTabBDE") {
            $('.nav-tabs a[href="#rrm_RequirementDetailsBDE"]').tab("show");
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
            $(".btnPrevious").hide();
            _editRRMEntryPointBDE.updateresourcerequitementdata();
        }

        if (activeTab == "rrm_skillsplanbTabBDE") {
            $('.nav-tabs a[href="#rrm_SkillsPlanADetailsBDE"]').tab("show");
            $("a.btnNext").show();
            $(".btnPrevious").show();
            $(".saveFamilyBtn").hide();

            var filter_valbtn = JSON.stringify({
                "Token": Token,
                "ResourceRequirementId": ResourceRequirementId,
                "SkillPlans": "PlanA",
                "IsActive": "True"
            });

            //var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
            callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {

                if (result != null) {
                    $("#sd_txtEditorbde_skillDetailsPlanB").dxHtmlEditor('instance').option("value",result[0].SkillPlanInfo);
                    var edate = result[0].ToBeOnBoard;
                    var ed = edate;                    

                    $("#sd_date_rrmbde_tobeonboardplana").dxDateBox('instance').option("value",ed);
                    ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
                }
            });

        }

        if (activeTab == "rrm_commentsBDETabBDE") {

            comments = $("#sd_txtEditorbde_skillDetailsPlanB").dxHtmlEditor('instance').option("value");

            if (!IsRrmSaved) {
                $("a.btnNext").show();
                $(".saveFamilyBtn").hide();
            }
            else {
                $("a.btnNext").hide();
            }

            $(".btnPrevious").show();
            $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsBDE"]').tab("show");

            var filter_valbtn = JSON.stringify({
                "Token": Token,
                "ResourceRequirementId": ResourceRequirementId,
                "SkillPlans": "PlanB",
                "IsActive": "True"
            });

            //  var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
            callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {
                if (result != null) {
                    $("#sd_txtEditorbde_skillDetailsPlanB").dxHtmlEditor('instance').option("value",result[0].SkillPlanInfo);
                    var edate = result[0].ToBeOnBoard;
                    var ed = edate;                    
                    $("#sd_date_rrmbde_tobeonboardplanb").dxDateBox('instance').option("value",ed);
                    ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
                }
            });
        }
    }
        // get rrm detials by id
        _editRRMEntryPointBDE.updateresourcerequitementdata = function () {
            // var getRRMData = callgetlist('GetRRMbyid','{"IsActive":"True","ResourceRequirementId":"'+ResourceRequirementId+'","Token":"'+Token+'"}');
            callGetListAsync('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + ResourceRequirementId + '","Token":"' + Token + '"}', function (getRRMData) {
                _editRRMEntryPointBDE.mapupdateaddrrmListcomputeHTML(getRRMData);
            });
        }

        //bind rrm data from _addRRMEntryPoint.updateresourcerequitementdata function result
        _editRRMEntryPointBDE.mapupdateaddrrmListcomputeHTML = function (getRRMData) {

            if (getRRMData[0].rrmid == "") {

            } else {
                var data;
                getRRMData.forEach(function (key, item) {
                    $("#sdtxt_rrmbde_requirementname").dxTextBox('instance').option('value',key.RequirementName);
                    $("#sdtxt_rrmbde_requiredfor").dxTextBox('instance').option('value',key.RequiredFor);
                    $("#rrm_empidBDE").val(key.RequirementName);
                    $("#rrm_entrybdeBDE").val(key.BDEName);
                    $("#sdnmb_rrmbde_numberofpositions").dxNumberBox('instance').option('value',key.NumberOfPositions);

                    $("#sdcmb_rrmbde_department").dxSelectBox('instance').option('value',key.DepartmentId);
                    $("#sdnmb_rrmbde_experiencerequired").dxNumberBox('instance').option('value',key.ExperiencerequiredInYrs);
                    $("#sdtxt_rrmbde_location").dxTextBox('instance').option('value',key.Location);
                    var edate = key.RequestedDate;
                    if (edate != null) {
                        var ed = edate;
                        $("#sd_date_rrmbde_requestedDate").dxDateBox('instance').option('value',ed);
                    }
                    $("#sdtxt_rrmbde_requirementlead").dxTextBox('instance').option('value',key.LeadName);

                });
            }
        }

        //save hr commnets
        _editRRMEntryPointBDE.saveComments = function () {
            var finalComments = $("#sd_txtEditor_RRMBDEComments").dxHtmlEditor('instance').option("value");
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
            $('#RRMEntryPointModelBDE').modal("hide");
            ResourceRequirementId = null;
            var rrmEntryGrid = RRMEntryPointGridOwner("BDE");
            rrmEntryGrid.getRRMEntryTable();
            _editRRMEntryPointBDE.clearAll();
            $('#rrm_SkillsPlanADetailsBDE').modal("hide");
        }

        //get skill details
        _editRRMEntryPointBDE.getSkillsDetails = function (ResourceRequrimentId) {

            var filterData = JSON.stringify({
                "ResourceRequirementId": ResourceRequrimentId,
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
                        _editRRMEntryPointBDE.insert_SkillInfoEntry(e);
                    },
                    onRowUpdated: function (e) {
                        _editRRMEntryPointBDE.update_SkillInfoEntry(e);
                    },
                    onRowRemoved: function (e) {
                        _editRRMEntryPointBDE.delete_SkillInfoEntry(e);
                    }
                });
            });
        }
    
        //get Manage Comment History
        _editRRMEntryPointBDE.getManageCommentHistory = function (ResourceRequirementId) {

            var filter_val = JSON.stringify({
                "ResourceRequirementId": ResourceRequirementId,
                "IsActive": 'True',
                "Token": Token
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
                $("#rrm_manage_plan_comments_documents_BDE").html(plan_comment_history_html);
                var div = document.getElementById('rrm_manage_plan_comments_documents_BDE');
                div.scrollTop = div.scrollHeight - div.clientHeight;
            })
        }

        //skill data clear func
        _editRRMEntryPointBDE.skillsClearAndShow = function () { // Clear our fields

            

            // document.getElementById("skillentry").value = "";

            // document.getElementById("skillentry").value = "";

            // document.getElementById("familyentry_fromrfp").value = "";
            // document.getElementById("skillentry_fromrfp").value = "";
            // document.getElementById("skillversionentryBDE_fromrfp").value = "";

            // document.getElementById("familyentry_fromresign").value = "";
            // document.getElementById("skillentry_fromresign").value = "";
            // document.getElementById("skillversionentryBDE_fromresign").value = "";
        }

        //get versions entry
        _editRRMEntryPointBDE.get_versionsentry = function (skillentry_id) {
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
            })
        }

        //get skill entry
        _editRRMEntryPointBDE.get_skillsentry = function (familyentry_id) {
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

        //insert skill entry
        _editRRMEntryPointBDE.insert_SkillInfoEntry = function (e) {
            
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
                _editRRMEntryPointBDE.skillsClearAndShow();
                _editRRMEntryPointBDE.getSkillsDetails(RRMID);
            }
        });
    }

    _editRRMEntryPointBDE.update_SkillInfoEntry = function (e) {
        
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
                _editRRMEntryPointBDE.skillsClearAndShow();
                _editRRMEntryPointBDE.getSkillsDetails(RRMID);
            }
        });       

    }

    _editRRMEntryPointBDE.delete_SkillInfoEntry = function (e) {
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
                _editRRMEntryPointBDE.skillsClearAndShow();
                _editRRMEntryPointBDE.getSkillsDetails(RRMID);
            }                    
        });   
    }

        return _editRRMEntryPointBDE;
});