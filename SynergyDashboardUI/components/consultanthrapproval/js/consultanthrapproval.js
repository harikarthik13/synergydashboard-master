function updateConsultantHRApproval(details) {
    var conTaskEntryId =details.oldData.ConsultantLogId;
    var conTakEntryDetailsId = details.oldData.Id;
    var payableHours="";
    if(details.newData.PayableHours!=undefined)
    {
        payableHours=details.newData.PayableHours;
    }
    else{
        payableHours=details.oldData.PayableHours;
    }
   

    dataSourceUpdateConsultantHRTask = {
        "Method": "PostConsultantTaskApprovalHR",
        "Data": {
            "Token": Token,
            "ConsultantTaskEntryId":conTakEntryDetailsId,
            "PayableHours" : payableHours
        }
    }

    PostDataCallAsync(dataSourceUpdateConsultantHRTask, function (e) {
        ;
       
    })
}

function loadGridForHR(e)
{
    var filter_file_val = JSON.stringify({
        "IsActive":true,
        "Year":$("#CHA_yearSelectBox").dxSelectBox('instance').option('value'),
        "Month":$("#CHA_monthSelectBox").dxSelectBox('instance').option('value')
     });
    var tableDataSource = callgetlist('GetConsultantTaskDetailsForHR', filter_file_val);
 
    $("#CHA_dataGridContainer").dxDataGrid({
        dataSource: tableDataSource
    });

}