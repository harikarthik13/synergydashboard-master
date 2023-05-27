function select_rfphandling_defaulters(argument) {

    // 2-> RFP
    $(".defaulters-actionDescSidebar").removeClass("hidden");
    $(".defaulters-actionForm").removeClass("col-md-12");
    $(".defaulters-actionForm").addClass("col-md-6");
    $(".modealExpand").addClass("modal-lg");

    $("#defaulters-rfp-edit").removeClass("hidden");
    $("#RfpHoursDiv").addClass("hidden");
    $("#defaulters-billableDiv").addClass("hidden");

    if ($("#defaulters-rfpHours").hasClass('hidden')) {
        $("#defaulters-rfpHours").removeClass('hidden')
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

function AddPostDataRfpHandlingDefaulters(argument) {
    var counter = 0;

    // 2-> RFP
    if ($('#defaulters-RFP').val() == "") {
        $('#defaulters-RFP').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-RFP').removeClass("redClass");
    }

    if ($('#defaulters-rfpDate').val() == "") {
        $('#defaulters-rfpDate').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-rfpDate').removeClass("redClass");
    }

    if ($('#defaulters-rfpHours').val() == "" || $('#defaulters-rfpHours').val() == 0) {
        $('#defaulters-rfpHours').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-rfpHours').removeClass("redClass");
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
            "RfpId": parseInt($('#defaulters-RFP').val()),
            "RfpDate": $('#defaulters-rfpDate').val(),
            "RfpHours": parseInt($('#defaulters-rfpHours').val()),
            "Comments": $('.defaulters-actionComment').val()
        }
    }
    var result = PostDataCall(request);
    //$('#sucess-response').html(result);
    $('#sucess-response').html(result.Message);
    $('.clear-form').click();
}

// ========================== on change RPF List ============================ /
function rfp_Defaulters_OnChange(e) {
    var rfid = $(e).val();
    var filter_val = JSON.stringify({
        "RFPId": rfid
    });
    var result = callgetlist('GetRFPDescription', filter_val);
    //////console.log(result);
    $('.defaulters-rfp_description').html(result[0].Description);

}

// ========================== Meeting Fields Hide Show ============================ /
function rfpHideShowFieldsDefaulters(argument) {
    $(".modealExpand").removeClass("modal-lg");
    if ($(".defaulters-actionDescSidebar").hasClass("hidden") != true) {
        $(".defaulters-actionDescSidebar").addClass("hidden");
    }
}