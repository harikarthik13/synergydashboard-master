var GetUsefullinksList =  [];

function usefullinksdataList() {  
  GetUsefullinksList = callgetlist('GetUsefullinksList', '{"IsActive":"True"}');
  bindAnnouncementDataListGrid();
}



function bindAnnouncementDataListGrid()
{      
    var dataGrid = $("#usefullinksList").dxDataGrid({
        dataSource: GetUsefullinksList,
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },     
        export: {
            enabled: false,
            allowExportSelectedData: false
          },
          onExporting: function(e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('usefullinks');
            
            DevExpress.excelExporter.exportDataGrid({
              component: e.component,
              worksheet: worksheet,              
              autoFilterEnabled: true
            }).then(function() {
              // https://github.com/exceljs/exceljs#writing-xlsx
              workbook.xlsx.writeBuffer().then(function(buffer) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'usefullinks.xlsx');
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
        // selection: {
        //     mode: "multiple"
        // },
        columns: [
            {caption:"Id", dataField:"Id"},
            {caption:"Name", dataField:"Name"},
            {caption:"Action", dataField: "",
               cellTemplate: function (container, options) {                
                  var domActions = "";
                  var UrlLink = '"' + options.data.Link + '"';                    
                  domActions += "<a href="+UrlLink+" target='_blank' class='btn btn-xs btn-primary view-btn'><i title='View' class='fa fa-eye'></i></a> ";
                  $("<div class='text-center'>").append($(domActions)).appendTo(container);
          },
          allowEditing: false
      }           
        ],    
    }).dxDataGrid("instance");
}
