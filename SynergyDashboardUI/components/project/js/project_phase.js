var togglePhase=true;
function displayAddedProjectPhase(){
    var SavedProjectPhase = GetAddedProjectPhase();
    HTML = projectPhase(SavedProjectPhase);
    $("#displayProjectPhase").html(HTML);
}

function GetAddedProjectPhase() {
    var filter_val = JSON.stringify({
      "ProjectId": "sampleProjectId",
      "IsActive": true,
      "ProjectId":"1",
      "ProjectPhasesId": null
    });

    var result = callgetlist('GetProjectPhase', filter_val);
    return result;
  
  }


function projectPhase(SavedProjectPhase){
   var html = "<table id='tableProjectPhase' class='table table-striped table-hover'>";
   html += "<tr>";
   html += "<th>Project Phases</th>"
   html += "<th>Header Title</th>"
   html += "<th>Hours</th>"
   if($("#dlClientProjectType :selected").text() != 'fixedbid') {
      $('#addNewProject').show();
      html += "<th><div class=pull-right>Actions</div></th>"
   } else {
      $('#addNewProject').hide();
   }
   html += "</tr>";
   if (SavedProjectPhase.length == 0) {
     html += "<tr colspan='4'><td>No Data Found.!</td></tr>";
   }  else {
    SavedProjectPhase.forEach(function (key, item) {
       html += "<td><input type='hidden' value='" + key.ProjectPhasesId + "'>" + key.ProjectPhasesName + "</td>"
       html += "<td><input type='hidden' value='" + key.HeaderTitleId + "'>" + key.HeaderTitleName + "</td>"
       html += "<td><input type='hidden' value='" + key.Hours + "'>" + key.Hours + "</td>"
       if($("#dlClientProjectType :selected").text() != 'fixedbid') {
          html +=" <td><div class='pull-right'><button class='btn btn-secondary btn-xs' type='button' onclick=updateProjectPhase('"+ key.ProjectPhasesId +"')><i class='fas fa-pencil-alt'></i></button>"
          html +=" <button class='btn btn-danger btn-xs' type='button'><i class='fas fa-trash-alt'></i></button></div></td>" 
       }
          html += "</tr>";
     });
   }
 
   html += "</table>"
   return html;
 }


 function updateProjectPhase(phaseId) {
  togglePhase=true;
  toggleProjectPhase();
  $("#add-project-phases .error_message").html('');
  var filter_val = JSON.stringify({
    "ProjectId": "sampleProjectId",
    "IsActive": true,
    "ProjectId":"1",
    "ProjectPhasesId": phaseId
  });

  let result = callgetlist('GetProjectPhase', filter_val);
  result.forEach(function (key, item) {
    $("#hdnPhaseId").val(key.ProjectPhasesId);
    $("#txtPhaseName").val(key.ProjectPhasesName);
    $("#txtHeaderTitle").val(key.HeaderTitleName);
    $("#dtpPhaseStartDate").val(key.PhaseStartDate);
    $("#dtpPhaseEndDate").val(key.PhaseEndDate);
    $("#txtHours").val(key.Hours);
    let phaseStatus= + key.ActivityStatus;
    if(phaseStatus==true)
    {
      document.getElementById("PhaseStatus").checked = true;
    }
    else{
      document.getElementById("PhaseStatus").checked = false;
    }
    $("#txtNote").val(key.Note);
  });

}

function clearPhase() {
  toggleProjectPhase();
  $(':input').val('');
  $(':input').prop("checked",false);
  $("#add-project-phases .error_message").html(''); 
}

function toggleProjectPhase()
{
  if(togglePhase)
  {
    $('#add-project-phases').collapse('show')
    togglePhase = false;
  }
  else
  {
    $('#add-project-phases').collapse('hide');
    togglePhase = true;
  }

};

function deleteProjectPhase() {
  var filter_val = JSON.stringify({
    "ProjectId": "sampleProjectId",
    "IsActive": true,
    "ProjectPhaseId" : null
  });

  var result = callgetlist('DeleteProjectPhase', filter_val);
  return result;
}
  