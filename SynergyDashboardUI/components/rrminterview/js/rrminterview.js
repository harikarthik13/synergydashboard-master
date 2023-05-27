var interviewsScheduledForInterviewers = [];
var interviewStatusForInterviews = [];
var interviewStageIdForSave;
var candidateId;
var rrmIds;

$(document).ready(function () {
    getInterviewsForInterviewers();
});

function getInterviewsForInterviewers() {
    var filterData = JSON.stringify({
      IsActive: true,
    });
  
    callGetListSync("GetScheduledInterviewsForInterviewers", filterData, function (e) {
        interviewsScheduledForInterviewers = e;
        callGetListSync("GetInterviewStatusForInterviews", filterData, function (result) {
            interviewStatusForInterviews = result;
            bindInterviewersScheduleGrid();
        });
    });          
}

function getInterviewsForInterviewersRefresh() {
    var filterData = JSON.stringify({
      IsActive: true,
    });
  
    callGetListSync("GetScheduledInterviewsForInterviewers", filterData, function (e) {
        $("#sdgd-rrmInterview").dxDataGrid({dataSource:e});
    });          
}

function bindInterviewersScheduleGrid() {
    var interviewScheduleDataGrid = $("#sdgd-rrmInterview").dxDataGrid({
      dataSource:interviewsScheduledForInterviewers,
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
        //columnAutoWidth: true,
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
                column: "Sno",
                summaryType: "count"
            }
            // ...
            ],
            groupItems: [{
                column: "Sno",
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
                if(gridCell.rowType === "data") {
                    if(gridCell.column.caption === "Status") {
                        excelCell.font = { color: { argb: 'FFFFFF' } };
                        var status = gridCell.data.StatusId;
                        var type  = gridCell.data.Type;
                        var rowNum = gridCell.data.RowNum;
                        var statusName = gridCell.data.StatusName;
                        if(status === "3C532499-6A0E-4EC7-8D51-08E14D28C686"){
                            excelCell.value = type+"-"+rowNum+" "+statusName
                            excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "5BC0DE" } };
                        }
                        else if(status === "564466B4-869B-45EB-A75E-0FB1E8D63161"){
                            excelCell.value = type+"-"+rowNum+" "+statusName
                            excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "5CB85C" } };
                        }
                        else if(status === "CB3068AF-6E5B-4325-A66E-E20AC1F915EB"){
                            excelCell.value = type+"-"+rowNum+" "+statusName
                            excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "D9534F" } };
                        }
                        else if(status === "D09C3FAA-1EE4-49F2-9CAD-25982A6034E4"){
                            excelCell.value = type+"-"+rowNum+" "+statusName
                            excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "777777" } };
                        }
                        else if(status === "D44D0312-0396-4031-80C8-D5D9B36924D0"){
                            excelCell.value = type+"-"+rowNum+" "+statusName
                            excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "337AB7" } };
                        }
                        else if(status === "44B51491-3791-485D-98F3-B0F884F0F5EC"){
                            excelCell.value = type+"-"+rowNum+" "+statusName
                            excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "F0AD4E" } };
                        }
                    }
                }
            }
          })
          .then(function(dataGridRange) {
            setBorders( worksheet, dataGridRange);
            return Promise.resolve();
          }).then(function () {
            workbook.xlsx.writeBuffer().then(function (buffer) {
              saveAs(
                new Blob([buffer], { type: "application/octet-stream" }),
                "RRMInterview.xlsx"
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
                getInterviewsForInterviewersRefresh();
            },
          },
        });
      },
      columns: [
        {
            dataField: "Sno",
            caption: "#",
            alignment:"left",
            width:70
        },
        {
            dataField: "CandidateName",
            caption: "Candidate"
        },
        {
            dataField: "RRMNo",
            caption: "RRM No.",
            cellTemplate: function (container, options) {  
                var domActions = "";
                domActions += "<a style='cursor:pointer' class='rrmdetailInterviewCard' data-rrmid =" + options.data.RRMId + ">"+options.data.RRMNo+"</a>";
                $("<div class='text-left'>").append($(domActions)).appendTo(container);
            }
        },
        {
            dataField: "RequirementName",
            caption: "Requirement Name",
            cellTemplate: function (container, options) {  
                var domActions = "";
                domActions += "<a style='cursor:pointer' class='rrmdetailInterviewCard' data-rrmid =" + options.data.RRMId + ">"+options.data.RequirementName+"</a>";
                $("<div class='text-left'>").append($(domActions)).appendTo(container);
            }
        },      
        {
            dataField: "Recruiter",
            caption: "Recruiter Name"
        },
        {
          dataField: "InterviewDate",
          caption: "Scheduled Date",
          allowEditing: false,
            dataType :"date",
            format : "dd-MMM-yyyy",
            allowFiltering: true
        },
        {
            dataField: "InterviewTime",
            caption: "Scheduled Time",
        },
        // {
        //     dataField: "ModeName",
        //     caption: "Mode"
        // },
        {
            dataField: "Type",
            caption: "Type"
        },
        // {
        //     dataField: "InterviewDetails",
        //     caption: "Meeting Details"
        // },
        {
            dataField: "Status",
            caption: "Status",
            cellTemplate: function (container, options) {
                var domActions = "";                                                 
                if(options.data.StatusId == "3C532499-6A0E-4EC7-8D51-08E14D28C686"){
                    domActions += "<span>"+options.data.Type+"-"+options.data.RowNum+"</span> <label class='label label-info m-l-sm'>"+options.data.StatusName+"</label>";
                }
                else if(options.data.StatusId == "564466B4-869B-45EB-A75E-0FB1E8D63161"){
                    domActions += "<span>"+options.data.Type+"-"+options.data.RowNum+"</span> <label class='label label-success m-l-sm'>"+options.data.StatusName+"</label>";
                }
                else if(options.data.StatusId == "CB3068AF-6E5B-4325-A66E-E20AC1F915EB"){
                    domActions += "<span>"+options.data.Type+"-"+options.data.RowNum+"</span> <label class='label label-danger m-l-sm'>"+options.data.StatusName+"</label>";
                }
                else if(options.data.StatusId == "D09C3FAA-1EE4-49F2-9CAD-25982A6034E4"){
                    domActions += "<span>"+options.data.Type+"-"+options.data.RowNum+"</span> <label class='label label-default m-l-sm'>"+options.data.StatusName+"</label>";
                }
                else if(options.data.StatusId == "D44D0312-0396-4031-80C8-D5D9B36924D0"){
                    domActions += "<span>"+options.data.Type+"-"+options.data.RowNum+"</span> <label class='label label-primary m-l-sm'>"+options.data.StatusName+"</label>";
                }
                else if(options.data.StatusId == "44B51491-3791-485D-98F3-B0F884F0F5EC"){
                    domActions += "<span>"+options.data.Type+"-"+options.data.RowNum+"</span> <label class='label label-warning m-l-sm'>"+options.data.StatusName+"</label>";
                }
                $("<div class='text-left'>").append($(domActions)).appendTo(container);
            }, fixedPosition: "right"
        },
        {
            caption: "", dataField: "InterviewStageId", allowGrouping: false, allowCollapsing: false, allReordering: false, allowSearching: false,
            cellTemplate: function (container, options) {
                if(options.data.SortOrder == 1){
                    $("<div>")
                    .append("<button data-type='edit' data-interviewstageid =" + options.data.InterviewStageId + "   class='btn btn-xs btn-primary edit-btn interview-stage-edit' title='"+ options.data.Type+"'><i class='fas fa-pencil-alt'></i></button>")
                    .appendTo(container);
                } 
                else{
                    $("<div>")
                    .append("<button data-type='edit' data-interviewstageid =" + options.data.InterviewStageId + "   class='btn btn-xs btn-primary edit-btn interview-stage-info' title='View Interview'><i class='fas fa-eye'></i></button>")
                    .appendTo(container);
                }               
            }, fixedPosition: "right", allowExporting: false
        }
      ]
    });
  }

  $(document).on("click", ".interview-stage-edit", function (e) {
    openInterviewPopup();
    getCandidateDetailsForInterview($(e.currentTarget).data("interviewstageid"));
    $("#btnSaveInterviewSummary").show();
    $("#rrm_InterviewSummaryTab").click();
  });

  $(document).on("click", ".interview-stage-info", function (e) {
    openInterviewPopup();
    getCandidateDetailsForInterview($(e.currentTarget).data("interviewstageid"));
    getInterviewSummaryDetails($(e.currentTarget).data("interviewstageid"));
    $("#rrm_InterviewSummaryTab").click();
  })



function loadRelatedRRM(skillId,familyId){
    var data = [];
    var filterData1 = JSON.stringify({
        "Token":Token,
        "SkillId":skillId,
        "IsActive": true
    });

    callGetListSync("GetRRMBySkills", filterData1, function (RRMData) {
       data = RRMData;
    })

    var rrmRelatedGrid = $("#sdgd_rrm_RelatedRRMGrid").dxDataGrid({
          dataSource:data,
          filterRow: {
            visible: true,
            applyFilter: "auto",
          },
          selection: {
            mode: 'single',
          },
          repaintChangesOnly: true,
          highlightChanges: true,
          export: {
            enabled: true,
            allowExportSelectedData: false,
          },
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
            showPageSizeSelector: false,
            allowedPageSizes: [5, 10, 20],
            showInfo: false,
          },
          groupPanel: {
            visible: true,
            emptyPanelText: "Drag a column header here to group by that column",
          },
          sorting: {
            mode: "multiple",
          },
          summary: {
            totalItems: [{
                column: "RRMNo",
                summaryType: "count"
            }
            ],
            groupItems: [{
                column: "RRMNo",
                summaryType: "count"
            }]
        },
          columnChooser: {
            enabled: true,
            mode:"select"
          },
          onRowClick: function (e){
            relatedRRMDataGridChange(e);
          },
          onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet("Interview Related RRM");
      
            DevExpress.excelExporter
              .exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true,
                customizeCell: function (options) {
                  var gridCell = options.gridCell;
                  var excelCell = options.excelCell;
                  if (!gridCell) {
                    return;
                  }
                  if (gridCell.rowType === "header") {
                    excelCell.font = { color: { argb: 'FFFFFF' } };
                    excelCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "757171" }, bgColor: { argb: "757171" } };
                    excelCell.alignment = { horizontal: 'left' };
                  }
                }
              })
              .then(function (dataGridRange) {
                setBorders(worksheet, dataGridRange);
                return Promise.resolve();
              }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                  saveAs(
                    new Blob([buffer], { type: "application/octet-stream" }),
                    "InterviewRelatedRRM.xlsx"
                  );
                });
              });
            e.cancel = true;
          },
          rowAlternationEnabled: true,
          filterPanel: { visible: true },
          allowColumnReordering: true,
          allowColumnResizing: true,
          showBorders: true,
          // onToolbarPreparing: function (e) {
          //   var dataGrid = e.component;
          //   e.toolbarOptions.items.unshift({
          //     location: "after",
          //     widget: "dxButton",
          //     options: {
          //       icon: "refresh",
          //       onClick: function () {
          //         getOfferDispatchedCandidates();
          //       },
          //     },
          //   });
          // },
          columns: [
              {
                  dataField: "RRMNo",
                  caption: "RRM No",
              },
              {
                dataField: "RRMId",
                visible:false
              },
              {
                  dataField: "RequirementName",
                  caption: "Requirement Name"
  
              },
              {
                dataField: "RequiredFor",
                caption: "Required For"

            },
            {
                dataField: "Owner",
                caption: "Owner",
                visible:true
            },
            {
                dataField: "Status",
                caption: "Status",
            }
          ]
        }).dxDataGrid("instance");
  }

  function openInterviewPopup(){
    bindDevExtremeControlsForInterview();
  //  bindConsolidatedScoreGrid();
    $('#InterviewModal').appendTo("body").modal("show");
  }

  function getCandidateDetailsForInterview(interviewStageId){
        $("#interviewStageId").html(interviewStageId);
        interviewStageIdForSave = interviewStageId
        var filterData = JSON.stringify({
            IsActive: true,
            InterviewStageId : interviewStageId
        });
        callGetListSync("GetInterviewDetailsForInterviewersById", filterData, function (result) {
            mapInterviewDetailsForInterview(result[0])
            var filterData1 = JSON.stringify({
                Token : localStorage.getItem("securityToken"),
                IsActive: true,
                CandidateProfilebyId : result[0].CandidateId
            });
            candidateId= result[0].CandidateId;

            var filterData2 = JSON.stringify({
                IsActive: true,
                ResourceRequirementId : result[0].RRMId
            });
            var filterData3 = JSON.stringify({
                "CandidateId":result[0].CandidateId,
                "IsActive": true
            });
            var filterData4 = JSON.stringify({
                "CandidateId":result[0].CandidateId,
                
            });
            callGetListSync("GetRRMById", filterData2, function (RRMData) {
                mapRRMDetailsForInterview(RRMData[0])
            })
            callGetListSync("GetCandidateProfilebyId", filterData1, function (data) {
                mapCandidateDetailsForInterview(data[0]);
                mapCandidateDetailsTabForInterview(data[0]);
            });
            callGetListSync("GetInterviewHistoryDetails", filterData3, function (data) {
                mapPreviousInterviewDetails(data)
            }); 
            callGetListSync("GetHrCommentsByCandidateId", filterData4, function (data) {
                mapHRCommentsDetails(data)
            }); 
            callGetListSync("GetCandidateSkillsbyCandidateId", filterData3, function (data) {
                getCandidateDetailsSkillsInterview(data)
            });
        })
  }

  function mapInterviewDetailsForInterview(data){
    if(data.CandidateName != "" && data.CandidateName != null){
        $("#lbl-interviewcandidateName").html(data.CandidateName)
    }    
    if(data.RRMNo != null && data.RRMNo != ""){
        $("#lbl_interviewRRMNumber").html(data.RRMNo);
    }
    else{
        $("#lbl_interviewRRMNumber").html("Not Available");
    }
    if(data.RequirementName != null && data.RequirementName != ""){
        $("#lbl_interviewRRMName").html(data.RequirementName);
    }
    else{
        $("#lbl_interviewRRMName").html("Not Available");
    }
    if(data.TypeName != null && data.TypeName != ""){
        $("#lbl_interviewType").html(data.TypeName);
    }
    else{
        $("#lbl_interviewType").html("Not Available");
    }
    if(data.ModeName != null && data.ModeName != ""){
        $("#lbl_interviewMode").html(data.ModeName);
    }
    else{
        $("#lbl_interviewMode").html("Not Available");
    }
    if(data.InterviewDate != null && data.InterviewDate != ""){
        $("#lbl_interviewDate").html(data.InterviewDate);
    }
    else{
        $("#lbl_interviewDate").html("Not Available");
    }
    if(data.InterviewTime != null && data.InterviewTime != ""){
        $("#lbl_interviewTime").html(data.InterviewTime);
    }
    else{
        $("#lbl_interviewTime").html("Not Available");
    }
    if(data.InterviewDetails != null && data.InterviewDetails != ""){
        $("#lbl_interviewDetails").html(data.InterviewDetails);
    }
    else{
        $("#lbl_interviewDetails").html("Not Available");
    }
    
    $("#rrm_interview-worked-hours-counter").dxNumberBox("instance").option("readOnly",false);
    $("#rrm_interview-worked-minutes-counter").dxNumberBox("instance").option("readOnly",false);
  }

  function mapCandidateDetailsForInterview(data){
    if(data.Mobile != null && data.Mobile != ""){
        $("#lbl_interviewMobileNumber").html(data.Mobile);
    }
    else{
        $("#lbl_interviewMobileNumber").html("Not Available");
    }
    if(data.EmailId != null && data.EmailId != ""){
        $("#lbl_interviewMailId").html(data.EmailId)
    }
    else{
        $("#lbl_interviewMailId").html("Not Available")
    }
    if(data.Skype != null && data.Skype != ""){
        $("#lbl_interviewSkypeId").html("<a href='skype:" + data.Skype + "?chat'>"+data.Skype+"</a>")
    }
    else{
        $("#lbl_interviewSkypeId").html("Not Available")
    }
    var socialLinksHtml = "";
    if(data.GitHub != null && data.GitHub != ""){
        socialLinksHtml +="<a href='" + data.GitHub + "' target='_blank'><i class='fab fa-github' aria-hidden='true'></i></a> &nbsp;"
    }
    if(data.LinkedIn != null && data.LinkedIn != ""){
        socialLinksHtml +="<a href='" + data.LinkedIn + "' target='_blank'><i class='fab fa-linkedin'></i></a> &nbsp;"
    }
    if(data.Url != null && data.Url != ""){
        socialLinksHtml +="<a href='" + data.Url + "' target='_blank'><i class='fa fa-link'></i></a>"
    } 
    if(socialLinksHtml != ""){
        $("#lbl_interviewCandidateURL").html(socialLinksHtml);
    }
    else{
        $("#lbl_interviewCandidateURL").html("Not Available")
    }
    var toolTip = '';
    if(data.DocumentExtension == 'pdf'){
        toolTip = 'Click here to view the resume';
    }
    else 
    {
        toolTip = 'Click here to download the resume';
    }
    
    if(data.DocumentId != null && data.DocumentId != ""){
        $("#lbl_interviewCandidateResume").html("<button class='btn btn-xs btn-primary' onclick=downloadProfileResumeForInterview('"+data.DocumentId+"')><i title='"+toolTip+"' class='fa fa-download'></i></button>")
    }
  }
  
  function downloadProfileResumeForInterview(FileId) {
    callGetListAsync('GetDownloadProfileResume', '{"FileId":"' + FileId + '","Token":"' + localStorage.getItem("securityToken") + '"}', function (getProfileData) {
        var fileName = getProfileData.DocumentName + '.' + getProfileData.Extension;
        var extension = getProfileData.Extension;
        var base64Data = btoa(getProfileData.Content);

        var content = getProfileData.Content;
        var html = '';
        setTimeout(() => {
            if (extension == 'pdf') {
                swal({
                    html: "<iframe width='100%' height='1000px' src='data:application/pdf;base64, " + encodeURI(content) + "'></iframe>",
                    showCancelButton: false,
                    showConfirmButton: false,
                    width: '1100px',
                    height: 'auto',
                    title: " ",
                    customClass: 'swal-popup',
                    text: "Test message?",
                    icon: "info", /* type: "info", */
                    buttons: [
                        "No", /* showCancelButton: true, cancelButtonText: "No", */
                        "Yes" /* confirmButtonText: "Yes", */
                    ],
                    focusConfirm: false,
                    showCloseButton: true
                });             
                                  
            } else
                window.open(SynergyAPIURL + "DownloadFile?query=GetDownloadProfileResume&filters={'FileId':'" + FileId + "'}&Token=" + localStorage.getItem("securityToken"), '_blank');
        }, 1000);
    });
}


convertBlobToBase64 = (r) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(new Blob([r]));
});


  function bindDevExtremeControlsForInterview(){
    $("#lbl-InterviewRescheduleDate").hide();
    $("#lbl-InterviewRescheduleTime").hide();
    var now = new Date();
    $("#sddb-dateForInterview").dxDateBox({
        type: "date",
        value: now,
        visible: false,
        readOnly:false
    });

    $("#sddb-timeForInterview").dxDateBox({
        type: "time",
        value: now,
        visible: false,
        readOnly:false
    });

    $("#sdtxt-CommentsForInterview").dxHtmlEditor({
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
        mentions: [{
            dataSource: rrmData,
            searchExpr: "RRMName",
            displayExpr: "RRMName",
            valueExpr: "RRMId",
            marker:"#"
        }]
    });

    $("#sdtxt-CommentsForInterviewRRMRelated").dxHtmlEditor({
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
        mentions: [{
            dataSource: rrmData,
            searchExpr: "RRMName",
            displayExpr: "RRMName",
            valueExpr: "RRMId",
            marker:"#"
        }]
    });

    $("#sdsl-ratingForInterview").dxSlider({
        min: 0, max: 10,
        value: 0, step: 0.1,
        tooltip: {
            enabled: true,
            format: {
                type: "fixedPoint",
                precision: 1
            }
        },
        onValueChanged: function(data){
            if(data.value >=4.0 && data.value < 8.0){
                $("#InterviewModal #sdsl-ratingForInterview .dx-trackbar-range").css("background", "orange");
                $("#InterviewModal #sdsl-ratingForInterview .dx-trackbar-range").css("border-color", "orange");
                $("#txt_overallMark").html("("+data.value.toFixed(1)+")");
            }
            if(data.value >8.0){
                $("#InterviewModal #sdsl-ratingForInterview .dx-trackbar-range").css("background", "green");
                $("#InterviewModal #sdsl-ratingForInterview .dx-trackbar-range").css("border-color", "green");
                $("#txt_overallMark").html("("+data.value.toFixed(1)+")");
            }
            if(data.value <4.0){
                $("#InterviewModal #sdsl-ratingForInterview .dx-trackbar-range").css("background", "red");
                $("#InterviewModal #sdsl-ratingForInterview .dx-trackbar-range").css("border-color", "red");
                $("#txt_overallMark").html("("+data.value.toFixed(1)+")");
            }
        },
        disabled:false
    });

    $("#sdsl-ratingForInterviewRelatedRRM").dxSlider({
        min: 0, max: 10,
        value: 0, step: 0.1,
        tooltip: {
            enabled: true,
            format: {
                type: "fixedPoint",
                precision: 1
            }
        },
        onValueChanged: function(data){
            if(data.value >=4.0 && data.value < 8.0){
                $("#InterviewModal #sdsl-ratingForInterviewRelatedRRM .dx-trackbar-range").css("background", "orange");
                $("#InterviewModal #sdsl-ratingForInterviewRelatedRRM .dx-trackbar-range").css("border-color", "orange");
                $("#txt_overallMarkRelatedRRM").html("("+data.value.toFixed(1)+")");
            }
            if(data.value >8.0){
                $("#InterviewModal #sdsl-ratingForInterviewRelatedRRM .dx-trackbar-range").css("background", "green");
                $("#InterviewModal #sdsl-ratingForInterviewRelatedRRM .dx-trackbar-range").css("border-color", "green");
                $("#txt_overallMarkRelatedRRM").html("("+data.value.toFixed(1)+")");
            }
            if(data.value <4.0){
                $("#InterviewModal #sdsl-ratingForInterviewRelatedRRM .dx-trackbar-range").css("background", "red");
                $("#InterviewModal #sdsl-ratingForInterviewRelatedRRM .dx-trackbar-range").css("border-color", "red");
                $("#txt_overallMarkRelatedRRM").html("("+data.value.toFixed(1)+")");
            }
        },
        disabled:false
    });

    $("#sdcmb-statusForInterview").dxSelectBox({
        dataSource: new DevExpress.data.ArrayStore({
            data: interviewStatusForInterviews,
            key: "Id"
        }),
        displayExpr: "StatusName",
        valueExpr: "Id",
        placeholder:"Select interview status",
        value:"",
        searchEnabled: true,
        showClearButton: true,
        readOnly:false,
        onValueChanged:function(data){
            if(data.value == "D09C3FAA-1EE4-49F2-9CAD-25982A6034E4"){
                $("#lbl-InterviewRescheduleDate").show();
                $("#lbl-InterviewRescheduleTime").show();
                $("#sddb-dateForInterview").dxDateBox('instance').option('visible',true);
                $("#sddb-timeForInterview").dxDateBox('instance').option('visible',true);
                $("#sdsl-ratingForInterview").dxSlider('instance').option('value',0);
                $("#sdsl-ratingForInterview").dxSlider('instance').option('disabled',true);
                $("#sdchk-oneMoreRoundForInterview").dxCheckBox('instance').option('value',false);
                $("#sdchk-oneMoreRoundForInterview").dxCheckBox('instance').option('readOnly',true);
            }
            else if(data.value == "D44D0312-0396-4031-80C8-D5D9B36924D0"){
                $("#lbl-InterviewRescheduleDate").hide();
                $("#lbl-InterviewRescheduleTime").hide();
                $("#sddb-dateForInterview").dxDateBox('instance').option('visible',false);
                $("#sddb-timeForInterview").dxDateBox('instance').option('visible',false);
                $("#sdsl-ratingForInterview").dxSlider('instance').option('value',0);
                $("#sdsl-ratingForInterview").dxSlider('instance').option('disabled',true);
                $("#sdchk-oneMoreRoundForInterview").dxCheckBox('instance').option('value',false);
                $("#sdchk-oneMoreRoundForInterview").dxCheckBox('instance').option('readOnly',true);
            }
            else{
                $("#lbl-InterviewRescheduleDate").hide();
                $("#lbl-InterviewRescheduleTime").hide();
                $("#sddb-dateForInterview").dxDateBox('instance').option('visible',false);
                $("#sddb-timeForInterview").dxDateBox('instance').option('visible',false);
                $("#sdsl-ratingForInterview").dxSlider('instance').option('disabled',false);
                $("#sdchk-oneMoreRoundForInterview").dxCheckBox('instance').option('readOnly',false);
            }
            $(".error_message").html("");
        }
    });

    $("#sdtxt-TechnologyForInterview").dxTextBox({
        disabled:true,
        placeholder:"Enter technology",
    });

      $("#rrm_interview-worked-hours-counter").dxNumberBox({
          value:0,
          showSpinButtons: true,
          showClearButton: false,
          min: 0,
          max: 23,
      });

      $("#rrm_interview-worked-minutes-counter").dxNumberBox({
          value:undefined,
          showSpinButtons: true,
          showClearButton: false,
          min: 0,
          max: 59,
      });

    $("#sdchk-oneMoreRoundForInterview").dxCheckBox({
        value: false,
        text: "One more round required",
        rtlEnabled: false,
        onValueChanged: function(data) {
            if(data.value == true){
                $("#sdtxt-TechnologyForInterview").dxTextBox('instance').option('disabled',false);
            }
            else{
                $("#sdtxt-TechnologyForInterview").dxTextBox('instance').option('value','');
                $("#sdtxt-TechnologyForInterview").dxTextBox('instance').option('disabled',true);
            }
        }
    });

    $("#sdf-audioFileForInterview").dxFileUploader({
        selectButtonText: "Upload Audio File",
        labelText: "",
        accept: "audio/*",
        uploadMode: "useForm"
    });


  }

  function closeInterviewModal(){
    $("#interviewStageId").html("");
    $(".error_message").html("");
    $("#sdcmb-statusForInterview").dxSelectBox('instance').option('value','');
    $("#sdchk-oneMoreRoundForInterview").dxCheckBox('instance').option('value',false);
    $("#sdtxt-TechnologyForInterview").dxTextBox('instance').option('value','');
    $("#InterviewModal").modal("hide");
  }

  function saveInterviewStatusAlert(){
    swal({
        title: "Are you sure?",
        text: "Once saved, it cannot be edited!!",
        icon: "warning",
        buttons: true,
      })
    .then((willDownload) => {
        if (willDownload) {
            saveInterviewStatus();
        }
    });
  }

  function saveInterviewStatus(){
    var readyForSave = true
    var statusId = $("#sdcmb-statusForInterview").dxSelectBox('instance').option('value');
    var rescheduleDate = null;
    var rescheduleTime = null;
    $('#rrm_interview-worked-hoursError').html("");
    $('#rrm_interview-worked-minutesError').html("");
    $("#overallMarkError").html("");
    if(statusId == "" || statusId == null || statusId == undefined){
        $("#statusForInterviewError").html("Select Status")
        readyForSave = false;
    }
    else{
        $("#statusForInterviewError").html("")
        readyForSave = true;
    }
    var IsOneMoreRoundRequired = $("#sdchk-oneMoreRoundForInterview").dxCheckBox('instance').option('value');
    var technology = $("#sdtxt-TechnologyForInterview").dxTextBox('instance').option('value');
    if(IsOneMoreRoundRequired == true && (technology == "" || technology == null || technology == undefined)){
        $("#technologyForInterviewError").html("Enter technology");
        readyForSave = false;
    }
    else{
        $("#technologyForInterviewError").html("");
        readyForSave = true;
    }
    if(statusId == "D09C3FAA-1EE4-49F2-9CAD-25982A6034E4"){
        rescheduleDate = $("#sddb-dateForInterview").dxDateBox('instance').option('value');
        rescheduleTime = $("#sddb-timeForInterview").dxDateBox('instance').option('value');
    }
    var overAllMark = $("#sdsl-ratingForInterview").dxSlider('instance').option('value');
    // if(statusId != "D09C3FAA-1EE4-49F2-9CAD-25982A6034E4"  &&(overAllMark == 0 || overAllMark == 0.0)){
    //     $("#overallMarkError").html("Please change the score");
    //     readyForSave = false;
    //     return;
    // }
    // else{
    //     $("#overallMarkError").html("");
    //     readyForSave = true;
    // }

    if(statusId == "D44D0312-0396-4031-80C8-D5D9B36924D0" || statusId == "D09C3FAA-1EE4-49F2-9CAD-25982A6034E4" )
    {
        $("#overallMarkError").html("");
        readyForSave = true;
    }
    else if(overAllMark == 0 || overAllMark == 0.0){
            $("#overallMarkError").html("Please change the score");
            readyForSave = false;
            return;
    }
  
    var hh = $("#rrm_interview-worked-hours-counter").dxNumberBox("instance").option("value");
    var mm = $("#rrm_interview-worked-minutes-counter").dxNumberBox("instance").option("value");

    if (hh == null || hh === '' || hh < 0 || hh > 23) {
        $('#rrm_interview-worked-hoursError').html("Required Field");
        readyForSave = false;
        return;
    }
    else{
        $('#rrm_interview-worked-hoursError').html("");
        readyForSave = true;
    }

    if (mm == null ||mm === '' || mm < 0 || mm > 59) {
        $('#rrm_interview-worked-minutesError').html("Required Field");
        readyForSave = false;
        return;
    }
    else{
        $('#rrm_interview-worked-minutesError').html("");
        readyForSave = true;
    }

    hh = Number(hh);
    mm = Number(mm);
    if (hh < 10) hh = '0' + hh;
    if (mm < 10) mm = '0' + mm;
    var HoursSpent = hh + ':' + mm;

    var comments = $("#sdtxt-CommentsForInterview").dxHtmlEditor('instance').option('value');
    if(comments == "" || comments == null || comments == undefined){
        $("#interviewCommentsError").html("Enter interview comments");
        readyForSave = false;
    }
    else{
        $("#interviewCommentsError").html("");
        readyForSave = true
    }
    if(readyForSave == true){
        var data = {
            "Method": "PostInterviewSummary",
            "Data": {
                "InterviewStageId": interviewStageIdForSave,
                "InterviewStatus": statusId,
                "IsOneMoreRoundNeeded": IsOneMoreRoundRequired,
                "Technology": technology,
                "RescheduleDate": rescheduleDate,
                "RescheduleTime": rescheduleTime,
                "Comments": comments,
                "HoursSpent":HoursSpent,
                "OverallMarks": overAllMark,
                "IsActive":true
            }
        }
        PostDataCallAsync(data, function (result) {
            if(result.IsSuccess == true){
                swal({
                    title: "Success!",
                    text: result.Message,
                    icon: "success",
                    button: "ok!",
                }) 
            }
            else{
                swal({
                    title: "OOPS!",
                    text: result.Message,
                    icon: "error",
                    button: "ok!",
                }) 
            }
                           
        });
        closeInterviewModal();
        getInterviewsForInterviewers();
    }
 }

$('ul#interviewsTab li').click(function(e)
{            
    var tab_details = $(this).attr("id");
    var currentTab = $("#"+tab_details + " > a ").attr("aria-controls");            
    $('ul#interviewsTab li').removeClass("active");
    $(this).addClass("active");
    $("#interviewSummaryDetails .tab-pane").removeClass("active");
    $("#" + currentTab).addClass("active");
    if(currentTab == 'rrm_InterviewSummary'){
        $("#btnSaveInterviewSummary").show();
    }
    else{
        $("#btnSaveInterviewSummary").hide();
    }
    new SimpleBar(document.getElementById('InterviewModalBody'));
});

function rrmNoOnclickInterview(){
    $("#rrm_DetailsForInterviewTab").click()
}
function mapRRMDetailsForInterview(data){
    if(data.RRMNo != null && data.RRMNo != ""){
        $("#lbl_interviewRRMNumberTab").html(data.RRMNo);
    }
    else{
        $("#lbl_interviewRRMNumberTab").html("Not Available");
    }
    if(data.RequirementName != null && data.RequirementName != ""){
        $("#lbl_interviewRRMNameTab").html(data.RequirementName)
    }
    else{
        $("#lbl_interviewRRMNameTab").html("Not Available")
    }
    if(data.RequiredFor != null && data.RequiredFor != ""){
        $("#lbl_interviewRRMRequiredFor").html(data.RequiredFor)
    }
    else{
        $("#lbl_interviewRRMRequiredFor").html("Not Available")
    }
    if(data.Department != null && data.Department != ""){
        $("#lbl_interviewRRMDepartment").html(data.Department)
    }
    else{
        $("#lbl_interviewRRMDepartment").html("Not Available")
    }
    if(data.Designation != null && data.Designation != ""){
        $("#lbl_interviewRRMDesignation").html(data.Designation)
    }
    else{
        $("#lbl_interviewRRMDesignation").html("Not Available")
    }
    if(data.ExperiencerequiredInYrs != null && data.ExperiencerequiredInYrs != ""){
        $("#lbl_interviewRRMExperience").html(data.ExperiencerequiredInYrs)
    }
    else{
        $("#lbl_interviewRRMExperience").html("Not Available")
    }
    if(data['PlanA-SkillPlanInfo'] != null && data['PlanA-SkillPlanInfo'] != ""){
        $("#lbl_interviewRRMPlanA").html(data['PlanA-SkillPlanInfo'])
    }
    else{
        $("#lbl_interviewRRMPlanA").html("Not Available")
    }
    if(data['PlanB-SkillPlanInfo'] != null && data['PlanB-SkillPlanInfo'] != ""){
        $("#lbl_interviewRRMPlanB").html(data['PlanB-SkillPlanInfo'])
    }
    else{
        $("#lbl_interviewRRMPlanB").html("Not Available")
    }
    if(data['Owner'] != null && data['Owner'] != ""){
        $("#lbl_interviewRRMRecruiter").html(data['Owner'])
    }
    else{
        $("#lbl_interviewRRMRecruiter").html("Not Available")
    }
    getRRMInterviewDataGrid(data.RRMId);
    rrmIds = data.RRMId;
}

function getRRMInterviewDataGrid(RRMId){
    var filterData = JSON.stringify({
        "ResourceRequirementId": RRMId,
        "IsActive": true,
    });        

    callGetListAsync('GetResourceRequrirementSkill', filterData, function (e) {
        var GetSkillList = e;
        $("#sdgd_rrmInterviewSkillsGrid").dxDataGrid({
            dataSource: GetSkillList,
            showBorders: true,
            paging: {
                enabled: false
            },
            columns: [
                {
                    dataField:"SkillFamily",
                    caption:"Skill Family"
                },
                {
                    dataField:"Skill",
                    caption:"Skill"
                },
                {
                    dataField:"SkillVersion",
                    caption:"Skill Version"
                }
            ],
        });
    })
    loadSkillsInterview();
}

function loadSkillsInterview(){
    var filter_val = JSON.stringify({
        IsActive: 'True'
    });

    var getTechnologiesForRRM = callgetlist("GetTechnologiesForRRM", filter_val);
   
    getTechnologiesForRRM.forEach(function (item) {
        $('#rrm_profileEntry_skills_interview').append($("<option></option>").attr({ "skillId":item.SkillId, "versionId":item.SkillVersionId,"familyId":item.FamilyID,"value":item.SkillId + "-" + item.SkillVersionId } ).text(item.SkillVersionName)).select2(
                {
                    placeholder: "Search Skills"
                }
            );
    });
     
    $('#rrm_profileEntry_skills_interview').val('C64FD613-89BF-42D1-B18F-F14DE018865C-08E4C75A-DC66-4A58-B7EC-969F9368CCBE'); // Select the option with a value of 'US'
    $('#rrm_profileEntry_skills_interview').trigger('change');

    var skillID;
    var familyId; 
    $("#rrm_profileEntry_skills_interview option:selected").each(function (i, e) {
        skillID = e.attributes["skillId"].value;
        familyId = e.attributes["familyId"].value;
    });
    loadRelatedRRM(skillID,familyId);
}

$('#rrm_profileEntry_skills_interview').on('select2:select', function(e) {
    var skillId = e.params.data.element.attributes["skillId"].value;
    var familyId = e.params.data.element.attributes["familyId"].value;

    if(skillId !="" && familyId!=""){
        loadRelatedRRM(skillId,familyId);
    }
  });

function getInterviewSummaryDetails(interviewstageid){
    var filterData = JSON.stringify({
        "InterviewStageId": interviewstageid,
        "IsActive": true,
    });        

    callGetListAsync('GetInterviewStageDetailsById', filterData, function (e) {
        var data = e[0];
        $("#sdcmb-statusForInterview").dxSelectBox('instance').option("readOnly",true);
        $("#sdcmb-statusForInterview").dxSelectBox('instance').option("value",data.StatusId);
        if(data.RescheduleTime != null && data.RescheduleDate != null){
            $("#sddb-dateForInterview").dxDateBox('instance').option("value",new Date(data.RescheduleDate));
            $("#sddb-dateForInterview").dxDateBox('instance').option("readOnly",true);
            $("#sddb-timeForInterview").dxDateBox('instance').option("value",new Date(data.RescheduleDate.split('T')[0] + " " + data.RescheduleTime));
            $("#sddb-timeForInterview").dxDateBox('instance').option("readOnly",true);
        }
        
        if(data.AnotherRoundRequired == true){
            $("#sdtxt-TechnologyForInterview").dxTextBox('instance').option("value",data.Technology);
            $("#sdtxt-TechnologyForInterview").dxTextBox('instance').option("readOnly",true);
            $("#sdchk-oneMoreRoundForInterview").dxCheckBox('instance').option("readOnly",true);
            $("#sdchk-oneMoreRoundForInterview").dxCheckBox('instance').option("value",true);
        }        

        $("#rrm_interview-worked-hours-counter").dxNumberBox("instance").option("value",data.HoursSpent);
        $("#rrm_interview-worked-minutes-counter").dxNumberBox("instance").option("value",data.MinutesSpent);

        $("#rrm_interview-worked-hours-counter").dxNumberBox("instance").option("readOnly",true);
        $("#rrm_interview-worked-minutes-counter").dxNumberBox("instance").option("readOnly",true);

        $("#sdtxt-CommentsForInterview").dxHtmlEditor('instance').option("readOnly",true);
        $("#sdtxt-CommentsForInterview").dxHtmlEditor('instance').option("value",data.Comments);
    
        $("#sdsl-ratingForInterview").dxSlider('instance').option("value",data.OverallMark);    
        $("#sdsl-ratingForInterview").dxSlider('instance').option('disabled',true);
        $("#btnSaveInterviewSummary").hide() 
    });
}

function bindConsolidatedScoreGrid(){
    var consolidatedData = [{"Description":"OOPS Concept"},{"Description":"HTML"}]
    $("#sdgd-ConsolidatedScores").dxDataGrid({
        dataSource: consolidatedData,
        showBorders: true,
        sorting: {
            mode: "none"
        },
        paging: {
            pageSize: 10
        },
        columns: [
            {
                dataField: "Description"
            },
            {
                caption: "Score",
                minWidth: 320,
                cellTemplate: function(container, options) {
                    // var id = "sdgd-ConsolidatedScores-"+options.data.Description
                    $("<div/>").dxSlider({
                        min: 0, max: 10,
                        value: 0, step: 0.1,
                        tooltip: {
                            enabled: true,
                            format: {
                                type: "fixedPoint",
                                precision: 1
                            },
                            position:"left"
                        },
                        // onValueChanged: function(data){
                        //     if(data.value >=4.0 && data.value < 8.0){
                        //         $("#InterviewModal #"+id+" .dx-trackbar-range").css("background", "orange");
                        //         $("#InterviewModal #"+id+" .dx-trackbar-range").css("border-color", "orange");                                
                        //     }
                        //     if(data.value >8.0){
                        //         $("#InterviewModal #"+id+" .dx-trackbar-range").css("background", "green");
                        //         $("#InterviewModal #"+id+" .dx-trackbar-range").css("border-color", "green");
                        //     }
                        //     if(data.value <4.0){
                        //         $("#InterviewModal #"+id+" .dx-trackbar-range").css("background", "red");
                        //         $("#InterviewModal #"+id+" .dx-trackbar-range").css("border-color", "red");
                        //     }
                        // }
                    }).appendTo(container);
                }
            }
        ]
    });
}

function mapPreviousInterviewDetails(data){

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
                    html += "<div ><strong>"+ id +"</strong></div> <br>"
                }
            }
           
            items.forEach(function (key, item) {
                
                if (key.SortOrder == "2" || key.SortOrder == "3" || key.SortOrder == "6") {
                    if (key.SortOrder == "2") {
                        html += "<div class='panel panel-success'>"
                    }
                    if (key.SortOrder == "3") {
                        html += "<div class='panel panel-danger'>"
                    }
                    if (key.SortOrder == "6") {
                        html += "<div class='panel panel-warning'>"
                    }
                    html += "<div class='panel-heading' data-toggle='collapse' data-parent='#rrm_PreviousInterviewDetailsAccordian' href='#collapse" + key.Id + "' onclick=newfunction('sdgd-InterviewHistory" + key.Id + "') style='cursor:pointer'>"
                    html += "<h3 class='panel-title'>"
                    html += "<a data-toggle='collapse' data-parent='#rrm_PreviousInterviewDetailsAccordian' href='#collapse" + key.Id + "'>"
                    if (key.SortOrder == "2") {
                        html += key.TypeName + "-" + key.RowNum + "</a> &nbsp;<label class='label label-success m-l-sm'>Passed</label><span style='float:right'>" + key.InterviewerName + "</span>"
                    }
                    if (key.SortOrder == "3") {
                        html += key.TypeName + "-" + key.RowNum + "</a> &nbsp;<label class='label label-danger m-l-sm'>Failed</label><span style='float:right'>" + key.InterviewerName + "</span>"
                    }
                    if (key.SortOrder == "6") {
                        html += key.TypeName + "-" + key.RowNum + "</a> &nbsp;<label class='label label-warning m-l-sm'>On-Hold</label><span style='float:right'>" + key.InterviewerName + "</span>"
                    }
                    html += "</h3>"
                    html += "</div>"
                    html += "<div id='collapse" + key.Id + "' class='panel-collapse collapse'>"
                    html += "<div class='panel-body' style='overflow-y:scroll;height:300px;'>"
                    html += "<div id='sdgd-InterviewHistory" + key.Id + "'></div>"
                    html += "<br><div><h2>Remarks:</h2></div>"
                    html += "<div class='row'><div class='col-md-12' id='rrm-remarks'>" + key.Comments + "</div></div>"
                    html += "</div>"
                    html += "</div>"
                    html += "</div> <br>"
                    interviewCompletedState = true;

                }
            })
            html += "</div>"
        });
    }

    if(interviewCompletedState == true){
        $("#rrm_PreviousInterviewDetailsAccordian").html(html);
        $.each(result,function(id,items){
            
            items.forEach(function (key, item) {
               
                var interviewStages = [];
                if(item.SortOrder != "1"){
                    interviewStages.push(key)
                    bindDataGridsForInterviewHistory(interviewStages,"#sdgd-InterviewHistory"+key.Id)
                }
            });
        })
    }
    else{
        $("#rrm_PreviousInterviewDetailsAccordian").html("<h3>No Previous Interview available for this candidate</h3>");
    }  

}
//mapHRCommentsDetails function
function mapHRCommentsDetails(data){
    var result = data.reduce(function (r, a) {
        r[a.RRMNo] = r[a.RRMNo] || [];
        r[a.RRMNo].push(a);
        return r;
    }, Object.create(null));
    var html = ""
    
    if(data != undefined && data.length > 0){
        var i = 1;
        $.each(result,function(id,items){

                    html += "<div>"
                    html += "<div ><strong>"+ id +"</strong></div> <br>"
            items.forEach(function (key, item) {

                    html += "<div class='panel panel-default'>"
                    html += "<div class='panel-heading' data-toggle='collapse' data-parent='#rrm_HRCommentsDetailsAccordian' href='#collapse" + i + "' onclick=newfunctionForHrComments() style='cursor:pointer'>"
                    html += "<h3 class='panel-title'>"
                    html += "<a data-toggle='collapse' data-parent='#rrm_HRCommentsDetailsAccordian' href='#collapse" + i + "'>"               
                        // html += key.TypeName + "-" + key.RowNum + "</a> &nbsp;<label class='label label-success m-l-sm'>Passed</label><span style='float:right'>" + key.RecruiterName + "</span>"
                    html += key.TypeName +"</a> <span style='float:right'>" + key.RecruiterName + "</span>"
                    html += "</h3>"
                    html += "</div>"
                    html += "<div id='collapse" + i + "' class='panel-collapse collapse'>"
                    html += "<div class='panel-body' style='overflow-y:scroll;height:300px;'>"
                    html += "<div class='row'><div class='col-md-12 ' id='rrm-remarks'>" + key.HrComments + "</div></div>"
                    html += "</div>"
                    html += "</div>"
                    html += "</div> <br>" 
                    i=i+1;
                  
            })
            html += "</div>"
        });
    }

        $("#rrm_HRCommentsDetailsAccordian").html(html);

}
//function for scrollbar
function newfunctionForHrComments(){
    setTimeout(function(){
        new SimpleBar(document.getElementById('InterviewModalBody'));
    }, 1000);    
}

function bindDataGridsForInterviewHistory(data,Id){
    interviewHistoryGrid(Id,data);
}

function interviewHistoryGrid(id,data){   
    $(id).dxDataGrid({
        dataSource:data,
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
              .append("<img id='imgInterviewHistory-"+options.data.Id+"' src='"+options.data.ProfilePicture+"' class='img-circle interviewer-image' width='25px' height='25px'></img><div id='imageTooltipInterviewHistory"+options.data.Id+"'></div>")
              .appendTo(container);
              prepareImageTooltipForInterviewHistory(options.data.Id,options.data.ProfilePicture,options.data.InterviewerName)
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
            allowEditing: false,
            dataType :"date",
            allowFiltering: true,
            format : "dd-MMM-yyyy",
            cellTemplate: function(container,options){
                var rrmDate = convertDateFormatForRRMGrid(options.value)
                $("<div>&nbsp")
                .append(rrmDate)
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

function prepareImageTooltipForInterviewHistory(Id,ProfilePicture,InterviewerName){
    $("#imageTooltipInterviewHistory"+Id).dxTooltip({
      target: "#imgInterviewHistory-"+Id,
      showEvent: "mouseenter",
      hideEvent: "mouseleave",
      closeOnOutsideClick: false,
      position: "right",
      contentTemplate: function(data) {
          data.html("<img width='150' height='150' src='"+ProfilePicture+"'><br/><b>"+InterviewerName+"</b>");
      }
  });
}

function newfunction(id){
    $("#"+id).dxDataGrid("instance").refresh();
    setTimeout(function(){
        new SimpleBar(document.getElementById('InterviewModalBody'));
    }, 1000);    
}

$(document).on("click", ".rrmRemarksInterview", function (e) {
   var comments =  $(this).attr("data-comments");
   if(comments =="" && comments == null){
       comments = "Comments Not Avalilable";
   }
   else{
    $("#rrm-remarks").html("");
    $("#rrm-remarks").html(comments);
   }
});

  function mapCandidateDetailsTabForInterview(data){
    if(data.FirstName != null && data.FirstName != ""){
        $("#lbl_candidateDetailsNameInterview").html(data.FirstName);
        $("#candidateDetailsNameInterview").html(data.FirstName)
    }
    else{
        $("#lbl_candidateDetailsNameInterview").html("Not Available");
    }
    if(data.Mobile != null && data.Mobile != ""){
        $("#lbl_candiateDetailsMobileInterview").html(data.Mobile)
    }
    else{
        $("#lbl_candiateDetailsMobileInterview").html("Not Available")
    }
    if(data.EmailId != null && data.EmailId != ""){
        $("#lbl_candiateDetailsEmailInterview").html(data.EmailId)
    }
    else{
        $("#lbl_candiateDetailsEmailInterview").html("Not Available")
    }
    var socialLinksHtml = "";
    if(data.Skype != null && data.Skype != ""){
      socialLinksHtml +="<a href='skype:" + data.Skype + "?chat'><i class='fab fa-skype'></i></a> &nbsp;"
    }
    if(data.GitHub != null && data.GitHub != ""){
      socialLinksHtml +="<a href='" + data.GitHub + "' target='_blank'><i class='fab fa-github' aria-hidden='true'></i></a> &nbsp;"
    }
    if(data.LinkedIn != null && data.LinkedIn != ""){
      socialLinksHtml +="<a href='" + data.LinkedIn + "' target='_blank'><i class='fab fa-linkedin'></i></a> &nbsp;"
    }
    if(data.Url != null && data.Url != ""){
      socialLinksHtml +="<a href='" + data.Url + "' target='_blank'><i class='fa fa-link'></i></a>"
    }  
    if(socialLinksHtml == ""){
      socialLinksHtml = "Not Available"
    }  
    $("#lbl_candiateDetailsLinksInterview").html(socialLinksHtml)
    
    $("#star_candidateDetailsCommunicationRatingInterview").text(data.CommunicationRatingHR);
    if(data.Native != null && data.Native != ""){
        $("#lbl_candiateDetailsNativeInterview").html(data.Native)
    }
    else{
        $("#lbl_candiateDetailsNativeInterview").html("Not Available")
    }
    if(data.PreviousEmployersInfo != null && data.PreviousEmployersInfo != ""){
        $("#lbl_candidateDetailsWorkExperienceInterview").html(data.PreviousEmployersInfo)
    }
    else{
        $("#lbl_candidateDetailsWorkExperienceInterview").html("Not Available")
    }
  }
  
  function getCandidateDetailsSkillsInterview(data){      
        $("#sdgd_candidateDetailsSkillsInterview").dxDataGrid({
            dataSource: data,
            showBorders: true,
            paging: {
                enabled: false
            },
            wordWrapEnabled: true,
            columns: [
                {
                    dataField:"SkillGradeName",
                    caption:"Grade"
                },
                {
                    dataField:"SkillFamilieName",
                    caption:"Skill Family"
                },
                {
                    dataField:"skillName",
                    caption:"Skill Name"
                },
                {
                    dataField:"SkillVersion",
                    caption:"Skill Version"
                }
            ],
        });
  }

  function setBorderCell(worksheet, row, column, borderValue) {
    const excelCell = worksheet.getCell(row, column);
  
    if(!excelCell.border) {
      excelCell.border = {};
    }
  
    Object.assign(excelCell.border, borderValue);
  }
  //convert date format 
function convertInterviewDate(BenchStartDate){
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

$("#rrm_RelatedRRMInterviewTab").on("click", function(e) {
    debugger
   var scoreText = $("#txt_overallMark").text();
   var score = $("#sdsl-ratingForInterview").dxSlider("instance").option("value");
   var comment = $("#sdtxt-CommentsForInterview").dxHtmlEditor('instance').option('value');

   $("#sdtxt-CommentsForInterviewRRMRelated").dxHtmlEditor('instance').option("value",comment);
   $("#txt_overallMarkRelatedRRM").html(scoreText);
   $("#sdsl-ratingForInterviewRelatedRRM").dxSlider('instance').option("value",score);
   $("#rrm_InterviewRRMDetailsRelated").addClass("active");
   new SimpleBar(document.getElementById('InterviewModalBody'));
});

$(document).on("click", "#btnRecommendedRRMSave", function (e) {
    var comments = $("#sdtxt-CommentsForInterviewRRMRelated").dxHtmlEditor('instance').option('value');
    var saveComments  = false;
    var saveRRM = false;
    var score = $("#sdsl-ratingForInterviewRelatedRRM").dxSlider("instance").option("value");
    var datas = $("#sdgd_rrm_RelatedRRMGrid").dxDataGrid("instance").getSelectedRowsData();
   
    if(comments == "" || comments == null || comments == undefined){
        $("#interviewCommentsRRMRelatedError").html("Enter interview comments");
        saveComments = false;
    }
    else{
        $("#interviewCommentsRRMRelatedError").html("");
        saveComments = true;
    }

    if(datas != [] && datas != null && datas != ""){
        var selectedRRMId = datas[0].RRMId;
        saveRRM = true;
    }
    else{
        saveRRM = false;
        swal({
            title: "OOPS!",
            text: 'Please Select the RRM',
            icon: "warning",
            button: "ok!",
        }) 
    }

    if(saveRRM == true && saveComments == true){

        var data = {
            "Method": "PostRelatedRRMInterviewSchedules",
            "Data": {
                "Token": Token,
                "ResourceRequirementId": rrmIds,
                "SelectedRRMId": selectedRRMId,
                "CandidateId": candidateId,
                "Score": score,
                "Comments": comments,
                "IsActive":true
            }
        }
        PostDataCallAsync(data, function (result) {
            if(result.IsSuccess == true){
                swal({
                    title: "Success!",
                    text: result.Message,
                    icon: "success",
                    button: "ok!",
                }) 
            }
            else{
                swal({
                    title: "OOPS!",
                    text: result.Message,
                    icon: "error",
                    button: "ok!",
                }) 
            }
                           
        });

    }
});

function relatedRRMDataGridChange(e){
    var htmlData = e.data.RRMNo + ' - ( ' + e.data.RequirementName+' )';
    $("#txt_selectedRelatedRRM").html(htmlData);

    var filterData = JSON.stringify({
        IsActive: true,
        ResourceRequirementId : e.data.RRMId
    });
    
    callGetListSync("GetRRMById", filterData, function (RRMData) {
        mapRRMDetailsForRelatedInterview(RRMData[0],e.data.RRMId)
    })
}

function mapRRMDetailsForRelatedInterview(data,RRMId){
    
    if(data.RRMNo != null && data.RRMNo != "" && data.RRMNo !=undefined){
        $("#lbl_interviewRRMNumberTabRelatedRRM").html(data.RRMNo);
    }
    else{
        $("#lbl_interviewRRMNumberTabRelatedRRM").html("Not Available");
    }
    if(data.RequirementName != null && data.RequirementName != "" && data.RequirementName !=undefined){
        $("#lbl_interviewRRMNameTabRelatedRRM").html(data.RequirementName)
    }
    else{
        $("#lbl_interviewRRMNameTabRelatedRRM").html("Not Available")
    }
    if(data.RequiredFor != null && data.RequiredFor != "" && data.RequiredFor !=undefined){
        $("#lbl_interviewRRMRequiredForRelatedRRM").html(data.RequiredFor)
    }
    else{
        $("#lbl_interviewRRMRequiredForRelatedRRM").html("Not Available")
    }
    if(data.Department != null && data.Department != "" && data.Department !=undefined){
        $("#lbl_interviewRRMDepartmentRelatedRRM").html(data.Department)
    }
    else{
        $("#lbl_interviewRRMDepartmentRelatedRRM").html("Not Available")
    }
    if(data.Designation != null && data.Designation != "" && data.Designation !=undefined){
        $("#lbl_interviewRRMDesignationRelatedRRM").html(data.Designation)
    }
    else{
        $("#lbl_interviewRRMDesignationRelatedRRM").html("Not Available")
    }
    if(data.ExperiencerequiredInYrs != null && data.ExperiencerequiredInYrs != "" && data.ExperiencerequiredInYrs !=undefined){
        $("#lbl_interviewRRMExperienceRelatedRRM").html(data.ExperiencerequiredInYrs)
    }
    else{
        $("#lbl_interviewRRMExperienceRelatedRRM").html("Not Available")
    }
    if(data['PlanA-SkillPlanInfo'] != null && data['PlanA-SkillPlanInfo'] != "" && data['PlanA-SkillPlanInfo'] !=undefined){
        $("#lbl_interviewRRMPlanARelatedRRM").html(data['PlanA-SkillPlanInfo'])
    }
    else{
        $("#lbl_interviewRRMPlanARelatedRRM").html("Not Available")
    }
    if(data['PlanB-SkillPlanInfo'] != null && data['PlanB-SkillPlanInfo'] != "" && data['PlanB-SkillPlanInfo'] !=undefined){
        $("#lbl_interviewRRMPlanBRelatedRRM").html(data['PlanB-SkillPlanInfo'])
    }
    else{
        $("#lbl_interviewRRMPlanBRelatedRRM").html("Not Available")
    }
    if(data['Owner'] != null && data['Owner'] != "" && data['Owner'] !=undefined){
        $("#lbl_interviewRRMRecruiterRelatedRRM").html(data['Owner'])
    }
    else{
        $("#lbl_interviewRRMRecruiterRelatedRRM").html("Not Available")
    }
    var filterData = JSON.stringify({
        "ResourceRequirementId": RRMId,
        "IsActive": true,
    });        

    callGetListAsync('GetResourceRequrirementSkill', filterData, function (e) {
        var GetSkillList = e;
        $("#sdgd_rrmInterviewSkillsGridRelatedRRM").dxDataGrid({
            dataSource: GetSkillList,
            showBorders: true,
            paging: {
                enabled: false
            },
            columns: [
                {
                    dataField:"SkillFamily",
                    caption:"Skill Family"
                },
                {
                    dataField:"Skill",
                    caption:"Skill"
                },
                {
                    dataField:"SkillVersion",
                    caption:"Skill Version"
                }
            ],
        });
    })

}