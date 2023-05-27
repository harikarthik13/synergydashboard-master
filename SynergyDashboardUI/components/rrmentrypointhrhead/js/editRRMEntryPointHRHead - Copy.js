EditRRMEntryPointOwnerHrHead = (function () {
var _editRRMEntryPointHrHead = {};

var dataResource = [];
var dataPlanB = [];
var dataComments = [];
var ResourceRequrimentId;
var dataSkillApi = [];
var IsRrmSaved = false;
var RRMID;
var ResourceRequirementId;
var ResourceRequirementSkillPlanId=null;
var planAcomments;
var planBcomments;
var enddateChangedplanA;
var hrComments;
    var ResourceRequirementSkillPlanAId;
    var ResourceRequirementSkillPlanBId;
_editRRMEntryPointHrHead.initializeRRMByTechnical = function (rrmid) {

}

//tab next btn events
_editRRMEntryPointHrHead.toggleTabRRMEntry = function() { 
    
    try{
        CKEDITOR.instances['rrm_skilldetailsplanaHrHead'].destroy();
    } catch (e) {
    }
    var plana = CKEDITOR.replace('rrm_skilldetailsplanaHrHead', {});
    
    try{
        CKEDITOR.instances['rrm_skilldetailsplanbHrHead'].destroy();
    }catch (e) {
    }
    var planb = CKEDITOR.replace('rrm_skilldetailsplanbHrHead', {});
    
    try {
        CKEDITOR.instances['rrm_commentsHrHead'].destroy();
    } catch (e) {
    }
    var comments = CKEDITOR.replace('rrm_commentsHrHead', {});

    var activeTab = $('#rrmtabHrHead').find('li.active').attr('id')
        
    if (activeTab == "rrm_requirementTabHrHead")
     {
            requirmentName = $("#rrm_requirementnameHrHead").val();
            requireFor =$("#rrm_requiredforHrHead").val();
            bde = $("#rrm_entrybdeHrHead").val();
            if(bde==""){bde=null;}
            replacementFor = $("#rrm_replacementHrHead").val();
            position = $("#rrm_numberofpositionsHrHead").val();
            priority = $("#rrm_priorityHrHead").val();
            department = $("#rrm_departmentHrHead").val();
            designation = $("#rrm_designationHrHead").val();
            experience = $("#rrm_experiencerequiredHrHead").val();
            communication = $("#rrm_communicationHrHead").val();
            reqlocation = $("#rrm_locationforHrHead").val();
            requestedDate = $("#rrm_requesteddateHrHead").val();
            losingRevenue = $('#rrm_losingrevenueHrHead').prop('checked');
            fromVIP = $('#rrm_fromVIPHrHead').prop('checked');
            requirmentLead = $("#rrm_requirementleadHrHead").val();

            if(reqlocation==""){reqlocation=null;}
            var finalRequestedDate = moment(requestedDate).format("DD-MM-YYYY");
            
            if(requirmentName == "" || requireFor==""||position==""||position=="0"||department==""||designation==""||experience==""||experience=="0")
            {
                if (requirmentName == "") 
                {
                 $('#rrm_requirementnameHrHead').addClass('input-error');
                 $('#rrm_requirementnameHrHeadError').html("Enter Requirment Name");
                }
                else 
                {
                  $('#rrm_requirementnameHrHead').removeClass('input-error');
                  $('#rrm_requirementnameHrHeadError').html("");
                }
                if(requireFor=="")
                {
                  $('#rrm_requiredforHrHead').addClass('input-error');
                  $('#rrm_requiredforHrHeadError').html("Enter Required For");
                }
                else
                {
                  $('#rrm_requiredforHrHead').removeClass('input-error');
                  $('#rrm_requiredforHrHeadError').html("");
                } 
                if(position==""||position=="0")
                {
                     if(position=="")
                         {
                            if(position=="")
                            {
                                $('#rrm_numberofpositionsHrHead').addClass('input-error');
                                $('#rrm_numberofpositionsHrHeadError').html("Enter Position");
                            }
                            else
                            {
                                $('#rrm_numberofpositionsHrHead').removeClass('input-error');
                                $('#rrm_numberofpositionsHrHeadError').html("");
                            }
                        }
                    if(position=="0")
                    {
                        if(position=="0")
                        {
                            $('#rrm_numberofpositionsHrHead').addClass('input-error');
                            $('#rrm_numberofpositionsHrHeadError').html("Min Position is 1");
                        }
                        else
                        {
                            $('#rrm_numberofpositionsHrHead').removeClass('input-error');
                            $('#rrm_numberofpositionsHrHeadError').html("");
                        }
                    }
                }
               if(department=="")
               {
                     $('#rrm_departmentHrHead').addClass('input-error');
                     $('#rrm_departmentHrHeadError').html("Select Department");
               }
               else
               {
                     $('#rrm_departmentHrHead').removeClass('input-error');
                     $('#rrm_departmentHrHeadError').html("");
               }
             
                if(designation=="")
                {
                    $('#rrm_designationHrHead').addClass('input-error');
                    $('#rrm_designationHrHeadError').html("Select Designation");
                } 
                else
                {
                    $('#rrm_designationHrHead').removeClass('input-error');
                    $('#rrm_designationHrHeadError').html("");
                }
                if(experience==""||experience=="0")
                {
                   if(experience=="")
                   {  
                        if(experience=="")
                        {
                            $('#rrm_experiencerequiredHrHead').addClass('input-error');
                            $('#rrm_experiencerequiredHrHeadError').html("Select Experience");
                        }
                        else
                        {
                            $('#rrm_experiencerequiredHrHead').removeClass('input-error');
                            $('#rrm_experiencerequiredHrHeadError').html("");
                        }
                    }
                    if(experience=="0")
                    {
                        if(experience=="0")
                        {
                            $('#rrm_experiencerequiredHrHead').addClass('input-error');
                            $('#rrm_experiencerequiredHrHeadError').html("Min Experience is 1");
                    }
                    else
                    {
                        $('#rrm_experiencerequiredHrHead').removeClass('input-error');
                        $('#rrm_experiencerequiredHrHeadError').html("");
                    }
                }
            }
            
            $('.nav-tabs a[href="#rrm_requirementTabHrHead"]').tab("show");
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
                
            var resultResorce = PostDataCall(dataResource); 
                
                $('.nav-tabs a[href="#rrm_SkillDetailsHrHead"]').tab("show");
            $(".btnPrevious").show();
            if (!IsRrmSaved) 
                {
                    $(".saveFamilyBtn").hide();
                    $("a.btnNext").show();
    
                }
                // getSkillsDetails('"+RRMID+"');
                // getSkillsDetailseditfrm(RRMID);
                _editRRMEntryPointHrHead.getSkillsDetails(RRMID);
                $("#editskillHrHead").attr('disabled', 'disabled');
                $("#deleteskillHrHead").attr('disabled', 'disabled');
          }
}
        
    if (activeTab == "rrm_skillsTabHrHead") 
        {

            family = $("#familyentryHrHead").val();
            skills = $("#skillentry").val();
            version =$("#skillversionentryHrHead").val();
            
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
                 $('.nav-tabs a[href="#rrm_SkillsPlanADetailsHrHead"]').tab("show");
                 CKEDITOR.instances.rrm_skilldetailsplanaHrHead.setData(planAcomments);
               
                  $(".btnPrevious").show();
                  if (!IsRrmSaved) 
                  {
                      $(".saveFamilyBtn").hide();
                      $("a.btnNext").show();
                  }
            }
        }
    
    if (activeTab == "rrm_skillsplanaTabHrHead") 
    {
        skillDetailsA = CKEDITOR.instances.rrm_skilldetailsplanaHrHead.getData();
            CKEDITOR.instances.rrm_skilldetailsplanaHrHead.setData(planAcomments);
            var datecheck=0;
            
            toOnBoardA = $("#rrm_tobeonboardplanaHrHead").val();
            requirtersA =$("#rrm_HrHeadsplanaHrHead").val();
            var edate = $("#rrm_tobeonboardplanaHrHead").val();
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
                  $('#rrm_skilldetailsplanaHrHeadn').addClass('input-error');
                  $('#rrm_skilldetailsplanaHrHeadError').html("Enter Skill Details");
                } else{
                  $('#rrm_skilldetailsplanaHrHeadn').removeClass('input-error');
                  $('#rrm_skilldetailsplanaHrHeadError').html("");
                }
                if(toOnBoardA==""){
                    $('#rrm_tobeonboardplanaHrHead').addClass('input-error');
                  $('#rrm_tobeonboardplanaError').html("Select Date");
                } else{
                    $('#rrm_tobeonboardplanaHrHead').removeClass('input-error');
                    $('#rrm_tobeonboardplanaHrHeadError').html("");
                }
                $('.nav-tabs a[href="#rrm_skillsplanaTabHrHead"]').tab("show");
                try {
                 CKEDITOR.instances['rrm_skilldetailsplanbHrHead'].destroy();
                } catch (e) { 
                }  

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
                        "RecruiterId": requirtersA,
                        "IsActive": 'True'
                    }
                  }

              var resulPlanBt = PostDataCall(dataPlanA_frmrrm);
              $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsHrHead"]').tab("show");
              CKEDITOR.instances.rrm_skilldetailsplanbHrHead.setData(planBcomments);
               
              $(".btnPrevious").show();
              if (!IsRrmSaved) 
              {
                    $(".saveFamilyBtn").hide();
                    $("a.btnNext").show();
              }
            }
        }
    
    if (activeTab == "rrm_skillsplanbTabHrHead") {
            var datecheck=0;
            skillDetailsB = CKEDITOR.instances.rrm_skilldetailsplanbHrHead.getData();
            toOnBoardB = $("#rrm_tobeonboardplanbHrHead").val();
            requirtersB =$("#rrm_HrHeadsplanbHrHead").val();
            var edate = $("rrm_tobeonboardplanbHrHead").val();
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
                  $('#rrm_skilldetailsplanbHrHead').addClass('input-error');
                  $('#rrm_skilldetailsplanbHrHeadError').html("Enter Skill Details");
                } else{
                  $('#rrm_skilldetailsplanbHrHead').removeClass('input-error');
                  $('#rrm_skilldetailsplanbHrHeadError').html("");
                }
                if(toOnBoardB==""){
                  $('#rrm_tobeonboardplanbHrHead').addClass('input-error');
                  $('#rrm_tobeonboardplanbHrHeadError').html("Select Date");
                } else{
                  $('#rrm_tobeonboardplanbHrHead').removeClass('input-error');
                  $('#rrm_tobeonboardplanbHrHeadError').html("");
                }
                $('.nav-tabs a[href="#rrm_skillsplanbTabHrHead"]').tab("show");
                try {
                 CKEDITOR.instances['rrm_skilldetailsplanbHrHead'].destroy();
             } catch (e) { 
           
             }
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
                        "RecruiterId": requirtersB,
                        "IsActive": 'True'
                    }
                  }
                  
                var resulPlanBt = PostDataCall(dataPlanB);
                $('.nav-tabs a[href="#rrm_CommentsDetailsHrHead"]').tab("show");
                //CKEDITOR.instances.rrm_commentsHrHead.setData(hrComments);
                $(".btnPrevious").show();
                if (!IsRrmSaved) {
                    $(".saveFamilyBtn").show();
                    _editRRMEntryPointHrHead.getManageCommentHistory(ResourceRequirementId);
                    $("a.btnNext").hide();
                }
            }
        }
    
    }

 _editRRMEntryPointHrHead.btnsendreminder = function (ResourceRequirementId) {
        
        var Comments = "Please assign a HrHeads for this RRM "
        dataComments_fromrrm = {
            "Method": "PostCommentsInResourceRequirement",
            "Data": {
                "ResourceRequirementId": ResourceRequirementId,
                "Comments": Comments,
                "IsActive": 'True',

            }
        }
      var resultComments = PostDataCall(dataComments_fromrrm);
     _editRRMEntryPointHrHead.getManageCommentHistory(ResourceRequirementId);
    }

//bind getrrmbyid values in form
_editRRMEntryPointHrHead.RRMEntryFromRRM = function (rrmid) {
 
    RRMID=rrmid;
    ResourceRequirementId=rrmid;
    var getRRMData = callgetlist('GetRRMbyid','{"IsActive":"True","ResourceRequirementId":"'+rrmid+'","Token":"'+Token+'"}');
    _editRRMEntryPointHrHead.mapupdaterrmListcomputeHTML(getRRMData);
    
}

//clear form data
_editRRMEntryPointHrHead.clearAll = function(){
            $("#rrmnoHrHead").text("");
            $("#rrm_requirementnameHrHead").val("");
            $("#rrm_requiredforHrHead").val("");
            $("#rrm_empidHrHead").val("");
            $("#rrm_entrybdeHrHead").val("");
            $("#rrm_numberofpositionsHrHead").val("");

            $("#rrm_departmentHrHead").val("");
            $("#rrm_designationHrHead").val("");
            $("#rrm_experiencerequiredHrHead").val("");
            $("#rrm_locationforHrHead").val("");
            $("#rrm_requesteddateHrHead").val("");
            $("#rrm_requirementleadHrHead").val("");
            $("#rrm_numberofpositionsHrHead").val("");
            $("#rrm_tobeonboardplana").val("");
            $("#rrm_tobeonboardplanbHrHead").val("");
            
            CKEDITOR.instances.rrm_commentsHrHead.setData("");
            CKEDITOR.instances.rrm_skilldetailsplanaHrHead.setData("");
            CKEDITOR.instances.rrm_skilldetailsplanbHrHead.setData("");
}

//map update rrm List compute HTML
_editRRMEntryPointHrHead.mapupdaterrmListcomputeHTML = function(getRRMData) {
        
    if (getRRMData[0].rrmid=="")
     {

     }
     else 
     {
        var data;
        var EmployeeId = null;
           getRRMData.forEach(function (key, item) {
               $("#rrmmodelpagetitleHrHead").text("Edit RRM - "+key.RRMNo);
                $("#rrm_requirementnameHrHead").val(key.RequirementName);
                $("#rrm_requiredforHrHead").val(key.RequiredFor);
                $("#rrm_empidHrHead").val(key.EmployeeId);
               $("rrm_priorityHrHead").val(key.PriorityId);
               if(key.BDEName != " ")
               {
                   $("#rrm_entrybdeHrHead").val(key.BDEName);
               }
               else
               {
                   $("#rrm_entrybdeHrHead").val('');
               }
                $("#rrm_numberofpositionsHrHead").val(key.NumberOfPositions);
                $("#rrm_communicationHrHead").val(key.Communication);
                $("#rrm_departmentHrHead").val(key.DepartmentId);
                $("#rrm_designationHrHead").val(key.DesignationId);
                $("#rrm_experiencerequiredHrHead").val(key.ExperiencerequiredInYrs);
                $("#rrm_locationforHrHead").val(key.Location);
                var edate=key.RequestedDate;
                if(edate!=null){
                    var ed = edate;
                    var enddateChanged= ed.replace(/\//g, "-");
                    enddateChanged=enddateChanged.replace("T00:00:00","");
                    enddateChanged = enddateChanged.split('-');
                    enddateChanged=enddateChanged[0]+"-"+enddateChanged[1]+"-"+enddateChanged[2];
                    $("#rrm_requesteddateHrHead").val(enddateChanged);

                }
                $("#rrm_requirementleadHrHead").val(key.LeadName);
                
                $("#rrm_numberofpositionsHrHead").val(getRRMData[0].NumberOfPositions);
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
                    $("#rrm_tobeonboardplanaHrHead").val(enddateChanged);
                }
                var edate=key['PlanB-OnBoardDate'];
                if(edate!=null)
                {
                var ed = edate;
                var enddateChanged= ed.replace(/\//g, "-");
                enddateChanged=enddateChanged.replace("T00:00:00","");
                enddateChanged = enddateChanged.split('-');
                enddateChanged=enddateChanged[0]+"-"+enddateChanged[1]+"-"+enddateChanged[2];
                $("#rrm_tobeonboardplanbHrHead").val(enddateChanged);
                }
            
            }); 
    }

    _editRRMEntryPointHrHead.getResourceRequirementSkillPlanAId();
    _editRRMEntryPointHrHead.getResourceRequirementSkillPlanBId();

    }

    //To get Resource RequirementSkill PlanB Id
    _editRRMEntryPointHrHead.getResourceRequirementSkillPlanAId = function () {
        var dataResourceGetSkillId = JSON.stringify({
            "Token": Token,
            "ResourceRequirementId": ResourceRequirementId,
            "SkillPlans": "PlanA",
            "IsActive": "True"
        });

        var result = callgetlist('GetResourceRequrimentSkillPlans', dataResourceGetSkillId);
        if (result != null || result != "") {
            ResourceRequirementSkillPlanAId = result[0].ResourceRequirementSkillPlanId;
        }
    }

    //To get Resource RequirementSkill PlanB Id
    _editRRMEntryPointHrHead.getResourceRequirementSkillPlanBId = function () {
        var dataResourceGetSkillId = JSON.stringify({
            "Token": Token,
            "ResourceRequirementId": ResourceRequirementId,
            "SkillPlans": "PlanB",
            "IsActive": "True"
        });

        var result = callgetlist('GetResourceRequrimentSkillPlans', dataResourceGetSkillId);
        if (result != null || result != "") {
            ResourceRequirementSkillPlanBId = result[0].ResourceRequirementSkillPlanId;
        }
    }

//skill mapping
_editRRMEntryPointHrHead.skillcomputeHTML = function(e) {   
       var html = "";
       if (e == null || e=="") {
           html = "<table id='myTable' class='skillemptytbl myTable_rrm HrHead'>";
           html += "<tr>";
           html += "<th>Family</th>"
           html += "<th>Skills</th>"
           html += "<th>Version</th>"
           html += "<th>Action</th>"
           html += "</tr>";  
          html += "<tr><td colspan='4'>No Data..!</td></tr>";
        
     } else {
           var html = "<table id='myTable' class='myTable_rrm HrHead'>";
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
             html += "<td><button class='btn edit-btn' id='editskillHrHead' onclick=editRow_SkillMapping('" + skillId + "')><i class='fas fa-pencil-alt'></i></button>"
               html += "<button class='btn delete-btn' id='deleteskillHrHead' onclick=_editRRMEntryPointHrHead.deleteRow_SkillMapping('" + skillId + "')><i class='fas fa-trash-alt'></i></button></td>"
             html += "</tr>";
         }); 
      
       }
        return html;
} 

//tab previous btn evenet
_editRRMEntryPointHrHead.toggleTabRRMEntryPrevious = function() {
    
    var activeTab = $('#rrmtabHrHead').find('li.active').attr('id')

    if (activeTab == "rrm_skillsplanaTabHrHead") 
    {
        $('.nav-tabs a[href="#rrm_SkillDetailsHrHead"]').tab("show");
        $("a.btnNext").show();
        $(".saveFamilyBtn").hide();
    }
    
    if (activeTab == "rrm_skillsTabHrHead") 
    {
        $('.nav-tabs a[href="#rrm_RequirementDetailsHrHead"]').tab("show");
        $("a.btnNext").show();
        $(".saveFamilyBtn").hide();
        $(".btnPrevious").hide();
        _editRRMEntryPointHrHead.updateresourcerequitementdata();
    }

    if (activeTab == "rrm_skillsplanbTabHrHead") 
    {
        $('.nav-tabs a[href="#rrm_SkillsPlanADetailsHrHead"]').tab("show");
        $("a.btnNext").show();
        $(".btnPrevious").show();
        $(".saveFamilyBtn").hide();
        
        var filter_valbtn = JSON.stringify({
        "IsActive": 'True',
			"Token":Token,
			"ResourceRequirementId":ResourceRequirementId,
            "SkillPlan":'PlanA'
        });
    
        var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
    
        if(result!=null)
            {   
                CKEDITOR.instances.rrm_skilldetailsplanbHrHead.setData(result[0].SkillPlanInfo);
                var edate=result[0].ToBeOnBoard;
                var ed = edate;
                var enddateChanged= ed.replace(/\//g, "-");
                enddateChanged=enddateChanged.replace("T00:00:00","");
                enddateChanged = enddateChanged.split('-');
                enddateChanged=enddateChanged[0]+"-"+enddateChanged[1]+"-"+enddateChanged[2];

            $("#rrm_tobeonboardplanaHrHead").val(enddateChanged);
                ResourceRequirementSkillPlanId=result[0].ResourceRequirementSkillPlanId;
            }
    }

    if (activeTab == "rrm_commentsHrHeadTabHrHead") 
    {

        comments = CKEDITOR.instances.rrm_skilldetailsplanbHrHead.getData();

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
        $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsHrHead"]').tab("show");
        
        var filter_valbtn = JSON.stringify({
            "IsActive": 'True',
          "Token":Token,
          "SkillPlans":'PlanB',
          "ResourceRequirementId":ResourceRequirementId
        });
        
        var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
        if(result!=null)
        {
            CKEDITOR.instances.rrm_skilldetailsplanbHrHead.setData(result[0].SkillPlanInfo);
            var edate=result[0].ToBeOnBoard;
            var ed = edate;
            var enddateChanged= ed.replace(/\//g, "-");
            enddateChanged=enddateChanged.replace("T00:00:00","");
            enddateChanged = enddateChanged.split('-');
            enddateChanged=enddateChanged[0]+"-"+enddateChanged[1]+"-"+enddateChanged[2];
            $("#rrm_tobeonboardplanbHrHead").val(enddateChanged);
            ResourceRequirementSkillPlanId=result[0].ResourceRequirementSkillPlanId;
        }
    }
}

// get rrm detials by id
_editRRMEntryPointHrHead.updateresourcerequitementdata = function(){
    var getRRMData = callgetlist('GetRRMbyid','{"IsActive":"True","ResourceRequirementId":"'+ResourceRequirementId+'","Token":"'+Token+'"}');
    _editRRMEntryPointHrHead.mapupdateaddrrmListcomputeHTML(getRRMData)
}
  
  //bind rrm data from _addRRMEntryPoint.updateresourcerequitementdata function result
 _editRRMEntryPointHrHead.mapupdateaddrrmListcomputeHTML = function(getRRMData){
  
         if (getRRMData[0].rrmid=="") {
  
        } else {
        var data;
            getRRMData.forEach(function (key, item) {
            $("#rrm_requirementnameHrHead").val(key.RequirementName);
            $("#rrm_requiredforHrHead").val(key.RequiredFor);
            $("#rrm_empidHrHead").val(key.RequirementName);
            $("#rrm_entrybdeHrHead").val(key.BDEName);
            $("#rrm_numberofpositionsHrHead").val(key.NumberOfPositions);
            
            $("#rrm_departmentHrHead").val(key.DepartmentId);
            $("#rrm_experiencerequiredHrHead").val(key.ExperiencerequiredInYrs);
            $("#rrm_locationforHrHead").val(key.Location);
            var edate=key.RequestedDate;
            if(edate!=null){
            var ed = edate;
            var enddateChanged= ed.replace(/\//g, "-");
            enddateChanged=enddateChanged.replace("T00:00:00","");
            enddateChanged = enddateChanged.split('-');
            enddateChanged=enddateChanged[0]+"-"+enddateChanged[1]+"-"+enddateChanged[2];
            $("#rrm_requesteddateHrHead").val(enddateChanged);
            }
            $("#rrm_requirementleadHrHead").val(key.LeadName);
           // $("#rrm_numberofpositionsHrHead").val(getRRMData[0].NumberOfPositions);
           
            });
        }
}

//save hr commnets
    _editRRMEntryPointHrHead.saveComments = function () {
        
        var finalComments = CKEDITOR.instances.rrm_commentsHrHead.getData();
        if (finalComments != "") {
            dataComments = {
                "Method": "PostCommentsInResourceRequirement",
                "Data": {
                    "ResourceRequirementId": ResourceRequirementId,
                    "Comments": finalComments,
                    "IsActive": 'True',
                }
        }
            var resultComments = PostDataCall(dataComments);
            swal({
                title: "Success!",
                text: "Saved Successfully!",
                icon: "success",
                button: "ok!",
            })
    }
        $('#RRMEntryPointModelHrHead').modal("hide");
    ResourceRequirementId=null;
    var rrmEntryGrid = RRMEntryPointGridOwner("HrHead");
    rrmEntryGrid.getRRMEntryTable();
        _editRRMEntryPointHrHead.clearAll();
        $('#rrm_SkillsPlanADetailsHrHead').modal("hide");
}

//edit skill mapping
_editRRMEntryPointHrHead.editRow_SkillMapping = function(SkillId) {

    var skillid = SkillId;
    var SkillFamily1 = jQuery("#row_" + SkillId + " td .family").val();
    var Skill1 = jQuery("#row_" + SkillId + " td .skill_type").val();
    var SkillVersion1 = jQuery("#row_" + SkillId + " td .version").val();

    $("#familyentryHrHead").val(SkillFamily1);
    $("#skillentry").val(Skill1);
    $("#skillversionentryHrHead").val(SkillVersion1);

    var parent_fielset1 = jQuery("fieldset.previous_employer1_field");
    parent_fielset1.find("#familyentryHrHead").val(SkillFamily1);
    $("#familyentryHrHead").val(SkillFamily1);

    jQuery("#SkillsetsBtnEntryHrHead").attr("onclick", "insert_SkillInfoEntry('" + skillid + "')");
}

//delete skill mapping
_editRRMEntryPointHrHead.deleteRow_SkillMapping =function(SkillId) {
    if (confirm('Are you sure do you want to delete?')) 
    {
       var skillId = SkillId;

        if ($("#SkillsetsBtnEntryHrHead").attr("data-id")) {
            var dataId = $("#SkillsetsBtnEntryHrHead").attr("data-id");
            if (dataId == skillId) {
                if ($.trim($("#familyentryHrHead")) != "") {
                    $("#familyentryHrHead").val("");
                }
                if ($.trim($("#skillentry")) != "") {
                    $("#skillentry").val("");
                }
                if ($.trim($("#skillversionentryHrHead")) != "") {
                    $("#skillversionentryHrHead").val("");
                }
                jQuery("#SkillsetsBtnEntryHrHead").attr("onclick", "insert_SkillInfoEntry('" + skillId + "')");
                jQuery("#SkillsetsBtnEntryHrHead").attr("data-id", "");
            }
        }

        data = {
            "Method": "DeleteResourceRequrirementSkill",
            "Data": {
                "ResourceRequirementSkillId": SkillId,
                "Token":Token,
                "IsActive":0

            }
        }
        var postCall = PostDataCall(data);
        jQuery(".status").attr("class", "status");
        jQuery(".status").html("");
        jQuery(".status").show();
        if (postCall['IsSuccess'] == true) 
        {
            jQuery(".status").addClass("data_success");
            jQuery(".status").html(postCall['Message']);
            var row_class = $('#row_' + EmployerId).attr('class');
            jQuery('#row_' + SkillId).remove();
            var GetSkillList = getSkillsDetails();
            messageBox.innerHTML = skillcomputeHTML(GetSkillList);
        }
         else
          {
            jQuery(".status").addClass("data_error");
            jQuery(".status").html(postCall['Message']);
          }
        setTimeout(function() {
            $(".status").fadeOut("slow", function() {
                $(".status").html("");
            });
        }, 2500);
    }
}

//get skill details
_editRRMEntryPointHrHead.getSkillsDetails = function(ResourceRequrimentId) {
    
    var filter_val = JSON.stringify({
        "ResourceRequirementId": ResourceRequrimentId,
        "IsActive": "True",
        "Token":Token
    });
    //var GetSkillList = callGetListSync('GetResourceRequrirementSkill', filter_val);
    callGetListSync('GetResourceRequrirementSkill',filter_val, function(e){
        
        var skillsListHtml = _editRRMEntryPointHrHead.skillcomputeHTML(e);
        $('#rrmdisplay_SkillsEntryHrHead').html(skillsListHtml);
    })
    // var skillsListHtml = _editRRMEntryPointHrHead.skillcomputeHTML(e);
    //     $('#display_SkillsEntry').html(skillsListHtml);
}

//get Manage Comment History
_editRRMEntryPointHrHead.getManageCommentHistory = function(ResourceRequirementId) {
    
    var filter_val = JSON.stringify({
      "ResourceRequirementId": ResourceRequirementId,
      "IsActive": 'True',
      "Token":Token
    });
    var getManageplanComments = callgetlist("GetCommentsInResourceRequirement", filter_val);
    
    var plan_comment_history_html = "";
    var plan_no_comments_count = 0;
    var plan_no_documentsCount = 0;
    getManageplanComments.forEach(function (item) 
    {
      var plan_created_date = new Date(item.CreatedDate);
      var plan_date_month_year = convert(plan_created_date);
      var plan_time = plan_created_date.toLocaleTimeString();
     plan_comment_history_html += "<small class='pull-left' style='padding-top:5px'><span>" + item.CreatedByName + ":</span></small>";
     plan_comment_history_html += "<div class='manage_comment'>";
     plan_comment_history_html += "<small class='pull-right'><span>" + plan_date_month_year + "</span><span>" + plan_time + "</span></small>";
     plan_comment_history_html += "<small style='padding-bottom:10px'>"+item.Comments+"</small>";
  if(item.DocumentName!=null)
  {	
       plan_comment_history_html += "<b>Download-file: </b><button class='btn btn-primary btn-xs' onclick=downloadDocumentRPM('" + item.BenchToBillingPlanId + "')><span class='glyphicon glyphicon-arrow-down'></span></button><span style='padding:10px;'><b>" + item.DocumentName + "." + item.Extension + " </b></span></div>";
  }
  else
   {
   plan_comment_history_html += "</div>";
   }	
   });
    $("#rrm_manage_plan_comments_documents_HrHead").html(plan_comment_history_html);
}

//skill data clear func
_editRRMEntryPointHrHead.skillsClearAndShow = function() { // Clear our fields

    $("familyentryHrHead").value = "";
    $("skillentry").value = "";
    $("skillversionentryHrHead").value = "";

    // document.getElementById("familyentryHrHead").value = "";
    // document.getElementById("skillentry").value = "";
    // document.getElementById("skillversionentryHrHead").value = "";

    // document.getElementById("familyentryHrHead").value = "";
    // document.getElementById("skillentry").value = "";
    // document.getElementById("skillversionentryHrHead").value = "";

    // document.getElementById("familyentry_fromrfp").value = "";
    // document.getElementById("skillentry_fromrfp").value = "";
    // document.getElementById("skillversionentryHrHead_fromrfp").value = "";

    // document.getElementById("familyentry_fromresign").value = "";
    // document.getElementById("skillentry_fromresign").value = "";
    // document.getElementById("skillversionentryHrHead_fromresign").value = "";
}

//get versions entry
_editRRMEntryPointHrHead.get_versionsentry = function(skillentry_id) {
    var skillentry_id = skillentry_id;
    var filter_val = JSON.stringify({
        "SkillId": skillentry_id
    });
    var result = callgetlist('GetSkillVersions', filter_val);

    var options = "<option value=''>Select Skill Version</option>";
    for (var i = 0; i < result.length; i++) {
        options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
    }
    $("#skillversionentryHrHead").html(options);

}

//get skill entry
_editRRMEntryPointHrHead.get_skillsentry = function(familyentry_id) {
    var familyentry_id = familyentry_id;
    var filter_val = JSON.stringify({
        "FamilyId": familyentry_id
    });
    var result = callgetlist('GetSkills', filter_val);
    var options = "<option value=''>Select Skills</option>";
    for (var i = 0; i < result.length; i++) {
        options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
    }
    $("#skillentry").html(options);
    get_versionsentry("");
}

//insert skill entry
_editRRMEntryPointHrHead.insert_SkillInfoEntry = function() {
    var skill_version = $("skillversionentryHrHead").value;
    var family = $("familyentry").value;
    var skill = $("skillentry").value;
    
    if (family == "" || skill == "") {

        if (family == "") {
            $('#familyentry_error').html("Select Family");
            $('#familyentry').addClass('input-error');
        } else {
            $('#familyentry_error').html("");
            $('#familyentry').removeClass('input-error');
        }
        if (skill == "") {
            $('#skillentry_error').html("Select Skills");
            $('#skillentry').addClass('input-error');
        } else {
            $('#skillentry_error').html(" ");
            $('#skillentry').removeClass('input-error');
        }

    }
    if (family != "" && skill != "") {

        $('#familyentry_error').html("");
        $('#familyentry').removeClass('input-error');
        $('#skillentry_error').html(" ");
        $('#skillentry').removeClass('input-error');

        var data = [];
        //      if (SkillId)
                  {
                //alert(1);
                data = {
                  "Method": "PostResourceRequirementSkillMappings",
                  "Data": {
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
              var postCall = PostDataCall(data);
      
  
              $(".skillset_status").attr("class", "skillset_status");
              $(".skillset_status").html("");
              $(".skillset_status").show();
          
              if (postCall['IsSuccess'] == true) {
                $(".skillset_status").addClass("data_success");
                // if (SkillId) {
                  // $(".skillset_status").html(postCall['Message']);
                // } else {
                  // $(".skillset_status").html(postCall['Message']);
                // }
               $(".skillset_status").html(postCall['Message']);
               
            } else {

           //   
            }
        

        } 

    jQuery("#SkillsetsBtnEntryHrHead").attr("data-id", "");
    jQuery("#SkillsetsBtnEntryHrHead").attr("onclick", "insert_SkillInfoEntry()");

   _editRRMEntryPointHrHead.skillsClearAndShow();
    _editRRMEntryPointHrHead.getSkillsDetails(RRMID);

}

return _editRRMEntryPointHrHead;

});