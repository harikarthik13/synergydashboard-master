var projectSubProjectData = [
  // {
  //     "Sub_Project":"Phases",
  //     "Start_Date": "12-02-2019",
  //     "End_Date":"12-03-2019",
  //     "Client_Name":"Richard"
  // },
  // {
  //     "Sub_Project":"Functions and Features",
  //     "Start_Date": "18-02-2019",
  //     "End_Date":"12-08-2019",
  //     "Client_Name":"Robert"
  // },
  // {
  //     "Sub_Project":"Components",
  //     "Start_Date": "21-08-2019",
  //     "End_Date":"02-09-2019",
  //     "Client_Name":"Daniel"
  // }
];

function getSubProjectDetails(){
  var filter_val = JSON.stringify({
    "Token": localStorage.getItem('securityToken'),
    "ProjectId": ($("#subproject-ProjectId").val() != '') ? $("#subproject-ProjectId").val() : null,
    "IsActive": true
  });
  var projectSubProjectData = callgetlist('GetSubProjects', filter_val);
  renderProjectSubProjectGrid(projectSubProjectData);
}

//newsub-project
$(document).ready(function () {   
  getSubProjectDetails();
  // SubProjectClientName();

  var fil_value = JSON.stringify({ "Token": localStorage.getItem('securityToken'),"IsActive": 1 });
  var GetProjectDomain = callgetlist('GetProjectDomain', fil_value);

  if (GetProjectDomain.length > 0) {
    $('#dlSub_ProjectDomain').html('<option value="0" selected disabled>Select Project Domain</option>');
    GetProjectDomain.forEach(function (GetProjectDomain, i) {
      $('#dlSub_ProjectDomain').append('<option value="' + GetProjectDomain.Id +'">' + GetProjectDomain.ProjectDomain + '</option>');
    });
  } else {
    $('#dlSub_ProjectDomain').append('<option value="0">No datas Found</option>');
  }
});

function SubProjectClientName(){
  var result = callgetlist('GetInternalClientDetails');
	var options = "";
	options += "<option value='0' selected disabled>Select Client Name</option>"
	for (var i = 0 ; i < result.length; i++) { //Cgvak_Comh_Icode
	options += "<option value='" + result[i].Cgvak_Comh_Name +"' data-person='" +
	result[i].Cgvak_Comh_Person +
	"' data-name='" +
	result[i].Cgvak_Comh_Name +
	"' data-email='" +
	result[i].Cgvak_Comh_Person +"'>" + result[i].Cgvak_Comh_Name + "</option>";
	}
	$("#dlSub_ClientName").html(options);  
}

function renderProjectSubProjectGrid(data) {
  var ProjectSubProjectGrid = $("#displaySubProject")
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
            getSubProjectDetails();
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
          ProjectSubProjectGrid.pageIndex() * ProjectSubProjectGrid.pageSize() + options.rowIndex + 1
      );
      },
    },
    {
      caption: "Sub Project",
      dataField: "SubProjectName",
    },
    {
      caption: "Start Date",
      dataField: "PlannedStartDate",
      dataType :"date",
      format : "dd-MMM-yyyy"
    },
    {
      caption: "End Date",
      dataField: "PlannedEndDate",
      dataType :"date",
      format : "dd-MMM-yyyy"
    },
    {
      caption: "Client Name",
      dataField: "ClientName",
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
      var SubProjectId = options.data["SubProjectId"];
      var SubProjectName = options.data["SubProjectName"];
      var ProjectDomain = options.data["ProjectDomain"];
      var ProjectDescription = options.data["ProjectDescription"];
      var PlannedStartDate = options.data["PlannedStartDate"];
      var PlannedEndDate = options.data["PlannedEndDate"];
      var ClientName = options.data["ClientName"];
      var domActions = "";
      domActions +=
        `<button class='btn btn-xs btn-primary edit-btn' onclick='subProjectEdit("${SubProjectId}","${SubProjectName}","${ProjectDomain}","${ProjectDescription}","${PlannedStartDate}","${PlannedEndDate}","${ClientName}")';><i class='fas fa-pencil-alt'></i></button>`;
      
        $("<div class='text-center'>")
          .append($(domActions))
          .appendTo(container);
      },
    },
    ],
  })
  .dxDataGrid("instance");
  //<button class='btn btn-xs btn-danger delete-btn' onclick=subProjectEdit();><i class='fas fa-trash-alt'></i></button>
}

function clearSubProject() {
  $('#newsub-project :input').val('');
  $('#newsub-project :input').prop("checked",false);
  $("#newsub-project .dlerror_messgae").html(''); 
}

function validate_SubProject() {
  let err = 0;

  if ($("#txt_SubProjectName").val() == "") {
      $(".txtSubProjectName_error").html('This Field is required');
      err = 1;
  } else {
      $(".txtSubProjectName_error").html('')
  }
  
  if ($("#dtpProjectPlanned_StartDate").dxDateBox("instance").option("value") == "") {
    $(".dtpProjectPlannedStartDate_error").html('This Field is required');
    err = 1;
  } else {
      $(".dtpProjectPlannedStartDate_error").html('')
  }
  if ($("#dtpProject_EndDate").dxDateBox("instance").option("value") == "") {
    $(".dtpProjectEndDate_error").html('This Field is required');
    err = 1;
  } else {
      $(".dtpProjectEndDate_error").html('')
  }
  if ($("#dlSub_ProjectDomain").val() == "0") {
    $(".dlSubProjectDomain_error").html('This Field is required');
    err = 1;
  } else {
      $(".dlSubProjectDomain_error").html('')
  }
  if ($("#dlSub_ClientName").val() == "0") {
    $(".dlSubClientName_error").html('This Field is required');
    err = 1;
  } else {
      $(".dlSubClientName_error").html('')
  }


  if ($("#txtSub_ProjectDescription").val() == "") {
    $(".txtSubProjectDescription_error").html('This Field is required');
    err = 1;
  } else {
      $(".txtSubProjectDescription_error").html('')
  }


  if (err == 1) {
    return false;
  } else {
    data = {
      "Method": "PostSubProjects",
      "Data": {
        "Token"              : localStorage.getItem('securityToken'), 
        "SubProjectId"       : ($("#SubProjectId").val() != '') ? $("#SubProjectId").val() : null,
        "ProjectId"          : ($("#subproject-ProjectId").val() != '') ? $("#subproject-ProjectId").val() : null,
        "Name"               : ($('#txt_SubProjectName').val()!='') ? $('#txt_SubProjectName').val() : null,
        "PlannedStartDate"   : ($('#dtpProjectPlanned_StartDate').dxDateBox("instance").option("value") !='') ? $('#dtpProjectPlanned_StartDate').dxDateBox("instance").option("value") : null,
        "PlannedEndDate"     : ($('#dtpProject_EndDate').dxDateBox("instance").option("value") !='') ? $('#dtpProject_EndDate').dxDateBox("instance").option("value") : null,
        "ClientName"         : ($('#dlSub_ClientName').val()!='') ? $('#dlSub_ClientName').val() : null,
        "ProjectDomain"	     : ($('#dlSub_ProjectDomain').val()!='') ? $('#dlSub_ProjectDomain').val() : null,
        "ProjectDescription" : ($('#txtSub_ProjectDescription').val()!='') ? $('#txtSub_ProjectDescription').val() : null,
        "IsActive"           : 1,
        "Status"             : "",
        "Message"            : "",
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
        getSubProjectDetails();
        clearSubProject();
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

function subProjectEdit(SubProjectId,SubProjectName,ProjectDomain,ProjectDescription,PlannedStartDate,PlannedEndDate,ClientName){

  //clear all input values
  $('#newsub-project').find('input:text').val('');

  var dlClientName = $(".dlClientName").html();

  toggleMembers=true;
  toggleSubProjects();
  $("#newsub-project .dlerror_messgae").html('');

  $('#SubProjectId').val(SubProjectId);
  $('#txt_SubProjectName').val(SubProjectName);

  if(PlannedStartDate == 'null'){
    $('#dtpProjectPlanned_StartDate').dxDateBox("instance").option("value",'');
  }else{
    $('#dtpProjectPlanned_StartDate').dxDateBox({ type: 'date', value: PlannedStartDate, displayFormat: 'dd-MMM-yyyy'});
  }

  if(PlannedEndDate == 'null'){
    $('#dtpProject_EndDate').dxDateBox("instance").option("value",'');
  }else{
    $('#dtpProject_EndDate').dxDateBox({ type: 'date', value: PlannedEndDate, displayFormat: 'dd-MMM-yyyy'});
  }

  $('#dlSub_ProjectDomain').val(ProjectDomain).trigger('change');

  if(ClientName == 'null'){
    $('#dlSub_ClientName').val(dlClientName);
  }else{
    $('#dlSub_ClientName').val(ClientName);
  }

  if(ProjectDescription == 'null'){
    $('#txtSub_ProjectDescription').val('');
  }else{
    $('#txtSub_ProjectDescription').val(ProjectDescription);
  }
}

function toggleSubProjects(){
  if(toggleMembers){
    $('#newsub-project').collapse('show')
    toggleMembers = false;
  }else{
    $('#newsub-project').collapse('hide');
    toggleMembers = true;
  }

}