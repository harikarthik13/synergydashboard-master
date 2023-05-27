
function get_projectContacts() {

  //show designation  list
  var fil_value_for_Designation = JSON.stringify({ "Token": localStorage.getItem('securityToken')});
  var GetProjectDesignation = callgetlist('GetDesignations', fil_value_for_Designation);
  if (GetProjectDesignation.length > 0) {
    $('#dl_Designation').html('<option value="0">Select Designation</option>');
    GetProjectDesignation.forEach(function (GetProjectDesignation, i) {
      $('#dl_Designation').append('<option value="'+ GetProjectDesignation.Id +'">' + GetProjectDesignation.Name + '</option>');
    });
  } else {
    $('#dl_Designation').append('<option value="0">No datas Found</option>');
  }

  //show GetProjectContactEmailById list
  var fil_val_for_ProjectContactEmailById = JSON.stringify({ "Token": localStorage.getItem('securityToken')});
  var GetProjectContactEmail = callgetlist('GetProjectContactEmailById', fil_val_for_ProjectContactEmailById);
  if (GetProjectContactEmail.length > 0) {
    $('#dl_FromEmail').html('<option value="0">Select Project Contact Email ID</option>');
    GetProjectContactEmail.forEach(function (GetProjectContactEmail, i) {
      $('#dl_FromEmail').append('<option value="'+ GetProjectContactEmail.CorporateEmailID +'">' + GetProjectContactEmail.CorporateEmailID + '</option>');
    });
  } else {
    $('#dl_FromEmail').append('<option value="0">No datas Found</option>');
  }

  var fil_val_GetProjectContacts = JSON.stringify({ "Token": localStorage.getItem('securityToken'),"ProjectId": $("#contacts-ProjectId").val(),"IsActive":1 });
  var GetProjectContactsData = callgetlist('GetProjectContacts',fil_val_GetProjectContacts);

  renderProjectContactGrid(GetProjectContactsData);
}
var toggleContacts=true;

function updateProjectContacts(ProjectContactId) {
  toggleContacts=true;
  toggle_ProjectContacts();
  $("#addproject-contacts .error_message").html('');
  var filter_val = JSON.stringify({
    "Token": localStorage.getItem('securityToken'),
    "ProjectContactId": ProjectContactId
  });

  var GetProjectContactById = callgetlist('GetProjectContactById',filter_val);

  $("#hdn_ProjectContactId").val(GetProjectContactById[0].Id);
  $("#hdn_ProjectId").val(GetProjectContactById[0].ProjectId);
  $("#hdn_ClientContactId").val(GetProjectContactById[0].ClientContactId);

  $("#txt_ClientName").val(GetProjectContactById[0].ClientName);
  $("#txt_EmailId").val(GetProjectContactById[0].EmailId);
  $("#txt_PhoneNo1").val(GetProjectContactById[0].PhoneNo1);
  $("#txt_PhoneNo2").val(GetProjectContactById[0].PhoneNo2);
  $("#dl_Designation").val(GetProjectContactById[0].Designation);
  $("#txt_Notes").val(GetProjectContactById[0].Notes);
  $("#dl_Country").val(GetProjectContactById[0].CountryId);
  getStates(GetProjectContactById[0].CountryId);
  getCity(GetProjectContactById[0].StateId);
  setTimeout(function(){ 
    $("#dl_State").val(GetProjectContactById[0].StateId);
    $("#dl_City").val(GetProjectContactById[0].CityId);
  }, 1000);

  $("#txt_FaxNo").val(GetProjectContactById[0].FaxNo);
  $("#txt_SkypeId").val(GetProjectContactById[0].SkypeId);
  $("#dl_FromEmail").val(GetProjectContactById[0].FromEmailId);

  (GetProjectContactById[0].IsPrimary) ? $("#Is_Primary").prop('checked', true) : $('#Is_Primary').prop('checked', false);
  (GetProjectContactById[0].TimesheetTo) ? $("#Timesheet_To").prop('checked', true) : $('#Timesheet_To').prop('checked', false);
  (GetProjectContactById[0].TimesheetCC) ? $("#Timesheet_CC").prop('checked', true) : $('#Timesheet_CC').prop('checked', false);

}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function btn_AddContacts() {
  let err = 0;

  if ($('#txt_ClientName').val() == '') {
    $(".txtClientName_error").html('Client Contact Name is required');
    err = 1;
  }else {
    $(".txtClientName_error").html('');
  }
  if ($('#txt_EmailId').val() == '') {
    $(".txtEmailId_error").html('Email ID is required');
    err = 1;
  }else if(!validateEmail($('#txt_EmailId').val())){
    $(".txtEmailId_error").html('Invalid Email Id');
    err = 1;
  }else {
    $(".txtEmailId_error").html('');
  }

  if ($('#dl_FromEmail').val() == 0) {
    $(".dlFromEmail_error").html('From Email is required');
    err = 1;
  } else {
    $(".dlFromEmail_error").html('');
  }

  if (err == 1) {
    return false;
  } else {
    $(".loader").show();
      data = {
        "Method": "PostProjectContacts",
        "Data": {
          "Token": localStorage.getItem('securityToken'),
          "ProjectContactId": ($("#hdn_ProjectContactId").val() != '') ? $("#hdn_ProjectContactId").val() : null,
          "ProjectId": ($("#contacts-ProjectId").val() != '' && $("#contacts-ProjectId").val() != null) ? $("#contacts-ProjectId").val() : null,
          "ClientContactId": ($('#txt_ClientName').val()!='') ? $('#txt_ClientName').val() : null,
          "ClientContactName": ($('#txt_ClientName').val()!='') ? $('#txt_ClientName').val() : null,
          "EmailId": ($('#txt_EmailId').val() != '') ? $('#txt_EmailId').val() : null,
          "PhoneNo1": ($('#txt_PhoneNo1').val() != '') ?Number($('#txt_PhoneNo1').val()):null,
          "PhoneNo2": ($('#txt_PhoneNo2').val() != '') ? Number($('#txt_PhoneNo2').val()) : null,
          "Designation": ($('#dl_Designation').val()!='')?$('#dl_Designation').val():null,
          "Notes": ($('#txt_Notes').val()!='')?$('#txt_Notes').val():null,
          "Country": ($('#dl_Country').val()!='')?$('#dl_Country').val():null,
          "State": ($('#dl_State').val()!='')?$('#dl_State').val():null,
          "City": ($('#dl_City').val()!='')?$('#dl_City').val():null,
          "FaxNo": ($('#txt_FaxNo').val()!='')? Number($('#txt_FaxNo').val()):null,
          "SkypeId": ($('#txt_SkypeId').val()!='')?$('#txt_SkypeId').val():null,
          "FromEmailId": $('#dl_FromEmail').val(),
          "IsPrimary": ($('#Is_Primary').is(":checked")) ? 1 : 0,
          "TimesheetTo": ($('#Timesheet_To').is(":checked")) ? 1 : 0,
          "TimesheetCC": ($('#Timesheet_CC').is(":checked")) ? 1 : 0,
          "IsActive": 1,
          "Status": "",
          "Message": "",
        }
      }
  
      var postCall = PostDataCall(data);
      $(".loader").hide();
      if (postCall['IsSuccess'] == true) {
        var swalEMRSucc = {
          title: 'Success!',
          text: postCall['Message'],
          icon: "success"
        }
        swalAlert(swalEMRSucc); 
        clear_ProjectContact();
        toggle_ProjectContacts();
        get_projectContacts();
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

$("#addproject-contacts").ready(function() {
  getCountries();
});

function getCountries(){
  let filter_val = JSON.stringify();
  let result = callgetlist('GetCountries', filter_val);
  let options = "<option value=''>Select Country</option>";
  for (let i = 0; i < result.length; i++) {
    options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
  }
  $("#dl_Country").html(options);
}

$("#dl_Country").on('change', function() {
  getStates(this.value)
});

function getStates(country){
  let filter_State_val = JSON.stringify({
    "Token": localStorage.getItem('securityToken'),
    "CountryId": country
  });
  let result = callgetlist('GetStates', filter_State_val);
  let options = "<option value=''>Select State</option>";
  for (let i = 0; i < result.length; i++) {
    options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
  }
  $("#dl_State").html(options);
}

$("#dl_State").on('change', function() {
  getCity(this.value)
});

function getCity(state){
  let filter_val = JSON.stringify({
    "Token": localStorage.getItem('securityToken'),
    "StateID": state
  });
  let result = callgetlist('GetCities', filter_val);
  let options = "<option value=''>Select City</option>";
  for (let i = 0; i < result.length; i++) {
    options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
  }
  $("#dlCity").html(options);
}

function clear_ProjectContact() {
  $('#addproject-contacts').collapse('hide');
  $('#addproject-contacts input').val('');
  $("#addproject-contacts input").prop("checked", false);
  $("#addproject-contacts select").val(0);
  $("#addproject-contacts textarea").val('');
  $("#addproject-contacts .dlerror_messgae").html('');
}

function toggle_ProjectContacts(){

  if(toggleContacts){
    $('#addproject-contacts').collapse('show')
    toggleContacts = false;
  }else{
    $('#addproject-contacts').collapse('hide');
    toggleContacts = true;
  }
};

function deleteProjectContacts(ProjectContactId) {
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
      var id = ProjectContactId;
      data = {
        "Method": "DeleteProjectContacts",
        "Data": {
        "ProjectContactId":id,       
        "Status": 1,
        "Message": ""
        }
      }

      var postCall = PostDataCall(data);
      if (postCall['IsSuccess'] == true) {
        clear_ProjectContact();
        get_projectContacts();
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

function renderProjectContactGrid(data) {
  var ProjectDataGrid = $("#display_ProjectContacts")
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
            get_projectContacts();
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
      caption: "S.No",
      dataField: "sno",
      cssClass: "rno",
      allowGrouping: false,
      allowCollapsing: false,
      allReordering: false,
      width: 70,
      cellTemplate: function (container, options) {
      container.text(
        ProjectDataGrid.pageIndex() * ProjectDataGrid.pageSize() + options.rowIndex + 1
      );
      },
    },
    {
      caption: "Client Name",
      dataField: "ClientName",
    },
          {
      caption: "Designation",
      dataField: "Designation",
    },
    {
      caption: "Email ID",
      dataField: "EmailId",
    },
        {
      caption: "Is Primary",
      dataField: "IsPrimary",
    },
    {
      caption: "Timesheet To",
      dataField: "TimesheetTo",
    },
    {
      caption: "Timesheet CC",
      dataField: "TimesheetCC",
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
        var ProjectContactId = options.data["Id"];
        var domActions = "";
        domActions +=
          `<button class='btn btn-xs btn-primary edit-btn' onclick=updateProjectContacts("${ProjectContactId}");><i class='fas fa-pencil-alt'></i></button><button class='btn btn-xs btn-danger delete-btn' onclick=deleteProjectContacts("${ProjectContactId}");><i class='fas fa-trash-alt'></i></button>`;
      
    $("<div class='text-center'>")
        .append($(domActions))
        .appendTo(container);
      },
    },
    ],
  })
  .dxDataGrid("instance");
}