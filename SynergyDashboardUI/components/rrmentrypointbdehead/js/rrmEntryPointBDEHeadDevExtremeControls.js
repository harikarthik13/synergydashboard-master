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
function bindDevExtremeControlsForRRMEntryPointBDEHead(){
    var commentsEditorBDEHead = $("#sd_txtEditor_RRMBDEHeadComments").dxHtmlEditor({
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

    var skillDetailsPlanBeditorBDEHead = $("#sd_txtEditorbdehead_skillDetailsPlanB").dxHtmlEditor({
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

    var skillDetailsPlanAeditorBDEHead = $("#sd_txtEditorbdehead_skillDetailsPlanA").dxHtmlEditor({
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

    var tdydateBDEHead = new Date();
    tdydateBDEHead.setDate(tdydateBDEHead.getDate() + 1);
    var nxtDateBDEHead = tdydateBDEHead.toISOString().slice(0,10);

    var toBeOnBoardPlanBBDEHead = $("#sd_date_rrmbdehead_tobeonboardplanb").dxDateBox({
        type: "date",
        value: nxtDateBDEHead,
        displayFormat:"dd/MM/yyyy",
        min: nxtDateBDEHead
    });

    var toBeOnBoardPlanABDEHead = $("#sd_date_rrmbdehead_tobeonboardplana").dxDateBox({
        type: "date",
        value: nxtDateBDEHead,
        displayFormat:"dd/MM/yyyy",
        min: nxtDateBDEHead
    });

    var bdeheadPlanARRMTag = $("#sd_tag_bdeheada_rrmrecruiter").dxTagBox({
        dataSource: new DevExpress.data.ArrayStore({ 
            data: [],
            key: "EmployeeId"
        }),
        displayExpr: "EmployeeName",
        valueExpr: "EmployeeId",
        value:""
    });
    var bdeheadPlanBRRMTag = $("#sd_tag_bdeheadb_rrmrecruiter").dxTagBox({
        dataSource: new DevExpress.data.ArrayStore({ 
            data: [],
            key: "EmployeeId"
        }),
        displayExpr: "EmployeeName",
        valueExpr: "EmployeeId",
        value:""
    });

    var requirementNameRRMBdeHead = $("#sdtxt_rrmbdehead_requirementname").dxTextBox({
        placeholder: "Requirement Name"
    });
    var requiredForRRMBdeHead = $("#sdtxt_rrmbdehead_requiredfor").dxTextBox({
        placeholder: "Required For"
    });
    var noOfPositionsRRMBdeHead = $("#sdnmb_rrmbdehead_numberofpositions").dxNumberBox({
        value: 1,
        min: 1,
        max: 50,
        showSpinButtons: true
    });
    var priorityRRMBdeHead = $("#sdcmb_rrmbdehead_priority").dxSelectBox({
        dataSource: new DevExpress.data.ArrayStore({
            data: [],
            key: "Id"
        }),
        displayExpr: "Name",
        valueExpr: "Id",
        placeholder: "Select Priority"
    });
    var departmentRRMBdeHead = $("#sdcmb_rrmbdehead_department").dxSelectBox({
        dataSource: new DevExpress.data.ArrayStore({
            data: [],
            key: "Id"
        }),
        displayExpr: "Name",
        valueExpr: "Id",
        placeholder: "Select Department"
    });
    var designationRRMBdeHead = $("#sdcmb_rrmbdehead_designation").dxSelectBox({
        dataSource: new DevExpress.data.ArrayStore({
            data: [],
            key: "Id"
        }),
        displayExpr: "Name",
        valueExpr: "Id",
        placeholder: "Select Designation"
    });
    var experienceRequiredRRMBdeHead = $("#sdnmb_rrmbdehead_experiencerequired").dxNumberBox({
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
    var communicationRRMBdeHead = $("#sdcmb_rrmbdehead_communication").dxSelectBox({
        dataSource: new DevExpress.data.ArrayStore({
            data: communicationList,
            key: "Id"
        }),
        displayExpr: "Name",
        valueExpr: "Id",
        placeholder: "Select Communication"
    });

    var locationForRRMBdeHead = $("#sdtxt_rrmbdehead_location").dxTextBox({
        placeholder: "Location For"
    });

    var requestedDateRRMBdeHead = $("#sd_date_rrmbdehead_requestedDate").dxDateBox({
        type: "date",
        displayFormat:"dd/MM/yyyy"
    });

    var fromVIPRRMBdeHead = $("#sdchk_rrmbdehead_losingRevenue").dxCheckBox({
        value: false,
        text: "Losing Revenue"
    });

    var fromVIPRRMBdeHead = $("#sdchk_rrmbdehead_fromVIP").dxCheckBox({
        value: false,
        text: "From VIP"
    });

    var requirementLeadRRMBdeHead = $("#sdtxt_rrmbdehead_requirementlead").dxTextBox({
        placeholder: "Requirement Lead"
    });
}