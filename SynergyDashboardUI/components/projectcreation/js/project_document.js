var CommentsContent = new Array();

function openCommentsHistoryForProject(){

  var GetCommentsInProjectFilter = JSON.stringify({
    "Token" : localStorage.getItem("securityToken"),
    "ProjectId" : $("#dlProjectId").val() ,
  });
  var GetProjectCommentsHistory = callgetlist("GetCommentsinProject", GetCommentsInProjectFilter);
  var ProjectCommentsHistoryHtml = "";
  var ProjectNoCommentsCount = 0;
  var ProjectNoDocumentsCount = 0;
  GetProjectCommentsHistory.forEach(function(item){
    var ProjectCommentCreatedDate = new Date(item.CreatedDate);
    var ProjectCommentDateMonthYear = ProjectCommentCreatedDate.toLocaleDateString();
    var ProjectCommentTime = ProjectCommentCreatedDate.toLocaleTimeString();
    if((item.DocumentType == "Comment" || item.DocumentType == "") && item.Content != null)
    {
      var comment = item.Content.split("<p>");

      if(comment.length > 1){
        var message = '';
        for(let i = 0; i <= comment.length; i++){
          message += comment[i]; 
          message += " ";
        }
        comment = "<p>"+message+"</p>";
      }else{
        comment = comment.toString();
      }
      CommentsContent[item.Id] = comment;
      $colon = (item.EmployeeName != " ")?':':'';
      ProjectCommentsHistoryHtml += "<small class='pull-left' style='padding-top:5px'><span>"+item.EmployeeName+$colon+"</span></small>";
      ProjectCommentsHistoryHtml += "<div class='rfp_comment' onclick=ProjectCommentSwal('" + item.Id + "')>";
      ProjectCommentsHistoryHtml += "<small class='pull-right'><span>"+ProjectCommentDateMonthYear+"</span><span>"+ProjectCommentTime+"</span></small>";
      var commentElement = $(CommentsContent[item.Id]);
      if(CommentsContent[item.Id].includes("<img"))
      {        
        commentElement.find('img').remove();
        ProjectCommentsHistoryHtml += "<small>Message contains some image(s) click to expand</small>";
      }
      ProjectCommentsHistoryHtml += "<label>"+commentElement.html()+"</label></div>";
    }
    if(item.DocumentType == "Document" && item.Content != null)
    {
      ProjectCommentsHistoryHtml += "<small class='pull-left' style='padding-top:5px'><span>"+item.EmployeeName+":</span></small>";
      ProjectCommentsHistoryHtml += "<div class='rfp_comment'>";
      ProjectCommentsHistoryHtml += "<small class='pull-right'><span>"+ProjectCommentDateMonthYear+"</span><span>"+ProjectCommentTime+"</span></small>";
      ProjectCommentsHistoryHtml += "<small style='padding-bottom:10px'><b>"+item.DocumentName+"."+item.DocumentExtension+" </b></small>";
      ProjectCommentsHistoryHtml += "<b>Download-file: </b><button class='btn btn-primary btn-xs' onclick=DownloadProjectDocument('" + item.Id + "')><span class='glyphicon glyphicon-arrow-down'></span></button></div>";
    }
    if(item.DocumentType == "Comment" && item.Content == null)
    {
      ProjectNoCommentsCount += 1;      
    }
    if(item.DocumentType == "Document" && item.Content == null)
    {
      ProjectNoDocumentsCount += 1;      
    }
  });
  if(GetProjectCommentsHistory.length == 0 )
  {
    ProjectCommentsHistoryHtml = "<h3 class='text-center'>There are No Comments and Documents Yet</h3>";
  }
  $("#Project_comments_history").html(ProjectCommentsHistoryHtml);
}

function saveProjectComments(){
  var dlProjectID = (dlProjectID != null && dlProjectID != '') ? dlProjectID : localStorage.getItem('ProjectId');
  var finalComments = $("#Project_message_Description").dxHtmlEditor('instance').option('value');
  var files = $('#crproject_message_document_upload').get(0).dropzone.getAcceptedFiles();

  if(files.length > 0){ 
    saveProjectDocuments();
  }

  if (finalComments !== "") {
 
    // if($("#dlProjectIsClosed").val() != 1){
      var dataComment = {
        "Method": "PostCommentsInProject",
        "Data": {
          "Token": localStorage.getItem('securityToken'),
          "ProjectId": dlProjectID, 
          "Comments": finalComments, 
          "IsActive": 1
        }
      }
      
      PostDataCallAsync(dataComment, function (resultComments) {
        if (resultComments['IsSuccess'] == true) {
          swal({
            title: "Success!",
            text: "Saved Successfully!",
            icon: "success",
            button: "ok!",
          })   
          openCommentsHistoryForProject();
          $("#Project_message_Description").dxHtmlEditor('instance').option('value',"");
        }else{
          swal({
            title: "Warning!",
            text: "Something Went Wrong",
            icon: "warning",
            button: "ok!",
          })
          $("#Project_message_Description").dxHtmlEditor('instance').option('value',"");
        }  
      });
    // }
  }
}

function ProjectCommentSwal(ContentId){
  const wrapper = document.createElement('div');
  wrapper.innerHTML = CommentsContent[ContentId];
  swal({
    title: 'Comment',
    content: wrapper
  });
}

$(document).ready(function () {
  Dropzone.autoDiscover = false;
  var ProjectDocumentUpload = new Dropzone("#crproject_message_document_upload", {
    addRemoveLinks: true,
    uploadMultiple: true,
    autoProcessQueue: false,
    url: saveProjectDocuments,
  }); 
});

function ProjectDropzoneRemoveFiles() {
  Dropzone.forElement("#crproject_message_document_upload").removeAllFiles(true);
}

function saveProjectDocuments() 
{
  var ProjectDocumentsFiles = $('#crproject_message_document_upload').get(0).dropzone.getAcceptedFiles();
  var dlProjectID = (dlProjectID != null && dlProjectID != '') ? dlProjectID : localStorage.getItem('ProjectId');
  if (ProjectDocumentsFiles.length > 0) {
    for (i = 0; i < ProjectDocumentsFiles.length; i++) {
      var FileExtensions = ProjectDocumentsFiles[i].name.slice((Math.max(0, ProjectDocumentsFiles[i].name.lastIndexOf(".")) || Infinity) + 1);
      var FileTypes = ProjectDocumentsFiles[i].type;
      var FileNames = ProjectDocumentsFiles[i].name.substr(0, ProjectDocumentsFiles[i].name.lastIndexOf("."));
      var ProjectDocumentsFormData = new FormData();
      ProjectDocumentsFormData.append('content', ProjectDocumentsFiles[i]);
      var Contentdetails =
      [{
        "DocumentTypeId": dlProjectID,
        "DocumentType": "PRM",
        "DocumentName":FileNames,
        "Extension": FileExtensions,
        "ContentType": FileTypes
      }]

      ProjectDocumentsFormData.append('Contentdetails', JSON.stringify(Contentdetails));
      var saveProjectDocumentsResult = postFileGeneric(ProjectDocumentsFormData);
    }
  }
}