var scheduledInterviewForCandidates = [];
var rrmsForScheduling = [];
var candidatesForScheduling = [];
var interviewwersForScheduling = [];
var interviewModesForScheduling = [];
var interviewTypesForScheduling = [];
var scheduledInterviewStagesForCandidate = [];
var interviewIdForScheduleSave;
var interviewsId;

$(document).ready(function () {
  getDataForScheduling();
  //bindInterviewScheduleGrid();
});

function refreshInterviewCreatedGrid(){
  var filterData = JSON.stringify({
    IsActive: true,
  });

  callGetListSync("GetInterviewCreatedCandidates", filterData, function (e) {
    scheduledInterviewForCandidates = e;
    $("#sdgd-rrmInterviewSchedule").dxDataGrid("instance").option('dataSource',scheduledInterviewForCandidates)
  });

  getDataForScheduling();
  
}

function getDataForScheduling() {
  var filterData = JSON.stringify({
    IsActive: true,
  });

  callGetListSync("GetInterviewCreatedCandidates", filterData, function (e) {
    scheduledInterviewForCandidates = e;
  });

  callGetListSync("GetRRMForInterviewScheduling", filterData, function (e) {
    rrmsForScheduling = [];
    rrmsForScheduling = e;    
    callGetListSync("GetCandidatesForInterviewScheduling", filterData, function (e) {
      candidatesForScheduling = [];
      candidatesForScheduling = e;
      bindInterviewScheduleGrid();
      var grid = $("#sdgd-rrmInterviewSchedule").dxDataGrid('instance');
      if(grid != null && grid != undefined){
        grid.refresh();
      }      
    });    
  });
  
}

function saveInterviewScheduleForCandidate(options){
  var RRMInterviewScheduleData = {
    RRMId: options.data.RRMId,
    CandidateId:options.data.CandidateId,
    IsActive:1
  };

  RRMInterviewSchedulePostCallData = {
      Method: "PostInterviewForCandidate",
      Data: RRMInterviewScheduleData
  };
  var RRMInterviewSchedulePostResult = PostDataCall(RRMInterviewSchedulePostCallData);
  if(RRMInterviewSchedulePostResult["IsSuccess"] != true){
    var RRMInterviewSchedulePostSwal = {
      title: "OOPS",
      text: RRMInterviewSchedulePostResult['Message'],
      icon: 'error'
    }
  rrmInterviewScheduleSwal(RRMInterviewSchedulePostSwal);
  }
  if(RRMInterviewSchedulePostResult["IsSuccess"] == true){
    var RRMInterviewSchedulePostSwal = {
      title: "Success",
      text: RRMInterviewSchedulePostResult['Message'],
      icon: 'success'
  }
  rrmInterviewScheduleSwal(RRMInterviewSchedulePostSwal);
  }
  refreshInterviewCreatedGrid();
}

function rrmInterviewScheduleSwal(data){
  swal({
    title: data.title,
    text: data.text,
    icon: data.icon,
    button:"OK"
  });   
}

function bindInterviewScheduleGrid() {
  var interviewScheduleDataGrid = $("#sdgd-rrmInterviewSchedule").dxDataGrid({
    dataSource:scheduledInterviewForCandidates,
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
      columnAutoWidth: true,
      showBorders: true,
      allowColumnResizing:true,
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
      editing: {
        mode: "row",
        allowAdding: false,
        allowUpdating:true,
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
          mode:"select"
      },
    onExporting: function (e) {
      var workbook = new ExcelJS.Workbook();
      var worksheet = workbook.addWorksheet("RRM Interview Scheduling");

      DevExpress.excelExporter
        .exportDataGrid({
          component: e.component,
          worksheet: worksheet,
          autoFilterEnabled: true,
          customizeCell: function (options) {
            var gridCell = options.gridCell;
            var excelCell = options.excelCell;
            if(!gridCell) {
                return;
            }
            if (gridCell.rowType === "header") {
              excelCell.font = { color: { argb: 'FFFFFF' } };
              excelCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "757171" }, bgColor: { argb: "757171" } };
              excelCell.alignment = { horizontal: 'left' };
            }
            if (gridCell.rowType === "data") {
              if (gridCell.column.caption === "Status") {
                excelCell.font = { color: { argb: 'FFFFFF' } };
                var status = gridCell.data.StatusId;
                var statusName = gridCell.data.Status;

                if (statusName === "Yet to schedule interview") {
                  excelCell.value =  statusName
                  excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "F0AD4E" } };
                }
                else if (status === "3C532499-6A0E-4EC7-8D51-08E14D28C686") {
                  excelCell.value = statusName
                  excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "5BC0DE" } };
                }
                else if (status === "564466B4-869B-45EB-A75E-0FB1E8D63161") {
                  excelCell.value = statusName
                  excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "5CB85C" } };
                }
                else if (status === "CB3068AF-6E5B-4325-A66E-E20AC1F915EB") {
                  excelCell.value = statusName
                  excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "D9534F" } };
                }
                else if (status === "D09C3FAA-1EE4-49F2-9CAD-25982A6034E4") {
                  excelCell.value = statusName
                  excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "777777" } };
                }
                else if (status === "D44D0312-0396-4031-80C8-D5D9B36924D0") {
                  excelCell.value = statusName
                  excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "337AB7" } };
                }
                else if (status === "44B51491-3791-485D-98F3-B0F884F0F5EC") {
                  excelCell.value = statusName
                  excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "F0AD4E" } };
                }
              }
            }
          },
        })
        .then(function(dataGridRange) {
          setBorders( worksheet, dataGridRange);
          return Promise.resolve();
        }).then(function () {
          workbook.xlsx.writeBuffer().then(function (buffer) {
            saveAs(
              new Blob([buffer], { type: "application/octet-stream" }),
              "RRMInterviewScheduling.xlsx"
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
            refreshInterviewCreatedGrid();
            //dataGrid.refresh();
          },
        },
      });
    },
    onCellPrepared: function(e) {
      if(e.rowType === "data" && e.column.command === "edit") {
        var isEditing = e.row.isEditing;
        
        if(!isEditing){
          e.cellElement.html("<button class='btn btn-xs btn-primary edit-btn edit-interview-schedule' data-interviewid = '"+e.data.Id+"' data-rrmid = '"+e.data.RRMId+"' data-candidateid='"+e.data.CandidateId+"'><i title='Schedule Interviews' class='fas fa-project-diagram'></i></button >");
        }
      }
    },
    columns: [
      {
        dataField: "Sno",
        caption: "#",
        alignment:"left",
        width:70,
        allowEditing:false
      },
      {
        dataField: "RRMId",
        caption: "RRM",
        setCellValue: function (rowData, value) {
          rowData.RRMId = value;
          rowData.CandidateId = null;
        },
        lookup: {
          dataSource: rrmsForScheduling,
          valueExpr: "Id",
          displayExpr: "RequirementName",
        },
        validationRules: [{
          type: "required",
          message: "Please select the RRM"
        }],
        cellTemplate: function (container, options) {  
          var domActions = "";
          domActions += "<a style='cursor:pointer' class='rrmdetailInterviewSchedule' data-rrmid =" + options.data.RRMId + ">"+options.data.RequirementName+"</a>";
          $("<div class='text-left'>").append($(domActions)).appendTo(container);
        }
      },
      {
        dataField: "RRMNo",
        caption: "RRMNo",
        allowEditing: false,
        cellTemplate: function (container, options) {  
          var domActions = "";
          if(options.data.RRMId != undefined || options.data.RRMId != null){
            domActions += "<a style='cursor:pointer' class='rrmdetailInterviewSchedule' data-rrmid =" + options.data.RRMId + ">"+options.data.RRMNo+"</a>";
          }
          $("<div class='text-left'>").append($(domActions)).appendTo(container);
        }
      },
      {
        dataField: "CandidateId",
        caption: "Candidate",
        lookup: {
          dataSource: function (options) {
            return {
              store: candidatesForScheduling,
              filter: options.data ? ["RRMId", "=", options.data.RRMId] : null,
            };
          },
          valueExpr: "CandidateIdForSchedule",
          displayExpr: "CandidateName",
        },
        validationRules: [{
          type: "required",
          message: "Please select the Candidate"
        }]
      }, 
      {
        dataField: "Status",
        caption: "Status",
        allowEditing: false,
        cellTemplate: function (container, options) {                        
            var domActions = "";
            if (options.data.Status == "Yet to schedule interview") {
                domActions += "<label class='label label-warning m-l-sm'>"+options.data.Status+"</label>";
            }                                         
            else if(options.data.StatusId == "3C532499-6A0E-4EC7-8D51-08E14D28C686"){
                domActions += "<label class='label label-info m-l-sm'>"+options.data.Status+"</label>";
            }
            else if(options.data.StatusId == "564466B4-869B-45EB-A75E-0FB1E8D63161"){
                domActions += "<label class='label label-success m-l-sm'>"+options.data.Status+"</label>";
            }
            else if(options.data.StatusId == "CB3068AF-6E5B-4325-A66E-E20AC1F915EB"){
                domActions += "<label class='label label-danger m-l-sm'>"+options.data.Status+"</label>";
            }
            else if(options.data.StatusId == "D09C3FAA-1EE4-49F2-9CAD-25982A6034E4"){
                domActions += "<label class='label label-default m-l-sm'>"+options.data.Status+"</label>";
            }
            else if(options.data.StatusId == "D44D0312-0396-4031-80C8-D5D9B36924D0"){
                domActions += "<label class='label label-primary m-l-sm'>"+options.data.Status+"</label>";
            }
            else if(options.data.StatusId == "44B51491-3791-485D-98F3-B0F884F0F5EC"){
                domActions += "<label class='label label-warning m-l-sm'>"+options.data.Status+"</label>";
            }
            $("<div class='text-left'>").append($(domActions)).appendTo(container);
        }, fixedPosition: "right"
      }
    ],
    onRowInserted: function (e) {
      saveInterviewScheduleForCandidate(e);
    }
  });
}

function bindInterviewScheduleStageGrid(dataSource) {
  var datagrid = $("#sdgd-candidateStagesForSchedule").dxDataGrid({
    dataSource:dataSource,
    filterRow: {
      visible: true,
      applyFilter: "auto",
    },
    repaintChangesOnly: true,
    highlightChanges: true,
    searchPanel: {
      visible: true,
      width: 240,
      placeholder: "Search...",
    },
    headerFilter: {
      visible: true,
    },
    filterPanel: { visible: true },
    allowColumnReordering: true,
    showBorders: true,
    columnAutoWidth: true,
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
    columnChooser: {
      enabled: true,
      mode:"select"
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
            getScheduledStagesForCandidates(interviewsId);
            dataGrid.refresh();
          },
        },
      });
    },
    columns: [
      {
        dataField: "ProfilePicture",
        caption: "",
        allowGrouping: false,
        allowCollapsing: false,
        allReordering:false,
        allowFiltering: false,
        width:70,
        cellTemplate: function (container, options) {
            
          $("<div class='text-center'>")
          .append("<img id='img-"+options.data.Id+"' src='"+options.data.ProfilePicture+"' class='img-circle interviewer-image' width='25px' height='25px'></img><div id='image-tooltip-"+options.data.Id+"'></div>")
          .appendTo(container);
          prepareImageTooltip(options.data.Id,options.data.ProfilePicture,options.data.InterviewerName)
        }
      },
      {
        dataField: "InterviewerName",
        caption: "Interviewer"
      },
      {
        dataField: "Status",
        caption: "Status",
        width:220,
        cellTemplate: function (container, options) {
          var domActions = "";                                                 
          if(options.data.StatusId == "3C532499-6A0E-4EC7-8D51-08E14D28C686"){
              domActions += "<span>"+options.data.TypeName+"-"+options.data.RowNum+"</span> <label class='label label-info m-l-sm'>"+options.data.StatusName+"</label>";
          }
          else if(options.data.StatusId == "564466B4-869B-45EB-A75E-0FB1E8D63161"){
              domActions += "<span>"+options.data.TypeName+"-"+options.data.RowNum+"</span> <label class='label label-success m-l-sm'>"+options.data.StatusName+"</label>";
          }
          else if(options.data.StatusId == "CB3068AF-6E5B-4325-A66E-E20AC1F915EB"){
              domActions += "<span>"+options.data.TypeName+"-"+options.data.RowNum+"</span> <label class='label label-danger m-l-sm'>"+options.data.StatusName+"</label>";
          }
          else if(options.data.StatusId == "D09C3FAA-1EE4-49F2-9CAD-25982A6034E4"){
              domActions += "<span>"+options.data.TypeName+"-"+options.data.RowNum+"</span> <label class='label label-default m-l-sm'>"+options.data.StatusName+"</label>";
          }
          else if(options.data.StatusId == "D44D0312-0396-4031-80C8-D5D9B36924D0"){
              domActions += "<span>"+options.data.TypeName+"-"+options.data.RowNum+"</span> <label class='label label-primary m-l-sm'>"+options.data.StatusName+"</label>";
          }
          else if(options.data.StatusId == "44B51491-3791-485D-98F3-B0F884F0F5EC"){
              domActions += "<span>"+options.data.TypeName+"-"+options.data.RowNum+"</span> <label class='label label-warning m-l-sm'>"+options.data.StatusName+"</label>";
          }
          $("<div class='text-left'>").append($(domActions)).appendTo(container);
        }, fixedPosition: "right", fixed: true, hidingPriority: 0
      },      
      {
        dataField: "ModeName",
        caption: "Mode"
      },
      {
        dataField: "InterviewDate",
        caption: "Date",
        format : "dd-MMM-yyyy",
        cellTemplate: function(container,options){
            var scheduledDate = convertInterviewScheduleDate(options.value)
            $("<div>")
            .append(scheduledDate)
            .appendTo(container);
            }
      },
      {
        dataField: "InterviewTime",
        caption: "Time"
      },
      {
        dataField: "Comments",
        caption: "Remarks",
        cellTemplate: function (container, options) {
            if(options.data.Comments != null && options.data.Comments.replace(" ","") != ""){
                $("<div>")
                .append("<a id='rrm_remarksId' rrm_remarks='"+options.data.Comments+"' style='cursor:pointer;text-decoration:underline;'>Remarks</a>")
                .appendTo(container);
            }     
            else{
                $("<div>")
                .append("No Remarks Yet")
                .appendTo(container);
            }             
        }
      },
      {
        caption:"Action", 
        dataField:"RRMId",
        allowGrouping: false,
        width:80,
        allowCollapsing: false,
        allReordering:false,
        allowFiltering: false,
        cellTemplate: function (container, options) {
          var html = "";
          html += "<button class='btn btn-xs btn-primary edit-btn edit-interview-schedule-stage' data-scheduleStageId = '"+options.data.Id+"' data-rrmId = '"+options.data.RRMId+"'><i title='Edit' class='fas fa-edit'></i></button >"  
          if(options.data.StatusId == '3C532499-6A0E-4EC7-8D51-08E14D28C686')
          {
            html +="<button class='btn btn-xs btn-primary edit-btn delete-interview-schedule-stage' data-scheduleStageId = '"+options.data.Id+"' data-rrmId = '"+options.data.RRMId+"'><i title='Edit' class='fas fa-trash'></i></button >"
          }
          
          $("<div class='text-left'>").append($(html)).appendTo(container);
        }, fixedPosition: "right", fixed: true, allowExporting: false, hidingPriority: 0
      }
    ]
  });
}


function generatePopoverForInterviewScheduleRemark(data){
  $("#remarks-tooltip-"+data.InterviewStageId).dxTooltip({
      target: "#remarks_"+data.InterviewStageId,
      showEvent: "mouseenter",
      hideEvent: "mouseleave",
      closeOnOutsideClick: false,
      position: "left",
      contentTemplate: function(e) {
          e.html(data.Comments);
      }
  });
}

$(document).on("click", "#rrm_remarksId", function (e) {
  var remark =$(this).attr('rrm_remarks');
  $('#rrm_interviewschedule_remarks').appendTo("body").modal("show");
  $("#remarksBodyRRM").empty();
  $("#remarksBodyRRM").html(remark);
})

function closeRRMInterviewSchedule(){
  $('#rrm_interviewschedule_remarks').modal("hide");
  $("#remarksBodyRRM").empty();
}

$(document).on("click", ".edit-interview-schedule", function (e) {
  interviewsId = $(e.currentTarget).data("interviewid");
  openInterviewSchedulePopup($(e.currentTarget).data("interviewid"),$(e.currentTarget).data("rrmid"));
  getCandidateDetailsForInterviewSchedule($(e.currentTarget).data("candidateid"))
  var filterData2 = JSON.stringify({
    "CandidateId":$(e.currentTarget).data("candidateid"),
    "IsActive": true
  }); 
  callGetListSync("GetInterviewHistoryDetails", filterData2, function (data) {
    mapInterviewSchedulePreviousInterviews(data)
  }); 
})

$(document).on("click", ".edit-interview-schedule-stage", function (e) {
  getScheduleDetailsForEdit($(e.currentTarget).data("schedulestageid"))
})

$(document).on("click", ".delete-interview-schedule-stage", function (e) {
  deleteInterviewStage($(e.currentTarget).data("schedulestageid"))
})

function openInterviewSchedulePopup(interviewId,rrmId){
      bindDevExtremeControlsForInterviewSchedule(rrmId);
      $('#InterviewScheduleModal').appendTo("body").modal("show");
      getScheduledStagesForCandidates(interviewId);
      $("#err-InterviewMode").html("");
      $("#err-Interviewers").html("");
      $("#btn-saveInterviewSchedule").show();
      $("#btn-updateInterviewSchedule").hide();
}

function closeInterviewScheduleModal(){
  refreshInterviewCreatedGrid();
  refreshControlsForInterviewScheduleModal();
}

function refreshControlsForInterviewScheduleModal(){
  $("#interviewScheduleId").html("");
  $("#sdd-interviewerForSchedule").dxSelectBox("instance").option('value', '');
  $("#sdd-interviewTypeForSchedule").dxSelectBox("instance").option('value', '');
  $("#sdd-modeForinterviewSchedule").dxSelectBox("instance").option('value', '');
  var now = new Date();
  $("#sddb-dateForInterviewSchedule").dxDateBox("instance").option('value',now);
  $("#sddb-timeForInterviewSchedule").dxDateBox("instance").option('value',now);
  $("#btn-saveInterviewSchedule").show();
  $("#btn-updateInterviewSchedule").hide();
  $("#err-InterviewMode").html("");
  $("#err-Interviewers").html("");
  $("#err-InterviewType").html("");
  $("#sdtxt-interviewDetailForSchedule").dxTextBox("instance").option('value','');
  $("#sdtxt-hrCommmentsForInterviewSchedule").dxHtmlEditor("instance").option('value','');
  $("#sddb-dateForInterviewSchedule").dxDateBox("instance").option('readOnly',false);
  $("#sddb-timeForInterviewSchedule").dxDateBox("instance").option('readOnly',false);
  $("#sdd-modeForinterviewSchedule").dxSelectBox("instance").option('readOnly',false);
  $("#sdd-interviewerForSchedule").dxSelectBox("instance").option('readOnly',false);
  $("#sdd-interviewTypeForSchedule").dxSelectBox("instance").option('readOnly',false);
  $("#sdtxt-interviewDetailForSchedule").dxTextBox("instance").option('readOnly',false);
}

function bindDevExtremeControlsForInterviewSchedule(rrmId){
  var filterData = JSON.stringify({
    IsActive: true,
    RRMId:rrmId
  });
  
  callGetListSync("GetInterviewersForInterviewScheduling", filterData, function (e) {
    scheduledInterviewForCandidates = e;
  });

  var filterData1 = JSON.stringify({
    IsActive: true,
  });

  callGetListSync("GetInterviewModes", filterData1, function (e) {
    interviewModesForScheduling = e;
  });

  callGetListSync("GetInterviewTypes", filterData1, function (e) {
    interviewTypesForScheduling = e;
  });
  
  $("#sdd-interviewerForSchedule").dxSelectBox({
    dataSource: new DevExpress.data.ArrayStore({
        data: scheduledInterviewForCandidates,
        key: "EmployeeId"
    }),
    displayExpr: "EmployeeName",
    valueExpr: "EmployeeId",
    placeholder:"Select interviewer",
    value:"",
    searchEnabled: true,
    showClearButton: true
  });

  $("#sdd-modeForinterviewSchedule").dxSelectBox({
    dataSource: new DevExpress.data.ArrayStore({
        data: interviewModesForScheduling,
        key: "Id"
    }),
    displayExpr: "ModeName",
    valueExpr: "Id",
    placeholder:"Select interview mode",
    value:"",
    searchEnabled: true,
    showClearButton: true
  });

  $("#sdd-interviewTypeForSchedule").dxSelectBox({
    dataSource: new DevExpress.data.ArrayStore({
        data: interviewTypesForScheduling,
        key: "EmployeeId"
    }),
    displayExpr: "TypeName",
    valueExpr: "Id",
    placeholder:"Select interview type",
    value:"",
    searchEnabled: true,
    showClearButton: true
  });

  var now = new Date();
  $("#sddb-dateForInterviewSchedule").dxDateBox({
    type: "date",
    value: now,
    min: now
  });

  $("#sddb-timeForInterviewSchedule").dxDateBox({
      type: "time",
      value: now,
      min: now,
  });

  $("#sdtxt-interviewDetailForSchedule").dxTextBox({
    value: "",
    placeHolder:"Enter Interview Details"
  });

  $("#sdtxt-hrCommmentsForInterviewSchedule").dxHtmlEditor({
    height: 300,
    toolbar: {
        items: [
            "undo", "redo", "separator",
            {
                formatName: "size",
                formatValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"] },
            {
                formatName: "font",
                formatValues: ["Arial", "Courier New", "Georgia", "Impact", "Lucida Console", "Tahoma", "Times New Roman", "Verdana"]
            },
            "separator", "bold", "italic", "strike", "underline", "separator",
            "alignLeft", "alignCenter", "alignRight", "alignJustify", "separator",
            "orderedList", "bulletList", "separator",
            {
                formatName: "header",
                formatValues: [false, 1, 2, 3, 4, 5]
            }, "separator",
            "color", "background", "separator",
            "link", "image", "separator",
            "clear", "codeBlock", "blockquote"
        ]
    },
    mediaResizing: {
        enabled: true
    },
    value:"",
    readOnly:false,
    mentions: [
      {
        dataSource: interviewersData,
        searchExpr: "EmployeeName",
        displayExpr: "EmployeeName",
        valueExpr: "EmployeeId",
        marker:"@"
      },{
        dataSource: rrmData,
        searchExpr: "RRMName",
        displayExpr: "RRMName",
        valueExpr: "RRMId",
        marker:"#"
    }]
});

}

function getScheduledStagesForCandidates(interviewId){
  interviewIdForScheduleSave = null;
  var filterData = JSON.stringify({
    IsActive: true,
    InterviewId : interviewId
  });
  var scheduledInterviewStagesForCandidate = [];
  callGetListSync("GetScheduledInterviewsForCandidate", filterData, function (e) {
    scheduledInterviewStagesForCandidate = e;
  });
  interviewIdForScheduleSave = interviewId;
  bindInterviewScheduleStageGrid(null);
  bindInterviewScheduleStageGrid(scheduledInterviewStagesForCandidate)
}

function addStageToInterview(){
  var interviewDate = $("#sddb-dateForInterviewSchedule").dxDateBox("instance").option('value');  
  var interviewDateForSave = interviewDate.getFullYear()+"-"+ ('0' + (interviewDate.getMonth()+1)).slice(-2) + "-" + ('0' + interviewDate.getDate()).slice(-2)
  var interviewTime = $("#sddb-timeForInterviewSchedule").dxDateBox("instance").option('value');  
  var interviewTimeForSave = ('0' + interviewTime.getHours()).slice(-2)+":"+ ('0' + interviewTime.getMinutes()).slice(-2) + ":" + ('0' + interviewTime.getSeconds()).slice(-2)
  var interviewModeId = $("#sdd-modeForinterviewSchedule").dxSelectBox("instance").option('value');
  var interviewerId = $("#sdd-interviewerForSchedule").dxSelectBox("instance").option('value');
  var interviewTypeId = $("#sdd-interviewTypeForSchedule").dxSelectBox("instance").option('value');
  var interviewDetails = $("#sdtxt-interviewDetailForSchedule").dxTextBox("instance").option('value');
  var hrComments = $("#sdtxt-hrCommmentsForInterviewSchedule").dxHtmlEditor("instance").option('value');
  var interviewScheduleId = null;
  if($("#interviewScheduleId").html() != "" && $("#interviewScheduleId").html() != null){
    interviewScheduleId = $("#interviewScheduleId").html();
  }
  if(interviewModeId == null || interviewModeId == ""){
    $("#err-InterviewMode").html("Select interview mode");
  }
  if(interviewerId == null || interviewerId == ""){
    $("#err-Interviewers").html("Select an interviewer");
  }
  if(interviewTypeId == null || interviewTypeId == ""){
    $("#err-InterviewType").html("Select an interview type");
  }
  if(interviewModeId != null && interviewModeId != "" && interviewerId != null && interviewerId != ""){
    var RRMInterviewStageScheduleData = {
      IsActive: true,
      InterviewId:interviewIdForScheduleSave,
      InterviewTypeId: interviewTypeId,
      InterviewScheduleId: interviewScheduleId,
      ModeId:interviewModeId,
      InterviewerId:interviewerId,
      InterviewDate:interviewDateForSave,
      InterviewTime: interviewTimeForSave,
      InterviewDetails : interviewDetails,
      HrComments : hrComments
    };
    
    RRMInterviewScheduleStagesPostCallData = {
        Method: "PostInterviewScheduleForCandidate",
        Data: RRMInterviewStageScheduleData
    };
    var RRMInterviewScheduleStagesPostResult = PostDataCall(RRMInterviewScheduleStagesPostCallData);
    if(RRMInterviewScheduleStagesPostResult["IsSuccess"] != true){
      var RRMInterviewScheduleStagePostSwal = {
        title: "OOPS",
        text: RRMInterviewScheduleStagesPostResult['Message'],
        icon: 'error'
      }
      rrmInterviewScheduleSwal(RRMInterviewScheduleStagePostSwal);
    }
    if(RRMInterviewScheduleStagesPostResult["IsSuccess"] == true){
      var RRMInterviewScheduleStagePostSwal = {
        title: "Success",
        text: RRMInterviewScheduleStagesPostResult['Message'],
        icon: 'success'
      }
      rrmInterviewScheduleSwal(RRMInterviewScheduleStagePostSwal);
    }
    getScheduledStagesForCandidates(interviewIdForScheduleSave);
    refreshControlsForInterviewScheduleModal();
    $("#err-InterviewMode").html("");
    $("#err-Interviewers").html("");
  }
}

function getScheduleDetailsForEdit(scheduleId){
  var filterData = JSON.stringify({
    IsActive: true,
    InterviewScheduleId : scheduleId
  });
  var scheduledStageDetails = [];
  callGetListSync("GetScheduledInterviewDetailsById", filterData, function (e) {
    scheduledStageDetails = e;
    if(scheduledStageDetails[0].StatusId == "3C532499-6A0E-4EC7-8D51-08E14D28C686"){
      bindDetailsForSchedule(scheduledStageDetails[0])
    }
    else{
      var RRMInterviewScheduleEditSwal = {
        title: "Warning",
        text: "Interview process is over. Only comments can be edited",
        icon: 'warning'
      }
      rrmInterviewScheduleSwal(RRMInterviewScheduleEditSwal);
      bindReadOnlyDetailsForSchedule(scheduledStageDetails[0])
    }
  });
}

function prepareImageTooltip(Id,ProfilePicture,InterviewerName){
  $("#image-tooltip-"+Id).dxTooltip({
    target: "#img-"+Id,
    showEvent: "mouseenter",
    hideEvent: "mouseleave",
    closeOnOutsideClick: false,
    position: "right",
    contentTemplate: function(data) {
        data.html("<img width='150' height='150' src='"+ProfilePicture+"'><br/><b>"+InterviewerName+"</b>");
    }
});
}

function bindDetailsForSchedule(data){
  $("#sddb-dateForInterviewSchedule").dxDateBox("instance").option('readOnly',false);
  $("#sddb-dateForInterviewSchedule").dxDateBox("instance").option('value',new Date(data.InterviewDate));
  $("#sddb-timeForInterviewSchedule").dxDateBox("instance").option('readOnly',false);
  $("#sddb-timeForInterviewSchedule").dxDateBox("instance").option('value',new Date(data.InterviewDate.split('T')[0] + " " + data.InterviewTime));
  $("#sdd-modeForinterviewSchedule").dxSelectBox("instance").option('readOnly',false);
  $("#sdd-modeForinterviewSchedule").dxSelectBox("instance").option('value',data.InterviewModeId);
  $("#sdd-interviewerForSchedule").dxSelectBox("instance").option('readOnly',false);
  $("#sdd-interviewerForSchedule").dxSelectBox("instance").option('value',data.InterviewerId);
  $("#sdd-interviewTypeForSchedule").dxSelectBox("instance").option('readOnly',false);
  $("#sdd-interviewTypeForSchedule").dxSelectBox("instance").option('value',data.InterviewTypeId);
  $("#sdtxt-interviewDetailForSchedule").dxTextBox("instance").option('readOnly',false);
  $("#sdtxt-interviewDetailForSchedule").dxTextBox("instance").option('value',data.InterviewDetails);
  $("#sdtxt-hrCommmentsForInterviewSchedule").dxHtmlEditor("instance").option('value',data.HrComments);
  $("#btn-saveInterviewSchedule").hide();
  $("#btn-updateInterviewSchedule").show();
  $("#interviewScheduleId").html(data.Id);
}

function bindReadOnlyDetailsForSchedule(data){
  $("#sddb-dateForInterviewSchedule").dxDateBox("instance").option('readOnly',true);
  $("#sddb-dateForInterviewSchedule").dxDateBox("instance").option('value',new Date(data.InterviewDate));
  $("#sddb-timeForInterviewSchedule").dxDateBox("instance").option('readOnly',true);
  $("#sddb-timeForInterviewSchedule").dxDateBox("instance").option('value',new Date(data.InterviewDate.split('T')[0] + " " + data.InterviewTime));
  $("#sdd-modeForinterviewSchedule").dxSelectBox("instance").option('readOnly',true);
  $("#sdd-modeForinterviewSchedule").dxSelectBox("instance").option('value',data.InterviewModeId);
  $("#sdd-interviewerForSchedule").dxSelectBox("instance").option('readOnly',true);
  $("#sdd-interviewerForSchedule").dxSelectBox("instance").option('value',data.InterviewerId);
  $("#sdd-interviewTypeForSchedule").dxSelectBox("instance").option('readOnly',true);
  $("#sdd-interviewTypeForSchedule").dxSelectBox("instance").option('value',data.InterviewTypeId);
  $("#sdtxt-interviewDetailForSchedule").dxTextBox("instance").option('readOnly',true);
  $("#sdtxt-interviewDetailForSchedule").dxTextBox("instance").option('value',data.InterviewDetails);
  $("#sdtxt-hrCommmentsForInterviewSchedule").dxHtmlEditor("instance").option('value',data.HrComments);
  $("#btn-saveInterviewSchedule").hide();
  $("#btn-updateInterviewSchedule").show();
  $("#interviewScheduleId").html(data.Id);
}

function getCandidateDetailsForInterviewSchedule(candidateId){
  var filterData = JSON.stringify({
    IsActive: true,
    CandidateProfilebyId : candidateId
  });
  callGetListSync("GetCandidateProfilebyId", filterData, function (data) {
    if(data[0].LastName == null){
      data[0].LastName = ""
    }
    $("#lbl-candidateName").html(data[0].FirstName+" "+data[0].LastName)
    if(data[0].Mobile == null){
      data[0].Mobile = "Not available"
    }
    $("#lbl-candidateMobileNumber").html(data[0].Mobile)
    if(data[0].EmailId == null){
      $("#lbl-candidateEmailId").html("Not available")
    }
    else{
      $("#lbl-candidateEmailId").html("<a href='mailto:" + data[0].EmailId + "' target='_blank'>"+data[0].EmailId+"</a>")
    }
    var socialLinksHtml = "";
    if(data[0].Skype != null && data[0].Skype != ""){
      socialLinksHtml +="<a href='skype:" + data[0].Skype + "?chat'><i class='fab fa-skype'></i></a> &nbsp;"
    }
    if(data[0].GitHub != null && data[0].GitHub != ""){
      socialLinksHtml +="<a href='" + data[0].GitHub + "' target='_blank'><i class='fab fa-github' aria-hidden='true'></i></a> &nbsp;"
    }
    if(data[0].LinkedIn != null && data[0].LinkedIn != ""){
      socialLinksHtml +="<a href='" + data[0].LinkedIn + "' target='_blank'><i class='fab fa-linkedin'></i></a> &nbsp;"
    }
    if(data[0].Url != null && data[0].Url != ""){
      socialLinksHtml +="<a href='" + data[0].Url + "' target='_blank'><i class='fa fa-link'></i></a>"
    }    
    $("#lbl-candidateSocialLinks").html(socialLinksHtml)
    if(data[0].DocumentId != null && data[0].DocumentId != ""){
      $("#lbl-CandidateResume").html("Resume: <button class='btn btn-xs btn-primary' onclick=downloadProfileResumeForInterviewSchedule('"+data[0].DocumentId+"')><i title='Download Resume' class='fa fa-download'></i></button>")
    }
    else{
      $("#lbl-CandidateResume").html("Resume: Not Available")
    }
    
    $("#star-communicationrating").text(data[0].CommunicationRatingHR);
    $("#lbl-candidateSkills").html(data[0].SkillName);
    $("#lbl-nativeInfo").html(data[0].Native);
    $("#lbl-workexperience").html(data[0].PreviousEmployersInfo);
  });
}

function downloadProfileResumeForInterviewSchedule(FileId){
  // swal({
  //     title: "Are you sure?",
  //     text: "You want to download the Resume",
  //     icon: "warning",
  //     buttons: true,
  //   })
  //   .then((willDownload) => {
  //     if (willDownload) {
        window.open(SynergyAPIURL + "DownloadFile?query=GetDownloadProfileResume&filters={'FileId':'" + FileId + "'}&Token=" + localStorage.getItem("securityToken") , '_blank');
    //   }
    // });
}

function deleteInterviewStage(stage){
  swal({
      title: "Are you sure?",
      text: "You want to delete?",
      icon: "warning",
      buttons: true,
    })
    .then((willDownload) => {
      if (willDownload) {
        var RRMInterviewScheduleData = {
          InterviewStageId:stage,
          IsActive:1
        };

        RRMInterviewSchedulePostCallData = {
            Method: "DeleteInterviewScheduledStage",
            Data: RRMInterviewScheduleData
        };
        var RRMInterviewSchedulePostResult = PostDataCall(RRMInterviewSchedulePostCallData);
        getScheduledStagesForCandidates(interviewIdForScheduleSave);
        refreshControlsForInterviewScheduleModal();
        $("#err-InterviewMode").html("");
        $("#err-Interviewers").html("");
    }
    });
}


$('ul#rrmInterviewScheduleTabs li').click(function(e)
{            
    var tab_details = $(this).attr("id");
    var currentTab = $("#"+tab_details + " > a ").attr("aria-controls");            
    $('ul#rrmInterviewScheduleTabs li').removeClass("active");
    $(this).addClass("active");
    $("#rrmOfferInterviewScheduleDetails .tab-pane").removeClass("active");
    $("#" + currentTab).addClass("active");
    new SimpleBar(document.getElementById('rrm_InterviewScheduleModalBody'));
});

function mapInterviewSchedulePreviousInterviews(data){
  var result = data.reduce(function (r, a) {
    r[a.RRMNo] = r[a.RRMNo] || [];
    r[a.RRMNo].push(a);
    return r;
}, Object.create(null));

  var interviewCompletedState = false;
  var html = ""
  if(data != undefined && data.length > 0){
    $.each(result,function(id,items){

      if(items[0].SortOrder != null && items[0].SortOrder != ""){
        if(items[0].SortOrder == "2" || items[0].SortOrder =="3" || items[0].SortOrder == "6"){
          html += "<div>"
          html += "<div><strong>"+ id +"</strong></div> <br>"
        }
    }

      items.forEach(function (key, item) {

        if(key.SortOrder == "2" || key.SortOrder == "3" || key.SortOrder == "6"){
          if(key.SortOrder == "2"){
              html += "<div class='panel panel-success'>"
          }
          if(key.SortOrder == "3"){
              html += "<div class='panel panel-danger'>"
          }
          if(key.SortOrder == "6"){
              html += "<div class='panel panel-warning'>"
          }
          html += "<div class='panel-heading' data-toggle='collapse' data-parent='#rrm_InterviewScheduleInterviewHistoryAccordian' href='#collapseInterviewSchedule"+key.Id+"' onclick=rrmInterviewSchedulePanelClick('sdgd-RRMInterviewScheduleInterviewHistory-"+key.Id+"') style='cursor:pointer'>"
          html += "<h3 class='panel-title'>"
          html += "<a data-toggle='collapse' data-parent='#rrm_InterviewScheduleInterviewHistoryAccordian' href='#collapseInterviewSchedule"+key.RRMId+"'>"
          if(key.SortOrder == "2"){
              html +=  key.RRMNo+"&nbsp;"+key.TypeName +"-"+key.RowNum+"</a> &nbsp;<label class='label label-success m-l-sm'>Passed</label><span style='float:right'>"+key.InterviewerName+"</span>"
          }
          if(key.SortOrder == "3"){
              html +=  key.RRMNo+"&nbsp;"+key.TypeName +"-"+key.RowNum+"</a> &nbsp;<label class='label label-danger m-l-sm'>Failed</label><span style='float:right'>"+key.InterviewerName+"</span>"
          }
          if(key.SortOrder == "6"){
              html +=  key.RRMNo+"&nbsp;"+key.TypeName +"-"+key.RowNum+"</a> &nbsp;<label class='label label-warning m-l-sm'>On-Hold</label><span style='float:right'>"+key.InterviewerName+"</span>"
          }                
          html += "</h3>"
          html += "</div>"
          html += "<div id='collapseInterviewSchedule"+key.Id+"' class='panel-collapse collapse'>"
          html += "<div class='panel-body' style='overflow-y:scroll;height:300px;'>"
          html += "<div id='sdgd-RRMInterviewScheduleInterviewHistory-"+key.Id+"'></div>"
          html += "<br><div><h2>Remarks:</h2></div>"
          html += "<div class='row' ><div class='col-md-12' id='rrm-interview-schedule-remarks'>"+key.Comments+"</div></div>"
          html +="</div>"
          html += "</div>"
          html += "</div> <br>"                
          interviewCompletedState = true;
          
      }
      })
      html += "</div>"
      })      
  }
  if(interviewCompletedState == true){
    $("#rrm_InterviewScheduleInterviewHistoryAccordian").html(html);
    
        $.each(result,function(id,items){
         
            items.forEach(function (item,key) {
             
               var dataOnRRMId = [];
                if(item.SortOrder == "2" || item.SortOrder == "3" || item.SortOrder == "6"){
                    dataOnRRMId.push(item);
                    binDataGridsForInterviewScheduleInterviewHistory(dataOnRRMId,"#sdgd-RRMInterviewScheduleInterviewHistory-"+item.Id)
                }
            })
        });
  }  
  else{
      $("#rrm_InterviewScheduleInterviewHistoryAccordian").html("<h3>No Previous Interview available for this candidate</h3>");
  }
}

function binDataGridsForInterviewScheduleInterviewHistory(data,Id){
  rrmInterviewScheduleInterviewHistoryGrid(data,Id);
}

function rrmInterviewScheduleInterviewHistoryGrid(interviewStages,id){   
  $(id).dxDataGrid({
      dataSource:interviewStages,
      repaintChangesOnly: true,
      highlightChanges: true,
      searchPanel: {
        visible: false
      },
      allowColumnReordering: true,
      showBorders: true,
      columnAutoWidth: true,
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
      sorting: {
        mode: "multiple",
      },    
      rowAlternationEnabled: true,
      allowColumnReordering: true,
      allowColumnResizing: true,
      showBorders: true,  
      columns: [
        {
          dataField: "ProfilePicture",
          caption: "",
          allowGrouping: false,
          allowCollapsing: false,
          allReordering:false,
          allowFiltering: false,
          width:70,
          cellTemplate: function (container, options) {
              
            $("<div class='text-center'>")
            .append("<img id='imgRRMInterviewScheduleInterviewHistory-"+options.data.Id+"' src='"+options.data.ProfilePicture+"' class='img-circle interviewer-image' width='25px' height='25px'></img><div id='imageTooltipRRMInterviewScheduleInterviewHistory"+options.data.Id+"'></div>")
            .appendTo(container);
            prepareImageTooltipForRRMInterviewScheduleInterviewHistory(options.data.Id,options.data.ProfilePicture,options.data.InterviewerName)
          }
        },
        {
          dataField: "RRMNo",
          caption: "RRM No."
        },
        {
          dataField: "RRMName",
          caption: "RRM Name"
        },
        {
          dataField: "InterviewerName",
          caption: "Interviewer"
        },
        {
          dataField: "Status",
          caption: "Status",
          width:180,
          cellTemplate: function (container, options) {
              $("<div>")
            .append("<span>"+options.data.TypeName+"-"+options.data.RowNum+" "+options.data.StatusName+"</span>")
            .appendTo(container);
          }
        },      
        {
          dataField: "ModeName",
          caption: "Mode"
        },
        {
          dataField: "InterviewDate",
          caption: "Date",
          format : "dd-MMM-yyyy",
            cellTemplate: function(container,options){
                var scheduledDate = convertInterviewScheduleDate(options.value)
                $("<div>")
                .append(scheduledDate)
                .appendTo(container);
                }
        },
        {
          dataField: "InterviewTime",
          caption: "Time"
        },
        {
          dataField: "Comments",
          caption: "Remarks",
          visible:false
        },
        {
          dataField: "InterviewDetails",
          caption: "Interview Details"
        },
        {
            dataField:"OverallMark",
            caption:"Score",
            width:180,
            cellTemplate:function(container, options){
                var meterhtml = "";
              if(options.data.OverallMark <= 4){
                  meterhtml += "<span class='scoremeter'><meter class='redmeter' min='0' max='10' value='"+options.data.OverallMark+"' tooltip='10' width='5px'></meter><b> "+options.data.OverallMark+"/10</b></span>"
              } 
              if(options.data.OverallMark < 8 && options.data.OverallMark >4){
                  meterhtml += "<span class='scoremeter'><meter class='orangemeter' min='0' max='10' value='"+options.data.OverallMark+"' tooltip='10' width='5px'></meter><b> "+options.data.OverallMark+"/10</b></span>"
              }
              if(options.data.OverallMark > 8){
                  meterhtml += "<span class='scoremeter'><meter class='greenmeter' min='0' max='10' value='"+options.data.OverallMark+"' tooltip='10' width='5px'></meter><b> "+options.data.OverallMark+"/10</b></span>"
              }  
              $(meterhtml).appendTo(container);  
            }
        }
      ]
    });
}

function prepareImageTooltipForRRMInterviewScheduleInterviewHistory(Id,ProfilePicture,InterviewerName){
  $("#imageTooltipRRMInterviewScheduleInterviewHistory"+Id).dxTooltip({
    target: "#imgRRMInterviewScheduleInterviewHistory-"+Id,
    showEvent: "mouseenter",
    hideEvent: "mouseleave",
    closeOnOutsideClick: false,
    position: "right",
    contentTemplate: function(data) {
        data.html("<img width='150' height='150' src='"+ProfilePicture+"'><br/><b>"+InterviewerName+"</b>");
    }
});
}

function rrmInterviewSchedulePanelClick(id){
  $("#"+id).dxDataGrid("instance").refresh();
  setTimeout(function(){
      new SimpleBar(document.getElementById('InterviewModalBody'));
  }, 1000);    
}


$(document).on("click", ".rrmInterviewSchedule", function (e) {
  var comments =  $(this).attr("data-comments");
  if(comments =="" && comments == null){
      comments = "Comments Not Avalilable";
  }
  else{
   $("#rrm-interview-schedule-remarks").html("");
   $("#rrm-interview-schedule-remarks").html(comments);
  }
});

function setBorderCell(worksheet, row, column, borderValue) {
  const excelCell = worksheet.getCell(row, column);

  if(!excelCell.border) {
    excelCell.border = {};
  }

  Object.assign(excelCell.border, borderValue);
}

function setBorders( worksheet, cellsRange) {
  var borderStylePattern = { style: 'thin', color: { argb: 'FF7E7E7E' } };
  for(let i = cellsRange.from.row; i < cellsRange.to.row; i++) {
    for(let j = cellsRange.from.column; j <= cellsRange.to.column; j++) {
      setBorderCell(worksheet, i, j, { bottom: borderStylePattern });
      setBorderCell(worksheet, i, j, { right: borderStylePattern }); 
    }
  }
  for(let i = cellsRange.from.column; i <= cellsRange.to.column; i++) {
    setBorderCell(worksheet, cellsRange.from.row, i, { top: borderStylePattern });
  }
  for(let i = cellsRange.from.row; i <= cellsRange.to.row; i++) {
    setBorderCell(worksheet, i, cellsRange.from.column, { left: borderStylePattern });
  }
  for(let i = cellsRange.from.row; i <= cellsRange.to.row; i++) {
    setBorderCell(worksheet, i, cellsRange.to.column, { right: borderStylePattern });
  }
  for(let i = cellsRange.from.column; i <= cellsRange.to.column; i++) {
    setBorderCell(worksheet, cellsRange.to.row, i, { bottom: borderStylePattern });
  }
}

  //convert date format 
  function convertInterviewScheduleDate(BenchStartDate){
    var sdate=BenchStartDate;
    var sd = sdate;
    var startdateChanged= sd.replace(/\//g, "-");
    startdateChanged=startdateChanged.replace("T00:00:00","");	
    startdateChanged = startdateChanged.split('-');
  
      var mm=parseInt(startdateChanged[1]);
      var month=(moment().month(mm-1).format("MMM"));
      startdateChanged=startdateChanged[0]+"-"+month+"-"+startdateChanged[2];
      return startdateChanged;
  }