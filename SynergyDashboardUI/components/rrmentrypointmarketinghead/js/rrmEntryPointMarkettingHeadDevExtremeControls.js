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
function bindDevExtremeControlsForRRMEntryPointMarkettingHead(){
    var commentsEditorMarkettingHead = $("#sd_txtEditor_RRMMarkettingHeadComments").dxHtmlEditor({
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

    var skillDetailsPlanBeditorMarkettingHead = $("#sd_txtEditor_markettingHead_skillDetailsPlanB").dxHtmlEditor({
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

    var skillDetailsPlanAeditorMarkettingHead = $("#sd_txtEditor_markettingHead_skillDetailsPlanA").dxHtmlEditor({
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

    var tdydateMarkettingHead = new Date();
    tdydateMarkettingHead.setDate(tdydateMarkettingHead.getDate() + 1);
    var nxtDateMarkettingHead = tdydateMarkettingHead.toISOString().slice(0,10);

    var toBeOnBoardPlanBMarkettingHead = $("#sd_date_rrm_markettingHead_tobeonboardplanb").dxDateBox({
        type: "date",
        value: nxtDateMarkettingHead,
        displayFormat:"dd/MM/yyyy",
        min: nxtDateMarkettingHead
    });

    var toBeOnBoardPlanAMarkettingHead = $("#sd_date_rrm_markettingHead_tobeonboardplana").dxDateBox({
        type: "date",
        value: nxtDateMarkettingHead,
        displayFormat:"dd/MM/yyyy",
        min: nxtDateMarkettingHead
    });

    var _markettingHeadPlanARRMTag = $("#sd_tag__markettingHeada_rrmrecruiter").dxTagBox({
        dataSource: new DevExpress.data.ArrayStore({ 
            data: [],
            key: "EmployeeId"
        }),
        displayExpr: "EmployeeName",
        valueExpr: "EmployeeId",
        value:""
    });
    var _markettingHeadPlanBRRMTag = $("#sd_tag__markettingHeadb_rrmrecruiter").dxTagBox({
        dataSource: new DevExpress.data.ArrayStore({ 
            data: [],
            key: "EmployeeId"
        }),
        displayExpr: "EmployeeName",
        valueExpr: "EmployeeId",
        value:""
    });

    var requirementNameRRMMarketingHead = $("#sdtxt_rrmmarketinghead_requirementname").dxTextBox({
        placeholder: "Requirement Name"
    });
    var requiredForRRMMarketingHead = $("#sdtxt_rrmmarketinghead_requiredfor").dxTextBox({
        placeholder: "Required For"
    });
    var noOfPositionsRRMMarketingHead = $("#sdnmb_rrmmarketinghead_numberofpositions").dxNumberBox({
        value: 1,
        min: 1,
        max: 50,
        showSpinButtons: true
    });
    var priorityRRMMarketingHead = $("#sdcmb_rrmmarketinghead_priority").dxSelectBox({
        dataSource: new DevExpress.data.ArrayStore({
            data: [],
            key: "Id"
        }),
        displayExpr: "Name",
        valueExpr: "Id",
        placeholder: "Select Priority"
    });
    var departmentRRMMarketingHead = $("#sdcmb_rrmmarketinghead_department").dxSelectBox({
        dataSource: new DevExpress.data.ArrayStore({
            data: [],
            key: "Id"
        }),
        displayExpr: "Name",
        valueExpr: "Id",
        placeholder: "Select Department"
    });
    var designationRRMMarketingHead = $("#sdcmb_rrmmarketinghead_designation").dxSelectBox({
        dataSource: new DevExpress.data.ArrayStore({
            data: [],
            key: "Id"
        }),
        displayExpr: "Name",
        valueExpr: "Id",
        placeholder: "Select Designation"
    });
    var experienceRequiredRRMMarketingHead = $("#sdnmb_rrmmarketinghead_experiencerequired").dxNumberBox({
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
    var communicationRRMMarketingHead = $("#sdcmb_rrmmarketinghead_communication").dxSelectBox({
        dataSource: new DevExpress.data.ArrayStore({
            data: communicationList,
            key: "Id"
        }),
        displayExpr: "Name",
        valueExpr: "Id",
        placeholder: "Select Communication"
    });

    var locationForRRMMarketingHead = $("#sdtxt_rrmmarketinghead_location").dxTextBox({
        placeholder: "Location For"
    });

    var requestedDateRRMMarketingHead = $("#sd_date_rrmmarketinghead_requestedDate").dxDateBox({
        type: "date",
        displayFormat:"dd/MM/yyyy"
    });

    var fromVIPRRMMarketingHead = $("#sdchk_rrmmarketinghead_losingRevenue").dxCheckBox({
        value: false,
        text: "Losing Revenue"
    });

    var fromVIPRRMMarketingHead = $("#sdchk_rrmmarketinghead_fromVIP").dxCheckBox({
        value: false,
        text: "From VIP"
    });

    var requirementLeadRRMMarketingHead = $("#sdtxt_rrmmarketinghead_requirementlead").dxTextBox({
        placeholder: "Requirement Lead"
    });
}