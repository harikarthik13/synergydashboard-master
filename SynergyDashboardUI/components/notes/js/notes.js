
$(document).ready(function () {
  getPrioritiesNotes();
  notesRefresh();
  getNotesList();
  // notes_DataTable();
});

var NotesSecurityToken = localStorage.getItem("securityToken");
var IsCalendar = 0;
var IsAlert = 0;
var time;
var calendar;

function notesModelOpen() {
  $(".error_message").html("");
  notesRefresh();
  $("#btnUpdateNotes").hide();
  $("#btnNotesSave").show();
  $("#modal-AddNotes").modal('show');

  $("#notes_alert").dxDateBox({
    type: "datetime",
    placeholder:"Select Date and Time",
    showClearButton: true,
    dateSerializationFormat:"yyyy-MM-ddTHH:mm:ss",
    onValueChanged: function (e) {
      $("#notes_alert_error").html("");
    }
  });
  $("#notes_calendarAlert").datetimepicker({

  });
}

function getNotesList() {
  $(".error_message").html("");
  var filter_val = JSON.stringify({
    Token: NotesSecurityToken,
    IsActive: true
  });
  var GetNotesList = callgetlist("GetProjectNotes", filter_val);
  console.log(GetNotesList);
  //var NewNotes = NewNotesHtml(GetNotesList);
  //$("#notes_display_table").html(NewNotes);
  renderNotesCardGrid(GetNotesList);
}

function renderNotesCardGrid(data) {
  var notesCardDataGrid = $("#sddgd-notesCard").dxDataGrid({
    dataSource: data,
    filterRow: {
      visible: true,
      applyFilter: "auto"
  },
  export: {
      enabled: true,
      allowExportSelectedData: true
  },
  searchPanel: {
      visible: true,
      width: 240,
      placeholder: "Search..."
  },
  headerFilter: {
      visible: true
  },
  wordWrapEnabled: true,
  filterPanel: { visible: true },
  allowColumnReordering: true,
  showBorders: true,
  onToolbarPreparing: function (e) {
    var dataGrid = e.component;
    e.toolbarOptions.items.unshift({
      location: "after",
      widget: "dxButton",
      options: {
        icon: "refresh",
        onClick: function () {
          getNotesList();
        },
      },
    });
  },
  columnAutoWidth: true,
  rowAlternationEnabled: true,
  allowColumnResizing: true,
  grouping: {
      autoExpandAll: true,
  },
  selection: {
      mode: "multiple"
  },
     summary: {
      totalItems: [],
      groupItems: []
  },
  pager: {
      showPageSizeSelector: true,
      allowedPageSizes: [5, 10, 20],
      showInfo: true
  },
  paging: {
      pageSize: 10
  },
  groupPanel: {
      visible: true,
      emptyPanelText: "Drag a column"
  },
  sorting: {
      mode: "multiple"
  },
  editing: {
      mode: "popup",
      allowAdding: false,
      allowUpdating: false,
      useIcons: true
  },
  columnChooser: {
      enabled: true
  },
  columnFixing: {
      enabled: true
  },
    columns: [
      {
        caption: "Description",
        dataField: "Description",
      },
      {
        caption: "Priority",
        dataField: "Priority"
      },
      {
        dataField: "",
        caption: "Action",
        width: 50,
        cellTemplate: function (container, options) {
          var notesId = options.data.NotesId;
          var domActions = "";
          domActions += "<button class='btn btn-xs btn-primary' onclick=notesEditModelOpen('" + notesId + "')><i class='fas fa-pencil-alt'></i></button>";
          $("<div class='text-center'>").append($(domActions)).appendTo(container);
        },
      }
    ]
  }).dxDataGrid("instance");
}

function getPrioritiesNotes() {
  var filter_val = JSON.stringify({
    Token: localStorage.getItem("securityToken"),
    IsActive: true
  });

  var getNotesPriorities = callgetlist("GetPrioritiesForNotes", filter_val);
  getNotesPriorities.forEach(function (item) {
    $('#notes_priority').append($("<option></option>").attr("value", item.PriorityId).text(item.PriorityName));
  });
}

$("#btnNotesSave").on("click", function () {
  if ($("#cmb-project").val() == 0) {
    $("#cmb-project_error").html("Please Select the Project");
    $("#cmb-project").focus();
  }
  if ($("#txtNotes").val() == "") {
    $("#txtNotes_error").html("Please Enter the Notes Detail");
    $("#txtNotes").focus();
  }
  if ($("#chkNeedAlert").prop('checked') == true && $("#notes_alert").dxDateBox("instance").option('value') == null) {
    $("#notes_alert_error").html("Please Select the Date field");
    $("#chkNeedAlert").focus();
  }
  if ($("#notes_priority").val() == "0") {
    $("#notes_priority_error").html("Please Select the Priority");
    $("#notes_priority").focus();
  }
  if ($("#chkAddToCalendar").prop('checked') == true && $("#timeAddToCalendar").val() == "") {
    $("#timeAddToCalendar_error").html("Please Select the Calendar field");
    $("#chkAddToCalendar").focus();
  }

  if ($("#cmb-project").val() != "0" && $("#txtNotes").val() != "" && $("#notes_priority").val() != "0" ||
    ($("#chkNeedAlert").prop('checked') == true && $("#notes_alert").dxDateBox("instance").option('value') != null) || ($("#chkAddToCalendar").prop('checked') == true && $("#timeAddToCalendar").val() != "")) {
    swal({
      title: "Are you sure?",
      text: "You want to Add Notes",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((addNotes) => {
        if (addNotes) {
          saveNotes();
        }
      });
  }
});

function saveNotes() {
  //   var alertDate=$("#dateNeedAlert").val();
  // var alertTime=$("#timeNeedAlert").val();
  // var AlertDateTime=new Date(Date.parse( alertTime.toString())); 
  // alert(AlertDateTime);
  if ($("#chkNeedAlert").prop('checked') == true) {
    IsAlert = 1;
    var dateBox = $("#notes_alert").dxDateBox("instance");
    time = dateBox.option('value');
  }
  else {
    IsAlert;
    time = null;
  }
  if ($("#chkAddToCalendar").prop('checked') == true) {
    IsCalendar = 1;
    calendar = $("#timeAddToCalendar").val();
  }
  else {
    IsCalendar;
    calendar = null;
  }
  var notes = {
    Token: NotesSecurityToken,
    NotesId: null,
    ProjectId: 1,
    Notes: $("#txtNotes").val(),
    PriorityId: $("#notes_priority").val(),
    IsAlert: IsAlert,
    AlertDateTime: time,
    IsCalender: IsCalendar,
    CalenderDateTime: calendar,
    IsActive: true
  };

  data = {
    Method: "PostNotes",
    Data: notes
  };
  var postNotes = PostDataCall(data);
  if (postNotes["IsSuccess"] == false) {
    var notesError = {
      title: "Error",
      text: postNotes['Message'],
      icon: 'error'
    }
    notes_swal(notesError);
  }
  else {
    swal({
      title: "Success",
      text: "Notes Details Saved Successfully!!!",
      icon: "success",
    })
    notesDelay(function () {
      notesRefresh();
    }, 300);
    getNotesList();
  }
}

$("#cmb-project,#txtNotes,#notes_priority,#timeAddToCalendar").change(function (event) {
  var id = event.currentTarget.id;
  $('#' + id + '_error').empty();
});


function notesEditModelOpen(NotesId) {
  // alert(NotesId);
  $(".error_message").html("");
  $("#notes_priority option").remove();
  $("#modal-AddNotes").modal('show');
  $("#btnNotesSave").hide();
  $("#btnUpdateNotes").show();
  
  $('#notes_priority').append($("<option></option>").attr("value", 0).text("---Select Priority---"));
  // $('#notes_priority').find('option').remove();
  getPrioritiesNotes();

  var filter_val = JSON.stringify({
    "Token": NotesSecurityToken,
    "NotesId": NotesId,
    "IsActive": true
  });

  var GetNotes = callgetlist("GetNotes", filter_val);
  if (GetNotes != null) {
    $("#notes_id").val(GetNotes[0].NotesId);
    $("#cmb-project").val(GetNotes[0].Project);
    $("#txtNotes").val(GetNotes[0].Notes);
    $("#notes_priority option:contains(" + GetNotes[0].Priority + ")").attr('selected', 'selected');

    if (GetNotes[0].IsAlert == true) {
      $("#divNeedAlert").show();
      $("#chkNeedAlert").prop('checked', 'checked');
      // $("#timeNeedAlert").datetimepicker("setDate",GetNotes[0].AlertDateTime);
      //var d = new Date(GetNotes[0].AlertDateTime);
      $("#notes_alert").dxDateBox({
        type: "datetime",
        value:GetNotes[0].AlertDateTime,
        placeholder:"Select Date and Time",
        showClearButton: true,
        onValueChanged: function (e) {
          $("#notes_alert_error").html("");
        }
      });     
    }
    else {
      $("#divNeedAlert").hide();
      $("#chkNeedAlert").prop('checked', false);
      $("#timeNeedAlert").val("");
    }
    if (GetNotes[0].IsCalender == true) {
      $("#divAddToCalendar").show();
      $("#chkAddToCalendar").prop('checked', 'checked');
      $("#timeAddToCalendar").val(GetNotes[0].CalenderDateTime);
    }
    else {
      $("#divAddToCalendar").hide();
      $("#chkAddToCalendar").prop('checked', false);
      $("#timeAddToCalendar").val("");
    }
  }
}

$("#btnUpdateNotes").on("click", function () {
  if ($("#cmb-project").val() == "0" || $("#notes_priority").val() == "") {
    $("#cmb-project_error").html("Please Select the Project");
    $("#cmb-project").focus();
  }
  if ($("#txtNotes").val() == "") {
    $("#txtNotes_error").html("Please Enter the Notes Detail");
    $("#txtNotes").focus();
  }
  if ($("#chkNeedAlert").prop('checked') == true && $("#notes_alert").dxDateBox("instance").option('value') == null) {
    $("#notes_alert_error").html("Please Select the Date field");
    $("#chkNeedAlert").focus();
  }
  if ($("#notes_priority").val() == "0") {
    $("#notes_priority_error").html("Please Select the Priority");
    $("#notes_priority").focus();
  }
  if ($("#chkAddToCalendar").prop('checked') == true && $("#timeAddToCalendar").val() == "") {
    $("#timeAddToCalendar_error").html("Please Select the Calendar field");
    $("#chkAddToCalendar").focus();
  }

  if ($("#cmb-project").val() != "0" && $("#txtNotes").val() != "" && $("#notes_priority").val() != "0" ||
    $("#chkNeedAlert").prop('checked') == true && $("#notes_alert").dxDateBox("instance").option('value') != null || $("#chkAddToCalendar").prop('checked') == true && $("#timeAddToCalendar").val() != "") {
    swal({
      title: "Are you sure?",
      text: "You want to Update Notes",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((updatesNotes) => {
        if (updatesNotes) {
          var NotesId = $("#notes_id").val();
          updateNotes(NotesId);
        }
      });
  }
});

function updateNotes(NotesId) {
  if ($("#chkNeedAlert").prop('checked') == true) {
    IsAlert = 1;
    var dateBox = $("#notes_alert").dxDateBox("instance");
    time = dateBox.option('value');
  }
  else {
    IsAlert;
    time = null;
  }
  if ($("#chkAddToCalendar").prop('checked') == true) {
    IsCalendar = 1;
    calendar = $("#timeAddToCalendar").val();
  }
  else {
    IsCalendar;
    calendar = null;
  }
  var notes = {
    Token: NotesSecurityToken,
    NotesId: NotesId,
    ProjectId: 1,
    Notes: $("#txtNotes").val(),
    PriorityId: $("#notes_priority").val(),
    IsAlert: IsAlert,
    AlertDateTime: time,
    IsCalender: IsCalendar,
    CalenderDateTime: calendar,
    IsActive: true
  };

  data = {
    Method: "PostNotes",
    Data: notes
  };
  var postNotes = PostDataCall(data);
  if (postNotes["IsSuccess"] == false) {
    var notesError = {
      title: "Error",
      text: postNotes['Message'],
      icon: 'error'
    }
    notes_swal(notesError);
  }
  else {
    swal({
      title: "Success",
      text: "Notes Details Updated Successfully!!!",
      icon: "success",
    })
    notesDelay(function () {
      notesRefresh();
    }, 300);
    getNotesList();
  }
}

function notesRefresh() {
  $("#cmb-project").val("0");
  $("#txtNotes").val("");
  $("#chkNeedAlert").prop("checked", false);
  $("#divNeedAlert").hide();
 // $("#notes_alert").dxDateBox("instance").option('value')==null;
  $("#notes_priority").val("0");
  $("#chkAddToCalendar").prop("checked", false);
  $("#divAddToCalendar").hide();
  $("#timeAddToCalendar").val("");
  $("#modal-AddNotes").trigger("click");
}

$("#btnCancelNotes").on("click", function () {
  $("#cmb-project").val("0");
  $("#txtNotes").val("");
  $("#chkNeedAlert").prop("checked", false);
  //$("#notes_alert").dxDateBox("instance").option('value')==null;
  $("#notes_priority").val("0");
  $("#chkAddToCalendar").prop("checked", false);
  $("#dateAddToCalendar").val("");
  $("#divNeedAlert").hide();
  $("#divAddToCalendar").hide();
});

function notes_swal(data) {
  swal({
    title: data.title,
    text: data.text,
    icon: data.icon,
    button: "OK"
  });
}

var notesDelay = (function () {
  var timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();


var notes_count = 0;
var dropdownNotification = "";
function notes_showNotification() {
  $(".notes_badge").html(notes_count = 0);
  $("#notes_notification_list").find('li').remove();

  var filter_val = JSON.stringify(
    {
      "Token": localStorage.getItem('securityToken'),
      "IsActive": true
    }
  );
  var result = callgetlist('GetAlertNotes', filter_val);
  if (result.length == 0) {
    $(".notes_badge").html(notes_count);
  }
  else {
    $("#notes_notification_list").find('li').remove();
    dropdownNotification = "";
    result.forEach(function (item) {
      $(".notes_badge").html(++notes_count);
      if (item.Notes.length <= 10) {
        dropdownNotification += '<li style="border-top:3px solid #E7EAED;border-bottom:3px solid #E7EAED;margin:15px;margin-top:1px;list-style:none;"><span style="color:#0078D4;font-weight:bold;">Notes Notification</span><br><i class="fa fa-check" style="color:#5DB300;"></i>' + item.Notes + '<span class="fas fa-remove pull-right" style="color:gray" onclick = "clears_notesNotification(\'' + item.NotesId + '\');" ></span></li>';
      }
      else {
        var result_notes;
        result_notes = item.Notes.slice(0, 35);
        dropdownNotification += '<li style="display: inline-flex;border-top:3px solid #E7EAED;border-bottom:3px solid #E7EAED;margin-left:15px;margin-top:1px;"><a style="width: 21em;" href="#" onclick="swal_msg(\'' + item.Notes + '\',\'' + item.AlertDateTime + '\',\'' + item.Priority + '\');" data-placement="top" data-toggle="tooltip" title="Read More.."><span style="color:#0078D4;font-weight:bold;">Notes Notification</span><br><i class="fa fa-check" style="color:#5DB300;"></i>' + result_notes + '.........<br><span class="pull-right">' + item.AlertDateTime + '</span></a><a href="#" class="pull-right" onclick = "clears_notesNotification(\'' + item.NotesId + '\');" ><span class="fas fa-remove" style="color:gray"></span></a></li>';
      }
    });

    $("#notes_notification_list").append(dropdownNotification);
  }
}

function clears_notesNotification(NotesId) {
  var notes_status = {
    Token: localStorage.getItem('securityToken'),
    NotesId: NotesId,
    IsSeen: true,
    IsActive: true
  };

  data = {
    Method: "PostAlertNotesBySeen",
    Data: notes_status
  };
  var postNotes_status = PostDataCall(data);
  if (postNotes_status["IsSuccess"] == true) {
    $("#notes_notification_list").find('li').remove();
    notes_showNotification();
  }
}

function swal_msg(Notes, Time, Priority) {
  const wrapper = document.createElement('h5');
  wrapper.innerHTML = 'To Remind: ' + Notes + '<br><span>Time Mentioned: </span>' + Time + '<br><span>Priority for Note: </span>' + Priority;
  swal({
    title: "Note",
    content: wrapper,
    icon: "components/notes/images/notes.jpg"
  });
}