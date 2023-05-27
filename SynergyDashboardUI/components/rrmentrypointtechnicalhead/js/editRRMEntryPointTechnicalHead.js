EditRRMEntryPointOwnerTechnicalHead = (function () {
var _editRRMEntryPointTechnicalHead = {};

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

    var OnHoldByOwnerStatusTechnicalHead = false;
    var OnHoldByClientStatusTechnicalHead = false;

    var IsOwnerForSkill = false;

    _editRRMEntryPointTechnicalHead.initializeRRMByTechnical = function (rrmid) {

}

//tab next btn events
_editRRMEntryPointTechnicalHead.toggleTabRRMEntry = function() { 
    

    var activeTab = $('#rrmtabTechnicalHead').find('li.active').attr('id')
        
    if (activeTab == "rrm_requirementTabTechnicalHead")
     {
            requirmentName = $("#sdtxt_rrmtechnicalhead_requirementname").dxTextBox('instance').option('value');
            requireFor =$("#sdtxt_rrmtechnicalhead_requiredfor").dxTextBox('instance').option('value');
            bde = $("#rrm_entrybdeTechnicalHead").val();
            if(bde==""){bde=null;}
            replacementFor = $("#rrm_replacementTechnicalHead").val();
            position = $("#sdnmb_rrmtechnicalhead_numberofpositions").dxNumberBox('instance').option('value');
            priority = $("#sdcmb_rrmtechnicalhead_priority").dxSelectBox('instance').option('value');
            department = $("#sdcmb_rrmtechnicalhead_department").dxSelectBox('instance').option('value');
            designation = $("#sdcmb_rrmtechnicalhead_designation").dxSelectBox('instance').option('value');
            experience = $("#rrm_experiencerequiredTechnicalHead").val();
            communication = $("#sdcmb_rrmtechnicalhead_communication").dxSelectBox('instance').option('value');
            reqlocation = $("#sdtxt_rrmtechnicalhead_location").dxTextBox('instance').option('value');
            requestedDate = $("#sd_date_rrmtechnicalhead_requestedDate").dxDateBox('instance').option('value');
            losingRevenue = $("#sdchk_rrmtechnicalhead_losingRevenue").dxCheckBox('instance').option('value');
            fromVIP = $("#sdchk_rrmtechnicalhead_fromVIP").dxCheckBox('instance').option('value');
            requirmentLead = $("#sdtxt_rrmtechnicalhead_requirementlead").dxTextBox('instance').option('value');

            if(reqlocation==""){reqlocation=null;}
            var finalRequestedDate = moment(requestedDate).format("DD-MM-YYYY");
            
            if(requirmentName == "" || requireFor==""||position==""||position=="0"||department==""||designation==""||experience==""||experience=="0")
            {
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
                     $('#rrm_departmentTecsdcmb_rrmtechnicalhead_departmenthnicalHead').removeClass('input-error');
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
                            $('#rrm_experiencerequiredTechnicalHead').addClass('input-error');
                            $('#rrm_experiencerequiredTechnicalHeadError').html("Select Experience");
                        }
                        else
                        {
                            $('#rrm_experiencerequiredTechnicalHead').removeClass('input-error');
                            $('#rrm_experiencerequiredTechnicalHeadError').html("");
                        }
                    }
                    if(experience=="0")
                    {
                        if(experience=="0")
                        {
                            $('#rrm_experiencerequiredTechnicalHead').addClass('input-error');
                            $('#rrm_experiencerequiredTechnicalHeadError').html("Min Experience is 1");
                    }
                    else
                    {
                        $('#rrm_experiencerequiredTechnicalHead').removeClass('input-error');
                        $('#rrm_experiencerequiredTechnicalHeadError').html("");
                    }
                }
            }
            
            $('.nav-tabs a[href="#rrm_requirementTabTechnicalHead"]').tab("show");
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
                    $('.nav-tabs a[href="#rrm_SkillDetailsTechnicalHead"]').tab("show");
                    $(".btnPrevious").show();
                    if (!IsRrmSaved) {
                        $(".saveFamilyBtn").hide();
                        $("a.btnNext").show();

                    }
                });
                // getSkillsDetails('"+RRMID+"');
                // getSkillsDetailseditfrm(RRMID);
                _editRRMEntryPointTechnicalHead.getSkillsDetails(RRMID);
                }
}
        
    if (activeTab == "rrm_skillsTabTechnicalHead") 
        {
            
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
                 $("#sd_txtEditor_technicalHead_skillDetailsPlanA").dxHtmlEditor('instance').option("value",planAcomments);
               
                  $(".btnPrevious").show();
                  if (!IsRrmSaved) 
                  {
                      $(".saveFamilyBtn").hide();
                      $("a.btnNext").show();
                  }
            }
        }
    
    if (activeTab == "rrm_skillsplanaTabTechnicalHead") 
    {
        skillDetailsA = $("#sd_txtEditor_technicalHead_skillDetailsPlanA").dxHtmlEditor('instance').option("value");
        $("#sd_txtEditor_technicalHead_skillDetailsPlanA").dxHtmlEditor('instance').option("value",planAcomments);
            var datecheck=0;
            toOnBoardA = $("#rrm_tobeonboardplanaTechnicalHead").val();
            requirtersA =$("#rrm_TechnicalHeadsplanaTechnicalHead").val();
            var edate = $("#rrm_tobeonboardplanaTechnicalHead").val();
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
                  $('#rrm_skilldetailsplanaTechnicalHeadn').addClass('input-error');
                  $('#rrm_skilldetailsplanaTechnicalHeadError').html("Enter Skill Details");
                } else{
                  $('#rrm_skilldetailsplanaTechnicalHeadn').removeClass('input-error');
                  $('#rrm_skilldetailsplanaTechnicalHeadError').html("");
                }
                if(toOnBoardA==""){
                    $('#rrm_tobeonboardplanaTechnicalHead').addClass('input-error');
                  $('#rrm_tobeonboardplanaError').html("Select Date");
                } else{
                    $('#rrm_tobeonboardplanaTechnicalHead').removeClass('input-error');
                    $('#rrm_tobeonboardplanaTechnicalHeadError').html("");
                }
                $('.nav-tabs a[href="#rrm_skillsplanaTabTechnicalHead"]').tab("show");

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
                    "Data": {
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
                    $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsTechnicalHead"]').tab("show");
                    $("#sd_txtEditor_technicalHead_skillDetailsPlanB").dxHtmlEditor('instance').option("value",planBcomments);
                });
               
              $(".btnPrevious").show();
              if (!IsRrmSaved) 
              {
                    $(".saveFamilyBtn").hide();
                    $("a.btnNext").show();
              }
            }
        }
    
    if (activeTab == "rrm_skillsplanbTabTechnicalHead") {
            var datecheck=0;
            skillDetailsB = $("#sd_txtEditor_technicalHead_skillDetailsPlanB").dxHtmlEditor('instance').option("value");
            toOnBoardB = $("#sd_date_rrm_technicalHead_tobeonboardplanb").dxDateBox('instance').option("value");
            requirtersB =$("#rrm_TechnicalHeadsplanbTechnicalHead").val();
            var edate = $("#sd_date_rrm_technicalHead_tobeonboardplanb").dxDateBox('instance').option("value");
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
                $('.nav-tabs a[href="#rrm_skillsplanbTabTechnicalHead"]').tab("show");
                
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
                    $('.nav-tabs a[href="#rrm_CommentsDetailsTechnicalHead"]').tab("show");

                    $(".btnPrevious").show();
                    if (!IsRrmSaved) {
                        $(".saveFamilyBtn").show();
                        _editRRMEntryPointTechnicalHead.getManageCommentHistory(ResourceRequirementId);
                        $("a.btnNext").hide();
                    }
                });
            }
        }
    
    }

 _editRRMEntryPointTechnicalHead.btnsendreminder = function (ResourceRequirementId) {
        
        var Comments = "Please assign a TechnicalHeads for this RRM "
        dataComments_fromrrm = {
            "Method": "PostCommentsInResourceRequirement",
            "Data": {
                "ResourceRequirementId": ResourceRequirementId,
                "Comments": Comments,
                "IsActive": 'True',

            }
        }
     //var resultComments = PostDataCall(dataComments_fromrrm);
     PostDataCallAsync(dataComments_fromrrm, function (resultComments) { });
     _editRRMEntryPointTechnicalHead.getManageCommentHistory(ResourceRequirementId);
    }

//bind getrrmbyid values in form
_editRRMEntryPointTechnicalHead.RRMEntryFromRRM = function (rrmid) {
 
    RRMID=rrmid;
    ResourceRequirementId=rrmid;
   // var getRRMData = callgetlist('GetRRMbyid','{"IsActive":"True","ResourceRequirementId":"'+rrmid+'","Token":"'+Token+'"}');
    callGetListAsync('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + rrmid + '","Token":"' + Token + '"}', function (getRRMData) {
        _editRRMEntryPointTechnicalHead.mapupdaterrmListcomputeHTML(getRRMData);
    });
}

//clear form data
_editRRMEntryPointTechnicalHead.clearAll = function(){
            $("#rrmnoTechnicalHead").text("");
            $("#sdtxt_rrmtechnicalhead_requirementname").dxTextBox('instance').option('value',"");
            $("#sdtxt_rrmtechnicalhead_requiredfor").dxTextBox('instance').option('value',"");
            $("#rrm_empidTechnicalHead").val("");
            $("#rrm_entrybdeTechnicalHead").val("");
            $("#sdnmb_rrmtechnicalhead_numberofpositions").dxNumberBox('instance').option('value',"");
            $("#sdcmb_rrmtechnicalhead_department").dxSelectBox('instance').option('value',"");
            $("#sdcmb_rrmtechnicalhead_designation").dxSelectBox('instance').option('value',"");
            $("#rrm_experiencerequiredTechnicalHead").val("");
            $("#sdtxt_rrmtechnicalhead_location").dxTextBox('instance').option('value',"");
            var date = new Date();
            var currentDate = date.toISOString().slice(0, 10);
            $("#sd_date_rrmtechnicalhead_requestedDate").dxDateBox('instance').option('value',currentDate);
            $("#sdtxt_rrmtechnicalhead_requirementlead").dxTextBox('instance').option('value',"");
            $("#rrm_tobeonboardplana").val("");
            var tdydate = new Date();
            tdydate.setDate(tdydate.getDate() + 1);
            var nxtDate = tdydate.toISOString().slice(0, 10);
            $("#sd_date_rrm_technicalHead_tobeonboardplanb").dxDateBox('instance').option("value",nxtDate);
            
            $("#sd_txtEditor_RRMTechnicalHeadComments").dxHtmlEditor('instance').option("value","");
            $("#sd_txtEditor_technicalHead_skillDetailsPlanA").dxHtmlEditor('instance').option("value","");
            $("#sd_txtEditor_technicalHead_skillDetailsPlanB").dxHtmlEditor('instance').option("value","");
}

//map update rrm List compute HTML
_editRRMEntryPointTechnicalHead.mapupdaterrmListcomputeHTML = function(getRRMData) {
        
    if (getRRMData[0].rrmid=="")
     {

     }
     else 
     {
        var data;
        var EmployeeId = null;
        getRRMData.forEach(function (key, item) {
            OnHoldByOwnerStatusTechnicalHead = key.OnHoldByOwner;
            OnHoldByClientStatusTechnicalHead = key.OnHoldByClient;
            if (OnHoldByClientStatusTechnicalHead == true || OnHoldByOwnerStatusTechnicalHead == true) {
                readOnlyFormDataTechnicalHead();
                $("#OwnerrrmHoldStatusTechnicalHead").html("On-Hold").addClass("label label-warning m-l-xs");
                if (OnHoldByOwnerStatusTechnicalHead == true) {
                    $("#switchLeadTechnicalHead").dxSwitch({
                        value: true,
                        disabled: true
                    });
                }
                if (OnHoldByClientStatusTechnicalHead == true) {
                    $("#switchClientTechnicalHead").dxSwitch({
                        value: true,
                        disabled: true
                    });
                }
            }
            else {
                $("#OwnerrrmHoldStatusTechnicalHead").attr('class', '');
                $("#OwnerrrmHoldStatusTechnicalHead").html('');
                $("#switchClientTechnicalHead").dxSwitch({
                    value: false,
                    disabled: false
                });
                $("#switchLeadTechnicalHead").dxSwitch({
                    value: false,
                    disabled: false
                });
            }
               $("#rrmmodelpagetitleTechnicalHead").text("Edit RRM - "+key.RRMNo);
               $("#sdtxt_rrmtechnicalhead_requirementname").dxTextBox('instance').option('value',key.RequirementName);
               $("#sdtxt_rrmtechnicalhead_requiredfor").dxTextBox('instance').option('value',key.RequiredFor);
                $("#rrm_empidTechnicalHead").val(key.EmployeeId);
                $("#sdcmb_rrmtechnicalhead_priority").dxSelectBox('instance').option('value',key.PriorityId);
               if(key.BDEName != " ")
               {
                   $("#rrm_entrybdeTechnicalHead").val(key.BDEName);
               }
               else
               {
                   $("#rrm_entrybdeTechnicalHead").val('');
               }
               $("#sdnmb_rrmtechnicalhead_numberofpositions").dxNumberBox('instance').option('value',key.NumberOfPositions);
               $("#sdcmb_rrmtechnicalhead_communication").dxSelectBox('instance').option('value',key.Communication);
                $("#sdcmb_rrmtechnicalhead_department").dxSelectBox('instance').option('value',key.DepartmentId);
                $("#sdcmb_rrmtechnicalhead_designation").dxSelectBox('instance').option('value',key.DesignationId);
                $("#rrm_experiencerequiredTechnicalHead").val(key.ExperiencerequiredInYrs);
                $("#sdtxt_rrmtechnicalhead_location").dxTextBox('instance').option('value',key.Location);
                var edate=key.RequestedDate;
                if(edate!=null){
                    var ed = edate;
                    $("#sd_date_rrmtechnicalhead_requestedDate").dxDateBox('instance').option('value',ed);

                }
                

               if (ResourceRequirementTypeTechHead == "G") {
                $("#sdtxt_rrmtechnicalhead_requirementlead").dxTextBox('instance').option('value',key.Owner);
               }
               else if (ResourceRequirementTypeTechHead == "P") {
                $("#sdtxt_rrmtechnicalhead_requirementlead").dxTextBox('instance').option('value',key.Owner);
               }
               else if (ResourceRequirementTypeTechHead == "R") {
                $("#sdtxt_rrmtechnicalhead_requirementlead").dxTextBox('instance').option('value',key.LeadName);
               }
                
               $("#sdnmb_rrmtechnicalhead_numberofpositions").dxNumberBox('instance').option('value',getRRMData[0].NumberOfPositions);
                planAcomments=key['PlanA-SkillPlanInfo'];
                planBcomments=key['PlanB-SkillPlanInfo'];
                hrComments=key.Comments;
                var edate=key['PlanA-OnBoardDate'];
                if(edate!=null)
                {
                var ed = edate;
                var enddateChanged= ed.replace(/\//g, "-");
                enddateChanged=enddateChanged.replace("T00:00:00","");
                enddateChanged = enddateChanged.split('-');
                enddateChanged=enddateChanged[0]+"-"+enddateChanged[1]+"-"+enddateChanged[2];
                    $("#rrm_tobeonboardplanaTechnicalHead").val(enddateChanged);
                }
                var edate=key['PlanB-OnBoardDate'];
                if(edate!=null)
                {
                var ed = edate;
                $("#sd_date_rrm_technicalHead_tobeonboardplanb").dxDateBox('instance').option("value",ed);
                }

                if(key.OwnerId == localStorage.getItem("EmployeeID")){
                    IsOwnerForSkill = true;
                }
                else{
                    IsOwnerForSkill = false;
                }
            
            }); 
    }
    _editRRMEntryPointTechnicalHead.getResourceRequirementSkillPlanAId();
    _editRRMEntryPointTechnicalHead.getResourceRequirementSkillPlanBId();

    }

    //To get Resource RequirementSkill PlanB Id
    _editRRMEntryPointTechnicalHead.getResourceRequirementSkillPlanAId = function () {
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
    _editRRMEntryPointTechnicalHead.getResourceRequirementSkillPlanBId = function () {
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
_editRRMEntryPointTechnicalHead.skillcomputeHTML = function(e) {   
       var html = "";
       if (e == null || e=="") {
           html = "<table id='myTable' class='skillemptytbl myTable_rrm TechnicalHead'>";
           html += "<tr>";
           html += "<th>Family</th>"
           html += "<th>Skills</th>"
           html += "<th>Version</th>"
           html += "<th>Action</th>"
           html += "</tr>";  
          html += "<tr><td colspan='4'>No Data..!</td></tr>";
        
     } else {
           var html = "<table id='myTable' class='myTable_rrm TechnicalHead'>";
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
             html += "<td><button class='btn edit-btn' id='editskillTechnicalHead' onclick=editRow_SkillMapping('" + skillId + "')><i class='fas fa-pencil-alt'></i></button>"
               html += "<button class='btn delete-btn' id='deleteskillTechnicalHead' onclick=_editRRMEntryPointTechnicalHead.deleteRow_SkillMapping('" + skillId + "')><i class='fas fa-trash-alt'></i></button></td>"
             html += "</tr>";
         }); 
      
       }
        return html;
} 

//tab previous btn evenet
_editRRMEntryPointTechnicalHead.toggleTabRRMEntryPrevious = function() {
    
    var activeTab = $('#rrmtabTechnicalHead').find('li.active').attr('id')

    if (activeTab == "rrm_skillsplanaTabTechnicalHead") 
    {
        $('.nav-tabs a[href="#rrm_SkillDetailsTechnicalHead"]').tab("show");
        $("a.btnNext").show();
        $(".saveFamilyBtn").hide();
    }
    
    if (activeTab == "rrm_skillsTabTechnicalHead") 
    {
        $('.nav-tabs a[href="#rrm_RequirementDetailsTechnicalHead"]').tab("show");
        $("a.btnNext").show();
        $(".saveFamilyBtn").hide();
        $(".btnPrevious").hide();
        _editRRMEntryPointTechnicalHead.updateresourcerequitementdata();
    }

    if (activeTab == "rrm_skillsplanbTabTechnicalHead") 
    {
        $('.nav-tabs a[href="#rrm_SkillsPlanADetailsTechnicalHead"]').tab("show");
        $("a.btnNext").show();
        $(".btnPrevious").show();
        $(".saveFamilyBtn").hide();
        
        var filter_valbtn = JSON.stringify({
        "IsActive": 'True',
			"Token":Token,
			"ResourceRequirementId":ResourceRequirementId,
            "ResourceRequirementSkillPlanId":ResourceRequirementSkillPlanId,
            "SkillPlan":'PlanA'
        });
    
       // var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
        callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {
            if (result != null) {
                $("#sd_txtEditor_technicalHead_skillDetailsPlanB").dxHtmlEditor('instance').option("value",result[0].SkillPlanInfo);
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

    if (activeTab == "rrm_commentsTechnicalHeadTabTechnicalHead") 
    {

        comments = $("#sd_txtEditor_technicalHead_skillDetailsPlanB").dxHtmlEditor('instance').option("value");

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
        $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsTechnicalHead"]').tab("show");
        
        var filter_valbtn = JSON.stringify({
            "IsActive": 'True',
          "Token":Token,
          "SkillPlans":'PlanB',
          "ResourceRequirementId":ResourceRequirementId
        });
        
        //var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
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
_editRRMEntryPointTechnicalHead.updateresourcerequitementdata = function(){
    //var getRRMData = callgetlist('GetRRMbyid','{"IsActive":"True","ResourceRequirementId":"'+ResourceRequirementId+'","Token":"'+Token+'"}');
    callGetListAsync('GetRRMbyid', 'GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + ResourceRequirementId + '","Token":"' + Token + '"}', function (getRRMData) {
        _editRRMEntryPointTechnicalHead.mapupdateaddrrmListcomputeHTML(getRRMData)
    });
}
  
  //bind rrm data from _addRRMEntryPoint.updateresourcerequitementdata function result
 _editRRMEntryPointTechnicalHead.mapupdateaddrrmListcomputeHTML = function(getRRMData){
  
         if (getRRMData[0].rrmid=="") {
  
        } else {
        var data;
            getRRMData.forEach(function (key, item) {
                $("#sdtxt_rrmtechnicalhead_requirementname").dxTextBox('instance').option('value',key.RequirementName);
                $("#sdtxt_rrmtechnicalhead_requiredfor").dxTextBox('instance').option('value',key.RequiredFor);
            $("#rrm_empidTechnicalHead").val(key.RequirementName);
            $("#rrm_entrybdeTechnicalHead").val(key.BDEName);
            $("#sdnmb_rrmtechnicalhead_numberofpositions").dxNumberBox('instance').option('value',key.NumberOfPositions);
            
            $("#sdcmb_rrmtechnicalhead_department").dxSelectBox('instance').option('value',key.DepartmentId);
            $("#rrm_experiencerequiredTechnicalHead").val(key.ExperiencerequiredInYrs);
            $("#sdtxt_rrmtechnicalhead_location").dxTextBox('instance').option('value',key.Location);
            var edate=key.RequestedDate;
            if(edate!=null){
                $("#sd_date_rrmtechnicalhead_requestedDate").dxDateBox('instance').option('value',ed);
            }
            $("#sdtxt_rrmtechnicalhead_requirementlead").dxTextBox('instance').option('value',key.LeadName);
           
           
            });
        }
}

//save hr commnets
    _editRRMEntryPointTechnicalHead.saveComments = function () {
        var finalComments = $("#sd_txtEditor_RRMTechnicalHeadComments").dxHtmlEditor('instance').option("value");
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
        $('#RRMEntryPointModelTechnicalHead').modal("hide");
    ResourceRequirementId=null;
    var rrmEntryGrid = RRMEntryPointGridOwner("TechnicalHead");
    rrmEntryGrid.getRRMEntryTable();
        _editRRMEntryPointTechnicalHead.clearAll();
        $('#rrm_SkillsPlanADetailsTechnicalHead').modal("hide");
}

//get skill details
_editRRMEntryPointTechnicalHead.getSkillsDetails = function(ResourceRequrimentId) {
    
    var filterData = JSON.stringify({
        "ResourceRequirementId": ResourceRequrimentId,
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
                _editRRMEntryPointTechnicalHead.insert_SkillInfoEntry(e);
            },
            onRowUpdated: function (e) {
                _editRRMEntryPointTechnicalHead.update_SkillInfoEntry(e);
            },
            onRowRemoved: function (e) {
                _editRRMEntryPointTechnicalHead.delete_SkillInfoEntry(e);
            }
        });
    });
}

_editRRMEntryPointTechnicalHead.insert_SkillInfoEntry = function (e) {
        
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
            _editRRMEntryPointTechnicalHead.skillsClearAndShow();
            _editRRMEntryPointTechnicalHead.getSkillsDetails(RRMID);
        }
    });
  }

  _editRRMEntryPointTechnicalHead.update_SkillInfoEntry = function (e) {
      
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
            _editRRMEntryPointTechnicalHead.skillsClearAndShow();
            _editRRMEntryPointTechnicalHead.getSkillsDetails(RRMID);
          }
      });       

  }

  _editRRMEntryPointTechnicalHead.delete_SkillInfoEntry = function (e) {
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
            _editRRMEntryPointTechnicalHead.skillsClearAndShow();
            _editRRMEntryPointTechnicalHead.getSkillsDetails(RRMID);
          }                    
      });   
  }

//get Manage Comment History
    _editRRMEntryPointTechnicalHead.getManageCommentHistory = function (ResourceRequirementId) {

        var filter_val = JSON.stringify({
            "ResourceRequirementId": ResourceRequirementId,
            "IsActive": 'True',
            "Token": Token
        });
      //  var getManageplanComments = callgetlist("GetCommentsInResourceRequirement", filter_val);
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
            $("#rrm_manage_plan_comments_documents_TechnicalHead").html(plan_comment_history_html);
            var div = document.getElementById('rrm_manage_plan_comments_documents_TechnicalHead');
            div.scrollTop = div.scrollHeight - div.clientHeight;
        });
    }
//skill data clear func
_editRRMEntryPointTechnicalHead.skillsClearAndShow = function() { // Clear our fields

    
    // document.getElementById("skillentry").value = "";

    // document.getElementById("skillentry").value = "";

    // document.getElementById("familyentry_fromrfp").value = "";
    // document.getElementById("skillentry_fromrfp").value = "";
    // document.getElementById("skillversionentryTechnicalHead_fromrfp").value = "";

    // document.getElementById("familyentry_fromresign").value = "";
    // document.getElementById("skillentry_fromresign").value = "";
    // document.getElementById("skillversionentryTechnicalHead_fromresign").value = "";
}

//get versions entry
_editRRMEntryPointTechnicalHead.get_versionsentry = function(skillentry_id) {
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
_editRRMEntryPointTechnicalHead.get_skillsentry = function(familyentry_id) {
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
        get_versionsentry("");
    });
}

return _editRRMEntryPointTechnicalHead;

});