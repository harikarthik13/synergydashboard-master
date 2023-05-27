function select_supporthr_defaulters(argument) {

    // 7-> SupportToHRTeam
    $("#defaulters-supportToHR-edit").removeClass("hidden");
    $("#RfpHoursDiv").addClass("hidden");
    $("#rfpHours").addClass("hidden");

    var result = callgetlist('GetSupporttoHrTeam', '{"IsActive":"true"}');
    var options = "<option value=''>Select Type</option>";
    for (var i = 0; i < result.length; i++) {
        options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
    }
    $(".defaulters-supportToHRList").html(options);

    var supporthr_result = callgetlist('GetSupportToHRWhom', '{"IsActive":"true"}');
    var supporthr_options = "<option value=''>Select Name</option>";
    for (var i = 0; i < supporthr_result.length; i++) {
        supporthr_options += "<option value='" + supporthr_result[i].Id + "'>" + supporthr_result[i].Name + "</option>";
    }
    $(".supportToHRtowhom").html(supporthr_options);

}

// ========================== Submit post call 445 ============================ /

function AddPostDataSupportHrDefaulters() {
    var counter = 0;

    // 7-> SupportToHRTeam
    if ($('#defaulters-Support_to_HR_Team').val() == "") {
        $('#defaulters-Support_to_HR_Team').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-Support_to_HR_Team').removeClass("redClass");
    }

    if ($('#Support_to_HR_person').val() == "") {
        $('#Support_to_HR_person').addClass("redClass");
        counter++;
    } else {
        $('#Support_to_HR_person').removeClass("redClass");
    }

    if ($('#defaulters-HRHours').val() == "" || $('#defaulters-HRHours').val() == 0) {
        $('#defaulters-HRHours').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-HRHours').removeClass("redClass");
    }

    if (counter > 0) {
        $('#error-response').html("Require Fields are Missing");
        return false;
    } else {
        $('#error-response').html("");
    }

    request = {
        "Method": "PostSupportToHRTeamTaskLog",
        "Data": {
            "Type": parseInt($('#defaulters-Support_to_HR_Team').val()),
            "Date": today,
            "ToWhom": parseInt($('#Support_to_HR_person').val()),
            "Hours": parseInt($('#defaulters-HRHours').val()),
            "Comments": $('.defaulters-actionComment').val()
        }
    }
    var result = PostDataCall(request);
    $('#sucess-response').html(result.Message);
    $('.clear-form').click();
}

// ========================== on change HR List ============================ /

function defaulters_hrtype_OnChange(e) {

    var selectedValue = $(e).val();
    var marketingComment = $("option:selected", e).html();
    if (selectedValue == '') {
        $(".defaulters-actionComment").val('');
    } else {
        $(".defaulters-actionComment").val(marketingComment);
    }

}
// ========================== on change HR List ============================ /