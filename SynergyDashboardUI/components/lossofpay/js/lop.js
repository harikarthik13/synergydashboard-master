

function loadLopGridDetails(){
    const employees = [{
        ID: 1,
        Name: 'John'
      },
      {
        ID: 2,
        Name: 'Olivia'
      },
      {
        ID: 3,
        Name: 'Robert'
      },
      {
        ID: 4,
        Name: 'Greta'
      },
      {
        ID: 5,
        Name: 'Brett'
      },];
      
      const tasks = [{
        ID: 1,
        Date: '2013/01/15',
        Hours: '16',
        NoOfDays: '2',
        EmployeeID: 5,
      },
      {
        ID: 2,
        Date: '2013/01/15',
        Hours: '16',
        NoOfDays: '2',
        EmployeeID: 4,
      },
      {
        ID: 2,
        Date: '2013/01/15',
        Hours: '16',
        NoOfDays: '2',
        EmployeeID: 1,
      },
      {
        ID: 2,
        Date: '2013/01/15',
        Hours: '16',
        NoOfDays: '2',
        EmployeeID: 5,
      },
      {
        ID: 3,
        Date: '2013/01/15',
        Hours: '16',
        NoOfDays: '2',
        EmployeeID: 2,
      },
      {
        ID: 4,
        Date: '2013/01/15',
        Hours: '16',
        NoOfDays: '2',
        EmployeeID: 2,
      },
      {
        ID: 4,
        Date: '2013/01/15',
        Hours: '16',
        NoOfDays: '2',
        EmployeeID: 1,
      },
      {
        ID: 3,
        Date: '2013/01/15',
        Hours: '16',
        NoOfDays: '2',
        EmployeeID: 3,
      },
      {
        ID: 3,
        Date: '2013/01/15',
        Hours: '16',
        NoOfDays: '2',
        EmployeeID: 4,
      },
      {
        ID: 3,
        Date: '2013/01/15',
        Hours: '16',
        NoOfDays: '2',
        EmployeeID: 3,
      }
      ];

      
    $('#sddgd-lopGridCard').dxDataGrid({
        dataSource: employees,
        keyExpr: 'ID',
        showBorders: true,
        rowAlternationEnabled: true,
        paging: {
            pageSize: 10
        },  
        searchPanel: {
            visible: true,
            width: 240,
            placeholder: "Search..."
        },
        columns: [
        'Name',
        {
          dataField: "",
          caption: "Action",
          width: 50,
          cellTemplate: function (container, options) {
              var domActions = "";
              domActions += "<button class='btn btn-xs btn-primary' onclick=editLop()><i class='fas fa-edit'></i></button>";
              $("<div class='text-center'>").append($(domActions)).appendTo(container);
          },
        }    
        ],
        masterDetail: {
          enabled: true,
          template(container, options) {
            const currentEmployeeData = options.data;
    
            $('<div>')
              .addClass('master-detail-caption')
              .text(`${currentEmployeeData.Name}'s LOP Details:`)
              .appendTo(container);
    
            $('<div>')
              .dxDataGrid({
                columnAutoWidth: true,
                showBorders: true,
                columns: [{
                  dataField: 'Date',
                  dataType: 'date',
                }, {
                  dataField: 'Hours',
                  dataType: 'int',
                }, {
                    dataField: 'NoOfDays',
                  caption: 'No Of Days'
                }],
                dataSource: new DevExpress.data.DataSource({
                  store: new DevExpress.data.ArrayStore({
                    key: 'ID',
                    data: tasks,
                  }),
                  filter: ['EmployeeID', '=', options.key],
                }),
              }).appendTo(container);
          },
        },
      });
}

function openLop(){
  $('#LopModal').appendTo("body").modal('show');
  loadControlsLossOfPay();
}


function loadControlsLossOfPay(){
  $("#lopName").dxTextBox({
      placeholder:"Enter Name"
  })

  function logEvent(eventName) {
    var logList = $("#events ul"),
        newItem = $("<li>", { text: eventName });

    logList.prepend(newItem);
}

  $("#lopEntryGrid").dxDataGrid({
                dataSource: [],
                //keyExpr: "ID",
                showBorders: true,
                paging: {
                    enabled: false
                },
                editing: {
                    mode: "row",
                    allowUpdating: true,
                    allowDeleting: true,
                    allowAdding: true
                },
                columns: [
                    {
                        dataField: "Date",
                        caption: "Date",
                        dataType: "date",
                        format: "dd-MMM-yyyy",
                        width: 125,
                        // validationRules: [{
                        //     type: "range",
                        //     max: new Date(maxdate),
                        //     message: "Date can not be greater than today"
                        // }],
                    },
                    {
                        dataField: "Hours",
                        caption: "Hours",
                        dataType: "number",
                        allowEditing: true
                    },
                    {
                        dataField: "NumberOfDays",
                        caption: "Number Of Days",
                        dataType: "number"
                        // validationRules: [{
                        //     type: "required",
                        //     message: "Reason for leaving is required"
                        // }]
                    }
                ],
                summary: {
                    totalItems: [{
                        column: "Date",
                        summaryType: "sum",
                        customizeText: function (data) {
                            return "Total LOP:";
                        }
                    }]
                },
                onEditingStart: function (e) {
                    logEvent("EditingStart");
                },
                onRowEdited: function (e) {
                   
                    logEvent("EditingStart");
                },
                onInitNewRow: function (e) {
                    logEvent("InitNewRow");
                },
                onRowInserting: function (e) {
                    logEvent("RowInserting");
                },
                onRowInserted: function (e) {
                   
                },
                onRowUpdating: function (e) {
                    logEvent("RowUpdating");
                },
                onRowUpdated: function (e) {
                   
                },
                onRowRemoving: function (e) {
                    logEvent("RowRemoving");
                },
                onRowRemoved: function (e) {
                  
                }
            });
}

function editLop(){
  $('#LopModal').appendTo("body").modal('show');
  loadControlsLossOfPay();
}