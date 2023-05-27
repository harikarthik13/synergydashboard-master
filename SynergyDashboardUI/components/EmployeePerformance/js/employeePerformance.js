var employeeList=[];
var employeeData=[];
var employeePerGraphData=[];

const dataSource = [{ TaskType: 'Client Project', month: 'Jan', Billing: 80, }, { TaskType: 'Client Project', month: 'Feb', Billing: 120, }, { TaskType: 'Internal Non Billable', month: 'Jan', Billing: 20, }, { TaskType: 'Internal Non Billable', month: 'Feb', Billing: 5, }, { TaskType: 'HR Support', month: 'Jan', Billing: 20, }, { TaskType: 'HR Support', month: 'Feb', Billing: 10, }, { TaskType: 'RFP Handling', month: 'Jan', Billing: 15, }, { TaskType: 'RFP Handling', month: 'Feb', Billing: 25, }, { TaskType: 'Billing', month: 'Jan', Billing: 60, }, { TaskType: 'Billing', month: 'Feb', Billing: 100, }, { TaskType: 'Meetings', month: 'Jan', Billing: 25, }, { TaskType: 'Meetings', month: 'Feb', Billing: 3, }, ];


$(document).ready(function () {
    getEmployeelist();
});

function  getEmployeelist(){
    $("#employeePerformance-tabConent").show();
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
    $('#employeeSelectBox').dxSelectBox({
        items: employeeList,
        placeholder: 'Search Employee',
        showClearButton: true,
        displayExpr: 'Name',
        valueExpr: 'EmployeeId',
      });
}

function getEmployeeId(){
  var employeeId=  $("#employeeSelectBox").dxSelectBox("instance").option("value"); 
  getEmployeeDetailsList(employeeId);
  getEmployeeGraphDetails(employeeId);
}    
function getEmployeeDetailsList(id) {
    var filterData = JSON.stringify({
        "Token":Token,
        "EmployeeId":id
    });
    callGetListSync("GetEmployeePerformanceData", filterData, function (e) {
        employeeData = e;
        bindEmployeePerformanceGrid();
    });     
       
}

function getEmployeeGraphDetails(id) {
    var filterData = JSON.stringify({
        "Token":Token,
        "EmployeeId":id
    });
    callGetListSync("GetEmployeePerformanceGraph", filterData, function (e) {
        employeePerGraphData = e;
        bindEmployeePerformanceGraph();
    });     
}

function bindEmployeePerformanceGrid() {
    var lowBillingAlertGrid = $("#emp-data-grid").dxDataGrid({
      dataSource:employeeData,
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
        columnWidth: 100,
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
                column: "Month",
                summaryType: "count"
            }
            ],
            groupItems: [{
                column: "Month",
                summaryType: "count"
            }]
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
                getEmployeeId();
            },
          },
        });
      },
      columns: [
        {
            dataField: "Month",
            caption: "Month",
        },
        {
            caption: "Total Logged Hours,",
            dataField: "Total Logged Hours",
        },
        {
            caption: "Approved Hours",
            dataField: "Approved Hours",
        },  
        {
            caption: "Billable Hours",
            dataField: "Billable Hours",
        },      
        {
          dataField: "Projects",
          caption: "Projects",
        },
        {
            dataField: "Project Leads",
            caption: "Project Leads",
        },
        {
            dataField: "Backup Lead",
            caption: "Backup Lead"
        },
        {
            dataField: "No of Leaves",
            caption: "No of Leaves",
        },
        {
            dataField: "Efficiency Percentage",
            caption: "Efficiency Percentage",
        }
      ]
    });
  }


  function bindEmployeePerformanceGraph(){
    $('#emp-data-graph').dxChart({
        palette: 'violet', 
        dataSource, 
        commonSeriesSettings: 
        { 
            argumentField: 'month', 
        valueField: 'Billing', 
        type: 'bar', 
    }, 
        seriesTemplate: 
        { 
            nameField: 'TaskType', 
         customizeSeries(valueFromNameField){ 
            return valueFromNameField === 'Billing' ? { type: 'line', label: { visible: true }, color: '#ff3f7a' } : {}; 
        }, 
    },
        title: {
             text: 'Resource Utilization',
                subtitle: { 
                    text: '(in Hours)', 
                },
             }, 
        export: { 
            enabled: true,
         }, 
        legend: { 
            verticalAlignment: 'bottom',
             horizontalAlignment: 'center',
             }, 
      }); 
  }
//tab click event
function openEmpPerformancetab(evt, tabName) {
	var i, tabcontent, tablinks;
		tabcontent = document.getElementsByClassName("tabcontent");
    console.log(tabcontent);
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
  console.log(tablinks);
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace("active", "");
	}
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
	}
