function select_meeting_defaulters(argument) {

    // 3-> Meeting
    $("#defaulters-meeting-edit").removeClass("hidden");

    var filter_val = JSON.stringify({
        "IsActive": true
    });
    var result = callgetlist('GetMeeting', filter_val);

    var options = "<option value=''>Select Meeting</option>";
    for (var i = 0; i < result.length; i++) {
        options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
    }
    $(".defaulters-meetingList").html(options);
}

// ========================== Submit post call 445 ============================ /

function AddPostDataMeetingDefaulters(argument) {
    var counter = 0;

    // 3-> Meeting

    if ($('#defaulters-Meeting').val() == "") {
        $('#defaulters-Meeting').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-Meeting').removeClass("redClass");
    }

    if ($('#defaulters-meetingDate').val() == "") {
        $('#defaulters-meetingDate').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-meetingDate').removeClass("redClass");
    }

    if ($('#defaulters-fromTime').val() == "" || $('#defaulters-fromTime').val() == 0) {
        $('#defaulters-fromTime').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-fromTime').removeClass("redClass");
    }

    if ($('#defaulters-toTime').val() == "" || $('#defaulters-toTime').val() == 0) {
        $('#defaulters-toTime').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-toTime').removeClass("redClass");
    }

    if (counter > 0) {
        $('#error-response').html("Require Fields are Missing");
        return false;
    } else {
        $('#error-response').html("");
    }
    request = {
        "Method": "PostMeetingTaskLog",
        "Data": {
            "Meeting": parseInt($('#defaulters-Meeting').val()),
            "Date": $('#defaulters-meetingDate').val(),
            "FromTime": $('#defaulters-fromTime').val(),
            "ToTime": $('#defaulters-toTime').val(),
            "Comments": $('.defaulters-actionComment').val()
        }
    }
    var result = PostDataCall(request);
    $('#sucess-response').html(result.Message);
    $('.clear-form').click();

}

// ========================== on change Meeting List ============================ /

function defaulters_meeting_OnChange(e) {
    var selectedValue = $(e).val();
    var meetingComment = $("option:selected", e).html();

    if (selectedValue == '') {
        $(".defaulters-actionComment").val('');
    } else {
        $(".defaulters-actionComment").val("Discusion about " + meetingComment);
    }

}

// ========================== Meeting Fields Hide Show ============================ /

function meetingHideShowFieldsDefaulters(argument) {
    $(".defaulters-actionComment").val('');
    $(".defaulters-meetingList").prop('selectedIndex', 0);
}