function openResign() {
    $('#resignationAnswerModal').appendTo('body').modal('show')
    $('#othertimeReason, #otherResReason, #resYesPrompt, #resYesDiscuss').hide()

    // Yes or no text area show hide the yes button should have class yesReason and no button should have class noReason
    $('.yesReason, .noReason').click(function () {
        if ($(this).hasClass('yesReason')) {
            $(`#${$(this).parents('.quesform').attr("id")}`).children().find('textarea').show()
        } else {
            $('#' + $(this).parents('.quesform').attr("id")).children().find('textarea').hide()
        }
    })
    // Checkbox other click button ( Should Have class otherCheck )
    $('.otherCheck').click(function () {
        if($(this).prop('checked')){
            $('#' + $(this).parents('.quesform').attr("id")).children().find('textarea').show()
        }else{
            $('#' + $(this).parents('.quesform').attr("id")).children().find('textarea').hide()
        }
    })
    // Ckeditor for resignation summary
    var resignationSummary = CKEDITOR.replace('resignationSummary');
    // SmartWizard Setup
    $('#res-smartwizard').smartWizard({
        showStepURLhash: false,
        keyNavigation: false,
        backButtonSupport: false,
        anchorSettings: {
            anchorClickable: false,
        },
        toolbarSettings: {
            showPreviousButton: false,
            toolbarExtraButtons:
                [
                    $('<button></button>').text('Close')
                        .addClass('btn btn-success closeBtn hidden-btn')
                        .on('click', function () {
                            $("#resignationAnswerModal .close").click();
                        })
                ]
        }
    });

    $("#res-smartwizard").on("showStep", function (e, anchorObject, stepNumber, stepDirection) {
        // Remove Next btn and show close on final step
        if (stepNumber == 5) {
            $('.closeBtn').removeClass('hidden-btn');
            $('.sw-btn-next').addClass('hidden-btn');
        } else {
            $('.closeBtn').addClass('hidden-btn');
            $('.sw-btn-next').removeClass('hidden-btn');
        }
    })

    $("#res-smartwizard").on("leaveStep", function (e, anchorObject, stepNumber, stepDirection, stepPosition) {
        // Resignation summary required validation
        var resignationSummarytxt = CKEDITOR.instances.resignationSummary.getData();
        if ($('#quesForm' + stepNumber).find('.otherCheck').length > 0) {
            if ($('#quesForm' + stepNumber).find('.otherCheck').prop('checked')) {
                if ($('#quesForm' + stepNumber).find('textarea').val() == "") {
                    alert('Please Fill the Text Area')
                    return false;
                }
            } else {
                $(`#quesForm${stepNumber} .textArea_error`).html('')
            }
        }
        if (!checkEmpty(resignationSummarytxt)) {
            $('.resSummaryErr').html('Please Provide Resignation Summary')
            return false;
        } else {
            $('.resSummaryErr').html('');
        }
        if (stepNumber == 1) {
            // Validation for Step 2
            let count = 0;
            $.each($('#quesForm1').children().find('input[type=checkbox]'), function (key, value) {
                if ($(value).prop('checked')) {
                    count += 1;
                }
            })
            if (count <= 0) {
                $('.step-2-err').html('Please provide the information')
                return false;
            } else {
                $('.step-2-err').html('')
            }
        }
        if (stepNumber == 2) {
            // Validation for Step 3
            let count = 0;
            $.each($('#quesForm2').children().find('input[type=checkbox]'), function (key, value) {
                if ($(value).prop('checked')) {
                    count += 1;
                }
            })
            if (count <= 0) {
                $('.step-3-err').html('Please provide the information')
                return false;
            } else {
                $('.step-3-err').html('')
            }
        }
        if (stepNumber == 3) {
            // Validation for Step 4
            let count = 0;
            $.each($('#quesForm3').children().find('input[type=radio]'), function (key, value) {
                if ($(value).prop('checked')) {
                    count += 1;
                }
            })
            if (count <= 0) {
                $('.step-4-err').html('Please provide the information')
                return false;
            } else {
                $('.step-4-err').html('')
            }
        }
        if (stepNumber == 4) {
            // Validation for Step 5
            let count = 0;
            $.each($('#quesForm4').children().find('input[type=radio]'), function (key, value) {
                if ($(value).prop('checked')) {
                    count += 1;
                }
            })
            if (count <= 0) {
                $('.step-5-err').html('Please provide the information')
                return false;
            } else {
                $('.step-5-err').html('')
            }
        }

    })
    function checkEmpty(val) {
        if (val && val != "") {
            return true
        } else {
            return false;
        }
    }
}
