$(document).ready(function(){
  getUserListForMapping();
});
/** added by praveen */
function getUserListForMapping() {
  $('.error_message').html("");
  $('input[type=text]').removeClass("required_field");
  $('select').removeClass("required_field");
  $('textarea').removeClass("required_field");
  var getRFPusers = callgetlist('GetRFPUsers');
  renderRfpUserMappingDataGrid(getRFPusers);
  }  

  function renderRfpUserMappingDataGrid(getRFPusers) {
    var rfpusermappingDataGrid = $("#rfpusermappinglist")
      .dxDataGrid({
        filterRow: {
          visible: true,
          applyFilter: "auto",
        },
        dataSource: getRFPusers,
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
          emptyPanelText: "Drag a column",
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
          mode: "popup",
          allowAdding: false,
          allowUpdating: false,
          useIcons: true,
        },
        columnChooser: {
          enabled: true,
        },
        rowAlternationEnabled: true,
        filterPanel: { visible: true },
        allowColumnReordering: true,
        allowColumnResizing: true,
        showBorders: true,
        onToolbarPreparing: function (e) {
          var dataGrid = e.component;
          e.toolbarOptions.items.unshift({
            location: "after",
            widget: "dxButton",
            options: {
              icon: "refresh",
              onClick: function () {
                getUserListForMapping();
              },
            },
          });
        },
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
                rfpusermappingDataGrid.pageIndex() * rfpusermappingDataGrid.pageSize() +
                  options.rowIndex +
                  1
              );
            },
          },
          {
            caption: "RFP User ID",
            dataField: "UserRFPID",
            alignment: "left"
          },
          {
            caption: "Pseudo Name",
            dataField: "Pseudoname",
          },
          {
            caption: "Name",
            dataField: "Name",
          },
          {
            caption: "Designation",
            dataField: "DesignationInRFP",
          },
          {
            caption: "Department",
            dataField: "Department",
          },
          {
            caption: "Synergy Name",
            dataField: "UserEmailID",
          },
          
          {
            caption: "Action",
            dataField: "",
            width: "100",
            cellTemplate: function (container, options) {
              fil_val = {
                "RFPUserId": options.data.UserRFPID,
                "PseudoName": options.data.Pseudoname,
                "Name": options.data.Name,
                "Designation": options.data.DesignationInRFP, 
                "Department": options.data.Department ,
              };
              console.log("chk fil",fil_val);
              var domActions = "";
              domActions += "<button class='btn btn-xs btn-primary edit-btn' onclick='openRFPUserMappingModel("+JSON.stringify(fil_val)+");'><i class='fas fa-user-plus'></i></button>"
              $("<div class='text-center'>")
                .append($(domActions))
                .appendTo(container);
            },
          },
        ],
      })
      .dxDataGrid("instance");
  }