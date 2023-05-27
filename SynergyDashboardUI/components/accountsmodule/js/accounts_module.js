

 function renderaccountmoduleGrid(){
    var customers = [{
        "ID": 1,
        "ClientName": "Mark",
        "ProjectName": "xyz",
        "ProjectType": "xyz",
        "WorkOrderID": 150,
        "WorkOrderDate": "01/09/2019",
        "ProjectStartDate": "-",
        "ProjectEndDate": "-"
    }, {
        "ID": 2,
        "ClientName": "David",
        "ProjectName": "xyz",
        "ProjectType": "xyz",
        "WorkOrderID": 151,
        "WorkOrderDate": "12/02/2018",
        "ProjectStartDate": "-",
        "ProjectEndDate": "-"
    }, {
        "ID": 3,
        "ClientName": "Steve",
        "ProjectName": "xyz",
        "ProjectType": "xyz",
        "WorkOrderID": 152,
        "WorkOrderDate": "11/12/2019",
        "ProjectStartDate": "-",
        "ProjectEndDate": "-"
    }, {
        "ID": 4,
        "ClientName": "Mike",
        "ProjectName": "xyz",
        "ProjectType": "xyz",
        "WorkOrderID": 153,
        "WorkOrderDate": "03/04/2019",
        "ProjectStartDate": "-",
        "ProjectEndDate": "-"
    }, {
        "ID": 5,
        "ClientName": "Cheddar",
        "ProjectName": "xyz",
        "ProjectType": "xyz",
        "WorkOrderID": 154,
        "WorkOrderDate": "07/02/2019",
        "ProjectStartDate": "-",
        "ProjectEndDate": "-"
    }];

    var dataGrid = $("#accountmodule_gridview").dxDataGrid({
        dataSource: customers,
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
        columns: [
            {caption:"Client Name", dataField:"ClientName"},
            {caption:"Project Code", dataField:"ProjectName"},
            {caption:"Project Type", dataField:"ProjectType"},
            {caption:"Work Order ID", dataField:"WorkOrderID"},
            {caption:"Work Order Date", dataField:"WorkOrderDate"},   
            {caption:"Project Start Date", dataField:"ProjectStartDate"},  
            {caption:"Project End Date", dataField:"ProjectEndDate"},
            {caption:"", dataField:"ClientName", allowFiltering:false, allowGrouping: false,allowReordering:false, allowSorting:false,allowCollapsing: false,
            cellTemplate: function (container, options) {
             $("<div>")
                .append("<button class='btn btn-xs btn-primary edit-btn' onclick=updateinaccountmoduledata('"+options.value+"')><i class='fas fa-pencil-alt'></i></button>")
                .appendTo(container);
                },
            onClick: function (e) {
               updateinaccountmoduledata(data.ProjectName);
            }
        }
        ]
    }).dxDataGrid("instance");

}

function updateinaccountmoduledata(ProjectName)
{
 $('#AccountModuleModel').appendTo("body").modal("show");
 $("#txtaccountclientname").val(ProjectName);
}