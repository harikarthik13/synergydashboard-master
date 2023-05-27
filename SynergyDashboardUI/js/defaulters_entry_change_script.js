function edit_defaulters_entry_OnChange_bp(e) {
    var selectedValue = $(e).val();
    // 1-> Projects, 2-> RFP, 3-> Meeting, 4-> Interviews, 5-> ResourcManagement, 6-> SupportToMarketingTeam, 7-> SupportToHRTeam

    $("#defaulters-projects-edit").addClass("hidden");
    $("#defaulters-rfp-edit").addClass("hidden");
    $("#defaulters-meeting-edit").addClass("hidden");
    $("#defaulters-interview-edit").addClass("hidden");
    $("#defaulters-resourceManagement-edit").addClass("hidden");
    $("#defaulters-supportToMarketing-edit").addClass("hidden");
    $("#defaulters-supportToHR-edit").addClass("hidden");

    if (selectedValue != "Projects") {
        $('#defaulters-displayTaskHrs').html('');
        $(".defaulters-taskChart").addClass("hidden");
        $("#defaulters-tasks-edit").addClass("hidden");
        $("#defaulters-Project-edit").prop('selectedIndex', 0);

        $(".modealExpand").removeClass("modal-lg");
        if ($(".defaulters-actionForm").removeClass("col-md-6") != true) {
            $(".defaulters-actionForm").removeClass("col-md-6");
            $(".defaulters-actionForm").addClass("col-md-12");
        }
        if ($(".defaulters-actionChartSidebar").hasClass("hidden") != true) {
            $(".defaulters-actionChartSidebar").addClass("hidden");
        }
    }
    if (selectedValue != "RFP") {
        $(".modealExpand").removeClass("modal-lg");
        if ($(".defaulters-actionDescSidebar").hasClass("hidden") != true) {
            $(".defaulters-actionDescSidebar").addClass("hidden");
        }
    }
    if (selectedValue != "Meeting") {
        $(".defaulters-actionComment").val('');
        $(".defaulters-meetingDropdown").prop('selectedIndex', 0);
    }

    if (selectedValue == "Projects") {
        $("#defaulters-projects-edit").removeClass("hidden");
        $("#defaulters-billableDiv").removeClass("hidden");

        // $("#hoursDiv").removeClass("hidden");
    } else if (selectedValue == "RFP") {
        $(".defaulters-actionDescSidebar").removeClass("hidden");
        $(".defaulters-actionForm").removeClass("col-md-12");
        $(".defaulters-actionForm").addClass("col-md-6");
        $(".modealExpand").addClass("modal-lg");

        $("#defaulters-rfp-edit").removeClass("hidden");
        $("#defaulters-billableDiv").removeClass("hidden");
        // $("#hoursDiv").removeClass("hidden");
    } else if (selectedValue == "Meeting") {

        $("#defaulters-meeting-edit").removeClass("hidden");
        $("#defaulters-billableDiv").addClass("hidden");
        // $("#hoursDiv").addClass("hidden");
    } else if (selectedValue == "Interviews") {
        $("#defaulters-interview-edit").removeClass("hidden");
        $("#defaulters-billableDiv").addClass("hidden");
        // $("#hoursDiv").addClass("hidden");
    } else if (selectedValue == "ResourcManagement") {
        $("#defaulters-resourceManagement-edit").removeClass("hidden");
        $("#defaulters-billableDiv").addClass("hidden");
        // $("#hoursDiv").addClass("hidden");
    } else if (selectedValue == "SupportToMarketingTeam") {
        $("#defaulters-supportToMarketing-edit").removeClass("hidden");
    } else if (selectedValue == "SupportToHRTeam") {
        $("#defaulters-supportToHR-edit").removeClass("hidden");
    }
}

function edit_defaulters_Resource_OnChange(e) {

    var selectedValue = $(e).val();
    if (selectedValue == "BackupTeamManagement") {
        $("#defaulters-backupResource").removeClass("hidden");
        $("#defaulters-freeResource").addClass("hidden");
        $("#defaulters-parttimeResource").addClass("hidden");
    } else if (selectedValue == "FreeResource") {
        $("#defaulters-backupResource").addClass("hidden");
        $("#defaulters-freeResource").removeClass("hidden");
        $("#defaulters-parttimeResource").addClass("hidden");
    } else if (selectedValue == "PartTimeResource") {
        $("#defaulters-backupResource").addClass("hidden");
        $("#defaulters-freeResource").addClass("hidden");
        $("#defaulters-parttimeResource").removeClass("hidden");

    } else {
        $("#defaulters-backupResource").addClass("hidden");
        $("#defaulters-freeResource").addClass("hidden");
        $("#defaulters-parttimeResource").addClass("hidden");
    }
}