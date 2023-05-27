function select_resourcemag_defaulters(argument) {
    // 5-> ResourcManagement
    $("#defaulters-resourceManagement-edit").removeClass("hidden");

    var result = callgetlist('GetResourceManagement', '{"IsActive":1}');
    var options = "<option value=''>Select Type</option>";
    for (var i = 0; i < result.length; i++) {
        options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
    }

    $("#defaulters-Resource_Management").html(options);
    var result_resource = '';
    $("#defaulters-Resource_Management").change(function () {
        var get_resource = $(this).val();
        $("#defaulters-backupResource_chg").removeClass("hidden");

        // ////console.log('get_resource'+get_resource);
        if (get_resource == 1) {
            $("#defaulters-backupResource_chg1").removeClass("hidden");
            var result_resource = callgetlist('GetBackupResource', '{"IsActive":1}');
            var result_resource1 = callgetlist('GetBackupResource', '{"IsActive":1}');
            var result_options = "<option value=''>Select Resource</option>";
            var result_options1 = "<option value=''>Select Backup Resource</option>";
            for (var i = 0; i < result_resource1.length; i++) {
                result_options1 += "<option value='" + result_resource[i].Id + "'>" + result_resource[i].ResourceName + "</option>";
            }
            $("#defaulters-backupResource3").html(result_options1);
        } else if (get_resource == 2) {
            //Select Free Resource
            $("#defaulters-backupResource_chg1").addClass("hidden");
            var result_resource = callgetlist('GetFreeResource', '{"IsActive":1}');
            var result_options = "<option value=''>Select Resource</option>";
        } else if (get_resource == 3) {
            //Select Part Time Resource
            $("#defaulters-backupResource_chg1").addClass("hidden");
            var result_resource = callgetlist('GetParktimeResource', '{"IsActive":1}');
            var result_options = "<option value=''>Select Resource</option>";
        } else {
            $("#defaulters-backupResource_chg").addClass("hidden");
            $("#defaulters-backupResource_chg1").addClass("hidden");
        }
        for (var i = 0; i < result_resource.length; i++) {
            result_options += "<option value='" + result_resource[i].Id + "'>" + result_resource[i].ResourceName + "</option>";
        }

        $("#defaulters-backupResource2").html(result_options);

    });

}

// ========================== Submit post call 445 ============================ /

function AddPostDataResourceMagDefaulters() {
    var counter = 0;

    // 5-> ResourceManagement

    if ($('#defaulters-Resource_Management').val() == "") {
        $('#defaulters-Resource_Management').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-Resource_Management').removeClass("redClass");
    }

    if ($('#defaulters-backupResource2').val() == "") {
        $('#defaulters-backupResource2').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-backupResource2').removeClass("redClass");
    }

    if ($('#defaulters-backupResource3').val() == "") {
        $('#defaulters-backupResource3').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-backupResource3').removeClass("redClass");
    }

    if ($('#defaulters-ResourceHours').val() == "" || $('#defaulters-ResourceHours').val() == 0) {
        $('#defaulters-ResourceHours').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-ResourceHours').removeClass("redClass");
    }

    if (counter > 0) {
        $('#error-response').html("Require Fields are Missing");
        return false;
    } else {
        $('#error-response').html("");
    }

    request = {
        "Method": "PostResourceManagementTaskLog",
        "Data": {
            "Type": parseInt($('#defaulters-Resource_Management').val()),
            "Date": today,
            "Resource": parseInt($('#defaulters-backupResource2').val()),
            "BackupResource": parseInt($('#defaulters-backupResource3').val()),
            "Hours": parseInt($('#defaulters-ResourceHours').val()),
            "Comments": $('.defaulters-actionComment').val()
        }
    }
    var result = PostDataCall(request);
    // ////console.log(result);
    $('#sucess-response').html(result.Message);
    $('.clear-form').click();
}