// suggestions.on('paste', function (evt) {
//     ////console.log(evt.data.dataTransfer.getFile(0));
//     if (evt.data.dataTransfer.getFilesCount() > 0) {
//         var f = evt.data.dataTransfer.getFile(0);
//         var reader = new FileReader();
//         reader.onload = function (evt) {
//             var element = suggestions.document.createElement('img', {
//                 attributes: {
//                     src: evt.target.result
//                 }
//             });

//             setTimeout(function () {
//                 suggestions.insertElement(element);
//             }, 0);
//         };
//         reader.readAsDataURL(f);
//     }
// });

function GetDefaultSuggestions() {
    var filter_val = JSON.stringify({
        "IsActive": true
    });
    var result = callgetlist('GetSuggestions', filter_val);
    var DefaultSuggestions = '';
    for (var i = 0; i < result.length; i++) {
        DefaultSuggestions += '<label class="container">' + result[i].Description;
        DefaultSuggestions += '<input type="checkbox" class="Suggestions_checkbox" value="' + result[i].Description + '">';
        DefaultSuggestions += '<span class="checkmark"></span>';
        DefaultSuggestions += '</label>';
    }
    $(".displayDefaultSuggestions").html(DefaultSuggestions);
}


$(document).ready(function () {

    $('#Suggestions_select_all').on('click', function () {
        if (this.checked) {
            $('.Suggestions_checkbox').each(function () {
                this.checked = true;
            });
        } else {
            $('.Suggestions_checkbox').each(function () {
                this.checked = false;
            });
        }
    });



    $('.Suggestions_checkbox').on('click', function () {
        if ($('.Suggestions_checkbox:checked').length == $('.Suggestions_checkbox').length) {
            $('#Suggestions_select_all').prop('checked', true);
        } else {
            $('#Suggestions_select_all').prop('checked', false);
        }
    });
});


$('#importSuggestions').on('click', function () {
    var getdata = suggestionsDxEditor.option("value");
    var html = "";
    html += getdata;
    $('.Suggestions_checkbox').each(function () {
        if ($(this).is(':checked'))
            html += $(this).val();
    });
    //CKEDITOR.instances['editor1'].setData(html)
    suggestionsDxEditor.option("value", html);
    $('#Suggestions').modal('toggle');
    $('.Suggestions_checkbox').prop("checked", false);
    $('#Suggestions_select_all').prop("checked", false);
});



function AddSuggestions() {
    // debugger;
    var sugg = suggestionsDxEditor.option("value");
    var Suggestions_title = $("#proposal-title-11").html();
    // if (sugg == '') {
    //     $("#suggestions_err").html('Please Write suggestions for better Understanding.');
    //     return false;
    // } else {
    //     $("#suggestions_err").html('');
    // }

    $("#pdf_Suggestions").html(sugg);

    var get_ProposalId = localStorage.getItem('ProposalId');
    var set_ProposalId = "";
    if (get_ProposalId != "") {
        set_ProposalId = get_ProposalId;
    } else {
        ProposalSwal("OOPS!","PropsalId not found","error")
        return false;
    }

    var sugg_obj = {
        "ProposalId": set_ProposalId,
        "Description": sugg,
        "Title" : Suggestions_title
    };

    data = {
        "Method": "PostRFPSuggestions",
        "Data": sugg_obj
    }
    var postCall = PostDataCall(data);
    /*  //console.log('Here I have set ProjectId 1 as default for temprory solution.');*/
    if (postCall['IsSuccess'] == true) {
        // console.log(postCall['Message']);
        return true;
    } else {
        // console.log(postCall['Message']);
        return true;
    }
}


function GetSuggestionsForRFP(SetProposalId) {
    if (SetProposalId != "") {
        var filter_val = JSON.stringify({
            "IsActive": true,
            "ProposalId": SetProposalId
        });
        var result = callgetlist('GetSuggestionsForRFP', filter_val);
        if (result[0]['Suggestions'] != null && result[0]['Suggestions'].length > 0) {
            // CKEDITOR.instances.suggestions.setData(result[0]['Suggestions']);
            suggestionsDxEditor.option("value", result[0]['Suggestions']);
        }
        $("#proposal-title-11").html(result[0]['Title']);

    } else {
        //console.log("ProposalId is empty . suggestions.js > line number > 133")
    }
}