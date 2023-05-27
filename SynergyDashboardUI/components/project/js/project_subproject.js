var toggleSubProject=true;

function displayAddedSubProject(){
    var SavedSubProject = GetAddedSubProject();
    let HTMLContent = generateSubProject(SavedSubProject);
    $("#displaySubProject").html(HTMLContent);
}

function GetAddedSubProject() {
    var filter_val = JSON.stringify({
      "IsActive": true,
      "ProjectId":"1"
    });

    let result = callgetlist('GetSubProject', filter_val);
    return result;  
}

function generateSubProject(SavedSubProject){
   var html = "<table id='tableSubProject' class='table table-striped table-hover'>";
   html += "<tr>";
   html += "<th>Sub Project</th>"
   html += "<th>Start Date</th>"
   html += "<th>End Date</th>"
   html += "<th>Client Name</th>"
   html += "<th></th>"
   html += "</tr>";
   if (SavedSubProject.length == 0) {
     html += "<tr colspan='4'><td>No Data Found.!</td></tr>";
   } else {
    SavedSubProject.forEach(function (key, item) {
       html += "<td><input type='hidden' value='" + key.SubProjectId + "'>" + key.SubProjectName + "</td>"
       html += "<td><input type='hidden' value='" + key.StartDate+ "'>" + key.StartDate + "</td>"
       html += "<td><input type='hidden' value='" + key.EndDate+ "'>" + key.EndDate + "</td>"
       html += "<td><input type='hidden' value='" + key.ClientId+ "'>" + key.ClientName + "</td>"
       html +=" <td><div class='pull-right'><button class='btn btn-secondary btn-xs' type='button' onclick=selectSubProject('"+key.SubProjectId+"')><i class='fas fa-pencil-alt'></i></button>"
       html +=" <button class='btn btn-danger btn-xs' type='button' onclick=deleteSubProject('"+key.SubProjectId+"')><i class='fas fa-trash-alt'></i></button></div></td>"
       html += "</tr>";
     });
   }
 
   html += "</table>"
   return html;
 }

function selectSubProject(subProjectId)
{
  toggleSubProject=true;
  toggleSubProjectScreen();
  $("#new-sub-project .error_message").html('');
  let filter_val = JSON.stringify({
    "IsActive": true,
    "ProjectId": "1",
    "SubProjectId":subProjectId
  });

  let result = callgetlist('GetSubProject', filter_val);
  if(result.length==0)
  {
    alert("No data found")
  }
  else
  {
    result.forEach(function (key, item) {
      $("#hiddenSubProjectId").val(key.SubProjectId);
      $("#txtSubProjectName").val(key.SubProjectName);
      $("#dtpProjectPlannedDate").val(key.StartDate);
      $("#dtpProjectEndDate").val(key.EndDate);
      $("#dlSubProjectDomain :selected").val(key.ProjectDomainId);
      $("#dlSubProjectDomain :selected").text(key.ProjectDomain);
      $("#dlSubClientName :selected").val(key.ClientId);
      $("#dlSubClientName :selected").text(key.ClientName);
      $("#txtSubProjectDescription").val(key.ProjectDescription);
    })
  }
}

function resetSubProject()
{
  toggleSubProjectScreen();
  subProjectSave=false;
  $("#new-sub-project .error_message").html('');
  $("#new-sub-project :input").val("");
}

function toggleSubProjectScreen()
{
  if(toggleSubProject)
  {
    $('#new-sub-project').collapse('show')
    toggleSubProject = false;
  }
  else
  {
    $('#new-sub-project').collapse('hide');
    toggleSubProject = true;
  }
}

function saveSubProject(subProjectId)
{
  let filter_val = JSON.stringify({
    "IsActive":0,
    "ProjectId": "1",
    "SubProjectId":subProjectId,
    "SubProjectName":$("#txtSubProject").text(),
    "Name":null,
    "PlannedStartDate":$("#dtpProjectPlannedDate").text(),
    "PlannedEndDate":$("#dtpProjectEndDate").text(),
    "ProjectDomainId":$("#dlSubProject").val(),
    "EndClientId": $("#dlEndClient").val(),
    "ProjectDescription": $("#txtProjectDescription").text()
  });    
  let subProjectDetails = callgetlist('PostProjectDocuments', filter_val);	
  resetSubProject();
  return subProjectDetails;
}

function deleteSubProject(subProjectId)
{
  let filter_val = JSON.stringify({
    "IsActive": true,
    "SubProjectId": subProjectId
  });

  let result = callgetlist('DeleteProjectDocuments', filter_val);
}