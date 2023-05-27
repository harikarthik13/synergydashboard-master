function updateConsultantUAApproval(details) {
    var conTaskEntryId =details.oldData.ConsultantLogId;
    var conTakEntryDetailsId = details.oldData.Id;
    var uaApprovedHours="";
    if(details.newData.UAApprovedHours!=undefined)
    {
        uaApprovedHours=details.newData.UAApprovedHours;
    }
    else{
        uaApprovedHours=details.oldData.UAApprovedHours;
    }
   

    dataSourceUpdateConsultantUATask = {
        "Method": "PostConsultantTaskApprovalUA",
        "Data": {
            "Token": Token,
            "ConsultantTaskEntryId":conTakEntryDetailsId,
            "UAApprovedHours" : uaApprovedHours
        }
    }
    PostDataCallAsync(dataSourceUpdateConsultantUATask, function (e) {
        ;
    })
}
function loadGridForUA(e)
{
    var filter_file_val = JSON.stringify({
        "IsActive":true,
        "Year":$("#CUA_yearSelectBox").dxSelectBox('instance').option('value'),
        "Month":$("#CUA_monthSelectBox").dxSelectBox('instance').option('value')
     });
    var tableDataSource = callgetlist('GetConsultantTaskDetailsForUnitAdmin', filter_file_val);
    $("#CUA_dataGridContainer").dxDataGrid({
        dataSource: tableDataSource
    });

}