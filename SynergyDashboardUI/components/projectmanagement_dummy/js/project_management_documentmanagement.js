var toggleProjectUpload=true;
Dropzone.autoDiscover = false;
 var projectDocumentUploaded = false;
 var uploadProjectDocumentModule = false;


$('#ProjectDocumentModal').find('#upload-project-documents #btn-saveproject-document').on("click",function(){
    uploadProjectDocumentModule=true;
    let ValidateDocument=validateProjectDocuments();
    if(ValidateDocument)
    {
        SaveProjectDocument();
    }        
});

$('#ProjectDocumentModal').find('#upload-project-documents input[type=text]').on("input",function(){
    validateProjectDocuments();
})

$('#ProjectDocumentModal').find('#upload-project-documents textarea').on("input",function(){
    validateProjectDocuments();
})


function validateProjectDocuments(){
    let errFlag = false;
    let cnt = 0;
    if(uploadProjectDocumentModule)
    {
        $('#ProjectDocumentModal').find('#upload-project-documents input[type=text]').each(function () {
            if ($(this).val() == "") {
                cnt++
                $(this).parents('div .txtDocument').find('.error_message').html('This field is required')
            } else {
                $(this).parents('div .txtDocument').find('.error_message').html('')
            }
        })

        $('#ProjectDocumentModal').find('#upload-project-documents textarea').each(function () {

            if ($(this).val() == "") {
                cnt++
                $(this).parents('div .txtDocument').find('.error_message').html('This field is required')
            } else {
                $(this).parents('div .txtDocument').find('.error_message').html('')
            }
        })

        if(!projectDocumentUploaded)
        {
            cnt++
            $('#ProjectDocumentModal').find('#upload-project-documents .error_upload').html('Upload a document')
        }
        else
        {
            $('#ProjectDocumentModal').find('#upload-project-documents .error_upload').html('')
        }
    }
    errFlag = (cnt > 0) ? false : true;
    return errFlag;
}


function DocumentManagementModal()
{
    $('#ProjectDocumentModal').appendTo('body').modal('show');
    ShowProjectDocuments();
    projectdocumentdropzone();

}

function projectdocumentdropzone()
{
    var myAwesomeDropzone = new Dropzone("form#project-document-upload-form", {
        maxFiles: 1,
        addRemoveLinks: true,
        init            : function() {
            this.on("success", function(file, responseText) {
                projectDocumentUploaded=true;
                validateProjectDocuments();
            });
            this.on("removedfile", function (file){
                projectDocumentUploaded=false;
                validateProjectDocuments();
            });
        }
    });
}

function resetDocumentUpload()
{
    toggleProjectDocument();
    $("#upload-project-documents .error_message").html('');
    Dropzone.forElement('#project-document-upload-form').removeAllFiles(true);
    $("#upload-project-documents :input").val("");
    $("#upload-project-documents :input").prop("checked",false);
}

function toggleProjectDocument()
{
  if(toggleProjectUpload)
  {
    $('#upload-project-documents').collapse('show')
    toggleProjectUpload = false;
  }
  else
  {
    $('#upload-project-documents').collapse('hide');
    toggleProjectUpload = true;
  }

}

function ShowProjectDocuments(){
    let SavedProjectDocuments = GetProjectDocuments(); 
    let tableProjectDesign = GenerateProjectDocuments(SavedProjectDocuments);
    $("#show-project-documents").html(tableProjectDesign);
}

function GetProjectDocuments(){
  let filter_val = JSON.stringify({
    "IsActive": true,
    "ProjectId": "1"
  });

  let result = callgetlist('GetProjectDocuments', filter_val);
  return result;
}

function GenerateProjectDocuments(SavedProjectDocuments) {
    let Activitystatus;
    let html = "<table id='project-document-table' class='table table-responsive table-striped table-hover'>";
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
        html += "<button type='button' class='btn btn-secondary btn-xs' onclick=SelectProjectDocument('"+key.ProjectDocumentFileId+"')><i class='fas fa-pencil-alt'></i></button>"
        html += "<button type='button' class='btn btn-danger btn-xs' onclick=DeleteProjectDocument('"+key.ProjectDocumentFileId+"')><i class='fas fa-trash-alt'></i></button></div></td>"
        html += "</tr>"
        });
    }  
    html += "</table>"
    return html;
    }

function SelectProjectDocument(fieldId)
{
    toggleProjectUpload=true;
    toggleProjectDocument();
    $("#upload-project-documents .error_message").html('');
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
        $("#document-file-id").val(key.ProjectDocumentFileId);
        $("#txt-project-document-name").val(key.ProjectDocumentFileName);
        $("#txt-project-document-description").val(key.ProjectDocumentDescription);
        if(key.ProjectDocumentStatus==true)
        {
            $("#chk-document-activity-status").prop( "checked", true );
        }
        else
        {
            $("#chk-document-activity-status").prop( "checked", false );
        }
        })
    }
}

function SaveProjectDocument()
{
  let ProjectDocumentStatus;
  if($("#chk-document-activity-status").prop( "checked") == true)
  {
    ProjectDocumentStatus=true;
  }
  else
  {
    ProjectDocumentStatus=false;
  }
  let filter_val = JSON.stringify({
  "IsActive":0,
  "WorkOrderId":"AS12QA12",
  "ProjectId":"1",
  "ProjectDocumentId":$("#document-file-id").val(),
  "ProjectDocumentFileName":$("#txt-project-document").val(),
  "ProjectDocumentFileData":null,
  "ProjectDocumentDescription":$("#txt-project-document-description").val(),
  "ProjectDocumentStatus":ProjectDocumentStatus
  });    
  let ProjectDocumentDetails = callgetlist('PostProjectDocuments', filter_val);	
  resetDocumentUpload();
  return ProjectDocumentDetails;
}

function DeleteProjectDocument(fieldId)
{
  let filter_val = JSON.stringify({
    "IsActive": true,
    "ProjectId": "1",
    "ProjectDocumentId":fieldId
  });

  let result = callgetlist('DeleteProjectDocuments', filter_val);
}