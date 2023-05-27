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
function bindDevExtremeControlsForRRMEntryPointHRHead(){
    var commentsEditorHRHead = $("#sd_txtEditor_RRMHRHeadComments").dxHtmlEditor({
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
        value:"",
        mentions: [{
            dataSource: interviewersData,
            searchExpr: "EmployeeName",
            displayExpr: "EmployeeName",
            valueExpr: "EmployeeId",
            marker:"@"
        },
        {
            dataSource: rrmData,
            searchExpr: "RRMName",
            displayExpr: "RRMName",
            valueExpr: "RRMId",
            marker:"#"
        }]
    });

    var skillDetailsPlanBeditorHRHead = $("#sd_txtEditorhrhead_skillDetailsPlanB").dxHtmlEditor({
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

    var skillDetailsPlanAeditorHRHead = $("#sd_txtEditorhrhead_skillDetailsPlanA").dxHtmlEditor({
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

    var closeRRMHRHead = $("#sd_txtEditorhrhead_closeRRM").dxHtmlEditor({
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

    var tdydateHRHead = new Date();
    tdydateHRHead.setDate(tdydateHRHead.getDate() + 1);
    var nxtDateHRHead = tdydateHRHead.toISOString().slice(0,10);

    var toBeOnBoardPlanBHRHead = $("#sd_date_rrmhrhead_tobeonboardplanb").dxDateBox({
        type: "date",
        value: nxtDateHRHead,
        displayFormat:"dd/MM/yyyy",
        min: nxtDateHRHead
    });

    var toBeOnBoardPlanAHRHead = $("#sd_date_rrmhrhead_tobeonboardplana").dxDateBox({
        type: "date",
        value: nxtDateHRHead,
        displayFormat:"dd/MM/yyyy",
        min: nxtDateHRHead
    });

    var hrheadPlanARRMTag = $("#sd_tag_hrheada_rrmrecruiter").dxTagBox({
        dataSource: new DevExpress.data.ArrayStore({ 
            data: [],
            key: "EmployeeId"
        }),
        displayExpr: "EmployeeName",
        valueExpr: "EmployeeId",
        value:"",
        searchEnabled: true
    });
    var hrheadPlanBRRMTag = $("#sd_tag_hrheadb_rrmrecruiter").dxTagBox({
        dataSource: new DevExpress.data.ArrayStore({ 
            data: [],
            key: "EmployeeId"
        }),
        displayExpr: "EmployeeName",
        valueExpr: "EmployeeId",
        value:"",
        searchEnabled: true
    });

    var requirementNameRRMHrHead = $("#sdtxt_rrmhrhead_requirementname").dxTextBox({
        placeholder: "Requirement Name"
    });
    var requiredForRRMHrHead = $("#sdtxt_rrmhrhead_requiredfor").dxTextBox({
        placeholder: "Required For"
    });
    var noOfPositionsRRMHrHead = $("#sdnmb_rrmhrhead_numberofpositions").dxNumberBox({
        value: 1,
        min: 1,
        max: 50,
        showSpinButtons: true
    });

    var priorityRRMHrHead = $("#sdcmb_rrmhrhead_priority").dxSelectBox({
        dataSource: new DevExpress.data.ArrayStore({
            data: [],
            key: "Id"
        }),
        displayExpr: "Name",
        valueExpr: "Id",
        placeholder: "Select Priority",
        searchEnabled: true,
        showClearButton: true
    });
    var departmentRRMHrHead = $("#sdcmb_rrmhrhead_department").dxSelectBox({
        dataSource: new DevExpress.data.ArrayStore({
            data: [],
            key: "Id"
        }),
        displayExpr: "Name",
        valueExpr: "Id",
        placeholder: "Select Department",
        searchEnabled: true,
        showClearButton: true
    });
    var designationRRMHrHead = $("#sdcmb_rrmhrhead_designation").dxSelectBox({
        dataSource: new DevExpress.data.ArrayStore({
            data: [],
            key: "Id"
        }),
        displayExpr: "Name",
        valueExpr: "Id",
        placeholder: "Select Designation",
        searchEnabled: true,
        showClearButton: true
    });
    var experienceRequiredRRMHrHead = $("#sdnmb_rrmhrhead_experiencerequired").dxNumberBox({
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
    var communicationRRMHrHead = $("#sdcmb_rrmhrhead_communication").dxSelectBox({
        dataSource: new DevExpress.data.ArrayStore({
            data: communicationList,
            key: "Id"
        }),
        displayExpr: "Name",
        valueExpr: "Id",
        placeholder: "Select Communication",
        searchEnabled: true,
        showClearButton: true
    });

    var closeReasonRRMHrHead = $("#sdcmb_rrmReasonHrHead").dxSelectBox({
        // dataSource: new DevExpress.data.ArrayStore({
        //     data: closeRRMReasonList,
        //     key: "Id"
        // }),
        displayExpr: "Name",
        valueExpr: "Id",
        placeholder: "Select Reason",
        searchEnabled: true,
        showClearButton: true
    });

    var locationForRRMHrHead = $("#sdtxt_rrmhrhead_location").dxTextBox({
        placeholder: "Location For"
    });

    var requestedDateRRMHrHead = $("#sd_date_rrmhrhead_requestedDate").dxDateBox({
        type: "date",
        displayFormat:"dd/MM/yyyy"
    });

    var fromVIPRRMHrHead = $("#sdchk_rrmhrhead_losingRevenue").dxCheckBox({
        value: false,
        text: "Losing Revenue"
    });

    var fromVIPRRMHrHead = $("#sdchk_rrmhrhead_fromVIP").dxCheckBox({
        value: false,
        text: "From VIP"
    });

    var leadApproval =$("#sdchk_rrmhrhead_leadApproval").dxCheckBox({
        value: true,
        text: "Lead Approval Is Required",
        readOnly:true
    });

    var requirementLeadRRMHrHead = $("#sdtxt_rrmhrhead_requirementlead").dxTextBox({
        placeholder: "Requirement Lead"
    });

    var interviewwersRRMHrHeadTag = $("#sdtag_rrmhrhead_intervierwers").dxTagBox({
        dataSource: new DevExpress.data.ArrayStore({ 
            data: [],
            key: "EmployeeId"
        }),
        displayExpr: "EmployeeName",
        valueExpr: "EmployeeId",
        value:"",
        placeholder:"Select interviewer(s)",
        searchEnabled: true
    });

    var mentionToolTipRRMHrHead = $("#sd_popover_RRMHrHeadmentions").dxPopover({
        showEvent: "mouseenter",
        //hideEvent: "mouseleave",
        closeOnOutsideClick: true,
        position: "top"        
    });
}