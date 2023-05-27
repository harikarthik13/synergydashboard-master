var fromdate = "";
var toDate="";

function OpenTimesheet(id,proname,reportFile){
  var selectMonth= getMonth($("#timesheetMonth").dxSelectBox('instance').option('value'));
  var selectYear= $("#timesheetYear").dxSelectBox('instance').option('value');
  var calenderMonth=selectMonth-1;
  var firstDay = new Date(selectYear, calenderMonth, 1);
  var endDate = new Date(selectYear,calenderMonth + 1, 0);
   fromdate=getFormattedDate(firstDay);
   toDate=getFormattedDate(endDate);
    $('#fromDate').dxDateBox({
        type: 'date',
        pickerType: 'calendar',
        value: firstDay,
        disabled: true,
        displayFormat: 'MMMM dd, yyyy',
      });
      $('#toDate').dxDateBox({
        type: 'date',
        pickerType: 'calendar',
        value: endDate,
        disabled: true,
        displayFormat: 'MMMM dd, yyyy',
      });
    $('#TimesheetReportModal').modal('show');
    $('#projectNameHeader').text(proname);
        var filter_file_val = JSON.stringify({
        "Token":"",
        "Id":id,
        "Month":selectMonth,
        "Year":$("#timesheetYear").dxSelectBox('instance').option('value')
     });

    getSummarizedTimeSheetList(filter_file_val);
    getDetailedTimeSheetList(filter_file_val);
    $('.modal-backdrop').remove();
    exportLogSheet(proname, reportFile);
}

function getSummarizedTimeSheetList(filterdata) {
    // var filter_val = JSON.stringify({
    //   User_Id: EmployeeID
    // });
    var GetSummary = callgetlist("GetSummarizedTimeSheet", filterdata);
    renderSummarizedTimeSheeGrid(GetSummary)
  }


  function renderSummarizedTimeSheeGrid(data){
    var summarizedTimesheetarray = [];
    var columns=Object.keys(data[0]);
    for(var i in columns)
    summarizedTimesheetarray.push([{dataField: columns [i]} ]);
    var summarizedColumnData = summarizedTimesheetarray.reduce((r, a) => r.concat(a), []);
    $('#divSummarizedTimesheet').dxDataGrid({
        dataSource: data,
        keyExpr: 'SNo',
        showBorders: true,
        sorting :false,
        filterRow: {
          visible: true,
          applyFilter: 'auto',
        },
        headerFilter: {
          visible: true,
        },
        selection: {
          mode: 'single',
        },
        columns: [
        {
        caption: 'Summarized Timesheet',
        columns: summarizedColumnData,
      }],
        summary: {
          totalItems: [ {
            column: summarizedColumnData[summarizedColumnData.length-1].dataField,
            summaryType: 'sum',
            alignment: 'center',
            displayFormat: 'Total: {0}',
          }],
        },
      });
  }
  function getDetailedTimeSheetList(filterval) {
    // var filter_val = JSON.stringify({
    //   User_Id: EmployeeID
    // });
    var GetTimeSheetDetails = callgetlist("GetDetailedTimeSheet", filterval);
    renderDetailedTimesheetGrid(GetTimeSheetDetails)
  }


function renderDetailedTimesheetGrid(data){
var detailedTimesheetarray = [];
var column=Object.keys(data[0]);
for(var i in column)
detailedTimesheetarray.push([{dataField: column [i]} ]);
var detailColumnData = detailedTimesheetarray.reduce((r, a) => r.concat(a), []);
    $('#divDetailedTimesheet').dxDataGrid({
        dataSource: data,
        keyExpr: 'SNo',
        sorting :false,
        filterRow: {
          visible: true,
          applyFilter: 'auto',
        },
        headerFilter: {
          visible: true,
        },
        paging: {
            pageSize: 5,
          },
        showBorders: true,
        selection: {
          mode: 'single',
        },
        columns: [
            {
            caption: 'Detailed Timesheet',
        columns: detailColumnData,
    }],
        summary: {
          totalItems: [ {
            column: detailColumnData[detailColumnData.length-1].dataField,
            summaryType: 'sum',
            alignment: 'center',
            displayFormat: 'Total: {0}',
          }],
        },
      });
  }
  const logSheetCaption = 'Log Sheet Timesheet';
  const summarizedCaption = 'Summarized Timesheet';
  const detailedCaption = 'Detailed Timesheet';
  var borderStylePattern = { style: 'thin', color: { argb: 'FF7E7E7E' } };
  var specialRowIndexes = [];

  function exportLogSheet(ownername, exportFile){
    $('#exportButton').dxButton({
      text: 'Export Log Sheet',
      icon: 'xlsxfile',
      horizontalAlignment: 'right',
      onClick() {
        const dataGrid1 = $('#divSummarizedTimesheet').dxDataGrid('instance');
        const dataGrid2 = $('#divDetailedTimesheet').dxDataGrid('instance');
        const summaryGridCount=dataGrid1.getDataSource().items().length + 12;
        const detailedSheetCount=dataGrid1.getDataSource().items().length + 8;

        const workbook = new ExcelJS.Workbook();
        const summarizedSheet = workbook.addWorksheet(logSheetCaption);
        // const detailedSheet = workbook.addWorksheet(detailedCaption);
  
        summarizedSheet.getRow(2).getCell(6).value = 'G2 Technology Solutions India Pvt. Ltd.';
        summarizedSheet.getRow(2).getCell(6).font = { bold: true, size: 16, underline: 'double' };

        summarizedSheet.getRow(3).getCell(6).value = 'Log Sheet for '+ownername;
        summarizedSheet.getRow(3).getCell(6).font = { bold: true, size: 16, underline: 'double' };

        summarizedSheet.getRow(5).getCell(2).value = 'From';
        summarizedSheet.getRow(5).getCell(2).font = { bold: true, size: 12, border:'thin' };

        summarizedSheet.getRow(5).getCell(3).value = fromdate;
        summarizedSheet.getRow(5).getCell(3).font = { bold: true, size: 10, border:'thin' };

        summarizedSheet.getRow(6).getCell(2).value = 'To';
        summarizedSheet.getRow(6).getCell(2).font = { bold: true, size: 12, border:'thin' };

        summarizedSheet.getRow(6).getCell(3).value = toDate;
        summarizedSheet.getRow(6).getCell(3).font = { bold: true, size: 10, border:'thin' };
        // summarizedSheet.getRow(6).getCell(3).border =  borderStylePattern;
        headerCellsRange = {from: {row: 2, column: 2}, to: {row: 3, column: 16}};
        //setLongBorders("", summarizedSheet, headerCellsRange);
        dateCellsRange = {from: {row: 5, column: 2}, to: {row: 6, column: 3}};
        setBorders("", summarizedSheet, dateCellsRange);

        // summarizedSheet.getRow(detailedSheetCount).getCell(2).value = 'Detailed Timesheet';
        // summarizedSheet.getRow(detailedSheetCount).getCell(2).font = { bold: true, size: 16, underline: 'double' };
  
        function setAlternatingRowsBackground(gridCell, excelCell) {
          // if (gridCell.rowType === 'header' || gridCell.rowType === 'data') {
            if (gridCell.rowType === 'header') {
            if (excelCell.fullAddress.row % 2 === 0) {
              excelCell.fill = {
                type: 'pattern',dashStyle:'solid', pattern: 'solid', fgColor: { argb: 'D3D3D3' }, bgColor: { argb: 'D3D3D3' },
              };
            }
          }
        }

        function setLongBorders(dataGrid, worksheet, cellsRange) {
          // rowLines
            for(let i = cellsRange.from.row; i < cellsRange.to.row; i++) {
              for(let j = cellsRange.from.column; j <= cellsRange.to.column; j++) {
                setBorderCell(worksheet, i, j, { bottom: borderStylePattern });
              }
            }
            // top
            for(let i = cellsRange.from.column; i <= cellsRange.to.column; i++) {
              setBorderCell(worksheet, cellsRange.from.row, i, { top: borderStylePattern });
            }
             // bottom
             for(let i = cellsRange.from.column; i <= cellsRange.to.column; i++) {
              setBorderCell(worksheet, cellsRange.to.row, i, { bottom: borderStylePattern });
            }
              // left
                setBorderCell(worksheet, cellsRange.from.row, cellsRange.from.column, { left: borderStylePattern });
               // right
               setBorderCell(worksheet, cellsRange.to.row, cellsRange.to.column, { right: borderStylePattern });
            }

        function setBorderCell(worksheet, row, column, borderValue) {
          const excelCell = worksheet.getCell(row, column);
          if(!excelCell.border) {
            excelCell.border = {};
          }
      
          Object.assign(excelCell.border, borderValue);
        }
      


        function setBorders(dataGrid, worksheet, cellsRange) {
          // const { showRowLines, showColumnLines, showBorders } = dataGrid.option();
          // rowLines
            for(let i = cellsRange.from.row; i < cellsRange.to.row; i++) {
              for(let j = cellsRange.from.column; j <= cellsRange.to.column; j++) {
                setBorderCell(worksheet, i, j, { bottom: borderStylePattern });
              }
            }
              // columnLines
              for(let i = cellsRange.from.row; i <= cellsRange.to.row; i++) {
                for(let j = cellsRange.from.column; j < cellsRange.to.column; j++) {
                  if(specialRowIndexes.indexOf(i) === -1) {
                     setBorderCell(worksheet, i, j, { right: borderStylePattern }); 
                  }
                }
              }
            // borders
            // top
            for(let i = cellsRange.from.column; i <= cellsRange.to.column; i++) {
              setBorderCell(worksheet, cellsRange.from.row, i, { top: borderStylePattern });
            }
            // left
            for(let i = cellsRange.from.row; i <= cellsRange.to.row; i++) {
              setBorderCell(worksheet, i, cellsRange.from.column, { left: borderStylePattern });
            }
      
            // right
            for(let i = cellsRange.from.row; i <= cellsRange.to.row; i++) {
              setBorderCell(worksheet, i, cellsRange.to.column, { right: borderStylePattern });
            }
            // bottom
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
  
        DevExpress.excelExporter.exportDataGrid({
          worksheet: summarizedSheet,
          component: dataGrid1,
          topLeftCell: { row: 8, column: 2 },
          customizeCell(options) {
            setAlternatingRowsBackground(options.gridCell, options.excelCell);
          },
        }).then(function(dataGridRange) {
          setBorders(dataGrid1, summarizedSheet, dataGridRange);
          return Promise.resolve();
        }).then((e) => DevExpress.excelExporter.exportDataGrid({
          worksheet: summarizedSheet,
          component: dataGrid2,
          // topLeftCell: { row: summaryGridCount+4, column: (e.to.column + 2) },
          topLeftCell: { row: summaryGridCount, column: 2 },
          customizeCell(options) {
            setAlternatingRowsBackground(options.gridCell, options.excelCell);
          },
        })).then(function(dataGridRange) {
          setBorders(dataGrid2, summarizedSheet, dataGridRange);
          return Promise.resolve();
        }).then(() => {
          workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), exportFile+'.xlsx');
          });
        });

      },
    });
  }

  function getFormattedDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    //month = month.length > 1 ? month : '0' + month;
    month = date.toLocaleString('default', { month: 'long' });
    
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return month + ' ' + day + ', ' + year;
  }