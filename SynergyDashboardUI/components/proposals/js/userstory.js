// user_story.on('paste', function (evt) {
//     ////console.log(evt.data.dataTransfer.getFile(0));
//     if (evt.data.dataTransfer.getFilesCount() > 0) {
//         var f = evt.data.dataTransfer.getFile(0);
//         var reader = new FileReader();
//         reader.onload = function (evt) {
//             var element = user_story.document.createElement('img', {
//                 attributes: {
//                     src: evt.target.result
//                 }
//             });

//             setTimeout(function () {
//                 user_story.insertElement(element);
//             }, 0);
//         };
//         reader.readAsDataURL(f);
//     }
// });



function AddUserStory() {
// debugger;
    // var user_story_txt = CKEDITOR.instances.user_story.getData();
    var user_story_txt = userStoryDxEditor.option("value");
    var user_story_title = $("#proposal-title-3").html();
    // $('#user_story').on('change', () => {
    //     debugger
    //     if (user_story_txt == '') {
    //         $("#user_story_err").html('Please Write User Story for better Understanding.');
    //     } else {
    //         $("#user_story_err").html('');
    //     }

    // })
    // if (user_story_txt == '') {
    //     $("#user_story_err").html('Please Write User Story for better Understanding.');
    //     return false;
    // } else {
    //     $("#user_story_err").html('');
    // }

    $("#pdf_UserStory").html(user_story_txt);

    var get_ProposalId = localStorage.getItem('ProposalId');
    var set_ProposalId = "";
    if (get_ProposalId != "") {
        set_ProposalId = get_ProposalId;
    } else {
        ProposalSwal("OOPS!","PropsalId not found","error")
        return false;
    }

    var userStoryobj = {
        "Description": user_story_txt,
        "ProposalId": set_ProposalId,
        "Title":user_story_title
    };

    data = {
        "Method": "PostUserStoryandUnderstand",
        "Data": userStoryobj
    }

    var postCall = PostDataCall(data);
    /* //console.log('Here I have set ProjectId 1 as default for temprory solution.');*/
    if (postCall['IsSuccess'] == true) {
        //console.log(postCall['Message']);
        return true;
    } else {
        //console.log(postCall['Message']);
        return true;
    }
}


function GetUserStoryandUnderstand(SetProposalId) {
    if (SetProposalId != "") {
        var filter_val = JSON.stringify({
            "IsActive": true,
            "ProposalId": SetProposalId
        });
        var result = callgetlist('GetUserStoryandUnderstand', filter_val);
        //console.log(result);
        if (result[0]['Story'] != null && result[0]['Story'].length > 0) {
            // CKEDITOR.instances.user_story.setData(result[0]['Story']);
            userStoryDxEditor.option("value", result[0]['Story'] )
        }
        $("#proposal-title-3").html(result[0]['Title']);

    } else {
        //console.log("ProposalId is empty . userstory.js > line number > 80")
    }
}