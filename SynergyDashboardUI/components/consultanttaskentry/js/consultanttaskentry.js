function addConsultantTaskEntry(details, commondetails) {
    var conName = commondetails.ConsultantName;
    var conId = commondetails.ConsultantId;
    var projectName = commondetails.ProjectName;
    var leadName = commondetails.LeadName;
    var conTaskEntryId =null;
    var conTakEntryDetailsId = null;

    dataSourceSaveConsultantTask = {
        "Method": "PostConsultantTaskDetails",
        "Data": {
            "Token": Token,
            "ConsultantTaskEntryId":conTaskEntryId,
            "ConsultantTaskEntryDetailId":conTakEntryDetailsId,
            "ConsultantName" : conName,
            "ConsultantId" : conId,
            "ProjectName" : projectName,
            "LeadName" : leadName,
            "Date" : details.data.Date,
            "Task" : details.data.Task,
            "LoggedHours" : details.data.LoggedHours
        }
    }
    PostDataCallAsync(dataSourceSaveConsultantTask, function (e) {
        ;
        
    })
}


function updateConsultantTaskEntry(details, commondetails) {
    var conName = commondetails.ConsultantName;
    var conId = commondetails.ConsultantId;
    var projectName = commondetails.ProjectName;
    var leadName = commondetails.LeadName;
    var conTaskEntryId =details.oldData.ConsultantLogId;
    var conTakEntryDetailsId = details.oldData.Id;
    var date="";
    var task="";
    var loggedHours="";

    if(details.newData.Date!=undefined)
    {
        date=details.newData.Date;
    }
    else{
        date=details.oldData.Date;
    }
    if(details.newData.Task!=undefined)
    {
        task=details.newData.Task;
    }
    else{
        task=details.oldData.Task;
    }
    if(details.newData.LoggedHours!=undefined)
    {
        loggedHours=details.newData.LoggedHours;
    }
    else{
        loggedHours=details.oldData.LoggedHours;
    }

    dataSourceUpdateConsultantTask = {
        "Method": "PostConsultantTaskDetails",
        "Data": {
            "Token": Token,
            "ConsultantTaskEntryId":conTaskEntryId,
            "ConsultantTaskEntryDetailId":conTakEntryDetailsId,
            "ConsultantName" : conName,
            "ConsultantId" : conId,
            "ProjectName" : projectName,
            "LeadName" : leadName,
            "Date" : date,
            "Task" : task,
            "LoggedHours" : loggedHours
        }
    }
    PostDataCallAsync(dataSourceUpdateConsultantTask, function (e) {
        ;
    })
}

function projectLoadGrid(e)
{
    $("#projectSelectBox").dxSelectBox('instance').option('value', e.value)
    var consultant =$("#consultantSelectBox").dxSelectBox('instance').option('value');
    var lead_filter_data = JSON.stringify({
        "IsActive":true,
       "ConsultantName":consultant,
    });
   var leadDataSource = callgetlist('GetLeadsForConsultant', lead_filter_data);
    $("#leadSelectBox").dxSelectBox({
        dataSource: leadDataSource
    });
}
function leadLoadGrid(e)
{
    var consultant =  $("#consultantSelectBox").dxSelectBox('instance').option('value')
    $("#leadSelectBox").dxSelectBox('instance').option('value', e.value)
    var project = $("#projectSelectBox").dxSelectBox('instance').option('value');
    var filter = JSON.stringify({
        "IsActive":true,
       "ConsultantName":consultant,
       "ProjectName": project,
       "LeadName":e.value
    });
    var tableDataSource = callgetlist('GetConsultantLog',  filter);
    $("#dataGridContainer").dxDataGrid({
        dataSource: tableDataSource
    });

}
function consultantChanged(e)
{
    $("#consultantSelectBox").dxSelectBox('instance').option('value', e.value)
    var consultant =$("#consultantSelectBox").dxSelectBox('instance').option('value');
    var project_filter_data = JSON.stringify({
        "IsActive":true,
       "ConsultantName":consultant,
    });
   var projectDataSource = callgetlist('GetProjectsForConsultant', project_filter_data);
    $("#projectSelectBox").dxSelectBox({
        dataSource: projectDataSource
    });
}