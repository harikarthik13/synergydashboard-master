function include(filename, onload) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';
    head.appendChild(script);
}
include('components/quick_action/js/quickaction/project.js');
include('components/quick_action/js/quickaction/rfphandling.js');
include('components/quick_action/js/quickaction/meeting.js');
include('components/quick_action/js/quickaction/interviews.js');
include('components/quick_action/js/quickaction/resourcesmgmt.js');
include('components/quick_action/js/quickaction/supporttomkt.js');
include('components/quick_action/js/quickaction/supporttohr.js');

$(document).on('show.bs.modal', '.modal', function () {
    $(this).appendTo('body');
  });

//===================== action on change ===================/
function edit_action_OnChange(e) {
    // $("#div-QuickAction-Edit-Modal .modal-body").css({"height": "auto"});
    var selectedValue = $(e).val();
    // alert(selectedValue);
    // var filter_val = JSON.stringify({});
    // var result = callgetlist("GetSubActivities", filter_val);

    var action;
    var actionId;
    if ($("#div-QuickAction-Edit-Modal").is(':visible')){
        action = $("#Action option:selected").text();
        actionId = $('#Action').val();
    } else if ($("#div-QuickAction-Edit-Small-Modal").is(':visible')){
        action = $("#ActionSmall option:selected").text();
        actionId = $('#ActionSmall').val();
    } else if ($("#div-QuickAction-Edit-Big-Modal").is(':visible')){
        action = $("#ActionBig option:selected").text();
        actionId = $('#ActionBig').val();
    }
    //
    console.log({selectedValue});
    console.log({action});
    console.log({actionId});
    // $("#activityLabel").text('Select a ' + action);
    //
    openActionModal(action, 'create', selectedValue);
}

function openActionModal(action, actionEvent, selectedValue=-1){
    console.log({actionEvent});
    var actionId;
    //
    if (action == 'Projects'){
        actionId = '4080F380-3119-464F-B5B8-1BF55611EE7A';
    } else if (action == 'RFP'){
        actionId = '7722524C-0A27-464F-97E9-60171D9CAEA6';
    } else if (action == 'RRM'){
        actionId = '8542E76D-76EF-4281-A2E3-FCB2BEC86B81';
    } else if (action == 'PreSales'){
        actionId = '51870C48-803F-4D2B-95CA-E9AE826715FE';
    } else if (action == 'KT'){
        actionId = '7F127A7A-B538-4AD0-A1AB-9672EBE738EE';
    } else if (action == 'Meetings'){
        actionId = '806051E7-CE56-43B1-89EA-8A96E8E95365';
    } else if (action == 'HR Support'){
        actionId = 'A3CB36B9-ED7E-4497-818E-64AAA27248EB';
    }
    //
    if (actionEvent == 'create'){
        $('.selectAnActivity').show();
        $('#ActionSmall').show();
        $('#ActionBig').show();
    } else {
        $('.selectAnActivity').hide();
        $('#ActionSmall').hide();
        $('#ActionBig').hide();
    }
    //
    if (actionEvent == 'view'){
        $('#save_QuickActionActivity-2').prop('disabled', true);
        $('#text-area-action').prop('disabled', true);
        $('#worked-hours-counter').prop('disabled', true);
        $('#worked-mins-counter').prop('disabled', true);
    } else {
        $('#save_QuickActionActivity-2').prop('disabled', false);
        $('#text-area-action').prop('disabled', false);
        $('#worked-hours-counter').prop('disabled', false);
        $('#worked-mins-counter').prop('disabled', false);
    }
    //
    var resultSubActions = [];
    // $("#activityDiv").show();
    // $("#taskDiv").show();

   

    if (action == 'Select an activity') {
        if ($("#div-QuickAction-Edit-Small-Modal").is(':visible')){
            $("#div-QuickAction-Edit-Small-Modal").modal("hide");
        }
        if ($("#div-QuickAction-Edit-Big-Modal").is(':visible')){
            $("#div-QuickAction-Edit-Big-Modal").modal("hide");
        }
        setTimeout(()=>{
            $('#Action').val('');
            $("#div-QuickAction-Edit-Modal").modal("show");
        }, 0);
    } else if (action == 'PreSales' && actionEvent == 'create') {
        $('#save_QuickActionActivity-2').data('Action', action);
        $('#save_QuickActionActivity-2').data('ActionId', actionId);
        if ($("#div-QuickAction-Edit-Modal").is(':visible')){
            $("#div-QuickAction-Edit-Modal").modal("hide");
        }
        if ($("#div-QuickAction-Edit-Big-Modal").is(':visible')){
            $("#div-QuickAction-Edit-Big-Modal").modal("hide");
        }
        //
        $("#text-area-action").val("");
        $("#worked-hours-counter").val('0');
        $("#worked-mins-counter").val('0');
        //
        if (!$("#div-QuickAction-Edit-Small-Modal").is(':visible')){
            setTimeout(()=>{
                if (selectedValue != -1){
                    $('#ActionSmall').val(selectedValue);
                }
                $("#div-QuickAction-Edit-Small-Modal").modal("show");
            }, 0);
        }
    } else if(action == 'KT' && actionEvent == 'create'){
        $('#save_QuickActionActivity-2').data('Action', action);
        $('#save_QuickActionActivity-2').data('ActionId', actionId);
        if ($("#div-QuickAction-Edit-Modal").is(':visible')){
            $("#div-QuickAction-Edit-Modal").modal("hide");
        }
        if ($("#div-QuickAction-Edit-Big-Modal").is(':visible')){
            $("#div-QuickAction-Edit-Big-Modal").modal("hide");
        }
        if (!$("#div-QuickAction-Edit-Small-Modal").is(':visible')){
            setTimeout(()=>{
                if (selectedValue != -1){
                    $('#ActionSmall').val(selectedValue);
                }
                $("#div-QuickAction-Edit-Small-Modal").modal("show");
            }, 0);
        }
        //
        $("#text-area-action").val("");
        $("#worked-hours-counter").val('0');
        $("#worked-mins-counter").val('0');
        //
    } else if(action == 'HR Support' && actionEvent == 'create'){
        $('#save_QuickActionActivity-2').data('Action', action);
        $('#save_QuickActionActivity-2').data('ActionId', actionId);
        if ($("#div-QuickAction-Edit-Modal").is(':visible')){
            $("#div-QuickAction-Edit-Modal").modal("hide");
        }
        if ($("#div-QuickAction-Edit-Big-Modal").is(':visible')){
            $("#div-QuickAction-Edit-Big-Modal").modal("hide");
        }
        if (!$("#div-QuickAction-Edit-Small-Modal").is(':visible')){
            setTimeout(()=>{
                if (selectedValue != -1){
                    $('#ActionSmall').val(selectedValue);
                }
                $("#div-QuickAction-Edit-Small-Modal").modal("show");
            }, 0);
        }
        //
        $("#text-area-action").val("");
        $("#worked-hours-counter").val('0');
        $("#worked-mins-counter").val('0');
        //
    }
    else {
        if ($("#div-QuickAction-Edit-Modal").is(':visible')){
            $("#div-QuickAction-Edit-Modal").modal("hide");
        }
        if ($("#div-QuickAction-Edit-Small-Modal").is(':visible')){
            $("#div-QuickAction-Edit-Small-Modal").modal("hide");
        }
        if (!$("#div-QuickAction-Edit-Big-Modal").is(':visible')){
            setTimeout(()=>{
                if (selectedValue != -1){
                    $('#ActionBig').val(selectedValue);
                }
                $("#div-QuickAction-Edit-Big-Modal").modal("show");
            }, 0);
        }
        
        openActionModalStep2(action, actionEvent, actionId);
        }
    }

        function openActionModalStep2(action, actionEvent, actionId){
        var filter_val = JSON.stringify({});
        var endPointName = 'GetTaskEntryRFP';
        if (action == 'RFP') {
            if (actionEvent == 'create'){
                endPointName = 'GetTaskEntryRFP';
            } else {
                filter_val = JSON.stringify({
                    TaskEntryDate: getFormattedTaskEntryDate()
                }); 
                endPointName = 'GetTaskEntryRFPsToday';
            }
        } else if (action == 'RRM') {
            if (actionEvent == 'create'){
                endPointName = 'GetTaskEntryRRM';
            } else {
                filter_val = JSON.stringify({
                    TaskEntryDate: getFormattedTaskEntryDate()
                }); 
                endPointName = 'GetTaskEntryRRMsToday';
            }
        } else if (action == 'KT') {
            filter_val = JSON.stringify({
                TaskEntryDate: getFormattedTaskEntryDate()
            }); 
            endPointName = 'GetTaskEntryKTsToday';
        } else if (action == 'Meetings') {
            endPointName = 'GetTaskEntryMeetings';
        } else if (action == 'Projects') {
            if (actionEvent == 'create'){
                endPointName = 'GetTaskEntryProjects';
            } else {
                filter_val = JSON.stringify({
                    TaskEntryDate: getFormattedTaskEntryDate()
                }); 
                endPointName = 'GetTaskEntryProjectsToday';
            }
        } else if (action == 'PreSales') {
            filter_val = JSON.stringify({
                TaskEntryDate: getFormattedTaskEntryDate()
            }); 
            endPointName = 'GetTaskEntryPresalesToday';
        } else if (action == 'HR Support') {
            filter_val = JSON.stringify({
                TaskEntryDate: getFormattedTaskEntryDate()
            }); 
            endPointName = 'GetTaskEntryHRSupportToday';
        }
        var resultSubActions = callgetlist(endPointName, filter_val);


        console.log({resultSubActions});
        
      
        let keys = null;
        if (resultSubActions.length) {
            keys = Object.keys(resultSubActions[0]);
        } else {
            keys = ['Id', 'ActionItem'];
            resultSubActions = [];
        }
        columnsFromApi = [];
        if (keys){
            for (var i = 0; i < keys.length; i++) {
                columnsFromApi.push({ dataField: keys[i], caption: keys[i] });
            }

        var skillFamilyDataGrid = $("#sddgd-actionitems")
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
                        width: 100,
                        allowFiltering: false,
                        allowGrouping: false,
                        allowReordering: false,
                        allowSorting: false,
                        allowCollapsing: false,
                        allowExporting: false,
                        cellTemplate: function (container, options) {
                            console.log({options});
                            // var action = $("#Action option:selected").text();
                            var subActionId = 'A0-1B-C2';
                            var taskEntriesId = null;
                            var actionTaskEntriesId = null;
                            if (action=='Projects'){
                                subActionId = options.data["ProjectId"];
                                if (actionEvent != 'create'){
                                    taskEntriesId = options.data["TaskEntriesId"];
                                    actionTaskEntriesId = options.data["ProjectsTaskEntriesId"];
                                }
                            } else if (action=='RFP'){
                                subActionId = options.data["Id"];
                                if (actionEvent != 'create'){
                                    subActionId = options.data["RequestForProposalId"];
                                    taskEntriesId = options.data["TaskEntriesId"];
                                    actionTaskEntriesId = options.data["RFPTaskEntriesId"];
                                }
                            } else if (action=='Meetings'){
                                subActionId = options.data["MeetingId"];
                            } else if (action=='RRM'){
                                subActionId = options.data["RRMId"];
                                if (actionEvent != 'create'){
                                    subActionId = options.data["ResourceRequirementId"];
                                    taskEntriesId = options.data["TaskEntriesId"];
                                    actionTaskEntriesId = options.data["RRMTaskEntriesId"];
                                }
                            } else if (action=='KT'){
                                // subActionId = options.data["ResourceRequirementId"];
                                taskEntriesId = options.data["TaskEntriesId"];
                                actionTaskEntriesId = options.data["KTTaskEntriesId"];
                            } else if (action=='PreSales'){
                                // subActionId = options.data["ResourceRequirementId"];
                                taskEntriesId = options.data["TaskEntriesId"];
                                actionTaskEntriesId = options.data["PresalesTaskEntriesId"];
                            } else if (action=='HR Support'){
                                // subActionId = options.data["ResourceRequirementId"];
                                taskEntriesId = options.data["TaskEntriesId"];
                                actionTaskEntriesId = options.data["HRSupportTaskEntriesId"];
                            }
                            //   var familyName = options.data["Name"];
                            var domActions = "";
                            if (actionEvent == 'create' || options.data["IsApproved"] != 1){
                            domActions +=
                            `<button class='btn btn-xs btn-primary action-btns' onclick='fncQuickactionActivity("${action}", "${actionId}", "${subActionId}", "${actionEvent}", "${taskEntriesId}", "${actionTaskEntriesId}")'><i class='fas fa-pencil-alt'></i></button>`;
                            }
                            if (actionEvent != 'create'){
                                domActions +=
                                `<button class='btn btn-xs btn-primary action-btns' style='margin-left:10px;' onclick='fncQuickactionActivity("${action}", "${actionId}", "${subActionId}", "view", "${taskEntriesId}", "${actionTaskEntriesId}")'><i class='fas fa fa-eye'></i></button>`;
                                if (options.data["IsApproved"] != 1){
                                    domActions +=
                                    `<button class='btn btn-xs btn-primary action-btns' style='margin-left:10px;' onclick='deleteTaskEntriesId("${action}", "${actionId}", "${subActionId}", "delete", "${taskEntriesId}", "${actionTaskEntriesId}")'><i class='fas fa fa-trash'></i></button>`;
                                }
                        }
                            
                            //     domActions += `<button class='btn btn-xs btn-primary delete-btn' onclick='deleteSkillFamily("${familyId}")'><i class='fas fa-trash'></i></button>`
                            $("<div class='text-center'>")
                                .append($(domActions))
                                .appendTo(container);
                        }
                    }
                ],
            });
        }
    // }

    // ========================== Select Action List End ============================ /
}

//===================== action on edit click of action modal dialog ===================/
function fncQuickactionActivity(action, ActionId, TaskId, actionEvent, taskEntriesId, actionTaskEntriesId) {
    console.log({action});
    console.log({ActionId});
console.log({TaskId});
console.log({actionEvent});
console.log({taskEntriesId});
console.log({actionTaskEntriesId});
//
$('#save_QuickActionActivity').data('Action', action);
    $('#save_QuickActionActivity').data('ActionId', ActionId);
    $('#save_QuickActionActivity').data('TaskId', TaskId);
    $('#save_QuickActionActivity').data('actionEvent', actionEvent);
    $('#save_QuickActionActivity').data('taskEntriesId', taskEntriesId);
    $('#save_QuickActionActivity').data('actionTaskEntriesId', actionTaskEntriesId);
    //
    var actionValue = ActionId;
    // if ($("#div-QuickAction-Edit-Modal").is(':visible')){
    //     action = $("#Action option:selected").text();
    //     actionValue = $("#Action").val();
    // } else if ($("#div-QuickAction-Edit-Small-Modal").is(':visible')){
    //     action = $("#ActionSmall option:selected").text();
    //     actionValue = $("#ActionSmall").val();
    // } else if ($("#div-QuickAction-Edit-Big-Modal").is(':visible')){
    //     action = $("#ActionBig option:selected").text();
    //     actionValue = $("#ActionBig").val();
    // }
    console.log({actionValue});
    //
    //
    
    if (actionEvent == 'view'){
        $('#save_QuickActionActivity').prop('disabled', true);
        $('#save_QuickActionActivity_noclose').prop('disabled', true);
        $('#selectTask').prop('disabled', true);
        $('#add-task-button').prop('disabled', true);
        $('#selectSubTask').prop('disabled', true);
        $('#add-subtask-button').prop('disabled', true);
        $('#text-area-action-2').prop('disabled', true);
        $('#worked-hours-counter-2').prop('disabled', true);
        $('#worked-mins-counter-2').prop('disabled', true);
        $('#completion-percentage').prop('disabled', true);
        $('#selectPhase').prop('disabled', true);
    } else {
        $('#save_QuickActionActivity').prop('disabled', false);
        $('#save_QuickActionActivity_noclose').prop('disabled', false);
        $('#selectTask').prop('disabled', false);
        $('#add-task-button').prop('disabled', false);
        $('#selectSubTask').prop('disabled', false);
        $('#add-subtask-button').prop('disabled', false);
        $('#text-area-action-2').prop('disabled', false);
        $('#worked-hours-counter-2').prop('disabled', false);
        $('#worked-mins-counter-2').prop('disabled', false);
        $('#completion-percentage').prop('disabled', false);
        $('#selectPhase').prop('disabled', false);
    }
    //
    // var action = $("#Action option:selected").text();
    // var actionValue = $("#Action").val();
    $("#text-area-action").val("");
    $("#worked-hours-counter").val('0');
    $("#worked-mins-counter").val('0');
    $('#phaseDiv').hide();
    //
    $("#text-area-action-2").val('');
    $("#worked-hours-counter-2").val('0');
    $("#worked-mins-counter-2").val('0');
    $("#completion-percentage").val('0');
    //
    $('.error_message').html("");
    
    var resultTasks = [];
    //
    $('#add-task-button-group').hide();
 
    $('#save_QuickActionActivity_noclose').hide();
    // if (!actionValue) {
    //     alert('Please select an activity first.');
    //     return;
    // } else if (action == 'PreSales') {
    //     $("#taskDiv").hide();
    //     $("#subTaskDiv").hide();
    // } else 
    if (action == 'Projects') {
        if (actionEvent == 'create'){
            $('#save_QuickActionActivity_noclose').show();
        }
        $('#add-task-button-group').show();
        $("#taskSelectDiv").css("display", "table");
        var phaseId = null;
        var taskVal = null;
        var subTaskVal = null;
        var Description = null;
        var hh = null;
        var mm = null;
        var completionOfPercentage = null;

        if (actionEvent != 'create'){
            var filter_val = JSON.stringify({
                "ProjectsTaskEntriesId": actionTaskEntriesId
            });
        
            var result = callgetlist("GetProjectDetailsByProjectsTaskEntriesId", filter_val);
            console.log({result});
            if (result.length){
                phaseId = result[0].PhasesId;
                taskVal = result[0].ProjectTaskId;
                subTaskVal = result[0].SubTaskId;
                Description = result[0].Description;
                hh = result[0].HoursSpent;
                mm = result[0].MinutesSpent;
            }
        }

            var filter_val = JSON.stringify({
                "ProjectId": TaskId
            });
        
            var result = callgetlist("GetProjectPhasesbyProjectId", filter_val);
            console.log({result});
            var options = `<option value=''>Select a Phase</option>`;
                for (var i = 0; i < result.length; i++) {
                    options +=
                        "<option value='" + result[i].Id + "'>" + result[i].Phases + "</option>";
                }
        
                $("#selectPhase").html(options);

                // var phaseVal = $('#selectPhase').val();
        // var taskVal = $('#selectTask').val();
        // var Description = $("#text-area-action-2").val();
        // var hh = $("#worked-hours-counter-2").val();
        // var mm = $("#worked-mins-counter-2").val();
        // var completionOfPercentage = Number($("#completion-percentage").val());


                if (phaseId){
                    $("#selectPhase").val(phaseId);
                }
                if (Description){
                    $("#text-area-action-2").val(Description);
                }
                if (hh){
                    $("#worked-hours-counter-2").val(hh);
                }
                if (mm){
                    $("#worked-mins-counter-2").val(mm);
                }
                if (completionOfPercentage){
                    $("#completion-percentage").val(completionOfPercentage);
                }
                //
        $('#phaseDiv').show();
        $("#taskDiv").show();
        $("#subTaskDiv").show();
        // resultTasks = [{Id:1, Name:'Design'},{Id:2, Name:'Development'},{Id:3, Name:'Unit Testing'}];
        // var resultTasks = callgetlist("GetTaskEntryProjectActivities", filter_val);
        // if (!resultTasks) resultTasks = [];
        // console.log(resultTasks);
        // var resultSubTasks = callgetlist("GetTaskEntryProjectActivities", filter_val);
        // if (!resultSubTasks) resultSubTasks = [];

        var options3 = `<option value=''>Select a Sub-task</option>`;
        // for (var i = 0; i < resultSubTasks.length; i++) {
        //     options3 +=
        //         "<option value='" + resultSubTasks[i].Id + "'>" + resultSubTasks[i].ActionItem + "</option>";
        // }

        $("#selectSubTask").html(options3).trigger('change');
        //
        $('#estimatedHoursDiv').show();
        $('#availableHoursDiv').show();
    } else {
        // if (action != 'Meetings') {
        //     $("#taskDiv").show();
        // } else {
        //     $("#taskDiv").hide();
        // }
        $('#add-task-button-group').hide();
        $("#taskSelectDiv").css("display", "block");

        var filter_val = JSON.stringify({
            ActionId: ActionId,
            TaskId: TaskId
        });
        console.log({filter_val})
        //
        if (action == 'PreSales' || action == 'KT' || action == 'HR Support') {
            $("#taskDiv").hide();
        } else {
            $("#taskDiv").show();
        }
        $("#subTaskDiv").hide();
        $('#estimatedHoursDiv').hide();
        $('#availableHoursDiv').hide();
        if (action == 'RFP') {
            if (actionEvent != 'create'){
                var filter_val_2 = JSON.stringify({
                    "RFPTaskEntriesId": actionTaskEntriesId
                });
            
                var result = callgetlist("GetRFPDetailsByRFPTaskEntriesId", filter_val_2);
                console.log({result});
                if (result.length){
                    taskVal = result[0].TaskNaturesId;
                    Description = result[0].Description;
                    hh = result[0].HoursSpent;
                    mm = result[0].MinutesSpent;
                    //
                    if (Description){
                        $("#text-area-action-2").val(Description);
                    }
                    if (hh){
                        $("#worked-hours-counter-2").val(hh);
                    }
                    if (mm){
                        $("#worked-mins-counter-2").val(mm);
                    }
                }
            }
            var resultTasks = callgetlist("GetTaskEntryRFPActivities", filter_val);
            console.log({resultTasks});

        } else if (action == 'RRM') {
            if (actionEvent != 'create'){
                var filter_val_2 = JSON.stringify({
                    "RRMTaskEntriesId": actionTaskEntriesId
                });
            
                var result = callgetlist("GetRRMDetailsByRRMTaskEntriesId", filter_val_2);
                console.log({result});
                if (result.length){
                    taskVal = result[0].TaskNaturesId;
                    Description = result[0].Description;
                    hh = result[0].HoursSpent;
                    mm = result[0].MinutesSpent;
                    //
                    if (Description){
                        $("#text-area-action-2").val(Description);
                    }
                    if (hh){
                        $("#worked-hours-counter-2").val(hh);
                    }
                    if (mm){
                        $("#worked-mins-counter-2").val(mm);
                    }
                }
            }
            var resultTasks = callgetlist("GetTaskEntryRRMActivities", filter_val);
            console.log({resultTasks});

        } else if (action == 'KT') {
            if (actionEvent != 'create'){
                var filter_val_2 = JSON.stringify({
                    "KTTaskEntriesId": actionTaskEntriesId
                });
            
                var result = callgetlist("GetKTDetailsByKTTaskEntriesId", filter_val_2);
                console.log({result});
                if (result.length){
                    Description = result[0].Description;
                    hh = result[0].HoursSpent;
                    mm = result[0].MinutesSpent;
                    //
                    if (Description){
                        $("#text-area-action-2").val(Description);
                    }
                    if (hh){
                        $("#worked-hours-counter-2").val(hh);
                    }
                    if (mm){
                        $("#worked-mins-counter-2").val(mm);
                    }
                }
            }
            var resultTasks = null;//callgetlist("GetTaskEntryKTActivities", filter_val);
            console.log({resultTasks});

        }  else if (action == 'PreSales') {
            if (actionEvent != 'create'){
                var filter_val_2 = JSON.stringify({
                    "PresalesTaskEntriesId": actionTaskEntriesId
                });
            
                var result = callgetlist("GetPresalesDetailsByPresalesTaskEntriesId", filter_val_2);
                console.log({result});
                if (result.length){
                    Description = result[0].Description;
                    hh = result[0].HoursSpent;
                    mm = result[0].MinutesSpent;
                    //
                    if (Description){
                        $("#text-area-action-2").val(Description);
                    }
                    if (hh){
                        $("#worked-hours-counter-2").val(hh);
                    }
                    if (mm){
                        $("#worked-mins-counter-2").val(mm);
                    }
                }
            }
            var resultTasks = null;//callgetlist("GetTaskEntryKTActivities", filter_val);
            console.log({resultTasks});

        }   else if (action == 'HR Support') {
            if (actionEvent != 'create'){
                var filter_val_2 = JSON.stringify({
                    "HRSupportTaskEntriesId": actionTaskEntriesId
                });
                
                var result = callgetlist("GetHRSupportDetailsByHRSupportTaskEntriesId", filter_val_2);
                console.log({result});
                if (result.length){
                    Description = result[0].Description;
                    hh = result[0].HoursSpent;
                    mm = result[0].MinutesSpent;
                    //
                    if (Description){
                        $("#text-area-action-2").val(Description);
                    }
                    if (hh){
                        $("#worked-hours-counter-2").val(hh);
                    }
                    if (mm){
                        $("#worked-mins-counter-2").val(mm);
                    }
                }
            }
            var resultTasks = null;//callgetlist("GetTaskEntryKTActivities", filter_val);
            console.log({resultTasks});

        } else if (action == 'Meetings') {
            var resultTasks = callgetlist("GetTaskEntryMeetingActivities", filter_val);
            console.log({resultTasks});
        }
       

    }

    if (phaseId){
            selectPhase_OnChange();
            if (taskVal){
                $("#selectTask").val(taskVal).trigger('change');
                select_task_OnChange();
                if (subTaskVal){
                    $("#selectSubTask").val(subTaskVal).trigger('change');
                }
            }
    } else {
        var options2 = `<option value=''>Select a Task</option>`;
       if (resultTasks){
        for (var i = 0; i < resultTasks.length; i++) {
            options2 +=
                "<option value='" + resultTasks[i].Id + "'>" + resultTasks[i].ActionItem + "</option>";
        }
       }

        $("#selectTask").html(options2);
        //
        if (taskVal){
            $("#selectTask").val(taskVal).trigger('change');
        }
    }
    //
   
    //
    $("#div-QuickActionActivity-Edit-Modal").appendTo('body').modal("show");
}

function select_task_OnChange() {
    // var ActivityId = $("#selectTask").val();
    // var ActionId = $('#save_QuickActionActivity').data('ActionId');
    // var TaskId = $('#save_QuickActionActivity').data('TaskId');
    var TaskId = $("#selectTask").val();
    //
    // resultSubTasks = [{Id:1, Name:'Sub-task 1'},{Id:2, Name:'Sub-task 2'}];
    var filter_val = JSON.stringify({
        // ActionId: ActionId,
        ProjectTaskId: TaskId,
        // ActivityId: ActivityId
    });
    var resultSubTasks = callgetlist("GetSubTasksbyTaskId", filter_val);

    var options3 = `<option value=''>Select a Sub-task</option>`;
    for (var i = 0; i < resultSubTasks.length; i++) {
        options3 +=
            "<option value='" + resultSubTasks[i].Id + "'>" + resultSubTasks[i].SubTask + "</option>";
    }

    $("#selectSubTask").html(options3).select2();
}

//===================== submit quick actions entry - edit activity dialog box ===================/
function saveQuickActionsEntry(bClose = true) {
    console.log({bClose});
    // $('#selectActivityError').html("some err msg");
    // 
    var action, actionValue, actionEvent, actionTaskEntriesId, taskEntriesId;
    if ($("#div-QuickAction-Edit-Modal").is(':visible')){
        action = $("#Action option:selected").text();
        actionValue = $("#Action").val();
    } else if ($("#div-QuickAction-Edit-Small-Modal").is(':visible')){
        // action = $("#ActionSmall option:selected").text();
        // actionValue = $("#ActionSmall").val();
        action =   $('#save_QuickActionActivity-2').data('Action');
        actionValue = $('#save_QuickActionActivity-2').data('ActionId');
    } else if ($("#div-QuickAction-Edit-Big-Modal").is(':visible')){
        // action = $("#ActionBig option:selected").text();
        // actionValue = $("#ActionBig").val();
        action =   $('#save_QuickActionActivity').data('Action');
        actionValue = $('#save_QuickActionActivity').data('ActionId');
        actionEvent = $('#save_QuickActionActivity').data('actionEvent');
        actionTaskEntriesId = $('#save_QuickActionActivity').data('actionTaskEntriesId');
        taskEntriesId = $('#save_QuickActionActivity').data('taskEntriesId');
    }
    // action =   $('#save_QuickActionActivity-2').data('Action');
    // actionValue = $('#save_QuickActionActivity-2').data('ActionId');
    console.log({action});
    console.log({actionValue});
    console.log({actionEvent});
    console.log({taskEntriesId});
    console.log({actionTaskEntriesId});
    //
    if (action == 'KT') {
       
        // console.log({HoursSpent});

        if (actionEvent == 'create' || !actionEvent){
            var Description = $("#text-area-action").val();
            var hh = $("#worked-hours-counter").val();
            var mm = $("#worked-mins-counter").val();
            var isValidated = true;
            //
            $('.error_message').html("");
            if (!Description){
                $('#descriptionError').html("Please enter valid description.");
                isValidated = false;
            }
            if (hh ==='' || hh<0 || hh>23){
                $('#workingHrsError').html("Please enter worked hours.");
                isValidated = false;
            }
            if (mm ==='' || mm<0 || mm>59){
                $('#workingHrsError').html("Please enter valid minutes.");
                isValidated = false;
            }
            //
            hh = Number(hh);
            mm = Number(mm);
            if (!hh && !mm){
                $('#workingHrsError').html("Please enter worked hours.");
                isValidated = false;
            }
            if (!isValidated){
                return;
            }
            //
            if (hh < 10) hh = '0' + hh;
            if (mm < 10) mm = '0' + mm;
            var HoursSpent = hh+':'+mm;
        var Data = {
            "TaskNatureId":actionValue,
            "Description": Description,
            "HoursSpent":HoursSpent,
            "Message": "",
            "Status": "",
            "TaskEntryDate": getFormattedTaskEntryDate()
        };
       var data = {
            "Method": "PostKTTaskEntries",
            "Data": Data
          }
          var modal =  $("#div-QuickAction-Edit-Small-Modal");
        } else {
            var Description = $("#text-area-action-2").val();
            var hh = $("#worked-hours-counter-2").val();
            var mm = $("#worked-mins-counter-2").val();
            var isValidated = true;
            //
            $('.error_message').html("");
            if (!Description){
                $('#descriptionError-modal').html("Please enter valid description.");
                isValidated = false;
            }
            if (hh ==='' || hh<0 || hh>23){
                $('#workingHrsError-modal').html("Please enter worked hours.");
                isValidated = false;
            }
            if (mm ==='' || mm<0 || mm>59){
                $('#workingHrsError-modal').html("Please enter valid minutes.");
                isValidated = false;
            }
            //
            hh = Number(hh);
            mm = Number(mm);
            if (!hh && !mm){
                $('#workingHrsError-modal').html("Please enter worked hours.");
                isValidated = false;
            }
            if (!isValidated){
                return;
            }
            //
            if (hh < 10) hh = '0' + hh;
            if (mm < 10) mm = '0' + mm;
            var HoursSpent = hh+':'+mm;
            var Data = {
                "TaskEntriesId":taskEntriesId,
                "KTTaskEntriesId":actionTaskEntriesId,
                "Description": Description,
                "HoursSpent":HoursSpent,
                "Message": "",
                "Status": "",
                "TaskEntryDate": getFormattedTaskEntryDate()
            };
           var data = {
                "Method": "UpdateKTDetailsByKTTaskEntriesId",
                "Data": Data
              }
              var modal =  $("#div-QuickActionActivity-Edit-Modal");
        }
          var postCall = PostDataCall(data);
          console.log({postCall});
        if (postCall['IsSuccess']){
            swal({
                title: "Success!",
                text:  postCall['Message'],
                icon: "success",
                button: "ok!",
              });
              modal.modal("hide");
              openActionModalStep2(action, actionEvent, actionValue);
        } else{
            swal({
            title: "Sorry!",
            text: postCall['Message'],
            icon: "error",
            });
        }
       
    } else if (action == 'PreSales'){
        if (actionEvent == 'create' || !actionEvent){
        var Description = $("#text-area-action").val();
        var hh = $("#worked-hours-counter").val();
        var mm = $("#worked-mins-counter").val();
        var isValidated = true;
        //
        $('.error_message').html("");
        if (!Description){
            $('#descriptionError').html("Please enter valid description.");
            isValidated = false;
        }
        if (hh ==='' || hh<0 || hh>23){
            $('#workingHrsError').html("Please enter valid hours.");
            isValidated = false;
        }
        if (mm ==='' || mm<0 || mm>59){
            $('#workingHrsError').html("Please enter valid minutes.");
            isValidated = false;
        }
        //
        hh = Number(hh);
        mm = Number(mm);
        if (!hh && !mm){
            $('#workingHrsError').html("Please enter worked hours.");
            isValidated = false;
        }
        if (!isValidated){
            return;
        }
        if (hh < 10) hh = '0' + hh;
        if (mm < 10) mm = '0' + mm;
        var HoursSpent = hh+':'+mm;
        // console.log({HoursSpent});
        var Data = {
            "TaskNatureId":actionValue,
            "Description": Description,
            "HoursSpent":HoursSpent,
            "Message": "",
            "Status": "",
            "TaskEntryDate": getFormattedTaskEntryDate()
        };
        var data = {
            "Method": "PostPreSalesTaskEntries",
            "Data": Data
          }
          var modal =  $("#div-QuickAction-Edit-Small-Modal");
        } else {
            var Description = $("#text-area-action-2").val();
            var hh = $("#worked-hours-counter-2").val();
            var mm = $("#worked-mins-counter-2").val();
            var isValidated = true;
            //
            $('.error_message').html("");
            if (!Description){
                $('#descriptionError-modal').html("Please enter valid description.");
                isValidated = false;
            }
            if (hh ==='' || hh<0 || hh>23){
                $('#workingHrsError-modal').html("Please enter valid hours.");
                isValidated = false;
            }
            if (mm ==='' || mm<0 || mm>59){
                $('#workingHrsError-modal').html("Please enter valid minutes.");
                isValidated = false;
            }
            //
            hh = Number(hh);
            mm = Number(mm);
            if (!hh && !mm){
                $('#workingHrsError-modal').html("Please enter worked hours.");
                isValidated = false;
            }
            if (!isValidated){
                return;
            }
            if (hh < 10) hh = '0' + hh;
            if (mm < 10) mm = '0' + mm;
            var HoursSpent = hh+':'+mm;
            // console.log({HoursSpent});
            var Data = {
                "TaskEntriesId":taskEntriesId,
                "PresalesTaskEntriesId":actionTaskEntriesId,
                "Description": Description,
                "HoursSpent":HoursSpent,
                "Message": "",
                "Status": "",
                "TaskEntryDate": getFormattedTaskEntryDate()
            };
            var data = {
                "Method": "UpdatePresalesDetailsByPresalesTaskEntriesId",
                "Data": Data
              }
              var modal =  $("#div-QuickActionActivity-Edit-Modal");
        }
          var postCall = PostDataCall(data);
          console.log({postCall});
        if (postCall['IsSuccess']){
            swal({
                title: "Success!",
                text:  postCall['Message'],
                icon: "success",
                button: "ok!",
              });
              modal.modal("hide");
              openActionModalStep2(action, actionEvent, actionValue);
        } else{
            swal({
            title: "Sorry!",
            text: postCall['Message'],
            icon: "error",
            });
        }

       
    } else if (action == 'HR Support'){
        if (actionEvent == 'create' || !actionEvent){
        var Description = $("#text-area-action").val();
        var hh = $("#worked-hours-counter").val();
        var mm = $("#worked-mins-counter").val();
        var isValidated = true;
        //
        $('.error_message').html("");
        if (!Description){
            $('#descriptionError').html("Please enter valid description.");
            isValidated = false;
        }
        if (hh ==='' || hh<0 || hh>23){
            $('#workingHrsError').html("Please enter valid hours.");
            isValidated = false;
        }
        if (mm ==='' || mm<0 || mm>59){
            $('#workingHrsError').html("Please enter valid minutes.");
            isValidated = false;
        }
        //
        hh = Number(hh);
        mm = Number(mm);
        if (!hh && !mm){
            $('#workingHrsError').html("Please enter worked hours.");
            isValidated = false;
        }
        if (!isValidated){
            return;
        }
        if (hh < 10) hh = '0' + hh;
        if (mm < 10) mm = '0' + mm;
        var HoursSpent = hh+':'+mm;
        // console.log({HoursSpent});
        var Data = {
            "TaskNatureId":actionValue,
            "Description": Description,
            "HoursSpent":HoursSpent,
            "Message": "",
            "Status": "",
            "TaskEntryDate": getFormattedTaskEntryDate()
        };
        var data = {
            "Method": "PostHRSupportTaskEntries",
            "Data": Data
          }
          var modal =  $("#div-QuickAction-Edit-Small-Modal");
        } else {
            var Description = $("#text-area-action-2").val();
            var hh = $("#worked-hours-counter-2").val();
            var mm = $("#worked-mins-counter-2").val();
            var isValidated = true;
            //
            $('.error_message').html("");
            if (!Description){
                $('#descriptionError-modal').html("Please enter valid description.");
                isValidated = false;
            }
            if (hh ==='' || hh<0 || hh>23){
                $('#workingHrsError-modal').html("Please enter valid hours.");
                isValidated = false;
            }
            if (mm ==='' || mm<0 || mm>59){
                $('#workingHrsError-modal').html("Please enter valid minutes.");
                isValidated = false;
            }
            //
            hh = Number(hh);
            mm = Number(mm);
            if (!hh && !mm){
                $('#workingHrsError-modal').html("Please enter worked hours.");
                isValidated = false;
            }
            if (!isValidated){
                return;
            }
            if (hh < 10) hh = '0' + hh;
            if (mm < 10) mm = '0' + mm;
            var HoursSpent = hh+':'+mm;
            // console.log({HoursSpent});
            var Data = {
                "TaskEntriesId":taskEntriesId,
                "HRSupportTaskEntriesId":actionTaskEntriesId,
                "Description": Description,
                "HoursSpent":HoursSpent,
                "Message": "",
                "Status": "",
                "TaskEntryDate": getFormattedTaskEntryDate()
            };
            var data = {
                "Method": "UpdateHRSupportDetailsByHRSupportTaskEntriesId",
                "Data": Data
              }
              var modal =  $("#div-QuickActionActivity-Edit-Modal");
        }
          var postCall = PostDataCall(data);
          console.log({postCall});
        if (postCall['IsSuccess']){
            swal({
                title: "Success!",
                text:  postCall['Message'],
                icon: "success",
                button: "ok!",
              });
              modal.modal("hide");
              openActionModalStep2(action, actionEvent, actionValue);
        } else{
            swal({
            title: "Sorry!",
            text: postCall['Message'],
            icon: "error",
            });
        }

       
    } else if (action=='Projects'){
        var phaseVal = $('#selectPhase').val();
        var taskVal = $('#selectTask').val();
        var Description = $("#text-area-action-2").val();
        var hh = $("#worked-hours-counter-2").val();
        var mm = $("#worked-mins-counter-2").val();
        var completionOfPercentage = Number($("#completion-percentage").val());
        var isValidated = true;
        //
        $('.error_message').html("");
        if (!phaseVal){
            $('#phaseError-modal').html("Please select a phase.");
            isValidated = false;
        }
        if (!taskVal){
            $('#taskError-modal').html("Please select a task.");
            isValidated = false;
        }
        if (!Description){
            $('#descriptionError-modal').html("Please enter valid description.");
            isValidated = false;
        }
        if (hh ==='' || hh<0 || hh>23){
            $('#workingHrsError-modal').html("Please enter valid hours.");
            isValidated = false;
        }
        if (mm ==='' || mm<0 || mm>59){
            $('#workingHrsError-modal').html("Please enter valid minutes.");
            isValidated = false;
        }
        if (!completionOfPercentage){
            $('#completionError-modal').html("Please enter completion percentage.");
            isValidated = false;
        }
        //
        hh = Number(hh);
        mm = Number(mm);
        if (!hh && !mm){
            $('#workingHrsError-modal').html("Please enter worked hours.");
            isValidated = false;
        }
        if (!isValidated){
            return;
        }
        if (hh < 10) hh = '0' + hh;
        if (mm < 10) mm = '0' + mm;
        var HoursSpent = hh+':'+mm;
        // console.log({HoursSpent});
        // console.log({completionOfPercentage});

        //
        // 
        if (actionEvent == 'create'){
            var Data = {
                "ProjectTaskId": taskVal,
                "ProjectSubTaskId":$('#selectSubTask').val(),
                "Description": Description,
                "HoursSpent":HoursSpent,
                "PercentageofCompletion": completionOfPercentage,
                "Message": "",
                "Status": "",
                "TaskEntryDate": getFormattedTaskEntryDate()
            };
            var data = {
                "Method": "PostProjectTaskEntries",
                "Data": Data
              }
        } else {
            var Data = {
                "TaskEntriesId": taskEntriesId,
                "ProjectTaskId": taskVal,
                "ProjectSubTaskId":$('#selectSubTask').val(),
                "Description": Description,
                "HoursSpent":HoursSpent,
                "PercentageofCompletion": completionOfPercentage,
                "ProjectsTaskEntriesId": actionTaskEntriesId,
                "Message": "",
                "Status": "",
                "TaskEntryDate": getFormattedTaskEntryDate()
            };
            var data = {
                "Method": "UpdateProjectDetailsByProjectsTaskEntriesId",
                "Data": Data
              }
        }
       
          var postCall = PostDataCall(data);
          console.log({postCall});
        if (postCall['IsSuccess']){
            swal({
                title: "Success!",
                text:  postCall['Message'],
                icon: "success",
                button: "ok!",
              });
              if (bClose){
                $("#div-QuickActionActivity-Edit-Modal").modal("hide");
              } else {
                $("#text-area-action-2").val('');
                $("#worked-hours-counter-2").val('0');
                $("#worked-mins-counter-2").val('0');
                $("#completion-percentage").val('0');
                $("#selectSubTask").val('');
              }
              openActionModalStep2(action, actionEvent, actionValue);
        } else{
            swal({
            title: "Sorry!",
            text: postCall['Message'],
            icon: "error",
            });
        }
        
    } else if (action=='RFP'){
        var taskVal = $('#selectTask').val();
        var Description = $("#text-area-action-2").val();
        var hh = $("#worked-hours-counter-2").val();
        var mm = $("#worked-mins-counter-2").val();
        var isValidated = true;
        //
        $('.error_message').html("");
        if (!taskVal){
            $('#taskError-modal').html("Please select a task.");
            isValidated = false;
        }
        if (!Description){
            $('#descriptionError-modal').html("Please enter valid description.");
            isValidated = false;
        }
        if (hh ==='' || hh<0 || hh>23){
            $('#workingHrsError-modal').html("Please enter valid hours.");
            isValidated = false;
        }
        if (mm ==='' || mm<0 || mm>59){
            $('#workingHrsError-modal').html("Please enter valid minutes.");
            isValidated = false;
        }
        //
        hh = Number(hh);
        mm = Number(mm);
        if (!hh && !mm){
            $('#workingHrsError-modal').html("Please enter worked hours.");
            isValidated = false;
        }
        if (!isValidated){
            return;
        }
        if (hh < 10) hh = '0' + hh;
        if (mm < 10) mm = '0' + mm;
        var HoursSpent = hh+':'+mm;
        // console.log({HoursSpent});
       
          if (actionEvent == 'create'){
            var Data = {
                "RequestForProposalId": $('#save_QuickActionActivity').data('TaskId'),
                "TaskNatureId":taskVal,
                "Description": Description,
                "HoursSpent":HoursSpent,
                "Message": "",
                "Status": "",
                "TaskEntryDate": getFormattedTaskEntryDate()
            };
            var data = {
                "Method": "PostRFPTaskEntries",
                "Data": Data
              }
        } else {
            var Data = {
                "TaskEntriesId": taskEntriesId,
                "TaskNatureId": taskVal,
                "Description": Description,
                "HoursSpent":HoursSpent,
                "RFPTaskEntriesId": actionTaskEntriesId,
                "Message": "",
                "Status": "",
                "TaskEntryDate": getFormattedTaskEntryDate()
            };
            var data = {
                "Method": "UpdateRFPDetailsByRFPTaskEntriesId",
                "Data": Data
              }
        }

          var postCall = PostDataCall(data);
          console.log({postCall});
        if (postCall['IsSuccess']){
            swal({
                title: "Success!",
                text:  postCall['Message'],
                icon: "success",
                button: "ok!",
              });
              $("#div-QuickActionActivity-Edit-Modal").modal("hide");
              openActionModalStep2(action, actionEvent, actionValue);
        } else{
            swal({
            title: "Sorry!",
            text: postCall['Message'],
            icon: "error",
            });
        }
        
    } else if (action=='Meetings'){
        var taskVal = $('#selectTask').val();
        var Description = $("#text-area-action-2").val();
        var hh = $("#worked-hours-counter-2").val();
        var mm = $("#worked-mins-counter-2").val();
        var isValidated = true;
         //
         $('.error_message').html("");
         if (!taskVal){
             $('#taskError-modal').html("Please select a task.");
             isValidated = false;
         }
         if (!Description){
             $('#descriptionError-modal').html("Please enter valid description.");
             isValidated = false;
         }
         if (hh ==='' || hh<0 || hh>23){
             $('#workingHrsError-modal').html("Please enter valid hours.");
             isValidated = false;
         }
         if (mm ==='' || mm<0 || mm>59){
             $('#workingHrsError-modal').html("Please enter valid minutes.");
             isValidated = false;
         }
         //
        hh = Number(hh);
        mm = Number(mm);
        if (!hh && !mm){
            $('#workingHrsError-modal').html("Please enter worked hours.");
            isValidated = false;
        }
        if (!isValidated){
            return;
        }
        if (hh < 10) hh = '0' + hh;
        if (mm < 10) mm = '0' + mm;
        var HoursSpent = hh+':'+mm;
        // console.log({HoursSpent});
        var Data = {
            "MeetingsId": $('#save_QuickActionActivity').data('TaskId'),
            "TaskNatureId":actionValue,
            "Description": Description,
            "HoursSpent":HoursSpent,
            "Message": "",
            "Status": ""
        };
        var data = {
            "Method": "PostMeetingsTaskEntries",
            "Data": Data
          }
          var postCall = PostDataCall(data);
          console.log({postCall});
        if (postCall['IsSuccess']){
            swal({
                title: "Success!",
                text:  postCall['Message'],
                icon: "success",
                button: "ok!",
              });
              $("#div-QuickActionActivity-Edit-Modal").modal("hide");
              openActionModalStep2(action, actionEvent, actionValue);
        } else{
            swal({
            title: "Sorry!",
            text: postCall['Message'],
            icon: "error",
            });
        }
       
    } else if (action=='RRM'){
        var taskVal = $('#selectTask').val();
        var Description = $("#text-area-action-2").val();
        var hh = $("#worked-hours-counter-2").val();
        var mm = $("#worked-mins-counter-2").val();
        var isValidated = true;
        //
        $('.error_message').html("");
        if (!taskVal){
            $('#taskError-modal').html("Please select a task.");
            isValidated = false;
        }
        if (!Description){
            $('#descriptionError-modal').html("Please enter valid description.");
            isValidated = false;
        }
        if (hh ==='' || hh<0 || hh>23){
            $('#workingHrsError-modal').html("Please enter valid hours.");
            isValidated = false;
        }
        if (mm ==='' || mm<0 || mm>59){
            $('#workingHrsError-modal').html("Please enter valid minutes.");
            isValidated = false;
        }
        //
        hh = Number(hh);
        mm = Number(mm);
        if (!hh && !mm){
            $('#workingHrsError-modal').html("Please enter worked hours.");
            isValidated = false;
        }
        if (!isValidated){
            return;
        }
        if (hh < 10) hh = '0' + hh;
        if (mm < 10) mm = '0' + mm;
        var HoursSpent = hh+':'+mm;
        // console.log({HoursSpent});
       
          if (actionEvent == 'create'){
            var Data = {
                "ResourceRequirementId": $('#save_QuickActionActivity').data('TaskId'),
                "TaskNatureId":taskVal,
                "Description": Description,
                "HoursSpent":HoursSpent,
                "Message": "",
                "Status": "",
                "TaskEntryDate": getFormattedTaskEntryDate()
            };
            var data = {
                "Method": "PostRRMTaskEntries",
                "Data": Data
              }
        } else {
            var Data = {
                "TaskEntriesId": taskEntriesId,
                "TaskNatureId": taskVal,
                "Description": Description,
                "HoursSpent":HoursSpent,
                "RRMTaskEntriesId": actionTaskEntriesId,
                "Message": "",
                "Status": "",
                "TaskEntryDate": getFormattedTaskEntryDate()
            };
            var data = {
                "Method": "UpdateRRMDetailsByRRMTaskEntriesId",
                "Data": Data
              }
        }

          var postCall = PostDataCall(data);
          console.log({postCall});
        if (postCall['IsSuccess']){
            swal({
                title: "Success!",
                text:  postCall['Message'],
                icon: "success",
                button: "ok!",
              });
              $("#div-QuickActionActivity-Edit-Modal").modal("hide");
              openActionModalStep2(action, actionEvent, actionValue);
        } else{
            swal({
            title: "Sorry!",
            text: postCall['Message'],
            icon: "error",
            });
        }
       
    }
    refreshQuickActionTasks();
}

// ========================== Clear form values Start ============================ /
$(".btn-danger, button.close").click(function () {
    $(this).closest('form').
        find("input[type=text], input[type=date], input[type=time], input[type=number], textarea").val("");
    $("#Action").val("");
    $("#interviewrrmdes, #interviewrrmDetails, .rfp_description").html('')
    edit_action_OnChange();
    $(".flie_dwn").addClass("hidden");
    $("#commentsDiv").addClass("hidden");
    $("#form-btn").addClass("hidden");
});

$("#Action").change(function () {
    if ($(this).val() == '') {
        $(this).closest('form').
            find("input[type=text], input[type=date], input[type=time], input[type=number], textarea").val("");
        $("#Action").val("");
        $("#interviewrrmdes, #interviewrrmDetails, .rfp_description").html('')
        edit_action_OnChange();
        $(".flie_dwn").addClass("hidden");
        $("#commentsDiv").addClass("hidden");
        $("#form-btn").addClass("hidden");
    } else {
        $("#commentsDiv").removeClass("hidden");
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

function AddPostData() {
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
    var Action = $('#Action').val();

    // ========================== Submit post Data ============================ /

    if (Action == 'projects') {
        // 1-> Projects
        AddPostDataProjects();
    } else if (Action == 'rfp_handling') {
        // 2-> RFP
        AddPostDataRfpHandling();
    } else if (Action == 'meeting') {
        // 3-> Meeting
        AddPostDataMeeting();
    } else if (Action == 'interviews') {
        // 4-> Interviews
        AddPostDataInterview();
    } else if (Action == 'resource_management') {
        // 5-> ResourceManagement
        AddPostDataResourceMag();
    } else if (Action == "support_to_marketing_team") {
        // 6-> SupportToMarketingTeam
        AddPostDataSupportMkt();
    } else if (Action == 'support_to_hr_team') {
        // 7-> SupportToHRTeam
        AddPostDataSupportHr();
    }
}

// ========================== Submit post Data ============================ //

//========================== Action Modal button click function 445 ============================ //
$('.close').click(function () {
    $(".actionChartSidebar").addClass("hidden");
    $('#sucess-response').html('');
    $("#sddgd-actionitems").hide();
});
//========================== Action Modal button click function 445 ============================ //
$('#div-QuickAction-Edit-Modal').on('hidden.bs.modal', function () {
    $('#Project-edit').removeClass("redClass");
    $('#Task-edit').removeClass("redClass");
    $('#ActualHours').removeClass("redClass");
    $('#BillableHours').removeClass("redClass");
});


function addTask() {
    // var action = $("#Action option:selected").text();
    // if (action == 'Projects'){
    //     $("#div_selectPhase").show();
    //     var ProjectId = $('#save_QuickActionActivity').data('TaskId');
    //     var filter_val = JSON.stringify({
    //         "ProjectId": ProjectId
    //     });
    
    //     var result = callgetlist("GetProjectPhasesbyProjectId", filter_val);
    //     console.log({result});
    //     var options = `<option value=''>Select a Phase</option>`;
    //         for (var i = 0; i < result.length; i++) {
    //             options +=
    //                 "<option value='" + result[i].Id + "'>" + result[i].Phases + "</option>";
    //         }
    
    //         $("#selectPhase").html(options);
    // } else {
    //     $("#div_selectPhase").hide();
    // }
    var phaseVal = $('#selectPhase').val();
    if (!phaseVal){
        $('#phaseError-modal').html("Please select a phase.");
        return;
    }
    $("#addTaskTitle").val('');
    $("#addTaskDesc").val('');
    $('.error_message').html("");
    //
   
    //
    $("#addTask_Modal").appendTo('body').modal("show");
}

function selectPhase_OnChange(){
    var ProjectId = $('#save_QuickActionActivity').data('TaskId');
    var PhaseId = $('#selectPhase').val();

    var filter_val = JSON.stringify({
        "ProjectId": ProjectId,
        "PhaseId": PhaseId
    });

    var result = callgetlist("GetTasksbyProjectId", filter_val);
    console.log({result});
    var options = `<option value=''>Select a Task</option>`;
        for (var i = 0; i < result.length; i++) {
            options +=
                "<option value='" + result[i].ProjectTaskId + "'>" + result[i].ProjectFeature + "</option>";
        }

        $("#selectTask").html(options).select2();
        var options = `<option value=''>Select a Sub-task</option>`;
        // for (var i = 0; i < result.length; i++) {
        //     options +=
        //         "<option value='" + result[i].Id + "'>" + result[i].Phases + "</option>";
        // }

        $("#selectSubTask").html(options);
        // var result = callgetlist("GetProjectPhasesbyProjectId", filter_val);
        // console.log({result});
        // var options = `<option value=''>Select a Phase</option>`;
        //     for (var i = 0; i < result.length; i++) {
        //         options +=
        //             "<option value='" + result[i].Id + "'>" + result[i].Phases + "</option>";
        //     }
    
        //     $("#selectPhase").html(options);
}


function saveTaskDetails() {

    var ActionId = $('#save_QuickActionActivity').data('ActionId');
    var ProjectPhaseId = $('#selectPhase').val();
        //var TaskId = $("#selectTask").val();
    //var Data = $("#addTaskDesc").val();
    // var Data = {
    // Feature:$("#addTaskTitle").val(),
    // SubFeature:$("#addTaddTaskDesc").val()
    // };
    var taskTitle = $("#addTaskTitle").val();
    var taskDesc = $("#addTaskDesc").val();
    //
    $('.error_message').html("");
    if (!taskTitle){
        $('#taskTitleError').html("Please enter a title.");
        return;
    }
    if (!taskDesc){
        $('#taskDescError').html("Please enter a description.");
        return;
    }
    //
    var Data = {
        "ActionId": ActionId,
        "ProjectPhaseId":ProjectPhaseId,
        "Data": taskTitle,
        "Message": "",
        "Status": ""
    };
    var data = {
        "Method": "PostTaskEntry",
        "Data": Data
      }
      var postCall = PostDataCall(data);
      console.log({postCall});
    if (postCall['IsSuccess']){
        swal({
            title: "Success!",
            text:  postCall['Message'],
            icon: "success",
            button: "ok!",
          });
          selectPhase_OnChange();
          $("#addTask_Modal").modal("hide");
    } else{
        swal({
        title: "Sorry!",
        text: postCall['Message'],
        icon: "error",
        });
    }

   
}

function addSubTask() {
    $('.error_message').html("");
    var phaseVal = $('#selectPhase').val();
    if (!phaseVal){
        $('#phaseError-modal').html("Please select a phase.");
        // return;
    }
    var taskVal = $('#selectTask').val();
    if (!taskVal){
        $('#taskError-modal').html("Please select a task.");
        return;
    }
    $("#addSubTaskTitle").val('');
    $("#addSubTaskDesc").val('');
    $('.error_message').html("");
    $("#addSubTask_Modal").appendTo('body').modal("show");
}

function saveSubTaskDetails() {
    // var ActionId = $('#save_QuickActionActivity').data('ActionId');
    // var TaskId = $("#selectTask").val();
    var TaskId = $("#selectTask").val();
    var SubTask = $("#addSubTaskTitle").val();
    var SubTaskDetails = $("#addSubTaskDesc").val();
    //
    $('.error_message').html("");
    if (!SubTask){
        $('#subTaskTitleError').html("Please enter a title.");
        return;
    }
    if (!SubTaskDetails){
        $('#subTaskDescError').html("Please enter a description.");
        return;
    }
    //
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
      console.log({postCall});
    if (postCall['IsSuccess']){
        swal({
            title: "Success!",
            text:  postCall['Message'],
            icon: "success",
            button: "ok!",
          });
          select_task_OnChange();
          $("#addSubTask_Modal").modal("hide");
    } else{
        swal({
        title: "Sorry!",
        text: postCall['Message'],
        icon: "error",
        });
    }

   
}
//
function refreshQuickActionTasks(level = null){
    if (level){
        var filter_val = JSON.stringify({});
        var result = callgetlist("GetDateNow", filter_val);
        console.log({result});
    
        let maxDate = result[0][''];
        if (!maxDate){
            maxDate = getMaxTaskEntryDate();
        } else {
            maxDate = new Date(maxDate);
        }
        if (!maxDate) maxDate = getMaxTaskEntryDate();
        let dxQuickActionDate =  $("#quickActionDate").dxDateBox("instance");
        if (!dxQuickActionDate){
            dxQuickActionDate = $("#quickActionDate").dxDateBox({
                placeholder: "Enter Date",   
                type: "date",
                value: getMaxTaskEntryDate(),
                showClearButton: true,    
                dateSerializationFormat:"yyyy-MM-dd",
                max: getMaxTaskEntryDate(),
                displayFormat: 'dd MMM yyyy',
                showClearButton: false,
                onValueChanged(data) {
                    refreshQuickActionTasks();
                },
                // onFocusIn(e){
                //     console.log({e});
                //     $("#quickActionDate").dxDateBox("instance").option('max', getMaxTaskEntryDate());
                //     $("#quickActionDate").dxDateBox("instance").option('value', getMaxTaskEntryDate());
                // }
              }).dxDateBox("instance");
        }
        if (level >= 1){
            // console.log ('level 1 update');
            dxQuickActionDate.option('max', maxDate);
            if (level >= 2){
                // console.log ('level 2 update');
                dxQuickActionDate.option('value', maxDate);
            }
        }
        
    }
    //
    var localget = localStorage.getItem("UserCheckRes");
    var jsonData = JSON.parse(localget);
    EmployeeId = jsonData.Data["0"].EmployeeID;
    console.log({EmployeeId});
    var filter_val = JSON.stringify({
        EmployeeID: EmployeeId,
        Date: getFormattedTaskEntryDate()
    });
    var result = callgetlist("GetEmployeeSwipeHours", filter_val);
    console.log({result});
    if (result.length){
        if (!result[0].PunchIN) result[0].PunchIN = '00:00';
        $('#punchedInHrs').text(result[0].PunchIN.substring(0,5));
    }
    //
    var filter_val = JSON.stringify({
        TaskEntryDate: getFormattedTaskEntryDate()
    });
    var result = callgetlist("GetMyTodaysTask", filter_val);
    console.log({result});
    if (result.length){
        $('#loggedHrs').text(result[result.length-1].Hours)
    }
    
    var thisHtml = '';
    for (let i=0; i<result.length; i++){
        thisHtml += '<tr>';
        if (i == result.length - 1){
            thisHtml+= '<td><strong>' + result[i].TaskTypes + '</strong></td>';
            // thisHtml+= '<td><strong>' + 'text' + '</strong></td>';
            thisHtml+= '<td style="text-align:center;"><strong>' + result[i].Hours + '</strong></td>';
            thisHtml+= '<td style="text-align:center;"><strong>' + result[i].Hours + '</strong></td>';
            thisHtml+= '<td>' + '' + '</td>';
        } else {
            thisHtml+= '<td>' + result[i].TaskTypes + '</td>';
            // thisHtml+= '<td>' + 'text' + '</td>';
            thisHtml+= '<td style="text-align:center;">' + result[i].Hours + '</td>';
            thisHtml+= '<td style="text-align:center;">' + result[i].Hours + '</td>';
            //
            thisHtml+= '<td>';
            // thisHtml+= `<button class='btn btn-xs btn-primary edit-btn' onclick='editQuickAction("${result[i].TaskTypes}")'><i class='fas fa-pencil-alt'></i></button>`;
            thisHtml+= `<button class='btn btn-xs btn-primary action-btn' onclick='openActionModal("${result[i].TaskTypes}", "edit")'><i class='glyphicon glyphicon glyphicon-list'></i></button>`;
            // thisHtml+= `<button class='btn btn-xs btn-primary edit-btn' onclick='deleteQuickAction("${result[i].TaskTypes}")'><i class='fas fa fa-trash'></i></button>`;
            thisHtml+= '</td>';
        }
        thisHtml += '</tr>';
    }
    console.log({thisHtml});
    $('#quickActionsData').html(thisHtml);
}
//
// function editQuickAction(taskType){
// // console.log ('edit', taskType);
// openActionModal(taskType, 'edit');
// }
//
// function viewQuickAction(taskType){
//     // console.log ('view', taskType);
//     openActionModal(taskType, 'view');
// }
//
// function deleteQuickAction(taskType){
//     // console.log ('delete', taskType);
//     openActionModal(taskType, 'delete');
// }
//
function deleteTaskEntriesId(action, ActionId, TaskId, actionEvent, taskEntriesId, actionTaskEntriesId){
        console.log({action});
        console.log({ActionId});
    console.log({TaskId});
    console.log({actionEvent});
    console.log({taskEntriesId});
    console.log({actionTaskEntriesId});

    swal({
        title: "Delete",
        text: "Are you sure, Do you want to delete the Entry?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            if (action == 'Projects'){
                var Data = {
                    "TaskEntriesId": taskEntriesId,
                    "ProjectsTaskEntriesId ": actionTaskEntriesId,
                    "Message": "",
                    "Status": ""
                };
                var data = {
                    "Method": "DeleteProjectDetailsByProjectsTaskEntriesId",
                    "Data": Data
                  }
            } else if (action == 'RFP'){
                var Data = {
                    "TaskEntriesId": taskEntriesId,
                    "RFPTaskEntriesId ": actionTaskEntriesId,
                    "Message": "",
                    "Status": ""
                };
                var data = {
                    "Method": "DeleteRFPDetailsByRFPTaskEntriesId",
                    "Data": Data
                  }
            } else if (action == 'RRM'){
                var Data = {
                    "TaskEntriesId": taskEntriesId,
                    "RRMTaskEntriesId ": actionTaskEntriesId,
                    "Message": "",
                    "Status": ""
                };
                var data = {
                    "Method": "DeleteRRMDetailsByRRMTaskEntriesId",
                    "Data": Data
                  }
            } else if (action == 'KT'){
                var Data = {
                    "TaskEntriesId": taskEntriesId,
                    "KTTaskEntriesId ": actionTaskEntriesId,
                    "Message": "",
                    "Status": ""
                };
                var data = {
                    "Method": "DeleteKTDetailsByKTTaskEntriesId",
                    "Data": Data
                  }
            } else if (action == 'PreSales'){
                var Data = {
                    "TaskEntriesId": taskEntriesId,
                    "PresalesTaskEntriesId ": actionTaskEntriesId,
                    "Message": "",
                    "Status": ""
                };
                var data = {
                    "Method": "DeletePresalesDetailsByPresalesTaskEntriesId",
                    "Data": Data
                  }
            } else if (action == 'HR Support'){
                var Data = {
                    "TaskEntriesId": taskEntriesId,
                    "HRSupportTaskEntriesId ": actionTaskEntriesId,
                    "Message": "",
                    "Status": ""
                };
                var data = {
                    "Method": "DeleteHRSupportDetailsByHRSupportTaskEntriesId",
                    "Data": Data
                  }
            }
            
              var postCall = PostDataCall(data);
              console.log({postCall});
        
            // var filter_val = JSON.stringify({
            //     "TaskEntriesId": taskEntriesId,
            //     "ProjectsTaskEntriesId ": actionTaskEntriesId,
            //     "Message": "",
            //     "Status": ""
            // });
        
            // var result = callgetlist("DeleteProjectDetailsByProjectsTaskEntriesId", filter_val);
            // console.log({result});
            //
            if (postCall['IsSuccess']){
                swal({
                    title: "Success!",
                    text:  postCall['Message'],
                    icon: "success",
                    button: "ok!",
                  });
            } else{
                swal({
                title: "Sorry!",
                text: postCall['Message'],
                icon: "error",
                });
            }
            //
            openActionModalStep2(action, actionEvent, ActionId);
            refreshQuickActionTasks();
          }
        });
}
//
//
function getFormattedTaskEntryDate(dt=null){
    if (!dt) dt = new Date($("#quickActionDate").dxDateBox("instance").option('value'));
    yr = dt.getFullYear();
    mn = dt.getMonth() + 1;
    mn = mn > 9 ? mn : '0' + mn;
    dy = dt.getDate();
    dy = dy > 9 ? dy : '0' + dy;
    return yr + '-' + mn + '-' + dy;
}
//
function getMaxTaskEntryDate(){
    let dt = new Date();
    dt.setHours(6, 0, 0, 0);
    if (new Date() < dt) dt.setDate(dt.getDate() - 1);
    return dt;
}
//
setTimeout(()=>{
    let m = $("#quickActionDate").dxDateBox({
        placeholder: "Enter Date",   
        type: "date",
        value: getMaxTaskEntryDate(),
        showClearButton: true,    
        dateSerializationFormat:"yyyy-MM-dd",
        max: getMaxTaskEntryDate(),
        displayFormat: 'dd MMM yyyy',
        showClearButton: false,
        onValueChanged(data) {
            refreshQuickActionTasks();
        },
        // onFocusIn(e){
        //     console.log({e});
        //     $("#quickActionDate").dxDateBox("instance").option('max', getMaxTaskEntryDate());
        //     $("#quickActionDate").dxDateBox("instance").option('value', getMaxTaskEntryDate());
        // }
      }).dxDateBox("instance");
      refreshQuickActionTasks(2);
}, 1000);
//formatString: 'dd MMM yyyy' 
// $("#quickActionDate").dxDateBox("instance").option('value', null); 
//

