
// DatePicker for start and end date
$("#routine_start_date").datepicker({
    autoclose: true,
});
$("#routine_end_date").datepicker({
    autoclose: true,
});

// The below function gets the SARoutineList data from "GetSARoutines" API
const getSARoutineData = () => {
    var filterData = JSON.stringify({
    });
    var getSARoutineList = callgetlist('GetSARoutines', filterData);
    getSARoutineList.map(function (res) {
        return res.Instruction = removeTags(res.Instruction)
    })
    getSARoutineList.map(function (res) {
        return res.EndDate = (res.EndDate == "1900-01-01T00:00:00" || res.EndDate == null) ? "No End Date" : res.EndDate
    })
    renderSARoutineListGrid(getSARoutineList);
}
getSARoutineData();

function removeTags(str) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
}

// The below function append's the value to the form value while opening a modal
function openManageSARoutineListModels(mode, SARoutineId = null) {

    resetroutinedatepicker();
    $('#saroutineid').val('')

    $('.task_error_message').text('')
    $('.routinestart_error_message').text('')
    $('.freqoption_error_message').text('')
    $('.routine_time_error_message').text('')
    $('.masterinstructions_error_message').text('')

    $('.routinestart_error_message').html('');
    $('.routineend_error_message').html('');


    $("#SAAddRoutinemodel").appendTo("body").modal("show");
    var editor = $("#masterinstructions").dxHtmlEditor({
        height: 400,
        toolbar: {
            items: [
                "undo", "redo", "separator",
                {
                    formatName: "size",
                    formatValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"]
                },
                {
                    formatName: "font",
                    formatValues: ["Arial", "Courier New", "Georgia", "Impact", "Lucida Console", "Tahoma", "Times New Roman", "Verdana"]
                },
                "separator", "bold", "italic", "strike", "underline", "separator",
                "alignLeft", "alignCenter", "alignRight", "alignJustify", "separator",
                "orderedList", "bulletList", "separator",
                {
                    formatName: "header",
                    formatValues: [false, 1, 2, 3, 4, 5]
                }, "separator",
                "color", "background", "separator",
                "link", "image", "separator",
                "clear", "codeBlock", "blockquote"
            ]
        },
        mediaResizing: {
            enabled: true
        }
    });


    if (mode == 'edit') {

        var filterData = JSON.stringify({
            "SARoutineId": SARoutineId
        });
        var getSARoutineById = callgetlist('GetSARoutineById', filterData);
        var getSARoutineData = getSARoutineById[0];
        var editEndDate = (getSARoutineData.EndDate == "1900-01-01T00:00:00" || getSARoutineData.EndDate == null) ? $("#routine_end_date").val('') : $("#routine_end_date").val(moment(getSARoutineData.EndDate).format('MM/DD/YYYY'));
        $("#task").val(getSARoutineData.Task);
        $("#routine_start_date").val(moment(getSARoutineData.StartDate).format('MM/DD/YYYY'));

        $(`input[name='freqoption'][value=${getSARoutineData.Frequency}]`).prop('checked', true);
        $("#routine_time").val(getSARoutineData.TimeOfExecution);
        $("#masterinstructions").dxHtmlEditor("instance").option('value', getSARoutineData.Instruction);
        $('#saroutineid').val(getSARoutineData.Id)
        $('#SAAddRoutinemodel .modal-title').html('Edit Routine')

        //make Read-only attribute "False" for "Edit" Mode

        $("#task").attr('readonly', false);
        $("#routine_start_date").prop('disabled', false);
        $("#routine_end_date").prop('disabled', false);

        $(`input[name='freqoption']`).attr('disabled', false);
        $("#routine_time").attr('readonly', false);
        $("#modalFooter").show();

    } else if (mode == 'view') {

        var filterData = JSON.stringify({
            "SARoutineId": SARoutineId
        });
        var getSARoutineById = callgetlist('GetSARoutineById', filterData);
        var getSARoutineData = getSARoutineById[0];
        var editEndDate = (getSARoutineData.EndDate == "1900-01-01T00:00:00" || getSARoutineData.EndDate == null) ? $("#routine_end_date").val('') : $("#routine_end_date").val(moment(getSARoutineData.EndDate).format('MM/DD/YYYY'));
        $("#task").val(getSARoutineData.Task);
        $("#routine_start_date").val(moment(getSARoutineData.StartDate).format('MM/DD/YYYY'));

        $(`input[name='freqoption'][value=${getSARoutineData.Frequency}]`).prop('checked', true);
        $("#routine_time").val(getSARoutineData.TimeOfExecution);
        $("#masterinstructions").dxHtmlEditor("instance").option('value', getSARoutineData.Instruction);
        $('#saroutineid').val(getSARoutineData.Id)
        $('#SAAddRoutinemodel .modal-title').html('View Routine')

        //make Read-only attribute "True" for "View" Mode

        $("#task").attr('readonly', true);
        $("#routine_start_date").prop('disabled', true);
        $("#routine_end_date").prop('disabled', true);

        $(`input[name='freqoption']`).attr('disabled', true);
        $("#routine_time").attr('readonly', true);
        $("#modalFooter").hide();

    }
    else {
        $('#SAAddRoutinemodel .modal-title').html('Add New Routine');
        $("#task").val('');
        $('#saroutineid').val('')
        $("input[name='freqoption']").prop('checked', false);
        $("#routine_time").val('');
        $("#masterinstructions").dxHtmlEditor("instance").option('value', '');
    }
}

// The below function append's the value to the form value while opening a Report Routine modal
function openSAReportRoutineListModels(mode, SARoutineId = null) {

    if (mode == 'report') {

        $("#SAReportRoutinemodel").appendTo("body").modal("show");
        // The below function gets the SARoutineReportList data from "GetSATasksReportByRoutineId" API
        const getSARoutineReportData = () => {
            var filterData = JSON.stringify({
                "SARoutineId": SARoutineId
            });
            var getSARoutineReportList = callgetlist('GetSATasksReportByRoutineId', filterData);
            getSARoutineReportList.map(function (res) {
                return res.Instruction = removeTags(res.Instruction)
            })
            getSARoutineReportList.map(function (res) {
                return res.EndDate = (res.EndDate == "1900-01-01T00:00:00" || res.EndDate == null) ? "No End Date" : res.EndDate
            })
            renderSARoutineReportListGrid(getSARoutineReportList);
        }
        getSARoutineReportData();

    } else if (mode == 'history') {

        // The below function gets the SARoutineHistoryList data from "GetSARoutineHistoryById" API
        const getSARoutineHistoryData = () => {
            var filterData = JSON.stringify({
                "SARoutineId": SARoutineId,
                "IsActive": true
            });
            var getSARoutineHistoryList = callgetlist('GetSARoutineHistoryById', filterData);
            getSARoutineHistoryList.map(function (res) {
                return res.Instruction = removeTags(res.Instruction)
            })
            getSARoutineHistoryList.map(function (res) {
                return res.EndDate = (res.EndDate == "1900-01-01T00:00:00" || res.EndDate == null) ? "No End Date" : res.EndDate
            })
            getSARoutineHistoryList.map(function (res) {
                var strDate = res.TimeOfExecution;
                var arr = strDate.split(':');
                var hour = parseInt(arr[0]);
                var AmOrPm = hour >= 12 ? 'PM' : 'AM';

                hour = (hour % 12) || 12;
                hour = ("0" + hour).slice(-2);

                var min = parseInt(arr[1]);
                min = ("0" + min).slice(-2);
                var finalTime = hour + ":" + min + " " + AmOrPm;

                return res.TimeOfExecution = finalTime;
            })
            renderSARoutineHistoryListGrid(getSARoutineHistoryList);
        }
        getSARoutineHistoryData();

    }

}

// THe below function reset's the datepicker value
function resetroutinedatepicker() {
    $("#routine_start_date").datepicker('setDate', null);
    $("#routine_start_date").datepicker({
        autoclose: true,
    });

    $("#routine_end_date").datepicker('setDate', null);
    $("#routine_end_date").datepicker({
        autoclose: true,
    });
}

// The below function create a table view and list the "GetSARoutines" API data into table
function renderSARoutineListGrid(data) {
    var SARoutineDataGrid = $("#sddgd-saroutinelist")
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
            onToolbarPreparing: function (e) {
                var dataGrid = e.component;
                e.toolbarOptions.items.unshift({
                    location: "after",
                    widget: "dxButton",
                    options: {
                        icon: "refresh",
                        onClick: function () {
                            getSARoutineData();
                            dataGrid.refresh();
                        }
                    }
                });
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
                            SARoutineDataGrid.pageIndex() * SARoutineDataGrid.pageSize() + options.rowIndex + 1
                        );
                    },
                },
                {
                    caption: "Due Date Time",
                    dataType: "datetime",
                    format: 'dd-MMM-yyyy HH:mm',
                    dataField: "EndDate",
                },
                {
                    caption: "Task",
                    dataField: "Task",
                },
                {
                    caption: "Instruction",
                    dataField: "Instruction",
                },
                {
                    dataField: "",
                    caption: "Action",
                    width: 130,
                    allowFiltering: false,
                    allowGrouping: false,
                    allowReordering: false,
                    allowSorting: false,
                    allowCollapsing: false,
                    allowExporting: false,
                    cellTemplate: function (container, options) {
                        var domActions = "";
                        var getCurrentUserId = localStorage.getItem("EmployeeID");
                        var getTaskCreatedUserId = options.data.CreatedById;
                        domActions +=
                            `<button class='btn btn-xs btn-primary edit-btn sa-edit' onclick=openManageSARoutineListModels('view','${options.data.Id}')><i class='fas fa-eye'></i></button>`;
                        domActions +=
                            `<button class='btn btn-xs btn-primary edit-btn sa-edit' style="display:block; margin-left:5px;" onclick=openSAReportRoutineListModels('report','${options.data.Id}')><i class="fas fa-flag"></i></button>`;
                        domActions +=
                            `<button class='btn btn-xs btn-primary edit-btn sa-edit' style="display:block; margin-left:5px;" onclick=openSAReportRoutineListModels('history','${options.data.Id}')><i class="fas fa-history"></i></button>`;

                        if (getCurrentUserId == getTaskCreatedUserId) {
                            domActions +=
                                `<button class='btn btn-xs btn-primary edit-btn sa-edit' style="display:block; margin-left:5px;" onclick=openManageSARoutineListModels('edit','${options.data.Id}')><i class='fas fa-pencil-alt'></i></button>`;
                            $("<div class='text-center' style='display:flex;'>")
                                .append($(domActions))
                                .appendTo(container);
                        } else {
                            domActions +=
                                `<button class='btn btn-xs btn-primary edit-btn sa-edit' style="display:none;" onclick=openManageSARoutineListModels('edit','${options.data.Id}')><i class='fas fa-pencil-alt'></i></button>`;
                            $("<div class='text-center' style='display:flex;'>")
                                .append($(domActions))
                                .appendTo(container);
                        }
                    },
                },
            ],
        })
        .dxDataGrid("instance");
}

// The below function create a model view and list the "GetSATasksReportByRoutineId" API data
function renderSARoutineReportListGrid(data) {
    var SARoutineDataGrid = $("#sddgd-saroutine-report")
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
                            SARoutineDataGrid.pageIndex() * SARoutineDataGrid.pageSize() + options.rowIndex + 1
                        );
                    },
                },
                {
                    caption: "Date Time",
                    dataField: "DateTime",
                },
                {
                    caption: "End Date",
                    dataField: "EndDate",
                },
                {
                    caption: "Task",
                    dataField: "Task",
                },
                {
                    caption: "Instruction",
                    dataField: "Instruction",
                },
                {
                    caption: "Executed By",
                    dataField: "ExecutedBy",
                },
                {
                    caption: "Executed DateTime",
                    dataField: "ExecutedDateTime",
                },
                {
                    caption: "Remarks",
                    dataField: "Remarks",
                },
                {
                    caption: "StatusDateTime",
                    dataField: "StatusDateTime",
                },
                {
                    caption: "Status",
                    dataField: "Status",
                },
            ],
        })
        .dxDataGrid("instance");
}

// Open  History Modal Popup
function renderSAHistoryPopup() {
    var popup = null;
    var popupOptions = {
        width: "85%",
        height: "65%",
        contentTemplate: 'saHistoryModelContent',
        showTitle: true,
        title: "History"
    };
    popup = $("#saHistoryModel").dxPopup(popupOptions).dxPopup("instance");
    popup.show();
}

// The below function list the "GetSARoutineHistoryById" API data
function renderSARoutineHistoryListGrid(data) {
    renderSAHistoryPopup();
    var historyData = data;
    var SARoutineDataGrid = $("#saHistoryGrid")
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
            rowAlternationEnabled: true,
            filterPanel: { visible: true },
            allowColumnReordering: true,
            allowColumnResizing: true,
            showBorders: true,
            onCellPrepared: function (e) {
                if (e.rowType === 'header' || e.rowType === "filter")
                    return;
                if (e.column.dataField === 'ModifiedByName' || e.column.dataField === 'ModifiedDate' || e.column.dataField === 'Status' || e.column.dataField == undefined) {
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
                            SARoutineDataGrid.pageIndex() * SARoutineDataGrid.pageSize() + options.rowIndex + 1
                        );
                    },
                },
                {
                    caption: "Created By",
                    dataField: "CreatedByName",
                },
                {
                    caption: "Created Date",
                    dataField: "CreatedDate",
                },
                {
                    caption: "Start Date",
                    dataField: "StartDate",
                },
                {
                    caption: "Due Date Time",
                    dataField: "EndDate",
                },
                {
                    caption: "Time Of Execution",
                    dataField: "TimeOfExecution",
                },
                {
                    caption: "Task",
                    dataField: "Task",
                },
                {
                    caption: "Instruction",
                    dataField: "Instruction",
                },
                {
                    caption: "Modified By",
                    dataField: "ModifiedByName",
                },
                {
                    caption: "Modified Date",
                    dataField: "ModifiedDate",
                },
                {
                    caption: "Status",
                    dataField: "Status",
                },
            ],
        })
        .dxDataGrid("instance");
}

// The below function returns the number of days count between the given two dates
function noofdayscount(start, end) {
    var startdate = new Date(start);
    var enddate = new Date(end);
    // end - start returns difference in milliseconds 
    var diff = new Date(enddate - startdate);

    // get days
    var days = diff / 1000 / 60 / 60 / 24;
    return days;
}


// The below function validates the Startdate
$('#routine_start_date').on('changeDate', () => {

    var routineEndDate = $("#routine_end_date").val();

    if (routineEndDate != '') {
        var routineStartDate = $("#routine_start_date").val();

        if (routineStartDate > moment(new Date()).add(1, 'day').format('MM/DD/YYYY')) {
            days = noofdayscount(routineStartDate, routineEndDate) + 1;
            if (days < 0 || days == 0) {
                // resetroutinedatepicker();
                $("#routine_start_date").val('')
                $('.routinestart_error_message').text('Start Date cannot be grater than End date')
            } else {
                $('.routinestart_error_message').text('')
            }
            // $('.routinestart_error_message').text('')
        } else {
            $("#routine_start_date").val('')
            $('.routinestart_error_message').text('Start Date cannot be less than Current date/ Next Date')
        }
    } else {
        var routineStartDate = $("#routine_start_date").val();
        if (routineStartDate > moment(new Date()).add(1, 'day').format('MM/DD/YYYY')) {
            $('.routinestart_error_message').text('')
        } else {
            $("#routine_start_date").val('')
            $('.routinestart_error_message').text('Start Date cannot be less than or equal to Current date/ Next date')
        }
    }
})

// The below function validates the Enddate
$('#routine_end_date').on('changeDate', () => {
    var routineStartDate = $("#routine_start_date").val();
    if (routineStartDate != '') {
        var routineEndDate = $("#routine_end_date").val();
        if (routineEndDate > moment(new Date()).format('MM/DD/YYYY')) {
            days = noofdayscount(routineStartDate, routineEndDate) + 1;
            if (days < 0 || days == 0) {
                // resetroutinedatepicker();
                $("#routine_end_date").val('')
                $('.routineend_error_message').text('End Date cannot be less than Start Date')
            } else {
                $('.routineend_error_message').text('')
            }
            // $('.routineend_error_message').text('')
        } else {
            $("#routine_end_date").val('')
            $('.routineend_error_message').text('End Date cannot be less than or equal to Current date')
        }
    } else {
        // $("#routine_end_date").val('')
        $('.routinestart_error_message').text('Start Date cannot be empty')
    }
})




// The below function validate's the input fields and (Insert (or) Update) the SARoutine Data using ("PostSARoutine" (or) "UpdateSARoutine") API 
$('#RoutinesaveBtn').unbind().click(function () {
    var task = $("#task").val();
    var routine_start_date = $("#routine_start_date").val();
    var routine_end_date = $("#routine_end_date").val();
    var freq = $("input[name='freqoption']:checked").val();
    var routine_time = $("#routine_time").val();
    var instruction = $("#masterinstructions").dxHtmlEditor("instance").option('value');
    var data = [];
    var SARoutineId = $('#saroutineid').val();
    var rEndDate = (moment(routine_end_date).format("YYYY-MM-DD") == "Invalid date") ? null : moment(routine_end_date).format("YYYY-MM-DD");
    if (task != '' && routine_start_date != '' && freq != '' && freq != undefined && routine_time != '' && instruction != '') {
        if (SARoutineId != '') {
            data = {
                "Method": "UpdateSARoutine",
                "Data": {
                    "SARoutineId": SARoutineId,
                    "Task": task,
                    "Instruction": instruction,
                    "Frequency": freq,
                    "StartDate": moment(routine_start_date).format("YYYY-MM-DD"),
                    "EndDate": rEndDate,
                    "TimeofExecution": routine_time
                }
            }
        } else {
            data = {
                "Method": "PostSARoutine",
                "Data": {
                    "Task": task,
                    "Instruction": instruction,
                    "Frequency": freq,
                    "StartDate": moment(routine_start_date).format("YYYY-MM-DD"),
                    "EndDate": rEndDate,
                    "TimeofExecution": routine_time
                }
            }
        }
        var result = PostDataCall(data);
        if (result['IsSuccess'] == true) {
            $("#SAAddRoutinemodel").modal("hide");
            swal({
                title: "Success!",
                text: result['Message'],
                icon: "success",
                button: "ok!",
            })
            $('#saroutineid').val('')
            getSARoutineData();
        }
        else {
            swal({
                title: "Sorry!",
                text: result['Message'],
                icon: "error",
            });

        }
        $('.task_error_message').text('')
        $('.routinestart_error_message').text('')
        $('.freqoption_error_message').text('')
        $('.routine_time_error_message').text('')
        $('.masterinstructions_error_message').text('')
    } else {
        if (task != '') {
            $('.task_error_message').text('')
        } else {
            $('.task_error_message').text('Task cannot be empty')
        }
        if (routine_start_date != '') {
            $('.routinestart_error_message').text('')
        } else {
            $('.routinestart_error_message').text('Start Date cannot be empty')
        }
        if (freq != '' && freq != undefined) {
            $('.freqoption_error_message').text('')
        } else {
            $('.freqoption_error_message').text('Freqoption cannot be empty')
        }
        if (routine_time != '') {
            $('.routine_time_error_message').text('')
        } else {
            $('.routine_time_error_message').text('Routine Time cannot be empty')
        }
        if (instruction != '') {
            $('.masterinstructions_error_message').text('')
        } else {
            $('.masterinstructions_error_message').text('Instruction cannot be empty')
        }
    }
})