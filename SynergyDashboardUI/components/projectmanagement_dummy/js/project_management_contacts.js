
function displayProjectManagementContacts(){
    var ProjectContacts = GetProjectContacts();
    let HTMLData = projectContactsTable(ProjectContacts);
    $("#displayContacts").html(HTMLData);
}

function GetProjectContacts() {
    var filter_val = JSON.stringify({
      "ProjectId": "sampleProjectId",
      "IsActive": true,
      "ProjectId":"1",
      "ClientContactId" : null
    });

    var result = callgetlist('GetProjectContacts', filter_val);
    return result;
  
  }


function projectContactsTable(SavedProjectContacts){
   var html = "<table id='tableProjectContacts' class='table table-striped table-hover'>";
   html += "<tr>";
   html += "<th>Client Contact Name</th>"
   html += "<th>Email ID</th>"
   html += "<th></th>"
   html += "</tr>";
   if (SavedProjectContacts.length == 0) {
     html += "<tr colspan='4'><td>No Data Found.!</td></tr>";
   } else {
    SavedProjectContacts.forEach(function (key, item) {
    
       html += "<td><input type='hidden' value='" + key.ClientContactId + "'>" + key.ClientContactName + "</td>"
       html += "<td><input type='hidden' value='" + key.EmailId + "'>" + key.EmailId  + "</td>"
       html +=" <td><div class='pull-right'><button class='btn btn-secondary btn-xs' type='button' onclick=updateProjectContacts('"+ key.ClientContactId +"')><i class='fas fa-pencil-alt'></i></button>"
       html +=" <button class='btn btn-danger btn-xs' type='button'><i class='fas fa-trash-alt'></i></button></div></td>"
       html += "</tr>";
     });
   }
   html += "</table>"
   return html;
 }