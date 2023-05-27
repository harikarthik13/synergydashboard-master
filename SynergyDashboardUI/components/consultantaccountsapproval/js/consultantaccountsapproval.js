function updateConsultantAccountApproval(details) {
    var conTaskEntryId =details.oldData.ConsultantLogId;
    var conTakEntryDetailsId = details.oldData.Id;
    var accountConfirmHours="";
    if(details.newData.AccountConfirmHours!=undefined)
    {
        accountConfirmHours=details.newData.AccountConfirmHours;
    }
    else{
        accountConfirmHours=details.oldData.AccountConfirmHours;
    }
    dataSourceUpdateConsultantAccountTask = {
        "Method": "PostConsultantTaskApprovalAccounts",
        "Data": {
            "Token": Token,
            "ConsultantTaskEntryId":conTakEntryDetailsId,
            "AccountConfirmHours" : accountConfirmHours
        }
    }
    PostDataCallAsync(dataSourceUpdateConsultantAccountTask, function (e) {
        ;
       
    })
}
function loadGridForAccounts(e)
{
    var filter_file_val = JSON.stringify({
        "IsActive":true,
        "Year":$("#CAA_yearSelectBox").dxSelectBox('instance').option('value'),
        "Month":$("#CAA_monthSelectBox").dxSelectBox('instance').option('value')
     });
    var tableDataSource = callgetlist('GetConsultantTaskDetailsForAccounts', filter_file_val);
    $("#CAA_dataGridContainer").dxDataGrid({
        dataSource: tableDataSource
    });

}