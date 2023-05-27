var GetAssignRfps;
var CommentsContent = new Array();
var AssignRfpUrl = SynergyAPIURL;
var AssignRfpSecurityToken = localStorage.getItem("securityToken");
var AssignRfpEmployeeId = localStorage.getItem("EmployeeID");
var assign_rfp_dxEditor_description;

$(document).ready(function(){
  getAssignRFPListTable();  

  assign_rfp_dxEditor_description = $('#assign_rfp_dxEditor_description').dxHtmlEditor({
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
	assign_rfp_dxEditor_description.option('toolbar.multiline', true);
})  

function getAssignRFPListTable() {
  $('input[type=text]').removeClass("required_field");
  $('select').removeClass("required_field");
  $('textarea').removeClass("required_field");
  GetAssignRfps = callgetlist('GetRFPForAssign');
  renderAssignRFPGrid(GetAssignRfps);
}

function renderAssignRFPGrid(data) {
  var assignRfpDataGrid = $("#sddgd-assignRfp")
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
      onToolbarPreparing: function (e) {
        var dataGrid = e.component;
        e.toolbarOptions.items.unshift({
          location: "after",
          widget: "dxButton",
          options: {
            icon: "refresh",
            onClick: function () {
              getAssignRFPListTable();
            },
          },
        });
      },
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
              assignRfpDataGrid.pageIndex() * assignRfpDataGrid.pageSize() + options.rowIndex + 1
            );
          },
        },
        /* {
          caption: "RFP Id",
          dataField: "RFPId",
        }, */
        {
          caption: "RFP Date",
          dataField: "RFPDate",
          dataType :"date",
          format : "dd-MMM-yyyy"
        },
        {
          caption: "BDE Name",
          dataField: "BDE_Name",
        },
        {
          caption: "Client",
          dataField: "Client",
        },
        {
          caption: "ProjectTitle",
          dataField: "ProjectTitle",
        },
        {
          dataField: "",
          caption: "Action",
          width: 50,
          allowFiltering:false, 
          allowGrouping: false, 
          allowReordering: false, 
          allowSorting: false, 
          allowCollapsing: false, 
          allowExporting: false,
          cellTemplate: function (container, options) {
            var rfpId = options.data["RFPId"]
            var domActions = "";
            domActions +=
              "<button class='btn btn-xs btn-primary edit-btn' onclick=openAssignProposal('" +
              rfpId +
              "')><i class='fas fa-user-plus'></i></button>";
            $("<div class='text-center'>")
              .append($(domActions))
              .appendTo(container);
          },
        },
      ],
    })
    .dxDataGrid("instance");
}

function openAssignProposal(RfpId) {
  
  $('#assignRFPModal').modal('show');
  CommentsContent = new Array();
  $(".error_message").html("");

  var GetTechnologyFilters = JSON.stringify({
    "IsActive": true
  });
  var GetTechnology = callgetlist("GetTechnology", GetTechnologyFilters);
  window.GetTechnology = GetTechnology;

  var GetRfpTechInchargeFilters = JSON.stringify({
      "IsActive": true
  });
  var GetRfpTechIncharge = callgetlist("GetRFPTechIncharge", GetRfpTechInchargeFilters);

  var GetRfpForAssignByIdFilters = JSON.stringify({
    "RFPId": RfpId
  });
  var GetRfpForAssignById = callgetlist("GetRfpForAssignById", GetRfpForAssignByIdFilters);

  var GetTechnologiesForAssignRfp = callgetlist("GetTechnologiesForAssignRFP", GetRfpForAssignByIdFilters);
  if(GetRfpForAssignById != null)
  {
    // try {
    //   CKEDITOR.instances.assign_rfp_txtarea_description.destroy(true);
    // }
    // catch {
      
    // }
    // var assign_rfp_txtarea_description = CKEDITOR.replace(
    //   "assign_rfp_txtarea_description",
    //   {}
    // );
    // assign_rfp_txtarea_description.on("paste", function (evt) {
    //   if (evt.data.dataTransfer.getFilesCount() > 0) {
    //      var AssignRfpDescriptionFile = evt.data.dataTransfer.getFile(0);
    //      var AssignRfpDescriptionReader = new FileReader();
    //      AssignRfpDescriptionReader.onload = function (evt) {
    //         var AssignRfpDescriptionPictureElement = assign_rfp_txtarea_description.document.createElement(
    //            "img",
    //            {
    //               attributes: {
    //                  src: evt.target.result
    //               }
    //            }
    //         );

    //         setTimeout(function () {
    //            assign_rfp_txtarea_description.insertElement(
    //               AssignRfpDescriptionPictureElement
    //            );
    //         }, 0);
    //      };
    //      AssignRfpDescriptionReader.readAsDataURL(AssignRfpDescriptionFile);
    //   }
    // });
    $("#assign_rfp_RFPId").val(GetRfpForAssignById[0].RFPId);
    $("#assign_rfp_RFPIcode").val(GetRfpForAssignById[0].RFPICode);
    $("#assign_rfp_client").val(GetRfpForAssignById[0].CompanyName);
    $("#assign_rfp_company_Person").val(GetRfpForAssignById[0].ClientName);
    $("#assign_rfp_department").val(GetRfpForAssignById[0].Department);
    $("#assign_rfp_company_address").val(GetRfpForAssignById[0].CompanyAddress);
    $("#assign_rfp_client_code").val(GetRfpForAssignById[0].ClientCode);
    $("#assign_rfp_country_name").val(GetRfpForAssignById[0].CountryName);
    $("#assign_rfp_project_title").val(GetRfpForAssignById[0].ProjectTitle);
    $("#assign_rfp_bde_name").val(GetRfpForAssignById[0].BDE_Name);
    $("#assign_rfp_project_type").val(GetRfpForAssignById[0].ProjectTypeId);
    $("#assign_rfp_application_type").val(GetRfpForAssignById[0].ApplicationType);
    $("#assign_rfp_dtp_received_date").val(GetRfpForAssignById[0].ReceivedDate);
    $("#assign_rfp_dtp_estimation_needed_date").val(GetRfpForAssignById[0].EstimationNeededOn);
  }
  $('#technology_choose_assign').find('option').remove();
  GetTechnology.forEach(function (item) {
    $('#technology_choose_assign').append($("<option></option>").attr("value", item.SkillId+"-"+item.SkillVersionId).text(item.Skill)).select2();
  });
  $('#assign_rfp_tech_incharge').find('option').remove();
  $('#assign_rfp_tech_incharge').append($("<option value='0'>Select Incharge</option>"));
  GetRfpTechIncharge.forEach(function (item) {
    $('#assign_rfp_tech_incharge').append($("<option></option>").attr("value", item.Id).text(item.Name)).select2();
  });
  var AssignRfpTechnologyArray = new Array();
  GetTechnologiesForAssignRfp.forEach(function (item){
    $('#technology_choose_assign').val(item.SkillId+"-"+item.SkillVersionId);
    AssignRfpTechnologyArray.push(item.SkillId+"-"+item.SkillVersionId);
  });
  $('#technology_choose_assign').val(AssignRfpTechnologyArray);
  $('#technology_choose_assign').select2();
  getCommentsDocumentHistory(RfpId);
  var OldSynergyRFPDetailsFilters = JSON.stringify({
    "RFPId": $("#assign_rfp_RFPIcode").val()
  });
  var OldSynergyRFPDetails = callgetlist("GetRFPDetailsByRFPId", OldSynergyRFPDetailsFilters);
  OldSynergyRFPDetails.forEach(function (item){
    $('#assign_rfp_tech_stream').val(item.TechStream);
  });
}

function getCommentsDocumentHistory(RfpId){
  var GetCommentsinRfpFilters = JSON.stringify({
    "RFPId": RfpId,
    "IsActive":1
  });
  var GetRfpCommentsHistory = callgetlist("GetCommentsinRFP", GetCommentsinRfpFilters);
  var RfpCommentsHistoryHtml = "";
  var RfpNoCommentsCount = 0;
  var RfpNoDocumentsCount = 0;
  //console.log(GetRfpCommentsHistory);
  GetRfpCommentsHistory.forEach(function(item){
    var RfpCommentCreatedDate = new Date(item.CreatedDate);
    var RfpCommentDateMonthYear = RfpCommentCreatedDate.toLocaleDateString();
    var RfpCommentTime = RfpCommentCreatedDate.toLocaleTimeString();
    if(item.DocumentType == "Comment" && item.Content != null)
    {
      CommentsContent[item.Id] = item.Content.toString();
      if(item.EmployeeName != " " || item.EmployeeName.length != 0){
        $colon = (item.EmployeeName != " ")?':':'';
        RfpCommentsHistoryHtml += "<small class='pull-left' style='padding-top:5px'><span>"+item.EmployeeName+$colon+"</span></small>";
      }
      RfpCommentsHistoryHtml += "<div class='rfp_comment' onclick=assignRFPCommentSwal('" + item.Id + "')>";
      RfpCommentsHistoryHtml += "<small class='pull-right'><span>"+RfpCommentDateMonthYear+"</span><span>"+RfpCommentTime+"</span></small>";
      var commentElement = $(CommentsContent[item.Id]);
      if(item.Id == null)
      {
        RfpCommentsHistoryHtml += "<span class='text-center'>File does not exists</span>";
      }
      else if(CommentsContent[item.Id].includes("<img"))
      {        
        commentElement.find('img').remove();
        RfpCommentsHistoryHtml += "<small>Message contains some image(s) click to expand</small>";
      }
      RfpCommentsHistoryHtml += "<label>"+commentElement.html()+"</label></div>";
    }
    if(item.DocumentType == "Document" && item.Content != null)
    {
      $colon = (item.EmployeeName != " ")?':':'';
      RfpCommentsHistoryHtml += "<small class='pull-left' style='padding-top:5px'><span>"+item.EmployeeName+$colon+"</span></small>";
      RfpCommentsHistoryHtml += "<div class='rfp_comment'>";
      RfpCommentsHistoryHtml += "<small class='pull-right'><span>"+RfpCommentDateMonthYear+"</span><span>"+RfpCommentTime+"</span></small>";
      if(item.Id == null){
        RfpCommentsHistoryHtml += "<span class='text-center'>File does not exists</span>";
      }else{
        RfpCommentsHistoryHtml += "<small style='padding-bottom:10px'><b>"+item.DocumentName+"."+item.DocumentExtension+" </b></small>";
        RfpCommentsHistoryHtml += "<b>Download-file: </b><button class='btn btn-primary btn-xs' onclick=downloadRFPDocument('" + item.Id + "')><span class='glyphicon glyphicon-arrow-down'></span></button>";
      }
      RfpCommentsHistoryHtml +="</div>";
    }
    if(item.DocumentType == "Comment" && item.Content == null)
    {
      RfpNoCommentsCount += 1;      
    }
    if(item.DocumentType == "Document" && item.Content == null)
    {
      RfpNoDocumentsCount += 1;      
    }
  });
  if(RfpNoCommentsCount > 0 && RfpNoDocumentsCount > 0 )
  {
    RfpCommentsHistoryHtml = "<h3 class='text-center'>There are No Comments and Documents Yet</h3>";
  }
  $("#assign_rfp_comments_history").html(RfpCommentsHistoryHtml);
}

function downloadRFPDocument(RfpFileId){
  swal({
    title: "Are you sure?",
    text: "You want to download the File",
    icon: "warning",
    buttons: true,
  })
  .then((willDownload) => {
    if (willDownload) {
      window.open(AssignRfpUrl + "DownloadFile?query=GetDownloadRFPFile&filters={'FileId':'" + RfpFileId + "'}&Token=" + AssignRfpSecurityToken , '_blank');
    }
  });
}

$("#assign_rfp_tech_stream,#assign_rfp_tech_incharge,#technology_choose_assign").change(function (event) {
  var id = event.currentTarget.id;
  $('#' + id + '_error').empty();
});


function assignRfp(){
  var AssignRfpFieldErrorCount = 0;
  if($("#assign_rfp_tech_incharge").val() == 0)
  {
    $("#assign_rfp_tech_incharge_error").html("Choose Tech Incharge");
    $("#assign_rfp_tech_incharge").focus();
    AssignRfpFieldErrorCount += 1;
  }
  if($("#technology_choose_assign").val()==0)
  {
    $("#technology_choose_assign_error").html("Choose Technology");
    $("#technology_choose_assign").focus();
    AssignRfpFieldErrorCount += 1;
  }
  if($("#assign_rfp_tech_stream").val() == 0)
  {
    $("#assign_rfp_tech_stream_error").html("Choose Tech Stream");
    $("#assign_rfp_tech_stream").focus();
    AssignRfpFieldErrorCount += 1;
  }
  if(AssignRfpFieldErrorCount>0)
  {
    var AssignRfpFieldSwalError = {
      title: "Oops",
      text: "Some field(s) are left empty",
      icon: 'error'
    }
    assignRfpSwalMessage(AssignRfpFieldSwalError);
  }
  if($("#assign_rfp_tech_incharge").val() != 0 && $("#technology_choose_assign").val() != 0 && $("#assign_rfp_tech_stream").val() != 0){
    swal({
      title: "Are you sure?",
      text: "You want to assign the RFP to "+$("#assign_rfp_tech_incharge option:selected").text(),
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willAssign) => {
      if (willAssign) {
        saveAssignRfpDetails($("#assign_rfp_RFPId").val());
      }
    });
  }
}

function bindAssignRfpTechnologyString() {
  var technologyToAppend = "";
  var selMulti = $("#technology_choose_assign option:selected").each(function () {
    technologyToAppend += technologyToAppend == "" ? "" : ",";
    technologyToAppend += $(this).text();
  });
  return technologyToAppend;
}

function saveAssignRfpDetails(RfpId)
{
  var RFPStatustoAssignedData = {
    RFPId: $("#assign_rfp_RFPIcode").val(),
    TechStream:$("#assign_rfp_tech_stream").val(),
    Technology:bindAssignRfpTechnologyString(),
    TechPerson:$("#assign_rfp_tech_incharge").val(),
    AssignedBy:AssignRfpEmployeeId
  };

  PostRFPStatustoAssignedData = {
    Method: "PostRFPStatustoAssigned",
    Data: RFPStatustoAssignedData
  };
  var RFPStatustoAssignedResult = PostDataCall(PostRFPStatustoAssignedData);
  if(RFPStatustoAssignedResult['IsSuccess'] == false)
  {
    var AssignRfpSwalError = {
      title: "Error",
      text: RFPStatustoAssignedResult['Message'],
      icon: 'error'
    }
    assignRfpSwalMessage(AssignRfpSwalError);
  }
  else{
    saveNewAssignRfpDetails(RfpId);    
  }
}


function saveNewAssignRfpDetails(RfpId)
{
  var RFPAssignDetailsData = {
    Token: AssignRfpSecurityToken,
    RequestForProposalId: RfpId,
    EmployeeId: $("#assign_rfp_tech_incharge").val(),
    IsActive: 1,
    IsEffectiveAssign: 1,
    IsOwner: 0,
    StatusCode: 2
  };
  var PostRFPAssignDetailsData = {
    Method: "PostRFPAssignDetails",
    Data: RFPAssignDetailsData
  };
  var PostRFPAssignDetailsResult = PostDataCall(PostRFPAssignDetailsData);
  if(PostRFPAssignDetailsResult["IsSuccess"] == false)
  {
    var AssignRfpSwalError = {
      title: "Error",
      text: RFPStatustoAssignedResult['Message'],
      icon: 'error'
    }
    assignRfpSwalMessage(AssignRfpSwalError);
  }
  else{
    saveNewAssignRfpTechnologies(RfpId);
    saveAssignRfpDocuments(RfpId);
    saveAssignRfpComments(RfpId);
  }
}

function bindAssignRfpTechnologies(RfpId) {
  let AssignRfpTechnologyValues = $("#technology_choose_assign").val();
  var AssignRfpTechArray = [];
  AssignRfpTechnologyValues.forEach(item => {
    let AssignRfpTechElement = window.GetTechnology.filter(
      FileElement => FileElement.SkillId+"-"+FileElement.SkillVersionId == item
    );
    if (AssignRfpTechElement.length > 0) {
      delete AssignRfpTechElement[0].Skill;
      delete AssignRfpTechElement[0].text;
      delete AssignRfpTechElement[0].id;
      AssignRfpTechElement[0].IsActive = true;
      AssignRfpTechElement[0].RFPId = RfpId;
      AssignRfpTechArray.push(AssignRfpTechElement[0]);
    }
  });
  return `${JSON.stringify(AssignRfpTechArray)}`;
}


function saveNewAssignRfpTechnologies(RfpId) {
  var TechnologiesInRFPData = {
    Token: AssignRfpSecurityToken,
    Data: bindAssignRfpTechnologies(RfpId)
  };

  PostTechnologiesInRFPData = {
    Method: "PostTechnologiesInRFP",
    Data: TechnologiesInRFPData
  };
  var PostTechnologiesInRFPResult = PostDataCall(PostTechnologiesInRFPData);
}

function saveAssignRfpDocuments(RfpId) 
{
  var AssignRfpDocumentFiles = $('#assign_rfp_document_upload').get(0).dropzone.getAcceptedFiles();
  if (AssignRfpDocumentFiles.length > 0) {
    for (i = 0; i < AssignRfpDocumentFiles.length; i++) {
      var FileExtension = AssignRfpDocumentFiles[i].name.slice((Math.max(0, AssignRfpDocumentFiles[i].name.lastIndexOf(".")) || Infinity) + 1);
      var FileType = AssignRfpDocumentFiles[i].type;
      var FileName = AssignRfpDocumentFiles[i].name.substr(0, AssignRfpDocumentFiles[i].name.lastIndexOf("."));
      var AssignRfpDocumentsFormData = new FormData();
      AssignRfpDocumentsFormData.append('file', AssignRfpDocumentFiles[i]);
      var contentdetails =
        [{
          "DocumentTypeId": RfpId,
          "DocumentType": "RFP",
          "DocumentName":FileName,
          "Extension": FileExtension,
          "ContentType": FileType
        }]

      AssignRfpDocumentsFormData.append('contentdetails', JSON.stringify(contentdetails));
      var SaveAssignRfpDocumentsResult = postFileGeneric(AssignRfpDocumentsFormData);
    }
  }
}

var AssignRfpDelay = (function () {
  var timer = 0;
  return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
  };
})();

function saveAssignRfpComments(RfpId) {
  var CommentsinRFPData = {
    Token: AssignRfpSecurityToken,
    RFPId: RfpId,
    // Comments: CKEDITOR.instances.assign_rfp_txtarea_description.getData(),
    Comments: assign_rfp_dxEditor_description.option("value"),
    IsActive: true
  };
  PostCommentsinRFPData = {
    Method: "PostCommentsinRFP",
    Data: CommentsinRFPData
  };
  // if(CKEDITOR.instances.assign_rfp_txtarea_description.getData() != "")
  if(assign_rfp_dxEditor_description.option("value") != "")
  {
    var PostCommentsinRFPResult = PostDataCall(PostCommentsinRFPData);
  }
  AssignRfpDelay(function () {
    getAssignRFPListTable();
    closeAssignRFPModal();
  }, 300);
}

function closeAssignRFPModal() {
  var swalRolesSucc = {
    title: "Success",
    text: 'RFP Assigned successfully',
    icon: 'success'
  }
  $("#btn_assign_rfp_close").trigger("click");
  assignRfpSwalMessage(swalRolesSucc);
}

function resetAssignRfpModalTab(){
  $('.nav-tabs a[href="#tab_assign_rfp_client_project_details"]').tab("show");
  $("#assign_rfp_client").focus();
  $("#assign_rfp_tech_incharge").val("0");
  assignRfpDropzoneRemoveFiles();
  // CKEDITOR.instances.assign_rfp_txtarea_description.setData("");
  assign_rfp_dxEditor_description.option("value", "");
  $('.assign_rfp_field_error').html("");
}


function assignRfpDropzoneRemoveFiles() {
  Dropzone.forElement("#assign_rfp_document_upload").removeAllFiles(true);
}

function assignRfpSwalMessage(data){
  swal({
  title: data.title,
  text: data.text,
  icon: data.icon,
  button:"OK"
  });   
}

function assignRFPCommentSwal(ContentId){
  const wrapper = document.createElement('div');
  wrapper.innerHTML = CommentsContent[ContentId];
  swal({
    title: 'Comment',
    content: wrapper
  });
}