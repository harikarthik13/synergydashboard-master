$(document).ready(function () {
    getRRMProfileEntryTable();
});

function getRRMProfileEntryTable() {
    var filterData = JSON.stringify({
        "IsActive": true
    });
 
    callGetListSync('GetCandidateProfile', filterData, function (e) {
        $("#rrmProfileGridReport").dxDataGrid({ dataSource: e })
        candidateProfilesDataSourceForMentions = e
    })
}

function rendeRRMProfileEntryPointReportGrid() {
    var dataGrid = $("#rrmProfileGridReport").dxDataGrid({
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
                    column: "Name",
                    summaryType: "count"
                }
                // ...
                ],
                groupItems: [{
                    column: "Name",
                    summaryType: "count"
                }]
            },
            rowAlternationEnabled: true,
            columnChooser: {
                enabled: true,
            },    
		onExporting: function(e) {
            var selectedRowsData= e.component.getSelectedRowsData();
            if(selectedRowsData.length === 1){
                exportSingleProfileEntry(selectedRowsData[0],e);
            }
            else{
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('Profile Entry Point');
                
                DevExpress.excelExporter.exportDataGrid({
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
                    }                         
                }).then(function(dataGridRange) {
                    setBorders( worksheet, dataGridRange);
                    return Promise.resolve();
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), "RRMProfileEntry.xlsx");
                    });
                });
                e.cancel = true;
            }			
        },
        onToolbarPreparing: function (e) {
            var dataGrids = e.component;
            e.toolbarOptions.items.unshift({
                location: "after",
                widget: "dxButton",
                options: {
                    icon: "refresh",
                    onClick: function () {
                        getRRMProfileEntryTable();                        
                        dataGrids.refresh();
                    }
                }
            });
        },
        columns: [
            {
                dataField: "Sno",
                caption: "#",
                alignment:"left",
                width:70,
                cellTemplate: function (container, options) {
                    container.text(
                        dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex + 1
                    );
                },
            },
            //{ caption: "Candidate Profile Id", dataField: "CandidateProfileId" },
            { caption: "Name", dataField: "CandidateName" },
            { caption: "Skill Name", dataField: "SKillName", cssClass: 'profileEntryWrappedColumn', width:120},
            { caption: "Phone", dataField: "Mobile" },
            {
                caption: "Email", dataField: "EmailId",
                cellTemplate: function (container, options) {
                    var fieldData = options.data.EmailId;
                    if (fieldData == "" || fieldData == null || fieldData == undefined) {
                        var html = "";
                    }
                    else {
                        var html = "<span><a href='mailto:" + fieldData + "' target='_blank'><i class='fas fa-envelope'></i></a> &nbsp;" + fieldData + "</span>";
                    }
                    $(html).appendTo(container);
                }
            },
            
            { caption: "Exp", dataField: "TotalExperience",
                cellTemplate:function(container,options){
                    var html = " ";
                    if(options.data.TotalExperience!=null)
                        html = "<span class='' style='font-size:14px;font-weight:bold;'>"+options.data.TotalExperience+"</span> ";
                    $(html).appendTo (container)
                }
        
        },
            {
                caption: "Skype", dataField: "Skype",
                cellTemplate: function (container, options) {
                    var fieldData = options.data.Skype;
                    if (fieldData == "" || fieldData == null || fieldData == undefined) {
                        var html = "";
                    }
                    else {
                        var html = "<span><a href='skype:" + fieldData + "?chat'><i class='fab fa-skype'></i></a> &nbsp;" + fieldData + "</span>";
                    }
                    $(html).appendTo(container);
                }
            },
            { caption: "CreatedBy", dataField: "CreatedBy" },
        //     { caption: "Age", dataField: "Age",
        //     cellTemplate: function(container,options){
        //         var fieldData = options.data.Age;
        //         if(fieldData == null || fieldData == undefined){
        //             var html = "<span></span>";
        //         }
        //         else{
        //             var html = "<span>"+fieldData+"</span>"
        //         }
        //         $(html).appendTo(container);
        //     }
        // },
            {
                caption: "", dataField: "CandidateProfileId", allowFiltering: false, allowGrouping: false, allowReordering: false, allowSorting: false, allowCollapsing: false, allowExporting: false, allowExporting: false, alignment: "left",
                cellTemplate: function (container, options) {
                    var fieldData = options.data.LinkedIn;
                    
                    var flaged = "";
                    var resumeDownload = "";
                    var sendInvite_html = "";
                    var history_html = "<button class='btn btn-xs' onclick=openProfileEntryPointInterviewHistory('"+options.data.CandidateProfileId+"')><i class='fa fa-history' aria-hidden='true'></i></button>";
                    var mapRRM ="";

                    if(options.data.IsFlagged == 0){
                        mapRRM = "<button class='btn btn-xs btn-primary RRMProfileEntryPointMappingModel 'data-candidateId ='" + options.data.CandidateProfileId +"'><i title='RRM Mapping' class='fas fa-user-tag'></i></button>"
                    }
                   
                    if (options.data.EmailId && !options.data.IsFlagged) {
                        sendInvite_html = "<button type='button' id='sendCandidateInvite' class='btn btn-xs btn-success' data-emailid='"+options.data.EmailId+"' title='"+options.data.EmailId+"'><span><i class='fas fa-envelope'></i> Invite </span></button>";
                    }
                    $("<div class='text-left'>")
                        .append(mapRRM + "<button class='btn  btn-xs RRMProfileEntryPointTableModel' data-type='edit' data-profile=" + options.data.CandidateProfileId + "><i class='fa fa-pencil-square-o'></i></button> " + history_html +sendInvite_html)
                        .appendTo(container); 
                },
                onClick: function (e) {
                    RRMProfileEntryPointTableModel(data.CandidateProfileId)
                }, fixedPosition: "right", allowExporting: false
            },
            {
                caption: "", dataField: "CandidateProfileId", allowFiltering: false, allowGrouping: false, allowReordering: false, allowSorting: false, allowCollapsing: false, allowExporting: false, allowExporting: false, alignment: "left",
                cellTemplate: function (container, options) {
                    var fieldData = options.data.LinkedIn;
                    var github_html = "";
                    var linkedIn_html = "";
                    var url_html = "";
                    var resumeDownload = "";
                   debugger
                    if (options.data.LinkedIn) {
                        linkedIn_html = "<button class='btn btn-xs '<span><a href='" + options.data.LinkedIn + "' target='_blank'><i class='fab fa-linkedin'></i></a></span></button>";
                    }
                    if (options.data.GitHub) {
                        github_html = "<button class='btn btn-xs'<span> <a href='" + options.data.GitHub + "' target='_blank'><i class='fab fa-github' aria-hidden='true'></i></a></span ></button>";
                    }
                    if (options.data.Url) {
                        url_html = "<button class='btn btn-xs '<span><a href='" + options.data.Url + "' target='_blank'><i class='fa fa-link'></i></a></span></button>";
                    }
                 
                    if(options.data.DocumentId){
                        resumeDownload = "<button class='btn btn-xs' id='candidateresumedownload' onclick=downloadProfileResume('"+options.data.DocumentId+"')><i class='fa fa-download' aria-hidden='true'></i></button>"
                    }
                    
                    $("<div class='text-left'>")
                        .append(resumeDownload+ linkedIn_html + " " + github_html + " " + url_html+" " )
                        .appendTo(container); 
                },
                onClick: function (e) {
                    RRMProfileEntryPointTableModel(data.CandidateProfileId)
                }, fixedPosition: "right", allowExporting: false
            }
        ],
        onRowPrepared(e) { 
            if (e.rowType == 'data') { 
                if (e.data.DocumentId != "" && e.data.DocumentId != null && e.data.DocumentId != undefined) {  
                    e.rowElement.css("background-color", "rgb(225, 247, 223)");
                    e.rowElement.removeClass("dx-row-alt");  
                }
                if (e.data.IsFlagged == true) {  
                    e.rowElement.css("background-color", "rgb(230, 143, 140)");  
                    e.rowElement.removeClass("dx-row-alt");
                }
            }
        }
    }).dxDataGrid("instance");
}

$(document).on("click","#sendCandidateInvite", function(e){
    //TODO invite to be sent to candidate
    
    var emailId = $(this).data("emailid");
    var content = document.createElement('div');
    content.innerHTML = 'Verify the candidate email: <br/> <span style="font-size:24px;font-weight:bold;">'+ emailId +'</span>';
    swal({
        title: "Candidate Invitation",
        content: content,
        icon: "warning",
        buttons: true,
      })
      .then((canMailBeSent) => {
        if (canMailBeSent) {
            $.ajax({
                url: SynergyAPIURL + "SendInvitationEmailForRRM?emailId=" + emailId,
                type: "GET",
                dataType: 'json',
                async: true,
                headers: {
                    "SecurityToken": localStorage.getItem("securityToken"),
                }
            })
            .done(function(data) {
                if(data && data.IsSuccess)
                {
                    var content = document.createElement('div');
    content.innerHTML = 'Mail sent successfully to: <br/> <span style="font-size:24px;font-weight:bold;">'+ emailId +'</span>';
                swal({
                    title: "Invitation email sent successfully",
                    content: content,
                    icon: "success",
                  });
                }
                  else{
                    swal({
                        title: "Error sending email",
                        text: "Something went wrong",
                        icon: "error",
                      });
                  }
            })
            .fail(function(e) {
                swal({
                    title: "Error sending email",
                    text: "Something went wrong",
                    icon: "error",
                  });
            });
        }
      });
   
    //Swal messagte to display feature to be completed
    //   swal({
    //     title: "Feature is coming soon...",
    //     icon: "info",
    //     buttons: true
    //   });
})

function downloadProfileResume(FileId){
    // swal({
    //     title: "Are you sure?",
    //     text: "You want to download the Resume",
    //     icon: "warning",
    //     buttons: true,
    //   })
    //   .then((willDownload) => {
    //     if (willDownload) {
          window.open(SynergyAPIURL + "DownloadFile?query=GetDownloadProfileResume&filters={'FileId':'" + FileId + "'}&Token=" + localStorage.getItem("securityToken") , '_blank');
    //     }
    //   });
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

function exportSingleProfileEntry(data,e){

    var workbook = new ExcelJS.Workbook();
    var profileEntryId = data.CandidateProfileId;
    var filter_val = JSON.stringify(
    {
        "IsActive": true,
        "CandidateProfilebyId": profileEntryId
    }
    );
    var result = callgetlist('GetCandidateProfilebyId', filter_val);

    var candidateDetails = result[0];

    var basicDetails = workbook.addWorksheet('Basic');
    var additionalInfo = workbook.addWorksheet('Additional Information');
    var address = workbook.addWorksheet('Address');
    var workHistory = workbook.addWorksheet('Work History');
    var skills = workbook.addWorksheet('Skills');

    generateBasicDetailsForExport(basicDetails,candidateDetails);
    generateAdditionalInformationForExport(additionalInfo,candidateDetails);
    generateAddressDetailsForExport(address,candidateDetails);

    getWorkHistoryAndSkillsForExport(profileEntryId);

    var skillGrid = $("#skillsGridForExport").dxDataGrid("instance");
    var workHistoryGrid = $("#workHistoryGridForExport").dxDataGrid("instance");

    var headerFontStyles = { bold: true, size: 16, underline: "none", color: { argb: 'FFFFFF' } };
    var columnFillStyles = { type: "pattern", pattern: "solid", fgColor: { argb: "777777" }, bgColor: { argb: "777777" } };
    workHistory.mergeCells('A1:H1');
    workHistory.getRow(1).getCell(1).value = "Work History";
    workHistory.getRow(1).getCell(1).font = headerFontStyles;
    workHistory.getRow(1).getCell(1).alignment = { horizontal:'center'} ;
    workHistory.getRow(1).getCell(1).fill = columnFillStyles

    skills.mergeCells('A1:D1');
    skills.getRow(1).getCell(1).value = "Skill Details";
    skills.getRow(1).getCell(1).font = headerFontStyles;
    skills.getRow(1).getCell(1).alignment = { horizontal:'center'} ;
    skills.getRow(1).getCell(1).fill = columnFillStyles

    setTimeout(() => {
        DevExpress.excelExporter.exportDataGrid({
            component: skillGrid,
            worksheet: skills,
            autoFilterEnabled: true,
            topLeftCell: { row: 2, column: 1 },
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
            }                         
        }).then(function (dataGridRange) {
            setBorders( skills, dataGridRange);
            return DevExpress.excelExporter.exportDataGrid({
                worksheet: workHistory,
                component: workHistoryGrid,
                topLeftCell: { row: 2, column: 1 },
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
                }
            }).then(function(dataGridRange1){
                setBorders( workHistory, dataGridRange1);
            });
        }).then(function () {
            workbook.xlsx.writeBuffer().then(function (buffer) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), "RRMProfile-"+candidateDetails.FirstName+".xlsx");
                $("#skillsGridForExport").dxDataGrid("instance").dispose();
                $("#workHistoryGridForExport").dxDataGrid("instance").dispose();
            });
        });
    }, 500);
    
    e.cancel = true;
}


function generateBasicDetailsForExport(basicDetails,candidateDetails){
    var headerFontStyles = { bold: true, size: 16, underline: "none", color: { argb: 'FFFFFF' } };
    var columnFillStyles = { type: "pattern", pattern: "solid", fgColor: { argb: "777777" }, bgColor: { argb: "777777" } };
    var fontStyles = { bold: true };

    basicDetails.columns = [  
        { width: 30 }, { width: 30 }
    ];  
    basicDetails.mergeCells('A1:B1');

    basicDetails.getRow(1).getCell(1).value = "Basic Information";
    basicDetails.getRow(1).getCell(1).font = headerFontStyles;
    basicDetails.getRow(1).getCell(1).alignment = { horizontal:'center'} ;
    basicDetails.getRow(1).getCell(1).fill = columnFillStyles
    
    basicDetails.getRow(2).getCell(1).value = "Name"
    basicDetails.getRow(2).getCell(1).font = fontStyles
    basicDetails.getRow(2).getCell(2).value = candidateDetails.FirstName
    basicDetails.getRow(2).getCell(2).alignment = { horizontal:'left'} ;

    basicDetails.getRow(3).getCell(1).value = "Email"
    basicDetails.getRow(3).getCell(1).font = fontStyles
    basicDetails.getRow(3).getCell(2).value = candidateDetails.EmailId
    basicDetails.getRow(3).getCell(2).alignment = { horizontal:'left'} ;

    basicDetails.getRow(4).getCell(1).value = "Phone No"
    basicDetails.getRow(4).getCell(1).font = fontStyles
    basicDetails.getRow(4).getCell(2).value = candidateDetails.Mobile
    basicDetails.getRow(4).getCell(2).alignment = { horizontal:'left'} ;

    basicDetails.getRow(5).getCell(1).value = "Notice Period"
    basicDetails.getRow(5).getCell(1).font = fontStyles
    basicDetails.getRow(5).getCell(2).value = candidateDetails.NoticePeriod
    basicDetails.getRow(5).getCell(2).alignment = { horizontal:'left'} ;

    basicDetails.getRow(6).getCell(1).value = "Passport No"
    basicDetails.getRow(6).getCell(1).font = fontStyles
    basicDetails.getRow(6).getCell(2).value = candidateDetails.PassPortNo
    basicDetails.getRow(6).getCell(2).alignment = { horizontal:'left'} ;

    basicDetails.getRow(7).getCell(1).value = "Aadhar No"
    basicDetails.getRow(7).getCell(1).font = fontStyles
    basicDetails.getRow(7).getCell(2).value = candidateDetails.Aadhar
    basicDetails.getRow(7).getCell(2).alignment = { horizontal:'left'} ;

    basicDetails.getRow(8).getCell(1).value = "PAN No"
    basicDetails.getRow(8).getCell(1).font = fontStyles
    basicDetails.getRow(8).getCell(2).value = candidateDetails.PANNo
    basicDetails.getRow(8).getCell(2).alignment = { horizontal:'left'} ;

    basicDetails.getRow(9).getCell(1).value = "Native"
    basicDetails.getRow(9).getCell(1).font = fontStyles
    basicDetails.getRow(9).getCell(2).value = candidateDetails.Native
    basicDetails.getRow(9).getCell(2).alignment = { horizontal:'left'} ;

    basicDetails.getRow(10).getCell(1).value = "Communication"
    basicDetails.getRow(10).getCell(1).font = fontStyles
    if(candidateDetails.CommunicationRatingHR == 1){
        basicDetails.getRow(10).getCell(2).value = "Poor"
    }
    if(candidateDetails.CommunicationRatingHR == 2){
        basicDetails.getRow(10).getCell(2).value = "Average"
    }
    if(candidateDetails.CommunicationRatingHR == 3){
        basicDetails.getRow(10).getCell(2).value = "Good"
    }
    if(candidateDetails.CommunicationRatingHR == 4){
        basicDetails.getRow(10).getCell(2).value = "Very Good"
    }
    basicDetails.getRow(10).getCell(2).alignment = { horizontal:'left'} ;

    basicDetails.getRow(11).getCell(1).value = "Willing to Relocate"
    basicDetails.getRow(11).getCell(1).font = fontStyles
    if(candidateDetails.Relocate == true){
        basicDetails.getRow(11).getCell(2).value = "Yes"
    }
    if(candidateDetails.Relocate == false){
        basicDetails.getRow(11).getCell(2).value = "No"
    }
    basicDetails.getRow(11).getCell(2).alignment = { horizontal:'left'} ;

    basicDetails.getRow(12).getCell(1).value = "Referral"
    basicDetails.getRow(12).getCell(1).font = fontStyles
    basicDetails.getRow(12).getCell(2).value = candidateDetails.Referral
    basicDetails.getRow(12).getCell(2).alignment = { horizontal:'left'} ;
}

function generateAdditionalInformationForExport(additionalInfo,candidateDetails){
    var headerFontStyles = { bold: true, size: 16, underline: "none", color: { argb: 'FFFFFF' } };
    var header2FontStyles = { bold: true, size: 14, underline: "none" };
    var columnFillStyles = { type: "pattern", pattern: "solid", fgColor: { argb: "777777" }, bgColor: { argb: "777777" } };
    var fontStyles = { bold: true };

    additionalInfo.columns = [  
        { width: 30 }, { width: 30 }
    ]; 

    additionalInfo.mergeCells('A1:B1');
    additionalInfo.getRow(1).getCell(1).value = "Addition Information";
    additionalInfo.getRow(1).getCell(1).font = headerFontStyles;
    additionalInfo.getRow(1).getCell(1).alignment = { horizontal:'center'} ;
    additionalInfo.getRow(1).getCell(1).fill = columnFillStyles

    additionalInfo.mergeCells('A2:B2');
    additionalInfo.getRow(2).getCell(1).value = "Professional Information";
    additionalInfo.getRow(2).getCell(1).font = header2FontStyles;
    additionalInfo.getRow(2).getCell(1).alignment = { horizontal:'center'} ;

    additionalInfo.getRow(3).getCell(1).value = "Skype"
    additionalInfo.getRow(3).getCell(1).font = fontStyles
    additionalInfo.getRow(3).getCell(2).value = candidateDetails.Skype
    additionalInfo.getRow(3).getCell(2).alignment = { horizontal:'left'} ;

    additionalInfo.getRow(4).getCell(1).value = "Linked In"
    additionalInfo.getRow(4).getCell(1).font = fontStyles
    additionalInfo.getRow(4).getCell(2).value = candidateDetails.LinkedIn
    additionalInfo.getRow(4).getCell(2).alignment = { horizontal:'left'} ;

    additionalInfo.getRow(5).getCell(1).value = "Git Hub"
    additionalInfo.getRow(5).getCell(1).font = fontStyles
    additionalInfo.getRow(5).getCell(2).value = candidateDetails.GitHub
    additionalInfo.getRow(5).getCell(2).alignment = { horizontal:'left'} ;

    additionalInfo.getRow(6).getCell(1).value = "URL"
    additionalInfo.getRow(6).getCell(1).font = fontStyles
    additionalInfo.getRow(6).getCell(2).value = candidateDetails.Url
    additionalInfo.getRow(6).getCell(2).alignment = { horizontal:'left'} ;

    additionalInfo.mergeCells('A7:B7');
    additionalInfo.getRow(7).getCell(1).value = "Personal Information";
    additionalInfo.getRow(7).getCell(1).font = header2FontStyles;
    additionalInfo.getRow(7).getCell(1).alignment = { horizontal:'center'} ;

    additionalInfo.getRow(8).getCell(1).value = "Father Name"
    additionalInfo.getRow(8).getCell(1).font = fontStyles
    additionalInfo.getRow(8).getCell(2).value = candidateDetails.FatherName
    additionalInfo.getRow(8).getCell(2).alignment = { horizontal:'left'} ;

    additionalInfo.getRow(9).getCell(1).value = "Marital Status"
    additionalInfo.getRow(9).getCell(1).font = fontStyles
    additionalInfo.getRow(9).getCell(2).value = candidateDetails.MaritalStatus
    additionalInfo.getRow(9).getCell(2).alignment = { horizontal:'left'} ;

    additionalInfo.getRow(10).getCell(1).value = "Date Of Birth"
    additionalInfo.getRow(10).getCell(1).font = fontStyles
    additionalInfo.getRow(10).getCell(2).value = candidateDetails.DateOfBirth
    additionalInfo.getRow(10).getCell(2).alignment = { horizontal:'left'} ;

}

function generateAddressDetailsForExport(address,candidateDetails){
    var headerFontStyles = { bold: true, size: 16, underline: "none", color: { argb: 'FFFFFF' } };
    var columnFillStyles = { type: "pattern", pattern: "solid", fgColor: { argb: "777777" }, bgColor: { argb: "777777" } };
    var fontStyles = { bold: true };

    address.columns = [  
        { width: 30 }, { width: 30 }
    ]; 

    address.mergeCells('A1:B1');
    address.getRow(1).getCell(1).value = "Address Details";
    address.getRow(1).getCell(1).font = headerFontStyles;
    address.getRow(1).getCell(1).alignment = { horizontal:'center'} ;
    address.getRow(1).getCell(1).fill = columnFillStyles

    address.getRow(2).getCell(1).value = "Address"
    address.getRow(2).getCell(1).font = fontStyles
    address.getRow(2).getCell(2).value = candidateDetails.Address
    address.getRow(2).getCell(2).alignment = { horizontal:'left'} ;

    address.getRow(3).getCell(1).value = "Country"
    address.getRow(3).getCell(1).font = fontStyles
    address.getRow(3).getCell(2).value = candidateDetails.CountryName
    address.getRow(3).getCell(2).alignment = { horizontal:'left'} ;

    address.getRow(4).getCell(1).value = "State"
    address.getRow(4).getCell(1).font = fontStyles
    address.getRow(4).getCell(2).value = candidateDetails.StateName
    address.getRow(4).getCell(2).alignment = { horizontal:'left'} ;

    address.getRow(5).getCell(1).value = "City"
    address.getRow(5).getCell(1).font = fontStyles
    address.getRow(5).getCell(2).value = candidateDetails.CityName
    address.getRow(5).getCell(2).alignment = { horizontal:'left'} ;

    address.getRow(5).getCell(1).value = "Pin Code"
    address.getRow(5).getCell(1).font = fontStyles
    address.getRow(5).getCell(2).value = candidateDetails.PostalCode
    address.getRow(5).getCell(2).alignment = { horizontal:'left'} ;

}

function getWorkHistoryAndSkillsForExport(profileEntryId){
    var filter_val = JSON.stringify({
        "CandidateId ": profileEntryId,
        "IsActive": "True",
        "Token": Token
    });

    var CandidatesSkills = callgetlist('GetCandidateSkillsbyCandidateId', filter_val);

    $("#skillsGridForExport").dxDataGrid({
        dataSource:CandidatesSkills,
        export: {
            enabled: true,
            allowExportSelectedData: true,
        },
        showBorders: true,
        showRowLines:true,
        showColumnLines:true,
        columns:[
            {
                dataField:"SkillGradeName",
                caption:"Grade"
            },
            {
                dataField:"SkillFamilieName",
                caption:"Family"
            },
            {
                dataField:"skillName",
                caption:"Skill"
            },
            {
                dataField:"SkillVersion",
                caption:"Version"
            }
        ]
    }).dxDataGrid("instance");

    var CandidateWorkHistory = callgetlist('GetCandidatePreviousEmployersByCandidateId', filter_val);

    $("#workHistoryGridForExport").dxDataGrid({
        dataSource:CandidateWorkHistory,
        export: {
            enabled: true,
            allowExportSelectedData: true,
        },
        showBorders: true,
        showRowLines:true,
        showColumnLines:true,
        columns:[
            {
                dataField:"EmployerName",
                caption:"Employer Name"
            },
            {
                dataField:"Designation",
                caption:"Designation"
            },
            {
                dataField:"Location",
                caption:"Location"
            },
            {
                dataField:"SkillVersion",
                caption:"Version"
            },
            {
                dataField: "FromDate",
                caption: "From Date",
                dataType: "date",
                width: 125
            },
            {
                dataField: "ToDate",
                caption: "To Date",
                dataType: "date",
                width: 125
            },
            {
                dataField: "Experience",
                caption: "Experience",
            },
            {
                dataField: "ReasonForLeaving",
                caption: "Reason For Leaving",
            }
        ],
        summary: {
            totalItems: [{
                column: "ToDate",
                summaryType: "sum",
                customizeText: function(data) {
                    return "Total Experience:";
                }
            },{
                column: "Experience",
                summaryType: "sum",
                customizeText: function(data) {
                    return data.value;
                }
            }]
        }
    }).dxDataGrid("instance");
}