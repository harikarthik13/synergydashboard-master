$(document).ready(function () {
  initializeProjectReports();
});

function initializeProjectReports() {
  var date = new Date();
  var fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
  var toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  $('#project_reports_fromDate').datepicker({
    dateFormat: 'dd M yy',
    constrainInput: true,
    autoclose: true
  }).datepicker('setDate', fromDate);

  $('#project_reports_toDate').datepicker({
    dateFormat: 'dd M yy',
    constrainInput: true,
    autoclose: true
  }).datepicker('setDate', toDate);
  
  var reportsData = [];
  var filterData = JSON.stringify({
    // "IsActive": true,
    "Token": Token
  });
  callGetListSync("GetReportsForProjectModule", filterData, function (e) {
    reportsData = e;
  });

  $("#project_reports_SelectBox").dxSelectBox({
    dataSource: reportsData,
    valueExpr: "Id",
    displayExpr: "DisplayName",
    value: reportsData[0].DisplayName,
    searchEnabled: true,
  //   onValueChanged: function(data) {
  //     getProjectReportsFilter();
  //  }
  });
  getProjectReportsData(reportsData[0].DisplayName,fromDate, toDate);
}

function getProjectReportsData(spProjectReports,fromDate, toDate) {
  var filterData = JSON.stringify({
    FromDate: fromDate,
    ToDate: toDate
  });
  //var spProjectReports = $("#project_reports_SelectBox").dxSelectBox("instance").option("value");
  callGetListSync(spProjectReports, filterData, function (e) {
    bindProjectReportsGrid(e)
  });
}


function getProjectReportsFilter() {
  var fromDate = $("#project_reports_fromDate").val(); //formatDate($("#project_reports_fromDate").dxDateBox("instance").option("value"));
  var toDate = $("#project_reports_toDate").val(); //formatDate($("#project_reports_toDate").dxDateBox("instance").option("value"));
  var spProjectReports = $("#project_reports_SelectBox").dxSelectBox("instance").option("value");
  var filterData = JSON.stringify({
    FromDate: fromDate,
    ToDate: toDate
  });
  callGetListSync(spProjectReports, filterData, function (e) {
    $("#sdgd-projectReportsGrid").dxDataGrid({dataSource:e});
  });
}

//DATE format
function formatDate(date) {  
  var d = new Date(date);  
  var month = '' + (d.getMonth() + 1);  
  var day = '' + d.getDate();  
  var year = d.getFullYear();  

  if (month.length < 2) month = '0' + month;  
  if (day.length < 2) day = '0' + day;  

  return [year, month, day].join('-');  
}  


function bindProjectReportsGrid(data) {
  var reportsProductGrid = $("#sdgd-projectReportsGrid").dxDataGrid({
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
      loadPanel: {
        enabled: true
      },
      rowAlternationEnabled: true,
    onExporting: function (e) {
      var workbook = new ExcelJS.Workbook();
      var worksheet = workbook.addWorksheet("Product Module Reports");

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
              "ProjectReports.xlsx"
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
            refreshProjectReportsRRM();
            dataGrid.refresh();
          }
        }
      });
    },
  }).dxDataGrid("instance");
}

function refreshProjectReportsRRM() {
  var fromDate =  $("#project_reports_fromDate").val(); //$("#project_reports_fromDate").dxDateBox("instance").option("value");
  // fromDate = fromDate.toISOString().slice(0, 10);
  var toDate =  $("#project_reports_toDate").val(); //$("#project_reports_toDate").dxDateBox("instance").option("value");
  var spProjectReports = $("#project_reports_SelectBox").dxSelectBox("instance").option("value");
  var filterData = JSON.stringify({
    FromDate: fromDate,
    ToDate: toDate
  });

  callGetListSync(spProjectReports, filterData, function (e) {
    $("#sdgd-projectReportsGrid").dxDataGrid({ dataSource: e });
    try {
      $("#sdgd-projectReportsGrid").dxDataGrid('instance').refresh();
    }
    catch (ex) {

    }
  });
}

function setBorders( worksheet, cellsRange) {
  var borderStylePattern = { style: 'thin', color: { argb: 'FF7E7E7E' } };
  for(let i = cellsRange.from.row; i < cellsRange.to.row; i++) {
    for(let j = cellsRange.from.column; j <= cellsRange.to.column; j++) {
      setBorderCell(worksheet, i, j, { bottom: borderStylePattern });
      setBorderCell(worksheet, i, j, { right: borderStylePattern }); 
    }
  }
  for(let i = cellsRange.from.column; i <= cellsRange.to.column; i++) {
    setBorderCell(worksheet, cellsRange.from.row, i, { top: borderStylePattern });
  }
  for(let i = cellsRange.from.row; i <= cellsRange.to.row; i++) {
    setBorderCell(worksheet, i, cellsRange.from.column, { left: borderStylePattern });
  }
  for(let i = cellsRange.from.row; i <= cellsRange.to.row; i++) {
    setBorderCell(worksheet, i, cellsRange.to.column, { right: borderStylePattern });
  }
  for(let i = cellsRange.from.column; i <= cellsRange.to.column; i++) {
    setBorderCell(worksheet, cellsRange.to.row, i, { bottom: borderStylePattern });
  }
}

function setBorderCell(worksheet, row, column, borderValue) {
  const excelCell = worksheet.getCell(row, column);

  if(!excelCell.border) {
    excelCell.border = {};
  }

  Object.assign(excelCell.border, borderValue);
}