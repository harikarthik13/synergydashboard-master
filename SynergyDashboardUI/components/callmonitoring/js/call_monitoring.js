

 function rendercallmonitoringGrid(){
     debugger
    var customers = [{
        "ID": "1",
        "ClientName": "Mark",
        "BDEName": "WHO",
        "Time": "10:00 AM",
        "Comment": "Good",
        "Rating": 4
    }, {
        "ID": "2",
        "ClientName": "David",
        "BDEName": "Matrix",
        "Time": "10:00 AM",
            "Comment": "Good",
            "Rating": 3
    }, {
        "ID": "3",
        "ClientName": "Steve",
        "BDEName": "Flex",
        "Time": "10:00 AM",
            "Comment": "Good",
            "Rating": 2
    }, {
        "ID": "4",
        "ClientName": "Mike",
        "BDEName": "xyz",
        "Time": "10:00 AM",
            "Comment": "Good",
            "Rating": 1
    }, {
        "ID": "5",
        "ClientName": "Cheddar",
        "BDEName": "xyz",
        "Time": "10:00 AM",
            "Comment": "Good",
        "Rating": 5
    }];

    var dataGrid = $("#callmonitoring_gridview").dxDataGrid({
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
            {caption:"BDE Name", dataField:"BDEName"},
            {caption:"Client Name", dataField:"ClientName"},         
            { caption: "Time", dataField: "Time" },
            {
                caption: "Audio", dataField: "BDEName", allowFiltering: false, allowGrouping: false, allowReordering: false, allowSorting: false, allowCollapsing: false,
                cellTemplate: function (container, options) {
                    $("<div>")
                        .append("<button class='btn btn-xs btn-primary edit-btn'><i class='fas fa-volume-up'></i></button>")
                        .appendTo(container);
                }
            },
            {
                caption: "Rating", dataField: "Rating", allowFiltering: false, allowGrouping: false, allowReordering: false, allowSorting: false, allowCollapsing: false, width: 200, 
                headerCellTemplate: function (container) {
                    container.append($("<div class='pull-left'>Rating</div>"));
                },
                cellTemplate: function (container, options) {
                    debugger      
                    for (var i = 0; i < parseInt(options.text); i++) {
                            $('<i  class="fas fa-star pull-left">')
                    .appendTo(container);
                    }               
                }
            },
            {caption:"Comment", dataField:"Comment"},
            {caption:"",dataField:"BDEName", allowFiltering:false, allowGrouping: false,allowReordering:false, allowSorting:false,allowCollapsing: false,
             cellTemplate: function (container, options) {
             $("<div>")
                 .append("<button class='btn btn-xs btn-primary edit-btn' onclick=updateincallmontoringmoduledata('"+options.value+"')><i class='fas fa-pencil-alt'></i></button>")
                .appendTo(container);
                },
            onClick: function (e) {
                updateincallmontoringmoduledata(data.ProjectName);
            }        
        }
        ]
    }).dxDataGrid("instance");

}

function updateincallmontoringmoduledata(ProjectName)
{
 $('#CallmonitoringModel').appendTo("body").modal("show");
    $("#txtcallmonitoringBDE").val(ProjectName);
}