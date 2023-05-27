function select_interview(argument) {
    $("#interview-edit").removeClass("hidden");
    $(".modealExpand").removeClass("modal-lg");
    $(".interviewSidebar").removeClass("hidden");
    $(".actionForm").removeClass("col-md-12");
    $(".actionForm").addClass("col-md-6");
    $(".modealExpand").addClass("modal-lg");


    var result = callgetlist('GetInterviews', '{"IsActive":1}');
    var options = "<option value=''>Interview Status</option>";
    for (var i = 0; i < result.length; i++) {
        options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
    }
    $("#interviewStatus").html(options);

    /* RRMNumber */
    var rrm_result = callgetlist('GetRRMNumber', '{"IsActive":1}');
    var rrm_options = "<option value=''>Select RRM No</option>";
    for (var i = 0; i < rrm_result.length; i++) {
        rrm_options += "<option value='" + rrm_result[i].Id + "'>" + rrm_result[i].Name + "</option>";
    }
    $("#rrmNumber").html(rrm_options);

    /* RRMDetails */
    $(".cand-select").hide();
    $("#rrmNumber").change(function () {
        $(".cand-select").show();
        $("#interviewrrmdes").html('');

        var rrmno = $("#rrmNumber").val();
        var rrmnumberdes_result = callgetlist('GetRRMNumberdetails', '{"IsActive":true,"RRMID":' + rrmno + '}');

        var rrmnumberdes_options = '';
        for (var i = 0; i < rrmnumberdes_result.length; i++) {
            rrmnumberdes_options += "<p style='text-align: left;'>" + rrmnumberdes_result[i].Description + "</p>";
        }
        $("#interviewrrmdes").html(rrmnumberdes_options);

        /* Candidates List */
        var rrmcandidate_result = callgetlist('GetCandidateList', '{"IsActive": "true","RRMID":"' + rrmno + '"}');

        var rrmcandidate_options = "<option value=''>Select Candidates</option>";
        for (var i = 0; i < rrmcandidate_result.length; i++) {
            rrmcandidate_options += "<option value='" + rrmcandidate_result[i].Id + "'>" + rrmcandidate_result[i].Name + "</option>";
        }
        $("#interviewName").html(rrmcandidate_options);

        /* Candidate Details */
        var file_dwn = '';

        $("#interviewName").change(function () {
            $("#interviewrrmDetails").html('');
            var cand_name = $(this).val();
            var rrmnumberdetails_result = callgetlist('GetCandidateDetails', '{"IsActive":true,"Candidateid":' + cand_name + ',"RRMID":"' + rrmno + '"}');
            var rrmnumberdetails_options = '';

            for (var i = 0; i < rrmnumberdetails_result.length; i++) {
                file_dwn = rrmnumberdetails_result[i].ViewAttachment;
                rrmnumberdetails_options += "<p>" + rrmnumberdetails_result[i].CandidateDetailsList + "</p>";
                if (file_dwn = "Yes") {
                    $("#file_down").removeClass("hidden");
                    $(".flie_dwn").removeClass("hidden");
                }
            }
            $("#interviewrrmDetails").html(rrmnumberdetails_options);
        });
    });
}

// ========================== Submit post call 445 ============================ /

function AddPostDataInterview(argument) {

    // 4-> Interviews
    var counter = 0;

    if ($('#rrmNumber').val() == "") {
        $('#rrmNumber').addClass("redClass");
        counter++;
    } else {
        $('#rrmNumber').removeClass("redClass");
    }
    if ($('#interviewName').val() == "") {
        $('#interviewName').addClass("redClass");
        counter++;
    } else {
        $('#interviewName').removeClass("redClass");
    }
    if ($('#interviewDate').val() == "") {
        $('#interviewDate').addClass("redClass");
        counter++;
    } else {
        $('#interviewDate').removeClass("redClass");
    }
    if ($('#interviewDate').val() == "") {
        $('#interviewDate').addClass("redClass");
        counter++;
    } else {
        $('#interviewDate').removeClass("redClass");
    }

    if ($('#interviewfromTime').val() == "") {
        $('#interviewfromTime').addClass("redClass");
        counter++;
    } else {
        $('#interviewfromTime').removeClass("redClass");
    }

    if ($('#interviewtoTime').val() == "") {
        $('#interviewtoTime').addClass("redClass");
        counter++;
    } else {
        $('#interviewtoTime').removeClass("redClass");
    }

    if ($('#interviewStatus').val() == "") {
        $('#interviewStatus').addClass("redClass");
        counter++;
    } else {
        $('#interviewStatus').removeClass("redClass");
    }

    if (counter > 0) {
        $('#error-response').html("Require Fields are Missing");
        return false;
    } else {
        $('#error-response').html("");
    }

    request = {
        "Method": "PostInterviewTaskLog",
        "Data": {
            "RrmNumber": parseInt($('#rrmNumber').val()),
            //"InterviewName": $('#interviewName').val(),
            "Date": $('#interviewDate').val(),
            "FromTime": $('#interviewfromTime').val(),
            "ToTime": $('#interviewtoTime').val(),
            "InterviewStatus": $('#interviewStatus').val(),
            "FeedbackFile": "yes",
            "Comments": $('.actionComment').val()
        }
    }
    var result = PostDataCall(request);
    //$('#sucess-response').html(result);
    $('#sucess-response').html(result.Message);
    $('.clear-form').click();
}

function validation_interview_hide_show(selectedValue) {
    //Interview sidebar hide/show
    if (selectedValue != 'interviews') {
        $(".interviewSidebar").addClass('hidden');
    } else {
        if ($(".interviewSidebar").hasClass('hidden')) {
            $(".interviewSidebar").removeClass('hidden');
        }
    }
}

// ========================== Interview sidebar Fields Hide Show ============================ /
function validation_interview_hide_show(selectedValue) {

    if (selectedValue != 'interviews') {
        $(".interviewSidebar").addClass('hidden');
    } else {
        if ($(".interviewSidebar").hasClass('hidden')) {
            $(".interviewSidebar").removeClass('hidden');
        }
    }
}