var manualSwipeAlertDetails= [{
    ID: 1,
    Name:'Employee1',
    Date: '01-Nov-2022',
    Time: '02.00',
    Unit: 'Manual',
    ManualReason:'Synergy Not working',
    ApproveStatus:2,
    Comment:''
    
  },
  {
    ID: 2,
    Name:'Employee1',
    Date: '01-Nov-2022',
    Time: '11.00',
    Unit: 'Manual',
    ManualReason:'Forgot to swipe',
    ApproveStatus:1,
    Comment:''
  }];

  var ApproveStatuslist=[{
    ID: 1,
    Name:'None',
  },
{
  ID: 2,
    Name:'Approved',
},{
  ID: 3,
    Name:'Unppproved',
}
]
  var currentYear = (new Date()).getFullYear();
  var previousYear = currentYear-1;
  var last10Years=[];
  var monthName = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
  var months = [];
  var date = new Date();
var startDate = new Date(date.getFullYear(), date.getMonth(), 1);
for (i=0; i<= date.getMonth(); i++) {
  months.push(monthName[i]);
}
for (var i = 2000; i <= currentYear; i++) {
  last10Years.push(i);
} 
$('#month').dxSelectBox({
  items: months,
  value: monthName[d.getMonth()-1],
}).dxSelectBox('instance');
  
  $('#year').dxSelectBox({
    searchEnabled: true,
items: last10Years,
value: currentYear,
onValueChanged(data) {
    loadMonth(data.value);
},
});

function loadMonth(year){
  months = [];
  for (i=0; i<= (year ==currentYear ? d.getMonth(): 11); i++) {
          months.push(monthName[i]);
  }
  $('#month').dxSelectBox('instance').option("dataSource",months);
}

$(document).ready(function () {
  getEmployeelist();
  getmanualSwipeDetailsList();
});

function getmanualSwipeDetailsList() {
    var filterData = JSON.stringify({
        "Token":Token
    });
  
    callGetListSync("GetLowBillingAlertDetails", filterData, function (e) {
        // manualSwipeAlertDetails = e;
        bindmanualSwipeDetailsGrid();
    });          
}

function  getEmployeelist(){
  var filterData = JSON.stringify({
      "Token":Token,
      "IsActive": true
  });

  callGetListSync("GetEmployeeList", filterData, function (e) {
      employeeList = e;
      bindEmployeeSelectBox();
  });   
}  

function bindEmployeeSelectBox(){
  $('#employeeListSelectBox').dxSelectBox({
      items: employeeList,
      placeholder: 'Search Employee',
      showClearButton: true,
      displayExpr: 'Name',
      valueExpr: 'EmployeeId',
    });
}


function bindmanualSwipeDetailsGrid() {
    var manualSwipeAlertGrid = $("#manualSwipe-Grid").dxDataGrid({
      dataSource:manualSwipeAlertDetails,
      keyExpr: 'ID',
      filterRow: {
        visible: true,
        applyFilter: "auto"
        },
        columnMinWidth: 100,
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
            mode: "single"
        },
        editing: {
          refreshMode: 'reshape',
          mode: 'cell',
            allowAdding: false,
            allowUpdating: true,
            useIcons: true
        },
        columnChooser: {
            enabled: true,
            mode:"select"
        },
        rowAlternationEnabled: true,
        columnChooser: {
            enabled: true,
            mode:"select"
        },
      onToolbarPreparing: function (e) {
        var dataGrid = e.component;
        e.toolbarOptions.items.unshift({
          location: "after",
          widget: "dxButton",
          options: {
            icon: "refresh",
            onClick: function () {
                getmanualSwipeDetailsList();
            },
          },
        });
      },
      columns: [
        {
          dataField: "Name",
          caption: "Name",
          groupIndex: 0,
      },
        {
            dataField: "Date",
            caption: "Date",
            groupIndex: 0,
        },
        
        {
          dataField: "Unit",
          caption: "Unit"
      },
        {
            dataField: "Time",
            caption: "Time",
        },      
        
        {
          dataField: "ManualReason",
          caption: "Manual Reason",
        },
        {
          dataField: 'ApproveStatus',
          caption: 'Approve Status',
          lookup: {
            dataSource: ApproveStatuslist,
            valueExpr: 'ID',
            displayExpr: 'Name',
          },
        },
        {
            dataField: "Comment",
            caption: "Comment"
        },
      //   {
      //     dataField: "",
      //     caption: "Action",
      //     width: 50,
      //     allowFiltering:false, 
      // allowFiltering:false, 
      //     allowFiltering:false, 
      //     allowGrouping: false, 
      // allowGrouping: false, 
      //     allowGrouping: false, 
      //     allowReordering: false, 
      // allowReordering: false, 
      //     allowReordering: false, 
      //     allowSorting: false, 
      // allowSorting: false, 
      //     allowSorting: false, 
      //     allowCollapsing: false, 
      // allowCollapsing: false, 
      //     allowCollapsing: false, 
      //     allowExporting: false,
      //     cellTemplate: function (container, options) {
              
      //             var domActions = "";
      //             domActions +=
      //                 `<button class='btn btn-xs btn-primary edit-btn' onclick=ApproveManualSwipe("${options.data.ID}","${options.data.ID}");><i class='fas fa-pencil-alt'></i></button>`;
      //                 domActions += `<button class='btn btn-xs btn-danger' onclick='ApproveManualSwipe("${options.data.ID}","${options.data.ID}")'><i class='fas fa-trash'></i></button>`
      //                 $("<div class='text-center'>")
      //                 .append($(domActions))
      //                 .appendTo(container);
              
      //     },
      // },
      ]
    });
  }

  function  ApproveManualSwipe(id,name){

  }


 