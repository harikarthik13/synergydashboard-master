function GetEstimateCreators() {
    var localStorageProposalId = localStorage.getItem('ProposalId');
    var SetProposalId = "";
    if (localStorageProposalId != "") {
        SetProposalId = localStorageProposalId;
    }
    var filter_val = JSON.stringify({
        "ProposalId": SetProposalId,
        "IsActive": true
    });
    var result = callgetlist('GetEstimateCreators', filter_val);
    //console.log(result);
    var pby = [];
    var eby = [];
    var rby = [];
    /*    var options = "<option value=''>Select "+option_variable+" </option>";*/
    for (var i = 0; i < result.length; i++) {
        //console.log(result[i].ID);
        //console.log(result[i].DisplayName);

        if (result[i].ID == "PreparedBy") {
            dpby = pby.push(result[i].DisplayName + " ");
        }

        if (result[i].ID == "EstimatedBy") {
            deby = eby.push(result[i].DisplayName + " ");
        }

        if (result[i].ID == "ReviewedBy") {
            drby = rby.push(result[i].DisplayName + " ");
        }

        /*options += "<option value='"+ result[i].Id +"' class='backend"+result[i].Id+"'>"+ result[i][option_variable] +"</option>";*/
    }
    $("#GetPreparedBy_1").html(pby.toString());
    $("#GetPreparedBy_2").html(eby.toString());
    $("#GetPreparedBy_3").html(rby.toString());
}



$(".add-prepared").click(function () {

    var prepared_name = $('#prepared-by option:selected').text();
    var prepared_id = $('#prepared-by').val();
    if (prepared_id != "") {
        $('#prepared-employee' + prepared_id).remove();
        $('#prepared-employee').append('<div id="prepared-employee' + prepared_id + '">' + prepared_name + '<input type="button" class="btn-xs btn-danger del-btn-emp" value="x" ><input type="hidden" name="prepared_user[]" class="prepared_user" value="' + prepared_id + '" /></div>');
        $('#prepared-by').val("");
        //$('#prepared-by option:selected').remove();
    }

});


$(".add-estimate").click(function () {
    var estimate_name = $('#estimated-by option:selected').text();
    var estimate_id = $('#estimated-by').val();
    if (estimate_id != "") {
        $('#estimated-employee' + estimate_id).remove();
        $('#estimated-employee').append('<div id="estimated-employee' + estimate_id + '">' + estimate_name + '<input type="button" class="btn-xs btn-danger del-btn-emp" id="del-btn" value="x" ><input type="hidden" name="estimated_user[]" class="estimated_user" value="' + estimate_id + '" /></div>');
        $('#estimated-by').val("");
        //$('#estimated-by option:selected').remove();
    }

});


$(".add-reviewed").click(function () {
    var reviewed_name = $('#reviewed-by option:selected').text();
    var reviewed_id = $('#reviewed-by').val();
    if (reviewed_id != "") {
        $('#reviewed-employee' + reviewed_id).remove();
        $('#reviewed-employee').append('<div id="reviewed-employee' + reviewed_id + '">' + reviewed_name + '<input type="button" class="btn-xs btn-danger del-btn-emp" value="x" ><input type="hidden" name="reviewed_user[]" class="reviewed_user" value="' + reviewed_id + '" /></div>');
        $('#reviewed-by').val("");
        //$('#reviewed-by option:selected').remove();
    }

});

$('body').on('click', ".del-btn-emp", function () {
    $(this).parent().remove();
});


function AddEstimateCreators() {

    var prepared_user = new Array();
    $('.prepared_user').each(function () {
        prepared_user.push($(this).val());
    });

    var estimated_user = new Array();
    $('.estimated_user').each(function () {
        estimated_user.push($(this).val());
    });

    var reviewed_user = new Array();
    $('.reviewed_user').each(function () {
        reviewed_user.push($(this).val());
    });

    var err = 0;
    if (prepared_user.length == 0) {
        $('#prepared-by').addClass('required_field');
        $("#prepared-by").next("span").html('Please Select Prepared By.');
        err++;
    } else {
        $('#prepared-by').removeClass('required_field');
        $("#prepared-by").next("span").html("");
    }

    if (estimated_user.length == 0) {
        $('#estimated-by').addClass('required_field');
        $("#estimated-by").next("span").html('Please Select Estimated By.');
        err++;
    } else {
        $('#estimated-by').removeClass('required_field');
        $("#estimated-by").next("span").html("");
    }

    if (reviewed_user.length == 0) {
        $('#reviewed-by').addClass('required_field');
        $("#reviewed-by").next("span").html('Please Select Reviewed By .');
        err++;
    } else {
        $('#reviewed-by').removeClass('required_field');
        $("#reviewed-by").next("span").html("");
    }

    if (err > 0) {
        return false;
    } else {
        $('.creatorError').removeClass("required_field");
        $('.error_message').html("");
    }

    var get_ProposalId = localStorage.getItem('ProposalId');
    var set_ProposalId = "";
    if (get_ProposalId != "") {
        set_ProposalId = get_ProposalId;
    } else {
        ProposalSwal("OOPS!","PropsalId not found","error")
        return false;
    }



    var ProposalDetails = {
        "Ba": prepared_user.toString(),
        "Developer": reviewed_user.toString(),
        "Lead": estimated_user.toString(),
        /*"CreatorsId" : "",
        "Type": "",*/
        "ProposalId": set_ProposalId
    };

    //console.log(ProposalDetails);

    data = {
        "Method": "PostRFPCreatorsDetails",
        "Data": ProposalDetails
    }

    //console.log(data);

    var postCall = PostDataCall(data);
    if (postCall['IsSuccess'] == true) {
        //console.log(postCall['Message']);
        return true;
    } else {
        //console.log(postCall['Message']);
        return true;
    }
}