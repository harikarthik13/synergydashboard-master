
$(document).ready(function () { 
 
  get_projectPhasesByProjectId();
  getPhasesDropdown();
});

function getPhasesDropdown(ProjectId){
  // console.log(ProjectId);
  var filter_GetProjectPhaseDropDown = JSON.stringify({
    "Token": localStorage.getItem('securityToken'),
    "ProjectId" : ProjectId,
  });
  //show GetProjectPhaseDropDown list
  var GetProjectPhaseDropDown = callgetlist('GetProjectPhase',filter_GetProjectPhaseDropDown);
  if (GetProjectPhaseDropDown.length > 0) {
    $('.disp_projectPhase').html('<option value="0">Select Project Phase</option>');
    GetProjectPhaseDropDown.forEach(function (GetProjectPhaseDropDown, i) {
      $('.disp_projectPhase').append('<option value="'+ GetProjectPhaseDropDown.ProjectPhasesId +'">' + GetProjectPhaseDropDown.ProjectPhasesName + '</option>');
    });
  } else {
    $('.disp_projectPhase').append('<option value="0">No datas Found</option>');
  }  
}


function get_projectPhases() {

  getPhasesDropdown($("#projectphase_ProjectId").val());

  var filter_val = JSON.stringify({
    "Token": localStorage.getItem('securityToken'),
    "ProjectId": $("#projectphase_ProjectId").val(),
    "IsActive": true
  });
  var projectPhaseResult = callgetlist('GetProjectTasks', filter_val);
  renderProjectPhaseGrid(projectPhaseResult);
}

function get_projectPhasesByProjectId() {
  if($("#dlClientProjectType :selected").text() != 'Fixed Bid') {
    $('#addProject_Task').show();
  } else {
    $('#addProject_Task').hide();
  }
  var filter_val = JSON.stringify({
    "Token": localStorage.getItem('securityToken'),
    "ProjectId": $("#projectphase_ProjectId").val(),
  });
  var projectPhaseResult = callgetlist('GetProjectPhaseAndTask', filter_val);
  renderProjectPhaseGrid(projectPhaseResult);
}


function checkIfProjectPhasesExists() {
  var filter_val = JSON.stringify({
    "ProjectId": $("#projectphase_ProjectId").val(),
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
    $("#display_ProjectPhase").html(HTML);
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
      $('#addProject_Task').show();
      html += "<th><div class=pull-right>Actions</div></th>"
   } else {
      $('#addProject_Task').hide();
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
  $("#addProject-phases .error_message").html('');
  var filter_val = JSON.stringify({
    "ProjectId": "sampleProjectId",
    "IsActive": true,
    "ProjectId":"1",
    "ProjectPhasesId": phaseId
  });

  let result = callgetlist('GetProjectPhase', filter_val);
  result.forEach(function (key, item) {
    $("#ProjectPhaseId").val(key.ProjectPhasesId);
    $("#txt_PhaseName").val(key.ProjectPhasesName);
    $("#txt_PPTasks").val(key.HeaderTitleName);
    $("#dtp_PhaseStartDate").dxDateBox({ type: 'date', value: key.PhaseStartDate, displayFormat: 'dd-MMM-yyyy',});//.val(key.PhaseStartDate);
    $("#dtp_PhaseEndDate").dxDateBox({ type: 'date', value: key.PhaseEndDate, displayFormat: 'dd-MMM-yyyy',});//.val(key.PhaseEndDate);
    $("#txt_Hours").val(key.Hours);
    let phaseStatus= + key.ActivityStatus;
    if(phaseStatus==true)
    {
      // document.getElementById("PhaseStatus").checked = true;
    }
    else{
      // document.getElementById("PhaseStatus").checked = false;
    }
    $("#txt_PPNote").val(key.Note);
  });

}

function clearPhase() {
  toggleProjectPhase();
  $('#addProject-phases :input').not( "#dtp_PhaseStartDate, #dtp_PhaseEndDate" ).val('');
  $('#addProject-phases :input').prop("checked",false);
  // $("#addProject-phases .error_message").html(''); 
  $("#addProject-phases .dlerror_messgae").html(''); 
}

function toggleProjectPhase()
{
  if(togglePhase)
  {
    $('#addProject-phases').collapse('show')
    togglePhase = false;
  }
  else
  {
    $('#addProject-phases').collapse('hide');
    togglePhase = true;
  }

};

function validateProjectPhases() {
  let err = 0;

  if ($("#txt_PhaseName").val() == "0" || $("#txt_PhaseName").val() == null) {
      $(".txtPhaseName_error").html('This Field is required');
      err = 1;
  } else {
      $(".txtPhaseName_error").html('')
  }
  
  if ($("#txt_PPTasks").val() == "") {
    $(".txtPPTasks_error").html('This Field is required');
    err = 1;
  } else {
      $(".txtPPTasks_error").html('')
  }
  if ($("#dtp_PhaseStartDate").dxDateBox('instance').option('value') == "") {
    $(".dtpPhaseStartDate_error").html('This Field is required');
    err = 1;
  } else {
      $(".dtpPhaseStartDate_error").html('')
  }
  if ($("#dtp_PhaseEndDate").dxDateBox('instance').option('value') == "") {
    $(".dtpPhaseEndDate_error").html('This Field is required');
    err = 1;
  } else {
      $(".dtpPhaseEndDate_error").html('')
  }
  if ($("#txt_Hours").val() == "") {
    $(".txtHours_error").html('This Field is required');
    err = 1;
  } else {
      $(".txtHours_error").html('')
  }
  if ($("#txt_PPNote").val() == "") {
    $(".txtPPNote_error").html('This Field is required');
    err = 1;
  } else {
      $(".txtPPNote_error").html('')
  }



  if (err == 1) {
    return false;
  } else {
    
      data = {
        "Method": "PostProjectTask",
        "Data": {
          "Token": localStorage.getItem('securityToken'),
          "ProjectTaskId" : ($("#ProjectTaskId").val() != '') ? $("#ProjectTaskId").val() : null,
          "ProjectId": ($("#projectphase_ProjectId").val() != '' && $("#projectphase_ProjectId").val() != null) ? $("#projectphase_ProjectId").val() : null,
          "EstimationId" : 1,
          "ProjectPhaseId": ($("#txt_PhaseName").val() != '') ? $("#txt_PhaseName").val() : 'NULL',
          "Feature" : ($('#txt_PPTasks').val() != '') ? $('#txt_PPTasks').val() : null,
          "SubFeature" : ($('#txt_PPNote').val() != '') ? $('#txt_PPNote').val() : null,
          "Estimation" : ($('#txt_Hours').val() != '') ? Number($('#txt_Hours').val()):0,
          "PlannedStartDate": ($('#dtp_PhaseStartDate').dxDateBox("instance").option("value") == "") ? null : from_todateFormat($('#dtp_PhaseStartDate').dxDateBox("instance").option("value")),
          "PlannedEndDate": ($('#dtp_PhaseEndDate').dxDateBox("instance").option("value") == "") ? null : from_todateFormat($('#dtp_PhaseEndDate').dxDateBox("instance").option("value")),
          "ActualHours": ($('#txt_Hours').val() != '') ? parseFloat($('#txt_Hours').val()):0,
          "ActualStartDate" : ($('#dtp_PhaseStartDate').dxDateBox("instance").option("value") == "") ? null : from_todateFormat($('#dtp_PhaseStartDate').dxDateBox("instance").option("value")),
          "ActualEndDate" : ($('#dtp_PhaseEndDate').dxDateBox("instance").option("value") == "") ? null : from_todateFormat($('#dtp_PhaseEndDate').dxDateBox("instance").option("value")),
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

function projectPhaseEdit(ProjectPhasesId) {

  //clear all input values
  $('#addProject-phases').find('input:text').val('');

  togglePhase=true;
  toggleProjectPhase();
  $("#addProject-phases .dlerror_messgae").html('');
  var filter_val = JSON.stringify({"Token": localStorage.getItem('securityToken'),  "ProjectId": $("#projectphase_ProjectId").val(), "PhaseId": ProjectPhasesId });

  var GetProjectTaskByPhaseId = callgetlist('GetTasksbyProjectId',filter_val);
  $('#btnNew_ProjectSave').html('Save');

  $("#ProjectPhaseId").val(GetProjectTaskByPhaseId[0].Id);
  $("#txt_PhaseName").val(GetProjectTaskByPhaseId[0].PhaseId);
  $("#txt_PPTasks").val(GetProjectTaskByPhaseId[0].Task);
  $("#txt_PPNote").val(GetProjectTaskByPhaseId[0].TaskDetails);
  $("#txt_Hours").val(GetProjectTaskByPhaseId[0].Estimation);
  var StartDate = Get_FormattedDate(GetProjectTaskByPhaseId[0].StartDate);
  var EndDate = Get_FormattedDate(GetProjectTaskByPhaseId[0].EndDate);
  $("#dtp_PhaseStartDate").dxDateBox({ type: 'date', value: StartDate, displayFormat: 'dd-MMM-yyyy',});
  $("#dtp_PhaseEndDate").dxDateBox({ type: 'date', value: EndDate, displayFormat: 'dd-MMM-yyyy',});

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
              "ProjectId": $("#projectphase_ProjectId").val(),
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
  var ProjectPhaseGrid = $("#display_ProjectPhase")
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

function from_todateFormat(passDate){
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