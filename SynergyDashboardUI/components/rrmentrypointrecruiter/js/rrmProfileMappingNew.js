
var RRMIdForProfileMappingSaves = null;
var MappedCandidatesNew = [];

$(function(){
    $("#sdgd-candidatesGridNew").dxDataGrid({
        keyExpr: "Id",
        showBorders: true,
        allowColumnResizing: true,
        rowAlternationEnabled:true,
        selection: {
            mode: "multiple"
        },
        paging: {
            pageSize: 10
        },
        wordWrapEnabled: true,
        filterRow: { visible: true },
        columns: [{
            dataField: "Id",
            caption:"ID",
            visible:false,
            allowSorting:false
        },
        {
            dataField: "IsLeadApproved",
            caption:"IsLeadApproved",
            visible:false,
            allowSorting:false
        },
        {
            dataField: "CandidateName",
            caption:"Name",
            allowSorting:false,
            allowFiltering: true,
            cellTemplate: function (container, options) {  
                var domActions = "";
                domActions += "<a style='cursor:pointer' class='candidateDetailsRRMRecruiter' data-candidateid =" + options.data.Id + ">"+options.data.CandidateName+"</a>";
                $("<div class='text-left'>").append($(domActions)).appendTo(container);
            }
        },
        {
            dataField: "SkillName",
            caption:"Skills",
            allowSorting:false,
            allowFiltering: true
        }],
    });

    var toolTip = $("#rrmMappingNewtooltip").dxTooltip({
    }).dxTooltip("instance");

    $("#sdgd-mappedCandidatesGridNew").dxDataGrid({
         keyExpr: "Id",
         showBorders: true,
         allowColumnResizing: true,
         rowAlternationEnabled:true,
         selection: {
             mode: "multiple"
         },
         paging: {
             pageSize: 8
         },
         wordWrapEnabled: true,
         onCellPrepared: disableCheckBoxMappedDataRRM,
         filterRow: { visible: true },
         onRowPrepared: function (e) {  
            if (e.rowType == 'data') {  
                var status = e.data.StageOrder;
                var htmlText;
                if(status >= 26){
                    htmlText = e.data.Stage+" cannot be unmapped"
                }
                else if(status === 4){
                    htmlText = e.data.Stage+" cannot be unmapped"
                }
                else{
                    htmlText = e.data.Stage;
                }

                e.rowElement.mousemove(function () {
                    $('#rrmMappingNewtooltipText').text(htmlText);
                    toolTip.show(e.rowElement);
                })  
            }  
        }  ,
         columns: [{
             dataField: "Id",
             caption:"ID",
             visible:false,
             allowSorting:false
         },
         {
             dataField: "CandidateName",
             caption:"Name",
             width:100,
             allowSorting:false,
             allowFiltering: true,
             cellTemplate: function (container, options) {  
                 var domActions = "";
                 domActions += "<a style='cursor:pointer' class='candidateDetailsRRMRecruiter' data-candidateid =" + options.data.Id + ">"+options.data.CandidateName+"</a>";
                 $("<div class='text-left'>").append($(domActions)).appendTo(container);
             }
         },
         {
             dataField: "SkillName",
             caption:"Skills",
             allowSorting:false,
             allowFiltering: true,
             visible:false
         },
         {
            dataField: "RecruiterName",
            caption:"Recruiter",
            allowFiltering: true,
            allowSorting:false
        },
         {
            dataField: "Stage",
            caption:"Status",
            allowFiltering: true,
            allowSorting:false,
            cellTemplate: function (container, options) {
                var html = "";
                if(options.data.IsFlagged){
                    html +="<span class='label label-default'>BANNED &nbsp;<i class='fa fa-ban' aria-hidden='true' style='color:#D9534F'></i></span>"
                }
                else{
                    if(options.data.StageOrder == 2){
                        html+="<span class='label label-warning'>"+options.data.Stage+"</span>";
                    }
                    if(options.data.StageOrder == 3){
                        html+="<span class='label label-danger'>"+options.data.Stage+"</span>";
                    }
                    if(options.data.StageOrder >= 4 && options.data.StageOrder <= 26){
                        html+="<span class='label label-success'>"+options.data.Stage+"</span>";
                    }
                    if(options.data.StageOrder == 27){
                        html+="<span class='label label-warning'>"+options.data.Stage+"</span>";
                    }
                }                           
                $("<div class='pull-left'>")
                    .append(html)
                    .appendTo(container);
                },
        }],
     });
});

$('#rrm_requirementTabRecruiterProfileMappingNew').click(function(){
    getCandidatesForProfileMappingNew(RRMIdForProfileMappingSave);
    getMappedCandidatesForProfileMappingMew(RRMIdForProfileMappingSave);
})

function getCandidatesForProfileMappingNew(rrmId){
    RRMIdForProfileMappingSaves = rrmId;
    CandidatesForProfileMappings = [];
    var GetCandidatesForMappingFilters = JSON.stringify({
        "IsActive": true,
        "ResourceRequirementId":rrmId
    });
    CandidatesForProfileMappings = callgetlist("GetCandidatesForProfileMapping", GetCandidatesForMappingFilters);
    $("#sdgd-candidatesGridNew").dxDataGrid({ dataSource: CandidatesForProfileMappings })
}

function getMappedCandidatesForProfileMappingMew(rrmId){
    MappedCandidatesNew = [];
    var GetMappedCandidatesForMappingFilters = JSON.stringify({
        "IsActive": true,
        "ResourceRequirementId":rrmId
    });
    MappedCandidatesNew = callgetlist("GetMappedCandidatesForProfileMapping", GetMappedCandidatesForMappingFilters);
    $("#sdgd-mappedCandidatesGridNew").dxDataGrid({ dataSource: MappedCandidatesNew });
}

function MapRRMNew(){
    var dataGrid =  $("#sdgd-candidatesGridNew").dxDataGrid("instance");
    var selectedRowsData = dataGrid.getSelectedRowsData();
   
    if(selectedRowsData.length > 0){
        $.each( selectedRowsData, function( key, value ) {
            var candidateId = value.Id;
            var RRMProfileMappingData = {
                RRMId: RRMIdForProfileMappingSave,
                CandidateId:candidateId,
                IsLeadApproved:value.IsLeadApproved,
                IsUnmapped: 0,
                IsActive:1
            };
            
            RRMProfileMappingPostCallData = {
                Method: "PostProfileMappingForRRM",
                Data: RRMProfileMappingData
            };
            var RRMProfileMappingPostResult = PostDataCall(RRMProfileMappingPostCallData);
        });
        
        getCandidatesForProfileMappingNew(RRMIdForProfileMappingSave);
        getMappedCandidatesForProfileMappingMew(RRMIdForProfileMappingSave);
    }
    else{
        var RRMProfileMappingPostSwal = {
                    title: "OOPS",
                    text: "Select Atleast one Profile to Map",
                    icon: 'warning'
                }
        rrmProfileMappingSwal(RRMProfileMappingPostSwal);
    }
}

function UnMapRRMNew(){
    var dataGrid =  $("#sdgd-mappedCandidatesGridNew").dxDataGrid("instance");
    var selectedRowsData = dataGrid.getSelectedRowsData();

    if(selectedRowsData.length > 0){
        $.each( selectedRowsData, function( key, value ) {
            var candidateId = value.Id;
            var RRMProfileMappingData = {
                RRMId: RRMIdForProfileMappingSave,
                CandidateId:candidateId,
                IsLeadApproved:1,
                IsUnmapped: 1,
                IsActive:1
            };
           
            RRMProfileMappingPostCallData = {
                Method: "PostProfileMappingForRRM",
                Data: RRMProfileMappingData
            };
            var RRMProfileMappingPostResult = PostDataCall(RRMProfileMappingPostCallData);
        });
        
        getCandidatesForProfileMappingNew(RRMIdForProfileMappingSave);
        getMappedCandidatesForProfileMappingMew(RRMIdForProfileMappingSave);
    }
    else{
        var RRMProfileMappingPostSwal = {
                    title: "OOPS",
                    text: "Select Atleast one Profile to UnMap",
                    icon: 'warning'
                }
        rrmProfileMappingSwal(RRMProfileMappingPostSwal);
    }
}

function disableCheckBoxMappedDataRRM(e){
    if (e.rowType === "data" & e.column.command === 'select' && e.row.data.StageOrder === 4) {  
        e.cellElement.find('.dx-select-checkbox').dxCheckBox("instance").option("disabled", true);  
        e.cellElement.off();  
    }  
    if (e.rowType === "data" & e.column.command === 'select' && e.row.data.StageOrder >= 26) {  
        e.cellElement.find('.dx-select-checkbox').dxCheckBox("instance").option("disabled", true);  
        e.cellElement.off();  
    }  
    if(e.rowType ==="header"  & e.column.command === 'select'){
        e.cellElement.find('.dx-select-checkbox').dxCheckBox("instance").option("disabled", true);  
    }
}