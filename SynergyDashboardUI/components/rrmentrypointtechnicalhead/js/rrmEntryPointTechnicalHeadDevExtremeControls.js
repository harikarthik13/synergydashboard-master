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
function bindDevExtremeControlsForRRMEntryPointTechnicalHead(){
    var commentsEditorTechnicalHead = $("#sd_txtEditor_RRMTechnicalHeadComments").dxHtmlEditor({
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

    var skillDetailsPlanBeditorTechnicalHead = $("#sd_txtEditor_technicalHead_skillDetailsPlanB").dxHtmlEditor({
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

    var skillDetailsPlanAeditorTechnicalHead = $("#sd_txtEditor_technicalHead_skillDetailsPlanA").dxHtmlEditor({
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

    var tdydateTechnicalHead = new Date();
    tdydateTechnicalHead.setDate(tdydateTechnicalHead.getDate() + 1);
    var nxtDateTechnicalHead = tdydateTechnicalHead.toISOString().slice(0,10);

    var toBeOnBoardPlanBTechnicalHead = $("#sd_date_rrm_technicalHead_tobeonboardplanb").dxDateBox({
        type: "date",
        value: nxtDateTechnicalHead,
        displayFormat:"dd/MM/yyyy",
        min: nxtDateTechnicalHead
    });

    var toBeOnBoardPlanATechnicalHead = $("#sd_date_rrm_technicalHead_tobeonboardplana").dxDateBox({
        type: "date",
        value: nxtDateTechnicalHead,
        displayFormat:"dd/MM/yyyy",
        min: nxtDateTechnicalHead
    });

    var _technicalHeadPlanARRMTag = $("#sd_tag__technicalHeada_rrmrecruiter").dxTagBox({
        dataSource: new DevExpress.data.ArrayStore({ 
            data: [],
            key: "EmployeeId"
        }),
        displayExpr: "EmployeeName",
        valueExpr: "EmployeeId",
        value:""
    });
    var _technicalHeadPlanBRRMTag = $("#sd_tag__technicalHeadb_rrmrecruiter").dxTagBox({
        dataSource: new DevExpress.data.ArrayStore({ 
            data: [],
            key: "EmployeeId"
        }),
        displayExpr: "EmployeeName",
        valueExpr: "EmployeeId",
        value:""
    });

    var requirementNameRRMTechnicalHead = $("#sdtxt_rrmtechnicalhead_requirementname").dxTextBox({
        placeholder: "Requirement Name"
    });
    var requiredForRRMTechnicalHead = $("#sdtxt_rrmtechnicalhead_requiredfor").dxTextBox({
        placeholder: "Required For"
    });
    var noOfPositionsRRMTechnicalHead = $("#sdnmb_rrmtechnicalhead_numberofpositions").dxNumberBox({
        value: 1,
        min: 1,
        max: 50,
        showSpinButtons: true
    });
    var priorityRRMTechnicalHead = $("#sdcmb_rrmtechnicalhead_priority").dxSelectBox({
        dataSource: new DevExpress.data.ArrayStore({
            data: [],
            key: "Id"
        }),
        displayExpr: "Name",
        valueExpr: "Id",
        searchEnabled: true,
        showClearButton: true,
        placeholder: "Select Priority"
    });
    var departmentRRMTechnicalHead = $("#sdcmb_rrmtechnicalhead_department").dxSelectBox({
        dataSource: new DevExpress.data.ArrayStore({
            data: [],
            key: "Id"
        }),
        displayExpr: "Name",
        valueExpr: "Id",
        searchEnabled: true,
        showClearButton: true,
        placeholder: "Select Department"
    });
    var designationRRMTechnicalHead = $("#sdcmb_rrmtechnicalhead_designation").dxSelectBox({
        dataSource: new DevExpress.data.ArrayStore({
            data: [],
            key: "Id"
        }),
        displayExpr: "Name",
        valueExpr: "Id",
        searchEnabled: true,
        showClearButton: true,
        placeholder: "Select Designation"
    });
    var experienceRequiredRRMTechnicalHead = $("#sdnmb_rrmtechnicalhead_experiencerequired").dxNumberBox({
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
    var communicationRRMTechnicalHead = $("#sdcmb_rrmtechnicalhead_communication").dxSelectBox({
        dataSource: new DevExpress.data.ArrayStore({
            data: communicationList,
            key: "Id"
        }),
        displayExpr: "Name",
        valueExpr: "Id",
        searchEnabled: true,
        showClearButton: true,
        placeholder: "Select Communication"
    });

    var locationForRRMTechnicalHead = $("#sdtxt_rrmtechnicalhead_location").dxTextBox({
        placeholder: "Location For"
    });

    var requestedDateRRMTechnicalHead = $("#sd_date_rrmtechnicalhead_requestedDate").dxDateBox({
        type: "date",
        displayFormat:"dd/MM/yyyy"
    });

    var fromVIPRRMTechnicalHead = $("#sdchk_rrmtechnicalhead_losingRevenue").dxCheckBox({
        value: false,
        text: "Losing Revenue"
    });

    var fromVIPRRMTechnicalHead = $("#sdchk_rrmtechnicalhead_fromVIP").dxCheckBox({
        value: false,
        text: "From VIP"
    });

    var requirementLeadRRMTechnicalHead = $("#sdtxt_rrmtechnicalhead_requirementlead").dxTextBox({
        placeholder: "Requirement Lead"
    });
}