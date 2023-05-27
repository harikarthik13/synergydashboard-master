$(document).ready(function () {
  pbb_showbenchtobillingdata();
});

//show bench to billing data
function pbb_showbenchtobillingdata() {
	var filterData = JSON.stringify({
		"IsActive": true
	});

	   callGetListSync('GetResourcesinPartialBillingPlans', filterData, function(e){
		//    console.log(e)
	   $("#partialBenchToBillingGrid").dxDataGrid({ dataSource: e })
   });
   renderPartialBenchToBillingReportGrid()
}

//convert date format 
function convertDate(BenchStartDate){
	var sdate=BenchStartDate;
	var sd = sdate;
	var startdateChanged= sd.replace(/\//g, "-");
	startdateChanged=startdateChanged.replace("T00:00:00","");	
	startdateChanged = startdateChanged.split('-');

		var mm=parseInt(startdateChanged[1]);
		var month=(moment().month(mm-1).format("MMM"));
		startdateChanged=startdateChanged[2]+"-"+month+"-"+startdateChanged[0];
		return startdateChanged;
}
//render bench to billing 
function renderPartialBenchToBillingReportGrid(){
	var rowNumber = 0;
   var dataGrid = $("#partialBenchToBillingGrid").dxDataGrid({
	   filterRow: {
		   visible: true,
		   applyFilter: "auto"
	   },
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
		   visible: true
	   },
	   sorting: {
		   mode: "multiple"
	   },
	   selection: {
		mode: "multiple"
	},
	   summary: {
		totalItems: [{
			column: "sno",
			summaryType: "count"
		}
		// ...
		],
		groupItems: [{
			column: "sno",
			summaryType: "count"
		}]
	},
		editing: {
			mode: "popup",
			allowAdding: false,
			allowUpdating: false,
			useIcons: true
			},
		columnChooser: {
			enabled: true
		},
		rowAlternationEnabled:true,
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
					pbb_showbenchtobillingdata();
				},
			  },
			});
		  },
		onExporting: function(e) {
			var workbook = new ExcelJS.Workbook();
			var worksheet = workbook.addWorksheet('View Defaulters');
			
			DevExpress.excelExporter.exportDataGrid({
			component: e.component,
			worksheet: worksheet,
                autoFilterEnabled: true,
                customizeCell: function (options) {
                    var { gridCell, excelCell } = options;
                    if (gridCell.rowType === "data") {
                        if (gridCell.column.caption === '#') {
                            excelCell.value = options.cell.row - 1;
                        }
                    }
                }
			}).then(function() {
				// https://github.com/exceljs/exceljs#writing-xlsx
				workbook.xlsx.writeBuffer().then(function(buffer) {
				saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'benchtobilling.xlsx');
				});
				});
				e.cancel = true;
				},
	   	columns: [
		   {caption:"#", dataField:"sno",cssClass:"rno", allowGrouping: false,allowCollapsing: false,allReordering:false
		   , 
			   cellTemplate: function(container, options) { 
                container.text(dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex+1); 
            } 
		},
		   {caption:"ID", dataField:"Id",cssClass:"eid"},  
		   {caption:"Employee Code", dataField:"EmployeeCode",cssClass:"ecode"},
		   {caption:"Employee Name", dataField:"EmployeeName",cssClass:"ename"},
		   {caption:"Technology", dataField:"Technology"},
		   {caption:"BillableHours", dataField:"BillableHours"},
		   {caption:"BackupLead", dataField:"BackupLead"},
		   {caption:"Plan", dataField:"Plans",width:200, 
		   cellTemplate: function (container, options) {
			$("<div>")
			   .append(options.value)
			   .appendTo(container);
			   }
	// 	   cellTemplate: function(element, info) {
	// 		element.append("<div>" + info.Plans + "</div>")
	//    }
	},   
		   
		   {
               caption:"", dataField:"Id", allowFiltering: false, allowGrouping: false,allowReordering:false, allowSorting:false,allowCollapsing: false,cssClass:"", allowExporting: false,
		   cellTemplate: function (container, options) {
			$("<div>")
			   .append("<button class='btn btn-xs btn-primary edit-btn btnSelect'><i class='fas fa-pencil-alt'></i></button><button class='btn btn-xs btn-primary edit-btn' data-rrmid ="+options.value+"  onclick=pbb_showskill('"+options.value+"')><i class='fas fa fa-eye'></i></button>")
			   .appendTo(container);
			   },
		   onClick: function (e) {
			pbb_showskill(data.Id);
		   }
	   }
	   ]
   }).dxDataGrid("instance");
}