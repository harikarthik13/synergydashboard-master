function GetDeliverableProjectPhases(clientclassname) {
  var filter_val = JSON.stringify({
    "IsActive": true
  });
  var result = callgetlist('GetProjectPhases', filter_val);
  //console.log(result);
  var options = "<option value=''>Select Project Phases</option>";
  for (var i = 0; i < result.length; i++) {
    options += "<option value='" + result[i].Id + "'>" + result[i].ProjectPhase + "</option>";
  }
  $("." + clientclassname).html(options);
}


function GetProjectDeliverableByDescription(clientclassname) {
  var filter_val = JSON.stringify({
    "IsActive": true
  });
  var result = callgetlist('GetProjectDeliverableByDescription', filter_val);
  //console.log(result);
  var options = "<option value=''>Select Benchmark</option>";
  for (var i = 0; i < result.length; i++) {
    options += "<option value='" + result[i].Id + "'>" + result[i].Description + "</option>";
  }
  $("." + clientclassname).html(options);


}


var dataEmployee = [];
var dataEmployeeApi = [];

function insertDeliverables(DeliverableId = null) {

  $("#AddDeliverables").html("Add");

  var localget = localStorage.getItem("UserCheckRes");
  var jsonData = JSON.parse(localget);
  var err = 0;

  var DeliverableProjectPhase = $('#DeliverableProjectPhase').val();
  if (DeliverableProjectPhase == "") {
    $('#DeliverableProjectPhase').addClass('required_field');
    $("#DeliverableProjectPhase").next("span").html('Please Select Project Phase.');
    err++;
  } else {
    $('#DeliverableProjectPhase').removeClass('required_field');
    $("#DeliverableProjectPhase").next("span").html('');
  }

  var DeliverableDays = $('#DeliverableDays').val();
  if (DeliverableDays == "" || DeliverableDays <= 0) {
    $('#DeliverableDays').addClass('required_field');
    $("#DeliverableDays").next("span").html('Please Enter Deliverable Days.');
    err++;
  } else {
    $('#DeliverableDays').removeClass('required_field');
    $("#DeliverableDays").next("span").html('');
  }

  var DelivarbleReasons = $('#DelivarbleReasons').val();
  if (DelivarbleReasons == "") {
    $('#DelivarbleReasons').addClass('required_field');
    $("#DelivarbleReasons").next("span").html('Please Select Atleast One Reason.');
    err++;
  } else {
    $('#DelivarbleReasons').removeClass('required_field');
    $("#DelivarbleReasons").next("span").html('');
  }

  if (err > 0) {
    return false;
  } else {
    /*$('.DeliverableError').removeClass("required_field");
    $('.error_message').html("");*/
  }

  var get_ProposalId = localStorage.getItem('ProposalId');
  var set_ProposalId = "";
  if (get_ProposalId != "") {
    set_ProposalId = get_ProposalId;
  } else {
    ProposalSwal("OOPS!","PropsalId not found","error");
    return false;
  }


  if (DeliverableId != "") {

    DeliverableDetails = {
      "ProjectDeliverableId": DeliverableId,
      "ProposalId": set_ProposalId,
      "PhaseId": DeliverableProjectPhase,
      "ApproximateDays": DeliverableDays,
      "BenchMarkId": DelivarbleReasons
      /*"DelivarbleReasons":DelivarbleReasons*/
    };



  } else {

    DeliverableDetails = {
      "ProjectDeliverableId": "",
      "ProposalId": set_ProposalId,
      "PhaseId": DeliverableProjectPhase,
      "ApproximateDays": DeliverableDays,
      "BenchMarkId": DelivarbleReasons
      /*"DelivarbleReasons":DelivarbleReasons*/
    };

  }

  data = {
    "Method": "PostRFPProjectDeliverables",
    "Data": DeliverableDetails
  }

  //console.log(data);

  var postCall = PostDataCall(data);
  if (postCall['IsSuccess'] == true) {
    //console.log(postCall['Message']);
    DeliverableclearAndShow();
    displayDeliverableProjectPhase();

  } else {
    ProposalSwal("OOPS!",postCall['Message'],"error");
    //console.log(postCall['Message']);
  }

}

function DeliverableclearAndShow() { // Clear our fields
  $('.DeliverableError').val('');
  $("#AddDeliverables").attr("onclick", "insertDeliverables()");
  $("#AddDeliverables").html("Add");
}


function displayDeliverableProjectPhase() {
  var SavedDeliverableProjectPhases = GetAddedDeliverableProjectPhases();
  //console.log(SavedDeliverableProjectPhases);
  HTML = DeliverablecomputeHTML(SavedDeliverableProjectPhases);
  //Added variable and function to Display PDF content
  HTMLPDF = DeliverablePDFcomputeHTML(SavedDeliverableProjectPhases);
  $("#displayDeliverableProjectPhase").html(HTML);

  if(SavedDeliverableProjectPhases.length == '0'){
    $(".project_deliverable_block").hide();
    $("#Project_deliverable").hide();
  }else{
    $("#pdf_Deliverables").html(HTMLPDF);
  }
 
}

function DeliverablecomputeHTML(SavedDeliverableProjectPhases) {

  var html = "<table id='DeliverableProjectPhase' class='table table-striped'>";
  html += "<tr>";
  html += "<th>Projects / Features</th>";
  html += "<th>Approx.Delivery Days</th>";
  html += "<th>Benchmark</th>";
  html += "<th>Actions</th>";
  html += "</tr>";
  if (SavedDeliverableProjectPhases.length == 0) {
    html += "<tr><td colspan='4'>No Data Found.!</td></tr>";
  } else {
    SavedDeliverableProjectPhases.forEach(function (key, item) {
      var projectId = key.TypesOfNoteId;
      var bId = key.BenchMarkId;
      /*alert(projectId);*/
      var pf = key.Projects;
      html += "<tr class='row_" + item + "' id='row_" + key.ID + "'>";
      html += "<td><input type='hidden' class='ProjectFeatures' value='" + projectId + "' bId='" + bId + "'> " + key.ProjectsFeatures + "</td>";
      html += "<td><input type='hidden' class='ApproximateDate' value='" + key.ApproximateDays + "'>" + key.ApproximateDays + "</td>";
      html += "<td><input type='hidden' class='BenchmarkDescription' value='" + key.Description + "'>" + key.Description + "</td>";
      html += "<td><button class='btn btn-xs btn-primary edit-btn' onclick=editRow_Previous_deliverable('" + key.ID + "')><i class='fas fa-pencil-alt'></i></button>";
      html += "<button class='btn btn-xs btn-danger delete-btn' onclick=deleteRow_Previous_deliverable('" + key.ID + "')><i class='fas fa-trash-alt'></i></button></td>";
      html += "</tr>";
    });

  }

  html += "</table>"
  return html;
}


//PDF Deliverable content
function DeliverablePDFcomputeHTML(SavedDeliverableProjectPhases) {

  var html = "<table id='DeliverableProjectPhasepdf' class='table table-striped'>";
  html += "<tr>";
  html += "<th>#</th>";
  html += "<th>Projects / Features</th>";
  html += "<th>Approx.Delivery Days</th>";
  html += "</tr>";
  if (SavedDeliverableProjectPhases.length == 0) {
    html += "<tr><td colspan='4'>No Data Found.!</td></tr>";
  } else {
    SavedDeliverableProjectPhases.forEach(function (key, item) {
      var projectId = key.TypesOfNoteId;
      var bId = key.BenchMarkId;
      var sample_id = item + 1;
      /*alert(projectId);*/
      var pf = key.Projects;
      html += "<tr class='row_" + item + "' id='row_" + key.ID + "'>";
      html += "<td>"+  sample_id +"</td>";
      html += "<td><input type='hidden' class='ProjectFeatures' value='" + projectId + "' bId='" + bId + "'> " + key.ProjectsFeatures + "</td>";
      html += "<td><input type='hidden' class='ApproximateDate' value='" + key.ApproximateDays + "'>" + key.ApproximateDays +" "+ key.Description + "</td>";
      html += "</tr>";
    });

  }

  html += "</table>"
  return html;
}


function GetAddedDeliverableProjectPhases() {

  var get_ProposalId = localStorage.getItem('ProposalId');
  var set_ProposalId = "";
  if (get_ProposalId != "") {
    set_ProposalId = get_ProposalId;
  }
  // var localget = localStorage.getItem("UserCheckRes");
  // var jsonData = JSON.parse(localget);
  var filter_val = JSON.stringify({
    "IsActive": true,
    "ProposalId": set_ProposalId
  });
  var result = callgetlist('GetProjectDeliverablesDetails', filter_val);
  //console.log(result);
  return result;

}


function editRow_Previous_deliverable(projectId) {


  var get_id = projectId;

  var SavedProjectPhases = GetAddedDeliverableProjectPhases();

  var ProjectFeatures = jQuery("#row_" + projectId + " td .ProjectFeatures").val();
  var AppxDays = jQuery("#row_" + projectId + " td .ApproximateDate").val();
  var Description = jQuery("#row_" + projectId + " td .ProjectFeatures").attr("bId");

  //Initialized with default value

  $("#DeliverableProjectPhase").val(ProjectFeatures);
  $("#DeliverableDays ").val(AppxDays);
  $("#DelivarbleReasons").val(Description);
  $("#AddDeliverables").attr("onclick", "insertDeliverables('" + projectId + "')");
  $("#AddDeliverables").html("Update");


  /*parent_fielset.find("#pre_emp_action").attr("onclick", "insertDeliverables('"+projectId+"')");*/
}





function deleteRow_Previous_deliverable(projectId) {

    swal({
      title: "Are you sure?",
      text: "Do you want to delete?",
      icon: "warning",
      buttons: true,
    })
    .then((result) => {
      if (result) {
        data = {
          "Method": "DeleteProjectDeliverable",
          "Data": {
            "ProjectDeliverableId": projectId,
          }
        }
        var postCall = PostDataCall(data);
        if (postCall['IsSuccess'] == true) {
          displayDeliverableProjectPhase();
          jQuery('#row_' + projectId).remove();
          ProposalSwal("Success!",postCall['Message'],"success");
        } else {
          ProposalSwal("OOPS!",postCall['Message'],"error");    
        }
      }
    });
}