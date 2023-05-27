EditCloneRRMEntryPoint = (function () {
    var _editCloneRRMEntryPoint = {};

    var requirmentData = {};

    var dataResource = [];
    var dataPlanB = [];
    var dataComments = [];
    var ResourceRequrimentId;
    var dataSkillApi = [];
    var IsRrmSaved = false;
    var RRMID;
    var ResourceRequirementId;
    var ResourceRequirementSkillPlanId = null;
    var GetSkillList;
    var enddateChangedplanA;
    var hrComments;
    var ResourceRequirementSkillPlanAId;
    var ResourceRequirementSkillPlanBId;
    var OnHoldByOwnerStatus = false;
    var OnHoldByClientStatus = false;
    var IsOwnerForSkill = false;
    _editCloneRRMEntryPoint.initializeRRMByTechnical = function (rrmid) {

    }
    
    //conver date to "yyyy-mm-dd" to assign value to dtpicker
    _editCloneRRMEntryPoint.dateFormat = function (dtvalue) {
        var edate = dtvalue;
        if (edate != null) {
            var ed = edate;
            var enddateChanged = ed.replace(/\//g, "-");
            enddateChanged = enddateChanged.replace("T00:00:00", "");
            enddateChanged = enddateChanged.split('-');
            enddateChanged = enddateChanged[0] + "-" + enddateChanged[1] + "-" + enddateChanged[2];
        }
        return enddateChanged;
    }
    //tab next btn events
    _editCloneRRMEntryPoint.toggleTabRRMEntry = function () {
        //debugger;
        var activeTab = $('#rrmtab').find('li.active').attr('id')
        var requirmentLeads = $("#sdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
        if (activeTab == "rrm_requirementTab") {
            var getInterviewerMultipleArry = $("#sdtag_rrm_intervierwers").dxTagBox('instance').option('value');
            var joinInterviewerArray = "";
            $.each(getInterviewerMultipleArry, function (index, val) {
                joinInterviewerArray += val + ",";
            });
            joinInterviewerArray = joinInterviewerArray.replace(/,\s*$/, "");
            if (OnHoldByOwnerStatus == true || OnHoldByClientStatus == true) {
                $('.nav-tabs a[href="#rrm_SkillDetails"]').tab("show");
                readOnlyFormData();
                $(".btnPrevious").show();
                $(".saveFamilyBtn").hide();
                if (LoggedUser == requirmentLeads) {
                    $("a.btnNext").show();
                }
                else {
                    $("a.btnNext").hide();
                }
                _editCloneRRMEntryPoint.getSkillsDetails(RRMID);
                $("#editSkillMappingRRM").hide();
                $("#deleteSkillMappingRRM").hide();
                readOnlyFormData();
            }
            else {
                //debugger;
                requirmentName = $("#sdtxt_rrm_requirementname").dxTextBox('instance').option('value');
                requireFor = $("#sdtxt_rrm_requiredfor").dxTextBox('instance').option('value');
                bde = $("#rrm_entrybde").val();
                if (bde == "") { bde = null; }
                replacementFor = $("#rrm_replacement").val();
                position = $("#sdnmb_rrm_numberofpositions").dxNumberBox('instance').option('value');
                priority = $("#sdcmb_rrm_priority").dxSelectBox('instance').option('value');
                RRMCloneDetailsForValidations.Priority = priority;
                department = $("#sdcmb_rrm_department").dxSelectBox('instance').option('value');
                designation = $("#sdcmb_rrm_designation").dxSelectBox('instance').option('value');
                experience = $("#sdnmb_rrm_experiencerequired").dxNumberBox('instance').option('value');
                RRMCloneDetailsForValidations.ExperienceRequired = experience;
                interviewers = $("#sdtag_rrm_intervierwers").dxTagBox('instance').option('value');
                communication = $("#sdcmb_rrm_communication").dxSelectBox('instance').option('value');
                RRMCloneDetailsForValidations.Communication = communication;
                reqlocation = $("#sdtxt_rrm_location").dxTextBox('instance').option('value');
                requestedDate = $("#sd_date_rrm_requestedDate").dxDateBox('instance').option('value');
                losingRevenue = $("#sdchk_rrm_losingRevenue").dxCheckBox('instance').option('value');
                fromVIP = $("#sdchk_rrm_fromVIP").dxCheckBox('instance').option('value');
                requirmentLead = $("#sdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
                leadApproval = $("#sdchk_rrm_leadApproval").dxCheckBox('instance').option('value');

                if (reqlocation == "") { reqlocation = null; }
                var finalRequestedDate = moment(requestedDate).format("DD-MM-YYYY");

                if (requirmentName.trim() == "" || requireFor.trim() == "" || position == "" || position == "0" || department == "" || designation == "" || experience == "" || experience == "0" || interviewers.length == 0 || priority == null || priority == "") {
                    if (requirmentName.trim() == "") {
                        $('#sdtxt_rrm_requirementname').addClass('input-error');
                        $('#rrm_requirementnameError').html("Enter Requirment Name");
                    }
                    else {
                        $('#sdtxt_rrm_requirementname').removeClass('input-error');
                        $('#rrm_requirementnameError').html("");
                    }
                    if (requireFor.trim() == "") {
                        $('#sdtxt_rrm_requiredfor').addClass('input-error');
                        $('#rrm_requiredforError').html("Enter Required For");
                    }
                    else {
                        $('#sdtxt_rrm_requiredfor').removeClass('input-error');
                        $('#rrm_requiredforError').html("");
                    }
                    if (position == "" || position == "0") {
                        if (position == "") {
                            if (position == "") {
                                $('#sdnmb_rrm_numberofpositions').addClass('input-error');
                                $('#rrm_numberofpositionsError').html("Enter Position");
                            }
                            else {
                                $('#sdnmb_rrm_numberofpositions').removeClass('input-error');
                                $('#rrm_numberofpositionsError').html("");
                            }
                        }
                        if (position == "0") {
                            if (position == "0") {
                                $('#sdnmb_rrm_numberofpositions').addClass('input-error');
                                $('#rrm_numberofpositionsError').html("Min Position is 1");
                            }
                            else {
                                $('#sdnmb_rrm_numberofpositions').removeClass('input-error');
                                $('#rrm_numberofpositionsError').html("");
                            }
                        }
                    }
                    if (department == "") {
                        $('#sdcmb_rrm_department').addClass('input-error');
                        $('#rrm_departmentError').html("Select Department");
                    }
                    else {
                        $('#sdcmb_rrm_department').removeClass('input-error');
                        $('#rrm_departmentError').html("");
                    }

                    if (designation == "") {
                        $('#sdcmb_rrm_designation').addClass('input-error');
                        $('#rrm_designationError').html("Select Designation");
                    }
                    else {
                        $('#sdcmb_rrm_designation').removeClass('input-error');
                        $('#rrm_designationError').html("");
                    }
                    if (experience == "" || experience == "0") {
                        if (experience == "") {
                            if (experience == "") {
                                $('#sdnmb_rrm_experiencerequired').addClass('input-error');
                                $('#rrm_experiencerequiredError').html("Select Experience");
                            }
                            else {
                                $('#sdnmb_rrm_experiencerequired').removeClass('input-error');
                                $('#rrm_experiencerequiredError').html("");
                            }
                        }
                        if (experience == "0") {
                            if (experience == "0") {
                                $('#sdnmb_rrm_experiencerequired').addClass('input-error');
                                $('#rrm_experiencerequiredError').html("Min Experience is 1");
                            }
                            else {
                                $('#sdnmb_rrm_experiencerequired').removeClass('input-error');
                                $('#rrm_experiencerequiredError').html("");
                            }
                        }
                    }
                    if (interviewers.length == 0) {
                        $("#sdtag_rrm_intervierwers").addClass('input-error');
                        $("#rrm_interviewersError").html("Select interviewer(s)");
                    }
                    else {
                        $("#sdtag_rrm_intervierwers").removeClass('input-error');
                        $("#rrm_interviewersError").html("");
                    }

                    if(priority == null || priority == ""){
                        $("#sdcmb_rrm_priority").addClass('input-error');
                        $("#rrm_priorityError").html("Select Priority");
                    }
                    else{
                        $("#sdcmb_rrm_priority").removeClass('input-error');
                        $("#rrm_priorityError").html("");
                    }

                    $('.nav-tabs a[href="#rrm_requirementTab"]').tab("show");
                    $(".btnPrevious").hide();
                    $(".saveFamilyBtn").hide();
                    if (LoggedUser == requirmentLead) {
                        $("a.btnNext").show();
                    }
                    else {
                        $("a.btnNext").hide();
                    }
                }
                else {

                    if (requirmentData.Communication != communication || requirmentData.PriorityId != priority || requirmentData.Location != reqlocation || requirmentData.ExperiencerequiredInYrs != experience || arraysEqual(RRMCloneDetailsForValidations.Interviewers, interviewers) != true) {
                        var updatedContent = "";
                        if (requirmentData.Communication != communication) {

                            updatedContent += "Communication has been changed from '" + requirmentData.Communication + "' to '" + communication + "'  \n "
                            //communication = requirmentData.Communication;

                            requirmentData["Communication"] = communication;
                            $("#sdcmb_rrm_communication").dxSelectBox('instance').option('value', communication);
                            communication = $("#sdcmb_rrm_communication").dxSelectBox('instance').option('value');
                            IsPassed = 1;
                        }
                        if (requirmentData.PriorityId != priority) {
                            var exististingVal = $("#sdcmb_rrm_priority").dxSelectBox('instance').option('value', requirmentData.PriorityId);
                            exististingVal = $("#sdcmb_rrm_priority").dxSelectBox('instance').option('text');

                            var currentVal = $("#sdcmb_rrm_priority").dxSelectBox('instance').option('value', priority);
                            requirmentData["PriorityId"] = priority;
                            $("#sdcmb_rrm_priority").dxSelectBox('instance').option('value', priority);
                            priority = $("#sdcmb_rrm_priority").dxSelectBox('instance').option('value');

                            currentVal = $("#sdcmb_rrm_priority").dxSelectBox('instance').option('text');
                            updatedContent += "Priority has been changed from '" + exististingVal + "' to '" + currentVal + "' \n"
                            IsPassed = 1;


                        }
                        if (requirmentData.Location != reqlocation) {

                            updatedContent += "Location has been changed from '" + requirmentData.Location + "' to '" + reqlocation + "' \n"
                            requirmentData["Location"] = reqlocation;
                            $("#sdtxt_rrm_location").dxTextBox('instance').option('value', reqlocation);
                            reqlocation = $("#sdtxt_rrm_location").dxTextBox('instance').option('value');
                            IsPassed = 1;

                        }
                        if (requirmentData.ExperiencerequiredInYrs != experience) {

                            updatedContent += "Experience has been changed from '" + requirmentData.ExperiencerequiredInYrs + "' to '" + experience + "' \n"
                            requirmentData["ExperiencerequiredInYrs"] = experience;
                            $("#sdnmb_rrm_experiencerequired").dxNumberBox('instance').option('value', experience);
                            experience = $("#sdnmb_rrm_experiencerequired").dxNumberBox('instance').option('value');
                            IsPassed = 1;
                        }
                        if (arraysEqual(RRMCloneDetailsForValidations.Interviewers, interviewers) != true) {
                            var OldInterviewersList = [];
                            var NewInterviewersList = [];
                            $(RRMCloneDetailsForValidations.Interviewers).each(function (idx, obj) {
                                $(interviewersCloneData).each(function (idx1, obj1) {
                                    if (obj == obj1.EmployeeId) {
                                        OldInterviewersList.push(obj1.EmployeeName)
                                    }
                                })
                            });
                            $(interviewers).each(function (idx, obj) {
                                $(interviewersCloneData).each(function (idx1, obj1) {
                                    if (obj == obj1.EmployeeId) {
                                        NewInterviewersList.push(obj1.EmployeeName)
                                    }
                                })
                            })
                            updatedContent += "Interviewer(s) list has been changed from '" + OldInterviewersList.toString().replace(',', ', ') + "' to '" + NewInterviewersList.toString().replace(',', ', ') + "' \n";
                            RRMCloneDetailsForValidations.Interviewers = interviewers;
                            IsPassed = 1;
                        }
                        if (IsPassed == 1) {
                            dataComments = {
                                "Method": "PostCommentsInResourceRequirement",
                                "Data": {
                                    "ResourceRequirementId": ResourceRequirementId,
                                    "Comments": updatedContent,
                                    "IsActive": 'True',
                                }
                            }

                            //var resultComments = PostDataCall(dataComments);
                            PostDataCallAsync(dataComments, function (resultComments) {
                                //
                            });
                        }
                    }
                    
                    dataResource = {
                        "Method": "PostResourceRequirement",
                        "Data": {
                            "Token": Token,
                            "RequirementName": requirmentName,
                            "ResourceRequirementId": ResourceRequirementId,
                            "ResourceRequirementTypeId": null,
                            "RequiredFor": requireFor,
                            "RequestForProposalId": null,
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
                            "IsActive": 'True',

                        }

                    }
                    _editCloneRRMEntryPoint.saveRRMInterviewers(ResourceRequirementId, joinInterviewerArray)
                    // var resultResorce = PostDataCall(dataResource);
                    PostDataCallAsync(dataResource, function (resultResorce) {
                        //
                    });

                    var updatedContent = "";
                    var IsPassed = 0;


                    $('.nav-tabs a[href="#rrm_SkillDetails"]').tab("show");

                    var filter_val1 = JSON.stringify({
                        Token : Token,
                        RRMId: ResourceRequirementId,
                        IsActive: 'True'
                    });
                    
                    var technologyArray = new Array();
                    var getTechnologiesForRRM = callgetlist("GetTechnologiesForRRMById", filter_val1);

                    getTechnologiesForRRM.forEach(function (item) {
                        $('#rrm_profileEntry_skills').attr({ "skillId": item.SkillId, "versionId": item.SkillVersionID, "familyId": item.SkillFamilyId, "value": item.SkillId + "-" + item.SkillVersionID });
                        technologyArray.push(item.SkillId + "-" + item.SkillVersionID);
                        $('#rrm_profileEntry_skills').val(technologyArray);
                        $('#rrm_profileEntry_skills').select2();
                    });
                    _editCloneRRMEntryPoint.getSkillsDetails(RRMID);
                    $(".btnPrevious").show();
                    $(".saveFamilyBtn").hide();
                    if (LoggedUser == requirmentLead) {
                        $("a.btnNext").show();
                    }
                    else {
                        $("a.btnNext").hide();
                    }

                    // getSkillsDetails('"+RRMID+"');
                    // getSkillsDetailseditfrm(RRMID);
                }
            }
        }

        if (activeTab == "rrm_skillsTab") {
            var data = $("#sdgd-rrmOwnerSkills").dxDataGrid("instance").option("dataSource");

            if (($("#rrm_profileEntry_skills").val() == "" || $("#rrm_profileEntry_skills").val() == 0) && data.length == 0) {
                swal({
                    title: "Warning!",
                    text: "Please Add Skill  Details",
                    icon: "warning",
                    button: "ok!",
                })
            }
            else {
                var result = bindRRMTechnologyStrings();
                _editCloneRRMEntryPoint.update_SkillInfoEntryNew(result);

                $('.nav-tabs a[href="#rrm_SkillsPlanADetails"]').tab("show");
                $("#sd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('value', planAcomments);
                $(".btnPrevious").show();
                $(".saveFamilyBtn").hide();
                var requirmentLead = $("#sdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
                if (LoggedUser == requirmentLead) {
                    $("a.btnNext").show();
                }
                else {
                    $("a.btnNext").hide();
                }
            }
        }

        if (activeTab == "rrm_skillsplanaTab") {
            // debugger;
            if (OnHoldByOwnerStatus == true || OnHoldByClientStatus == true) {
                $('.nav-tabs a[href="#rrm_SkillsPlanBDetails"]').tab("show");
                $("#sd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value', planBcomments)

                $(".btnPrevious").show();
                $(".saveFamilyBtn").hide();
                var requirmentLead = $("#sdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
                if (LoggedUser == requirmentLead) {
                    $("a.btnNext").show();
                }
                else {
                    $("a.btnNext").hide();
                }
            }
            else {
                var datecheck = 0;
                var RecruiterA;
                skillDetailsA = $("#sd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('value');
                $("#sd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('value', planAcomments);
                toOnBoardA = $("#sd_date_rrm_tobeonboardplana").dxDateBox('instance').option('value')
                requirtersA = $("#rrm_recruitersplana").val();
                var edate = $("#sd_date_rrm_tobeonboardplana").dxDateBox('instance').option('value')
                if (requirtersA != null) {
                    RecruiterA = requirtersA.toString();
                }
                var varEDate = new Date().toISOString().slice(0, 10); //dd-mm-YYYY
                if ((skillDetailsA == "" || toOnBoardA == "") || datecheck == 1) {
                    //debugger;
                    if (skillDetailsA == "") {
                        $('#rrm_skilldetailsplanan').addClass('input-error');
                        $('#rrm_skilldetailsplanaError').html("Enter Skill Details");
                    } else {
                        $('#rrm_skilldetailsplanan').removeClass('input-error');
                        $('#rrm_skilldetailsplanaError').html("");
                    }
                    if (toOnBoardA == "") {
                        $('#rrm_tobeonboardplana').addClass('input-error');
                        $('#rrm_tobeonboardplanaError').html("Select Date");
                    } else {
                        $('#rrm_tobeonboardplana').removeClass('input-error');
                        $('#rrm_tobeonboardplanaError').html("");
                    }
                    $('.nav-tabs a[href="#rrm_skillsplanaTab"]').tab("show");

                    $(".btnPrevious").show();
                    $(".saveFamilyBtn").hide();
                    var requirmentLead = $("#sdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
                    if (LoggedUser == requirmentLead) {
                        $("a.btnNext").show();
                    }
                    else {
                        $("a.btnNext").hide();
                    }
                }
                else {
                    RRMCloneDetailsForValidations.planAcomments = skillDetailsA;
                    dataPlanA_frmrrm = {
                        "Method": "PostResourceRequrimentSkillPlans",
                        "Data": {
                            "Token": Token,
                            "ResourceRequirementId": ResourceRequirementId,
                            "ResourceRequirementSkillPlanId": ResourceRequirementSkillPlanAId,
                            "SkillPlan": 'PlanA',
                            "SkillPlanInfo": skillDetailsA,
                            "ToBeOnBoard": toOnBoardA,
                            //"RecruiterId": RecruiterA,
                            "IsActive": 'True'
                        }
                    }

                    var resulPlanBt = PostDataCall(dataPlanA_frmrrm);
                    PostDataCallAsync(dataPlanA_frmrrm, function (resulPlanBt) {
                        //
                    });
                    $('.nav-tabs a[href="#rrm_SkillsPlanBDetails"]').tab("show");
                    $("#sd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value', planBcomments);
                    $(".btnPrevious").show();
                    $(".saveFamilyBtn").hide();
                    var requirmentLead = $("#sdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
                    if (LoggedUser == requirmentLead) {
                        $("a.btnNext").show();
                    }
                    else {
                        $("a.btnNext").hide();
                    }
                }
            }
        }

        if (activeTab == "rrm_skillsplanbTab") {
            // debugger;
            if (OnHoldByOwnerStatus == true || OnHoldByClientStatus == true) {
                $('.nav-tabs a[href="#rrm_CommentsDetails"]').tab("show");
                $("#sd_txtEditor_RRMComments").dxHtmlEditor('instance').option('value', "")
                $(".btnPrevious").show();
                $(".saveFamilyBtn").show();
                $("a.btnNext").hide();
                _editCloneRRMEntryPoint.getManageCommentHistory(ResourceRequirementId);
            }
            else {
                $("#sd_txtEditor_RRMComments").dxHtmlEditor('instance').option('value', "")
                var datecheck = 0;
                skillDetailsB = $("#sd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value');
                toOnBoardB = $("#sd_date_rrm_tobeonboardplanb").dxDateBox('instance').option('value')
                requirtersB = $("#rrm_recruitersplanb").val();
                var edate = $("#sd_date_rrm_tobeonboardplanb").dxDateBox('instance').option('value')
                var varEDate = new Date().toISOString().slice(0, 10); //dd-mm-YYYY
                // if (edate <= varEDate) {
                //     datecheck = 1;
                //     swal({
                //         title: "Warning!",
                //         text: "Please enter valid Date current and previous date should not be selected",
                //         icon: "warning",
                //         button: "ok!",
                //     })
                // }
                if ((skillDetailsB == "" || toOnBoardA == "") || datecheck == 1) {

                    if (skillDetailsB == "") {
                        $('#sd_txtEditor_skillDetailsPlanB').addClass('input-error');
                        $('#rrm_skilldetailsplanbError').html("Enter Skill Details");
                    } else {
                        $('#sd_txtEditor_skillDetailsPlanB').removeClass('input-error');
                        $('#rrm_skilldetailsplanbError').html("");
                    }
                    if (toOnBoardB == "") {
                        $('#rrm_tobeonboardplanb').addClass('input-error');
                        $('#rrm_tobeonboardplanbError').html("Select Date");
                    } else {
                        $('#rrm_tobeonboardplanb').removeClass('input-error');
                        $('#rrm_tobeonboardplanbError').html("");
                    }
                    $('.nav-tabs a[href="#rrm_skillsplanbTab"]').tab("show");
                    $(".btnPrevious").show();
                    $(".saveFamilyBtn").hide();
                    var requirmentLead = $("#sdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
                    if (LoggedUser == requirmentLead) {
                        $("a.btnNext").show();
                    }
                    else {
                        $("a.btnNext").hide();
                    }
                } else {
                    RRMCloneDetailsForValidations.planBcomments = skillDetailsB;
                    dataPlanB = {
                        "Method": "PostResourceRequrimentSkillPlans",
                        "Data": {
                            "ResourceRequirementId": ResourceRequirementId,
                            "Token": Token,
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
                        //
                        $('.nav-tabs a[href="#rrm_CommentsDetails"]').tab("show");
                        //CKEDITOR.instances.rrm_comments.setData(hrComments);
                        $(".btnPrevious").show();
                        $(".saveFamilyBtn").show();
                        $("a.btnNext").hide();
                        _editCloneRRMEntryPoint.getManageCommentHistory(ResourceRequirementId);
                    });
                }
            }
        }
        resetSimpleBarRRMEntryPoint();
    }

    _editCloneRRMEntryPoint.btnsendreminder = function (ResourceRequirementId) {
        var Comments = "Please assign a recruiters for this RRM "
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
            swal({
                //title: "Response Meassage",
                text: "Notified the HR team",
                icon: "info",
                button: "ok!",
            })
        });
        _editCloneRRMEntryPoint.getManageCommentHistory(ResourceRequirementId);
    }

    //bind getrrmbyid values in form
    _editCloneRRMEntryPoint.RRMEntryFromRRM = function (rrmid) {
        
        RRMID = rrmid;
        ResourceRequirementId = rrmid;
        var filterData = JSON.stringify({
            "Token": Token,
            "ResourceRequirementId": rrmid,
            "IsActive": true,
        });  

        callGetListAsync('GetRRMById', filterData, function (e) {
           
            _editCloneRRMEntryPoint.mapupdaterrmListcomputeHTML(e);
        })
    }

    _editCloneRRMEntryPoint.update_SkillInfoEntryNew = function (e) {

        $.each(e, function (key, value) {
            var skill_version = value.versionId;
            var family = value.familyId;
            var skill = value.skillId;

            if ((skill_version != null || skill_version != "") && (family != null || family != "") && (skill != null || skill != "")) {
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

    //clear form data
    _editCloneRRMEntryPoint.clearAll = function () {
        $("#rrmno").text("");
        $("#sdtxt_rrm_requirementname").dxTextBox('instance').option('value', "");
        $("#sdtxt_rrm_requiredfor").dxTextBox('instance').option('value', "");
        $("#rrm_empid").val("");
        $("#rrm_entrybde").val("");
        $("#sdnmb_rrm_numberofpositions").dxNumberBox('instance').option('value', "");

        $("#sdcmb_rrm_department").dxSelectBox('instance').option('value', "");
        $("#sdcmb_rrm_designation").dxSelectBox('instance').option('value', "");
        $("#sdnmb_rrm_experiencerequired").dxNumberBox('instance').option('value', "");
        $("#sdtxt_rrm_location").dxTextBox('instance').option('value', "");
        var date = new Date();
        var currentDate = date.toISOString().slice(0, 10);
        $("#sd_date_rrm_requestedDate").dxDateBox('instance').option('value', currentDate);
        $("#sdtxt_rrm_requirementlead").dxTextBox('instance').option('value', "");
        var tdydate = new Date();
        tdydate.setDate(tdydate.getDate() + 1);
        var nxtDate = tdydate.toISOString().slice(0, 10);
        $("#sd_date_rrm_tobeonboardplana").dxDateBox('instance').option('value', nxtDate)
        $("#sd_date_rrm_tobeonboardplanb").dxDateBox('instance').option('value', nxtDate)

        $("#sd_txtEditor_RRMComments").dxHtmlEditor('instance').option('value', "")
        $("#sd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('value', "");
        $("#sd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value', "");

    }

    //map update rrm List compute HTML
    _editCloneRRMEntryPoint.mapupdaterrmListcomputeHTML = function (getRRMData) {
        var minDate = new Date();
        minDate.setDate(minDate.getDate());
        var minTdyDate = minDate.toISOString().slice(0, 10);
        $("#sd_date_rrm_tobeonboardplana").dxDateBox("instance").option("min", minTdyDate);
        $("#sd_date_rrm_tobeonboardplanb").dxDateBox("instance").option("min", minTdyDate);

        if(getRRMData[0] !=undefined && getRRMData[0] != ""){
            if (getRRMData[0].rrmid == "") {

            }
            else {
                //debugger;
                var data;
                var EmployeeId = null;
                getRRMData.forEach(function (key, item) {
                    //debugger;
                    OnHoldByOwnerStatus = key.OnHoldByOwner;
                    OnHoldByClientStatus = key.OnHoldByClient;
    
                    $("#rrmmodelpagetitle").text("Edit RRM - " + key.RRMNo);
                    $("#rrmStatus").text(key.Status);
                    if (key.RFPId != null && key.RFPId != "") {
                        $("#rrm_rfpid").val(key.RFPId);
                        $("#hidedivRFP").show();
                    }
                    else{
                        $("#rrm_rfpid").val('');
                        $("#hidedivRFP").hide();
                    }
                    if (key.BDEId != null && key.BDEId != "") {
                        $("#rrm_entrybde").val(key.BDEId);
                        $("#hidedivRFP").show();
                    }
                    else {
                        $("#rrm_entrybde").val('');
                        $("#hidedivRFP").hide();
                    }
                    $("#sdtxt_rrm_requirementname").dxTextBox('instance').option('value', key.RequirementName);
                    $("#sdtxt_rrm_requiredfor").dxTextBox('instance').option('value', key.RequiredFor);
                    $("#rrm_empid").val(key.EmployeeId);
                  
                    if (key.PriorityId != "") {
                        RRMCloneDetailsForValidations.Priority = key.PriorityId;
                        $("#sdcmb_rrm_priority").dxSelectBox('instance').option('value', key.PriorityId);
                    }
                    $("#sdcmb_rrm_priority").dxSelectBox('instance').option('value', key.PriorityId);
                    $("#sdnmb_rrm_numberofpositions").dxNumberBox('instance').option('value', key.NumberOfPositions);
                    $("#sdcmb_rrm_communication").dxSelectBox('instance').option('value', key.Communication);
                    if (key.Communication != "") {
                        RRMCloneDetailsForValidations.Communication = key.Communication
                        $("#sdcmb_rrm_communication").dxSelectBox('instance').option('value', key.Communication);
                    }
    
                    $("#sdcmb_rrm_department").dxSelectBox('instance').option('value', key.DepartmentId);
                    $("#sdcmb_rrm_designation").dxSelectBox('instance').option('value', key.DesignationId);
                    RRMCloneDetailsForValidations.ExperienceRequired = key.ExperiencerequiredInYrs;
                    $("#sdnmb_rrm_experiencerequired").dxNumberBox('instance').option('value', key.ExperiencerequiredInYrs);
                    $("#sdtxt_rrm_location").dxTextBox('instance').option('value', key.Location);
                    if (key.Location != "") {
                        $("#sdtxt_rrm_location").dxTextBox('instance').option('value', key.Location);
                    }
    
                    $("#sd_date_rrm_requestedDate").dxDateBox('instance').option('value', key.RequestedDate);
                    if (ResourceRequirementType == "G") {
                        $("#sdtxt_rrm_requirementlead").dxTextBox('instance').option('value', key.Owner);
                    }
                    else if (ResourceRequirementType == "P") {
                        $("#sdtxt_rrm_requirementlead").dxTextBox('instance').option('value', key.Owner);
                    }
                    else if (ResourceRequirementType == "R") {
                        $("#sdtxt_rrm_requirementlead").dxTextBox('instance').option('value', key.LeadName);
                    }
    
                    $("#sdchk_rrm_losingRevenue").dxCheckBox('instance').option('value',key.LosingRevenue);
                    $("#sdchk_rrm_fromVIP").dxCheckBox('instance').option('value',key.VIP);
    
                    var RequirmentLead = $("#sdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
                    if (LoggedUser == RequirmentLead) {
                        $("a.btnNext").show();
                    }
                    else {
                        $("a.btnNext").hide();
                    }
    
                    if(LoggedUser == RequirmentLead){
                        $("#RRMEntryPointTypeDetails").removeClass("label label-default m-l-xs");
                        $("#RRMEntryPointTypeDetails").html("Owner").addClass("label label-warning m-l-xs");
                    }
                    else{
                        $("#RRMEntryPointTypeDetails").removeClass("label label-warning m-l-xs");
                        $("#RRMEntryPointTypeDetails").html("View Only").addClass("label label-default m-l-xs");;
                    }
    
                    if(LoggedUser == RequirmentLead){
                        $("#sdchk_rrm_losingRevenue").dxCheckBox('instance').option('readOnly',false);
                        $("#sdchk_rrm_fromVIP").dxCheckBox('instance').option('readOnly',false);
                    }
                    else{
                        $("#sdchk_rrm_losingRevenue").dxCheckBox('instance').option('readOnly',true);
                        $("#sdchk_rrm_fromVIP").dxCheckBox('instance').option('readOnly',true);
                    }
    
                    if (LoggedUser == RequirmentLead && (OnHoldByOwnerStatus == false || OnHoldByClientStatus == false)) {
                        $("#sdcmb_rrm_priority").dxSelectBox('instance').option('readOnly', false);
                        $("#sdcmb_rrm_department").dxSelectBox('instance').option('readOnly', false);
                        $("#sdnmb_rrm_experiencerequired").dxNumberBox('instance').option('readOnly', false);
                        $("#sdcmb_rrm_communication").dxSelectBox('instance').option('readOnly', false);
                        $("#sdtxt_rrm_location").dxTextBox('instance').option('readOnly', true);
                        $("#sdtag_rrm_intervierwers").dxTagBox('instance').option('readOnly', false);
                        $("#sd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('readOnly', false);
                        $("#sd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('readOnly', false);
                        $("#sdchk_rrm_leadApproval").dxCheckBox("instance").option("readOnly",false);
                        //allow User to click reminder btn
                        if (key.PlanARecruiters == null) {
                            $("#hidereminder").show();
                        }
                        if (key.PlanBRecruiters == null) {
                            $("#hidereminderplanB").show();
                        }
                    }
                    else {
                        $("#sdcmb_rrm_priority").dxSelectBox('instance').option('readOnly', true);
                        $("#sdcmb_rrm_department").dxSelectBox('instance').option('readOnly', false);
                        $("#sdnmb_rrm_experiencerequired").dxNumberBox('instance').option('readOnly', true);
                        $("#sdcmb_rrm_communication").dxSelectBox('instance').option('readOnly', true);
                        $("#sdtxt_rrm_location").dxTextBox('instance').option('readOnly', true);
                        $("#sdtag_rrm_intervierwers").dxTagBox('instance').option('readOnly', true);
                        $("#sd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('readOnly', true)
                        $("#sd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('readOnly', true);
                        $("#sdchk_rrm_leadApproval").dxCheckBox("instance").option("readOnly",true);
                        
                        $("#hidereminder").hide();
                        $("#hidereminderplanB").hide();
                    }
                    if (key.OwnerId == localStorage.getItem("EmployeeID")) {
                        IsOwnerForSkill = true;
                    }
                    else {
                        IsOwnerForSkill = false;
                    }
                    hrComments = key.Comments;
                    if (OnHoldByOwnerStatus == true || OnHoldByClientStatus == true) {
                        readOnlyFormData();
                        $("#sd_txtEditor_RRMComments").dxHtmlEditor('instance').option('value', '');
                        $("#OwnerrrmHoldStatus").html("On-Hold").addClass("label label-warning m-l-xs");
                        if (OnHoldByOwnerStatus == true) {
                            $("#switchLead").dxSwitch('instance').option("disabled", true);
                            $("#switchLead").dxSwitch('instance').option("value", true);
                            $("#switchClient").dxSwitch('instance').option("disabled", true);
                            $("#switchClient").dxSwitch('instance').option("value", false);
                        }
                        if (OnHoldByClientStatus == true) {
                            $("#switchClient").dxSwitch('instance').option("disabled", true);
                            $("#switchClient").dxSwitch('instance').option("value", true);
                            $("#switchLead").dxSwitch('instance').option("disabled", true);
                            $("#switchLead").dxSwitch('instance').option("value", false);
                        }
                        IsOwnerForSkill = false;
                    }
                    else {
                        $("#sd_txtEditor_RRMComments").dxHtmlEditor('instance').option('value', '')
                        $("#OwnerrrmHoldStatus").attr('class', '');
                        $("#OwnerrrmHoldStatus").html('');
                        $("#switchClient").dxSwitch('instance').option("disabled", true);
                        $("#switchClient").dxSwitch('instance').option("value", false);
                        $("#switchLead").dxSwitch('instance').option("disabled", false);
                        $("#switchLead").dxSwitch('instance').option("value", false);
                    }
    
                    $("#sdnmb_rrm_numberofpositions").dxNumberBox('instance').option('value', getRRMData[0].NumberOfPositions);
                    planAcomments = key['PlanA-SkillPlanInfo'];
                    RRMCloneDetailsForValidations.planAcomments = planAcomments;
                    $("#sd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('value', planAcomments);
                    planBcomments = key['PlanB-SkillPlanInfo'];
                    RRMCloneDetailsForValidations.planBcomments = planBcomments;
                    $("#sd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value', planBcomments);
                    if (key['PlanA-OnBoardDate'] != null && key['PlanA-OnBoardDate'] != "" && key['PlanA-OnBoardDate'] != undefined) {
                        $("#sd_date_rrm_tobeonboardplana").dxDateBox('instance').option('value', key['PlanA-OnBoardDate']);
                        $("#sd_date_rrm_tobeonboardplana").dxDateBox('instance').option('readOnly', true);
                        $("#sdbtn_reminderA").dxButton('instance').option('visible', true);
                    }
                    else {
                        $("#sd_date_rrm_tobeonboardplana").dxDateBox('instance').option('readOnly', false);
                        $("#sdbtn_reminderA").dxButton('instance').option('visible', false);
                    }
                    if (key['PlanB-OnBoardDate'] != null && key['PlanB-OnBoardDate'] != "" && key['PlanB-OnBoardDate'] != undefined) {
                        $("#sd_date_rrm_tobeonboardplanb").dxDateBox('instance').option('value', key['PlanB-OnBoardDate']);
                        $("#sd_date_rrm_tobeonboardplanb").dxDateBox('instance').option('readOnly', true);
                        $("#sdbtn_reminderB").dxButton('instance').option('visible', true);
                    }
                    else {
                        $("#sd_date_rrm_tobeonboardplanb").dxDateBox('instance').option('readOnly', false);
                        $("#sdbtn_reminderB").dxButton('instance').option('visible', false);
                    }
                    var PlanARecruitersName;
                    var PlanBRecruitersName;
                    if (key.PlanARecruiters != null) {
                        PlanARecruitersName = key.PlanARecruiters.split(',');
                    }
                    else {
                        PlanARecruitersName = [];
                    }
                    if (key.PlanBRecruiters != null) {
                        PlanBRecruitersName = key.PlanBRecruiters.split(',');
                    }
                    else {
                        PlanBRecruitersName = [];
                    }
                    $("#sd_tag_recruiter_owner_rrm").dxTagBox('instance').option('items', PlanARecruitersName);
                    $("#sd_tag_recruiter_owner_rrm").dxTagBox('instance').option('value', PlanARecruitersName);
                    $("#sd_tag_recruitersplanb_rrm").dxTagBox('instance').option('items', PlanBRecruitersName);
                    $("#sd_tag_recruitersplanb_rrm").dxTagBox('instance').option('value', PlanBRecruitersName);
    
                    if (key.PlanBRecruitersId != null || key.PlanBRecruitersId != undefined) {
                        $("#sdbtn_reminderB").dxButton('instance').option('visible', false);
                    }
                    else { $("#sdbtn_reminderB").dxButton('instance').option('visible', true); }
    
                    if (key.PlanARecruitersId != null || key.PlanARecruitersId != undefined) {
                        $("#sdbtn_reminderA").dxButton('instance').option('visible', false);
                    }
                    else { $("#sdbtn_reminderA").dxButton('instance').option('visible', true); }
    
                    requirmentData["PriorityId"] = key.PriorityId;
                    requirmentData["Communication"] = key.Communication;
                    requirmentData["Location"] = key.Location;
                    requirmentData["ExperiencerequiredInYrs"] = key.ExperiencerequiredInYrs;
                });
            }
        }
        
        _editCloneRRMEntryPoint.getResourceRequirementSkillPlanAId();
        _editCloneRRMEntryPoint.getResourceRequirementSkillPlanBId();

        $("#sd_date_rrm_tobeonboardplana").dxDateBox("instance").option("isValid", true);
        $("#sd_date_rrm_tobeonboardplanb").dxDateBox("instance").option("isValid", true);
    }

    //To get Resource RequirementSkill PlanB Id
    _editCloneRRMEntryPoint.getResourceRequirementSkillPlanAId = function () {

        var dataResourceGetSkillId = JSON.stringify({
            "Token": Token,
            "ResourceRequirementId": ResourceRequirementId,
            "SkillPlans": "PlanA",
            "IsActive": "True"
        });

        // var result = callgetlist('GetResourceRequrimentSkillPlans', dataResourceGetSkillId);
        callGetListAsync('GetResourceRequrimentSkillPlans', dataResourceGetSkillId, function (result) {
            if (result[0] != null && result[0] != undefined) {
                ResourceRequirementSkillPlanAId = result[0].ResourceRequirementSkillPlanId;
            }
            else {
                ResourceRequirementSkillPlanAId = null
            }
        })
    }

    //To get Resource RequirementSkill PlanB Id
    _editCloneRRMEntryPoint.getResourceRequirementSkillPlanBId = function () {
        var dataResourceGetSkillId = JSON.stringify({
            "Token": Token,
            "ResourceRequirementId": ResourceRequirementId,
            "SkillPlans": "PlanB",
            "IsActive": "True"
        });

        //var result = callgetlist('GetResourceRequrimentSkillPlans', dataResourceGetSkillId);
        callGetListAsync('GetResourceRequrimentSkillPlans', dataResourceGetSkillId, function (result) {
            if (result[0] != null && result[0] != undefined) {
                ResourceRequirementSkillPlanBId = result[0].ResourceRequirementSkillPlanId;
            }
            else {
                ResourceRequirementSkillPlanBId = null
            }
        })
    }

    //skill mapping
    //_editCloneRRMEntryPoint.skillcomputeHTML = function (e) {
    //    var html = "";
    //    if (e == null || e == "") {
    //        html = "<table id='myTable' class='skillemptytbl myTable_rrm'>";
    //        html += "<tr>";
    //        html += "<th>Family</th>"
    //        html += "<th>Skills</th>"
    //        html += "<th>Version</th>"
    //        html += "<th>Action</th>"
    //        html += "</tr>";
    //        html += "<tr><td colspan='4'>No Data..!</td></tr>";

    //    } else {
    //        var html = "<table id='myTable' class='myTable_rrm'>";
    //        html += "<tr>";
    //        html += "<th>Family</th>"
    //        html += "<th>Skills</th>"
    //        html += "<th>Version</th>"
    //        html += "<th>Action</th>"
    //        html += "</tr>";
    //        e.forEach(function (key, item) {
    //            var skillId = key.ResourceRequirementSkillId;
    //            html += "<tr class='row_" + item + "' id='row_" + skillId + "'>";
    //            html += "<td><input type='hidden' class='family' value='" + key.SkillFamily + "'> " + key.SkillFamily + "</td>"
    //            html += "<td><input type='hidden' class='skill_type' value='" + key.Skill + "'>" + key.Skill + "</td>"
    //            html += "<td><input type='hidden' class='version' value='" + key.SkillVersion + "'>" + key.SkillVersion + "</td>"
    //            html += "<td><button class='btn edit-btn editSkillMappingRRM' id='editSkillMappingRRM' onclick=editRow_SkillMapping('" + skillId + "')><i class='fas fa-pencil-alt'></i></button>"
    //            html += "<button class='btn delete-btn deleteSkillMappingRRM' id='deleteSkillMappingRRM' onclick=_editCloneRRMEntryPoint.deleteRow_SkillMapping('" + skillId + "')><i class='fas fa-trash-alt'></i></button></td>"
    //            html += "</tr>";
    //        });

    //    }

    //    var skillmappingGrid = getDevExtremeGridJson();
    //    skillmappingGrid.editing = {
    //       mode: "row",
    //       allowUpdating: true,
    //       allowDeleting: true,
    //       allowAdding: true
    //    };
    //    skillmappingGrid.columns = [
    //       { caption: "Family", dataField: "SkillFamily" },
    //       { caption: "Skills", dataField: "Skill" },
    //       { caption: "Version", dataField: "SkillVersion" },
    //       {
    //           caption: "", dataField: "RRMId", allowGrouping: false, allowCollapsing: false, allReordering: false,
    //           cellTemplate: function (container, options) {

    //               $("<div>")
    //                   .append("<button data-type='edit' data-rrmid =" + options.value + " class='btn btn-xs btn-primary edit-btn btnSelect editRRMEntryPoint" + pageId + "'><i class='fas fa-pencil-alt'></i></button>")
    //                   .appendTo(container);
    //           },
    //           onClick: function (e) {
    //               RRMEntryFromRRM(data.RRMId)
    //           }, fixedPosition: "right", fixed: true, allowExporting: false, hidingPriority: 0
    //       }
    //    ];
    //}


    //tab previous btn evenet
    _editCloneRRMEntryPoint.toggleTabRRMEntryPrevious = function () {

        var activeTab = $('#rrmtab').find('li.active').attr('id')

        if (activeTab == "rrm_skillsplanaTab") {
            _editCloneRRMEntryPoint.getSkillsDetails(RRMID);
            $('.nav-tabs a[href="#rrm_SkillDetails"]').tab("show");
            var requirmentLead = $("#sdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
            if (LoggedUser == requirmentLead) {
                $("a.btnNext").show();
            }
            else {
                $("a.btnNext").hide();
            }
            $(".saveFamilyBtn").hide();
        }

        if (activeTab == "rrm_skillsTab") {
            $('.nav-tabs a[href="#rrm_RequirementDetails"]').tab("show");
            var requirmentLead = $("#sdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
            if (LoggedUser == requirmentLead) {
                $("a.btnNext").show();
            }
            else {
                $("a.btnNext").hide();
            }
            $(".saveFamilyBtn").hide();
            $(".btnPrevious").hide();
            _editCloneRRMEntryPoint.updateresourcerequitementdata();
        }

        if (activeTab == "rrm_skillsplanbTab") {
            $('.nav-tabs a[href="#rrm_SkillsPlanADetails"]').tab("show");
            var requirmentLead = $("#sdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
            if (LoggedUser == requirmentLead) {
                $("a.btnNext").show();
            }
            else {
                $("a.btnNext").hide();
            }
            $(".btnPrevious").show();
            $(".saveFamilyBtn").hide();

            var filter_valbtn = JSON.stringify({
                "Token": Token,
                "ResourceRequirementId": ResourceRequirementId,
                "SkillPlans": "PlanA",
                "IsActive": "True"
            });

            // var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);

            callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {
                if (result != null) {
                    $("#sd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value', result[0].SkillPlanInfo);
                    var edate = result[0].ToBeOnBoard;

                    $("#sd_date_rrm_tobeonboardplana").dxDateBox('instance').option('value', edate);
                    ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
                }
            });
        }

        if (activeTab == "rrm_commentsTab") {

            comments = $("#sd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value');
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();

            $("a.btnNext").show();

            $(".btnPrevious").show();
            $('.nav-tabs a[href="#rrm_SkillsPlanBDetails"]').tab("show");

            var filter_valbtn = JSON.stringify({
                "Token": Token,
                "ResourceRequirementId": ResourceRequirementId,
                "SkillPlans": "PlanB",
                "IsActive": "True"
            });

            //var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
            callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {
                if (result != null) {
                    $("#sd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value', result[0].SkillPlanInfo);
                    var edate = result[0].ToBeOnBoard;
                    $("#sd_date_rrm_tobeonboardplanb").dxDateBox('instance').option('value', edate);
                    ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
                }
            })
        }

        resetSimpleBarRRMEntryPoint();
    }

    // get rrm detials by id
    _editCloneRRMEntryPoint.updateresourcerequitementdata = function () {
        //var getRRMData = callgetlist('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + ResourceRequirementId + '","Token":"' + Token + '"}');
        //_editCloneRRMEntryPoint.mapupdateaddrrmListcomputeHTML(getRRMData)
        callGetListAsync('GetClosedRRM', '{"IsActive":"True","ResourceRequirementId":"' + ResourceRequirementId + '","Token":"' + Token + '"}', function (getRRMData) {
            _editCloneRRMEntryPoint.mapupdateaddrrmListcomputeHTML(getRRMData)
        });
    }

    //bind rrm data from _addRRMEntryPoint.updateresourcerequitementdata function result
    _editCloneRRMEntryPoint.mapupdateaddrrmListcomputeHTML = function (getRRMData) {

        if (getRRMData[0].rrmid == "") {

        } else {
            var data;
            getRRMData.forEach(function (key, item) {
                $("#sdtxt_rrm_requirementname").dxTextBox('instance').option('value', key.RequirementName);
                $("#sdtxt_rrm_requiredfor").dxTextBox('instance').option('value', key.RequiredFor);
                $("#rrm_empid").val(key.RequirementName);
                if (key.BDEId != null && key.BDEId != "") {
                    $("#rrm_entrybde").val(key.BDEId);
                }
                else {
                    $("#rrm_entrybde").val('');
                }
                $("#sdnmb_rrm_numberofpositions").dxNumberBox('instance').option('value', key.NumberOfPositions);

                $("#sdcmb_rrm_department").dxSelectBox('instance').option('value', key.DepartmentId);
                $("#sdnmb_rrm_experiencerequired").dxNumberBox('instance').option('value', key.ExperiencerequiredInYrs);
                $("#sdtxt_rrm_location").dxTextBox('instance').option('value', key.Location);
                $("#sdchk_rrm_leadApproval").dxCheckBox('instance').option('value',key.LeadApproval);
                var edate = key.RequestedDate;
                if (edate != null) {
                    var ed = edate;
                    $("#sd_date_rrm_requestedDate").dxDateBox('instance').option('value', ed);
                }
                $("#sdtxt_rrm_requirementlead").dxTextBox('instance').option('value', key.LeadName);
            });
        }
    }

    //save hr commnets
    _editCloneRRMEntryPoint.saveComments = function () {

        var updatecomments = 1;
        var switchLead = $("#switchLead").dxSwitch("instance").option('value');
        var switchClient = $("#switchClient").dxSwitch("instance").option('value');
        var finalComments = $("#sd_txtEditor_RRMComments").dxHtmlEditor('instance').option('value');
        if (switchClient == true || switchLead == true) {
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
            dataComments = {
                "Method": "PostOnHoldCommentsInResourceRequirement",
                "Data": {
                    "Token": Token,
                    "OnHoldByClient": switchClient.toString(),
                    "OnHoldByOwner": switchLead.toString(),
                    "ResourceRequirementId": ResourceRequirementId,
                    "Comments": finalComments.toString(),
                    "IsActive": 'True'
                }
            }

            console.log(dataComments);
            //var resultComments = PostDataCall(dataComments);
            PostDataCallAsync(dataComments, function (resultComments) {
                if (resultComments['IsSuccess'] == true) {
                    swal({
                        title: "Success!",
                        text: "Saved Successfully!",
                        icon: "success",
                        button: "ok!",
                    })
                }
            });

            $('#RRMCloneEntryPointModel').modal("hide");
            ResourceRequirementId = null;
            // _editCloneRRMEntryPoint.getRRMEntryTable();
            var rrmCloneEntryGrid = RRMCloneEntryPointGridOwner("Closed");
            requirmentData = {};
            $("#switchClient").dxSwitch('instance').option("disabled", true);

            $("#switchLead").dxSwitch('instance').option("disabled", true);
            rrmCloneEntryGrid.getRRMEntryTable();

            _editCloneRRMEntryPoint.clearAll();
        }
    }

    //get skill details
    _editCloneRRMEntryPoint.getSkillsDetails = function (ResourceRequrimentId) {

        var filterData = JSON.stringify({
            "ResourceRequirementId": ResourceRequrimentId,
            "IsActive": "True",
            "Token": Token
        });

        callGetListAsync('GetResourceRequrirementSkill', filterData, function (e) {
            GetSkillList = e;

            $("#sdgd-rrmOwnerSkills").dxDataGrid({
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
                        caption: "Skills", dataField: "SkillId",
                        allowSorting: false,
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
                    _editCloneRRMEntryPoint.insert_SkillInfoEntry(e);
                },
                onRowUpdated: function (e) {
                    _editCloneRRMEntryPoint.update_SkillInfoEntry(e);
                },
                onRowRemoved: function (e) {
                    _editCloneRRMEntryPoint.delete_SkillInfoEntry(e);
                }
            });
        });
    }

    //get Manage Comment History

    _editCloneRRMEntryPoint.getManageCommentHistory = function (ResourceRequirementId) {
        var filter_val = JSON.stringify({
            "ResourceRequirementId": ResourceRequirementId,
            "IsActive": 'True',
            "Token": Token
        });
        //  var getManageplanComments = callgetlist("GetCommentsInResourceRequirement", filter_val);
        callGetListAsync('GetCommentsInResourceRequirement', filter_val, function (getManageplanComments) {
            var plan_no_comments_count = 0;
            var plan_no_documentsCount = 0;
            var plan_comment_history_html = "";
            getManageplanComments.forEach(function (item) {
                var plan_created_date = new Date(item.CreatedDate);
                var plan_date_month_year = plan_created_date.toLocaleDateString();
                var plan_time = plan_created_date.toLocaleTimeString();

                if (item.CreatedBy != localStorage.getItem("EmployeeID")) {
                    plan_comment_history_html += "<div style='width:100%;display:flow-root'><div class='message dx-theme-background-color'>"
                    plan_comment_history_html += "<div class='name'>" + item.CreatedByName + "</div>"
                    plan_comment_history_html += "<div class='date'>" + plan_date_month_year + " " + plan_time + "</div>"
                    plan_comment_history_html += "<div class='text'>" + item.Comments + "</div></div></div>";
                }
                else {
                    plan_comment_history_html += "<div style='width:100%;display:flow-root'><div class='message dx-theme-background-color' style='float:right;background-color:rgb(225, 247, 223) !important'>"
                    plan_comment_history_html += "<div class='date'>" + plan_date_month_year + " " + plan_time + "</div>"
                    plan_comment_history_html += "<div class='text'>" + item.Comments + "</div></div></div>";
                }

            });
            $("#rrm_manage_plan_comments_documents").show();
            $("#rrm_manage_plan_comments_documents").html(plan_comment_history_html);
            var div = document.getElementById('rrm_manage_plan_comments_documents');
            div.scrollTop = div.scrollHeight - div.clientHeight;
        })
    }

    //skill data clear func
    _editCloneRRMEntryPoint.skillsClearAndShow = function () { // Clear our fields


        // document.getElementById("familyentry_fromrfp").value = "";
        // document.getElementById("skillentry_fromrfp").value = "";
        // document.getElementById("skillversionentry_fromrfp").value = "";

        // document.getElementById("familyentry_fromresign").value = "";
        // document.getElementById("skillentry_fromresign").value = "";
        // document.getElementById("skillversionentry_fromresign").value = "";
    }

    //insert skill entry
    _editCloneRRMEntryPoint.insert_SkillInfoEntry = function (e) {
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
                    "FromEditRRM": 'True',
                    "IsActive": 'True',
                    "Token": Token,
                    "ResourceRequirementSkillID": null,
                    "ResourceRequirementId": ResourceRequirementId
                }
            }
        }

        PostDataCallAsync(data, function (postCall) {

            if (postCall['IsSuccess'] == true) {
                _editCloneRRMEntryPoint.skillsClearAndShow();
                _editCloneRRMEntryPoint.getSkillsDetails(RRMID);
            }
        });
    }

    _editCloneRRMEntryPoint.update_SkillInfoEntry = function (e) {
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
                    "FromEditRRM": 'True',
                    "IsActive": 'True',
                    "Token": Token,
                    "ResourceRequirementSkillID": resource_requirement_skill_id,
                    "ResourceRequirementId": ResourceRequirementId
                }
            }
        }

        PostDataCallAsync(data, function (postCall) {

            if (postCall['IsSuccess'] == true) {
                _editCloneRRMEntryPoint.skillsClearAndShow();
                _editCloneRRMEntryPoint.getSkillsDetails(RRMID);
            }
        });

    }

    _editCloneRRMEntryPoint.delete_SkillInfoEntry = function (e) {
        var resource_requirement_skill_id = e.data.ResourceRequirementSkillId;
        data = {
            "Method": "DeleteResourceRequrirementSkill",
            "Data": {
                "ResourceRequirementSkillId": resource_requirement_skill_id,
                "FromEditRRM": 'True',
                "Token": Token,
                "IsActive": 0

            }
        }
        PostDataCallAsync(data, function (postCall) {
            if (postCall['IsSuccess'] == true) {
                _editCloneRRMEntryPoint.skillsClearAndShow();
                _editCloneRRMEntryPoint.getSkillsDetails(RRMID);
            }
        });
    }

    _editCloneRRMEntryPoint.saveRRMInterviewers = function (ResourceRequirementIdParam, EmployeeIds) {
        if (EmployeeIds == undefined || EmployeeIds == null || EmployeeIds == "") {
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

    _editCloneRRMEntryPoint.CloneEntryFromRRM = function (rrmid) {
        callGetListAsync('GetRRMById', '{"IsActive":"True","ResourceRequirementId":"' + rrmid + '","Token":"' + Token + '"}', function (getRRMData) {
            _editCloneRRMEntryPoint.mapclonerrmListcomputeHTML(getRRMData);
        })
    }

    _editCloneRRMEntryPoint.mapclonerrmListcomputeHTML = function (getRRMData) {
        
        if (getRRMData[0].rrmid == "") {

        }
        else {
            getRRMData.forEach(function (key, item) {
                $("#sdtxt_rrm_requirementname").dxTextBox('instance').option('value', key.RequirementName);
                $("#sdtxt_rrm_requiredfor").dxTextBox('instance').option('value', key.RequiredFor);
                $("#sdcmb_rrm_priority").dxSelectBox('instance').option('value', key.PriorityId);
                if (key.PriorityId != "") {
                    $("#sdcmb_rrm_priority").dxSelectBox('instance').option('value', key.PriorityId);
                }
                if (key.BDEId != " ") {
                    $("#rrm_entrybde").val(key.BDEId);
                    $("#hidedivRFP").show();
                }
                else {
                    $("#rrm_entrybde").val('');
                    $("#hidedivRFP").hide();
                }
                if (key.RFPId != null && key.RFPId != "") {
                    $("#rrm_rfpid").val(key.RFPId);
                    $("#hidedivRFP").show();
                }
                else{
                    $("#rrm_rfpid").val('');
                    $("#hidedivRFP").hide();
                }

                $("#sdnmb_rrm_numberofpositions").dxNumberBox('instance').option('value', key.NumberOfPositions);
                $("#sdcmb_rrm_communication").dxSelectBox('instance').option('value', key.Communication);
                if (key.Communication != "") {
                    $("#sdcmb_rrm_communication").dxSelectBox('instance').option('value', key.Communication);
                }

                $("#sdcmb_rrm_department").dxSelectBox('instance').option('value', key.DepartmentId);
                $("#sdcmb_rrm_designation").dxSelectBox('instance').option('value', key.DesignationId);
                $("#sdnmb_rrm_experiencerequired").dxNumberBox('instance').option('value', key.ExperiencerequiredInYrs);
                $("#sdtxt_rrm_location").dxTextBox('instance').option('value', key.Location);
                if (key.Location != "") {
                    $("#sdtxt_rrm_location").dxTextBox('instance').option('value', key.Location);
                }

                $("#sdnmb_rrm_numberofpositions").dxNumberBox('instance').option('value', getRRMData[0].NumberOfPositions);
                planAcomments = key['PlanA-SkillPlanInfo'];
                $("#sd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('value', planAcomments);

                planBcomments = key['PlanB-SkillPlanInfo'];
                $("#sd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value', planBcomments);
                IsOwnerForSkill = true;
            });
        }
    }

    return _editCloneRRMEntryPoint;

});

function bindRRMTechnologyStrings() {
    var arrayList = [];
    var skillId;
    var versionId;
    var familyId;
    var selMulti = $("#rrm_profileEntry_skills option:selected").each(function (i, e) {
        skillId = e.attributes["skillId"].value;
        versionId = e.attributes["versionId"].value;
        familyId = e.attributes["familyId"].value;
        var technologyObject = { "skillId": skillId, "versionId": versionId, "familyId": familyId };
        arrayList.push(technologyObject);
    });

    return arrayList;
}

function deleteSelectedTechnologyRRMs(skillId, versionId, familyId) {
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
                    "ResourceRequirementId": rrmId
                }
            }
        }

        PostDataCallAsync(data, function (postCall) {

            if (postCall['IsSuccess'] == true) {

            }
        });
    }
}

function leadApprovalRRMEntryPointOnValueChanged(e) {
    if (leadApprovalType == "edit") {
        if (e.value == false) {
            if (rrmId != null && rrmId != undefined) {
                var data = [];
                {
                    data = {
                        "Method": "PostLeadApprovalStatus",
                        "Data": {
                            "RRMId": rrmId,
                            "Token": Token
                        }
                    }
                }

                PostDataCallAsync(data, function (postCall) {
                    //debugger;
                    if (postCall['IsSuccess'] == true) {
                        //debugger;
                    }
                });
            }
        }
    }
}