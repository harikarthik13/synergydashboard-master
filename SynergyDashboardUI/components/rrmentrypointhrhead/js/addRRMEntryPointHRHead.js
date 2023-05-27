AddRRMEntryPointHrHead = function () {
  var _addRRMEntryPointHrHead = {};
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

  function mapUI() {
    $rrmtab = $("#rrmtab");
  
      ($rrm_entrybdeHrHead = $("#rrm_entrybdeHrHead")),
      ($rrm_empidHrHead = $("#rrm_empidHrHead")),
      ($rrm_replacementHrHead = $("#rrm_replacementHrHead")),
      ($rrm_experiencerequired = $("#rrm_experiencerequired")),
      ($rrm_requirementlead = $("#rrm_requirementlead"));
    // $rrm_skilldetailsplanaHrHead = $("#rrm_skilldetailsplanaHrHead"),
    //$rrm_skilldetailsplanbHrHead = $("#rrm_skilldetailsplanbHrHead"),
    //$rrm_commentsHrHead = $("#rrm_commentsHrHead")
  }

  //save hr commnents once save&close btn clicked
  _addRRMEntryPointHrHead.saveComments = function () {
    var finalComments = $("#sd_txtEditor_RRMHRHeadComments")
      .dxHtmlEditor("instance")
      .option("value");
    if (finalComments == "") {
        swal({
        title: "Success!",
        text: "Saved Successfully!",
        icon: "success",
        button: "ok!",
      });
    } else {
      dataComments = {
        Method: "PostCommentsInResourceRequirement",
        Data: {
          ResourceRequirementId: ResourceRequirementId,
          Comments: finalComments,
          IsActive: "True",
        },
      };

      PostDataCallAsync(dataComments, function (e) {
        resultComments = e;
        swal({
          title: "Success!",
          text: "Saved Successfully!",
          icon: "success",
          button: "ok!",
        });
      });
    }

    ResourceRequirementSkillPlanId = null;
    ResourceRequirementId = null;
    $("#RRMEntryPointModelHrHead").modal("hide");
    var rrmEntryGrid = RRMEntryPointGridHrHead("HrHead");
    rrmEntryGrid.getRRMEntryTable();
    $("#rrmGridReportHrHead").dxDataGrid('instance').refresh();
    _addRRMEntryPointHrHead.clearAll_addrrmdata();
  };

  //tab next button event (rrmentry->skills->planA->planB->commnets)
  _addRRMEntryPointHrHead.toggleTabRRMEntry = function () {

    var comments = $("#sd_txtEditor_RRMHRHeadComments")
      .dxHtmlEditor("instance")
      .option("value");
    var activeTab = $("#rrmtabHrHead").find("li.active").attr("id");

    if (activeTab == "rrm_requirementTabHrHead") {
      requirmentName = $("#sdtxt_rrmhrhead_requirementname").dxTextBox('instance').option('value');
      requireFor = $("#sdtxt_rrmhrhead_requiredfor").dxTextBox('instance').option('value');
      bde = $("#rrm_entrybdeHrHead").val();
      if (bde == "") {
        bde = null;
      }
      EmployeeId = $("#rrm_empidHrHead").val();
      if (EmployeeId == "") {
        EmployeeId = null;
      }
      replacementFor = $("#rrm_replacementHrHead").val();
      position = $("#sdnmb_rrmhrhead_numberofpositions").dxNumberBox('instance').option('value');
      priority = $("#sdcmb_rrmhrhead_priority").dxSelectBox('instance').option('value');
      department = $("#sdcmb_rrmhrhead_department").dxSelectBox('instance').option('value');
      designation = $("#sdcmb_rrmhrhead_designation").dxSelectBox('instance').option('value');
      experience = $("#sdnmb_rrmhrhead_experiencerequired").dxNumberBox('instance').option('value');
      interviewers = $("#sdtag_rrmhrhead_intervierwers").dxTagBox('instance').option('value');
      communication = $("#sdcmb_rrmhrhead_communication").dxSelectBox('instance').option('value');
      reqlocation = $("#sdtxt_rrmhrhead_location").dxTextBox('instance').option('value');
      if (reqlocation == "") {
        reqlocation = null;
      }
      if (ResourceRequirementId == "" || ResourceRequirementId == undefined) {
        ResourceRequirementId = null;
      }
      requestedDate = $("#sd_date_rrmhrhead_requestedDate").dxDateBox('instance').option('value');
      losingRevenue = $("#sdchk_rrmhrhead_losingRevenue").dxCheckBox('instance').option('value');
      fromVIP = $("#sdchk_rrmhrhead_fromVIP").dxCheckBox('instance').option('value');
      requirmentLead = $("rrm_requirementlead").val();
      leadApproval = $("#sdchk_rrmhrhead_leadApproval").dxCheckBox('instance').option('value');
      var finalRequestedDate = moment(requestedDate).format("DD-MM-YYYY");
      var getInterviewerMultipleArry = $("#sdtag_rrmhrhead_intervierwers").dxTagBox('instance').option('value');
      var joinInterviewerArray = "";
      $.each(getInterviewerMultipleArry, function (index, val) {
          joinInterviewerArray += val + ",";
      });
      joinInterviewerArray = joinInterviewerArray.replace(/,\s*$/, "");
      if (
        requirmentName.trim() == "" ||
        requireFor.trim() == "" ||
        position == "" ||
        position == "0" ||
        department == "" ||
        designation == "" ||
        experience == "" ||
        experience == "0" ||
        interviewers.length == 0
      ) {
        if (requirmentName.trim() == "") {
          $("#sdtxt_rrmhrhead_requirementname").addClass("input-error");
          $("#rrm_requirementnameHrHeadError").html("Enter Requirment Name");
        } else {
          $("#sdtxt_rrmhrhead_requirementname").removeClass("input-error");
          $("#rrm_requirementnameHrHeadError").html("");
        }
        if (requireFor.trim() == "") {
          $("#sdtxt_rrmhrhead_requiredfor").addClass("input-error");
          $("#rrm_requiredforHrHeadError").html("Enter Required For");
        } else {
          $("#sdtxt_rrmhrhead_requiredfor").removeClass("input-error");
          $("#rrm_requiredforHrHeadError").html("");
        }
        if (position == "" || position == "0") {
          if (position == "") {
            if (position == "") {
              $("#sdnmb_rrmhrhead_numberofpositions").addClass("input-error");
              $("#rrm_numberofpositionsHrHeadError").html("Enter Position");
            } else {
              $("#sdnmb_rrmhrhead_numberofpositions").removeClass("input-error");
              $("#rrm_numberofpositionsHrHeadError").html("");
            }
          }
          if (position == "0") {
            if (position == "0") {
              $("#sdnmb_rrmhrhead_numberofpositions").addClass("input-error");
              $("#rrm_numberofpositionsHrHeadError").html("Min Position is 1");
            } else {
              $("#sdnmb_rrmhrhead_numberofpositions").removeClass("input-error");
              $("#rrm_numberofpositionsHrHeadError").html("");
            }
          }
        }
        if (department == "") {
          $("#sdcmb_rrmhrhead_department").addClass("input-error");
          $("#rrm_departmentHrHeadError").html("Select Department");
        } else {
          $("#sdcmb_rrmhrhead_department").removeClass("input-error");
          $("#rrm_departmentHrHeadError").html("");
        }
        if (designation == "") {
          $("#sdcmb_rrmhrhead_designation").addClass("input-error");
          $("#rrm_designationHrHeadError").html("Select Designation");
        } else {
          $("#sdcmb_rrmhrhead_designation").removeClass("input-error");
          $("#rrm_designationHrHeadError").html("");
        }
        if (experience == "" || experience == "0") {
          if (experience == "") {
            if (experience == "") {
              $("#rrm_experiencerequired").addClass("input-error");
              $("#rrm_experiencerequiredHrHeadError").html("Select Experience");
            } else {
              $("#rrm_experiencerequired").removeClass("input-error");
              $("#rrm_experiencerequiredHrHeadError").html("");
            }
          }
          if (experience == "0") {
            if (experience == "0") {
              $("#rrm_experiencerequired").addClass("input-error");
              $("#rrm_experiencerequiredHrHeadError").html("Min Experience is 1");
            } else {
              $("#rrm_experiencerequired").removeClass("input-error");
              $("#rrm_experiencerequiredHrHeadError").html("");
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
        if (!IsRrmSaved) {
          $(".saveFamilyBtn").hide();
          $("a.btnNext").show();
        }
      } else {
        dataResource = {
          Method: "PostResourceRequirement",
          Data: {
            Token: Token,
            RequirementName: requirmentName,
            ResourceRequirementId: ResourceRequirementId,
            ResourceRequirementTypeId: null,
            RequiredFor: requireFor,
            //"RequestForProposalId": null,
            BDEId: bde,
            RequestForProposalId: EmployeeId,
            ReplacementEmployeeId: replacementFor,
            NumberOfPositions: position,
            PriorityId: priority,
            DepartmentId: department,
            DesignationId: designation,
            ExperiencerequiredInYrs: experience,
            CommunicationId: communication,
            LocationId: reqlocation,
            RequestedDate: requestedDate,
            LosingRevenue: losingRevenue,
            VIP: fromVIP,
            LeadId: BackupLeadId,
            ResignedEmployeeId: EmployeeId,
            leadApproval:leadApproval,
            IsActive: "true",
          },
        };

        //var resultResorce = PostDataCall(dataResource);
        PostDataCallAsync(dataResource, function (resultResorce) {
          if (ResourceRequirementId == null) {
            ResourceRequirementId = resultResorce.Data[0].ResourceRequirementId;
            _addRRMEntryPointHrHead.saveRRMInterviewers(ResourceRequirementId,joinInterviewerArray)
            if(IsRRMHrHeadForClone == true){
              _addRRMEntryPointHrHead.saveSkillsDetailsForClone(ResourceRequirementId,ClonedRRMHrHeadId);
            }   
          }
        });
        $('.nav-tabs a[href="#rrm_SkillDetailsHrHead"]').tab("show");
        $(".btnPrevious").show();
        if (!IsRrmSaved) {
          $(".saveFamilyBtn").hide();
          $("a.btnNext").show();
        }
        if(IsRRMHrHeadForClone != true){
          _addRRMEntryPointHrHead.getSkillsDetails();
        }
      }
    }
    //$(".btnPrevious").show();
    if (!IsRrmSaved) {
      $(".saveFamilyBtn").hide();
      $("a.btnNext").show();

      if (activeTab == "rrm_skillsTabHrHead") {
        var data = $("#sdgd-rrmHrHeadSkills").dxDataGrid("instance").option("dataSource");
        if (data.length == 0) {
          swal({
            title: "Warning!",
            text: "Please Add Skill  Details",
            icon: "warning",
            button: "ok!",
          });
        } else {
          $('.nav-tabs a[href="#rrm_SkillsPlanADetailsHrHead"]').tab("show");
          $(".btnPrevious").show();
          if (!IsRrmSaved) {
            $(".saveFamilyBtn").hide();
            $("a.btnNext").show();
          }
        }
      }

      if (activeTab == "rrm_skillsplanaTabHrHead") {
        var datecheck = 0;
        var RecruiterA;
        skillDetailsA = $("#sd_txtEditorhrhead_skillDetailsPlanA")
          .dxHtmlEditor("instance")
          .option("value");

        toOnBoardA = $("#sd_date_rrmhrhead_tobeonboardplana")
          .dxDateBox("instance")
          .option("value");        

        if (toOnBoardA <= varEDate) {
          datecheck = 1;
          swal({
            title: "Warning!",
            text:
              "Please enter valid Date current and previous date should not be selected",
            icon: "warning",
            button: "ok!",
          });
        }

        if (skillDetailsA == "" || toOnBoardA == "" || datecheck == 1) {
          if (skillDetailsA == "") {
            $("#sd_txtEditorhrhead_skillDetailsPlanA").addClass("input-error");
            $("#rrm_skilldetailsplanaHrHeadError").html("Enter Skill Details");
          } else {
            $("#sd_txtEditorhrhead_skillDetailsPlanA").removeClass(
              "input-error"
            );
            $("#rrm_skilldetailsplanaHrHeadError").html("");
          }
          if (toOnBoardA == "") {
            $("#sd_date_rrmhrhead_tobeonboardplana").addClass("input-error");
            $("#rrm_tobeonboardplanaHrHeadError").html("Select Date");
          } else {
            $("#sd_date_rrmhrhead_tobeonboardplana").removeClass("input-error");
            $("#rrm_tobeonboardplanaHrHeadError").html("");
          }
          $('.nav-tabs a[href="#rrm_skillsplanaTab"]').tab("show");
          $(".btnPrevious").show();
          if (!IsRrmSaved) {
            $(".saveFamilyBtn").hide();
            $("a.btnNext").show();
          }
        } else {
          dataPlanA = {
            Method: "PostResourceRequrimentSkillPlans",
            Data: {
              ResourceRequirementId: ResourceRequirementId,
              ResourceRequirementSkillPlanId: ResourceRequirementSkillPlanId,
              SkillPlan: "PlanA",
              SkillPlanInfo: skillDetailsA,
              ToBeOnBoard: toOnBoardA,
              IsActive: "True",
            },
          };
          //var resulPlanBt = PostDataCall(dataPlanA);
          PostDataCallAsync(dataPlanA, function (resulPlanBt) {
            $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsHrHead"]').tab("show");
            $(".btnPrevious").show();
            if (!IsRrmSaved) {
              $(".saveFamilyBtn").hide();
              $("a.btnNext").show();
            }
            _addRRMEntryPointHrHead.savePlanARecruiters();
          });          
        }
      }

      if (activeTab == "rrm_skillsplanbTabHrHead") {
        var datecheckplanb = 0;
        var RecruiterB;
        skillDetailsB = $("#sd_txtEditorhrhead_skillDetailsPlanB").dxHtmlEditor("instance").option("value");

        toOnBoardB = $("#sd_date_rrmhrhead_tobeonboardplanb").dxDateBox("instance").option("value");        
        var varEDate = new Date().toISOString().slice(0, 10);        

        if (toOnBoardB <= varEDate) {
          datecheckplanb = 1;
          swal({
            title: "Warning!",
            text:
              "Please enter valid Date current and previous date should not be selected",
            icon: "warning",
            button: "ok!",
          });
          $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsHrHead"]').tab("show");
        }
        if (skillDetailsB == "" || toOnBoardB == "" || datecheckplanb == 1) {
          if (skillDetailsB == "") {
            $("#sd_txtEditorhrhead_skillDetailsPlanB").addClass("input-error");
            $("#rrm_skilldetailsplanbHrHeadError").html("Enter Skill Details");
          } else {
            $("#sd_txtEditorhrhead_skillDetailsPlanB").removeClass(
              "input-error"
            );
            $("#rrm_skilldetailsplanbHrHeadError").html("");
          }
          if (toOnBoardB == "") {
            $("#sd_date_rrmhrhead_tobeonboardplanb").addClass("input-error");
            $("#rrm_tobeonboardplanbHrHeadError").html("Select Date");
          } else {
            $("#sd_date_rrmhrhead_tobeonboardplanb").removeClass("input-error");
            $("#rrm_tobeonboardplanbHrHeadError").html("");
          }
          $('.nav-tabs a[href="#rrm_skillsplanbTab"]').tab("show");
          $(".btnPrevious").show();
          if (!IsRrmSaved) {
            $(".saveFamilyBtn").hide();
            $("a.btnNext").show();
          }
        } else {
          dataPlanB = {
            Method: "PostResourceRequrimentSkillPlans",
            Data: {
              ResourceRequirementId: ResourceRequirementId,
              ResourceRequirementSkillPlanId: ResourceRequirementSkillPlanId,
              SkillPlan: "PlanB",
              SkillPlanInfo: skillDetailsB,
              ToBeOnBoard: toOnBoardB,
              IsActive: "True",
            },
          };

          //var resulPlanBt = PostDataCall(dataPlanB);
          PostDataCallAsync(dataPlanB, function (resulPlanBt) {
            $('.nav-tabs a[href="#rrm_CommentsDetailsHrHead"]').tab("show");
            $("#rrm_manage_plan_comments_documents_HrHead").hide();
            $(".btnPrevious").show();
            _addRRMEntryPointHrHead.savePlanBRecruiters();
            if (!IsRrmSaved) {
              $(".saveFamilyBtn").show();
              $("a.btnNext").hide();
              //_addRRMEntryPointHrHead.getcommentsinrrm();
            }
          });
        }
      }
    }
    resetSimpleBarRRMEntryPointHrHead();
  };

  //tab previous button functions (rrmentry<-skills<-planA<-planB<-commnets)
  _addRRMEntryPointHrHead.toggleTabRRMEntryPrevious = function () {
    var activeTab = $("#rrmtab").find("li.active").attr("id");
    if (activeTab == "rrm_skillsplanaTab") {
      $('.nav-tabs a[href="#rrm_SkillDetails"]').tab("show");
      $("a.btnNext").show();
      $(".saveFamilyBtn").hide();
    }
    if (activeTab == "rrm_skillsTab") {
      $('.nav-tabs a[href="#rrm_RequirementDetailsHrHead"]').tab("show");
      $("a.btnNext").show();
      $(".saveFamilyBtn").hide();
      $(".btnPrevious").hide();
      _addRRMEntryPointHrHead.updateresourcerequitementdata();
    }
    if (activeTab == "rrm_skillsplanbTab") {
      $('.nav-tabs a[href="#rrm_SkillsPlanADetails"]').tab("show");
      $("a.btnNext").show();
      $(".btnPrevious").show();
      $(".saveFamilyBtn").hide();

      var filter_valbtn = JSON.stringify({
        IsActive: "True",
        Token: Token,
        SkillPlan: "PlanA",
        ResourceRequirementId: ResourceRequirementId,
      });

      //var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
      callGetListAsync(
        "GetResourceRequrimentSkillPlans",
        filter_valbtn,
        function (result) {
          if (result != null) {
            $("#sd_txtEditorhrhead_skillDetailsPlanA")
              .dxHtmlEditor("instance")
              .option("value", result[0].SkillPlanInfo);
            var edate = result[0].ToBeOnBoard;
            $("#sd_date_rrmhrhead_tobeonboardplana")
              .dxDateBox("instance")
              .option("value", edate);
            ResourceRequirementSkillPlanId =
              result[0].ResourceRequirementSkillPlanId;
          }
        }
      );
    }
    if (activeTab == "rrm_commentsHrHeadTab") {
      comments = $("#sd_txtEditorhrhead_skillDetailsPlanB")
        .dxHtmlEditor("instance")
        .option("value");

      if (!IsRrmSaved) {
        $("a.btnNext").show();
        $(".saveFamilyBtn").hide();
      } else {
        $("a.btnNext").hide();
      }
      $(".btnPrevious").show();
      $('.nav-tabs a[href="#rrm_SkillsPlanBDetailsHrHead"]').tab("show");
      var filter_valbtn = JSON.stringify({
        IsActive: "True",
        Token: Token,
        SkillPlans: "PlanB",
        ResourceRequirementId: ResourceRequirementId,
      });
      //var result = callgetlist('GetResourceRequrimentSkillPlans', filter_valbtn);
      callGetListAsync(
        "GetResourceRequrimentSkillPlans",
        filter_valbtn,
        function (result) {
          if (result != null) {
            $("#sd_txtEditorhrhead_skillDetailsPlanB")
              .dxHtmlEditor("instance")
              .option("value", result[0].SkillPlanInfo);
            var edate = result[0].ToBeOnBoard;            
            $("#sd_date_rrmhrhead_tobeonboardplanb")
              .dxDateBox("instance")
              .option("value", edate);
            ResourceRequirementSkillPlanId =
              result[0].ResourceRequirementSkillPlanId;
          }
        }
      );
    }
    resetSimpleBarRRMEntryPointHrHead();
  };

  // get rrm detials by id
  _addRRMEntryPointHrHead.updateresourcerequitementdata = function () {
    //var getRRMData = callgetlist('GetRRMbyid','{"IsActive":"True","ResourceRequirementId":"'+ResourceRequirementId+'","Token":"'+Token+'"}');
    callGetListAsync(
      "GetRRMbyid",
      '{"IsActive":"True","ResourceRequirementId":"' +
        ResourceRequirementId +
        '","Token":"' +
        Token +
        '"}',
      function (getRRMData) {
        _addRRMEntryPointHrHead.mapupdateaddrrmListcomputeHTML(getRRMData);
      }
    );
  };

  //bind rrm data from _addRRMEntryPointHrHead.updateresourcerequitementdata function result
  _addRRMEntryPointHrHead.mapupdateaddrrmListcomputeHTML = function (
    getRRMData
  ) {
    if (getRRMData[0].rrmid == "") {
      //
    } else {
      var data;
      getRRMData.forEach(function (key, item) {
        $("#sdtxt_rrmhrhead_requirementname").dxTextBox('instance').option('value',key.RequirementName);
        $("#sdtxt_rrmhrhead_requiredfor").dxTextBox('instance').option('value',key.RequiredFor);
        $("#rrm_empidHrHead").val(key.RequirementName);
        $("#rrm_entrybdeHrHead").val(key.BDEName);
        $("#sdnmb_rrmhrhead_numberofpositions").dxNumberBox('instance').option('value',key.NumberOfPositions);

        $("#sdcmb_rrmhrhead_department").dxSelectBox('instance').option('value',key.DepartmentId);
        $("#rrm_experiencerequired").val(key.ExperiencerequiredInYrs);
        $("#sdtxt_rrmhrhead_location").dxTextBox('instance').option('value',key.Location);
        var edate = key.RequestedDate;
        if (edate != null) {
          var ed = edate;
          $("#sd_date_rrmhrhead_requestedDate").dxDateBox('instance').option('value',ed);
        }
        $("#rrm_requirementlead").val(key.LeadName);
      });
    }
  };

  //rrmFormVAlidation
  _addRRMEntryPointHrHead.rrmValidation = function () {
    if ($("#sdtxt_rrmhrhead_requirementname").dxTextBox('instance').option('value') == "") {
      $("#rrm_requirementnameHrHeadError").html("Please Enter Name");
    }
    if ($("#sdtxt_rrmhrhead_requiredfor").dxTextBox('instance').option('value') == "") {
      $("#rrm_requiredforHrHeadError").html("Please Enter RequiredFor");
    }
    if ($("#sdnmb_rrmhrhead_numberofpositions").dxNumberBox('instance').option('value') == "") {
      $("#rrm_numberofpositionsHrHeadError").html(
        "Please Enter No. Of Positions"
      );
    }
    if ($("#sdcmb_rrmhrhead_department").dxSelectBox('instance').option('value') == "") {
      $("#rrm_departmentHrHeadError").html("Please Select Department");
    }
    if ($("#rrm_experiencerequired").val() == "") {
      $("#rrm_experiencerequiredError").html("Please Enter Experience");
    }
    if ($("#sdcmb_rrmhrhead_communication").dxSelectBox('instance').option('value') == "") {
      $("#rrm_communicationHrHeadError").html("Please Select Communication");
    }
    if ($("#rrmfamily").val() == "") {
      $("#rrmfamilyError").html("Please Select Family");
    }
    if ($("#rrmskill").val() == "") {
      $("#rrmskillError").html("Please Select Skill");
    }
    if (
      $("#sd_txtEditorhrhead_skillDetailsPlanA")
        .dxHtmlEditor("instance")
        .option("value") == ""
    ) {
      $("#rrm_skilldetailsplanaHrHeadError").html(
        "Please Enter Skill Details (Plan A)"
      );
    }
    if (
      $("#sd_txtEditorhrhead_skillDetailsPlanB")
        .dxHtmlEditor("instance")
        .option("value") == ""
    ) {
      $("#rrm_skilldetailsplanbHrHeadError").html(
        "Please Enter Skill Details (Plan B)"
      );
    }
    if (
      $("#sd_date_rrmhrhead_tobeonboardplana")
        .dxDateBox("instance")
        .option("value") == ""
    ) {
      $("#rrm_tobeonboardplanaHrHeadError").html("Please Select To on Board");
    }
    if (
      $("#sd_date_rrmhrhead_tobeonboardplanb")
        .dxDateBox("instance")
        .option("value") == ""
    ) {
      $("#rrm_tobeonboardplanbHrHeadError").html("Please Select To on Board");
    }
  };

  //reset skill data
  _addRRMEntryPointHrHead.skillsClearAndShow = function () {
    // Clear our fields

    $("#familyentry").val("");
    $("#skillentry").val("");
    $("#skillversionentry").val("");
  };

  //get skill version details
  _addRRMEntryPointHrHead.get_versionsentry = function (skillentry_id) {
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

      $("#skillversionentry").html(options);
    });
  };

  //get entered skill details
  _addRRMEntryPointHrHead.get_skillsentry = function (familyentry_id) {
    var familyentry_id = familyentry_id;

    var filter_val = JSON.stringify({
      FamilyId: familyentry_id,
    });

    // var result = callgetlist('GetSkills', filter_val);
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
      _addRRMEntryPointHrHead.get_versionsentry("");
    });
  };

  _addRRMEntryPointHrHead.insert_SkillInfoEntry = function (e) {
        
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
          _addRRMEntryPointHrHead.skillsClearAndShow();
          _addRRMEntryPointHrHead.getSkillsDetails();
        }
    });
  }

  _addRRMEntryPointHrHead.update_SkillInfoEntry = function (e) {
      
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
            _addRRMEntryPointHrHead.skillsClearAndShow();
            _addRRMEntryPointHrHead.getSkillsDetails();
          }
      });       

  }

  //show skill in skill table
  _addRRMEntryPointHrHead.getSkillsDetails = function () {
    var filterData = JSON.stringify({
      "ResourceRequirementId": ResourceRequirementId,
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
              allowUpdating: true,
              allowDeleting: true,
              allowAdding: true
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
            _addRRMEntryPointHrHead.insert_SkillInfoEntry(e);
          },
          onRowUpdated: function (e) {
            _addRRMEntryPointHrHead.update_SkillInfoEntry(e);
          },
          onRowRemoved: function (e) {
            _addRRMEntryPointHrHead.delete_SkillInfoEntry(e);
          }
      });
  })
  };

  _addRRMEntryPointHrHead.delete_SkillInfoEntry = function (e) {
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
              _addRRMEntryPoint.getSkillsDetails();
          }                    
      });   
  }

  // bind skill  table date
  _addRRMEntryPointHrHead.skillcomputeHTML = function (getSkillList) {
    var html = "";
    html = "<table id='myTable' class='myTable_rrm'>";
    html += "<tr>";
    html += "<th>Family</th>";
    html += "<th>Skills</th>";
    html += "<th>Version</th>";
    html += "<th>Action</th>";
    html += "</tr>";

    if (
      getSkillList == null ||
      getSkillList == "" ||
      getSkillList == undefined
    ) {
      $(".myTable_rrm").addClass("skillemptytbl");
      html += "<tr><td colspan='4'>No Data..!</td></tr>";
    } else {
      getSkillList.forEach(function (key, item) {
        $(".myTable_rrm").removeClass("skillemptytbl");
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
          "<td><button class='btn edit-btn' onclick=editRow_SkillMapping('" +
          skillId +
          "')><i class='fas fa-pencil-alt'></i></button>";
        html +=
          "<button class='btn delete-btn' onclick=_addRRMEntryPointHrHead.deleteRow_SkillMapping('" +
          skillId +
          "')><i class='fas fa-trash-alt'></i></button></td>";
        html += "</tr>";
      });
    }
    return html;
  };

  _addRRMEntryPointHrHead.saveRRMInterviewers = function (ResourceRequirementIdParam,EmployeeIds) {
    if(EmployeeIds == undefined || EmployeeIds == null){
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

  //reset form data
  _addRRMEntryPointHrHead.clearAll_addrrmdata = function () {
    $("#sdtxt_rrmhrhead_requirementname").dxTextBox('instance').option('value',"");
    $("#sdtxt_rrmhrhead_requiredfor").dxTextBox('instance').option('value',"");
    $("#rrm_empidHrHead").val("");
    $("#rrm_entrybdeHrHead").val("");
    $("#sdnmb_rrmhrhead_numberofpositions").dxNumberBox('instance').option('value',"");

    $("#sdcmb_rrmhrhead_department").dxSelectBox('instance').option('value',"");
    $("#sdcmb_rrmhrhead_designation").dxSelectBox('instance').option('value',"");
    $("#rrm_experiencerequired").val("");
    $("#sdtxt_rrmhrhead_location").dxTextBox('instance').option('value',"");
    var date = new Date();
    var currentDate = date.toISOString().slice(0, 10);
    $("#sd_date_rrmhrhead_requestedDate").dxDateBox('instance').option('value',currentDate);
    $("#rrm_requirementlead").val("");
    var date = new Date();
    var currentDate = date.toISOString().slice(0, 10);
    var tdydate = new Date();
    tdydate.setDate(tdydate.getDate() + 1);
    var nxtDate = tdydate.toISOString().slice(0, 10);
    $("#sd_date_rrmhrhead_tobeonboardplana")
      .dxDateBox("instance")
      .option("value", nxtDate);
    $("#sd_date_rrmhrhead_tobeonboardplanb")
      .dxDateBox("instance")
      .option("value", nxtDate);
    skillsClearAndShow();
  };

  _addRRMEntryPointHrHead.savePlanARecruiters = function(){
    requirtersA=$("#sd_tag_hrheada_rrmrecruiter").dxTagBox('instance').option("value");
    var ResourceRequirementSkillPlanAId;
    if (requirtersA != null) {
      var filter_valbtn = JSON.stringify({
        IsActive: true,
        SkillPlans: "PlanA",
        ResourceRequirementId: ResourceRequirementId,
      });
      callGetListAsync("GetResourceRequrimentSkillPlans",filter_valbtn,function (result) {         
          if (result != null) {
            ResourceRequirementSkillPlanAId = result[0].ResourceRequirementSkillPlanId;
            var recruiters = requirtersA.toString();
            dataPlanA_frmrrm_unselected_recruiter = {
              Method: "PostRRMRecruiters",
              Data: {
                ResourceRequirementId: ResourceRequirementId,
                ResourceRequirementSkillPlanId: ResourceRequirementSkillPlanAId,
                RecruitersData: recruiters,
                SkillPlan: "Plan A",
                IsActive: true,
              },
            };
            PostDataCallAsync(
              dataPlanA_frmrrm_unselected_recruiter,
              function (resulPlanBt) {
                    console.log(resulPlanBt);
              }
            );
          }
        }
      );    
    }
  }

  _addRRMEntryPointHrHead.savePlanBRecruiters = function(){
    requirtersB = $("#sd_tag_hrheadb_rrmrecruiter").dxTagBox('instance').option("value");
    var ResourceRequirementSkillPlanBId;
    if (requirtersB != null) {
      var filter_valbtn = JSON.stringify({
        IsActive: "True",
        Token: Token,
        SkillPlans: "PlanB",
        ResourceRequirementId: ResourceRequirementId,
      });

      callGetListAsync("GetResourceRequrimentSkillPlans",filter_valbtn,function (result) {
          if (result != null) {
            ResourceRequirementSkillPlanBId = result[0].ResourceRequirementSkillPlanId;
            var recruiters = requirtersB.toString();
            dataPlanA_frmrrm_unselected_recruiter = {
              Method: "PostRRMRecruiters",
              Data: {
                ResourceRequirementId: ResourceRequirementId,
                ResourceRequirementSkillPlanId: ResourceRequirementSkillPlanBId,
                RecruitersData: recruiters,
                SkillPlan: "Plan B",
                IsActive: true,
              },
            };
            PostDataCallAsync(
              dataPlanA_frmrrm_unselected_recruiter,
              function (resulPlanBt) {
                    
              }
            );
          }
        }
      );      
    }
  }

  _addRRMEntryPointHrHead.saveSkillsDetailsForClone = function(ResourceRequirementId,ClonedRRMHrHeadId){
    var filterValue = {
        "Method": "PostSkillsForClonedRRM",
        "Data": {
            "ClonedRRMId": ClonedRRMHrHeadId,
            "RRMId": ResourceRequirementId,
            "IsActive": true
        }
    }
    
    PostDataCallAsync(filterValue, function (result) {
      _addRRMEntryPointHrHead.getSkillsDetails();
        return true;
    });
}

  mapUI();
  return _addRRMEntryPointHrHead;
};
