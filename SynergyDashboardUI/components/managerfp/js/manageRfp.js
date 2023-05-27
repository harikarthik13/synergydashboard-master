
var managerfp_Description_dxeditor;
var deletemanage_rfp_comment_dxEditor;

$(document).ready(function () {
  getManageRfpList();
  getReAssignNameList();  

  managerfp_Description_dxeditor = $('#managerfp_Description_dxeditor').dxHtmlEditor({
		height: 500,
		value: '',
		toolbar: {
		items: [
			'undo', 'redo', 'separator',
			{
			name: 'size',
			acceptedValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'],
			},
			{
			name: 'font',
			acceptedValues: ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'],
			},
			'separator', 'bold', 'italic', 'strike', 'underline', 'separator',
			'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'separator',
			'orderedList', 'bulletList', 'separator',
			{
			name: 'header',
			acceptedValues: [false, 1, 2, 3, 4, 5],
			}, 'separator',
			'color', 'background', 'separator',
			'link', 'image', 'separator',
			'clear', 'codeBlock', 'blockquote', 'separator',
			'insertTable', 'deleteTable',
			'insertRowAbove', 'insertRowBelow', 'deleteRow',
			'insertColumnLeft', 'insertColumnRight', 'deleteColumn',
		],
		},
		mediaResizing: {
		enabled: true,
		},
	}).dxHtmlEditor('instance');
	managerfp_Description_dxeditor.option('toolbar.multiline', true);

  deletemanage_rfp_comment_dxEditor = $('#deletemanage_rfp_comment_dxEditor').dxHtmlEditor({
		height: 300,
		value: '',
		toolbar: {
		items: [
			'undo', 'redo', 'separator',
			{
			name: 'size',
			acceptedValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'],
			},
			{
			name: 'font',
			acceptedValues: ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'],
			},
			'separator', 'bold', 'italic', 'strike', 'underline', 'separator',
			'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'separator',
			'orderedList', 'bulletList', 'separator',
			{
			name: 'header',
			acceptedValues: [false, 1, 2, 3, 4, 5],
			}, 'separator',
			'color', 'background', 'separator',
			'link', 'image', 'separator',
			'clear', 'codeBlock', 'blockquote', 'separator',
			'insertTable', 'deleteTable',
			'insertRowAbove', 'insertRowBelow', 'deleteRow',
			'insertColumnLeft', 'insertColumnRight', 'deleteColumn',
		],
		},
		mediaResizing: {
		enabled: true,
		},
	}).dxHtmlEditor('instance');
	deletemanage_rfp_comment_dxEditor.option('toolbar.multiline', true);
});

var Manage_EmployeeID = localStorage.getItem("EmployeeID");
var commentsContent = new Array();
var manageRFPURL = SynergyAPIURL;
var ManageRfpSecurityToken = localStorage.getItem("securityToken");
var ManageRfpEstimnateDdate;
var isNextRfpReassign = false;  

$('#manageProposalModals a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var target = $(e.target).attr("href") // activated tab
  if(target == "#manage_tab_reassign" || target == "#manage_tab_take_ownersihp")
  {
    isNextRfpReassign = false
  }
  if (target == "#manage_tab_reassign") {
    $("#manage_tab_comments_li").addClass("disabled");
    $("#manage_tab_comments_link").removeAttr("data-toggle");
  }
  else {
    $("#manage_tab_comments_li").removeClass("disabled");
    $("#manage_tab_comments_link").attr("data-toggle","tab");
  }
  new SimpleBar(document.getElementById('manage_proposals_modal_body'));
}); 

function getManageRfpList() {
  $(".error_message").html("");
  $("input[type=text]").removeClass("required_field");
  $("select").removeClass("required_field");
  $("textarea").removeClass("required_field");

  var filter_val = JSON.stringify({
    IsActive: true
  });
  var GetAssignedRfp = callgetlist("GetAssignedinRFP", filter_val);
  renderManageRFPGrid(GetAssignedRfp);
  // var NewManageRfpListHtml = NewManageRfpListcomputeHTML(GetAssignedRfp);

  // $("#DisplayManageListTable").html(NewManageRfpListHtml);
}


function NewManageRfpListcomputeHTML(GetAssignedRfp) {
  var html = "";
  if (GetAssignedRfp.length == 0) {
    html += "<tr><td colspan='8'>No Data Found.!</td></tr>";
  } else {
    GetAssignedRfp.forEach(function (key, item) {
      sno = item + 1;
      html += "<tr class='row_" + item + "' id='row_" + key.RequestForProposalId + "'>";
      html += "<td>" + sno + "</td>";
      html += "<td>" + key.ReceivedDate + "</td>";
      html += "<td>" + key.BDE_Name + "</td>";
      html += "<td>" + key.ClientName + "</td>";
      html += "<td>" + key.ProjectTitle + "</td>";
      html += "<td>" + key.Status + "</td>";
      html +=
        "<td><button class='btn btn-xs btn-primary' onclick=openManageProposalModels('" + key.RequestForProposalId + "');><i class='fas fa-pencil-alt'></i></button>";
      html += "</tr>";
    });
  }
  return html;
}

function renderManageRFPGrid(data) {
  var manageRfpDataGrid = $("#sddgd-manageRfp")
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
      onToolbarPreparing: function (e) {
        var dataGrid = e.component;
        e.toolbarOptions.items.unshift({
            location: "after",
            widget: "dxButton",
            options: {
                icon: "refresh",
                onClick: function () {                            
                  getManageRfpList();
                }
            }
        });
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
              manageRfpDataGrid.pageIndex() * manageRfpDataGrid.pageSize() + options.rowIndex + 1
            );
          },
        },
        {
          caption: "RFP Date",
          dataField: "ReceivedDate",
          dataType :"date",
          format : "dd-MMM-yyyy"
        },
        {
          caption: "BDE Name",
          dataField: "BDE_Name",
        },
        {
          caption: "Client Name",
          dataField: "ClientName",
        },
        {
          caption: "ProjectTitle",
          dataField: "ProjectTitle",
        },
        {
          caption: "Status",
          dataField: "Status",
          selectedFilterOperation: "=",
          filterValue: "RFP Assigned"
        },
        {
          caption: "Old RFP Status",
          dataField: "RFP_OS_Status",
        },
        {
          dataField: "",
          caption: "Action",
          width: 100,
          allowFiltering:false, 
          allowGrouping: false, 
          allowReordering: false, 
          allowSorting: false, 
          allowCollapsing: false, 
          allowExporting: false,
          cellTemplate: function (container, options) {
            var rfpId = options.data["RequestForProposalId"]
            var ProjectName = options.data["ProjectTitle"];
            var RFP_ICode = options.data["RFPICode"];
            var domActions = "";
            domActions +=
              "<button class='btn btn-xs btn-primary edit-btn' onclick=openManageProposalModels('" +
              rfpId +
              "')><i class='fas fa-pencil-alt'></i></button>";
              // domActions += `<button class='btn btn-xs btn-primary edit-btn' onclick='openCommentsHistoryForProposals("${rfpId}","${ProjectName}")'><i class='fas fa-comments'></i></button>`
              domActions +=
                `<button class='btn btn-xs btn-danger delete-btn' onclick='DeleteRfpData("${rfpId}","${ProjectName}","${RFP_ICode}")'><i class='fas fa-trash-alt'></i></button>`;
            $("<div class='text-center'>")
              .append($(domActions))
              .appendTo(container);
          },
        },
      ],
    })
    .dxDataGrid("instance");
}

function getReAssignNameList() {
  var filter_val = JSON.stringify({
    IsActive: true
  });
  var result = callgetlist("GetRFPTechInCharge", filter_val);
  result.forEach(function (item) {
    if(item.Id != Manage_EmployeeID)
    {
      $("#manage_reassignto").append($("<option></option>").attr("value", item.Id).text(item.Name)).select2();
    }
  });
}

function openManageProposalModels(RequestForProposalId) {

  $('#manageProposalModals').modal('show');
  commentsContent = new Array();
  $('.nav-tabs a[href="#manage_tab_take_ownersihp"]').show();
  $("#save_manage_rfp_reassign").show();
  $("#manage_rfp_reassign_cancel").show();
  $('.nav-tabs a[href="#manage_tab_reassign"]').show();
  $("#manage_rfp_save_ownership").show();
  $("#manage_rfp_ownership_cancel").show();
  
  if (!$.datepicker.initialized) {
    $(document).mousedown($.datepicker._checkExternalClick)
        // !!!!!!!!!!
        // The next code line has to be added again so that the date picker
        // shows up when the popup is opened more than once without reloading
        // the "base" page.
        // !!!!!!!!!!
        .find(document.body).append($.datepicker.dpDiv);
    $.datepicker.initialized = true;
}

  $('#manage_newexpecteddate').datepicker({
    dateFormat: 'dd-M-yy',
    minDate : 1
  }); 

  // try {
  //   CKEDITOR.instances['managerfp_Description_ckeditor'].destroy();
  // } catch (e) {
  // }

  // var managerfp_Description_ckeditor = CKEDITOR.replace(
  //   "managerfp_Description_ckeditor",
  //   {});

  // managerfp_Description_ckeditor.on("paste", function (evt) {
  //   if (evt.data.dataTransfer.getFilesCount() > 0) {
  //       var manageDescriptionFile = evt.data.dataTransfer.getFile(0);
  //       var manageDescriptionReader = new FileReader();
  //       manageDescriptionReader.onload = function (evt) {
  //           var manageDescriptionPictureElement = managerfp_Description_ckeditor.document.createElement(
  //               "img",
  //               {
  //                   attributes: {
  //                       src: evt.target.result
  //                   }
  //               }
  //           );

  //           setTimeout(function () {
  //               managerfp_Description_ckeditor.insertElement(
  //                   manageDescriptionPictureElement
  //               );
  //           }, 0);
  //       };
  //       manageDescriptionReader.readAsDataURL(manageDescriptionFile);
  //   }
  // });

  var filter_val = JSON.stringify({
    "IsActive": true
  });

  var getTechnology = callgetlist("GetTechnology", filter_val);
  var filter_val2 = JSON.stringify({
    "RFPId": RequestForProposalId
  });

  var filter_val3 = JSON.stringify({
    "RFPId": RequestForProposalId
  });

  var filter_val4 = JSON.stringify({

  });

  var filter_val5 = JSON.stringify({

  });

  var filter_val6 = JSON.stringify({

  });

  var getApplicationType = callgetlist("GetApplicationTypes", filter_val4);
  $('#manageRfpApplicationtype').html("<option value='0'>-----Select Application Type-----</option>");
  getApplicationType.forEach(function (item) {
    $('#manageRfpApplicationtype').append($("<option></option>").attr("value", item.ApplicationTypeICode).text(item.ApplicationType));
  });

  var getEndUserIndustry = callgetlist("GetEndUserIndustries", filter_val5);
  $('#manage_userIndustry').html("<option value='0'>-----Select End User Industry-----</option>");
  getEndUserIndustry.forEach(function (item) {
    $('#manage_userIndustry').append($("<option></option>").attr("value", item.EnduserICode).text(item.EnduserIndustry));
  });

  var getRfpStatus = callgetlist("GetRFPStatusManage", filter_val6);
  $('#manage_rfpStatus').html(" <option value='0'>-----Select Rfp Status-----</option>");
  getRfpStatus.forEach(function (item) {    
    $('#manage_rfpStatus').append($("<option></option>").attr({"value": item.Statuscode,"rfpstatus": item.RFPStatusId}).text(item.Status));
  });

  var getRFPForManageById = callgetlist("GetRFPForAssignById", filter_val2);
  
  var getTechnologiesForManageRFP = callgetlist("GetTechnologiesForAssignRFP", filter_val3);

  if (getRFPForManageById != null) {
    $(".error_message").html("");
    if(getRFPForManageById[0].ISOwner == true)
    {
      $("#manage_tab_reassign_li").addClass("disabled");
      $("#manage_tab_reassign_link").removeAttr("data-toggle");
      var GetEndUserFilters = JSON.stringify({
        "RFPId": getRFPForManageById[0].RFPICode
      });
      var GetRfpEndUser = callgetlist("GetRFPDetailsByRFPId", GetEndUserFilters);
      $("#manage_userIndustry").val(GetRfpEndUser[0].EndUserIndustry);
      $("#manage_userIndustry").attr("disabled",true);     
    }
    else{
      $("#manage_tab_reassign_li").removeClass("disabled");
      $("#manage_tab_reassign_link").attr("data-toggle","tab");
      $("#manage_userIndustry").attr("disabled",false);
    }
    $("#manage_rfp_RFPId").val(getRFPForManageById[0].RFPId);
    $("#manage_rfp_RFPICode").val(getRFPForManageById[0].RFPICode);
    $("#manageRfpClientName").val(getRFPForManageById[0].ClientName);
    $("#manageRfpProjectTitle").val(getRFPForManageById[0].ProjectTitle);
    $("#manageRfpApplicationtype option:contains(" + getRFPForManageById[0].ApplicationType + ")").attr('selected', 'selected');
    $("#manageRfpEstimatedDate").val(getRFPForManageById[0].EstimationNeededOn);
    $("#manage_RfpClientName2").val(getRFPForManageById[0].ClientName);
    $("#manage_RfpProjectTitle2").val(getRFPForManageById[0].ProjectTitle);
    $('#manage_rfpStatus').find("option[rfpstatus=" + getRFPForManageById[0].StatusCode +"]").attr('selected', true);
  }

  $('#manage_technology').find('option').remove();
  getTechnology.forEach(function (item) {
    $('#manage_technology').append($("<option></option>").attr("value", item.SkillId + "-" + item.SkillVersionId).text(item.Skill)).select2();
  });
  var technologyArray = new Array();
  getTechnologiesForManageRFP.forEach(function (item) {
    $('#manage_technology').val(item.SkillId + "-" + item.SkillVersionId);
    technologyArray.push(item.SkillId + "-" + item.SkillVersionId);
    $('#manage_technology').val(technologyArray);
    $('#manage_technology').select2();
    getManageCommentsHistory(RequestForProposalId);
  });
}


function bindManageRfpTechnologyString() {
  var technologysToAppend = "";
  var selMulti = $("#manage_technology option:selected").each(function () {
    technologysToAppend += technologysToAppend == "" ? "" : ",";
    technologysToAppend += $(this).text();
  });
  return technologysToAppend;
}

function downloadDocumentRFP(RFPFileId) {
  swal({
    title: "Are you sure?",
    text: "You want to download the File",
    icon: "warning",
    buttons: true,
  })
    .then((willDownload) => {
      if (willDownload) {
        window.open(manageRFPURL + "DownloadFile?query=GetDownloadRFPFile&filters={'FileId':'" + RFPFileId + "'}&Token=" + ManageRfpSecurityToken, '_blank');
      }
    });
}


function getManageCommentsHistory(RFPId) {
  var filter_val = JSON.stringify({
    "RFPId": RFPId,
    "IsActive": 1
  });
  var getManageRFPComments = callgetlist("GetCommentsinRFP", filter_val);
  var rfp_comment_history_html = "";
  var rfp_no_comments_count = 0;
  var Rfp_no_documentsCount = 0;
  getManageRFPComments.forEach(function (item) {
    var rfp_created_date = new Date(item.CreatedDate);
    var rfp_date_month_year = rfp_created_date.toLocaleDateString();
    var rfp_time = rfp_created_date.toLocaleTimeString();
    if (item.DocumentType == "Comment" && item.Content != null) {
      commentsContent[item.Id] = item.Content.toString();
      rfp_comment_history_html += "<small class='pull-left' style='padding-top:5px'><span>" + item.EmployeeName + ":</span></small>";
      rfp_comment_history_html += "<div class='manage_comment' onclick=status_msg('" + item.Id + "')>";
      rfp_comment_history_html += "<small class='pull-right'><span>" + rfp_date_month_year + "</span><span>" + rfp_time + "</span></small>";
      var commentElement = $(commentsContent[item.Id]);
      if (commentsContent[item.Id].includes("<img")) {
        commentElement.find('img').remove();
        rfp_comment_history_html += "<small>Message contains some image(s) click to expand</small>";
      }
      rfp_comment_history_html += "<label>" + commentElement.html() + "</label></div>";
    }
    if (item.DocumentType == "Document" && item.Content != null) {
      rfp_comment_history_html += "<small class='pull-left' style='padding-top:5px'><span>" + item.EmployeeName + ":</span></small>";
      rfp_comment_history_html += "<div class='manage_comment'>";
      rfp_comment_history_html += "<small class='pull-right'><span>" + rfp_date_month_year + "</span><span>" + rfp_time + "</span></small>";
      rfp_comment_history_html += "<small style='padding-bottom:10px'><b>" + item.DocumentName + "." + item.DocumentExtension + " </b></small>";
      rfp_comment_history_html += "<b>Download-file: </b><button class='btn btn-primary btn-xs' onclick=downloadDocumentRFP('" + item.Id + "')><span class='glyphicon glyphicon-arrow-down'></span></button></div>";

    }
  
   if(item.DocumentType == "Comment" && item.Content == null)
   {
    rfp_no_comments_count += 1;      
   }
   if(item.DocumentType == "Document" && item.Content == null)
   {
    Rfp_no_documentsCount += 1;      
   }
 });
 if(rfp_no_comments_count > 0 && Rfp_no_documentsCount > 0 )
 {
  rfp_comment_history_html = "<h3 class='text-center'>There are No Comments and Documents Yet</h3>";
 }
  $("#manage_comments_documents").html(rfp_comment_history_html);
}

function status_msg(ContentId) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = commentsContent[ContentId];
  swal({
    title: 'Comment Content',
    content: wrapper
  });
}


$("#next_manage_rfp_reassign").on("click", function () {

  var RfpId = $("#manage_rfp_RFPICode").val();

  isNextRfpReassign = true;

  if ($("#manage_reassignto").val() == 0) {
    $("#manage_reassigntoError").html("Please Select Employee To Reassign");
    $("#manage_reassignto").focus();

  }
  if ($("#manage_newexpecteddate").val() == 0) {
    $("#manage_newexpecteddateError").html("Please Select New Expected Date field");
    $("#manage_newexpecteddate").focus();
  }
  if ($("#manage_reassignto").val() != "0" && $("#manage_newexpecteddate").val() != "") {
    $('.nav-tabs a[href="#manage_tab_comments"]').tab("show");

  }
  new SimpleBar(document.getElementById('manage_proposals_modal_body'));

});

$("#manage_rfp_previous").on("click", function () {
  $('.nav-tabs a[href="#manage_tab_reassign"]').tab("show");
  new SimpleBar(document.getElementById('manage_proposals_modal_body'));
});

$("#manage_rfp_reassign_save").on("click", function () {
  if(isNextRfpReassign == true)
  {
    var RfpId = $("#manage_rfp_RFPICode").val();
    if ($("#manage_reassignto").val() == "0" && $("#manage_newexpecteddate").val() == ""){
      swal({
              title: "Error",
              text: "Some fields are Empty....Please check the fields",
              icon: "warning",
              dangerMode: true,
            })
    }
  
    if ($("#manage_reassignto").val() != "0" && $("#manage_newexpecteddate").val() != "") {
      swal({
        title: "Are you sure?",
        text: "You want to Reassign the RFP to " + $("#manage_reassignto option:selected").text(),
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willAssign) => {
          if (willAssign) {
            SaveReassignOldRfp(RfpId);
            saveManageRfpDocuments($("#manage_rfp_RFPId").val());
            // if (CKEDITOR.instances.managerfp_Description_ckeditor.getData() != "") {
            if (managerfp_Description_dxeditor.option("value") != "") {
              // saveManageRfpComments($("#manage_rfp_RFPId").val(), CKEDITOR.instances.managerfp_Description_ckeditor.getData());
              saveManageRfpComments($("#manage_rfp_RFPId").val(), managerfp_Description_dxeditor.option("value"));
              getManageCommentsHistory($("#manage_rfp_RFPId").val());
            }
            // CKEDITOR.instances.managerfp_Description_ckeditor.setData(""); 
            managerfp_Description_dxeditor.option("value", ""); 
            manageRfpDelay(function () {
              closeManageModal();
            }, 300);
          }
        });
    }
    // else if (CKEDITOR.instances.managerfp_Description_ckeditor.getData() != "") {
    else if (managerfp_Description_dxeditor.option("value") != "") {
      // saveManageRfpComments($("#manage_rfp_RFPId").val(), CKEDITOR.instances.managerfp_Description_ckeditor.getData());
      saveManageRfpComments($("#manage_rfp_RFPId").val(), managerfp_Description_dxeditor.option("value"));
      getManageCommentsHistory($("#manage_rfp_RFPId").val());
    }
  }
  else{
    saveManageRfpDocuments($("#manage_rfp_RFPId").val());
    // if (CKEDITOR.instances.managerfp_Description_ckeditor.getData() != "") {
    if (managerfp_Description_dxeditor.option("value") != "") {
      // saveManageRfpComments($("#manage_rfp_RFPId").val(), CKEDITOR.instances.managerfp_Description_ckeditor.getData());
      saveManageRfpComments($("#manage_rfp_RFPId").val(), managerfp_Description_dxeditor.option("value"));
      getManageCommentsHistory($("#manage_rfp_RFPId").val());
    }
    // CKEDITOR.instances.managerfp_Description_ckeditor.setData("");
    managerfp_Description_dxeditor.option("value", "");
    setTimeout(function(){
      getManageCommentsHistory($("#manage_rfp_RFPId").val());
      Dropzone.forElement("#manage_rfp_document_upload").removeAllFiles(true);
    },1000)    
  }
});

$("#manage_technology,#manage_userIndustry,#manage_rfpStatus,#manage_reassignto,#manage_newexpecteddate").change(function (event) {
  var id = event.currentTarget.id;
  $('#' + id + 'Error').empty();
});




function saveManageRfpComments(RFPId, comments) {
  var comments = {
    Token: ManageRfpSecurityToken,
    RFPId: RFPId,
    Comments: comments,
    IsActive: true
  };

  data = {
    Method: "PostCommentsinRFP",
    Data: comments
  };
  var postComments = PostDataCall(data);
}

function manageRfpDropzoneRemoveFiles() {
  Dropzone.forElement("#manage_rfp_document_upload").removeAllFiles(true);
}

function saveManageRfpDocuments(RfpId) 
{
  var ManageRfpDocumentFiles = $('#manage_rfp_document_upload').get(0).dropzone.getAcceptedFiles();
  if (ManageRfpDocumentFiles.length > 0) {
    for (i = 0; i < ManageRfpDocumentFiles.length; i++) {
      var FileExtensions = ManageRfpDocumentFiles[i].name.slice((Math.max(0, ManageRfpDocumentFiles[i].name.lastIndexOf(".")) || Infinity) + 1);
      var FileTypes = ManageRfpDocumentFiles[i].type;
      var FileNames = ManageRfpDocumentFiles[i].name.substr(0, ManageRfpDocumentFiles[i].name.lastIndexOf("."));
      var ManageRfpDocumentsFormData = new FormData();
      ManageRfpDocumentsFormData.append('file', ManageRfpDocumentFiles[i]);
      var Contentdetails =
        [{
          "DocumentTypeId": RfpId,
          "DocumentType": "RFP",
          "DocumentName":FileNames,
          "Extension": FileExtensions,
          "ContentType": FileTypes
        }]

        ManageRfpDocumentsFormData.append('Contentdetails', JSON.stringify(Contentdetails));
        var SaveManageRfpDocumentsResult = postFileGeneric(ManageRfpDocumentsFormData);
    }
  }
}

function SaveReassignOldRfp(RfpId) {
  var GetTechStreamFilters = JSON.stringify({
    "RFPId": RfpId
  });
  var GetRfpTechStream = callgetlist("GetRFPDetailsByRFPId", GetTechStreamFilters);

  $("#manage_rfp_TechStream").val(GetRfpTechStream[0].TechStream);

  var RFPStatustoReAssignedData = {
    RFPId: $("#manage_rfp_RFPICode").val(),
    TechStream: $("#manage_rfp_TechStream").val(),
    Technology: bindManageRfpTechnologyString(),
    TechPerson: $("#manage_reassignto").val(),
    AssignedBy: Manage_EmployeeID
  };

  PostRFPStatustoReassignedData = {
    Method: "PostRFPStatustoAssigned",
    Data: RFPStatustoReAssignedData
  };
  var RFPStatustoReassignedResult = PostDataCall(PostRFPStatustoReassignedData);
  if (RFPStatustoReassignedResult['IsSuccess'] == false) {
    var ReassignRfpSwalError = {
      title: "Error",
      text: RFPStatustoReassignedResult['Message'],
      icon: 'error'
    }
    ReassignRfpSwalMessage(ReassignRfpSwalError);
  }
  else {
    var RequestForProposlId = $("#manage_rfp_RFPId").val();
    saveNewReassignRfpDetails(RequestForProposlId);
  }
}

function saveNewReassignRfpDetails(RequestForProposlId) {
  var RFPReassignDetailsData = {
    Token: ManageRfpSecurityToken,
    RequestForProposalId: RequestForProposlId,
    EmployeeId: $("#manage_reassignto").val(),
    IsActive: 1,
    IsEffectiveAssign: 1,
    IsOwner: 0,
    StatusCode: 2
  };
  var PostRFPReassignDetailsData = {
    Method: "PostRFPAssignDetails",
    Data: RFPReassignDetailsData
  };
  var PostRFPReassignDetailsResult = PostDataCall(PostRFPReassignDetailsData);
  if (PostRFPReassignDetailsResult["IsSuccess"] == false) {
    var ReassignRfpSwalError = {
      title: "Error",
      text: PostRFPReassignDetailsResult['Message'],
      icon: 'error'
    }
    ReassignRfpSwalMessage(ReassignRfpSwalError);
    $("#manage_reassignto").focus();
  }
  else {
    swal({
      title: "Success",
      text: "RFP Reassigned Successfully!!!",
      icon: "success",
    })
    getManageCommentsHistory($("#manage_rfp_RFPId").val());
    closeManageModal();
    $("#manage_rfp_close_modal").trigger("click");

  }
}

$("#manage_rfp_close_modal").on("click", function () {
  closeManageModal();

});


function closeManageModal() {
  $('.nav-tabs a[href="#manage_tab_take_ownersihp"]').tab('show');
  // CKEDITOR.instances.managerfp_Description_ckeditor.setData("");
  managerfp_Description_dxeditor.option("value", "");
  $("#manage_userIndustryError").html("");
  $("#manage_rfpStatusError").html("");
  $("#manage_reassigntoError").html("");
  $("#manage_newexpecteddateError").html("");
  $("#manage_reassignto").select2('val', '0');
  $("#manage_newexpecteddate").val("");
  $("#manage_userIndustry").val("0");
  $("#manage_rfpStatus").val("0");
  manageRfpDelay(function () {
    getManageRfpList();
  }, 300);
}


$("#manage_rfp_ownership_cancel").on("click", function () {
  var RequestProposalId = $("#manage_rfp_RFPId").val();
  $("#manage_technology").val(null).trigger("change");
  var filter_valtech = JSON.stringify({
    "RFPId": RequestProposalId
  });
  var getTechnologiesForManageRFPCancel = callgetlist("GetTechnologiesForAssignRFP", filter_valtech);
  var technologysArray = new Array();
  getTechnologiesForManageRFPCancel.forEach(function (item) {
    $('#manage_technology').val(item.SkillId + "-" + item.SkillVersionId);
    technologysArray.push(item.SkillId + "-" + item.SkillVersionId);
    $('#manage_technology').val(technologysArray);
    $('#manage_technology').select2();
  });
  $("#manage_userIndustry").val("0");
  $("#manage_rfpStatus").val("0");
});

$("#manage_rfp_reassign_cancel").on("click", function () {
  $("#manage_reassignto").select2('val', '0');
  $("#manage_newexpecteddate").val("");
  // CKEDITOR.instances.managerfp_Description_ckeditor.setData("");
  managerfp_Description_dxeditor.option("value", "");
});


// To Take ownership

$("#manage_rfp_save_ownership").on("click", function () {
  var RfpICode = $("#manage_rfp_RFPICode").val();
  if ($("#manage_userIndustry").val() == 0) {
    $("#manage_userIndustryError").html("Please Select End User Industry field");
    $("#manage_userIndustry").focus();
  }
  if ($("#manage_rfpStatus").val() == 0) {
    $("#manage_rfpStatusError").html("Please Select the RFP Status field");
    $("#manage_rfpStatus").focus();
  }
  if ($("#manage_technology").val() == "" || $("#manage_technology").val() == 0) {
    $("#manage_technologyError").html("Please Select the Technology field");
    $("#manage_technology").focus();
  }

  if ($("#manage_userIndustry").val() != "0" && $("#manage_rfpStatus").val() != "0" && $("#manage_technology").val() != "") {
    swal({
      title: "Are you sure?",
      text: "You want to Take Ownership",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willTakeOwnership) => {
        if (willTakeOwnership) {
          SaveTakeOwnershipOldRfp(RfpICode)
        }
      });
  }
});

function SaveTakeOwnershipOldRfp(RfpId) {

  var RFPTakeOwnershipData = {
    RFPId: RfpId,
    TechPerson: Manage_EmployeeID,
    ApplicationTypeId: $("#manageRfpApplicationtype").val(),
    EndUserIndustry: $("#manage_userIndustry").val(),
    RfpStatusIcode: $("#manage_rfpStatus").val()
  };

  PostRFPTakeOwnershipData = {
    Method: "PostRFPStatusTakeOwner",
    Data: RFPTakeOwnershipData
  };
  var RFPTakeOwnershipResult = PostDataCall(PostRFPTakeOwnershipData);

  if (RFPTakeOwnershipResult['IsSuccess'] == false) {
    var TakeOwnershipRfpSwalError = {
      title: "Error",
      text: RFPTakeOwnershipResult['Message'],
      icon: 'error'
    }
    ReassignRfpSwalMessage(TakeOwnershipRfpSwalError);
  }
  else {
    var RequestForProposalId = $("#manage_rfp_RFPId").val();
    saveNewTakeOwnership(RequestForProposalId);
  }
}

function saveNewTakeOwnership(RequestForProposalId) {
  var RFPTakeOwnershipDetailsData = {
    Token: ManageRfpSecurityToken,
    RequestForProposalId: RequestForProposalId,
    EmployeeId: Manage_EmployeeID,
    IsActive: 1,
    IsEffectiveAssign: 1,
    IsOwner: 1,
    StatusCode: $("#manage_rfpStatus").find("option:selected").attr('rfpstatus')
  };
  var PostRFPTakeOwnershipDetailsData = {
    Method: "PostRFPAssignDetails",
    Data: RFPTakeOwnershipDetailsData
  };
  var PostRFPTakeOwnershipDetailsResult = PostDataCall(PostRFPTakeOwnershipDetailsData);
  if (PostRFPTakeOwnershipDetailsResult["IsSuccess"] == false) {
    var takeOwnershipRfpSwalError = {
      title: "Error",
      text: PostRFPTakeOwnershipDetailsResult['Message'],
      icon: 'error'
    }
    ReassignRfpSwalMessage(takeOwnershipRfpSwalError);
  }
  else {
    swal({
      title: "Success",
      text: "RFP OwnerShip has been Successfully taken!!!",
      icon: "success",
    })
    getManageRfpList();
    $("#manage_rfp_close_modal").trigger("click");
    manageRfpDelay(function () {
      closeManageModal();
    }, 300);
  }
}

function ReassignRfpSwalMessage(data) {
  swal({
    title: data.title,
    text: data.text,
    icon: data.icon,
    button: "OK"
  });
}

var manageRfpDelay = (function () {
  var timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

function DeleteRfpData(rfpId,ProjectTitle,RFP_ICode){
  var filter_val = JSON.stringify({
    IsActive: true
  });
  var result = callgetlist("GetAssignedinRFP", filter_val);
  var response = result[0];
  var RFP_Id = rfpId;
  var RFP_ICode = RFP_ICode;
  var RFP_Title = ProjectTitle;
  $("#deleteManageRFPModal").modal("show");
  $(".error_message").html("");
  $("#RFPICode").html(RFP_ICode);
  $("#RFP_Id").html(RFP_Id);
  var deletemanage_rfp_comment = deletemanage_rfp_comment_dxEditor.option("value");
  $("#deleteManageRFPModalTitle").html(
    "<small style='color:white;font-size:12pt'><b>Closing RFP For " +
    RFP_Title +
      "</b></small>"
  );
  var filter_val = JSON.stringify({
    Token : AssignRfpSecurityToken
  });
  var Deletestatus = callgetlist("GetDeleteStatusById", filter_val);
  var html;
  html += ' <option value=" " selected disabled>-- Select Status --</option>';
  Deletestatus.forEach(function(key,item){
    html += '<option value="'+key.Id+'">'+key.Status+'</option>';
  });
  $('#deleteManageRfpDropDown').html(html);
}


function close_rfp(){
  var close_comment = deletemanage_rfp_comment_dxEditor.option("value");
  var status_value = $("#deleteManageRfpDropDown").val();
  var status_code;
  if (status_value == null) {
    $("#deletestatus_err").html('Please select status of the proposal');
    return false;
  }else {
    $("#deletestatus_err").html('');
  }

  if (close_comment == '') {
    $("#deletemanage_rfp_err").html('Please enter the reason for closing the proposals');
    return false;
  }else {
    $("#deletemanage_rfp_err").html('');
  }
  var filter_val = JSON.stringify({
    Token : AssignRfpSecurityToken
  });
  var Deletestatus = callgetlist("GetDeleteStatusById", filter_val);
  Deletestatus.forEach(function(key,item){
   
    if(status_value == key.Id){
      status_code = key.Statuscode;

    }
    
  });

  var RFP_Icode  = $('#RFPICode').html();
  var RFPId = $('#RFP_Id').html();
  var OldDataDelete = {
    RFPICode	  : RFP_Icode,
    RFPStatus	  : status_code,
    Message	    : "",
  	Status      : true
  }

  var Oldrfpdelete = {
    Method : "PostOldRFPDelete",
    Data   :  OldDataDelete
  }

  var DeleteOld_RFPData = PostDataCall(Oldrfpdelete);
  if (DeleteOld_RFPData['IsSuccess'] == true) {
    var swalEMRSucc = {
        title: 'Success!',
        text: DeleteOld_RFPData['Message'],
        icon: "success"
    }
    var Data = {
      Token          : AssignRfpSecurityToken,
      Comments       : close_comment, 
      StatusCode     : status_value,
      RFPId          : RFPId,
      ProposalId     : null
    };
    var DeleteData = {
      Method: "PostDeleteRFP",
      Data: Data
    }
  
    var DeleteRFP_Data = PostDataCall(DeleteData);
    
  }else {
    var swalEMRErr = {
        title: 'Warning!',
        text: DeleteOld_RFPData['Message'],
        icon: "error"
    }
    swalAlert(swalEMRErr); 
  }

  if (DeleteRFP_Data['IsSuccess'] == true) {
    var swalEMRSucc = {
      title: 'Success!',
      text: DeleteRFP_Data['Message'],
      icon: "success"
  }
  swalAlert(swalEMRSucc);
  $("#deleteManageRFPModal").modal("hide");
  deletemanage_rfp_comment_dxEditor.option("value", '');
  getManageRfpList();
}else {
    var swalEMRErr = {
        title: 'Warning!',
        text: DeleteRFP_Data['Message'],
        icon: "error"
    }
    swalAlert(swalEMRErr); 
  }

}

