// function getWorkorderListTable() {
//     $('.error_message').html("");
//     $('input[type=text]').removeClass("required_field");
//     $('select').removeClass("required_field");
//     $('textarea').removeClass("required_field");
//     var EmployeeID = localStorage.getItem("EmployeeID");
//     var filter_val = JSON.stringify({
//       "IsActive": true,
//       "UserId": EmployeeID
//     });

//     //var GetProposals = callgetlist('GetActiveRFP');
//     var GetProposals = callgetlist('GetRFPsToAssign');
//     //console.log(GetProposals);
//     var ProposalListHtml = workorderListcomputeHTMLTable(GetProposals);
//     $('#DisplayWorkOrderListTable').html(ProposalListHtml);
//   }

//   /** added by praveen */
//   function workorderListcomputeHTMLTable(GetProposals) {

//     var html = "";
//     if (GetProposals.length == 0) {
//       html += "<tr colspan='6'><td>No Data Found.!</td></tr>";
//     } else {
//       var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//       GetProposals.forEach(function (key, item) {
//        /*  data = {
//           "RRFNo": key.RRFNo,
//           "Client": key.Client,
//           "Project_Title": key.Project_Title,
//           "Project_Title": key.Project_Title, 
//           "Department": key.Department ,
//          }; */
//         sno = item + 1;
//         ProposalId = key.ProposalId;
//         stageNumber = key.Order;     
//         var proposal_date = new Date(key.RFPDate),
//           yr = proposal_date.getFullYear(),
//           month = proposal_date.getMonth() < 10 ? '0' + proposal_date.getMonth() : proposal_date.getMonth(),
//           day = proposal_date.getDate() < 10 ? '0' + proposal_date.getDate() : proposal_date.getDate(),
//           monthName =  months[month - 1];
//           newproposalDate = day + '-' + monthName + '-' + yr;
//         html += "<tr class='row_" + item + "' id='row_" + ProposalId + "'>";
//         html += "<td>" + sno + "</td>";
//         html += "<td>" + key.RRFNo + "</td>";
//         html += "<td>" + newproposalDate + "</td>";
//         html += "<td>" + key.BDEName + "</td>";
//         html += "<td>" + key.Client + "</td>";
//         html += "<td>" + key.Project_Title + "</td>";
//         html += "<td><button class='btn btn-xs btn-primary edit-btn' onclick=openAssignProposalModel();><i class='fas fa-user-plus'></i></button>"
//         html += "<button class='btn btn-xs btn-primary edit-btn' onclick=openManageProposalModel();><i class='fas fa-chalkboard-teacher'></i></button>"
//         html += "<button class='btn btn-xs btn-primary edit-btn' onclick=openWorkOrderModelDialog("+key.RRFNo+");><i class='fas fa-building'></i></button>"
//         html += "</tr>";
//       });
//       //"+JSON.stringify(key)+"

//     }

//     return html;
//   }

$('#WO_ProposalRfplist').change(function () {
  var Rfpid = $(this).val();
  //var Rfpid = '5818';
  var filter_val = JSON.stringify({
    "RFPId": Rfpid
  });
  var result = callgetlist('GetRFPDetailsByRFPId', filter_val);
  //console.log(result);
  if (result.length > 0) {
    var response = result[0];
    $('#client-name').val(response.ClientName);
    $('#address').val(response.Address);
    $('#clientId').val(response.ClientId);
    $('#RfpIdNo').val(response.RRFNo);

    DbDate = response.Date;
    FormatDate = DbDate.split('T')[0];

    var from = FormatDate.split("-");
    var m = from[1];
    var d = from[2];
    var y = from[0];

    var pdate = new Date(y, m, d);

    var date = new Date(FormatDate)
    yr = date.getFullYear(),
      month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
      day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
      newDate = yr + '-' + month + '-' + day;

    //$("#proposalDate").datepicker().datepicker("setDate", pdate);
    $("#proposalDate").val(y + "-" + m + "-" + d)

    // Api Call for get Contact person based on client id 445 //
    //GetContactPersons(response.ContactPersonId, "contact-person") // Temporary solution 
    // Api Call for get Contact person based on client id 445 //
    //$("#contact-person").val(response.ContactPersonId);
    $("#contact-person").val(response.ContactPerson);
  } else {
    //console.log("Some error occar in ProposalRfplist change function.");
  }

});

function add_retainer() {
  var WorkOrderId = $('#WorkOrderId').val();
  let err = 0;
  if ($("#owo_resource_type").val() == "") {
    $(".owo_resource_type_error").html('This Field is required');
    err = 1;
  } else {
    $(".owo_resource_type_error").html('');
  }
  if ($("#owo_no_of_resources").val() == "") {
    $(".owo_no_of_resources_error").html('This Field is required');
    err = 1;
  } else {
    $(".owo_no_of_resources_error").html('');
  }
  if ($("#owo_utilization").val() == "") {
    $(".owo_utilization_error").html('This Field is required');
    err = 1;
  } else {
    $(".owo_utilization_error").html('');
  }
  if ($("#owo_hours").val() == "") {
    $(".owo_hours_error").html('This Field is required');
    err = 1;
  } else {
    $(".owo_hours_error").html('');
  }
  if ($("#owo_allocated_period").val() == "") {
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
  if ($('input[name="onweekend"]:checked').length == 0) {
    $(".onweekend_error").html('This Field is required');
    err = 1;
  } else {
    $(".onweekend_error").html('');
  }

  if (err == 1) {
    return false;
  } else {
    data = {
      "Method": "PostWorkOrderRetainer",
      "Data": {
        "WorkOrderId": WorkOrderId,
        "ResourceTypeId": $("#owo_resource_type").val(),
        "NumberofResource": $("#owo_no_of_resources").val(),
        "Utilization": $("#owo_utilization").val(),
        "Hours": $("#owo_hours").val(),
        "AllocatedPeriodId": $("#owo_allocated_period").val(),
        "AdditionalHoursId": $('#additional_hours').val(),
        "WorkOnWeekEndId": $('#onweekend').val(),
      }
    }

    var postCall = PostDataCall(data);
    //console.log(postCall);
    if (postCall['IsSuccess'] == true) {
      //console.log(postCall['Message']);
    } else {
      //console.log(postCall['Message']);
    }
  }
  get_retainer(WorkOrderId);
}

function get_retainer(WorkOrderId) {
  // GetWorkOrderRetainer	        @Token, @WorkOrderId, @Status, @Message
  var filter_val = JSON.stringify({
    "WorkOrderId": WorkOrderId,
    "status": 1,
    "Message": ""
  });
  var GetWorkOrderRetainer = callgetlist('GetWorkOrderRetainer', filter_val);
  //var GetWorkOrderRetainerHtml = GetWorkOrderRetainerHTMLTable(GetWorkOrderRetainer);
  //$('#DisplayWorkOrderRetainer').html(GetWorkOrderRetainerHtml);
  GetWorkOrderRetainerHTMLTable(GetWorkOrderRetainer);
}
function GetWorkOrderRetainerHTMLTable(GetWorkOrderRetainer) {
  var manageRfpDataGrid = $("#DisplayWorkOrderRetainer")
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
          caption: "Resource Type",
          dataField: "",
        },
        {
          caption: "Nos",
          dataField: "",
        },
        {
          caption: "Resource Allocation",
          dataField: "",
        },
        {
          caption: "Allocation",
          dataField: "",
        },
        {
          caption: "Rate per men/hr in $",
          dataField: "",
        },
      ],
    })
    .dxDataGrid("instance");

}

function clear_retainer() {
  $(".owo_resource_type_error").html('');
  $(".owo_no_of_resources_error").html('');
  $(".owo_utilization_error").html('');
  $(".owo_hours_error").html('');
  $(".owo_allocated_period_error").html('');
  $(".hrs_prior_allowed_error").html('');
  $(".onweekend_error").html('');

  $("#owo_resource_type").val('');
  $("#owo_no_of_resources").val('');
  $("#owo_utilization").val('');
  $("#owo_hours").val('');
  $("#owo_allocated_period").val('');
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
      //console.log(postCall['Message']);
    } else {
      alert(postCall['Message']);
      //console.log(postCall['Message']);
    }
  }
  get_fixedbid(WorkOrderId);

}

function get_fixedbid(WorkOrderId) {
  //GetWorkOrderFixedBid	        @Token, @WorkOrderId, @Status, @Message
  var filter_val = JSON.stringify({
    "WorkOrderId": WorkOrderId,
    "status": 1,
    "Message": ""
  });
  var GetWorkOrderFixedBid = callgetlist('GetWorkOrderFixedBid', filter_val);
  //var GetWorkOrderFixedBidHtml = GetWorkOrderFixedBidHTMLTable(GetWorkOrderFixedBid);
  //$('#DisplayWorkOrderFixedBid').html(GetWorkOrderFixedBidHtml);
  GetWorkOrderFixedBidHTMLTable(GetWorkOrderFixedBid);
}
function GetWorkOrderFixedBidHTMLTable(GetWorkOrderFixedBid) {
  var manageRfpDataGrid = $("#DisplayWorkOrderFixedBid")
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
          caption: "Project Phases",
          dataField: "",
        },
        {
          caption: "Man",
          dataField: "",
        },
      ],
    })
    .dxDataGrid("instance");

}

function clear_fixedbid() {
  $(".fixedbit_minimum_hours_error").html('');
  $(".fixed_cost_per_hr_error").html('');
  $('#fixedbit_minimum_hours').val('');
  $('#fixed_cost_per_hr').val('');
}

function add_timeandmaterial() {
  var WorkOrderId = $('#WorkOrderId').val();
  let err = 0;
  if ($('#time_material_resource_type').val() == '') {
    $(".time_material_resource_type_error").html('This Field is required');
    err = 1;
  } else {
    $(".time_material_resource_type_error").html('');
  }

  if ($('#time_no_of_resources').val() == '') {
    $(".time_no_of_resources_error").html('This Field is required');
    err = 1;
  } else {
    $(".time_no_of_resources_error").html('');
  }

  if ($('#time_material_hours').val() == '') {
    $(".time_material_hours_error").html('This Field is required');
    err = 1;
  } else {
    $(".time_material_hours_error").html('');
  }

  if ($('#time_material_allocated_period').val() == '') {
    $(".time_material_allocated_period_error").html('This Field is required');
    err = 1;
  } else {
    $(".time_material_allocated_period_error").html('');
  }

  if ($('#time_material_cost_per_hour').val() == '') {
    $(".time_material_cost_per_hour_error").html('This Field is required');
    err = 1;
  } else {
    $(".time_material_cost_per_hour_error").html('');
  }

  if (err == 1) {
    return false;
  } else {
    //PostWorkOrderTimeandMaterial	@Token, @WorkOrderId, @ResourceTypeId, @NumberofResource, @Hours, @Allocatedperiod, @CostPerHour, @Status, @Message
    data = {
      "Method": "PostWorkOrderTimeandMaterial",
      "Data": {
        "WorkOrderId": "B47A05B0-3339-4E8A-BC87-39205B4EBC77",
        "ResourceTypeId": $('#time_material_resource_type').val(),
        "NumberofResource": $('#time_no_of_resources').val(),
        "Hours": $('#time_material_hours').val(),
        "Allocatedperiod": $('#time_material_allocated_period').val(),
        "CostPerHour": $('#time_material_cost_per_hour').val()
      }
    }
    var postCall = PostDataCall(data);
    //console.log(postCall);
    if (postCall['IsSuccess'] == true) {
      //console.log(postCall['Message']);
    } else {
      alert(postCall['Message']);
      //console.log(postCall['Message']);
    }
  }

  get_timeandmaterial(WorkOrderId);
}

function get_timeandmaterial(WorkOrderId) {
  //GetWorkOrderTimeandMaterial	    @Token, @WorkOrderId, @Status, @Message
  var filter_val = JSON.stringify({
    "WorkOrderId": WorkOrderId,
    "status": 1,
    "Message": ""
  });
  var GetWorkOrderTimeandMaterial = callgetlist('GetWorkOrderTimeandMaterial', filter_val);
  var GetWorkOrderTimeandMaterialHtml = GetWorkOrderTimeandMaterialHTMLTable(GetWorkOrderTimeandMaterial);
  //  $('#DisplayWorkOrderTimeandMaterial').html(GetWorkOrderTimeandMaterialHtml);
  renderManageRFPGrid(GetProposals);
}

function GetWorkOrderTimeandMaterialHTMLTable(GetWorkOrderTimeandMaterial) {
  var manageRfpDataGrid = $("#DisplayWorkOrderTimeandMaterial")
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
          caption: "Resource Type",
          dataField: "",
        },
        {
          caption: "Nos",
          dataField: "",
        },
        {
          caption: "Resource Allocation",
          dataField: "",
        },
        {
          caption: "Allocation",
          dataField: "",
        },
        {
          caption: "Rate per men(hours in USD)",
          dataField: "",
        },
      ],
    })
    .dxDataGrid("instance");
}


function clear_timeandmaterial() {

  $("#time_material_resource_type").val('');
  $('#time_no_of_resources').val('');
  $('#time_material_hours').val('');
  $('#time_material_allocated_period').val('');
  $('#time_material_cost_per_hour').val();
  $(".time_material_resource_type_error").html('');
  $('.time_no_of_resources_error').html('');
  $('.time_material_hours_error').html('');
  $('.time_material_allocated_period_error').html('');
  $('.time_material_cost_per_hour_error').html('');
}

function add_package() {
  var WorkOrderId = $('#WorkOrderId').val();
  let err = 0;
  if ($('#package_resource_type').val() == '') {
    $(".package_resource_type_error").html('This Field is required');
    err = 1;
  } else {
    $(".package_resource_type_error").html('');
  }

  if ($('#package_no_of_resources').val() == '') {
    $(".package_no_of_resources_error").html('This Field is required');
    err = 1;
  } else {
    $(".package_no_of_resources_error").html('');
  }

  if ($('#package_hours').val() == '') {
    $(".package_hours_error").html('This Field is required');
    err = 1;
  } else {
    $(".package_hours_error").html('');
  }

  if ($('#package_allocated_period').val() == '') {
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

  if (err == 1) {
    return false;
  } else {
    data = {
      //PostWorkOrderPackage	@Token, @WorkOrderId, @ResourceTypeId, @NumberofResource, @Hours, @Allocatedperiod,CostPerHour, @Status, @Message
      "Method": "PostWorkOrderPackage",
      "Data": {
        "WorkOrderId": WorkOrderId,
        "ResourceTypeId": $('#package_resource_type').val(),
        "NumberofResource": $('#package_no_of_resources').val(),
        "Allocatedperiod": $('#package_allocated_period').val(),
        "Hours": $('#package_hours').val(),
        "CostPerHour": $('#package_cost_per_hour').val(),
      }
    }

    var postCall = PostDataCall(data);
    //console.log(postCall);
    if (postCall['IsSuccess'] == true) {
      //console.log(postCall['Message']);
    } else {
      alert(postCall['Message']);
      //console.log(postCall['Message']);
    }
  }
  get_package(WorkOrderId);
}

function get_package(WorkOrderId) {
  //GetWorkOrderPackage	                    @Token, @WorkOrderId, @Status, @Message
  var filter_val = JSON.stringify({
    "WorkOrderId": WorkOrderId,
    "status": 1,
    "Message": ""
  });
  var GetWorkOrderPackage = callgetlist('GetWorkOrderPackage', filter_val);
  //var GetWorkOrderPackageHtml = GetWorkOrderPackageHTMLTable(GetWorkOrderPackage);
  //$('#DisplayWorkOrderPackage').html(GetWorkOrderPackageHtml);
  GetWorkOrderPackageHTMLTable(GetWorkOrderPackage);
}

function GetWorkOrderPackageHTMLTable(GetWorkOrderPackageHtml) {
  var manageRfpDataGrid = $("#DisplayWorkOrderPackage")
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
          caption: "Resource Type",
          dataField: "",
        },
        {
          caption: "Nos",
          dataField: "",
        },
        {
          caption: "Resource Allocation",
          dataField: "",
        },
        {
          caption: "Allocation",
          dataField: "",
        },
        {
          caption: "Rate per men(hours in USD)",
          dataField: "",
        },
      ],
    })
    .dxDataGrid("instance");
}



function clear_package() {
  $('#package_resource_type').val('');
  $('#package_no_of_resources').val('');
  $('#package_hours').val('');
  $('#package_allocated_period').val('');
  $('#package_cost_per_hour').val('');

  $('.package_resource_type_error').html('');
  $('.package_no_of_resources_error').html('');
  $('.package_hours_error').html('');
  $('.package_allocated_period_error').html('');
  $('.package_cost_per_hour_error').html('');
}

function add_rnd() {
  var WorkOrderId = $('#WorkOrderId').val();
  let err = 0;

  if ($('#rnd_resource_type').val() == '') {
    $('.rnd_resource_type_error').html('This Field is required');
    err = 1;
  } else {
    $('.rnd_resource_type_error').html('');
  }

  if ($('#rnd_no_of_resources').val() == '') {
    $('.rnd_no_of_resources_error').html('This Field is required');
    err = 1;
  } else {
    $('.rnd_no_of_resources_error').html('');
  }
  if ($('#rnd_max_hours').val() == '') {
    $('.rnd_max_hours_error').html('This Field is required');
    err = 1;
  } else {
    $('.rnd_max_hours_error').html('');
  }
  if (err == 1) {
    return false;
  } else {
    //PostWorkOrderRandD	            @Token, @ResourceTypeId, @NumberofResource, @Hours, @Status, @Message
    data = {
      "Method": "PostWorkOrderRandD",
      "Data": {
        "ResourceTypeId": $('#rnd_resource_type').val(),
        "NumberofResource": $('#rnd_no_of_resources').val(),
        "Hours": $('#rnd_max_hours').val(),
      }
    }

    var postCall = PostDataCall(data);
    //console.log(postCall);
    if (postCall['IsSuccess'] == true) {
      //console.log(postCall['Message']);
    } else {
      alert(postCall['Message']);
      //console.log(postCall['Message']);
    }
  }
  get_rnd(WorkOrderId);
}

function get_rnd(WorkOrderId) {
  //GetWorkOrderRandD @Token, @WorkOrderId, @Status, @Message
  var filter_val = JSON.stringify({
    "WorkOrderId": WorkOrderId,
    "status": 1,
    "Message": ""
  });
  var GetWorkOrderRandD = callgetlist('GetWorkOrderRandD', filter_val);
  //var GetWorkOrderRandDHtml = GetWorkOrderRandDHTMLTable(GetWorkOrderRandD);
  //$('#DisplayWorkOrderRandD').html(GetWorkOrderRandDHtml);
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
  $('#rnd_resource_type').val('');
  $('#rnd_no_of_resources').val('');
  $('#rnd_max_hours').val('');
  $('.rnd_resource_type_error').html('');
  $('.rnd_no_of_resources_error').html('');
  $('.rnd_max_hours_error').html('');

}


function get_GetWorkOrderNotesandCommercialTerms(WorkOrderId) {
  //console.log("!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_");
  //console.log("WorkOrderId" + "  " + WorkOrderId );
  //console.log("!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_");

  //GetWorkOrderNotesandCommercialTerms	    @Token, @WorkOrderId, @IsActive
  //console.log(WorkOrderId);
  var filter_val = JSON.stringify({
    "WorkOrderId": WorkOrderId,
    "Isactive": true
  });
  GetWorkOrderNotesandCommercialTerms = callgetlist('GetWorkOrderNotesandCommercialTerms', filter_val);
  var GetWorkOrderNotesandCommercialTerms = GetWorkOrderNotesandCommercialTermsDHTMLTable(GetWorkOrderNotesandCommercialTerms);
  $('#DisplayWorkOrderNotesandCommercialTerms').html(GetWorkOrderNotesandCommercialTerms);
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

