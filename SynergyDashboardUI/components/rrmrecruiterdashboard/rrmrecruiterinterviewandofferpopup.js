
     $(document).ready(function () {
       
        loadRRMRecruiterDashboardInterviewAndOfferGridPopup();
   
    })

    function loadRRMRecruiterDashboardInterviewAndOfferGridPopup() {
        var rrmDashBoard = $("#rrmRecruiterDashboard_GridDetails").dxDataGrid({
            filterRow: {
                visible: true,
                applyFilter: "auto",
            },
            repaintChangesOnly: true,
            highlightChanges: true,
            showColumnLines: true,
            rowAlternationEnabled: true,
            showRowLines: false,
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
            selection: {
                mode: "multiple"
            },
            allowColumnReordering: true,
            showBorders: true,
            grouping: {
                autoExpandAll: true,
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [5, 10, 15],
                showInfo: true,
            },
            paging: {
                pageSize: 7,
            },
            sorting: {
                mode: "multiple",
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
            columnChooser: {
                enabled: true,
                mode: "select"
            },
            filterPanel: { visible: true },
            allowColumnResizing: true,
            groupPanel: {
                visible: true,
                emptyPanelText: "Drag a column header here to group by that column"
            },
            // columns: [
            //     {
            //         dataField: "RRMNo",
            //         caption: "RRMNo"
            //     },
            //     {
            //         dataField: "Requirement",
            //         caption: "Requirement"
            //     },
            //     {
            //         dataField: "Required",
            //         caption: "Required"
            //     },
            //     {
            //         dataField: "Communication",
            //         caption: "Communication",
            //     },
            //     {
            //         dataField: "Priority",
            //         caption: "Priority"
            //     },
            //     {
            //         dataField: "Department",
            //         caption: "Department"
            //     },
            //     {
            //         dataField: "Designation",
            //         caption: "Designation"
            //     },
            //     {
            //         dataField: "ExperiencerequiredInYrs",
            //         caption: "Experience Required In Yrs"
            //     },
            //     {
            //         dataField: "Status",
            //         caption: "Status"
            //     }
            // ]
        });
    }

