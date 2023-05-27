function include(filename, onload) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';
    head.appendChild(script);
}
include('components/defaultersentry/defaultersEntry-projects/js/project.js');
include('components/defaultersentry/js/defaultersEntry/rfphandling.js');
include('components/defaultersentry/js/defaultersEntry/meeting.js');
include('components/defaultersentry/js/defaultersEntry/interviews.js');
include('components/defaultersentry/js/defaultersEntry/resourcesmgmt.js');
include('components/defaultersentry/js/defaultersEntry/supporttomkt.js');
include('components/defaultersentry/js/defaultersEntry/supporttohr.js');

//===================== action on change ===================/
var projectsTaskEntriesId;
function edit_DefaultersEntry_OnChange(e) {
    
    $("#div-DefaultersEntry-Edit-Modal .modal-body").css({ "height": "auto" });
    var selectedValue = $(e).val();
   
    var filter_val = JSON.stringify({});
    var result = callgetlist("GetSubActivities", filter_val);

    var action = $("#defaultersEntryAction option:selected").text();
    
    var resultSubActions = [];
    $("#defaulters-text-area-action").val("");
    $("#defaulters-worked-hours-counter").val('0');
    $("#defaulters-worked-mins-counter").val('0');

    if (action == 'Select an activity') {
        //   $("#activityDiv").hide();
        //   $("#table_main").hide();
        $("#defaulters-presales_task").hide();
        $("#sddgd-defaulters-actionitems").hide();
        return;
    } else if (action == 'PreSales') {
        // $("#activityDiv").hide();
        // $("#table_main").hide();
        $("#defaulters-presales_task").show();
        $("#sddgd-defaulters-actionitems").hide();
        $("#div-DefaultersEntry-Edit-Modal .modal-body").css({ "max-height": "80vh" });

        for (let i = 0; i < 4; i++) {
            resultSubActions.push(
                { Id: i + 1, Name: action + ' ' + (i + 1) }
            );
        }

    } else if (action == 'KT') {
        $("#defaulters-presales_task").show();
        $("#sddgd-defaulters-actionitems").hide();
        $("#div-DefaultersEntry-Edit-Modal .modal-body").css({ "max-height": "80vh" });
        // setTimeout(()=>{
        //    }, 1000);
    }
    else {
        // $("#activityDiv").show();
        // $("#table_main").show();
        $("#defaulters-presales_task").hide();
        $("#sddgd-defaulters-actionitems").show();

        var filter_val = JSON.stringify({});
        var endPointName = 'GetTaskEntryRFP';
        if (action == 'RFP') {
            endPointName = 'GetTaskEntryRFP';
        } else if (action == 'RRM') {
            endPointName = 'GetTaskEntryRRM';
        } else if (action == 'KT') {
            endPointName = 'GetTaskEntryKT';
        } else if (action == 'Meetings') {
            endPointName = 'GetTaskEntryMeetings';
        } else if (action == 'Projects') {
            endPointName = 'GetTaskEntryProjects';
        }
        var resultSubActions = callgetlist(endPointName, filter_val);

        var actionId = $('#defaultersEntryAction').val();
       
        let keys = null;
        if (resultSubActions.length) {
            keys = Object.keys(resultSubActions[0]);
        }
        columnsFromApi = [];
        if (keys) {
            for (var i = 0; i < keys.length; i++) {
                columnsFromApi.push({ dataField: keys[i], caption: keys[i] });
            }

            var skillFamilyDataGrid = $("#sddgd-defaulters-actionitems")
                .dxDataGrid({
                    filterRow: {
                        visible: true,
                        applyFilter: "auto",
                    },
                    dataSource: resultSubActions,
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
                    pager: {
                        showPageSizeSelector: true,
                        allowedPageSizes: [5, 10, 20],
                        showInfo: true,
                    },
                    paging: {
                        pageSize: 5,
                    },
                    groupPanel: {
                        visible: true,
                        emptyPanelText: "Drag a column"
                    },
                    sorting: {
                        mode: "multiple",
                    },
                    // selection: {
                    //   mode: "multiple",
                    // },
                    columnChooser: {
                        enabled: true,
                    },
                    rowAlternationEnabled: true,
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
                                    // getSkillFamilies();
                                },
                            },
                        });
                    },
                    columns: [
                        //   {
                        //     dataField: 'Id',
                        //     caption:'Id'
                        //   },
                        ...columnsFromApi,
                        {
                            dataField: "",
                            caption: "Action",
                            width: 50,
                            allowFiltering: false,
                            allowGrouping: false,
                            allowReordering: false,
                            allowSorting: false,
                            allowCollapsing: false,
                            allowExporting: false,
                            cellTemplate: function (container, options) {

                                var action = $("#defaultersEntryAction option:selected").text();
                                var subActionId = 'A0-1B-C2';
                                if (action == 'Projects') {
                                    subActionId = options.data["ProjectId"];
                                } else if (action == 'RFP') {
                                    subActionId = options.data["Id"];
                                } else if (action == 'Meetings') {
                                    subActionId = options.data["MeetingId"];
                                } else if (action == 'RRM') {
                                    subActionId = options.data["RRMId"];
                                }
                                //   var familyName = options.data["Name"];
                                var domActions = "";
                                domActions +=
                                    `<button class='btn btn-xs btn-primary edit-btn' onclick='fncDefaultersEntryActivity("${actionId}", "${subActionId}")'><i class='fas fa-pencil-alt'></i></button>`
                                //     domActions += `<button class='btn btn-xs btn-primary delete-btn' onclick='deleteSkillFamily("${familyId}")'><i class='fas fa-trash'></i></button>`
                                $("<div class='text-center'>")
                                    .append($(domActions))
                                    .appendTo(container);
                            }
                        }
                    ],
                });
        }
    }

    $('#error-response').html("");

    $("#defaulters-projects-edit").addClass("hidden");
    $("#defaulters-rfp-edit").addClass("hidden");
    $("#defaulters-meeting-edit").addClass("hidden");
    $("#defaulters-interview-edit").addClass("hidden");
    $("#defaulters-resourceManagement-edit").addClass("hidden");
    $("#defaulters-supportToMarketing-edit").addClass("hidden");
    $("#defaulters-supportToHR-edit").addClass("hidden");

    if (selectedValue != 'projects') {
        // 1-> Projects
        projectHideShowFields();
    }
    if (selectedValue != 'rfp_handling') {
        // 2-> RFP
        rfpHideShowFieldsDefaulters();
    }
    if (selectedValue != 'meeting') {
        // 3-> Meeting
        meetingHideShowFieldsDefaulters();
    }
    // Interview sidebar hide/show
    validation_defaulters_interview_hide_show(selectedValue);

    // Project hours hide/show
    validation_defaulters_project_hide_show(selectedValue);

    // ========================== Select Action List Start ============================ /

    if (selectedValue == 'projects') {
        // 1-> Projects
        $("#defaultersEntryDetails").load("./components/defaultersentry/defaultersEntry-projects/index.html", function () {
            defaulters_select_projects();
        });
    } else if (selectedValue == 'rfp_handling') {
        // 2-> RFP
        $("#defaultersEntryDetails").load("./components/defaultersentry/defaultersEntry-rfp_handling/index.html", function () {
            select_rfphandling_defaulters();
        });

    } else if (selectedValue == 'meeting') {
        // 3-> Meeting
        $("#defaultersEntryDetails").load("./components/defaultersentry/defaultersEntry-meeting/index.html", function () {
            select_meeting_defaulters();
        });

    } else if (selectedValue == 'interviews') {
        // 4-> Interviews
        $("#defaultersEntryDetails").load("./components/defaultersentry/defaultersEntry-interview/index.html", function () {
            select_interviewDefaulters();
        });

    } else if (selectedValue == "resource_management") {
        // 5-> ResourcManagement
        $("#defaultersEntryDetails").load("./components/defaultersentry/defaultersEntry-resource/index.html", function () {
            select_resourcemag_defaulters();
        });

    } else if (selectedValue == "support_to_marketing_team") {
        // 6-> SupportToMarketingTeam
        $("#defaultersEntryDetails").load("./components/defaultersentry/defaultersEntry-support_to_marketing/index.html", function () {
            select_supportmkt_defaulters();
        });

    } else if (selectedValue == "support_to_hr_team") {
        // 7-> SupportToHRTeam
        $("#defaultersEntryDetails").load("./components/defaultersentry/defaultersEntry-support_to_hr/index.html", function () {
            select_supporthr_defaulters();
        });

    }
    // ========================== Select Action List End ============================ /
}

//===================== action on edit click of action modal dialog ===================/
function fncDefaultersEntryActivity(ActionId, TaskId) {
   
    $('#save_DefaultersActivity').data('ActionId', ActionId);
    $('#save_DefaultersActivity').data('TaskId', TaskId);
    var action = $("#defaultersEntryAction option:selected").text();
    var actionValue = $("#defaultersEntryAction").val();
    $("#defaulters-text-area-action").val("");
    $("#defaulters-worked-hours-counter").val('0');
    $("#defaulters-worked-mins-counter").val('0');
    $('#defaulters-phaseDiv').hide();
    //
    $("#defaulters-text-area-action-2").val('');
    $("#defaulters-worked-hours-counter-2").val('0');
    $("#defaulters-worked-mins-counter-2").val('0');
    $("#defaulters-completion-percentage").val('0');
    //
    $('.error_message').html("");

    var resultTasks = [];
    //
    $('#defaulters-add-task-button').hide();
    $("#update_DefaultersActivity").hide();
    $("#save_DefaultersActivity").show();

    if (!actionValue) {
        alert('Please select an activity first.');
        return;
    } else if (action == 'PreSales') {
        $("#defaulters-taskDiv").hide();
        $("#defaulters-subTaskDiv").hide();
    } else if (action == 'Projects') {
        $('#defaulters-add-task-button').show();
        $("#defaulters-taskSelectDiv").css("display", "table");

        var filter_val = JSON.stringify({
            "ProjectId": TaskId
        });

        var result = callgetlist("GetProjectPhasesbyProjectId", filter_val);

        var options = `<option value=''>Select a Phase</option>`;
        for (var i = 0; i < result.length; i++) {
            options +=
                "<option value='" + result[i].Id + "'>" + result[i].Phases + "</option>";
        }

        $("#defaulters-selectPhase").html(options);
        //
        $('#defaulters-phaseDiv').show();
        $("#defaulters-taskDiv").show();
        $("#defaulters-subTaskDiv").show();

        var options3 = `<option value=''>Select a Sub-task</option>`;

        $("#defaulters-selectSubTask").html(options3);
        //
        $('#defaulters-estimatedHoursDiv').show();
        $('#defaulters-availableHoursDiv').show();
    } else {
       
        $('#defaulters-add-task-button').hide();
        $("#defaulters-taskSelectDiv").css("display", "block");

        var filter_val = JSON.stringify({
            ActionId: ActionId,
            TaskId: TaskId
        });

        $("#defaulters-taskDiv").show();
        $("#defaulters-subTaskDiv").hide();
        $('#defaulters-estimatedHoursDiv').hide();
        $('#defaulters-availableHoursDiv').hide();
        if (action == 'RFP') {
            var resultTasks = callgetlist("GetTaskEntryRFPActivities", filter_val);

        } else if (action == 'RRM') {
            var resultTasks = callgetlist("GetTaskEntryRRMActivities", filter_val);

        } else if (action == 'KT') {
            var resultTasks = callgetlist("GetTaskEntryKTActivities", filter_val);

        } else if (action == 'Meetings') {
            var resultTasks = callgetlist("GetTaskEntryMeetingActivities", filter_val);

        }
    }

    var options2 = `<option value=''>Select a Task</option>`;
    for (var i = 0; i < resultTasks.length; i++) {
        options2 +=
            "<option value='" + resultTasks[i].Id + "'>" + resultTasks[i].ActionItem + "</option>";
    }
    $("#defaulters-selectTask").html(options2);

    $("#div-DefaultersEntryActivity-Edit-Modal").appendTo('body').modal("show");
}

function select_defaulters_task_OnChange() {

    var TaskId = $("#defaulters-selectTask").val();
    
    var filter_val = JSON.stringify({
        ProjectTaskId: TaskId,
        // ActivityId: ActivityId
    });
    var resultSubTasks = callgetlist("GetSubTasksbyTaskId", filter_val);

    var options3 = `<option value=''>Select a Sub-task</option>`;
    for (var i = 0; i < resultSubTasks.length; i++) {
        options3 +=
            "<option value='" + resultSubTasks[i].Id + "'>" + resultSubTasks[i].SubTask + "</option>";
    }

    $("#defaulters-selectSubTask").html(options3);
}

//===================== submit quick actions entry - edit activity dialog box ===================/
function saveDefaultersEntry(val = null) {
   
    // $('#selectActivityError').html("some err msg");
    var action = $("#defaultersEntryAction option:selected").text();
    var selectedDate = $("#defaulters_entry_reports_Date").dxDateBox("instance").option("value");
    //
    if (action == 'KT') {
        var Description = $("#defaulters-text-area-action").val();
        var hh = $("#defaulters-worked-hours-counter").val();
        var mm = $("#defaulters-worked-mins-counter").val();
        //
        $('.error_message').html("");
        if (!Description) {
            $('#defaulters-descriptionError').html("Please enter valid description.");
            return;
        }
        if (hh === '' || hh < 0 || hh > 23) {
            $('#defaulters-workingHrsError').html("Please enter valid hours.");
            return;
        }
        if (mm === '' || mm < 0 || mm > 59) {
            $('#defaulters-workingHrsError').html("Please enter valid minutes.");
            return;
        }
        //
        hh = Number(hh);
        mm = Number(mm);
        if (hh < 10) hh = '0' + hh;
        if (mm < 10) mm = '0' + mm;
        var HoursSpent = hh + ':' + mm;

        var Data = {
            "TaskNatureId": $('#defaultersEntryAction').val(),
            "Description": Description,
            "HoursSpent": HoursSpent,
            "FilterDate": selectedDate,
            "Message": "",
            "Status": ""
        };
        var data = {
            "Method": "PostKTTaskEntriesByDate",
            "Data": Data
        }
        var postCall = PostDataCall(data);

        if (postCall['IsSuccess']) {
            swal({
                title: "Success!",
                text: postCall['Message'],
                icon: "success",
                button: "ok!",
            });
            $("#div-DefaultersEntry-Edit-Modal").modal("hide");
            getDefaultersReportsBasedOnSelectedDate();
        } else {
            swal({
                title: "Sorry!",
                text: postCall['Message'],
                icon: "error",
            });
        }

    } else if (action == 'PreSales') {
        var Description = $("#defaulters-text-area-action").val();
        var hh = $("#defaulters-worked-hours-counter").val();
        var mm = $("#defaulters-worked-mins-counter").val();
        //
        $('.error_message').html("");
        if (!Description) {
            $('#defaulters-descriptionError').html("Please enter valid description.");
            return;
        }
        if (hh === '' || hh < 0 || hh > 23) {
            $('#defaulters-workingHrsError').html("Please enter valid hours.");
            return;
        }
        if (mm === '' || mm < 0 || mm > 59) {
            $('#defaulters-workingHrsError').html("Please enter valid minutes.");
            return;
        }
        //
        hh = Number(hh);
        mm = Number(mm);
        if (hh < 10) hh = '0' + hh;
        if (mm < 10) mm = '0' + mm;
        var HoursSpent = hh + ':' + mm;

        var Data = {
            "TaskNatureId": $('#defaultersEntryAction').val(),
            "Description": Description,
            "HoursSpent": HoursSpent,
            "FilterDate": selectedDate,
            "Message": "",
            "Status": ""
        };
        var data = {
            "Method": "PostPreSalesTaskEntriesByDate",
            "Data": Data
        }
        var postCall = PostDataCall(data);

        if (postCall['IsSuccess']) {
            swal({
                title: "Success!",
                text: postCall['Message'],
                icon: "success",
                button: "ok!",
            });
            $("#div-DefaultersEntry-Edit-Modal").modal("hide");
            getDefaultersReportsBasedOnSelectedDate();
        } else {
            swal({
                title: "Sorry!",
                text: postCall['Message'],
                icon: "error",
            });
        }

    } else if (action == 'Projects') {
        var taskVal = $('#defaulters-selectTask').val();
        var Description = $("#defaulters-text-area-action-2").val();
        var hh = $("#defaulters-worked-hours-counter-2").val();
        var mm = $("#defaulters-worked-mins-counter-2").val();
        var completionOfPercentage = Number($("#defaulters-completion-percentage").val());
        //
        $('.error_message').html("");
        if (!taskVal) {
            $('#defaulters-taskError-modal').html("Please select a task.");
            return;
        }
        if (!Description) {
            $('#defaulters-descriptionError-modal').html("Please enter valid description.");
            return;
        }
        if (hh === '' || hh < 0 || hh > 23) {
            $('#defaulters-workingHrsError-modal').html("Please enter valid hours.");
            return;
        }
        if (mm === '' || mm < 0 || mm > 59) {
            $('#defaulters-workingHrsError-modal').html("Please enter valid minutes.");
            return;
        }
        if (!completionOfPercentage) {
            $('#defaulters-completionError-modal').html("Please enter completion percentage.");
            return;
        }
        //
        hh = Number(hh);
        mm = Number(mm);
        if (hh < 10) hh = '0' + hh;
        if (mm < 10) mm = '0' + mm;
        var HoursSpent = hh + ':' + mm;

        var Data = {
            "ProjectTaskId": taskVal,
            "ProjectSubTaskId": $('#defaulters-selectSubTask').val(),
            "Description": Description,
            "HoursSpent": HoursSpent,
            "PercentageofCompletion": completionOfPercentage,
            "FilterDate": selectedDate,
            "Message": "",
            "Status": ""
        };
        var data = {
            "Method": "PostProjectTaskEntriesByDate",
            "Data": Data
        }
        var postCall = PostDataCall(data);

        if (postCall['IsSuccess']) {
            swal({
                title: "Success!",
                text: postCall['Message'],
                icon: "success",
                button: "ok!",
            });
            $("#div-DefaultersEntryActivity-Edit-Modal").modal("hide");
            getDefaultersReportsBasedOnSelectedDate();
        } else {
            swal({
                title: "Sorry!",
                text: postCall['Message'],
                icon: "error",
            });
        }

    } else if (action == 'RFP') {
        var taskVal = $('#defaulters-selectTask').val();
        var Description = $("#defaulters-text-area-action-2").val();
        var hh = $("#defaulters-worked-hours-counter-2").val();
        var mm = $("#defaulters-worked-mins-counter-2").val();
        //
        $('.error_message').html("");
        if (!taskVal) {
            $('#defaulters-taskError-modal').html("Please select a task.");
            return;
        }
        if (!Description) {
            $('#defaulters-descriptionError-modal').html("Please enter valid description.");
            return;
        }
        if (hh === '' || hh < 0 || hh > 23) {
            $('#defaulters-workingHrsError-modal').html("Please enter valid hours.");
            return;
        }
        if (mm === '' || mm < 0 || mm > 59) {
            $('#defaulters-workingHrsError-modal').html("Please enter valid minutes.");
            return;
        }
        //
        hh = Number(hh);
        mm = Number(mm);
        if (hh < 10) hh = '0' + hh;
        if (mm < 10) mm = '0' + mm;
        var HoursSpent = hh + ':' + mm;

        var Data = {
            "RequestForProposalId": $('#save_DefaultersActivity').data('TaskId'),
            "TaskNatureId": $('#defaultersEntryAction').val(),
            "Description": Description,
            "HoursSpent": HoursSpent,
            "FilterDate": selectedDate,
            "Message": "",
            "Status": ""
        };
        var data = {
            "Method": "PostRFPTaskEntriesByDate",
            "Data": Data
        }
        var postCall = PostDataCall(data);

        if (postCall['IsSuccess']) {
            swal({
                title: "Success!",
                text: postCall['Message'],
                icon: "success",
                button: "ok!",
            });
            $("#div-DefaultersEntryActivity-Edit-Modal").modal("hide");
            getDefaultersReportsBasedOnSelectedDate();
        } else {
            swal({
                title: "Sorry!",
                text: postCall['Message'],
                icon: "error",
            });
        }

    } else if (action == 'Meetings') {
        var taskVal = $('#defaulters-selectTask').val();
        var Description = $("#defaulters-text-area-action-2").val();
        var hh = $("#defaulters-worked-hours-counter-2").val();
        var mm = $("#defaulters-worked-mins-counter-2").val();
        //
        $('.error_message').html("");
        if (!taskVal) {
            $('#defaulters-taskError-modal').html("Please select a task.");
            return;
        }
        if (!Description) {
            $('#defaulters-descriptionError-modal').html("Please enter valid description.");
            return;
        }
        if (hh === '' || hh < 0 || hh > 23) {
            $('#defaulters-workingHrsError-modal').html("Please enter valid hours.");
            return;
        }
        if (mm === '' || mm < 0 || mm > 59) {
            $('#defaulters-workingHrsError-modal').html("Please enter valid minutes.");
            return;
        }
        //
        hh = Number(hh);
        mm = Number(mm);
        if (hh < 10) hh = '0' + hh;
        if (mm < 10) mm = '0' + mm;
        var HoursSpent = hh + ':' + mm;

        var Data = {
            "MeetingsId": $('#save_DefaultersActivity').data('TaskId'),
            "TaskNatureId": $('#defaultersEntryAction').val(),
            "Description": Description,
            "HoursSpent": HoursSpent,
            "FilterDate": selectedDate,
            "Message": "",
            "Status": ""
        };
        var data = {
            "Method": "PostMeetingsTaskEntriesByDate",
            "Data": Data
        }
        var postCall = PostDataCall(data);

        if (postCall['IsSuccess']) {
            swal({
                title: "Success!",
                text: postCall['Message'],
                icon: "success",
                button: "ok!",
            });
            $("#div-DefaultersEntryActivity-Edit-Modal").modal("hide");
            getDefaultersReportsBasedOnSelectedDate();
        } else {
            swal({
                title: "Sorry!",
                text: postCall['Message'],
                icon: "error",
            });
        }

    } else if (action == 'RRM') {
        var taskVal = $('#defaulters-selectTask').val();
        var Description = $("#defaulters-text-area-action-2").val();
        var hh = $("#defaulters-worked-hours-counter-2").val();
        var mm = $("#defaulters-worked-mins-counter-2").val();
        //
        $('.error_message').html("");
        if (!taskVal) {
            $('#defaulters-taskError-modal').html("Please select a task.");
            return;
        }
        if (!Description) {
            $('#defaulters-descriptionError-modal').html("Please enter valid description.");
            return;
        }
        if (hh === '' || hh < 0 || hh > 23) {
            $('#defaulters-workingHrsError-modal').html("Please enter valid hours.");
            return;
        }
        if (mm === '' || mm < 0 || mm > 59) {
            $('#defaulters-workingHrsError-modal').html("Please enter valid minutes.");
            return;
        }
        //
        hh = Number(hh);
        mm = Number(mm);
        if (hh < 10) hh = '0' + hh;
        if (mm < 10) mm = '0' + mm;
        var HoursSpent = hh + ':' + mm;

        var Data = {
            "ResourceRequirementId": $('#save_DefaultersActivity').data('TaskId'),
            "TaskNatureId": $('#defaultersEntryAction').val(),
            "Description": Description,
            "HoursSpent": HoursSpent,
            "FilterDate": selectedDate,
            "Message": "",
            "Status": ""
        };
        var data = {
            "Method": "PostRRMTaskEntriesByDate",
            "Data": Data
        }
        var postCall = PostDataCall(data);

        if (postCall['IsSuccess']) {
            swal({
                title: "Success!",
                text: postCall['Message'],
                icon: "success",
                button: "ok!",
            });
            $("#div-DefaultersEntryActivity-Edit-Modal").modal("hide");
            getDefaultersReportsBasedOnSelectedDate();
        } else {
            swal({
                title: "Sorry!",
                text: postCall['Message'],
                icon: "error",
            });
        }

    }

}

// ========================== Clear form values Start ============================ /
$(".btn-danger, button.close").click(function () {
    $(this).closest('form').
        find("input[type=text], input[type=date], input[type=time], input[type=number], textarea").val("");
    $("#defaulters-interviewrrmdes, #defaulters-interviewrrmDetails, .defaulters-rfp_description").html('')
    $(".flie_dwn").addClass("hidden");
    $("#defaulters-commentsDiv").addClass("hidden");
    $("#form-btn").addClass("hidden");
});

$("#defaultersEntryAction").change(function () {
    var selectedDate = $("#defaulters_entry_reports_Date").dxDateBox("instance").option("text");
    $("#defaultersSelectedDatePopup").html(selectedDate);
    if ($(this).val() == '') {
        $(this).closest('form').
            find("input[type=text], input[type=date], input[type=time], input[type=number], textarea").val("");
        $("#defaultersEntryAction").val("");
        $("#defaulters-interviewrrmdes, #defaulters-interviewrrmDetails, .defaulters-rfp_description").html('')
        edit_DefaultersEntry_OnChange();
        $(".flie_dwn").addClass("hidden");
        $("#defaulters-commentsDiv").addClass("hidden");
        $("#form-btn").addClass("hidden");
    } else {
        $("#defaulters-commentsDiv").removeClass("hidden");
        $("#form-btn").removeClass("hidden");
    }
});

// ========================== Clear form values End ============================ /

// ========================== Date Field ============================ /
var d = new Date();
var day = ("0" + d.getDate()).slice(-2);
var month = ("0" + (d.getMonth() + 1)).slice(-2);
var today = d.getFullYear() + "-" + (month) + "-" + (day);
// ========================== Date ============================ /

// ========================== Submit post call 445 ============================ /

function AddPostDataDefaulters() {
    var counter = 0;

    var d = new Date(),
        h = d.getHours(),
        m = d.getMinutes(),
        s = d.getSeconds(),
        myday = d.getDate(),
        mymonth = d.getMonth() + 1,
        myyear = d.getFullYear();

    var day = ("0" + myday).slice(-2);
    var month = ("0" + (mymonth)).slice(-2);
    //var today = d.getFullYear()+"-"+(month)+"-"+(day);
    var today = (day) + "-" + (month) + "-" + d.getFullYear() + " " + h + ":" + m + ":" + s;
    $('#error-response').html("");
    var Action = $('#defaultersEntryAction').val();

    // ========================== Submit post Data ============================ /

    if (Action == 'projects') {
        // 1-> Projects
        AddPostDataProjectsDefaulters();
    } else if (Action == 'rfp_handling') {
        // 2-> RFP
        AddPostDataRfpHandlingDefaulters();
    } else if (Action == 'meeting') {
        // 3-> Meeting
        AddPostDataMeetingDefaulters();
    } else if (Action == 'interviews') {
        // 4-> Interviews
        AddPostDataInterviewDefaulters();
    } else if (Action == 'resource_management') {
        // 5-> ResourceManagement
        AddPostDataResourceMagDefaulters();
    } else if (Action == "support_to_marketing_team") {
        // 6-> SupportToMarketingTeam
        AddPostDataSupportMktDefaulters();
    } else if (Action == 'support_to_hr_team') {
        // 7-> SupportToHRTeam
        AddPostDataSupportHrDefaulters();
    }
}

// ========================== Submit post Data ============================ //

//========================== Action Modal button click function 445 ============================ //
$('.close').click(function () {
    $(".defaulters-actionChartSidebar").addClass("hidden");
    $('#sucess-response').html('');
    //$("#sddgd-defaulters-actionitems").hide();
});
//========================== Action Modal button click function 445 ============================ //
$('#div-DefaultersEntry-Edit-Modal').on('hidden.bs.modal', function () {
    $('#defaulters-Project-edit').removeClass("redClass");
    $('#Task-edit').removeClass("redClass");
    $('#ActualHours').removeClass("redClass");
    $('#BillableHours').removeClass("redClass");
});


function addDefaultersTask() {
    
    $("#defaulters-addTaskTitle").val('');
    $("#defaulters-addTaskDesc").val('');
    $('.error_message').html("");
    $("#addDefaultersTask_Modal").appendTo('body').modal("show");
}

function selectDefaultersPhase_OnChange() {
    var ProjectId = $('#save_DefaultersActivity').data('TaskId');
    var PhaseId = $('#defaulters-selectPhase').val();

    var filter_val = JSON.stringify({
        "ProjectId": ProjectId,
        "PhaseId": PhaseId
    });

    var result = callgetlist("GetTasksbyProjectId", filter_val);

    var options = `<option value=''>Select a Task</option>`;
    for (var i = 0; i < result.length; i++) {
        options +=
            "<option value='" + result[i].ProjectTaskId + "'>" + result[i].ProjectFeature + "</option>";
    }

    $("#defaulters-selectTask").html(options);

    var options = `<option value=''>Select a Sub-task</option>`;

    $("#defaulters-selectSubTask").html(options);
}


function saveDefaultersTaskDetails() {

    var ActionId = $('#save_DefaultersActivity').data('ActionId');
    var ProjectPhaseId = $('#defaulters-selectPhase').val();
    var taskTitle = $("#defaulters-addTaskTitle").val();
    var taskDesc = $("#defaulters-addTaskDesc").val();
    
    $('.error_message').html("");
    if (!taskTitle) {
        $('#defaulters-taskTitleError').html("Please enter a title.");
        return;
    }
    if (!taskDesc) {
        $('#defaulters-taskDescError').html("Please enter a description.");
        return;
    }
    
    var Data = {
        "ActionId": ActionId,
        "ProjectPhaseId": ProjectPhaseId,
        "Data": taskTitle,
        "Message": "",
        "Status": ""
    };
    var data = {
        "Method": "PostTaskEntry",
        "Data": Data
    }
    var postCall = PostDataCall(data);

    if (postCall['IsSuccess']) {
        swal({
            title: "Success!",
            text: postCall['Message'],
            icon: "success",
            button: "ok!",
        });
        selectDefaultersPhase_OnChange();
        $("#addDefaultersTask_Modal").modal("hide");
    } else {
        swal({
            title: "Sorry!",
            text: postCall['Message'],
            icon: "error",
        });
    }
}

function addDefaultersSubTask() {
    $("#defaulters-addSubTaskTitle").val('');
    $("#defaulters-addSubTaskDesc").val('');
    $('.error_message').html("");
    $("#addDefaultersSubTask_Modal").appendTo('body').modal("show");
}

function saveDefaultersSubTaskDetails() {
    var TaskId = $("#defaulters-selectTask").val();
    var SubTask = $("#defaulters-addSubTaskTitle").val();
    var SubTaskDetails = $("#defaulters-addSubTaskDesc").val();
    //
    $('.error_message').html("");
    if (!SubTask) {
        $('#defaulters-subTaskTitleError').html("Please enter a title.");
        return;
    }
    if (!SubTaskDetails) {
        $('#defaulters-subTaskDescError').html("Please enter a description.");
        return;
    }
   
    var Data = {
        "TaskId": TaskId,
        "SubTask": SubTask,
        "SubTaskDetails": SubTaskDetails,
        "Message": "",
        "Status": ""
    };
    var data = {
        "Method": "PostSubTaskEntry",
        "Data": Data
    }
    var postCall = PostDataCall(data);

    if (postCall['IsSuccess']) {
        swal({
            title: "Success!",
            text: postCall['Message'],
            icon: "success",
            button: "ok!",
        });
        select_defaulters_task_OnChange();
        $("#addDefaultersSubTask_Modal").modal("hide");
    } else {
        swal({
            title: "Sorry!",
            text: postCall['Message'],
            icon: "error",
        });
    }
}


function editDefaultersEntry(TaskId) {

    $("#defaulters-presales_task").hide();
    $("#sddgd-defaulters-actionitems").hide();
    var filter_val = JSON.stringify({});
    var result = callgetlist("GetQuickActionItems", filter_val);

    var options = "<option value=''>Select an activity</option>";
    for (var i = 0; i < result.length; i++) {
        options +=
            "<option value='" + result[i].Id + "'>" + result[i].ActionItem + "</option>";
    }

    $("#defaultersEntryAction").html(options);
    $("#div-DefaultersEntry-Edit-Modal").appendTo('body').modal("show");

    $("#defaulterModalTitle").text("Edit an Action");
    var selectedDate = $("#defaulters_entry_reports_Date").dxDateBox("instance").option("text");
    $("#defaultersSelectedDate").html(selectedDate);
    $("#div-DefaultersEntry-Edit-Modal .modal-body").css({ "height": "500px" });
    $("#defaultersEntryAction").val("4080F380-3119-464F-B5B8-1BF55611EE7A");
    $(".divDefaultersEdit").hide();
    $("#sddgd-defaulters-actionitems").show();

    var selectedDate = $("#defaulters_entry_reports_Date").dxDateBox("instance").option("value");
    var filter_val = JSON.stringify({
        Token: Token,
        FilterDate: selectedDate
    });

    var resultSubActions = callgetlist("GetTaskEntryProjectsByTaskIdAndDate", filter_val);
    var actionId = '4080F380-3119-464F-B5B8-1BF55611EE7A';
    var skillFamilyDataGrid = $("#sddgd-defaulters-actionitems")
        .dxDataGrid({
            filterRow: {
                visible: true,
                applyFilter: "auto",
            },
            dataSource: resultSubActions,
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
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [5, 10, 20],
                showInfo: true,
            },
            paging: {
                pageSize: 5,
            },
            groupPanel: {
                visible: true,
                emptyPanelText: "Drag a column header here to group by that column"
            },
            sorting: {
                mode: "multiple",
            },
            // selection: {
            //   mode: "multiple",
            // },
            columnChooser: {
                enabled: true,
            },
            rowAlternationEnabled: true,
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
                            loadEditDefaultersActivityGrid();
                        },
                    },
                });
            },
            columns: [
                {
                    dataField: 'ProjectsTaskEntriesId',
                    caption: 'ProjectsTaskEntriesId',
                    visible: false
                },
                {
                    dataField: 'ProjectId',
                    caption: 'ProjectId',
                    visible: false
                },
                {
                    dataField: 'ProjectName',
                    caption: 'ProjectName'
                },
                {
                    dataField: 'Client',
                    caption: 'Client'
                },
                {
                    dataField: 'PlannedStartDate',
                    caption: 'PlannedStartDate'
                },
                {
                    dataField: 'PlannedEndDate',
                    caption: 'PlannedEndDate'
                },
                {
                    dataField: 'Hours',
                    caption: 'Hours'
                },
                {
                    dataField: 'Status',
                    caption: 'Status',
                    visible: false
                },
                {
                    dataField: "",
                    caption: "Action",
                    width: 75,
                    allowFiltering: false,
                    allowGrouping: false,
                    allowReordering: false,
                    allowSorting: false,
                    allowCollapsing: false,
                    allowExporting: false,
                    cellTemplate: function (container, options) {
                        var taskIsApproved = options.data["IsApproved"];
                        var action = "Projects";
                        var subActionId = 'A0-1B-C2';
                        if (action == 'Projects') {
                            subActionId = options.data["ProjectId"];
                        } else if (action == 'RFP') {
                            subActionId = options.data["Id"];
                        } else if (action == 'Meetings') {
                            subActionId = options.data["MeetingId"];
                        } else if (action == 'RRM') {
                            subActionId = options.data["RRMId"];
                        }
                        //   var familyName = options.data["Name"];
                        if(!taskIsApproved){
                        var domActions = "";
                        domActions +=
                            `<button class='btn btn-xs btn-primary edit-btn' onclick='fncEditDefaultersEntryActivity("${actionId}", "${subActionId}","${options.data.ProjectId}","${options.data.ProjectsTaskEntriesId}")'><i class='fas fa-pencil-alt'></i></button>`
                        domActions +=
                            `<button class='btn btn-xs btn-primary delete-btn' onclick='fncDeleteDefaultersEntry("${actionId}", "${subActionId}","${options.data.ProjectId}","${options.data.ProjectsTaskEntriesId}")'><i class='fas fa-trash'></i></button>`
                        $("<div class='text-center'>")
                            .append($(domActions))
                            .appendTo(container);
                        }
                        else{
                            var domActions = "";
                            domActions +="<label class='label label-success label-sm'>Approved</label>"
                            $("<div class='text-center'>")
                            .append($(domActions))
                            .appendTo(container);
                        }
                    }
                }
            ],
        });
}

function fncDeleteDefaultersEntry(ActionId, TaskId, ProjectId, ProjectsTaskEntriesId){
    swal({
        title: "Are you sure?",
        text: "Task entry will be deleted",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((res) => {
        if (res) {
     
            var selectedDate = $("#defaulters_entry_reports_Date").dxDateBox("instance").option("value");
            debugger;
            var Data = {
                "ProjectTaskId": TaskId,
                "ProjectsTaskEntriesId": ProjectsTaskEntriesId,
                "FilterDate": selectedDate,
                "Message": "",
                "Status": ""
            };
            var data = {
                "Method": "DeleteProjectTaskEntriesByProjectIdAndDate",
                "Data": Data
            }
            var postCall = PostDataCall(data);

            if (postCall['IsSuccess']) {
                swal({
                    title: "Success!",
                    text: postCall['Message'],
                    icon: "success",
                    button: "ok!",
                });
                $("#div-DefaultersEntryActivity-Edit-Modal").modal("hide");
                loadEditDefaultersActivityGrid();
                getDefaultersReportsBasedOnSelectedDate();
            } else {
                swal({
                    title: "Sorry!",
                    text: postCall['Message'],
                    icon: "error",
                });
            }
        }
    })
}

function fncEditDefaultersEntryActivity(ActionId, TaskId, ProjectId, ProjectsTaskEntriesId) {
   
    projectsTaskEntriesId = ProjectsTaskEntriesId;
    $('#save_DefaultersActivity').data('ActionId', ActionId);
    $('#save_DefaultersActivity').data('TaskId', TaskId);
    var action = "Projects";
    var actionValue = $("#defaultersEntryAction").val();
    $("#defaulters-text-area-action").val("");
    $("#defaulters-worked-hours-counter").val('');
    $("#defaulters-worked-mins-counter").val('');
    $('#defaulters-phaseDiv').hide();
    $("#defaulters-text-area-action-2").val('');
    $("#defaulters-worked-hours-counter-2").val('');
    $("#defaulters-worked-mins-counter-2").val('');
    $("#defaulters-completion-percentage").val('');
   
    $('.error_message').html("");

    var resultTasks = [];
    $('#defaulters-add-task-button').hide();
    $("#save_DefaultersActivity").hide();
    $("#update_DefaultersActivity").show();

    if (!actionValue) {
        alert('Please select an activity first.');
        return;
    } else if (action == 'PreSales') {
        $("#defaulters-taskDiv").hide();
        $("#defaulters-subTaskDiv").hide();
    } else if (action == 'Projects') {
        $('#defaulters-add-task-button').show();
        $("#defaulters-taskSelectDiv").css("display", "table");

        var filter_val = JSON.stringify({
            "ProjectId": TaskId
        });

        var result = callgetlist("GetProjectPhasesbyProjectId", filter_val);

        var options = `<option value=''>Select a Phase</option>`;
        for (var i = 0; i < result.length; i++) {
            options +=
                "<option value='" + result[i].Id + "'>" + result[i].Phases + "</option>";
        }

        $("#defaulters-selectPhase").html(options);
        //
        $('#defaulters-phaseDiv').show();
        $("#defaulters-taskDiv").show();
        $("#defaulters-subTaskDiv").show();

        var options3 = `<option value=''>Select a Sub-task</option>`;

        $("#defaulters-selectSubTask").html(options3);
        $('#defaulters-estimatedHoursDiv').show();
        $('#defaulters-availableHoursDiv').show();
    } else {

        $('#defaulters-add-task-button').hide();
        $("#defaulters-taskSelectDiv").css("display", "block");

        var filter_val = JSON.stringify({
            ActionId: ActionId,
            TaskId: TaskId
        });

        $("#defaulters-taskDiv").show();
        $("#defaulters-subTaskDiv").hide();
        $('#defaulters-estimatedHoursDiv').hide();
        $('#defaulters-availableHoursDiv').hide();
        if (action == 'RFP') {
            var resultTasks = callgetlist("GetTaskEntryRFPActivities", filter_val);

        } else if (action == 'RRM') {
            var resultTasks = callgetlist("GetTaskEntryRRMActivities", filter_val);

        } else if (action == 'KT') {
            var resultTasks = callgetlist("GetTaskEntryKTActivities", filter_val);

        } else if (action == 'Meetings') {
            var resultTasks = callgetlist("GetTaskEntryMeetingActivities", filter_val);

        }
    }

    var options2 = `<option value=''>Select a Task</option>`;
    for (var i = 0; i < resultTasks.length; i++) {
        options2 +=
            "<option value='" + resultTasks[i].Id + "'>" + resultTasks[i].ActionItem + "</option>";
    }
    $("#defaulters-selectTask").html(options2);

    $("#div-DefaultersEntryActivity-Edit-Modal").appendTo('body').modal("show");

    var selectedDate = $("#defaulters_entry_reports_Date").dxDateBox("instance").option("value");
    var filter_valDetails = JSON.stringify({
        Token: Token,
        ProjectTaskEntriesId: projectsTaskEntriesId,
        FilterDate: selectedDate
    });

    var resultProjects = callgetlist("GetProjectDetailsBasedOnProjectTaskEntriesIdAndDate", filter_valDetails);

    $("#defaulters-selectPhase").val(resultProjects[0].PhasesId);

    var PhaseId = $('#defaulters-selectPhase').val();

    var filter_val = JSON.stringify({
        "ProjectId": ProjectId,
        "PhaseId": PhaseId
    });

    var result = callgetlist("GetTasksbyProjectId", filter_val);

    var options = `<option value=''>Select a Task</option>`;
    for (var i = 0; i < result.length; i++) {
        options +=
            "<option value='" + result[i].ProjectTaskId + "'>" + result[i].ProjectFeature + "</option>";
    }

    $("#defaulters-selectTask").html(options);

    var options = `<option value=''>Select a Sub-task</option>`;

    $("#defaulters-selectSubTask").html(options);

    $("#defaulters-selectTask").val(resultProjects[0].TaskId);

    var taskIdForSubTask = $("#defaulters-selectTask option:selected").val();
    var filter_val = JSON.stringify({
        ProjectTaskId: taskIdForSubTask
    });
    var resultSubTasks = callgetlist("GetSubTasksbyTaskId", filter_val);

    var options5 = `<option value=''>Select a Sub-task</option>`;
    for (var i = 0; i < resultSubTasks.length; i++) {
        options5 +=
            "<option value='" + resultSubTasks[i].Id + "'>" + resultSubTasks[i].SubTask + "</option>";
    }

    $("#defaulters-selectSubTask").html(options5);

    if (resultProjects[0].SubTaskId != "" && resultProjects[0].SubTaskId != null && resultProjects[0].SubTaskId != undefined) {
        $("#defaulters-selectSubTask").val(resultProjects[0].SubTaskId);
    }

    $("#defaulters-text-area-action-2").val(resultProjects[0].Description);
    if (resultProjects[0].HoursSpent != undefined) {
        $("#defaulters-worked-hours-counter-2").val(resultProjects[0].HoursSpent);
    }
    if (resultProjects[0].MinutesSpent != undefined) {
        $("#defaulters-worked-mins-counter-2").val(resultProjects[0].MinutesSpent);
    }
    var selectedDate = $("#defaulters_entry_reports_Date").dxDateBox("instance").option("text");
    $("#defaultersSelectedDatePopup").html(selectedDate);
}

function updateDefaultersEntry() {
   
    var selectedDate = $("#defaulters_entry_reports_Date").dxDateBox("instance").option("value");
    var taskVal = $('#defaulters-selectTask').val();
    var Description = $("#defaulters-text-area-action-2").val();
    var hh = $("#defaulters-worked-hours-counter-2").val();
    var mm = $("#defaulters-worked-mins-counter-2").val();
    var completionOfPercentage = Number($("#defaulters-completion-percentage").val());

    $('.error_message').html("");
    if (!taskVal) {
        $('#defaulters-taskError-modal').html("Please select a task.");
        return;
    }
    if (!Description) {
        $('#defaulters-descriptionError-modal').html("Please enter valid description.");
        return;
    }
    if (hh === '' || hh < 0 || hh > 23) {
        $('#defaulters-workingHrsError-modal').html("Please enter valid hours.");
        return;
    }
    if (mm === '' || mm < 0 || mm > 59) {
        $('#defaulters-workingHrsError-modal').html("Please enter valid minutes.");
        return;
    }
    if (!completionOfPercentage) {
        $('#defaulters-completionError-modal').html("Please enter completion percentage.");
        return;
    }

    hh = Number(hh);
    mm = Number(mm);
    if (hh < 10) hh = '0' + hh;
    if (mm < 10) mm = '0' + mm;
    var HoursSpent = hh + ':' + mm;

    var Data = {
        "ProjectTaskId": taskVal,
        "ProjectSubTaskId": $('#defaulters-selectSubTask').val(),
        "Description": Description,
        "HoursSpent": HoursSpent,
        "PercentageofCompletion": completionOfPercentage,
        "ProjectsTaskEntriesId": projectsTaskEntriesId,
        "FilterDate": selectedDate,
        "Message": "",
        "Status": ""
    };
    var data = {
        "Method": "UpdateProjectTaskEntriesByProjectId",
        "Data": Data
    }
    var postCall = PostDataCall(data);

    if (postCall['IsSuccess']) {
        swal({
            title: "Success!",
            text: postCall['Message'],
            icon: "success",
            button: "ok!",
        });
        $("#div-DefaultersEntryActivity-Edit-Modal").modal("hide");
        loadEditDefaultersActivityGrid();
        getDefaultersReportsBasedOnSelectedDate();
    } else {
        swal({
            title: "Sorry!",
            text: postCall['Message'],
            icon: "error",
        });
    }

}

function loadEditDefaultersActivityGrid() {
   
    var selectedDate = $("#defaulters_entry_reports_Date").dxDateBox("instance").option("value");
    var filterData = JSON.stringify({
        Token: Token,
        FilterDate: selectedDate
    });

    callGetListAsync('GetTaskEntryProjectsByTaskIdAndDate', filterData, function (e) {

        $("#sddgd-defaulters-actionitems").dxDataGrid({ dataSource: e })
        try {
            $("#sddgd-defaulters-actionitems").dxDataGrid('instance').refresh();
        }
        catch (ex) {

        }
    });
}