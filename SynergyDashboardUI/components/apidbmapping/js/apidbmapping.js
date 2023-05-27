function getApidbDetails() {
  var GetAPICollections = callgetlist('GetAPICollections','{"IsActive":true}');
  $("#sddgd-apidbmapping").dxDataGrid({ dataSource: GetAPICollections })
}
  
function renderAPIdbMapping()
{  
  var dataGrid = $("#sddgd-apidbmapping").dxDataGrid({
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
          getApidbDetails();
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
  columns: [
      {caption:"API ", dataField:"API"},
      {caption:"DB", 
       dataField:"DB", 
       editorType: "dxSelectBox",
       editorOptions: {
        readOnly: false,
        elementAttr: { id: "scmb-DB" }
    }
  }
  ]
}).dxDataGrid("instance");

getApidbDetails();

}

function saveApidbMapping() {
    var dbname = $("#apidblist").val();
    var apiname = $("#apiname").val();
    var emptyvalue = "Please enter the values"; 
    if(dbname != "0" && apiname != "") {
        var ApidbmappingObj = {
            API: apiname,
            DB: dbname,
          };
          data = {
            Method: "PostAPICollections",
            Data: ApidbmappingObj,
          };
        var postCall = PostDataCall(data);
        if (postCall["IsSuccess"] == true) {
            swal({
              title: "Success",
              text: "API collections inserted successfully",
              icon: "success",
              button:"OK"
              });  
              $("#apidblist").val("0");
              $("#apiname").val("");
              $('#ApiDBMappingModel').modal('hide');
              getApidbDetails();
            }            
    } else {
        document.getElementById("apierror_text").innerHTML = emptyvalue;
    }
}


  