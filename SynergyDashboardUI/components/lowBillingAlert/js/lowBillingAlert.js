var lowBillingAlertDetails= [];
$(document).ready(function () {
     getLowBillingDetailsList();
});

function getLowBillingDetailsList() {
    var filterData = JSON.stringify({
        "Token":Token
    });
  
    callGetListSync("GetLowBillingAlertDetails", filterData, function (e) {
        lowBillingAlertDetails = e;
        bindlowBillingDetailsGrid();
    });          
}

function bindlowBillingDetailsGrid() {
    var lowBillingAlertGrid = $("#lowBillingAlert-Grid").dxDataGrid({
      dataSource:lowBillingAlertDetails,
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
                column: "Employee No",
                summaryType: "count"
            }
            ],
            groupItems: [{
                column: "Employee No",
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
                getLowBillingDetailsList();
            },
          },
        });
      },
      columns: [
        {
            dataField: "Employee No",
            caption: "Employee No#",
            alignment:"left",
            width:70
        },
        // {
        //     dataField: "Employee No",
        //     caption: "Employee No"
        // },
        {
            dataField: "Name",
            caption: "Name",
        },
        {
            dataField: "Project Names",
            caption: "Project Names",
        },      
        {
            dataField: "Project Leads",
            caption: "Project Leads"
        },
        {
          dataField: "Backup Lead",
          caption: "Backup Lead",
        },
        {
            dataField: "Billing",
            caption: "Billing",
        },
        {
            dataField: "Client Project Hours",
            caption: "Client Project Hours"
        },
        {
            dataField: "Non-Project Hours",
            caption: "Non-Project Hours",
        },
        {
            dataField: "RFP",
            caption: "RFP",
        },
        {
            dataField: "RRM",
            caption: "RRM",
        },
        {
            dataField: "PreSales",
            caption: "PreSales",
        },
        {
            dataField: "KT",
            caption: "KT",
        },
        {
            dataField: "HR Support",
            caption: "HR Support",
        },
        {
            dataField: "Total Hours",
            caption: "Total Hours",
        },
      ]
    });
  }