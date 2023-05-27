// out_of_scope.on('paste', function (evt) {
//     ////console.log(evt.data.dataTransfer.getFile(0));
//     if (evt.data.dataTransfer.getFilesCount() > 0) {
//         var f = evt.data.dataTransfer.getFile(0);
//         var reader = new FileReader();
//         reader.onload = function (evt) {
//             var element = out_of_scope.document.createElement('img', {
//                 attributes: {
//                     src: evt.target.result
//                 }
//             });

//             setTimeout(function () {
//                 out_of_scope.insertElement(element);
//             }, 0);
//         };
//         reader.readAsDataURL(f);
//     }
// });

function GetDefaultOutOfScope() {
    var filter_val = JSON.stringify({
        "IsActive": true
    });
    var result = callgetlist('GetOutofScope', filter_val);
    var DefaultOutOfScope = '';
    for (var i = 0; i < result.length; i++) {
        /*//console.log(result[i].Description);*/
        DefaultOutOfScope += '<label class="container">' + result[i].Description;
        DefaultOutOfScope += '<input type="checkbox" class="OutOfScope_checkbox" value="' + result[i].Description + '">';
        DefaultOutOfScope += '<span class="checkmark"></span>';
        DefaultOutOfScope += '</label>';
    }
    $(".displayDefaultOutOfScope").html(DefaultOutOfScope);
}


$(document).ready(function () {

    $('#OutOfScope_select_all').on('click', function () {
        if (this.checked) {
            $('.OutOfScope_checkbox').each(function () {
                this.checked = true;
            });
        } else {
            $('.OutOfScope_checkbox').each(function () {
                this.checked = false;
            });
        }
    });

    $('.OutOfScope_checkbox').on('click', function () {
        if ($('.OutOfScope_checkbox:checked').length == $('.OutOfScope_checkbox').length) {
            $('#OutOfScope_select_all').prop('checked', true);
        } else {
            $('#OutOfScope_select_all').prop('checked', false);
        }
    });
});


$('#importOutOfScope').on('click', function () {
    var getdata = out_of_scopeDxEditor.option("value");
    var html = "";
    html += getdata;
    $('.OutOfScope_checkbox').each(function () {
        if ($(this).is(':checked'))
            html += $(this).val();
    });
    //CKEDITOR.instances['editor1'].setData(html)
    out_of_scopeDxEditor.option("value", html);
    $('#OutOfScope').modal('toggle');
    $('.OutOfScope_checkbox').prop("checked", false);
    $('#OutOfScope_select_all').prop("checked", false);
});




function AddOutOfScope() {
    // debugger;
    var oos =  out_of_scopeDxEditor.option("value");
    var OutOfScope_Title = $("#proposal-title-8").html();
    // if (oos == '') {
    //     $("#OutOfScope_err").html('Please Write Out Of Scope for better Understanding.');
    //     return false;
    // } else {
    //     $("#OutOfScope_err").html('');
    // }

    $("#pdf_OutOfScope").html(oos);

    var get_ProposalId = localStorage.getItem('ProposalId');
    var set_ProposalId = "";
    if (get_ProposalId != "") {
        set_ProposalId = get_ProposalId;
    } else {
        ProposalSwal("OOPS!","PropsalId not found","error")
        return false;
    }

    var oos_obj = {
        "ProposalId": set_ProposalId,
        "Description": oos,
        "Title" : OutOfScope_Title
    };

    data = {
        "Method": "PostRFPOutofScope",
        "Data": oos_obj
    }
    var postCall = PostDataCall(data);
    /*   //console.log('Here I have set ProjectId 1 as default for temprory solution.');*/
    if (postCall['IsSuccess'] == true) {
        // console.log(postCall['Message']);
        return true;
    } else {
        // console.log(postCall['Message']);
        return true;
    }
}


function GetOutofScopesForRFP(SetProposalId) {
    // debugger;
    if (SetProposalId != "") {
        var filter_val = JSON.stringify({
            "IsActive": true,
            "ProposalId": SetProposalId
        });
        var result = callgetlist('GetOutofScopesForRFP', filter_val);
        if (result) {
            if (result[0]['OutOfScope'] != null && result[0]['OutOfScope'].length > 0) {
                // CKEDITOR.instances.out_of_scope.setData(result[0]['OutOfScope']);
                out_of_scopeDxEditor.option("value", result[0]['OutOfScope']);
            }
            $("#proposal-title-8").html(result[0]['Title']);
        }

    } else {
        //console.log("ProposalId is empty . out_of_scope.js > line number > 133")
    }
}