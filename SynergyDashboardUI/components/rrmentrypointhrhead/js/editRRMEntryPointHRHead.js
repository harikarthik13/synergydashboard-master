EditRRMEntryPointOwnerHrHead = function () {
  var _editRRMEntryPointHrHead = {};
  var requirementDataHrHead = {};
  var dataResource = [];
  var dataPlanB = [];
  var dataComments = [];
  var ResourceRequrimentId;
  var dataSkillApi = [];
  var IsRrmSaved = false;
  var RRMID;
  var ResourceRequirementId;
  var ResourceRequirementSkillPlanId = null;
  var enddateChangedplanA;
  var hrComments;
  var ResourceRequirementSkillPlanAId;
  var ResourceRequirementSkillPlanBId;
  var OnHoldByOwnerStatusHrHead = false;
  var OnHoldByClientStatusHrHead = false;

  var IsOwnerForSkill = false;

  _editRRMEntryPointHrHead.initializeRRMByTechnical = function (rrmid) {};

  //tab next btn events
  _editRRMEntryPointHrHead.toggleTabRRMEntry = function () {

    var activeTab = $("#rrmtabHrHead").find("li.active").attr("id");

    if (activeTab == "rrm_requirementTabHrHead") {
      var getInterviewerMultipleArry = $("#sdtag_rrmhrhead_intervierwers").dxTagBox('instance').option('value');
            var joinInterviewerArray = "";
            $.each(getInterviewerMultipleArry, function (index, val) {
                joinInterviewerArray += val + ",";
            });
            joinInterviewerArray = joinInterviewerArray.replace(/,\s*$/, "");
            if (OnHoldByOwnerStatusHrHead == true || OnHoldByClientStatusHrHead == true) {
              readOnlyFormDataHrHead();
              $('.nav-tabs a[href="#rrm_SkillDetailsHrHead"]').tab("show");
              $(".btnPrevious").show();
              $(".saveFamilyBtn").hide();
              $("a.btnNext").show();
              _editRRMEntryPointHrHead.getSkillsDetails(RRMID);
            }
            else {
                requirmentName = $("#sdtxt_rrmhrhead_requirementname").dxTextBox('instance').option('value');
                requireFor = $("#sdtxt_rrmhrhead_requiredfor").dxTextBox('instance').option('value');
                bde = $("#rrm_entrybdeHrHead").val();
                if (bde == "") { bde = null; }
                replacementFor = $("#rrm_replacementHrHead").val();
                position = $("#sdnmb_rrmhrhead_numberofpositions").dxNumberBox('instance').option('value');
                priority = $("#sdcmb_rrmhrhead_priority").dxSelectBox('instance').option('value');
                RRMHrHeadDetailsForValidations.Priority = priority;
                department = $("#sdcmb_rrmhrhead_department").dxSelectBox('instance').option('value');
                designation = $("#sdcmb_rrmhrhead_designation").dxSelectBox('instance').option('value');
                experience = $("#sdnmb_rrmhrhead_experiencerequired").dxNumberBox('instance').option('value');
                RRMHrHeadDetailsForValidations.ExperienceRequired = experience;
                interviewers = $("#sdtag_rrmhrhead_intervierwers").dxTagBox('instance').option('value');
                communication = $("#sdcmb_rrmhrhead_communication").dxSelectBox('instance').option('value');
                RRMHrHeadDetailsForValidations.Communication = communication;
                reqlocation = $("#sdtxt_rrmhrhead_location").dxTextBox('instance').option('value');
                requestedDate = $("#sd_date_rrmhrhead_requestedDate").dxDateBox('instance').option('value');
                losingRevenue = $("#sdchk_rrmhrhead_losingRevenue").dxCheckBox('instance').option('value');
                fromVIP = $("#sdchk_rrmhrhead_fromVIP").dxCheckBox('instance').option('value');
                requirmentLead = $("#sdtxt_rrmhrhead_requirementlead").dxTextBox('instance').option('value');
                leadApproval = $("#sdchk_rrmhrhead_leadApproval").dxCheckBox('instance').option('value');

                if (reqlocation == "") { reqlocation = null; }
                var finalRequestedDate = moment(requestedDate).format("DD-MM-YYYY");

                if (requirmentName.trim() == "" || requireFor.trim() == "" || position == "" || position == "0" || department == "" || designation == "" || experience == "" || experience == "0" || interviewers.length == 0) {
                    if (requirmentName.trim() == "") {
                        $('#sdtxt_rrmhrhead_requirementname').addClass('input-error');
                        $('#rrm_requirementnameHrHeadError').html("Enter Requirment Name");
                    }
                    else {
                        $('#sdtxt_rrmhrhead_requirementname').removeClass('input-error');
                        $('#rrm_requirementnameHrHeadError').html("");
                    }
                    if (requireFor.trim() == "") {
                        $('#sdtxt_rrmhrhead_requiredfor').addClass('input-error');
                        $('#rrm_requiredforHrHeadError').html("Enter Required For");
                    }
                    else {
                        $('#sdtxt_rrmhrhead_requiredfor').removeClass('input-error');
                        $('#rrm_requiredforHrHeadError').html("");
                    }
                    if (position == "" || position == "0") {
                        if (position == "") {
                            if (position == "") {
                                $('#sdnmb_rrmhrhead_numberofpositions').addClass('input-error');
                                $('#rrm_numberofpositionsHrHeadError').html("Enter Position");
                            }
                            else {
                                $('#sdnmb_rrmhrhead_numberofpositions').removeClass('input-error');
                                $('#rrm_numberofpositionsHrHeadError').html("");
                            }
                        }
                        if (position == "0") {
                            if (position == "0") {
                                $('#sdnmb_rrmhrhead_numberofpositions').addClass('input-error');
                                $('#rrm_numberofpositionsHrHeadError').html("Min Position is 1");
                            }
                            else {
                                $('#sdnmb_rrmhrhead_numberofpositions').removeClass('input-error');
                                $('#rrm_numberofpositionsHrHeadError').html("");
                            }
                        }
                    }
                    if (department == "") {
                        $('#sdcmb_rrmhrhead_department').addClass('input-error');
                        $('#rrm_departmentHrHeadError').html("Select Department");
                    }
                    else {
                        $('#sdcmb_rrmhrhead_department').removeClass('input-error');
                        $('#rrm_departmentHrHeadError').html("");
                    }

                    if (designation == "") {
                        $('#sdcmb_rrmhrhead_designation').addClass('input-error');
                        $('#rrm_designationHrHeadError').html("Select Designation");
                    }
                    else {
                        $('#sdcmb_rrmhrhead_designation').removeClass('input-error');
                        $('#rrm_designationHrHeadError').html("");
                    }
                    if (experience == "" || experience == "0") {
                        if (experience == "") {
                            if (experience == "") {
                                $('#sdnmb_rrmhrhead_experiencerequired').addClass('input-error');
                                $('#rrm_experiencerequiredHrHeadError').html("Select Experience");
                            }
                            else {
                                $('#sdnmb_rrmhrhead_experiencerequired').removeClass('input-error');
                                $('#rrm_experiencerequiredHrHeadError').html("");
                            }
                        }
                        if (experience == "0") {
                            if (experience == "0") {
                                $('#sdnmb_rrmhrhead_experiencerequired').addClass('input-error');
                                $('#rrm_experiencerequiredHrHeadError').html("Min Experience is 1");
                            }
                            else {
                                $('#sdnmb_rrmhrhead_experiencerequired').removeClass('input-error');
                                $('#rrm_experiencerequiredHrHeadError').html("");
                            }
                        }
                    }
                    if(interviewers.length == 0){
                        $("#sdtag_rrmhrhead_intervierwers").addClass('input-error');
                        $("#rrm_interviewersHrHeadError").html("Select interviewer(s)");
                    }
                    else{
                        $("#sdtag_rrmhrhead_intervierwers").removeClass('input-error');
                        $("#rrm_interviewersHrHeadError").html("");
                    }

                    $('.nav-tabs a[href="#rrm_requirementTab"]').tab("show");
                    $(".btnPrevious").hide();
                        $(".saveFamilyBtn").hide();
                        $("a.btnNext").show();
                }
                else {

                    if (requirementDataHrHead.Communication != communication || requirementDataHrHead.PriorityId != priority || requirementDataHrHead.Location != reqlocation || requirementDataHrHead.ExperiencerequiredInYrs != experience  || arraysEqual(RRMHrHeadDetailsForValidations.Interviewers,interviewers) != true) {
                        var updatedContent = "";
                        if (requirementDataHrHead.Communication != communication) {

                            updatedContent += "Communication has been changed from '" + requirementDataHrHead.Communication + "' to '" + communication + "'  \n "
                            //communication = requirementDataHrHead.Communication;

                            requirementDataHrHead["Communication"] = communication;
                            $("#sdcmb_rrmhrhead_communication").dxSelectBox('instance').option('value',communication);
                            communication = $("#sdcmb_rrmhrhead_communication").dxSelectBox('instance').option('value');
                            IsPassed = 1;
                        }
                        if (requirementDataHrHead.PriorityId != priority) {
                            var exististingVal = $("#sdcmb_rrmhrhead_priority").dxSelectBox('instance').option('value',requirementDataHrHead.PriorityId);
                            exististingVal = $("#sdcmb_rrmhrhead_priority").dxSelectBox('instance').option('text');

                            var currentVal = $("#sdcmb_rrmhrhead_priority").dxSelectBox('instance').option('value',priority);
                            requirementDataHrHead["PriorityId"] = priority;
                            $("#sdcmb_rrmhrhead_priority").dxSelectBox('instance').option('value',priority);
                            priority = $("#sdcmb_rrmhrhead_priority").dxSelectBox('instance').option('value');

                            currentVal = $("#sdcmb_rrmhrhead_priority").dxSelectBox('instance').option('text');
                            updatedContent += "Priority has been changed from '" + exististingVal + "' to '" + currentVal + "' \n"
                            IsPassed = 1;


                        }
                        if (requirementDataHrHead.Location != reqlocation) {

                            updatedContent += "Location has been changed from '" + requirementDataHrHead.Location + "' to '" + reqlocation + "' \n"
                            requirementDataHrHead["Location"] = reqlocation;
                            $("#sdtxt_rrmhrhead_location").dxTextBox('instance').option('value',reqlocation);
                            reqlocation = $("#sdtxt_rrmhrhead_location").dxTextBox('instance').option('value');
                            IsPassed = 1;

                        }
                        if (requirementDataHrHead.ExperiencerequiredInYrs != experience) {

                            updatedContent += "Experience has been changed from '" + requirementDataHrHead.ExperiencerequiredInYrs + "' to '" + experience + "' \n"
                            requirementDataHrHead["ExperiencerequiredInYrs"] = experience;
                            $("#sdnmb_rrmhrhead_experiencerequired").dxNumberBox('instance').option('value',experience);
                            experience = $("#sdnmb_rrmhrhead_experiencerequired").dxNumberBox('instance').option('value');
                            IsPassed = 1;
                        }
                        if(arraysEqual(RRMHrHeadDetailsForValidations.Interviewers,interviewers) != true){
                          var OldInterviewersList = [];
                          var NewInterviewersList = [];
                          $(RRMHrHeadDetailsForValidations.Interviewers).each(function(idx,obj){
                              $(interviewersData).each(function(idx1,obj1){
                                  if(obj == obj1.EmployeeId){
                                      OldInterviewersList .push(obj1.EmployeeName)
                                  }
                              })
                          });
                          $(interviewers).each(function(idx,obj){
                              $(interviewersData).each(function(idx1,obj1){
                                  if(obj == obj1.EmployeeId){
                                      NewInterviewersList .push(obj1.EmployeeName)
                                  }
                              })
                          })
                          updatedContent += "Interviewer(s) list has been changed from '"+OldInterviewersList.toString().replace(',',', ')+"' to '"+NewInterviewersList.toString().replace(',',', ')+"' \n";
                          RRMHrHeadDetailsForValidations.Interviewers = interviewers;
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
                    _editRRMEntryPointHrHead.saveRRMInterviewers(ResourceRequirementId,joinInterviewerArray)
                    
                    // var resultResorce = PostDataCall(dataResource);
                    // PostDataCallAsync(dataResource, function (resultResorce) {

                    // });

                    var updatedContent = "";
                    var IsPassed = 0;


                    $('.nav-tabs a[href="#rrm_SkillDetailsHrHead"]').tab("show");
                    $(".btnPrevious").show();
                    $(".saveFamilyBtn").hide();
                    $("a.btnNext").show();
                    _editRRMEntryPointHrHead.getSkillsDetails(RRMID);
                }
            }

    }
    if (activeTab == "rrm_skillsTabHrHead") {
      var data = $("#sdgd-rrmHrHeadSkills").dxDataGrid("instance").option("dataSource");

      if (data.length == 0) {
          swal({
              title: "Warning!",
              text: "Please Add Skill  Details",
              icon: "warning",
              button: "ok!",
          })
      }
      else {
          $('.nav-tabs a[href="#rrm_SkillsPlanADetailsHrHead"]').tab("show");
          $("#sd_txtEditorhrhead_skillDetailsPlanA").dxHtmlEditor('instance').option('value',planAcomments);
          $(".btnPrevious").show();
          $(".saveFamilyBtn").hide();
          $("a.btnNext").show();
      }
      $('.nav-tabs a[href="#rrm_SkillsPlanADetailsHrHead"]').tab("show");
    }
    if (activeTab == "rrm_skillsplanaTabHrHead") {
      if (OnHoldByOwnerStatusHrHead == true || OnHoldByClientStatusHrHead == true) {
        $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsHrHead"]').tab("show");
        $("#sd_txtEditorhrhead_skillDetailsPlanB").dxHtmlEditor('instance').option('value',planBcomments)
        $(".btnPrevious").show();
        $(".saveFamilyBtn").hide();
        $("a.btnNext").show();
      }
      else {
        var datecheck = 0;
        var RecruiterA;
        skillDetailsA =  $("#sd_txtEditorhrhead_skillDetailsPlanA").dxHtmlEditor('instance').option('value');
        $("#sd_txtEditorhrhead_skillDetailsPlanA").dxHtmlEditor('instance').option('value',planAcomments);
        toOnBoardA = $("#sd_date_rrmhrhead_tobeonboardplana").dxDateBox('instance').option('value')
        var edate = $("#sd_date_rrmhrhead_tobeonboardplana").dxDateBox('instance').option('value')
        var varEDate = new Date().toISOString().slice(0, 10); //dd-mm-YYYY
        var requirtersA = $("#sd_tag_hrheada_rrmrecruiter").dxTagBox('instance').option("value");
        if ((skillDetailsA == "" || toOnBoardA == "") || datecheck == 1 || requirtersA.length == 0) {

            if (skillDetailsA == "") {
                $('#rrm_skilldetailsplanaHrHeadError').html("Enter Skill Details");
            } else {              
                $('#rrm_skilldetailsplanaHrHeadError').html("");
            }
            if (toOnBoardA == "") {
                $('#rrm_skilldetailsplanaHrHeadError').html("Select Date");
            } else {
                $('#rrm_skilldetailsplanaHrHeadError').html("");
            }
            if (requirtersA.length == 0) {
              $('#rrm_RecruitersplanaHrHeadError').html("Select Recruiter(s)");
            } else {
                $('#rrm_RecruitersplanaHrHeadError').html("");
            }
            $('.nav-tabs a[href="#rrm_SkillsPlanADetailsHrHead"]').tab("show");

            $(".btnPrevious").show();
                $(".saveFamilyBtn").hide();
                $("a.btnNext").show();
        }
        else {
            RRMHrHeadDetailsForValidations.planAcomments = skillDetailsA;
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
                var dataResourceGetSkillId = JSON.stringify({
                  Token: Token,
                  ResourceRequirementId: ResourceRequirementId,
                  SkillPlans: "PlanA",
                  IsActive: "True",
                });
            
                callGetListAsync('GetResourceRequrimentSkillPlans', dataResourceGetSkillId, function (result) {
                  if (result[0] != null && result[0] != undefined) {
                      ResourceRequirementSkillPlanAId = result[0].ResourceRequirementSkillPlanId;
                  }
                  else{
                      ResourceRequirementSkillPlanAId = null
                  }
                  $("#sd_txtEditorhrhead_skillDetailsPlanA").dxHtmlEditor("instance").option("value", planAcomments);
                  requirtersA = $("#sd_tag_hrheada_rrmrecruiter").dxTagBox('instance').option("value");
                  var varEDate = new Date().toISOString().slice(0, 10);
                  if (requirtersA != null) {
                    RRMHrHeadDetailsForValidations.PlanARecruiters = requirtersA
                    var recruiters = requirtersA.toString();
                    dataPlanA_frmrrm_unselected_recruiter = {
                      Method: "PostRRMRecruiters",
                      Data: {
                        Token: Token,
                        ResourceRequirementId: ResourceRequirementId,
                        ResourceRequirementSkillPlanId: ResourceRequirementSkillPlanAId,
                        RecruitersData: recruiters,
                        SkillPlan: "Plan A",
                        IsActive: true,
                      },
                    };
                    PostDataCallAsync(dataPlanA_frmrrm_unselected_recruiter,function (resulPlanBt) {
                          
                    });
                  }
                })
            });    
          
            $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsHrHead"]').tab("show");
            $("#sd_txtEditorhrhead_skillDetailsPlanB").dxHtmlEditor("instance").option("value", planBcomments);
            $(".btnPrevious").show();
            $(".saveFamilyBtn").hide();
            $("a.btnNext").show();
        }
      }
    }

    if (activeTab == "rrm_skillsplanbTabHrHead") {
      if (OnHoldByOwnerStatusHrHead == true || OnHoldByClientStatusHrHead == true) {
        $('.nav-tabs a[href="#rrm_CommentsDetailsHrHead"]').tab("show");
        $(".btnPrevious").show();
        $(".saveFamilyBtn").show();
        _editRRMEntryPointHrHead.getManageCommentHistory(ResourceRequirementId);
        $("a.btnNext").hide();
      }
      else {
        var datecheck = 0;
        var RecruiterB;
        skillDetailsB =  $("#sd_txtEditorhrhead_skillDetailsPlanB").dxHtmlEditor('instance').option('value');
        $("#sd_txtEditorhrhead_skillDetailsPlanB").dxHtmlEditor('instance').option('value',planBcomments);
        toOnBoardB = $("#sd_date_rrmhrhead_tobeonboardplanb").dxDateBox('instance').option('value')
        var edate = $("#sd_date_rrmhrhead_tobeonboardplanb").dxDateBox('instance').option('value')
        var varEDate = new Date().toISOString().slice(0, 10); //dd-mm-YYYY
        var requirtersB = $("#sd_tag_hrheadb_rrmrecruiter").dxTagBox('instance').option("value");
        if ((skillDetailsB == "" || toOnBoardB == "") || datecheck == 1 || requirtersB.length == 0) {

            if (skillDetailsB == "") {
                $('#rrm_skilldetailsplanbHrHeadError').html("Enter Skill Details");
            } else {              
                $('#rrm_skilldetailsplanbHrHeadError').html("");
            }
            if (toOnBoardB == "") {
                $('#rrm_skilldetailsplanbHrHeadError').html("Select Date");
            } else {
                $('#rrm_skilldetailsplanbHrHeadError').html("");
            }
            if (requirtersB.length == 0) {
              $('#rrm_HrHeadsplanbHrHeadError').html("Select Recruiter(s)");
            } else {
                $('#rrm_HrHeadsplanbHrHeadError').html("");
            }
            $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsHrHead"]').tab("show");

            $(".btnPrevious").show();
            $(".saveFamilyBtn").hide();
            $("a.btnNext").show();
        }
        else {
            RRMHrHeadDetailsForValidations.planBcomments = skillDetailsB;
            dataPlanA_frmrrm = {
                "Method": "PostResourceRequrimentSkillPlans",
                "Data": {
                    "Token": Token,
                    "ResourceRequirementId": ResourceRequirementId,
                    "ResourceRequirementSkillPlanId": ResourceRequirementSkillPlanBId,
                    "SkillPlan": 'PlanB',
                    "SkillPlanInfo": skillDetailsB,
                    "ToBeOnBoard": toOnBoardB,
                    //"RecruiterId": RecruiterA,
                    "IsActive": 'True'
                }
            }

            var resulPlanBt = PostDataCall(dataPlanA_frmrrm);
            PostDataCallAsync(dataPlanA_frmrrm, function (resulPlanBt) {
              var dataResourceGetSkillId = JSON.stringify({
                Token: Token,
                ResourceRequirementId: ResourceRequirementId,
                SkillPlans: "PlanB",
                IsActive: "True",
              });
          
              callGetListAsync('GetResourceRequrimentSkillPlans', dataResourceGetSkillId, function (result) {
                if (result[0] != null && result[0] != undefined) {
                    ResourceRequirementSkillPlanBId = result[0].ResourceRequirementSkillPlanId;
                }
                else{
                    ResourceRequirementSkillPlanBId = null
                }
                $("#sd_txtEditorhrhead_skillDetailsPlanA").dxHtmlEditor("instance").option("value", planAcomments);
                requirtersB = $("#sd_tag_hrheadb_rrmrecruiter").dxTagBox('instance').option("value");
                var varEDate = new Date().toISOString().slice(0, 10);
                if (requirtersB != null) {
                  RRMHrHeadDetailsForValidations.PlanBRecruiters = requirtersB
                  var recruiters = requirtersB.toString();
                  dataPlanA_frmrrm_unselected_recruiter = {
                    Method: "PostRRMRecruiters",
                    Data: {
                      Token: Token,
                      ResourceRequirementId: ResourceRequirementId,
                      ResourceRequirementSkillPlanId: ResourceRequirementSkillPlanBId,
                      RecruitersData: recruiters,
                      SkillPlan: "Plan B",
                      IsActive: true,
                    },
                  };
                  PostDataCallAsync(dataPlanA_frmrrm_unselected_recruiter,function (resulPlanBt) {
                    _editRRMEntryPointHrHead.getManageCommentHistory(ResourceRequirementId);
                  });            
                }
              });
            });    
          
            $('.nav-tabs a[href="#rrm_CommentsDetailsHrHead"]').tab("show");
            $(".btnPrevious").show();
            $(".saveFamilyBtn").show();
            _editRRMEntryPointHrHead.getManageCommentHistory(ResourceRequirementId);
            $("a.btnNext").hide();
        }
      }        
    }
    resetSimpleBarRRMEntryPointHrHead();
  };

  _editRRMEntryPointHrHead.btnsendreminder = function (ResourceRequirementId) {
    var Comments = "Please assign a HrHeads for this RRM ";
    dataComments_fromrrm = {
      Method: "PostCommentsInResourceRequirement",
      Data: {
        ResourceRequirementId: ResourceRequirementId,
        Comments: Comments,
        IsActive: "True",
      },
    };
    //  var resultComments = PostDataCall(dataComments_fromrrm);
    PostDataCallAsync(dataComments_fromrrm, function (resultComments) {
      //
    });
    _editRRMEntryPointHrHead.getManageCommentHistory(ResourceRequirementId);
  };

  //bind getrrmbyid values in form
  _editRRMEntryPointHrHead.RRMEntryFromRRM = function (rrmid) {
    RRMID = rrmid;
    ResourceRequirementId = rrmid;
    //var getRRMData = callgetlist('GetRRMbyid','{"IsActive":"True","ResourceRequirementId":"'+rrmid+'","Token":"'+Token+'"}');
    callGetListAsync(
      "GetRRMbyid",
      '{"IsActive":"True","ResourceRequirementId":"' +
        rrmid +
        '","Token":"' +
        Token +
        '"}',
      function (getRRMData) { 
        _editRRMEntryPointHrHead.mapupdaterrmListcomputeHTML(getRRMData); 
      }
    );
  };

  //clear form data
  _editRRMEntryPointHrHead.clearAll = function () {
    $("#rrmnoHrHead").text("");
    $("#sdtxt_rrmhrhead_requirementname").dxTextBox('instance').option('value',"");
    $("#sdtxt_rrmhrhead_requiredfor").dxTextBox('instance').option('value',"");
    $("#rrm_empidHrHead").val("");
    $("#rrm_entrybdeHrHead").val("");
    $("#sdnmb_rrmhrhead_numberofpositions").dxNumberBox('instance').option('value',"");

    $("#sdcmb_rrmhrhead_department").dxSelectBox('instance').option('value',"");
    $("#sdcmb_rrmhrhead_designation").dxSelectBox('instance').option('value',"");
    $("#sdnmb_rrmhrhead_experiencerequired").dxNumberBox('instance').option('value',"");
    $("#sdtxt_rrmhrhead_location").dxTextBox('instance').option('value',"");
    var date = new Date();
    var currentDate = date.toISOString().slice(0, 10);
    $("#sd_date_rrmhrhead_requestedDate").dxDateBox('instance').option('value',currentDate);
    $("#sdtxt_rrmhrhead_requirementlead").dxTextBox('instance').option('value',"");
    $("#rrm_tobeonboardplana").val("");
    //$("#rrm_tobeonboardplanbHrHead").val("");
    var tdydate = new Date();
    tdydate.setDate(tdydate.getDate() + 1);
    var nxtDate = tdydate.toISOString().slice(0, 10);
    $("#sd_date_rrmhrhead_tobeonboardplana")
      .dxDateBox("instance")
      .option("value", nxtDate);

    $("#sd_txtEditor_RRMHRHeadComments")
      .dxHtmlEditor("instance")
      .option("value", "");
    $("#sd_txtEditorhrhead_skillDetailsPlanA")
      .dxHtmlEditor("instance")
      .option("value", "");
    $("#sd_txtEditorhrhead_skillDetailsPlanB")
      .dxHtmlEditor("instance")
      .option("value", "");
  };

  //map update rrm List compute HTML
  _editRRMEntryPointHrHead.mapupdaterrmListcomputeHTML = function (getRRMData) {
    if (getRRMData[0].rrmid == "") {
    } else {
        _editRRMEntryPointHrHead.getResourceRequirementSkillPlanAId();
        _editRRMEntryPointHrHead.getResourceRequirementSkillPlanBId();
      var data;
      var EmployeeId = null;
      var status;
      getRRMData.forEach(function (key, item) {        
        OnHoldByOwnerStatusHrHead = key.OnHoldByOwner;
        OnHoldByClientStatusHrHead = key.OnHoldByClient;
        status = key.Status;
        if(key.OwnerId == localStorage.getItem("EmployeeID")){
          IsOwnerForSkill = true;
        }
        else{
            IsOwnerForSkill = false;
        } 
        $("#rrmStatusHrHead").text(status);
        $("#sdtxt_rrmhrhead_requirementname").dxTextBox('instance').option('value',key.RequirementName);
        $("#sdtxt_rrmhrhead_requiredfor").dxTextBox('instance').option('value',key.RequiredFor);
        $("#rrm_empidHrHead").val(key.EmployeeId);
        $("#sdcmb_rrmhrhead_priority").dxSelectBox('instance').option('value',key.PriorityId);
        RRMHrHeadDetailsForValidations.Priority = key.PriorityId;
        if (key.BDEName != " ") {
          $("#rrm_entrybdeHrHead").val(key.BDEName);
        } else {
          $("#rrm_entrybdeHrHead").val("");
        }
        if (key.RFPId != null && key.RFPId != "") {
          $("#rrm_rfpidHrHead").val(key.RFPId);
          $("#hrheadRFP").show();
      }
      else{
          $("#rrm_rfpidHrHead").val('');
          $("#hrheadRFP").hide();
      }
      if (key.BDEId != null && key.BDEId != "") {
          $("#rrm_entrybdeHrHead").val(key.BDEId);
          $("#hrheadRFP").show();
      }
      else {
          $("#rrm_entrybdeHrHead").val('');
          $("#hrheadRFP").hide();
      }
        $("#sdnmb_rrmhrhead_numberofpositions").dxNumberBox('instance').option('value',key.NumberOfPositions);
        $("#sdcmb_rrmhrhead_communication").dxSelectBox('instance').option('value',key.Communication);
        RRMHrHeadDetailsForValidations.Communication = key.Communication
        $("#sdcmb_rrmhrhead_department").dxSelectBox('instance').option('value',key.DepartmentId);
        $("#sdcmb_rrmhrhead_designation").dxSelectBox('instance').option('value',key.DesignationId);
        $("#sdnmb_rrmhrhead_experiencerequired").dxNumberBox('instance').option('value',key.ExperiencerequiredInYrs);
        RRMHrHeadDetailsForValidations.ExperienceRequired = key.ExperiencerequiredInYrs;
        $("#sdtxt_rrmhrhead_location").dxTextBox('instance').option('value',key.Location);
        $("#sdchk_rrmhrhead_leadApproval").dxCheckBox('instance').option('value',key.LeadApproval);
        var edate = key.RequestedDate;
        if (edate != null) {
          var ed = edate;
          $("#sd_date_rrmhrhead_requestedDate").dxDateBox('instance').option('value',ed);
        }
        if (ResourceRequirementType_hrhead == "G") {
          $("#sdtxt_rrmhrhead_requirementlead").dxTextBox('instance').option('value',key.Owner);
        } else if (ResourceRequirementType_hrhead == "P") {
          $("#sdtxt_rrmhrhead_requirementlead").dxTextBox('instance').option('value',key.Owner);
        } else if (ResourceRequirementType_hrhead == "R") {
          $("#sdtxt_rrmhrhead_requirementlead").dxTextBox('instance').option('value',key.LeadName);
        }
        $("#sdchk_rrmhrhead_losingRevenue").dxCheckBox('instance').option('value',key.LosingRevenue);
        $("#sdchk_rrmhrhead_fromVIP").dxCheckBox('instance').option('value',key.VIP);

        var RequirmentLead_hrhead = $("#sdtxt_rrmhrhead_requirementlead").dxTextBox('instance').option('value'); 
        if(LoggedUser == RequirmentLead_hrhead){
              $("#RRMEntryPointHrHeadTypeDetails").removeClass("label label-default m-l-xs");
              $("#RRMEntryPointHrHeadTypeDetails").html("Owner").addClass("label label-warning m-l-xs");
          }
          else{
              $("#RRMEntryPointHrHeadTypeDetails").removeClass("label label-warning m-l-xs");
              $("#RRMEntryPointHrHeadTypeDetails").html("View Only").addClass("label label-default m-l-xs");;
          }

          if(LoggedUser == RequirmentLead_hrhead){
            $("#rrmmodelpagetitleHrHead").text("Edit RRM - " + key.RRMNo);
          }
          else
          {
            $("#rrmmodelpagetitleHrHead").text("View RRM - " + key.RRMNo);
          }

        if (LoggedUser == RequirmentLead_hrhead && (OnHoldByOwnerStatusHrHead == false || OnHoldByClientStatusHrHead == false)) {
            $("#sdcmb_rrmhrhead_priority").dxSelectBox('instance').option('readOnly',true);
            $("#sdcmb_rrmhrhead_department").dxSelectBox('instance').option('readOnly',true);
            $("#sdnmb_rrmhrhead_experiencerequired").dxNumberBox('instance').option('readOnly',false);
            $("#sdcmb_rrmhrhead_communication").dxSelectBox('instance').option('readOnly',false);
            $("#sdtxt_rrmhrhead_location").dxTextBox('instance').option('readOnly',true);
            $("#sdtag_rrmhrhead_intervierwers").dxTagBox('instance').option('readOnly',false);
            $("#sd_txtEditorhrhead_skillDetailsPlanA").dxHtmlEditor('instance').option('readOnly',false);
            $("#sd_txtEditorhrhead_skillDetailsPlanB").dxHtmlEditor('instance').option('readOnly',false); 
            $("#sd_tag_hrheada_rrmrecruiter").dxTagBox('instance').option('readOnly',false);
            $("#sd_tag_hrheadb_rrmrecruiter").dxTagBox('instance').option('readOnly',false);
            //allow User to click reminder btn
            if (key.PlanARecruiters == null) {
                $("#hidereminder").show();
            }
            if (key.PlanBRecruiters == null) {
                $("#hidereminderplanB").show();
            }
        }   
        else {
            $("#sdcmb_rrmhrhead_priority").dxSelectBox('instance').option('readOnly',true);
            $("#sdcmb_rrmhrhead_department").dxSelectBox('instance').option('readOnly',true);
            $("#sdnmb_rrmhrhead_experiencerequired").dxNumberBox('instance').option('readOnly',true);
            $("#sdcmb_rrmhrhead_communication").dxSelectBox('instance').option('readOnly',true);
            $("#sdtxt_rrmhrhead_location").dxTextBox('instance').option('readOnly',true);
            $("#sdtag_rrmhrhead_intervierwers").dxTagBox('instance').option('readOnly',true);
            $("#sd_txtEditorhrhead_skillDetailsPlanA").dxHtmlEditor('instance').option('readOnly',true);
            $("#sd_txtEditorhrhead_skillDetailsPlanB").dxHtmlEditor('instance').option('readOnly',true);
            $("#sd_tag_hrheada_rrmrecruiter").dxTagBox('instance').option('readOnly',false);
            $("#sd_tag_hrheadb_rrmrecruiter").dxTagBox('instance').option('readOnly',false);
        }  
        if (OnHoldByClientStatusHrHead == true || OnHoldByOwnerStatusHrHead == true) {
            readOnlyFormDataHrHead();
            IsOwnerForSkill = false;
            $("#OwnerrrmHoldStatushrhead").html("On-Hold").addClass("label label-warning m-l-xs");
            if (OnHoldByOwnerStatusHrHead == true) {
              $("#switchLeadHrHead").dxSwitch({
                value: true,
                disabled: true,
              });
            }
            if (OnHoldByClientStatusHrHead == true) {
              $("#switchClientHrHead").dxSwitch({
                value: true,
                disabled: true,
              });
            }
        } else {
          $("#OwnerrrmHoldStatushrhead").attr("class", "");
          $("#OwnerrrmHoldStatushrhead").html("");
          $("#switchClient").dxSwitch({
            value: false,
            disabled: false,
          });
          $("#switchLead").dxSwitch({
            value: false,
            disabled: false,
          });
        }
        $("#sdnmb_rrmhrhead_numberofpositions").dxNumberBox('instance').option('value',getRRMData[0].NumberOfPositions);
        planAcomments = key["PlanA-SkillPlanInfo"];
        RRMHrHeadDetailsForValidations.planAcomments = planAcomments;
        $("#sd_txtEditorhrhead_skillDetailsPlanA").dxHtmlEditor('instance').option('value',planAcomments);
        planBcomments = key["PlanB-SkillPlanInfo"];
        RRMHrHeadDetailsForValidations.planBcomments = planBcomments;
        $("#sd_txtEditorhrhead_skillDetailsPlanB").dxHtmlEditor('instance').option('value',planBcomments);
        hrComments = key.Comments;
        if(key['PlanA-OnBoardDate'] != null && key['PlanA-OnBoardDate'] != "" && key['PlanA-OnBoardDate']!= undefined){
          $("#sd_date_rrmhrhead_tobeonboardplana").dxDateBox('instance').option('value',key['PlanA-OnBoardDate']);
          $("#sd_date_rrmhrhead_tobeonboardplana").dxDateBox('instance').option('readOnly',true);
      }           
      else{
          $("#sd_date_rrmhrhead_tobeonboardplana").dxDateBox('instance').option('readOnly',false);
      }
      if(key['PlanB-OnBoardDate'] != null && key['PlanB-OnBoardDate'] != "" && key['PlanB-OnBoardDate']!= undefined){
          $("#sd_date_rrmhrhead_tobeonboardplanb").dxDateBox('instance').option('value',key['PlanB-OnBoardDate']);
          $("#sd_date_rrmhrhead_tobeonboardplanb").dxDateBox('instance').option('readOnly',true);
      }
      else{
          $("#sd_date_rrmhrhead_tobeonboardplanb").dxDateBox('instance').option('readOnly',false);
      }       
        setTimeout(function(){ 
          planARecruitersTag = [];
          if(key.PlanARecruiters != null){
            planARecruitersTag = key.PlanARecruitersId.split(",");
            $(planARecruitersTag).each(function(idx,obj){
              planARecruitersTag[idx] = planARecruitersTag[idx].trim();
            });
            $("#sd_tag_hrheada_rrmrecruiter").dxTagBox('instance').option('value',planARecruitersTag);
            RRMHrHeadDetailsForValidations.PlanARecruiters = planARecruitersTag
          }  
          else{
            planARecruitersTag = [];
            $("#sd_tag_hrheada_rrmrecruiter").dxTagBox('instance').option('value',planARecruitersTag);
            RRMHrHeadDetailsForValidations.PlanARecruiters = planARecruitersTag
          } 
          planBRecruitersTag = [];     
          if(key.PlanBRecruiters != null){
              planBRecruitersTag = key.PlanBRecruitersId.split(","); 
              $(planBRecruitersTag).each(function(idx,obj){
                planBRecruitersTag[idx] = planBRecruitersTag[idx].trim();
              });
              $("#sd_tag_hrheadb_rrmrecruiter").dxTagBox('instance').option('value',planBRecruitersTag);  
              RRMHrHeadDetailsForValidations.PlanBRecruiters = planBRecruitersTag
          }     
          else{
            planBRecruitersTag = [];
            $("#sd_tag_hrheadb_rrmrecruiter").dxTagBox('instance').option('value',planBRecruitersTag);
            RRMHrHeadDetailsForValidations.PlanBRecruiters = planBRecruitersTag
          }            
        }, 100);   
        $("#sd_txtEditor_RRMHRHeadComments").dxHtmlEditor("instance").option("value",'');
        requirementDataHrHead["PriorityId"] = key.PriorityId;
        requirementDataHrHead["Communication"] = key.Communication;
        requirementDataHrHead["Location"] = key.Location;
        requirementDataHrHead["ExperiencerequiredInYrs"] = key.ExperiencerequiredInYrs;
      });
    }
    _editRRMEntryPointHrHead.getResourceRequirementSkillPlanAId();
    _editRRMEntryPointHrHead.getResourceRequirementSkillPlanBId();
  };

  //To get Resource RequirementSkill PlanB Id
  _editRRMEntryPointHrHead.getResourceRequirementSkillPlanAId = function () {
    var dataResourceGetSkillId = JSON.stringify({
      Token: Token,
      ResourceRequirementId: ResourceRequirementId,
      SkillPlans: "PlanA",
      IsActive: "True",
    });

    callGetListAsync('GetResourceRequrimentSkillPlans', dataResourceGetSkillId, function (result) {
      if (result[0] != null && result[0] != undefined) {
          ResourceRequirementSkillPlanAId = result[0].ResourceRequirementSkillPlanId;
      }
      else{
          ResourceRequirementSkillPlanAId = null
      }
    })
  };
  //To get Resource RequirementSkill PlanB Id
  _editRRMEntryPointHrHead.getResourceRequirementSkillPlanBId = function () {
    var dataResourceGetSkillId = JSON.stringify({
      Token: Token,
      ResourceRequirementId: ResourceRequirementId,
      SkillPlans: "PlanB",
      IsActive: "True",
    });

    callGetListAsync('GetResourceRequrimentSkillPlans', dataResourceGetSkillId, function (result) {
      if (result[0] != null && result[0] != undefined) {
          ResourceRequirementSkillPlanBId = result[0].ResourceRequirementSkillPlanId;
      }
      else{
          ResourceRequirementSkillPlanBId = null
      }
  })
  };
  //skill mapping
  _editRRMEntryPointHrHead.skillcomputeHTML = function (e) {
    var html = "";
    if (e == null || e == "") {
      html = "<table id='myTable' class='skillemptytbl myTable_rrm HrHead'>";
      html += "<tr>";
      html += "<th>Family</th>";
      html += "<th>Skills</th>";
      html += "<th>Version</th>";
      html += "<th>Action</th>";
      html += "</tr>";
      html += "<tr><td colspan='4'>No Data..!</td></tr>";
    } else {
      var html = "<table id='myTable' class='myTable_rrm HrHead'>";
      html += "<tr>";
      html += "<th>Family</th>";
      html += "<th>Skills</th>";
      html += "<th>Version</th>";
      html += "<th>Action</th>";
      html += "</tr>";
      e.forEach(function (key, item) {
        var skillId = key.ResourceRequirementSkillId;
        html += "<tr class='row_" + item + "' id='row_" + skillId + "'>";
        html +=
          "<td><input type='hidden' class='family' value='" +
          key.SkillFamily +
          "'> " +
          key.SkillFamily +
          "</td>";
        html +=
          "<td><input type='hidden' class='skill_type' value='" +
          key.Skill +
          "'>" +
          key.Skill +
          "</td>";
        html +=
          "<td><input type='hidden' class='version' value='" +
          key.SkillVersion +
          "'>" +
          key.SkillVersion +
          "</td>";
        html +=
          "<td><button class='btn edit-btn' id='editskillHrHead' onclick=editRow_SkillMapping('" +
          skillId +
          "')><i class='fas fa-pencil-alt'></i></button>";
        html +=
          "<button class='btn delete-btn' id='deleteskillHrHead' onclick=_editRRMEntryPointHrHead.deleteRow_SkillMapping('" +
          skillId +
          "')><i class='fas fa-trash-alt'></i></button></td>";
        html += "</tr>";
      });
    }
    return html;
  };

  //tab previous btn evenet
  _editRRMEntryPointHrHead.toggleTabRRMEntryPrevious = function () {
    var activeTab = $("#rrmtabHrHead").find("li.active").attr("id");

    if (activeTab == "rrm_skillsplanaTabHrHead") {
      $('.nav-tabs a[href="#rrm_SkillDetailsHrHead"]').tab("show");
      $("a.btnNext").show();
      $(".saveFamilyBtn").hide();
    }

    if (activeTab == "rrm_skillsTabHrHead") {
      $('.nav-tabs a[href="#rrm_RequirementDetailsHrHead"]').tab("show");
      $("a.btnNext").show();
      $(".saveFamilyBtn").hide();
      $(".btnPrevious").hide();
    }

    if (activeTab == "rrm_skillsplanbTabHrHead") {
      $('.nav-tabs a[href="#rrm_SkillsPlanADetailsHrHead"]').tab("show");
      $("a.btnNext").show();
      $(".btnPrevious").show();
      $(".saveFamilyBtn").hide();
    }

    if (activeTab == "rrm_commentsHrHeadTabHrHead") {
     
      $(".saveFamilyBtn").hide();
      {
        $("a.btnNext").hide();
      }

      $(".btnPrevious").show();
      $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsHrHead"]').tab("show");
      $("a.btnNext").show();
    }
    resetSimpleBarRRMEntryPointHrHead();
  };

  // get rrm detials by id
  _editRRMEntryPointHrHead.updateresourcerequitementdata = function () {
    //var getRRMData = callgetlist('GetRRMbyid','{"IsActive":"True","ResourceRequirementId":"'+ResourceRequirementId+'","Token":"'+Token+'"}');
    callGetListAsync(
      "GetRRMbyid",
      '{"IsActive":"True","ResourceRequirementId":"' +
        ResourceRequirementId +
        '","Token":"' +
        Token +
        '"}',
      function (getRRMData) {
        _editRRMEntryPointHrHead.mapupdateaddrrmListcomputeHTML(getRRMData);
      }
    );
  };
  //bind rrm data from _addRRMEntryPoint.updateresourcerequitementdata function result
  _editRRMEntryPointHrHead.mapupdateaddrrmListcomputeHTML = function (
    getRRMData
  ) {
    if (getRRMData[0].rrmid == "") {
    } else {
      var data;
      getRRMData.forEach(function (key, item) {
        $("#sdtxt_rrmhrhead_requirementname").dxTextBox('instance').option('value',key.RequirementName);
        $("#sdtxt_rrmhrhead_requiredfor").dxTextBox('instance').option('value',key.RequiredFor);
        $("#rrm_empidHrHead").val(key.RequirementName);
        $("#rrm_entrybdeHrHead").val(key.BDEName);
        $("#sdnmb_rrmhrhead_numberofpositions").dxNumberBox('instance').option('value',key.NumberOfPositions);

        $("#sdcmb_rrmhrhead_department").dxSelectBox('instance').option('value',key.DepartmentId);
        $("#sdnmb_rrmhrhead_experiencerequired").dxNumberBox('instance').option('value',key.ExperiencerequiredInYrs);
        $("#sdtxt_rrmhrhead_location").dxTextBox('instance').option('value',key.Location);
        var edate = key.RequestedDate;
        if (edate != null) {
          var ed = edate;
          $("#sd_date_rrmhrhead_requestedDate").dxDateBox('instance').option('value',ed);
        }
        $("#sdtxt_rrmhrhead_requirementlead").dxTextBox('instance').option('value',key.LeadName);
      });
    }
  };

  //save hr commnets
  _editRRMEntryPointHrHead.saveComments = function () {
    var finalComments = $("#sd_txtEditor_RRMHRHeadComments")
      .dxHtmlEditor("instance")
      .option("value");
    if (finalComments != "") {
      dataComments = {
        Method: "PostCommentsInResourceRequirement",
        Data: {
          ResourceRequirementId: ResourceRequirementId,
          Comments: finalComments,
          IsActive: "True",
        },
      };
      //var resultComments = PostDataCall(dataComments);
      PostDataCallAsync(dataComments, function (resultComments) {
        swal({
          title: "Success!",
          text: "Saved Successfully!",
          icon: "success",
          button: "ok!",
        });
      });
    }
    $("#RRMEntryPointModelHrHead").modal("hide");
    ResourceRequirementId = null;
    var rrmEntryGrid = RRMEntryPointGridHrHead("HrHead");
    rrmEntryGrid.getRRMEntryTable();
    $("#rrmGridReportHrHead").dxDataGrid('instance').refresh();
    _editRRMEntryPointHrHead.clearAll();
    $("#rrm_SkillsPlanADetailsHrHead").modal("hide");
  };

  //get skill details
  _editRRMEntryPointHrHead.getSkillsDetails = function (ResourceRequrimentId) {
    var filterData = JSON.stringify({
      "ResourceRequirementId": ResourceRequrimentId,
      "IsActive": "True",
      "Token": Token
  });        

  callGetListAsync('GetResourceRequrirementSkill', filterData, function (e) {
      GetSkillList = e;

      $("#sdgd-rrmHrHeadSkills").dxDataGrid({
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
            _editRRMEntryPointHrHead.insert_SkillInfoEntry(e);
          },
          onRowUpdated: function (e) {
            _editRRMEntryPointHrHead.update_SkillInfoEntry(e);
          },
          onRowRemoved: function (e) {
            _editRRMEntryPointHrHead.delete_SkillInfoEntry(e);
          }
      });
  });
  };

  //get Manage Comment History
  _editRRMEntryPointHrHead.getManageCommentHistory = function (
    ResourceRequirementId
  ) {
    var filter_val = JSON.stringify({
      ResourceRequirementId: ResourceRequirementId,
      IsActive: "True",
      Token: Token,
    });
    // var getManageplanComments = callgetlist("GetCommentsInResourceRequirement", filter_val);
    callGetListAsync(
      "GetCommentsInResourceRequirement",
      filter_val,
      function (getManageplanComments) {
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
        $("#rrm_manage_plan_comments_documents_HrHead").show();
        $("#rrm_manage_plan_comments_documents_HrHead").html(plan_comment_history_html);
        var div = document.getElementById('rrm_manage_plan_comments_documents_HrHead');
        div.scrollTop = div.scrollHeight - div.clientHeight;
      }
    );
  };

  //skill data clear func
  _editRRMEntryPointHrHead.skillsClearAndShow = function () {
    // Clear our fields

    $("skillentry").value = "";
    $("skillversionentryHrHead").value = "";

    // document.getElementById("skillentry").value = "";
    // document.getElementById("skillversionentryHrHead").value = "";

    // document.getElementById("skillentry").value = "";
    // document.getElementById("skillversionentryHrHead").value = "";

    // document.getElementById("familyentry_fromrfp").value = "";
    // document.getElementById("skillentry_fromrfp").value = "";
    // document.getElementById("skillversionentryHrHead_fromrfp").value = "";

    // document.getElementById("familyentry_fromresign").value = "";
    // document.getElementById("skillentry_fromresign").value = "";
    // document.getElementById("skillversionentryHrHead_fromresign").value = "";
  };

  //get versions entry
  _editRRMEntryPointHrHead.get_versionsentry = function (skillentry_id) {
    var skillentry_id = skillentry_id;
    var filter_val = JSON.stringify({
      SkillId: skillentry_id,
    });
    // var result = callgetlist('GetSkillVersions', filter_val);
    callGetListAsync("GetSkillVersions", filter_val, function (result) {
      var options = "<option value=''>Select Skill Version</option>";
      for (var i = 0; i < result.length; i++) {
        options +=
          "<option value='" +
          result[i].Id +
          "'>" +
          result[i].Name +
          "</option>";
      }
      $("#skillversionentryHrHead").html(options);
    });
  };

  //get skill entry
  _editRRMEntryPointHrHead.get_skillsentry = function (familyentry_id) {
    var familyentry_id = familyentry_id;
    var filter_val = JSON.stringify({
      FamilyId: familyentry_id,
    });
    //var result = callgetlist('GetSkills', filter_val);
    callGetListAsync("GetSkills", filter_val, function (result) {
      var options = "<option value=''>Select Skills</option>";
      for (var i = 0; i < result.length; i++) {
        options +=
          "<option value='" +
          result[i].Id +
          "'>" +
          result[i].Name +
          "</option>";
      }
      $("#skillentry").html(options);
      get_versionsentry("");
    });
  };

  _editRRMEntryPointHrHead.insert_SkillInfoEntry = function (e) {
        
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
          _editRRMEntryPointHrHead.skillsClearAndShow();
          _editRRMEntryPointHrHead.getSkillsDetails(RRMID);
        }
    });
  }

  _editRRMEntryPointHrHead.update_SkillInfoEntry = function (e) {
      
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
            _editRRMEntryPointHrHead.skillsClearAndShow();
            _editRRMEntryPointHrHead.getSkillsDetails(RRMID);
          }
      });       

  }

  _editRRMEntryPointHrHead.delete_SkillInfoEntry = function (e) {
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
            _editRRMEntryPointHrHead.skillsClearAndShow();
            _editRRMEntryPointHrHead.getSkillsDetails(RRMID);
          }                    
      });   
  }

  _editRRMEntryPointHrHead.saveRRMInterviewers = function (ResourceRequirementIdParam,EmployeeIds) {
    if(EmployeeIds == undefined || EmployeeIds == null || EmployeeIds == ""){
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

  _editRRMEntryPointHrHead.CloneEntryFromRRM = function (rrmid) {
      callGetListAsync('GetRRMbyid', '{"IsActive":"True","ResourceRequirementId":"' + rrmid + '","Token":"' + Token + '"}', function (getRRMData) {
        _editRRMEntryPointHrHead.mapclonerrmListcomputeHTML(getRRMData,rrmid);
      })
  }

  _editRRMEntryPointHrHead.mapclonerrmListcomputeHTML = function (getRRMData,rrmid) {
      
      if (getRRMData[0].rrmid == "") {

      }
      else {                                                                                                                                                                                                                                                                                                                                                                                                  
          getRRMData.forEach(function (key, item) {               
              $("#sdtxt_rrmhrhead_requirementname").dxTextBox('instance').option('value',key.RequirementName);
              $("#sdtxt_rrmhrhead_requiredfor").dxTextBox('instance').option('value',key.RequiredFor);
              $("#sdcmb_rrmhrhead_priority").dxSelectBox('instance').option('value',key.PriorityId);
              if (key.PriorityId != "") {
                  $("#sdcmb_rrmhrhead_priority").dxSelectBox('instance').option('value',key.PriorityId);
              }
              if (key.BDEName != " ") {
                  $("#rrm_entrybdeHrHead").val(key.BDEName);
              }
              else {
                  $("#rrm_entrybdeHrHead").val('');
              }
              $("#sdnmb_rrmhrhead_numberofpositions").dxNumberBox('instance').option('value',key.NumberOfPositions);
              $("#sdcmb_rrmhrhead_communication").dxSelectBox('instance').option('value',key.Communication);
              if (key.Communication != "") {
                  $("#sdcmb_rrmhrhead_communication").dxSelectBox('instance').option('value',key.Communication);
              }

              $("#sdcmb_rrmhrhead_department").dxSelectBox('instance').option('value',key.DepartmentId);
              $("#sdcmb_rrmhrhead_designation").dxSelectBox('instance').option('value',key.DesignationId);
              $("#sdnmb_rrmhrhead_experiencerequired").dxNumberBox('instance').option('value',key.ExperiencerequiredInYrs);
              $("#sdtxt_rrmhrhead_location").dxTextBox('instance').option('value',key.Location);
              if (key.Location != "") {
                  $("#sdtxt_rrmhrhead_location").dxTextBox('instance').option('value',key.Location);
              }
              
              $("#sdnmb_rrmhrhead_numberofpositions").dxNumberBox('instance').option('value',getRRMData[0].NumberOfPositions);
              planAcomments = key['PlanA-SkillPlanInfo'];
              $("#sd_txtEditorhrhead_skillDetailsPlanA").dxHtmlEditor('instance').option('value',planAcomments);

              planBcomments = key['PlanB-SkillPlanInfo'];       
              $("#sd_txtEditorhrhead_skillDetailsPlanB").dxHtmlEditor('instance').option('value',planBcomments);                 
              IsOwnerForSkill = true;             
          });
      }        
  }

  return _editRRMEntryPointHrHead;
};
