var editorDX = '';
var deleteNRE_comment_dxeditor = '';
var nre_message_Description_dxeditor = '';
var rrm_reopen_reason_dxeditor = '';

$(document).ready(function () {
  getNewRfpList();
  $("#nre_SmsClientlist").change(function () {
    if ($(this).val() != 0) {
      $(this)
        .parents("div")
        .find(".error_message")
        .html("");
    }
  });

  editorDX = $('#nre_txtareaDescriptionDx').dxHtmlEditor({
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
  editorDX.option('toolbar.multiline', true);

  // deleteNRE_comment
  deleteNRE_comment_dxeditor = $('#deleteNRE_comment_dxeditor').dxHtmlEditor({
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
  deleteNRE_comment_dxeditor.option('toolbar.multiline', true);

  // nre_message_Description
  nre_message_Description_dxeditor = $('#nre_message_Description_dxeditor').dxHtmlEditor({
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
  nre_message_Description_dxeditor.option('toolbar.multiline', true);


  RFP_RRMDetails_comment_dxeditor = $('#RFP_RRMDetails_comment_dxeditor').dxHtmlEditor({
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
  RFP_RRMDetails_comment_dxeditor.option('toolbar.multiline', true);

  rrm_reopen_reason_dxeditor = $('#rrm_reopen_reason_dxeditor').dxHtmlEditor({
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
  rrm_reopen_reason_dxeditor.option('toolbar.multiline', true);
});

function nre_dropzone_remove_files() {
  Dropzone.forElement("#nre_document_upload").removeAllFiles(true);
}

function getNewRfpList() {
  $(".error_message").html("");
  $("input[type=text]").removeClass("required_field");
  $("select").removeClass("required_field");
  $("textarea").removeClass("required_field");

  var EmployeeID = localStorage.getItem("EmployeeID");

  var filter_val = JSON.stringify({
    User_Id: EmployeeID
  });
  var GetNre = callgetlist("GetActiveRFPsForMarketing", filter_val);

  renderNewRfpEntryGrid(GetNre)
}

function renderNewRfpEntryGrid(data) {
  var newRfpEntryDataGrid = $("#sddgd-newrfpentry")
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
              getNewRfpList();
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
              newRfpEntryDataGrid.pageIndex() * newRfpEntryDataGrid.pageSize() + options.rowIndex + 1
            );
          },
        },
        {
          caption: "BDE",
          dataField: "bde_name",
        },
        {
          caption: "Client",
          dataField: "client_name",
        },
        {
          caption: "Project Title",
          dataField: "project_title",
        },
        {
          caption: "RFP Rec Date",
          dataField: "rfp_received_date",
          dataType :"date",
          format : "dd-MMM-yyyy"
        },
        {
          caption: "RFP Req Date",
          dataField: "estimation_need_on",
          dataType :"date",
          format : "dd-MMM-yyyy"
        },
        {
          caption: "Status",
          dataField: "rfp_status",  
          cellTemplate: function (container, options) {
            var domActions = "";
            if(options.data.rfp_status == null){
              domActions +=
              "<span class='pull-left'>RFP Not Assigned</span>";
            }else{
              domActions +=
              "<span class='pull-left'>"+options.data.rfp_status+"</span>";
            }
            $("<div class='text-center'>")
            .append($(domActions))
            .appendTo(container);
          },      
        },
        {
          caption: "Assigned By",
          dataField: "rfp_assigned_by"          
        },
        {
          caption: "Owner",
          dataField: "rfp_Owner"          
        },
        {
          dataField: "",
          caption: "Action",
          width: 110,
          allowFiltering:false, 
          allowGrouping: false, 
          allowReordering: false, 
          allowSorting: false, 
          allowCollapsing: false, 
          allowExporting: false,
          cellTemplate: function (container, options) {
            var rfpId = options.data["rfp_icode"];
            var projectName = options.data["project_title"];
            var domActions = "";
            domActions +=
              `<button class='btn btn-xs btn-primary edit-btn' onclick='openCommentsHistoryForNRE("${rfpId}","${projectName}")'><i class='fas fa-comments'></i></button>`;
            domActions +=
              `<button class='btn btn-xs btn-danger delete-btn' onclick='DeleteNREData("${rfpId}", "${projectName}")'><i class='fas fa-trash-alt'></i></button>`;
            domActions += 
              `<button class='btn btn-xs btn-secondary delete-btn' onclick=HrRRMDetails("${rfpId}") title="Note : This RFP will be closed by the system automatically in 15 days of notice. Since HR closed the RRM with respective comments. So you have only (10/15) days to respond or reopen this RRM. Thanks "><i class="fa-solid fa-bell fa-shake"></i></button>`;

              $("<div class='text-center'>")
              .append($(domActions))
              .appendTo(container);
          }
        }
      ],
    })
    .dxDataGrid("instance");
}

function DeleteNREData(rfpId, projectName){
  // var filter_val = JSON.stringify({
  //   IsActive: true,
  //   ProposalId: proposalId,
  // });
  // debugger;
  // var result = callgetlist("GetEstimateRFPDetails", filter_val);
  // var response = result[0];
  // var RFP_ICode = result[0]['RFPICode'];
  $("#deleteNREModal").modal("show");
  $(".error_message").html("");
  // $("#ProposalId").html(proposalId);
  $("#RFPICode_NRE").html(rfpId);
  $('#deleteNREModalTitle').html("Delete RFP for - "+projectName);
  // var deleteNRE_comment = CKEDITOR.instances.deleteNRE_comment.getData();
  var deleteNRE_comment = deleteNRE_comment_dxeditor.option("value");
  // $("#deleteNREModalTitle").html(
  //   "<small style='color:white;font-size:12pt'><b>Closing Proposal For " +
  //     response.RFPName +
  //     "</b></small>"
  // );
  var filter_val = JSON.stringify({
    Token : AssignRfpSecurityToken
  });
  var Deletestatus = callgetlist("GetDeleteStatusById", filter_val);
  var html;
  html += ' <option value=" " selected disabled>-- Select Status --</option>';
  Deletestatus.forEach(function(key,item){
    html += '<option value="'+key.Id+'">'+key.Status+'</option>';
  });
  $('#deleteNREDropDown').html(html);
  
}

function close_NRE(){
  // var close_comment = CKEDITOR.instances.deleteNRE_comment.getData();
  var close_comment = deleteNRE_comment_dxeditor.option("value");
  var status_code;
  var status_value = $("#deleteNREDropDown").val();
  if (status_value == null) {
    $("#deletestatus_err_NRE").html('Please select status of the NRE');
    return false;
  }else {
    $("#deletestatus_err_NRE").html('');
  }

  if (close_comment == '') {
    $("#deleteProposal_err_NRE").html('Please enter the reason for closing the NRE');
    return false;
  }else {
    $("#deleteProposal_err_NRE").html('');
  }
  var filter_val = JSON.stringify({
    Token : AssignRfpSecurityToken
  });
  var Deletestatus = callgetlist("GetDeleteStatusById", filter_val);
  console.log(Deletestatus);
  Deletestatus.forEach(function(key,item){
   
    if(status_value == key.Id){
      status_code = key.Statuscode;

    }
    
  });
  
  var RFP_Icode  = $('#RFPICode_NRE').html();
  // var ProposalId = $('#ProposalId').html();
  var OldDataDelete = {
    RFPICode	  : RFP_Icode,
    RFPStatus	  : status_code
  }

  var Oldrfpdelete = {
    Method : "PostOldRFPDelete",
    Data   :  OldDataDelete
  }

  var DeleteOld_RFPData = PostDataCall(Oldrfpdelete);
  if(DeleteOld_RFPData['IsSuccess'] == true) {
    var swalEMRSucc = {
      title: 'Success!',
      text: DeleteOld_RFPData['Message'],
      icon: "success"
    }
      var Data = {
        Token          : AssignRfpSecurityToken,
        Comments       : close_comment, 
        StatusCode     : status_value,
        RFPId          : null,
        RFPIcode       : RFP_Icode,
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
  
  if(DeleteRFP_Data['IsSuccess'] == true) {
    var swalEMRSucc = {
        title: 'Success!',
        text: DeleteRFP_Data['Message'],
        icon: "success"
    }
    swalAlert(swalEMRSucc);
    $("#deleteNREModal").modal("hide"); 
    // CKEDITOR.instances.deleteNRE_comment.setData('');
    deleteNRE_comment_dxeditor.option("value", '');
    getNewRfpList();
  }else {
    var swalEMRErr = {
        title: 'Warning!',
        text: DeleteRFP_Data['Message'],
        icon: "error"
    }
    swalAlert(swalEMRErr); 
  }
}

function openCommentsHistoryForNRE(rfpIcode,projectName)
{
  $('#commentsHistoryNREModal').modal('show');
  if(isNaN(rfpIcode) === false){
    localStorage.setItem("RFPI_Code_Id",rfpIcode);
  }
    var getRFPIDFilters = JSON.stringify({
      "RFPIcode": localStorage.getItem("RFPI_Code_Id"),
      "IsActive":1
    });
    var RFP_ID = callgetlist("GetRFPIdByRFPIcode", getRFPIDFilters);
    if(RFP_ID === "0") {
    $('#nre_post_message_action').hide();
    } else {
      $('#nre_post_message_action').show();
      $('#NRE_RFPID').val(RFP_ID[0].Id);
    }
  
  
  var CommentsContent = new Array();
  $('#commentsHistoryNREModalTitle').html("Comments And Documents - "+projectName);
  var GetCommentsInNREFilter = JSON.stringify({
    "RFPIcode": localStorage.getItem("RFPI_Code_Id"),
    "IsActive":1
  });
  var GetNreCommentsHistory = callgetlist("GetCommentsinRFPForNRE", GetCommentsInNREFilter);
  var NreCommentsHistoryHtml = "";
  var NreNoCommentsCount = 0;
  var NreNoDocumentsCount = 0;
  GetNreCommentsHistory.forEach(function(item){
    var NreCommentCreatedDate = new Date(item.CreatedDate);
    var NreCommentDateMonthYear = NreCommentCreatedDate.toLocaleDateString();
    var NreCommentTime = NreCommentCreatedDate.toLocaleTimeString();
    if(item.DocumentType == "Comment" && item.Content != null)
    {
      CommentsContent[item.Id] = item.Content.toString();
      $colon = (item.EmployeeName != " ")?':':'';
      NreCommentsHistoryHtml += "<small class='pull-left' style='padding-top:5px'><span>"+item.EmployeeName+$colon+"</span></small>";
      NreCommentsHistoryHtml += "<div class='rfp_comment' onclick=NreCommentSwal('" + item.Id + "')>";
      NreCommentsHistoryHtml += "<small class='pull-right'><span>"+NreCommentDateMonthYear+"</span><span>"+NreCommentTime+"</span></small>";
      var commentElement = $(CommentsContent[item.Id]);
      if(CommentsContent[item.Id].includes("<img"))
      {        
        commentElement.find('img').remove();
        NreCommentsHistoryHtml += "<small>Message contains some image(s) click to expand</small>";
      }
      NreCommentsHistoryHtml += "<label>"+commentElement.html()+"</label></div>";
    }
    if(item.DocumentType == "Document" && item.Content != null)
    {
      NreCommentsHistoryHtml += "<small class='pull-left' style='padding-top:5px'><span>"+item.EmployeeName+":</span></small>";
      NreCommentsHistoryHtml += "<div class='rfp_comment'>";
      NreCommentsHistoryHtml += "<small class='pull-right'><span>"+NreCommentDateMonthYear+"</span><span>"+NreCommentTime+"</span></small>";
      NreCommentsHistoryHtml += "<small style='padding-bottom:10px'><b>"+item.DocumentName+"."+item.DocumentExtension+" </b></small>";
      NreCommentsHistoryHtml += "<b>Download-file: </b><button class='btn btn-primary btn-xs' onclick=DownloadNreDocument('" + item.Id + "')><span class='glyphicon glyphicon-arrow-down'></span></button></div>";
    }
    if(item.DocumentType == "Comment" && item.Content == null)
    {
      NreNoCommentsCount += 1;      
    }
    if(item.DocumentType == "Document" && item.Content == null)
    {
      NreNoDocumentsCount += 1;      
    }
  });
  if(NreNoCommentsCount > 0 && NreNoDocumentsCount > 0 )
  {
    NreCommentsHistoryHtml = "<h3 class='text-center'>There are No Comments and Documents Yet</h3>";
  }
  $("#nre_comments_history").html(NreCommentsHistoryHtml);
}

function NreCommentSwal(ContentId){
  const wrapper = document.createElement('div');
  wrapper.innerHTML = CommentsContent[ContentId];
  swal({
    title: 'Comment',
    content: wrapper
  });
}

function DownloadNreDocument(RfpFileId){
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

function SmsClientlist(idName, keyword) {
  $("#" + idName).empty();
  var filter_val = JSON.stringify({
    keyword: keyword,
    User_Id: localStorage.getItem("EmployeeID")
  });
  var result = callgetlist("GetClientDetails", filter_val);
  var options = "";
  for (var i = 0 ; i < result.length; i++) {
    options +=
      "<option value='" +
      result[i].Cgvak_Comh_Icode +
      "' data-address='" +
      result[i].Cgvak_Comh_Address +
      "' data-person='" +
      result[i].Cgvak_Comh_Person +
      "' data-state='" +
      result[i].Cgvak_Comh_State +
      "' data-WishList='" +
      result[i].Cgvak_Comh_WishList +
      "' data-Status='" +
      result[i].Cgvak_Comh_Pros_Status +
      "' data-Approved='" +
      result[i].Cgvak_Comh_ApprovedVIPAC +
      "' data-VIPAC='" +
      result[i].Cgvak_Comh_VIPAC +
      "' data-BDE='" +
      result[i].Cgvak_Comh_VIPAC_BDE +
      "' data-CountryIcode='" +
      result[i].Cgvak_Comh_country_Icode +
      "' data-CountryName='" +
      result[i].CgVak_Cntry_Name +
      "'>" +
      result[i].Cgvak_Comh_Name +
      "</option>";
  }
  $("#" + idName).html(options);  
  let selectEl = $("#nre_SmsClientlist")
  let val = selectEl.data("select2").dropdown.$search.val()
  selectEl.val(null).trigger('change');
  selectEl.select2('close');
  selectEl.select2('open');
  selectEl.data("select2").dropdown.$search.val(val)
}

function CheckIsNewClient(clientId) {
  var filter_val = JSON.stringify({
    clientCode: clientId,
    isNew: null,
    rfpWon: null
  });
  var result = callgetlist("Proc_RFP_Is_New_Client", filter_val);
  return result;
}

function getTechnologyList(idName) {
  $("#" + idName).empty();

  var filter_val = JSON.stringify({
    IsActive: true
  });

  var result = callgetlist("GetTechnology", filter_val);
  window.nreTechRes = result;
  var selectMap = $.map(result, function (obj) {
    obj.text = obj.text || obj.Skill;
    obj.id = obj.id || obj.SkillId;
    return obj;
  });
  $("#nre_technology").select2({
    placeholder: "Select a Skill",
    allowClear: true,
    data: selectMap
  });
}

$("#nre_ProjectDetails")
  .find("input")
  .change(function () {
    validateProjectDetails();
  });

$("#nre_ProjectDetails")
  .find("select")
  .change(function () {
    validateProjectDetails();
  });

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

$("#nre_dtp_received_date").datepicker({ 
  dateFormat: 'dd-M-yy',
  constrainInput: true,
  firstDay: 1,
  hideIfNoPrevNext: true,
  maxDate : 0
  // beforeShow: function (input, inst) {
  //   inst.settings.maxDate = $("#nre_dtp_estimation_needed_date").val();
  // }
});

$("#nre_dtp_estimation_needed_date").datepicker({ 
  dateFormat: 'dd-M-yy',
  constrainInput: true,
  firstDay: 1,
  hideIfNoPrevNext: true,
  minDate : 1
  // beforeShow: function (input, inst) {
  //   inst.settings.minDate = $("#nre_dtp_received_date").val();
  // }
});

// nre_dtp_received_date.max = new Date().toISOString().split("T")[0];
// $("#nre_dtp_received_date").change(function () {
//   $($("#nre_dtp_estimation_needed_date").attr("readonly", false));
//   nre_dtp_estimation_needed_date.min = new Date($("#nre_dtp_received_date").val())
//     .toISOString()
//     .split("T")[0];
// });

var nextFlag = false;
var IsNreSaved = false;
var InsertedRequestForproposalId = 0;
function toggleTabNre() {
  var activeTab = $('#nretab').find('li.active').attr('id')
  if (activeTab == "nre_clientTab") {
    if ($("#nre_SmsClientlist").val() == null) {
      $("#nre_ClientError").html("Please Select Client Name");
    } else if($("#nre_dl_department").val() == "0"){
      $("#nre_ClientDepartmentError").html("Please Select Department");
    }  
    else {
      $('.nav-tabs a[href="#nre_ProjectDetails"]').tab("show");
      $(".btnPrevious").show();
      if (!IsNreSaved) {
        $("a.btnSaveAndContinue").show();
        $("a.btnNext").hide();
      }
    }
  }
  if (activeTab == "nre_projectTab") {
    nextFlag = true;
    var result = validateProjectDetails();
    if (result) {
      if (!IsNreSaved) {
        saveSynergyNewRfpDetails(null, 0);
      }
      $('.nav-tabs a[href="#nre_Documents"]').tab("show");
      $("a.btnNext").hide();
      $("a.btnSaveAndContinue").hide();
      $(".saveFamilyBtn").show();
        // getNewRfpList();
      try {
        CKEDITOR.instances.nre_Description_ckeditor.destroy(true);
      } catch {
        var nre_Description_ckeditor = CKEDITOR.replace(
          "nre_Description_ckeditor",
          {}
        );
        nre_Description_ckeditor.on("paste", function (evt) {
          if (evt.data.dataTransfer.getFilesCount() > 0) {
            var nreDescriptionFile = evt.data.dataTransfer.getFile(0);
            var nreDescriptionReader = new FileReader();
            nreDescriptionReader.onload = function (evt) {
              var nreDescriptionPictureElement = nre_Description_ckeditor.document.createElement(
                "img",
                {
                  attributes: {
                    src: evt.target.result
                  }
                }
              );

              setTimeout(function () {
                nre_Description_ckeditor.insertElement(
                  nreDescriptionPictureElement
                );
              }, 0);
            };
            nreDescriptionReader.readAsDataURL(nreDescriptionFile);
          }
        });
      }
    }
  }
}

function toggleTabNrePrevious() {
  var activeTab = $('#nretab').find('li.active').attr('id')
  if (activeTab == "nre_projectTab") {
    $('.nav-tabs a[href="#nre_ClientDetails"]').tab("show");
    $(".btnPrevious").hide();
    $(".btnNext").show();
    $(".saveFamilyBtn").hide();
    $("a.btnSaveAndContinue").hide();
  }
  if (activeTab == "nre_documentTab") {
    if (!IsNreSaved) {
      $("a.btnSaveAndContinue").show();
      $("a.btnNext").hide();
    }
    else {
      $("a.btnSaveAndContinue").hide();
      $("a.btnNext").show();
    }
    $(".btnPrevious").show();
    $(".saveFamilyBtn").hide();
    $('.nav-tabs a[href="#nre_ProjectDetails"]').tab("show");
  }
}

function validateProjectDetails() {
  let errflag = false;
  if (nextFlag) {
    if ($("#nre_project_title").val() == "") {
      errflag = true;
      $("#nre_projectTitleError").html("Please Select Project Title field");
    } else {
      $("#nre_projectTitleError").html("");
    }

    if ($("#nre_project_type").val() == "") {
      errflag = true;
      $("#nre_projectTypeError").html("Please Select Project Type field");
    } else {
      $("#nre_projectTypeError").html("");
    }

    if ($("#nre_technology").val() == 0) {
      errflag = true;
      $("#nre_technologyError").html("Please Select Technology field");
    } else {
      $("#nre_technologyError").html("");
    }

    if ($("#nre_tech_stream").val() == "") {
      errflag = true;
      $("#nre_techStreamError").html("Please Select Tech Stream field");
    } else {
      $("#nre_techStreamError").html("");
    }

    if ($("#nre_application_type").val() == "") {
      errflag = true;
      $("#nre_applicationError").html("Please Select Application Type field");
    } else {
      $("#nre_applicationError").html("");
    }

    if ($("#nre_dtp_estimation_needed_date").val() == "") {
      errflag = true;
      $("#nre_EstimationError").html("Please Select Estimation Needed On field");
    } else {
      $("#nre_EstimationError").html("");
    }

    if ($("#nre_dtp_received_date").val() == "") {
      errflag = true;
      $("#nre_RecievedError").html("Please Select Recieved Date field");
    } else {
      $("#nre_RecievedError").html("");
    }

    if (!errflag) {
      return true;
    }
  }
}

function technologySeparated() {
  var textToAppend = "";
  var selMulti = $("#nre_technology option:selected").each(function () {
    textToAppend += textToAppend == "" ? "" : ",";
    textToAppend += $(this).text();
  });
  return textToAppend;
}

function saveNewRfpDetails(insertedId) {
  let NewClientStatus, Wishist;
  var technology = technologySeparated();
  if ($("#nre_new_client").prop("checked") == true) {
    NewClientStatus = true;
  } else {
    NewClientStatus = false;
  }
  if ($("#nre_wish_list").prop("checked") == true) {
    Wishist = true;
  } else {
    Wishist = false;
  }
  var objects = {
    User_Id: localStorage.getItem("EmployeeID"),
    Client_Code: $("#nre_client_code").val(),
    Client_Name: $("#nre_SmsClientlist option:selected").html(),
    Client_Address: $("#nre_SmsClientlist")
      .children("option:selected")
      .attr("data-address"),
    Client_State: $("#nre_SmsClientlist")
      .children("option:selected")
      .attr("data-state"),
    Wish_List: Wishist,
    Client_Country: $("input[name='country']").val(),
    Is_New_Client: NewClientStatus,
    Project_Title: $("#nre_project_title").val(),
    Project_Type: $("#nre_project_type").val(),
    Tech_Stream: $("#nre_tech_stream").val(),
    Technology: technology,
    Recieved_Date: $("#nre_dtp_received_date").val(),
    Estimation_Date: $("#nre_dtp_estimation_needed_date").val()
  };

  data = {
    Method: "PostNewRFP",
    Data: objects
  };
  var postNreOld = PostDataCall(data);
  if (postNreOld.IsSuccess == true) {
    saveSynergyNewRfpDetails(insertedId, postNreOld.Data[0].RFP_Icode);
  }
}

function saveSynergyNewRfpDetails(insertedId, RFP_Icode) {
  var Token = localStorage.getItem("login_securityToken");
  var ProposalId = localStorage.getItem("ProposalId");

  let NewClientStatus;
  let VIPAC;
  if ($("#nre_new_client").prop("checked") == true) {
    NewClientStatus = true;
  } else {
    NewClientStatus = false;
  }
  if ($("#nre_vip").prop("checked") == true) {
    VIPAC = true;
  } else {
    VIPAC = false;
  }
  var obj = {
    Token: Token,
    RequestForProposalId: insertedId,
    RFPICode: RFP_Icode,
    ClientName: $("#nre_company_Person").val(),
    ClientCode: $("#nre_client_code").val(),
    Department: $("#nre_dl_department").val(),
    CompanyName: $("#nre_SmsClientlist option:selected").html(),
    CompanyAddress: $("#nre_SmsClientlist")
      .children("option:selected")
      .attr("data-address"),
    ClientType: VIPAC,
    CountryId: $("input[name='country']").attr("data-countryid"),
    IsNewClient: NewClientStatus,
    ProjectTitle: $("#nre_project_title").val(),
    ProjectTypeId: $("#nre_project_type").val(),
    ApplicationType: $("#nre_application_type").val(),
    ReceivedDate: $("#nre_dtp_received_date").val(),
    EstimationNeededOn: $("#nre_dtp_estimation_needed_date").val(),
    IsActive: 0
  };

  data = {
    Method: "PostRequestForProposal",
    Data: obj
  };
  var postNre = PostDataCall(data);
  InsertedRequestForproposalId = postNre.Data[0].RequestForProposalId
  if (insertedId == null) {
    saveNewRfpDetails(InsertedRequestForproposalId);
    saveSynergyNewRfpTechnologies(InsertedRequestForproposalId);
  }
}

function getTechResorce(RequestForProposalId) {
  let selectedRes = $("#nre_technology").val();
  var resArr = [];
  selectedRes.forEach(elem => {
    let foundElement = window.nreTechRes.filter(
      filElem => filElem.SkillId == elem
    );
    if (foundElement.length > 0) {
      delete foundElement[0].Skill;
      delete foundElement[0].text;
      delete foundElement[0].id;
      foundElement[0].IsActive = true;
      foundElement[0].RFPId = RequestForProposalId;
      resArr.push(foundElement[0]);
    }
  });
  return `${JSON.stringify(resArr)}`;
}

//Save Technologies

function saveSynergyNewRfpTechnologies(RequestForProposalId) {
  var Token = localStorage.getItem("login_securityToken");

  var technology = {
    Token: Token,
    Data: getTechResorce(RequestForProposalId)
  };

  data = {
    Method: "PostTechnologiesInRFP",
    Data: technology
  };
  var postTechnology = PostDataCall(data);
  IsNreSaved = true;
}

function saveSynergyNewRfpComments(RequestForProposalId) {
  var Token = localStorage.getItem("login_securityToken");
  // if(CKEDITOR.instances.nre_txtareaDescription.getData() != "")
  // {
  //   var comments = {
  //     Token: Token,
  //     RFPId: RequestForProposalId,
  //     Comments: CKEDITOR.instances.nre_txtareaDescription.getData(),
  //     IsActive: true
  //   };
  
  //   data = {
  //     Method: "PostCommentsinRFP",
  //     Data: comments
  //   };
  //   var postComments = PostDataCall(data);
  // }
  if(editorDX.option("value") != "")
  {
    var comments = {
      Token: Token,
      RFPId: RequestForProposalId,
      Comments: editorDX.option("value"),
      IsActive: true
    };
  
    data = {
      Method: "PostCommentsinRFP",
      Data: comments
    };
    var postComments = PostDataCall(data);
  }
 
}

function saveSynergyNewRfpDocuments() {
var files = $('#nre_document_upload').get(0).dropzone.getAcceptedFiles();
  if (files.length > 0) {
    for (i = 0; i < files.length; i++) {
      var FileExtension = files[i].name.slice((Math.max(0, files[i].name.lastIndexOf(".")) || Infinity) + 1);
      var FileType = files[i].type;
      var FileName = files[i].name.substr(0, files[i].name.lastIndexOf("."));
      var formData = new FormData();
      formData.append('file', files[i]);
      var contentdetails =
        [{
          "DocumentTypeId": InsertedRequestForproposalId,
          "DocumentType": "RFP",
          "DocumentName":FileName,
          "Extension": FileExtension,
          "ContentType": FileType
        }]
      formData.append('contentdetails', JSON.stringify(contentdetails));
      var result = postFileGeneric(formData);
    }
  }
  saveSynergyNewRfpComments(InsertedRequestForproposalId);
  // sendEmailDetailsForRFP();
  closeNreModal();
}

function sendEmailDetailsForRFP()
{
var rfpFormData = new FormData();
var fileList = $('#nre_document_upload').get(0).dropzone.getAcceptedFiles();
// var desc = CKEDITOR.instances.nre_txtareaDescription.getData()
var desc = editorDX.option("value");
//Append rfp attachment
if (fileList.length > 0) {
    for (var i = 0; i <= fileList.length - 1; i++) {
        var sendMessageFile = fileList[i];
        rfpFormData.append('file'+(i+1),sendMessageFile);
    }
}
 //Append rfp details 
 var rfpDetails =
 {
    clientTitle: $("#nre_SmsClientlist option:selected").html(), 
    projectTitle:$("#nre_project_title").val(),
    comments: escape(desc)
 }
 rfpFormData.append('rfpDetails',JSON.stringify(rfpDetails));
 var result_sendemailforRFP = sendEmailForRFP(rfpFormData);
}

//Send RFP details
function sendEmailForRFP(rfpFormData){
  var result;
      $.ajax({
      url: SynergyAPIURL + "SendEmailForRFP",
      type: 'POST',
      enctype: 'multipart/form-data',
      processData: false,
      contentType: false,
      async: false,
      data: rfpFormData,
      headers: {
      "SecurityToken": localStorage.getItem("securityToken"),
      },
      success : (function(data) {
          setTimeout(function() {
             // console.log('data',data)
          }, 3000);
      })
  })
  .done(function(data) {
      setTimeout(function() {
         // console.log('data',data)
      }, delay);
      result = data;
  })
  .fail(function() {
      alert("fail");
  });
//console.log('message send',result);    
  return result;
}

function closeNreModal() {
  var swalRolesSucc = {
    title: "Success",
    text: 'New RFP Entered Successfully!!',
    icon: 'success'
  }
  swalMessage(swalRolesSucc);
  $('.nav-tabs a[href="#nre_ClientDetails"]').tab("show");
  nextFlag = false;
  IsNreSaved = false;
  InsertedRequestForproposalId = 0;
  $("#NreCloseButton").trigger("click");
  $(".btnPrevious").hide();
  $(".btnNext").show();
  $(".saveFamilyBtn").hide();
  $("a.btnSaveAndContinue").hide();
  $("#NreModal input").val("");
  $("#NreModal select").val("");
  $("#NreModal #nre_dl_department").prop('selectedIndex', 0);
  $("#NreModal #select2-nre_SmsClientlist-container").empty();
  $("#nre_technology").text("");
  getTechnologyList("nre_technology");
  // CKEDITOR.instances.nre_txtareaDescription.setData("");
  editorDX.option("value", "");
  nre_dropzone_remove_files();
}

var delay = (function () {
  var timer = 0;
  return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
  };
})();

function swalMessage(data){
  swal({
  title: data.title,
  text: data.text,
  icon: data.icon,
  button:"Close"
  });   
}

$("#NreCloseButton").click(function(){
  $('.nav-tabs a[href="#nre_ClientDetails"]').tab("show");
  nextFlag = false;
  IsNreSaved = false;
  InsertedRequestForproposalId = 0;
  $(".btnPrevious").hide();
  $(".btnNext").show();
  $(".saveFamilyBtn").hide();
  $("a.btnSaveAndContinue").hide();
  $("#NreModal input").val("");
  $("#NreModal select").val("");
  $("#NreModal #nre_dl_department").prop('selectedIndex', 0);
  $("#NreModal #select2-nre_SmsClientlist-container").empty();
  $("#nre_technology").text("");
  getTechnologyList("nre_technology");
  // CKEDITOR.instances.nre_txtareaDescription.setData("");
  editorDX.option("value", "");
  nre_dropzone_remove_files();
  delay(function () {
    getNewRfpList();
   }, 300);
   $("select#nre_SmsClientlist").html("");
})

// function ModalExpander(){
//   //alert('test');
//   $('#NreModal .modal-content').toggleClass("modal-expand");
// }


function HrRRMDetails(rfpId){
  $("#RFP_RRMDetails").modal("show");
  $(".error_message").html("");
  $("#RFPICode_RRMDetails").html(rfpId);
}

function close_RRMDetails(){
  $("#reopen_rrm").modal("show");
}