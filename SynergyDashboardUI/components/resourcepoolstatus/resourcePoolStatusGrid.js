$(document).ready(function () {
    $('#btninprojectStatus')[0].click();
    showinprojectsListStatus();
    showWOExpiredListStatus();
    showNonBillableListStatus();
    showShadowListStatus();
    showBenchListStatus();
    showConsultantsListStatus();
});

    //refresh rps_grid(){
    function rps_refreshgrid() {
        showinprojectsListStatus();
        showWOExpiredListStatus();
        showNonBillableListStatus();
        showShadowListStatus();
        showBenchListStatus();
        showConsultantsListStatus();
        BillingCount();
    }

//DATE format
 function convertDateFormat(dateformat) {
    var sdate = dateformat;
    var sd = sdate;
    var startdateChanged = sd.replace(/\//g, "-");
    startdateChanged = startdateChanged.replace("T00:00:00", "");
    startdateChanged = startdateChanged.split('-');

    var mm = parseInt(startdateChanged[1]);
    var month = (moment().month(mm - 1).format("MMM"));
    startdateChanged = startdateChanged[2] + "-" + month + "-" + startdateChanged[0];
    return startdateChanged;
}

//show in project list
function showinprojectsListStatus() {
    var filterData = JSON.stringify({
        "IsActive": true
    });

    callGetListSync('GetResourcesInProject', filterData, function (e) {
        $("#tblinprojectsListStatus").dxDataGrid({ dataSource: e })
    })
}

//render show in project List Grid
function rendershowinprojectsListGridStatus() {
    var dataGrid = $("#tblinprojectsListStatus").dxDataGrid({
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
        rowAlternationEnabled: true,
        filterPanel: { visible: true },
        allowColumnReordering: true,
        allowColumnResizing: true,
        showBorders: true,
        onExporting: function (e) {

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
            }).then(function () {
                // https://github.com/exceljs/exceljs#writing-xlsx
                workbook.xlsx.writeBuffer().then(function (buffer) {
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
                        rps_refreshgrid();
                        dataGrid.refresh();
                    }
                }
            });
        },
        columns: [
            {
                caption: "#", dataField: "sno", cssClass: "rno", allowGrouping: false, allowCollapsing: false, allReordering: false
                ,
                cellTemplate: function (container, options) {
                    container.text(dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex + 1);
                }
            },
            { caption: "ID", dataField: "Id", visible: false },
            { caption: "Employee Code", dataField: "EmployeeCode" },
            { caption: "Employee Name", dataField: "EmployeeName" },
            { caption: "Projects", dataField: "Projects" },
            { caption: "Client", dataField: "Client" },
            {
                caption: "Till Date", dataField: "ProjectEndDate"
                , cellTemplate: function (container, options) {
                    var ProjectEndDate = convertDateFormat(options.value)
                    $("<div>")
                        .append(ProjectEndDate)
                        .appendTo(container);
                }
            },
            { caption: "Project Leads", dataField: "ProjectLeads" },
            { caption: "Backup Lead", dataField: "BackupLead" },
            { caption: "Occupied Hours", dataField: "OccupiedHours" },
            { caption: "Billable Hours", dataField: "BillableHours" },
            { caption: "Free Hours", dataField: "FreeHours" },
 
        ],
        summary: {
            totalItems: [{
                column: "sno",
                summaryType: "count"


            }

            ]
        },
        onContentReady: function (e) {

            $("#InProjectscountStatus").text(e.component.totalCount());
        }
    }).dxDataGrid("instance");
}

//show WOExoired List
function showWOExpiredListStatus() {
    var filterData = JSON.stringify({
        "IsActive": true
    });

    callGetListSync('GetResourceswithWOExpired', filterData, function (e) {
        $("#tblWOExpiredListStatus").dxDataGrid({ dataSource: e })
    })
}

//render show woexpired list grid
function renderShowWOExpiredListGridStatus() {
    var dataGrid = $("#tblWOExpiredListStatus").dxDataGrid({
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
        rowAlternationEnabled: true,
        filterPanel: { visible: true },
        allowColumnReordering: true,
        allowColumnResizing: true,
        showBorders: true,
        onExporting: function (e) {
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
            }).then(function () {
                // https://github.com/exceljs/exceljs#writing-xlsx
                workbook.xlsx.writeBuffer().then(function (buffer) {
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
                        rps_refreshgrid();
                        dataGrid.refresh();
                    }
                }
            });
        },
        columns: [
            {
                caption: "#", dataField: "sno", cssClass: "rno", allowGrouping: false, allowCollapsing: false, allReordering: false
                ,
                cellTemplate: function (container, options) {
                    container.text(dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex + 1);
                }
            },
            { caption: "ID", dataField: "Id", visible: false },
            { caption: "Employee Code", dataField: "EmployeeCode" },
            { caption: "Employee Name", dataField: "EmployeeName" },
            { caption: "Projects", dataField: "Projects" },
            { caption: "Client", dataField: "Client" },
            {
                caption: "Project End Date", dataField: "ProjectEndDate"
                , cellTemplate: function (container, options) {
                    var ProjectEndDate = convertDateFormat(options.value)
                    $("<div>")
                        .append(ProjectEndDate)
                        .appendTo(container);
                }
            },
            { caption: "Project Leads", dataField: "ProjectLeads" },
            { caption: "Backup Lead", dataField: "BackupLead" },
            { caption: "Occupied Hours", dataField: "OccupiedHours" },
            { caption: "Billable Hours", dataField: "BillableHours" },
            { caption: "Free Hours", dataField: "FreeHours" }
        ],
        onContentReady: function (e) {

            $("#WOExpiredListcountStatus").text(e.component.totalCount());
        }
    }).dxDataGrid("instance");
}

//show WOExoired List
function showNonBillableListStatus() {
    var filterData = JSON.stringify({
        "IsActive": true
    });

    callGetListSync('GetResourcesInNonBillableProject', filterData, function (e) {
        $("#tblNonBillableListStatus").dxDataGrid({ dataSource: e })
    })
}

//render show woexpired list grid
function renderNonBillableListStatus() {
    var dataGrid = $("#tblNonBillableListStatus").dxDataGrid({
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
        rowAlternationEnabled: true,
        filterPanel: { visible: true },
        allowColumnReordering: true,
        allowColumnResizing: true,
        showBorders: true,
        onExporting: function (e) {
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
            }).then(function () {
                // https://github.com/exceljs/exceljs#writing-xlsx
                workbook.xlsx.writeBuffer().then(function (buffer) {
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
                        rps_refreshgrid();
                        dataGrid.refresh();
                    }
                }
            });
        },
        columns: [
            {
                caption: "#", dataField: "sno", cssClass: "rno", allowGrouping: false, allowCollapsing: false, allReordering: false
                ,
                cellTemplate: function (container, options) {
                    container.text(dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex + 1);
                }
            }, { caption: "ID", dataField: "Id", visible: false },
            { caption: "Employee Code", dataField: "EmployeeCode" },
            { caption: "Employee Name", dataField: "EmployeeName" },
            { caption: "Projects", dataField: "Projects" },
            { caption: "Client", dataField: "Client" },
            {
                caption: "Project End Date", dataField: "ProjectEndDate"
                , cellTemplate: function (container, options) {
                    var ProjectEndDate = convertDateFormat(options.value)
                    $("<div>")
                        .append(ProjectEndDate)
                        .appendTo(container);
                }
            },
            { caption: "Project Leads", dataField: "ProjectLeads" },
            { caption: "Backup Lead", dataField: "BackupLead" },
            { caption: "Occupied Hours", dataField: "OccupiedHours" },
            { caption: "Billable Hours", dataField: "BillableHours" },
            { caption: "Free Hours", dataField: "FreeHours" }
        ],
        onContentReady: function (e) {

            $("#GetNonBillableListcountStatus").text(e.component.totalCount());
        }
    }).dxDataGrid("instance");
}

//show Shadow List
function showShadowListStatus() {
    var filterData = JSON.stringify({
        "IsActive": true
    });

    callGetListSync('GetResourcesInShadow', filterData, function (e) {
        $("#tblShadowListStatus").dxDataGrid({ dataSource: e })
    })
}

//render showShadow list grid
function renderShadowListStatus() {
    var dataGrid = $("#tblShadowListStatus").dxDataGrid({
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
        rowAlternationEnabled: true,
        filterPanel: { visible: true },
        allowColumnReordering: true,
        allowColumnResizing: true,
        showBorders: true,
        onExporting: function (e) {
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
            }).then(function () {
                // https://github.com/exceljs/exceljs#writing-xlsx
                workbook.xlsx.writeBuffer().then(function (buffer) {
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
                        rps_refreshgrid();
                        dataGrid.refresh();
                    }
                }
            });
        },
        columns: [
            {
                caption: "#", dataField: "sno", cssClass: "rno", allowGrouping: false, allowCollapsing: false, allReordering: false
                ,
                cellTemplate: function (container, options) {
                    container.text(dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex + 1);
                }
            }, { caption: "ID", dataField: "Id", visible: false },
            { caption: "Employee Code", dataField: "EmployeeCode" },
            { caption: "Employee Name", dataField: "EmployeeName" },
            { caption: "Projects", dataField: "Projects" },
            { caption: "Client", dataField: "Client" },
            {
                caption: "Project End Date", dataField: "ProjectEndDate"
                , cellTemplate: function (container, options) {
                    var ProjectEndDate = convertDateFormat(options.value)
                    $("<div>")
                        .append(ProjectEndDate)
                        .appendTo(container);
                }
            },
            { caption: "Project Leads", dataField: "ProjectLeads" },
            { caption: "Backup Lead", dataField: "BackupLead" },
            { caption: "Occupied Hours", dataField: "OccupiedHours" },
            { caption: "Billable Hours", dataField: "BillableHours" },
            { caption: "Free Hours", dataField: "FreeHours" }
        ],
        onContentReady: function (e) {

            $("#ShadowListcountStatus").text(e.component.totalCount());
        }
    }).dxDataGrid("instance");
}

//show Bench List
function showBenchListStatus() {
    var filterData = JSON.stringify({
        "IsActive": true
    });

    callGetListSync('GetResourcesInBench', filterData, function (e) {
        $("#tblBenchListStatus").dxDataGrid({ dataSource: e })
    })
}

//render Bench list grid
function renderBenchListStatus() {
    var dataGrid = $("#tblBenchListStatus").dxDataGrid({
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
        rowAlternationEnabled: true,
        filterPanel: { visible: true },
        allowColumnReordering: true,
        allowColumnResizing: true,
        showBorders: true,
        onExporting: function (e) {
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
            }).then(function () {
                // https://github.com/exceljs/exceljs#writing-xlsx
                workbook.xlsx.writeBuffer().then(function (buffer) {
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
                        rps_refreshgrid();
                        dataGrid.refresh();
                    }
                }
            });
        },
        columns: [
            {
                caption: "#", dataField: "sno", cssClass: "rno", allowGrouping: false, allowCollapsing: false, allReordering: false
                ,
                cellTemplate: function (container, options) {
                    container.text(dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex + 1);
                }
            }, { caption: "ID", dataField: "Id", visible: false },
            { caption: "EmployeeCode", dataField: "EmployeeCode" },
            { caption: "EmployeeName", dataField: "EmployeeName" },
            {
                caption: "BenchStartDate", dataField: "BenchStartDate"
                , cellTemplate: function (container, options) {
                    var BenchStartDate = convertDateFormat(options.value)
                    $("<div>")
                        .append(BenchStartDate)
                        .appendTo(container);
                }
            },
            { caption: "NoOfBenchDays", dataField: "NoOfBenchDays" },
            { caption: "BackupLead", dataField: "BackupLead" }
        ],
        onContentReady: function (e) {

            $("#BenchListcountStatus").text(e.component.totalCount());
        }
    }).dxDataGrid("instance");
}

//show Consultants List
function showConsultantsListStatus() {
    var filterData = JSON.stringify({
        "IsActive": true
    });

    callGetListSync('GetConsultants', filterData, function (e) {
        $("#tblConsultantsListStatus").dxDataGrid({ dataSource: e })
    })
}

//render Consultants list grid
function renderConsultantsListStatus() {
    var dataGrid = $("#tblConsultantsListStatus").dxDataGrid({
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
        rowAlternationEnabled: true,
        columnAutoWidth: false,
        columnFixing: {
            enabled: true
        },
        filterPanel: { visible: true },
        allowColumnReordering: true,
        allowColumnResizing: true,
        showBorders: true,
        onExporting: function (e) {
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
            }).then(function () {
                // https://github.com/exceljs/exceljs#writing-xlsx
                workbook.xlsx.writeBuffer().then(function (buffer) {
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
                        rps_refreshgrid();
                        dataGrid.refresh();
                    }
                }
            });
        },
        columns: [
            {
                caption: "#", dataField: "sno", cssClass: "rno", allowGrouping: false, allowCollapsing: false, allReordering: false
                ,
                cellTemplate: function (container, options) {
                    container.text(dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex + 1);
                }
            }, { caption: "ID", dataField: "id", visible: false },
            { caption: "EmployeeName", dataField: "EmployeeName" },
            {
                caption: "EmailId", dataField: "EmailId",
                cellTemplate: function (container, options) {
                    var fieldData = options.data.EmailId;
                    var html = "<span><a href='mailto:" + fieldData + "'><i class='fas fa-envelope'></i></a> &nbsp;" + fieldData+"</span>";
                    $(html).appendTo(container);
                }
            },
            { caption: "PhoneNumber", dataField: "PhoneNumber" },
            {
                caption: "SkypeId", dataField: "SkypeId",
                cellTemplate: function (container, options) {
                    var fieldData = options.data.EmailId;
                    var html = "<span><a href='skype:" + fieldData + "?chat'><i class='fab fa-skype'></i></a> &nbsp;" + fieldData + "</span>";
                    $(html).appendTo(container);
                }
            },
            { caption: "Projects", dataField: "Projects" },
            { caption: "Client", dataField: "Client" },
            { caption: "ProjectStartDate", dataField: "ProjectStartDate", dataType: "date",
                displayFormat: "yyyy-mm-dd"},
            {caption: "ProjectEndDate", dataField: "ProjectEndDate", dataType: "date",
                displayFormat: "yyyy-mm-dd"},
            { caption: "ProjectLeads", dataField: "ProjectLeads" },
            { caption: "BillableHours", dataField: "BillableHours" },
            { caption: "FreeHours", dataField: "FreeHours" }
        ],
        onContentReady: function (e) {
            $("#ConsultantsListcountStatus").text(e.component.totalCount());
        }
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