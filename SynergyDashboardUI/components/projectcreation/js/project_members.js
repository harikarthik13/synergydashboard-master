var toggleMembers=true;
var projectMemberToEdit = null;

var projectMembersData = [
    {
        "Employee_Id":"555",
        "Employee_Name": "Praveen",
        "Role":"Developer",
        "Projects":"Auction ABC,New Synergy",
        "Occupied_Hrs": "160",
        "Billable_Hrs":"150",
        "Total_Hrs":"150"
    },
    {
        "Employee_Id":"519",
        "Employee_Name": "John",
        "Role":"Developer",
        "Projects":"Sample",
        "Occupied_Hrs": "160",
        "Billable_Hrs":"50",
        "Total_Hrs":"160"
    }
  ];
  
  
  $(document).ready(function () {  
   
  
  });

  function getProjectMembers() {
    projectMemberToEdit = null;
    var fil_val_GetProjectMembers = JSON.stringify({ 
      "Token" : localStorage.getItem('securityToken'),
      "ProjectId": $("#dlProjectId").val(),
      "IsActive": 1 
    });
    var GetProjectMemberssData = callgetlist('GetProjectMembers',fil_val_GetProjectMembers);
    renderProjectMembersGrid(GetProjectMemberssData)
  }
 

  function renderProjectMembersGrid(data) {
    var ProjectMembersGrid = $("#list_employees_for_project_div")
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
							getProjectMembers();
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
            ProjectMembersGrid.pageIndex() * ProjectMembersGrid.pageSize() + options.rowIndex + 1
        );
        },
      },
      {
        caption: "Member Name",
        dataField: "DispalyName",
      },
      {
        caption: "Member Role",
        dataField: "ProjectMembersRoleName",
      },
      {
        caption: "Alias Name",
        dataField: "AliasName",
      },
      {
        caption: "Assigned Date",
        dataField: "AssignedDate",
        dataType :"date",
        format : "dd-MMM-yyyy"
      },
      {
        caption : "IsActive",
        dataField: "IsActive",
        // cellTemplate: function (container, options) {
        //   var domActions = "";
        //   if(options.data["IsActive"] == true){
        //     domActions += "<span class='pull-left'>Yes</span>";
        //   }else{
        //     domActions += "<span class='pull-left'>No</span>";
        //   }
        // },
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
        var EmployeeId = options.data["EmployeeId"];
        var ProjectRoleId = options.data["ProjectRoleId"];
        var ProjectMembersId = options.data["ProjectMembersId"];
        var aliasname = options.data["AliasName"];
        var memberAssignedDate = options.data["AssignedDate"];
        var IsActive = (options.data["IsActive"] == 1)?1:0;
        if($("#dlProjectIsClosed").val() == 0){
          var domActions = "";
          domActions +=
            `<button class='btn btn-xs btn-primary edit-btn' onclick='projectMemberEdit("${EmployeeId}", "${ProjectRoleId}", "${ProjectMembersId}", "${aliasname}", "${memberAssignedDate}", "${IsActive}")'><i class='fas fa-pencil-alt'></i></button>`;
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

  function clearProjectMembers() {
    $('#add-project-members input').val(0);
    $("#add-project-members .error_message").html('');
    $('#add-project-members').collapse('hide');
  }

  function btnAddProjectMembers() {

		let err = 0;

		if ($('#pc_projectMember').val() == 0) {
		$(".pc_projectMember_error").html('This Field is required');
		err = 1;
		} else {
		  $(".pc_projectMember_error").html('');
		}

    if ($('#pc_projectMemberRole').val() == 0) {
    $(".pc_projectMemberRole_error").html('This Field is required');
      err = 1;
    } else {
      $(".pc_projectMemberRole_error").html('');
    }

		if (err == 1) {
			return false;
		} else {
      var data;
      if($("#dlProjectIsClosed").val() != 1){
        if (projectMemberToEdit){
          data = {
            "Method": "PostProjectMembers",
            "Data": {
              "Token": localStorage.getItem('securityToken'),
              "ProjectMembersId": projectMemberToEdit,
              "ProjectId": ($("#dlProjectId").val() != '' && $("#dlProjectId").val() != null) ? $("#dlProjectId").val() : null,
              "EmployeeId": $('#pc_projectMember').val(),
              "ProjectRoleId": $('#pc_projectMemberRole').val(),
              "AliasName" : ($('#PCalias-name').val()!='') ? $('#PCalias-name').val() : null,
              "AssignedDate" : ($('#PCmemberAssignedDate').dxDateBox("instance").option("value") == "") ? null : fromtodateFormat($('#PCmemberAssignedDate').dxDateBox("instance").option("value")),
              "IsActive": ($('#PCmemberIsActive').is(":checked"))?1:0,
              "Status": "",
              "Message": "",
    
            }
          }
        } else {
          data = {
            "Method": "PostProjectMembers",
            "Data": {
              "Token": localStorage.getItem('securityToken'),
              "ProjectMembersId": null,
              "ProjectId": ($("#dlProjectId").val() != '' && $("#dlProjectId").val() != null) ? $("#dlProjectId").val() : null,
              "EmployeeId": $('#pc_projectMember').val(),
              "ProjectRoleId": $('#pc_projectMemberRole').val(),
              "AliasName" : ($('#PCalias-name').val()!='') ? $('#PCalias-name').val() : null,
              "AssignedDate" : ($('#PCmemberAssignedDate').dxDateBox("instance").option("value") == "") ? null : fromtodateFormat($('#PCmemberAssignedDate').dxDateBox("instance").option("value")),
              "IsActive": ($('#PCmemberIsActive').is(":checked"))?1:0,
              "Status": "",
              "Message": "",

            }
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
          clearProjectMembers();
          clearEditProjectMembers()
          getProjectMembers();
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

  function deleteProjectMember(ProjectMemberId) {
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
            var id = ProjectMemberId;
            data = {
              "Method": "PostUpdateProjectMembers",
              "Data": {
                "ProjectMembersId":id,  
                "IsActive":0,     
                "Status": 1,
                "Message": ""
              }
            }
		        var postCall = PostDataCall(data);
            if (postCall['IsSuccess'] == true) {
              clearProjectMembers();
              clearEditProjectMembers()
              getProjectMembers();
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

  function projectMemberEdit(EmployeeId, ProjectRoleId, ProjectMembersId,aliasname,memberAssignedDate,IsActive){

    //clear all input values
    $('#add-project-members').find('input:text').val('');
  
    toggleMembers=true;
    toggleProjectMembers();
    $("#add-project-phases .dlerror_messgae").html('');

    $('#pc_projectMember').val(EmployeeId).trigger('change');
    $('#pc_projectMemberRole').val(ProjectRoleId);

    if(aliasname == 'null'){
      $('#PCalias-name').val('');
    }else{
      $('#PCalias-name').val(aliasname);
    }
    if(memberAssignedDate == 'null' || memberAssignedDate != '1970-01-01'){
      $('#PCmemberAssignedDate').dxDateBox("instance").option("value",'');
    }else{
      $('#PCmemberAssignedDate').dxDateBox({ type: 'date', value: memberAssignedDate, displayFormat: 'dd-MMM-yyyy'});
    }
    if(IsActive == 'null'){
      $('#PCmemberIsActive').prop('checked', false);
    }else{
      if(IsActive == 1){
        $('#PCmemberIsActive').prop('checked', true);
      }else{
        $('#PCmemberIsActive').prop('checked', false);
      }
    }

    projectMemberToEdit = ProjectMembersId;
    // clearProjectMembers();
    $('#pc_projectMember').prop('disabled',true);
  }

  function toggleProjectMembers()
  {
  if(toggleMembers)
  {
    $('#add-project-members').collapse('show')
    toggleMembers = false;
  }
  else
  {
    $('#add-project-members').collapse('hide');
    toggleMembers = true;
  }

  };

  function clearEditProjectMembers() {
    projectMemberToEdit = null;
    $('#pc_projectMember').val('').trigger('change');
    $('#pc_projectMemberRole').val(0);
    $('#pc_projectMember').prop('disabled',false);
    $('#PCalias-name').val('');
    $('#PCmemberAssignedDate').dxDateBox("instance").option("value",'');
    $('#PCmemberIsActive').prop('checked', false);
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
   return fromDate = (month + "/" + day + "/" + year);
  }