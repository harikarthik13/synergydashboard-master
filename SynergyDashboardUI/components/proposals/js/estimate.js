function GetProjectPhases(clientclassname) {
  var filter_val = JSON.stringify({
    "IsActive": true
  });
  var result = callgetlist('GetProposalPhases', filter_val);
  //console.log(result);
  var options = "<option value=''>Select Project Phases</option>";
  for (var i = 0; i < result.length; i++) {
    options += "<option value='" + result[i].Id + "'>" + result[i].ProjectPhase + "</option>";
  }
  $("." + clientclassname).html(options);
}


var dataEmployee = [];
var dataEmployeeApi = [];

function insertProjectPhase(EstimateprojectphaseId = null) {



  var localget = localStorage.getItem("UserCheckRes");
  var jsonData = JSON.parse(localget);
  var err = 0;

  var ProjectPhaseId = $('#ProjectPhaseId').val();
  if (ProjectPhaseId == "") {
    $('#ProjectPhaseId').addClass('required_field');
    $("#ProjectPhaseId").next("span").html('Please Select Project Phase.');
    err++;
  }

  var HeaderTitle = $('#HeaderTitle').val();
  if (HeaderTitle == "") {
    $('#HeaderTitle').addClass('required_field');
    $("#HeaderTitle").next("span").html('Please Enter Header Title.');
    err++;
  }

  var Description = $('#Description').val();
  if (Description == "") {
    $('#Description').addClass('required_field');
    $("#Description").next("span").html('Please Add Description.');
    err++;
  }

  var Hours = $('#Hours').val();
  // if(Hours == ""){
  //   $('#Hours').addClass('required_field');
  //   $("#Hours").next("span").html('Please Enter Hours.');
  //   err++;
  // }

  if (err > 0) {
    return false;
  } else {
    $('.phaseError').removeClass("required_field");
    $('.error_message').html("");
  }

  var get_ProposalId = localStorage.getItem('ProposalId');
  var set_ProposalId = "";
  if (get_ProposalId != "") {
    set_ProposalId = get_ProposalId;
  } else {
    ProposalSwal("OOPS!","PropsalId not found","error")
    return false;
  }

  if (EstimateprojectphaseId != "") {

    RFPProjectPhase = {
      "EstimateProjectPhaseId": EstimateprojectphaseId,
      "ProposalId": set_ProposalId,
      "ProjectPhaseId": ProjectPhaseId,
      "HeaderTitle ": HeaderTitle,
      "Description": Description,
      "Hours": Hours,
    };



  } else {

    RFPProjectPhase = {
      "EstimateProjectPhaseId": "",
      "ProposalId": set_ProposalId,
      "ProjectPhaseId": ProjectPhaseId,
      "HeaderTitle ": HeaderTitle,
      "Description": Description,
      "Hours": Hours,
    };

  }


  data = {
    "Method": "PostRFPProjectPhase",
    "Data": RFPProjectPhase
  }
  
  var postCall = PostDataCall(data);
  //console.log(postCall);
  if (postCall['IsSuccess'] == true) {
    //console.log(postCall['Message']);
    clearAndShow();
    displayProjectPhase();
  } else {
    ProposalSwal("OOPS!",(postCall['Message']),"error");
    //console.log(postCall['Message']);
  }

}

function clearAndShow() { // Clear our fields
  
  $('.phaseError').val('');
  $("#projectPhase_action").attr("onclick", "insertProjectPhase()");
  $('#projectPhase_action').html("Add");
}


function displayProjectPhase() {

  var SavedProjectPhases = GetAddedProjectPhases();
  //console.log(SavedProjectPhases);
  renderProjectPhases(SavedProjectPhases)
  // HTML = computeHTML(SavedProjectPhases);
  //Added varible and function for Display PDF content
  let HTMLPDF = projectphase_pdf(SavedProjectPhases);
  // $("#displayProjectphase").html(HTML);
  $("#pdf_Estimate").html(HTMLPDF);
}

function computeHTML(SavedProjectPhases) {

  var html = "<table id='ProjectPhasesTable' class='table table-striped'>";
  html += "<tr>";
  html += "<th>Project Phases</th>"
  html += "<th>Header Title</th>"
  html += "<th>Hours</th>"
  html += "<th>Actions</th>"
  html += "</tr>";
  if (SavedProjectPhases.length == 0) {
    html += "<tr colspan='4'><td>No Data Found.!</td></tr>";
  } else {
    SavedProjectPhases.forEach(function (key, item) {
      var projectId = key.PhaseId;
      html += "<tr class='row_" + item + "' id='row_" + key.Id + "'>";
      html += "<td><input type='hidden' class='phase' value='" + key.PhaseId + "' description='" + key.Description + "'> " + key.Phase + "</td>"
      html += "<td><input type='hidden' class='title' value='" + key.HeaderTitle + "'>" + key.HeaderTitle + "</td>"
      html += "<td><input type='hidden' class='hours' value='" + key.Hours + "'>" + key.Hours + "</td>"
      html += "<td><button class='btn btn-xs btn-primary edit-btn' onclick=editRow_projectPhase('" + key.Id + "')><i class='fas fa-pencil-alt'></i></button>"
      html += "<button class='btn btn-xs btn-danger delete-btn' onclick=deleteRow_projectPhase('" + key.Id + "')><i class='fas fa-trash-alt'></i></button></td>"
      html += "</tr>";
    });

  }

  html += "</table>"
  return html;
}

function logEvent(eventName) {
  var logList = $("#events ul"),
      newItem = $("<li>", { text: eventName });

  logList.prepend(newItem);
}

function renderProjectPhases(SavedProjectPhases) {
  var projectPhaseDataGrid = $("#displayProjectphase")
    .dxDataGrid({
      filterRow: {
        visible: true,
        applyFilter: "auto",
      },
      dataSource: SavedProjectPhases,
      keyExpr: "Id",
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
        mode: "row",
        allowUpdating: true,
        allowDeleting: true,
        allowAdding: true
    }, 
      columnChooser: {
        enabled: true,
      },
      rowAlternationEnabled: true,
      filterPanel: { visible: true },
      allowColumnReordering: true,
      allowColumnResizing: true,
      showBorders: true,
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
              projectPhaseDataGrid.pageIndex() * projectPhaseDataGrid.pageSize() + options.rowIndex + 1
            );
          },
        },
        {
          caption: "Project Phases",
          dataField: "Phase"
        },
        {
          caption: "Header Title",
          dataField: "HeaderTitle"
        },
        {
          caption: "Hours",
          dataField: "Hours",
          alignment: "center"
        },
      ],
      onEditingStart: function(e) {
        logEvent("EditingStart");
    },
    onInitNewRow: function(e) {
        logEvent("InitNewRow");
    },
    onRowInserting: function(e) {
        logEvent("RowInserting");
    },
    onRowInserted: function(e) {
        logEvent("RowInserted");
    },
    onRowUpdating: function(e) {
        logEvent("RowUpdating");
        console.log("Saving...");
        console.log("e key",e.key);


        var get_ProposalId = localStorage.getItem('ProposalId');
        var set_ProposalId = "";
        if (get_ProposalId != "") {
          set_ProposalId = get_ProposalId;
        } else {
          ProposalSwal("OOPS!","PropsalId not found","error")
          return false;
        }
        // console.log("EstimateProjectPhaseId : ",e.key,", ProposalId : ",set_ProposalId,", ProjectPhaseId : ",e.oldData.PhaseId,", HeaderTitle : ",e.oldData.HeaderTitle,", Description : ",e.oldData.Description,", Hours : ",e.oldData.Hours);
        var RFPProjectPhase = {
          "EstimateProjectPhaseId": e.key,
          "ProposalId": set_ProposalId,
          "ProjectPhaseId": (e.newData.PhaseId) ? e.newData.PhaseId : e.oldData.PhaseId,
          "HeaderTitle": (e.newData.HeaderTitle) ? e.newData.HeaderTitle : e.oldData.HeaderTitle,
          "Description": (e.newData.Description) ? e.newData.Description : e.oldData.Description,
          "Hours": (e.newData.Hours) ? e.newData.Hours : e.oldData.Hours,
        };

        console.log(" Old Data : EstimateProjectPhaseId : ",e.key,", ProposalId : ",set_ProposalId,", ProjectPhaseId : ",e.oldData.PhaseId,", HeaderTitle : ",e.oldData.HeaderTitle,", Description : ",e.oldData.Description,", Hours : ",e.oldData.Hours);
        console.log("New Data : EstimateProjectPhaseId : ",e.key,", ProposalId : ",set_ProposalId,", ProjectPhaseId : ",e.newData.PhaseId,", HeaderTitle : ",e.newData.HeaderTitle,", Description : ",e.newData.Description,", Hours : ",e.newData.Hours);
        console.log("Chk passing data ",RFPProjectPhase );
        data = {
          "Method": "PostRFPProjectPhase",
          "Data": RFPProjectPhase
        }
        
        var postCall = PostDataCall(data);
        console.log(postCall);
        if (postCall['IsSuccess'] == true) {
          console.log(postCall['Message']);
          clearAndShow();
          displayProjectPhase();
        } else {
          ProposalSwal("OOPS!",(postCall['Message']),"error");
          console.log(postCall['Message']);
        }
    },
    onRowUpdated: function(e) {
        logEvent("RowUpdated");
    },
    onRowRemoving: function(e) {
        logEvent("RowRemoving");
        console.log(e.key);
        data = {
          "Method": "DeleteRFPProjectPhase",
          "Data": {
            "ProjectPhaseId": e.key,
          }
        }
        var postCall = PostDataCall(data);
        if (postCall['IsSuccess'] == true) {
          // jQuery('#row_' + projectId).remove();
          // ProposalSwal("Success!",postCall['Message'],"success");
          console.log(postCall['Message']);
        } else {
          // ProposalSwal("OOPS!",postCall['Message'],"error"); 
          console.log(postCall['Message']);   
        }
    },
    onRowRemoved: function(e) {
        logEvent("RowRemoved");
    },
    onSaving: function(e) {
        logEvent("Saving");
    },
    onSaved: function(e) {
        logEvent("Saved");
    },
    onEditCanceling: function(e) {
        logEvent("EditCanceling");
    },
    onEditCanceled: function(e) {
        logEvent("EditCanceled");
    }
    })
    .dxDataGrid("instance");
}


//project phase pdf
function projectphase_pdf(SavedProjectPhases) {
  var html = "<div id='ProjectPhases'>";
  if (SavedProjectPhases.length == 0) {
    html += '<p>No Data</p>';
  } else {
    SavedProjectPhases.forEach(function(key, item) {
      var projectId = key.PhaseId;
      var sample_id = item + 1;
      html += '<ul>';
      html += '<li><b>' + key.HeaderTitle + '</b>';
      html += '<ul style="list-style: none;">';
      html += '<li>';
      html += '<ul>';
      html += '<li style="list-style: none;">' + key.Description + '</li>';
      html += '</ul>';
      html += '</li>';
      html += '</ul>';
      html += '</li>';
      html += '</ul>';
    });
  }

  html += '</div>';
  return html;
}


function GetAddedProjectPhases() {
  var localStorageProposalId = localStorage.getItem('ProposalId');
  var SetProposalId = "";
  if (localStorageProposalId != "") {
    SetProposalId = localStorageProposalId;
  }
  // var localget = localStorage.getItem("UserCheckRes");
  // var jsonData = JSON.parse(localget);
  var filter_val = JSON.stringify({
    "ProposalId": SetProposalId,
    "IsActive": true
  });
  var result = callgetlist('GetProjectPhaseDetails ', filter_val);
  //console.log(result);
  return result;

}


function displayEstimateProjectDetails() {
  var SavedProjectPhases = GetAddedProjectPhases();
  HTML = ProjectPhaseHTML(SavedProjectPhases);
  $("#displayEstimateProjectphase").html(HTML);
  //$("#displayProjectphase").html(HTML);
  //console.log(SavedProjectPhases);
}

function displayEstimateHeader(SetProposalId){
  var filter_val = JSON.stringify({
    "ProposalId": SetProposalId,
    "IsActive": true
  });
  var result = callgetlist('GetEstimateHeader ', filter_val);
  if(result) {
    $("#proposal-title-5").html(result[0]['Title']);
  }
}



function ProjectPhaseHTML(SavedProjectPhases) {
  /* grouping code start here */
  var groups = {};
  for (var i = 0; i < SavedProjectPhases.length; i++) {
    var groupName = SavedProjectPhases[i].Phase;
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    setarray = {
      "Id": SavedProjectPhases[i].Id,
      "HeaderTitle": SavedProjectPhases[i].HeaderTitle,
      "Hours": SavedProjectPhases[i].Hours,
      "Description": SavedProjectPhases[i].Description,
      "PhaseId": SavedProjectPhases[i].PhaseId,
    }
    groups[groupName].push(setarray);
  }

  SavedProjectPhases = [];
  for (var groupName in groups) {
    SavedProjectPhases.push({
      Phase: groupName,
      details: groups[groupName]
    });
  }

  /* grouping code ends here */
  var html = '<div id="content-4" class=" content cont-box-cvr">';

  if (SavedProjectPhases.length == 0) {
    html += "No Data Found.!";
  } else {
    SavedProjectPhases.forEach(function (item, key) {

      count = key + Number(1);
      html += "<div class='phase-box'>";
      html += "<div class='phase-title'>";
      html += "<h3>" + count + " : " + item.Phase + "</h3>";
      html += "</div>";
      var tasks = item.details;
      tasks.forEach(function (item, key) {
        var projectId = item.PhaseId;
        html += "<div class='cont-box'>";
        html += "<div class='form-group pull-right'><label>Estimated Hours:</label><input id='EstimatedHours_" + item.Id + "' type='number' class='form-control' min='0'  value='" + item.Hours + "' onkeypress='prevent_negative(event)' onblur='Estimate_blur(this.id)'></div>";
        html += "<h4><span class='green-clr'>Header Title:</span><span >" + item.HeaderTitle + "</span></h4>";
        html += "<p class='small-title'><span class='green-clr'>Description</span></p>";
        html += "<p>" + item.Description + "</p>";
        html += "</div>";

        html += "<input type='hidden' id='Phase_" + item.Id + "' value='" + item.PhaseId + "''>";
        html += "<input type='hidden' id='HeaderTitle_" + item.Id + "' value='" + item.HeaderTitle + "''>";
        html += "<input type='hidden' id='Description_" + item.Id + "' value='" + item.Description + "''>";
        html += "<input type='hidden' id='oldHours_" + item.Id + "' value='" + item.Hours + "''>";
      });
      html += "</div>";
    });
  }

  html += "</div>";
  return html;
}

function prevent_negative(e)
{
  var inputKeyCode = e.keyCode ? e.keyCode : e.which;

        if (inputKeyCode != null) {
            if (inputKeyCode == 45) e.preventDefault();
        }
}
function editRow_projectPhase(projectId) {

  var get_id = projectId;

  var SavedProjectPhases = GetAddedProjectPhases();

  SavedProjectPhases.forEach(function (projectId, item) {

    if (projectId.Id == get_id) {
      var Description = projectId.Description;
      var res = Description.replace("<P>", "");
      //console.log(Description);

      $("#Description").val(Description);

    }

  });

  var Phase = jQuery("#row_" + projectId + " td .phase").val();
  var Description = jQuery("#row_" + projectId + " td .phase").attr("description");
  var Hours = jQuery("#row_" + projectId + " td .hours").val();
  var HeaderTitle = jQuery("#row_" + projectId + " td .title").val();

  //Initialized with default value

  //console.log(Phase);

  var parent_fielset = jQuery("#step-4");

  parent_fielset.find("#ProjectPhaseId").val(Phase);
  parent_fielset.find("#Hours").val(Hours);
  parent_fielset.find("#HeaderTitle").val(HeaderTitle);
  parent_fielset.find("#Description").val(Description);
  parent_fielset.find("#projectPhase_action").attr("onclick", "insertProjectPhase('" + projectId + "')");
  parent_fielset.find("#projectPhase_action").html('Update');
}




function Estimate_blur(elementId) {
  var Id = elementId.replace("EstimatedHours_", "");
  var Ehours = document.getElementById(elementId).value;
  var Ehours_old = document.getElementById("oldHours_" + Id).value;
  if(Ehours < 0){
    ProposalSwal("Warning!","Please add Non-negative value!","warning");
    return false;
  }

  var get_ProposalId = localStorage.getItem('ProposalId');
  var set_ProposalId = "";
  if (get_ProposalId != "") {
    set_ProposalId = get_ProposalId;
  } else {
    ProposalSwal("OOPS!","PropsalId not found","error")
    return false;
  }

  if (Ehours_old != Ehours) {

    /*//console.log(Ehours);  */
    $("#oldHours_" + Id).val(Ehours); //Assign current hours to old hours

    var Etitle = document.getElementById("HeaderTitle_" + Id).value;
    var Edescription = document.getElementById("Description_" + Id).value;
    var Ephase = document.getElementById("Phase_" + Id).value;
    var Eid = Id;

    var get_value = {
      "EstimateProjectPhaseId": Id,
      "Description": Edescription,
      "HeaderTitle": Etitle,
      "Hours": Ehours,
      "ProjectPhaseId": Ephase,
      "ProposalId": set_ProposalId,
    };

    data = {
      "Method": "PostRFPProjectPhase",
      "Data": get_value
    }

    var postCall = PostDataCall(data);
    /*//console.log('Here I have set ProjectId 1 as default for temprory solution.');*/
    if (postCall['IsSuccess'] == true) {
      //console.log(postCall['Message']);
      return true;
    } else {
      //console.log(postCall['Message']);
      return true;
    }

  }
}



function deleteRow_projectPhase(projectId) {

  swal({
    title: "Are you sure?",
    text: "Do you want to delete?",
    icon: "warning",
    buttons: true,
  })
  .then((result) => {
    if (result) {
      data = {
        "Method": "DeleteRFPProjectPhase",
        "Data": {
          "ProjectPhaseId": projectId,
        }
      }
      var postCall = PostDataCall(data);
      if (postCall['IsSuccess'] == true) {
        jQuery('#row_' + projectId).remove();
        ProposalSwal("Success!",postCall['Message'],"success");
      } else {
        ProposalSwal("OOPS!",postCall['Message'],"error");    
      }
    }
  });
}

function AddEstimateHeader(SetProposalId){
  var estimate_title = $("#proposal-title-5").html();
  data = {
    "Method": "PostEstimateHeader",
    "Data": {
      "ProposalId": SetProposalId,
      "Title": estimate_title,
    }
  }
  var postCall = PostDataCall(data);
}