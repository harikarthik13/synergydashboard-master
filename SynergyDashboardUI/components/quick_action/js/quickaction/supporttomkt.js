function select_supportmkt(argument) {
    // 6-> SupportToMarketingTeam
    $("#supportToMarketing-edit").removeClass("hidden");

    var result = callgetlist('GetTypesOfSupportToMarketing', '{"IsActive":"true"}');

    var options = "<option value=''>Select Type</option>";
    for (var i = 0; i < result.length; i++) {
        options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
    }
    $(".supportToMarketingList").html(options);

    var market_result = callgetlist('GetSupportToMktWhom', '{"IsActive":"true"}');
    var market_options = "<option value=''>Select Name</option>";
    for (var i = 0; i < market_result.length; i++) {
        market_options += "<option value='" + market_result[i].Id + "'>" + market_result[i].Name + "</option>";
    }
    $(".supportToMarketToWhom").html(market_options);

}


// ========================== Submit post call 445 ============================ /

function AddPostDataSupportMkt(argument) {
    var counter = 0;

    // 6-> SupportToMarketingTeam
    if ($('#Support_to_marketing_Team').val() == "") {
        $('#Support_to_marketing_Team').addClass("redClass");
        counter++;
    } else {
        $('#Support_to_marketing_Team').removeClass("redClass");
    }

    if ($('#Support_to_marketing_person').val() == "") {
        $('#Support_to_marketing_person').addClass("redClass");
        counter++;
    } else {
        $('#Support_to_marketing_person').removeClass("redClass");
    }


    if ($('#MarketingHours').val() == "" || $('#MarketingHours').val() == 0) {
        $('#MarketingHours').addClass("redClass");
        counter++;
    } else {
        $('#MarketingHours').removeClass("redClass");
    }

    if (counter > 0) {
        $('#error-response').html("Require Fields are Missing");
        return false;
    } else {
        $('#error-response').html("");
    }

    request = {
        "Method": "PostSupportToMarketingTeamTaskLog",
        "Data": {
            "Type": parseInt($('#Support_to_marketing_Team').val()),
            "Date": today,
            "ToWhom": parseInt($('#Support_to_marketing_person').val()),
            "Hours": parseInt($('#MarketingHours').val()),
            "Comments": $('.actionComment').val()
        }
    }
    var result = PostDataCall(request);
    $('#sucess-response').html(result.Message);
    $('.clear-form').click();
}


// ========================== on change Support Marketing List ============================ /

function marketingtype_OnChange(e) {

    var selectedValue = $(e).val();
    var marketingComment = $("option:selected", e).html();
    if (selectedValue == '') {
        $(".actionComment").val('');
    } else {
        $(".actionComment").val(marketingComment);
    }

}
// ========================== on change Support Marketing List ============================ /