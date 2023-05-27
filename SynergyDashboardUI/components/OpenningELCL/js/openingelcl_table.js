function openingELCL_EnterGridDataBind() {
    var filterData = JSON.stringify({
        "ForDate ": $("#elcl_date").dxDateBox('instance').option('value')
    });
    openingELCL_EnterGridData = callgetlist("GetEmployeeListForOpeningBalanceEntry", filterData);
}

function openingELCL_ViewGridDataBind() {
    var filterData = JSON.stringify({
        "TillDate": $("#elcl_date").dxDateBox('instance').option('value')
    });
    openingELCL_ViewGridData = callgetlist("GetLeaveBalance", filterData);
}
function formatDate(date) {  
    var d = new Date(date);  
    var month = '' + (d.getMonth() + 1);  
    var day = '' + d.getDate();  
    var year = d.getFullYear();  

    if (month.length < 2) month = '0' + month;  
    if (day.length < 2) day = '0' + day;  

    return [year, month, day].join('-');  
}  

$(document).ready(function () {

    //logged user data
    var localget = localStorage.getItem("UserCheckRes");
    var jsonData = JSON.parse(localget);
    EmployeeId = jsonData.Data["0"].EmployeeID;

    //set date value for datepcker
    // $("#elcl_date").datepicker().datepicker("setDate", new Date());
    $('#elcl_date').dxDateBox({
        type: 'date',
        value: new Date(),
      });
    getData();
});

function getData() {
    openingELCL_EnterGridDataBind();
    openingELCL_ViewGridDataBind();
    renderOpeningELCL_EnterGrid(openingELCL_EnterGridData);
    renderOpeningELCL_ViewGrid(openingELCL_ViewGridData);
}

function renderOpeningELCL_EnterGrid(data) {
    var OpeningELCLGrid = $("#enter_opening_elcl")
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
                //emptyPanelText: "Drag a column"
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
                            openingELCL_EnterGridDataBind();
                            renderOpeningELCL_EnterGrid(openingELCL_EnterGridData);
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
                            OpeningELCLGrid.pageIndex() * OpeningELCLGrid.pageSize() + options.rowIndex + 1
                        );
                    },
                },
                {
                    caption: "Employee No",
                    dataField: "EmployeeNo",
                },
                {
                    caption: "Display Name",
                    dataField: "EmployeeName",
                },
                {
                    caption: "Department",
                    dataField: "DepartmentName",
                },
                {
                    caption: "Opening EL/CL as On",
                    dataField: "LeaveDate",
                    allowEditing: false,
                    dataType: "date",
                    displayFormat: "yyyy-mm-dd"
                },
                {
                    caption: "EL",
                    dataField: "ELBalance",
                },
                {
                    caption: "CL",
                    dataField: "CLBalance",
                },
                {
                    dataField: "",
                    caption: "Action",
                    width: 150,
                    allowFiltering: false,
                    allowGrouping: false,
                    allowReordering: false,
                    allowSorting: false,
                    allowCollapsing: false,
                    allowExporting: false,
                    cellTemplate: function (container, options) {
                        var empid = options.data["EmployeeId"];
                        var domActions = "";
                        domActions +=
                            "<button class='btn btn-sm btn-primary' id='ActionModal' onclick=opening_elcl_popup('" + empid + "')><i class='glyphicon glyphicon-plus' id='btn-openingelcl-Add' data-toggle='modal'></i></button>";
                        $("<div class='text-center'>")
                            .append($(domActions))
                            .appendTo(container);
                    },
                },
            ],
        })
        .dxDataGrid("instance");
}


function renderOpeningELCL_ViewGrid(data) {

    var OpeningELCL_ViewGrid = $("#view_opening_elcl")
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
                //emptyPanelText: "Drag a column"
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
                            openingELCL_ViewGridDataBind();
                            renderOpeningELCL_ViewGrid(openingELCL_ViewGridData);
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
                            OpeningELCL_ViewGrid.pageIndex() * OpeningELCL_ViewGrid.pageSize() + options.rowIndex + 1
                        );
                    },
                },
                {
                    caption: "Employee No",
                    dataField: "EmployeeNumber",
                },
                {
                    caption: "Display Name",
                    dataField: "DisplayName",
                },
                {
                    caption: "Department",
                    dataField: "Name",
                },
                {
                    caption: "EL",
                    dataField: "ELBalance",
                },
                {
                    caption: "CL",
                    dataField: "CLBalance",
                },
                {
                    caption: "Compensation",
                    dataField: "CompOffBalance",
                },
                {
                    dataField: "",
                    caption: "Action",
                    width: 150,
                    allowFiltering: false,
                    allowGrouping: false,
                    allowReordering: false,
                    allowSorting: false,
                    allowCollapsing: false,
                    allowExporting: false,
                    cellTemplate: function (container, options) {
                        var empid = options.data["ID"];
                        var domActions = "";
                        domActions +=
                            "<button class='btn btn-sm btn-secondary' id='ActionModal' onclick=opening_elcl_view_popup('" + empid + "')><i class='glyphicon glyphicon-eye-open' id='btn-openingelcl-View' data-toggle='modal'></i></button>";
                        $("<div class='text-center'>")
                            .append($(domActions))
                            .appendTo(container);
                    },
                },
            ],
        })
        .dxDataGrid("instance");
}

function opening_elcl_popup(empid) {
    $("#div-opening_elcl-Edit-Modal").appendTo('body').modal("show");
    $(".el_value_err").html('');
    $(".cl_value_err").html('');
    $(".asondate_value_err").html('');

    var filter_valbtn = JSON.stringify({
        "EmployeeId": empid,
        "IsActive": "True"
    });

    callGetListAsync('GetProfilePictuerForEmployeeId', filter_valbtn, function (result) {
        if (result != null) {
            $("#el_cl_profile-img-tag").attr("src", result[0].ProfilePicture);
        }
    })

    openingELCL_EnterGridData.forEach(element => {
        if (element.EmployeeId == empid) {
            $("#elcl_employeeId").text(element.EmployeeId);
            $("#elcl_employeename").text(element.EmployeeName);
            $("#elcl_employee_no").text(element.EmployeeNo);
            $("#elcl_primaryphone_number").text(element.PrimaryPhoneNumber);
            $("#elcl_email").text(element.Email);
            $("#elcl_secondaryphone_number").text(element.SecondaryPhoneNumber);
        }
    })


    var leavebalance = callgetlist('GetOpeningBalanceForEmployee', '{"EmployeeId":"' + empid + '"}')

    leavebalance.forEach(function (key, item) {
        $("#cl_value").val(key.CLBalance);
        $("#el_value").val(key.ELBalance);
        if (key.LeaveDate != null) {
            const dateString = key.LeaveDate;
            const D = new Date(dateString);                 // {object Date}
            // $("#elcl_date_entergrid").val(D.getMonth() + 1 + "/" + D.getDate() + "/" + D.getFullYear());
            $("#elcl_date_entergrid").dxDateBox('instance').option('value',new Date(key.LeaveDate));
        }
        else {
            $("#elcl_date_entergrid").dxDateBox('instance').option('value',new Date($("#elcl_date").dxDateBox('instance').option('value')));
            // $("#elcl_date_entergrid").val($("#elcl_date").dxDateBox('instance').option('value'));
        }
    })
}

function opening_elcl_popup_validation() {
    $(".el_value_err").html('');
    $(".cl_value_err").html('');
    $(".asondate_value_err").html('');
    // var date = document.getElementById("elcl_date_entergrid").value;
    var date =formatDate($("#elcl_date_entergrid").dxDateBox('instance').option('value'));
    var today = new Date();
    const dateString = today
    const D = new Date(dateString);                 // {object Date}
    today = D.getMonth() + 1 + "/" + D.getDate() + "/" + D.getFullYear();
debugger;
    if (date > today) {
        $(".asondate_value_err").html('Please select a date less than or equal to the current date.');
    }
    else {
        debugger;
        if ($("#el_value").val() > 0 && ($("#el_value").val() != "") || $("#cl_value").val() != "" && ($("#cl_value").val() > 0)) {
            employeeId = $("#elcl_employeeId").text();
            employeename = $("#elcl_employeename").text();
            employee_no = $("#elcl_employee_no").text();
            primaryphone_number = $("#elcl_primaryphone_number").text();
            email = $("#elcl_email").text();
            secondaryphone_number = $("#elcl_secondaryphone_number").text();
            el = $("#el_value").val();
            cl = $("#cl_value").val();
            if ($("#el_value").val() != "") {
                dataResourceel_value = {
                    "Method": "PostLeaveLedger",
                    "Data": {
                        "EmployeeId": employeeId,
                        "EntryType": "OP",
                        "LeaveType": "EL",
                        "LeaveDate":formatDate($("#elcl_date_entergrid").dxDateBox('instance').option('value')),
                        "Credit": el
                    }
                }


            }
            if ($("#cl_value").val() != "") {
                dataResourcecl_value = {
                    "Method": "PostLeaveLedger",
                    "Data": {
                        "EmployeeId": employeeId,
                        "EntryType": "OP",
                        "LeaveType": "CL",
                        "LeaveDate": formatDate($("#elcl_date_entergrid").dxDateBox('instance').option('value')),
                        "Credit": cl
                    }
                }



            }
            if ($("#cl_value").val() >= 0 && (/^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)$/g.test($("#cl_value").val())) && $("#el_value").val() >= 0 && (/^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)$/g.test($("#el_value").val()))) {
                // var resultResorce = PostDataCall(dataResource);
                PostDataCallAsync(dataResourceel_value, function (result) {
                    if (result.IsSuccess == true) {
                        swal({
                            title: "Success!",
                            text: "Saved Successfully!",
                            icon: "success",
                            button: "ok!",
                        })
                    }
                    $("#div-opening_elcl-Edit-Modal").appendTo('body').modal("hide");

                });

                PostDataCallAsync(dataResourcecl_value, function (result) {
                    if (result.IsSuccess == true) {
                        swal({
                            title: "Success!",
                            text: "Saved Successfully!",
                            icon: "success",
                            button: "ok!",
                        })
                    }
                    $("#div-opening_elcl-Edit-Modal").appendTo('body').modal("hide");
                });

                getData();
            }
            else {
                if ($("#el_value").val() == "") {
                    $(".el_value_err").html('This Field is required');
                } else if (isNaN($("#el_value").val())) {
                    $(".el_value_err").html('Enter Numeric value only');
                }
                else if ($("#el_value").val() <= 0) {
                    $(".el_value_err").html('EL Must be grater then Zero');
                }
                else {
                    $(".el_value_err").html('')
                }

                if ($("#cl_value").val() == "") {
                    $(".cl_value_err").html('This Field is required');
                } else if (isNaN($("#cl_value").val())) {
                    $(".cl_value_err").html('Enter Numeric value only');
                }
                else if ($("#cl_value").val() <= 0) {
                    $(".el_value_err").html('CL Must be grater then Zero');
                }
                else {
                    $(".cl_value_err").html('')
                }
            }
        }
        else {
            if ($("#el_value").val() == "") {
                $(".el_value_err").html('This Field is required');
            } else if (isNaN($("#el_value").val())) {
                $(".el_value_err").html('Enter Numeric value only');
            }
            else if ($("#el_value").val() <= 0) {
                $(".el_value_err").html('EL Must be grater then Zero');
            }
            else {
                $(".el_value_err").html('')
            }

            if ($("#cl_value").val() == "") {
                $(".cl_value_err").html('This Field is required');
            } else if (isNaN($("#cl_value").val())) {
                $(".cl_value_err").html('Enter Numeric value only');
            }
            else if ($("#cl_value").val() <= 0) {
                $(".el_value_err").html('CL Must be grater then Zero');
            }
            else {
                $(".cl_value_err").html('')
            }
        }
    }
}
function opening_elcl_view_popup(empid) {
    //var endDatae =new Date().toLocaleDateString();
    var date = new Date();
    var endDatae = moment(date).format('MM/DD/YYYY');
    $("#div-opening_elcl-View-Modal").appendTo('body').modal("show");
    var leaveLedgerEmployeeData = [];
    openingELCL_ViewGridData.forEach(element => {
        if (element.ID == empid) {
            leaveLedgerEmployeeData.push(element)
            //leaveLedgerEmployeeData = element;
        }
    });
     var leaveLedgerData = callgetlist('GetLeaveLedgerDetails', '{"EmployeeId":"' + empid + '","EndDate":"'+ endDatae +'"}');
    $("#opening_view_elcl_grid").dxDataGrid({
        dataSource: leaveLedgerEmployeeData,
        // columnAutoWidth: true,
        allowColumnReordering: true,
        showBorders: true,
        columnChooser: {
            enabled: true
        },
        export: {
            enabled: true,
            allowExportSelectedData: true,
        },
        onExporting: function(e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('LeaveLedger');
            
            DevExpress.excelExporter.exportDataGrid({
              component: e.component,
              worksheet: worksheet,
              topLeftCell: { row: 4, column: 1 }
            }).then(function(cellRange) {
              // header
              var headerRow = worksheet.getRow(2);
              headerRow.height = 30;
              worksheet.mergeCells(2, 1, 2, 8);
      
              headerRow.getCell(1).value = 'Leave Ledger';
              headerRow.getCell(1).font = { name: 'Segoe UI Light', size: 22 };
              headerRow.getCell(1).alignment = { horizontal: 'center' };
              
              // footer
              var footerRowIndex = cellRange.to.row + 2;
              var footerRow = worksheet.getRow(footerRowIndex);
              worksheet.mergeCells(footerRowIndex, 1, footerRowIndex, 8);
              
              footerRow.getCell(1).value = 'www.wikipedia.org';
              footerRow.getCell(1).font = { color: { argb: 'BFBFBF' }, italic: true };
              footerRow.getCell(1).alignment = { horizontal: 'right' };
            }).then(function() {
              workbook.xlsx.writeBuffer().then(function(buffer) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'LeaveLedger.xlsx');
              });
            });
            e.cancel = true;
          },
        searchPanel: {
            visible: true,
            width: 240,
            placeholder: "Search...",
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
        onToolbarPreparing: function (e) {
            var dataGrid = e.component;
            e.toolbarOptions.items.unshift({
                location: "after",
                widget: "dxButton",
                options: {
                    icon: "refresh",
                    onClick: function () {
                        opening_elcl_view_popup(empid);
                        dataGrid.refresh();
                    }
                }
            });
        },
        keyExpr: "ID",
        showBorders: true,
        selection: {
            mode: "single"
        },
        onSelectionChanged: function (e) {
            e.component.collapseAll(-1);
            e.component.expandRow(e.currentSelectedRowKeys[0]);
        },
        onContentReady: function (e) {
            if (!e.component.getSelectedRowKeys().length)
                e.component.selectRowsByIndexes(0);
        },
        columns: [
            {
                caption: "Employee Name",
                dataField: "DisplayName",
                alignment: "center",
            },
            {
                caption: "Employee No",
                dataField: "EmployeeNumber",
                alignment: "center",
            },
            {
                caption: "From Date",
                dataField: new Date(),
                alignment: "center",
            }, {
                caption: "To Date",
                dataField: "ToDate",
                alignment: "center",
            },
        ],
        masterDetail: {
            enabled: false,
            template: function (container, options) {
                var currentEmployeeData = options.data;
                $("<div>")
                    .addClass("master-detail-caption")
                    //.text(currentEmployeeData.FirstName + " " + currentEmployeeData.LastName + "'s Tasks:")
                    .appendTo(container);
                $("<div>")
                    .dxDataGrid({
                        showBorders: true,
                        filterRow: {
                            visible: true,
                            applyFilter: "auto",
                        },
                        pager: {
                            showPageSizeSelector: true,
                            allowedPageSizes: [5, 10, 20],
                            showInfo: true,
                        },

                        paging: {
                            pageSize: 10,
                        },
                        columns: [
                            { caption: "Date", dataField: "DATE", dataType: "date", format: 'dd-MM-yyyy' },
                            {
                                headerCellTemplate: function (container) {
                                    container.append($("<div>Details</div>"));
                                },
                                dataField: "Description",
                                alignment: "left",
                            }, {
                                caption: "Compensation",
                                alignment: "center",
                                columns: [{
                                    caption: "Debit",
                                    dataField: "CPDebit",
                                    alignment: "center",
                                }, {
                                    caption: "Credit",
                                    dataField: "CPCredit",
                                    alignment: "center",
                                }, {
                                    caption: "Balance",
                                    dataField: "CPBalance",
                                    alignment: "center",
                                }]
                            },
                            {
                                caption: "CL",
                                alignment: "center",
                                columns: [{
                                    caption: "Debit",
                                    dataField: "CLDebit",
                                    alignment: "center",
                                }, {
                                    caption: "Credit",
                                    dataField: "CLCredit",
                                    alignment: "center",
                                }, {
                                    caption: "Balance",
                                    dataField: "CLBalance",
                                    alignment: "center",
                                }]
                            },
                            {
                                caption: "EL",
                                alignment: "center",
                                columns: [{
                                    caption: "Debit",
                                    dataField: "ELDebit",
                                    alignment: "center",
                                }, {
                                    caption: "Credit",
                                    dataField: "ELCredit",
                                    alignment: "center",
                                }, {
                                    caption: "Balance",
                                    dataField: "ELBalance",
                                    alignment: "center",
                                }]
                            }],
                        dataSource: new DevExpress.data.DataSource({
                            store: new DevExpress.data.ArrayStore({
                                key: "EmployeeId",
                                data: leaveLedgerData
                            }),
                        })
                    }).appendTo(container);
            }
        }
    });
}
