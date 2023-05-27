var GetProposals;

function getWorkorderListTable() {
  $('.error_message').html("");
  $('input[type=text]').removeClass("required_field");
  $('select').removeClass("required_field");
  $('textarea').removeClass("required_field");
  var EmployeeID = localStorage.getItem("EmployeeID");
  var filter_val = JSON.stringify({
    "IsActive": true,
    "UserId": EmployeeID
  });

  //var GetProposals = callgetlist('GetActiveRFP');
  GetProposals = callgetlist('GetRFPsToAssign');
  var ProposalListHtml = workorderListcomputeHTMLTable(GetProposals);
  //$('#DisplayWorkOrderListTable').html(ProposalListHtml);
  renderManageRFPGrid(GetProposals);
}

/** added by praveen */
function workorderListcomputeHTMLTable(GetProposals) {
  var html = "";
  if (GetProposals.length == 0) {
    html += "<tr><td colspan='7'>No Data Found.!</td></tr>";
  } else {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    GetProposals.forEach(function (key, item) {
      sno = item + 1;
      ProposalId = key.ProposalId;
      stageNumber = key.Order;
      var proposal_date = new Date(key.RFPDate),
        yr = proposal_date.getFullYear(),
        month = proposal_date.getMonth() < 10 ? '0' + proposal_date.getMonth() : proposal_date.getMonth(),
        day = proposal_date.getDate() < 10 ? '0' + proposal_date.getDate() : proposal_date.getDate(),
        monthName = months[month - 1];
      newproposalDate = day + '-' + monthName + '-' + yr;
      html += "<tr class='row_" + item + "' id='row_" + ProposalId + "'>";
      html += "<td>" + sno + "</td>";
      html += "<td>" + key.RRFNo + "</td>";
      html += "<td>" + newproposalDate + "</td>";
      html += "<td>" + key.BDEName + "</td>";
      html += "<td>" + key.Client + "</td>";
      html += "<td>" + key.Project_Title + "</td>";
      html += "<td><button class='btn btn-xs btn-primary edit-btn' onclick=openAssignProposalModel('" + key.RRFNo + "');><i class='fas fa-user-plus'></i></button>"
      html += "<button class='btn btn-xs btn-primary edit-btn' onclick=openManageProposalModel();><i class='fas fa-chalkboard-teacher'></i></button>"
      html += "<button class='btn btn-xs btn-primary edit-btn' onclick=openWorkOrderModelDialog('" + key.RRFNo + "');><i class='fas fa-building'></i></button>"
      html += "</tr>";
    });
  }
  return html;
}

function OpenRfpModal() {
  // Remove duplicate  highlights disappear in rfp to proposal
  $('.nav-link').css('background-color', '#eee');
  //end
  localStorage.removeItem("ProposalId");
  $('.form-control').removeClass('required_field');
  $('.error_message').html('');

  $('#rfp_RfpModal').modal("show");
  $("#rfp_contact-person").val('');
  $("#rfp_client-name").val('');
  $('#rfp_proposalDate').val('');
  $('#rfp_address').val('');
  GetRFPs('ProposalRfplist');
  $('.proposalError').val('');
  $('#address').val('');

  //Reset the RFP model step
  $("#smartwizard_rfp").smartWizard('reset');
}

$('.import').click(function () {
  var modalId = $(this).attr('mid');
  $('#' + modalId).modal("show");
});

function openWorkOrderModelDialog(RRFNo) {
  //debugger;
  $('#openWorkOrderModelbox').modal('show');

  var filter_val = JSON.stringify({
    "IsActive": true,
    "ProposalId": "FFD87BD3-5C7D-4524-BC14-F9787FD21810"
  });

  var result = callgetlist('GetWorkOrder', filter_val);
  //console.log('result',result);
  var filtered_item = result.filter(function (item) {
    if (item['RRFNo'] == RRFNo) {
      return item;
    }
  });
  //Reset the RFP model step
  if (filtered_item.length > 0) {
    $('#WO_ProposalRfplist').val(filtered_item[0]['RRFNo']);
    $('#owo_project_name').val(filtered_item[0]['ProjectName']);
    $('#owo_client_name').val(filtered_item[0]['Client']);
    $('#owo_project_type').val(filtered_item[0]['ProjectTypeId']);
    $('#owo_development_model').val(filtered_item[0]['DevelopmentModelId']);
    $('#owo_project_industry').val(filtered_item[0]['ProjectIndustryId']);
    $('#owo_project_domain').val(filtered_item[0]['ProjectDomainId']);
    $('#owo_planned_start_date').val(filtered_item[0]['PlannedStartDate']);
    $('#owo_planned_end_date').val(filtered_item[0]['PlannedEndDate']);
    $('#owo_actual_start_date').val(filtered_item[0]['ActualStartDate']);
    $('#owo_actual_end_date').val(filtered_item[0]['ActualEndDate']);
    $('#owo_uat_start_date').val(filtered_item[0]['UATStartDate']);
    $('#owo_uat_end_date').val(filtered_item[0]['UATEndDate']);
    $('#owo_project_decription').val(filtered_item[0]['FailureAbsorbationRate']);
    $('#owo_project_technology_notes').val(filtered_item[0]['ProjectDescription']);
    $("#smartwizard_workorder").smartWizard('reset');
  }
}

// function openProposalToWorkOrder(ProposalId){

// }
function openManageProposalModel() {
  $('#managePropsalModalDialog').modal('show');
  //$('#technology_choose').append('<option value="foo" selected="selected">Foo</option>').select2();

  var filter_val = JSON.stringify({
    "IsActive": true
  });
  var result = callgetlist("GetTechnology", filter_val);
  $.each(result, function (key, value) {
    $('#technology_choose').append($("<option></option>").attr("value", value.SkillId).text(value.Skill)).select2();
  });

}

function openAssignProposalModel(RRFNo) {
  var filtered_item = GetProposals.filter(function (item) {
    if (item['RRFNo'] == RRFNo) {
      return item;
    }
  });
  $('#assignPropsalModalDialog').modal('show');
  var filter_val = JSON.stringify({
    "IsActive": true
  });
  var result = callgetlist("GetTechnology", filter_val);
  var val = JSON.stringify({});
  var getTechIncharge = callgetlist("GetRFPTechLeadList", val);
  if (filtered_item.length > 0) {
    $('#RRFno').val(filtered_item[0]['RRFNo']);
    $('#estimate_number').val(filtered_item[0]['BDEName']);
    $('#client').val(filtered_item[0]['Client']);
    $('#project_title').val(filtered_item[0]['Project_Title']);
  }
  $('#tech_incharge').find('option:not(:first)').remove();
  $('#tech_stream').val("");
  $('#tech_incharge_error').empty();
  $('#technology_choose_assign_error').empty();
  $('#tech_stream_error').empty();
  $('#assign-error-msg').empty();
  getTechIncharge.forEach(function (item) {
    $('#tech_incharge').append($("<option></option>").attr("value", item.UserRFPID).text(item.Name)).select2();

  });
  $('#technology_choose_assign').find('option').remove();
  $.each(result, function (key, value) {
    $('#technology_choose_assign').append($("<option></option>").attr("value", value.SkillId).text(value.Skill)).select2();
  });
}

function assignRFPSave() {
  var RRFNo = $('#RRFno').val();
  $('#assign-error-msg').empty();
  var techStream = $('#tech_stream').val();
  var technology = $('#technology_choose_assign').val() ? $('#technology_choose_assign').val().join(",") : "";
  var techPerson = $('#tech_incharge').val();
  assignPostData = {
    RFPId: RRFNo,
    TechStream: techStream,
    Technology: technology,
    TechPerson: techPerson,
    AssignedBy: localStorage.getItem("EmployeeID"),
    Message: 'Assign RFP'
  }
  var errorStatus = false;
  var list = ['tech_stream', 'tech_incharge', 'technology_choose_assign'];
  list.forEach(function (item) {
    $('#' + item + '_error').empty();
    if ($('#' + item).val() == "" || $('#' + item).val() == null) {
      $('#' + item + '_error').append("<p style='color:red'>Please Select any option</p>")
      errorStatus = true;
    }
  });
  let postData = {
    "Method": "PostRFPStatustoAssigned",
    "Data": assignPostData
  }
  if (errorStatus) {
    return;
  }
  else {
    var postCall = PostDataCall(postData);
    if (postCall['IsSuccess'] == true) {
      $('#assignPropsalModalDialog').modal('hide');
      popupmessage("RFP ID:" + RRFNo + "is been successfully assigned");
      GetProposals = callgetlist('GetRFPsToAssign');
      var ProposalListHtml = workorderListcomputeHTMLTable(GetProposals);
      $('#DisplayWorkOrderListTable').html(ProposalListHtml);
    }
    else {
      $('#assign-error-msg').append('<p style="color:red;text-align: center;">Failed to assign</p>');
    }
  }
}

$("#tech_stream,#tech_incharge,#technology_choose_assign").change(function (event) {
  var id = event.currentTarget.id;
  $('#' + id + '_error').empty();
});


function popupmessage(msg) {
  if (!$('#ConfirmModal').length) {
    $('body').append('<div id="ConfirmModal" class="modal" role="dialog" aria-labelledby="dataConfirmLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content modal-width" style="width:50%;"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><button class="expand modalExpanding"><i class="fas fa-expand" data-toggle="modal"></i></button><h3 id="ConfirmLabel" style="color: cadetblue;">Information</h3></div><div class="modal-body"></div><div class="modal-footer"><button class="btn btn-primary" data-dismiss="modal" aria-hidden="true">OK</button></div></div></div></div>');
  }
  $('#ConfirmModal').find('.modal-body').text(msg);
  $('#ConfirmModal').modal({
    show: true
  });
}

function renderManageRFPGrid(data) {
  var manageRfpDataGrid = $("#DisplayWorkOrderListTable")
    .dxDataGrid({
      filterRow: {
        visible: true,
        applyFilter: "auto",
      },
      dataSource: data,
      export: {
        enabled: true,
        allowExportSelectedData: true,
      },
      searchPanel: {
        visible: true,
        width: 240,
        placeholder: "Search...",
      },
      headerFilter: {
        visible: true,
      },
      grouping: {
        autoExpandAll: true,
      },
      pager: {
        showPageSizeSelector: true,
        allowedPageSizes: [5, 10, 20],
        showInfo: true,
      },
      paging: {
        pageSize: 10,
      },
      groupPanel: {
        visible: true,
        emptyPanelText: "Drag a column"
      },
      sorting: {
        mode: "multiple",
      },
      selection: {
        mode: "multiple",
      },
      summary: {
        totalItems: [
          {
            column: "sno",
            summaryType: "count",
          },
        ],
        groupItems: [
          {
            column: "sno",
            summaryType: "count",
          },
        ],
      },
      editing: {
        mode: "popup",
        allowAdding: false,
        allowUpdating: false,
        useIcons: true,
      },
      columnChooser: {
        enabled: true,
      },
      rowAlternationEnabled: true,
      filterPanel: { visible: true },
      allowColumnReordering: true,
      allowColumnResizing: true,
      showBorders: true,
      onToolbarPreparing: function (e) {
        var dataGrid = e.component;
        e.toolbarOptions.items.unshift({
          location: "after",
          widget: "dxButton",
          options: {
            icon: "refresh",
            onClick: function () {
              getWorkorderListTable();
            },
          },
        });
      },
      columns: [
        {
          caption: "#",
          dataField: "sno",
          cssClass: "rno",
          allowGrouping: false,
          allowCollapsing: false,
          allReordering: false,
          width: 70,
          cellTemplate: function (container, options) {
            container.text(
              manageRfpDataGrid.pageIndex() * manageRfpDataGrid.pageSize() + options.rowIndex + 1
            );
          },
        },
        {
          caption: "RFP #",
          dataField: "RRFNo",
        },
        {
          caption: "RFP Date",
          dataField: "RFPDate",
        },
        {
          caption: "BDE Name",
          dataField: "BDEName",
        },
        {
          caption: "Client Name",
          dataField: "Client",
        },
        {
          caption: "ProjectTitle",
          dataField: "Project_Title",
        },
        {
          dataField: "",
          caption: "Action",
          width: 120,
          allowFiltering: false,
          allowGrouping: false,
          allowReordering: false,
          allowSorting: false,
          allowCollapsing: false,
          allowExporting: false,
          cellTemplate: function (container, options) {
            var rfpId = options.data["RRFNo"]
            var domActions = "";
            domActions += "<button class='btn btn-xs btn-primary edit-btn' onclick=openAssignProposalModel('" + rfpId + "');><i class='fas fa-user-plus'></i></button><button class='btn btn-xs btn-primary edit-btn' onclick=openManageProposalModel();><i class='fas fa-chalkboard-teacher'></i></button><button class='btn btn-xs btn-primary edit-btn' onclick=openWorkOrderModelDialog('" + rfpId + "');><i class='fas fa-building'></i></button>";
            $("<div class='text-center'>")
              .append($(domActions))
              .appendTo(container);
          },
        },
      ],
    })
    .dxDataGrid("instance");
}