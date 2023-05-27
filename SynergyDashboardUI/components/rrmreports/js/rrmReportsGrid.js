$(document).ready(function () {
    getReportsData();
});

function getReportsData(){
    var filterData = JSON.stringify({
        IsActive: true,
        FromDate:'2021-01-01',
        ToDate:'2021-12-23'
    });
    
    callGetListSync("GetInterviewStats", filterData, function (e) {
        bindRRMReportsGrid(e)
    });   
}

function bindRRMReportsGrid(data){
    var reportsGrid = $("#sdgd-rrmReports").dxDataGrid({
      dataSource: data,
      filterRow: {
        visible: true,
        applyFilter: "auto"
      },
      keyExpr: "EmployeeNumber",
      repaintChangesOnly: true,
      highlightChanges: true,
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
      filterPanel: { visible: true },
      allowColumnReordering: true,
      showBorders: true,
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
        emptyPanelText: "Drag a column header here to group by that column",
      },
      sorting: {
        mode: "multiple",
      },
      selection: {
        mode: "multiple"
      },
      columnChooser: {
        enabled: true,
        mode: "select"
      },
      summary: {
        totalItems: [{
          column: "EmployeeNumber",
          summaryType: "count"
        }
          // ...
        ],
        groupItems: [{
          column: "EmployeeNumber",
          summaryType: "count"
        }]
      },
      rowAlternationEnabled: true,
      filterPanel: { visible: true },
      allowColumnReordering: true,
      allowColumnResizing: true,
      showBorders: true,
      onExporting: function (e) {
        var workbook = new ExcelJS.Workbook();
        var worksheet = workbook.addWorksheet("RRM Reports");
  
        DevExpress.excelExporter
          .exportDataGrid({
            component: e.component,
            worksheet: worksheet,
            autoFilterEnabled: true,
            customizeCell: function (options) {
                var gridCell = options.gridCell;
                var excelCell = options.excelCell;
                if(!gridCell) {
                    return;
                }
                if (gridCell.rowType === "header") {
                    excelCell.font = { color: { argb: 'FFFFFF' } };
                    excelCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "757171" }, bgColor: { argb: "757171" } };
                    excelCell.alignment = { horizontal: 'left' };
                }
            }
          })
          .then(function(dataGridRange) {
            setBorders( worksheet, dataGridRange);
            return Promise.resolve();
          }).then(function () {
            workbook.xlsx.writeBuffer().then(function (buffer) {
              saveAs(
                new Blob([buffer], { type: "application/octet-stream" }),
                "RRMReports.xlsx"
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
              refreshReportsRRM();
              dataGrid.refresh();
            }
          }
        });
      },
      columns: [
        {
          dataField: "EmployeeNumber",
          caption: "Employee No",
          visible: true
        },
        {
          dataField: "DisplayName",
          caption: "Interviewer Name"
        },
        {
          dataField: "RRMNo",
          caption: "RRM No"
        },
        {
          dataField: "RequirementName",
          caption: "Requirement"
        },
        {
          dataField: "CandidateName",
          caption: "Candidate Name"
        },
        {
          dataField: "InterviewDate",
          caption: "Interview Date",
          dataType: "date",
          cellTemplate: function (container, options) {
            var rrmDate = convertDateFormatForRRMGrid(options.value)
            $("<div>&nbsp")
              .append(rrmDate)
              .appendTo(container);
          }
        }
      ]
    }).dxDataGrid("instance");
}

function refreshReportsRRM() {
  var filterData = JSON.stringify({
    IsActive: true,
    FromDate: '2021-01-01',
    ToDate: '2021-12-23'
  });

  callGetListSync("GetInterviewStats", filterData, function (e) {
    $("#sdgd-rrmReports").dxDataGrid({ dataSource: e });
    try {
      $("#sdgd-rrmReports").dxDataGrid('instance').refresh();
    }
    catch (ex) {

    }
  });
}