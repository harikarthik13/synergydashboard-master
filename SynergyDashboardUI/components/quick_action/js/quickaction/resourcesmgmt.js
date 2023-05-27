function select_resourcemag(argument) {
    // 5-> ResourcManagement
    $("#resourceManagement-edit").removeClass("hidden");

    var result = callgetlist('GetResourceManagement', '{"IsActive":1}');
    var options = "<option value=''>Select Type</option>";
    for (var i = 0; i < result.length; i++) {
        options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
    }

    $("#Resource_Management").html(options);
    var result_resource = '';
    $("#Resource_Management").change(function () {
        var get_resource = $(this).val();
        $("#backupResource_chg").removeClass("hidden");

        // ////console.log('get_resource'+get_resource);
        if (get_resource == 1) {
            $("#backupResource_chg1").removeClass("hidden");
            var result_resource = callgetlist('GetBackupResource', '{"IsActive":1}');
            var result_resource1 = callgetlist('GetBackupResource', '{"IsActive":1}');
            var result_options = "<option value=''>Select Resource</option>";
            var result_options1 = "<option value=''>Select Backup Resource</option>";
            for (var i = 0; i < result_resource1.length; i++) {
                result_options1 += "<option value='" + result_resource[i].Id + "'>" + result_resource[i].ResourceName + "</option>";
            }
            $("#backupResource3").html(result_options1);
        } else if (get_resource == 2) {
            //Select Free Resource
            $("#backupResource_chg1").addClass("hidden");
            var result_resource = callgetlist('GetFreeResource', '{"IsActive":1}');
            var result_options = "<option value=''>Select Resource</option>";
        } else if (get_resource == 3) {
            //Select Part Time Resource
            $("#backupResource_chg1").addClass("hidden");
            var result_resource = callgetlist('GetParktimeResource', '{"IsActive":1}');
            var result_options = "<option value=''>Select Resource</option>";
        } else {
            $("#backupResource_chg").addClass("hidden");
            $("#backupResource_chg1").addClass("hidden");
        }
        for (var i = 0; i < result_resource.length; i++) {
            result_options += "<option value='" + result_resource[i].Id + "'>" + result_resource[i].ResourceName + "</option>";
        }

        $("#backupResource2").html(result_options);

    });

}

// ========================== Submit post call 445 ============================ /

function AddPostDataResourceMag() {
    var counter = 0;

    // 5-> ResourceManagement

    if ($('#Resource_Management').val() == "") {
        $('#Resource_Management').addClass("redClass");
        counter++;
    } else {
        $('#Resource_Management').removeClass("redClass");
    }

    if ($('#backupResource2').val() == "") {
        $('#backupResource2').addClass("redClass");
        counter++;
    } else {
        $('#backupResource2').removeClass("redClass");
    }

    if ($('#backupResource3').val() == "") {
        $('#backupResource3').addClass("redClass");
        counter++;
    } else {
        $('#backupResource3').removeClass("redClass");
    }

    if ($('#ResourceHours').val() == "" || $('#ResourceHours').val() == 0) {
        $('#ResourceHours').addClass("redClass");
        counter++;
    } else {
        $('#ResourceHours').removeClass("redClass");
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
            "Type": parseInt($('#Resource_Management').val()),
            "Date": today,
            "Resource": parseInt($('#backupResource2').val()),
            "BackupResource": parseInt($('#backupResource3').val()),
            "Hours": parseInt($('#ResourceHours').val()),
            "Comments": $('.actionComment').val()
        }
    }
    var result = PostDataCall(request);
    // ////console.log(result);
    $('#sucess-response').html(result.Message);
    $('.clear-form').click();
}