var closedRRMIDs;

closedAddRRMEntryPoint = (function () {
    var _closedaddRRMEntryPoint = {};
    var closedGetRRMs;
    var closeddataResource = [];
    var closeddataPlanA = [];
    var closeddataPlanB = [];
    var closeddataComments = [];
    var ResourceRequirementId;
    var dataSkillApi = [];
    var table;
    var skilltblid;
    var ResourceRequirementSkillPlanId = null;
    var nextFlag = false;
    var IsRrmSaved = false;
    _closedaddRRMEntryPoint.family = {};
    _closedaddRRMEntryPoint.skill = {};
    _closedaddRRMEntryPoint.version = {};
    
    //mapui func
    function closedmapUI() {
        $closedrrmtab = $('#closedrrmtab')
        $closedrrm_entrybde = $("#closedrrm_entrybde"),
            $closedrrm_empid = $("#closedrrm_empid"),
            $closedrrm_replacement = $("#closedrrm_replacement")
    }

    //save hr commnents once save&close btn clicked 
    _closedaddRRMEntryPoint.closedsaveComments = function () {
        var updatecomments = 1;
        var closedswitchLead = $("#closedswitchLead").dxSwitch("instance").option('value');
        var closedswitchClient = $("#closedswitchClient").dxSwitch("instance").option('value');
        var finalComments = $("#closedsd_txtEditor_RRMComments").dxHtmlEditor('instance').option('value')
        if (closedswitchClient == true || closedswitchLead == true) {
            if (finalComments == "" || finalComments == null || finalComments == undefined) {
                swal({
                    title: "Warning!",
                    text: "Please Add Comments",
                    icon: "warning",
                    button: "ok!",
                })
                updatecomments = 0;
            }
            else {
                updatecomments = 1;
            }
        } else {
            updatecomments = 1;
        }

        if (updatecomments == 1) {
            closeddataComments = {
                "Method": "PostOnHoldCommentsInResourceRequirement",
                "Data": {
                    "Token": Token,
                    "OnHoldByClient": closedswitchClient.toString(),
                    "OnHoldByOwner": closedswitchLead.toString(),
                    "ResourceRequirementId": ResourceRequirementId,
                    "Comments": finalComments,
                    "IsActive": 'True'
                }
            }

            //var resultComments = PostDataCall(closeddataComments);
            PostDataCallAsync(closeddataComments, function (resultComments) {

                swal({
                    title: "Success!",
                    text: "Saved Successfully!",
                    icon: "success",
                    button: "ok!",
                })
            });

            $('#closedRRMEntryPointModel').modal("hide");
            ResourceRequirementId = null;
            // _editRRMEntryPoint.getRRMEntryTable();
            var rrmEntryGrid = closedRRMEntryPointGridOwner("Closed");
            requirmentData = {};
            rrmEntryGrid.getRRMEntryTable();
            $("#rrmGridReportClosed").dxDataGrid('instance').refresh();
            _closedaddRRMEntryPoint.clearAll_addrrmdata();
        }
        //var finalComments = CKEDITOR.instances.rrm_comments.getData();
        //if (finalComments == "") {
        //    swal({
        //        title: "Success!",
        //        text: "Saved Successfully!",
        //        icon: "success",
        //        button: "ok!",
        //    });

        //    ResourceRequirementSkillPlanId = null;
        //    ResourceRequirementId = null;
        //    $('#RRMEntryPointModel').modal("hide");
        //    var rrmEntryGrid = RRMEntryPointGridOwner("Closed");
        //    rrmEntryGrid.getRRMEntryTable();
        //    _closedaddRRMEntryPoint.clearAll_addrrmdata();
        //}
        //else {
        //    dataComments = {
        //        "Method": "PostOnHoldCommentsInResourceRequirement",
        //        //"Data": {
        //        //    "ResourceRequirementId": ResourceRequirementId,
        //        //    "Comments": finalComments,
        //        //    "IsActive": 'True',
        //        //}
        //        "Data": {
        //            "Token": Token,
        //            "OnHoldByClient": OnHoldByClient,
        //            "OnHoldByOwner"  OnHoldByClient,
        //            "ResourceRequirementId": ResourceRequirementId,
        //            "Comments": finalComments,
        //            "IsActive": 'True',
        //        }

        //    }

        //    PostDataCallAsync(closeddataComments, function (e) {
        //        resultComments = e;

        //        swal({
        //            title: "Success!",
        //            text: "Saved Successfully!",
        //            icon: "success",
        //            button: "ok!",
        //        });

        //        ResourceRequirementSkillPlanId = null;
        //        ResourceRequirementId = null;
        //        $('#RRMEntryPointModel').modal("hide");
        //        var rrmEntryGrid = RRMEntryPointGridOwner("Closed");
        //        rrmEntryGrid.getRRMEntryTable();
        //        _closedaddRRMEntryPoint.clearAll_addrrmdata();
        //    });
        //}
    }

    //tab next button event (rrmentry->skills->planA->planB->commnets) 
    _closedaddRRMEntryPoint.closedtoggleTabRRMEntry = function () {

        var activeTab = $('#closedrrmtab').find('li.active').attr('id')
        var EmployeeId = null;

        if (activeTab == "closedrrm_requirementTab") {
            requirmentName = $("#closedsdtxt_rrm_requirementname").dxTextBox('instance').option('value');
            requireFor = $("#closedsdtxt_rrm_requiredfor").dxTextBox('instance').option('value');
            bde = $("#closedrrm_entrybde").val();
            if (bde == "") { bde = null; }
            rfpId = $("#closedrrm_rfpid").val();
            if(rfpId == ""){
                rfpId = null;
            }
            EmployeeId = $("#closedrrm_empid").val();
            if (EmployeeId == "") { EmployeeId = null }
            replacementFor = $("#closedrrm_replacement").val();
            position = $("#closedsdnmb_rrm_numberofpositions").dxNumberBox('instance').option('value');
            priority = $("#closedsdcmb_rrm_priority").dxSelectBox('instance').option('value');
            department = $("#closedsdcmb_rrm_department").dxSelectBox('instance').option('value');
            designation = $("#closedsdcmb_rrm_designation").dxSelectBox('instance').option('value');
            experience = $("#closedsdnmb_rrm_experiencerequired").dxNumberBox('instance').option('value');
            interviewers = $("#closedsdtag_rrm_intervierwers").dxTagBox('instance').option('value');
            communication = $("#closedsdcmb_rrm_communication").dxSelectBox('instance').option('value');
            reqlocation = $("#closedsdtxt_rrm_location").dxTextBox('instance').option('value');
            if (reqlocation == "") { reqlocation = null; }
            if (ResourceRequirementId == "" || ResourceRequirementId == undefined) {
                ResourceRequirementId = null;
            }
            requestedDate = $("#closedsd_date_rrm_requestedDate").dxDateBox('instance').option('value');
            losingRevenue = $("#closedsdchk_rrm_losingRevenue").dxCheckBox('instance').option('value');
            fromVIP = $("#closedsdchk_rrm_fromVIP").dxCheckBox('instance').option('value');
            requirmentLead = $("#closedsdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
            leadApproval = $("#closedsdchk_rrm_leadApproval").dxCheckBox('instance').option('value');
            var finalRequestedDate = moment(requestedDate).format("DD-MM-YYYY");
            var getInterviewerMultipleArry = $("#closedsdtag_rrm_intervierwers").dxTagBox('instance').option('value');
            var joinInterviewerArray = "";
            $.each(getInterviewerMultipleArry, function (index, val) {
                joinInterviewerArray += val + ",";
            });
            joinInterviewerArray = joinInterviewerArray.replace(/,\s*$/, "");
            if (requirmentName.trim() == "" || requireFor.trim() == "" || position == "" || position == "0" || department == "" || designation == "" || experience == "" || experience == "0" || interviewers.length == 0 || priority == null || priority == "") {
                if (requirmentName.trim() == "") {
                    $('#closedsdtxt_rrm_requirementname').addClass('input-error');
                    $('#closedrrm_requirementnameError').html("Enter Requirment Name");
                }
                else {
                    $('#closedsdtxt_rrm_requirementname').removeClass('input-error');
                    $('#closedrrm_requirementnameError').html("");
                }
                if (requireFor.trim() == "") {
                    $('#closedsdtxt_rrm_requiredfor').addClass('input-error');
                    $('#closedrrm_requiredforError').html("Enter Required For");
                }
                else {
                    $('#closedsdtxt_rrm_requiredfor').removeClass('input-error');
                    $('#closedrrm_requiredforError').html("");
                }
                if (position == "" || position == "0") {
                    if (position == "") {
                        if (position == "") {
                            $('#closedsdnmb_rrm_numberofpositions').addClass('input-error');
                            $('#closedrrm_numberofpositionsError').html("Enter Position");
                        }
                        else {
                            $('#closedsdnmb_rrm_numberofpositions').removeClass('input-error');
                            $('#closedrrm_numberofpositionsError').html("");
                        }
                    }
                    if (position == "0") {
                        if (position == "0") {
                            $('#closedsdnmb_rrm_numberofpositions').addClass('input-error');
                            $('#closedrrm_numberofpositionsError').html("Min Position is 1");
                        }
                        else {
                            $('#closedsdnmb_rrm_numberofpositions').removeClass('input-error');
                            $('#closedrrm_numberofpositionsError').html("");
                        }
                    }
                }
                if (department == "") {
                    $('#closedsdcmb_rrm_department').addClass('input-error');
                    $('#closedrrm_departmentError').html("Select Department");
                }
                else {
                    $('#closedsdcmb_rrm_department').removeClass('input-error');
                    $('#closedrrm_departmentError').html("");
                }
                if (designation == "") {
                    $('#closedsdcmb_rrm_designation').addClass('input-error');
                    $('#closedrrm_designationError').html("Select Designation");
                }
                else {
                    $('#closedsdcmb_rrm_designation').removeClass('input-error');
                    $('#closedrrm_designationError').html("");
                }
                if (experience == "" || experience == "0") {
                    if (experience == "") {
                        if (experience == "") {
                            $('#closedsdnmb_rrm_experiencerequired').addClass('input-error');
                            $('#closedrrm_experiencerequiredError').html("Select Experience");
                        }
                        else {
                            $('#closedsdnmb_rrm_experiencerequired').removeClass('input-error');
                            $('#closedrrm_experiencerequiredError').html("");
                        }
                    }
                    if (experience == "0") {
                        if (experience == "0") {
                            $('#closedsdnmb_rrm_experiencerequired').addClass('input-error');
                            $('#closedrrm_experiencerequiredError').html("Min Experience is 1");
                        }
                        else {
                            $('#closedsdnmb_rrm_experiencerequired').removeClass('input-error');
                            $('#closedrrm_experiencerequiredError').html("");
                        }
                    }
                }
                if(priority == null || priority == ""){
                    $("#closedsdcmb_rrm_priority").addClass('input-error');
                    $("#closedrrm_priorityError").html("Select Priority");
                }
                else{
                    $("#closedsdcmb_rrm_priority").removeClass('input-error');
                    $("#closedrrm_priorityError").html("");
                }
                if (interviewers.length == 0) {
                    $("#closedsdtag_rrm_intervierwers").addClass('input-error');
                    $("#closedrrm_interviewersError").html("Select interviewer(s)");
                }
                else {
                    $("#closedsdtag_rrm_intervierwers").removeClass('input-error');
                    $("#closedrrm_interviewersError").html("");
                }
                $('.nav-tabs a[href="#closedrrm_requirementTab"]').tab("show");
                $(".closedbtnPrevious").hide();
                if (!IsRrmSaved) {
                    $(".closedsaveFamilyBtn").hide();
                    $("a.closedbtnNext").show();
                }
            }

            else {
                closeddataResource = {
                    "Method": "PostResourceRequirement",
                    "Data": {
                        "Token": Token,
                        "RequirementName": requirmentName,
                        "ResourceRequirementId": ResourceRequirementId,
                        "ResourceRequirementTypeId": null,
                        "RequiredFor": requireFor,
                        "RequestForProposalId": rfpId,
                        "BDEId": bde,
                        "ResignedEmployeeId": EmployeeId,
                        "ReplacementEmployeeId": replacementFor,
                        "NumberOfPositions": position,
                        "PriorityId": priority,
                        "DepartmentId": department,
                        "DesignationId": designation,
                        "ExperiencerequiredInYrs": experience,
                        "CommunicationId": communication,
                        "LocationId": reqlocation,
                        "RequestedDate": requestedDate,
                        "LosingRevenue": losingRevenue,
                        "VIP": fromVIP,
                        "LeadId": BackupLeadId,
                        "leadApproval":leadApproval,
                        "IsActive": 'true',
                    }
                }

                // var resultResorce = PostDataCall(closeddataResource);
                PostDataCallAsync(closeddataResource, function (resultResorce) {
                    if (ResourceRequirementId == null) {
                        ResourceRequirementId = resultResorce.Data[0].ResourceRequirementId;
                        _closedaddRRMEntryPoint.saveRRMInterviewers(ResourceRequirementId, joinInterviewerArray)
                        if (ClosedIsRRMForClone == true) {
                            _closedaddRRMEntryPoint.saveSkillsDetailsForClone(ResourceRequirementId, closedClonedRRMId);
                        }
                    }
                });
                $('.nav-tabs a[href="#closedrrm_SkillDetails"]').tab("show");
                var filter_val2 = JSON.stringify({
                    RRMId: ResourceRequirementId,
                    IsActive: 'True'
                });
                closedRRMIDs = ResourceRequirementId;
                var technologyArray = new Array();
                var getTechnologiesForRRM = callgetlist("GetTechnologiesForRRMById", filter_val2);
               
                getTechnologiesForRRM.forEach(function (item) {
                    $('#closedrrm_profileEntry_skills').attr({ "skillId": item.SkillId, "versionId": item.SkillVersionID, "familyId": item.SkillFamilyId, "value": item.SkillId + "-" + item.SkillVersionID });
                    technologyArray.push(item.SkillId + "-" + item.SkillVersionID);
                    $('#closedrrm_profileEntry_skills').val(technologyArray);
                    $('#closedrrm_profileEntry_skills').select2();
                });

                if(getTechnologiesForRRM.length == 0){
                    $('#closedrrm_profileEntry_skills').val(null).trigger('change');
                }

                $(".closedbtnPrevious").show();
                if (!IsRrmSaved) {
                    $(".closedsaveFamilyBtn").hide();
                    $("a.closedbtnNext").show();
                }
                if (ClosedIsRRMForClone != true) {
                    _closedaddRRMEntryPoint.closedgetSkillsDetails();
                }
            }
        }
        $(".closedbtnPrevious").show();
        if (!IsRrmSaved) {
            $(".closedsaveFamilyBtn").hide();
            $("a.closedbtnNext").show();

            if (activeTab == "closedrrm_skillsTab") {

                var data = $("#closedsdgd-rrmOwnerSkills").dxDataGrid("instance").option("dataSource");

                if (($("#closedrrm_profileEntry_skills").val() == "" || $("#closedrrm_profileEntry_skills").val() == 0) && data.length == 0) {
                    swal({
                        title: "Warning!",
                        text: "Please Add Skill  Details",
                        icon: "warning",
                        button: "ok!",
                    })
                }
                else {
                    var result = bindRRMTechnologyString();
                    _closedaddRRMEntryPoint.insert_SkillInfoEntrysNew(result);

                    $('.nav-tabs a[href="#closedrrm_SkillsPlanADetails"]').tab("show");
                    $(".closedbtnPrevious").show();

                    if (!IsRrmSaved) {
                        $(".closedsaveFamilyBtn").hide();
                        $("a.closedbtnNext").show();
                    }
                }
            }

            if (activeTab == "closedrrm_skillsplanaTab") {
                var datecheck = 0;
                $("div#divrecruiters").hide();
                var RecruiterA = [];
                skillDetailsA = $("#closedsd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('value')
                toOnBoardA = $("#closedsd_date_rrm_tobeonboardplana").dxDateBox('instance').option('value');
                //requirtersA = $("#rrm_recruitersowner").val();
                var varEDate = new Date().toISOString().slice(0, 10); //dd-mm-YYYY
                // if (requirtersA[0] != null || requirtersA[0] != undefined) {
                //     RecruiterA = requirtersA.split(',');
                // }
                if (toOnBoardA <= varEDate) {
                    datecheck = 1;
                    swal({
                        title: "Warning!",
                        text: "Please enter valid Date current and previous date should not be selected",
                        icon: "warning",
                        button: "ok!",
                    })
                }

                if ((skillDetailsA == "" || toOnBoardA == "") || datecheck == 1) {

                    if (skillDetailsA == "") {
                        $('#rrm_skilldetailsplanan').addClass('input-error');
                        $('#closedrrm_skilldetailsplanaError').html("Enter Skill Details");
                    }
                    else {
                        $('#rrm_skilldetailsplanan').removeClass('input-error');
                        $('#closedrrm_skilldetailsplanaError').html("");
                    }
                    if (toOnBoardA == "") {
                        $('#closedsd_date_rrm_tobeonboardplana').addClass('input-error');
                        $('#closedrrm_tobeonboardplanaError').html("Select Date");
                    }
                    else {
                        $('#rrm_tobeonboardplana').removeClass('input-error');
                        $('#closedrrm_tobeonboardplanaError').html("");
                    }
                    $('.nav-tabs a[href="#closedrrm_skillsplanaTab"]').tab("show");
                    $(".closedbtnPrevious").show();
                    if (!IsRrmSaved) {
                        $(".closedsaveFamilyBtn").hide();
                        $("a.closedbtnNext").show();
                    }
                }
                else {
                    closeddataPlanA = {
                        "Method": "PostResourceRequrimentSkillPlans",
                        "Data": {
                            "ResourceRequirementId": ResourceRequirementId,
                            "Token": Token,
                            "ResourceRequirementSkillPlanId": null,
                            "SkillPlan": 'PlanA',
                            "SkillPlanInfo": skillDetailsA,
                            "ToBeOnBoard": toOnBoardA,
                            "IsActive": 'True'
                        }
                    }
                    //var resulPlanBt = PostDataCall(closeddataPlanA);
                    PostDataCallAsync(closeddataPlanA, function (resulPlanBt) {
                        $('.nav-tabs a[href="#closedrrm_SkillsPlanBDetails"]').tab("show");
                        $(".closedbtnPrevious").show();
                        if (!IsRrmSaved) {
                            $(".closedsaveFamilyBtn").hide();
                            $("a.closedbtnNext").show();
                        }
                    });
                }
            }

            if (activeTab == "closedrrm_skillsplanbTab") {
                var datecheckplanb = 0;
                skillDetailsB = $("#closedsd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value');
                toOnBoardB = $("#closedsd_date_rrm_tobeonboardplanb").dxDateBox('instance').option('value')
                requirtersB = $("#rrm_recruitersplanb").val();
                var varEDate = new Date().toISOString().slice(0, 10); //dd-mm-YYYY

                if (toOnBoardB <= varEDate) {
                    datecheckplanb = 1;
                    swal({
                        title: "Warning!",
                        text: "Please enter valid Date current and previous date should not be selected",
                        icon: "warning",
                        button: "ok!",
                    })
                    $('.nav-tabs a[href="#closedrrm_SkillsPlanBDetails"]').tab("show");
                }
                if ((skillDetailsB == "" || toOnBoardB == "") || datecheckplanb == 1) {
                    if (skillDetailsB == "") {
                        $('#closedsd_txtEditor_skillDetailsPlanB').addClass('input-error');
                        $('#closedrrm_skilldetailsplanbError').html("Enter Skill Details");
                    } else {
                        $('#closedsd_txtEditor_skillDetailsPlanB').removeClass('input-error');
                        $('#closedrrm_skilldetailsplanbError').html("");
                    }
                    if (toOnBoardB == "") {
                        $('#closedsd_date_rrm_tobeonboardplanb').addClass('input-error');
                        $('#closedrrm_tobeonboardplanbError').html("Select Date");
                    } else {
                        $('#closedsd_date_rrm_tobeonboardplanb').removeClass('input-error');
                        $('#closedrrm_tobeonboardplanbError').html("");
                    }
                    $('.nav-tabs a[href="#closedrrm_skillsplanbTab"]').tab("show");
                    $(".closedbtnPrevious").show();
                    if (!IsRrmSaved) {
                        $(".closedsaveFamilyBtn").hide();
                        $("a.closedbtnNext").show();
                    }
                }
                else {
                    closeddataPlanB = {
                        "Method": "PostResourceRequrimentSkillPlans",
                        "Data": {
                            "ResourceRequirementId": ResourceRequirementId,
                            "ResourceRequirementSkillPlanId": ResourceRequirementSkillPlanId,
                            "SkillPlan": 'PlanB',
                            "SkillPlanInfo": skillDetailsB,
                            "ToBeOnBoard": toOnBoardB,
                            "IsActive": 'True',

                        }
                    }

                    //var resulPlanBt = PostDataCall(closeddataPlanB);
                    PostDataCallAsync(closeddataPlanB, function (resulPlanBt) {
                        $('.nav-tabs a[href="#closedrrm_CommentsDetails"]').tab("show");
                        $("#closedrrm_manage_plan_comments_documents").hide();
                        $(".closedbtnPrevious").show();
                        if (!IsRrmSaved) {
                            $(".closedsaveFamilyBtn").show();
                            $("a.closedbtnNext").hide();
                        }
                    });
                }
            }
        }

        closedresetSimpleBarRRMEntryPoint();
    }
    
    //tab previous button functions (rrmentry<-skills<-planA<-planB<-commnets) 
    _closedaddRRMEntryPoint.closedtoggleTabRRMEntryPrevious = function () {

        var activeTab = $('#closedrrmtab').find('li.active').attr('id')
        if (activeTab == "closedrrm_skillsplanaTab") {
            _closedaddRRMEntryPoint.closedgetSkillsDetails();
            $('.nav-tabs a[href="#closedrrm_SkillDetails"]').tab("show");
            $("a.closedbtnNext").show();
            $(".closedsaveFamilyBtn").hide();
        }
        if (activeTab == "closedrrm_skillsTab") {
            $('.nav-tabs a[href="#closedrrm_RequirementDetails"]').tab("show");
            $("a.closedbtnNext").show();
            $(".closedsaveFamilyBtn").hide();
            $(".closedbtnPrevious").hide();
            var requiredLead = $("#closedsdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
            if(LoggedUser != requiredLead){
                $("#closedsdchk_rrm_leadApproval").dxCheckBox("instance").option("readOnly",true);
              }
              else{
                $("#closedsdchk_rrm_leadApproval").dxCheckBox("instance").option("readOnly",false);
              }
              _closedaddRRMEntryPoint.updateresourcerequitementdata();
        }
        if (activeTab == "closedrrm_skillsplanbTab") {
            $('.nav-tabs a[href="#closedrrm_SkillsPlanADetails"]').tab("show");
            $("a.closedbtnNext").show();
            $(".closedbtnPrevious").show();
            $(".closedsaveFamilyBtn").hide();

            var filter_valbtn = JSON.stringify({
                "IsActive": "True",
                "Token": Token,
                "SkillPlan": 'PlanA',
                "ResourceRequirementId": ResourceRequirementId
            });

            //var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
            callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {
                if (result != null) {
                    $("#closedsd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('value', result[0].SkillPlanInfo)
                    var edate = result[0].ToBeOnBoard;
                    $("#closedsd_date_rrm_tobeonboardplana").dxDateBox('instance').option('value', edate);
                    ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
                }
            })
        }
        if (activeTab == "closedrrm_commentsTab") {

            comments = $("#closedsd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value');
            if (!IsRrmSaved) {
                $("a.closedbtnNext").show();
                $(".closedsaveFamilyBtn").hide();
            } else {
                $("a.closedbtnNext").hide();
            }
            $(".closedbtnPrevious").show();
            $('.nav-tabs a[href="#closedrrm_SkillsPlanBDetails"]').tab("show");
            var filter_valbtn = JSON.stringify({
                "IsActive": "True",
                "Token": Token,
                "SkillPlans": 'PlanB',
                "ResourceRequirementId": ResourceRequirementId
            });
            //var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
            callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {
                if (result != null) {
                    $("#closedsd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value', result[0].SkillPlanInfo);
                    var edate = result[0].ToBeOnBoard;
                    $("#closedsd_date_rrm_tobeonboardplanb").dxDateBox('instance').option('value', edate);
                    ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
                }
            })
        }

        closedresetSimpleBarRRMEntryPoint();
    }

    // get rrm detials by id
    _closedaddRRMEntryPoint.updateresourcerequitementdata = function () {
        //var getRRMData = callgetlist('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + ResourceRequirementId + '","Token":"' + Token + '"}');
        callGetListAsync('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + ResourceRequirementId + '","Token":"' + Token + '"}', function (getRRMData) {
            _closedaddRRMEntryPoint.mapupdateaddrrmListcomputeHTML(getRRMData)
        })
    }

    //bind rrm data from _closedaddRRMEntryPoint.updateresourcerequitementdata function result
    _closedaddRRMEntryPoint.mapupdateaddrrmListcomputeHTML = function (getRRMData) {
        var minDate = new Date();
        minDate.setDate(minDate.getDate());
        var minTdyDate = minDate.toISOString().slice(0, 10);
        $("#closedsd_date_rrm_tobeonboardplana").dxDateBox("instance").option("min", minTdyDate);
        $("#closedsd_date_rrm_tobeonboardplanb").dxDateBox("instance").option("min", minTdyDate);
        $("#closedsd_date_rrm_tobeonboardplana").dxDateBox("instance").option("isValid", true);
        $("#closedsd_date_rrm_tobeonboardplanb").dxDateBox("instance").option("isValid", true);

        if (getRRMData[0].rrmid == "") {
            //
        }
        else {
            var data;
            getRRMData.forEach(function (key, item) {
                $("#closedsdtxt_rrm_requirementname").dxTextBox('instance').option('value', key.RequirementName);
                $("#closedsdtxt_rrm_requiredfor").dxTextBox('instance').option('value', key.RequiredFor);
                $("#closedrrm_empid").val(key.RequirementName);
                $("#closedrrm_entrybde").val(key.BDEName);
                $("#closedsdnmb_rrm_numberofpositions").dxNumberBox('instance').option('value', key.NumberOfPositions);

                $("#closedsdcmb_rrm_department").dxSelectBox('instance').option('value', key.DepartmentId);
                $("#closedsdnmb_rrm_experiencerequired").dxNumberBox('instance').option('value', key.ExperiencerequiredInYrs);
                $("#closedsdtxt_rrm_location").dxTextBox('instance').option('value', key.Location);
                var edate = key.RequestedDate;
                if (edate != null) {
                    var ed = edate;
                    $("#closedsd_date_rrm_requestedDate").dxDateBox('instance').option('value', ed);
                }
                $("#closedsdtxt_rrm_requirementlead").dxTextBox('instance').option('value', key.LeadName);
            });
        }
    }

    //rrmFormVAlidation
    _closedaddRRMEntryPoint.rrmValidation = function () {
        if ($("#closedsdtxt_rrm_requirementname").dxTextBox('instance').option('value') == "") {
            alert("")
            $("#closedrrm_requirementnameError").html("Please Enter Name");
        }
        if ($("#closedsdtxt_rrm_requiredfor").dxTextBox('instance').option('value') == "") {
            $("#closedrrm_requiredforError").html("Please Enter RequiredFor");
        }
        if ($("#closedsdnmb_rrm_numberofpositions").dxNumberBox('instance').option('value') == "") {
            $("#closedrrm_numberofpositionsError").html("Please Enter No. Of Positions");
        }
        if ($("#closedsdcmb_rrm_department").dxSelectBox('instance').option('value') == "") {
            $("#closedrrm_departmentError").html("Please Select Department");
        }
        if ($("#closedsdnmb_rrm_experiencerequired").dxNumberBox('instance').option('value') == "") {
            $("#closedrrm_experiencerequiredError").html("Please Enter Experience");
        }
        if ($("#closedsdcmb_rrm_communication").dxSelectBox('instance').option('value') == "") {
            $("#closedrrm_communicationError").html("Please Select Communication");
        }
        if ($("#rrmfamily").val() == "") {
            $("#rrmfamilyError").html("Please Select Family");
        }
        if ($("#rrmskill").val() == "") {
            $("#rrmskillError").html("Please Select Skill");
        }
        if ($("#closedsd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('value') == "") {
            $("#closedrrm_skilldetailsplanaError").html("Please Enter Skill Details (Plan A)");
        }
        if ($("#closedsd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value') == "") {
            $("#closedrrm_skilldetailsplanbError").html("Please Enter Skill Details (Plan B)");
        }
        if ($("#closedsd_date_rrm_tobeonboardplana").dxDateBox('instance').option('value') == "") {
            $("#closedrrm_tobeonboardplanaError").html("Please Select To on Board");
        }
        if ($("#closedsd_date_rrm_tobeonboardplanb").dxDateBox('instance').option('value') == "") {
            $("#closedrrm_tobeonboardplanbError").html("Please Select To on Board");
        }
    }

    //reset skill data 
    _closedaddRRMEntryPoint.closedskillsClearAndShow = function () { // Clear our fields

    }

    //insert skill details New
    _closedaddRRMEntryPoint.insert_SkillInfoEntrysNew = function (e) {

        $.each(e, function (key, value) {
            var skill_version = value.versionId;
            var family = value.familyId;
            var skill = value.skillId;

            if ((skill_version != null || skill_version != "") && (family != null || family != "") && (skill !=null || skill != "")) {
                var data = [];
                {
                    data = {
                        "Method": "PostResourceRequirementSkillMappingsNew",
                        "Data": {
                            "SkillFamilyId": family,
                            "SkillVersionID": skill_version,
                            "SkillId": skill,
                            "IsActive": 'True',
                            "Token": Token,
                            "ResourceRequirementId": ResourceRequirementId
                        }
                    }
                }

                PostDataCallAsync(data, function (postCall) {

                    if (postCall['IsSuccess'] == true) {
                        
                    }
                });
            }
        });
    }

    _closedaddRRMEntryPoint.insert_SkillInfoEntry = function (e) {
        var skill_version = value.versionId;
        var family = value.familyId;
        var skill = value.skillId;

        var data = [];
        {
            data = {
                "Method": "PostResourceRequirementSkillMappings",
                "Data": {
                    "SkillFamilyId": family,
                    "SkillVersionID": skill_version,
                    "SkillId": skill,
                    "FromEditRRM": "False",
                    "IsActive": 'True',
                    "Token": Token,
                    "ResourceRequirementSkillID": null,
                    "ResourceRequirementId": ResourceRequirementId
                }
            }
        }

        PostDataCallAsync(data, function (postCall) {

            if (postCall['IsSuccess'] == true) {
                _closedaddRRMEntryPoint.closedskillsClearAndShow();
                _closedaddRRMEntryPoint.closedgetSkillsDetails();
            }
        });
    }

    _closedaddRRMEntryPoint.update_SkillInfoEntry = function (e) {

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
                _closedaddRRMEntryPoint.closedskillsClearAndShow();
                _closedaddRRMEntryPoint.closedgetSkillsDetails();
            }
        });

    }

    _closedaddRRMEntryPoint.delete_SkillInfoEntry = function (e) {
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
                _closedaddRRMEntryPoint.closedskillsClearAndShow();
                _closedaddRRMEntryPoint.closedgetSkillsDetails();
            }
        });
    }


    //show skill in skill table
    _closedaddRRMEntryPoint.closedgetSkillsDetails = function () {
        var filterData = JSON.stringify({
            "ResourceRequirementId": ResourceRequirementId,
            "IsActive": "True",
            "Token": Token
        });

        callGetListAsync('GetResourceRequrirementSkill', filterData, function (e) {
            GetSkillList = e;

            $("#closedsdgd-rrmOwnerSkills").dxDataGrid({
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
                        dataField: "ResourceRequirementSkillId",
                        visible: false,
                        allowSorting: false
                    },
                    {
                        dataField: "SkillFamilyId",
                        caption: "Family",
                        allowSorting: false,
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
                        caption: "Skills", dataField: "SkillId", allowSorting: false,
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
                        caption: "Versions", dataField: "SkillVersionId", allowSorting: false,
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
                    _closedaddRRMEntryPoint.insert_SkillInfoEntry(e);
                },
                onRowUpdated: function (e) {
                    _closedaddRRMEntryPoint.update_SkillInfoEntry(e);
                },
                onRowRemoved: function (e) {
                    _closedaddRRMEntryPoint.delete_SkillInfoEntry(e);
                }
            });
        })

    }

    _closedaddRRMEntryPoint.saveRRMInterviewers = function (ResourceRequirementIdParam, EmployeeIds) {
        if (EmployeeIds == undefined || EmployeeIds == null) {
            EmployeeIds = null;
        }
        var filterValue = {
            "Method": "PostInterviewersForRRM",
            "Data": {
                "EmployeeId": EmployeeIds,
                "RRMId": ResourceRequirementIdParam,
                "IsActive": true
            }
        }

        PostDataCallAsync(filterValue, function (result) {
            return true;
        });
    }

    // bind skill  table date 
    _closedaddRRMEntryPoint.skillcomputeHTML = function (getSkillList) {
        var html = "";
        html = "<table id='myTable' class='myTable_rrm'>";
        html += "<tr>";
        html += "<th>Family</th>"
        html += "<th>Skills</th>"
        html += "<th>Version</th>"
        html += "<th>Action</th>"
        html += "</tr>";

        if (getSkillList == null || getSkillList == "" || getSkillList == undefined) {
            $(".myTable_rrm").addClass('skillemptytbl');
            html += "<tr><td colspan='4'>No Data..!</td></tr>";
        }
        else {
            getSkillList.forEach(function (key, item) {
                $(".myTable_rrm").removeClass('skillemptytbl');
                var skillId = key.ResourceRequirementSkillId;
                html += "<tr class='row_" + item + "' id='row_" + skillId + "'>";
                html += "<td><input type='hidden' class='family' value='" + key.SkillFamily + "'> " + key.SkillFamily + "</td>"
                html += "<td><input type='hidden' class='skill_type' value='" + key.Skill + "'>" + key.Skill + "</td>"
                html += "<td><input type='hidden' class='version' value='" + key.SkillVersion + "'>" + key.SkillVersion + "</td>"
                html += "<td><button class='btn edit-btn' onclick=editRow_SkillMapping('" + skillId + "')><i class='fas fa-pencil-alt'></i></button>"
                html += "<button class='btn delete-btn' onclick=_closedaddRRMEntryPoint.deleteRow_SkillMapping('" + skillId + "')><i class='fas fa-trash-alt'></i></button></td>"
                html += "</tr>";
            });

        }
        return html;
    }

    _closedaddRRMEntryPoint.loadSkillGrid = function (getSkillList) {
        $("#closedsdgd-rrmOwnerSkills").dxDataGrid({ dataSource: getSkillList })
    }

    //reset form data
    _closedaddRRMEntryPoint.clearAll_addrrmdata = function () {

        $("#closedsdtxt_rrm_requirementname").dxTextBox('instance').option('value', "")
        $("#closedsdtxt_rrm_requiredfor").dxTextBox('instance').option('value', "");
        $("#closedrrm_empid").val("");
        $("#closedrrm_entrybde").val("");
        $("#closedsdnmb_rrm_numberofpositions").dxNumberBox('instance').option('value', "");

        $("#closedsdcmb_rrm_department").dxSelectBox('instance').option('value', "");
        $("#closedsdcmb_rrm_designation").dxSelectBox('instance').option('value', "");
        $("#closedsdnmb_rrm_experiencerequired").dxNumberBox('instance').option('value', "");
        $("#closedsdtxt_rrm_location").dxTextBox('instance').option('value', "");
        var date = new Date();
        var currentDate = date.toISOString().slice(0, 10);
        $("#closedsd_date_rrm_requestedDate").dxDateBox('instance').option('value', currentDate);
        $("#closedsdtxt_rrm_requirementlead").dxTextBox('instance').option('value', "");
        var tdydate = new Date();
        tdydate.setDate(tdydate.getDate() + 1);
        var nxtDate = tdydate.toISOString().slice(0, 10);
        $("#closedsd_date_rrm_tobeonboardplanb").dxDateBox('instance').option('value', nxtDate);
        $("#closedsd_date_rrm_tobeonboardplana").dxDateBox('instance').option('value', nxtDate);
        closedskillsClearAndShow();

    }

    _closedaddRRMEntryPoint.saveSkillsDetailsForClone = function (ResourceRequirementId, closedClonedRRMId) {
        var filterValue = {
            "Method": "PostSkillsForClonedRRM",
            "Data": {
                "ClonedRRMId": closedClonedRRMId,
                "RRMId": ResourceRequirementId,
                "IsActive": true
            }
        }

        PostDataCallAsync(filterValue, function (result) {
            _closedaddRRMEntryPoint.closedgetSkillsDetails();
            return true;
        });
    }

    closedmapUI();
    return _closedaddRRMEntryPoint;
});

function bindRRMTechnologyString() {
    var arrayList = [];
    var skillId;
    var versionId;
    var familyId;
    var selMulti = $("#closedrrm_profileEntry_skills option:selected").each(function (i, e) {
        skillId = e.attributes["skillId"].value;
        versionId = e.attributes["versionId"].value;
        familyId = e.attributes["familyId"].value;
        var technologyObject = { "skillId": skillId, "versionId": versionId, "familyId": familyId };
        arrayList.push(technologyObject);
    });

    return arrayList;
}


function deleteSelectedTechnologyRRM(skillId, versionId, familyId) {
    if ((skillId != null || skillId != "") && (versionId != null || versionId != "") && (familyId != null || familyId != "")) {
        var data = [];
        {
            data = {
                "Method": "DeleteTechnologiesForRRMById",
                "Data": {
                    "SkillFamilyId": familyId,
                    "SkillVersionID": versionId,
                    "SkillId": skillId,
                    "Token": Token,
                    "ResourceRequirementId": closedRRMIDs
                }
            }
        }

        PostDataCallAsync(data, function (postCall) {

            if (postCall['IsSuccess'] == true) {

            }
        });
    }
}

