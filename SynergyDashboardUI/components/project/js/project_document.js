var toggleUpload=true;

function displayAddedProjectDocuments(){
    let SavedProjectDocuments = GetAddedProjectDocuments(); 
    HTML = generateProjectDocuments(SavedProjectDocuments);
    $("#displayProjectDocuments").html(HTML);
}

function GetAddedProjectDocuments() {
  let filter_val = JSON.stringify({
    "IsActive": true,
    "ProjectId": "1"
  });

  let result = callgetlist('GetProjectDocuments ', filter_val);
  return result;
}

function generateProjectDocuments(SavedProjectDocuments) {
  let Activitystatus;
  let html = "<table id='ProjectDocumentsTable' class='table table-responsive table-striped table-hover'>";
  html += "<tr>";
  html += "<th>Document</th>"
  html += "<th>Description</th>"
  html += "<th>Status</th>"
  html += "<th></th>"
  html += "</tr>";
  if (SavedProjectDocuments.length == 0) {
    html += "<tr colspan='4'><td>No Data Found.!</td></tr>";
  } else {
      SavedProjectDocuments.forEach(function (key, item) {
      if(key.ProjectDocumentStatus==true)
      {
          Activitystatus = "Active";
      }
      else if(key.ProjectDocumentStatus==false)
      {
          Activitystatus = "Inactive";
      }
      html += "<tr class='row_" + item + "' id='row_" + key.ProjectDocumentFileId + "'>"
      html += "<td><i class='fas fa-file-word ico-word'></i><input type='hidden' value='" + key.ProjectDocumentFileName + "'>" + key.ProjectDocumentFileName + "</td>"
      html += "<td><input type='hidden' value='" + key.ProjectDocumentDescription + "'>" + key.ProjectDocumentDescription + "</td>"
      html += "<td><input type='hidden' value='" + Activitystatus + "'>" + Activitystatus + "</td>"
      html += "<td><div class='actionButtons pull-right'><button type='button' class='btn btn-success btn-xs'><i class='fas fa-download'></i></button>"
      html += "<button type='button' class='btn btn-secondary btn-xs' onclick=selectProjectDocument('"+key.ProjectDocumentFileId+"')><i class='fas fa-pencil-alt'></i></button>"
      html += "<button type='button' class='btn btn-danger btn-xs' onclick=deleteProjectDocument('"+key.ProjectDocumentFileId+"')><i class='fas fa-trash-alt'></i></button></div></td>"
      html += "</tr>"
    });
  }  
  html += "</table>"
  return html;
}

function selectProjectDocument(fieldId)
{
  toggleUpload=true;
  toggleUploadProjectDocument();
  $("#upload-documents .error_message").html('');
  let filter_val = JSON.stringify({
    "IsActive": true,
    "ProjectId": "1",
    "DocumentFileId":fieldId
  });

  let result = callgetlist('GetProjectDocuments', filter_val);
  if(result.length==0)
  {
    alert("No data found")
  }
  else
  {
  result.forEach(function (key, item) {
      $("#DocumentFileId").val(key.ProjectDocumentFileId);
      $("#txtProjectDocumentName").val(key.ProjectDocumentFileName);
      $("#txtProjectDocumentDescription").val(key.ProjectDocumentDescription);
      if(key.ProjectDocumentStatus==true)
      {
        $("#chkDocumentActivityStatus").prop( "checked", true );
      }
      else
      {
        $("#chkDocumentActivityStatus").prop( "checked", false );
      }
    })
  }
}

function resetDocumentUploadForm()
{
    toggleUploadProjectDocument();
    uploadDocumentModule=false;
    $("#upload-documents .error_message").html('');
    Dropzone.forElement('#demo-upload').removeAllFiles(true);
    $("#upload-documents :input").val("");
    $("#upload-documents :input").prop("checked",false);
}

function toggleUploadProjectDocument()
{
  if(toggleUpload)
  {
    $('#upload-documents').collapse('show')
    toggleUpload = false;
  }
  else
  {
    $('#upload-documents').collapse('hide');
    toggleUpload = true;
  }

}

function saveProjectDocument()
{
  let ProjectDocumentStatus;
  if($("#chkDocumentActivityStatus").prop( "checked") == true)
  {
    ProjectDocumentStatus=true;
  }
  else
  {
    ProjectDocumentStatus=false;
  }
  let filter_val = JSON.stringify({
  "IsActive":0,
  "WorkOrderId":$("#dlclientWorkOrder").val(),
  "ProjectId":"1",
  "ProjectDocumentId":$("#DocumentFileId").val(),
  "ProjectDocumentFileName":$("#txtProjectDocumentName").val(),
  "ProjectDocumentFileData":null,
  "ProjectDocumentDescription":$("#txtProjectDocumentDescription").val(),
  "ProjectDocumentStatus":ProjectDocumentStatus
  });    
  let ProjectDocumentDetails = callgetlist('PostProjectDocuments', filter_val);	
  resetDocumentUploadForm();
  return ProjectDocumentDetails;
}

function deleteProjectDocument(fieldId)
{
  let filter_val = JSON.stringify({
    "IsActive": true,
    "ProjectId": "1",
    "ProjectDocumentId":fieldId
  });

  let result = callgetlist('DeleteProjectDocuments', filter_val);
}