var manualSwipeAlertGrid;
var manualSwipeAlertDetails=[];
var punchDetails=[];
  var date = new Date();
var startDate = new Date(date.getFullYear(), date.getMonth(), 1);
$('#from_date').dxDateBox({
    type: 'date',
    value: startDate,
    max:date,
    displayFormat: 'dd-MMM-yyyy',
    onValueChanged: function (e) {
      $("#to_date").dxDateBox("instance").option("min", e.value);
  }
  });
  $('#to_date').dxDateBox({
    type: 'date',
    value: date,
    max:date,
    displayFormat: 'dd-MMM-yyyy',
    onValueChanged: function (e) {
      $("#from_date").dxDateBox("instance").option("max", e.value);
  }
  });
$(document).ready(function () {
      getmanualSwipeDetailsList();
});

function getmanualSwipeDetailsList() {
  var startDate=$("#from_date").dxDateBox("instance").option("value");
  var endDate=$("#to_date").dxDateBox("instance").option("value");
    var filterData = JSON.stringify({
      "EmployeeID":   localStorage.getItem("EmployeeID"),
      "StartDate" :  fromtodateFormat(startDate),
      "EndDate" : fromtodateFormat(endDate)
    });
    callGetListSync("GetEmployeeManualSwipePunchStatus", filterData, function (e) {
          manualSwipeAlertDetails = e;
        bindmanualSwipeDetailsGrid();
    });          
}

function getmanualSwipeDetailsListPreview(){
   getmanualSwipeDetailsList();
    var dataGrid = $("#manualSwipe-Grid").dxDataGrid("instance");
    dataGrid.refresh()
  .done(function() {
  })
  .fail(function(error) {
  });
}

function bindmanualSwipeDetailsGrid() {
     manualSwipeAlertGrid = $("#manualSwipe-Grid").dxDataGrid({
      dataSource:manualSwipeAlertDetails,
      keyExpr: 'PunchTimeDetailsId',
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
            showInfo: true,
            showNavigationButtons: true
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
            mode: "popup",
            allowAdding: false,
            allowUpdating: false,
            useIcons: true
        },
        columnChooser: {
            enabled: true,
            mode:"select"
        },
        sortByGroupSummaryInfo: [{
            summaryItem: 'count',
          }],
          summary: {
            groupItems: [
                {
                column: 'SwipeHoursAndMinute',
                summaryType: 'max',
                displayFormat: 'Net Hours: {0}',
                showInGroupFooter: true,
                alignByColumn: true,
              },
          ],
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
                dataGrid.refresh();
            },
          },
        });
      },
      columns: [
        {
            dataField: 'GroupDate',
            alignment:"left",
            dataType :"date",
            format : "dd-MMM-yyyy",
            groupIndex: 0,
        },
        {
            dataField: 'Day',
            alignment:"left",
        },
        {
            dataField: "PunchDate",
            caption: "Date",
            dataType :"date",
            format : "dd-MMM-yyyy"

        },
        {
            dataField: "Time",
            caption: "Time",
        },      
        {
            dataField: "unit",
            caption: "Unit"
        },
        {
          dataField: "SwipePunch",
          caption: "Status",
          cellTemplate:function(container,options){
            var domActions = "";
            var swipePunch = options.data.SwipePunch;
            if(swipePunch == "In"){
              domActions += "<span class='label label-success pull-left' style='font-size:7pt !important'>IN</span>";
          }
          else if(swipePunch == "Out"){
            domActions += "<span class='label label-danger pull-left' style='font-size:7pt !important'>OUT</span>";
          }
            else{
              domActions += "<span class='label label-danger pull-left' style='font-size:7pt !important'>-</span>";
            }
            $("<div class='text-center'>").append($(domActions)).appendTo(container);
          }
        },
        {
            dataField: "SwipeHoursAndMinute",
            caption: "HH:MM:SS",
            alignment:"right",
        },
        {
            dataField: "IsApproved",
            caption: "Is Approved?",
            cellTemplate:function(container,options){
              var domActions = "";
              var isApproved = options.data.IsApproved;
              if(isApproved){
                domActions += "<span class='label label-success pull-left' style='font-size:7pt !important'>Approved</span>";
            }
              else{
                domActions += "<span class='label label-warning pull-left' style='font-size:7pt !important'>Pending</span>";
              }
              $("<div class='text-center'>").append($(domActions)).appendTo(container);
            }
        },
        {
            dataField: "Approvedby",
            caption: "Approved By",
        },
        {
            dataField: "Approvedon",
            caption: "Approved On",
        },
        {
            dataField: "Description",
            caption: "Description",
        },
        {
            dataField: "",
            caption: "Action",
            width: 50,
            allowFiltering:false, 
        allowFiltering:false, 
            allowFiltering:false, 
            allowGrouping: false, 
        allowGrouping: false, 
            allowGrouping: false, 
            allowReordering: false, 
        allowReordering: false, 
            allowReordering: false, 
            allowSorting: false, 
        allowSorting: false, 
            allowSorting: false, 
            allowCollapsing: false, 
        allowCollapsing: false, 
            allowCollapsing: false, 
            allowExporting: false,
            cellTemplate: function (container, options) {
                if( options.data.IsApproved == false)
                {
                    var domActions = "";
                    domActions +=
                        `<button class='btn btn-xs btn-primary edit-btn' onclick=openManualSwipe("${options.data.PunchTimeDetailsId}","${options.data.PunchDate}");><i class='fas fa-pencil-alt'></i></button>`;
                        domActions += `<button class='btn btn-xs btn-danger' onclick='deleteManualSwipe("${options.data.PunchTimeDetailsId}")'><i class='fas fa-trash'></i></button>`
                        $("<div class='text-center'>")
                        .append($(domActions))
                        .appendTo(container);
                }
            },
        },
      ],
    }).dxDataGrid("instance");
    // $("#timesheetreport_reportGrid").dxDataGrid(options).dxDataGrid("instance"); 
  }
  var now = new Date();
  function openManualSwipe(punchId,PunchDate){
    now = PunchDate !=null && PunchDate !="" ?PunchDate:new Date();
    $('#selectDate').dxDateBox({
        type: 'date',
        value:  now,
        displayFormat: 'dd-MMM-yyyy',
        max:now,
        onValueChanged(data) {
          loadParticulardateswipe();
        },
      });
      loadParticulardateswipe();
  }


  function loadParticulardateswipe(){
    var startDate=$("#selectDate").dxDateBox("instance").option("value");
  var endDate=$("#selectDate").dxDateBox("instance").option("value");
    var filterData = JSON.stringify({
      "EmployeeID":   localStorage.getItem("EmployeeID"),
      "StartDate" :  startDate,
      "EndDate" : endDate
    });
    callGetListSync("GetEmployeeManualSwipePunchStatusByPunchTimeDetailsId", filterData, function (data) {
      if(data !=null && data !=""){
      punchDetails = data;
        $("#selectDate").dxDateBox("instance").option("value",punchDetails[0].PunchDate);
      }else{
        punchDetails=[];
      } 
      bindIndividualPunchDetails();
      $('#ManualSwipeModal').appendTo("body").modal('show');
    }); 
  }

  function bindIndividualPunchDetails(){
    $('#manualSwipePopupGrid').dxDataGrid({
      dataSource: punchDetails,
      keyExpr: 'PunchTimeDetailsId',
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
        filterPanel: { visible: false },
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
            pageSize: 5
        },
        selection: {
            mode: "single"
        },
      editing: {
        mode: 'row',
        allowAdding: true,
        allowDeleting(e) {
          return !isManualSwipe(e.row.data.unit);
        },
        allowUpdating (e) {
          return !isManualSwipe(e.row.data.unit);
        },
        newRowPosition: 'last',
      },
      columns: [
        {
          dataField: 'PunchDate',
          caption: 'Punch Date',
          dataType :"date",
            format : "dd-MMM-yyyy",
          allowEditing: false,
        },{
          dataField: 'Time',
          caption: 'Time',
          dataType: 'datetime',
          format: 'shortTime',
          editorOptions: { 
            useMaskBehavior: true,  
            type: 'time' 
        } ,
        validationRules: [{ type: 'required' }], 
        }, 
        {
          dataField: 'unit',
          caption: 'Location',
          allowEditing: false,
        },
        {
          dataField: "SwipePunch",
          caption: "Status",
          allowEditing: false,
          cellTemplate:function(container,options){
            var domActions = "";
            var swipePunch = options.data.SwipePunch;
            if(swipePunch == "In"){
              domActions += "<span class='label label-success pull-left' style='font-size:7pt !important'>IN</span>";
          }
          else if(swipePunch == "Out"){
            domActions += "<span class='label label-danger pull-left' style='font-size:7pt !important'>OUT</span>";
          }
            else{
              domActions += "<span class='label label-danger pull-left' style='font-size:7pt !important'>-</span>";
            }
            $("<div class='text-center'>").append($(domActions)).appendTo(container);
          }
        },
         {
          dataField: 'Description',
          caption: 'Reason',
          validationRules: [{ type: 'required' }],
        },
      ],
      onEditingStart(arg) {
      },
      onInitNewRow(args) {
        var currentRowData = {};  
        var currentRowData={
          PunchTimeDetailsId:"",
          PunchDate:$("#selectDate").dxDateBox("instance").option("value"),
          unit:"MANUAL",
        };
        args.data=currentRowData;
      },
      onRowInserting() {
      },
      onRowInserted(e) {
        var swipeTime;
        if(!isDate(e.data.Time)){
           swipeTime = e.data.Time.getHours() + ":" + e.data.Time.getMinutes() + ":" + e.data.Time.getSeconds();
        }else{
          swipeTime=e.data.Time;
        }
        var punchDate=e.data.PunchDate;
       var reason =e.data.Description;
        saveManualSwipe(punchDate,swipeTime,reason);
      getNotificationCardDetails();
      },
      onRowUpdating() {
      },
      onRowUpdated(e) {
        var punchId=e.data.PunchTimeDetailsId;
        var swipeDate=e.data.PunchDate;
       var swipeTime =e.data.Time;
      var reason=e.data.Description;
        updateManualSwipe(punchId,swipeDate, swipeTime,reason);
        getNotificationCardDetails();
      },
      onRowRemoving() {
      },
      onRowRemoved(e) {
        var punchDetailId=e.data.PunchTimeDetailsId;
          data = {
            "Method": "DeleteEmployeeManualSwipePunchStatus",
            "Data": {
              "PunchTimeDetailsId": punchDetailId,
            }
          }
          var result = PostDataCall(data);
          swal({
            title: "Success!",
            text: "Deleted Successfully!",
            icon: "success",
            button: "ok!",
          })
          getmanualSwipeDetailsListPreview();
          getNotificationCardDetails();
      },
      onSaving() {
      },
      onSaved() {
      },
      onEditCanceling() {
      },
      onEditCanceled() {
      },
    }).dxDataGrid('instance');

    const isManualSwipe = function (unit) {
      return unit && ['SYNERGY','ISAPPROVED'].indexOf(unit.trim().toUpperCase()) >= 0;
    };
  }
  function isDate(value) {
    var re = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
    var flag = re.test(value);
    return flag;
    }
  function manualSwipeDateFormat(convertDate){
    if(convertDate!="")
      {
        var event = convertDate;
        convertDate = JSON.stringify(event)
        convertDate = convertDate.slice(1,11)
      }
      return convertDate;
  }

  function manualSwipeTimeFormat(swipeTime){
    swipeTime=new Date(swipeTime);
    var hours = swipeTime.getHours(); 
    var minutes = swipeTime.getMinutes(); 
    var seconds = swipeTime.getSeconds(); 
    return hours+ ":" + minutes+ ":" +seconds ;
  }

  function saveManualSwipe(swipeDate, swipeTime,reason){
    var dataSourceSaveEmployerManualSwipe = {
      "Method": "PostEmployeeManualSwipePunchStatus",
      "Data": {
          "EmployeeID":localStorage.getItem("EmployeeID"),            
          "ManualSwipeDate": swipeDate,
          "ManualSwipeTime ":swipeTime,
          "Reason":reason
      }
  }
  PostDataCallAsync(dataSourceSaveEmployerManualSwipe, function (resultComments) {
    if (resultComments['IsSuccess'] == true) {
        swal({
          title: "Success!",
          text: result['Message'],
          icon: "success",
          button: "ok!",
        });  
        loadParticulardateswipe();
        getmanualSwipeDetailsListPreview();
    }
    else {
        swal({
          title: "Sorry!",
          text: result['Message'],
          icon: "error",
        })
    }
});
  
  }


  function updateManualSwipe(punchId,swipeDate, swipeTime,reason){
    var dataSourceUpdateEmployerManualSwipe = {
      "Method": "PostUpdateEmployeeManualSwipePunchStatus",
      "Data": {
        "PunchTimeDetailsId":punchId,
          "EmployeeID":localStorage.getItem("EmployeeID"),            
          "ManualSwipeDate": swipeDate,
          "ManualSwipeTime ":swipeTime,
          "Reason":reason
      }
  }

  PostDataCallAsync(dataSourceUpdateEmployerManualSwipe, function (resultComments) {
    if (resultComments['IsSuccess'] == true) {
        swal({
          title: "Success!",
          text: result['Message'],
          icon: "success",
          button: "ok!",
        });  
        loadParticulardateswipe()
        getmanualSwipeDetailsListPreview();
    }
    else {
        swal({
          title: "Sorry!",
          text: result['Message'],
          icon: "error",
        })
    }
});
  
  }


  function deleteManualSwipe(punchDetailId) {
    swal({
      title: "Delete",
      text: "Are you sure, Do you want to delete this Swipe?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          var id = punchDetailId;
          data = {
            "Method": "DeleteEmployeeManualSwipePunchStatus",
            "Data": {
              "PunchTimeDetailsId": id,
            }
          }
          var result = PostDataCall(data);
          swal({
            title: "Success!",
            text: "Deleted Successfully!",
            icon: "success",
            button: "ok!",
          })
          getmanualSwipeDetailsListPreview();
          getNotificationCardDetails();
        }
      })
  }

  function bindmanualSwipeHistoryGrid() {
    var manualSwipeAlertGrid = $("#manualSwipeHistory-Grid").dxDataGrid({
      dataSource:manualSwipeAlertDetails,
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
                column: "ID",
                summaryType: "count"
            }
            ],
            groupItems: [{
                column: "ID",
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
                getmanualSwipeDetailsList();
                dataGrid.refresh();
            },
          },
        });
      },
      columns: [
        {
            dataField: "Employee No",
            caption: "punch Date#",
            alignment:"left",
            width:70
        },
        {
            dataField: "Name",
            caption: "Date",
        },
        {
            dataField: "Project Names",
            caption: "Time",
        },      
        {
            dataField: "Project Leads",
            caption: "Unit"
        },
        {
          dataField: "Backup Lead",
          caption: "Status",
        },
        {
            dataField: "Billing",
            caption: "HH:MM:SS",
        },
        {
            dataField: "Client Project Hours",
            caption: "Is Approved?"
        },
        {
            dataField: "Non-Project Hours",
            caption: "Approved By",
        },
        {
            dataField: "RFP",
            caption: "Approved On",
        },
        {
            dataField: "RRM",
            caption: "Description",
        },
      ]
    });
  }

  function fromtodateFormat(passDate){
    var currentDate = new Date(passDate);
    var day = currentDate.getDate();
   var month = currentDate.getMonth() + 1;
   if (day < 10) {
       day = "0" + (day);
   }
   if (month < 10) {
       month = "0" + (month);
   }
   var year = currentDate.getFullYear();
   return fromDate = (month + "/" + day + "/" + year);
  }