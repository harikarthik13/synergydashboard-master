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
function bindDevExtremeControlsForRRMEntryPointRecruiter(){
    var commentsEditorRecruiter = $("#sd_txtEditor_RRMRecruiterComments").dxHtmlEditor({
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

    var skillDetailsPlanBeditorRecruiter = $("#sd_txtEditorRecruiter_skillDetailsPlanB").dxHtmlEditor({
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

    var skillDetailsPlanAeditorRecruiter = $("#sd_txtEditorRecruiter_skillDetailsPlanA").dxHtmlEditor({
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

    var tdydateRecruiter = new Date();
    tdydateRecruiter.setDate(tdydateRecruiter.getDate() + 1);
    var nxtDateRecruiter = tdydateRecruiter.toISOString().slice(0,10);

    var toBeOnBoardPlanB = $("#sd_date_rrmrecruiter_tobeonboardplanb").dxDateBox({
        type: "date",
        value: nxtDateRecruiter,
        displayFormat:"dd/MM/yyyy",
        min: nxtDateRecruiter
    });

    var toBeOnBoardPlanARecruiter = $("#sd_date_rrmrecruiter_tobeonboardplana").dxDateBox({
        type: "date",
        value: nxtDateRecruiter,
        displayFormat:"dd/MM/yyyy",
        min: nxtDateRecruiter
    });

    var recruiterPlanARRMTagRecruiter = $("#sd_tag_recruitersa_rrmrecruiter").dxTagBox({
        readOnly: true,
        items:[],
        value:""
    });
    var recruiterPlanBRRMTagRecruiter = $("#sd_tag_recruitersb_rrmrecruiter").dxTagBox({
        readOnly: true,
        items:[],
        value:""
    });

    var requirementNameRRMRecruiter = $("#sdtxt_rrmrecruiter_requirementname").dxTextBox({
        placeholder: "Requirement Name"
    });
    var requiredForRRMRecruiter = $("#sdtxt_rrmrecruiter_requiredfor").dxTextBox({
        placeholder: "Required For"
    });
    var noOfPositionsRRMRecruiter = $("#sdnmb_rrmrecruiter_numberofpositions").dxNumberBox({
        value: 1,
        min: 1,
        max: 50,
        showSpinButtons: true
    });
    var priorityRRMRecruiter = $("#sdcmb_rrmrecruiter_priority").dxSelectBox({
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
    var departmentRRMRecruiter = $("#sdcmb_rrmrecruiter_department").dxSelectBox({
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
    var designationRRMRecruiter = $("#sdcmb_rrmrecruiter_designation").dxSelectBox({
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
    var experienceRequiredRRMRecruiter = $("#sdnmb_rrmrecruiter_experiencerequired").dxNumberBox({
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
    var communicationRRMRecruiter = $("#sdcmb_rrmrecruiter_communication").dxSelectBox({
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

    var locationForRRMRecruiter = $("#sdtxt_rrmrecruiter_location").dxTextBox({
        placeholder: "Location For"
    });

    var requestedDateRRMRecruiter = $("#sd_date_rrmrecruiter_requestedDate").dxDateBox({
        type: "date",
        displayFormat:"dd/MM/yyyy"
    });

    var fromVIPRRMRecruiter = $("#sdchk_rrmrecruiter_losingRevenue").dxCheckBox({
        value: false,
        text: "Losing Revenue"
    });

    var fromVIPRRMRecruiter = $("#sdchk_rrmrecruiter_fromVIP").dxCheckBox({
        value: false,
        text: "From VIP"
    });

    var leadApproval =$("#sdchk_rrmrecruiter_leadApproval").dxCheckBox({
        value: true,
        text: "Lead Approval Is Required",
        readOnly:true
    });

    var requirementLeadRRMRecruiter = $("#sdtxt_rrmrecruiter_requirementlead").dxTextBox({
        placeholder: "Requirement Lead"
    });

    var interviewwersRRMRecruiterTag = $("#sdtag_rrmrecruiter_intervierwers").dxTagBox({
        dataSource: new DevExpress.data.ArrayStore({ 
            data: [],
            key: "EmployeeId"
        }),
        displayExpr: "EmployeeName",
        valueExpr: "EmployeeId",
        value:"",
        placeholder:"Select interviewer(s)",
        readOnly:true
    });

    var mentionToolTipRRMRecruiter = $("#sd_popover_RRMrecruitermentions").dxPopover({
        showEvent: "mouseenter",
        //hideEvent: "mouseleave",
        closeOnOutsideClick: true,
        position: "top"        
    });
}