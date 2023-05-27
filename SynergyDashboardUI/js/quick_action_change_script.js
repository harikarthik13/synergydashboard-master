 function edit_action_OnChange_bp(e) {
     var selectedValue = $(e).val();
     // 1-> Projects, 2-> RFP, 3-> Meeting, 4-> Interviews, 5-> ResourcManagement, 6-> SupportToMarketingTeam, 7-> SupportToHRTeam

     $("#projects-edit").addClass("hidden");
     $("#rfp-edit").addClass("hidden");
     $("#meeting-edit").addClass("hidden");
     $("#interview-edit").addClass("hidden");
     $("#resourceManagement-edit").addClass("hidden");
     $("#supportToMarketing-edit").addClass("hidden");
     $("#supportToHR-edit").addClass("hidden");

     if (selectedValue != "Projects") {
         $('#displayTaskHrs').html('');
         $(".taskChart").addClass("hidden");
         $("#tasks-edit").addClass("hidden");
         $("#Project-edit").prop('selectedIndex', 0);

         $(".modealExpand").removeClass("modal-lg");
         if ($(".actionForm").removeClass("col-md-6") != true) {
             $(".actionForm").removeClass("col-md-6");
             $(".actionForm").addClass("col-md-12");
         }
         if ($(".actionChartSidebar").hasClass("hidden") != true) {
             $(".actionChartSidebar").addClass("hidden");
         }
     }
     if (selectedValue != "RFP") {
         $(".modealExpand").removeClass("modal-lg");
         if ($(".actionDescSidebar").hasClass("hidden") != true) {
             $(".actionDescSidebar").addClass("hidden");
         }
     }
     if (selectedValue != "Meeting") {
         $(".actionComment").val('');
         $(".meetingDropdown").prop('selectedIndex', 0);
     }

     if (selectedValue == "Projects") {
         $("#projects-edit").removeClass("hidden");
         $("#billableDiv").removeClass("hidden");

         // $("#hoursDiv").removeClass("hidden");
     } else if (selectedValue == "RFP") {
         $(".actionDescSidebar").removeClass("hidden");
         $(".actionForm").removeClass("col-md-12");
         $(".actionForm").addClass("col-md-6");
         $(".modealExpand").addClass("modal-lg");

         $("#rfp-edit").removeClass("hidden");
         $("#billableDiv").removeClass("hidden");
         // $("#hoursDiv").removeClass("hidden");
     } else if (selectedValue == "Meeting") {

         $("#meeting-edit").removeClass("hidden");
         $("#billableDiv").addClass("hidden");
         // $("#hoursDiv").addClass("hidden");
     } else if (selectedValue == "Interviews") {
         $("#interview-edit").removeClass("hidden");
         $("#billableDiv").addClass("hidden");
         // $("#hoursDiv").addClass("hidden");
     } else if (selectedValue == "ResourcManagement") {
         $("#resourceManagement-edit").removeClass("hidden");
         $("#billableDiv").addClass("hidden");
         // $("#hoursDiv").addClass("hidden");
     } else if (selectedValue == "SupportToMarketingTeam") {
         $("#supportToMarketing-edit").removeClass("hidden");
     } else if (selectedValue == "SupportToHRTeam") {
         $("#supportToHR-edit").removeClass("hidden");
     }
 }

 function edit_Resource_OnChange(e) {

     var selectedValue = $(e).val();
     if (selectedValue == "BackupTeamManagement") {
         $("#backupResource").removeClass("hidden");
         $("#freeResource").addClass("hidden");
         $("#parttimeResource").addClass("hidden");
     } else if (selectedValue == "FreeResource") {
         $("#backupResource").addClass("hidden");
         $("#freeResource").removeClass("hidden");
         $("#parttimeResource").addClass("hidden");
     } else if (selectedValue == "PartTimeResource") {
         $("#backupResource").addClass("hidden");
         $("#freeResource").addClass("hidden");
         $("#parttimeResource").removeClass("hidden");

     } else {
         $("#backupResource").addClass("hidden");
         $("#freeResource").addClass("hidden");
         $("#parttimeResource").addClass("hidden");
     }
 }