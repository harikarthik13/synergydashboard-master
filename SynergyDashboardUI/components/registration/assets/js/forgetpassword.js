

function valid_reset_password(){
    var EmployeeID = getUrlParameter('id');
    var ForgotPasswordToken = getUrlParameter('token');
    var ForgotToken = "statictoken";
    var ResetNewPassword = $('input[id="reset_new_user_password"]').val();
    $('input[id="reset_new_user_password"]').val(EncryptPassword(ResetNewPassword));
    var EncryptResetNewPassword = $("#reset_new_user_password").val();

    // ////console.log(jsonData['Data'][0]);
    var ResetUserNewConfirmPassword = $('input[id="reset_new_user_confirm_password"]').val();
    $('input[id="reset_new_user_confirm_password"]').removeClass('input-error');
    var data = []
    data = {
        "Method": "RegisterNewPassword",
        "Data": {
            "Token": localStorage.getItem('securityToken'),
            "EmployeeID": EmployeeID,
            "ForgotPasswordToken": ForgotPasswordToken,
            "NewSecret": EncryptResetNewPassword
        }
    }
    var postCall = PostDataCall(data);
    if (postCall['IsSuccess'] == true) {
        $("#password-caption").html(postCall['Message']);
        $("#password-caption").css("color", "green");
        setTimeout(function () {

            window.location.href = '../../index.html';
        }, 2000);
    } else {
        $('input[id="reset_new_user_password"]').val(ResetNewPassword);
        $("#password-caption").html(postCall['Message']);
        $("#password-caption").css("color", "red");
    }
}


function EncryptPassword(password) {
    var passwordSaltKey = '11ebf1673f3a4c08813e10851346ba06';
    var passwordSaltIv = 'dcb95b4564cb4667'

    var key = CryptoJS.enc.Utf8.parse(passwordSaltKey);
    var iv = CryptoJS.enc.Utf8.parse(passwordSaltIv);

    var encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), key, {
        keySize: 256 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    ////console.log(encryptedpassword)
    return encryptedpassword;
}


//Reset Password
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};