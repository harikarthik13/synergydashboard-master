$(document).ready(function () {
  window.getDataFrmRes='';
  var getSARoutines = callgetlist('GetSATasksReport');
  if(getSARoutines.length > 0){

    window.getDataFrmRes = getSARoutines.map( function(res,key) {

      if(res.DateTime == "1900-01-01T00:00:00" || res.DateTime == null ){
        var duDate = "No End Date";
      }
      else {
        var duDate = res.DateTime;
      } 

       return {'sno':key+1,'due_date_time':duDate,'task':res.Task,'instruction':res.Instruction,'disp_instruction':removeTags(res.Instruction),'status':res.Status,'remarks':res.Remarks,'key':key,'executedDateTime':res.ExecutedDateTime,'executedBy':res.ExecutedBy}
    })
    
  }
    var getSARoutine =[{'sno':"1",'due_date_time':"11-09-2020 10:00",'task':"take email backup",'instruction':"some instruction",'status':"Missed"},
                       {'sno':"2",'due_date_time':"11-09-2020 10:30",'task':"take backup",'instruction':"some instruction",'status':"Skipped"},
                       {'sno':"1",'due_date_time':"11-09-2020 10:00",'task':"take test",'instruction':"some instruction",'status':"Executed"},
                       {'sno':"1",'due_date_time':"11-09-2020 10:00",'task':"change os",'instruction':"some instruction",'status':"Upcoming"},
                       {'sno':"1",'due_date_time':"11-09-2020 10:00",'task':"synergy backup",'instruction':"some instruction",'status':"Pending"}];
   //var getSARoutine = callgetlist('GetSATasksReport');

   
   renderSARoutineReportGrid(window.getDataFrmRes);
})

function removeTags(str) {
  if ((str===null) || (str===''))
  return false;
  else
  str = str.toString();
  return str.replace( /(<([^>]+)>)/ig, '');
}

function openSAroutineModels(key){
    let getContent = window.getDataFrmRes[key];
    var dateFmt = getContent.due_date_time

    $("#SARoutinemodel").appendTo("body").modal("show");  
    $('#saTitle').html(dateFmt +' | '+getContent.task)
    $('#reportinstructions').html(getContent.instruction)
    if(getContent.status == 'Missed') { $('#saOptionMissedSA').prop('checked',true) } else if(getContent.status == 'Skipped') { $('#saOptionSkippedSA').prop('checked',true) } else if (getContent.status == 'Executed') { $('#saOptionExcutedSA').prop('checked',true) } else if(getContent.status == 'Upcoming') { $('#saOptionUpcomingSA').prop('checked',true) } else { $('#saOptionPendingSA').prop('checked',true) }
    $('#reportremarks').html(getContent.remarks)
}

function renderSARoutineReportGrid(data) {
    var SARoutineDataGrid = $("#sddgd-saroutine")
      .dxDataGrid({
        filterRow: {
          visible: true,
          applyFilter: "auto",
        },
        dataSource: data,
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
          emptyPanelText: "Drag a column"
        },
        sorting: {
          mode: "multiple",
        },
        // selection: {
        //   mode: "multiple",
        // },
          onToolbarPreparing: function (e) {
              var dataGrid = e.component;
              e.toolbarOptions.items.unshift({
                  location: "after",
                  widget: "dxButton",
                  options: {
                      icon: "refresh",
                      onClick: function () {
                          renderSARoutineReportGrid(window.getDataFrmRes);
                          dataGrid.refresh();
                      }
                  }
              });
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
                SARoutineDataGrid.pageIndex() * SARoutineDataGrid.pageSize() + options.rowIndex + 1
              );
            },
          },
          {
            caption: "Due Date Time",
            dataField: "due_date_time",
          },
          {
            caption: "Task",
            dataField: "task",
          },
          {
            caption: "Instruction",
            dataField: "instruction",
            visible: false,
          },
          {
            caption: "Instructions",
            dataField: "disp_instruction",
          },    
          {
            caption: "Action Date",
            dataField: "executedDateTime",
          },  
          {
            caption: "Action By",
            dataField: "executedBy",
          },   
          {
            caption: "Status",
            dataField: "status",
           
            cellTemplate: function (container, options) {
               var taskname = options.data["task"];
               var status = options.data["status"];
               var dataKey = options.data["key"];
                var domActions = "";
               
                    domActions +=                  
                    "<a onclick=\"openSAroutineModels('"+dataKey+"')\" href='javascript:void(0)'>"+status+"</a>";
               
              $("<div class='text-center'>")
                .append($(domActions))
                .appendTo(container);
              },         
          }
        ],
        onRowPrepared(e) {  
          if (e.rowType == 'data') {  
              if(e.data.status == "Missed"){
                e.rowElement.css("background",'#ffd6cc'); 
                e.rowElement.removeClass("dx-row-alt");
              }              
               else if(e.data.status == "Executed"){
                  e.rowElement.css("background",'#ccffcc');
                  e.rowElement.removeClass("dx-row-alt");
               }              
               else if(e.data.status == "Skipped"){
                  e.rowElement.css("background",'#FFF59D');
                  e.rowElement.removeClass("dx-row-alt");
               }              
               else if(e.data.status == "Upcoming"){
                e.rowElement.css("background",'white');
                e.rowElement.removeClass("dx-row-alt");
               }              
               else if(e.data.status == "Pending"){
                e.rowElement.css("background",'#ffffb3');
                e.rowElement.removeClass("dx-row-alt");
               }
              
           }  
        } 
      })
      .dxDataGrid("instance");
  }