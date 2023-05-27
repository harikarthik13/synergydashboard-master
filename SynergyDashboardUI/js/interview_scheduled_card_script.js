 function ToastMessage() {
     var ToastMessageVariable = document.getElementById("interview-save");
     ToastMessageVariable.className = "show";
     setTimeout(function () {
         ToastMessageVariable.className = ToastMessageVariable.className.replace("show", "");
     }, 1500);

     var InterviewProgessMessage = $('#rrm-ScheduleId').val();

     $("#rrm-status-" + InterviewProgessMessage).show();
     $("#div-rrm-Interview-card-detail").show();

     var rrmRequirementVariable = $("#txt-rrm-Requirement").val();
     var rrmInterviewTimeVariable = $("#txt-rrm-Interview-Datetime").val();
     var rrmModeOfInterviewVariable = $("#cmb-rrm-InterviewMode").val();
     var rrmExperienceYearsVariable = $("#txt-rrm-YearsOfExperience").val();
     var rrmCandidateNameVariable = $("#txt-rrm-CandidateName").val();
     var rrmPhoneNumberVariable = $("#rrmInput-mode-phone").val();
     var rrmSkypeIdVariable = $("#rrmInput-mode-skype").val();
     var rrmGtmIdVariable = $("#rrmInput-mode-gtm").val();


     var html = '<span><i><img src="./image/dashboard/interview.png" width="40px" height="40px" /></i></span>';
     html += '<span class="card-detail-title"><b>Interview</b></span>';
     html += '<span>&nbsp;scheduled for <b>' + rrmRequirementVariable + '</b> requirement</span>';
     html += '<hr />';
     html += '<p><b>Navaneeth</b> scheduled an interview at <b>' + rrmInterviewTimeVariable + '</b> for ' + rrmRequirementVariable + ' requirement</p>';
     html += '<p>Mode:<b> ' + rrmModeOfInterviewVariable + '</b></p>';
     html += '<div>';
     html += '<i>' + rrmPhoneNumberVariable + '</i>'
     html += '</div>';
     html += '<div>';
     html += '<i>' + rrmSkypeIdVariable + '</i>'
     html += '</div>';
     html += '<div>';
     html += '<i>' + rrmGtmIdVariable + '</i>'
     html += '</input>'
     html += '</div>';
     html += '<img src="./image/dashboard/pdficon.png" height="40px" width="40px;" />';
     html += '<i>' + rrmCandidateNameVariable + '<i> - ' + rrmExperienceYearsVariable + ' year experience';
     html += '<br /><br />';
     html += '<input type="button" class="btn btn-xs btn-info" id="btn-rrm-Interview-Feedback" value="Feedback">';
     html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
     html += '<input type="button" class="btn btn-xs btn-danger" id="btn-rrm-Interview-ReSchedule" value="Re-Schedule">';
     html += '</div>';
     html += '<br />';

     setTimeout(function () {
         $("#div-schedule-interview").modal("hide");
         $("#div-rrm-Interview-card-detail").append(html);
     }, 1000);

 }

 function ShowParticular(number) {
     $('#div-schedule-interview').modal('toggle');
     $('#rrm-ScheduleId').val(number);

 }