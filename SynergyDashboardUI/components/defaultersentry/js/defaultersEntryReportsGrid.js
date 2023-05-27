$(document).ready(function () {
  initializeDefaultersEntryReport();
});

function initializeDefaultersEntryReport() {
  var date = new Date();
  var todayDate = date.toISOString().slice(0, 10);

  var yesterdayDate = new Date((new Date()).valueOf() - 1000*60*60*24);
  var maxDate = yesterdayDate.toISOString().slice(0,10)

  $("#defaulters_entry_reports_Date").dxDateBox({
    type: "date",
    placeholder: "Select Date",
    displayFormat: "dd MMM yyyy",
    value: maxDate,
    max:maxDate
  });

  getDefaultersReportsData(todayDate);
}

function getDefaultersReportsData(todayDate) {
  var filterData = JSON.stringify({
    Token: Token,
    FilterDate: todayDate
  });

  callGetListSync("GetMyTaskByDate", filterData, function (e) {
    bindDefaultersEntryReportsGrid(e)
  });
}

function getDefaultersReportsBasedOnSelectedDate(){

  var selectedDate = $("#defaulters_entry_reports_Date").dxDateBox("instance").option("value");

  var filterData = JSON.stringify({
    Token: Token,
    FilterDate: selectedDate
  });

  callGetListSync("GetMyTaskByDate", filterData, function (e) {
    bindDefaultersEntryReportsGrid(e)
  });
  
}

function bindDefaultersEntryReportsGrid(data) {
  var reportsHrGrid = $("#sdgd-DefaultersEntryGrid").dxDataGrid({
    dataSource: data,
    filterRow: {
      visible: true,
      applyFilter: "auto"
      },
      repaintChangesOnly: true,
      highlightChanges: true,
      export: {
          enabled: true,
          allowExportSelectedData: false
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
          mode: "none"
      },
      columnChooser: {
          enabled: true,
          mode:"select"
      },
      // summary: {
      //     totalItems: [{
      //         column: "TaskTypes",
      //         summaryType: "count"
      //     }],
      //     groupItems: [{
      //         column: "TaskTypes",
      //         summaryType: "count"
      //     }]
      // },
      rowAlternationEnabled: true,
    onExporting: function (e) {
      var workbook = new ExcelJS.Workbook();
      var worksheet = workbook.addWorksheet("Defaulters Entry Report");

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
              "DefaultersEntryReport.xlsx"
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
            refreshDefaultersEntryReport();
            dataGrid.refresh();
          }
        }
      });
    },
    columns: [
      {
        dataField: "TaskId",
        caption: "TaskId",
        visible: false
      },
      {
        dataField: "TaskTypes",
        caption: "Task Type",
        visible: true
      },
      {
        dataField: "Hours",
        caption: "Hours"
      },
      {
        caption: "", allowGrouping: false, allowCollapsing: false, allReordering: false, allowSearching: false,
        cellTemplate: function (container, options) {
              
            var taskId = options.data.TaskId;
            var domActions = "";         
           
            if(options.data.TaskTypes == "Total"){

            }else{

              domActions += "<div class='col-md-12'> <div class='row'> <div class='col-md-1'>"
              if(options.data.TaskTypes == "Projects"){
                domActions += "<button data-type='edit' class='btn btn-xs btn-primary' title='Edit Report' onclick=editDefaultersEntry('" + taskId + "')><i class='fas fa-pencil-alt'></i></button> </td>";
              }
              domActions += "</div>";
              domActions += "<div class='col-md-1'>"
              domActions += " &nbsp;<button data-type='delete' class='btn btn-xs btn-primary' title='Delete Report' onclick=deleteDefaultersReports('" + taskId + "','"+ options.data.TaskTypes+ "')><i class='fas fa-trash-alt'></i></button>";
              domActions += "</div>"
              domActions += "</div>"
              domActions += "</div>"

              $("<div>").append($(domActions)).appendTo(container);
            }

        }, fixedPosition: "right", allowExporting: false
    }
    ]
  }).dxDataGrid("instance");
}

function refreshDefaultersEntryReport() {

  var selectedDate = $("#defaulters_entry_reports_Date").dxDateBox("instance").option("value");

  var filterData = JSON.stringify({
    Token: Token,
    FilterDate: selectedDate
  });

  callGetListSync("GetMyTaskByDate", filterData, function (e) {
    $("#sdgd-DefaultersEntryGrid").dxDataGrid({ dataSource: e });
    try {
      $("#sdgd-DefaultersEntryGrid").dxDataGrid('instance').refresh();
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

function deleteDefaultersReports(taskId,taskType){
  
  swal({
    title: "Delete",
    text: "Are you sure, Do you want to delete the Entry?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        data = {
          "Method": "DeleteTaskEntryByTaskIdAndDate",
          "Data": {
            "@TaskId": taskId,
            "@TaskType":taskType
          }
        }
        var result = PostDataCall(data);
        swal({
          title: "Success!",
          text: "Deleted Successfully!",
          icon: "success",
          button: "ok!",
        })
        getDefaultersReportsBasedOnSelectedDate();
      }
    })
}