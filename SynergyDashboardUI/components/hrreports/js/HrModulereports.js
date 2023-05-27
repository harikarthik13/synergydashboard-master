$(document).ready(function () {
  initializeProjectReports();
});

function initializeProjectReports() {
  var date = new Date();
 
  $("#swipe_reports_toDate").dxDateBox({
    type: "date",
    placeholder: "Select Date",
    displayFormat: "dd MMM yyyy",
    value: new Date(),
  }).dxDateBox("instance");

  $("#swipe_reports_fromDate").dxDateBox({
    type: "date",
    placeholder: "Select Date",
    displayFormat: "dd MMM yyyy",
    value: new Date(),
  }).dxDateBox("instance");

  
  var reportsData = [];
  var filterData = JSON.stringify({
    "IsActive": true,
    "Token": Token
  });
  callGetListSync("GetDepartmentList", filterData, function (e) {
    reportsData = e;
  });

  $("#departmentList").dxSelectBox({
    dataSource: reportsData,
    valueExpr: "Id",
    displayExpr: "Departments",
    value: reportsData[0].Departments,
    searchEnabled: true,
  //   onValueChanged: function(data) {
  //     getSwipeReportsFilter();
  //  }
  });

  var fil_value = JSON.stringify({ "Token": localStorage.getItem('securityToken'),"IsActive": 1 });
  var GetEmployeeList = callgetlist('GetEmployeeList', fil_value);

  $("#Hr_employeeList").dxSelectBox({
    dataSource: GetEmployeeList,
    valueExpr: "EmployeeId",
    displayExpr: "Name",
    value: GetEmployeeList[0].Name,
    searchEnabled: true,
  });


  getSwipeReportsData(reportsData[0].DisplayName,fromDate, toDate,GetEmployeeList[0].Name);
}

function getSwipeReportsData(spProjectReports,fromDate, toDate,GetEmployeeList) {
  var filterData = JSON.stringify({
    FromDate: fromDate,
    ToDate: toDate
  });

  callGetListSync(GetEmployeeLeaveDetailsByDepartmentID, filterData, function (e) {
    bindSwipeReportsGrid(e)
  });
}


function getSwipeReportsFilter() {
  var fromDate = formatDate($("#swipe_reports_fromDate").dxDateBox("instance").option("value"));
  var toDate = formatDate($("#swipe_reports_toDate").dxDateBox("instance").option("value"));
  var spProjectReports = $("#departmentList").val();
  var filterData = JSON.stringify({
    FromDate: fromDate,
    ToDate: toDate
  });
  callGetListSync(spProjectReports, filterData, function (e) {
    $("#sdgd-SwipeReportsGrid").dxDataGrid({dataSource:e});
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


function bindSwipeReportsGrid(data) {
  var reportsProductGrid = $("#sdgd-SwipeReportsGrid").dxDataGrid({
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
      loadPanel: {
        enabled: true
      },
      rowAlternationEnabled: true,
    onExporting: function (e) {
      var workbook = new ExcelJS.Workbook();
      var worksheet = workbook.addWorksheet("Swipe Module Reports");

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
              "SwipeReports.xlsx"
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
            refeshHrSwipeReports();
            dataGrid.refresh();
          }
        }
      });
    },
  }).dxDataGrid("instance");
}

function refeshHrSwipeReports() {
  var fromDate = $("#swipe_reports_fromDate").dxDateBox("instance").option("value");
  var toDate =  $("#swipe_reports_toDate").dxDateBox("instance").option("value");
  var spProjectReports = $("#departmentList").val();
  var filterData = JSON.stringify({
    FromDate: fromDate,
    ToDate: toDate
  });

  callGetListSync(spProjectReports, filterData, function (e) {
    $("#sdgd-SwipeReportsGrid").dxDataGrid({ dataSource: e });
    try {
      $("#sdgd-SwipeReportsGrid").dxDataGrid('instance').refresh();
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