$(document).ready(function () {
  initializeRRMHRReports();
});

function initializeRRMHRReports() {
  var date = new Date();
  var fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
  var toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  $("#rrm_reports_fromDate").dxDateBox({
    type: "date",
    displayFormat: "dd MMM yyyy",
    placeholder: "Select From Date",
    value: fromDate
  });

  $("#rrm_reports_toDate").dxDateBox({
    type: "date",
    placeholder: "Select To Date",
    displayFormat: "dd MMM yyyy",
    value: toDate
  });

  var reportsData = [];
  var filterData = JSON.stringify({
    "IsActive": true,
    "Token": Token
  });

  callGetListSync("GetHRReportsForRRM", filterData, function (e) {
    reportsData = e;
  });

  $("#rrm_reports_SelectBox").dxSelectBox({
    dataSource: reportsData,
    valueExpr: "Id",
    displayExpr: "DisplayName",
    value: "GetInterviewStats",
    searchEnabled: true,
    onValueChanged: function(data) {
      getRRMHRReportsFilter();
   }
  });

  getHrReportsData(fromDate, toDate);
}

function getHrReportsData(fromDate, toDate) {
  var filterData = JSON.stringify({
    IsActive: true,
    FromDate: fromDate,
    ToDate: toDate
  });

  callGetListSync("GetInterviewStats", filterData, function (e) {
    bindRRMHrReportsGrid(e)
  });
}

function getRRMHRReportsFilter() {

  var fromDate = $("#rrm_reports_fromDate").dxDateBox("instance").option("value");
  fromDate = fromDate.toISOString().slice(0, 10);
  var toDate = $("#rrm_reports_toDate").dxDateBox("instance").option("value");
  var spRRMHrReports = $("#rrm_reports_SelectBox").dxSelectBox("instance").option("value");

  var filterData = JSON.stringify({
    IsActive: true,
    FromDate: fromDate,
    ToDate: toDate
  });

  callGetListSync(spRRMHrReports, filterData, function (e) {
    $("#sdgd-rrmHrReportsGrid").dxDataGrid({dataSource:e});
  });
}

function bindRRMHrReportsGrid(data) {
  var reportsHrGrid = $("#sdgd-rrmHrReportsGrid").dxDataGrid({
    dataSource: data,
    filterRow: {
      visible: true,
      applyFilter: "auto"
      },
      repaintChangesOnly: true,
      highlightChanges: true,
      export: {
          enabled: true,
          allowExportSelectedData: true
      },
      searchPanel: {
          visible: true,
          width: 240,
          placeholder: "Search..."
      },
      headerFilter: {
          visible: true
      },
      filterPanel: { visible: true },
      allowColumnReordering: true,
      allowColumnResizing:true,
      showBorders: true,
      grouping: {
          autoExpandAll: true,
      },
      pager: {
          showPageSizeSelector: true,
          allowedPageSizes: [5, 10, 20],
          showInfo: true
      },
      paging: {
          pageSize: 10
      },
      groupPanel: {
          visible: true,
          emptyPanelText: "Drag a column header here to group by that column"
      },
      sorting: {
          mode: "multiple"
      },
      selection: {
          mode: "multiple"
      },
      columnChooser: {
          enabled: true,
          mode:"select"
      },
      summary: {
          totalItems: [{
              column: "RRMNo",
              summaryType: "count"
          }
          // ...
          ],
          groupItems: [{
              column: "RRMNo",
              summaryType: "count"
          }]
      },
      rowAlternationEnabled: true,
    onExporting: function (e) {
      var workbook = new ExcelJS.Workbook();
      var worksheet = workbook.addWorksheet("RRM Hr Reports");

      DevExpress.excelExporter
        .exportDataGrid({
          component: e.component,
          worksheet: worksheet,
          autoFilterEnabled: true,
          customizeCell: function (options) {
            var gridCell = options.gridCell;
            var excelCell = options.excelCell;
            if (!gridCell) {
              return;
            }
            if (gridCell.rowType === "header") {
              excelCell.font = { color: { argb: 'FFFFFF' } };
              excelCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "757171" }, bgColor: { argb: "757171" } };
              excelCell.alignment = { horizontal: 'left' };
            }
          }
        })
        .then(function (dataGridRange) {
          setBorders(worksheet, dataGridRange);
          return Promise.resolve();
        }).then(function () {
          workbook.xlsx.writeBuffer().then(function (buffer) {
            saveAs(
              new Blob([buffer], { type: "application/octet-stream" }),
              "RRMHrReports.xlsx"
            );
          });
        });
      e.cancel = true;
    },
    onToolbarPreparing: function (e) {
      var dataGrid = e.component;
      e.toolbarOptions.items.unshift({
        location: "after",
        widget: "dxButton",
        options: {
          icon: "refresh",
          onClick: function () {
            refreshHrReportsRRM();
            dataGrid.refresh();
          }
        }
      });
    },
    // columns: [
    //   {
    //     dataField: "EmployeeNumber",
    //     caption: "Employee No",
    //     visible: true
    //   },
    //   {
    //     dataField: "DisplayName",
    //     caption: "Interviewer Name"
    //   },
    //   {
    //     dataField: "RRMNo",
    //     caption: "RRM No"
    //   },
    //   {
    //     dataField: "RequirementName",
    //     caption: "Requirement"
    //   },
    //   {
    //     dataField: "CandidateName",
    //     caption: "Candidate Name"
    //   },
    //   {
    //     dataField: "InterviewDate",
    //     caption: "Interview Date",
    //     dataType: "date",
    //     cellTemplate: function (container, options) {
    //       var rrmDate = convertDateFormatForRRMGrid(options.value)
    //       $("<div>&nbsp")
    //         .append(rrmDate)
    //         .appendTo(container);
    //     }
    //   }
    // ]
  }).dxDataGrid("instance");
}

function refreshHrReportsRRM() {
  var filterData = JSON.stringify({
    IsActive: true,
    FromDate: '2021-01-01',
    ToDate: '2021-12-23'
  });

  callGetListSync("GetInterviewStats", filterData, function (e) {
    $("#sdgd-rrmHrReportsGrid").dxDataGrid({ dataSource: e });
    try {
      $("#sdgd-rrmHrReportsGrid").dxDataGrid('instance').refresh();
    }
    catch (ex) {

    }
  });
}