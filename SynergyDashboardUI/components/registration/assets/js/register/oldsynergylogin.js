function ValidateoldCredentials(parent_fieldset) {
    OldSynergyUserIdVal = parent_fieldset.find('input[id="old_user_id"]').val();
    var OldSynergyUserPasswordVal = parent_fieldset.find('input[id="old_user_password"]').val();


    if (OldSynergyUserIdVal == "" || OldSynergyUserPasswordVal == "") {
        if (OldSynergyUserIdVal == "") {
            $('#login-userid-error').html("Enter user id");
            $('#old_user_id').addClass('input-error');
            next_step = false;
        } else {
            $('#login-userid-error').html("");
            $('#old_user_id').removeClass('input-error');
        }
        if (OldSynergyUserPasswordVal == "") {
            $('#login-password-error').html("Enter password");
            $('#old_user_password').addClass('input-error');
            next_step = false;
        } else {
            $('#login-password-error').html("");
            $('#old_user_password').removeClass('input-error');
        }
    } else {
        $('#login-userid-error').html("");
        $('#old_user_id').removeClass('input-error');
        $('#login-password-error').html("");
        $('#old_user_password').removeClass('input-error');

        var data = []
        data = {
            "Method": "ValidateOldSynergyLogin",
            "Data": {
                "OldSynergyUserId": OldSynergyUserIdVal,
                "LoginPassword": OldSynergyUserPasswordVal
            }
        }

        return data;
    }

    ////console.log(next_step);
    return next_step;
}


function validationSuccess(postCall) {
    //localStorage.setItem("UserCheckRes",JSON.stringify(postCall));
    localStorage.setItem("securityToken", JSON.stringify(postCall.Data[0].AuthorizeToken));

    localStorage.setItem("UserCheckRes", JSON.stringify(postCall));
    next_step = true;
    var result = callgetlist('GetCationsForPage', '{"Page":"changepassword"}');
    var caption_info = result[0].Info;
    if (result) {
        $('#password-caption').html(caption_info);
    } else {
        $('#password-caption').html("To use our new synergy application, login with your existing credentials");
    }
}

function landing(landingNumber, progress_line, thisbtn, current_active_step, fieldSetClasses) {
    if (landingNumber != "") {
        var stepno = landingNumber;
        bar_progress_landing(progress_line, 'right', stepno);
    }

    if (parseInt(landingNumber) > 1) {
        $(thisbtn).parents('.f1').find('.f1-step').each(function (key, value) {
            if (parseInt(landingNumber) - 1 == key) {
                current_active_step.removeClass('active');
                $(value).addClass('active');
                $(thisbtn).parents('.f1').find('#' + fieldSetClasses[0]).css({
                    display: 'none'
                });
                $(thisbtn).parents('.f1').find('#' + fieldSetClasses[key]).css({
                    display: 'block'
                });
            } else if ((parseInt(landingNumber) - 1 > key)) {
                $(value).addClass('activated');
            }
        })
        next_step = false;
    }
}

function bar_progress_landing(progress_line_object, direction, stepno) {

    var number_of_steps = progress_line_object.data('number-of-steps');

    if (stepno == 1) {
        var now_value = progress_line_object.data('now-value') * (stepno / 0);
    }
    if (stepno == 2) {
        var now_value = progress_line_object.data('now-value') * (stepno / 2.2);
    }
    if (stepno == 3) {
        var now_value = progress_line_object.data('now-value') * (stepno);
    }
    if (stepno == 4) {
        var now_value = progress_line_object.data('now-value') * (stepno / 0.8);
    }
    if (stepno == 5) {
        var now_value = progress_line_object.data('now-value') * (stepno / 0.7);
    }
    if (stepno == 6) {
        var now_value = progress_line_object.data('now-value') * (stepno / 0.65);
    }
    if (stepno == 7) {
        var now_value = progress_line_object.data('now-value') * (stepno / 0.62);
    }

    var new_value = 0;
    ////console.log(number_of_steps,now_value);
    if (direction == 'right') {
        new_value = now_value + (100 / number_of_steps);
    } else if (direction == 'left') {
        new_value = now_value - (100 / number_of_steps);
    }
    progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
}