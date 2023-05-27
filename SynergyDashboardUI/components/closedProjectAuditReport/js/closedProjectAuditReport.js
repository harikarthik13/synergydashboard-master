
var  ResourcesGridData = [{
    ID: 1,
    EmployeeNo: '122',
    Employee: 'Mahendran',
    Rating: '8',
  }, {
    ID: 2,
    EmployeeNo: '123',
    Employee: 'Premalatha',
    Rating: '5',
  }];

  var CommentsGridData = [{
    ID: 1,
    Comments: '122',
    
  }, {
    ID: 1,
    Comments: '123',
  }];
  

  
  var TimesheetGridData = [{
    ID: 1,
    Timesheet: '122',
    
  }, {
    ID: 1,
    Timesheet: '123',
  }];
  

  var WoGridData = [{
    ID: 1,
    Wo: '122',
    
  }, {
    ID: 1,
    Wo: '123',
  }];


  var NotesGridData = [{
    ID: 1,
    Notes: '122',
    
  }, {
    ID: 1,
    Notes: '123',
  }];


  
  var DeviationReportGridData = [{
    ID: 1,
    DeviationReport: '122',
    
  }, {
    ID: 1,
    DeviationReport: '123',
  }];

  
// $(document).ready(function () {
   
//     //  getclosedProjectAuditReportDetailsList();
    
// });


function ProjectDetails(){
   var  Id = "DropDownId";
   getclosedProjectAuditReportDetailsList();
 
}


function getclosedProjectAuditReportDetailsList() {
    var filterData = JSON.stringify({
        "Token":Token,
        //"Id":Id
    });
  
    callGetListSync("GetProjectResourcesList", filterData, function (e) {
    //     ResourcesGridData = e;
      bindResourcesDetailsGrid();
     });          

     callGetListSync("GetProjectClosingComments", filterData, function (e) {
       // CommentsGridData = e;
        bindCommentsDetailsGrid();
    });    
    
    callGetListSync("GetProjectTimesheetMonthwise", filterData, function (e) {
        // CommentsGridData = e;
         bindTimesheetDetailsGrid();
     });   

     callGetListSync("GetProjectAllWOrkOrders", filterData, function (e) {
        // CommentsGridData = e;
         bindWoDetailsGrid();
     });   

     callGetListSync("GetProjetAllComments", filterData, function (e) {
        // CommentsGridData = e;
        bindNotesDetailsGrid();
     });   

     callGetListSync("GetProjectDeviationReportResourcewise", filterData, function (e) {
        // CommentsGridData = e;
        bindDeviationReportDetailsGridData();
     });   

     
}


var makeAsyncDataSource = function (jsonFile) {
    console.log(jsonFile);
    return new DevExpress.data.CustomStore({
      loadMode: 'raw',
      key: 'ID',
      load() {
        return $.getJSON(`components/closedProjectAuditReport/js/${jsonFile}`);
      },
    });
  };


  $('#projectSelectBox').dxDropDownBox({
    valueExpr: 'ID',
    placeholder: 'Select a value...',
    displayExpr: 'ProjectName',
    showClearButton: true,
    dataSource: makeAsyncDataSource('Customers.json'),
    contentTemplate(e) {
      const v = e.component.option('value');
      const $dataGrid = $('<div>').dxDataGrid({
        dataSource: e.component.getDataSource(),      
        hoverStateEnabled: true,
        columnWidth: 100,
        // scrolling: {
        //     columnRenderingMode: 'virtual',
        //   },
        paging: { enabled: true, pageSize: 10 },
        filterRow: { visible: true },
        // scrolling: {
        //     useNative: false,
        //     scrollByContent: true,
        //     scrollByThumb: true,
        //     showScrollbar: "onHover" // or "onScroll" | "always" | "never"
        // },
        height: 345,
         width:'auto',
        selection: { mode: 'multiple' },
        selectedRowKeys: v,
        onSelectionChanged(selectedItems) {
          const keys = selectedItems.selectedRowKeys;
          e.component.option('value', keys);
        },
      
      });

      dataGrid = $dataGrid.dxDataGrid('instance');

      e.component.on('valueChanged', (args) => {
        const { value } = args;
        dataGrid.selectRows(value, false);
      });

      return $dataGrid;
    },
  });


function bindResourcesDetailsGrid() {
    var ResourcesGridDataDetails = $("#resources").dxDataGrid({
      dataSource:ResourcesGridData,
      filterRow: {
        visible: true,
        applyFilter: "auto"
        },
        columnMinWidth: 100,
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
        editing: {
            mode: "popup",
            allowAdding: false,
            allowUpdating: false,
            useIcons: true
        },
        columnChooser: {
            enabled: true,
            mode:"select"
        },
        summary: {
            totalItems: [{
                column: "ID",
                summaryType: "count"
            }
            ],
            groupItems: [{
                column: "ID",
                summaryType: "count"
            }]
        },
        rowAlternationEnabled: true,
        columnChooser: {
            enabled: true,
            mode:"select"
        },
      onToolbarPreparing: function (e) {
        var dataGrid = e.component;
        e.toolbarOptions.items.unshift({
          location: "after",
          widget: "dxButton",
          options: {
            icon: "refresh",
            onClick: function () {
                getclosedProjectAuditReportDetailsList();
            },
          },
        });
      },
   
    });
  }


  
function bindCommentsDetailsGrid() {
    var CommentsGridDataDetails = $("#comments").dxDataGrid({
      dataSource:CommentsGridData,
      filterRow: {
        visible: true,
        applyFilter: "auto"
        },
        columnMinWidth: 100,
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
        editing: {
            mode: "popup",
            allowAdding: false,
            allowUpdating: false,
            useIcons: true
        },
        columnChooser: {
            enabled: true,
            mode:"select"
        },
        summary: {
            totalItems: [{
                column: "ID",
                summaryType: "count"
            }
            ],
            groupItems: [{
                column: "ID",
                summaryType: "count"
            }]
        },
        rowAlternationEnabled: true,
        columnChooser: {
            enabled: true,
            mode:"select"
        },
      onToolbarPreparing: function (e) {
        var dataGrid = e.component;
        e.toolbarOptions.items.unshift({
          location: "after",
          widget: "dxButton",
          options: {
            icon: "refresh",
            onClick: function () {
                getclosedProjectAuditReportDetailsList();
            },
          },
        });
      },
   
    });
  }

  
function bindTimesheetDetailsGrid() {
    var TimesheetGridDataDetails = $("#timesheet").dxDataGrid({
      dataSource:TimesheetGridData,
      filterRow: {
        visible: true,
        applyFilter: "auto"
        },
        columnMinWidth: 100,
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
        editing: {
            mode: "popup",
            allowAdding: false,
            allowUpdating: false,
            useIcons: true
        },
        columnChooser: {
            enabled: true,
            mode:"select"
        },
        summary: {
            totalItems: [{
                column: "ID",
                summaryType: "count"
            }
            ],
            groupItems: [{
                column: "ID",
                summaryType: "count"
            }]
        },
        rowAlternationEnabled: true,
        columnChooser: {
            enabled: true,
            mode:"select"
        },
      onToolbarPreparing: function (e) {
        var dataGrid = e.component;
        e.toolbarOptions.items.unshift({
          location: "after",
          widget: "dxButton",
          options: {
            icon: "refresh",
            onClick: function () {
                getclosedProjectAuditReportDetailsList();
            },
          },
        });
      },
   
    });
  }



  
function bindWoDetailsGrid() {
    var WoGridDataDetails = $("#wo").dxDataGrid({
      dataSource:WoGridData,
      filterRow: {
        visible: true,
        applyFilter: "auto"
        },
        columnMinWidth: 100,
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
        editing: {
            mode: "popup",
            allowAdding: false,
            allowUpdating: false,
            useIcons: true
        },
        columnChooser: {
            enabled: true,
            mode:"select"
        },
        summary: {
            totalItems: [{
                column: "ID",
                summaryType: "count"
            }
            ],
            groupItems: [{
                column: "ID",
                summaryType: "count"
            }]
        },
        rowAlternationEnabled: true,
        columnChooser: {
            enabled: true,
            mode:"select"
        },
      onToolbarPreparing: function (e) {
        var dataGrid = e.component;
        e.toolbarOptions.items.unshift({
          location: "after",
          widget: "dxButton",
          options: {
            icon: "refresh",
            onClick: function () {
                getclosedProjectAuditReportDetailsList();
            },
          },
        });
      },
   
    });
  }


  
function bindNotesDetailsGrid() {
    var NotesGridDataDetails = $("#Notes").dxDataGrid({
      dataSource:NotesGridData,
      filterRow: {
        visible: true,
        applyFilter: "auto"
        },
        columnMinWidth: 100,
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
        editing: {
            mode: "popup",
            allowAdding: false,
            allowUpdating: false,
            useIcons: true
        },
        columnChooser: {
            enabled: true,
            mode:"select"
        },
        summary: {
            totalItems: [{
                column: "ID",
                summaryType: "count"
            }
            ],
            groupItems: [{
                column: "ID",
                summaryType: "count"
            }]
        },
        rowAlternationEnabled: true,
        columnChooser: {
            enabled: true,
            mode:"select"
        },
      onToolbarPreparing: function (e) {
        var dataGrid = e.component;
        e.toolbarOptions.items.unshift({
          location: "after",
          widget: "dxButton",
          options: {
            icon: "refresh",
            onClick: function () {
                getclosedProjectAuditReportDetailsList();
            },
          },
        });
      },
   
    });
  }

  


  
function bindDeviationReportDetailsGridData() {
    var DeviationReportGridDataDetails = $("#DeviationReport").dxDataGrid({
      dataSource:DeviationReportGridData,
      filterRow: {
        visible: true,
        applyFilter: "auto"
        },
        columnMinWidth: 100,
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
        editing: {
            mode: "popup",
            allowAdding: false,
            allowUpdating: false,
            useIcons: true
        },
        columnChooser: {
            enabled: true,
            mode:"select"
        },
        summary: {
            totalItems: [{
                column: "ID",
                summaryType: "count"
            }
            ],
            groupItems: [{
                column: "ID",
                summaryType: "count"
            }]
        },
        rowAlternationEnabled: true,
        columnChooser: {
            enabled: true,
            mode:"select"
        },
      onToolbarPreparing: function (e) {
        var dataGrid = e.component;
        e.toolbarOptions.items.unshift({
          location: "after",
          widget: "dxButton",
          options: {
            icon: "refresh",
            onClick: function () {
                getclosedProjectAuditReportDetailsList();
            },
          },
        });
      },
   
    });
  }