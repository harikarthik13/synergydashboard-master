$(document).ready(function () {
  getUserMapList();
});

function getUserMapList() {
  var GetBacklead = callgetlist("GetBackupResourceMentor");
  var NotAssignedBackLeadList = [];
  GetBacklead.forEach(function (key, item) {
    if (key["Backup Lead Id"] == null) {
      NotAssignedBackLeadList.push(key);
    }
  });
  renderassignbackupleadGrid(NotAssignedBackLeadList);
}

function renderassignbackupleadGrid(data) {
  var assignBackupLeadDataGrid = $("#sddgd-assignbackuplead")
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
              getUserMapList();
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
              assignBackupLeadDataGrid.pageIndex() * assignBackupLeadDataGrid.pageSize() + options.rowIndex + 1
            );
          },
        },
        {
          caption: "Employee Id",
          dataField: "Employee id",
        },
        {
          caption: "Employee Name",
          dataField: "Name",
        },
        {
          caption: "Designation",
          dataField: "Designation",
        },
        {
          caption: "Department",
          dataField: "Department",
        },
        {
          caption: "Backup Lead Name",
          dataField: "Backup Lead Name",
          allowFiltering:false, 
          allowGrouping: false, 
          allowReordering: false, 
          allowSorting: false, 
          cellTemplate: function (container, options) {
            var domActions = "";
            var backupLeadName = options.data["Backup Lead Name"];
            if (backupLeadName == "Not Assigned") {
              domActions +=
                "<span class='label label-danger pull-left' style='font-size:7pt !important'>Not Assigned</span>";
            } else {
              domActions +=
                "<span class='pull-left'>" +
                options.data["Backup Lead Name"] +
                "</span>";
            }
            $("<div class='text-center'>")
              .append($(domActions))
              .appendTo(container);
          },
        },
        {
          dataField: "",
          caption: "Action",
          width: 50,
          allowFiltering:false, 
          allowGrouping: false, 
          allowReordering: false, 
          allowSorting: false, 
          allowCollapsing: false, 
          allowExporting: false,
          cellTemplate: function (container, options) {
            var opendata = {
              EmployeeId: options.data.Id,
              EmployeeName: options.data.Name,
              Designation: options.data.Designation,
              BackupLeadId: options.data["Backup Lead Id"],
            };
            var domActions = "";
            domActions +=
              "<button class='btn btn-xs btn-primary edit-btn' onclick='openassignbackleadModal(" +
              JSON.stringify(opendata) +
              ")'><i class='fas fa-user-plus'></i></button>";
            $("<div class='text-center'>")
              .append($(domActions))
              .appendTo(container);
          },
        },
      ],
    })
    .dxDataGrid("instance");
}

function openassignbackleadModal(empMapObjs) {
  var filter_val = JSON.stringify({
    IsActive: true,
  });
  var backupleadresult = callgetlist("GetLeads", filter_val);
  var html = "";
  html += "<tr>";
  html += "<td>" + empMapObjs.EmployeeName + "</td>";
  html += "<td>" + empMapObjs.Designation + "</td>";
  html += "<td>";
  html +=
    "<input id='emp_id' type='hidden' value='" + empMapObjs.EmployeeId + "'>";
  html += "<select id='backupselect' class='form-control'>";
  html += "<option value='0'> --Select Backup Lead-- </option>";
  backupleadresult.forEach(function (key, index) {
    html += "<option value='" + key.Id + "'";
    if (key.Id == empMapObjs.BackupLeadId) html += " selected ";
    html += ">" + key.Name + "</option>";
  });
  html += "</select><br><span class='error_message leadid_error'></span>";
  html += "</td>";
  html += "</tr>";
  $("#AssignBackupTable").html(html);
  $("#assignbackleadModel").appendTo("body").modal("show");
}

function updateBacklead() {
  var lead_id = document.getElementById("backupselect").value;
  if (lead_id == 0 || lead_id == "") {
    $(".leadid_error").html("This Field is required");
    return false;
  }
  $(".leadid_error").html("");
  var empl_id = document.getElementById("emp_id").value;
  let result = {
    BackupLeadId: lead_id,
    EmployeeId: empl_id,
    Message: "",
    Status: "",
  };
  var data = {
    Method: "PostBackResourceMentor",
    Data: result,
  };
  var postCall = PostDataCall(data);
  swal({
    title: "Success!",
    text: postCall["Message"],
    icon: "success",
  }).then(function () {
    getUserMapList();
    BackupresourceDelay(function () {}, 200);
  });
  $("#assignbackleadModel").modal("hide");
}
var BackupresourceDelay = (function () {
  var timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
