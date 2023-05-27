var dataCommentsApi=[];
var defId;
var GetManageList = [];
var manageDefaultersList = [];
var dataTable = null;

$(document).ready(function(){   
  getManageDefaultersDetails();  
});

function getManageDefaultersDetails() {   
  manageDefaultersList = [];
  GetManageList = callgetlist('GetMyDefaultResources','{"IsActive":"True"}');  
  var i = 0;
  for(i = 0; i < GetManageList.length; i++)
  {
      var item = GetManageList[i];
      var ddate =  item['Default Date'];      
      var defaultdate = ddate.replace(/\//g, "-");
      defaultdate = defaultdate.split('-');
      defaultdate = defaultdate[2] + "-" + defaultdate[1] + "-" + defaultdate[0]

      item['Default Date'] = new Date(defaultdate);
      
      manageDefaultersList.push(item);
  }
  bindManageDefaultersGrid();
}


//Save lead comments
function SaveLeadComments(defId){
  var comments=document.getElementById("leadcomments").value;
  if (comments == "") {    
      $('#leadcomments').addClass('input-error');
      $('#leadcommentsError').html("Enter the comments");
    }   
      var data = [];
      data = {
      "Method": "PostDefaulterReason",
      "Data": {
        "DefaulterId": defId,
        "ReasonForDelay": comments,      
            }
      }
      var result = PostDataCall(data);
      swal({
        title: "Success!",
        text: "Saved Successfully!",
        icon: "success",
        button: "ok!",
        })
        $("leadcomments").text("");
        $("#manageDefaultersmodel").modal('hide');
        getManageDefaultersDetails();    
        document.getElementById("leadcomments").value = "";
        
    }

    function ManageDefaultersModel(defaulterID) { 
      document.getElementById("leadcomments").value = "";
      var employeeNumber = '';
      var employeeName ='';
      var headerDate='';
      manageDefaultersList.forEach(element => {
        if(element.DefaulterId == defaulterID){
          employeeNumber = element.EmployeeNumber;
          employeeName = element.EmployeeName;
          headerDate=element["Default Date"];
          
        }
      });
       $("#manageDefaultersmodel").appendTo("body").modal("show");
       $("#empI").text(employeeNumber);
       $("#empn").text(employeeName);
       $("#headerdate").text(headerDate);
       
       jQuery("#leadcommentsaveBtn").attr("onclick", "SaveLeadComments('" + defaulterID + "')");
  }



  function bindManageDefaultersGrid()
  {      
      var dataGrid = $("#ManageDefaultersTableListDetails").dxDataGrid({
          dataSource: manageDefaultersList,
          columnChooser: { enabled: true },
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
              var worksheet = workbook.addWorksheet('Manage Defaulters');
              
              DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,              
                autoFilterEnabled: true
              }).then(function() {
                // https://github.com/exceljs/exceljs#writing-xlsx
                workbook.xlsx.writeBuffer().then(function(buffer) {
                  saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Manage Defaulters.xlsx');
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
                  getManageDefaultersDetails();
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
              {caption:"Emp Id", dataField:"EmployeeNumber"},
              {caption:"Employee Name", dataField:"EmployeeName"},
              {caption:"Default Date", dataField:"Default Date", dataType:"date", format:"dd-MM-yyyy"  },
              {caption:"Lead Comments", dataField: "",
                 cellTemplate: function (container, options) {                
                    var domActions = "";
                    var defaulterId = '"' + options.data.DefaulterId + '"';                    
                    domActions += "<button class='btn btn-sm btn-primary'  onclick='ManageDefaultersModel(" + defaulterId + ")'><i class='glyphicon glyphicon-tasks' data-toggle='modal'></i></button> ";
                    $("<div class='text-center'>").append($(domActions)).appendTo(container);
            },
            allowEditing: false
        }           
          ]
      }).dxDataGrid("instance");
  }