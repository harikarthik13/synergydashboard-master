RRMEntryPointGridMarketingHead = (function (pageId) {
    var _rrmGrid = {}
    _rrmGrid.ui ={};

    //Maps UI component with variables
    function mapUI() {
        _rrmGrid.ui.rrmGridReport = $("#rrmGridReport"+pageId);
        initialize();
    }

    //Initialize the page
    function initialize(){
        renderrrmentrypointreportGrid();
    }

    //Grid for RRM entry point
    function renderrrmentrypointreportGrid(){
        var dataGrid = _rrmGrid.ui.rrmGridReport.dxDataGrid({
            filterRow: {
                visible: true,
                applyFilter: "auto"
            },
            repaintChangesOnly: true,
            highlightChanges: true,
        // stateStoring: {
        //     enabled: true,
        //     type: "localStorage",
        //     storageKey: "rrmentrypointgrid"+pageId
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
                emptyPanelText:"Drag a column"
            },
            sorting: {
                mode: "multiple"
            },
            
              editing: {
                  mode: "popup",
                  allowAdding: false,
                  allowUpdating: false,
                  useIcons: true
                  },
                 columnChooser: {
                    enabled: true
                },
                rowAlternationEnabled:true,
                onExporting:onExportingRRM,
                columnFixing: {
                    enabled: true
            },
            onToolbarPreparing: function (e) {
                var dataGrid = e.component;
                e.toolbarOptions.items.unshift({
                    location: "after",
                    widget: "dxButton",
                    options: {
                        icon: "refresh",
                        onClick: function () {
                            _rrmGrid.getRRMEntryTable();
                            dataGrid.refresh();
                        }
                    }
                })
            },
            columns: [
                {caption:"RRM No", dataField:"RRMNo", allowGrouping: false,allowCollapsing: false,allReordering:false, fixed: true, hidingPriority: 0},
                {caption:"Owner", dataField:"Owner"},
                {caption:"Requiremnet Name", dataField:"RequirementName"},
                {caption:"Required For", dataField:"RequiredFor"},
                {
                    caption: "On-Board Date",
                    dataField: "PlanA-OnBoardDate",
                    allowEditing: false,
                    dataType: "date",
                    displayFormat: "yyyy-mm-dd"

                },
                {
                    caption: "On-Board Date PlanB",
                    dataField: "PlanB-OnBoardDate",
                    allowEditing: false,
                    dataType: "date",
                    displayFormat: "yyyy-mm-dd"

                },
                { caption: "Priority", dataField: "Priorityname" },  
                { caption: "PlanA Recruiters (HR name)", dataField: "PlanARecruiters" },
                { caption: "PlanB Recruiters (HR name)", dataField: "PlanBRecruiters" },
                //{caption:"Recriter(HR name)", dataField:"Recriter",visible:false, hidingPriority: 0},
                { caption: "No.Of Interviews Scheduled", dataField:"NoOfInterviewsScheduled"},
                { caption: "No.Of Shortlisted", dataField: "NoOfShortlisted" },
                { caption: "No.Of Positions", dataField: "NumberOfPositions" },
                {caption:"Offered", dataField:"Offered"},
                {caption:"Accepted", dataField:"Accepted"},   
                {caption:"Joining Date", dataField:"JoiningDate"},
                {
                    caption: "Created Date",
                    dataField: "RRMCreatedDate",
                    allowEditing: false,
                    dataType: "date",
                    displayFormat: "yyyy-mm-dd"
                },
                { caption: "Status", dataField: "Status" },
                {
                    dataField: "RRM Type",
                    caption: "ResourceRequirementType-Status",
                    allowFiltering: false,
                    cellTemplate: function (container, options) {
                        var domActions = "";
                        if (options.data.ResourceRequirementType == "G") {
                            domActions += "<label class='label label-success m-l-xs'>RRM</label>";
                        } else if (options.data.ResourceRequirementType == "P") {
                            domActions += "<label class='label label-info m-l-xs'>RFP</label>";
                        } else if (options.data.ResourceRequirementType == "R") {
                            domActions += "<label class='label label-warning m-l-xs'>Resignation</label>";
                        }
                        $("<div>").append($(domActions)).appendTo(container);
                    }
                },
                { caption: "Client", dataField: "Client" },
                { caption: "BDE Name", dataField: "BDEName" },
                { caption: "Importance", dataField: "Importance" },
                { caption: "Designation", dataField: "Designation" },
                {caption:"", dataField:"RRMId", allowGrouping: false,allowCollapsing: false,allReordering:false,
                cellTemplate: function (container, options) {
                   
                    $("<div>")
                        .append("<button data-type='edit' data-rrmid =" + options.value + "  data-rrmtype = " + options.data.ResourceRequirementType + " class='btn btn-xs btn-primary edit-btn btnSelect editRRMEntryPoint"+pageId+"'><i class='fas fa-pencil-alt'></i></button>")
                    .appendTo(container);
                    },
                onClick: function (e) {
                    RRMEntryFromRRM(data.RRMId)
                },fixedPosition: "right", fixed:true, allowExporting:false, hidingPriority: 0
            }
            ]
        }).dxDataGrid("instance");
    }

    //Grid exporting
    function onExportingRRM(e) {
        var workbook = new ExcelJS.Workbook();
        var worksheet = workbook.addWorksheet('RRM');
        
        DevExpress.excelExporter.exportDataGrid({
            component: e.component,
            worksheet: worksheet,
            autoFilterEnabled: true
        }).then(function () {
            // https://github.com/exceljs/exceljs#writing-xlsx
            workbook.xlsx.writeBuffer().then(function (buffer) {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'RRM.xlsx');
            });
        });
        e.cancel = true;
    }

    //Loads the grid from front end at this point
    _rrmGrid.getRRMEntryTable = function() {
        var filterData = JSON.stringify({
            "IsActive": true
        });
        
        callGetListAsync('GetRRMForMarketing', filterData, function(e){
            _rrmGrid.ui.rrmGridReport.dxDataGrid({ dataSource: e })
       })
    }

    mapUI();
    return _rrmGrid;
});