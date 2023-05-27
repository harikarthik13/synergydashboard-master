var skillfamilydata = [],allSkilldata = [],allSkillversion = [];
var getTechnology = [];
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

var filter_val = JSON.stringify({
    "IsActive": true
});

getTechnology = callgetlist("GetTechnologiesForRRM", filter_val);

$('#closedrrm_profileEntry_skills').find('option').remove();
getTechnology.forEach(function (item) {
    $('#closedrrm_profileEntry_skills').append($("<option></option>").attr({ "skillId":item.SkillId, "versionId":item.SkillVersionId,"familyId":item.FamilyID,"value":item.SkillId + "-" + item.SkillVersionId } ).text(item.SkillVersionName)).select2(
            {
                placeholder: "Search Skills.."
            }
        );
});

$("#closedrrm_profileEntry_skills").on("select2:unselect", function (e) {
    var skillId = e.params.data.element.attributes["skillid"].value;
    var versionId = e.params.data.element.attributes["versionid"].value;
    var familyId = e.params.data.element.attributes["familyid"].value;

    if(closedaddRRMType =="add"){
        deleteSelectedTechnologyRRM(skillId,versionId,familyId);
    }
    else if(closedaddRRMType =="edit"){
        deleteSelectedTechnologyRRMs(skillId,versionId,familyId);
    }
    
}).trigger('change');

function closedbindDevExtremeControlsForRRMEntryPoint(){
    var commentsEditor = $("#closedsd_txtEditor_RRMComments").dxHtmlEditor({
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
            dataSource: closedinterviewersData,
            searchExpr: "EmployeeName",
            displayExpr: "EmployeeName",
            valueExpr: "EmployeeId",
            marker:"@"
        },
        {
            dataSource: closedrrmData,
            searchExpr: "RRMName",
            displayExpr: "RRMName",
            valueExpr: "RRMId",
            marker:"#"
        }]
    });

    var skillDetailsPlanBeditor = $("#closedsd_txtEditor_skillDetailsPlanB").dxHtmlEditor({
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

    var skillDetailsPlanAeditor = $("#closedsd_txtEditor_skillDetailsPlanA").dxHtmlEditor({
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

    var tdydate = new Date();
    tdydate.setDate(tdydate.getDate() + 1);
    var nxtDate = tdydate.toISOString().slice(0,10);

    var toBeOnBoardPlanB = $("#closedsd_date_rrm_tobeonboardplanb").dxDateBox({
        type: "date",
        value: nxtDate,
        displayFormat:"dd/MM/yyyy"
    });

    var toBeOnBoardPlanA = $("#closedsd_date_rrm_tobeonboardplana").dxDateBox({
        type: "date",
        value: nxtDate,
        displayFormat:"dd/MM/yyyy"
    });

    var recruiterOwnerRRMTag = $("#closedsd_tag_recruiter_owner_rrm").dxTagBox({
        readOnly: true,
        items:[],
        value:"",
        searchEnabled: true
    });
    var recruiterPlanBRRMTag = $("#closedsd_tag_recruitersplanb_rrm").dxTagBox({
        readOnly: true,
        items:[],
        value:"",
        searchEnabled: true
    });
    var reminderARRM = $("#closedsdbtn_reminderA").dxButton({
        stylingMode: "contained",
        // text: "Send Reminder",
        type: "danger",
        hint:"Send Reminder",
        icon:"fa fa-bell",
        onClick: function() {
            closedbtnsendreminder();
        }
    });
    var reminderBRRM = $("#closedsdbtn_reminderB").dxButton({
        stylingMode: "contained",
        // text: "Send Reminder",
        type: "danger",
        hint:"Send Reminder",
        icon:"fa fa-bell",
        onClick: function() {
            closedbtnsendreminder();
        }
    });
    var requirementNameRRM = $("#closedsdtxt_rrm_requirementname").dxTextBox({
        placeholder: "Requirement Name"
    });
    var requiredForRRM = $("#closedsdtxt_rrm_requiredfor").dxTextBox({
        placeholder: "Required For"
    });
    var noOfPositionsRRM = $("#closedsdnmb_rrm_numberofpositions").dxNumberBox({
        value: 1,
        min: 1,
        max: 50,
        showSpinButtons: true
    });
    var priorityRRM = $("#closedsdcmb_rrm_priority").dxSelectBox({
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
    var departmentRRM = $("#closedsdcmb_rrm_department").dxSelectBox({
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
    var designationRRM = $("#closedsdcmb_rrm_designation").dxSelectBox({
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
    var experienceRequiredRRM = $("#closedsdnmb_rrm_experiencerequired").dxNumberBox({
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
    var communicationRRM = $("#closedsdcmb_rrm_communication").dxSelectBox({
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

    var locationForRRM = $("#closedsdtxt_rrm_location").dxTextBox({
        placeholder: "Location For"
    });

    var requestedDateRRM = $("#closedsd_date_rrm_requestedDate").dxDateBox({
        type: "date",
        displayFormat:"dd/MM/yyyy"
    });

    var fromVIPRRM = $("#closedsdchk_rrm_losingRevenue").dxCheckBox({
        value: false,
        text: "Losing Revenue"
    });

    var fromVIPRRM = $("#closedsdchk_rrm_fromVIP").dxCheckBox({
        value: false,
        text: "From VIP"
    });

    var leadApproval =$("#closedsdchk_rrm_leadApproval").dxCheckBox({
        value: false,
        text: "Lead Approval Is Required",
        onValueChanged(e) {
            leadApprovalRRMEntryPointOnValueChanged(e);
          }
    });

    var requirementLeadRRM = $("#closedsdtxt_rrm_requirementlead").dxTextBox({
        placeholder: "Requirement Lead"
    });

    var interviewwersRRMTag = $("#closedsdtag_rrm_intervierwers").dxTagBox({
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

    var clientSwitchRRM = $("#closedswitchClient").dxSwitch({
        value: false,
        switchedOffText: "NO",
        switchedOnText: "YES",
        disabled: true,
        onValueChanged: function (data) {
            closedswitchClientValueChanged(data);
        }
    });

    var leadSwitchRRM = $("#closedswitchLead").dxSwitch({
        value: false,
        switchedOffText: "NO",
        switchedOnText: "YES",
        onValueChanged: function (data) {
            closedswitchLeadValueChanged(data);
        }
    });

    var mentionToolTipRRM = $("#closedsd_popover_RRMmentions").dxPopover({
        showEvent: "mouseenter",
        //hideEvent: "mouseleave",
        closeOnOutsideClick: true,
        position: "top"        
    });
}