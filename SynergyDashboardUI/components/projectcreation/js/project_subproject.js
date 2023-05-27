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
      "ProjectId": ($("#dlProjectId").val() != '') ? $("#dlProjectId").val() : localStorage.getItem('ProjectId'),
      "IsActive": true
    });
    var projectSubProjectData = callgetlist('GetSubProjects', filter_val);
    render_ProjectSubProjectGrid(projectSubProjectData);
  }

  
  //new-sub-project
  $(document).ready(function () {   
    // render_ProjectSubProjectGrid(projectSubProjectData);
    getSubProjectDetails();

    var fil_value = JSON.stringify({ "Token": localStorage.getItem('securityToken'),"IsActive": 1 });
    var GetProjectDomain = callgetlist('GetProjectDomain', fil_value);

    if (GetProjectDomain.length > 0) {
      $('#dlSubProjectDomain').html('<option value="0">Select Project Domain</option>');
      GetProjectDomain.forEach(function (GetProjectDomain, i) {
        $('#dlSubProjectDomain').append('<option value="' + GetProjectDomain.Id +'">' + GetProjectDomain.ProjectDomain + '</option>');
      });
    } else {
      $('#dlSubProjectDomain').append('<option value="0">No datas Found</option>');
    }
  });

  function SubProjectClientName(keyword){
    $("#dlSubClientName").empty();
    var filter_val = JSON.stringify({
      keyword: keyword,
      User_Id: localStorage.getItem("EmployeeID")
    });
    var result = callgetlist("GetClientDetails", filter_val);
    var options = "";
    for (var i = 0 ; i < result.length; i++) {
      options += "<option value='" + result[i].Cgvak_Comh_Icode +"'>" + result[i].Cgvak_Comh_Name + "</option>";
    }
    $("#dlSubClientName").html(options);  
    let selectEl = $("#dlSubClientName")
    let val = selectEl.data("select2").dropdown.$search.val()
    selectEl.val(null).trigger('change');
    selectEl.select2('close');
    selectEl.select2('open');
    selectEl.data("select2").dropdown.$search.val(val)
  }

  function render_ProjectSubProjectGrid(data) {
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
        var rfpId = options.data[""]
        var SubProjectId = options.data["SubProjectId"];
        var SubProjectName = options.data["SubProjectName"];
        var ProjectDomain = options.data["ProjectDomain"];
        var ProjectDescription = options.data["ProjectDescription"];
        var PlannedStartDate = options.data["PlannedStartDate"];
        var PlannedEndDate = options.data["PlannedEndDate"];
        var ClientName = options.data["ClientName"];
     
        if($("#dlProjectIsClosed").val() == 0){
          var domActions = "";
          domActions +=
            `<button class='btn btn-xs btn-primary edit-btn' onclick='sub_ProjectEdit("${SubProjectId}","${SubProjectName}","${ProjectDomain}","${ProjectDescription}","${PlannedStartDate}","${PlannedEndDate}","${ClientName}")';><i class='fas fa-pencil-alt'></i></button>`;
        }
          $("<div class='text-center'>")
            .append($(domActions))
            .appendTo(container);
        },
      },
      ],
    })
    .dxDataGrid("instance");
  }

  function clearSubProject() {
    $(':input').val('');
    $(':input').prop("checked",false);
    $("#new-sub-project .dlerror_messgae").html(''); 
  }
  
  function validateSubProject() {
    let err = 0;
  
    if ($("#txtSubProjectName").val() == "") {
        $(".txtSubProjectName_error").html('This Field is required');
        err = 1;
    } else {
        $(".txtSubProjectName_error").html('')
    }
    
    if ($("#dtpProjectPlannedStartDate").dxDateBox("instance").option("value") == "") {
      $(".dtpProjectPlannedStartDate_error").html('This Field is required');
      err = 1;
    } else {
        $(".dtpProjectPlannedStartDate_error").html('')
    }
    if ($("#dtpProjectEndDate").dxDateBox("instance").option("value") == "") {
      $(".dtpProjectEndDate_error").html('This Field is required');
      err = 1;
    } else {
        $(".dtpProjectEndDate_error").html('')
    }
    if ($("#dlSubProjectDomain").val() == "0") {
      $(".dlSubProjectDomain_error").html('This Field is required');
      err = 1;
    } else {
        $(".dlSubProjectDomain_error").html('')
    }
    if ($("#dlSubClientName").val() == "0") {
      $(".dlSubClientName_error").html('This Field is required');
      err = 1;
    } else {
        $(".dlSubClientName_error").html('')
    }


    if ($("#txtSubProjectDescription").val() == "") {
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
          "SubProjectId"       : ($("#hiddenSubProjectId").val() != '') ? $("#hiddenSubProjectId").val() : null,
          "ProjectId"          : ($("#dlProjectId").val() != '') ? $("#dlProjectId").val() : null,
          "Name"               : ($('#txtSubProjectName').val()!='') ? $('#txtSubProjectName').val() : null,
          "PlannedStartDate"   : ($('#dtpProjectPlannedStartDate').dxDateBox("instance").option("value") !='') ? $('#dtpProjectPlannedStartDate').dxDateBox("instance").option("value") : null,
          "PlannedEndDate"     : ($('#dtpProjectEndDate').dxDateBox("instance").option("value") !='') ? $('#dtpProjectEndDate').dxDateBox("instance").option("value") : null,
          "ClientName"         : ($('#dlSubClientName').val()!='') ? $('#dlSubClientName').val() : null,
          "ProjectDomain"	     : ($('#dlSubProjectDomain').val()!='') ? $('#dlSubProjectDomain').val() : null,
          "ProjectDescription" : ($('#txtSubProjectDescription').val()!='') ? $('#txtSubProjectDescription').val() : null,
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

function sub_ProjectEdit(SubProjectId,SubProjectName,ProjectDomain,ProjectDescription,PlannedStartDate,PlannedEndDate,ClientName){
  debugger;
  //clear all input values
  $('#new-sub-project').find('input:text').val('');

  var dlClientName = $("#ClientName").val();

  toggleMembers=true;
  toggle_SubProjects();
  $("#new-sub-project .dlerror_messgae").html('');

  $('#hiddenSubProjectId').val(SubProjectId);
  $('#txtSubProjectName').val(SubProjectName);

  if(PlannedStartDate == 'null'){
    $('#dtpProjectPlannedStartDate').dxDateBox("instance").option("value",'');
  }else{
    $('#dtpProjectPlannedStartDate').dxDateBox({ type: 'date', value: PlannedStartDate, displayFormat: 'dd-MMM-yyyy'});
  }

  if(PlannedEndDate == 'null'){
    $('#dtpProjectEndDate').dxDateBox("instance").option("value",'');
  }else{
    $('#dtpProjectEndDate').dxDateBox({ type: 'date', value: PlannedEndDate, displayFormat: 'dd-MMM-yyyy'});
  }

  $('#dlSubProjectDomain').val(ProjectDomain).trigger('change');

  if(ClientName == 'null'){
    $('#dlSubClientName').val(dlClientName);
  }else{
    $('#dlSubClientName').val(ClientName);
  }

  if(ProjectDescription == 'null'){
    $('#txtSubProjectDescription').val('');
  }else{
    $('#txtSubProjectDescription').val(ProjectDescription);
  }
}

function toggle_SubProjects(){
  if(toggleMembers){
    $('#new-sub-project').collapse('show')
    toggleMembers = false;
  }else{
    $('#new-sub-project').collapse('hide');
    toggleMembers = true;
  }

}