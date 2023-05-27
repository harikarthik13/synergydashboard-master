function open_addfamily() {
    $("#addFamilyModel")
      .appendTo("body")
      .modal("show");
}

function open_addskill() {
    $("#addSkillModel")
      .appendTo("body")
      .modal("show");
}

function open_addversion() {
    $("#addVersionModel")
      .appendTo("body")
      .modal("show");
}


$(function(){
    $("#skillset_gridContainer").dxDataGrid({
        dataSource: family,
        keyExpr: "ID",
        showBorders: true,
        columns: [{
                dataField: "Id",
                caption: "Id",
                width: 70
            },
            "FamilyName"
        ],
        masterDetail: {
            enabled: true,
            template: function(container, options) { 
                var currentFamilyData = options.data;

                $("<div>")
                    $("<button class='btn btn-sm btn-primary addSkill_btn' onclick='open_addskill();'><i class='glyphicon glyphicon-plus' data-toggle='modal'></i>Add Skill</button>")
                    .addClass("family-detail-caption")
                    .appendTo(container);

                $("<div>")
                    .dxDataGrid({
                        columnAutoWidth: true,
                        showBorders: true,
                        columns: ["Id","SkillName"
                        ],
                        masterDetail: {
                            enabled: true,
                            template: function(container, options) { 
                                var currentSkillData = options.data;

                                $("<div>")
                                    $("<button class='btn btn-sm btn-primary addVersion_btn' onclick='open_addversion();'><i class='glyphicon glyphicon-plus' data-toggle='modal'></i>Add Version</button>")
                                    .addClass("skill-detail-caption")
                                    .appendTo(container);

                                $("<div>")
                                    .dxDataGrid({
                                        columnAutoWidth: true,
                                        showBorders: true,
                                        columns: ["Id","VersionName"
                                        ],
                                        dataSource: new DevExpress.data.DataSource({
                                            store: new DevExpress.data.ArrayStore({
                                                key: "ID",
                                                data: versions
                                            }),
                                            filter: ["SkillID", "=", options.key]
                                        })
                                    }).appendTo(container);
                            }
                        },
                        dataSource: new DevExpress.data.DataSource({
                            store: new DevExpress.data.ArrayStore({
                                key: "ID",
                                data: skills
                            }),
                            filter: ["FamilyID", "=", options.key]
                        })
                    }).appendTo(container);
            }
        }
    });
});