var onHoldStatusForProfileMapping = false;
function onMappedCandidatesAdd(e) {
    var RRMProfileMappingData = {
        RRMId: RRMIdForProfileMappingSave,
        CandidateId:e.itemData.Id,
        IsLeadApproved:e.itemData.IsLeadApproved,
        IsUnmapped: 0,
        IsActive:1
    };

    RRMProfileMappingPostCallData = {
        Method: "PostProfileMappingForRRM",
        Data: RRMProfileMappingData
    };
    var RRMProfileMappingPostResult = PostDataCall(RRMProfileMappingPostCallData);
    if(RRMProfileMappingPostResult['IsSuccess'] == true)
    {
        getCandidatesForProfileMapping(RRMIdForProfileMappingSave);        
        getMappedCandidatesForProfileMapping(RRMIdForProfileMappingSave);
        getRRMDetailsForProfileMapping(RRMIdForProfileMappingSave);  
    }  
    else{
        var RRMProfileMappingPostSwal = {
            title: "OOPS",
            text: RRMProfileMappingPostResult['Message'],
            icon: 'error'
        }
        rrmProfileMappingSwal(RRMProfileMappingPostSwal);
    }    
}

function onCandidatesAdd(e) {
        var RRMProfileMappingData = {
            RRMId: RRMIdForProfileMappingSave,
            CandidateId:e.itemData.Id,
            IsLeadApproved:1,
            IsUnmapped: 1,
            IsActive:1
        };

        RRMProfileMappingPostCallData = {
            Method: "PostProfileMappingForRRM",
            Data: RRMProfileMappingData
        };
        var RRMProfileMappingPostResult = PostDataCall(RRMProfileMappingPostCallData);
        if(RRMProfileMappingPostResult['IsSuccess'] == true)
        {
            getCandidatesForProfileMapping(RRMIdForProfileMappingSave);        
            getMappedCandidatesForProfileMapping(RRMIdForProfileMappingSave);
            getRRMDetailsForProfileMapping(RRMIdForProfileMappingSave);  
        }  
        else{
            var RRMProfileMappingPostSwal = {
                title: "OOPS",
                text: RRMProfileMappingPostResult['Message'],
                icon: 'error'
            }
            rrmProfileMappingSwal(RRMProfileMappingPostSwal);
        }  
}

function rrmProfileMappingSwal(data){
  swal({
  title: data.title,
  text: data.text,
  icon: data.icon,
  button:"OK"
  });   
}

$(function(){
    var RRMIdForProfileMappingSave;

    var RRMDetailsForProfileMapping = []

    var MappedCandidates = []

    var CandidatesForProfileMapping = []

    var SkillsListForRRMProfileMapping = []

    $("#sdgd-rrmSkillsForProfileMapping").dxDataGrid({
        dataSource: SkillsListForRRMProfileMapping,
        showBorders: true,
        wordWrapEnabled: true,
        paging: {
            enabled: false
        },
        columns: [
            {
                dataField:"SkillFamily",
                caption:"Skill Family",
                allowSorting:false
            },
            {
                dataField:"Skill",
                caption:"Skill",
                allowSorting:false
            },
            {
                dataField:"SkillVersion",
                caption:"Skill Version",
                allowSorting:false
            }
        ],
    });

    $("#sdgd-candidatesGrid").dxDataGrid({
            dataSource: CandidatesForProfileMapping,
            keyExpr: "Id",
            showBorders: true,
            allowColumnResizing: true,
            wordWrapEnabled: true,
            rowDragging: {
                        data: "ID",
                        group: "tasksGroup",
                        onAdd: onCandidatesAdd
            },
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

    $("#sdgd-mappedCandidatesGrid").dxDataGrid({
    dataSource: RRMDetailsForProfileMapping,
    keyExpr: "RRMNo",
    showBorders: true,    
    allowColumnResizing: true,
    wordWrapEnabled: true,
    columns: [
        {
            dataField: "RRMNo",
            caption: "RRM No",
            allowSorting:false
        },
        {
            dataField: "RequirementName",
            caption: "Requirement Name",
            allowSorting:false
        },
        {
            dataField: "SkillName",
            caption: "Skills",
            allowSorting:false
        }
    ],
    masterDetail: {
        enabled: true,
        autoExpandAll:true,        
        template: function(container, options) { 
            var CurrentData = options.data;
            $("<div>")
                .addClass("master-detail-caption")
                .text("Mapped Profiles")
                .appendTo(container);

            $("<div id='sdgd-mappedCandidatesMasterGrid'>")
                .dxDataGrid({
                    columnAutoWidth: true,
                    showBorders: true,
                    allowColumnResizing: true,
                    filterRow: { visible: true },
                    columns: [{
                        dataField: "Id",
                        caption:"ID",
                        width:100,
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
                        visible:false,
                        allowSorting:false,
                        allowFiltering: true
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
                    rowDragging: {
                        data: "ID",
                        group: "tasksGroup",
                        onAdd: onMappedCandidatesAdd
                    },
                    dataSource: MappedCandidates
                }).appendTo(container);
            }
        }
    });

});

function getCandidatesForProfileMapping(rrmId){
    RRMIdForProfileMappingSave = rrmId;
    CandidatesForProfileMapping = [];
    var GetCandidatesForMappingFilters = JSON.stringify({
        "IsActive": true,
        "ResourceRequirementId":rrmId
    });
    CandidatesForProfileMapping = callgetlist("GetCandidatesForProfileMapping", GetCandidatesForMappingFilters);
    $("#sdgd-candidatesGrid").dxDataGrid({ dataSource: CandidatesForProfileMapping })
}

function getMappedCandidatesForProfileMapping(rrmId){
    MappedCandidates = [];
    var GetMappedCandidatesForMappingFilters = JSON.stringify({
        "IsActive": true,
        "ResourceRequirementId":rrmId
    });
    MappedCandidates = callgetlist("GetMappedCandidatesForProfileMapping", GetMappedCandidatesForMappingFilters);
    $("#sdgd-mappedCandidatesMasterGrid").dxDataGrid({ dataSource: MappedCandidates });
}

function getRRMDetailsForProfileMapping(rrmId){
    RRMDetailsForProfileMapping = [];
    var GetRRMDetailsForProfileMappingFilters = JSON.stringify({
        "IsActive": true,
        "ResourceRequirementId":rrmId
    });
    RRMDetailsForProfileMapping = callgetlist("GetRRMDetailsForProfileMappingById", GetRRMDetailsForProfileMappingFilters);
    if(RRMDetailsForProfileMapping[0].OnHoldByClient == true || RRMDetailsForProfileMapping[0].OnHoldByOwner == true){
        onHoldStatusForProfileMapping = false;
    }
    else{
        onHoldStatusForProfileMapping = true;       
    }
    $("#sdgd-mappedCandidatesGrid").dxDataGrid({ dataSource: RRMDetailsForProfileMapping });
    $("#sdgd-mappedCandidatesGrid").dxDataGrid('instance').refresh();
    setTimeout(function(){
        $("#sdgd-mappedCandidatesMasterGrid").dxDataGrid({ dataSource: MappedCandidates });
    }, 100);    
}

function closerrmProfileMapping() {
    $('#RRMProfileMappingRecruiter').modal("hide");
}


$('ul#rrmtabRecruiterProfileMapping li').click(function (e) {        
    $('ul#rrmtabRecruiterProfileMapping li').removeClass("active");
    $(this).addClass("active");
    var tab_details = $(this).attr("id");
    var currentTab = $("#" + tab_details + " > a ").attr("aria-controls");
    $("#rrmDetailsRecruiterProfileMapping .tab-pane").removeClass("active");
    $("#" + currentTab).addClass("active");
});

function getRRMSkillsForProfileMapping(RRMId){
    SkillsListForRRMProfileMapping = [];
    var GetRRMSkillsForMappingFilters = JSON.stringify({
        "IsActive": true,
        "ResourceRequirementId":RRMId
    });
    SkillsListForRRMProfileMapping = callgetlist("GetResourceRequrirementSkill", GetRRMSkillsForMappingFilters);
    $("#sdgd-rrmSkillsForProfileMapping").dxDataGrid({ dataSource: SkillsListForRRMProfileMapping });
}