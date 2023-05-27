// other_notes.on('paste', function (evt) {
//     ////console.log(evt.data.dataTransfer.getFile(0));
//     if (evt.data.dataTransfer.getFilesCount() > 0) {
//         var f = evt.data.dataTransfer.getFile(0);
//         var reader = new FileReader();
//         reader.onload = function (evt) {
//             var element = other_notes.document.createElement('img', {
//                 attributes: {
//                     src: evt.target.result
//                 }
//             });

//             setTimeout(function () {
//                 other_notes.insertElement(element);
//             }, 0);
//         };
//         reader.readAsDataURL(f);
//     }
// });

function GetDefaultOtherNotes() {
    var filter_val = JSON.stringify({
        "IsActive": true
    });
    var result = callgetlist('GetOtherNotes', filter_val);

    var DefaultOtherNotes = '';
    for (var i = 0; i < result.length; i++) {

        DefaultOtherNotes += '<label class="container">' + result[i].Description;
        DefaultOtherNotes += '<input type="checkbox" class="OtherNotes_checkbox" value="' + result[i].Description + '">';
        DefaultOtherNotes += '<span class="checkmark"></span>';
        DefaultOtherNotes += '</label>';
    }

    $(".displayDefaultOtherNotes").html(DefaultOtherNotes);
}


$(document).ready(function () {

    $('#OtherNotes_select_all').on('click', function () {
        if (this.checked) {
            $('.OtherNotes_checkbox').each(function () {
                this.checked = true;
            });
        } else {
            $('.OtherNotes_checkbox').each(function () {
                this.checked = false;
            });
        }
    });

    $('.OtherNotes_checkbox').on('click', function () {
        if ($('.OtherNotes_checkbox:checked').length == $('.OtherNotes_checkbox').length) {
            $('#OtherNotes_select_all').prop('checked', true);
        } else {
            $('#OtherNotes_select_all').prop('checked', false);
        }
    });
});


$('#importOtherNotes').on('click', function () {
    var getdata = other_notesDxEditor.option("value");
    var html = "";
    html += getdata;
    $('.OtherNotes_checkbox').each(function () {
        if ($(this).is(':checked'))
            html += $(this).val();
    });
    //CKEDITOR.instances['editor1'].setData(html)
    other_notesDxEditor.option("value", html);
    $('#OtherNotes').modal('toggle');
    $('.OtherNotes_checkbox').prop("checked", false);
    $('#OtherNotes_select_all').prop("checked", false);
});




function AddOtherNotes() {
    var on = other_notesDxEditor.option("value");
    var OtherNotes_title = $("#proposal-title-10").html();
    // if (on == '') {
    //     $("#OtherNotes_err").html('Please Write some notes for better Understanding.');
    //     return false;
    // } else {
    //     $("#OtherNotes_err").html('');
    // }

    $("#pdf_OtherNotes").html(on);

    var get_ProposalId = localStorage.getItem('ProposalId');
    var set_ProposalId = "";
    if (get_ProposalId != "") {
        set_ProposalId = get_ProposalId;
    } else {
        ProposalSwal("OOPS!","PropsalId not found","error")
        return false;
    }

    var on_obj = {
        "ProposalId": set_ProposalId,
        "Description": on,
        "Title" : OtherNotes_title
    };

    data = {
        "Method": "PostRFPOtherNotes",
        "Data": on_obj
    }
    var postCall = PostDataCall(data);
    /*//console.log('Here I have set ProjectId 1 as default for temprory solution.');*/
    if (postCall['IsSuccess'] == true) {
        // console.log(postCall['Message']);
        return true;
    } else {
        // console.log(postCall['Message']);
        return true;
    }
}


function GetOtherNotesForRFP(SetProposalId) {
    if (SetProposalId != "") {
        var filter_val = JSON.stringify({
            "IsActive": true,
            "ProposalId": SetProposalId
        });
        var result = callgetlist('GetOtherNotesForRFP', filter_val);
        if (result[0]['OtherNotes'] != null && result[0]['OtherNotes'].length > 0) {
            // CKEDITOR.instances.other_notes.setData(result[0]['OtherNotes']);
            other_notesDxEditor.option("value", result[0]['OtherNotes']);
        }
        $("#proposal-title-10").html(result[0]['Title']);
    } else {
        //console.log("ProposalId is empty . other_notes.js > line number > 135")
    }
}