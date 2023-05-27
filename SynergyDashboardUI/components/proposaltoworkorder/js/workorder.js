var TimeandMaterialScopeId;
var comment_data_dxEditor = '';
var UserId = localStorage.getItem("EmployeeID");
$(document).ready(function () {

  UserId = localStorage.getItem("EmployeeID");
  // GetProposalsForWO @Token, @UserId, @IsActive
  var data = JSON.stringify({
    "UserId": UserId,
    "IsActive": 1
  });
  var GetProposalsForWO = callgetlist('GetProposalsForWO', data);
  renderProposalWorkOrderDataGrid(GetProposalsForWO);


  //Check Project Type
  $('.ProjectType').mouseup(function () {
    var previousValue = $("input[type=radio][name='ProjectType']:checked");
    var previousValue1 = $("input[type=radio][name='ProjectType']:checked").val();
    var previousValueId = $("input[type=radio][name='ProjectType']:checked").attr('id');

    if (previousValue1 != undefined) {
      swal({
        title: "Are you sure?",
        text: "Any previous data saved in " + previousValueId + " will lost . Please confirm to change project type",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((res) => {
          if (res) {
            clear_allProjectTypesFields();
          } else {
            $("input[type=radio][name='ProjectType'][value=" + previousValue.val() + "]").prop('checked', true);

          }
        });
    }
  });

    // nre_message_Description
    comment_data_dxEditor = $('#comment_data_dxEditor').dxHtmlEditor({
      height: 300,
        toolbar: {
            items: [
                "undo", "redo", "separator",
                {
                    formatName: "size",
                    formatValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"] },
                {
                    formatName: "font",
                    formatValues: ["Arial", "Courier New", "Georgia", "Impact", "Lucida Console", "Tahoma", "Times New Roman", "Verdana"]
                },
                "separator", "bold", "italic", "strike", "underline", "separator",
                "alignLeft", "alignCenter", "alignRight", "alignJustify", "separator",
                "orderedList", "bulletList", "separator",
                {
                    formatName: "header",
                    formatValues: [false, 1, 2, 3, 4, 5]
                }, "separator",
                "color", "background", "separator",
                "link", "image", "separator",
                "clear", "codeBlock", "blockquote"
            ]
        },
        mediaResizing: {
            enabled: true
        },
        value:""
    }).dxHtmlEditor('instance');
    
});

function GetProposalsForWo(){
  var data = JSON.stringify({
    "UserId": UserId,
    "IsActive": 1
  });
  var GetProposalsForWO = callgetlist('GetProposalsForWO', data);
  renderProposalWorkOrderDataGrid(GetProposalsForWO);
}





function renderProposalWorkOrderDataGrid(data) {
  var proposalWorkOrderCardDataGrid = $("#proposal_to_workorder_card")
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
        emptyPanelText: "Drag a column",
      },
      sorting: {
        mode: "multiple",
      },
      selection: {
        mode: "multiple",
      },
      onToolbarPreparing: function (e) {
        var dataGrid = e.component;
        e.toolbarOptions.items.unshift({
          location: "after",
          widget: "dxButton",
          options: {
            icon: "refresh",
            onClick: function () {
              GetProposalsForWo();
              _rrmGrid.getRRMEntryTable();
              dataGrid.refresh();
            }
          }
        });
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
      columns: [
        {
          caption: "S.NO",
          dataField: "sno",
          cssClass: "rno",
          allowGrouping: false,
          allowCollapsing: false,
          allReordering: false,
          width: 70,
          cellTemplate: function (container, options) {
            container.text(
              proposalWorkOrderCardDataGrid.pageIndex() * proposalWorkOrderCardDataGrid.pageSize() + options.rowIndex + 1
            );
          },
        },
        {
          caption: "Estimation #",
          dataField: "EstimationNumber",
          width: "100",
        },
        {
          caption: "Client Name",
          dataField: "ClientName",
        },
        {
          caption: "Owner Name",
          dataField: "Owner",
        },
        {
          caption: "BDE Name",
          dataField: "BDE",
        },
        {
          caption: "Document Name",
          dataField: "DocumentName",
        },
        {
          caption: "Project Name",
          dataField: "ProjectName",
        },
        {
          caption: "Date",
          dataField: "Date",
          dataType: "date",
          format: "dd-MMM-yyyy"
        },
        {
          caption: "WorkOrder Number",
          dataField: "WorkOrderNumber",
        },
        {
          caption: "Is Client Signed",
          dataField: "IsClientSigned",
          // },
          cellTemplate: function (container, options) {
            var domActions = "";
            if (options.data.IsClientSigned == 1) {
              domActions +=
                "<span class='pull-left'>Signed</span>";
            }
            else if (options.data.IsClientSigned == 0) {
              domActions +=
                "<span class='pull-left'>Not Signed</span>";
            }
            else if (options.data.IsClientSigned == '' || options.data.IsClientSigned == null) {
              domActions +=
                "<span class='pull-left'></span>";
            }
            $("<div class='text-center'>")
              .append($(domActions))
              .appendTo(container);
          },
        },
        {
          caption: "Action",
          dataField: "",
          width: "100",
          cellTemplate: function (container, options) {
            var ProposalId = options.data.ProposalId,
              WorkOrderId = options.data.WorkOrderId,
              RFPId = options.data.RFPId;
            ProjectName = options.data.DocumentName;
            var domActions = "";
            domActions += `<button class='btn btn-xs btn-primary edit-btn' onclick='WorkOrderModelDialog("${ProposalId}","${WorkOrderId}","${RFPId}")'><i class='fas fa-edit'></i></button>`
            domActions += `<button class='btn btn-xs btn-primary edit-btn' onclick='openCommentsHistoryForProposals("${RFPId}","${ProjectName}")'><i class='fas fa-comments'></i></button>`
            $("<div class='text-center'>")
              .append($(domActions))
              .appendTo(container);
          },
        },
      ],
    })
    .dxDataGrid("instance");
}

function openCommentsHistoryForProposals(RfpId, projectName) {
  $('#commentsHistoryProposalModal').modal('show');
  $('#proposal_RFPID').val(RfpId);
  var CommentsContent = new Array();
  $('#commentsHistoryProposalModalTitle').html("Comments And Documents - " + projectName);
  var GetCommentsInProposalsFilter = JSON.stringify({
    "RFPId": RfpId,
    "IsActive": 1
  });
  var GetProposalsCOmmentsHistory = callgetlist("GetCommentsinRFP", GetCommentsInProposalsFilter);
  var ProposalsCommentsHistoryHtml = "";
  var ProposalsNoCommentsCount = 0;
  var ProposalsNoDocumentsCount = 0;
  GetProposalsCOmmentsHistory.forEach(function (item) {
    var ProposalsCommentCreatedDate = new Date(item.CreatedDate);
    var ProposalsCommentDateMonthYear = ProposalsCommentCreatedDate.toLocaleDateString();
    var ProposalsCommentTime = ProposalsCommentCreatedDate.toLocaleTimeString();
    if (item.DocumentType == "Comment" && item.Content != null) {
      CommentsContent[item.Id] = item.Content.toString();
      ProposalsCommentsHistoryHtml += "<div class='rfp_comment' onclick=ProposalsCommentSwal('" + item.Id + "')>";
      ProposalsCommentsHistoryHtml += "<small class='pull-left'><span>" + item.EmployeeName + ":</span></small>";
      ProposalsCommentsHistoryHtml += "<small class='pull-right'><span>" + ProposalsCommentDateMonthYear + "</span><span>" + ProposalsCommentTime + "</span></small>";
      var commentElement = $(CommentsContent[item.Id]);
      if (CommentsContent[item.Id].includes("<img")) {
        commentElement.find('img').remove();
        ProposalsCommentsHistoryHtml += "<label>Message contains some image(s) click to expand</label>";
      }
      ProposalsCommentsHistoryHtml += "<label>" + commentElement.html() + "</label></div>";
    }
    if (item.DocumentType == "Document" && item.Content != null) {
      ProposalsCommentsHistoryHtml += "<div class='rfp_comment'>";
      ProposalsCommentsHistoryHtml += "<small class='pull-left'><span>" + item.EmployeeName + ":</span></small>";
      ProposalsCommentsHistoryHtml += "<small class='pull-right'><span>" + ProposalsCommentDateMonthYear + "</span><span>" + ProposalsCommentTime + "</span></small>";
      ProposalsCommentsHistoryHtml += "<label><small>" + item.DocumentName + "." + item.DocumentExtension + "</small> ";
      ProposalsCommentsHistoryHtml += "Download-file: <button class='btn btn-primary btn-xs' onclick=DownloadProposalsDocument('" + item.Id + "')><span class='glyphicon glyphicon-arrow-down'></span></button></label></div>";
    }
    if (item.DocumentType == "Comment" && item.Content != null) {
      ProposalsNoCommentsCount += 1;
    }
    if (item.DocumentType == "Document" && item.Content != null) {
      ProposalsNoDocumentsCount += 1;
    }
  });
  if (ProposalsNoCommentsCount == 0 && ProposalsNoDocumentsCount == 0) {
    ProposalsCommentsHistoryHtml = "<h3 class='text-center'>There are No Comments and Documents Yet</h3>";
  }
  $("#proposal_comments_histor").html(ProposalsCommentsHistoryHtml);
}

function makeAllFieldsReadonly() {
  $('#WorkOrderModelbox input').attr('readonly', true);
  $('#WorkOrderModelbox .make_Readable').prop('disabled', true);
  $('#WorkOrderModelbox input:radio, select').attr('disabled', true);
  $("#owo_project_notes").dxHtmlEditor('instance').option('readOnly', true);
}

function makeAllFieldsEnabled() {
  $('#WorkOrderModelbox input').attr('readonly', false);
  $('#WorkOrderModelbox .make_Readable').prop('disabled', false);
  $('#WorkOrderModelbox input:radio, select').attr('disabled', false);
  $("#owo_project_notes").dxHtmlEditor('instance').option('readOnly', false);
}

function WorkOrderModelDialog(ProposalId, WorkOrderId,RFPId) {

  $('#WorkOrderModelbox').modal('show');
  $("#owo_client_name").prop('disabled', true);
  // get skills
  var filter_val = JSON.stringify({ "Token": localStorage.getItem('securityToken') });
  var GetAllSkills = callgetlist('GetAllSkills', filter_val);
  window.GetAllSkills = GetAllSkills;
  var signedDate;
  var startDate;
  $('.addSkill-tag-input').find('option').remove();
  GetAllSkills.forEach(function (item) {
    $('.addSkill-tag-input').append($("<option></option>").attr("value", item.Id).text(item.Name)).select2();
  });

  var AddSkill_Array = new Array();
  $('.addSkill-tag-input').val(AddSkill_Array);
  $('.addSkill-tag-input').select2();

  $('#is_client_signed').change(function () {
    if ($('#is_client_signed').is(':checked') == true) {
      $("#ptowo_planned_start_date").css('pointer-events', 'initial');
      $("#ptowo_planned_end_date").css('pointer-events', 'initial');
      $("#WO_signed_req").css("display","flex");
      $("#ptowo_planned_start_date input").prop('required', true);
      let currentDate = new Date();
      $('#ptowo_planned_start_date').val(GetFormattedDate(currentDate));
      $('#ptowo_planned_end_date').val(GetFormattedDate(currentDate));
    } else {
      $("#WO_signed_req").css("display","none");
      $('#ptowo_planned_start_date').val("");
      $("#ptowo_planned_start_date").css('pointer-events', 'none');
      $('#ptowo_planned_end_date').val("");
      $("#ptowo_planned_end_date").css('pointer-events', 'none');
      $(".pro_planned_end_date_err").html('');
    }
  });

   $('#ptowo_planned_start_date').dxDateBox({
    type: 'date',
    value: new Date(),
    displayFormat: 'dd-MMM-yyyy',
    onValueChanged(data) {
      var selectval = $("#ptowo_planned_start_date").dxDateBox('instance').option('value');
      // $("#ptowo_planned_end_date").dxDateBox('instance').option('max', selectval);
    },
  });
  $('#ptowo_planned_end_date').dxDateBox({
    type: 'date',
    value: new Date(),
    displayFormat: 'dd-MMM-yyyy',
  });
  var record_id = "";
  
  if(ProposalId != null || ProposalId != "null"){
    record_id = ProposalId;
  } 
  if(WorkOrderId != null || WorkOrderId != "null"){
    record_id = WorkOrderId;
  }
  if(RFPId != null || RFPId != "null"){
    record_id = RFPId;
  }

  if (record_id != null) {  // Edit Mode
    UserId = localStorage.getItem("EmployeeID");

    if(ProposalId != "null") {
      var fil_val = JSON.stringify({
        "UserId": UserId,
        "RecordId ": record_id != "" ? record_id : null,
        "IsActive": 1
      });
      var GetProposalsForWOById = callgetlist('GetProposalsForWObyID', fil_val);
    }
    else {
      var fil_val1 = JSON.stringify({
        "UserId": UserId,
        "WorkrderId": WorkOrderId,
      });
      var GetProposalsForWOById = callgetlist('GetProposalsForWithoutRfpWObyID', fil_val1);
    }
  

    var AddSkill_Array = new Array();
    $('.addSkill-tag-input').val(AddSkill_Array);
    $('.addSkill-tag-input').select2();

    if (GetProposalsForWOById != null) {
      GetProposalsForWOById.forEach(function (item) {
        $('#owo_client_name').val(removeTags(item.ClientName));
        $('#owo_project_name').val(removeTags(item.DocumentName));
        $('#owo_proposal_id').val(item.ProposalId);
        $('.discount_amount').val(item.DiscountOffered);
        $('#WO_currency_type').html(item.Currency);
        (item.WorkOrderId != null) ? $('#WorkOrderId').val(item.WorkOrderId) : $('#WorkOrderId').val("");
        (item.ProjectTypeId != null) ? $("input[type=radio][name='ProjectType'][value=" + item.ProjectTypeId + "]").prop('checked', true) : $("input[type=radio][name='ProjectType']").prop('checked', false);

        ((item.IsClientSigned != null && item.IsClientSigned == true)) ? $('#is_client_signed').prop('checked', true) : $('#is_client_signed').prop('checked', false);
        (item.IsDownloaded != null && item.IsDownloaded == true) ? $('#is_downloaded').val(1) : $('#is_downloaded').val(0);
        (item != null && (item.IsDownloaded != null && item.IsDownloaded == true)) ? $("#is_client_signed").prop('disabled', false) : $("#is_client_signed").prop('disabled', true);

        (item.ProjectNotes != null) ? $("#owo_project_notes").dxHtmlEditor('instance').option('value', item.ProjectNotes) : $("#owo_project_notes").dxHtmlEditor('instance').option('value', "");
        (item.Notes != null) ? comment_data_dxEditor.option("value", item.Notes) : comment_data_dxEditor.option("value", '');
        (item.ClientId != null) ? $('#owo_client_id').val(item.ClientId) : $('#owo_client_id').val("");
        localStorage.clientSigned = item.IsClientSigned;
        localStorage.workOrderID = $('#WorkOrderId').val();

        var filter_val = JSON.stringify({
          IsActive: true,
          ProposalId: item.ProposalId,
        });
        var result = callgetlist("GetEstimateRFPDetails", filter_val);
        $("#WO_RFPICode").html(result[0].RFPICode);

        if (item.ClientId == true) { //document.getElementById('is_client_signed').checked
          $("#is_client_signed").prop('disabled', true);
          $("#WO_signed_req").css("display","flex");
          (item.WOsignedDate != "1900-01-01T00:00:00" && item.WOsignedDate != null) ? $("#ptowo_planned_start_date").css('pointer-events', 'none') : $("#ptowo_planned_start_date").css('pointer-events', 'initial'); //initial
          $("#ptowo_planned_end_date").css('pointer-events', 'initial');
          signedDate = GetFormattedDate(item.WOsignedDate);
          startDate = GetFormattedDate(item.ExpectedStartDate);
          $('#ptowo_planned_end_date').dxDateBox({ type: 'date', value: signedDate, displayFormat: 'dd-MMM-yyyy',});
          (item.WOsignedDate != "1900-01-01T00:00:00" && item.WOsignedDate != null) ? $('#ptowo_planned_start_date').dxDateBox({ type: 'date', value: signedDate, displayFormat: 'dd-MMM-yyyy',}) : $('#ptowo_planned_start_date').val("");
          (item.ExpectedStartDate != "1900-01-01T00:00:00" && item.ExpectedStartDate != null) ? $('#ptowo_planned_end_date').dxDateBox({ type: 'date', value: startDate, displayFormat: 'dd-MMM-yyyy',}) : $('#ptowo_planned_end_date').val("");
          makeAllFieldsReadonly();
        } else {
          makeAllFieldsEnabled();
          $('#ptowo_planned_start_date').val("");
          $("#WO_signed_req").css("display","none");
          $("#ptowo_planned_start_date").css('pointer-events', 'none');
          $('#ptowo_planned_end_date').val("");
          $("#ptowo_planned_end_date").css('pointer-events', 'none');
          (item != null && (item.IsDownloaded != null && item.IsDownloaded == true)) ? $("#is_client_signed").prop('disabled', false) : $("#is_client_signed").prop('disabled', true);
        }
      })
    }
  }
  else { // Add Mode
    $("#owo_client_name").prop('disabled', false);
  }

  //Reset the RFP model step
  $("#smartwizard_workorder").smartWizard('reset');

}

function removeTags(str) {
  if ((str === null) || (str === ''))
    return str;
  else
    str = str.toString();
  return str.replace(/;/g, "");
}

function GetFormattedDate(proposalDate) {
  var d = new Date(proposalDate),
    month = '' + (d.toLocaleString('en-us', { month: 'short' })),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('-');
}

function postInsertWO(owo_workorder_clause) {
  let proposalId = ($('#owo_proposal_id').val() == "") ? null : $('#owo_proposal_id').val();  //'FFD87BD3-5C7D-4524-BC14-F9787FD21810'; 
  let workOrderId = ($('#WorkOrderId').val() == "") ? null : $('#WorkOrderId').val();  //'FFD87BD3-5C7D-4524-BC14-F9787FD21810'; 
  // let clientId = ($('#owo_client_id').val() == "") ? null : $('#owo_client_id').val();
  let clientId = ($('#owo_client_name').val() == "") ? null : $('#owo_client_name').val();
  let IsClientSigned = $('#is_client_signed').is(":checked");
  let projectName = $('#owo_project_name').val();
  let clientName = $('#owo_client_name').val();
  let plannedStartDate = ($("#ptowo_planned_start_date").dxDateBox('instance').option('value') == "") ? null : $("#ptowo_planned_start_date").dxDateBox('instance').option('value');
  let plannedEndDate = ($("#ptowo_planned_end_date").dxDateBox('instance').option('value') == "") ? null : $("#ptowo_planned_end_date").dxDateBox('instance').option('value');
  let projectNotes = $("#owo_project_notes").dxHtmlEditor('instance').option('value');
  let notes = (owo_workorder_clause == "" || owo_workorder_clause == null) ? null : owo_workorder_clause;
  let err = 0;

  if ($("#owo_project_name").val() == "") {
    $(".pro_name_err").html('This Field is required');
    err = 1;
  } else {
    $(".pro_name_err").html('')
  }

  if ($("#owo_client_name").val() == "") {
    $(".pro_client_err").html('This Field is required');
    err = 1;
  } else {
    $(".pro_client_err").html('')
  }

  if ($('#is_client_signed').is(':checked') == true) {
    // if (plannedEndDate < plannedStartDate) {
    //   $(".pro_planned_end_date_err").html('Expected Start Date should not be lesser than Workorder Signed Date');
    //   err = 1;
    // } else {
      $(".pro_planned_end_date_err").html('');
    // }
  } else {
    $(".pro_planned_end_date_err").html('');
  }


  if (err == 1) {
    return false;
  } else {

    if(proposalId) {
      data = {
        "Method": "PostInsertWO",
        "Data": {        
          "Token": localStorage.getItem('securityToken'),
          "ProposalId": proposalId,
          "ClientId": clientId,
          "ProjectName": projectName,
          "WorkOrderId": workOrderId,
          "IsClientSigned": IsClientSigned,
          "WOsignedDate": plannedStartDate,
          "ExpectedStartDate": plannedEndDate,
          "ProjectNotes": projectNotes,
          "Notes": notes,
        }
      }
    } 
    else {
      data = {
        "Method": "PostInsertWithoutRfpWO",
        "Data": {        
          "Token": localStorage.getItem('securityToken'),
          "ClientId": clientId,
          "ProjectName": projectName,
          "WorkOrderId": workOrderId,
          "IsClientSigned": IsClientSigned,
          "WOsignedDate": plannedStartDate,
          "ExpectedStartDate": plannedEndDate,
          "ProjectNotes": projectNotes,
          "Notes": notes,
        }
      }
    }   

    var postCall = PostDataCall(data);
    if (postCall['IsSuccess'] == true) {
      var WorkOrderId = (postCall['Data'][0]['WorkOrderId']);
      $("#WorkOrderId").val(WorkOrderId);
      var clientSigned = $('#is_client_signed').is(':checked');
      close_woproposal(clientSigned);

      var swalEMRSucc = {
        title: 'Success!',
        text: postCall['Message'],
        icon: "success"
      }
      swal(swalEMRSucc);

    } else {
      var swalEMRErr = {
        title: 'Warning!',
        text: postCall['Message'],
        icon: "error"
      }
      swal(swalEMRErr);
    }
  }

}

function close_woproposal(IsClientSigned) {
  if (IsClientSigned) {
    // GetStatusForWorkOrder
    var WorkOrderId = $('#WorkOrderId').val();
    var filter_val = JSON.stringify({ "WorkOrderId": WorkOrderId });
    var GetStatusForWorkOrder = callgetlist('GetStatusForWorkOrder', filter_val);

    var IsGetStatusForWorkOrder = isEmpty(GetStatusForWorkOrder);

    if (!IsGetStatusForWorkOrder) {
      let RFPICode = GetStatusForWorkOrder[0].RFPICode;
      let RFPStatus = GetStatusForWorkOrder[0].RFPStatusCode;
      OldRFPStatusdata = {
        "Method": "PostOldRFPStatusForWorkOrder",
        "Data": {
          "RFPICode": RFPICode,
          "RFPStatus": RFPStatus,
          "Message": "",
          "Status": "",
        }
      }

      var postCallOldRFPStatus = PostDataCall(OldRFPStatusdata);

      if (postCallOldRFPStatus['IsSuccess'] == true) {

        WorkOrderStatus = {
          "Method": "PostWorkOrderStatusById",
          "Data": {
            "Token": localStorage.getItem('securityToken'),
            "WorkOrderId": WorkOrderId,
            "Status": "",
            "Message": ""

          }
        }
        var postCallWorkOrderStatusById = PostDataCall(WorkOrderStatus);
        if (postCallWorkOrderStatusById['IsSuccess'] == true) {

          console.log(postCallWorkOrderStatusById['Message']);
        } else {
          console.log(postCallWorkOrderStatusById['Message']);
        }

      } else {
        console.log(postCallOldRFPStatus['Message']);

      }

    }
  }
}

function workorderClauseSavebtn() {
  var getdata = comment_data_dxEditor.option("value");
  var getDataLength = getdata.length;
  let err = 0;

  if (getDataLength == "" || getDataLength == 0) {
    $(".comment_data_err").html('This Field is required');
    err = 1;
  } else {
    $(".comment_data_err").html('');
    postInsertWO(getdata)
  }
}

function add_retainer() {

  var retainer_scopeId = $('#retainer_scopeId').val();

  var skillTagInput_retainer_array = $('#add-skill-tag-input-retainer').val();
  var skillTagInput_retainer_value = skillTagInput_retainer_array.join();

  var retainerResource_array = $('#retainer_resource').val();
  var retainerResource_value = retainerResource_array.join();



  var WorkOrderId = $('#WorkOrderId').val();
  let err = 0;

  if ($("#add-skill-tag-input-retainer").val() == "") {
    $(".add-skill-tag-input-retainer_error").html('This Field is required');
    err = 1;
  } else {
    $(".add-skill-tag-input-retainer_error").html('');
  }

  if ($("#retainer_hours_duration").val() == "") {
    $(".retainer_hours_duration_error").html('This Field is required');
    err = 1;
  } else {
    $(".retainer_hours_duration_error").html('');
  }

  if ($("#retainer_duration_in_hours").val() == "") {
    $(".retainer_duration_in_hours_error").html('This Field is required');
    err = 1;
  } else {
    $(".retainer_duration_in_hours_error").html('');
  }


  if ($("#retainer_cost_per_hour").val() == "") {
    $(".retainer_cost_per_hour_error").html('This Field is required');
    err = 1;
  } else {
    $(".retainer_cost_per_hour_error").html('');
  }



  if ($("#owo_allocated_period").val() == 0) {
    $(".owo_allocated_period_error").html('This Field is required');
    err = 1;
  } else {
    $(".owo_allocated_period_error").html('');
  }

  if ($('input[name="additional_hours"]:checked').length == 0) {
    $(".hrs_prior_allowed_error").html('This Field is required');
    err = 1;
  } else {
    $(".hrs_prior_allowed_error").html('');
  }

  if ($('input[name="work_on_weekend"]:checked').length == 0) {
    $(".onweekend_error").html('This Field is required');
    err = 1;
  } else {
    $(".onweekend_error").html('');
  }

  if ($('input[name="compensation"]:checked').length == 0) {
    $(".oncompensation_error").html('This Field is required');
    err = 1;
  } else {
    $(".oncompensation_error").html('');
  }

  if ($("#GetWorkOrderRetainerWorkType_timesheet_frequency").val() == 0) {
    $(".timesheet_frequency_error").html('This Field is required');
    err = 1;
  } else {
    $(".timesheet_frequency_error").html('');
  }

  if ($("#GetWorkOrderRetainerWorkType_invoice_frequency").val() == 0) {
    $(".invoice_frequency_error").html('This Field is required');
    err = 1;
  } else {
    $(".invoice_frequency_error").html('');
  }

  if ($("#retainer_currency").val() == 0) {
    $(".retainer_currency_error").html('This Field is required');
    err = 1;
  } else {
    $(".retainer_currency_error").html('');
  }

  if (err == 1) {
    return false;
  } else {
    data = {
      "Method": "PostWorkOrderRetainer",
      "Data": {
        "Token": localStorage.getItem('securityToken'),
        "RetainerScopeId": (retainer_scopeId == null || retainer_scopeId == '') ? null : retainer_scopeId,
        "WorkOrderId": WorkOrderId,
        "RetainerResourceId": retainerResource_value,
        "Duration": parseInt($("#retainer_hours_duration").val()),
        "DurationHours": $("#retainer_duration_in_hours").val(),
        "Cost": $("#retainer_cost_per_hour").val(),
        "RetainerPeriodId": $("#owo_allocated_period").val(),
        "IsAdditionalHoursBillable": $('input[name="additional_hours"]:checked').val(),
        "IsWeekendHolidayHours": $('input[name="work_on_weekend"]:checked').val(),
        "IsCompansation": $('input[name="compensation"]:checked').val(),
        "TimeSheetDurationId": $("#GetWorkOrderRetainerWorkType_timesheet_frequency").val(),
        "InvoiceDurationId": $("#GetWorkOrderRetainerWorkType_invoice_frequency").val(),
        "CurrencyType" : $("#retainer_currency").val(),
        "DiscountOffered" : ($("#retainer_discount_amount").val() != "")?$("#retainer_discount_amount").val():null,
        "Skills": skillTagInput_retainer_value,
        "IsActive": 1,
        "Status": "",
        "Message": "",

      }
    }

    var postCall = PostDataCall(data);
    if (postCall['IsSuccess'] == true) {
      var swalEMRSucc = {
        title: 'Success!',
        text: postCall['Message'],
        icon: "success"
      }
      swal(swalEMRSucc);
      clear_retainer();
    } else {
      var swalEMRErr = {
        title: 'Warning!',
        text: postCall['Message'],
        icon: "error"
      }
      swal(swalEMRErr);
    }
  }
  get_retainer(WorkOrderId);
}

function get_retainer(WorkOrderId) {
  // GetWorkOrderRetainer	        @Token, @WorkOrderId, @Status, @Message

  // get Retainer Resource 
  var filter_val = JSON.stringify({ "Token": localStorage.getItem('securityToken'), "IsActive": 1 });
  var GetRetainerResource = callgetlist('GetRetainerResources', filter_val);
  $('#retainer_resource').find('option').remove();
  GetRetainerResource.forEach(function (item) {
    $('#retainer_resource').append($("<option></option>").attr("value", item.EmployeeId).text(item.EmployeeName)).select2();
  });
  var AddResource_Array = new Array();
  $('#retainer_resource').val(AddResource_Array);
  $('#retainer_resource').select2();

  //get Allocated Period 
  var filter_val_alloctedPeriod = JSON.stringify({ "Token": localStorage.getItem('securityToken'), "IsActive": 1 });
  var GetRetainerPeriod = callgetlist('GetRetainerPeriod', filter_val_alloctedPeriod);
  var select_allocated_period = document.getElementById("owo_allocated_period");
  // Optional: Clear all existing options first:
  select_allocated_period.innerHTML = "";
  select_allocated_period.innerHTML += '<option value="0">Select Allocated Period</option>';
  // Populate list with options:
  for (var i = 0; i < GetRetainerPeriod.length; i++) {
    var opt = GetRetainerPeriod[i];
    select_allocated_period.innerHTML += "<option value=\"" + opt.Id + "\">" + opt.RetainerPeriod + "</option>";
  }

  //get Timesheet Frequency
  var filter_val_timesheetFrequency = JSON.stringify({ "Token": localStorage.getItem('securityToken'), "IsActive": 1 });
  var GetRetainerFrequency = callgetlist('GetRetainerFrequency', filter_val_timesheetFrequency);
  var select_timesheetFrequency = document.getElementById("GetWorkOrderRetainerWorkType_timesheet_frequency");
  // Optional: Clear all existing options first:
  select_timesheetFrequency.innerHTML = "";
  select_timesheetFrequency.innerHTML += '<option value="0">Select Timesheet Frequency</option>';
  // Populate list with options:
  for (var i = 0; i < GetRetainerFrequency.length; i++) {
    var opt = GetRetainerFrequency[i];
    select_timesheetFrequency.innerHTML += "<option value=\"" + opt.Id + "\">" + opt.RetainerFrequency + "</option>";
  }

  //get Invoice Frequency
  var filter_val_invoiceFrequency = JSON.stringify({ "Token": localStorage.getItem('securityToken'), "IsActive": 1 });
  var GetRetainerFrequency = callgetlist('GetRetainerFrequency', filter_val_invoiceFrequency);
  var select_invoiceFrequency = document.getElementById("GetWorkOrderRetainerWorkType_invoice_frequency");
  // Optional: Clear all existing options first:
  select_invoiceFrequency.innerHTML = "";
  select_invoiceFrequency.innerHTML += '<option value="0">Select Invoice Frequency</option>';
  // Populate list with options:
  for (var i = 0; i < GetRetainerFrequency.length; i++) {
    var opt = GetRetainerFrequency[i];
    select_invoiceFrequency.innerHTML += "<option value=\"" + opt.Id + "\">" + opt.RetainerFrequency + "</option>";
  }

  var filter_val = JSON.stringify({
    "Token": localStorage.getItem('securityToken'),
    "WorkOrderId": WorkOrderId
  });
  var GetWorkOrderRetainer = callgetlist('GetRetainerScope', filter_val);
  GetWorkOrderRetainerHTMLTable(GetWorkOrderRetainer);

  var IsGetWorkOrderRetainerEmpty = isEmpty(GetWorkOrderRetainer);
  return IsGetWorkOrderRetainerEmpty
}
function GetWorkOrderRetainerHTMLTable(GetWorkOrderRetainer) {
  var manageRfpDataGrid = $("#DisplayWorkOrderRetainer")
    .dxDataGrid({
      filterRow: {
        visible: true,
        applyFilter: "auto",
      },
      dataSource: GetWorkOrderRetainer,
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
          caption: "Skills Name",
          dataField: "SkillName",
        },
        {
          caption: "Resource Name",
          dataField: "EmployeeName",
        },
        {
          caption: "Duration(In Months)",
          dataField: "Duration",
        },
        {
          caption: "Duration(In Hours)",
          dataField: "DurationHours",
        },
        {
          caption: "Cost per hour",
          dataField: "Cost",
        },
        {
          caption: "Allocated Period",
          dataField: "RetainerPeriod",
        },
        {
          caption: "Timesheet Frequency",
          dataField: "TimeSheetDuration",
        },
        {
          caption: "Invoice Frequency",
          dataField: "InvoiceDuration",
        },
        {
          caption: "Action",
          dataField: "",
          width: "100",
          cellTemplate: function (container, options) {

            var RetainerScopeId = options.data.Id;
            var domActions = "";
            domActions += `<button class='btn btn-xs btn-primary edit-btn wo-ret-edit' onclick='edit_retainer("${RetainerScopeId}")'><i class='fas fa-edit'></i></button>`
            domActions += `<button class='btn btn-xs btn-danger delete-btn wo-ret-delete' onclick='delete_retainer("${RetainerScopeId}")'><i class="glyphicon glyphicon-trash"></button>`
            $("<div class='text-center'>")
              .append($(domActions))
              .appendTo(container);
            var clientSigned = localStorage.getItem('clientSigned');
            if (clientSigned == "true") {
              $('.wo-ret-edit').prop('disabled', true);
              $('.wo-ret-delete').prop('disabled', true);
            } else {
              $('.wo-ret-edit').prop('disabled', false);
              $('.wo-ret-delete').prop('disabled', false);
            }
          },
        },
      ],
    })
    .dxDataGrid("instance");

}

function edit_retainer(RetainerScopeId) {
  var filter_val = JSON.stringify({
    "Token": localStorage.getItem('securityToken'),
    "RetainerScopeId": RetainerScopeId
  });
  var GetRetainerScopeById = callgetlist('GetRetainerScopeById', filter_val);

  // Skills
  var GetWorkOrderRetainerSkillId = GetRetainerScopeById[0].SkillId;
  var GetWorkOrderRetainerSkillIdArr = GetWorkOrderRetainerSkillId.split(',');
  // Resources
  if (GetRetainerScopeById[0].EmployeeId != null && GetRetainerScopeById[0].EmployeeId != '') {
    var GetWorkOrderRetainerResourceId = GetRetainerScopeById[0].EmployeeId;
    var GetWorkOrderRetainerResourceIdArr = GetWorkOrderRetainerResourceId.split(',');
  }

  $('.addSkill-tag-input').val(GetWorkOrderRetainerSkillIdArr);
  $('.addSkill-tag-input').trigger('change');
  $('#retainer_resource').val(GetWorkOrderRetainerResourceIdArr);
  $('#retainer_resource').trigger('change');

  $('#retainer_hours_duration').val(GetRetainerScopeById[0].Duration);
  $('#retainer_duration_in_hours').val(GetRetainerScopeById[0].DurationHours);
  $('#retainer_cost_per_hour').val(GetRetainerScopeById[0].Cost);
  $('#owo_allocated_period').val(GetRetainerScopeById[0].RetainerPeriodId);

  $("input[type=radio][name='additional_hours'][value=" + GetRetainerScopeById[0].IsAdditionalHoursBillable + "]").prop('checked', true);
  $("input[type=radio][name='work_on_weekend'][value=" + GetRetainerScopeById[0].IsWorkingOnWeekEndAllowed + "]").prop('checked', true);
  $("input[type=radio][name='compensation'][value=" + GetRetainerScopeById[0].IsCompansation + "]").prop('checked', true);
  $("#retainer_currency").val(GetRetainerScopeById[0].Currency);
  $("#retainer_discount_amount").val(GetRetainerScopeById[0].DiscountOffered);

  $('#GetWorkOrderRetainerWorkType_timesheet_frequency').val(GetRetainerScopeById[0].TimeSheetDurationId);
  $('#GetWorkOrderRetainerWorkType_timesheet_frequency').trigger('change');
  $('#GetWorkOrderRetainerWorkType_invoice_frequency').val(GetRetainerScopeById[0].InvoiceDurationID);
  $('#GetWorkOrderRetainerWorkType_invoice_frequency').trigger('change');
  $('#retainer_scopeId').val(GetRetainerScopeById[0].Id);

  $('#btnAdd-retainer').html('Save');
}

function delete_retainer(RetainerScopeId) {
  var WorkOrderId = $('#WorkOrderId').val();
  swal({
    title: "Delete",
    text: "Are you sure, Do you want to delete ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        var id = RetainerScopeId;
        data = {
          "Method": "DeleteWorkOrderRetainerById",
          "Data": {
            "Token": localStorage.getItem('securityToken'),
            "RetainerScopeId": id,
            "Status": 1,
            "Message": ""
          }
        }
        var result = PostDataCall(data);
        swal({
          title: "Success!",
          text: "Deleted Successfully!",
          icon: "success",
          button: "ok!",
        })
        get_retainer(WorkOrderId);
      }
    })
}

function clear_retainer() {
  $(".select2-selection__rendered li:not(:last-child)").remove();
  $(".addSkill-tag-input").val("");
  $("#retainer_resource").val("");
  $("#retainer_hours_duration").val("");
  $("#retainer_duration_in_hours").val("");
  $("#retainer_cost_per_hour").val("");
  $("#owo_allocated_period").val("0");
  $('input:radio[name=additional_hours]').each(function () { $(this).prop('checked', false); });
  $('input:radio[name=work_on_weekend]').each(function () { $(this).prop('checked', false); });
  $('input:radio[name=compensation]').each(function () { $(this).prop('checked', false); });
  $("#GetWorkOrderRetainerWorkType_timesheet_frequency").val("0");
  $("#GetWorkOrderRetainerWorkType_invoice_frequency").val("0");
  $("#retainer_currency").val("");
  $("#retainer_discount_amount").val("");
  
  
  $('#retainer_scopeId').val("");

  $(".add-skill-tag-input-retainer_error").html('');
  $(".retainer_resource_error").html('');
  $(".retainer_hours_duration_error").html('');
  $(".retainer_duration_in_hours_error").html('');
  $(".retainer_cost_per_hour_error").html('');
  $(".owo_allocated_period_error").html('');
  $(".hrs_prior_allowed_error").html('');
  $(".onweekend_error").html('');
  $(".oncompensation_error").html('');
  $(".timesheet_frequency_error").html('');
  $(".invoice_frequency_error").html('');
  $(".retainer_currency_error").html('');
  $('#btnAdd-retainer').html('Add');
}

function add_fixedbid() {
  let err = 0;
  var WorkOrderId = $('#WorkOrderId').val();
  if ($('#fixedbit_minimum_hours').val() == "") {
    $(".fixedbit_minimum_hours_error").html('This Field is required');
    err = 1;
  } else {
    $(".fixedbit_minimum_hours_error").html('');
  }
  if ($('#fixed_cost_per_hr').val() == "") {
    $(".fixed_cost_per_hr_error").html('This Field is required');
    err = 1;
  } else {
    $(".fixed_cost_per_hr_error").html('');
  }
  if (err == 1) {
    return false;
  } else {
    //PostWorkOrderFixedBid	@Token, @WorkOrderId, @Hours, @CostPerHour, @Status, @Message
    data = {
      "Method": "PostWorkOrderFixedBid",
      "Data": {
        "WorkOrderId": WorkOrderId,
        "Hours": $('#fixedbit_minimum_hours').val(),
        "CostPerHour": $('#fixed_cost_per_hr').val()
      }
    }

    var postCall = PostDataCall(data);
    if (postCall['IsSuccess'] == true) {
    } else {
      alert(postCall['Message']);
    }
  }
  get_fixedbid(WorkOrderId);

}

function get_fixedbid(WorkOrderId) {
  var success_currency = displayEstimatePricingForWorkOrder();
  GetCurrencies('currency');
  $('.currency').val(success_currency);
  $('#fixed_currency').val(success_currency);
}

function GetEstimatePricingForWorkOrder() {
  var filter_val = JSON.stringify({
    "Token": localStorage.getItem('securityToken'),
    "WorkOrderID": $("#WorkOrderId").val(),
    "ProposalId": $('#owo_proposal_id').val(),
    "IsActive": 1
  });
  var result = callgetlist('GetEstimationAndPricingForWorkOrder', filter_val);
  if (result.length == 0) {
    $("#proposal-title-6").html('Estimate Pricing');
  } else {
    $("#proposal-title-6").html(result[0]['HeaderTitle']);
  }
  return result;

}

function displayEstimatePricingForWorkOrder() {
  debugger;
  var SavedEstimatePricing = GetEstimatePricingForWorkOrder();
  var currencyId = "";
  if (SavedEstimatePricing.length != 0) {
    if (SavedEstimatePricing[0]['CurrencyId'] != "") {
      currencyId = SavedEstimatePricing[0]['CurrencyId'];
    }
  }
  HTML = EstimatePricing_computeHTML(SavedEstimatePricing);
  $("#DisplayWorkOrderFixedBid").html(HTML);
  return currencyId;

}

function EstimatePricing_computeHTML(SavedEstimatePricing) {
  var html;
  var free_hours;
  var discount_offerred;
  var net_closure_value;
  if (SavedEstimatePricing.length == 0) {
    html += "<tr><td style='border: none;'><h6>No Data Found.!</h6></td></tr>";
  } else {
    html = "<table id='EstimateTable' class='table table-striped' rows='" + SavedEstimatePricing.length + "' cellspacing=0 border=1>";
    html += "<tbody>";
    html += "<tr style='height:33px;'>";
    html += "<td  rowspan=2>";
    html += "<nobr>#</nobr>";
    html += "</td>";
    html += "<td  rowspan=2>";
    html += "<nobr>Project Phases</nobr>";
    html += "</td>";
    html += "<td  colspan=2>";
    html += "<nobr>Man</nobr>";
    html += "</td>";
    html += "<td  rowspan=2>";
    html += "<nobr># of Resources</nobr>";
    html += "</td>";
    html += "<td  colspan=2>";
    html += "<nobr>Business</nobr>";
    html += "</td>";
    html += "<td  colspan=2>";
    html += "<nobr>Rate : <select name='currency' id='proposalCurrency' class='currency'> </select></nobr>";
    html += "</td>";
    html += "</tr>";
    html += "<tr style='height:33px;'>";
    html += "<td >";
    html += "<nobr>Hours</nobr>";
    html += "</td>";
    html += "<td >";
    html += "<nobr>Days</nobr>";
    html += "</td>";
    html += "<td>";
    html += "<nobr>Hours</nobr>";
    html += "</td>";
    html += "<td >";
    html += "<nobr>Days</nobr>";
    html += "</td>";
    html += "<td >";
    html += "<nobr>Per Hour Cost</nobr>";
    html += "</td>";
    html += "<td>";
    html += " <nobr>Total</nobr>";
    html += "</td>";
    html += "</tr>";
    var saved_currency = "$";
    var total_mHours = 0;
    var total_mDays = 0;
    var total_bHours = 0;
    var total_bDays = 0;
    var total_Total = 0;
    var total_id = 0;
    SavedEstimatePricing.forEach(function (key, item) {
      var projectId = key.FixedBidScopeId;
      var sample_id = item + 1;
      total_mHours += key.ManHours;
      total_mDays += key.ManDays;
      total_bHours += key.BusinessHours;
      total_bDays += key.BusinessDays;
      total_Total += key.Total;
      free_hours = key.FreeHoursOffered;
      discount_offerred = key.DiscountOffered;
      net_closure_value = key.NetClosureValue;
      $("#total_value").val(total_Total);
      total_id += sample_id;
      if (key.NoOfResources == null || key.NoOfResources == 0) {
        key.NoOfResources = 1;
      }
      html += "<tr style='height:33px;'class='row_" + item + "' id='row_" + projectId + "'>";
      html += "<td><input type='hidden' class='id_" + sample_id + "' value='" + projectId + "'><input type='hidden' class='phase' value='" + sample_id + "'> " + sample_id + "</td>";
      html += "<td><input type='hidden' class='title' value='" + key.ProjectPhases + "'><span id='projectPhase_" + sample_id + "'>" + key.ProjectPhases + "</span></td>";
      html += "<td><input type='hidden' class='mHours_" + sample_id + "' value='" + key.ManHours + "'><span id='mHours_" + sample_id + "'>" + key.ManHours + "</span></td>";
      html += "<td><input type='hidden' class='phase' value='" + key.ManDays + "'><span id='mDays_" + sample_id + "'>" + key.ManDays + "</span></td>";
      html += "<td><input min='0' type='number' class='Resource_" + sample_id + "' value='" + key.NoOfResources + "' onchange='Resource_change(this, event)'></td>";
      html += "<td><input type='hidden' class='bHours_" + sample_id + "' value='" + key.BusinessHours + "'><span id='bHours_" + sample_id + "'>" + key.BusinessHours + "</span></td>";
      html += "<td><input type='hidden' class='bDays_" + sample_id + "' value='" + key.BusinessDays + "'><span id='bDays_" + sample_id + "'>" + key.BusinessDays + "</span></td>";
      html += "<td><input min='0' type='number' class='rHours_" + sample_id + "' value='" + key.RateUSDPerHour + "' onchange='Rate_change(this, event)'></td>";
      if (key.Total == null) { key.Total = 0; }
      html += "<td><input type='hidden' class='rTotal_" + sample_id + "' value='" + key.Total + "'><span  id='Total_" + sample_id + "'>" + key.Total + "</span></td>";
      html += "</tr>";

    });

    html += "<tr>";
    html += "<td></td>";
    html += "<td>TOTAL</td>";
    html += "<td>" + total_mHours + "</td>";
    html += "<td>" + total_mDays + "</td>";
    html += "<td></td>";
    html += "<td id='total_bHours'>" + total_bHours + "</td>";
    html += "<td id='total_bDays'>" + total_bDays + "</td>";
    html += "<td></td>";
    html += "<td id='total_Total'>" + total_Total + "</td>";
    html += "</tr>";
    html += "</tbody></table>";
    html += "<div class='form-section'><div class='row'>";
    html += "<div class='col-md-4'>";
    html += "<label>Free Hours Offered <span style='color: red'></span></label>";
    html += "<input type='text' class='form-control' name='free_hours' id='free_hours' value='"+free_hours+"'>"
    html += "</div>";
    html += "<div class='col-md-4'>";
    html += "<label>Discount Offered <span style='color: red'></span></label>";
    html += "<input type='text' class='form-control discount_amount' name='fixedbid_discount_amount' id='fixedbid_discount_amount' onblur='calculate_amount(this)' value='"+discount_offerred+"'>"
    html += "</div>";
    html += "<div class='col-md-4'>";
    html += "<label>Net Closure Value <span style='color: red'></span></label>";
    html += "<input type='text' class='form-control net_closure_value' name='net_closure_value' id='net_closure_value' value='"+net_closure_value+"'>"
    html += "</div>";
    html += "</div></div>";
    return html;
  }

  return html;
}

function Resource_change(ths) {
  var classname = ths.className;
  var id = classname.replace("Resource_", "");

  var Resources = $("." + classname).val();

  $(".Resource_" + id).attr("value", Resources);
  var ManHours = $(".mHours_" + id).val();

  if (ManHours != 0 && (Resources != "" && Resources != 0)) {
    var BusinessHours = Math.round(ManHours / Resources);
    var BusinessDays = Math.round(BusinessHours / 8);

    $("#bHours_" + id).html(BusinessHours);
    $("#bDays_" + id).html(BusinessDays);

    $(".bHours_" + id).val(BusinessHours);
    $(".bDays_" + id).val(BusinessDays);


    var tds = $("#EstimateTable").attr("rows");
    var change_bHours = 0;
    var change_bDays = 0;
    for (var i = 1; i <= tds; i++) {
      change_bHours += parseInt($(".bHours_" + i).val());
      change_bDays += parseInt($(".bDays_" + i).val());
    }

    $("#total_bHours").html(change_bHours);
    $("#total_bDays").html(change_bDays);
  }
  else {
    $("." + classname).val(1)
  }
  if (ManHours == 0) {
    $("." + classname).val(0)
  }
}

function Rate_change(ths) {
  var classname = ths.className;
  var id = classname.replace("rHours_", "");

  var Rate = $("." + classname).val();

  $(".rHours_" + id).attr("value", Rate);
  var ManHours = $(".mHours_" + id).val();

  var Total = ManHours * Rate;

  $("#Total_" + id).html(Total);
  $(".rTotal_" + id).val(Total);


  var tds = $("#EstimateTable").attr("rows");
  var change_rTotal = 0;
  for (var i = 1; i <= tds; i++) {
    change_rTotal += parseInt($(".rTotal_" + i).val());

  }
  $("#total_value").val(change_rTotal);

  $("#total_Total").html(change_rTotal);



}

function GetCurrencies(classname) {
  var filter_val = JSON.stringify({
    "IsActive": true
  });
  var result = callgetlist('GetCurrencies', filter_val);
  var options = "<option value=''>Select Currency</option>";
  for (var i = 0; i < result.length; i++) {
    options += "<option value='" + result[i].Id + "'>" + result[i].Code + "</option>";
  }
  $("." + classname).html(options);
}

function post_EstimatePricing() {
  var get_ProposalId = localStorage.getItem('ProposalId');
  var estimatePricing_title = $("#proposal-title-6").html();
  var free_hours = $("#free_hours").val();
  var fixedbid_discount_amount = $("#fixedbid_discount_amount").val();
  var net_closure_value = $("#net_closure_value").val();
  var WorkOrderId = $('#WorkOrderId').val();
  
  var set_ProposalId = "";
  if (get_ProposalId != "") {
    set_ProposalId = get_ProposalId;
  } else {
    ProposalSwal("OOPS!", "PropsalId not found", "error")
    return false;
  }

  var currency = $('.currency').val();
  // This condition need implement based on user types
  var tds = $("#EstimateTable").attr("rows");

  var postData = [];
  var get_data;
  for (var i = 1; i <= tds; i++) {
    get_data = {
      "FixedBidScopeId": $(".id_" + i).val(),
      "Total": $(".rTotal_" + i).val(),
      "Cost": $(".rHours_" + i).val(),
      "Currency": currency
    };

    postData.push(get_data);
  }


  var Post_Data = JSON.stringify(postData);

  data = {
    "Method": "PostWorkOrderFixedBid",
    "Data": {
      "Token": localStorage.getItem('securityToken'),
      "FixedBidData": Post_Data,
      "DiscountOffered" : (fixedbid_discount_amount) ? fixedbid_discount_amount : null,
      "NetClosureValue" : (net_closure_value) ? net_closure_value : null,
      "FreeHoursOffered": (free_hours) ? free_hours : null,
      "WorkOrderID"  : WorkOrderId,
      "Status": 1,
      "Message": ""
    }
  }


  var postCall = PostDataCall(data);
  if (postCall['IsSuccess'] == true) {
    return true;
  } else {
    return true;
  }

}


function clear_fixedbid() {
  $(".fixedbit_minimum_hours_error").html('');
  $(".fixed_cost_per_hr_error").html('');
  $('#fixedbit_minimum_hours').val('');
  $('#fixed_cost_per_hr').val('');
}

function edit_timeandmaterial(TimeAndMaterialScopeId) {
  var filter_val = JSON.stringify({
    "Token": localStorage.getItem('securityToken'),
    "TimeAndMaterialScopeId": TimeAndMaterialScopeId
  });
  var GetWorkOrderTimeandMaterialById = callgetlist('GetWorkOrderTimeandMaterial', filter_val);

  var GetWorkOrderTimeandMaterialSkillId = GetWorkOrderTimeandMaterialById[0].SkillId;
  var GetWorkOrderTimeandMaterialSkillIdArr = GetWorkOrderTimeandMaterialSkillId.split(',');

  $('.addSkill-tag-input').val(GetWorkOrderTimeandMaterialSkillIdArr);
  $('.addSkill-tag-input').trigger('change');
  $('#time_material_duration').val(GetWorkOrderTimeandMaterialById[0].Duration);
  $('#time_material_min_hours').val(GetWorkOrderTimeandMaterialById[0].MinHours);
  $('#time_material_max_hours').val(GetWorkOrderTimeandMaterialById[0].MaxHours);
  $('#time_material_cost_per_hour').val(GetWorkOrderTimeandMaterialById[0].CostPerHour);
  $('#time_and_material_scopeId').val(GetWorkOrderTimeandMaterialById[0].TimeAndMaterialScopeId);
  $('#time_material_discount_amount').val(GetWorkOrderTimeandMaterialById[0].DiscountOffered);
  $('#time_material_currency').val(GetWorkOrderTimeandMaterialById[0].Currency);
  // $('#time_material_currency').trigger('change');
  $('#btnAdd-time-material').html('Save');
}

function delete_timeandmaterial(TimeAndMaterialScopeId) {
  var WorkOrderId = $('#WorkOrderId').val();
  swal({
    title: "Delete",
    text: "Are you sure, Do you want to delete ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        var id = TimeAndMaterialScopeId;
        data = {
          "Method": "DeleteWorkOrderTimeandMaterialById",
          "Data": {
            "TimeAndMaterialScopeId": id,
            "Status": 1,
            "Message": ""
          }
        }
        var result = PostDataCall(data);
        swal({
          title: "Success!",
          text: "Deleted Successfully!",
          icon: "success",
          button: "ok!",
        })
        get_timeandmaterial(WorkOrderId);
      }
    })
}

function add_timeandmaterial() {

  var skillTagInput_time_material_array = $('#add-skill-tag-input-time-material').val();
  var skillTagInput_time_material_value = skillTagInput_time_material_array.join();

  var WorkOrderId = $('#WorkOrderId').val();
  let err = 0;
 
  if ($('#add-skill-tag-input-time-material').val() == '') {
    $(".add-skill-tag-input-time-material_error").html('This Field is required');
    err = 1;
  } else {
    $(".add-skill-tag-input-time-material_error").html('');
  }

  if ($('#time_material_duration').val() == '') {
    $(".time_material_duration_error").html('This Field is required');
    err = 1;
  } else {
    $(".time_material_duration_error").html('');
  }

  if ($('#time_material_min_hours').val() == '') {
    $(".time_material_min_hours_error").html('This Field is required');
    err = 1;
  } else {
    $(".time_material_min_hours_error").html('');
  }

  if ($('#time_material_max_hours').val() == '') {
    $(".time_material_max_hours_error").html('This Field is required');
    err = 1;
  } else {
    $(".time_material_max_hours_error").html('');
  }

  if ($('#time_material_cost_per_hour').val() == '') {
    $(".time_material_cost_per_hour_error").html('This Field is required');
    err = 1;
  } else {
    $(".time_material_cost_per_hour_error").html('');
  }

  if ($('#time_material_currency').val() == '') {
    $(".time_material_currency_error").html('This Field is required');
    err = 1;
  } else {
    $(".time_material_currency_error").html('');
  }
  
  if (err == 1) {
    return false;
  } else {
    var time_and_Material_ScopeId = $('#time_and_material_scopeId').val();
    //PostWorkOrderTimeandMaterial	@Token, @WorkOrderId, @ResourceTypeId, @NumberofResource, @Hours, @Allocatedperiod, @CostPerHour, @Status, @Message
    data = {
      "Method": "PostWorkOrderTimeandMaterial",
      "Data": {
        
        "Token": localStorage.getItem('securityToken'),
        "WorkOrderId": WorkOrderId,
        "TimeandMaterialScopeId": (time_and_Material_ScopeId == null || time_and_Material_ScopeId == '') ? null : time_and_Material_ScopeId,
        "Duration": $('#time_material_duration').val(),
        "MinHours": $('#time_material_min_hours').val(),
        "Maxours": $('#time_material_max_hours').val(),
        "CostPerHour": $('#time_material_cost_per_hour').val(),
        "Skills": skillTagInput_time_material_value,
        "CurrencyType" : $("#time_material_currency").val(),
        "DiscountOffered" : ($("#time_material_discount_amount").val() != "")?$("#time_material_discount_amount").val():null,
        "IsActive": 1,
        "Status": "",
        "Message": "",
      }
    }

    var postCall = PostDataCall(data);

    if (postCall['IsSuccess'] == true) {
      var swalEMRSucc = {
        title: 'Success!',
        text: postCall['Message'],
        icon: "success"
      }
      swal(swalEMRSucc);
      clear_timeandmaterial();
    } else {
      var swalEMRErr = {
        title: 'Warning!',
        text: postCall['Message'],
        icon: "error"
      }
      swal(swalEMRErr);
    }
  }
  get_timeandmaterial(WorkOrderId);
}

function get_timeandmaterial(WorkOrderId) {

  var timeMaterialval = JSON.stringify({
    "Token": localStorage.getItem('securityToken'),
    "WorkOrderId": WorkOrderId,
    "IsActive": 1
  });
  var GetWorkOrderTimeandMaterial = callgetlist('GetTimeAndMaterialScope', timeMaterialval);

  var GetWorkOrderTimeandMaterialHtml = GetWorkOrderTimeandMaterialHTMLTable(GetWorkOrderTimeandMaterial);

  var IsGetWorkOrderTimeandMaterialEmpty = isEmpty(GetWorkOrderTimeandMaterial);
  return IsGetWorkOrderTimeandMaterialEmpty
}

function GetWorkOrderTimeandMaterialHTMLTable(GetWorkOrderTimeandMaterial) {
  var manageRfpDataGrid = $("#DisplayWorkOrderTimeandMaterial")
    .dxDataGrid({
      filterRow: {
        visible: true,
        applyFilter: "auto",
      },
      dataSource: GetWorkOrderTimeandMaterial,
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
          caption: "Skills",
          dataField: "SkillName",
        },
        {
          caption: "Duration",
          dataField: "Duration",
        },
        {
          caption: "Minimum Hours",
          dataField: "MinHours",
        },
        {
          caption: "Maximum Hours",
          dataField: "MaxHours",
        },
        {
          caption: "Cost per hour",
          dataField: "CostPerHour",
        },
        {
          caption: "Action",
          dataField: "",
          width: "100",
          cellTemplate: function (container, options) {
     
            var TimeAndMaterialScopeId = options.data.TimeAndMaterialScopeId;
            var domActions = "";
            domActions += `<button class='btn btn-xs btn-primary edit-btn wo-tam-edit' onclick='edit_timeandmaterial("${TimeAndMaterialScopeId}")'><i class='fas fa-edit'></i></button>`
            domActions += `<button class='btn btn-xs btn-danger delete-btn wo-tam-delete' onclick='delete_timeandmaterial("${TimeAndMaterialScopeId}")'><i class="glyphicon glyphicon-trash"></button>`
            $("<div class='text-center'>")
              .append($(domActions))
              .appendTo(container);
            var clientSigned = localStorage.getItem('clientSigned');
            if (clientSigned == "true") {
              $('.wo-tam-edit').prop('disabled', true);
              $('.wo-tam-delete').prop('disabled', true);
            } else {
              $('.wo-tam-edit').prop('disabled', false);
              $('.wo-tam-delete').prop('disabled', false);
            }
          },
        },
      ],
    })
    .dxDataGrid("instance");
}


function clear_timeandmaterial() {
  $(".select2-selection__rendered li:not(:last-child)").remove();
  $(".addSkill-tag-input").val("");
  $('#btnAdd-time-material').html('Add');
  $('#time_material_duration').val('');
  $('#time_material_min_hours').val('');
  $('#time_material_max_hours').val('');
  $('#time_material_cost_per_hour').val('');
  $('#time_and_material_scopeId').val('');

  $(".time_material_duration_error").html('');
  $(".time_material_min_hours_error").html('');
  $(".time_material_max_hours_error").html('');
  $(".time_material_cost_per_hour_error").html('');

  $("#time_material_currency").val('');
  $("#time_material_discount_amount").val('');
  $(".time_material_currency_error").html('');
}

function add_package() {
  debugger;
  var package_scopeId = $('#package_scopeId').val();

  var skillTagInput_package_array = $('#add-skill-tag-input-package').val();
  var skillTagInput_package_value = skillTagInput_package_array.join();

  var WorkOrderId = $('#WorkOrderId').val();
  let err = 0;
  if ($('#add-skill-tag-input-package').val() == '') {
    $(".add-skill-tag-input-package_error").html('This Field is required');
    err = 1;
  } else {
    $(".add-skill-tag-input-package_error").html('');
  }

  if ($('#package_hours').val() == '') {
    $(".package_hours_error").html('This Field is required');
    err = 1;
  } else {
    $(".package_hours_error").html('');
  }

  if ($('#package_allocated_period option:selected').val() == 0) {
    $(".package_allocated_period_error").html('This Field is required');
    err = 1;
  } else {
    $(".package_allocated_period_error").html('');
  }

  if ($('#package_cost_per_hour').val() == '') {
    $(".package_cost_per_hour_error").html('This Field is required');
    err = 1;
  } else {
    $(".package_cost_per_hour_error").html('');
  }

  if ($('#package_currency').val() == '') {
    $(".package_currency_error").html('This Field is required');
    err = 1;
  } else {
    $(".package_currency_error").html('');
  }

  if (err == 1) {
    return false;
  } else {
    data = {
      //PostWorkOrderPackage	@Token, @WorkOrderId, @ResourceTypeId, @NumberofResource, @Hours, @Allocatedperiod,CostPerHour, @Status, @Message
      "Method": "PostWorkOrderPackage",
      "Data": {
        "Token": localStorage.getItem('securityToken'),
        "PackageScopeId": (package_scopeId == null || package_scopeId == '') ? null : package_scopeId,
        "WorkOrderId": WorkOrderId,
        "Hours": $('#package_hours').val(),
        "Duration": $('#package_allocated_period').val(),
        "Cost": $('#package_cost_per_hour').val(),
        "Skills": skillTagInput_package_value,
        "CurrencyType" : $("#package_currency").val(),
        "DiscountOffered" : ($("#package_discount_amount").val() != "")?$("#package_discount_amount").val():null,
        "IsActive": 1,
        "Status": "",
        "Message": "",
      }
    }


    var postCall = PostDataCall(data);
    if (postCall['IsSuccess'] == true) {
      var swalEMRSucc = {
        title: 'Success!',
        text: postCall['Message'],
        icon: "success"
      }
      swal(swalEMRSucc);
      clear_package();
    } else {
      var swalEMRErr = {
        title: 'Warning!',
        text: postCall['Message'],
        icon: "error"
      }
      swal(swalEMRErr);
    }
  }
  get_package(WorkOrderId);
}

function get_package(WorkOrderId) {

  //get Allocated Period 
  var filter_val_alloctedPeriod = JSON.stringify({ "Token": localStorage.getItem('securityToken'), "IsActive": 1 });
  var GetRetainerPeriod = callgetlist('GetRetainerPeriod', filter_val_alloctedPeriod);
  var select_allocated_period = document.getElementById("package_allocated_period");
  // Optional: Clear all existing options first:
  select_allocated_period.innerHTML = "";
  select_allocated_period.innerHTML += '<option value="0" selected>Select Duration</option>';
  // Populate list with options:
  for (var i = 0; i < GetRetainerPeriod.length; i++) {
    var opt = GetRetainerPeriod[i];
    select_allocated_period.innerHTML += "<option value=\"" + opt.Id + "\">" + opt.RetainerPeriod + "</option>";
  }

  //GetWorkOrderPackage	                    @Token, @WorkOrderId, @Status, @Message
  var filter_val = JSON.stringify({
    "Token": localStorage.getItem('securityToken'),
    "WorkOrderId": WorkOrderId,
  });
  var GetWorkOrderPackageById = callgetlist('GetWorkOrderPackage', filter_val);

  var IsGetWorkOrderPackage = isEmpty(GetWorkOrderPackageById);


  if (!IsGetWorkOrderPackage) {
    if (GetWorkOrderPackageById[0].PackageScopeId != null && GetWorkOrderPackageById[0].PackageScopeId != "") {
      // Skills
      var GetWorkOrderPackageSkillId = GetWorkOrderPackageById[0].SkillId;
      var GetWorkOrderPackageSkillIdArr = GetWorkOrderPackageSkillId.split(',');

      $('.addSkill-tag-input').val(GetWorkOrderPackageSkillIdArr);
      $('.addSkill-tag-input').trigger('change');
      $('#package_hours').val(GetWorkOrderPackageById[0].Hours);
      $('#package_allocated_period').val(GetWorkOrderPackageById[0].RetainerPeriodId);
      $('#package_cost_per_hour').val(GetWorkOrderPackageById[0].Cost);
      $('#package_scopeId').val(GetWorkOrderPackageById[0].PackageScopeId);
      $('#package_discount_amount').val(GetWorkOrderPackageById[0].DiscountOffered);
      $('#package_currency').val(GetWorkOrderPackageById[0].Currency);
      $('#package_currency').trigger('change');
    }
  }
  else {
    clear_package()
  }

}

function GetWorkOrderPackageHTMLTable(GetWorkOrderPackageHtml) {
  var manageRfpDataGrid = $("#DisplayWorkOrderPackage")
    .dxDataGrid({
      filterRow: {
        visible: true,
        applyFilter: "auto",
      },
      dataSource: GetWorkOrderPackageHtml,
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
          caption: "Skills Name",
          dataField: "SkillName",
        },
        {
          caption: "Hours",
          dataField: "Hours",
        },
        {
          caption: "Duration",
          dataField: "Duration",
        },
        {
          caption: "Cost per hour",
          dataField: "Cost",
        },
        {
          caption: "Action",
          dataField: "",
          width: "100",
          cellTemplate: function (container, options) {

            var PackageScopeId = options.data.PackageScopeId;
            var domActions = "";
            domActions += `<button class='btn btn-xs btn-primary edit-btn' onclick='edit_package("${PackageScopeId}")'><i class='fas fa-edit'></i></button>`
            domActions += `<button class='btn btn-xs btn-danger' onclick='delete_package("${PackageScopeId}")'><i class="glyphicon glyphicon-trash"></button>`
            $("<div class='text-center'>")
              .append($(domActions))
              .appendTo(container);
          },
        },
      ],
    })
    .dxDataGrid("instance");
}

function edit_package(PackageScopeId) {
  var filter_val = JSON.stringify({
    "Token": localStorage.getItem('securityToken'),
    "PackageScopeId": PackageScopeId
  });
  var GetWorkOrderPackageById = callgetlist('GetWorkOrderPackageById', filter_val);
  // Skills
  var GetWorkOrderPackageSkillId = GetWorkOrderPackageById[0].SkillId;
  var GetWorkOrderPackageSkillIdArr = GetWorkOrderPackageSkillId.split(',');

  $('.addSkill-tag-input').val(GetWorkOrderPackageSkillIdArr);
  $('.addSkill-tag-input').trigger('change');
  $('#package_hours').val(GetWorkOrderPackageById[0].Hours);
  $('#package_allocated_period').val(GetWorkOrderPackageById[0].Duration);
  $('#package_cost_per_hour').val(GetWorkOrderPackageById[0].Cost);
  $('#package_scopeId').val(GetWorkOrderPackageById[0].PackageScopeId);
  $('#package_discount_amount').val(GetWorkOrderPackageById[0].DiscountOffered);
  $('#package_currency').val(GetWorkOrderPackageById[0].Currency);
  $('#package_currency').trigger('change');
  $('#btnAdd-package').html('Save');

}

function delete_package(PackageScopeId) {
  var WorkOrderId = $('#WorkOrderId').val();
  swal({
    title: "Delete",
    text: "Are you sure, Do you want to delete ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        var id = PackageScopeId;
        data = {
          "Method": "DeleteWorkOrderPackageById",
          "Data": {
            "Token": localStorage.getItem('securityToken'),
            "RPackageScopeId": id,
            "Status": 1,
            "Message": ""
          }
        }
        var result = PostDataCall(data);
        swal({
          title: "Success!",
          text: "Deleted Successfully!",
          icon: "success",
          button: "ok!",
        })
        get_package(WorkOrderId);
      }
    })
}


function clear_package() {
  $(".select2-selection__rendered li:not(:last-child)").remove();
  $('#add-skill-tag-input-package').val('');
  $('#package_hours').val('');
  $('#package_allocated_period').val("0");
  $('#package_cost_per_hour').val('');
  $('#package_scopeId').val('');

  $('.add-skill-tag-input-package_error').html('');
  $('.package_hours_error').html('');
  $('.package_allocated_period_error').html('');
  $('.package_cost_per_hour_error').html('');
  $('#btnAdd-package').html('Add');
  $("#package_currency").val('');
  $("#package_discount_amount").val('');
  $(".package_currency_error").html('');
}

function g2techAbsorptionPercentage(g2tech) {
  var client = document.getElementById('client_percentage');
  client.value = 100 - g2tech.value;
}

function clientAbsorptionPercentage(client) {
  var g2tech = document.getElementById('g2tech_percentage');
  g2tech.value = 100 - client.value;
}

function add_rnd() {

  var RnDScopeId = $('#RnDScopeId').val();

  var skillTagInput_RnD_array = $('#add-skill-tag-input-r-d').val();
  var skillTagInput_RnD_value = skillTagInput_RnD_array.join();

  var WorkOrderId = $('#WorkOrderId').val();
  let err = 0;

  if ($('#add-skill-tag-input-r-d').val() == '') {
    $('.add-skill-tag-input-r-d_error').html('This Field is required');
    err = 1;
  } else {
    $('.add-skill-tag-input-r-d_error').html('');
  }

  if ($('#g2tech_percentage').val() == '') {
    $('.g2tech_percentage_error').html('This Field is required');
    err = 1;
  } else {
    $('.g2tech_percentage_error').html('');
  }

  if ($('#client_percentage').val() == '') {
    $('.client_percentage_error').html('This Field is required');
    err = 1;
  } else {
    $('.client_percentage_error').html('');
  }

  if ($('#randd_duration').val() == '') {
    $('.randd_duration_error').html('This Field is required');
    err = 1;
  } else {
    $('.randd_duration_error').html('');
  }

  if ($('#randd_max_hours_allowed').val() == '') {
    $('.randd_max_hours_allowed_error').html('This Field is required');
    err = 1;
  } else {
    $('.randd_max_hours_allowed_error').html('');
  }

  if ($('#randd_cost_per_hour').val() == '') {
    $('.randd_cost_per_hour_error').html('This Field is required');
    err = 1;
  } else {
    $('.randd_cost_per_hour_error').html('');
  }

  if ($('#randd_currency').val() == '') {
    $(".randd_currency_error").html('This Field is required');
    err = 1;
  } else {
    $(".randd_currency_error").html('');
  }

  if (err == 1) {
    return false;
  } else {
    //PostWorkOrderRandD	            @Token, @ResourceTypeId, @NumberofResource, @Hours, @Status, @Message
    data = {
      "Method": "PostWorkOrderRandD",
      "Data": {
        "Token": localStorage.getItem('securityToken'),
        "RnDScopeId": (RnDScopeId == null || RnDScopeId == '') ? null : RnDScopeId,
        "WorkOrderId": WorkOrderId,
        "G2tech": $('#g2tech_percentage').val(),
        "Client": $('#client_percentage').val(),
        "Duration": $('#randd_duration').val(),
        "MaxHours": $('#randd_max_hours_allowed').val(),
        "Rate": $('#randd_cost_per_hour').val(),
        "Skills": skillTagInput_RnD_value,
        "CurrencyType" : $("#randd_currency").val(),
        "DiscountOffered" : ($("#randd_discount_amount").val() != "")?$("#randd_discount_amount").val():null,
        "IsActive": 1,
        "Status": "",
        "Message": "",
      }
    }

    var postCall = PostDataCall(data);
    if (postCall['IsSuccess'] == true) {
      var swalEMRSucc = {
        title: 'Success!',
        text: postCall['Message'],
        icon: "success"
      }
      swal(swalEMRSucc);
      if (postCall['Data'].length == 1) {
        var RnDScopeId = (postCall['Data'][0]['RnDScopeId']);
        $("#RnDScopeId").val(RnDScopeId);
      }
    } else {
      var swalEMRErr = {
        title: 'Warning!',
        text: postCall['Message'],
        icon: "error"
      }
      swal(swalEMRErr);
    }
  }
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function get_rnd(WorkOrderId) {
  //GetWorkOrderRandD @Token, @WorkOrderId, @Status, @Message
  var filter_val = JSON.stringify({
    "Token": localStorage.getItem('securityToken'),
    "WorkOrderId": WorkOrderId
  });
  var GetWorkOrderRandD = callgetlist('GetWorkOrderRandD', filter_val);

  var IsGetWorkOrderRandD = isEmpty(GetWorkOrderRandD);

  if (!IsGetWorkOrderRandD) {
    if (GetWorkOrderRandD[0].RnDScopeId != null && GetWorkOrderRandD[0].RnDScopeId != "") {
      // Skills
      var GetWorkOrderRandDkillId = GetWorkOrderRandD[0].SkillId;
      var GetWorkOrderRandDSkillIdArr = GetWorkOrderRandDkillId.split(',');
      $('.addSkill-tag-input').val(GetWorkOrderRandDSkillIdArr);
      $('.addSkill-tag-input').trigger('change');
      $("#g2tech_percentage").val(GetWorkOrderRandD[0].G2tech);
      $("#client_percentage").val(GetWorkOrderRandD[0].Client);
      $("#randd_duration").val(GetWorkOrderRandD[0].Duration);
      $("#randd_max_hours_allowed").val(GetWorkOrderRandD[0].MaxHours);
      $("#randd_cost_per_hour").val(GetWorkOrderRandD[0].Cost);
      $("#RnDScopeId").val(GetWorkOrderRandD[0].RnDScopeId);
      $("#randd_currency").val(GetWorkOrderRandD[0].Currency);
      $("#randd_currency").trigger('change');
      $("#randd_discount_amount").val(GetWorkOrderRandD[0].DiscountOffered);
    }
  }
  else {
    clear_rnd();
  }

  GetWorkOrderRandDHTMLTable(GetWorkOrderRandD);
}
function GetWorkOrderRandDHTMLTable(GetWorkOrderRandD) {

  var manageRfpDataGrid = $("#class_randd_div_grid")
    .dxDataGrid({
      filterRow: {
        visible: true,
        applyFilter: "auto",
      },
      //dataSource: data,
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
      ],
    })
    .dxDataGrid("instance");
}

function clear_rnd() {
  $(".select2-selection__rendered li:not(:last-child)").remove();
  $(".addSkill-tag-input").val("");
  $('#g2tech_percentage').val("");
  $('#client_percentage').val("");
  $('#randd_duration').val("");
  $('#randd_max_hours_allowed').val("");
  $('#randd_cost_per_hour').val("");
  $('#RnDScopeId').val("");

  $('.add-skill-tag-input-r-d_error').html('');
  $('.g2tech_percentage_error').html('');
  $('.client_percentage_error').html('');
  $('.randd_duration_error').html('');
  $('.randd_max_hours_allowed_error').html('');
  $('.randd_cost_per_hour_error').html('');
  $("#randd_currency").val('');
  $("#randd_discount_amount").val('');
  $(".randd_currency_error").html('');
}

function clear_allProjectTypesFields() {
  // $('#WorkOrderModelbox').modal('hide');$('body').removeClass('modal-open');$('.modal-backdrop').remove();
  clear_retainer();
  clear_package();
  clear_timeandmaterial();
  clear_rnd();
}

function workorder_clause_import_Modal() {
  $('#workorder_clause_import_Modal').modal('show');
}

function add_workorder_clause() {


  var getDataLength = $("#owo_workorder_clause").val();
  // var owo_workorder_clause = $('#owo_workorder_clause').val();
  var err = 0;

  if (getDataLength == "" || getDataLength == 0) {
    $(".workorder_clause_err").html('This Field is required');
    err = 1;
  } else {
    $(".workorder_clause_err").html('');
  }

  if (err == 1) {
    return false;
  } else {
    data = {
      "Method": "PostWorkOrderClause",
      "Data": {
        "Token": localStorage.getItem('securityToken'),
        "Note": getDataLength,
        "IsActive": 1,
        "Status": "",
        "Message": "",
      }
    }

    var postCall = PostDataCall(data);
    if (postCall['IsSuccess'] == true) {
      var swalEMRSucc = {
        title: 'Success!',
        text: postCall['Message'],
        icon: "success"
      }
      swal(swalEMRSucc);
      // clear_workorder_clause();
    } else {
      var swalEMRErr = {
        title: 'Warning!',
        text: postCall['Message'],
        icon: "error"
      }
      swal(swalEMRErr);
    }
  }
  $('#workorder_clause_import_Modal').modal('hide');
  $('#owo_workorder_clause').val('');
  open_Work_Order_Content_Import_Modal();
}

function close_workOrderModel() {
  $('#WorkOrderModelbox').smartWizard('reset');
  $('#WorkOrderModelbox').modal('hide'); $('body').removeClass('modal-open'); $('.modal-backdrop').remove();
  comment_data_dxEditor.option("value", '');
  $("#owo_project_notes").dxHtmlEditor('instance').option('value', "");
  $("#owo_project_name").val("");
  $("#WorkOrderId").val("");
  $("#owo_client_name").val("");
  $("#owo_proposal_id").val("");
  $("#owo_client_id").val("");
  $("#owo_development_hours").html("");
  $("#wo_ProjectPhase").html("");
  $("#WO_RFPICode").html("");
  $('#is_client_signed').prop('checked', false);
  $("#is_client_signed").prop('disabled', true)

  $('#WorkOrderModelbox:input').each(function() {
    $(this).val('');
});
  clear_allProjectTypesFields();
  GetProposalsForWo();

}
  
  function objectFindByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
    return null;
  }

  function get_GetWorkOrderNotesandCommercialTerms(ProposalId) {

    // GetWorkOrderNotesandCommercialTerms	    @Token, @WorkOrderId, @IsActive
    var filter_val = JSON.stringify({
      "WorkOrderId": ProposalId,
      "Isactive": true
    });
    GetWorkOrderNotesandCommercialTerms = callgetlist('GetWorkOrderNotesandCommercialTerms', filter_val);
    UserId = localStorage.getItem("EmployeeID");
    // GetProposalsForWO @Token, @UserId, @IsActive
    var data = JSON.stringify({
      "UserId": UserId,
      "IsActive": 1
    });
    var GetProposalsForWorkOrder = callgetlist('GetProposalsForWO', data);
    function objectFindByKey(array, key, value) {
      for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
          return array[i];
        }
      }
      return null;
    }

    var result_object = objectFindByKey(GetProposalsForWorkOrder, 'ProposalId', ProposalId);

  }

  function GetWorkOrderNotesandCommercialTermsDHTMLTable(GetWorkOrderNotesandCommercialTerms) {
    var html = "";
    //if (GetWorkOrderNotesandCommercialTerms.length == 0) {
    if (GetWorkOrderNotesandCommercialTerms == null) {
      html += "<tr colspan='4'><td>No Data Found.!</td></tr>";
    } else {
      GetWorkOrderNotesandCommercialTerms.forEach(function (key, item) {
        //CKEDITOR.instances.comment_data.setData(key.Description);

      });
    }
    return html;
  }


  function open_Work_Order_Content_Import_Modal() {
    $('#workorder_content_import_Modal').modal('show');
    var filter_val = JSON.stringify({ "Token": localStorage.getItem('securityToken'), "IsActive": true });
    var GetWorkOrderClauses = callgetlist('GetWorkOrderClauses', filter_val);
    $('#content-1').html("");
    GetWorkOrderClauses.forEach((element) => {
      $('#content-1').append('<label class="container"><p>' + element.WorkOrderClause + '</p><input type="checkbox" class="notes_checkbox" value="<P>' + element.WorkOrderClause + '</P>"><span class="checkmark"></span></label>');
    });
  }

  function generateProposalsPdf() {
 
    generateThePdf();

    var win = window.open('', 'printwindow');
    win.document.body.innerHTML = '';
    //To save default file name
    var proposal_document_name = $('#owo_project_name').val();
    var proposal_client_name = $('#owo_client_name').val();
    var WOsignedDate = $("#ptowo_planned_start_date").dxDateBox('instance').option('value');
    var ExpectedStartDate = $("#ptowo_planned_start_date").dxDateBox('instance').option('value');
    var tempTitle = proposal_document_name + "/" + proposal_client_name;
    var myjs = '<script src="./js/library/jquery-1.11.1.min.js"></script>';
    win.document.write(myjs + $("#pdf_contents").html());
    //To save default file name
    win.document.title = tempTitle;
  }

  //Onclick of Preview button for PDF generate values
  function generateThePdf() {

    let WOID = $("#WorkOrderId").val();

    UserId = localStorage.getItem("EmployeeID");
    // GetProposalsForWO @Token, @UserId, @IsActive
    var data = JSON.stringify({
      "UserId": UserId,
      "IsActive": 1
    });
    var GetProposalsForWO = callgetlist('GetProposalsForWO', data);
    function objectFindByKey(array, key, value) {
      for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
          return array[i];
        }
      }
      return null;
    }

    if($('#owo_proposal_id').val() && $('#owo_proposal_id').val() != '') {
      var fil_val = JSON.stringify({
        "UserId": UserId,
        "RecordId ": $('#owo_proposal_id').val(),
        "IsActive": 1
      });
      var GetProposalsForWOByIdForPdf = callgetlist('GetProposalsForWObyID', fil_val);
    }
    else {
      var fil_val1 = JSON.stringify({
        "UserId": UserId,
        "WorkrderId": WOID,
      });
      var GetProposalsForWOByIdForPdf = callgetlist('GetProposalsForWithoutRfpWObyID', fil_val1);
    }
    // var result_obj = objectFindByKey(GetProposalsForWO, 'ProposalId', ProposalId);
    var result_obj = GetProposalsForWOByIdForPdf[0];
    console.log(result_obj);
    var Project_Type = $('#ProjectType_name').val();
    var Development_Hours = $('#owo_development_hours').html();
    $("#Project_Type").html(Project_Type);
    $("#Development_Hours").html(Development_Hours);

    $("#proposalID").html(ProposalId);
    $(".pdf_proposal_client_name").html($('#owo_client_name').val());
    $(".pdf_proposal_wo_signedDate").html(
      (result_obj.WOsignedDate != "1900-01-01T00:00:00" && result_obj.WOsignedDate != null ) ? GetFormattedDate(result_obj.WOsignedDate) : WOsignedDate
    );
    $(".pdf_proposal_wo_expectedDate").html(
      (result_obj.ExpectedStartDate != "1900-01-01T00:00:00" && result_obj.ExpectedStartDate != null) ? GetFormattedDate(result_obj.ExpectedStartDate) : ExpectedStartDate
    );
    // result_obj.forEach(function (key, item) {
      $(".pdf_proposal_notes").html(result_obj.Notes);
    // });
    $(".pdf_proposal_projectName").html($('#owo_project_name').val());
    /** General deatils **/
    var filter_val = JSON.stringify({
      IsActive: true,
      ProposalId: ProposalId,
    });
    var result = callgetlist("GetEstimateRFPDetails", filter_val);
    if(result.length > 0) {
      $("#assignedto").html(result[0].AssignedToID);
      $("#RFPICode").html(result[0].RFPICode);
    }
  }

  $('#import_workorder_content').on('click', function () {
    var getdata = comment_data_dxEditor.option("value");
    var html = "";
    html += getdata;
    $('.notes_checkbox').each(function () {
        if ($(this).is(':checked'))
            html += $(this).val();
    });
    //CKEDITOR.instances['editor1'].setData(html)
    comment_data_dxEditor.option("value", html);
    $('.notes_checkbox').prop("checked", false);
    $('#select_all').prop("checked", false);
});



  $(document).ready(function () {
    $('#select_all').on('click', function () {
      if (this.checked) {
        $('.notes_checkbox').each(function () {
          this.checked = true;
        });
      } else {
        $('.notes_checkbox').each(function () {
          this.checked = false;
        });
      }
    });

    $('.notes_checkbox').on('click', function () {
      if ($('.notes_checkbox:checked').length == $('.notes_checkbox').length) {
        $('#select_all').prop('checked', true);
      } else {
        $('#select_all').prop('checked', false);
      }
    });
  });

  function calculate_amount(ths){
    var total = $("#total_value").val();
    var discount_amount = $("#fixedbid_discount_amount").val();
    var netamount = parseInt(total - discount_amount);
    $("#net_closure_value").val(netamount);
  }
