function select_rfphandling(argument) {

    // 2-> RFP
    $(".actionDescSidebar").removeClass("hidden");
    $(".actionForm").removeClass("col-md-12");
    $(".actionForm").addClass("col-md-6");
    $(".modealExpand").addClass("modal-lg");

    $("#rfp-edit").removeClass("hidden");
    $("#RfpHoursDiv").addClass("hidden");
    $("#billableDiv").addClass("hidden");

    if ($("#rfpHours").hasClass('hidden')) {
        $("#rfpHours").removeClass('hidden')
    }
    //$("#RfpHoursDiv").addClass("hidden");
    var filter_val = JSON.stringify({
        "IsActive": true
    });
    var result = callgetlist('GetRFP', filter_val);
    var options = "<option value=''>Select RFP</option>";
    for (var i = 0; i < result.length; i++) {
        options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
    }
    $(".RFPList").html(options);
}

// ========================== Submit post call 445 ============================ /

function AddPostDataRfpHandling(argument) {
    var counter = 0;

    // 2-> RFP
    if ($('#RFP').val() == "") {
        $('#RFP').addClass("redClass");
        counter++;
    } else {
        $('#RFP').removeClass("redClass");
    }

    if ($('#rfpDate').val() == "") {
        $('#rfpDate').addClass("redClass");
        counter++;
    } else {
        $('#rfpDate').removeClass("redClass");
    }

    if ($('#rfpHours').val() == "" || $('#rfpHours').val() == 0) {
        $('#rfpHours').addClass("redClass");
        counter++;
    } else {
        $('#rfpHours').removeClass("redClass");
    }

    if (counter > 0) {
        $('#error-response').html("Require Fields are Missing");
        return false;
    } else {
        $('#error-response').html("");
    }
    request = {
        "Method": "PostRfpTaskLog",
        "Data": {
            "RfpId": parseInt($('#RFP').val()),
            "RfpDate": $('#rfpDate').val(),
            "RfpHours": parseInt($('#rfpHours').val()),
            "Comments": $('.actionComment').val()
        }
    }
    var result = PostDataCall(request);
    //$('#sucess-response').html(result);
    $('#sucess-response').html(result.Message);
    $('.clear-form').click();
}

// ========================== on change RPF List ============================ /
function rfp_OnChange(e) {
    var rfid = $(e).val();
    var filter_val = JSON.stringify({
        "RFPId": rfid
    });
    var result = callgetlist('GetRFPDescription', filter_val);
    //////console.log(result);
    $('.rfp_description').html(result[0].Description);

}

// ========================== Meeting Fields Hide Show ============================ /
function rfpHideShowFields(argument) {
    $(".modealExpand").removeClass("modal-lg");
    if ($(".actionDescSidebar").hasClass("hidden") != true) {
        $(".actionDescSidebar").addClass("hidden");
    }
}