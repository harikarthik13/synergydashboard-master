function select_meeting(argument) {

    // 3-> Meeting
    $("#meeting-edit").removeClass("hidden");

    var filter_val = JSON.stringify({
        "IsActive": true
    });
    var result = callgetlist('GetMeeting', filter_val);

    var options = "<option value=''>Select Meeting</option>";
    for (var i = 0; i < result.length; i++) {
        options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
    }
    $(".meetingList").html(options);
}

// ========================== Submit post call 445 ============================ /

function AddPostDataMeeting(argument) {
    var counter = 0;

    // 3-> Meeting

    if ($('#Meeting').val() == "") {
        $('#Meeting').addClass("redClass");
        counter++;
    } else {
        $('#Meeting').removeClass("redClass");
    }

    if ($('#meetingDate').val() == "") {
        $('#meetingDate').addClass("redClass");
        counter++;
    } else {
        $('#meetingDate').removeClass("redClass");
    }

    if ($('#fromTime').val() == "" || $('#fromTime').val() == 0) {
        $('#fromTime').addClass("redClass");
        counter++;
    } else {
        $('#fromTime').removeClass("redClass");
    }

    if ($('#toTime').val() == "" || $('#toTime').val() == 0) {
        $('#toTime').addClass("redClass");
        counter++;
    } else {
        $('#toTime').removeClass("redClass");
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
            "Meeting": parseInt($('#Meeting').val()),
            "Date": $('#meetingDate').val(),
            "FromTime": $('#fromTime').val(),
            "ToTime": $('#toTime').val(),
            "Comments": $('.actionComment').val()
        }
    }
    var result = PostDataCall(request);
    $('#sucess-response').html(result.Message);
    $('.clear-form').click();

}

// ========================== on change Meeting List ============================ /

function meeting_OnChange(e) {
    var selectedValue = $(e).val();
    var meetingComment = $("option:selected", e).html();

    if (selectedValue == '') {
        $(".actionComment").val('');
    } else {
        $(".actionComment").val("Discusion about " + meetingComment);
    }

}

// ========================== Meeting Fields Hide Show ============================ /

function meetingHideShowFields(argument) {
    $(".actionComment").val('');
    $(".meetingList").prop('selectedIndex', 0);
}