// assumptions.on('paste', function (evt) {
//     ////console.log(evt.data.dataTransfer.getFile(0));
//     if (evt.data.dataTransfer.getFilesCount() > 0) {
//         var f = evt.data.dataTransfer.getFile(0);
//         var reader = new FileReader();
//         reader.onload = function (evt) {
//             var element = assumptions.document.createElement('img', {
//                 attributes: {
//                     src: evt.target.result
//                 }
//             });

//             setTimeout(function () {
//                 assumptions.insertElement(element);
//             }, 0);
//         };
//         reader.readAsDataURL(f);
//     }
// });

function GetDefaultAssumptions() {
    var filter_val = JSON.stringify({
        "IsActive": true
    });
    var result = callgetlist('GetAssumptions', filter_val);
    var DefaultAssumptions = '';
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            DefaultAssumptions += '<label class="container">' + result[i].Assumation;
            DefaultAssumptions += '<input type="checkbox" class="checkbox" value="' + result[i].Assumation + '">';
            DefaultAssumptions += '<span class="checkmark"></span>';
            DefaultAssumptions += '</label>';
        }
    } else {
        DefaultAssumptions += 'No Records Found.';
    }
    $(".displayDefaultAssumptions").html(DefaultAssumptions);

}


$(document).ready(function () {

    $('#select_all').on('click', function () {
        if (this.checked) {
            $('.checkbox').each(function () {
                this.checked = true;
            });
        } else {
            $('.checkbox').each(function () {
                this.checked = false;
            });
        }
    });

    $('.checkbox').on('click', function () {
        if ($('.checkbox:checked').length == $('.checkbox').length) {
            $('#select_all').prop('checked', true);
        } else {
            $('#select_all').prop('checked', false);
        }
    });
});


$('#importAssumption').on('click', function () {
    // var getdata = CKEDITOR.instances.assumptions.getData();
    var getdata = assumptionsDxEditor.option("value");
    var html = "";
    html += getdata;
    $('.checkbox').each(function () {
        if ($(this).is(':checked'))
            html += $(this).val();
    });
    //CKEDITOR.instances['editor1'].setData(html)
    assumptionsDxEditor.option("value", html);
    $('#assumptionModal').modal('toggle');
    $('.checkbox').prop("checked", false);
    $('#select_all').prop("checked", false);
});



function AddAssumptions() {
    // debugger;
    var ass = assumptionsDxEditor.option("value");
    var assumptions_title = $("#proposal-title-7").html();
    // if (ass == '') {
    //     $("#assumptions_err").html('Please Write some assumptions for better Understanding.');
    //     return false;
    // } else {
    //     $("#assumptions_err").html('');
    // }

    $("#pdf_Assumptions").html(ass);

    var get_ProposalId = localStorage.getItem('ProposalId');
    var set_ProposalId = "";
    if (get_ProposalId != "") {
        set_ProposalId = get_ProposalId;
    } else {
        ProposalSwal("OOPS!","PropsalId not found","error")
        return false;
    }

    var assmp_obj = {
        "ProposalId": set_ProposalId,
        "Description": ass,
        "Title" : assumptions_title
    };


    data = {
        "Method": "PostRFPAssumptions",
        "Data": assmp_obj
    }
    var postCall = PostDataCall(data);
    /* //console.log('Here I have set ProjectId 1 as default for temprory solution.');*/
    if (postCall['IsSuccess'] == true) {
        // console.log(postCall['Message']);
        return true;
    } else {
        // console.log(postCall['Message']);
        return true;
    }
}


function GetAssumptionForRFP(SetProposalId) {
    // debugger;
    if (SetProposalId != "") {
        var filter_val = JSON.stringify({
            "IsActive": true,
            "ProposalId": SetProposalId
        });
        var result = callgetlist('GetAssumptionForRFP', filter_val);
        if (result[0]['Assumptions'] != null && result[0]['Assumptions'].length > 0) {
            // CKEDITOR.instances.assumptions.setData(result[0]['Assumptions']);
            assumptionsDxEditor.option("value", result[0]['Assumptions']);
        }
        $("#proposal-title-7").html(result[0]['Title']);
    } else {
        //console.log("ProposalId is empty . assumptions.js > line number > 130")
    }
}