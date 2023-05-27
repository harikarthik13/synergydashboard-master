function updateConsultantLeadTaskEntry(details) {
    var conTaskEntryId =details.oldData.ConsultantLogId;
    var conTakEntryDetailsId = details.oldData.Id;
    var approvedHours="";
    var billableHours="";
    var remarks="";
    if(details.newData.ApprovedHours!=undefined)
    {
        approvedHours=details.newData.ApprovedHours;
    }
    else{
        approvedHours=details.oldData.ApprovedHours;
    }
    if(details.newData.BillableHours!=undefined)
    {
        billableHours=details.newData.BillableHours;
    }
    else{
        billableHours=details.oldData.BillableHours;
    }
    if(details.newData.Remarks!=undefined)
    {
        remarks=details.newData.Remarks;
    }
    else{
        remarks=details.oldData.Remarks;
    }

    dataSourceUpdateConsultantLeadTask = {
        "Method": "PostConsultantTaskApprovalLead",
        "Data": {
            "Token": Token,
            "ConsultantTaskEntryDetailId":conTakEntryDetailsId,
            "ApprovedHours" : approvedHours,
            "BillableHours" : billableHours,
            "Remarks" : remarks
        }
    }

   
    PostDataCallAsync(dataSourceUpdateConsultantLeadTask, function (e) {
        ;
    })
}
function projectLoadGridForProject(e)
{
    var consultant =  $("#CLA_consultantSelectBox").dxSelectBox('instance').option('value')
    var project = $("#CLA_projectSelectBox").dxSelectBox('instance').option('value');
    var filter = JSON.stringify({
        "IsActive":true,
       "ConsultantName":consultant,
       "ProjectName":$("#CLA_projectSelectBox").dxSelectBox('instance').option('value'), 
    });

    var tableDataSource = callgetlist('GetConsultantLogByProject',  filter);
    $("#CLA_dataGridContainer").dxDataGrid({
        dataSource: tableDataSource
    });

}
function consultantChangedForLead(e)
{
    $("#CLA_consultantSelectBox").dxSelectBox('instance').option('value', e.value)

    var consultant =$("#CLA_consultantSelectBox").dxSelectBox('instance').option('value');
    var project_filter_data = JSON.stringify({
        "IsActive":true,
       "ConsultantName":consultant,
    });
   var projectDataSource = callgetlist('GetProjectsForConsultant', project_filter_data);
    $("#CLA_projectSelectBox").dxSelectBox({
        dataSource: projectDataSource
    });
}
function loadGridForLead(e)
{
    var consultant =$("#CLA_consultantSelectBox").dxSelectBox('instance').option('value');
    var filter = JSON.stringify({
        "IsActive":true,
        "ConsultantName":consultant,
        "ProjectName":$("#CLA_projectSelectBox").dxSelectBox('instance').option('value'),
        "Year":$("#CLA_yearSelectBox").dxSelectBox('instance').option('value'),
        "Month":$("#CLA_monthSelectBox").dxSelectBox('instance').option('value')
     });
     var tableDataSource = callgetlist('GetConsultantTaskDetailsForLead',  filter);
     $("#CLA_dataGridContainer").dxDataGrid({
         dataSource: tableDataSource
     });

}