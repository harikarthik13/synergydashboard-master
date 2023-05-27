EditRRMEntryPointOwnerRecruiter = (function () {
    var _editRRMEntryPointRecruiter = {};
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
    var OnHoldByOwnerStatusRecruiter = false;
    var OnHoldByClientStatusRecruiter = false;

var IsOwnerForSkill = false;

_editRRMEntryPointRecruiter.initializeRRMByTechnical = function (rrmid) {
    
}

//tab next btn events
_editRRMEntryPointRecruiter.toggleTabRRMEntry = function() { 

    var activeTab = $('#rrmtabRecruiter').find('li.active').attr('id')
        
    if (activeTab == "rrm_requirementTabRecruiter")
     {
      $('.nav-tabs a[href="#rrm_SkillDetailsRecruiter"]').tab("show");
      $(".btnPrevious").show();
                 $(".saveFamilyBtn").hide();
                 $("a.btnNext").show();
         _editRRMEntryPointRecruiter.getSkillsDetails(RRMID);
         $("#editskillrecruiter").attr('disabled', 'disabled');
         $("#deleteskillrecruiter").attr('disabled', 'disabled');
     }

    if (activeTab == "rrm_skillsTabRecruiter") 
    {
        $('.nav-tabs a[href="#rrm_SkillsPlanADetailsRecruiter"]').tab("show");
        $("#sd_txtEditorRecruiter_skillDetailsPlanA").dxHtmlEditor('instance').option("value",planAcomments);
                  $(".btnPrevious").show();
                      $(".saveFamilyBtn").hide();
                      $("a.btnNext").show();
        }

    if (activeTab == "rrm_skillsplanaTabRecruiter") 
    {
        $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsRecruiter"]').tab("show");
        $("#sd_txtEditorRecruiter_skillDetailsPlanB").dxHtmlEditor('instance').option("value",planBcomments);
              
              $(".btnPrevious").show();
                    $(".saveFamilyBtn").hide();
                    $("a.btnNext").show();
    }
    
    if (activeTab == "rrm_skillsplanbTabRecruiter") {

       $('.nav-tabs a[href="#rrm_CommentsDetailsRecruiter"]').tab("show");
       //CKEDITOR.instances.rrm_commentsrecruiter.setData(hrComments);
       $(".btnPrevious").show();
               $(".saveFamilyBtn").show();
                _editRRMEntryPointRecruiter.getManageCommentHistory(ResourceRequirementId);
                $("a.btnNext").hide();
      }
      resetSimpleBarRRMEntryPointRecruiter();
   }

 _editRRMEntryPointRecruiter.btnsendreminder = function (ResourceRequirementId) {
        
        var Comments = "Please assign a recruiters for this RRM "
        dataComments_fromrrm = {
            "Method": "PostCommentsInResourceRequirement",
            "Data": {
                "ResourceRequirementId": ResourceRequirementId,
                "Comments": Comments,
                "IsActive": 'True',

            }
        }
     //var resultComments = PostDataCall(data);
     PostDataCallAsync(data, function (resultComments) {
     });
     _editRRMEntryPointRecruiter.getManageCommentHistory(ResourceRequirementId);
    }

//bind getrrmbyid values in form
_editRRMEntryPointRecruiter.RRMEntryFromRRM = function (rrmid) {
 
    RRMID=rrmid;
    ResourceRequirementId=rrmid;
   // var getRRMData = callgetlist('GetRRMbyid','{"IsActive":"True","ResourceRequirementId":"'+rrmid+'","Token":"'+Token+'"}');
    callGetListAsync('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + rrmid + '","Token":"' + Token + '"}', function (getRRMData) {
        _editRRMEntryPointRecruiter.mapupdaterrmListcomputeHTML(getRRMData);
    });
    
}

//clear form data
_editRRMEntryPointRecruiter.clearAll = function(){
            $("#rrmnorecruiter").text("");
            $("#sdtxt_rrmrecruiter_requirementname").dxTextBox('instance').option('value',"");
            $("#sdtxt_rrmrecruiter_requiredfor").dxTextBox('instance').option('value',"");
            $("#rrm_empidrecruiter").val("");
            $("#rrm_entrybderecruiter").val("");
            $("#sdnmb_rrmrecruiter_numberofpositions").dxNumberBox('instance').option('value',"");

            $("#sdcmb_rrmrecruiter_department").dxSelectBox('instance').option('value',"");
            $("#sdcmb_rrmrecruiter_designation").dxSelectBox('instance').option('value',"");
            $("#sdnmb_rrmrecruiter_experiencerequired").dxNumberBox('instance').option('value',"");
            $("#sdtxt_rrmrecruiter_location").dxTextBox('instance').option('value',"");
            var date = new Date();
            var currentDate = date.toISOString().slice(0, 10);
            $("#sd_date_rrmrecruiter_requestedDate").dxDateBox('instance').option('value',currentDate);
            $("#sdtxt_rrmrecruiter_requirementlead").dxTextBox('instance').option('value',"");
            $("#rrm_tobeonboardplana").val("");
            $("#rrm_tobeonboardplanbrecruiter").val("");
            
            $("#sd_txtEditor_RRMRecruiterComments").dxHtmlEditor('instance').option("value","");
            $("#sd_txtEditorRecruiter_skillDetailsPlanA").dxHtmlEditor('instance').option("value","");
            $("#sd_txtEditorRecruiter_skillDetailsPlanB").dxHtmlEditor('instance').option("value","");
}

//map update rrm List compute HTML
_editRRMEntryPointRecruiter.mapupdaterrmListcomputeHTML = function(getRRMData) {
        
    if (getRRMData[0].rrmid == "") {
        //not yet
    }
    else {
        var data;
        var EmployeeId = null;
        getRRMData.forEach(function (key, item) {
            $("#rrmRequiterStatus").text(key.Status);
            OnHoldByOwnerStatusRecruiter = key.OnHoldByOwner;
            OnHoldByClientStatusRecruiter = key.OnHoldByClient;
            if (OnHoldByClientStatusRecruiter == true || OnHoldByOwnerStatusRecruiter == true) {
                readOnlyFormDataRecruiter();
                $("#OwnerrrmHoldStatusRecruiter").html("On-Hold").addClass("label label-warning m-l-xs");
                if (OnHoldByOwnerStatusRecruiter == true) {
                    $("#switchLeadRecruiter").dxSwitch({
                        value: true,
                        disabled: true
                    });
                }
                if (OnHoldByClientStatusRecruiter == true) {
                    $("#switchClientRecruiter").dxSwitch({
                        value: true,
                        disabled: true
                    });
                }
            }
            else {
                $("#OwnerrrmHoldStatusRecruiter").attr('class', '');
                $("#OwnerrrmHoldStatusRecruiter").html('');
                $("#switchClient").dxSwitch({
                    value: false,
                    disabled: false
                });
                $("#switchLead").dxSwitch({
                    value: false,
                    disabled: false
                });
            }
            $("#rrmmodelpagetitlerecruiter").text("Edit RRM - " + key.RRMNo);
            $("#sdchk_rrmrecruiter_leadApproval").dxCheckBox('instance').option('value',key.LeadApproval);
            $("#sdtxt_rrmrecruiter_requirementname").dxTextBox('instance').option('value',key.RequirementName);
            $("#sdtxt_rrmrecruiter_requiredfor").dxTextBox('instance').option('value',key.RequiredFor);
            $("#rrm_empidrecruiter").val(key.EmployeeId);
            $("#sdcmb_rrmrecruiter_priority").dxSelectBox('instance').option('value',key.PriorityId);
            if (key.BDEName != " ") {
                $("#rrm_entrybderecruiter").val(key.BDEName);
            }
            else {
                $("#rrm_entrybderecruiter").val('');
            }
            if (key.RFPId != null && key.RFPId != "") {
                $("#rrm_rfpidrecruiter").val(key.RFPId);
                $("#divRecruiterRFP").show();
            }
            else{
                $("#rrm_rfpidrecruiter").val('');
                $("#divRecruiterRFP").hide();
            }
            if (key.BDEId != null && key.BDEId != "") {
                $("#rrm_entrybderecruiter").val(key.BDEId);
                $("#divRecruiterRFP").show();
            }
            else {
                $("#rrm_entrybderecruiter").val('');
                $("#divRecruiterRFP").hide();
            }
            $("#sdnmb_rrmrecruiter_numberofpositions").dxNumberBox('instance').option('value',key.NumberOfPositions);
            $("#sdcmb_rrmrecruiter_communication").dxSelectBox('instance').option('value',key.Communication);
            $("#sdcmb_rrmrecruiter_department").dxSelectBox('instance').option('value',key.DepartmentId);
            $("#sdcmb_rrmrecruiter_designation").dxSelectBox('instance').option('value',key.DesignationId);
            $("#sdnmb_rrmrecruiter_experiencerequired").dxNumberBox('instance').option('value',key.ExperiencerequiredInYrs);
            $("#sdtxt_rrmrecruiter_location").dxTextBox('instance').option('value',key.Location);
            $("#sdchk_rrmrecruiter_losingRevenue").dxCheckBox('instance').option('value',key.LosingRevenue);
            $("#sdchk_rrmrecruiter_fromVIP").dxCheckBox('instance').option('value',key.VIP);

            var localget = localStorage.getItem("UserCheckRes");
            var jsonData = JSON.parse(localget);
            var LoggedUser = jsonData.Data["0"].FirstName + " " + jsonData.Data["0"].LastName;
            var RequirmentLead = $("#sdtxt_rrmrecruiter_requirementlead").dxTextBox('instance').option('value');
            if(LoggedUser == RequirmentLead){
                $("#RRMEntryPointRecruiterTypeDetails").removeClass("label label-default m-l-xs");
                $("#RRMEntryPointRecruiterTypeDetails").html("Owner").addClass("label label-warning m-l-xs");
            }
            else{
                $("#RRMEntryPointRecruiterTypeDetails").removeClass("label label-warning m-l-xs");
                $("#RRMEntryPointRecruiterTypeDetails").html("View Only").addClass("label label-default m-l-xs");;
            }

            var edate = key.RequestedDate;
            if (edate != null) {
                var ed = edate;
                $("#sd_date_rrmrecruiter_requestedDate").dxDateBox('instance').option('value',ed);

            }

            if (ResourceRequirementTypeRecruiter == "G") {
                $("#sdtxt_rrmrecruiter_requirementlead").dxTextBox('instance').option('value',key.Owner);
            }
            else if (ResourceRequirementTypeRecruiter == "P") {
                $("#sdtxt_rrmrecruiter_requirementlead").dxTextBox('instance').option('value',key.Owner);
            }
            else if (ResourceRequirementTypeRecruiter == "R") {
                $("#sdtxt_rrmrecruiter_requirementlead").dxTextBox('instance').option('value',key.LeadName);
            }

            $("#sdnmb_rrmrecruiter_numberofpositions").dxNumberBox('instance').option('value',getRRMData[0].NumberOfPositions);
            planAcomments = key['PlanA-SkillPlanInfo'];
            planBcomments = key['PlanB-SkillPlanInfo'];
            hrComments = key.Comments;
            var edate = key['PlanA-OnBoardDate'];
            if (edate != null) {
                var ed = edate;
                $("#sd_date_rrmrecruiter_tobeonboardplana").dxDateBox('instance').option('value',ed);
            }
            var edate = key['PlanB-OnBoardDate'];
            if (edate != null) {
                var ed = edate;
                $("#sd_date_rrmrecruiter_tobeonboardplanb").dxDateBox('instance').option('value',ed);
            }
            var PlanARecruitersName;
            var PlanBRecruitersName;
            if(key.PlanARecruiters != null){
                PlanARecruitersName = key.PlanARecruiters.split(',');
            }  
            else{
                PlanARecruitersName = [];
            }      
            if(key.PlanBRecruiters != null){
                PlanBRecruitersName = key.PlanBRecruiters.split(',');     
            }    
            else{
                PlanBRecruitersName = [];
            }      
            $("#sd_tag_recruitersa_rrmrecruiter").dxTagBox('instance').option('items',PlanARecruitersName);
            $("#sd_tag_recruitersa_rrmrecruiter").dxTagBox('instance').option('value',PlanARecruitersName);
            $("#sd_tag_recruitersb_rrmrecruiter").dxTagBox('instance').option('items',PlanBRecruitersName);
            $("#sd_tag_recruitersb_rrmrecruiter").dxTagBox('instance').option('value',PlanBRecruitersName);
            if (OnHoldByClientStatusRecruiter == true || OnHoldByOwnerStatusRecruiter == true) {
                readOnlyFormDataRecruiter();
            }

            if(key.OwnerId == localStorage.getItem("EmployeeID")){
                IsOwnerForSkill = true;
            }
            else{
                IsOwnerForSkill = false;
            }
            $("#sd_txtEditor_RRMRecruiterComments").dxHtmlEditor('instance').option('value','');
        });
    }
        _editRRMEntryPointRecruiter.getResourceRequirementSkillPlanAId();
        _editRRMEntryPointRecruiter.getResourceRequirementSkillPlanBId();

    }

    //To get Resource RequirementSkill PlanB Id
    _editRRMEntryPointRecruiter.getResourceRequirementSkillPlanAId = function () {
        var dataResourceGetSkillId = JSON.stringify({
            "Token": Token,
            "ResourceRequirementId": ResourceRequirementId,
            "SkillPlans": "PlanA",
            "IsActive": "True"
        });

      //  var result = callgetlist('GetResourceRequrimentSkillPlans', dataResourceGetSkillId);
        callGetListAsync('GetResourceRequrimentSkillPlans', dataResourceGetSkillId, function (result) {
            if (result[0] != null || result[0] != undefined) {
                ResourceRequirementSkillPlanAId = result[0].ResourceRequirementSkillPlanId;
            }
        });
    }

    //To get Resource RequirementSkill PlanB Id
    _editRRMEntryPointRecruiter.getResourceRequirementSkillPlanBId = function () {
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
_editRRMEntryPointRecruiter.skillcomputeHTML = function(e) {   
       var html = "";
       if (e == null || e=="") {
           html = "<table id='myTable' class='skillemptytbl myTable_rrm recruiter'>";
           html += "<tr>";
           html += "<th>Family</th>"
           html += "<th>Skills</th>"
           html += "<th>Version</th>"
           html += "<th>Action</th>"
           html += "</tr>";  
          html += "<tr><td colspan='4'>No Data..!</td></tr>";
        
     } else {
           var html = "<table id='myTable' class='myTable_rrm recruiter'>";
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
             html += "<td><button class='btn edit-btn' id='editskillrecruiter' onclick=editRow_SkillMapping('" + skillId + "')><i class='fas fa-pencil-alt'></i></button>"
               html += "<button class='btn delete-btn' id='deleteskillrecruiter' onclick=_editRRMEntryPointRecruiter.deleteRow_SkillMapping('" + skillId + "')><i class='fas fa-trash-alt'></i></button></td>"
             html += "</tr>";
         }); 
      
       }
        return html;
} 

//tab previous btn evenet
_editRRMEntryPointRecruiter.toggleTabRRMEntryPrevious = function() {
    
    var activeTab = $('#rrmtabRecruiter').find('li.active').attr('id')

    if (activeTab == "rrm_skillsplanaTabRecruiter") 
    {
        $('.nav-tabs a[href="#rrm_SkillDetailsRecruiter"]').tab("show");
        $("a.btnNext").show();
        $(".saveFamilyBtn").hide();
    }
    
    if (activeTab == "rrm_skillsTabRecruiter") 
    {
        $('.nav-tabs a[href="#rrm_RequirementDetailsRecruiter"]').tab("show");
        $("a.btnNext").show();
        $(".saveFamilyBtn").hide();
        $(".btnPrevious").hide();
        _editRRMEntryPointRecruiter.updateresourcerequitementdata();
    }

    if (activeTab == "rrm_skillsplanbTabRecruiter") 
    {
        $('.nav-tabs a[href="#rrm_SkillsPlanADetailsRecruiter"]').tab("show");
        $("a.btnNext").show();
        $(".btnPrevious").show();
        $(".saveFamilyBtn").hide();
    }

    if (activeTab == "rrm_commentsrecruiterTabRecruiter") 
    {
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
        
            $("a.btnNext").hide();
        
        $(".btnPrevious").show();
        $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsRecruiter"]').tab("show");
    }
    resetSimpleBarRRMEntryPointRecruiter();
}

// get rrm detials by id
_editRRMEntryPointRecruiter.updateresourcerequitementdata = function(){
    
    //var getRRMData = callgetlist('GetRRMbyid','{"IsActive":"True","ResourceRequirementId":"'+ResourceRequirementId+'","Token":"'+Token+'"}');
    callGetListAsync('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + ResourceRequirementId + '","Token":"' + Token + '"}', function (getRRMData) {
        _editRRMEntryPointRecruiter.mapupdateaddrrmListcomputeHTML(getRRMData)
    });
}
  
  //bind rrm data from _addRRMEntryPoint.updateresourcerequitementdata function result
 _editRRMEntryPointRecruiter.mapupdateaddrrmListcomputeHTML = function(getRRMData){

    if (getRRMData[0].rrmid=="") {
  
        } else {
        var data;
            getRRMData.forEach(function (key, item) {
                $("#sdtxt_rrmrecruiter_requirementname").dxTextBox('instance').option('value',key.RequirementName);
                $("#sdtxt_rrmrecruiter_requiredfor").dxTextBox('instance').option('value',key.RequiredFor);
            $("#rrm_empidrecruiter").val(key.RequirementName);
            $("#rrm_entrybderecruiter").val(key.BDEName);
            $("#sdnmb_rrmrecruiter_numberofpositions").dxNumberBox('instance').option('value',key.NumberOfPositions);
            
            $("#sdcmb_rrmrecruiter_department").dxSelectBox('instance').option('value',key.DepartmentId);
            $("#sdnmb_rrmrecruiter_experiencerequired").dxNumberBox('instance').option('value',key.ExperiencerequiredInYrs);
            $("#sdtxt_rrmrecruiter_location").dxTextBox('instance').option('value',key.Location);
            var edate=key.RequestedDate;
            if(edate!=null){
            var ed = edate;
            $("#sd_date_rrmrecruiter_requestedDate").dxDateBox('instance').option('value',ed);
            }
            $("#sdtxt_rrmrecruiter_requirementlead").dxTextBox('instance').option('value',key.LeadName);
           
            });
        }
}

//save hr commnets
    _editRRMEntryPointRecruiter.saveComments = function () {
        
        var finalComments = $("#sd_txtEditor_RRMRecruiterComments").dxHtmlEditor('instance').option("value");
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
    $('#RRMEntryPointModel').modal("hide");
    ResourceRequirementId=null;
    var rrmEntryGrid = RRMEntryPointGridRecruiter("Recruiter");
    rrmEntryGrid.getRRMEntryTable();
        _editRRMEntryPointRecruiter.clearAll();
        $('#RRMEntryPointModelRecruiter').modal("hide");
}

//get skill details
_editRRMEntryPointRecruiter.getSkillsDetails = function(ResourceRequrimentId) {
    
    var filterData = JSON.stringify({
        "ResourceRequirementId": ResourceRequrimentId,
        "IsActive": "True",
        "Token": Token
    });        
  
    callGetListAsync('GetResourceRequrirementSkill', filterData, function (e) {
        GetSkillList = e;
  
        $("#sdgd-rrmRecruiterSkills").dxDataGrid({
            dataSource: GetSkillList,
            showBorders: true,
            paging: {
                enabled: false
            },
            editing: {
                mode: "row",
                allowUpdating: false,
                allowDeleting: false,
                allowAdding: false
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
                _editRRMEntryPointRecruiter.insert_SkillInfoEntry(e);
            },
            onRowUpdated: function (e) {
                _editRRMEntryPointRecruiter.update_SkillInfoEntry(e);
            },
            onRowRemoved: function (e) {
                _editRRMEntryPointRecruiter.delete_SkillInfoEntry(e);
            }
        });
    });
    
}


//get Manage Comment History
_editRRMEntryPointRecruiter.getManageCommentHistory = function(ResourceRequirementId) {
    
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
        $("#rrm_manage_plan_comments_documents_recruiter").show();
        $("#rrm_manage_plan_comments_documents_recruiter").html(plan_comment_history_html);
        var div = document.getElementById('rrm_manage_plan_comments_documents_recruiter');
        div.scrollTop = div.scrollHeight - div.clientHeight;
    });
}

//skill data clear func
_editRRMEntryPointRecruiter.skillsClearAndShow = function() { // Clear our fields


}

//get versions entry
_editRRMEntryPointRecruiter.get_versionsentry = function(skillentry_id) {
    var skillentry_id = skillentry_id;
    var filter_val = JSON.stringify({
        "SkillId": skillentry_id
    });
  //  var result = callgetlist('GetSkillVersions', filter_val);
    callGetListAsync('GetSkillVersions', filter_val, function (result) {
        var options = "<option value=''>Select Skill Version</option>";
        for (var i = 0; i < result.length; i++) {
            options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
        }
        $("#skillversionentryRecruiter").html(options);
    });
}

//get skill entry
_editRRMEntryPointRecruiter.get_skillsentry = function(familyentry_id) {
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

_editRRMEntryPointRecruiter.insert_SkillInfoEntry = function (e) {
        
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
            _editRRMEntryPointRecruiter.skillsClearAndShow();
            _editRRMEntryPointRecruiter.getSkillsDetails(RRMID);
        }
    });
  }

  _editRRMEntryPointRecruiter.update_SkillInfoEntry = function (e) {
      
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
            _editRRMEntryPointRecruiter.skillsClearAndShow();
            _editRRMEntryPointRecruiter.getSkillsDetails(RRMID);
          }
      });       

  }

  _editRRMEntryPointRecruiter.delete_SkillInfoEntry = function (e) {
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
            _editRRMEntryPointRecruiter.skillsClearAndShow();
            _editRRMEntryPointRecruiter.getSkillsDetails(RRMID);
          }                    
      });   
  }

return _editRRMEntryPointRecruiter;

});