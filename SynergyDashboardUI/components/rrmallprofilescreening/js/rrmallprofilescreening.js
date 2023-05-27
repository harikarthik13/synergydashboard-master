$(document).ready(function () {
    renderRRMAllProfileScreeningGrid();
    getRRMAllProfileScreeningData();
});

function getRRMAllProfileScreeningData() {
    var filterData = JSON.stringify({
    IsActive: true,
    });

    callGetListSync("GetAllCandidatesForProfileScreening", filterData, function (e) {
    $("#sdgd-rrmallProfileScreening").dxDataGrid({ dataSource: e });
    });
}

function renderRRMAllProfileScreeningGrid() {
    var profileScreeningdataGrid = $("#sdgd-rrmallProfileScreening").dxDataGrid({
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
        var worksheet = workbook.addWorksheet("RRM All Profile Screening");
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
                if (gridCell.rowType === "data") {
                    if (gridCell.column.caption === "#") {
                      excelCell.value = options.cell.row - 1;
                    }
                }
                if (gridCell.rowType === "header") {
                    excelCell.font = { color: { argb: 'FFFFFF' } };
                    excelCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "757171" }, bgColor: { argb: "757171" } };
                    excelCell.alignment = { horizontal: 'left' };
                }
                if(gridCell.rowType === "data") {
                    if(gridCell.column.caption === "Approval Status") {
                        excelCell.font = { color: { argb: 'FFFFFF' } };
                        if(gridCell.data.IsFlagged != true){
                            if(gridCell.data.DocumentId){
                                if (gridCell.data.SortOrder == 2) {
                                    if(gridCell.data.OnHoldByClient == true){
                                        excelCell.value = "On Hold By Client"
                                        excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "F0AD4E" } };
                                    }
                                    if(gridCell.data.OnHoldByOwner == true){
                                        excelCell.value = "On Hold By Owner"
                                        excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "F0AD4E" } };
                                    }
                                    if(gridCell.data.OnHoldByClient == false && gridCell.data.OnHoldByOwner == false){
                                        excelCell.value = "Yet To Approve"
                                        excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "F0AD4E" } };
                                    }                        
                                }
                                else if(gridCell.data.SortOrder == 5){
                                    excelCell.value = "Approved"
                                    excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "5CB85C" } };
                                }
                                else if(gridCell.data.SortOrder == 3){
                                    excelCell.value = "Rejected"
                                    excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "D9534F" } };
                                }
                                else{
                                    excelCell.value = "Approved"
                                    excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "5CB85C" } };
                                }
                            }  
                            else{
                                excelCell.value = "Resume Not Uploaded"
                                excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "F0AD4E" } };
                            }              
                        }
                        else{
                            excelCell.value = "Banned"
                            excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "777777" } };
                        }
                    }
                }
            },
            }).then(function(dataGridRange) {
                setBorders( worksheet, dataGridRange);
                return Promise.resolve();
              })
            .then(function () {
            workbook.xlsx.writeBuffer().then(function (buffer) {
                saveAs(
                new Blob([buffer], { type: "application/octet-stream" }),
                "RRMProfileScreening.xlsx"
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
                getRRMAllProfileScreeningData();
                dataGrid.refresh();
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
                    profileScreeningdataGrid.pageIndex() * profileScreeningdataGrid.pageSize() + options.rowIndex + 1
                );
            },
        },
        { caption: "RRM No", dataField: "RRMNo",cellTemplate: function (container, options) {  
            var domActions = "";
            domActions += "<a style='cursor:pointer' class='rrmdetailAllProfileScreening' data-rrmid =" + options.data.RRMId + ">"+options.data.RRMNo+"</a>";
            $("<div class='text-left'>").append($(domActions)).appendTo(container);
          }},
        { caption: "Candidate Name", dataField: "CandidateName",cellTemplate: function (container, options) {  
            var domActions = "";
            domActions += "<a style='cursor:pointer' class='candidateDetailsRRMAllProfileScreening' data-candidateid =" + options.data.CandidateId + ">"+options.data.CandidateName+"</a>";
            $("<div class='text-left'>").append($(domActions)).appendTo(container);
          }},
        { caption: "RRM Name", dataField: "RRMName",cellTemplate: function (container, options) {  
            var domActions = "";
            domActions += "<a style='cursor:pointer' class='rrmdetailAllProfileScreening' data-rrmid =" + options.data.RRMId + ">"+options.data.RRMName+"</a>";
            $("<div class='text-left'>").append($(domActions)).appendTo(container);
          }},
        { caption: "Recruiter", dataField: "Recruiter" },
        { caption: "Created Date", dataField: "CreatedDate",  dataType :"date",
        format : "dd-MMM-yyyy"},
        { caption: "Skills", dataField: "SKillName",cssClass: 'profileScreeningWrappedColumn'},
        ],
    })
    .dxDataGrid("instance");
}

function downloadProfileResumeForScreening(FileId){
    swal({
        title: "Are you sure?",
        text: "You want to download the Resume",
        icon: "warning",
        buttons: true,
      })
      .then((willDownload) => {
        if (willDownload) {
          window.open(SynergyAPIURL + "DownloadFile?query=GetDownloadProfileResume&filters={'FileId':'" + FileId + "'}&Token=" + localStorage.getItem("securityToken") , '_blank');
        }
      });
}

function approveProfile(mappingId){

    var result = DevExpress.ui.dialog.confirm("<b>Are you sure want to approve the profile?</b>", "Confirm changes");
    result.done(function(dialogResult) {
        if(dialogResult){
            var RRMProfileScreeningData = {
                MappingId: mappingId,
                IsApproved:1,
                IsActive:1
            };
        
            RRMProfileScreeningPostCallData = {
                Method: "PostProfileScreeningForRRM",
                Data: RRMProfileScreeningData
            };
        
            var RRMProfileScreeningPostResult = PostDataCall(RRMProfileScreeningPostCallData);
            if(RRMProfileScreeningPostResult.Message == "Profile Banned"){
                var RRMProfileScreeningPostSwal = {
                    title: "OOPS",
                    text: RRMProfileScreeningPostResult['Message'],
                    icon: 'error'
                }
                rrmProfileScreeningSwal(RRMProfileScreeningPostSwal);
            }
            getRRMAllProfileScreeningData();
        }
    });    
}

function rejectProfile(mappingId){
    var result = DevExpress.ui.dialog.confirm("<b>Are you sure want to reject the profile?</b>", "Confirm changes");
    result.done(function(dialogResult) {
        if(dialogResult){
            var RRMProfileScreeningData = {
                MappingId: mappingId,
                IsApproved:0,
                IsActive:1
            };
        
            RRMProfileScreeningPostCallData = {
                Method: "PostProfileScreeningForRRM",
                Data: RRMProfileScreeningData
            };
            
            var RRMProfileScreeningPostResult = PostDataCall(RRMProfileScreeningPostCallData);  
            if(RRMProfileScreeningPostResult.Message == "Profile Banned"){
                var RRMProfileScreeningPostSwal = {
                    title: "OOPS",
                    text: RRMProfileScreeningPostResult['Message'],
                    icon: 'error'
                }
                rrmProfileScreeningSwal(RRMProfileScreeningPostSwal);
            }
            getRRMAllProfileScreeningData();
        }
    });    
}

function rrmProfileScreeningSwal(data){
    swal({
    title: data.title,
    text: data.text,
    icon: data.icon,
    button:"OK"
    });   
}

function openCandidateInfoProfileScreening(candidateId){
    $("#candidateDetailsProfileScreeningModal").appendTo("body").modal("show");
    $("#candidateDetailsForProfileScreeningTab").click();
    var filterData1 = JSON.stringify({
        "CandidateId":candidateId,
        "IsActive": true
      });
      var filterData2 = JSON.stringify({
        "CandidateProfilebyId":candidateId,
        "IsActive": true
      }); 
      callGetListSync("GetInterviewHistoryDetails", filterData1, function (data) {
        mapProfileScreeningPreviousInterviews(data)
      }); 
      callGetListSync("GetCandidateProfilebyId", filterData2, function (data) {
        mapCandidateDetailsForProfileScreening(data[0]);
        });
        callGetListSync("GetCandidateSkillsbyCandidateId", filterData1, function (data) {
            getCandidateDetailsSkillsProfileScreening(data)
        });
}

function mapProfileScreeningPreviousInterviews(data){
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
                    html += "<div class='panel-heading' data-toggle='collapse' data-parent='#rrm_ProfileScreeningInterviewHistoryAccordian' href='#collapseProfileScreening"+key.Id+"' onclick=rrmProfileScreeningPanelClick('sdgd-RRMProfileScreeningInterviewHistory-"+key.Id+"') style='cursor:pointer'>"
                    html += "<h3 class='panel-title'>"
                    html += "<a data-toggle='collapse' data-parent='#rrm_ProfileScreeningInterviewHistoryAccordian' href='#collapseProfileScreening"+key.Id+"'>"
                    if(key.SortOrder == "2"){
                        html += key.RRMNo+"&nbsp;"+key.TypeName +"-"+key.RowNum+"</a> &nbsp;<label class='label label-success m-l-sm'>Passed</label><span style='float:right'>"+key.InterviewerName+"</span>"
                    }
                    if(key.SortOrder == "3"){
                        html += key.RRMNo+"&nbsp;"+key.TypeName +"-"+key.RowNum+"</a> &nbsp;<label class='label label-danger m-l-sm'>Failed</label><span style='float:right'>"+key.InterviewerName+"</span>"
                    }
                    if(key.SortOrder == "6"){
                        html += key.RRMNo+"&nbsp;"+key.TypeName +"-"+key.RowNum+"</a> &nbsp;<label class='label label-warning m-l-sm'>On-Hold</label><span style='float:right'>"+key.InterviewerName+"</span>"
                    }                
                    html += "</h3>"
                    html += "</div>"
                    html += "<div id='collapseProfileScreening"+key.Id+"' class='panel-collapse collapse'>"
                    html += "<div class='panel-body' style='overflow-y:scroll;height:300px;'>"
                    html += "<div id='sdgd-RRMProfileScreeningInterviewHistory-"+key.Id+"'></div>"
                    html += "<br><div><b>Remarks:</b></div>"
                    html += "<div class='row'><div class='col-md-12' id='rrm-profile-all-screening-remarks'>"+key.Comments+"</div></div>"
                    html +="</div>"
                    html += "</div>"
                    html += "</div> <br>"                
                    interviewCompletedState = true;
                    
                }
            });
            html += "</div>"
        })      
    }
    if(interviewCompletedState == true){
        $("#rrm_ProfileScreeningInterviewHistoryAccordian").html(html);
        
        $.each(result,function(id,items){
           
            items.forEach(function (key, item) {
               
                var dataOnRRMId = [];
                if(item.SortOrder == "2" || item.SortOrder == "3" || item.SortOrder == "6"){
                    dataOnRRMId.push(key);
                    binDataGridsForProfileScreeningInterviewHistory(dataOnRRMId,"#sdgd-RRMProfileScreeningInterviewHistory-"+key.Id)
                }
            })
        });
    }  
    else{
        $("#rrm_ProfileScreeningInterviewHistoryAccordian").html("<h3>No Previous Interview available for this candidate</h3>");
    }  
  }
  
  function binDataGridsForProfileScreeningInterviewHistory(data,id){
    rrmProfileScreeningInterviewHistoryGrid(data,id);
  }
  
  function rrmProfileScreeningInterviewHistoryGrid(interviewStages,id){   
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
              .append("<img id='imgRRMProfileScreeningInterviewHistory-"+options.data.Id+"' src='"+options.data.ProfilePicture+"' class='img-circle interviewer-image' width='25px' height='25px'></img><div id='imageTooltipRRMProfileScreeningInterviewHistory"+options.data.Id+"'></div>")
              .appendTo(container);
              prepareImageTooltipForRRMProfileScreeningInterviewHistory(options.data.Id,options.data.ProfilePicture,options.data.InterviewerName)
            }
          },
          {
            dataField: "RRMNo",
            caption: "RRM No.",
            cellTemplate: function (container, options) {  
                var comments = options.data.Comments.toString();
                var rex = /(<([^>]+)>)/ig;
                comments = comments.replace(rex , "");
                var domActions = "";
                domActions += "<a style='cursor:pointer' class='rrmRemarkAllProfileScreening' data-comments=" + comments + ">"+options.data.RRMNo+"</a>";
                $("<div class='text-left'>").append($(domActions)).appendTo(container);
            }
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
            caption: "Date"
          },
          {
            dataField: "InterviewTime",
            caption: "Time"
          },
          {
            dataField: "InterviewDetails",
            caption: "Interview Details"
          },
          {
            dataField: "Comments",
            caption: "Remarks",
            visible:false
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
  
  function prepareImageTooltipForRRMProfileScreeningInterviewHistory(Id,ProfilePicture,InterviewerName){
    $("#imageTooltipRRMProfileScreeningInterviewHistory"+Id).dxTooltip({
      target: "#imgRRMProfileScreeningInterviewHistory-"+Id,
      showEvent: "mouseenter",
      hideEvent: "mouseleave",
      closeOnOutsideClick: false,
      position: "right",
      contentTemplate: function(data) {
          data.html("<img width='150' height='150' src='"+ProfilePicture+"'><br/><b>"+InterviewerName+"</b>");
      }
  });
  }
  
  function rrmProfileScreeningPanelClick(id){
    $("#"+id).dxDataGrid("instance").refresh();
    setTimeout(function(){
        new SimpleBar(document.getElementById('InterviewModalBody'));
    }, 1000);    
  }

  $(document).on("click", ".rrmRemarkAllProfileScreening", function (e) {
    var comments =  $(this).attr("data-comments");
    if(comments =="" && comments == null){
        comments = "Comments Not Avalilable";
    }
    else{
     $("#rrm-profile-all-screening-remarks").html("");
     $("#rrm-profile-all-screening-remarks").html(comments);
    }
 });

  function mapCandidateDetailsForProfileScreening(data){
    if(data.FirstName != null && data.FirstName != ""){
        $("#lbl_candidateDetailsNameProfileScreening").html(data.FirstName);
        $("#candidateDetailsNameProfileScreening").html(data.FirstName)
    }
    else{
        $("#lbl_candidateDetailsNameProfileScreening").html("Not Available");
    }
    if(data.Mobile != null && data.Mobile != ""){
        $("#lbl_candiateDetailsMobileProfileScreening").html(data.Mobile)
    }
    else{
        $("#lbl_candiateDetailsMobileProfileScreening").html("Not Available")
    }
    if(data.EmailId != null && data.EmailId != ""){
        $("#lbl_candiateDetailsEmailProfileScreening").html(data.EmailId)
    }
    else{
        $("#lbl_candiateDetailsEmailProfileScreening").html("Not Available")
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
    $("#lbl_candiateDetailsLinksProfileScreening").html(socialLinksHtml)
    
    $("#star_candidateDetailsCommunicationRatingProfileScreening").text(data.CommunicationRatingHR);
    if(data.Native != null && data.Native != ""){
        $("#lbl_candiateDetailsNativeProfileScreening").html(data.Native)
    }
    else{
        $("#lbl_candiateDetailsNativeProfileScreening").html("Not Available")
    }
    if(data.PreviousEmployersInfo != null && data.PreviousEmployersInfo != ""){
        $("#lbl_candidateDetailsWorkExperienceProfileScreening").html(data.PreviousEmployersInfo)
    }
    else{
        $("#lbl_candidateDetailsWorkExperienceProfileScreening").html("Not Available")
    }
  }
  
  function getCandidateDetailsSkillsProfileScreening(data){      
        $("#sdgd_candidateDetailsSkillsProfileScreening").dxDataGrid({
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

  $(document).on("click", ".rrmdetailAllProfileScreening", function (e) {
    var rrmId = $(e.currentTarget).data("rrmid");           
    getRRMDetailsForAllProfileScreening(rrmId);
  });

  function getRRMDetailsForAllProfileScreening(rrmId){
    $("#RRMDetailsAllProfileScreeningModal").appendTo("body").modal("show");
    var filterData2 = JSON.stringify({
        IsActive: true,
        ResourceRequirementId : rrmId
    });
    callGetListSync("GetRRMById", filterData2, function (RRMData) {
      mapRRMDetailsForAllProfileScreening(RRMData[0])
    });
  }
  
  function mapRRMDetailsForAllProfileScreening(data){
    if(data.RRMNo != null && data.RRMNo != ""){
        $("#lbl_rrmDetailsAllProfileScreeningRRMNumberTab").html(data.RRMNo);
        $("#rrmDetailsAllProfileScreeningRRMNo").html(data.RRMNo)
    }
    else{
        $("#lbl_rrmDetailsAllProfileScreeningRRMNumberTab").html("Not Available");
    }
    if(data.RequirementName != null && data.RequirementName != ""){
        $("#lbl_rrmDetailsAllProfileScreeningRRMNameTab").html(data.RequirementName)
    }
    else{
        $("#lbl_rrmDetailsAllProfileScreeningRRMNameTab").html("Not Available")
    }
    if(data.RequiredFor != null && data.RequiredFor != ""){
        $("#lbl_rrmDetailsAllProfileScreeningRRMRequiredFor").html(data.RequiredFor)
    }
    else{
        $("#lbl_rrmDetailsAllProfileScreeningRRMRequiredFor").html("Not Available")
    }
    if(data.Department != null && data.Department != ""){
        $("#lbl_rrmDetailsAllProfileScreeningRRMDepartment").html(data.Department)
    }
    else{
        $("#lbl_rrmDetailsAllProfileScreeningRRMDepartment").html("Not Available")
    }
    if(data.Designation != null && data.Designation != ""){
        $("#lbl_rrmDetailsAllProfileScreeningRRMDesignation").html(data.Designation)
    }
    else{
        $("#lbl_rrmDetailsAllProfileScreeningRRMDesignation").html("Not Available")
    }
    if(data.ExperiencerequiredInYrs != null && data.ExperiencerequiredInYrs != ""){
        $("#lbl_rrmDetailsAllProfileScreeningRRMExperience").html(data.ExperiencerequiredInYrs)
    }
    else{
        $("#lbl_rrmDetailsAllProfileScreeningRRMExperience").html("Not Available")
    }
    if(data['PlanA-SkillPlanInfo'] != null && data['PlanA-SkillPlanInfo'] != ""){
        $("#lbl_rrmDetailsAllProfileScreeningRRMPlanA").html(data['PlanA-SkillPlanInfo'])
    }
    else{
        $("#lbl_rrmDetailsAllProfileScreeningRRMPlanA").html("Not Available")
    }
    if(data['PlanB-SkillPlanInfo'] != null && data['PlanB-SkillPlanInfo'] != ""){
        $("#lbl_rrmDetailsAllProfileScreeningRRMPlanB").html(data['PlanB-SkillPlanInfo'])
    }
    else{
        $("#lbl_rrmDetailsAllProfileScreeningRRMPlanB").html("Not Available")
    }
    if(data.Status != null && data.Status != ""){
        $("#rrmStatusAllProfileScreeningRRM").text(data.Status);
      }
      else{
        $("#rrmStatusAllProfileScreeningRRM").text("");
      }
    getRRMAllProfileScreeningDataGrid(data.RRMId)
  }
  
  function getRRMAllProfileScreeningDataGrid(RRMId){
    var filterData = JSON.stringify({
        "ResourceRequirementId": RRMId,
        "IsActive": true,
    });        
  
    callGetListAsync('GetResourceRequrirementSkill', filterData, function (e) {
        var GetSkillList = e;
        $("#sdgd_rrmAllProfileScreeningSkillsGrid").dxDataGrid({
            dataSource: GetSkillList,
            showBorders: true,
            paging: {
                enabled: false
            },
            wordWrapEnabled: true,
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

  