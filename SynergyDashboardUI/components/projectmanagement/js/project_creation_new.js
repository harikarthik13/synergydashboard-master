$('#resource_smartwizard').smartWizard({
        showStepURLhash: false,
        keyNavigation: false,
        anchorSettings: {
            anchorClickable: false,
        },
        toolbarSettings: {
            toolbarExtraButtons: [
                $('<button></button>').text('Preview')
                .addClass('btn btn-info previewButton hidden-btn')
                .attr('id', 'preview_btn')
                .on('click', function() {
                    openRfpPdf();
                }),

                $('<button></button>').text('Finish')
                .addClass('btn btn-success finishButton hidden-btn')
                .on('click', function() {
                    if (AddAssign()) {
                        var localStorageProposalId = localStorage.getItem('ProposalId');
                        var SetProposalId = "";
                        if (localStorageProposalId != "") {
                            SetProposalId = localStorageProposalId;
                        }

                        PostProposalStakeholders(SetProposalId, 0);
                        alert("Request for proposal details updated successfully");
                        $("#ResourceModal .close").click();
                    }
                })
            ]
        }
    });

    $("#resource_smartwizard").on("showStep", function(e, anchorObject, stepNumber, stepDirection) {
        if (stepNumber == 2) {
            $('.finishButton').removeClass('hidden-btn');
            $('.sw-btn-next').addClass('hidden-btn');

            $('.previewButton').removeClass('hidden-btn');
        } else {
            $('.finishButton').addClass('hidden-btn');
            $('.sw-btn-next').removeClass('hidden-btn');
            $('.previewButton').addClass('hidden-btn');
        }
    });

    $("#resource_smartwizard").on("leaveStep", function(e, anchorObject, stepNumber, stepDirection, stepPosition) {
        // get proposal id from local storage
        var localStorageProposalId = localStorage.getItem('ProposalId');
        var SetProposalId = "";
        if (localStorageProposalId != "") {
            SetProposalId = localStorageProposalId;
        }

        // if user clicks on edit button , here we handling the condition //
        var editEnable = $('.edit_enable').val();
        if (editEnable == 1 && stepDirection == "forward") {
            $('.edit_enable').val(0);
            smartwizstep = $('.smartwizstep').val();
            RfpStepCallAction(Number(smartwizstep), SetProposalId);
            return true;
        } else {
            var currentStep = stepNumber + 1;
            if (stepDirection == "forward") {
                switch (stepNumber) {
                    case 0:
                      
                        return true;
                        break;

                    case 1:
                        return true;
                        break;

                    case 2:
                     
                        return true;
                        break;

                    case 3:
                       
                        return true;
                        break;

                    case 4:
                       
                        return true;
                        break;

                    case 5:
                        
                        return true;
                        break;

                    case 6:
                        
                        return true;
                        break;

                    case 7:
                   
                        return true;
                        break;

                    case 8:
                     
                        return true;
                        break;
                    default:

                        break;
                }
            } else if (stepDirection == "backward") {
                switch (stepNumber) {
                    case 1:
                        return true;
                        break;

                    case 2:
                        return true;
                        break;

                    case 3:
                        return true;
                        break;

                    case 4:

                        return true;
                        break;

                    case 5:
                        return true;
                        break;

                    case 6:

                        return true;
                        break;

                    case 7:

                        return true;
                        break;

                    case 8:
 
                        return true;
                        break;
                    default:
                        break;
                }
            }
        }
    });


function ResourceModal() {  
    getWorkOrderDetails();
    localStorage.removeItem("ProposalId");
    $('.form-control').removeClass('required_field');
    $('.error_message').html('');

    $('#ResourceModal').modal("show");
    GetRFPs('ProposalRfplist');
    $('.proposalError').val('');
    $('#address').val('');

    //Reset the RFP model step
    $("#resource_smartwizard").smartWizard('reset');
}


function ClosureModal(pId,proName) {
     $('#headerClosure').text(proName);
    let filter_val = JSON.stringify({
        "token":localStorage.getItem('securityToken'),
        "projectid":pId
    });
    $("#projectId").val(pId);
    let result = callgetlist('GetProjectContributorsList ', filter_val);
    console.log(result);
    ClosureContributorGrid(result,pId);
     buildClosePopup();
}



function ClosureContributorGrid(ContributorDate){
    const dataGrid = $('#workedResourcesGrid').dxDataGrid({
        dataSource: ContributorDate,
        keyExpr: 'EmployeeId',
        showBorders: true,
        paging: {
          enabled: false,
        },
        editing: {
          mode: 'row',
            texts: {
                confirmDeleteMessage: ''  
            },
        //   allowUpdating: true,
        //   allowAdding: true,
        //   allowDeleting: true,
          selectTextOnEditStart: true,
          startEditAction: 'click',
        },
        onToolbarPreparing: function (e) {  
        var toolbarItems = e.toolbarOptions.items;  
        $.each(toolbarItems, function (_, item) {  
            // if (item.name == "saveButton" || item.name == "revertButton") { 
                if (item.name == "saveButton") {   
                item.visible = false;  
            }  
        });  
        },
        columns: [
           {
            dataField: 'DisplayName',
            caption: 'Resource Name',
            allowEditing: false
          }, {
            caption: 'Hours Worked',
            dataField: 'LoggedHours',
            allowEditing: false
          },{
            caption: 'Billable Hours',
            dataField: 'BillableHours',
            allowEditing: false
          },{
            caption: 'Rating (Out of 5)',
            dataField: 'Rating',
            dataType: "number",
            format: 'fixedPoint',  
            visible:false,
            precision: 0,  
            editorOptions: {  
            showSpinButtons: true,
            min: 1,
             max: 5,
        }  
          },
          {
                        dataField: "",
                        caption: "Comments",
                        allowFiltering: false,
                        allowGrouping: false,
                        allowReordering: false,
                        allowSorting: false,
                        allowCollapsing: false,
                        allowExporting: false,
                        cellTemplate: function (container, options) {
                            var id = options.data["EmployeeId"];
                            var domActions = "";
                            domActions +=
                                "<button class='btn btn-xs btn-success' id='ActionModal' onclick=open_comment_popup('" + id + "','"+options.rowIndex+"')>Add</button>";
                            $("<div class='text-center'>")
                                .append($(domActions))
                                .appendTo(container);
                        },
                    },
        ],
      }).dxDataGrid('instance');

    $('#ProjectClosureModal').modal('show');
 }

 function DeleteClosure(pId) {
    let filter_val = JSON.stringify({
        "token":localStorage.getItem('securityToken'),
        "projectid":pId,
        "closuredate":$("#closureDate").dxDateBox('instance').option('value'),
        "comments":$("#closureComments").dxHtmlEditor('instance').option('value'),
    });
    console.log(filter_val);

        var t=createContributorJSON();     
    swal({
title: "Are you sure?",
text: "Once its saved you cant able to revert back.",
icon: "warning",
buttons: true,
dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    // var result = PostDataCall(data);
    swal({
      title: "Success!",
      text: "Saved Successfully!",
      icon: "success",
      button: "ok!",
    })
    $('#ProjectClosureModal').modal('hide');
  }
})
}

function open_comment_popup(id, index){
    $('.resource_rate_error_msg').html('');
    $('#commentId').val(id);
    $('#index').val(index);
     var commentInd =  $('#'+id).val();
    $('#ProjectClosureCommentModal').modal('show');
    // $("#commentClosure").dxHtmlEditor("instance").option('value',commentInd);
    $("#rating").dxNumberBox("instance").option('value','');
    $("#commentClosure").dxHtmlEditor("instance").option('value','');
 }

 function SaveClosureComment(id, index) {

//    var rat= $("#rating").dxNumberBox("instance").validate();
   var asd= $("#commentClosure").dxHtmlEditor("instance").validate();
      var rating=$("#rating").dxNumberBox("instance").option('value');
      var cmd=$("#commentClosure").dxHtmlEditor("instance").option('value');
      let filter_val = JSON.stringify({
          "token":localStorage.getItem('securityToken'),
          "projectid": $("#projectId").val(),
         "resourceid":id,
          "comments":cmd,
          "rating":rating,
      });
      const grid = $("#workedResourcesGrid").dxDataGrid('instance');
      grid.deleteRow(index); 
      grid.confirmDeleteMessage = null
      grid.deselectAll();
      swal({
        title: "Success!",
        text: "Comment saved successfully!",
        icon: "success",
        button: "ok!",
      });
      $('#ProjectClosureCommentModal').modal('hide');
}

function createContributorJSON() {
    jsonObj = [];
    $("input[class=commentEmp]").each(function() {
        var id = $(this).attr("id");
        var cmd = $(this).val();
        item = {}
        item ["employeeId"] = id;
        item ["comment"] = cmd;

        jsonObj.push(item);
    });

    return jsonObj;
    // console.log(jsonObj);
}
$(function(){

    var url = "https://js.devexpress.com/Demos/Mvc/api/DnDBetweenGrids",
    priorities = [{
        id: 1, text: "Low"
    }, {
        id: 2, text: "Normal"
    }, {
        id: 3, text: "High"
    }, {
        id: 4, text: "Urgent"
    }];
    
    var store = DevExpress.data.AspNet.createStore({
        key: "ID",
        loadUrl: url + "/Tasks",
        updateUrl: url + "/UpdateTask",
        onBeforeSend: function(method, ajaxOptions) {
            ajaxOptions.xhrFields = { withCredentials: true };
        }
    });



    function getDataGridConfiguration(index) {
        return {
            height: 440,
            dataSource: {
                store: store,
                reshapeOnPush: true
            },
            showBorders: true,
            filterValue: ["Status", "=", index],
            rowDragging: {
                data: index,
                group: "tasksGroup",
                onAdd: onAdd
            },
            scrolling: {
                mode: "virtual"
            },
            columns: [{
                dataField: "Subject",
                dataType: "string"
             }, {
                dataField: "Priority",
                dataType: "number",
                width: 80,
                lookup: {
                    dataSource: priorities,
                    valueExpr: "id",
                    displayExpr: "text"
                },
            }, {
                dataField: "Status",
                dataType: "number",
                visible: false
            }]
        }
    }
    
    $("#grid1").dxDataGrid(getDataGridConfiguration(1));

    $("#grid2").dxDataGrid(getDataGridConfiguration(2));

    function onAdd(e) {
        var key = e.itemData.ID,
            values = { Status: e.toData };

        store.update(key, values).then(function() {
            store.push([{
                type: "update", key: key, data: values
            }])
        });
    }
});


$(function () {

    var tasks = [
        {
            text: "New Brochures"
        }, {
            text: "Brochure Design Review"
        }, {
            text: "Upgrade Personal Computers"
        }, {
            text: "Install New Router in Dev Room"
        }, {
            text: "Upgrade Server Hardware"
        }, {
            text: "Install New Database"
        }, {
            text: "Website Re-Design Plan"
        }, {
            text: "Create Icons for Website"
        }, {
            text: "Submit New Website Design"
        }, {
            text: "Launch New Website"
        }
    ];

    var appointments = [{
            text: "Book Flights to San Fran for Sales Trip",
            startDate: new Date("2021-04-26T19:00:00.000Z"),
            endDate: new Date("2021-04-26T20:00:00.000Z"),
            allDay: true
        }, {
            text: "Approve Personal Computer Upgrade Plan",
            startDate: new Date("2021-04-27T17:00:00.000Z"),
            endDate: new Date("2021-04-27T18:00:00.000Z")
        }, {
            text: "Final Budget Review",
            startDate: new Date("2021-04-27T19:00:00.000Z"),
            endDate: new Date("2021-04-27T20:35:00.000Z")
        }, {
            text: "Approve New Online Marketing Strategy",
            startDate: new Date("2021-04-28T19:00:00.000Z"),
            endDate: new Date("2021-04-28T21:00:00.000Z")
        }, {
            text: "Customer Workshop",
            startDate: new Date("2021-04-29T18:00:00.000Z"),
            endDate: new Date("2021-04-29T19:00:00.000Z"),
            allDay: true
        }, {
            text: "Prepare 2021 Marketing Plan",
            startDate: new Date("2021-04-29T18:00:00.000Z"),
            endDate: new Date("2021-04-29T20:30:00.000Z")
        }
    ];


    var draggingGroupName = "appointmentsGroup";

    var createItemElement = function(data) {
        $("<div>")
            .text(data.text)
            .addClass("item dx-card dx-theme-background-color dx-theme-text-color")
            .appendTo("#list")
            .dxDraggable({
                group: draggingGroupName,
                data: data,
                clone: true,
                onDragEnd: function(e) {
                    if (e.toData) {
                        e.cancel = true;
                    }
                },
                onDragStart: function(e) {
                    e.itemData = e.fromData;
                }
            });
    }

    $("#scroll").dxScrollView({});

    $("#list").dxDraggable({
        data: "dropArea",
        group: draggingGroupName,
        onDragStart: function(e) {
            e.cancel = true;
        }
    });

    tasks.forEach(function(task) {
        createItemElement(task);
    });

    $("#scheduler").dxScheduler({
        timeZone: "America/Los_Angeles",
        dataSource: appointments,
        views: [{
            type: "day",
            intervalCount: 3
        }],
        currentDate: new Date(2021, 3, 26),
        startDayHour: 9,
        height: 600,
        editing: true,
        appointmentDragging: {
            group: draggingGroupName,
            onRemove: function(e) {
                e.component.deleteAppointment(e.itemData);
                createItemElement(e.itemData);
            },
            onAdd: function(e) {
                e.component.addAppointment(e.itemData);
                e.itemElement.remove();
            }
        }
    });
});

function WorkOrderMapping(ProjectId,ProjectName,ProjectType,Client){
    $('#WorkOrderMappingModal').modal('show');
    $("#WorkOrder_ProjectId").val(ProjectId);
    $("#dlClientName").html(Client);
    $(".ProjectName").html(ProjectName);
    $(".ProjectType").html(ProjectType);

    workordergridlist();
    WorkOrderManagementGrid();
}

function workordergridlist(){
    var filter_val = JSON.stringify({
        "Token" : localStorage.getItem('securityToken'),
        "ClientId" : $("#dlClientName").html(),
        "IsActive" : true
    });
    var workOrderListing = callgetlist('GetSignedWorkOrdersForProjectCreationByClient', filter_val);
    renderWorkOrderListingGrid(workOrderListing);
}

function renderWorkOrderListingGrid(data) {
    var WorkOrderListingGrid = $("#WorkorderLists")
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
        onToolbarPreparing: function (e) {
            var dataGrid = e.component;
            e.toolbarOptions.items.unshift({
              location: "after",
              widget: "dxButton",
              options: {
                icon: "refresh",
                onClick: function () {
                    workordergridlist();
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

function WorkOrderManagementGrid(){
    var dlProjectID = $("#ProjectId").val();

    var filter_data = JSON.stringify({
        "Token" : localStorage.getItem('securityToken'),
        "ProjectId" : (dlProjectID != null && dlProjectID != '') ? dlProjectID : localStorage.getItem('ProjectId'),
        "Status" : true,
        "Message": ""
    });
    var workOrderManagement = callgetlist('GetProjectWorkOrderMapping ', filter_data);

    renderWorkOrderManagementGrid(workOrderManagement);
}

function renderWorkOrderManagementGrid(data) {

    var WorkOrderManagementGrid = $("#displayMappedWorkOrder")
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
                    WorkOrderManagementGrid();
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

function assignWorkordertoProject(){
    var selectedRowsDatas = $("#WorkorderLists").dxDataGrid("instance").getSelectedRowsData();
    var WorkOrderNumberIds = "";
    var dlProjectID = $("#ProjectId").val();
    if (selectedRowsDatas.length > 0) {
        $.each(selectedRowsDatas, function (key, value) {
            
            WorkOrderNumberIds += (value.WorkOrderId.trim());
            WorkOrderNumberIds += ','; 
            
        });
    }
    WorkOrderNumberIds = WorkOrderNumberIds.slice(0, -1);
    var data = [];
    data = {
        "Method": "PostProjectWorkOrderMapping",
        "Data": {
        "Token": localStorage.getItem('securityToken'),
        "ProjectId": (dlProjectID != null && dlProjectID != '') ? dlProjectID : null,
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
        WorkOrderManagementGrid();
        workordergridlist();
    } else {
        alert(postCall['Message']);
    }
}

function Project_phases(ProjectId,ProjectName,ProjectType,Client){
    $('#Project_phases').modal('show');
    $("#projectphase_ProjectId").val(ProjectId);
    $(".dlClientName").html(Client);
    $(".ProjectName").html(ProjectName);
    $(".ProjectType").html(ProjectType);

    if(ProjectType != 'Fixed Bid'){
        $("#addProject_Task").show();
    } else {
        $('#addProject_Task').hide();
    }

    get_projectPhases(ProjectId);
    // workordergridlist();
    // WorkOrderManagementGrid();
}

function Project_sub_task(ProjectId,ProjectName,ProjectType,Client){
    $('#Project_sub_task').modal('show');
    $("#subTask_ProjectId").val(ProjectId);
    $(".dlClientName").html(Client);
    $(".ProjectName").html(ProjectName);
    $(".ProjectType").html(ProjectType);

    // workordergridlist();
    // WorkOrderManagementGrid();
}

function Project_member(ProjectId,ProjectName,ProjectType,Client){
    $('#Project_addmember').modal('show');
    $("#addmember_ProjectId").val(ProjectId);
    $(".dlClientName").html(Client);
    $(".ProjectName").html(ProjectName);
    $(".ProjectType").html(ProjectType);

    getProjectMembers();

    //Employee List
    var fil_value = JSON.stringify({ "Token": localStorage.getItem('securityToken'),"IsActive": 1 });
    var GetEmployeeList = callgetlist('GetEmployeeList', fil_value);

    if (GetEmployeeList.length > 0) {
        $('#pm_projectMember').html('<option value="0">Select Project Member</option>');
        GetEmployeeList.forEach(function (GetEmployeeList, i) {
            $('#pm_projectMember').append('<option value="' + GetEmployeeList.EmployeeId +'">' + GetEmployeeList.Name + '</option>').select2({placeholder: "Select a User",dropdownParent: $("#Project_addmember"),});
        });
    } else {
        $('#pm_projectMember').append('<option value="0">No datas Found</option>');
    } 

    //Project Role
    var fil_value1 = JSON.stringify({ "Token": localStorage.getItem('securityToken')});
    var GetProjectMemberRolesList = callgetlist('GetProjectMemberRoles', fil_value1);

    if (GetProjectMemberRolesList.length > 0) {
        $('#pm_projectMemberRole').html('<option value="0">Select Project Role</option>');
        GetProjectMemberRolesList.forEach(function (GetProjectMemberRolesList, i) {
            $('#pm_projectMemberRole').append('<option value="' + GetProjectMemberRolesList.ProjectMemberRoleId +'">' + GetProjectMemberRolesList.ProjectMemberRole + '</option>');
        });
    } else {
        $('#pm_projectMemberRole').append('<option value="0">No datas Found</option>');
    } 
}

function project_sub_project(ProjectId,ProjectName,ProjectType,Client){
    // debugger;
    $('#Project_subProject').modal('show');
    $("#subproject-ProjectId").val(ProjectId);
    $(".dlClientName").html(Client);
    $(".ProjectName").html(ProjectName);
    $(".ProjectType").html(ProjectType);
    $("#dlSub_ClientName").val(Client);
    getSubProjectDetails();
}

function project_contacts(ProjectId,ProjectName,ProjectType,Client){
    // debugger;
    $('#Project_Contacts').modal('show');
    $("#contacts-ProjectId").val(ProjectId);
    $(".dlClientName").html(Client);
    $(".ProjectName").html(ProjectName);
    $(".ProjectType").html(ProjectType);
    get_projectContacts();
}