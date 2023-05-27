function select_supportmkt_defaulters(argument) {
    // 6-> SupportToMarketingTeam
    $("#defaulters-supportToMarketing-edit").removeClass("hidden");

    var result = callgetlist('GetTypesOfSupportToMarketing', '{"IsActive":"true"}');

    var options = "<option value=''>Select Type</option>";
    for (var i = 0; i < result.length; i++) {
        options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
    }
    $(".defaulters-supportToMarketingList").html(options);

    var market_result = callgetlist('GetSupportToMktWhom', '{"IsActive":"true"}');
    var market_options = "<option value=''>Select Name</option>";
    for (var i = 0; i < market_result.length; i++) {
        market_options += "<option value='" + market_result[i].Id + "'>" + market_result[i].Name + "</option>";
    }
    $(".supportToMarketToWhom").html(market_options);

}


// ========================== Submit post call 445 ============================ /

function AddPostDataSupportMktDefaulters(argument) {
    var counter = 0;

    // 6-> SupportToMarketingTeam
    if ($('#defaulters-Support_to_marketing_Team').val() == "") {
        $('#defaulters-Support_to_marketing_Team').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-Support_to_marketing_Team').removeClass("redClass");
    }

    if ($('#defaulters-Support_to_marketing_person').val() == "") {
        $('#defaulters-Support_to_marketing_person').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-Support_to_marketing_person').removeClass("redClass");
    }


    if ($('#defaulters-MarketingHours').val() == "" || $('#defaulters-MarketingHours').val() == 0) {
        $('#defaulters-MarketingHours').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-MarketingHours').removeClass("redClass");
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
            "ToWhom": parseInt($('#defaulters-Support_to_marketing_person').val()),
            "Hours": parseInt($('#defaulters-MarketingHours').val()),
            "Comments": $('.defaulters-actionComment').val()
        }
    }
    var result = PostDataCall(request);
    $('#sucess-response').html(result.Message);
    $('.clear-form').click();
}


// ========================== on change Support Marketing List ============================ /

function defaulters_marketingtype_OnChange(e) {

    var selectedValue = $(e).val();
    var marketingComment = $("option:selected", e).html();
    if (selectedValue == '') {
        $(".defaulters-actionComment").val('');
    } else {
        $(".defaulters-actionComment").val(marketingComment);
    }

}
// ========================== on change Support Marketing List ============================ /