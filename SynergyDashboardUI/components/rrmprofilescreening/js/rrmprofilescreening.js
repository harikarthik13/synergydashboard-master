$(document).ready(function () {
    renderRRMProfileScreeningGrid();
    getRRMProfileScreeningData();
});

function getRRMProfileScreeningData() {
    var filterData = JSON.stringify({
        Token : localStorage.getItem("securityToken"),
        IsActive: true,
    });

    callGetListSync("GetCandidatesForProfileScreening", filterData, function (e) {
        $("#sdgd-rrmProfileScreening").dxDataGrid({ dataSource: e });
    });
}

function renderRRMProfileScreeningGrid() {
    var profileScreeningdataGrid = $("#sdgd-rrmProfileScreening").dxDataGrid({
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
        allowColumnResizing: true,
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
            mode: "select"
        },
        allowColumnResizing: true,
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
            mode: "select"
        },
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet("RRM Profile Screening");

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
                        if (gridCell.rowType === "data") {
                            if (gridCell.column.caption === "Approval Status") {
                                excelCell.font = { color: { argb: 'FFFFFF' } };
                                if (gridCell.data.IsFlagged != true) {
                                    if (gridCell.data.DocumentId) {
                                        if (gridCell.data.SortOrder == 2) {
                                            if (gridCell.data.OnHoldByClient == true) {
                                                excelCell.value = "On Hold By Client"
                                                excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "F0AD4E" } };
                                            }
                                            if (gridCell.data.OnHoldByOwner == true) {
                                                excelCell.value = "On Hold By Owner"
                                                excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "F0AD4E" } };
                                            }
                                            if (gridCell.data.OnHoldByClient == false && gridCell.data.OnHoldByOwner == false) {
                                                excelCell.value = "Yet To Approve"
                                                excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "F0AD4E" } };
                                            }
                                        }
                                        else if (gridCell.data.SortOrder == 5) {
                                            excelCell.value = "Approved"
                                            excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "5CB85C" } };
                                        }
                                        else if (gridCell.data.SortOrder == 3) {
                                            excelCell.value = "Rejected"
                                            excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "D9534F" } };
                                        }
                                        else {
                                            excelCell.value = "Approved"
                                            excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "5CB85C" } };
                                        }
                                    }
                                    else {
                                        excelCell.value = "Resume Not Uploaded"
                                        excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "F0AD4E" } };
                                    }
                                }
                                else {
                                    excelCell.value = "Banned"
                                    excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "777777" } };
                                }
                            }
                        }
                    },
                }).then(function (dataGridRange) {
                    setBorders(worksheet, dataGridRange);
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
                        getRRMProfileScreeningData();
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
            {
                caption: "RRM No", dataField: "RRMNo", cellTemplate: function (container, options) {
                    var domActions = "";
                    domActions += "<a style='cursor:pointer' class='rrmdetailProfileScreening' data-rrmid =" + options.data.RRMId + ">" + options.data.RRMNo + "</a>";
                    $("<div class='text-left'>").append($(domActions)).appendTo(container);
                }
            },
            { caption: "Candidate Name", dataField: "CandidateName" },
            {
                caption: "RRM Name", dataField: "RRMName", cellTemplate: function (container, options) {
                    var domActions = "";
                    domActions += "<a style='cursor:pointer' class='rrmdetailProfileScreening' data-rrmid =" + options.data.RRMId + ">" + options.data.RRMName + "</a>";
                    $("<div class='text-left'>").append($(domActions)).appendTo(container);
                }
            },
            { caption: "Recruiter", dataField: "Recruiter" },
            { caption: "Skills", dataField: "SKillName", cssClass: 'profileScreeningWrappedColumn', width: 400 },
            {
                caption: "Approval Status",
                dataField: "MappingId",
                allowFiltering: false,
                allowGrouping: false,
                allowReordering: false,
                allowSorting: false,
                allowCollapsing: false,
                cellTemplate: function (container, options) {
                    var html = "";
                    if (options.data.IsFlagged != true) {
                        //  if(options.data.DocumentId){
                        if (options.data.SortOrder == 2) {
                            if (options.data.OnHoldByClient == true) {
                                html +=
                                    "<button class='btn btn-xs btn-warning' disabled>On Hold By Client</button>";
                            }
                            if (options.data.OnHoldByOwner == true) {
                                html +=
                                    "<button class='btn btn-xs btn-warning' disabled>On Hold By Owner</button>";
                            }
                            if (options.data.OnHoldByClient == false && options.data.OnHoldByOwner == false) {
                                html +=
                                    "<button class='btn btn-xs btn-success' onclick=approveProfile('" + options.data.MappingId + "')>Approve</button>";
                                html += "<button class='btn btn-xs btn-danger' onclick=rejectProfile('" + options.data.MappingId + "')>Reject</button>";
                            }
                        }
                        else if (options.data.SortOrder == 5) {
                            html +=
                                "<button class='btn btn-xs btn-success' disabled>Approved</button>";
                            if (options.data.OnHoldByClient == true) {
                                html +=
                                    "<button class='btn btn-xs btn-warning' disabled>On Hold By Client</button>";
                            }
                            if (options.data.OnHoldByOwner == true) {
                                html +=
                                    "<button class='btn btn-xs btn-warning' disabled>On Hold By Owner</button>";
                            }
                        }
                        else if (options.data.SortOrder == 27 && options.data.StageId == "8F477B44-131E-4782-8856-164ABF05066B" && options.data.DocumentId != null) {
                            html +=
                                "<button class='btn btn-xs btn-warning' disabled>Resume not uploaded</button>";
                        }
                        else if (options.data.SortOrder == 3) {
                            html +=
                                "<button class='btn btn-xs btn-danger' disabled>Rejected</button>";
                        }
                        else {
                            html +=
                                "<button class='btn btn-xs btn-success' disabled>Approved</button>";
                            if (options.data.OnHoldByClient == true) {
                                html +=
                                    "<button class='btn btn-xs btn-warning' disabled>On Hold By Client</button>";
                            }
                            if (options.data.OnHoldByOwner == true) {
                                html +=
                                    "<button class='btn btn-xs btn-warning' disabled>On Hold By Owner</button>";
                            }
                        }
                        //  }  
                        // else{
                        //     html +=
                        //         "<button class='btn btn-xs btn-warning' disabled>Resume not uploaded</button>";
                        // }              
                    }
                    else {
                        html += "<button class='btn btn-xs btn-black' disabled>BANNED &nbsp;<i class='fa fa-ban' aria-hidden='true' style='color:#D9534F'></i></button>";
                    }
                    $("<div class='pull-left'>")
                        .append(html)
                        .appendTo(container);
                },
                calculateSortValue: function (rowData) {
                    if (rowData.IsFlagged == true)
                        return profileScreeningdataGrid.columnOption('Approval Status', 'sortOrder') == 'desc' ? "aaa" : "zzz"; // CEOs are always displayed at the top  
                },
                onClick: function (e) {
                    RRMProfileEntryPointTableModel(data.CandidateProfileId);
                },
                fixedPosition: "right"
            },
            {
                caption: "",
                dataField: "CandidateProfileId",
                allowFiltering: false,
                allowGrouping: false,
                allowReordering: false,
                allowSorting: false,
                allowCollapsing: false,
                allowExporting: false,
                cellTemplate: function (container, options) {
                    var fieldData = options.data.LinkedIn;
                    var github_html = "";
                    var linkedIn_html = "";
                    var url_html = "";
                    var file_html = "";
                    var flaged = "";
                    var toolTip='';
                    if(options.data.DocumentExtension == 'pdf'){
                        toolTip = 'Click here to view the resume';
                    }
                    else 
                    {
                        toolTip = 'Click here to download the resume';
                    }
                    var info_html = "<button class='btn btn-xs' onclick=openCandidateInfoProfileScreening('" + options.data.CandidateId + "')><i class='fa fa-eye' aria-hidden='true'></i></button>";
                    if (options.data.LinkedIn != null && options.data.LinkedIn != "") {
                        linkedIn_html =
                            "<button class='btn btn-xs'><span><a href='" +
                            options.data.LinkedIn +
                            "' target='_blank'><i class='fab fa-linkedin'></i></a></span></button>";
                    }
                    if (options.data.GitHub != null && options.data.GitHub != "") {
                        github_html =
                            "<button class='btn btn-xs'><span> <a href='" +
                            options.data.GitHub +
                            "' target='_blank'><i class='fab fa-github' aria-hidden='true'></i></a></span ></button>";
                    }
                    if (options.data.Url != null && options.data.Url != "") {
                        url_html =
                            "<button class='btn btn-xs'><span><a href='" +
                            options.data.Url +
                            "' target='_blank'><i class='fa fa-link'></i></a></span></button>";
                    }
                    if (options.data.DocumentId) {
                        file_html = "<button class='btn btn-xs' id='candidateresumedownload' onclick=downloadProfileResumeForScreening('" + options.data.DocumentId + "')><i class='fa fa-download' title='"+toolTip+"' aria-hidden='true'></i></button>"
                    }
                    $("<div class='pull-left'>")
                        .append(
                            info_html +
                            " " +
                            file_html +
                            " " +
                            linkedIn_html +
                            " " +
                            github_html +
                            " " +
                            url_html

                        )
                        .appendTo(container);
                },
                onClick: function (e) {
                    RRMProfileEntryPointTableModel(data.CandidateProfileId);
                },
                fixedPosition: "right",
                allowExporting: false
            },
        ],
    })
        .dxDataGrid("instance");
}

function downloadProfileResumeForScreening(FileId) {
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
    // swal({
    //     title: "Are you sure?",
    //     text: "You want to download the Resume",
    //     icon: "warning",
    //     buttons: true,
    //   })
    //   .then((willDownload) => {
    //     if (willDownload) {
    //       window.open(SynergyAPIURL + "DownloadFile?query=GetDownloadProfileResume&filters={'FileId':'" + FileId + "'}&Token=" + localStorage.getItem("securityToken") , '_blank');
    //     }
    //   });
}

function approveProfile(mappingId) {

    var result = DevExpress.ui.dialog.confirm("<b>Are you sure want to approve the profile?</b>", "Confirm changes");
    result.done(function (dialogResult) {
        if (dialogResult) {
            var RRMProfileScreeningData = {
                MappingId: mappingId,
                IsApproved: 1,
                IsActive: 1
            };

            RRMProfileScreeningPostCallData = {
                Method: "PostProfileScreeningForRRM",
                Data: RRMProfileScreeningData
            };

            var RRMProfileScreeningPostResult = PostDataCall(RRMProfileScreeningPostCallData);
            if (RRMProfileScreeningPostResult.Message == "Profile Banned") {
                var RRMProfileScreeningPostSwal = {
                    title: "OOPS",
                    text: RRMProfileScreeningPostResult['Message'],
                    icon: 'error'
                }
                rrmProfileScreeningSwal(RRMProfileScreeningPostSwal);
            }
            getRRMProfileScreeningData();
        }
    });
}

function rejectProfile(mappingId) {
    var result = DevExpress.ui.dialog.confirm("<b>Are you sure want to reject the profile?</b>", "Confirm changes");
    result.done(function (dialogResult) {
        if (dialogResult) {
            var RRMProfileScreeningData = {
                MappingId: mappingId,
                IsApproved: 0,
                IsActive: 1
            };

            RRMProfileScreeningPostCallData = {
                Method: "PostProfileScreeningForRRM",
                Data: RRMProfileScreeningData
            };

            var RRMProfileScreeningPostResult = PostDataCall(RRMProfileScreeningPostCallData);
            if (RRMProfileScreeningPostResult.Message == "Profile Banned") {
                var RRMProfileScreeningPostSwal = {
                    title: "OOPS",
                    text: RRMProfileScreeningPostResult['Message'],
                    icon: 'error'
                }
                rrmProfileScreeningSwal(RRMProfileScreeningPostSwal);
            }
            getRRMProfileScreeningData();
        }
    });
}

function rrmProfileScreeningSwal(data) {
    swal({
        title: data.title,
        text: data.text,
        icon: data.icon,
        button: "OK"
    });
}

function openCandidateInfoProfileScreening(candidateId) {
    $("#candidateDetailsProfileScreeningModal").appendTo("body").modal("show");
    $("#candidateDetailsForProfileScreeningTab").click();
    var filterData1 = JSON.stringify({
        "CandidateId": candidateId,
        "IsActive": true
    });
    var filterData2 = JSON.stringify({
        "CandidateProfilebyId": candidateId,
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

function mapProfileScreeningPreviousInterviews(data) {
    var result = data.reduce(function (r, a) {
        r[a.RRMNo] = r[a.RRMNo] || [];
        r[a.RRMNo].push(a);
        return r;
    }, Object.create(null));

    var interviewCompletedState = false;
    var html = ""
    if (data != undefined && data.length > 0) {
        $.each(result, function (id, items) {

            if (items[0].SortOrder != null && items[0].SortOrder != "") {
                if (items[0].SortOrder == "2" || items[0].SortOrder == "3" || items[0].SortOrder == "6") {
                    html += "<div>"
                    html += "<div><strong>" + id + "</strong></div> <br>"
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
                    html += "<div class='panel-heading' data-toggle='collapse' data-parent='#rrm_ProfileScreeningInterviewHistoryAccordian' href='#collapseProfileScreening" + key.Id + "' onclick=rrmProfileScreeningPanelClick('sdgd-RRMProfileScreeningInterviewHistory-" + key.Id + "') style='cursor:pointer'>"
                    html += "<h3 class='panel-title'>"
                    html += "<a data-toggle='collapse' data-parent='#rrm_ProfileScreeningInterviewHistoryAccordian' href='#collapseProfileScreening" + key.Id + "'>"
                    if (key.SortOrder == "2") {
                        html += key.RRMNo + "&nbsp;" + key.TypeName + "-" + key.RowNum + "</a> &nbsp;<label class='label label-success m-l-sm'>Passed</label><span style='float:right'>" + key.InterviewerName + "</span>"
                    }
                    if (key.SortOrder == "3") {
                        html += key.RRMNo + "&nbsp;" + key.TypeName + "-" + key.RowNum + "</a> &nbsp;<label class='label label-danger m-l-sm'>Failed</label><span style='float:right'>" + key.InterviewerName + "</span>"
                    }
                    if (key.SortOrder == "6") {
                        html += key.RRMNo + "&nbsp;" + key.TypeName + "-" + key.RowNum + "</a> &nbsp;<label class='label label-warning m-l-sm'>On-Hold</label><span style='float:right'>" + key.InterviewerName + "</span>"
                    }
                    html += "</h3>"
                    html += "</div>"
                    html += "<div id='collapseProfileScreening" + key.Id + "' class='panel-collapse collapse'>"
                    html += "<div class='panel-body' style='overflow-y:scroll;height:300px;'>"
                    html += "<div id='sdgd-RRMProfileScreeningInterviewHistory-" + key.Id + "'></div>"
                    html += "<br><div><b>Remarks:</b></div>"
                    html += "<div class='row'><div class='col-md-12' id='rrm-profile-screening-remarks'>" + key.Comments + "</div></div>"
                    html += "</div>"
                    html += "</div>"
                    html += "</div> <br>"
                    interviewCompletedState = true;

                }
            })
            html += "</div>"
        })
    }
    if (interviewCompletedState == true) {
        $("#rrm_ProfileScreeningInterviewHistoryAccordian").html(html);

        $.each(result, function (id, items) {

            items.forEach(function (key, item) {

                var dataOnRRMId = [];
                if (key.SortOrder == "2" || key.SortOrder == "3" || key.SortOrder == "6") {
                    dataOnRRMId.push(key);
                    binDataGridsForProfileScreeningInterviewHistory(dataOnRRMId, "#sdgd-RRMProfileScreeningInterviewHistory-" + key.Id)
                }
            })
        });
    }
    else {
        $("#rrm_ProfileScreeningInterviewHistoryAccordian").html("<h3>No Previous Interview available for this candidate</h3>");
    }
}

function binDataGridsForProfileScreeningInterviewHistory(data, Id) {
    rrmProfileScreeningInterviewHistoryGrid(Id, data);
}

function rrmProfileScreeningInterviewHistoryGrid(id, data) {
    $(id).dxDataGrid({
        dataSource: data,
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
                allReordering: false,
                allowFiltering: false,
                width: 70,
                cellTemplate: function (container, options) {

                    $("<div class='text-center'>")
                        .append("<img id='imgRRMProfileScreeningInterviewHistory-" + options.data.Id + "' src='" + options.data.ProfilePicture + "' class='img-circle interviewer-image' width='25px' height='25px'></img><div id='imageTooltipRRMProfileScreeningInterviewHistory" + options.data.Id + "'></div>")
                        .appendTo(container);
                    prepareImageTooltipForRRMProfileScreeningInterviewHistory(options.data.Id, options.data.ProfilePicture, options.data.InterviewerName)
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
                width: 180,
                cellTemplate: function (container, options) {
                    $("<div>")
                        .append("<span>" + options.data.TypeName + "-" + options.data.RowNum + " " + options.data.StatusName + "</span>")
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
                dataField: "Comments",
                caption: "Remarks",
                visible: false
            },
            {
                dataField: "InterviewDetails",
                caption: "Interview Details"
            },
            {
                dataField: "OverallMark",
                caption: "Score",
                width: 180,
                cellTemplate: function (container, options) {
                    var meterhtml = "";
                    if (options.data.OverallMark <= 4) {
                        meterhtml += "<span class='scoremeter'><meter class='redmeter' min='0' max='10' value='" + options.data.OverallMark + "' tooltip='10' width='5px'></meter><b> " + options.data.OverallMark + "/10</b></span>"
                    }
                    if (options.data.OverallMark < 8 && options.data.OverallMark > 4) {
                        meterhtml += "<span class='scoremeter'><meter class='orangemeter' min='0' max='10' value='" + options.data.OverallMark + "' tooltip='10' width='5px'></meter><b> " + options.data.OverallMark + "/10</b></span>"
                    }
                    if (options.data.OverallMark > 8) {
                        meterhtml += "<span class='scoremeter'><meter class='greenmeter' min='0' max='10' value='" + options.data.OverallMark + "' tooltip='10' width='5px'></meter><b> " + options.data.OverallMark + "/10</b></span>"
                    }
                    $(meterhtml).appendTo(container);
                }
            }
        ]
    });
}

function prepareImageTooltipForRRMProfileScreeningInterviewHistory(Id, ProfilePicture, InterviewerName) {
    $("#imageTooltipRRMProfileScreeningInterviewHistory" + Id).dxTooltip({
        target: "#imgRRMProfileScreeningInterviewHistory-" + Id,
        showEvent: "mouseenter",
        hideEvent: "mouseleave",
        closeOnOutsideClick: false,
        position: "right",
        contentTemplate: function (data) {
            data.html("<img width='150' height='150' src='" + ProfilePicture + "'><br/><b>" + InterviewerName + "</b>");
        }
    });
}

function rrmProfileScreeningPanelClick(id) {
    $("#" + id).dxDataGrid("instance").refresh();
    setTimeout(function () {
        new SimpleBar(document.getElementById('InterviewModalBody'));
    }, 1000);
}

$(document).on("click", ".rrmProfileScreeningInterview", function (e) {
    var comments = $(this).attr("data-comments");
    if (comments == "" && comments == null) {
        comments = "Comments Not Avalilable";
    }
    else {
        $("#rrm-profile-screening-remarks").html("");
        $("#rrm-profile-screening-remarks").html(comments);
    }
});

function mapCandidateDetailsForProfileScreening(data) {
    if (data.FirstName != null && data.FirstName != "") {
        $("#lbl_candidateDetailsNameProfileScreening").html(data.FirstName);
        $("#candidateDetailsNameProfileScreening").html(data.FirstName)
    }
    else {
        $("#lbl_candidateDetailsNameProfileScreening").html("Not Available");
    }
    if (data.Mobile != null && data.Mobile != "") {
        $("#lbl_candiateDetailsMobileProfileScreening").html(data.Mobile)
    }
    else {
        $("#lbl_candiateDetailsMobileProfileScreening").html("Not Available")
    }
    if (data.EmailId != null && data.EmailId != "") {
        $("#lbl_candiateDetailsEmailProfileScreening").html(data.EmailId)
    }
    else {
        $("#lbl_candiateDetailsEmailProfileScreening").html("Not Available")
    }
    var socialLinksHtml = "";
    if (data.Skype != null && data.Skype != "") {
        socialLinksHtml += "<a href='skype:" + data.Skype + "?chat'><i class='fab fa-skype'></i></a> &nbsp;"
    }
    if (data.GitHub != null && data.GitHub != "") {
        socialLinksHtml += "<a href='" + data.GitHub + "' target='_blank'><i class='fab fa-github' aria-hidden='true'></i></a> &nbsp;"
    }
    if (data.LinkedIn != null && data.LinkedIn != "") {
        socialLinksHtml += "<a href='" + data.LinkedIn + "' target='_blank'><i class='fab fa-linkedin'></i></a> &nbsp;"
    }
    if (data.Url != null && data.Url != "") {
        socialLinksHtml += "<a href='" + data.Url + "' target='_blank'><i class='fa fa-link'></i></a>"
    }
    if (socialLinksHtml == "") {
        socialLinksHtml = "Not Available"
    }
    $("#lbl_candiateDetailsLinksProfileScreening").html(socialLinksHtml)

    $("#star_candidateDetailsCommunicationRatingProfileScreening").text(data.CommunicationRatingHR);
    if (data.Native != null && data.Native != "") {
        $("#lbl_candiateDetailsNativeProfileScreening").html(data.Native)
    }
    else {
        $("#lbl_candiateDetailsNativeProfileScreening").html("Not Available")
    }
    if (data.PreviousEmployersInfo != null && data.PreviousEmployersInfo != "") {
        $("#lbl_candidateDetailsWorkExperienceProfileScreening").html(data.PreviousEmployersInfo)
    }
    else {
        $("#lbl_candidateDetailsWorkExperienceProfileScreening").html("Not Available")
    }
    if (data.Status != null && data.Status != "") {
        $("#rrmStatusProfileScreeningRRM").text(data.Status);
    }
    else {
        $("#rrmStatusProfileScreeningRRM").text("");
    }
}

function getCandidateDetailsSkillsProfileScreening(data) {
    $("#sdgd_candidateDetailsSkillsProfileScreening").dxDataGrid({
        dataSource: data,
        showBorders: true,
        paging: {
            enabled: false
        },
        wordWrapEnabled: true,
        columns: [
            {
                dataField: "SkillGradeName",
                caption: "Grade"
            },
            {
                dataField: "SkillFamilieName",
                caption: "Skill Family"
            },
            {
                dataField: "skillName",
                caption: "Skill Name"
            },
            {
                dataField: "SkillVersion",
                caption: "Skill Version"
            }
        ],
    });
}

function setBorderCell(worksheet, row, column, borderValue) {
    const excelCell = worksheet.getCell(row, column);

    if (!excelCell.border) {
        excelCell.border = {};
    }

    Object.assign(excelCell.border, borderValue);
}

function setBorders(worksheet, cellsRange) {
    var borderStylePattern = { style: 'thin', color: { argb: 'FF7E7E7E' } };
    for (let i = cellsRange.from.row; i < cellsRange.to.row; i++) {
        for (let j = cellsRange.from.column; j <= cellsRange.to.column; j++) {
            setBorderCell(worksheet, i, j, { bottom: borderStylePattern });
            setBorderCell(worksheet, i, j, { right: borderStylePattern });
        }
    }
    for (let i = cellsRange.from.column; i <= cellsRange.to.column; i++) {
        setBorderCell(worksheet, cellsRange.from.row, i, { top: borderStylePattern });
    }
    for (let i = cellsRange.from.row; i <= cellsRange.to.row; i++) {
        setBorderCell(worksheet, i, cellsRange.from.column, { left: borderStylePattern });
    }
    for (let i = cellsRange.from.row; i <= cellsRange.to.row; i++) {
        setBorderCell(worksheet, i, cellsRange.to.column, { right: borderStylePattern });
    }
    for (let i = cellsRange.from.column; i <= cellsRange.to.column; i++) {
        setBorderCell(worksheet, cellsRange.to.row, i, { bottom: borderStylePattern });
    }
}