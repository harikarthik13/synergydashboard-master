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
function bindDevExtremeControlsForRRMEntryPointAccounts(){
    var commentsEditorAccounts = $("#sd_txtEditor_RRMAccounts").dxHtmlEditor({
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

    var skillDetailsPlanBeditorAccounts = $("#sd_txtEditoraccounts_skillDetailsPlanB").dxHtmlEditor({
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

    var skillDetailsPlanAeditorAccounts = $("#sd_txtEditoraccounts_skillDetailsPlanA").dxHtmlEditor({
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

    var tdydateAccounts = new Date();
    tdydateAccounts.setDate(tdydateAccounts.getDate() + 1);
    var nxtDateAccounts = tdydateAccounts.toISOString().slice(0,10);

    var toBeOnBoardPlanBHRHead = $("#sd_date_rrmaccounts_tobeonboardplanb").dxDateBox({
        type: "date",
        value: nxtDateAccounts,
        displayFormat:"dd/MM/yyyy",
        min: nxtDateAccounts
    });

    var toBeOnBoardPlanAHRHead = $("#sd_date_rrmaccounts_tobeonboardplana").dxDateBox({
        type: "date",
        value: nxtDateAccounts,
        displayFormat:"dd/MM/yyyy",
        min: nxtDateAccounts
    });  
    
    var requirementNameRRMAccounts = $("#sdtxt_rrmaccounts_requirementname").dxTextBox({
        placeholder: "Requirement Name"
    });
    var requiredForRRMAccounts = $("#sdtxt_rrmaccounts_requiredfor").dxTextBox({
        placeholder: "Required For"
    });
    var noOfPositionsRRMAccounts = $("#sdnmb_rrmaccounts_numberofpositions").dxNumberBox({
        value: 1,
        min: 1,
        max: 50,
        showSpinButtons: true
    });
    var priorityRRMAccounts = $("#sdcmb_rrmaccounts_priority").dxSelectBox({
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
    var departmentRRMAccounts = $("#sdcmb_rrmaccounts_department").dxSelectBox({
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
    var designationRRMAccounts = $("#sdcmb_rrmaccounts_designation").dxSelectBox({
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
    var experienceRequiredRRMAccounts = $("#sdnmb_rrmaccounts_experiencerequired").dxNumberBox({
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
    var communicationRRMAccounts = $("#sdcmb_rrmaccounts_communication").dxSelectBox({
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

    var locationForRRMAccounts = $("#sdtxt_rrmaccounts_location").dxTextBox({
        placeholder: "Location For"
    });

    var requestedDateRRMAccounts = $("#sd_date_rrmaccounts_requestedDate").dxDateBox({
        type: "date",
        displayFormat:"dd/MM/yyyy"
    });

    var fromVIPRRMAccounts = $("#sdchk_rrmaccounts_losingRevenue").dxCheckBox({
        value: false,
        text: "Losing Revenue"
    });

    var fromVIPRRMAccounts = $("#sdchk_rrmaccounts_fromVIP").dxCheckBox({
        value: false,
        text: "From VIP"
    });

    var requirementLeadRRMAccounts = $("#sdtxt_rrmaccounts_requirementlead").dxTextBox({
        placeholder: "Requirement Lead"
    });
}