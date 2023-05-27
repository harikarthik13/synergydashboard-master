var RRMIDs;

AddRRMEntryPoint = (function () {
    var _addRRMEntryPoint = {};
    var GetRRMs;
    var dataResource = [];
    var dataPlanA = [];
    var dataPlanB = [];
    var dataComments = [];
    var ResourceRequirementId;
    var dataSkillApi = [];
    var table;
    var skilltblid;
    var ResourceRequirementSkillPlanId = null;
    var nextFlag = false;
    var IsRrmSaved = false;
    _addRRMEntryPoint.family = {};
    _addRRMEntryPoint.skill = {};
    _addRRMEntryPoint.version = {};
    
    //mapui func
    function mapUI() {
        $rrmtab = $('#rrmtab')
        $rrm_entrybde = $("#rrm_entrybde"),
            $rrm_empid = $("#rrm_empid"),
            $rrm_replacement = $("#rrm_replacement")
    }

    //save hr commnents once save&close btn clicked 
    _addRRMEntryPoint.saveComments = function () {
        var updatecomments = 1;
        var switchLead = $("#switchLead").dxSwitch("instance").option('value');
        var switchClient = $("#switchClient").dxSwitch("instance").option('value');
        var finalComments = $("#sd_txtEditor_RRMComments").dxHtmlEditor('instance').option('value')
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
                    "Comments": finalComments,
                    "IsActive": 'True'
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

            $('#RRMEntryPointModel').modal("hide");
            ResourceRequirementId = null;
            // _editRRMEntryPoint.getRRMEntryTable();
            var rrmEntryGrid = RRMEntryPointGridOwner("Owner");
            requirmentData = {};
            rrmEntryGrid.getRRMEntryTable();
            $("#rrmGridReportOwner").dxDataGrid('instance').refresh();
            _addRRMEntryPoint.clearAll_addrrmdata();
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
        //    var rrmEntryGrid = RRMEntryPointGridOwner("Owner");
        //    rrmEntryGrid.getRRMEntryTable();
        //    _addRRMEntryPoint.clearAll_addrrmdata();
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

        //    PostDataCallAsync(dataComments, function (e) {
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
        //        var rrmEntryGrid = RRMEntryPointGridOwner("Owner");
        //        rrmEntryGrid.getRRMEntryTable();
        //        _addRRMEntryPoint.clearAll_addrrmdata();
        //    });
        //}
    }

    //tab next button event (rrmentry->skills->planA->planB->commnets) 
    _addRRMEntryPoint.toggleTabRRMEntry = function () {

        var activeTab = $('#rrmtab').find('li.active').attr('id')
        var EmployeeId = null;

        if (activeTab == "rrm_requirementTab") {
            requirmentName = $("#sdtxt_rrm_requirementname").dxTextBox('instance').option('value');
            requireFor = $("#sdtxt_rrm_requiredfor").dxTextBox('instance').option('value');
            bde = $("#rrm_entrybde").val();
            if (bde == "") { bde = null; }
            rfpId = $("#rrm_rfpid").val();
            if(rfpId == ""){
                rfpId = null;
            }
            EmployeeId = $("#rrm_empid").val();
            if (EmployeeId == "") { EmployeeId = null }
            replacementFor = $("#rrm_replacement").val();
            position = $("#sdnmb_rrm_numberofpositions").dxNumberBox('instance').option('value');
            priority = $("#sdcmb_rrm_priority").dxSelectBox('instance').option('value');
            department = $("#sdcmb_rrm_department").dxSelectBox('instance').option('value');
            designation = $("#sdcmb_rrm_designation").dxSelectBox('instance').option('value');
            experience = $("#sdnmb_rrm_experiencerequired").dxNumberBox('instance').option('value');
            interviewers = $("#sdtag_rrm_intervierwers").dxTagBox('instance').option('value');
            communication = $("#sdcmb_rrm_communication").dxSelectBox('instance').option('value');
            reqlocation = $("#sdtxt_rrm_location").dxTextBox('instance').option('value');
            if (reqlocation == "") { reqlocation = null; }
            if (ResourceRequirementId == "" || ResourceRequirementId == undefined) {
                ResourceRequirementId = null;
            }
            requestedDate = $("#sd_date_rrm_requestedDate").dxDateBox('instance').option('value');
            losingRevenue = $("#sdchk_rrm_losingRevenue").dxCheckBox('instance').option('value');
            fromVIP = $("#sdchk_rrm_fromVIP").dxCheckBox('instance').option('value');
            requirmentLead = $("#sdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
            leadApproval = $("#sdchk_rrm_leadApproval").dxCheckBox('instance').option('value');
            var finalRequestedDate = moment(requestedDate).format("DD-MM-YYYY");
            var getInterviewerMultipleArry = $("#sdtag_rrm_intervierwers").dxTagBox('instance').option('value');
            var joinInterviewerArray = "";
            $.each(getInterviewerMultipleArry, function (index, val) {
                joinInterviewerArray += val + ",";
            });
            joinInterviewerArray = joinInterviewerArray.replace(/,\s*$/, "");
            if (requirmentName.trim() == "" || requireFor.trim() == "" || position == "" || position == "0" || department == "" || designation == "" || designation == null || experience == "" || experience == "0" || interviewers.length == 0 || priority == null || priority == "") {
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
                if (designation == '' || designation == "" || designation == 'null' ) {
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
                if(priority == null || priority == ""){
                    $("#sdcmb_rrm_priority").addClass('input-error');
                    $("#rrm_priorityError").html("Select Priority");
                }
                else{
                    $("#sdcmb_rrm_priority").removeClass('input-error');
                    $("#rrm_priorityError").html("");
                }
                if (interviewers.length == 0) {
                    $("#sdtag_rrm_intervierwers").addClass('input-error');
                    $("#rrm_interviewersError").html("Select interviewer(s)");
                }
                else {
                    $("#sdtag_rrm_intervierwers").removeClass('input-error');
                    $("#rrm_interviewersError").html("");
                }
                $('.nav-tabs a[href="#rrm_requirementTab"]').tab("show");
                $(".btnPrevious").hide();
                if (!IsRrmSaved) {
                    $(".saveFamilyBtn").hide();
                    $("a.btnNext").show();
                }
            }

            else {
                dataResource = {
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

                // var resultResorce = PostDataCall(dataResource);
                PostDataCallAsync(dataResource, function (resultResorce) {
                    if (ResourceRequirementId == null) {
                        ResourceRequirementId = resultResorce.Data[0].ResourceRequirementId;
                        _addRRMEntryPoint.saveRRMInterviewers(ResourceRequirementId, joinInterviewerArray)
                        if (IsRRMForClone == true) {
                            _addRRMEntryPoint.saveSkillsDetailsForClone(ResourceRequirementId, ClonedRRMId);
                        }
                    }
                });
                $('.nav-tabs a[href="#rrm_SkillDetails"]').tab("show");
                var filter_val2 = JSON.stringify({
                    RRMId: ResourceRequirementId,
                    IsActive: 'True'
                });
                RRMIDs = ResourceRequirementId;
                var technologyArray = new Array();
                var getTechnologiesForRRM = callgetlist("GetTechnologiesForRRMById", filter_val2);
               
                getTechnologiesForRRM.forEach(function (item) {
                    $('#rrm_profileEntry_skills').attr({ "skillId": item.SkillId, "versionId": item.SkillVersionID, "familyId": item.SkillFamilyId, "value": item.SkillId + "-" + item.SkillVersionID });
                    technologyArray.push(item.SkillId + "-" + item.SkillVersionID);
                    $('#rrm_profileEntry_skills').val(technologyArray);
                    $('#rrm_profileEntry_skills').select2();
                });

                if(getTechnologiesForRRM.length == 0){
                    $('#rrm_profileEntry_skills').val(null).trigger('change');
                }

                $(".btnPrevious").show();
                if (!IsRrmSaved) {
                    $(".saveFamilyBtn").hide();
                    $("a.btnNext").show();
                }
                if (IsRRMForClone != true) {
                    _addRRMEntryPoint.getSkillsDetails();
                }
            }
        }
        $(".btnPrevious").show();
        if (!IsRrmSaved) {
            $(".saveFamilyBtn").hide();
            $("a.btnNext").show();

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
                    var result = bindRRMTechnologyString();
                    _addRRMEntryPoint.insert_SkillInfoEntrysNew(result);

                    $('.nav-tabs a[href="#rrm_SkillsPlanADetails"]').tab("show");
                    $(".btnPrevious").show();

                    if (!IsRrmSaved) {
                        $(".saveFamilyBtn").hide();
                        $("a.btnNext").show();
                    }
                }
            }

            if (activeTab == "rrm_skillsplanaTab") {
                var datecheck = 0;
                $("div#divrecruiters").hide();
                var RecruiterA = [];
                skillDetailsA = $("#sd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('value')
                toOnBoardA = $("#sd_date_rrm_tobeonboardplana").dxDateBox('instance').option('value');
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
                        $('#rrm_skilldetailsplanaError').html("Enter Skill Details");
                    }
                    else {
                        $('#rrm_skilldetailsplanan').removeClass('input-error');
                        $('#rrm_skilldetailsplanaError').html("");
                    }
                    if (toOnBoardA == "") {
                        $('#sd_date_rrm_tobeonboardplana').addClass('input-error');
                        $('#rrm_tobeonboardplanaError').html("Select Date");
                    }
                    else {
                        $('#rrm_tobeonboardplana').removeClass('input-error');
                        $('#rrm_tobeonboardplanaError').html("");
                    }
                    $('.nav-tabs a[href="#rrm_skillsplanaTab"]').tab("show");
                    $(".btnPrevious").show();
                    if (!IsRrmSaved) {
                        $(".saveFamilyBtn").hide();
                        $("a.btnNext").show();
                    }
                }
                else {
                    dataPlanA = {
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
                    //var resulPlanBt = PostDataCall(dataPlanA);
                    PostDataCallAsync(dataPlanA, function (resulPlanBt) {
                        $('.nav-tabs a[href="#rrm_SkillsPlanBDetails"]').tab("show");
                        $(".btnPrevious").show();
                        if (!IsRrmSaved) {
                            $(".saveFamilyBtn").hide();
                            $("a.btnNext").show();
                        }
                    });
                }
            }

            if (activeTab == "rrm_skillsplanbTab") {
                var datecheckplanb = 0;
                skillDetailsB = $("#sd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value');
                toOnBoardB = $("#sd_date_rrm_tobeonboardplanb").dxDateBox('instance').option('value')
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
                    $('.nav-tabs a[href="#rrm_SkillsPlanBDetails"]').tab("show");
                }
                if ((skillDetailsB == "" || toOnBoardB == "") || datecheckplanb == 1) {
                    if (skillDetailsB == "") {
                        $('#sd_txtEditor_skillDetailsPlanB').addClass('input-error');
                        $('#rrm_skilldetailsplanbError').html("Enter Skill Details");
                    } else {
                        $('#sd_txtEditor_skillDetailsPlanB').removeClass('input-error');
                        $('#rrm_skilldetailsplanbError').html("");
                    }
                    if (toOnBoardB == "") {
                        $('#sd_date_rrm_tobeonboardplanb').addClass('input-error');
                        $('#rrm_tobeonboardplanbError').html("Select Date");
                    } else {
                        $('#sd_date_rrm_tobeonboardplanb').removeClass('input-error');
                        $('#rrm_tobeonboardplanbError').html("");
                    }
                    $('.nav-tabs a[href="#rrm_skillsplanbTab"]').tab("show");
                    $(".btnPrevious").show();
                    if (!IsRrmSaved) {
                        $(".saveFamilyBtn").hide();
                        $("a.btnNext").show();
                    }
                }
                else {
                    dataPlanB = {
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

                    //var resulPlanBt = PostDataCall(dataPlanB);
                    PostDataCallAsync(dataPlanB, function (resulPlanBt) {
                        $('.nav-tabs a[href="#rrm_CommentsDetails"]').tab("show");
                        $("#rrm_manage_plan_comments_documents").hide();
                        $(".btnPrevious").show();
                        if (!IsRrmSaved) {
                            $(".saveFamilyBtn").show();
                            $("a.btnNext").hide();
                        }
                    });
                }
            }
        }

        resetSimpleBarRRMEntryPoint();
    }
    
    //tab previous button functions (rrmentry<-skills<-planA<-planB<-commnets) 
    _addRRMEntryPoint.toggleTabRRMEntryPrevious = function () {

        var activeTab = $('#rrmtab').find('li.active').attr('id')
        if (activeTab == "rrm_skillsplanaTab") {
            _addRRMEntryPoint.getSkillsDetails();
            $('.nav-tabs a[href="#rrm_SkillDetails"]').tab("show");
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
        }
        if (activeTab == "rrm_skillsTab") {
            $('.nav-tabs a[href="#rrm_RequirementDetails"]').tab("show");
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
            $(".btnPrevious").hide();
            var requiredLead = $("#sdtxt_rrm_requirementlead").dxTextBox('instance').option('value');
            if(LoggedUser != requiredLead){
                $("#sdchk_rrm_leadApproval").dxCheckBox("instance").option("readOnly",true);
              }
              else{
                $("#sdchk_rrm_leadApproval").dxCheckBox("instance").option("readOnly",false);
              }
            _addRRMEntryPoint.updateresourcerequitementdata();
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
                    $("#sd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('value', result[0].SkillPlanInfo)
                    var edate = result[0].ToBeOnBoard;
                    $("#sd_date_rrm_tobeonboardplana").dxDateBox('instance').option('value', edate);
                    ResourceRequirementSkillPlanId = result[0].ResourceRequirementSkillPlanId;
                }
            })
        }
        if (activeTab == "rrm_commentsTab") {

            comments = $("#sd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value');
            if (!IsRrmSaved) {
                $("a.btnNext").show();
                $(".saveFamilyBtn").hide();
            } else {
                $("a.btnNext").hide();
            }
            $(".btnPrevious").show();
            $('.nav-tabs a[href="#rrm_SkillsPlanBDetails"]').tab("show");
            var filter_valbtn = JSON.stringify({
                "IsActive": "True",
                "Token": Token,
                "SkillPlans": 'PlanB',
                "ResourceRequirementId": ResourceRequirementId
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
    _addRRMEntryPoint.updateresourcerequitementdata = function () {
        //var getRRMData = callgetlist('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + ResourceRequirementId + '","Token":"' + Token + '"}');
        callGetListAsync('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + ResourceRequirementId + '","Token":"' + Token + '"}', function (getRRMData) {
            _addRRMEntryPoint.mapupdateaddrrmListcomputeHTML(getRRMData)
        })
    }

    //bind rrm data from _addRRMEntryPoint.updateresourcerequitementdata function result
    _addRRMEntryPoint.mapupdateaddrrmListcomputeHTML = function (getRRMData) {
        var minDate = new Date();
        minDate.setDate(minDate.getDate());
        var minTdyDate = minDate.toISOString().slice(0, 10);
        $("#sd_date_rrm_tobeonboardplana").dxDateBox("instance").option("min", minTdyDate);
        $("#sd_date_rrm_tobeonboardplanb").dxDateBox("instance").option("min", minTdyDate);
        $("#sd_date_rrm_tobeonboardplana").dxDateBox("instance").option("isValid", true);
        $("#sd_date_rrm_tobeonboardplanb").dxDateBox("instance").option("isValid", true);

        if (getRRMData[0].rrmid == "") {
            //
        }
        else {
            var data;
            getRRMData.forEach(function (key, item) {
                $("#sdtxt_rrm_requirementname").dxTextBox('instance').option('value', key.RequirementName);
                $("#sdtxt_rrm_requiredfor").dxTextBox('instance').option('value', key.RequiredFor);
                $("#rrm_empid").val(key.RequirementName);
                $("#rrm_entrybde").val(key.BDEName);
                $("#sdnmb_rrm_numberofpositions").dxNumberBox('instance').option('value', key.NumberOfPositions);

                $("#sdcmb_rrm_department").dxSelectBox('instance').option('value', key.DepartmentId);
                $("#sdnmb_rrm_experiencerequired").dxNumberBox('instance').option('value', key.ExperiencerequiredInYrs);
                $("#sdtxt_rrm_location").dxTextBox('instance').option('value', key.Location);
                var edate = key.RequestedDate;
                if (edate != null) {
                    var ed = edate;
                    $("#sd_date_rrm_requestedDate").dxDateBox('instance').option('value', ed);
                }
                $("#sdtxt_rrm_requirementlead").dxTextBox('instance').option('value', key.LeadName);
            });
        }
    }

    //rrmFormVAlidation
    _addRRMEntryPoint.rrmValidation = function () {
        if ($("#sdtxt_rrm_requirementname").dxTextBox('instance').option('value') == "") {
            alert("")
            $("#rrm_requirementnameError").html("Please Enter Name");
        }
        if ($("#sdtxt_rrm_requiredfor").dxTextBox('instance').option('value') == "") {
            $("#rrm_requiredforError").html("Please Enter RequiredFor");
        }
        if ($("#sdnmb_rrm_numberofpositions").dxNumberBox('instance').option('value') == "") {
            $("#rrm_numberofpositionsError").html("Please Enter No. Of Positions");
        }
        if ($("#sdcmb_rrm_department").dxSelectBox('instance').option('value') == "") {
            $("#rrm_departmentError").html("Please Select Department");
        }
        if ($("#sdnmb_rrm_experiencerequired").dxNumberBox('instance').option('value') == "") {
            $("#rrm_experiencerequiredError").html("Please Enter Experience");
        }
        if ($("#sdcmb_rrm_communication").dxSelectBox('instance').option('value') == "") {
            $("#rrm_communicationError").html("Please Select Communication");
        }
        if ($("#rrmfamily").val() == "") {
            $("#rrmfamilyError").html("Please Select Family");
        }
        if ($("#rrmskill").val() == "") {
            $("#rrmskillError").html("Please Select Skill");
        }
        if ($("#sd_txtEditor_skillDetailsPlanA").dxHtmlEditor('instance').option('value') == "") {
            $("#rrm_skilldetailsplanaError").html("Please Enter Skill Details (Plan A)");
        }
        if ($("#sd_txtEditor_skillDetailsPlanB").dxHtmlEditor('instance').option('value') == "") {
            $("#rrm_skilldetailsplanbError").html("Please Enter Skill Details (Plan B)");
        }
        if ($("#sd_date_rrm_tobeonboardplana").dxDateBox('instance').option('value') == "") {
            $("#rrm_tobeonboardplanaError").html("Please Select To on Board");
        }
        if ($("#sd_date_rrm_tobeonboardplanb").dxDateBox('instance').option('value') == "") {
            $("#rrm_tobeonboardplanbError").html("Please Select To on Board");
        }
    }

    //reset skill data 
    _addRRMEntryPoint.skillsClearAndShow = function () { // Clear our fields

    }

    //insert skill details New
    _addRRMEntryPoint.insert_SkillInfoEntrysNew = function (e) {

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

    _addRRMEntryPoint.insert_SkillInfoEntry = function (e) {
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
                _addRRMEntryPoint.skillsClearAndShow();
                var filter_val1 = JSON.stringify({
                    Token : Token,
                    RRMId: ResourceRequirementId,
                    IsActive: 'True'
                });
                
                var technologyArray = new Array();
                var getTechnologiesForRRM = callgetlist("GetTechnologiesForRRMById", filter_val1);

                getTechnologiesForRRM.forEach(function (item) {
                    // $('#rrm_profileEntry_skills').attr({ "skillId": item.SkillId,  "FamilyName": item.FamilyName, "versionId": item.SkillVersionID, "familyId": item.SkillFamilyId, "value": item.SkillId + "-" + item.SkillVersionID });
                    $('#rrm_profileEntry_skills').attr({ "ResourceRequirementSkillID" : item.ResourceRequirementSkillID , "skillId": item.SkillId,  "versionId": item.SkillVersionID, "familyId": item.SkillFamilyId, "value": item.SkillId + "-" + item.SkillVersionID });
                    technologyArray.push(item.SkillId + "-" + item.SkillVersionID);
                    $('#rrm_profileEntry_skills').val(technologyArray);
                    $('#rrm_profileEntry_skills').select2();
                });
                _addRRMEntryPoint.getSkillsDetails();
            }
        });
    }

    _addRRMEntryPoint.update_SkillInfoEntry = function (e) {

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
                _addRRMEntryPoint.skillsClearAndShow();
                var filter_val1 = JSON.stringify({
                    Token : Token,
                    RRMId: ResourceRequirementId,
                    IsActive: 'True'
                });
                
                var technologyArray = new Array();
                var getTechnologiesForRRM = callgetlist("GetTechnologiesForRRMById", filter_val1);

                getTechnologiesForRRM.forEach(function (item) {
                    debugger
                    // $('#rrm_profileEntry_skills').attr({ "skillId": item.SkillId,  "FamilyName": item.FamilyName, "versionId": item.SkillVersionID, "familyId": item.SkillFamilyId, "value": item.SkillId + "-" + item.SkillVersionID });
                    $('#rrm_profileEntry_skills').attr({ "ResourceRequirementSkillID" : item.ResourceRequirementSkillID , "skillId": item.SkillId,  "versionId": item.SkillVersionID, "familyId": item.SkillFamilyId, "value": item.SkillId + "-" + item.SkillVersionID });
                    technologyArray.push(item.SkillId + "-" + item.SkillVersionID);
                    $('#rrm_profileEntry_skills').val(technologyArray);
                    $('#rrm_profileEntry_skills').select2();
                });
                _addRRMEntryPoint.getSkillsDetails();
            }
        });

    }

    _addRRMEntryPoint.delete_SkillInfoEntry = function (e) {
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
                _addRRMEntryPoint.skillsClearAndShow();
                var filter_val1 = JSON.stringify({
                    Token : Token,
                    RRMId: ResourceRequirementId,
                    IsActive: 'True'
                });
                
                var technologyArray = new Array();
                var getTechnologiesForRRM = callgetlist("GetTechnologiesForRRMById", filter_val1);

                getTechnologiesForRRM.forEach(function (item) {
                    debugger
                    // $('#rrm_profileEntry_skills').attr({ "skillId": item.SkillId,  "FamilyName": item.FamilyName, "versionId": item.SkillVersionID, "familyId": item.SkillFamilyId, "value": item.SkillId + "-" + item.SkillVersionID });
                    $('#rrm_profileEntry_skills').attr({ "ResourceRequirementSkillID" : item.ResourceRequirementSkillID , "skillId": item.SkillId,  "versionId": item.SkillVersionID, "familyId": item.SkillFamilyId, "value": item.SkillId + "-" + item.SkillVersionID });
                    technologyArray.push(item.SkillId + "-" + item.SkillVersionID);
                    $('#rrm_profileEntry_skills').val(technologyArray);
                    $('#rrm_profileEntry_skills').select2();
                });
                _addRRMEntryPoint.getSkillsDetails();
            }
        });
    }


    //show skill in skill table
    _addRRMEntryPoint.getSkillsDetails = function () {
        var filterData = JSON.stringify({
            "ResourceRequirementId": ResourceRequirementId,
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
                    _addRRMEntryPoint.insert_SkillInfoEntry(e);
                },
                onRowUpdated: function (e) {
                    _addRRMEntryPoint.update_SkillInfoEntry(e);
                },
                onRowRemoved: function (e) {
                    _addRRMEntryPoint.delete_SkillInfoEntry(e);
                }
            });
        })

    }

    _addRRMEntryPoint.saveRRMInterviewers = function (ResourceRequirementIdParam, EmployeeIds) {
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
    _addRRMEntryPoint.skillcomputeHTML = function (getSkillList) {
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
                html += "<button class='btn delete-btn' onclick=_addRRMEntryPoint.deleteRow_SkillMapping('" + skillId + "')><i class='fas fa-trash-alt'></i></button></td>"
                html += "</tr>";
            });

        }
        return html;
    }

    _addRRMEntryPoint.loadSkillGrid = function (getSkillList) {
        $("#sdgd-rrmOwnerSkills").dxDataGrid({ dataSource: getSkillList })
    }

    //reset form data
    _addRRMEntryPoint.clearAll_addrrmdata = function () {

        $("#sdtxt_rrm_requirementname").dxTextBox('instance').option('value', "")
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
        $("#sd_date_rrm_tobeonboardplanb").dxDateBox('instance').option('value', nxtDate);
        $("#sd_date_rrm_tobeonboardplana").dxDateBox('instance').option('value', nxtDate);
        skillsClearAndShow();

    }

    _addRRMEntryPoint.saveSkillsDetailsForClone = function (ResourceRequirementId, ClonedRRMId) {
        var filterValue = {
            "Method": "PostSkillsForClonedRRM",
            "Data": {
                "ClonedRRMId": ClonedRRMId,
                "RRMId": ResourceRequirementId,
                "IsActive": true
            }
        }

        PostDataCallAsync(filterValue, function (result) {
            _addRRMEntryPoint.getSkillsDetails();
            return true;
        });
    }

    mapUI();
    return _addRRMEntryPoint;
});

function bindRRMTechnologyString() {
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
                    "ResourceRequirementId": RRMIDs
                }
            }
        }

        PostDataCallAsync(data, function (postCall) {

            if (postCall['IsSuccess'] == true) {

            }
        });
    }
}

