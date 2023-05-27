var localget = localStorage.getItem("UserCheckRes");
var jsonData = JSON.parse(localget);

function GetEmployeeAttendance(FromDate, ToDate)
{        
    debugger;
    var filter_val = JSON.stringify({        
        FromDate: FromDate,
        ToDate: ToDate,
        IsActive: "true"
    });

    var result = callgetlist('GetEmployeeAttendancelogSummary', filter_val);    
    //console.log(result);
    var mapattendancelog = MapEmployeeAttendanceLog(FromDate,ToDate,result);
    $('#attendancelogmappinglist').html(mapattendancelog);            
}

function MapEmployeeAttendanceLog(FromDate,ToDate,result)
{            
    var fromdate = FromDate;
    var todate = ToDate;
    var html = "";    

    if((fromdate == "" && todate == ""))
    {
        html = "";
    }
    else 
    {
        if (result == "") {
            html += "<tr><td colspan='8'>No Data Found.!</td></tr>";
        }
        else
        {            
            result.forEach(function (key, item) {                        
            var date = new Date(key.SwipeDate);
            var day = date.getDate();
            var month = date.getMonth() + 1;
            
            if(day < 10){
                day = "0" + (day);
            }
            if(month < 10){
                month = "0" + (month);
            }
            var year = date.getUTCFullYear();
            
            var SwipeDate = (year + "-" + month + "-" + day);
            var RCount = item + 1;
            var totalhoursdata = key.TotalHour.split(':').filter((data,index) => index != 2 ).join(':');
            html += "<tr class='myRow' id='row_" + item + "'>";
            html += "<td>" + RCount + "</td>";
            html += "<td>" + SwipeDate + "</td>";
            html += "<td>" + key.PunchIN + "</td>";
            html += "<td>" + key.PunchOUT + "</td>";
            html += "<td>" + totalhoursdata + "</td>";            
            html += "<td>" + key.Break + "</td>";            
            html += "<td><button style='float: right;' type='button' class='AttDetailButton btn btn-default btn-xs cmn-modal-ex-btn' onclick=GetEmployeeAttendanceLogDay(\'"+ SwipeDate +"\')><i class='fa fa-expand'></i></button></td>"
            html += "</tr>"; });                      
        }
    }
    return html;
}