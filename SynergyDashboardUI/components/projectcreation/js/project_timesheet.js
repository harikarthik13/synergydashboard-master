$('#generateReport').change(function() {
    generateDailyReportChanged();
});

function GetTimesheetTemplates() {
    var filter_val = JSON.stringify({
      "Token": localStorage.getItem('securityToken'),
    });

    var result = callgetlist('GetTimesheetTemplates', filter_val);

    $('#dlTimesheetTemplate').empty();
    var append_value = '<option value="">Select Timesheet</option>';
    result.forEach(function (key, item) {
        append_value += '<option value="'+key.TimesheetTemplateID+'">'+key.Name+'</option>';
    });

    $('#dlTimesheetTemplate').append(append_value);

  
}


function GetProjectConfigurations()
{
    var filter_val = JSON.stringify({
        "Token": localStorage.getItem('securityToken'),
        "ProjectId": localStorage.getItem('ProjectId'),
    });

    var result = callgetlist('GetProjectConfigurations', filter_val);

    if (result.length > 0) {
        result.forEach(function (idata, i) {
            //update here
            (idata.AutogenerateSendToLead === true) ? $("#autoGenerate").prop('checked', true) : $('#autoGenerate').prop('checked', false);
            (idata.GenerateDailyReport === true) ? $("#generateReport").prop('checked', true) : $('#generateReport').prop('checked', false);
            (idata.SendToLead === true) ? $("#send_to_lead").prop('checked', true) : $('#send_to_lead').prop('checked', false);
            (idata.SendToClient === true) ? $("#send_to_client").prop('checked', true) : $('#send_to_client').prop('checked', false);
            (idata.SendToTeam === true) ? $("#send_to_team").prop('checked', true) : $('#send_to_team').prop('checked', false);
            $('#dlTimesheetTemplate').val(idata.TimesheetTemplateId).change();
            $("input[name=radiooption][value="+ idata.TimesheetDuration +"]").prop('checked','true')
            $('#projectconfigurationid').val(idata.ProjectConfigurationId);

            if(idata.TimesheetTemplateId === '01E71340-9C4F-4313-A3F4-2A217102AD65') 
            {
                $("#image").show();
                $("#image1").hide();
            }
            else if(idata.TimesheetTemplateId === 'B1273FF9-1845-4F76-B5B7-C30EA536683A')
            {
                $("#image1").show();
                $("#image").hide();
            }
            else
            {
                $("#image").hide();
                $("#image1").hide();
            }
        });
    } else {
        
    }
    generateDailyReportChanged();
}

function validateGetProjectConfigurations()
{
    let err = 0;
    if($("#ProjectTypeId").val() == '99E78791-6C84-40AB-A6D3-6DA3E5A03AAB'){

        if ($('input[name="radiooption"]:checked').val() == null || $('input[name="radiooption"]:checked').val() == '') {
            $(".radiooption_error_message").html('Timesheet Duration is required');
            err = 1;
        }
        else 
        {
            $(".radiooption_error_message").html('');
            err = 0;
        }
    }
    if ($('#dlTimesheetTemplate').val() == null || $('#dlTimesheetTemplate').val() == '') {
        $(".dlTimesheetTemplate_error_message").html('Timesheet Template is required');
        err = 1;
    }
    else 
    {
        $(".dlTimesheetTemplate_error_message").html('');
        err = 0;
    }
	let dlProjectID = $("#dlProjectId").val();

    if (err == 1)
    {
        return false;
    }
    else 
    {
        if($("#dlProjectIsClosed").val() != 1){
            data = {
                "Method": "PostProjectConfigurations",
                "Data": {
                    "Token": localStorage.getItem('securityToken'),
                    "ProjectId" :  (dlProjectID != null && dlProjectID != '') ? dlProjectID : localStorage.getItem('ProjectId'),
                    "ProjectConfigurationId" : ($("#projectconfigurationid").val() != '') ? $("#projectconfigurationid").val() : null,
                    "TimesheetDuration" : ($('input[name="radiooption"]:checked').val() != '' && $("#ProjectTypeId").val() == '99E78791-6C84-40AB-A6D3-6DA3E5A03AAB') ? $('input[name="radiooption"]:checked').val() : "T",
                    "TimesheetTemplateId" : ($('#dlTimesheetTemplate').val() != '') ? $('#dlTimesheetTemplate').val() : '532881F5-1F07-4F70-8DAC-1CEBD512042E',
                    "AutogenerateSendToLead" : ($('#autoGenerate').is(":checked")) ? 1 : 0,
                    "GenerateDailyReport" : ($('#generateReport').is(":checked")) ? 1 : 0,
                    "SendToTeam" : ($('#send_to_team').is(":checked")) ? 1 : 0,
                    "SendToLead" : ($('#send_to_lead').is(":checked")) ? 1 : 0,
                    "SendToClient" : ($('#send_to_client').is(":checked")) ? 1 : 0,
                    "MoreInfo" :  null,
                    "IsActive" : 1,
                    "Status": 1,
                    "Message": "",
                    "IncludeTask": 0,
                    "PackageCompletion": 0,
                    "PackageEndDateCompletion": 0,
                }
            }
            var postCall = PostDataCall(data);

            if (postCall['IsSuccess'] == true) {
                swal({
                    title: "Success!",
                    text: "Project Timesheet updated Successfully!",
                    icon: "success",
                    button: "ok!",
                  })
            } else {
                alert(postCall['Message']);
            }
        }
    }
}

function generateDailyReportChanged(){
    if ($('#generateReport').is(':checked')){
        $('#send_to_lead_div').show();
        $('#send_to_team_div').show();
        $('#send_to_client_div').show();
    } else {
        $('#send_to_lead_div').hide();
        $('#send_to_team_div').hide();
        $('#send_to_client_div').hide();
    }
}