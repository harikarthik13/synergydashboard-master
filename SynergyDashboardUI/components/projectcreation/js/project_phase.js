
$(document).ready(function () { 
  var filter_GetProjectPhaseDropDown = JSON.stringify({
    "Token": localStorage.getItem('securityToken')
  });
  //show GetProjectPhaseDropDown list
  var GetProjectPhaseDropDown = callgetlist('GetProjectPhaseDropDown',filter_GetProjectPhaseDropDown);
  if (GetProjectPhaseDropDown.length > 0) {
    $('.disp_projectPhase').html('<option value="0">Select Project Phase</option>');
    GetProjectPhaseDropDown.forEach(function (GetProjectPhaseDropDown, i) {
      $('.disp_projectPhase').append('<option value="'+ GetProjectPhaseDropDown.Id +'">' + GetProjectPhaseDropDown.ProjectPhase + '</option>');
    });
  } else {
    $('.disp_projectPhase').append('<option value="0">No datas Found</option>');
  }  

  get_projectPhases();
  get_projectPhasesByProjectId();
});




function get_projectPhases() {
  var filter_val = JSON.stringify({
    "Token": localStorage.getItem('securityToken'),
    "ProjectId": localStorage.getItem('ProjectId'),
    "IsActive": true
  });
  var projectPhaseResult = callgetlist('GetProjectTasks', filter_val);
  renderProjectPhaseGrid(projectPhaseResult);
}

function get_projectPhasesByProjectId() {
  if($("#dlClientProjectType :selected").text() != 'Fixed Bid') {
    $('#addNewProject').show();
  } else {
    $('#addNewProject').hide();
  }
  var filter_val = JSON.stringify({
    "Token": localStorage.getItem('securityToken'),
    "ProjectId": localStorage.getItem('ProjectId')
  });
  var projectPhaseResult = callgetlist('GetProjectPhaseAndTask', filter_val);
  renderProjectPhaseGrid(projectPhaseResult);
}


function checkIfProjectPhasesExists() {
  var filter_val = JSON.stringify({
    "ProjectId": localStorage.getItem('ProjectId'),
    "IsActive": true
  });
  var projectPhaseResult = callgetlist('GetProjectTasks', filter_val);
  if(projectPhaseResult.length == 0){
    alert("Do you want to continue ?");
  }
}

var togglePhase=true;
function displayAddedProjectPhase(){
    var SavedProjectPhase = GetAddedProjectPhase();
    HTML = projectPhase(SavedProjectPhase);
    $("#displayProjectPhase").html(HTML);
}

function GetAddedProjectPhase() {
    var filter_val = JSON.stringify({
      "Token": localStorage.getItem('securityToken'),
      "ProjectId": localStorage.getItem('ProjectId')
    });

    var result = callgetlist('GetProjectPhaseAndTask', filter_val);
    return result;
  
  }


function projectPhase(SavedProjectPhase){
   var html = "<table id='tableProjectPhase' class='table table-striped table-hover'>";
   html += "<tr>";
   html += "<th>Project Phases</th>"
   html += "<th>Header Title</th>"
   html += "<th>Hours</th>"

   if($("#dlClientProjectType :selected").text() != 'Fixed Bid') {
      $('#addNewProject').show();
      html += "<th><div class=pull-right>Actions</div></th>"
   } else {
      $('#addNewProject').hide();
   }
   html += "</tr>";
   if (SavedProjectPhase.length == 0) {
     html += "<tr colspan='4'><td>No Data Found.!</td></tr>";
   }  else {
    SavedProjectPhase.forEach(function (key, item) {
       html += "<td><input type='hidden' value='" + key.ProjectPhasesId + "'>" + key.ProjectPhasesName + "</td>"
       html += "<td><input type='hidden' value='" + key.HeaderTitleId + "'>" + key.HeaderTitleName + "</td>"
       html += "<td><input type='hidden' value='" + key.Hours + "'>" + key.Hours + "</td>"
       if($("#dlClientProjectType :selected").text() != 'fixedbid') {
          html +=" <td><div class='pull-right'><button class='btn btn-secondary btn-xs' type='button' onclick=updateProjectPhase('"+ key.ProjectPhasesId +"')><i class='fas fa-pencil-alt'></i></button>"
          html +=" <button class='btn btn-danger btn-xs' type='button'><i class='fas fa-trash-alt'></i></button></div></td>" 
       }
          html += "</tr>";
     });
   }
 
   html += "</table>"
   return html;
 }


 function updateProjectPhase(phaseId) {
  togglePhase=true;
  toggleProjectPhase();
  $("#add-project-phases .error_message").html('');
  var filter_val = JSON.stringify({
    "ProjectId": "sampleProjectId",
    "IsActive": true,
    "ProjectId":"1",
    "ProjectPhasesId": phaseId
  });

  let result = callgetlist('GetProjectPhase', filter_val);
  result.forEach(function (key, item) {
    $("#hdnPhaseId").val(key.ProjectPhasesId);
    $("#txtPhaseName").val(key.ProjectPhasesName);
    $("#txtPPTasks").val(key.HeaderTitleName);
    $("#dtpPhaseStartDate").dxDateBox({ type: 'date', value: key.PhaseStartDate, displayFormat: 'dd-MMM-yyyy',});//.val(key.PhaseStartDate);
    $("#dtpPhaseEndDate").dxDateBox({ type: 'date', value: key.PhaseEndDate, displayFormat: 'dd-MMM-yyyy',});//.val(key.PhaseEndDate);
    $("#txtHours").val(key.Hours);
    let phaseStatus= + key.ActivityStatus;
    if(phaseStatus==true)
    {
      // document.getElementById("PhaseStatus").checked = true;
    }
    else{
      // document.getElementById("PhaseStatus").checked = false;
    }
    $("#txtPPNote").val(key.Note);
  });

}

function clearPhase() {
  toggleProjectPhase();
  $('#add-project-phases :input').not( "#dtpPhaseStartDate, #dtpPhaseEndDate" ).val('');
  $('#add-project-phases :input').prop("checked",false);
  // $("#add-project-phases .error_message").html(''); 
  $("#add-project-phases .dlerror_messgae").html(''); 
}

function toggleProjectPhase()
{
  if(togglePhase)
  {
    $('#add-project-phases').collapse('show')
    togglePhase = false;
  }
  else
  {
    $('#add-project-phases').collapse('hide');
    togglePhase = true;
  }

};

function validateProjectPhases() {
  let err = 0;

  if ($("#txtPhaseName").val() == "0" || $("#txtPhaseName").val() == null) {
      $(".txtPhaseName_error").html('This Field is required');
      err = 1;
  } else {
      $(".txtPhaseName_error").html('')
  }
  
  if ($("#txtPPTasks").val() == "") {
    $(".txtPPTasks_error").html('This Field is required');
    err = 1;
  } else {
      $(".txtPPTasks_error").html('')
  }
  if ($("#dtpPhaseStartDate").val() == "") {
    $(".dtpPhaseStartDate_error").html('This Field is required');
    err = 1;
  } else {
      $(".dtpPhaseStartDate_error").html('')
  }
  if ($("#dtpPhaseEndDate").val() == "") {
    $(".dtpPhaseEndDate_error").html('This Field is required');
    err = 1;
  } else {
      $(".dtpPhaseEndDate_error").html('')
  }
  if ($("#txtHours").val() == "") {
    $(".txtHours_error").html('This Field is required');
    err = 1;
  } else {
      $(".txtHours_error").html('')
  }
  if ($("#txtPPNote").val() == "") {
    $(".txtPPNote_error").html('This Field is required');
    err = 1;
  } else {
      $(".txtPPNote_error").html('')
  }



  if (err == 1) {
    return false;
  } else {
    if($("#dlProjectIsClosed").val() != 1){
      data = {
        "Method": "PostProjectPhases",
        "Data": {
          "Token": localStorage.getItem('securityToken'),
          "ProjectTaskId" : ($("#ProjectTaskId").val() != '') ? $("#ProjectTaskId").val() : null,
          "ProjectId": ($("#projectphase_ProjectId").val() != '' && $("#projectphase_ProjectId").val() != null) ? $("#projectphase_ProjectId").val() : null,
          "EstimationId" : 1,
          "ProjectPhaseId": ($("#txt_PhaseName").val() != '') ? $("#txt_PhaseName").val() : null,
          "Feature" : ($('#txt_PPTasks').val() != '') ? $('#txt_PPTasks').val() : null,
          "SubFeature" : ($('#txt_PPNote').val() != '') ? $('#txt_PPNote').val() : null,
          "Estimation" : ($('#txt_Hours').val() != '') ? Number($('#txt_Hours').val()):0,
          "PlannedStartDate": ($('#dtp_PhaseStartDate').dxDateBox("instance").option("value") == "") ? null : fromtodateFormat($('#dtp_PhaseStartDate').dxDateBox("instance").option("value")),
          "PlannedEndDate": ($('#dtp_PhaseEndDate').dxDateBox("instance").option("value") == "") ? null : fromtodateFormat($('#dtp_PhaseEndDate').dxDateBox("instance").option("value")),
          "ActualHours": ($('#txt_Hours').val() != '') ? parseFloat($('#txt_Hours').val()):0,
          "ActualStartDate" : ($('#dtp_PhaseStartDate').dxDateBox("instance").option("value") == "") ? null : fromtodateFormat($('#dtp_PhaseStartDate').dxDateBox("instance").option("value")),
          "ActualEndDate" : ($('#dtp_PhaseEndDate').dxDateBox("instance").option("value") == "") ? null : fromtodateFormat($('#dtp_PhaseEndDate').dxDateBox("instance").option("value")),
          "IsUnitTestingCompleted" :0,
          "IsFunctionalTestingCompleted":0,
          "IsUATPassed":0,
          "IsActive": 1,
          "Status": "",
          "Message": "",
        }
      }
  
      var postCall = PostDataCall(data);
      if (postCall['IsSuccess'] == true) {
        var swalEMRSucc = {
          title: 'Success!',
          text: postCall['Message'],
          icon: "success"
        }
        swalAlert(swalEMRSucc); 
        clearPhase();
        get_projectPhases();
      } else {
        var swalEMRErr = {
          title: 'Warning!',
          text: postCall['Message'],
          icon: "error"
        }
        swalAlert(swalEMRErr);
      }
    }
  }
}

function projectPhaseEdit(ProjectPhasesId) {

  //clear all input values
  $('#add-project-phases').find('input:text').val('');

  togglePhase=true;
  toggleProjectPhase();
  $("#add-project-phases .dlerror_messgae").html('');
  var filter_val = JSON.stringify({"Token": localStorage.getItem('securityToken'),  "ProjectId": localStorage.getItem('ProjectId'), "PhaseId": ProjectPhasesId });

  var GetProjectTaskByPhaseId = callgetlist('GetTasksbyProjectId',filter_val);
  $('#btnNewProjectSave').html('Save');

  $("#hdnPhaseId").val(GetProjectTaskByPhaseId[0].Id);
  $("#txtPhaseName").val(GetProjectTaskByPhaseId[0].PhaseId);
  $("#txtPPTasks").val(GetProjectTaskByPhaseId[0].Task);
  $("#txtPPNote").val(GetProjectTaskByPhaseId[0].TaskDetails);
  $("#txtHours").val(GetProjectTaskByPhaseId[0].Estimation);
  var StartDate = GetFormattedDate(GetProjectTaskByPhaseId[0].StartDate);
  var EndDate = GetFormattedDate(GetProjectTaskByPhaseId[0].EndDate);
  $("#dtpPhaseStartDate").dxDateBox({ type: 'date', value: StartDate, displayFormat: 'dd-MMM-yyyy',});
  $("#dtpPhaseEndDate").dxDateBox({ type: 'date', value: EndDate, displayFormat: 'dd-MMM-yyyy',});

 (GetProjectTaskByPhaseId[0].IsActive) ? $("#PhaseStatus").prop('checked', true) : $('#PhaseStatus').prop('checked', false);

}

function deleteProjectPhase(ProjectPhaseId) {
  // var WorkOrderId = $('#WorkOrderId').val();
  swal({
    title: "Delete",
    text: "Are you sure, Do you want to delete ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        if($("#dlProjectIsClosed").val() != 1){
          var id = ProjectPhaseId;
          data = {
            "Method": "DeleteProjectPhase",
            "Data": {
              "IsActive": true,
              "ProjectId": localStorage.getItem('ProjectId'),
              "ProjectPhaseId" : id,
              "Status": "",
              "Message":""
            }
          }

          var postCall = PostDataCall(data);
          if (postCall['IsSuccess'] == true) {
            clearPhase();
            toggleProjectPhase();
            get_projectPhases();
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
      }
    })
}
  
function renderProjectPhaseGrid(data) {
  var ProjectPhaseGrid = $("#displayProjectPhase")
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
            get_projectPhasesByProjectId();
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
        ProjectPhaseGrid.pageIndex() * ProjectPhaseGrid.pageSize() + options.rowIndex + 1
      );
      },
    },
    {
      caption: "Project Phases",
      dataField: "Project Phases",
    },
    {
      caption: "Project Tasks",
      dataField: "Project Tasks",
    },
    {
      caption: "Hours",
      dataField: "Hours",
    },
    // {
    //   dataField: "",
    //   caption: "Action",
    //   width: 80,
    //   allowFiltering:false, 
    //   allowGrouping: false, 
    //   allowReordering: false, 
    //   allowSorting: false, 
    //   allowCollapsing: false, 
    //   allowExporting: false,
    //   cellTemplate: function (container, options) {
    //   var ProjectPhasesId = options.data["Id"]
    //   var domActions = "";
    //   domActions +=
    //     `<button class='btn btn-xs btn-primary edit-btn' onclick=projectPhaseEdit("${ProjectPhasesId}");><i class='fas fa-pencil-alt'></i></button><button class='btn btn-xs btn-danger delete-btn' onclick=deleteProjectPhase("${ProjectPhasesId}");><i class='fas fa-trash-alt'></i></button>`;
    //     $("<div class='text-center'>")
    //     .append($(domActions))
    //     .appendTo(container);
    //   },
    // },
    ],
  })
  .dxDataGrid("instance");
}


function Get_FormattedDate(proposalDate) {
  var d = new Date(proposalDate),
    month = '' + (d.toLocaleString('en-us', { month: 'short' })),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [day, month, year].join('-');
}

function fromtodateFormat(passDate){
  var currentDate = new Date(passDate);
  var day = currentDate.getDate();
 var month = currentDate.getMonth() + 1;
 if (day < 10) {
     day = "0" + (day);
 }
 if (month < 10) {
     month = "0" + (month);
 }
 var year = currentDate.getFullYear();
 return fromDate = (year + "-" + month + "-" + day);
}