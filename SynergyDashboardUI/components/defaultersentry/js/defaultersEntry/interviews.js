function select_interviewDefaulters(argument) {
    $("#defaulters-interview-edit").removeClass("hidden");
    $(".modealExpand").removeClass("modal-lg");
    $(".defaulters-interviewSidebar").removeClass("hidden");
    $(".defaulters-actionForm").removeClass("col-md-12");
    $(".defaulters-actionForm").addClass("col-md-6");
    $(".modealExpand").addClass("modal-lg");


    var result = callgetlist('GetInterviews', '{"IsActive":1}');
    var options = "<option value=''>Interview Status</option>";
    for (var i = 0; i < result.length; i++) {
        options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
    }
    $("#defaulters-interviewStatus").html(options);

    /* RRMNumber */
    var rrm_result = callgetlist('GetRRMNumber', '{"IsActive":1}');
    var rrm_options = "<option value=''>Select RRM No</option>";
    for (var i = 0; i < rrm_result.length; i++) {
        rrm_options += "<option value='" + rrm_result[i].Id + "'>" + rrm_result[i].Name + "</option>";
    }
    $("#defaulters-rrmNumber").html(rrm_options);

    /* RRMDetails */
    $(".cand-select").hide();
    $("#defaulters-rrmNumber").change(function () {
        $(".cand-select").show();
        $("#defaulters-interviewrrmdes").html('');

        var rrmno = $("#defaulters-rrmNumber").val();
        var rrmnumberdes_result = callgetlist('GetRRMNumberdetails', '{"IsActive":true,"RRMID":' + rrmno + '}');

        var rrmnumberdes_options = '';
        for (var i = 0; i < rrmnumberdes_result.length; i++) {
            rrmnumberdes_options += "<p style='text-align: left;'>" + rrmnumberdes_result[i].Description + "</p>";
        }
        $("#defaulters-interviewrrmdes").html(rrmnumberdes_options);

        /* Candidates List */
        var rrmcandidate_result = callgetlist('GetCandidateList', '{"IsActive": "true","RRMID":"' + rrmno + '"}');

        var rrmcandidate_options = "<option value=''>Select Candidates</option>";
        for (var i = 0; i < rrmcandidate_result.length; i++) {
            rrmcandidate_options += "<option value='" + rrmcandidate_result[i].Id + "'>" + rrmcandidate_result[i].Name + "</option>";
        }
        $("#defaulters-interviewName").html(rrmcandidate_options);

        /* Candidate Details */
        var file_dwn = '';

        $("#defaulters-interviewName").change(function () {
            $("#defaulters-interviewrrmDetails").html('');
            var cand_name = $(this).val();
            var rrmnumberdetails_result = callgetlist('GetCandidateDetails', '{"IsActive":true,"Candidateid":' + cand_name + ',"RRMID":"' + rrmno + '"}');
            var rrmnumberdetails_options = '';

            for (var i = 0; i < rrmnumberdetails_result.length; i++) {
                file_dwn = rrmnumberdetails_result[i].ViewAttachment;
                rrmnumberdetails_options += "<p>" + rrmnumberdetails_result[i].CandidateDetailsList + "</p>";
                if (file_dwn = "Yes") {
                    $("#defaulters-file_down").removeClass("hidden");
                    $(".flie_dwn").removeClass("hidden");
                }
            }
            $("#defaulters-interviewrrmDetails").html(rrmnumberdetails_options);
        });
    });
}

// ========================== Submit post call 445 ============================ /

function AddPostDataInterviewDefaulters(argument) {

    // 4-> Interviews
    var counter = 0;

    if ($('#defaulters-rrmNumber').val() == "") {
        $('#defaulters-rrmNumber').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-rrmNumber').removeClass("redClass");
    }
    if ($('#defaulters-interviewName').val() == "") {
        $('#defaulters-interviewName').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-interviewName').removeClass("redClass");
    }
    if ($('#defaulters-interviewDate').val() == "") {
        $('#defaulters-interviewDate').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-interviewDate').removeClass("redClass");
    }
    if ($('#defaulters-interviewDate').val() == "") {
        $('#defaulters-interviewDate').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-interviewDate').removeClass("redClass");
    }

    if ($('#defaulters-interviewfromTime').val() == "") {
        $('#defaulters-interviewfromTime').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-interviewfromTime').removeClass("redClass");
    }

    if ($('#defaulters-interviewtoTime').val() == "") {
        $('#defaulters-interviewtoTime').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-interviewtoTime').removeClass("redClass");
    }

    if ($('#defaulters-interviewStatus').val() == "") {
        $('#defaulters-interviewStatus').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-interviewStatus').removeClass("redClass");
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
            "RrmNumber": parseInt($('#defaulters-rrmNumber').val()),
            //"InterviewName": $('#interviewName').val(),
            "Date": $('#defaulters-interviewDate').val(),
            "FromTime": $('#defaulters-interviewfromTime').val(),
            "ToTime": $('#defaulters-interviewtoTime').val(),
            "InterviewStatus": $('#defaulters-interviewStatus').val(),
            "FeedbackFile": "yes",
            "Comments": $('.defaulters-actionComment').val()
        }
    }
    var result = PostDataCall(request);
    //$('#sucess-response').html(result);
    $('#sucess-response').html(result.Message);
    $('.clear-form').click();
}

function validation_defaulters_interview_hide_show(selectedValue) {
    //Interview sidebar hide/show
    if (selectedValue != 'interviews') {
        $(".defaulters-interviewSidebar").addClass('hidden');
    } else {
        if ($(".defaulters-interviewSidebar").hasClass('hidden')) {
            $(".defaulters-interviewSidebar").removeClass('hidden');
        }
    }
}

// ========================== Interview sidebar Fields Hide Show ============================ /
function validation_defaulters_interview_hide_show(selectedValue) {

    if (selectedValue != 'interviews') {
        $(".defaulters-interviewSidebar").addClass('hidden');
    } else {
        if ($(".defaulters-interviewSidebar").hasClass('hidden')) {
            $(".defaulters-interviewSidebar").removeClass('hidden');
        }
    }
}