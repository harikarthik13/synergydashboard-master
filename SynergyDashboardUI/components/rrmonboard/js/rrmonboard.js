$(document).ready(function () {
    getOfferApprovedCandidatesForOnboard();
});

function getOfferApprovedCandidatesForOnboard(){
    var filterData = JSON.stringify({
        IsActive: true,
    });
    
    callGetListSync("GetOfferApprovedCandidates", filterData, function (e) {
        bindOfferApprovedCandiadtesGridForOnboard(e)
    });   
}

function bindOfferApprovedCandiadtesGridForOnboard(data){
    var offerApprovalGrid = $("#sdgd-rrmOnBoard").dxDataGrid({
        dataSource:data,
        filterRow: {
          visible: true,
          applyFilter: "auto"
          },
          repaintChangesOnly: true,
          highlightChanges: true,
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
          allowColumnResizing:true,
          showBorders: true,
          columnAutoWidth: true,
          grouping: {
              autoExpandAll: true,
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
              emptyPanelText: "Drag a column header here to group by that column"
          },
          sorting: {
              mode: "multiple"
          },
          selection: {
              mode: "multiple"
          },
          editing: {
              mode: "popup",
              allowAdding: false,
              allowUpdating: false,
              useIcons: true
          },
          columnChooser: {
              enabled: true,
              mode:"select"
          },
          summary: {
              totalItems: [{
                  column: "RRMNo",
                  summaryType: "count"
              }
              // ...
              ],
              groupItems: [{
                  column: "RRMNo",
                  summaryType: "count"
              }]
          },
          rowAlternationEnabled: true,
          columnChooser: {
              enabled: true,
          },
        onExporting: function (e) {
          var workbook = new ExcelJS.Workbook();
          var worksheet = workbook.addWorksheet("RRM OnBoard");
    
          DevExpress.excelExporter
            .exportDataGrid({
              component: e.component,
              worksheet: worksheet,
              autoFilterEnabled: true,
              customizeCell: function (options) {
                var { gridCell, excelCell } = options;
                if (gridCell.rowType === "data") {
                  if (gridCell.column.caption === "#") {
                    excelCell.value = options.cell.row - 1;
                  }
                }
              },
            })
            .then(function () {
              workbook.xlsx.writeBuffer().then(function (buffer) {
                saveAs(
                  new Blob([buffer], { type: "application/octet-stream" }),
                  "RRMOnBoard.xlsx"
                );
              });
            });
          e.cancel = true;
        },
        onToolbarPreparing: function (e) {
          var dataGrid = e.component;
          e.toolbarOptions.items.unshift({
            location: "after",
            widget: "dxButton",
            options: {
              icon: "refresh",
              onClick: function () {
                getOfferApprovedCandidatesForOnboard();
               dataGrid.refresh();
             },
            },
          });
        },
        columns: [
          {
            caption: "#",
            dataField: "Id",
            allowGrouping: false,
            allowCollapsing: false,
            allReordering: false,
            width: 70,
            cellTemplate: function (container, options) {
              container.text(
                offerApprovalGrid.pageIndex() * offerApprovalGrid.pageSize() + options.rowIndex + 1
              );
            },
          },
          {
            dataField: "Id",
            caption: "Offer Id",
            visible: false
          },
          {
              dataField: "CandidateName",
              caption: "Candidate Name",
              cellTemplate: function (container, options) {  
                var candidateId = options.data.CandidateId; 
                var domActions = "";
                domActions += "<a style='cursor:pointer' class='rrmdetailOfferDispatch' onclick=EditOnBoard('"+ candidateId +"','"+options.data.RRMId+"')>"+options.data.CandidateName+"</a>";
                $("<div class='text-left'>").append($(domActions)).appendTo(container);
              }
          },
          {
              dataField: "RRMNo",
              caption: "RRM No",
              cellTemplate: function (container, options) {  
                var domActions = "";
                domActions += "<a style='cursor:pointer' class='rrmdetailInterviewCard' data-rrmid =" + options.data.RRMId + ">"+options.data.RRMNo+"</a>";
                $("<div class='text-left'>").append($(domActions)).appendTo(container);
            },
              // cellTemplate: function (container, options) {  
              //   var candidateId = options.data.CandidateId; 
              //   var domActions = "";
              //   domActions += "<a style='cursor:pointer' class='rrmdetailOfferDispatch' onclick=EditOnBoard('"+ candidateId +"','"+options.data.RRMId+"')>"+options.data.RRMNo+"</a>";
              //   $("<div class='text-left'>").append($(domActions)).appendTo(container);
              // }
          },
          {
              dataField: "RequirementName",
              caption: "Requirement Name",
              cellTemplate: function (container, options) {  
                var domActions = "";
                domActions += "<a style='cursor:pointer' class='rrmdetailInterviewCard' data-rrmid =" + options.data.RRMId + ">"+options.data.RequirementName+"</a>";
                $("<div class='text-left'>").append($(domActions)).appendTo(container);
            },
              // cellTemplate: function (container, options) {  
              //   debugger;
              //   var candidateId = options.data.CandidateId; 
              //   var domActions = "";
              //   domActions += "<a style='cursor:pointer' class='rrmdetailOfferDispatch' onclick=EditOnBoard('"+ candidateId +"','"+options.data.RRMId+"')>"+options.data.RequirementName+"</a>";
              //   $("<div class='text-left'>").append($(domActions)).appendTo(container);
              // }
          },      
          {
              dataField: "ExpectedJoiningDate",
              caption: "Expected Joining Date",
              allowFiltering: true,
              dataType :"date",
              format : "dd-MMM-yyyy"
          },
          {
            dataField: "Consultant",
            caption: "Consultant",
            cellTemplate: function(container, options) {
              var fieldData = options.data.IsConsultant;
              if (fieldData == true) {
                  var html = "<label class='label label-primary m-l-sm'>Consultant</label>";
              }
              else if(fieldData == false) {
                  var html = "<label class='label label-success m-l-sm'>Full Time</label>";
              }
              $(html).appendTo(container);
            }
          },
          {
              dataField: "IsApprovedByHead",
              caption: "Approval Status",
              alignment:"left",
              cellTemplate: function (container, options) {
                  var fieldData = options.data.IsApprovedByHead;
                  if (fieldData == 0) {
                      var html = "<label class='label label-warning m-l-sm'>Yet to approve</label>";
                  }
                  else if(fieldData == 1) {
                      var html = "<label class='label label-danger m-l-sm'>Rejected</label>";
                  }
                  else if(fieldData == 2){
                      var html = "<label class='label label-success m-l-sm'>Approved</label>";
                  }
                  $(html).appendTo(container);
              }, fixedPosition: "right",

          },
          {
            dataField: "Id",
            caption: "Action",
            allowGrouping: false,
            width:80,
            allowCollapsing: false,
            allReordering:false,
            allowFiltering: false,
            fixedPosition: "right", allowExporting: false,
            cellTemplate: function (container, options) {
                var candidateId = options.data.CandidateId; 
                var html = "";
                // if(options.data.IsApprovedByHead == 1 || options.data.IsApprovedByHead == 2){
                //   html += "<button class='btn btn-xs btn-primary' onclick=PreviewOnBoard('"+ candidateId +"','"+options.data.RRMId+"')><i title='Preview Offer' class='fas fa-eye'></i></button>";        
                // }
                // else{
                  html += "<button class='btn btn-xs btn-primary edit-btn' onclick=EditOnBoard('"+ candidateId +"','"+options.data.RRMId+"')><i title='Edit Offer' class='fas fa-edit'></i></button>";        
                // }

                $(html).appendTo(container);          
            }
          }
        ]
      }).dxDataGrid("instance");
}

