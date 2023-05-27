function displayProjectPhaseManagement(){
    var ProjectPhase = GetProjectPhase();
    HTML = projectManagementPhase(ProjectPhase);
    $("#displayProjectManagementPhase").html(HTML);
}

function GetProjectPhase() {
    var filter_val = JSON.stringify({
      "ProjectId": "sampleProjectId",
      "IsActive": true,
      "ProjectId":"1",
      "ProjectPhasesId": null
    });

    var result = callgetlist('GetProjectPhase', filter_val);
    return result;
  
  }


function projectManagementPhase(SavedProjectPhase){
   var html = "<table id='tableProjectPhase' class='table table-striped table-hover'>";
   html += "<tr>";
   html += "<th>Project Phases</th>"
   html += "<th>Header Title</th>"
   html += "<th>Hours</th>"
   html += "<th><div class=pull-right>Actions</div></th>"
   html += "</tr>";
   if (SavedProjectPhase.length == 0) {
     html += "<tr colspan='4'><td>No Data Found.!</td></tr>";
   } else {
    SavedProjectPhase.forEach(function (key, item) {
       html += "<td><input type='hidden' value='" + key.ProjectPhasesId + "'>" + key.ProjectPhasesName + "</td>"
       html += "<td><input type='hidden' value='" + key.HeaderTitleId + "'>" + key.HeaderTitleName + "</td>"
       html += "<td><input type='hidden' value='" + key.Hours + "'>" + key.Hours + "</td>"
       html +=" <td><div class='pull-right'><button class='btn btn-secondary btn-xs' type='button' onclick=updateProjectPhase('"+ key.ProjectPhasesId +"')><i class='fas fa-pencil-alt'></i></button>"
       html +=" <button class='btn btn-danger btn-xs' type='button'><i class='fas fa-trash-alt'></i></button></div></td>"
       html += "</tr>";
     });
   }
 
   html += "</table>"
   return html;
 }