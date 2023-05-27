var fromdate = "";
var toDate="";
var ts_projectId="";
var dtotal =0;

$(document).on('click','.close',function(){
  holidayincentivereportedit_getReportData();
});

function OpenHolidayincentiveEdit(id,proname,reportFile){
  ts_projectId = id;
  var selectMonth= getMonth($("#holidayincentiveEditMonth").dxSelectBox('instance').option('value'));
  var selectYear= $("#holidayincentiveEditYear").dxSelectBox('instance').option('value');
  var calenderMonth=selectMonth-1;
  var firstDay = new Date(selectYear, calenderMonth, 1);
  var endDate = new Date(selectYear,calenderMonth + 1, 0);
   fromdate=getFormattedDate(firstDay);
   toDate=getFormattedDate(endDate);
    $('#fromDateEdit').dxDateBox({
        type: 'date',
        pickerType: 'calendar',
        value: firstDay,
        disabled: true,
        displayFormat: 'MMMM dd, yyyy',
      });
      $('#toDateEdit').dxDateBox({
        type: 'date',
        pickerType: 'calendar',
        value: endDate,
        disabled: true,
        displayFormat: 'MMMM dd, yyyy',
      });
    $('#HolidayincentiveReportModalEdit').modal('show');
    $('#projectNameHeaderEdit').text(proname);
        var filter_file_val = JSON.stringify({
        "Token":"",
        "Id":id,
        "Month":selectMonth,
        "Year":$("#holidayincentiveEditYear").dxSelectBox('instance').option('value')
     });

    getSummarizedTimeSheetListEdit(filter_file_val);
    getDetailedTimeSheetListEdit(filter_file_val);
    $('.modal-backdrop').remove();
    exportLogSheet(proname, reportFile);
}

function getSummarizedTimeSheetListEdit(filterdata) {
    // var filter_val = JSON.stringify({
    //   User_Id: EmployeeID
    // });
    var GetSummary = callgetlist("GetSummarizedTimeSheet", filterdata);
    renderSummarizedTimeSheeGridEdit(GetSummary)
  }


  function renderSummarizedTimeSheeGridEdit(data){
    var summarizedHolidayincentivearray = [];
    var columns=Object.keys(data[0]);
    for(var i in columns)
    summarizedHolidayincentivearray.push([{dataField: columns [i]} ]);
    var summarizedColumnData = summarizedHolidayincentivearray.reduce((r, a) => r.concat(a), []);
    $('#divSummarizedHolidayincentiveEdit').dxDataGrid({
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
        caption: 'Summarized Holidayincentive',
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
  function getDetailedTimeSheetListEdit(filterval) {
    // var filter_val = JSON.stringify({
    //   User_Id: EmployeeID
    // });
    var GetTimeSheetDetails = callgetlist("GetDetailedTimeSheetWithApprovedandBilliableHours", filterval);
    console.log("GetTimeSheetDetails",GetTimeSheetDetails);
    renderDetailedHolidayincentiveEditGrid(GetTimeSheetDetails)
  }


function renderDetailedHolidayincentiveEditGrid(data){
var detailedHolidayincentivearray = [];
var column=Object.keys(data[0]);
for(var i in column)
detailedHolidayincentivearray.push([{dataField: column [i]} ]);
var detailColumnData = detailedHolidayincentivearray.reduce((r, a) => r.concat(a), []);
//detailColumnData.push("Action");

var data_src = [];

/*console.log("*********");
data.forEach(function (arrayItem){
   arrayItem['Action'] = '<p>test</p>';
   console.log(arrayItem);
});



console.log("++++++++++");*/

/*const employees = [{
  SNo: 1,
  Date: 'John',
  Day: 'Heart',
  Name: 'Mr.',
  Task: 'CEO',
  TotalHours: '16',
}, {
  SNo: 2,
  Date: 'John',
  Day: 'Heart',
  Name: 'Mr.',
  Task: 'CEO',
  TotalHours: '16',
},  {
 SNo: 3,
  Date: 'John',
  Day: 'Heart',
  Name: 'Mr.',
  Task: 'CEO',
  TotalHours: '16',
}];*/


    $('#divDetailedHolidayincentiveEdit').dxDataGrid({
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
        filterPanel: { 
          visible: true 
        },
        paging: {
            pageSize: 5,
          },
       editing: {
              mode: "row",
              allowUpdating: true,
          },   
        showBorders: true,
        selection: {
          mode: 'single',
        },
        columns: [
            {
            caption: 'Detailed Holidayincentive',
            //columns: detailColumnData,
            columns : [
              {caption:"SNo", dataField:"SNo", allowEditing: false},
              {caption:"Date", dataField:"Date", allowEditing: false},
              {caption:"Day", dataField:"Day", allowEditing: false},
              {caption:"Name", dataField:"Name", allowEditing: false},
              {caption:"Task", dataField:"Task", allowEditing: false},
              {caption:"Approved Hours",dataType:"string", dataField:"ApprovedHours" },
              {caption:"Billable Hours",dataType:"string",  dataField:"BillableHours"},
              /*{caption:"Action", dataField:"",
                cellTemplate: function (container, options) {  
                  container.addClass("product-cell");  
                  $("<button type='button' class='btn btn-danger'>Edit</button>").appendTo(container);  
                } 
            },*/
              ],
         }
    ],

    onEditorPrepared: function (e){
      if(e.dataField === "ApprovedHours" || e.dataField === "BillableHours")
      {
        e.editorElement.dxTextBox("instance").option("mask","00:00");
      }
    },
    onEditorPreparing: function (e){
      if(e.dataField === "ApprovedHours" || e.dataField === "BillableHours")
      {
        e.editorElement.dxTextBox({ mask: "00:00" });
      }
      e.cancel = false;
    },
    onRowUpdated: function (e) {
            updateTimeSheet(e);
          },
        summary: {
          totalItems: [ {
            name: 'customSummary1',
            column: detailColumnData[detailColumnData.length-1].dataField,
            summaryType: 'custom',
            alignment: 'center',
            displayFormat: 'Total: {0}',
          }],
          calculateCustomSummary:function(option){

            if(option.name == "customSummary1")
            {
                switch(option.summaryProcess){
                  case "start":
                    option.totalValue = 0;
                    break;
                  case "calculate":
                     if(option.value != null){
                        option.totalValue  = parseFloat(option.totalValue) + parseFloat(timeStringToFloat(option.value));
                        console.log(dtotal.toFixed(2));
                     }
                     break;
                  case "finalize":
                    option.totalValue = option.totalValue.toFixed(2);
                    break;
               }
             }
          }
        },
      });
  }
  const logSheetCaptionedit = 'Log Sheet Holidayincentive';
  const summarizedCaptionedit = 'Summarized Holidayincentive';
  const detailedCaptionedit = 'Detailed Holidayincentive';
  var borderStylePattern = { style: 'thin', color: { argb: 'FF7E7E7E' } };
  var specialRowIndexes = [];

  function updateTimeSheet(e)
  {
     var tsselectMonth= getMonth($("#holidayincentiveEditMonth").dxSelectBox('instance').option('value'));
     var tsselectYear= $("#holidayincentiveEditYear").dxSelectBox('instance').option('value');

     var filter_file_valtt = JSON.stringify({
        "Token":"",
        "Id":ts_projectId,
        "Month":tsselectMonth,
        "Year":tsselectYear
     });

      var approved_time = e.data.ApprovedHours;
      var billing_hours = e.data.BillableHours;

      //validation here
      if(e.data.ApprovedHours != null)
      {
        splitapproved = e.data.ApprovedHours.replace(':',''); 

        if(splitapproved.length != 4)
        {
          alert("Invalid Approval time");
          getSummarizedTimeSheetListEdit(filter_file_valtt);
          getDetailedTimeSheetListEdit(filter_file_valtt);
          return false;
        }  
        else
        {
           var hrs_ah = splitapproved.substring(0,2);
           var min_ah = splitapproved.substring(splitapproved.length - 2);

           if(min_ah > 59)
           {
              alert("invalid minutes");
              getSummarizedTimeSheetListEdit(filter_file_valtt);
              getDetailedTimeSheetListEdit(filter_file_valtt);
              return false;
           }
           else
           {
              approved_time = hrs_ah+':'+min_ah;
           }
        }
      }

      if(e.data.BillableHours !== null)
      {
        splitbillable = e.data.BillableHours.replace(':',''); 

        if(splitbillable.length != 4)
        {
          alert("Invalid Billable time");
          getSummarizedTimeSheetListEdit(filter_file_valtt);
          getDetailedTimeSheetListEdit(filter_file_valtt);
          return false;
        }  
        else
        {
           var b_hrs_ah = splitbillable.substring(0,2);
           var b_min_ah = splitbillable.substring(splitbillable.length - 2);

           if(b_min_ah > 59)
           {
              alert("invalid minutes");
              getSummarizedTimeSheetListEdit(filter_file_valtt);
              getDetailedTimeSheetListEdit(filter_file_valtt);
              return false;
           }
           else
           {
              billing_hours = b_hrs_ah+':'+b_min_ah;
           }
        }
      }

    

    var ts_filter_file_val = JSON.stringify({
        "Token":localStorage.getItem('securityToken'),
        "Id":ts_projectId,
        "Month":tsselectMonth,
        "Year":tsselectYear,
        "ApprovedHours":approved_time,
        "BillableHours":billing_hours,
        "ProjectsTaskEntriesID":e.data.ProjectsTaskEntriesID
     });

      var responseBillableHours = callgetlist('PostApprovedandBilliableHours',ts_filter_file_val);

     
      getSummarizedTimeSheetListEdit(filter_file_valtt);
      getDetailedTimeSheetListEdit(filter_file_valtt);
  }

  function exportLogSheet(ownername, exportFile){
    $('#exportButton').dxButton({
      text: 'Export Log Sheet',
      icon: 'xlsxfile',
      horizontalAlignment: 'right',
      onClick() {
        const dataGrid1 = $('#divSummarizedHolidayincentiveEdit').dxDataGrid('instance');
        const dataGrid2 = $('#divDetailedHolidayincentiveEdit').dxDataGrid('instance');
        const summaryGridCount=dataGrid1.getDataSource().items().length + 12;
        const detailedSheetCount=dataGrid1.getDataSource().items().length + 8;

        const workbook = new ExcelJS.Workbook();
        const summarizedSheet = workbook.addWorksheet(logSheetCaptionedit);
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

        // summarizedSheet.getRow(detailedSheetCount).getCell(2).value = 'Detailed Holidayincentive';
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

  function timeStringToFloat(time) {
  var hoursMinutes = time.split(/[.:]/);
  var hours = parseInt(hoursMinutes[0], 10);
  var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
  return hours + minutes / 60;
}