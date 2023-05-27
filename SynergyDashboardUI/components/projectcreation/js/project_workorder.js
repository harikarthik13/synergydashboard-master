function workordergrid_list(){
    var filter_val = JSON.stringify({
        "Token" : localStorage.getItem('securityToken'),
        "ClientId" : ($("#dlClientName option:selected").html())?$("#dlClientName option:selected").html():$("#ClientName").val(),//"Bloved Care",
        "IsActive" : true
    });
    var workOrderListing = callgetlist('GetSignedWorkOrdersForProjectCreationByClient', filter_val);
    renderWorkOrderListing_Grid(workOrderListing);
}

function WorkOrderManagement_Grid(){
    var dlProjectID = $("#dlProjectId").val();

    var filter_data = JSON.stringify({
        "Token" : localStorage.getItem('securityToken'),
        "ProjectId" : (dlProjectID != null && dlProjectID != '') ? dlProjectID : localStorage.getItem('ProjectId'),
        "Status" : true,
        "Message": ""
    });
    var workOrderManagement = callgetlist('GetProjectWorkOrderMapping', filter_data);

    renderWorkOrderManagement_Grid(workOrderManagement);
}

function renderWorkOrderManagement_Grid(data) {

    var WorkOrderManagementGrid = $("#displayProjectWorkOrder")
    .dxDataGrid({
        filterRow: {
        visible: true,
        applyFilter: "auto",
        },
        dataSource: data,
        export: {
        enabled: true,
        allowExportSelectedData: true,
        },
        searchPanel: {
        visible: true,
        width: 240,
        placeholder: "Search...",
        },
        headerFilter: {
        visible: true,
        },
        grouping: {
        autoExpandAll: true,
        },
        pager: {
        showPageSizeSelector: true,
        allowedPageSizes: [5, 10, 20],
        showInfo: true,
        },
        paging: {
        pageSize: 10,
        },
        groupPanel: {
        visible: true,
        emptyPanelText: "Drag a column"
        },
        sorting: {
        mode: "multiple",
        },
        selection: {
        mode: "multiple",
        },
        summary: {
        totalItems: [
            {
            column: "sno",
            summaryType: "count",
            },
        ],
        groupItems: [
            {
            column: "sno",
            summaryType: "count",
            },
        ],
        },
        editing: {
        mode: "popup",
        allowAdding: false,
        allowUpdating: false,
        useIcons: true,
        },
        columnChooser: {
        enabled: true,
        },
        onToolbarPreparing: function (e) {
            var dataGrid = e.component;
            e.toolbarOptions.items.unshift({
              location: "after",
              widget: "dxButton",
              options: {
                icon: "refresh",
                onClick: function () {
                    WorkOrderManagement_Grid();
                    dataGrid.refresh();
                }
              }
            });
          },
        rowAlternationEnabled: true,
        filterPanel: { visible: true },
        allowColumnReordering: true,
        allowColumnResizing: true,
        showBorders: true,
        columns: [
        {
            caption: "#",
            dataField: "sno",
            cssClass: "rno",
            allowGrouping: false,
            allowCollapsing: false,
            allReordering: false,
            width: 70,
            cellTemplate: function (container, options) {
            container.text(
                WorkOrderManagementGrid.pageIndex() * WorkOrderManagementGrid.pageSize() + options.rowIndex + 1
            );
            },
        },
        {
            caption: "ProjectTitle",
            dataField: "ProjectName",
        },
        {
            caption: "WorkOrder Name",
            dataField: "WorkOrderName",
        },
        {
            caption: "WorkOrder Number",
            dataField: "WorkOrderNumber",
        },
        ],
    })
    .dxDataGrid("instance");
}


function renderWorkOrderListing_Grid(data) {
    var WorkOrderListingGrid = $("#list_workorders")
    .dxDataGrid({
        filterRow: {
        visible: true,
        applyFilter: "auto",
        },
        dataSource: data,
        export: {
        enabled: true,
        allowExportSelectedData: true,
        },
        searchPanel: {
        visible: true,
        width: 240,
        placeholder: "Search...",
        },
        headerFilter: {
        visible: true,
        },
        grouping: {
        autoExpandAll: true,
        },
        pager: {
        showPageSizeSelector: true,
        allowedPageSizes: [5, 10, 20],
        showInfo: true,
        },
        paging: {
        pageSize: 10,
        },
        groupPanel: {
        visible: true,
        emptyPanelText: "Drag a column"
        },
        sorting: {
        mode: "multiple",
        },
        selection: {
            mode: 'multiple',
        },
        summary: {
        totalItems: [
            {
            column: "sno",
            summaryType: "count",
            },
        ],
        groupItems: [
            {
            column: "sno",
            summaryType: "count",
            },
        ],
        },
        editing: {
        mode: "popup",
        allowAdding: false,
        allowUpdating: false,
        useIcons: true,
        },
        columnChooser: {
            enabled: true,
            mode:"select"
        },
        // onRowClick: function (e){
        //     GetSelectedWorkOrderID(e);
        // },
        onToolbarPreparing: function (e) {
            var dataGrid = e.component;
            e.toolbarOptions.items.unshift({
              location: "after",
              widget: "dxButton",
              options: {
                icon: "refresh",
                onClick: function () {
                    workordergrid_list();
                    dataGrid.refresh();
                }
              }
            });
          },
        rowAlternationEnabled: true,
        filterPanel: { visible: true },
        allowColumnReordering: true,
        allowColumnResizing: true,
        showBorders: true,
        columns: [
        {
            caption: "#",
            dataField: "sno",
            cssClass: "rno",
            allowGrouping: false,
            allowCollapsing: false,
            allReordering: false,
            width: 70,
            cellTemplate: function (container, options) {
            container.text(
                WorkOrderListingGrid.pageIndex() * WorkOrderListingGrid.pageSize() + options.rowIndex + 1
            );
            },
        },
        {
            caption: "RFP Date",
            dataField: "RFPDate",
        },
        {
            caption: "BDE Name",
            dataField: "BDEName",
        },
        {
            caption: "Work Order",
            dataField: "WorkOrderNumber",
        },
        {
            caption: "Client Name",
            dataField: "ClientName",
        },
        {
            caption: "ProjectTitle",
            dataField: "ProjectName",
        },
        {
            caption: "Signed Date",
            dataField: "WOsignedDate",
        },
        {
            caption: "Status",
            dataField: "IsClientSigned",
        },
        ],
    })
    .dxDataGrid("instance");
}

function GetSelectedWorkOrderID(e){
    var htmlData = e.data.WorkOrderNumber;
    htmlData +=",";
    $("#WorkOrder_ids").html(htmlData);
}

function assignWorkorderto_Project(){
    var selectedRowsDatas = $("#list_workorders").dxDataGrid("instance").getSelectedRowsData();
    var WorkOrderNumberIds = "";
    var dlProjectID = $("#dlProjectId").val();
    if (selectedRowsDatas.length > 0) {
        $.each(selectedRowsDatas, function (key, value) {
            
            WorkOrderNumberIds += (value.WorkOrderId.trim());
            WorkOrderNumberIds += ','; 
            
        });
    }
    WorkOrderNumberIds = WorkOrderNumberIds.slice(0, -1);
    var data = [];
    if($("#dlProjectIsClosed").val() != 1){
        data = {
            "Method": "PostProjectWorkOrderMapping",
            "Data": {
            "Token": localStorage.getItem('securityToken'),
            "ProjectId": (dlProjectID != null && dlProjectID != '') ? dlProjectID : localStorage.getItem('ProjectId'),
            "WorkOrderIds":WorkOrderNumberIds,
            "IsActive" : true
            }
        }
      
        var postCall = PostDataCall(data);

        if (postCall['IsSuccess'] == true) {
            swal({
                title: "Success!",
                text: postCall['Message'],
                icon: "success",
                button: "ok!",
            })
            WorkOrderManagement_Grid();
            workordergrid_list();
        } else {
            alert(postCall['Message']);
        }
    }
}