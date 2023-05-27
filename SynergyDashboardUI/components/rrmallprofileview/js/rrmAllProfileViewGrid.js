$(document).ready(function () {
    getAllRRMProfileViewTable();
});

function getAllRRMProfileViewTable() {
    var filterData = JSON.stringify({
        "Token" : localStorage.getItem("securityToken"),
        "IsActive": true
    });
 
    callGetListSync('GetCandidateAllProfile', filterData, function (e) {
        $("#rrmAllProfileGrid").dxDataGrid({ dataSource: e })
        candidateProfilesDataSourceForMentions = e
    })
}

function rendeRRMAllProfileViewGrid() {
    var dataGrid = $("#rrmAllProfileGrid").dxDataGrid({
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
        emptyPanelText:"Drag a column header here to group by that column"
        },
	   sorting: {
		   mode: "multiple"
	   },
	   selection: {
		mode: "multiple"
	},
    summary: {
        totalItems: [{
          column: "CandidateName",
          summaryType: "count"
        }
          // ...
        ],
        groupItems: [{
          column: "CandidateName",
          summaryType: "count"
        }]
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
		rowAlternationEnabled:true,
		showBorders: true,
		onExporting: function(e) {
            var selectedRowsData= e.component.getSelectedRowsData();
            if(selectedRowsData.length === 1){
                exportSingleAllProfileView(selectedRowsData[0],e);
            }
            else{
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('All Profile View');
                
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
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), "RRMAllProfileView.xlsx");
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
                        getAllRRMProfileViewTable();
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
            { caption: "Status", dataField: "Status",
                cellTemplate: function (container, options) {          
                             
                var domActions = "";
                
                if(options.data.Status == "In-Progress"){
                    domActions += "<label class='label label-warning m-l-sm'>"+options.data.Status+"</label>";
                }
                else {
                    domActions += "<label class='label label-primary m-l-sm'>"+options.data.Status+"</label>";
                }
                
                $("<div class='text-left'>").append($(domActions)).appendTo(container);
            }, 
         },
            { caption: "CreatedBy", dataField: "CreatedBy" },
            {
                caption: "", dataField: "CandidateProfileId", allowFiltering: false, allowGrouping: false, allowReordering: false, allowSorting: false, allowCollapsing: false, allowExporting: false, allowExporting: false, alignment: "left",
                cellTemplate: function (container, options) {
                    var fieldData = options.data.LinkedIn;
                    
                    var flaged = "";
                    var resumeDownload = "";
                    var sendInvite_html = "";
                    var history_html = "<button class='btn btn-xs' onclick=openAllProfileViewPointInterviewHistory('"+options.data.CandidateProfileId+"')><i class='fa fa-history' aria-hidden='true'></i></button>";
                    var mapRRM ="";

                    // if(options.data.IsFlagged == 0){
                    //     mapRRM = "<button class='btn btn-xs btn-primary RRMProfileEntryPointMappingModel 'data-candidateId ='" + options.data.CandidateProfileId +"'><i title='RRM Mapping' class='fas fa-user-tag'></i></button>"
                    // }
                   
                    // if (options.data.EmailId && !options.data.IsFlagged) {
                    //     sendInvite_html = "<button type='button' id='sendCandidateInvite' class='btn btn-xs btn-success' data-emailid='"+options.data.EmailId+"' title='"+options.data.EmailId+"'><span><i class='fas fa-envelope'></i> Invite </span></button>";
                    // }
                    $("<div class='text-left'>")
                        .append( history_html)
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
                    var toolTip='';
                    if(options.data.DocumentExtension == 'pdf'){
                        toolTip = 'Click here to view the resume';
                    }
                    else 
                    {
                        toolTip = 'Click here to download the resume';
                    }
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
                        resumeDownload = "<button class='btn btn-xs' id='candidateresumedownload' onclick=downloadAllProfileResume('"+options.data.DocumentId+"')><i class='fa fa-download'  title='"+toolTip+"' aria-hidden='true'></i></button>"
                    }
                    
                    $("<div class='text-left'>")
                        .append(resumeDownload )
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


function exportSingleAllProfileView(data,e){

    var workbook = new ExcelJS.Workbook();
    var profileEntryId = data.CandidateProfileId;
    var filter_val = JSON.stringify(
    {
        "IsActive": true,
        "CandidateProfilebyId": profileEntryId
    }
    );
    var result = callgetlist('GetCandidateAllProfilebyId', filter_val);

    var candidateDetails = result[0];

    var basicDetails = workbook.addWorksheet('Basic');
    var additionalInfo = workbook.addWorksheet('Additional Information');
    var address = workbook.addWorksheet('Address');
    var workHistory = workbook.addWorksheet('Work History');
    var skills = workbook.addWorksheet('Skills');

    generateBasicDetailsForExportAllProfileView(basicDetails,candidateDetails);
    generateAdditionalInformationForExportAllProfileView(additionalInfo,candidateDetails);
    generateAddressDetailsForExportAllProfileView(address,candidateDetails);

    getWorkHistoryAndSkillsForExportAllProfileView(profileEntryId);

    var skillGrid = $("#rrmAllProfileSkillsGridForExport").dxDataGrid("instance");
    var workHistoryGrid = $("#rrmAllProfileWorkHistoryGridForExport").dxDataGrid("instance");

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
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), "RRMAllProfile-"+candidateDetails.FirstName+".xlsx");
                $("#rrmAllProfileSkillsGridForExport").dxDataGrid("instance").dispose();
                $("#rrmAllProfileWorkHistoryGridForExport").dxDataGrid("instance").dispose();
            });
        });
    }, 500);
    
    e.cancel = true;
}


function generateBasicDetailsForExportAllProfileView(basicDetails,candidateDetails){
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

function generateAdditionalInformationForExportAllProfileView(additionalInfo,candidateDetails){
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

function generateAddressDetailsForExportAllProfileView(address,candidateDetails){
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

function getWorkHistoryAndSkillsForExportAllProfileView(profileEntryId){
    var filter_val = JSON.stringify({
        "CandidateId ": profileEntryId,
        "IsActive": "True",
        "Token": Token
    });

    var CandidatesSkills = callgetlist('GetAllCandidateSkillsbyCandidateId', filter_val);

    $("#rrmAllProfileSkillsGridForExport").dxDataGrid({
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

    var CandidateWorkHistory = callgetlist('GetAllCandidatePreviousEmployersByCandidateId', filter_val);

    $("#rrmAllProfileWorkHistoryGridForExport").dxDataGrid({
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


    // swal({
    //     title: "Are you sure?",
    //     text: "You want to download the Resume",
    //     icon: "warning",
    //     buttons: true,
    //   })
    //   .then((willDownload) => {
    //     if (willDownload) {
     //     window.open(SynergyAPIURL + "DownloadFile?query=GetDownloadProfileResume&filters={'FileId':'" + FileId + "'}&Token=" + localStorage.getItem("securityToken") , '_blank');
    //     }
    //   });
    function downloadAllProfileResume(FileId) {
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