var skillfamilydata = [],allSkilldata = [],allSkillversion = [];
var filter_val = JSON.stringify({ "IsActive": true });
callGetListAsync('GetSkillFamilies', filter_val, function (result) {
    for (var i = 0; i < result.length; i++) {
        skillfamilydata.push({
            "Id": result[i].Id,
            "Name": result[i].Name
        });
    }
});
var SkillDataFilter = JSON.stringify({
    "Token": Token
});
callGetListAsync('GetAllSkills', SkillDataFilter, function (e) {
    allSkilldata = e;
});
callGetListAsync('GetAllSkillVersions', SkillDataFilter, function (e) {
    allSkillversion = e;
});
function bindDevExtremeControlsForRRMEntryPointTechnical(){
    var commentsEditorTechnical = $("#sd_txtEditor_RRMTechnicalComments").dxHtmlEditor({
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
        value:""
    });

    var skillDetailsPlanBeditorTechnical = $("#sd_txtEditor_technical_skillDetailsPlanB").dxHtmlEditor({
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
        value:""
    });

    var skillDetailsPlanAeditorTechnical = $("#sd_txtEditor_technical_skillDetailsPlanA").dxHtmlEditor({
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
        value:""
    });

    var tdydateTechnical = new Date();
    tdydateTechnical.setDate(tdydateTechnical.getDate() + 1);
    var nxtDateTechnical = tdydateTechnical.toISOString().slice(0,10);

    var toBeOnBoardPlanBTechnical = $("#sd_date_rrm_technical_tobeonboardplanb").dxDateBox({
        type: "date",
        value: nxtDateTechnical,
        displayFormat:"dd/MM/yyyy",
        min: nxtDateTechnical
    });

    var toBeOnBoardPlanATechnical = $("#sd_date_rrm_technical_tobeonboardplana").dxDateBox({
        type: "date",
        value: nxtDateTechnical,
        displayFormat:"dd/MM/yyyy",
        min: nxtDateTechnical
    });

    var _technicalPlanARRMTag = $("#sd_tag_technicala_rrmrecruiter").dxTagBox({
        dataSource: new DevExpress.data.ArrayStore({ 
            data: [],
            key: "EmployeeId"
        }),
        displayExpr: "EmployeeName",
        valueExpr: "EmployeeId",
        value:""
    });
    var _technicalPlanBRRMTag = $("#sd_tag_technicalb_rrmrecruiter").dxTagBox({
        dataSource: new DevExpress.data.ArrayStore({ 
            data: [],
            key: "EmployeeId"
        }),
        displayExpr: "EmployeeName",
        valueExpr: "EmployeeId",
        value:""
    });

    var requirementNameRRMTechnical = $("#sdtxt_rrmtechnical_requirementname").dxTextBox({
        placeholder: "Requirement Name"
    });
    var requiredForRRMTechnical = $("#sdtxt_rrmtechnical_requiredfor").dxTextBox({
        placeholder: "Required For"
    });
    var noOfPositionsRRMTechnical = $("#sdnmb_rrmtechnical_numberofpositions").dxNumberBox({
        value: 1,
        min: 1,
        max: 50,
        showSpinButtons: true
    });
    var priorityRRMTechnical = $("#sdcmb_rrmtechnical_priority").dxSelectBox({
        dataSource: new DevExpress.data.ArrayStore({
            data: [],
            key: "Id"
        }),
        displayExpr: "Name",
        valueExpr: "Id",
        placeholder: "Select Priority"
    });
    var departmentRRMTechnical = $("#sdcmb_rrmtechnical_department").dxSelectBox({
        dataSource: new DevExpress.data.ArrayStore({
            data: [],
            key: "Id"
        }),
        displayExpr: "Name",
        valueExpr: "Id",
        placeholder: "Select Department"
    });
    var designationRRMTechnical = $("#sdcmb_rrmtechnical_designation").dxSelectBox({
        dataSource: new DevExpress.data.ArrayStore({
            data: [],
            key: "Id"
        }),
        displayExpr: "Name",
        valueExpr: "Id",
        placeholder: "Select Designation"
    });
    var experienceRequiredRRMTechnical = $("#sdnmb_rrmtechnical_experiencerequired").dxNumberBox({
        value: 1,
        min: 1,
        max: 20,
        showSpinButtons: true,
        placeholder:"Experience Required"
    });
    var communicationList = [
        {
            "Id":"Average",
            "Name":"Average"
        },
        {
            "Id":"Good",
            "Name":"Good"
        },
        {
            "Id":"VeryGood",
            "Name":"Very Good"
        }
        
    ]
    var communicationRRMTechnical = $("#sdcmb_rrmtechnical_communication").dxSelectBox({
        dataSource: new DevExpress.data.ArrayStore({
            data: communicationList,
            key: "Id"
        }),
        displayExpr: "Name",
        valueExpr: "Id",
        placeholder: "Select Communication"
    });

    var locationForRRMTechnical = $("#sdtxt_rrmtechnical_location").dxTextBox({
        placeholder: "Location For"
    });

    var requestedDateRRMTechnical = $("#sd_date_rrmtechnical_requestedDate").dxDateBox({
        type: "date",
        displayFormat:"dd/MM/yyyy"
    });

    var fromVIPRRMTechnical = $("#sdchk_rrmtechnical_losingRevenue").dxCheckBox({
        value: false,
        text: "Losing Revenue"
    });

    var fromVIPRRMTechnical = $("#sdchk_rrmtechnical_fromVIP").dxCheckBox({
        value: false,
        text: "From VIP"
    });

    var requirementLeadRRMTechnical = $("#sdtxt_rrmtechnical_requirementlead").dxTextBox({
        placeholder: "Requirement Lead"
    });
}