var GetAnnouncementList =  [];
var popup = null;

function renderPopup() {
  
  var popupOptions = {
    width: 900,
    height: 590,
    contentTemplate: 'AnnouncementModelContent',
    showTitle: true,
    title: "New/Edit Announcement Entry"
  };
  
  popup = $("#AnnouncementModal").dxPopup(popupOptions).dxPopup("instance");
  popup.show(); 

  var editor = $("#txtareaDescription").dxHtmlEditor({
      height: 400,
      toolbar: {
          items: [
              "undo", "redo", "separator",
              {
                  formatName: "size",
                  formatValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"] },
              {
                  formatName: "font",
                  formatValues: ["Arial", "Courier New", "Georgia", "Impact", "Lucida Console", "Tahoma", "Times New Roman", "Verdana"]
              },
              "separator", "bold", "italic", "strike", "underline", "separator",
              "alignLeft", "alignCenter", "alignRight", "alignJustify", "separator",
              "orderedList", "bulletList", "separator",
              {
                  formatName: "header",
                  formatValues: [false, 1, 2, 3, 4, 5]
              }, "separator",
              "color", "background", "separator",
              "link", "image", "separator",
              "clear", "codeBlock", "blockquote"
          ]
      },
      mediaResizing: {
          enabled: true
      }
  });

  $("#txtsubject").dxTextBox({
    placeholder: "Enter Subject",
    showClearButton: true,
  });
  
  $("#dtfromdate").dxDateBox({
    placeholder: "Enter From Date",   
    type: "datetime",
    value: null,
    showClearButton: true,    
    dateSerializationFormat:"yyyy-MM-ddTHH:mm:ss",
  }).dxDateBox("instance");

  $("#dttodate").dxDateBox({
    placeholder: "Enter End Date",  
    type: "datetime",    
    value: null,
    showClearButton: true,
    dateSerializationFormat:"yyyy-MM-ddTHH:mm:ss",
  }).dxDateBox("instance");

$("#announceMent_update_BL").dxButton({
  stylingMode: "contained",
  text: "Save",
  type: "default",
  width: 120,
  onClick: function(e) {    
      saveannouncementdata();   
  }
}).dxButton("instance");


$("#announceMent_close_BL").dxButton({
stylingMode: "contained",
text: "Close",
type: "danger",
width: 120,
onClick: function() {

popup.hide();
}
}).dxButton("instance");


}

function updateannouncementdata(announcementdataid, type) {
  renderPopup();  
  var announcementid = announcementdataid;
  var type = type;  
  var GetAnnouncementListbyID = callgetlist('GetAnnouncementById', '{"IsActive":"True","AnnouncementId":"' + announcementid + '"}');
  var mapannouncementlistbyid = mapupdateannouncementListcomputeHTML(GetAnnouncementListbyID, type);
  bindAnnouncementDataListGrid();
}

function mapupdateannouncementListcomputeHTML(GetAnnouncementList, type) {
  var html = "";
  if (GetAnnouncementList == "") {
    html += "<tr colspan='9'><td>No Data Found.!</td></tr>";
  } else {
    var data;
    GetAnnouncementList.forEach(function (key, item) {


      var sdate = key.StartDateTime;
      var sd = sdate;
      sd = sd.split(' ')[0];
      var startdateChanged = sd.replace(/\//g, "-");
      startdateChanged = startdateChanged.split('-');
      startdateChanged = startdateChanged[2] + "-" + startdateChanged[1] + "-" + startdateChanged[0] + " " + sdate.split(' ')[1] ;

      var edate = key.EndDateTime;
      var ed = edate;
      ed = ed.split(' ')[0];
      var enddateChanged = ed.replace(/\//g, "-");
      enddateChanged = enddateChanged.split('-');
      enddateChanged = enddateChanged[2] + "-" + enddateChanged[1] + "-" + enddateChanged[0] + " " + edate.split(' ')[1] ;
      debugger

      $('#hiddenID').val(key.AnnouncementId);
      $('#type').val(type);

      var startDateVal = new Date(startdateChanged);
      var endDateVal = new Date(enddateChanged); 
     
      $("#txtsubject").dxTextBox("instance").option('value', key.Subject);      
      $("#dtfromdate").dxDateBox("instance").option('value', startDateVal);      
      $("#dttodate").dxDateBox("instance").option('value',  endDateVal);        
      $("#txtareaDescription").dxHtmlEditor("instance").option('value', key.Content);
    });
    }
  
  announcementdataList();
}

function announcementdataList() {  
  GetAnnouncementList = callgetlist('GetAllAnnouncements', '{"IsActive":"True"}');
  bindAnnouncementDataListGrid();
}


function bindAnnouncementDataListGrid()
{      
    var dataGrid = $("#announcementList").dxDataGrid({
        dataSource: GetAnnouncementList,
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },     
        export: {
            enabled: true,
            allowExportSelectedData: true
          },
          onExporting: function(e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Announcements');
            
            DevExpress.excelExporter.exportDataGrid({
              component: e.component,
              worksheet: worksheet,              
              autoFilterEnabled: true
            }).then(function() {
              // https://github.com/exceljs/exceljs#writing-xlsx
              workbook.xlsx.writeBuffer().then(function(buffer) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Announcements.xlsx');
              });
            });
            e.cancel = true;
          },
        searchPanel: {
            visible: true,
            width: 240,
            placeholder: "Search..."
        },
        headerFilter: {
            visible: true
        },
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
                announcementdataList();
              },
            },
          });
        },
        grouping: {
            autoExpandAll: true,
        },
        paging: {
            pageSize: 10
        },  
        groupPanel: {
            visible: true
        },
        sorting: {
            mode: "multiple"
        },
        selection: {
            mode: "multiple"
        },
        columns: [
            {caption:"Subject", dataField:"Subject"},
            {caption:"From Date", dataField:"StartDateTime", dataType:"datetime"},
            {caption:"End Date", dataField:"EndDateTime", dataType:"datetime"},
            {caption:"Content", dataField:"Content", visible:false},
            {caption:"Action", dataField: "",
               cellTemplate: function (container, options) {                
                  var domActions = "";
                  var announcementId = '"' + options.data.AnnouncementId + '"';                    
                  domActions += "<button class='btn btn-xs btn-primary edit-btn' onclick = updateannouncementdata(" + announcementId + ",'clone')><i title='Clone' class='fa fa-clone'></i></button ><button class='btn btn-xs btn-primary edit-btn' onclick=updateannouncementdata(" + announcementId + ",'update') > <i class='fas fa-pencil-alt'></i></button ><button class='btn btn-xs btn-danger delete-btn' onclick=deleteannouncement(" + announcementId + ") > <i class='fas fa-trash-alt'></i></button > ";
                  $("<div class='text-center'>").append($(domActions)).appendTo(container);
          },
          allowEditing: false
      }           
        ],    
    }).dxDataGrid("instance");
}

//<i class="fa fa-clone" aria-hidden="true"></i>

function deleteannouncement(announcementdataid) {
  swal({
    title: "Delete",
    text: "Are you sure, Do you want to delete this announcement?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        var id = announcementdataid;
        data = {
          "Method": "DeleteAnnouncement",
          "Data": {
            "announcementId": id,
            "@IsActive": "TRUE"
          }
        }
        var result = PostDataCall(data);
        swal({
          title: "Success!",
          text: "Deleted Successfully!",
          icon: "success",
          button: "ok!",
        })
        
        announcementdataList();
        announcementCard();
      }
    })
}
var fromSave = true;
function saveannouncementdata() { 
  fromSave = true;
    $("#txtsubject").dxValidator({
      validationRules: [{    
          type: "custom",
          validationCallback: CheckEmptyString,
          message: "Subject is required"
      }]
  }).dxValidator("instance");
  $("#txtsubject").dxValidator("instance").validate();

  if( $("#txtsubject").dxValidator("instance").validate().isValid ==  false)
  {
    return true;
  }

    $("#dtfromdate").dxValidator({
      validationRules: [{
        type: "custom",
        validationCallback: CheckEmptyString,
        message: "From date is required"
      }]
  }).dxValidator("instance");  
$("#dtfromdate").dxValidator("instance").validate();

if( $("#dtfromdate").dxValidator("instance").validate().isValid ==  false)
{
  return true;
}

   $("#dttodate").dxValidator({
    validationRules: [{
      type: "custom",
      validationCallback: CheckEmptyString,
      message: "To date is required"
    },{
      type: "custom",
      message: "End date should not be less than the From date.",
      validationCallback: function (e) {
          // you can access any field value using rowData
          if ($("#dttodate").dxDateBox("instance").option('value') != "" && $("#dttodate").dxDateBox("instance").option('value') != null) {
              if ($("#dttodate").dxDateBox("instance").option('value') < $("#dtfromdate").dxDateBox("instance").option('value')) {
                  return false;
              }
              else {
                  return true;
              }
          }
          else {
              return true;
          }
      }
  }]
}).dxValidator("instance");
$("#dttodate").dxValidator("instance").validate();

if( $("#dttodate").dxValidator("instance").validate().isValid ==  false)
{
  return true;
}

  $("#txtareaDescription").dxValidator({
  validationRules: [{
      type: "custom",
      validationCallback: CheckEmptyString,
      message: "Content is required"
  }]
}).dxValidator("instance"); 
$("#txtareaDescription").dxValidator("instance").validate();

if( $("#txtareaDescription").dxValidator("instance").validate().isValid ==  false)
{
  return true;
}


var startDateVal = new Date($("#dtfromdate").dxDateBox("instance").option('value'));
var startTimezoneOffset = startDateVal.getTimezoneOffset() * 60000;


var endDateVal =  new Date($("#dttodate").dxDateBox("instance").option('value'));
var endTimezoneOffset = endDateVal.getTimezoneOffset() * 60000;      

  var announcementid = $('#hiddenID').val();
  var type = $('#type').val();
  var subject =  $("#txtsubject").dxTextBox("instance").option('value');
  var fromdate =  new Date(startDateVal.getTime() - startTimezoneOffset);
  var todate = new Date(endDateVal.getTime() - endTimezoneOffset);
  var content = $("#txtareaDescription").dxHtmlEditor("instance").option('value');
 

  if (announcementid == "") {
   
      var data = [];

      data = {
        "Method": "PostAnnouncement",
        "Data": {
          "announcementId": null,
          "subject": subject,
          "content": content,
          "StartDateTime": fromdate,
          "EndDateTime": todate,
          "IsActive": "TRUE"
        }
      }
      var result = PostDataCall(data);
      
      swal({
        title: "Success!",
        text: "Saved Successfully!",
        icon: "success",
        button: "ok!",
      })
     
      closeAnnouncementModal();
    


    //the below will hide the save button
  } if (announcementid != "" && type == 'clone') {
 
      var data = [];

      data = {
        "Method": "PostAnnouncement",
        "Data": {
          "announcementId": null,
          "subject": subject,
          "content": content,
          "StartDateTime": fromdate,
          "EndDateTime": todate,
          "IsActive": "TRUE"
        }
      }
      var result = PostDataCall(data);
      
      swal({
        title: "Success!",
        text: "Saved Successfully!",
        icon: "success",
        button: "ok!",
      })
      closeAnnouncementModal();
    
  } else {
    
      var data = [];

      data = {
        "Method": "PostAnnouncement",
        "Data": {
          "announcementId": announcementid,
          "subject": subject,
          "content": content,
          "StartDateTime": fromdate,
          "EndDateTime": todate,
          "IsActive": "TRUE"
        }
      }
      var result = PostDataCall(data);
      
      swal({
        title: "Updated!",
        text: "Updated Successfully!",
        icon: "success",
        button: "ok!",
      })
      closeAnnouncementModal();
     

    
  }
}

function CheckEmptyString(e)
{
  debugger
  if(fromSave)
  {
    if(e.value == null || e.value == "")
    {
      return false;
    }   
    else{
      return true;
    } 
  }
  else{
    return true;
  }
}

function closeAnnouncementModal() {  
  fromSave = false;
  $("#txtsubject").dxTextBox("instance").option('value', "");      
  $("#dtfromdate").dxDateBox("instance").option('value', null);      
  $("#dttodate").dxDateBox("instance").option('value', null);      
  $("#txtareaDescription").dxHtmlEditor("instance").option('value', "");
  popup.hide(); 
  announcementdataList();
  announcementCard();
}



//Check Validation
jQuery.fn.extend({

  CheckFormValidation: function (validationGroup) {
      for (var i = 0; i < validationGroup.validators.length; i++) {
          validationGroup.validators[i].validate();
          if (validationGroup.validators[i]._options.isValid === false) {
              return false;
          }
      }
      return true;
  }
});