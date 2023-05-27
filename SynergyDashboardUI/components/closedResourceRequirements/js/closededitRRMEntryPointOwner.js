closedEditRRMEntryPointOwner = (function () {
    var _editRRMEntryPoint = {};

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
    _editRRMEntryPoint.initializeRRMByTechnical = function (rrmid) {

    }
    
    //conver date to "yyyy-mm-dd" to assign value to dtpicker
    _editRRMEntryPoint.dateFormat = function (dtvalue) {
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
    _editRRMEntryPoint.closedtoggleTabRRMEntry = function () {
        //debugger;
        var activeTab = $('#closedrrmtab').find('li.active').attr('id')
        var closedrequirmentLeads = $("#closedsdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
        if (activeTab == "closedrrm_requirementTab") {
            var getInterviewerMultipleArry = $("#closedsdtag_rrm_intervierwers").dxTagBox('instance').option('value');
            var joinInterviewerArray = "";
            $.each(getInterviewerMultipleArry, function (index, val) {
                joinInterviewerArray += val + ",";
            });
            joinInterviewerArray = joinInterviewerArray.replace(/,\s*$/, "");
            if (OnHoldByOwnerStatus == true || OnHoldByClientStatus == true) {
                $('.nav-tabs a[href="#closedrrm_SkillDetails"]').tab("show");
                closedreadOnlyFormData();
                $(".closedbtnPrevious").show();
                $(".closedsaveFamilyBtn").hide();
                if (LoggedUser == closedrequirmentLeads) {
                    $("a.closedbtnNext").show();
                }
                else {
                    $("a.closedbtnNext").hide();
                }
                _editRRMEntryPoint.closedgetSkillsDetails(RRMID);
                $("#editSkillMappingRRM").hide();
                $("#deleteSkillMappingRRM").hide();
                closedreadOnlyFormData();
            }
            else {
                //debugger;
                requirmentName = $("#closedsdtxt_rrm_requirementname").dxTextBox('instance').option('value');
                requireFor = $("#closedsdtxt_rrm_requiredfor").dxTextBox('instance').option('value');
                bde = $("#closedrrm_entrybde").val();
                if (bde == "") { bde = null; }
                replacementFor = $("#closedrrm_replacement").val();
                position = $("#closedsdnmb_rrm_numberofpositions").dxNumberBox('instance').option('value');
                priority = $("#closedsdcmb_rrm_priority").dxSelectBox('instance').option('value');
                closedRRMDetailsForValidations.Priority = priority;
                department = $("#closedsdcmb_rrm_department").dxSelectBox('instance').option('value');
                designation = $("#closedsdcmb_rrm_designation").dxSelectBox('instance').option('value');
                experience = $("#closedsdnmb_rrm_experiencerequired").dxNumberBox('instance').option('value');
                closedRRMDetailsForValidations.ExperienceRequired = experience;
                interviewers = $("#closedsdtag_rrm_intervierwers").dxTagBox('instance').option('value');
                communication = $("#closedsdcmb_rrm_communication").dxSelectBox('instance').option('value');
                closedRRMDetailsForValidations.Communication = communication;
                reqlocation = $("#closedsdtxt_rrm_location").dxTextBox('instance').option('value');
                requestedDate = $("#closedsd_date_rrm_requestedDate").dxDateBox('instance').option('value');
                losingRevenue = $("#closedsdchk_rrm_losingRevenue").dxCheckBox('instance').option('value');
                fromVIP = $("#closedsdchk_rrm_fromVIP").dxCheckBox('instance').option('value');
                requirmentLead = $("#closedsdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
                leadApproval = $("#closedsdchk_rrm_leadApproval").dxCheckBox('instance').option('value');

                if (reqlocation == "") { reqlocation = null; }
                var finalRequestedDate = moment(requestedDate).format("DD-MM-YYYY");

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
                    if (interviewers.length == 0) {
                        $("#closedsdtag_rrm_intervierwers").addClass('input-error');
                        $("#closedrrm_interviewersError").html("Select interviewer(s)");
                    }
                    else {
                        $("#closedsdtag_rrm_intervierwers").removeClass('input-error');
                        $("#closedrrm_interviewersError").html("");
                    }

                    if(priority == null || priority == ""){
                        $("#closedsdcmb_rrm_priority").addClass('input-error');
                        $("#closedrrm_priorityError").html("Select Priority");
                    }
                    else{
                        $("#closedsdcmb_rrm_priority").removeClass('input-error');
                        $("#closedrrm_priorityError").html("");
                    }

                    $('.nav-tabs a[href="#closedrrm_requirementTab"]').tab("show");
                    $(".closedbtnPrevious").hide();
                    $(".closedsaveFamilyBtn").hide();
                    if (LoggedUser == requirmentLead) {
                        $("a.closedbtnNext").show();
                    }
                    else {
                        $("a.closedbtnNext").hide();
                    }
                }
                else {

                    if (requirmentData.Communication != communication || requirmentData.PriorityId != priority || requirmentData.Location != reqlocation || requirmentData.ExperiencerequiredInYrs != experience || closedarraysEqual(closedRRMDetailsForValidations.Interviewers, interviewers) != true) {
                        var updatedContent = "";
                        if (requirmentData.Communication != communication) {

                            updatedContent += "Communication has been changed from '" + requirmentData.Communication + "' to '" + communication + "'  \n "
                            //communication = requirmentData.Communication;

                            requirmentData["Communication"] = communication;
                            $("#closedsdcmb_rrm_communication").dxSelectBox('instance').option('value', communication);
                            communication = $("#closedsdcmb_rrm_communication").dxSelectBox('instance').option('value');
                            IsPassed = 1;
                        }
                        if (requirmentData.PriorityId != priority) {
                            var exististingVal = $("#closedsdcmb_rrm_priority").dxSelectBox('instance').option('value', requirmentData.PriorityId);
                            exististingVal = $("#closedsdcmb_rrm_priority").dxSelectBox('instance').option('text');

                            var currentVal = $("#closedsdcmb_rrm_priority").dxSelectBox('instance').option('value', priority);
                            requirmentData["PriorityId"] = priority;
                            $("#closedsdcmb_rrm_priority").dxSelectBox('instance').option('value', priority);
                            priority = $("#closedsdcmb_rrm_priority").dxSelectBox('instance').option('value');

                            currentVal = $("#closedsdcmb_rrm_priority").dxSelectBox('instance').option('text');
                            updatedContent += "Priority has been changed from '" + exististingVal + "' to '" + currentVal + "' \n"
                            IsPassed = 1;


                        }
                        if (requirmentData.Location != reqlocation) {

                            updatedContent += "Location has been changed from '" + requirmentData.Location + "' to '" + reqlocation + "' \n"
                            requirmentData["Location"] = reqlocation;
                            $("#closedsdtxt_rrm_location").dxTextBox('instance').option('value', reqlocation);
                            reqlocation = $("#closedsdtxt_rrm_location").dxTextBox('instance').option('value');
                            IsPassed = 1;

                        }
                        if (requirmentData.ExperiencerequiredInYrs != experience) {

                            updatedContent += "Experience has been changed from '" + requirmentData.ExperiencerequiredInYrs + "' to '" + experience + "' \n"
                            requirmentData["ExperiencerequiredInYrs"] = experience;
                            $("#closedsdnmb_rrm_experiencerequired").dxNumberBox('instance').option('value', experience);
                            experience = $("#closedsdnmb_rrm_experiencerequired").dxNumberBox('instance').option('value');
                            IsPassed = 1;
                        }
                        if (closedarraysEqual(closedRRMDetailsForValidations.Interviewers, interviewers) != true) {
                            var OldInterviewersList = [];
                            var NewInterviewersList = [];
                            $(closedRRMDetailsForValidations.Interviewers).each(function (idx, obj) {
                                $(closedinterviewersData).each(function (idx1, obj1) {
                                    if (obj == obj1.EmployeeId) {
                                        OldInterviewersList.push(obj1.EmployeeName)
                                    }
                                })
                            });
                            $(interviewers).each(function (idx, obj) {
                                $(closedinterviewersData).each(function (idx1, obj1) {
                                    if (obj == obj1.EmployeeId) {
                                        NewInterviewersList.push(obj1.EmployeeName)
                                    }
                                })
                            })
                            updatedContent += "Interviewer(s) list has been changed from '" + OldInterviewersList.toString().replace(',', ', ') + "' to '" + NewInterviewersList.toString().replace(',', ', ') + "' \n";
                            closedRRMDetailsForValidations.Interviewers = interviewers;
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
                    _editRRMEntryPoint.saveRRMInterviewers(ResourceRequirementId, joinInterviewerArray)
                    // var resultResorce = PostDataCall(dataResource);
                    PostDataCallAsync(dataResource, function (resultResorce) {
                        //
                    });

                    var updatedContent = "";
                    var IsPassed = 0;


                    $('.nav-tabs a[href="#closedrrm_SkillDetails"]').tab("show");

                    var filter_val1 = JSON.stringify({
                        RRMId: ResourceRequirementId,
                        IsActive: 'True'
                    });
                    
                    var technologyArray = new Array();
                    var getTechnologiesForRRM = callgetlist("GetTechnologiesForRRMById", filter_val1);

                    getTechnologiesForRRM.forEach(function (item) {
                        $('#closedrrm_profileEntry_skills').attr({ "skillId": item.SkillId, "versionId": item.SkillVersionID, "familyId": item.SkillFamilyId, "value": item.SkillId + "-" + item.SkillVersionID });
                        technologyArray.push(item.SkillId + "-" + item.SkillVersionID);
                        $('#closedrrm_profileEntry_skills').val(technologyArray);
                        $('#closedrrm_profileEntry_skills').select2();
                    });
                    _editRRMEntryPoint.closedgetSkillsDetails(RRMID);
                    $(".closedbtnPrevious").show();
                    $(".closedsaveFamilyBtn").hide();
                    if (LoggedUser == requirmentLead) {
                        $("a.closedbtnNext").show();
                    }
                    else {
                        $("a.closedbtnNext").hide();
                    }

                    // closedgetSkillsDetails('"+RRMID+"');
                    // closedgetSkillsDetailseditfrm(RRMID);
                }
            }
        }

        if (activeTab == "closedrrm_skillsTab") {
            //debugger;
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
                var result = bindRRMTechnologyStrings();
                _editRRMEntryPoint.update_SkillInfoEntryNew(result);

                $('.nav-tabs a[href="#closedrrm_SkillsPlanADetails"]').tab("show");
                $("#closedsd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('value', planAcomments);
                $(".closedbtnPrevious").show();
                $(".closedsaveFamilyBtn").hide();
                var requirmentLead = $("#closedsdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
                if (LoggedUser == requirmentLead) {
                    $("a.closedbtnNext").show();
                }
                else {
                    $("a.closedbtnNext").hide();
                }
            }
        }

        if (activeTab == "closedrrm_skillsplanaTab") {
            // debugger;
            if (OnHoldByOwnerStatus == true || OnHoldByClientStatus == true) {
                $('.nav-tabs a[href="#closedrrm_SkillsPlanBDetails"]').tab("show");
                $("#closedsd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value', planBcomments)

                $(".closedbtnPrevious").show();
                $(".closedsaveFamilyBtn").hide();
                var requirmentLead = $("#closedsdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
                if (LoggedUser == requirmentLead) {
                    $("a.closedbtnNext").show();
                }
                else {
                    $("a.closedbtnNext").hide();
                }
            }
            else {
                // debugger;
                var datecheck = 0;
                var RecruiterA;
                skillDetailsA = $("#closedsd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('value');
                $("#closedsd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('value', planAcomments);
                toOnBoardA = $("#closedsd_date_rrm_tobeonboardplana").dxDateBox('instance').option('value')
                requirtersA = $("#rrm_recruitersplana").val();
                var edate = $("#closedsd_date_rrm_tobeonboardplana").dxDateBox('instance').option('value')
                if (requirtersA != null) {
                    RecruiterA = requirtersA.toString();
                }
                var varEDate = new Date().toISOString().slice(0, 10); //dd-mm-YYYY
                if ((skillDetailsA == "" || toOnBoardA == "") || datecheck == 1) {
                    //debugger;
                    if (skillDetailsA == "") {
                        $('#rrm_skilldetailsplanan').addClass('input-error');
                        $('#closedrrm_skilldetailsplanaError').html("Enter Skill Details");
                    } else {
                        $('#rrm_skilldetailsplanan').removeClass('input-error');
                        $('#closedrrm_skilldetailsplanaError').html("");
                    }
                    if (toOnBoardA == "") {
                        $('#rrm_tobeonboardplana').addClass('input-error');
                        $('#closedrrm_tobeonboardplanaError').html("Select Date");
                    } else {
                        $('#rrm_tobeonboardplana').removeClass('input-error');
                        $('#closedrrm_tobeonboardplanaError').html("");
                    }
                    $('.nav-tabs a[href="#closedrrm_skillsplanaTab"]').tab("show");

                    $(".closedbtnPrevious").show();
                    $(".closedsaveFamilyBtn").hide();
                    var requirmentLead = $("#closedsdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
                    if (LoggedUser == requirmentLead) {
                        $("a.closedbtnNext").show();
                    }
                    else {
                        $("a.closedbtnNext").hide();
                    }
                }
                else {
                    closedRRMDetailsForValidations.planAcomments = skillDetailsA;
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
                    $('.nav-tabs a[href="#closedrrm_SkillsPlanBDetails"]').tab("show");
                    $("#closedsd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value', planBcomments);
                    $(".closedbtnPrevious").show();
                    $(".closedsaveFamilyBtn").hide();
                    var requirmentLead = $("#closedsdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
                    if (LoggedUser == requirmentLead) {
                        $("a.closedbtnNext").show();
                    }
                    else {
                        $("a.closedbtnNext").hide();
                    }
                }
            }
        }

        if (activeTab == "closedrrm_skillsplanbTab") {
            // debugger;
            if (OnHoldByOwnerStatus == true || OnHoldByClientStatus == true) {
                $('.nav-tabs a[href="#closedrrm_CommentsDetails"]').tab("show");
                $("#closedsd_txtEditor_RRMComments").dxHtmlEditor('instance').option('value', "")
                $(".closedbtnPrevious").show();
                $(".closedsaveFamilyBtn").show();
                $("a.closedbtnNext").hide();
                _editRRMEntryPoint.closedgetManageCommentHistory(ResourceRequirementId);
            }
            else {
                $("#closedsd_txtEditor_RRMComments").dxHtmlEditor('instance').option('value', "")
                var datecheck = 0;
                skillDetailsB = $("#closedsd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value');
                toOnBoardB = $("#closedsd_date_rrm_tobeonboardplanb").dxDateBox('instance').option('value')
                requirtersB = $("#rrm_recruitersplanb").val();
                var edate = $("#closedsd_date_rrm_tobeonboardplanb").dxDateBox('instance').option('value')
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
                        $('#closedsd_txtEditor_skillDetailsPlanB').addClass('input-error');
                        $('#closedrrm_skilldetailsplanbError').html("Enter Skill Details");
                    } else {
                        $('#closedsd_txtEditor_skillDetailsPlanB').removeClass('input-error');
                        $('#closedrrm_skilldetailsplanbError').html("");
                    }
                    if (toOnBoardB == "") {
                        $('#rrm_tobeonboardplanb').addClass('input-error');
                        $('#closedrrm_tobeonboardplanbError').html("Select Date");
                    } else {
                        $('#rrm_tobeonboardplanb').removeClass('input-error');
                        $('#closedrrm_tobeonboardplanbError').html("");
                    }
                    $('.nav-tabs a[href="#closedrrm_skillsplanbTab"]').tab("show");
                    $(".closedbtnPrevious").show();
                    $(".closedsaveFamilyBtn").hide();
                    var requirmentLead = $("#closedsdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
                    if (LoggedUser == requirmentLead) {
                        $("a.closedbtnNext").show();
                    }
                    else {
                        $("a.closedbtnNext").hide();
                    }
                } else {
                    closedRRMDetailsForValidations.planBcomments = skillDetailsB;
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
                        $('.nav-tabs a[href="#closedrrm_CommentsDetails"]').tab("show");
                        //CKEDITOR.instances.rrm_comments.setData(hrComments);
                        $(".closedbtnPrevious").show();
                        $(".closedsaveFamilyBtn").show();
                        $("a.closedbtnNext").hide();
                        _editRRMEntryPoint.closedgetManageCommentHistory(ResourceRequirementId);
                    });
                }
            }
        }
        closedresetSimpleBarRRMEntryPoint();
    }

    _editRRMEntryPoint.btnsendreminder = function (ResourceRequirementId) {
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
        _editRRMEntryPoint.closedgetManageCommentHistory(ResourceRequirementId);
    }

    //bind getrrmbyid values in form
    _editRRMEntryPoint.closedRRMEntryFromRRM = function (rrmid) {
        
        RRMID = rrmid;
        ResourceRequirementId = rrmid;
        var filterData = JSON.stringify({
            "Token": Token,
            "ResourceRequirementId": rrmid,
            "IsActive": true,
        });  

        callGetListAsync('GetRRMById', filterData, function (e) {
           
            _editRRMEntryPoint.mapupdaterrmListcomputeHTML(e);
        })
    }

    _editRRMEntryPoint.update_SkillInfoEntryNew = function (e) {

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
    _editRRMEntryPoint.clearAll = function () {
        $("#rrmno").text("");
        $("#closedsdtxt_rrm_requirementname").dxTextBox('instance').option('value', "");
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
        $("#closedsd_date_rrm_tobeonboardplana").dxDateBox('instance').option('value', nxtDate)
        $("#closedsd_date_rrm_tobeonboardplanb").dxDateBox('instance').option('value', nxtDate)

        $("#closedsd_txtEditor_RRMComments").dxHtmlEditor('instance').option('value', "")
        $("#closedsd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('value', "");
        $("#closedsd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value', "");

    }

    //map update rrm List compute HTML
    _editRRMEntryPoint.mapupdaterrmListcomputeHTML = function (getRRMData) {
        var minDate = new Date();
        minDate.setDate(minDate.getDate());
        var minTdyDate = minDate.toISOString().slice(0, 10);
        $("#closedsd_date_rrm_tobeonboardplana").dxDateBox("instance").option("min", minTdyDate);
        $("#closedsd_date_rrm_tobeonboardplanb").dxDateBox("instance").option("min", minTdyDate);

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
    
                    $("#closedrrmmodelpagetitle").text("Edit RRM - " + key.RRMNo);
                    $("#closedrrmStatus").text(key.Status);
                    if (key.RFPId != null && key.RFPId != "") {
                        $("#closedrrm_rfpid").val(key.RFPId);
                        $("#closedhidedivRFP").show();
                    }
                    else{
                        $("#closedrrm_rfpid").val('');
                        $("#closedhidedivRFP").hide();
                    }
                    if (key.BDEId != null && key.BDEId != "") {
                        $("#closedrrm_entrybde").val(key.BDEId);
                        $("#closedhidedivRFP").show();
                    }
                    else {
                        $("#closedrrm_entrybde").val('');
                        $("#closedhidedivRFP").hide();
                    }
                    $("#closedsdtxt_rrm_requirementname").dxTextBox('instance').option('value', key.RequirementName);
                    $("#closedsdtxt_rrm_requiredfor").dxTextBox('instance').option('value', key.RequiredFor);
                    $("#closedrrm_empid").val(key.EmployeeId);
                  
                    if (key.PriorityId != "") {
                        closedRRMDetailsForValidations.Priority = key.PriorityId;
                        $("#closedsdcmb_rrm_priority").dxSelectBox('instance').option('value', key.PriorityId);
                    }
                    $("#closedsdcmb_rrm_priority").dxSelectBox('instance').option('value', key.PriorityId);
                    $("#closedsdnmb_rrm_numberofpositions").dxNumberBox('instance').option('value', key.NumberOfPositions);
                    $("#closedsdcmb_rrm_communication").dxSelectBox('instance').option('value', key.Communication);
                    if (key.Communication != "") {
                        closedRRMDetailsForValidations.Communication = key.Communication
                        $("#closedsdcmb_rrm_communication").dxSelectBox('instance').option('value', key.Communication);
                    }
    
                    $("#closedsdcmb_rrm_department").dxSelectBox('instance').option('value', key.DepartmentId);
                    $("#closedsdcmb_rrm_designation").dxSelectBox('instance').option('value', key.DesignationId);
                    closedRRMDetailsForValidations.ExperienceRequired = key.ExperiencerequiredInYrs;
                    $("#closedsdnmb_rrm_experiencerequired").dxNumberBox('instance').option('value', key.ExperiencerequiredInYrs);
                    $("#closedsdtxt_rrm_location").dxTextBox('instance').option('value', key.Location);
                    if (key.Location != "") {
                        $("#closedsdtxt_rrm_location").dxTextBox('instance').option('value', key.Location);
                    }
                    
    
                    $("#closedsd_date_rrm_requestedDate").dxDateBox('instance').option('value', key.RequestedDate);
                    if (key.ResourceRequirementType == "G") {
                        $("#closedsdtxt_rrm_requirementlead").dxTextBox('instance').option('value', key.Owner);
                    }
                    else if (key.ResourceRequirementType == "P") {
                        $("#closedsdtxt_rrm_requirementlead").dxTextBox('instance').option('value', key.Owner);
                    }
                    else if (key.ResourceRequirementType == "R") {
                        $("#closedsdtxt_rrm_requirementlead").dxTextBox('instance').option('value', key.LeadName);
                    }
    
                    $("#closedsdchk_rrm_losingRevenue").dxCheckBox('instance').option('value',key.LosingRevenue);
                    $("#closedsdchk_rrm_fromVIP").dxCheckBox('instance').option('value',key.VIP);
    
                    var RequirmentLead = $("#closedsdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
                    if (LoggedUser == RequirmentLead) {
                        $("a.closedbtnNext").show();
                    }
                    else {
                        $("a.closedbtnNext").hide();
                    }
    
                    if(LoggedUser == RequirmentLead){
                        $("#closedRRMEntryPointTypeDetails").removeClass("label label-default m-l-xs");
                        $("#closedRRMEntryPointTypeDetails").html("Owner").addClass("label label-warning m-l-xs");
                    }
                    else{
                        $("#closedRRMEntryPointTypeDetails").removeClass("label label-warning m-l-xs");
                        $("#closedRRMEntryPointTypeDetails").html("View Only").addClass("label label-default m-l-xs");;
                    }
    
                    if(LoggedUser == RequirmentLead){
                        $("#closedsdchk_rrm_losingRevenue").dxCheckBox('instance').option('readOnly',false);
                        $("#closedsdchk_rrm_fromVIP").dxCheckBox('instance').option('readOnly',false);
                    }
                    else{
                        $("#closedsdchk_rrm_losingRevenue").dxCheckBox('instance').option('readOnly',true);
                        $("#closedsdchk_rrm_fromVIP").dxCheckBox('instance').option('readOnly',true);
                    }
    
                    if (LoggedUser == RequirmentLead && (OnHoldByOwnerStatus == false || OnHoldByClientStatus == false)) {
                        $("#closedsdcmb_rrm_priority").dxSelectBox('instance').option('readOnly', false);
                        $("#closedsdcmb_rrm_department").dxSelectBox('instance').option('readOnly', false);
                        $("#closedsdnmb_rrm_experiencerequired").dxNumberBox('instance').option('readOnly', false);
                        $("#closedsdcmb_rrm_communication").dxSelectBox('instance').option('readOnly', false);
                        $("#closedsdtxt_rrm_location").dxTextBox('instance').option('readOnly', true);
                        $("#closedsdtag_rrm_intervierwers").dxTagBox('instance').option('readOnly', false);
                        $("#closedsd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('readOnly', false);
                        $("#closedsd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('readOnly', false);
                        $("#closedsdchk_rrm_leadApproval").dxCheckBox("instance").option("readOnly",false);
                        //allow User to click reminder btn
                        if (key.PlanARecruiters == null) {
                            $("#closedhidereminder").show();
                        }
                        if (key.PlanBRecruiters == null) {
                            $("#closedhidereminderplanB").show();
                        }
                    }
                    else {
                        $("#closedsdcmb_rrm_priority").dxSelectBox('instance').option('readOnly', true);
                        $("#closedsdcmb_rrm_department").dxSelectBox('instance').option('readOnly', false);
                        $("#closedsdnmb_rrm_experiencerequired").dxNumberBox('instance').option('readOnly', true);
                        $("#closedsdcmb_rrm_communication").dxSelectBox('instance').option('readOnly', true);
                        $("#closedsdtxt_rrm_location").dxTextBox('instance').option('readOnly', true);
                        $("#closedsdtag_rrm_intervierwers").dxTagBox('instance').option('readOnly', true);
                        $("#closedsd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('readOnly', true)
                        $("#closedsd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('readOnly', true);
                        $("#closedsdchk_rrm_leadApproval").dxCheckBox("instance").option("readOnly",true);
                        
                        $("#closedhidereminder").hide();
                        $("#closedhidereminderplanB").hide();
                    }
                    if (key.OwnerId == localStorage.getItem("EmployeeID")) {
                        IsOwnerForSkill = true;
                    }
                    else {
                        IsOwnerForSkill = false;
                    }
                    hrComments = key.Comments;
                    if (OnHoldByOwnerStatus == true || OnHoldByClientStatus == true) {
                        closedreadOnlyFormData();
                        $("#closedsd_txtEditor_RRMComments").dxHtmlEditor('instance').option('value', '');
                        $("#closedOwnerrrmHoldStatus").html("On-Hold").addClass("label label-warning m-l-xs");
                        if (OnHoldByOwnerStatus == true) {
                            $("#closedswitchLead").dxSwitch('instance').option("disabled", true);
                            $("#closedswitchLead").dxSwitch('instance').option("value", true);
                            $("#closedswitchClient").dxSwitch('instance').option("disabled", true);
                            $("#closedswitchClient").dxSwitch('instance').option("value", false);
                        }
                        if (OnHoldByClientStatus == true) {
                            $("#closedswitchClient").dxSwitch('instance').option("disabled", true);
                            $("#closedswitchClient").dxSwitch('instance').option("value", true);
                            $("#closedswitchLead").dxSwitch('instance').option("disabled", true);
                            $("#closedswitchLead").dxSwitch('instance').option("value", false);
                        }
                        IsOwnerForSkill = false;
                    }
                    else {
                        $("#closedsd_txtEditor_RRMComments").dxHtmlEditor('instance').option('value', '')
                        $("#closedOwnerrrmHoldStatus").attr('class', '');
                        $("#closedOwnerrrmHoldStatus").html('');
                        $("#closedswitchClient").dxSwitch('instance').option("disabled", true);
                        $("#closedswitchClient").dxSwitch('instance').option("value", false);
                        $("#closedswitchLead").dxSwitch('instance').option("disabled", false);
                        $("#closedswitchLead").dxSwitch('instance').option("value", false);
                    }
    
                    $("#closedsdnmb_rrm_numberofpositions").dxNumberBox('instance').option('value', getRRMData[0].NumberOfPositions);
                    planAcomments = key['PlanA-SkillPlanInfo'];
                    closedRRMDetailsForValidations.planAcomments = planAcomments;
                    $("#closedsd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('value', planAcomments);
                    planBcomments = key['PlanB-SkillPlanInfo'];
                    closedRRMDetailsForValidations.planBcomments = planBcomments;
                    $("#closedsd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value', planBcomments);
                    if (key['PlanA-OnBoardDate'] != null && key['PlanA-OnBoardDate'] != "" && key['PlanA-OnBoardDate'] != undefined) {
                        $("#closedsd_date_rrm_tobeonboardplana").dxDateBox('instance').option('value', key['PlanA-OnBoardDate']);
                        $("#closedsd_date_rrm_tobeonboardplana").dxDateBox('instance').option('readOnly', true);
                        $("#closedsdbtn_reminderA").dxButton('instance').option('visible', true);
                    }
                    else {
                        $("#closedsd_date_rrm_tobeonboardplana").dxDateBox('instance').option('readOnly', false);
                        $("#closedsdbtn_reminderA").dxButton('instance').option('visible', false);
                    }
                    if (key['PlanB-OnBoardDate'] != null && key['PlanB-OnBoardDate'] != "" && key['PlanB-OnBoardDate'] != undefined) {
                        $("#closedsd_date_rrm_tobeonboardplanb").dxDateBox('instance').option('value', key['PlanB-OnBoardDate']);
                        $("#closedsd_date_rrm_tobeonboardplanb").dxDateBox('instance').option('readOnly', true);
                        $("#closedsdbtn_reminderB").dxButton('instance').option('visible', true);
                    }
                    else {
                        $("#closedsd_date_rrm_tobeonboardplanb").dxDateBox('instance').option('readOnly', false);
                        $("#closedsdbtn_reminderB").dxButton('instance').option('visible', false);
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
                    $("#closedsd_tag_recruiter_owner_rrm").dxTagBox('instance').option('items', PlanARecruitersName);
                    $("#closedsd_tag_recruiter_owner_rrm").dxTagBox('instance').option('value', PlanARecruitersName);
                    $("#closedsd_tag_recruitersplanb_rrm").dxTagBox('instance').option('items', PlanBRecruitersName);
                    $("#closedsd_tag_recruitersplanb_rrm").dxTagBox('instance').option('value', PlanBRecruitersName);
    
                    if (key.PlanBRecruitersId != null || key.PlanBRecruitersId != undefined) {
                        $("#closedsdbtn_reminderB").dxButton('instance').option('visible', false);
                    }
                    else { $("#closedsdbtn_reminderB").dxButton('instance').option('visible', true); }
    
                    if (key.PlanARecruitersId != null || key.PlanARecruitersId != undefined) {
                        $("#closedsdbtn_reminderA").dxButton('instance').option('visible', false);
                    }
                    else { $("#closedsdbtn_reminderA").dxButton('instance').option('visible', true); }
    
                    requirmentData["PriorityId"] = key.PriorityId;
                    requirmentData["Communication"] = key.Communication;
                    requirmentData["Location"] = key.Location;
                    requirmentData["ExperiencerequiredInYrs"] = key.ExperiencerequiredInYrs;
                });
            }
        }
        
        _editRRMEntryPoint.getResourceRequirementSkillPlanAId();
        _editRRMEntryPoint.getResourceRequirementSkillPlanBId();

        $("#closedsd_date_rrm_tobeonboardplana").dxDateBox("instance").option("isValid", true);
        $("#closedsd_date_rrm_tobeonboardplanb").dxDateBox("instance").option("isValid", true);
    }

    //To get Resource RequirementSkill PlanB Id
    _editRRMEntryPoint.getResourceRequirementSkillPlanAId = function () {

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
    _editRRMEntryPoint.getResourceRequirementSkillPlanBId = function () {
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
    //_editRRMEntryPoint.skillcomputeHTML = function (e) {
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
    //            html += "<button class='btn delete-btn deleteSkillMappingRRM' id='deleteSkillMappingRRM' onclick=_editRRMEntryPoint.deleteRow_SkillMapping('" + skillId + "')><i class='fas fa-trash-alt'></i></button></td>"
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
    _editRRMEntryPoint.closedtoggleTabRRMEntryPrevious = function () {

        var activeTab = $('#closedrrmtab').find('li.active').attr('id')

        if (activeTab == "closedrrm_skillsplanaTab") {
            _editRRMEntryPoint.closedgetSkillsDetails(RRMID);
            $('.nav-tabs a[href="#closedrrm_SkillDetails"]').tab("show");
            var requirmentLead = $("#closedsdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
            if (LoggedUser == requirmentLead) {
                $("a.closedbtnNext").show();
            }
            else {
                $("a.closedbtnNext").hide();
            }
            $(".closedsaveFamilyBtn").hide();
        }

        if (activeTab == "closedrrm_skillsTab") {
            $('.nav-tabs a[href="#closedrrm_RequirementDetails"]').tab("show");
            var requirmentLead = $("#closedsdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
            if (LoggedUser == requirmentLead) {
                $("a.closedbtnNext").show();
            }
            else {
                $("a.closedbtnNext").hide();
            }
            $(".closedsaveFamilyBtn").hide();
            $(".closedbtnPrevious").hide();
            _editRRMEntryPoint.updateresourcerequitementdata();
        }

        if (activeTab == "closedrrm_skillsplanbTab") {
            $('.nav-tabs a[href="#closedrrm_SkillsPlanADetails"]').tab("show");
            var requirmentLead = $("#closedsdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
            if (LoggedUser == requirmentLead) {
                $("a.closedbtnNext").show();
            }
            else {
                $("a.closedbtnNext").hide();
            }
            $(".closedbtnPrevious").show();
            $(".closedsaveFamilyBtn").hide();

            var filter_valbtn = JSON.stringify({
                "Token": Token,
                "ResourceRequirementId": ResourceRequirementId,
                "SkillPlans": "PlanA",
                "IsActive": "True"
            });

            // var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);

            callGetListAsync('GetResourceRequrimentSkillPlans', filter_valbtn, function (result) {
                if (result != null) {
                    $("#closedsd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value', result[0].SkillPlanInfo);
                    var edate = result[0].ToBeOnBoard;

                    $("#closedsd_date_rrm_tobeonboardplana").dxDateBox('instance').option('value', edate);
                    ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
                }
            });
        }

        if (activeTab == "closedrrm_commentsTab") {

            comments = $("#closedsd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value');
            $("a.closedbtnNext").show();
            $(".closedsaveFamilyBtn").hide();

            $("a.closedbtnNext").show();

            $(".closedbtnPrevious").show();
            $('.nav-tabs a[href="#closedrrm_SkillsPlanBDetails"]').tab("show");

            var filter_valbtn = JSON.stringify({
                "Token": Token,
                "ResourceRequirementId": ResourceRequirementId,
                "SkillPlans": "PlanB",
                "IsActive": "True"
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
    _editRRMEntryPoint.updateresourcerequitementdata = function () {
        //var getRRMData = callgetlist('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + ResourceRequirementId + '","Token":"' + Token + '"}');
        //_editRRMEntryPoint.mapupdateaddrrmListcomputeHTML(getRRMData)
        callGetListAsync('GetClosedRRM', '{"IsActive":"True","ResourceRequirementId":"' + ResourceRequirementId + '","Token":"' + Token + '"}', function (getRRMData) {
            _editRRMEntryPoint.mapupdateaddrrmListcomputeHTML(getRRMData)
        });
    }

    //bind rrm data from _closedaddRRMEntryPoint.updateresourcerequitementdata function result
    _editRRMEntryPoint.mapupdateaddrrmListcomputeHTML = function (getRRMData) {

        if (getRRMData[0].rrmid == "") {

        } else {
            var data;
            getRRMData.forEach(function (key, item) {
                $("#closedsdtxt_rrm_requirementname").dxTextBox('instance').option('value', key.RequirementName);
                $("#closedsdtxt_rrm_requiredfor").dxTextBox('instance').option('value', key.RequiredFor);
                $("#closedrrm_empid").val(key.RequirementName);
                if (key.BDEId != null && key.BDEId != "") {
                    $("#closedrrm_entrybde").val(key.BDEId);
                }
                else {
                    $("#closedrrm_entrybde").val('');
                }
                $("#closedsdnmb_rrm_numberofpositions").dxNumberBox('instance').option('value', key.NumberOfPositions);

                $("#closedsdcmb_rrm_department").dxSelectBox('instance').option('value', key.DepartmentId);
                $("#closedsdnmb_rrm_experiencerequired").dxNumberBox('instance').option('value', key.ExperiencerequiredInYrs);
                $("#closedsdtxt_rrm_location").dxTextBox('instance').option('value', key.Location);
                $("#closedsdchk_rrm_leadApproval").dxCheckBox('instance').option('value',key.LeadApproval);
                var edate = key.RequestedDate;
                if (edate != null) {
                    var ed = edate;
                    $("#closedsd_date_rrm_requestedDate").dxDateBox('instance').option('value', ed);
                }
                $("#closedsdtxt_rrm_requirementlead").dxTextBox('instance').option('value', key.LeadName);
            });
        }
    }

    //save hr commnets
    _editRRMEntryPoint.closedsaveComments = function () {

        var updatecomments = 1;
        var closedswitchLead = $("#closedswitchLead").dxSwitch("instance").option('value');
        var closedswitchClient = $("#closedswitchClient").dxSwitch("instance").option('value');
        var finalComments = $("#closedsd_txtEditor_RRMComments").dxHtmlEditor('instance').option('value');
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
            dataComments = {
                "Method": "PostOnHoldCommentsInResourceRequirement",
                "Data": {
                    "Token": Token,
                    "OnHoldByClient": closedswitchClient.toString(),
                    "OnHoldByOwner": closedswitchLead.toString(),
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

            $('#closedRRMEntryPointModel').modal("hide");
            ResourceRequirementId = null;
            // _editRRMEntryPoint.getRRMEntryTable();
            var rrmEntryGrid = closedRRMEntryPointGridOwner("Owner");
            requirmentData = {};
            $("#closedswitchClient").dxSwitch('instance').option("disabled", true);

            $("#closedswitchLead").dxSwitch('instance').option("disabled", true);
            rrmEntryGrid.getRRMEntryTable();

            _editRRMEntryPoint.clearAll();
        }
    }

    //get skill details
    _editRRMEntryPoint.closedgetSkillsDetails = function (ResourceRequrimentId) {

        var filterData = JSON.stringify({
            "ResourceRequirementId": ResourceRequrimentId,
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
                    _editRRMEntryPoint.insert_SkillInfoEntry(e);
                },
                onRowUpdated: function (e) {
                    _editRRMEntryPoint.update_SkillInfoEntry(e);
                },
                onRowRemoved: function (e) {
                    _editRRMEntryPoint.delete_SkillInfoEntry(e);
                }
            });
        });
    }

    //get Manage Comment History

    _editRRMEntryPoint.closedgetManageCommentHistory = function (ResourceRequirementId) {
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
            $("#closedrrm_manage_plan_comments_documents").show();
            $("#closedrrm_manage_plan_comments_documents").html(plan_comment_history_html);
            var div = document.getElementById('closedrrm_manage_plan_comments_documents');
            div.scrollTop = div.scrollHeight - div.clientHeight;
        })
    }

    //skill data clear func
    _editRRMEntryPoint.closedskillsClearAndShow = function () { // Clear our fields


        // document.getElementById("familyentry_fromrfp").value = "";
        // document.getElementById("skillentry_fromrfp").value = "";
        // document.getElementById("skillversionentry_fromrfp").value = "";

        // document.getElementById("familyentry_fromresign").value = "";
        // document.getElementById("skillentry_fromresign").value = "";
        // document.getElementById("skillversionentry_fromresign").value = "";
    }

    //insert skill entry
    _editRRMEntryPoint.insert_SkillInfoEntry = function (e) {
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
                _editRRMEntryPoint.closedskillsClearAndShow();
                _editRRMEntryPoint.closedgetSkillsDetails(RRMID);
            }
        });
    }

    _editRRMEntryPoint.update_SkillInfoEntry = function (e) {
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
                _editRRMEntryPoint.closedskillsClearAndShow();
                _editRRMEntryPoint.closedgetSkillsDetails(RRMID);
            }
        });

    }

    _editRRMEntryPoint.delete_SkillInfoEntry = function (e) {
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
                _editRRMEntryPoint.closedskillsClearAndShow();
                _editRRMEntryPoint.closedgetSkillsDetails(RRMID);
            }
        });
    }

    _editRRMEntryPoint.saveRRMInterviewers = function (ResourceRequirementIdParam, EmployeeIds) {
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

    _editRRMEntryPoint.closedCloneEntryFromRRM = function (rrmid) {
        callGetListAsync('GetRRMById', '{"IsActive":"True","ResourceRequirementId":"' + rrmid + '","Token":"' + Token + '"}', function (getRRMData) {
            _editRRMEntryPoint.mapclonerrmListcomputeHTML(getRRMData);
        })
    }

    _editRRMEntryPoint.mapclonerrmListcomputeHTML = function (getRRMData) {
        
        if (getRRMData[0].rrmid == "") {

        }
        else {
            getRRMData.forEach(function (key, item) {
                $("#closedsdtxt_rrm_requirementname").dxTextBox('instance').option('value', key.RequirementName);
                $("#closedsdtxt_rrm_requiredfor").dxTextBox('instance').option('value', key.RequiredFor);
                $("#closedsdcmb_rrm_priority").dxSelectBox('instance').option('value', key.PriorityId);
                if (key.PriorityId != "") {
                    $("#closedsdcmb_rrm_priority").dxSelectBox('instance').option('value', key.PriorityId);
                }
                if (key.BDEId != " ") {
                    $("#closedrrm_entrybde").val(key.BDEId);
                    $("#closedhidedivRFP").show();
                }
                else {
                    $("#closedrrm_entrybde").val('');
                    $("#closedhidedivRFP").hide();
                }
                if (key.RFPId != null && key.RFPId != "") {
                    $("#closedrrm_rfpid").val(key.RFPId);
                    $("#closedhidedivRFP").show();
                }
                else{
                    $("#closedrrm_rfpid").val('');
                    $("#closedhidedivRFP").hide();
                }

                $("#closedsdnmb_rrm_numberofpositions").dxNumberBox('instance').option('value', key.NumberOfPositions);
                $("#closedsdcmb_rrm_communication").dxSelectBox('instance').option('value', key.Communication);
                if (key.Communication != "") {
                    $("#closedsdcmb_rrm_communication").dxSelectBox('instance').option('value', key.Communication);
                }

                $("#closedsdcmb_rrm_department").dxSelectBox('instance').option('value', key.DepartmentId);
                $("#closedsdcmb_rrm_designation").dxSelectBox('instance').option('value', key.DesignationId);
                $("#closedsdnmb_rrm_experiencerequired").dxNumberBox('instance').option('value', key.ExperiencerequiredInYrs);
                $("#closedsdtxt_rrm_location").dxTextBox('instance').option('value', key.Location);
                if (key.Location != "") {
                    $("#closedsdtxt_rrm_location").dxTextBox('instance').option('value', key.Location);
                }

                $("#closedsdnmb_rrm_numberofpositions").dxNumberBox('instance').option('value', getRRMData[0].NumberOfPositions);
                planAcomments = key['PlanA-SkillPlanInfo'];
                $("#closedsd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('value', planAcomments);

                planBcomments = key['PlanB-SkillPlanInfo'];
                $("#closedsd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value', planBcomments);
                IsOwnerForSkill = true;
            });
        }
    }

    return _editRRMEntryPoint;

});

function bindRRMTechnologyStrings() {
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
                    "ResourceRequirementId": closedrrmId
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
    //debugger;
    if (closedleadApprovalType == "edit") {
        if (e.value == false) {
            if (closedrrmId != null && closedrrmId != undefined) {
                var data = [];
                {
                    data = {
                        "Method": "PostLeadApprovalStatus",
                        "Data": {
                            "RRMId": closedrrmId,
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