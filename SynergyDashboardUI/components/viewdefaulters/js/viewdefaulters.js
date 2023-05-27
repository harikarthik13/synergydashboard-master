var defaultersList = [];

$(document).ready(function () { 
 getViewDefaultersDetails();

});


function getViewDefaultersDetails() {
    var thisMonthDate = new Date();
    thisMonthDate.setDate(25);

    var lastMonthDate = new Date();
    lastMonthDate.setDate(26);
    lastMonthDate.setMonth(lastMonthDate.getMonth()-1);
    var stdate = moment(lastMonthDate).format("YYYY-MM-DD");
    var eddate = moment(thisMonthDate).format("YYYY-MM-DD");
    // var stdate = moment(ten_days_ago).format("YYYY-MM-DD");
    // var eddate = moment(thisMonthDate).format("YYYY-MM-DD");
    $('#startdate').val(stdate);
    $('#enddate').val(eddate);
    var startdate = moment(stdate).format("DD-MM-YYYY");
    var enddate = moment(eddate).format("DD-MM-YYYY");
    var localget = localStorage.getItem("UserCheckRes");
    
    defaultersList = [];
    var GetViewList = callgetlist('GetDefulterList', '{"IsActive":"True","ProgresStartDate":"' + stdate + '","ProgresEndDate":"' + eddate + '"}');
    
    var i = 0;
    for(i = 0; i < GetViewList.length; i++)
    {
        var item = GetViewList[i];
        var ddate =  item['Default Date'];      
        var defaultdate = ddate.replace(/\//g, "-");
        defaultdate = defaultdate.split('-');
        defaultdate = defaultdate[2] + "-" + defaultdate[1] + "-" + defaultdate[0]

        item['Default Date'] = new Date(defaultdate);
        
        defaultersList.push(item);
    }
    bindDefaultersGrid();

}

function getViewDefaultersDetailsSearchDate() {

    var sdate = document.getElementById("startdate").value;
    var searchstartdate = moment(sdate).format("YYYY-MM-DD");
    var edate = document.getElementById("enddate").value;
    var searchenddate = moment(edate).format("YYYY-MM-DD");
    if (sdate > edate) {
        $('#startdateError').html("Start date should not be greater than End Date");
    }
    else {
        $('#startdate').removeClass('input-error');
        $('#startdateError').html("");
        $('#enddate').removeClass('input-error');
        $('#enddateError').html("");
    }
    var localget = localStorage.getItem("UserCheckRes");
    
    defaultersList = [];
    
    var GetViewList = callgetlist('GetDefulterList', '{"IsActive":"True","ProgresStartDate":"' + searchstartdate + '","ProgresEndDate":"' + searchenddate + '"}');
    var i = 0;
    for(i = 0; i < GetViewList.length; i++)
    {
        var item = GetViewList[i];

        var ddate =  item['Default Date'];      
        var defaultdate = ddate.replace(/\//g, "-");
        defaultdate = defaultdate.split('-');
        defaultdate = defaultdate[2] + "-" + defaultdate[1] + "-" + defaultdate[0]

        item['Default Date'] = new Date(defaultdate);
        
        defaultersList.push(item);
    }
    bindDefaultersGrid();
}




function bindDefaultersGrid()
{
    var sdate = document.getElementById("startdate").value;
    var searchstartdate = moment(sdate).format("YYYY-MM-DD");
    var edate = document.getElementById("enddate").value;
    var searchenddate = moment(edate).format("YYYY-MM-DD");
    var options = getDevExtremeGridJson();
    options.dataSource = defaultersList;
    options.columns = [
        {caption:"Emp Id", dataField:"EmployeeNumber"},
        {caption:"Employee Name", dataField:"EmployeeName"},
        {caption:"Default Date", dataField:"Default Date", dataType:"date", format: 'dd-MM-yyyy'  },
        {caption:"Entered Date", dataField:"EnteredDatetime", dataType:"date", format: 'dd-MM-yyyy'  },
        {caption:"Backup Lead", dataField:"BackupLeadName"},
        {caption:"Comments", dataField:"Comments"}           
    ];
    var dataGrid = $("#ViewDefaultersTableListDetails").dxDataGrid(options).dxDataGrid("instance");
}

