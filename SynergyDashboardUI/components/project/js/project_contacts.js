var toggleContacts=true;
function displayAddedProjectContacts(){
    var SavedProjectContacts = GetAddedProjectContacts();
    HTML = projectContacts(SavedProjectContacts);
    $("#displayProjectContacts").html(HTML);
}

function GetAddedProjectContacts() {
    var filter_val = JSON.stringify({
      "ProjectId": "sampleProjectId",
      "IsActive": true,
      "ProjectId":"1",
      "ClientContactId" : null
    });

    var result = callgetlist('GetProjectContacts', filter_val);
    return result;
  
  }


function projectContacts(SavedProjectContacts){
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
 
 
 function updateProjectContacts(ClientId) {
  toggleContacts=true;
  toggleProjectContacts();
  $("#add-project-contacts .error_message").html('');
  var filter_val = JSON.stringify({
    "IsActive": true,
    "ProjectId":"1",
    "ClientContactId": ClientId
  });

  let result = callgetlist('GetProjectContacts', filter_val);
  result.forEach(function (key, item) {
    $("#hdnClientContactId").val(key.ClientContactId);
    $("#txtClientName").val(key.ClientContactName);
    $("#txtEmailId").val(key.EmailId);
    $("#txtPhoneNo1").val(key.PhoneNo1);
    $("#dlCountry").val(key.Country); 
    getStates(key.Country);
    $("#dlState").val(key.States); 
    getCity(key.States)
    $("#dlCity").val(key.City); 
    $("#txtFaxNo").val(key.FaxNo);
    $("#txtSkypeId").val(key.SkypeId);
  });
}
 

$("#add-project-contacts").ready(function() 
{
  getCountries();
});

  function getCountries(){
    let filter_val = JSON.stringify();
    let result = callgetlist('GetCountries', filter_val);
    let options = "<option value=''>Select Country</option>";
    for (let i = 0; i < result.length; i++) {
    options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
    }
    $("#dlCountry").html(options);
  }
  $("#dlCountry").on('change', function() {
    getStates(this.value)
  });
  function getStates(country){
    let filter_val = JSON.stringify({
        "CountryId": country
      });
    let result = callgetlist('GetStates', filter_val);
    let options = "<option value=''>Select State</option>";
    for (let i = 0; i < result.length; i++) {
    options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
    }
    $("#dlState").html(options);
  }

  function getCity(state){
    let filter_val = JSON.stringify({
        "StateID": state
      });
    let result = callgetlist('GetCities', filter_val);
    let options = "<option value=''>Select City</option>";
    for (let i = 0; i < result.length; i++) {
    options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
    }
    $("#dlCity").html(options);
  }

  function clearProjectContact() {
    toggleProjectContacts();
    $(':input').val('');
    $("#add-project-contacts .error_message").html('');
  }

  function toggleProjectContacts()
  {
  if(toggleContacts)
  {
    $('#add-project-contacts').collapse('show')
    toggleContacts = false;
  }
  else
  {
    $('#add-project-contacts').collapse('hide');
    toggleContacts = true;
  }

  };

  function deleteProjectContacts() {
    var filter_val = JSON.stringify({
      "ProjectId": "sampleProjectId",
      "IsActive": true,
      "ClientId" : null
    });

    var result = callgetlist('DeleteProjectContacts', filter_val);
    return result;
  }