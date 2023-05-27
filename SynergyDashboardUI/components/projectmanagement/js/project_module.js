$(document).ready(function () {   

  var filter_val = JSON.stringify({
    "ProjectId": $("#subTask_ProjectId").val(),
  });

  var GetProjectModuleDropDown = callgetlist('GetProjectTaskDropDown', filter_val);
  if (GetProjectModuleDropDown.length > 0) {
    $('#pm_projectPhase').html('<option value="0">Select Project Phase</option>');
    GetProjectModuleDropDown.forEach(function (GetProjectModuleDropDown, i) {
      $('#pm_projectPhase').append('<option value="'+ GetProjectModuleDropDown.ProjectTaskId +'">' + GetProjectModuleDropDown.ProjectTask + '</option>');
    });
  } else {
    $('#pm_projectPhase').append('<option value="0">No datas Found</option>');
  }

  get_projectModules();
});
var estimatehrs=0;
var totalEstimate=0;
function get_projectModules() {
  var selectedProjectPhase = document.getElementById("pm_projectPhase").value;

  var filter_val = JSON.stringify({
    "ProjectTaskId": selectedProjectPhase,
    "IsActive": true
  });
  var projectModuleResult = callgetlist('GetProjectSubTask', filter_val);
  if(projectModuleResult.length>0){
    totalEstimate=projectModuleResult[0].TotalEstimation;
    estimatehrs=(projectModuleResult[0].TotalEstimation - projectModuleResult[0].CurrentEstimation);
    estimatehrs =estimatehrs>0?estimatehrs:0;
    $("#pm_estimatedHours").attr({
      "max" : estimatehrs,        // substitute your own
      "min" : 0          // values (or variables) here
   });
   if(estimatehrs==0){
    $(".pmo_estimatedHours_error").html('Estimation Hours Exceeds');
   }else{
    $(".pmo_estimatedHours_error").html('');
   }
    // $("#ProjectEstimation").val(projectModuleResult[0].TotalEstimation);
  }
  renderProjectModuleGrid(projectModuleResult);
}

function clear_ProjectModules() {
  $('#new-sub-task :input').val('');
  $("#new-sub-task .dlerror_messgae").html(''); 
}

function validate_ProjectModules() {
  let err = 0;
  if ($("#pm_projectPhase").val() == 0 || $("#pm_projectPhase").val() == null) {
      $(".pmo_projectPhase_error").html('This Field is required');
      err = 1;
  } else {
      $(".pmo_projectPhase_error").html('')
  }
  
  if ($("#pm_estimatedHours").val() == "") {
    $(".pmo_estimatedHours_error").html('This Field is required');
    err = 1;
  } 
  else {
    if(totalEstimate < $("#pm_estimatedHours").val()){
      err = 1;
      $(".pmo_estimatedHours_error").html('Estimation Hours Exceeds');
     }
    else {
        $(".pmo_estimatedHours_error").html('')
    }
  }
  
  if ($("#pm_headerTitle").val() == "") {
    $(".pmo_headerTitle_error").html('This Field is required');
    err = 1;
  } else {
      $(".pmo_headerTitle_error").html('')
  }

  if (err == 1) {
    return false;
  } else {
    data = {
      "Method": "PostProjectSubTask",
      "Data": {
        "Token" : localStorage.getItem('securityToken'),
        "ProjectSubTaskId": ($("#projectModuleId").val() != '') ? $("#projectModuleId").val() : null,
        "ProjectTaskId": ($("#pm_projectPhase").val() != '') ? $("#pm_projectPhase").val() : null,
        "SubTask": ($('#pm_headerTitle').val()!='') ? $('#pm_headerTitle').val() : null,
        "SubTaskDetails": ($('#pm_txtProjectDescription').val()!='') ? $('#pm_txtProjectDescription').val() : null,
        "Estimation": ($('#pm_estimatedHours').val()!='') ? $('#pm_estimatedHours').val() : null,
        "Isbillable": 0,
        "PercentageCompleted": null,
        "Closed": null,
        "IsActive": 1,
        "Status": "",
        "Message": "",
      }
    }
  }
}

function renderProjectModuleGrid(data) {
  var ProjectModuleGrid = $("#display_subTasks")
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
        ProjectModuleGrid.pageIndex() * ProjectModuleGrid.pageSize() + options.rowIndex + 1
      );
      },
    },
    {
      caption: "Project Module",
      dataField: "SubTask",
    },
    {
      caption: "Project Tasks",
      dataField: "SubTaskDetails",
    },
    {
      caption: "Estimated Hours",
      dataField: "Estimation",
    },
    {
      dataField: "",
      caption: "Action",
      width: 80,
      allowFiltering:false, 
      allowGrouping: false, 
      allowReordering: false, 
      allowSorting: false, 
      allowCollapsing: false, 
      allowExporting: false,
      cellTemplate: function (container, options) {
      var ProjectSubTaskId = options.data["Id"]
      var domActions = "";
       domActions +=
        `<button class='btn btn-xs btn-primary edit-btn' onclick='editProjectModule("${ProjectSubTaskId}")'><i class='fas fa-pencil-alt'></i></button>
        <button class='btn btn-xs btn-primary edit-btn' onclick='deleteProjectModule("${ProjectSubTaskId}")'><i class='fas fa-trash-alt'></i></button>`;
      
        $("<div class='text-center'>")
        .append($(domActions))
        .appendTo(container);
      },
    },
    ],
  })
  .dxDataGrid("instance");
}

function editProjectModule(ProjectModuleId) {
  
  $("#new-sub-task .dlerror_messgae").html('');
  var filter_val = JSON.stringify({"ProjectSubTaskId": ProjectModuleId});

  var GetProjectModuleById = callgetlist('GetProjectSubTaskById',filter_val);
  $('#btnNewProjectSave').html('Save');

  $("#projectModuleId").val(GetProjectModuleById[0].Id);
  $("#pm_projectPhase").val(GetProjectModuleById[0].ProjectTaskId);
  $("#pm_estimatedHours").val(GetProjectModuleById[0].Estimation);
  $("#pm_headerTitle").val(GetProjectModuleById[0].SubTask);
  $("#pm_txtProjectDescription").val(GetProjectModuleById[0].SubTaskDetails);

}

function deleteProjectModule(ProjectModuleId) {
  swal({
    title: "Delete",
    text: "Are you sure, Do you want to delete ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        var id = ProjectModuleId;
        data = {
          "Method": "DeleteProjectSubTask",
          "Data": {
            "ProjectSubTaskId" : id,
            "IsActive" : 1,
            "Status": "",
            "Message":""
          }
        }
        var postCall = PostDataCall(data);
        if (postCall['IsSuccess'] == true) {
          clear_ProjectModules();
          get_projectModules();
          swal({
            title: "Success!",
            text: "Deleted Successfully!",
            icon: "success",
            button: "ok!",
            })
        } else {
          alert(postCall['Message']);
        }
      }
    })
}

function getvalue()
{

alert("hi");

}