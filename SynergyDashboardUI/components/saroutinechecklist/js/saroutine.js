$(document).ready(function () {

    getTaskList();

    $('#CheckListsaveBtn').click(function () {

        var getTaskStatus = $("input[name='statusoption']:checked").val();
        // To check, if the Status is checked or not
        var getTaskStatusLength = $("input[name='statusoption']:checked").length;

        var getRemarksContent = $("#checklistremarks").dxHtmlEditor("instance").option('value')
        var getTaskID = $('#taskId').val();
        let getIndexValue = window.getDataFrmResSA.findIndex(function (res) {
            return res.id == getTaskID
        })
        let sendData = {
            SATaskId: getTaskID,
            TaskStatus: getTaskStatus,
            Remarks: getRemarksContent,
            Status: (getTaskStatus == 'Missed') ? 'M' : (getTaskStatus == 'Executed') ? 'E' : 'S'
        }

        let postData = {
            "Method": "PostSATaskProgress",
            "Data": sendData
        }

        if (getTaskStatusLength == 0) {
            $("#statusoption_error").html("Please Choose The Status");
            return false;
        }

        var postCall = PostDataCall(postData);
        if (postCall['IsSuccess'] == true) {
            $('#SARoutinemodelChecklist').modal('hide');
            window.getDataFrmResSA.splice(getIndexValue, 1);
            getTaskList();
            $("#sddgd-saroutinechecklist").dxDataGrid("instance").refresh();
            swal({
                title: "Success!",
                text: 'SA TASk has been successfully updated',
                icon: "success",
                button: "ok!",
            })
        }
        else {

        }


    })
})

function openSAroutineCheckListModels(key) {
    let getContent = window.getDataFrmResSA[key];
    console.log(getContent)
    var dateFmt = getContent.due_date_time
    $("#SARoutinemodelChecklist").appendTo("body").modal("show");

    $('#sataskTitle').html(dateFmt + ' | ' + getContent.task)
    $('#taskId').val(getContent.id);
    $('#instructions').html(getContent.instruction);

    var saOptionExcutedRadioBtn = document.getElementById("saOptionExcuted");
    var saOptionSkippedRadioBtn = document.getElementById("saOptionSkipped");
    saOptionExcutedRadioBtn.checked = false;
    saOptionSkippedRadioBtn.checked = false;

    $("#statusoption_error").html("");

    var editor = $("#checklistremarks").dxHtmlEditor({
        height: 394,
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

    $("#checklistremarks").dxHtmlEditor("instance").option('value', getContent.remarks);
}

function renderSARoutineGrid(data) {
    var SARoutineDataGrid = $("#sddgd-saroutinechecklist")
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
            // selection: {
            //   mode: "multiple",
            // },
            onToolbarPreparing: function (e) {
                var dataGrid = e.component;
                e.toolbarOptions.items.unshift({
                    location: "after",
                    widget: "dxButton",
                    options: {
                        icon: "refresh",
                        onClick: function () {
                            getTaskList();
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
                    dataField: "due_date_time",
                },
                {
                    caption: "Task",
                    dataField: "task",
                },
                {
                    caption: "Instruction",
                    dataField: "instruction",
                    visible: false,
                },
                {
                    caption: "Instructions",
                    dataField: "disp_instruction",
                },
                {
                    caption: "Created By",
                    dataField: "created_by",
                },
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
                        var dataKey = options.data["key"];
                        var domActions = "";
                        domActions +=
                            "<button class='btn btn-xs btn-primary edit-btn' onclick=openSAroutineCheckListModels('" + dataKey + "')><i class='fas fa-pencil-alt'></i></button>";
                        $("<div class='text-center'>")
                            .append($(domActions))
                            .appendTo(container);
                    },
                },
            ],
        })
        .dxDataGrid("instance");
}

//  function getTaskList(){

//   window.getDataFrmResSA='';
//   var getSARoutines = callgetlist('GetSATasks');
//   if(getSARoutines.length > 0){
//     window.getDataFrmResSA = getSARoutines.map( function(res,key) {
//       var dateFmt = new Date(res.StatusDateTime) 
//       var month = dateFmt.getMonth()+1;
//       var timeString = dateFmt.getHours()+':'+dateFmt.getMinutes()+':'+dateFmt.getSeconds()
//       var timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
//     .toLocaleTimeString({},
//       {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
//     );

//       var instruction = res.Instruction = removeTags(res.Instruction);

//       var duDate = dateFmt.getDate()+'-'+month+'-'+dateFmt.getFullYear()+' '+timeString12hr;
//         return {'sno':key+1,'due_date_time':duDate,'task':res.Task,'instruction':instruction,'remarks':res.Remarks,'key':key,'id':res.Id}
//       })

//   }

//     //var getSARoutine =[{'sno':"1",'due_date_time':"11-09-2020 10:00",'task':"take email backup",'instruction':"some instruction"},{'sno':"2",'due_date_time':"11-09-2020 10:30",'task':"take backup",'instruction':"some instruction"}];
//     renderSARoutineGrid(window.getDataFrmResSA);

//  }

function getTaskList() {

    window.getDataFrmResSA = '';
    var getSARoutines = callgetlist('GetSATasks');

    if (getSARoutines.length > 0) {
        window.getDataFrmResSA = getSARoutines.map(function (res, key) {

            if (res.DateTime == "1900-01-01T00:00:00" || res.DateTime == null) {
                var duDate = "No End Date";
            }
            else {
                var duDate = res.DateTime;
            }


            var instruction = res.Instruction;
            var dispInstruction = res.Instruction = removeTags(res.Instruction);
            var createdBy = res.CreatedBy;
            return { 'sno': key + 1, 'due_date_time': duDate, 'task': res.Task, 'instruction': instruction, 'disp_instruction': dispInstruction, 'created_by': createdBy, 'remarks': res.Remarks, 'key': key, 'id': res.Id }
        })

    }

    //var getSARoutine =[{'sno':"1",'due_date_time':"11-09-2020 10:00",'task':"take email backup",'instruction':"some instruction"},{'sno':"2",'due_date_time':"11-09-2020 10:30",'task':"take backup",'instruction':"some instruction"}];
    renderSARoutineGrid(window.getDataFrmResSA);

}


function removeTags(str) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
}