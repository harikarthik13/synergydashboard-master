RRMEntryPointGridOwner= (function (pageId) {
    var _rrmGrid = {};
    _rrmGrid.ui = {};
    var candidatesForRRM = [];
    //Maps UI component with variables
    function mapUI() {
        _rrmGrid.ui.rrmGridReport = $("#rrmGridReport" + pageId);
        initialize();
    }

    //Initialize the page
    function initialize() {
        var filterData = JSON.stringify({
            "IsActive": true
        });
        callGetListAsync('GetAllCandidatesInterview', filterData, function(e){
            //candidatesForRRM = e;
            _rrmGrid.renderrrmentrypointreportGrid();
        });
       
    }

    function refreshCandidatesInterviewRRM(){
        var filterData = JSON.stringify({
            "IsActive": true
        });
        callGetListAsync('GetAllCandidatesInterview', filterData, function(e){
           // candidatesForRRM = e
            
        });
    }

    //Grid for RRM entry point
    _rrmGrid.renderrrmentrypointreportGrid = function () {
        var dataGrid = _rrmGrid.ui.rrmGridReport.dxDataGrid({   
            filterRow: {
                visible: true,
                applyFilter: "auto"
            },
            keyExpr:"RRMId",
            repaintChangesOnly: true,
            highlightChanges: true,
            // stateStoring: {
            //     enabled: false,
            //     type: "localStorage",
            //     storageKey: "rrmentrypointgrid" + pageId
            // },
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
            //columnAutoWidth: true,
            grouping: {
                autoExpandAll: true,
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [5,10, 20],
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
                // ...
                ],
                groupItems: [{
                    column: "RRMNo",
                    summaryType: "count"
                }]
            },
            rowAlternationEnabled: true,
            onExporting: onExportingRRM,
            onToolbarPreparing: function (e) {
                var dataGrid = e.component;
                e.toolbarOptions.items.unshift({
                    location: "after",
                    widget: "dxButton",
                    options: {
                        icon: "refresh",
                        onClick: function () {                            
                            refreshCandidatesInterviewRRM();
                            _rrmGrid.getRRMEntryTable();
                            dataGrid.refresh();
                            e.component.collapseAll(-1);
                            e.component.expandRow(e.currentSelectedRowKeys[0]);
                        }
                    }
                });
            },
            onRowExpanded:function(e){
                var RRMId = e.key;
                var dates = new Date();
                   var startingDateOfMonth = new Date(dates.getFullYear(), dates.getMonth(), 1);
                   startingDateOfMonth.setFullYear(2021)
                   startingDateOfMonth.setMonth(0)
                   var date = new Date();
                   var currentDate = date.toISOString().slice(0, 10);
               
                   $("#rrm_resource_requirement_fromDate_"+RRMId).dxDateBox({
                       type: "date",
                       displayFormat: "dd MMM yyyy",
                       value: dates
                   });

                   $("#rrm_resource_requirement_toDate_"+RRMId).dxDateBox({
                       type: "date",
                       displayFormat: "dd MMM yyyy",
                       value: dates
                   });
                   
               
                loadMasterDetailsCountRRMEntry(e.key,dates,dates);
            },
            allowColumnResizing: true,
            columns: [
                { caption: "#", dataField: "RRMNo", allowGrouping: false, allowCollapsing: false, allReordering: false,width:130,
                cellTemplate: function (container, options) {
                    container.text(
                        dataGrid.pageIndex() * dataGrid.pageSize() + options.rowIndex + 1
                    );
                },
             },
                { caption: "RRM No", dataField: "RRMNo" },
                { caption: "Owner", dataField: "Owner",visible:false },
                { caption: "Requirement Name", dataField: "RequirementName" },
                { caption: "Required For", dataField: "RequiredFor" },
                { caption: "Designation", dataField: "Designation" },
                {
                    caption: "Plan-A On-Board Date",
                    dataField: "PlanA-OnBoardDate",
                    allowEditing: false,
                    allowFiltering: true,
                    visible:false,
                    dataType :"date",
                    format : "dd-MMM-yyyy"
                    
                },
                {
                    caption: "Plan-B On-Board Date",
                    dataField: "PlanB-OnBoardDate",
                    allowEditing: false,
                    allowFiltering: true,
                    dataType :"date",
                    format : "dd-MMM-yyyy",
                    visible:false
                    
                },
                { caption: "VIP", dataField: "VIP",visible:false ,cellTemplate: function (container, options) {  
                    var domActions = "";
                    if (options.data.VIP == true) {
                        domActions += "<label class='label label-info m-l-xs'>Yes</label>";
                    } else if (options.data.VIP == false) {
                        domActions += "<label class='label label-warning m-l-xs'>No</label>";
                    }
                    $("<div>").append($(domActions)).appendTo(container);
                }},
                { caption: "Losing Revenue", dataField: "LosingRevenue",visible:false ,cellTemplate: function (container, options) {  
                    var domActions = "";
                    if (options.data.LosingRevenue == true) {
                        domActions += "<label class='label label-info m-l-xs'>Yes</label>";
                    } else if (options.data.LosingRevenue == false) {
                        domActions += "<label class='label label-warning m-l-xs'>No</label>";
                    }
                    $("<div>").append($(domActions)).appendTo(container);
                }},
                { caption: "Priority", dataField: "PriorityName",visible:false ,cellTemplate: function (container, options) {    
                    var domActions = "";
                    if (options.data.PriorityName == "Low") {
                        domActions += "<label class='label label-info m-l-xs'>Low</label>";
                    } else if (options.data.PriorityName == "Medium") {
                        domActions += "<label class='label label-warning m-l-xs'>Medium</label>";
                    } else if (options.data.PriorityName == "High") {
                        domActions += "<label class='label label-danger m-l-xs'>High</label>";
                    }
                    $("<div>").append($(domActions)).appendTo(container);
                }},
                { caption: "No.Of Interviews Scheduled", dataField: "NoOfInterviewsScheduled",visible:false },
                { caption: "No.Of Shortlisted", dataField: "NoOfShortlisted",visible:false},
                { caption: "Offered", dataField: "Offered",visible:false },
                { caption: "Accepted", dataField: "Accepted" ,visible:false},
                { caption: "Joining Date", dataField: "JoiningDate",
                    allowEditing: false,
                    allowFiltering: true,
                    dataType :"date",
                    format : "dd-MMM-yyyy",
                    visible:false
                    
            },
                { caption: "Plan-A Recruiters", dataField: "PlanARecruiters",visible:false },
                { caption: "Plan-B Recruiters", dataField: "PlanBRecruiters",visible:false },
                { caption: "Exp. Req. in Yrs", dataField: "ExperiencerequiredInYrs",visible:false },
                { caption: "Status", dataField: "Status" ,visible:false},
                { caption: "Skill", dataField: "SkillName",visible:false },
                { caption: "Department", dataField: "Department",visible:false },
                { caption: "Number Of Positions", dataField: "NumberOfPositions",visible:false },
                { caption: "Communication", dataField: "Communication",visible:false },
                {
                    caption: "Created Date",
                    dataField: "RRMCreatedDate",
                    allowFiltering: true,
                    allowEditing: false,
                    dataType :"date",
                    format : "dd-MMM-yyyy",
                    visible:false
                    
                },
                {
                    dataField: "RRM Type",
                    caption: "RRM Type",
                    allowFiltering: false,
                    visible:false,
                    cellTemplate: function (container, options) {
                        
                        var domActions = "";
                        if (options.data.ResourceRequirementType =="G") {
                            domActions += "<label class='label label-success m-l-xs'>RRM</label>";
                        } else if (options.data.ResourceRequirementType =="P") {
                            domActions += "<label class='label label-info m-l-xs'>RFP</label>";
                        } else if (options.data.ResourceRequirementType == "R") {
                            domActions += "<label class='label label-warning m-l-xs'>Resignation</label>";
                        }
                        $("<div>").append($(domActions)).appendTo(container);
                    }
                },
                {
                    caption: "", dataField: "RRMId", allowGrouping: false, allowCollapsing: false, allReordering: false,allowExporting:false,
                    cellTemplate: function (container, options) {
                        $("<div>")
                            .append("<button data-type='edit' data-rrmid =" + options.data.RRMId + "  data-rrmtype =" + options.data.ResourceRequirementType + " data-rrmownerid ="+ options.data.OwnerId+" class='btn btn-xs btn-primary edit-btn btnSelect editRRMEntryPoint" + pageId + "' title='Edit RRM'><i class='fas fa-pencil-alt'></i></button>")
                            .append("<button data-type='add' data-rrmid =" + options.data.RRMId + "  data-rrmtype =" + options.data.ResourceRequirementType + " data-rrmownerid ="+ options.data.OwnerId+" class='btn btn-xs btn-primary edit-btn btnSelect cloneRRMEntryPoint" + pageId + "' title='Clone RRM'><i class='fas fa-clone'></i></button>")
                            .append("<button data-type='comment' data-rrmid =" + options.data.RRMId + "  data-rrmtype =" + options.data.ResourceRequirementType + " data-rrmownerid ="+ options.data.OwnerId+" class='btn btn-xs btn-primary edit-btn btnSelect commentsRRMEntryPoint' title='Comments RRM' onclick=GetRRMCommentsEntryPoint(\'"+ options.data.RRMId +"\',\'"+ options.data.RRMNo +"\')><i class='fas fa-comments'></i></button>")
                            .appendTo(container);
                    },
                    onClick: function (e) {
                        RRMEntryFromRRM(data.RRMId)
                    }, fixedPosition: "right",allowExporting: false
                                }
            ],
            onRowPrepared(e) {           
                if (e.rowType == 'data') { 
                    // if (e.data.IsRecruiterAssigned != "" && e.data.IsRecruiterAssigned != null && e.data.IsRecruiterAssigned != undefined) {  
                    //     e.rowElement.css("background-color", "rgb(225, 247, 223)");
                    //     e.rowElement.removeClass("dx-row-alt");  
                    // }
                    if (e.data.OnHoldByClient == true || e.data.OnHoldByOwner == true) {
                        e.rowElement.css("background-color", "red");
                    }
                }
            },
            masterDetail: {
                enabled: true,
                template: function(container, options) { 
                    
                    $("<div>")
                        .addClass("master-detail-caption")
                        .text("Candidates For Interview")
                        .appendTo(container, options);
                    

                        var html = "<div class='row' style='display: flex;'>";     
                        

                        html += "<div class='col-md-3'>";

                        html += "<div class='form-group'> <label>From Date</label><div id='rrm_resource_requirement_fromDate_"+options.data.RRMId+"'></div> </div>";

                        html += "</div>";

                        html += "<div class='col-md-3'>";

                        html += "<div class='form-group'> <label>To Date</label><div id='rrm_resource_requirement_toDate_"+options.data.RRMId+"'></div> </div>";

                        html += "</div>";


                        html += "<div class='col-md-6'>";

                        html += " <div class='row form-group' style='text-align:left;'> <label>&nbsp;</label><div class='rrm-btn'>  <button class='btn btn-sm' data-type='add' onclick=rrmdateranges(\'"+ options.data.RRMId +"\') id='rrmDashBoardFilter'> <i class='fa fa-search' aria-hidden='true'></i>&nbsp; Filter Range </button>&nbsp;&nbsp;&nbsp;";
                        
                        html += "<button class='btn btn-sm' data-type='add' onclick=rrmdaterangesToday(\'"+ options.data.RRMId +"\') id='rrmDashBoardFilter'> <i class='fa fa-search' aria-hidden='true'></i>&nbsp; Today </button>&nbsp;&nbsp;&nbsp;";
                       
                        html += "<button class='btn btn-sm' data-type='add' onclick=rrmdaterangesYesterday(\'"+ options.data.RRMId +"\') id='rrmDashBoardFilter'> <i class='fa fa-search' aria-hidden='true'></i>&nbsp; Yesterday </button>";
                       
                        html += "</div> </div>";

                        html += "</div>";                       
                      

                        
                        html += "</div>";

                        html += "<div></div>"

                        html += "</div></div>"


                        html += "<div class='cardDetailsTrackerNew'> <div class='item'><div class='card item-card card-block'><h5 class='mt-3 mb-3'><b>L1 Interviews<br> Conducted</b></h5><h2 id='cardL1InterviewsConductedRRMNew"+options.data.RRMId+"'>NA</h2></div></div>"
                        html += "<div class='item'><div class='card rrmEntryPointRecommended item-card card-block'><h5 class='mt-3 mb-3'><b>L1 Interviews <br>Recommended</b></h5><h2 id='cardL1InterviewsRecommendedRRMNew"+options.data.RRMId+"'>NA</h2></div></div>"
                        html += "<div class='item'><div class='card rrmEntryPointNotRecommended item-card card-block'><h5 class='mt-3 mb-3'><b>L1 Interviews <br>Not Recommended</b></h5><h2 id='cardL1InterviewsNotRecommendedRRMNew"+options.data.RRMId+"'>NA</h2></div></div>"
                        html += "<div class='item'><div class='card rrmEntryPointL1OnHold item-card card-block'><h5 class='mt-3 mb-3'><b>L1 Interviews <br>On Hold</b></h5><h2 id='cardL1InterviewsOnHoldRRMNew"+options.data.RRMId+"'>NA</h2></div></div>"
                        html += "<div class='item'><div class='card rrmEntryPointL1InterviewsScheduled item-card card-block'><h5 class='mt-3 mb-3'><b>L2 Interviews <br>Conducted</b></h5><h2 id='cardL2InterviewsConductedRRMNew"+options.data.RRMId+"'>NA</h2></div></div>"
                        html += "<div class='item'><div class='card rrmEntryPointL1InterviewsConducted item-card card-block'><h5 class='mt-3 mb-3'><b>L2 Interviews <br>Recommended</b></h5><h2 id='cardL2InterviewsRecommendedRRMNew"+options.data.RRMId+"'>NA</h2></div></div>"
                        html += "<div class='item'><div class='card rrmEntryPointL2InterviewsScheduled item-card card-block'><h5 class='mt-3 mb-3'><b>L2 Interviews <br>Not Recommended</b></h5><h2 id='cardL2InterviewsNotRecommendedRRMNew"+options.data.RRMId+"'>NA</h2></div></div>"
                        html += "<div class='item'><div class='card rrmEntryPointL2OnHold item-card card-block'><h5 class='mt-3 mb-3'><b>L2 Interviews <br>On Hold</b></h5><h2 id='cardL2InterviewsOnHoldRRMNew"+options.data.RRMId+"'>NA</h2></div></div>"
                        html += "<div class='item'><div class='card rrmEntryPointL2InterviewsConducted item-card card-block'><h5 class='mt-3 mb-3'><b>Offers <br>Accepted</b></h5><h2 id='cardOfferAcceptedRRMNew"+options.data.RRMId+"'>NA</h2></div></div>"
                     
                        html += "</div></div>"


                        



                        //start
                        // html += "<div class='row ' style='display: flex; margin-top:1%;'>";                                                                                                  
                        // html += "<div class='cardDetailsTrackerNew'>"

                       
                        // html += "</div></div>"

                        // html += "<div class='row mt-1' style='display: flex;margin-top:1%;'>";                                                                                                  
                        // html += "<div class='cardDetailsTrackerNew'>"

                        // html += "<div class='item'><div class='card rrmEntryPointOfferMade item-card card-block'><h5 class='mt-3 mb-3'><b>Offer Made</b></h5><h2 id='cardOfferMadeRRMNew"+options.data.RRMId+"'>NA</h2></div></div>"
                        // html += "<div class='item'><div class='card rrmEntryPointOfferAccepted item-card card-block'><h5 class='mt-3 mb-3'><b>Offer Accepted</b></h5><h2 id='cardOfferAcceptedRRMNew"+options.data.RRMId+"'>NA</h2></div></div>"

                        // html += "</div></div>"


                        container.append(html);

                    $("<div id='rrmGridEntryPointMasterDetailView-"+options.key+"'>")
                        .dxDataGrid({
                           // columnAutoWidth: true,
                            showBorders: true,
                            keyExpr:"Id",  
                            searchPanel: {
                                visible: true,
                                width: 240,
                                placeholder: "Search..."
                            },
                            grouping: {
                                contextMenuEnabled: true
                            },
                            groupPanel: {
                                visible: true   
                            },
                            headerFilter: { 
                                visible: true
                            },
                            // dataSource: new DevExpress.data.DataSource({
                            //     store: new DevExpress.data.ArrayStore({
                            //         key: "Id",
                            //         data: candidatesForRRM
                            //     }),
                            //     filter: ["RRMId", "=", options.key]
                            // }),
                            onToolbarPreparing: function (e) {                                
                                e.toolbarOptions.items.unshift({
                                    location: "after",
                                    widget: "dxButton",
                                    options: {
                                        onClick: function () {                            
                                            trackCandidatesRRMOwner(options.key)
                                        },
                                        stylingMode: "contained",
                                        text: "Summary",
                                        type: "normal",
                                        icon:"fa fa-list",
                                        elementAttr: {
                                            class: "summary-button"
                                        },
                                        width:120
                                    }
                                });
                            },                       
                            columns: [
                                {
                                    caption: "#", dataField: "RRMNo", allowFiltering: false, allowGrouping: false, allowReordering: false, allowSorting: false, allowCollapsing: false,width:70,
                                    cellTemplate: function (container, options) {
                                        container.text(options.rowIndex + 1);
                                    }
                                },
                                {
                                    dataField: "CandidateName",
                                    caption: "Candidate"
                                },
                                {
                                    dataField: "InterviewerName",
                                    caption: "Interviewer",
                                    alignment: "left",
                                    // cellTemplate: function (container, options) {                        
                                    //     var domActions = "";
                                    //     if(options.data.OfferStatus == ""){
                                    //         if (options.data.InterviewerName == null || options.data.InterviewerName.trim() == "") {
                                    //             domActions += "<span></span>";
                                    //         } 
                                    //         else{
                                    //             domActions += "<span>"+options.data.InterviewerName+"</span>";
                                    //         }
                                    //     }                                        
                                    //     $("<div>").append($(domActions)).appendTo(container);
                                    // }
                                },
                                {
                                    dataField: "Recruiter",
                                    caption: "Recruiter"
                                },
                                {
                                    dataField: "StatusName",
                                    caption: "Type",
                                    alignment: "left",
                                    // cellTemplate: function (container, options) {                        
                                    //     var domActions = "";
                                    //     if(options.data.OfferStatus == ""){
                                    //         if (options.data.StatusName == null || options.data.StatusName == "") {
                                    //             domActions += "<span></span>";
                                    //         } 
                                    //         else{
                                    //             domActions += "<span>"+options.data.StatusName+"</span>";
                                    //         }
                                    //     }                                        
                                    //     $("<div>").append($(domActions)).appendTo(container);
                                    // }
                                },
                                {
                                    dataField: "ModeName",
                                    caption: "Mode",
                                    alignment: "left",
                                    // cellTemplate: function (container, options) {                        
                                    //     var domActions = "";
                                    //     if(options.data.OfferStatus == ""){
                                    //         if (options.data.ModeName == null || options.data.ModeName == "") {
                                    //             domActions += "<span>-</span>";
                                    //         } 
                                    //         else{
                                    //             domActions += "<span>"+options.data.ModeName+"</span>";
                                    //         }
                                    //     }
                                    //     $("<div>").append($(domActions)).appendTo(container);
                                    // }
                                },
                                {
                                    dataField: "InterviewDate",
                                    caption: "Interview Date",
                                    alignment: "left",
                                },
                            

                                // {
                                //     dataField: "InterviewDate",
                                //     caption: "Date",
                                //     alignment: "left",
                                //     cellTemplate: function (container, options) {                        
                                //         var domActions = "";
                                //         if(options.data.OfferStatus == ""){
                                //             if (options.data.InterviewDate == null || options.data.InterviewDate == "") {
                                //                 domActions += "<span></span>";
                                //             } 
                                //             else{
                                //                 domActions += "<span>"+options.data.InterviewDate+"</span>";
                                //             }
                                //         }
                                //         $("<div>").append($(domActions)).appendTo(container);
                                //     }
                                // },
                                {
                                    dataField: "InterviewTime",
                                    caption: "Interview Time",
                                    dataType:"time",
                                    alignment: "left",
                                    // cellTemplate: function (container, options) {       
                                    //     var domActions = "";
                                    //     if(options.value != null && options.value != "" ){
                                    //         domActions += "<span>"+options.value+"</span>";
                                    //     }
                                    //     else{
                                    //         domActions += "<span></span>";
                                    //     }
                                    //     $("<div>").append($(domActions)).appendTo(container);
                                    // }
                                },
                                {
                                    dataField: "OfferDate",
                                    caption: "Offer Date",
                                    alignment: "left",
                                },
                                {
                                    dataField: "Status",
                                    caption: "Interview Status",
                                    cellTemplate: function (container, options) {                        
                                        var domActions = "";
                                        if(options.data.OfferStatus == ""){
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
                                        }
                                        else{
                                            if(options.data.OfferStatus == "0"){
                                                domActions += "<label class='label label-info m-l-sm'>Yet to accept</label>";
                                            }
                                            else if(options.data.OfferStatus == "1"){
                                                domActions += "<label class='label label-danger m-l-sm'>Offer Rejected</label>";
                                            }
                                            else if(options.data.OfferStatus == "2"){
                                                domActions += "<label class='label label-success m-l-sm'>OFFERED</label>";
                                            }
                                        }
                                        $("<div class='text-left'>").append($(domActions)).appendTo(container);
                                    }, fixedPosition: "right", fixed: true, hidingPriority: 0
                                },
                                {
                                    caption:"Summary", 
                                    dataField:"CandidateId",
                                    allowGrouping: false,
                                    width:80,
                                    allowCollapsing: false,
                                    allReordering:false,
                                    allowFiltering: false,
                                    cellTemplate: function (container, options) {                                        
                                      $("<div class='text-center'>")
                                      .append("<button class='btn btn-xs btn-primary edit-btn rrm-candidate-tracker' data-rrmId = '"+options.data.RRMId+"' data-candidateId = '"+options.data.CandidateId+"'><i title='Summary' class='fa fa-list'></i></button >")
                                      .appendTo(container);
                                    }, fixedPosition: "right", allowExporting: false
                                }
                            ]                                                       
                        }).appendTo(container);
                }
            }
        }).dxDataGrid("instance");
    };

    

    //Grid exporting
    function onExportingRRM(e) {
        var selectedRowsData= e.component.getSelectedRowsData();
        if(selectedRowsData.length === 1){
            exportSingleRRMEntry(selectedRowsData[0],e);
        }
        else{
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('RRM');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true,
                customizeCell: function(options) {
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
                        if(gridCell.column.caption === "RRM Type") {
                            excelCell.font = { color: { argb: 'FFFFFF' } };
                            var dataVal = gridCell.data.ResourceRequirementType;
                            if(dataVal === "G"){
                                excelCell.value = "RRM"
                                excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "5CB85C" } };
                            }
                            if(dataVal === "P"){
                                excelCell.value = "RFP"
                                excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "5BC0DE" } };
                            }
                            if(dataVal === "R"){
                                excelCell.value = "Resignation"
                                excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "F0AD4E" } };
                            } 
                        }
                        if(gridCell.column.caption === "Priority") {
                            excelCell.font = { color: { argb: 'FFFFFF' } };
                            var dataVal = gridCell.data.PriorityName;
                            if(dataVal === "Low"){
                                excelCell.value = dataVal
                                excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "5BC0DE" } };
                            }
                            if(dataVal === "Medium"){
                                excelCell.value = "RFP"
                                excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "F0AD4E" } };
                            }
                            if(dataVal === "High"){
                                excelCell.value = "Resignation"
                                excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "D9534F" } };
                            } 
                        }
                    }
                }
                }).then(function(dataGridRange) {
                    setBorders( worksheet, dataGridRange);
                    return Promise.resolve();
                    }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'RRM.xlsx');
                });
            });
            e.cancel = true;
        }
    }

    //Loads the grid from front end at this point
    _rrmGrid.getRRMEntryTable = function () {
        var filterData = JSON.stringify({
            "IsActive": true
        });

        callGetListAsync('GetRRM', filterData, function (e) {
            _rrmGrid.ui.rrmGridReport.dxDataGrid({ dataSource: e })
            // try{
            //     _rrmGrid.ui.rrmGridReport.dxDataGrid('instance').refresh();
            // }
            // catch(ex){

            // }
        });
      
    }

    mapUI();
    return _rrmGrid;
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

function exportSingleRRMEntry(data,e){

    var workbook = new ExcelJS.Workbook();
    var rrmId = data.RRMId;
    var filter_val = JSON.stringify(
        {
            "IsActive": true,
            "ResourceRequirementId": rrmId
        }
    );
    var filter_val1 = JSON.stringify(
        {
            "RRMId": rrmId
        }
    );
    var result = callgetlist('GetRRMById', filter_val);
    var interviewersList = [];
    var interviewerResult = callgetlist('GetMappedInterviewersForRRM', filter_val1);
    console.log(interviewerResult,"Hello")
    $(interviewerResult).each(function(idx,obj){
        interviewersList.push(obj.Name)
    });

    var rrmDetails = result[0];

    var requirementDetailsSheet = workbook.addWorksheet('Requirement Details');
    var skillMappingsSheet = workbook.addWorksheet('Skill Mappings');
    var planADetailsSheet = workbook.addWorksheet('Plan A');
    var planBDetailsSheet = workbook.addWorksheet('Plan B');

    generateRequirementDetails(requirementDetailsSheet,rrmDetails,interviewersList);
    generatePlanADetails(planADetailsSheet,rrmDetails);
    generatePlanBDetails(planBDetailsSheet,rrmDetails)
    getRRMSkillsForExport(rrmId)
    var skillGrid = $("#skillForRRMExport").dxDataGrid("instance");

    var headerFontStyles = { bold: true, size: 16, underline: "none", color: { argb: 'FFFFFF' } };
    var columnFillStyles = { type: "pattern", pattern: "solid", fgColor: { argb: "777777" }, bgColor: { argb: "777777" } };
    skillMappingsSheet.mergeCells('A1:C1');
    skillMappingsSheet.getRow(1).getCell(1).value = "Skill Mapping";
    skillMappingsSheet.getRow(1).getCell(1).font = headerFontStyles;
    skillMappingsSheet.getRow(1).getCell(1).alignment = { horizontal:'center'} ;
    skillMappingsSheet.getRow(1).getCell(1).fill = columnFillStyles

    setTimeout(() => {
        DevExpress.excelExporter.exportDataGrid({
            component: skillGrid,
            worksheet: skillMappingsSheet,
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
            setBorders( skillMappingsSheet, dataGridRange);
        }).then(function () {
            workbook.xlsx.writeBuffer().then(function (buffer) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), "RRM-"+rrmDetails.RequirementName+".xlsx");
                $("#skillForRRMExport").dxDataGrid("instance").dispose();
            });
        });
    }, 500);
    
    e.cancel = true;
}


function generateRequirementDetails(requirementDetailsSheet,rrmDetails,interviewersList){
    console.log(interviewersList);
    var headerFontStyles = { bold: true, size: 16, underline: "none", color: { argb: 'FFFFFF' } };
    var columnFillStyles = { type: "pattern", pattern: "solid", fgColor: { argb: "777777" }, bgColor: { argb: "777777" } };
    var fontStyles = { bold: true };

    requirementDetailsSheet.columns = [  
        { width: 30 }, { width: 30 }
    ];  
    requirementDetailsSheet.mergeCells('A1:B1');

    requirementDetailsSheet.getRow(1).getCell(1).value = "Requirement Details";
    requirementDetailsSheet.getRow(1).getCell(1).font = headerFontStyles;
    requirementDetailsSheet.getRow(1).getCell(1).alignment = { horizontal:'center'} ;
    requirementDetailsSheet.getRow(1).getCell(1).fill = columnFillStyles
    
    requirementDetailsSheet.getRow(2).getCell(1).value = "Requirement Name"
    requirementDetailsSheet.getRow(2).getCell(1).font = fontStyles
    requirementDetailsSheet.getRow(2).getCell(2).value = rrmDetails.RequirementName
    requirementDetailsSheet.getRow(2).getCell(2).alignment = { horizontal:'left'} ;

    requirementDetailsSheet.getRow(3).getCell(1).value = "Required For"
    requirementDetailsSheet.getRow(3).getCell(1).font = fontStyles
    requirementDetailsSheet.getRow(3).getCell(2).value = rrmDetails.RequiredFor
    requirementDetailsSheet.getRow(3).getCell(2).alignment = { horizontal:'left'} ;

    requirementDetailsSheet.getRow(4).getCell(1).value = "Number Of Positions"
    requirementDetailsSheet.getRow(4).getCell(1).font = fontStyles
    requirementDetailsSheet.getRow(4).getCell(2).value = rrmDetails.NumberOfPositions
    requirementDetailsSheet.getRow(4).getCell(2).alignment = { horizontal:'left'} ;

    requirementDetailsSheet.getRow(5).getCell(1).value = "Priority"
    requirementDetailsSheet.getRow(5).getCell(1).font = fontStyles
    requirementDetailsSheet.getRow(5).getCell(2).value = rrmDetails.PriorityName
    requirementDetailsSheet.getRow(5).getCell(2).alignment = { horizontal:'left'} ;

    requirementDetailsSheet.getRow(6).getCell(1).value = "Department"
    requirementDetailsSheet.getRow(6).getCell(1).font = fontStyles
    requirementDetailsSheet.getRow(6).getCell(2).value = rrmDetails.Department
    requirementDetailsSheet.getRow(6).getCell(2).alignment = { horizontal:'left'} ;

    requirementDetailsSheet.getRow(7).getCell(1).value = "Designation"
    requirementDetailsSheet.getRow(7).getCell(1).font = fontStyles
    requirementDetailsSheet.getRow(7).getCell(2).value = rrmDetails.Designation
    requirementDetailsSheet.getRow(7).getCell(2).alignment = { horizontal:'left'} ;

    requirementDetailsSheet.getRow(8).getCell(1).value = "Communication"
    requirementDetailsSheet.getRow(8).getCell(1).font = fontStyles
    requirementDetailsSheet.getRow(8).getCell(2).value = rrmDetails.Communication
    requirementDetailsSheet.getRow(8).getCell(2).alignment = { horizontal:'left'} ;

    requirementDetailsSheet.getRow(9).getCell(1).value = "Location"
    requirementDetailsSheet.getRow(9).getCell(1).font = fontStyles
    requirementDetailsSheet.getRow(9).getCell(2).value = rrmDetails.Location
    requirementDetailsSheet.getRow(9).getCell(2).alignment = { horizontal:'left'} ;

    requirementDetailsSheet.getRow(10).getCell(1).value = "Experience Required"
    requirementDetailsSheet.getRow(10).getCell(1).font = fontStyles
    requirementDetailsSheet.getRow(10).getCell(2).value = rrmDetails.ExperiencerequiredInYrs
    requirementDetailsSheet.getRow(10).getCell(2).alignment = { horizontal:'left'} ;

    requirementDetailsSheet.getRow(11).getCell(1).value = "Interviewers"
    requirementDetailsSheet.getRow(11).getCell(1).font = fontStyles
    requirementDetailsSheet.getRow(11).getCell(2).value = interviewersList.toString();
    requirementDetailsSheet.getRow(11).getCell(2).alignment = { horizontal:'left'} ;

    requirementDetailsSheet.getRow(12).getCell(1).value = "Requested Date"
    requirementDetailsSheet.getRow(12).getCell(1).font = fontStyles
    requirementDetailsSheet.getRow(12).getCell(2).value = rrmDetails.RequestedDateFormat
    requirementDetailsSheet.getRow(12).getCell(2).alignment = { horizontal:'left'} ;

    requirementDetailsSheet.getRow(13).getCell(1).value = "Requirement Lead"
    requirementDetailsSheet.getRow(13).getCell(1).font = fontStyles
    requirementDetailsSheet.getRow(13).getCell(2).value = rrmDetails.Owner
    requirementDetailsSheet.getRow(13).getCell(2).alignment = { horizontal:'left'} ;
}

function generatePlanADetails(planADetailsSheet,rrmDetails){
    var headerFontStyles = { bold: true, size: 16, underline: "none", color: { argb: 'FFFFFF' } };
    var columnFillStyles = { type: "pattern", pattern: "solid", fgColor: { argb: "777777" }, bgColor: { argb: "777777" } };
    var fontStyles = { bold: true };

    planADetailsSheet.columns = [  
        { width: 30 }, { width: 30 }
    ]; 

    planADetailsSheet.mergeCells('A1:B1');
    planADetailsSheet.getRow(1).getCell(1).value = "Plan A";
    planADetailsSheet.getRow(1).getCell(1).font = headerFontStyles;
    planADetailsSheet.getRow(1).getCell(1).alignment = { horizontal:'center'} ;
    planADetailsSheet.getRow(1).getCell(1).fill = columnFillStyles

    planADetailsSheet.getRow(2).getCell(1).value = "Skill Details"
    planADetailsSheet.getRow(2).getCell(1).font = fontStyles
    planADetailsSheet.getRow(2).getCell(2).value = removeHtmlTags(rrmDetails["PlanA-SkillPlanInfo"]);
    planADetailsSheet.getRow(2).getCell(2).alignment = { horizontal:'left'} ;

    planADetailsSheet.getRow(3).getCell(1).value = "To On Board"
    planADetailsSheet.getRow(3).getCell(1).font = fontStyles
    planADetailsSheet.getRow(3).getCell(2).value = rrmDetails["PlanA-OnBoardDateFormat"];
    planADetailsSheet.getRow(3).getCell(2).alignment = { horizontal:'left'} ;

    planADetailsSheet.getRow(4).getCell(1).value = "Recruiters"
    planADetailsSheet.getRow(4).getCell(1).font = fontStyles
    planADetailsSheet.getRow(4).getCell(2).value = rrmDetails.PlanARecruiters
    planADetailsSheet.getRow(4).getCell(2).alignment = { horizontal:'left'} ;

}

function generatePlanBDetails(planBDetailsSheet,rrmDetails){
    var headerFontStyles = { bold: true, size: 16, underline: "none", color: { argb: 'FFFFFF' } };
    var columnFillStyles = { type: "pattern", pattern: "solid", fgColor: { argb: "777777" }, bgColor: { argb: "777777" } };
    var fontStyles = { bold: true };

    planBDetailsSheet.columns = [  
        { width: 30 }, { width: 30 }
    ]; 

    planBDetailsSheet.mergeCells('A1:B1');
    planBDetailsSheet.getRow(1).getCell(1).value = "Plan B";
    planBDetailsSheet.getRow(1).getCell(1).font = headerFontStyles;
    planBDetailsSheet.getRow(1).getCell(1).alignment = { horizontal:'center'} ;
    planBDetailsSheet.getRow(1).getCell(1).fill = columnFillStyles

    planBDetailsSheet.getRow(2).getCell(1).value = "Skill Details"
    planBDetailsSheet.getRow(2).getCell(1).font = fontStyles
    planBDetailsSheet.getRow(2).getCell(2).value = removeHtmlTags(rrmDetails["PlanB-SkillPlanInfo"].replace(/"/g, "'"))
    planBDetailsSheet.getRow(2).getCell(2).alignment = { horizontal:'left'} ;

    planBDetailsSheet.getRow(3).getCell(1).value = "To On Board"
    planBDetailsSheet.getRow(3).getCell(1).font = fontStyles
    planBDetailsSheet.getRow(3).getCell(2).value = rrmDetails["PlanB-OnBoardDateFormat"]
    planBDetailsSheet.getRow(3).getCell(2).alignment = { horizontal:'left'} ;

    planBDetailsSheet.getRow(4).getCell(1).value = "Recruiters"
    planBDetailsSheet.getRow(4).getCell(1).font = fontStyles
    planBDetailsSheet.getRow(4).getCell(2).value = rrmDetails.PlanBRecruiters
    planBDetailsSheet.getRow(4).getCell(2).alignment = { horizontal:'left'} ;

}

function getRRMSkillsForExport(rrmId){
    var filter_val = JSON.stringify({
        "ResourceRequirementId ": rrmId,
        "IsActive": "True",
        "Token": Token
    });

    var RRMSkills = callgetlist('GetResourceRequrirementSkill', filter_val);

    $("#skillForRRMExport").dxDataGrid({
        dataSource:RRMSkills,
        export: {
            enabled: true,
            allowExportSelectedData: true,
        },
        showBorders: true,
        showRowLines:true,
        showColumnLines:true,
        columns:[
            {
                dataField:"SkillFamily",
                caption:"Family"
            },
            {
                dataField:"Skill",
                caption:"Skill"
            },
            {
                dataField:"SkillVersion",
                caption:"Version"
            }
        ]
    }).dxDataGrid("instance");
}

function removeHtmlTags(str) {
    if ((str===null) || (str===''))
    return false;
    else
    str = str.toString();
    return str.replace( /(<([^>]+)>)/ig, '');
}

var RRMIdCommon =null;

function GetRRMCommentsEntryPoint(RRMId,RRMNo){
    
    if(RRMNo != null && RRMNo !="" && RRMNo !=undefined){
        $("#RRMEntryPointCommentsRRMNo").html("- " +RRMNo);
    }   
    $('#rrm_common_comments').appendTo("body").modal("show");
    getManageCommonCommentHistory(RRMId);
    var editor = CKEDITOR.instances.sd_txtEditor_RRMComments_common;
        if (editor) {
            editor.destroy(true);
        }
        $("#sd_txtEditor_RRMComments_common").dxHtmlEditor('instance').option('value',"");

}

function bindCommonForRRMComments(){
    
    var commentsEditor = $("#sd_txtEditor_RRMComments_common").dxHtmlEditor({
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
        mentions: [{
            dataSource: interviewersData,
            searchExpr: "EmployeeName",
            displayExpr: "EmployeeName",
            valueExpr: "EmployeeId",
            marker:"@"
        },
        {
            dataSource: rrmData,
            searchExpr: "RRMName",
            displayExpr: "RRMName",
            valueExpr: "RRMId",
            marker:"#"
        }]
    });

    var mentionToolTipRRM = $("#sd_popover_RRMmentions_common").dxPopover({
        showEvent: "mouseenter",
        //hideEvent: "mouseleave",
        closeOnOutsideClick: true,
        position: "top"        
    });
}

$(document).on("mouseover", "#rrm_common_comments .dx-mention", function (e) {
    var Id = $(e.currentTarget).data("id");
    var MentionType = $(e.currentTarget).data("marker");
    var Target = $(e.currentTarget);
    LoadTooltipForMentionRRMCommon(Id,MentionType,Target);
});

function LoadTooltipForMentionRRMCommon(Id,MentionType,Target){
    if(MentionType == "@"){  
        var filterData = JSON.stringify({
            "IsActive": true,
            "EmployeeIdForMention":Id
        });
        callGetListAsync('GetEmployeeDetailsForMentions', filterData, function(e){
            var Details = e[0];
            $("#sd_popover_RRMmentions_common").dxPopover('instance').option('target',Target);  
            $("#sd_popover_RRMmentions_common").dxPopover('instance').option("contentTemplate",function(data) {
                var html = "<div class='row'><div class='col-md-2'><img id='img-"+Details.EmployeeName+"' src='"+Details.ProfilePicture+"' class='img-circle interviewer-image' width='40px' height='40px'></img></div>"
                    html += "<div class='col-md-10'><b> "+Details.EmployeeName+"</b><br/><i class='fas fa-envelope'></i> &nbsp;<a href='mailto:" + Details.CorporateEmailID + "' target='_blank'>"+Details.CorporateEmailID+"</a><div>"
                    html += "</div>";
                    data.html(html);
            });         
        });   
        
    }
    if(MentionType == "#"){        
        var filterData = JSON.stringify({
            "IsActive": true,
            "ResourceRequirementId":Id
        });
        callGetListAsync('GetRRMDetailsForMentions', filterData, function(e){
            var Details = e[0];
            $("#sd_popover_RRMmentions_common").dxPopover('instance').option('target',Target);  
            $("#sd_popover_RRMmentions_common").dxPopover('instance').option("contentTemplate",function(data) {
                var html = "<table class='table table-borderless' style='margin-bottom:0px'><tbody>"
                html += "<tr><td><b>RRM Name</b></td><td><b>: </b>"+Details.RRMName+"</td><td><b>RRM No</b></td><td><b>: </b>"+Details.RRMNo+"</td></tr>";
                html += "<tr><td><b>Required For</b></td><td><b>: </b>"+Details.RequiredFor+"</td><td><b>Lead Name</b></td><td><b>: </b>"+Details.LeadName+"</td></tr>";
                html += "<tr><td><b>Department</b></td><td><b>: </b>"+Details.DepartmentName+"</td><td><b>Designation</b></td><td><b>: </b>"+Details.DesignationName+"</td></tr>";
                html += "<tr><td><b>Skills</b></td><td colspan='3'><b>: </b>"+Details.SkillName+"</td></tr>";
                html += "</tbody></table>"; 
                data.html(html);
            });         
        });
    }
}

 function getManageCommonCommentHistory(ResourceRequirementId) {
    RRMIdCommon = ResourceRequirementId;
    var filter_val = JSON.stringify({
        "ResourceRequirementId": ResourceRequirementId,
        "IsActive": 'True',
        "Token": Token
    });
    //  var getManageplanComments = callgetlist("GetCommentsInResourceRequirement", filter_val);
    callGetListAsync('GetCommentsInResourceRequirement', filter_val, function (getManageplanComments) {
        var plan_no_comments_count = 0;
        var plan_no_documentsCount = 0;
        var plan_comment_history_html = ""; 
        getManageplanComments.forEach(function (item) {
            var plan_created_date = new Date(item.CreatedDate);
            var plan_date_month_year = plan_created_date.toLocaleDateString();
            var plan_time = plan_created_date.toLocaleTimeString();

            if(item.CreatedBy != localStorage.getItem("EmployeeID")){
                plan_comment_history_html += "<div style='width:100%;display:flow-root'><div class='message dx-theme-background-color'>"
                plan_comment_history_html += "<div class='name'>"+item.CreatedByName+"</div>"
                plan_comment_history_html += "<div class='date'>"+ plan_date_month_year+" " + plan_time +"</div>"
                plan_comment_history_html += "<div class='text'>"+item.Comments+"</div></div></div>";
            }
            else{
                plan_comment_history_html += "<div style='width:100%;display:flow-root'><div class='message dx-theme-background-color' style='float:right;background-color:rgb(225, 247, 223) !important'>"
                plan_comment_history_html += "<div class='date'>"+ plan_date_month_year+" " + plan_time +"</div>"
                plan_comment_history_html += "<div class='text'>"+item.Comments+"</div></div></div>";
            }

        });
        $("#rrm_common_manage_plan_comments_documents").show();
        $("#rrm_common_manage_plan_comments_documents").html(plan_comment_history_html);
        var div = document.getElementById('rrm_common_manage_plan_comments_documents');
        div.scrollTop = div.scrollHeight - div.clientHeight;
    })
}

function saveCommonComments(){
    var finalComments = $("#sd_txtEditor_RRMComments_common").dxHtmlEditor('instance').option('value');

    if (finalComments == "" || finalComments == null || finalComments == undefined) {
        swal({
            title: "Warning!",
            text: "Please Add Comments",
            icon: "warning",
            button: "ok!",
        })
    }
    else{
        var dataComment = {
            "Method": "PostOnHoldCommentsInResourceRequirement",
            "Data": {
                "Token": Token,
                "OnHoldByClient": "false",
                "OnHoldByOwner": "false",
                "ResourceRequirementId": RRMIdCommon,
                "Comments": finalComments.toString(),
                "IsActive": 'True'
            }
        }
        
        PostDataCallAsync(dataComment, function (resultComments) {
            if (resultComments['IsSuccess'] == true) {
            swal({
                title: "Success!",
                text: "Saved Successfully!",
                icon: "success",
                button: "ok!",
            })           
            $("#rrm_common_manage_plan_comments_documents").empty();
            getManageCommonCommentHistory(RRMIdCommon);
            $("#sd_txtEditor_RRMComments_common").dxHtmlEditor('instance').option('value',"");
        }   
        else{
            swal({
                title: "Warning!",
                text: "Something Went Wrong",
                icon: "warning",
                button: "ok!",
            })
            $("#sd_txtEditor_RRMComments_common").dxHtmlEditor('instance').option('value',"");
        }  
        });
    }
}

function closeRRMCommon(){
    $('#rrm_common_comments').modal("hide");
    $("#sd_txtEditor_RRMComments_common").dxHtmlEditor('instance').option('value',"");
    RRMIdCommon = null;
    var editor = CKEDITOR.instances.sd_txtEditor_RRMComments_common;
        if (editor) {
            editor.destroy(true);
        }
        CKEDITOR.replace('sd_txtEditor_RRMComments_common');
};

    var fromDate;
    var toDate;

    function rrmdateranges(RRMIdDF) {
        fromDate =  $("#rrm_resource_requirement_fromDate_"+RRMIdDF).dxDateBox("instance").option("value");
        toDate = $("#rrm_resource_requirement_toDate_"+RRMIdDF).dxDateBox("instance").option("value");;
        
        GetAllRRMCountByRRMId(RRMIdDF,fromtodateFormat(fromDate),fromtodateFormat(toDate));
    };

    function rrmdaterangesToday(RRMIdDF) {
        var date = new Date();
        var fromDate = fromtodateFormat(date);
        var toDate = fromtodateFormat(date);
        $("#rrm_resource_requirement_fromDate_"+RRMIdDF).dxDateBox("instance").option("value",fromDate);
        $("#rrm_resource_requirement_toDate_"+RRMIdDF).dxDateBox("instance").option("value",toDate);

        
        GetAllRRMCountByRRMId(RRMIdDF,fromtodateFormat(fromDate),fromtodateFormat(toDate));
    };

    function rrmdaterangesYesterday(RRMIdDF) {
        var today = new Date();
        var yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        var fromDate = fromtodateFormat(yesterday);
        var toDate = fromtodateFormat(yesterday);
       
        $("#rrm_resource_requirement_fromDate_"+RRMIdDF).dxDateBox("instance").option("value",fromDate);
        $("#rrm_resource_requirement_toDate_"+RRMIdDF).dxDateBox("instance").option("value",toDate);

        
        GetAllRRMCountByRRMId(RRMIdDF,fromtodateFormat(fromDate),fromtodateFormat(toDate));
    };


    function loadMasterDetailsCountRRMEntry(RRMId,fromDate,toDate){
        
        GetAllRRMCountByRRMId(RRMId,fromtodateFormat(fromDate),fromtodateFormat(toDate));
    };
   
    function GetAllRRMCountByRRMId(RRMId,fromDate,toDate) {
        var filterData = JSON.stringify({
            "Token":Token,
            "RRMId":RRMId,
            "FromDate":fromDate,
            "ToDate":toDate,
            "IsActive": true
        });  
      

        console.log(filterData);
       // callGetListAsync('GetCardDetailsForTrackerNewRRMEntryPoint', filterData, function (data) {
    //     if(data!=undefined && data.length>0){
    //         $("#cardL1InterviewsConductedRRMNewRecruiter"+RRMId).html(data[0].Interviews);
    //         $("#cardL1InterviewsRecommendedRRMNewRecruiter"+RRMId).html(data[0].Recommended);
    //         $("#cardL1InterviewsNotRecommendedRRMNewRecruiter"+RRMId).html(data[0].NotRecommended);
    //     }  
    // });
    
    callGetListAsync('GetAllRRMCountByRRMId', filterData, function (data) {
        debugger
        if(data!=undefined && data.length>0){
            console.log(data[0].L1InterviewsConducted);
            $("#cardL1InterviewsConductedRRMNew"+RRMId).html(data[0].L1interviewsconducted);
            $("#cardL1InterviewsRecommendedRRMNew"+RRMId).html(data[0].L1interviewrecommended);
            $("#cardL1InterviewsNotRecommendedRRMNew"+RRMId).html(data[0].L1interviewnotrecommended);
            $("#cardL1InterviewsOnHoldRRMNew"+RRMId).html(data[0].L1InterviewsOnHold);
            
            $("#cardL2InterviewsConductedRRMNew"+RRMId).html(data[0].L2interviewsconducted);
            $("#cardL2InterviewsRecommendedRRMNew"+RRMId).html(data[0].L2interviewrecommended);
            $("#cardL2InterviewsNotRecommendedRRMNew"+RRMId).html(data[0].L2interviewnotrecommended);
            $("#cardL2InterviewsOnHoldRRMNew"+RRMId).html(data[0].L2InterviewsOnHold);
            
            // $("#cardL2InterviewsConductedRRMNewRecruiter"+RRMId).html(data[0].L2InterviewConducted);                
            // $("#cardOfferMadeRRMNewRecruiter"+RRMId).html(data[0].OfferMade);
            $("#cardOfferAcceptedRRMNew"+RRMId).html(data[0].Offersaccepted);
        }
        });
    

        var filterData = JSON.stringify({
            "RRMId": RRMId,
            "IsActive": true
        });
        callGetListAsync('GetAllCandidatesInterview', filterData, function(e){
            debugger
            $("#rrmGridEntryPointMasterDetailView-"+RRMId).dxDataGrid({dataSource:e});
    
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
  };