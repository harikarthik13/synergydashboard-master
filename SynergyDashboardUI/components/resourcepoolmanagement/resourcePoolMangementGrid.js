var popup = null;
$(document).ready(function () {
	//document.getElementById("btninproject").click();
	// $("#btninproject").click();
	$('#btninproject')[0].click();
	showinprojectsList();
	showWOExpiredList();
	showNonBillableList();
	showShadowList();
	showBenchList();
	showConsultantsList();
  });

  //DATE format
  function convertDateFormat(dateformat){
	var sdate=dateformat;
	var sd = sdate;
	var startdateChanged= sd.replace(/\//g, "-");
	startdateChanged=startdateChanged.replace("T00:00:00","");	
	startdateChanged = startdateChanged.split('-');

		var mm=parseInt(startdateChanged[1]);
		var month=(moment().month(mm-1).format("MMM"));
		startdateChanged=startdateChanged[2]+"-"+month+"-"+startdateChanged[0];
		return startdateChanged;
}
//grid refresh
function rpm_gridRefresh() {
    showinprojectsList();
    showWOExpiredList();
    showNonBillableList();
    showShadowList();
    showBenchList();
    showConsultantsList();
	BillingCount();
}

  //show in project list
  function showinprojectsList() {
	  var filterData = JSON.stringify({
		  "IsActive": true
	  });
  
		 callGetListSync('GetResourcesInProject', filterData, function(e){
		 $("#tblinprojectsList").dxDataGrid({ dataSource: e })
	 })
  }
  
  //render show in project List Grid
  function rendershowinprojectsListGrid(){
	 var dataGrid = $("#tblinprojectsList").dxDataGrid({
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
         onExporting: function (e) {
             
			var workbook = new ExcelJS.Workbook();
			var worksheet = workbook.addWorksheet('InProject-History');
			DevExpress.excelExporter.exportDataGrid({
			    component: e.component,
			    worksheet: worksheet,
                autoFilterEnabled: true,
                customizeCell: function (options) {
                    var { gridCell, excelCell } = options;
                    if (gridCell.rowType === "data") {
                        if (gridCell.column.caption === '#') {
                            excelCell.value = options.cell.row-1;
                        }
                    }
                }
            }).then(function () {
				// https://github.com/exceljs/exceljs#writing-xlsx
				    workbook.xlsx.writeBuffer().then(function(buffer) {
				        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'InProject.xlsx');
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
                         rpm_gridRefresh();
                         dataGrid.refresh();
                     }
                 }
             });
         },
		 columns: [
			{caption:"#", dataField:"sno",cssClass:"rno", allowGrouping: false,allowCollapsing: false,allReordering:false
			, 
				cellTemplate: function(container, options) { 
				 container.text(dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex+1); 
			 } 
		 },
			 {caption:"ID", dataField:"Id",visible:false},  
			 {caption:"Employee Code", dataField:"EmployeeCode"},
			 {caption:"Employee Name", dataField:"EmployeeName"},
			 {caption:"Projects", dataField:"Projects"},
			 {caption:"Client", dataField:"Client"},
			 {caption:"Till Date", dataField:"ProjectEndDate"
			 ,cellTemplate: function(container,options){
				var ProjectEndDate = convertDateFormat(options.value)
				$("<div>")
				.append(ProjectEndDate)
				.appendTo(container);
				}
			 },
			 {caption:"Project Leads", dataField:"ProjectLeads"},
			 {caption:"Backup Lead", dataField:"BackupLead"},
			 {caption:"Occupied Hours", dataField:"OccupiedHours"},
			 {caption:"Billable Hours", dataField:"BillableHours"},
			 {caption:"Free Hours", dataField:"FreeHours"},
			 
			 {caption:"", dataField:"Id", allowFiltering:false, allowGrouping: false,allowReordering:false, allowSorting:false,allowCollapsing: false, allowExporting: false,
			 cellTemplate: function (container, options) {
			  $("<div>")
				 //.append("<button class='btn btn-xs btn-primary edit-btn' style='display:none;' onclick=updateinprojectdata('"+options.value+"')><i class='fas fa-pencil-alt'></i></button>")
				 .append("<button class='btn btn-xs btn-primary edit-btn' onclick=GetInProjectsHistoryLogs('"+options.value+"')><i class='fas fa-history'></i></button>")  
				 .appendTo(container);
				 },
			 onClick: function (e) {
				updateinprojectdata(data.Id);
			 }
		 }
		 ],
		 summary: {
			totalItems: [{
				column: "sno",
				summaryType: "count"
				
				
			}, 
			// ...
			]                                                                                                                                                                                                                                                                                                                          
		},
		onContentReady: function (e) {  
			
			$("#InProjectscount").text(e.component.totalCount()); 
		}  
	 }).dxDataGrid("instance");
  }
  
//show WOExoired List
  function showWOExpiredList() {
	var filterData = JSON.stringify({
		"IsActive": true
	});

	   callGetListSync('GetResourceswithWOExpired', filterData, function(e){
	   $("#tblWOExpiredList").dxDataGrid({ dataSource: e })
   })
}

//render show woexpired list grid
function renderShowWOExpiredListGrid(){
   var dataGrid = $("#tblWOExpiredList").dxDataGrid({
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
	 onExporting: function(e) {
		var workbook = new ExcelJS.Workbook();
		var worksheet = workbook.addWorksheet('WOExpired-History');
		
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
			saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'WOExpired.xlsx');
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
                       rpm_gridRefresh();
                       dataGrid.refresh();
                   }
               }
           });
       },
	   columns: [
		{caption:"#", dataField:"sno",cssClass:"rno", allowGrouping: false,allowCollapsing: false,allReordering:false
		, 
			cellTemplate: function(container, options) { 
			 container.text(dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex+1); 
		 } 
	 },
		   {caption:"ID", dataField:"Id",visible:false},  
		   {caption:"Employee Code", dataField:"EmployeeCode"},
		   {caption:"Employee Name", dataField:"EmployeeName"},
		   {caption:"Projects", dataField:"Projects"},
		   {caption:"Client", dataField:"Client"},
		   {caption:"Project End Date", dataField:"ProjectEndDate"
		   ,cellTemplate: function(container,options){
			var ProjectEndDate = convertDateFormat(options.value)
			$("<div>")
			.append(ProjectEndDate)
			.appendTo(container);
			}
		 },
		   {caption:"Project Leads", dataField:"ProjectLeads"},
		   {caption:"Backup Lead", dataField:"BackupLead"},
		   {caption:"Occupied Hours", dataField:"OccupiedHours"},
		   {caption:"Billable Hours", dataField:"BillableHours"},
		   {caption:"Free Hours", dataField:"FreeHours"},
		   
           {
               caption:"", dataField:"Id", allowFiltering:false, allowGrouping: false,allowReordering:false, allowSorting:false,allowCollapsing: false, allowExporting: false,
		   cellTemplate: function (container, options) {
			$("<div>")
			   //.append("<button class='btn btn-xs btn-primary edit-btn' style='display:none;' onclick=updatewoexpireddata('"+options.value+"')><i class='fas fa-pencil-alt'></i></button>")
			   .append("<button class='btn btn-xs btn-primary edit-btn' onclick=GetWOExpiredHistoryLogs('"+options.value+"')><i class='fas fa-history'></i></button>")  
			   .appendTo(container);
			   },
		   onClick: function (e) {
			updatewoexpireddata(data.Id);
		   }
	   }
	   ],
	   onContentReady: function (e) {  
		
		$("#WOExpiredListcount").text(e.component.totalCount()); 
	}
   }).dxDataGrid("instance");
}


    

//show WOExoired List
function showNonBillableList() {
	var filterData = JSON.stringify({
		"IsActive": true
	});

    callGetListSync('GetResourcesInNonBillableProject', filterData, function (e) {
	$("#tblNonBillableList").dxDataGrid({ dataSource: e })
   })
}

//render show woexpired list grid
function renderNonBillableList(){
   var dataGrid = $("#tblNonBillableList").dxDataGrid({
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
	 onExporting: function(e) {
		var workbook = new ExcelJS.Workbook();
		var worksheet = workbook.addWorksheet('NonBillable-History');
		
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
			saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'NonBillable.xlsx');
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
                       rpm_gridRefresh();
                       dataGrid.refresh();
                   }
               }
           });
       },
	   columns: [
		{caption:"#", dataField:"sno",cssClass:"rno", allowGrouping: false,allowCollapsing: false,allReordering:false
		, 
			cellTemplate: function(container, options) { 
			 container.text(dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex+1); 
		 } 
	 },{caption:"ID", dataField:"Id",visible:false},  
		   {caption:"Employee Code", dataField:"EmployeeCode"},
		   {caption:"Employee Name", dataField:"EmployeeName"},
           {caption:"Projects", dataField:"Projects"},
		   {caption:"Client", dataField:"Client"},
		   {caption:"Project End Date", dataField:"ProjectEndDate"
		   ,cellTemplate: function(container,options){
			var ProjectEndDate = convertDateFormat(options.value)
			$("<div>")
			.append(ProjectEndDate)
			.appendTo(container);
			}
		 },
		   {caption:"Project Leads", dataField:"ProjectLeads"},
		   {caption:"Backup Lead", dataField:"BackupLead"},
		   {caption:"Occupied Hours", dataField:"OccupiedHours"},
		   {caption:"Billable Hours", dataField:"BillableHours"},
		   {caption:"Free Hours", dataField:"FreeHours"},
		   
           {
               caption:"", dataField:"Id", allowFiltering:false, allowGrouping: false, allowReordering: false, allowSorting: false, allowCollapsing: false, allowExporting: false,
		   cellTemplate: function (container, options) {
			$("<div>")
			   //.append("<button class='btn btn-xs btn-primary edit-btn' style='display:none;' onclick=updatenonbillabledata('"+options.value+"')><i class='fas fa-pencil-alt'></i></button>")
			   .append("<button class='btn btn-xs btn-primary edit-btn' onclick=GetNonBillableHistoryLogs('"+options.value+"')><i class='fas fa-history'></i></button>")   
			   .appendTo(container);
			   },
		   onClick: function (e) {
			updatenonbillabledata(data.Id);
		   }
	   }
	   ],
	   onContentReady: function (e) {  
		
		$("#GetNonBillableListcount").text(e.component.totalCount()); 
	}
   }).dxDataGrid("instance");
}

//show Shadow List
function showShadowList() {
	var filterData = JSON.stringify({
		"IsActive": true
	});

	   callGetListSync('GetResourcesInShadow', filterData, function(e){
	   $("#tblShadowList").dxDataGrid({ dataSource: e })
   })
}

//render showShadow list grid
function renderShadowList(){
   var dataGrid = $("#tblShadowList").dxDataGrid({
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
	 onExporting: function(e) {
		var workbook = new ExcelJS.Workbook();
		var worksheet = workbook.addWorksheet('Shadow-History');
		
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
			saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ShadowList.xlsx');
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
                       rpm_gridRefresh();
                       dataGrid.refresh();
                   }
               }
           });
       },
	   columns: [
		{caption:"#", dataField:"sno",cssClass:"rno", allowGrouping: false,allowCollapsing: false,allReordering:false
		, 
			cellTemplate: function(container, options) { 
			 container.text(dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex+1); 
		 } 
	 },{caption:"ID", dataField:"Id",visible:false},  
		   {caption:"Employee Code", dataField:"EmployeeCode"},
		   {caption:"Employee Name", dataField:"EmployeeName"},
		   {caption:"Projects", dataField:"Projects"},
		   {caption:"Client", dataField:"Client"},
		   {caption:"Project End Date", dataField:"ProjectEndDate"
		   ,cellTemplate: function(container,options){
			var ProjectEndDate = convertDateFormat(options.value)
			$("<div>")
			.append(ProjectEndDate)
			.appendTo(container);
			}
		 },
		   {caption:"Project Leads", dataField:"ProjectLeads"},
		   {caption:"Backup Lead", dataField:"BackupLead"},
		   {caption:"Occupied Hours", dataField:"OccupiedHours"},
		   {caption:"Billable Hours", dataField:"BillableHours"},
		   {caption:"Free Hours", dataField:"FreeHours"},
		   
           {
               caption:"", dataField:"Id", allowFiltering:false, allowGrouping: false, allowReordering: false, allowSorting: false, allowCollapsing: false, allowExporting: false,
		   cellTemplate: function (container, options) {
			$("<div>")
			   //.append("<button class='btn btn-xs btn-primary edit-btn' style='display:none;' onclick=updateshadowdata('"+options.value+"')><i class='fas fa-pencil-alt'></i></button>")
			   .append("<button class='btn btn-xs btn-primary edit-btn' onclick=GetShadowHistoryLogs('"+options.value+"')><i class='fas fa-history'></i></button>")   
			   .appendTo(container);
			   },
		   onClick: function (e) {
			updateshadowdata(data.Id);
		   }
	   }
	   ],
	   onContentReady: function (e) {  
		
		$("#ShadowListcount").text(e.component.totalCount()); 
	}
   }).dxDataGrid("instance");
}

//show Bench List
function showBenchList() {
	var filterData = JSON.stringify({
		"IsActive": true
	});

	   callGetListSync('GetResourcesInBench', filterData, function(e){
	   $("#tblBenchList").dxDataGrid({ dataSource: e })
   })
}

//render Bench list grid
function renderBenchList(){
   var dataGrid = $("#tblBenchList").dxDataGrid({
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
	 onExporting: function(e) {
		var workbook = new ExcelJS.Workbook();
		var worksheet = workbook.addWorksheet('Bench-History');
		
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
			saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'InBenchList.xlsx');
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
                       rpm_gridRefresh();
                       dataGrid.refresh();
                   }
               }
           });
       },
	   columns: [
		{caption:"#", dataField:"sno",cssClass:"rno", allowGrouping: false,allowCollapsing: false,allReordering:false
		, 
			cellTemplate: function(container, options) { 
			 container.text(dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex+1); 
		 } 
	 }, {caption:"ID", dataField:"Id",visible:false},  
		   {caption:"EmployeeCode", dataField:"EmployeeCode"},
		   {caption:"EmployeeName", dataField:"EmployeeName"},
		   {caption:"BenchStartDate", dataField:"BenchStartDate"
		   ,cellTemplate: function(container,options){
			var BenchStartDate = convertDateFormat(options.value)
			$("<div>")
			.append(BenchStartDate)
			.appendTo(container);
			}
		 },
		   {caption:"NoOfBenchDays", dataField:"NoOfBenchDays"},
		   {caption:"BackupLead", dataField:"BackupLead"},
		   
           {
               caption:"", dataField:"Id", allowFiltering:false, allowGrouping: false, allowReordering: false, allowSorting: false, allowCollapsing: false, allowExporting: false,
		   cellTemplate: function (container, options) {
			$("<div>")
			   //.append("<button class='btn btn-xs btn-primary edit-btn' style='display:none;' onclick=updatebenchlistdata('"+options.value+"')><i class='fas fa-pencil-alt'></i></button>")
			   .append("<button class='btn btn-xs btn-primary edit-btn' onclick=GetBenchHistoryLogs('"+options.value+"')><i class='fas fa-history'></i></button>")   
			   .appendTo(container);
			   },
		   onClick: function (e) {
			updatebenchlistdata(data.Id);
		   }
	   }
	   ],
	   onContentReady: function (e) {  
		
		$("#BenchListcount").text(e.component.totalCount()); 
	}
   }).dxDataGrid("instance");
}

//show Consultants List
function showConsultantsList() {
	var filterData = JSON.stringify({
		"IsActive": true
	});

	   callGetListSync('GetConsultants', filterData, function(e){
	   $("#tblConsultantsList").dxDataGrid({ dataSource: e })
   })
}

//render Consultants list grid
function renderConsultantsList(){
   var dataGrid = $("#tblConsultantsList").dxDataGrid({
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
			saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ConsultantsList.xlsx');
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
                       rpm_gridRefresh();
                       dataGrid.refresh();
                   }
               }
           });
       },
	   columns: [
		{caption:"#", dataField:"sno",cssClass:"rno", allowGrouping: false,allowCollapsing: false,allReordering:false
		, 
			cellTemplate: function(container, options) { 
			 container.text(dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex+1); 
		 } 
	 }, {caption:"ID", dataField:"id",visible:false},  
		   {caption:"EmployeeName", dataField:"EmployeeName"},
		   {caption:"EmailId", dataField:"EmailId"},
		   {caption:"PhoneNumber", dataField:"PhoneNumber"},
		   {caption:"SkypeId", dataField:"SkypeId"},
		   {caption:"Projects", dataField:"Projects"},
		   {caption:"Client", dataField:"Client"},
		   {caption:"ProjectStartDate", dataField:"ProjectStartDate"  ,cellTemplate: function(container,options){
			var ProjectStartDate = convertDateFormat(options.value)
			$("<div>")
			.append(ProjectStartDate)
			.appendTo(container);
			}},
		   {caption:"ProjectEndDate", dataField:"ProjectEndDate"  ,cellTemplate: function(container,options){
			var ProjectEndDate = convertDateFormat(options.value)
			$("<div>")
			.append(ProjectEndDate)
			.appendTo(container);
			}},
		   {caption:"ProjectLeads", dataField:"ProjectLeads"},
		   {caption:"BillableHours", dataField:"BillableHours"},
		   {caption:"FreeHours", dataField:"FreeHours"},
           {
               caption:"", dataField:"id", allowFiltering:false, allowGrouping: false, allowReordering: false, allowSorting: false, allowCollapsing: false, allowExporting: false,
		   cellTemplate: function (container, options) {
			$("<div>")
			   .append("<button class='btn btn-xs btn-primary edit-btn' onclick=updateconsultantslistdata('"+options.value+"')><i class='fas fa-pencil-alt'></i></button> <button class='btn btn-xs btn-danger delete-btn' onclick=deleteconsultantslistdata('"+options.value+"')><i class='fas fa-trash-alt'></i></button>")
			   .append("<button class='btn btn-xs btn-primary edit-btn' onclick=GetConsultantHistoryLogs('"+options.value+"')><i class='fas fa-history'></i></button>")   
			   .appendTo(container);
			   },
		   onClick: function (e) {
			updateconsultantslistdata(data.Id);
		   }
	   }
	   ],
	   onContentReady: function (e) {  
		$("#ConsultantsListcount").text(e.component.totalCount()); 
	}
   }).dxDataGrid("instance");
}

// Open  History Modal Popup
function renderHistoryPopup(){
	var popupOptions = {
		width: "85%",
		height: "65%",
		contentTemplate: 'HistoryModelContent',
		showTitle: true,
		title: "History"
	  };
	  
	  popup = $("#HistoryModel").dxPopup(popupOptions).dxPopup("instance");
	  popup.show();        
}
//Get History Logs
function GetInProjectsHistoryLogs(id) {    
	renderHistoryPopup();	
	var InProjectshistoryList = callgetlist('GetResourcePoolStatusHistoryById', '{"IsActive":"True","EmployeeId":"' + id + '"}');	
	var historyData = InProjectshistoryList;
 var dataGrid=  $("#HistoryGrid").dxDataGrid({
	dataSource:InProjectshistoryList,
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
  columnChooser: {
	  enabled: true
  },
  rowAlternationEnabled:true,
  filterPanel: { visible: true },
  allowColumnReordering: true,
  allowColumnResizing: true,
  showBorders: true,
  onExporting: function(e) {
	 var workbook = new ExcelJS.Workbook();
	 var worksheet = workbook.addWorksheet('History');
	 
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
		 saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'InProject-HistoryData.xlsx');
		 });
		 });
		 e.cancel = true;
		 },
		 onCellPrepared: function (e) {			 
					if (e.rowType === 'header' || e.rowType === "filter")
						return;
					if (e.column.dataField === 'ModifiedByName' || e.column.dataField === 'ModifiedDateTime' || e.column.dataField === 'Status' || e.column.dataField == undefined) {
						return;
					}
					if (e.rowType === 'data') {
						if (historyData.length > (e.rowIndex + 1)) {
							var existingValue = historyData[e.rowIndex + 1][e.column.dataField];
							if (existingValue !== e.value) {
								e.cellElement.css('backgroundColor', "#fcd912");
							}
						}
					}
				},
	columns: [
	 {caption:"#", dataField:"sno",visible:false,cssClass:"rno", allowGrouping: false,allowCollapsing: false,allReordering:false
	 , 
		 cellTemplate: function(container, options) { 
		  container.text(dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex+1); 
	  } 
  },
  {caption:"ID", dataField:"EmployeeId",visible:false},  
  {caption:"Employee Code", dataField:"EmployeeCode",visible:false},
  {caption:"Employee Name", dataField:"EmployeeName"},
  {caption:"Projects", dataField:"Projects"},
  {caption:"Client", dataField:"Client"},
  {caption:"Till Date", dataField:"EndDate"
  ,cellTemplate: function(container,options){
	 var ProjectEndDate = convertDateFormat(options.value)
	 $("<div>")
	 .append(ProjectEndDate)
	 .appendTo(container);
	 }
  },
  {caption:"Project Leads", dataField:"ProjectLeads"},
  {caption:"Backup Lead", dataField:"BackupLead"},
  {caption:"Occupied Hours", dataField:"OccupiedHours"},
  {caption:"Billable Hours", dataField:"BillableHours"},
  {caption:"Free Hours", dataField:"FreeHours"},		
		 {
						dataField: "ModifiedByName",
						caption: "User"
					}, {caption:"Modified Date", dataField:"ModifiedDateTime", dataType:"datetime"
				  }, {
					dataField: "Status"
				}
		
	]
}).dxDataGrid("instance");

}

//Get History Logs
function GetWOExpiredHistoryLogs(id) {
	
	renderHistoryPopup();
	var WOExpiredHistorList = callgetlist('GetResourcePoolStatusHistoryById', '{"IsActive":"True","EmployeeId":"' + id + '"}');
	
	var historyData = WOExpiredHistorList;
 var dataGrid=  $("#HistoryGrid").dxDataGrid({
	dataSource:WOExpiredHistorList,
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
  columnChooser: {
	  enabled: true
  },
  rowAlternationEnabled:true,
  filterPanel: { visible: true },
  allowColumnReordering: true,
  allowColumnResizing: true,
  showBorders: true,
  onExporting: function(e) {
	 var workbook = new ExcelJS.Workbook();
	 var worksheet = workbook.addWorksheet('History');
	 
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
		 saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'WOExpired-HistoryData.xlsx');
		 });
		 });
		 e.cancel = true;
		 },
		 onCellPrepared: function (e) {
					if (e.rowType === 'header' || e.rowType === "filter")
						return;
					if (e.column.dataField === 'ModifiedByName' || e.column.dataField === 'ModifiedDateTime' || e.column.dataField === 'Status' || e.column.dataField == undefined) {
						return;
					}
					if (e.rowType === 'data') {
						if (historyData.length > (e.rowIndex + 1)) {
							var existingValue = historyData[e.rowIndex + 1][e.column.dataField];
							if (existingValue !== e.value) {
								e.cellElement.css('backgroundColor', "#fcd912");
							}
						}
					}
				},
	columns: [
	 {caption:"#", dataField:"sno",cssClass:"rno",visible:false, allowGrouping: false,allowCollapsing: false,allReordering:false
	 , 
		 cellTemplate: function(container, options) { 
		  container.text(dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex+1); 
	  } 
  },
  {caption:"ID", dataField:"EmployeeId",visible:false},  
  {caption:"Employee Code", dataField:"EmployeeCode",visible:false},
  {caption:"Employee Name", dataField:"EmployeeName"},
  {caption:"Projects", dataField:"Projects"},
  {caption:"Client", dataField:"Client"},
  {caption:"Project End Date", dataField:"EndDate"
  ,cellTemplate: function(container,options){
   var ProjectEndDate = convertDateFormat(options.value)
   $("<div>")
   .append(ProjectEndDate)
   .appendTo(container);
   }
},
  {caption:"Project Leads", dataField:"ProjectLeads"},
  {caption:"Backup Lead", dataField:"BackupLead"},
  {caption:"Occupied Hours", dataField:"OccupiedHours"},
  {caption:"Billable Hours", dataField:"BillableHours"},
  {caption:"Free Hours", dataField:"FreeHours"},
  {
	dataField: "ModifiedByName",
	caption: "User"
}, {caption:"Modified Date", dataField:"ModifiedDateTime", dataType:"datetime"
}, {
dataField: "Status"
}
	]
}).dxDataGrid("instance");

}

//Get History Logs
function GetNonBillableHistoryLogs(id) {
	
	renderHistoryPopup();

	var NonBillableHistoryList = callgetlist('GetResourcePoolStatusHistoryById', '{"IsActive":"True","EmployeeId":"' + id + '"}');
	
	var historyData = NonBillableHistoryList;
 var dataGrid=  $("#HistoryGrid").dxDataGrid({
	dataSource:NonBillableHistoryList,
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
  columnChooser: {
	  enabled: true
  },
  rowAlternationEnabled:true,
  filterPanel: { visible: true },
  allowColumnReordering: true,
  allowColumnResizing: true,
  showBorders: true,
  onExporting: function(e) {
	 var workbook = new ExcelJS.Workbook();
	 var worksheet = workbook.addWorksheet('History');
	 
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
		 saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'NonBillable-HistoryData.xlsx');
		 });
		 });
		 e.cancel = true;
		 },
		 onCellPrepared: function (e) {
					if (e.rowType === 'header' || e.rowType === "filter")
						return;
					if (e.column.dataField === 'ModifiedByName' || e.column.dataField === 'ModifiedDateTime' || e.column.dataField === 'Status' || e.column.dataField == undefined) {
						return;
					}
					if (e.rowType === 'data') {
						if (historyData.length > (e.rowIndex + 1)) {
							var existingValue = historyData[e.rowIndex + 1][e.column.dataField];
							if (existingValue !== e.value) {
								e.cellElement.css('backgroundColor', "#fcd912");
							}
						}
					}
				},
	columns: [
	 {caption:"#", dataField:"sno",cssClass:"rno",visible:false, allowGrouping: false,allowCollapsing: false,allReordering:false
	 , 
		 cellTemplate: function(container, options) { 
		  container.text(dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex+1); 
	  } 
  },
  {caption:"ID", dataField:"EmployeeId",visible:false},  
  {caption:"Employee Code", dataField:"EmployeeCode",visible:false},
  {caption:"Employee Name", dataField:"EmployeeName"},
  {caption:"Projects", dataField:"Projects"},
  {caption:"Client", dataField:"Client"},
  {caption:"Project End Date", dataField:"EndDate"
  ,cellTemplate: function(container,options){
   var ProjectEndDate = convertDateFormat(options.value)
   $("<div>")
   .append(ProjectEndDate)
   .appendTo(container);
   }
},
  {caption:"Project Leads", dataField:"ProjectLeads"},
  {caption:"Backup Lead", dataField:"BackupLead"},
  {caption:"Occupied Hours", dataField:"OccupiedHours"},
  {caption:"Billable Hours", dataField:"BillableHours"},
  {caption:"Free Hours", dataField:"FreeHours"},
  {
	dataField: "ModifiedByName",
	caption: "User"
}, {caption:"Modified Date", dataField:"ModifiedDateTime", dataType:"datetime"
}, {
dataField: "Status"
}
	]
}).dxDataGrid("instance");

}

//Get History Logs
function GetShadowHistoryLogs(id) {
	
	renderHistoryPopup();
	var ShadowHistoryList = callgetlist('GetResourcePoolStatusHistoryById', '{"IsActive":"True","EmployeeId":"' + id + '"}');
	
	var historyData = ShadowHistoryList;
 var dataGrid=  $("#HistoryGrid").dxDataGrid({
	dataSource:ShadowHistoryList,
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
  columnChooser: {
	  enabled: true
  },
  rowAlternationEnabled:true,
  filterPanel: { visible: true },
  allowColumnReordering: true,
  allowColumnResizing: true,
  showBorders: true,
  onExporting: function(e) {
	 var workbook = new ExcelJS.Workbook();
	 var worksheet = workbook.addWorksheet('History');
	 
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
		 saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Shadow-HistoryData.xlsx');
		 });
		 });
		 e.cancel = true;
		 },
		 onCellPrepared: function (e) {
					if (e.rowType === 'header' || e.rowType === "filter")
						return;
					if (e.column.dataField === 'ModifiedByName' || e.column.dataField === 'ModifiedDateTime' || e.column.dataField === 'Status' || e.column.dataField == undefined) {
						return;
					}
					if (e.rowType === 'data') {
						if (historyData.length > (e.rowIndex + 1)) {
							var existingValue = historyData[e.rowIndex + 1][e.column.dataField];
							if (existingValue !== e.value) {
								e.cellElement.css('backgroundColor', "#fcd912");
							}
						}
					}
				},
	columns: [
	 {caption:"#", dataField:"sno",cssClass:"rno",visible:false, allowGrouping: false,allowCollapsing: false,allReordering:false
	 , 
		 cellTemplate: function(container, options) { 
		  container.text(dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex+1); 
	  } 
  },
  {caption:"ID", dataField:"EmployeeId",visible:false},  
  {caption:"Employee Code", dataField:"EmployeeCode",visible:false},
  {caption:"Employee Name", dataField:"EmployeeName"},
  {caption:"Projects", dataField:"Projects"},
  {caption:"Client", dataField:"Client"},
  {caption:"Project End Date", dataField:"EndDate"
  ,cellTemplate: function(container,options){
   var ProjectEndDate = convertDateFormat(options.value)
   $("<div>")
   .append(ProjectEndDate)
   .appendTo(container);
   }
},
  {caption:"Project Leads", dataField:"ProjectLeads"},
  {caption:"Backup Lead", dataField:"BackupLead"},
  {caption:"Occupied Hours", dataField:"OccupiedHours"},
  {caption:"Billable Hours", dataField:"BillableHours"},
  {caption:"Free Hours", dataField:"FreeHours"},		
		{
			dataField: "ModifiedByName",
			caption: "User"
		}, {caption:"Modified Date", dataField:"ModifiedDateTime", dataType:"datetime"
		}, {
		dataField: "Status"
		}
		
	]
}).dxDataGrid("instance");

}

//Get History Logs
function GetBenchHistoryLogs(id) {
	
	renderHistoryPopup();

	var BenchHistoryList = callgetlist('GetResourcePoolStatusHistoryById', '{"IsActive":"True","EmployeeId":"' + id + '"}');
	
	var historyData = BenchHistoryList;
 var dataGrid=  $("#HistoryGrid").dxDataGrid({
	dataSource:BenchHistoryList,
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
  columnChooser: {
	  enabled: true
  },
  rowAlternationEnabled:true,
  filterPanel: { visible: true },
  allowColumnReordering: true,
  allowColumnResizing: true,
  showBorders: true,
  onExporting: function(e) {
	 var workbook = new ExcelJS.Workbook();
	 var worksheet = workbook.addWorksheet('History');
	 
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
		 saveAs(new Blob([buffer], { type: 'application/octet-stream' }), ' Bench-HistoryData.xlsx');
		 });
		 });
		 e.cancel = true;
		 },
		 onCellPrepared: function (e) {
					if (e.rowType === 'header' || e.rowType === "filter")
						return;
					if (e.column.dataField === 'ModifiedByName' || e.column.dataField === 'ModifiedDateTime' || e.column.dataField === 'Status' || e.column.dataField === undefined) {
						return;
					}
					if (e.rowType === 'data') {
						if (historyData.length > (e.rowIndex + 1)) {
							var existingValue = historyData[e.rowIndex + 1][e.column.dataField];
							if (existingValue !== e.value) {
								e.cellElement.css('backgroundColor', "#fcd912");
							}
						}
					}
				},
	columns: [
	 {caption:"#", dataField:"sno",cssClass:"rno",visible:false, allowGrouping: false,allowCollapsing: false,allReordering:false
	 , 
		 cellTemplate: function(container, options) { 
		  container.text(dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex+1); 
	  } 
  },
  {caption:"ID", dataField:"EmployeeId",visible:false},  
  {caption:"EmployeeCode", dataField:"EmployeeCode",visible:false},
  {caption:"EmployeeName", dataField:"EmployeeName"},
  {caption:"BenchStartDate", dataField:"StartDate"
  ,cellTemplate: function(container,options){
   var BenchStartDate = convertDateFormat(options.value)
   $("<div>")
   .append(BenchStartDate)
   .appendTo(container);
   }
},
  {caption:"NoOfBenchDays", dataField:"NoOfBenchDays"},
  {caption:"BackupLead", dataField:"BackupLead"},
  {
	dataField: "ModifiedByName",
	caption: "User"
}, {caption:"Modified Date", dataField:"ModifiedDateTime", dataType:"datetime"
}, {
dataField: "Status"
}
	]
}).dxDataGrid("instance");

}

//Get History Logs
function GetConsultantHistoryLogs(id) {
	
	renderHistoryPopup();
	
	var ConsultantHistoryList = callgetlist('GetConsultantHistoryById', '{"IsActive":"True","ConsultantId":"' + id + '"}');
	
	var historyData = ConsultantHistoryList;
 var dataGrid=  $("#HistoryGrid").dxDataGrid({
	dataSource:ConsultantHistoryList,
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
  columnChooser: {
	  enabled: true
  },
  rowAlternationEnabled:true,
  filterPanel: { visible: true },
  allowColumnReordering: true,
  allowColumnResizing: true,
  showBorders: true,
  onExporting: function(e) {
	 var workbook = new ExcelJS.Workbook();
	 var worksheet = workbook.addWorksheet('Consultant-History');
	 
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
		 saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Consultant-HistoryData.xlsx');
		 });
		 });
		 e.cancel = true;
		 }, onCellPrepared: function (e) {
			if (e.rowType === 'header' || e.rowType === "filter")
				return;
		    if (e.column.dataField === 'ModifiedByName' || e.column.dataField === 'ModifiedDateTime' || e.column.dataField === 'Status' || e.column.dataField === undefined) {
					return;
				}
			if (e.rowType === 'data') {
				if (historyData.length > (e.rowIndex + 1)) {
					var existingValue = historyData[e.rowIndex + 1][e.column.dataField];
					if (existingValue !== e.value) {
						e.cellElement.css('backgroundColor', "#fcd912");
					}
				}
			}
		},
	columns: [
	 {caption:"#", dataField:"sno",visible:false,cssClass:"rno", allowGrouping: false,allowCollapsing: false,allReordering:false
	 , 
		 cellTemplate: function(container, options) { 
		  container.text(dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex+1); 
	  } 
  },
  {caption:"ID", dataField:"id",visible:false},  
  {caption:"EmployeeName", dataField:"EmployeeName",visible:false},
  {caption:"EmailId", dataField:"EmailId"},
  {caption:"PhoneNumber", dataField:"PhoneNumber"},
  {caption:"SkypeId", dataField:"SkypeId"},
  {caption:"Projects", dataField:"Projects"},
  {caption:"Client", dataField:"Client"},
  {caption:"Start Date", dataField:"ProjectStartDate" ,cellTemplate: function(container,options){
	var ProjectStartDate = convertDateFormat(options.value)
	$("<div>")
	.append(ProjectStartDate)
	.appendTo(container);
	}},
  {caption:"End Date", dataField:"ProjectEndDate" ,cellTemplate: function(container,options){
	var ProjectEndDate = convertDateFormat(options.value)
	$("<div>")
	.append(ProjectEndDate)
	.appendTo(container);
	}},
  {caption:"ProjectLeads", dataField:"ProjectLeads"},
  {caption:"BillableHours", dataField:"BillableHours"},
  {caption:"FreeHours", dataField:"FreeHours"},	
  {
	dataField: "ModifiedByName",
	caption: "User"
}, {caption:"Modified Date", dataField:"ModifiedDateTime", dataType:"datetime"
}, {
dataField: "Status"
}
		
	]
}).dxDataGrid("instance");

}


// Open Delete Consultants History Modal Popup
function renderDeleteConsultantsHistoryPopup(){
	var popupOptions = {
		width: "85%",
		height: "65%",
		contentTemplate: 'DeletedConsultantHistoryModelContent',
		showTitle: true,
		title: "Deleted Consultants"
	  };
	  
	  popup = $("#DeletedConsultantHistoryModel").dxPopup(popupOptions).dxPopup("instance");
	  popup.show();        
}
//Get History Logs
function deleteConsultantModel() {
	
	renderDeleteConsultantsHistoryPopup();	
	var GetDeletedConsultantHistoryList = callgetlist('GetConsultantsDeletedHistory', '{"IsActive":"True"}');
	
	var dataSourceVal = GetDeletedConsultantHistoryList;
 var dataGrid=  $("#DeletedConsultantHistoryGrid").dxDataGrid({
	dataSource:dataSourceVal,
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
  columnChooser: {
	  enabled: true
  },
  rowAlternationEnabled:true,
  filterPanel: { visible: true },
  allowColumnReordering: true,
  allowColumnResizing: true,
  showBorders: true,
  onExporting: function(e) {
	 var workbook = new ExcelJS.Workbook();
	 var worksheet = workbook.addWorksheet('Consultants-Deleted-History');
	 
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
		 saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Consultants-Deleted-HistoryData.xlsx');
		 });
		 });
		 e.cancel = true;
		 },
	
	columns: [
	 {caption:"#", dataField:"sno",visible:false,cssClass:"rno", allowGrouping: false,allowCollapsing: false,allReordering:false
	 , 
		 cellTemplate: function(container, options) { 
		  container.text(dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex+1); 
	  } 
  },
  {caption:"ID", dataField:"Id",visible:false},  
  {caption:"ConsultantId", dataField:"ConsultantId",visible:false},
  {caption:"EmployeeName", dataField:"EmployeeName"},
  {caption:"EmailId", dataField:"EmailId"},
  {caption:"PhoneNumber", dataField:"PhoneNumber"},
  {caption:"SkypeId", dataField:"SkypeId"},
  {caption:"Projects", dataField:"Projects"},
  {caption:"Client", dataField:"Client"},
  {caption:"ProjectStartDate", dataField:"ProjectStartDate",cellTemplate: function(container,options){
	var ProjectStartDate = convertDateFormat(options.value)
	$("<div>")
	.append(ProjectStartDate)
	.appendTo(container);
	}},
  {caption:"ProjectEndDate", dataField:"ProjectEndDate",cellTemplate: function(container,options){
	var ProjectEndDate = convertDateFormat(options.value)
	$("<div>")
	.append(ProjectEndDate)
	.appendTo(container);
	}},
  {caption:"ProjectLeads", dataField:"ProjectLeads"},
  {caption:"BillableHours", dataField:"BillableHours"},
  {caption:"FreeHours", dataField:"FreeHours"},	
{
	caption:"", dataField:"ConsultantId", allowFiltering:false, allowGrouping: false, allowReordering: false, allowSorting: false, allowCollapsing: false, allowExporting: false,
cellTemplate: function (container, options) {
 $("<div>")	
	.append("<button class='btn btn-xs btn-primary edit-btn' onclick=GetConsultantHistoryLogs('"+options.value+"')><i class='fas fa-history'></i></button>")   
	.appendTo(container);
	}
}
		
	]
}).dxDataGrid("instance");

}

//Resources & Effective resources billing
function BillingCount() {
	// var result = callgetlist('http://synergy.g2techsoft.com/synergydashboardapi/api/synergy/GetData?query=GetBillingCountInfoForDashboard');
	var result = callgetlist('GetBillingCountInfoForDashboard');
	var ResourceBillingCount = (result[0].ResourceBillingCount)?result[0].ResourceBillingCount:0;
	$("#ResourceBillingCount").text(ResourceBillingCount); 
	/*//Resources
	var ResourcesOnBilling = (result[0].ResourceBillingCount)?result[0].ResourceBillingCount:0;
	var ResBillPercentage = (result[0].ResourceBillingPercent)?result[0].ResourceBillingPercent:0;;
	$("#ResBillCount").text(ResourcesOnBilling); 
	$("#ResBillPercentage").text(ResBillPercentage);
	//Effective resources
	var EffResourcesOnBilling = (result[0].EffectiveResourceBillingCount)?result[0].EffectiveResourceBillingCount:0;
	var EffResBillPercentage = (result[0].EffectiveResourceBillingPercent)?result[0].EffectiveResourceBillingPercent:0;
	$("#EffResBillCount").text(EffResourcesOnBilling); 
	$("#EffResBillPercentage").text(EffResBillPercentage);*/
}